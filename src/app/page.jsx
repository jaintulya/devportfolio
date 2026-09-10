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

  // Monitor hero visibility efficiently using IntersectionObserver (zero scroll lag)
  useEffect(() => {
    const spacer = document.getElementById("hero-scroll-spacer");
    if (!spacer) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setHeroActive(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );
    observer.observe(spacer);
    return () => observer.disconnect();
  }, []);

  // Update browser tab title dynamically using IntersectionObserver (eliminates synchronous getBoundingClientRect layout thrashing)
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

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const found = SECTIONS.find((s) => s.id === entry.target.id);
            if (found && document.title !== found.title) {
              document.title = found.title;
            }
          }
        });
      },
      { rootMargin: "-30% 0px -50% 0px", threshold: 0 }
    );

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // All homepage sections have 100% solid opaque backgrounds; disable hidden background WebGL loop to free GPU/CPU
  const showWebgl = false;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How far in advance should we book our wedding dates?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Reach out as soon as your dates are confirmed. While we don't enforce artificial booking windows, early conversations help us understand your vision and ensure we can craft the story your wedding deserves.",
        },
      },
      {
        '@type': 'Question',
        name: 'Do you travel outside Ahmedabad for destination weddings?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, absolutely. While Ahmedabad is our creative home base, we frequently shoot celebrations across Udaipur, Jaipur, Goa, Mumbai, and internationally. Travel and accommodation are handled transparently.',
        },
      },
      {
        '@type': 'Question',
        name: 'When do we receive our wedding reels and clips?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Your first cinematic teaser and highlight reels are delivered within 24 to 48 hours while the celebration energy is still electric. Complete curated reels and organized archives of all footage are finalized within 5 to 7 days.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do you coordinate with our main photo and video team?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Seamlessly and respectfully. We specialize in agile, mobile-first wedding content creation — capturing unscripted behind-the-scenes intimacies and cinematic micro-moments. We coordinate with your primary photographers ahead of time.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can we curate our music choices and aesthetic preferences?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Absolutely. Before the wedding, we conduct a pre-event creative session to map your aesthetic preferences — whether vintage Bollywood, soulful classical, or modern acoustic — ensuring your films reflect your authentic vibe.',
        },
      },
    ],
  };

  const reviewsSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://www.shaadipitara.in/#business',
    name: 'Shaadi Pitara',
    review: [
      {
        '@type': 'Review',
        author: { '@type': 'Person', name: 'Priya & Arjun' },
        reviewBody: "Devarsh captured our wedding day in the most magical way possible. Every time we watch the reels, we're transported back to those exact moments. His attention to detail and ability to capture emotions is extraordinary.",
        contentLocation: { '@type': 'Place', name: 'Udaipur, Rajasthan' },
      },
      {
        '@type': 'Review',
        author: { '@type': 'Person', name: 'Sofia & Marco' },
        reviewBody: 'We couldn’t be happier with the films Devarsh created for us. He was professional, friendly, and made everyone feel comfortable. The final product was beyond our expectations.',
        contentLocation: { '@type': 'Place', name: 'Tuscany, Italy' },
      },
      {
        '@type': 'Review',
        author: { '@type': 'Person', name: 'Aisha & James' },
        reviewBody: 'Devarsh’s work speaks for itself. Our wedding reels have received so many compliments from friends and family. He truly understands how to tell a story through his videos.',
        contentLocation: { '@type': 'Place', name: 'Goa, India' },
      },
      {
        '@type': 'Review',
        author: { '@type': 'Person', name: 'Tanvi & Siddharth' },
        reviewBody: 'The way Devarsh captured our traditional ceremonies with such cinematic beauty left everyone speechless. Our families still watch the reels at every gathering.',
        contentLocation: { '@type': 'Place', name: 'Jodhpur, Rajasthan' },
      },
      {
        '@type': 'Review',
        author: { '@type': 'Person', name: 'Meera & Dev' },
        reviewBody: 'From our first call to the final delivery, Devarsh was incredibly attentive to our vision. The same-day reel he sent after our Sangeet had our entire family in tears.',
        contentLocation: { '@type': 'Place', name: 'Ahmedabad, Gujarat' },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewsSchema) }}
      />
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
