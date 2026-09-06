"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const navRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const indicatorRef = useRef(null);
  const linkRefs = useRef({});
  const [menuStagger, setMenuStagger] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    gsap.from(navRef.current, {
      y: -60, opacity: 0, duration: 1, ease: "power3.out", delay: 0.5,
    });
  }, []);

  useEffect(() => {
    const sectionIds = ["hero", "reels", "services", "story", "behind-the-scenes", "testimonials", "faq", "contact"];
    const observers = sectionIds.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const io = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { threshold: 0.3, rootMargin: "-80px 0px -40% 0px" }
      );
      io.observe(el);
      return io;
    });
    return () => observers.forEach((io) => io?.disconnect());
  }, []);

  useEffect(() => {
    const activeEl = linkRefs.current[activeSection];
    const indicator = indicatorRef.current;
    if (!activeEl || !indicator) return;
    const rect = activeEl.getBoundingClientRect();
    const navRect = activeEl.closest("nav")?.getBoundingClientRect();
    if (!navRect) return;
    const left = rect.left - navRect.left;
    indicator.style.width = `${rect.width}px`;
    indicator.style.transform = `translateX(${left}px)`;
  }, [activeSection]);

  useEffect(() => {
    if (mobileOpen) {
      setMenuStagger(0);
      const timer = setInterval(() => {
        setMenuStagger((p) => {
          if (p >= 5) { clearInterval(timer); return p; }
          return p + 1;
        });
      }, 80);
      return () => clearInterval(timer);
    }
  }, [mobileOpen]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const go = (target) => {
    setMobileOpen(false);
    if (target === "/work") {
      router.push("/work");
      return;
    }
    if (pathname !== "/") {
      router.push("/" + target);
      return;
    }
    document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
  };

  const links = [
    { l: "Work", h: "/work", sectionId: "reels" },
    { l: "Services", h: "#services", sectionId: "services" },
    { l: "Our Story", h: "#story", sectionId: "story" },
    { l: "BTS", h: "#behind-the-scenes", sectionId: "behind-the-scenes" },
    { l: "Contact", h: "#contact", sectionId: "contact" },
  ];

  return (
    <>
      <nav
        ref={navRef}
        aria-label="Main navigation"
        style={{
          position: "fixed",
          top: scrolled ? "12px" : "0",
          left: scrolled ? "50%" : "0",
          transform: scrolled ? "translateX(-50%)" : "none",
          right: scrolled ? "auto" : "0",
          width: scrolled ? "calc(100% - 32px)" : "100%",
          maxWidth: scrolled ? "980px" : "100%",
          zIndex: 100,
          background: scrolled
            ? "rgba(46,10,13,0.88)"
            : "transparent",
          backdropFilter: scrolled ? "blur(20px) saturate(1.2)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px) saturate(1.2)" : "none",
          border: scrolled
            ? "1px solid rgba(200,155,93,0.18)"
            : "1px solid transparent",
          borderBottom: scrolled
            ? "1px solid rgba(200,155,93,0.12)"
            : "1px solid rgba(200,155,93,0.06)",
          borderRadius: scrolled ? "9999px" : "0",
          boxShadow: scrolled ? "0 16px 40px rgba(0,0,0,0.35)" : "none",
          transition: "all 0.5s cubic-bezier(0.25, 1, 0.5, 1)",
          paddingLeft: "env(safe-area-inset-left)",
          paddingRight: "env(safe-area-inset-right)",
        }}
        className="flex items-center justify-between"
      >
        <div style={{
          width: "100%",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: scrolled ? "10px 24px" : "16px 24px",
          transition: "padding 0.5s cubic-bezier(0.25, 1, 0.5, 1)",
        }}>
          {/* Logo */}
          <button
            onClick={() => {
              if (pathname !== "/") { router.push("/"); return; }
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
            className="flex items-center gap-3"
            aria-label="Shaadi Pitara — Home"
          >
            <div style={{
              position: "relative", width: 36, height: 36,
              borderRadius: 8, overflow: "hidden",
              border: scrolled ? "1px solid rgba(200,155,93,0.2)" : "1px solid rgba(200,155,93,0.15)",
              transition: "border-color 0.4s ease",
            }}>
              <Image
                src="/1.jpg"
                alt="Shaadi Pitara"
                fill
                sizes="36px"
                style={{ objectFit: "cover" }}
                priority
              />
            </div>
            <span style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(16px, 1.8vw, 19px)",
              fontWeight: 600,
              color: "var(--brand-cream)",
              letterSpacing: "0.06em",
              whiteSpace: "nowrap",
            }}>
              Shaadi Pitara
            </span>
          </button>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-8 relative">
            <div
              ref={indicatorRef}
              style={{
                position: "absolute", bottom: -6, left: 0,
                height: "1.5px",
                background: "var(--brand-gold)",
                transition: "transform 0.4s cubic-bezier(0.65,0,0.35,1), width 0.4s cubic-bezier(0.65,0,0.35,1)",
                pointerEvents: "none",
                width: 0,
              }}
            />
            {links.map((l) => {
              const isActive = activeSection === l.sectionId;
              return (
                <button
                  key={l.l}
                  ref={(el) => { if (el) linkRefs.current[l.sectionId] = el; }}
                  onClick={() => go(l.h)}
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: isActive ? "var(--brand-cream)" : "rgba(245,230,204,0.5)",
                    background: "none",
                    border: "none",
                    padding: "6px 0",
                    cursor: "pointer",
                    transition: "color 0.3s ease",
                    position: "relative",
                  }}
                >
                  {l.l}
                </button>
              );
            })}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:block">
            <button
              className="btn-primary"
              onClick={() => go("#contact")}
              style={{
                padding: "10px 24px",
                fontSize: 9,
              }}
            >
              Let&apos;s Talk
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            style={{
              background: "none", border: "none",
              cursor: "pointer", padding: 8,
              display: "flex", flexDirection: "column", gap: 5,
              zIndex: 100,
            }}
          >
            <span style={{
              display: "block", width: 24, height: 1.5,
              background: "var(--brand-cream)",
              transition: "all 0.35s cubic-bezier(0.23,1,0.32,1)",
              transform: mobileOpen ? "rotate(45deg) translate(4px, 4px)" : "none",
            }} />
            <span style={{
              display: "block", width: 24, height: 1.5,
              background: "var(--brand-cream)",
              transition: "all 0.35s cubic-bezier(0.23,1,0.32,1)",
              opacity: mobileOpen ? 0 : 1,
            }} />
            <span style={{
              display: "block", width: 24, height: 1.5,
              background: "var(--brand-cream)",
              transition: "all 0.35s cubic-bezier(0.23,1,0.32,1)",
              transform: mobileOpen ? "rotate(-45deg) translate(4px, -4px)" : "none",
            }} />
          </button>
        </div>
      </nav>

      {/* Mobile full-screen menu */}
      {mobileOpen && (
        <div className="mobile-menu-overlay" role="dialog" aria-modal="true" aria-label="Mobile navigation">
          <div style={{
            display: "flex", flexDirection: "column",
            alignItems: "center", gap: 6,
            width: "100%", maxWidth: 360,
          }}>
            {links.map((l, i) => (
              <button
                key={l.l}
                onClick={() => go(l.h)}
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(28px, 7vw, 40px)",
                  fontWeight: 400,
                  color: "var(--brand-cream)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "14px 0",
                  width: "100%", textAlign: "center",
                  opacity: menuStagger >= i ? 1 : 0,
                  transform: menuStagger >= i ? "translateY(0)" : "translateY(20px)",
                  transition: "all 0.5s cubic-bezier(0.23,1,0.32,1)",
                  borderBottom: i < links.length - 1 ? "1px solid rgba(200,155,93,0.1)" : "none",
                }}
              >
                {l.l}
              </button>
            ))}
            <div style={{
              marginTop: 28,
              opacity: menuStagger >= 5 ? 1 : 0,
              transform: menuStagger >= 5 ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.5s cubic-bezier(0.23,1,0.32,1) 0.1s",
            }}>
              <button
                className="btn-primary-gold"
                onClick={() => go("#contact")}
                style={{
                  padding: "14px 36px",
                }}
              >
                Let&apos;s Talk
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
