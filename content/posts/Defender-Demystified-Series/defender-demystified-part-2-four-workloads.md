---
title: "Microsoft Defender Part 2: The Four Core XDR Workloads, Up Close"
date: 2026-05-25T10:00:00+03:00
lastmod: 2026-07-27T11:00:00+03:00
draft: false
keywords:
  - microsoft defender xdr explained
  - microsoft defender for endpoint vs office 365
  - microsoft defender xdr incident correlation example
  - which microsoft defender workload to deploy first
  - microsoft defender for endpoint plan 1 vs plan 2
  - microsoft defender for office 365 safe links explained
  - microsoft defender for identity lateral movement detection
  - microsoft defender for cloud apps shadow it discovery
  - how microsoft defender detects multi stage attacks
  - microsoft defender xdr attack story
  - microsoft defender edr behavioral monitoring
  - microsoft defender for office 365 anti phishing
  - microsoft defender xdr automatic attack disruption
  - microsoft 365 E5 security workloads
tags:
  - Microsoft Defender XDR
  - Microsoft Defender for Endpoint
  - Microsoft Defender for Office 365
  - Microsoft Defender for Identity
  - Microsoft Defender for Cloud Apps
  - XDR Correlation
  - EDR
  - Incident Response
  - Microsoft 365 E5
author: "Dimosthenis Atteia"
description: "How does Microsoft Defender XDR actually correlate signals across Endpoint, Office 365, Identity, and Cloud Apps? A technical walkthrough of the four core XDR workloads with a real multi-stage attack example showing cross-product correlation in action. For SOC teams, security architects, and CISOs implementing Microsoft 365 E5."
summary: "Deep dive into Microsoft Defender's four XDR workloads. Endpoint EDR, Office 365 Safe Links, Identity lateral movement detection, and Cloud Apps shadow IT discovery. Includes a phishing-to-data-exfiltration attack scenario showing how XDR correlation transforms four separate alerts into one unified incident."
categories: ["Azure Security", "Microsoft Defender", "Microsoft 365"]
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

In **[Part 1](/posts/defender-demystified-series/defender-demystified-part-1-what-is-microsoft-defender/)** I called **Microsoft Defender XDR** the conductor of an orchestra, and the individual Microsoft security products the instruments. It's a tidy metaphor, but it's time to actually meet the instruments.

There are four of them at the core of Microsoft Defender XDR. Each one is sold on its own, each one has its own engineering team at Microsoft, each one has its own portal section, and each one could protect a tenant in isolation. What makes them XDR, aka "Extended Detection and Response" is what happens when they start sharing signals. We'll get to that at the end.

First, let's meet each one properly.

## Microsoft Defender for Endpoint: EDR and Behavioral Monitoring Explained

[![Microsoft Defender portal home with the left navigation expanded, showing Endpoints, Email & collaboration, Identities, and Cloud apps](/images/DefenderDemystified/microsoft-defender-portal-navigation-workloads.png)](/images/DefenderDemystified/microsoft-defender-portal-navigation-workloads.png)
> 📷 *Image 1: The unified Microsoft Defender portal at security.microsoft.com, one console for all four XDR workloads.*

