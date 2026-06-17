import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import FeaturesSection from "@/components/FeaturesSection";
import AlchemySection from "@/components/AlchemySection";
import DownloadSection from "@/components/DownloadSection";
import FooterSection from "@/components/FooterSection";
import StickyNav from "@/components/StickyNav";
import BackToTop from "@/components/BackToTop";
import { getRelease } from "@/lib/github";

export default async function Home() {
  const release = await getRelease();
  const version = release?.tag_name?.replace(/^v/i, "");

  return (
    <>
      <StickyNav />
      <main id="main">
        <HeroSection version={version} />
        <AboutSection />
        <FeaturesSection />
        <AlchemySection />
        <DownloadSection release={release} />
        <FooterSection />
      </main>
      <BackToTop />
    </>
  );
}