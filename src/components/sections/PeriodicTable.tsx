"use client";

import { useRef, useState } from "react";
import { useInView } from "@/lib/hooks";
import { Css } from "../ui/Css";
import { TechLogo } from "../ui/TechLogo";

export type Element = { n: number; symbol: string; name: string; family: string; fam: number; tier: string; note: string; logo: string | null; projects: string[] };

export function PeriodicTable({ elements, families }: { elements: Element[]; families: string[] }) {
  const [family, setFamily] = useState<string | null>(null);
  const [current, setCurrent] = useState<number | null>(null);
  const [pinned, setPinned] = useState<number | null>(null);
  const grid = useRef<HTMLDivElement>(null);
  const seen = useInView(grid, { threshold: 0.15 });
  const shown = current ?? pinned;
  const el = shown == null ? null : elements[shown];

  return (
    <div className="pt">
      <Css id="periodic" css={CSS} />
      <div className="pt-chips rv" role="group" aria-label="Filter by family">
        {families.map((f, i) => (
          <button key={f} type="button" className="pt-chip" aria-pressed={family === f} onClick={() => setFamily((x) => (x === f ? null : f))}>
            <i className={`fam-${i}`} aria-hidden="true" />
            {f}
          </button>
        ))}
      </div>
      <div className="pt-body">
        <div ref={grid} className={`pt-grid${seen ? " is-in" : ""}${family ? " is-filtering" : ""}`} onMouseLeave={() => setCurrent(null)}>
          {elements.map((e, i) => (
            <button
              key={e.symbol}
              type="button"
              className={`pt-el fam-${e.fam}${family === e.family ? " match" : ""}`}
              style={{ ["--d8" as string]: Math.floor(i / 8) + (i % 8), ["--d4" as string]: Math.floor(i / 4) + (i % 4) }}
              aria-label={`${e.name}, ${e.family}, ${e.tier}`}
              aria-pressed={pinned === i}
              onMouseEnter={() => setCurrent(i)}
              onFocus={() => setCurrent(i)}
              onBlur={() => setCurrent(null)}
              onClick={() => setPinned((p) => (p === i ? null : i))}
            >
              <span className="pt-n" aria-hidden="true">{String(e.n).padStart(2, "0")}</span>
              <span className="pt-s" aria-hidden="true">{e.symbol}</span>
              <span className="pt-name" aria-hidden="true">{e.name}</span>
            </button>
          ))}
        </div>
        <aside className="pt-inspect card" aria-live="polite" aria-label="Element details">
          {el ? (
            <div className="pt-ins" key={el.symbol}>
              <div className="pt-logo">
                {el.logo ? <TechLogo name={el.logo} size={150} glow /> : <span className={`pt-big fam-${el.fam}`}>{el.symbol}</span>}
              </div>
              <p className="pt-fam">
                {String(el.n).padStart(2, "0")} · {el.family}
              </p>
              <h3>{el.name}</h3>
              <p className="pt-tier">{el.tier}</p>
              <p className="pt-note">{el.note}</p>
              {el.projects.length > 0 && (
                <>
                  <p className="pt-used">Used in</p>
                  <ul className="pt-projects">
                    {el.projects.map((p) => (
                      <li key={p} className="chip">{p}</li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          ) : (
            <div className="pt-idle">
              <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true"><path d="M5 3l14 7-6 2-2 6z" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
              <p>Hover or tap any element to inspect it.</p>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}

const CSS = `@layer components{
.pt-chips{display:flex;flex-wrap:wrap;gap:8px;margin:30px 0 26px}
.pt-chip{display:inline-flex;align-items:center;gap:9px;min-height:44px;padding:0 18px;border-radius:999px;font-size:.88rem;font-weight:500;color:var(--ink-2);background:var(--card);box-shadow:var(--hair);transition:background-color .35s var(--ease),color .35s var(--ease),transform .35s var(--ease)}
.pt-chip:hover{transform:translateY(-1px)}
.pt-chip i{width:12px;height:12px;border-radius:3px;background:var(--bg);box-shadow:inset 0 0 0 1px var(--line)}
.pt-chip[aria-pressed=true]{background:var(--ink);color:#fff}
.fam-0{--bg:#0d0d0d;--fg:#fff}.fam-1{--bg:#3a3a3a;--fg:#fff}.fam-2{--bg:#5f5d58;--fg:#fff}
.fam-3{--bg:#a9a6a0;--fg:#0d0d0d}.fam-4{--bg:#dcd8d0;--fg:#0d0d0d}.fam-5{--bg:#fff;--fg:#3a3a3a}
.pt-body{display:grid;grid-template-columns:minmax(0,1fr) 320px;gap:clamp(18px,2.6vw,36px);align-items:start}
.pt-grid{display:grid;grid-template-columns:repeat(8,minmax(0,1fr));gap:8px}
.pt-el{aspect-ratio:1;min-width:0;display:flex;flex-direction:column;justify-content:space-between;text-align:left;padding:9px 10px;border-radius:12px;background:var(--bg);color:var(--fg);transition:opacity .5s var(--ease),filter .5s var(--ease),transform .4s var(--ease),box-shadow .4s var(--ease)}
.pt-el.fam-5{box-shadow:inset 0 0 0 1px rgba(13,13,13,.18)}
.js .pt-grid .pt-el{opacity:0;transform:translateY(14px) scale(.94)}
.js .pt-grid.is-in .pt-el{opacity:1;transform:none;transition-delay:calc(var(--d8)*40ms)}
.pt-grid.is-in .pt-el:hover,.pt-grid.is-in .pt-el:focus-visible{transform:translateY(-4px);box-shadow:0 16px 26px -14px rgba(13,13,13,.55);transition-delay:0s}
.pt-el[aria-pressed=true]{outline:2px solid var(--ink);outline-offset:2px}
.pt-grid.is-filtering .pt-el:not(.match){opacity:.14;filter:grayscale(1)}
.pt-n{font:500 10px/1 var(--font-mono);opacity:.75}
.pt-s{font-weight:700;font-size:clamp(1.2rem,2.2vw,2rem);letter-spacing:-.045em;line-height:1}
.pt-name{font-size:10.5px;line-height:1.2;opacity:.85;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.pt-inspect{position:sticky;top:96px;min-height:440px;padding:28px 24px;display:flex;flex-direction:column;justify-content:center}
.pt-ins{display:flex;flex-direction:column;align-items:center;text-align:center;animation:ptPop .55s var(--ease) both}
.pt-logo{width:150px;height:150px;display:grid;place-items:center;margin-bottom:18px}
.pt-big{width:150px;height:150px;border-radius:24px;display:grid;place-items:center;background:var(--bg);color:var(--fg);font-weight:700;font-size:3.4rem;letter-spacing:-.05em;box-shadow:inset 0 0 0 1px var(--line)}
.pt-ins .tlogo{color:var(--ink)}
.pt-fam,.pt-used{margin:0;font:500 11px/1.4 var(--font-mono);letter-spacing:.16em;text-transform:uppercase;color:var(--label)}
.pt-ins h3{margin:8px 0 2px;font-size:1.5rem;font-weight:700;letter-spacing:-.03em}
.pt-tier{margin:0;font-size:.85rem;color:var(--ink-2)}
.pt-note{margin:12px 0 0;font-size:.9rem;color:var(--ink-2);line-height:1.5}
.pt-used{margin-top:16px}
.pt-projects{display:flex;flex-wrap:wrap;justify-content:center;gap:6px;list-style:none;margin:8px 0 0;padding:0}
.pt-idle{display:flex;flex-direction:column;align-items:center;gap:12px;text-align:center;color:var(--label);font-size:.9rem}
.pt-idle p{margin:0}
@keyframes ptPop{from{opacity:0;transform:scale(.9) translateY(8px)}to{opacity:1;transform:none}}
@media (max-width:999px){.pt-body{grid-template-columns:1fr}.pt-inspect{position:static;min-height:0}}
@media (max-width:640px){
  .pt-grid{grid-template-columns:repeat(4,minmax(0,1fr));gap:6px}
  .js .pt-grid.is-in .pt-el{transition-delay:calc(var(--d4)*40ms)}
  .pt-el{padding:8px 9px}
  .pt-s{font-size:1.5rem}
}
}`;
