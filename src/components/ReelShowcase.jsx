"use client";
import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);


const reels = [
  {
    id: 1,
    title: "Golden Hour Vows",
    client: "Priya & Arjun",
    location: "Udaipur, Rajasthan",
    duration: "3:24",
    type: "Wedding Reel",
    hasDrone: true,
    video: "https://assets.mixkit.co/videos/preview/mixkit-bride-and-groom-holding-hands-41139-large.mp4",
    thumbnail:
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=1200&fit=crop",
    color: "#C9A27E",
  },
  {
    id: 2,
    title: "Love in the Mist",
    client: "Sofia & Marco",
    location: "Tuscany, Italy",
    duration: "2:58",
    type: "Couple Story",
    hasDrone: true,
    video: "https://assets.mixkit.co/videos/preview/mixkit-groom-putting-the-ring-on-his-brides-finger-41142-large.mp4",
    thumbnail:
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&h=1200&fit=crop",
    color: "#A8825A",
  },
  {
    id: 3,
    title: "Beach Ceremony",
    client: "Aisha & James",
    location: "Goa, India",
    duration: "4:12",
    type: "Wedding Reel",
    hasDrone: true,
    video: "https://assets.mixkit.co/videos/preview/mixkit-beautiful-wedding-rings-on-the-table-41135-large.mp4",
    thumbnail:
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&h=1200&fit=crop",
    color: "#E8CBAA",
  },
  {
    id: 4,
    title: "City Romance",
    client: "Maya & Dev",
    location: "Ahmedabad, India",
    duration: "1:45",
    type: "Instagram Reel",
    hasDrone: false,
    video: "https://assets.mixkit.co/videos/preview/mixkit-putting-the-wedding-ring-on-the-finger-41143-large.mp4",
    thumbnail:
      "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&h=1200&fit=crop",
    color: "#BF9870",
  },
];

