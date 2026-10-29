---
title: "Microsoft 365 Security: τι άλλαξε (εβδομάδα 44/2026)"
slug: "microsoft-365-security-ti-allaxe-2026-w44"
date: 2026-10-29T21:00:00+02:00
lastmod: 2026-10-29T21:00:00+02:00
draft: false
keywords:
  - Microsoft Defender νέα
  - Security Operator Unified RBAC Defender for Office 365
  - Move to quarantine remediation action
  - MessageContents table advanced hunting
  - Defender for Endpoint Amazon Linux 2 ARM64
  - MC1486293
  - MC1523084
tags:
  - Microsoft Defender XDR
  - Microsoft Defender for Office 365
  - Microsoft Defender for Endpoint
  - Unified RBAC
  - Advanced Hunting
  - Εβδομαδιαία σύνοψη
author: "Dimosthenis Atteia"
description: "Εβδομάδα 44/2026: ο Security Operator χάνει τις πολιτικές του MDO, νέα ενέργεια Move to quarantine, πίνακας MessageContents για Teams, τέλος του AL2 ARM64."
summary: "Από τις αρχές Νοεμβρίου ο ρόλος Security Operator δεν θα διαχειρίζεται πια τα threat policies και το Tenant Allow/Block List του Defender for Office 365 στο Unified RBAC, και έρχεται νέα ενέργεια για μεταφορά email σε quarantine."
categories: ["Security Operations & XDR"]
series: ["Microsoft 365 Security Weekly"]
ShowToc: true
TocOpen: false
weight: -6
cover:
  image: "/images/WSUM365.webp"
  alt: "Weekly Security Update: εβδομαδιαία ενημέρωση για το Microsoft 365 Security"
  caption: "Microsoft 365 Security: εβδομαδιαία ενημέρωση"
  relative: false
  hidden: false
# Πλαίσιο «Last verified»: η ημερομηνία είναι ο έλεγχος του τεύχους (στιγμιότυπο της εβδομάδας)
verification:
  - feature: "Defender for Office 365: ο Security Operator χάνει threat policies και Tenant Allow/Block List στο Unified RBAC"
    status: "Generally Available"
    license: "Defender for Office 365 με ενεργό Unified RBAC (η άδεια δεν αναφέρεται στην ανακοίνωση)"
    source: "https://learn.microsoft.com/en-us/defender-office-365/defender-office-365-unified-rbac-permissions"
    verified: 2026-10-29
  - feature: "Defender for Office 365: νέα ενέργεια Move to quarantine για email σε mailboxes"
    status: "Generally Available"
    license: "Defender for Office 365 Plan 2"
    source: "https://learn.microsoft.com/en-us/defender-office-365/remediate-malicious-email-delivered-office-365"
    verified: 2026-10-29
  - feature: "Defender XDR: πίνακας MessageContents με αποσπάσματα μηνυμάτων Teams στο advanced hunting"
    status: "Generally Available"
    license: "Δεν αναφέρεται"
    source: "https://learn.microsoft.com/en-us/defender-xdr/advanced-hunting-messagecontents-table"
    verified: 2026-10-29
  - feature: "Defender for Endpoint: τέλος υποστήριξης για Amazon Linux 2 σε ARM64 (31 Οκτωβρίου 2026)"
    status: "Retirement"
    license: "Defender for Servers Plan 1/2, Defender for Endpoint for servers ή Defender for Business servers"
    source: "https://learn.microsoft.com/en-us/defender-endpoint/mde-linux-prerequisites"
    verified: 2026-10-29
---

## Με μια ματιά

Η αλλαγή που θέλει ενέργεια αυτή την εβδομάδα είναι στο **Microsoft Defender for Office 365**: από τις αρχές Νοεμβρίου, σε όσους έχουν Unified RBAC, ο ρόλος **Security Operator** του Entra δεν θα διαχειρίζεται πια τα threat policies και το Tenant Allow/Block List. Στην ίδια περίοδο έρχεται η νέα ενέργεια **Move to quarantine** για email που έχουν ήδη φτάσει σε mailboxes, ενώ στις 31 Οκτωβρίου λήγει η υποστήριξη του Defender for Endpoint για Amazon Linux 2 σε ARM64.

