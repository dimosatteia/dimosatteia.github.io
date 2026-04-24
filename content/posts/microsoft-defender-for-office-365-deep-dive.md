---
title: "Microsoft Defender for Office 365, Up Close Part 1b — From Preset Policies to Advanced Configuration"
date: 2026-04-23T10:00:00+03:00
draft: true
description: "A hands-on walk through Microsoft Defender for Office 365 — Plan 1 vs Plan 2 differences, the preset security policies that give you 80% of the value in 10 minutes, and the custom policy configuration that matters for the remaining 20%."
summary: "Microsoft Defender for Office 365 explained in practical terms. Plan 1 vs Plan 2, how preset security policies take the friction out of day-one deployment, and the specific settings for Safe Links, Safe Attachments, and anti-phishing that matter most."
tags: ["microsoft-defender-for-office-365", "mdo", "email-security", "microsoft-defender", "safe-links", "safe-attachments", "anti-phishing"]
categories: ["Microsoft Defender", "Email Security"]
series: ["Microsoft Defender Up Close"]
ShowToc: true
TocOpen: false
weight: 2
cover:
  image: ""
  alt: "Microsoft Defender for Office 365 — deep dive"
  caption: "Microsoft Defender Up Close"
---

## Why this one matters more than most

Email is where the vast majority of real attacks start. Every SOC team will tell you the same thing: if you ask where their high-fidelity alerts come from, email is in the top three nine times out of ten. That's the job **[Microsoft Defender for Office 365](https://learn.microsoft.com/en-us/defender-office-365/mdo-about)** does — protecting the productivity surface your users spend most of their day in.

This post is the practical follow-up to **[Part 2 of the Defender Demystified series](/posts/defender-demystified-part-2-four-workloads/)**. We'll cover the Plan 1 vs Plan 2 difference, the preset security policies that make day-one deployment almost painless, and the specific settings that are worth your configuration time.

## What Microsoft Defender for Office 365 protects

The product secures four surfaces inside the Microsoft 365 productivity stack:

- **Email** (Exchange Online inbound, outbound, and internal)
- **Microsoft Teams** (chat messages, channels, files shared in Teams)
- **SharePoint Online** (files and sharing)
- **OneDrive for Business** (files and sharing)

If a link lives in Teams chat or an attachment lives in a OneDrive shared folder, it gets the same treatment as something that arrived via email. That uniformity matters a lot — attackers know email is well-defended and have been shifting to Teams and SharePoint-based phishing for exactly this reason.

## Plan 1 vs Plan 2

Like Microsoft Defender for Endpoint, Microsoft Defender for Office 365 sells in two tiers.

