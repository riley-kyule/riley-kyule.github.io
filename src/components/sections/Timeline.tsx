"use client";

import { useCallback, useRef } from "react";
import { useScrollProgress } from "@/lib/hooks";
import { Css } from "../ui/Css";

export type TimelineStop = { year: string; title: string; place: string; detail: string; period?: string; kind: "Education" | "Experience" };

export function Timeline({ stops, next }: { stops: TimelineStop[]; next: { title: string; detail: string } }) {
  const root = useRef<HTMLDivElement>(null);
  const onProgress = useCallback((p: number) => {
    const el = root.current;
    if (!el) return;
    el.style.setProperty("--p", p.toFixed(4));
    const reach = p * el.offsetHeight;
    el.querySelectorAll<HTMLElement>(".tl-stop").forEach((s) => s.classList.toggle("is-lit", s.offsetTop + 30 <= reach));
  }, []);
  useScrollProgress(root, onProgress, 0.6);

  return (
    <div className="tl" ref={root}>
      <Css id="timeline" css={CSS} />
      <span className="tl-spine" aria-hidden="true"><i /></span>
      <ol className="tl-list">
      {stops.map((s) => (
        <li key={s.year + s.title} className="tl-stop">
          <span className="tl-year">{s.year}</span>
          <span className="tl-dot" aria-hidden="true" />
          <div className="tl-card">
            <p className="tl-meta">
              <span>{s.kind}</span>
              {s.period && <span>{s.period}</span>}
            </p>
            <h3>{s.title}</h3>
            <p className="tl-place">{s.place}</p>
            <p className="tl-detail">{s.detail}</p>
          </div>
        </li>
      ))}
      <li className="tl-stop tl-next">
        <span className="tl-year accent">Next</span>
        <span className="tl-dot" aria-hidden="true" />
        <div className="tl-card dashed">
          <h3>
            Next — <em className="accent">Your team?</em>
          </h3>
          <p className="tl-detail">{next.detail}</p>
          <a className="btn btn-primary" href="#contact">Let&apos;s talk <span className="arr" aria-hidden="true">→</span></a>
        </div>
      </li>
      </ol>
    </div>
  );
}

const CSS = `@layer components{
.tl{position:relative;margin:64px 0 0;--spine:clamp(130px,16vw,220px)}
.tl-list{list-style:none;margin:0;padding:0}
.tl-spine{position:absolute;left:var(--spine);top:0;bottom:0;width:2px;translate:-1px 0;background:var(--line)}
.tl-spine i{position:absolute;inset:0;background:var(--ink);transform-origin:top;transform:scaleY(var(--p,0))}
.tl-stop{position:relative;display:grid;grid-template-columns:var(--spine) minmax(0,1fr);align-items:start;padding:0 0 clamp(28px,4vw,48px)}
.tl-year{grid-column:1;padding-right:36px;text-align:right;font-weight:700;font-size:clamp(2.6rem,5.2vw,4.6rem);letter-spacing:-.06em;line-height:.9;color:#8c8982;transition:color .6s var(--ease),transform .6s var(--ease)}
.tl-year.accent{font-weight:400;letter-spacing:-.02em}
.tl-dot{position:absolute;left:var(--spine);top:18px;width:14px;height:14px;translate:-50% 0;border-radius:50%;background:var(--paper);box-shadow:inset 0 0 0 2px var(--faint);transition:background-color .5s var(--ease),box-shadow .5s var(--ease),transform .5s var(--ease)}
.tl-card{grid-column:2;margin-left:36px;max-width:620px;padding:22px 26px;border-radius:24px;background:var(--card);box-shadow:var(--hair);transform:translateX(10px);transition:transform .7s var(--ease),box-shadow .7s var(--ease)}
.tl-stop.is-lit .tl-year{color:var(--ink)}
.tl-stop.is-lit .tl-dot{background:var(--ink);box-shadow:0 0 0 6px rgba(13,13,13,.08);transform:scale(1.1)}
.tl-stop.is-lit .tl-card{transform:none;box-shadow:var(--hair),0 22px 40px -28px rgba(13,13,13,.35)}
.tl-meta{margin:0;display:flex;justify-content:space-between;gap:12px;font:500 11px/1.4 var(--font-mono);letter-spacing:.14em;text-transform:uppercase;color:var(--label)}
.tl-card h3{margin:10px 0 4px;font-size:1.35rem;font-weight:700;letter-spacing:-.025em;line-height:1.2}
.tl-place{margin:0;font-weight:500;color:var(--ink-2)}
.tl-detail{margin:8px 0 0;color:var(--ink-2);font-size:.95rem}
.tl-card.dashed{background:transparent;box-shadow:none;border:1.5px dashed rgba(13,13,13,.28)}
.tl-card.dashed .btn{margin-top:16px}
.tl-next{padding-bottom:0}
.tl-next h3{font-size:1.6rem}
@media (max-width:699px){
  .tl{--spine:14px}
  .tl-stop{grid-template-columns:1fr;padding-left:36px}
  .tl-year{grid-column:1;text-align:left;padding:0 0 10px;font-size:2.6rem}
  .tl-dot{top:12px}
  .tl-card{grid-column:1;margin-left:0}
}
@media (prefers-reduced-motion:reduce){.tl-card{transform:none}}
}`;
