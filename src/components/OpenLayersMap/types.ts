import type { Map } from "ol";
import type { Extent } from "ol/extent";
import type { ProjectionLike } from "ol/proj";
import type { Feature } from "ol";
import type { Geometry } from "ol/geom";

export interface OpenLayersMapProps {
  height?: string;
}

export type LoaderFunction = (
  extent: Extent,
  resolution: number,
  projection: ProjectionLike,
  success?: (features: Feature<Geometry>[]) => void,
  failure?: () => void
) => void;

export interface LayerConfig {
  color: string;
  width: number;
  filter?: string;
}

export interface LoadingState {
  isLoading: boolean;
  error: string | null;
}

export interface MapContextType {
  map: Map | null;
  isLoading: boolean;
  featureCount: number;
}