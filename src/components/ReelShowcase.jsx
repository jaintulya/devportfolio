"use client";
import { useRef, useEffect, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { reelData, reelCategories } from "@/lib/reelData";
import { reelStories } from "@/lib/reelStories";

gsap.registerPlugin(ScrollTrigger);

function getEmbedUrl(url) {
  return url.replace(/\/$/, "") + "/embed/?autoplay=true&muted=1";
}

const TEASER_CATEGORIES = ["editorial", "emotional", "joyful", "decor", "transition", "moment"];

export default function ReelShowcase() {
  const secRef = useRef(null);
  const headRef = useRef(null);
  const [activeReel, setActiveReel] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Responsive check
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Build a flat ordered list of teaser reels for navigation
  const teaserReels = TEASER_CATEGORIES.map((catId) => {
    const cat = reelCategories.find((c) => c.id === catId);
    const reel = reelData.find((r) => r.category === catId);
    return { ...reel, categoryLabel: cat?.label || catId };
  }).filter(Boolean);

  // Get story copy for current reel
  const getStory = (reel) => {
    if (!reel) return "";
    return reelStories[reel.id] || reelStories[reel.category] || "";
  };

  const openModal = useCallback((reel, index) => {
    setActiveReel(reel);
    setCurrentIndex(index);
    setModalOpen(true);
    setIsLoading(true);
    document.body.style.overflow = "hidden";
  }, []);

  const closeModal = useCallback(() => {
    setModalOpen(false);
    setActiveReel(null);
    document.body.style.overflow = "";
  }, []);

  const navigateReel = useCallback((direction) => {
    const newIndex = (currentIndex + direction + teaserReels.length) % teaserReels.length;
    const newReel = teaserReels[newIndex];
    if (newReel) {
      setCurrentIndex(newIndex);
      setActiveReel(newReel);
      setIsLoading(true);
    }
  }, [currentIndex, teaserReels]);

  // Keyboard handler
  useEffect(() => {
    const onKey = (e) => {
      if (!modalOpen) return;
      if (e.key === "Escape") { closeModal(); return; }
      if (e.key === "ArrowRight") { e.preventDefault(); navigateReel(1); }
      if (e.key === "ArrowLeft") { e.preventDefault(); navigateReel(-1); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [modalOpen, closeModal, navigateReel]);

  // Entrance animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headRef.current, {
        y: 50, opacity: 0, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: headRef.current, start: "top 80%" },
      });

      gsap.utils.toArray(".reel-teaser-card").forEach((card, i) => {
        gsap.from(card, {
          y: 50, opacity: 0, duration: 0.9, ease: "power3.out",
          delay: i * 0.08,
          scrollTrigger: { trigger: card, start: "top 88%" },
        });
      });
    }, secRef);
    return () => ctx.revert();
  }, []);

  // Modal open/close animation
  useEffect(() => {
    if (modalOpen) {
      gsap.fromTo(".reel-viewer-backdrop",
        { opacity: 0 },
        { opacity: 1, duration: 0.4, ease: "power2.out" }
      );
      gsap.fromTo(".reel-viewer-panel",
        { opacity: 0, y: 30, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "power3.out", delay: 0.05 }
      );
    }
  }, [modalOpen, currentIndex]);

  const handleClose = useCallback(() => {
    gsap.to(".reel-viewer-panel", {
      opacity: 0, y: 20, scale: 0.98,
      duration: 0.25, ease: "power2.in",
    });
    gsap.to(".reel-viewer-backdrop", {
      opacity: 0, duration: 0.3, ease: "power2.in",
      onComplete: closeModal,
    });
  }, [closeModal]);

  const story = activeReel ? getStory(activeReel) : "";

  return (
    <section
      id="reels"
      ref={secRef}
      aria-label="Featured Work"
      style={{
        padding: "clamp(80px, 10vw, 140px) clamp(16px, 4vw, 48px)",
        background: "var(--brand-maroon-dark)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Dot texture */}
      <div aria-hidden="true" style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: `radial-gradient(rgba(200, 155, 93, 0.05) 1px, transparent 1px)`,
        backgroundSize: "32px 32px",
      }} />

      {/* Warm glow */}
      <div aria-hidden="true" style={{
        position: "absolute", top: "-15%", right: "-10%",
        width: 600, height: 600, borderRadius: "50%",
        background: "radial-gradient(ellipse, rgba(200,155,93,0.04) 0%, transparent 70%)",
        filter: "blur(60px)", pointerEvents: "none",
      }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 2 }}>
        {/* Header */}
        <div ref={headRef} style={{ textAlign: "center", marginBottom: "clamp(48px, 7vw, 80px)" }}>
          <div className="eyebrow-label" style={{ justifyContent: "center" }}>
            Featured Work
          </div>
          <h2 className="section-heading">Our Reels</h2>
          <p style={{
            fontFamily: "var(--font-body)",
            fontSize: "clamp(15px, 1.5vw, 17px)",
            color: "rgba(245,230,204,0.45)",
            marginTop: 16,
            maxWidth: 480,
            margin: "16px auto 0",
            lineHeight: 1.7,
          }}>
            A curated glimpse into the stories we&apos;ve had the privilege of telling across India.
          </p>
        </div>

        {/* Teaser grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: 20,
          marginBottom: 56,
        }}>
          {teaserReels.map((reel, i) => (
            <article
              key={reel.id}
              className="reel-teaser-card"
              onClick={() => reel && openModal(reel, i)}
              role="button"
              tabIndex={0}
              aria-label={`Watch ${reel.title} — ${reel.categoryLabel}`}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openModal(reel, i); } }}
              style={{
                position: "relative",
                aspectRatio: "9/16",
                borderRadius: 12,
                overflow: "hidden",
                cursor: "pointer",
                background: "var(--brand-maroon-dark)",
                border: "1px solid rgba(200,155,93,0.08)",
                transition: "all 0.5s cubic-bezier(0.23,1,0.32,1)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.015)";
                e.currentTarget.style.borderColor = "rgba(200,155,93,0.3)";
                e.currentTarget.style.boxShadow = "0 24px 56px rgba(0,0,0,0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.borderColor = "rgba(200,155,93,0.08)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <img
                src={reel.poster}
                alt={`${reel.title} — ${reel.categoryLabel}`}
                loading="lazy"
                decoding="async"
                style={{
                  width: "100%", height: "100%",
                  objectFit: "cover",
                  transition: "transform 0.7s cubic-bezier(0.23,1,0.32,1), opacity 0.5s ease",
                }}
              />
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(to top, rgba(46,10,13,0.95) 0%, rgba(46,10,13,0.4) 45%, rgba(46,10,13,0.02) 100%)",
                zIndex: 2, pointerEvents: "none",
              }} />
              <div style={{
                position: "absolute", top: 14, right: 14,
                zIndex: 5, pointerEvents: "none",
                fontFamily: "var(--font-mono)", fontSize: 9,
                letterSpacing: "0.15em",
                color: "rgba(245,230,204,0.7)",
                background: "rgba(46,10,13,0.6)",
                backdropFilter: "blur(6px)",
                padding: "4px 10px",
                borderRadius: 4,
                border: "1px solid rgba(200,155,93,0.15)",
              }}>
                {reel.duration}
              </div>
              <div className="reel-card-play" style={{ opacity: 0.7 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="var(--brand-cream)">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              </div>
              <div className="reel-card-info">
                <div className="reel-card-category">{reel.categoryLabel}</div>
                <div className="reel-card-title">{reel.title}</div>
              </div>
            </article>
          ))}
        </div>

        {/* View All Work link */}
        <div style={{ textAlign: "center" }}>
          <Link
            href="/work"
            className="btn-secondary"
            style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              padding: "14px 32px",
              background: "transparent",
              color: "var(--brand-cream)",
              fontFamily: "var(--font-mono)",
              fontSize: 10, letterSpacing: "0.22em",
              textTransform: "uppercase",
              border: "1px solid rgba(245,230,204,0.25)",
              borderRadius: 4,
              textDecoration: "none",
              transition: "all 0.35s cubic-bezier(0.23,1,0.32,1)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--brand-gold)";
              e.currentTarget.style.background = "rgba(200,155,93,0.08)";
              e.currentTarget.style.color = "var(--brand-gold-light)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(245,230,204,0.25)";
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "var(--brand-cream)";
            }}
          >
            View All Work
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          CINEMATIC REEL VIEWER MODAL
         ══════════════════════════════════════════════════════════════ */}
      {modalOpen && activeReel && (
        <div
          className="reel-viewer-backdrop"
          onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
          style={{
            position: "fixed", inset: 0, zIndex: 1000,
            // Heavy blur + dark burgundy overlay — website visible behind
            backdropFilter: "blur(24px) saturate(0.4)",
            WebkitBackdropFilter: "blur(24px) saturate(0.4)",
            background: "rgba(26, 5, 7, 0.72)",
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: "clamp(16px, 3vw, 32px)",
            opacity: 1,
          }}
          role="dialog"
          aria-modal="true"
          aria-label={`${activeReel.title} — ${activeReel.categoryLabel}`}
        >
          <div
            className="reel-viewer-panel"
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "relative",
              width: "100%",
              maxWidth: isMobile ? 400 : 960,
              height: isMobile ? "auto" : "82vh",
              maxHeight: isMobile ? "92vh" : "82vh",
              background: "linear-gradient(165deg, #2E0A0D 0%, #1A0507 50%, #140406 100%)",
              borderRadius: isMobile ? 24 : 20,
              overflow: "hidden",
              border: "1px solid rgba(200, 155, 93, 0.12)",
              boxShadow: "0 40px 100px rgba(0,0,0,0.6), 0 0 0 1px rgba(200,155,93,0.06)",
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
            }}
          >
            {/* Subtle inner ambient glow */}
            <div aria-hidden="true" style={{
              position: "absolute", inset: 0, pointerEvents: "none",
              background: "radial-gradient(ellipse at 50% 40%, rgba(200,155,93,0.03) 0%, transparent 60%)",
            }} />

            {/* ════ DESKTOP: 3-Panel Layout / MOBILE: Vertical Stack ════ */}

            {/* ── LEFT: Navigation (desktop only) ── */}
            {!isMobile && (
              <div style={{
                width: 80,
                flexShrink: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 20,
                padding: "40px 0",
                borderRight: "1px solid rgba(200,155,93,0.08)",
                position: "relative",
                zIndex: 2,
              }}>
                {/* Counter */}
                <div style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  letterSpacing: "0.15em",
                  color: "rgba(200,155,93,0.5)",
                  textAlign: "center",
                  lineHeight: 1.4,
                }}>
                  <span style={{ color: "var(--brand-gold)", fontSize: 13, fontWeight: 700 }}>
                    {String(currentIndex + 1).padStart(2, "0")}
                  </span>
                  <br />
                  <span style={{ fontSize: 9, opacity: 0.6 }}>/ {String(teaserReels.length).padStart(2, "0")}</span>
                </div>

                {/* Vertical divider */}
                <div style={{
                  width: 1, height: 32,
                  background: "rgba(200,155,93,0.15)",
                }} />

                {/* Prev / Next */}
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <button
                    onClick={() => navigateReel(-1)}
                    aria-label="Previous reel"
                    style={{
                      width: 36, height: 36,
                      borderRadius: "50%",
                      border: "1px solid rgba(200,155,93,0.25)",
                      background: "rgba(26,5,7,0.6)",
                      color: "rgba(245,230,204,0.7)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "var(--brand-gold)";
                      e.currentTarget.style.color = "var(--brand-gold)";
                      e.currentTarget.style.background = "rgba(200,155,93,0.1)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "rgba(200,155,93,0.25)";
                      e.currentTarget.style.color = "rgba(245,230,204,0.7)";
                      e.currentTarget.style.background = "rgba(26,5,7,0.6)";
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                      <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                  </button>

                  <button
                    onClick={() => navigateReel(1)}
                    aria-label="Next reel"
                    style={{
                      width: 36, height: 36,
                      borderRadius: "50%",
                      border: "1px solid rgba(200,155,93,0.25)",
                      background: "rgba(26,5,7,0.6)",
                      color: "rgba(245,230,204,0.7)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "var(--brand-gold)";
                      e.currentTarget.style.color = "var(--brand-gold)";
                      e.currentTarget.style.background = "rgba(200,155,93,0.1)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "rgba(200,155,93,0.25)";
                      e.currentTarget.style.color = "rgba(245,230,204,0.7)";
                      e.currentTarget.style.background = "rgba(26,5,7,0.6)";
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>

                {/* Bottom decorative line */}
                <div style={{
                  width: 1, height: 32,
                  background: "rgba(200,155,93,0.15)",
                }} />

                {/* Category label */}
                <div style={{
                  writingMode: "vertical-rl",
                  fontFamily: "var(--font-mono)",
                  fontSize: 8,
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  color: "rgba(200,155,93,0.35)",
                }}>
                  {activeReel.categoryLabel}
                </div>
              </div>
            )}

            {/* ── CENTER: Instagram Reel ── */}
            <div style={{
              flex: "1 1 0",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: isMobile ? "20px 20px 0" : "32px 24px",
              position: "relative",
              zIndex: 2,
              minHeight: isMobile ? "auto" : "100%",
            }}>
              {/* Mobile: counter above reel */}
              {isMobile && (
                <div style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 16,
                }}>
                  <div style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    letterSpacing: "0.2em",
                    color: "rgba(200,155,93,0.5)",
                  }}>
                    <span style={{ color: "var(--brand-gold)", fontWeight: 700 }}>
                      {String(currentIndex + 1).padStart(2, "0")}
                    </span>
                    {" / "}
                    {String(teaserReels.length).padStart(2, "0")}
                  </div>
                  <div style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 9,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "rgba(200,155,93,0.4)",
                  }}>
                    {activeReel.categoryLabel}
                  </div>
                </div>
              )}

              {/* The actual Instagram Reel embed */}
              <div style={{
                width: "100%",
                maxWidth: isMobile ? 340 : 360,
                aspectRatio: "9/16",
                background: "var(--brand-maroon-deep)",
                borderRadius: isMobile ? 16 : 12,
                overflow: "hidden",
                border: "1px solid rgba(200,155,93,0.08)",
                boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
                position: "relative",
                flexShrink: 0,
              }}>
                {isLoading && (
                  <div style={{
                    position: "absolute", inset: 0,
                    display: "flex", flexDirection: "column",
                    alignItems: "center", justifyContent: "center",
                    zIndex: 5, background: "var(--brand-maroon-deep)",
                    gap: 12,
                    borderRadius: "inherit",
                  }}>
                    <div style={{
                      width: 28, height: 28,
                      border: "2px solid rgba(200,155,93,0.12)",
                      borderTopColor: "var(--brand-gold)",
                      borderRadius: "50%",
                      animation: "spin 0.8s linear infinite",
                    }} />
                    <span style={{
                      fontFamily: "var(--font-mono)", fontSize: 9,
                      letterSpacing: "0.2em", textTransform: "uppercase",
                      color: "rgba(245,230,204,0.3)",
                    }}>
                      Loading reel...
                    </span>
                  </div>
                )}

                <iframe
                  src={getEmbedUrl(activeReel.embedUrl)}
                  title={`${activeReel.title} — Instagram Reel`}
                  style={{
                    width: "100%", height: "100%",
                    border: "none", display: "block",
                  }}
                  allow="autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                  onLoad={() => setIsLoading(false)}
                />
              </div>

              {/* Mobile: nav arrows below reel */}
              {isMobile && (
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 24,
                  marginTop: 20,
                  paddingBottom: 4,
                }}>
                  <button
                    onClick={() => navigateReel(-1)}
                    aria-label="Previous reel"
                    style={{
                      width: 40, height: 40,
                      borderRadius: "50%",
                      border: "1px solid rgba(200,155,93,0.25)",
                      background: "rgba(26,5,7,0.6)",
                      color: "rgba(245,230,204,0.7)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "var(--brand-gold)";
                      e.currentTarget.style.color = "var(--brand-gold)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "rgba(200,155,93,0.25)";
                      e.currentTarget.style.color = "rgba(245,230,204,0.7)";
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                      <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                  </button>

                  <button
                    onClick={() => navigateReel(1)}
                    aria-label="Next reel"
                    style={{
                      width: 40, height: 40,
                      borderRadius: "50%",
                      border: "1px solid rgba(200,155,93,0.25)",
                      background: "rgba(26,5,7,0.6)",
                      color: "rgba(245,230,204,0.7)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "var(--brand-gold)";
                      e.currentTarget.style.color = "var(--brand-gold)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "rgba(200,155,93,0.25)";
                      e.currentTarget.style.color = "rgba(245,230,204,0.7)";
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              )}
            </div>

            {/* ── RIGHT: Story Panel (desktop only) ── */}
            {!isMobile && (
              <div style={{
                width: 300,
                flexShrink: 0,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                padding: "36px 28px",
                borderLeft: "1px solid rgba(200,155,93,0.08)",
                position: "relative",
                zIndex: 2,
                overflowY: "auto",
              }}>
                {/* Category label */}
                <div style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 9,
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  color: "var(--brand-gold)",
                  marginBottom: 16,
                }}>
                  {activeReel.categoryLabel}
                </div>

                {/* Title */}
                <h3 style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(24px, 2.5vw, 30px)",
                  fontWeight: 500,
                  fontStyle: "italic",
                  color: "var(--brand-cream)",
                  lineHeight: 1.2,
                  marginBottom: 12,
                  letterSpacing: "-0.01em",
                }}>
                  {activeReel.title}
                </h3>

                {/* Story description */}
                <p style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 14,
                  color: "rgba(245,230,204,0.55)",
                  lineHeight: 1.8,
                  marginBottom: 24,
                }}>
                  {story}
                </p>

                {/* Divider */}
                <div style={{
                  width: "100%", height: 1,
                  background: "rgba(200,155,93,0.1)",
                  marginBottom: 24,
                }} />

                {/* Creator info */}
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  marginBottom: 20,
                }}>
                  <div style={{
                    width: 36, height: 36,
                    borderRadius: "50%",
                    overflow: "hidden",
                    border: "1px solid rgba(200,155,93,0.2)",
                    flexShrink: 0,
                    background: "var(--brand-maroon-deep)",
                  }}>
                    <img
                      src="/1.jpg"
                      alt="Shaadi Pitara"
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </div>
                  <div>
                    <div style={{
                      fontFamily: "var(--font-body)",
                      fontSize: 13,
                      fontWeight: 500,
                      color: "var(--brand-cream)",
                    }}>
                      Shaadi Pitara
                    </div>
                    <div style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 9,
                      color: "rgba(200,155,93,0.5)",
                      letterSpacing: "0.1em",
                    }}>
                      @shaadi.pitara
                    </div>
                  </div>
                </div>

                {/* View on Instagram button */}
                <a
                  href={activeReel.embedUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    width: "100%",
                    padding: "13px 20px",
                    border: "1px solid rgba(200,155,93,0.25)",
                    borderRadius: 8,
                    background: "transparent",
                    color: "var(--brand-gold)",
                    fontFamily: "var(--font-mono)",
                    fontSize: 9,
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    textDecoration: "none",
                    transition: "all 0.35s ease",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "var(--brand-gold)";
                    e.currentTarget.style.background = "rgba(200,155,93,0.08)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(200,155,93,0.25)";
                    e.currentTarget.style.background = "transparent";
                  }}
                >
                  View on Instagram
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </a>

                {/* Decorative editorial phrase */}
                <div style={{
                  marginTop: 28,
                  fontFamily: "var(--font-display)",
                  fontSize: 13,
                  fontStyle: "italic",
                  color: "rgba(200,155,93,0.25)",
                  textAlign: "center",
                  lineHeight: 1.5,
                }}>
                  More than a wedding.<br />A feeling.
                </div>
              </div>
            )}

            {/* ── MOBILE: Story below reel ── */}
            {isMobile && (
              <div style={{
                padding: "20px 24px 24px",
                borderTop: "1px solid rgba(200,155,93,0.08)",
                position: "relative",
                zIndex: 2,
              }}>
                {/* Category */}
                <div style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 9,
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  color: "var(--brand-gold)",
                  marginBottom: 10,
                }}>
                  {activeReel.categoryLabel}
                </div>

                {/* Title */}
                <h3 style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 26,
                  fontWeight: 500,
                  fontStyle: "italic",
                  color: "var(--brand-cream)",
                  lineHeight: 1.2,
                  marginBottom: 8,
                }}>
                  {activeReel.title}
                </h3>

                {/* Location */}
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  marginBottom: 14,
                }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--brand-gold)" strokeWidth={1.5}>
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 13,
                    color: "rgba(200,155,93,0.6)",
                  }}>
                    {activeReel.duration}
                  </span>
                </div>

                {/* Description (compact) */}
                {story && (
                  <p style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 13,
                    color: "rgba(245,230,204,0.45)",
                    lineHeight: 1.7,
                    marginBottom: 20,
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}>
                    {story}
                  </p>
                )}

                {/* CTA */}
                <a
                  href={activeReel.embedUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    width: "100%",
                    padding: "15px 20px",
                    border: "none",
                    borderRadius: 10,
                    background: "var(--brand-cream)",
                    color: "var(--brand-maroon-dark)",
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    textDecoration: "none",
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#ffffff";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "var(--brand-cream)";
                  }}
                >
                  View on Instagram
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </a>
              </div>
            )}

            {/* ── CLOSE BUTTON (both layouts) ── */}
            <button
              onClick={handleClose}
              aria-label="Close reel viewer"
              style={{
                position: "absolute",
                top: isMobile ? 16 : 16,
                right: isMobile ? 16 : 16,
                zIndex: 10,
                width: 36,
                height: 36,
                borderRadius: "50%",
                background: "rgba(26,5,7,0.65)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(200,155,93,0.2)",
                color: "var(--brand-cream)",
                fontSize: 18,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "all 0.3s ease",
                lineHeight: 1,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--brand-gold)";
                e.currentTarget.style.background = "rgba(94,24,28,0.8)";
                e.currentTarget.style.color = "var(--brand-gold-light)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(200,155,93,0.2)";
                e.currentTarget.style.background = "rgba(26,5,7,0.65)";
                e.currentTarget.style.color = "var(--brand-cream)";
              }}
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
