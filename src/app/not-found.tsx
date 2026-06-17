import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "404 — galdr",
};

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "64px 16px",
        textAlign: "center",
      }}
    >
      <p
        style={{
          color: "var(--fg-faint)",
          fontSize: "12px",
          marginBottom: "32px",
          letterSpacing: "0.3em",
        }}
        aria-hidden="true"
      >
        ᚠ ᚢ ᚦ ᚨ ᚱ ᚲ ᚷ ᚹ ᚺ ᚾ ᛁ ᛃ ᛇ ᛈ ᛉ ᛊ ᛏ ᛒ ᛖ ᛗ ᛚ ᛝ ᛟ ᛞ
      </p>
      <h1
        style={{
          fontSize: "4rem",
          textTransform: "uppercase",
          letterSpacing: "0.15em",
          marginBottom: "24px",
        }}
      >
        ᚠ 404
      </h1>
      <p
        style={{
          fontSize: "14px",
          color: "var(--fg-dim)",
          marginBottom: "48px",
          maxWidth: "480px",
          lineHeight: 1.6,
        }}
      >
        The incantation failed — this page does not exist.
      </p>
      <Link
        href="/"
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          background: "var(--fg)",
          color: "var(--bg)",
          border: "1px solid var(--fg)",
          padding: "12px 24px",
          fontSize: "14px",
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          textDecoration: "none",
          minHeight: "44px",
          minWidth: "44px",
        }}
      >
        ᛏ RETURN HOME
      </Link>
      <p
        style={{
          marginTop: "64px",
          fontSize: "11px",
          color: "var(--fg-faint)",
        }}
      >
        &copy; 2026 Ellio. All rights reserved.
      </p>
    </div>
  );
}