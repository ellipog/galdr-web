"use client";

import { motion, useReducedMotion, useScroll } from "framer-motion";
import { useState, useEffect } from "react";
import ScrambleText from "./ScrambleText";
import Button from "./Button";
import Divider from "./Divider";
import styles from "./HeroSection.module.css";

const ASCII_MOCKUP = [
  "┌─────────────────────────────────┐",
  "│  ᚷᚨᛚᛞᚱ                     _ □ X │",
  "├─────────────────────────────────┤",
  "│                                 │",
  "│   INPUT    input.mp4            │",
  "│   FORMAT   [ WebM  ⌄ ]           │",
  "│   QUALITY  ████████░░░ 73%      │",
  "│   ─────────────────────────     │",
  "│   > ffmpeg -i input.mp4 ...     │",
  "│   ᚲ casting web | ██████ 67%         │",
  "│                                 │",
  "└─────────────────────────────────┘",
];

const RUNIC_ALPHABET = "ᚠ ᚢ ᚦ ᚨ ᚱ ᚲ ᚷ ᚹ ᚺ ᚾ ᛁ ᛃ ᛇ ᛈ ᛉ ᛊ ᛏ ᛒ ᛖ ᛗ ᛚ ᛝ ᛟ ᛞ";

interface Props {
  version?: string;
}

export default function HeroSection({ version }: Props) {
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();
  const [hintHidden, setHintHidden] = useState(false);

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (y) => {
      if (y > window.innerHeight * 0.8) setHintHidden(true);
    });
    return () => unsubscribe();
  }, [scrollY]);

  const scrollHint = (
    <p className={styles.scrollHint} aria-hidden="true">
      ᚨ scroll down
    </p>
  );

  if (reduced) {
    return (
      <section className={styles.section}>
        <p className={styles.runicLine} aria-hidden="true">
          {RUNIC_ALPHABET}
        </p>
        <h1 className={styles.heading}>galdr</h1>
        <p className={styles.tagline}>media incantations</p>
        <div className={styles.mockup}>
          {ASCII_MOCKUP.map((line, i) => (
            <div key={i} className={styles.mockupLine}>
              {line}
            </div>
          ))}
        </div>
        <div className={styles.actions}>
          <Button href="#download">ᚷ DOWNLOAD</Button>
          {version && (
            <span className={styles.versionBadge}>v{version}</span>
          )}
          <a
            href="https://github.com/ellipog/galdr"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.githubLink}
          >
            VIEW ON GITHUB
          </a>
        </div>
        <Divider />
        {!hintHidden && scrollHint}
      </section>
    );
  }

  return (
    <section className={styles.section}>
      <p className={styles.runicLine} aria-hidden="true">
        {RUNIC_ALPHABET}
      </p>
      <ScrambleText text="galdr" as="h1" className={styles.heading} load />
      <motion.p
        className={styles.tagline}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        media incantations
      </motion.p>
      <div className={styles.mockup}>
        {ASCII_MOCKUP.map((line, i) => (
          <div key={i} className={styles.mockupLine}>
            {line}
          </div>
        ))}
      </div>
      <div className={styles.actions}>
        <Button href="#download">ᚷ DOWNLOAD</Button>
        {version && (
          <span className={styles.versionBadge}>v{version}</span>
        )}
        <a
          href="https://github.com/ellipog/galdr"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.githubLink}
        >
          VIEW ON GITHUB
        </a>
      </div>
      <Divider />
      {!hintHidden && scrollHint}
    </section>
  );
}