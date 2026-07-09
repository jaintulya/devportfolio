"use client";
import { useState, useEffect } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import FilmGrain from "@/components/FilmGrain";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ReelShowcase from "@/components/ReelShowcase";
import ServicesSection from "@/components/ServicesSection";
import StorySection from "@/components/StorySection";
import FeaturedInSection from "@/components/FeaturedInSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import BehindTheScenesSection from "@/components/BehindTheScenesSection";
import FAQSection from "@/components/FAQSection";
import InstagramFeedSection from "@/components/InstagramFeedSection";
import FinalCTASection from "@/components/FinalCTASection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (loaded) {
      // Defer refresh to allow page height and opacity transition to settle
      const timer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [loaded]);
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
        <SmoothScroll>
          <FilmGrain />
          <CustomCursor />
          <Navbar />
          <main>
            <HeroSection />
            <FeaturedInSection />
            <ReelShowcase />
            <ServicesSection />
            <StorySection />
            <BehindTheScenesSection />
            <TestimonialsSection />
            <FAQSection />
            <InstagramFeedSection />
            <FinalCTASection />
            <ContactSection />
          </main>
          <Footer />
        </SmoothScroll>
      </div>
    </>
  );
}
