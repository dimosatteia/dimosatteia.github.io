---
title: "Generally Available: Move to quarantine, νέα ενέργεια αποκατάστασης για email στο Defender for Office 365"
seoTitle: "GA: Move to quarantine στο Defender for Office 365"
slug: "mdo-move-to-quarantine-remediation-action"
date: 2026-10-29T21:10:00+02:00
lastmod: 2026-10-29T21:10:00+02:00
draft: false
keywords:
  - Microsoft Defender for Office 365
  - Move to quarantine
  - MC1523084
  - email remediation Threat Explorer
  - quarantine policy admin-only
  - Search and Purge
  - phishing response playbook
tags:
  - Microsoft Defender for Office 365
  - Microsoft Defender XDR
  - Threat Explorer
  - Phishing
  - Incident Response
  - NIS2
  - ISO 27001
  - GRC
author: "Dimosthenis Atteia"
description: "Από τις αρχές Νοεμβρίου 2026 το Defender for Office 365 Plan 2 προσθέτει την ενέργεια Move to quarantine: τα email που έχουν ήδη παραδοθεί μεταφέρονται από τα mailboxes στο quarantine, όπου μένουν για έρευνα, release ή οριστική διαγραφή. Πώς δουλεύει και τι ρυθμίζεις πριν."
seoDescription: "Move to quarantine στο MDO Plan 2 από αρχές Νοεμβρίου 2026: μεταφέρει email από τα mailboxes στο quarantine. Πώς δουλεύει, ποιο policy, ποιοι ρόλοι."
summary: "Μέχρι τώρα, για ένα ύποπτο email που έφτασε ήδη στους χρήστες, είχες Junk, Deleted Items ή διαγραφή. Το Move to quarantine το βγάζει από τα mailboxes χωρίς να χαθεί, και αυτό αλλάζει το playbook για phishing."
categories: ["Email & Collaboration"]
releases:
  - "generally-available"
ShowToc: true
TocOpen: false
cover:
  image: "https://learn.microsoft.com/en-us/defender-office-365/media/microsoft-365-defender-threat-explorer-manual-remediation.png"
  alt: "Χειροκίνητη αναζήτηση και αποκατάσταση email στο Threat Explorer του Microsoft Defender portal"
  caption: "Πηγή εικόνας: Microsoft Learn"
  relative: false
# Πλαίσιο «Last verified»: κάθε χαρακτηριστικό με τη φάση, την άδεια, την πηγή και την ημερομηνία ελέγχου
verification:
  - feature: "MC1523084: ενέργεια Move to quarantine για email σε mailboxes, από αρχές Νοεμβρίου έως μέσα Δεκεμβρίου 2026"
    status: "Generally Available"
    license: "Defender for Office 365 Plan 2"
    source: "https://mc.merill.net/message/MC1523084"
    verified: 2026-10-29
  - feature: "Αποκατάσταση email που έχουν παραδοθεί: σημερινές ενέργειες, ρόλος Search and Purge, Action center"
    status: "Generally Available"
    license: "Defender for Office 365 Plan 2"
    source: "https://learn.microsoft.com/en-us/defender-office-365/remediate-malicious-email-delivered-office-365"
    verified: 2026-10-29
# MITRE ATT&CK®: ονόματα στο data/mitre.yaml
mitre: ["T1566", "T1566.001", "T1566.002", "T1534", "M1049"]
---

Ένα phishing email πέρασε τα φίλτρα και έφτασε σε 200 mailboxes. Το SOC το βρίσκει στο Threat Explorer μισή ώρα αργότερα. Τι κάνει; Μέχρι σήμερα οι επιλογές ήταν να το μετακινήσει στα Junk ή στα Deleted Items, όπου ο χρήστης μπορεί ακόμα να το ανοίξει, ή να το διαγράψει (soft ή hard delete), οπότε χάνεται η εύκολη πρόσβαση για έρευνα και για ένα πιθανό release αν ήταν false positive.

Η νέα ενέργεια **Move to quarantine** καλύπτει ακριβώς αυτό το κενό: βγάζει το μήνυμα από τα mailboxes και το βάζει στο quarantine του Defender, όπου μένει διαθέσιμο.

## Τι αλλάζει

Σύμφωνα με την ανακοίνωση MC1523084, που δημοσιεύθηκε στις 23 Οκτωβρίου 2026:

- **Φάση και ημερομηνίες:** Generally Available (Worldwide), με διάθεση από τις **αρχές Νοεμβρίου 2026** που αναμένεται να ολοκληρωθεί **έως τα μέσα Δεκεμβρίου 2026**.
- **Άδεια:** Microsoft Defender for Office 365 Plan 2, και οι συνδρομές Microsoft 365 που τον περιλαμβάνουν.
- **Πού εμφανίζεται:** Threat Explorer, advanced hunting, custom detection rules με αποτελέσματα email, email entity page και summary panel, και unified Action Center.
- **Τι κάνει:** αφαιρεί τα επιλεγμένα μηνύματα από τις θέσεις που βλέπει ο χρήστης (Inbox, Junk Email, Deleted Items) και από τα recoverable soft-deleted items, και τα βάζει στο quarantine.
- **Quarantine policy:** επιλέγεις ποιο quarantine policy εφαρμόζεται, και αυτό ορίζει τι μπορεί να κάνει ο χρήστης με το μήνυμα. Από προεπιλογή μόνο οι admins έχουν πρόσβαση.
- **Λόγος quarantine:** τα μηνύματα εμφανίζονται με λόγο **«Admin triggered»**.
- **Release:** όταν απελευθερωθεί, το μήνυμα πηγαίνει στο Inbox του χρήστη.
- **Έγκριση:** χρειάζεται ο ρόλος **Search and Purge**.
- **Μερική αποτυχία:** αν κάποια μηνύματα δεν μπορούν να μετακινηθούν, αναφέρεται, και όσα μπορούν προχωρούν κανονικά.

Τι **δεν** αλλάζει: οι υπάρχουσες ενέργειες (Move to Junk, Move to Deleted Items, Soft delete, Hard delete), τα verdicts, οι ροές έγκρισης, τα AIR actions και οι δυνατότητες του Microsoft Graph API. Μηνύματα σε hard-deleted items, σε on-premises ή σε εξωτερικά mailboxes δεν καλύπτονται.

Η ανακοίνωση σημειώνει ότι η αλλαγή επηρεάζει τον τρόπο που επεξεργάζονται τα δεδομένα των πελατών και τον τρόπο που οι χρήστες έχουν πρόσβαση στα δικά τους δεδομένα. Το Microsoft Learn δεν περιγράφει ακόμη τη νέα ενέργεια. Η σελίδα για την αποκατάσταση email δείχνει τις σημερινές ενέργειες.

## Πώς ταιριάζει με όσα ήδη ξέρεις

Η σελίδα του Microsoft Learn για την αποκατάσταση email που έχουν παραδοθεί εξηγεί το πλαίσιο που παραμένει ίδιο:

- **Δικαιώματα:** οι admins μπορούν να προτείνουν ενέργειες, αλλά για την έγκριση χρειάζεται ο ρόλος **Search and Purge**. Με Unified RBAC αυτό είναι το **Security operations/Security data/Email & collaboration advanced actions (manage)**. Χωρίς Unified RBAC, οι role groups **Organization Management** ή **Data Investigator**, ή custom role group με Search and Purge.
- **Ιχνηλασιμότητα:** κάθε αποκατάσταση δημιουργεί alert «Administrative action submitted by an Administrator» και καταγράφεται στο **Action center** → **History**, που κρατά 30 ημέρες.
- **Όρια:** έως 50 ταυτόχρονες αποκαταστάσεις ανά οργανισμό και καλύτερα σε παρτίδες έως 50.000 μηνυμάτων. Η ενεργοποιημένη **Automated Investigation** είναι προϋπόθεση.

Πρακτικά, το Move to quarantine γίνεται η λογική πρώτη κίνηση όταν δεν είσαι ακόμη σίγουρος: το μήνυμα φεύγει από τους χρήστες αμέσως, αλλά το κρατάς για ανάλυση, για τεκμήριο και για release αν αποδειχθεί καθαρό. Το hard delete μένει για όταν είσαι βέβαιος.

## Τι κάνεις τώρα

