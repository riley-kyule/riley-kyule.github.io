import type { ElementType } from "react";

/** Bold heading whose final word is an Instrument Serif italic accent; each line slides up from a mask. */
export function Heading({ lines, accent, as: Tag = "h2", className = "h2", id }: { lines: string[]; accent: string; as?: ElementType; className?: string; id?: string }) {
  return (
    <Tag className={className} id={id}>
      {lines.map((line, i) => (
        <span key={i} className="rv-mask" style={{ ["--i" as string]: i }}>
          <span>
            {line}
            {i === lines.length - 1 && (
              <>
                {line ? " " : ""}
                <em className="accent">{accent}</em>
              </>
            )}
          </span>
        </span>
      ))}
    </Tag>
  );
}
