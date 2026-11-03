export type Destination = {
  name: string;
  country: string;
  code: string;
  flag: string;
  accent: string;
  visas: string;
  wait: string;
  region: string;
  description: string;
  coordinates: [number, number];
};

export type VisaResult = {
  destination: string;
  status: "ready" | "visa" | "check";
  label: string;
  note: string;
  stay: string;
};