function ReelCard({ reel, index }) {
  const cardRef = useRef(null);
  const videoRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [timer, setTimer] = useState("00:00");
  const timerRef = useRef(null);
  const startRef = useRef(null);

  useEffect(() => {
    if (hovered) {
      startRef.current = Date.now();
      timerRef.current = setInterval(() => {
        const elapsed = Math.floor((Date.now() - startRef.current) / 1000);
        const minutes = String(Math.floor(elapsed / 60)).padStart(2, "0");
        const seconds = String(elapsed % 60).padStart(2, "0");
        setTimer(`${minutes}:${seconds}`);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
      setTimer("00:00");
    }
    return () => clearInterval(timerRef.current);
  }, [hovered]);

  useEffect(() => {
    gsap.from(cardRef.current, {
      y: 80,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      delay: index * 0.15,
      scrollTrigger: {
        trigger: cardRef.current,
        start: "top 85%",
      },
    });
  }, [index]);

  return (
    <div
      ref={cardRef}
      className="reel-card-wrap"
      style={{
        position: "relative",
        aspectRatio: "9/16",
        overflow: "hidden",
        borderRadius: 12,
        cursor: "none",
        background: "#0a0a0a",
      }}
      onMouseEnter={() => {
        setHovered(true);
        videoRef.current?.play().catch(() => {});
      }}
      onMouseLeave={() => {
        setHovered(false);
        if (videoRef.current) {
          videoRef.current.pause();
          videoRef.current.currentTime = 0;
        }
      }}
    >
      {/* Thumbnail */}
      <img
        src={reel.thumbnail}
        alt={reel.title}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: hovered ? 0 : 1,
          transition: "opacity 0.5s ease",
          filter: hovered ? "blur(4px)" : "blur(0)",
        }}
      />

      {/* Video */}
      <video
        ref={videoRef}
        src={reel.video}
        muted
        loop
        playsInline
        preload="metadata"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.5s ease",
          transform: hovered ? "scale(1.05)" : "scale(1)",
        }}
      />

      {/* Vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.4) 40%, rgba(0,0,0,0.1) 100%)",
          zIndex: 10,
          pointerEvents: "none",
        }}
      />

      {/* Top Info */}
      <div
        style={{
          position: "absolute",
          top: 16,
          left: 16,
          right: 16,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          zIndex: 20,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            background: "rgba(0,0,0,0.6)",
            backdropFilter: "blur(8px)",
            padding: "4px 10px",
            borderRadius: 20,
          }}
        >
          <span
            className="rec-dot"
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#ef4444",
              display: "inline-block",
            }}
          />
          <span
            style={{
              fontFamily: "monospace",
              fontSize: 10,
              color: "#fff",
              letterSpacing: "0.1em",
            }}
          >
            REC
          </span>
        </div>
        <span
          style={{
            fontFamily: "monospace",
            fontSize: 10,
            color: "#fff",
            background: "rgba(0,0,0,0.6)",
            backdropFilter: "blur(8px)",
            padding: "4px 10px",
            borderRadius: 20,
          }}
        >
          {timer}
        </span>
      </div>

      {/* Icons */}
      <div
        style={{
          position: "absolute",
          top: 60,
          right: 16,
          display: "flex",
          flexDirection: "column",
          gap: 10,
          zIndex: 20,
        }}
      >
        {reel.hasDrone && (
          <div
            style={{
              width: 36,
              height: 36,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(0,0,0,0.6)",
              backdropFilter: "blur(8px)",
              borderRadius: "50%",
              border: "1px solid rgba(255,255,255,0.2)",
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#fff"
              strokeWidth="1.5"
            >
              <circle cx="12" cy="12" r="3" />
              <circle cx="5" cy="5" r="2" />
              <circle cx="19" cy="5" r="2" />
              <circle cx="5" cy="19" r="2" />
              <circle cx="19" cy="19" r="2" />
              <line x1="5" y1="5" x2="10" y2="10" />
              <line x1="19" y1="5" x2="14" y2="10" />
              <line x1="5" y1="19" x2="10" y2="14" />
              <line x1="19" y1="19" x2="14" y2="14" />
            </svg>
          </div>
        )}
        <div
          style={{
            width: 36,
            height: 36,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(0,0,0,0.6)",
            backdropFilter: "blur(8px)",
            borderRadius: "50%",
            border: "1px solid rgba(255,255,255,0.2)",
          }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#fff"
            strokeWidth="1.5"
          >
            <rect x="3" y="3" width="18" height="18" rx="3" />
            <line x1="3" y1="9" x2="21" y2="9" />
            <line x1="9" y1="21" x2="9" y2="9" />
          </svg>
        </div>
      </div>

      {/* Content */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "20px 20px 24px",
          zIndex: 20,
        }}
      >
        <div
          style={{
            fontFamily: "monospace",
            fontSize: 10,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: reel.color,
            marginBottom: 6,
          }}
        >
          {reel.type}
        </div>
        <h3
          style={{
            fontFamily: "var(--font-cormorant,serif)",
            fontSize: 24,
            fontWeight: 600,
            color: "#fff",
            marginBottom: 6,
            lineHeight: 1.2,
          }}
        >
          {reel.title}
        </h3>
        <p
          style={{
            fontFamily: "var(--font-jost, sans-serif)",
            fontSize: 13,
            color: "rgba(255,255,255,0.7)",
            marginBottom: 12,
          }}
        >
          {reel.client} • {reel.location}
        </p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginTop: 12,
          }}
        >
          <div
            style={{
              flex: 1,
              height: 1,
              background: `linear-gradient(to right, ${reel.color}, transparent)`,
            }}
          />
          <span
            style={{
              fontFamily: "monospace",
              fontSize: 10,
              color: reel.color,
              letterSpacing: "0.15em",
            }}
          >
            {reel.duration}
          </span>
        </div>

        {/* Watch Story Button (hover) */}
        <div
          style={{
            marginTop: 16,
            textAlign: "center",
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translateY(0)" : "translateY(10px)",
            transition: "all 0.3s ease",
            pointerEvents: hovered ? "auto" : "none",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontFamily: "monospace",
              fontSize: 11,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#fff",
              border: `1px solid ${reel.color}`,
              padding: "10px 20px",
              borderRadius: 30,
            }}
          >
            Watch Story
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#fff"
              strokeWidth="1.5"
            >
              <path d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ReelShowcase() {
  const secRef = useRef(null);
  const headRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headRef.current, {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headRef.current,
          start: "top 80%",
        },
      });
    }, secRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="reels"
      ref={secRef}
      style={{
        padding: "120px 24px",
        background: "linear-gradient(to bottom, #080706, #121110)",
        color: "#fff",
        position: "relative"
      }}
    >
      <div id="work" className="absolute top-0 left-0 w-0 h-0" style={{ pointerEvents: 'none' }} />
      <div
        style={{
          maxWidth: 1400,
          margin: "0 auto",
        }}
      >
        <div ref={headRef} style={{ marginBottom: 60 }}>
          <div
            style={{
              display: "flex",
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
            Featured Work
          </div>
          <h2
            style={{
              fontFamily: "var(--font-cormorant,serif)",
              fontSize: "clamp(36px, 6vw, 72px)",
              fontWeight: 300,
              lineHeight: 1.1,
              marginBottom: 16,
            }}
          >
            Cinematic Stories
            <br />
            <span
              className="gold-shimmer-text"
              style={{
                fontStyle: "italic",
                fontWeight: 500,
              }}
            >
              You'll Cherish Forever
            </span>
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 24,
          }}
          className="reel-grid"
        >
          {reels.map((reel, index) => (
            <ReelCard key={reel.id} reel={reel} index={index} />
          ))}
        </div>

        <div
          style={{
            marginTop: 80,
            textAlign: "center",
          }}
        >
          <a
            href="https://instagram.com/contentkapitara"
            target="_blank"
            rel="noopener noreferrer"
            className="focus-sq"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
              padding: "16px 32px",
              border: "1px solid rgba(201,162,126,0.4)",
              fontFamily: "monospace",
              fontSize: 10,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#fff",
              textDecoration: "none",
              background: "transparent",
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
            View All on Instagram
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
