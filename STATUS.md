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
| Instagram `@cybrontechnologies` | Search, 18 Oct (owner to confirm) |
| Bahria Town Phase 7, Rawalpindi, Punjab, Pakistan | LinkedIn company page via search (owner to confirm) |
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
| `--blue` | `#0072BD` | Logo, buttons, eyebrows and links on light grounds (5.1:1 on white, 4.7:1 on `--bg-alt`) |
| `--sky` | `#4FB0F2` | Accent text on navy (7.7:1); the logo blue is only 3.6:1 there |
| `--navy` | `#13141E` | Header, hero, careers, footer (the logo's own ground) |
| `--on-dark-2` | `#A9B1C6` | Grey text on navy (8.5:1) |
| `--text-2` | `#4A5468` | Grey text on light (7.6:1) |

The header is navy at 0.86 opacity so its grey links stay above 5:1 even
over white sections.

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

html-validate clean; axe zero violations at 1440 and 390; no overflow,
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
| 1 | Contact email and phone/WhatsApp (shown as blanks until then) |
| 2 | Confirm the address (Bahria Town Phase 7, Rawalpindi) and the Instagram handle |
| 3 | Confirm or edit the draft copy (section 2) |
| 4 | Logo as SVG or high-res, if one exists (the redraw matches the image) |
| 5 | Where cybrontech.com is hosted, for the live move |
