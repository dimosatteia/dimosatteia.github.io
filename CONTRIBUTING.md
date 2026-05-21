# Contributing to Microsoft Security Insights

First — thanks for considering a contribution. Even small fixes (typos, broken links, an outdated screenshot) are genuinely appreciated and make this blog more useful for everyone.

This is a personal blog with a single author voice, so the contribution model here is **a bit different from a typical open-source software project**. Please read the sections below before opening an Issue or Pull Request.

## Types of Contributions

### ✅ Welcome contributions

- **Typo and grammar fixes** — Submit a PR directly, no Issue needed.
- **Broken link reports** — Open an Issue (or fix it via PR if you know the correct URL).
- **Factual corrections** — If something I wrote is technically wrong or outdated, please tell me. Microsoft's product surface changes constantly and posts age quickly.
- **Code sample improvements** — Better examples, clearer comments, security hardening, or fixes for samples that no longer work.
- **Topic suggestions** — Open an Issue with a clear description of what you'd like to see covered and why it would be useful for junior security professionals.
- **Better diagrams or visuals** — If you can produce a clearer version of an existing diagram, I'm happy to consider it.
- **Translations** — If you'd like to translate a post (especially to Greek), please open an Issue first to discuss attribution and hosting.

### ❌ Not accepted

- **Guest posts** — This blog has a single author voice; I don't accept full posts from external contributors.
- **Promotional content, affiliate links, or vendor pitches** — Even if the product is genuinely good.
- **AI-generated content** — Posts and PRs that are auto-generated without substantive human review.
- **Drive-by SEO PRs** — "Adding a useful resource" that's actually a backlink scheme.
- **Major restructuring** — Please open an Issue to discuss before invest­ing time.

## Before You Submit

### Check existing Issues and PRs

Please search [open and closed Issues](https://github.com/dimosatteia/dimosatteia.github.io/issues) and [Pull Requests](https://github.com/dimosatteia/dimosatteia.github.io/pulls) before opening a new one — your concern may already be tracked.

### For substantial changes

For anything beyond a typo or broken link, **open an Issue first** to discuss. This avoids the disappointment of submitting a large PR that doesn't fit the blog's direction.

## How to Submit Changes

### Setting up locally

1. **Fork** the repository
2. **Clone** your fork:
   ```bash
   git clone https://github.com/<your-username>/dimosatteia.github.io.git
   cd dimosatteia.github.io
   ```
3. **Install Hugo** (extended version) — see [Hugo installation docs](https://gohugo.io/installation/)
4. **Run the site locally** to preview your changes:
   ```bash
   hugo server -D
   ```
   The site will be available at `http://localhost:1313`.

### Branch naming

Use descriptive branch names with a prefix indicating the type of change:

- `fix/typo-secure-score-part-0` — typo and small fixes
- `fix/broken-link-defender-demystified-1` — broken link fixes
- `content/update-screenshot-intune-policy` — content updates
- `docs/improve-readme` — documentation changes
- `topic/intune-mam-policies` — topic suggestion (used when opening an Issue)

### Making changes

- Keep changes **focused and minimal** — one logical change per PR.
- For content changes, **preserve the original tone**: conversational, first-person, written for someone who is competent but not yet an expert.
- For code samples, **test them** before submitting. Broken samples are worse than no samples.
- For images and screenshots, follow the naming and storage conventions used elsewhere in the repository.

### Commit messages

Use clear, present-tense commit messages:

```
Good:  "Fix typo in Secure Score Part 0 introduction"
Good:  "Update Defender for Endpoint screenshot to current UI"
Bad:   "fixes"
Bad:   "Updated stuff"
```

For commits that fix specific Issues, reference them:

```
Fix broken link to Microsoft Learn in Secure Score Part 1

Closes #42
```

### Submitting the Pull Request

1. Push your branch to your fork
2. Open a Pull Request against `main`
3. Fill in the PR description with:
   - **What** changed
   - **Why** the change is needed
   - **How** you tested it (especially for code samples)
   - **References** to related Issues if any

I aim to review PRs within **7 days**. For typo-level fixes, usually much faster.

## Style Guide

To keep the blog consistent, please follow these conventions when contributing content changes:

### Voice and tone

- **First person, conversational** — "I configured this in my tenant" rather than "the tenant was configured"
- **Honest about uncertainty** — If something is unclear, say so. The audience trusts honesty more than false expertise.
- **Junior-friendly** — Define jargon on first use. Assume the reader knows IT but not necessarily Microsoft security specifics.
- **Concrete over abstract** — Real screenshots, real configurations, real outputs. Avoid generic placeholder examples.

### Formatting

- **Markdown headings** start at H2 (`##`) — H1 is reserved for the post title in front matter.
- **Code blocks** must specify the language for syntax highlighting:
  ````
  ```powershell
  Get-MgUser -Filter "..."
  ```
  ````
- **Inline code** for product names, cmdlets, file paths, and short technical terms.
- **Bold** for UI elements ("click **Save**"), not for emphasis.

### Hugo front matter

When editing existing posts, preserve the front matter structure. Don't remove or re-order existing fields without discussion.

### Images

- Place images in the post's bundle folder (alongside `index.md`)
- Use descriptive filenames: `secure-score-dashboard-overview.png`, not `image1.png`
- Always include alt text in markdown: `![Secure Score dashboard showing overall score](secure-score-dashboard-overview.png)`
- Compress images before committing — large PNGs slow down the site

## Reporting Security Issues

**Do not report security vulnerabilities through public Issues.** See [SECURITY.md](SECURITY.md) for the proper disclosure process.

## Code of Conduct

By participating in this project, you agree to abide by the [Code of Conduct](CODE_OF_CONDUCT.md). In short: be kind, be constructive, and remember that many readers are early in their security careers.

## Licensing of Contributions

By submitting a contribution, you agree that your contribution will be licensed under the same terms as the rest of the project (see [LICENSE](LICENSE)):

- **Content contributions** under Creative Commons Attribution 4.0 International (CC BY 4.0)
- **Code contributions** under the MIT License

You retain copyright to your contributions; this license is granted to the project and its readers.

## Questions?

If you're unsure whether a contribution fits, open an Issue and ask. It's much easier to discuss upfront than to rework a PR.

Thanks again for taking the time to make this blog better.

— Dimosthenis
