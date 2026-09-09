"use client";
import { useEffect, useState } from "react";

export default function BookCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero");
    const contact = document.getElementById("contact");
    if (!hero || !contact) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.target === hero && !e.isIntersecting) setVisible(true);
          if (e.target === contact && e.isIntersecting) setVisible(false);
        });
      },
      { rootMargin: "0px 0px -12% 0px" }
    );
    io.observe(hero);
    io.observe(contact);
    return () => io.disconnect();
  }, []);

  return (
    <a
      href="https://wa.me/919377150889"
      target="_blank"
      rel="noopener noreferrer"
      className="book-cta"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      style={{
        position: "fixed",
        bottom: 24,
        left: "50%",
        zIndex: 90,
        display: visible ? "inline-flex" : "none",
        alignItems: "center",
        gap: 8,
        padding: "12px 24px",
        borderRadius: 100,
        background: "rgba(26, 5, 7, 0.85)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: "1px solid rgba(212,184,150,0.3)",
        color: "var(--brand-cream)",
        fontFamily: "var(--font-mono)",
        fontSize: 10,
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        textDecoration: "none",
        boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        transform: visible ? "translate(-50%, 0)" : "translate(-50%, 16px)",
        transition: "all 0.3s cubic-bezier(0.23,1,0.32,1)",
      }}
    >
      Let&apos;s Talk
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      </svg>
    </a>
  );
}
