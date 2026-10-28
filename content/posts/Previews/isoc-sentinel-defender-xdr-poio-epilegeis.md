---
title: "Preview: ISOC, Sentinel ή μόνο Defender XDR; Ποιο ταιριάζει στον οργανισμό σου"
seoTitle: "ISOC, Sentinel ή Defender XDR: ποιο ταιριάζει σε σένα"
date: 2026-10-28T17:30:00+02:00
lastmod: 2026-10-28T17:30:00+02:00
draft: false
homeHighlight: true
keywords:
  - ISOC vs Sentinel
  - ISOC Microsoft Defender
  - Microsoft Sentinel ή Defender XDR
  - Defender XDR retention 30 ημέρες
  - Microsoft Sentinel data lake retention
  - Project Perception ISOC
  - SIEM Microsoft 365 E5
  - ΚΥΑ 1689/2025 καταγραφές
tags:
  - Microsoft Defender XDR
  - Microsoft Sentinel
  - Project Perception
  - Security Operations
  - SIEM
  - SOC
  - Incident Response
  - NIS2
  - ISO 27001
author: "Dimosthenis Atteia"
description: "Το ISOC δίνει SIEM μέσα στο Defender portal, αλλά δεν είναι για όλους. Σύγκριση Defender XDR, ISOC και Microsoft Sentinel σε άδεια, δεδομένα και διατήρηση logs, πού κάθεται το Project Perception, τι αναμένεται τον Νοέμβριο και πώς διαλέγεις με βάση την ΚΥΑ 1689/2025."
seoDescription: "Defender XDR, ISOC ή Microsoft Sentinel: σύγκριση σε άδεια, δεδομένα και διατήρηση logs, ο ρόλος του Project Perception και πώς διαλέγεις με βάση την ΚΥΑ 1689/2025."
summary: "Έχεις Microsoft 365 E5 και αναρωτιέσαι αν φτάνει το Defender XDR, αν σου κάνει το ISOC ή αν χρειάζεσαι Sentinel. Η απάντηση κρύβεται κυρίως σε δύο ερωτήσεις: πόσο καιρό πρέπει να κρατάς τα logs και από πού έρχονται."
categories: ["Security Operations & XDR"]
releases:
  - "preview"
ShowToc: true
TocOpen: false
cover:
  image: "/images/isoc-defender-home-tenant.webp"
  alt: "Η αρχική σελίδα του Microsoft Defender portal με το banner του ISOC, σε πραγματικό tenant"
  caption: "Το ISOC στην αρχική σελίδα του Microsoft Defender portal, από τον δικό μου tenant"
# Πλαίσιο «Last verified»: κάθε χαρακτηριστικό με τη φάση, την άδεια, την πηγή και την ημερομηνία ελέγχου
verification:
  - feature: "ISOC στο Microsoft Defender, μόνο για οργανισμούς χωρίς ενεργό Sentinel workspace"
    status: "Public Preview"
    license: "Defender Suite, Microsoft 365 E5 ή E7"
    source: "https://learn.microsoft.com/en-us/defender-xdr/isoc-overview"
    verified: 2026-10-28
  - feature: "ISOC: 30 ημέρες διατήρηση για δεδομένα Defender σε αυτή τη φάση του preview"
    status: "Public Preview"
    license: "Defender Suite, Microsoft 365 E5 ή E7"
    source: "https://learn.microsoft.com/en-us/defender-xdr/integrated-security-operations-data-billing-retention"
    verified: 2026-10-28
  - feature: "Defender XDR: 180 ημέρες διατήρηση στο portal, 30 ημέρες στο Advanced hunting"
    status: "Generally Available"
    license: "Microsoft Defender XDR (Microsoft 365 E5 ή αντίστοιχο)"
    source: "https://learn.microsoft.com/en-us/defender-xdr/data-privacy#data-retention"
    verified: 2026-10-28
  - feature: "Microsoft Sentinel: XDR tables έως 90 ημέρες, analytics tier έως 2 έτη, data lake έως 12 έτη"
    status: "Generally Available"
    license: "Microsoft Sentinel, χρέωση στο Azure"
    source: "https://learn.microsoft.com/en-us/azure/sentinel/manage-data-overview"
    verified: 2026-10-28
  - feature: "Project Perception (Limited Public Preview, μόνο με πρόσκληση)"
    status: "Public Preview"
    license: "Δεν αναφέρεται"
    source: "https://learn.microsoft.com/en-us/security/agentic-security/agentic-security-overview"
    verified: 2026-10-28
# MITRE ATT&CK®: ονόματα στο data/mitre.yaml
mitre: ["M1047"]
---

