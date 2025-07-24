import React, { createContext, useContext, ReactNode } from "react";
import { useMapState } from "../hooks/useMapState";

interface MapContextType {
  // Layer visibility
  showBuildings: boolean;
  setShowBuildings: (value: boolean) => void;
  showHighBuildings: boolean;
  setShowHighBuildings: (value: boolean) => void;

  // Layer properties
  opacity: number;
  setOpacity: (value: number) => void;

  // Loading state
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  featureCount: number;
  setFeatureCount: (updater: (prev: number) => number) => void;
}

const MapContext = createContext<MapContextType | undefined>(undefined);

interface MapProviderProps {
  children: ReactNode;
}

export function MapProvider({ children }: MapProviderProps) {
  const mapState = useMapState();

  return <MapContext.Provider value={mapState}>{children}</MapContext.Provider>;
}

export function useMapContext() {
  const context = useContext(MapContext);
  if (context === undefined) {
    throw new Error("useMapContext must be used within a MapProvider");
  }
  return context;
}
