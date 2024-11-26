import { IsNotEmpty, IsNumber, IsObject, IsString } from 'class-validator';
import { ReviewDTO } from './ReviewDTO';

export class DriverRideCostDTO {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  vehicle: string;

  @IsNotEmpty()
  @IsString()
  lastComment: string;

  @IsNotEmpty()
  @IsObject()
  review: ReviewDTO;
  value: number;
}
