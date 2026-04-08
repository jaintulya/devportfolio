'use client';
import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const CONTACTS = [
  {
    label: 'Email',
    value: 'devarsh123jain@gmail.com',
    href: 'mailto:devarsh123jain@gmail.com',
    icon: (
      <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
  },
  {
    label: 'WhatsApp',
    value: '+91 9157295844',
    href: 'https://wa.me/919157295844',
    icon: (
      <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    value: '@contentkapitara',
    href: 'https://www.instagram.com/contentkapitara',
    icon: (
      <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <rect x="2" y="2" width="20" height="20" rx="5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="12" cy="12" r="4" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor"/>
      </svg>
    ),
  },
  {
    label: 'YouTube',
    value: 'The Content Pitara',
    href: 'https://youtube.com/@the_content_pitara',
    icon: (
      <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.543 6.498C22 8.28 22 12 22 12s0 3.72-.457 5.502c-.254.985-.997 1.76-1.938 2.022C17.896 20 12 20 12 20s-5.893 0-7.605-.476c-.945-.266-1.687-1.04-1.938-2.022C2 15.72 2 12 2 12s0-3.72.457-5.502c.254-.985.997-1.76 1.938-2.022C6.107 4 12 4 12 4s5.896 0 7.605.476c.945.266 1.687 1.04 1.938 2.022z"/>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 15l5-3-5-3v6z"/>
      </svg>
    ),
  },
  {
    label: 'Location',
    value: 'Ahmedabad, Gujarat — Works Nationally & Internationally',
    href: null,
    icon: (
      <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"/>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"/>
      </svg>
    ),
  },
];

export default function ContactSection() {
  const sRef = useRef(null);
  const leftRef = useRef(null);
  const formRef = useRef(null);
  const topBladeRef = useRef(null);
  const botBladeRef = useRef(null);
  const flashRef = useRef(null);
  const [formData, setFormData] = useState({ name:'', email:'', date:'', service:'wedding', message:'' });
  const [submitted, setSubmitted] = useState(false);
  const [shuttering, setShuttering] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const lw = leftRef.current?.querySelectorAll('.cw');
      if (lw) gsap.from(lw, { y:40, opacity:0, duration:0.7, stagger:0.1, ease:'power3.out', scrollTrigger:{ trigger:leftRef.current, start:'top 82%' } });
      gsap.from(formRef.current, { y:40, opacity:0, duration:1, ease:'power3.out', delay:0.2, scrollTrigger:{ trigger:formRef.current, start:'top 82%' } });
    }, sRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    setShuttering(true);
    setTimeout(() => {
      setShuttering(false);
      setSubmitted(true);
    }, 600);
  };

  const inp = {
    width:'100%', background:'transparent',
    borderTop:'none', borderLeft:'none', borderRight:'none',
    borderBottom:'1px solid rgba(46,46,46,0.2)',
    padding:'12px 0', fontFamily:"'Jost',sans-serif", fontSize:14,
    color:'#2E2E2E', outline:'none', transition:'border-color 0.3s',
  };

  return (
    <section id="contact" ref={sRef} style={{ padding:'120px clamp(20px,5vw,48px)', background:'linear-gradient(180deg,#F3EDE6 0%,#F8F5F2 100%)', position:'relative', overflow:'hidden' }}>
      {/* Ambient */}
      <div style={{ position:'absolute', top:0, right:0, width:500, height:500, pointerEvents:'none', background:'radial-gradient(ellipse at top right,rgba(201,162,126,0.12) 0%,transparent 70%)', filter:'blur(40px)' }}/>

      <div style={{ maxWidth:1280, margin:'0 auto' }}>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(min(100%,420px),1fr))', gap:'clamp(48px,8vw,120px)', alignItems:'start' }}>

          {/* LEFT */}
          <div ref={leftRef}>
            <div className="cw" style={{ fontFamily:"'Space Mono',monospace", fontSize:10, letterSpacing:'0.3em', textTransform:'uppercase', color:'#C9A27E', marginBottom:16, display:'flex', alignItems:'center', gap:12 }}>
              <span style={{ width:28, height:1, background:'#C9A27E', display:'inline-block' }}/> Let's Create
            </div>
            <h2 className="cw" style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(40px,5.5vw,72px)', fontWeight:300, lineHeight:1.05, marginBottom:24 }}>
              Start <br/>
              <span style={{ fontStyle:'italic', fontWeight:500, color:'#C9A27E' }}>Recording</span><br/>
              Your Story.
            </h2>
            <p className="cw" style={{ fontFamily:"'Jost',sans-serif", fontSize:13, color:'#6B6B6B', lineHeight:1.8, maxWidth:340, marginBottom:40 }}>
              Every love story is unique. Let's talk about how to capture yours in a way that will be treasured for generations. Based in Ahmedabad — available to travel anywhere.
            </p>

            {/* Contact links */}
            <div style={{ display:'flex', flexDirection:'column', gap:20, marginBottom:40 }}>
              {CONTACTS.map(c => (
                <div key={c.label} className="cw">
                  {c.href ? (
                    <a href={c.href} target="_blank" rel="noopener noreferrer"
                      style={{ display:'flex', alignItems:'center', gap:16, textDecoration:'none', color:'inherit' }}
                      onMouseEnter={e=>{e.currentTarget.querySelector('.ci').style.background='#C9A27E';e.currentTarget.querySelector('.ci').style.color='#F8F5F2';e.currentTarget.querySelector('.cv').style.color='#C9A27E';}}
                      onMouseLeave={e=>{e.currentTarget.querySelector('.ci').style.background='transparent';e.currentTarget.querySelector('.ci').style.color='#C9A27E';e.currentTarget.querySelector('.cv').style.color='#2E2E2E';}}>
                      <div className="ci" style={{ width:40, height:40, border:'1px solid rgba(201,162,126,0.3)', display:'flex', alignItems:'center', justifyContent:'center', color:'#C9A27E', transition:'all 0.3s', flexShrink:0 }}>{c.icon}</div>
                      <div>
                        <div style={{ fontFamily:"'Space Mono',monospace", fontSize:8, letterSpacing:'0.2em', textTransform:'uppercase', color:'#6B6B6B' }}>{c.label}</div>
                        <div className="cv" style={{ fontFamily:"'Jost',sans-serif", fontSize:13, color:'#2E2E2E', marginTop:2, transition:'color 0.3s' }}>{c.value}</div>
                      </div>
                    </a>
                  ) : (
                    <div style={{ display:'flex', alignItems:'flex-start', gap:16 }}>
                      <div style={{ width:40, height:40, border:'1px solid rgba(201,162,126,0.3)', display:'flex', alignItems:'center', justifyContent:'center', color:'#C9A27E', flexShrink:0 }}>{c.icon}</div>
                      <div>
                        <div style={{ fontFamily:"'Space Mono',monospace", fontSize:8, letterSpacing:'0.2em', textTransform:'uppercase', color:'#6B6B6B' }}>{c.label}</div>
                        <div style={{ fontFamily:"'Jost',sans-serif", fontSize:13, color:'#2E2E2E', marginTop:2 }}>{c.value}</div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Availability badge */}
            <div className="cw" style={{ padding:20, border:'1px solid rgba(201,162,126,0.2)', position:'relative' }}>
              <div style={{ position:'absolute', top:-10, left:14, background:'#F3EDE6', padding:'0 8px' }}>
                <span style={{ fontFamily:"'Space Mono',monospace", fontSize:9, color:'#C9A27E', letterSpacing:'0.2em' }}>STATUS</span>
              </div>
              <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:6 }}>
                <span className="rec-dot" style={{ width:7, height:7, borderRadius:'50%', background:'#22c55e', flexShrink:0 }}/>
                <span style={{ fontFamily:"'Jost',sans-serif", fontSize:13, color:'#2E2E2E', fontWeight:500 }}>Available for 2025 Bookings</span>
              </div>
              <p style={{ fontFamily:"'Jost',sans-serif", fontSize:12, color:'#6B6B6B', lineHeight:1.6 }}>
                Limited slots remaining for Q3–Q4 2025. Book early to secure your date.
              </p>
            </div>
          </div>

          {/* RIGHT — FORM */}
          <div ref={formRef} style={{ position:'relative' }}>
            {/* Shutter blades */}
            <div ref={topBladeRef} style={{ position:'absolute', top:0, left:0, right:0, height:'50%', background:'#2E2E2E', zIndex:20, transformOrigin:'top center', transform: shuttering?'scaleY(1)':'scaleY(0)', transition: shuttering?'transform 0.2s ease-in':'none' }}/>
            <div ref={botBladeRef} style={{ position:'absolute', bottom:0, left:0, right:0, height:'50%', background:'#2E2E2E', zIndex:20, transformOrigin:'bottom center', transform: shuttering?'scaleY(1)':'scaleY(0)', transition: shuttering?'transform 0.2s ease-in':'none' }}/>
            <div ref={flashRef} style={{ position:'absolute', inset:0, background:'#fff', zIndex:21, opacity: shuttering?0.4:0, transition: shuttering?'opacity 0.15s':'none', pointerEvents:'none' }}/>

            {submitted ? (
              <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'80px 40px', textAlign:'center', gap:24 }}>
                <div style={{ width:72, height:72, borderRadius:'50%', border:'2px solid #C9A27E', display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="#C9A27E" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"/></svg>
                </div>
                <div>
                  <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:32, fontWeight:600, marginBottom:12 }}>Story Received ✦</h3>
                  <p style={{ fontFamily:"'Jost',sans-serif", fontSize:13, color:'#6B6B6B', lineHeight:1.7 }}>Thank you! I'll be in touch within 24 hours to begin planning your cinematic story.</p>
                </div>
                <button onClick={()=>setSubmitted(false)} style={{ fontFamily:"'Space Mono',monospace", fontSize:10, letterSpacing:'0.2em', textTransform:'uppercase', color:'#C9A27E', background:'none', border:'none', textDecoration:'underline' }}>Send another enquiry</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:28 }}>
                {/* Header */}
                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', borderBottom:'1px solid rgba(46,46,46,0.1)', paddingBottom:16 }}>
                  <span style={{ fontFamily:"'Space Mono',monospace", fontSize:10, letterSpacing:'0.2em', textTransform:'uppercase', color:'#6B6B6B' }}>New Enquiry</span>
                  <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                    <span className="rec-dot" style={{ width:6, height:6, borderRadius:'50%', background:'#ef4444', display:'inline-block' }}/>
                    <span style={{ fontFamily:"'Space Mono',monospace", fontSize:9, color:'#6B6B6B' }}>LIVE</span>
                  </div>
                </div>

                {/* Name + Email */}
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:20 }}>
                  <div>
                    <label style={{ fontFamily:"'Space Mono',monospace", fontSize:9, letterSpacing:'0.2em', textTransform:'uppercase', color:'#6B6B6B', display:'block', marginBottom:8 }}>Name</label>
                    <input style={inp} placeholder="Your name" value={formData.name} required
                      onChange={e=>setFormData({...formData,name:e.target.value})}
                      onFocus={e=>e.target.style.borderBottomColor='#C9A27E'} onBlur={e=>e.target.style.borderBottomColor='rgba(46,46,46,0.2)'}/>
                  </div>
                  <div>
                    <label style={{ fontFamily:"'Space Mono',monospace", fontSize:9, letterSpacing:'0.2em', textTransform:'uppercase', color:'#6B6B6B', display:'block', marginBottom:8 }}>Email</label>
                    <input style={inp} type="email" placeholder="your@email.com" value={formData.email} required
                      onChange={e=>setFormData({...formData,email:e.target.value})}
                      onFocus={e=>e.target.style.borderBottomColor='#C9A27E'} onBlur={e=>e.target.style.borderBottomColor='rgba(46,46,46,0.2)'}/>
                  </div>
                </div>

                {/* Date */}
                <div>
                  <label style={{ fontFamily:"'Space Mono',monospace", fontSize:9, letterSpacing:'0.2em', textTransform:'uppercase', color:'#6B6B6B', display:'block', marginBottom:8 }}>Wedding / Event Date</label>
                  <input style={inp} type="date" value={formData.date}
                    onChange={e=>setFormData({...formData,date:e.target.value})}
                    onFocus={e=>e.target.style.borderBottomColor='#C9A27E'} onBlur={e=>e.target.style.borderBottomColor='rgba(46,46,46,0.2)'}/>
                </div>

                {/* Service */}
                <div>
                  <label style={{ fontFamily:"'Space Mono',monospace", fontSize:9, letterSpacing:'0.2em', textTransform:'uppercase', color:'#6B6B6B', display:'block', marginBottom:12 }}>Service</label>
                  <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
                    {[{v:'wedding',l:'Wedding Reel'},{v:'couple',l:'Couple Story'},{v:'social',l:'Social Media'},{v:'custom',l:'Custom Package'}].map(opt=>(
                      <button key={opt.v} type="button" onClick={()=>setFormData({...formData,service:opt.v})}
                        style={{ padding:'12px 16px', border:`1px solid ${formData.service===opt.v?'#C9A27E':'rgba(46,46,46,0.2)'}`, fontFamily:"'Space Mono',monospace", fontSize:9, letterSpacing:'0.1em', textTransform:'uppercase', color: formData.service===opt.v?'#C9A27E':'#6B6B6B', background: formData.service===opt.v?'rgba(201,162,126,0.08)':'transparent', textAlign:'left', transition:'all 0.3s' }}>
                        {formData.service===opt.v?'✦ ':''}{opt.l}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label style={{ fontFamily:"'Space Mono',monospace", fontSize:9, letterSpacing:'0.2em', textTransform:'uppercase', color:'#6B6B6B', display:'block', marginBottom:8 }}>Your Story</label>
                  <textarea style={{ ...inp, resize:'none' }} rows={4} placeholder="Tell me about your love story, your vision..."
                    value={formData.message} onChange={e=>setFormData({...formData,message:e.target.value})}
                    onFocus={e=>e.target.style.borderBottomColor='#C9A27E'} onBlur={e=>e.target.style.borderBottomColor='rgba(46,46,46,0.2)'}/>
                </div>

                {/* Submit */}
                <button type="submit" className="focus-btn" style={{
                  width:'100%', padding:'20px', background:'#2E2E2E', color:'#F8F5F2',
                  border:'none', fontFamily:"'Space Mono',monospace", fontSize:'clamp(9px,1.1vw,11px)', letterSpacing:'0.2em', textTransform:'uppercase',
                  display:'flex', alignItems:'center', justifyContent:'center', gap:12, transition:'background 0.5s', position:'relative',
                }}
                  onMouseEnter={e=>e.currentTarget.style.background='#C9A27E'} onMouseLeave={e=>e.currentTarget.style.background='#2E2E2E'}>
                  <span className="rec-dot" style={{ width:6, height:6, borderRadius:'50%', background:'#ef4444', flexShrink:0 }}/>
                  Start Recording Your Story
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/></svg>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
