"use client";

import { useEffect, useState, type RefObject } from "react";

export function prefersReducedMotion(): boolean {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** True once the element has entered the viewport (stays true). */
export function useInView<T extends Element>(ref: RefObject<T | null>, options: IntersectionObserverInit = { threshold: 0.2 }): boolean {
  const [seen, setSeen] = useState(false);
  const { threshold, rootMargin } = options;
  useEffect(() => {
    const el = ref.current;
    if (!el || seen) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold, rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, seen, threshold, rootMargin]);
  return seen;
}

/**
 * Calls onProgress with how far the page has scrolled through the element:
 * 0 when its top reaches `start` (fraction of viewport height), 1 when its bottom does.
 */
export function useScrollProgress<T extends HTMLElement>(ref: RefObject<T | null>, onProgress: (p: number) => void, start = 0.6): void {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const r = el.getBoundingClientRect();
      const line = window.innerHeight * start;
      const p = Math.min(1, Math.max(0, (line - r.top) / Math.max(1, r.height)));
      onProgress(p);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ref, onProgress, start]);
}