1. **Διάλεξε quarantine policy για το SOC.** Στο Microsoft Defender portal, **Email & collaboration** → **Policies & rules** → **Threat policies** → **Quarantine policies** (ενότητα **Rules**, ή απευθείας https://security.microsoft.com/quarantinePolicies). Για αυτή τη χρήση ταιριάζει ένα policy όπου μόνο οι admins έχουν πρόσβαση, όπως το AdminOnlyAccessPolicy. Αν θέλεις να ειδοποιούνται οι χρήστες, φτιάξε δικό σου με quarantine notifications.
2. **Έλεγξε ποιοι εγκρίνουν.** Με Unified RBAC: **Permissions and roles** (https://security.microsoft.com/mtp_roles), ποιοι ρόλοι έχουν **Email & collaboration advanced actions (manage)**. Χωρίς Unified RBAC: ποιοι είναι στα Organization Management, Data Investigator ή σε role group με Search and Purge.
3. **Έλεγξε ότι η Automated Investigation είναι ενεργή** στο https://security.microsoft.com/securitysettings/endpoints/integration.
4. **Ενημέρωσε το playbook για phishing.** Πρόσθεσε το Move to quarantine ως πρώτη ενέργεια για μηνύματα που δεν έχουν επιβεβαιωθεί, και όρισε πότε ακολουθεί hard delete.
5. **Ενημέρωσε το help desk** ότι μηνύματα με λόγο «Admin triggered» στο quarantine είναι ενέργεια του SOC, και πώς ζητά ο χρήστης release.
6. **Όταν εμφανιστεί η ενέργεια**, δοκίμασέ τη σε ένα δοκιμαστικό μήνυμα από το Threat Explorer → **Take action** και δες την καταγραφή στο Action center → **History**.

Για να βρεις μηνύματα που έφτασαν σε mailboxes και τα έπιασε αργότερα το ZAP, δες το query **[Phishing που παραδόθηκε και αφαιρέθηκε εκ των υστέρων (ZAP)](/kql/#phish-zap)** της Βιβλιοθήκης KQL.

> 📖 **Θέλεις όλη την εικόνα;** Preset policies, Safe Links, Safe Attachments και quarantine στην πράξη: **[Microsoft Defender for Office 365: Από τις preset policies στην προχωρημένη παραμετροποίηση](/posts/microsoft-defender-up-close-series/microsoft-defender-for-office-365-deep-dive/)**.

## Σύνδεση με ΚΥΑ 1689/2025, NIS2, ISO 27001 και GDPR

- **ΚΥΑ 1689/2025 [20.γ](/kya-1689-2025/#20-γ):** φιλτράρισμα και έλεγχος των μηνυμάτων ηλεκτρονικού ταχυδρομείου για κακόβουλο περιεχόμενο, και μετά την παράδοση. **[24.α](/kya-1689-2025/#24-α):** η ενέργεια μπαίνει στη διαδικασία διαχείρισης περιστατικών. **[24.δ](/kya-1689-2025/#24-δ):** το μήνυμα στο quarantine μένει διαθέσιμο ως στοιχείο, με πρόσβαση μόνο για admins.
- **Οδηγία NIS2 [21.2.β](/nis2/#21-2-β):** χειρισμός περιστατικών.
- **ISO/IEC 27001 [A.8.7](/iso-27001/#A-8-7), [A.5.26](/iso-27001/#A-5-26) και [A.5.28](/iso-27001/#A-5-28):** protection against malware, response to information security incidents και collection of evidence.
- **GDPR [32.1.β](/gdpr/#32-1-β) και [33.5](/gdpr/#33-5):** προστασία του απορρήτου των mailboxes και τεκμηρίωση κάθε περιστατικού. Αν ένα phishing οδήγησε σε παραβίαση, το μήνυμα στο quarantine στηρίζει την τεκμηρίωση.

Τεκμήρια για τον ελεγκτή: το playbook για phishing με τη σειρά των ενεργειών, η ρύθμιση του quarantine policy που χρησιμοποιεί το SOC, η λίστα όσων εγκρίνουν αποκαταστάσεις, και εξαγωγές από το Action center → History για τα περιστατικά.

---

## Πηγές και επαλήθευση {#last-verified}

{{< verification >}}

Επιπλέον πηγές: [Remediate malicious email delivered in Office 365](https://learn.microsoft.com/en-us/defender-office-365/remediate-malicious-email-delivered-office-365) · [Unified RBAC permissions for Microsoft Defender for Office 365](https://learn.microsoft.com/en-us/defender-office-365/defender-office-365-unified-rbac-permissions) · [Configure quarantine policies](https://learn.microsoft.com/en-us/defender-office-365/quarantine-policies) · Message Center MC1523084 (23 Οκτωβρίου 2026), όπως αρχειοθετείται στο mc.merill.net. Η νέα ενέργεια, η άδεια και οι ημερομηνίες προέρχονται μόνο από την ανακοίνωση. Οι ανακοινώσεις διαφέρουν ανά tenant, οπότε δες την στο δικό σου Message Center.

Το θέμα πρωτοεμφανίστηκε στο [Microsoft 365 Security: τι άλλαξε (εβδομάδα 44/2026)](/posts/weekly-security-update/microsoft-365-security-ti-allaxe-2026-w44/).

Τελευταίος έλεγχος στοιχείων: 29 Οκτωβρίου 2026.
