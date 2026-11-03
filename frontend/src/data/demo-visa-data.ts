import type { VisaResult } from "@/types";

export const demoVisaResults: Record<string, VisaResult> = {
  Japan: {
    destination: "Japan",
    status: "ready",
    label: "Visa-free entry",
    note: "Your passport can enter Japan for tourism without applying in advance.",
    stay: "Up to 90 days",
  },
  Portugal: {
    destination: "Portugal",
    status: "ready",
    label: "Visa-free entry",
    note: "Portugal is part of the Schengen area. Your trip fits inside the 90/180 rule.",
    stay: "Up to 90 days",
  },
  Kenya: {
    destination: "Kenya",
    status: "visa",
    label: "eTA required",
    note: "Apply online before departure. AVER0 has your checklist ready in one tap.",
    stay: "Up to 90 days",
  },
  Australia: {
    destination: "Australia",
    status: "check",
    label: "Quick check needed",
    note: "Your route may need an eVisitor or ETA depending on your passport.",
    stay: "Varies by visa",
  },
};
