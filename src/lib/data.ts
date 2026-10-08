// All site content. Components only read from this file.
// Source: the CONTENT block of the previous single-file site (confirmed as the source of truth).
// Nothing here is invented; anything not present in that source is left out (see README → Missing data).

export type Tier = 1 | 2 | 3 | 5;
export type Skill = { symbol: string; name: string; tier: Tier; note: string; logo: string | null; concept: string | null; projects: string[] };
export type SkillGroup = { family: string; skills: Skill[] };
export type Stop = { year: string; title: string; place: string; detail: string; period?: string };
export type Feature = { h: string; items: string[] };
export type Decision = { h: string; p: string };
export type Project = {
  id: string; index: string; title: string; kicker: string; status: "live" | "dev"; description: string; summary: string;
  features: string[]; tech: string[]; github: string | null; link: string | null; art: string;
  facts: Record<string, string | [string, string | null]>; problem: string[]; built: Feature[];
  diagram: string | null; caption: string | null; decisions: Decision[]; outcome: [string, string][]; note: string;
};
export type Certification = { title: string; issuer: string; year: string; inProgress: boolean };
export type Achievement = { value: string; label: string; caption: string; detail: string | null; icon: string };
export type Repo = { name: string; description: string; languages: string; url: string };

export const TIER_NAME: Record<Tier, string> = { 1: "Daily driver", 2: "Production use", 3: "Comfortable", 5: "Currently learning" };

export const PROFILE = {
  "name": "Riley Kyule",
  "fullName": "Phillip Mbithi Kyule",
  "firstName": "Riley",
  "initials": "rk",
  "role": "Full Stack & DevOps Engineer",
  "tagline": "who ships it and keeps it running.",
  "email": "phillipkyule@gmail.com",
  "phone": null,
  "phoneHref": null,
  "location": "Nairobi, Kenya",
  "availability": "Open to new roles",
  "resumeSummary": "At Exotic Online Advertising I built the IT and engineering function from nothing: the custom platforms, the payment reconciliation, the servers they run on, the office network and support for 38 people. I also run Eversatile Solutions, where I build websites, hosting and SaaS tools for Kenyan businesses.",
  "summaryExtra": "I studied geology at the University of Nairobi, started out repairing computers, and came into software through eMobilis and ALX. Because I support everything I ship, I build for the person who has to operate it at 2am.",
  "heroIntro": "I build production platforms, automations and the Linux infrastructure they run on. Right now that's a push notification system for 110+ websites and a work management platform a whole company uses daily.",
  "principles": [
    {
      "title": "Own it end to end.",
      "text": "Requirements, code, deployment, monitoring and the support ticket after."
    },
    {
      "title": "Boring where it counts.",
      "text": "Queues, retries, audit trails and backups before features."
    },
    {
      "title": "Write it down.",
      "text": "My systems ship with READMEs, runbooks and a security model."
    }
  ],
  "quote": "Built for whoever has to run it at 2am.",
  "github": "https://github.com/riley-kyule",
  "linkedin": "https://linkedin.com/in/phillip-kyule",
  "website": "https://www.eversatile.co",
  "resume": null,
  "siteUrl": "https://riley-kyule.github.io",
  "currentRole": "IT Administrator, Full-Stack & DevOps · Exotic Online Advertising",
  "business": "Eversatile Solutions"
} as const;

export const NAV = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "achievements", label: "Achievements" },
  { id: "contact", label: "Contact" },
] as const;