**[Microsoft Defender for Endpoint](https://learn.microsoft.com/en-us/defender-endpoint/microsoft-defender-endpoint)** is probably the one you've heard of. It protects the devices — Windows 10/11, Windows Server, macOS, Linux, iOS, Android. If someone's doing work on it, Microsoft Defender for Endpoint is watching.

What does "watching" actually mean in 2026? Quite a lot, as it turns out:

- Next-generation antivirus that catches things traditional signature-based AV misses
- **EDR** aka "Endpoint Detection and Response" the continuous behavioural monitoring that picks up on an attack in progress, not just a known bad file
- Attack Surface Reduction rules that close off the paths attackers actually use (malicious macros, credential theft, suspicious scripts)
- Automated Investigation and Remediation that does the first 15 minutes of SOC triage while your analysts are still reading the alert
- Microsoft Defender Vulnerability Management bundled in (at Plan 2) — more on that one in a later post

Here's a concrete example. Someone in accounting opens an invoice that turns out to be a ransomware dropper. Within seconds, Microsoft Defender for Endpoint notices the suspicious behavioural pattern, isolates the device from the network so the infection can't spread, kills the malicious process, and where possible rolls back the files it encrypted. An automated investigation opens that traces the thing backwards (*how did it get onto this device in the first place?*) and in many cases finds that the original email is still sitting in other inboxes, which the platform can then quarantine.

Notice the phrase *"the original email"*. That's not something Microsoft Defender for Endpoint sees on its own. That signal came from somewhere else. Hold that thought.

[![Microsoft Defender for Endpoint device inventory showing onboarded devices with risk and exposure levels](/images/DefenderDemystified/microsoft-defender-for-endpoint-device-inventory.png)](/images/DefenderDemystified/microsoft-defender-for-endpoint-device-inventory.png)
> 📷 *Image 2: Device inventory (Assets → Devices) with per-device risk and exposure scoring.*

## Microsoft Defender for Office 365: Safe Links, Safe Attachments, and Anti-Phishing

**[Microsoft Defender for Office 365](https://learn.microsoft.com/en-us/defender-office-365/mdo-about)** protects the productivity surface that most employees actually live in: email, Microsoft Teams, SharePoint Online, and OneDrive for Business. This is where the modern attack lifecycle overwhelmingly starts. If you ask any SOC lead where their detection alerts come from, email will be in the top three nine times out of ten.

A few of the things Microsoft Defender for Office 365 does that are worth knowing:

- **Safe Links** rewrites every URL in inbound email and scans the destination *at click time*, not just at delivery. This matters because attackers know delivery-time scanning exists, they send links that go to a benign page on Monday and flip to a credential harvester on Wednesday.
- **Safe Attachments** detonates attachments in a sandbox before handing them to the user, so if someone forwards you a "quarterly report" that actually runs PowerShell on open, the sandbox finds out first.
- **Anti-phishing policies** with impersonation protection, the thing that catches the *"Hi, this is the CEO, I need you to buy gift cards for the client meeting"* email even when it comes from a believable-looking domain.
- **Attack Simulation Training** lets you run realistic phishing simulations against your own users for training purposes. This is both useful and occasionally humbling.

A concrete example. A spear-phishing email impersonating your CEO lands in the CFO's inbox with a fake invoice attached. Microsoft Defender for Office 365 spots the impersonation pattern, sandboxes the attachment, identifies it as a credential harvester, and pulls the email out of every recipient's inbox before anyone clicks. If a click *had* already happened, that's where the signal handover to Microsoft Defender for Endpoint becomes powerful.

[![Microsoft Defender for Office 365 Threat Explorer showing a timeline of phishing emails, blocked versus delivered](/images/DefenderDemystified/microsoft-defender-office-365-threat-explorer-phish.png)](/images/DefenderDemystified/microsoft-defender-office-365-threat-explorer-phish.png)
> 📷 *Image 3: Threat Explorer (Email & collaboration → Explorer) — phishing detections over time, blocked vs delivered.*

## Microsoft Defender for Identity: Lateral Movement and Pass the Hash Detection

This is the workload I find most interesting, because it catches what the other two cannot: **what an attacker does after they've already got valid credentials.**

**[Microsoft Defender for Identity](https://learn.microsoft.com/en-us/defender-for-identity/what-is)** watches your on-premises Active Directory and the hybrid identities you've synchronized to Microsoft Entra ID. (For attacks against cloud-only identities, that's the job of Microsoft Entra ID Protection — a separate product.) Lightweight sensors installed on your domain controllers and, where present, on AD FS, AD CS, and Microsoft Entra Connect servers forward telemetry to the Microsoft Defender portal, where the platform looks for the kinds of things that don't look unusual from any single log but are very unusual when you see them in context.

What kinds of things?

- Pass-the-hash and pass-the-ticket attacks
- Kerberoasting and AS-REP roasting
- Golden ticket and silver ticket forgeries
- LDAP reconnaissance from accounts that have no business enumerating the directory
- Privilege escalation via sensitive group modifications
- Lateral movement paths using compromised accounts

Here's a scenario to make it tangible. An attacker has compromised one workstation and now wants to move laterally. They run a credential-dumping tool to extract NTLM hashes from memory, then try to use one of those hashes to authenticate to a file server. Nothing about that pattern looks unusual from an endpoint perspective — the file server just saw a successful authentication. But Microsoft Defender for Identity, sitting on the domain controller, sees the authentication shape and says *hold on, that's not how this user normally authenticates*. Alert fires, the SOC sees it within seconds, containment happens before the attacker reaches anything privileged.

For any organisation with a meaningful on-premises AD footprint — which is still the vast majority of mid-market and enterprise companies — this workload is genuinely non-optional.

[![Microsoft Defender for Identity timeline showing identity activity events for a user account](/images/DefenderDemystified/microsoft-defender-for-identity-timeline.png)](/images/DefenderDemystified/microsoft-defender-for-identity-timeline.png)
> 📷 *Image 4: Defender for Identity timeline on an identity entity page (Assets → Identities → user → Timeline).*

## Microsoft Defender for Cloud Apps: Shadow IT Discovery and CASB Controls

**[Microsoft Defender for Cloud Apps](https://learn.microsoft.com/en-us/defender-cloud-apps/what-is-defender-for-cloud-apps)** is a **CASB** — Cloud Access Security Broker. Translation: it sits between your users and the SaaS applications they use, giving you visibility, governance, and threat protection across both Microsoft and third-party cloud services.

Why is this a distinct product? Because the way people work changed, and security needed to catch up.

Here's what Microsoft Defender for Cloud Apps actually does day to day:

- **Shadow IT discovery**: finds the unsanctioned SaaS apps your users are already using. The number is always bigger than you think. I've seen tenants where the IT team believed they were running 40 apps and the reality was over 200.
- **App governance**: surfaces risky **OAuth applications** that users have granted consent to. This is one of the most under-appreciated attack vectors of the last five years.
- **Conditional Access App Control**: applies real-time session policies to risky sessions. Think: *"you can read this document in a browser, but you can't download it on an unmanaged device."*
- **Information protection extension**: takes your Microsoft Purview policies and applies them to third-party SaaS apps like Salesforce or Box.
- **Anomalous user behaviour detection**: impossible-travel logins, mass downloads, unusual admin activities.

The concrete example I like for this one: a user, somewhere, gets phished into granting an OAuth consent to a malicious app that requests broad mailbox access. The attacker never stole the password, but now has read access to every email the user ever receives. Microsoft Defender for Cloud Apps flags the consent grant, identifies the app as malicious through Microsoft threat intelligence, revokes the consent, and alerts the SOC. The attacker is locked out within minutes, not days.

[![Microsoft Defender for Cloud Apps Cloud Discovery dashboard showing discovered shadow IT SaaS apps and risk levels](/images/DefenderDemystified/microsoft-defender-cloud-apps-shadow-it-discovery.png)](/images/DefenderDemystified/microsoft-defender-cloud-apps-shadow-it-discovery.png)
> 📷 *Image 5: Cloud Discovery dashboard (Cloud apps → Cloud discovery) — 259 discovered apps, the classic shadow-IT gap.*

## How Microsoft Defender XDR Correlates Signals: A Real Multi-Stage Attack Example

Everything above was four separate products doing four separate jobs. That's useful. It's not yet **XDR**.

XDR (Extended Detection and Response) is what happens when these four products **share signals in real time** and a single attack that touches multiple surfaces becomes a single incident with a single attack story.

Let me walk through what that actually looks like, because this is the part that makes the whole investment worthwhile.

Imagine a reasonably standard multi-stage attack:

1. A spear-phishing email arrives in a finance manager's inbox. **Microsoft Defender for Office 365** flags suspicious indicators but the user, being human clicks anyway.
2. The link triggers a malicious download on the laptop. **Microsoft Defender for Endpoint** catches the dropper mid-execution, but not before it has managed to run a credential-stealer in memory.
3. The stolen credentials are used to authenticate against Active Directory from an unusual location. **Microsoft Defender for Identity** flags the abnormal sign-in pattern.
4. The now-compromised account starts mass-downloading files from SharePoint Online and a connected third-party SaaS app. **Microsoft Defender for Cloud Apps** detects the anomalous activity.

In a world without XDR, your SOC sees four separate alerts in four separate consoles, with no obvious connection between them, and probably closes at least the first three as low-confidence noise because none of them looks like a full attack on its own.

In Microsoft Defender XDR, **all four alerts collapse into one incident**, presented as a single attack story with a complete timeline, impacted assets, and recommended response actions. The platform can also **automatically disrupt** the attack (disabling the compromised account, isolating the device, and quarantining related emails across every recipient) without any analyst having to stitch it together manually.

This is what you're paying for when you buy into Microsoft Defender XDR. It's also why deploying only one workload, just Microsoft Defender for Endpoint, for example, a common starting point, gives you maybe 30% of the platform's value. The cross-product correlation is the product.

[![Microsoft Defender XDR incident attack story with an incident graph correlating alerts, devices, users, and processes](/images/DefenderDemystified/microsoft-defender-xdr-incident-attack-story.png)](/images/DefenderDemystified/microsoft-defender-xdr-incident-attack-story.png)
> 📷 *Image 6: An incident attack story (Incidents → incident → Attack story) with the correlation graph.*

## What's next

In **Part 3** we leave the Microsoft 365 world entirely and look at **Microsoft Defender for Cloud**, the separate product that protects Azure and multicloud workloads. Different portal, different licensing, different audience.

> 🔗 **Related deep-dive series:** Curious how Microsoft Secure Score, a feature inside the same Microsoft Defender portal we've been touring, can become the engine of an award-winning compliance programme? Read [How We Built a Gold-Winning GRC Programme on Microsoft Secure Score](/posts/secure-score-grc-part-0-intro/).

## Related Questions Security Teams Often Ask

**"Which Microsoft Defender workload should we deploy first?"**

Start with Defender for Endpoint (device protection) and Defender for Office 365 Plan 2 (email security). These two catch 80% of initial access attempts. Add Identity and Cloud Apps once your core coverage is solid.

**"What's the difference between Defender for Endpoint Plan 1 and Plan 2?"**

Plan 1 is prevention-focused: next-gen antivirus, attack surface reduction, device control, web/network protection, and manual response actions, but no EDR. Plan 2 is what adds the EDR engine itself (continuous behavioral monitoring with alerts and telemetry retention), automated investigation and remediation, advanced hunting, Live Response, and vulnerability management. Most enterprises need Plan 2 for meaningful SOC capability.

**"How long does it take for Microsoft Defender XDR to correlate an incident?"**

Near real time. The correlation engine processes signals within seconds to minutes. You'll typically see a unified incident appear within 5 to 10 minutes of the first alert firing, though complex attacks may take slightly longer as the platform gathers context.

**"Does Microsoft Defender XDR work with third party security tools?"**

Yes, via Microsoft Sentinel integration. Sentinel acts as the SIEM layer that ingests logs from both Microsoft Defender workloads and third party tools (firewalls, proxies, EDR from other vendors), providing unified threat hunting and correlation across your entire security stack.

**"Can we use Microsoft Defender workloads separately without XDR?"**

Technically yes, each workload functions standalone. But you lose the correlation engine, unified incident queue, and cross product automated response. Running them separately gives you maybe 30% of the platform's value. The XDR correlation is the product.

Follow me on [LinkedIn](https://www.linkedin.com/in/dimosthenisatteia/) for new-post notifications, or subscribe via RSS at the top of the page.

## Microsoft Learn resources

- [Microsoft Defender XDR overview](https://learn.microsoft.com/en-us/defender-xdr/microsoft-365-defender)
- [Microsoft Defender for Endpoint overview](https://learn.microsoft.com/en-us/defender-endpoint/microsoft-defender-endpoint)
- [Microsoft Defender for Office 365 overview](https://learn.microsoft.com/en-us/defender-office-365/mdo-about)
- [Microsoft Defender for Identity overview](https://learn.microsoft.com/en-us/defender-for-identity/what-is)
- [Microsoft Defender for Cloud Apps overview](https://learn.microsoft.com/en-us/defender-cloud-apps/what-is-defender-for-cloud-apps)

---