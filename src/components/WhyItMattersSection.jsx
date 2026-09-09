"use client";
import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function WhyItMattersSection() {
  const secRef = useRef(null);
  const headRef = useRef(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Line reveals */
      const lines = headRef.current?.querySelectorAll(".wh-line");
      lines?.forEach((line, i) => {
        const inner = line.querySelector(".wh-inner");
        if (!inner) return;
        gsap.fromTo(inner,
          { yPercent: 110, opacity: 0 },
          {
            yPercent: 0, opacity: 1,
            duration: 1.1,
            delay: i * 0.18,
            ease: "cubic-bezier(0.2, 0.8, 0.2, 1)",
            scrollTrigger: { trigger: secRef.current, start: "top 78%" },
          }
        );
      });

      const p = headRef.current?.querySelector(".wh-sub");
      if (p) {
        gsap.fromTo(p,
          { y: 18, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 1,
            delay: 0.4,
            ease: "power3.out",
            scrollTrigger: { trigger: secRef.current, start: "top 75%" },
          }
        );
      }
    }, secRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      id="why-it-matters"
      ref={secRef}
      style={{
        background: "var(--brand-ivory)",
        padding: "clamp(80px, 11vw, 160px) clamp(16px, 4vw, 48px)",
      }}
    >
      <div
        ref={headRef}
        style={{
          maxWidth: 1180,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "minmax(140px, .32fr) minmax(280px, 1fr)",
          gap: "clamp(24px, 7vw, 80px)",
          alignItems: "start",
        }}
      >
        {/* Left label */}
        <div style={{
          fontFamily: "var(--font-mono)", fontSize: 10,
          letterSpacing: "0.18em", textTransform: "uppercase",
          color: "#9E776A",
          paddingTop: 6,
        }}>
          WHY IT MATTERS
        </div>

        {/* Right copy */}
        <div>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontWeight: 500,
            fontSize: "clamp(48px, 7vw, 100px)",
            lineHeight: 0.86,
            letterSpacing: "-0.04em",
            margin: "0 0 28px",
            color: "var(--brand-maroon-dark)",
          }}>
            <span className="wh-line" style={{ display: "block", overflow: "hidden" }}>
              <span className="wh-inner" style={{ display: "block" }}>
                Not just how it <span style={{ color: "var(--brand-gold)", fontStyle: "italic" }}>looked.</span>
              </span>
            </span>
            <span className="wh-line" style={{ display: "block", overflow: "hidden" }}>
              <span className="wh-inner" style={{ display: "block" }}>
                How it <em style={{ color: "var(--brand-gold)", fontStyle: "italic" }}>felt.</em>
              </span>
            </span>
          </h2>

          <p
            className="wh-sub"
            style={{
              maxWidth: 700,
              color: "#9E776A",
              fontSize: 15,
              lineHeight: 1.9,
              margin: 0,
            }}
          >
            Months or even years later, you can go back to those stories and relive
            the wedding exactly as it felt — not just how it looked. That thought
            became the foundation of Shaadi Pitara.
          </p>
        </div>
      </div>
    </section>
  );
}
