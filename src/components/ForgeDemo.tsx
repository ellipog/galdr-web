"use client";

import { useState, useEffect } from "react";
import { useReducedMotion } from "framer-motion";
import styles from "./ForgeDemo.module.css";

/*
 * Single ASCII scene of the Forge timeline editor.
 * The only animation is a progress bar that fills 0→99→0 on the status line.
 * All lines are normalised to the same width so box-drawing borders align.
 */

const TOP = "┌───────────── Forge Timeline ─────────────┐";
const BOTTOM = "└──────────────────────────────────────────┘";

/* Lines between borders — content width must be 42. */
const STATIC_LINES = [
  "│  V │▓▓▓▓▓▓▓▓░░░░░░│▓▓▓▓▓▓░░░░░░│▓▓▓▓░░░░ │",
  "│  A │▓▓▓▓▓▓░░░░░░│▓▓▓▓▓▓▓▓▓▓░░░░░░│░░░░░░ │",
  "│  00:00          00:20          00:40     │",
];

/** Build the progress line: `═══▶═══ processing... ████████░░  98%` */
function statusLine(progress: number): string {
  const filled = Math.floor(progress / 10); // 0–9
  const bar = "█".repeat(filled) + "░".repeat(10 - filled);
  const pct = String(progress).padStart(2);
  return `│  ═══▶═══ processing... ${bar} ${pct}%    │`;
}

/** Pad all lines to the same width so borders line up. */
function normalise(lines: string[]): string[] {
  const max = Math.max(...lines.map((l) => l.length));
  return lines.map((l) => l.padEnd(max));
}

export default function ForgeDemo() {
  const [progress, setProgress] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const timer = setInterval(() => {
      setProgress((p) => (p + 1) % 100);
    }, 100);
    return () => clearInterval(timer);
  }, [reduced]);

  const lines = normalise([
    TOP,
    ...STATIC_LINES,
    statusLine(reduced ? 0 : progress),
    BOTTOM,
  ]);

  return (
    <div className={styles.container} aria-label="Forge timeline editor demo">
      <div className={styles.window}>
        <pre className={styles.ascii}>{lines.join("\n")}</pre>
      </div>
    </div>
  );
}
