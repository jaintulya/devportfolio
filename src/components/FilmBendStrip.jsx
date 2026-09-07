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
            <div aria-hidden="true" style={{
              position: "absolute", top: "50%", left: "50%",
              transform: "translate(-50%,-50%)", zIndex: 3, pointerEvents: "none",
              width: 40, height: 40, borderRadius: "50%",
              background: "rgba(20,4,6,0.5)", backdropFilter: "blur(8px)",
              border: "1px solid rgba(212,184,150,0.3)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="var(--brand-cream)" style={{ marginLeft: 1, opacity: 0.85 }}>
                <polygon points="5 3 19 12 5 21" />
              </svg>
            </div>
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
  const PREVIEW_DRAG_LIMIT = 100;

  const getRel = useCallback(
    (i) => {
      let r = i - activeIndex;
      const len = reels.length;
      if (len <= 7) {
        if (r > 3) r -= len;
        if (r < -3) r += len;
      } else {
        if (r > len / 2) r -= len;
        if (r < -len / 2) r += len;
      }
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
        let rel = getRel(i);
        if (rel > 3) rel -= reels.length;
        if (rel < -3) rel += reels.length;
        const slot = slots[rel + 3];
        if (!slot) return;

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
        let rel = getRel(i);
        if (rel > 3) rel -= reels.length;
        if (rel < -3) rel += reels.length;
        const slot = slots[rel + 3];
        if (!slot) return;

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
        let rel = getRel(i);
        if (rel > 3) rel -= reels.length;
        if (rel < -3) rel += reels.length;
        const slot = slots[rel + 3];
        if (!slot) return;

        const shove = direction * 20 * (rel === 0 ? -1 : 0.15);
        card.style.transition = "transform .15s ease-out, opacity .14s ease";
        card.style.transform =
          `translate(-50%,-50%) translate3d(${slot.x + shove}px,${slot.y}px,0) rotate(${slot.r + direction * 1.5}deg) scale(${slot.s})`;
      });

      setTimeout(() => {
        const next = Math.max(0, Math.min(reels.length - 1, prevIndex + direction));
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
      if (Math.abs(dx) > PREVIEW_DRAG_LIMIT) return;
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
      const next = Math.max(0, Math.min(reels.length - 1, activeIndex + dir));
      if (next !== activeIndex) playTransition(dir);
      else applySlots(true);
    } else {
      applySlots(true);
    }

    setDragState({ dragging: false, startX: 0, delta: 0 });
  }, [dragState, activeIndex, reels.length, playTransition, applySlots]);

  const onPointerCancel = useCallback(() => {
    setDragState({ dragging: false, startX: 0, delta: 0 });
    applySlots(true);
  }, [applySlots]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        const next = Math.max(0, activeIndex - 1);
        if (next !== activeIndex) playTransition(-1);
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        const next = Math.min(reels.length - 1, activeIndex + 1);
        if (next !== activeIndex) playTransition(1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeIndex, reels.length, playTransition]);

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
        minHeight: 380,
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
          let rel = getRel(i);
          if (rel > 3) rel -= reels.length;
          if (rel < -3) rel += reels.length;
          const isCenter = rel === 0;

          return (
            <div
              key={reel.id}
              ref={(el) => { cardRefs.current[i] = el; }}
              className="film-card"
              onClick={isCenter ? () => onOpen?.(reel) : undefined}
              role={isCenter ? "button" : "presentation"}
              tabIndex={isCenter ? 0 : -1}
              aria-label={isCenter ? `${reel.title} — click to play` : undefined}
              onKeyDown={(e) => { if (e.key === "Enter" && isCenter) onOpen?.(reel); }}
              style={{
                position: "absolute", left: 0, top: 0,
                width: "clamp(145px, 44vw, 195px)",
                aspectRatio: "9/16", borderRadius: 14, overflow: "hidden",
                cursor: isCenter ? "pointer" : "default",
                background: "linear-gradient(180deg, #1A0507 0%, #140406 100%)",
                border: isCenter ? "1.5px solid rgba(212,184,150,0.22)" : "1px solid rgba(212,184,150,0.08)",
                boxShadow: isCenter ? "0 28px 60px rgba(0,0,0,0.5)" : "0 12px 32px rgba(0,0,0,0.3)",
                willChange: "transform, opacity, filter",
                pointerEvents: isCenter ? "auto" : "none",
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
              <div aria-hidden="true" style={{
                position: "absolute", inset: 8,
                border: "1px solid rgba(212,184,150,0.07)", borderRadius: 8,
                pointerEvents: "none", zIndex: 3,
              }} />
              {isCenter && (
                <div aria-hidden="true" style={{
                  position: "absolute", top: "50%", left: "50%",
                  transform: "translate(-50%,-50%)", zIndex: 5, pointerEvents: "none",
                  width: 48, height: 48, borderRadius: "50%",
                  background: "rgba(20,4,6,0.5)", backdropFilter: "blur(10px)",
                  WebkitBackdropFilter: "blur(10px)",
                  border: "1.5px solid rgba(212,184,150,0.4)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="var(--brand-cream)" style={{ marginLeft: 2, opacity: 0.9 }}>
                    <polygon points="5 3 19 12 5 21" />
                  </svg>
                </div>
              )}
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

      {/* See More — mobile only */}
      {onSeeMore && (
        <Link
          href={typeof onSeeMore === "string" ? onSeeMore : "/work"}
          style={{
            position: "absolute", bottom: 8, left: "50%",
            transform: "translateX(-50%)", zIndex: 20,
            padding: "8px 22px",
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
          See More
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} style={{ marginLeft: 6, verticalAlign: "middle" }}>
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      )}
    </div>
  );
}