## Οι αλλαγές της εβδομάδας

### 1. Defender for Office 365: ο Security Operator χάνει τις πολιτικές και το Tenant Allow/Block List στο Unified RBAC

**Φάση:** GA, με διάθεση από τις αρχές Νοεμβρίου έως τις αρχές Δεκεμβρίου 2026, σύμφωνα με την ανακοίνωση · **Άδεια:** Defender for Office 365 με ενεργό Unified RBAC. Η ανακοίνωση δεν αναφέρει συγκεκριμένη άδεια.

**Τι αλλάζει.** Σύμφωνα με την ανακοίνωση, αλλάζει η προεπιλεγμένη αντιστοίχιση του ρόλου **Security Operator** του Entra στο Unified RBAC του Defender for Office 365. Όταν εφαρμοστεί, οι Security Operators δεν θα μπορούν πια από προεπιλογή να δημιουργούν, να βλέπουν, να αλλάζουν ή να διαγράφουν threat policies (anti-spam, anti-phishing, anti-malware, Safe Links, Safe Attachments, preset policies), ούτε να βλέπουν ή να αλλάζουν εγγραφές στο Tenant Allow/Block List. Tenants χωρίς Unified RBAC δεν επηρεάζονται, και η εξουσιοδότηση στο Exchange Online PowerShell δεν αλλάζει.

