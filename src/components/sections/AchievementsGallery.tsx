"use client";

import { useEffect, useRef, type ReactNode } from "react";
import type { Achievement } from "@/lib/data";
import { prefersReducedMotion } from "@/lib/hooks";
import { Css } from "../ui/Css";
import { TechLogo } from "../ui/TechLogo";

function parse(v: string) {
  const m = v.match(/^(\D*)([\d.,]+)(.*)$/);
  return m ? { pre: m[1], n: parseFloat(m[2].replace(/,/g, "")), suf: m[3] } : null;
}

export function Gallery({ items, children }: { items: Achievement[]; children: ReactNode }) {
  const sec = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLSpanElement>(null);

  // pinned horizontal travel + "nearest card" lift
  useEffect(() => {
    const s = sec.current, t = track.current;
    if (!s || !t) return;
    const reduce = prefersReducedMotion();
    s.classList.toggle("is-pinned", !reduce);
    let travel = 0, frame = 0;
    const cards = Array.from(t.querySelectorAll<HTMLElement>(".ach-card"));
    const measure = () => {
      if (reduce) return;
      t.style.transform = "";
      travel = Math.max(0, t.scrollWidth - t.clientWidth);
      s.style.setProperty("--travel", `${travel}px`);
      update();
    };
    const update = () => {
      frame = 0;
      let k: number;
      if (reduce) {
        k = t.scrollLeft / Math.max(1, t.scrollWidth - t.clientWidth);
      } else {
        const r = s.getBoundingClientRect();
        k = Math.min(1, Math.max(0, -r.top / Math.max(1, travel)));
        t.style.transform = `translate3d(${(-k * travel).toFixed(1)}px,0,0)`;
      }
      if (bar.current) bar.current.style.transform = `scaleX(${k})`;
      const mid = window.innerWidth / 2;
      let best: HTMLElement | null = null, bd = Infinity;
      for (const c of cards) {
        const b = c.getBoundingClientRect();
        const d = Math.abs(b.left + b.width / 2 - mid);
        if (d < bd) { bd = d; best = c; }
      }
      cards.forEach((c) => c.classList.toggle("is-near", c === best));
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    t.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);
    document.fonts?.ready.then(measure);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      t.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
    };
  }, []);

  // count-up (easeOutQuart, 1.4s) the first time each card is seen
  useEffect(() => {
    const t = track.current;
    if (!t || prefersReducedMotion()) return;
    const nums = Array.from(t.querySelectorAll<HTMLElement>(".ach-num"));
    const set = (el: HTMLElement, val: number) => {
      const v = el.querySelector<HTMLElement>(".ach-val");
      if (v) v.textContent = String(Math.round(val));
    };
    const run = (el: HTMLElement) => {
      if (el.dataset.counted) return;
      el.dataset.counted = "1";
      const p = parse(el.dataset.v ?? "");
      if (!p) return;
      const t0 = performance.now();
      const tick = (now: number) => {
        const x = Math.min(1, (now - t0) / 1400);
        set(el, p.n * (1 - Math.pow(1 - x, 4)));
        if (x < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    nums.forEach((el) => set(el, 0));
    // A card counts once it is on screen, or once it has already slid past.
    let frame = 0;
    const check = () => {
      frame = 0;
      const vh = window.innerHeight, vw = window.innerWidth;
      for (const el of nums) {
        if (el.dataset.counted) continue;
        const r = el.getBoundingClientRect();
        if (r.top < vh * 0.9 && r.bottom > 0 && r.left < vw * 0.9) run(el);
      }
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(check); };
    check();
    window.addEventListener("scroll", onScroll, { passive: true });
    t.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      t.removeEventListener("scroll", onScroll);
    };
  }, []);

  const total = String(items.length).padStart(2, "0");
  return (
    <section id="achievements" ref={sec} className="sec ach" aria-labelledby="ach-title">
      <Css id="achievements" css={CSS} />
      <div className="ach-pin">
        <div className="wrap ach-head">
          <div>{children}</div>
          <span className="ach-bar" aria-hidden="true"><span ref={bar} /></span>
        </div>
        <div className="ach-track" ref={track} tabIndex={0} aria-label="Achievements, scrolls horizontally">
          {items.map((a, i) => {
            const p = parse(a.value);
            return (
              <article key={a.label} className="ach-card">
                <div className="ach-top">
                  <span className="ach-logo"><TechLogo name={a.icon} size={34} glow /></span>
                  <span className="ach-idx">{String(i + 1).padStart(2, "0")} / {total}</span>
                </div>
                <div className="ach-bottom">
                  <div className="ach-meta">
                    <h3>{a.label}</h3>
                    <p className="ach-cap">{a.caption}</p>
                    {a.detail && <p className="ach-det">{a.detail}</p>}
                  </div>
                  <p className="ach-num" data-v={a.value} aria-label={a.value}>
                    {p ? (
                      <>
                        {p.pre && <span className="ach-aff">{p.pre}</span>}
                        <span className="ach-val">{p.n}</span>
                        {p.suf && <span className={`ach-aff${p.suf.trim().length > 1 ? " sm" : ""}`}>{p.suf}</span>}
                      </>
                    ) : (
                      a.value
                    )}
                  </p>
                </div>
              </article>
            );
          })}
          <p className="ach-end" aria-hidden="true">and counting →</p>
        </div>
      </div>
    </section>
  );
}

const CSS = `@layer components{
.ach{padding-bottom:0}
.ach-pin{padding-bottom:var(--sec-pad)}
.ach-head{display:flex;justify-content:space-between;align-items:flex-end;gap:24px}
.ach-bar{flex:none;width:140px;height:2px;background:var(--line);margin-bottom:16px;position:relative;overflow:hidden}
.ach-bar span{position:absolute;inset:0;background:var(--ink);transform-origin:left;transform:scaleX(0)}
.ach-track{display:flex;align-items:center;gap:24px;margin-top:48px;overflow-x:auto;scroll-snap-type:x mandatory;padding:20px max(var(--gutter),calc((100vw - 1320px)/2)) 48px;scroll-padding-inline:max(var(--gutter),calc((100vw - 1320px)/2));scrollbar-width:none}
.ach-track::-webkit-scrollbar{display:none}
.ach-card{flex:none;scroll-snap-align:start;width:clamp(300px,40vw,540px);height:clamp(260px,36vh,310px);border-radius:28px;background:var(--card);box-shadow:var(--hair),0 14px 30px -24px rgba(13,13,13,.25);padding:24px 28px 26px;display:flex;flex-direction:column;justify-content:space-between;transition:transform .7s var(--ease),box-shadow .7s var(--ease);--glow:.5}
.ach-card.is-near{transform:translateY(-12px);box-shadow:var(--hair),0 40px 70px -34px rgba(13,13,13,.4);--glow:1}
.ach-top{display:flex;justify-content:space-between;align-items:flex-start}
.ach-logo{width:72px;height:72px;border-radius:20px;background:#fff;display:grid;place-items:center;box-shadow:var(--hair),0 12px 24px -16px rgba(13,13,13,.4);color:var(--ink)}
.ach-idx{font:500 12px var(--font-mono);letter-spacing:.1em;color:var(--label)}
.ach-bottom{display:flex;justify-content:space-between;align-items:flex-end;gap:16px}
.ach-meta{max-width:58%}
.ach-meta h3{margin:0;font-size:1.12rem;font-weight:700;letter-spacing:-.02em;line-height:1.2}
.ach-cap{margin:6px 0 0;font-size:.86rem;line-height:1.45;color:var(--ink-2)}
.ach-det{margin:6px 0 0;font:500 10.5px/1.5 var(--font-mono);letter-spacing:.08em;text-transform:uppercase;color:var(--label)}
.ach-num{margin:0;font-weight:700;font-size:clamp(3.6rem,6.6vw,6.2rem);letter-spacing:-.065em;line-height:.85;white-space:nowrap;font-variant-numeric:tabular-nums}
.ach-aff{color:var(--mute)}
.ach-aff.sm{font-size:.38em;letter-spacing:-.02em;margin-left:.12em}
.ach-end{flex:none;margin:0 0 0 12px;font:italic 400 clamp(2rem,3.6vw,3rem)/1 var(--font-serif);color:var(--mute);white-space:nowrap;padding-right:max(var(--gutter),calc((100vw - 1320px)/2))}
.ach.is-pinned{height:calc(100svh + var(--travel,0px));padding-top:0}
.ach.is-pinned .ach-pin{position:sticky;top:0;height:100svh;display:flex;flex-direction:column;justify-content:center;overflow:hidden;padding:72px 0 0}
.ach.is-pinned .ach-track{overflow:visible;scroll-snap-type:none;will-change:transform;margin-top:clamp(24px,5vh,48px)}
@media (max-width:640px){.ach-card{width:min(84vw,360px);height:300px;padding:22px}.ach-bottom{flex-direction:column-reverse;align-items:flex-start;gap:12px}.ach-meta{max-width:none}.ach-num{font-size:3.6rem}.ach-bar{display:none}}
}`;
