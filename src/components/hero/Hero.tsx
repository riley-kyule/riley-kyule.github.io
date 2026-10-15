import { preload } from "react-dom";
import { PROFILE } from "@/lib/data";
import { Css } from "../ui/Css";

export function Hero() {
  preload("/portrait-full.webp", { as: "image", fetchPriority: "high", imageSrcSet: SRCSET, imageSizes: SIZES });
  const words = PROFILE.role.split(" ");
  const last = words.pop();
  return (
    <section id="top" className="hero" aria-labelledby="hero-title">
      <Css id="hero" css={CSS} />
      <p className="hero-ghost" aria-hidden="true">
        {PROFILE.firstName.toUpperCase()}
      </p>
      <figure className="hero-figure">
        <img src="/portrait-full.webp" srcSet={SRCSET} sizes={SIZES} alt={`${PROFILE.name}, standing with arms crossed`} width={540} height={1619} fetchPriority="high" decoding="async" />
      </figure>
      <div className="hero-copy">
        <p className="hero-eyebrow">
          {PROFILE.name} — {PROFILE.location}
        </p>
        <h1 id="hero-title" className="hero-title">
          {words.join(" ")} <em className="accent">{last}.</em>
          <span className="hero-tagline">{PROFILE.tagline}</span>
        </h1>
      </div>
      <div className="hero-side">
        <p className="hero-status">
          <span className="hero-dot" aria-hidden="true" />
          {PROFILE.availability}
        </p>
        <p className="hero-intro">{PROFILE.heroIntro}</p>
        <div className="hero-ctas">
          <a className="btn btn-primary" href="#work">
            Explore work <span className="arr" aria-hidden="true">→</span>
          </a>
          <a className="btn" href="#contact">
            Let&apos;s talk
          </a>
          {PROFILE.resume && (
            <a className="btn" href={PROFILE.resume} download>
              Résumé <span aria-hidden="true">↓</span>
            </a>
          )}
        </div>
      </div>
    </section>
  );
}

const SRCSET = "/portrait-full-360.webp 360w, /portrait-full.webp 540w";
const SIZES = "(max-width: 899px) 200px, 320px";

const CSS = `@layer components{
.hero{position:relative;min-height:100svh;display:grid;grid-template-columns:minmax(0,1fr) auto minmax(0,1fr);align-items:end;column-gap:28px;padding:110px var(--gutter) clamp(28px,5vh,56px);overflow:hidden;isolation:isolate;max-width:1920px;margin-inline:auto}
.hero-ghost{position:absolute;left:50%;top:clamp(90px,16vh,170px);translate:-50% 0;margin:0;z-index:-1;font-weight:800;font-size:clamp(7rem,27vw,30rem);line-height:.8;letter-spacing:-.06em;color:transparent;-webkit-text-stroke:1.5px rgba(13,13,13,.14);white-space:nowrap;user-select:none;pointer-events:none;animation:heroGhost 1.4s var(--ease) both}
.hero-figure{grid-column:2;grid-row:1;margin:0 0 calc(-1*clamp(28px,5vh,56px));align-self:end;height:min(92svh,1000px);aspect-ratio:540/1619;animation:heroRise 1.2s .1s var(--ease) both}
.hero-figure img{width:100%;height:100%;display:block;object-fit:contain;object-position:bottom;mix-blend-mode:multiply}
.hero-copy{grid-column:1;grid-row:1;position:relative;z-index:1;padding-bottom:8px}
.hero-eyebrow{margin:0 0 18px;font:500 12px/1.4 var(--font-mono);letter-spacing:.24em;text-transform:uppercase;color:var(--label);animation:heroRise 1s .35s var(--ease) both}
.hero-title{margin:0;font-weight:700;font-size:clamp(2.7rem,5.6vw,6.2rem);letter-spacing:-.045em;line-height:.95;animation:heroRise 1s .45s var(--ease) both}
.hero-title .accent{font-size:1.05em}
.hero-tagline{display:block;margin-top:.5em;font-family:var(--font-serif);font-style:italic;font-weight:400;font-size:.4em;letter-spacing:-.01em;line-height:1.2;color:var(--ink-2)}
.hero-side{grid-column:3;grid-row:1;justify-self:end;max-width:340px;display:flex;flex-direction:column;align-items:flex-end;gap:16px;padding-bottom:8px;position:relative;z-index:1;animation:heroRise 1s .6s var(--ease) both}
.hero-status{margin:0;display:inline-flex;align-items:center;gap:10px;font-size:.88rem;color:var(--ink-2)}
.hero-dot{width:8px;height:8px;border-radius:50%;background:var(--ink);box-shadow:0 0 0 4px rgba(13,13,13,.1);animation:heroPing 2.4s ease-in-out infinite}
.hero-intro{margin:0;text-align:right;font-size:.95rem;line-height:1.55;color:var(--ink-2)}
.hero-ctas{display:flex;flex-wrap:wrap;justify-content:flex-end;gap:10px}
@keyframes heroRise{from{transform:translateY(32px)}to{transform:none}}
@keyframes heroGhost{from{letter-spacing:.02em;transform:translateY(24px)}}
@keyframes heroPing{50%{box-shadow:0 0 0 8px rgba(13,13,13,0)}}
@media (max-width:899px){
  .hero{grid-template-columns:1fr;min-height:0;padding-top:88px;row-gap:28px}
  .hero-ghost{top:110px;font-size:28vw}
  .hero-figure{grid-column:1;grid-row:1;justify-self:center;height:62svh;margin:0}
  .hero-copy{grid-row:2}
  .hero-side{grid-column:1;grid-row:3;justify-self:start;align-items:flex-start}
  .hero-intro{text-align:left}
  .hero-ctas{justify-content:flex-start}
}
}`;
