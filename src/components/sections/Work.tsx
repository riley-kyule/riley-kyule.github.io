import { PROJECTS } from "@/lib/data";
import { Heading } from "../ui/Heading";
import { SectionTag } from "../ui/SectionTag";
import { WorkAccordion, type Panel } from "./WorkAccordion";

export function Work() {
  const panels: Panel[] = PROJECTS.map((p) => ({
    id: p.id,
    index: p.index,
    title: p.title,
    kicker: p.kicker,
    status: p.status,
    description: p.description,
    features: p.features.slice(0, 4),
    tech: p.tech,
    github: p.github,
    link: p.link,
  }));
  return (
    <section id="work" className="sec" aria-labelledby="work-title">
      <div className="wrap">
        <SectionTag index="03" label="Selected work" />
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Heading id="work-title" lines={["Things I've"]} accent="built." />
          <p className="rv max-w-[36ch] text-[0.95rem] text-ink-2" style={{ ["--i" as string]: 1 }}>
            Case studies of systems running in production, with the architecture and the decisions behind them. Hover or tap a panel to open it.
          </p>
        </div>
        <WorkAccordion panels={panels} />
      </div>
    </section>
  );
}
