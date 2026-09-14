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
              alt={`${reel.title} — ${reel.couple || 'Wedding'} reel by Shaadi Pitara`}
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
  const [isBloomed, setIsBloomed] = useState(false);
  const isBloomedRef = useRef(false);
  useEffect(() => { isBloomedRef.current = isBloomed; }, [isBloomed]);

  // Ref-based touch state (no React re-renders during touch)
  const touchRef = useRef({
    active: false,
    startX: 0,
    startY: 0,
    startTime: 0,
    gestureDecided: false,
    gestureType: null, // "horizontal" | "vertical" | null
    currentDX: 0,
    currentDY: 0,
  });

  const activeIndexRef = useRef(0);
  useEffect(() => { activeIndexRef.current = activeIndex; }, [activeIndex]);

  const getSlots = useCallback(() => {
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
  const TAP_MOVE_LIMIT = 8;
  const TAP_DURATION_LIMIT = 300;
  const GESTURE_LOCK_THRESHOLD = 8;

  const getRelFor = useCallback(
    (i, aIdx) => {
      const len = reels.length;
      if (len === 0) return 0;
      let r = ((i - aIdx) % len + len) % len;
      if (r > len / 2) r -= len;
      return r;
    },
    [reels.length]
  );

  const getRel = useCallback(
    (i) => getRelFor(i, activeIndexRef.current),
    [getRelFor]
  );

  const applySlots = useCallback(
    (instant = true, blooming = false) => {
      if (!stageRef.current) return;
      const slots = getSlots();
      const bloomed = isBloomedRef.current;

      const transition = instant
        ? (blooming
            ? "transform .72s cubic-bezier(.16, 1, .3, 1), opacity .55s ease, filter .55s ease"
            : "transform .48s cubic-bezier(.22,.8,.2,1), opacity .4s ease, filter .4s ease")
        : "none";

      reels.forEach((_, i) => {
        const card = cardRefs.current[i];
        if (!card) return;
        const rel = getRelFor(i, activeIndexRef.current);
        const isCenter = rel === 0;
        const slotIndex = rel + 3;
        const slot = (slotIndex >= 0 && slotIndex < slots.length) ? slots[slotIndex] : null;
        if (!slot) {
          card.style.opacity = "0";
          card.style.pointerEvents = "none";
          card.style.transform = "translate(-50%,-50%) scale(0.4)";
          return;
        }

        if (blooming) {
          // Stagger delays like flower petals opening / folding
          const delay = bloomed
            ? `${Math.abs(rel) * 0.045}s`
            : `${(3 - Math.abs(rel)) * 0.035}s`;
          card.style.transitionDelay = isCenter ? "0s" : delay;
        } else {
          card.style.transitionDelay = "0s";
        }

        card.style.transition = transition;

        if (isCenter) {
          // Center card: always prominent at center
          card.style.transform =
            `translate(-50%,-50%) translate3d(0,0,0) rotate(0deg) scale(1)`;
          card.style.opacity = "1";
          card.style.filter = "none";
          card.style.zIndex = "10";
          card.style.pointerEvents = "auto";
        } else if (bloomed) {
          // Open state: fanned out like flower petals
          card.style.transform =
            `translate(-50%,-50%) translate3d(${slot.x}px,${slot.y}px,0) rotate(${slot.r}deg) scale(${slot.s})`;
          card.style.opacity = String(slot.o);
          card.style.filter = "saturate(.65) brightness(.8)";
          card.style.zIndex = String(slot.z);
          card.style.pointerEvents = (Math.abs(rel) <= 1) ? "auto" : "none";
        } else {
          // Closed state: folded directly behind the center card (single card view)
          card.style.transform =
            `translate(-50%,-50%) translate3d(0,0,0) rotate(0deg) scale(0.95)`;
          card.style.opacity = "0";
          card.style.filter = "saturate(.65) brightness(.8)";
          card.style.zIndex = String(slot.z);
          card.style.pointerEvents = "none";
        }
      });
    },
    [getSlots, getRelFor, reels.length]
  );

  // Move the top card during horizontal drag with natural fan curvature
  const applyTopCardDrag = useCallback(
    (dx) => {
      const slots = getSlots();
      const maxDrag = 110;
      const clampedDX = Math.max(-maxDrag, Math.min(maxDrag, dx));

      reels.forEach((_, i) => {
        const card = cardRefs.current[i];
        if (!card) return;
        const rel = getRelFor(i, activeIndexRef.current);
        const slotIndex = rel + 3;
        const slot = (slotIndex >= 0 && slotIndex < slots.length) ? slots[slotIndex] : null;

        if (rel === 0 && slot) {
          // Top card follows finger with slight curvature into stack
          const rotation = slot.r + clampedDX * 0.035;
          const yOffset = Math.min(Math.abs(clampedDX) * 0.08, 10);
          card.style.transition = "none";
          card.style.transform =
            `translate(-50%,-50%) translate3d(${slot.x + clampedDX}px,${slot.y + yOffset}px,0) rotate(${rotation}deg) scale(${slot.s})`;
        }
      });
    },
    [getSlots, getRelFor, reels.length]
  );

  // Smoothly tuck the active card underneath into the stack (right stack if swiped right, left stack if swiped left)
  const playSwipeToStack = useCallback(
    (direction, indexDelta) => {
      const prevIndex = activeIndexRef.current;
      const next = (prevIndex + indexDelta + reels.length) % reels.length;
      activeIndexRef.current = next;
      setActiveIndex(next);

      const slots = getSlots();
      const bloomed = isBloomedRef.current;
      const transition = "transform .48s cubic-bezier(.22,.8,.2,1), opacity .4s ease, filter .4s ease";

      reels.forEach((_, i) => {
        const card = cardRefs.current[i];
        if (!card) return;
        const rel = getRelFor(i, next);
        const isCenter = rel === 0;
        const slotIndex = rel + 3;
        const slot = (slotIndex >= 0 && slotIndex < slots.length) ? slots[slotIndex] : null;
        if (!slot) {
          card.style.opacity = "0";
          card.style.pointerEvents = "none";
          card.style.transform = "translate(-50%,-50%) scale(0.4)";
          return;
        }

        card.style.transitionDelay = "0s";
        card.style.transition = transition;

        if (isCenter) {
          card.style.transform =
            `translate(-50%,-50%) translate3d(0,0,0) rotate(0deg) scale(1)`;
          card.style.opacity = "1";
          card.style.filter = "none";
          card.style.zIndex = "10";
          card.style.pointerEvents = "auto";
        } else if (bloomed) {
          card.style.transform =
            `translate(-50%,-50%) translate3d(${slot.x}px,${slot.y}px,0) rotate(${slot.r}deg) scale(${slot.s})`;
          card.style.opacity = String(slot.o);
          card.style.filter = "saturate(.65) brightness(.8)";
          card.style.zIndex = String(slot.z);
          card.style.pointerEvents = (Math.abs(rel) <= 1) ? "auto" : "none";
        } else {
          card.style.transform =
            `translate(-50%,-50%) translate3d(0,0,0) rotate(0deg) scale(0.95)`;
          card.style.opacity = "0";
          card.style.filter = "saturate(.65) brightness(.8)";
          card.style.zIndex = String(slot.z);
          card.style.pointerEvents = "none";
        }
      });
    },
    [getSlots, getRelFor, reels.length]
  );

  // ── Tap-to-expand animation ──
  const expandCardAndOpenModal = useCallback(
    (reelIndex) => {
      const reel = reels[reelIndex];
      if (!reel) return;
      const card = cardRefs.current[reelIndex];
      if (!card) { onOpen?.(reel); return; }

      const rect = card.getBoundingClientRect();
      const viewportW = window.innerWidth;
      const viewportH = window.innerHeight;

      // Create backdrop
      const backdrop = document.createElement("div");
      backdrop.style.cssText = `
        position:fixed;inset:0;z-index:99990;
        background:rgba(5,1,2,0);
        transition:background .4s ease;
        pointer-events:none;
      `;
      document.body.appendChild(backdrop);

      // Create clone of the card
      const clone = card.cloneNode(true);
      clone.style.cssText = `
        position:fixed;
        left:${rect.left}px;
        top:${rect.top}px;
        width:${rect.width}px;
        height:${rect.height}px;
        border-radius:14px;
        overflow:hidden;
        z-index:99991;
        pointer-events:none;
        will-change:transform,opacity;
        transform-origin:center center;
        transition:none;
        box-shadow:0 20px 60px rgba(0,0,0,0.6);
        border:1.5px solid rgba(212,184,150,0.22);
      `;
      document.body.appendChild(clone);

      // Hide original card temporarily
      card.style.opacity = "0";

      // Calculate target: center of viewport, scaled up
      const targetW = Math.min(viewportW * 0.75, 300);
      const targetH = targetW * (16 / 9);
      const targetLeft = (viewportW - targetW) / 2;
      const targetTop = (viewportH - targetH) / 2;

      // Force reflow then animate
      clone.offsetHeight; // eslint-disable-line no-unused-expressions
      requestAnimationFrame(() => {
        backdrop.style.background = "rgba(5,1,2,0.92)";
        clone.style.transition = "left .4s cubic-bezier(.22,.8,.2,1), top .4s cubic-bezier(.22,.8,.2,1), width .4s cubic-bezier(.22,.8,.2,1), height .4s cubic-bezier(.22,.8,.2,1), border-radius .4s ease, box-shadow .4s ease";
        clone.style.left = `${targetLeft}px`;
        clone.style.top = `${targetTop}px`;
        clone.style.width = `${targetW}px`;
        clone.style.height = `${targetH}px`;
        clone.style.borderRadius = "18px";
        clone.style.boxShadow = "0 40px 100px rgba(0,0,0,0.9)";
      });

      // After animation completes, open modal and clean up
      setTimeout(() => {
        clone.remove();
        backdrop.remove();
        // Restore original card opacity
        card.style.opacity = "";
        applySlots(true);
        onOpen?.(reel);
      }, 420);
    },
    [reels, onOpen, applySlots]
  );

  // ── Raw touch event handling via useEffect ──
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const handleTouchStart = (e) => {
      // Don't interfere with SEE MORE or other interactive links
      if (e.target.closest("a[href]")) return;

      // ONLY start swipe/tap tracking if touch started directly on a film card
      const cardEl = e.target.closest(".film-card");
      if (!cardEl) return;

      const touch = e.touches[0];
      touchRef.current = {
        active: true,
        startX: touch.clientX,
        startY: touch.clientY,
        startTime: performance.now(),
        gestureDecided: false,
        gestureType: null, // "horizontal" | "vertical" | null
        currentDX: 0,
        currentDY: 0,
      };
    };

    const handleTouchMove = (e) => {
      const t = touchRef.current;
      if (!t.active) return;

      const touch = e.touches[0];
      const dx = touch.clientX - t.startX;
      const dy = touch.clientY - t.startY;
      const absDX = Math.abs(dx);
      const absDY = Math.abs(dy);

      t.currentDX = dx;
      t.currentDY = dy;

      if (!t.gestureDecided) {
        const totalMove = Math.sqrt(dx * dx + dy * dy);
        if (totalMove > GESTURE_LOCK_THRESHOLD) {
          t.gestureDecided = true;
          if (absDY > absDX) {
            // Vertical gesture: allow native scroll while tracking swipe up/down
            t.gestureType = "vertical";
          } else {
            // Horizontal gesture on card: lock to swipe navigation
            t.gestureType = "horizontal";
            e.preventDefault();
          }
        }
        return;
      }

      if (t.gestureType === "horizontal") {
        e.preventDefault();
        applyTopCardDrag(dx);
      }
    };

    const handleTouchEnd = (e) => {
      const t = touchRef.current;
      if (!t.active) return;
      t.active = false;

      const duration = performance.now() - t.startTime;
      const dx = t.currentDX;
      const dy = t.currentDY;
      const absDX = Math.abs(dx);
      const absDY = Math.abs(dy);

      if (t.gestureType === "horizontal") {
        // Complete or cancel horizontal swipe
        if (absDX > SWIPE_THRESHOLD) {
          if (!isBloomedRef.current) {
            isBloomedRef.current = true;
            setIsBloomed(true);
          }
          if (dx > 0) {
            // Swiped right -> top card tucks into right stack, reveal previous card
            playSwipeToStack(1, -1);
          } else {
            // Swiped left -> top card tucks into left stack, reveal next card
            playSwipeToStack(-1, 1);
          }
        } else {
          // Snap back
          applySlots(true, false);
        }
      } else if (t.gestureType === "vertical" || absDY > 30) {
        // Vertical swipe:
        // dy < -30 (swipe UP) -> open/bloom like a flower!
        // dy > 30 (swipe DOWN) -> close back to single card!
        if (dy < -30) {
          if (!isBloomedRef.current) {
            isBloomedRef.current = true;
            setIsBloomed(true);
          }
        } else if (dy > 30) {
          if (isBloomedRef.current) {
            isBloomedRef.current = false;
            setIsBloomed(false);
          }
        }
      } else if (!t.gestureDecided || t.gestureType === null) {
        // Tap on card
        const touch = e.changedTouches[0];
        const totalDX = Math.abs(touch.clientX - t.startX);
        const totalDY = Math.abs(touch.clientY - t.startY);

        if (totalDX < TAP_MOVE_LIMIT && totalDY < TAP_MOVE_LIMIT && duration < TAP_DURATION_LIMIT) {
          const tapX = touch.clientX;
          const tapY = touch.clientY;

          let tappedIndex = -1;
          const currentActive = activeIndexRef.current;
          const checkOrder = [currentActive];
          const len = reels.length;
          const prevIdx = (currentActive - 1 + len) % len;
          const nextIdx = (currentActive + 1) % len;
          checkOrder.push(prevIdx, nextIdx);

          for (const idx of checkOrder) {
            const card = cardRefs.current[idx];
            if (!card) continue;
            const rect = card.getBoundingClientRect();
            if (tapX >= rect.left && tapX <= rect.right && tapY >= rect.top && tapY <= rect.bottom) {
              tappedIndex = idx;
              break;
            }
          }

          if (tappedIndex >= 0) {
            e.preventDefault();
            if (!isBloomedRef.current) {
              // Tapping on single card blooms it open!
              isBloomedRef.current = true;
              setIsBloomed(true);
            } else if (tappedIndex === currentActive) {
              expandCardAndOpenModal(tappedIndex);
            } else {
              // Tapped a side card -> rotate it to center!
              const delta = tappedIndex === nextIdx ? 1 : -1;
              const dir = delta === 1 ? -1 : 1;
              playSwipeToStack(dir, delta);
            }
          }
        }
      }

      // Reset
      touchRef.current = {
        active: false,
        startX: 0,
        startY: 0,
        startTime: 0,
        gestureDecided: false,
        gestureType: null,
        currentDX: 0,
        currentDY: 0,
      };
    };

    const handleTouchCancel = () => {
      const t = touchRef.current;
      if (t.active && t.gestureType === "horizontal") {
        applySlots(true, false);
      }
      touchRef.current = {
        active: false,
        startX: 0,
        startY: 0,
        startTime: 0,
        gestureDecided: false,
        gestureType: null,
        currentDX: 0,
        currentDY: 0,
      };
    };

    stage.addEventListener("touchstart", handleTouchStart, { passive: true });
    stage.addEventListener("touchmove", handleTouchMove, { passive: false });
    stage.addEventListener("touchend", handleTouchEnd, { passive: false });
    stage.addEventListener("touchcancel", handleTouchCancel, { passive: true });

    return () => {
      stage.removeEventListener("touchstart", handleTouchStart);
      stage.removeEventListener("touchmove", handleTouchMove);
      stage.removeEventListener("touchend", handleTouchEnd);
      stage.removeEventListener("touchcancel", handleTouchCancel);
    };
  }, [applyTopCardDrag, applySlots, playSwipeToStack, expandCardAndOpenModal, reels.length]);

  // ── Keyboard navigation ──
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        playSwipeToStack(1, -1);
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        playSwipeToStack(-1, 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [playSwipeToStack]);

  // ── Horizontal wheel (trackpad / Shift+wheel) — kept for non-touch ──
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    let accumulatedDeltaX = 0;
    let lastTriggerTime = 0;
    let resetTimer = null;
    const THRESHOLD = 35;
    const COOLDOWN = 260;

    const handleWheel = (e) => {
      const dx = e.deltaX !== 0 ? e.deltaX : (e.shiftKey ? e.deltaY : 0);
      const absX = Math.abs(dx);
      const absY = Math.abs(e.deltaY);

      if (absX > absY && absX > 2) {
        e.preventDefault();
        const now = performance.now();
        if (now - lastTriggerTime < COOLDOWN) return;

        accumulatedDeltaX += dx;
        clearTimeout(resetTimer);
        resetTimer = setTimeout(() => {
          accumulatedDeltaX = 0;
        }, 140);

        if (Math.abs(accumulatedDeltaX) >= THRESHOLD) {
          if (accumulatedDeltaX > 0) {
            playSwipeToStack(-1, 1);
          } else {
            playSwipeToStack(1, -1);
          }
          lastTriggerTime = now;
          accumulatedDeltaX = 0;
        }
      }
    };

    stage.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      stage.removeEventListener("wheel", handleWheel);
      clearTimeout(resetTimer);
    };
  }, [playSwipeToStack]);

  // Trigger flower bloom animation when isBloomed state changes
  useEffect(() => {
    applySlots(true, true);
  }, [isBloomed, applySlots]);

  // Scroll switch from Hero to Work: start as single card, bloom open like a flower when entering view; close when scrolled back to Hero
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.22) {
            if (!isBloomedRef.current) {
              isBloomedRef.current = true;
              setIsBloomed(true);
            }
          } else if (!entry.isIntersecting && entry.boundingClientRect.top > 0) {
            // Scrolled back up toward Hero
            if (isBloomedRef.current) {
              isBloomedRef.current = false;
              setIsBloomed(false);
            }
          }
        });
      },
      {
        threshold: [0, 0.22, 0.5, 0.75],
      }
    );

    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onResize = () => applySlots(true, false);
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
        height: "560px",
        overflow: "hidden",
        touchAction: "pan-y",
        userSelect: "none",
        WebkitUserSelect: "none",
      }}
      role="region"
      aria-label="Reel gallery — swipe to browse"
      aria-roledescription="carousel"
    >
      {/* Top Swipe hint — mobile only */}
      <div style={{
        position: "absolute", top: 12, left: "50%",
        transform: "translateX(-50%)", zIndex: 20,
        textAlign: "center", width: "100%", pointerEvents: "none",
        fontSize: 10, color: "rgba(247,230,204,0.55)", letterSpacing: "0.2em",
        fontFamily: "var(--font-mono)", textTransform: "uppercase",
        transition: "opacity 0.4s ease",
      }}>
        &larr; Swipe to explore &rarr;
      </div>

      {/* Center glow */}
      <div aria-hidden="true" style={{
        position: "absolute", left: "50%", top: "44%",
        width: 200, height: 200, transform: "translate(-50%,-50%)",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(94,24,28,0.10), transparent 66%)",
        pointerEvents: "none", zIndex: 0,
      }} />

      {/* Strip origin */}
      <div style={{
        position: "absolute", left: "50%", top: "44%",
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
              role="button"
              tabIndex={0}
              aria-label={`${reel.title} — click to play`}
              onKeyDown={(e) => { if (e.key === "Enter") expandCardAndOpenModal(i); }}
              style={{
                position: "absolute", left: 0, top: 0,
                width: "clamp(145px, 44vw, 195px)",
                aspectRatio: "9/16", borderRadius: 14, overflow: "hidden",
                cursor: "pointer",
                touchAction: "pan-y",
                background: "linear-gradient(180deg, #1A0507 0%, #140406 100%)",
                border: isCenter ? "1.5px solid rgba(212,184,150,0.22)" : "1px solid rgba(212,184,150,0.08)",
                boxShadow: isCenter ? "0 20px 45px rgba(0,0,0,0.45)" : "0 8px 24px rgba(0,0,0,0.25)",
                willChange: "transform, opacity, filter",
                pointerEvents: "auto",
                opacity: 0,
                transform: "translate(-50%,-50%) scale(0.5)",
              }}
            >
              <img src={reel.poster} alt={`${reel.title} — ${reel.couple || 'Wedding'} reel by Shaadi Pitara`} loading="lazy" decoding="async" style={{
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
                onClick={(e) => {
                  e.stopPropagation();
                  expandCardAndOpenModal(i);
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
        position: "absolute", bottom: 66, left: "50%",
        transform: "translateX(-50%)", zIndex: 20,
        textAlign: "center", width: "100%", pointerEvents: "none",
      }}>
        <div style={{ fontSize: 10, color: "var(--brand-gold)", textTransform: "uppercase", letterSpacing: "0.18em", marginBottom: 4, fontFamily: "var(--font-mono)" }}>
          {reels[activeIndex]?.category}
        </div>
        <div style={{ fontSize: 19, color: "var(--brand-cream)", fontStyle: "italic", fontFamily: "'Playfair Display', Georgia, serif", lineHeight: 1.2 }}>
          {reels[activeIndex]?.title}
        </div>
      </div>

      {/* See More — mobile only */}
      {onSeeMore && (
        <a
          href={typeof onSeeMore === "string" ? onSeeMore : "/works"}
          target={typeof onSeeMore === "string" && onSeeMore.startsWith("http") ? "_blank" : undefined}
          rel={typeof onSeeMore === "string" && onSeeMore.startsWith("http") ? "noopener noreferrer" : undefined}
          onTouchStart={(e) => e.stopPropagation()}
          style={{
            position: "absolute", bottom: 12, left: "50%",
            transform: "translateX(-50%)", zIndex: 20,
            padding: "10px 24px",
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "var(--brand-gold)", backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            border: "1px solid var(--brand-gold)",
            color: "var(--brand-maroon-dark)",
            fontFamily: "var(--font-mono)", fontSize: 10, fontWeight: 600,
            letterSpacing: "0.2em", textTransform: "uppercase",
            textDecoration: "none", cursor: "pointer", borderRadius: 4,
            transition: "all 0.3s ease", whiteSpace: "nowrap",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(212, 184, 150, 0.08)";
            e.currentTarget.style.color = "var(--brand-cream)";
            e.currentTarget.style.borderColor = "rgba(212, 184, 150, 0.35)";
            e.currentTarget.style.transform = "translateX(-50%) translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "var(--brand-gold)";
            e.currentTarget.style.color = "var(--brand-maroon-dark)";
            e.currentTarget.style.borderColor = "var(--brand-gold)";
            e.currentTarget.style.transform = "translateX(-50%) translateY(0)";
          }}
        >
          SEE MORE
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>
      )}
    </div>
  );
}
