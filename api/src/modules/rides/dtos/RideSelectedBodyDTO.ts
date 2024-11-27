import { IsInvalidBodyCustom } from '../classValidator/IsInvalidBodyCustom';
import { DriverSelectedDTO } from './DriverSelectedDTO';
import { ReviewDTO } from './ReviewDTO';

export class RideSelectedBodyDTO {
  @IsInvalidBodyCustom()
  customer_id: string;

  @IsInvalidBodyCustom()
  origin: string;

  @IsInvalidBodyCustom()
  destination: string;

  @IsInvalidBodyCustom()
  distance: number;

  @IsInvalidBodyCustom()
  duration: string;

  @IsInvalidBodyCustom()
  driver: DriverSelectedDTO;

  @IsInvalidBodyCustom()
  value: number;
}
