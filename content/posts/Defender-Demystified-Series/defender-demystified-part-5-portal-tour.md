---
title: "Microsoft Defender Part 5: A Walk Through the Microsoft Defender Portal"
date: 2026-07-27T09:00:00+03:00
lastmod: 2026-08-14T09:31:00+03:00
draft: false
keywords:
  - how to use the microsoft defender portal
  - security.microsoft.com portal walkthrough
  - microsoft defender portal navigation explained
  - where is microsoft secure score in defender portal
  - microsoft sentinel in defender portal
  - defender portal advanced hunting kql beginner
  - microsoft defender xdr unified rbac roles
  - microsoft defender portal first time setup
  - exposure management defender portal
tags:
  - Microsoft Defender Portal
  - Microsoft Defender XDR
  - Microsoft Sentinel
  - Microsoft 365
  - Microsoft Defender for Endpoint
  - Microsoft Defender for Office 365
  - Microsoft Defender for Identity
  - Microsoft 365 Security
  - Exposure Management
  - Advanced Hunting
  - KQL
  - Cyber GRC
author: "Dimosthenis Atteia"
description: "The final post in the Microsoft Defender Demystified series. A friendly, hands-on walk through the Microsoft Defender portal at security.microsoft.com, every major section explained, where Microsoft Secure Score now lives, the unified Microsoft Sentinel experience, and a practical 'first hour' agenda any professional can follow today."
summary: "Part 5 closes the series. A guided walk through the unified Microsoft Defender portal, every major navigation section explained, where Microsoft Secure Score now lives inside Exposure Management, how to set up the right roles, a simple KQL hunting query to try, and a 60-minute first-time agenda."
categories: ["Azure Security", "Microsoft Defender", "Microsoft 365"]
series: ["Microsoft Defender Demystified"]
ShowToc: true
TocOpen: false
weight: 5
cover:
  image: "/images/DefenderDemystified/MSDef.png"
  alt: "A guided walkthrough of the Microsoft Defender portal navigation at security.microsoft.com"
  caption: "Microsoft Defender Demystified — Part 5"
---

## We've reached the end

Over four posts we've built up the full picture of the Microsoft Defender family:

- **[Part 1](/posts/defender-demystified-series/defender-demystified-part-1-what-is-microsoft-defender/)** — the whole family the way Microsoft itself organises it
- **[Part 2](/posts/defender-demystified-series/defender-demystified-part-2-four-workloads/)** — the four core XDR workloads
- **[Part 3](/posts/defender-demystified-series/defender-demystified-part-3-defender-for-cloud/)** — Microsoft Defender for Cloud for Azure and multicloud
- **[Part 4](/posts/defender-demystified-series/defender-demystified-part-4-licensing-decoder/)** — which plan to actually buy

Time to open the platform itself. This final post is a **hands-on walk through the unified Microsoft Defender portal at `security.microsoft.com`**, the single console where everything we've covered lives. Open the portal in another tab and read along. By the end, you'll know where everything is and what to click first.

[![The Microsoft Defender portal home page at security.microsoft.com, showing the left navigation expanded alongside dashboard cards for active incidents, Microsoft Secure Score trend, and threat analytics](/images/DefenderDemystified/defender-portal-home-dashboard.png)](/images/DefenderDemystified/defender-portal-home-dashboard.png)
> 📷 **Image 1: The Microsoft Defender portal home page, your dashboard for incidents, Microsoft Secure Score, and threat analytics.**

## The portal in one sentence

The Microsoft Defender portal brings together **Microsoft Defender XDR** (endpoint, email, identity, SaaS), **Microsoft Defender for Cloud** (Azure and multicloud workloads), **Microsoft Sentinel** (SIEM), **Microsoft Security Exposure Management** (posture and Secure Score), and **Microsoft Security Copilot** (AI assistance) into a single navigation experience. What any given tenant actually sees depends on what's licensed, Microsoft only renders the sections your subscription includes.

As of 2026, **Microsoft Sentinel is generally available inside the Defender portal**, and the standalone Sentinel experience in the Azure portal retires on 31 March 2027, a date Microsoft extended from the originally announced 1 July 2026 following customer feedback. If you're still bouncing between the Azure portal and `security.microsoft.com`, you're working harder than you need to.

## Walking the left navigation, top to bottom

The left navigation is the map. Each major section, in the order you'll see it.

### Home

