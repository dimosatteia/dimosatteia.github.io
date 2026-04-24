---
title: "Microsoft Defender Demystified — Part 3: Microsoft Defender for Cloud (The One That's Actually Different)"
date: 2026-04-23T10:00:00+03:00
draft: true
author: "Dimosthenis"
description: "Microsoft Defender for Cloud is the one product in the Defender family most people confuse with Defender XDR — and the mistake is costly. Different portal, different licensing, different audience. A friendly, honest walk through what it is, how its two layers fit together, and which plans matter for Azure, AWS, and GCP workloads."
summary: "Part 3 of the Microsoft Defender Demystified series. Microsoft Defender for Cloud explained in plain language — the CSPM foundation, the paid Defender CSPM tier, the eleven workload protection plans, the multicloud story, and why the unified Microsoft Defender portal is quietly making all this one experience."
tags: ["microsoft-defender", "microsoft-defender-for-cloud", "azure", "cnapp", "cspm", "cwpp", "multicloud", "aws", "gcp", "security", "fundamentals"]
categories: ["Microsoft Defender", "Azure Security"]
series: ["Microsoft Defender Demystified"]
ShowToc: true
TocOpen: false
weight: 3
cover:
  image: "" # TODO: cover image — see Image 1 instructions (Microsoft Defender for Cloud overview in Azure portal)
  alt: "Microsoft Defender for Cloud — protecting Azure and multicloud workloads"
  caption: "Microsoft Defender Demystified — Part 3"
---

## Where we are so far

