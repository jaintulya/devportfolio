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
    document.body.style.overflow = "hidden";
    document.body.classList.add("hide-navbar");
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
    document.body.style.overflow = "";
    document.body.classList.remove("hide-navbar");
    lenisRef.current?.start();
  };

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
        color: "var(--brand-cream)",
        paddingTop: 1,
      }}
    >
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
        <h1 className="section-heading" style={{ marginTop: 12, fontStyle: "italic" }}>
          Our Work
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
                <div key={cat.id}>
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
                        <img src={item.poster} alt={item.title} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        <div style={{
                          position: "absolute", inset: 0,
                          background: "linear-gradient(to top, rgba(46,10,13,0.7) 0%, transparent 50%)",
                          zIndex: 2, pointerEvents: "none",
                        }} />
                        {/* Play button */}
                        <div style={{
                          position: "absolute", top: "50%", left: "50%",
                          transform: "translate(-50%,-50%)", zIndex: 4,
                          width: 28, height: 28, borderRadius: "50%",
                          background: "rgba(46,10,13,0.6)", backdropFilter: "blur(4px)",
                          border: "1px solid rgba(212,184,150,0.4)",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          pointerEvents: "none",
                        }}>
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="var(--brand-cream)">
                            <polygon points="5 3 19 12 5 21 5 3" />
                          </svg>
                        </div>
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
                <div key={cat.id}>
                  {/* Header */}
                  <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24, padding: "0 clamp(16px, 4vw, 48px)" }}>
                    <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(32px, 3.5vw, 42px)", fontWeight: 400, fontStyle: "italic", margin: 0, color: "var(--brand-cream)", letterSpacing: "0.02em" }}>
                      {cat.label}
                    </h3>
                    <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, rgba(212,184,150,0.3) 0%, transparent 100%)" }} />
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "rgba(212,184,150,0.5)", textTransform: "uppercase", letterSpacing: "0.15em" }}>
                      {catReels.length} Reels
                    </span>
                  </div>
                  {/* Desktop Grid Wrapper */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                      gap: 24,
                      padding: "0 clamp(16px, 4vw, 48px)"
                    }}
                  >
                    {catReels.map((item) => (
                      <article
                        key={item.id}
                        className="work-card"
                        onClick={() => openModal(item)}
                        role="button"
                        tabIndex={0}
                        aria-label={`Watch ${item.title}`}
                        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openModal(item); } }}
                        style={{
                          position: "relative",
                          aspectRatio: "9/16",
                          borderRadius: 12,
                          overflow: "hidden",
                          cursor: "pointer",
                          background: "var(--brand-maroon-dark)",
                          border: "1px solid rgba(212,184,150,0.08)",
                          transition: "all 0.5s cubic-bezier(0.23,1,0.32,1)",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = "scale(1.02)";
                          e.currentTarget.style.borderColor = "rgba(212,184,150,0.3)";
                          e.currentTarget.style.boxShadow = "0 24px 56px rgba(0,0,0,0.35)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = "scale(1)";
                          e.currentTarget.style.borderColor = "rgba(212,184,150,0.08)";
                          e.currentTarget.style.boxShadow = "none";
                        }}
                      >
                        <img
                          src={item.poster}
                          alt={item.title}
                          loading="lazy"
                          decoding="async"
                          style={{
                            width: "100%", height: "100%",
                            objectFit: "cover",
                            transition: "transform 0.7s cubic-bezier(0.23,1,0.32,1)",
                          }}
                        />
                        <div style={{
                          position: "absolute", inset: 0,
                          background: "linear-gradient(to top, rgba(46,10,13,0.95) 0%, rgba(46,10,13,0.35) 45%, rgba(46,10,13,0.02) 100%)",
                          zIndex: 2, pointerEvents: "none",
                        }} />
                        {/* Duration */}
                        <div style={{
                          position: "absolute", top: 14, right: 14,
                          zIndex: 5, pointerEvents: "none",
                          fontFamily: "var(--font-mono)", fontSize: 10,
                          letterSpacing: "0.15em",
                          color: "rgba(245,230,204,0.7)",
                          background: "rgba(46,10,13,0.6)",
                          backdropFilter: "blur(6px)",
                          padding: "4px 10px",
                          borderRadius: 4,
                          border: "1px solid rgba(212,184,150,0.15)",
                        }}>
                          {item.duration}
                        </div>
                        {/* Play button */}
                        <div style={{
                          position: "absolute", top: "50%", left: "50%",
                          transform: "translate(-50%,-50%)",
                          zIndex: 4,
                          width: 48, height: 48,
                          borderRadius: "50%",
                          background: "rgba(46,10,13,0.55)",
                          backdropFilter: "blur(8px)",
                          border: "1.5px solid rgba(212,184,150,0.45)",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          pointerEvents: "none",
                        }}>
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="var(--brand-cream)">
                            <polygon points="5 3 19 12 5 21 5 3" />
                          </svg>
                        </div>
                        {/* Title + category */}
                        <div style={{
                          position: "absolute", bottom: 0, left: 0, right: 0,
                          padding: 24, zIndex: 3, pointerEvents: "none",
                        }}>
                          <div style={{
                            fontFamily: "var(--font-mono)", fontSize: 10,
                            letterSpacing: "0.25em", textTransform: "uppercase",
                            color: "var(--brand-gold)", marginBottom: 8,
                          }}>
                            {cat.label}
                          </div>
                          <div style={{
                            fontFamily: "var(--font-display)", fontSize: 20,
                            fontWeight: 600, color: "var(--brand-cream)", lineHeight: 1.2,
                          }}>
                            {item.title}
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* See More → Work page link */}
        <div style={{
          textAlign: "center",
          marginTop: "clamp(32px, 4vw, 48px)",
        }}>
          <Link
            href="/"
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
      </div>

      {/* ─── MODAL ─── */}
      {modalOpen && activeReel && (
        <div
          onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
          role="dialog"
          aria-modal="true"
          aria-label={`${activeReel.title} — ${activeReel.category}`}
          style={{
            position: "fixed", inset: 0, zIndex: 500,
            background: "rgba(8, 1, 2, 0.96)",
            backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: isMobile ? "0" : "clamp(20px, 4vw, 48px)",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              display: "flex", alignItems: "center",
              gap: isMobile ? 0 : 48, width: "100%",
              maxWidth: isMobile ? "100vw" : 900,
              maxHeight: "90vh",
              flexDirection: isMobile ? "column" : "row",
            }}
          >
            {/* Iframe panel */}
            <div style={{
              position: "relative", flexShrink: 0,
              width: isMobile ? "100vw" : "min(380px, 42vw)",
              aspectRatio: "9/16",
              maxHeight: isMobile ? "100vh" : "85vh",
              borderRadius: isMobile ? 0 : 16,
              overflow: "hidden", background: "#0A0203",
              boxShadow: isMobile ? "none" : "0 40px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(212,184,150,0.12)",
            }}>
              <iframe
                ref={iframeRef}
                key={activeReel.id}
                src={getEmbedUrl(activeReel.embedUrl)}
                title={activeReel.title}
                style={{ width: "100%", height: "100%", border: "none", position: "absolute", inset: 0 }}
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen scrolling="yes"
              />
              {isMobile && (
                <button onClick={closeModal} style={{
                  position: "absolute", top: 14, right: 14, zIndex: 20,
                  width: 36, height: 36, borderRadius: "50%",
                  background: "rgba(10,2,3,0.7)", border: "1px solid rgba(212,184,150,0.25)",
                  color: "var(--brand-cream)", cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M18 6L6 18M6 6l12 12" /></svg>
                </button>
              )}
            </div>

            {/* Desktop info panel */}
            {!isMobile && (
              <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
                <button onClick={closeModal} style={{
                  alignSelf: "flex-end", marginBottom: 28,
                  width: 38, height: 38, borderRadius: "50%",
                  background: "rgba(212,184,150,0.06)", border: "1px solid rgba(212,184,150,0.18)",
                  color: "var(--brand-cream)", cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M18 6L6 18M6 6l12 12" /></svg>
                </button>

                <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.3em", color: "rgba(212,184,150,0.4)", marginBottom: 20, textTransform: "uppercase" }}>
                  {String(activeReelIndex + 1).padStart(2, "0")} / {String(filteredItems.length).padStart(2, "0")}
                </div>

                <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 16, padding: "5px 14px", background: "rgba(212,184,150,0.07)", border: "1px solid rgba(212,184,150,0.18)", borderRadius: 100 }}>
                  <div style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--brand-gold)" }} />
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--brand-gold)" }}>
                    {reelCategories.find((c) => c.id === activeReel.category)?.label}
                  </span>
                </div>

                <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(28px, 3.5vw, 42px)", fontWeight: 400, fontStyle: "italic", color: "var(--brand-cream)", lineHeight: 1.1, letterSpacing: "-0.02em", margin: 0 }}>
                  {activeReel.title}
                </h2>

                <div style={{ display: "flex", gap: 24, marginTop: 20, marginBottom: 28, flexWrap: "wrap" }}>
                  <div><div style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(212,184,150,0.45)", marginBottom: 4 }}>Duration</div><div style={{ fontFamily: "var(--font-mono)", fontSize: 14, color: "var(--brand-gold)", fontWeight: 600 }}>{activeReel.duration}</div></div>
                </div>

                <div style={{ width: "100%", height: 1, background: "rgba(212,184,150,0.1)", marginBottom: 28 }} />

                <div style={{ display: "flex", gap: 12 }}>
                  <button onClick={() => navigateModal(-1)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 24px", background: "rgba(212,184,150,0.06)", border: "1px solid rgba(212,184,150,0.18)", color: "var(--brand-cream)", fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", cursor: "pointer", borderRadius: 4, transition: "all 0.25s ease" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
                    Prev
                  </button>
                  <button onClick={() => navigateModal(1)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 24px", background: "rgba(212,184,150,0.06)", border: "1px solid rgba(212,184,150,0.18)", color: "var(--brand-cream)", fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", cursor: "pointer", borderRadius: 4, transition: "all 0.25s ease" }}>
                    Next
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                  </button>
                </div>

                <a href={activeReel.embedUrl} target="_blank" rel="noopener noreferrer" style={{ marginTop: 20, color: "rgba(212,184,150,0.4)", fontSize: 11, fontFamily: "var(--font-body)", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6 }}>
                  View on Instagram
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" /></svg>
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
