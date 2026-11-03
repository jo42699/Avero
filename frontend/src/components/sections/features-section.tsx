import { Compass, Fingerprint, Layers3, Zap } from "lucide-react";

const features = [
  { icon: Compass, title: "A clearer compass", text: "AI agents turn country requirements into the next steps that matter for your route.", color: "#a793ff" },
  { icon: Fingerprint, title: "Made for your passport", text: "Your nationality, your plans, your edge cases — all the context, none of the noise.", color: "#f2c477" },
  { icon: Layers3, title: "One layer, many trips", text: "From first idea to last boarding pass, keep the whole journey in the same place.", color: "#8ac9a4" },
  { icon: Zap, title: "Small decisions, fast", text: "Get to a confident yes or no before another tab can open.", color: "#ee9787" },
];

export function FeaturesSection() {
  return <section className="py-24 sm:py-32"><div className="section-wrap"><div className="grid gap-12 lg:grid-cols-[.82fr_1.18fr] lg:gap-20"><div><p className="eyebrow">04 / built for moving</p><h2 className="section-title mt-5 max-w-[420px] font-medium">The quiet confidence of knowing <span className="text-[#a793ff]">what&apos;s next.</span></h2><p className="mt-7 max-w-[390px] text-[18px] leading-7 text-[#858995]">Less tab-switching. Fewer surprises at the gate. More headspace for the part of travel that actually belongs to you.</p></div><div className="grid gap-x-10 sm:grid-cols-2">{features.map(({ icon: Icon, title, text, color }, index) => <div key={title} className={`${index > 1 ? "border-t" : ""} border-white/[0.08] py-8 sm:${index % 2 === 0 ? "border-r pr-8" : "pl-8"} ${index < 2 ? "sm:border-b" : ""}`}><div className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/[0.04]" style={{ color }}><Icon size={19} /></div><h3 className="mt-6 text-[21px] font-medium">{title}</h3><p className="mt-3 max-w-[260px] text-[16px] leading-6 text-[#7e828d]">{text}</p></div>)}</div></div></div></section>;
}