Στο [προηγούμενο άρθρο για το ISOC](/posts/previews/isoc-integrated-security-operations-defender/) είδαμε τι είναι, ποιος το δικαιούται, τι δουλεύει χωρίς workspace και πού κρύβεται το κόστος. Αν δεν το έχεις διαβάσει, ξεκίνα από εκεί.

Μετά από εκείνο το άρθρο, η ερώτηση που άκουσα πιο συχνά ήταν πιο πρακτική: «Εντάξει, και τελικά τι κάνω; Μένω στο Defender XDR, πάω στο ISOC ή χρειάζομαι Sentinel;». Αυτό το άρθρο απαντά σε αυτό.

## Οι τρεις δρόμοι με μια ματιά

| | Μόνο Defender XDR | ISOC στο Defender (Preview) | Microsoft Sentinel |
|---|---|---|---|
| Τι είναι | Προϊόν XDR | Benefit πάνω στην άδεια, όχι νέο προϊόν | SIEM, ξεχωριστή χρέωση στο Azure |
| Ποιος το έχει | Όποιος έχει άδεια Defender | Defender Suite, Microsoft 365 E5 ή E7 χωρίς ενεργό Sentinel workspace | Οποιοσδήποτε με Azure subscription |
| Workbooks και playbooks με φυσική γλώσσα | Όχι, μόνο το incidents queue | Ναι, χωρίς workspace | Ναι |
| UEBA, Content hub, threat intelligence | Όχι | Ναι, με ISOC workspace | Ναι |
| Δεδομένα εκτός Microsoft | Όχι | Ναι, με ISOC workspace και πιθανή χρέωση ingestion | Ναι, με χρέωση ingestion |
| Ερωτήματα KQL στα δεδομένα του Defender | 30 ημέρες | 30 ημέρες σε αυτή τη φάση | Έως 90 ημέρες για τα XDR tables, έως 2 έτη στο analytics tier, έως 12 έτη στο data lake |

Η τελευταία γραμμή είναι αυτή που κρίνει τις περισσότερες αποφάσεις.

## Η διατήρηση: εκεί κρύβεται η απόφαση

Εδώ γίνεται συχνά ένα λάθος. Το Defender XDR κρατά τα δεδομένα του για **180 ημέρες** και τα δείχνει στο portal. Στο **Advanced hunting** όμως, δηλαδή εκεί που τρέχεις KQL για να ερευνήσεις ένα περιστατικό, τα δεδομένα είναι διαθέσιμα μόνο για **30 ημέρες**. Το ISOC, σε αυτή τη φάση του preview, δίνει επίσης **30 ημέρες** διατήρηση για τα δεδομένα του Defender.

Σκέψου τι σημαίνει αυτό στην πράξη. Ένα περιστατικό που ανακαλύπτεται 45 ημέρες μετά την πρώτη πρόσβαση του επιτιθέμενου δεν μπορεί να ερευνηθεί πλήρως με KQL ούτε στο Defender XDR ούτε στο ISOC όπως είναι σήμερα. Το πρώτο phishing email, το πρώτο ύποπτο sign-in, η πρώτη κίνηση στο δίκτυο έχουν ήδη βγει από το παράθυρο.

Το Microsoft Sentinel λύνει αυτό το πρόβλημα με κόστος. Τα XDR tables επεκτείνονται έως τις 90 ημέρες με χρέωση ingestion και χωρίς χρέωση αποθήκευσης. Πέρα από αυτό, το analytics tier φτάνει τα 2 έτη και το data lake τα 12 έτη, με χαμηλότερο κόστος αλλά χωρίς real-time analytics.

