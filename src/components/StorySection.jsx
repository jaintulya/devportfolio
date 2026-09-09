"use client";
import { useRef, useEffect, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MobileMemoryStack from "./MobileMemoryStack";

gsap.registerPlugin(ScrollTrigger);

/* ─── Timeline data ─── */
const timelineStops = [
  { title: "College",      body: "A reel unexpectedly went viral." },
  { title: "Confidence",   body: "People connecting with the work changed the pace." },
  { title: "Food Creators",body: "Real projects brought real learning." },
  { title: "Struggle",     body: "Uncertainty, experiments and figuring it out." },
  { title: "Storytelling", body: "Learning how to make people feel something." },
];

/* ─── Moments data ─── */
const moments = [
  { key: "chaos",   label: "The chaos",       detail: "The behind-the-scenes rush and imperfect little moments nobody planned." },
  { key: "laugh",   label: "The laughter",    detail: "Friends laughing between shots — the real moments behind the posed ones." },
  { key: "nerves",  label: "The nervousness", detail: "That quiet nervousness before an entry, a ritual, or a life-changing moment." },
  { key: "parents", label: "The parents",     detail: "Parents getting emotional, proud and overwhelmed outside the perfect frame." },
  { key: "cousins", label: "The cousins",     detail: "Cousins dancing when nobody is watching and making memories of their own." },
  { key: "talks",   label: "The conversations", detail: "Tiny conversations that feel ordinary then, but become priceless later." },
  { key: "madness", label: "The madness",     detail: "The beautiful madness that makes a wedding feel alive." },
  { key: "happy",   label: "The happiness",   detail: "All the little pieces together — the feeling that makes a wedding a wedding." },
];

/* ─── Orbit removed — Shaadi Pitara logo centered in story hero ─── */

/* ─── SVG path: clearly curved ("tdha") line passing through all 5 dot centers ─── */
// viewBox 0 0 1000 62, Y center = 31
// Dots: x=80, 285, 490, 695, 900  (all Y=31)
// Path goes through each dot center with a visible S-curve
const pathD =
  "M 8 31 " +
  "C 44 31, 68 22, 80 31 " +   // gentle dip to dot 1
  "C 130 38, 240 44, 285 31 " + // rise back up to dot 2
  "C 335 20, 440 18, 490 31 " + // down again to dot 3
  "C 540 44, 640 46, 695 31 " + // up to dot 4
  "C 745 18, 860 20, 900 31 " + // down to dot 5
  "C 946 40, 974 42, 992 31";

/* ═══════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════ */
export default function StorySection() {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [activeMoment, setActiveMoment] = useState("chaos");
  const [isTransitioning, setIsTransitioning] = useState(false);

  /* Story hero refs */
  const rootRef           = useRef(null);
  const storyHeroRef      = useRef(null);
  const orbitRef          = useRef(null);

  /* Pinned scene refs */
  const headRef           = useRef(null);
  const sceneRef          = useRef(null);
  const note1Ref          = useRef(null);
  const note2Ref          = useRef(null);

  /* Journey / timeline refs */
  const journeyHeadRef    = useRef(null);
  const routeRef          = useRef(null);
  const detailTextRef     = useRef(null);  // ref for the detail text paragraph only

  /* ─── Reduced motion ─── */
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e) => setReducedMotion(e.matches);
    mq.addEventListener?.("change", handler);
    return () => mq.removeEventListener?.("change", handler);
  }, []);

  /* ══════════════════════════════════════════
     GSAP — SCROLL-DRIVEN ANIMATIONS
     ══════════════════════════════════════════ */
  useEffect(() => {
    const ctx = gsap.context(() => {
      /* ── Story hero heading reveal ── */
      if (storyHeroRef.current) {
        gsap.from(storyHeroRef.current.children, {
          y: 28, opacity: 0, duration: 0.9, ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: { trigger: storyHeroRef.current, start: "top 85%" },
        });
      }

      /* ── The Beginning reveal ── */
      if (headRef.current) {
        gsap.from(headRef.current.children, {
          y: 20, opacity: 0, duration: 0.7, ease: "power2.out",
          stagger: 0.1,
          scrollTrigger: { trigger: sceneRef.current, start: "top 80%" },
        });
      }

      /* ── Journey heading reveal ── */
      if (journeyHeadRef.current) {
        gsap.from(journeyHeadRef.current, {
          y: 28, opacity: 0, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: journeyHeadRef.current, start: "top 85%" },
        });
      }

      /* ── Timeline stop staggered reveal ── */
      if (routeRef.current) {
        const stops = routeRef.current.querySelectorAll(".js-tstop");
        if (stops.length) {
          gsap.from(stops, {
            y: 20, opacity: 0, duration: 0.7,
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: { trigger: routeRef.current, start: "top 85%" },
          });
        }
      }
    }, rootRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  /* ─── Moment pill interaction ─── */
  const selectMoment = useCallback((key) => {
    if (key === activeMoment || isTransitioning) return;
    setIsTransitioning(true);

    if (!detailTextRef.current) {
      setActiveMoment(key);
      setIsTransitioning(false);
      return;
    }

    /* Step 1 — fade OUT old text (GSAP drives it) */
    gsap.to(detailTextRef.current, {
      opacity: 0, y: -10, filter: "blur(3px)",
      duration: 0.28, ease: "power2.in",
      onComplete: () => {
        /* Step 2 — swap text content, update React state */
        setActiveMoment(key);
        const m = moments.find((x) => x.key === key);
        if (m && detailTextRef.current) {
          detailTextRef.current.textContent = m.detail;
        }

        /* Step 3 — fade IN new text */
        gsap.fromTo(detailTextRef.current,
          { opacity: 0, y: 8, filter: "blur(3px)" },
          {
            opacity: 1, y: 0, filter: "blur(0px)",
            duration: 0.45, ease: "power2.out",
            onComplete: () => setIsTransitioning(false),
          }
        );
      },
    });
  }, [activeMoment, isTransitioning]);

  /* ══════════════════════════════════════════
     RENDER
     ══════════════════════════════════════════ */
  return (
    <>
    <style>{`
      @media (max-width: 768px) { .desktop-story-section { display: none; } }
      @media (min-width: 769px) { .mobile-memory-stack { display: none; } }
      .jreveal {
        opacity: 1;
        transform: none;
      }
    `}</style>
    <div id="story">
    <div className="desktop-story-section">
    <section
      ref={rootRef}
      className="journey-section"
      style={{ position: "relative", color: "var(--brand-maroon-dark)", overflow: "hidden" }}
    >

      {/* ═══════════════════════════════════
          PART 1 — STORY HERO  (How Shadi Pitara started. + Orbit)
         ═══════════════════════════════════ */}
      <div
        className="jreveal"
        style={{
          position: "relative",
          background: "#3A0B0E",
          padding: "clamp(60px, 7vw, 100px) clamp(16px, 4vw, 48px) clamp(40px, 5.5vw, 75px)",
          overflow: "hidden",
          color: "var(--brand-cream)",
        }}
      >
        {/* Texture overlay matching Contact, Review & Footer */}
        <div aria-hidden="true" style={{
          position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1, opacity: 0.04,
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 160 160' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }} />

        <div
          ref={storyHeroRef}
          style={{
            maxWidth: 1180,
            margin: "0 auto",
            width: "100%",
            display: "grid",
            gridTemplateColumns: "1.15fr 0.85fr",
            gap: "clamp(24px, 5vw, 64px)",
            alignItems: "center",
            position: "relative",
            zIndex: 3,
          }}
        >
          {/* Left — copy */}
          <div style={{ position: "relative", zIndex: 3 }}>
            <div className="jreveal" style={{
              fontFamily: "var(--font-mono)", fontSize: 10,
              letterSpacing: "0.18em", textTransform: "uppercase",
              color: "var(--brand-gold)", marginBottom: 22,
            }}>
              THE STORY BEHIND SHAADI PITARA
            </div>
            <h2 className="c-heading" style={{
              margin: "0 0 24px",
              lineHeight: 0.88,
            }}>
              How Shaadi<br /><i>Pitara started.</i>
            </h2>
            <p className="jreveal" style={{
              maxWidth: 440,
              color: "rgba(210,179,168,0.80)",
              fontSize: 15, lineHeight: 1.9, margin: "0 0 32px",
            }}>
              It started with a simple love for capturing everything around me. A
              phone, Snapchat, random moments, editing, sharing — and slowly, a
              feeling that this could become something more.
            </p>
            <button
              className="jreveal"
              onClick={() => document.getElementById("story-begin")?.scrollIntoView({ behavior: "smooth" })}
              style={{
                border: "1px solid rgba(247,230,204,0.30)",
                background: "transparent",
                color: "var(--brand-cream)",
                padding: "14px 28px",
                fontFamily: "var(--font-mono)", fontSize: 10,
                letterSpacing: "0.18em", textTransform: "uppercase",
                cursor: "pointer",
                display: "flex", alignItems: "center", gap: 12,
                transition: "all 0.4s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(247,230,204,0.10)";
                e.currentTarget.style.borderColor = "rgba(247,230,204,0.55)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.borderColor = "rgba(247,230,204,0.30)";
              }}
            >
              Enter the story <span style={{ fontSize: 14 }}>↓</span>
            </button>
          </div>

          {/* Right — beginning image */}
          <div
            ref={orbitRef}
            style={{
              position: "relative",
              width: "min(430px, 37vw)",
              height: "min(500px, 43vw)",
              margin: "0 auto",
            }}
          >
            <img
              src="/beginningright.png"
              alt="Wedding celebration moment on camera — Shaadi Pitara origin story"
              crossOrigin="anonymous"
              loading="lazy"
              decoding="async"
              style={{
                position:"relative",
                width:"100%",
                height:"100%",
                objectFit:"contain",
                display:"block",
              }}
            />
          </div>
        </div>
      </div>

      {/* ─── Separator Line between Part 1 & Part 2 ─── */}
      <div
        aria-hidden="true"
        style={{
          maxWidth: 1180,
          margin: "0 auto",
          padding: "0 clamp(16px, 4vw, 48px)",
          position: "relative",
          zIndex: 5,
        }}
      >
        <div
          style={{
            position: "relative",
            height: 1,
            background: "linear-gradient(90deg, transparent 0%, rgba(214,180,119,0.25) 15%, rgba(214,180,119,0.55) 50%, rgba(214,180,119,0.25) 85%, transparent 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              background: "var(--brand-gold, #c4965f)",
              transform: "rotate(45deg)",
              boxShadow: "0 0 12px rgba(196,150,95,0.7), 0 0 0 3px #3A0B0E",
            }}
          />
        </div>
      </div>

      {/* ═══════════════════════════════════
          PART 2 — THE BEGINNING
          Solid dark background — cream text always readable
         ═══════════════════════════════════ */}
      <div
        id="story-begin"
        ref={sceneRef}
        style={{
          position: "relative",
          background: "#3A0B0E",
          color: "var(--brand-cream)",
          padding: "clamp(45px, 6vw, 85px) clamp(16px, 4vw, 48px) clamp(60px, 8vw, 110px)",
          overflow: "hidden",
        }}
      >
        {/* Texture overlay matching Contact, Review & Footer */}
        <div aria-hidden="true" style={{
          position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1, opacity: 0.04,
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 160 160' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }} />

        <div style={{
          maxWidth: 1180,
          margin: "0 auto",
          width: "100%",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "clamp(32px, 6vw, 80px)",
          alignItems: "center",
          position: "relative",
          zIndex: 3,
        }}>
          {/* Left — narrative */}
          <div
            ref={headRef}
            style={{
              position: "relative",
              zIndex: 20,
            }}
          >
            <div style={{
              fontFamily: "var(--font-mono)", fontSize: 10,
              letterSpacing: "0.14em", textTransform: "uppercase",
              color: "#c9aa9e", display: "block", marginBottom: 16,
            }}>THE BEGINNING</div>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontWeight: 500,
              fontSize: "clamp(48px, 7vw, 105px)",
              lineHeight: 0.84,
              letterSpacing: "-0.04em",
              margin: "0 0 24px",
              color: "var(--brand-cream)",
            }}>
              Something done for fun became{" "}
              <span style={{ color: "#d4b3a8", fontStyle: "italic" }}>something more.</span>
            </h2>
            <p style={{ maxWidth: 480, color: "#d2b3a8", fontSize: 15, lineHeight: 1.9, margin: "0 0 14px" }}>
              I would shoot almost anything that caught my attention, put it together
              on Snapchat, edit it and share it. Soon my friends started noticing.
            </p>
            <p style={{
              maxWidth: 480, color: "#d2b3a8", fontSize: 18, lineHeight: 1.9,
              margin: 0,
            }}>
              Whenever something happened, I heard:{" "}
              <span style={{
                color: "#fff6e7", fontWeight: 500, fontStyle: "italic",
                fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 21,
              }}>
                "Tu hi story laga diya kar, tu achhe se edit karta hai."
              </span>
            </p>
          </div>

          {/* Right — wedding photos */}
          <div style={{
            position: "relative",
            width: "clamp(290px, 40vw, 520px)",
            height: "clamp(340px, 46vw, 590px)",
            marginLeft: "auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
            <img
              src="/storylastright.png"
              alt="Cinematic wedding storytelling frame — Shaadi Pitara"
              loading="lazy"
              decoding="async"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                display: "block",
                filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.5))",
              }}
            />
          </div>
        </div>
      </div>

        {/* ═══════════════════════════════════
            PART 3 — THE JOURNEY  (timeline with tdha curved line)
           ═══════════════════════════════════ */}
        <div style={{
          position:"relative",zIndex:5,
          padding:"clamp(60px,9vw,120px) clamp(16px,4vw,48px)",
          background:"var(--brand-ivory)",
          color:"var(--brand-maroon-dark)",
        }}>
          <div style={{ maxWidth:1100,margin:"0 auto" }}>
            {/* Journey header */}
            <div
              ref={journeyHeadRef}
              className="jreveal"
              style={{
                display:"grid",
                gridTemplateColumns:"1.2fr .8fr",
                gap:"clamp(20px,5vw,60px)",
                alignItems:"end",
                marginBottom:"clamp(48px,6vw,72px)",
              }}
            >
              <div>
                <div className="jreveal" style={{
                  fontFamily:"var(--font-mono)",fontSize:10,
                  letterSpacing:".14em",textTransform:"uppercase",
                  color:"#3A0B0E",display:"block",marginBottom:18,
                }}>THE JOURNEY</div>
                <h2 style={{
                  fontFamily:"'Cormorant Garamond',Georgia,serif",
                  fontWeight:500,
                  fontSize:"clamp(52px,7.5vw,105px)",
                  lineHeight:0.84,
                  letterSpacing:"-0.04em",
                  margin:0,
                  color:"#3A0B0E",
                }}>Learning by<br />making.</h2>
              </div>
              <p className="jreveal" style={{
                maxWidth:380,
                color:"#3A0B0E",fontSize:14,
                lineHeight:1.85,margin:0,
              }}>
                What began casually slowly became professional exploration. College,
                a viral reel, food creators, struggle, experimenting and learning —
                every phase added something.
              </p>
            </div>

            {/* Timeline route — clearly curved ("tdha") line */}
            <div
              ref={routeRef}
              style={{
                position:"relative",
                height:240,
                marginTop:"2vw",
              }}
            >
              {/* SVG curved line — passes through ALL 5 dot centers */}
              <svg
                aria-hidden="true"
                viewBox="0 0 1000 62"
                preserveAspectRatio="none"
                style={{
                  position:"absolute",left:0,top:28,
                  width:"100%",height:62,
                  overflow:"visible",pointerEvents:"none",zIndex:1,
                }}
              >
                {/* Visible curved stroke — clearly tdha (S-curve through dots) */}
                <path
                  d={pathD}
                  fill="none"
                  stroke="rgba(58,11,14,0.55)"
                  strokeWidth="3.2"
                  strokeLinecap="round"
                />
              </svg>

              {/* 5 timeline stops — ALL on same horizontal Y baseline */}
              {timelineStops.map((stop, i) => (
                <div
                  key={stop.title}
                  className="js-tstop"
                  style={{
                    position:"absolute",
                    top: 28,
                    width:"18%",
                    textAlign:"center",
                    zIndex:2,
                    left: [0, "20.5%", "41%", "61.5%", "82%"][i],
                  }}
                >
                  <span style={{
                    display:"block",
                    fontFamily:"var(--font-mono)",fontSize:10.5,
                    letterSpacing:".14em",
                    color:"#280508",
                    fontWeight: 700,
                    opacity:1,
                    marginBottom:14,textTransform:"uppercase",
                  }}>
                    {String(i+1).padStart(2,"0")}
                  </span>
                  <div style={{
                    width:16,height:16,borderRadius:"50%",
                    background:"#3A0B0E",
                    margin:"0 auto 22px",
                    boxShadow:"0 0 0 8px rgba(124,41,45,0.12),0 0 0 1px rgba(124,41,45,0.30)",
                    transition:"0.4s",
                    position:"relative",zIndex:3,
                    cursor:"default",
                  }} />
                  <h3 style={{
                    fontFamily:"'Cormorant Garamond',Georgia,serif",
                    fontWeight:700,fontSize:33,lineHeight:0.95,
                    margin:"0 0 8px",color:"#280508",
                  }}>{stop.title}</h3>
                  <p style={{
                    fontFamily:"var(--font-body)",fontSize:13,
                    fontWeight: 600,
                    lineHeight:1.6,color:"#1D0507",
                    margin:0,maxWidth:170,marginLeft:"auto",marginRight:"auto",
                  }}>{stop.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════
            PART 4 — THE MOMENTS BETWEEN  (8 interactive pills)
           ═══════════════════════════════════ */}
        <div
          id="moments"
          style={{
            background:"#FFF6E7",
            padding:"clamp(80px,12vw,160px) clamp(16px,4vw,48px)",
          }}
        >
          <div style={{
            maxWidth:1180,margin:"0 auto",
            display:"grid",
            gridTemplateColumns:"minmax(260px,.72fr) minmax(280px,1fr)",
            gap:"clamp(24px,7vw,80px)",
            alignItems:"start",
          }}>
            {/* Left — sticky editorial copy */}
            <div style={{ position:"sticky",top:"15vh" }}>
              <div style={{
                fontFamily:"var(--font-mono)",fontSize:10,
                letterSpacing:".14em",textTransform:"uppercase",
                color:"#3A0B0E",marginBottom:20,
              }}>THE MOMENTS BETWEEN</div>
              <h2 style={{
                fontFamily:"'Cormorant Garamond',Georgia,serif",
                fontWeight:500,
                fontSize:"clamp(48px,7vw,100px)",
                lineHeight:0.86,
                letterSpacing:"-0.04em",
                margin:"0 0 20px",
                color:"var(--brand-maroon-dark)",
              }}>
                What makes a wedding{" "}
                <span style={{color:"#3A0B0E",fontStyle:"italic"}}>feel like a wedding.</span>
              </h2>
              <p style={{
                color:"#3A0B0E",fontSize:14,lineHeight:1.9,
                maxWidth:360,margin:0,opacity:0.85,
              }}>
                The chaos behind the scenes. The laughter, nerves, parents, cousins,
                tiny conversations, madness and happiness — all the things that may
                never become the hero frame, but become the memory.
              </p>
            </div>

            {/* Right — 8 moment pills */}
            <div>
              <div style={{
                display:"grid",
                gridTemplateColumns:"1fr 1fr",
                gap:12,
              }}>
                {moments.map((m) => {
                  const isActive = m.key === activeMoment;
                  return (
                    <button
                      key={m.key}
                      onClick={() => selectMoment(m.key)}
                      style={{
                        position:"relative",
                        minHeight:120,
                        border:"1px solid rgba(91,23,27,0.18)",
                        background: isActive ? "#3A0B0E" : "#F4E2C5",
                        color: isActive ? "var(--brand-cream)" : "var(--brand-maroon-dark)",
                        padding:20,
                        display:"flex",alignItems:"flex-end",justifyContent:"space-between",
                        cursor:"pointer",overflow:"hidden",textAlign:"left",
                        transition:
                          "background 0.4s ease, color 0.4s ease," +
                          "transform 0.4s cubic-bezier(0.2,0.8,0.2,1), box-shadow 0.4s ease",
                        transform: isActive ? "translateY(-4px)" : "none",
                        boxShadow: isActive ? "0 16px 36px rgba(91,23,27,0.22)" : "none",
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.transform = "translateY(-6px)";
                          e.currentTarget.style.boxShadow = "0 20px 40px rgba(91,23,27,0.14)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.transform = "translateY(0)";
                          e.currentTarget.style.boxShadow = "none";
                        }
                      }}
                    >
                      <div style={{
                        position:"absolute",width:120,height:120,borderRadius:"50%",
                        right:-28,top:-28,
                        background:"#3A0B0E",
                        opacity: isActive ? 0.18 : 0.06,
                        transition:"opacity 0.4s ease, transform 0.5s ease",
                        transform: isActive ? "scale(2.8)" : "scale(1)",
                      }} />
                      <span style={{
                        fontFamily:"'Cormorant Garamond',Georgia,serif",
                        fontWeight:500,fontSize:32,lineHeight:0.92,
                        position:"relative",zIndex:2,
                        transition:"color 0.4s ease",
                      }}>{m.label}</span>
                      <span style={{
                        position:"absolute",right:18,top:18,fontSize:14,
                        color: isActive ? "rgba(255,246,231,0.80)" : "rgba(91,23,27,0.35)",
                        transition:"transform 0.4s ease, color 0.4s ease",
                        transform: isActive ? "translate(3px,-3px)" : "none",
                        zIndex:2,
                      }}>→</span>
                    </button>
                  );
                })}
              </div>

              {/* Animated detail text */}
              <div style={{
                marginTop:10,
                borderTop:"1px solid rgba(91,23,27,0.18)",
                paddingTop:22,minHeight:70,
              }}>
                <p
                  ref={detailTextRef}
                  style={{
                    color:"#3A0B0E",fontSize:15,lineHeight:1.8,margin:0,opacity:0.9,
                  }}
                >
                  {moments.find((m) => m.key === activeMoment)?.detail}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════
            PART 5 — THE IDEA  (philosophy)
           ═══════════════════════════════════ */}
        <div style={{
          minHeight:"90vh",
          background:"#F4E2C5",
          display:"grid",placeItems:"center",
          textAlign:"center",
          padding:"clamp(80px,11vw,160px) clamp(16px,4vw,48px)",
          overflow:"hidden",
        }}>
          <div style={{ maxWidth:1100,margin:"auto" }}>
            <div style={{
              fontFamily:"var(--font-mono)",fontSize:10,
              letterSpacing:".14em",textTransform:"uppercase",
              color:"#3A0B0E",marginBottom:28,
            }}>THE IDEA</div>

            <h2 style={{
              fontFamily:"'Cormorant Garamond',Georgia,serif",
              fontWeight:500,
              fontSize:"clamp(52px,8vw,116px)",
              lineHeight:0.86,
              letterSpacing:"-0.045em",
              margin:"0 0 36px",
              color:"var(--brand-maroon-dark)",
            }}>
              <span style={{display:"block",overflow:"hidden"}}>
                <span className="jreveal" style={{display:"block"}}>
                  We don&apos;t just capture the{" "}
                  <span style={{fontStyle:"italic",color:"#3A0B0E"}}>moment.</span>
                </span>
              </span>
              <span style={{display:"block",overflow:"hidden"}}>
                <span className="jreveal" style={{display:"block"}}>
                  We capture the
                </span>
              </span>
              <span style={{display:"block",overflow:"hidden"}}>
                <span className="jreveal" style={{display:"block"}}>
                  <span style={{fontStyle:"italic",color:"#3A0B0E"}}>story behind</span> it.
                </span>
              </span>
            </h2>

            <p className="jreveal" style={{
              maxWidth:680,color:"#3A0B0E",
              fontSize:15,lineHeight:1.9,margin:"0 auto",opacity:0.85,
            }}>
              Our content is raw, real, spontaneous and alive — the emotional, fun and
              candid side that might never make the final wedding album, but is often
              what people remember most.
            </p>
          </div>
        </div>

        {/* ═══════════════════════════════════
            PART 6 — WHY IT MATTERS  (split editorial layout)
           ═══════════════════════════════════ */}
        <div style={{
          background:"var(--brand-ivory)",
          padding:"clamp(80px,11vw,160px) clamp(16px,4vw,48px)",
        }}>
          <div style={{
            maxWidth:1180,margin:"0 auto",
            display:"grid",
            gridTemplateColumns:"minmax(140px,.32fr) minmax(280px,1fr)",
            gap:"clamp(24px,7vw,80px)",
            alignItems:"start",
          }}>
            <div style={{
              fontFamily:"var(--font-mono)",fontSize:10,
              letterSpacing:".14em",textTransform:"uppercase",
              color:"#3A0B0E",paddingTop:6,
            }}>WHY IT MATTERS</div>
            <div>
              <h2 style={{
                fontFamily:"'Cormorant Garamond',Georgia,serif",
                fontWeight:500,
                fontSize:"clamp(48px,7vw,100px)",
                lineHeight:0.86,
                letterSpacing:"-0.04em",
                margin:"0 0 28px",
                color:"var(--brand-maroon-dark)",
              }}>
                <span style={{display:"block",overflow:"hidden"}}>
                  <span className="jreveal" style={{display:"block"}}>
                    Not just how it <span style={{color:"#3A0B0E",fontStyle:"italic"}}>looked.</span>
                  </span>
                </span>
                <span style={{display:"block",overflow:"hidden"}}>
                  <span className="jreveal" style={{display:"block"}}>
                    How it <em style={{color:"#3A0B0E"}}>felt.</em>
                  </span>
                </span>
              </h2>
              <p className="jreveal" style={{
                maxWidth:700,color:"#3A0B0E",
                fontSize:15,lineHeight:1.9,margin:0,opacity:0.85,
              }}>
                Months or even years later, you can go back to those stories and relive
                the wedding exactly as it felt — not just how it looked. That thought
                became the foundation of Shaadi Pitara.
              </p>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════
            PART 7 — ENDING  (emotional payoff)
           ═══════════════════════════════════ */}
        <div style={{
          background:"#3A0B0E",
          color:"var(--brand-cream)",
          padding:"clamp(80px,12vw,180px) clamp(16px,4vw,48px)",
          position:"relative",overflow:"hidden",
        }}>
          {/* Texture overlay matching Contact, Review & Footer */}
          <div aria-hidden="true" style={{
            position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1, opacity: 0.04,
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 160 160' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }} />

          {/* Radial glow */}
          <div aria-hidden="true" style={{
            position:"absolute",left:"50%",top:"50%",
            transform:"translate(-50%,-50%)",
            width:600,height:600,borderRadius:"50%",
            background:"radial-gradient(circle,rgba(124,41,45,0.14) 0%,transparent 70%)",
            pointerEvents:"none",
            zIndex: 1,
          }} />

          <div style={{
            maxWidth: 1180, margin: "0 auto", width: "100%",
            display: "grid",
            gridTemplateColumns: "minmax(320px, 1.35fr) minmax(250px, 1fr)",
            gap: "clamp(32px, 6vw, 80px)",
            alignItems: "center",
            position: "relative", zIndex: 2,
          }}>
            {/* Left headline */}
            <h2 style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontWeight: 500,
              fontSize: "clamp(46px, 7vw, 105px)",
              lineHeight: 0.88,
              letterSpacing: "-0.045em",
              margin: 0,
              color: "var(--brand-cream)",
            }}>
              <span style={{ display: "block", overflow: "hidden" }}>
                <span className="jreveal" style={{ display: "block" }}>
                  A love for capturing moments
                </span>
              </span>
              <span style={{ display: "block", overflow: "hidden" }}>
                <span className="jreveal" style={{ display: "block" }}>
                  became{" "}
                  <span style={{ color: "var(--brand-gold)", fontStyle: "italic" }}>Shaadi Pitara.</span>
                </span>
              </span>
            </h2>

            {/* Right — image and signature underneath it */}
            <div style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 16,
            }}>
              <div
                style={{
                  position: "relative",
                  width: "clamp(200px, 20vw, 270px)",
                  height: "clamp(260px, 26vw, 350px)",
                  flexShrink: 0,
                }}
              >
                <img
                  src="/devimg.jpeg"
                  alt="Devarsh Jain — Founder and Wedding Content Creator at Shaadi Pitara Ahmedabad"
                  loading="lazy"
                  decoding="async"
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                    borderRadius: 12,
                    boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
                  }}
                />
                {/* Floating note 1 */}
                <div
                  ref={note1Ref}
                  className="floating-note-1"
                  style={{
                    position: "absolute",
                    right: "-18px",
                    top: "12px",
                    padding: "10px 14px",
                    background: "var(--brand-cream)",
                    color: "var(--brand-maroon-dark)",
                    boxShadow: "0 14px 35px rgba(0,0,0,0.3)",
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: 17,
                    lineHeight: 1.2,
                    fontWeight: 500,
                    whiteSpace: "nowrap",
                    zIndex: 10,
                    borderRadius: 4,
                  }}
                >
                  "I loved doing it."
                </div>
                {/* Floating note 2 */}
                <div
                  ref={note2Ref}
                  className="floating-note-2"
                  style={{
                    position: "absolute",
                    left: "-16px",
                    bottom: "12px",
                    padding: "8px 14px",
                    background: "var(--brand-cream)",
                    color: "var(--brand-maroon-dark)",
                    boxShadow: "0 14px 35px rgba(0,0,0,0.3)",
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: 15,
                    fontWeight: 500,
                    whiteSpace: "nowrap",
                    zIndex: 10,
                    borderRadius: 4,
                  }}
                >
                  fun → passion
                </div>
              </div>

              {/* Text underneath image */}
              <div style={{ width: "clamp(200px, 20vw, 270px)", textAlign: "left" }}>
                <p className="jreveal" style={{
                  color: "#d1afa4",
                  fontSize: 14.5,
                  lineHeight: 1.75,
                  margin: "0 0 12px",
                }}>
                  A space where every wedding gets to tell its own story, in its own way.
                </p>
                <div className="jreveal" style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: "clamp(28px, 3.2vw, 38px)",
                  fontWeight: 500,
                  color: "var(--brand-cream)",
                  lineHeight: 1.15,
                }}>I&apos;m Devarsh Jain.</div>
              </div>
            </div>
          </div>

          {/* Footer line */}
          <div style={{
            position:"relative",zIndex:2,
            marginTop:"clamp(60px,9vw,120px)",
            paddingTop:22,
            borderTop:"1px solid rgba(255,246,231,0.12)",
            display:"flex",justifyContent:"space-between",
            fontFamily:"var(--font-mono)",fontSize:10,
            letterSpacing:".18em",textTransform:"uppercase",
            color:"#b99186",
          }}>
            <span>EVERY WEDDING HAS A STORY.</span>
            <span>SHAADI PITARA · WEDDING SOCIAL MEDIA</span>
          </div>
        </div>

        {/* ─── Styles ─── */}
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes floatNote1 {
            0%, 100% { transform: translateY(0px) rotate(3deg); }
            50%      { transform: translateY(-7px) rotate(6deg); }
          }
          @keyframes floatNote2 {
            0%, 100% { transform: translateY(0px) rotate(-3deg); }
            50%      { transform: translateY(7px) rotate(-6deg); }
          }
          .floating-note-1 {
            animation: floatNote1 4.2s ease-in-out infinite;
            will-change: transform;
          }
          .floating-note-2 {
            animation: floatNote2 4.8s ease-in-out infinite;
            will-change: transform;
          }
          @keyframes scrollPulse {
            0%,100% { transform:scaleY(1); transform-origin:top; opacity:0.4; }
            50%     { transform:scaleY(1.5); opacity:1; }
          }
          /* Story hero responsive */
          @media (max-width: 768px) {
            section.journey-section > div:first-child {
              grid-template-columns: 1fr !important;
              min-height: auto !important;
              padding-bottom: 0 !important;
            }
            section.journey-section > div:first-child > div:last-child {
              display: none !important;
            }
          }
          /* Journey head responsive */
          @media (max-width: 768px) {
            section.journey-section > div:nth-child(2) > div:first-child {
              display: block !important;
            }
            section.journey-section > div:nth-child(2) > div:first-child p {
              margin-top: 24px;
            }
          }
          /* Moments responsive */
          @media (max-width: 768px) {
            section#moments > div,
            section.journey-section > div:nth-child(3) > div {
              display: block !important;
            }
            section#moments > div > div:first-child,
            section.journey-section > div:nth-child(3) > div > div:first-child {
              position: static !important;
              margin-bottom: 40px;
            }
            section#moments > div > div:last-child > div:first-child,
            section.journey-section > div:nth-child(3) > div > div:last-child > div:first-child {
              grid-template-columns: 1fr !important;
            }
          }
          @keyframes orbitSpinOuter {
            from { transform: translate(-50%,-50%) rotateX(70deg) rotateZ(0deg); }
            to   { transform: translate(-50%,-50%) rotateX(70deg) rotateZ(360deg); }
          }
          @keyframes orbitSpinInner {
            from { transform: translate(-50%,-50%) rotateX(68deg) rotateZ(20deg); }
            to   { transform: translate(-50%,-50%) rotateX(68deg) rotateZ(380deg); }
          }
          @media (max-width: 768px) {
            .desktop-story-section { display: none !important; }
          }
          @media (min-width: 769px) {
            .mobile-story-section { display: none !important; }
          }
        ` }} />
    </section>
    </div>

    <div className="mobile-story-section">
      <MobileMemoryStack />
    </div>
    </div>
    </>
  );
}