[![Upper section of the Microsoft Defender portal left navigation rail, showing Home, Exposure management, Investigation and response with Incidents and alerts and Hunting expanded, and Threat intelligence](/images/DefenderDemystified/defender-portal-navigation-rail-top.png)](/images/DefenderDemystified/defender-portal-navigation-rail-top.png)
> 📷 **Image 2a: The Microsoft Defender portal left navigation, upper section, from Home through Threat intelligence.**

[![Lower section of the Microsoft Defender portal left navigation rail, showing Assets, Microsoft Sentinel, Identities, Endpoints, Email and collaboration, Cloud apps, Cloud security, SOC optimization, Reports, and System settings](/images/DefenderDemystified/defender-portal-navigation-rail-bottom.png)](/images/DefenderDemystified/defender-portal-navigation-rail-bottom.png)
> 📷 **Image 2b: The Microsoft Defender portal left navigation, lower section, from Assets through System settings.**

The Home page is your dashboard, active incidents, recent alerts, Microsoft Secure Score trend, highlighted threat analytics reports, and (for customers with Microsoft Defender Experts for XDR) a service status card. Customise cards with **Add cards** in the top-right to match your role.

For a security manager or IT leader, this is your morning-coffee page. For a SOC analyst, you'll spend more time further down in **Investigation & response**.

### Exposure management, where Microsoft Secure Score now lives

