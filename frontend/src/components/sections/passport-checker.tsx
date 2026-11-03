"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, ChevronDown, CircleAlert, Loader2, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { demoVisaResults } from "@/data/demo-visa-data";
import { Button } from "@/components/ui/button";

const passports = ["United Kingdom", "United States", "Canada", "Australia"];
const destinations = ["Japan", "Portugal", "Kenya", "Australia"];

export function PassportChecker() {
  const [passport, setPassport] = useState(passports[0]);
  const [destination, setDestination] = useState(destinations[0]);
  const [result, setResult] = useState<keyof typeof demoVisaResults | null>(null);
  const [loading, setLoading] = useState(false);

  const check = () => {
    setLoading(true); setResult(null);
    window.setTimeout(() => { setLoading(false); setResult(destination); }, 650);
  };
  const visa = result ? demoVisaResults[result] : null;

  return (
    <section id="visa-check" className="relative py-24 sm:py-32">
      <div className="section-wrap grid items-start gap-12 lg:grid-cols-[.75fr_1.25fr] lg:gap-24">
        <div><p className="eyebrow">02 / the visa check</p><h2 className="section-title mt-5 max-w-[420px] font-medium">One less thing<br /><span className="text-[#a793ff]">to worry about.</span></h2><p className="mt-7 max-w-[380px] text-[18px] leading-7 text-[#858995]">Our AI agents read the country requirements and organize them into a clear, step-by-step visa plan for your trip.</p><div className="mt-10 flex items-center gap-3 text-[16px] text-[#727681]"><ShieldCheck size={18} className="text-[#89c6a2]" /> Always clear. Never legalese.</div></div>
        <div className="rounded-[26px] border border-white/10 bg-[#111318] p-6 shadow-[0_30px_100px_rgba(0,0,0,.18)] sm:p-9"><div className="flex items-center justify-between border-b border-white/[0.08] pb-5"><div><p className="text-base font-medium">Passport signal</p><p className="mt-1 text-[15px] text-[#777b85]">AI-agent guidance with local sample data</p></div><span className="rounded-full border border-[#89c6a2]/20 bg-[#89c6a2]/[0.08] px-2.5 py-1 text-xs text-[#9bd5b3]">BETA</span></div><div className="mt-8 grid gap-5 sm:grid-cols-2"><SelectField label="I hold a passport from" value={passport} options={passports} onChange={setPassport} /><SelectField label="I want to visit" value={destination} options={destinations} onChange={setDestination} /></div><Button className="mt-7 w-full" size="lg" onClick={check} disabled={loading}>{loading ? <><Loader2 size={18} className="animate-spin" /> Reading the signal...</> : <>Check my entry requirements <ArrowRight size={18} /></>}</Button><AnimatePresence mode="wait">{visa && <motion.div initial={{ opacity: 0, height: 0, y: 8 }} animate={{ opacity: 1, height: "auto", y: 0 }} className="mt-5 overflow-hidden"><div className={`rounded-2xl border p-5 ${visa.status === "ready" ? "border-[#89c6a2]/20 bg-[#89c6a2]/[0.07]" : "border-[#f1c574]/20 bg-[#f1c574]/[0.06]"}`}><div className="flex items-start justify-between gap-4"><div className="flex items-start gap-3">{visa.status === "ready" ? <span className="grid h-8 w-8 place-items-center rounded-full bg-[#89c6a2]/15 text-[#9bd5b3]"><Check size={16} /></span> : <span className="grid h-8 w-8 place-items-center rounded-full bg-[#f1c574]/15 text-[#f1c574]"><CircleAlert size={16} /></span>}<div><p className="text-base font-medium text-white">{visa.label}</p><p className="mt-2 max-w-[390px] text-[15px] leading-6 text-[#a0a39e]">{visa.note}</p></div></div><span className="whitespace-nowrap text-xs text-[#a6a8b0]">{visa.stay}</span></div><div className="mt-4 border-t border-white/8 pt-3 text-xs text-[#777b85]">Demo result for {passport} → {visa.destination}</div></div></motion.div>}</AnimatePresence></div>
      </div>
    </section>
  );
}

function SelectField({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (value: string) => void }) {
  return <label className="group relative block"><span className="mb-2 block text-[15px] uppercase tracking-[.1em] text-[#777b85]">{label}</span><span className="relative block"><select value={value} onChange={(event) => onChange(event.target.value)} className="h-13 w-full appearance-none rounded-xl border border-white/10 bg-[#181b22] px-4 pr-10 text-base text-[#e4e3e9] outline-none transition focus:border-[#a793ff]/50"><>{options.map((option) => <option key={option}>{option}</option>)}</></select><ChevronDown size={17} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#777b85]" /></span></label>;
}
