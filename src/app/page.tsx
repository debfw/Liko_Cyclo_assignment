"use client";

import dynamic from "next/dynamic";

const OpenLayersMap = dynamic(() => import("@/components/OpenLayersMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-screen flex items-center justify-center">
      Loading map...
    </div>
  ),
});

export default function Home() {
  return (
    <div className="w-full h-screen">
      <OpenLayersMap height="100vh" />
    </div>
  );
}