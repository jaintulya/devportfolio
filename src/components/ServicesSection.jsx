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
      className="services-section-wrapper"
      style={{
        padding: "clamp(80px, 10vw, 140px) clamp(16px, 4vw, 48px)",
        position: "relative",
      }}
    >
      {/* Subtle dot texture — mobile/light background */}
      <div
        className="services-dot-texture"
        aria-hidden="true"
        style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: `radial-gradient(rgba(94, 24, 28, 0.04) 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
      />

      {/* Texture overlay for web maroon background */}
      <div
        className="services-maroon-texture"
        aria-hidden="true"
        style={{
          position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1, opacity: 0.04,
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 160 160' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      <div style={{ maxWidth: 1160, margin: "0 auto", position: "relative", zIndex: 2 }}>
        {/* Section header */}
        <div ref={headRef} style={{ textAlign: "center", marginBottom: "clamp(48px, 7vw, 80px)" }}>
          <div className="eyebrow-label services-eyebrow" style={{ justifyContent: "center" }}>
            <span className="services-eyebrow-line" style={{ display: "block" }} />
            What We Offer
            <span className="services-eyebrow-line" style={{ display: "block" }} />
          </div>
          <h2 className="c-heading services-heading" style={{ margin: "16px 0 12px" }}>
            <span className="services-heading-title">Services &amp; </span>
            <i className="services-heading-accent">Offerings</i>
          </h2>
          <p className="services-intro-desc" style={{
            fontFamily: "var(--font-body)",
            fontSize: "clamp(15px, 1.5vw, 17px)",
            marginTop: 16,
            maxWidth: 540,
            margin: "16px auto 0",
            lineHeight: 1.7,
          }}>
            Every wedding has its own rhythm. Choose the services that fit your vision, from live stories to full cinematic reels.
          </p>
        </div>

        {/* Responsive styling: Mobile retains 2-col ivory layout; Web size has 3 cols x 2 rows with maroon background & beige luxury cards */}
        <style>{`
          /* Default / Mobile (Ivory Background) */
          .services-section-wrapper {
            background: var(--brand-ivory);
          }
          .services-maroon-texture {
            display: none;
          }
          .services-dot-texture {
            display: block;
          }
          .services-eyebrow {
            color: var(--brand-maroon);
          }
          .services-eyebrow-line {
            background: var(--brand-maroon);
          }
          .services-heading .services-heading-title {
            color: var(--brand-maroon-dark) !important;
          }
          .services-heading .services-heading-accent {
            color: var(--brand-gold-dark) !important;
          }
          .services-intro-desc {
            color: rgba(58, 13, 16, 0.6);
          }
          .services-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
            gap: clamp(16px, 2vw, 24px);
          }
          .services-grid .service-card {
            position: relative;
            background: #F7E6CC;
            border: 1px solid var(--brand-border-subtle);
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
            border-left: 3px solid transparent;
            transition: transform 0.55s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.55s ease, filter 0.55s ease, border-color 0.4s ease;
            overflow: hidden;
            cursor: pointer;
          }
          .services-grid .service-card::before {
            content: "";
            position: absolute;
            inset: 0;
            background: linear-gradient(115deg, transparent 25%, rgba(255, 255, 255, 0.6) 47%, transparent 64%);
            transform: translateX(-130%);
            transition: transform 0.85s ease;
            z-index: 10;
            pointer-events: none;
          }
          @media (hover: hover) and (pointer: fine) {
            .services-grid .service-card:hover::before {
              transform: translateX(130%);
            }
            .services-grid .service-card:hover {
              transform: translateY(-6px) scale(1.015);
              box-shadow: 0 20px 48px rgba(94, 24, 28, 0.12), 0 0 25px rgba(212, 184, 150, 0.22);
              filter: saturate(1.06);
              border-left-color: var(--brand-gold) !important;
              z-index: 10;
            }
          }
          .services-grid .service-card .svc-num {
            color: rgba(94, 24, 28, 0.45);
          }
          .services-grid .service-card .svc-title {
            color: var(--brand-maroon-dark);
          }
          .services-grid .service-card .svc-tagline {
            color: var(--brand-gold-dark);
          }
          .services-grid .service-card .svc-desc {
            color: rgba(58, 13, 16, 0.7);
          }

          /* Mobile adjustments (2 columns) */
          @media (max-width: 768px) {
            .services-grid {
              grid-template-columns: repeat(2, 1fr);
              gap: 10px;
            }
            .services-grid .service-card {
              padding: 16px 14px !important;
              gap: 8px !important;
            }
            .services-grid .service-card .svc-title {
              font-size: 14px !important;
            }
            .services-grid .service-card .svc-desc {
              display: none;
            }
          }

          /* WEB SIZE: Maroon background, 3 Columns x 2 Rows & BEIGE Luxury Cards with Contact card 3D hover */
          @media (min-width: 769px) {
            .services-section-wrapper {
              background-color: #3A0B0E !important;
              background-image: url('/seamless-texture.jpg') !important;
              background-repeat: repeat !important;
              background-size: 600px 600px !important;
              background-position: 0 0 !important;
            }
            .services-dot-texture {
              display: none !important;
            }
            .services-maroon-texture {
              display: block !important;
            }
            .services-eyebrow {
              color: var(--brand-gold) !important;
            }
            .services-eyebrow-line {
              background: var(--brand-gold) !important;
            }
            .services-heading .services-heading-title {
              color: #FEF5E6 !important;
            }
            .services-heading .services-heading-accent {
              color: #DFC18A !important;
            }
            .services-intro-desc {
              color: rgba(247, 230, 204, 0.78) !important;
            }
            .services-grid {
              grid-template-columns: repeat(3, 1fr) !important;
              gap: clamp(20px, 2.2vw, 28px) !important;
            }
            .services-grid .service-card {
              background: linear-gradient(160deg, #F8EDE1 0%, #EBD8C3 100%) !important;
              border: 1px solid rgba(212, 184, 150, 0.55) !important;
              border-radius: 14px !important;
              box-shadow: 18px 25px 50px rgba(7, 1, 2, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.72) !important;
              border-left: 3px solid transparent !important;
            }
            @media (hover: hover) and (pointer: fine) {
              .services-grid .service-card:hover {
                background: linear-gradient(160deg, #FCF5EC 0%, #F0E1CE 100%) !important;
                border-color: #C89D66 !important;
                border-left-color: var(--brand-maroon) !important;
                transform: translateY(-8px) scale(1.02) !important;
                box-shadow: 25px 35px 65px rgba(5, 1, 2, 0.55), 0 0 35px rgba(214, 180, 119, 0.25) !important;
                filter: saturate(1.08) !important;
                z-index: 20 !important;
              }
            }
            .services-grid .service-card .svc-num {
              color: rgba(94, 24, 28, 0.5) !important;
              font-size: 10px !important;
            }
            .services-grid .service-card .svc-title {
              color: #2E0A0D !important;
              font-size: clamp(22px, 2.1vw, 27px) !important;
              font-weight: 600 !important;
            }
            .services-grid .service-card .svc-tagline {
              color: #966A3A !important;
            }
            .services-grid .service-card .svc-desc {
              color: rgba(46, 10, 13, 0.78) !important;
              font-size: 14px !important;
              line-height: 1.72 !important;
            }
          }
        `}</style>

        <div className="services-grid">
          {services.map((svc, i) => (
            <article
              key={svc.id}
              ref={(el) => { cardRefs.current[i] = el; }}
              className="service-card"
              style={{
                padding: "clamp(28px, 3vw, 36px) clamp(24px, 2.5vw, 32px)",
                display: "flex", flexDirection: "column", gap: 14,
              }}
            >
              {/* Service number */}
              <span className="svc-num" style={{
                fontFamily: "var(--font-mono)", fontSize: 9,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
              }}>
                {String(i + 1).padStart(2, "0")} / {String(services.length).padStart(2, "0")}
              </span>

              <h3 className="svc-title" style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(20px, 2.5vw, 26px)",
                fontWeight: 600,
                lineHeight: 1.2,
                letterSpacing: "-0.01em",
              }}>
                {svc.title}
              </h3>

              <p className="svc-tagline" style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(14px, 1.4vw, 16px)",
                fontStyle: "italic",
                lineHeight: 1.5,
              }}>
                {svc.tagline}
              </p>

              <p className="svc-desc" style={{
                fontFamily: "var(--font-body)",
                fontSize: 14,
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
