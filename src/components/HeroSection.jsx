"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  const secRef = useRef(null);
  const badgeRef = useRef(null);
  const h1Ref = useRef(null);
  const subRef = useRef(null);
  const btnsRef = useRef(null);
  const videoRef = useRef(null);
  const logoRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.registerPlugin(ScrollTrigger);
      const tl = gsap.timeline({ delay: 0.4 });

      // Logo reveal
      tl.from(logoRef.current, {
        scale: 0.85, opacity: 0, duration: 0.9, ease: "power3.out",
      });

      // Badge
      tl.from(badgeRef.current, {
        y: 16, opacity: 0, duration: 0.7, ease: "power3.out",
      }, "-=0.5");

      // Heading lines with character animation
      const lines = h1Ref.current?.querySelectorAll(".hl") || [];
      const charTargets = [];
      const blockTargets = [];

      lines.forEach((line) => {
        if (line.classList.contains("feeling-text")) {
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
        yPercent: 110, opacity: 0, duration: 0.65, stagger: 0.018, ease: "power4.out",
      }, "-=0.2")
      .from(blockTargets, {
        yPercent: 70, opacity: 0, duration: 0.75, ease: "power3.out",
      }, "-=0.5")
      .from(subRef.current, {
        y: 14, opacity: 0, duration: 0.7, ease: "power3.out",
      }, "-=0.35")
      .from(btnsRef.current?.children, {
        y: 14, opacity: 0, duration: 0.6, stagger: 0.1, ease: "power3.out",
      }, "-=0.3");

      // Ken Burns subtle zoom on background image
      if (bgRef.current) {
        gsap.to(bgRef.current, {
          scale: 1.06,
          duration: 25,
          ease: "none",
          repeat: -1,
          yoyo: true,
        });
      }

      // Scroll parallax — fade out hero
      ScrollTrigger.create({
        trigger: secRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
        onUpdate: (self) => {
          if (!secRef.current) return;
          gsap.set(secRef.current, {
            opacity: 1 - self.progress * 1.2,
          });
        },
      });
    }, secRef);

    return () => ctx.revert();
  }, []);

  const bgRef = useRef(null);

  return (
    <section
      ref={secRef}
      id="hero"
      aria-label="Hero — Shaadi Pitara Wedding Content Studio"
      style={{
        position: "relative",
        minHeight: "100vh",
        height: "100vh",
        overflow: "hidden",
        background: "var(--brand-maroon-dark)",
      }}
    >
      {/* Background image — covers entire hero */}
      <div
        ref={bgRef}
        aria-hidden="true"
        style={{
          position: "absolute", inset: "-5%",
          width: "110%", height: "110%",
          zIndex: 1,
          backgroundImage: `url('/herobg.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Deep maroon gradient overlay — fades right to keep left-side depth */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none",
          background: "linear-gradient(to right, rgba(46,10,13,0.96) 0%, rgba(46,10,13,0.88) 28%, rgba(46,10,13,0.6) 50%, rgba(46,10,13,0.15) 80%, rgba(46,10,13,0.0) 100%)",
        }}
      />

      {/* Bottom fade */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none",
          background: "linear-gradient(to bottom, rgba(46,10,13,0.3) 0%, transparent 30%, transparent 65%, rgba(46,10,13,0.65) 100%)",
        }}
      />

      {/* Subtle vignette */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none",
          background: "radial-gradient(ellipse at center, transparent 40%, rgba(26,5,7,0.55) 100%)",
        }}
      />

      {/* Film grain texture */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute", inset: 0, zIndex: 3, pointerEvents: "none",
          opacity: 0.04,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "128px 128px",
        }}
      />

      {/* Scalloped corner cutout — bottom-right */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute", bottom: 0, right: 0,
          zIndex: 4, pointerEvents: "none",
          width: "50%", height: "16%",
        }}
      >
        <svg viewBox="0 0 400 80" preserveAspectRatio="none" style={{ width: "100%", height: "100%", display: "block" }}>
          <path d="M0,80 L0,28 Q28,28 40,18 Q55,6 72,18 Q88,28 108,26 Q128,24 140,18 Q155,8 175,16 Q195,26 210,28 Q230,25 245,16 Q260,8 280,18 Q300,28 320,26 L400,26 L400,80 Z"
            fill="var(--brand-maroon-dark)" opacity="0.85" />
          <path d="M0,80 L0,38 Q22,38 36,30 Q50,22 70,30 Q88,38 108,36 Q128,34 140,28 Q155,20 175,26 Q195,34 210,36 Q230,33 248,26 Q262,20 282,28 Q300,38 325,36 L400,36 L400,80 Z"
            fill="var(--brand-maroon-dark)" opacity="0.55" />
        </svg>
      </div>

      {/* Right-edge decorative labels */}
      <div className="hidden lg:flex" aria-hidden="true" style={{
        position: "absolute", right: 36, top: "50%",
        transform: "translateY(-50%)",
        zIndex: 5, flexDirection: "column", gap: 32, pointerEvents: "none",
      }}>
        {["STORIES", "MOMENTS", "TRADITIONS", "FOREVER"].map((label) => (
          <span key={label} style={{
            fontFamily: "var(--font-mono)", fontSize: 9,
            letterSpacing: "0.3em", textTransform: "uppercase",
            color: "rgba(245,230,204,0.12)",
            writingMode: "vertical-rl",
          }}>{label}</span>
        ))}
      </div>

      {/* ── Main content — aligned to the RIGHT ── */}
      <div style={{
        position: "absolute", inset: 0,
        zIndex: 5,
        display: "flex", flexDirection: "row",
        alignItems: "center", justifyContent: "flex-end",
      }}>
        <div style={{
          maxWidth: 620,
          padding: "0 clamp(20px, 5vw, 60px) 0 clamp(20px, 4vw, 48px)",
          textAlign: "right",
        }}>

          {/* Logo mark */}
          <div ref={logoRef} style={{ marginBottom: 28, display: "flex", justifyContent: "flex-end" }}>
            <div style={{
              position: "relative",
              width: 44, height: 44,
              borderRadius: 10,
              overflow: "hidden",
              border: "1px solid rgba(200,155,93,0.25)",
            }}>
              <Image
                src="/1.jpg"
                alt="Shaadi Pitara"
                fill
                sizes="44px"
                style={{ objectFit: "cover" }}
                priority
              />
            </div>
          </div>

          {/* Eyebrow */}
          <div ref={badgeRef} style={{
            display: "flex", alignItems: "center", gap: 10,
            marginBottom: 28,
            justifyContent: "flex-end",
          }}>
            <span style={{
              fontFamily: "var(--font-mono)", fontSize: 10,
              letterSpacing: "0.3em", textTransform: "uppercase",
              color: "var(--brand-gold)",
            }}>
              Wedding Stories · Real Emotions
            </span>
            <span style={{ width: 28, height: 1, background: "var(--brand-gold)", display: "block" }} />
          </div>

          {/* H1 */}
          <div ref={h1Ref} style={{ overflow: "hidden", marginBottom: 20 }}>
            <h1 style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.4rem, 5.5vw, 4.4rem)",
              lineHeight: "1.05",
              fontWeight: 300,
              color: "var(--brand-cream)",
              letterSpacing: "-0.01em",
            }}>
              <span className="hl" style={{ display: "block" }}>We craft</span>
              <span className="hl" style={{
                display: "block",
                fontStyle: "italic",
                fontWeight: 400,
                margin: "0.05em 0",
              }}>cinematic wedding</span>
              <span className="hl" style={{ display: "block" }}>stories that last</span>
            </h1>
          </div>

          {/* Subtext */}
          <div ref={subRef} style={{
            fontFamily: "var(--font-body)",
            fontSize: "clamp(14px, 1.3vw, 16px)",
            color: "rgba(245,230,204,0.55)",
            lineHeight: 1.7,
            maxWidth: 440,
            marginLeft: "auto",
            marginBottom: 36,
          }}>
            Premium wedding reels, live stories, and social content — captured by Devarsh Jain in Ahmedabad.
          </div>

          {/* CTA buttons */}
          <div ref={btnsRef} style={{ display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "flex-end" }}>
            <Link href="#reels" className="btn-primary">
              Watch Our Work
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <Link href="#story" className="btn-secondary">
              Our Story
            </Link>
          </div>

          {/* ── "a feeling" — distinctive typographic accent ── */}
          <div style={{
            marginTop: 40,
            display: "flex", alignItems: "center",
            justifyContent: "flex-end", gap: 12,
          }}>
            <span style={{
              width: 32, height: 1,
              background: "linear-gradient(to right, transparent, var(--brand-gold))",
              display: "block",
            }} />
            <span
              className="feeling-text"
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "clamp(1.4rem, 2.2vw, 1.9rem)",
                fontWeight: 500,
                fontStyle: "italic",
                color: "var(--brand-gold)",
                letterSpacing: "0.08em",
                textDecoration: "underline",
                textDecorationColor: "rgba(200,155,93,0.35)",
                textDecorationThickness: "1px",
                textUnderlineOffset: "6px",
                opacity: 0.9,
              }}
            >
              a feeling
            </span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div aria-hidden="true" style={{
        position: "absolute", bottom: 32, left: "50%",
        transform: "translateX(-50%)",
        zIndex: 5, display: "flex", flexDirection: "column",
        alignItems: "center", gap: 8,
        opacity: 0.5,
      }}>
        <span style={{
          fontFamily: "var(--font-mono)", fontSize: 9,
          letterSpacing: "0.25em", textTransform: "uppercase",
          color: "var(--brand-gold)",
        }}>Scroll</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--brand-gold)" strokeWidth={1.5}
          style={{ animation: "scrollFloat 2s ease-in-out infinite" }}>
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </div>
    </section>
  );
}
