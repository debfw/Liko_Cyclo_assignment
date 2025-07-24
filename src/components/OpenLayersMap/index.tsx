"use client";

import React, { useRef } from "react";
import { MantineProvider } from "@mantine/core";

import { ControlPanel } from "./ControlPanel";
import { useMapInitialization } from "./hooks/useMapInitialization";
import { useLayerManagement } from "./hooks/useLayerManagement";
import { MapProvider } from "./context/MapContext";
import type { OpenLayersMapProps } from "./types";

const MapComponent = () => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const { map } = useMapInitialization(mapContainerRef);

  // Layer management
  useLayerManagement({ map });

  return (
    <div
      className="w-full max-w-5xl mx-auto mt-8 rounded-xl shadow-lg p-6 bg-transparent flex flex-row gap-6"
      style={{ height: "100vh" }}
    >
      <ControlPanel />

      {/* Map Area */}
      <div
        className="flex-1 min-w-0 rounded-lg overflow-hidden border border-gray-200"
        style={{ height: "100%", position: "relative" }}
      >
        <div ref={mapContainerRef} className="w-full h-full" />
      </div>

      <style jsx global>{`
        .mousePosition {
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
  );
};

const OpenLayersMap = ({ height = "100vh" }: OpenLayersMapProps) => {
  return (
    <MantineProvider defaultColorScheme="dark">
      <MapProvider>
        <div style={{ height }}>
          <MapComponent />
        </div>
      </MapProvider>
    </MantineProvider>
  );
};

export default OpenLayersMap;
