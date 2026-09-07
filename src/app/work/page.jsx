"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { reelData, reelCategories } from "@/lib/reelData";

gsap.registerPlugin(ScrollTrigger);

const CATEGORIES = [
  { id: "all", label: "All" },
  ...reelCategories,
];

function getEmbedUrl(url) {
  return url.replace(/\/$/, "") + "/embed/?autoplay=true&muted=1";
}

export default function WorkPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [activeReel, setActiveReel] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const tabsRef = useRef({});
  const secRef = useRef(null);

  const filteredItems =
    activeTab === "all"
      ? reelData
      : reelData.filter((item) => item.category === activeTab);

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
    setActiveReel(reel);
    setModalOpen(true);
    setIsLoading(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setModalOpen(false);
    setActiveReel(null);
    setIsLoading(true);
    document.body.style.overflow = "";
  };

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape" && modalOpen) closeModal();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [modalOpen, closeModal]);

  // Entrance animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("header", {
        y: 40, opacity: 0, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: "header", start: "top 80%" },
      });
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
      style={{
        background: "var(--brand-maroon-dark)",
        minHeight: "100vh",
        color: "var(--brand-cream)",
      }}
    >
      {/* Logo + header area */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 80,
          background: "rgba(46, 10, 13, 0.92)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(200, 155, 93, 0.12)",
          padding: "14px 24px",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
              textDecoration: "none",
              transition: "opacity 0.3s ease",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.8"; }}
            onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
          >
            <div style={{
              position: "relative",
              width: 36,
              height: 36,
              borderRadius: 8,
              overflow: "hidden",
              flexShrink: 0,
            }}>
              <Image src="/1.jpg" alt="Shaadi Pitara" fill sizes="36px" style={{ objectFit: "cover" }} />
            </div>
            <span style={{
              fontFamily: "var(--font-display, serif)",
              fontSize: 20, fontWeight: 600,
              color: "var(--brand-cream)", letterSpacing: "0.04em",
            }}>
              Shaadi Pitara
            </span>
          </Link>

          <nav
            aria-label="Work category filters"
            style={{
              display: "flex",
              gap: 6,
              flexWrap: "wrap",
              position: "relative",
            }}
          >
            {/* Sliding indicator */}
            <div
              style={{
                position: "absolute",
                bottom: -1,
                left: indicatorStyle.left,
                width: indicatorStyle.width,
                height: 2,
                background: "var(--brand-gold)",
                transition: "all 0.4s cubic-bezier(0.65,0,0.35,1)",
                pointerEvents: "none",
                borderRadius: 1,
              }}
            />
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                ref={(el) => { if (el) tabsRef.current[cat.id] = el; }}
                onClick={() => setActiveTab(cat.id)}
                style={{
                  padding: "8px 18px",
                  background: activeTab === cat.id ? "var(--brand-gold)" : "transparent",
                  color: activeTab === cat.id ? "var(--brand-maroon-dark)" : "var(--brand-beige-muted)",
                  border: `1px solid ${activeTab === cat.id ? "var(--brand-gold)" : "rgba(212,184,150,0.18)"}`,
                  borderRadius: 4,
                  fontFamily: "var(--font-mono)",
                  fontSize: 10,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  fontWeight: activeTab === cat.id ? 600 : 400,
                  whiteSpace: "nowrap",
                }}
              >
                {cat.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

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

      {/* Work grid — 2 rows of 4 on desktop */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "clamp(32px, 5vw, 56px) clamp(16px, 4vw, 48px)" }}>
        {filteredItems.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 24px", color: "rgba(245,230,204,0.4)" }}>
            <p style={{ fontFamily: "var(--font-display)", fontSize: 24 }}>No reels in this category yet.</p>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 14, marginTop: 8 }}>
              Check back soon.
            </p>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "clamp(12px, 1.8vw, 20px)",
            }}
          >
            {filteredItems.map((item, i) => {
              const cat = reelCategories.find((c) => c.id === item.category);
              return (
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
                    e.currentTarget.style.transform = "scale(1.015)";
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
                    fontFamily: "var(--font-mono)", fontSize: 9,
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
                    width: 44, height: 44,
                    borderRadius: "50%",
                    background: "rgba(46,10,13,0.55)",
                    backdropFilter: "blur(8px)",
                    border: "1.5px solid rgba(212,184,150,0.45)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    pointerEvents: "none",
                  }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="var(--brand-cream)">
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                  </div>
                  {/* Title + category */}
                  <div style={{
                    position: "absolute", bottom: 0, left: 0, right: 0,
                    padding: 20, zIndex: 3, pointerEvents: "none",
                  }}>
                    <div style={{
                      fontFamily: "var(--font-mono)", fontSize: 9,
                      letterSpacing: "0.25em", textTransform: "uppercase",
                      color: "var(--brand-gold)", marginBottom: 6,
                    }}>
                      {cat?.label || item.category}
                    </div>
                    <div style={{
                      fontFamily: "var(--font-display)", fontSize: 18,
                      fontWeight: 600, color: "var(--brand-cream)", lineHeight: 1.2,
                    }}>
                      {item.title}
                    </div>
                  </div>
                </article>
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
      </div>

      {/* ─── MODAL ─── */}
      {modalOpen && activeReel && (
        <div
          className="reel-modal-overlay"
          onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
          role="dialog"
          aria-modal="true"
          aria-label={`${activeReel.title} — ${activeReel.category}`}
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
        >
          <div
            className="reel-modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "relative",
              width: "100%",
              maxWidth: 420,
              aspectRatio: "9/16",
              maxHeight: "85vh",
              borderRadius: 12,
              overflow: "hidden",
              background: "#0A0203",
              boxShadow: "0 40px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(212,184,150,0.1)",
            }}
          >
            <button
              className="reel-modal-close"
              onClick={closeModal}
              aria-label="Close reel viewer"
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
              &times;
            </button>

            {isLoading && (
              <div style={{
                position: "absolute", inset: 0,
                display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center",
                zIndex: 5, background: "#0A0203",
                gap: 14,
              }}>
                <div style={{
                  width: 32, height: 32,
                  border: "2px solid rgba(212,184,150,0.15)",
                  borderTopColor: "var(--brand-gold)",
                  borderRadius: "50%",
                  animation: "spin 0.8s linear infinite",
                }} />
                <span style={{
                  fontFamily: "var(--font-mono)", fontSize: 9,
                  letterSpacing: "0.2em", textTransform: "uppercase",
                  color: "rgba(245,230,204,0.4)",
                }}>
                  Loading reel...
                </span>
              </div>
            )}

            <iframe
              src={getEmbedUrl(activeReel.embedUrl)}
              title={`${activeReel.title} — Instagram Reel`}
              onLoad={() => setIsLoading(false)}
              style={{
                width: "100%", height: "100%",
                border: "none", display: "block",
              }}
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  );
}
