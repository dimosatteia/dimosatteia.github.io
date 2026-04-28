---
title: "Microsoft Secure Score as a Cyber GRC Instrument — Part 1: Opening Your First Recommendation"
date: 2026-04-27T07:00:00+03:00
draft: false
keywords:
  - Microsoft Secure Score
  - How Microsoft Secure Score works
  - Microsoft Secure Score explained
  - What is Microsoft Secure Score
  - Microsoft Secure Score calculation
  - Microsoft Secure Score categories
  - Microsoft Secure Score recommendations
tags:
  - Microsoft Secure Score
  - Microsoft Defender XDR
  - Microsoft 365
  - Security Recommendations
author: "Dimosthenis"
description: "Every field on a Microsoft Secure Score recommendation, explained the way a friend would explain it. Written for junior admins, Tier 1 SOC analysts, and new cloud security engineers who are opening Microsoft Secure Score for the first time and want to actually understand what they're looking at."
summary: "Part 1 of the Secure Score series. A beginner-friendly walk through a single Microsoft Secure Score recommendation — every field on the screen, what each one means, and the small observations that help new professionals start extracting value in under an hour."
categories: ["GRC & Frameworks", "Microsoft 365"]
series: ["Microsoft Secure Score as a Cyber GRC Instrument"]
ShowToc: true
TocOpen: false
weight: 2
cover:
  image: "/images/MSS.png"
  alt: "Opening your first Microsoft Secure Score recommendation"
  caption: "Secure Score Series — Part 1"
---

## Before we start - What is Microsoft Secure Score

If you've just started a role as a **Microsoft 365 Junior Administrator**, a **Tier 1 SOC Analyst**, or an **entry-level Cloud Security Engineer**, chances are someone has already said the words "check our Microsoft Secure Score" at you. Maybe your manager. Maybe an auditor. Maybe a colleague asking if you can "just pull the number for the quarterly review".

And chances are you opened the Microsoft Defender portal, found the Microsoft Secure Score page, looked at a bunch of cards and lists and numbers, and thought, *okay, but what am I actually looking at & how Microsoft Secure Score works?*

First of all Microsoft Secure Score is a measurement tool within the Microsoft Defender Portal that evaluates an organization’s security posture across identity, devices, apps, and data.

You're not alone. Nobody looks at Microsoft Secure Score for the first time and immediately understands all of it (like Microsoft Secure Score recommendations or Microsoft Secure Score calculation). It's one of those Microsoft surfaces that's genuinely simple once you know what each piece means, but absolutely baffling the first time. This post is the friendly walk-through I wish someone had given me on day one.

We'll open a single recommendation together, go through every field on the screen, and by the end you'll know what you're looking at and what's worth your attention. No philosophy, no GRC framework discussion yet, just the screen in front of you.

> 📌 **A quick note on where this fits.** This post is Part 1 of a series that builds up to something bigger — using Microsoft Secure Score as the engine of a compliance programme. If you're curious about the bigger picture, the **[Series Introduction (Part 0)](/posts/secure-score-grc-part-0-intro/)** covers it. But you don't need to read that first. Start here.

## Getting to Microsoft Secure Score in 30 seconds

First the navigation, because the location moved recently and older blog posts may send you to the wrong place.

1. Open **`https://security.microsoft.com`** (this is the Microsoft Defender portal)
2. In the left navigation, expand **Exposure management**
3. Click **Microsoft Secure Score**

[![Image 1 — The Microsoft Secure Score overview page.](/images/SS_GRC_P1_Anatomy_image_1.png)](/images/SS_GRC_P1_Anatomy_image_1.png)
> 📷 **Image 1 — The Microsoft Secure Score overview page.**
> *Open Microsoft Defender portal → Exposure management → Microsoft Secure Score. Capture the entire overview page — the score circle on the left, the historical trend graph, the "Actions to review" list on the right. This is the landing page we're starting from. Redact your tenant name if needed.*

