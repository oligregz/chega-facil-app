import { Module } from '@nestjs/common';
import { RidesService } from './rides.service';
import { RidesController } from './rides.controller';
import { PrismaService } from '../../database/PrismaService';

@Module({
  controllers: [RidesController],
  providers: [RidesService, PrismaService],
})
export class RidesModule {}
