import { IReview } from './IReview';

export interface IDriverRideCost {
  id: string;

  name: string;

  description: string;

  vehicle: string;

  review: IReview;

  value: string;
}
