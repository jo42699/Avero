"use client";

import { ArrowUpRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FinalCta() {
  return <section className="relative overflow-hidden border-t border-white/[0.08] py-28 sm:py-40"><div className="absolute left-1/2 top-1/2 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#6451c4]/10 blur-[120px]" /><div className="section-wrap relative text-center"><div className="mx-auto inline-flex items-center gap-2 rounded-full border border-[#a793ff]/20 bg-[#a793ff]/[0.07] px-3 py-1.5 text-xs text-[#bcb2ff]"><Sparkles size={14} /> The world is still wide open</div><h2 className="mx-auto mt-8 max-w-[850px] text-[clamp(2.9rem,7vw,6rem)] font-medium leading-[.91] tracking-[-.08em]">Go where the signal<br /><span className="text-[#a793ff]">feels right.</span></h2><p className="mx-auto mt-8 max-w-[480px] text-[18px] leading-7 text-[#858995]">Start with one passport. One destination. One less thing to wonder about.</p><Button size="lg" className="mt-10" onClick={() => document.querySelector("#visa-check")?.scrollIntoView({ behavior: "smooth" })}>Find your next move <ArrowUpRight size={18} /></Button></div></section>;
}
