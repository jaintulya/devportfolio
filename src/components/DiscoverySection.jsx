"use client";
import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function DiscoverySection() {
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
      if (!headRef.current) return;
      const lines = headRef.current.querySelectorAll(".d-line");

      lines.forEach((line, i) => {
        const inner = line.querySelector(".d-inner");
        if (!inner) return;
        gsap.fromTo(inner,
          { yPercent: 110, opacity: 0 },
          {
            yPercent: 0, opacity: 1,
            duration: 1.1,
            delay: i * 0.18,
            ease: "cubic-bezier(0.2, 0.8, 0.2, 1)",
            scrollTrigger: { trigger: secRef.current, start: "top 72%" },
          }
        );
      });

      const p = headRef.current.querySelector(".d-sub");
      if (p) {
        gsap.fromTo(p,
          { y: 18, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 1,
            delay: 0.45,
            ease: "power3.out",
            scrollTrigger: { trigger: secRef.current, start: "top 70%" },
          }
        );
      }
    }, secRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      id="discovery"
      ref={secRef}
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        background: "#F4E2C5",
        textAlign: "center",
        padding: "clamp(80px, 10vw, 140px) clamp(16px, 4vw, 48px)",
        position: "relative",
      }}
    >
      <div style={{ maxWidth: 1000, margin: "auto" }}>
        <div
          ref={headRef}
          style={{
            fontFamily: "var(--font-mono)", fontSize: 10,
            letterSpacing: "0.18em", textTransform: "uppercase",
            color: "#9E776A",
            marginBottom: 28,
          }}
        >
          THE TURNING POINT
        </div>

        <h2 style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontWeight: 500,
          fontSize: "clamp(52px, 8vw, 118px)",
          lineHeight: 0.84,
          letterSpacing: "-0.045em",
          margin: "0 0 36px",
          color: "var(--brand-maroon-dark)",
        }}>
          <span className="d-line" style={{ display: "block", overflow: "hidden" }}>
            <span className="d-inner" style={{ display: "block" }}>
              And then, I discovered
            </span>
          </span>
          <span className="d-line" style={{ display: "block", overflow: "hidden" }}>
            <span className="d-inner" style={{ display: "block", fontStyle: "italic", color: "#7C292D" }}>
              wedding social media.
            </span>
          </span>
        </h2>

        <p
          className="d-sub"
          style={{
            maxWidth: 660, color: "#9E776A",
            fontSize: 15, lineHeight: 1.9, margin: "0 auto",
          }}
        >
          It immediately felt different. A wedding photographer captures the
          beautiful, important moments. I kept noticing the world happening around
          those perfect frames.
        </p>
      </div>
    </section>
  );
}
