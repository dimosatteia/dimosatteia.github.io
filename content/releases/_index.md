---
title: "Release Status"
description: "Track Microsoft 365 Security features by their release stage, Preview vs Generally Available"
summary: "Understanding the difference between Preview and Generally Available features helps security architects make informed deployment decisions in enterprise environments."
date: 2026-05-22
lastmod: 2026-05-22
draft: false
author: "Dimosthenis Atteia"
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

Microsoft 365 Security features roll out in two main phases, and understanding where a feature sits in its lifecycle is critical for making informed deployment decisions in enterprise environments.

## 🚧 Preview (Public Preview)

Features that are **available for testing** but **not recommended for production** environments. 

**Ideal for:**
- Lab and PoC environments where breaking changes are acceptable
- Early adopters who want to evaluate upcoming capabilities
- Providing feedback to Microsoft product teams during feature development
- Testing compatibility with your existing security stack

⚠️ **Important considerations:**
- Preview features may change significantly before GA
- No SLA or official support guarantees
- Features can be deprecated or retired without prior notice
- Limited or evolving documentation
- Not suitable for compliance-regulated workloads

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
- Covered by Microsoft's standard support agreements
- Stable feature set with predictable update cadence
- Integration points are documented and supported

---

## Why This Classification Matters

As a CISO or Security Architect operating real-world production environments, you need clear signals about feature maturity:

- **Risk management:** Preview features introduce unknown variables into your security posture
- **Compliance alignment:** Auditors and regulators expect production-grade controls with vendor support
- **Operational stability:** GA features won't change behavior unexpectedly during incident response
- **Resource planning:** You can commit training and runbook development to stable capabilities

This taxonomy helps you separate "what's possible in the lab" from "what's deployable in production", saving you from costly rollbacks and compliance headaches.

---

*Features are categorized based on their status at the time of writing. Always verify current release status in the [Microsoft 365 Roadmap](https://www.microsoft.com/en-us/microsoft-365/roadmap) before production deployment.*