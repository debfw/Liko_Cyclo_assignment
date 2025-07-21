// Projection constants
export const RD_PROJECTION = "EPSG:28992";
export const RD_PROJECTION_DEF =
  "+proj=sterea +lat_0=52.15616055555555 +lon_0=5.38763888888889 +k=0.9999079 +x_0=155000 +y_0=463000 +ellps=bessel +towgs84=565.417,50.3319,465.552,-0.398957,0.343988,-1.8774,4.0725 +units=m +no_defs";

// Map view constants
export const AMSTERDAM_CENTER = [155000, 463000];
export const DEFAULT_ZOOM = 13;
export const MIN_ZOOM = 6;
export const MAX_ZOOM = 18;

// Loading optimization constants
export const ZOOM_THRESHOLDS = {
  NO_LOAD: 10,
  LOW_DETAIL: 12,
  MEDIUM_DETAIL: 14,
  HIGH_DETAIL: 16,
} as const;

export const FEATURE_COUNTS = {
  LOW: 500,
  MEDIUM: 2000,
  HIGH: 5000,
  MAX: 20000,
} as const;

export const MAX_EXTENT_AREA = 25000000;

// WFS API constants
export const WFS_BASE_URL = "https://service.pdok.nl/lv/bag/wfs/v2_0";
export const WFS_PARAMS = {
  service: "WFS",
  version: "2.0.0",
  request: "GetFeature",
  typeName: "bag:pand",
  outputFormat: "json",
  srsname: RD_PROJECTION,
} as const;

// Layer styling
export const LAYER_STYLES = {
  allBuildings: {
    color: "#0000FF",
    width: 1,
  },
  highBuildings: {
    color: "#FF0000",
    width: 2,
  },
} as const;

// UI constants
export const CONTROL_PANEL_WIDTH = 340;
export const DEFAULT_OPACITY = 0.7;
