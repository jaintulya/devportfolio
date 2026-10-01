"use client";
import { useState, useEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { AdaptiveDpr } from "@react-three/drei";
import R3FScene from "./R3FScene";

export default function R3FCanvas({ tier }) {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [webglSupported, setWebglSupported] = useState(true);

  useEffect(() => {
    // Check WebGL availability
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (!gl) {
        setWebglSupported(false);
        return;
      }
    } catch {
      setWebglSupported(false);
      return;
    }

    setMounted(true);
    const check = () => {
      setIsMobile(
        window.innerWidth <= 768 ||
        window.matchMedia("(hover: none) and (pointer: coarse)").matches
      );
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  if (!mounted || !webglSupported) return null;

  // Hard spec: On mobile, cap dpr at [1, 1.5]
  const dpr = isMobile ? [1, 1.5] : [1, 2];

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      <Canvas
        dpr={dpr}
        gl={{
          alpha: true,
          antialias: !isMobile,
          powerPreference: "high-performance",
          stencil: false,
          depth: true,
        }}
        camera={{ position: [0, 0, 6], fov: 50, near: 0.1, far: 40 }}
        style={{
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
        onCreated={({ gl }) => {
          gl.outputColorSpace = "srgb";
        }}
      >
        <AdaptiveDpr pixelated />
        <Suspense fallback={null}>
          <R3FScene tier={tier} isMobile={isMobile} />
        </Suspense>
      </Canvas>
    </div>
  );
}