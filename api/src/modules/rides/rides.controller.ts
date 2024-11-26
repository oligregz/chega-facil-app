import { Body, Controller, Post } from '@nestjs/common';
import { RidesService } from './rides.service';
import { handleError } from 'src/errors/app-error';
import { response } from 'express';
import { RideEstimateBodyDTO } from './dtos/RideEstimateBodyDTO';

@Controller('ride')
export class RidesController {
  constructor(private readonly ridesService: RidesService) {}

  @Post('estimate')
  async estimateRide(@Body() data: RideEstimateBodyDTO) {
    try {
      return this.ridesService.estimateRide(data);
    } catch (error) {
      handleError(error, response);
    }
  }
}
