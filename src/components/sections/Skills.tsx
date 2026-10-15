import { SKILL_GROUPS, TIER_NAME } from "@/lib/data";
import { Heading } from "../ui/Heading";
import { SectionTag } from "../ui/SectionTag";
import { PeriodicTable, type Element } from "./PeriodicTable";

export function Skills() {
  let n = 0;
  const elements: Element[] = SKILL_GROUPS.flatMap((g, gi) =>
    g.skills.map((s) => ({
      n: ++n,
      symbol: s.symbol,
      name: s.name,
      family: g.family,
      fam: gi,
      tier: TIER_NAME[s.tier],
      note: s.note,
      logo: s.logo ?? s.concept,
      projects: s.projects,
    })),
  );
  return (
    <section id="skills" className="sec" aria-labelledby="skills-title">
      <div className="wrap">
        <SectionTag index="02" label="Skills" />
        <Heading id="skills-title" lines={["The periodic table of my"]} accent="stack." />
        <p className="lede rv" style={{ marginTop: 22 }}>
          {elements.length} elements in {SKILL_GROUPS.length} families. Hover or tap a tile to see its logo and where I&apos;ve used it, or pick a family to light it up.
        </p>
        <PeriodicTable elements={elements} families={SKILL_GROUPS.map((g) => g.family)} />
      </div>
    </section>
  );
}
