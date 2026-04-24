---
title: "Microsoft Defender Demystified — Part 4: Which Defender Do You Actually Need?"
date: 2026-04-23T10:00:00+03:00
draft: true
author: "Dimosthenis"
description: "The most practical post in the Microsoft Defender Demystified series. Which Microsoft 365 plan includes which Defender? When does Business Premium beat E3? When is E5 worth the jump? Three realistic scenarios, verified 2026 prices, a decision flow you can actually use."
summary: "Part 4 of the Microsoft Defender Demystified series. A licensing decoder across the 2026 Microsoft 365 lineup, including the new Defender Suite add-ons, the July 2026 pricing update, and three real-world scenarios (small business, mid-market, enterprise) for sizing the right purchase."
tags: ["microsoft-defender", "microsoft-365", "licensing", "microsoft-365-e3", "microsoft-365-e5", "microsoft-365-business-premium", "microsoft-defender-suite", "fundamentals"]
categories: ["Microsoft Defender", "Microsoft 365"]
series: ["Microsoft Defender Demystified"]
ShowToc: true
TocOpen: false
weight: 4
cover:
  image: "" # TODO: cover image — see Image 1 instructions (comparison table of Defender entitlements by plan)
  alt: "Microsoft Defender licensing across Microsoft 365 plans"
  caption: "Microsoft Defender Demystified — Part 4"
---

> ⚠️ **Prices move.** Everything below is in **USD, list price, as of July 1, 2026**, when Microsoft's most recent pricing and packaging update took effect. Local pricing varies by region and currency. Always double-check on the official **[Microsoft 365 plans page](https://www.microsoft.com/en-us/microsoft-365/business/compare-all-plans)** and the **[Microsoft Defender for Cloud pricing page](https://azure.microsoft.com/en-us/pricing/details/defender-for-cloud/)** before making a purchase decision.

## The licensing conversation most of us dread

If you've done any time in Microsoft security, you'll have had this meeting. Finance or procurement wants a number. Leadership wants to know whether you're over-licensed or under-licensed. Someone says *"let's just buy E5, problem solved"* and someone else says *"E5 is overkill, we're a small shop"*. A third person mentions the "Defender Suite" that they heard about at a conference but nobody in the room is entirely sure what that includes.

