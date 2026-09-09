"use client";
import { useRef, useEffect, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { reelData, reelCategories } from "@/lib/reelData";
import { lenisRef } from "@/components/SmoothScroll";
import FilmBendStrip from "./FilmBendStrip";

gsap.registerPlugin(ScrollTrigger);

function getEmbedUrl(url) {
  return url.replace(/\/$/, "") + "/embed/";
}

// One featured reel per category
function getFeaturedReels() {
  return reelCategories
    .map((cat) => reelData.find((r) => r.category === cat.id))
    .filter(Boolean);
}
const FEATURED_REELS = getFeaturedReels();


// ── Custom Coverflow for Desktop ─────────────────────────────────────────────
function ReelCoverflow({ reels, onOpen, getCatLabel }) {
  const count = reels.length;
  const frameRef = useRef(null);
  const cardRefs = useRef([]);
  const posRef = useRef(0);
  const targetRef = useRef(0);
  const widthRef = useRef(0);
  const rafRef = useRef(null);
  const dragRef = useRef(null);
  const [selected, setSelected] = useState(0);

  const indexAt = useCallback(
    (pos) => ((Math.round(pos) % count) + count) % count,
    [count],
  );

  const paint = useCallback(() => {
    const width = widthRef.current;
    if (!width) return;
    const pitch = width * 1.08;
    const pos = posRef.current;
    cardRefs.current.forEach((card, index) => {
      if (!card) return;
      let offset = index - pos;
      offset = ((offset % count) + count) % count;
      if (offset > count / 2) offset -= count;
      const distance = Math.abs(offset);
      const ramp = Math.pow(distance, 0.56);
      const tilt = Math.min(44 * ramp, 82) * Math.sign(offset);
      card.style.transform =
        `translateX(calc(-50% + ${offset * pitch}px)) translateZ(${-0.5 * width * ramp}px) rotateY(${-tilt}deg)`;
      const edge = Math.min(1, Math.max(0, count / 2 - distance));
      card.style.opacity = String(Math.max(0, 1 - 0.12 * distance) * edge);
      card.style.zIndex = String(100 - Math.round(distance));
      if (Math.round(distance) === 0) {
        card.style.boxShadow = "0 0 0 1.5px rgba(212,184,150,0.35)";
      } else {
        card.style.boxShadow = "none";
      }
    });
  }, [count]);

  const settle = useCallback((target) => {
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    targetRef.current = target;
    setSelected(indexAt(target));
    const step = () => {
      const remaining = target - posRef.current;
      if (Math.abs(remaining) < 0.0004) {
        posRef.current = target;
        paint();
        rafRef.current = null;
        return;
      }
      posRef.current += remaining * 0.16;
      paint();
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
  }, [indexAt, paint]);

  const nudge = useCallback((by) => settle(Math.round(targetRef.current) + by), [settle]);

  const onPointerDown = (e) => {
    if (rafRef.current !== null) { cancelAnimationFrame(rafRef.current); rafRef.current = null; }
    targetRef.current = posRef.current;
    dragRef.current = {
      id: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      x: e.clientX,
      pos: posRef.current,
      v: 0,
      t: performance.now(),
      isDragging: false,
    };
  };
  const onPointerMove = (e) => {
    const drag = dragRef.current;
    if (!drag || drag.id !== e.pointerId) return;
    const dx = e.clientX - drag.startX;
    const dy = e.clientY - drag.startY;

    if (!drag.isDragging) {
      if (Math.abs(dx) > 6 || Math.abs(dy) > 6) {
        drag.isDragging = true;
        try { e.currentTarget.setPointerCapture(e.pointerId); } catch {}
      } else {
        return;
      }
    }

    const pitch = widthRef.current * 1.08;
    if (!pitch) return;
    const now = performance.now();
    const prev = posRef.current;
    posRef.current = drag.pos - (e.clientX - drag.startX) / pitch;
    drag.v = ((posRef.current - prev) / Math.max(now - drag.t, 1)) * 1000;
    drag.t = now;
    setSelected(indexAt(posRef.current));
    paint();
  };
  const endDrag = (e) => {
    const drag = dragRef.current;
    if (!drag || drag.id !== e.pointerId) return;
    if (drag.isDragging) {
      try { e.currentTarget.releasePointerCapture(e.pointerId); } catch {}
      const carried = Math.max(-2, Math.min(2, drag.v * 0.18));
      settle(Math.round(posRef.current + carried));
    }
    dragRef.current = null;
  };

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    const measure = () => {
      const card = cardRefs.current[0];
      if (!card) return;
      widthRef.current = card.offsetWidth;
      paint();
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(frame);
    return () => observer.disconnect();
  }, [paint]);

  useEffect(() => () => { if (rafRef.current !== null) cancelAnimationFrame(rafRef.current); }, []);

  return (
    <div style={{ width: "100%", userSelect: "none" }}>
      {/* Coverflow track */}
      <div
        ref={frameRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") { e.preventDefault(); nudge(-1); }
          if (e.key === "ArrowRight") { e.preventDefault(); nudge(1); }
        }}
        tabIndex={0}
        style={{
          overflow: "hidden",
          padding: "40px 0 32px",
          cursor: "grab",
          outline: "none",
          perspective: "1200px",
          touchAction: "pan-y",
        }}
      >
        <div
          style={{
            position: "relative",
            height: "clamp(300px, 38vw, 480px)",
            transformStyle: "preserve-3d",
          }}
        >
          {reels.map((reel, index) => (
            <div
              key={reel.id}
              ref={(node) => { cardRefs.current[index] = node; }}
              onClick={() => {
                if (dragRef.current?.isDragging) return;
                onOpen(reel, index);
              }}
              style={{
                position: "absolute",
                left: "50%",
                top: 0,
                width: "clamp(180px, 22vw, 280px)",
                aspectRatio: "9/16",
                borderRadius: 14,
                overflow: "hidden",
                cursor: "pointer",
                background: "#1a0408",
                willChange: "transform",
                transition: "box-shadow 0.4s ease",
              }}
            >
              <img
                src={reel.poster}
                alt={reel.title}
                draggable={false}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", pointerEvents: "none" }}
              />
              {/* Play button */}
              <button
                type="button"
                onPointerDown={(e) => {
                  e.stopPropagation();
                }}
                onPointerUp={(e) => {
                  e.stopPropagation();
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  onOpen(reel, index);
                }}
                aria-label={`Play ${reel.title}`}
                style={{
                  position: "absolute", top: "50%", left: "50%",
                  transform: "translate(-50%,-50%)",
                  width: 52, height: 52, borderRadius: "50%",
                  background: "rgba(10,2,3,0.65)",
                  border: "1.5px solid rgba(212,184,150,0.65)",
                  backdropFilter: "blur(6px)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: "pointer", zIndex: 5,
                  transition: "transform 0.3s ease, border-color 0.3s ease",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translate(-50%,-50%) scale(1.1)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "translate(-50%,-50%) scale(1)"; }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="var(--brand-cream)"><polygon points="6 3 20 12 6 21 6 3" /></svg>
              </button>
              {/* Bottom info */}
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "0 14px 14px", pointerEvents: "none" }}>
                <div style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: "clamp(13px, 1.4vw, 17px)",
                  fontStyle: "italic", fontWeight: 500,
                  color: "var(--brand-cream)", lineHeight: 1.2,
                  marginBottom: 4, whiteSpace: "nowrap",
                  overflow: "hidden", textOverflow: "ellipsis",
                }}>
                  {reel.title}
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--brand-gold)" }}>
                    {getCatLabel(reel.category)}
                  </span>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "rgba(212,184,150,0.55)", letterSpacing: "0.05em" }}>
                    {reel.duration}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 20, marginTop: 12 }}>
        <button
          onClick={() => nudge(-1)}
          aria-label="Previous reel"
          style={{
            width: 42, height: 42, borderRadius: "50%",
            background: "rgba(212,184,150,0.07)",
            border: "1px solid rgba(212,184,150,0.2)",
            color: "var(--brand-cream)", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "all 0.25s ease",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(212,184,150,0.18)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(212,184,150,0.07)"; }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
        </button>

        {/* Pagination Dots between arrows */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "0 4px" }}>
          {reels.map((_, i) => {
            const isActive = i === selected;
            return (
              <button
                key={i}
                type="button"
                onClick={() => settle(i + Math.round((targetRef.current - i) / count) * count)}
                aria-label={`Go to reel ${i + 1}`}
                style={{
                  width: isActive ? 22 : 6,
                  height: 6,
                  borderRadius: 3,
                  background: isActive ? "var(--brand-gold)" : "rgba(212,184,150,0.25)",
                  border: "none",
                  padding: 0,
                  cursor: "pointer",
                  transition: "all 0.35s cubic-bezier(0.23, 1, 0.32, 1)",
                }}
              />
            );
          })}
        </div>

        <button
          onClick={() => nudge(1)}
          aria-label="Next reel"
          style={{
            width: 42, height: 42, borderRadius: "50%",
            background: "rgba(212,184,150,0.07)",
            border: "1px solid rgba(212,184,150,0.2)",
            color: "var(--brand-cream)", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "all 0.25s ease",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(212,184,150,0.18)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(212,184,150,0.07)"; }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
        </button>
      </div>
    </div>
  );
}
// ─────────────────────────────────────────────────────────────────────────────

export default function ReelShowcase() {
  const secRef = useRef(null);
  const headRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [activeReel, setActiveReel] = useState(null);
  const [activeReelIndex, setActiveReelIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const allReels = FEATURED_REELS;
  const iframeRef = useRef(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const getCatLabel = (catId) => {
    const found = reelCategories.find((c) => c.id === catId);
    return found ? found.label : catId;
  };

  const openModal = useCallback((reel, idx) => {
    setActiveReelIndex(idx ?? allReels.findIndex((r) => r.id === reel.id));
    setActiveReel(reel);
    setModalOpen(true);
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    document.body.style.touchAction = "none";
    document.body.classList.add("hide-navbar");
    if (typeof window !== "undefined") window.__lenis?.stop();
    lenisRef.current?.stop();
  }, [allReels]);

  const navigateModal = useCallback((dir) => {
    const next = (activeReelIndex + dir + allReels.length) % allReels.length;
    setActiveReelIndex(next);
    setActiveReel(allReels[next]);
  }, [activeReelIndex, allReels]);

  const closeModal = useCallback(() => {
    if (iframeRef.current) {
      try { iframeRef.current.contentWindow?.postMessage('{"action":"pause"}', "*"); } catch {}
    }
    setModalOpen(false);
    setActiveReel(null);
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
    document.body.style.touchAction = "";
    document.body.classList.remove("hide-navbar");
    if (typeof window !== "undefined") window.__lenis?.start();
    lenisRef.current?.start();
  }, []);

  useEffect(() => {
    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
      document.body.classList.remove("hide-navbar");
      if (typeof window !== "undefined") window.__lenis?.start();
      lenisRef.current?.start();
    };
  }, []);

  useEffect(() => {
    if (!modalOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowLeft") navigateModal(-1);
      if (e.key === "ArrowRight") navigateModal(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [modalOpen, closeModal, navigateModal]);

  // Entrance animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headRef.current) {
        gsap.from(headRef.current.children, {
          y: 24, opacity: 0, duration: 0.9, ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: { trigger: headRef.current, start: "top 85%" },
        });
      }
    }, secRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="reels"
      ref={secRef}
      className="work-section"
      aria-label="Our Work"
      style={{
        position: "relative",
        overflow: "hidden",
        padding: "clamp(80px, 10vw, 140px) clamp(16px, 4vw, 48px)",
        scrollMarginTop: 72,
      }}
    >
      {/* Section header */}
      <div
        ref={headRef}
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          textAlign: "center",
          position: "relative",
          zIndex: 10,
          marginBottom: "clamp(32px, 4vw, 48px)",
        }}
      >
        <h2 className="c-heading" style={{ margin: "14px 0 12px" }}>
          Selected <i>Works</i>
        </h2>
        <p style={{
          fontFamily: "var(--font-body)",
          fontSize: "clamp(14px, 1.3vw, 16px)",
          color: "rgba(247,230,204,0.5)",
          lineHeight: 1.75, maxWidth: 480,
          margin: "14px auto 0", fontWeight: 300,
        }}>
          Every reel is a love story, a celebration, a memory frozen in motion.
        </p>
      </div>

      {/* ── Carousel / Strip ── */}
      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 10, marginBottom: "clamp(24px, 3vw, 36px)" }}>
        {isMobile ? (
          <FilmBendStrip
            reels={FEATURED_REELS}
            onOpen={(reel) => openModal(reel, FEATURED_REELS.findIndex((r) => r.id === reel.id))}
            isMobile={true}
            onSeeMore="/works"
          />
        ) : (
          <>
            <ReelCoverflow reels={FEATURED_REELS} onOpen={openModal} getCatLabel={getCatLabel} />
            {/* Desktop drag / swipe hint */}
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              gap: 10, marginTop: 12, opacity: 0.45,
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--brand-cream)" strokeWidth={1.5}><path d="M19 12H5M12 5l-7 7 7 7" /></svg>
              <span style={{
                fontFamily: "var(--font-mono)", fontSize: 9,
                letterSpacing: "0.25em", textTransform: "uppercase",
                color: "var(--brand-cream)",
              }}>
                Drag or swipe to explore
              </span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--brand-cream)" strokeWidth={1.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </div>
          </>
        )}
      </div>

      {/* See More */}
      {!isMobile && (
        <div style={{ textAlign: "center", marginTop: 24, zIndex: 10, position: "relative" }}>
          <Link
            href="/works"
            style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              padding: "14px 32px", background: "transparent",
              color: "var(--brand-cream)", fontFamily: "var(--font-body)",
              fontSize: 10, fontWeight: 600, letterSpacing: "0.2em",
              textTransform: "uppercase", border: "1px solid rgba(212,184,150,0.25)",
              textDecoration: "none", cursor: "pointer", borderRadius: 0,
              transition: "all 0.35s ease",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(212,184,150,0.55)"; e.currentTarget.style.background = "rgba(212,184,150,0.06)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(212,184,150,0.25)"; e.currentTarget.style.background = "transparent"; }}
          >
            SEE MORE &rarr;
          </Link>
        </div>
      )}

      {/* ── Modal (same as /work) ── */}
      {modalOpen && activeReel && (
        <div
          onClick={closeModal}
          style={{
            position: "fixed", inset: 0, zIndex: 99999,
            background: "rgba(5, 1, 2, 0.97)",
            backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: isMobile ? "8px 12px" : "clamp(20px, 4vw, 48px)",
            touchAction: "none",
          }}
          role="dialog"
          aria-modal="true"
          aria-label={`Playing: ${activeReel.title}`}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              display: "flex",
              alignItems: "center",
              gap: isMobile ? 0 : 44,
              width: "100%",
              maxWidth: isMobile ? "min(360px, 94vw)" : 880,
              maxHeight: isMobile ? "calc(100svh - 20px)" : "90vh",
              flexDirection: isMobile ? "column" : "row",
              overflow: "hidden",
              background: "linear-gradient(160deg, rgba(26, 5, 7, 0.45) 0%, rgba(26, 5, 7, 0.65) 100%), url('/workbg.png') center / cover no-repeat, #2A080A",
              borderRadius: isMobile ? 18 : 24,
              border: "1.5px solid rgba(212,184,150,0.26)",
              boxShadow: "0 35px 90px rgba(0,0,0,0.92), 0 0 0 1px rgba(212,184,150,0.12)",
              position: "relative",
              padding: isMobile ? 0 : "36px 40px",
            }}
          >
            {/* Desktop Top Right Close Button */}
            {!isMobile && (
              <button
                onClick={closeModal}
                aria-label="Close modal"
                style={{
                  position: "absolute",
                  top: 20,
                  right: 20,
                  zIndex: 50,
                  width: 38,
                  height: 38,
                  borderRadius: "50%",
                  background: "rgba(212,184,150,0.08)",
                  border: "1px solid rgba(212,184,150,0.22)",
                  color: "var(--brand-cream)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(212,184,150,0.2)";
                  e.currentTarget.style.transform = "scale(1.06)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(212,184,150,0.08)";
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            )}

            {/* Mobile Top Bar */}
            {isMobile && (
              <div style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "8px 12px 6px",
                borderBottom: "1px solid rgba(212,184,150,0.12)",
                background: "rgba(18,3,6,0.95)",
                zIndex: 20,
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.2em", color: "var(--brand-gold)", textTransform: "uppercase" }}>
                    {getCatLabel(activeReel.category)}
                  </span>
                  <span style={{ color: "rgba(212,184,150,0.3)", fontSize: 9 }}>•</span>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "rgba(212,184,150,0.6)", letterSpacing: "0.1em" }}>
                    {String(activeReelIndex + 1).padStart(2, "0")}/{String(allReels.length).padStart(2, "0")}
                  </span>
                </div>
                <button
                  onClick={closeModal}
                  aria-label="Close modal"
                  style={{
                    width: 28, height: 28, borderRadius: "50%",
                    background: "rgba(212,184,150,0.1)",
                    border: "1px solid rgba(212,184,150,0.35)",
                    color: "var(--brand-cream)",
                    cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>
            )}

            {/* Iframe container */}
            <div style={{
              position: "relative", flexShrink: 0,
              width: isMobile ? "100%" : "min(360px, 38vw)",
              height: isMobile ? "clamp(340px, 58svh, 480px)" : "auto",
              aspectRatio: isMobile ? "auto" : "9/16",
              maxHeight: isMobile ? "58svh" : "80vh",
              borderRadius: isMobile ? 0 : 16, overflow: "hidden",
              background: "#000",
              display: "flex", justifyContent: "center", alignItems: "center",
              border: isMobile ? "none" : "1px solid rgba(212,184,150,0.2)",
              boxShadow: isMobile ? "none" : "0 24px 60px rgba(0,0,0,0.75)",
            }}>
              <div style={{
                width: isMobile ? "auto" : "100%",
                height: "100%",
                aspectRatio: "9/16",
                position: "relative",
                background: "#000",
              }}>
                <iframe
                  ref={iframeRef}
                  key={activeReel.id}
                  src={getEmbedUrl(activeReel.embedUrl)}
                  title={activeReel.title}
                  style={{ width: "100%", height: "100%", border: "none", position: "absolute", inset: 0 }}
                  allow="autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen scrolling="no"
                />
              </div>
            </div>

            {/* Info panel */}
            <div style={{
              flex: 1, minWidth: 0, display: "flex", flexDirection: "column",
              padding: isMobile ? "8px 14px 10px" : 0,
              width: "100%",
              background: isMobile ? "rgba(18,3,6,0.95)" : "transparent",
            }}>

              {!isMobile && (
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.3em", color: "rgba(212,184,150,0.4)", marginBottom: 20, textTransform: "uppercase" }}>
                  {String(activeReelIndex + 1).padStart(2, "0")} / {String(allReels.length).padStart(2, "0")}
                </div>
              )}

              {!isMobile && (
                <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 16, padding: "5px 14px", background: "rgba(212,184,150,0.07)", border: "1px solid rgba(212,184,150,0.18)", borderRadius: 100, alignSelf: "flex-start" }}>
                  <div style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--brand-gold)" }} />
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--brand-gold)" }}>
                    {getCatLabel(activeReel.category)}
                  </span>
                </div>
              )}

              {/* Title & Duration Row */}
              <div style={{
                display: "flex",
                alignItems: isMobile ? "center" : "flex-start",
                justifyContent: isMobile ? "space-between" : "flex-start",
                gap: 12,
                marginBottom: isMobile ? 8 : 20,
              }}>
                <h2 style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: isMobile ? 15 : "clamp(28px, 3.5vw, 42px)",
                  fontWeight: isMobile ? 600 : 400,
                  fontStyle: "italic",
                  color: "var(--brand-cream)",
                  lineHeight: 1.2,
                  letterSpacing: "-0.01em",
                  margin: 0,
                  whiteSpace: isMobile ? "nowrap" : "normal",
                  overflow: isMobile ? "hidden" : "visible",
                  textOverflow: isMobile ? "ellipsis" : "clip",
                  flex: 1,
                }}>
                  {activeReel.title}
                </h2>
                <div style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: isMobile ? 10 : 14,
                  color: "var(--brand-gold)",
                  fontWeight: 600,
                  letterSpacing: "0.05em",
                  flexShrink: 0,
                }}>
                  {activeReel.duration}
                </div>
              </div>

              {!isMobile && (
                <div style={{ width: "100%", height: 1, background: "rgba(212,184,150,0.1)", marginBottom: 28 }} />
              )}

              {/* Controls Buttons */}
              <div style={{ display: "flex", gap: 8, width: "100%", justifyContent: "space-between" }}>
                <button
                  onClick={() => navigateModal(-1)}
                  style={{
                    flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                    padding: isMobile ? "7px 12px" : "12px 24px",
                    background: "rgba(212,184,150,0.08)",
                    border: "1px solid rgba(212,184,150,0.22)",
                    color: "var(--brand-cream)",
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    cursor: "pointer",
                    borderRadius: 4,
                    transition: "all 0.25s ease",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(212,184,150,0.16)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(212,184,150,0.08)"; }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
                  Prev
                </button>
                <button
                  onClick={() => navigateModal(1)}
                  style={{
                    flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                    padding: isMobile ? "7px 12px" : "12px 24px",
                    background: "rgba(212,184,150,0.08)",
                    border: "1px solid rgba(212,184,150,0.22)",
                    color: "var(--brand-cream)",
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    cursor: "pointer",
                    borderRadius: 4,
                    transition: "all 0.25s ease",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(212,184,150,0.16)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(212,184,150,0.08)"; }}
                >
                  Next
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </button>
              </div>

              <a
                href={activeReel.embedUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  marginTop: isMobile ? 6 : 20,
                  color: "rgba(212,184,150,0.45)",
                  fontSize: isMobile ? 9 : 11,
                  fontFamily: "var(--font-body)",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: isMobile ? "center" : "flex-start",
                  gap: 5,
                }}
              >
                View on Instagram
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" /></svg>
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
