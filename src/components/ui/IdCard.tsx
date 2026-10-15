"use client";

import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "@/lib/hooks";
import { Css } from "./Css";

type Props = {
  name: string;
  fullName: string;
  role: string;
  initials: string;
  location: string;
  since: string;
  email: string;
  whatIAm: readonly string[];
};

export function IdCard({ name, fullName, role, initials, location, since, email, whatIAm }: Props) {
  const rig = useRef<HTMLDivElement>(null);
  const [flipped, setFlipped] = useState(false);
  const hoverFlip = useRef(false);

  // Damped pendulum: pointer velocity kicks the angle, a spring pulls it back, idle sway when calm.
  useEffect(() => {
    const el = rig.current;
    if (!el || prefersReducedMotion()) return;
    let angle = 0, vel = 0, frame = 0, last = performance.now(), lastMove = 0, lastX = 0, lastT = 0, visible = false;
    const K = 26, C = 3.2;
    const step = (now: number) => {
      const dt = Math.min(0.033, (now - last) / 1000);
      last = now;
      const idle = now - lastMove > 1600;
      const target = idle ? Math.sin(now / 1400) * 1.6 : 0;
      vel += (-K * (angle - target) - C * vel) * dt;
      angle = Math.max(-14, Math.min(14, angle + vel * dt));
      el.style.transform = `rotate(${angle.toFixed(3)}deg)`;
      frame = visible ? requestAnimationFrame(step) : 0;
    };
    const onMove = (e: PointerEvent) => {
      const now = performance.now();
      if (lastT && now - lastT < 100) {
        const v = (e.clientX - lastX) / Math.max(8, now - lastT); // px per ms
        vel += Math.max(-14, Math.min(14, v * 2.4));
      }
      lastX = e.clientX;
      lastT = now;
      lastMove = now;
    };
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible && !frame) {
        last = performance.now();
        frame = requestAnimationFrame(step);
      }
    });
    io.observe(el);
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  const fine = () => window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  return (
    <div className="lanyard">
      <Css id="id-card" css={CSS} />
      <div className="lan-strap" aria-hidden="true">
        <div className="lan-text">
          {Array.from({ length: 4 }, (_, i) => (
            <span key={i}>
              {name} · {role} ·{" "}
            </span>
          ))}
        </div>
      </div>
      <div className="lan-rig" ref={rig}>
        <div className="lan-clip" aria-hidden="true" />
        <div
          className={`idc${flipped ? " is-flipped" : ""}`}
          role="button"
          tabIndex={0}
          aria-pressed={flipped}
          aria-describedby="idc-hint"
          onMouseEnter={() => {
            if (fine()) {
              hoverFlip.current = true;
              setFlipped(true);
            }
          }}
          onMouseLeave={() => {
            if (hoverFlip.current) {
              hoverFlip.current = false;
              setFlipped(false);
            }
          }}
          onClick={() => {
            if (!fine()) setFlipped((f) => !f);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setFlipped((f) => !f);
            }
          }}
        >
          <div className="idc-inner">
            <div className="idc-face idc-front" aria-hidden={flipped}>
              <div className="idc-band">
                <span className="idc-logo">{initials}</span>
                <span>Developer ID</span>
              </div>
              <div className="idc-photo">
                <img src="/portrait-bust.webp" alt={`Portrait of ${name}`} width={480} height={600} loading="lazy" decoding="async" draggable={false} />
              </div>
              <p className="idc-name">{fullName}</p>
              <p className="idc-role">{role}</p>
              <dl className="idc-rows">
                <div><dt>Based</dt><dd>{location.split(",")[0]}</dd></div>
                <div><dt>Since</dt><dd>{since}</dd></div>
              </dl>
              <div className="idc-foot">
                <span className="idc-bar" aria-hidden="true" />
                <span className="idc-holo" aria-hidden="true" />
              </div>
            </div>
            <div className="idc-face idc-back" aria-hidden={!flipped}>
              <p className="idc-back-h">What I am</p>
              <ul>
                {whatIAm.map((l) => (
                  <li key={l}>{l}</li>
                ))}
              </ul>
              <div className="idc-sign">
                <span className="idc-sig">{name}</span>
                <span className="idc-sigline" aria-hidden="true" />
                <p>If found, say hello · {email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className="lan-hint" id="idc-hint">Hover, tap or press Enter to flip</p>
    </div>
  );
}

