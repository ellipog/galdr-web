"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import styles from "./StickyNav.module.css";

const LINKS = [
  { label: "ABOUT", href: "/#about" },
  { label: "SPELLS", href: "/#spells" },
  { label: "FORGE", href: "/#forge" },
  { label: "SUBTITLES", href: "/#subtitles" },
  { label: "WATCH", href: "/#watch" },
  { label: "DOWNLOAD", href: "/#download" },
  { label: "CHANGELOG", href: "/changelog" },
];

export default function StickyNav() {
  const { scrollY } = useScroll();
  const reduced = useReducedMotion();
  const opacity = useTransform(scrollY, [0, 400], [0, 1]);
  const display = reduced ? "none" : undefined;

  return (
    <motion.nav
      className={styles.nav}
      style={reduced ? { opacity: 1, display: "none" } : { opacity }}
    >
      <span className={styles.logo}>galdr</span>
      <div className={styles.links}>
        {LINKS.map((link) => (
          <a key={link.href} href={link.href} className={styles.link}>
            {link.label}
          </a>
        ))}
      </div>
    </motion.nav>
  );
}