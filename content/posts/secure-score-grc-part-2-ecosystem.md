---
title: "Microsoft Secure Score as a Cyber GRC Instrument — Part 2: Where It Sits in the Microsoft Defender World"
date: 2026-04-22T10:00:00+03:00
draft: true
author: "Dimosthenis"
description: "Microsoft Secure Score doesn't live in isolation — it sits inside a much bigger Microsoft Defender ecosystem, quietly pulling signals from products like Defender for Endpoint, Defender for Office 365, Entra ID, and Microsoft Purview. A beginner-friendly explanation of how the pieces connect and where your score actually comes from."
summary: "Part 2 of the Secure Score series. Where Microsoft Secure Score physically lives, how it feeds off the Microsoft Defender family, what each source product contributes, and a practical exercise to trace one score point back to the product that generated it."
tags: ["secure-score", "microsoft-365", "microsoft-defender", "junior-admin", "beginner", "fundamentals", "microsoft-defender-xdr", "exposure-management"]
categories: ["GRC & Frameworks", "Microsoft 365"]
series: ["Microsoft Secure Score as a Cyber GRC Instrument"]
ShowToc: true
TocOpen: false
weight: 3
cover:
  image: "/images/MSS.png"
  alt: "Microsoft Secure Score inside the Microsoft Defender family"
  caption: "Secure Score Series — Part 2"
---

## A small moment most beginners hit

In **[Part 1](/posts/secure-score-grc-part-1-anatomy/)** we opened a single Microsoft Secure Score recommendation and walked through every field. By now you can look at a recommendation and understand what you're seeing.

But if you've been clicking around for a few days, you've probably hit this moment: you look at your overall score, and you wonder — *where does this number actually come from? Who's measuring what? Is Microsoft running some kind of scan on my tenant? And why are there recommendations about products I didn't even know I had?*

These are good questions. The answers are genuinely useful to know, and once they click, the whole Microsoft Defender portal stops feeling like a random collection of features and starts feeling like a system.

This is that post.

## The honest, short version

Microsoft Secure Score isn't a product on its own. It's **a scoreboard that reads configuration data from a bunch of other Microsoft products and gives you a single number.**

Each of those other products already knows what it should be configured like. Microsoft Secure Score asks them *"hey, is this specific thing configured correctly in this tenant?"*, gets a yes/no back, tallies the results, and shows you the total.

That's really it. The rest of this post is just unpacking which products contribute what, and how to trace a score point back to its source.

## The Microsoft Defender family in one paragraph

If you haven't read **[Microsoft Defender Demystified — Part 1](/posts/defender-demystified-part-1-what-is-microsoft-defender/)** yet, go read it after this post — it's the foundational map of the Microsoft Defender family. But the short version for now: Microsoft groups its security products into a family called **Microsoft Defender**, the umbrella brand being **Microsoft Defender XDR**. Inside that umbrella are several workloads — Microsoft Defender for Endpoint (devices), Microsoft Defender for Office 365 (email and Teams), Microsoft Defender for Identity (Active Directory), Microsoft Defender for Cloud Apps (SaaS apps) — plus a couple of close cousins like Microsoft Defender for Cloud (Azure workloads).

Microsoft Secure Score reads from most of these.

## Where Microsoft Secure Score physically lives

Remember from Part 1, the navigation path is:

**`security.microsoft.com` → Exposure management → Microsoft Secure Score**

The important word is **Exposure management**. Microsoft Secure Score moved into that section a while back, and it lives alongside other posture-related features.

[![Image 1 — The Exposure management section in the left navigation.](/images/SS_GRC_P2_Ecosystem_image_1.png)](/images/SS_GRC_P2_Ecosystem_image_1.png)
> 📷 **Image 1 — The Exposure management section in the left navigation.**
> *Capture from: security.microsoft.com left navigation, with Exposure management expanded. Show the menu items underneath it — Overview, Attack surface, Exposure insights, Microsoft Secure Score. This shows the "neighbourhood" Microsoft Secure Score lives in.*