export const SKILL_GROUPS: SkillGroup[] = [
  {
    "family": "Languages",
    "skills": [
      {
        "symbol": "Ts",
        "name": "TypeScript",
        "tier": 1,
        "note": "Push Engine's dashboard, API and worker; EWMS front end.",
        "logo": "typescript",
        "concept": null,
        "projects": [
          "Push Engine",
          "EWMS"
        ]
      },
      {
        "symbol": "Js",
        "name": "JavaScript",
        "tier": 1,
        "note": "Front ends, the Push Engine SDK and integrations.",
        "logo": "javascript",
        "concept": null,
        "projects": [
          "Push Engine"
        ]
      },
      {
        "symbol": "Php",
        "name": "PHP",
        "tier": 1,
        "note": "EWMS, the directory platform, CRM and Magento work.",
        "logo": "php",
        "concept": null,
        "projects": [
          "EWMS",
          "CRM & Payments"
        ]
      },
      {
        "symbol": "Py",
        "name": "Python",
        "tier": 2,
        "note": "Automation, Selenium jobs and Django projects.",
        "logo": "python",
        "concept": null,
        "projects": []
      },
      {
        "symbol": "Sh",
        "name": "Bash",
        "tier": 1,
        "note": "Server upkeep, cron jobs and WP-CLI automation.",
        "logo": "bash",
        "concept": null,
        "projects": []
      },
      {
        "symbol": "Sq",
        "name": "SQL",
        "tier": 1,
        "note": "Hand-written migrations and BigQuery reporting.",
        "logo": null,
        "concept": "database",
        "projects": [
          "CRM & Payments"
        ]
      },
      {
        "symbol": "C",
        "name": "C",
        "tier": 3,
        "note": "ALX foundations: printf, a Monty interpreter, data structures.",
        "logo": "c",
        "concept": null,
        "projects": []
      }
    ]
  },
  {
    "family": "Frameworks",
    "skills": [
      {
        "symbol": "Nx",
        "name": "Next.js",
        "tier": 1,
        "note": "Push Engine's dashboard and a corporate website.",
        "logo": "nextjs",
        "concept": null,
        "projects": [
          "Push Engine"
        ]
      },
      {
        "symbol": "Re",
        "name": "React",
        "tier": 1,
        "note": "EWMS through Inertia.js, plus Next.js apps.",
        "logo": "react",
        "concept": null,
        "projects": [
          "EWMS"
        ]
      },
      {
        "symbol": "Ns",
        "name": "NestJS",
        "tier": 1,
        "note": "Push Engine's REST API, auth and scheduling.",
        "logo": "nestjs",
        "concept": null,
        "projects": [
          "Push Engine"
        ]
      },
      {
        "symbol": "Lv",
        "name": "Laravel",
        "tier": 1,
        "note": "EWMS, the directory platform, CRM and Eversatile apps.",
        "logo": "laravel",
        "concept": null,
        "projects": [
          "EWMS",
          "Directory Platform",
          "CRM & Payments",
          "Eversatile Solutions"
        ]
      },
      {
        "symbol": "In",
        "name": "Inertia.js",
        "tier": 2,
        "note": "Connects EWMS's Laravel back end to React.",
        "logo": "inertia",
        "concept": null,
        "projects": [
          "EWMS"
        ]
      },
      {
        "symbol": "Bq",
        "name": "BullMQ",
        "tier": 1,
        "note": "Queues for every push delivery, with retries.",
        "logo": null,
        "concept": "queue",
        "projects": [
          "Push Engine"
        ]
      },
      {
        "symbol": "Tw",
        "name": "Tailwind",
        "tier": 2,
        "note": "Styling for the directory platform and others.",
        "logo": "tailwind",
        "concept": null,
        "projects": [
          "Directory Platform"
        ]
      }
    ]
  },
  {
    "family": "Databases",
    "skills": [
      {
        "symbol": "Pg",
        "name": "PostgreSQL",
        "tier": 1,
        "note": "Primary database for Push Engine and EWMS.",
        "logo": "postgresql",
        "concept": null,
        "projects": [
          "Push Engine",
          "EWMS"
        ]
      },
      {
        "symbol": "My",
        "name": "MySQL",
        "tier": 1,
        "note": "WordPress, Magento and Laravel apps.",
        "logo": "mysql",
        "concept": null,
        "projects": [
          "Eversatile Solutions"
        ]
      },
      {
        "symbol": "Rd",
        "name": "Redis",
        "tier": 1,
        "note": "Queues and caching in production.",
        "logo": "redis",
        "concept": null,
        "projects": [
          "Push Engine",
          "EWMS"
        ]
      },
      {
        "symbol": "Bg",
        "name": "BigQuery",
        "tier": 2,
        "note": "Executive analytics with Looker Studio.",
        "logo": "bigquery",
        "concept": null,
        "projects": []
      }
    ]
  },
  {
    "family": "Web",
    "skills": [
      {
        "symbol": "Wp",
        "name": "WordPress",
        "tier": 1,
        "note": "110+ sites, plus the Push Engine plugin.",
        "logo": "wordpress",
        "concept": null,
        "projects": [
          "Push Engine"
        ]
      },
      {
        "symbol": "Mg",
        "name": "Magento",
        "tier": 2,
        "note": "Supplier management, checkout and a push module.",
        "logo": "magento",
        "concept": null,
        "projects": []
      },
      {
        "symbol": "Ga",
        "name": "GA4 & GTM",
        "tier": 1,
        "note": "Analytics, tagging and Search Console.",
        "logo": "ga4",
        "concept": null,
        "projects": []
      }
    ]
  },
  {
    "family": "Ops & Infrastructure",
    "skills": [
      {
        "symbol": "Lx",
        "name": "Linux",
        "tier": 1,
        "note": "Every production server I run.",
        "logo": "linux",
        "concept": null,
        "projects": []
      },
      {
        "symbol": "Dk",
        "name": "Docker",
        "tier": 1,
        "note": "Compose stacks for Push Engine, EWMS, ERPNext and more.",
        "logo": "docker",
        "concept": null,
        "projects": [
          "Push Engine",
          "EWMS",
          "Infrastructure & Ops"
        ]
      },
      {
        "symbol": "Cd",
        "name": "Caddy",
        "tier": 2,
        "note": "Reverse proxy with automatic TLS.",
        "logo": "caddy",
        "concept": null,
        "projects": [
          "Infrastructure & Ops"
        ]
      },
      {
        "symbol": "Ng",
        "name": "Nginx",
        "tier": 1,
        "note": "Web serving and reverse proxying, with Apache.",
        "logo": "nginx",
        "concept": null,
        "projects": [
          "Infrastructure & Ops"
        ]
      },
      {
        "symbol": "Cf",
        "name": "Cloudflare",
        "tier": 1,
        "note": "DNS, TLS and Cloudflare Tunnels.",
        "logo": "cloudflare",
        "concept": null,
        "projects": [
          "Infrastructure & Ops",
          "Eversatile Solutions"
        ]
      },
      {
        "symbol": "Uk",
        "name": "Uptime Kuma",
        "tier": 2,
        "note": "Availability monitoring and incident alerts.",
        "logo": "uptimekuma",
        "concept": null,
        "projects": [
          "Infrastructure & Ops"
        ]
      },
      {
        "symbol": "Px",
        "name": "Proxmox",
        "tier": 3,
        "note": "Virtualisation, alongside VMware and Hyper-V.",
        "logo": "proxmox",
        "concept": null,
        "projects": [
          "Infrastructure & Ops"
        ]
      }
    ]
  },
  {
    "family": "Learning",
    "skills": [
      {
        "symbol": "Gh",
        "name": "GitHub Actions",
        "tier": 5,
        "note": "CI/CD pipelines, starting with this site.",
        "logo": "githubactions",
        "concept": null,
        "projects": []
      },
      {
        "symbol": "Aw",
        "name": "AWS",
        "tier": 5,
        "note": "Deploying containerised apps to the cloud.",
        "logo": "aws",
        "concept": null,
        "projects": []
      },
      {
        "symbol": "Tf",
        "name": "Terraform",
        "tier": 5,
        "note": "Provisioning infrastructure as code.",
        "logo": "terraform",
        "concept": null,
        "projects": []
      },
      {
        "symbol": "Gf",
        "name": "Prometheus",
        "tier": 5,
        "note": "Metrics and Grafana dashboards.",
        "logo": "prometheus",
        "concept": null,
        "projects": []
      }
    ]
  }
];

