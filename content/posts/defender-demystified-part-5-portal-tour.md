---
title: "Microsoft Defender Demystified — Part 5: A Walk Through the Microsoft Defender Portal"
date: 2026-04-23T10:00:00+03:00
draft: true
author: "Dimosthenis"
description: "The final post in the Microsoft Defender Demystified series. A friendly, hands-on walk through the Microsoft Defender portal at security.microsoft.com — every major section explained, where Microsoft Secure Score now lives, the unified Microsoft Sentinel experience, and a practical 'first hour' agenda any professional can follow today."
summary: "Part 5 closes the series. A guided walk through the unified Microsoft Defender portal — every major navigation section explained, where Microsoft Secure Score now lives inside Exposure Management, how to set up the right roles, a simple KQL hunting query to try, and a 60-minute first-time agenda."
tags: ["microsoft-defender", "microsoft-defender-xdr", "microsoft-defender-portal", "microsoft-sentinel", "microsoft-secure-score", "kql", "advanced-hunting", "rbac", "fundamentals"]
categories: ["Microsoft Defender", "Microsoft 365"]
series: ["Microsoft Defender Demystified"]
ShowToc: true
TocOpen: false
weight: 5
cover:
  image: "" # TODO: cover image — see Image 1 (Defender portal home with expanded navigation)
  alt: "The Microsoft Defender portal at security.microsoft.com — a guided tour"
  caption: "Microsoft Defender Demystified — Part 5"
---

## We've reached the end

Over four posts we've built up the full picture of the Microsoft Defender family:

- **[Part 1](/posts/defender-demystified-part-1-what-is-microsoft-defender/)** — the whole family the way Microsoft itself organises it
- **[Part 2](/posts/defender-demystified-part-2-four-workloads/)** — the four core XDR workloads
- **[Part 3](/posts/defender-demystified-part-3-defender-for-cloud/)** — Microsoft Defender for Cloud for Azure and multicloud
- **[Part 4](/posts/defender-demystified-part-4-licensing-decoder/)** — which plan to actually buy

Time to open the platform itself. This final post is a **hands-on walk through the unified Microsoft Defender portal at `security.microsoft.com`** — the single console where everything we've covered lives. Open the portal in another tab and read along. By the end, you'll know where everything is and what to click first.

> 📷 **Image 1 — The Microsoft Defender portal home page (cover).**
> *Open https://security.microsoft.com and capture the home page with the left navigation expanded. Show the dashboard cards (active incidents, Secure Score trend, threat analytics). Format: 16:9, full-width. Redact tenant name and any sensitive numbers.*

## The portal in one sentence

The Microsoft Defender portal brings together **Microsoft Defender XDR** (endpoint, email, identity, SaaS), **Microsoft Defender for Cloud** (Azure and multicloud workloads), **Microsoft Sentinel** (SIEM), **Microsoft Security Exposure Management** (posture and Secure Score), and **Microsoft Security Copilot** (AI assistance) into a single navigation experience. What any given tenant actually sees depends on what's licensed — Microsoft only renders the sections your subscription includes.

The consolidation has been years in the making. As of 2026, **Microsoft Sentinel is generally available inside the Defender portal**, and the standalone Sentinel experience in the Azure portal is being retired in 2027. If you're still bouncing between the Azure portal and `security.microsoft.com`, you're working harder than you need to.

## Walking the left navigation, top to bottom

The left navigation is the map. Each major section, in the order you'll see it.

### Home

> 📷 **Image 2 — Defender portal navigation, left rail.**
> *Capture only the left navigation menu as a tall, narrow screenshot. Annotate with numbered callouts (1–10) matching the sections below. This becomes the reference image readers will return to as they read.*

The Home page is your dashboard — active incidents, recent alerts, Microsoft Secure Score trend, highlighted threat analytics reports, and (for customers with Microsoft Defender Experts for XDR) a service status card. Customise cards with **Add cards** in the top-right to match your role.

For a security manager or IT leader, this is your morning-coffee page. For a SOC analyst, you'll spend more time further down in **Investigation & response**.

### Exposure management — where Microsoft Secure Score now lives

