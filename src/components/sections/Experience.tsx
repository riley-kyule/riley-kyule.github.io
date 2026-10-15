import { EDUCATION, EXPERIENCE, NEXT_STEP } from "@/lib/data";
import { Heading } from "../ui/Heading";
import { SectionTag } from "../ui/SectionTag";
import { Timeline, type TimelineStop } from "./Timeline";

export function Experience() {
  const stops: TimelineStop[] = [
    ...EDUCATION.map((s) => ({ ...s, kind: "Education" as const })),
    ...EXPERIENCE.map((s) => ({ ...s, kind: "Experience" as const })),
  ].sort((a, b) => Number(a.year) - Number(b.year));
  return (
    <section id="experience" className="sec" aria-labelledby="exp-title">
      <div className="wrap">
        <SectionTag index="05" label="Experience" />
        <Heading id="exp-title" lines={["Education &"]} accent="experience." />
        <Timeline stops={stops} next={NEXT_STEP} />
      </div>
    </section>
  );
}
