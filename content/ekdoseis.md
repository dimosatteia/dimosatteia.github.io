---
title: "Εκδόσεις Microsoft 365 Security: τι νέο βγήκε και τι πρέπει να ενημερώσεις"
date: 2026-11-12T08:00:00+02:00
lastmod: 2026-11-12T08:30:00+02:00
draft: false
url: "/ekdoseis/"
slug: "ekdoseis"
# Ίδιο layout με τη σελίδα «Εργαλεία». Το <!--tracker--> στο κείμενο ορίζει πού μπαίνουν τα tiles.
layout: "ekdoseis"
newDays: 14
# Αρχική: πρώτο στα «Πρόσφατα Άρθρα» (homeFeed + weight -7, το νεότερο ανάμεσα στα -7) και στη γραμμή «🆕 Νέο άρθρο:» (homeHighlight)
homeFeed: true
homeHighlight: true
weight: -7
cover:
  image: "/images/tools/ekdoseis.webp"
  alt: "Microsoft 365 Security Updates: Windows 11 και Hotpatch, Entra connectors και Sync, Defender for Identity και Antivirus, Security Baselines και PowerShell, με τις τρέχουσες εκδόσεις τους"
  maxWidth: 1000
# Το link στο μενού ορίζεται εδώ, ώστε να εμφανίζεται μόνο όταν η σελίδα είναι δημοσιευμένη.
menu:
  main:
    identifier: releases-versions
    parent: releases
    name: "🔢 Εκδόσεις (Version Tracker)"
    weight: 4
author: "Dimosthenis Atteia"
description: "Οι τρέχουσες εκδόσεις των connectors, agents, clients, Windows updates, PowerShell modules και security baselines του Microsoft 365 Security, με το τι αλλάζει στα Ελληνικά και αν η ενημέρωση γίνεται αυτόματα ή χειροκίνητα."
seoTitle: "Εκδόσεις Microsoft 365 Security: connectors, agents, baselines"
seoDescription: "Νέες εκδόσεις για Entra private network connector, Entra Connect, Defender for Identity sensor, Global Secure Access client, PowerShell modules και Intune baselines."
keywords:
  - Microsoft Entra private network connector version
  - Microsoft Entra Connect Sync version
  - Defender for Identity sensor version
  - Global Secure Access client release
  - Microsoft Defender Antivirus platform update
  - Intune security baselines
  - Windows 11 Hotpatch
  - Patch Tuesday
  - Microsoft Graph PowerShell
  - διαχείριση ενημερώσεων
showToc: false
ShowReadingTime: false
ShowBreadCrumbs: false
hideMeta: true
verification:
  - feature: "Microsoft Entra private network connector: version release history"
    status: "Ενημερώνεται σε κάθε έκδοση"
    license: "Microsoft Entra Private Access ή Microsoft Entra application proxy"
    source: "https://learn.microsoft.com/en-us/entra/global-secure-access/reference-version-history"
    verified: 2026-11-12
  - feature: "Global Secure Access client για Windows: release history"
    status: "Ενημερώνεται σε κάθε έκδοση"
    license: "Microsoft Entra Suite, Internet Access ή Private Access"
    source: "https://learn.microsoft.com/en-us/entra/global-secure-access/reference-windows-client-release-history"
    verified: 2026-11-12
  - feature: "Microsoft Entra Connect Sync: version release history"
    status: "Ενημερώνεται σε κάθε έκδοση"
    license: "Microsoft Entra ID"
    source: "https://learn.microsoft.com/en-us/entra/identity/hybrid/connect/reference-connect-version-history"
    verified: 2026-11-12
  - feature: "Microsoft Entra Cloud Sync: provisioning agent version history"
    status: "Ενημερώνεται σε κάθε έκδοση"
    license: "Microsoft Entra ID"
    source: "https://learn.microsoft.com/en-us/entra/identity/hybrid/cloud-sync/reference-version-history"
    verified: 2026-11-12
  - feature: "What's new in Microsoft Defender for Identity: εκδόσεις του sensor"
    status: "Ενημερώνεται μηνιαία"
    license: "Microsoft Defender for Identity"
    source: "https://learn.microsoft.com/en-us/defender-for-identity/whats-new"
    verified: 2026-11-12
  - feature: "Microsoft Defender for Endpoint release notes: Microsoft Defender Antivirus platform και engine"
    status: "Ενημερώνεται μηνιαία"
    license: "Microsoft Defender Antivirus"
    source: "https://learn.microsoft.com/en-us/defender-endpoint/microsoft-defender-endpoint-releases#microsoft-defender-antivirus-releases"
    verified: 2026-11-12
  - feature: "Windows 11 update history (24H2, 25H2, 26H2): μηνιαία security updates"
    status: "Ενημερώνεται κάθε Patch Tuesday"
    license: "Windows 11"
    source: "https://support.microsoft.com/en-us/servicing/os/windows-11/2026/09/windows-11-version-26h2-update-history"
    verified: 2026-11-12
  - feature: "Windows 11 hotpatch calendar: baseline με restart κάθε τρίμηνο, hotpatch χωρίς restart τους υπόλοιπους μήνες"
    status: "GA"
    license: "Windows 11 Enterprise E3/E5, Microsoft 365 F3, Education A3/A5, Microsoft 365 Business Premium ή Windows 365 Enterprise, με Microsoft Intune (Windows Autopatch) και VBS"
    source: "https://learn.microsoft.com/windows/release-health/windows11-release-information#windows-11-hotpatch-calendar"
    verified: 2026-11-12
  - feature: "Intune security baselines: διαθέσιμες εκδόσεις"
    status: "Ενημερώνεται σε κάθε νέα έκδοση baseline"
    license: "Microsoft Intune"
    source: "https://learn.microsoft.com/intune/device-security/security-baselines/overview"
    verified: 2026-11-12
  - feature: "PowerShell Gallery: Microsoft.Graph, Microsoft.Entra, ExchangeOnlineManagement"
    status: "Ενημερώνεται σε κάθε έκδοση"
    license: "Δωρεάν"
    source: "https://www.powershellgallery.com/"
    verified: 2026-11-12
  - feature: "ΚΥΑ 1689/2025 (ΦΕΚ Β΄ 2186/06.05.2025), άρθρο 17: Διαχείριση και γνωστοποίηση ευπαθειών"
    status: "Ισχύει"
    license: "Άρθρο 17"
    source: "https://cyber.gov.gr/wp-content/uploads/2025/05/20250202186.pdf"
    verified: 2026-11-12
