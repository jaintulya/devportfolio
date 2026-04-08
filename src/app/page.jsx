'use client';
import { useState } from 'react';
import LoadingScreen from '@/components/LoadingScreen';
import SmoothScroll from '@/components/SmoothScroll';
import CustomCursor from '@/components/CustomCursor';
import FilmGrain from '@/components/FilmGrain';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ReelShowcase from '@/components/ReelShowcase';
import ServicesSection from '@/components/ServicesSection';
import StorySection from '@/components/StorySection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  return (
    <>
      {!loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}
      <div style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.6s ease', pointerEvents: loaded ? 'auto' : 'none' }}>
        <SmoothScroll>
          <FilmGrain />
          <CustomCursor />
          <Navbar />
          <main>
            <HeroSection />
            <ReelShowcase />
            <ServicesSection />
            <StorySection />
            <ContactSection />
          </main>
          <Footer />
        </SmoothScroll>
      </div>
    </>
  );
}
