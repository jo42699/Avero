import { ArrowUpRight, Orbit, ScanSearch } from "lucide-react";
import { InteractiveGlobe } from "@/components/globe/interactive-globe";

export function GlobeSection() {
  return (
    <section id="globe" className="relative border-y border-white/[0.07] py-24 sm:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(87,69,175,.12),transparent_40%)]" />
      <div className="section-wrap relative">
        <div className="grid items-end gap-6 md:grid-cols-[1fr_auto]"><div><p className="eyebrow">01 / the world, in context</p><h2 className="section-title mt-5 max-w-[560px] font-medium">Everywhere is closer<br /><span className="text-[#a793ff]">when you can see it.</span></h2></div><p className="max-w-[340px] text-[18px] leading-7 text-[#858995] md:pb-1">A live view of the places you could be, the signals to watch, and the routes that make sense for you.</p></div>
        <div className="relative mt-10 overflow-hidden rounded-[28px] border border-white/[0.08] bg-[#0d1015]/70"><div className="absolute inset-0 opacity-30 grid-fade" /><InteractiveGlobe /><div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-white/10 bg-[#171921]/75 px-3 py-2 text-xs text-[#a4a5b0] backdrop-blur-xl"><span className="h-1.5 w-1.5 rounded-full bg-[#8fd0a9] shadow-[0_0_8px_#8fd0a9]" /> 184 countries available</div></div>
        <div className="mt-6 grid gap-3 sm:grid-cols-3"><div className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-6"><Orbit size={18} className="text-[#a793ff]" /><p className="mt-5 text-[18px] font-medium">Feel the distance</p><p className="mt-2 text-[16px] leading-6 text-[#7f838e]">Rotate the planet and get a sense of what is actually out there.</p></div><div className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-6"><ScanSearch size={18} className="text-[#f0c783]" /><p className="mt-5 text-[18px] font-medium">Read the signals</p><p className="mt-2 text-[16px] leading-6 text-[#7f838e]">Click into a country for a quick, human-readable visa snapshot.</p></div><a href="#explore" className="group flex items-end justify-between rounded-2xl border border-[#a793ff]/20 bg-[#a793ff]/[0.07] p-6 transition hover:bg-[#a793ff]/[0.12]"><div><p className="text-[18px] font-medium">Find your next place</p><p className="mt-2 text-[16px] leading-6 text-[#a7a1c6]">Browse destinations curated for you</p></div><ArrowUpRight size={18} className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></a></div>
      </div>
    </section>
  );
}
