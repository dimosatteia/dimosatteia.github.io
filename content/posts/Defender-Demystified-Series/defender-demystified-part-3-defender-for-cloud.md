---
title: "Microsoft Defender Part 3: Microsoft Defender for Cloud (The One That's Actually Different)"
date: 2026-07-10T10:51:00+03:00
lastmod: 2026-07-25T20:07:00+03:00
draft: false
keywords:
  - Microsoft Defender for Cloud vs Defender XDR
  - what is Microsoft Defender for Cloud
  - Defender for Cloud licensing explained
  - Foundational CSPM vs Defender CSPM
  - Defender for Cloud pricing per resource
  - Microsoft CNAPP explained
  - Defender for Cloud workload protection plans
  - Defender for Cloud AWS GCP multicloud
  - is Microsoft Defender for Cloud free
  - Defender for Cloud unified Defender portal
tags:
  - Microsoft Defender for Cloud
  - Microsoft Defender XDR
  - Azure Security
  - CSPM
  - CWPP
  - CNAPP
  - Cloud Security Posture Management
  - Multicloud Security
  - Microsoft 365 Security
  - Cyber GRC
  - NIS2
  - ISO 27001
author: "Dimosthenis Atteia"
description: "Microsoft Defender for Cloud vs Defender XDR: different portal, licensing, and audience. CSPM tiers, workload protection plans, and multicloud explained."
summary: "Part 3 of the Microsoft Defender Demystified series. Microsoft Defender for Cloud explained in plain language, the CSPM foundation, the paid Defender CSPM tier, the workload protection plans, the multicloud story, and why the unified Microsoft Defender portal is quietly making all this one experience."
categories: ["Microsoft Defender", "Azure Security"]
series: ["Microsoft Defender Demystified"]
ShowToc: true
TocOpen: false
weight: 3
cover:
  image: "/images/DefenderDemystified/MSDef.png"
  alt: "Microsoft Defender for Cloud — protecting Azure and multicloud workloads"
  caption: "Microsoft Defender Demystified — Part 3"
---

## Where we are so far

