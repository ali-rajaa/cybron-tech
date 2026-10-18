# Cybron Technologies website: status

Owner: same as Fuzon Apps. Rules: `SITE-PLAYBOOK.md` (copied from the Fuzon
Apps repo), plus the owner's standing rules: always push to `main`; no
pills; no ratings, review or download numbers; never invent facts; light
grounds for content, brand colours from the logo.

## 1. What this site is

A one-page site for Cybron Technologies (owner, 18 Oct: "only a one page
site with sections listed in the header to showcase our company"). The
header links jump to each section and highlight the one being read.

Sections: hero (`#top`), Services, How we work, About, Careers, Contact.

## 2. Facts and where each came from

| Fact | Source |
|---|---|
| Company name "Cybron Technologies"; Facebook and LinkedIn pages | Owner, 18 Oct |
| Email `info@cybrontech.com`; no phone number on the site; no contact form | Owner, 18 Oct |
| Instagram `@cybrontechnologies` | Search, 18 Oct (owner to confirm) |
| Office in Rawalpindi, Punjab, Pakistan | Owner, 18 Oct: the office is real, in "Bin Chargh Heights" (spelling unconfirmed; nothing found online). The site shows the city only until the owner sends the exact address (`area` in `_data/company.yml`). The LinkedIn "Bahria Town Phase 7" is wrong and is not used |
| Designs, develops and delivers software products, including gaming apps | LinkedIn via search |
| Mobile, AI and cloud solutions | Instagram bio via search |
| Web development, online applications, interactive interfaces | ZoomInfo via search |
| The company's own apps and games are its own, but are **not named** on the site | Owner, 18 Oct |
| Location only where it's needed (footer, About "Based in", Contact), not in the hero | Owner, 18 Oct |
| Logo: blue disc, white ring, white C with a notch, three circuit traces each side | Owner's image; redrawn as SVG geometry (`_includes/logo.html`), overlay-checked against the source (mean pixel difference 1.7/255) |
| Colours: blue `#0072BD`, navy `#13141E`, white | Sampled from the logo |

**Draft copy for the owner to confirm** (general and true for the kind of
work, but not confirmed by the owner): the three points under each
service (`_data/services.yml`), the four "How we work" steps, "We build
products of our own as well as for others", and the Careers line.

## 3. Colours (contrast measured)

| Token | Value | Use |
|---|---|---|
| `--accent` | `#0072BD` | Logo, primary button, focus rings, current-section marker (5.1:1 on white, 4.7:1 on `--bg-alt`) |
| `--text-2` | `#4A5468` | Grey text on light (7.6:1) |

**Light theme throughout** (owner, 18 Oct: "a light theme wide would be
better, not dark sections"): white and `--bg-alt` alternate section by
section; header is translucent white; Careers is a light panel; footer
white with a hairline. No navy bands.

## 3a. Design guardrails (owner, 18 Oct)

"Enterprise-grade corporate" rules, applied through the existing tokens
(this repo is plain CSS with tokens, not Tailwind; no framework added):

- **60-30-10.** Neutral grounds (white, `--bg-alt`, the logo navy);
  structure in greys and hairlines (`--line` is 7% ink); the accent
  (`--accent`, the logo blue) only on the primary action, focus rings and
  the current-section marker. Icons, step nodes,
  links and the hero traces are neutral. The logo keeps its blue.
- **One primary action: "Get in touch"** (header, hero, phone menu, all
  to #contact). "Explore our services" and "See open roles" are ghost
  buttons; everything else is a text link with an underline that draws
  in and an arrow that slides.
- **12-column grid** (`.grid`) for every section: hero 7/5, services
  an editorial list (sticky heading 4, list 7), steps 3/3/3/3, about
  6 + gap + 5, careers 5 + 6, contact 6 + 5, footer 5 + 6 (three columns,
  one column under 400px).
- **Spacing**: sections 96 to 128px (144px on 1680px+ screens, where the
  measure also widens to 84rem).
- **Motion**: hover transitions 300ms ease-in-out (colour, opacity and
  border only); a staggered fade-and-rise on load (starts at 0.01
  opacity so it never delays the largest paint); reduced motion turns it
  off. The hero circuit is still.
- **Depth**: hairline borders and soft shadows; nothing lifts on hover.
- **No label lines above headings** (owner, 18 Oct: "remove these weird
  AI generic headers"). No small-capitals eyebrows ("SOFTWARE COMPANY",
  "WHAT WE DO", ...), no "STEP 1" labels, no icon-in-a-circle above the
  Careers heading, and the footer column headings are plain sentence
  case. Headings lead their sections on their own. Don't add them back.
- **Banned "AI" tropes** (owner, 18 Oct, strict): no purple, indigo or
  neon gradients (flat solid tones only); no glows; no bento grids (lists,
  tables and columns instead); no pill badges; corner radius 4 to 8px
  only (`--radius-sm` 4, `--radius` 6, `--radius-lg` 8); no typing
  animations; no particles, moving meshes, dot fields or grid-line
  backgrounds; no hover scale or tilt; no centred hero with two buttons
  (the hero is left-aligned on the 7/5 grid); no floating blurred
  shapes; a structured header and footer. Lean on editorial structure,
  type weight contrast and white space. Don't add any of these back.
- **Contact**: one clear block, no form (owner, 18 Oct): the email set
  large, one primary "Email us" (mailto with a subject) and a "Copy
  address" ghost button (shown only where the clipboard works; result
  announced), beside a details card (office with Google Maps, social,
  careers).
- **Flagged, not built** (would break "never invent facts"): case
  studies and data visualisations need real projects and numbers from the
  owner; a case-study row on the grid when they exist.

## 4. Files

- `index.html`: the page (sections, Organization + WebSite schema).
- `_data/company.yml` (facts, socials; empty values show as highlighted
  blanks), `_data/services.yml`, `_data/sections.yml` (header links).
- `_layouts/default.html` (head, SEO and share tags), `_includes/`
  header, footer, logo, icon-sprite (line icons only; social links are
  words, never the networks' logos), blank.
- `assets/css/site.scss` (everything; apple-design motion, materials,
  type and preference handling as on Fuzon Apps), `assets/js/site.js`
  (header state, phone sheet, current section, reveal).
- `assets/og/default.jpg` (1200x630), `assets/icons/` and `favicon.ico`,
  all rendered from the redrawn logo.
- `404.html`, `robots.txt`, `sitemap.xml`, `site.webmanifest`.

## 5. Checks (18 Oct)

Re-run after the banned-tropes pass (same day), all clean; plus 390 and
2560px screenshots. html-validate clean; axe zero violations at 1440 and 390; no overflow,
clipping, small tap targets, text under 12px or text within 16px of the
edge at 15 widths (320 to 1920); CLS 0; no console errors; visible focus
rings; works without JavaScript; 17 interaction checks (phone sheet,
Escape, focus return, tap outside, link closes, section highlight for
every section, header state, no-JS); Lighthouse mobile 98 / 100 / 100,
desktop 100 / 100 / 100 (SEO 66 only because the preview is noindex).

## 6. Preview and deploy

- Push to `main`: `.github/workflows/pages.yml` builds with Jekyll 4.4 and
  deploys to GitHub Pages.
- Preview: **`https://cybron.fixmypcperth.com`**, noindex (`staging: true`).
- **Owner setup, once:**
  1. GitHub > `ali-rajaa/cybron-tech` > Settings > Pages > Source:
     **GitHub Actions** (don't click "Configure").
  2. Same screen > Custom domain: `cybron.fixmypcperth.com` > Save.
  3. Cloudflare (fixmypcperth.com) > DNS > Add record: `CNAME`, Name
     `cybron`, Target `ali-rajaa.github.io`, **DNS only** (grey cloud).
  4. When the DNS check passes, tick **Enforce HTTPS**.
  5. Actions > "Build and deploy" > re-run the latest run.
- Live later on `cybrontech.com`: set `url` and `staging: false` in
  `_config.yml`; FTP upload like Fuzon Apps if it's on a web host.

## 7. Open items (owner)

| # | Item |
|---|---|
| 1 | ~~Contact email~~ Done: info@cybrontech.com. No phone, no form (owner) |
| 2 | Send the exact office address ("Bin Chargh Heights": spelling, building and street) and confirm the Instagram handle |
| 3 | Confirm or edit the draft copy (section 2) |
| 4 | Logo as SVG or high-res, if one exists (the redraw matches the image) |
| 5 | Where cybrontech.com is hosted, for the live move |
