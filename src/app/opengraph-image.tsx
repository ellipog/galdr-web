import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export const dynamic = "force-static";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#000",
          color: "#c8c8c8",
          fontFamily: "monospace",
        }}
      >
        <div
          style={{
            fontSize: 96,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: "#c8c8c8",
            marginBottom: 16,
          }}
        >
          galdr
        </div>
        <div
          style={{
            fontSize: 32,
            textTransform: "uppercase",
            letterSpacing: "0.15em",
            color: "#6a6a6a",
          }}
        >
          media incantations
        </div>
      </div>
    ),
    { ...size }
  );
}