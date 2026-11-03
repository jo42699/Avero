"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

const faqs = [
  ["Is AVER0 a visa agency?", "No. AVER0 is a travel intelligence layer that helps you understand the next step. We use local demo data in this preview — always confirm final requirements with the official authority before you travel."],
  ["Which passports do you support?", "We are building coverage country by country. The demo currently shows signals for UK, US, Canada, and Australian passports, with more arriving soon."],
  ["Can I use AVER0 for work trips?", "Yes. AVER0 is designed for the whole shape of your trip, from a long weekend to a new city for three months. Your plan can hold different types of travel."],
  ["How current are the signals?", "The product is built around freshness. When something changes, your trip board is designed to surface what needs your attention — without making you re-research the whole route."],
  ["Can I cancel whenever I want?", "Absolutely. Wayfinder is month-to-month or yearly, and you can change or cancel from your account settings at any time."],
];

export function FaqSection() {
  const [active, setActive] = useState(0);
  return <section id="faq" className="py-24 sm:py-32"><div className="section-wrap grid gap-10 md:grid-cols-[.7fr_1.3fr] md:gap-20"><div><p className="eyebrow">08 / useful answers</p><h2 className="section-title mt-5 max-w-[330px] font-medium">Questions are part of the <span className="text-[#a793ff]">journey.</span></h2><p className="mt-7 max-w-[310px] text-[18px] leading-7 text-[#858995]">Still curious? That&apos;s a good sign. Reach out and we&apos;ll help you think it through.</p><a href="mailto:hello@avero.world" className="mt-7 inline-block text-[16px] text-[#b8aeff] transition hover:text-white">hello@avero.world →</a></div><div className="border-t border-white/[0.1]">{faqs.map(([question, answer], index) => <div key={question} className="border-b border-white/[0.1]"><button onClick={() => setActive(active === index ? -1 : index)} className="flex w-full items-center justify-between gap-5 py-6 text-left text-[17px] text-[#d9d8df]"><span>{question}</span><ChevronDown size={18} className={`shrink-0 text-[#777b85] transition-transform ${active === index ? "rotate-180 text-white" : ""}`} /></button>{active === index && <div className="pb-6 pr-10 text-[16px] leading-7 text-[#858995]">{answer}</div>}</div>)}</div></div></section>;
}
