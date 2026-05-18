"use client";

import { Navbar } from "@/components/landing/navbar";
import { HeroSection } from "@/components/landing/hero-section";
import { FeaturesSection } from "@/components/landing/features-section";
import { WorkflowSection } from "@/components/landing/workflow-section";
import { DemoSection } from "@/components/landing/demo-section";
import { StatsSection } from "@/components/landing/stats-section";
import { TestimonialsSection } from "@/components/landing/testimonials-section";
import { CTASection } from "@/components/landing/cta-section";
import { Footer } from "@/components/landing/footer";

import type { AuthDiagnostics } from "@/features/auth/services/client";

type LandingPageProps = {
  diagnostics?: AuthDiagnostics | null;
  authError?: string | null;
  onSignIn?: () => void;
};

export function LandingPage({ diagnostics, authError, onSignIn }: LandingPageProps) {
  return (
    <div className="relative min-h-screen bg-[#050816] landing-page">
      {/* Global ambient orbs — fixed to avoid scroll jank */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-[#7B61FF]/6 blur-[180px]" />
        <div className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full bg-[#00D9FF]/5 blur-[160px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[#FF4FD8]/4 blur-[140px]" />
        {/* Noise texture */}
        <div className="noise-overlay" />
      </div>

      {/* Page content */}
      <div className="relative z-10">
        <Navbar onSignIn={onSignIn} />
        <main>
          <HeroSection onSignIn={onSignIn} diagnostics={diagnostics} authError={authError} />
          <StatsSection />
          <FeaturesSection />
          <WorkflowSection />
          <DemoSection />
          <TestimonialsSection />
          <CTASection onSignIn={onSignIn} />
        </main>
        <Footer />
      </div>
    </div>
  );
}
