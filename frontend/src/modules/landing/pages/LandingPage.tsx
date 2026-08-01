import { Navbar } from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import { DashboardPreview } from "../components/DashboardPreview";
import { CTA } from "../components/CTA";
import Footer from "../components/Footer";

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <DashboardPreview />
      <CTA />
      <Footer />
    </>
  );
}