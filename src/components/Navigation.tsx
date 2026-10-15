"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { NAV, PROFILE } from "@/lib/data";
import { lockScroll } from "@/lib/scroll";
import { Css } from "./ui/Css";

type Props = { home?: boolean };

export function Navigation({ home = true }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const bar = useRef<HTMLDivElement>(null);
  const pill = useRef<HTMLDivElement>(null);
  const ind = useRef<HTMLSpanElement>(null);
  const menuBtn = useRef<HTMLButtonElement>(null);
  const firstLink = useRef<HTMLAnchorElement>(null);
  const href = (id: string) => (home ? `#${id}` : `/#${id}`);

  // scrolled state + top progress bar
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      setScrolled(y > 40);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (bar.current) bar.current.style.transform = `scaleX(${max > 0 ? Math.min(1, y / max) : 0})`;
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
  }, []);

  // active section
  useEffect(() => {
    if (!home) {
      setActive("work");
      return;
    }
    const ids: string[] = NAV.map((n) => n.id);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const id = e.target.id;
          setActive(ids.includes(id) ? id : null);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    document.querySelectorAll("main > section[id]").forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [home]);

  // slide the ink indicator under the active link
  const place = useCallback(() => {
    const el = pill.current?.querySelector<HTMLAnchorElement>(`a[data-id="${active}"]`);
    const i = ind.current;
    if (!i) return;
    if (!el) {
      i.style.opacity = "0";
      return;
    }
    i.style.opacity = "1";
    i.style.width = `${el.offsetWidth}px`;
    i.style.transform = `translateX(${el.offsetLeft}px)`;
  }, [active]);
  useEffect(() => {
    place();
    window.addEventListener("resize", place);
    document.fonts?.ready.then(place);
    return () => window.removeEventListener("resize", place);
  }, [place]);

  // mobile menu: Esc closes, scroll locked while open
  useEffect(() => {
    if (!open) return;
    lockScroll(true);
    firstLink.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    const btn = menuBtn.current;
    return () => {
      window.removeEventListener("keydown", onKey);
      lockScroll(false);
      btn?.focus();
    };
  }, [open]);

  return (
    <header className={`nav${scrolled ? " is-scrolled" : ""}${open ? " is-open" : ""}`}>
      <Css id="nav" css={CSS} />
      <div className="nav-progress" ref={bar} aria-hidden="true" />
      <div className="nav-row">
        <Link className="nav-brand" href={home ? "#top" : "/"} >
          <span className="nav-mark" aria-hidden="true">{PROFILE.initials}</span>
          <span className="nav-name">{PROFILE.name}</span>
          <span className="sr-only-x">{home ? ", back to top" : ", home"}</span>
        </Link>
        <nav aria-label="Sections" className="nav-links">
          <div className="nav-pill" ref={pill}>
          <span className="nav-ind" ref={ind} aria-hidden="true" />
          <ul>
            {NAV.map((n) => (
              <li key={n.id}>
                <Link href={href(n.id)} data-id={n.id} aria-current={active === n.id ? "location" : undefined} className={active === n.id ? "on" : ""}>
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
          </div>
        </nav>
        <button ref={menuBtn} className="nav-menu" type="button" aria-expanded={open} aria-controls="menu" onClick={() => setOpen((o) => !o)}>
          {open ? "Close" : "Menu"}
        </button>
      </div>
      <div id="menu" className="menu" role="dialog" aria-modal="true" aria-label="Menu" hidden={!open}>
        <ol>
          {NAV.map((n, i) => (
            <li key={n.id} style={{ ["--i" as string]: i }}>
              <Link ref={i === 0 ? firstLink : undefined} href={href(n.id)} onClick={() => setOpen(false)}>
                <span className="menu-n">{String(i + 1).padStart(2, "0")}</span>
                {n.label}
              </Link>
            </li>
          ))}
        </ol>
        <p className="menu-foot">
          <a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>
        </p>
      </div>
    </header>
  );
}

const CSS = `@layer components{
.nav{position:fixed;inset:0 0 auto;z-index:50;pointer-events:none}
.nav>*{pointer-events:auto}
.nav-progress{position:absolute;top:0;left:0;right:0;height:2px;background:var(--ink);transform:scaleX(0);transform-origin:left;z-index:3}
.nav-row{display:flex;align-items:center;justify-content:space-between;gap:16px;padding:calc(14px + env(safe-area-inset-top,0px)) var(--gutter) 14px;pointer-events:none}
.nav-row>*{pointer-events:auto}
.nav-brand{display:inline-flex;align-items:center;gap:12px;min-height:44px;border-radius:999px}
.nav-mark{width:44px;height:44px;border-radius:50%;display:grid;place-items:center;box-shadow:inset 0 0 0 1.5px var(--ink);font:italic 400 20px/1 var(--font-serif);transition:background-color .4s var(--ease),color .4s var(--ease),transform .9s var(--ease)}
.nav-brand:hover .nav-mark{transform:rotate(360deg)}
.is-scrolled .nav-mark,.is-open .nav-mark{background:var(--ink);color:var(--paper)}
.nav-name{font-weight:600;font-size:.95rem;letter-spacing:-.01em;transition:opacity .4s var(--ease),transform .4s var(--ease)}
.is-scrolled .nav-name{opacity:0;transform:translateX(-6px);pointer-events:none}
.nav-links ul{display:flex;gap:2px;margin:0;padding:0;list-style:none}
.nav-pill{position:relative;padding:4px;border-radius:999px;transition:background-color .4s var(--ease),box-shadow .4s var(--ease)}
.is-scrolled .nav-pill{background:rgba(255,255,255,.72);-webkit-backdrop-filter:blur(12px) saturate(1.3);backdrop-filter:blur(12px) saturate(1.3);box-shadow:var(--hair),0 12px 30px -18px rgba(13,13,13,.3)}
.nav-links a{position:relative;z-index:1;display:inline-flex;align-items:center;min-height:44px;padding:0 16px;border-radius:999px;font-size:.88rem;font-weight:500;color:var(--ink-2);transition:color .35s var(--ease)}
.nav-links a:hover{color:var(--ink)}
.nav-links a.on{color:#fff}
.nav-ind{position:absolute;top:4px;left:0;height:44px;width:0;border-radius:999px;background:var(--ink);opacity:0;transition:transform .6s var(--ease),width .6s var(--ease),opacity .3s}
.nav-menu{display:none;min-height:44px;padding:0 20px;border-radius:999px;font-weight:600;font-size:.9rem;background:rgba(255,255,255,.75);-webkit-backdrop-filter:blur(12px);backdrop-filter:blur(12px);box-shadow:var(--hair);position:relative;z-index:2}
.is-open .nav-menu{background:var(--ink);color:#fff}
.menu{position:fixed;inset:0;z-index:1;background:var(--paper);display:flex;flex-direction:column;justify-content:center;padding:96px var(--gutter) 40px;clip-path:circle(0 at calc(100% - 60px) 40px);animation:menuIn .7s var(--ease) forwards}
.menu ol{list-style:none;margin:0;padding:0}
.menu li{opacity:0;transform:translateY(18px);animation:menuItem .6s var(--ease) forwards;animation-delay:calc(.12s + var(--i)*55ms)}
.menu ol a{display:flex;align-items:baseline;gap:16px;min-height:56px;padding:6px 0;font-weight:700;font-size:clamp(2.2rem,10vw,3.6rem);letter-spacing:-.045em;line-height:1.05;border-bottom:1px solid var(--line)}
.menu-n{font:500 12px var(--font-mono);letter-spacing:.1em;color:var(--label)}
.menu-foot{margin-top:28px;color:var(--ink-2)}
.menu-foot a{text-decoration:underline;text-underline-offset:4px}
@keyframes menuIn{to{clip-path:circle(150% at calc(100% - 60px) 40px)}}
@keyframes menuItem{to{opacity:1;transform:none}}
@media (max-width:899px){.nav-links{display:none}.nav-menu{display:inline-flex;align-items:center}}
@media (min-width:900px){.menu{display:none!important}}
}`;
