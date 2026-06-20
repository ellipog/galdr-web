"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import ScrambleText from "./ScrambleText";
import styles from "./WatchSection.module.css";

const FEATURES = [
  { rune: "ᚠ", text: "Monitor any folder for incoming media files" },
  { rune: "ᛏ", text: "Auto-convert with saved presets on file arrival" },
  { rune: "ᚨ", text: "Queue files for manual review before converting" },
  { rune: "ᚷ", text: "Debounce engine waits for writes to settle" },
  { rune: "ᛟ", text: "Runs in the system tray — even with the window closed" },
  { rune: "ᛖ", text: "Filter by extension, control output quality and format" },
];

const FLOW_LINES = [
  { time: "", label: "DROP", arrow: true },
  { time: "", label: "DETECT", arrow: true },
  { time: "", label: "SETTLE", arrow: true },
  { time: "", label: "CONVERT", arrow: false },
];

export default function WatchSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduced = useReducedMotion();

  return (
    <motion.section
      id="watch"
      className={styles.section}
      ref={ref}
      initial={reduced ? undefined : { opacity: 0, y: 12 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
    >
      <ScrambleText
        text="ᚱ WATCH"
        as="h2"
        className={styles.heading}
        trigger={inView}
      />
      <div className={styles.card}>
        <p className={styles.body}>
          Designate folders for galdr to monitor. When new files appear —
          dropped from a camera, exported from another tool, or synced from
          the cloud — galdr detects them, waits for the write to finish, and
          either converts them automatically or queues them for review.
        </p>
        <p className={styles.body}>
          The watcher runs as a background daemon via the system tray.
          Close the window and it keeps working. Pause from the tray
          menu, or let it run unattended.
        </p>
        <div className={styles.featureList}>
          {FEATURES.map((f) => (
            <p key={f.rune} className={styles.featureItem}>
              <span className={styles.featureRune} aria-hidden="true">
                {f.rune}
              </span>
              {f.text}
            </p>
          ))}
        </div>
      </div>
      <div className={styles.flow} aria-hidden="true">
        <div className={styles.flowLabel}>INCANTATION PIPELINE</div>
        <div className={styles.flowTrack}>
          {FLOW_LINES.map((step, i) => (
            <div key={step.label} className={styles.flowStep}>
              <div className={styles.flowNode}>{step.label}</div>
              {step.arrow && <div className={styles.flowArrow}>{"-"}</div>}
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
