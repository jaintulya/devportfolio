"use client";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import LoadingScreen from "@/components/LoadingScreen";
import SmoothScroll from "@/components/SmoothScroll";
import FilmGrain from "@/components/FilmGrain";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ReelShowcase from "@/components/ReelShowcase";
import ServicesSection from "@/components/ServicesSection";
import StorySection from "@/components/StorySection";
import BehindTheScenesSection from "@/components/BehindTheScenesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import FinalCTASection from "@/components/FinalCTASection";
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
  const [loaded, setLoaded] = useState(false);
  const [tier, setTier] = useState(null);

  useEffect(() => {
    setTier(getQualityTier());
  }, []);

  useEffect(() => {
    if (loaded) {
      const timer = setTimeout(() => ScrollTrigger.refresh(), 800);
      return () => clearTimeout(timer);
    }
  }, [loaded]);

  const showWebgl = tier !== null && tier !== "off";

  return (
    <>
      {!loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}
      <div
        style={{
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.6s ease",
          pointerEvents: loaded ? "auto" : "none",
        }}
      >
        {loaded && showWebgl && <R3FCanvas tier={tier} />}

        <SmoothScroll>
          <FilmGrain />
          <Navbar />
          <main id="main-content" style={{ position: "relative", zIndex: 1 }}>
            <HeroSection />
            <ReelShowcase />
            <ServicesSection />
            <StorySection />
            <BehindTheScenesSection />
            <TestimonialsSection />
            <FAQSection />
            <FinalCTASection />
            <ContactSection />
          </main>
          <Footer />
        </SmoothScroll>
        <BookCTA />
      </div>
    </>
  );
}
