"use client";
import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function PhilosophySection() {
  const secRef = useRef(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const lines = secRef.current?.querySelectorAll(".ph-line");
      lines?.forEach((line, i) => {
        const inner = line.querySelector(".ph-inner");
        if (!inner) return;
        gsap.fromTo(inner,
          { yPercent: 110, opacity: 0 },
          {
            yPercent: 0, opacity: 1,
            duration: 1.1,
            delay: i * 0.20,
            ease: "cubic-bezier(0.2, 0.8, 0.2, 1)",
            scrollTrigger: { trigger: secRef.current, start: "top 75%" },
          }
        );
      });

      // Accent word glow — appears slightly after its line
      const accents = secRef.current?.querySelectorAll(".ph-accent");
      accents?.forEach((el, i) => {
        gsap.fromTo(el,
          { opacity: 0 },
          {
            opacity: 1, duration: 1.2,
            delay: 0.9 + i * 0.25,
            ease: "power2.out",
            scrollTrigger: { trigger: secRef.current, start: "top 70%" },
          }
        );
      });

      const sub = secRef.current?.querySelector(".ph-sub");
      if (sub) {
        gsap.fromTo(sub,
          { y: 18, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 1,
            delay: 0.55,
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
      id="philosophy"
      ref={secRef}
      style={{
        minHeight: "90vh",
        background: "#F4E2C5",
        display: "grid",
        placeItems: "center",
        textAlign: "center",
        padding: "clamp(80px, 11vw, 160px) clamp(16px, 4vw, 48px)",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "auto" }}>
        <div style={{
          fontFamily: "var(--font-mono)", fontSize: 10,
          letterSpacing: "0.18em", textTransform: "uppercase",
          color: "#9E776A",
          marginBottom: 28,
        }}>
          THE IDEA
        </div>

        <h2 style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontWeight: 500,
          fontSize: "clamp(52px, 8vw, 116px)",
          lineHeight: 0.86,
          letterSpacing: "-0.045em",
          margin: "0 0 36px",
          color: "var(--brand-maroon-dark)",
        }}>
          <span className="ph-line" style={{ display: "block", overflow: "hidden" }}>
            <span className="ph-inner" style={{ display: "block" }}>
              We don&apos;t just capture the{" "}
              <span className="ph-accent" style={{ fontStyle: "italic", color: "#7C292D" }}>moment.</span>
            </span>
          </span>
          <span className="ph-line" style={{ display: "block", overflow: "hidden" }}>
            <span className="ph-inner" style={{ display: "block" }}>
              We capture the
            </span>
          </span>
          <span className="ph-line" style={{ display: "block", overflow: "hidden" }}>
            <span className="ph-inner" style={{ display: "block" }}>
              <span className="ph-accent" style={{ fontStyle: "italic", color: "#7C292D" }}>story behind</span> it.
            </span>
          </span>
        </h2>

        <p
          className="ph-sub"
          style={{
            maxWidth: 680, color: "#9E776A",
            fontSize: 15, lineHeight: 1.9, margin: "0 auto",
          }}
        >
          Our content is raw, real, spontaneous and alive — the emotional, fun and
          candid side that might never make the final wedding album, but is often
          what people remember most.
        </p>
      </div>
    </section>
  );
}
