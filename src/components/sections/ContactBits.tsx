"use client";

import { useState } from "react";
import { Css } from "../ui/Css";

/** Each letter hops when the pointer passes over it. */
export function HopText({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\s+)/).map((word, wi) =>
        /^\s+$/.test(word) ? (
          word
        ) : (
          <span key={wi} style={{ display: "inline-block", whiteSpace: "nowrap" }} aria-hidden="true">
            {Array.from(word).map((ch, i) => (
              <span
                key={i}
                className="hop"
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  if (el.classList.contains("is-hop")) return;
                  el.classList.add("is-hop");
                  el.addEventListener("animationend", () => el.classList.remove("is-hop"), { once: true });
                }}
              >
                {ch}
              </span>
            ))}
          </span>
        ),
      )}
    </>
  );
}

export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="ce">
      <Css id="copy-email" css={CSS} />
      <a className="ce-link" href={`mailto:${email}`}>{email}</a>
      <button
        type="button"
        className="ce-copy"
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(email);
            setCopied(true);
            window.setTimeout(() => setCopied(false), 2000);
          } catch {
            /* clipboard unavailable: the mailto link still works */
          }
        }}
      >
        <span aria-live="polite">{copied ? "Copied ✓" : "Copy"}</span>
      </button>
    </div>
  );
}

const CSS = `@layer components{
.ce{display:flex;flex-wrap:wrap;align-items:center;gap:14px 18px}
.ce-link{font-weight:600;font-size:clamp(1.5rem,4.2vw,3rem);letter-spacing:-.035em;line-height:1.1;text-decoration:underline;text-decoration-thickness:2px;text-underline-offset:.16em;overflow-wrap:anywhere}
.ce-copy{min-height:44px;padding:0 18px;border-radius:999px;box-shadow:inset 0 0 0 1px rgba(13,13,13,.18);font:500 12px var(--font-mono);letter-spacing:.1em;text-transform:uppercase;transition:background-color .3s var(--ease),color .3s var(--ease)}
.ce-copy:hover{background:var(--ink);color:#fff}
}`;
