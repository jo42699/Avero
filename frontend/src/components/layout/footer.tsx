import { ArrowUpRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-white/[0.08] py-10">
      <div className="section-wrap flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="grid h-7 w-7 place-items-center rounded-lg border border-white/15 bg-white/[0.06]"><span className="h-3 w-3 rotate-45 rounded-[2px] bg-[#a793ff]" /></span>
            <span className="text-sm font-semibold tracking-[-.03em]">AVER0</span>
          </div>
          <p className="mt-3 text-[15px] leading-6 text-[#777b86]">Move through the world with more certainty.</p>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-3 text-[15px] text-[#777b86]">
          <a href="#globe" className="transition hover:text-white">The globe</a>
          <a href="#visa-check" className="transition hover:text-white">Visa check</a>
          <a href="#pricing" className="transition hover:text-white">Pricing</a>
          <a href="#faq" className="flex items-center gap-1 transition hover:text-white">Contact <ArrowUpRight size={12} /></a>
        </div>
        <p className="text-[15px] text-[#555963]">© 2025 AVER0 Technologies</p>
      </div>
    </footer>
  );
}
