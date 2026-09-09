"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const cardsData = [
  {
    id: 1,
    chapter: "CHAPTER 01",
    tag: "THE SPARK · 2018",
    heading: "It all began with an instinct to freeze everyday magic.",
    highlight: "“No fancy rigs. Just raw curiosity and an eye for moments nobody else noticed.”",
    content: "In my initial days, I shot anything that caught my breath. I used Snapchat to string together short, vibrant stories — discovering the rush of turning raw life into something cinematic.",
    badge: "The First Frame",
  },
  {
    id: 2,
    chapter: "CHAPTER 02",
    tag: "FIRST PRAISE",
    heading: "Then friends started leaning in.",
    highlight: "“Tu hi story laga diya kar, tu achhe se edit karta hai.”",
    content: "That one casual college compliment hit different. Seeing peers genuinely connect with my rhythm and pacing made me realize — this wasn't just a hobby. It was my calling.",
    badge: "Validation",
  },
  {
    id: 3,
    chapter: "CHAPTER 03",
    tag: "THE EVOLUTION",
    heading: "From casual fun to an all-consuming passion.",
    highlight: "“I didn't just want to take photos. I wanted to make people feel what happened.”",
    content: "Sleepless nights studying cuts, soundtrack drops, color theory, and emotional arcs. Every transition had to evoke a pulse.",
    badge: "Fun ➔ Passion ➔ Obsession",
  },
  {
    id: 4,
    chapter: "CHAPTER 04",
    tag: "THE BREAKTHROUGH",
    heading: "During college, one reel unexpectedly went viral.",
    highlight: "“Seeing thousands of strangers feel something from what I made unlocked ultimate confidence.”",
    content: "The comments, shares, and messages proved one thing: authentic storytelling transcends screens. It was time to go all in.",
    badge: "Viral Confidence",
  },
  {
    id: 5,
    chapter: "CHAPTER 05",
    tag: "THE GRIND",
    heading: "Creating for food bloggers in chaotic restaurant kitchens.",
    highlight: "“Fast cuts, tricky lighting, zero retakes — the ultimate training ground.”",
    content: "There were uncertain days of constant struggle, experimenting, and finding order in chaos. That phase taught me speed, agility, and emotional intuition under intense pressure.",
    badge: "Agility & Grit",
  },
  {
    id: 6,
    chapter: "CHAPTER 06",
    tag: "THE TURNING POINT",
    heading: "Then, I stepped into my first Indian wedding.",
    highlight: "“Photographers captured the staged frames. But who was preserving the unscripted heartbeat?”",
    content: "Traditional teams focused on the mandatory rituals and portraits. But the nervous giggles, the tears behind sunglasses, the stolen glances — were slipping away uncaptured.",
    badge: "The Revelation",
  },
  {
    id: 7,
    chapter: "CHAPTER 07",
    tag: "THE OTHER SIDE",
    heading: "The candid moments behind the moments.",
    bullets: [
      "The chaotic laughter between childhood friends",
      "Parents getting emotional in quiet corners",
      "The nervousness seconds before the bride's entry",
      "Cousins dancing wildly when nobody is watching",
    ],
    highlight: "“All the spontaneous madness that truly makes a wedding feel alive.”",
    badge: "Unfiltered Reality",
  },
  {
    id: 8,
    chapter: "CHAPTER 08",
    tag: "THE GENESIS",
    heading: "We don't just capture weddings. We preserve the feeling.",
    highlight: "“Instant, social-first vertical cinema delivered while your wedding is still unfolding.”",
    content: "Our content is raw, real, spontaneous, and vibrant. The laughter, the tears, the unplanned magic — ready to share with the world instantly.",
    badge: "Shaadi Pitara Born",
  },
  {
    id: 9,
    chapter: "CHAPTER 09",
    tag: "THE SOUL",
    heading: "Not just how it looked. How it truly felt.",
    highlight: "“Months or decades later, our reels transport you right back into that warmth and heartbeat.”",
    content: "That thought is the foundation of Shaadi Pitara. A space where every couple's chemistry gets celebrated without scripts or awkward posing.",
    badge: "Living Memories",
  },
  {
    id: 10,
    isDevarsh: true,
    chapter: "FOUNDER",
    tag: "THE PERSON BEHIND THE PITARA",
    name: "Devarsh Jain",
    role: "Founder · Wedding Social Media Creator",
    quote: "“A love for capturing moments turned into a way of preserving how weddings actually feel.”",
    content: "From Ahmedabad to destination weddings across India — crafting modern wedding stories with love, speed, and cinematic passion.",
    badge: "And this is only the beginning.",
  },
];

