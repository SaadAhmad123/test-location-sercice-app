import LocationAPI from "./directory";
import apiConsole from "../../helpers/apiConsole";

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
    const resp = await LocationAPI.getCoordinates
      .resolve({
        ":address": encodeURIComponent(address),
      })
      .request();
    return resp.data.results;
  },
};

export default LocationService;
