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
      {/* Radial glow */}
      <div aria-hidden="true" style={{
        position: "absolute", left: "50%", top: "50%",
        transform: "translate(-50%,-50%)",
        width: 600, height: 600, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(124,41,45,0.14) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{
        maxWidth: 1180, margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "minmax(280px, 1.6fr) minmax(220px, 1fr)",
        gap: "clamp(24px, 8vw, 80px)",
        alignItems: "end",
        position: "relative", zIndex: 2,
      }}>
        {/* Left — headline */}
        <h2 style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontWeight: 500,
          fontSize: "clamp(48px, 8vw, 116px)",
          lineHeight: 0.86,
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
              <span style={{ color: "#d5b3a8", fontStyle: "italic" }}>Shadi Pitara.</span>
            </span>
          </span>
        </h2>

        {/* Right — signature */}
        <div>
          <p style={{
            color: "#d1afa4",
            fontSize: 15, lineHeight: 1.9,
            margin: "0 0 24px",
          }}>
            A space where every wedding gets to tell its own story, in its own way.
          </p>
          <div
            className="end-sig"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "clamp(32px, 4vw, 42px)",
              fontWeight: 500,
              color: "var(--brand-cream)",
              lineHeight: 1.2,
            }}
          >
            I&apos;m Devarsh Jain.
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
        <span>SHADI PITARA · WEDDING SOCIAL MEDIA</span>
      </div>
    </section>
  );
}
