"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";

const STORY_DURATION = 7000;

const cardsData = [
  {
    id: 1,
    chapter: "CHAPTER 01",
    tag: "THE SPARK · 2018",
    heading: "It all began with an instinct to freeze everyday magic.",
    highlight: "\u201cNo fancy rigs. Just raw curiosity and an eye for moments nobody else noticed.\u201d",
    content: "Before weddings, there was an obsession with observation. I walked around Ahmedabad with my phone, using Snapchat and simple cuts to stitch together fleeting slices of life. I discovered that even an ordinary evening feels like cinema when timed to the right heartbeat.",
    memoryPills: ["Phone Lens Only", "Zero Budget"],
    badge: "The First Frame",
  },
  {
    id: 2,
    chapter: "CHAPTER 02",
    tag: "FIRST PRAISE · 2019",
    heading: "Then friends started leaning in and watching closely.",
    highlight: "\u201cTu hi story laga diya kar, tere edit mein emotion dikhta hai.\u201d",
    content: "That one casual college compliment shifted my universe. Seeing classmates wait for my edits, replay them, and genuinely feel the music made me realize: this was never a fleeting hobby. It was the visual language I was meant to speak.",
    memoryPills: ["Campus Hallways", "First Timelines"],
    badge: "The Validation",
  },
  {
    id: 3,
    chapter: "CHAPTER 03",
    tag: "THE EVOLUTION · 2020",
    heading: "From casual fun to an all-consuming creative obsession.",
    highlight: "\u201cI didn\u2019t just want pretty pictures. I wanted people to relive the exact pulse.\u201d",
    content: "Sleepless nights studying cuts, soundtrack drops, acoustic pacing, and color palettes. I obsessed over why certain 10-second sequences bring goosebumps while others feel hollow. Every frame had to breathe with genuine human pulse.",
    memoryPills: ["Midnight Rhythms", "Beat Drops"],
    badge: "Fun to Obsession",
  },
  {
    id: 4,
    chapter: "CHAPTER 04",
    tag: "THE BREAKTHROUGH",
    heading: "During college, one single reel unexpectedly exploded.",
    highlight: "\u201cSeeing thousands of strangers feel something from what I made unlocked ultimate conviction.\u201d",
    content: "The screen wouldn\u2019t stop ringing. Shares, emotional DMs, and strangers telling me a 30-second video made them tear up proved one truth: authentic storytelling transcends any screen size. That night, I decided to go all in.",
    memoryPills: ["1M+ Organic Views", "Pan-India DMs"],
    badge: "The Breakthrough",
  },
  {
    id: 5,
    chapter: "CHAPTER 05",
    tag: "THE GRIND · 2021",
    heading: "Creating in chaotic, high-pressure restaurant kitchens.",
    highlight: "\u201cSizzling pans, tricky low-light, zero retakes: the ultimate training ground.\u201d",
    content: "I took projects with food creators and brands, shooting in boiling kitchens with seconds to catch the steam and sizzle. That relentless phase forged my speed, sharp reflexes, and intuitive framing, which would later become my superpower at weddings.",
    memoryPills: ["Zero Retakes", "High-Pressure Sets"],
    badge: "The Bootcamp",
  },
  {
    id: 6,
    chapter: "CHAPTER 06",
    tag: "THE TURNING POINT",
    heading: "Then, I stepped into my first Indian wedding.",
    highlight: "\u201cTraditional crews were staging poses. But who was preserving the unscripted heartbeat?\u201d",
    content: "I watched photographers direct stiff poses while the real wedding was happening elsewhere: the bride\u2019s deep breath behind the door, the grandmother quietly wiping a tear, the cousins laughing hysterically backstage. Those were the real memories slipping away unrecorded.",
    memoryPills: ["Staged vs Real", "Mandap Whispers"],
    badge: "The Revelation",
  },
  {
    id: 7,
    chapter: "CHAPTER 07",
    tag: "THE OTHER SIDE",
    heading: "The candid moments behind the moments.",
    highlight: "\u201cAll the spontaneous, imperfect madness that truly makes a celebration alive.\u201d",
    bullets: [
      "The chaotic laughter between childhood best friends",
      "Parents getting overwhelmed in quiet, unlit corners",
      "The fast heartbeat seconds before the bride\u2019s grand entry",
      "Cousins breaking into wild dance moves when cameras turn away",
    ],
    content: "Weddings aren\u2019t rehearsed movie sets; they are intense, beautiful emotional storms. Our lens lives right inside that storm, invisible yet deeply present.",
    badge: "Unfiltered Soul",
  },
  {
    id: 8,
    chapter: "CHAPTER 08",
    tag: "THE GENESIS",
    heading: "We don\u2019t just film weddings. We preserve the feeling.",
    highlight: "\u201cCinematic vertical reels delivered while your wedding is still unfolding.\u201d",
    content: "Why should couples wait 6 months for a standard film while the celebration\u2019s electricity is fresh right now? Shaadi Pitara was founded to deliver same-night cinematic reels that couples and guests can relive, cry to, and share with the world immediately.",
    memoryPills: ["9:16 Cinema", "Same-Night Delivery"],
    badge: "Shaadi Pitara Born",
  },
  {
    id: 9,
    chapter: "CHAPTER 09",
    tag: "THE SOUL",
    heading: "Not just how it looked. How it actually felt.",
    highlight: "\u201cYears or decades later, our reels transport you right back into that exact warmth.\u201d",
    content: "When you look back on your wedding after 20 years, you won\u2019t care about artificial poses. You\u2019ll want to hear your mother\u2019s laugh, see your partner\u2019s nervous smile, and feel that rush all over again. That sacred promise is what drives every film we craft.",
    memoryPills: ["Decades Later", "Emotional Audio"],
    badge: "Living Memories",
  },
  {
    id: 10,
    isDevarsh: true,
    chapter: "FOUNDER",
    tag: "THE PERSON BEHIND THE PITARA",
    name: "Devarsh Jain",
    role: "Founder \u00b7 Wedding Content Creator",
    highlight: "\u201cA love for capturing moments turned into a way of preserving how weddings actually feel.\u201d",
    content: "Traveling across India with a handheld camera and an open heart, crafting vertical cinema that celebrates who you truly are.",
    badge: "And this is only the beginning.",
  },
];

