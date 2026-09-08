"use client";
import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const contactMethods = [
  {
    title: "WhatsApp",
    description: "Chat with Devarsh directly to discuss your wedding story and vision.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      </svg>
    ),
    ctaText: "Start Conversation",
    link: "https://wa.me/919377150889",
    primary: true,
  },
  {
    title: "Email",
    description: "Send us your wedding details, dates, and vision. We will get back to you within 24 hours.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M3 7l9 6 9-6" />
      </svg>
    ),
    ctaText: "shaadi.pitaraa@gmail.com",
    link: "mailto:shaadi.pitaraa@gmail.com",
    primary: false,
  },
  {
    title: "Call",
    description: "Prefer to talk? Reach Devarsh directly to discuss dates, venues, and filming expectations.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
    ctaText: "+91 93771 50889",
    link: "tel:+919377150889",
    primary: false,
  },
  {
    title: "Instagram",
    description: "Follow our daily reels, behind-the-scenes posts, and latest cinematic wedding films.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="18" cy="6" r="1" />
      </svg>
    ),
    ctaText: "@shaadi.pitara",
    link: "https://www.instagram.com/shaadi.pitara",
    primary: false,
  },
  {
    title: "YouTube",
    description: "Extended cinematic films, full wedding documentaries, and couple story features.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polygon points="5 3 19 12 5 21 5 3" />
      </svg>
    ),
    ctaText: "@shaadi.pitara",
    link: "https://youtube.com/@shaadi.pitara",
    primary: false,
  },
  {
    title: "Pinterest",
    description: "Curated wedding inspiration boards, mood collections, and visual references.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" />
        <path d="M8 12c0-2.2 1.8-4 4-4s4 1.8 4 4c0 2.5-2 4.5-4 6" />
        <line x1="12" y1="17" x2="10" y2="22" />
      </svg>
    ),
    ctaText: "Follow Us",
    link: "https://pin.it/5GKckms5T",
    primary: false,
  },
];

function ContactCard({ method, index, cardRef }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      ref={cardRef}
      href={method.link}
      target="_blank"
      rel="noopener noreferrer"
      className="card-light focus-sq"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        padding: "clamp(28px, 3vw, 36px) clamp(24px, 2.5vw, 30px)",
        display: "flex", flexDirection: "column", gap: 16,
        textDecoration: "none",
        color: "inherit",
        position: "relative",
        overflow: "hidden",
        borderLeft: method.primary ? "3px solid var(--brand-gold)" : "3px solid transparent",
        transition: "all 0.45s cubic-bezier(0.23,1,0.32,1)",
      }}
    >
      {/* Icon */}
      <div style={{
        width: 48, height: 48,
        borderRadius: 12,
        background: method.primary ? "var(--brand-maroon-dark)" : "rgba(94,24,28,0.06)",
        color: method.primary ? "var(--brand-gold)" : "var(--brand-maroon)",
        display: "flex", alignItems: "center", justifyContent: "center",
        transition: "all 0.35s ease",
        transform: isHovered ? "scale(1.08)" : "scale(1)",
      }}>
        {method.icon}
      </div>

      <div>
        <h3 style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(18px, 2.2vw, 22px)",
          fontWeight: 600,
          color: "var(--brand-maroon-dark)",
          lineHeight: 1.25,
          marginBottom: 8,
        }}>
          {method.title}
        </h3>
        <p style={{
          fontFamily: "var(--font-body)",
          fontSize: 14,
          color: "rgba(58,13,16,0.55)",
          lineHeight: 1.7,
        }}>
          {method.description}
        </p>
      </div>

      <div style={{
        display: "inline-flex",
        alignItems: "center", gap: 8,
        fontFamily: "var(--font-mono)",
        fontSize: 10,
        letterSpacing: "0.2em",
        textTransform: "uppercase",
        color: "var(--brand-maroon)",
        fontWeight: 600,
        borderBottom: method.primary ? "2px solid var(--brand-gold)" : "1.5px solid rgba(94,24,28,0.25)",
        paddingBottom: 3,
        alignSelf: "flex-start",
        transition: "all 0.3s ease",
      }}>
        {method.ctaText}
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <path d="M7 17L17 7M17 7H7M17 7v10" />
        </svg>
      </div>
    </a>
  );
}

