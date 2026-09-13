"use client";

const WHATSAPP_URL = `https://wa.me/919377150889?text=${encodeURIComponent("Hi Shaadi Pitara, I would like to enquire about your wedding services. Please share more details. Thank you!")}`;

export default function HeroSection() {
  const handleNav = (targetId, path) => {
    if (typeof window === "undefined") return;
    window.history.pushState(null, "", path);
    const el = document.getElementById(targetId);
    if (el) {
      if (window.__lenis) {
        window.__lenis.scrollTo(el, { offset: -20, duration: 1.2 });
      } else {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <section
      id="hero"
      aria-label="Hero Introduction"
      className="hero-section relative w-full h-[100svh] min-h-[580px] overflow-hidden select-none"
      style={{
        backgroundColor: "#1A0507",
      }}
    >
      <style>{`
        .hero-layout-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center !important;
          width: 100%;
          height: 100%;
        }

        /* Desktop: middle placement of page */
        @media (min-width: 1025px) {
          .hero-layout-wrapper {
            justify-content: center !important;
            padding-top: 24px !important;
            padding-bottom: 0 !important;
          }
          .hero-content-inner {
            max-width: 920px !important;
          }
          .hero-eyebrow-container {
            margin-bottom: 10px !important;
          }
          .hero-eyebrow-text {
            font-size: 13px !important;
            letter-spacing: 0.34em !important;
          }
          .hero-headline {
            font-size: clamp(56px, 5.4vw, 76px) !important;
            line-height: 1.06 !important;
            margin-bottom: 10px !important;
            text-shadow: 0 3px 20px rgba(0, 0, 0, 0.95), 0 1px 4px rgba(0, 0, 0, 0.9) !important;
          }
          .hero-accent-container {
            margin-bottom: 22px !important;
          }
          .hero-accent-text {
            font-family: var(--font-script) !important;
            font-style: normal !important;
            font-weight: 400 !important;
            font-size: clamp(56px, 5.2vw, 74px) !important;
            line-height: 1.15 !important;
            color: #DFC18A !important;
            text-shadow: 0 3px 18px rgba(0, 0, 0, 0.95), 0 0 28px rgba(223, 193, 138, 0.45) !important;
          }
          .hero-description {
            font-size: 16px !important;
            max-width: 540px !important;
            line-height: 1.65 !important;
            margin-bottom: 28px !important;
            text-shadow: 0 2px 12px rgba(0, 0, 0, 0.95) !important;
          }
          .hero-buttons-container {
            display: flex !important;
            flex-direction: row !important;
            flex-wrap: nowrap !important;
            align-items: center !important;
            justify-content: center !important;
            width: auto !important;
            max-width: 480px !important;
            gap: 16px !important;
          }
          .hero-btn-primary, .hero-btn-secondary {
            white-space: nowrap !important;
            flex-shrink: 0 !important;
            padding: 13.5px 28px !important;
            font-size: 11.5px !important;
            letter-spacing: 0.16em !important;
          }
        }

        /* Tablet: middle placement of page */
        @media (min-width: 641px) and (max-width: 1024px) {
          .hero-layout-wrapper {
            justify-content: center !important;
            padding-top: 20px !important;
            padding-bottom: 0 !important;
          }
          .hero-content-inner {
            max-width: 700px !important;
          }
          .hero-eyebrow-container {
            margin-bottom: 8px !important;
          }
          .hero-eyebrow-text {
            font-size: 12px !important;
            letter-spacing: 0.32em !important;
          }
          .hero-headline {
            font-size: clamp(46px, 5.6vw, 60px) !important;
            line-height: 1.08 !important;
            margin-bottom: 8px !important;
            text-shadow: 0 3px 20px rgba(0, 0, 0, 0.95), 0 1px 4px rgba(0, 0, 0, 0.9) !important;
          }
          .hero-accent-container {
            margin-bottom: 18px !important;
          }
          .hero-accent-text {
            font-family: var(--font-script) !important;
            font-style: normal !important;
            font-weight: 400 !important;
            font-size: clamp(48px, 5.5vw, 62px) !important;
            line-height: 1.15 !important;
            color: #DFC18A !important;
            text-shadow: 0 3px 18px rgba(0, 0, 0, 0.95), 0 0 28px rgba(223, 193, 138, 0.45) !important;
          }
          .hero-description {
            font-size: 14.5px !important;
            max-width: 480px !important;
            line-height: 1.60 !important;
            margin-bottom: 24px !important;
            text-shadow: 0 2px 12px rgba(0, 0, 0, 0.95) !important;
          }
          .hero-buttons-container {
            display: flex !important;
            flex-direction: row !important;
            flex-wrap: nowrap !important;
            align-items: center !important;
            justify-content: center !important;
            width: auto !important;
            max-width: 430px !important;
            gap: 14px !important;
          }
          .hero-btn-primary, .hero-btn-secondary {
            white-space: nowrap !important;
            flex-shrink: 0 !important;
            padding: 12.5px 24px !important;
            font-size: 11px !important;
            letter-spacing: 0.15em !important;
          }
        }

        /* Mobile: middle placement of page & matching Image 2 scale */
        @media (max-width: 640px) {
          .hero-layout-wrapper {
            justify-content: center !important;
            padding-top: 14px !important;
            padding-bottom: 0 !important;
          }
          .hero-content-inner {
            max-width: min(95vw, 520px) !important;
            padding: 0 8px !important;
          }
          .hero-eyebrow-container {
            margin-bottom: 8px !important;
          }
          .hero-eyebrow-text {
            font-size: 11.5px !important;
            letter-spacing: 0.30em !important;
          }
          .hero-headline {
            font-size: clamp(40px, 10.2vw, 52px) !important;
            line-height: 1.08 !important;
            margin-bottom: 6px !important;
            text-shadow: 0 3px 18px rgba(0, 0, 0, 0.95), 0 1px 4px rgba(0, 0, 0, 0.9) !important;
          }
          .hero-accent-container {
            margin-bottom: 16px !important;
          }
          .hero-accent-text {
            font-family: var(--font-script) !important;
            font-style: normal !important;
            font-weight: 400 !important;
            font-size: clamp(45px, 11.2vw, 58px) !important;
            line-height: 1.15 !important;
            color: #DFC18A !important;
            text-shadow: 0 3px 18px rgba(0, 0, 0, 0.95), 0 0 28px rgba(223, 193, 138, 0.45) !important;
          }
          .hero-description {
            font-size: clamp(13px, 3.2vw, 15px) !important;
            max-width: 450px !important;
            line-height: 1.52 !important;
            margin-bottom: 22px !important;
            text-shadow: 0 2px 10px rgba(0, 0, 0, 0.95) !important;
          }
          .hero-buttons-container {
            display: flex !important;
            flex-direction: row !important;
            flex-wrap: nowrap !important;
            align-items: center !important;
            justify-content: center !important;
            width: auto !important;
            max-width: 98vw !important;
            gap: 12px !important;
          }
          .hero-btn-primary, .hero-btn-secondary {
            white-space: nowrap !important;
            flex-shrink: 0 !important;
            padding: 12px 20px !important;
            font-size: 10.5px !important;
            letter-spacing: 0.12em !important;
          }
        }
      `}</style>

      {/* Responsive Cinematic Background Imagery with Subdued Exposure */}
      <picture className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <source media="(max-width: 640px)" srcSet="/herobgphone.png" />
        <source media="(max-width: 1024px)" srcSet="/herobgtablet.png" />
        <img
          src="/herobg.png"
          alt="Shaadi Pitara Luxury Wedding Film Hero Background"
          className="w-full h-full object-cover object-center"
          style={{ filter: "brightness(0.85) contrast(1.06)" }}
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />
      </picture>

      {/* Atmospheric Overlays */}
      {/* 1. Subtle top shadow so mobile/desktop nav items stand out crisply */}
      <div
        aria-hidden="true"
        className="hero-top-vignette absolute inset-x-0 top-0 pointer-events-none z-[1]"
      />

      {/* 2. Global perimeter vignette for cinematic depth */}
      <div
        aria-hidden="true"
        className="hero-perimeter-vignette absolute inset-0 pointer-events-none z-[2]"
      />

      {/* 3. Dedicated Text Contrast Scrim (Smooth natural dark radial gradient behind typography) */}
      <div
        aria-hidden="true"
        className="hero-text-scrim absolute inset-0 pointer-events-none z-[2]"
      />

      {/* 4. Bottom shadow blending gracefully into the dark maroon theme */}
      <div
        aria-hidden="true"
        className="hero-bottom-vignette absolute inset-x-0 bottom-0 pointer-events-none z-[2]"
      />

      {/* Main Content Container with Dedicated Responsive Layouts */}
      <div className="hero-content-wrapper hero-layout-wrapper relative z-10 w-full h-full flex flex-col items-center">
        <div className="hero-content-inner relative flex flex-col items-center text-center">
          {/* Eyebrow */}
          <div className="hero-anim-eyebrow hero-eyebrow-container flex flex-col items-center">
            <span className="hero-eyebrow-text">
              EVERY WEDDING HAS A STORY
            </span>
            <div className="flex items-center justify-center gap-3 mt-3 mb-2 opacity-65" aria-hidden="true">
              <span className="h-[1px] w-10 sm:w-14 bg-gradient-to-r from-transparent to-[#D4B896]" />
              <span className="text-[#D4B896] text-[8px] leading-none">✦</span>
              <span className="h-[1px] w-10 sm:w-14 bg-gradient-to-l from-transparent to-[#D4B896]" />
            </div>
          </div>

          {/* Main Headline */}
          <h1 className="hero-anim-headline hero-headline">
            <span className="hero-headline-line">We Don&apos;t Just</span>
            <span className="hero-headline-line">Film Weddings.</span>
          </h1>

          {/* Accent Line */}
          <div className="hero-anim-script hero-accent-container flex flex-col items-center">
            <span className="hero-accent-text">
              We Tell Yours.
            </span>
          </div>

          {/* Cinematic Subtext */}
          <p className="hero-anim-subtext hero-description">
            Cinematic films shaped around the people, emotions and moments that make your celebration yours.
          </p>

          {/* Call to Action Buttons — Strictly Side-by-Side on all viewports, Single Line Guaranteed */}
          <div className="hero-anim-buttons hero-buttons-container flex items-center justify-center flex-nowrap">
            <a
              href="#reels"
              onClick={(e) => {
                e.preventDefault();
                handleNav("reels", "/work");
              }}
              className="hero-btn-primary group whitespace-nowrap"
            >
              WATCH OUR WORK
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hero-btn-secondary whitespace-nowrap"
            >
              LET&apos;S CONNECT
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
