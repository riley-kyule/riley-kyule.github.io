# riley.kyule — portfolio

Personal portfolio of Riley (Phillip) Kyule, full stack and DevOps engineer in Nairobi.

Built with Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS 4 and Lenis. It is exported as a static site and deployed to GitHub Pages at https://riley-kyule.github.io.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static export into out/
npm start        # serve out/ locally
npm run lint
```

## Edit content

All copy lives in **`src/lib/data.ts`**, and components only read from it. It exports `PROFILE`, `NAV`, `SKILL_GROUPS`, `EXPERIENCE`, `EDUCATION`, `PROJECTS`, `CERTIFICATIONS` and `ACHIEVEMENTS`. It also has small helpers for the ID card (`ID_CARD`) and the last timeline stop (`NEXT_STEP`).

The content came from the previous single-file site, which was confirmed as the source of truth. Nothing was invented. Anything the source doesn't have is left out:

| Missing | Effect |
| --- | --- |
| Résumé PDF | `PROFILE.resume` is `null`, so the Résumé ↓ buttons are hidden. Add the PDF to `public/` and set the path to show them. |
| Phone number | No `tel:` link in Contact. Set `PROFILE.phone` and `PROFILE.phoneHref`. |
| Coding-platform stats, ranks, honours | Achievement cards use line icons instead of platform logos. |
| CGPA or scores, school or intermediate education | Not shown on the timeline or the ID card. |
| Certificate links | Certification rows are not links. |

## Sections

| # | Section | Component | Notes |
| --- | --- | --- | --- |
| — | Hero | `hero/Hero.tsx` | Transparent full-body cutout, outlined ghost first name, role heading, CTAs |
| 01 | About | `sections/About.tsx`, `ui/IdCard.tsx` | Lanyard ID card: pendulum swing from pointer velocity, idle sway, flips on hover/tap/Enter |
| 02 | Skills | `sections/Skills.tsx`, `sections/PeriodicTable.tsx` | Periodic table, family filters, diagonal wave reveal, logo inspector |
| 03 | Work | `sections/Work.tsx`, `sections/WorkAccordion.tsx`, `ui/MiniUI.tsx` | Expanding accordion; grayscale illustrative UIs labelled as such |
| 04 | Certifications | `sections/Certifications.tsx` | Ink-flood rows on hover/focus |
| 05 | Experience | `sections/Experience.tsx`, `sections/Timeline.tsx` | Education and experience on one spine that draws with scroll |
| 06 | Achievements | `sections/Achievements.tsx`, `sections/AchievementsGallery.tsx` | Pinned horizontal gallery, count-up numbers |
| 07 | Contact | `sections/Contact.tsx`, `sections/ContactBits.tsx` | Hopping letters, copy-email chip, spinning badge |
| — | Case studies | `app/work/[slug]/page.tsx`, `sections/CaseStudy.tsx` | One static page per project at `/work/<slug>/` |

## Image assets

The brief's hero-video pipeline was skipped on request, so the hero uses the transparent photo cutout. `scripts/build-hero-assets.py` rebuilds every still from the source photos in `assets/`:

```bash
pip install pillow fonttools brotli
python3 scripts/build-hero-assets.py
```

It writes these files:

- `public/portrait-full.webp`: the hero cutout.
- `public/portrait-full-360.webp`: a smaller cutout for phones.
- `public/portrait-bust.webp`: the 480×600 ID card photo.
- `public/og.jpg`: the 1200×630 social preview image.

## Deploy

Every push to `main` runs `.github/workflows/pages.yml`, which builds the static export and publishes `out/` to GitHub Pages. To set it up once, open the repo's Settings → Pages and set **Source** to **GitHub Actions**.

## Credits and licences

- **Fonts** (self-hosted in `src/fonts`, SIL Open Font License 1.1): Inter Tight, Instrument Serif and JetBrains Mono. The licence texts are next to the font files.
- **Brand logos** (`public/logos`):
  - [devicon](https://devicon.dev) "original" SVGs, MIT licence. See `public/logos/LICENSE-devicon.txt`.
  - BigQuery, Google Analytics, Caddy and Uptime Kuma come from [Simple Icons](https://simpleicons.org), CC0. See `public/logos/LICENSE-simple-icons.md`.
  - All logos are trademarks of their respective owners and are used only to identify the technologies.
- **Concept and achievement icons:** drawn for this site, in `src/components/ui/TechLogo.tsx`.
