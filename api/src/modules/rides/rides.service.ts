import { Injectable } from '@nestjs/common';
import { RideEstimateBodyDTO } from './dtos/RideEstimateBodyDTO';
import { PrismaService } from 'src/database/PrismaService';
import { Driver } from '@prisma/client';
import { DriverRideCostDTO } from './dtos/DriverRideCostDTO';
import { getDistanceByMapsServiceApi } from 'src/utils/getDistanceByMapsServiceApi';
import { AppError } from 'src/errors/app-error';

@Injectable()
export class RidesService {
  constructor(private prisma: PrismaService) {}

  async estimateRide(data: RideEstimateBodyDTO): Promise<number> {
    // TODO add service api for catch ride distance
    // TODO implements correct return
    return await 1;
  }

  async calculateCostRidePerDriver(
    data: RideEstimateBodyDTO,
  ): Promise<DriverRideCostDTO[]> {
    const { origin, destination } = data;
    const rideDistance = await getDistanceByMapsServiceApi(origin, destination);

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
        lastComment,
        review: {
          rating,
          comment: lastComment,
        },
        value: rate * rideDistance,
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

    if (!availableDrivers) throw new AppError ()

    return availableDrivers;
  }
}
