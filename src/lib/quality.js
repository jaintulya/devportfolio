"use client";

export const TIERS = {
  off: { dpr: [1, 1], count: 0, webgl: false },
  low: { dpr: [1, 1], count: 80, webgl: true },
  medium: { dpr: [1, 1.5], count: 160, webgl: true },
  high: { dpr: [1, 2], count: 280, webgl: true },
};

export function getQualityTier() {
  if (typeof window === "undefined") return "high";
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return "off";
  const cores = navigator.hardwareConcurrency || 4;
  const mem = navigator.deviceMemory || 4;
  if (cores <= 2 || mem <= 2) return "low";
  if (cores <= 4 || mem <= 4) return "medium";
  return "high";
}