import {
  IsDate,
  IsDateString,
  IsEmpty,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CustomerCreateBody {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  isActive: boolean;

  @IsNotEmpty()
  phone: string;

  @IsString()
  email: string;

  createdAt?: Date | string;
  updatedAt?: Date | string;
}
