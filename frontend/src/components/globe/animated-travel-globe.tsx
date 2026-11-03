"use client";

import Globe, { type GlobeMethods } from "react-globe.gl";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Feature, Geometry, GeoJsonProperties } from "geojson";
import * as THREE from "three";
import type { DemoDestination, VisaCategory } from "@/data/travel-demo";

type CountryFeature = Feature<Geometry, GeoJsonProperties>;

type Props = {
  destinations: DemoDestination[];
  selectedId: string | null;
  selectedDestination?: DemoDestination | null;
  onSelect: (destination: DemoDestination) => void;
  onHover: (destination: DemoDestination | null) => void;
};

const categoryColors: Record<VisaCategory, string> = {
  "Visa-free": "#78ba8d",
  eVisa: "#79a8df",
  "Visa on arrival": "#d7aa63",
  "Visa required": "#858b95",
};

const continentColors: Record<string, string> = {
  Africa: "#c28d51",
  Asia: "#3d658e",
  Europe: "#aa9abd",
  NorthAmerica: "#567f82",
  Oceania: "#b77d73",
  SouthAmerica: "#49745a",
  Antarctica: "#526174",
};

const fallbackCountryColor = "#587086";

function propertiesOf(country: CountryFeature): Record<string, string> {
  return (country.properties ?? {}) as Record<string, string>;
}

function countryId(country: CountryFeature): string {
  const properties = propertiesOf(country);
  return String(properties.ISO_N3 ?? properties.ADM0_A3 ?? properties.ISO_A3 ?? "");
}

function countryName(country: CountryFeature): string {
  const properties = propertiesOf(country);
  return properties.NAME ?? properties.ADMIN ?? "Unknown country";
}

function continentColor(country: CountryFeature): string {
  const continent = propertiesOf(country).CONTINENT ?? "";
  if (continent === "North America") return continentColors.NorthAmerica;
  if (continent === "South America") return continentColors.SouthAmerica;
  return continentColors[continent] ?? fallbackCountryColor;
}

function averageCoordinates(country: CountryFeature): [number, number] {
  const points: number[][] = [];
  const collect = (value: unknown): void => {
    if (Array.isArray(value) && typeof value[0] === "number") points.push(value as number[]);
    else if (Array.isArray(value)) value.forEach(collect);
  };
  if (country.geometry && "coordinates" in country.geometry) collect(country.geometry.coordinates);
  if (!points.length) return [0, 0];
  const total = points.reduce((result, point) => [result[0] + (point[0] ?? 0), result[1] + (point[1] ?? 0)], [0, 0]);
  return [total[1] / points.length, total[0] / points.length];
}

function flagForCountry(name: string): string {
  const knownFlags: Record<string, string> = {
    Thailand: "🇹🇭",
    Turkey: "🇹🇷",
    Malaysia: "🇲🇾",
    Singapore: "🇸🇬",
    Maldives: "🇲🇻",
    Kenya: "🇰🇪",
    "Sri Lanka": "🇱🇰",
    Japan: "🇯🇵",
    Indonesia: "🇮🇩",
    Morocco: "🇲🇦",
  };
  return knownFlags[name] ?? "🌐";
}

function regionForCountry(country: CountryFeature): DemoDestination["region"] {
  const continent = propertiesOf(country).CONTINENT;
  if (continent === "Africa") return "Africa";
  if (continent === "Europe") return "Europe";
  return "Asia";
}

function syntheticDestination(country: CountryFeature): DemoDestination {
  const name = countryName(country);
  const [lat, lng] = averageCoordinates(country);
  return {
    id: `country-${countryId(country)}`,
    name,
    flag: flagForCountry(name),
    capital: "Country detail",
    region: regionForCountry(country),
    category: "Visa required",
    description: `A country selected from the live 3D Natural Earth geometry. AVER0 would build a verified travel path for ${name}.`,
    imagePosition: "0%",
    coordinates: [lat, lng],
    countryId: countryId(country),
    requirements: ["Illustrative category: visa required", "Passport validity should be checked", "Supporting documents may be required", "Confirm current conditions with the official authority"],
    steps: [
      { title: "Check your eligibility", description: "Review the entry category for your exact profile.", detail: "This country click is a demonstration only and is not a real eligibility result." },
      { title: "Prepare your documents", description: "Collect passport and trip information.", detail: "Keep supporting documents, accommodation details, and onward travel evidence together." },
      { title: "Apply if required", description: "Use the official immigration source.", detail: "AVER0 would provide a verified official link here when one is available." },
      { title: "Prepare for departure", description: "Recheck conditions close to departure.", detail: "Border requirements can change, so confirm them before travel." },
      { title: "Arrive prepared", description: "Keep your final documents easy to reach.", detail: "Complete the readiness checklist before leaving for the airport." },
    ],
  };
}

