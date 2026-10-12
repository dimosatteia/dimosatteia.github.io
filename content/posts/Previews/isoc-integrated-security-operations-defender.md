---
title: "Preview: ISOC, το SIEM μπαίνει στο Microsoft Defender χωρίς Sentinel workspace"
seoTitle: "Preview: ISOC στο Microsoft Defender για Microsoft 365 E5"
date: 2026-10-12T12:30:00+03:00
lastmod: 2026-10-12T12:30:00+03:00
draft: false
keywords:
  - ISOC Microsoft Defender
  - Integrated Security Operations Center
  - Microsoft Defender SIEM
  - Microsoft 365 E5 SIEM
  - Microsoft Sentinel workspace
  - case management Defender
  - NIS2 incident handling
tags:
  - Microsoft Defender XDR
  - Microsoft Sentinel
  - Security Operations
  - SIEM
  - SOC
  - Incident Response
  - NIS2
  - ISO 27001
author: "Dimosthenis Atteia"
description: "Το Integrated Security Operations Center (ISOC) φέρνει δυνατότητες SIEM μέσα στο Microsoft Defender portal για όσους έχουν Microsoft 365 E5, E7 ή Defender Suite χωρίς Sentinel workspace. Τι περιλαμβάνεται, τι χρεώνεται και πώς το ξεκινάς."
seoDescription: "Το ISOC φέρνει SIEM στο Defender portal για Microsoft 365 E5, E7 και Defender Suite χωρίς Sentinel workspace. Τι περιλαμβάνεται και τι χρεώνεται."
summary: "Η Microsoft δίνει σε όσους έχουν Microsoft 365 E5 και δεν έχουν Sentinel ένα SIEM μέσα στο Defender portal, με 30 ημέρες διατήρηση για τα δεδομένα του Defender. Δες τι δουλεύει χωρίς workspace, τι θέλει workspace και Azure, και πού κρύβεται το κόστος."
categories: ["Security Operations & XDR"]
releases:
  - "preview"
ShowToc: true
TocOpen: false
cover:
  image: "https://learn.microsoft.com/en-us/defender-xdr/media/isoc-overview/integrated-security-operations-defender-home.png"
  alt: "Η αρχική σελίδα του Microsoft Defender portal με το banner των δυνατοτήτων ISOC"
  caption: "Πηγή εικόνας: Microsoft Learn"
  relative: false
---

Στις περισσότερες μεσαίες Ελληνικές εταιρείες που ξέρω, η κουβέντα για SIEM τελειώνει στο ίδιο σημείο: «έχουμε Microsoft 365 E5, τα δεδομένα του Defender τα βλέπουμε ήδη στο portal, γιατί να πληρώσουμε και Sentinel;». Και έχουν ένα δίκιο. Το Defender XDR καλύπτει πολύ καλά endpoints, email, ταυτότητες και cloud apps. Αυτό που λείπει είναι τα εργαλεία ενός SOC γύρω από αυτά τα δεδομένα: case management, playbooks, workbooks, UEBA.

Με το **Integrated Security Operations Center (ISOC)**, που είναι σε Preview από τις 23 Σεπτεμβρίου 2026, η Microsoft απαντά ακριβώς σε αυτό το κενό.

## Τι είναι το ISOC

Το ISOC συγκεντρώνει XDR, SIEM, threat intelligence, αυτοματισμό και AI σε μία εμπειρία μέσα στο Microsoft Defender portal. Η βασική ιδέα είναι ότι οι δυνατότητες SIEM είναι διαθέσιμες χωρίς να στήσεις πρώτα ένα παραδοσιακό SIEM. Ξεκινάς με τα δεδομένα του Defender που ήδη έχεις, και προσθέτεις workspace μόνο όταν χρειαστείς περισσότερα.

## Ποιος το δικαιούται

Το Preview είναι ανοιχτό σε οργανισμούς με **Microsoft Defender Suite**, **Microsoft 365 E5** ή **Microsoft 365 E7** που **δεν** έχουν ενεργό Microsoft Sentinel workspace.

Αν έχεις ήδη Sentinel, η Microsoft λέει ρητά να συνεχίσεις με αυτό. Και κάτι που αξίζει να ειπωθεί καθαρά: μην αποσυνδέσεις ένα Sentinel workspace που είναι σε παραγωγή μόνο και μόνο για να μπεις στο Preview.

## Τι δουλεύει χωρίς workspace και τι όχι

Αυτός ο πίνακας είναι το πιο σημαντικό κομμάτι της τεκμηρίωσης, γιατί εκεί κρύβεται και το κόστος:

| Δυνατότητα | Χρειάζεται workspace; |
|---|---|
| Case management | Όχι |
| Δημιουργία playbooks με φυσική γλώσσα | Όχι |
| Βελτιωμένοι automation rules | Όχι |
| Workbooks | Όχι |
| UEBA | Ναι |
| Content hub | Ναι |
| CI/CD (repositories) | Ναι |
| Threat intelligence | Ναι |
| Δεδομένα Azure και τρίτων | Ναι |

Χωρίς workspace έχεις δηλαδή τα εργαλεία οργάνωσης ενός SOC πάνω στα δεδομένα του Defender. Με workspace έχεις και τη συμπεριφορική ανάλυση, το περιεχόμενο του Content hub και τις πηγές εκτός Microsoft.

## Τι είναι δωρεάν και τι χρεώνεται

Στη φάση του Preview, οι οργανισμοί που το δικαιούνται παίρνουν **30 ημέρες διατήρηση για τα δεδομένα του Defender** χωρίς επιπλέον χρέωση. Τα δεδομένα αυτά δεν χρειάζονται ξεχωριστή εισαγωγή. Η τεκμηρίωση αναφέρει τις εξής πηγές:

