# riley.kyule — portfolio

Personal portfolio of Riley (Phillip) Kyule, full stack and DevOps engineer in Nairobi.

One self-contained `index.html`: no build step, no dependencies. Case studies are client-side routes (`#/work/push-engine`, `#/work/ewms`, …), so it runs on any static host.

## Edit content

Everything lives in the `CONTENT` block near the top of the `<script>` in `index.html`:

- `CASES`: the case studies (problem, what was built, diagram, decisions, results)
- `REPOS`: the "More on GitHub" list
- `STACK`, `CREDS`, `TIMELINE`, `STATS`, `CONTACT`

Photos are embedded as base64 WebP, so the page has no external image requests.

Two `TODO`s in the `CONTENT` block switch on parts of the reference design that need content you don't have yet:

- `CONTACT.resume`: a CV link, which adds the Résumé buttons.
- `shot` on a case: a real screenshot, which replaces the illustrative mock in its Work panel.

## Design

`REFERENCE.md` is the spec the layout is based on. Fonts are Schibsted Grotesk (display) and Instrument Serif (italic accent) from Google Fonts. The QR code on the back of the ID card is inline SVG pointing at https://riley-kyule.github.io, so regenerate it if the site moves.

## Deploy

**GitHub Pages:** push to `main`, then in the repo go to Settings → Pages → Source: GitHub Actions. The workflow in `.github/workflows/pages.yml` validates and deploys.

**Custom domain:** add a `CNAME` file containing e.g. `riley.eversatile.co`, and point a CNAME record at `riley-kyule.github.io` in Cloudflare.

**Your own server:** copy `index.html` to the web root behind Caddy or Nginx.
