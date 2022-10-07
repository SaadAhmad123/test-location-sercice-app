import { APIMethod, MockRestResolver } from "../../Managers/types";
import { API } from "../../Managers";
import { ApiEnv, ApiEnvironment } from "../../helpers/ApiEnvironmentManager";

export const mockGetAddressOrCoordinates: MockRestResolver = async (
  req,
  res,
  context
) => {
  try {
    const lat = req.url.searchParams.get("lat");
    const long = req.url.searchParams.get("long");
    const address = req.url.searchParams.get("address");
    const proximityLat = req.url.searchParams.get("proximity_lat");
    const proximityLong = req.url.searchParams.get("proximity_long");
    let proximity: string | undefined;
    if (proximityLat && proximityLong) {
      proximity = `${proximityLat},${proximityLong}`;
    }
    let methodToUse: "ADDRESS" | "COORD" | "ERROR" = "ERROR";
    if (address) methodToUse = "ADDRESS";
    else if (lat !== undefined && long !== undefined) methodToUse = "COORD";

    if (methodToUse === "ERROR") {
      return res(
        context.status(500),
        context.json({
          message: "Invalid input arguments",
          lat,
          long,
          address,
        })
      );
    }
    const OpenCageAPI = new API({ baseURL: "https://api.opencagedata.com" });
    const MapboxGeocodingAPI = new API({
      baseURL: "https://api.mapbox.com/geocoding/v5/mapbox.places",
    });
    let ocGetCoords = OpenCageAPI.endpoint(
      "geocode/v1/json?q=:address&key=:key",
      APIMethod.GET
    );
    if (proximity)
      ocGetCoords = OpenCageAPI.endpoint(
        "geocode/v1/json?q=:address&key=:key&proximity=:proximity",
        APIMethod.GET
      );
    if (methodToUse === "ADDRESS") {
      const result = await ocGetCoords
        .resolve({
          ":address": address,
          ":key": process.env.OPEN_CAGE_API_KEY,
          ":proximity": proximity,
        })
        .request();
      return res(
        context.status(200),
        context.json({
          results: (result?.data?.results || []).map((item: any) => ({
            confidence: item?.confidence,
            formatted: item?.formatted,
            geometry: item?.geometry,
          })),
        })
      );
    }
    if (methodToUse === "COORD") {
      const result = await OpenCageAPI.endpoint(
        "/geocode/v1/json?q=:lat+:long&key=:key",
        APIMethod.GET
      )
        .resolve({
          ":lat": lat,
          ":long": long,
          ":key": process.env.OPEN_CAGE_API_KEY,
        })
        .request();
      return res(
        context.status(200),
        context.json({
          results: (result?.data?.results || []).map((item: any) => ({
            confidence: item.confidence,
            formatted: item.formatted,
            geometry: item.geometry,
          })),
        })
      );
    }
    return res(
      context.status(500),
      context.json({
        message: "No response",
      })
    );
  } catch (e) {
    return res(
      context.status(400),
      context.json({
        message: e.message,
        stackTrace: ApiEnvironment.is(ApiEnv.DEV, ApiEnv.NP)
          ? e.stackTrace
          : undefined,
      })
    );
  }
};
