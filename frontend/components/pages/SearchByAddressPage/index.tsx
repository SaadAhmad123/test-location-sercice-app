import Layout from "../../Layout";
import useSearchByAddress from "./hooks/useSearchByAddress";
import { useRef } from "react";
import useMap from "./hooks/useMap";
import "mapbox-gl/dist/mapbox-gl.css";
import onMount from "../../../hooks/onMount";
import { LocationCoordinates } from "../types";

const SearchByAddressPage = () => {
  const mapContainer = useRef();
  const { viewport, locate, setMarker } = useMap(mapContainer);
  const { search, locationsInProximity } = useSearchByAddress();

  onMount(() => {
    locationsInProximity.onChange((newValue) => {
      const locs = (newValue || []).map(
        (item) =>
          ({
            latitude: item.geometry.lat,
            longitude: item.geometry.lng,
            tooltipText: `${item.name} - ${item.rating}`,
          } as LocationCoordinates & { tooltipText: string })
      );
      setMarker(locs);
    });

    search.coordinate.onChange((newValue) => {
      if (!newValue) return;
      viewport.set({
        ...newValue,
        zoom: 12,
      });
      locate();
    });
  });

  return (
    <Layout nav={false} title={{ header: "GeoHash Search" }}>
      <div ref={mapContainer} className="h-screen overflow-hidden" />
    </Layout>
  );
};

export default SearchByAddressPage;
