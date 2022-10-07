import { useState } from "react";
import { LocationCoordinates } from "../../types";
import getClientCurrentLocation from "../../../../helpers/getClientCurrentLocation";
import LocationService from "../../../../API/Zoo/LocationService";
import safeConsole from "../../../../helpers/safeConsole";
import { useRouter } from "next/router";

const useIndexPage = () => {
  const router = useRouter();
  const [error, setError] = useState<string | undefined>();
  const [address, setAddress] = useState("");
  const [coords, setCoords] = useState<LocationCoordinates | undefined>();
  const [loadingCurrentAddress, setLoadingCurrentAddress] = useState(false);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const handleOnSearchChange = (value: string) => {
    setAddress(value);
    setCoords(undefined);
  };
  const handleOnClickCurrentLocation = async () => {
    try {
      setLoadingCurrentAddress(true);
      setError(undefined);
      const location = await getClientCurrentLocation();
      let resp = await LocationService.getAddress(
        location.coords.latitude,
        location.coords.longitude
      );
      resp = (resp || []).sort((a: any, b: any) => b.confidence - a.confidence);
      setAddress(resp[0].formatted);
      setCoords(location.coords);
    } catch (e) {
      safeConsole()?.error(e);
      setError(e.message || "Error occurred");
    } finally {
      setLoadingCurrentAddress(false);
    }
  };
  const handleOnSearch = async () => {
    try {
      setLoadingSearch(true);
      setError(undefined);
      if (!address) throw new Error("No address is provided");
      if (coords) {
        await router.push({
          pathname: "/search/[long+lat]",
          query: {
            "long+lat": encodeURIComponent(
              `${coords.longitude}+${coords.latitude}`
            ),
          },
        });
        return;
      }
      let resp = await LocationService.getCoordinates(address);
      resp = (resp || []).sort((a: any, b: any) => b.confidence - a.confidence);
      const _coords: LocationCoordinates = {
        latitude: resp[0]?.geometry?.lat,
        longitude: resp[0]?.geometry?.lng,
      };
      setCoords(_coords);
      await router.push({
        pathname: "/search/[long+lat]",
        query: {
          "long+lat": encodeURIComponent(
            `${_coords.longitude}+${_coords.latitude}`
          ),
        },
      });
      return;
    } catch (e) {
      safeConsole()?.error(e);
      setError(e.message || "Error occurred");
    } finally {
      setLoadingSearch(false);
    }
  };

  return {
    error,
    loading: {
      currentAddress: loadingCurrentAddress,
      search: loadingSearch,
    },
    handleOnClickCurrentLocation,
    handleOnSearch,
    handleOnSearchChange,
    address,
  };
};

export default useIndexPage;