**[Plan 1](https://learn.microsoft.com/en-us/defender-office-365/mdo-security-comparison)** is the **preventive** tier:

- Safe Links
- Safe Attachments
- Anti-phishing policies with impersonation protection
- Anti-spam and anti-malware policies
- Real-time detection reports

Plan 1 is now included in **Microsoft 365 E3** after the July 2026 packaging update, and in Microsoft 365 Business Premium.

**Plan 2** adds the **investigation and training** capabilities:

- **Threat Explorer** — searchable timeline of all email-borne threats
- **Attack Simulation Training** — run realistic phishing campaigns against your own users
- **Automated Investigation and Response (AIR)** for email incidents
- Threat Trackers and Campaign Views
- Advanced hunting on email data

Plan 2 is included in **Microsoft 365 E5** or as part of the Microsoft Defender Suite add-on.

If your organisation has any security awareness programme, Plan 2 Attack Simulation Training alone tends to justify the upgrade — running believable simulated phishing against your users and tracking improvement over time is a genuinely effective control.

## The fastest way to get value — preset security policies

Microsoft knows configuring anti-phishing, anti-spam, and anti-malware policies from scratch is tedious. So they ship **[preset security policies](https://learn.microsoft.com/en-us/defender-office-365/preset-security-policies)** — pre-configured bundles in two strictness levels that you just turn on for the users or groups you want.

> 📷 **Image 1 — Preset security policies in the Defender portal.**
> *Capture from: Defender portal → Email & collaboration → Policies & rules → Threat policies → Preset security policies. Show the Standard and Strict toggles with their assignment status.*

Two levels:

- **Standard protection** — recommended for most users. Reasonable defaults, low false-positive rate.
- **Strict protection** — recommended for high-risk users (executives, finance, legal, IT admins). Tighter controls, slightly higher false-positive rate.

Assign **Standard protection** to all users. Assign **Strict protection** to a group containing your high-value targets. That's a ten-minute configuration that delivers roughly 80% of the value of Microsoft Defender for Office 365.

The preset policies evolve with the threat landscape — Microsoft updates the underlying rules as attack techniques change, so you benefit without having to manage policy drift yourself.

## The configuration worth doing yourself

The remaining 20% of value sits in settings Microsoft leaves to you because they depend on your environment. Here are the ones worth the time.

### Safe Links policies

**[Safe Links](https://learn.microsoft.com/en-us/defender-office-365/safe-links-about)** rewrites every URL in inbound email (and in Teams chat) so clicks are checked at click-time, not just at delivery. The default presets cover most cases, but for custom policies check:

- **Real-time URL scanning** — enabled by default, don't turn off
- **Wait for URL scanning to complete before delivery** — slower delivery but safer; enable for high-risk groups
- **Apply Safe Links to email messages sent within the organisation** — catches internal lateral phishing (where an attacker has already compromised one account)
- **Do not track user clicks** — leave this off unless legal specifically asks; you want the click telemetry

> 📷 **Image 2 — Safe Links policy configuration.**
> *Capture from: Defender portal → Email & collaboration → Policies & rules → Threat policies → Safe Links. Open or create a policy and capture the configuration pane.*

### Safe Attachments policies

**[Safe Attachments](https://learn.microsoft.com/en-us/defender-office-365/safe-attachments-about)** detonates attachments in a sandbox before delivery. The main decision:

- **Block** — don't deliver the message if the attachment is malicious (recommended)
- **Replace** — strip the attachment, deliver the message with a placeholder notice (legacy option, now rarely used)
- **Dynamic Delivery** — deliver the message body immediately and the attachment only after scanning completes (useful when delivery latency matters)

For most organisations, **Block** is the right choice. The average sandbox scan completes in under a minute; genuine delivery urgency is rarer than you think.

### Anti-phishing impersonation protection

This is where the real magic lives. In the anti-phishing policy, configure:

- **User impersonation protection** — add your executives, finance leadership, and IT admins as protected users
- **Domain impersonation protection** — add your primary domains and (importantly) lookalike domains Microsoft's own analysis would flag
- **Mailbox intelligence** — leave enabled; it learns each user's typical correspondents

> 📷 **Image 3 — Anti-phishing policy impersonation settings.**
> *Capture from: Defender portal → Email & collaboration → Policies & rules → Threat policies → Anti-phishing. Open a policy and capture the impersonation settings pane.*

I've seen this single piece of configuration block business email compromise attempts that would otherwise have cost six figures. Don't skip it.

## Plan 2 specifics worth calling out

### Threat Explorer

> 📷 **Image 4 — Threat Explorer timeline view.**
> *Capture from: Defender portal → Email & collaboration → Explorer. Show a recent detection timeline. Redact subject lines and recipient names.*

**[Threat Explorer](https://learn.microsoft.com/en-us/defender-office-365/threat-explorer-about)** is a live, queryable timeline of email-borne threats in your tenant. Use it to investigate specific incidents, see the spread of a campaign, and confirm that quarantine and remediation worked. Schedule 30 minutes in Threat Explorer weekly — you'll notice patterns no dashboard will surface on its own.

### Attack Simulation Training

> 📷 **Image 5 — Attack Simulation Training overview.**
> *Capture from: Defender portal → Email & collaboration → Attack simulation training. Show the overview with recent simulations or simulation creation wizard.*

**[Attack Simulation Training](https://learn.microsoft.com/en-us/defender-office-365/attack-simulation-training-simulations)** lets you run simulated phishing campaigns against your own users, with realistic templates from actual threat intelligence. Results feed into automatic training assignments for users who fall for the simulation.

My suggestion: start small. Run one simulation per quarter to a pilot group, measure click rate, expand. Make it a learning exercise, not a punitive one — public-naming simulation failures is how you get users angry at security, not educated.

## A reasonable first-month plan

- **Week 1** — Assign preset security policies (Standard to everyone, Strict to high-risk groups). Confirm email continues to flow normally.
- **Week 2** — Review the **Threat Policies** page and enable or tune custom Safe Links, Safe Attachments, and Anti-phishing policies where needed.
- **Week 3** — Add user and domain impersonation protection for executives, finance, and IT. Verify from a test mailbox.
- **Week 4** — (Plan 2) Run your first Attack Simulation Training campaign to a pilot group. Review the results; don't name anyone publicly.

## Where to go from here

> 🔗 **Read the rest of the Microsoft Defender Up Close series:** **[Microsoft Defender for Endpoint](/posts/microsoft-defender-for-endpoint-deep-dive/)**, **[Microsoft Defender for Identity](/posts/microsoft-defender-for-identity-deep-dive/)**, **[Microsoft Defender for Cloud Apps](/posts/microsoft-defender-for-cloud-apps-deep-dive/)**.

> 🔗 **Curious how Microsoft Defender for Office 365 configuration maps to ISO 27001 and NIS2 controls?** See **[How We Built a Gold-Winning GRC Programme on Microsoft Secure Score](/posts/secure-score-grc-part-0-intro/)**.

Follow me on [LinkedIn](https://www.linkedin.com/in/dimosthenisatteia/) for new-post notifications, or subscribe via RSS at the top of the page.

## Microsoft Learn resources

- [Microsoft Defender for Office 365 overview](https://learn.microsoft.com/en-us/defender-office-365/mdo-about)
- [Microsoft Defender for Office 365 Plan 1 vs Plan 2](https://learn.microsoft.com/en-us/defender-office-365/mdo-security-comparison)
- [Preset security policies](https://learn.microsoft.com/en-us/defender-office-365/preset-security-policies)
- [Safe Links configuration](https://learn.microsoft.com/en-us/defender-office-365/safe-links-about)
- [Safe Attachments configuration](https://learn.microsoft.com/en-us/defender-office-365/safe-attachments-about)
- [Attack Simulation Training](https://learn.microsoft.com/en-us/defender-office-365/attack-simulation-training-simulations)
- [Threat Explorer](https://learn.microsoft.com/en-us/defender-office-365/threat-explorer-about)

---

<!--
IMAGE NOTES
Image 1: Defender portal → Email & collaboration → Policies & rules → Threat policies → Preset security policies
Image 2: Same path → Safe Links → open a policy
Image 3: Same path → Anti-phishing → open a policy → impersonation settings
Image 4: Defender portal → Email & collaboration → Explorer (redact subjects/recipients)
Image 5: Defender portal → Email & collaboration → Attack simulation training
Save to /static/images/posts/microsoft-defender-for-office-365-deep-dive/
-->
