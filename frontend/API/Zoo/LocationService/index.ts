import LocationAPI from "./directory";
import apiConsole from "../../helpers/apiConsole";

const LocationService = {
    getAddress: (lat: number, long: number) => {
        LocationAPI
            .getAddress
            .resolve({
                ":lat": lat.toString(),
                ":long": long.toString(),
            })
            .request()
            .then((resp) => apiConsole().log({resp}))
            .catch(e => apiConsole().error(e))
    }
}

export default LocationService