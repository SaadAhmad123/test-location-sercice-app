import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { SearchPageInitStates } from "../types";
import { LocationCoordinates, ProximityLocationType } from "../../types";
import { decodeURIData } from "../helpers";
import LocationService from "../../../../API/Zoo/LocationService";
import safeConsole from "../../../../helpers/safeConsole";
import SearchService from "../../../../API/Zoo/SearchService";
import useReactiveRef from "../../../../hooks/useReactiveRef";

const useSearchByAddress = () => {
  const router = useRouter();
  const {
    get: error,
    set: setError,
    onChange: onErrorChange,
  } = useReactiveRef<string | undefined>();
  const {
    set: setInitiated,
    get: initiated,
    onChange: onInitiatedChange,
  } = useReactiveRef<SearchPageInitStates>(SearchPageInitStates.UN_INITIATED);
  const {
    set: setSearchResults,
    onChange: onSearchResultChange,
    get: searchResult,
  } = useReactiveRef<ProximityLocationType[]>([]);
  const {
    set: setSearchAddress,
    get: searchAddress,
    onChange: onSearchAddressChange,
  } = useReactiveRef<string | undefined>();
  const {
    set: setSearchCoord,
    get: searchCoord,
    onChange: onSearchCoordChange,
  } = useReactiveRef<LocationCoordinates | undefined>();

  const search = async (coordinates: LocationCoordinates) => {
    const resp = await SearchService.searchInProximity(
      coordinates.latitude,
      coordinates.longitude
    );
    setSearchResults(resp);
  };

  // eslint-disable-next-line
  const init = async () => {
    try {
      if (initiated() !== SearchPageInitStates.UN_INITIATED) return;
      setInitiated(SearchPageInitStates.LOADING);
      setError(undefined);
      const queryCoordinates = router.query?.["long+lat"];
      let _coordinates = decodeURIData(queryCoordinates || "");
      if (!_coordinates || _coordinates?.length < 1) {
        setInitiated(SearchPageInitStates.UN_INITIATED);
        return;
      }
      let coordinatesToGetAddressFor = _coordinates[0];
      if (typeof _coordinates === "string")
        coordinatesToGetAddressFor = _coordinates;
      const c = coordinatesToGetAddressFor?.split?.("+");
      const resp = await LocationService.getAddress(
        parseFloat(c[1]),
        parseFloat(c[0])
      );
      const loc = resp[0];
      setSearchAddress(loc.formatted || "");
      setSearchCoord({
        longitude: loc?.geometry?.lng || 0,
        latitude: loc?.geometry?.lat || 0,
      });
      await search(searchCoord());
    } catch (e) {
      safeConsole()?.error(e);
      setError(e.message);
      setInitiated(SearchPageInitStates.ERROR);
    }
  };

  useEffect(() => {
    init();
  }, [init, router]);

  return {
    initStatus: {
      get: initiated,
      onChange: onInitiatedChange,
    },
    locationsInProximity: {
      get: searchResult,
      onChange: onSearchResultChange,
    },
    error: {
      onChange: onErrorChange,
      get: error,
    },
    search: {
      address: {
        get: searchAddress,
        onChange: onSearchAddressChange,
      },
      coordinate: {
        get: searchCoord,
        onChange: onSearchCoordChange,
      },
    },
  };
};

export default useSearchByAddress;