categories: ["GRC & Compliance"]
tags:
  - Patch Management
  - Microsoft Entra
  - Global Secure Access
  - Microsoft Defender for Identity
  - Microsoft Intune
  - Windows Update
  - PowerShell
  - ISO 27001
  - NIS2
# MITRE ATT&CK®: ονόματα στο data/mitre.yaml
mitre: ["M1051"]
---

Τα περισσότερα εργαλεία του Microsoft 365 Security ενημερώνονται μόνα τους στο cloud. Δεν ισχύει το ίδιο για όσα τρέχουν στους δικούς σου servers και στις δικές σου συσκευές: connectors, agents, sensors, clients και PowerShell modules. Κάποια ενημερώνονται αυτόματα, άλλα μόνο αν τα κατεβάσεις εσύ. Εδώ βλέπεις την τρέχουσα έκδοση του καθενός, τι αλλάζει στα Ελληνικά και πώς φτάνει η ενημέρωση. Η σελίδα ελέγχεται κάθε Κυριακή βράδυ, ώστε τη Δευτέρα το πρωί να ξέρεις τι πρέπει να κάνεις.

<!--tracker-->

## Πώς διαβάζεις τη σελίδα

**Τρέχουσα έκδοση.** Η νεότερη έκδοση που έχει δημοσιεύσει η Microsoft. Οι προηγούμενες είναι από κάτω, στο «Προηγούμενες εκδόσεις».

**Τρόπος διάθεσης.** Είναι το πιο σημαντικό πεδίο. «Αυτόματη ενημέρωση» σημαίνει ότι η έκδοση έρχεται μόνη της, αν δεν το έχεις απενεργοποιήσει. «Μόνο χειροκίνητη λήψη» σημαίνει ότι δεν θα τη δεις ποτέ αν δεν την κατεβάσεις εσύ από το admin center. Στα Windows updates βλέπεις αν η ενημέρωση θέλει restart: το Hotpatch εφαρμόζει τα security fixes χωρίς restart, εκτός από τον πρώτο μήνα κάθε τριμήνου (baseline). Στα PowerShell modules ενημερώνεις με `Update-Module`. Στα Intune security baselines η νέα έκδοση εμφανίζεται στο admin center, αλλά τα profiles σου μένουν στην παλιά μέχρι να τα αναβαθμίσεις.

**🆕 Νέα.** Η έκδοση βγήκε τις τελευταίες 14 ημέρες. Αυτές εμφανίζονται πάντα πρώτες, με τη νεότερη πρώτη.

