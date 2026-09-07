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

  const showWebgl = tier !== null && tier !== "off";

  return (
    <>
      <SmoothScroll>
        {showWebgl && <R3FCanvas tier={tier} />}
        <FilmGrain />
        <Navbar />
        <main id="main-content" style={{ position: "relative", zIndex: 1 }}>
          <HeroSection />
          <ReelShowcase />
          <ServicesSection />
          <StorySection />
          <TestimonialsSection />
          <FAQSection />
          <ContactSection />
        </main>
        <Footer />
      </SmoothScroll>
      <BookCTA />
    </>
  );
}
