"use client";
import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const moments = [
  { key: "chaos",  label: "The chaos",       detail: "The behind-the-scenes rush and imperfect little moments nobody planned." },
  { key: "laugh",  label: "The laughter",    detail: "Friends laughing between shots — the real moments behind the posed ones." },
  { key: "nerves", label: "The nervousness", detail: "That quiet nervousness before an entry, a ritual, or a life-changing moment." },
  { key: "parents",label: "The parents",     detail: "Parents getting emotional, proud and overwhelmed outside the perfect frame." },
  { key: "cousins",label: "The cousins",     detail: "Cousins dancing when nobody is watching and making memories of their own." },
  { key: "talks",  label: "The conversations", detail: "Tiny conversations that feel ordinary then, but become priceless later." },
  { key: "madness",label: "The madness",     detail: "The beautiful madness that makes a wedding feel alive." },
  { key: "happy",  label: "The happiness",   detail: "All the little pieces together — the feeling that makes a wedding a wedding." },
];

export default function BehindTheScenesSection() {
  const secRef = useRef(null);
  const headRef = useRef(null);
  const detailRef = useRef(null);
  const [active, setActive] = useState("chaos");
  const [isTransitioning, setIsTransitioning] = useState(false);

  /* ─── Entrance animation ─── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headRef.current) {
        gsap.from(headRef.current, {
          y: 44, opacity: 0, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: headRef.current, start: "top 82%" },
        });
      }
      document.querySelectorAll(".moment-pill").forEach((btn, i) => {
        gsap.from(btn, {
          y: 20, opacity: 0, duration: 0.65,
          delay: i * 0.05,
          ease: "power2.out",
          scrollTrigger: { trigger: secRef.current, start: "top 82%" },
        });
      });
    }, secRef);
    return () => ctx.revert();
  }, []);

  /* ─── Moment pill click — animated detail transition ─── */
  const selectMoment = (key) => {
    if (key === active || isTransitioning) return;
    setIsTransitioning(true);
    setActive(key);

    // Fade out old text
    if (detailRef.current) {
      gsap.to(detailRef.current, {
        opacity: 0,
        y: -10,
        filter: "blur(3px)",
        duration: 0.28,
        ease: "power2.in",
        onComplete: () => {
          // Swap text and fade in
          const m = moments.find((x) => x.key === key);
          if (m && detailRef.current) {
            detailRef.current.textContent = m.detail;
          }
          gsap.to(detailRef.current, {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.45,
            ease: "power2.out",
            onComplete: () => setIsTransitioning(false),
          });
        },
      });
    }
  };

  const activeDetail = moments.find((m) => m.key === active)?.detail ?? "";

  return (
    <section
      id="moments"
      ref={secRef}
      style={{
        background: "#FFF6E7",
        padding: "clamp(80px, 12vw, 160px) clamp(16px, 4vw, 48px)",
        color: "var(--brand-maroon-dark)",
      }}
    >
      <div style={{
        maxWidth: 1180, margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "minmax(260px, .72fr) minmax(280px, 1fr)",
        gap: "clamp(24px, 7vw, 80px)",
        alignItems: "start",
      }}>
        {/* Left — sticky editorial copy */}
        <div style={{ position: "sticky", top: "15vh" }}>
          <div
            ref={headRef}
            style={{
              fontFamily: "var(--font-mono)", fontSize: 10,
              letterSpacing: "0.18em", textTransform: "uppercase",
              color: "#9E776A",
              marginBottom: 20,
            }}
          >
            THE MOMENTS BETWEEN
          </div>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontWeight: 500,
            fontSize: "clamp(48px, 7vw, 100px)",
            lineHeight: 0.86,
            letterSpacing: "-0.04em",
            margin: "0 0 20px",
            color: "var(--brand-maroon-dark)",
          }}>
            What makes a wedding{" "}
            <span style={{ color: "#7C292D", fontStyle: "italic" }}>feel like a wedding.</span>
          </h2>
          <p style={{
            color: "#9E776A",
            fontSize: 14, lineHeight: 1.9,
            maxWidth: 360, margin: 0,
          }}>
            The chaos behind the scenes. The laughter, nerves, parents, cousins,
            tiny conversations, madness and happiness — all the things that may
            never become the hero frame, but become the memory.
          </p>
        </div>

        {/* Right — moment pills grid */}
        <div>
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 12,
          }}>
            {moments.map((m) => (
              <button
                key={m.key}
                className="moment-pill"
                onClick={() => selectMoment(m.key)}
                style={{
                  position: "relative",
                  minHeight: 120,
                  border: "1px solid rgba(91,23,27,0.18)",
                  background: m.key === active ? "#3B0D10" : "#F4E2C5",
                  color: m.key === active ? "var(--brand-cream)" : "var(--brand-maroon-dark)",
                  padding: 20,
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "space-between",
                  cursor: "pointer",
                  overflow: "hidden",
                  textAlign: "left",
                  transition: "background 0.4s ease, color 0.4s ease, transform 0.4s cubic-bezier(0.2,0.8,0.2,1), box-shadow 0.4s ease",
                  transform: m.key === active ? "translateY(-4px)" : "none",
                  boxShadow: m.key === active ? "0 16px 36px rgba(91,23,27,0.22)" : "none",
                }}
                onMouseEnter={(e) => {
                  if (m.key !== active) {
                    e.currentTarget.style.transform = "translateY(-6px)";
                    e.currentTarget.style.boxShadow = "0 20px 40px rgba(91,23,27,0.14)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (m.key !== active) {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }
                }}
              >
                {/* Radial blob decoration */}
                <div style={{
                  position: "absolute", width: 120, height: 120,
                  borderRadius: "50%", right: -28, top: -28,
                  background: "#7C292D",
                  opacity: m.key === active ? 0.18 : 0.06,
                  transition: "opacity 0.4s ease, transform 0.5s ease",
                  transform: m.key === active ? "scale(2.8)" : "scale(1)",
                }} />
                <span style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontWeight: 500,
                  fontSize: 32,
                  lineHeight: 0.92,
                  position: "relative", zIndex: 2,
                  transition: "color 0.4s ease",
                }}>
                  {m.label}
                </span>
                <span style={{
                  position: "absolute", right: 18, top: 18,
                  fontSize: 14,
                  color: m.key === active ? "rgba(255,246,231,0.8)" : "rgba(91,23,27,0.35)",
                  transition: "transform 0.4s ease, color 0.4s ease",
                  transform: m.key === active ? "translate(3px,-3px)" : "none",
                  zIndex: 2,
                }}>
                  →
                </span>
              </button>
            ))}
          </div>

          {/* Detail text area */}
          <div style={{
            marginTop: 10,
            borderTop: "1px solid rgba(91,23,27,0.18)",
            paddingTop: 22,
            minHeight: 70,
          }}>
            <p
              ref={detailRef}
              style={{
                color: "#9E776A",
                fontSize: 15,
                lineHeight: 1.8,
                margin: 0,
              }}
            >
              {activeDetail}
            </p>
          </div>
        </div>
      </div>

      {/* Mobile: single column */}
      <style>{`
        @media (max-width: 768px) {
          section#moments > div {
            display: block !important;
          }
          section#moments > div > div:first-child {
            position: static !important;
            margin-bottom: 40px;
          }
          section#moments > div > div:last-child > div:first-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