**Τα CVE του Patch Tuesday.** Η σελίδα δείχνει ποιο update εφαρμόζεις, όχι ποιες ευπάθειες κλείνει. Τη λίστα τη βρίσκεις στο [MSRC Security Update Guide](https://msrc.microsoft.com/update-guide/). Όσες από αυτές αξιοποιούνται ήδη από επιτιθέμενους εμφανίζονται στη σελίδα [CISA KEV για Microsoft](/kev-microsoft/) και τις κλείνεις πρώτες.

## Πώς το χρησιμοποιείς στη συμμόρφωση

Ένα connector ή ένας sensor σε παλιά έκδοση είναι λογισμικό χωρίς τα τελευταία security fixes, μέσα στο δίκτυό σου. Η σελίδα σε βοηθά να το δεις και να το τεκμηριώσεις.

| Πλαίσιο | Απαίτηση | Πώς βοηθά η σελίδα |
|---|---|---|
| [ΚΥΑ 1689/2025](/kya-1689-2025/#17-γ) | 17.γ: εγκατάσταση ενημερώσεων ασφάλειας σε εύλογο χρόνο | Βλέπεις ποιες ενημερώσεις δεν έρχονται αυτόματα, ώστε να μπουν στον κύκλο ενημερώσεών σου. |
| [Οδηγία NIS2](/nis2/#21-2-ε) | Άρθρο 21.2.ε: ασφάλεια στην απόκτηση, ανάπτυξη και συντήρηση συστημάτων, με χειρισμό ευπαθειών | Τεκμηριώνει ότι παρακολουθείς τις εκδόσεις του λογισμικού ασφάλειας που τρέχει τοπικά. |
| [ISO/IEC 27001:2022](/iso-27001/#A-8-8) | A.8.8: διαχείριση τεχνικών ευπαθειών | Πηγή για το ποιες εκδόσεις περιέχουν security fixes και πρέπει να εφαρμοστούν. |
| [GDPR](/gdpr/#32-1-β) | Άρθρο 32.1.β: ακεραιότητα και διαθεσιμότητα των συστημάτων σε συνεχή βάση | Οι connectors και οι sync agents αγγίζουν ταυτότητες χρηστών. Η ενημέρωσή τους είναι μέρος της προστασίας των δεδομένων τους. |

Για τον έλεγχο: σημείωσε στο μητρώο assets την έκδοση που τρέχει κάθε connector και agent, και πότε την ενημέρωσες. Τα αντίστοιχα controls θα τα βρεις και στα checklists [ΚΥΑ 1689/2025](/downloads/nis2-kya-1689-2025-microsoft-365-checklist.xlsx), [NIS2](/downloads/nis2-directive-2022-2555-microsoft-365-checklist.xlsx), [ISO 27001](/downloads/iso-27001-2022-annex-a-microsoft-365-checklist.xlsx) και [GDPR](/downloads/gdpr-2016-679-microsoft-365-checklist.xlsx).

Στο MITRE ATT&CK® αυτό είναι το μέτρο {{< attack "M1051" >}}.

## Τι δεν καλύπτει η σελίδα

- **Windows Server, Windows 10 και εκδόσεις εκτός 24H2, 25H2 και 26H2.** Θα προστεθούν αργότερα.
- **Υπηρεσίες cloud.** Αλλαγές στο Microsoft Defender XDR, στο Entra ID ή στο Purview δεν έχουν αριθμό έκδοσης. Αυτές τις βρίσκεις στο [Release Status](/releases/) και στο εβδομαδιαίο τεύχος.
- **Microsoft Authenticator και Company Portal.** Η Microsoft δεν δημοσιεύει επίσημο ιστορικό εκδόσεων με τις αλλαγές τους, μόνο τα app stores.
- **Τι τρέχει σε κάθε δικό σου server.** Η σελίδα σου λέει ποια είναι η τρέχουσα έκδοση. Ποια έχεις εσύ το βλέπεις στο Microsoft Entra admin center, στο Microsoft Defender portal ή στο Intune admin center.

## Επίσημες πηγές {#last-verified}

{{< verification >}}

Η σελίδα δεν αποτελεί συμβουλή ασφάλειας. Το thecybersec.gr είναι προσωπικό blog και δεν εκπροσωπεί τη Microsoft ή την Εθνική Αρχή Κυβερνοασφάλειας.

{{< tool-link page="/kev-microsoft" lead="Επόμενο βήμα:" label="δες ποιες ευπάθειες Microsoft αξιοποιούνται ενεργά τώρα" tail="στον κατάλογο CISA KEV." >}}
