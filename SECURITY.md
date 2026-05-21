# Security Policy

## Overview

[Microsoft Security Insights](https://dimosatteia.github.io) is a personal blog focused on Microsoft Security topics, hosted as a static site on GitHub Pages and built with [Hugo](https://gohugo.io) using the [PaperMod](https://github.com/adityatelange/hugo-PaperMod) theme.

While the attack surface of a static site is intentionally limited, security issues can still arise — in build workflows, embedded third-party content, exposed secrets, or content that could be weaponized for social engineering. As the author is a practicing CISO, security reports are taken seriously and handled with proper process.

This document explains how to report vulnerabilities responsibly and what you can expect in return.

## Reporting a Vulnerability

### Preferred channel — GitHub Private Vulnerability Reporting

Please report security issues confidentially using GitHub's Private Vulnerability Reporting:

**[Report a vulnerability →](https://github.com/dimosatteia/dimosatteia.github.io/security/advisories/new)**

This keeps the report private until a fix is available and ensures proper triage.

### Alternative channel — Email

If you cannot use GitHub PVR, email:

**dimosatteia@gmail.com**

Subject line: `Security: [brief description]`

For sensitive reports requiring encryption, request a PGP key before sharing technical details.

## What to include in a report

A useful report typically includes:

- **Description** — A clear explanation of the issue and the security property it violates (confidentiality, integrity, availability)
- **Affected URLs, files, or components** — Specific pages, scripts, workflows, or configurations
- **Steps to reproduce** — Detailed enough for independent verification
- **Potential impact** — Realistic assessment of what an attacker could achieve
- **Suggested mitigation** — Optional, but appreciated
- **Disclosure preference** — Whether you want to be credited and under what name

## Response commitment

| Stage | Timeline |
|-------|----------|
| Initial acknowledgment | Within 72 hours |
| Triage and severity assessment | Within 7 days |
| Fix or mitigation timeline communicated | Within 14 days |
| Public disclosure (if applicable) | Coordinated with reporter |

These are best-effort commitments for a personal project. Critical issues affecting reader safety will be prioritized.

## Scope

### In scope

- The `dimosatteia.github.io` site and any subdomains
- The source code and configuration in this repository
- GitHub Actions workflows used for build and deployment
- Custom Hugo shortcodes, scripts, or assets shipped with the site
- Exposed secrets, credentials, or sensitive data in commits or build artifacts

### Out of scope

- **Third-party services** linked from posts — report directly to those vendors
- **Embedded analytics** (GoatCounter) and similar providers — report upstream
- **Hugo and PaperMod themselves** — report to their respective projects:
  - Hugo: https://github.com/gohugoio/hugo/security
  - PaperMod: https://github.com/adityatelange/hugo-PaperMod/security
- **Content accuracy issues** — not security issues; use [CONTRIBUTING.md](CONTRIBUTING.md) instead
- **Social engineering, phishing, or impersonation** on platforms outside this repository (report to the platform)
- **Theoretical issues without a practical attack path** (e.g., "the site uses HTTPS but doesn't have HSTS preload") — feel free to mention them, but they may not warrant a formal advisory

## Coordinated disclosure

I support coordinated disclosure principles aligned with ISO/IEC 29147 and ENISA guidance:

- I will not pursue legal action against researchers acting in good faith
- I will work with you on an agreed disclosure timeline (typically 90 days)
- I will credit you in the acknowledgments below (with your consent)
- I ask that you do not publicly disclose the issue before a fix is deployed

## Security acknowledgments

Researchers who report valid vulnerabilities will be acknowledged here (with consent):

_No acknowledgments yet — be the first._

---

Thank you for helping keep this project and its readers secure.
