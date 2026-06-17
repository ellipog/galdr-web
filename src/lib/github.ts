export interface Asset {
  name: string;
  browser_download_url: string;
  size: number;
}

export interface Release {
  tag_name: string;
  html_url: string;
  assets: Asset[];
}

export async function getRelease(): Promise<Release | null> {
  try {
    const headers: Record<string, string> = {};
    const token = process.env.GITHUB_TOKEN;
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const res = await fetch(
      "https://api.github.com/repos/ellipog/galdr/releases/latest",
      { headers, cache: "no-store" }
    );
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export function matchAsset(
  assets: Asset[],
  patterns: string[]
): Asset | undefined {
  return assets.find((a) =>
    patterns.some((p) => a.name.toLowerCase().includes(p))
  );
}