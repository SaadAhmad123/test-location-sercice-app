import SearchAPI from "./directory";
import { ProximityLocationType } from "../../../components/pages/types";

const SearchService = {
  searchInProximity: async (lat: number, long: number) => {
    const result = await SearchAPI.searchInProximity
      .resolve({
        ":lat": lat.toString(),
        ":long": long.toString(),
      })
      .request();
    return (result?.data || []) as ProximityLocationType[];
  },
};

export default SearchService;