**[Part 1](/posts/defender-demystified-series/defender-demystified-part-1-what-is-microsoft-defender/)** gave us the whole family map. **[Part 2](/posts/defender-demystified-series/defender-demystified-part-2-four-workloads/)** went deep into the four core XDR workloads. Now we move to the product that Microsoft itself documents separately from the rest of the Defender family on the [Microsoft Defender hub](https://learn.microsoft.com/en-us/defender/), and the one I see confused with everything else more often than any other: **[Microsoft Defender for Cloud](https://learn.microsoft.com/en-us/azure/defender-for-cloud/)**.

Let me say this clearly up front, because it's the single most expensive misunderstanding in Microsoft security conversations: **Microsoft Defender for Cloud is a different product from Microsoft Defender XDR.** Different portal. Different licensing. Different billing. Different audience.

Every Microsoft security professional will have this conversation at some point, usually with someone holding an invoice. Let me save you from being that person.

## Microsoft Defender for Cloud vs Microsoft Defender XDR: what's different

{{< figure
    src="/images/DefenderDemystified/microsoft-defender-for-cloud-overview-azure-portal.png"
    link="/images/DefenderDemystified/microsoft-defender-for-cloud-overview-azure-portal.png"
    target="_blank"
    alt="Microsoft Defender for Cloud overview dashboard in the Azure portal showing secure score, recommendations and security alerts"
    caption="📷 **Image 1: The Microsoft Defender for Cloud overview in the Azure portal. A different portal from Microsoft Defender XDR at security.microsoft.com.**"
    loading="lazy"
>}}

Everything in **Part 2** lived at `security.microsoft.com` and was licensed **per user** as part of a **Microsoft 365** plan. Microsoft Defender for Cloud lives in the **Azure portal** at `portal.azure.com` and is licensed **per resource** (per VM, per storage account, per database) as part of your **Azure consumption**.

Your Microsoft 365 E5 license does not give you Microsoft Defender for Cloud entitlement. Your Microsoft Defender for Cloud subscription does not give you Microsoft Defender XDR entitlement. These are two genuinely separate products that happen to share a brand.

What they protect is also different. The four workloads in Part 2 protect **user-facing surfaces**, devices, email, identities, SaaS. Microsoft Defender for Cloud protects **infrastructure** like the VMs, containers, databases, storage, and increasingly the AI services that run your applications. Different problem, different tool.

Microsoft calls this category a **CNAPP** aka Cloud Native Application Protection Platform, which is an industry term for a single product that combines several cloud-security disciplines:

- **CSPM** is Cloud Security Posture Management: finding misconfigurations before attackers do
- **CWPP** is Cloud Workload Protection: runtime threat detection for workloads
- **DevSecOps**: pulling security earlier into the development process
- **CIEM** is Cloud Infrastructure Entitlement Management: managing permissions across cloud resources

You don't need to remember the acronyms. What you do need to remember is the **two-layer structure** Microsoft Defender for Cloud is sold in. That's the practical bit.

## Layer 1: CSPM, the posture layer

The first thing Microsoft Defender for Cloud does, the moment you onboard an Azure subscription, an AWS account, or a GCP project, is **assess your posture** against a security baseline. This is the CSPM layer. It comes in two tiers.

### Foundational CSPM: Free, Automatic, Multicloud

Every onboarded environment gets **[Foundational CSPM](https://learn.microsoft.com/en-us/azure/defender-for-cloud/concept-cloud-security-posture-management)** at no cost. What you get:

- **Asset inventory** across Azure, AWS, and GCP
- Continuous **security recommendations** based on the **[Microsoft Cloud Security Benchmark](https://learn.microsoft.com/en-us/security/benchmark/azure/introduction)**
- A **Secure Score**: the cloud-infrastructure equivalent of the Microsoft 365 Secure Score I've written about in the [Gold-winning GRC series](/posts/secure-score-grc-part-0-intro/)
- **Regulatory compliance** assessment against the Microsoft Cloud Security Benchmark itself, note that adding *additional* standards like ISO 27001, NIST CSF, or PCI DSS to the compliance dashboard requires the paid **Defender CSPM** plan (a detail that surprises many people, so plan for it if compliance dashboards are your goal)

This alone is worth turning on. It's free, it takes minutes, and within a few hours you'll have a clearer picture of your cloud estate than most organisations ever build.

If your company has any presence in Azure, AWS, or GCP (even a single subscription someone spun up for a side project that nobody remembers) turn on Foundational CSPM today. It will tell you things you didn't know and cost you nothing.

{{< figure
    src="/images/DefenderDemystified/defender-for-cloud-security-recommendations-mcsb.png"
    link="/images/DefenderDemystified/defender-for-cloud-security-recommendations-mcsb.png"
    target="_blank"
    alt="Microsoft Defender for Cloud security recommendations based on the Microsoft Cloud Security Benchmark with risk levels"
    caption="📷 **Image 2: The Microsoft Cloud Security Benchmark recommendations view.**"
    loading="lazy"
>}}

### Defender CSPM: The paid tier

If you want **proactive, attacker-perspective** analysis, which is a real upgrade over reactive recommendation lists, you enable the paid **Defender CSPM** plan. What the paid tier adds:

- **Agentless vulnerability scanning** of your VMs and container images (no agent to install, no performance overhead)
- **Attack path analysis**: Microsoft graphs your cloud estate and shows you the actual paths an attacker could take to reach your sensitive data, which is a genuinely different way of thinking about risk
- **Cloud Security Explorer**: a queryable knowledge graph of your cloud environment
- **Sensitive data discovery** across storage and databases
- **Regulatory compliance dashboards** for standards beyond the MCSB, ISO 27001, NIST CSF, PCI DSS, CIS Benchmarks, and more
- **AI security posture management** for organisations running generative AI workloads
- **DevOps security** with pull-request annotations and code-to-cloud mapping

Approximate pricing is around **$5 per billable resource per month** (list price $5.11 at the time of writing), billed on Compute, Databases, Storage, and (since April 2026) Serverless resources. Use the **[official pricing calculator](https://azure.microsoft.com/en-us/pricing/details/defender-for-cloud/)** before enabling, costs scale with your estate.

## Layer 2: CWPP, the workload protection plans

Where CSPM tells you *"this VM is misconfigured"*, **CWPP tells you "this VM is being attacked right now."** That's an important distinction.

Workload protection isn't one plan, it's **separate plans per resource type**, each enabled independently, each with its own pricing and threat-detection capabilities. As of mid-2026, these are the plans you'll find in your Environment settings:

- **Microsoft Defender for Servers**: Windows and Linux VMs, on-premises and multicloud. Plan 2 includes the full Microsoft Defender for Endpoint agent on every protected VM, which is a genuine bonus if you're already in that ecosystem. It also bundles DNS threat detection, the old standalone **Microsoft Defender for DNS** plan was retired for new subscriptions back in August 2023 and lives on inside Plan 2.
- **Microsoft Defender for Containers**: Kubernetes (AKS, EKS, GKE) clusters and container registries
- **Microsoft Defender for Storage**: Azure Blob Storage, Azure Files, and Azure Data Lake Storage Gen2 (note: queues and tables are not covered), including on-upload malware scanning
- **Microsoft Defender for SQL**: technically two plans: one for Azure SQL PaaS (Azure SQL Database, Managed Instance, elastic pools, Synapse dedicated pools) and one for SQL Server on machines, Azure or Arc-enabled
- **Microsoft Defender for open-source relational databases**: PostgreSQL, MySQL, MariaDB on Azure PaaS, and (generally available since June 2026) AWS RDS instances including Aurora PostgreSQL and Aurora MySQL
- **Microsoft Defender for Azure Cosmos DB**: Microsoft's NoSQL database gets its own dedicated plan (it's neither open-source nor relational, so don't look for it in the plan above)
- **Microsoft Defender for App Service**: Azure App Service web apps
- **Microsoft Defender for Key Vault**: Azure Key Vault
- **Microsoft Defender for Resource Manager**: the Azure control plane itself
- **Microsoft Defender for APIs**: Azure API Management endpoints
- **Microsoft Defender for AI Services**: Azure OpenAI and Azure AI Services workloads (this one is newer and will only get more important)

{{< figure
    src="/images/DefenderDemystified/defender-for-cloud-plans-pricing-environment-settings.png"
    link="/images/DefenderDemystified/defender-for-cloud-plans-pricing-environment-settings.png"
    target="_blank"
    alt="Defender for Cloud environment settings showing Defender CSPM and workload protection plans with per-resource pricing toggles"
    caption="📷 **Image 3: The Environment settings page showing enabled plans.**"
    loading="lazy"
>}}

Each plan turns on additional Microsoft-curated detections specific to that resource type. You enable only what you need. A startup with 10 VMs and a storage account might enable just **Microsoft Defender for Servers** Plan 2 and **Microsoft Defender for Storage**. A large bank running hundreds of databases and a Kubernetes platform will enable nearly everything.

## The multicloud story

Microsoft Defender for Cloud is genuinely multicloud. Onboarding an **AWS account** or a **GCP project** takes minutes through native connectors, an IAM role in AWS, a service account in GCP, and you're done.

Once connected, Foundational CSPM runs immediately across the multicloud estate. The paid tier and most CWPP plans (especially Microsoft Defender for Servers and Microsoft Defender for Containers) extend natively to AWS and GCP. The same Microsoft platform that protects your Azure resources can protect your Linux VM in EC2 and your GKE cluster in Google Cloud.

This matters more every year, because most organisations don't actually live on a single cloud, even when they think they do. Run a quick inventory. You'll find AWS accounts in a subsidiary, a GCP project someone set up for a data science experiment in 2023, maybe a Digital Ocean instance running a marketing landing page. **NIS2** and **DORA** reporting obligations don't care which cloud the workload runs on, they care that the workload is monitored and that incidents are reported on time.

{{< figure
    src="/images/DefenderDemystified/defender-for-cloud-multicloud-aws-gcp-connectors.png"
    link="/images/DefenderDemystified/defender-for-cloud-multicloud-aws-gcp-connectors.png"
    target="_blank"
    alt="Adding AWS and GCP environments to Microsoft Defender for Cloud through native multicloud connectors"
    caption="📷 **Image 4: Multicloud environment view in Microsoft Defender for Cloud.**"
    loading="lazy"
>}}

## How this flows back into the unified Microsoft Defender portal

Until recently, the boundary was hard. Microsoft Defender for Cloud lived in Azure; Microsoft Defender XDR lived in Microsoft 365. SOC teams had to switch contexts, which is exactly the kind of friction that leads to missed incidents.

That's changing, and it's one of the more significant Microsoft Security improvements of the last two years.

Microsoft has integrated Microsoft Defender for Cloud signals **directly into the unified Microsoft Defender portal** at `security.microsoft.com`. Cloud incidents now appear in the same incident queue as your Microsoft 365 incidents, correlated against identity and email signals, surfaced in the same unified SecOps experience.

Practically, this means an attack that starts with a phishing email (**Microsoft Defender for Office 365**), pivots through a compromised laptop (**Microsoft Defender for Endpoint**), then targets an Azure VM (**Microsoft Defender for Servers** in Microsoft Defender for Cloud) is now a **single incident**. Not two products' worth of disconnected alerts in different consoles. One story, one timeline, one response workflow.

The CNAPP vision Microsoft has been talking about for years is finally a single operational experience. It's taken a while, but it's here.

{{< figure
    src="/images/DefenderDemystified/defender-for-cloud-incident-unified-defender-portal.png"
    link="/images/DefenderDemystified/defender-for-cloud-incident-unified-defender-portal.png"
    target="_blank"
    alt="Microsoft Defender for Cloud incident displayed in the unified Microsoft Defender portal incident queue at security.microsoft.com"
    caption="📷 **Image 5: A Defender for Cloud incident inside the unified Defender portal.**"
    loading="lazy"
>}}

## Do I need Microsoft Defender for Cloud? A quick checklist

- **Any Azure subscriptions at all?** Turn on Foundational CSPM today. It's free.
- **Production workloads in Azure, AWS, or GCP?** Evaluate the relevant CWPP plans.
- **ISO 27001 or NIS2 obligations covering cloud workloads?** At minimum you probably want Foundational CSPM plus Microsoft Defender for Servers plus Microsoft Defender for Storage.
- **Multicloud, single-pane-of-glass requirement?** This is one of the few products that credibly delivers end-to-end.
- **Zero cloud presence, fully on-premises?** You don't need this right now. Focus on Microsoft Defender XDR for your endpoints, email, identity, and SaaS.

The specific licensing decisions (which plan, for which resource, at which budget) are what we'll work through in **Part 4**.

## What's next

In **Part 4** we tackle the question most readers actually arrived with: *"Which Microsoft Defender do I need, and which plan should I buy?"* A practical decoder with three real scenarios.

> 🔗 **Related deep-dive series:** Curious how the Microsoft Cloud Security Benchmark approach (continuous assessment against a maintained control catalogue) can be turned into a full GRC programme at the Microsoft 365 layer? Read [How We Built a Gold-Winning GRC Programme on Microsoft Secure Score](/posts/secure-score-grc-part-0-intro/).

Follow me on [LinkedIn](https://www.linkedin.com/in/dimosthenisatteia/) for new-post notifications, or subscribe via RSS at the top of the page.

## Frequently asked questions

**Is Microsoft Defender for Cloud free?**
Partially. Foundational CSPM (asset inventory, security recommendations, Secure Score, and assessment against the Microsoft Cloud Security Benchmark) is free on every onboarded subscription. The Defender CSPM plan and all workload protection plans are paid, billed per resource through Azure consumption.

**Is Microsoft Defender for Cloud included in Microsoft 365 E5?**
No. Microsoft 365 E5 includes the Defender XDR workloads (Endpoint, Office 365, Identity, Cloud Apps), which are licensed per user. Microsoft Defender for Cloud is licensed per resource through your Azure subscription and is a separate purchase.

**Does Microsoft Defender for Cloud work with AWS and GCP?**
Yes. Native connectors onboard AWS accounts and GCP projects in minutes, and both the CSPM layers and the main workload protection plans (Servers, Containers, and open-source relational databases) extend to AWS and GCP resources.

**What is the difference between Defender for Cloud and Defender XDR?**
Defender XDR protects user-facing surfaces (devices, email, identities, SaaS apps), lives at security.microsoft.com, and is licensed per user. Defender for Cloud protects infrastructure (VMs, containers, databases, storage, AI services), is managed from the Azure portal, and is licensed per resource, though its incidents now surface in the unified Defender portal too.

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