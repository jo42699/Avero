"use client";

import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, ChevronDown, Compass, FileCheck2, Globe2, Loader2, MapPin, RotateCcw, Search, ShieldCheck, Sparkles } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { Button } from "@/components/ui/button";
import { demoCategories, demoDestinations, demoRegions, type DemoDestination } from "@/data/travel-demo";

const AnimatedTravelGlobe = dynamic(() => import("@/components/globe/animated-travel-globe"), {
  ssr: false,
  loading: () => <div className="grid h-full min-h-[470px] place-items-center rounded-[28px] bg-[radial-gradient(circle_at_50%_40%,rgba(167,147,255,.12),transparent_48%),#0b1018]"><div className="flex items-center gap-3 text-[15px] text-[#858995]"><Loader2 size={18} className="animate-spin text-[#a793ff]" /> Preparing the globe...</div></div>,
});

type Profile = { passport: string; residence: string; visa: string; permit: string; purpose: string };

const initialProfile: Profile = {
  passport: "Afghanistan",
  residence: "United Kingdom",
  visa: "Valid US visitor visa",
  permit: "UK residence permit",
  purpose: "Tourism",
};

const profileOptions = {
  passport: ["Afghanistan", "United Kingdom", "United States", "Canada"],
  residence: ["United Kingdom", "United States", "Canada", "United Arab Emirates"],
  visa: ["Valid US visitor visa", "No existing visa", "Valid Schengen visa", "Valid Australian visa"],
  permit: ["UK residence permit", "No residence permit", "EU residence card", "US residence status"],
  purpose: ["Tourism", "Business", "Study", "Family visit"],
};

const profileFlags: Record<string, string> = { Afghanistan: "🇦🇫", "United Kingdom": "🇬🇧", "United States": "🇺🇸", Canada: "🇨🇦", "United Arab Emirates": "🇦🇪" };

