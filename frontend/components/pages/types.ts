export type LocationCoordinates = {
  longitude: number;
  latitude: number;
};

export type ProximityLocationType = {
  id: string;
  name: string;
  rating: number;
  geometry: {
    lat: number;
    lng: number;
  };
};
