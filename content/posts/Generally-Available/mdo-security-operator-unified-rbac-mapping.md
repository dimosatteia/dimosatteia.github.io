---
title: "Generally Available: Ο Security Operator χάνει τις πολιτικές του Defender for Office 365 στο Unified RBAC"
seoTitle: "GA: Security Operator χωρίς πολιτικές MDO στο Unified RBAC"
slug: "mdo-security-operator-unified-rbac-mapping"
date: 2026-10-29T21:05:00+02:00
lastmod: 2026-10-29T21:05:00+02:00
draft: false
keywords:
  - Microsoft Defender for Office 365
  - Security Operator Unified RBAC
  - MC1486293
  - Tenant Allow/Block List δικαιώματα
  - threat policies Defender for Office 365
  - Core security settings Detection tuning
  - least privilege SOC
tags:
  - Microsoft Defender for Office 365
  - Microsoft Defender XDR
  - Unified RBAC
  - Microsoft Entra ID
  - Least Privilege
  - NIS2
  - ISO 27001
  - GRC
author: "Dimosthenis Atteia"
description: "Από τις αρχές Νοεμβρίου 2026, σε tenants με Unified RBAC, ο ρόλος Security Operator δεν θα διαχειρίζεται πια τα threat policies και το Tenant Allow/Block List του Defender for Office 365. Ποιους αφορά, τι δικαιώματα δίνεις στη θέση του και πώς το τεκμηριώνεις."
seoDescription: "Ο Security Operator χάνει threat policies και Tenant Allow/Block List στο Unified RBAC του MDO από αρχές Νοεμβρίου 2026. Τι ελέγχεις, τι δίνεις στη θέση του."
summary: "Μια αλλαγή στην αντιστοίχιση ενός ρόλου του Entra που μπορεί να αφήσει το SOC χωρίς πρόσβαση στις πολιτικές email την ώρα που τη χρειάζεται. Δες ποιους αφορά και πώς τη μετατρέπεις σε σωστό διαχωρισμό καθηκόντων."
categories: ["Email & Collaboration"]
releases:
  - "generally-available"
ShowToc: true
TocOpen: false
cover:
  image: "https://learn.microsoft.com/en-us/defender-office-365/media/configure-unified-rbac-defender-office-365-security-operations-details-flyout.png"
  alt: "Το flyout της ομάδας δικαιωμάτων Security operations στον οδηγό δημιουργίας custom role του Unified RBAC στο Microsoft Defender portal"
  caption: "Πηγή εικόνας: Microsoft Learn"
  relative: false
# Πλαίσιο «Last verified»: κάθε χαρακτηριστικό με τη φάση, την άδεια, την πηγή και την ημερομηνία ελέγχου
verification:
  - feature: "MC1486293: ο Security Operator χάνει από προεπιλογή threat policies και Tenant Allow/Block List στο Unified RBAC του Defender for Office 365, από αρχές Νοεμβρίου έως αρχές Δεκεμβρίου 2026"
    status: "Generally Available"
    license: "Defender for Office 365 με ενεργό Unified RBAC (η άδεια δεν αναφέρεται στην ανακοίνωση)"
    source: "https://mc.merill.net/message/MC1486293"
    verified: 2026-10-29
  - feature: "Unified RBAC για Defender for Office 365: δικαιώματα Core security settings και Detection tuning ανά εργασία"
    status: "Generally Available"
    license: "Defender for Office 365 Plan 2 για τη ρύθμιση του Unified RBAC"
    source: "https://learn.microsoft.com/en-us/defender-office-365/defender-office-365-unified-rbac-permissions"
    verified: 2026-10-29
# MITRE ATT&CK®: ονόματα στο data/mitre.yaml
mitre: ["T1685", "T1078.004", "M1026", "M1018"]
---

Ο ρόλος **Security Operator** του Microsoft Entra είναι σε πολλά tenants ο «ρόλος του SOC»: ο analyst απαντά σε alerts, απελευθερώνει μηνύματα από το quarantine και, όταν χρειάζεται, βάζει ένα domain στο block list ή αλλάζει ένα anti-phishing policy. Αυτό το τελευταίο αλλάζει. Σε tenants με Unified RBAC, ο Security Operator δεν θα έχει πια από προεπιλογή πρόσβαση στις πολιτικές προστασίας του email.

Αν το SOC σου βασίζεται μόνο σε αυτόν τον ρόλο, θα το ανακαλύψει την ώρα μιας καμπάνιας phishing, όταν θα προσπαθήσει να μπλοκάρει έναν αποστολέα και δεν θα μπορεί.

## Τι αλλάζει

Σύμφωνα με την ανακοίνωση MC1486293, που δημοσιεύθηκε στις 2 Οκτωβρίου 2026, αλλάζει η προεπιλεγμένη αντιστοίχιση του Security Operator στο Unified RBAC του Microsoft Defender for Office 365. Όταν εφαρμοστεί, ο ρόλος **χάνει από προεπιλογή**:

