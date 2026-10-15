import { ACHIEVEMENTS } from "@/lib/data";
import { Heading } from "../ui/Heading";
import { SectionTag } from "../ui/SectionTag";
import { Gallery } from "./AchievementsGallery";

export function Achievements() {
  return (
    <Gallery items={ACHIEVEMENTS}>
      <SectionTag index="06" label="Achievements" />
      <Heading id="ach-title" lines={["Proud"]} accent="moments." />
    </Gallery>
  );
}
