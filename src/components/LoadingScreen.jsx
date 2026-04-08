'use client';
import { useEffect, useRef, useState } from 'react';

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);
  const [msgIdx, setMsgIdx] = useState(0);
  const msgs = ['Calibrating aperture...', 'Loading cinematic assets...', 'Preparing the reel experience...', 'Setting focus...', 'Ready.'];

  useEffect(() => {
    let cur = 0;
    const iv = setInterval(() => {
      cur += Math.random() * 14 + 4;
      if (cur >= 100) { cur = 100; clearInterval(iv); setTimeout(() => setExiting(true), 400); setTimeout(onComplete, 1500); }
      setProgress(Math.min(cur, 100));
      setMsgIdx(Math.min(Math.floor(cur / 22), msgs.length - 1));
    }, 130);
    return () => clearInterval(iv);
  }, []);

  const S = 260, cx = 130, cy = 130;
  const outerR = 118, goldR = 108, midR = 96, innerR = 82, glassR = 68;
  const [angle, setAngle] = useState(0);
  const [iAngle, setIAngle] = useState(0);
  const rafRef = useRef(null); const lastRef = useRef(null);
  useEffect(() => {
    const animate = ts => {
      if (lastRef.current !== null) { const dt = (ts - lastRef.current) / 1000; setAngle(a => a + dt * 18); setIAngle(a => a - dt * 30); }
      lastRef.current = ts; rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const open = progress / 100;
  const blades = 9;

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 10000, background: '#080706', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', opacity: exiting ? 0 : 1, transition: exiting ? 'opacity 1s ease' : 'none' }}>
      {/* Grain */}
      <div style={{ position: 'absolute', inset: '-50%', width: '200%', height: '200%', backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.88' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundSize: '128px 128px', opacity: 0.04, pointerEvents: 'none', zIndex: 0, animation: 'grainAnim 0.35s steps(1) infinite' }} />
      {/* Vignette */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.8) 100%)', zIndex: 1, pointerEvents: 'none' }} />
      {/* Scanline */}
      <div style={{ position: 'absolute', left: 0, right: 0, height: 100, background: 'linear-gradient(180deg,transparent,rgba(201,162,126,0.03),transparent)', zIndex: 2, animation: 'scanSweepL 5s linear infinite', pointerEvents: 'none' }} />
      {/* Film strips */}
      {['top','bottom'].map(pos => (
        <div key={pos} style={{ position: 'absolute', [pos]: 0, left: 0, right: 0, height: 34, background: '#050403', borderTop: pos === 'bottom' ? '1px solid #161616' : 'none', borderBottom: pos === 'top' ? '1px solid #161616' : 'none', display: 'flex', alignItems: 'center', overflow: 'hidden', zIndex: 3 }}>
          <div style={{ display: 'flex', gap: 10, padding: '0 8px', animation: `${pos === 'top' ? 'fs_top' : 'fs_bottom'} 10s linear infinite`, whiteSpace: 'nowrap' }}>
            {Array.from({ length: 50 }, (_, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                <div style={{ width: 12, height: 8, borderRadius: 2, border: '1px solid #1e1e1e', background: '#050403', flexShrink: 0 }} />
                {i % 5 === 0 && <span style={{ fontFamily: 'monospace', fontSize: 6, color: '#252525' }}>{String(i + 1).padStart(3, '0')}</span>}
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 28, padding: '40px 24px', textAlign: 'center' }}>
        {/* Brand */}
        <div>
          <p style={{ fontFamily: 'var(--font-cormorant,serif)', fontSize: 'clamp(14px,2vw,17px)', fontWeight: 400, color: 'rgba(201,162,126,0.65)', letterSpacing: '0.55em', textTransform: 'uppercase', marginBottom: 8 }}>Devarsh Jain</p>
          <div style={{ width: 40, height: 1, background: 'rgba(201,162,126,0.25)', margin: '0 auto' }} />
        </div>

        {/* SVG Lens Loader */}
        <div style={{ position: 'relative', width: 'clamp(200px,34vw,260px)', aspectRatio: '1' }}>
          <div style={{ position: 'absolute', inset: '-20px', borderRadius: '50%', boxShadow: `0 0 ${40+open*40}px rgba(201,162,126,${0.08+open*0.18}),0 0 ${80+open*60}px rgba(201,162,126,${0.04+open*0.08})`, transition: 'box-shadow 0.3s ease', pointerEvents: 'none' }} />
          <svg viewBox={`0 0 ${S} ${S}`} width="100%" height="100%" style={{ overflow: 'visible' }}>
            <defs>
              <radialGradient id="ll_glass" cx="38%" cy="32%" r="70%"><stop offset="0%" stopColor="#0d1825"/><stop offset="40%" stopColor="#060d18"/><stop offset="100%" stopColor="#020508"/></radialGradient>
              <linearGradient id="ll_gold" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#6b4820"/><stop offset="25%" stopColor="#C9A27E"/><stop offset="50%" stopColor="#E8CBAA"/><stop offset="75%" stopColor="#C9A27E"/><stop offset="100%" stopColor="#6b4820"/></linearGradient>
              <linearGradient id="ll_dark" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#2c2c2c"/><stop offset="50%" stopColor="#181818"/><stop offset="100%" stopColor="#0e0e0e"/></linearGradient>
              <linearGradient id="ll_prog" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#A8825A"/><stop offset="50%" stopColor="#C9A27E"/><stop offset="100%" stopColor="#E8CBAA"/></linearGradient>
              <radialGradient id="ll_ref" cx="32%" cy="28%" r="55%"><stop offset="0%" stopColor="rgba(255,248,240,0.13)"/><stop offset="100%" stopColor="transparent"/></radialGradient>
              <filter id="ll_gf"><feGaussianBlur stdDeviation="2.5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
            </defs>
            <circle cx={cx} cy={cy} r={outerR+8} fill="#050403"/>
            <circle cx={cx} cy={cy} r={outerR} fill="url(#ll_dark)"/>
            <circle cx={cx} cy={cy} r={outerR-4} fill="none" stroke="#222" strokeWidth={6} strokeDasharray="3 4"/>
            <g style={{ transformOrigin: `${cx}px ${cy}px`, transform: `rotate(${angle}deg)` }}>
              {Array.from({length:36},(_,i)=>{ const a=(i/36)*Math.PI*2,maj=i%9===0; return <line key={i} x1={cx+Math.cos(a)*(outerR-1)} y1={cy+Math.sin(a)*(outerR-1)} x2={cx+Math.cos(a)*(maj?goldR+6:goldR+12)} y2={cy+Math.sin(a)*(maj?goldR+6:goldR+12)} stroke={maj?'#C9A27E':'#2e2e2e'} strokeWidth={maj?1.5:0.7}/>})}
            </g>
            <circle cx={cx} cy={cy} r={goldR} fill="url(#ll_gold)"/>
            <circle cx={cx} cy={cy} r={goldR-5} fill="#111"/>
            <circle cx={cx} cy={cy} r={midR} fill="url(#ll_dark)"/>
            <g style={{ transformOrigin: `${cx}px ${cy}px`, transform: `rotate(${iAngle}deg)` }}>
              {Array.from({length:24},(_,i)=>{ const a=(i/24)*Math.PI*2,maj=i%6===0; return <line key={i} x1={cx+Math.cos(a)*(midR-1)} y1={cy+Math.sin(a)*(midR-1)} x2={cx+Math.cos(a)*(maj?innerR+5:innerR+9)} y2={cy+Math.sin(a)*(maj?innerR+5:innerR+9)} stroke={maj?'rgba(201,162,126,0.55)':'#252525'} strokeWidth={maj?1:0.5}/>})}
            </g>
            <circle cx={cx} cy={cy} r={innerR} fill="#0c0c0c"/>
            <circle cx={cx} cy={cy} r={innerR-5} fill="none" stroke="#181818" strokeWidth={3.5}/>
            <circle cx={cx} cy={cy} r={innerR-5} fill="none" stroke="url(#ll_prog)" strokeWidth={3.5} strokeLinecap="round" strokeDasharray={2*Math.PI*(innerR-5)} strokeDashoffset={2*Math.PI*(innerR-5)*(1-progress/100)} transform={`rotate(-90,${cx},${cy})`} filter="url(#ll_gf)" style={{transition:'stroke-dashoffset 0.15s ease'}}/>
            <circle cx={cx} cy={cy} r={glassR} fill="url(#ll_glass)"/>
            {Array.from({length:blades},(_,i)=>{ const bA=(i/blades)*Math.PI*2,rot=open*(Math.PI/blades)*2.6,blAngle=bA+rot,pd=glassR*(0.08+open*0.52),px=cx+Math.cos(bA)*pd,py=cy+Math.sin(bA)*pd,bW=glassR*0.5,bH=glassR*0.72,cosA=Math.cos(blAngle),sinA=Math.sin(blAngle); const p=(dx,dy)=>[px+dx*cosA-dy*sinA,py+dx*sinA+dy*cosA]; const[ax,ay]=p(-bW*0.5,0),[bx,by]=p(bW*0.5,0),[ccx,ccy]=p(bW*0.28,bH),[dx,dy]=p(-bW*0.28,bH); return <path key={i} d={`M${ax},${ay} L${bx},${by} Q${(bx+ccx)/2+3},${(by+ccy)/2} ${ccx},${ccy} L${dx},${dy} Q${(dx+ax)/2-3},${(dy+ay)/2} ${ax},${ay}Z`} fill="#0e0e0e" stroke="#181818" strokeWidth={0.5} style={{transition:'all 0.12s ease'}}/> })}
            <circle cx={cx} cy={cy} r={glassR} fill="url(#ll_ref)"/>
            <circle cx={cx} cy={cy} r={4} fill="none" stroke="rgba(201,162,126,0.35)" strokeWidth={1}/>
            <circle cx={cx} cy={cy} r={1.5} fill="#C9A27E" opacity={0.65}/>
            <text x={cx} y={cy+5} textAnchor="middle" fontFamily="monospace" fontSize={progress>=100?11:13} fontWeight="700" fill="#C9A27E" opacity={0.9} filter="url(#ll_gf)">{progress>=100?'✦':Math.round(progress)}</text>
            {progress<100&&<text x={cx} y={cy+15} textAnchor="middle" fontFamily="monospace" fontSize={6} fill="rgba(201,162,126,0.45)">%</text>}
          </svg>
        </div>

        {/* Message */}
        <p style={{ fontFamily: 'monospace', fontSize: 'clamp(9px,1.2vw,11px)', letterSpacing: '0.35em', textTransform: 'uppercase', color: 'rgba(201,162,126,0.8)', minHeight: 20 }}>{msgs[msgIdx]}</p>

        {/* Progress bar */}
        <div style={{ width: 'clamp(200px,38vw,300px)' }}>
          <div style={{ height: 1, background: '#1e1e1e', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: 0, width: `${progress}%`, background: 'linear-gradient(90deg,#6b4820,#C9A27E,#E8CBAA,#C9A27E)', backgroundSize: '200% 100%', animation: 'shimmer 1.8s linear infinite', transition: 'width 0.15s ease' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 7 }}>
            <span style={{ fontFamily: 'monospace', fontSize: 8, color: '#2e2e2e', letterSpacing: '0.2em', textTransform: 'uppercase' }}>Loading Portfolio</span>
            <span style={{ fontFamily: 'monospace', fontSize: 8, color: '#C9A27E', fontWeight: 700 }}>{Math.round(progress)}%</span>
          </div>
        </div>

        <p style={{ fontFamily: 'var(--font-cormorant,serif)', fontSize: 'clamp(12px,1.6vw,15px)', fontStyle: 'italic', fontWeight: 300, color: 'rgba(248,245,242,0.18)', letterSpacing: '0.1em' }}>"Wedding Reels · Couple Stories · Social Content"</p>
      </div>
    </div>
  );
}
