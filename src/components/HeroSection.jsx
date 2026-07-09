"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const WEDDING_VIDEO =
  "https://assets.mixkit.co/videos/preview/mixkit-newlyweds-slow-dancing-at-their-wedding-reception-41148-large.mp4"; // Cinematic wedding video placeholder

export default function HeroSection() {
  const secRef = useRef(null);
  const textRef = useRef(null);
  const badgeRef = useRef(null);
  const h1Ref = useRef(null);
  const subRef = useRef(null);
  const btnsRef = useRef(null);
  const statsRef = useRef(null);
  const scrollIndRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.4 });
      tl.from(badgeRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
      })
        .from(
          h1Ref.current?.querySelectorAll(".hl"),
          {
            y: 70,
            opacity: 0,
            duration: 0.9,
            stagger: 0.1,
            ease: "power3.out",
          },
          "-=0.3",
        )
        .from(
          subRef.current,
          { y: 20, opacity: 0, duration: 0.7, ease: "power3.out" },
          "-=0.4",
        )
        .from(
          btnsRef.current?.children,
          {
            y: 20,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power3.out",
          },
          "-=0.3",
        )
        .from(
          statsRef.current?.children,
          { y: 15, opacity: 0, duration: 0.5, stagger: 0.1 },
          "-=0.2",
        )
        .from(scrollIndRef.current, { opacity: 0, duration: 0.8 }, "-=0.2");

      gsap.to(textRef.current, {
        y: -60,
        opacity: 0,
        scrollTrigger: {
          trigger: secRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
      });
    }, secRef);
    return () => ctx.revert();
  }, []);

  const go = (id) =>
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      ref={secRef}
      id="hero"
      style={{
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        background:
          "linear-gradient(135deg,#F8F5F2 0%,#F3EDE6 55%,#EDE4D8 100%)",
      }}
    >
      <div id="home" className="absolute top-0 left-0 w-0 h-0" style={{ pointerEvents: 'none' }} />
      {/* Ambient blobs */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          right: "15%",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse,rgba(201,162,126,0.18) 0%,transparent 70%)",
          filter: "blur(70px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "25%",
          left: "8%",
          width: 300,
          height: 300,
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse,rgba(201,162,126,0.1) 0%,transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />
      {/* Grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.025,
          backgroundImage:
            "linear-gradient(#2E2E2E 1px,transparent 1px),linear-gradient(90deg,#2E2E2E 1px,transparent 1px)",
          backgroundSize: "80px 80px",
          pointerEvents: "none",
        }}
      />
      {/* Floating dust */}
      <DustParticles />

      <div className="max-w-[1280px] mx-auto px-6 md:px-12 py-[100px] md:py-[130px] grid lg:grid-cols-2 gap-12 lg:gap-20 items-center min-h-screen">
        {/* Text */}
        <div ref={textRef} className="relative z-[2] text-center lg:text-left">
          <div
            ref={badgeRef}
            className="flex items-center justify-center lg:justify-start gap-2.5 mb-7"
          >
            <span className="rec-dot w-1.5 h-1.5 rounded-full bg-red-500 shrink-0 inline-block" />
            <span className="font-mono text-[9px] md:text-[11px] tracking-[0.3em] uppercase text-[#C9A27E]">
              Available for 2025 Weddings
            </span>
          </div>

          <div ref={h1Ref} className="overflow-hidden mb-6">
            <h1 className="font-display text-[2.8rem] sm:text-[4rem] md:text-[5rem] lg:text-[5.8rem] leading-[0.95] lg:leading-[0.92] font-light text-[#2E2E2E]">
              <span className="hl block">Turning</span>
              <span className="hl gold-shimmer-text block italic font-semibold scale-[1.08] origin-center lg:origin-left">
                Moments
              </span>
              <span className="hl block">Into</span>
              <span className="hl block font-bold">Cinematic</span>
              <span className="hl block font-light">Memories.</span>
            </h1>
          </div>

          <p
            ref={subRef}
            className="font-mono text-[9px] md:text-[11px] tracking-[0.22em] uppercase text-[#6B6B6B] mb-10 leading-[1.8]"
          >
            Wedding Reels · Couple Stories · Timeless Films
          </p>

          <div
            ref={btnsRef}
            className="flex flex-wrap justify-center lg:justify-start gap-3.5 mb-12"
          >
            <MagneticButton onClick={() => go("#reels")} variant="primary">
              Watch Showreel
            </MagneticButton>
            <MagneticButton onClick={() => go("#contact")} variant="secondary">
              Book Your Date
            </MagneticButton>
          </div>

          <div
            ref={statsRef}
            className="flex justify-center lg:justify-start gap-8 md:gap-10 border-t border-[#2E2E2E10] pt-8 flex-wrap"
          >
            {[
              { number: "120+", label: "Weddings Shot", animateTo: 120 },
              { number: "4+", label: "Years Experience", animateTo: 4 },
              { number: "50K+", label: "Social Views", animateTo: 50 },
              { number: "15+", label: "Cities Covered", animateTo: 15 },
            ].map((stat) => (
              <AnimatedStat key={stat.label} stat={stat} />
            ))}
          </div>
        </div>

        {/* Lens */}
        <div className="flex items-center justify-center relative z-[2]">
          <div className="w-full max-w-[520px]">
            <CameraLens videoSrc={WEDDING_VIDEO} />
          </div>
        </div>
      </div>

      {/* Scroll indicator - Film strip */}
      <div
        ref={scrollIndRef}
        style={{
          position: "absolute",
          bottom: 28,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 10,
          zIndex: 5,
        }}
      >
        <span
          style={{
            fontFamily: "monospace",
            fontSize: 9,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "#6B6B6B",
          }}
        >
          Scroll to Discover
        </span>
        <FilmStripScrollIndicator />
      </div>
    </section>
  );
}

