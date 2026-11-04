"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Play, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const nextMoves = [
  { city: "Lisbon", country: "Portugal", flag: "🇵🇹", visa: "Visa-free", stay: "90 days →" },
  { city: "Tokyo", country: "Japan", flag: "🇯🇵", visa: "Visa-free", stay: "90 days →" },
  { city: "Nairobi", country: "Kenya", flag: "🇰🇪", visa: "eTA ready", stay: "90 days →" },
  { city: "Melbourne", country: "Australia", flag: "🇦🇺", visa: "Quick check", stay: "ETA →" },
  { city: "Reykjavik", country: "Iceland", flag: "🇮🇸", visa: "Visa-free", stay: "90 days →" },
];

export function HeroSection() {
  const [moveIndex, setMoveIndex] = useState(0);

  useEffect(() => {
    const rotation = window.setInterval(() => setMoveIndex((index) => (index + 1) % nextMoves.length), 3800);
    return () => window.clearInterval(rotation);
  }, []);

  const nextMove = nextMoves[moveIndex];

  return (
    <section id="top" className="relative flex min-h-[780px] items-center overflow-hidden pt-24">
      <div className="absolute inset-0 grid-fade opacity-60" />
      <div className="absolute left-1/2 top-1/3 h-[580px] w-[580px] -translate-x-1/2 rounded-full bg-[#4d3c9c]/10 blur-[120px]" />
      <div className="section-wrap relative z-10 grid items-center gap-16 pb-20 pt-16 lg:grid-cols-[.92fr_1.08fr] lg:gap-10 lg:pt-20">
        <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7 }}>
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#a793ff]/20 bg-[#a793ff]/[0.08] px-3 py-1.5 text-xs font-medium text-[#c7bcff]">
            <Sparkles size={13} /> The new way to go
          </div>
          <h1 className="display max-w-[720px] font-semibold text-white">Your passport.<br /><span className="text-[#a793ff]">Your possibilities.</span></h1>
          <p className="mt-8 max-w-[480px] text-[19px] leading-8 text-[#9599a6]">AVER0 uses AI agents to turn each country&apos;s visa requirements into clear, step-by-step guidance — so every border, booking, and new beginning feels a little simpler.</p>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Button size="lg" onClick={() => document.querySelector("#visa-check")?.scrollIntoView({ behavior: "smooth" })}>Check your passport <ArrowUpRight size={16} /></Button>
            <a href="#globe" className="group inline-flex h-14 items-center gap-2 rounded-full border border-white/10 px-5 text-base text-[#c8c7d0] transition hover:border-white/25 hover:bg-white/[0.05]"><span className="grid h-7 w-7 place-items-center rounded-full border border-white/15"><Play size={11} fill="currentColor" /></span> Explore the globe</a>
          </div>
          <div className="mt-14 flex items-center gap-3 text-[15px] leading-6 text-[#6f737e]"><div className="flex -space-x-2"><span className="grid h-7 w-7 place-items-center rounded-full border-2 border-[#090a0d] bg-[#cfb9a3] text-[10px]">JM</span><span className="grid h-7 w-7 place-items-center rounded-full border-2 border-[#090a0d] bg-[#7d9ca8] text-[10px]">AK</span><span className="grid h-7 w-7 place-items-center rounded-full border-2 border-[#090a0d] bg-[#c1a4c5] text-[10px]">RL</span></div><span><strong className="font-medium text-[#c3c4ca]">12,000+</strong> curious travellers already moving</span></div>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: .94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .9, delay: .15 }} className="relative min-h-[520px] lg:min-h-[600px]">
          <div className="absolute left-1/2 top-1/2 z-0 h-[430px] w-[430px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full bg-transparent sm:h-[530px] sm:w-[530px]"><video src="/media/globe_planes_color_trails-reversed.mp4" autoPlay loop muted playsInline preload="auto" poster="/images/hero-earth.png" aria-label="Animated globe with planes and colorful flight trails" className="h-full w-full scale-[1.18] object-contain mix-blend-screen" /></div>
          <div className="absolute right-0 top-5 hidden w-52 rounded-2xl border border-white/10 bg-[#171921]/80 p-4 shadow-2xl backdrop-blur-xl sm:block" aria-live="polite">
            <div className="flex items-center justify-between text-[10px] text-[#717580]"><span>YOUR NEXT MOVE</span><span className="h-1.5 w-1.5 rounded-full bg-[#85cfaa] shadow-[0_0_8px_#85cfaa]" /></div>
            <AnimatePresence mode="wait" initial={false}><motion.div key={nextMove.city} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: .35 }}><div className="mt-4 flex items-center gap-2"><span className="text-xl">{nextMove.flag}</span><span className="text-sm font-medium">{nextMove.city}, {nextMove.country}</span></div><div className="mt-3 flex items-center justify-between border-t border-white/8 pt-3 text-[10px] text-[#858892]"><span>{nextMove.visa}</span><span className="text-[#bcb4ff]">{nextMove.stay}</span></div></motion.div></AnimatePresence>
          </div>
          <div className="absolute bottom-1 left-0 z-10 w-48 rounded-2xl border border-white/10 bg-[#171921]/85 p-4 shadow-2xl backdrop-blur-xl sm:bottom-8 sm:left-5">
            <div className="flex items-center gap-2 text-[10px] text-[#777b85]"><span className="h-1.5 w-1.5 rounded-full bg-[#a793ff]" /> LIVE SIGNAL</div>
            <div className="mt-3 text-2xl font-medium tracking-[-.06em] text-white">184 <span className="text-xs font-normal tracking-normal text-[#80838e]">countries</span></div>
            <div className="mt-1 text-[10px] text-[#6f737e]">ready to welcome you today</div>
          </div>
          <div className="absolute bottom-0 right-[10%] z-10 flex items-center gap-2 text-[10px] uppercase tracking-[.16em] text-[#656974]"><span className="h-px w-9 bg-[#656974]" />Your world, mapped</div>
        </motion.div>
      </div>
      <a href="#globe" className="absolute bottom-7 left-1/2 z-10 hidden -translate-x-1/2 items-center gap-2 text-[10px] uppercase tracking-[.2em] text-[#646873] transition hover:text-white md:flex">Scroll to explore <ArrowDown size={13} /></a>
    </section>
  );
}