export function ProductPreview() {
  const [profile, setProfile] = useState(initialProfile);
  const [isDiscovering, setIsDiscovering] = useState(false);
  const [isDiscovered, setIsDiscovered] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedDestination, setSelectedDestination] = useState<DemoDestination | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [category, setCategory] = useState<(typeof demoCategories)[number]>("All destinations");
  const [region, setRegion] = useState<(typeof demoRegions)[number]>("All regions");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("Recommended");
  const [checks, setChecks] = useState([false, false, false, false, false, false]);
  const timerRef = useRef<number | null>(null);

  useEffect(() => () => { if (timerRef.current) window.clearTimeout(timerRef.current); }, []);

  const visibleDestinations = useMemo(() => {
    const filtered = demoDestinations.filter((destination) => {
      const matchesCategory = category === "All destinations" || destination.category === category;
      const matchesRegion = region === "All regions" || destination.region === region;
      const matchesSearch = `${destination.name} ${destination.region}`.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesRegion && matchesSearch;
    });
    return [...filtered].sort((a, b) => sort === "A–Z" ? a.name.localeCompare(b.name) : sort === "Category" ? a.category.localeCompare(b.category) : 0);
  }, [category, query, region, sort]);

  const selected = selectedDestination;
  const hovered = demoDestinations.find((destination) => destination.id === hoveredId) ?? null;
  const completedChecks = checks.filter(Boolean).length;

  const discover = () => {
    if (timerRef.current) window.clearTimeout(timerRef.current);
    setSelectedId(null);
    setSelectedDestination(null);
    setIsDiscovering(true);
    timerRef.current = window.setTimeout(() => {
      setIsDiscovering(false);
      setIsDiscovered(true);
    }, 950);
  };

  const selectDestination = (destination: DemoDestination) => {
    setIsDiscovered(true);
    setSelectedId(destination.id);
    setSelectedDestination(destination);
    window.setTimeout(() => document.querySelector("#destination-details")?.scrollIntoView({ behavior: "smooth", block: "center" }), 150);
  };

  const updateProfile = (key: keyof Profile, value: string) => setProfile((current) => ({ ...current, [key]: value }));

  return <section id="experience" className="border-y border-white/[0.07] bg-[#0c0e12] py-24 sm:py-32">
    <div className="section-wrap">
      <div className="grid items-end gap-8 md:grid-cols-[1fr_auto]">
        <div><p className="eyebrow">THE AVER0 EXPERIENCE</p><h2 className="section-title mt-5 max-w-[760px] font-medium">Your passport opens the door.<br /><span className="text-[#a793ff]">Discover where it can take you.</span></h2><p className="mt-7 max-w-[620px] text-[18px] leading-7 text-[#858995]">Explore destinations based on your passport, residence and existing visas. Understand what you need and how to get there.</p></div>
        <div className="flex items-center gap-2 pb-1 text-xs uppercase tracking-[.18em] text-[#777b85]"><span className="h-2 w-2 animate-pulse rounded-full bg-[#8ecaa5] shadow-[0_0_12px_#8ecaa5]" /> TRY THE INTERACTIVE DEMO</div>
      </div>

      <div className="mt-14 overflow-hidden rounded-[28px] border border-white/10 bg-[#11151c] shadow-[0_35px_120px_rgba(0,0,0,.28)]">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] px-6 py-5 sm:px-8"><div className="flex items-center gap-3"><span className="grid h-8 w-8 place-items-center rounded-lg bg-[#a793ff] text-sm font-semibold text-[#11101a]">A</span><div><p className="text-base font-medium">Find your way</p><p className="text-sm text-[#777b85]">A connected travel possibility demo</p></div></div><div className="flex items-center gap-2 text-sm text-[#777b85]"><span className={`h-2 w-2 rounded-full ${isDiscovered ? "bg-[#8ecaa5]" : "bg-[#a793ff]"}`} /> {isDiscovered ? "Discovery ready" : "Profile first"}</div></div>
        <div className="grid lg:grid-cols-[340px_1fr]">
          <PassportProfileForm profile={profile} isDiscovering={isDiscovering} onChange={updateProfile} onDiscover={discover} />
          <div className="relative min-h-[510px] overflow-hidden border-t border-white/[0.08] bg-[#0a1018] lg:border-l lg:border-t-0">
            <div className="absolute inset-0 grid-fade opacity-30" />
            <AnimatePresence mode="wait">
              {isDiscovering ? <DiscoveryAnimation key="discovering" /> : isDiscovered ? <motion.div key="globe" initial={{ opacity: 0, scale: .92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .75, ease: "easeOut" }} className="absolute inset-0"><div className="absolute inset-[10%] rounded-full border border-dashed border-[#a793ff]/25" /><motion.div animate={{ rotate: 360 }} transition={{ duration: 18, repeat: Infinity, ease: "linear" }} className="absolute inset-[10%] rounded-full border-t border-[#b8adff]/75" /><AnimatedTravelGlobe destinations={demoDestinations} selectedId={selectedId} selectedDestination={selectedDestination} onSelect={selectDestination} onHover={(destination) => setHoveredId(destination?.id ?? null)} /><div className="absolute left-5 top-5 z-10 rounded-full border border-white/10 bg-[#121923]/80 px-3 py-2 text-xs text-[#a8adb8] backdrop-blur-xl">{hovered ? `${hovered.flag} ${hovered.name}` : "Drag to explore your possibility map"}</div><GlobeLegend onReset={() => { setSelectedId(null); setSelectedDestination(null); setHoveredId(null); }} /></motion.div> : <EmptyDiscoveryState key="empty" onDiscover={discover} />}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {isDiscovered && <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .15 }}><DestinationResults visible={visibleDestinations} category={category} region={region} query={query} sort={sort} onCategory={setCategory} onRegion={setRegion} onQuery={setQuery} onSort={setSort} onSelect={selectDestination} selectedId={selectedId} /></motion.div>}
      {isDiscovered && <AgentTravelBrief profile={profile} destinations={visibleDestinations} selected={selected} />}
      {selected && <DestinationDetails destination={selected} completedChecks={completedChecks} checks={checks} onToggle={(index) => setChecks((current) => current.map((value, item) => item === index ? !value : value))} onClose={() => { setSelectedId(null); setSelectedDestination(null); }} />}
    </div>
  </section>;
}