function tooltip(country: CountryFeature, destination: DemoDestination | undefined, highlighted: boolean): string {
  const name = countryName(country);
  const status = destination ? `${destination.category} · sample data` : highlighted ? "Destination signal · sample data" : "Country geometry";
  return `<div style="padding:6px 8px;font-family:Geist Sans,Arial,sans-serif"><strong>${name}</strong><br/><span style="opacity:.72">${status}</span></div>`;
}

export default function AnimatedTravelGlobe({ destinations, selectedId, selectedDestination, onSelect, onHover }: Props) {
  const globeRef = useRef<GlobeMethods | undefined>(undefined);
  const containerRef = useRef<HTMLDivElement>(null);
  const [countries, setCountries] = useState<CountryFeature[]>([]);
  const [dimensions, setDimensions] = useState({ width: 720, height: 510 });
  const [hoveredCountryId, setHoveredCountryId] = useState<string | null>(null);
  const [highlightedIds, setHighlightedIds] = useState<Set<string>>(new Set());

  const globeMaterial = useMemo(() => new THREE.MeshPhongMaterial({ color: "#061322", emissive: "#020713", shininess: 65 }), []);
  const destinationByCountryId = useMemo(() => new Map(destinations.map((destination) => [destination.countryId, destination])), [destinations]);
  const selected = destinations.find((destination) => destination.id === selectedId) ?? null;
  const focusDestination = selected ?? selectedDestination ?? null;
  const selectedCountryId = focusDestination?.countryId ?? null;

  useEffect(() => {
    let active = true;
    fetch("/geo/countries.geojson")
      .then((response) => {
        if (!response.ok) throw new Error("Country geometry could not be loaded");
        return response.json() as Promise<{ features?: CountryFeature[] }>;
      })
      .then((data) => {
        if (active) setCountries(data.features ?? []);
      })
      .catch(() => {
        if (active) setCountries([]);
      });
    return () => { active = false; };
  }, []);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;
    const update = () => setDimensions({ width: Math.max(300, element.clientWidth), height: Math.max(420, element.clientHeight) });
    update();
    const observer = new ResizeObserver(update);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!countries.length) return;
    const ids = destinations.map((destination) => destination.countryId);
    let index = 0;
    const timer = window.setInterval(() => {
      setHighlightedIds((current) => {
        const next = new Set(current);
        if (ids[index]) next.add(ids[index]);
        index += 1;
        return next;
      });
      if (index >= ids.length) window.clearInterval(timer);
    }, 150);
    return () => window.clearInterval(timer);
  }, [countries.length, destinations]);

  useEffect(() => {
    const globe = globeRef.current;
    if (!globe) return;
    const controls = globe.controls();
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pauseRotation = () => { controls.autoRotate = false; };
    const resumeRotation = () => { if (!reducedMotion) controls.autoRotate = true; };
    controls.enablePan = false;
    controls.enableDamping = true;
    controls.autoRotate = !reducedMotion;
    controls.autoRotateSpeed = 0.22;
    controls.addEventListener("start", pauseRotation);
    controls.addEventListener("end", resumeRotation);
    globe.pointOfView({ lat: 19, lng: -18, altitude: 2.15 }, 0);
    return () => {
      controls.removeEventListener("start", pauseRotation);
      controls.removeEventListener("end", resumeRotation);
    };
  }, [countries.length]);

  useEffect(() => {
    const element = containerRef.current;
    const globe = globeRef.current;
    if (!element || !globe) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) globe.resumeAnimation();
      else globe.pauseAnimation();
    }, { threshold: 0.01 });
    observer.observe(element);
    return () => observer.disconnect();
  }, [countries.length]);

  useEffect(() => {
    const globe = globeRef.current;
    if (!globe || !focusDestination) return;
    globe.pointOfView({ lat: focusDestination.coordinates[0], lng: focusDestination.coordinates[1], altitude: 1.55 }, 1100);
  }, [focusDestination]);

  const resetView = () => globeRef.current?.pointOfView({ lat: 19, lng: -18, altitude: 2.15 }, 900);
  const resolveDestination = (country: CountryFeature): DemoDestination => destinationByCountryId.get(countryId(country)) ?? syntheticDestination(country);
  const hoveredCountry = countries.find((country) => countryId(country) === hoveredCountryId);

  return <div ref={containerRef} className="relative h-full min-h-[470px] w-full overflow-hidden">
    {!countries.length && <div className="absolute inset-0 z-10 grid place-items-center text-[15px] text-[#858995]">Loading Natural Earth country geometry…</div>}
    <Globe
      ref={globeRef}
      width={dimensions.width}
      height={dimensions.height}
      backgroundColor="rgba(0,0,0,0)"
      showGlobe
      globeMaterial={globeMaterial}
      showAtmosphere
      atmosphereColor="#7b8da8"
      atmosphereAltitude={0.12}
      globeCurvatureResolution={48}
      polygonsData={countries}
      polygonGeoJsonGeometry={(country) => (country as CountryFeature).geometry as unknown as { type: string; coordinates: number[] }}
      polygonCapColor={(country) => {
        const item = country as CountryFeature;
        const id = countryId(item);
        const destination = destinationByCountryId.get(id);
        if (id === selectedCountryId) return "#f5dc9b";
        if (id === hoveredCountryId) return "#d9cfff";
        if (highlightedIds.has(id) && destination) return categoryColors[destination.category];
        return continentColor(item);
      }}
      polygonSideColor={(country) => {
        const id = countryId(country as CountryFeature);
        return id === selectedCountryId ? "rgba(245,220,155,.88)" : "rgba(7,18,32,.88)";
      }}
      polygonStrokeColor={(country) => countryId(country as CountryFeature) === hoveredCountryId ? "rgba(255,255,255,.9)" : "rgba(221,226,239,.38)"}
      polygonAltitude={(country) => {
        const id = countryId(country as CountryFeature);
        if (id === selectedCountryId) return 0.065;
        if (id === hoveredCountryId) return 0.045;
        if (highlightedIds.has(id)) return 0.032;
        return 0.012;
      }}
      polygonsTransitionDuration={650}
      polygonLabel={(country) => tooltip(country as CountryFeature, destinationByCountryId.get(countryId(country as CountryFeature)), highlightedIds.has(countryId(country as CountryFeature)))}
      onPolygonHover={(country) => {
        const item = country as CountryFeature | null;
        const id = item ? countryId(item) : null;
        setHoveredCountryId(id);
        onHover(item ? resolveDestination(item) : null);
      }}
      onPolygonClick={(country) => onSelect(resolveDestination(country as CountryFeature))}
      pointsData={destinations}
      pointLat={(destination) => (destination as DemoDestination).coordinates[0]}
      pointLng={(destination) => (destination as DemoDestination).coordinates[1]}
      pointColor={(destination) => categoryColors[(destination as DemoDestination).category]}
      pointAltitude={0.075}
      pointRadius={0.018}
      pointResolution={12}
      pointsMerge={false}
      pointLabel={(destination) => `<div style="padding:6px 8px;font-family:Geist Sans,Arial,sans-serif"><strong>${(destination as DemoDestination).flag} ${(destination as DemoDestination).name}</strong><br/><span style="opacity:.72">${(destination as DemoDestination).category} · illustrative demo</span></div>`}
      onPointClick={(destination) => onSelect(destination as DemoDestination)}
      ringsData={focusDestination ? [focusDestination] : []}
      ringLat={(destination) => (destination as DemoDestination).coordinates[0]}
      ringLng={(destination) => (destination as DemoDestination).coordinates[1]}
      ringColor={() => "#f1d995"}
      ringMaxRadius={0.12}
      ringPropagationSpeed={0.6}
      ringRepeatPeriod={1500}
      enablePointerInteraction
    />
    {hoveredCountry && <div className="pointer-events-none absolute left-5 top-5 z-10 rounded-full border border-white/10 bg-[#121923]/85 px-3 py-2 text-xs text-[#d8d9e0] backdrop-blur-xl">{countryName(hoveredCountry)}</div>}
    <div className="absolute right-5 top-5 z-10 flex flex-col gap-2">
      <button type="button" onClick={() => globeRef.current?.pointOfView({ altitude: Math.max(1.35, (globeRef.current?.pointOfView().altitude ?? 2) - 0.25) }, 350)} className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-[#111821]/85 text-lg text-[#d8d9e0] backdrop-blur-xl transition hover:border-white/25">+</button>
      <button type="button" onClick={() => globeRef.current?.pointOfView({ altitude: Math.min(3.6, (globeRef.current?.pointOfView().altitude ?? 2) + 0.25) }, 350)} className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-[#111821]/85 text-lg text-[#d8d9e0] backdrop-blur-xl transition hover:border-white/25">−</button>
      <button type="button" onClick={resetView} className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-[#111821]/85 text-xs text-[#b9b0ff] backdrop-blur-xl transition hover:border-white/25">↺</button>
    </div>
  </div>;
}
