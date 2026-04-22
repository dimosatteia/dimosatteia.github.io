---
title: "Microsoft Security Copilot in Production — Part 1: Architecture & Licensing You Need to Understand First"
date: 2026-04-22T11:00:00+03:00
draft: false
author: "Dimosthenis"
description: "Before you turn on Microsoft Security Copilot, understand what you're actually buying, how it integrates with the Defender stack, and where it can quietly cost you money."
summary: "Part 1 of the Security Copilot in Production series. Architecture, SCU pricing model, plugin model, and the governance decisions you should make before pilot."
categories:
  - "Microsoft Security Copilot"
  - "Microsoft 365"
tags:
  - "Security Copilot"
  - "Architecture"
  - "Licensing"
  - "Defender XDR"
series:
  - "Security Copilot in Production"
ShowToc: true
TocOpen: true
cover:
  hidden: true
---

> **This is part 1 of a multi-part series.** The full series will cover
> architecture, prompt engineering, plugin development, KQL integration,
> cost management, and governance. Bookmark the
> [series page](/series/security-copilot-in-production/) to follow along.

## TL;DR

- Security Copilot is **not** a SKU you assign to a user. It's a
  **capacity-based service** billed in Security Compute Units (SCUs).
- One SCU costs roughly **$4/hour** and you provision a minimum of 1
  SCU to start. That's ~$2,920/month at a single SCU minimum, before
  any usage scaling.
- Copilot pulls context from your **plugins** — Defender XDR, Sentinel,
  Intune, Entra, and third-party. **What you connect determines what
  it can answer.**
- It runs in **two surfaces**: the standalone portal
  (`securitycopilot.microsoft.com`) and **embedded experiences** inside
  Defender XDR, Intune, Entra, and Purview.
- Before pilot, decide three things: **who can prompt it, what data
  plugins it can see, and how you'll measure value**.

---

## What Security Copilot actually is

Security Copilot is Microsoft's GenAI assistant for security operations,
built on top of OpenAI models combined with Microsoft's threat
intelligence and your own tenant data via plugins.

The mental model that helps most people:

- It is **not** a chatbot bolted onto Defender.
- It is **not** an autonomous SOC analyst.
- It **is** a reasoning layer that can take natural-language questions,
  call your security tools as plugins, and stitch together answers
  across products that historically required you to pivot between five
  portals.

The three things it does well today:

1. **Incident summarisation** — turning a 40-alert incident into a
   readable narrative with attack chain, blast radius, and recommended
   actions.
2. **KQL generation and explanation** — writing hunting queries from
   plain English, and explaining queries you inherited.
3. **Cross-product context** — joining a Defender XDR alert with the
   relevant Entra sign-in logs, the Intune device compliance state,
   and the Sentinel detection that fired, in a single prompt.

The three things it does **less well** (April 2026):

1. Long-running autonomous investigations without a human in the loop.
2. Complex KQL across non-standard schemas (custom tables, ASIM
   normalisation edge cases).
3. Cost-bounded answers — a vague prompt can burn an SCU very quickly.

---

## The licensing model — read this twice

This is where most pilots either succeed or quietly haemorrhage budget.

### Security Compute Units (SCUs)

Security Copilot is billed in **SCUs**. Think of an SCU as a unit of
guaranteed compute capacity, provisioned per hour.

| Item | Detail |
|---|---|
| Minimum provision | 1 SCU |
| Billing granularity | Per hour |
| List price | ~$4/SCU/hour (verify current pricing) |
| Provisioning model | Provision in Azure, billed via Azure subscription |
| Auto-scale | Manual — **you** decide when to add or remove SCUs |

A **single SCU** is enough for light pilot use by 2–3 analysts. A
production SOC of 10 analysts will typically run on 3–4 SCUs during
business hours and scale down off-hours.

### What "1 SCU/hour" actually buys you

Roughly: a handful of complex prompts per minute, where "complex"
means prompts that invoke multiple plugins. Simple summarisation
prompts cost much less.

