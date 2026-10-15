"use client";

import Lenis from "lenis";
import { useEffect, type ReactNode } from "react";
import { prefersReducedMotion } from "./hooks";

let lenis: Lenis | null = null;
const HEADER_OFFSET = -72;

/** Smooth-scrolls to a section id ("#work"), an element or a y position. */
export function scrollToTarget(target: string | HTMLElement | number, opts: { offset?: number; immediate?: boolean } = {}) {
  const offset = opts.offset ?? (target === 0 || target === "#top" ? 0 : HEADER_OFFSET);
  const el = typeof target === "string" ? (target === "#top" ? 0 : document.querySelector<HTMLElement>(target)) : target;
  if (el === null) return;
  if (lenis) {
    lenis.scrollTo(el, { offset, duration: 1.2, immediate: opts.immediate });
    return;
  }
  const y = typeof el === "number" ? el : el.getBoundingClientRect().top + window.scrollY + offset;
  window.scrollTo({ top: y, behavior: "auto" });
}

export function lockScroll(locked: boolean) {
  if (lenis) {
    if (locked) lenis.stop();
    else lenis.start();
  }
  document.documentElement.style.overflow = locked ? "hidden" : "";
}

export function ScrollProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (!prefersReducedMotion()) {
      lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    }
    let frame = 0;
    const loop = (t: number) => {
      lenis?.raf(t);
      frame = requestAnimationFrame(loop);
    };
    if (lenis) frame = requestAnimationFrame(loop);

    // In-page anchors go through Lenis and keep the URL tidy.
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element).closest?.("a[href^='#']") as HTMLAnchorElement | null;
      if (!a) return;
      const hash = a.getAttribute("href") ?? "";
      if (hash.length < 2 && hash !== "#") return;
      const target = hash === "#" || hash === "#top" ? 0 : document.querySelector<HTMLElement>(hash);
      if (target === null) return;
      e.preventDefault();
      scrollToTarget(target);
      history.replaceState(null, "", hash === "#" ? location.pathname : hash);
      if (target instanceof HTMLElement) {
        target.setAttribute("tabindex", "-1");
        target.focus({ preventScroll: true });
      }
    };
    document.addEventListener("click", onClick);

    // Arriving at /#section from another page.
    if (location.hash.length > 1) {
      const t = document.querySelector<HTMLElement>(location.hash);
      if (t) requestAnimationFrame(() => scrollToTarget(t, { immediate: true }));
    }
    return () => {
      document.removeEventListener("click", onClick);
      cancelAnimationFrame(frame);
      lenis?.destroy();
      lenis = null;
    };
  }, []);
  return <>{children}</>;
}