/* ── Progress bar (per-segment, RAF-based) ── */
function StoryProgressBar({ index, activeIndex, isPaused, onComplete }) {
  const rafRef = useRef(null);
  const startTimeRef = useRef(null);
  const elapsedRef = useRef(0);
  const [progress, setProgress] = useState(0);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    cancelAnimationFrame(rafRef.current);
    if (index === activeIndex) {
      setProgress(0);
      elapsedRef.current = 0;
      startTimeRef.current = null;
    } else {
      setProgress(index < activeIndex ? 1 : 0);
    }
  }, [activeIndex, index]);

  useEffect(() => {
    if (index !== activeIndex) return;
    if (isPaused) {
      cancelAnimationFrame(rafRef.current);
      if (startTimeRef.current !== null) {
        elapsedRef.current += performance.now() - startTimeRef.current;
        startTimeRef.current = null;
      }
      return;
    }
    const animate = (timestamp) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current + elapsedRef.current;
      const pct = Math.min(elapsed / STORY_DURATION, 1);
      setProgress(pct);
      if (pct < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        onCompleteRef.current();
      }
    };
    startTimeRef.current = null;
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [index, activeIndex, isPaused]);

  const isCurrent = index === activeIndex;
  const isDone = index < activeIndex;

  return (
    <div style={{ flex: 1, height: 2.5, borderRadius: 2, background: "rgba(255,255,255,0.3)", overflow: "hidden", position: "relative" }}>
      <div style={{ position: "absolute", inset: 0, borderRadius: 2, background: "rgba(255,255,255,0.92)", transformOrigin: "left center", transform: `scaleX(${isDone ? 1 : isCurrent ? progress : 0})`, willChange: "transform" }} />
    </div>
  );
}