export default function ContactSection() {
  const secRef = useRef(null);
  const headRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headRef.current, {
        y: 50, opacity: 0, duration: 1.2, ease: "power3.out",
        scrollTrigger: { trigger: headRef.current, start: "top 85%" },
      });

      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        gsap.from(card, {
          y: 40, opacity: 0, duration: 0.8, ease: "power3.out",
          delay: index * 0.07,
          scrollTrigger: { trigger: card, start: "top 90%" },
        });
      });
    }, secRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact"
      ref={secRef}
      style={{
        padding: "clamp(80px, 10vw, 140px) clamp(16px, 4vw, 48px)",
        background: "var(--brand-maroon-dark)",
        position: "relative",
        scrollMarginTop: 72,
      }}
    >
      {/* Subtle dot texture */}
      <div aria-hidden="true" style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: `radial-gradient(rgba(94, 24, 28, 0.03) 1px, transparent 1px)`,
        backgroundSize: "28px 28px",
      }} />

      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 2 }}>
        {/* Header */}
        <div
          ref={headRef}
          style={{ textAlign: "center", marginBottom: "clamp(48px, 7vw, 80px)" }}
        >
          <div className="eyebrow-label" style={{ justifyContent: "center", color: "var(--brand-gold)" }}>
            <span style={{ background: "var(--brand-gold)", display: "block" }} />
            Let&apos;s Connect
            <span style={{ background: "var(--brand-gold)", display: "block" }} />
          </div>
          <h2 className="section-heading">
            Co-create Your Story
          </h2>
          <p style={{
            fontFamily: "var(--font-body)",
            fontSize: "clamp(15px, 1.5vw, 17px)",
            color: "rgba(58,13,16,0.55)",
            maxWidth: 540,
            margin: "16px auto 0",
            lineHeight: 1.7,
          }}>
            Every love story deserves its own filmmaker. Reach out and let&apos;s discuss how we can tell yours.
          </p>
        </div>

        {/* Contact cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
            gap: "clamp(16px, 2vw, 24px)",
            marginBottom: 48,
          }}
        >
          {contactMethods.map((method, index) => (
            <ContactCard
              key={method.title}
              method={method}
              index={index}
              cardRef={(el) => { cardsRef.current[index] = el; }}
            />
          ))}
        </div>

        {/* Direct WhatsApp highlight card */}
        <div style={{
          background: "linear-gradient(135deg, var(--brand-maroon-dark), var(--brand-maroon))",
          borderRadius: 16,
          padding: "clamp(28px, 3vw, 40px) clamp(24px, 3vw, 40px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 24,
          flexWrap: "wrap",
          border: "1px solid rgba(212,184,150,0.15)",
          position: "relative",
          overflow: "hidden",
        }}>
          {/* Decorative glow */}
          <div aria-hidden="true" style={{
            position: "absolute", top: "-50%", right: "-20%",
            width: 300, height: 300, borderRadius: "50%",
            background: "radial-gradient(ellipse, rgba(212,184,150,0.06) 0%, transparent 70%)",
            pointerEvents: "none",
          }} />

          <div style={{ display: "flex", alignItems: "center", gap: 16, position: "relative", zIndex: 2 }}>
            <div style={{
              width: 48, height: 48, borderRadius: 12,
              background: "rgba(212,184,150,0.12)",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "var(--brand-gold)",
              flexShrink: 0,
            }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              </svg>
            </div>
            <div>
              <span style={{
                fontFamily: "var(--font-mono)", fontSize: 9,
                letterSpacing: "0.22em", textTransform: "uppercase",
                color: "var(--brand-gold)", display: "block", marginBottom: 4,
              }}>
                Quickest Way to Reach Us
              </span>
              <p style={{
                fontFamily: "var(--font-body)",
                fontSize: "clamp(15px, 1.5vw, 17px)",
                color: "var(--brand-cream)",
                lineHeight: 1.6,
                maxWidth: 400,
              }}>
                Message us on WhatsApp for the fastest response. We typically reply within a few hours.
              </p>
            </div>
          </div>

          <a
            href="https://wa.me/919377150889"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            style={{
              position: "relative", zIndex: 2,
              flexShrink: 0,
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
