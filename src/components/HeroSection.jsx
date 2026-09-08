"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const secRef = useRef(null);
  const badgeRef = useRef(null);
  const h1Ref = useRef(null);
  const subRef = useRef(null);
  const btnsRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.registerPlugin(ScrollTrigger);
      const tl = gsap.timeline({ delay: 0.5 });

      tl.from(badgeRef.current, {
        y: 18, opacity: 0, duration: 0.8, ease: "power3.out",
      }, 0);

      const lines = h1Ref.current?.querySelectorAll(".hl") || [];
      const charTargets = [];
      const blockTargets = [];

      lines.forEach((line) => {
        if (line.dataset.block) {
          blockTargets.push(line);
          return;
        }
        const text = line.textContent;
        if (!text) return;
        line.innerHTML = "";
        text.split("").forEach((ch) => {
          const span = document.createElement("span");
          span.textContent = ch === " " ? "\u00A0" : ch;
          span.style.display = "inline-block";
          span.style.willChange = "transform, opacity";
          line.appendChild(span);
          charTargets.push(span);
        });
      });

      tl.from(charTargets, {
        yPercent: 110, opacity: 0, duration: 0.7, stagger: 0.022, ease: "power4.out",
      }, "-=0.15")
      .from(blockTargets, {
        yPercent: 50, opacity: 0, duration: 0.85, ease: "power3.out",
      }, "-=0.5")
      .from(subRef.current, {
        y: 14, opacity: 0, duration: 0.8, ease: "power3.out",
      }, "-=0.35")
      .from(btnsRef.current?.children, {
        y: 14, opacity: 0, duration: 0.7, stagger: 0.12, ease: "power3.out",
      }, "-=0.3");

      const bgEl = document.querySelector('[data-hero-bg]');
      if (bgEl) {
        gsap.to(bgEl, {
          scale: 1.06,
          duration: 30,
          ease: "none",
          repeat: -1,
          yoyo: true,
        });
      }

      ScrollTrigger.create({
        trigger: secRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1.2,
        onUpdate: (self) => {
          if (!secRef.current) return;
          gsap.set(secRef.current, { opacity: 1 - self.progress * 1.1 });
        },
      });
    }, secRef);

    return () => ctx.revert();
  }, []);

  const scrollTo = (targetId) => {
    const el = document.querySelector(targetId);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const bgImage = isMobile ? "url('/herobgphone.png')" : "url('/herobg.png')";
  const bgSize = "cover";
  const bgPosition = isMobile ? "center top" : "center";
  const bgInset = isMobile ? "0" : "-5%";
  const bgWidth = isMobile ? "100%" : "110%";
  const bgHeight = isMobile ? "100%" : "110%";

  return (
    <section
      ref={secRef}
      id="hero"
      aria-label="Hero — Shaadi Pitara Wedding Content Studio"
      style={{
        position: "relative",
        minHeight: "100vh",
        height: "100vh",
        height: "100dvh",
        overflow: "hidden",
        background: "var(--brand-maroon-dark)",
      }}
    >
      <div
        data-hero-bg
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: bgInset,
          width: bgWidth,
          height: bgHeight,
          zIndex: 1,
          backgroundImage: bgImage,
          backgroundSize: bgSize,
          backgroundPosition: bgPosition,
          backgroundRepeat: "no-repeat",
          willChange: "transform",
        }}
      />

      <div
        aria-hidden="true"
        style={{
          position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none",
          background: isMobile
            ? "linear-gradient(to bottom, rgba(26,5,7,0.2) 0%, rgba(26,5,7,0.08) 30%, rgba(26,5,7,0.55) 55%, rgba(26,5,7,0.85) 100%)"
            : "linear-gradient(to right, rgba(26,5,7,0.82) 0%, rgba(26,5,7,0.68) 22%, rgba(26,5,7,0.40) 45%, rgba(26,5,7,0.12) 65%, rgba(26,5,7,0.0) 82%)",
        }}
      />

      <div
        aria-hidden="true"
        style={{
          position: "absolute", inset: 0, zIndex: 3, pointerEvents: "none",
          background: "radial-gradient(ellipse at 55% 40%, transparent 30%, rgba(26,5,7,0.55) 100%)",
        }}
      />

      <div style={{
        position: "absolute", inset: 0,
        zIndex: 5,
        display: "flex", flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: isMobile ? "center" : "flex-end",
        paddingTop: isMobile ? "10%" : "clamp(100px, 22vh, 220px)",
        paddingBottom: isMobile ? "10%" : "clamp(80px, 14vh, 160px)",
      }}>
        <div style={{
          width: "100%",
          maxWidth: 720,
          padding: isMobile ? "0 24px" : "0 clamp(48px, 10vw, 140px)",
        }}>
          <div style={{
            maxWidth: 560,
            marginLeft: "auto",
            marginRight: isMobile ? "auto" : 0,
            textAlign: isMobile ? "center" : "left",
          }}>
            <div ref={badgeRef} style={{
              display: "flex", alignItems: "center", gap: 12,
              marginBottom: 32,
              justifyContent: isMobile ? "center" : "flex-start",
              opacity: 0,
            }}>
              <span style={{
                fontFamily: "var(--font-body)", fontSize: 11,
                letterSpacing: "0.32em", textTransform: "uppercase",
                color: "rgba(247,230,204,0.8)", fontWeight: 500,
              }}>
                Real Moments. Forever.
              </span>
            </div>

            <div ref={h1Ref} style={{ overflow: "visible", marginBottom: 28 }}>
              <h1 style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "clamp(2.8rem, 6vw, 5.4rem)",
                lineHeight: "1.12",
                fontWeight: 400,
                color: "var(--brand-cream)",
                letterSpacing: "-0.02em",
                maxWidth: 560,
              }}>
                <span className="hl" style={{ display: "block", opacity: 0 }}>More Than</span>
                <span className="hl" style={{ display: "block", margin: "0.04em 0", opacity: 0 }}>Weddings.</span>
                <span className="hl" data-block="1" style={{
                  display: "block",
                  fontStyle: "italic",
                  fontWeight: 500,
                  color: "rgba(212,184,150,0.92)",
                  marginTop: "0.12em",
                  lineHeight: "1.2",
                  opacity: 0,
                }}>A Feeling.</span>
              </h1>
            </div>

            <div ref={subRef} style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(15px, 1.3vw, 17px)",
              color: "rgba(247,230,204,0.55)",
              lineHeight: 1.7,
              maxWidth: 420,
              marginLeft: isMobile ? "auto" : 0,
              marginRight: isMobile ? "auto" : 0,
              marginBottom: 44,
              fontWeight: 300,
              opacity: 0,
            }}>
              We turn your wedding moments into stories worth remembering.
            </div>

            <div ref={btnsRef} style={{
              display: "flex", gap: 14,
              flexWrap: isMobile ? "column" : "wrap",
              alignItems: isMobile ? "stretch" : "flex-start",
              justifyContent: isMobile ? "center" : "flex-start",
              opacity: 0,
            }}>
              <button
                onClick={() => scrollTo("#reels")}
                className="btn-primary"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 10,
                  padding: "clamp(15px, 2vw, 18px) clamp(28px, 3.2vw, 40px)",
                  fontSize: 11, letterSpacing: "0.18em", fontWeight: 600,
                  width: isMobile ? "100%" : "auto", justifyContent: "center",
                  borderRadius: 0,
                }}
              >
                Explore Our Work
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
              <button
                onClick={() => scrollTo("#contact")}
                className="btn-secondary"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 10,
                  padding: "clamp(15px, 2vw, 18px) clamp(28px, 3.2vw, 40px)",
                  fontSize: 11, letterSpacing: "0.18em", fontWeight: 600,
                  width: isMobile ? "100%" : "auto", justifyContent: "center",
                  borderRadius: 0,
                }}
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>

      <div aria-hidden="true" style={{
        position: "absolute", bottom: 28, left: "50%",
        transform: "translateX(-50%)",
        zIndex: 5, display: "flex", flexDirection: "column",
        alignItems: "center", gap: 6,
        opacity: 0.4,
      }}>
        <span style={{
          fontFamily: "var(--font-body)", fontSize: 9,
          letterSpacing: "0.25em", textTransform: "uppercase",
          color: "rgba(247,230,204,0.6)", fontWeight: 500,
        }}>
          Scroll
        </span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(247,230,204,0.5)" strokeWidth={1.5}
          style={{ animation: "scrollFloat 2s ease-in-out infinite" }}>
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </div>
    </section>
  );
}
