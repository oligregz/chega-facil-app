import { IsInvalidBodyCustom } from '../classValidator/IsInvalidBodyCustom';

export class CustomerCreateBodyDTO {
  @IsInvalidBodyCustom()
  name: string;

  @IsInvalidBodyCustom()
  isActive: boolean;

  @IsInvalidBodyCustom()
  phone: string;

  @IsInvalidBodyCustom()
  email: string;

  createdAt?: Date | string;
  updatedAt?: Date | string;
}
