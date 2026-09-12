"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";

const WHATSAPP_URL = `https://wa.me/919377150889?text=${encodeURIComponent("Hi Shaadi Pitara, I would like to enquire about your wedding services. Please share more details. Thank you!")}`;

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const navRef = useRef(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const linkRefs = useRef({});
  const [menuReady, setMenuReady] = useState(false);

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // Stay transparent while in the hero section; transition only when content section covers the hero
      const heroHeight = typeof window !== "undefined" ? window.innerHeight : 800;
      setScrolled(window.scrollY >= heroHeight - 70);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
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

  // Robust scroll-spy: probe which section straddles the 35% viewport mark
  // Works correctly in BOTH scroll directions (top→bottom and bottom→top)
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Ordered list of sections with their URL path
    // Sections listed in page order (top → bottom)
    const SECTIONS = [
      { id: "hero",         path: "/" },
      { id: "reels",        path: "/work" },
      { id: "services",     path: "/services" },
      { id: "story",        path: "/story" },
      { id: "testimonials", path: "/story" },   // stays on /story
      { id: "faq",          path: "/story" },   // stays on /story
      { id: "contact",      path: "/contact" },
    ];

    let rafId;
    let lastPath = typeof window !== "undefined" ? window.location.pathname : "/";
    let urlUpdateTimer = null;

    const probe = () => {
      const scrollY  = window.scrollY || window.pageYOffset;
      const vh       = window.innerHeight;
      const fullH    = document.documentElement.scrollHeight;

      // At very top → hero
      if (scrollY < vh * 0.45) {
        setActiveSection("hero");
        if (lastPath !== "/") {
          lastPath = "/";
          clearTimeout(urlUpdateTimer);
          urlUpdateTimer = setTimeout(() => {
            if (typeof window !== "undefined" && window.location.pathname !== "/") {
              window.history.replaceState(null, "", "/");
            }
          }, 350);
        }
        return;
      }

      // At very bottom → contact
      if (scrollY + vh >= fullH - 60) {
        setActiveSection("contact");
        if (lastPath !== "/contact") {
          lastPath = "/contact";
          clearTimeout(urlUpdateTimer);
          urlUpdateTimer = setTimeout(() => {
            if (typeof window !== "undefined" && window.location.pathname !== "/contact") {
              window.history.replaceState(null, "", "/contact");
            }
          }, 350);
        }
        return;
      }

      // Probe Y: 35% down the viewport
      const probeY = Math.min(vh * 0.35, 260);

      // Walk sections from bottom to top so the lowest one wins
      let matched = null;
      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const { id } = SECTIONS[i];
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        // Section rect straddles the probe line
        if (rect.top <= probeY && rect.bottom > probeY) {
          matched = SECTIONS[i];
          break;
        }
      }

      // Fallback: find the last section whose top is above probe
      if (!matched) {
        for (let i = SECTIONS.length - 1; i >= 0; i--) {
          const { id } = SECTIONS[i];
          const el = document.getElementById(id);
          if (!el) continue;
          if (el.getBoundingClientRect().top <= probeY) {
            matched = SECTIONS[i];
            break;
          }
        }
      }

      if (matched) {
        setActiveSection(matched.id);
        if (lastPath !== matched.path) {
          lastPath = matched.path;
          clearTimeout(urlUpdateTimer);
          urlUpdateTimer = setTimeout(() => {
            if (typeof window !== "undefined" && window.location.pathname !== matched.path) {
              window.history.replaceState(null, "", matched.path);
            }
          }, 350);
        }
      }
    };

    let lastProbe = 0;
    let throttleTimer = null;

    const throttledProbe = () => {
      const now = performance.now();
      if (now - lastProbe < 140) {
        clearTimeout(throttleTimer);
        throttleTimer = setTimeout(probe, 140);
        return;
      }
      lastProbe = now;
      probe();
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(throttledProbe);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    probe(); // run once on mount

    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(throttleTimer);
      clearTimeout(urlUpdateTimer);
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

  // Map clean path → section element id
  const pathToId = {
    "/": "hero",
    "/work": "reels",
    "/services": "services",
    "/story": "story",
    "/contact": "contact",
  };

  const go = (path) => {
    setMobileOpen(false);
    const id = pathToId[path] ?? "hero";
    const el = document.getElementById(id);
    
    if (el) {
      window.history.pushState(null, "", path);
      if (id === "hero") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        el.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      router.push("/" + (path === "/" ? "" : `?section=${id}`));
    }
  };

  const links = [
    { l: "Work",     path: "/work",     sectionId: "reels" },
    { l: "Services", path: "/services", sectionId: "services" },
    { l: "Our Story",path: "/story",    sectionId: "story" },
    { l: "Contact",  path: "/contact",  sectionId: "contact" },
  ];

  const isHero = pathname === "/" && !scrolled;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .main-navbar {
          position: fixed;
          top: 16px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 200;
          width: auto;
          max-width: calc(100vw - 32px);
          border-radius: 100px;
          background: rgba(26, 5, 7, 0.82);
          backdrop-filter: blur(20px) saturate(1.3);
          -webkit-backdrop-filter: blur(20px) saturate(1.3);
          border: 1px solid rgba(212, 184, 150, 0.22);
          box-shadow: 0 12px 36px rgba(0, 0, 0, 0.45);
          padding-left: env(safe-area-inset-left);
          padding-right: env(safe-area-inset-right);
          transition: opacity 0.45s cubic-bezier(0.23, 1, 0.32, 1), transform 0.45s cubic-bezier(0.23, 1, 0.32, 1), background 0.4s ease, backdrop-filter 0.4s ease, box-shadow 0.4s ease, border-color 0.4s ease;
        }

        /* On Web (Desktop > 1024px): Do not show navbar in Hero section; appear only starting from Work section */
        @media (min-width: 1025px) {
          .main-navbar.nav-in-hero {
            opacity: 0 !important;
            pointer-events: none !important;
            transform: translate(-50%, -30px) !important;
            visibility: hidden;
          }
          .main-navbar.nav-scrolled {
            opacity: 1 !important;
            pointer-events: auto !important;
            transform: translate(-50%, 0) !important;
            visibility: visible;
            background: rgba(26, 5, 7, 0.82) !important;
            backdrop-filter: blur(20px) saturate(1.3) !important;
            -webkit-backdrop-filter: blur(20px) saturate(1.3) !important;
            border: 1px solid rgba(212, 184, 150, 0.22) !important;
            box-shadow: 0 12px 36px rgba(0, 0, 0, 0.45) !important;
          }
        }

        .nav-transparent {
          background: transparent !important;
          backdrop-filter: none !important;
          -webkit-backdrop-filter: none !important;
          box-shadow: none !important;
          border-color: transparent !important;
        }

        @media (max-width: 1024px) {
          .main-navbar {
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            right: 0 !important;
            width: 100% !important;
            max-width: 100% !important;
            border-radius: 0 !important;
            border: none !important;
            box-shadow: none !important;
            margin: 0 !important;
            transition: opacity 0.4s cubic-bezier(0.23, 1, 0.32, 1), transform 0.4s cubic-bezier(0.23, 1, 0.32, 1), background 0.4s ease, backdrop-filter 0.4s ease, border-bottom 0.4s ease, box-shadow 0.4s ease;
          }
          /* Completely hide navbar in Hero section on phone/mobile */
          .main-navbar.nav-in-hero {
            opacity: 0 !important;
            pointer-events: none !important;
            transform: translateY(-100%) !important;
            visibility: hidden !important;
          }
          .main-navbar.nav-scrolled {
            opacity: 1 !important;
            pointer-events: auto !important;
            transform: translateY(0) !important;
            visibility: visible !important;
            /* In other sections: subtle transparent dark backdrop blur for phone */
            background: rgba(26, 5, 7, 0.55) !important;
            backdrop-filter: blur(16px) saturate(1.2) !important;
            -webkit-backdrop-filter: blur(16px) saturate(1.2) !important;
            border-bottom: 1px solid rgba(212, 184, 150, 0.12) !important;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2) !important;
          }
          .main-navbar.nav-transparent {
            background: transparent !important;
            border-bottom: none !important;
            box-shadow: none !important;
            backdrop-filter: none !important;
            -webkit-backdrop-filter: none !important;
          }
        }

        body.hide-navbar .main-navbar {
          display: none !important;
        }
      ` }} />
      {/* Responsive sticky/fixed navbar */}
      <nav
        ref={navRef}
        aria-label="Main navigation"
        className={`main-navbar ${scrolled ? "nav-scrolled" : ""} ${isHero ? "nav-in-hero" : ""}`}
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
              position: "relative", width: 44, height: 30,
              flexShrink: 0,
            }}>
              <Image
                src="/navlogo.png"
                alt="Shaadipitara logo - Devarsh Jain"
                fill
                sizes="44px"
                style={{ objectFit: "contain" }}
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
                  onClick={() => go(l.path)}
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: isActive
                      ? "#F3E1C4"
                      : "rgba(243, 225, 196, 0.82)",
                    fontWeight: isActive ? 600 : 500,
                    textShadow: "0 1px 3px rgba(0,0,0,0.5)",
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

          {/* Desktop CTA — Redirects directly to WhatsApp */}
          <div className="nav-desktop-cta" style={{ display: "flex", alignItems: "center" }}>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{
                padding: "8px 18px",
                fontSize: 9,
                borderRadius: 100,
                letterSpacing: "0.18em",
                margin: "0 6px",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                background: "#F3E1C4",
                color: "var(--brand-maroon-dark)",
              }}
            >
              Let&apos;s Connect
            </a>
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
              background: "#F3E1C4",
              transition: "all 0.4s cubic-bezier(0.23,1,0.32,1)",
              transform: mobileOpen ? "rotate(45deg) translate(4px, 4px)" : "none",
              transformOrigin: "center",
              borderRadius: 1,
            }} />
            <span style={{
              display: "block", width: 18, height: 1.5,
              background: "#F3E1C4",
              transition: "all 0.35s cubic-bezier(0.23,1,0.32,1)",
              opacity: mobileOpen ? 0 : 1,
              transform: mobileOpen ? "scaleX(0)" : "scaleX(1)",
              borderRadius: 1,
            }} />
            <span style={{
              display: "block", width: 18, height: 1.5,
              background: "#F3E1C4",
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
                onClick={() => go(l.path)}
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(30px, 7vw, 42px)",
                  fontWeight: 400,
                  color: activeSection === l.sectionId
                    ? "#F3E1C4"
                    : "rgba(243, 225, 196, 0.85)",
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
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                style={{
                  padding: "14px 40px",
                  textDecoration: "none",
                  display: "inline-block",
                  background: "#F3E1C4",
                  color: "var(--brand-maroon-dark)",
                  borderRadius: 100,
                }}
              >
                Let&apos;s Connect
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
