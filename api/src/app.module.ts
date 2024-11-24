import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma.service';
import { CustomersModule } from './modules/customers/customers.module';
import { DriversModule } from './modules/drivers/drivers.module';
import { TripsModule } from './modules/trips/trips.module';
import * as path from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: path.resolve(__dirname, '../.env'),
      isGlobal: true,
    }),
    CustomersModule,
    DriversModule,
    TripsModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
