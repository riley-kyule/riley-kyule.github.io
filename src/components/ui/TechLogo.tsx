import type { ReactNode } from "react";
import { Css } from "./Css";

// Brand logos (devicon / Simple Icons, see public/logos/LICENSE-*) and thin line icons for concepts.

type Brand = { file: string; tint: string };

export const BRAND: Record<string, Brand> = {
  typescript: { file: "typescript", tint: "#3178C6" },
  javascript: { file: "javascript", tint: "#F7DF1E" },
  php: { file: "php", tint: "#777BB4" },
  python: { file: "python", tint: "#3776AB" },
  bash: { file: "bash", tint: "#4EAA25" },
  c: { file: "c", tint: "#A8B9CC" },
  nextjs: { file: "nextjs", tint: "#9a9a9a" },
  react: { file: "react", tint: "#61DAFB" },
  nestjs: { file: "nestjs", tint: "#E0234E" },
  laravel: { file: "laravel", tint: "#FF2D20" },
  inertia: { file: "inertia", tint: "#9553E9" },
  tailwind: { file: "tailwind", tint: "#06B6D4" },
  postgresql: { file: "postgresql", tint: "#4169E1" },
  mysql: { file: "mysql", tint: "#4479A1" },
  redis: { file: "redis", tint: "#FF4438" },
  bigquery: { file: "bigquery", tint: "#669DF6" },
  wordpress: { file: "wordpress", tint: "#21759B" },
  magento: { file: "magento", tint: "#EE672F" },
  ga4: { file: "ga4", tint: "#E37400" },
  linux: { file: "linux", tint: "#FCC624" },
  docker: { file: "docker", tint: "#2496ED" },
  caddy: { file: "caddy", tint: "#1F88C0" },
  nginx: { file: "nginx", tint: "#009639" },
  cloudflare: { file: "cloudflare", tint: "#F38020" },
  uptimekuma: { file: "uptimekuma", tint: "#5CDD8B" },
  proxmox: { file: "proxmox", tint: "#E57000" },
  githubactions: { file: "githubactions", tint: "#2088FF" },
  aws: { file: "aws", tint: "#FF9900" },
  terraform: { file: "terraform", tint: "#844FBA" },
  prometheus: { file: "prometheus", tint: "#E6522C" },
};

const P = { fill: "none", stroke: "currentColor", strokeWidth: 1.4, strokeLinecap: "round", strokeLinejoin: "round" } as const;

export const CONCEPT: Record<string, ReactNode> = {
  database: (
    <g {...P}>
      <ellipse cx="12" cy="5.5" rx="7.5" ry="2.8" />
      <path d="M4.5 5.5v13c0 1.5 3.4 2.8 7.5 2.8s7.5-1.3 7.5-2.8v-13M4.5 12c0 1.5 3.4 2.8 7.5 2.8s7.5-1.3 7.5-2.8" />
    </g>
  ),
  queue: (
    <g {...P}>
      <rect x="2.5" y="8" width="5" height="8" rx="1.2" />
      <rect x="9.5" y="8" width="5" height="8" rx="1.2" />
      <rect x="16.5" y="8" width="5" height="8" rx="1.2" />
      <path d="M2.5 4.5h19M18 2.5l3.5 2-3.5 2M2.5 19.5h19" />
    </g>
  ),
  globe: (
    <g {...P}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.6 3.7 5.6 3.7 9S14.5 18.4 12 21c-2.5-2.6-3.7-5.6-3.7-9S9.5 5.6 12 3z" />
    </g>
  ),
  clock: (
    <g {...P}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2.5" />
    </g>
  ),
  bolt: (
    <g {...P}>
      <path d="M13.5 2.5 4.5 13.5H12l-1.5 8 9-11H12z" />
    </g>
  ),
  users: (
    <g {...P}>
      <circle cx="9" cy="8" r="3.4" />
      <path d="M2.8 20c.6-3.5 3.1-5.4 6.2-5.4s5.6 1.9 6.2 5.4M15.8 4.9a3.4 3.4 0 0 1 0 6.2M18 14.9c1.8.7 2.9 2.3 3.2 5.1" />
    </g>
  ),
  bell: (
    <g {...P}>
      <path d="M6 16.5V11a6 6 0 0 1 12 0v5.5l1.5 2h-15zM10 20.5a2 2 0 0 0 4 0" />
    </g>
  ),
  grid: (
    <g {...P}>
      <rect x="3" y="3" width="7.5" height="7.5" rx="1.6" />
      <rect x="13.5" y="3" width="7.5" height="7.5" rx="1.6" />
      <rect x="3" y="13.5" width="7.5" height="7.5" rx="1.6" />
      <rect x="13.5" y="13.5" width="7.5" height="7.5" rx="1.6" />
    </g>
  ),
};

export const isBrand = (key: string | null | undefined): key is string => !!key && key in BRAND;

/** Maps the free-text tech names used in PROJECTS to a logo key. */
const TECH_ALIASES: [RegExp, string][] = [
  [/^typescript/i, "typescript"], [/^javascript/i, "javascript"], [/^php/i, "php"], [/^python/i, "python"],
  [/^next\.?js/i, "nextjs"], [/^react/i, "react"], [/^nestjs/i, "nestjs"], [/^laravel/i, "laravel"],
  [/^inertia/i, "inertia"], [/^tailwind/i, "tailwind"], [/^postgres/i, "postgresql"], [/^mysql/i, "mysql"],
  [/^redis/i, "redis"], [/^docker/i, "docker"], [/^caddy/i, "caddy"], [/^nginx/i, "nginx"],
  [/^cloudflare/i, "cloudflare"], [/^uptime kuma/i, "uptimekuma"], [/^proxmox/i, "proxmox"],
  [/^bullmq/i, "queue"], [/^sql$/i, "database"],
];
export const techKey = (name: string): string | null => TECH_ALIASES.find(([re]) => re.test(name))?.[1] ?? null;

export function TechLogo({ name, size = 24, glow = false, className = "" }: { name: string; size?: number; glow?: boolean; className?: string }) {
  if (isBrand(name)) {
    const b = BRAND[name];
    return (
      <span className={`tlogo ${className}`} style={{ width: size, height: size, ["--tint" as string]: b.tint }} data-glow={glow || undefined}>
        <Css id="tech-logo" css={TECH_LOGO_CSS} />
        <img src={`/logos/${b.file}.svg`} alt="" width={size} height={size} loading="lazy" decoding="async" />
      </span>
    );
  }
  const icon = CONCEPT[name];
  if (!icon) return null;
  return (
    <span className={`tlogo ${className}`} style={{ width: size, height: size }} data-glow={glow || undefined}>
      <Css id="tech-logo" css={TECH_LOGO_CSS} />
      <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">{icon}</svg>
    </span>
  );
}

const TECH_LOGO_CSS = `@layer components{
.tlogo{position:relative;display:inline-grid;place-items:center;flex:none}
.tlogo img,.tlogo svg{position:relative;width:100%;height:100%;object-fit:contain;display:block}
.tlogo[data-glow]::before{content:"";position:absolute;inset:-35%;border-radius:50%;background:radial-gradient(closest-side,color-mix(in srgb,var(--tint,#0d0d0d) 22%,transparent),transparent);filter:blur(6px);opacity:var(--glow,.8);transition:opacity .5s var(--ease)}
}`;