export default function MobileMemoryStack() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [exitDirection, setExitDirection] = useState("right");

  const totalCards = cardsData.length;

  const handleDragEnd = (event, info) => {
    const offsetX = info.offset.x;
    const velocityX = info.velocity.x;

    // Snappy, responsive threshold — slight flick or swipe triggers card transition
    if (Math.abs(offsetX) > 35 || Math.abs(velocityX) > 220) {
      setExitDirection(offsetX > 0 || velocityX > 0 ? "right" : "left");
      if (activeIndex < totalCards - 1) {
        setActiveIndex((prev) => prev + 1);
      }
    }
  };

  const nextCard = () => {
    if (activeIndex < totalCards - 1) {
      setExitDirection("right");
      setActiveIndex((prev) => prev + 1);
    }
  };

  const prevCard = () => {
    if (activeIndex > 0) {
      setActiveIndex((prev) => prev - 1);
    }
  };

  const restartStory = () => {
    setActiveIndex(0);
  };

  return (
    <section
      className="mobile-memory-stack"
      style={{
        position: "relative",
        background: "#3A0B0E",
        overflow: "hidden",
        paddingTop: "48px",
        paddingBottom: "50px",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Background radial glow */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "30%",
          left: "50%",
          width: 320,
          height: 320,
          transform: "translate(-50%, -50%)",
          background: "radial-gradient(circle, rgba(212,184,150,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* ── Top Header Section ── */}
      <div
        style={{
          marginBottom: "10px",
          textAlign: "center",
          color: "var(--brand-cream)",
          zIndex: 10,
          width: "100%",
          padding: "0 20px",
        }}
      >
        <div
          style={{
            fontSize: "9.5px",
            fontFamily: "var(--font-mono)",
            letterSpacing: "0.26em",
            color: "var(--brand-gold)",
            textTransform: "uppercase",
            marginBottom: "3px",
            opacity: 0.9,
          }}
        >
          Chronicles of Passion
        </div>

        <h2
          className="c-heading"
          style={{
            fontSize: "clamp(26px, 7vw, 34px)",
            margin: "0 0 6px",
            lineHeight: 1.15,
          }}
        >
          Our <i>Story</i>
        </h2>

        {/* 1. Cards Numbering */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            padding: "2px 13px",
            background: "rgba(212,184,150,0.1)",
            borderRadius: 100,
            border: "1px solid rgba(212,184,150,0.28)",
            fontFamily: "var(--font-mono)",
            fontSize: "11px",
            letterSpacing: "0.15em",
            color: "var(--brand-gold)",
            boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
          }}
        >
          <span style={{ fontWeight: 700, color: "var(--brand-cream)" }}>
            {String(Math.min(activeIndex + 1, totalCards)).padStart(2, "0")}
          </span>
          <span style={{ opacity: 0.35 }}>/</span>
          <span style={{ opacity: 0.65 }}>{String(totalCards).padStart(2, "0")}</span>
        </div>

        {/* 2. Swipe Card Info — strictly placed between cards numbering and the top of cards */}
        <div
          style={{
            marginTop: "8px",
            fontFamily: "var(--font-mono)",
            fontSize: "9px",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "rgba(247,230,204,0.75)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "7px",
          }}
        >
          <span style={{ color: "var(--brand-gold)", fontSize: "10px" }}>&larr;</span>
          <span>SWIPE CARD TO EXPLORE</span>
          <span style={{ color: "var(--brand-gold)", fontSize: "10px" }}>&rarr;</span>
        </div>
      </div>

      {/* ── Cards Stack Container ── */}
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "345px",
          height: "420px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "0 auto",
          touchAction: "pan-y",
        }}
      >
        <AnimatePresence mode="popLayout">
          {cardsData.map((card, index) => {
            // Render only top 2 cards for buttery smooth, zero-lag 60fps GPU performance
            if (index < activeIndex || index > activeIndex + 1) return null;

            const isTop = index === activeIndex;
            const depthIndex = index - activeIndex;

            const scale = 1 - depthIndex * 0.04;
            const yOffset = depthIndex * 12;
            const opacity = 1 - depthIndex * 0.22;
            const zIndexVal = 30 - depthIndex;
            const rot = depthIndex === 0 ? 0 : 2.5;

            return (
              <motion.div
                key={card.id}
                drag={isTop ? "x" : false}
                dragDirectionLock
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.7}
                onDragEnd={handleDragEnd}
                initial={{ scale: 0.92, opacity: 0, y: 20 }}
                animate={{
                  scale,
                  y: yOffset,
                  opacity,
                  rotate: rot,
                  transition: {
                    type: "spring",
                    stiffness: 420,
                    damping: 34,
                    mass: 0.6,
                  },
                }}
                exit={{
                  x: exitDirection === "left" ? -320 : 320,
                  opacity: 0,
                  rotate: exitDirection === "left" ? -12 : 12,
                  transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] },
                }}
                whileDrag={{
                  scale: 0.98,
                  cursor: "grabbing",
                }}
                style={{
                  position: "absolute",
                  width: "90%",
                  maxWidth: "330px",
                  height: "400px",
                  borderRadius: "16px",
                  overflow: "hidden",
                  cursor: isTop ? "grab" : "default",
                  zIndex: zIndexVal,
                  willChange: "transform, opacity",
                  transformOrigin: "bottom center",
                  background: card.isDevarsh
                    ? "linear-gradient(160deg, #240508 0%, #150203 100%)"
                    : "linear-gradient(160deg, #FAF4E9 0%, #F5E8D3 55%, #EAD8BD 100%)",
                  border: card.isDevarsh
                    ? "1.5px solid rgba(212,184,150,0.38)"
                    : "1.5px solid rgba(196,150,95,0.48)",
                  boxShadow: isTop
                    ? "0 18px 45px rgba(0, 0, 0, 0.42), 0 2px 10px rgba(0, 0, 0, 0.22)"
                    : "0 8px 20px rgba(0, 0, 0, 0.25)",
                  display: "flex",
                  flexDirection: "column",
                  color: card.isDevarsh ? "var(--brand-cream)" : "#2C080B",
                }}
              >
                {/* Decorative Inner Golden Border Frame */}
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    inset: "7px",
                    borderRadius: "11px",
                    border: card.isDevarsh
                      ? "1px solid rgba(212,184,150,0.2)"
                      : "1px solid rgba(196,150,95,0.3)",
                    pointerEvents: "none",
                    zIndex: 2,
                  }}
                />

                {/* Subtle luxury corner dot accents */}
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    top: 11,
                    right: 11,
                    width: 4,
                    height: 4,
                    borderRadius: "50%",
                    background: card.isDevarsh ? "rgba(212,184,150,0.4)" : "rgba(196,150,95,0.55)",
                    pointerEvents: "none",
                    zIndex: 2,
                  }}
                />
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    bottom: 11,
                    left: 11,
                    width: 4,
                    height: 4,
                    borderRadius: "50%",
                    background: card.isDevarsh ? "rgba(212,184,150,0.4)" : "rgba(196,150,95,0.55)",
                    pointerEvents: "none",
                    zIndex: 2,
                  }}
                />

                {/* Decorative watermark ornament inside parchment card */}
                {!card.isDevarsh && (
                  <div
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      bottom: "30px",
                      right: "-10px",
                      width: "140px",
                      height: "140px",
                      borderRadius: "50%",
                      background: "radial-gradient(circle, rgba(196,150,95,0.08) 0%, transparent 70%)",
                      pointerEvents: "none",
                      zIndex: 1,
                    }}
                  />
                )}

                {/* ── Founder Photo for Card 10 ── */}
                {card.isDevarsh && (
                  <div
                    style={{
                      position: "relative",
                      width: "100%",
                      height: "44%",
                      flexShrink: 0,
                      overflow: "hidden",
                    }}
                  >
                    <img
                      src="/devimg.jpeg"
                      alt="Devarsh Jain"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        objectPosition: "center 18%",
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: "60%",
                        background: "linear-gradient(to bottom, transparent, #240508)",
                      }}
                    />
                  </div>
                )}

                {/* ── Card Content Body ── */}
                <div
                  style={{
                    padding: card.isDevarsh ? "12px 16px 14px" : "16px 18px 14px",
                    display: "flex",
                    flexDirection: "column",
                    flex: 1,
                    justifyContent: "space-between",
                    position: "relative",
                    zIndex: 3,
                  }}
                >
                  {/* Top Row: Chapter & Tag Badge */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "8px",
                      marginBottom: "8px",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "8.5px",
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        padding: "2.5px 8px",
                        borderRadius: 100,
                        background: card.isDevarsh
                          ? "rgba(212,184,150,0.12)"
                          : "linear-gradient(135deg, rgba(196,150,95,0.18) 0%, rgba(58,11,14,0.08) 100%)",
                        border: card.isDevarsh
                          ? "1px solid rgba(212,184,150,0.25)"
                          : "1px solid rgba(196,150,95,0.32)",
                        color: card.isDevarsh ? "var(--brand-gold)" : "#4A1216",
                        fontWeight: 600,
                        whiteSpace: "nowrap",
                        flexShrink: 0,
                      }}
                    >
                      {card.chapter}
                    </span>

                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "8.5px",
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        color: card.isDevarsh
                          ? "rgba(212,184,150,0.6)"
                          : "rgba(91,23,27,0.7)",
                        fontWeight: 500,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {card.tag}
                    </span>
                  </div>

                  {/* Main Heading */}
                  {card.name ? (
                    <div>
                      <h3
                        style={{
                          fontFamily: "'Playfair Display', Georgia, serif",
                          fontSize: "24px",
                          fontWeight: 600,
                          lineHeight: 1.15,
                          margin: "0 0 2px",
                          color: "var(--brand-cream)",
                        }}
                      >
                        {card.name}
                      </h3>
                      <p
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "9px",
                          letterSpacing: "0.12em",
                          color: "var(--brand-gold)",
                          textTransform: "uppercase",
                          margin: "0 0 6px",
                        }}
                      >
                        {card.role}
                      </p>
                    </div>
                  ) : (
                    <h3
                      style={{
                        fontFamily: "'Playfair Display', Georgia, serif",
                        fontSize: "clamp(16.5px, 4.2vw, 19.5px)",
                        fontWeight: 600,
                        lineHeight: 1.25,
                        letterSpacing: "-0.01em",
                        margin: "0 0 8px",
                        color: "#2C080B",
                      }}
                    >
                      {card.heading}
                    </h3>
                  )}

                  {/* Highlight Callout Box — Important text highlighted prominently */}
                  {card.highlight && (
                    <div
                      style={{
                        margin: "4px 0 8px",
                        padding: "9px 13px",
                        background: card.isDevarsh
                          ? "linear-gradient(135deg, rgba(212,184,150,0.12) 0%, rgba(36,5,8,0.5) 100%)"
                          : "linear-gradient(135deg, rgba(196,150,95,0.18) 0%, rgba(245,229,206,0.5) 100%)",
                        borderLeft: card.isDevarsh
                          ? "3px solid var(--brand-gold)"
                          : "3px solid #8E4822",
                        borderRadius: "0 7px 7px 0",
                        boxShadow: card.isDevarsh
                          ? "0 2px 8px rgba(0,0,0,0.3)"
                          : "0 2px 8px rgba(91,23,27,0.06)",
                      }}
                    >
                      <p
                        style={{
                          fontFamily: "'Playfair Display', Georgia, serif",
                          fontSize: "13.5px",
                          fontStyle: "italic",
                          fontWeight: 600,
                          lineHeight: 1.38,
                          margin: 0,
                          color: card.isDevarsh ? "#FBF2E3" : "#34070B",
                        }}
                      >
                        {card.highlight}
                      </p>
                    </div>
                  )}

                  {/* Bullet points for Chapter 07 */}
                  {card.bullets && (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 6,
                        margin: "4px 0 8px",
                      }}
                    >
                      {card.bullets.map((b, i) => (
                        <div
                          key={i}
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: 7,
                            fontSize: "12px",
                            lineHeight: 1.32,
                            color: "#3D0C10",
                          }}
                        >
                          <span style={{ color: "#8E4822", fontSize: "10px", marginTop: 2 }}>✦</span>
                          <span style={{ fontWeight: 500 }}>{b}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Narrative Content */}
                  {card.content && (
                    <p
                      style={{
                        fontSize: "13px",
                        lineHeight: 1.55,
                        margin: "0 0 6px",
                        color: card.isDevarsh
                          ? "rgba(247,230,204,0.85)"
                          : "rgba(58,11,14,0.9)",
                        fontWeight: 400,
                      }}
                    >
                      {card.content}
                    </p>
                  )}

                  {/* Founder Quote on Card 10 */}
                  {card.quote && (
                    <p
                      style={{
                        fontFamily: "'Playfair Display', Georgia, serif",
                        fontSize: "12.5px",
                        fontStyle: "italic",
                        lineHeight: 1.4,
                        margin: "0 0 8px",
                        color: "var(--brand-gold-light)",
                      }}
                    >
                      {card.quote}
                    </p>
                  )}

                  {/* Bottom Footer Row of Card */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      paddingTop: "7px",
                      borderTop: card.isDevarsh
                        ? "1px solid rgba(212,184,150,0.15)"
                        : "1px solid rgba(196,150,95,0.28)",
                      marginTop: "auto",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "8.5px",
                        letterSpacing: "0.15em",
                        color: card.isDevarsh
                          ? "rgba(212,184,150,0.7)"
                          : "rgba(91,23,27,0.75)",
                        textTransform: "uppercase",
                        fontWeight: 600,
                      }}
                    >
                      {card.badge}
                    </span>

                    {card.isDevarsh ? (
                      <a
                        href="https://wa.me/919377150889"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          fontSize: "9px",
                          fontFamily: "var(--font-mono)",
                          letterSpacing: "0.15em",
                          textTransform: "uppercase",
                          color: "var(--brand-gold)",
                          textDecoration: "none",
                          fontWeight: 600,
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 4,
                          padding: "2px 8px",
                          background: "rgba(212,184,150,0.1)",
                          borderRadius: 100,
                          border: "1px solid rgba(212,184,150,0.3)",
                        }}
                      >
                        Let&apos;s Connect &rarr;
                      </a>
                    ) : (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          nextCard();
                        }}
                        style={{
                          fontSize: "8.5px",
                          fontFamily: "var(--font-mono)",
                          letterSpacing: "0.12em",
                          color: "#8E4822",
                          background: "rgba(196,150,95,0.12)",
                          border: "1px solid rgba(196,150,95,0.3)",
                          borderRadius: 100,
                          padding: "2px 8px",
                          cursor: "pointer",
                          fontWeight: 600,
                          textTransform: "uppercase",
                        }}
                      >
                        Swipe &rarr;
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* ── Bottom Controls: Previous / Next & Restart ── */}
      <div
        style={{
          marginTop: "16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 16,
          zIndex: 10,
        }}
      >
        <button
          type="button"
          onClick={prevCard}
          disabled={activeIndex === 0}
          aria-label="Previous story card"
          style={{
            padding: "6px 14px",
            background: "rgba(212,184,150,0.06)",
            border: "1px solid rgba(212,184,150,0.2)",
            borderRadius: 100,
            color: activeIndex === 0 ? "rgba(247,230,204,0.25)" : "var(--brand-cream)",
            fontFamily: "var(--font-mono)",
            fontSize: "9px",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            cursor: activeIndex === 0 ? "default" : "pointer",
            transition: "all 0.25s ease",
          }}
        >
          &larr; Prev
        </button>

        {activeIndex < totalCards - 1 ? (
          <button
            type="button"
            onClick={nextCard}
            aria-label="Next story card"
            style={{
              padding: "6px 16px",
              background: "rgba(212,184,150,0.12)",
              border: "1px solid rgba(212,184,150,0.35)",
              borderRadius: 100,
              color: "var(--brand-cream)",
              fontFamily: "var(--font-mono)",
              fontSize: "9px",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              cursor: "pointer",
              transition: "all 0.25s ease",
            }}
          >
            Next &rarr;
          </button>
        ) : (
          <button
            type="button"
            onClick={restartStory}
            aria-label="Restart story"
            style={{
              padding: "6px 16px",
              background: "rgba(212,184,150,0.15)",
              border: "1px solid var(--brand-gold)",
              borderRadius: 100,
              color: "var(--brand-gold-light)",
              fontFamily: "var(--font-mono)",
              fontSize: "9px",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              cursor: "pointer",
              transition: "all 0.25s ease",
            }}
          >
            ↺ Read Again
          </button>
        )}
      </div>
    </section>
  );
}
