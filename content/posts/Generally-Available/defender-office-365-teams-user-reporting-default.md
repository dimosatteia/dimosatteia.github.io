---
title: "Generally Available: Το Teams user reporting του Defender for Office 365 ενεργοποιείται από προεπιλογή"
seoTitle: "GA: Teams user reporting ενεργό από προεπιλογή στο MDO"
date: 2026-10-27T16:30:00+02:00
lastmod: 2026-10-27T16:30:00+02:00
draft: false
keywords:
  - Microsoft Defender for Office 365
  - Teams user reporting
  - Teams user reported settings
  - MC1478463
  - Report a security concern Teams
  - Set-ReportSubmissionPolicy
  - reporting mailbox
  - ΚΥΑ 1689/2025 αναφορά περιστατικών
tags:
  - Microsoft Defender for Office 365
  - Microsoft Teams
  - Microsoft Defender XDR
  - Incident Response
  - Security Awareness
  - NIS2
  - ISO 27001
  - GDPR
author: "Dimosthenis Atteia"
description: "Από τις 25 Οκτωβρίου 2026 το Teams user reporting του Defender for Office 365 ενεργοποιείται από προεπιλογή στους οργανισμούς που δεν το είχαν ρυθμίσει. Τι στέλνεται στη Microsoft, πού πηγαίνουν οι αναφορές, πώς διαλέγεις προορισμό και τι κρατάς ως τεκμήριο."
seoDescription: "Το Teams user reporting του Defender for Office 365 ενεργό από 25/10/2026. Τι στέλνεται στη Microsoft, πώς διαλέγεις προορισμό και τι λέει ο DPO."
summary: "Οι χρήστες μπορούν πλέον να αναφέρουν ύποπτα μηνύματα, κλήσεις και συσκέψεις του Teams, και οι αναφορές πηγαίνουν από προεπιλογή και στη Microsoft. Δες τι αποστέλλεται, πού αποθηκεύεται και πώς το περνάς από τον DPO και το SOC."
categories: ["Email & Collaboration"]
homeHighlight: true
releases:
  - "generally-available"
ShowToc: true
TocOpen: false
cover:
  image: "https://learn.microsoft.com/en-us/defender-office-365/media/submissions-teams-turn-on-off-defender-portal.png"
  alt: "Η ρύθμιση Monitor reported items in Microsoft Teams στη σελίδα Teams user reported settings του Microsoft Defender portal"
  caption: "Πηγή εικόνας: Microsoft Learn"
  relative: false
# Πλαίσιο «Last verified»: κάθε χαρακτηριστικό με τη φάση, την άδεια, την πηγή και την ημερομηνία ελέγχου
verification:
  - feature: "Teams user reporting ενεργό από προεπιλογή από τις 25 Οκτωβρίου 2026, εκτός αν έχεις κάνει opt out ή έχεις ήδη ρυθμίσεις"
    status: "Generally Available"
    license: "Defender for Office 365 Plan 1 ή Plan 2, Microsoft 365 E5, Office 365 E5"
    source: "https://mc.merill.net/message/MC1478463"
    verified: 2026-10-27
  - feature: "Σελίδα Teams user reported settings στο Defender portal, προορισμοί αναφορών και δεδομένα που στέλνονται στη Microsoft"
    status: "Generally Available"
    license: "Defender for Office 365 Plan 1 ή Plan 2, ή Microsoft Defender XDR"
    source: "https://learn.microsoft.com/en-us/defender-office-365/submissions-teams"
    verified: 2026-10-27
  - feature: "Αναφορά μηνυμάτων από Teams για iOS/iPadOS 7.15+ και Android (μόνο μηνύματα)"
    status: "Generally Available"
    license: "Defender for Office 365 Plan 1 ή Plan 2"
    source: "https://learn.microsoft.com/en-us/defender-office-365/submissions-teams"
    verified: 2026-10-27
# MITRE ATT&CK®: ονόματα στο data/mitre.yaml
mitre: ["T1566", "T1566.003", "T1566.004", "M1017"]
---

Τα τελευταία χρόνια οι επιθέσεις έχουν μετακομίσει από το email στο Teams: μηνύματα από «help desk» εξωτερικών tenants, κλήσεις που ζητούν να εγκαταστήσεις εργαλείο απομακρυσμένης πρόσβασης, συσκέψεις με άγνωστους συμμετέχοντες. Ο χρήστης που τα βλέπει πρώτος είναι συχνά ο μόνος αισθητήρας που έχεις. Το ερώτημα είναι αν μπορεί να το αναφέρει με ένα κλικ, και αν η αναφορά φτάνει κάπου που την κοιτάζει κάποιος.

Από τις **25 Οκτωβρίου 2026** η απάντηση αλλάζει από προεπιλογή: το Teams user reporting του Defender for Office 365 ενεργοποιείται σε όσους οργανισμούς δεν το είχαν ρυθμίσει.

## Τι αλλάζει

Σύμφωνα με την ανακοίνωση MC1478463 του Σεπτεμβρίου 2026, η αλλαγή είναι Generally Available και γίνεται σε τρία βήματα:

| Ημερομηνία | Τι γίνεται |
|---|---|
| 7 Οκτωβρίου 2026 | Οι ρυθμίσεις για τις αναφορές από το Teams αποκτούν δική τους σελίδα στο Defender portal, **Teams user reported settings**. |
| 25 Οκτωβρίου 2026 | Το Teams user reporting ενεργοποιείται από προεπιλογή, εκτός αν έχεις κάνει opt out. |
| Τέλη Οκτωβρίου 2026 | Ολοκληρώνεται η διάθεση. |

Όσες ρυθμίσεις είχες ήδη κάνει μένουν όπως είναι. Η αλλαγή αφορά τους οργανισμούς με Defender for Office 365 Plan 1 ή Plan 2, Microsoft 365 E5 ή Office 365 E5. Το Microsoft Learn γράφει ακόμα ότι η ρύθμιση στο Defender portal είναι ενεργή από προεπιλογή μόνο στα νέα tenants, οπότε μην στηριχτείς ούτε στη μία ούτε στην άλλη πηγή: άνοιξε τη σελίδα και δες τι ισχύει στο δικό σου.

Οι χρήστες αναφέρουν από το Teams desktop και web μηνύματα, κλήσεις, συσκέψεις και συμμετέχοντες σε συσκέψεις. Από τις εφαρμογές για iOS/iPadOS και Android αναφέρουν μόνο μηνύματα.

## Δύο ρυθμίσεις, σε δύο portals

Αυτό είναι το σημείο που μπερδεύει. Το user reporting στο Teams ελέγχεται από δύο διαφορετικά σημεία:

- **Teams admin center.** Εκεί αποφασίζεται αν ο χρήστης βλέπει καν την επιλογή. Τα toggles είναι το **Report a security concern** στη messaging policy, το **Report incorrect security detections** στα Messaging settings, το **Report a call** στα Calling settings και το **Allow users to report meetings** για τις συσκέψεις. Αν είναι Off, ο χρήστης δεν μπορεί να αναφέρει και η ρύθμιση στο Defender δεν παίζει κανένα ρόλο.
- **Microsoft Defender portal.** Στο **Settings → Email & collaboration → Teams user reported settings**, η ρύθμιση **Monitor reported items in Microsoft Teams** αποφασίζει αν οι αναφορές εμφανίζονται στο **Submissions → User reported** και πού πηγαίνουν.

Η αλλαγή της 25ης Οκτωβρίου αφορά τη δεύτερη. Αν στο Teams admin center έχεις τα toggles κλειστά, οι χρήστες σου δεν θα δουν διαφορά.

## Πού πηγαίνουν οι αναφορές, και γιατί σε ενδιαφέρει

Στη σελίδα **Teams user reported settings** διαλέγεις έναν από τρεις προορισμούς:

| Επιλογή | Τι σημαίνει |
|---|---|
| **Microsoft and my reporting mailbox** (προεπιλογή) | Η αναφορά πηγαίνει στη Microsoft για ανάλυση και αντίγραφο στο reporting mailbox σου. |
| **Microsoft only** | Η αναφορά πηγαίνει μόνο στη Microsoft. |
| **My reporting mailbox only** | Η αναφορά μένει σε εσένα. Στη Microsoft πηγαίνει μόνο αν την υποβάλεις εσύ από το Submissions. |

Όταν μια αναφορά πηγαίνει στη Microsoft, σύμφωνα με το Microsoft Learn αντιγράφονται το περιεχόμενο του μηνύματος, τα headers, τα συνημμένα, τα routing metadata και τα metadata της κλήσης, της σύσκεψης ή του συμμετέχοντα. Μπορεί να σταλούν και **έως 15 μηνύματα πριν και 15 μετά** το μήνυμα που αναφέρθηκε, ως πλαίσιο. Το περιεχόμενο αποθηκεύεται σε datacenters στις **ΗΠΑ**, και προσωπικό της Microsoft μπορεί να το διαβάσει.

Αυτό δεν είναι λόγος να το κλείσεις. Είναι λόγος να πάρεις συνειδητή απόφαση μαζί με τον DPO. Ένα chat μπορεί να περιέχει προσωπικά δεδομένα τρίτων που δεν είχαν καμία σχέση με το phishing. Αν ο DPO έχει αντίρρηση για την αποστολή τέτοιου περιεχομένου εκτός ΕΕ, διάλεξε **My reporting mailbox only** και υπέβαλε στη Microsoft μόνο όσα κρίνει το SOC.

Ανεξάρτητα από τον προορισμό, κάθε αναφορά εμφανίζεται στο **Submissions → User reported** και δημιουργεί alert από τα default alert policies, όπως **Teams message reported by user as a security risk** και **Teams call reported by user as a security risk**. Ο αποστολέας ή ο καλών δεν ειδοποιείται ότι αναφέρθηκε.

## Τι κάνεις τώρα

Η 25η Οκτωβρίου πέρασε, οπότε το πρώτο βήμα είναι να δεις τι ισχύει:

