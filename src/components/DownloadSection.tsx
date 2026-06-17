import DownloadSectionClient from "./DownloadSectionClient";
import { matchAsset, type Release } from "@/lib/github";

interface Props {
  release: Release | null;
}

function getPlatforms(release: Release) {
  return [
    {
      os: "Windows",
      asset: matchAsset(release.assets, [".msi", "-setup.exe"]),
    },
    {
      os: "macOS",
      asset: matchAsset(release.assets, [".dmg"]),
    },
    {
      os: "Linux",
      asset: matchAsset(release.assets, [".appimage", ".deb"]),
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