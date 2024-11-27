export interface IDistanceResponse {
  origin: string;
  destination: string;
  distanceText: string;
  distanceValue: number;
  durationText: string;
  durationValue: number;
  originCoordinates: {
    lat: string;
    lng: string;
  };
  destinationCoordinates: {
    lat: string;
    lng: string;
  };
  routeResponse: {
    originCoordinatesGeocodeResponse: object;
    destinationCoordinatesGeocodeResponse: object;
    distancematrixResponse: object;
  };
}
