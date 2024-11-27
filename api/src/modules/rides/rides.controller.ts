import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
} from '@nestjs/common';
import { RidesService } from './rides.service';
import { RideEstimateBodyDTO } from './dtos/RideEstimateBodyDTO';
import { IRideResponse } from './interfaces/IRideResponse';
import { IRideConfirmedResponse } from './interfaces/IRideConfirmedResponse';
import { RideSelectedBodyDTO } from './dtos/RideSelectedBodyDTO';

@Controller('ride')
export class RidesController {
  constructor(private readonly ridesService: RidesService) {}

  @Post('estimate')
  @HttpCode(HttpStatus.OK)
  async estimateRide(
    @Body() data: RideEstimateBodyDTO,
  ): Promise<IRideResponse> {
    return this.ridesService.estimateRide(data);
  }

  @Patch('confirm')
  @HttpCode(HttpStatus.OK)
  async confirmAndSaveRide(
    @Body() data: RideSelectedBodyDTO,
  ): Promise<IRideConfirmedResponse> {
    return this.ridesService.confirmeAndSaveRide(data);
  }
}
