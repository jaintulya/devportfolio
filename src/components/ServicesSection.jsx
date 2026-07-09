'use client';
import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const packages = [
  {
    id: 'intimate',
    name: 'Intimate Moments',
    description: 'Perfect for small gatherings and elopements',
    price: '₹45,000',
    features: [
      '4 hours coverage',
      '1 cinematic wedding reel',
      '20 highlight photos',
      '2-day delivery',
      'Online gallery'
    ],
    popular: false,
    color: '#C9A27E'
  },
  {
    id: 'premium',
    name: 'Premium Day',
    description: 'Our most popular package for complete wedding day coverage',
    price: '₹85,000',
    features: [
      '8 hours coverage',
      '2 cinematic wedding reels',
      '1 couple story film',
      '50 highlight photos',
      '5-day delivery',
      'Drone footage',
      'Online gallery + digital album'
    ],
    popular: true,
    color: '#A8825A'
  },
  {
    id: 'signature',
    name: 'Signature Story',
    description: 'Complete wedding weekend coverage with full cinematic storytelling',
    price: '₹1,50,000',
    features: [
      '2 days full coverage',
      '3 cinematic wedding reels',
      '1 couple story film',
      'Pre-wedding shoot',
      '100 highlight photos',
      '7-day delivery',
      'Drone footage',
      'Online gallery + digital album',
      'Highlight trailer for social media'
    ],
    popular: false,
    color: '#E8CBAA'
  }
];

function PackageCard({ pkg, index }) {
  const [expanded, setExpanded] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    gsap.from(cardRef.current, {
      y: 60,
      opacity: 1,
      duration: 0.9,
      ease: 'power3.out',
      delay: index * 0.15,
      scrollTrigger: {
        trigger: cardRef.current,
        start: 'top 80%'
      }
    });
  }, [index]);

  return (
    <div
      ref={cardRef}
      style={{
        background: '#fff',
        borderRadius: 16,
        border: pkg.popular ? `2px solid ${pkg.color}` : '1px solid #D9D5D1',
        padding: 32,
        position: 'relative',
        transition: 'all 0.4s ease',
        boxShadow: pkg.popular ? '0 20px 60px rgba(201,162,126,0.15)' : 'none'
      }}
      onMouseEnter={(e) => {
        if (!pkg.popular) {
          e.currentTarget.style.borderColor = 'rgba(201,162,126,0.5)';
          e.currentTarget.style.boxShadow = '0 10px 40px rgba(0,0,0,0.05)';
        }
      }}
      onMouseLeave={(e) => {
        if (!pkg.popular) {
          e.currentTarget.style.borderColor = '#D9D5D1';
          e.currentTarget.style.boxShadow = 'none';
        }
      }}
    >
      {pkg.popular && (
        <div
          style={{
            position: 'absolute',
            top: -14,
            left: '50%',
            transform: 'translateX(-50%)',
            background: pkg.color,
            color: '#fff',
            padding: '6px 20px',
            borderRadius: 20,
            fontFamily: 'monospace',
            fontSize: 10,
            letterSpacing: '0.2em',
            textTransform: 'uppercase'
          }}
        >
          Most Popular
        </div>
      )}

      <div style={{ marginBottom: 24 }}>
        <div
          style={{
            fontFamily: 'monospace',
            fontSize: 10,
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: pkg.color,
            marginBottom: 8
          }}
        >
          Experience
        </div>
        <h3
          style={{
            fontFamily: 'var(--font-cormorant,serif)',
            fontSize: 28,
            fontWeight: 600,
            color: '#2E2E2E',
            marginBottom: 8
          }}
        >
          {pkg.name}
        </h3>
        <p
          style={{
            fontFamily: 'var(--font-jost, sans-serif)',
            fontSize: 14,
            color: '#6B6B6B',
            lineHeight: 1.6
          }}
        >
          {pkg.description}
        </p>
      </div>

      <div style={{ marginBottom: 28 }}>
        <div
          style={{
            fontFamily: 'monospace',
            fontSize: 10,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: '#6B6B6B',
            marginBottom: 4
          }}
        >
          Investment
        </div>
        <div
          style={{
            fontFamily: 'var(--font-cormorant,serif)',
            fontSize: 36,
            fontWeight: 600,
            color: '#2E2E2E'
          }}
        >
          {pkg.price}
        </div>
      </div>

      <div style={{ marginBottom: 28 }}>
        <div
          style={{
            fontFamily: 'monospace',
            fontSize: 10,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#6B6B6B',
            marginBottom: 16
          }}
        >
          What's Included
        </div>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {pkg.features.map((feature, idx) => (
            <li
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 12,
                marginBottom: 10,
                fontFamily: 'var(--font-jost, sans-serif)',
                fontSize: 14,
                color: '#2E2E2E'
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke={pkg.color}
                strokeWidth="1.5"
                style={{ flexShrink: 0, marginTop: 2 }}
              >
                <path d="M20 6L9 17l-5-5" />
              </svg>
              {feature}
            </li>
          ))}
        </ul>
      </div>

      <button
        onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
        className="focus-sq"
        style={{
          width: '100%',
          padding: '16px 28px',
          border: pkg.popular ? 'none' : `1px solid ${pkg.color}`,
          background: pkg.popular ? pkg.color : 'transparent',
          color: pkg.popular ? '#fff' : pkg.color,
          fontFamily: 'monospace',
          fontSize: 10,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          borderRadius: 8,
          cursor: 'none',
          transition: 'all 0.3s ease'
        }}
        onMouseEnter={(e) => {
          if (!pkg.popular) {
            e.currentTarget.style.background = pkg.color;
            e.currentTarget.style.color = '#fff';
          }
        }}
        onMouseLeave={(e) => {
          if (!pkg.popular) {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = pkg.color;
          }
        }}
      >
        Book This Experience
      </button>
    </div>
  );
}

