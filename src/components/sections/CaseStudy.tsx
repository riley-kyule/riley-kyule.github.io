import Link from "next/link";
import type { Project } from "@/lib/data";
import { DIAGRAMS } from "@/lib/diagrams";
import { Css } from "../ui/Css";
import { Heading } from "../ui/Heading";
import { TechLogo, techKey } from "../ui/TechLogo";

export function CaseStudy({ p, next }: { p: Project; next: Project }) {
  const facts = Object.entries(p.facts);
  return (
    <article className="cs wrap">
      <Css id="case" css={CSS} />
      <Link className="cs-back" href="/#work">← All work</Link>
      <header className="cs-head">
        <p className="tag rv">
          <span>{p.index}</span>
          <i aria-hidden="true" />
          <span>{p.kicker}</span>
        </p>
        <h1 className="cs-title">
          <span className="rv-mask"><span>{p.title}</span></span>
        </h1>
        <p className="cs-sum rv">{p.summary}</p>
        <dl className="cs-facts rv">
          {facts.map(([k, v]) => (
            <div key={k}>
              <dt>{k}</dt>
              <dd>
                {Array.isArray(v) ? (v[1] ? <a href={v[1]} target="_blank" rel="noopener noreferrer">{v[0]}</a> : v[0]) : v}
              </dd>
            </div>
          ))}
        </dl>
        <ul className="cs-tech rv" aria-label="Tech">
          {p.tech.map((t) => {
            const k = techKey(t);
            return <li key={t} className="chip">{k && <TechLogo name={k} size={14} />}{t}</li>;
          })}
        </ul>
      </header>

      <section className="cs-block" aria-labelledby="cs-problem">
        <Heading id="cs-problem" className="cs-h" lines={["The"]} accent="problem." />
        <div className="cs-body">{p.problem.map((t) => <p key={t} className="rv">{t}</p>)}</div>
      </section>

      <section className="cs-block" aria-labelledby="cs-built">
        <Heading id="cs-built" className="cs-h" lines={["What I"]} accent="built." />
        <div className="cs-body wide">
          <div className="cs-feat">
            {p.built.map((b) => (
              <div key={b.h} className="card rv">
                <h3>{b.h}</h3>
                <ul>{b.items.map((x) => <li key={x}>{x}</li>)}</ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {p.diagram && DIAGRAMS[p.diagram] && (
        <section className="cs-block" aria-labelledby="cs-fit">
          <Heading id="cs-fit" className="cs-h" lines={["How it fits"]} accent="together." />
          <div className="cs-body wide">
            <figure className="cs-diagram card rv">
              <div dangerouslySetInnerHTML={{ __html: DIAGRAMS[p.diagram] }} />
              {p.caption && <figcaption>{p.caption}</figcaption>}
            </figure>
          </div>
        </section>
      )}

      <section className="cs-block" aria-labelledby="cs-dec">
        <Heading id="cs-dec" className="cs-h" lines={["Decisions that"]} accent="mattered." />
        <div className="cs-body">
          <div className="cs-dec">
            {p.decisions.map((d) => (
              <div key={d.h} className="rv">
                <h3>{d.h}</h3>
                <p>{d.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cs-block" aria-labelledby="cs-res">
        <Heading id="cs-res" className="cs-h" lines={["The"]} accent="result." />
        <div className="cs-body wide">
          <div className="cs-out">
            {p.outcome.map(([v, l]) => (
              <div key={l} className="rv">
                <b>{v}</b>
                <span>{l}</span>
              </div>
            ))}
          </div>
          {p.note && <p className="cs-note rv">{p.note}</p>}
        </div>
      </section>

      <Link className="cs-next card" href={`/work/${next.id}/`}>
        <span>
          <small>Next case study</small>
          <b>{next.title}</b>
        </span>
        <span className="accent" aria-hidden="true">→</span>
      </Link>
    </article>
  );
}

const CSS = `@layer components{
.cs{padding-top:120px;padding-bottom:var(--sec-pad)}
.cs-back{display:inline-flex;align-items:center;min-height:44px;font-weight:600;font-size:.92rem;color:var(--ink-2);margin-bottom:28px}
.cs-back:hover{color:var(--ink)}
.cs-title{margin:0;font-weight:700;font-size:clamp(3rem,10vw,8rem);letter-spacing:-.06em;line-height:.92}
.cs-sum{margin:24px 0 0;max-width:30ch;font:italic 400 clamp(1.5rem,3vw,2.3rem)/1.2 var(--font-serif);color:var(--ink-2)}
.cs-facts{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));margin:44px 0 0;border-block:1px solid var(--line)}
.cs-facts div{padding:18px 18px 18px 0;min-width:0}
.cs-facts dt{font:500 11px var(--font-mono);letter-spacing:.14em;text-transform:uppercase;color:var(--label)}
.cs-facts dd{margin:6px 0 0;font-weight:600;font-size:.95rem;overflow-wrap:anywhere}
.cs-facts a{text-decoration:underline;text-underline-offset:3px}
.cs-tech{list-style:none;margin:20px 0 0;padding:0;display:flex;flex-wrap:wrap;gap:6px}
.cs-block{display:grid;grid-template-columns:280px minmax(0,1fr);gap:clamp(20px,5vw,72px);padding:clamp(56px,8vw,96px) 0;border-bottom:1px solid var(--line)}
.cs-h{font-weight:700;font-size:clamp(2rem,3.4vw,2.8rem);letter-spacing:-.045em;line-height:1}
.cs-body{max-width:70ch;min-width:0}
.cs-body.wide{max-width:none}
.cs-body>p{margin:0 0 16px;color:var(--ink-2);font-size:1.05rem}
.cs-feat{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px}
.cs-feat .card{padding:22px 24px}
.cs-feat h3{margin:0 0 8px;font-size:1.02rem}
.cs-feat ul{margin:0;padding-left:18px;color:var(--ink-2);font-size:.93rem}
.cs-feat li{margin:4px 0}
.cs-diagram{margin:0;padding:18px;overflow-x:auto}
.cs-diagram svg{display:block;width:100%;min-width:640px;height:auto}
.cs-diagram text{font-family:var(--font-sans)}
.cs-diagram figcaption{margin-top:10px;font-size:.86rem;color:var(--label)}
.cs-dec{display:grid;gap:22px}
.cs-dec div{border-left:2px solid var(--ink);padding-left:18px}
.cs-dec h3{margin:0 0 6px;font-size:1.06rem}
.cs-dec p{margin:0;color:var(--ink-2)}
.cs-out{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}
.cs-out div{background:var(--ink);color:#fff;border-radius:22px;padding:22px}
.cs-out b{display:block;font-size:2.1rem;font-weight:700;letter-spacing:-.05em;line-height:1.05}
.cs-out span{font-size:.88rem;color:rgba(255,255,255,.78)}
.cs-note{margin-top:20px;color:var(--ink-2)}
.cs-next{display:flex;justify-content:space-between;align-items:flex-end;gap:20px;margin-top:56px;padding:36px clamp(22px,4vw,40px);transition:transform .5s var(--ease),box-shadow .5s var(--ease)}
.cs-next:hover{transform:translateY(-3px);box-shadow:var(--hair),var(--lift)}
.cs-next small{display:block;font:500 11px var(--font-mono);letter-spacing:.14em;text-transform:uppercase;color:var(--label)}
.cs-next b{display:block;margin-top:8px;font-size:clamp(1.9rem,4.5vw,3.4rem);font-weight:700;letter-spacing:-.05em;line-height:1}
.cs-next .accent{font-size:2.6rem;color:var(--ink)}
@media (max-width:899px){.cs-facts{grid-template-columns:1fr 1fr}.cs-block{grid-template-columns:1fr}.cs-feat,.cs-out{grid-template-columns:1fr}}
}`;