function PassportProfileForm({ profile, isDiscovering, onChange, onDiscover }: { profile: Profile; isDiscovering: boolean; onChange: (key: keyof Profile, value: string) => void; onDiscover: () => void }) {
  return <div className="p-6 sm:p-8"><div className="flex items-start gap-3"><div className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-[#a793ff]"><ShieldCheck size={19} /></div><div><p className="text-[21px] font-medium">First, tell us about your passport.</p><p className="mt-2 text-[16px] leading-6 text-[#858995]">Your travel possibilities depend on more than just your nationality.</p></div></div><div className="mt-8 space-y-5"><DemoSelect label="Passport nationality" value={profile.passport} options={profileOptions.passport} flag={profileFlags[profile.passport]} onChange={(value) => onChange("passport", value)} /><DemoSelect label="Country of residence" value={profile.residence} options={profileOptions.residence} flag={profileFlags[profile.residence]} onChange={(value) => onChange("residence", value)} /><DemoSelect label="Existing visa" value={profile.visa} options={profileOptions.visa} onChange={(value) => onChange("visa", value)} /><DemoSelect label="Residence status" value={profile.permit} options={profileOptions.permit} onChange={(value) => onChange("permit", value)} /><DemoSelect label="Travel purpose" value={profile.purpose} options={profileOptions.purpose} onChange={(value) => onChange("purpose", value)} /></div><Button size="lg" className="mt-8 w-full" onClick={onDiscover} disabled={isDiscovering}>{isDiscovering ? <><Loader2 size={18} className="animate-spin" /> Mapping your world...</> : <>Discover my world <ArrowRight size={18} /></>}</Button><p className="mt-4 text-center text-xs leading-5 text-[#6f747f]">Illustrative demo data — actual visa eligibility checks are not available yet.</p></div>;
}

function DemoSelect({ label, value, options, flag, onChange }: { label: string; value: string; options: string[]; flag?: string; onChange: (value: string) => void }) {
  return <label className="block"><span className="mb-2 block text-sm font-medium text-[#a9acb5]">{label}</span><span className="relative block"><select value={value} onChange={(event) => onChange(event.target.value)} className="h-13 w-full appearance-none rounded-xl border border-white/10 bg-[#181d25] px-4 pr-12 text-base text-[#f0eff3] outline-none transition focus:border-[#a793ff]/60"><>{options.map((option) => <option key={option}>{option}</option>)}</></select>{flag ? <span className="pointer-events-none absolute right-10 top-1/2 -translate-y-1/2 text-lg">{flag}</span> : null}<ChevronDown size={17} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#777b85]" /></span></label>;
}

function DiscoveryAnimation() {
  return <motion.div key="processing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 grid place-items-center p-8 text-center"><div className="relative"><motion.div animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }} className="mx-auto grid h-24 w-24 place-items-center rounded-full border border-dashed border-[#a793ff]/60"><Globe2 size={28} className="text-[#bcb3ff]" /></motion.div><div className="absolute inset-[-18px] animate-ping rounded-full border border-[#a793ff]/10" /><p className="mt-7 text-2xl font-medium tracking-[-.04em]">Mapping your travel possibilities...</p><p className="mt-3 text-[16px] leading-6 text-[#858995]">Reading your passport, residence and existing visa signals.</p></div></motion.div>;
}

