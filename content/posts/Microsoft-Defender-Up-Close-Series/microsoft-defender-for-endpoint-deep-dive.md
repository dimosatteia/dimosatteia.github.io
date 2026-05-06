---
title: "Microsoft Defender for Endpoint, Up Close Part 1a — What It Is, What It Does, and How to Actually Roll It Out"
date: 2026-04-22T10:00:00+03:00
lastmod: 2026-04-22T10:00:00+03:00
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
description: "A practical, friendly deep dive into Microsoft Defender for Endpoint — Plan 1 vs Plan 2, what each tier actually gives you, how to onboard devices, and the configuration settings that matter most in the first week."
summary: "Microsoft Defender for Endpoint explained the way a working professional needs it. Plan 1 and Plan 2 side by side, what each one does, how onboarding actually works for Windows, macOS, Linux, iOS, and Android, and the Defender portal configuration settings to check in your first week."
categories: ["Microsoft Defender", "Endpoint Security"]
series: ["Microsoft Defender Up Close"]
ShowToc: true
TocOpen: false
weight: 1
cover:
  image: "/images/MDE/MDE.png"
  alt: "Microsoft Defender for Endpoint — deep dive"
  caption: "Microsoft Defender Up Close"
---

## Who this post is for

If you read **[Part 2 of the Defender Demystified series](/posts/defender-demystified-part-2-four-workloads/)**, you know what Microsoft Defender for Endpoint is at a high level — it's the workload in the Microsoft Defender family that watches the devices your users actually do work on.

This post is the follow-up for the professional who now has to do something with it: pick a plan, onboard devices, and configure the first set of settings that actually matter. Straightforward, hands-on, and no pretence that you'll absorb everything on day one. You won't. Nobody does.

## What Microsoft Defender for Endpoint actually does