function AnimatedStat({ stat }) {
  const [count, setCount] = useState(0);
  const [mounted, setMounted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let current = 0;
          const increment = stat.animateTo / 50;
          const timer = setInterval(() => {
            current += increment;
            if (current >= stat.animateTo) {
              setCount(stat.animateTo);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, 30);
          return () => clearInterval(timer);
        }
      },
      { threshold: 0.5 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [stat.animateTo, mounted]);

  return (
    <div ref={ref} className="text-center lg:text-left">
      <div className="font-display text-2xl md:text-3xl font-semibold">
        {count}
        {stat.label.includes("Weddings") || stat.label.includes("Cities")
          ? "+"
          : stat.label.includes("Views")
            ? "K+"
            : "+ Years"}
      </div>
      <div className="font-mono text-[9px] tracking-[0.2em] uppercase text-[#6B6B6B] mt-1">
        {stat.label}
      </div>
    </div>
  );
}

function CameraLens({ videoSrc }) {
  const [revealed, setRevealed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [ringAngle, setRingAngle] = useState(0);
  const [lensRotation, setLensRotation] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef(null);
  const rafRef = useRef(null);
  const lastTimeRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const check = () => setIsMobile(window.matchMedia("(hover:none)").matches);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const animate = (time) => {
      if (lastTimeRef.current !== null) {
        const delta = (time - lastTimeRef.current) / 1000;
        setRingAngle((a) => a + delta * 6);
      }
      lastTimeRef.current = time;
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [mounted]);

  const handleMouseMove = useCallback(
    (e) => {
      if (!containerRef.current || isMobile) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const x = (e.clientX - centerX) / 50;
      const y = (e.clientY - centerY) / 50;
      setLensRotation({ x: -y, y: x });
    },
    [isMobile],
  );

  const handleMouseLeave = useCallback(() => {
    setLensRotation({ x: 0, y: 0 });
  }, []);

  const S = 400,
    cx = 200,
    cy = 200,
    outerR = 184,
    goldR = 173,
    goldInR = 165,
    bodyR = 156,
    bezelR = 142,
    glassR = 132;

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => !isMobile && setRevealed(true)}
      onMouseLeave={() => {
        !isMobile && setRevealed(false);
        handleMouseLeave();
      }}
      onMouseMove={handleMouseMove}
      onClick={() => isMobile && setRevealed((v) => !v)}
      style={{
        position: "relative",
        width: "100%",
        maxWidth: "min(480px,90vw)",
        aspectRatio: "1",
        margin: "0 auto",
        cursor: isMobile ? "pointer" : "none",
        userSelect: "none",
        transform: `perspective(1000px) rotateX(${lensRotation.x}deg) rotateY(${lensRotation.y}deg)`,
        transition: "transform 0.1s ease-out",
      }}
    >
      {/* Glow */}
      <div
        style={{
          position: "absolute",
          inset: "-10%",
          borderRadius: "50%",
          background: revealed
            ? "radial-gradient(ellipse,rgba(201,162,126,0.2) 0%,transparent 70%)"
            : "radial-gradient(ellipse,rgba(201,162,126,0.07) 0%,transparent 70%)",
          filter: "blur(40px)",
          transition: "background 0.9s ease",
          pointerEvents: "none",
        }}
      />
      {/* Corners */}
      {[
        {
          top: 8,
          left: 8,
          borderTop: "1.5px solid rgba(201,162,126,0.4)",
          borderLeft: "1.5px solid rgba(201,162,126,0.4)",
        },
        {
          top: 8,
          right: 8,
          borderTop: "1.5px solid rgba(201,162,126,0.4)",
          borderRight: "1.5px solid rgba(201,162,126,0.4)",
        },
        {
          bottom: 36,
          left: 8,
          borderBottom: "1.5px solid rgba(201,162,126,0.4)",
          borderLeft: "1.5px solid rgba(201,162,126,0.4)",
        },
        {
          bottom: 36,
          right: 8,
          borderBottom: "1.5px solid rgba(201,162,126,0.4)",
          borderRight: "1.5px solid rgba(201,162,126,0.4)",
        },
      ].map((s, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: 24,
            height: 24,
            pointerEvents: "none",
            ...s,
          }}
        />
      ))}

      <svg
        viewBox={`0 0 ${S} ${S}`}
        width="100%"
        height="100%"
        style={{ display: "block", overflow: "visible" }}
      >
        <defs>
          <radialGradient id="h_glass" cx="35%" cy="28%" r="78%">
            <stop offset="0%" stopColor="#131c2a" />
            <stop offset="30%" stopColor="#090f1c" />
            <stop offset="70%" stopColor="#050910" />
            <stop offset="100%" stopColor="#020408" />
          </radialGradient>
          <linearGradient id="h_gold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4e3010" />
            <stop offset="18%" stopColor="#A8825A" />
            <stop offset="42%" stopColor="#E8CBAA" />
            <stop offset="62%" stopColor="#C9A27E" />
            <stop offset="82%" stopColor="#9a7248" />
            <stop offset="100%" stopColor="#4e3010" />
          </linearGradient>
          <linearGradient id="h_barrel" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#282828" />
            <stop offset="45%" stopColor="#161616" />
            <stop offset="100%" stopColor="#0a0a0a" />
          </linearGradient>
          <linearGradient id="h_bezel" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e1e1e" />
            <stop offset="50%" stopColor="#121212" />
            <stop offset="100%" stopColor="#080808" />
          </linearGradient>
          <radialGradient id="h_sheen" cx="28%" cy="24%" r="62%">
            <stop offset="0%" stopColor="rgba(255,252,248,0.13)" />
            <stop offset="45%" stopColor="rgba(255,252,248,0.04)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          <radialGradient id="h_pmask" cx="50%" cy="50%" r="50%">
            <stop offset="76%" stopColor="white" stopOpacity="1" />
            <stop offset="97%" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <mask id="h_photomask">
            <circle cx={cx} cy={cy} r={glassR} fill="url(#h_pmask)" />
          </mask>
          <clipPath id="h_clip">
            <circle cx={cx} cy={cy} r={glassR} />
          </clipPath>
          <filter id="h_glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3.5" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="h_blur">
            <feGaussianBlur stdDeviation="3" />
          </filter>
        </defs>
        <circle
          cx={cx}
          cy={cy}
          r={outerR}
          fill="rgba(0,0,0,0.4)"
          filter="url(#h_blur)"
          transform="translate(0,8)"
        />
        <circle cx={cx} cy={cy} r={outerR} fill="url(#h_barrel)" />
        <circle
          cx={cx}
          cy={cy}
          r={outerR - 6}
          fill="none"
          stroke="#0e0e0e"
          strokeWidth={10}
          strokeDasharray="2.5 3.8"
        />
        <circle
          cx={cx}
          cy={cy}
          r={outerR - 6}
          fill="none"
          stroke="#252525"
          strokeWidth={10}
          strokeDasharray="1 6.3"
          strokeDashoffset="1.8"
        />
        <g
          style={{
            transformOrigin: `${cx}px ${cy}px`,
            transform: `rotate(${ringAngle}deg)`,
          }}
        >
          {Array.from({ length: 48 }, (_, i) => {
            const a = (i / 48) * Math.PI * 2,
              maj = i % 12 === 0,
              med = i % 4 === 0,
              r1 = outerR - 1,
              r2 = maj ? goldR + 7 : med ? goldR + 13 : goldR + 17;
            return (
              <line
                key={i}
                x1={Math.round(cx + Math.cos(a) * r1)}
                y1={Math.round(cy + Math.sin(a) * r1)}
                x2={Math.round(cx + Math.cos(a) * r2)}
                y2={Math.round(cy + Math.sin(a) * r2)}
                stroke={maj ? "#C9A27E" : med ? "#363636" : "#1e1e1e"}
                strokeWidth={maj ? 1.8 : 0.8}
              />
            );
          })}
        </g>
        <circle cx={cx} cy={cy} r={goldR} fill="url(#h_gold)" />
        <circle cx={cx} cy={cy} r={goldInR} fill="#101010" />
        <circle
          cx={cx}
          cy={cy}
          r={goldInR + 1}
          fill="none"
          stroke="#C9A27E"
          strokeWidth={0.5}
          opacity={0.3}
        />
        <circle cx={cx} cy={cy} r={bodyR} fill="url(#h_barrel)" />
        <circle cx={cx} cy={cy} r={bezelR} fill="url(#h_bezel)" />
        <circle
          cx={cx}
          cy={cy}
          r={bezelR}
          fill="none"
          stroke="#1a1a1a"
          strokeWidth={1}
        />
        <circle
          cx={cx}
          cy={cy}
          r={bezelR - 4}
          fill="none"
          stroke="#0e0e0e"
          strokeWidth={2}
        />
        <circle cx={cx} cy={cy} r={glassR} fill="url(#h_glass)" />

        {/* Video inside lens */}
        <foreignObject
          x={cx - glassR}
          y={cy - glassR}
          width={glassR * 2}
          height={glassR * 2}
          style={{ clipPath: "url(#h_clip)" }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              overflow: "hidden",
            }}
          >
            <video
              src={videoSrc}
              muted
              loop
              playsInline
              autoPlay
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                opacity: revealed ? 1 : 0.1,
                transition: "opacity 0.7s ease",
              }}
            />
          </div>
        </foreignObject>

        <circle
          cx={cx}
          cy={cy}
          r={glassR}
          fill="url(#h_sheen)"
          style={{
            opacity: revealed ? 0.3 : 1,
            transition: "opacity 0.75s ease",
          }}
        />
        {[
          [glassR * 0.76, "rgba(201,162,126,0.12)", "8 14", 0.45],
          [glassR * 0.52, "rgba(255,255,255,0.055)", "0", 0],
          [glassR * 0.3, "rgba(201,162,126,0.07)", "0", 0],
        ].map(([r, stroke, dash, rotM], i) => (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke={stroke}
            strokeWidth={0.8}
            strokeDasharray={dash !== "0" ? dash : undefined}
            style={{
              transformOrigin: `${cx}px ${cy}px`,
              transform: rotM ? `rotate(${ringAngle * rotM}deg)` : undefined,
              opacity: revealed ? 0.25 : 1,
              transition: "opacity 0.7s ease",
            }}
          />
        ))}
        <ellipse
          cx={cx - 32}
          cy={cy - 38}
          rx={14}
          ry={8}
          fill="rgba(255,250,240,0.07)"
          transform={`rotate(-25,${cx - 32},${cy - 38})`}
          style={{
            opacity: revealed ? 0.15 : 1,
            transition: "opacity 0.75s ease",
          }}
        />
        <circle
          cx={cx}
          cy={cy}
          r={glassR + 14}
          fill="none"
          stroke="#C9A27E"
          strokeWidth={1}
          strokeDasharray="5 9"
          style={{
            transformOrigin: `${cx}px ${cy}px`,
            transform: `rotate(${-ringAngle * 1.8}deg)`,
            opacity: revealed ? 0.5 : 0,
            transition: "opacity 0.5s ease",
            filter: "url(#h_glow)",
          }}
        />
        <circle
          cx={cx}
          cy={cy}
          r={glassR + 20}
          fill="none"
          stroke="rgba(201,162,126,0.2)"
          strokeWidth={0.6}
          style={{
            opacity: revealed ? 1 : 0,
            transition: "opacity 0.5s ease 0.1s",
          }}
        />
        <circle
          cx={cx}
          cy={cy}
          r={4}
          fill="none"
          stroke="rgba(201,162,126,0.28)"
          strokeWidth={1}
          style={{ opacity: revealed ? 0 : 1, transition: "opacity 0.5s ease" }}
        />
        <circle
          cx={cx}
          cy={cy}
          r={1.6}
          fill="#C9A27E"
          style={{
            opacity: revealed ? 0 : 0.45,
            transition: "opacity 0.5s ease",
          }}
        />
      </svg>

      {/* Specs */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 28,
          pointerEvents: "none",
          opacity: revealed ? 0 : 1,
          transform: revealed ? "translateY(4px)" : "translateY(0)",
          transition: "opacity 0.45s ease,transform 0.45s ease",
        }}
      >
        {[
          { v: "f/1.4", l: "APERTURE" },
          { v: "35mm", l: "FOCAL" },
          { v: "4K", l: "FORMAT" },
        ].map((item) => (
          <div key={item.l} style={{ textAlign: "center" }}>
            <div
              style={{
                fontFamily: "monospace",
                fontSize: 10,
                color: "#C9A27E",
                fontWeight: 700,
              }}
            >
              {item.v}
            </div>
            <div
              style={{
                fontFamily: "monospace",
                fontSize: 7,
                color: "#6B6B6B",
                letterSpacing: "0.2em",
              }}
            >
              {item.l}
            </div>
          </div>
        ))}
      </div>

      {/* Name on reveal */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 3,
          pointerEvents: "none",
          opacity: revealed ? 1 : 0,
          transform: revealed ? "translateY(0)" : "translateY(6px)",
          transition: "opacity 0.55s ease 0.25s,transform 0.55s ease 0.25s",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-cormorant,serif)",
            fontSize: "clamp(14px,2vw,16px)",
            fontWeight: 500,
            color: "#2E2E2E",
            letterSpacing: "0.1em",
            margin: 0,
          }}
        >
          Devarsh Jain
        </p>
        <p
          style={{
            fontFamily: "monospace",
            fontSize: 8,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "#C9A27E",
            margin: 0,
          }}
        >
          Cinematic Wedding Filmmaker
        </p>
      </div>

      {isMobile && !revealed && (
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 7,
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              width: 5,
              height: 5,
              borderRadius: "50%",
              background: "#C9A27E",
              animation: "blink 1.4s ease-in-out infinite",
            }}
          />
          <span
            style={{
              fontFamily: "monospace",
              fontSize: 8,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#6B6B6B",
            }}
          >
            Tap to Reveal
          </span>
        </div>
      )}
    </div>
  );
}

