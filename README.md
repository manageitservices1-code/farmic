# Farmic Agro & Co — Website

A static, responsive website for Farmic Agro & Co — "Straight from farm to customer."

## What's included

- `index.html` — Home page: hero, three-stage journey, brief intros
- `story.html` — Full brand story ("Weaving the Value Chain")
- `products.html` — 12 cold-press oilseeds grown in India, with botanical names, descriptions and nutrient highlights
- `machinery.html` — Cold-press oil expeller, chilli powder grinder, turmeric processing line, and packaging & filling machine
- `contact.html` — Address with an embedded Google Map, and a contact form
- `assets/gallery/` — Homepage image/video carousel: drop media in `images/` or `videos/`, list it in `manifest.json`, and it shows up automatically (see `assets/gallery/README.md`)
- `assets/css/style.css` — All styling (single stylesheet, no build step)
- `assets/js/config.js` — **Edit this one file** to update contact details, the contact-form destination, and social media links across the whole site
- `assets/js/apply-config.js` — Applies `config.js` to every page automatically (no need to touch this)
- `assets/js/main.js` — Mobile menu toggle
- `assets/img/` — Logo, favicon set, and all original seed/machinery illustrations (SVG)
- `assets/img/social/` — YouTube, X, Facebook and Instagram icons shown in the footer
- `site.webmanifest` — For "Add to Home Screen" on mobile

No build tools, frameworks, or dependencies — plain HTML/CSS/JS, so it deploys as-is.

## Deploying to Vercel

**Option A — Vercel CLI**
```bash
npm install -g vercel   # if you don't already have it
cd farmic-website
vercel                  # follow the prompts, choose "Other" framework preset
vercel --prod           # promote to production
```

**Option B — Vercel dashboard (no CLI)**
1. Push this folder to a GitHub/GitLab/Bitbucket repo.
2. In Vercel, click "Add New Project" → import that repo.
3. Framework preset: choose "Other" (or leave auto-detected as static).
4. Leave build command empty and output directory as `.` (root) — there's nothing to build.
5. Click Deploy.

**Option C — Drag and drop**
Go to vercel.com/new, and drag the whole project folder onto the page — Vercel will deploy it as a static site directly.

## Editing content

- Seed cards live in `products.html` inside `<article class="seed-card">` blocks — copy an existing one to add a new seed.
- Machinery cards live in `machinery.html` inside `<article class="machine-card">` blocks.
- The homepage gallery carousel reads `assets/gallery/manifest.json` — add a photo or video file to `assets/gallery/images/` or `assets/gallery/videos/`, add one line to the manifest, and it appears automatically. Full details in `assets/gallery/README.md`. The five images there now are placeholder brand illustrations — swap them for real photos whenever you're ready.
- Colors, type, and spacing are all defined as CSS variables at the top of `assets/css/style.css` under `:root`.
- The nutritional/wellness notes on the products page are general educational information, not medical advice — a disclaimer is included at the bottom of that page.

## Site configuration (address, phone, email, form, social links)

Everything editable — contact details, the contact-form destination, and social
media links — lives in **one file**: `assets/js/config.js`. Every page reads
from it automatically, so you never need to hunt through five HTML files to
update a phone number.

Open `assets/js/config.js` and edit the values:

```js
window.FARMIC_CONFIG = {
  phone: "+91 98663 10216",
  email: "FarmicAgro@gmail.com",
  address: {
    line1: "H.No.6-404/35, Mythri Kuteer, Laxma Reddy Palem,",
    line2: "Pedda Amberpet Village, Abdullapurmet Mandal,",
    line3: "Ranga Reddy District, Telangana - 501505"
  },
  formspreeId: "YOUR_FORM_ID",
  social: {
    youtube: "",
    x: "",
    facebook: "",
    instagram: ""
  }
};
```

**What updates automatically when you change this file:**
- Phone and email shown in the footer on every page
- The address shown on the Contact page, and the Google Map embed (built
  automatically from the address — no separate map link to maintain)
- The contact form's submission destination (see Formspree setup below)
- The four social icons in the footer — **leave a link as `""` (empty
  quotes) and that icon disappears entirely**; add a URL and it appears,
  clickable, automatically

No other file needs to change. Save `config.js` and redeploy (or just
refresh, if testing locally).

### Contact form setup (one-time, 2 minutes)

The contact form needs a place to send submissions to, since this is a
static site with no backend server. It's wired to use **Formspree** (a free
service made for exactly this):

1. Go to [formspree.io](https://formspree.io) and create a free account.
2. Create a new form — it will give you a form ID that looks like `xyzabcde`.
3. Open `assets/js/config.js` and replace `YOUR_FORM_ID` with that ID.

Until you do this, the form still works, but falls back to opening the
visitor's email app (addressed to the `email` you set above) instead of
submitting silently.

### Social icons

The four icons (YouTube, X, Facebook, Instagram) are original flat-style
icons in `assets/img/social/`. To add a new platform, drop in a new SVG
there, add a matching `data-social="yourplatform"` link in each page's
footer, and add the key to `social` in `config.js`.

## Updating content or adding pages via Vercel

Vercel itself doesn't have a built-in code editor for project files — updates happen by changing the files and redeploying. Which workflow you use depends on how you deployed:

**If you connected a GitHub/GitLab/Bitbucket repo (recommended):**
This is the easiest path for ongoing edits.
1. Go to your repo on GitHub (or wherever it's hosted).
2. Open the file you want to change (e.g. `products.html`), click the pencil/edit icon, make your change directly in the browser, and commit it.
3. Vercel automatically detects the push and redeploys within a minute or two — no local setup needed.
4. To add a new page, click "Add file" → "Create new file" in the repo, name it e.g. `about.html`, paste in HTML following the same structure as the other pages (copy an existing page as a starting point), and commit. It will be live at `yoursite.vercel.app/about.html` after the next deploy.

**If you deployed via CLI or drag-and-drop (no Git repo):**
1. Edit the files locally on your computer (any text editor works, e.g. VS Code or Notepad).
2. Redeploy by either:
   - Running `vercel --prod` again from the project folder, or
   - Dragging the updated folder onto [vercel.com/new](https://vercel.com/new) again.
3. There's no in-browser editor for this path — every update needs a fresh redeploy from your local files.

**Either way, adding a new page is just adding a new `.html` file** at the root (or in a subfolder) — Vercel serves any static HTML file automatically, no configuration needed. Link to it from the nav in `index.html`, `story.html`, `products.html`, `machinery.html` and `contact.html` (each has the same `<nav class="main-nav">` block near the top) so it shows up site-wide.

**Tip:** connecting a Git repo (first option) is worth doing even if you started with drag-and-drop — in the Vercel dashboard, go to your project → Settings → Git, and you can connect a repo at any time.