**[Part 1](/posts/defender-demystified-part-1-what-is-microsoft-defender/)** gave us the whole family map. **[Part 2](/posts/defender-demystified-part-2-four-workloads/)** went deep into the four core XDR workloads. Now we move to the product that Microsoft itself lists under a separate "Other content" heading on the [Microsoft Defender hub](https://learn.microsoft.com/en-us/defender/), and the one I see confused with everything else more often than any other: **[Microsoft Defender for Cloud](https://learn.microsoft.com/en-us/azure/defender-for-cloud/)**.

Let me say this clearly up front, because it's the single most expensive misunderstanding in Microsoft security conversations: **Microsoft Defender for Cloud is a different product from Microsoft Defender XDR.** Different portal. Different licensing. Different billing. Different audience.

Every Microsoft security professional will have this conversation at some point, usually with someone holding an invoice. Let me save you from being that person.

## What makes Microsoft Defender for Cloud different

> 📷 **Image 1 — The Microsoft Defender for Cloud overview page in the Azure portal.**
> *Capture from `portal.azure.com` → search "Defender for Cloud" → Overview. Show the security posture cards (Secure Score, Recommendations, Alerts, Inventory). This is literally a different portal from the one we've been touring, and that's the point. Format: 16:9, full-width. Redact subscription names if sensitive.*

Everything in **Part 2** lived at `security.microsoft.com` and was licensed **per user** as part of a **Microsoft 365** plan. Microsoft Defender for Cloud lives in the **Azure portal** at `portal.azure.com` and is licensed **per resource** — per VM, per storage account, per database — as part of your **Azure consumption**.

Your Microsoft 365 E5 license does not give you Microsoft Defender for Cloud entitlement. Your Microsoft Defender for Cloud subscription does not give you Microsoft 365 Defender entitlement. These are two genuinely separate products that happen to share a brand.

What they protect is also different. The four workloads in Part 2 protect **user-facing surfaces** — devices, email, identities, SaaS. Microsoft Defender for Cloud protects **infrastructure** — the VMs, containers, databases, storage, and increasingly the AI services that run your applications. Different problem, different tool.

Microsoft calls this category a **CNAPP** — Cloud Native Application Protection Platform — which is an industry term for a single product that combines several cloud-security disciplines:

- **CSPM** — Cloud Security Posture Management — finding misconfigurations before attackers do
- **CWPP** — Cloud Workload Protection — runtime threat detection for workloads
- **DevSecOps** — pulling security earlier into the development process
- **CIEM** — Cloud Infrastructure Entitlement Management — managing permissions across cloud resources

You don't need to remember the acronyms. What you do need to remember is the **two-layer structure** Microsoft Defender for Cloud is sold in. That's the practical bit.

## Layer 1 — CSPM, the posture layer

The first thing Microsoft Defender for Cloud does, the moment you onboard an Azure subscription, an AWS account, or a GCP project, is **assess your posture** against a security baseline. This is the CSPM layer. It comes in two tiers.

### Foundational CSPM — free, automatic, multicloud

Every onboarded environment gets **[Foundational CSPM](https://learn.microsoft.com/en-us/azure/defender-for-cloud/concept-cloud-security-posture-management)** at no cost. What you get:

- **Asset inventory** across Azure, AWS, and GCP
- Continuous **security recommendations** based on the **[Microsoft Cloud Security Benchmark](https://learn.microsoft.com/en-us/security/benchmark/azure/introduction)**
- A **Secure Score** — the cloud-infrastructure equivalent of the Microsoft 365 Secure Score I've written about in the [Gold-winning GRC series](/posts/secure-score-grc-part-0-intro/)
- **Regulatory compliance** dashboards mapped to standards like ISO 27001, NIST CSF, PCI DSS, and GDPR

This alone is worth turning on. It's free, it takes minutes, and within a few hours you'll have a clearer picture of your cloud estate than most organisations ever build.

If your company has any presence in Azure, AWS, or GCP — even a single subscription someone spun up for a side project that nobody remembers — turn on Foundational CSPM today. It will tell you things you didn't know and cost you nothing.

> 📷 **Image 2 — The Microsoft Cloud Security Benchmark recommendations view.**
> *Capture from: Defender for Cloud → Recommendations. Show the list grouped by control with severity visible. Crop to 8–12 rows. This is what readers will see within minutes of turning it on.*

### Defender CSPM — the paid tier

If you want **proactive, attacker-perspective** analysis — which is a real upgrade over reactive recommendation lists — you enable the paid **Defender CSPM** plan. What the paid tier adds:

- **Agentless vulnerability scanning** of your VMs and container images (no agent to install, no performance overhead)
- **Attack path analysis** — Microsoft graphs your cloud estate and shows you the actual paths an attacker could take to reach your sensitive data, which is a genuinely different way of thinking about risk
- **Cloud Security Explorer** — a queryable knowledge graph of your cloud environment
- **Sensitive data discovery** across storage and databases
- **AI security posture management** for organisations running generative AI workloads
- **DevOps security** with pull-request annotations and code-to-cloud mapping

Approximate pricing is around **$5 per billable resource per month**, billed on Servers, Databases, Storage accounts, and Serverless resources. Use the **[official pricing calculator](https://azure.microsoft.com/en-us/pricing/details/defender-for-cloud/)** before enabling — costs scale with your estate.

## Layer 2 — CWPP, the workload protection plans

Where CSPM tells you *"this VM is misconfigured"*, **CWPP tells you "this VM is being attacked right now."** That's an important distinction.

Workload protection isn't one plan — it's **separate plans per resource type**, each enabled independently, each with its own pricing and threat-detection capabilities. As of 2026, the Microsoft Defender for Cloud hub on Microsoft Learn lists these:

- **Microsoft Defender for Servers** — Windows and Linux VMs, on-premises and multicloud. Plan 2 includes the full Microsoft Defender for Endpoint agent on every protected VM, which is a genuine bonus if you're already in that ecosystem.
- **Microsoft Defender for Containers** — Kubernetes (AKS, EKS, GKE) clusters and container registries
- **Microsoft Defender for Storage** — Azure Storage accounts (blob, file, queue)
- **Microsoft Defender for SQL** — SQL Server on VMs and Azure SQL PaaS
- **Microsoft Defender for open-source relational databases** — PostgreSQL, MySQL, MariaDB, Cosmos DB
- **Microsoft Defender for App Service** — Azure App Service web apps
- **Microsoft Defender for Key Vault** — Azure Key Vault
- **Microsoft Defender for Resource Manager** — the Azure control plane itself
- **Microsoft Defender for DNS** — suspicious DNS activity from Azure resources
- **Microsoft Defender for APIs** — Azure API Management endpoints
- **Microsoft Defender for AI Services** — Azure OpenAI and Azure AI Services workloads (this one is newer and will only get more important)

> 📷 **Image 3 — The Environment settings page showing enabled plans.**
> *Capture from: Defender for Cloud → Environment settings → select a subscription → Defender plans. Show the toggles for each plan with per-resource pricing visible. Redact subscription name.*

Each plan turns on additional Microsoft-curated detections specific to that resource type. You enable only what you need. A startup with 10 VMs and a storage account might enable just **Microsoft Defender for Servers** Plan 2 and **Microsoft Defender for Storage**. A large bank running hundreds of databases and a Kubernetes platform will enable nearly everything.

## The multicloud story

Microsoft Defender for Cloud is genuinely multicloud. Onboarding an **AWS account** or a **GCP project** takes minutes through native connectors — an IAM role in AWS, a service account in GCP, and you're done.

Once connected, Foundational CSPM runs immediately across the multicloud estate. The paid tier and most CWPP plans — especially Microsoft Defender for Servers and Microsoft Defender for Containers — extend natively to AWS and GCP. The same Microsoft platform that protects your Azure resources can protect your Linux VM in EC2 and your GKE cluster in Google Cloud.

This matters more every year, because most organisations don't actually live on a single cloud, even when they think they do. Run a quick inventory. You'll find AWS accounts in a subsidiary, a GCP project someone set up for a data science experiment in 2023, maybe a Digital Ocean instance running a marketing landing page. **NIS2** and **DORA** reporting obligations don't care which cloud the workload runs on — they care that the workload is monitored and that incidents are reported on time.

> 📷 **Image 4 — Multicloud environment view in Microsoft Defender for Cloud.**
> *Capture from: Defender for Cloud → Environment settings. Show Azure subscriptions plus at least one AWS or GCP connector. If you only have Azure, capture the "Add environment" view showing AWS / GCP / Azure / On-premises options — it still makes the multicloud point.*

## How this flows back into the unified Microsoft Defender portal

Until recently, the boundary was hard. Microsoft Defender for Cloud lived in Azure; Microsoft Defender XDR lived in Microsoft 365. SOC teams had to switch contexts, which is exactly the kind of friction that leads to missed incidents.

That's changing, and it's one of the more significant Microsoft Security improvements of the last two years.

Microsoft has integrated Microsoft Defender for Cloud signals **directly into the unified Microsoft Defender portal** at `security.microsoft.com`. Cloud incidents now appear in the same incident queue as your Microsoft 365 incidents, correlated against identity and email signals, surfaced in the same unified SecOps experience.

Practically, this means an attack that starts with a phishing email (**Microsoft Defender for Office 365**), pivots through a compromised laptop (**Microsoft Defender for Endpoint**), then targets an Azure VM (**Microsoft Defender for Servers** in Microsoft Defender for Cloud) is now a **single incident**. Not two products' worth of disconnected alerts in different consoles. One story, one timeline, one response workflow.

The CNAPP vision Microsoft has been talking about for years is finally a single operational experience. It's taken a while, but it's here.

> 📷 **Image 5 — A Defender for Cloud incident inside the unified Defender portal.**
> *Capture from security.microsoft.com → Investigation & response → Incidents. Find an incident sourced from Defender for Cloud. Show the cloud workload context inside the unified incident view. Redact resource names, IPs, user names. Pick the cleanest example — this image proves the integration claim.*

## A simple "do I need this?" check

- **Any Azure subscriptions at all?** Turn on Foundational CSPM today. It's free.
- **Production workloads in Azure, AWS, or GCP?** Evaluate the relevant CWPP plans.
- **ISO 27001 or NIS2 obligations covering cloud workloads?** At minimum you probably want Foundational CSPM plus Microsoft Defender for Servers plus Microsoft Defender for Storage.
- **Multicloud, single-pane-of-glass requirement?** This is one of the few products that credibly delivers end-to-end.
- **Zero cloud presence, fully on-premises?** You don't need this right now. Focus on Microsoft Defender XDR for your endpoints, email, identity, and SaaS.

The specific licensing decisions — which plan, for which resource, at which budget — are what we'll work through in **Part 4**.

## What's next

In **Part 4** we tackle the question most readers actually arrived with: *"Which Microsoft Defender do I need, and which plan should I buy?"* A practical decoder with three real scenarios.

> 🔗 **Related deep-dive series:** Curious how the Microsoft Cloud Security Benchmark approach — continuous assessment against a maintained control catalogue — can be turned into a full GRC programme at the Microsoft 365 layer? Read [How We Built a Gold-Winning GRC Programme on Microsoft Secure Score](/posts/secure-score-grc-part-0-intro/).

Follow me on [LinkedIn](https://www.linkedin.com/in/dimosthenisatteia/) for new-post notifications, or subscribe via RSS at the top of the page.

## Microsoft Learn resources

- [Microsoft Defender for Cloud overview](https://learn.microsoft.com/en-us/azure/defender-for-cloud/)
- [Cloud Security Posture Management in Defender for Cloud](https://learn.microsoft.com/en-us/azure/defender-for-cloud/concept-cloud-security-posture-management)
- [Microsoft Cloud Security Benchmark](https://learn.microsoft.com/en-us/security/benchmark/azure/introduction)
- [Microsoft Defender for Servers](https://learn.microsoft.com/en-us/azure/defender-for-cloud/defender-for-servers-introduction)
- [Microsoft Defender for Storage](https://learn.microsoft.com/en-us/azure/defender-for-cloud/defender-for-storage-introduction)
- [Microsoft Defender for Containers](https://learn.microsoft.com/en-us/azure/defender-for-cloud/defender-for-containers-introduction)
- [Connect AWS accounts to Microsoft Defender for Cloud](https://learn.microsoft.com/en-us/azure/defender-for-cloud/quickstart-onboard-aws)
- [Connect GCP projects to Microsoft Defender for Cloud](https://learn.microsoft.com/en-us/azure/defender-for-cloud/quickstart-onboard-gcp)
- [Microsoft Defender for Cloud pricing](https://azure.microsoft.com/en-us/pricing/details/defender-for-cloud/)

---

<!--
=========================================================
IMAGE PRODUCTION NOTES (delete before publish)
=========================================================

Image 1 — Defender for Cloud overview in Azure portal (cover)
  Source: portal.azure.com → search "Defender for Cloud" → Overview
  Capture: overview page with security posture cards
  Format: 16:9, full-width
  Redaction: subscription names, score numbers if sensitive

Image 2 — Microsoft Cloud Security Benchmark recommendations
  Source: Defender for Cloud → Recommendations
  Crop: 8–12 rows grouped by control with severity column
  Redaction: resource names

Image 3 — Environment settings showing enabled plans
  Source: Defender for Cloud → Environment settings → subscription → Defender plans
  Capture: table of plans with toggles and per-resource pricing
  Redaction: subscription name

Image 4 — Multicloud environment view
  Source: Defender for Cloud → Environment settings
  Show: Azure plus AWS/GCP connectors ideally
  Fallback: "Add environment" view showing AWS / GCP / Azure / On-premises options

Image 5 — Defender for Cloud incident in unified Defender portal
  Source: security.microsoft.com → Investigation & response → Incidents
  Filter for an incident sourced from Defender for Cloud
  Capture: unified incident view with cloud workload context
  Redaction: resource names, IPs, user names

TODO before publish:
  [ ] Capture the 5 images
  [ ] Save to /static/images/posts/defender-demystified-part-3/
  [ ] Replace 📷 placeholders with inline ![alt](path) markdown
  [ ] Verify all internal links resolve
  [ ] If you don't have Defender for Cloud in production, consider spinning up
      a free Azure trial subscription ($200 credit) and enabling Foundational
      CSPM — it's free, takes ~15 minutes, and gives you clean screenshots
      without redaction issues
=========================================================
-->
