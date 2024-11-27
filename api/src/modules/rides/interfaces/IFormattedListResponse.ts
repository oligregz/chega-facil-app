import { IRideListFormatResponse } from './IRideListFormatResponse';

export interface IFormattedListResponse {
  customer_id: string;
  rides: IRideListFormatResponse[];
}
