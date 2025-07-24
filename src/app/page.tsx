"use client";

import OpenLayersMap from "@/components/OpenLayersMap";

export default function Home() {
  return (
    <div className="w-full h-screen">
      <OpenLayersMap height="100vh" />
    </div>
  );
}
