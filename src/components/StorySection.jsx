"use client";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const storyParagraphs = [
  "It all started with a simple love for capturing everything around me. In my initial days, I would shoot almost anything that caught my attention. There weren't many fancy cameras or setups involved — I would simply use Snapchat to capture moments, put them together, edit them, and share them.",

  "Soon, my friends started noticing the way I edited my stories. Whenever something happened in our group, I would hear, \"Tu hi story laga diya kar, tu achhe se edit karta hai.\" And honestly, I loved doing it. What started as something I did just for fun slowly became something I wanted to explore professionally.",

  "During college, I also created a reel that unexpectedly went viral. Seeing people connect with something I had created gave me the confidence to take this passion a little more seriously. That eventually led me to start shooting and creating content for food bloggers. That phase taught me a lot.",

  "There were days when I didn't know if this is the right path. There was a lot of struggle, learning, experimenting, and figuring things out along the way. But every project taught me something new about storytelling, editing, and most importantly, about capturing moments in a way that makes people feel something.",

  "And then, I discovered wedding social media. It immediately felt different. A wedding photographer captures the beautiful, important moments — the bride walking down the aisle, the rituals, the portraits, the perfect frames. But I felt there was another side to a wedding that deserved to be captured too. The chaos behind the scenes. The laughter between friends. The nervousness before an entry. The parents getting emotional. The cousins dancing when nobody is watching. The little conversations, the madness, the happiness — all the moments that make a wedding feel like a wedding.",

  "We don't just capture the moment. We capture the story behind the moment. Our content is raw, real, spontaneous and alive. It captures the emotional side, the fun side, the candid side — everything that might not make it into the final wedding album, but is often what people remember the most. Months or even years later, you can go back to those stories and relive the wedding exactly as it felt, not just how it looked.",

  "That thought became the foundation of Shadi Pitara. A space where every wedding gets to tell its own story, in its own way. I'm Devarsh Jain, and this is how my love for capturing moments turned into Shadi Pitara.",
];

const pullQuote = "We don't just capture the moment. We capture the story behind the moment.";

export default function StorySection() {
  const secRef = useRef(null);
  const headRef = useRef(null);
  const quoteRef = useRef(null);
  const paraRefs = useRef([]);
  const portraitRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headRef.current, {
        y: 50, opacity: 0, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: headRef.current, start: "top 80%" },
      });

      gsap.from(quoteRef.current, {
        y: 40, opacity: 0, duration: 1.1, ease: "power3.out",
        scrollTrigger: { trigger: quoteRef.current, start: "top 85%" },
      });

      if (portraitRef.current) {
        gsap.from(portraitRef.current, {
          y: 60, opacity: 0, duration: 1.2, ease: "power3.out",
          scrollTrigger: { trigger: portraitRef.current, start: "top 85%" },
        });
      }

      paraRefs.current.forEach((para, i) => {
        if (!para) return;
        gsap.from(para, {
          y: 30, opacity: 0, duration: 0.9, ease: "power3.out",
          delay: 0.03,
          scrollTrigger: { trigger: para, start: "top 88%" },
        });
      });
    }, secRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="story"
      ref={secRef}
      aria-label="Behind the Lens — Our Story"
      style={{
        position: "relative",
        padding: "clamp(80px, 10vw, 140px) clamp(16px, 4vw, 48px)",
        background: "linear-gradient(175deg, var(--brand-maroon-dark) 0%, var(--brand-maroon) 50%, var(--brand-maroon-dark) 100%)",
        overflow: "hidden",
      }}
    >
      {/* Ambient warm glows */}
      <div aria-hidden="true" style={{ position: "absolute", top: "-10%", right: "-8%", width: 550, height: 550, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(200,155,93,0.05) 0%, transparent 70%)", filter: "blur(80px)", pointerEvents: "none" }} />
      <div aria-hidden="true" style={{ position: "absolute", bottom: "-5%", left: "-10%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(200,155,93,0.04) 0%, transparent 70%)", filter: "blur(60px)", pointerEvents: "none" }} />

      {/* Dot texture */}
      <div aria-hidden="true" style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: `radial-gradient(rgba(200,155,93,0.04) 1px, transparent 1px)`,
        backgroundSize: "32px 32px",
      }} />

      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 2 }}>
        {/* Section header */}
        <div ref={headRef} style={{ textAlign: "center", marginBottom: "clamp(48px, 7vw, 88px)" }}>
          <div className="eyebrow-label" style={{ justifyContent: "center" }}>
            How Shaadi Pitara Started
          </div>
          <h2 className="section-heading">
            The Story
          </h2>
        </div>

        {/* Pull quote — centered, gold italic */}
        <div
          ref={quoteRef}
          style={{
            textAlign: "center",
            marginBottom: "clamp(48px, 7vw, 88px)",
            padding: "0 24px",
          }}
        >
          <span style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(22px, 3.5vw, 34px)",
            fontWeight: 400,
            fontStyle: "italic",
            lineHeight: 1.5,
            color: "var(--brand-gold)",
            maxWidth: 720,
            display: "inline-block",
            position: "relative",
          }}>
            &ldquo;{pullQuote}&rdquo;
          </span>
        </div>

        {/* Editorial layout: text + portrait */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "clamp(40px, 6vw, 72px)",
          alignItems: "start",
        }}
        className="story-layout"
        >
          <style>{`
            @media (min-width: 768px) {
              .story-layout {
                grid-template-columns: 1fr 280px !important;
              }
            }
          `}</style>

          {/* Text column */}
          <div>
            {storyParagraphs.map((para, i) => (
              <p
                key={i}
                ref={(el) => { paraRefs.current[i] = el; }}
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "clamp(15px, 1.5vw, 17px)",
                  color: "rgba(245,230,204,0.65)",
                  lineHeight: 1.85,
                  marginBottom: i < storyParagraphs.length - 1 ? 24 : 0,
                  maxWidth: 560,
                }}
              >
                {para}
              </p>
            ))}
          </div>

          {/* Portrait column — sticky on desktop */}
          <div
            ref={portraitRef}
            style={{
              position: "sticky",
              top: 120,
            }}
            className="hidden md:block"
          >
            <div style={{
              position: "relative",
              borderRadius: 12,
              overflow: "hidden",
              aspectRatio: "3/4",
              border: "1px solid rgba(200,155,93,0.2)",
              boxShadow: "0 24px 56px rgba(0,0,0,0.3)",
            }}>
              <Image
                src="https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=800&fit=crop"
                alt="Devarsh Jain — Shaadi Pitara Founder"
                fill
                sizes="280px"
                style={{ objectFit: "cover" }}
                priority={false}
              />
              {/* Gold accent border */}
              <div style={{
                position: "absolute", inset: 0,
                border: "1px solid rgba(200,155,93,0.1)",
                borderRadius: 12,
                pointerEvents: "none",
              }} />
            </div>
            <p style={{
              fontFamily: "var(--font-mono)",
              fontSize: 9,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(200,155,93,0.5)",
              marginTop: 12,
              textAlign: "center",
            }}>
              Devarsh Jain · Founder
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
