import { Body, Controller, Post } from '@nestjs/common';
import { RidesService } from './rides.service';
import { RideEstimateBodyDTO } from './dtos/RideEstimateBodyDTO';

@Controller('ride')
export class RidesController {
  constructor(private readonly ridesService: RidesService) {}

  @Post('estimate')
  async estimateRide(
    @Body() data: RideEstimateBodyDTO,
    // change Promise<number> for Promise<DriverRideCostDTO>
  ): Promise<number> {
    return this.ridesService.estimateRide(data);
  }
}
