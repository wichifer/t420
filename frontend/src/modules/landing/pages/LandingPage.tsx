import Hero from "../components/Hero";
import Features from "../components/Features";
import DashboardPreview from "../components/DashboardPreview";
import CTA from "../components/CTA";
import Footer from "../components/Footer";

export default function LandingPage() {
  return (
    <main className="min-h-screen">
      <Hero />

      <Features />

      <DashboardPreview />

      <CTA />

      <Footer />
    </main>
  );
}