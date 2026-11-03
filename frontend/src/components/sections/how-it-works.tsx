import { ArrowRight, CircleCheck, Compass, Search } from "lucide-react";

const steps = [
  { number: "01", icon: Search, title: "Tell us the basics", text: "Your passport, your pace, and the kind of trip you have in mind." },
  { number: "02", icon: Compass, title: "See the signal", text: "AVER0 makes the moving pieces legible — before they become blockers." },
  { number: "03", icon: CircleCheck, title: "Go with confidence", text: "Take the next step with a plan that is clear, current, and yours." },
];

export function HowItWorks() {
  return <section className="py-24 sm:py-32"><div className="section-wrap"><div className="grid gap-10 md:grid-cols-[.65fr_1.35fr] md:gap-20"><div><p className="eyebrow">06 / less friction</p><h2 className="section-title mt-5 max-w-[350px] font-medium">The journey starts <span className="text-[#a793ff]">before</span> the airport.</h2></div><div className="grid gap-0">{steps.map(({ number, icon: Icon, title, text }) => <div key={number} className="group relative flex gap-5 border-t border-white/[0.1] py-8"><span className="font-mono text-xs text-[#676b76]">{number}</span><div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.035] text-[#a793ff]"><Icon size={17} /></div><div className="flex-1"><h3 className="text-[21px] font-medium">{title}</h3><p className="mt-2 max-w-[430px] text-[16px] leading-6 text-[#7f838e]">{text}</p></div><ArrowRight size={18} className="mt-1 text-[#555963] transition group-hover:translate-x-1 group-hover:text-white" /></div>)}</div></div></div></section>;
}
