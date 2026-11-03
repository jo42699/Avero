"use client";

import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { feature } from "topojson-client";
import worldData from "world-atlas/countries-110m.json";
import ThreeGlobe from "three-globe";
import { useEffect, useMemo, useRef } from "react";
import type { Feature, Geometry } from "geojson";
import * as THREE from "three";

type Props = { onSelect: (country: string) => void };

const naturalPalette = {
  northAmerica: "#5d9291",
  southAmerica: "#3f7655",
  europe: "#b1a1c5",
  africa: "#c68a4e",
  asia: "#345b86",
  oceania: "#bc7a72",
  antarctica: "#a79aa0",
};

function coordinateAverage(featureItem: Feature): [number, number] {
  const coordinates: number[][] = [];
  const geometry = featureItem.geometry as Geometry | null;
  const collect = (value: unknown): void => {
    if (Array.isArray(value) && typeof value[0] === "number") coordinates.push(value as number[]);
    else if (Array.isArray(value)) value.forEach(collect);
  };
  if (geometry && "coordinates" in geometry) collect(geometry.coordinates);
  if (!coordinates.length) return [0, 0];
  const sum = coordinates.reduce((result, coordinate) => [result[0] + (coordinate[0] ?? 0), result[1] + (coordinate[1] ?? 0)], [0, 0]);
  return [sum[0] / coordinates.length, sum[1] / coordinates.length];
}

function continentColor(featureItem: Feature) {
  const [lng, lat] = coordinateAverage(featureItem);
  if (lat < -55) return naturalPalette.antarctica;
  if (lng < -30 && lat > 5) return naturalPalette.northAmerica;
  if (lng < -30 && lat <= 5) return naturalPalette.southAmerica;
  if (lng >= -25 && lng < 45 && lat > 30) return naturalPalette.europe;
  if (lng >= -20 && lng < 55 && lat <= 30) return naturalPalette.africa;
  if (lng >= 110 && lat < 10) return naturalPalette.oceania;
  return naturalPalette.asia;
}

function NeonGlobe({ onSelect }: Props) {
  const globeRef = useRef<THREE.Object3D>(null);
  const onSelectRef = useRef(onSelect);
  const globe = useMemo(() => {
    const object = new ThreeGlobe();
    const countries = (feature(worldData as never, (worldData as never as { objects: { countries: unknown } }).objects.countries as never) as unknown as { features: Feature[] }).features;
    object
      .showGlobe(true)
      .globeMaterial(new THREE.MeshPhongMaterial({ color: "#06122b", emissive: "#020817", shininess: 90 }))
      .showAtmosphere(true)
      .atmosphereColor("#00bfff")
      .atmosphereAltitude(0.2)
      .polygonsData(countries)
      .polygonAltitude(0.018)
      .polygonCapColor((country: object) => continentColor(country as Feature))
      .polygonSideColor((country: object) => `${continentColor(country as Feature)}aa`)
      .polygonStrokeColor(() => "rgba(236, 253, 255, 0.7)");
    return object;
  }, []);

  useEffect(() => {
    onSelectRef.current = onSelect;
    if (globeRef.current) globeRef.current.rotation.y = 0.45;
  }, [onSelect]);

  useFrame((_, delta) => {
    if (globeRef.current) globeRef.current.rotation.y += delta * 0.012;
  });

  const handleClick = (event: { point: THREE.Vector3 }) => {
    const local = globeRef.current?.worldToLocal(event.point.clone()) ?? event.point;
    const longitude = Math.atan2(local.x, local.z) * (180 / Math.PI);
    const latitude = Math.asin(local.y / local.length()) * (180 / Math.PI);
    const hemisphere = latitude >= 0 ? "Northern" : "Southern";
    const direction = longitude >= 0 ? "Eastern" : "Western";
    onSelectRef.current(`${hemisphere} ${direction} hemisphere`);
  };

  return <><primitive ref={globeRef} object={globe} scale={2.02} /><mesh scale={2.02} onClick={handleClick}><sphereGeometry args={[1.03, 32, 20]} /><meshBasicMaterial transparent opacity={0} depthWrite={false} /></mesh></>;
}

export default function HeroGlobeCanvas({ onSelect }: Props) {
  return <Canvas camera={{ position: [0, 0, 5], fov: 37 }} dpr={[1, 1.6]} gl={{ antialias: true, alpha: true }}><ambientLight intensity={0.9} /><directionalLight position={[4, 3, 4]} intensity={2.3} color="#fff0d4" /><directionalLight position={[-4, 1, -3]} intensity={0.75} color="#8d9fbe" /><NeonGlobe onSelect={onSelect} /><OrbitControls enablePan={false} enableDamping dampingFactor={0.08} minDistance={3.7} maxDistance={6.7} rotateSpeed={0.58} /></Canvas>;
}