export const EDUCATION: Stop[] = [
  {
    "year": "2017",
    "title": "Android Programming & Web Development",
    "place": "eMobilis",
    "detail": "First steps in Android programming and web development."
  },
  {
    "year": "2021",
    "title": "BSc Geology",
    "place": "University of Nairobi",
    "detail": "Graduated from the University of Nairobi."
  },
  {
    "year": "2024",
    "title": "Software Engineering",
    "place": "ALX",
    "detail": "Formal full stack engineering training."
  }
];

export const EXPERIENCE: Stop[] = [
  {
    "year": "2018",
    "title": "Earth sciences",
    "place": "National Museums of Kenya",
    "detail": "Earth sciences: data entry, cataloguing and map digitisation."
  },
  {
    "year": "2019",
    "title": "Assistant computer technician",
    "place": "Silicon Micro Solutions",
    "detail": "Assistant computer technician: repairs, networks and firewalls."
  },
  {
    "year": "2022",
    "title": "SEO & Web Developer",
    "place": "Exotic Online Advertising",
    "detail": "Technical SEO and localised sites across Africa at Exotic Online Advertising."
  },
  {
    "year": "2023",
    "title": "IT Administrator, Full-Stack & DevOps",
    "place": "Exotic Online Advertising",
    "period": "2023 to 2026",
    "detail": "Built Exotic's IT and engineering function from scratch."
  }
];

