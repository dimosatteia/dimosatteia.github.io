---
title: "Microsoft Defender Demystified — Part 2: The Four Core XDR Workloads, Up Close"
date: 2026-04-23T10:00:00+03:00
draft: true
keywords:
  - where does Microsoft Secure Score data come from
  - which Microsoft products contribute to Secure Score
  - Microsoft Secure Score Exposure Management
  - Microsoft Secure Score license dependency
  - why are some Secure Score recommendations missing
  - Microsoft Secure Score refresh time
  - Microsoft Secure Score for ISO 27001
  - Microsoft Secure Score as audit evidence
  - Microsoft Secure Score NIS2 compliance
tags:
  - Microsoft Secure Score
  - Microsoft Defender XDR
  - Microsoft 365
  - Microsoft Defender for Endpoint
  - Microsoft Defender for Office 365
  - Microsoft Defender for Identity
  - Microsoft 365 Security
  - Exposure Management
  - Cyber GRC
  - Security Posture Management
  - NIS2
  - ISO 27001
author: "Dimosthenis Atteia"
description: "Microsoft Defender XDR is the conductor, but the actual music comes from four separate Microsoft security products playing in sync. A hands-on, human tour of Microsoft Defender for Endpoint, Office 365, Identity, and Cloud Apps — what each one protects, what threats it stops, and what the magic looks like when all four signal each other in real time."
summary: "Part 2 of the Microsoft Defender Demystified series. The four core XDR workloads — Microsoft Defender for Endpoint, Office 365, Identity, and Cloud Apps — explained one by one, with a real multi-stage attack scenario that shows why cross-product correlation is the whole point."
categories: ["Microsoft Defender", "Microsoft 365"]
series: ["Microsoft Defender Demystified"]
ShowToc: true
TocOpen: false
weight: 2
cover:
  image: "/images/DefenderDemystified/MSDef.png"
  alt: "The four core workloads of Microsoft Defender XDR"
  caption: "Microsoft Defender Demystified — Part 2"
---

## Picking up from Part 1

In **[Part 1](/posts/defender-demystified-part-1-what-is-microsoft-defender/)** I called **Microsoft Defender XDR** the conductor of an orchestra, and the individual Microsoft security products the instruments. It's a tidy metaphor, but it's time to actually meet the instruments.

There are four of them at the core of Microsoft Defender XDR. Each one is sold on its own, each one has its own engineering team at Microsoft, each one has its own portal section, and each one could protect a tenant in isolation. What makes them XDR — Extended Detection and Response — is what happens when they start sharing signals. We'll get to that at the end.

First, let's meet each one properly.

## Microsoft Defender for Endpoint — the one that watches devices

> 📷 **Image 1 — The Microsoft Defender portal with all four workload sections visible.**
> *Capture from `security.microsoft.com`, left navigation expanded. Annotate (in any image editor) with red boxes around the four workload sections: Endpoints, Email & collaboration, Identities, Cloud apps. This sets up the visual geography for the rest of the post. Format: 16:9, full-width.*