What you'll see on the overview page, from left to right:

- A **big circular number** — your current Secure Score as a percentage
- A **historical trend graph** — how the score has moved over time
- A **Top actions to review** list — the recommendations Microsoft thinks would improve your score the most
- Comparison cards — how your score compares to tenants of similar size

Don't worry about the overall number yet. We're going to click into a single recommendation.

## Opening your first recommendation

Click the **Recommended actions** tab at the top of the page. You'll get a list of every Microsoft Secure Score recommendation — usually somewhere between 100 and 250 of them, depending on what products you're licensed for.

[![Image 2 — The Recommended actions list.](/images/SS_GRC_P1_Anatomy_image_2.png)](/images/SS_GRC_P1_Anatomy_image_2.png)
> 📷 **Image 2 — The Recommended actions list.**
> *Capture from: Microsoft Secure Score → Recommended actions tab. Show the full list view with columns visible (Rank, Recommended action, Score impact, Status, Category). Scroll to show 10–15 rows. Redact anything that might be sensitive.*

For this walkthrough, pick a recommendation that sounds familiar. Good starting choices:

- *"Require multifactor authentication for administrative roles"*
- *"Ensure all users can complete multifactor authentication"*
- *"Enable self-service password reset"*
- *"Enable audit log search"*

Click on any one of them. A details pane opens on the right side of the screen. This is where we'll spend the next 10 minutes.

## Every field on the recommendation details pane, explained

[![Image 3 — A single recommendation details pane, fully expanded.](/images/SS_GRC_P1_Anatomy_image_3.png)](/images/SS_GRC_P1_Anatomy_image_3.png)
> 📷 **Image 3 — A single recommendation details pane, fully expanded.**
> *With the details pane open for the recommendation you picked, scroll through it and capture the complete detail view — title, description, implementation status, user impact, action type, score points, and the "Implementation" and "Details" tabs. Take multiple screenshots if one doesn't fit the whole thing.*

Let's go through everything you see, top to bottom.

### The title

Exactly what it sounds like — a short description of the control. Example: *"Require multifactor authentication for administrative roles."*

What matters to notice: **Microsoft wrote this title, not your organisation.** These titles are standardised across every Microsoft 365 tenant in the world. When you search for help on a specific recommendation, search for the exact title — you'll find official Microsoft documentation and community posts that refer to it.

### The product badge

A small badge that tells you which Microsoft product the recommendation comes from. Common ones:

- **Identity** — from Microsoft Entra ID
- **Data** — from Microsoft 365 Defender for Office or Microsoft Purview
- **Device** — from Microsoft Defender for Endpoint
- **Apps** — from Microsoft Defender for Cloud Apps

Why this matters: if you don't have a particular product licensed, you won't see its recommendations. If you see very few Device recommendations, for example, it usually means Microsoft Defender for Endpoint isn't deployed to your devices yet — not that you have no device problems.

### The description

A paragraph from Microsoft explaining **why this recommendation exists** — what attack or risk it addresses, what happens if it's not configured.

**A small but useful tip:** read this paragraph every time, even when the title seems obvious. The description often mentions specific attack techniques or compliance frameworks this control addresses. Understanding *why* a recommendation exists helps you defend it when someone pushes back on implementing it.

### Implementation status

One of three values:

- **To address** — the control isn't configured (or not fully) in your tenant
- **Planned** — someone in your organisation marked it as "we're working on this"
- **Risk accepted** — someone decided not to implement it, and documented why
- **Resolved through third party** — you have a non-Microsoft tool doing this job
- **Completed** — Microsoft Secure Score confirms the control is configured

This is a field **you update**, not Microsoft. When Microsoft's automated check confirms you've implemented the control, the status flips to **Completed** automatically. But if you plan to implement it later, or decide not to, you set it manually.

### User impact

Microsoft's assessment of how much friction implementing this recommendation will cause for your users. Typically *Low*, *Moderate*, or *High*.

