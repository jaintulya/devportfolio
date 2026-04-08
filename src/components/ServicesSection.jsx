'use client';
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap'; import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const services = [
  { code:'ISO', full:'Reel Editing', val:'3200', icon:'◈', desc:'Frame-perfect editing with color grading, sound design, and cinematic transitions that make every moment breathtaking.', tags:['Color Grading','Sound Design','Transitions','Titles'], price:'₹15,000+', pct:72 },
  { code:'SHUTTER', full:'Wedding Shooting', val:'1/500s', icon:'◉', desc:'Full-day or half-day coverage with professional cinema cameras. Every kiss, every tear, every laugh — beautifully captured.', tags:['Full Day','4K Cinema','Drone Shots','Raw Files'], price:'₹45,000+', pct:88 },
  { code:'FOCUS', full:'Social Media Mgmt', val:'AUTO', icon:'◎', desc:'Monthly content creation for Instagram and YouTube — reels, shorts, and stories that grow your online presence.', tags:['Monthly Reels','Instagram','YouTube Shorts','Strategy'], price:'₹12,000/mo', pct:65 },
  { code:'WB', full:'Couple Story Films', val:'5600K', icon:'◐', desc:'Pre-wedding films that tell your love story. Cinematic, emotional, and utterly yours — treasured for generations.', tags:['Pre-Wedding','5-10 Min Film','Locations','Music Rights'], price:'₹25,000+', pct:80 },
];