function EmptyDiscoveryState({ onDiscover }: { onDiscover: () => void }) {
  return <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 grid place-items-center p-8 text-center"><div><div className="mx-auto grid h-20 w-20 place-items-center rounded-full border border-[#a793ff]/20 bg-[#a793ff]/[0.06] shadow-[0_0_70px_rgba(167,147,255,.12)]"><Compass size={28} className="text-[#a793ff]" /></div><p className="mt-7 text-2xl font-medium tracking-[-.04em]">Your world is waiting.</p><p className="mx-auto mt-3 max-w-[350px] text-[16px] leading-6 text-[#858995]">Complete the profile to reveal a sample map of destinations and next steps.</p><Button variant="secondary" className="mt-6" onClick={onDiscover}>Run the demo <ArrowRight size={17} /></Button></div></motion.div>;
}

function GlobeLegend({ onReset }: { onReset: () => void }) {
  return <div className="absolute bottom-4 left-4 right-4 z-10 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-[#111821]/85 px-4 py-3 backdrop-blur-xl"><div className="flex flex-wrap gap-x-3 gap-y-2 text-xs text-[#969ba7]"><LegendDot color="#78ba8d" label="Visa-free" /><LegendDot color="#79a8df" label="eVisa" /><LegendDot color="#d7aa63" label="On arrival" /><LegendDot color="#858b95" label="Required" /></div><button onClick={onReset} className="flex items-center gap-1.5 text-xs text-[#b8b0ff] transition hover:text-white"><RotateCcw size={13} /> Reset view</button></div>;
}

function LegendDot({ color, label }: { color: string; label: string }) { return <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full" style={{ backgroundColor: color }} />{label}</span>; }

function DestinationResults({ visible, category, region, query, sort, onCategory, onRegion, onQuery, onSort, onSelect, selectedId }: { visible: DemoDestination[]; category: (typeof demoCategories)[number]; region: (typeof demoRegions)[number]; query: string; sort: string; onCategory: (value: (typeof demoCategories)[number]) => void; onRegion: (value: (typeof demoRegions)[number]) => void; onQuery: (value: string) => void; onSort: (value: string) => void; onSelect: (destination: DemoDestination) => void; selectedId: string | null }) {
  return <div className="mt-16"><div className="flex flex-col justify-between gap-7 md:flex-row md:items-end"><div><p className="eyebrow">DISCOVERED DESTINATIONS</p><h3 className="section-title mt-4 font-medium">Your world of possibilities.</h3><p className="mt-4 text-[18px] text-[#858995]">Explore destinations based on your travel profile.</p></div><p className="text-[16px] text-[#777b85]">18 destinations to explore <span className="text-xs text-[#626873]">· sample data</span></p></div><div className="mt-8 flex flex-col gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.025] p-4 lg:flex-row lg:items-center"><div className="flex items-center gap-2 rounded-xl border border-white/10 bg-[#151a22] px-3.5 py-3 lg:w-56"><Search size={16} className="text-[#777b85]" /><input value={query} onChange={(event) => onQuery(event.target.value)} placeholder="Search destinations" className="w-full bg-transparent text-sm text-white outline-none placeholder:text-[#6c707b]" /></div><div className="flex gap-2 overflow-x-auto">{demoCategories.map((item) => <button key={item} onClick={() => onCategory(item)} className={`whitespace-nowrap rounded-xl border px-3 py-2.5 text-sm transition ${category === item ? "border-[#a793ff]/40 bg-[#a793ff]/10 text-[#d0c9ff]" : "border-white/10 text-[#7e838e] hover:border-white/20 hover:text-white"}`}>{item}</button>)}</div><div className="flex gap-2 lg:ml-auto"><select value={region} onChange={(event) => onRegion(event.target.value as (typeof demoRegions)[number])} className="rounded-xl border border-white/10 bg-[#151a22] px-3 py-2.5 text-sm text-[#b6b8c0] outline-none"><>{demoRegions.map((item) => <option key={item}>{item}</option>)}</></select><select value={sort} onChange={(event) => onSort(event.target.value)} className="rounded-xl border border-white/10 bg-[#151a22] px-3 py-2.5 text-sm text-[#b6b8c0] outline-none"><option>Recommended</option><option>A–Z</option><option>Category</option></select></div></div><div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{visible.map((destination, index) => <DestinationCard key={destination.id} destination={destination} index={index} selected={selectedId === destination.id} onSelect={onSelect} />)}{visible.length === 0 && <div className="col-span-full rounded-2xl border border-dashed border-white/10 py-14 text-center text-base text-[#777b85]">No destinations match these demo filters.</div>}</div></div>;
}

function AgentTravelBrief({ profile, destinations, selected }: { profile: Profile; destinations: DemoDestination[]; selected: DemoDestination | null }) {
  const [messageIndex, setMessageIndex] = useState(0);
  const recommendations = destinations.slice(0, 3);
  const messages = [
    `I’ve read your ${profile.passport} passport profile and your ${profile.residence} residence signal.`,
    `For this illustrative demo, I found ${destinations.length || 18} destinations to explore across your sample eligibility signals.`,
    selected ? `${selected.name} is open. I can now walk you through the example entry category and preparation steps.` : "Start with a destination card and I’ll turn the result into a step-by-step travel plan.",
  ];

  useEffect(() => {
    const timer = window.setInterval(() => setMessageIndex((current) => (current + 1) % messages.length), 4200);
    return () => window.clearInterval(timer);
  }, [messages.length]);

  return <motion.section initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="mt-10 overflow-hidden rounded-[26px] border border-[#a793ff]/20 bg-[linear-gradient(135deg,rgba(167,147,255,.09),rgba(17,22,30,.96)_42%)] shadow-[0_25px_90px_rgba(0,0,0,.18)]"><div className="grid lg:grid-cols-[.86fr_1.14fr]"><div className="border-b border-white/[0.08] p-6 sm:p-8 lg:border-b-0 lg:border-r"><div className="flex items-center justify-between gap-4"><div className="flex items-center gap-3"><div className="grid h-11 w-11 place-items-center rounded-2xl bg-[#a793ff] text-lg font-semibold text-[#11101a] shadow-[0_0_28px_rgba(167,147,255,.22)]">A</div><div><p className="text-[18px] font-medium">Aver0 agent</p><p className="mt-0.5 text-sm text-[#8f93a0]">Travel possibility guide</p></div></div><span className="flex items-center gap-2 rounded-full border border-[#8ecaa5]/20 bg-[#8ecaa5]/[0.08] px-3 py-1.5 text-xs text-[#a6d6b6]"><span className="h-1.5 w-1.5 rounded-full bg-[#8ecaa5]" /> Demo online</span></div><div className="mt-8 rounded-2xl border border-white/[0.08] bg-[#0d1219]/80 p-5"><div className="flex items-center gap-2 text-xs uppercase tracking-[.16em] text-[#a793ff]"><Sparkles size={14} /> Profile signal</div><p className="mt-4 text-[16px] leading-7 text-[#d9d9df]">{profile.passport} passport · {profile.residence} residence · {profile.purpose.toLowerCase()}</p><p className="mt-2 text-sm leading-6 text-[#858995]">{profile.visa} · {profile.permit}</p></div><p className="mt-5 text-xs leading-5 text-[#707581]">Illustrative AI demo only. AVER0 does not currently verify eligibility or provide legal immigration advice.</p></div><div className="p-6 sm:p-8"><div className="flex items-center justify-between gap-4"><div><p className="eyebrow">YOUR AI TRAVEL BRIEF</p><h3 className="mt-3 text-3xl font-medium tracking-[-.05em] sm:text-4xl">Here’s where your profile could take you.</h3></div><Compass className="hidden text-[#a793ff] sm:block" size={28} /></div><div className="mt-7 flex items-start gap-3 rounded-2xl border border-white/[0.08] bg-[#0d1219]/75 p-5"><div className="mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#a793ff]/15 text-xs font-semibold text-[#c9c2ff]">A</div><AnimatePresence mode="wait"><motion.p key={messageIndex} initial={{ opacity: 0, y: 7 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -7 }} transition={{ duration: .25 }} className="min-h-[48px] text-[17px] leading-7 text-[#d7d7de]">{messages[messageIndex]}</motion.p></AnimatePresence></div><div className="mt-5 flex flex-wrap gap-2">{recommendations.map((destination) => <span key={destination.id} className="rounded-full border border-white/10 bg-white/[0.035] px-3 py-2 text-sm text-[#bfc1ca]">{destination.flag} {destination.name} <span className="ml-1 text-[#858995]">· {destination.category}</span></span>)}</div><div className="mt-7 grid gap-3 sm:grid-cols-3"><AgentStep number="01" title="Read" detail="Passport + residence" /><AgentStep number="02" title="Compare" detail="Sample destinations" /><AgentStep number="03" title="Prepare" detail="Step-by-step guidance" /></div></div></div></motion.section>;
}

function AgentStep({ number, title, detail }: { number: string; title: string; detail: string }) {
  return <div className="rounded-xl border border-white/[0.08] bg-white/[0.025] p-4"><p className="text-xs tracking-[.16em] text-[#a793ff]">{number}</p><p className="mt-3 text-[16px] font-medium text-[#e1e1e6]">{title}</p><p className="mt-1 text-sm leading-5 text-[#858995]">{detail}</p></div>;
}

function DestinationCard({ destination, index, selected, onSelect }: { destination: DemoDestination; index: number; selected: boolean; onSelect: (destination: DemoDestination) => void }) {
  return <motion.button layout initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * .04 }} onClick={() => onSelect(destination)} className={`group overflow-hidden rounded-2xl border text-left transition hover:-translate-y-1 ${selected ? "border-[#a793ff]/60 shadow-[0_0_30px_rgba(167,147,255,.12)]" : "border-white/10 hover:border-white/25"}`}><div aria-label={`${destination.name} destination photograph`} role="img" className="h-40 bg-cover bg-center" style={destinationImageStyle(destination)} /><div className="bg-[#141920] p-5"><div className="flex items-start justify-between gap-3"><div><p className="text-sm text-[#777b85]">{destination.region} · {destination.capital}</p><h4 className="mt-1 text-2xl font-medium tracking-[-.04em]">{destination.flag} {destination.name}</h4></div><span className="rounded-full border border-white/10 px-2.5 py-1 text-xs text-[#aeb1b8]">{destination.category}</span></div><p className="mt-3 text-[16px] leading-6 text-[#858995]">{destination.description}</p><span className="mt-5 inline-flex items-center gap-1.5 text-sm text-[#b9b0ff]">Explore destination <ArrowRight size={15} /></span></div></motion.button>;
}

