# Netherlands Map Dashboard (OpenLayers + Mantine UI)

## Assignment Requirements: ✔️ All Met

This project fulfills all requirements:

- **React website**: Built with Next.js (React framework)
- **OpenLayers map component**: Uses OpenLayers for interactive mapping
- **Topographical surface**: Uses OpenStreetMap as the base map
- **At least one WFS layer with adjustable visibility**: Dutch municipalities (WFS) layer with toggle and transparency slider
- **Projection in RD (EPSG:28992)**: Map and WFS requests use the Dutch national projection
- **Mouse position coordinate visible**: Mouse position is shown in RD coordinates on the map

---

A modern dashboard web app built with Next.js, OpenLayers, and Mantine UI. Demonstrates interactive mapping with a WFS (Web Feature Service) layer for Dutch municipalities, with adjustable visibility and transparency.

## Features

- **Interactive Map**: OSM base map with Dutch projection (EPSG:28992)
- **WFS Layer Demo**: Shows Dutch municipality boundaries ("gemeenten") from a public WFS endpoint
- **Layer Controls**: Toggle WFS layer visibility and adjust its transparency with a slider
- **Mouse Position**: See the RD (EPSG:28992) coordinates as you move your mouse over the map
- **Modern UI**: Dashboard layout using Mantine UI (dark mode)
- **Responsive**: Works on desktop and mobile

## Technical Highlights

- **Next.js 15**: App directory, SSR/CSR hybrid
- **OpenLayers**: Map rendering, WFS vector layer, custom projection
- **Mantine UI**: Dashboard layout, controls, and theming
- **TypeScript**: Strict typing throughout

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd Liko_Assignment
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
src/
├── app/         # Next.js app directory (layout, entrypoint)
├── components/  # React components (OpenLayers map, controls)
├── theme/       # Mantine theme configuration
└── types/       # TypeScript types
```

## WFS Layer Details

- **Source:** [Nationaal Georegister Bestuurlijke Grenzen WFS](https://geodata.nationaalgeoregister.nl/bestuurlijkegrenzen/wfs)
- **FeatureType:** gemeenten (municipalities)
- **Projection:** EPSG:28992 (RD New)
- **Controls:**
  - Toggle visibility (Show Municipalities)
  - Adjust transparency (slider)

## Notes

- If the WFS layer does not appear, check your network connection and DNS settings (the WFS endpoint must be reachable).
- The map is limited to the Netherlands extent and uses the Dutch national projection.
- You can adapt the code to use other WFS endpoints or feature types for your own data.

---

_All code and UI built with OpenLayers, Mantine, and Next.js. For demo and educational use._
