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

export default function LandingPage() {
  return (
    <div data-testid="landing-page" className="min-h-screen bg-[#FAFAFA]">
      <Navbar />
      <Hero />
      <SocialProof />
      <LanguageMarquee />
      <Features />
      <HowItWorks />
      <TryItSection />
      <Comparison />
      <Pricing />
      <Testimonials />
      <CTASection />
      <Footer />
    </div>
  );
}
