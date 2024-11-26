import { IsInvalidBodyCustom } from '../classValidator/IsInvalidBodyCustom';

export class RideEstimateBodyDTO {
  @IsInvalidBodyCustom()
  customer_id: string;

  @IsInvalidBodyCustom()
  origin: string;

  @IsInvalidBodyCustom()
  destination: string;
}