export const PROJECTS: Project[] = [
  {
    "id": "push-engine",
    "index": "01",
    "title": "Push Engine",
    "kicker": "Self-hosted web and mobile push platform",
    "status": "live",
    "description": "Replaced a paid per-subscriber push service across 110+ websites with a platform the company owns: subscriber data, campaigns, automations and analytics in one dashboard.",
    "summary": "A self-hosted push notification platform that replaced a paid service across more than 110 websites.",
    "features": [
      "Draft, preview, clone, schedule and send",
      "Rule-based segments by country, browser, device, language and activity",
      "Triggers on subscribe, page visit, click, API event or new RSS item",
      "WordPress plugin for the 110+ sites",
      "Daily, weekly or monthly recurrence",
      "Live reach estimates before you save"
    ],
    "tech": [
      "TypeScript",
      "Next.js 15",
      "NestJS",
      "BullMQ",
      "PostgreSQL",
      "Redis",
      "Docker"
    ],
    "github": "https://github.com/riley-kyule/push-notif-engine",
    "link": null,
    "art": "pulse",
    "facts": {
      "Role": "Sole engineer: design, build, deploy, operate",
      "Status": "Live; latest release rolling out",
      "Stack": "TypeScript, Next.js 15, NestJS, BullMQ, PostgreSQL, Redis, Docker",
      "Code": [
        "github.com/riley-kyule/push-notif-engine",
        "https://github.com/riley-kyule/push-notif-engine"
      ]
    },
    "problem": [
      "Exotic Online Advertising ran browser push notifications on more than 110 of its websites through a third-party service. Costs grew with every new subscriber, the subscriber data lived on someone else's servers, and campaigns had to be managed site by site.",
      "The goal was a platform the company owns outright: one dashboard for every site, no per-subscriber fees, and delivery the team can inspect and debug when something fails."
    ],
    "built": [
      {
        "h": "Campaigns",
        "items": [
          "Draft, preview, clone, schedule and send",
          "Daily, weekly or monthly recurrence",
          "Send to one site or every site at once",
          "Deterministic 50/50 A/B browser variants"
        ]
      },
      {
        "h": "Audience",
        "items": [
          "Rule-based segments by country, browser, device, language and activity",
          "Live reach estimates before you save",
          "Custom opt-in prompt triggered by scroll depth or page views"
        ]
      },
      {
        "h": "Automation",
        "items": [
          "Triggers on subscribe, page visit, click, API event or new RSS item",
          "Actions: send a notification, tag a subscriber or fire a webhook",
          "Global rules that apply to every current and future site"
        ]
      },
      {
        "h": "Reach",
        "items": [
          "WordPress plugin for the 110+ sites",
          "Magento module and Node.js / Laravel starter packages",
          "Native APNs and FCM for iOS and Android apps",
          "Live analytics: delivery rate, CTR and top failure cause"
        ]
      }
    ],
    "diagram": "push",
    "caption": "Three services share one PostgreSQL database and one Redis instance. Only the worker ever sends a push.",
    "decisions": [
      {
        "h": "Every send goes through a queue",
        "p": "The API and dashboard never deliver notifications directly. Sends are queued in BullMQ, so delivery is retried, rate-limited and survives an API restart. Bulk outages and single automatic pushes both get queue-level retries."
      },
      {
        "h": "Credentials live in one place",
        "p": "Each site gets its own VAPID key pair, generated server-side and encrypted at rest. Only the worker holds them in memory at send time, on a dedicated egress network."
      },
      {
        "h": "The dashboard is a thin client",
        "p": "Next.js routes act as a backend-for-frontend that forwards requests to the NestJS API with the user's token from an HTTP-only cookie. The dashboard never talks to the database."
      },
      {
        "h": "Audited and hardened",
        "p": "A full security pass found and fixed a privilege escalation where an admin could promote themselves to super-admin, and made logout revoke refresh tokens on the server instead of just clearing cookies."
      }
    ],
    "outcome": [
      [
        "110+",
        "websites on one self-hosted platform"
      ],
      [
        "0",
        "per-subscriber fees"
      ],
      [
        "1",
        "dashboard for every site's campaigns"
      ]
    ],
    "note": "Runs on a VPS with Docker Compose behind a Cloudflare Tunnel, using a non-root production image, with automated backups to Dropbox."
  },
  {
    "id": "ewms",
    "index": "02",
    "title": "EWMS",
    "kicker": "Exotic Work Management System",
    "status": "live",
    "description": "The company's internal operations platform: Kanban boards, projects, approvals and an IT service desk with SLAs, all with full audit history.",
    "summary": "One place for a company's operational work, projects and IT support, replacing scattered chats and spreadsheets.",
    "features": [
      "Company, department and restricted Kanban boards",
      "Tickets with SLA due dates and assignment",
      "Projects plus country and website registries",
      "Role-scoped guided tours on every page",
      "Tasks with dependencies, recurrence, approvals and time entries",
      "Lifecycle history and resolution reporting"
    ],
    "tech": [
      "Laravel",
      "React",
      "TypeScript",
      "Inertia.js",
      "PostgreSQL",
      "Redis"
    ],
    "github": "https://github.com/riley-kyule/Project-Tracker",
    "link": null,
    "art": "bars",
    "facts": {
      "Role": "Sole engineer: design, build, deploy, support",
      "Status": "Live, used company-wide",
      "Stack": "Laravel, React, TypeScript, Inertia.js, PostgreSQL, Redis",
      "Code": [
        "github.com/riley-kyule/Project-Tracker",
        "https://github.com/riley-kyule/Project-Tracker"
      ]
    },
    "problem": [
      "Work across departments was tracked in group chats, spreadsheets and memory. IT requests came in over WhatsApp with no record of when they were raised, who owned them or how long they took.",
      "The company needed one system that every department would actually adopt, with clear ownership and an audit trail, without turning into an employee-surveillance tool."
    ],
    "built": [
      {
        "h": "Work",
        "items": [
          "Company, department and restricted Kanban boards",
          "Tasks with dependencies, recurrence, approvals and time entries",
          "Comments, mentions, checklists and attachments"
        ]
      },
      {
        "h": "IT service desk",
        "items": [
          "Tickets with SLA due dates and assignment",
          "Lifecycle history and resolution reporting",
          "Convert a ticket into a task in one step"
        ]
      },
      {
        "h": "Visibility",
        "items": [
          "Projects plus country and website registries",
          "Dashboards, reports, CSV export and global search",
          "Immutable audit history on critical changes"
        ]
      },
      {
        "h": "Adoption",
        "items": [
          "Role-scoped guided tours on every page",
          "A help centre listing every guide a person's role can use",
          "Light and dark themes, keyboard navigation, reduced motion"
        ]
      }
    ],
    "diagram": "ewms",
    "caption": "A Laravel modular monolith with a React front end through Inertia. Side effects run on Redis-backed queues after data is saved.",
    "decisions": [
      {
        "h": "Adoption over feature breadth",
        "p": "Every page has a short guided tour filtered by role. A test fails the build if a tour points at an element that no longer exists, so onboarding never silently breaks."
      },
      {
        "h": "Persist before side effects",
        "p": "Changes are saved first and notifications are dispatched afterwards from queues, so a failed email never loses someone's work."
      },
      {
        "h": "Metrics, not surveillance",
        "p": "Reports show contextual metrics for teams and work, never rankings of individual employees. External analytics never run during a page request."
      },
      {
        "h": "Closed by default",
        "p": "No public registration or self-deletion. Staff are provisioned by an administrator or a bulk import command, with role and policy checks on every action."
      }
    ],
    "outcome": [
      [
        "1",
        "system for work, projects and IT support"
      ],
      [
        "SLA",
        "tracking on every IT request"
      ],
      [
        "Audited",
        "history on critical changes"
      ]
    ],
    "note": "Ships with tests, Laravel Pint, type checks and dependency audits in the release checklist."
  },
  {
    "id": "directory-platform",
    "index": "03",
    "title": "Directory Platform",
    "kicker": "Listings and profiles platform",
    "status": "dev",
    "description": "A server-rendered listings directory with tiered packages, three-level location SEO, trust and safety tooling, and privacy-safe analytics.",
    "summary": "A listings directory built SEO-first and privacy-first, with moderation tooling built in from day one.",
    "features": [
      "Independent and agency provider onboarding",
      "City, neighbourhood and micro-location pages with indexing thresholds",
      "Confidential reporting, urgent triage and owner appeals",
      "Google SSO and authenticator MFA for privileged staff",
      "Configurable VIP, Premium and Basic packages with durations",
      "Dynamic sitemaps, redirects, 410s and loop protection"
    ],
    "tech": [
      "Laravel",
      "Blade",
      "Alpine.js",
      "Tailwind CSS"
    ],
    "github": "https://github.com/riley-kyule/directory-platform",
    "link": null,
    "art": "grid",
    "facts": {
      "Role": "Sole engineer",
      "Status": "In active development",
      "Stack": "Laravel, Blade, Alpine.js, Tailwind CSS",
      "Code": [
        "github.com/riley-kyule/directory-platform",
        "https://github.com/riley-kyule/directory-platform"
      ]
    },
    "problem": [
      "Directory sites live or die on search traffic and trust. They need thousands of location pages that rank without being flagged as thin content, and they need to protect the people listed on them.",
      "This platform treats both as core features instead of add-ons."
    ],
    "built": [
      {
        "h": "Listings",
        "items": [
          "Independent and agency provider onboarding",
          "Configurable VIP, Premium and Basic packages with durations",
          "Stable randomised ordering with scheduled rotation"
        ]
      },
      {
        "h": "Search and SEO",
        "items": [
          "City, neighbourhood and micro-location pages with indexing thresholds",
          "Dynamic sitemaps, redirects, 410s and loop protection",
          "A built-in SEO audit for orphans, duplicates and thin copy"
        ]
      },
      {
        "h": "Trust and safety",
        "items": [
          "Confidential reporting, urgent triage and owner appeals",
          "Moderation SLAs with overdue queues and escalation digests",
          "Verification history with encrypted evidence references"
        ]
      },
      {
        "h": "Privacy and security",
        "items": [
          "Google SSO and authenticator MFA for privileged staff",
          "Uploaded media stripped of metadata, failing closed",
          "Scheduled redaction of personal data in reviews and reports"
        ]
      }
    ],
    "diagram": null,
    "caption": null,
    "decisions": [
      {
        "h": "Index only what deserves it",
        "p": "Micro-location pages need more listings before they are indexed than city pages do, so the site doesn't publish thousands of empty pages that hurt its search ranking."
      },
      {
        "h": "Privacy-safe by default",
        "p": "Search, profile analytics and related listings are designed so they never expose who looked at what. Personal details in reviews and reports are redacted on a schedule."
      },
      {
        "h": "Everything editorial is audited",
        "p": "Copy, redirects, policies and listing lifecycle actions are versioned and logged, so staff changes can always be traced and reversed."
      }
    ],
    "outcome": [
      [
        "3",
        "levels of location pages"
      ],
      [
        "4",
        "staff roles with granular permissions"
      ],
      [
        "PWA",
        "installable, with an offline fallback"
      ]
    ],
    "note": "In active development. The foundation, public site, moderation and SEO tooling are built."
  },
  {
    "id": "crm-payments",
    "index": "04",
    "title": "CRM & Payments",
    "kicker": "Custom business system",
    "status": "live",
    "description": "A Laravel CRM with mobile-money and card reconciliation that saves about four hours of manual work every day.",
    "summary": "Customer management and payment reconciliation that turned a daily manual chore into an automated workflow.",
    "features": [
      "Customer management with role-based access",
      "Mobile-money and card payment integration",
      "Reporting and operational workflows",
      "Automated matching and reconciliation"
    ],
    "tech": [
      "Laravel",
      "PHP",
      "SQL",
      "payment gateway APIs"
    ],
    "github": null,
    "link": null,
    "art": "nodes",
    "facts": {
      "Role": "Sole engineer",
      "Year": "2023 to 2026",
      "Stack": "Laravel, PHP, SQL, payment gateway APIs",
      "Code": [
        "Private company system",
        null
      ]
    },
    "problem": [
      "Payments arrived through mobile money and cards, and someone had to match each one to a customer and an order by hand every day.",
      "Customer records also had to stay in sync across the company's web platforms."
    ],
    "built": [
      {
        "h": "CRM",
        "items": [
          "Customer management with role-based access",
          "Reporting and operational workflows",
          "Synchronisation with the company's web platforms"
        ]
      },
      {
        "h": "Payments",
        "items": [
          "Mobile-money and card payment integration",
          "Automated matching and reconciliation"
        ]
      }
    ],
    "diagram": null,
    "caption": null,
    "decisions": [
      {
        "h": "Automate the reconciliation, not just the payment",
        "p": "Taking payments was the easy part. The value was in matching every transaction to the right customer and order automatically and flagging only the exceptions for a person."
      }
    ],
    "outcome": [
      [
        "~4 hrs",
        "of manual work saved every day"
      ],
      [
        "1",
        "customer record across platforms"
      ],
      [
        "8",
        "automations built at Exotic"
      ]
    ],
    "note": "Code is private to the company, so this case study describes the system rather than linking to it."
  },
  {
    "id": "infrastructure",
    "index": "05",
    "title": "Infrastructure & Ops",
    "kicker": "Linux, Docker, networks and monitoring",
    "status": "live",
    "description": "The servers, network and monitoring under everything: Docker stacks, ERPNext, dual-WAN, VPN and alerting for about 140 web properties.",
    "summary": "Running the infrastructure for a company's platforms, websites and office as a one-person team.",
    "features": [
      "Isolated Docker stacks with reverse proxies and TLS",
      "Dual-ISP connectivity with failover",
      "Uptime Kuma monitoring with incident alerts",
      "ERPNext v15 and HRMS, Support Board, Push Engine, EWMS",
      "Firewalls, UFW, Fail2ban and VPN access",
      "Executive analytics with GA4, GSC, BigQuery and Looker Studio"
    ],
    "tech": [
      "Ubuntu",
      "Docker",
      "Caddy",
      "Nginx",
      "Cloudflare",
      "Uptime Kuma",
      "Proxmox"
    ],
    "github": null,
    "link": null,
    "art": "grid",
    "facts": {
      "Role": "Owner of IT and infrastructure",
      "Year": "2023 to 2026",
      "Stack": "Ubuntu, Docker, Caddy, Nginx, Cloudflare, Uptime Kuma, Proxmox",
      "Code": [
        "Private infrastructure",
        null
      ]
    },
    "problem": [
      "One company, about 140 web properties across 54 African countries and the UAE, a handful of self-hosted business systems, an office network and 38 users, with one person responsible for all of it."
    ],
    "built": [
      {
        "h": "Platforms",
        "items": [
          "Isolated Docker stacks with reverse proxies and TLS",
          "ERPNext v15 and HRMS, Support Board, Push Engine, EWMS",
          "Persistent databases, access controls and backups"
        ]
      },
      {
        "h": "Network and security",
        "items": [
          "Dual-ISP connectivity with failover",
          "Firewalls, UFW, Fail2ban and VPN access",
          "Google sign-in restrictions, allowlists and session controls"
        ]
      },
      {
        "h": "Visibility",
        "items": [
          "Uptime Kuma monitoring with incident alerts",
          "Executive analytics with GA4, GSC, BigQuery and Looker Studio",
          "Documented deployment and support runbooks"
        ]
      }
    ],
    "diagram": null,
    "caption": null,
    "decisions": [
      {
        "h": "Expose as little as possible",
        "p": "Services sit behind Cloudflare and reverse proxies, with administrative access restricted by Google sign-in, allowlists and VPN rather than open ports."
      }
    ],
    "outcome": [
      [
        "~140",
        "web properties supported"
      ],
      [
        "54",
        "countries covered"
      ],
      [
        "38",
        "users plus 15 partners supported"
      ]
    ],
    "note": "Infrastructure details are private, so this page describes the setup rather than linking to it."
  },
  {
    "id": "eversatile",
    "index": "06",
    "title": "Eversatile Solutions",
    "kicker": "My own business and SaaS suite",
    "status": "live",
    "description": "My tech business: websites, hosting and IT support, plus POS, BizManager and HRMS apps for small businesses.",
    "summary": "A tech business I run alongside my job, building and hosting software for Kenyan businesses.",
    "features": [
      "POS for sales, inventory and customer credit",
      "Websites and online stores with M-Pesa",
      "BizManager for quotations, invoices and payments",
      "Cloudflare-backed hosting with free SSL"
    ],
    "tech": [
      "Laravel",
      "MySQL",
      "Cloudflare",
      "M-Pesa"
    ],
    "github": null,
    "link": "https://www.eversatile.co",
    "art": "bars",
    "facts": {
      "Role": "Founder and engineer",
      "Year": "Ongoing",
      "Stack": "Laravel, MySQL, Cloudflare, M-Pesa",
      "Code": [
        "eversatile.co",
        "https://www.eversatile.co"
      ]
    },
    "problem": [
      "Small Kenyan businesses get websites and software from freelancers who disappear after launch. Eversatile is built around the opposite promise: the same engineer who builds it keeps it running."
    ],
    "built": [
      {
        "h": "SaaS suite",
        "items": [
          "POS for sales, inventory and customer credit",
          "BizManager for quotations, invoices and payments",
          "HRMS for staff records, leave, attendance and payroll",
          "Shared login and subscription billing"
        ]
      },
      {
        "h": "Services",
        "items": [
          "Websites and online stores with M-Pesa",
          "Cloudflare-backed hosting with free SSL",
          "Business email, IT support and branding"
        ]
      }
    ],
    "diagram": null,
    "caption": null,
    "decisions": [
      {
        "h": "Support is the product",
        "p": "Every build comes with hosting, monitoring and a local support line, because most small businesses don't need a launch, they need something that still works six months later."
      }
    ],
    "outcome": [
      [
        "3",
        "SaaS apps launched"
      ],
      [
        "140+",
        "websites under active support"
      ],
      [
        "M-Pesa",
        "ready on every build"
      ]
    ],
    "note": "See the live business at eversatile.co."
  }
];