**[Microsoft Defender for Endpoint](https://learn.microsoft.com/en-us/defender-endpoint/microsoft-defender-endpoint)** is an enterprise endpoint security platform that combines several capabilities most organisations used to buy from different vendors:

- **Next-generation antivirus** — real-time protection that catches what signature-based AV doesn't
- **Endpoint Detection and Response (EDR)** — behavioural monitoring that picks up on attacks in progress, not just known bad files
- **Attack Surface Reduction (ASR)** — rules that block common attack patterns (malicious macros, credential theft, suspicious scripts)
- **Automated Investigation and Remediation (AIR)** — the platform does the first 15 minutes of SOC triage for you
- **Threat and Vulnerability Management (TVM)** — CVE tracking, software inventory, and remediation prioritisation across your fleet
- **Attack Simulation** (limited, in the Defender portal generally — Attack Simulation Training is more robust in Defender for Office 365)

All of this runs on the same agent that's already built into every modern Windows device — **Microsoft Defender Antivirus**. Defender for Endpoint is the brain; the antivirus is the body.

## Plan 1 vs Plan 2 — the one decision that matters most

Microsoft sells Defender for Endpoint in two tiers, and the difference between them is where most of the cost-benefit conversation lives.

**[Microsoft Defender for Endpoint Plan 1](https://learn.microsoft.com/en-us/defender-endpoint/defender-endpoint-plan-1)** is the **preventive** tier. You get:

- Next-generation antivirus
- Attack surface reduction rules
- Device-based Conditional Access signals
- Manual response actions (isolate device, run antivirus scan)
- Basic reports

Plan 1 is included in **Microsoft 365 E3** and can be bought standalone.

**[Microsoft Defender for Endpoint Plan 2](https://learn.microsoft.com/en-us/defender-endpoint/defender-endpoint-plan-1-2)** is the **detection and response** tier. You get everything in Plan 1, plus:

- Full Endpoint Detection and Response (EDR) with behavioural analytics
- Automated Investigation and Remediation
- Advanced hunting with KQL
- **Microsoft Defender Vulnerability Management** bundled in
- Threat analytics reports mapped to your tenant
- Microsoft Threat Experts (targeted attack notifications)

Plan 2 is what you want for any real security function, and it's included in **Microsoft 365 E5** or as part of the **Microsoft Defender Suite** add-on.

The honest version: if your role includes "detect and respond to attacks", you need Plan 2. Plan 1 is fine for smaller organisations whose approach is "prevent and hope for the best", but anyone with a meaningful risk register outgrows it fast.

## Which devices it protects

Microsoft Defender for Endpoint works across:

- **Windows** 10, 11, Server 2012 R2 through Server 2025
- **macOS** (current and previous major versions)
- **Linux** — Red Hat, Ubuntu, CentOS, SUSE, Debian, Oracle, Amazon Linux
- **iOS** (through the Microsoft Defender mobile app)
- **Android** (through the Microsoft Defender mobile app)

Windows and Windows Server support is the most mature. Linux and macOS support is solid and has improved dramatically over the last two years. Mobile support is a different experience entirely — it's more about network-level threat protection and jailbreak/root detection than full EDR.

## How to actually onboard your devices

Onboarding is where most new deployments stall, so let's make it concrete.

**For Windows devices managed by Microsoft Intune:**

> 📷 **Image 1 — Intune connector configuration in the Defender portal.**
> *Capture from: Defender portal → Settings → Endpoints → Advanced features. Scroll to "Microsoft Intune connection" and capture the toggle. This is the one-click integration that makes everything downstream work.*

1. In the **Microsoft Defender portal** (`security.microsoft.com`), go to **Settings → Endpoints → Advanced features** and turn on **Microsoft Intune connection**.
2. In the **Microsoft Intune admin center**, go to **Endpoint security → Microsoft Defender for Endpoint** and enable the connection.
3. Create an **Endpoint Detection and Response policy** in Intune and assign it to your device groups.

Devices auto-onboard within a few hours. No scripts, no offline packages, no manual deployment runs.

**For Windows devices managed by Configuration Manager (SCCM):**

A different flow using the co-management setup. Microsoft's [onboarding guide for Configuration Manager](https://learn.microsoft.com/en-us/defender-endpoint/configure-endpoints-sccm) is the canonical reference.

**For unmanaged Windows devices:**

Download the onboarding script from **Settings → Endpoints → Onboarding**, run it as admin on each device. Fine for small numbers, painful at scale.

**For macOS and Linux:**

Install the Microsoft Defender for Endpoint agent via your existing management tool (Jamf for macOS, Ansible/Puppet/Chef for Linux are all supported). Microsoft publishes the packages and the configuration JSON.

**For iOS and Android:**

Users install the **Microsoft Defender app** from the respective app store and sign in with their work account. Intune app protection policies can enforce installation.

> 📷 **Image 2 — Device inventory after onboarding.**
> *Capture from: Defender portal → Assets → Devices. Show a populated device inventory with OS mix, risk levels, and exposure scores. Redact device names. This is what "it's working" looks like.*

## What to configure in your first week

Don't try to configure everything. Focus on these:

**1. Baseline security policies**

> 📷 **Image 3 — Security baselines in Intune.**
> *Capture from: Intune admin center → Endpoint security → Security baselines → Microsoft Defender for Endpoint baseline. Show the profiles list.*

Microsoft ships an opinionated security baseline for Defender for Endpoint. Deploy it to a pilot group first. Review what it changes. Expand.

**2. Attack Surface Reduction rules**

ASR rules block common attack patterns — things like "don't let Office apps launch child processes" and "don't let scripts load downloaded content". There are around 16 rules. Don't turn them all on at once in Enforce mode — start in **Audit mode** for two weeks, review what would have been blocked, then flip the ones that don't break legitimate work to Enforce.

> 📷 **Image 4 — Attack Surface Reduction rules in the Defender portal.**
> *Capture from: Defender portal → Endpoints → Vulnerability management → Security recommendations, then filter for "Turn on attack surface reduction rules". Or alternatively from the ASR rules report.*

**3. Web content filtering**

Block categories your acceptable-use policy says you don't allow (gambling, adult content, malware domains, newly registered domains). Five minutes of configuration, immediate risk reduction.

**4. Tamper protection**

> 📷 **Image 5 — Tamper protection setting.**
> *Capture from: Defender portal → Settings → Endpoints → Advanced features → Tamper protection toggle.*

Turn this on. It prevents attackers (and helpful users) from disabling Microsoft Defender Antivirus via registry, PowerShell, or Group Policy. No reason not to enable it.

**5. Automated investigation**

In Plan 2, **Automated Investigation and Remediation (AIR)** can be configured to auto-remediate in the Defender portal's **Settings → Endpoints → Automation levels**. Start with "Semi — require approval for any remediation" for two weeks, then graduate to "Full — remediate threats automatically" once you trust the platform's judgement.

## A reasonable first-month plan

- **Week 1** — Onboard a pilot group (10–20 devices), deploy security baseline, turn on tamper protection and web content filtering.
- **Week 2** — Enable ASR rules in Audit mode. Start reading the resulting events.
- **Week 3** — Onboard the rest of the fleet in waves. Move the first ASR rules into Enforce.
- **Week 4** — Run a Threat Analytics review, configure Automated Investigation to Semi mode, schedule a monthly review.

By end of month one you have a functioning Microsoft Defender for Endpoint deployment with telemetry flowing into the Microsoft Defender portal, onto which everything else in your security stack can now build.

## Where to go from here

> 🔗 **Read the rest of the Microsoft Defender Up Close series** for the sibling workloads: **[Microsoft Defender for Office 365](/posts/microsoft-defender-for-office-365-deep-dive/)**, **[Microsoft Defender for Identity](/posts/microsoft-defender-for-identity-deep-dive/)**, **[Microsoft Defender for Cloud Apps](/posts/microsoft-defender-for-cloud-apps-deep-dive/)**.

> 🔗 **Want to see how all of this feeds into compliance evidencing?** Read **[How We Built a Gold-Winning GRC Programme on Microsoft Secure Score](/posts/secure-score-grc-part-0-intro/)**.

Follow me on [LinkedIn](https://www.linkedin.com/in/dimosthenisatteia/) for new-post notifications, or subscribe via RSS at the top of the page.

## Microsoft Learn resources

- [Microsoft Defender for Endpoint overview](https://learn.microsoft.com/en-us/defender-endpoint/microsoft-defender-endpoint)
- [Microsoft Defender for Endpoint Plan 1 vs Plan 2](https://learn.microsoft.com/en-us/defender-endpoint/defender-endpoint-plan-1-2)
- [Onboard devices to Microsoft Defender for Endpoint](https://learn.microsoft.com/en-us/defender-endpoint/onboard-configure)
- [Attack surface reduction rules reference](https://learn.microsoft.com/en-us/defender-endpoint/attack-surface-reduction-rules-reference)
- [Microsoft Defender Vulnerability Management](https://learn.microsoft.com/en-us/defender-vulnerability-management/defender-vulnerability-management)
- [Security baselines for Microsoft Defender for Endpoint](https://learn.microsoft.com/en-us/defender-endpoint/configure-machines-security-baseline)

---

<!--
IMAGE NOTES
Image 1: Defender portal → Settings → Endpoints → Advanced features → Microsoft Intune connection toggle
Image 2: Defender portal → Assets → Devices (populated inventory, redact names)
Image 3: Intune admin center → Endpoint security → Security baselines → MDE baseline
Image 4: Defender portal → Endpoints → ASR rules report
Image 5: Defender portal → Settings → Endpoints → Advanced features → Tamper protection
Save to /static/images/posts/microsoft-defender-for-endpoint-deep-dive/
-->
