import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { App } from "@/components/App";
import { CaseStudy } from "@/components/sections/CaseStudy";
import { PROJECTS } from "@/lib/data";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.id }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const p = PROJECTS.find((x) => x.id === slug);
  return p ? { title: p.title, description: p.summary, alternates: { canonical: `/work/${p.id}/` } } : {};
}

export default async function WorkPage({ params }: Params) {
  const { slug } = await params;
  const i = PROJECTS.findIndex((x) => x.id === slug);
  if (i < 0) notFound();
  return (
    <App home={false}>
      <CaseStudy p={PROJECTS[i]} next={PROJECTS[(i + 1) % PROJECTS.length]} />
    </App>
  );
}
