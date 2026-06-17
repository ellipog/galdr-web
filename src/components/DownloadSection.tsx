import DownloadSectionClient from "./DownloadSectionClient";

interface Asset {
  name: string;
  browser_download_url: string;
  size: number;
}

interface Release {
  tag_name: string;
  html_url: string;
  assets: Asset[];
}

async function getRelease(): Promise<Release | null> {
  try {
    const res = await fetch(
      "https://api.github.com/repos/ellipog/galdr/releases/latest",
      { cache: "no-store" }
    );
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

function matchAsset(assets: Asset[], patterns: string[]): Asset | undefined {
  return assets.find((a) =>
    patterns.some((p) => a.name.toLowerCase().includes(p))
  );
}

export default async function DownloadSection() {
  const release = await getRelease();

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

  const platforms = [
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

  return (
    <DownloadSectionClient
      tagName={release.tag_name}
      platforms={platforms}
    />
  );
}