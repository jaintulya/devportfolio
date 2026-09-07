"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const cardsData = [
  {
    id: 1,
    chapter: "CHAPTER 01 · THE BEGINNING",
    heading: "It all started with a simple love for capturing everything around me.",
    content: "In my initial days, I would shoot almost anything that caught my attention. There weren’t many fancy cameras or setups involved. I would simply use Snapchat to capture moments, put them together, edit them, and share them.",
  },
  {
    id: 2,
    chapter: "CHAPTER 02 · PEOPLE NOTICED",
    heading: "Then my friends started noticing.",
    content: "Soon, my friends started noticing the way I edited my stories.",
    quote: "“Tu hi story laga diya kar, tu achhe se edit karta hai.”",
    content2: "And honestly, I loved doing it."
  },
  {
    id: 3,
    chapter: "CHAPTER 03 · FROM FUN TO PASSION",
    heading: "What started as fun slowly became something more.",
    content: "What started as something I did just for fun slowly became something I wanted to explore professionally.",
    visual: "fun → passion"
  },
  {
    id: 4,
    chapter: "CHAPTER 04 · THE VIRAL REEL",
    heading: "During college, one reel unexpectedly went viral.",
    content: "Seeing people connect with something I had created gave me the confidence to take this passion a little more seriously."
  },
  {
    id: 5,
    chapter: "CHAPTER 05 · FOOD BLOGGERS",
    heading: "Then I started creating content for food bloggers.",
    content: "That phase taught me a lot.",
    content2: "There were days when I didn’t know if this was the right path. There was a lot of struggle, learning, experimenting, and figuring things out along the way.",
    content3: "Every project taught me something new about storytelling, editing, and most importantly, about capturing moments in a way that makes people feel something."
  },
  {
    id: 6,
    chapter: "CHAPTER 06 · THE TURNING POINT",
    heading: "Then, I discovered wedding social media.",
    content: "It immediately felt different.",
    content2: "A wedding photographer captures the beautiful, important moments — the bride walking down the aisle, the rituals, the portraits, the perfect frames.",
    content3: "But I felt there was another side to a wedding that deserved to be captured too."
  },
  {
    id: 7,
    chapter: "CHAPTER 07 · THE OTHER SIDE",
    heading: "The moments behind the moment.",
    bullets: [
      "The chaos behind the scenes.",
      "The laughter between friends.",
      "The nervousness before an entry.",
      "The parents getting emotional.",
      "The cousins dancing when nobody is watching.",
      "The little conversations.",
      "The madness.",
      "The happiness."
    ],
    content: "All the moments that make a wedding feel like a wedding."
  },
  {
    id: 8,
    chapter: "CHAPTER 08 · THE IDEA",
    heading: "We don't just capture the moment.",
    statement: "We capture the story behind the moment.",
    content: "Our content is raw, real, spontaneous and alive.",
    content2: "It captures the emotional side, the fun side, the candid side, everything that might not make it into the final wedding album, but is often what people remember the most."
  },
  {
    id: 9,
    chapter: "CHAPTER 09 · WHY IT MATTERS",
    heading: "Not just how it looked. How it felt.",
    content: "Months or even years later, you can go back to those stories and relive the wedding exactly as it felt, not just how it looked.",
    content2: "That thought became the foundation of Shadi Pitara.",
    content3: "A space where every wedding gets to tell its own story, in its own way."
  },
  {
    id: 10,
    isDevarsh: true,
    chapter: "THE PERSON BEHIND THE PITARA",
    name: "Devarsh Jain",
    role: "Founder · Wedding Social Media Creator",
    quote: "\"A love for capturing moments turned into a way of preserving how weddings actually feel.\"",
    content: "And this is only the beginning."
  }
];

