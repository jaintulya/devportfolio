"use client";
import { useRef, useEffect, useState, useCallback } from "react";
import Link from "next/link";

/**
 * FilmBendStrip
 *
 * Desktop: simple 2×4 grid of 8 reels (at least 1 per category), clickable → modal
 * Mobile: absolute-positioned curved film bend strip with swipe
 */
export default function FilmBendStrip({ reels, onOpen, isMobile, onSeeMore }) {
  // ── Desktop: simple grid ──
  if (!isMobile) {
    // Pick 8 reels: first from each category (up to 8)
    const onePerCat = [];
    const seen = new Set();
    for (const r of reels) {
      if (!seen.has(r.category)) {
        seen.add(r.category);
        onePerCat.push(r);
      }
      if (onePerCat.length === 8) break;
    }
    // Fill up to 8 if needed
    for (const r of reels) {
      if (onePerCat.length >= 8) break;
      if (!onePerCat.includes(r)) onePerCat.push(r);
    }

    return (
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "clamp(12px, 1.8vw, 20px)",
        maxWidth: 900,
        margin: "0 auto",
      }}>
        {onePerCat.map((reel) => (
          <div
            key={reel.id}
            onClick={() => onOpen?.(reel)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onOpen?.(reel); } }}
            style={{
              position: "relative",
              aspectRatio: "9/16",
              borderRadius: 10,
              overflow: "hidden",
              cursor: "pointer",
              background: "linear-gradient(180deg, #1A0507 0%, #140406 100%)",
              border: "1px solid rgba(212,184,150,0.08)",
              transition: "border-color 0.5s ease, box-shadow 0.5s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(212,184,150,0.28)";
              e.currentTarget.style.boxShadow = "0 16px 40px rgba(0,0,0,0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(212,184,150,0.08)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <img
              src={reel.poster}
              alt={reel.title}
              loading="lazy"
              decoding="async"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transition: "transform 0.7s cubic-bezier(.23,1,.32,1), filter 0.5s ease",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.06)"; e.currentTarget.style.filter = "brightness(1.08)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.filter = "brightness(1)"; }}
            />
            <div aria-hidden="true" style={{
              position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none",
              background: "linear-gradient(to top, rgba(20,4,6,0.88) 0%, rgba(20,4,6,0.35) 35%, transparent 65%)",
            }} />

            {/* Centered Play Button */}
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onOpen?.(reel); }}
              aria-label={`Play ${reel.title}`}
              style={{
                position: "absolute", top: "50%", left: "50%",
                transform: "translate(-50%,-50%)", zIndex: 6,
                width: 48, height: 48, borderRadius: "50%",
                background: "rgba(18, 3, 5, 0.72)",
                border: "1.5px solid rgba(212,184,150,0.7)",
                backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)",
                boxShadow: "0 6px 24px rgba(0,0,0,0.6)",
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer",
                transition: "transform 0.3s ease, border-color 0.3s ease",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translate(-50%,-50%) scale(1.1)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "translate(-50%,-50%) scale(1)"; }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="var(--brand-cream)" style={{ marginLeft: 2 }}>
                <polygon points="6 3 20 12 6 21 6 3" />
              </svg>
            </button>

            <div style={{
              position: "absolute", top: 8, right: 8, zIndex: 4, pointerEvents: "none",
              padding: "2px 7px", background: "rgba(10,2,3,0.7)", backdropFilter: "blur(6px)",
              fontFamily: "var(--font-body)", fontSize: 9, letterSpacing: "0.08em",
              color: "rgba(247,230,204,0.7)",
            }}>
              {reel.duration}
            </div>
          </div>
        ))}
      </div>
    );
  }

  // ── Mobile: Film bend strip ──
  const stageRef = useRef(null);
  const cardRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [dragState, setDragState] = useState({ dragging: false, startX: 0, delta: 0 });

  const getSlots = useCallback(() => {
    const mobile = true;
    const spread = 68;
    const far = 130;
    const sideFade = 0.18;
    return [
      { x: -far, y: 44, r: -12, s: 0.76, o: sideFade, z: 1 },
      { x: -spread, y: 22, r: -6, s: 0.88, o: sideFade + 0.20, z: 2 },
      { x: -28, y: 8, r: -3, s: 0.95, o: sideFade + 0.47, z: 3 },
      { x: 0, y: 0, r: 0, s: 1.0, o: 1.0, z: 10 },
      { x: 28, y: 8, r: 3, s: 0.95, o: sideFade + 0.47, z: 3 },
      { x: spread, y: 22, r: 6, s: 0.88, o: sideFade + 0.20, z: 2 },
      { x: far, y: 44, r: 12, s: 0.76, o: sideFade, z: 1 },
    ];
  }, []);

  const SWIPE_THRESHOLD = 45;

  const getRel = useCallback(
    (i) => {
      const len = reels.length;
      if (len === 0) return 0;
      let r = ((i - activeIndex) % len + len) % len;
      if (r > len / 2) r -= len;
      return r;
    },
    [activeIndex, reels.length]
  );

  const applySlots = useCallback(
    (instant = true) => {
      if (!stageRef.current) return;
      const slots = getSlots();
      const transition = instant
        ? "transform .5s cubic-bezier(.22,.8,.2,1), opacity .4s ease, filter .4s ease"
        : "none";

      reels.forEach((_, i) => {
        const card = cardRefs.current[i];
        if (!card) return;
        const rel = getRel(i);
        const slotIndex = rel + 3;
        const slot = (slotIndex >= 0 && slotIndex < slots.length) ? slots[slotIndex] : null;
        if (!slot) {
          card.style.opacity = "0";
          card.style.pointerEvents = "none";
          card.style.transform = "translate(-50%,-50%) scale(0.4)";
          return;
        }

        card.style.transition = transition;
        card.style.transform =
          `translate(-50%,-50%) translate3d(${slot.x}px,${slot.y}px,0) rotate(${slot.r}deg) scale(${slot.s})`;
        card.style.opacity = slot.o;
        card.style.filter = rel === 0 ? "none" : "saturate(.65) brightness(.8)";
        card.style.zIndex = slot.z;
        card.style.pointerEvents = rel === 0 ? "auto" : "none";
      });
    },
    [getSlots, getRel, reels.length]
  );

  const applyDragPreview = useCallback(
    (dx) => {
      const slots = getSlots();
      reels.forEach((_, i) => {
        const card = cardRefs.current[i];
        if (!card) return;
        const rel = getRel(i);
        const slotIndex = rel + 3;
        const slot = (slotIndex >= 0 && slotIndex < slots.length) ? slots[slotIndex] : null;
        if (!slot) {
          card.style.opacity = "0";
          card.style.pointerEvents = "none";
          return;
        }

        const factor = Math.max(0.08, 1 - Math.abs(rel) * 0.12);
        const x = slot.x + dx * factor;
        const y = slot.y + Math.abs(dx) * 0.015 * Math.abs(rel);
        const r = slot.r + dx * 0.02 * (rel === 0 ? 0.3 : 0.12);

        card.style.transition = "none";
        card.style.transform =
          `translate(-50%,-50%) translate3d(${x}px,${y}px,0) rotate(${r}deg) scale(${slot.s})`;
      });
    },
    [getSlots, getRel, reels.length]
  );

  const playTransition = useCallback(
    (direction) => {
      const prevIndex = activeIndex;
      const slots = getSlots();

      reels.forEach((_, i) => {
        const card = cardRefs.current[i];
        if (!card) return;
        const rel = getRel(i);
        const slotIndex = rel + 3;
        const slot = (slotIndex >= 0 && slotIndex < slots.length) ? slots[slotIndex] : null;
        if (!slot) return;

        const shove = direction * 20 * (rel === 0 ? -1 : 0.15);
        card.style.transition = "transform .15s ease-out, opacity .14s ease";
        card.style.transform =
          `translate(-50%,-50%) translate3d(${slot.x + shove}px,${slot.y}px,0) rotate(${slot.r + direction * 1.5}deg) scale(${slot.s})`;
      });

      setTimeout(() => {
        const next = (prevIndex + direction + reels.length) % reels.length;
        setActiveIndex(next);
        applySlots(true);
      }, 140);
    },
    [activeIndex, getSlots, getRel, reels.length, applySlots]
  );

  const onPointerDown = useCallback((e) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    setDragState({ dragging: true, startX: e.clientX, delta: 0 });
    stageRef.current?.setPointerCapture?.(e.pointerId);
  }, []);

  const onPointerMove = useCallback(
    (e) => {
      if (!dragState.dragging) return;
      const dx = e.clientX - dragState.startX;
      setDragState((prev) => ({ ...prev, delta: dx }));
      applyDragPreview(dx);
    },
    [dragState.dragging, dragState.startX, applyDragPreview]
  );

  const onPointerUp = useCallback(() => {
    if (!dragState.dragging) return;
    const { delta } = dragState;

    if (stageRef.current) {
      stageRef.current
        .querySelectorAll(".film-card")
        .forEach((c) => {
          c.style.transition =
            "transform .5s cubic-bezier(.22,.8,.2,1), opacity .4s ease, filter .4s ease";
        });
    }

    if (Math.abs(delta) > SWIPE_THRESHOLD) {
      const dir = delta < 0 ? 1 : -1;
      playTransition(dir);
    } else {
      applySlots(true);
    }

    setDragState({ dragging: false, startX: 0, delta: 0 });
  }, [dragState, playTransition, applySlots]);

  const onPointerCancel = useCallback(() => {
    setDragState({ dragging: false, startX: 0, delta: 0 });
    applySlots(true);
  }, [applySlots]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        playTransition(-1);
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        playTransition(1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [playTransition]);

  useEffect(() => { applySlots(true); }, [reels, applySlots]);

  useEffect(() => {
    const onResize = () => applySlots(true);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [applySlots]);

  if (!reels.length) return null;

  return (
    <div
      ref={stageRef}
      style={{
        position: "relative",
        width: "100%",
        height: "520px",
        overflow: "hidden",
        touchAction: "none",
        overscrollBehavior: "contain",
        cursor: dragState.dragging ? "grabbing" : "grab",
        userSelect: "none",
        WebkitUserSelect: "none",
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerCancel}
      onPointerLeave={onPointerCancel}
      role="region"
      aria-label="Reel gallery — swipe to browse"
      aria-roledescription="carousel"
    >
      {/* Center glow */}
      <div aria-hidden="true" style={{
        position: "absolute", left: "50%", top: "50%",
        width: 200, height: 200, transform: "translate(-50%,-50%)",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(94,24,28,0.10), transparent 66%)",
        pointerEvents: "none", zIndex: 0,
      }} />

      {/* Strip origin */}
      <div style={{
        position: "absolute", left: "50%", top: "50%",
        width: 0, height: 0, zIndex: 1,
        paddingBottom: "115%",
      }}>
        {reels.map((reel, i) => {
          const rel = getRel(i);
          const isCenter = rel === 0;

          return (
            <div
              key={reel.id}
              ref={(el) => { cardRefs.current[i] = el; }}
              className="film-card"
              onClick={() => {
                if (!isCenter) {
                  setActiveIndex(i);
                  // Give it a tiny delay to start sliding before modal covers it
                  setTimeout(() => applySlots(true), 50);
                }
                onOpen?.(reel);
              }}
              role="button"
              tabIndex={0}
              aria-label={`${reel.title} — click to play`}
              onKeyDown={(e) => { if (e.key === "Enter") onOpen?.(reel); }}
              style={{
                position: "absolute", left: 0, top: 0,
                width: "clamp(145px, 44vw, 195px)",
                aspectRatio: "9/16", borderRadius: 14, overflow: "hidden",
                cursor: "pointer",
                background: "linear-gradient(180deg, #1A0507 0%, #140406 100%)",
                border: isCenter ? "1.5px solid rgba(212,184,150,0.22)" : "1px solid rgba(212,184,150,0.08)",
                boxShadow: isCenter ? "0 28px 60px rgba(0,0,0,0.5)" : "0 12px 32px rgba(0,0,0,0.3)",
                willChange: "transform, opacity, filter",
                pointerEvents: "auto",
                opacity: 0, // hide extra cards by default
                transform: "translate(-50%,-50%) scale(0.5)", // shrink extra cards out of view
              }}
            >
              <img src={reel.poster} alt="" loading="lazy" decoding="async" style={{
                width: "100%", height: "100%", objectFit: "cover",
                transition: "transform 0.7s cubic-bezier(.23,1,.32,1), filter 0.5s ease",
                transform: isCenter ? "scale(1)" : "scale(1.06)",
                filter: isCenter ? "brightness(1)" : "brightness(0.7)",
              }} />
              <div aria-hidden="true" style={{
                position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none",
                background: "linear-gradient(to top, rgba(20,4,6,0.9) 0%, rgba(20,4,6,0.4) 35%, rgba(20,4,6,0.05) 65%, transparent 100%)",
              }} />

              {/* Centered Play Triangle Button */}
              <button
                type="button"
                onPointerDown={(e) => {
                  e.stopPropagation();
                }}
                onPointerUp={(e) => {
                  e.stopPropagation();
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  if (!isCenter) {
                    setActiveIndex(i);
                    setTimeout(() => applySlots(true), 50);
                  }
                  onOpen?.(reel);
                }}
                aria-label={`Play ${reel.title}`}
                style={{
                  position: "absolute", top: "50%", left: "50%",
                  transform: "translate(-50%,-50%)", zIndex: 6,
                  width: 44, height: 44, borderRadius: "50%",
                  background: "rgba(18, 3, 5, 0.75)",
                  border: "1.5px solid rgba(212,184,150,0.75)",
                  backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)",
                  boxShadow: "0 6px 20px rgba(0,0,0,0.6)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="var(--brand-cream)" style={{ marginLeft: 2 }}>
                  <polygon points="6 3 20 12 6 21 6 3" />
                </svg>
              </button>


              <div style={{
                position: "absolute", top: 8, right: 8, zIndex: 6, pointerEvents: "none",
                padding: "2px 7px", background: "rgba(10,2,3,0.7)", backdropFilter: "blur(6px)",
                fontFamily: "var(--font-body)", fontSize: 9, letterSpacing: "0.08em",
                color: "rgba(247,230,204,0.7)",
              }}>
                {reel.duration}
              </div>
            </div>
          );
        })}
      </div>

      {/* Active Reel Info — mobile only */}
      <div style={{
        position: "absolute", bottom: 58, left: "50%",
        transform: "translateX(-50%)", zIndex: 20,
        textAlign: "center", width: "100%", pointerEvents: "none",
      }}>
        <div style={{ fontSize: 10, color: "var(--brand-gold)", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 4, fontFamily: "var(--font-mono)" }}>
          {reels[activeIndex]?.category}
        </div>
        <div style={{ fontSize: 18, color: "var(--brand-cream)", fontStyle: "italic", fontFamily: "'Playfair Display', Georgia, serif" }}>
          {reels[activeIndex]?.title}
        </div>
        <div style={{ fontSize: 9, color: "rgba(247,230,204,0.4)", letterSpacing: "0.1em", marginTop: 8, fontFamily: "var(--font-body)", fontStyle: "italic" }}>
          &larr; Drag or swipe to explore &rarr;
        </div>
      </div>

      {/* See More — mobile only */}
      {onSeeMore && (
        <a
          href={typeof onSeeMore === "string" ? onSeeMore : "/works"}
          target={typeof onSeeMore === "string" && onSeeMore.startsWith("http") ? "_blank" : undefined}
          rel={typeof onSeeMore === "string" && onSeeMore.startsWith("http") ? "noopener noreferrer" : undefined}
          style={{
            position: "absolute", bottom: 10, left: "50%",
            transform: "translateX(-50%)", zIndex: 20,
            padding: "8px 22px",
            display: "inline-flex", alignItems: "center", gap: 6,
            background: "rgba(10,2,3,0.6)", backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            border: "1px solid rgba(212,184,150,0.22)",
            color: "rgba(247,230,204,0.8)",
            fontFamily: "var(--font-body)", fontSize: 10, fontWeight: 500,
            letterSpacing: "0.22em", textTransform: "uppercase",
            textDecoration: "none", cursor: "pointer", borderRadius: 0,
            transition: "all 0.35s ease", whiteSpace: "nowrap",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(10,2,3,0.85)";
            e.currentTarget.style.borderColor = "rgba(212,184,150,0.5)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(10,2,3,0.6)";
            e.currentTarget.style.borderColor = "rgba(212,184,150,0.22)";
          }}
        >
          SEE MORE &rarr;
        </a>
      )}
    </div>
  );
}
