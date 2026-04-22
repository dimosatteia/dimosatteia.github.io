# Cloud & Security Insights — Hugo Blog Starter

A production-ready Hugo blog starter focused on **Microsoft 365** and
**Microsoft Security Copilot** content, branded for a **Senior Cloud
Architect** persona. Theme: **PaperMod**.

Designed to deploy to **GitHub Pages** for free, with auto-deploy on
every `git push`.

---

## What's included

```
ms-security-blog/
├── hugo.yaml                       # Main configuration (edit me first)
├── archetypes/
│   └── default.md                  # Template for new posts
├── assets/
│   └── css/extended/
│       └── custom.css              # Brand color overrides (purple accent)
├── content/
│   ├── about.md                    # About page (edit with your bio)
│   ├── search.md                   # Search page (Fuse.js)
│   └── posts/
│       ├── welcome.md
│       ├── security-copilot-part-1-architecture-licensing.md
│       └── m365-hardening-baseline-2026-intro.md
├── static/
│   └── images/                     # Drop your images, favicon, etc. here
├── .github/
│   └── workflows/
│       └── hugo.yml                # GitHub Pages auto-deploy
├── .gitignore
└── README.md
```

---

## Prerequisites

You'll need:

- **Git** — [git-scm.com](https://git-scm.com/)
- **Hugo Extended** v0.140+ — [gohugo.io/installation](https://gohugo.io/installation/)
- A **GitHub account**

On Windows: `winget install Hugo.Hugo.Extended`
On macOS: `brew install hugo`
On Linux: download the `.deb` from the Hugo releases page.

Verify Hugo is installed:

```bash
hugo version
```

You should see `extended` in the output.

---

## Quick start (local preview)

```bash
# 1. Initialise git in the project folder
cd ms-security-blog
git init
git branch -M main

# 2. Add the PaperMod theme as a submodule
git submodule add --depth=1 https://github.com/adityatelange/hugo-PaperMod.git themes/PaperMod
git submodule update --init --recursive

# 3. Run the dev server
hugo server -D
```

Open <http://localhost:1313/> in your browser. The site auto-reloads
on file changes.

---

## Customize before publishing

Open **`hugo.yaml`** and replace these placeholders:

| Placeholder | What to set it to |
|---|---|
| `YOUR-USERNAME.github.io` | Your GitHub Pages URL |
| `YOUR-USERNAME` | Your GitHub username (for "Edit on GitHub") |
| `YOUR-HANDLE` | Your social handles (LinkedIn, GitHub, X) |
| `Dimosthenis` | Your public name (or pen name) |

Open **`content/about.md`** and replace:

- The bio text
- Credentials list
- Social/contact links

Open **`assets/css/extended/custom.css`** if you want to change the
brand color away from purple. Replace `#8b5cf6` and the related shades.

(Optional) Replace the favicon files in `static/`:

- `favicon.ico`
- `favicon-16x16.png`
- `favicon-32x32.png`
- `apple-touch-icon.png`

You can generate these for free at <https://realfavicongenerator.net/>.

---

## Writing a new post

```bash
hugo new posts/my-new-post.md
```

This creates `content/posts/my-new-post.md` from the archetype
template. Edit the front matter (categories, tags, series), write
your post in Markdown, then set `draft: false` when ready to publish.

Preview locally with `hugo server -D` (the `-D` includes drafts).

### Useful front-matter fields

```yaml
title: "Your post title"
date: 2026-04-22T10:00:00+03:00
draft: false
categories: ["Microsoft 365", "Microsoft Security Copilot"]
tags: ["Defender", "KQL", "Hardening"]
series: ["Series Name"]   # auto-creates a series page if used multiple times
ShowToc: true             # show table of contents
TocOpen: false            # whether ToC is open by default
cover:
  image: "/images/my-cover.png"
  alt: "Description"
  hidden: false           # set true to hide cover on the post itself
```

---

## Deploy to GitHub Pages

### 1. Create a GitHub repository

Two options:

- **Personal site** at `https://YOUR-USERNAME.github.io/`:
  Create a repo named exactly `YOUR-USERNAME.github.io`.
- **Project site** at `https://YOUR-USERNAME.github.io/ms-security-blog/`:
  Create a repo named anything (e.g. `ms-security-blog`).

### 2. Push the project

```bash
git add .
git commit -m "Initial commit: Hugo PaperMod blog"
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
git push -u origin main
```

### 3. Enable GitHub Pages

In your GitHub repo:

1. Go to **Settings → Pages**.
2. Under **Build and deployment**, set **Source** to **GitHub Actions**.

That's it. The workflow in `.github/workflows/hugo.yml` will run
automatically on every push to `main` and deploy your site.

First build takes 1–2 minutes. Watch progress in the **Actions** tab.

### 4. (Optional) Custom domain

1. Buy a domain from any registrar.
2. In your DNS, add a CNAME record pointing to `YOUR-USERNAME.github.io`.
3. In **Settings → Pages → Custom domain**, enter your domain.
4. Tick **Enforce HTTPS** (Let's Encrypt is automatic).
5. Update `baseURL` in `hugo.yaml` to your custom domain.

---

## Day-2 maintenance

### Update the theme

```bash
git submodule update --remote --merge
git add themes/PaperMod
git commit -m "Update PaperMod theme"
git push
```

### Update Hugo version

Edit `HUGO_VERSION` in `.github/workflows/hugo.yml`. Check the latest
at <https://github.com/gohugoio/hugo/releases>.

### Add comments

PaperMod supports [Giscus](https://giscus.app/) (uses GitHub
Discussions). Set `params.comments: true` in `hugo.yaml` and add a
partial at `layouts/partials/comments.html` with your Giscus snippet.

### Add analytics

The cleanest privacy-respecting option is
[GoatCounter](https://www.goatcounter.com/) (free for personal use).
Drop their snippet in `layouts/partials/extend_head.html`.

---

## Troubleshooting

| Problem | Fix |
|---|---|
| `hugo` command not found | Install Hugo Extended (see Prerequisites) |
| Theme not loading | Did you run `git submodule update --init --recursive`? |
| Site builds but pages 404 | Check `baseURL` in `hugo.yaml` matches your URL exactly |
| Workflow fails on first push | Confirm Pages Source is set to **GitHub Actions**, not "Branch" |
| CSS changes don't show | Hard-refresh (Ctrl+Shift+R); Hugo aggressively caches |

---

## Why Hugo + PaperMod (vs WordPress)

- **Zero attack surface.** No PHP, no MySQL, no admin panel to patch.
- **Free hosting** on GitHub Pages with automatic HTTPS.
- **Version control** for every word you publish — full audit trail.
- **No vendor lock-in.** Markdown files + git. Move to Cloudflare Pages,
  Netlify, or Vercel anytime by changing one workflow file.
- **Speed.** Static HTML loads instantly. Lighthouse scores ~100/100
  out of the box.

---

## Credits

- [Hugo](https://gohugo.io/) — the world's fastest static site generator
- [PaperMod](https://github.com/adityatelange/hugo-PaperMod) — the theme

License: MIT (your content remains yours).
