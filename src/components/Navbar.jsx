"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const navRef = useRef(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const linkRefs = useRef({});
  const [menuReady, setMenuReady] = useState(false);

  useEffect(() => {
    const onScroll = () => {};
    window.addEventListener("scroll", () => {}, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Entrance animation — capsule slides down from top
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(navRef.current, {
        y: -60, opacity: 0, duration: 1.2, ease: "power3.out", delay: 0.5,
      });
    }, navRef);
    return () => ctx.revert();
  }, []);

  // Active section tracking — single observer with narrow top detection band
  useEffect(() => {
    const sectionIds = ["hero", "reels", "services", "story", "behind-the-scenes", "testimonials", "faq", "contact"];
    const intersecting = new Map(); // el → id
    let rafId;

    const pickActive = () => {
      let best = null;
      let bestTop = Infinity;
      intersecting.forEach((id, el) => {
        const top = el.getBoundingClientRect().top;
        if (top < bestTop) { bestTop = top; best = id; }
      });
      if (best) setActiveSection(best);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            intersecting.set(entry.target, entry.target.id);
          } else {
            intersecting.delete(entry.target);
          }
        });
        cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(pickActive);
      },
      {
        rootMargin: "-80px 0px -92% 0px",
        threshold: 0,
      }
    );

    const onResize = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(pickActive);
    };

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    window.addEventListener("resize", onResize);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // Mobile menu open/close
  useEffect(() => {
    if (mobileOpen) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setMenuReady(true));
      });
    } else {
      setMenuReady(false);
    }
  }, [mobileOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  // Escape to close mobile menu
  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e) => { if (e.key === "Escape") setMobileOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
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
    { l: "Work", h: "#reels", sectionId: "reels" },
    { l: "Services", h: "#services", sectionId: "services" },
    { l: "Our Story", h: "#story", sectionId: "story" },
    { l: "Contact", h: "#contact", sectionId: "contact" },
  ];

  return (
    <>
      <style>{`
        .main-navbar {
          position: fixed;
          top: 16px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 200;
          width: auto;
          max-width: calc(100vw - 32px);
          border-radius: 100px;
          background: rgba(26, 5, 7, 0.72);
          backdrop-filter: blur(24px) saturate(1.1);
          -webkit-backdrop-filter: blur(24px) saturate(1.1);
          border: 1px solid rgba(212,184,150,0.14);
          box-shadow: 0 8px 32px rgba(0,0,0,0.3), 0 0 0 1px rgba(0,0,0,0.2);
          padding-left: env(safe-area-inset-left);
          padding-right: env(safe-area-inset-right);
          transition: background 0.4s ease, backdrop-filter 0.4s ease, box-shadow 0.4s ease, border-color 0.4s ease;
        }

        .nav-transparent {
          background: transparent !important;
          backdrop-filter: none !important;
          -webkit-backdrop-filter: none !important;
          box-shadow: none !important;
          border-color: transparent !important;
        }

        @media (max-width: 768px) {
          .main-navbar {
            position: sticky !important;
            top: 0 !important;
            left: 0 !important;
            transform: none !important;
            width: 100% !important;
            max-width: 100% !important;
            border-radius: 0 !important;
            border: none !important;
            border-bottom: 1px solid rgba(212,184,150,0.14) !important;
            box-shadow: 0 4px 20px rgba(0,0,0,0.4) !important;
            margin: 0 !important;
          }
        }

        body.hide-navbar .main-navbar {
          display: none !important;
        }
      `}</style>
      {/* Responsive sticky/fixed navbar */}
      <nav
        ref={navRef}
        aria-label="Main navigation"
        className={`main-navbar ${activeSection === "hero" && pathname === "/" ? "nav-transparent" : ""}`}
      >
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 6,
          padding: "0 8px",
          height: 48,
        }}>
          {/* Logo only — no text */}
          <button
            onClick={() => {
              if (pathname !== "/") { router.push("/"); return; }
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            style={{
              background: "none", border: "none", cursor: "pointer",
              padding: "6px 10px", display: "flex", alignItems: "center",
              flexShrink: 0,
            }}
            aria-label="Shaadi Pitara — Home"
          >
            <div style={{
              position: "relative", width: 28, height: 28,
              borderRadius: 6, overflow: "hidden",
              flexShrink: 0,
            }}>
              <Image
                src="/1.jpg"
                alt="Shaadi Pitara"
                fill
                sizes="28px"
                style={{ objectFit: "cover" }}
                priority
              />
            </div>
          </button>

          {/* Desktop links */}
          <div className="nav-desktop-links items-center gap-1 relative" style={{ display: "flex", alignItems: "center", gap: 2 }}>
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
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: isActive
                      ? "var(--brand-cream)"
                      : "rgba(247,230,204,0.55)",
                    background: "none",
                    border: "none",
                    padding: "7px 14px",
                    cursor: "pointer",
                    transition: "color 0.3s ease",
                    position: "relative",
                    lineHeight: 1,
                    whiteSpace: "nowrap",
                    borderRadius: 100,
                  }}
                >
                  {l.l}
                </button>
              );
            })}
          </div>

          {/* Desktop CTA */}
          <div className="nav-desktop-cta" style={{ display: "flex", alignItems: "center" }}>
            <button
              className="btn-primary"
              onClick={() => go("#contact")}
              style={{
                padding: "8px 18px",
                fontSize: 9,
                borderRadius: 100,
                letterSpacing: "0.18em",
                margin: "0 6px",
              }}
            >
              Let&apos;s Connect
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="nav-hamburger"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            style={{
              background: "none", border: "none",
              cursor: "pointer", padding: "0 8px",
              display: "flex", flexDirection: "column", gap: 5,
              zIndex: 300,
              width: 36, height: 36,
              alignItems: "center", justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <span style={{
              display: "block", width: 18, height: 1.5,
              background: "var(--brand-cream)",
              transition: "all 0.4s cubic-bezier(0.23,1,0.32,1)",
              transform: mobileOpen ? "rotate(45deg) translate(4px, 4px)" : "none",
              transformOrigin: "center",
              borderRadius: 1,
            }} />
            <span style={{
              display: "block", width: 18, height: 1.5,
              background: "var(--brand-cream)",
              transition: "all 0.35s cubic-bezier(0.23,1,0.32,1)",
              opacity: mobileOpen ? 0 : 1,
              transform: mobileOpen ? "scaleX(0)" : "scaleX(1)",
              borderRadius: 1,
            }} />
            <span style={{
              display: "block", width: 18, height: 1.5,
              background: "var(--brand-cream)",
              transition: "all 0.4s cubic-bezier(0.23,1,0.32,1)",
              transform: mobileOpen ? "rotate(-45deg) translate(4px, -4px)" : "none",
              transformOrigin: "center",
              borderRadius: 1,
            }} />
          </button>
        </div>
      </nav>

      {/* Mobile full-screen menu */}
      {mobileOpen && (
        <div
          style={{
            position: "fixed", inset: 0, zIndex: 150,
            background: "rgba(26, 5, 7, 0.97)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            padding: "max(24px, env(safe-area-inset-top)) max(24px) max(24px, env(safe-area-inset-bottom))",
            opacity: menuReady ? 1 : 0,
            transition: "opacity 0.4s cubic-bezier(0.23,1,0.32,1)",
          }}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          onClick={(e) => { if (e.target === e.currentTarget) setMobileOpen(false); }}
        >
          <div style={{
            display: "flex", flexDirection: "column",
            alignItems: "center",
            width: "100%", maxWidth: 320,
            gap: 2,
          }}>
            {links.map((l, i) => (
              <button
                key={l.l}
                onClick={() => go(l.h)}
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(30px, 7vw, 42px)",
                  fontWeight: 400,
                  color: activeSection === l.sectionId
                    ? "var(--brand-gold-light)"
                    : "var(--brand-cream)",
                  background: "none",
                  border: "none",
                  borderBottom: i < links.length - 1 ? "1px solid rgba(212,184,150,0.08)" : "none",
                  cursor: "pointer",
                  padding: "16px 0",
                  width: "100%",
                  textAlign: "center",
                  opacity: menuReady ? 1 : 0,
                  transform: menuReady ? "translateY(0)" : "translateY(20px)",
                  transition: `all 0.55s cubic-bezier(0.23,1,0.32,1) ${i * 0.06}s`,
                }}
              >
                {l.l}
              </button>
            ))}
            <div style={{
              marginTop: 36,
              opacity: menuReady ? 1 : 0,
              transform: menuReady ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.55s cubic-bezier(0.23,1,0.32,1) 0.24s",
            }}>
              <button
                className="btn-primary-gold"
                onClick={() => go("#contact")}
                style={{
                  padding: "14px 40px",
                }}
              >
                Let&apos;s Connect
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
