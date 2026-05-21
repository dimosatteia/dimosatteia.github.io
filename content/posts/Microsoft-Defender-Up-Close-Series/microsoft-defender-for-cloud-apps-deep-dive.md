---
title: "Microsoft Defender for Cloud Apps, Up Close Part 1d — A Practical Tour of the CASB"
date: 2026-04-23T10:00:00+03:00
lastmod: 2026-04-23T10:00:00+03:00
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
description: "A hands-on walk through Microsoft Defender for Cloud Apps — how Shadow IT discovery actually works, how to review and govern risky OAuth applications, setting up Conditional Access App Control, and the file policies that extend Microsoft Purview into third-party SaaS."
summary: "Microsoft Defender for Cloud Apps explained the way a working professional needs it. Shadow IT discovery through cloud app catalog integration, OAuth app governance, Conditional Access App Control session policies, and the file/activity policies that catch anomalous behaviour."
categories: ["Microsoft Defender", "SaaS Security"]
series: ["Microsoft Defender Up Close"]
ShowToc: true
TocOpen: false
weight: 4
cover:
  image: "/images/MDE/MDCA.png"
  alt: "Microsoft Defender for Cloud Apps — deep dive"
  caption: "Microsoft Defender Up Close"
---

## Why CASBs exist at all

A CASB — Cloud Access Security Broker — exists because the way people work changed faster than traditional security tools could adapt. Fifteen years ago, your security stack sat between your users and a small number of applications you'd sanctioned. Now your users authenticate to dozens of cloud services daily, many of which your IT team never explicitly approved.

