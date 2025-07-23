"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { MantineProvider } from "@mantine/core";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Style, Stroke } from "ol/style";
import { bbox } from "ol/loadingstrategy";
import GeoJSON from "ol/format/GeoJSON";
import { Feature } from "ol";
import { Geometry } from "ol/geom";

import { ControlPanel } from "./ControlPanel";
import { useMapInitialization } from "./hooks/useMapInitialization";
import { createWfsLoader } from "./utils";
import { DEFAULT_OPACITY, LAYER_STYLES } from "./constants";
import type { OpenLayersMapProps } from "./types";

const OpenLayersMap = ({ height = "100vh" }: OpenLayersMapProps) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const { map, layerRefs } = useMapInitialization(mapContainerRef);

  // UI State
  const [showBuildings, setShowBuildings] = useState(true);
  const [showHighBuildings, setShowHighBuildings] = useState(false);
  const [opacity, setOpacity] = useState(DEFAULT_OPACITY);
  const [isLoading, setIsLoading] = useState(false);
  const [featureCount, setFeatureCount] = useState(0);

  // Get current zoom level
  const getMapZoom = useCallback(() => {
    return map?.getView().getZoom();
  }, [map]);

  // Initialize layers when map is ready
  useEffect(() => {
    if (!map) return;

    // Create all buildings layer (blue)
    const allBuildingsSource = new VectorSource<Feature<Geometry>>({
      strategy: bbox,
      format: new GeoJSON(),
    });
    const allBuildingsLoader = createWfsLoader({
      source: allBuildingsSource,
      setIsLoading,
      setFeatureCount,
    });
    allBuildingsSource.setLoader(allBuildingsLoader);

    const allBuildingsLayer = new VectorLayer({
      source: allBuildingsSource,
      style: new Style({ stroke: new Stroke(LAYER_STYLES.allBuildings) }),
      opacity: opacity,
      visible: showBuildings && !showHighBuildings,
    });

    // Create high buildings layer (red, >10 floors)
    const highBuildingsSource = new VectorSource<Feature<Geometry>>({
      strategy: bbox,
      format: new GeoJSON(),
    });

    const highBuildingsLoader = createWfsLoader({
      source: highBuildingsSource,
      setIsLoading,
      cqlFilter: "hoogsteBouwlaag > 10",
    });
    highBuildingsSource.setLoader(highBuildingsLoader);

    const highBuildingsLayer = new VectorLayer({
      source: highBuildingsSource,
      style: new Style({ stroke: new Stroke(LAYER_STYLES.highBuildings) }),
      opacity: opacity,
      visible: showBuildings && showHighBuildings,
    });

    // Add layers to map
    map.addLayer(allBuildingsLayer);
    map.addLayer(highBuildingsLayer);

    // Store layer references
    layerRefs.current.allBuildings = allBuildingsLayer;
    layerRefs.current.highBuildings = highBuildingsLayer;

    // Cleanup
    return () => {
      // Abort any ongoing fetches for both layers
      const allBuildingsAbort = allBuildingsSource.get("abortController");
      if (allBuildingsAbort) allBuildingsAbort.abort();
      const highBuildingsAbort = highBuildingsSource.get("abortController");
      if (highBuildingsAbort) highBuildingsAbort.abort();
      map.removeLayer(allBuildingsLayer);
      map.removeLayer(highBuildingsLayer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, getMapZoom, setIsLoading, setFeatureCount]);

  // Update layer visibility and opacity
  useEffect(() => {
    if (layerRefs.current.allBuildings) {
      layerRefs.current.allBuildings.setOpacity(opacity);
      layerRefs.current.allBuildings.setVisible(
        showBuildings && !showHighBuildings
      );
    }
    if (layerRefs.current.highBuildings) {
      layerRefs.current.highBuildings.setOpacity(opacity);
      layerRefs.current.highBuildings.setVisible(
        showBuildings && showHighBuildings
      );
    }
  }, [opacity, showBuildings, showHighBuildings]);

  return (
    <MantineProvider defaultColorScheme="dark">
      <div
        className="w-full max-w-5xl mx-auto mt-8 rounded-xl shadow-lg p-6 bg-transparent flex flex-row gap-6"
        style={{ height }}
      >
        <ControlPanel
          showBuildings={showBuildings}
          setShowBuildings={setShowBuildings}
          showHighBuildings={showHighBuildings}
          setShowHighBuildings={setShowHighBuildings}
          opacity={opacity}
          setOpacity={setOpacity}
          isLoading={isLoading}
          featureCount={featureCount}
        />

        {/* Map Area */}
        <div
          className="flex-1 min-w-0 rounded-lg overflow-hidden border border-gray-200"
          style={{ height: "100%", position: "relative" }}
        >
          <div ref={mapContainerRef} className="w-full h-full" />
        </div>

        <style jsx global>{`
          .custom-mouse-position {
            position: absolute;
            bottom: 10px;
            left: 10px;
            background-color: rgba(24, 26, 27, 0.95);
            color: #fff;
            padding: 8px 12px;
            border-radius: 6px;
            font-family: "Courier New", monospace;
            font-size: 14px;
            font-weight: 500;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            border: 1px solid rgba(0, 0, 0, 0.1);
          }
        `}</style>
      </div>
    </MantineProvider>
  );
};

export default OpenLayersMap;
