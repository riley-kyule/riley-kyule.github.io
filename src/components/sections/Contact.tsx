import { PROFILE } from "@/lib/data";
import { Css } from "../ui/Css";
import { SectionTag } from "../ui/SectionTag";
import { CopyEmail, HopText } from "./ContactBits";

export function Contact() {
  return (
    <section id="contact" className="sec contact" aria-labelledby="contact-title">
      <Css id="contact" css={CSS} />
      <div className="wrap">
        <SectionTag index="07" label="Contact" />
        <h2 id="contact-title" className="contact-h" aria-label="Let's build something together.">
          <span className="rv-mask"><span><HopText text="Let's build" /></span></span>
          <span className="rv-mask" style={{ ["--i" as string]: 1 }}>
            <span>
              <HopText text="something" /> <em className="accent"><HopText text="together." /></em>
            </span>
          </span>
        </h2>
        <div className="contact-grid">
          <div className="rv">
            <p className="contact-k">Email is the best way to reach me</p>
            <CopyEmail email={PROFILE.email} />
            <ul className="contact-links">
              {PROFILE.phone && PROFILE.phoneHref && (
                <li><a href={PROFILE.phoneHref}>{PROFILE.phone}</a></li>
              )}
              <li><a href={PROFILE.github} target="_blank" rel="noopener noreferrer">GitHub <span aria-hidden="true">↗</span></a></li>
              <li><a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn <span aria-hidden="true">↗</span></a></li>
            </ul>
          </div>
          <a className="badge-spin rv" href={`mailto:${PROFILE.email}`} aria-label={`Say hello: email ${PROFILE.email}`}>
            <svg viewBox="0 0 200 200" aria-hidden="true">
              <defs><path id="circ" d="M100,100 m-74,0 a74,74 0 1,1 148,0 a74,74 0 1,1 -148,0" /></defs>
              <text><textPath href="#circ">say hello · say hello · say hello · say hello ·</textPath></text>
            </svg>
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}

const CSS = `@layer components{
.contact{padding-bottom:clamp(72px,10vh,120px)}
.contact-h{margin:0;font-weight:700;font-size:clamp(3rem,10.5vw,9.5rem);letter-spacing:-.055em;line-height:.95}
.contact-h .accent{letter-spacing:-.03em}
.hop{display:inline-block;transition:transform .2s}
.hop.is-hop{animation:hop .6s var(--ease)}
@keyframes hop{30%{transform:translateY(-.18em)}60%{transform:translateY(.03em)}100%{transform:none}}
.contact-grid{display:flex;justify-content:space-between;align-items:flex-end;gap:32px;margin-top:clamp(40px,6vw,72px);flex-wrap:wrap}
.contact-k{margin:0 0 10px;font:500 12px/1.4 var(--font-mono);letter-spacing:.14em;text-transform:uppercase;color:var(--label)}
.contact-links{display:flex;flex-wrap:wrap;gap:10px 28px;list-style:none;margin:26px 0 0;padding:0}
.contact-links a{display:inline-flex;align-items:center;gap:6px;min-height:44px;font-weight:600;border-bottom:1px solid var(--line);transition:border-color .3s}
.contact-links a:hover{border-color:var(--ink)}
.badge-spin{position:relative;width:150px;height:150px;border-radius:50%;display:grid;place-items:center;flex:none}
.badge-spin svg{position:absolute;inset:0;width:100%;height:100%;animation:spin 18s linear infinite}
.badge-spin text{font:500 13.5px var(--font-mono);letter-spacing:.2em;text-transform:uppercase;fill:var(--ink)}
.badge-spin>span{width:62px;height:62px;border-radius:50%;background:var(--ink);color:#fff;display:grid;place-items:center;font-size:1.4rem;transition:transform .5s var(--ease)}
.badge-spin:hover>span{transform:rotate(45deg) scale(1.06)}
@keyframes spin{to{transform:rotate(360deg)}}
}`;
