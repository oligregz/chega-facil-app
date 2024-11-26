import axios from 'axios';
import * as dotenv from 'dotenv';
import { AppError } from 'src/errors/AppError';
import { ERROR } from 'src/errors/errors';
import { IDistanceResponse } from '../interfaces/IDistanceResponse';

dotenv.config();

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const BASE_URL = 'https://maps.googleapis.com/maps/api/distancematrix/json';

if (!GOOGLE_API_KEY) {
  throw new AppError(
    ERROR.CODE_DESCRIPTION_STATUS.INVALID_API_KEY.CODE,
    ERROR.CODE_DESCRIPTION_STATUS.INVALID_API_KEY.DESCRIPTION,
    ERROR.CODE_DESCRIPTION_STATUS.INVALID_API_KEY.STATUS,
  );
}

export async function getDistanceMatrix(
  origin: string,
  destination: string,
  mode: string,
): Promise<IDistanceResponse> {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        origins: origin,
        destinations: destination,
        key: GOOGLE_API_KEY,
        mode,
      },
    });

    const data = response.data;

    if (data.status !== 'OK') {
      throw new AppError(
        ERROR.CODE_DESCRIPTION_STATUS.GOOGLE_API_ERROR.CODE,
        ERROR.CODE_DESCRIPTION_STATUS.GOOGLE_API_ERROR.DESCRIPTION,
        ERROR.CODE_DESCRIPTION_STATUS.GOOGLE_API_ERROR.STATUS +
          data.error_message,
      );
    }

    const element = data.rows[0]?.elements[0];

    if (element.status !== 'OK') {
      throw new AppError(
        ERROR.CODE_DESCRIPTION_STATUS.ROUTE_CALCULATION_ERROR.CODE,
        ERROR.CODE_DESCRIPTION_STATUS.ROUTE_CALCULATION_ERROR.DESCRIPTION,
        ERROR.CODE_DESCRIPTION_STATUS.ROUTE_CALCULATION_ERROR.STATUS +
          element.status,
      );
    }

    return {
      origin: data.origin_addresses[0],
      destination: data.destination_addresses[0],
      distanceText: element.distance.text,
      distanceValue: element.distance.value,
      durationText: element.duration.text,
      durationValue: element.duration.value,
    };
  } catch (error: any) {
    console.error('Erro ao chamar a API:', error.message);
    throw new AppError(
      ERROR.CODE_DESCRIPTION_STATUS.BAD_DISTANCE_CALCULATION.CODE,
      ERROR.CODE_DESCRIPTION_STATUS.BAD_DISTANCE_CALCULATION.DESCRIPTION,
      ERROR.CODE_DESCRIPTION_STATUS.BAD_DISTANCE_CALCULATION.STATUS,
    );
  }
}
