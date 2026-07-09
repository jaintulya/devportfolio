'use client';
import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function generateCalendarDays(year, month) {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const days = [];
  
  // Previous month days
  for (let i = 0; i < firstDay.getDay(); i++) {
    const d = new Date(year, month, -i);
    days.push({
      date: d.getDate(),
      month: month - 1,
      year,
      isCurrentMonth: false,
      isAvailable: false,
    });
  }
  
  // Current month days
  for (let i = 1; i <= lastDay.getDate(); i++) {
    const isWeekend = new Date(year, month, i).getDay() % 6 === 0;
    days.push({
      date: i,
      month,
      year,
      isCurrentMonth: true,
      isAvailable: Math.random() > 0.3,
      isBooked: Math.random() > 0.7,
    });
  }
  
  // Next month days
  const remaining = 42 - days.length;
  for (let i = 1; i <= remaining; i++) {
    days.push({
      date: i,
      month: month + 1,
      year,
      isCurrentMonth: false,
      isAvailable: false,
    });
  }
  
  return days;
}

export default function AvailabilityCalendar() {
  const secRef = useRef(null);
  const headRef = useRef(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  
  const monthName = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  const days = generateCalendarDays(year, month);

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headRef.current,
          start: 'top 80%',
        },
      });

      gsap.from('.calendar-cell', {
        y: 20,
        opacity: 0,
        duration: 0.5,
        ease: 'power2.out',
        stagger: 0.02,
        scrollTrigger: {
          trigger: '.calendar-grid',
          start: 'top 90%',
        },
      });
    }, secRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="availability"
      ref={secRef}
      style={{
        padding: '120px 24px',
        background: '#fff',
      }}
    >
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div
          ref={headRef}
          style={{ textAlign: 'center', marginBottom: 50 }}
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
              marginBottom: 16,
            }}
          >
            <span style={{ width: 28, height: 1, background: '#C9A27E', display: 'block' }} />
            Availability
            <span style={{ width: 28, height: 1, background: '#C9A27E', display: 'block' }} />
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-cormorant,serif)',
              fontSize: 'clamp(36px, 6vw, 64px)',
              fontWeight: 300,
              lineHeight: 1.1,
              color: '#2E2E2E',
              marginBottom: 12,
            }}
          >
            Let's Pick a Date
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-jost, sans-serif)',
              fontSize: 16,
              color: '#6B6B6B',
              maxWidth: 500,
              margin: '0 auto',
            }}
          >
            Check my availability for your special day!
          </p>
        </div>

        <div
          style={{
            background: '#F8F5F2',
            borderRadius: 16,
            padding: 40,
            boxShadow: '0 20px 60px rgba(0,0,0,0.05)',
          }}
        >
          {/* Calendar Header */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 30,
            }}
          >
            <button
              onClick={prevMonth}
              className="focus-sq"
              style={{
                width: 40,
                height: 40,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid rgba(46,46,46,0.1)',
                borderRadius: 8,
                background: 'transparent',
                cursor: 'none',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#C9A27E';
                e.currentTarget.style.background = '#C9A27E';
                e.currentTarget.style.color = '#fff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(46,46,46,0.1)';
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#2E2E2E';
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <h3
              style={{
                fontFamily: 'var(--font-cormorant,serif)',
                fontSize: 24,
                fontWeight: 600,
                color: '#2E2E2E',
              }}
            >
              {monthName}
            </h3>
            <button
              onClick={nextMonth}
              className="focus-sq"
              style={{
                width: 40,
                height: 40,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid rgba(46,46,46,0.1)',
                borderRadius: 8,
                background: 'transparent',
                cursor: 'none',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#C9A27E';
                e.currentTarget.style.background = '#C9A27E';
                e.currentTarget.style.color = '#fff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(46,46,46,0.1)';
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#2E2E2E';
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M9 6l6 6-6 6" />
              </svg>
            </button>
          </div>

          {/* Days of week */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(7, 1fr)',
              gap: 8,
              marginBottom: 16,
            }}
          >
            {DAYS.map((day) => (
              <div
                key={day}
                style={{
                  textAlign: 'center',
                  fontFamily: 'monospace',
                  fontSize: 10,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: '#6B6B6B',
                  padding: '8px 0',
                }}
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div
            className="calendar-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(7, 1fr)',
              gap: 8,
            }}
          >
            {days.map((day, index) => (
              <div
                key={index}
                className="calendar-cell"
                style={{
                  aspectRatio: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 10,
                  fontSize: 14,
                  fontFamily: 'var(--font-jost, sans-serif)',
                  color: day.isCurrentMonth ? (day.isBooked ? 'rgba(46,46,46,0.3)' : '#2E2E2E') : 'rgba(46,46,46,0.2)',
                  background: day.isCurrentMonth ? (day.isBooked ? 'rgba(239,68,68,0.05)' : (day.isAvailable ? 'rgba(201,162,126,0.08)' : 'transparent')) : 'transparent',
                  border: day.isAvailable ? '1px solid rgba(201,162,126,0.3)' : (day.isBooked ? '1px solid rgba(239,68,68,0.2)' : '1px solid transparent'),
                  cursor: day.isAvailable ? 'none' : 'default',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  if (day.isAvailable) {
                    e.currentTarget.style.background = '#C9A27E';
                    e.currentTarget.style.color = '#fff';
                  }
                }}
                onMouseLeave={(e) => {
                  if (day.isAvailable) {
                    e.currentTarget.style.background = 'rgba(201,162,126,0.08)';
                    e.currentTarget.style.color = '#2E2E2E';
                  }
                }}
                onClick={() => {
                  if (day.isAvailable) {
                    document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                {day.date}
              </div>
            ))}
          </div>

          {/* Legend */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: 40,
              marginTop: 40,
              flexWrap: 'wrap',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 16, height: 16, background: 'rgba(201,162,126,0.2)', border: '1px solid rgba(201,162,126,0.5)', borderRadius: 4 }} />
              <span
                style={{
                  fontFamily: 'var(--font-jost, sans-serif)',
                  fontSize: 13,
                  color: '#6B6B6B',
                }}
              >
                Available
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 16, height: 16, background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 4 }} />
              <span
                style={{
                  fontFamily: 'var(--font-jost, sans-serif)',
                  fontSize: 13,
                  color: '#6B6B6B',
                }}
              >
                Booked
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
