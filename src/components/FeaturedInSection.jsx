'use client';
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const publications = [
  { name: 'Vogue India', color: '#C9A27E' },
  { name: 'WeddingSutra', color: '#A8825A' },
  { name: 'WedMeGood', color: '#E8CBAA' },
  { name: 'Bridal Asia', color: '#C9A27E' },
  { name: 'Zankyou', color: '#A8825A' }
];

export default function FeaturedInSection() {
  const secRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current;
      if (track) {
        gsap.to(track, {
          x: -track.scrollWidth / 2,
          duration: 20,
          ease: 'none',
          repeat: -1
        });
      }
    }, secRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={secRef}
      style={{
        padding: '60px 0',
        background: '#2E2E2E'
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <div style={{ fontFamily: 'monospace', fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#C9A27E' }}>
          Trusted by Leading Publications
        </div>
      </div>
      <div
        style={{
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          position: 'relative'
        }}
      >
        <div
          ref={trackRef}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 80
          }}
        >
          {[...publications, ...publications].map((pub, idx) => (
            <div
              key={idx}
              style={{
                fontFamily: 'var(--font-cormorant,serif)',
                fontSize: 28,
                fontWeight: 300,
                color: 'rgba(255,255,255,0.4)',
                fontStyle: 'italic',
                letterSpacing: '0.1em'
              }}
            >
              {pub.name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
