"use client";
import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { PerformanceMonitor, AdaptiveDpr } from "@react-three/drei";
import R3FScene from "./R3FScene";
import { TIERS } from "@/lib/quality";

export default function R3FCanvas({ tier }) {
  const cfg = TIERS[tier] || TIERS.high;
  const [dpr, setDpr] = useState(cfg.dpr[1]);

  return (
    <Canvas
      dpr={dpr}
      gl={{
        alpha: true,
        antialias: false,
        powerPreference: "high-performance",
      }}
      camera={{ position: [0, 0, 6], fov: 55 }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
      }}
      onCreated={({ gl }) => {
        gl.outputColorSpace = "srgb";
      }}
    >
      <PerformanceMonitor
        onIncline={() => setDpr((d) => Math.min(2, d * 1.5))}
        onDecline={() => setDpr((d) => Math.max(cfg.dpr[0], d / 1.5))}
      >
        <AdaptiveDpr pixelated />
        <R3FScene tier={tier} />
      </PerformanceMonitor>
    </Canvas>
  );
}