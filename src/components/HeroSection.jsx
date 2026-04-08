'use client';
import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const PHOTO = 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?cs=srgb&dl=pexels-italo-melo-881954-2379004.jpg&fm=jpg';

export default function HeroSection() {
  const secRef = useRef(null);
  const textRef = useRef(null);
  const badgeRef = useRef(null);
  const h1Ref = useRef(null);
  const subRef = useRef(null);
  const btnsRef = useRef(null);
  const statsRef = useRef(null);
  const scrollIndRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.4 });
      tl.from(badgeRef.current, { y: 20, opacity: 0, duration: 0.7, ease: 'power3.out' })
        .from(h1Ref.current?.querySelectorAll('.hl'), { y: 70, opacity: 0, duration: 0.9, stagger: 0.1, ease: 'power3.out' }, '-=0.3')
        .from(subRef.current, { y: 20, opacity: 0, duration: 0.7, ease: 'power3.out' }, '-=0.4')
        .from(btnsRef.current?.children, { y: 20, opacity: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out' }, '-=0.3')
        .from(statsRef.current?.children, { y: 15, opacity: 0, duration: 0.5, stagger: 0.1 }, '-=0.2')
        .from(scrollIndRef.current, { opacity: 0, duration: 0.8 }, '-=0.2');

      gsap.to(textRef.current, { y: -60, opacity: 0, scrollTrigger: { trigger: secRef.current, start: 'top top', end: 'bottom top', scrub: 1.2 } });
    }, secRef);
    return () => ctx.revert();
  }, []);

  const go = id => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section ref={secRef} id="hero" style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden', background: 'linear-gradient(135deg,#F8F5F2 0%,#F3EDE6 55%,#EDE4D8 100%)' }}>
      {/* Ambient blobs */}
      <div style={{ position: 'absolute', top: '20%', right: '15%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(ellipse,rgba(201,162,126,0.18) 0%,transparent 70%)', filter: 'blur(70px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '25%', left: '8%', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(ellipse,rgba(201,162,126,0.1) 0%,transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none' }} />
      {/* Grid */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.025, backgroundImage: 'linear-gradient(#2E2E2E 1px,transparent 1px),linear-gradient(90deg,#2E2E2E 1px,transparent 1px)', backgroundSize: '80px 80px', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: 'clamp(100px,12vw,130px) clamp(20px,5vw,60px) 80px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,420px),1fr))', gap: 'clamp(40px,6vw,80px)', alignItems: 'center', minHeight: '100vh' }}>
        {/* Text */}
        <div ref={textRef} style={{ position: 'relative', zIndex: 2 }}>
          <div ref={badgeRef} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 28 }}>
            <span className="rec-dot" style={{ width: 7, height: 7, borderRadius: '50%', background: '#ef4444', flexShrink: 0, display: 'inline-block' }} />
            <span style={{ fontFamily: 'monospace', fontSize: 'clamp(9px,1.2vw,11px)', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#C9A27E' }}>Available for 2025 Weddings</span>
          </div>

          <div ref={h1Ref} style={{ overflow: 'hidden', marginBottom: 24 }}>
            <h1 style={{ fontFamily: 'var(--font-cormorant,serif)', fontSize: 'clamp(3rem,6.5vw,5.8rem)', lineHeight: 0.92, fontWeight: 300, color: '#2E2E2E' }}>
              <span className="hl" style={{ display: 'block' }}>Turning</span>
              <span className="hl gold-shimmer-text" style={{ display: 'block', fontStyle: 'italic', fontWeight: 600, fontSize: '1.08em' }}>Moments</span>
              <span className="hl" style={{ display: 'block' }}>Into</span>
              <span className="hl" style={{ display: 'block', fontWeight: 700 }}>Cinematic</span>
              <span className="hl" style={{ display: 'block', fontWeight: 300 }}>Reels.</span>
            </h1>
          </div>

          <p ref={subRef} style={{ fontFamily: 'monospace', fontSize: 'clamp(9px,1.2vw,11px)', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#6B6B6B', marginBottom: 40, lineHeight: 1.8 }}>
            Wedding Reels&nbsp;•&nbsp;Couple Stories&nbsp;•&nbsp;Social Media Content
          </p>

          <div ref={btnsRef} style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 48 }}>
            <button className="focus-sq" onClick={() => go('#reels')} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: 'clamp(12px,1.5vw,16px) clamp(22px,3vw,32px)', background: '#2E2E2E', color: '#F8F5F2', border: 'none', cursor: 'none', fontFamily: 'monospace', fontSize: 'clamp(9px,1.1vw,11px)', letterSpacing: '0.2em', textTransform: 'uppercase', transition: 'background 0.4s' }}
              onMouseEnter={e => e.currentTarget.style.background = '#C9A27E'}
              onMouseLeave={e => e.currentTarget.style.background = '#2E2E2E'}
            >
              View Work
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/></svg>
            </button>
            <button className="focus-sq" onClick={() => go('#contact')} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: 'clamp(12px,1.5vw,16px) clamp(22px,3vw,32px)', background: 'transparent', color: '#2E2E2E', border: '1px solid rgba(46,46,46,0.35)', cursor: 'none', fontFamily: 'monospace', fontSize: 'clamp(9px,1.1vw,11px)', letterSpacing: '0.2em', textTransform: 'uppercase', transition: 'all 0.4s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#C9A27E'; e.currentTarget.style.color = '#C9A27E'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(46,46,46,0.35)'; e.currentTarget.style.color = '#2E2E2E'; }}
            >Contact</button>
          </div>

          <div ref={statsRef} style={{ display: 'flex', gap: 'clamp(20px,4vw,40px)', borderTop: '1px solid rgba(46,46,46,0.1)', paddingTop: 32, flexWrap: 'wrap' }}>
            {[{n:'4+',l:'Years Behind Camera'},{n:'120+',l:'Projects Done'},{n:'50K+',l:'Social Reach'}].map(s => (
              <div key={s.l}>
                <div style={{ fontFamily: 'var(--font-cormorant,serif)', fontSize: 'clamp(24px,3vw,32px)', fontWeight: 600 }}>{s.n}</div>
                <div style={{ fontFamily: 'monospace', fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#6B6B6B', marginTop: 4 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Lens */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', zIndex: 2 }}>
          <div style={{ width: '100%', maxWidth: 'min(520px,90vw)' }}>
            <CameraLens />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div ref={scrollIndRef} style={{ position: 'absolute', bottom: 28, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, zIndex: 5 }}>
        <span style={{ fontFamily: 'monospace', fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#6B6B6B' }}>Scroll</span>
        <div style={{ width: 1, height: 44, background: 'linear-gradient(to bottom,#C9A27E,transparent)', animation: 'pulse 2s ease-in-out infinite' }} />
      </div>
    </section>
  );
}

function CameraLens() {
  const [revealed, setRevealed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [ringAngle, setRingAngle] = useState(0);
  const rafRef = useRef(null); const lastRef = useRef(null);

  useEffect(() => { const c=()=>setIsMobile(window.matchMedia('(hover:none)').matches); c(); window.addEventListener('resize',c); return ()=>window.removeEventListener('resize',c); }, []);
  useEffect(() => {
    const animate=ts=>{ if(lastRef.current!==null){const dt=(ts-lastRef.current)/1000;setRingAngle(a=>a+dt*6);} lastRef.current=ts; rafRef.current=requestAnimationFrame(animate); };
    rafRef.current=requestAnimationFrame(animate); return ()=>cancelAnimationFrame(rafRef.current);
  }, []);

  const S=400,cx=200,cy=200,outerR=184,goldR=173,goldInR=165,bodyR=156,bezelR=142,glassR=132;

  return (
    <div onMouseEnter={()=>!isMobile&&setRevealed(true)} onMouseLeave={()=>!isMobile&&setRevealed(false)} onClick={()=>isMobile&&setRevealed(v=>!v)} style={{ position: 'relative', width: '100%', maxWidth: 'min(480px,90vw)', aspectRatio: '1', margin: '0 auto', cursor: isMobile ? 'pointer' : 'none', userSelect: 'none' }}>
      {/* Glow */}
      <div style={{ position:'absolute',inset:'-10%',borderRadius:'50%',background:revealed?'radial-gradient(ellipse,rgba(201,162,126,0.2) 0%,transparent 65%)':'radial-gradient(ellipse,rgba(201,162,126,0.07) 0%,transparent 65%)',filter:'blur(28px)',transition:'background 0.9s ease',pointerEvents:'none' }} />
      {/* Corners */}
      {[{top:8,left:8,borderTop:'1.5px solid rgba(201,162,126,0.4)',borderLeft:'1.5px solid rgba(201,162,126,0.4)'},{top:8,right:8,borderTop:'1.5px solid rgba(201,162,126,0.4)',borderRight:'1.5px solid rgba(201,162,126,0.4)'},{bottom:36,left:8,borderBottom:'1.5px solid rgba(201,162,126,0.4)',borderLeft:'1.5px solid rgba(201,162,126,0.4)'},{bottom:36,right:8,borderBottom:'1.5px solid rgba(201,162,126,0.4)',borderRight:'1.5px solid rgba(201,162,126,0.4)'}].map((s,i)=>(
        <div key={i} style={{position:'absolute',width:24,height:24,pointerEvents:'none',...s}} />
      ))}

      <svg viewBox={`0 0 ${S} ${S}`} width="100%" height="100%" style={{display:'block',overflow:'visible'}}>
        <defs>
          <radialGradient id="h_glass" cx="35%" cy="28%" r="78%"><stop offset="0%" stopColor="#131c2a"/><stop offset="30%" stopColor="#090f1c"/><stop offset="70%" stopColor="#050910"/><stop offset="100%" stopColor="#020408"/></radialGradient>
          <linearGradient id="h_gold" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#4e3010"/><stop offset="18%" stopColor="#A8825A"/><stop offset="42%" stopColor="#E8CBAA"/><stop offset="62%" stopColor="#C9A27E"/><stop offset="82%" stopColor="#9a7248"/><stop offset="100%" stopColor="#4e3010"/></linearGradient>
          <linearGradient id="h_barrel" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#282828"/><stop offset="45%" stopColor="#161616"/><stop offset="100%" stopColor="#0a0a0a"/></linearGradient>
          <linearGradient id="h_bezel" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#1e1e1e"/><stop offset="50%" stopColor="#121212"/><stop offset="100%" stopColor="#080808"/></linearGradient>
          <radialGradient id="h_sheen" cx="28%" cy="24%" r="62%"><stop offset="0%" stopColor="rgba(255,252,248,0.13)"/><stop offset="45%" stopColor="rgba(255,252,248,0.04)"/><stop offset="100%" stopColor="transparent"/></radialGradient>
          <radialGradient id="h_pmask" cx="50%" cy="50%" r="50%"><stop offset="76%" stopColor="white" stopOpacity="1"/><stop offset="97%" stopColor="white" stopOpacity="0"/></radialGradient>
          <mask id="h_photomask"><circle cx={cx} cy={cy} r={glassR} fill="url(#h_pmask)"/></mask>
          <clipPath id="h_clip"><circle cx={cx} cy={cy} r={glassR}/></clipPath>
          <filter id="h_glow" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="3.5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
          <filter id="h_blur"><feGaussianBlur stdDeviation="3"/></filter>
        </defs>
        <circle cx={cx} cy={cy} r={outerR} fill="rgba(0,0,0,0.4)" filter="url(#h_blur)" transform="translate(0,8)"/>
        <circle cx={cx} cy={cy} r={outerR} fill="url(#h_barrel)"/>
        <circle cx={cx} cy={cy} r={outerR-6} fill="none" stroke="#0e0e0e" strokeWidth={10} strokeDasharray="2.5 3.8"/>
        <circle cx={cx} cy={cy} r={outerR-6} fill="none" stroke="#252525" strokeWidth={10} strokeDasharray="1 6.3" strokeDashoffset="1.8"/>
        <g style={{transformOrigin:`${cx}px ${cy}px`,transform:`rotate(${ringAngle}deg)`}}>
          {Array.from({length:48},(_,i)=>{const a=(i/48)*Math.PI*2,maj=i%12===0,med=i%4===0,r1=outerR-1,r2=maj?goldR+7:med?goldR+13:goldR+17;return <line key={i} x1={cx+Math.cos(a)*r1} y1={cy+Math.sin(a)*r1} x2={cx+Math.cos(a)*r2} y2={cy+Math.sin(a)*r2} stroke={maj?'#C9A27E':med?'#363636':'#1e1e1e'} strokeWidth={maj?1.8:0.8}/>})}
        </g>
        <circle cx={cx} cy={cy} r={goldR} fill="url(#h_gold)"/>
        <circle cx={cx} cy={cy} r={goldInR} fill="#101010"/>
        <circle cx={cx} cy={cy} r={goldInR+1} fill="none" stroke="#C9A27E" strokeWidth={0.5} opacity={0.3}/>
        <circle cx={cx} cy={cy} r={bodyR} fill="url(#h_barrel)"/>
        <circle cx={cx} cy={cy} r={bezelR} fill="url(#h_bezel)"/>
        <circle cx={cx} cy={cy} r={bezelR} fill="none" stroke="#1a1a1a" strokeWidth={1}/>
        <circle cx={cx} cy={cy} r={bezelR-4} fill="none" stroke="#0e0e0e" strokeWidth={2}/>
        <circle cx={cx} cy={cy} r={glassR} fill="url(#h_glass)"/>
        <image href={PHOTO} x={cx-glassR} y={cy-glassR} width={glassR*2} height={glassR*2} clipPath="url(#h_clip)" mask="url(#h_photomask)" preserveAspectRatio="xMidYMid slice" crossOrigin="anonymous" style={{opacity:revealed?1:0,transition:'opacity 0.75s cubic-bezier(0.4,0,0.2,1)'}}/>
        <circle cx={cx} cy={cy} r={glassR} fill="url(#h_sheen)" style={{opacity:revealed?0.3:1,transition:'opacity 0.75s ease'}}/>
        {[[glassR*0.76,'rgba(201,162,126,0.12)','8 14',0.45],[glassR*0.52,'rgba(255,255,255,0.055)','0',0],[glassR*0.3,'rgba(201,162,126,0.07)','0',0]].map(([r,stroke,dash,rotM],i)=>(
          <circle key={i} cx={cx} cy={cy} r={r} fill="none" stroke={stroke} strokeWidth={0.8} strokeDasharray={dash!=='0'?dash:undefined} style={{transformOrigin:`${cx}px ${cy}px`,transform:rotM?`rotate(${ringAngle*rotM}deg)`:undefined,opacity:revealed?0.25:1,transition:'opacity 0.7s ease'}}/>
        ))}
        <ellipse cx={cx-32} cy={cy-38} rx={14} ry={8} fill="rgba(255,250,240,0.07)" transform={`rotate(-25,${cx-32},${cy-38})`} style={{opacity:revealed?0.15:1,transition:'opacity 0.75s ease'}}/>
        <circle cx={cx} cy={cy} r={glassR+14} fill="none" stroke="#C9A27E" strokeWidth={1} strokeDasharray="5 9" style={{transformOrigin:`${cx}px ${cy}px`,transform:`rotate(${-ringAngle*1.8}deg)`,opacity:revealed?0.5:0,transition:'opacity 0.5s ease',filter:'url(#h_glow)'}}/>
        <circle cx={cx} cy={cy} r={glassR+20} fill="none" stroke="rgba(201,162,126,0.2)" strokeWidth={0.6} style={{opacity:revealed?1:0,transition:'opacity 0.5s ease 0.1s'}}/>
        <circle cx={cx} cy={cy} r={4} fill="none" stroke="rgba(201,162,126,0.28)" strokeWidth={1} style={{opacity:revealed?0:1,transition:'opacity 0.5s ease'}}/>
        <circle cx={cx} cy={cy} r={1.6} fill="#C9A27E" style={{opacity:revealed?0:0.45,transition:'opacity 0.5s ease'}}/>
      </svg>

      {/* Specs */}
      <div style={{position:'absolute',bottom:0,left:0,right:0,display:'flex',justifyContent:'center',gap:28,pointerEvents:'none',opacity:revealed?0:1,transform:revealed?'translateY(4px)':'translateY(0)',transition:'opacity 0.45s ease,transform 0.45s ease'}}>
        {[{v:'f/1.4',l:'APERTURE'},{v:'35mm',l:'FOCAL'},{v:'4K',l:'FORMAT'}].map(item=>(
          <div key={item.l} style={{textAlign:'center'}}>
            <div style={{fontFamily:'monospace',fontSize:10,color:'#C9A27E',fontWeight:700}}>{item.v}</div>
            <div style={{fontFamily:'monospace',fontSize:7,color:'#6B6B6B',letterSpacing:'0.2em'}}>{item.l}</div>
          </div>
        ))}
      </div>

      {/* Name on reveal */}
      <div style={{position:'absolute',bottom:0,left:0,right:0,display:'flex',flexDirection:'column',alignItems:'center',gap:3,pointerEvents:'none',opacity:revealed?1:0,transform:revealed?'translateY(0)':'translateY(6px)',transition:'opacity 0.55s ease 0.25s,transform 0.55s ease 0.25s'}}>
        <p style={{fontFamily:'var(--font-cormorant,serif)',fontSize:'clamp(14px,2vw,16px)',fontWeight:500,color:'#2E2E2E',letterSpacing:'0.1em',margin:0}}>Devarsh Jain</p>
        <p style={{fontFamily:'monospace',fontSize:8,letterSpacing:'0.28em',textTransform:'uppercase',color:'#C9A27E',margin:0}}>Wedding Reel Creator</p>
      </div>

      {isMobile&&!revealed&&(
        <div style={{position:'absolute',bottom:0,left:0,right:0,display:'flex',justifyContent:'center',alignItems:'center',gap:7,pointerEvents:'none'}}>
          <div style={{width:5,height:5,borderRadius:'50%',background:'#C9A27E',animation:'blink 1.4s ease-in-out infinite'}}/>
          <span style={{fontFamily:'monospace',fontSize:8,letterSpacing:'0.22em',textTransform:'uppercase',color:'#6B6B6B'}}>Tap to reveal</span>
        </div>
      )}
    </div>
  );
}
