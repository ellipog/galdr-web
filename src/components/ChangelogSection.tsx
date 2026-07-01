"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useInView } from "framer-motion";
import { type Release } from "@/lib/github";
import { getReleasesPage } from "@/lib/github";
import { renderMarkdown } from "@/lib/markdown";
import ScrambleText from "./ScrambleText";
import styles from "./ChangelogSection.module.css";

interface Props {
  initialReleases: Release[];
}

function formatDate(iso: string): string {
  try {
    const d = new Date(iso);
    const year = d.getUTCFullYear();
    const month = String(d.getUTCMonth() + 1).padStart(2, "0");
    const day = String(d.getUTCDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  } catch {
    return iso;
  }
}

export default function ChangelogSection({ initialReleases }: Props) {
  // Guard against undefined (dev-server edge case on first compile)
  const safeReleases = initialReleases ?? [];

  const [releases, setReleases] = useState<Release[]>(safeReleases);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(safeReleases.length >= 5);

  const pageRef = useRef(1);
  const loadingRef = useRef(false);
  const hasMoreRef = useRef(hasMore);

  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });
  const reduced = useReducedMotion();

  // Sentinel element for infinite scroll
  const sentinelRef = useRef<HTMLDivElement>(null);

  // Keep hasMoreRef in sync
  useEffect(() => {
    hasMoreRef.current = hasMore;
  }, [hasMore]);

  const fetchNextPage = useCallback(async () => {
    if (loadingRef.current || !hasMoreRef.current) return;
    loadingRef.current = true;
    setLoading(true);
    try {
      const nextPage = pageRef.current + 1;
      const data = await getReleasesPage(nextPage);
      if (data.length === 0) {
        setHasMore(false);
      } else {
        setReleases((prev) => [...prev, ...data]);
        pageRef.current = nextPage;
      }
    } catch {
      setHasMore(false);
    } finally {
      loadingRef.current = false;
      setLoading(false);
    }
  }, []);

  // Observe the sentinel — trigger when scrolled near
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          fetchNextPage();
        }
      },
      { rootMargin: "300px" }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [fetchNextPage, hasMore]);

  if (safeReleases.length === 0) {
    return (
      <section className={styles.section}>
        <a href="/" className={styles.backLink}>← Back to Home</a>
        <ScrambleText text="ᛉ CHANGELOG" as="h2" className={styles.heading} trigger={inView} />
        <div className={styles.empty}>
          <p>No releases found.</p>
          <p>
            <a
              href="https://github.com/Aaen-Studios/galdr/releases"
              target="_blank"
              rel="noopener noreferrer"
            >
              View all releases on GitHub →
            </a>
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.section} ref={sectionRef}>
      <a href="/" className={styles.backLink}>← Back to Home</a>

      <ScrambleText
        text="ᛉ CHANGELOG"
        as="h2"
        className={styles.heading}
        trigger={inView}
      />

      {releases.map((release, index) => (
        <motion.div
          key={release.tag_name}
          className={styles.release}
          initial={reduced ? undefined : { opacity: 0, y: 16 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.3) }}
        >
          <div className={styles.releaseHeader}>
            <span className={styles.versionBadge}>
              ᚱ {release.tag_name}
            </span>
            <span className={styles.dateBadge}>
              {formatDate(release.published_at)}
            </span>
            <a
              href={release.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.githubLink}
            >
              View on GitHub ↗
            </a>
          </div>

          {release.body && (
            <div className={styles.body}>
              {renderMarkdown(release.body)}
            </div>
          )}

          {/* Rune divider between releases */}
          {index < releases.length - 1 && (
            <div className={styles.divider} aria-hidden="true">
              ᛟ ᛟ ᛟ ᛟ ᛟ ᛟ ᛟ ᛟ ᛟ ᛟ ᛟ ᛟ ᛟ ᛟ ᛟ ᛟ
            </div>
          )}
        </motion.div>
      ))}

      {/* Sentinel for infinite scroll */}
      <div ref={sentinelRef} />

      {/* Loading indicator */}
      {loading && (
        <div className={styles.loading}>ᚠ Loading…</div>
      )}

      {/* End marker when all pages loaded */}
      {!hasMore && releases.length > safeReleases.length && (
        <div className={styles.endMarker} aria-hidden="true">
          ᛟ ᛟ ᛟ ᛟ ᛟ ᛟ ᛟ ᛟ ᛟ ᛟ ᛟ ᛟ ᛟ ᛟ ᛟ ᛟ
        </div>
      )}
    </section>
  );
}