This is actually important information that's easy to overlook. A recommendation labelled *High user impact* might still be worth implementing, but you should be prepared for user questions, support tickets, and possibly a communication plan. A *Low user impact* recommendation can usually be rolled out quietly.

### Implementation cost

Microsoft's rough estimate of how much work implementing this recommendation requires from your team. Again, *Low*, *Moderate*, or *High*. Useful when you're prioritising a long list — start with low-cost, high-score-impact items.

### Score impact

How many points your Secure Score will go up when this recommendation is completed. Usually something like **+5.3 points** or **+12.7 points**.

Notice: this is an absolute number, not a percentage. If your current score is 347 out of 600, and this recommendation is worth 10 points, implementing it takes you to 357 out of 600 — which translates to a small percentage change.

### Category

Broad groupings Microsoft uses to organise recommendations:

- **Identity**
- **Data**
- **Device**
- **Apps**

Same as the product badge, essentially. You'll see the categories filtered at the top of the Recommended actions list so you can focus on one area at a time.

### Tags

Small labels Microsoft applies to the recommendation — things like *GDPR*, *NIST*, *CIS*, *ISO 27001*. These are useful hints about compliance framework coverage but they're not definitive control mappings. If you need real framework alignment, that lives in Microsoft Purview Compliance Manager, not here.

### The "Implementation" tab

Below the summary, there's usually a tab with **step-by-step implementation instructions**. For most recommendations, Microsoft has written a short, numbered guide that tells you exactly where to click to configure the control.

[![Image 4 — The Implementation tab contents.](/images/SS_GRC_P1_Anatomy_image_4.png)](/images/SS_GRC_P1_Anatomy_image_4.png)
> 📷 **Image 4 — The Implementation tab contents.**
> *Click the Implementation tab on an open recommendation and capture the step-by-step instructions Microsoft provides. This content is a genuine hidden gem and most new professionals miss that it's there.*

**This is the single most useful thing in Microsoft Secure Score for someone new to the platform.** Microsoft has essentially written the remediation documentation for you. Read it. Follow it. In many cases you'll be able to implement the recommendation in 10 minutes without needing any other resource.

### The "Details" or "Data" tab (when it exists)

For some recommendations, a second tab shows you the **actual current state** — how many users are affected, which ones, what specific settings are not configured. This is invaluable when you want to understand what "partial credit" looks like — sometimes a recommendation shows 60% implemented, and this tab tells you exactly which 40% is missing.

## Four small habits that make this all easier

Some of these aren't obvious, but they save you real time as you get comfortable with the platform.

### Habit 1 — Always read the title *and* the description

The title alone is often ambiguous. Two recommendations might have similar-sounding titles but address genuinely different controls. Reading the description — even just the first sentence — is the fastest way to avoid confusion.

### Habit 2 — Filter by category before prioritising

Instead of scrolling through 200 recommendations, filter by one category (Identity, for example) and prioritise within that group. Most security improvements cluster by category — fixing three or four Identity recommendations together is more efficient than hopping between areas.

[![Image 5 — The category filter applied to the Recommended actions list.](/images/SS_GRC_P1_Anatomy_image_5.png)](/images/SS_GRC_P1_Anatomy_image_5.png)
> 📷 **Image 5 — The category filter applied to the Recommended actions list.**
> *From the Recommended actions list, click the Category filter and select one (e.g., Identity). Capture the resulting filtered list. This shows readers how focused the list becomes — and how much easier prioritisation gets.*

### Habit 3 — Sort by score impact, not by status

The default view is usually ranked by Microsoft's own risk prioritisation, which is good — but when you're new and want quick wins, sorting by *Score impact (descending)* shows you the highest-value recommendations first. Implementing two or three of those gives you a visible improvement in the overall number, which helps build confidence and momentum.

### Habit 4 — If a recommendation confuses you, search Microsoft Learn with the exact title

