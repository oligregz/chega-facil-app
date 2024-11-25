import { Module } from '@nestjs/common';
import { RidesService } from './rides.service';
import { RidesController } from './rides.controller';

@Module({
  controllers: [RidesController],
  providers: [RidesService],
})
export class RidesModule {}
