"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { Globe2 } from "lucide-react";

const GlobeCanvas = dynamic(() => import("@/components/globe/globe-canvas"), {
  ssr: false,
  loading: () => <div className="grid h-full min-h-[480px] place-items-center"><div className="flex flex-col items-center gap-3 text-[15px] text-[#747985]"><span className="grid h-12 w-12 place-items-center rounded-full border border-[#a793ff]/20 bg-[#a793ff]/5"><Globe2 size={20} className="text-[#a793ff]" /></span>Loading the world...</div></div>,
});

export function InteractiveGlobe({ compact = false }: { compact?: boolean }) {
  const [selected, setSelected] = useState<{ name: string; status: string; detail: string } | null>(null);
  return (
    <div className={`relative ${compact ? "h-full w-full" : "h-[520px] w-full sm:h-[600px]"}`}>
      <GlobeCanvas onSelect={setSelected} />
      {!compact && <div className="pointer-events-none absolute bottom-3 left-3 text-[13px] text-[#747985] sm:bottom-6 sm:left-6">Drag to rotate · Scroll to zoom · Tap a country</div>}
      {selected && <div className="glass absolute right-3 top-3 w-[230px] rounded-2xl p-5 sm:right-6 sm:top-8"><div className="flex items-center justify-between"><span className="text-xs uppercase tracking-[.16em] text-[#8b8e99]">Selected</span><button onClick={() => setSelected(null)} className="text-base text-[#777b86] hover:text-white" aria-label="Close country info">×</button></div><div className="mt-3 text-xl font-medium text-white">{selected.name}</div><div className="mt-2 text-[16px] leading-6 text-[#8d919d]">{selected.detail}</div><div className="mt-4 flex items-center gap-2 text-[13px] text-[#b9b1ff]"><span className="h-1.5 w-1.5 rounded-full bg-[#a793ff]" />{selected.status}</div></div>}
    </div>
  );
}
