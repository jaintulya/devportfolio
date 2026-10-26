"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import LogoContourSVG from "./LogoContourSVG";
import "./Preloader.css";

export default function Preloader() {
  const pathname = usePathname();
  const isWorksRoute = Boolean(
    pathname && (pathname === "/works" || pathname.startsWith("/works/"))
  );

  // Lifecycle phases: 'ready' -> 'drawing' -> 'filling' -> 'zooming' -> 'exiting' -> 'done'
  const [phase, setPhase] = useState(() => {
    if (typeof window !== "undefined") {
      const currentPath = window.location.pathname;
      if (currentPath === "/works" || currentPath.startsWith("/works/")) {
        return "done";
      }
    }
    return "ready";
  });
  const timersRef = useRef([]);

  const addTimer = (fn, delay) => {
    const id = setTimeout(fn, delay);
    timersRef.current.push(id);
    return id;
  };

  const clearAllTimers = () => {
    timersRef.current.forEach((t) => clearTimeout(t));
    timersRef.current = [];
  };

  useEffect(() => {
    // 1. If currently on /works, immediately cancel, clean up and do not run preloader
    if (isWorksRoute) {
      clearAllTimers();
      setPhase("done");
      document.body.classList.remove("sp-preloader-active", "sp-preloader-exiting");
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      try {
        sessionStorage.setItem("sp_loaded", "1");
        document.documentElement.classList.add("sp-loaded");
      } catch (e) {}
      return;
    }

    // If preloader is already done, avoid re-running when navigating back
    if (phase === "done") {
      return;
    }

    const params = new URLSearchParams(window.location.search);
    const manualPhase = params.get("preloader_phase");

    // Manual test phase freeze: ?preloader_phase=drawing|filling|zooming|exiting
    if (manualPhase && ["drawing", "filling", "zooming", "exiting"].includes(manualPhase)) {
      setPhase(manualPhase);
      document.body.classList.add("sp-preloader-active");
      if (manualPhase === "exiting") {
        document.body.classList.add("sp-preloader-exiting");
      }
      return;
    }

    // 2. Lock page scroll during preloader presentation
    const origBodyOverflow = document.body.style.overflow;
    const origHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    document.body.classList.add("sp-preloader-active");

    // 3. Preload assets
    const assetsToPreload = ["/navlogo-exact.png", "/seamless-texture.jpg"];
    assetsToPreload.forEach((src) => {
      const img = new Image();
      img.src = src;
    });

    // 4. Start drawing cleanly on client mount (prevents SSR-hydration desync or restart)
    setPhase("drawing");

    // 5. Sequence Timing (Continuous fluid motion, zero pauses):
    // 0ms - 2000ms: Deliberate slow start (artistic contour draws top canopy)
    // 2000ms - 3700ms: Fast completion of all details & typography (full sketch completes)
    // 3700ms - 5400ms: Simultaneous inside-out color conversion + logo smoothly emerging forward (zoom-in)
    addTimer(() => {
      setPhase("filling");
    }, 3700);

    // 5400ms: Color conversion and forward emergence complete -> Curtain upward lift (5400ms - 6200ms)
    addTimer(() => {
      setPhase("exiting");
      document.body.classList.add("sp-preloader-exiting");
    }, 5400);

    // 6200ms: Complete and unmount cleanly
    addTimer(() => {
      setPhase("done");
      try {
        sessionStorage.setItem("sp_loaded", "1");
        document.documentElement.classList.add("sp-loaded");
      } catch (e) {}
      document.body.style.overflow = origBodyOverflow;
      document.documentElement.style.overflow = origHtmlOverflow;
      document.body.classList.remove("sp-preloader-active", "sp-preloader-exiting");
    }, 6200);

    return () => {
      clearAllTimers();
      document.body.style.overflow = origBodyOverflow;
      document.documentElement.style.overflow = origHtmlOverflow;
      document.body.classList.remove("sp-preloader-active", "sp-preloader-exiting");
    };
  }, [isWorksRoute]);

  // Completely bypass rendering when on /works or when phase is done
  if (isWorksRoute || phase === "done") {
    return null;
  }

  const phaseClass = `sp-phase-${phase}`;

  return (
    <div
      className={`sp-gold-overlay ${phaseClass}`}
      id="shaadipitara-preloader"
      role="dialog"
      aria-modal="true"
      aria-label="Shaadipitara Cinematic Loading"
    >
      <div className="sp-gold-texture-shade" aria-hidden="true" />
      <div className="sp-gold-stage" id="brandStage">
        <img
          className="sp-gold-original-logo"
          id="originalLogo"
          alt="Shaadipitara Original Gold Artwork"
          src="/navlogo-exact.png"
        />
        <LogoContourSVG />
      </div>
    </div>
  );
}
