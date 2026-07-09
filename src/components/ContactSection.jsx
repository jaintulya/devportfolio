'use client';
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const secRef = useRef(null);
  const headRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headRef.current, {
        y: 50,
        opacity: 1,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headRef.current,
          start: 'top 85%'
        }
      });

      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        gsap.from(card, {
          y: 40,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          delay: index * 0.15,
          scrollTrigger: {
            trigger: card,
            start: 'top 90%'
          }
        });
      });
    }, secRef);
    return () => ctx.revert();
  }, []);

  const contactMethods = [
    {
      title: "Direct WhatsApp",
      description: "Chat with Devarsh directly for instant feedback on availability and custom wedding coverage.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
      ),
      ctaText: "Start Chat",
      link: "https://wa.me/911234567890?text=Hi%20Devarsh,%20I'd%20love%20to%20inquire%20about%20your%20wedding%20filming%20packages%20and%20availability!",
      primary: true
    },
    {
      title: "Direct Call",
      description: "Prefer to talk? Reach us directly to discuss your wedding schedule, venues, and filming expectations.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      ),
      ctaText: "+91 12345 67890",
      link: "tel:+911234567890",
      primary: false
    },
    {
      title: "Direct Email",
      description: "For wedding planners, custom briefs, or detailed agency proposals, email us your requirements.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      ),
      ctaText: "hello@devarshjain.com",
      link: "mailto:hello@devarshjain.com",
      primary: false
    },
    {
      title: "Instagram DM",
      description: "Follow our daily behind-the-scenes posts, client testimonials, and latest cinematic wedding reels.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="18" cy="6" r="1" />
        </svg>
      ),
      ctaText: "@contentkapitara",
      link: "https://instagram.com/contentkapitara",
      primary: false
    }
  ];

  return (
    <section
      id="contact"
      ref={secRef}
      style={{
        padding: '120px 24px',
        background: '#F8F5F2',
        position: 'relative'
      }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        {/* Header */}
        <div
          ref={headRef}
          style={{
            textAlign: 'center',
            marginBottom: 70
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 12,
              fontFamily: 'monospace',
              fontSize: 10,
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: '#C9A27E',
              marginBottom: 16
            }}
          >
            <span style={{ width: 28, height: 1, background: '#C9A27E', display: 'block' }} />
            Let's Connect
            <span style={{ width: 28, height: 1, background: '#C9A27E', display: 'block' }} />
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-cormorant,serif)',
              fontSize: 'clamp(36px, 6vw, 64px)',
              fontWeight: 300,
              lineHeight: 1.1,
              color: '#2E2E2E',
              marginBottom: 20
            }}
          >
            Co-create Your Story
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-jost, sans-serif)',
              fontSize: 16,
              color: '#6B6B6B',
              maxWidth: 600,
              margin: '0 auto',
              lineHeight: 1.8
            }}
          >
            We limit our calendar to just 15 weddings a year to ensure every film receives our signature cinematic attention. Get in touch directly to discuss your date.
          </p>
        </div>

        {/* Contact Board Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 28,
            marginBottom: 60
          }}
        >
          {contactMethods.map((method, index) => (
            <div
              key={index}
              ref={el => cardsRef.current[index] = el}
              className="focus-sq"
              style={{
                background: '#fff',
                borderRadius: 16,
                border: method.primary ? '1px solid #C9A27E' : '1px solid #D9D5D1',
                padding: '36px 28px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: method.primary ? '0 20px 40px rgba(201,162,126,0.1)' : '0 10px 30px rgba(0,0,0,0.02)',
                transition: 'all 0.4s ease'
              }}
            >
              <div>
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: '50%',
                    background: method.primary ? '#C9A27E' : '#F8F5F2',
                    color: method.primary ? '#fff' : '#C9A27E',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 24,
                    transition: 'all 0.3s ease'
                  }}
                >
                  {method.icon}
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-cormorant,serif)',
                    fontSize: 24,
                    fontWeight: 600,
                    color: '#2E2E2E',
                    marginBottom: 12
                  }}
                >
                  {method.title}
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-jost, sans-serif)',
                    fontSize: 14,
                    color: '#6B6B6B',
                    lineHeight: 1.6,
                    marginBottom: 28
                  }}
                >
                  {method.description}
                </p>
              </div>

              <a
                href={method.link}
                target={method.link.startsWith('http') ? '_blank' : '_self'}
                rel="noopener noreferrer"
                style={{
                  width: '100%',
                  padding: '14px 20px',
                  background: method.primary ? '#C9A27E' : 'transparent',
                  color: method.primary ? '#fff' : '#C9A27E',
                  border: '1px solid #C9A27E',
                  borderRadius: 8,
                  fontFamily: 'monospace',
                  fontSize: 10,
                  fontWeight: 600,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  textAlign: 'center',
                  display: 'block',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#A8825A';
                  e.currentTarget.style.borderColor = '#A8825A';
                  e.currentTarget.style.color = '#fff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = method.primary ? '#C9A27E' : 'transparent';
                  e.currentTarget.style.borderColor = '#C9A27E';
                  e.currentTarget.style.color = method.primary ? '#fff' : '#C9A27E';
                }}
              >
                {method.ctaText}
              </a>
            </div>
          ))}
        </div>

        {/* Live Availability Banner */}
        <div
          style={{
            background: '#2E2E2E',
            borderRadius: 16,
            padding: '30px 40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 24,
            flexWrap: 'wrap',
            boxShadow: '0 20px 40px rgba(0,0,0,0.05)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <span
              className="rec-dot"
              style={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                background: '#22c55e',
                flexShrink: 0,
                boxShadow: '0 0 12px #22c55e'
              }}
            />
            <div style={{ color: '#F8F5F2' }}>
              <span
                style={{
                  fontFamily: 'monospace',
                  fontSize: 9,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: '#C9A27E',
                  display: 'block',
                  marginBottom: 4
                }}
              >
                Booking Calendar Status
              </span>
              <p
                style={{
                  fontFamily: 'var(--font-cormorant,serif)',
                  fontSize: 18,
                  fontWeight: 400,
                  margin: 0
                }}
              >
                Currently accepting booking inquiries for Autumn & Winter weddings.
              </p>
            </div>
          </div>
          <div
            style={{
              fontFamily: 'monospace',
              fontSize: 12,
              color: '#F8F5F2',
              letterSpacing: '0.1em',
              borderLeft: '1px solid rgba(248,245,242,0.15)',
              paddingLeft: 24
            }}
          >
            Slots Remaining: <strong style={{ color: '#C9A27E', fontSize: 16 }}>3</strong>
          </div>
        </div>
      </div>
    </section>
  );
}