**[Microsoft Defender for Cloud Apps](https://learn.microsoft.com/en-us/defender-cloud-apps/what-is-defender-for-cloud-apps)** is Microsoft's answer to this problem. It gives you **visibility** into what cloud apps your users are actually using, **governance** over the OAuth consents and file sharing happening in those apps, and **threat protection** against the anomalous user behaviour that signals a compromised account.

This post is the practical follow-up to **[Part 2 of the Defender Demystified series](/posts/defender-demystified-part-2-four-workloads/)**. Four main capabilities, one at a time.

## Capability 1 — Shadow IT discovery

The single most eye-opening capability when you first enable Microsoft Defender for Cloud Apps is **Shadow IT discovery**. The product ingests logs from your network edge (firewalls, web proxies) or from Microsoft Defender for Endpoint (which already sees all your devices' web traffic), correlates them against a catalogue of **over 31,000 cloud apps**, and produces a dashboard of what your users are actually using.

> 📷 **Image 1 — Cloud app catalog / discovered apps dashboard.**
> *Capture from: Defender portal → Cloud apps → Cloud Discovery → Discovered apps. Show the app list with risk scores, usage counts, and traffic volume. Redact sensitive app names if needed.*

What you'll find, essentially always:

- More apps than you thought — typically 3–5x the number your IT team believed existed
- A long tail of low-usage apps (marketing tools, file converters, random SaaS one person signed up for)
- A handful of genuinely risky apps you need to deal with (unsanctioned file-sharing, unmanaged storage, non-compliant AI tools)

Each app in the catalogue has a **risk score** (0–10) calculated from roughly 90 risk factors — data encryption at rest, GDPR compliance, SOC 2 certification, data retention policies, supports SSO, supports SAML, and so on. You can customise the scoring weights if your organisation has specific priorities.

**The easiest way to enable discovery** is through the Microsoft Defender for Endpoint integration — if you already have Defender for Endpoint deployed, discovery works automatically without any extra configuration on your network side.

> 📷 **Image 2 — Microsoft Defender for Endpoint integration toggle.**
> *Capture from: Defender portal → Settings → Cloud apps → Microsoft Defender for Endpoint. Show the integration toggle and status.*

**What to do with the discovery output:** work through the top 20 unsanctioned apps by usage, decide which to **sanction** (mark as approved), **unsanction** (mark as not approved — which can trigger blocking through Defender for Endpoint), or **investigate further**. This is an ongoing exercise, not a one-time cleanup.

## Capability 2 — OAuth app governance

This one is underrated. When a user grants an OAuth application permission to access their Microsoft 365 data — say, a calendar scheduling app that wants to read and write their calendar — that grant persists, invisibly, until explicitly revoked. If the user was phished into granting consent to a malicious app, the attacker now has ongoing access to mail or files **without ever having stolen a password**.

**[App governance in Microsoft Defender for Cloud Apps](https://learn.microsoft.com/en-us/defender-cloud-apps/app-governance-manage-app-governance)** gives you visibility and control over every OAuth grant in your tenant.

> 📷 **Image 3 — OAuth apps overview.**
> *Capture from: Defender portal → Cloud apps → OAuth apps. Show the list of consented apps with publisher, permissions, user count, and any risk flags. Redact sensitive app names.*

What to look for:

- **Apps requesting high-privilege permissions** — anything asking for Mail.ReadWrite, Files.ReadWrite.All, or Directory.Read.All without an obvious business reason
- **Apps from unknown publishers** — legitimate vendors generally have verified publisher status
- **Apps with low user counts in your tenant but broad permissions** — a single user with a high-risk app is a common phishing outcome
- **Apps flagged by Microsoft threat intelligence** — the portal marks these directly

Microsoft publishes detection policies for OAuth abuse (e.g., "suspicious consent pattern", "misleading OAuth app name"). Review the flagged apps weekly and revoke consent on anything suspicious — the portal offers one-click revocation across all users who granted consent to an app.

## Capability 3 — Conditional Access App Control

**[Conditional Access App Control](https://learn.microsoft.com/en-us/defender-cloud-apps/proxy-intro-aad)** is the session-level policy engine. It integrates with Microsoft Entra ID Conditional Access to apply **real-time session controls** to risky sessions — not just "block or allow" at sign-in, but "allow, but restrict what the user can do once they're in".

Example policies you can build:

- *"Users on unmanaged devices can read SharePoint documents in the browser but cannot download them"*
- *"Users outside corporate network can access Salesforce but cannot print or copy records"*
- *"Users flagged as high-risk can authenticate to Microsoft 365 but every session activity is logged for review"*

> 📷 **Image 4 — Conditional Access App Control session policy configuration.**
> *Capture from: Defender portal → Cloud apps → Policies → Session policy. Show a policy creation view with the session control options visible.*

The setup takes some planning — you need the right Conditional Access policy in Microsoft Entra ID pointing traffic through Microsoft Defender for Cloud Apps, plus the session policy in Defender for Cloud Apps itself. Microsoft's [deployment guide](https://learn.microsoft.com/en-us/defender-cloud-apps/proxy-deployment-aad) walks through the full flow.

**One high-value use case** to start with: **block downloads from unmanaged devices** for your most sensitive SharePoint sites. It's genuinely effective at stopping data exfiltration, and it doesn't affect anyone using a managed device.

## Capability 4 — Activity and file policies

The final layer is **[activity policies](https://learn.microsoft.com/en-us/defender-cloud-apps/user-activity-policies)** and **[file policies](https://learn.microsoft.com/en-us/defender-cloud-apps/data-protection-policies)** — detection rules that fire on user behaviour or file content across all your connected cloud apps.

Activity policy examples:

- Impossible travel (sign-in from Athens and New York within an hour)
- Mass download (a single user downloads 1,000+ files in an hour)
- Suspicious inbox forwarding rules (a classic BEC signal)
- Admin activity from a non-admin account

File policy examples:

- A file containing a regex-matched pattern (credit card number, IBAN, passport number) shared externally
- A SharePoint document labelled "Confidential" moved to a OneDrive folder that's shared with anonymous link

> 📷 **Image 5 — Policies overview page.**
> *Capture from: Defender portal → Cloud apps → Policies → Policy management. Show the list of configured activity and file policies.*

Microsoft ships a set of default anomaly detection policies that are **already enabled** out of the box — impossible travel, ransomware activity, mass delete, suspicious inbox forwarding. Don't re-invent these; just review them and make sure the alert destinations are correct.

For file policies, start by connecting Microsoft Purview sensitivity labels (if you use them) and building one simple policy — *"any file labelled Confidential shared externally triggers an alert"*. That one policy delivers disproportionate value.

## A reasonable first-month plan

- **Week 1** — Enable the Microsoft Defender for Endpoint integration for Cloud Discovery. Let it collect data. Don't act yet.
- **Week 2** — Review the discovered apps dashboard. Sanction your top 20 known good apps; unsanction the clearly risky ones. Review top-risk OAuth apps and revoke any with no business justification.
- **Week 3** — Enable the default anomaly detection policies (most are on by default; verify). Configure one custom file policy for sensitive content.
- **Week 4** — Plan and pilot Conditional Access App Control for one use case (e.g., block SharePoint downloads from unmanaged devices for a pilot group).

By the end of month one you have a working CASB, real visibility into your SaaS estate, and the OAuth and session controls that most organisations never get around to implementing.

## Where to go from here

> 🔗 **Read the rest of the Microsoft Defender Up Close series:** **[Microsoft Defender for Endpoint](/posts/microsoft-defender-for-endpoint-deep-dive/)**, **[Microsoft Defender for Office 365](/posts/microsoft-defender-for-office-365-deep-dive/)**, **[Microsoft Defender for Identity](/posts/microsoft-defender-for-identity-deep-dive/)**.

> 🔗 **Curious how cloud app signals feed into compliance evidencing?** Read **[How We Built a Gold-Winning GRC Programme on Microsoft Secure Score](/posts/secure-score-grc-part-0-intro/)**.

Follow me on [LinkedIn](https://www.linkedin.com/in/dimosthenisatteia/) for new-post notifications, or subscribe via RSS at the top of the page.

## Microsoft Learn resources

- [Microsoft Defender for Cloud Apps overview](https://learn.microsoft.com/en-us/defender-cloud-apps/what-is-defender-for-cloud-apps)
- [Cloud Discovery setup](https://learn.microsoft.com/en-us/defender-cloud-apps/set-up-cloud-discovery)
- [App governance](https://learn.microsoft.com/en-us/defender-cloud-apps/app-governance-manage-app-governance)
- [Conditional Access App Control](https://learn.microsoft.com/en-us/defender-cloud-apps/proxy-intro-aad)
- [Activity policies](https://learn.microsoft.com/en-us/defender-cloud-apps/user-activity-policies)
- [File policies](https://learn.microsoft.com/en-us/defender-cloud-apps/data-protection-policies)
- [Microsoft Defender for Cloud Apps and Microsoft Defender for Endpoint integration](https://learn.microsoft.com/en-us/defender-cloud-apps/mde-integration)

---

<!--
IMAGE NOTES
Image 1: Defender portal → Cloud apps → Cloud Discovery → Discovered apps
Image 2: Defender portal → Settings → Cloud apps → Microsoft Defender for Endpoint integration
Image 3: Defender portal → Cloud apps → OAuth apps
Image 4: Defender portal → Cloud apps → Policies → Session policy
Image 5: Defender portal → Cloud apps → Policies → Policy management
Save to /static/images/posts/microsoft-defender-for-cloud-apps-deep-dive/
-->