| Περιοχή | Τι δεν θα μπορεί να κάνει ο Security Operator |
|---|---|
| **Threat policies** | Να δημιουργεί, να βλέπει, να αλλάζει ή να διαγράφει anti-spam, anti-phishing, anti-malware, Safe Links, Safe Attachments και preset policies |
| **Tenant Allow/Block List** | Να βλέπει ή να αλλάζει εγγραφές |

Η αλλαγή είναι Generally Available για Worldwide, GCC, GCC High και DoD. Η διάθεση ξεκινά **στις αρχές Νοεμβρίου 2026** και αναμένεται να ολοκληρωθεί **έως τις αρχές Δεκεμβρίου 2026**, σύμφωνα με την ανακοίνωση. Η ανακοίνωση δεν αναφέρει συγκεκριμένη άδεια. Αφορά οργανισμούς που έχουν ή θα ενεργοποιήσουν Unified RBAC για το Defender for Office 365.

Τι **δεν** αλλάζει, σύμφωνα με την ανακοίνωση: tenants χωρίς Unified RBAC, οι υπόλοιπες αντιστοιχίσεις ρόλων και η εξουσιοδότηση στο Exchange Online PowerShell.

## Γιατί σε αφορά, ακόμα κι αν δεν ενεργοποίησες Unified RBAC

Δύο σημεία κάνουν την αλλαγή πιο πλατιά απ' όσο δείχνει:

- **Το Unified RBAC έρχεται και χωρίς να το ζητήσεις.** Με την ανακοίνωση [MC1457836](https://mc.merill.net/message/MC1457836) η Microsoft ενεργοποιεί σταδιακά το Unified RBAC σε tenants από τα τέλη Σεπτεμβρίου έως τα τέλη Δεκεμβρίου 2026, περίπου 30 ημέρες μετά από ένα banner στο Defender portal. Και για νέους οργανισμούς με Defender for Office 365 Plan 2 είναι ήδη η προεπιλογή από τον Ιούλιο 2026.
- **Το Microsoft Learn δεν έχει ενημερωθεί ακόμη.** Ο οδηγός για το Unified RBAC γράφει ότι ο Security Operator έχει «Policy management, response actions, metadata read». Μέχρι να αλλάξει, η ανακοίνωση στο Message Center σου είναι η πηγή για το τι θα ισχύει.

Από την πλευρά της ασφάλειας, η αλλαγή είναι σωστή. Ένας λογαριασμός που μπορεί να προσθέσει allow entry στο Tenant Allow/Block List ή να χαλαρώσει ένα anti-phishing policy μπορεί να ανοίξει τον δρόμο σε μια καμπάνια. Είναι ακριβώς αυτό που θα ήθελε ένας επιτιθέμενος που απέκτησε πρόσβαση σε λογαριασμό του SOC. Το ερώτημα είναι αν θα χαθεί πρόσβαση που χρειάζεσαι χωρίς να το ξέρεις.

## Ποια δικαιώματα δίνεις στη θέση του

Η σελίδα του Microsoft Learn για τα δικαιώματα του Unified RBAC στο Defender for Office 365 δίνει την αντιστοίχιση:

| Εργασία | Δικαίωμα στο Unified RBAC |
|---|---|
| Προβολή threat policies | Core security settings (read) |
| Αλλαγή threat policies | Core security settings (manage) |
| Προβολή εγγραφών Tenant Allow/Block List | Core security settings (read) |
| Προσθήκη, αλλαγή, διαγραφή εγγραφών Tenant Allow/Block List | Detection tuning (manage) |

Η ανακοίνωση προτείνει τα **Core security settings** και **Detection tuning**, ή ρόλο που τα περιλαμβάνει, όπως ο Security Administrator. Ο Security Administrator όμως δίνει πλήρη πρόσβαση σε πολλά προϊόντα. Για ένα SOC μέσου μεγέθους, ο οδηγός του Microsoft Learn έχει έτοιμα templates που ταιριάζουν καλύτερα:

- **Tenant Allow/Block List Manager:** Core security settings (read), Detection tuning (manage), Security data basics (read). Για όσους χρειάζεται μόνο να μπλοκάρουν αποστολείς και URLs.
- **MDO SOC Tier 3:** τα δικαιώματα του Tier 2 μαζί με Core security settings (manage) και Detection tuning (manage). Για τους λίγους που αλλάζουν πολιτικές.

## Τι κάνεις τώρα

1. **Έλεγξε αν το Unified RBAC είναι ενεργό για το Defender for Office 365.** Στο Microsoft Defender portal, **System** → **Permissions** → **Microsoft Defender XDR** → **Roles**, και στο **Workload settings** δες αν το **Defender for Office 365** είναι Active. Αν βλέπεις το banner της αυτόματης ενεργοποίησης, σημείωσε την ημερομηνία.
2. **Βρες ποιοι έχουν Security Operator.** Στο Microsoft Entra admin center, **Roles & admins** → **Security Operator**, κατέγραψε τις αναθέσεις, active και eligible.
3. **Ρώτα ποιοι από αυτούς αλλάζουν πολιτικές ή εγγραφές allow και block.** Αν υπάρχει Microsoft Sentinel ή export του audit log, ψάξε ποιος άλλαξε policies ή Tenant Allow/Block List τους τελευταίους μήνες.
4. **Φτιάξε custom role στο Unified RBAC** για όσους πρέπει να συνεχίσουν: στο **Permissions and roles** (https://security.microsoft.com/mtp_roles) → **Create custom role** → **Authorization and settings** → **Core security settings** και **Detection tuning**, με data source **Microsoft Defender for Office 365**. Ανάθεσέ το σε Entra security group, όχι σε μεμονωμένους χρήστες.
5. **Δοκίμασε με λογαριασμό analyst**, όχι με λογαριασμό Security Administrator, ότι μπορεί να κάνει ό,τι πρέπει και τίποτα παραπάνω.
6. **Ενημέρωσε τα runbooks** του SOC για phishing και τον πίνακα εξουσιοδοτήσεων, και πες στο help desk τι θα δει όποιος χάσει την πρόσβαση.

Για την αναθεώρηση των αναθέσεων μπορείς να ξεκινήσεις από το query **[Αναθέσεις ρόλων στο Entra ID](/kql/#privileged-roles)** της Βιβλιοθήκης KQL.

> 📖 **Θέλεις όλη την εικόνα;** Preset policies, anti-phishing, Safe Links και Safe Attachments στην πράξη: **[Microsoft Defender for Office 365: Από τις preset policies στην προχωρημένη παραμετροποίηση](/posts/microsoft-defender-up-close-series/microsoft-defender-for-office-365-deep-dive/)**.

## Σύνδεση με ΚΥΑ 1689/2025, NIS2, ISO 27001 και GDPR

- **ΚΥΑ 1689/2025 [13.γ](/kya-1689-2025/#13-γ) και [13.δ](/kya-1689-2025/#13-δ):** least privilege, separation of duties και περιορισμός των δικαιωμάτων διαχείρισης. Όποιος απαντά σε alerts δεν χρειάζεται απαραίτητα να αλλάζει τις πολιτικές προστασίας. **[13.η](/kya-1689-2025/#13-η):** περιοδική αναθεώρηση των δικαιωμάτων. **[16.α](/kya-1689-2025/#16-α):** η αλλαγή στα δικαιώματα είναι αλλαγή που θέλει αξιολόγηση αντικτύπου.
- **Οδηγία NIS2 [21.2.θ](/nis2/#21-2-θ):** πολιτικές ελέγχου πρόσβασης.
- **ISO/IEC 27001 [A.8.2](/iso-27001/#A-8-2), [A.5.18](/iso-27001/#A-5-18) και [A.5.3](/iso-27001/#A-5-3):** privileged access rights, access rights και segregation of duties.
- **GDPR [32.1.β](/gdpr/#32-1-β):** η ακεραιότητα των πολιτικών που προστατεύουν τα mailboxes είναι μέρος της ασφάλειας της επεξεργασίας.

Τεκμήρια για τον ελεγκτή: η λίστα αναθέσεων του Security Operator πριν και μετά, τα custom roles του Unified RBAC με τα δικαιώματά τους, και η καταγεγραμμένη απόφαση για κάθε χρήστη που κράτησε ή έχασε πρόσβαση στις πολιτικές.

---

## Πηγές και επαλήθευση {#last-verified}

{{< verification >}}

Επιπλέον πηγές: [Unified RBAC permissions for Microsoft Defender for Office 365](https://learn.microsoft.com/en-us/defender-office-365/defender-office-365-unified-rbac-permissions) · [Configure Unified RBAC for Microsoft Defender for Office 365](https://learn.microsoft.com/en-us/defender-office-365/step-by-step-guides/configure-unified-rbac-defender-office-365) · Message Center MC1486293 (2 Οκτωβρίου 2026) και MC1457836 (19 Αυγούστου 2026), όπως αρχειοθετούνται στο mc.merill.net. Η αλλαγή στον Security Operator και οι ημερομηνίες προέρχονται μόνο από την ανακοίνωση MC1486293. Οι ανακοινώσεις διαφέρουν ανά tenant, οπότε δες τις στο δικό σου Message Center.

Το θέμα πρωτοεμφανίστηκε στο [Microsoft 365 Security: τι άλλαξε (εβδομάδα 44/2026)](/posts/weekly-security-update/microsoft-365-security-ti-allaxe-2026-w44/).

Τελευταίος έλεγχος στοιχείων: 29 Οκτωβρίου 2026.
