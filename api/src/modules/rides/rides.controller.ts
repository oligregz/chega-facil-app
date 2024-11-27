import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { RidesService } from './rides.service';
import { RideEstimateBodyDTO } from './dtos/RideEstimateBodyDTO';
import { IRideResponse } from './interfaces/IRideResponse';
import { IRideConfirmedResponse } from './interfaces/IRideConfirmedResponse';
import { RideSelectedBodyDTO } from './dtos/RideSelectedBodyDTO';
import { validateId } from './utils/validateId';
import { IFormattedListResponse } from './interfaces/IFormattedListResponse';

@Controller('ride')
export class RidesController {
  constructor(private readonly ridesService: RidesService) {}

  @Post('estimate')
  @HttpCode(HttpStatus.OK)
  async estimateRide(
    @Body() data: RideEstimateBodyDTO,
  ): Promise<IRideResponse> {
    return await this.ridesService.estimateRide(data);
  }

  @Patch('confirm')
  @HttpCode(HttpStatus.OK)
  async confirmAndSaveRide(
    @Body() data: RideSelectedBodyDTO,
  ): Promise<IRideConfirmedResponse> {
    return await this.ridesService.confirmeAndSaveRide(data);
  }

  @Get(':customer_id?')
  async listRides(
    @Param('customer_id') customerId: string = '',
    @Query('driver_id') driverId: string = '',
  ): Promise<IFormattedListResponse> {
    validateId(driverId, 'driver');
    validateId(customerId, 'customer');

    const parameters = { customerId, driverId };

    return await this.ridesService.listRides(parameters);
  }
}
