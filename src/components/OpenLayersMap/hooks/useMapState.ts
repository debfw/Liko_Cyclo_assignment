import { useState } from "react";
import { DEFAULT_OPACITY } from "../constants";

export function useMapState() {
  const [showBuildings, setShowBuildings] = useState(true);
  const [showHighBuildings, setShowHighBuildings] = useState(false);
  const [opacity, setOpacity] = useState(DEFAULT_OPACITY);
  const [isLoading, setIsLoading] = useState(false);
  const [featureCount, setFeatureCount] = useState(0);

  return {
    // Layer visibility
    showBuildings,
    setShowBuildings,
    showHighBuildings,
    setShowHighBuildings,

    // Layer properties
    opacity,
    setOpacity,

    // Loading state
    isLoading,
    setIsLoading,
    featureCount,
    setFeatureCount,
  };
}
