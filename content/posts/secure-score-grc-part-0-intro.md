---
title: "How We Built a Gold-Winning GRC Programme on Microsoft Secure Score — Series Introduction"
date: 2026-04-22T10:00:00+03:00
draft: false
author: "Dimosthenis"
description: "How Microsoft 365 Secure Score became the engine of an ISO 27001:2022 and NIS2 compliance programme that won the Gold Award at the Cyber Security Awards 2026. A practical, screenshot-driven series for CISOs and M365 admins who want fast, defensible results without buying another GRC platform."
summary: "Series introduction. The business problem, what Microsoft 365 already gives you for free, the four building blocks of the programme that won Gold, and what the next 7 posts will teach you to replicate."
tags: ["secure-score", "microsoft-365", "microsoft-defender", "grc", "nis2", "iso-27001", "purview", "compliance", "ciso", "cyber-security-awards"]
categories: ["GRC & Frameworks", "Microsoft 365"]
series: ["Microsoft Secure Score as a Cyber GRC Instrument"]
ShowToc: true
TocOpen: false
weight: 1
cover:
  image: "/images/CyberGRCGoldAward.png" # TODO: cover image — see image instructions at the bottom of this file
  alt: "Microsoft Secure Score dashboard powering a Gold-winning GRC programme"
  caption: "Series introduction — built on Microsoft 365"
---

## The problem every mid-market Professional recognises

If you run security in a mid-market organisation that is in scope for **NIS2** or pursuing **ISO 27001:2022**, you know the squeeze. Regulatory demands are growing fast. Audit cycles are tight. Boards want cyber risk in numbers, not narratives. And the GRC budget — let's be honest — is never what it should be.

Most teams answer this by buying a dedicated GRC platform or by hiring more analysts. We took a different route, and I want to share it because it is reproducible by almost any organisation that already runs **Microsoft 365**.

## What we found already sitting inside Microsoft 365

