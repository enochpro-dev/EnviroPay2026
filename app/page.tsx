"use client";

import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
// import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { PhilosophySection } from "@/components/sections/PhilosophySection";
import { WhySection } from "@/components/sections/WhySection";
import { ProtocolSection } from "@/components/sections/ProtocolSection";
import { AudienceSections } from "@/components/sections/AudienceSections";
import { GetInvolvedSection } from "@/components/sections/GetInvolvedSection";
import { ContactSection } from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F0F4F8] text-[#1C1C1C] font-sans selection:bg-[#00C9A7]/20 selection:text-[#0B132B]">
      <Header />

      <main>
        {/* Hero — "The Opening Shot" */}
        <HeroSection />

        {/* Protocol — "EnviroPay Mobile App" */}
        <ProtocolSection />

        {/* Features — "How EnviroPay Works" — hidden */}
        {/* <FeaturesSection /> */}

        {/* Philosophy — "The Manifesto" */}
        <PhilosophySection />

        {/* Audience Sections — For Consumers, Retailers, Partners */}
        <AudienceSections />

        {/* Mission + Team — "Why We Exist" */}
        <WhySection />

        {/* Get Involved — Pre-launch CTAs */}
        <GetInvolvedSection />

        {/* Contact Form */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}


