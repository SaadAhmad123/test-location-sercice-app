import { MutableRefObject, useCallback, useRef } from "react";
import mapboxgl, { GeolocateControl, Map } from "mapbox-gl";
import onMount from "../../../../hooks/onMount";
import { ViewPortType } from "../types";
import useReactiveRef from "../../../../hooks/useReactiveRef";
import { LocationCoordinates } from "../../types";

const useMap = (mapContainerRef: MutableRefObject<HTMLElement>) => {
  const mapRef = useRef<Map>();
  const { get: onViewportChange, set: setOnViewportChange } = useReactiveRef<
    ((viewport: ViewPortType) => void) | undefined
  >();
  const { get: viewport, set: setViewport } = useReactiveRef<
    ViewPortType | undefined
  >(undefined, (newValue) =>
    onViewportChange()?.({
      longitude: mapRef.current.getCenter().lng,
      latitude: mapRef.current.getCenter().lat,
      zoom: mapRef.current.getZoom(),
    })
  );
  const { get: geoLocation, set: setGeoLocation } = useReactiveRef<
    GeolocateControl | undefined
  >();

  onMount(() => {
    if (mapRef.current) return;
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [0, 0],
      zoom: 3.5,
      accessToken: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN,
    });

    mapRef.current.on("move", () => {
      setViewport({
        longitude: mapRef.current.getCenter().lng,
        latitude: mapRef.current.getCenter().lat,
        zoom: mapRef.current.getZoom(),
      });
    });

    mapRef.current.addControl(
      new mapboxgl.NavigationControl({
        showCompass: true,
        showZoom: true,
        visualizePitch: true,
      })
    );

    setGeoLocation(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
      })
    );
    mapRef.current.addControl(geoLocation());
  });

  const handleSetViewport = useCallback((newViewport: ViewPortType) => {
    mapRef.current?.flyTo({
      center: [newViewport.longitude, newViewport.latitude],
      zoom: newViewport.zoom,
    });
  }, []);

  const handleSetMarkers = useCallback(
    (markers: (LocationCoordinates & { tooltipText?: string })[]) => {
      if (!mapRef.current) return;
      markers.forEach((m) => {
        if (!m) return;
        const mark = new mapboxgl.Marker()
          .setLngLat([m.longitude, m.latitude])
          .addTo(mapRef.current);
        if (!m.tooltipText) return;
        const popup = new mapboxgl.Popup({ offset: 25 }).setText(m.tooltipText);
        mark.setPopup(popup);
      });
    },
    []
  );

  return {
    viewport: {
      onChange: setOnViewportChange,
      get: viewport,
      set: handleSetViewport,
    },
    locate: () => geoLocation()?.trigger?.(),
    setMarker: handleSetMarkers,
  };
};

export default useMap;