1. Άνοιξε το **Settings → Email & collaboration → Teams user reported settings** στο Defender portal και δες αν το **Monitor reported items in Microsoft Teams** είναι On και ποιος είναι ο προορισμός.
2. Αν ο προορισμός περιλαμβάνει reporting mailbox, έλεγξε ποιο είναι. Στους νέους οργανισμούς η προεπιλογή είναι το mailbox του global admin, που σχεδόν ποτέ δεν είναι το σωστό. Πρέπει να είναι Exchange Online mailbox που το παρακολουθεί το SOC.
3. Πάρε την απόφαση για τον προορισμό με τον DPO και γράψε την.
4. Ενημέρωσε το SOC και το help desk ότι θα έρχονται αναφορές από το Teams, και τους χρήστες για το πώς κάνουν report: **More options → Report this message** στο μήνυμα, **Report call** στο ιστορικό κλήσεων, **Report a concern** στη σύσκεψη.

Αν θέλεις να το ελέγξεις ή να το ρυθμίσεις με PowerShell, συνδέσου στο Exchange Online PowerShell:

```powershell
# Τι ισχύει σήμερα
Get-ReportSubmissionPolicy -Identity DefaultReportSubmissionPolicy |
    Format-List ReportChatMessageEnabled,ReportChatMessageToCustomizedAddressEnabled,ReportChatMessageAddresses

# Μόνο στο δικό σου reporting mailbox
Set-ReportSubmissionPolicy -Identity DefaultReportSubmissionPolicy `
    -ReportChatMessageEnabled $false `
    -ReportChatMessageToCustomizedAddressEnabled $true `
    -ReportChatMessageAddresses "soc-reports@mycompany.gr"
```

Η αναφορά κλήσεων και συσκέψεων ήταν θέμα του άρθρου **[Microsoft Teams: Report a call και Report a meeting](/posts/new-features/report-a-call-report-a-meeting-teams-security-reporting/)**, όπου θα βρεις και KQL για τις αναφορές.

> 📖 **Θέλεις όλη την εικόνα;** Πώς δουλεύουν τα Safe Links, τα Safe Attachments, το ZAP και το Attack simulation training στο ίδιο προϊόν: **[Microsoft Defender for Office 365: Μια πρακτική περιήγηση](/posts/microsoft-defender-up-close-series/microsoft-defender-for-office-365-deep-dive/)**.

## Σύνδεση με ΚΥΑ 1689/2025, NIS2, ISO 27001 και GDPR

- **ΚΥΑ 1689/2025 [24.α](/kya-1689-2025/#24-α) και [24.ε](/kya-1689-2025/#24-ε):** η αναφορά από τον χρήστη είναι κανάλι ανίχνευσης που καταλήγει σε alert και στο SOC. Η απόφαση για τον προορισμό των αναφορών ανήκει στην πολιτική διαχείρισης περιστατικών. **[21.α](/kya-1689-2025/#21-α):** η εκπαίδευση των χρηστών χρειάζεται και ένα απλό κουμπί για να αναφέρουν ό,τι αναγνωρίζουν.
- **Οδηγία NIS2 [21.2.β](/nis2/#21-2-β) και [21.2.ζ](/nis2/#21-2-ζ):** χειρισμός περιστατικών και κυβερνοϋγιεινή.
- **ISO/IEC 27001 [A.6.8](/iso-27001/#A-6-8):** information security event reporting, το control που ζητά ακριβώς αυτό, μαζί με το **[A.5.24](/iso-27001/#A-5-24)** για τον σχεδιασμό της διαχείρισης περιστατικών.
- **GDPR [32.1.β](/gdpr/#32-1-β) και [28.1](/gdpr/#28-1):** η αποστολή περιεχομένου chat στη Microsoft είναι επεξεργασία από εκτελούντα. Η απόφαση για τον προορισμό τεκμηριώνεται, και για τη διαβίβαση εκτός ΕΕ δες και το **[44](/gdpr/#44)**.

Τεκμήρια για τον ελεγκτή: screenshot της σελίδας **Teams user reported settings** με τον προορισμό, η καταγεγραμμένη απόφαση με τη γνώμη του DPO, τα toggles του Teams admin center, και ένα δείγμα από το **Submissions → User reported** με τον χρόνο που το εξέτασε το SOC.

---

## Πηγές και επαλήθευση {#last-verified}

{{< verification >}}

Επιπλέον πηγές: [User reported settings in Microsoft Teams](https://learn.microsoft.com/en-us/defender-office-365/submissions-teams) · [Set-ReportSubmissionPolicy](https://learn.microsoft.com/en-us/powershell/module/exchangepowershell/set-reportsubmissionpolicy) · Message Center MC1478463 (Σεπτέμβριος 2026), όπως αρχειοθετείται στο mc.merill.net. Το θέμα πρωτοεμφανίστηκε στο [Microsoft 365 Security: τι άλλαξε (εβδομάδα 43/2026)](/posts/weekly-security-update/microsoft-365-security-ti-allaxe-2026-w43/).

Τελευταίος έλεγχος στοιχείων: 27 Οκτωβρίου 2026.
