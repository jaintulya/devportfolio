"use client";
import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function EndingSection() {
  const secRef = useRef(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const lines = secRef.current?.querySelectorAll(".end-line");
      lines?.forEach((line, i) => {
        const inner = line.querySelector(".end-inner");
        if (!inner) return;
        gsap.fromTo(inner,
          { yPercent: 110, opacity: 0 },
          {
            yPercent: 0, opacity: 1,
            duration: 1.1,
            delay: i * 0.18,
            ease: "cubic-bezier(0.2, 0.8, 0.2, 1)",
            scrollTrigger: { trigger: secRef.current, start: "top 75%" },
          }
        );
      });

      const sig = secRef.current?.querySelector(".end-sig");
      if (sig) {
        gsap.fromTo(sig,
          { y: 18, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 1,
            delay: 0.7,
            ease: "power3.out",
            scrollTrigger: { trigger: secRef.current, start: "top 72%" },
          }
        );
      }
    }, secRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      id="ending"
      ref={secRef}
      style={{
        background: "#3B0D10",
        color: "var(--brand-cream)",
        padding: "clamp(80px, 12vw, 180px) clamp(16px, 4vw, 48px)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Texture overlay matching Contact, Review & Footer */}
      <div aria-hidden="true" style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1, opacity: 0.04,
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 160 160' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
      }} />

      {/* Radial glow */}
      <div aria-hidden="true" style={{
        position: "absolute", left: "50%", top: "50%",
        transform: "translate(-50%,-50%)",
        width: 600, height: 600, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(124,41,45,0.14) 0%, transparent 70%)",
        pointerEvents: "none",
        zIndex: 1,
      }} />

      <div style={{
        maxWidth: 1180, margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "minmax(320px, 1.35fr) minmax(250px, 1fr)",
        gap: "clamp(32px, 6vw, 80px)",
        alignItems: "center",
        position: "relative", zIndex: 2,
      }}>
        {/* Left — headline */}
        <h2 style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontWeight: 500,
          fontSize: "clamp(46px, 7vw, 105px)",
          lineHeight: 0.88,
          letterSpacing: "-0.045em",
          margin: 0,
          color: "var(--brand-cream)",
        }}>
          <span className="end-line" style={{ display: "block", overflow: "hidden" }}>
            <span className="end-inner" style={{ display: "block" }}>
              A love for capturing moments
            </span>
          </span>
          <span className="end-line" style={{ display: "block", overflow: "hidden" }}>
            <span className="end-inner" style={{ display: "block" }}>
              became{" "}
              <span style={{ color: "var(--brand-gold)", fontStyle: "italic" }}>Shaadi Pitara.</span>
            </span>
          </span>
        </h2>

        {/* Right — image and signature underneath */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
        }}>
          <div
            style={{
              position: "relative",
              width: "clamp(200px, 20vw, 270px)",
              height: "clamp(260px, 26vw, 350px)",
              flexShrink: 0,
            }}
          >
            <img
              src="/devimg.jpeg"
              alt="Devarsh Jain - Founder of Shaadi Pitara"
              loading="lazy"
              decoding="async"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
                borderRadius: 12,
                boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
              }}
            />
            {/* Floating note 1 */}
            <div
              style={{
                position: "absolute",
                right: "-18px",
                top: "12px",
                padding: "10px 14px",
                background: "var(--brand-cream)",
                color: "var(--brand-maroon-dark)",
                boxShadow: "0 14px 35px rgba(0,0,0,0.3)",
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: 17,
                lineHeight: 1.2,
                fontWeight: 500,
                whiteSpace: "nowrap",
                zIndex: 10,
                borderRadius: 4,
              }}
            >
              "I loved doing it."
            </div>
            {/* Floating note 2 */}
            <div
              style={{
                position: "absolute",
                left: "-16px",
                bottom: "12px",
                padding: "8px 14px",
                background: "var(--brand-cream)",
                color: "var(--brand-maroon-dark)",
                boxShadow: "0 14px 35px rgba(0,0,0,0.3)",
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: 15,
                fontWeight: 500,
                whiteSpace: "nowrap",
                zIndex: 10,
                borderRadius: 4,
              }}
            >
              fun → passion
            </div>
          </div>

          <div style={{ width: "clamp(200px, 20vw, 270px)", textAlign: "left" }}>
            <p style={{
              color: "#d1afa4",
              fontSize: 14.5,
              lineHeight: 1.75,
              margin: "0 0 12px",
            }}>
              A space where every wedding gets to tell its own story, in its own way.
            </p>
            <div
              className="end-sig"
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "clamp(28px, 3.2vw, 38px)",
                fontWeight: 500,
                color: "var(--brand-cream)",
                lineHeight: 1.15,
              }}
            >
              I&apos;m Devarsh Jain.
            </div>
          </div>
        </div>
      </div>

      {/* Footer line */}
      <div style={{
        position: "relative", zIndex: 2,
        marginTop: "clamp(60px, 9vw, 120px)",
        paddingTop: 22,
        borderTop: "1px solid rgba(255,246,231,0.12)",
        display: "flex",
        justifyContent: "space-between",
        fontFamily: "var(--font-mono)", fontSize: 10,
        letterSpacing: "0.18em", textTransform: "uppercase",
        color: "#b99186",
      }}>
        <span>EVERY WEDDING HAS A STORY.</span>
        <span>SHAADI PITARA · WEDDING SOCIAL MEDIA</span>
      </div>
    </section>
  );
}
