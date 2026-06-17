import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import FeaturesSection from "@/components/FeaturesSection";
import AlchemySection from "@/components/AlchemySection";
import DownloadSection from "@/components/DownloadSection";
import FooterSection from "@/components/FooterSection";
import StickyNav from "@/components/StickyNav";
import BackToTop from "@/components/BackToTop";

export default function Home() {
  return (
    <>
      <StickyNav />
      <main id="main">
        <HeroSection />
        <AboutSection />
        <FeaturesSection />
        <AlchemySection />
        <DownloadSection />
        <FooterSection />
      </main>
      <BackToTop />
    </>
  );
}