Η ΚΥΑ 1689/2025 ζητά συλλογή και τήρηση των καταγραφών για **προκαθορισμένο χρόνο** ([24.δ](/kya-1689-2025/#24-δ)). Δεν ορίζει η ίδια πόσο. Το ορίζεις εσύ στην πολιτική σου. Αν η πολιτική σου λέει 12 μήνες, ούτε το Defender XDR ούτε το ISOC του σημερινού preview την καλύπτουν μόνα τους για τα δεδομένα του Defender. Για τα logs του Microsoft 365 υπάρχει και το Microsoft Purview Audit, που με Microsoft 365 E5 κρατά 1 έτος, αλλά αυτό είναι άλλη πηγή και άλλο εργαλείο.

## Αν έχεις ήδη Sentinel

Σε αυτή τη φάση το ISOC δεν είναι για σένα. Η Microsoft το λέει ρητά: συνέχισε με το Sentinel και μην αποσυνδέσεις workspace που είναι σε παραγωγή για να μπεις στο preview.

Υπάρχει όμως μια ημερομηνία που σε αφορά έτσι κι αλλιώς. Μετά τις **31 Μαρτίου 2027**, το Microsoft Sentinel δεν θα υποστηρίζεται πια στο Azure portal και θα είναι διαθέσιμο μόνο στο Defender portal. Αν το Sentinel σου τρέχει ακόμα στο Azure portal, η μεταφορά στο Defender portal είναι η σωστή προετοιμασία, γιατί εκεί ζει και το ISOC.

## Πού κάθεται το Project Perception

Στην τεκμηρίωση της Microsoft, ένα από τα τρία πλεονεκτήματα του ISOC είναι το «Path for agentic security»: οι ομάδες ασφαλείας και οι agents του [Project Perception](/posts/previews/project-perception-agentic-security-explained/) δουλεύουν πάνω στα ίδια signals, το ίδιο context και τα ίδια workflows. Με απλά λόγια, το ISOC είναι το έδαφος και το Perception οι agents που θα πατήσουν πάνω του.

Δύο πράγματα πρέπει να ξέρεις. Πρώτον, το Perception είναι σε **Limited Public Preview**, διαθέσιμο μόνο με πρόσκληση σε μικρό αριθμό πελατών. Δεύτερον, και αυτό είναι το ενδιαφέρον για όποιον δουλεύει GRC, η Microsoft περιγράφει κάθε session των agents ως **αμετάβλητο αρχείο** που λειτουργεί ως audit trail: τι ζητήθηκε, τι έκανε ο agent, τι εγκρίθηκε και τι παρήχθη. Όταν ο ελεγκτής ρωτήσει «ποιος πήρε αυτή την απόφαση;», αυτή είναι η απάντηση που θα χρειαστείς.

## Τι αναμένεται τον Νοέμβριο

Τρίτες πηγές, όπως το [Modern Security](https://www.modernsecurity.nl/microsoft-isoc-defender-vs-sentinel/) και η [WWT](https://www.wwt.com/blog/paving-the-way-for-frontier-security-microsofts-integrated-soc-isoc-arrives-in-defender), αναφέρουν τρεις αλλαγές:

- η διατήρηση των δεδομένων του Defender στο ISOC ανεβαίνει από 30 σε **90 ημέρες**,
- οι πελάτες με Sentinel μπαίνουν στο ISOC από τις **15 Νοεμβρίου 2026**,
- τα δεδομένα εκτός Microsoft στο ISOC workspace χρεώνονται **$2.40/GB**.

Στις 28 Οκτωβρίου 2026 κανένα από αυτά δεν εμφανίζεται στο Microsoft Learn. Η σελίδα του ISOC μιλά ακόμα για 30 ημέρες και για οργανισμούς χωρίς Sentinel. Γι' αυτό δεν τα βάζω στον πίνακα ούτε στον σχεδιασμό σου. Το Microsoft Ignite τον Νοέμβριο είναι το πιθανότερο σημείο επιβεβαίωσης, και θα ενημερώσω το άρθρο όταν η Microsoft τα επιβεβαιώσει.

## Ποιο επιλέγεις

1. **Μένεις στο Defender XDR** αν είσαι μικρός οργανισμός χωρίς SOC, τα δεδομένα σου είναι σχεδόν όλα Microsoft, και η πολιτική σου για τις καταγραφές καλύπτεται από τις 180 ημέρες του portal μαζί με το Purview Audit. Δεν χρειάζεσαι case management ή workbooks που δεν θα χρησιμοποιήσει κανείς.
2. **Δοκιμάζεις το ISOC** αν έχεις E5, E7 ή Defender Suite, δεν έχεις Sentinel, και θέλεις να μάθει η ομάδα σου το case management, τα workbooks και τα playbooks χωρίς ξεχωριστή συνδρομή. Δοκιμάζεις, δεν χτίζεις ακόμα πάνω του την τήρηση των logs.
3. **Πας σε Sentinel** αν η πολιτική σου ζητά διατήρηση πάνω από 30 ημέρες για KQL έρευνα, αν πρέπει να φέρεις logs από firewalls, δικτυακές συσκευές ή OT, ή αν ο έλεγχος θα ζητήσει τεκμήριο για τήρηση καταγραφών από ένα σύστημα σε GA σήμερα.

## Πώς το βλέπω ως CISO

Το ISOC είναι η σωστή κατεύθυνση. Βάζει τα εργαλεία ενός SOC εκεί που ήδη δουλεύει ο αναλυτής, χωρίς να ξεκινάς από την αρχιτεκτονική ενός SIEM. Για πολλές Ελληνικές οντότητες της ΚΥΑ 1689/2025 που δεν είχαν ποτέ SIEM, είναι η πρώτη φορά που αυτό είναι διαθέσιμο μέσα στην άδεια που ήδη πληρώνουν.

Η απόφαση όμως δεν παίρνεται με βάση το τι είναι δωρεάν. Παίρνεται με βάση την πολιτική καταγραφών σου. Γράψε πρώτα πόσο καιρό κρατάς τι, και από ποιες πηγές. Μετά δες ποιος από τους τρεις δρόμους το καλύπτει σήμερα. Αν η απάντηση είναι «το ISOC, αν επιβεβαιωθούν οι 90 ημέρες», τότε η απάντηση για σήμερα είναι «όχι ακόμα».

## Σύνδεση με ΚΥΑ 1689/2025, NIS2, ISO 27001 και GDPR

- **ΚΥΑ 1689/2025 [24.δ](/kya-1689-2025/#24-δ):** η επιλογή ανάμεσα σε Defender XDR, ISOC και Sentinel καθορίζει πόσο καιρό τηρούνται οι καταγραφές και πόσο εύκολα ερευνώνται. **[24.α](/kya-1689-2025/#24-α):** case management και playbooks για το πλάνο ανίχνευσης και απόκρισης. **[24.ε](/kya-1689-2025/#24-ε):** τακτικός έλεγχος των καταγραφών με workbooks, automation rules και, μελλοντικά, agents.
- **Οδηγία NIS2 [21.2.β](/nis2/#21-2-β):** χειρισμός περιστατικών, που απαιτεί δεδομένα διαθέσιμα για όσο διαρκεί η έρευνα.
- **ISO/IEC 27001 [A.8.15](/iso-27001/#A-8-15), [A.8.16](/iso-27001/#A-8-16), [A.5.25](/iso-27001/#A-5-25) και [A.5.26](/iso-27001/#A-5-26):** logging, monitoring activities, αξιολόγηση συμβάντων και απόκριση σε περιστατικά.
- **GDPR [33.1](/gdpr/#33-1):** για να τεκμηριώσεις πότε έγινε αντιληπτή μια παραβίαση, χρειάζεσαι logs που καλύπτουν όλο το διάστημα από την πρώτη πρόσβαση.

Τεκμήρια για τον ελεγκτή: η πολιτική καταγραφών με τον ορισμένο χρόνο τήρησης ανά πηγή, η καταγεγραμμένη απόφαση για Defender XDR, ISOC ή Sentinel με την αιτιολόγηση, και screenshot των ρυθμίσεων retention στο Defender portal ή στο workspace.

> 📖 **Τα βασικά του ISOC:** **[Preview: ISOC, το SIEM μπαίνει στο Microsoft Defender χωρίς Sentinel workspace](/posts/previews/isoc-integrated-security-operations-defender/)**.

> 📖 **Οι agents που έρχονται:** **[Project Perception: Το Agentic Security System της Microsoft](/posts/previews/project-perception-agentic-security-explained/)**.

---

## Πηγές και επαλήθευση {#last-verified}

{{< verification >}}

Επιπλέον πηγές: [ISOC in Microsoft Defender](https://learn.microsoft.com/en-us/defender-xdr/isoc-overview) · [Data ingestion and billing for ISOC](https://learn.microsoft.com/en-us/defender-xdr/integrated-security-operations-data-billing-retention) · [Data security and retention in Microsoft Defender XDR](https://learn.microsoft.com/en-us/defender-xdr/data-privacy) · [Manage data tiers and retention in Microsoft Sentinel](https://learn.microsoft.com/en-us/azure/sentinel/manage-data-overview) · [Log retention tiers in Microsoft Sentinel](https://learn.microsoft.com/en-us/azure/sentinel/log-plans) · [What is Project Perception?](https://learn.microsoft.com/en-us/security/agentic-security/agentic-security-overview) · [Application card for Project Perception](https://learn.microsoft.com/en-us/security/agentic-security/agentic-security-application-card). Για τις αλλαγές του Νοεμβρίου, που δεν έχουν επιβεβαιωθεί από τη Microsoft: [Modern Security](https://www.modernsecurity.nl/microsoft-isoc-defender-vs-sentinel/) · [WWT](https://www.wwt.com/blog/paving-the-way-for-frontier-security-microsofts-integrated-soc-isoc-arrives-in-defender). Για μια σύντομη εικόνα του πού κάθεται κάθε λύση της Microsoft: [Accelerating Defense with Microsoft Security Solutions, John Savill](https://www.youtube.com/watch?v=dSODQy9bWjU).

Τελευταίος έλεγχος στοιχείων: 28 Οκτωβρίου 2026.
