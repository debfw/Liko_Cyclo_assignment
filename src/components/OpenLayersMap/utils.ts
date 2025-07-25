import { Feature } from "ol";
import { Geometry } from "ol/geom";
import VectorSource from "ol/source/Vector";
import GeoJSON from "ol/format/GeoJSON";
import { WFS_BASE_URL, WFS_PARAMS } from "./constants";
import type { LoaderFunction } from "./types";

/**
 * Build WFS URL with parameters
 */
export function buildWfsUrl(
  extent: number[],
  featureCount: number,
  cqlFilter?: string
): string {
  const params = new URLSearchParams({
    ...WFS_PARAMS,
    bbox: `${extent.join(",")},${WFS_PARAMS.srsname}`,
    count: featureCount.toString(),
  });

  if (cqlFilter) {
    params.append("cql_filter", cqlFilter);
  }

  return `${WFS_BASE_URL}?${params.toString()}`;
}

/**
 * Create a generic WFS loader function
 */
export function createWfsLoader(options: {
  source: VectorSource<Feature<Geometry>>;
  setIsLoading: (loading: boolean) => void;
  setFeatureCount?: (updater: (prev: number) => number) => void;
  cqlFilter?: string;
}): LoaderFunction {
  return function (extent, resolution, projection, success, failure) {
    const prevController = options.source.get("abortController");
    if (prevController) prevController.abort();

    options.setIsLoading(true);
    const featureCount = 1000; // Always use a fixed feature count
    const url = buildWfsUrl(extent, featureCount, options.cqlFilter);

    // Add abort controller for cancellable requests
    const controller = new AbortController();
    options.source.set("abortController", controller);

    fetch(url, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((json) => {
        const format = options.source.getFormat() as GeoJSON;
        const features = format.readFeatures(json, {
          dataProjection: WFS_PARAMS.srsname,
          featureProjection: projection,
        });

        options.source.addFeatures(features);

        if (options.setFeatureCount) {
          options.setFeatureCount((prev) => prev + features.length);
        }

        options.setIsLoading(false);
        success?.(features);
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          console.error("Error loading features:", error);
        }
        options.setIsLoading(false);
        failure?.();
      });
  };
}
