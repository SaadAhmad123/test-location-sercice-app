import { APIMethod, MockRestResolver } from "../../Managers/types";
import { API } from "../../Managers";

export const mockGetAddressOrCoordinates: MockRestResolver = async (
  req,
  res,
  context
) => {
  try {
    const lat = req.url.searchParams.get("lat");
    const long = req.url.searchParams.get("long");
    const address = req.url.searchParams.get("address");

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
    if (methodToUse === "ADDRESS") {
      const result = await OpenCageAPI.endpoint(
        "geocode/v1/json?q=:address&key=:key",
        APIMethod.GET
      )
        .resolve({
          ":address": address,
          ":key": process.env.OPEN_CAGE_API_KEY,
        })
        .request();
      return res(context.status(200), context.json(result.data));
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
      return res(context.status(200), context.json(result.data));
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
        stack: e.stackTrace,
      })
    );
  }
};
