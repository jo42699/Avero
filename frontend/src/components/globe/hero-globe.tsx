"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

const HeroGlobeCanvas = dynamic(() => import("@/components/globe/hero-globe-canvas"), {
  ssr: false,
  loading: () => <div className="h-full w-full animate-pulse rounded-full bg-[radial-gradient(circle_at_35%_25%,rgba(255,226,174,.13),transparent_35%),#0a1625]" />,
});

export function HeroGlobe() {
  const [selected, setSelected] = useState<string | null>(null);
  return <div className="relative h-full w-full"><HeroGlobeCanvas onSelect={setSelected} />{selected && <div className="absolute bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-white/15 bg-[#101722]/88 px-3 py-1.5 text-xs text-[#e4e0d8] shadow-[0_12px_30px_rgba(0,0,0,.25)] backdrop-blur-xl">{selected} · signal ready</div>}</div>;
}