**[Microsoft Defender for Endpoint](https://learn.microsoft.com/en-us/defender-endpoint/microsoft-defender-endpoint)** is probably the one you've heard of. It protects the devices — Windows 10/11, Windows Server, macOS, Linux, iOS, Android. If someone's doing work on it, Microsoft Defender for Endpoint is watching.

What does "watching" actually mean in 2026? Quite a lot, as it turns out:

- Next-generation antivirus that catches things traditional signature-based AV misses
- **EDR** — Endpoint Detection and Response — the continuous behavioural monitoring that picks up on an attack in progress, not just a known bad file
- Attack Surface Reduction rules that close off the paths attackers actually use (malicious macros, credential theft, suspicious scripts)
- Automated Investigation and Remediation that does the first 15 minutes of SOC triage while your analysts are still reading the alert
- Microsoft Defender Vulnerability Management bundled in (at Plan 2) — more on that one in a later post

Here's a concrete example. Someone in accounting opens an invoice that turns out to be a ransomware dropper. Within seconds, Microsoft Defender for Endpoint notices the suspicious behavioural pattern, isolates the device from the network so the infection can't spread, kills the malicious process, and where possible rolls back the files it encrypted. An automated investigation opens that traces the thing backwards — *how did it get onto this device in the first place?* — and in many cases finds that the original email is still sitting in other inboxes, which the platform can then quarantine.

Notice the phrase *"the original email"*. That's not something Microsoft Defender for Endpoint sees on its own. That signal came from somewhere else. Hold that thought.

> 📷 **Image 2 — Microsoft Defender for Endpoint device inventory.**
> *Capture from: Endpoints → Device inventory. Show 5–10 device rows with risk levels and exposure scores visible. Redact device names.*

## Microsoft Defender for Office 365 — the one that watches email and collaboration

**[Microsoft Defender for Office 365](https://learn.microsoft.com/en-us/defender-office-365/mdo-about)** protects the productivity surface that most employees actually live in: email, Microsoft Teams, SharePoint Online, and OneDrive for Business. This is where the modern attack lifecycle overwhelmingly starts. If you ask any SOC lead where their detection alerts come from, email will be in the top three nine times out of ten.

A few of the things Microsoft Defender for Office 365 does that are worth knowing:

- **Safe Links** rewrites every URL in inbound email and scans the destination *at click time*, not just at delivery. This matters because attackers know delivery-time scanning exists — they send links that go to a benign page on Monday and flip to a credential harvester on Wednesday.
- **Safe Attachments** detonates attachments in a sandbox before handing them to the user, so if someone forwards you a "quarterly report" that actually runs PowerShell on open, the sandbox finds out first.
- **Anti-phishing policies** with impersonation protection — the thing that catches the *"Hi, this is the CEO, I need you to buy gift cards for the client meeting"* email even when it comes from a believable-looking domain.
- **Attack Simulation Training** lets you run realistic phishing simulations against your own users for training purposes. This is both useful and occasionally humbling.

A concrete example. A spear-phishing email impersonating your CEO lands in the CFO's inbox with a fake invoice attached. Microsoft Defender for Office 365 spots the impersonation pattern, sandboxes the attachment, identifies it as a credential harvester, and pulls the email out of every recipient's inbox before anyone clicks. If a click *had* already happened — that's where the signal handover to Microsoft Defender for Endpoint becomes powerful.

> 📷 **Image 3 — Microsoft Defender for Office 365 Threat Explorer.**
> *Capture from: Email & collaboration → Explorer. Show a recent timeline of detected phishing or malware emails. Redact subject lines and recipient names.*

## Microsoft Defender for Identity — the one that watches identities

This is the workload I find most interesting, because it catches what the other two cannot: **what an attacker does after they've already got valid credentials.**

**[Microsoft Defender for Identity](https://learn.microsoft.com/en-us/defender-for-identity/what-is)** watches your on-premises Active Directory and your Microsoft Entra ID tenant for identity-based attacks. Lightweight sensors installed on domain controllers and AD FS servers forward telemetry to the Microsoft Defender portal, where the platform looks for the kinds of things that don't look unusual from any single log but are very unusual when you see them in context.

What kinds of things?

- Pass-the-hash and pass-the-ticket attacks
- Kerberoasting and AS-REP roasting
- Golden ticket and silver ticket forgeries
- LDAP reconnaissance from accounts that have no business enumerating the directory
- Privilege escalation via sensitive group modifications
- Lateral movement paths using compromised accounts

Here's a scenario to make it tangible. An attacker has compromised one workstation and now wants to move laterally. They run a credential-dumping tool to extract NTLM hashes from memory, then try to use one of those hashes to authenticate to a file server. Nothing about that pattern looks unusual from an endpoint perspective — the file server just saw a successful authentication. But Microsoft Defender for Identity, sitting on the domain controller, sees the authentication shape and says *hold on, that's not how this user normally authenticates*. Alert fires, the SOC sees it within seconds, containment happens before the attacker reaches anything privileged.

For any organisation with a meaningful on-premises AD footprint — which is still the vast majority of mid-market and enterprise companies — this workload is genuinely non-optional.

> 📷 **Image 4 — Microsoft Defender for Identity timeline.**
> *Capture from: Identities → Identity timeline (or an Identity-related alert detail page). Show a timeline of identity events and detections. Redact user names.*

## Microsoft Defender for Cloud Apps — the one that watches SaaS

**[Microsoft Defender for Cloud Apps](https://learn.microsoft.com/en-us/defender-cloud-apps/what-is-defender-for-cloud-apps)** is a **CASB** — Cloud Access Security Broker. Translation: it sits between your users and the SaaS applications they use, giving you visibility, governance, and threat protection across both Microsoft and third-party cloud services.

Why is this a distinct product? Because the way people work changed, and security needed to catch up.

Here's what Microsoft Defender for Cloud Apps actually does day to day:

- **Shadow IT discovery** — finds the unsanctioned SaaS apps your users are already using. The number is always bigger than you think. I've seen tenants where the IT team believed they were running 40 apps and the reality was over 200.
- **App governance** — surfaces risky **OAuth applications** that users have granted consent to. This is one of the most under-appreciated attack vectors of the last five years.
- **Conditional Access App Control** — applies real-time session policies to risky sessions. Think: *"you can read this document in a browser, but you can't download it on an unmanaged device."*
- **Information protection extension** — takes your Microsoft Purview policies and applies them to third-party SaaS apps like Salesforce or Box.
- **Anomalous user behaviour detection** — impossible-travel logins, mass downloads, unusual admin activities.

The concrete example I like for this one: a user, somewhere, gets phished into granting an OAuth consent to a malicious app that requests broad mailbox access. The attacker never stole the password — but now has read access to every email the user ever receives. Microsoft Defender for Cloud Apps flags the consent grant, identifies the app as malicious through Microsoft threat intelligence, revokes the consent, and alerts the SOC. The attacker is locked out within minutes, not days.

> 📷 **Image 5 — Microsoft Defender for Cloud Apps dashboard.**
> *Capture from: Cloud apps → Cloud app catalog or App governance. Show discovered apps or the OAuth apps panel. Redact tenant-specific app names if needed.*

## And now the reason all of this matters together

Everything above was four separate products doing four separate jobs. That's useful. It's not yet **XDR**.

XDR — Extended Detection and Response — is what happens when these four products **share signals in real time** and a single attack that touches multiple surfaces becomes a single incident with a single attack story.

Let me walk through what that actually looks like, because this is the part that makes the whole investment worthwhile.

Imagine a reasonably standard multi-stage attack:

1. A spear-phishing email arrives in a finance manager's inbox. **Microsoft Defender for Office 365** flags suspicious indicators but the user — being human — clicks anyway.
2. The link triggers a malicious download on the laptop. **Microsoft Defender for Endpoint** catches the dropper mid-execution, but not before it has managed to run a credential-stealer in memory.
3. The stolen credentials are used to authenticate against Active Directory from an unusual location. **Microsoft Defender for Identity** flags the abnormal sign-in pattern.
4. The now-compromised account starts mass-downloading files from SharePoint Online and a connected third-party SaaS app. **Microsoft Defender for Cloud Apps** detects the anomalous activity.

In a world without XDR, your SOC sees four separate alerts in four separate consoles, with no obvious connection between them, and probably closes at least the first three as low-confidence noise because none of them looks like a full attack on its own.

In Microsoft Defender XDR, **all four alerts collapse into one incident**, presented as a single attack story with a complete timeline, impacted assets, and recommended response actions. The platform can also **automatically disrupt** the attack — disabling the compromised account, isolating the device, and quarantining related emails across every recipient — without any analyst having to stitch it together manually.

This is what you're paying for when you buy into Microsoft Defender XDR. It's also why deploying only one workload — just Microsoft Defender for Endpoint, for example, a common starting point — gives you maybe 30% of the platform's value. The cross-product correlation is the product.

> 📷 **Image 6 — A Microsoft Defender XDR incident showing cross-workload correlation.**
> *Capture from: Investigation & response → Incidents → open any multi-workload incident. Use the attack story view. Redact user names, device names, and IP addresses. This is the most important image in the post — pick a good incident, because this is what proves the whole thesis.*

## What's next

In **Part 3** we leave the Microsoft 365 world entirely and look at **Microsoft Defender for Cloud** — the separate product that protects Azure and multicloud workloads. Different portal, different licensing, different audience.

> 🔗 **Related deep-dive series:** Curious how Microsoft Secure Score — a feature inside the same Microsoft Defender portal we've been touring — can become the engine of an award-winning compliance programme? Read [How We Built a Gold-Winning GRC Programme on Microsoft Secure Score](/posts/secure-score-grc-part-0-intro/).

Follow me on [LinkedIn](https://www.linkedin.com/in/dimosthenisatteia/) for new-post notifications, or subscribe via RSS at the top of the page.

## Microsoft Learn resources

- [Microsoft Defender XDR overview](https://learn.microsoft.com/en-us/defender-xdr/microsoft-365-defender)
- [Microsoft Defender for Endpoint overview](https://learn.microsoft.com/en-us/defender-endpoint/microsoft-defender-endpoint)
- [Microsoft Defender for Office 365 overview](https://learn.microsoft.com/en-us/defender-office-365/mdo-about)
- [Microsoft Defender for Identity overview](https://learn.microsoft.com/en-us/defender-for-identity/what-is)
- [Microsoft Defender for Cloud Apps overview](https://learn.microsoft.com/en-us/defender-cloud-apps/what-is-defender-for-cloud-apps)

---

<!--
=========================================================
IMAGE PRODUCTION NOTES (delete before publish)
=========================================================

Image 1 — Defender portal navigation with workloads highlighted (cover)
  Source: security.microsoft.com (your tenant)
  Capture: left navigation pane expanded
  Annotate: red boxes around Endpoints, Email & collaboration, Identities, Cloud apps
  Format: 16:9, full-width
  Redaction: tenant name

Image 2 — Defender for Endpoint device inventory
  Source: security.microsoft.com → Endpoints → Device inventory
  Crop: 5–10 device rows with risk/exposure columns
  Redaction: device names

Image 3 — Defender for Office 365 Threat Explorer
  Source: Email & collaboration → Explorer
  Crop: timeline view with detected events
  Redaction: subjects, recipients

Image 4 — Defender for Identity timeline
  Source: Identities section (user timeline or alert detail)
  Crop: identity events timeline
  Redaction: user names

Image 5 — Defender for Cloud Apps dashboard
  Source: Cloud apps → Cloud app catalog OR App governance
  Crop: discovered apps OR OAuth apps panel
  Redaction: sensitive app names

Image 6 — Defender XDR incident with cross-workload correlation
  Source: Investigation & response → Incidents → multi-workload incident
  View: attack story
  Redaction: user names, device names, IPs
  Note: most important image in the post — pick a clean incident

TODO before publish:
  [ ] Capture the 6 images
  [ ] Save to /static/images/posts/defender-demystified-part-2/
  [ ] Replace 📷 placeholders with inline ![alt](path) markdown
  [ ] Verify link to /posts/defender-demystified-part-1-what-is-microsoft-defender/ resolves
  [ ] Verify link to /posts/secure-score-grc-part-0-intro/ resolves
=========================================================
-->
