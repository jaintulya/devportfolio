"use client";
import { useEffect, useState } from "react";

const BRAND_DURATION = 1000; // 1 second brand mark

export default function LoadingScreen({ onComplete }) {
  const [hidden, setHidden] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!mounted) return;
    // Show brand mark for exactly 1 second, then fade out
    const showTimer = setTimeout(() => {
      setHidden(true);
    }, BRAND_DURATION);

    const completeTimer = setTimeout(() => {
      onComplete();
    }, BRAND_DURATION + 500); // 500ms fade out

    return () => {
      clearTimeout(showTimer);
      clearTimeout(completeTimer);
    };
  }, [mounted, onComplete]);

  if (!mounted) {
    return (
      <div
        style={{
          position: "fixed", inset: 0, zIndex: 10000,
          background: "var(--brand-maroon-deep)",
        }}
        aria-hidden="true"
      />
    );
  }

  return (
    <div
      className={`preloader-overlay ${hidden ? "hidden" : ""}`}
      role="status"
      aria-label="Shaadi Pitara"
      aria-live="polite"
    >
      {/* Subtle radial glow */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400, height: 400,
          borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(212,184,150,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 24,
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* Gold line — animates in */}
        <div className="preloader-line" />

        {/* Brand name */}
        <h1 className="preloader-text">SHAADI PITARA</h1>

        {/* Sub-label */}
        <p className="preloader-sub">Wedding Content Studio</p>
      </div>
    </div>
  );
}