function destinationImageStyle(destination: DemoDestination): CSSProperties {
  const imageUrl = destination.imageUrl ?? "/images/destination-contact-sheet.png";
  return {
    backgroundImage: `linear-gradient(180deg, rgba(4,8,13,.04), rgba(4,8,13,.75)), url('${imageUrl}')`,
    backgroundSize: destination.imageUrl ? "cover" : "cover, 400% 100%",
    backgroundPosition: destination.imageUrl ? "center" : `center, ${destination.imagePosition} center`,
  };
}

function DestinationDetails({ destination, completedChecks, checks, onToggle, onClose }: { destination: DemoDestination; completedChecks: number; checks: boolean[]; onToggle: (index: number) => void; onClose: () => void }) {
  const [openStep, setOpenStep] = useState(0);
  return <motion.div id="destination-details" initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} className="mt-16 scroll-mt-20 rounded-[28px] border border-white/10 bg-[#11161e] p-5 shadow-[0_30px_100px_rgba(0,0,0,.2)] sm:p-8"><div className="flex flex-col justify-between gap-5 border-b border-white/[0.08] pb-7 md:flex-row md:items-start"><div><button onClick={onClose} className="mb-5 flex items-center gap-2 text-sm text-[#969ba7] transition hover:text-white"><ArrowLeft size={15} /> Back to possibilities</button><p className="eyebrow">DESTINATION DETAIL · ILLUSTRATIVE DEMO</p><h3 className="mt-4 text-4xl font-medium tracking-[-.06em] sm:text-5xl">{destination.flag} {destination.name}</h3><p className="mt-3 max-w-[600px] text-[18px] leading-7 text-[#858995]">A clear example of how AVER0 would turn one destination into a confident next step.</p></div><div className="rounded-2xl border border-[#f0c776]/20 bg-[#f0c776]/[0.06] p-4 text-sm leading-5 text-[#e7c77f]"><span className="font-medium">Illustrative demo data</span><br /><span className="text-[#b9a98a]">Actual visa eligibility checks are not available yet.</span></div></div><div className="mt-8 grid gap-8 lg:grid-cols-[.86fr_1.14fr]"><div><div aria-label={`${destination.name} destination photograph`} role="img" className="h-60 rounded-2xl bg-cover bg-center" style={destinationImageStyle(destination)} />{destination.imageSource && <a href={destination.imageSource} target="_blank" rel="noreferrer" className="mt-2 inline-flex text-xs text-[#777b85] underline decoration-white/20 underline-offset-2 transition hover:text-[#c9c2ff]">View destination photo source</a>}<div className="mt-4 grid grid-cols-2 gap-3"><InfoTile label="Capital" value={destination.capital} /><InfoTile label="Region" value={destination.region} /><InfoTile label="Travel purpose" value="Tourism" /><InfoTile label="Profile used" value="Afghanistan + UK" /></div></div><div><div className="flex items-center justify-between"><div><p className="eyebrow">YOUR ENTRY REQUIREMENTS</p><h4 className="mt-3 text-2xl font-medium">{destination.category}</h4></div><FileCheck2 size={22} className="text-[#a793ff]" /></div><div className="mt-5 space-y-3">{destination.requirements.map((requirement) => <div key={requirement} className="flex items-start gap-3 rounded-xl border border-white/[0.08] bg-white/[0.025] p-4 text-[16px] leading-6 text-[#b5b7bf]"><Check size={17} className="mt-0.5 shrink-0 text-[#8ecaa5]" />{requirement}</div>)}</div><p className="mt-4 text-sm leading-6 text-[#737984]">These are illustrative placeholders for the product demonstration, not verified requirements or legal advice.</p><button disabled className="mt-5 flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-full border border-white/10 px-5 py-3.5 text-[15px] text-[#6e737e]">View official immigration information <ArrowRight size={15} /></button><p className="mt-2 text-center text-xs text-[#5f646f]">Official source link unavailable in this demo.</p></div></div><div className="mt-10 grid gap-8 border-t border-white/[0.08] pt-8 lg:grid-cols-[1.1fr_.9fr]"><div><p className="eyebrow">HOW TO GET THERE</p><h4 className="mt-3 text-3xl font-medium tracking-[-.05em]">Your journey, step by step.</h4><div className="mt-6">{destination.steps.map((step, index) => <div key={step.title} className="border-b border-white/[0.08]"><button onClick={() => setOpenStep(openStep === index ? -1 : index)} className="flex w-full items-start gap-4 py-5 text-left"><span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-sm text-[#aaa3dc]">{index + 1}</span><span className="flex-1"><span className="block text-[18px] font-medium text-[#e7e6eb]">{step.title}</span><span className="mt-1 block text-[16px] leading-6 text-[#858995]">{step.description}</span>{openStep === index && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-3 block text-[15px] leading-6 text-[#a7aab4]">{step.detail}</motion.span>}</span><ChevronDown size={18} className={`mt-1 shrink-0 text-[#777b85] transition-transform ${openStep === index ? "rotate-180 text-white" : ""}`} /></button></div>)}</div></div><TravelChecklist checks={checks} completedChecks={completedChecks} onToggle={onToggle} /></div></motion.div>;
}

function InfoTile({ label, value }: { label: string; value: string }) { return <div className="rounded-xl border border-white/[0.08] bg-white/[0.025] p-4"><p className="text-xs uppercase tracking-[.14em] text-[#6f747f]">{label}</p><p className="mt-2 text-[16px] text-[#d8d8de]">{value}</p></div>; }

function TravelChecklist({ checks, completedChecks, onToggle }: { checks: boolean[]; completedChecks: number; onToggle: (index: number) => void }) {
  const items = ["Review passport validity", "Confirm entry requirements", "Prepare supporting documents", "Review application instructions", "Confirm travel arrangements", "Check requirements before departure"];
  return <div className="rounded-2xl border border-white/[0.08] bg-[#0d1219] p-5 sm:p-6"><div className="flex items-start justify-between gap-3"><div><p className="eyebrow">GET READY</p><h4 className="mt-3 text-2xl font-medium">Get ready for your journey.</h4></div><MapPin size={20} className="text-[#a793ff]" /></div><div className="mt-5 h-2 overflow-hidden rounded-full bg-white/[0.08]"><motion.div animate={{ width: `${(completedChecks / items.length) * 100}%` }} className="h-full rounded-full bg-[#8ecaa5]" /></div><p className="mt-2 text-sm text-[#777b85]">{completedChecks} of {items.length} tasks completed</p><div className="mt-5 space-y-3">{items.map((item, index) => <button key={item} onClick={() => onToggle(index)} className="flex w-full items-center gap-3 text-left"><span className={`grid h-5 w-5 shrink-0 place-items-center rounded-md border transition ${checks[index] ? "border-[#8ecaa5] bg-[#8ecaa5] text-[#0d1219]" : "border-white/20 bg-white/[0.03]"}`}>{checks[index] && <Check size={13} />}</span><span className={`text-[15px] leading-5 ${checks[index] ? "text-[#84988d] line-through" : "text-[#b6b8c1]"}`}>{item}</span></button>)}</div>{completedChecks === items.length && <motion.p initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="mt-5 flex items-center gap-2 rounded-xl border border-[#8ecaa5]/20 bg-[#8ecaa5]/[0.08] p-3 text-sm text-[#a6d6b6]"><Sparkles size={15} /> You are ready to move.</motion.p>}</div>;
}
