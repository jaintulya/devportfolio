'use client';
import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap'; 
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Observer } from 'gsap/Observer';
gsap.registerPlugin(ScrollTrigger, Observer);

const storyBeats = [
  { icon: '🎓', year: '2nd Year BCA', title: 'The Spark', quote: 'I never thought a small interest would turn into such a big turning point in my life…', text: 'It started during my second year of BCA — a quiet interest in content creation. The beginning wasn\'t easy. I started by editing for a food blogging page and writing subtitles for YouTube videos. Small things, but they were building my foundation.' },
  { icon: '🎬', year: 'The Turning Point', title: 'Went Viral', quote: 'I made a reel for my college… and it went viral.', text: 'That one reel changed everything. Approaches started coming in. Opportunities through RJ Romil opened doors I never expected. And then — I started shooting weddings.' },
  { icon: '📸', year: '4 Years In', title: 'All In', quote: 'I even left my studies to fully pursue this… because I knew this is what I wanted to do.', text: 'At one point, I made the hardest decision — leaving my education behind to commit fully to the camera. I was scared. Constantly thinking "what if it doesn\'t work?" or "is this even secure?"' },
  { icon: '✦', year: 'Today', title: 'It Paid Off', quote: 'Today, I can say… it paid off. This is just the beginning.', text: 'Now it\'s been 4 years behind the camera. Based in Ahmedabad, working nationally and internationally. The journey wasn\'t easy — but it was worth every single frame.' },
];