We were already licensed for **Microsoft 365 E5**. We already used **[Microsoft Defender XDR](https://learn.microsoft.com/en-us/defender-xdr/microsoft-365-defender)** every day. And right there, in the Microsoft Defender portal, was something most teams treat as a vanity dashboard: **[Microsoft Secure Score](https://learn.microsoft.com/en-us/defender-xdr/microsoft-secure-score)**.

![The Microsoft Secure Score dashboard](/images/Overall.png)
> 📷 **Image 1 — The Microsoft Secure Score dashboard.**

Looking at it with fresh eyes, we realised Microsoft had already done most of the heavy GRC lifting:

- A **continuously refreshed assessment** of our tenant configuration against a control catalogue Microsoft maintains and updates as the threat landscape shifts.
- A **machine-readable dataset**, exposed via the **[Microsoft Graph Security API](https://learn.microsoft.com/en-us/graph/api/resources/security-api-overview)**, that any modern reporting tool can consume.
- **Native integration** with **[Microsoft Purview Compliance Manager](https://learn.microsoft.com/en-us/purview/compliance-manager)**, **Microsoft Sentinel**, and **Power BI** — platforms we already owned.

The gap we had to bridge was small: connect Microsoft's data to our compliance frameworks, build the right reports, and put governance around the risk decisions. Additional third-party spend: essentially nothing.

## The Gold Award

![The Cyber Security Award Logo](/images/CyberGRCGoldAward.png)
> 📷 **Image 2 — The Gold Award Logo.**

![The Cyber Security Award Plate](/images/CyberGRCGoldAwardPlate.png)
> 📷 **Image 3 — The Gold Award Plate.**

![The Cyber Security Award Ceremony](/images/CSAward2026_1.png)
> 📷 **Image 4 — The Gold Award Ceremony with colleagues.**

The programme we built on this foundation received the **Gold Award in Governance, Risk & Compliance at the [Cyber Security Awards 2026 — Honoring Cyber Excellence](https://cybersecurityawards.boussiasevents.gr/winners_2026-45/)**, under the title *"From theory to measurable compliance: Microsoft Secure Score as a Cyber GRC tool"*.

The principle the panel recognised is the same one that runs through this entire series: **Microsoft 365 already contains the GRC engine most organisations are paying separately to acquire.** They just need to recognise it for what it is and wire it correctly.

## How we did it — four building blocks on top of Microsoft 365

The full implementation will be unpacked, with screenshots and worked examples, across the next seven posts. Here is the shape, so you can decide whether to follow along.

### Building block 1 — Microsoft Secure Score as the single source of truth

![Microsoft Secure Score Recommendation](/images/PrMFA0.png)
> 📷 **Image 5 — A Secure Score recommendation about "Ensure 'Phishing-resistant MFA strength' is required for Administrators", expanded.**

![Microsoft Secure Score General Action](/images/PrMFA1.png)
> 📷 **Image 6 — A general recommendation regarding this specific Secure Score action.**

![Microsoft Secure Score Implementation](/images/PrMFA2.png)
> 📷 **Image 7 — A Secure Score implementation for the specific action.**

We stopped treating Secure Score as a number to raise. We started treating each recommendation as a **continuously tested control**. Microsoft tells us, in real time, which controls are configured, which are not, and — crucially — provides the implementation guidance and user-impact analysis right inside each recommendation. That guidance, written by Microsoft engineering, is gold for any GRC team that previously had to draft remediation plans from scratch.

### Building block 2 — Bridging Microsoft Compliance Manager with Secure Score for live evidence

Here is where the Microsoft platform already does an enormous amount of the work, and most teams don't realise it.

**[Microsoft Purview Compliance Manager](https://learn.microsoft.com/en-us/purview/compliance-manager)** ships with pre-built assessments for **ISO/IEC 27001:2022**, **NIS 2 Directive**, **GDPR**, **NIST CSF**, and over 300 other regulations. Microsoft has done the foundational mapping for you: each framework control is linked to one or more **Improvement Actions** — concrete configuration changes you can make across Microsoft 365, Entra ID, Microsoft Purview, and Azure to satisfy that control.

![Microsoft Purview Compliance Manager, ISO 27001:2022 assessment, Authentication Information, Control ID A.5.17](/images/A.5.17_AuthenticationInformation.png)
> 📷 **Image 8 — Microsoft Purview Compliance Manager, ISO 27001:2022 assessment, Authentication Information, Control ID A.5.17.**

What Compliance Manager does *not* give you out of the box is a live link between an Improvement Action and the corresponding **Microsoft Secure Score** recommendation that proves the control is currently configured correctly across your tenant. The Improvement Action tells you *what to do*; Secure Score tells you, in real time, *whether it is done*.

This is exactly the gap we closed. We built a thin mapping layer that, for each Compliance Manager Improvement Action covered by ISO 27001:2022 Annex A and NIS2 Article 21, identifies the matching Microsoft Secure Score recommendation and pulls its current state via the Microsoft Graph API. The result: **a live evidence view over Microsoft's own framework mappings**, so a control is not "satisfied" because someone ticked a box — it is satisfied because Microsoft Secure Score confirms today, with a timestamp, that the configuration is in place.

Roughly **60–70%** of the technical controls in ISO 27001:2022 Annex A and NIS2 Article 21 can be evidenced this way directly from Microsoft Secure Score telemetry. The remaining 30–40% are covered either by other Microsoft Purview tooling (Data Loss Prevention, Information Protection, Insider Risk Management) or by documented organisational procedures. The mapping self-maintains: when Microsoft adds or revises an Improvement Action or a Secure Score recommendation, we triage the change once and the live evidence pipeline picks it up automatically.

**Parts 2 and 3** of this series walk through the full ISO 27001:2022 and NIS2 mapping tables, with the exact Compliance Manager → Secure Score linkages we use.

### Building block 3 — Microsoft Graph API + Power BI for live audit evidence

Using the **Microsoft Graph Security API**, we pull Secure Score telemetry into a Power BI workspace daily. The output is a live evidence dashboard that auditors can be given read-only access to, with full timestamped history. No more screenshot-scrambles before the next surveillance audit.

![Microsoft PowerBi for live audit evidence](/images/PBI_Def.png)
> 📷 **Image 9 — Microsoft PowerBi for live audit evidence.**

This is pure Microsoft stack: no scripts running outside the tenant, no data leaving Microsoft 365, no extra licensing. **Part 4** of this series will give you the exact Graph queries, the Power BI data model, and the report templates we use.

### Building block 4 — Microsoft Purview Compliance Manager for the board view

For board reporting we pair Secure Score data with **Microsoft Purview Compliance Manager**, which Microsoft pre-populates with assessments aligned to **ISO 27001, NIS2, GDPR**, and dozens of other frameworks. The combination gives the board both a security-configuration view (Secure Score) and a regulatory-conformance view (Compliance Manager) in a single quarterly slide.

## The business results

Within the first year of running the programme:

- **Audit preparation time** for ISO 27001 surveillance dropped from weeks to days.
- **Board cyber-risk reporting** moved from qualitative narratives to live, defensible numbers backed by Microsoft telemetry.
- **Microsoft Secure Score** itself improved by **30%** — and every remaining gap is a documented, board-approved risk decision.
- **Total external GRC tooling cost: €0.** Everything was delivered on the existing Microsoft 365 E5 investment.
- And, the Gold Award.

## What you will get from this series

The goal of the series is simple: help you understand Microsoft Secure Score well enough to turn it into a real governance and compliance instrument for your organisation, the same way we did for ours.

To get there without skipping steps, the recommended reading path is:

**Foundation first — the Microsoft Defender family**

If the names Microsoft Defender for Endpoint, Microsoft Defender for Office 365, Microsoft Defender for Identity, or Microsoft Defender for Cloud Apps don't mean much to you yet, start with the companion series that covers the whole Microsoft Defender ecosystem end to end:

1. **Microsoft Defender Demystified — Part 1: How Many Defenders Are There, Really?** — the whole family map in one post.
<!-- /posts/defender-demystified-part-1-what-is-microsoft-defender/ -->

2. **Microsoft Defender Demystified — Part 2: The Four Core XDR Workloads, Up Close** — what each workload protects.
<!-- /posts/defender-demystified-part-2-four-workloads/ -->

3. **Microsoft Defender Demystified — Part 3: Microsoft Defender for Cloud** — the Azure and multicloud story.
<!-- /posts/defender-demystified-part-3-defender-for-cloud/ -->

4. **Microsoft Defender Demystified — Part 4: Which Defender Do You Actually Need?** — licensing across Microsoft 365 and Enterprise Mobility + Security.
<!-- /posts/defender-demystified-part-4-licensing-decoder/ -->

5. **Microsoft Defender Demystified — Part 5: A Walk Through the Microsoft Defender Portal** — where everything lives.
<!-- /posts/defender-demystified-part-5-portal-tour/ -->

6. **Enterprise Mobility + Security Explained** — the security bundle many organisations already own and don't fully use.
<!-- /posts/enterprise-mobility-security-explained/ -->

Want to go deeper into any single workload? The **[Microsoft Defender Up Close]** series has hands-on, configuration-level walkthroughs of Microsoft Defender for Endpoint, Office 365, Identity, and Cloud Apps.
<!-- (/series/microsoft-defender-up-close/) -->

**Then — the Secure Score series itself**

Once the Microsoft Defender landscape feels familiar, come back here. You'll now have the context to follow what Microsoft Secure Score is actually measuring.

1. **[Opening Your First Recommendation]** — every field on a Microsoft Secure Score recommendation, explained the way a friendly colleague would. Written for people opening the score for the first time.
<!-- (/posts/secure-score-grc-part-1-anatomy/) -->
2. **[Where Microsoft Secure Score Sits in the Microsoft Defender World]** — how the scoreboard actually works, which Microsoft products feed it, and how to trace one score point back to its source.
<!-- (/posts/secure-score-grc-part-2-ecosystem/) -->

More parts will follow in the coming weeks — each one focused on a single, concrete step that moves Microsoft Secure Score from a number you look at to an instrument you use. The [series page](/series/microsoft-secure-score-as-a-cyber-grc-instrument/) always has the latest.

You don't need to be a developer. You don't need a third-party GRC platform. You need a Microsoft 365 tenant, a few focused hours per week, and the willingness to look at Microsoft Secure Score with fresh eyes.

If you already know the Microsoft Defender landscape well, feel free to skip the foundation section and dive straight into the Secure Score posts.

## Ready to start?

Head to **[Part 1 — Opening Your First Recommendation]** when you're ready. See you there.
<!-- (/posts/secure-score-grc-part-1-anatomy/) -->
More parts coming in the following weeks — check the [series page](/series/microsoft-secure-score-as-a-cyber-grc-instrument/) for the latest.

Follow me on [LinkedIn](https://www.linkedin.com/in/dimosthenisatteia/) for new-post notifications, or subscribe via RSS at the top of the page.
---

<!-- ## Coming next -->
<!-- **Part 1 lands next week:** *Anatomy of a Microsoft Secure Score recommendation — every field on the screen, what it really means, and how to extract value in under an hour.* -->
<!-- If you want to be notified when it goes live, follow me on [LinkedIn](#) or subscribe via RSS at the top of the page. -->