The key insight: **prompts are not all priced equally.** A prompt that
asks "summarise incident 12345" is cheap. A prompt that asks
"correlate the last 30 days of phishing incidents with Entra
risk events and produce a CSV" is expensive.

### The pattern that works

For most organisations starting out:

```text
Business hours (Mon–Fri 08:00–18:00):  2 SCUs
Off hours / weekends:                   0 SCUs (deprovision)
Major incident response:                Spike to 4–6 SCUs as needed
```

You can automate the schedule with an Azure Automation runbook or a
Logic App. I'll cover the exact runbook in part 5.

---

## Architecture in one diagram

```text
┌─────────────────────────────────────────────────────────────┐
│             Security Copilot (LLM + reasoning)               │
└──────────┬──────────────────────────────────────────┬───────┘
           │                                          │
   ┌───────▼────────┐                       ┌─────────▼──────┐
   │ Microsoft      │                       │ Third-party    │
   │ plugins        │                       │ plugins        │
   ├────────────────┤                       ├────────────────┤
   │ Defender XDR   │                       │ ServiceNow     │
   │ Sentinel       │                       │ Tenable        │
   │ Intune         │                       │ Custom (KQL,   │
   │ Entra ID       │                       │  GPT, API)     │
   │ Purview        │                       │                │
   │ Defender TI    │                       │                │
   └────────┬───────┘                       └────────┬───────┘
            │                                        │
   ┌────────▼────────────────────────────────────────▼───────┐
   │                    Your tenant data                      │
   │     (only what each plugin is authorised to access)      │
   └──────────────────────────────────────────────────────────┘
```

Two things to internalise from this picture:

1. **Plugins are authorisation boundaries.** Copilot can only see what
   the plugin's identity is permitted to see. If your Sentinel plugin
   uses a service principal with read-only access to one workspace,
   that's all Copilot can hunt against.
2. **There is no "Copilot data lake."** Your data is not copied into
   Copilot. Each prompt fetches what it needs at runtime via plugins.

---

## Three governance decisions to make before pilot

### 1. Who can prompt Copilot?

Default answer is "all SOC analysts," but that's rarely the right
answer for the first 90 days. Start with a **named pilot group of 3–5
people** who can write good prompts and give you structured feedback.

Use Entra ID security groups to scope access. The role assignments
live in the Security Copilot portal under
**Owner / Contributor**.

### 2. Which plugins do you enable?

The temptation is to enable everything. Don't. Each enabled plugin
expands the data surface Copilot can pull from, and increases prompt
cost.

Recommended starter set:

- ✅ Microsoft Defender XDR
- ✅ Microsoft Sentinel (one workspace only at first)
- ✅ Microsoft Entra ID
- ⏸️ Intune — enable in week 3
- ⏸️ Purview — enable only if your pilot includes DLP/insider risk use cases
- ⏸️ Third-party — wait until you've validated value with first-party

### 3. How will you measure success?

The metrics that actually matter, in priority order:

1. **Mean time to incident summary** (target: < 2 minutes, was 15–30).
2. **Analyst-reported confidence** in Copilot output (Likert 1–5,
   target avg ≥ 4.0).
3. **SCU cost per closed incident** (track weekly).
4. **Number of unique analysts using Copilot per week** (adoption).

Skip vanity metrics like "prompts per day."

---

## What's next

In **part 2** we'll go deep on prompt patterns that actually produce
useful output — including a library of starter prompts you can copy
into your tenant on day one.

In **part 3** we'll cover plugin development, with a worked example of
a custom KQL plugin against a third-party log source.

Subscribe via [RSS](/index.xml) or watch the
[GitHub repo](https://github.com/YOUR-HANDLE/ms-security-blog) to get
the next post.

---

*Have a Copilot war story or a use case you'd like covered? Drop me a
note on [LinkedIn](https://www.linkedin.com/in/YOUR-HANDLE/).*
