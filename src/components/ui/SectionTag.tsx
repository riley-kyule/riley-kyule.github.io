export function SectionTag({ index, label }: { index: string; label: string }) {
  return (
    <p className="tag rv">
      <span>{index}</span>
      <i aria-hidden="true" />
      <span>{label}</span>
    </p>
  );
}
