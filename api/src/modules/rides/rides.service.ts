import { Injectable } from '@nestjs/common';
import { RideEstimateBodyDTO } from './dtos/RideEstimateBodyDTO';
import { PrismaService } from 'src/database/PrismaService';
import { Driver } from '@prisma/client';
import { convertMetersPerKilometer } from '../../utils/convertMetersPerKilometer';
import { AppError } from '../../errors/AppError';
import { ERROR } from '../../errors/errors';
import { getTimeAndDistanceOfRide } from './utils/googleMapsConsumer';
import { IDriverRideCost } from './interfaces/IDriverRideCost';
import { validateOriginIsDiferentDestination } from './utils/validateOriginIsDiferentDestination';
import { IRideResponse } from './interfaces/IRideResponse';
import { convertForFloat } from 'src/utils/covertForFloat';

@Injectable()
export class RidesService {
  constructor(private prisma: PrismaService) {}

  async estimateRide(data: RideEstimateBodyDTO): Promise<IRideResponse> {
    const { origin, destination } = data;

    validateOriginIsDiferentDestination(origin, destination);

    const mode: string = 'driving';
    const dataOfRide = await getTimeAndDistanceOfRide(
      origin,
      destination,
      mode,
    );

    const rideDistance: number = convertMetersPerKilometer(
      dataOfRide.distanceValue,
    );

    const listOptionsOfCostRidePerDrivers =
      await this.getCostRidePerDriver(rideDistance);

    const {
      originCoordinates,
      destinationCoordinates,
      distanceValue,
      durationText,
    } = dataOfRide;

    const estimateRideWithDriverOptions = {
      origin: {
        latitude: convertForFloat(parseFloat(originCoordinates.lat), 6),
        longitude: convertForFloat(parseFloat(originCoordinates.lng), 6),
      },
      destination: {
        latitude: convertForFloat(parseFloat(originCoordinates.lat), 6),
        longitude: convertForFloat(parseFloat(originCoordinates.lng), 6),
      },
      distance: distanceValue,
      duration: durationText,
      options: listOptionsOfCostRidePerDrivers,
    };
    return estimateRideWithDriverOptions;
  }

  async getCostRidePerDriver(rideDistance: number): Promise<IDriverRideCost[]> {
    const availableDrivers =
      await this.listAvailableDriversPerMinimunDistance(rideDistance);

    const availableDriversWithRideCost = availableDrivers.map((driver) => {
      const { id, name, description, vehicle, rating, lastComment, rate } =
        driver;
      return {
        id,
        name,
        description,
        vehicle,
        review: {
          rating,
          comment: lastComment,
        },
        value: `R$ ${convertForFloat(rate * rideDistance, 2)}/km`,
      };
    });

    return availableDriversWithRideCost;
  }

  async listAvailableDriversPerMinimunDistance(
    rideDistance: number,
  ): Promise<Driver[]> {
    const availableDrivers = await this.prisma.driver.findMany({
      where: {
        minimumDistance: {
          lte: rideDistance,
        },
        isActive: true,
      },
    });

    if (!availableDrivers)
      throw new AppError(
        ERROR.CODE_DESCRIPTION_STATUS.DRIVERS_AVAILABE_DISTANCE_NOT_FOUND.CODE,
        ERROR.CODE_DESCRIPTION_STATUS.DRIVERS_AVAILABE_DISTANCE_NOT_FOUND.DESCRIPTION,
        ERROR.CODE_DESCRIPTION_STATUS.DRIVERS_AVAILABE_DISTANCE_NOT_FOUND.STATUS,
      );

    return availableDrivers;
  }
}
