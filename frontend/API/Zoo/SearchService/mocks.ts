import { MockRestResolver } from "../../Managers/types";
import { ApiEnv, ApiEnvironment } from "../../helpers/ApiEnvironmentManager";

export const mockSearchInProximity: MockRestResolver = (req, res, context) => {
  try {
    const lat = parseFloat(req.url.searchParams.get("lat")) - 0.03;
    const long = parseFloat(req.url.searchParams.get("long")) - 0.03;

    if (isNaN(lat) || isNaN(long)) {
      return res(
        context.status(400),
        context.json({
          message: "Invalid input numbers (lat or long)",
        })
      );
    }

    const data = [] as any[];
    for (let i = 0; i < 100; i++) {
      data.push({
        id: i.toString(),
        name: "Location 1",
        rating: 4.5,
        geometry: {
          lat: lat + 0.06 * Math.random(),
          lng: long + 0.06 * Math.random(),
        },
      });
    }
    return res(context.status(200), context.delay(1000), context.json(data));
  } catch (e) {
    return res(
      context.status(500),
      context.json({
        message: e.message,
        stackTrace: ApiEnvironment.is(ApiEnv.DEV, ApiEnv.NP)
          ? e.stackTrace
          : undefined,
      })
    );
  }
};
