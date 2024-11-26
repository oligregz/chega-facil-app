import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ReviewDTO {
  @IsNotEmpty()
  @IsNumber()
  rating: number;

  @IsNotEmpty()
  @IsString()
  comment: string;
}
