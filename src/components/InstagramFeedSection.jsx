"use client";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const instagramPosts = [
  {
    src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=400&fit=crop",
  },
  {
    src: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400&h=400&fit=crop",
  },
  {
    src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400&h=400&fit=crop",
  },
  {
    src: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=400&h=400&fit=crop",
  },
  {
    src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=400&fit=crop",
  },
  {
    src: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400&h=400&fit=crop",
  },
];

export default function InstagramFeedSection() {
  const secRef = useRef(null);
  const headRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headRef.current, {
        y: 50,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headRef.current,
          start: "top 80%",
        },
      });

      gsap.utils.toArray(".ig-post").forEach((post, i) => {
        gsap.from(post, {
          y: 40,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          delay: 0.1 * i,
          scrollTrigger: {
            trigger: post,
            start: "top 90%",
          },
        });
      });
    }, secRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="instagram"
      ref={secRef}
      style={{
        padding: "120px 24px",
        background: "#080706",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div
          ref={headRef}
          style={{
            textAlign: "center",
            marginBottom: 60,
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
            @contentkapitara
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
              color: "#F8F5F2",
            }}
          >
            Follow Our Journey
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(6, 1fr)",
            gap: 16,
          }}
        >
          {instagramPosts.map((post, idx) => (
            <a
              key={idx}
              href="https://instagram.com/contentkapitara"
              target="_blank"
              rel="noopener noreferrer"
              className="ig-post focus-sq"
              style={{
                aspectRatio: 1,
                overflow: "hidden",
                borderRadius: 8,
                position: "relative",
                display: "block",
              }}
            >
              <img
                src={post.src}
                alt={`Instagram ${idx + 1}`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "transform 0.5s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "rgba(201,162,126,0.8)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  opacity: 0,
                  transition: "opacity 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = 1;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = 0;
                }}
              >
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="1.5"
                >
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="18" cy="6" r="1" />
                </svg>
              </div>
            </a>
          ))}
        </div>

        <div style={{ marginTop: 50, textAlign: "center" }}>
          <a
            href="https://instagram.com/contentkapitara"
            target="_blank"
            rel="noopener noreferrer"
            className="focus-sq"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "14px 32px",
              border: "1px solid rgba(201,162,126,0.4)",
              color: "#F8F5F2",
              fontFamily: "monospace",
              fontSize: 10,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              borderRadius: 8,
              textDecoration: "none",
              cursor: "none",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#C9A27E";
              e.currentTarget.style.background = "rgba(201,162,126,0.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(201,162,126,0.4)";
              e.currentTarget.style.background = "transparent";
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="18" cy="6" r="1" />
            </svg>
            View on Instagram
          </a>
        </div>
      </div>
    </section>
  );
}