- Microsoft Defender for Endpoint, Office 365, Identity, Cloud Apps και Cloud
- logs του Microsoft Entra ID Protection
- Azure Activity και audit logs, μέσω connector
- Office 365 Activity και audit logs, μέσω connector

Ό,τι άλλο, από τους περισσότερους από 500 data connectors, θέλει ISOC workspace και μπορεί να χρεώνεται ως ingestion. Η σελίδα του Microsoft Learn δεν δίνει τιμές, ούτε λέει τι γίνεται με διατήρηση πέρα από τις 30 ημέρες. Πριν συνδέσεις οτιδήποτε, διάβασε τη σελίδα χρεώσεων και κάνε έναν πρόχειρο υπολογισμό όγκου. Ένα firewall που στέλνει όλα του τα logs μπορεί να μετατρέψει το «δωρεάν SIEM» σε απρόβλεπτο λογαριασμό Azure μέσα σε μία εβδομάδα.

## Πώς ξεκινάς

1. **Χωρίς workspace.** Ξεκίνα απευθείας με case management, workbooks και δημιουργία playbooks. Δεν χρειάζεται τίποτα άλλο.
2. **Με workspace, αν το χρειάζεσαι.** Στο Defender portal πήγαινε στο **Settings → Microsoft Sentinel → SIEM workspaces** και επίλεξε **+ Create workspace**. Χρειάζεσαι ρόλο **Security Administrator** στο Microsoft Entra ID και, στη συνδρομή Azure, είτε **Owner** είτε **User Access Administrator** μαζί με **Microsoft Sentinel Contributor**. Το portal ελέγχει τα δικαιώματα, προτείνει resource group, όνομα και region, και δημιουργεί τους πόρους μέσα σε λίγα λεπτά.

Για την επιλογή region η τεκμηρίωση δεν δίνει οδηγία. Για Ελληνικό οργανισμό με υποχρεώσεις GDPR, η λογική επιλογή είναι region μέσα στην ΕΕ, και αυτό το καταγράφεις στο αρχείο σου.

## Πώς το βλέπω ως CISO

Για τις βασικές και σημαντικές οντότητες της ΚΥΑ 1689/2025 που δεν έχουν SIEM, το ISOC είναι η πρώτη φορά που η Microsoft δίνει κάτι σαν SIEM μέσα στο E5 χωρίς ξεχωριστή συνδρομή Sentinel. Αυτό δεν είναι μικρό πράγμα.

Υπάρχουν όμως τρία «αλλά». Πρώτον, είναι Preview, και η Microsoft σημειώνει ότι οι δυνατότητες και η διαθεσιμότητα μπορεί να αλλάξουν. Δεύτερον, οι 30 ημέρες διατήρησης είναι λίγες για έρευνα περιστατικού που ανακαλύπτεται αργά, και η ΚΥΑ ζητά τήρηση των καταγραφών για προκαθορισμένο χρόνο. Τρίτον, οι δικτυακές συσκευές και το OT θέλουν connectors, άρα workspace και κόστος.

Η σύστασή μου: δοκίμασέ το τώρα για να μάθει η ομάδα το case management και τα playbooks, αλλά μην το βάλεις ακόμα ως τεκμήριο σε έλεγχο και μην σχεδιάσεις τη διατήρηση των logs σου πάνω του μέχρι να γίνει GA.

## Σύνδεση με ΚΥΑ 1689/2025, NIS2, ISO 27001 και GDPR

- **ΚΥΑ 1689/2025 [24.α](/kya-1689-2025/#24-α), [24.δ](/kya-1689-2025/#24-δ) και [24.ε](/kya-1689-2025/#24-ε):** case management και playbooks για το πλάνο ανίχνευσης και απόκρισης, συλλογή και τήρηση των καταγραφών (με το όριο των 30 ημερών του Preview), και τακτικός έλεγχος των καταγραφών με workbooks και automation rules.
- **Οδηγία NIS2 [21.2.β](/nis2/#21-2-β):** χειρισμός περιστατικών σε ένα σημείο.
- **ISO/IEC 27001 [A.5.25](/iso-27001/#A-5-25), [A.5.26](/iso-27001/#A-5-26) και [A.8.16](/iso-27001/#A-8-16):** αξιολόγηση συμβάντων, απόκριση σε περιστατικά και monitoring activities.
- **GDPR [33.1](/gdpr/#33-1):** ένα οργανωμένο case με χρονολόγιο βοηθά να τεκμηριώσεις πότε έγινε αντιληπτή μια παραβίαση, που είναι το σημείο από το οποίο μετρούν οι 72 ώρες.

---

**Πηγές:** [ISOC in Microsoft Defender](https://learn.microsoft.com/en-us/defender-xdr/isoc-overview) · [Data ingestion and billing for ISOC](https://learn.microsoft.com/en-us/defender-xdr/integrated-security-operations-data-billing-retention) · [Create an ISOC workspace in the Microsoft Defender portal](https://learn.microsoft.com/en-us/defender-xdr/onboard-isoc-workspace) · [What's new in Microsoft Defender XDR](https://learn.microsoft.com/en-us/defender-xdr/whats-new). Το θέμα πρωτοεμφανίστηκε στο [Microsoft 365 Security: τι άλλαξε (εβδομάδα 40/2026)](/posts/weekly-security-update/microsoft-365-security-ti-allaxe-2026-w40/).

Τελευταίος έλεγχος στοιχείων: 12 Οκτωβρίου 2026.