export default function StorySection() {
  const [isMobile, setIsMobile] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const secRef = useRef(null);
  const headRef = useRef(null);
  const cardsRef = useRef([]);
  const stackRef = useRef(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check(); window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headRef.current, { y:50,opacity:1,duration:1,ease:'power3.out', scrollTrigger:{trigger:headRef.current,start:'top 80%'} });
      
      if (!isMobile) {
        cardsRef.current.forEach((card, i) => {
          if (!card) return;
          gsap.from(card, { x: i%2===0 ? -60 : 60, opacity:1, duration:1, ease:'power3.out', scrollTrigger:{trigger:card,start:'top 80%'} });
        });
      } else {
        Observer.create({
          target: stackRef.current,
          type: "touch,pointer",
          onLeft: () => setActiveIndex(prev => Math.min(prev + 1, storyBeats.length - 1)),
          onRight: () => setActiveIndex(prev => Math.max(prev - 1, 0)),
          tolerance: 50,
          preventDefault: true
        });
      }
    }, secRef);
    return () => ctx.revert();
  }, [isMobile]);

  return (
    <section id="story" ref={secRef} className="relative py-20 md:py-32 px-6 md:px-12 bg-[#2E2E2E] overflow-hidden">
      <div id="about" className="absolute top-0 left-0 w-0 h-0" style={{ pointerEvents: 'none' }} />
      <div className="max-w-[1000px] mx-auto">
        <div ref={headRef} className="mb-16 md:mb-20 text-center">
          <div className="flex items-center justify-center gap-3.5 font-mono text-[10px] tracking-[0.3em] uppercase text-[#C9A27E] mb-5">
            <span className="w-7 h-[1px] bg-[#C9A27E] block"/>Behind The Lens<span className="w-7 h-[1px] bg-[#C9A27E] block"/>
          </div>
          <h2 className="font-display text-[2.8rem] sm:text-[3.5rem] md:text-[4.5rem] font-light leading-[1.05] text-[#F8F5F2]">
            The <em className="italic font-medium gold-shimmer-text">Story</em>
          </h2>
          <p className="font-body text-sm text-[rgba(248,245,242,0.45)] max-w-[500px] mx-auto mt-5 leading-[1.8]">From a college reel that went viral to 4 years of cinematic storytelling — this is how it happened.</p>
        </div>

        {isMobile ? (
          <div className="relative h-[480px] w-full" ref={stackRef}>
            <div className="absolute inset-x-0 bottom-[-40px] text-center">
              <p className="font-mono text-[9px] tracking-[0.2em] uppercase text-[#C9A27E] animate-pulse">Swipe to navigate your story</p>
              <div className="flex justify-center gap-2 mt-4">
                {storyBeats.map((_, i) => (
                  <div key={i} className={`h-1 rounded-full transition-all duration-300 ${i === activeIndex ? 'w-6 bg-[#C9A27E]' : 'w-2 bg-[#C9A27E40]'}`} />
                ))}
              </div>
            </div>
            {storyBeats.map((beat, i) => (
              <div key={i} 
                className="absolute inset-0 transition-all duration-500 ease-out"
                style={{ 
                  zIndex: storyBeats.length - i,
                  opacity: i === activeIndex ? 1 : 0,
                  transform: i === activeIndex 
                    ? 'translateX(0) scale(1) rotate(0deg)' 
                    : i < activeIndex 
                      ? 'translateX(-100%) scale(0.9) rotate(-10deg)' 
                      : `translateX(${12 * (i - activeIndex)}px) translateY(${8 * (i - activeIndex)}px) scale(${1 - (i - activeIndex) * 0.05})`,
                  pointerEvents: i === activeIndex ? 'auto' : 'none'
                }}
              >
                <StoryCard beat={beat} align="left" isMobile />
              </div>
            ))}
          </div>
        ) : (
          <div className="relative w-full">
            <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-[rgba(201,162,126,0.2)] -translate-x-1/2" />
            <div className="flex flex-col gap-[60px] w-full">
              {storyBeats.map((beat, i) => (
                <div key={i} ref={el=>cardsRef.current[i]=el} className="grid grid-cols-[1fr_110px_1fr] gap-0 items-start w-full">
                  <div className={`min-w-0 ${i%2===0 ? 'col-start-1 text-right' : 'col-start-3 text-left'}`}>
                    {i%2===0 ? <StoryCard beat={beat} align="right"/> : <StoryCard beat={beat} align="left"/>}
                  </div>
                  <div className="col-start-2 flex flex-col items-center gap-2 pt-6">
                    <div className="w-11 h-11 rounded-full border border-[rgba(201,162,126,0.4)] bg-[#2E2E2E] flex items-center justify-center text-lg z-[1] relative">{beat.icon}</div>
                    <span className="font-mono text-[8px] tracking-[0.2em] uppercase text-[rgba(201,162,126,0.6)] whitespace-nowrap">{beat.year}</span>
                  </div>
                  <div className={`min-w-0 ${i%2===0 ? 'col-start-3' : 'col-start-1'}`} />
                </div>
              ))}
            </div>
          </div>
        )}
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

function StoryCard({ beat, align, isMobile }) {
  return (
    <div className={`border border-[rgba(201,162,126,0.15)] p-7 md:p-8 ${align === 'right' ? 'text-right' : 'text-left'} h-full flex flex-col justify-center shadow-2xl ${isMobile ? 'bg-[#2E2E2E]' : 'bg-[rgba(255,255,255,0.04)]'}`}>
      {isMobile && (
        <div className="flex items-center gap-3 mb-6 font-mono text-[9px] tracking-[0.3em] uppercase text-[#C9A27E]">
          <span className="w-5 h-[1px] bg-[#C9A27E] block" /> {beat.year}
        </div>
      )}
      <h3 className="font-display text-2xl md:text-[26px] font-semibold text-[#F8F5F2] mb-3">{beat.title}</h3>
      <blockquote className={`font-display text-lg italic text-[#C9A27E] leading-relaxed mb-4 ${align==='left' ? 'border-l-2 border-[rgba(201,162,126,0.4)] pl-4' : 'border-r-2 border-[rgba(201,162,126,0.4)] pr-4'} `}>
        "{beat.quote}"
      </blockquote>
      <p className="font-body text-[13px] text-[rgba(248,245,242,0.5)] leading-relaxed">{beat.text}</p>
    </div>
  );
}
