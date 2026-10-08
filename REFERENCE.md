# Reference spec

Taken from 31 frames (1 fps, 720×1280) of `reference.mp4`. The video is a phone filming a laptop, so the colours are warmed by the camera and every measurement below is an estimate for a ~1440px-wide viewport.

## Global

| Token | Reference | Used here |
| --- | --- | --- |
| Page background | Warm off-white | `#F3F1EC` (dark: `#14172A`) |
| Ink / active fills | Deep navy, almost black | `#1C1F35` |
| Muted text, serif accents | Warm grey | `#6E6A62` |
| Cards | Near-white, 1px hairline, very soft shadow, 20–28px radius | `#FBFAF7` |
| Display font | Heavy grotesk, tight tracking (≈ −0.045em), weight 700–800 | Schibsted Grotesk 800 |
| Accent font | Italic high-contrast serif, used for the second half of every heading | Instrument Serif italic |
| Labels | Small uppercase monospace, wide tracking: `01 —— ABOUT` | System mono, 11–12px, 0.18em |

- **Section heading pattern:** a mono label with number, a rule and a word, then `Bold words` + `serif italic words.` The serif half sits in muted grey, except in About, where the name is in ink.
- **Heading sizes:** section titles about 64–72px, the About title about 72px, the hero title about 96px.
- **Container:** about 1240px wide with 48px side padding. Sections are about 120–160px apart.
- **Logo:** a fixed circular monogram badge (about 40px, dark fill) at the top left.

## Nav

- Top right, it shows the items in a row: About · Skills · Work · Experience · Achievements · Contact.
- Over the hero it is bare text. Once you scroll, it becomes a frosted pill with a hairline border, blur and a soft shadow.
- The active section is a **dark filled pill** behind its item. The pill slides between items as you scroll (frames 8–31).

## 1. Hero (frames 1–7)

- A huge **surname watermark** (`LOHITHA`, about 30vw, weight 800, ink at about 6% opacity) is centred behind the subject and clipped by the viewport.
- A **full-body cutout** stands in the centre, bottom-anchored, at about 85% of the viewport height. In the reference it is a looping video (the subject moves her hands); here it is a still photo.
- **Bottom left:**
  - a mono eyebrow with the full name, spaced;
  - `Full Stack / Developer` on two lines at about 96px, weight 800, line-height 0.9, ending in a muted full stop;
  - a small muted subtitle: `Creative developer · AI & web technology`.
- **Bottom right:** a stack of buttons: `Explore work →` (dark pill), then `Let's talk` and `Résumé ↓` (light ghost pills).
- **Motion:** on scroll, the hero text slides up over the cutout (frame 8). The watermark and cutout appear to scroll more slowly (parallax).

## 2. About (frames 8–12)

- **Three columns:**
  - **Left:** label `01 — ABOUT`, the `Hi, I'm` + *Name.* heading (serif name), two paragraphs, then the buttons `Résumé ↓` (dark), `GitHub ↗` and `LinkedIn ↗` (ghost).
  - **Middle:** an **ID badge on a lanyard**. A dark strap comes in from the top edge of the section, carrying tiny repeated text, and ends in a metal clip.
  - **Right:** `QUICK FACTS` as label/value rows with hairline dividers. Labels are muted on the left, values are right-aligned. An italic serif pull quote sits underneath.
- **Badge front** (about 300×420, radius 18):
  - a dark header band with a logo circle and `DEVELOPER ID / Portfolio · 2026`;
  - a framed portrait with rounded corners, and the name in bold caps;
  - the role, in small muted text;
  - three mono mini fields (`ID NO`, `DEPT`, `VALID TILL`);
  - a barcode, and a small holographic disc at the bottom right.
- **Badge back** (frame 10): `What I am` as a checklist, a signature in serif and a contact line in mono.
- **Motion:** the badge swings and tilts in 3D (frames 9–11 show it rotated and skewed). It flips to the back on interaction. The strap stays attached at the top.

## 3. Skills / periodic table (frames 12–19)

- Label `02 — SKILLS`, then `The periodic table` + *of my stack.* Below that: `32 elements in six families. Hover a tile to see its logo, or pick a family to light it up.`
- **Filter chips:** a light pill for each family, with a small square swatch in the family colour. The active chip turns into a dark filled pill (frames 17–18).
- **The table:** an 8-column grid of square tiles, gap about 8px, radius about 10px. Each tile has:
  - a small atomic number at the top left;
  - a two-letter symbol (about 28px, weight 800);
  - a tiny name underneath.