**[Microsoft Security Exposure Management](https://learn.microsoft.com/en-us/security-exposure-management/microsoft-security-exposure-management)** is a newer Microsoft surface that tries to answer *"how exposed are we?"*. It includes:

- Your **attack surface** (what an attacker could see from outside)
- Your **exposure insights** (what risks matter most right now)
- **Microsoft Secure Score** (how configured-correctly your tenant is)
- Other posture signals

Microsoft Secure Score is one of several posture instruments that live here. For now you don't need to use the other ones — just notice they exist and they're related.

## The products that feed your Microsoft Secure Score

This is the part that usually surprises new professionals. Your Microsoft Secure Score is calculated from configuration data in **many different Microsoft products**. Here's the main list:

[![Image 2 — The Recommended actions list with the Category column visible.](/images/SS_GRC_P2_Ecosystem_image_2.png)](/images/SS_GRC_P2_Ecosystem_image_2.png)
> 📷 **Image 2 — The Recommended actions list with the Category column visible.**
> *Capture from: Microsoft Secure Score → Recommended actions. Make sure the Category column is visible. Show 10–15 rows so the variety of categories (Identity, Data, Device, Apps) is clear. This screenshot proves the "multiple sources" point visually.*

### Microsoft Entra ID (identity)

**[Microsoft Entra ID](https://learn.microsoft.com/en-us/entra/fundamentals/whatis)** is Microsoft's cloud identity and access management service. It provides a big chunk of your Microsoft Secure Score recommendations — things like:

- Multifactor authentication policies
- Conditional Access policies
- Password protection
- Risk-based sign-in policies
- Self-service password reset
- Privileged account controls

Any recommendation with a badge or category of **Identity** comes from Microsoft Entra ID.

### Microsoft Defender for Endpoint (devices)

**[Microsoft Defender for Endpoint](https://learn.microsoft.com/en-us/defender-endpoint/microsoft-defender-endpoint)** protects the devices in your fleet. Its Microsoft Secure Score contribution covers:

- Whether antivirus is enabled and up to date
- Whether attack surface reduction rules are configured
- Whether network protection is on
- Device security baselines and exposure levels

Recommendations with the **Device** category come from here. If you see very few Device recommendations, it usually means Microsoft Defender for Endpoint isn't fully deployed yet.

### Microsoft Defender for Office 365 (email and Teams)

**[Microsoft Defender for Office 365](https://learn.microsoft.com/en-us/defender-office-365/mdo-about)** protects email and Microsoft Teams. Its Microsoft Secure Score contributions include:

- Anti-phishing policies
- Safe Links and Safe Attachments policies
- Anti-spam and anti-malware configurations
- DKIM, SPF, DMARC email authentication
- Attack Simulation Training usage (in Plan 2)

These show up mostly under the **Apps** or **Data** category, depending on the specific recommendation.

### Microsoft Defender for Cloud Apps (SaaS apps)

**[Microsoft Defender for Cloud Apps](https://learn.microsoft.com/en-us/defender-cloud-apps/what-is-defender-for-cloud-apps)** watches over your SaaS application usage. Its recommendations include:

- Cloud app governance policies
- OAuth app review status
- Anomaly detection policy coverage

### Microsoft Purview (data protection and compliance)

**[Microsoft Purview](https://learn.microsoft.com/en-us/purview/purview)** handles data protection and compliance. It contributes recommendations about:

- Sensitivity labels being configured
- Data Loss Prevention (DLP) policies being active
- Audit log search being enabled
- Retention policies and records management

These show up under the **Data** category.

### Microsoft Exchange Online (mail flow)

Some foundational email configuration recommendations come directly from **Microsoft Exchange Online** — things like mailbox auditing settings, modern authentication, and external forwarding restrictions. They usually appear with **Apps** or **Data** badges.

## Tracing one score point back to its source

Here's a concrete exercise that makes all this click. Open your Microsoft Secure Score, pick any recommendation that's currently **To address**, and we'll trace it back to its source together.

Example: let's say the recommendation is *"Ensure internal phishing protection for Forms is enabled"*.

[![Image 3 — A recommendation's Implementation tab showing which Microsoft product configures it.](/images/SS_GRC_P2_Ecosystem_image_3.png)](/images/SS_GRC_P2_Ecosystem_image_3.png)
> 📷 **Image 3 — A recommendation's Implementation tab showing which Microsoft product configures it.**
> *Open the recommendation "Ensure internal phishing protection for Forms is enabled" (or similar) → Implementation tab. Capture the instructions. Notice how they direct you into Microsoft Entra admin center — that's the source product.*

The Implementation tab tells you to go to **Microsoft Entra admin center → Protection → Conditional Access** and configure an MFA policy. Notice what just happened:

- **Scoreboard:** Microsoft Secure Score (in the Defender portal)
- **Source product:** Microsoft Entra ID (in a different admin centre)
- **Score answers the question:** *Is MFA enforced for all users?*
- **Data collected by:** Microsoft Entra ID, continuously, from live tenant configuration

When you implement the MFA policy in Microsoft Entra admin center, Microsoft Entra ID reports back to Microsoft Secure Score that the configuration has changed. The recommendation's status flips to **Completed** (usually within a few hours), and your score goes up by the recommendation's point value.

**The insight:** Microsoft Secure Score never *did* anything in your tenant. It's just asking Microsoft Entra ID a question and reading the answer. The same pattern applies to every other source product.

## Why some recommendations you can't see yet

This is a common beginner moment of confusion. You've read an article or watched a webinar that mentioned a specific Microsoft Secure Score recommendation — and when you look in your own tenant, it isn't there.

The reason is almost always **licensing**. Microsoft Secure Score only shows you recommendations for products you're **licensed for**. If your tenant doesn't have Microsoft Defender for Office 365 Plan 2, you won't see the recommendations that are specific to Plan 2 (like the Attack Simulation Training ones). If you don't have Microsoft Defender for Cloud Apps, you won't see any Cloud App recommendations at all.

[![Image 4 — The Microsoft 365 admin center licenses page.](/images/SS_GRC_P2_Ecosystem_image_4.png)](/images/SS_GRC_P2_Ecosystem_image_4.png)
> 📷 **Image 4 — The Microsoft 365 admin center licenses page.**
> *Capture from: admin.microsoft.com → Billing → Licenses. This shows what products your tenant is actually licensed for — which directly determines what Microsoft Secure Score recommendations you'll see. Redact counts if sensitive.*

This is why two people comparing their scores can get confusing numbers. A company with Microsoft 365 E5 might have 180 recommendations; a company with Microsoft 365 E3 might have 120. They're not being scored against the same set of questions.

For a deeper walk through what each license includes, the **[Microsoft Defender Demystified — Part 4 (licensing decoder)](/posts/defender-demystified-part-4-licensing-decoder/)** covers this in plain language.

## How often does the data refresh?

Not instantly. When you make a configuration change in Microsoft Entra ID, Microsoft Defender for Endpoint, or any other source product, there's a lag before Microsoft Secure Score picks it up.

In practice:

- **Most recommendations** — refresh within 24 hours
- **Some identity and policy recommendations** — can take up to 48 hours to update
- **Certain Microsoft Defender for Endpoint recommendations** — depend on device check-in frequency, can be longer

If you implement a change and your score hasn't moved by the next day, don't panic — come back the day after. If it still hasn't moved after 72 hours, that's when you'd start investigating (usually the configuration isn't quite what Microsoft Secure Score is checking for — happens occasionally).

## The history tab tells a story

One last part of the page worth knowing about: **History**.

[![Image 5 — The Microsoft Secure Score History tab.](/images/SS_GRC_P2_Ecosystem_image_5.png)](/images/SS_GRC_P2_Ecosystem_image_5.png)
> 📷 **Image 5 — The Microsoft Secure Score History tab.**
> *Capture from: Microsoft Secure Score → History tab. Show the timeline of score changes with individual events visible (when recommendations were implemented, when the score dropped, when new recommendations appeared). Redact anything sensitive.*

The History tab shows every score event over time — when a recommendation got completed, when a new one was added (which drops the score temporarily), when configuration drifted (which can also drop the score).

This is genuinely useful when:

- Your score dropped unexpectedly and you want to find out why
- You want to see progress over a reporting period (*"we improved by 12 points last quarter"*)
- You want to track which configuration changes actually moved the number

As you get more comfortable with Microsoft Secure Score, the History tab becomes your evidence source for *"yes, we did that work"* and *"here's when the drop happened"* conversations.

## A quick wrap-up

Everything we covered in one paragraph: Microsoft Secure Score is a scoreboard inside the Microsoft Defender portal's Exposure management section. It reads configuration data from several Microsoft products — Microsoft Entra ID, Microsoft Defender for Endpoint, Microsoft Defender for Office 365, Microsoft Defender for Cloud Apps, Microsoft Purview, Microsoft Exchange Online — and gives you a single number. When you implement a recommendation, you're not changing anything in Microsoft Secure Score itself; you're changing configuration in one of those source products, which then reports back. The score refreshes within 24–48 hours of configuration changes. Licensing determines which recommendations you can see. The History tab tells you everything that's happened.

That's the whole mental model. Once you have it, everything else in Microsoft Secure Score — and a surprising amount of the broader Microsoft Defender portal — makes intuitive sense.

## What's next

In **Part 3** we move into actually managing Microsoft Secure Score as part of a compliance programme — how to prioritise recommendations when you have 150 of them, how to document risk decisions for auditors, and how to start thinking about score as evidence rather than as a target.

> 🔗 **Haven't read the full Microsoft Defender family map yet? Start here:** **[Microsoft Defender Demystified — Part 1: How Many Defenders Are There, Really?](/posts/defender-demystified-part-1-what-is-microsoft-defender/)**. Understanding the whole family makes everything about Microsoft Secure Score click much faster.

> 🔗 **Want to see where this whole series is going?** **[Series Introduction — How We Built a Gold-Winning GRC Programme on Microsoft Secure Score](/posts/secure-score-grc-part-0-intro/)**.

Follow me on [LinkedIn](https://www.linkedin.com/in/dimosthenisatteia/) for new-post notifications, or subscribe via RSS at the top of the page.

## Microsoft Learn resources

- [Microsoft Secure Score overview](https://learn.microsoft.com/en-us/defender-xdr/microsoft-secure-score)
- [How Microsoft Secure Score is calculated](https://learn.microsoft.com/en-us/defender-xdr/microsoft-secure-score-improvement-actions)
- [Microsoft Security Exposure Management overview](https://learn.microsoft.com/en-us/security-exposure-management/microsoft-security-exposure-management)
- [Microsoft Defender XDR overview](https://learn.microsoft.com/en-us/defender-xdr/microsoft-365-defender)
- [Microsoft Entra ID overview](https://learn.microsoft.com/en-us/entra/fundamentals/whatis)
- [Microsoft Purview overview](https://learn.microsoft.com/en-us/purview/purview)

---

<!--
=========================================================
IMAGE NOTES
=========================================================

Image 1 — Exposure management in the left navigation
  Source: security.microsoft.com, left nav expanded
  Capture: only the Exposure management section with its sub-items visible
  Format: tall narrow screenshot
  This shows readers the "neighbourhood" Microsoft Secure Score lives in

Image 2 — Recommended actions list with Category column visible
  Source: Microsoft Secure Score → Recommended actions tab
  Capture: 10–15 rows with the Category column clearly showing
    (mix of Identity / Data / Device / Apps)
  Purpose: proves the "multiple sources" point visually

Image 3 — Recommendation Implementation tab
  Source: open any recommendation about MFA (e.g., "Ensure MFA is enabled
    for all users")
  Capture: the Implementation tab showing step-by-step instructions that
    direct the reader to Microsoft Entra admin center
  Purpose: the "tracing a score point to its source" example

Image 4 — Microsoft 365 admin center licenses page
  Source: admin.microsoft.com → Billing → Licenses
  Capture: the assigned licenses list
  Redaction: counts if sensitive
  Purpose: showing readers how to check what they're actually licensed for

Image 5 — Microsoft Secure Score History tab
  Source: Microsoft Secure Score → History tab
  Capture: the timeline view with individual events
  Redaction: anything sensitive
  Purpose: showing the "evidence and audit trail" angle

Save all images to /static/images/posts/secure-score-grc-part-2-ecosystem/
=========================================================
-->
