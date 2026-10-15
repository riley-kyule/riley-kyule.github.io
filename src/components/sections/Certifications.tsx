import { CERTIFICATIONS } from "@/lib/data";
import { Css } from "../ui/Css";
import { Heading } from "../ui/Heading";
import { SectionTag } from "../ui/SectionTag";

export function Certifications() {
  const done = CERTIFICATIONS.filter((c) => !c.inProgress).length;
  const wip = CERTIFICATIONS.length - done;
  return (
    <section id="certifications" className="sec certs" aria-labelledby="certs-title">
      <Css id="certs" css={CSS} />
      <div className="wrap certs-grid">
        <div className="certs-l">
          <SectionTag index="04" label="Certifications" />
          <Heading id="certs-title" lines={["Always"]} accent="learning." />
          <p className="certs-count rv">
            {done} completed{wip ? `, ${wip} in progress` : ""}.
          </p>
        </div>
        <ol className="certs-list">
          {CERTIFICATIONS.map((c, i) => (
            <li key={c.title} className="cert rv" tabIndex={0} style={{ ["--i" as string]: i }}>
              <span className="cert-n">{String(i + 1).padStart(2, "0")}</span>
              <span className="cert-t">
                <b>{c.title}</b>
                <span>{c.issuer}</span>
              </span>
              <span className="cert-y">
                {c.inProgress ? <em>{c.year}</em> : c.year}
                <span className="cert-a" aria-hidden="true">↗</span>
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

const CSS = `@layer components{
.certs{background:var(--card);border-block:1px solid var(--line)}
.certs-grid{display:grid;grid-template-columns:minmax(0,.85fr) minmax(0,1.15fr);gap:clamp(32px,6vw,100px);align-items:start}
.certs-l{position:sticky;top:120px}
.certs-l .h2 .accent{display:inline}
.certs-count{margin:22px 0 0;color:var(--ink-2)}
.certs-list{list-style:none;margin:0;padding:0;border-top:1px solid var(--line)}
.cert{position:relative;isolation:isolate;display:grid;grid-template-columns:44px minmax(0,1fr) auto;gap:16px;align-items:center;padding:22px 18px;border-bottom:1px solid var(--line);transition:color .5s var(--ease)}
.cert::before{content:"";position:absolute;inset:-1px 0;z-index:-1;background:var(--ink);transform:scaleX(0);transform-origin:left;transition:transform .7s var(--ease)}
.cert:hover,.cert:focus-visible{color:#fff;outline:none}
.cert:hover::before,.cert:focus-visible::before{transform:scaleX(1)}
.cert-n{font:500 12px var(--font-mono);color:var(--label);transition:color .5s var(--ease)}
.cert-t b{display:block;font-size:clamp(1.02rem,1.6vw,1.25rem);font-weight:600;letter-spacing:-.015em;line-height:1.3}
.cert-t span{display:block;font-size:.86rem;color:var(--label);transition:color .5s var(--ease)}
.cert:hover .cert-n,.cert:hover .cert-t span,.cert:focus-visible .cert-n,.cert:focus-visible .cert-t span{color:rgba(255,255,255,.72)}
.cert-y{display:flex;align-items:center;gap:12px;font:500 12px var(--font-mono);white-space:nowrap}
.cert-y em{font-style:normal;padding:4px 10px;border-radius:999px;border:1px dashed currentColor}
.cert-a{display:inline-block;opacity:0;transform:translate(-8px,6px);transition:opacity .5s var(--ease),transform .5s var(--ease)}
.cert:hover .cert-a,.cert:focus-visible .cert-a{opacity:1;transform:none}
@media (max-width:899px){.certs-grid{grid-template-columns:1fr}.certs-l{position:static}.cert{grid-template-columns:30px minmax(0,1fr);padding:18px 12px}.cert-y{grid-column:2}}
}`;
