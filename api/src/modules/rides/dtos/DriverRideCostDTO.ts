import { IsInvalidBodyCustom } from '../classValidator/IsInvalidBodyCustom';
import { ReviewDTO } from './ReviewDTO';

export class DriverRideCostDTO {
  @IsInvalidBodyCustom()
  id: string;

  @IsInvalidBodyCustom()
  name: string;

  @IsInvalidBodyCustom()
  description: string;

  @IsInvalidBodyCustom()
  vehicle: string;

  @IsInvalidBodyCustom()
  lastComment: string;

  @IsInvalidBodyCustom()
  review: ReviewDTO;

  @IsInvalidBodyCustom()
  value: number;
}