export const CERTIFICATIONS: Certification[] = [
  {
    "title": "Software Engineering",
    "issuer": "ALX",
    "year": "2024",
    "inProgress": false
  },
  {
    "title": "Fundamentals of Digital Marketing",
    "issuer": "Google Digital Skills",
    "year": "2022",
    "inProgress": false
  },
  {
    "title": "Android Programming & Web Development",
    "issuer": "eMobilis",
    "year": "2017",
    "inProgress": false
  },
  {
    "title": "Volunteer First Aider",
    "issuer": "St John Ambulance Kenya",
    "year": "Since 2013",
    "inProgress": false
  },
  {
    "title": "AWS, Terraform & GitHub Actions",
    "issuer": "Self-directed",
    "year": "In progress",
    "inProgress": true
  }
];

export const ACHIEVEMENTS: Achievement[] = [
  {
    "value": "~140",
    "label": "Web properties",
    "caption": "Web properties supported, across 54 African countries and the UAE",
    "detail": null,
    "icon": "globe"
  },
  {
    "value": "4 hrs",
    "label": "Time saved",
    "caption": "Of manual work saved every day by payment reconciliation",
    "detail": null,
    "icon": "clock"
  },
  {
    "value": "8",
    "label": "Automations",
    "caption": "Operational automations built and running",
    "detail": null,
    "icon": "bolt"
  },
  {
    "value": "38",
    "label": "People supported",
    "caption": "Internal users supported, plus 15 external partners",
    "detail": null,
    "icon": "users"
  },
  {
    "value": "110+",
    "label": "Push Engine",
    "caption": "websites on one self-hosted platform",
    "detail": "Replaced a paid per-subscriber push service",
    "icon": "bell"
  },
  {
    "value": "3",
    "label": "Eversatile Solutions",
    "caption": "SaaS apps launched",
    "detail": "POS, BizManager and HRMS",
    "icon": "grid"
  }
];

