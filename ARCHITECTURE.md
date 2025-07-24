# 🏗️ Codebase Architecture Documentation

## 🔄 Data Flow Architecture

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                              USER INTERACTION LAYER                            │
└─────────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                              CONTROL PANEL (UI)                                │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────┐ │
│  │   Opacity       │  │  Show Buildings │  │ Show High       │  │  Feature    │ │
│  │   Slider        │  │  Toggle         │  │ Buildings Toggle│  │  Count      │ │
│  │                 │  │                 │  │                 │  │  Display    │ │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘  └─────────────┘ │
└─────────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                              MAP CONTEXT (STATE MANAGEMENT)                    │
│  ┌─────────────────────────────────────────────────────────────────────────────┐ │
│  │  State: {                                                                   │ │
│  │    opacity: number,                                                        │ │
│  │    showBuildings: boolean,                                                 │ │
│  │    showHighBuildings: boolean,                                             │ │
│  │    isLoading: boolean,                                                     │ │
│  │    featureCount: number                                                    │ │
│  │  }                                                                         │ │
│  └─────────────────────────────────────────────────────────────────────────────┘ │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────┐ │
│  │  setOpacity     │  │ setShowBuildings│  │setShowHighBuilds│  │setIsLoading │ │
│  │                 │  │                 │  │                 │  │             │ │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘  └─────────────┘ │
└─────────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                              HOOKS LAYER (BUSINESS LOGIC)                      │
│  ┌─────────────────────────────────────────────────────────────────────────────┐ │
│  │  useMapState                                                               │ │
│  │  • Watches context changes                                                 │ │
│  │  • Updates map properties (opacity, visibility)                           │ │
│  │  • Triggers re-renders                                                    │ │
│  └─────────────────────────────────────────────────────────────────────────────┘ │
│  ┌─────────────────────────────────────────────────────────────────────────────┐ │
│  │  useLayerManagement                                                       │ │
│  │  • Creates vector layers                                                  │ │
│  │  • Manages layer lifecycle                                               │ │
│  │  • Handles layer visibility logic                                        │ │
│  │  • Sets up WFS loaders                                                   │ │
│  └─────────────────────────────────────────────────────────────────────────────┘ │
│  ┌─────────────────────────────────────────────────────────────────────────────┐ │
│  │  useMapInitialization                                                     │ │
│  │  • Creates OpenLayers map instance                                       │ │
│  │  • Sets up view and controls                                             │ │
│  │  • Configures initial extent                                             │ │
│  └─────────────────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                              UTILS LAYER (DATA LOADING)                        │
│  ┌─────────────────────────────────────────────────────────────────────────────┐ │
│  │  createWfsLoader                                                           │ │
│  │  • Creates loader function for OpenLayers                                 │ │
│  │  • Handles request cancellation                                           │ │
│  │  • Manages loading states                                                │ │
│  │  • Processes coordinate transformations                                   │ │
│  └─────────────────────────────────────────────────────────────────────────────┘ │
│  ┌─────────────────────────────────────────────────────────────────────────────┐ │
│  │  buildWfsUrl                                                              │ │
│  │  • Constructs WFS request URLs                                           │ │
│  │  • Adds bounding box parameters                                          │ │
│  │  • Applies CQL filters                                                   │ │
│  │  • Sets feature count limits                                             │ │
│  └─────────────────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                              OPENLAYERS LAYER (RENDERING)                      │
│  ┌─────────────────────────────────────────────────────────────────────────────┐ │
│  │  VectorSource                                                              │ │
│  │  • Stores feature data                                                    │ │
│  │  • Triggers loader on pan/zoom                                           │ │
│  │  • Manages feature lifecycle                                             │ │
│  └─────────────────────────────────────────────────────────────────────────────┘ │
│  ┌─────────────────────────────────────────────────────────────────────────────┐ │
│  │  VectorLayer                                                              │ │
│  │  • Renders features on map                                               │ │
│  │  • Applies styles and opacity                                            │ │
│  │  • Handles visibility                                                    │ │
│  └─────────────────────────────────────────────────────────────────────────────┘ │
│  ┌─────────────────────────────────────────────────────────────────────────────┐ │
│  │  Map Instance                                                             │ │
│  │  • Manages view and interactions                                         │ │
│  │  • Handles pan/zoom events                                               │ │
│  │  • Triggers data loading                                                 │ │
│  └─────────────────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                              EXTERNAL DATA SOURCE                              │
│  ┌─────────────────────────────────────────────────────────────────────────────┐ │
│  │  WFS Server (Cyclomedia)                                                  │ │
│  │  • Provides building footprint data                                       │ │
│  │  • Accepts bounding box queries                                          │ │
│  │  • Supports CQL filtering                                                │ │
│  │  • Returns GeoJSON format                                                │ │
│  └─────────────────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────────────┘
```

## 🏗️ Component Hierarchy

```
App (page.tsx)
└── OpenLayersMap (index.tsx)
    ├── MapContext.Provider
    │   ├── useMapInitialization
    │   │   └── OpenLayers Map Instance
    │   │
    │   ├── useLayerManagement
    │   │   ├── All Buildings Layer
    │   │   └── High Buildings Layer
    │   │
    │   └── useMapState
    │       └── Map State Updates
    │
    └── ControlPanel
        ├── Opacity Controls
        ├── Layer Toggles
        └── Feature Count Display
```
