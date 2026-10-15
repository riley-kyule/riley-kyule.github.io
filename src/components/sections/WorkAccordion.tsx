"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { Css } from "../ui/Css";
import { MiniUI } from "../ui/MiniUI";
import { TechLogo, techKey } from "../ui/TechLogo";

export type Panel = {
  id: string; index: string; title: string; kicker: string; status: "live" | "dev"; description: string;
  features: string[]; tech: string[]; github: string | null; link: string | null;
};

export function WorkAccordion({ panels }: { panels: Panel[] }) {
  const [open, setOpen] = useState(0);
  const timer = useRef<number | undefined>(undefined);
  const fine = () => window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 1000px)").matches;

  return (
    <div className="acc rv" style={{ ["--n" as string]: panels.length }}>
      <Css id="work" css={CSS} />
      {panels.map((p, i) => {
        const isOpen = i === open;
        return (
          <article
            key={p.id}
            className={`acc-p${isOpen ? " is-open" : ""}`}
            onMouseEnter={() => {
              if (!fine()) return;
              window.clearTimeout(timer.current);
              timer.current = window.setTimeout(() => setOpen(i), 140);
            }}
            onMouseLeave={() => window.clearTimeout(timer.current)}
            aria-labelledby={`acc-t-${p.id}`}
          >
            <h3 className="acc-h">
              <button
                type="button"
                className="acc-spine"
                aria-expanded={isOpen}
                aria-controls={`acc-b-${p.id}`}
                id={`acc-t-${p.id}`}
                onClick={() => setOpen(i)}
                onFocus={() => fine() && setOpen(i)}
              >
                <span className="acc-n">{p.index}</span>
                <span className="acc-vt">{p.title}</span>
                <span className="acc-plus" aria-hidden="true">+</span>
              </button>
            </h3>
            <div className="acc-b" id={`acc-b-${p.id}`} hidden={!isOpen}>
              <div className="acc-txt">
                <p className="acc-k">
                  <span>{p.index}</span> — {p.kicker}
                  <span className={`acc-status${p.status === "dev" ? " dev" : ""}`}>{p.status === "dev" ? "In development" : "In production"}</span>
                </p>
                <p className="acc-title" aria-hidden="true">{p.title}</p>
                <p className="acc-d">{p.description}</p>
                <ul className="acc-f">
                  {p.features.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
                <ul className="acc-tech" aria-label="Tech">
                  {p.tech.map((t) => {
                    const k = techKey(t);
                    return (
                      <li key={t} className="chip">
                        {k && <TechLogo name={k} size={14} />}
                        {t}
                      </li>
                    );
                  })}
                </ul>
                <div className="acc-btns">
                  <Link className="btn btn-primary" href={`/work/${p.id}/`}>
                    Read the case study <span className="arr" aria-hidden="true">→</span>
                  </Link>
                  {p.github && (
                    <a className="btn" href={p.github} target="_blank" rel="noopener noreferrer">
                      View on GitHub <span className="arr" aria-hidden="true">↗</span>
                    </a>
                  )}
                  {p.link && (
                    <a className="btn" href={p.link} target="_blank" rel="noopener noreferrer">
                      Visit site <span className="arr" aria-hidden="true">↗</span>
                    </a>
                  )}
                </div>
              </div>
              <div className="acc-ui">
                <MiniUI id={p.id} />
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}

const CSS = `@layer components{
.acc{container-type:inline-size;display:flex;gap:12px;height:min(78svh,600px);min-height:520px;margin-top:44px}
.acc-p{position:relative;flex:1 1 0;min-width:64px;border-radius:26px;background:var(--card);box-shadow:var(--hair);overflow:hidden;transition:flex-grow .8s var(--ease),box-shadow .5s var(--ease)}
.acc-p.is-open{flex-grow:8;box-shadow:var(--hair),var(--lift)}
.acc-h{margin:0;position:absolute;inset:0;font:inherit}
.acc-spine{position:absolute;inset:0;width:100%;display:flex;flex-direction:column;align-items:center;justify-content:space-between;padding:22px 0 18px;border-radius:26px;transition:opacity .3s var(--ease)}
.acc-spine:hover{background:#faf9f7}
.acc-n{font:500 11px var(--font-mono);letter-spacing:.12em;color:var(--label)}
.acc-vt{writing-mode:vertical-rl;transform:rotate(180deg);font-weight:700;font-size:1.15rem;letter-spacing:-.02em;white-space:nowrap}
.acc-plus{width:38px;height:38px;border-radius:50%;background:var(--ink);color:#fff;display:grid;place-items:center;font-size:1.2rem;line-height:1;transition:transform .5s var(--ease)}
.acc-spine:hover .acc-plus{transform:rotate(90deg)}
.is-open .acc-spine{opacity:0;pointer-events:none}
.acc-b{position:absolute;inset:0;display:grid;grid-template-columns:minmax(0,1.05fr) minmax(0,.95fr);gap:clamp(20px,2.6vw,36px);padding:clamp(24px,2.6vw,38px);width:calc((100cqw - (var(--n) - 1)*12px)*8/(var(--n) + 7))}
.acc-b[hidden]{display:none}
.acc-txt{display:flex;flex-direction:column;gap:14px;min-width:0;overflow:auto;scrollbar-width:thin;animation:accFade .6s .25s var(--ease) both}
.acc-k{margin:0;display:flex;flex-wrap:wrap;align-items:center;gap:8px 10px;font:500 11px/1.5 var(--font-mono);letter-spacing:.12em;text-transform:uppercase;color:var(--label)}
.acc-status{font:500 11px/1 var(--font-sans);letter-spacing:0;text-transform:none;padding:5px 10px;border-radius:999px;box-shadow:var(--hair);color:var(--ink-2)}
.acc-status::before{content:"";display:inline-block;width:6px;height:6px;border-radius:50%;background:var(--ink);margin-right:6px;vertical-align:1px}
.acc-status.dev::before{background:#fff;box-shadow:inset 0 0 0 1.5px var(--ink)}
.acc-title{margin:0;font-weight:700;font-size:clamp(1.9rem,3vw,2.7rem);letter-spacing:-.045em;line-height:1}
.acc-d{margin:0;color:var(--ink-2);font-size:.95rem}
.acc-f{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:1fr 1fr;gap:6px 18px;font-size:.84rem;color:var(--ink-2)}
.acc-f li{position:relative;padding-left:14px;line-height:1.4}
.acc-f li::before{content:"";position:absolute;left:0;top:.5em;width:5px;height:5px;border-radius:50%;background:var(--ink)}
.acc-tech{list-style:none;margin:0;padding:0;display:flex;flex-wrap:wrap;gap:6px}
.acc-btns{display:flex;flex-wrap:wrap;gap:10px;margin-top:auto;padding-top:4px}
.acc-ui{min-width:0;min-height:0;clip-path:inset(0 100% 0 0 round 20px);animation:accWipe 1s .3s var(--ease) forwards}
@keyframes accWipe{to{clip-path:inset(0 0 0 0 round 20px)}}
@keyframes accFade{from{opacity:0;transform:translateY(12px)}}
@media (max-width:1180px) and (min-width:1000px){.acc-b{grid-template-columns:1fr}.acc-ui{display:none}}
@media (max-width:999px){
  .acc{flex-direction:column;height:auto;min-height:0;gap:10px}
  .acc-p{flex:none;min-width:0;border-radius:22px}
  .acc-h{position:static}
  .acc-spine{position:static;flex-direction:row;justify-content:flex-start;gap:14px;padding:18px 20px;min-height:64px;border-radius:22px;text-align:left}
  .acc-vt{writing-mode:horizontal-tb;transform:none;flex:1;white-space:normal;font-size:1.1rem}
  .acc-plus{width:34px;height:34px}
  .is-open .acc-spine{opacity:1;pointer-events:auto}
  .is-open .acc-plus{transform:rotate(45deg)}
  .acc-b{position:static;grid-template-columns:1fr;width:auto;padding:0 20px 22px}
  .acc-ui{order:-1;height:230px}
  .acc-title{display:none}
  .acc-f{grid-template-columns:1fr}
  .acc-txt{overflow:visible}
}
}`;
