"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { reelData, reelCategories } from "@/lib/reelData";
import { lenisRef } from "@/components/SmoothScroll";

gsap.registerPlugin(ScrollTrigger);

const CATEGORIES = [
  { id: "all", label: "All" },
  ...reelCategories,
];

function getEmbedUrl(url) {
  return url.replace(/\/$/, "") + "/embed/";
}

function DesktopDraggableRow({ cat, catReels, openModal }) {
  const rowRef = useRef(null);
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragDistance = useRef(0);

  const handleMouseDown = (e) => {
    if (e.button !== 0 || !rowRef.current) return;
    isDown.current = true;
    dragDistance.current = 0;
    startX.current = e.pageX - rowRef.current.offsetLeft;
    scrollLeft.current = rowRef.current.scrollLeft;

    const onMouseMove = (moveEvent) => {
      if (!isDown.current || !rowRef.current) return;
      const x = moveEvent.pageX - rowRef.current.offsetLeft;
      const walk = (x - startX.current) * 1.35;
      dragDistance.current = Math.abs(walk);
      if (Math.abs(walk) > 4) {
        setIsDragging(true);
        rowRef.current.scrollLeft = scrollLeft.current - walk;
      }
    };

    const onMouseUp = () => {
      isDown.current = false;
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      setTimeout(() => {
        setIsDragging(false);
        dragDistance.current = 0;
      }, 60);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  const handleCardClick = (item) => {
    if (dragDistance.current > 5) return;
    openModal(item);
  };

  const scrollByAmount = (direction) => {
    if (rowRef.current) {
      const scrollAmt = rowRef.current.clientWidth * 0.72;
      rowRef.current.scrollBy({ left: direction * scrollAmt, behavior: "smooth" });
    }
  };

  return (
    <div id={`cat-${cat.id}`} data-cat-id={cat.id} data-cat-label={cat.label}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20, padding: "0 clamp(16px, 4vw, 48px)" }}>
        <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(32px, 3.5vw, 42px)", fontWeight: 400, fontStyle: "italic", margin: 0, color: "var(--brand-cream)", letterSpacing: "0.02em" }}>
          {cat.label}
        </h3>
        <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, rgba(212,184,150,0.3) 0%, transparent 100%)" }} />
        
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {catReels.length > 4 && (
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "rgba(212,184,150,0.45)", letterSpacing: "0.12em", textTransform: "uppercase" }}>
              Drag to view all
            </span>
          )}
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "rgba(212,184,150,0.6)", textTransform: "uppercase", letterSpacing: "0.15em" }}>
            {catReels.length} Reels
          </span>
          {catReels.length > 4 && (
            <div style={{ display: "flex", gap: 6, marginLeft: 6 }}>
              <button
                type="button"
                onClick={() => scrollByAmount(-1)}
                aria-label="Previous reels"
                style={{
                  width: 32, height: 32, borderRadius: "50%",
                  background: "rgba(212,184,150,0.06)", border: "1px solid rgba(212,184,150,0.2)",
                  color: "var(--brand-cream)", display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: "pointer", transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(212,184,150,0.18)"; e.currentTarget.style.borderColor = "var(--brand-gold)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(212,184,150,0.06)"; e.currentTarget.style.borderColor = "rgba(212,184,150,0.2)"; }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => scrollByAmount(1)}
                aria-label="Next reels"
                style={{
                  width: 32, height: 32, borderRadius: "50%",
                  background: "rgba(212,184,150,0.06)", border: "1px solid rgba(212,184,150,0.2)",
                  color: "var(--brand-cream)", display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: "pointer", transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(212,184,150,0.18)"; e.currentTarget.style.borderColor = "var(--brand-gold)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(212,184,150,0.06)"; e.currentTarget.style.borderColor = "rgba(212,184,150,0.2)"; }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Drag Strip Container */}
      <div
        ref={rowRef}
        onMouseDown={handleMouseDown}
        className="reel-drag-strip"
        style={{
          display: "flex",
          gap: 20,
          overflowX: "auto",
          overflowY: "hidden",
          padding: "8px clamp(16px, 4vw, 48px) 24px",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch",
          cursor: isDragging ? "grabbing" : "grab",
          userSelect: "none",
          WebkitUserSelect: "none",
        }}
      >
        <style>{`.reel-drag-strip::-webkit-scrollbar { display: none; }`}</style>
        {catReels.map((item) => (
          <article
            key={item.id}
            className="work-card"
            onClick={() => handleCardClick(item)}
            role="button"
            tabIndex={0}
            aria-label={`Watch ${item.title}`}
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openModal(item); } }}
            style={{
              flex: "0 0 calc((100% - 60px) / 4)",
              minWidth: 240,
              maxWidth: 285,
              position: "relative",
              aspectRatio: "9/16",
              borderRadius: 12,
              overflow: "hidden",
              cursor: isDragging ? "grabbing" : "pointer",
              background: "var(--brand-maroon-dark)",
              border: "1px solid rgba(212,184,150,0.12)",
              transition: isDragging ? "none" : "transform 0.5s cubic-bezier(0.23,1,0.32,1), border-color 0.5s ease",
            }}
            onMouseEnter={(e) => {
              if (isDragging) return;
              e.currentTarget.style.transform = "scale(1.02)";
              e.currentTarget.style.borderColor = "rgba(212,184,150,0.35)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.borderColor = "rgba(212,184,150,0.12)";
            }}
          >
            <img
              src={item.poster}
              alt={`${item.title} — ${item.category} wedding reel for ${item.couple} (${item.location}) by Shaadi Pitara`}
              loading="lazy"
              decoding="async"
              draggable={false}
              style={{
                width: "100%", height: "100%",
                objectFit: "cover",
                pointerEvents: "none",
                userSelect: "none",
                WebkitUserDrag: "none",
                transition: "transform 0.7s cubic-bezier(0.23,1,0.32,1)",
              }}
            />
            
            {/* Duration */}
            <div style={{
              position: "absolute", top: 14, right: 14,
              zIndex: 5, pointerEvents: "none",
              fontFamily: "var(--font-mono)", fontSize: 10,
              letterSpacing: "0.15em",
              color: "rgba(245,230,204,0.85)",
              background: "rgba(26,5,7,0.72)",
              backdropFilter: "blur(6px)",
              padding: "4px 10px",
              borderRadius: 4,
              border: "1px solid rgba(212,184,150,0.2)",
            }}>
              {item.duration}
            </div>

            {/* Centered Play Triangle Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                if (dragDistance.current > 5) return;
                openModal(item);
              }}
              aria-label={`Play ${item.title}`}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 52,
                height: 52,
                borderRadius: "50%",
                background: "rgba(10, 2, 3, 0.65)",
                border: "1.5px solid rgba(212, 184, 150, 0.7)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 6,
                cursor: "pointer",
                transition: "transform 0.3s ease, border-color 0.3s ease, background 0.3s ease",
              }}
              className="card-play-btn"
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translate(-50%, -50%) scale(1.1)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "translate(-50%, -50%) scale(1)"; }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="var(--brand-cream)" style={{ marginLeft: 2 }}>
                <polygon points="6 3 20 12 6 21 6 3" />
              </svg>
            </button>

            {/* Title + category */}
            <div style={{
              position: "absolute", bottom: 0, left: 0, right: 0,
              padding: 24, zIndex: 3, pointerEvents: "none",
            }}>
              <div style={{
                fontFamily: "var(--font-mono)", fontSize: 10,
                letterSpacing: "0.25em", textTransform: "uppercase",
                color: "var(--brand-gold)", marginBottom: 6,
                textShadow: "0 2px 8px rgba(0,0,0,0.9), 0 0 3px rgba(0,0,0,0.95)",
              }}>
                {cat.label}
              </div>
              <div style={{
                fontFamily: "var(--font-display)", fontSize: 20,
                fontWeight: 600, color: "var(--brand-cream)", lineHeight: 1.2,
                textShadow: "0 2px 10px rgba(0,0,0,0.95), 0 0 4px rgba(0,0,0,1)",
              }}>
                {item.title}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default function WorkPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [activeReel, setActiveReel] = useState(null);
  const [activeReelIndex, setActiveReelIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const tabsRef = useRef({});
  const secRef = useRef(null);
  const iframeRef = useRef(null);

  const filteredItems =
    activeTab === "all"
      ? reelData
      : reelData.filter((item) => item.category === activeTab);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Keep browser tab title as Our Works
  useEffect(() => {
    document.title = "Our Works — Shaadi Pitara | Cinematic Wedding Reels";
  }, []);

  useEffect(() => {
    const currentTabEl = tabsRef.current[activeTab];
    if (currentTabEl) {
      setIndicatorStyle({
        left: currentTabEl.offsetLeft,
        width: currentTabEl.offsetWidth,
      });
    }
  }, [activeTab]);

  const openModal = (reel) => {
    const idx = filteredItems.findIndex((r) => r.id === reel.id);
    setActiveReelIndex(idx >= 0 ? idx : 0);
    setActiveReel(reel);
    setModalOpen(true);
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    document.body.style.touchAction = "none";
    document.body.classList.add("hide-navbar");
    if (typeof window !== "undefined") window.__lenis?.stop();
    lenisRef.current?.stop();
  };

  const navigateModal = (dir) => {
    const next = (activeReelIndex + dir + filteredItems.length) % filteredItems.length;
    setActiveReelIndex(next);
    setActiveReel(filteredItems[next]);
  };

  const closeModal = () => {
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
  };

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
    const onKey = (e) => {
      if (e.key === "Escape" && modalOpen) closeModal();
      if (e.key === "ArrowLeft" && modalOpen) navigateModal(-1);
      if (e.key === "ArrowRight" && modalOpen) navigateModal(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [modalOpen, activeReelIndex]);

  // Entrance animations
  useEffect(() => {
    const ctx = gsap.context(() => {

      gsap.utils.toArray(".work-card").forEach((card, i) => {
        gsap.from(card, {
          y: 30, opacity: 0, duration: 0.7, ease: "power3.out",
          delay: (i % 6) * 0.05,
          scrollTrigger: { trigger: card, start: "top 90%" },
        });
      });
    }, secRef);
    return () => ctx.revert();
  }, [activeTab]);

  return (
    <div
      ref={secRef}
      className="work-section"
      style={{
        minHeight: "100vh",
        background: "var(--brand-maroon-dark)",
        color: "var(--brand-cream)",
        paddingTop: 1,
        position: "relative",
      }}
    >
      {/* Texture overlay matching Contact, Review & Footer */}
      <div aria-hidden="true" style={{
        position: "fixed", inset: 0, pointerEvents: "none", zIndex: 1, opacity: 0.04,
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 160 160' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
      }} />

      <Link href="/#reels" style={{
        position: "absolute", top: "clamp(20px, 4vw, 32px)", left: "clamp(16px, 4vw, 32px)", zIndex: 50,
        display: "inline-flex", alignItems: "center", gap: 8,
        color: "rgba(247,230,204,0.7)", fontFamily: "var(--font-mono)",
        fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase",
        textDecoration: "none", transition: "color 0.3s ease"
      }}
      onMouseEnter={(e) => e.currentTarget.style.color = "var(--brand-gold)"}
      onMouseLeave={(e) => e.currentTarget.style.color = "rgba(247,230,204,0.7)"}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        Back
      </Link>


      {/* Section header */}
      <div
        style={{
          padding: "clamp(48px, 7vw, 80px) clamp(16px, 4vw, 48px)",
          textAlign: "center",
          borderBottom: "1px solid rgba(212,184,150,0.06)",
        }}
      >
        <div className="eyebrow-label" style={{ justifyContent: "center" }}>
          Full Showcase
        </div>
        <h1 className="c-heading" style={{ margin: "14px 0 12px" }}>
          Our <i>Works</i>
        </h1>
        <p style={{
          fontFamily: "var(--font-body)",
          fontSize: "clamp(15px, 1.5vw, 17px)",
          color: "rgba(245,230,204,0.45)",
          marginTop: 16,
          maxWidth: 520,
          margin: "16px auto 0",
          lineHeight: 1.7,
        }}>
          Every reel is a love story, a celebration, a memory frozen in motion. Browse by category and click to watch.
        </p>
      </div>

      {/* Work grid */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "clamp(32px, 5vw, 56px) 0" }}>
        {isMobile ? (
          // Mobile Layout: Stacked Category Sections
          <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
            {reelCategories.map((cat) => {
              const catReels = reelData.filter((r) => r.category === cat.id);
              if (catReels.length === 0) return null;
              return (
                <div key={cat.id} id={`cat-mobile-${cat.id}`} data-cat-id={cat.id} data-cat-label={cat.label}>
                  {/* Header */}
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16, padding: "0 16px" }}>
                    <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(24px, 6vw, 32px)", fontWeight: 400, fontStyle: "italic", margin: 0, color: "var(--brand-cream)", letterSpacing: "0.02em" }}>
                      {cat.label}
                    </h3>
                    <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, rgba(212,184,150,0.3) 0%, transparent 100%)" }} />
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "rgba(212,184,150,0.5)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                      {catReels.length} Reels
                    </span>
                  </div>
                  {/* Strip */}
                  <div style={{
                    display: "flex", gap: 8, overflowX: "auto", padding: "0 16px",
                    scrollbarWidth: "none", msOverflowStyle: "none", WebkitOverflowScrolling: "touch",
                  }} className="cat-scroll">
                    <style>{`.cat-scroll::-webkit-scrollbar { display: none; }`}</style>
                    {catReels.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => openModal(item)}
                        style={{
                          flexShrink: 0, width: 80, aspectRatio: "9/16", borderRadius: 8,
                          background: "var(--brand-maroon-dark)", position: "relative",
                          overflow: "hidden", cursor: "pointer", border: "1px solid rgba(212,184,150,0.15)",
                        }}
                      >
                        <img src={item.poster} alt={`${item.title} — ${item.category} wedding reel for ${item.couple} by Shaadi Pitara`} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        {/* Play button */}
                        <button
                          type="button"
                          onClick={(e) => { e.stopPropagation(); openModal(item); }}
                          aria-label={`Play ${item.title}`}
                          style={{
                            position: "absolute", top: "50%", left: "50%",
                            transform: "translate(-50%,-50%)", zIndex: 6,
                            width: 30, height: 30, borderRadius: "50%",
                            background: "rgba(10,2,3,0.72)", backdropFilter: "blur(4px)",
                            border: "1.5px solid rgba(212,184,150,0.6)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            cursor: "pointer",
                          }}
                        >
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="var(--brand-cream)" style={{ marginLeft: 1 }}>
                            <polygon points="6 3 20 12 6 21 6 3" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 64 }}>
            {reelCategories.map((cat) => {
              const catReels = reelData.filter((r) => r.category === cat.id);
              if (catReels.length === 0) return null;
              return (
                <DesktopDraggableRow
                  key={cat.id}
                  cat={cat}
                  catReels={catReels}
                  openModal={openModal}
                />
              );
            })}
          </div>
        )}

        {/* See More → Work page link */}
        <div style={{
          textAlign: "center",
          marginTop: "clamp(32px, 4vw, 48px)",
        }}>
          <a
            href="https://www.instagram.com/shaadi.pitara/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              padding: "16px 36px",
              background: "transparent",
              border: "1px solid rgba(212,184,150,0.25)",
              color: "var(--brand-cream)",
              fontFamily: "var(--font-mono)", fontSize: 11,
              letterSpacing: "0.25em", textTransform: "uppercase",
              textDecoration: "none", cursor: "pointer",
              transition: "all 0.3s ease",
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
            See More on Instagram
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>

      {/* ─── MODAL ─── */}
      {modalOpen && activeReel && (
        <div
          onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
          role="dialog"
          aria-modal="true"
          aria-label={`${activeReel.title} — ${activeReel.category}`}
          style={{
            position: "fixed", inset: 0, zIndex: 99999,
            background: "rgba(5, 1, 2, 0.97)",
            backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: isMobile ? "8px 12px" : "clamp(20px, 4vw, 48px)",
            touchAction: "none",
          }}
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
                    {reelCategories.find((c) => c.id === activeReel.category)?.label}
                  </span>
                  <span style={{ color: "rgba(212,184,150,0.3)", fontSize: 9 }}>•</span>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "rgba(212,184,150,0.6)", letterSpacing: "0.1em" }}>
                    {String(activeReelIndex + 1).padStart(2, "0")}/{String(filteredItems.length).padStart(2, "0")}
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

            {/* Iframe panel */}
            <div style={{
              position: "relative", flexShrink: 0,
              width: isMobile ? "100%" : "min(360px, 38vw)",
              height: isMobile ? "clamp(340px, 58svh, 480px)" : "auto",
              aspectRatio: isMobile ? "auto" : "9/16",
              maxHeight: isMobile ? "58svh" : "80vh",
              borderRadius: isMobile ? 0 : 16,
              overflow: "hidden", background: "#000",
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
                  {String(activeReelIndex + 1).padStart(2, "0")} / {String(filteredItems.length).padStart(2, "0")}
                </div>
              )}

              {!isMobile && (
                <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 16, padding: "5px 14px", background: "rgba(212,184,150,0.07)", border: "1px solid rgba(212,184,150,0.18)", borderRadius: 100, alignSelf: "flex-start" }}>
                  <div style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--brand-gold)" }} />
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--brand-gold)" }}>
                    {reelCategories.find((c) => c.id === activeReel.category)?.label}
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
    </div>
  );
}
