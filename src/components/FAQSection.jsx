"use client";
import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    question: "How far in advance should we book our wedding dates?",
    answer:
      "Reach out as soon as your dates are confirmed. While we don&apos;t enforce artificial booking windows, early conversations help us understand your vision and ensure we can craft the story your wedding deserves.",
  },
  {
    question: "Do you travel outside Ahmedabad for destination weddings?",
    answer:
      "Yes, absolutely. While Ahmedabad is our creative home base, we frequently shoot celebrations across Udaipur, Jaipur, Goa, Mumbai, and internationally. Travel and accommodation are handled transparently.",
  },
  {
    question: "When do we receive our wedding reels and clips?",
    answer:
      "Your first cinematic teaser and highlight reels are delivered within 24 to 48 hours while the celebration energy is still electric. Complete curated reels and organized archives of all footage are finalized within 5 to 7 days.",
  },
  {
    question: "How do you coordinate with our main photo and video team?",
    answer:
      "Seamlessly and respectfully. We specialize in agile, mobile-first wedding content creation — capturing unscripted behind-the-scenes intimacies and cinematic micro-moments. We coordinate with your primary photographers ahead of time.",
  },
  {
    question: "Can we curate our music choices and aesthetic preferences?",
    answer:
      "Absolutely. Before the wedding, we conduct a pre-event creative session to map your aesthetic preferences — whether vintage Bollywood, soulful classical, or modern acoustic — ensuring your films reflect your authentic vibe.",
  },
];

function FAQItem({ faq, index }) {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef(null);
  const itemRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(itemRef.current, {
        y: 24, opacity: 0, duration: 0.6, ease: "power2.out",
        delay: index * 0.06,
        scrollTrigger: { trigger: itemRef.current, start: "top 88%" },
      });
    });
    return () => ctx.revert();
  }, [index]);

  return (
    <article
      ref={itemRef}
      style={{
        borderBottom: "1px solid rgba(94, 24, 28, 0.1)",
        borderLeft: isOpen ? "3px solid var(--brand-gold)" : "3px solid transparent",
        padding: "24px 20px",
        background: isOpen ? "rgba(94, 24, 28, 0.03)" : "transparent",
        borderRadius: "0 8px 8px 0",
        transition: "all 0.35s ease",
      }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 16,
          background: "none",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
          padding: 0,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-display, serif)",
            fontSize: "clamp(17px, 2.2vw, 22px)",
            fontWeight: 500,
            color: isOpen ? "var(--brand-maroon)" : "var(--brand-maroon-dark)",
            transition: "color 0.3s ease",
            lineHeight: 1.3,
          }}
        >
          {faq.question}
        </span>
        <div
          style={{
            width: 34, height: 34, minWidth: 34,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: isOpen ? "1px solid var(--brand-gold)" : "1px solid rgba(94, 24, 28, 0.18)",
            background: isOpen ? "var(--brand-gold)" : "transparent",
            borderRadius: "50%",
            transition: "all 0.3s ease",
            transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
          }}
        >
          <svg
            width="14" height="14" viewBox="0 0 24 24"
            fill="none"
            stroke={isOpen ? "var(--brand-cream)" : "var(--brand-maroon)"}
            strokeWidth="2" strokeLinecap="round"
          >
            <path d="M12 5v14M5 12h14" />
          </svg>
        </div>
      </button>
      <div
        ref={contentRef}
        style={{
          maxHeight: isOpen ? 400 : 0,
          opacity: isOpen ? 1 : 0,
          overflow: "hidden",
          transition: "max-height 0.45s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.35s ease",
        }}
      >
        <p
          style={{
            marginTop: 16,
            fontFamily: "var(--font-body)",
            fontSize: 15,
            color: "#4A3F3F",
            lineHeight: 1.8,
            paddingRight: 16,
            maxWidth: 640,
          }}
        >
          {faq.answer}
        </p>
      </div>
    </article>
  );
}

export default function FAQSection() {
  const secRef = useRef(null);
  const headRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headRef.current, {
        y: 40, opacity: 0, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: headRef.current, start: "top 82%" },
      });
    }, secRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="faq"
      ref={secRef}
      style={{
        padding: "clamp(80px, 10vw, 140px) clamp(16px, 4vw, 48px)",
        background: "var(--brand-off-white)",
        position: "relative",
      }}
    >
      {/* Subtle dot texture */}
      <div aria-hidden="true" style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: `radial-gradient(rgba(94, 24, 28, 0.03) 1px, transparent 1px)`,
        backgroundSize: "28px 28px",
      }} />

      <div style={{ maxWidth: 840, margin: "0 auto", position: "relative", zIndex: 2 }}>
        <header
          ref={headRef}
          style={{
            textAlign: "center",
            marginBottom: 64,
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "var(--brand-maroon)",
              marginBottom: 16,
            }}
          >
            <span style={{ width: 28, height: 1, background: "var(--brand-maroon)", display: "block" }} />
            Need Clarity?
            <span style={{ width: 28, height: 1, background: "var(--brand-maroon)", display: "block" }} />
          </div>
          <h2
            style={{
              fontFamily: "var(--font-display, serif)",
              fontSize: "clamp(34px, 5.5vw, 56px)",
              fontWeight: 300,
              lineHeight: 1.15,
              color: "var(--brand-maroon-dark)",
              letterSpacing: "-0.01em",
            }}
          >
            Frequently Asked Questions
          </h2>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 16,
              color: "rgba(58,13,16,0.5)",
              marginTop: 12,
              maxWidth: 500,
              margin: "12px auto 0",
              lineHeight: 1.7,
            }}
          >
            Everything you need to know about our workflow, coverage, and how we tell your story.
          </p>
        </header>

        <div style={{ display: "flex", flexDirection: "column" }}>
          {faqs.map((faq, index) => (
            <FAQItem key={index} faq={faq} index={index} />
          ))}
        </div>

        <footer style={{ marginTop: 56, textAlign: "center" }}>
          <p style={{
            fontFamily: "var(--font-body)",
            fontSize: 15,
            color: "var(--brand-maroon-dark)",
            lineHeight: 1.75,
            marginBottom: 20,
          }}>
            Have a custom requirement or specific dates in mind?
          </p>
          <a
            href="#contact"
            style={{
              display: "inline-block",
              padding: "14px 34px",
              border: "1.5px solid var(--brand-maroon)",
              background: "transparent",
              color: "var(--brand-maroon)",
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              borderRadius: 4,
              textDecoration: "none",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--brand-maroon)";
              e.currentTarget.style.color = "var(--brand-cream)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "var(--brand-maroon)";
            }}
          >
            Get In Touch
          </a>
        </footer>
      </div>
    </section>
  );
}
