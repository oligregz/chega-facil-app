import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { RidesService } from './rides.service';
import { RideEstimateBodyDTO } from './dtos/RideEstimateBodyDTO';
import { IRideResponse } from './interfaces/IRideResponse';

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
}
