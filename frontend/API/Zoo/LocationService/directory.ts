import {GeoHashApi} from "../../Instances";
import {APIMethod} from "../../Managers/types";
import {AppEnv} from "../../../helpers/AppEnvironmentManager";
import {mockGetAddressOrCoordinates} from "./mocks";

const LocationAPI = {
    getAddress: GeoHashApi.endpoint(
        "/geoencode?lat=:lat&long=:long",
        APIMethod.GET,
        {
            [AppEnv.DEV]: mockGetAddressOrCoordinates,
        }
    ),
    getCoordinates: GeoHashApi.endpoint(
        "/geoencode?address=:address",
        APIMethod.GET,
        {
            [AppEnv.DEV]: mockGetAddressOrCoordinates,
        }
    ),
}


export default LocationAPI