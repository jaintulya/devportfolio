"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const cardsData = [
  {
    id: 1,
    chapter: "CHAPTER 01",
    tag: "THE SPARK · 2018",
    era: "Ahmedabad · 2018",
    heading: "It all began with an instinct to freeze everyday magic.",
    highlight: "“No fancy rigs. Just raw curiosity and an eye for moments nobody else noticed.”",
    content: "Before weddings, there was an obsession with observation. I walked around Ahmedabad with my phone, using Snapchat and simple cuts to stitch together fleeting slices of life. I discovered that even an ordinary evening feels like cinema when timed to the right heartbeat.",
    memoryPills: ["Phone Lens Only", "Zero Budget"],
    atmosphere: "Riverfront Promenades · Ahmedabad",
    badge: "The First Frame",
  },
  {
    id: 2,
    chapter: "CHAPTER 02",
    tag: "FIRST PRAISE · 2019",
    era: "Campus Hallways · 2019",
    heading: "Then friends started leaning in and watching closely.",
    highlight: "“Tu hi story laga diya kar, tere edit mein emotion dikhta hai.”",
    content: "That one casual college compliment shifted my universe. Seeing classmates wait for my edits, replay them, and genuinely feel the music made me realize: this was never a fleeting hobby. It was the visual language I was meant to speak.",
    memoryPills: ["Campus Hallways", "First Timelines"],
    atmosphere: "College Canteen · 11:20 AM",
    badge: "The Validation",
  },
  {
    id: 3,
    chapter: "CHAPTER 03",
    tag: "THE EVOLUTION · 2020",
    era: "Midnight Lab · 2020",
    heading: "From casual fun to an all-consuming creative obsession.",
    highlight: "“I didn't just want pretty pictures. I wanted people to relive the exact pulse.”",
    content: "Sleepless nights studying cuts, soundtrack drops, acoustic pacing, and color palettes. I obsessed over why certain 10-second sequences bring goosebumps while others feel hollow. Every frame had to breathe with genuine human pulse.",
    memoryPills: ["Midnight Rhythms", "Beat Drops"],
    atmosphere: "02:45 AM · The Edit Desk",
    badge: "Fun ➔ Obsession",
  },
  {
    id: 4,
    chapter: "CHAPTER 04",
    tag: "THE BREAKTHROUGH",
    era: "Viral Feed · 2021",
    heading: "During college, one single reel unexpectedly exploded.",
    highlight: "“Seeing thousands of strangers feel something from what I made unlocked ultimate conviction.”",
    content: "The screen wouldn't stop ringing. Shares, emotional DMs, and strangers telling me a 30-second video made them tear up proved one truth: authentic storytelling transcends any screen size. That night, I decided to go all in.",
    memoryPills: ["1M+ Organic Views", "Pan-India DMs"],
    atmosphere: "Trending Feed · Midnight Surge",
    badge: "The Breakthrough",
  },
  {
    id: 5,
    chapter: "CHAPTER 05",
    tag: "THE GRIND · 2021",
    era: "Commercial Kitchens",
    heading: "Creating in chaotic, high-pressure restaurant kitchens.",
    highlight: "“Sizzling pans, tricky low-light, zero retakes: the ultimate training ground.”",
    content: "I took projects with food creators and brands, shooting in boiling kitchens with seconds to catch the steam and sizzle. That relentless phase forged my speed, sharp reflexes, and intuitive framing, which would later become my superpower at weddings.",
    memoryPills: ["Zero Retakes", "High-Pressure Sets"],
    atmosphere: "Commercial Sets · 100% Instinct",
    badge: "The Bootcamp",
  },
  {
    id: 6,
    chapter: "CHAPTER 06",
    tag: "THE TURNING POINT",
    era: "First Wedding · 2022",
    heading: "Then, I stepped into my first Indian wedding.",
    highlight: "“Traditional crews were staging poses. But who was preserving the unscripted heartbeat?”",
    content: "I watched photographers direct stiff poses while the real wedding was happening elsewhere: the bride's deep breath behind the door, the grandmother quietly wiping a tear, the cousins laughing hysterically backstage. Those were the real memories slipping away unrecorded.",
    memoryPills: ["Staged vs Real", "Mandap Whispers"],
    atmosphere: "Mandap Sidelines · Udaipur",
    badge: "The Revelation",
  },
  {
    id: 7,
    chapter: "CHAPTER 07",
    tag: "THE OTHER SIDE",
    era: "Behind The Scenes",
    heading: "The candid moments behind the moments.",
    highlight: "“All the spontaneous, imperfect madness that truly makes a celebration alive.”",
    bullets: [
      "The chaotic laughter between childhood best friends",
      "Parents getting overwhelmed in quiet, unlit corners",
      "The fast heartbeat seconds before the bride's grand entry",
      "Cousins breaking into wild dance moves when cameras turn away",
    ],
    content: "Weddings aren't rehearsed movie sets; they are intense, beautiful emotional storms. Our lens lives right inside that storm, invisible yet deeply present.",
    memoryPills: ["Tears & Laughs", "Secret Glances"],
    atmosphere: "The Unstaged Truth",
    badge: "Unfiltered Soul",
  },
  {
    id: 8,
    chapter: "CHAPTER 08",
    tag: "THE GENESIS",
    era: "Shaadi Pitara Born",
    heading: "We don't just film weddings. We preserve the feeling.",
    highlight: "“Cinematic vertical reels delivered while your wedding is still unfolding.”",
    content: "Why should couples wait 6 months for a standard film while the celebration's electricity is fresh right now? Shaadi Pitara was founded to deliver same-night cinematic reels that couples and guests can relive, cry to, and share with the world immediately.",
    memoryPills: ["9:16 Cinema", "Same-Night Delivery"],
    atmosphere: "Electric Celebration · Live Edits",
    badge: "Shaadi Pitara Born",
  },
  {
    id: 9,
    chapter: "CHAPTER 09",
    tag: "THE SOUL",
    era: "The Philosophy",
    heading: "Not just how it looked. How it actually felt.",
    highlight: "“Years or decades later, our reels transport you right back into that exact warmth.”",
    content: "When you look back on your wedding after 20 years, you won't care about artificial poses. You'll want to hear your mother's laugh, see your partner's nervous smile, and feel that rush all over again. That sacred promise is what drives every film we craft.",
    memoryPills: ["Decades Later", "Emotional Audio"],
    atmosphere: "Preserving Family Heirlooms",
    badge: "Living Memories",
  },
  {
    id: 10,
    isDevarsh: true,
    chapter: "FOUNDER",
    tag: "THE PERSON BEHIND THE PITARA",
    name: "Devarsh Jain",
    role: "Founder · Wedding Content Creator",
    highlight: "“A love for capturing moments turned into a way of preserving how weddings actually feel.”",
    content: "From Ahmedabad to destination celebrations across India, I travel with a handheld camera and an open heart, crafting modern vertical cinema that celebrates who you truly are.",
    atmosphere: "Ahmedabad, Gujarat · Destination Worldwide",
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

    // Responsive swipe threshold
    if (Math.abs(offsetX) > 35 || Math.abs(velocityX) > 160) {
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
        backgroundColor: "#3A0B0E",
        backgroundImage: "url('/seamless-texture.jpg')",
        backgroundRepeat: "repeat",
        backgroundSize: "600px 600px",
        backgroundPosition: "0 0",
        overflow: "hidden",
        paddingTop: "28px",
        paddingBottom: "32px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      {/* Background radial glow */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "35%",
          left: "50%",
          width: 380,
          height: 380,
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
          padding: "0 16px",
        }}
      >
        <div
          style={{
            fontSize: "9.5px",
            fontFamily: "var(--font-mono)",
            letterSpacing: "0.26em",
            color: "var(--brand-gold)",
            textTransform: "uppercase",
            marginBottom: "2px",
            opacity: 0.9,
          }}
        >
          Chronicles of Passion
        </div>

        <h2
          className="c-heading"
          style={{
            fontSize: "clamp(26px, 7vw, 32px)",
            margin: "0 0 8px",
            lineHeight: 1.15,
            color: "#FEF5E6",
          }}
        >
          Our <i>Story</i>
        </h2>

        {/* ── Segmented Story Progress Bar (Clickable) ── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            width: "100%",
            maxWidth: "354px",
            margin: "0 auto 8px",
            padding: "0 4px",
          }}
          aria-label={`Story slide ${activeIndex + 1} of ${totalCards}`}
        >
          {cardsData.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActiveIndex(i)}
              aria-label={`Go to chapter ${i + 1}`}
              style={{
                flex: 1,
                height: 3.5,
                padding: 0,
                border: "none",
                borderRadius: 2,
                background:
                  i === activeIndex
                    ? "var(--brand-gold)"
                    : i < activeIndex
                    ? "rgba(212, 184, 150, 0.75)"
                    : "rgba(212, 184, 150, 0.22)",
                boxShadow: i === activeIndex ? "0 0 6px rgba(212, 184, 150, 0.6)" : "none",
                transition: "all 0.3s ease",
                cursor: "pointer",
              }}
            />
          ))}
        </div>

        {/* Swipe / Tap hint */}
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "8.5px",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "rgba(247,230,204,0.72)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "6px",
          }}
        >
          <span style={{ color: "var(--brand-gold)", fontSize: "9px" }}>&larr;</span>
          <span>SWIPE OR TAP CARD TO EXPLORE</span>
          <span style={{ color: "var(--brand-gold)", fontSize: "9px" }}>&rarr;</span>
        </div>
      </div>

      {/* ── Story Card Stack Container ── */}
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "364px",
          height: "clamp(510px, 70vh, 555px)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "0 auto",
          touchAction: "pan-y",
        }}
      >
        <AnimatePresence mode="popLayout">
          {cardsData.map((card, index) => {
            // Render top 2 cards for silky performance
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
                dragElastic={0.65}
                onDragEnd={handleDragEnd}
                initial={{ scale: 0.94, opacity: 0, y: 20 }}
                animate={{
                  scale,
                  y: yOffset,
                  opacity,
                  rotate: rot,
                  transition: {
                    type: "spring",
                    stiffness: 300,
                    damping: 28,
                    mass: 0.7,
                  },
                }}
                exit={{
                  x: exitDirection === "left" ? -360 : 360,
                  opacity: 0,
                  rotate: exitDirection === "left" ? -14 : 14,
                  transition: { duration: 0.25, ease: [0.25, 1, 0.5, 1] },
                }}
                whileDrag={{
                  scale: 0.98,
                  cursor: "grabbing",
                }}
                style={{
                  position: "absolute",
                  width: "93%",
                  maxWidth: "354px",
                  height: "clamp(500px, 69vh, 545px)",
                  borderRadius: "18px",
                  overflow: "hidden",
                  cursor: isTop ? "grab" : "default",
                  zIndex: zIndexVal,
                  willChange: "transform, opacity",
                  transformOrigin: "bottom center",
                  background: card.isDevarsh
                    ? "linear-gradient(160deg, #240508 0%, #150203 100%)"
                    : "linear-gradient(165deg, #FFFDF9 0%, #FAF1E3 50%, #EFE1CA 100%)",
                  border: card.isDevarsh
                    ? "1.5px solid rgba(212,184,150,0.42)"
                    : "1.5px solid rgba(196,150,95,0.52)",
                  boxShadow: isTop
                    ? "0 24px 52px rgba(0, 0, 0, 0.48), 0 4px 14px rgba(0, 0, 0, 0.25)"
                    : "0 10px 24px rgba(0, 0, 0, 0.28)",
                  display: "flex",
                  flexDirection: "column",
                  color: card.isDevarsh ? "var(--brand-cream)" : "#2C080B",
                }}
              >
                {/* ── Interactive Tap Zones for Story Navigation (Left = Prev, Right = Next) ── */}
                {isTop && (
                  <>
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        prevCard();
                      }}
                      title="Tap for previous slide"
                      style={{
                        position: "absolute",
                        top: 0,
                        bottom: 0,
                        left: 0,
                        width: "28%",
                        zIndex: 4,
                        cursor: activeIndex > 0 ? "pointer" : "default",
                      }}
                    />
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        nextCard();
                      }}
                      title="Tap for next slide"
                      style={{
                        position: "absolute",
                        top: 0,
                        bottom: 0,
                        right: 0,
                        width: "72%",
                        zIndex: 4,
                        cursor: "pointer",
                      }}
                    />
                  </>
                )}

                {/* Decorative Inner Golden Frame */}
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    inset: "7px",
                    borderRadius: "13px",
                    border: card.isDevarsh
                      ? "1px solid rgba(212,184,150,0.24)"
                      : "1px solid rgba(196,150,95,0.34)",
                    pointerEvents: "none",
                    zIndex: 2,
                  }}
                />

                {/* Decorative Corner Accents */}
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    top: 12,
                    right: 12,
                    width: 4,
                    height: 4,
                    borderRadius: "50%",
                    background: card.isDevarsh ? "rgba(212,184,150,0.5)" : "rgba(196,150,95,0.6)",
                    pointerEvents: "none",
                    zIndex: 2,
                  }}
                />
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    bottom: 12,
                    left: 12,
                    width: 4,
                    height: 4,
                    borderRadius: "50%",
                    background: card.isDevarsh ? "rgba(212,184,150,0.5)" : "rgba(196,150,95,0.6)",
                    pointerEvents: "none",
                    zIndex: 2,
                  }}
                />

                {/* ── Founder Photo for Card 10 (Priority to image: taller, majestic crop) ── */}
                {card.isDevarsh && (
                  <div
                    style={{
                      position: "relative",
                      width: "100%",
                      height: "225px",
                      flexShrink: 0,
                      overflow: "hidden",
                    }}
                  >
                    <img
                      src="/devimg.jpeg"
                      alt="Devarsh Jain - Shaadi Pitara Founder"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        objectPosition: "center 24%",
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: "55%",
                        background: "linear-gradient(to bottom, transparent, #240508)",
                      }}
                    />

                    {/* Clean Founder Pill on Image */}
                    <div
                      style={{
                        position: "absolute",
                        top: "14px",
                        left: "14px",
                        padding: "4px 10px",
                        borderRadius: "100px",
                        background: "rgba(26, 5, 7, 0.76)",
                        backdropFilter: "blur(8px)",
                        border: "1px solid rgba(212, 184, 150, 0.45)",
                        fontFamily: "var(--font-mono)",
                        fontSize: "8.5px",
                        letterSpacing: "0.14em",
                        color: "var(--brand-gold)",
                        textTransform: "uppercase",
                        display: "flex",
                        alignItems: "center",
                        gap: 5,
                      }}
                    >
                      <span style={{ color: "#DFC18A" }}>✦</span>
                      <span>Founder · Storyteller</span>
                    </div>

                    <div
                      style={{
                        position: "absolute",
                        top: "14px",
                        right: "14px",
                        padding: "4px 10px",
                        borderRadius: "100px",
                        background: "rgba(26, 5, 7, 0.76)",
                        backdropFilter: "blur(8px)",
                        border: "1px solid rgba(212, 184, 150, 0.45)",
                        fontFamily: "var(--font-mono)",
                        fontSize: "8.5px",
                        color: "var(--brand-cream)",
                        display: "flex",
                        alignItems: "center",
                        gap: 5,
                      }}
                    >
                      <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="var(--brand-gold)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      <span>Ahmedabad</span>
                    </div>
                  </div>
                )}

                {/* ── Card Content Body ── */}
                <div
                  style={{
                    padding: card.isDevarsh ? "12px 18px 14px" : "16px 20px 14px",
                    display: "flex",
                    flexDirection: "column",
                    flex: 1,
                    justifyContent: "space-between",
                    position: "relative",
                    zIndex: 3,
                  }}
                >
                  {/* Top Content Block */}
                  <div>
                    {/* Top Header Row — Clean (Like button removed) */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: "6px",
                        marginBottom: card.isDevarsh ? "6px" : "10px",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        {/* Monogram Badge */}
                        <div
                          style={{
                            width: 22,
                            height: 22,
                            borderRadius: "50%",
                            background: card.isDevarsh ? "rgba(212,184,150,0.18)" : "#3A0B0E",
                            border: card.isDevarsh ? "1px solid var(--brand-gold)" : "1px solid rgba(196,150,95,0.4)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontFamily: "'Playfair Display', serif",
                            fontSize: "9.5px",
                            fontWeight: 700,
                            color: card.isDevarsh ? "var(--brand-gold)" : "var(--brand-cream)",
                            flexShrink: 0,
                          }}
                        >
                          SP
                        </div>

                        <span
                          style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: "9px",
                            letterSpacing: "0.14em",
                            textTransform: "uppercase",
                            padding: "2.5px 8px",
                            borderRadius: 100,
                            background: card.isDevarsh
                              ? "rgba(212,184,150,0.14)"
                              : "linear-gradient(135deg, rgba(196,150,95,0.18) 0%, rgba(58,11,14,0.08) 100%)",
                            border: card.isDevarsh
                              ? "1px solid rgba(212,184,150,0.3)"
                              : "1px solid rgba(196,150,95,0.35)",
                            color: card.isDevarsh ? "var(--brand-gold)" : "#4A1216",
                            fontWeight: 600,
                          }}
                        >
                          {card.chapter}
                        </span>
                      </div>

                      <span
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "8.5px",
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          color: card.isDevarsh ? "rgba(212,184,150,0.7)" : "#7B272C",
                          fontWeight: 500,
                        }}
                      >
                        {card.tag}
                      </span>
                    </div>

                    {/* Main Heading */}
                    {card.name ? (
                      <div style={{ marginBottom: "5px" }}>
                        <h3
                          style={{
                            fontFamily: "'Playfair Display', Georgia, serif",
                            fontSize: "24px",
                            fontWeight: 600,
                            lineHeight: 1.15,
                            margin: "0 0 2px",
                            color: "#FEF5E6",
                          }}
                        >
                          {card.name}
                        </h3>
                        <p
                          style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: "9px",
                            letterSpacing: "0.14em",
                            color: "var(--brand-gold)",
                            textTransform: "uppercase",
                            margin: 0,
                          }}
                        >
                          {card.role}
                        </p>
                      </div>
                    ) : (
                      <h3
                        style={{
                          fontFamily: "'Playfair Display', Georgia, serif",
                          fontSize: "clamp(19px, 4.8vw, 23px)",
                          fontWeight: 600,
                          lineHeight: 1.22,
                          letterSpacing: "-0.015em",
                          margin: "0 0 10px",
                          color: "#2C080B",
                        }}
                      >
                        {card.heading}
                      </h3>
                    )}

                    {/* Highlight Pull-Quote Box */}
                    {card.highlight && (
                      <div
                        style={{
                          margin: card.isDevarsh ? "6px 0 8px" : "8px 0 12px",
                          padding: card.isDevarsh ? "7px 12px" : "9px 13px",
                          background: card.isDevarsh
                            ? "linear-gradient(135deg, rgba(212,184,150,0.14) 0%, rgba(36,5,8,0.6) 100%)"
                            : "linear-gradient(135deg, rgba(196,150,95,0.18) 0%, rgba(245,229,206,0.6) 100%)",
                          borderLeft: card.isDevarsh
                            ? "3px solid var(--brand-gold)"
                            : "3px solid #8E4822",
                          borderRadius: "0 8px 8px 0",
                          boxShadow: card.isDevarsh
                            ? "0 2px 8px rgba(0,0,0,0.3)"
                            : "0 2px 6px rgba(91,23,27,0.06)",
                        }}
                      >
                        <p
                          style={{
                            fontFamily: "'Playfair Display', Georgia, serif",
                            fontSize: card.isDevarsh ? "12.5px" : "13.5px",
                            fontStyle: "italic",
                            fontWeight: 600,
                            lineHeight: 1.4,
                            margin: 0,
                            color: card.isDevarsh ? "#FBF2E3" : "#34070B",
                          }}
                        >
                          {card.highlight}
                        </p>
                      </div>
                    )}

                    {/* Narrative Story Content */}
                    {card.content && (
                      <p
                        style={{
                          fontSize: card.isDevarsh ? "12.8px" : "13.5px",
                          lineHeight: card.isDevarsh ? 1.5 : 1.62,
                          margin: card.isDevarsh ? "0 0 8px" : "0 0 12px",
                          color: card.isDevarsh
                            ? "rgba(247,230,204,0.92)"
                            : "rgba(58,11,14,0.92)",
                          fontWeight: 400,
                        }}
                      >
                        {card.content}
                      </p>
                    )}

                    {/* Bullets for Chapter 07 */}
                    {card.bullets && (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 5,
                          margin: "4px 0 10px",
                        }}
                      >
                        {card.bullets.map((b, i) => (
                          <div
                            key={i}
                            style={{
                              display: "flex",
                              alignItems: "flex-start",
                              gap: 6,
                              fontSize: "12.5px",
                              lineHeight: 1.38,
                              color: "#3D0C10",
                            }}
                          >
                            <span style={{ color: "#8E4822", fontSize: "10px", marginTop: 1 }}>✦</span>
                            <span style={{ fontWeight: 500 }}>{b}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Memory Snapshot Pills — Exactly 2 tags as requested */}
                    {card.memoryPills && (
                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: 6,
                          margin: "2px 0 6px",
                        }}
                      >
                        {card.memoryPills.slice(0, 2).map((pill, pIdx) => (
                          <span
                            key={pIdx}
                            style={{
                              fontFamily: "var(--font-mono)",
                              fontSize: "9px",
                              letterSpacing: "0.08em",
                              textTransform: "uppercase",
                              padding: "3px 9px",
                              borderRadius: 100,
                              background: card.isDevarsh
                                ? "rgba(212,184,150,0.08)"
                                : "rgba(196,150,95,0.12)",
                              border: card.isDevarsh
                                ? "1px solid rgba(212,184,150,0.2)"
                                : "1px solid rgba(196,150,95,0.25)",
                              color: card.isDevarsh ? "var(--brand-gold-light)" : "#5C1B20",
                              fontWeight: 500,
                            }}
                          >
                            ✦ {pill}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Bottom Footer Row of Card */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      paddingTop: "8px",
                      borderTop: card.isDevarsh
                        ? "1px solid rgba(212,184,150,0.18)"
                        : "1px solid rgba(196,150,95,0.32)",
                      marginTop: "auto",
                      position: "relative",
                      zIndex: 5,
                    }}
                  >
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <span
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "8.5px",
                          letterSpacing: "0.14em",
                          color: card.isDevarsh
                            ? "rgba(212,184,150,0.8)"
                            : "rgba(91,23,27,0.85)",
                          textTransform: "uppercase",
                          fontWeight: 600,
                        }}
                      >
                        {card.badge}
                      </span>
                      {card.atmosphere && (
                        <span
                          style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: "8px",
                            color: card.isDevarsh
                              ? "rgba(212,184,150,0.55)"
                              : "rgba(91,23,27,0.65)",
                            display: "flex",
                            alignItems: "center",
                            gap: 4,
                            marginTop: 2,
                          }}
                        >
                          <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                            <circle cx="12" cy="10" r="3" />
                          </svg>
                          <span>{card.atmosphere}</span>
                        </span>
                      )}
                    </div>

                    {card.isDevarsh ? (
                      <a
                        href={`https://wa.me/919377150889?text=${encodeURIComponent("Hi Shaadi Pitara, I would like to enquire about your wedding services. Please share more details. Thank you!")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          fontSize: "9px",
                          fontFamily: "var(--font-mono)",
                          letterSpacing: "0.14em",
                          textTransform: "uppercase",
                          color: "#1A0507",
                          textDecoration: "none",
                          fontWeight: 700,
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 5,
                          padding: "6px 14px",
                          background: "#F7E6CC",
                          borderRadius: 100,
                          boxShadow: "0 4px 14px rgba(247, 230, 204, 0.3)",
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
                          fontSize: "9px",
                          fontFamily: "var(--font-mono)",
                          letterSpacing: "0.12em",
                          color: "#FEF5E6",
                          background: "linear-gradient(135deg, #3A0B0E 0%, #5B171B 100%)",
                          border: "1px solid rgba(196,150,95,0.6)",
                          borderRadius: 100,
                          padding: "6px 14px",
                          cursor: "pointer",
                          fontWeight: 700,
                          textTransform: "uppercase",
                          boxShadow: "0 3px 10px rgba(58,11,14,0.22)",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 5,
                        }}
                      >
                        <span>Swipe or Tap</span>
                        <span style={{ color: "var(--brand-gold)" }}>&rarr;</span>
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* ── Bottom Controls: Previous / Slide Indicator / Next & Restart ── */}
      <div
        style={{
          marginTop: "16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 12,
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
            background: "rgba(212,184,150,0.08)",
            border: "1px solid rgba(212,184,150,0.25)",
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

        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "9px",
            letterSpacing: "0.16em",
            color: "var(--brand-gold)",
            padding: "0 4px",
          }}
        >
          {String(activeIndex + 1).padStart(2, "0")} / {String(totalCards).padStart(2, "0")}
        </span>

        {activeIndex < totalCards - 1 ? (
          <button
            type="button"
            onClick={nextCard}
            aria-label="Next story card"
            style={{
              padding: "6px 16px",
              background: "rgba(212,184,150,0.15)",
              border: "1px solid rgba(212,184,150,0.4)",
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
              background: "rgba(212,184,150,0.18)",
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
