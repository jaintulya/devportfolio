"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function Navbar() {
  const navRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    gsap.from(navRef.current, {
      y: -80,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out",
      delay: 0.3,
    });
  }, []);

  const go = (id) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  const links = [
    { l: "Work", h: "#reels" },
    { l: "Services", h: "#services" },
    { l: "About", h: "#story" },
    { l: "BTS", h: "#behind-the-scenes" },
    { l: "Testimonials", h: "#testimonials" },
    { l: "FAQ", h: "#faq" },
    { l: "Contact", h: "#contact" },
  ];

  return (
    <>
      <nav
        ref={navRef}
        style={{
          position: "fixed",
          top: scrolled ? "16px" : "0",
          left: scrolled ? "50%" : "0",
          transform: scrolled ? "translateX(-50%)" : "none",
          right: scrolled ? "auto" : "0",
          width: scrolled ? "calc(100% - 32px)" : "100%",
          maxWidth: scrolled ? "960px" : "100%",
          zIndex: 100,
          background: scrolled ? "rgba(248,245,242,0.82)" : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          border: scrolled ? "1px solid rgba(201,162,126,0.22)" : "1px solid transparent",
          borderBottom: scrolled ? "1px solid rgba(201,162,126,0.22)" : "1px solid rgba(201,162,126,0.06)",
          borderRadius: scrolled ? "9999px" : "0",
          boxShadow: scrolled ? "0 15px 35px rgba(46,46,46,0.08)" : "none",
          transition: "all 0.5s cubic-bezier(0.25, 1, 0.5, 1)",
        }}
        className={`flex items-center justify-between transition-all duration-500 ${scrolled ? 'px-6 py-2.5' : 'px-6 md:px-12 py-6'}`}
      >
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-2 md:gap-3 bg-none border-none cursor-none"
        >
          <svg
            width="24"
            height="18"
            className="md:w-7 md:h-5"
            viewBox="0 0 32 24"
            fill="none"
          >
            <rect
              x="1"
              y="4"
              width="30"
              height="18"
              rx="3"
              stroke="#2E2E2E"
              strokeWidth="1.5"
              fill="none"
            />
            <circle
              cx="16"
              cy="13"
              r="6"
              stroke="#C9A27E"
              strokeWidth="1.5"
              fill="none"
            />
            <circle
              cx="16"
              cy="13"
              r="3"
              stroke="#C9A27E"
              strokeWidth="1"
              fill="none"
            />
            <path
              d="M10 4V2a2 2 0 012-2h8a2 2 0 012 2v2"
              stroke="#2E2E2E"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <circle cx="26" cy="8" r="1.5" fill="#C9A27E" />
          </svg>
          <span className="font-display text-base md:text-xl font-semibold text-[#2E2E2E] tracking-wider whitespace-nowrap">
            Devarsh Jain
          </span>
        </button>

        <div className="hidden lg:flex items-center gap-9">
          {links.map((l) => (
            <button
              key={l.l}
              onClick={() => go(l.h)}
              className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#6B6B6B] bg-none border-none cursor-none hover:text-[#C9A27E] transition-colors"
            >
              {l.l}
            </button>
          ))}
        </div>

        <button
          onClick={() => go("#contact")}
          className="hidden md:flex focus-sq items-center gap-2 px-5 py-2.5 border border-[#C9A27E80] bg-transparent cursor-none font-mono text-[10px] tracking-[0.2em] uppercase text-[#2E2E2E] hover:bg-[#C9A27E] hover:text-[#F8F5F2] transition-all"
        >
          <span className="rec-dot w-1.5 h-1.5 rounded-full bg-red-500" />
          Book Now
        </button>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden flex flex-col gap-1.5 p-1 bg-none border-none z-[101]"
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="block w-6 h-[1.5px] bg-[#2E2E2E] transition-all duration-300"
              style={{
                transform: mobileOpen
                  ? i === 0
                    ? "rotate(45deg) translate(5px,5px)"
                    : i === 2
                      ? "rotate(-45deg) translate(5px,-5px)"
                      : "none"
                  : "none",
                opacity: mobileOpen && i === 1 ? 0 : 1,
              }}
            />
          ))}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-[99] bg-[#F8F5F2F8] backdrop-blur-2xl flex flex-col items-center justify-center gap-10 transition-opacity duration-500 ${mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      >
        {links.map((l, i) => (
          <button
            key={l.l}
            onClick={() => go(l.h)}
            className="font-display text-4xl md:text-5xl font-light text-[#2E2E2E] hover:text-[#C9A27E] transition-colors"
            style={{
              transitionDelay: `${i * 50}ms`,
              opacity: mobileOpen ? 1 : 0,
              transform: mobileOpen ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.6s cubic-bezier(0.23, 1, 0.32, 1)",
            }}
          >
            {l.l}
          </button>
        ))}
      </div>

      <style>{`
        @media(max-width:768px){.hidden-mobile{display:none!important}.show-mobile{display:flex!important}}
      `}</style>
    </>
  );
}
