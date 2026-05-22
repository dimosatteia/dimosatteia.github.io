---
title: "Secure Score P3: Operations"
date: 2026-05-22T07:00:00+03:00
lastmod: 2026-05-22T07:00:00+03:00
draft: false
keywords:
  - Microsoft Secure Score remediation workflow
  - how to prioritize Secure Score recommendations
  - Microsoft Secure Score change management process
  - Microsoft Secure Score ISO 27001 mapping
  - Microsoft Secure Score NIS2 compliance evidence
  - Microsoft Secure Score risk acceptance documentation
  - Microsoft Secure Score for CISO operations
  - Microsoft Secure Score continuous monitoring
  - Microsoft Secure Score audit evidence collection
  - Microsoft Secure Score board reporting
tags:
  - Microsoft Secure Score
  - Microsoft Defender XDR
  - Microsoft 365 Security
  - Microsoft Entra ID
  - Cyber GRC
  - ISO 27001
  - NIS2
  - CISO
  - Security Operations
  - Change Management
  - Risk Management
  - Compliance Evidence
author: "Dimosthenis Atteia"
description: "Microsoft Secure Score in daily operations: prioritization framework, formal remediation workflow, ISO 27001 and NIS2 control mapping, continuous monitoring, and audit evidence collection."
summary: "Part 3 of the Secure Score series. How to actually run Microsoft Secure Score day-to-day: prioritizing 260+ recommendations, building a change management process that doesn't break production, mapping controls to ISO 27001 and NIS2, collecting audit evidence, and reporting to the board."
categories: ["GRC & Frameworks", "Microsoft 365"]
series: ["Microsoft Secure Score as a Cyber GRC Instrument"]
ShowToc: true
TocOpen: false
weight: -1
cover:
  image: "/images/MSS.png"
  alt: "Microsoft Secure Score operational workflow — prioritization, change management, and compliance mapping for ISO 27001 and NIS2"
  caption: "Secure Score Series — Part 3: Daily Operations"
  relative: false
  hidden: false
---

## The morning after you open Microsoft Secure Score for the first time

In **[Part 1](/posts/secure-score-grc-part-1-anatomy/)** we walked through a single Microsoft Secure Score recommendation and decoded every field on the screen. In **[Part 2](/posts/secure-score-grc-part-2-ecosystem/)** we traced where the score comes from and which Microsoft products feed it, and how the whole thing fits into the Microsoft Defender ecosystem.

By now you understand *what* Microsoft Secure Score is and *where* it gets its data. The question most people hit next is: **what do I actually do with this?**

You open the **Recommended actions** list and see 260+ recommendations. Some are green (*Completed*). Most are grey (*To address*). A few are marked *Planned* or *Risk accepted*. Some have a score impact of 0.50 points. Some have 8.00 points. Some say *Low user impact*. Some say *Moderate* or *High*.

And the honest thought that crosses your mind is: *where on earth do I start?*

This post It’s about the operational layer, how you actually use Microsoft Secure Score in the daily work of a CISO, security engineer, or compliance team. How to prioritize. How to test changes without breaking production. How to map recommendations to the compliance frameworks your auditors care about. How to build a workflow that scales.

## The prioritization problem: 260+ recommendations and one team

The single biggest operational challenge with Microsoft Secure Score is **prioritization**. You have limited time, limited people, and a list of recommendations that feels endless. Every recommendation claims to be important. Microsoft gives you a *Score impact* number, but that number alone doesn't tell you which one to tackle today.

Here's the framework we use. It's not complicated, but it works.

### The three-axis prioritization matrix

We evaluate every Microsoft Secure Score recommendation against three dimensions:

