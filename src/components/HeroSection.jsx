"use client";

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
      className="relative w-full h-[100svh] min-h-[600px] flex items-center justify-center overflow-hidden select-none"
      style={{
        backgroundColor: "#1A0507",
      }}
    >
      {/* Responsive Cinematic Background Imagery starting at Y = 0 */}
      <picture className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <source media="(max-width: 640px)" srcSet="/herobgphone.png" />
        <source media="(max-width: 1024px)" srcSet="/herobgtablet.png" />
        <img
          src="/herobg.png"
          alt="Shaadi Pitara Luxury Wedding Film Hero Background"
          className="w-full h-full object-cover object-center"
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />
      </picture>

      {/* Cinematic Vignette & Atmospheric Overlays */}
      {/* 1. Subtle top shadow so mobile/desktop nav items stand out crisply */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-40 pointer-events-none z-[1]"
        style={{
          background: "linear-gradient(180deg, rgba(13, 2, 4, 0.75) 0%, rgba(13, 2, 4, 0.25) 50%, transparent 100%)",
        }}
      />

      {/* 2. Soft center-weighted radial vignette for photography depth and text contrast */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none z-[2]"
        style={{
          background: "radial-gradient(ellipse at center, rgba(13, 2, 4, 0.15) 0%, rgba(13, 2, 4, 0.55) 70%, rgba(13, 2, 4, 0.85) 100%)",
        }}
      />

      {/* 3. Bottom shadow blending gracefully into the dark maroon theme */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-48 pointer-events-none z-[2]"
        style={{
          background: "linear-gradient(0deg, rgba(26, 5, 7, 0.85) 0%, rgba(26, 5, 7, 0.3) 50%, transparent 100%)",
        }}
      />

      {/* Main Centered Content Container */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 sm:px-8 pt-12 pb-8 flex flex-col items-center justify-center text-center">
        {/* Eyebrow */}
        <div className="hero-anim-eyebrow mb-4 sm:mb-6">
          <span
            className="inline-block text-[11px] sm:text-[13px] tracking-[0.32em] uppercase font-medium"
            style={{
              color: "#E5C590",
              fontFamily: "var(--font-body)",
              textShadow: "0 2px 10px rgba(0, 0, 0, 0.6)",
            }}
          >
            EVERY WEDDING HAS A STORY
          </span>
        </div>

        {/* Main Headline — Signature Editorial Style Matching Co-create Your Story */}
        <h1 className="hero-anim-headline mb-5 sm:mb-7 tracking-[-0.04em]">
          <span
            className="block text-[36px] sm:text-[56px] md:text-[72px] lg:text-[84px] leading-[0.95] font-medium"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--brand-cream)",
              textShadow: "0 4px 24px rgba(0, 0, 0, 0.7)",
            }}
          >
            We Don&apos;t Just Film
          </span>
          <span
            className="block text-[34px] sm:text-[52px] md:text-[68px] lg:text-[80px] leading-[1.0] italic font-normal mt-1"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--brand-gold)",
              textShadow: "0 0 25px rgba(212, 184, 150, 0.45), 0 2px 14px rgba(0, 0, 0, 0.8)",
            }}
          >
            Weddings. <i>We Tell Yours.</i>
          </span>
        </h1>

        {/* Cinematic Subtext */}
        <p
          className="hero-anim-subtext max-w-[560px] mx-auto text-[14px] sm:text-[16px] md:text-[18px] leading-[1.65] font-light mb-8 sm:mb-10 text-center"
          style={{
            fontFamily: "var(--font-body)",
            color: "rgba(247, 230, 204, 0.85)",
            textShadow: "0 2px 12px rgba(0, 0, 0, 0.8)",
          }}
        >
          Cinematic films shaped around the people, emotions and moments that make your celebration yours.
        </p>

        {/* Call to Action Buttons — Strictly Side-by-Side on all viewports */}
        <div className="hero-anim-buttons flex flex-row items-center justify-center gap-2.5 sm:gap-4 w-full max-w-[420px] mx-auto px-1 sm:px-0">
          <a
            href="#reels"
            onClick={(e) => {
              e.preventDefault();
              handleNav("reels", "/work");
            }}
            className="hero-btn-primary flex-1 inline-flex items-center justify-center px-3 py-3.5 sm:px-8 sm:py-4 rounded-full text-[10.5px] sm:text-[12px] tracking-[0.14em] sm:tracking-[0.2em] font-semibold uppercase text-center whitespace-nowrap cursor-pointer select-none"
          >
            WATCH OUR WORK
          </a>
          <a
            href="https://wa.me/919377150889"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-btn-secondary flex-1 inline-flex items-center justify-center px-3 py-3.5 sm:px-8 sm:py-4 rounded-full text-[10.5px] sm:text-[12px] tracking-[0.14em] sm:tracking-[0.2em] font-semibold uppercase text-center whitespace-nowrap cursor-pointer select-none"
          >
            LET&apos;S CONNECT
          </a>
        </div>
      </div>
    </section>
  );
}