This is the section most people overlook because the branding is relatively new for what used to be a scattered set of features. **[Microsoft Security Exposure Management](https://learn.microsoft.com/en-us/security-exposure-management/microsoft-security-exposure-management)** is Microsoft's unified posture surface, your overall exposure score, attack surface, critical asset coverage, and a few things worth calling out by name:

- **Microsoft Secure Score:** moved here from its previous home, now sitting alongside the broader exposure picture
- **Recommendations** prioritised by risk, not just by configuration drift
- **Attack paths:** predictive analysis of how an attacker could actually move through your environment

If you've read **[How We Built a Gold-Winning GRC Programme on Microsoft Secure Score](/posts/secure-score-grc-part-0-intro/)**, this section is where that entire programme lives. The Microsoft Secure Score data feed that powers the compliance pipeline comes straight from this page.

[![The Microsoft Secure Score page inside Exposure management in the Microsoft Defender portal, showing the overall score, the score history graph, and the top improvement recommendations panel](/images/DefenderDemystified/defender-portal-secure-score-exposure-management.png)](/images/DefenderDemystified/defender-portal-secure-score-exposure-management.png)
> 📷 **Image 3: Microsoft Secure Score now lives under Exposure management, score, trend, and prioritised recommendations in one page.**

### Investigation & response — the SOC heart of the portal

This is where SOC analysts live. Three subsections:

- **Incidents & alerts:** the unified queue. Every alert from every workload (Microsoft Defender for Endpoint, Office 365, Identity, Cloud Apps, Defender for Cloud, Sentinel analytics rules) flows here, automatically grouped into incidents that share entities, timeline, or attack-stage signals.
- **Hunting:** proactive search across your telemetry. The flagship feature is **Advanced hunting** using **Kusto Query Language (KQL)**.
- **Threat analytics:** Microsoft-curated threat reports joined to your tenant data, so the second a new threat actor's TTPs are published you can see whether anything in your environment matches.

[![The unified Incidents queue in the Microsoft Defender portal, showing incident rows with severity, the Service sources column identifying which Defender workload raised each alert, and investigation status](/images/DefenderDemystified/defender-portal-unified-incidents-queue.png)](/images/DefenderDemystified/defender-portal-unified-incidents-queue.png)
> 📷 **Image 4: One queue for every workload, the Service sources column shows which Defender product raised each incident.**

A simple KQL query to try as your first run in **Advanced hunting**, this lists sign-ins from the last 24 hours, grouped by country:

```kql
SigninLogs
| where TimeGenerated > ago(24h)
| summarize SigninCount = count() by Location
| order by SigninCount desc
```
Note that `SigninLogs` is a Microsoft Sentinel table, it only appears in advanced hunting if you've onboarded a Sentinel workspace to the Defender portal. If you have Microsoft Entra ID P2 but no Sentinel workspace, use the native Defender XDR table EntraIdSignInEvents instead (this replaced AADSignInEventsBeta in December 2025). If you have neither, this one runs on Microsoft Defender for Endpoint data alone:

```kql
DeviceInfo
| where Timestamp > ago(7d)
| summarize arg_max(Timestamp, OSPlatform, OSVersion, DeviceType) by DeviceId, DeviceName
| where isnotempty(OSPlatform)
| summarize DeviceCount = count() by OSPlatform, OSVersion, DeviceType
| order by DeviceCount desc
```

[![Advanced hunting in the Microsoft Defender portal, showing a KQL query against the DeviceInfo table in the query editor with the results table below breaking down device count by OS platform, OS version, and device type](/images/DefenderDemystified/defender-portal-advanced-hunting-kql-query.png)](/images/DefenderDemystified/defender-portal-advanced-hunting-kql-query.png)
> 📷 **Image 5: Advanced hunting with a KQL query loaded, a full device inventory in five lines, using Defender for Endpoint data alone.**

### Threat intelligence

Two main pages here:

- **Threat analytics** (also accessible from Investigation & response) — Microsoft Threat Intelligence Center reports, ranked by relevance to your tenant
- **Intel profiles and explorer** (for customers with **Microsoft Defender Threat Intelligence**), threat actor profiles, IOCs, infrastructure tracking

For most organisations, the curated threat analytics reports alone are the highest-value content here. Worth a weekly skim.

### Assets

A unified inventory page, devices, users, mailboxes, applications. Click into any asset for its full risk profile, recent alerts, and entity relationships. This is the page that turns *"alert fired on host XYZ"* into *"this is the CFO's laptop, here's everything happening on it, and here are the two other devices they commonly authenticate from"*.

### Microsoft Sentinel, now native in the portal

If you've onboarded a **Log Analytics workspace with Microsoft Sentinel enabled**, Microsoft Sentinel sections appear in the navigation: analytics rules, hunting, workbooks, automation, content hub, data connectors. **[Microsoft Sentinel in the Defender portal](https://learn.microsoft.com/en-us/azure/sentinel/move-to-defender)** runs the same SIEM you may know from the Azure portal, but federated with Microsoft Defender XDR's incident model. A single Sentinel rule alert can now correlate with Defender XDR signals into one unified incident.

This integration is one of the more significant Microsoft Security improvements of the last two years, and the reason Microsoft is sunsetting the Azure-portal Sentinel experience. If you've been putting off the transition, Part 4 of your 2026 to-do list has arrived.

### The four workload sections, Endpoints, Email & collaboration, Identities, Cloud apps

These are the per-workload deep-dive panes for the four products we covered in Part 2. Most day-to-day administrative work for each workload happens here:

- **Endpoints:** device inventory, vulnerabilities, software inventory, security baselines, attack surface reduction rules, **Microsoft Defender for Endpoint** policies
- **Email & collaboration:** Threat Explorer, Submissions, Quarantine, Attack simulation training, the anti-phishing/anti-spam/anti-malware policies for **Microsoft Defender for Office 365**
- **Identities:** identity timelines, sensitive group monitoring, identity security posture, **Microsoft Defender for Identity** sensor health
- **Cloud apps:** discovered cloud apps, app governance, Conditional Access App Control, **Microsoft Defender for Cloud Apps** policies

Expect to spend most of your hands-on configuration time inside these four sections.

### Cloud security, where Microsoft Defender for Cloud signals now appear

**[Microsoft Defender for Cloud is integrated into the Defender portal](https://learn.microsoft.com/en-us/azure/defender-for-cloud/defender-portal/defender-for-cloud-defender-portal)**. The Cloud security section gives you the cloud overview dashboard, multicloud asset inventory, posture management, and recommendations, without leaving the unified portal. Configuration of Defender for Cloud plans still happens in the Azure portal, but daily operational work (incidents, posture, recommendations) is here now.

### SOC optimization

Microsoft-generated recommendations that suggest where to tighten your detections, reduce noise, and close coverage gaps, based on your tenant's actual data ingestion and current posture. Worth fifteen minutes every couple of weeks.

### Reports

Pre-built reports across every workload. Useful for monthly leadership packs without building dashboards from scratch.

### Settings & permissions, the section to set up first

[![The Permissions and roles page under Settings, Microsoft Defender XDR in the Microsoft Defender portal, showing the get started prompt for activating the Microsoft Defender XDR Unified RBAC permissions model](/images/DefenderDemystified/defender-portal-permissions-roles.png)](/images/DefenderDemystified/defender-portal-permissions-roles.png)
> 📷 **Image 6: The Permissions and roles page. If Microsoft Defender XDR Unified RBAC hasn't been activated in your tenant yet, this is what you'll see — a starting point, not an error.**

In 2026, Microsoft consolidated permissions into **Microsoft Defender XDR Unified RBAC**. Three RBAC models now coexist in the portal, and this is genuinely worth understanding before you hand anyone the URL:

- **Microsoft Entra ID directory roles:** broad roles like Security Administrator, Security Reader
- **Workload-specific RBAC:** for legacy compatibility (Defender for Endpoint device groups, Defender for Office 365 Exchange-based roles)
- **Microsoft Defender XDR Unified RBAC:** the modern model with fine-grained permissions across workloads

One thing worth knowing before you go looking for it: Unified RBAC isn't switched on by default. It has to be activated explicitly, per workload, and until you do that your tenant keeps using Entra ID directory roles and workload-specific RBAC. That activation changes who can see what, so treat it as a planned change with its own testing and comms, not something to click through on a quiet afternoon.

For a team getting started, the practical setup:

- **Security Administrator** for SOC leads who configure policies
- **Security Operator** for analysts who investigate and respond
- **Security Reader** for auditors, managers, or external read-only access

Sort this out before inviting anyone in. I've seen the cleanup conversation after the fact and it's never fun.

## Your first hour in the Microsoft Defender portal

If you're opening this portal for the first time today, here's a productive 60-minute agenda:

1. **Minutes 0–10:** Go to **Settings → Permissions**. Verify the right people have the right roles. Add yourself with Security Administrator if needed.
2. **Minutes 10–20:** Open **Exposure management → Microsoft Secure Score**. Look at your overall score and read the top five recommendations. Don't change anything yet. Just absorb.
3. **Minutes 20–35:** Visit each of the four workload sections — **Endpoints, Email & collaboration, Identities, Cloud apps**. Confirm what's deployed. Note anything that shows "not configured" or empty.
4. **Minutes 35–45:** Open **Investigation & response → Incidents** and read three recent incidents end-to-end. This teaches more about what your platform actually sees than any documentation will.
5. **Minutes 45–55:** Run one of the sample KQL queries from earlier in **Advanced hunting**. Change the time window. Group by a different field. Get a feel for the editor.
6. **Minutes 55–60:** Bookmark `https://security.microsoft.com`. Pin it to your browser sidebar. From now on, this is your security home page.

## Wrapping up the series

That closes **Microsoft Defender Demystified**. If you've followed along from Part 1, you should now be able to:

- Name and distinguish every branch of the Microsoft Defender family
- Explain what each of the four Microsoft Defender XDR workloads does
- Describe how Microsoft Defender for Cloud differs from Microsoft Defender XDR, and when each applies
- Make a defensible licensing recommendation across small business, mid-market, and enterprise scenarios
- Open the Microsoft Defender portal and find any feature in under thirty seconds

That's enough foundation to take meaningful action in your own tenant. The next step is depth.

## Where to go from here

> 🔗 **Continue with the Microsoft Secure Score deep-dive series.** You now know that Microsoft Secure Score lives inside Exposure management in the Defender portal. **[How We Built a Gold-Winning GRC Programme on Microsoft Secure Score](/posts/secure-score-grc-part-0-intro/)** turns that single feature into the engine of an award-winning ISO 27001 and NIS2 compliance programme, the same blueprint that won Gold at the Cyber Security Awards 2026.

Follow me on [LinkedIn](https://www.linkedin.com/in/dimosthenisatteia/) for new-post notifications, or subscribe via RSS at the top of the page.

## Microsoft Learn resources

- [Microsoft Defender portal overview](https://learn.microsoft.com/en-us/unified-secops/overview-defender-portal)
- [Microsoft Defender XDR in the Microsoft Defender portal](https://learn.microsoft.com/en-us/defender-xdr/microsoft-365-defender-portal)
- [Microsoft Sentinel in the Microsoft Defender portal](https://learn.microsoft.com/en-us/azure/sentinel/move-to-defender)
- [Microsoft Defender for Cloud in the Defender portal](https://learn.microsoft.com/en-us/azure/defender-for-cloud/defender-portal/defender-for-cloud-defender-portal)
- [Microsoft Security Exposure Management overview](https://learn.microsoft.com/en-us/security-exposure-management/microsoft-security-exposure-management)
- [Microsoft Secure Score](https://learn.microsoft.com/en-us/defender-xdr/microsoft-secure-score)
- [Advanced hunting in Microsoft Defender XDR](https://learn.microsoft.com/en-us/defender-xdr/advanced-hunting-overview)
- [EntraIdSignInEvents table in the advanced hunting schema](https://learn.microsoft.com/en-us/defender-xdr/advanced-hunting-entraidsigninevents-table)
- [Microsoft Defender XDR Unified RBAC](https://learn.microsoft.com/en-us/defender-xdr/manage-rbac)
- [What's new for Microsoft's unified security operations](https://learn.microsoft.com/en-us/unified-secops/whats-new)
