import { ICoordinates } from './ICoordinates';
import { IRideOption } from './IRideOption';

export interface IRideResponse {
  origin: ICoordinates;
  destination: ICoordinates;
  distance: number;
  duration: string;
  options: IRideOption[];
}
