"use client";

import { motion } from "framer-motion";
import { type ReactNode } from "react";
import styles from "./Button.module.css";

interface Props {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
}

export default function Button({ children, href, onClick, className }: Props) {
  const cls = `${styles.button} ${className || ""}`;

  if (href) {
    return (
      <motion.a
        href={href}
        className={cls}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      className={cls}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.button>
  );
}