'use client';
import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    id: 1,
    name: 'Priya & Arjun',
    location: 'Udaipur, Rajasthan',
    quote: 'Devarsh captured our wedding day in the most magical way possible. Every time we watch the reels, we\'re transported back to those exact moments. His attention to detail and ability to capture emotions is extraordinary.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=400&fit=crop'
  },
  {
    id: 2,
    name: 'Sofia & Marco',
    location: 'Tuscany, Italy',
    quote: 'We couldn\'t be happier with the films Devarsh created for us. He was professional, friendly, and made everyone feel comfortable in front of the camera. The final product was beyond our expectations.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400&h=400&fit=crop'
  },
  {
    id: 3,
    name: 'Aisha & James',
    location: 'Goa, India',
    quote: 'Devarsh\'s work speaks for itself. Our wedding reels have received so many compliments from friends and family. He truly understands how to tell a story through his videos.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400&h=400&fit=crop'
  }
];

export default function TestimonialsSection() {
  const secRef = useRef(null);
  const headRef = useRef(null);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headRef.current, {
        y: 50,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headRef.current,
          start: 'top 80%'
        }
      });
    }, secRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const testimonial = testimonials[current];

  return (
    <section
      id="testimonials"
      ref={secRef}
      style={{
        padding: '120px 24px',
        background: '#080706'
      }}
    >
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
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
            Love Stories
            <span style={{ width: 28, height: 1, background: '#C9A27E', display: 'block' }} />
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-cormorant,serif)',
              fontSize: 'clamp(36px, 6vw, 64px)',
              fontWeight: 300,
              lineHeight: 1.1,
              color: '#F8F5F2'
            }}
          >
            What Our Couples Say
          </h2>
        </div>

        <div
          style={{
            background: '#121110',
            borderRadius: 16,
            padding: '60px',
            border: '1px solid rgba(201,162,126,0.2)',
            position: 'relative'
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 40,
              left: 60,
              fontSize: 80,
              fontFamily: 'var(--font-cormorant,serif)',
              color: '#C9A27E',
              lineHeight: 1,
              opacity: 0.3
            }}
          >
            “
          </div>
          
          <div style={{ paddingLeft: 60, position: 'relative', zIndex: 1 }}>
            <p
              style={{
                fontFamily: 'var(--font-cormorant,serif)',
                fontSize: 'clamp(18px, 3vw, 28px)',
                color: '#F8F5F2',
                lineHeight: 1.6,
                marginBottom: 40,
                fontStyle: 'italic'
              }}
            >
              {testimonial.quote}
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
              <img
                src={testimonial.image}
                alt={testimonial.name}
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '2px solid #C9A27E'
                }}
              />
              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-cormorant,serif)',
                    fontSize: 20,
                    fontWeight: 600,
                    color: '#F8F5F2'
                  }}
                >
                  {testimonial.name}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-jost, sans-serif)',
                    fontSize: 12,
                    color: 'rgba(248,245,242,0.6)'
                  }}
                >
                  {testimonial.location}
                </div>
              </div>
            </div>

            <div style={{ marginTop: 40, display: 'flex', gap: 8 }}>
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrent(idx)}
                  style={{
                    width: idx === current ? 32 : 8,
                    height: 8,
                    borderRadius: 4,
                    background: idx === current ? '#C9A27E' : 'rgba(248,245,242,0.2)',
                    border: 'none',
                    cursor: 'none',
                    transition: 'all 0.3s ease'
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
