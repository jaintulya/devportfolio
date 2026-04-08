'use client';
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap'; import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const storyBeats = [
  { icon: '🎓', year: '2nd Year BCA', title: 'The Spark', quote: 'I never thought a small interest would turn into such a big turning point in my life…', text: 'It started during my second year of BCA — a quiet interest in content creation. The beginning wasn\'t easy. I started by editing for a food blogging page and writing subtitles for YouTube videos. Small things, but they were building my foundation.' },
  { icon: '🎬', year: 'The Turning Point', title: 'Went Viral', quote: 'I made a reel for my college… and it went viral.', text: 'That one reel changed everything. Approaches started coming in. Opportunities through RJ Romil opened doors I never expected. And then — I started shooting weddings.' },
  { icon: '📸', year: '4 Years In', title: 'All In', quote: 'I even left my studies to fully pursue this… because I knew this is what I wanted to do.', text: 'At one point, I made the hardest decision — leaving my education behind to commit fully to the camera. I was scared. Constantly thinking "what if it doesn\'t work?" or "is this even secure?"' },
  { icon: '✦', year: 'Today', title: 'It Paid Off', quote: 'Today, I can say… it paid off. This is just the beginning.', text: 'Now it\'s been 4 years behind the camera. Based in Ahmedabad, working nationally and internationally. The journey wasn\'t easy — but it was worth every single frame.' },
];

export default function StorySection() {
  const secRef = useRef(null); const headRef = useRef(null); const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headRef.current, { y:50,opacity:0,duration:1,ease:'power3.out', scrollTrigger:{trigger:headRef.current,start:'top 80%'} });
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.from(card, { x: i%2===0 ? -60 : 60, opacity:0, duration:1, ease:'power3.out', scrollTrigger:{trigger:card,start:'top 80%'} });
      });
    }, secRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="story" ref={secRef} style={{padding:'120px clamp(20px,5vw,60px)',background:'#2E2E2E',overflow:'hidden'}}>
      <div style={{maxWidth:1000,margin:'0 auto'}}>
        {/* Heading */}
        <div ref={headRef} style={{marginBottom:80,textAlign:'center'}}>
          <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:14,fontFamily:'monospace',fontSize:10,letterSpacing:'0.3em',textTransform:'uppercase',color:'#C9A27E',marginBottom:20}}>
            <span style={{width:28,height:1,background:'#C9A27E',display:'block'}}/>Behind The Lens<span style={{width:28,height:1,background:'#C9A27E',display:'block'}}/>
          </div>
          <h2 style={{fontFamily:'var(--font-cormorant,serif)',fontSize:'clamp(2.8rem,5vw,4.5rem)',fontWeight:300,lineHeight:1.05,color:'#F8F5F2'}}>
            The <em style={{fontStyle:'italic',fontWeight:500}} className="gold-shimmer-text">Story</em>
          </h2>
          <p style={{fontFamily:'var(--font-jost,sans-serif)',fontSize:14,color:'rgba(248,245,242,0.45)',maxWidth:500,margin:'20px auto 0',lineHeight:1.8}}>From a college reel that went viral to 4 years of cinematic storytelling — this is how it happened.</p>
        </div>

        {/* Story beats */}
        <div style={{position:'relative'}}>
          {/* Vertical line */}
          <div style={{position:'absolute',left:'50%',top:0,bottom:0,width:1,background:'rgba(201,162,126,0.2)',transform:'translateX(-50%)'}} className="hide-mobile"/>

          <div style={{display:'flex',flexDirection:'column',gap:60}}>
            {storyBeats.map((beat, i) => (
              <div key={i} ref={el=>cardsRef.current[i]=el} style={{display:'grid',gridTemplateColumns:'1fr auto 1fr',gap:32,alignItems:'start'}} className="story-row">
                {/* Left content */}
                <div style={{gridColumn:i%2===0?'1':'3',gridRow:1,textAlign:i%2===0?'right':'left'}}>
                  {i%2===0 && <StoryCard beat={beat} align="right"/>}
                </div>
                {/* Center dot */}
                <div style={{gridColumn:2,gridRow:1,display:'flex',flexDirection:'column',alignItems:'center',gap:8,paddingTop:24}}>
                  <div style={{width:44,height:44,borderRadius:'50%',border:'1px solid rgba(201,162,126,0.4)',background:'#2E2E2E',display:'flex',alignItems:'center',justifyContent:'center',fontSize:18,zIndex:1,position:'relative'}}>{beat.icon}</div>
                  <span style={{fontFamily:'monospace',fontSize:8,letterSpacing:'0.2em',textTransform:'uppercase',color:'rgba(201,162,126,0.6)',whiteSpace:'nowrap'}}>{beat.year}</span>
                </div>
                {/* Right content */}
                <div style={{gridColumn:i%2===1?'3':'1',gridRow:1,textAlign:i%2===1?'left':'right',gridColumnStart:i%2===1?3:1}}>
                  {i%2===1 && <StoryCard beat={beat} align="left"/>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media(max-width:768px){
          .story-row{grid-template-columns:1fr!important;gap:16px!important}
          .hide-mobile{display:none!important}
        }
      `}</style>
    </section>
  );
}

function StoryCard({ beat, align }) {
  return (
    <div style={{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(201,162,126,0.15)',padding:'28px 32px',textAlign:align}}>
      <h3 style={{fontFamily:'var(--font-cormorant,serif)',fontSize:26,fontWeight:600,color:'#F8F5F2',marginBottom:12}}>{beat.title}</h3>
      <blockquote style={{fontFamily:'var(--font-cormorant,serif)',fontSize:17,fontStyle:'italic',color:'#C9A27E',lineHeight:1.6,marginBottom:16,borderLeft:align==='left'?'2px solid rgba(201,162,126,0.4)':'none',borderRight:align==='right'?'2px solid rgba(201,162,126,0.4)':'none',paddingLeft:align==='left'?16:0,paddingRight:align==='right'?16:0}}>"{beat.quote}"</blockquote>
      <p style={{fontFamily:'var(--font-jost,sans-serif)',fontSize:13,color:'rgba(248,245,242,0.5)',lineHeight:1.8}}>{beat.text}</p>
    </div>
  );
}
