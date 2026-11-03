"use client";

import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { feature } from "topojson-client";
import worldData from "world-atlas/countries-110m.json";
import ThreeGlobe from "three-globe";
import { useEffect, useMemo, useRef } from "react";
import type { Feature } from "geojson";
import * as THREE from "three";

type Props = { onSelect: (country: { name: string; status: string; detail: string }) => void };

const knownCountries: Record<string, { name: string; detail: string }> = {
  "392": { name: "Japan", detail: "Visa-free for 90 days with a UK passport." },
  "620": { name: "Portugal", detail: "A calm landing in the Schengen zone." },
  "484": { name: "Mexico", detail: "Up to 180 days for a new kind of work week." },
  "404": { name: "Kenya", detail: "One quick eTA stands between you and the wild." },
  "036": { name: "Australia", detail: "A little farther out. Still easy to reach." },
  "352": { name: "Iceland", detail: "Long daylight and visa-free horizons." },
};

const knownLocations = [
  { name: "Japan", detail: knownCountries["392"].detail, lat: 35.7, lng: 139.7 },
  { name: "Portugal", detail: knownCountries["620"].detail, lat: 38.7, lng: -9.1 },
  { name: "Mexico", detail: knownCountries["484"].detail, lat: 19.4, lng: -99.1 },
  { name: "Kenya", detail: knownCountries["404"].detail, lat: -1.3, lng: 36.8 },
  { name: "Australia", detail: knownCountries["036"].detail, lat: -37.8, lng: 145 },
  { name: "Iceland", detail: knownCountries["352"].detail, lat: 64.1, lng: -21.9 },
];

function GlobeObject({ onSelect }: Props) {
  const globeRef = useRef<THREE.Object3D>(null);
  const onSelectRef = useRef(onSelect);
  const globe = useMemo(() => {
    const object = new ThreeGlobe();
    const countries = (feature(worldData as never, (worldData as never as { objects: { countries: unknown } }).objects.countries as never) as unknown as { features: Feature[] }).features;
    object
      .globeImageUrl("")
      .showAtmosphere(true)
      .atmosphereColor("#8f83ff")
      .atmosphereAltitude(0.16)
      .polygonsData(countries)
      .polygonAltitude(0.012)
      .polygonCapColor((d: object) => {
        const id = String((d as Feature).id ?? "");
        const palette = ["#6c8497", "#6e8a7a", "#ba9acb", "#ba9560", "#4d78a0", "#c57e72"];
        return palette[Number(id) % palette.length] ?? "#71849b";
      })
      .polygonSideColor(() => "rgba(83, 93, 119, 0.78)")
      .polygonStrokeColor(() => "rgba(219, 222, 255, 0.42)");
    return object;
  }, []);

  useEffect(() => {
    onSelectRef.current = onSelect;
    if (globeRef.current) globeRef.current.rotation.y = -0.8;
  }, [onSelect]);

  useFrame((_, delta) => {
    if (globeRef.current) globeRef.current.rotation.y += delta * 0.018;
  });

  const handleClick = (event: { point: THREE.Vector3 }) => {
    const localPoint = globeRef.current?.worldToLocal(event.point.clone()) ?? event.point;
    const latitude = Math.asin(localPoint.y / localPoint.length()) * (180 / Math.PI);
    const longitude = Math.atan2(localPoint.x, localPoint.z) * (180 / Math.PI);
    const closest = knownLocations.reduce((current, candidate) => {
      const currentDistance = Math.hypot(current.lat - latitude, current.lng - longitude);
      const candidateDistance = Math.hypot(candidate.lat - latitude, candidate.lng - longitude);
      return candidateDistance < currentDistance ? candidate : current;
    });
    onSelectRef.current({ name: closest.name, detail: closest.detail, status: "Visa signal ready" });
  };

  return <><primitive ref={globeRef} object={globe} scale={1.9} /><mesh scale={1.9} onClick={handleClick}><sphereGeometry args={[1.025, 32, 20]} /><meshBasicMaterial transparent opacity={0} depthWrite={false} /></mesh></>;
}

export default function GlobeCanvas({ onSelect }: Props) {
  return <Canvas camera={{ position: [0, 0, 5.1], fov: 38 }} dpr={[1, 1.6]} gl={{ antialias: true, alpha: true }}><ambientLight intensity={1.7} /><directionalLight position={[4, 3, 4]} intensity={2.5} color="#fff8ea" /><directionalLight position={[-4, -1, -2]} intensity={1.2} color="#7f83e7" /><GlobeObject onSelect={onSelect} /><OrbitControls enablePan={false} enableDamping dampingFactor={0.08} minDistance={4.2} maxDistance={7} rotateSpeed={0.55} /></Canvas>;
}
