export enum SearchPageInitStates {
  UN_INITIATED,
  LOADING,
  INITIATED,
  ERROR,
}

export type ViewPortType = {
  latitude: number;
  longitude: number;
  zoom: number;
};
