---
title: "Microsoft Defender Demystified — Part 1: How Many Defenders Are There, Really?"
date: 2026-04-23T10:00:00+03:00
draft: true
author: "Dimosthenis"
description: "Microsoft has a product called Defender. And another. And another. If you've ever stared at the Microsoft Defender hub on Microsoft Learn and wondered where to even start, this post is for you. A friendly, honest tour of the Microsoft Defender family — the way Microsoft itself organises it."
summary: "Series introduction. The Microsoft Defender family explained the way Microsoft itself organises it on Microsoft Learn — eight core products, plus a few close cousins, plus one consumer app. Written for IT pros who want the full picture without the marketing fog."
tags: ["microsoft-defender", "microsoft-defender-xdr", "microsoft-defender-for-endpoint", "microsoft-defender-for-office-365", "microsoft-defender-for-identity", "microsoft-defender-for-cloud-apps", "microsoft-defender-vulnerability-management", "microsoft-defender-for-iot", "microsoft-sentinel", "microsoft-defender-for-cloud", "security", "ciso", "fundamentals"]
categories: ["Microsoft Defender", "Microsoft 365"]
series: ["Microsoft Defender Demystified"]
ShowToc: true
TocOpen: false
weight: 1
cover:
  image: "" # TODO: cover image — the Microsoft Defender family map (see Image 1 below)
  alt: "The Microsoft Defender family, as Microsoft itself organises it"
  caption: "Microsoft Defender Demystified — Part 1"
---

## A confession

I've been doing security work for a while now, and I'll admit something that took me longer than it should have to sort out: for the first year I was deep into the Microsoft ecosystem, every time someone said *"let's look at this in Defender"* I had to quietly think *"okay, which Defender do they mean?"* before responding.

