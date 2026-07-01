"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import ScrambleText from "./ScrambleText";
import Divider from "./Divider";
import styles from "./FooterSection.module.css";

export default function FooterSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduced = useReducedMotion();

  return (
    <motion.footer
      id="colophon"
      className={styles.section}
      ref={ref}
      initial={reduced ? undefined : { opacity: 0, y: 12 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
    >
      <Divider />
      <ScrambleText
        text="ᛟ COLOPHON"
        as="h3"
        className={styles.heading}
        trigger={inView}
      />
      <div className={styles.body}>
        <p>Built with Tauri, React, and Rust</p>
        <p>
          <a
            href="https://github.com/Aaen-Studios/galdr"
            target="_blank"
            rel="noopener noreferrer"
          >
            github.com/Aaen-Studios/galdr
          </a>
        </p>
      </div>
      <p className={styles.copyright}>
        &copy; 2026 Aaenz. All rights reserved.
      </p>
    </motion.footer>
  );
}