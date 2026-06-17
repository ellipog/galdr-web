"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import ScrambleText from "./ScrambleText";
import styles from "./AboutSection.module.css";

export default function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduced = useReducedMotion();

  return (
    <motion.section
      id="about"
      className={styles.section}
      ref={ref}
      initial={reduced ? undefined : { opacity: 0, y: 12 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
    >
      <ScrambleText
        text="ᚨ ABOUT"
        as="h2"
        className={styles.heading}
        trigger={inView}
      />
      <div className={styles.card}>
        <p className={styles.cardBody}>
          galdr is a desktop GUI wrapper around FFmpeg. It converts
          and manipulates video, audio, and image files with a terminal
          aesthetic and runic theme.
        </p>
        <p className={styles.cardBody}>
          Every conversion is an incantation. Raw media in, enchanted
          media out.
        </p>
        <div className={styles.terminalLines}>
          <p className={styles.terminalLine}>
            {">"} Built with Tauri, React, and Rust
          </p>
          <p className={styles.terminalLine}>
            {">"} Uses FFmpeg under the hood
          </p>
          <p className={styles.terminalLine}>
            {">"} Free and open source
          </p>
        </div>
      </div>
    </motion.section>
  );
}