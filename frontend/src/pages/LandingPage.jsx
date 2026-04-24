import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import SocialProof from "@/components/landing/SocialProof";
import LanguageMarquee from "@/components/landing/LanguageMarquee";
import Features from "@/components/landing/Features";
import HowItWorks from "@/components/landing/HowItWorks";
import TryItSection from "@/components/landing/TryItSection";
import Comparison from "@/components/landing/Comparison";
import Pricing from "@/components/landing/Pricing";
import Testimonials from "@/components/landing/Testimonials";
import CTASection from "@/components/landing/CTASection";
import Footer from "@/components/landing/Footer";

function ParallaxSection({ children, speed = 0.15, className = "" }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [speed * -100, speed * 100]);
  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }}>
        {children}
      </motion.div>
    </div>
  );
}

export default function LandingPage() {
  return (
    <div data-testid="landing-page" className="min-h-screen relative bg-[#FAFAFA]">
      {/* Aurora background fixed layer - we make it a separate sibling so its overflow: hidden doesn't break sticky scroll */}
      <div className="fixed inset-0 pointer-events-none aurora z-0" />
      
      <div className="absolute top-0 inset-x-0 w-full h-[600px] bg-gradient-to-b from-[#25D366]/10 to-transparent pointer-events-none opacity-50 z-0" />

      <div className="relative z-10 w-full">
        <Navbar />
        <Hero />
        <SocialProof />
        <LanguageMarquee />

        {/* Features with parallax + ambient glow */}
        <div className="relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-b from-[#25D366]/8 to-transparent blur-3xl rounded-full pointer-events-none" />
          <ParallaxSection speed={0.05}>
            <Features />
          </ParallaxSection>
        </div>

        <HowItWorks />

        {/* TryIt — tight gap, with side glow */}
        <div className="relative -mt-8">
          <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-l from-[#25D366]/6 to-transparent blur-3xl rounded-full pointer-events-none" />
          <TryItSection />
        </div>

        <ParallaxSection speed={0.08}>
          <Comparison />
        </ParallaxSection>

        {/* Pricing with glow */}
        <div className="relative">
          <div className="absolute top-0 left-1/4 w-[500px] h-[400px] bg-gradient-to-br from-[#25D366]/6 to-transparent blur-3xl rounded-full pointer-events-none" />
          <Pricing />
        </div>

        <ParallaxSection speed={0.06}>
          <Testimonials />
        </ParallaxSection>

        <CTASection />
        <Footer />
      </div>
    </div>
  );
}