export default function MobileMemoryStack() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [isShared, setIsShared] = useState(false);
  const [isCommented, setIsCommented] = useState(false);
  const totalCards = cardsData.length;
  const holdTimer = useRef(null);
  const isHolding = useRef(false);
  const sectionRef = useRef(null);
  const hasStarted = useRef(false);

  /* ── Auto-play starts only when section enters viewport ── */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasStarted.current) {
            hasStarted.current = true;
            setIsPaused(false);
          } else if (!entry.isIntersecting) {
            setIsPaused(true);
          } else if (entry.isIntersecting) {
            setIsPaused(false);
          }
        });
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const nextCard = useCallback(() => {
    setActiveIndex((prev) => {
      if (prev < totalCards - 1) {
        setIsPaused(false);
        return prev + 1;
      }
      return prev;
    });
  }, [totalCards]);

  const prevCard = useCallback(() => {
    setActiveIndex((prev) => {
      if (prev > 0) {
        setIsPaused(false);
        return prev - 1;
      }
      return prev;
    });
  }, []);

  const handlePressStart = useCallback(() => {
    holdTimer.current = setTimeout(() => {
      isHolding.current = true;
      setIsPaused(true);
    }, 150);
  }, []);

  const handlePressEnd = useCallback((e, side) => {
    clearTimeout(holdTimer.current);
    if (isHolding.current) {
      isHolding.current = false;
      setIsPaused(false);
      return;
    }
    if (side === "left") prevCard();
    else nextCard();
  }, [prevCard, nextCard]);

  const handleLeave = useCallback(() => {
    clearTimeout(holdTimer.current);
    if (isHolding.current) {
      isHolding.current = false;
      setIsPaused(false);
    }
  }, []);

  const handleHeart = useCallback((e) => {
    e.stopPropagation();
    setIsLiked((v) => !v);
  }, []);

  const handleShare = useCallback((e) => {
    e.stopPropagation();
    setIsShared(true);
    setTimeout(() => setIsShared(false), 300);
    window.open(`https://wa.me/919377150889?text=${encodeURIComponent("Hi Shaadi Pitara, I saw your amazing story on the portfolio and wanted to connect!")}`, '_blank');
  }, []);

  const handleComment = useCallback((e) => {
    e.stopPropagation();
    setIsCommented(true);
    setTimeout(() => setIsCommented(false), 300);
    window.open('https://instagram.com/shaadi.pitara', '_blank');
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") nextCard();
      if (e.key === "ArrowLeft") prevCard();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [nextCard, prevCard]);

  const card = cardsData[activeIndex];
  if (!card) return null;

  return (
    <section
      ref={sectionRef}
      className="mobile-memory-stack"
      style={{
        position: "relative",
        backgroundColor: "#3A0B0E",
        backgroundImage: "url('/seamless-texture.jpg')",
        backgroundRepeat: "repeat",
        backgroundSize: "600px 600px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        paddingTop: "24px",
        paddingBottom: "16px",
      }}
    >
      {/* Section header */}
      <div style={{ marginBottom: "14px", textAlign: "center", color: "#fff", zIndex: 10, width: "100%", padding: "0 16px" }}>
        <div style={{ fontSize: "9.5px", fontFamily: "var(--font-mono)", letterSpacing: "0.26em", color: "var(--brand-gold)", textTransform: "uppercase", marginBottom: "2px", opacity: 0.9 }}>Chronicles of Passion</div>
        <h2 className="c-heading" style={{ fontSize: "clamp(26px, 7vw, 32px)", margin: "0 0 6px", lineHeight: 1.15, color: "#FEF5E6" }}>Our <i>Story</i></h2>
      </div>

      {/* Phone frame wrapper */}
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "390px",
          margin: "0 auto",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          borderRadius: "20px",
          backgroundColor: "#0a0a0a",
        }}
      >
        {/* STORY CARD */}
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "clamp(640px, 85vh, 760px)",
            borderRadius: "20px 20px 6px 6px",
            overflow: "hidden",
            touchAction: "none",
            userSelect: "none",
          }}
        >
          {/* TOP OVERLAY: progress + profile */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              zIndex: 30,
              padding: "8px 8px 0",
              background: "linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.18) 65%, transparent 100%)",
              pointerEvents: "none",
            }}
          >
            <div style={{ display: "flex", gap: 3, marginBottom: "10px", pointerEvents: "all" }}>
              {cardsData.map((_, i) => (
                <StoryProgressBar key={i} index={i} activeIndex={activeIndex} isPaused={isPaused} onComplete={nextCard} />
              ))}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, paddingBottom: "8px" }}>
              <div style={{ width: 32, height: 32, borderRadius: "50%", overflow: "hidden", border: "2px solid rgba(255,255,255,0.6)", flexShrink: 0 }}>
                <img src="/logo.jpg" alt="Shaadi Pitara" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "12px", fontWeight: 600, color: "#fff", letterSpacing: "0.02em" }}>shaadi.pitara</span>
              {isPaused && <span style={{ fontFamily: "var(--font-mono)", fontSize: "8px", letterSpacing: "0.14em", color: "rgba(255,255,255,0.6)", textTransform: "uppercase", marginLeft: "auto" }}>PAUSED</span>}
            </div>
          </div>

          {/* CARD CONTENT — All cards rendered, only active fades in. Fixes alternating card bug. */}
          <div style={{ position: "absolute", inset: 0 }}>
            {cardsData.map((c, i) => (
              <motion.div
                key={c.id}
                initial={false}
                animate={{ opacity: i === activeIndex ? 1 : 0 }}
                transition={{ duration: 0.22, ease: "easeInOut" }}
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(165deg, #FFFDF9 0%, #FAF1E3 50%, #EFE1CA 100%)",
                  display: "flex",
                  flexDirection: "column",
                  color: "#2C080B",
                  pointerEvents: i === activeIndex ? "auto" : "none",
                  willChange: "opacity",
                }}
              >
              {/* Decorative inner frame */}
              <div aria-hidden="true" style={{ position: "absolute", inset: "6px", borderRadius: "14px 14px 3px 3px", border: "1px solid rgba(196,150,95,0.22)", pointerEvents: "none", zIndex: 2 }} />

              {/* Founder photo */}
              {c.isDevarsh && (
                <div style={{ position: "relative", width: "100%", height: "300px", flexShrink: 0, overflow: "hidden" }}>
                  <img src="/devimg.jpeg" alt="Devarsh Jain" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 20%" }} />
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "50%", background: "linear-gradient(to bottom, transparent, #EFE1CA)" }} />
                  {/* Tags at bottom of image */}
                  <div style={{ position: "absolute", bottom: "12px", left: "14px", right: "14px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}>
                    <div style={{ padding: "4px 10px", borderRadius: "100px", background: "rgba(239,225,202,0.82)", backdropFilter: "blur(8px)", border: "1px solid rgba(196,150,95,0.35)", fontFamily: "var(--font-mono)", fontSize: "8.5px", letterSpacing: "0.14em", color: "#4A1216", textTransform: "uppercase", display: "flex", alignItems: "center", gap: 5 }}>
                      <span style={{ color: "#8E4822" }}>&#10022;</span><span>Founder &middot; Storyteller</span>
                    </div>
                    <div style={{ padding: "4px 10px", borderRadius: "100px", background: "rgba(239,225,202,0.82)", backdropFilter: "blur(8px)", border: "1px solid rgba(196,150,95,0.35)", fontFamily: "var(--font-mono)", fontSize: "8.5px", color: "#4A1216", display: "flex", alignItems: "center", gap: 5 }}>
                      <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#8E4822" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                      <span>Ahmedabad</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Card body */}
              <div style={{ padding: c.isDevarsh ? "12px 18px 18px" : "76px 18px 20px", display: "flex", flexDirection: "column", flex: 1, justifyContent: "center", gap: 0, position: "relative", zIndex: 3, overflowY: "auto" }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.14em", textTransform: "uppercase", padding: "2.5px 8px", borderRadius: 100, background: "linear-gradient(135deg, rgba(196,150,95,0.18) 0%, rgba(58,11,14,0.08) 100%)", border: "1px solid rgba(196,150,95,0.35)", color: "#4A1216", fontWeight: 600 }}>{c.chapter}</span>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "8.5px", letterSpacing: "0.1em", textTransform: "uppercase", color: "#7B272C", fontWeight: 500 }}>{c.tag}</span>
                  </div>

                  {c.name ? (
                    <div style={{ marginBottom: "11px" }}>
                      <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "23px", fontWeight: 600, lineHeight: 1.2, margin: "0 0 4px", color: "#2C080B", letterSpacing: "-0.01em" }}>{c.name}</h3>
                      <p style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.14em", color: "#7B272C", textTransform: "uppercase", margin: 0 }}>{c.role}</p>
                    </div>
                  ) : (
                    <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(19px, 4.8vw, 23px)", fontWeight: 600, lineHeight: 1.22, letterSpacing: "-0.015em", margin: "0 0 10px", color: "#2C080B" }}>{c.heading}</h3>
                  )}

                  {c.highlight && (
                    <div style={{ margin: "8px 0 12px", padding: "9px 13px", background: "linear-gradient(135deg, rgba(196,150,95,0.18) 0%, rgba(245,229,206,0.6) 100%)", borderLeft: "3px solid #8E4822", borderRadius: "0 8px 8px 0", boxShadow: "0 2px 6px rgba(91,23,27,0.06)" }}>
                      <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "13.5px", fontStyle: "italic", fontWeight: 500, lineHeight: 1.52, margin: 0, color: "#34070B", letterSpacing: "0.01em" }}>{c.highlight}</p>
                    </div>
                  )}

                  {c.content && (
                    <p style={{ fontSize: "13.5px", lineHeight: 1.62, margin: "0 0 12px", color: "rgba(58,11,14,0.92)", fontWeight: 400 }}>{c.content}</p>
                  )}

                  {c.bullets && (
                    <div style={{ display: "flex", flexDirection: "column", gap: 5, margin: "4px 0 10px" }}>
                      {c.bullets.map((b, bi) => (
                        <div key={bi} style={{ display: "flex", alignItems: "flex-start", gap: 6, fontSize: "12.5px", lineHeight: 1.38, color: "#3D0C10" }}>
                          <span style={{ color: "#8E4822", fontSize: "10px", marginTop: 1 }}>&#10022;</span>
                          <span style={{ fontWeight: 500 }}>{b}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {c.memoryPills && (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6, margin: "2px 0 6px" }}>
                      {c.memoryPills.slice(0, 2).map((pill, pIdx) => (
                        <span key={pIdx} style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.08em", textTransform: "uppercase", padding: "3px 9px", borderRadius: 100, background: "rgba(196,150,95,0.12)", border: "1px solid rgba(196,150,95,0.25)", color: "#5C1B20", fontWeight: 500 }}>&#10022; {pill}</span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Badge row — no Next button */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "8px", borderTop: "1px solid rgba(196,150,95,0.28)", marginTop: "16px", gap: "10px" }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "8.5px", letterSpacing: "0.12em", color: "rgba(91,23,27,0.75)", textTransform: "uppercase", fontWeight: 600, lineHeight: 1.35 }}>{c.badge}</span>
                  {c.isDevarsh && (
                    <a href={`https://wa.me/919377150889?text=${encodeURIComponent("Hi Shaadi Pitara, I would like to enquire about your wedding services. Please share more details. Thank you!")}`} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} style={{ fontSize: "9px", fontFamily: "var(--font-mono)", letterSpacing: "0.08em", textTransform: "uppercase", color: "#4A1216", textDecoration: "none", fontWeight: 700, display: "inline-flex", alignItems: "center", gap: 6, padding: "7px 14px", background: "rgba(196,150,95,0.18)", border: "1px solid rgba(196,150,95,0.4)", borderRadius: 100, whiteSpace: "nowrap", flexShrink: 0, lineHeight: 1 }}>
                      <span>Let&apos;s Connect</span><span style={{ fontSize: "11px" }}>&rarr;</span>
                    </a>
                  )}
                </div>
              </div>

            </motion.div>
            ))}
          </div>

          {/* Single tap overlay — uses Pointer events to prevent double-firing on mobile */}
          <div
            onPointerDown={handlePressStart}
            onPointerLeave={handleLeave}
            onPointerUp={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const side = e.clientX - rect.left < rect.width * 0.3 ? "left" : "right";
              handlePressEnd(e, side);
            }}
            style={{ position: "absolute", inset: 0, zIndex: 25, cursor: "pointer", touchAction: "none" }}
          />

          {/* Heart popup removed */}
        </div>

        {/* Side glows — give the card depth like a phone screen */}
        <div aria-hidden="true" style={{ position: "absolute", top: 0, left: "-12px", width: "12px", height: "100%", background: "linear-gradient(to right, transparent, rgba(0,0,0,0.18))", borderRadius: "20px 0 0 20px", pointerEvents: "none", zIndex: 5 }} />
        <div aria-hidden="true" style={{ position: "absolute", top: 0, right: "-12px", width: "12px", height: "100%", background: "linear-gradient(to left, transparent, rgba(0,0,0,0.18))", borderRadius: "0 20px 20px 0", pointerEvents: "none", zIndex: 5 }} />

        {/* BOTTOM BAR — exact Instagram style */}
        <div
          style={{
            width: "100%",
            background: "#0a0a0a",
            borderRadius: "0 0 20px 20px",
            padding: "8px 12px 10px",
            display: "flex",
            alignItems: "center",
            gap: 10,
            zIndex: 35,
          }}
        >
          {/* Send message pill */}
          <div style={{ flex: 1, height: 36, borderRadius: 100, border: "1.5px solid rgba(255,255,255,0.22)", display: "flex", alignItems: "center", padding: "0 16px", cursor: "text" }}>
            <span style={{ fontSize: "14px", color: "rgba(255,255,255,0.5)", fontWeight: 400 }}>Send message</span>
          </div>

          {/* Icons container */}
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            {/* Heart — red when liked */}
            <button
              type="button"
              onClick={handleHeart}
              style={{ background: "none", border: "none", padding: 0, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
              aria-label={isLiked ? "Unlike" : "Like"}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill={isLiked ? "#FF3040" : "none"}
                stroke={isLiked ? "#FF3040" : "rgba(255,255,255,0.95)"}
                strokeWidth="1.9"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ transition: "fill 0.18s ease, stroke 0.18s ease" }}
              >
                <path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.438-.283-1.791-1.509-4.303-3.752C5.152 14.081 2.5 12.194 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.117 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.682-1.938Z" />
              </svg>
            </button>

            {/* Comment icon (official Instagram chat bubble with rounded corner tail at bottom right) */}
            <button
              type="button"
              onClick={handleComment}
              style={{ background: "none", border: "none", padding: 0, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
              aria-label="Comment"
            >
              <svg
                width="21"
                height="21"
                viewBox="0 0 24 24"
                fill={isCommented ? "#fff" : "none"}
                stroke={isCommented ? "#fff" : "rgba(255,255,255,0.95)"}
                strokeWidth="1.9"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ transition: "fill 0.18s ease, stroke 0.18s ease" }}
              >
                <path d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z" />
              </svg>
            </button>

            {/* IG DM share icon — official Instagram paper-plane path */}
            <button 
              type="button" 
              onClick={handleShare} 
              style={{ background: "none", border: "none", padding: 0, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }} 
              aria-label="Share"
            >
              <svg 
                width="21" 
                height="21" 
                viewBox="0 0 24 24" 
                fill="none"
                stroke={isShared ? "#fff" : "rgba(255,255,255,0.95)"}
                strokeWidth="1.9"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ transform: "rotate(-3deg)", transition: "fill 0.18s ease, stroke 0.18s ease" }}
              >
                <line x1="22" y1="3" x2="9.218" y2="10.083" />
                <polygon points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334" fill={isShared ? "#fff" : "none"} />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .mobile-memory-stack { display: none; }
        @media (max-width: 768px) {
          .mobile-memory-stack { display: flex !important; }
        }
      ` }} />
    </section>
  );
}