export const REPOS: Repo[] = [
  {
    "name": "magento-multi-supplier",
    "description": "Magento 2 module that lets several suppliers sell through one store.",
    "languages": "PHP",
    "url": "https://github.com/riley-kyule/magento-multi-supplier"
  },
  {
    "name": "critique",
    "description": "Full stack blog with a React and Vite front end and a Django back end. ALX portfolio project.",
    "languages": "Python, React",
    "url": "https://github.com/riley-kyule/critique"
  },
  {
    "name": "alx-files_manager",
    "description": "File upload and management API in Node.js.",
    "languages": "JavaScript",
    "url": "https://github.com/riley-kyule/alx-files_manager"
  },
  {
    "name": "show_me",
    "description": "Discussion board for TV shows, movies and anime.",
    "languages": "Python, JavaScript",
    "url": "https://github.com/riley-kyule/show_me"
  },
  {
    "name": "AirBnB_clone_v3",
    "description": "AirBnB clone from command interpreter through Flask REST API.",
    "languages": "Python",
    "url": "https://github.com/riley-kyule/AirBnB_clone_v3"
  },
  {
    "name": "monty",
    "description": "Interpreter for Monty bytecode files, written in C.",
    "languages": "C",
    "url": "https://github.com/riley-kyule/monty"
  },
  {
    "name": "printf",
    "description": "A re-implementation of printf in C. My first collaborative project.",
    "languages": "C",
    "url": "https://github.com/riley-kyule/printf"
  },
  {
    "name": "alx-system_engineering-devops",
    "description": "Shell, networking and server configuration exercises.",
    "languages": "Shell",
    "url": "https://github.com/riley-kyule/alx-system_engineering-devops"
  }
];
