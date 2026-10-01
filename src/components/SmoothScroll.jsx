'use client';
import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { mouseRef } from '@/lib/mouseRef';
import { scrollRef } from '@/lib/scrollRef';

gsap.registerPlugin(ScrollTrigger);

// Shared Lenis instance — lets other components (e.g. modal scroll-lock) stop/start it
export const lenisRef = { current: null };

export default function SmoothScroll({ children, onScroll }) {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const lenis = new Lenis({
      duration: prefersReducedMotion ? 0.01 : 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: !prefersReducedMotion,
      touchMultiplier: 1.5,
    });
    lenisRef.current = lenis;
    window.__lenis = lenis;

    // Single unified scroll listener
    lenis.on('scroll', (e) => {
      ScrollTrigger.update();
      scrollRef.current.progress = e.progress || 0;
      scrollRef.current.y = e.scroll || 0;
      scrollRef.current.velocity = e.velocity || 0;
      scrollRef.current.direction = e.direction || 1;

      if (typeof onScroll === 'function') {
        onScroll({ progress: e.progress, y: e.scroll });
      }
    });

    // Unified RAF loop using GSAP's ticker (no double RAF)
    const updateTicker = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(500, 33);

    // Smooth anchor handling
    const handleDocClick = (e) => {
      const anchor = e.target.closest('a[href^="#"]');
      if (anchor) {
        const targetId = anchor.getAttribute('href');
        if (targetId && targetId !== '#') {
          e.preventDefault();
          const targetEl = document.querySelector(targetId);
          if (targetEl) {
            lenis.scrollTo(targetEl, { offset: -20, duration: 1.2 });
          }
        }
      }
    };
    document.addEventListener('click', handleDocClick);

    // Debounced resize observer
    let refreshTimeout;
    const handleResize = () => {
      clearTimeout(refreshTimeout);
      refreshTimeout = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 150);
    };

    let resizeObserver;
    if ('ResizeObserver' in window) {
      resizeObserver = new ResizeObserver(handleResize);
      resizeObserver.observe(document.body);
    }
    window.addEventListener('resize', handleResize);

    const handleLoad = () => ScrollTrigger.refresh();
    window.addEventListener('load', handleLoad);

    // Track normalized mouse coordinates for 3D interactions
    const isTouch = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
    const handleMove = (e) => {
      if (isTouch) return;
      mouseRef.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      };
    };
    if (!isTouch) {
      window.addEventListener('mousemove', handleMove, { passive: true });
    }

    return () => {
      lenisRef.current = null;
      delete window.__lenis;
      lenis.destroy();
      gsap.ticker.remove(updateTicker);
      document.removeEventListener('click', handleDocClick);
      window.removeEventListener('load', handleLoad);
      window.removeEventListener('resize', handleResize);
      if (resizeObserver) resizeObserver.disconnect();
      clearTimeout(refreshTimeout);
      if (!isTouch) {
        window.removeEventListener('mousemove', handleMove);
      }
    };
  }, [onScroll]);

  return <>{children}</>;
}