function MagneticButton({ children, onClick, variant = "primary" }) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [bg, setBg] = useState(
    variant === "primary" ? "#2E2E2E" : "transparent",
  );
  const [color, setColor] = useState(
    variant === "primary" ? "#F8F5F2" : "#2E2E2E",
  );
  const [borderColor, setBorderColor] = useState(
    variant === "primary" ? "none" : "rgba(46,46,46,0.3)",
  );

  const handleMouseMove = useCallback((e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    setPosition({ x: x * 0.2, y: y * 0.2 });
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    setBg("#C9A27E");
    setColor("#F8F5F2");
    setBorderColor("#C9A27E");
  }, []);

  const handleMouseLeave = useCallback(() => {
    setPosition({ x: 0, y: 0 });
    setIsHovered(false);
    const isPrimary = variant === "primary";
    setBg(isPrimary ? "#2E2E2E" : "transparent");
    setColor(isPrimary ? "#F8F5F2" : "#2E2E2E");
    setBorderColor(isPrimary ? "none" : "rgba(46,46,46,0.3)");
  }, [variant]);

  return (
    <button
      ref={ref}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="focus-sq"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        padding: "14px 28px",
        fontFamily: "monospace",
        fontSize: "10px",
        letterSpacing: "0.2em",
        textTransform: "uppercase",
        cursor: "none",
        border: variant === "primary" ? "none" : "1px solid " + borderColor,
        background: bg,
        color: color,
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition:
          "all 0.15s ease-out, background 0.3s ease, color 0.3s ease, border-color 0.3s ease",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {isHovered && (
        <span
          className="rec-dot"
          style={{
            width: 4,
            height: 4,
            borderRadius: "50%",
            background: variant === "primary" ? "#F8F5F2" : "#C9A27E",
            display: "inline-block",
          }}
        />
      )}
      {children}
      {isHovered && (
        <svg
          width="14"
          height="14"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
          />
        </svg>
      )}
    </button>
  );
}

