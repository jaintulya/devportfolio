"use client";
import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { reelCategories, reelData } from "@/lib/reelData";

gsap.registerPlugin(ScrollTrigger);

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
    document.body.style.overflow = "";
  };

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape" && modalOpen) closeModal();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [modalOpen, closeModal]);

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
      {/* Sticky top nav */}
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
              fontFamily: "var(--font-display)",
              fontSize: 20,
              fontWeight: 600,
              color: "var(--brand-cream)",
              textDecoration: "none",
              letterSpacing: "0.04em",
              transition: "color 0.3s ease",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "var(--brand-gold)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "var(--brand-cream)"; }}
          >
            Shaadi Pitara
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
            {reelCategories.map((cat) => (
              <button
                key={cat.id}
                ref={(el) => { if (el) tabsRef.current[cat.id] = el; }}
                onClick={() => setActiveTab(cat.id)}
                style={{
                  padding: "8px 18px",
                  background: activeTab === cat.id ? "var(--brand-gold)" : "transparent",
                  color: activeTab === cat.id ? "var(--brand-maroon-dark)" : "var(--brand-beige-muted)",
                  border: `1px solid ${activeTab === cat.id ? "var(--brand-gold)" : "rgba(200,155,93,0.18)"}`,
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

      {/* Hero header for work page */}
      <div
        style={{
          padding: "clamp(48px, 7vw, 80px) clamp(16px, 4vw, 48px)",
          textAlign: "center",
          borderBottom: "1px solid rgba(200,155,93,0.06)",
        }}
      >
        <div className="eyebrow-label" style={{ justifyContent: "center" }}>
          Full Showcase
        </div>
        <h1 className="section-heading" style={{ marginTop: 12 }}>
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
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: 20,
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
                    border: "1px solid rgba(200,155,93,0.08)",
                    transition: "all 0.5s cubic-bezier(0.23,1,0.32,1)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.015)";
                    e.currentTarget.style.borderColor = "rgba(200,155,93,0.3)";
                    e.currentTarget.style.boxShadow = "0 24px 56px rgba(0,0,0,0.35)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.borderColor = "rgba(200,155,93,0.08)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <img
                    src={item.poster}
                    alt={`${item.title} — ${reelCategories.find(c => c.id === item.category)?.label || ''}`}
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
                    {item.duration}
                  </div>
                  <div style={{
                    position: "absolute", top: "50%", left: "50%",
                    transform: "translate(-50%, -50%)",
                    zIndex: 4,
                    width: 44, height: 44,
                    borderRadius: "50%",
                    background: "rgba(46,10,13,0.55)",
                    backdropFilter: "blur(8px)",
                    border: "1.5px solid rgba(200,155,93,0.45)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    pointerEvents: "none",
                  }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="var(--brand-cream)">
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                  </div>
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
                    <div style={{
                      fontFamily: "var(--font-body)", fontSize: 12,
                      color: "rgba(245,230,204,0.45)", marginTop: 4,
                    }}>
                      {item.duration}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>

      {/* ─── MODAL ─── */}
      {modalOpen && activeReel && (
        <div
          className="reel-modal-overlay"
          onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
          role="dialog"
          aria-modal="true"
          aria-label={`${activeReel.title} — ${activeReel.category}`}
        >
          <div className="reel-modal-content">
            <button
              className="reel-modal-close"
              onClick={closeModal}
              aria-label="Close reel viewer"
            >
              &times;
            </button>

            <div style={{
              aspectRatio: "9/16",
              background: "var(--brand-maroon-dark)",
              position: "relative",
              maxHeight: "75vh",
            }}>
              {isLoading && (
                <div style={{
                  position: "absolute", inset: 0,
                  display: "flex", flexDirection: "column",
                  alignItems: "center", justifyContent: "center",
                  zIndex: 5, background: "var(--brand-maroon-dark)",
                  gap: 14,
                }}>
                  <div style={{
                    width: 32, height: 32,
                    border: "2px solid rgba(200,155,93,0.15)",
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
                style={{
                  width: "100%", height: "100%",
                  border: "none", display: "block",
                }}
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
                onLoad={() => setIsLoading(false)}
              />
            </div>

            <div style={{
              padding: "18px 22px",
              background: "linear-gradient(to bottom, var(--brand-maroon-dark), rgba(46,10,13,0.95))",
              borderTop: "1px solid rgba(200,155,93,0.1)",
              display: "flex", alignItems: "center", justifyContent: "space-between",
              gap: 16,
            }}>
              <div>
                <div style={{
                  fontFamily: "var(--font-mono)", fontSize: 9,
                  letterSpacing: "0.25em", textTransform: "uppercase",
                  color: "var(--brand-gold)", marginBottom: 4,
                }}>
                  {activeReel.category}
                </div>
                <div style={{
                  fontFamily: "var(--font-display)", fontSize: 18,
                  fontWeight: 600, color: "var(--brand-cream)",
                }}>
                  {activeReel.title}
                </div>
                <div style={{
                  fontFamily: "var(--font-body)", fontSize: 12,
                  color: "rgba(245,230,204,0.45)", marginTop: 2,
                }}>
                  {activeReel.duration}
                </div>
              </div>

              <a
                href={activeReel.embedUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 6,
                  fontFamily: "var(--font-mono)", fontSize: 9,
                  letterSpacing: "0.18em", textTransform: "uppercase",
                  color: "var(--brand-gold)",
                  textDecoration: "none",
                  borderBottom: "1px solid rgba(200,155,93,0.3)",
                  paddingBottom: 2,
                  whiteSpace: "nowrap",
                  transition: "all 0.3s ease",
                  flexShrink: 0,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--brand-gold)";
                  e.currentTarget.style.color = "var(--brand-gold-light)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(200,155,93,0.3)";
                  e.currentTarget.style.color = "var(--brand-gold)";
                }}
              >
                View on Instagram
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
