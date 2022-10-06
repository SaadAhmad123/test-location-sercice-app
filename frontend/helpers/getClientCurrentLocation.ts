import Error from "next/error";

const getClientCurrentLocation = () =>
  new Promise<GeolocationPosition>((resolve, reject) => {
    try {
      navigator.geolocation.getCurrentPosition(resolve, (e) => {
        reject(e);
      });
    } catch (e) {
      reject(e);
    }
  });

export default getClientCurrentLocation;
