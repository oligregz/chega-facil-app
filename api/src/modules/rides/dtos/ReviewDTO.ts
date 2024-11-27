import { IsInvalidBodyCustom } from '../classValidator/IsInvalidBodyCustom';

export class ReviewDTO {
  @IsInvalidBodyCustom()
  rating: number;

  @IsInvalidBodyCustom()
  comment: string;
}