If you've felt that too, you're not alone. Microsoft has put the Defender name on so many distinct products that the confusion is genuinely structural, not something you need to be embarrassed about. Even the [Microsoft Defender products and services hub on Microsoft Learn](https://learn.microsoft.com/en-us/defender/) — the canonical place to go — lists **eight core products**, plus a couple of close cousins in a "related content" section, plus a consumer app that lives entirely outside this world.

This post is the friendly walking tour I wish I'd had on day one. We'll go through the family the way Microsoft itself organises it, with a sentence or two on each, so by the end you can look at any Defender product name and have a rough idea of what it does, who it's for, and whether it applies to you.

No marketing fog. No acronym soup. Just a map.

## The big umbrella: Microsoft Defender XDR

> 📷 **Image 1 — The Microsoft Defender family, as Microsoft organises it.**
> *A single visual grouping the eight core products into two rings: the inner ring with the four Defender XDR workloads (Endpoint, Office 365, Identity, Cloud Apps), the outer ring with Vulnerability Management, Defender for IoT, Microsoft Sentinel, and the Defender XDR umbrella itself. Build in PowerPoint or draw.io using the Microsoft Fluent palette. Export as 1920×1080 PNG. This is the image that makes the whole post click visually.*

When someone in an enterprise context says **"Defender"** without any qualifier, they almost always mean **[Microsoft Defender XDR](https://learn.microsoft.com/en-us/defender-xdr/microsoft-365-defender)**. Microsoft Defender XDR is not itself a product that does anything — it's the **umbrella**. It's the name for the unified portal at `security.microsoft.com`, the single incident queue, and the cross-product correlation engine that stitches signals from the underlying workloads into one attack story.

Think of it like this: if you imagine a security-operations team as an orchestra, Microsoft Defender XDR is the conductor. The actual music comes from the individual instruments — and those are the four workloads we'll look at next.

## The four core XDR workloads

These four are Microsoft's flagship security products. Each one is sold separately (or bundled into Microsoft 365 E5), and each one can exist without the others — but together, under the XDR umbrella, they're much more than the sum of their parts.

### Microsoft Defender for Endpoint

**[Microsoft Defender for Endpoint](https://learn.microsoft.com/en-us/defender-endpoint/microsoft-defender-endpoint)** protects your devices. Windows laptops, Macs, Linux servers, iPhones, Androids — if an employee does work on it, this is what's watching. It does next-generation antivirus, EDR (Endpoint Detection and Response), attack surface reduction, automated investigation and remediation, and it's the foundation most organisations start their Microsoft security journey with.

**When you need it:** the moment you realise that endpoint protection in 2026 means more than just antivirus.

> 📖 **Deep dive:** I've written a dedicated walkthrough of Microsoft Defender for Endpoint — what Plan 1 and Plan 2 actually differ on, how to deploy it, and what to configure first. Read it here: **[Microsoft Defender for Endpoint, Up Close](/posts/microsoft-defender-for-endpoint-deep-dive/)**.

### Microsoft Defender for Office 365

**[Microsoft Defender for Office 365](https://learn.microsoft.com/en-us/defender-office-365/mdo-about)** protects the productivity surface most of your users spend their day in — email, Microsoft Teams, SharePoint Online, and OneDrive for Business. It rewrites every URL in inbound email so it can be checked at click-time (not just at delivery), detonates suspicious attachments in a sandbox, catches business email compromise attempts, and includes attack simulation training if you want to test your users.

**When you need it:** the moment someone on the finance team tells you about the *"really convincing"* email they almost replied to.

> 📖 **Deep dive:** Plan 1 vs Plan 2, the policies that actually matter, Safe Links and Safe Attachments configuration step by step. Read: **[Microsoft Defender for Office 365, Up Close](/posts/microsoft-defender-for-office-365-deep-dive/)**.

### Microsoft Defender for Identity

**[Microsoft Defender for Identity](https://learn.microsoft.com/en-us/defender-for-identity/what-is)** watches your identity infrastructure — on-premises Active Directory and Microsoft Entra ID — for the kinds of attacks that happen *after* a password has been stolen. Pass-the-hash, pass-the-ticket, Kerberoasting, golden ticket forgeries, lateral movement, suspicious LDAP reconnaissance. The stuff that doesn't look like anything unusual from an endpoint or email perspective but is very unusual when you're the domain controller watching your own authentication traffic.

**When you need it:** the moment your risk register includes a credible lateral-movement scenario. For most organisations with any on-premises AD footprint, that's from day one.

> 📖 **Deep dive:** How sensors work, where to install them, what alerts to expect, and how to wire it all up against your on-prem AD. Read: **[Microsoft Defender for Identity, Up Close](/posts/microsoft-defender-for-identity-deep-dive/)**.

### Microsoft Defender for Cloud Apps

**[Microsoft Defender for Cloud Apps](https://learn.microsoft.com/en-us/defender-cloud-apps/what-is-defender-for-cloud-apps)** is a CASB — a Cloud Access Security Broker. That's a fancy way of saying it sits between your users and the SaaS applications they use, giving you visibility into shadow IT, control over risky OAuth apps, and the ability to extend your information-protection policies into third-party services like Salesforce, Box, or Google Workspace.

**When you need it:** the moment you realise you have no idea how many SaaS apps your users have actually signed up for. For most mid-market organisations, the real number is roughly four times what IT thinks.

> 📖 **Deep dive:** Shadow IT discovery, OAuth app governance, Conditional Access App Control, and how to actually configure a CASB so it helps rather than annoys your users. Read: **[Microsoft Defender for Cloud Apps, Up Close](/posts/microsoft-defender-for-cloud-apps-deep-dive/)**.

## The specialist workloads

Beyond the four core XDR workloads, Microsoft groups several more products on the same Microsoft Learn hub. They're equally part of the family — just more targeted.

### Microsoft Defender Vulnerability Management

**[Microsoft Defender Vulnerability Management](https://learn.microsoft.com/en-us/defender-vulnerability-management/defender-vulnerability-management)** tracks known software vulnerabilities across your fleet — which CVEs are present on which devices, which patches are available, which browser extensions users have installed that they shouldn't have, and which applications have reached end-of-support. A chunk of this capability is bundled into Microsoft Defender for Endpoint Plan 2; the standalone product gives you a fuller experience across a wider asset footprint.

**When you need it:** the moment your ISO 27001 auditor asks you how you handle vulnerability management and you realise "we patch Tuesday" isn't really an answer anymore.

### Microsoft Defender for IoT

This one is personal for me. I run security at a manufacturing company with real OT and ICS infrastructure — Siemens PLCs, SCADA systems, HMIs — and **[Microsoft Defender for IoT](https://learn.microsoft.com/en-us/defender-for-iot/microsoft-defender-iot)** is the product in the Defender family that addresses that world. It discovers OT devices on the network without requiring agents (which matters because you absolutely cannot install anything on a PLC), builds an asset inventory, identifies vulnerabilities specific to industrial protocols, and detects anomalous behaviour that might indicate an attack on production systems.

If you've read the Greek news on **NIS2** and recognised that the new directive has teeth in manufacturing, chemicals, food, water, and energy, Microsoft Defender for IoT is part of the conversation. I'll write a dedicated post on this one later in the series — there's too much to cover in a sentence.

**When you need it:** the moment you realise your factory floor has more unmanaged devices than your office floor.

### Microsoft Sentinel

Worth pausing on. **[Microsoft Sentinel](https://learn.microsoft.com/en-us/unified-secops-platform/overview-unified-security)** is Microsoft's cloud-native SIEM and SOAR — Security Information and Event Management, and Security Orchestration, Automation, and Response. It collects security telemetry from everywhere (Microsoft products, third-party tools, network appliances, custom sources) and gives you a unified place to write detection rules, run investigations, and automate response.

Microsoft positions Sentinel as part of the Defender hub now, which is a relatively recent change. In the unified Microsoft Defender portal at `security.microsoft.com`, Sentinel and Defender XDR have essentially merged into one security operations experience. Microsoft has announced that Sentinel in the Azure portal will be retired entirely — so if you're still using Sentinel only from Azure, the clock is ticking.

**When you need it:** the moment you need to correlate security signals that don't all come from Microsoft products.

## The close cousins (Microsoft lists them separately, but they belong in your mental model)

On the Microsoft Learn hub page, two more products appear under a separate "Other content" heading. They're not part of Microsoft Defender XDR strictly speaking, but you absolutely need to know them:

### Microsoft Security Exposure Management

**[Microsoft Security Exposure Management](https://learn.microsoft.com/en-us/security-exposure-management/microsoft-security-exposure-management)** is where **Microsoft Secure Score** now lives, alongside broader attack-surface and exposure analytics. It's the posture layer of the Microsoft security story — the answer to *"how exposed are we?"* rather than *"are we under attack right now?"*.

If you're curious about turning this into a full compliance programme, I've written about that elsewhere: **[How We Built a Gold-Winning GRC Programme on Microsoft Secure Score](/posts/secure-score-grc-part-0-intro/)**.

### Microsoft Defender for Cloud

**[Microsoft Defender for Cloud](https://learn.microsoft.com/en-us/azure/defender-for-cloud/)** is the big one most people confuse with the rest of the Defender family. It protects **cloud workloads** — Azure VMs, storage, containers, databases, Kubernetes clusters — and extends to AWS and Google Cloud. Completely separate portal (it lives in the Azure portal, not `security.microsoft.com`), completely separate licensing model (per resource, not per user).

We'll cover this properly in Part 3 of the series.

## The consumer app (brief mention for completeness)

If you're a subscriber to Microsoft 365 Personal or Family, you've probably seen a phone app simply called **Microsoft Defender**. It's a cross-device security app for your family's phones and laptops — identity-theft monitoring, VPN, basic device security. It's real, it's useful, and it's completely unrelated to everything else we've talked about. No overlap in licensing, portals, or audience. If someone in your family asks you "is Microsoft Defender good?", this is probably what they mean, and the answer is *yes, for personal use, it's fine*.

## The sanity check

So the next time someone says *"let's look at this in Defender"*, you now have a mental map to ask the right follow-up question:

- *Which part of the estate?* — tells you the workload (Endpoint, Office 365, Identity, Cloud Apps, IoT)
- *Cloud workloads or user devices?* — tells you whether we're in Defender XDR or Defender for Cloud
- *Looking at posture, or at an active incident?* — tells you whether we're in Exposure Management or Incidents
- *Is it a Microsoft-only view, or does it include third-party tools?* — tells you whether Sentinel is in play

That's it. That's the whole family. Eight core products, two close cousins, and one consumer app. You won't need all of them, but you should know they exist.

## One more thing — where does EMS fit?

If you've been around Microsoft licensing long enough, you've seen the phrase **Enterprise Mobility + Security (EMS)** in proposals, quotes, or old contracts. EMS is the identity + management + protection bundle that predates Microsoft 365 E3/E5 and is still actively sold — especially to organisations that don't need the full Microsoft 365 stack but do need the security and management layer on top of their existing productivity suite.

I've written a separate post on EMS E3 and EMS E5, what's actually in each, and when it's the right buy instead of (or alongside) Microsoft 365: **[Enterprise Mobility + Security Explained](/posts/enterprise-mobility-security-explained/)**.

## What's next

In **Part 2** we zoom into the four XDR workloads and look at how they actually correlate signals — with a real multi-stage attack example that walks through all four in sequence.

> 🔗 **Related deep-dive series:** If you're already comfortable with the Microsoft Defender landscape and want to see what's possible on top of it, start here: **[How We Built a Gold-Winning GRC Programme on Microsoft Secure Score](/posts/secure-score-grc-part-0-intro/)**.

Follow me on [LinkedIn](https://www.linkedin.com/in/dimosthenisatteia/) for new-post notifications, or subscribe via RSS at the top of the page.

## Microsoft Learn resources

- [Microsoft Defender products and services hub](https://learn.microsoft.com/en-us/defender/)
- [Microsoft Defender XDR overview](https://learn.microsoft.com/en-us/defender-xdr/microsoft-365-defender)
- [Microsoft Defender for Endpoint overview](https://learn.microsoft.com/en-us/defender-endpoint/microsoft-defender-endpoint)
- [Microsoft Defender for Office 365 overview](https://learn.microsoft.com/en-us/defender-office-365/mdo-about)
- [Microsoft Defender for Identity overview](https://learn.microsoft.com/en-us/defender-for-identity/what-is)
- [Microsoft Defender for Cloud Apps overview](https://learn.microsoft.com/en-us/defender-cloud-apps/what-is-defender-for-cloud-apps)
- [Microsoft Defender Vulnerability Management overview](https://learn.microsoft.com/en-us/defender-vulnerability-management/defender-vulnerability-management)
- [Microsoft Defender for IoT overview](https://learn.microsoft.com/en-us/defender-for-iot/microsoft-defender-iot)
- [Microsoft Sentinel overview](https://learn.microsoft.com/en-us/unified-secops-platform/overview-unified-security)
- [Microsoft Security Exposure Management overview](https://learn.microsoft.com/en-us/security-exposure-management/microsoft-security-exposure-management)
- [Microsoft Defender for Cloud overview](https://learn.microsoft.com/en-us/azure/defender-for-cloud/)

---

<!--
=========================================================
IMAGE PRODUCTION NOTES (delete before publish)
=========================================================

Image 1 — The Microsoft Defender family map (cover)
  Tool: PowerPoint or draw.io
  Layout option A (recommended): two concentric rings
    Inner ring (the 4 XDR workloads):
      - Microsoft Defender for Endpoint
      - Microsoft Defender for Office 365
      - Microsoft Defender for Identity
      - Microsoft Defender for Cloud Apps
    Outer ring (specialist / SecOps):
      - Microsoft Defender Vulnerability Management
      - Microsoft Defender for IoT
      - Microsoft Sentinel
    Centre label: "Microsoft Defender XDR"
    Side panel: "Close cousins" box with Exposure Management + Defender for Cloud
  Layout option B (simpler): clean grid of labelled boxes matching the post's structure
  Use official Microsoft product icons where possible (from the Defender portal
    or Microsoft Fluent icon set)
  Colours: Microsoft Fluent palette (#0078D4 primary, #50E6FF accent, #F3F2F1 card backgrounds)
  Format: PNG 1920×1080

TODO before publish:
  [ ] Build Image 1 (this is the single most important asset in the whole series — invest the time)
  [ ] Save to /static/images/posts/defender-demystified-part-1/
  [ ] Set cover.image in front matter
  [ ] Replace 📷 placeholder with inline ![alt](path) markdown
  [ ] Verify the link to /posts/secure-score-grc-part-0-intro/ resolves
  [ ] Confirm that the Microsoft Learn "hub" link in the opening paragraph still works
      (hub pages occasionally get reorganised)
=========================================================
-->
