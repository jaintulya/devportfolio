'use client';
import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const posRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef(null);

  useEffect(() => {
    const dot = dotRef.current;
    if (!dot) return;

    const onMove = (e) => { posRef.current = { x: e.clientX, y: e.clientY }; };

    const onEnter = () => dot.classList.add('expanded');
    const onLeave = () => dot.classList.remove('expanded');

    const lerp = (a, b, t) => a + (b - a) * t;
    const animate = () => {
      currentRef.current.x = lerp(currentRef.current.x, posRef.current.x, 0.18);
      currentRef.current.y = lerp(currentRef.current.y, posRef.current.y, 0.18);
      if (dot) {
        dot.style.left = currentRef.current.x + 'px';
        dot.style.top = currentRef.current.y + 'px';
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    const interactives = document.querySelectorAll('button, a, [data-cursor]');
    interactives.forEach(el => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    window.addEventListener('mousemove', onMove);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return <div id="cursor-dot" ref={dotRef} />;
}