This is the section most people overlook because the branding is relatively new for what used to be a scattered set of features. **[Microsoft Security Exposure Management](https://learn.microsoft.com/en-us/security-exposure-management/microsoft-security-exposure-management)** is Microsoft's unified posture surface — your overall exposure score, attack surface, critical asset coverage, and a few things worth calling out by name:

- **Microsoft Secure Score** — moved here from its previous home, now sitting alongside the broader exposure picture
- **Recommendations** prioritised by risk, not just by configuration drift
- **Attack paths** — predictive analysis of how an attacker could actually move through your environment

If you've read **[How We Built a Gold-Winning GRC Programme on Microsoft Secure Score](/posts/secure-score-grc-part-0-intro/)**, this section is where that entire programme lives. The Microsoft Secure Score data feed that powers the compliance pipeline comes straight from this page.

> 📷 **Image 3 — The Microsoft Secure Score page inside Exposure management.**
> *Capture from: Exposure management → Microsoft Secure Score. Show the overall score, history graph, top recommendations panel. Redact tenant name and absolute score if sensitive.*

### Investigation & response — the SOC heart of the portal

This is where SOC analysts live. Three subsections:

- **Incidents & alerts** — the unified queue. Every alert from every workload (Microsoft Defender for Endpoint, Office 365, Identity, Cloud Apps, Defender for Cloud, Sentinel analytics rules) flows here, automatically grouped into incidents that share entities, timeline, or attack-stage signals.
- **Hunting** — proactive search across your telemetry. The flagship feature is **Advanced hunting** using **Kusto Query Language (KQL)**.
- **Threat analytics** — Microsoft-curated threat reports joined to your tenant data, so the second a new threat actor's TTPs are published you can see whether anything in your environment matches.

> 📷 **Image 4 — The unified Incidents queue.**
> *Capture from: Investigation & response → Incidents. Show 5–10 incident rows with severity, source workload, and status visible. Redact user and device names.*

A simple KQL query to try as your first run in **Advanced hunting** — this lists sign-ins from the last 24 hours, grouped by country:

```kql
SigninLogs
| where TimeGenerated > ago(24h)
| summarize SigninCount = count() by Location
| order by SigninCount desc
```

If your tenant doesn't have `SigninLogs` surfaced (it requires Microsoft Entra ID logs to be forwarded), this one runs on Microsoft Defender for Endpoint data alone:

```kql
DeviceInfo
| where Timestamp > ago(7d)
| summarize DeviceCount = dcount(DeviceId) by OSPlatform
| order by DeviceCount desc
```

> 📷 **Image 5 — Advanced hunting with a sample KQL query loaded.**
> *Capture from: Investigation & response → Hunting → Advanced hunting. Paste one of the queries above, run it, and capture the query editor plus the results table together. This image shows readers what they get "for free" with their existing licensing — a proper hunting experience.*

### Threat intelligence

Two main pages here:

- **Threat analytics** (also accessible from Investigation & response) — Microsoft Threat Intelligence Center reports, ranked by relevance to your tenant
- **Intel profiles and explorer** (for customers with **Microsoft Defender Threat Intelligence**) — threat actor profiles, IOCs, infrastructure tracking

For most organisations, the curated threat analytics reports alone are the highest-value content here. Worth a weekly skim.

### Assets

A unified inventory page — devices, users, mailboxes, applications. Click into any asset for its full risk profile, recent alerts, and entity relationships. This is the page that turns *"alert fired on host XYZ"* into *"this is the CFO's laptop, here's everything happening on it, and here are the two other devices they commonly authenticate from"*.

### Microsoft Sentinel — now native in the portal

If you've onboarded a **Log Analytics workspace with Microsoft Sentinel enabled**, Microsoft Sentinel sections appear in the navigation: analytics rules, hunting, workbooks, automation, content hub, data connectors. **[Microsoft Sentinel in the Defender portal](https://learn.microsoft.com/en-us/azure/sentinel/move-to-defender)** runs the same SIEM you may know from the Azure portal — but federated with Microsoft Defender XDR's incident model. A single Sentinel rule alert can now correlate with Defender XDR signals into one unified incident.

This integration is one of the more significant Microsoft Security improvements of the last two years, and the reason Microsoft is sunsetting the Azure-portal Sentinel experience. If you've been putting off the transition, Part 4 of your 2026 to-do list has arrived.

### The four workload sections — Endpoints, Email & collaboration, Identities, Cloud apps

These are the per-workload deep-dive panes for the four products we covered in Part 2. Most day-to-day administrative work for each workload happens here:

- **Endpoints** — device inventory, vulnerabilities, software inventory, security baselines, attack surface reduction rules, **Microsoft Defender for Endpoint** policies
- **Email & collaboration** — Threat Explorer, Submissions, Quarantine, Attack simulation training, the anti-phishing/anti-spam/anti-malware policies for **Microsoft Defender for Office 365**
- **Identities** — identity timelines, sensitive group monitoring, identity security posture, **Microsoft Defender for Identity** sensor health
- **Cloud apps** — discovered cloud apps, app governance, Conditional Access App Control, **Microsoft Defender for Cloud Apps** policies

Expect to spend most of your hands-on configuration time inside these four sections.

### Cloud security — where Microsoft Defender for Cloud signals now appear

**[Microsoft Defender for Cloud is integrated into the Defender portal](https://learn.microsoft.com/en-us/azure/defender-for-cloud/defender-portal/defender-for-cloud-defender-portal)**. The Cloud security section gives you the cloud overview dashboard, multicloud asset inventory, posture management, and recommendations — without leaving the unified portal. Configuration of Defender for Cloud plans still happens in the Azure portal, but daily operational work (incidents, posture, recommendations) is here now.

### SOC optimization

Microsoft-generated recommendations that suggest where to tighten your detections, reduce noise, and close coverage gaps, based on your tenant's actual data ingestion and current posture. Worth fifteen minutes every couple of weeks.

### Reports

Pre-built reports across every workload. Useful for monthly leadership packs without building dashboards from scratch.

### Settings & permissions — the section to set up first

> 📷 **Image 6 — The Permissions page in the Defender portal.**
> *Capture from: Settings → Microsoft Defender XDR → Permissions and roles. Show the Roles page with built-in roles and any custom roles you've created.*

In 2026, Microsoft consolidated permissions into **Microsoft Defender XDR Unified RBAC**. Three RBAC models now coexist in the portal, and this is genuinely worth understanding before you hand anyone the URL:

- **Microsoft Entra ID directory roles** — broad roles like Security Administrator, Security Reader
- **Workload-specific RBAC** — for legacy compatibility (Defender for Endpoint device groups, Defender for Office 365 Exchange-based roles)
- **Microsoft Defender XDR Unified RBAC** — the modern model with fine-grained permissions across workloads

For a team getting started, the practical setup:

- **Security Administrator** for SOC leads who configure policies
- **Security Operator** for analysts who investigate and respond
- **Security Reader** for auditors, managers, or external read-only access

Sort this out before inviting anyone in. I've seen the cleanup conversation after the fact and it's never fun.

## Your first hour in the Microsoft Defender portal

If you're opening this portal for the first time today, here's a productive 60-minute agenda:

1. **Minutes 0–10.** Go to **Settings → Permissions**. Verify the right people have the right roles. Add yourself with Security Administrator if needed.
2. **Minutes 10–20.** Open **Exposure management → Microsoft Secure Score**. Look at your overall score and read the top five recommendations. Don't change anything yet. Just absorb.
3. **Minutes 20–35.** Visit each of the four workload sections — **Endpoints, Email & collaboration, Identities, Cloud apps**. Confirm what's deployed. Note anything that shows "not configured" or empty.
4. **Minutes 35–45.** Open **Investigation & response → Incidents** and read three recent incidents end-to-end. This teaches more about what your platform actually sees than any documentation will.
5. **Minutes 45–55.** Run one of the sample KQL queries from earlier in **Advanced hunting**. Change the time window. Group by a different field. Get a feel for the editor.
6. **Minutes 55–60.** Bookmark `https://security.microsoft.com`. Pin it to your browser sidebar. From now on, this is your security home page.

## Wrapping up the series

That closes **Microsoft Defender Demystified**. If you've followed along from Part 1, you should now be able to:

- Name and distinguish every branch of the Microsoft Defender family
- Explain what each of the four Microsoft Defender XDR workloads does
- Describe how Microsoft Defender for Cloud differs from Microsoft Defender XDR, and when each applies
- Make a defensible licensing recommendation across small business, mid-market, and enterprise scenarios
- Open the Microsoft Defender portal and find any feature in under thirty seconds

That's enough foundation to take meaningful action in your own tenant. The next step is depth.

## Where to go from here

> 🔗 **Continue with the Microsoft Secure Score deep-dive series.** You now know that Microsoft Secure Score lives inside Exposure management in the Defender portal. **[How We Built a Gold-Winning GRC Programme on Microsoft Secure Score](/posts/secure-score-grc-part-0-intro/)** turns that single feature into the engine of an award-winning ISO 27001 and NIS2 compliance programme — the same blueprint that won Gold at the Cyber Security Awards 2026.

Follow me on [LinkedIn](https://www.linkedin.com/in/dimosthenisatteia/) for new-post notifications, or subscribe via RSS at the top of the page.

## Microsoft Learn resources

- [Microsoft Defender portal overview](https://learn.microsoft.com/en-us/unified-secops/overview-defender-portal)
- [Microsoft Defender XDR in the Microsoft Defender portal](https://learn.microsoft.com/en-us/defender-xdr/microsoft-365-defender-portal)
- [Microsoft Sentinel in the Microsoft Defender portal](https://learn.microsoft.com/en-us/azure/sentinel/move-to-defender)
- [Microsoft Defender for Cloud in the Defender portal](https://learn.microsoft.com/en-us/azure/defender-for-cloud/defender-portal/defender-for-cloud-defender-portal)
- [Microsoft Security Exposure Management overview](https://learn.microsoft.com/en-us/security-exposure-management/microsoft-security-exposure-management)
- [Advanced hunting in Microsoft Defender XDR](https://learn.microsoft.com/en-us/defender-xdr/advanced-hunting-overview)
- [Microsoft Defender XDR Unified RBAC](https://learn.microsoft.com/en-us/defender-xdr/manage-rbac)

---

<!--
=========================================================
IMAGE PRODUCTION NOTES (delete before publish)
=========================================================

Image 1 — Defender portal home (cover)
  Source: https://security.microsoft.com (your tenant)
  Capture: home page with left navigation expanded
  Show: dashboard cards
  Format: 16:9, full-width
  Redaction: tenant name, sensitive numbers

Image 2 — Left navigation with numbered callouts
  Source: same portal
  Capture: only the left nav (tall portrait crop)
  Annotate: add numbered red circles
    1. Home
    2. Exposure management (with Microsoft Secure Score)
    3. Investigation & response
    4. Threat intelligence
    5. Assets
    6. Microsoft Sentinel (if visible)
    7. Endpoints
    8. Email & collaboration
    9. Identities
    10. Cloud apps / Cloud security
  Key reference image — readers will scroll back to it

Image 3 — Microsoft Secure Score inside Exposure management
  Source: Defender portal → Exposure management → Microsoft Secure Score
  Capture: full page with score, trend, top recommendations
  Format: 16:9
  Redaction: tenant name, sensitive score numbers

Image 4 — Unified Incidents queue
  Source: Investigation & response → Incidents
  Capture: 5–10 rows with severity, source, status
  Redaction: user names, device names

Image 5 — Advanced hunting with KQL query
  Source: Investigation & response → Hunting → Advanced hunting
  Paste one of the sample queries from the post and run it
  Capture: query editor + results table
  Redaction: location names or sensitive data if needed

Image 6 — Permissions page
  Source: Settings → Microsoft Defender XDR → Permissions and roles
  Capture: roles list with built-in roles visible
  Redaction: user names assigned to roles

TODO before publish:
  [ ] Capture all 6 images
  [ ] Save to /static/images/posts/defender-demystified-part-5/
  [ ] Replace 📷 placeholders with inline ![alt](path) markdown
  [ ] Test the KQL queries in your tenant before publishing —
      confirm they run cleanly
  [ ] Verify all internal links to Parts 1–4 and Secure Score Part 0 resolve
  [ ] Consider adding a "Series complete!" callout at the top

OPTIONAL ENHANCEMENTS:
  - Record a 60-second screen recording of the "first hour" walkthrough
    and embed as MP4/GIF — extremely shareable on LinkedIn
  - Build a "portal map" infographic combining navigation + key actions
    per section — a strong portfolio asset
=========================================================
-->
