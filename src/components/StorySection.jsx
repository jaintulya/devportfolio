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

/* ─── Orbit removed — Shadi Pitara logo centered in story hero ─── */

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
  const storyHeroRef      = useRef(null);
  const orbitRef          = useRef(null);
  const orbitRaf          = useRef(null);

  /* Pinned scene refs */
  const headRef           = useRef(null);
  const sceneRef          = useRef(null);
  const filmRef           = useRef(null);
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

  /* ─── IntersectionObserver for .jreveal ─── */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll(".jreveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  /* ─── Mouse parallax tilt on orbit container ─── */
  useEffect(() => {
    if (reducedMotion || !orbitRef.current) return;
    let tx = 0, ty = 0, cx = 0, cy = 0;

    const onMove = (e) => {
      tx = (e.clientX / window.innerWidth  - 0.5) * 2;
      ty = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    function tick() {
      cx += (tx - cx) * 0.05;
      cy += (ty - cy) * 0.05;
      if (orbitRef.current) {
        orbitRef.current.style.transform =
          `rotateY(${cx * 5}deg) rotateX(${cy * -3}deg)`;
      }
      orbitRaf.current = requestAnimationFrame(tick);
    }
    orbitRaf.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(orbitRaf.current);
    };
  }, [reducedMotion]);

  /* ══════════════════════════════════════════
     GSAP — SCROLL-DRIVEN ANIMATIONS
     ══════════════════════════════════════════ */
  useEffect(() => {
    const ctx = gsap.context(() => {
      /* ── Story hero heading reveal ── */
      if (storyHeroRef.current) {
        gsap.from(storyHeroRef.current, {
          y: 44, opacity: 0, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: storyHeroRef.current, start: "top 80%" },
        });
      }

      /* ── Film 3D travel on scroll ── */
      if (filmRef.current && !reducedMotion) {
        gsap.fromTo(filmRef.current,
          { rotateY: -13, rotateX: 4, y: 0 },
          {
            rotateY: 8, rotateX: -8, y: -80,
            ease: "none",
            scrollTrigger: {
              trigger: sceneRef.current,
              start: "top top",
              end: "bottom top",
              scrub: 1.5,
            },
          }
        );
      }

      /* ── Floating notes — independent depth parallax ── */
      [note1Ref, note2Ref].forEach((ref, i) => {
        if (!ref.current || reducedMotion) return;
        const dir = i === 0 ? 1 : -1;
        gsap.fromTo(ref.current,
          { y: 0, x: 0, rotate: i === 0 ? 5 : -4 },
          {
            y: dir * -70, x: dir * 50,
            rotate: i === 0 ? 14 : -12,
            ease: "none",
            scrollTrigger: {
              trigger: sceneRef.current,
              start: "top top",
              end: "bottom top",
              scrub: 1.2,
            },
          }
        );
      });

      /* ── Journey heading reveal ── */
      if (journeyHeadRef.current) {
        gsap.from(journeyHeadRef.current, {
          y: 44, opacity: 0, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: journeyHeadRef.current, start: "top 82%" },
        });
      }

      /* ── Timeline stop staggered reveal ── */
      document.querySelectorAll(".js-tstop").forEach((stop, i) => {
        gsap.from(stop, {
          y: 22, opacity: 0, duration: 0.7,
          delay: i * 0.08,
          ease: "power2.out",
          scrollTrigger: { trigger: routeRef.current, start: "top 82%" },
        });
      });
    }, headRef);

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
    `}</style>
    <div className="desktop-story-section">
    <section
      id="story"
      className="journey-section"
      style={{ position: "relative", color: "var(--brand-maroon-dark)", overflow: "hidden" }}
    >

      {/* ═══════════════════════════════════
          PART 1 — STORY HERO  (How Shadi Pitara started. + Orbit)
         ═══════════════════════════════════ */}
      <div
        ref={storyHeroRef}
        className="jreveal"
        style={{
          position: "relative",
          minHeight: "100vh",
          background: "#3A0B0E",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "clamp(24px, 6vw, 80px)",
          alignItems: "center",
          overflow: "hidden",
          color: "var(--brand-cream)",
        }}
      >
        {/* Left — copy */}
        <div style={{
          padding: "clamp(80px, 10vw, 140px) clamp(16px, 6vw, 80px)",
          position: "relative", zIndex: 3,
        }}>
          <div className="jreveal" style={{
            fontFamily: "var(--font-mono)", fontSize: 10,
            letterSpacing: "0.18em", textTransform: "uppercase",
            color: "#c9aa9e", marginBottom: 22,
          }}>
            THE STORY BEHIND SHADI PITARA
          </div>
          <h1 style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontWeight: 500,
            fontSize: "clamp(52px, 7.5vw, 130px)",
            lineHeight: 0.82,
            letterSpacing: "-0.045em",
            margin: "0 0 24px",
            color: "var(--brand-cream)",
          }}>
            How Shadi<br />Pitara started.
          </h1>
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
            width: "min(560px, 48vw)",
            height: "min(640px, 50vw)",
            margin: "0 auto",
            transformStyle: "preserve-3d",
            perspective: "1200px",
            willChange: "transform",
          }}
        >
          <img
            src="/beginningright.png"
            alt="The Beginning"
            crossOrigin="anonymous"
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

      {/* ═══════════════════════════════════
          PART 2 — THE BEGINNING  (pinned 3D scene)
          Solid dark background — cream text always readable
         ═══════════════════════════════════ */}
      <div
        id="story-begin"
        ref={sceneRef}
        style={{
          position: "relative",
          minHeight: "260vh",
          background: "#3A0B0E",
          color: "var(--brand-cream)",
          overflow: "visible",   /* allow floating notes + Hindi text to breathe */
        }}
      >
        {/* Sticky viewport */}
        <div style={{
          position: "sticky", top: 0, height: "100vh",
          display: "grid", placeItems: "center",
          overflow: "visible",
          padding: "clamp(24px, 5vh, 60px) 0",
        }}>
          <div style={{
            width: "min(1180px, 88vw)",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "clamp(32px, 6vw, 80px)",
            alignItems: "start",
            perspective: "1600px",
            paddingBottom: "clamp(80px, 14vh, 180px)",  /* bottom gap — Hindi text + maroon space below */
          }}>
            {/* Left — narrative */}
            <div
              ref={headRef}
              className="jreveal"
              style={{
                transformStyle: "flat",
                position: "relative",
                zIndex: 20,
                paddingTop: "clamp(20px, 4vh, 40px)",
              }}
            >
              <div className="jreveal" style={{
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
                margin: "0 0 clamp(40px, 8vh, 100px)",
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

            {/* Right — devimg, smaller, right side */}
            <div style={{
              position: "relative",
              width: "clamp(200px, 28vw, 360px)",
              height: "clamp(300px, 50vh, 560px)",
              marginLeft: "auto",
              marginTop: 40,
              transformStyle: "preserve-3d",
              perspective: "1400px",
              overflow: "visible",
            }}>
              <img
                src="/devimg.jpeg"
                alt="The Beginning"
                crossOrigin="anonymous"
                style={{
                  position:"absolute",inset:0,width:"100%",height:"100%",
                  objectFit:"cover",display:"block",borderRadius:8,
                }}
              />
              {/* Floating note 1 */}
              <div
                ref={note1Ref}
                style={{
                  position:"absolute",right:"-35px",top:"10px",
                  padding:"13px 16px",
                  background:"var(--brand-cream)",color:"var(--brand-maroon-dark)",
                  boxShadow:"0 18px 45px rgba(0,0,0,0.25)",
                  fontFamily:"'Cormorant Garamond',Georgia,serif",
                  fontSize:20,lineHeight:1.2,fontWeight:500,
                  maxWidth:170,whiteSpace:"nowrap",
              }}>"I loved doing it."</div>
              {/* Floating note 2 */}
              <div
                ref={note2Ref}
                style={{
                  position:"absolute",left:"-25px",bottom:"10px",
                  padding:"13px 16px",
                  background:"var(--brand-cream)",color:"var(--brand-maroon-dark)",
                  boxShadow:"0 18px 45px rgba(0,0,0,0.25)",
                  fontFamily:"'Cormorant Garamond',Georgia,serif",
                  fontSize:20,lineHeight:1.2,fontWeight:500,
                  whiteSpace:"nowrap",
              }}>fun → passion</div>
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
                {/* Visible curved stroke ��� clearly tdha (S-curve through dots) */}
                <path
                  d={pathD}
                  fill="none"
                  stroke="rgba(58,11,14,0.22)"
                  strokeWidth="1.4"
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
                    fontFamily:"var(--font-mono)",fontSize:9,
                    letterSpacing:".14em",
                    color:"rgba(94,24,28,0.40)",
                    marginBottom:14,textTransform:"uppercase",
                  }}>
                    {String(i+1).padStart(2,"0")}
                  </span>
                  <div style={{
                    width:16,height:16,borderRadius:"50%",
                    background:"#3A0B0E",
                    margin:"0 auto 22px",
                    boxShadow:"0 0 0 8px rgba(124,41,45,0.08),0 0 0 1px rgba(124,41,45,0.20)",
                    transition:"0.4s",
                    position:"relative",zIndex:3,
                    cursor:"default",
                  }} />
                  <h3 style={{
                    fontFamily:"'Cormorant Garamond',Georgia,serif",
                    fontWeight:500,fontSize:30,lineHeight:0.9,
                    margin:"0 0 8px",color:"var(--brand-maroon-dark)",
                  }}>{stop.title}</h3>
                  <p style={{
                    fontFamily:"var(--font-body)",fontSize:11.5,
                     lineHeight:1.65,color:"#3A0B0E",
                    margin:0,maxWidth:160,marginLeft:"auto",marginRight:"auto",
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
                color:"#9E776A",marginBottom:20,
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
                color:"#9E776A",fontSize:14,lineHeight:1.9,
                maxWidth:360,margin:0,
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
                    color:"#9E776A",fontSize:15,lineHeight:1.8,margin:0,
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
              color:"#9E776A",marginBottom:28,
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
              maxWidth:680,color:"#9E776A",
              fontSize:15,lineHeight:1.9,margin:"0 auto",
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
              color:"#9E776A",paddingTop:6,
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
                maxWidth:700,color:"#9E776A",
                fontSize:15,lineHeight:1.9,margin:0,
              }}>
                Months or even years later, you can go back to those stories and relive
                the wedding exactly as it felt — not just how it looked. That thought
                became the foundation of Shadi Pitara.
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
          {/* Radial glow */}
          <div aria-hidden="true" style={{
            position:"absolute",left:"50%",top:"50%",
            transform:"translate(-50%,-50%)",
            width:600,height:600,borderRadius:"50%",
            background:"radial-gradient(circle,rgba(124,41,45,0.14) 0%,transparent 70%)",
            pointerEvents:"none",
          }} />

          <div style={{
            maxWidth:1180,margin:"0 auto",
            display:"grid",
            gridTemplateColumns:"minmax(280px,1.6fr) minmax(220px,1fr)",
            gap:"clamp(24px,8vw,80px)",
            alignItems:"end",
            position:"relative",zIndex:2,
          }}>
            {/* Left headline */}
            <h2 style={{
              fontFamily:"'Cormorant Garamond',Georgia,serif",
              fontWeight:500,
              fontSize:"clamp(48px,8vw,116px)",
              lineHeight:0.86,
              letterSpacing:"-0.045em",
              margin:0,
              color:"var(--brand-cream)",
            }}>
              <span style={{display:"block",overflow:"hidden"}}>
                <span className="jreveal" style={{display:"block"}}>
                  A love for capturing moments
                </span>
              </span>
              <span style={{display:"block",overflow:"hidden"}}>
                <span className="jreveal" style={{display:"block"}}>
                  became{" "}
                  <span style={{color:"#d5b3a8",fontStyle:"italic"}}>Shadi Pitara.</span>
                </span>
              </span>
            </h2>

            {/* Right — signature */}
            <div>
              <p className="jreveal" style={{
                color:"#d1afa4",fontSize:15,lineHeight:1.9,
                margin:"0 0 24px",
              }}>
                A space where every wedding gets to tell its own story, in its own way.
              </p>
              <div className="jreveal" style={{
                fontFamily:"'Cormorant Garamond',Georgia,serif",
                fontSize:"clamp(32px,4vw,42px)",
                fontWeight:500,
                color:"var(--brand-cream)",
                lineHeight:1.2,
              }}>I&apos;m Devarsh Jain.</div>
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
            <span>SHADI PITARA · WEDDING SOCIAL MEDIA</span>
          </div>
        </div>

        {/* ─── Styles ─── */}
        <style>{`
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
      `}</style>
      </div>
    </section>
    </div>

    <div className="mobile-story-section">
      <MobileMemoryStack />
    </div>
    </>
  );
}
