'use client';
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const ref = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(ref.current, { opacity:0, y:30, duration:1, ease:'power3.out', scrollTrigger:{ trigger:ref.current, start:'top 90%' } });
    });
    return () => ctx.revert();
  }, []);

  const go = h => document.querySelector(h)?.scrollIntoView({ behavior:'smooth' });

  return (
    <footer ref={ref} style={{ padding:'64px clamp(20px,5vw,48px) 32px', background:'#F8F5F2', borderTop:'1px solid rgba(46,46,46,0.08)' }}>
      <div style={{ maxWidth:1280, margin:'0 auto' }}>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))', gap:48, marginBottom:64 }}>
          {/* Brand */}
          <div>
            <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:16 }}>
              <svg width="28" height="21" viewBox="0 0 32 24" fill="none">
                <rect x="1" y="4" width="30" height="18" rx="3" stroke="#2E2E2E" strokeWidth="1.5" fill="none"/>
                <circle cx="16" cy="13" r="6" stroke="#C9A27E" strokeWidth="1.5" fill="none"/>
                <circle cx="16" cy="13" r="3" stroke="#C9A27E" strokeWidth="1" fill="none"/>
                <path d="M10 4V2a2 2 0 012-2h8a2 2 0 012 2v2" stroke="#2E2E2E" strokeWidth="1.5" strokeLinecap="round"/>
                <circle cx="26" cy="8" r="1.5" fill="#C9A27E"/>
              </svg>
              <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:18, fontWeight:600, color:'#2E2E2E' }}>Devarsh Jain</span>
            </div>
            <p style={{ fontFamily:"'Space Mono',monospace", fontSize:9, letterSpacing:'0.2em', textTransform:'uppercase', color:'#C9A27E', marginBottom:12 }}>Content Ka Pitara</p>
            <p style={{ fontFamily:"'Jost',sans-serif", fontSize:13, color:'#6B6B6B', lineHeight:1.7, maxWidth:260 }}>
              Wedding reel creator based in Ahmedabad, Gujarat. Turning your most cherished moments into timeless cinematic stories — nationally & internationally.
            </p>
          </div>

          {/* Navigate */}
          <div>
            <h4 style={{ fontFamily:"'Space Mono',monospace", fontSize:9, letterSpacing:'0.25em', textTransform:'uppercase', color:'#C9A27E', marginBottom:20 }}>Navigate</h4>
            <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
              {[{l:'Work',h:'#reels'},{l:'Services',h:'#services'},{l:'My Story',h:'#story'},{l:'Contact',h:'#contact'}].map(n=>(
                <button key={n.l} onClick={()=>go(n.h)} style={{ fontFamily:"'Jost',sans-serif", fontSize:13, color:'#6B6B6B', background:'none', border:'none', textAlign:'left', padding:0, transition:'color 0.3s' }}
                  onMouseEnter={e=>e.currentTarget.style.color='#C9A27E'} onMouseLeave={e=>e.currentTarget.style.color='#6B6B6B'}>
                  {n.l}
                </button>
              ))}
            </div>
          </div>

          {/* Connect */}
          <div>
            <h4 style={{ fontFamily:"'Space Mono',monospace", fontSize:9, letterSpacing:'0.25em', textTransform:'uppercase', color:'#C9A27E', marginBottom:20 }}>Connect</h4>
            <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
              {[
                {l:'Instagram',v:'@contentkapitara',href:'https://www.instagram.com/contentkapitara'},
                {l:'YouTube',v:'The Content Pitara',href:'https://youtube.com/@the_content_pitara'},
                {l:'WhatsApp',v:'+91 9157295844',href:'https://wa.me/919157295844'},
                {l:'Email',v:'devarsh123jain@gmail.com',href:'mailto:devarsh123jain@gmail.com'},
              ].map(s=>(
                <a key={s.l} href={s.href} target="_blank" rel="noopener noreferrer"
                  style={{ display:'flex', gap:10, textDecoration:'none' }}
                  onMouseEnter={e=>e.currentTarget.querySelector('span:last-child').style.color='#C9A27E'}
                  onMouseLeave={e=>e.currentTarget.querySelector('span:last-child').style.color='#2E2E2E'}>
                  <span style={{ fontFamily:"'Space Mono',monospace", fontSize:9, letterSpacing:'0.1em', textTransform:'uppercase', color:'#6B6B6B', width:60, flexShrink:0 }}>{s.l}</span>
                  <span style={{ fontFamily:"'Jost',sans-serif", fontSize:13, color:'#2E2E2E', transition:'color 0.3s' }}>{s.v}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:16, paddingTop:24, borderTop:'1px solid rgba(46,46,46,0.08)' }}>
          <span style={{ fontFamily:"'Space Mono',monospace", fontSize:9, color:'#6B6B6B', letterSpacing:'0.15em' }}>© 2025 Devarsh Jain. All rights reserved.</span>
          {/* Film holes decoration */}
          <div style={{ display:'flex', gap:6, opacity:0.2 }}>
            {Array.from({length:10},(_,i)=><div key={i} style={{ width:12,height:8,borderRadius:1,border:'1px solid #2E2E2E' }}/>)}
          </div>
          <span style={{ fontFamily:"'Space Mono',monospace", fontSize:9, color:'#6B6B6B', letterSpacing:'0.15em' }}>Crafted with ♥ in Ahmedabad</span>
        </div>
      </div>
    </footer>
  );
}