const CSS = `@layer components{
.lanyard{position:relative;display:flex;flex-direction:column;align-items:center;margin-top:calc(-1*var(--sec-pad));user-select:none;-webkit-user-select:none}
.lan-strap{width:30px;height:calc(var(--sec-pad) + 56px);background:var(--ink);overflow:hidden;position:relative;box-shadow:inset -5px 0 6px -4px rgba(255,255,255,.25)}
.lan-text{position:absolute;left:50%;top:0;writing-mode:vertical-rl;translate:-50% 0;font:500 9px/1 var(--font-mono);letter-spacing:.24em;text-transform:uppercase;color:rgba(255,255,255,.62);white-space:nowrap;animation:lanScroll 18s linear infinite}
@keyframes lanScroll{to{transform:translateY(-50%)}}
.lan-rig{display:flex;flex-direction:column;align-items:center;transform-origin:50% 0;will-change:transform}
.lan-clip{width:42px;height:30px;margin-bottom:-12px;position:relative;z-index:2;border-radius:6px 6px 11px 11px;background:linear-gradient(90deg,#8a8a8a,#e6e6e6 45%,#a3a3a3 70%,#7b7b7b);box-shadow:0 4px 8px rgba(0,0,0,.25)}
.lan-clip::after{content:"";position:absolute;left:50%;bottom:6px;width:16px;height:7px;translate:-50% 0;border-radius:4px;background:rgba(0,0,0,.28)}
.idc{position:relative;width:300px;height:404px;perspective:1200px;border-radius:20px;cursor:pointer;-webkit-tap-highlight-color:transparent}
.idc:focus-visible{outline:2px solid var(--ink);outline-offset:8px}
.idc-inner{position:absolute;inset:0;transform-style:preserve-3d;transition:transform .9s var(--ease)}
.is-flipped .idc-inner{transform:rotateY(180deg)}
.idc-face{position:absolute;inset:0;border-radius:20px;background:#fff;overflow:hidden;backface-visibility:hidden;-webkit-backface-visibility:hidden;box-shadow:inset 0 0 0 1px var(--line),0 40px 70px -34px rgba(13,13,13,.45),0 10px 22px -12px rgba(13,13,13,.18);display:flex;flex-direction:column;align-items:center}
.idc-band{width:100%;background:var(--ink);color:#fff;display:flex;align-items:center;justify-content:center;gap:10px;padding:24px 16px 14px;font:600 11px/1 var(--font-mono);letter-spacing:.28em;text-transform:uppercase;position:relative}
.idc-band::before{content:"";position:absolute;top:8px;left:50%;width:44px;height:7px;translate:-50% 0;border-radius:7px;background:rgba(255,255,255,.22)}
.idc-logo{width:24px;height:24px;border-radius:50%;background:#fff;color:var(--ink);display:grid;place-items:center;font:italic 400 13px/1 var(--font-serif);letter-spacing:0;text-transform:none}
.idc-photo{width:128px;height:156px;margin-top:20px;padding:3px;border-radius:16px;background:linear-gradient(145deg,#d9d9d9,#6f6f6f 55%,#e4e4e4);box-shadow:0 0 0 8px rgba(13,13,13,.035),0 16px 30px -14px rgba(13,13,13,.5);flex:none}
.idc-photo img{width:100%;height:100%;object-fit:cover;border-radius:13px;display:block;transition:transform .8s var(--ease)}
.idc:hover .idc-photo img,.idc:focus-visible .idc-photo img{transform:scale(1.06)}
.idc-photo{overflow:hidden}
.idc-name{margin:16px 0 0;font-weight:800;font-size:.92rem;letter-spacing:.04em;text-transform:uppercase;text-align:center;line-height:1.2;padding:0 16px}
.idc-role{margin:3px 0 0;font-size:.76rem;color:var(--label)}
.idc-rows{display:grid;grid-template-columns:1fr 1fr;gap:4px 22px;margin:14px 0 0;padding-top:10px;border-top:1px dashed rgba(13,13,13,.2)}
.idc-rows dt{font:500 9px/1.4 var(--font-mono);letter-spacing:.16em;text-transform:uppercase;color:var(--label)}
.idc-rows dd{margin:0;font-weight:600;font-size:.8rem}
.idc-foot{margin:auto 0 16px;width:calc(100% - 36px);display:flex;align-items:center;justify-content:space-between}
.idc-bar{height:28px;width:160px;background:repeating-linear-gradient(90deg,#0d0d0d 0 2px,transparent 2px 4px,#0d0d0d 4px 5px,transparent 5px 8px,#3a3a3a 8px 11px,transparent 11px 13px);opacity:.85}
.idc-holo{width:30px;height:30px;border-radius:50%;background:conic-gradient(from 30deg,#f2f2f2,#bdbdbd,#fafafa,#9c9c9c,#e9e9e9,#cfcfcf,#f2f2f2);box-shadow:inset 0 0 0 1px rgba(0,0,0,.08);animation:holo 6s linear infinite}
@keyframes holo{to{transform:rotate(360deg)}}
.idc-back{transform:rotateY(180deg);align-items:stretch;padding:26px 24px 20px;text-align:left}
.idc-back-h{margin:0 0 12px;font:500 11px/1 var(--font-mono);letter-spacing:.24em;text-transform:uppercase;color:var(--label)}
.idc-back ul{list-style:none;margin:0;padding:0;border-top:1px solid var(--line)}
.idc-back li{padding:10px 0 10px 22px;border-bottom:1px solid var(--line);font-size:.86rem;font-weight:500;line-height:1.35;position:relative}
.idc-back li::before{content:"";position:absolute;left:2px;top:15px;width:10px;height:6px;border-left:1.5px solid var(--ink);border-bottom:1.5px solid var(--ink);transform:rotate(-45deg)}
.idc-sign{margin-top:auto}
.idc-sig{display:block;font:italic 400 1.9rem/1 var(--font-serif)}
.idc-sigline{display:block;height:1px;background:var(--ink);opacity:.4;margin:6px 0 8px}
.idc-sign p{margin:0;font:500 9.5px/1.5 var(--font-mono);letter-spacing:.06em;color:var(--label);overflow-wrap:anywhere}
.lan-hint{margin:22px 0 0;font:500 10.5px/1.4 var(--font-mono);letter-spacing:.14em;text-transform:uppercase;color:var(--label)}
@media (max-width:999px){.lanyard{margin-top:0}.lan-strap{height:72px}}
@media (max-width:360px){.idc{width:280px;height:390px}}
}`;
