"use client";

import { motion, useScroll, useReducedMotion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import styles from "./BackToTop.module.css";

export default function BackToTop() {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (y) => {
      setVisible(y > window.innerHeight * 2);
    });
    return () => unsubscribe();
  }, [scrollY]);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (reduced) {
    if (!visible) return null;
    return (
      <button className={styles.button} onClick={handleClick} aria-label="Back to top">
        ᛏ
      </button>
    );
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          className={styles.button}
          onClick={handleClick}
          aria-label="Back to top"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.2 }}
          whileHover={{ scale: 1.05 }}
        >
          ᛏ
        </motion.button>
      )}
    </AnimatePresence>
  );
}