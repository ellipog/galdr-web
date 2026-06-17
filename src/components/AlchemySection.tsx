"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import ScrambleText from "./ScrambleText";
import styles from "./AlchemySection.module.css";

export default function AlchemySection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduced = useReducedMotion();

  return (
    <motion.section
      id="alchemy"
      className={styles.section}
      ref={ref}
      initial={reduced ? undefined : { opacity: 0, y: 12 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
    >
      <ScrambleText
        text="ᚲ COMMAND ALCHEMY"
        as="h2"
        className={styles.heading}
        trigger={inView}
      />
      <div className={styles.card}>
        <p className={styles.body}>
          The FFmpeg command builds in real time as you tweak settings.
          Every slider, dropdown, and toggle updates the command string
          immediately. No more man-page spelunking.
        </p>
        <div className={styles.terminalBlock}>
          <span className={styles.prompt}>{">"}</span> ffmpeg -i input.mp4 -c:v
          libx264 -crf 23 -c:a aac -b:a 128k output.mp4
        </div>
      </div>
    </motion.section>
  );
}