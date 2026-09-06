"use client";
import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const btsImages = [
  {
    src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=800&fit=crop",
    caption: "Golden hour setup",
  },
  {
    src: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&h=800&fit=crop",
    caption: "Getting ready moments",
  },
  {
    src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&h=800&fit=crop",
    caption: "The ceremony",
  },
  {
    src: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&h=800&fit=crop",
    caption: "Final frames",
  },
  {
    src: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=600&h=800&fit=crop",
    caption: "Dancefloor energy",
  },
  {
    src: "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?w=600&h=800&fit=crop",
    caption: "Raw emotions",
  },
];

function BTSCard({ img, index }) {
  const cardRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      style={{
        overflow: "hidden",
        borderRadius: 12,
        position: "relative",
        background: "var(--brand-maroon-dark)",
        border: "1px solid rgba(200,155,93,0.08)",
        aspectRatio: "3/4",
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(24px)",
        transition: "all 0.8s cubic-bezier(0.23,1,0.32,1)",
        transitionDelay: `${index * 0.1}s`,
      }}
    >
      {/* Grain overlay */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none",
        background: "linear-gradient(180deg, rgba(200,155,93,0.05) 0%, transparent 30%, transparent 70%, rgba(200,155,93,0.03) 100%)",
        mixBlendMode: "overlay",
      }} />

      <img
        src={img.src}
        alt={img.caption}
        loading="lazy"
        decoding="async"
        style={{
          width: "100%", height: "100%",
          objectFit: "cover",
          display: "block",
          transition: "transform 0.7s cubic-bezier(0.23,1,0.32,1)",
        }}
      />

      {/* Caption */}
      <div style={{
        position: "absolute",
        bottom: 14, left: 16, zIndex: 4,
        fontFamily: "var(--font-mono)", fontSize: 9,
        letterSpacing: "0.2em", textTransform: "uppercase",
        color: "rgba(200,155,93,0.75)",
        background: "rgba(46,10,13,0.5)",
        backdropFilter: "blur(6px)",
        padding: "4px 10px",
        borderRadius: 4,
        border: "1px solid rgba(200,155,93,0.12)",
      }}>
        {img.caption}
      </div>
    </div>
  );
}

export default function BehindTheScenesSection() {
  const secRef = useRef(null);
  const headRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headRef.current, {
        y: 50, opacity: 0, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: headRef.current, start: "top 80%" },
      });
    }, secRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="behind-the-scenes"
      ref={secRef}
      aria-label="Behind the Scenes"
      style={{
        padding: "clamp(80px, 10vw, 140px) clamp(16px, 4vw, 48px)",
        background: "var(--brand-beige-muted)",
        position: "relative",
      }}
    >
      {/* Subtle dot texture */}
      <div aria-hidden="true" style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: `radial-gradient(rgba(94, 24, 28, 0.04) 1px, transparent 1px)`,
        backgroundSize: "28px 28px",
      }} />

      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        {/* Header */}
        <div
          ref={headRef}
          style={{ textAlign: "center", marginBottom: "clamp(48px, 7vw, 72px)" }}
        >
          <div className="eyebrow-label" style={{ justifyContent: "center", color: "var(--brand-maroon)" }}>
            <span style={{ background: "var(--brand-maroon)", display: "block" }} />
            Behind the Scenes
            <span style={{ background: "var(--brand-maroon)", display: "block" }} />
          </div>
          <h2 className="section-heading section-heading-light">
            The Magic Happens Here
          </h2>
          <p style={{
            fontFamily: "var(--font-body)",
            fontSize: "clamp(14px, 1.4vw, 16px)",
            color: "rgba(58,13,16,0.5)",
            marginTop: 12,
            maxWidth: 480,
            margin: "12px auto 0",
            lineHeight: 1.7,
          }}>
            A curated glimpse into the moments between the frames.
          </p>
        </div>

        {/* Grid — 3 columns desktop, 2 mobile */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "clamp(12px, 1.5vw, 20px)",
          }}
          className="bts-grid-desktop"
        >
          <style>{`
            @media (max-width: 767px) {
              .bts-grid-desktop {
                grid-template-columns: repeat(2, 1fr) !important;
              }
            }
          `}</style>

          {btsImages.map((img, idx) => (
            <div key={idx} style={{ borderRadius: 12, overflow: "hidden", position: "relative" }}>
              <BTSCard img={img} index={idx} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
