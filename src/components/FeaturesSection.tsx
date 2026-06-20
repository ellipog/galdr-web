"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import ScrambleText from "./ScrambleText";
import styles from "./FeaturesSection.module.css";

const FEATURES = [
  {
    rune: "ᚲ",
    heading: "CONVERT",
    description:
      "Single or batch conversion between any formats FFmpeg supports.",
    incantation: "> convert *.mp4 --to mkv",
  },
  {
    rune: "ᛏ",
    heading: "COMPRESS",
    description:
      "Quality-controlled compression with live size estimation.",
    incantation: "> compress input.mp4 --quality 60",
  },
  {
    rune: "ᚨ",
    heading: "INSPECT",
    description:
      "Deep media inspection via ffprobe. Codec, resolution, bitrate.",
    incantation: "> inspect input.mkv",
  },
  {
    rune: "ᚷ",
    heading: "TRIM",
    description:
      "Cut, crop, rotate, resize, speed up, slow down. All the fundamentals.",
    incantation:
      "> trim input.mp4 --start 00:01:30 --end 00:02:15",
  },
  {
    rune: "ᚠ",
    heading: "RUNE TAGS",
    description:
      "Save presets as named runes. Reusable incantations.",
    incantation: "> rune-save ᛏ youtube-h264",
  },
  {
    rune: "ᛟ",
    heading: "COMPARE",
    description:
      "Side-by-side before/after preview. See the spell take effect.",
    incantation: "> compare input.mp4 output.mp4",
  },
];

export default function FeaturesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduced = useReducedMotion();

  return (
    <motion.section
      id="spells"
      className={styles.section}
      ref={ref}
      initial={reduced ? undefined : { opacity: 0, y: 12 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
    >
      <ScrambleText
        text="ᚲ SPELLS"
        as="h2"
        className={styles.heading}
        trigger={inView}
      />
      <motion.div
        className={styles.grid}
        variants={
          reduced
            ? undefined
            : {
                hidden: {},
                visible: {
                  transition: { staggerChildren: 0.1 },
                },
              }
        }
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        {FEATURES.map((feature) => (
          <motion.div
            key={feature.heading}
            className={styles.card}
            variants={
              reduced
                ? undefined
                : {
                    hidden: { opacity: 0, y: 12 },
                    visible: { opacity: 1, y: 0 },
                  }
            }
          >
            <span className={styles.rune} aria-hidden="true">
              {feature.rune}
            </span>
            <div className={styles.cardHeader}>
              <ScrambleText
                text={feature.heading}
                as="h3"
                className={styles.cardHeading}
                hover
              />
            </div>
            <p className={styles.cardDescription}>
              {feature.description}
            </p>
            <p className={styles.incantation}>
              {feature.incantation}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
}