"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import ScrambleText from "./ScrambleText";
import styles from "./SubtitlesSection.module.css";

const FEATURES = [
  { rune: "ᚠ", text: "Auto-transcription via local Whisper models — nothing leaves your machine" },
  { rune: "ᛏ", text: "Hardcode subtitles into video (burn-in)" },
  { rune: "ᚨ", text: "Mux subtitles as soft tracks or pull existing ones out for editing" },
  { rune: "ᚷ", text: "Live-edit with video preview — scrub, tweak timing and text, see changes in real time" },
];

export default function SubtitlesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduced = useReducedMotion();

  return (
    <motion.section
      id="subtitles"
      className={styles.section}
      ref={ref}
      initial={reduced ? undefined : { opacity: 0, y: 12 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
    >
      <ScrambleText
        text="ᛊ SUBTITLES"
        as="h2"
        className={styles.heading}
        trigger={inView}
      />
      <div className={styles.card}>
        <p className={styles.body}>
          Generate subtitles from any media file using local Whisper models.
          No cloud, no API keys — everything runs on your machine.
        </p>
        <p className={styles.body}>
          Burn subtitles into video, mux them as soft tracks, or extract
          existing subtitles for editing. The live editor lets you scrub
          through the video, tweak timing and text, and see changes in
          real time.
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
    </motion.section>
  );
}
