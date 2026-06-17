"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import ScrambleText from "./ScrambleText";
import Button from "./Button";
import styles from "./DownloadSection.module.css";

interface PlatformInfo {
  os: string;
  asset: { name: string; browser_download_url: string; size: number } | undefined;
}

interface Props {
  tagName: string;
  platforms: PlatformInfo[];
}

function formatSize(bytes: number): string {
  return (bytes / 1024 / 1024).toFixed(1) + " MB";
}

export default function DownloadSectionClient({
  tagName,
  platforms,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduced = useReducedMotion();

  return (
    <motion.section
      id="download"
      className={styles.section}
      ref={ref}
      initial={reduced ? undefined : { opacity: 0, y: 12 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
    >
      <ScrambleText
        text="ᚷ DOWNLOAD"
        as="h2"
        className={styles.heading}
        trigger={inView}
      />
      <p className={styles.subtitle}>Latest release: {tagName}</p>
      <motion.div
        className={styles.grid}
        variants={
          reduced
            ? undefined
            : {
                hidden: {},
                visible: {
                  transition: { staggerChildren: 0.15 },
                },
              }
        }
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        {platforms.map((platform) => (
          <motion.div
            key={platform.os}
            className={`${styles.card} ${!platform.asset ? styles.disabled : ""}`}
            variants={
              reduced
                ? undefined
                : {
                    hidden: { opacity: 0, y: 12 },
                    visible: { opacity: 1, y: 0 },
                  }
            }
          >
            <p className={styles.osName}>{platform.os}</p>
            {platform.asset ? (
              <>
                <p className={styles.fileName}>{platform.asset.name}</p>
                <Button href={platform.asset.browser_download_url}>
                  ᚷ DOWNLOAD
                </Button>
                <p className={styles.fileSize}>
                  {formatSize(platform.asset.size)}
                </p>
              </>
            ) : (
              <>
                <p className={styles.notAvailable}>Not available yet</p>
                <div className={styles.spacer} />
              </>
            )}
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
}