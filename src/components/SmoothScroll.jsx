'use client';
import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }) {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.4, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(time => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    // Dynamic hash link scrolling
    const handleDocumentClick = (e) => {
      const anchor = e.target.closest('a[href^="#"]');
      if (anchor) {
        const targetId = anchor.getAttribute('href');
        if (targetId === '#') {
          e.preventDefault();
          lenis.scrollTo(0);
        } else {
          const targetEl = document.querySelector(targetId);
          if (targetEl) {
            e.preventDefault();
            lenis.scrollTo(targetEl);
          }
        }
      }
    };

    document.addEventListener('click', handleDocumentClick);

    // Watch for document height changes to refresh ScrollTrigger dynamically
    let resizeObserver;
    if (typeof window !== 'undefined' && 'ResizeObserver' in window) {
      resizeObserver = new ResizeObserver(() => {
        ScrollTrigger.refresh();
      });
      resizeObserver.observe(document.body);
    }

    // Refresh ScrollTrigger periodically for the first few seconds to account for slow-loading media
    const intervals = [100, 300, 600, 1000, 1500, 2000, 3000].map(delay => 
      setTimeout(() => ScrollTrigger.refresh(), delay)
    );

    const handleLoad = () => ScrollTrigger.refresh();
    window.addEventListener('load', handleLoad);

    return () => {
      lenis.destroy();
      document.removeEventListener('click', handleDocumentClick);
      window.removeEventListener('load', handleLoad);
      if (resizeObserver) resizeObserver.disconnect();
      intervals.forEach(clearTimeout);
    };
  }, []);
  return <>{children}</>;
}
