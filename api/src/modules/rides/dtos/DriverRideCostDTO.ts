import { ReviewDTO } from './ReviewDTO';

export class DriverRideCostDTO {
  id: string;

  name: string;

  description: string;

  vehicle: string;

  lastComment: string;

  review: ReviewDTO;
  value: number;
}