- **Tile colours** run in bands from dark to light: navy, then slate grey, taupe, light taupe and sand. The last family has no fill (text only).
- **Filtering:** the tiles that don't match fade to about 15% opacity and the matching ones keep their colour (frames 17–18).
- **Detail card:** to the right of the table, a tall soft card. Hovering a tile shows the **brand logo** large, the name and the family in mono (Tailwind CSS, Java, PostgreSQL). The idle state reads `Hover any element to see its logo`, with a pointer icon.
- **Motion:** tiles lift on hover, and the opacity of filtered tiles cross-fades.

## 4. Work (frames 20–23)

- Label `03 — SELECTED WORK`, then `Things I've` + *built.* A small muted blurb sits at the top right: `… Hover a panel to open it.`
- **Horizontal accordion:**
  - **The open panel** is a large card (about 70% of the width). On the left: a mono eyebrow (`01 — LEGAL INTELLIGENCE · WEB · DESKTOP`), the title (about 40px), the description, a 2-column bullet list, tech chips with `+5` overflow, and `View on GitHub ↗` (dark pill). On the right: an illustrative UI mock labelled `ILLUSTRATIVE UI`.
  - **The closed panels** are tall narrow cards (about 80px wide), each with its number at the top, its title **rotated 90°**, and a round `+` button at the bottom. They sit on either side of the open panel, in project order.
- **Motion:** hovering a closed panel expands it while the others collapse, and the content fades in after the width animates (frame 22 is mid-transition).

## 5. Certifications (frames 24–26)

- **Two columns:**
  - **Left (sticky):** label `04 — CERTIFICATIONS`, then `Always` with *learning.* on a second line in large serif, and `8 certifications across …` underneath.
  - **Right:** a list of rows. Each row has a mono index, a title (about 18px) and the issuer in small muted text, with a hairline between rows.
- **The active row** is filled dark navy with light text and a `↗` at the right. The fill **wipes in from the left** (frame 24 is mid-wipe). The active row follows the pointer.

## 6. Education & experience (frames 26–28)

- Label `05 — JOURNEY`, then `Education &` + *experience.*
- **Vertical timeline:**
  - a thin rail with a dot sits a little right of centre;
  - a **giant year** (about 100px, weight 800) sits to the right of the dot;
  - the card sits to the left: a mono tag pill (`EDUCATION` or `EXPERIENCE`), a date range at the top right, the title, the place, bullets, chips and a score.
- **Motion:** cards blur and fade in from the left. The rail draws downward as you scroll. A faint outlined `Next` in italic serif sits at the end of the rail.
- **Note:** the brief describes this as a horizontal timeline. The frames show a vertical rail on desktop, so desktop follows the frames. Mobile uses the horizontal scroll-snap layout the brief asks for.

## 7. Achievements (frames 29–31)

- Label `06 — ACHIEVEMENTS`, then `Proud` + *moments.*
- **Horizontal carousel driven by vertical scroll:** the section pins, and the cards slide left as you scroll. A short progress line sits at the top right.
- **Each card** (about 520×240) has:
  - an icon tile (about 56px, white, rounded, shadowed) at the top left;
  - a name, a mono label (`PROBLEMS SOLVED`) and a one-line description;
  - a counter (`01 / 06`) at the top right;
  - a **giant number** at the bottom right (about 80px, weight 800) with a muted `+` suffix. Some cards are ranking-style (`No 1`).
- **Motion:** the numbers count up when a card enters view, and the cards ease in with a blur.

## Interactions summary

| Where | Interaction |
| --- | --- |
| Nav | Sliding active pill, glass background after scroll |
| Hero | Staggered rise-in, watermark parallax |
| Headings | Blur and fade up on reveal |
| Badge | Pendulum swing-in, 3D tilt toward cursor, flip to back |
| Stack | Filter chips dim non-members; hover shows logo card |
| Work | Hover/click accordion with rotated tabs |
| Learning | Dark row wipe on active row |
| Journey | Rail draws on scroll, year + card reveal |
| Proud | Pinned horizontal scroll, count-up numbers |

## Adapting it to this site

- **Content:** all of the copy comes from the `CONTENT` block. Wherever the reference has something Riley has no content for (résumé file, project screenshots), the `CONTENT` block has a `TODO`, and the UI hides that element until it is filled in.
- **Mobile:** the reference shows desktop only. The mobile layout follows the brief:
  - the hero cutout sits above the text;
  - the project tabs become a horizontal scroller;
  - the timeline scrolls horizontally with scroll-snap;
  - the stats carousel uses native swipe;
  - the nav becomes a pill fixed to the bottom of the screen.
