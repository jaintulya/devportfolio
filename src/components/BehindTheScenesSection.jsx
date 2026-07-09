"use client";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const btsImages = [
  {
    src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=600&fit=crop",
    wide: false,
  },
  {
    src: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&h=800&fit=crop",
    wide: false,
  },
  {
    src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&h=600&fit=crop",
    wide: true,
  },
  {
    src: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=600&h=800&fit=crop",
    wide: false,
  },
  {
    src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=600&fit=crop",
    wide: true,
  },
];

export default function BehindTheScenesSection() {
  const secRef = useRef(null);
  const headRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headRef.current,
          start: "top 80%",
        },
      });

      gsap.utils.toArray(".bts-img").forEach((img, i) => {
        gsap.from(img, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          delay: 0.1 * i,
          scrollTrigger: {
            trigger: img,
            start: "top 85%",
          },
        });
      });
    }, secRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="behind-the-scenes"
      ref={secRef}
      style={{
        padding: "120px 24px",
        background: "#F8F5F2",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div
          ref={headRef}
          style={{
            textAlign: "center",
            marginBottom: 70,
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
              fontFamily: "monospace",
              fontSize: 10,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "#C9A27E",
              marginBottom: 16,
            }}
          >
            <span
              style={{
                width: 28,
                height: 1,
                background: "#C9A27E",
                display: "block",
              }}
            />
            Behind the Scenes
            <span
              style={{
                width: 28,
                height: 1,
                background: "#C9A27E",
                display: "block",
              }}
            />
          </div>
          <h2
            style={{
              fontFamily: "var(--font-cormorant,serif)",
              fontSize: "clamp(36px, 6vw, 64px)",
              fontWeight: 300,
              lineHeight: 1.1,
              color: "#2E2E2E",
            }}
          >
            The Magic Happens Here
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 16,
          }}
        >
          {btsImages.map((img, idx) => (
            <div
              key={idx}
              className="bts-img"
              style={{
                gridColumn: img.wide ? "span 2" : "span 1",
                overflow: "hidden",
                borderRadius: 12,
              }}
            >
              <img
                src={img.src}
                alt={`Behind the scenes ${idx + 1}`}
                style={{
                  width: "100%",
                  height: img.wide ? 300 : 400,
                  objectFit: "cover",
                  transition: "transform 0.6s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