Σημείωσε ότι το Microsoft Learn γράφει ακόμη πως ο Security Operator έχει «Policy management, response actions, metadata read». Μέχρι να ενημερωθεί, η ανακοίνωση είναι η πηγή για το τι θα ισχύει. Θυμήσου επίσης ότι η Microsoft ενεργοποιεί σταδιακά το Unified RBAC σε tenants από τα τέλη Σεπτεμβρίου ([MC1457836](https://mc.merill.net/message/MC1457836)), οπότε η αλλαγή μπορεί να σε αφορά ακόμη κι αν δεν το ενεργοποίησες εσύ.

**Τι να κάνεις.** Βρες ποιοι έχουν Security Operator και αν τον χρησιμοποιούν για να αλλάζουν πολιτικές ή να βάζουν εγγραφές allow και block. Όσοι πρέπει να συνεχίσουν, χρειάζονται τα δικαιώματα **Core security settings** και **Detection tuning** σε custom role του Unified RBAC, ή ρόλο που τα περιλαμβάνει, όπως ο Security Administrator. Προτίμησε το custom role. Ενημέρωσε τα runbooks του SOC και το help desk.

**Αναλυτικά:** [Generally Available: Ο Security Operator χάνει τις πολιτικές του Defender for Office 365 στο Unified RBAC](/posts/generally-available/mdo-security-operator-unified-rbac-mapping/)

**Πηγή:** [Unified RBAC permissions for Microsoft Defender for Office 365](https://learn.microsoft.com/en-us/defender-office-365/defender-office-365-unified-rbac-permissions) · [Configure Unified RBAC for Microsoft Defender for Office 365](https://learn.microsoft.com/en-us/defender-office-365/step-by-step-guides/configure-unified-rbac-defender-office-365) · Message Center [MC1486293](https://mc.merill.net/message/MC1486293) (αρχείο mc.merill.net, δημοσιεύθηκε στις 2 Οκτωβρίου 2026)

### 2. Defender for Office 365: νέα ενέργεια Move to quarantine για email που έχουν ήδη παραδοθεί

**Φάση:** GA, με διάθεση από τις αρχές Νοεμβρίου έως τα μέσα Δεκεμβρίου 2026, σύμφωνα με την ανακοίνωση · **Άδεια:** Defender for Office 365 Plan 2, ή συνδρομή Microsoft 365 που τον περιλαμβάνει

**Τι αλλάζει.** Μέχρι σήμερα, όταν ένα email είχε ήδη φτάσει στο mailbox, μπορούσες να το μετακινήσεις στα Junk ή Deleted Items ή να το διαγράψεις. Σύμφωνα με την ανακοίνωση, προστίθεται η ενέργεια **Move to quarantine**: το μήνυμα αφαιρείται από Inbox, Junk Email, Deleted Items και τα recoverable soft-deleted items και μπαίνει στο quarantine του Defender, όπου μπορείς να το ερευνήσεις, να το απελευθερώσεις ή να το διαγράψεις οριστικά. Διαλέγεις quarantine policy, που ορίζει τι μπορεί να κάνει ο χρήστης. Από προεπιλογή μόνο οι admins έχουν πρόσβαση. Το μήνυμα εμφανίζεται με λόγο «Admin triggered», και αν απελευθερωθεί πηγαίνει στο Inbox.

Η ενέργεια θα είναι διαθέσιμη στο Threat Explorer, στο advanced hunting, στα custom detection rules με αποτελέσματα email, στο email entity page και στο unified Action Center. Για την έγκριση χρειάζεται ο ρόλος **Search and Purge**. Οι υπάρχουσες ενέργειες, τα AIR actions και τα Graph API δεν αλλάζουν, και μηνύματα σε hard-deleted, on-premises ή εξωτερικά mailboxes δεν καλύπτονται.

**Τι να κάνεις.** Αποφάσισε ποια quarantine policy θα χρησιμοποιεί το SOC για αυτή την ενέργεια, συνήθως μια admin-only. Έλεγξε ποιοι έχουν Search and Purge. Πρόσθεσε το Move to quarantine στο playbook για phishing: είναι ασφαλέστερο από το soft delete όταν δεν είσαι σίγουρος, γιατί το μήνυμα μένει διαθέσιμο ως τεκμήριο. Για τις πολιτικές του Defender for Office 365 συνολικά, δες τον [πρακτικό οδηγό](/posts/microsoft-defender-up-close-series/microsoft-defender-for-office-365-deep-dive/).

**Αναλυτικά:** [Generally Available: Move to quarantine, νέα ενέργεια αποκατάστασης για email στο Defender for Office 365](/posts/generally-available/mdo-move-to-quarantine-remediation-action/)

**Πηγή:** [Remediate malicious email delivered in Office 365](https://learn.microsoft.com/en-us/defender-office-365/remediate-malicious-email-delivered-office-365) · Message Center [MC1523084](https://mc.merill.net/message/MC1523084) (αρχείο mc.merill.net, δημοσιεύθηκε στις 23 Οκτωβρίου 2026)

### 3. Defender XDR: ο πίνακας MessageContents φέρνει αποσπάσματα μηνυμάτων Teams στο advanced hunting

**Φάση:** GA, με ολοκλήρωση της διάθεσης έως τα μέσα Νοεμβρίου 2026 αντί για τα μέσα Οκτωβρίου, σύμφωνα με την ανακοίνωση όπως ενημερώθηκε στις 26 Οκτωβρίου 2026 · **Άδεια:** δεν αναφέρεται στην πηγή. Χρειάζεται πρόσβαση στο advanced hunting και τον ρόλο Preview.

**Τι αλλάζει.** Ο νέος πίνακας `MessageContents` δίνει σε εξουσιοδοτημένους analysts αποσπάσματα (snippets) μηνυμάτων Teams μαζί με metadata: `TeamsMessageId`, `ThreadId`, `ThreadName`, `MessageSnippet`, `ThreadType`, αποστολέα και ώρα παράδοσης. Καλύπτει και μηνύματα με URLs και federated μηνύματα. Μπορείς να τον συνδέσεις με άλλους πίνακες του advanced hunting. Δεν υποστηρίζει custom detection rules ούτε streaming. Όποιος δεν έχει τα σωστά δικαιώματα δεν βλέπει καν τον πίνακα.

**Τι να κάνεις.** Αυτό είναι πρόσβαση σε περιεχόμενο συνομιλιών, όχι μόνο σε metadata. Πριν δώσεις τον ρόλο, αποφάσισε με τον DPO ποιοι analysts τον χρειάζονται. Με Unified RBAC, ο ρόλος δίνεται μέσω **Security operations/Raw data (email & collaboration)/Email & collaboration content (read)**. Γράψε τη χρήση του στη διαδικασία διερεύνησης περιστατικών. Αν δεν θέλεις να τον χρησιμοποιήσει κανείς, δεν χρειάζεται καμία ενέργεια.

**Αναλυτικά:** [Generally Available: Ο πίνακας MessageContents φέρνει μηνύματα Teams στο advanced hunting του Defender XDR](/posts/generally-available/defender-xdr-messagecontents-teams-advanced-hunting/)

**Πηγή:** [MessageContents table in Microsoft Defender XDR](https://learn.microsoft.com/en-us/defender-xdr/advanced-hunting-messagecontents-table) · Message Center [MC1474106](https://mc.merill.net/message/MC1474106) (αρχείο mc.merill.net, δημοσιεύθηκε στις 18 Σεπτεμβρίου 2026, ενημερώθηκε στις 26 Οκτωβρίου 2026)

### 4. Defender for Endpoint: λήγει στις 31 Οκτωβρίου η υποστήριξη για Amazon Linux 2 σε ARM64

**Φάση:** Retirement στις 31 Οκτωβρίου 2026 · **Άδεια:** αφορά όσους έχουν Defender for Endpoint on Linux σε servers, με Defender for Servers Plan 1 ή Plan 2, Defender for Endpoint for servers ή Defender for Business servers

**Τι αλλάζει.** Μετά τις 31 Οκτωβρίου 2026 το Defender for Endpoint σε Amazon Linux 2 (AL2) με αρχιτεκτονική ARM64 δεν παίρνει ενημερώσεις, διορθώσεις ή τεχνική υποστήριξη. Η τελευταία υποστηριζόμενη έκδοση είναι η 101.25122.0004. Νεότερες εκδόσεις δεν εγκαθίστανται σε αυτή την πλατφόρμα. Τα μηχανήματα AMD64/x86_64 δεν επηρεάζονται, και το Amazon Linux 2023 παραμένει στη λίστα υποστηριζόμενων διανομών.

**Τι να κάνεις.** Βρες στο device inventory τους Linux servers με AL2 σε ARM64, συνήθως instances AWS Graviton. Σύμφωνα με την ανακοίνωση, μπλόκαρε στα μηχανήματα αυτά τις αναβαθμίσεις πέρα από την 101.25122.0004 και σχεδίασε μετάβαση σε υποστηριζόμενη διανομή. Μέχρι να γίνει, κατέγραψέ τα ως τεκμηριωμένη εξαίρεση με ημερομηνία λήξης.

**Πηγή:** [Prerequisites for Microsoft Defender for Endpoint on Linux](https://learn.microsoft.com/en-us/defender-endpoint/mde-linux-prerequisites) · Message Center [MC1392568](https://mc.merill.net/message/MC1392568) (αρχείο mc.merill.net, δημοσιεύθηκε στις 15 Ιουνίου 2026, ενημερώθηκε στις 23 Σεπτεμβρίου 2026)

## Νέοι πόροι

- **[Unified RBAC permissions for Microsoft Defender for Office 365](https://learn.microsoft.com/en-us/defender-office-365/defender-office-365-unified-rbac-permissions)** (Microsoft Learn). Πίνακας που αντιστοιχίζει κάθε εργασία του Defender for Office 365 στο δικαίωμα που χρειάζεται. Είναι το εργαλείο σου για να φτιάξεις τα custom roles της αλλαγής 1.
- **[Configure Unified RBAC for Microsoft Defender for Office 365](https://learn.microsoft.com/en-us/defender-office-365/step-by-step-guides/configure-unified-rbac-defender-office-365)** (Microsoft Learn). Οδηγός βήμα προς βήμα, με έτοιμα templates ρόλων: SOC Tier 1, Security Analyst, Tenant Allow/Block List Manager και μοντέλο SOC τριών επιπέδων.

## Προσοχή αυτή την εβδομάδα

**31 Οκτωβρίου 2026, Defender for Endpoint.** Λήγει η υποστήριξη για Amazon Linux 2 σε ARM64 (αλλαγή 4).

**1 Νοεμβρίου 2026, Defender for Cloud.** Υπενθύμιση από το [τεύχος 43](/posts/weekly-security-update/microsoft-365-security-ti-allaxe-2026-w43/): αλλάζει η χρέωση του Defender for Servers.

**Αρχές Νοεμβρίου 2026, Defender for Office 365.** Ξεκινά η αλλαγή στα δικαιώματα του Security Operator στο Unified RBAC (αλλαγή 1) και η διάθεση του Move to quarantine (αλλαγή 2).

**Μέσα Νοεμβρίου 2026, Defender XDR.** Ολοκληρώνεται η διάθεση του πίνακα MessageContents (αλλαγή 3).

Οι ημερομηνίες των ανακοινώσεων μπορεί να διαφέρουν ανά tenant, οπότε δες τις στο δικό σου Message Center.

## Σύνδεση με την ΚΥΑ 1689/2025

- **[13.γ](/kya-1689-2025/#13-γ) και [13.δ](/kya-1689-2025/#13-δ), least privilege και περιορισμός δικαιωμάτων διαχείρισης:** η αλλαγή στον Security Operator είναι ευκαιρία να χωρίσεις όσους αλλάζουν πολιτικές από όσους απλώς απαντούν σε alerts.
- **[20.γ](/kya-1689-2025/#20-γ) και [24.α](/kya-1689-2025/#24-α), φιλτράρισμα email και διαχείριση περιστατικών:** το Move to quarantine αφαιρεί ένα κακόβουλο μήνυμα από τους χρήστες χωρίς να χαθεί το τεκμήριο.
- **[24.γ](/kya-1689-2025/#24-γ) και [24.ε](/kya-1689-2025/#24-ε), καταγραφή και έλεγχος:** ο πίνακας MessageContents δίνει το περιεχόμενο που λείπει στη διερεύνηση περιστατικών στο Teams. Η πρόσβαση σε αυτόν πρέπει να περιορίζεται κατά [13.γ](/kya-1689-2025/#13-γ).
- **[17.γ](/kya-1689-2025/#17-γ), ενημερώσεις και τεκμηριωμένες εξαιρέσεις:** servers με AL2 σε ARM64 που μένουν σε παγωμένη έκδοση του Defender for Endpoint είναι εξαίρεση που πρέπει να καταγραφεί με αντισταθμιστικά μέτρα.

Όλες οι απαιτήσεις της ΚΥΑ 1689/2025 με την αντιστοίχισή τους βρίσκονται στον [οδηγό της ΚΥΑ 1689/2025](/kya-1689-2025/).

## Πηγές και επαλήθευση {#last-verified}

{{< verification >}}

Για αυτό το τεύχος ελέγχθηκαν το αρχείο mc.merill.net (αναρτήσεις Message Center για τα προϊόντα Defender που δημοσιεύθηκαν ή ενημερώθηκαν από τις 23 έως τις 29 Οκτωβρίου 2026, και ανακοινώσεις Defender παλαιότερων εβδομάδων με ημερομηνίες μέσα στις επόμενες δύο εβδομάδες) και οι σελίδες «What's new» των Defender XDR, Defender for Endpoint, Defender for Office 365, Defender for Identity, Defender for Cloud Apps, Defender for Cloud και Microsoft Sentinel. Η ροή RSS και η αρχική σελίδα του mc.merill.net δεν ήταν προσβάσιμες σε αυτόν τον έλεγχο, οπότε οι ανακοινώσεις εντοπίστηκαν μέσω αναζήτησης και κάθε μία ανοίχτηκε στη δική της σελίδα. Μπορεί να υπάρχουν ανακοινώσεις της εβδομάδας που δεν εντοπίστηκαν.

Τι βρέθηκε στις σελίδες «What's new»: η σελίδα του Defender XDR δεν έχει καταχωρίσεις Οκτωβρίου. Του Defender for Endpoint έχει για τον Οκτώβριο μόνο δύο builds για macOS και το vulnerability assessment για εφαρμογές του Microsoft Store, που ήταν στο προηγούμενο τεύχος. Του Defender for Office 365 προσθέτει τον πίνακα `CallActivityEvents` για δραστηριότητες σε κλήσεις και συσκέψεις Teams, χωρίς ημερομηνία. Του Defender for Identity, του Defender for Cloud Apps και του Defender for Cloud δεν έχουν κάτι νεότερο από όσα κάλυψαν τα [τεύχη 41](/posts/weekly-security-update/microsoft-365-security-ti-allaxe-2026-w41/) έως [43](/posts/weekly-security-update/microsoft-365-security-ti-allaxe-2026-w43/). Η μόνη εξαίρεση είναι το νέο Defender server security experience του Defender for Cloud, σε preview από τις 6 Οκτωβρίου, που δεν μπήκε σε αυτό το τεύχος. Του Microsoft Sentinel έχει για τον Οκτώβριο μόνο το analytics rule για SAP BTP.

Δεν μπήκε επίσης το private preview του Defender Vulnerability Management για ευπάθειες σε πακέτα Node.js, Python και Java ([MC1490909](https://mc.merill.net/message/MC1490909)), γιατί δεν υπάρχει ακόμη σελίδα στο Microsoft Learn. Σύμφωνα με την ανακοίνωση, το public preview ξεκινά από τα τέλη Οκτωβρίου.

Οι ανακοινώσεις MC1486293, MC1523084, MC1474106, MC1392568, MC1457836 και MC1490909 διαβάστηκαν από το έγκυρο, δημόσιο και ανεξάρτητο αρχείο του Microsoft 365 Message Center, mc.merill.net, που το συντηρεί η κοινότητα και όχι η Microsoft. Δεν διαβάστηκαν σε Message Center κάποιου tenant. Το πόσο επιβεβαιώνονται από τη Microsoft διαφέρει ανά θέμα:

- **Security Operator (MC1486293):** η αλλαγή και οι ημερομηνίες προέρχονται μόνο από την ανακοίνωση. Το Microsoft Learn περιγράφει τα δικαιώματα του Unified RBAC, αλλά δείχνει ακόμη τη σημερινή αντιστοίχιση του ρόλου.
- **Move to quarantine (MC1523084):** η ενέργεια, η άδεια και οι ημερομηνίες προέρχονται μόνο από την ανακοίνωση. Το Microsoft Learn περιγράφει τις σημερινές ενέργειες αποκατάστασης και τον ρόλο Search and Purge, όχι ακόμη τη νέα ενέργεια.
- **MessageContents (MC1474106):** η σελίδα του Microsoft Learn επιβεβαιώνει τον πίνακα, τα πεδία και τα δικαιώματα. Οι ημερομηνίες προέρχονται από την ανακοίνωση.
- **Amazon Linux 2 ARM64 (MC1392568):** η ημερομηνία και η τελευταία έκδοση επιβεβαιώνονται και στο Microsoft Learn.

Οι ανακοινώσεις και οι ημερομηνίες τους διαφέρουν ανά tenant. Πριν ενεργήσεις, δες την αντίστοιχη ανακοίνωση στο δικό σου Message Center.

Τελευταίος έλεγχος αδειών και στοιχείων: 29 Οκτωβρίου 2026.
