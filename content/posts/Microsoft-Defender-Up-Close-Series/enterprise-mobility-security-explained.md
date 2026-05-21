---
title: "Enterprise Mobility + Security Explained — E3 and E5, and When You'd Actually Buy It"
date: 2026-04-23T10:00:00+03:00
draft: true
keywords:
  - how to read a Microsoft Secure Score recommendation
  - Microsoft Secure Score recommendation fields explained
  - Microsoft Secure Score implementation status meaning
  - Microsoft Secure Score To address Planned Risk accepted
  - Microsoft Secure Score score impact vs percentage
  - Microsoft Secure Score user impact field
  - Microsoft Secure Score Implementation tab guide
  - Microsoft Secure Score for junior administrators
  - Microsoft Secure Score for SOC analysts
tags:
  - Microsoft Secure Score
  - Microsoft Defender XDR
  - Microsoft 365
  - Security Recommendations
  - Microsoft 365 Security
  - Microsoft Entra ID
  - Cyber GRC
  - Security Posture Management
  - Junior Administrator
  - SOC Analyst
  - ISO 27001
  - NIS2
author: "Dimosthenis Atteia"
description: "Enterprise Mobility + Security (EMS) is Microsoft's identity, management, and protection bundle that predates Microsoft 365 E3/E5 — and it's still actively sold. A practical walkthrough of EMS E3 ($10.60/user) and EMS E5 ($16.40/user), what's in each, and when it's the right purchase instead of (or alongside) Microsoft 365."
summary: "Enterprise Mobility + Security explained in plain language. EMS E3 and EMS E5 side by side — identity and access management, endpoint management, information protection, identity-driven security. When the EMS bundle is the right choice versus Microsoft 365 E3 or E5."
categories: ["Microsoft Licensing", "Microsoft Security"]
series: ["Microsoft Defender Up Close"]
ShowToc: true
TocOpen: false
weight: 5
cover:
  image: "/images/MDE/EMS.png"
  alt: "Enterprise Mobility + Security — E3 and E5 explained"
  caption: "Microsoft Defender Up Close"
---

