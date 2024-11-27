import { IDriver } from './IDriver';

export interface IRideListFormatResponse {
  id: string;
  date: Date;
  origin: string;
  destination: string;
  distance: number | null;
  duration: string;
  driver: IDriver;
  value: number | null;
}
