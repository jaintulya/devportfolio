"use client";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import SmoothScroll from "@/components/SmoothScroll";
import FilmGrain from "@/components/FilmGrain";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ReelShowcase from "@/components/ReelShowcase";
import ServicesSection from "@/components/ServicesSection";
import StorySection from "@/components/StorySection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import BookCTA from "@/components/BookCTA";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getQualityTier } from "@/lib/quality";

const R3FCanvas = dynamic(
  () => import("@/components/R3FCanvas"),
  { ssr: false, loading: () => null }
);

export default function Home() {
  const [tier, setTier] = useState(null);

  useEffect(() => {
    setTier(getQualityTier());
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => ScrollTrigger.refresh(), 100);
    return () => clearTimeout(timer);
  }, []);

  // Handle direct navigation to section routes
  useEffect(() => {
    if (typeof window === "undefined") return;
    const path = window.location.pathname;
    const sectionMap = {
      "/work": "reels",
      "/services": "services",
      "/story": "story",
      "/contact": "contact"
    };
    const sectionId = sectionMap[path];
    if (sectionId) {
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: "instant" });
      }, 100);
    }
  }, []);

  const [heroActive, setHeroActive] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const vh = typeof window !== "undefined" ? window.innerHeight : 800;
      setHeroActive(window.scrollY < vh * 0.98);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Update browser tab title dynamically as sections scroll into view
  useEffect(() => {
    const SECTIONS = [
      { id: "hero-fixed-container", title: "Shaadi Pitara — Cinematic Wedding Reels & Content | Ahmedabad" },
      { id: "content-sections", title: "Selected Works — Shaadi Pitara" },
      { id: "services", title: "Services — Shaadi Pitara" },
      { id: "story", title: "Our Story — Shaadi Pitara" },
      { id: "testimonials", title: "Kind Words & Reviews — Shaadi Pitara" },
      { id: "faq", title: "FAQ — Shaadi Pitara" },
      { id: "contact", title: "Contact Us — Shaadi Pitara" },
    ];

    const handleTitleScroll = () => {
      let activeTitle = SECTIONS[0].title;
      for (const sec of SECTIONS) {
        const el = document.getElementById(sec.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.45 && rect.bottom >= 50) {
            activeTitle = sec.title;
          }
        }
      }
      if (document.title !== activeTitle) {
        document.title = activeTitle;
      }
    };

    window.addEventListener("scroll", handleTitleScroll, { passive: true });
    handleTitleScroll();
    return () => window.removeEventListener("scroll", handleTitleScroll);
  }, []);

  const showWebgl = tier !== null && tier !== "off";

  return (
    <>
      <SmoothScroll>
        {showWebgl && <R3FCanvas tier={tier} />}
        <FilmGrain />
        <Navbar />
        <main id="main-content" style={{ position: "relative", zIndex: 1, overflow: "visible" }}>
          {/* 1. Rock-solid Fixed Hero Layer: Hidden once scrolled past hero to never bleed into footer */}
          <div
            id="hero-fixed-container"
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100svh",
              zIndex: 1,
              visibility: heroActive ? "visible" : "hidden",
              pointerEvents: heroActive ? "auto" : "none",
              opacity: heroActive ? 1 : 0,
              transition: "opacity 0.2s ease, visibility 0.2s ease",
            }}
          >
            <HeroSection />
          </div>

          {/* 2. Scroll Spacer: Exactly 100svh so the page scrolls 1 viewport height while content rises */}
          <div
            id="hero-scroll-spacer"
            aria-hidden="true"
            style={{
              width: "100%",
              height: "100svh",
              visibility: "hidden",
              pointerEvents: "none",
            }}
          />

          {/* 3. Layered Sections: Normal natural scroll inside sections */}
          <div
            id="content-sections"
            className="section-layer"
            style={{
              position: "relative",
              zIndex: 10,
              backgroundColor: "#1A0507",
              boxShadow: "none",
            }}
          >
            <ReelShowcase />
          </div>

          <div
            className="section-layer"
            style={{
              position: "relative",
              zIndex: 20,
              boxShadow: "none",
            }}
          >
            <ServicesSection />
          </div>

          <div
            className="section-layer"
            style={{
              position: "relative",
              zIndex: 30,
              backgroundColor: "var(--brand-maroon-dark)",
              boxShadow: "none",
            }}
          >
            <StorySection />
          </div>

          <div
            className="section-layer"
            style={{
              position: "relative",
              zIndex: 40,
              backgroundColor: "var(--brand-maroon-dark)",
              boxShadow: "none",
            }}
          >
            <TestimonialsSection />
          </div>

          <div
            className="section-layer"
            style={{
              position: "relative",
              zIndex: 50,
              backgroundColor: "#1A0507",
              boxShadow: "none",
            }}
          >
            <FAQSection />
          </div>

          <div
            className="section-layer"
            style={{
              position: "relative",
              zIndex: 60,
              backgroundColor: "var(--brand-maroon-dark)",
              boxShadow: "none",
            }}
          >
            <ContactSection />
          </div>

          <div
            className="section-layer"
            style={{
              position: "relative",
              zIndex: 70,
              backgroundColor: "var(--brand-maroon-dark)",
              boxShadow: "none",
            }}
          >
            <Footer />
          </div>
        </main>
      </SmoothScroll>
      <BookCTA />
    </>
  );
}