1. **Risk reduction** (what threat does this mitigate?)
2. **Implementation effort** (how hard is this to configure?)
3. **Regulatory alignment** (*optional but nice to have*, does this satisfy ISO 27001, NIS2, or other frameworks we're audited against?)

[![Microsoft Secure Score prioritization matrix risk reduction versus implementation effort with regulatory alignment overlay](/images/SecureScoreRecommendationTriage.png)](/images/SecureScoreRecommendationTriage.png)
> 📷 **Image 1 — The three-axis prioritization matrix used for triage.**

#### Axis 1: Risk reduction

This is the security value. What attack vector does this recommendation close? How likely is that attack in our environment? What's the impact if it succeeds?

Examples:
- *"Require phishing-resistant MFA for administrators"*: **High risk reduction**. Compromised admin accounts are a top-tier threat. This control directly blocks credential phishing, the most common initial access method.
- *"Enable self-service password reset"*: **Low risk reduction**. This is a usability improvement. It reduces helpdesk load, but it doesn't stop an active threat.

We use a simple scale: **High, Medium, Low**. We don't need more granularity than that. The goal is to separate the recommendations that materially reduce our threat exposure from the ones that don't.

#### Axis 2: Implementation effort

How much work is this, really? Can one person configure it in 30 minutes, or does it require coordination across three teams, vendor engagement, and a phased rollout?

Examples:
- *"Enable audit log search"*: **Low effort**. It's a toggle in the Microsoft Purview compliance portal. Configure once, done.
- *"Ensure all users can complete multifactor authentication for Microsoft admin portals"*: **High effort**. This requires MFA enrollment for every user, communication campaigns, helpdesk training, and exception handling for users without smartphones.

Scale: **High, Medium, Low**. Be honest about effort. Underestimating effort is how recommendations get stuck in *Planned* status for six months.

#### Axis 3: Regulatory alignment *(optional but highly recommended for audited organizations)*

Does this recommendation map to a control in **ISO 27001:2022 Annex A**, **NIS2 Article 21**, **GDPR Article 32**, or another framework we're audited against?

Examples:
- *"Require phishing-resistant MFA for administrators"*: Maps to **ISO 27001:2022 A.5.17** (Authentication information), **NIS2 Article 21(2)(j)** (Use of multi-factor authentication or continuous authentication solutions), and **GDPR Article 32(1)(b)** (Ability to ensure confidentiality).
- *"Enable Microsoft Defender for Cloud Apps"*: **Not directly mapped** to ISO 27001 or NIS2 baseline requirements, though it supports several controls indirectly.

If a recommendation satisfies a control you'll be audited on, it gets priority. If it doesn't, it's still valuable, but it can wait.

### Putting it together: the prioritization buckets

We sort recommendations into four buckets:

**Priority 1: High risk, low effort, regulatory-aligned**
These are the quick wins. High security value, easy to implement, and they satisfy audit requirements. Do these first.

Example: *"Enable audit log search"* (ISO 27001 A.8.15, NIS2 Article 21(2)(e), low effort, immediate risk reduction for incident response).

**Priority 2: High risk, high effort, regulatory-aligned**
These are your big projects. They take time, but they're non-negotiable for both security and compliance.

Example: *"Require phishing-resistant MFA for administrators"* (ISO 27001 A.5.17, NIS2 Article 21(2)(j), high effort, critical risk reduction).

**Priority 3: Medium/low risk, low effort, regulatory-aligned**
These are compliance hygiene items. Not urgent from a threat perspective, but they close audit findings cheaply.

Example: *"Ensure password protection is enabled for Active Directory"* (ISO 27001 A.5.17, low effort, medium risk reduction).

**Priority 4: Everything else**
Medium/low risk, not mapped to current audit scope. These go into the backlog. You'll get to them eventually, or you'll document a risk acceptance.

Example: *"Set up Cloud Discovery"* in Microsoft Defender for Cloud Apps (useful for visibility into Shadow IT, but not required by ISO 27001 or NIS2 baseline).

### How to actually use this in practice

Every quarter, we export the full Microsoft Secure Score recommendation list via the **Microsoft Graph Security API** (more on that in a moment) into an Excel workbook. We add three columns: **Risk Reduction**, **Implementation Effort**, **Regulatory Mapping**. We fill them in, sort by priority bucket, and that becomes the roadmap for the next 90 days.

We don't try to do everything. We target **10–15 recommendations per quarter** from Priority 1 and 2. That's realistic. Anything more than that and you're either rushing (which breaks things) or you're only completing the trivial recommendations (which doesn't move the needle on actual risk).

## The formal remediation workflow: how to change things without breaking them

Once you've decided which recommendation to tackle, the next challenge is **change management**. Microsoft Secure Score recommendations often involve changes to identity policies, device compliance rules, or email filtering. Changes that, if misconfigured, can lock out executives, block legitimate emails, or break line-of-business applications.

We learned this the hard way. Here's the workflow we use now.

### Step 1: Impact assessment

Before touching any configuration, read the recommendation's **General** tab and the **Implementation** tab. Microsoft usually tells you exactly what will happen to end users.

[![Microsoft Secure Score recommendation Implementation tab showing step-by-step configuration guide and user impact analysis](/images/SecureScoreImplementationTab.png)](/images/SecureScoreImplementationTab.png)
> 📷 **Image 2 — The Implementation tab in a Microsoft Secure Score recommendation.**

Then ask:
- Will this block any existing user behavior?
- Does this require user action (e.g., MFA enrollment)?
- Will this break any service accounts or automated processes?

If the answer to any of those is *yes*, you need communication and a phased rollout.

### Step 2: Lab testing

If we're lucky enough to have a separate test tenant, we configure the change there first. We validate that it works as Microsoft says it will, and we look for unintended side effects.

If we don't have a test tenant (most mid-market organizations don't), we configure the change in production but scoped to a **pilot group**, usually the IT team plus a few friendly power users.

Example: When implementing *"Require phishing-resistant MFA for administrators"*, we created a Conditional Access policy targeting a security group called *CA-Pilot-Admins*, added three admin accounts to it, and validated that passkey-based authentication worked before expanding the policy to all administrators.

### Step 3: Documentation and approval

We document three things before making any change:

1. **What we're changing** (link to the Microsoft Secure Score recommendation)
2. **Why we're changing it** (risk reduction + regulatory mapping)
3. **Rollback plan** (how to undo this if it breaks something)

This documentation goes into a change request in our ISMS platform (we use **Cynomi**, but a SharePoint list works fine). For high-impact changes (anything that touches executives or critical business processes), we require approval from the **IT Manager** and **Business Unit lead**.

### Step 4: Phased rollout

We roll out changes in phases:

- **Phase 1: Pilot group** (IT team, 5-10 users, 1 week observation)
- **Phase 2: Early adopters** (power users, 10-20% of the organization, 2 weeks observation)
- **Phase 3: General availability** (everyone else, monitored for 30 days)

Between each phase, we check the Microsoft Entra ID **Sign-in logs** and **Microsoft 365 Service Health Dashboard** for blocked sign-ins, support tickets, and anomalies. If we see a problem, we pause and fix it before moving to the next phase.

### Step 5: Mark the recommendation as *Completed*

Only after Phase 3 is stable do we mark the recommendation as *Completed* in Microsoft Secure Score. This updates the score, locks in the evidence timestamp (important for audits), and moves the recommendation out of the *To address* list.

[![Microsoft Secure Score recommendation status options Completed Planned Risk accepted Third party Resolved through alternate mitigation](/images/SecureScoreRecommendationStatus.png)](/images/SecureScoreRecommendationStatus.png)
> 📷 **Image 3 — Status options for a Microsoft Secure Score recommendation.**

### What if you can't implement a recommendation?

Sometimes a recommendation isn't feasible. Maybe it breaks a legacy application. Maybe it conflicts with a business requirement. Maybe the effort doesn't justify the risk reduction.

In those cases, you have three options in Microsoft Secure Score:

1. **Risk accepted**: You acknowledge the gap, document the business reason, and accept the residual risk. The recommendation remains visible (so auditors can see you made a conscious decision), *but you won't earn any points for it*, which means it does effectively count against your maximum achievable score.
2. **Resolved through alternate mitigation**: You've implemented a compensating control outside of Microsoft 365. Example: You don't use Microsoft Defender for Cloud Apps, but you have a third-party CASB (Netskope, Zscaler, etc.) doing the same job.
3. **Third party**: Similar to alternate mitigation, but specifically for non-Microsoft products that satisfy the control.

**Critical point:** Every *Risk accepted* decision must be documented. We maintain a **Risk Acceptance Register** (a simple Excel file is fine) with columns for: **Recommendation title**, **Reason for non-implementation**, **Residual risk**, **Compensating controls (if any)**, **Approval date**, **Approver name**. This is what auditors will ask for.

## Mapping Microsoft Secure Score to ISO 27001 and NIS2

You've prioritized. You've implemented. Now you need to prove it to an auditor.

This is where **Microsoft Purview Compliance Manager** comes in. Compliance Manager ships with pre-built assessments for **ISO/IEC 27001:2022**, **NIS 2 Directive**, **GDPR**, and 300+ other frameworks. Each assessment contains **Improvement Actions**, specific configuration changes you can make to satisfy a control.

The magic is that many of these Improvement Actions are **directly linked to Microsoft Secure Score recommendations**. When you mark a Secure Score recommendation as *Completed*, the corresponding Improvement Action in Compliance Manager updates automatically.

### How to access Compliance Manager

1. Open **`https://purview.microsoft.com`** (the Microsoft Purview compliance portal)
2. In the left navigation, click **Compliance Manager**
3. Click **Assessments** at the top
4. Select **ISO/IEC 27001:2022** or **NIS 2 Directive** (or create a custom assessment if you don't see your framework)

[![Microsoft Purview Compliance Manager ISO 27001:2022 assessment showing Improvement Actions linked to Microsoft Secure Score recommendations](/images/Purview_Compliance_Manager_ISO27001.png)](/images/Purview_Compliance_Manager_ISO27001.png)
> 📷 **Image 4 — The ISO 27001:2022 assessment in Microsoft Purview Compliance Manager.**

### Example mapping: Ensure 'Phishing-resistant MFA strength' is required for Administrators

Let's walk through a concrete example. The Microsoft Secure Score recommendation *"Ensure 'Phishing-resistant MFA strength' is required for Administrators"* maps to:

**ISO 27001:2022**
- **A.5.17 — Authentication information**: *"The allocation and management of authentication information shall be controlled by a management process, including advising personnel on appropriate handling of authentication information."*

**NIS2 Directive**
- **Article 21(2)(j): Use of multi-factor authentication or continuous authentication solutions**: *"the use of multi-factor authentication or continuous authentication solutions, secured voice, video and text communications and secured emergency communication systems within the entity, where appropriate."*
- **Article 21(2)(i): Human resources security, access control policies and asset management**: *"human resources security, access control policies and asset management."*

In Compliance Manager, you'll find an Improvement Action titled something like *"Configure and manage multi-factor authentication (MFA) fraud alerts"*. When you click into it, you'll see:

- **Details**: Microsoft's implementation guidance, including the exact path in Entra admin center and a "Launch Now" deep link
- **Evidence**: Upload files or links as proof of implementation, with metadata (name, type, uploader, date) for audit trail purposes.
- **Related Controls**: The ISO 27001:2022 clauses and controls mapped to this action, here Clause 9.1 'Monitoring, measurement, analysis and evaluation

[![Microsoft Purview Compliance Manager Improvement Action detail pane showing control mapping implementation status and evidence collection](/images/ISO27001_Improvement_Action_MFA.png)](/images/ISO27001_Improvement_Action_MFA.png)
> 📷 **Image 5 — An Improvement Action in Compliance Manager.**

### Coverage: How much of ISO 27001 and NIS2 can Microsoft Secure Score evidence?

Based on our implementation, here's the rough coverage:

**ISO/IEC 27001:2022 Assessment (123 Microsoft Items)**
- **60-65% evidenced directly** by Microsoft Secure Score + Compliance Manager Improvement Actions
- **20-25% evidenced** by other Microsoft Purview tools (Data Loss Prevention, Information Protection, Insider Risk Management, Communication Compliance)
- **10-15% organizational controls** (policies, training, incident response procedures) that require manual documentation

**NIS2 Directive (EU) 2022/2555 Assessment (142 Microsoft Items)**
- **70-75% evidenced** by Microsoft Secure Score + Microsoft Purview (most of Article 21 is technical controls, which Microsoft 365 covers well)
- **25-30% organizational measures** (governance, supply chain security, business continuity) that require documented procedures

The key insight: **Microsoft 365 already satisfies the majority of technical controls in ISO 27001 and NIS2**. The gap is not in technology; it's in documentation and governance process.

### How to collect audit evidence from Microsoft Secure Score

Auditors don't take your word for it. They want timestamped, verifiable evidence that a control is configured correctly **today**.

Here's what we give them:

**Option 1: Compliance Manager export**
Go to **Compliance Manager → Assessments → [Your assessment] → Export to Excel**. This gives you a complete list of Improvement Actions, their implementation status, and the timestamp of the last verification.

**Option 2: Manual screenshot + timestamp**
For one-off audit requests, we take a screenshot of the Microsoft Secure Score recommendation marked as *Completed*, with the timestamp visible, and attach it to the audit evidence folder.

Not elegant, but it works. Auditors accept it.

## Continuous monitoring and alerting: How to know when something breaks

One of the biggest operational benefits of Microsoft Secure Score is that it's **continuously assessed**. Every 24 hours, Microsoft rechecks your tenant configuration against every recommendation. If a control you've already implemented gets misconfigured (someone disables a Conditional Access policy, a device compliance rule gets deleted, etc.), Microsoft Secure Score catches it.

But if you're only checking the dashboard once a month, you won't know about regressions until your next audit. Here's how we set up **continuous monitoring**.

### Baseline setting: What's normal for your organization

First, establish a baseline. What's your "healthy" Microsoft Secure Score? For us, it's **82%**. That's where we stabilized after implementing all Priority 1 and 2 recommendations. The remaining 18% is a mix of Priority 3 (on the roadmap for next year) and documented *Risk accepted* items.

Your baseline might be 70%. It might be 90%. The number doesn't matter. What matters is that you know what *normal* looks like, so you can detect when something changes.

### Regression detection: Controls that get "unconfigured"

Sometimes a control doesn't get deleted; it just stops working. Example: You've enabled **Safe Links** in Microsoft Defender for Office 365, but a policy update excludes a mailbox group, and suddenly 50 users are no longer protected.

Microsoft Secure Score will catch this. A recommendation that was previously *Completed* will flip back to *To address*. But again, you only see this if you're checking the dashboard regularly.

We handle this with a **weekly Secure Score review meeting** (15 minutes, every Monday). The agenda is:

1. Any new recommendations added by Microsoft?
2. Any previously-completed recommendations now showing as *To address*?
3. Any *Planned* recommendations past their target date?

If the answer to any of these is *yes*, we triage and assign an owner.

### Trend analysis: Quarterly and annual reports

Every quarter, we export the Microsoft Secure Score data from Power BI and include it in the **quarterly security report** to the board. The report includes:

- **Current score**: Where we are today
- **Trend**: Score over the last month
- **Completed actions this quarter**: What we implemented, and which ISO 27001/NIS2 controls they satisfy
- **Outstanding gaps**: What's still in *To address* or *Risk accepted*, and why

The board doesn't care about the individual recommendations. They care about the trend. As long as the score is stable or improving, and all high-risk gaps are either closed or risk-accepted with documented justification, they're satisfied.

[![Board-level quarterly security report showing Microsoft Secure Score trend](/images/Secure_Score_History.png)](/images/Secure_Score_History.png)
> 📷 **Image 6 — A board-level quarterly report excerpt showing Secure Score trend.**

[![Board-level quarterly security report showing ISO 27001 control coverage](/images/ISO27001_Coverage.png)](/images/ISO27001_Coverage.png)
> 📷 **Image 7 — A board-level quarterly report excerpt showing ISO 27001 control coverage.**

[![Board-level quarterly security report showing NIS2 control coverage](/images/NIS2_Coverage.png)](/images/NIS2_Coverage.png)
> 📷 **Image 8 — A board-level quarterly report excerpt showing NIS2 control coverage.**

## Governance and risk acceptance: How to document the gaps you can't close

Not every Microsoft Secure Score recommendation is feasible to implement. Sometimes the business reason outweighs the security benefit. Sometimes the effort is disproportionate to the risk. Sometimes a compensating control outside of Microsoft 365 satisfies the same requirement.

When you decide not to implement a recommendation, **document it**. This is not optional. If you leave a recommendation in *To address* status indefinitely, auditors will flag it as a gap. If you mark it as *Risk accepted* without documentation, auditors will flag it as *unmanaged risk*.

Here's how we handle this.

### The Risk Acceptance Register

We maintain a **Risk Acceptance Register** (a SharePoint list works fine; we use a dedicated section in our ISMS platform). For every recommendation marked as *Risk accepted*, we record:

- **Recommendation ID and title**
- **Category** (Identity, Device, Apps, Data)
- **Score impact** (how many points we're leaving on the table)
- **Risk description** (what threat does this leave open?)
- **Business justification** (why we can't implement it)
- **Compensating controls** (what else do we have in place that partially mitigates the risk?)
- **Approval date and approver** (who authorized this decision?)
- **Review date** (when will we revisit this?)

Example entry:

| Field | Value |
|-------|-------|
| **Recommendation** | Set up Cloud Discovery in Microsoft Defender for Cloud Apps |
| **Category** | Apps |
| **Score impact** | 4.50 points |
| **Risk description** | Reduces visibility into unsanctioned SaaS app usage (shadow IT) |
| **Business justification** | Limited SaaS footprint (only Microsoft 365 and 3 approved SaaS apps). Cost/benefit does not justify enabling Defender for Cloud Apps. |
| **Compensating controls** | Entra ID Conditional Access blocks all non-approved SaaS apps. Network firewall logs egress traffic for anomaly detection. |
| **Approval date** | 2025-11-12 |
| **Approver** | CISO (Dimosthenis Atteia) |
| **Review date** | 2026-11-12 (annual review) |

Auditors will ask to see this register. If it's well-documented, they'll move on. If it's not, they'll write a finding.

### Risk acceptance approval workflow

We don't let individual engineers mark recommendations as *Risk accepted*. That requires **CISO approval** (or, for low-impact items, **IT Manager approval**).

The workflow is:

1. Engineer proposes risk acceptance (fills out the Risk Acceptance Register entry)
2. IT Manager reviews and adds business context
3. CISO approves or rejects
4. If approved, engineer marks the recommendation as *Risk accepted* in Microsoft Secure Score and links to the Risk Acceptance Register entry

This ensures that risk decisions are made at the right level and that we have a clear audit trail.

## Practical exercise: Build your own operational runbook

If you've read this far, you now understand the operational mechanics of running Microsoft Secure Score day-to-day. Here's a practical exercise to make this concrete in your own environment.

### Step 1: Export your current Microsoft Secure Score recommendations

1. Go to **`https://security.microsoft.com` → in the left navigation, locate Microsoft Secure Score (under Exposure management in newer tenant configurations) → click Recommended actions tab**
2. Click **Export** (top-right corner)
3. Open the CSV in Excel

You'll see every recommendation, its status, score impact, category, and user impact.

### Step 2: Add prioritization columns

Add three new columns to the spreadsheet:

- **Risk Reduction** (High, Medium, Low)
- **Implementation Effort** (High, Medium, Low)
- **Regulatory Mapping** (list the ISO 27001 or NIS2 controls this satisfies, if any)

Fill in at least **20 recommendations** (pick the ones with the highest score impact or the ones that sound most relevant to your organization).

### Step 3: Sort into priority buckets

Create a new column called **Priority Bucket** and assign each recommendation to:

- **Priority 1**: High risk, low effort, regulatory-aligned
- **Priority 2**: High risk, high effort, regulatory-aligned
- **Priority 3**: Medium/low risk, low effort, regulatory-aligned
- **Priority 4**: Everything else

Sort the spreadsheet by **Priority Bucket**, then by **Score impact**.

### Step 4: Pick your Q1 2027 roadmap

Select **10-15 recommendations** from Priority 1 and 2. These are your targets for the next quarter.

For each one, write:
- **Target implementation date**
- **Owner** (who's responsible for configuring this?)
- **Dependencies** (do we need budget, vendor engagement, or cross-team coordination?)

This is now your operational roadmap. Pin it to your ISMS platform, SharePoint, or wherever your team tracks work.

### Step 5: Set up continuous monitoring

If you have access to **Power Automate** (included in most Microsoft 365 Business and Enterprise plans), build a simple flow:

1. **Trigger**: Recurrence (daily, at 09:00)
2. **Action**: HTTP request to `https://graph.microsoft.com/v1.0/security/secureScores?$top=2`
3. **Condition**: If today's score < yesterday's score by > 2%
4. **Action**: Post message to Teams or send email

This takes about 15 minutes to set up and will save you hours of manual checking.

## What we learned after two years of running this

We've been using Microsoft Secure Score as the engine of our GRC programme since late 2023. Here are the lessons that don't fit neatly into the sections above, but are worth sharing.

### Lesson 1: Start with the high-impact, low-effort items

It's tempting to chase the highest score impact recommendations first. Don't. Start with the **quick wins**, the recommendations that are easy to implement and materially reduce risk. Build momentum. Get the score moving. Then tackle the hard stuff.

### Lesson 2: Communicate changes to end users

Almost every Microsoft Secure Score recommendation that touches identity or email will affect end users in some way. If you don't communicate what's changing and why, you'll get a flood of helpdesk tickets and executive complaints.

We send a **short email** (3-4 sentences) to affected users one week before any high-impact change, with:
- What's changing
- Why we're doing it (security + compliance)
- What they need to do (if anything)
- Who to contact if they have problems

This reduced helpdesk tickets by about 60% compared to silent rollouts.

### Lesson 3: Don't chase 100%

A Microsoft Secure Score of 100% is not realistic for most organizations, and it's not necessary. Some recommendations conflict with business requirements. Some are overkill for your threat model. Some require licensing you don't have.

Our target is **80-85%**. Anything above that delivers diminishing returns. Focus on closing the high-risk gaps and documenting the rest.

### Lesson 4: Revisit risk-accepted items annually

Business context changes. A recommendation you couldn't implement last year might be feasible this year. Or vice versa.

We review every *Risk accepted* recommendation annually. About 20% of them get re-prioritized based on new business requirements, new threats, or new licensing.

### Lesson 5: Use Microsoft Secure Score as a teaching tool

For junior security engineers, Microsoft Secure Score is an excellent way to learn Microsoft 365 security. Each recommendation is a mini-lesson: what the control does, why it matters, how to configure it.

We assign new hires a **pilot project**: Pick 5 recommendations from Priority 3, research them, document the implementation plan, and configure them in a test environment. By the time they're done, they understand the Microsoft Defender ecosystem better than most mid-level admins.

## What comes next: Taking this to production

You now have the operational framework:

- How to prioritize 260+ recommendations into a manageable roadmap
- How to build a change management process that doesn't break production
- How to map Microsoft Secure Score to ISO 27001 and NIS2
- How to collect audit evidence
- How to monitor for regressions and report to the board

The next step is to take this into your own environment and start building the operational muscle. Pick 10 recommendations. Prioritize them. Implement them. Document them. Collect the evidence.

Within 90 days, you'll have a functioning GRC programme built on Microsoft 365, and you'll understand Microsoft Secure Score in a way that no amount of reading blog posts could teach you.

## Where to go from here

This is the final post in the core **Microsoft Secure Score as a Cyber GRC Instrument** series. You've now seen:

- **[Part 0: Series Introduction](/posts/secure-score-grc-part-0-intro/)**: The business case for using Microsoft Secure Score as a GRC engine
- **[Part 1: Anatomy](/posts/secure-score-grc-part-1-anatomy/)**: How to read a single Microsoft Secure Score recommendation
- **[Part 2: Ecosystem](/posts/secure-score-grc-part-2-ecosystem/)**: Where Microsoft Secure Score gets its data and how it fits into the Microsoft Defender family
- **Part 3: Operations** (this post): How to run Microsoft Secure Score day-to-day in a production environment

If you want to go deeper into the Microsoft Defender ecosystem itself, how **Microsoft Defender for Endpoint**, **Microsoft Defender for Office 365**, **Microsoft Defender for Identity**, and **Microsoft Defender for Cloud Apps** actually work, the **Microsoft Defender Demystified** series and **Microsoft Defender Up Close** series are coming in June 2026.

Until then, the best way to learn is to **do**. Open your Microsoft Secure Score dashboard. Pick a recommendation. Implement it. You'll be surprised how much you learn in the first week.

Follow me on [LinkedIn](https://www.linkedin.com/in/dimosthenisatteia/) for updates when new posts go live.

---
