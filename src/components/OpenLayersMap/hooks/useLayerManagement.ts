import { useEffect, useRef, useCallback } from "react";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Style, Stroke } from "ol/style";
import { bbox } from "ol/loadingstrategy";
import GeoJSON from "ol/format/GeoJSON";
import { Feature } from "ol";
import { Geometry } from "ol/geom";
import type { Map } from "ol";

import { createWfsLoader } from "../utils";
import { LAYER_STYLES } from "../constants";
import { useMapContext } from "../context/MapContext";

interface LayerConfig {
  id: string;
  style: { color: string; width: number };
  cqlFilter?: string;
  setFeatureCount?: boolean;
}

interface UseLayerManagementProps {
  map: Map | null;
}

export function useLayerManagement({ map }: UseLayerManagementProps) {
  const {
    opacity,
    showBuildings,
    showHighBuildings,
    setIsLoading,
    setFeatureCount,
  } = useMapContext();

  const layerRefs = useRef<{
    allBuildings: VectorLayer | null;
    highBuildings: VectorLayer | null;
  }>({
    allBuildings: null,
    highBuildings: null,
  });

  const createLayer = useCallback(
    (config: LayerConfig): VectorLayer => {
      const source = new VectorSource<Feature<Geometry>>({
        strategy: bbox,
        format: new GeoJSON(),
      });

      const loader = createWfsLoader({
        source,
        setIsLoading,
        setFeatureCount: config.setFeatureCount ? setFeatureCount : undefined,
        cqlFilter: config.cqlFilter,
      });
      source.setLoader(loader);

      return new VectorLayer({
        source,
        style: new Style({ stroke: new Stroke(config.style) }),
        opacity,
        visible:
          showBuildings &&
          (config.id === "allBuildings"
            ? !showHighBuildings
            : showHighBuildings),
      });
    },
    [opacity, showBuildings, showHighBuildings, setIsLoading, setFeatureCount]
  );

  // Initialize layers
  useEffect(() => {
    if (!map) return;

    const layers = [
      {
        id: "allBuildings",
        style: LAYER_STYLES.allBuildings,
        setFeatureCount: true,
      },
      {
        id: "highBuildings",
        style: LAYER_STYLES.highBuildings,
        cqlFilter: "hoogsteBouwlaag > 10",
      },
    ];

    layers.forEach((config) => {
      const layer = createLayer(config);
      map.addLayer(layer);
      layerRefs.current[config.id as keyof typeof layerRefs.current] = layer;
    });

    // Cleanup
    return () => {
      const currentLayers = { ...layerRefs.current };
      Object.values(currentLayers).forEach((layer) => {
        if (layer) {
          const source = layer.getSource();
          const abortController = source?.get("abortController");
          if (abortController) abortController.abort();
          map.removeLayer(layer);
        }
      });
    };
  }, [map, createLayer]);

  // Update layer properties
  useEffect(() => {
    Object.entries(layerRefs.current).forEach(([key, layer]) => {
      if (layer) {
        layer.setOpacity(opacity);
        const isVisible =
          showBuildings &&
          (key === "allBuildings" ? !showHighBuildings : showHighBuildings);
        layer.setVisible(isVisible);
      }
    });
  }, [opacity, showBuildings, showHighBuildings]);

  return layerRefs;
}
