'use client';
import { useRef, useEffect, useState, useCallback } from 'react';
import { gsap } from 'gsap'; import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const reels = [
  { id:1, title:'Golden Hour Vows', client:'Priya & Arjun', loc:'Udaipur, Rajasthan', dur:'03:24', cat:'Wedding Reel', color:'#C9A27E', src:'https://www.w3schools.com/html/mov_bbb.mp4' },
  { id:2, title:'Love in the Mist', client:'Sofia & Marco', loc:'Tuscany, Italy', dur:'02:58', cat:'Couple Story', color:'#A8825A', src:'https://www.w3schools.com/html/mov_bbb.mp4' },
  { id:3, title:'Beach Ceremony', client:'Aisha & James', loc:'Goa, India', dur:'04:12', cat:'Wedding Reel', color:'#E8CBAA', src:'https://www.w3schools.com/html/mov_bbb.mp4' },
  { id:4, title:'City Romance', client:'Maya & Dev', loc:'Ahmedabad, India', dur:'01:45', cat:'Instagram Reel', color:'#BF9870', src:'https://www.w3schools.com/html/mov_bbb.mp4' },
];

function ReelCard({ reel, index }) {
  const cardRef = useRef(null); const vidRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [timer, setTimer] = useState('00:00');
  const timerRef = useRef(null); const startRef = useRef(null);

  useEffect(() => {
    if (hovered) { startRef.current = Date.now(); timerRef.current = setInterval(() => { const e=Math.floor((Date.now()-startRef.current)/1000); setTimer(`${String(Math.floor(e/60)).padStart(2,'0')}:${String(e%60).padStart(2,'0')}`); }, 1000); }
    else { clearInterval(timerRef.current); setTimer('00:00'); }
    return () => clearInterval(timerRef.current);
  }, [hovered]);

  const onMove = useCallback(e => {
    if (!cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width - 0.5) * 2;
    const y = ((e.clientY - r.top) / r.height - 0.5) * 2;
    gsap.to(cardRef.current, { rotateY: x * 8, rotateX: -y * 8, duration: 0.4, ease: 'power2.out' });
  }, []);

  const onEnter = useCallback(() => { setHovered(true); vidRef.current?.play().catch(()=>{}); }, []);
  const onLeave = useCallback(() => { setHovered(false); if(vidRef.current){vidRef.current.pause();vidRef.current.currentTime=0;} gsap.to(cardRef.current, { rotateY:0, rotateX:0, duration:0.6, ease:'power3.out' }); }, []);

  return (
    <div ref={cardRef} onMouseEnter={onEnter} onMouseLeave={onLeave} onMouseMove={onMove} style={{ position:'relative', aspectRatio:'9/16', overflow:'hidden', background:'#1a1a1a', cursor:'none', transformStyle:'preserve-3d', perspective:800, transition:'box-shadow 0.4s' }}
      onMouseOver={e=>e.currentTarget.style.boxShadow='0 20px 60px rgba(0,0,0,0.35)'}
      onMouseOut={e=>e.currentTarget.style.boxShadow='none'}
    >
      <video ref={vidRef} src={reel.src} muted loop playsInline preload="none" style={{ position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover',opacity:hovered?1:0.2,transform:hovered?'scale(1.06)':'scale(1)',transition:'opacity 0.5s ease,transform 0.7s ease' }}/>
      {!hovered && <div style={{ position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center', background:`linear-gradient(135deg,${reel.color}22 0%,#1a1a1a 100%)` }}><div style={{width:56,height:56,borderRadius:'50%',border:'1px solid rgba(201,162,126,0.5)',display:'flex',alignItems:'center',justifyContent:'center'}}><svg width="20" height="20" fill="#C9A27E" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg></div></div>}
      <div style={{ position:'absolute',inset:0,background:'linear-gradient(to top,rgba(0,0,0,0.88) 0%,rgba(0,0,0,0.15) 50%,rgba(0,0,0,0.35) 100%)' }}/>
      {/* Camera corners */}
      {[{top:8,left:8,borderTop:'1.5px solid rgba(201,162,126,0.7)',borderLeft:'1.5px solid rgba(201,162,126,0.7)'},{top:8,right:8,borderTop:'1.5px solid rgba(201,162,126,0.7)',borderRight:'1.5px solid rgba(201,162,126,0.7)'},{bottom:8,left:8,borderBottom:'1.5px solid rgba(201,162,126,0.7)',borderLeft:'1.5px solid rgba(201,162,126,0.7)'},{bottom:8,right:8,borderBottom:'1.5px solid rgba(201,162,126,0.7)',borderRight:'1.5px solid rgba(201,162,126,0.7)'}].map((s,i)=><div key={i} style={{position:'absolute',width:18,height:18,zIndex:10,pointerEvents:'none',...s}}/>)}
      {/* REC */}
      <div style={{position:'absolute',top:16,left:16,zIndex:11,display:'flex',alignItems:'center',gap:6}}>
        <span className="rec-dot" style={{width:7,height:7,borderRadius:'50%',background:'#ef4444',display:'inline-block'}}/>
        <span style={{fontFamily:'monospace',fontSize:9,color:'rgba(255,255,255,0.85)',letterSpacing:'0.15em'}}>REC</span>
      </div>
      {/* Timer */}
      <div style={{position:'absolute',top:16,right:16,zIndex:11,fontFamily:'monospace',fontSize:9,color:'rgba(255,255,255,0.7)'}}>{timer}</div>
      {/* Focus square */}
      <div style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',width:52,height:52,zIndex:11,opacity:hovered?1:0,transition:'opacity 0.4s',pointerEvents:'none'}}>
        {[{top:0,left:0,borderTop:'2px solid #C9A27E',borderLeft:'2px solid #C9A27E'},{top:0,right:0,borderTop:'2px solid #C9A27E',borderRight:'2px solid #C9A27E'},{bottom:0,left:0,borderBottom:'2px solid #C9A27E',borderLeft:'2px solid #C9A27E'},{bottom:0,right:0,borderBottom:'2px solid #C9A27E',borderRight:'2px solid #C9A27E'}].map((s,i)=><div key={i} style={{position:'absolute',width:14,height:14,...s}}/>)}
      </div>
      {/* Info */}
      <div style={{position:'absolute',bottom:0,left:0,right:0,padding:20,zIndex:10}}>
        <div style={{fontFamily:'monospace',fontSize:9,letterSpacing:'0.2em',textTransform:'uppercase',color:'#C9A27E',marginBottom:4}}>{reel.cat}</div>
        <h3 style={{fontFamily:'var(--font-cormorant,serif)',fontSize:20,fontWeight:600,color:'#fff',marginBottom:4}}>{reel.title}</h3>
        <div style={{fontFamily:'monospace',fontSize:9,color:'rgba(255,255,255,0.5)',letterSpacing:'0.1em'}}>{reel.client} — {reel.loc}</div>
        <div style={{display:'flex',alignItems:'center',gap:10,marginTop:12}}>
          <div style={{flex:1,height:1,background:'rgba(201,162,126,0.3)'}}/>
          <span style={{fontFamily:'monospace',fontSize:9,color:'#C9A27E'}}>{reel.dur}</span>
        </div>
      </div>
    </div>
  );
}

export default function ReelShowcase() {
  const secRef = useRef(null); const headRef = useRef(null); const gridRef = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headRef.current, { y:60,opacity:0,duration:1,ease:'power3.out', scrollTrigger:{trigger:headRef.current,start:'top 80%'} });
      gsap.from(gridRef.current?.children, { y:80,opacity:0,duration:1,stagger:0.15,ease:'power3.out', scrollTrigger:{trigger:gridRef.current,start:'top 75%'} });
    }, secRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="reels" ref={secRef} style={{padding:'120px clamp(20px,5vw,60px)',background:'var(--cream)'}}>
      <div style={{maxWidth:1280,margin:'0 auto'}}>
        <div ref={headRef} style={{marginBottom:64,display:'flex',alignItems:'flex-end',justifyContent:'space-between',flexWrap:'wrap',gap:24}}>
          <div>
            <div style={{display:'flex',alignItems:'center',gap:14,fontFamily:'monospace',fontSize:10,letterSpacing:'0.3em',textTransform:'uppercase',color:'#C9A27E',marginBottom:16}}>
              <span style={{width:28,height:1,background:'#C9A27E',display:'block'}}/>Selected Work
            </div>
            <h2 style={{fontFamily:'var(--font-cormorant,serif)',fontSize:'clamp(2.8rem,5vw,4.5rem)',fontWeight:300,lineHeight:1.05}}>
              Cinematic <em style={{fontStyle:'italic',fontWeight:500,color:'#C9A27E'}} className="gold-shimmer-text">Reels</em>
            </h2>
          </div>
          <p style={{fontFamily:'var(--font-jost,sans-serif)',fontSize:13,color:'#6B6B6B',lineHeight:1.8,maxWidth:320}}>Each reel crafted with intention — capturing raw emotion and beauty of your most cherished moments.</p>
        </div>
        <div ref={gridRef} className="reel-grid" style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:24}}>
          {reels.map((r,i) => <div key={r.id} className="reel-card-wrap"><ReelCard reel={r} index={i}/></div>)}
        </div>
        <div style={{marginTop:64,textAlign:'center'}}>
          <a href="https://www.instagram.com/contentkapitara" target="_blank" rel="noopener noreferrer" className="focus-sq" style={{display:'inline-flex',alignItems:'center',gap:12,padding:'14px 36px',border:'1px solid rgba(46,46,46,0.3)',fontFamily:'monospace',fontSize:10,letterSpacing:'0.2em',textTransform:'uppercase',color:'#2E2E2E',textDecoration:'none',transition:'all 0.4s'}}
            onMouseEnter={e=>{e.currentTarget.style.borderColor='#C9A27E';e.currentTarget.style.color='#C9A27E';}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(46,46,46,0.3)';e.currentTarget.style.color='#2E2E2E';}}
          >View on Instagram →</a>
        </div>
      </div>
    </section>
  );
}
