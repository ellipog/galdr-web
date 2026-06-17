import DownloadSectionClient from "./DownloadSectionClient";
import { type Release } from "@/lib/github";

interface Props {
  release: Release | null;
}

function getPlatforms(release: Release) {
  const version = release.tag_name.replace(/^v/i, "");
  
  // Helper to find best asset: prioritize version match, then pattern match
  const findBestAsset = (patterns: string[]) => {
    const matches = release.assets.filter((a) =>
      patterns.some((p) => a.name.toLowerCase().includes(p))
    );
    
    // 1. Try to find asset containing version string
    const versionMatch = matches.find((a) => a.name.includes(version));
    if (versionMatch) return versionMatch;
    
    // 2. Otherwise return the first match (or sort by name descending to get newest)
    return matches.sort((a, b) => b.name.localeCompare(a.name))[0];
  };

  return [
    {
      os: "Windows",
      asset: findBestAsset([".msi", "-setup.exe"]),
    },
    {
      os: "macOS",
      asset: findBestAsset([".dmg"]),
    },
    {
      os: "Linux",
      asset: findBestAsset([".appimage", ".deb"]),
    },
  ];
}

export default function DownloadSection({ release }: Props) {
  if (!release) {
    return (
      <section id="download">
        <div style={{ textAlign: "center", padding: "64px 16px" }}>
          <p>
            <a
              href="https://github.com/ellipog/galdr/releases/latest"
              target="_blank"
              rel="noopener noreferrer"
            >
              View latest release on GitHub
            </a>
          </p>
        </div>
      </section>
    );
  }

  return (
    <DownloadSectionClient
      tagName={release.tag_name}
      platforms={getPlatforms(release)}
    />
  );
}