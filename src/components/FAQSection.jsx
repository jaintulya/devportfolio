"use client";
import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    question: "How far in advance should we book?",
    answer:
      "We recommend booking 6-12 months in advance, especially for peak wedding season (October-March). However, we always do our best to accommodate last-minute requests whenever possible.",
  },
  {
    question: "Do you travel for weddings?",
    answer:
      "Absolutely! We love destination weddings and are available to travel worldwide. Travel and accommodation costs are additional and will be quoted based on your location.",
  },
  {
    question: "How long does it take to receive our wedding films?",
    answer:
      "Our standard delivery time is 5-7 days for reels and 2-3 weeks for full films. We understand how eager you are to relive your day, so we always prioritize getting your memories to you as quickly as possible.",
  },
  {
    question: "Can we customize our package?",
    answer:
      "Of course! Every love story is unique, and we believe your package should reflect that. We offer completely customizable packages tailored to your specific needs and vision.",
  },
  {
    question: "Do you work with photographers?",
    answer:
      "We have an amazing network of professional photographers we frequently collaborate with. We'd be happy to recommend photographers whose style complements our work perfectly.",
  },
];

function FAQItem({ faq, index }) {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef(null);
  const itemRef = useRef(null);

  useEffect(() => {
    gsap.from(itemRef.current, {
      y: 30,
      opacity: 0,
      duration: 0.7,
      ease: "power3.out",
      delay: index * 0.1,
      scrollTrigger: {
        trigger: itemRef.current,
        start: "top 85%",
      },
    });
  }, [index]);

  return (
    <div
      ref={itemRef}
      style={{
        borderBottom: "1px solid rgba(46,46,46,0.1)",
        padding: "24px 0",
      }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "none",
          border: "none",
          cursor: "none",
          textAlign: "left",
          padding: 0,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-cormorant,serif)",
            fontSize: 20,
            fontWeight: 500,
            color: "#2E2E2E",
          }}
        >
          {faq.question}
        </span>
        <div
          style={{
            width: 32,
            height: 32,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid rgba(201,162,126,0.4)",
            borderRadius: "50%",
            transition: "all 0.3s ease",
            transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
          }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#C9A27E"
            strokeWidth="1.5"
          >
            <path d="M12 5v14M5 12h14" />
          </svg>
        </div>
      </button>
      <div
        ref={contentRef}
        style={{
          maxHeight: isOpen ? 300 : 0,
          overflow: "hidden",
          transition: "max-height 0.3s ease",
        }}
      >
        <p
          style={{
            marginTop: 16,
            fontFamily: "var(--font-jost, sans-serif)",
            fontSize: 15,
            color: "#6B6B6B",
            lineHeight: 1.7,
          }}
        >
          {faq.answer}
        </p>
      </div>
    </div>
  );
}

export default function FAQSection() {
  const secRef = useRef(null);
  const headRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headRef.current,
          start: "top 80%",
        },
      });
    }, secRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="faq"
      ref={secRef}
      style={{
        padding: "120px 24px",
        background: "#F8F5F2",
      }}
    >
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <div
          ref={headRef}
          style={{
            textAlign: "center",
            marginBottom: 70,
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
              fontFamily: "monospace",
              fontSize: 10,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "#C9A27E",
              marginBottom: 16,
            }}
          >
            <span
              style={{
                width: 28,
                height: 1,
                background: "#C9A27E",
                display: "block",
              }}
            />
            Questions?
            <span
              style={{
                width: 28,
                height: 1,
                background: "#C9A27E",
                display: "block",
              }}
            />
          </div>
          <h2
            style={{
              fontFamily: "var(--font-cormorant,serif)",
              fontSize: "clamp(36px, 6vw, 64px)",
              fontWeight: 300,
              lineHeight: 1.1,
              color: "#2E2E2E",
            }}
          >
            Frequently Asked
          </h2>
        </div>

        <div>
          {faqs.map((faq, index) => (
            <FAQItem key={index} faq={faq} index={index} />
          ))}
        </div>

        <div style={{ marginTop: 50, textAlign: "center" }}>
          <p
            style={{
              fontFamily: "var(--font-jost, sans-serif)",
              fontSize: 15,
              color: "#6B6B6B",
              marginBottom: 16,
            }}
          >
            Still have questions?
          </p>
          <button
            onClick={() =>
              document
                .querySelector("#contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="focus-sq"
            style={{
              padding: "14px 32px",
              border: "1px solid #C9A27E",
              background: "transparent",
              color: "#C9A27E",
              fontFamily: "monospace",
              fontSize: 10,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              borderRadius: 8,
              cursor: "none",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#C9A27E";
              e.currentTarget.style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "#C9A27E";
            }}
          >
            Get In Touch
          </button>
        </div>
      </div>
    </section>
  );
}
