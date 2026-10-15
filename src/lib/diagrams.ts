// Architecture diagrams for the case-study pages, ported verbatim from the previous site (grayscale).
function box(x: number, y: number, w: number, h: number, title: string, sub: string | null, dark?: boolean): string {
  const f=dark?"#0d0d0d":"#efede8", c=dark?"#ffffff":"#0d0d0d", m=dark?"#ffffff":"#5f5d58";
  return `<g><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="14" fill="${f}" stroke="rgba(13,13,13,.14)"/>
  <text x="${x+w/2}" y="${y+h/2-(sub?4:-5)}" text-anchor="middle" font-size="15" font-weight="700" fill="${c}">${title}</text>
  ${sub?`<text x="${x+w/2}" y="${y+h/2+15}" text-anchor="middle" font-size="11.5" fill="${m}" opacity=".9">${sub}</text>`:""}</g>`;
}
function arrow(x1: number, y1: number, x2: number, y2: number, label: string): string {
  const mx=(x1+x2)/2,my=(y1+y2)/2;
  return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#77756f" stroke-width="1.8" marker-end="url(#ah)"/>${label?`<text x="${mx}" y="${my-7}" text-anchor="middle" font-size="11" fill="#5f5d58" stroke="#ffffff" stroke-width="5" paint-order="stroke">${label}</text>`:""}`;
}
const DEFS=`<defs><marker id="ah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="#77756f"/></marker></defs>`;
export const DIAGRAMS: Record<string, string> = {
  push:`<svg viewBox="0 0 900 380" role="img" aria-label="Push Engine architecture">${DEFS}
    ${box(20,40,190,64,"110+ websites","WordPress plugin + SDK")}
    ${box(20,150,190,64,"Mobile apps","device tokens via REST")}
    ${box(20,270,190,64,"Staff","Next.js 15 dashboard (BFF)")}
    ${box(320,150,190,64,"API","NestJS: auth, schedules",true)}
    ${box(320,290,190,60,"PostgreSQL","sites, subscribers, events")}
    ${box(320,30,190,60,"Redis + BullMQ","dispatch queues")}
    ${box(620,150,170,64,"Worker","only sender, retries",true)}
    ${box(620,290,260,60,"Browser push, FCM, APNs","delivery + click tracking")}
    ${arrow(210,72,318,170,"subscribe, events")}
    ${arrow(210,182,318,182,"")}
    ${arrow(210,302,318,196,"JWT via cookie")}
    ${arrow(415,148,415,92,"")}<text x="424" y="124" font-size="11" fill="#5f5d58">enqueue</text>
    ${arrow(415,216,415,288,"")}
    ${arrow(512,60,700,148,"pull jobs")}
    ${arrow(705,216,740,288,"send")}
    ${arrow(618,200,512,300,"log delivery")}
  </svg>`,
  ewms:`<svg viewBox="0 0 900 340" role="img" aria-label="EWMS architecture">${DEFS}
    ${box(20,138,190,64,"Browser","React + TypeScript")}
    ${box(300,40,330,260,"",null)}
    <text x="465" y="72" text-anchor="middle" font-size="15" font-weight="700" fill="#0d0d0d">Laravel modular monolith</text>
    ${box(320,92,140,56,"Boards & tasks","",true)}${box(470,92,140,56,"Service desk","",true)}
    ${box(320,160,140,56,"Projects","registries",true)}${box(470,160,140,56,"Reports","search, export",true)}
    ${box(320,228,290,52,"Policies, roles, audit history","")}
    ${box(700,40,180,60,"PostgreSQL","source of truth")}
    ${box(700,140,180,60,"Redis","queues + cache")}
    ${box(700,240,180,60,"Scheduler","recurring work, SLAs")}
    ${arrow(212,170,298,170,"Inertia.js")}
    ${arrow(632,80,698,70,"")}
    ${arrow(632,170,698,170,"after save")}
    ${arrow(698,270,632,250,"")}
  </svg>`
};

