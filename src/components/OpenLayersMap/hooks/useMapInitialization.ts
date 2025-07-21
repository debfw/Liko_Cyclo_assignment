import { useEffect, useRef, useState } from "react";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import VectorLayer from "ol/layer/Vector";
import { defaults as defaultControls } from "ol/control";
import MousePosition from "ol/control/MousePosition";
import { createStringXY } from "ol/coordinate";
import { register } from "ol/proj/proj4";
import proj4 from "proj4";
import {
  RD_PROJECTION,
  RD_PROJECTION_DEF,
  AMSTERDAM_CENTER,
  DEFAULT_ZOOM,
  MIN_ZOOM,
  MAX_ZOOM,
} from "../constants";

// Register RD projection once
proj4.defs(RD_PROJECTION, RD_PROJECTION_DEF);
// @ts-expect-error - proj4 type mismatch with ol/proj/proj4
register(proj4);

export function useMapInitialization(
  mapRef: React.RefObject<HTMLDivElement | null>
) {
  const [map, setMap] = useState<Map | null>(null);
  const layerRefs = useRef<{
    allBuildings: VectorLayer | null;
    highBuildings: VectorLayer | null;
  }>({
    allBuildings: null,
    highBuildings: null,
  });

  useEffect(() => {
    if (!mapRef.current) return;

    const osmLayer = new TileLayer({
      source: new OSM(),
    });

    const mousePositionControl = new MousePosition({
      coordinateFormat: createStringXY(2),
      projection: RD_PROJECTION,
      className: "custom-mouse-position",
      target: undefined,
      placeholder: "No coordinates",
    });

    const newMap = new Map({
      target: mapRef.current,
      layers: [osmLayer],
      view: new View({
        projection: RD_PROJECTION,
        center: AMSTERDAM_CENTER,
        zoom: DEFAULT_ZOOM,
        minZoom: MIN_ZOOM,
        maxZoom: MAX_ZOOM,
      }),
      controls: defaultControls().extend([mousePositionControl]),
    });

    setMap(newMap);

    return () => {
      newMap.setTarget(undefined);
    };
  }, [mapRef]);

  return { map, layerRefs };
}
