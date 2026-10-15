// Component-scoped CSS. React 19 hoists <style href precedence> into <head> and de-duplicates by href.
// Wrap rules in @layer components so Tailwind utilities still win.
export function Css({ id, css }: { id: string; css: string }) {
  return (
    <style href={id} precedence="components">
      {css}
    </style>
  );
}