function FilmStripScrollIndicator() {
  return (
    <div
      style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 8 }}
    >
      <div
        style={{
          width: 80,
          height: 24,
          border: "1px solid rgba(46,46,46,0.2)",
          background: "#F8F5F2",
          display: "flex",
          justifyContent: "space-between",
          padding: "0 6px",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            style={{
              width: 8,
              height: "100%",
              background: "#2E2E2E",
              opacity: 0.1,
              animation: `pulse 1.5s ease-in-out infinite`,
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
      </div>
      <div
        style={{
          width: 8,
          height: 8,
          border: "1px solid #C9A27E",
          borderRadius: 1,
          opacity: 0.6,
        }}
      />
      <div
        style={{
          width: 8,
          height: 8,
          border: "1px solid #C9A27E",
          borderRadius: 1,
          opacity: 0.4,
        }}
      />
    </div>
  );
}

function DustParticles() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5,
  }));

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 1,
      }}
    >
      {particles.map((p) => (
        <div
          key={p.id}
          style={{
            position: "absolute",
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: "rgba(201,162,126,0.3)",
            borderRadius: "50%",
            animation: `float ${p.duration}s ease-in-out ${p.delay}s infinite`,
            filter: "blur(1px)",
          }}
        />
      ))}
    </div>
  );
}
