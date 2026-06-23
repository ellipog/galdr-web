import type { Metadata } from "next";
import StickyNav from "@/components/StickyNav";
import ChangelogSection from "@/components/ChangelogSection";
import FooterSection from "@/components/FooterSection";
import BackToTop from "@/components/BackToTop";
import { getAllReleases } from "@/lib/github";

export const metadata: Metadata = {
  title: "Changelog — galdr",
  description: "Release history and changelog for galdr — media incantations.",
  openGraph: {
    title: "Changelog — galdr",
    description: "Release history and changelog for galdr — media incantations.",
  },
  twitter: {
    title: "Changelog — galdr",
    description: "Release history and changelog for galdr — media incantations.",
  },
};

export default async function ChangelogPage() {
  const initialReleases = await getAllReleases();

  return (
    <>
      <StickyNav />
      <main id="main">
        <ChangelogSection initialReleases={initialReleases} />
        <FooterSection />
      </main>
      <BackToTop />
    </>
  );
}
