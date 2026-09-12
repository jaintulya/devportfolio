"use client";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: "wedding-reels",
    title: "Wedding Reels",
    tagline: "Cinematic highlight films",
    description: "Handcrafted cinematic reels with handpicked soundtracks, nuanced pacing, and organic color grading, turning fleeting moments into timeless heirlooms.",
  },
  {
    id: "live-stories",
    title: "Live Stories",
    tagline: "Real-time, unscripted",
    description: "Unfiltered, intimate Stories captured and uploaded live as your celebrations unfold, so friends and family experience every tear and cheer in real time.",
  },
  {
    id: "live-reels",
    title: "Live Reels",
    tagline: "Same-night cinematic magic",
    description: "Real-time reel creation during your wedding, with same-night edits delivered within hours while the energy is still electric.",
  },
  {
    id: "instant-reels",
    title: "Instant Reels",
    tagline: "Fast-turnaround, same emotion",
    description: "Cinematic reels edited and delivered within hours of your event. Wake up the morning after and relive the rush while the emotions are still alive.",
  },
  {
    id: "social-media",
    title: "Wedding Social Media",
    tagline: "Complete digital presence",
    description: "Curated posts, reels, and stories that keep guests and family engaged before, during, and after the big day.",
  },
  {
    id: "page-management",
    title: "Wedding Page Management",
    tagline: "Your page, perfectly curated",
    description: "A dedicated couple page managed end to end, from countdown graphics and invitation posts to a perfectly curated feed and story highlights.",
  },
];

export default function ServicesSection() {
  const secRef = useRef(null);
  const headRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headRef.current, {
        y: 50, opacity: 0, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: headRef.current, start: "top 80%" },
      });

      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        gsap.from(card, {
          y: 40, opacity: 0, duration: 0.8, ease: "power3.out",
          delay: i * 0.06,
          scrollTrigger: { trigger: card, start: "top 88%" },
        });
      });
    }, secRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="services"
      ref={secRef}
      aria-label="Services and offerings"
      style={{
        padding: "clamp(80px, 10vw, 140px) clamp(16px, 4vw, 48px)",
        background: "var(--brand-ivory)",
        position: "relative",
      }}
    >
      {/* Subtle dot texture */}
      <div aria-hidden="true" style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: `radial-gradient(rgba(94, 24, 28, 0.04) 1px, transparent 1px)`,
        backgroundSize: "28px 28px",
      }} />

      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 2 }}>
        {/* Section header */}
        <div ref={headRef} style={{ textAlign: "center", marginBottom: "clamp(48px, 7vw, 80px)" }}>
          <div className="eyebrow-label" style={{ justifyContent: "center", color: "var(--brand-maroon)" }}>
            <span style={{ background: "var(--brand-maroon)", display: "block" }} />
            What We Offer
            <span style={{ background: "var(--brand-maroon)", display: "block" }} />
          </div>
          <h2 className="c-heading on-light" style={{ margin: "16px 0 12px" }}>
            Services &amp; <i>Offerings</i>
          </h2>
          <p style={{
            fontFamily: "var(--font-body)",
            fontSize: "clamp(15px, 1.5vw, 17px)",
            color: "rgba(58,13,16,0.55)",
            marginTop: 16,
            maxWidth: 520,
            margin: "16px auto 0",
            lineHeight: 1.7,
          }}>
            Every wedding has its own rhythm. Choose the services that fit your vision, from live stories to full cinematic reels.
          </p>
        </div>

        {/* Cards grid — 2-col on desktop and mobile (2x2), larger on tablet+ */}
        <style>{`
          .services-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
            gap: clamp(16px, 2vw, 24px);
          }
          @media (max-width: 640px) {
            .services-grid {
              grid-template-columns: repeat(2, 1fr);
              gap: 10px;
            }
            .services-grid .card-light {
              padding: 16px 14px !important;
              gap: 8px !important;
            }
            .services-grid .card-light h3 {
              font-size: 14px !important;
            }
            .services-grid .card-light .svc-desc {
              display: none;
            }
          }
        `}</style>
        <div className="services-grid">
          {services.map((svc, i) => (
            <article
              key={svc.id}
              ref={(el) => { cardRefs.current[i] = el; }}
              className="card-light"
              style={{
                padding: "clamp(28px, 3vw, 36px) clamp(24px, 2.5vw, 32px)",
                display: "flex", flexDirection: "column", gap: 14,
                borderLeft: "3px solid transparent",
                transition: "all 0.45s cubic-bezier(0.23,1,0.32,1)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderLeftColor = "var(--brand-gold)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderLeftColor = "transparent";
              }}
            >
              {/* Service number */}
              <span style={{
                fontFamily: "var(--font-mono)", fontSize: 9,
                letterSpacing: "0.2em", color: "rgba(94,24,28,0.3)",
                textTransform: "uppercase",
              }}>
                {String(i + 1).padStart(2, "0")} / {String(services.length).padStart(2, "0")}
              </span>

              <h3 style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(20px, 2.5vw, 26px)",
                fontWeight: 600,
                color: "var(--brand-maroon-dark)",
                lineHeight: 1.2,
                letterSpacing: "-0.01em",
              }}>
                {svc.title}
              </h3>

              <p style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(14px, 1.4vw, 16px)",
                fontStyle: "italic",
                color: "var(--brand-gold-dark)",
                lineHeight: 1.5,
              }}>
                {svc.tagline}
              </p>

              <p className="svc-desc" style={{
                fontFamily: "var(--font-body)",
                fontSize: 14,
                color: "rgba(58,13,16,0.6)",
                lineHeight: 1.75,
                flex: 1,
              }}>
                {svc.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
