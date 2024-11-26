import axios from 'axios';
import * as dotenv from 'dotenv';
import { AppError } from 'src/errors/AppError';
import { ERROR } from 'src/errors/errors';
import { IDistanceResponse } from '../interfaces/IDistanceResponse';

dotenv.config();

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const BASE_URL = 'https://maps.googleapis.com/maps/api/distancematrix/json';
const GEOCODING_URL = 'https://maps.googleapis.com/maps/api/geocode/json';

if (!GOOGLE_API_KEY) {
  throw new AppError(
    ERROR.CODE_DESCRIPTION_STATUS.INVALID_API_KEY.CODE,
    ERROR.CODE_DESCRIPTION_STATUS.INVALID_API_KEY.DESCRIPTION,
    ERROR.CODE_DESCRIPTION_STATUS.INVALID_API_KEY.STATUS,
  );
}

export async function getTimeAndDistanceOfRide(
  origin: string,
  destination: string,
  mode: string,
): Promise<IDistanceResponse> {
  try {
    // Coordinates getters
    const originCoordinates = await getCoordinates(origin);
    const destinationCoordinates = await getCoordinates(destination);

    if (!originCoordinates || !destinationCoordinates) {
      throw new AppError(
        ERROR.CODE_DESCRIPTION_STATUS.COORDINATES_NOT_FOUND.CODE,
        ERROR.CODE_DESCRIPTION_STATUS.COORDINATES_NOT_FOUND.DESCRIPTION,
        ERROR.CODE_DESCRIPTION_STATUS.COORDINATES_NOT_FOUND.STATUS,
      );
    }

    // Use coordinates in Matrix API
    const distancematrixResponse = await axios.get(BASE_URL, {
      params: {
        origins: `${originCoordinates.lat},${originCoordinates.lng}`,
        destinations: `${destinationCoordinates.lat},${destinationCoordinates.lng}`,
        key: GOOGLE_API_KEY,
        mode,
      },
    });

    const data = distancematrixResponse.data;

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

    // Prepares the routeResponse object with the sanitized responses
    const routeResponse = {
      originCoordinatesGeocodeResponse: sanitizeResponse(originCoordinates),
      destinationCoordinatesGeocodeResponse: sanitizeResponse(
        destinationCoordinates,
      ),
      distancematrixResponse: sanitizeResponse({
        status: distancematrixResponse.data.status,
        origin_addresses: distancematrixResponse.data.origin_addresses,
        destination_addresses:
          distancematrixResponse.data.destination_addresses,
        rows: distancematrixResponse.data.rows,
        request: {
          origin: `${originCoordinates.lat},${originCoordinates.lng}`,
          destination: `${destinationCoordinates.lat},${destinationCoordinates.lng}`,
          mode,
        },
      }),
    };

    return {
      origin: data.origin_addresses[0],
      destination: data.destination_addresses[0],
      originCoordinates: {
        lat: originCoordinates.lat,
        lng: originCoordinates.lng,
      },
      destinationCoordinates: {
        lat: destinationCoordinates.lat,
        lng: destinationCoordinates.lng,
      },
      distanceText: element.distance.text,
      distanceValue: element.distance.value,
      durationText: element.duration.text,
      durationValue: element.duration.value,
      routeResponse,
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

async function getCoordinates(address: string) {
  const response = await axios.get(GEOCODING_URL, {
    params: {
      address,
      key: GOOGLE_API_KEY,
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

  const location = data.results[0]?.geometry?.location;

  if (!location) {
    throw new AppError(
      ERROR.CODE_DESCRIPTION_STATUS.INVALID_COORDINATES.CODE,
      ERROR.CODE_DESCRIPTION_STATUS.INVALID_COORDINATES.DESCRIPTION,
      ERROR.CODE_DESCRIPTION_STATUS.INVALID_COORDINATES.STATUS,
    );
  }

  return location;
}

// Function to clean objects from circular references
function sanitizeResponse(obj: any): any {
  const seen = new WeakSet();

  return JSON.parse(
    JSON.stringify(obj, (key, value) => {
      // Ignores specific fields that may cause circularity
      if (
        key === 'socket' ||
        key === 'client' ||
        key === '_httpMessage' ||
        key === 'httpModule'
      ) {
        return undefined;
      }

      // Treat objects to avoid circular references
      if (typeof value === 'object' && value !== null) {
        if (seen.has(value)) {
          return undefined;
        }
        seen.add(value);
      }
      return value;
    }),
  );
}