Everyone wants clarity. Nobody wants to read the [Microsoft 365 Subscription Suites licensing guidance](https://www.microsoft.com/licensing/guidance/subscription-suites) end to end, which is fair — it's thorough and important but it isn't exactly written to help you make a Tuesday-morning decision.

This post is the Tuesday-morning version. We'll cover what Microsoft 365 Business Premium, E3, and E5 actually give you from the Defender family, the newish Defender Suite add-ons that Microsoft launched in late 2025, three realistic organisation profiles, and a decision flow you can take into your next budget meeting.

## Two universes to keep separate in your head

Before we look at any plan comparison, this distinction:

- **Microsoft Defender XDR** (everything we covered in Part 2 — endpoint, email, identity, SaaS) is licensed **per user, per month** as part of a **Microsoft 365** plan.
- **Microsoft Defender for Cloud** (Part 3 — Azure and multicloud workloads) is licensed **per resource, per month** as part of your **Azure consumption**.

These show up on different invoices. Your Microsoft 365 E5 license gives you zero Microsoft Defender for Cloud entitlement, and vice versa. I've seen companies budget for "Defender" as a single line item and be unpleasantly surprised when the two different products turn up as two different costs.

The rest of this post focuses on the per-user, Microsoft 365 side. We'll close with a quick note on the Azure side.

## The Microsoft 365 ladder, from least to most security

> 📷 **Image 1 — Comparison table of Microsoft 365 plans and their Defender entitlements.**
> *Build in PowerPoint as a 4-column table — Business Premium | M365 E3 | M365 E5 | E3 + Defender Suite. Rows are Defender products (MDE P1/P2, MDO P1/P2, MDI, MDCA, etc.) with checkmarks. Microsoft Fluent palette (#0078D4). Export as 1920×1080 PNG. This is the visual readers will screenshot and share — invest the time to make it clean.*

Here's what each main Microsoft 365 plan currently includes from the Defender family, after the **July 2026 packaging update** that added meaningful security capabilities to lower-tier plans.

### Microsoft 365 Business Basic — $7/user/month

- **Safe Links URL checks** in Outlook (added in the 2026 packaging update)

That's it from the Defender family. This plan is for lightweight collaboration accounts that barely need security tooling.

### Microsoft 365 Business Standard — $14/user/month

- **Safe Links URL checks** in Outlook

Similar story. Business Standard is a productivity plan, not a security plan.

### Microsoft 365 Business Premium — $22/user/month

This is the security sweet spot for anyone under 300 users. Worth flagging that **its price did not change** in the July 2026 update while E3 and E5 both went up — so the value gap has actually widened. What you get:

- **Microsoft Defender for Business** — a streamlined Microsoft Defender for Endpoint experience with simpler setup and SMB-friendly defaults
- **Microsoft Defender for Office 365 Plan 1** — Safe Links, Safe Attachments, anti-phishing
- **Microsoft Entra ID P1** — Conditional Access, MFA enforcement
- **Microsoft Intune Plan 1** — full mobile device and application management

For a small or mid-sized business, one $22 license replaces what used to need a separate antivirus, an email security gateway, an MDM product, and an identity governance tool. The only real ceiling is the 300-user cap — once you cross that, you need to move to Enterprise plans.

Honestly, if someone asks me the single best per-dollar security decision in the entire Microsoft catalogue, this is my answer. It's not close.

### Microsoft 365 E3 — $39/user/month

E3 is the standard enterprise productivity plan. After the July 2026 packaging update, it includes noticeably more security than it used to:

- **Microsoft Defender for Endpoint Plan 1** — preventive endpoint protection
- **Microsoft Defender for Office 365 Plan 1** *(newly added in 2026)* — Safe Links, Safe Attachments, anti-phishing
- **Microsoft Entra ID P1** — Conditional Access, MFA, basic identity governance
- **Microsoft Intune Plan 1 + Plan 2** — including Remote Help and Advanced Analytics
- **Windows 11 Enterprise**

E3 works if you want enterprise productivity plus *basic* security, with the option to bolt on advanced security separately.

### Microsoft 365 E5 — $60/user/month

E5 is the full enterprise security stack in a single per-user SKU. Everything in E3, plus:

- **Microsoft Defender for Endpoint Plan 2** — full EDR, automated investigation and response, vulnerability management
- **Microsoft Defender for Office 365 Plan 2** — adds Attack Simulation Training and Threat Explorer
- **Microsoft Defender for Identity** — on-premises AD and Microsoft Entra ID protection
- **Microsoft Defender for Cloud Apps** — the CASB for SaaS visibility and control
- **Microsoft Entra ID P2** — Privileged Identity Management, Identity Protection
- **Microsoft Sentinel** integration, unified into the Defender portal
- **Microsoft Security Copilot** *(newly included at no extra cost in 2026)*
- **Microsoft Purview** advanced compliance, eDiscovery Premium, Insider Risk Management
- **Microsoft Cloud PKI** *(added in 2026)*
- **Microsoft Power BI Pro**

E5 is for organisations that want a unified security and compliance stack from one vendor rather than stitching together point products. The $21 gap over E3 sounds like a lot until you price out what it would cost you separately for a SIEM, an EDR, a CASB, identity protection, Power BI, and now Security Copilot. Those numbers add up fast.

### Microsoft 365 E7 — $99/user/month *(new in 2026)*

The new top tier. Everything in E5 plus **Microsoft 365 Copilot**, **Microsoft Entra Suite**, and **Microsoft Agent 365**. This one is for AI-forward enterprises and isn't primarily a security upgrade — E5 already gives you the full Defender story.

## The 2026 Defender Suite add-ons — actually useful flexibility

Until late 2025, if you wanted E5-level Defender capabilities but were stuck on E3 or Business Premium, your only realistic option was the full upgrade. That changed. Microsoft launched **standalone Defender Suite add-ons** that let you layer enterprise-grade security onto lower-tier plans without committing to E5 across the board.

- **Microsoft Defender Suite** *(formerly "Microsoft 365 E5 Security")* — adds to **Microsoft 365 E3** the missing pieces: Defender for Endpoint Plan 2, Defender for Office 365 Plan 2, Defender for Identity, Defender for Cloud Apps, and Microsoft Entra ID P2.
- **Microsoft Defender Suite for Business Premium** — the same idea for Business Premium customers, with the prerequisite dropped in late 2025.

One small but important operational note from the Microsoft licensing docs: a tenant that ends up with both **Microsoft Defender for Business** (from Business Premium) and **Defender for Endpoint Plan 2** (from the Defender Suite add-on) **defaults to the Defender for Business experience**. Plan accordingly if you're mixing.

> 📷 **Image 2 — The official Microsoft 365 plans comparison page.**
> *Capture from https://www.microsoft.com/en-us/microsoft-365/business/compare-all-plans — a screenshot of the full comparison table. Including this shows readers the canonical source and reinforces that you're citing Microsoft directly, not third-party interpretations.*

## Three realistic scenarios

### Scenario 1 — the small firm (50 people)

**Profile:** 50 knowledge workers, no on-premises infrastructure, hybrid work, GDPR obligations, no dedicated security team.

**Recommendation:** **Microsoft 365 Business Premium**. That's the whole answer.

For around $1,100 a month total, you get genuinely strong security — endpoint protection, email protection, Conditional Access, MFA, MDM. You won't outgrow it until you hit 300 users. For any professional asked to secure a small firm on a realistic budget, this is the cleanest recommendation you can make.

If you also handle highly sensitive data (legal, healthcare, financial advisory), consider adding the **Microsoft Defender Suite for Business Premium** add-on. You get the full enterprise Defender stack at SMB-friendly pricing.

### Scenario 2 — the mid-market organisation (500 people)

**Profile:** 500 people, a mix of office and shop-floor workers, on-premises Active Directory, growing Microsoft Entra ID footprint, ISO 27001 in scope, NIS2 in scope, a small but real security team.

**Recommendation:** **Microsoft 365 E3 + Microsoft Defender Suite add-on** for the office workers, **Microsoft 365 F3** for the shop-floor workers.

Why this beats standardising on E5:

- Shop-floor users (say 200 of the 500) don't need full E3 or E5. F3 at $10/user/month is the right fit.
- The 300 office knowledge workers get E3 ($39) plus the Defender Suite add-on, which gives them E5-equivalent security at a lower blended cost than E5 across the board.
- If you don't have 24x7 SOC coverage in-house, the **Microsoft Defender Experts Suite** (generally available from January 2026) layers managed XDR services on top.

This pattern — **right-sizing licenses instead of uniformly deploying E5** — saves mid-market organisations 15–30% in many engagements I've seen. It's worth the thirty minutes to actually do the analysis.

### Scenario 3 — the enterprise (5,000 people, multicloud)

**Profile:** 5,000 people, multiple business units, hybrid AD plus Microsoft Entra ID, full SOC team, compliance obligations spanning ISO 27001, NIS2, GDPR, and DORA, workloads running in both Microsoft Azure and Amazon Web Services.

**Recommendation:** a **tiered mix**:

- **E5** for executives, legal, finance, IT, and the security team — roughly 5–10% of users — to unlock Privileged Identity Management, Microsoft Security Copilot, eDiscovery Premium
- **E3 + Defender Suite add-on** for the majority (~80%) of standard knowledge workers
- **F1 / F3** for frontline workers
- **Microsoft Defender for Cloud** plans (Defender CSPM plus Defender for Servers Plan 2 plus Defender for Storage, and others as needed) on the Azure side
- **Microsoft Sentinel** as the SIEM, unified into the Defender portal

The mistake a lot of enterprises make is **uniform E5 deployment** without actually checking feature usage. Industry data suggests around 38% of E5 licenses are oversized for their actual users. That's a real recovery opportunity whenever someone does the analysis properly.

## What about Microsoft Defender for Cloud pricing?

Quick recap from **[Part 3](/posts/defender-demystified-part-3-defender-for-cloud/)**:

- **Foundational CSPM** — free for any onboarded Azure subscription, AWS account, or GCP project
- **Defender CSPM** (paid tier) — around $5 per billable resource per month
- **CWPP plans** (Servers, Storage, Containers, Databases, and the rest) — each with its own per-resource pricing

Use the **[official calculator](https://azure.microsoft.com/en-us/pricing/details/defender-for-cloud/)** before enabling. Costs scale with your estate, and large estates can add up quickly.

## A decision flow you can actually use

If you take one thing from this post, take this:

- **Under 300 users, no special compliance burden?** → Microsoft 365 Business Premium
- **Under 300 users, regulated industry or sensitive data?** → Business Premium + Defender Suite for Business Premium add-on
- **300+ users, basic security needs, flexibility valued?** → E3 + Defender Suite add-on for security-tier users
- **300+ users, want everything in one SKU?** → E5 (but right-size — don't deploy uniformly)
- **Frontline workers in any of the above?** → F1 / F3 + appropriate F-series security add-ons
- **Any Azure / AWS / GCP workloads?** → Foundational CSPM turned on today (free), then evaluate paid plans

> 📷 **Image 3 — A decision flowchart based on the bullets above.**
> *Build in PowerPoint or draw.io. Five decision diamonds, six recommended outcomes. Microsoft Fluent palette. This is the second highly shareable image of the post — readers will screenshot it and forward it to finance.*

## What's next

In **Part 5** — the final post of this series — we open the **Microsoft Defender portal** at `security.microsoft.com` together and go on a guided tour. Where to find each workload, where Microsoft Secure Score now lives, how to set up the right roles, and a practical "first hour in the portal" agenda you can follow today.

> 🔗 **Related deep-dive series:** Once you've chosen your licensing, the next question is what to do with it. [How We Built a Gold-Winning GRC Programme on Microsoft Secure Score](/posts/secure-score-grc-part-0-intro/) walks through turning Microsoft Defender telemetry into an award-winning compliance programme, end to end.

Follow me on [LinkedIn](https://www.linkedin.com/in/dimosthenisatteia/) for new-post notifications, or subscribe via RSS at the top of the page.

## Microsoft Learn resources

- [Microsoft 365 plans comparison (official)](https://www.microsoft.com/en-us/microsoft-365/business/compare-all-plans)
- [Microsoft 365 Subscription Suites licensing guidance](https://www.microsoft.com/licensing/guidance/subscription-suites)
- [Microsoft 365 service descriptions](https://learn.microsoft.com/en-us/office365/servicedescriptions/office-365-service-descriptions-technet-library)
- [Microsoft Defender for Endpoint plans comparison](https://learn.microsoft.com/en-us/defender-endpoint/defender-endpoint-plan-1-2)
- [Microsoft Defender for Office 365 plan comparison](https://learn.microsoft.com/en-us/defender-office-365/mdo-security-comparison)
- [Microsoft Defender for Cloud pricing](https://azure.microsoft.com/en-us/pricing/details/defender-for-cloud/)
- [Microsoft Defender Experts Suite](https://learn.microsoft.com/en-us/defender-xdr/dex-xdr-overview)

---

<!--
=========================================================
IMAGE PRODUCTION NOTES (delete before publish)
=========================================================

Image 1 — Microsoft 365 Defender entitlements comparison table (cover)
  Tool: PowerPoint
  Layout: 4-column table
    Columns: Defender component | Business Premium | M365 E3 | M365 E5 | E3 + Defender Suite
  Rows:
    - Defender for Business
    - Defender for Endpoint Plan 1
    - Defender for Endpoint Plan 2
    - Defender for Office 365 Plan 1
    - Defender for Office 365 Plan 2
    - Defender for Identity
    - Defender for Cloud Apps
    - Microsoft Entra ID P1
    - Microsoft Entra ID P2
    - Microsoft Sentinel integration
    - Microsoft Security Copilot
  Checkmarks (✓) and dashes (—)
  Microsoft Fluent palette (#0078D4 headers, #F3F2F1 alternating rows)
  Format: 1920×1080 PNG
  Most shareable visual in the post — invest the time to make it beautiful

Image 2 — Microsoft 365 plans comparison page
  Source: https://www.microsoft.com/en-us/microsoft-365/business/compare-all-plans
  Capture: full comparison table from Microsoft's own page
  Format: 16:9 or wider
  No redaction needed — public Microsoft page

Image 3 — Decision flowchart
  Tool: PowerPoint or draw.io
  Layout: top-down flowchart with five decision diamonds
    - Under 300 users? Y/N
    - Regulated industry? Y/N
    - Want everything unified? Y/N
    - Frontline workers? Y/N
    - Cloud workloads? Y/N
  Outcomes:
    - Business Premium
    - Business Premium + Defender Suite add-on
    - E3 + Defender Suite add-on
    - E5 (right-sized)
    - F1 / F3 + add-ons
    - Defender for Cloud Foundational CSPM
  Microsoft Fluent palette
  Format: 1920×1080 PNG

TODO before publish:
  [ ] Build the 3 visuals (comparison table is the highest priority)
  [ ] Capture the Microsoft 365 comparison page
  [ ] Save to /static/images/posts/defender-demystified-part-4/
  [ ] Replace 📷 placeholders with inline ![alt](path) markdown
  [ ] Verify all internal links resolve
  [ ] Re-verify prices on Microsoft pages on the day of publication
      (pricing changes, and accuracy matters here)

OPTIONAL ENHANCEMENT:
  Build a small interactive HTML widget that filters Defender entitlements
  by selected plan. Hugo supports raw HTML in markdown. This is a
  portfolio-worthy asset for any MVP application.
=========================================================
-->
