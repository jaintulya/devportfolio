"use client";
import { useEffect, useState } from "react";

export default function LoadingScreen({ onComplete }) {
  const [mounted, setMounted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);
  const [msgIdx, setMsgIdx] = useState(0);
  const msgs = [
    "Establishing connection...",
    "Curating cinematic moments...",
    "Rendering visual stories...",
    "Finishing touch...",
    "Welcome."
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    let cur = 0;
    const iv = setInterval(() => {
      cur += Math.random() * 12 + 4;
      if (cur >= 100) {
        cur = 100;
        clearInterval(iv);
        setTimeout(() => setExiting(true), 300);
        setTimeout(onComplete, 900);
      }
      setProgress(Math.min(cur, 100));
      setMsgIdx(Math.min(Math.floor(cur / 20), msgs.length - 1));
    }, 100);
    return () => clearInterval(iv);
  }, [mounted]);

  if (!mounted) {
    return (
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 10000,
          background: "#080706",
        }}
      />
    );
  }

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 10000,
        background: "#080706",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        opacity: exiting ? 0 : 1,
        transition: "opacity 0.6s cubic-bezier(0.25, 1, 0.5, 1)",
      }}
    >
      {/* Subtle Grain Overlay */}
      <div
        style={{
          position: "absolute",
          inset: "-50%",
          width: "200%",
          height: "200%",
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.88' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "128px 128px",
          opacity: 0.03,
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* Main typographic container */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          zIndex: 2,
          gap: 40,
        }}
      >
        <div style={{ textAlign: "center" }}>
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(24px, 4vw, 40px)",
              fontWeight: 300,
              color: "#F8F5F2",
              letterSpacing: "0.45em",
              textTransform: "uppercase",
              margin: "0 0 12px 0",
              opacity: 0.95,
            }}
          >
            Devarsh Jain
          </h1>
          <p
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "clamp(8px, 1.2vw, 10px)",
              color: "#C9A27E",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              margin: 0,
              opacity: 0.8,
            }}
          >
            Cinematic Wedding Filmmaker
          </p>
        </div>

        {/* Progress bar container */}
        <div
          style={{
            width: 240,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 16,
          }}
        >
          {/* Elegant thin progress bar */}
          <div
            style={{
              width: "100%",
              height: 1,
              background: "rgba(248, 245, 242, 0.08)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                height: "100%",
                width: `${progress}%`,
                background: "linear-gradient(90deg, #A8825A, #C9A27E, #E8CBAA)",
                transition: "width 0.1s ease-out",
              }}
            />
          </div>

          {/* Progress stats */}
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: 9,
                color: "rgba(248, 245, 242, 0.45)",
                letterSpacing: "0.1em",
              }}
            >
              {msgs[msgIdx]}
            </span>
            <span
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: 10,
                color: "#C9A27E",
                fontWeight: 500,
                letterSpacing: "0.05em",
              }}
            >
              {Math.round(progress)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