Copy the full title of the recommendation and paste it into Google with `site:learn.microsoft.com`. You'll almost always find official Microsoft documentation explaining the control in more depth than the recommendation pane itself. This is your secret weapon — every recommendation maps to official docs.

## What you can extract in under an hour

If you're doing this for the first time today, here's a reasonable 60-minute goal:

1. **Minutes 0–10** — Navigate to Microsoft Secure Score, read the overview page, note your overall score.
2. **Minutes 10–25** — Open five different recommendations from different categories. Read title, description, implementation status, and the Implementation tab for each. Don't change anything.
3. **Minutes 25–40** — Sort the full list by Score impact. Identify the top three highest-impact items that are currently "To address".
4. **Minutes 40–55** — For one of those three, read the Implementation tab carefully. Estimate whether you could do it safely today, or whether it needs planning.
5. **Minutes 55–60** — Write down the three recommendations you identified. Ask your manager or senior colleague whether any of them are safe to implement.

That's genuinely useful first-day work. You don't need to implement anything yet. Just understanding what's on the page, and being able to point at three specific items and say *"these three would move the score up the fastest if we implemented them"*, puts you ahead of where most new professionals are on day one.

## What's next

In **Part 2** we zoom out from the single recommendation and look at
where Microsoft Secure Score actually lives inside the Microsoft
Defender portal — and, more importantly, *which Microsoft products
feed it*. You'll see why your score is really a scoreboard reading
configuration data from Microsoft Entra ID, Microsoft Defender for
Endpoint, Microsoft Defender for Office 365, Microsoft Defender for
Cloud Apps, and Microsoft Purview — and you'll learn how to trace
a single score point back to the product that generated it.

> 🔗 **Want to see where Microsoft Secure Score fits in the bigger Microsoft Defender picture?** Part 2 connects the dots to the broader Microsoft Defender family. You can also start from the ground-up tour: **[Microsoft Defender Demystified — Part 1](/posts/defender-demystified-part-1-what-is-microsoft-defender/)**.

Follow me on [LinkedIn](https://www.linkedin.com/in/dimosthenisatteia/) for new-post notifications.

## Microsoft Learn resources

- [Microsoft Secure Score overview](https://learn.microsoft.com/en-us/defender-xdr/microsoft-secure-score)
- [How Microsoft Secure Score is calculated](https://learn.microsoft.com/en-us/defender-xdr/microsoft-secure-score-improvement-actions)
- [Respond to Microsoft Secure Score recommendations](https://learn.microsoft.com/en-us/defender-xdr/microsoft-secure-score-improvement-actions#address-an-improvement-action)
- [Microsoft Security Exposure Management](https://learn.microsoft.com/en-us/security-exposure-management/microsoft-security-exposure-management)

---

<!--
=========================================================
IMAGE NOTES
=========================================================

Image 1 — Microsoft Secure Score overview page
  Source: security.microsoft.com → Exposure management → Microsoft Secure Score
  Capture: full overview — score circle, trend graph, actions list
  Format: 16:9, full-width
  Redaction: tenant name

Image 2 — Recommended actions list
  Source: same page → Recommended actions tab
  Capture: 10–15 rows with columns visible (Rank, Action, Score impact, Status, Category)
  Redaction: any sensitive titles

Image 3 — Single recommendation details pane
  Source: click any recommendation to open the details pane
  Capture: the full right-side panel (may need multiple screenshots)
  Good examples to pick: MFA for admins, Enable audit log search
  No redaction usually needed — these are standardised Microsoft descriptions

Image 4 — Implementation tab contents
  Source: open any recommendation → Implementation tab
  Capture: the numbered step-by-step instructions
  Important image — this is the "hidden gem" for new professionals

Image 5 — Category filter applied
  Source: Recommended actions list → Category filter → select one
  Capture: filtered list showing only that category

Save all images to /static/images/posts/secure-score-grc-part-1-anatomy/
=========================================================
-->