export default function MobileMemoryStack() {
  const [cards, setCards] = useState(cardsData);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleDragEnd = (event, info) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;
    
    if (offset > 100 || offset < -100 || velocity > 500 || velocity < -500) {
      if (activeIndex < cards.length - 1) {
        setActiveIndex((prev) => prev + 1);
      }
    }
  };

  return (
    <section 
      className="mobile-memory-stack"
      style={{
        position: "relative",
        background: "#3A0B0E", 
        overflow: "hidden", 
        paddingTop: "60px",
        paddingBottom: "80px",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}
    >
      <div style={{ marginBottom: "20px", textAlign: "center", color: "var(--brand-cream)", zIndex: 10 }}>
        <h2 style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: "32px",
          fontWeight: 500,
          marginBottom: "8px",
          color: "var(--brand-cream)"
        }}>
          Our Story
        </h2>
        <div style={{
          fontFamily: "var(--font-mono)",
          fontSize: "12px",
          letterSpacing: "0.15em",
          color: "rgba(255,246,231,0.6)"
        }}>
          {activeIndex < cards.length ? `${String(activeIndex + 1).padStart(2, '0')} / 10` : "10 / 10"}
        </div>
      </div>

      <div style={{
        position: "relative",
        width: "100%",
        maxWidth: "380px",
        height: "550px",
        perspective: "1000px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "0 auto"
      }}>
        <AnimatePresence>
          {cards.map((card, index) => {
            if (index < activeIndex) return null;
            if (index > activeIndex + 4) return null;
            
            const isTop = index === activeIndex;
            const depthIndex = index - activeIndex; 
            
            const scale = 1 - depthIndex * 0.05;
            const yOffset = depthIndex * 15; 
            const opacity = 1 - depthIndex * 0.2;
            const zIndexVal = cards.length - index;
            const initialRotation = depthIndex % 2 === 0 ? depthIndex * 2 : -depthIndex * 2;

            return (
              <motion.div
                key={card.id}
                drag={isTop ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={handleDragEnd}
                initial={{ 
                  scale: 0.8, 
                  opacity: 0, 
                  y: 50 
                }}
                animate={{ 
                  scale: scale, 
                  y: yOffset,
                  opacity: opacity,
                  rotate: isTop ? 0 : initialRotation,
                  z: -depthIndex * 50
                }}
                exit={{ 
                  x: 400, 
                  opacity: 0, 
                  rotate: 15,
                  transition: { duration: 0.3 }
                }}
                whileDrag={{ scale: 0.98, rotate: 5, cursor: "grabbing" }}
                style={{
                  position: "absolute",
                  width: "88%",
                  height: "100%",
                  maxHeight: "520px",
                  background: card.isDevarsh ? "#2b080a" : "var(--brand-ivory)",
                  borderRadius: "16px",
                  boxShadow: isTop 
                    ? "0 25px 50px -12px rgba(0, 0, 0, 0.4), 0 0 10px rgba(0,0,0,0.1)" 
                    : "0 10px 30px rgba(0, 0, 0, 0.3)",
                  zIndex: zIndexVal,
                  cursor: isTop ? "grab" : "auto",
                  display: "flex",
                  flexDirection: "column",
                  color: card.isDevarsh ? "var(--brand-cream)" : "var(--brand-maroon-dark)",
                  overflow: "hidden",
                  border: card.isDevarsh ? "1px solid rgba(255,246,231,0.1)" : "1px solid rgba(91,23,27,0.1)",
                  transformOrigin: "bottom center"
                }}
              >
                {card.isDevarsh && (
                  <div style={{ position: "relative", width: "100%", height: "55%", flexShrink: 0, overflow: "hidden" }}>
                    <img 
                      src="/devimg.jpeg" 
                      alt="Devarsh Jain" 
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        objectPosition: "center top"
                      }}
                    />
                    <div style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      width: "100%",
                      height: "40%",
                      background: "linear-gradient(to bottom, transparent, #2b080a)"
                    }} />
                  </div>
                )}

                <div style={{
                  padding: "24px",
                  display: "flex",
                  flexDirection: "column",
                  flex: 1,
                  justifyContent: card.isDevarsh ? "flex-end" : "center",
                  paddingTop: card.isDevarsh ? "10px" : "32px",
                }}>
                  <div style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "10px",
                    letterSpacing: "0.14em",
                    color: card.isDevarsh ? "#d1afa4" : "#9E776A",
                    marginBottom: "16px",
                    textTransform: "uppercase"
                  }}>
                    {card.chapter}
                  </div>
                  
                  {card.name && (
                    <h2 style={{
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                      fontWeight: 500,
                      fontSize: "36px",
                      lineHeight: 1,
                      margin: "0 0 4px",
                    }}>
                      {card.name}
                    </h2>
                  )}

                  {card.role && (
                    <p style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "10px",
                      letterSpacing: "0.08em",
                      color: "#b99186",
                      textTransform: "uppercase",
                      marginBottom: "16px"
                    }}>
                      {card.role}
                    </p>
                  )}

                  {card.heading && (
                    <h2 style={{
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                      fontWeight: 500,
                      fontSize: "30px",
                      lineHeight: 1.1,
                      letterSpacing: "-0.02em",
                      margin: "0 0 20px",
                    }}>
                      {card.heading}
                    </h2>
                  )}
                  
                  <div style={{ 
                    overflowY: "auto", 
                    paddingRight: "4px",
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px"
                  }}>
                    {card.content && (
                      <p style={{
                        fontSize: "14px",
                        lineHeight: 1.6,
                        margin: 0,
                        color: card.isDevarsh ? "rgba(255,246,231,0.8)" : "rgba(91,23,27,0.85)"
                      }}>
                        {card.content}
                      </p>
                    )}
                    
                    {card.quote && (
                      <p style={{
                        fontFamily: "'Cormorant Garamond', Georgia, serif",
                        fontSize: "20px",
                        fontWeight: 500,
                        fontStyle: "italic",
                        margin: "8px 0",
                        color: card.isDevarsh ? "#fff" : "var(--brand-maroon-dark)"
                      }}>
                        {card.quote}
                      </p>
                    )}

                    {card.visual && (
                      <div style={{
                        display: "inline-block",
                        background: "rgba(91,23,27,0.06)",
                        padding: "8px 16px",
                        borderRadius: "20px",
                        fontFamily: "'Cormorant Garamond', Georgia, serif",
                        fontSize: "22px",
                        fontStyle: "italic",
                        textAlign: "center",
                        marginTop: "8px",
                        marginBottom: "8px",
                        color: "var(--brand-maroon-dark)",
                        alignSelf: "flex-start"
                      }}>
                        {card.visual}
                      </div>
                    )}

                    {card.statement && (
                      <p style={{
                        fontFamily: "'Cormorant Garamond', Georgia, serif",
                        fontSize: "26px",
                        fontWeight: 500,
                        lineHeight: 1.2,
                        margin: "4px 0",
                        color: "var(--brand-maroon-dark)"
                      }}>
                        {card.statement}
                      </p>
                    )}
                    
                    {card.bullets && (
                      <ul style={{
                        margin: "8px 0",
                        paddingLeft: "18px",
                        fontSize: "14px",
                        lineHeight: 1.6,
                        color: "rgba(91,23,27,0.85)"
                      }}>
                        {card.bullets.map((bullet, i) => (
                          <li key={i} style={{ marginBottom: "6px" }}>{bullet}</li>
                        ))}
                      </ul>
                    )}

                    {card.content2 && (
                      <p style={{
                        fontSize: "14px",
                        lineHeight: 1.6,
                        margin: 0,
                        color: "rgba(91,23,27,0.85)"
                      }}>
                        {card.content2}
                      </p>
                    )}
                    
                    {card.content3 && (
                      <p style={{
                        fontSize: "14px",
                        lineHeight: 1.6,
                        margin: 0,
                        color: "rgba(91,23,27,0.85)"
                      }}>
                        {card.content3}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {activeIndex === cards.length - 1 && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          style={{ 
            marginTop: "30px", 
            textAlign: "center", 
            color: "rgba(255,246,231,0.6)",
            fontFamily: "var(--font-mono)",
            fontSize: "10px",
            letterSpacing: "0.15em"
          }}
        >
          CONTINUE ↓
        </motion.div>
      )}
    </section>
  );
}