> ⚠️ **Pricing note:** Prices quoted below are USD list prices from the [official Microsoft Enterprise Mobility + Security pricing page](https://www.microsoft.com/en-us/microsoft-365/enterprise-mobility-security/compare-plans-and-pricing) as verified in mid-2026. Local pricing varies by region. Always double-check current pricing with your licensing partner before committing.

## Why this post exists

If you've been around Microsoft licensing for any length of time, you've seen the phrase **Enterprise Mobility + Security (EMS)** in proposals, quotes, or old contracts. It confuses people. Is it the same as Microsoft 365 E3? Is it a subset? A superset? Did Microsoft rename it to something else? Do I still need it if I have Microsoft 365 E5?

Short answers: it's different from Microsoft 365, it's still sold, nobody renamed it, and whether you need it depends on what you already own. This post is the clear walkthrough I wish someone had handed me the first time a quote landed on my desk with "EMS E5" as a line item.

## What EMS actually is

**[Enterprise Mobility + Security](https://www.microsoft.com/en-us/security/business/microsoft-enterprise-mobility-security)** is Microsoft's **identity + management + protection** bundle. It predates the Microsoft 365 suite and is still actively sold because it solves a specific problem: organisations that already have productivity tooling they don't want to change (Google Workspace, or their existing Office licensing), but do want Microsoft's best-in-class identity, mobile management, and information protection on top.

In other words: EMS is for organisations that want **the security layer of Microsoft 365 without the Microsoft 365 productivity apps**.

The bundle comes in two tiers — E3 and E5 — mirroring the Microsoft 365 structure. Pricing as of this writing is **EMS E3 at $10.60/user/month** and **EMS E5 at $16.40/user/month**. Both are meaningfully cheaper than their Microsoft 365 counterparts (E3 at $39, E5 at $60), because you're not paying for Word, Excel, Teams, or SharePoint.

## What's in EMS E3

EMS E3 covers four capability areas:

### Identity and access management

- **Microsoft Entra ID P1** — the identity foundation
- **Simplified access management and security** — self-service password reset, group-based access
- **Multifactor authentication** — MFA enforcement across cloud apps
- **Conditional Access** — context-aware access policies
- **Advanced security reporting** — identity-related sign-in and audit logs
- **Windows Server CAL** — the Client Access License coverage for on-premises Windows Server access

### Endpoint management

- **Microsoft Intune Plan 1** — mobile device management and mobile application management across Windows, iOS, Android, macOS
- **Mobile application management** — protection of corporate data in apps without full device enrolment
- **Advanced Microsoft 365 data protection**
- **Integrated PC management**
- **Integrated on-premises management** (co-management scenarios with Configuration Manager)

### Information protection (partial)

- **Persistent data protection** — Microsoft Purview Information Protection at the classification and labelling level
- **Document tracking and revocation**
- **Encryption key management** per regulatory needs

### Identity-driven security (partial)

- **Microsoft Advanced Threat Analytics** (ATA — legacy on-premises product, extended support through January 2026)

> 📷 **Image 1 — EMS pricing page comparison table.**
> *Capture from https://www.microsoft.com/en-us/microsoft-365/enterprise-mobility-security/compare-plans-and-pricing — screenshot the side-by-side comparison table showing E3 vs E5 feature differences.*

## What E5 adds on top

EMS E5 includes everything in E3, plus meaningful upgrades across three areas:

### Identity and access management — E5 upgrades

- **Microsoft Entra ID P2** — the full identity feature set, not just P1
- **Risk-based Conditional Access** — the policy engine can now factor in sign-in risk and user risk scores
- **Privileged Identity Management (PIM)** — just-in-time elevation for admin roles, with approval workflows and audit trails

### Information protection — E5 upgrades

- **Intelligent data classification and labelling** — the automatic sensitivity label recommendations driven by Microsoft Purview's content scanning

### Identity-driven security — E5 upgrades

- **Microsoft Defender for Cloud Apps** — the full CASB, as we covered in the [Microsoft Defender for Cloud Apps deep dive](/posts/microsoft-defender-for-cloud-apps-deep-dive/)
- **Microsoft Defender for Identity** — the identity threat detection product, as we covered in the [Microsoft Defender for Identity deep dive](/posts/microsoft-defender-for-identity-deep-dive/)

The jump from EMS E3 to EMS E5 is the jump from *"we manage identities and devices"* to *"we manage identities and devices **and** we have identity threat detection, SaaS security, and risk-aware policies"*.

## Where EMS sits relative to Microsoft 365

This is the part that trips most people up. Here's the relationship:

- **Microsoft 365 E3** = Microsoft productivity apps + Windows 11 Enterprise + **EMS E3** + basic Defender (MDE P1, MDO P1)
- **Microsoft 365 E5** = Microsoft productivity apps + Windows 11 Enterprise + **EMS E5** + full Defender stack + Microsoft Sentinel integration + Security Copilot + Power BI Pro + advanced Microsoft Purview

In other words, Microsoft 365 bundles EMS inside itself. If you buy Microsoft 365 E5, you already have EMS E5 — you don't need to buy it again. Don't let anyone sell you both.

> 📷 **Image 2 — The Microsoft 365 Admin Center licenses page showing assigned licenses.**
> *Capture from: admin.microsoft.com → Billing → Licenses. Show your assigned licenses — this is how you verify what you actually own. Redact counts if sensitive.*

## When EMS is the right buy

Three legitimate scenarios:

### Scenario 1 — You already use a non-Microsoft productivity suite

Your organisation runs on Google Workspace for email, docs, and collaboration. Your CIO isn't changing that. But you need enterprise-grade identity, mobile device management, and information protection, and you don't want three different vendors for those.

**Buy EMS E3 or E5.** You get the security and management layer of Microsoft 365 without paying for productivity apps you won't use. This is the most common legitimate EMS-standalone scenario.

### Scenario 2 — You have existing Office licensing you're not ready to replace

You bought volume-licensed Office Professional Plus years ago for perpetual use, and you're not yet ready to migrate to subscription-based Microsoft 365 Apps. You still want modern identity and security, though.

**Buy EMS E3 or E5** as the add-on layer. This is slightly less common in 2026 than it was five years ago — most organisations have migrated to subscription — but the scenario still exists, especially in public sector and regulated industries.

### Scenario 3 — You're adding security to a partial Microsoft 365 deployment

You have some users on Microsoft 365 Business Standard (productivity only, no security/management) and want to add the security layer without upgrading everyone to Business Premium.

Technically, Business Standard + EMS is a valid combination, but in practice Business Premium is usually a better value. Check with a licensing partner before committing.

## When EMS is *not* the right buy

**You already have Microsoft 365 E3 or E5.** You already own EMS. Don't pay twice.

**You need only one or two EMS components.** If you specifically need just Microsoft Entra ID P1 or just Microsoft Intune, those are available as standalone products at lower per-user cost. The EMS bundle pays off when you'd buy at least three of its components anyway.

**You're under 300 users and mostly on Microsoft productivity tools.** Microsoft 365 Business Premium at $22/user is almost certainly a better fit — you get EMS-equivalent security plus the full productivity suite.

## A decision checklist

- ☐ **Do you already own Microsoft 365 E3 or E5?** → You already have EMS. Stop here.
- ☐ **Are you under 300 users on Microsoft productivity tools?** → Microsoft 365 Business Premium. Stop here.
- ☐ **Do you use a non-Microsoft productivity suite (Google Workspace, etc.)?** → EMS is likely the right call. E3 if basic, E5 if you need Defender for Identity + Defender for Cloud Apps + PIM.
- ☐ **Do you have perpetual-license Office you're not replacing?** → EMS as an add-on works. Evaluate E3 vs E5 by the identity-threat-detection and CASB question.
- ☐ **Do you need only one or two components?** → Standalone SKUs (Microsoft Entra ID P1/P2, Microsoft Intune Plan 1/2) may be cheaper.

> 📷 **Image 3 — Standalone EMS-component SKUs page.**
> *Capture from: the Microsoft licensing page showing Microsoft Entra ID pricing and Microsoft Intune pricing. Or from admin.microsoft.com → Billing → Purchase services, searching for "Entra ID" or "Intune". This is the page that shows the à-la-carte alternative.*

## Where to go from here

> 🔗 **Read the Microsoft Defender Up Close series** for practical walkthroughs of the workloads inside EMS E5: **[Microsoft Defender for Endpoint](/posts/microsoft-defender-for-endpoint-deep-dive/)**, **[Microsoft Defender for Office 365](/posts/microsoft-defender-for-office-365-deep-dive/)**, **[Microsoft Defender for Identity](/posts/microsoft-defender-for-identity-deep-dive/)**, **[Microsoft Defender for Cloud Apps](/posts/microsoft-defender-for-cloud-apps-deep-dive/)**.

> 🔗 **Curious how to turn any of these into measurable compliance?** Read **[How We Built a Gold-Winning GRC Programme on Microsoft Secure Score](/posts/secure-score-grc-part-0-intro/)**.

Follow me on [LinkedIn](https://www.linkedin.com/in/dimosthenisatteia/) for new-post notifications, or subscribe via RSS at the top of the page.

## Microsoft Learn and pricing resources

- [Enterprise Mobility + Security pricing and plans](https://www.microsoft.com/en-us/microsoft-365/enterprise-mobility-security/compare-plans-and-pricing)
- [Enterprise Mobility + Security licensing details](https://www.microsoft.com/en-us/licensing/product-licensing/enterprise-mobility-security)
- [Microsoft Security products hub](https://www.microsoft.com/en-us/security/)
- [Microsoft Entra ID P1 vs P2](https://learn.microsoft.com/en-us/entra/fundamentals/licensing)
- [Microsoft Intune plans](https://learn.microsoft.com/en-us/mem/intune/fundamentals/licenses)
- [Microsoft Purview Information Protection](https://learn.microsoft.com/en-us/purview/information-protection)

---

<!--
IMAGE NOTES
Image 1: Screenshot the EMS comparison table at
  https://www.microsoft.com/en-us/microsoft-365/enterprise-mobility-security/compare-plans-and-pricing
Image 2: admin.microsoft.com → Billing → Licenses (redact counts if sensitive)
Image 3: Licensing page showing standalone Entra ID / Intune SKUs, or
  admin.microsoft.com → Billing → Purchase services (search "Entra" or "Intune")
Save to /static/images/posts/enterprise-mobility-security-explained/
-->
