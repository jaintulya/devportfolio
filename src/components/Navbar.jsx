'use client';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export default function Navbar() {
  const navRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    gsap.from(navRef.current, { y: -80, opacity: 0, duration: 1.2, ease: 'power3.out', delay: 0.3 });
  }, []);

  const go = (id) => { document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' }); setMobileOpen(false); };

  const links = [{ l: 'Work', h: '#reels' }, { l: 'Story', h: '#story' }, { l: 'Services', h: '#services' }, { l: 'Journey', h: '#experience' }, { l: 'Contact', h: '#contact' }];

  return (
    <>
      <nav ref={navRef} style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, padding: scrolled ? '12px 48px' : '24px 48px', background: scrolled ? 'rgba(248,245,242,0.92)' : 'transparent', backdropFilter: scrolled ? 'blur(12px)' : 'none', borderBottom: scrolled ? '1px solid rgba(201,162,126,0.15)' : 'none', transition: 'all 0.4s ease', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'none', border: 'none', cursor: 'none' }}>
          <svg width="28" height="21" viewBox="0 0 32 24" fill="none">
            <rect x="1" y="4" width="30" height="18" rx="3" stroke="#2E2E2E" strokeWidth="1.5" fill="none"/>
            <circle cx="16" cy="13" r="6" stroke="#C9A27E" strokeWidth="1.5" fill="none"/>
            <circle cx="16" cy="13" r="3" stroke="#C9A27E" strokeWidth="1" fill="none"/>
            <path d="M10 4V2a2 2 0 012-2h8a2 2 0 012 2v2" stroke="#2E2E2E" strokeWidth="1.5" strokeLinecap="round"/>
            <circle cx="26" cy="8" r="1.5" fill="#C9A27E"/>
          </svg>
          <span style={{ fontFamily: 'var(--font-cormorant,serif)', fontSize: 20, fontWeight: 600, color: '#2E2E2E', letterSpacing: '0.05em' }}>Devarsh Jain</span>
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: 36 }} className="hidden-mobile">
          {links.map(l => (
            <button key={l.l} onClick={() => go(l.h)} style={{ fontFamily: 'monospace', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#6B6B6B', background: 'none', border: 'none', cursor: 'none', position: 'relative', transition: 'color 0.3s' }}
              onMouseEnter={e => e.currentTarget.style.color = '#C9A27E'}
              onMouseLeave={e => e.currentTarget.style.color = '#6B6B6B'}
            >{l.l}</button>
          ))}
        </div>

        <button onClick={() => go('#contact')} className="focus-sq hidden-mobile" style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 22px', border: '1px solid rgba(201,162,126,0.5)', background: 'transparent', cursor: 'none', fontFamily: 'monospace', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#2E2E2E', transition: 'all 0.3s' }}
          onMouseEnter={e => { e.currentTarget.style.background = '#C9A27E'; e.currentTarget.style.color = '#F8F5F2'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#2E2E2E'; }}
        >
          <span className="rec-dot" style={{ width: 6, height: 6, borderRadius: '50%', background: '#ef4444', display: 'inline-block' }} />
          Book Now
        </button>

        <button onClick={() => setMobileOpen(!mobileOpen)} className="show-mobile" style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'none', flexDirection: 'column', gap: 5, padding: 4 }}>
          {[0,1,2].map(i => <span key={i} style={{ display: 'block', width: 24, height: 1.5, background: '#2E2E2E', transition: 'all 0.3s', transform: mobileOpen ? (i===0?'rotate(45deg) translate(4px,4px)':i===2?'rotate(-45deg) translate(4px,-4px)':'none') : 'none', opacity: mobileOpen&&i===1?0:1 }} />)}
        </button>
      </nav>

      {/* Mobile menu */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 99, background: 'rgba(248,245,242,0.97)', backdropFilter: 'blur(16px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 40, opacity: mobileOpen ? 1 : 0, pointerEvents: mobileOpen ? 'auto' : 'none', transition: 'opacity 0.4s ease' }}>
        {links.map((l, i) => (
          <button key={l.l} onClick={() => go(l.h)} style={{ fontFamily: 'var(--font-cormorant,serif)', fontSize: 42, fontWeight: 300, color: '#2E2E2E', background: 'none', border: 'none', cursor: 'pointer', transition: 'color 0.3s', transitionDelay: `${i * 60}ms` }}
            onMouseEnter={e => e.currentTarget.style.color = '#C9A27E'}
            onMouseLeave={e => e.currentTarget.style.color = '#2E2E2E'}
          >{l.l}</button>
        ))}
      </div>

      <style>{`
        @media(max-width:768px){.hidden-mobile{display:none!important}.show-mobile{display:flex!important}}
        @media(min-width:769px){nav{padding-left:48px!important;padding-right:48px!important}}
        @media(max-width:768px){nav{padding-left:20px!important;padding-right:20px!important}}
      `}</style>
    </>
  );
}
