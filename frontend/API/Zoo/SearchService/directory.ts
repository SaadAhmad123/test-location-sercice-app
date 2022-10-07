import { GeoHashApi } from "../../Instances";
import { APIMethod } from "../../Managers/types";
import { ApiEnv } from "../../helpers/ApiEnvironmentManager";
import { mockSearchInProximity } from "./mocks";

const SearchAPI = {
  searchInProximity: GeoHashApi.endpoint(
    "/search?lat=:lat&long=:long",
    APIMethod.GET,
    {
      [ApiEnv.DEV]: mockSearchInProximity,
    }
  ),
};

export default SearchAPI;