export default function ServicesSection() {
  const secRef = useRef(null); const headRef = useRef(null); const gridRef = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headRef.current, { y:50,opacity:0,duration:1,ease:'power3.out', scrollTrigger:{trigger:headRef.current,start:'top 80%'} });
      const cards = gridRef.current?.querySelectorAll('.svc-card');
      cards?.forEach((card, i) => {
        gsap.from(card, { y:60,opacity:0,duration:0.9,ease:'power3.out',delay:i*0.12, scrollTrigger:{trigger:gridRef.current,start:'top 75%'} });
        const fill = card.querySelector('.slider-fill');
        if (fill) gsap.from(fill, { scaleX:0,duration:1.2,ease:'power3.out',delay:i*0.12+0.4,transformOrigin:'left center', scrollTrigger:{trigger:gridRef.current,start:'top 75%'} });
      });
    }, secRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="services" ref={secRef} style={{padding:'120px clamp(20px,5vw,60px)',background:'linear-gradient(180deg,#F8F5F2 0%,#F3EDE6 100%)'}}>
      <div style={{maxWidth:1280,margin:'0 auto'}}>
        <div ref={headRef} style={{marginBottom:64,display:'flex',alignItems:'flex-end',justifyContent:'space-between',flexWrap:'wrap',gap:24}}>
          <div>
            <div style={{display:'flex',alignItems:'center',gap:14,fontFamily:'monospace',fontSize:10,letterSpacing:'0.3em',textTransform:'uppercase',color:'#C9A27E',marginBottom:16}}>
              <span style={{width:28,height:1,background:'#C9A27E',display:'block'}}/>Camera Settings
            </div>
            <h2 style={{fontFamily:'var(--font-cormorant,serif)',fontSize:'clamp(2.8rem,5vw,4.5rem)',fontWeight:300,lineHeight:1.05}}>
              Services & <em className="gold-shimmer-text" style={{fontStyle:'italic',fontWeight:500}}>Offerings</em>
            </h2>
          </div>
          <p style={{fontFamily:'var(--font-jost,sans-serif)',fontSize:13,color:'#6B6B6B',lineHeight:1.8,maxWidth:300}}>Like adjusting camera settings for the perfect shot — each service precisely tuned to tell your story.</p>
        </div>

        <div ref={gridRef} className="services-grid" style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:20}}>
          {services.map(s => (
            <div key={s.code} className="svc-card" style={{padding:32,border:'1px solid #D9D5D1',position:'relative',background:'var(--cream)',transition:'border-color 0.4s,box-shadow 0.4s'}}
              onMouseEnter={e=>{e.currentTarget.style.borderColor='rgba(201,162,126,0.5)';e.currentTarget.style.boxShadow='0 8px 40px rgba(0,0,0,0.07)';}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor='#D9D5D1';e.currentTarget.style.boxShadow='none';}}
            >
              {/* Label notch */}
              <div style={{position:'absolute',top:-11,left:18,background:'var(--cream)',padding:'0 8px',fontFamily:'monospace',fontSize:10,color:'#C9A27E',letterSpacing:'0.2em'}}>{s.code}</div>
              {/* Icon row */}
              <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',marginBottom:24}}>
                <div style={{width:44,height:44,border:'1px solid rgba(201,162,126,0.3)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:20,color:'#C9A27E',transition:'all 0.3s'}}>{s.icon}</div>
                <div style={{textAlign:'right'}}>
                  <div style={{fontFamily:'monospace',fontSize:8,letterSpacing:'0.2em',textTransform:'uppercase',color:'#6B6B6B'}}>Value</div>
                  <div style={{fontFamily:'monospace',fontSize:12,color:'#C9A27E',fontWeight:700}}>{s.val}</div>
                </div>
              </div>
              <h3 style={{fontFamily:'var(--font-cormorant,serif)',fontSize:22,fontWeight:600,marginBottom:12}}>{s.full}</h3>
              <p style={{fontFamily:'var(--font-jost,sans-serif)',fontSize:13,color:'#6B6B6B',lineHeight:1.7,marginBottom:20}}>{s.desc}</p>
              {/* Slider */}
              <div style={{marginBottom:20}}>
                <div style={{display:'flex',justifyContent:'space-between',marginBottom:6}}>
                  <span style={{fontFamily:'monospace',fontSize:9,color:'#6B6B6B',letterSpacing:'0.15em',textTransform:'uppercase'}}>Intensity</span>
                  <span style={{fontFamily:'monospace',fontSize:9,color:'#C9A27E'}}>{s.pct}%</span>
                </div>
                <div style={{height:1,background:'#D9D5D1',position:'relative',overflow:'hidden'}}>
                  <div className="slider-fill" style={{position:'absolute',inset:0,width:`${s.pct}%`,background:'#C9A27E'}}/>
                </div>
              </div>
              {/* Tags */}
              <div style={{display:'flex',flexWrap:'wrap',gap:6,marginBottom:20}}>
                {s.tags.map(t=><span key={t} style={{fontFamily:'monospace',fontSize:9,padding:'4px 8px',border:'1px solid #D9D5D1',color:'#6B6B6B',letterSpacing:'0.1em'}}>{t}</span>)}
              </div>
              {/* Footer */}
              <div style={{display:'flex',alignItems:'flex-end',justifyContent:'space-between',paddingTop:16,borderTop:'1px solid #D9D5D1'}}>
                <div>
                  <div style={{fontFamily:'monospace',fontSize:8,letterSpacing:'0.15em',textTransform:'uppercase',color:'#6B6B6B'}}>Starting</div>
                  <div style={{fontFamily:'var(--font-cormorant,serif)',fontSize:20,fontWeight:600}}>{s.price}</div>
                </div>
                <button onClick={()=>document.querySelector('#contact')?.scrollIntoView({behavior:'smooth'})} className="focus-sq" style={{fontFamily:'monospace',fontSize:10,letterSpacing:'0.15em',textTransform:'uppercase',color:'#C9A27E',border:'1px solid rgba(201,162,126,0.4)',padding:'8px 14px',background:'transparent',cursor:'none',transition:'all 0.3s'}}
                  onMouseEnter={e=>{e.currentTarget.style.borderColor='#2E2E2E';e.currentTarget.style.color='#2E2E2E';}}
                  onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(201,162,126,0.4)';e.currentTarget.style.color='#C9A27E';}}
                >Enquire →</button>
              </div>
            </div>
          ))}
        </div>
        <div style={{marginTop:32,textAlign:'center',fontFamily:'monospace',fontSize:9,color:'#6B6B6B',letterSpacing:'0.2em',textTransform:'uppercase'}}>Custom packages available · All prices exclude travel</div>
      </div>
    </section>
  );
}