export default function ServicesSection() {
  const secRef = useRef(null);
  const headRef = useRef(null);

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

  return (
    <section
      id="services"
      ref={secRef}
      style={{
        padding: '120px 24px',
        background: '#F8F5F2',
        position: 'relative'
      }}
    >
      <div id="packages" style={{ position: 'absolute', top: 0, left: 0, width: 0, height: 0, pointerEvents: 'none' }} />
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto'
        }}
      >
        <div
          ref={headRef}
          style={{
            textAlign: 'center',
            marginBottom: 80
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
            Choose Your Experience
            <span style={{ width: 28, height: 1, background: '#C9A27E', display: 'block' }} />
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-cormorant,serif)',
              fontSize: 'clamp(36px, 6vw, 64px)',
              fontWeight: 300,
              lineHeight: 1.1,
              color: '#2E2E2E',
              marginBottom: 16
            }}
          >
            Capture Your Perfect<br />
            <span
              className="gold-shimmer-text"
              style={{
                fontStyle: 'italic',
                fontWeight: 500
              }}
            >
              Wedding Story
            </span>
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-jost, sans-serif)',
              fontSize: 16,
              color: '#6B6B6B',
              maxWidth: 500,
              margin: '0 auto',
              lineHeight: 1.7
            }}
          >
            Every love story is unique. Choose the experience that speaks to your heart.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 32
          }}
          className="services-grid"
        >
          {packages.map((pkg, index) => (
            <PackageCard key={pkg.id} pkg={pkg} index={index} />
          ))}
        </div>

        <div
          style={{
            marginTop: 60,
            textAlign: 'center',
            paddingTop: 40,
            borderTop: '1px solid rgba(46,46,46,0.08)'
          }}
        >
          <p
            style={{
              fontFamily: 'monospace',
              fontSize: 10,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#6B6B6B'
            }}
          >
            Custom packages available upon request • All prices exclude travel
          </p>
        </div>
      </div>
    </section>
  );
}
