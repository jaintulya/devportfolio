"use client";
import { useRef, useEffect, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { reelData, reelCategories } from "@/lib/reelData";
import { lenisRef } from "@/components/SmoothScroll";
import FilmBendStrip from "./FilmBendStrip";

gsap.registerPlugin(ScrollTrigger);

const CATEGORIES = [
  { id: "all", label: "All" },
  ...reelCategories,
];

function getEmbedUrl(url) {
  return url.replace(/\/$/, "") + "/embed/";
}

export default function ReelShowcase() {
  const secRef = useRef(null);
  const headRef = useRef(null);
  const catRef = useRef(null);
  const infoRef = useRef(null);
  const [activeCat, setActiveCat] = useState("all");
  const [isMobile, setIsMobile] = useState(false);
  const [activeReel, setActiveReel] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const iframeRef = useRef(null);
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const filteredReels = activeCat === "all"
    ? reelData
    : reelData.filter((r) => r.category === activeCat);

  const getCatLabel = (catId) => {
    const found = reelCategories.find((c) => c.id === catId);
    return found ? found.label : catId;
  };

  const openModal = useCallback((reel) => {
    setActiveReel(reel);
    setModalOpen(true);
    document.body.style.overflow = "hidden";
    document.body.classList.add("hide-navbar");
    lenisRef.current?.stop();
  }, []);

  const closeModal = useCallback(() => {
    if (iframeRef.current) {
      try {
        iframeRef.current.contentWindow?.postMessage('{"action":"pause"}', "*");
      } catch { /* cross-origin */ }
    }
    setModalOpen(false);
    setActiveReel(null);
    document.body.style.overflow = "";
    document.body.classList.remove("hide-navbar");
    lenisRef.current?.start();
  }, []);

  useEffect(() => {
    if (!modalOpen) return;
    const onKey = (e) => { if (e.key === "Escape") closeModal(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [modalOpen, closeModal]);

  // Entrance animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headRef.current, {
        y: 40, opacity: 0, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: headRef.current, start: "top 82%" },
      });

      gsap.from(catRef.current?.children || [], {
        y: 16, opacity: 0, duration: 0.6, stagger: 0.04, ease: "power2.out",
        scrollTrigger: { trigger: catRef.current, start: "top 90%" },
      });

      if (infoRef.current) {
        gsap.from(infoRef.current, {
          y: 40, opacity: 0, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: infoRef.current, start: "top 82%" },
        });
      }
    }, secRef);
    return () => ctx.revert();
  }, []);

  // Category transition
  const switchCategory = useCallback((catId) => {
    if (catId === activeCat || transitioning) return;
    setTransitioning(true);
    setActiveCat(catId);

    if (infoRef.current) {
      gsap.to(infoRef.current, {
        opacity: 0, y: 12, duration: 0.3, ease: "power2.in",
        onComplete: () => {
          gsap.to(infoRef.current, {
            opacity: 1, y: 0, duration: 0.5, ease: "power2.out",
          });
          setTransitioning(false);
        },
      });
    } else {
      setTransitioning(false);
    }
  }, [activeCat, transitioning]);

  const displayReel = filteredReels[0];

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
        <div className="eyebrow-label" style={{ justifyContent: "center" }}>
          <span style={{ background: "rgba(247,230,204,0.45)", display: "block" }} />
          Full Showcase
          <span style={{ background: "rgba(247,230,204,0.45)", display: "block" }} />
        </div>
        <h2 className="section-heading" style={{ fontStyle: "italic" }}>
          Our Work
        </h2>
        <p style={{
          fontFamily: "var(--font-body)",
          fontSize: "clamp(14px, 1.3vw, 16px)",
          color: "rgba(247,230,204,0.5)",
          lineHeight: 1.75,
          maxWidth: 480,
          margin: "14px auto 0",
          fontWeight: 300,
        }}>
          Every reel is a love story, a celebration, a memory frozen in motion.
        </p>
      </div>


      {/* ── Film Bend Strip ── */}
      <div style={{
        maxWidth: 1100,
        margin: "0 auto",
        position: "relative",
        zIndex: 10,
        marginBottom: "clamp(24px, 3vw, 36px)",
      }}>
        <FilmBendStrip
          reels={filteredReels}
          onOpen={openModal}
          isMobile={isMobile}
          onSeeMore="/work"
        />
      </div>

      {/* ── Info panel (desktop only, clean: title + See More) ── */}
      {!isMobile && displayReel && (
        <div
          ref={infoRef}
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            position: "relative",
            zIndex: 10,
            textAlign: "center",
          }}
        >
          <h3 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(24px, 3vw, 34px)",
            fontWeight: 400,
            fontStyle: "italic",
            color: "var(--brand-cream)",
            lineHeight: 1.15,
            letterSpacing: "-0.01em",
            marginBottom: 20,
          }}>
            {displayReel.title}
          </h3>
          <Link
            href="/work"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "14px 32px",
              background: "transparent",
              color: "var(--brand-cream)",
              fontFamily: "var(--font-body)",
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              border: "1px solid rgba(212,184,150,0.25)",
              textDecoration: "none",
              cursor: "pointer",
              borderRadius: 0,
              transition: "all 0.35s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(212,184,150,0.55)";
              e.currentTarget.style.background = "rgba(212,184,150,0.06)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(212,184,150,0.25)";
              e.currentTarget.style.background = "transparent";
            }}
          >
            See More
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      )}

      {/* ── Modal — clean video only, no Instagram UI ── */}
      {modalOpen && activeReel && (
        <div
          className="reel-modal-overlay"
          onClick={closeModal}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 500,
            background: "rgba(10, 2, 3, 0.94)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "clamp(16px, 4vw, 40px)",
          }}
          role="dialog"
          aria-modal="true"
          aria-label={`Playing: ${activeReel.title}`}
        >
          <div
            className="reel-modal-panel"
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "relative",
              width: "100%",
              maxWidth: isMobile ? "100%" : 420,
              aspectRatio: "9/16",
              maxHeight: "80vh",
              borderRadius: 12,
              overflow: "hidden",
              background: "#0A0203",
              boxShadow: "0 40px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(212,184,150,0.1)",
            }}
          >
            {/* Close button */}
            <button
              onClick={closeModal}
              aria-label="Close"
              style={{
                position: "absolute",
                top: 10,
                right: 10,
                zIndex: 20,
                width: 34,
                height: 34,
                borderRadius: "50%",
                background: "rgba(10,2,3,0.65)",
                border: "1px solid rgba(212,184,150,0.2)",
                color: "var(--brand-cream)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.3s ease",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(10,2,3,0.9)";
                e.currentTarget.style.borderColor = "rgba(212,184,150,0.45)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(10,2,3,0.65)";
                e.currentTarget.style.borderColor = "rgba(212,184,150,0.2)";
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            {/* Clean iframe — no title overlay, no extra UI */}
            <iframe
              ref={iframeRef}
              src={getEmbedUrl(activeReel.embedUrl)}
              title={activeReel.title}
              style={{
                width: "100%",
                height: "100%",
                border: "none",
                position: "absolute",
                inset: 0,
                opacity: 1,
              }}
              allow="autoplay; fullscreen"
              allowFullScreen
            />
            
            {/* Fallback button if iframe fails to load */}
            <a
              href={activeReel.embedUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                position: "absolute", bottom: -40, left: "50%",
                transform: "translateX(-50%)", zIndex: 10,
                color: "var(--brand-gold)", fontSize: 12, textDecoration: "underline",
                fontFamily: "var(--font-body)", whiteSpace: "nowrap",
                opacity: 0.8
              }}
            >
              Watch directly on Instagram ↗
            </a>
          </div>
        </div>
      )}
    </section>
  );
}
