"use client";
import { useRef, useEffect, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    id: 1,
    name: "Priya & Arjun",
    location: "Udaipur, Rajasthan",
    quote: "Devarsh captured our wedding day in the most magical way possible. Every time we watch the reels, we're transported back to those exact moments. His attention to detail and ability to capture emotions is extraordinary.",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=400&fit=crop",
  },
  {
    id: 2,
    name: "Sofia & Marco",
    location: "Tuscany, Italy",
    quote: "We couldn't be happier with the films Devarsh created for us. He was professional, friendly, and made everyone feel comfortable. The final product was beyond our expectations.",
    image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400&h=400&fit=crop",
  },
  {
    id: 3,
    name: "Aisha & James",
    location: "Goa, India",
    quote: "Devarsh's work speaks for itself. Our wedding reels have received so many compliments from friends and family. He truly understands how to tell a story through his videos.",
    image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400&h=400&fit=crop",
  },
  {
    id: 4,
    name: "Tanvi & Siddharth",
    location: "Jodhpur, Rajasthan",
    quote: "The way Devarsh captured our traditional ceremonies with such cinematic beauty left everyone speechless. Our families still watch the reels at every gathering.",
    image: "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?w=400&h=400&fit=crop",
  },
  {
    id: 5,
    name: "Meera & Dev",
    location: "Ahmedabad, Gujarat",
    quote: "From our first call to the final delivery, Devarsh was incredibly attentive to our vision. The same-day reel he sent after our Sangeet had our entire family in tears.",
    image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=400&h=400&fit=crop",
  },
];

export default function TestimonialsSection() {
  const secRef = useRef(null);
  const headRef = useRef(null);
  const trackRef = useRef(null);
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const dragStartX = useRef(0);
  const dragDelta = useRef(0);

  const goTo = useCallback((index) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrent(index);
    setTimeout(() => setIsTransitioning(false), 700);
  }, [isTransitioning]);

  const handleNext = useCallback(() => {
    goTo((current + 1) % testimonials.length);
  }, [current, goTo]);

  const handlePrev = useCallback(() => {
    goTo((current - 1 + testimonials.length) % testimonials.length);
  }, [current, goTo]);

  const handlePointerDown = (e) => {
    dragStartX.current = e.clientX || e.touches?.[0]?.clientX || 0;
    dragDelta.current = 0;
  };

  const handlePointerMove = (e) => {
    dragDelta.current = (e.clientX || e.touches?.[0]?.clientX || 0) - dragStartX.current;
  };

  const handlePointerUp = () => {
    if (Math.abs(dragDelta.current) > 60) {
      if (dragDelta.current > 0) handlePrev();
      else handleNext();
    }
    dragDelta.current = 0;
  };

  useEffect(() => {
    const interval = setInterval(() => { handleNext(); }, 6000);
    return () => clearInterval(interval);
  }, [current, handleNext]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headRef.current, {
        y: 50, opacity: 0, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: headRef.current, start: "top 80%" },
      });
      gsap.from(trackRef.current, {
        y: 40, opacity: 0, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: trackRef.current, start: "top 85%" },
      });
    }, secRef);
    return () => ctx.revert();
  }, []);

  const t = testimonials[current];

  return (
    <section
      id="testimonials"
      ref={secRef}
      aria-label="Testimonials"
      style={{
        padding: "clamp(80px, 10vw, 140px) clamp(16px, 4vw, 48px)",
        background: "linear-gradient(175deg, var(--brand-maroon) 0%, var(--brand-maroon-dark) 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Dot texture */}
      <div aria-hidden="true" style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "radial-gradient(rgba(200,155,93,0.06) 1px, transparent 1px)",
        backgroundSize: "32px 32px",
      }} />

      <div style={{ maxWidth: 900, margin: "0 auto", position: "relative", zIndex: 2 }}>
        <div ref={headRef} style={{ textAlign: "center", marginBottom: "clamp(48px, 7vw, 80px)" }}>
          <div className="eyebrow-label" style={{ justifyContent: "center" }}>
            Client Love
          </div>
          <h2 className="section-heading">What Our Couples Say</h2>
        </div>

        <div
          ref={trackRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          style={{ position: "relative", touchAction: "pan-y" }}
        >
          <div
            className="testimonial-card"
            key={t.id}
            style={{
              opacity: isTransitioning ? 0 : 1,
              transform: isTransitioning ? "translateY(12px)" : "translateY(0)",
              transition: "all 0.6s cubic-bezier(0.23,1,0.32,1)",
            }}
          >
            <div className="testimonial-quote-mark" aria-hidden="true">&ldquo;</div>

            <p style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(18px, 2.8vw, 26px)",
              fontStyle: "italic",
              color: "var(--brand-cream)",
              lineHeight: 1.6,
              marginBottom: 36,
              position: "relative",
              zIndex: 2,
              paddingLeft: 24,
              borderLeft: "2px solid rgba(200,155,93,0.35)",
            }}>
              {t.quote}
            </p>

            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{
                width: 48, height: 48, borderRadius: "50%",
                overflow: "hidden",
                border: "2px solid rgba(200,155,93,0.4)",
                flexShrink: 0,
              }}>
                <img
                  src={t.image}
                  alt={t.name}
                  loading="lazy"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <div>
                <div style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 18,
                  fontWeight: 600,
                  color: "var(--brand-cream)",
                }}>
                  {t.name}
                </div>
                <div style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 10,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "rgba(200,155,93,0.65)",
                  marginTop: 2,
                }}>
                  {t.location}
                </div>
              </div>
            </div>
          </div>

          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 24,
            marginTop: 40,
          }}>
            <button
              onClick={handlePrev}
              aria-label="Previous testimonial"
              style={{
                width: 44, height: 44,
                borderRadius: "50%",
                border: "1px solid rgba(200,155,93,0.3)",
                background: "transparent",
                color: "var(--brand-cream)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--brand-gold)";
                e.currentTarget.style.background = "rgba(200,155,93,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(200,155,93,0.3)";
                e.currentTarget.style.background = "transparent";
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </button>

            <div style={{ display: "flex", gap: 8 }}>
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={"testimonial-dot" + (i === current ? " testimonial-dot-active" : "")}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              aria-label="Next testimonial"
              style={{
                width: 44, height: 44,
                borderRadius: "50%",
                border: "1px solid rgba(200,155,93,0.3)",
                background: "transparent",
                color: "var(--brand-cream)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--brand-gold)";
                e.currentTarget.style.background = "rgba(200,155,93,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(200,155,93,0.3)";
                e.currentTarget.style.background = "transparent";
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
