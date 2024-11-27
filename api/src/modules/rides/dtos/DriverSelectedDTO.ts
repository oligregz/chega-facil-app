import { IsInvalidBodyCustom } from '../classValidator/IsInvalidBodyCustom';

export class DriverSelectedDTO {
  @IsInvalidBodyCustom()
  id: string;

  @IsInvalidBodyCustom()
  name: string;
}
