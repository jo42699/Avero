"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const links = [
  ["Globe", "#globe"],
  ["Visa check", "#visa-check"],
  ["Explore", "#explore"],
  ["Pricing", "#pricing"],
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="absolute inset-x-0 top-0 z-40">
      <div className="section-wrap flex h-20 items-center justify-between">
        <a href="#top" className="group flex items-center gap-2.5" aria-label="AVER0 home">
          <span className="grid h-8 w-8 place-items-center rounded-[10px] border border-white/15 bg-white/[0.06] shadow-[0_0_30px_rgba(167,147,255,.1)]">
            <span className="h-3.5 w-3.5 rotate-45 rounded-[3px] border border-[#d8d0ff] bg-[#a793ff] shadow-[0_0_14px_#a793ff]" />
          </span>
          <span className="text-[15px] font-semibold tracking-[-.03em] text-white">AVER0</span>
        </a>
        <nav className="hidden items-center gap-1 rounded-full border border-white/8 bg-black/15 p-1 md:flex">
          {links.map(([label, href]) => (
            <a key={label} href={href} className="rounded-full px-4 py-2 text-[15px] text-[#999ba6] transition hover:bg-white/[0.07] hover:text-white">
              {label}
            </a>
          ))}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <a href="#faq" className="text-[15px] text-[#999ba6] transition hover:text-white">Sign in</a>
          <Button size="sm" onClick={() => document.querySelector("#visa-check")?.scrollIntoView({ behavior: "smooth" })}>
            Get started <ArrowUpRight size={14} />
          </Button>
        </div>
        <button className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-white md:hidden" onClick={() => setOpen((value) => !value)} aria-label={open ? "Close menu" : "Open menu"}>
          {open ? <X size={17} /> : <Menu size={17} />}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="mx-4 rounded-2xl border border-white/10 bg-[#111318]/95 p-3 shadow-2xl backdrop-blur-xl md:hidden">
            {links.map(([label, href]) => (
              <a key={label} href={href} onClick={() => setOpen(false)} className="block rounded-xl px-4 py-3 text-base text-[#b9b7c1] hover:bg-white/5 hover:text-white">{label}</a>
            ))}
            <Button className="mt-2 w-full" onClick={() => { setOpen(false); document.querySelector("#visa-check")?.scrollIntoView({ behavior: "smooth" }); }}>Get started <ArrowUpRight size={14} /></Button>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
