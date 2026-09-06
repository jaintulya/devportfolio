"use client";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function FinalCTASection() {
  const secRef = useRef(null);
  const headRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headRef.current, {
        y: 40, opacity: 0, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: headRef.current, start: "top 80%" },
      });
    }, secRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="cta"
      ref={secRef}
      style={{
        padding: "clamp(100px, 14vw, 160px) clamp(20px, 4vw, 48px)",
        background: "linear-gradient(160deg, var(--brand-maroon) 0%, var(--brand-maroon-dark) 60%, var(--brand-maroon-deep) 100%)",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
        borderTop: "1px solid rgba(200, 155, 93, 0.2)",
        borderBottom: "1px solid rgba(200, 155, 93, 0.2)",
      }}
    >
      {/* Ambient dot pattern */}
      <div aria-hidden="true" style={{
        position: "absolute", inset: 0,
        backgroundImage: `radial-gradient(rgba(200, 155, 93, 0.08) 1px, transparent 1px)`,
        backgroundSize: "32px 32px",
        pointerEvents: "none",
      }} />

      {/* Warm glow */}
      <div aria-hidden="true" style={{
        position: "absolute",
        top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        width: 800, height: 800, borderRadius: "50%",
        background: "radial-gradient(ellipse, rgba(200,155,93,0.05) 0%, transparent 70%)",
        filter: "blur(80px)", pointerEvents: "none",
      }} />

      <div
        style={{
          position: "relative", zIndex: 2,
          maxWidth: 780, margin: "0 auto",
        }}
      >
        <div ref={headRef}>
          <div className="eyebrow-label" style={{ justifyContent: "center" }}>
            <span style={{ background: "var(--brand-gold)", display: "block" }} />
            Begin Your Story
            <span style={{ background: "var(--brand-gold)", display: "block" }} />
          </div>

          <h2
            style={{
              fontFamily: "var(--font-display, serif)",
              fontSize: "clamp(38px, 7vw, 68px)",
              fontWeight: 300,
              lineHeight: 1.1,
              color: "var(--brand-cream)",
              marginTop: 20,
              marginBottom: 24,
              fontStyle: "italic",
              letterSpacing: "-0.01em",
            }}
          >
            Let&apos;s craft something<br />timeless together
          </h2>

          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(15px, 1.5vw, 18px)",
              color: "var(--brand-beige-muted)",
              lineHeight: 1.75,
              maxWidth: 560,
              margin: "0 auto 44px",
            }}
          >
            Every love story deserves to be told with reverence and cinematic finesse. Reach out and let&apos;s begin.
          </p>

          <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
            <a
              href="#contact"
              className="btn-primary"
              style={{
                display: "inline-flex", alignItems: "center", gap: 10,
                padding: "16px 42px",
                background: "var(--brand-cream)",
                color: "var(--brand-maroon-dark)",
                fontFamily: "var(--font-mono)",
                fontSize: 11, letterSpacing: "0.22em",
                textTransform: "uppercase",
                textDecoration: "none",
                borderRadius: 4,
                boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
                transition: "all 0.35s ease",
                fontWeight: 600,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-3px)";
                e.currentTarget.style.background = "#ffffff";
                e.currentTarget.style.boxShadow = "0 16px 40px rgba(200, 155, 93, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.background = "var(--brand-cream)";
                e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.35)";
              }}
            >
              Get In Touch
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>

            <Link
              href="/work"
              className="btn-secondary"
              style={{
                display: "inline-flex", alignItems: "center", gap: 10,
                padding: "16px 36px",
                background: "transparent",
                color: "var(--brand-cream)",
                fontFamily: "var(--font-mono)",
                fontSize: 11, letterSpacing: "0.22em",
                textTransform: "uppercase",
                textDecoration: "none",
                borderRadius: 4,
                border: "1px solid rgba(245, 230, 204, 0.35)",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--brand-gold)";
                e.currentTarget.style.background = "rgba(200, 155, 93, 0.12)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(245, 230, 204, 0.35)";
                e.currentTarget.style.background = "transparent";
              }}
            >
              Explore Full Gallery
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
