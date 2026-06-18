"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import ScrambleText from "./ScrambleText";
import styles from "./ForgeSection.module.css";

const FEATURES = [
  { rune: "ᚠ", text: "Drag-and-drop timeline with video and audio tracks" },
  { rune: "ᛏ", text: "Trim, split, and rearrange clips at any point" },
  { rune: "ᚷ", text: "Speed adjustment from 0.25x to 4.0x" },
  { rune: "ᛖ", text: "Export to MP4 or MKV with quality and resolution presets" },
  { rune: "ᚲ", text: "Saves as .galdr project files — portable JSON format" },
];

export default function ForgeSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduced = useReducedMotion();

  return (
    <motion.section
      id="forge"
      className={styles.section}
      ref={ref}
      initial={reduced ? undefined : { opacity: 0, y: 12 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
    >
      <ScrambleText
        text="ᚹ FORGE"
        as="h2"
        className={styles.heading}
        trigger={inView}
      />
      <div className={styles.card}>
        <p className={styles.body}>
          The Forge is a non-linear video editor built into galdr. Drag
          media clips from the source browser onto dual video and audio
          tracks. Trim in and out points, split at the playhead, adjust
          playback speed, and arrange your edit on a visual timeline.
        </p>
        <p className={styles.body}>
          Export finished cuts to MP4 or MKV with configurable quality
          and resolution. Projects are saved as <code>.galdr</code> files
          — a portable JSON format that preserves every detail of your
          edit.
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
      <div className={styles.timeline} aria-hidden="true">
        <div className={styles.track}>
          <span className={styles.trackLabel}>VIDEO</span>
          <div className={styles.trackBar}>
            <div className={styles.clip} style={{ width: "28%" }} />
            <div className={styles.gap} style={{ width: "8%" }} />
            <div className={styles.clip} style={{ width: "22%" }} />
            <div className={styles.gap} style={{ width: "12%" }} />
            <div className={styles.clip} style={{ width: "18%" }} />
            <div className={styles.gap} style={{ width: "12%" }} />
          </div>
        </div>
        <div className={styles.track}>
          <span className={styles.trackLabel}>AUDIO</span>
          <div className={styles.trackBar}>
            <div className={styles.clipAlt} style={{ width: "12%" }} />
            <div className={styles.gap} style={{ width: "4%" }} />
            <div className={styles.clipAlt} style={{ width: "36%" }} />
            <div className={styles.gap} style={{ width: "8%" }} />
            <div className={styles.clipAlt} style={{ width: "14%" }} />
            <div className={styles.gap} style={{ width: "26%" }} />
          </div>
        </div>
        <div className={styles.timebar}>
          <span>00:00</span>
          <span>00:10</span>
          <span>00:20</span>
          <span>00:30</span>
          <span>00:40</span>
        </div>
      </div>
    </motion.section>
  );
}