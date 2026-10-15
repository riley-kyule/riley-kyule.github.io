import type { ReactNode } from "react";
import { ID_CARD, PROFILE } from "@/lib/data";
import { Css } from "../ui/Css";
import { IdCard } from "../ui/IdCard";
import { SectionTag } from "../ui/SectionTag";

export function About() {
  const facts: [string, ReactNode][] = [
    ["Location", PROFILE.location],
    ["Education", "BSc Geology, University of Nairobi"],
    ["Most recent role", PROFILE.currentRole],
    ["Email", <a key="e" href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>],
  ];
  return (
    <section id="about" className="sec" aria-labelledby="about-title">
      <Css id="about" css={CSS} />
      <div className="wrap about">
        <div className="about-l">
          <SectionTag index="01" label="About" />
          <h2 id="about-title" className="h2 about-h">
            <span className="rv-mask">
              <span>
                Hi, I&apos;m <em className="accent">{PROFILE.firstName}.</em>
              </span>
            </span>
          </h2>
          <p className="lede rv" style={{ ["--i" as string]: 1 }}>{PROFILE.resumeSummary}</p>
          <p className="about-more rv" style={{ ["--i" as string]: 2 }}>{PROFILE.summaryExtra}</p>
          <div className="about-btns rv" style={{ ["--i" as string]: 3 }}>
            {PROFILE.resume && (
              <a className="btn btn-primary" href={PROFILE.resume} download>Résumé <span aria-hidden="true">↓</span></a>
            )}
            <a className={`btn${PROFILE.resume ? "" : " btn-primary"}`} href={PROFILE.github} target="_blank" rel="noopener noreferrer">
              GitHub <span className="arr" aria-hidden="true">↗</span>
            </a>
            <a className="btn" href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn <span className="arr" aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
        <div className="about-c">
          <IdCard name={PROFILE.name} fullName={PROFILE.fullName} role={PROFILE.role} initials={PROFILE.initials} location={PROFILE.location} since={ID_CARD.since} email={PROFILE.email} whatIAm={ID_CARD.whatIAm} />
        </div>
        <div className="about-r">
          <h3 className="tag rv">Quick facts</h3>
          <dl className="facts rv">
            {facts.map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
          <blockquote className="quote rv">
            <p>“{PROFILE.quote}”</p>
          </blockquote>
        </div>
      </div>
    </section>
  );
}

const CSS = `@layer components{
.about{display:grid;grid-template-columns:minmax(0,1fr) 320px minmax(0,1fr);gap:clamp(28px,4vw,64px);align-items:stretch}
.about-h{font-size:clamp(2.8rem,6vw,5.4rem)}
.about-h .accent{color:var(--ink)}
.about-l .lede{margin:26px 0 0}
.about-more{margin:16px 0 0;color:var(--ink-2);max-width:58ch}
.about-btns{display:flex;flex-wrap:wrap;gap:10px;margin-top:30px}
.about-c{display:flex;justify-content:center}
.about-r{display:flex;flex-direction:column;padding-top:6px}
.facts{margin:0;border-top:1px solid var(--line)}
.facts div{display:grid;grid-template-columns:120px minmax(0,1fr);gap:14px;padding:14px 0;border-bottom:1px solid var(--line);font-size:.92rem}
.facts dt{color:var(--label)}
.facts dd{margin:0;font-weight:600;overflow-wrap:anywhere}
.facts a{text-decoration:underline;text-underline-offset:3px;text-decoration-thickness:1px}
.quote{margin:auto 0 0;padding-top:32px}
.quote p{margin:0;font:italic 400 clamp(1.6rem,2.4vw,2.1rem)/1.15 var(--font-serif);letter-spacing:-.01em;color:var(--ink-2)}
@media (max-width:1180px){.about{grid-template-columns:minmax(0,1fr) 320px}.about-r{grid-column:1/-1}.quote{margin-top:0}}
@media (max-width:999px){.about{grid-template-columns:1fr}.about-c{order:2}.about-r{order:3;grid-column:auto}}
}`;
