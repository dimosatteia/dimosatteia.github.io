---
title: "Microsoft Defender for Identity, Up Close Part 1c — How Sensors Catch Post-Compromise Attacks"
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
description: "A practical walkthrough of Microsoft Defender for Identity — what the sensors actually do, how to install them on domain controllers and AD FS servers, what alerts to expect in the first week, and how the new Microsoft Entra ID integration changes the picture."
summary: "Microsoft Defender for Identity explained the way a practitioner needs it. What sensors are and where they live, how to deploy them to on-premises domain controllers and AD FS servers, the Microsoft Entra ID integration for hybrid environments, and the specific alerts worth tuning first."
categories: ["Microsoft Defender", "Identity Security"]
series: ["Microsoft Defender Up Close"]
ShowToc: true
TocOpen: false
weight: 3
cover:
  image: "/images/MDE/MDI.png"
  alt: "Microsoft Defender for Identity — deep dive"
  caption: "Microsoft Defender Up Close"
---

## Why this one is my personal favourite

I said in **[Part 2 of the Defender Demystified series](/posts/defender-demystified-part-2-four-workloads/)** that Microsoft Defender for Identity is the workload I find most interesting. That's because it catches what the other three can't: **what an attacker does after they already have valid credentials**.

An attacker who phishes a password, buys one from an infostealer marketplace, or dumps it from a compromised laptop now holds a valid identity. From that point, endpoint and email tools have very little to say — the attacker is behaving as a legitimate user. **[Microsoft Defender for Identity](https://learn.microsoft.com/en-us/defender-for-identity/what-is)** is the one workload that notices.

This post is the practical walkthrough: what the sensors do, how to install them, how the Microsoft Entra ID integration works, and the alerts worth your attention in the first week.

## What Microsoft Defender for Identity actually monitors

Three sources of identity telemetry:

- **On-premises Active Directory** — authentication traffic, LDAP queries, sensitive group changes, Kerberos activity
- **Active Directory Federation Services (AD FS)** — if you use it, which most mid-market organisations still do
- **Microsoft Entra ID** — hybrid identity signals, risky sign-ins, and (as of recent updates) native tenant integration without a separate sensor

Microsoft Defender for Identity correlates these into a single identity-centric view per user: *"here's everything happening with this account, across on-prem and cloud"*. That single-view capability is the whole reason the product exists.

## What the sensors do, in one paragraph

The Microsoft Defender for Identity sensor is a lightweight Windows service you install on domain controllers and AD FS servers. It captures network traffic and event logs from the host it's running on, parses them for identity-relevant signals, and forwards the relevant metadata to the Microsoft Defender for Identity cloud service. The sensor is designed to run quietly — Microsoft engineered it to use minimal resources on production DCs, which matters because domain controllers are not servers you want to load.

## The deployment flow, at a high level

> 📷 **Image 1 — Microsoft Defender for Identity workspace creation.**
> *Capture from: Defender portal → Settings → Identities → General. Show the instance / workspace details or the "Create your workspace" flow if you haven't set it up yet.*

The sequence is:

1. **Create your Microsoft Defender for Identity workspace** in the Defender portal. This happens automatically the first time you enable the workload.
2. **Create a Directory Service account** — a specifically-scoped gMSA or service account that the sensor uses to read AD information. Microsoft provides a [step-by-step guide for gMSA setup](https://learn.microsoft.com/en-us/defender-for-identity/directory-service-accounts).
3. **Download the sensor installer** from the Defender portal. Same installer for all sensor types.
4. **Install on each domain controller and AD FS server** you want to protect. Start with a pilot DC, confirm telemetry flows, then expand.
5. **Verify health** in the portal under Settings → Identities → Sensors.

> 📷 **Image 2 — Sensor health page after deployment.**
> *Capture from: Defender portal → Settings → Identities → Sensors. Show the list of installed sensors with health status green.*

**Practical tip:** install sensors on **all** your domain controllers, not just a subset. A sensor only sees traffic on the DC it's installed on — if you skip DCs, the attacks that land there are invisible. The licensing is per-user, not per-sensor, so there's no cost reason to skip any.

## The Microsoft Entra ID piece

Recent updates to Microsoft Defender for Identity added **direct Microsoft Entra ID integration** — the product now ingests Microsoft Entra ID signals (risky sign-ins, impossible travel, suspicious token activity) natively into the same unified identity timeline it builds for on-prem AD.

> 📷 **Image 3 — Unified identity view in the Defender portal.**
> *Capture from: Defender portal → Assets → Identities → open any user. Show the identity overview combining on-prem AD and Entra ID signals. Redact user name.*

The result: you get **one view per user** that spans both on-prem and cloud identity. This is genuinely useful. Before the integration, analysts had to pivot between Defender for Identity (for on-prem signals) and Microsoft Entra ID Protection (for cloud signals). Now a single incident correlates across both surfaces.

## What alerts to expect in the first week

Microsoft Defender for Identity ships with over 50 built-in detections across four attack phases:

**Reconnaissance** — an attacker scoping your environment:
- Account enumeration
- LDAP reconnaissance
- Network mapping reconnaissance via DNS
- Security principal reconnaissance

**Compromised credentials** — an attacker using stolen credentials:
- Suspected brute-force attack
- Suspected AS-REP roasting
- Honey-token account authentication

**Lateral movement** — an attacker moving through your network:
- Suspected pass-the-hash attack
- Suspected pass-the-ticket attack
- Suspected overpass-the-hash attack
- Remote code execution attempt

**Domain dominance** — an attacker consolidating control:
- Suspected Golden Ticket usage
- Suspected DCSync attack
- Suspected skeleton key attack
- Suspicious modification of sensitive groups

> 📷 **Image 4 — Active alerts view in the Identities section.**
> *Capture from: Defender portal → Incidents & alerts → Alerts, filtered for "Identity" source, OR from the Identity-specific alerts view in Settings → Identities. Show a list of recent alerts. Redact user names.*

The honest guidance: expect a few low-confidence alerts in the first week, most of them benign — things like penetration testers on a scheduled assessment, legitimate admin tooling that looks like reconnaissance, and service accounts doing LDAP queries that look weird out of context. **Tune the exclusions**, don't disable the alerts. Microsoft provides built-in exclusion mechanisms for each detection so you can whitelist the specific accounts or hosts that cause benign noise.

## The settings worth configuring

**Directory Service account** — as noted, scoped correctly from the start. Don't use Domain Admin; use the documented least-privilege gMSA.

**Sensitive accounts list** — under Settings → Identities → Sensitive groups, configure which accounts and groups Microsoft Defender for Identity should treat as extra-valuable. Domain Admins are there by default; add your Tier 0 service accounts, backup operators, and any custom admin groups you maintain.

> 📷 **Image 5 — Sensitive accounts configuration.**
> *Capture from: Defender portal → Settings → Identities → Sensitive groups. Show the configured sensitive groups.*

**Honey-token accounts** — Microsoft Defender for Identity supports configuring decoy accounts that should never be authenticated with. Any attempt to authenticate triggers a high-confidence alert. I like these — they're genuinely useful signals and the configuration overhead is minimal.

**Response actions** — for customers on the right Microsoft Entra ID tier, Microsoft Defender for Identity can trigger **automated account disablement** or **force password reset** on confirmed malicious activity. Enable this carefully and in staged mode first.

## A reasonable first-month plan

- **Week 1** — Install sensors on a pilot DC pair, verify telemetry, confirm Microsoft Entra ID integration is active.
- **Week 2** — Expand sensors to all remaining DCs and AD FS servers. Configure the gMSA correctly.
- **Week 3** — Configure sensitive accounts list, deploy honey-token accounts, review the first batch of alerts.
- **Week 4** — Tune exclusions for benign noise, enable staged response actions, schedule a monthly alert review.

## Where to go from here

> 🔗 **Read the rest of the Microsoft Defender Up Close series:** **[Microsoft Defender for Endpoint](/posts/microsoft-defender-for-endpoint-deep-dive/)**, **[Microsoft Defender for Office 365](/posts/microsoft-defender-for-office-365-deep-dive/)**, **[Microsoft Defender for Cloud Apps](/posts/microsoft-defender-for-cloud-apps-deep-dive/)**.

> 🔗 **Curious how identity signals feed into compliance evidencing?** Read **[How We Built a Gold-Winning GRC Programme on Microsoft Secure Score](/posts/secure-score-grc-part-0-intro/)**.

Follow me on [LinkedIn](https://www.linkedin.com/in/dimosthenisatteia/) for new-post notifications, or subscribe via RSS at the top of the page.

## Microsoft Learn resources

- [Microsoft Defender for Identity overview](https://learn.microsoft.com/en-us/defender-for-identity/what-is)
- [Quick installation guide](https://learn.microsoft.com/en-us/defender-for-identity/deploy/quick-installation-guide)
- [Directory Service account configuration](https://learn.microsoft.com/en-us/defender-for-identity/directory-service-accounts)
- [Microsoft Defender for Identity alerts reference](https://learn.microsoft.com/en-us/defender-for-identity/alerts-overview)
- [Sensitive groups configuration](https://learn.microsoft.com/en-us/defender-for-identity/sensitive-accounts)
- [Microsoft Entra ID integration](https://learn.microsoft.com/en-us/defender-for-identity/deploy/setup-entra)

---

<!--
IMAGE NOTES
Image 1: Defender portal → Settings → Identities → General (workspace setup)
Image 2: Defender portal → Settings → Identities → Sensors (health view)
Image 3: Defender portal → Assets → Identities → open any user (unified view)
Image 4: Defender portal → Incidents & alerts, filter Identity source
Image 5: Defender portal → Settings → Identities → Sensitive groups
Save to /static/images/posts/microsoft-defender-for-identity-deep-dive/
-->
