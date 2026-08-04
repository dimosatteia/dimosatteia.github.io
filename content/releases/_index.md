---
title: "Release Status"
description: "Track Microsoft 365 Security features by their release stage: Preview vs Generally Available"
summary: "Understanding the difference between Preview and Generally Available features helps security architects make informed deployment decisions in enterprise environments."
date: 2026-05-22T11:00:00+03:00
lastmod: 2026-08-04T10:50:00+03:00
draft: false
tags:
  - "Microsoft 365"
  - "Feature Lifecycle"
  - "Security Operations"
  - "Deployment Strategy"
keywords:
  - Microsoft 365 Preview
  - Generally Available
  - GA features
  - Public Preview
  - Production deployment
  - Security feature lifecycle
  - Microsoft 365 roadmap
author: "Dimosthenis Atteia"
categories:
  - "Microsoft 365"
ShowToc: true
TocOpen: false
ShowReadingTime: true
ShowBreadCrumbs: true
ShowPostNavLinks: false
ShowWordCount: false
ShowRssButtonInSectionTermList: true
---

Microsoft 365 features roll out in multiple phases, and understanding where a feature sits in its lifecycle is critical for making informed deployment decisions in enterprise environments.

## 🆕 New Feature (Announced / In Development)

Features that have been **announced on the Microsoft 365 Roadmap** but are **not yet available** for testing or use in any tenant.

**Typical roadmap status:**
- **In development:** Microsoft has committed to building the feature; no confirmed release date
- **Rolling out:** feature is being progressively enabled tenant-by-tenant, ahead of formal Preview or GA availability

⚠️ **Important considerations:**
- **No availability yet:** cannot be tested, piloted, or evaluated against your security stack until it reaches Preview
- **No timeline guarantee:** Microsoft can delay, redesign, or cancel roadmap items without prior notice
- **Not audit-relevant:** cannot be cited as a compensating or planned control in ISO 27001 / NIS2 documentation until it is at least in Preview
- **Useful for:** early risk and licensing forecasting, vendor-management conversations, and flagging upcoming changes to stakeholders
- Track via the **Microsoft 365 Roadmap ID** for change-management traceability once the feature is announced

## 🚧 Preview (Public Preview)

Features that are **available for testing** but **not recommended for production** environments.

**Ideal for:**
- Lab and PoC environments where breaking changes are acceptable
- Early adopters who want to evaluate upcoming capabilities
- Providing feedback to Microsoft product teams during feature development
- Testing compatibility with your existing security stack

⚠️ **Important considerations:**
- Preview features may change significantly before GA
- **No SLA coverage:** Microsoft explicitly states Preview features are provided "as-is" without service level agreements
- Features can be deprecated or retired without prior notice
- Limited or evolving documentation
- **Not suitable for compliance-regulated workloads** or production environments
- May require separate tenant or opt-in enrollment

## ✅ Generally Available (GA)

Features that are **production-ready** and officially supported by Microsoft with full SLA coverage.

**Suitable for:**
- Enterprise production environments
- Compliance-driven infrastructures (NIS2, ISO 27001, SOC 2)
- Mission-critical workloads requiring stability and support
- Organizations with strict change control processes

**What GA means in practice:**
- Features have completed extensive testing cycles
- Full documentation and official support channels available
- **Covered by Microsoft's service level agreements (SLAs)**
- Stable feature set with predictable update cadence
- Integration points are documented and supported
- **Included in standard licensing** (unless specified as premium add-on)

## Additional Release Stages You May Encounter

Microsoft also uses these intermediate stages:

- **Private Preview:** Invitation-only, NDA-protected early access
- **Targeted Release:** First Release in production for select customers (Office 365)
- **Standard Release:** Same as Generally Available

## Why This Classification Matters

As a CISO or Security Architect operating real-world production environments, you need clear signals about feature maturity:

- **Risk management:** Preview features introduce unknown variables into your security posture
- **Compliance alignment:** Auditors and regulators expect production-grade controls with vendor support and SLAs
- **Operational stability:** GA features won't change behavior unexpectedly during incident response
- **Resource planning:** You can commit training and runbook development to stable capabilities
- **Licensing considerations:** Some Preview features become paid add-ons at GA

This taxonomy helps you separate "what's possible in the lab" from "what's deployable in production", saving you from costly rollbacks and compliance headaches.

---

**Important:** Features are categorized based on their status at the time of writing. Microsoft can change release stages without notice. Always verify current release status in the [Microsoft 365 Roadmap](https://www.microsoft.com/en-us/microsoft-365/roadmap) and official [Microsoft 365 Message Center](https://admin.microsoft.com/Adminportal/Home#/MessageCenter) before production deployment.

**Learn more:**
- [Microsoft 365 Public Roadmap](https://www.microsoft.com/en-us/microsoft-365/roadmap)
- [Microsoft Product Lifecycle](https://learn.microsoft.com/en-us/lifecycle/products/)
- [Service Level Agreements (SLA) for Online Services](https://www.microsoft.com/licensing/docs/view/Service-Level-Agreements-SLA-for-Online-Services)