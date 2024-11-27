import { IReview } from './IReview';

export interface IRideOption {
  id: string;
  name: string;
  description: string;
  vehicle: string;
  review: IReview;
  value: string;
}
