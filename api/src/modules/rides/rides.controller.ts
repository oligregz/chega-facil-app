import { Body, Controller, Post } from '@nestjs/common';
import { RidesService } from './rides.service';
import { RideEstimateBodyDTO } from './dtos/RideEstimateBodyDTO';
import { IRideResponse } from './interfaces/IRideResponse';

@Controller('ride')
export class RidesController {
  constructor(private readonly ridesService: RidesService) {}

  @Post('estimate')
  async estimateRide(
    @Body() data: RideEstimateBodyDTO,
  ): Promise<IRideResponse> {
    return this.ridesService.estimateRide(data);
  }
}
