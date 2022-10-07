import LocationAPI from "./directory";
import apiConsole from "../../helpers/apiConsole";
import getClientCurrentLocation from "../../../helpers/getClientCurrentLocation";
import safeConsole from "../../../helpers/safeConsole";

const LocationService = {
  getAddress: async (lat: number, long: number) => {
    const resp = await LocationAPI.getAddress
      .resolve({
        ":lat": lat.toString(),
        ":long": long.toString(),
      })
      .request();
    return resp.data.results;
  },
  getCoordinates: async (address: string) => {
    let proximity: GeolocationPosition = undefined;
    try {
      proximity = await getClientCurrentLocation();
    } catch (e) {
      safeConsole()?.log(e);
    }
    let apiCall = LocationAPI.getCoordinates;
    if (proximity) apiCall = LocationAPI.getCoordinatesWithProximity;
    const resp = await apiCall
      .resolve({
        ":address": encodeURIComponent(address),
        ":proximityLat": proximity.coords.latitude.toString(),
        ":proximityLong": proximity.coords.longitude.toString(),
      })
      .request();
    return resp.data.results;
  },
};

export default LocationService;
