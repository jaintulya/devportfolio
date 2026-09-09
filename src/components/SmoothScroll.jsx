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
    const lenis = new Lenis({ duration: 1.4, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true });
    lenisRef.current = lenis;
    if (typeof window !== 'undefined') window.__lenis = lenis;
    lenis.on('scroll', ({ progress, scroll }) => {
      ScrollTrigger.update();
      // Write to a mutable ref — no React re-renders per scroll tick
      scrollRef.current.progress = progress;
      scrollRef.current.y = scroll;
      if (typeof onScroll === 'function') {
        onScroll({ progress, y: scroll });
      }
    });
    gsap.ticker.add(time => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    const handleDocClick = (e) => {
      const anchor = e.target.closest('a[href^="#"]');
      if (anchor) {
        const targetId = anchor.getAttribute('href');
        e.preventDefault();
        const targetEl = targetId === '#' ? null : document.querySelector(targetId);
        lenis.scrollTo(targetEl || 0);
      }
    };
    document.addEventListener('click', handleDocClick);

    let resizeObserver;
    if (typeof window !== 'undefined' && 'ResizeObserver' in window) {
      resizeObserver = new ResizeObserver(() => ScrollTrigger.refresh());
      resizeObserver.observe(document.body);
    }
    const intervals = [100, 300, 600, 1000, 1500, 2000, 3000].map(delay =>
      setTimeout(() => ScrollTrigger.refresh(), delay)
    );
    const handleLoad = () => ScrollTrigger.refresh();
    window.addEventListener('load', handleLoad);

    const handleMove = (e) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      };
    };
    window.addEventListener('mousemove', handleMove, { passive: true });

    return () => {
      lenisRef.current = null;
      lenis.destroy();
      document.removeEventListener('click', handleDocClick);
      window.removeEventListener('load', handleLoad);
      if (resizeObserver) resizeObserver.disconnect();
      intervals.forEach(clearTimeout);
      window.removeEventListener('mousemove', handleMove);
    };
  }, [onScroll]);

  return <>{children}</>;
}
