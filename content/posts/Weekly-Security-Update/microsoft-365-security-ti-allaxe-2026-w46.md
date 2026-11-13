---
title: "Microsoft 365 Security: τι άλλαξε (εβδομάδα 46/2026)"
slug: "microsoft-365-security-ti-allaxe-2026-w46"
date: 2026-11-13T08:00:00+02:00
lastmod: 2026-11-13T08:00:00+02:00
draft: false
keywords:
  - Microsoft Defender νέα
  - Defender for Office 365 recipient conditions
  - MC1546447
  - threat protection policies OR λογική
  - Microsoft Ignite 2026 Defender Sentinel
  - Microsoft Sentinel connectors
  - Safe Links Safe Attachments πολιτικές
tags:
  - Microsoft Defender for Office 365
  - Microsoft Defender XDR
  - Microsoft Sentinel
  - Email Security
  - Εβδομαδιαία σύνοψη
author: "Dimosthenis Atteia"
description: "Εβδομάδα 46/2026: οι threat policies του Defender for Office 365 περνούν σε λογική OR για τους παραλήπτες, και οι συνεδρίες Defender και Sentinel στο Ignite 2026."
summary: "Από τις αρχές Δεκεμβρίου μια πολιτική του Defender for Office 365 με users, groups και domains θα καλύπτει όποιον ταιριάζει σε ένα από αυτά, όχι σε όλα. Οι υπάρχουσες πολιτικές αλλάζουν την πρώτη φορά που τις επεξεργάζεσαι."
categories: ["Security Operations & XDR"]
series: ["Microsoft 365 Security Weekly"]
ShowToc: true
TocOpen: false
weight: -8
cover:
  image: "/images/WSUM365.webp"
  alt: "Weekly Security Update: εβδομαδιαία ενημέρωση για το Microsoft 365 Security"
  caption: "Microsoft 365 Security: εβδομαδιαία ενημέρωση"
  relative: false
  hidden: false
# Πλαίσιο «Last verified»: η ημερομηνία είναι ο έλεγχος του τεύχους (στιγμιότυπο της εβδομάδας)
verification:
  - feature: "Defender for Office 365: λογική OR για users, groups και domains στις threat protection policies"
    status: "Generally Available"
    license: "Δεν αναφέρεται"
    source: "https://learn.microsoft.com/en-us/defender-office-365/safe-links-about#recipient-filters-in-safe-links-policies"
    verified: 2026-11-12
---

## Με μια ματιά

Ήσυχη εβδομάδα για τα προϊόντα Defender και Sentinel, με μία αλλαγή που θέλει προσοχή. Σύμφωνα με την ανακοίνωση MC1546447, από τις **αρχές Δεκεμβρίου 2026** οι threat protection policies του **Defender for Office 365** περνούν από λογική AND σε λογική OR όταν μια πολιτική έχει users, groups και domains μαζί. Οι υπάρχουσες πολιτικές δεν αλλάζουν μόνες τους, αλλά περνούν στη νέα λογική την πρώτη φορά που τις επεξεργάζεσαι. Γι' αυτό βρες τες τώρα, πριν τις αγγίξει κάποιος.

## Οι αλλαγές της εβδομάδας

### 1. Defender for Office 365: οι threat protection policies περνούν σε λογική OR για τους παραλήπτες

**Φάση:** GA, με διάθεση που ξεκινά και ολοκληρώνεται στις αρχές Δεκεμβρίου 2026, σύμφωνα με την ανακοίνωση · **Άδεια:** δεν αναφέρεται στην πηγή

**Τι αλλάζει.** Σήμερα, όταν μια πολιτική έχει διαφορετικούς τύπους συνθήκης για τους παραλήπτες (users, groups, domains), ο παραλήπτης πρέπει να ταιριάζει σε όλους. Το παράδειγμα του Microsoft Learn: με **Users: romain@contoso.com** και **Groups: Executives**, η πολιτική εφαρμόζεται στον romain μόνο αν είναι και μέλος της Executives. Σύμφωνα με την ανακοίνωση, η λογική γίνεται **Match any (OR)**: αρκεί ο παραλήπτης να ταιριάζει σε έναν τύπο. Οι νέες πολιτικές παίρνουν τη λογική OR από προεπιλογή. Οι υπάρχουσες δεν μετατρέπονται αυτόματα, αλλά περνούν στη νέα λογική όταν τις τροποποιήσει ένας διαχειριστής, και αυτό μπορεί να διευρύνει τους παραλήπτες που καλύπτουν. Το Defender portal δείχνει προειδοποίηση και ζητά επιβεβαίωση, και το Exchange Online PowerShell δείχνει προειδοποίηση όταν φορτώνεις το module. Η ανακοίνωση δεν απαριθμεί ποιες πολιτικές αφορά. Στο Microsoft Learn η σημερινή λογική AND περιγράφεται στις πολιτικές anti-phishing, anti-malware, Safe Links, Safe Attachments και στα preset security policies.

**Τι να κάνεις.** Βρες τις πολιτικές που έχουν περισσότερους από έναν τύπο συνθήκης, γιατί μόνο αυτές επηρεάζονται. Για τις πολιτικές Safe Links, το `Get-SafeLinksRule` δείχνει τα πεδία `SentTo`, `SentToMemberOf` και `RecipientDomainIs`. Για καθεμία κατέγραψε ποιους καλύπτει σήμερα και ποιους θα καλύπτει μετά, και αποφάσισε αν θέλεις την τομή ή την ένωση. Μέχρι να το κάνεις, μην επεξεργαστείς αυτές τις πολιτικές, ούτε για μια άσχετη ρύθμιση. Πέρασε την αλλαγή από τη διαδικασία διαχείρισης αλλαγών και ενημέρωσε όποιον έχει δικαίωμα να αλλάζει πολιτικές, μαζί με τον MSSP αν έχεις. Ποιος έχει αυτό το δικαίωμα στο Unified RBAC το γράψαμε στο [άρθρο για τον Security Operator](/posts/generally-available/mdo-security-operator-unified-rbac-mapping/). Για το πώς δουλεύουν τα preset policies και οι custom πολιτικές, δες την [πρακτική περιήγηση στο Defender for Office 365](/posts/microsoft-defender-up-close-series/microsoft-defender-for-office-365-deep-dive/). Η ανακοίνωση λέει ότι για πολιτικές που δεν αλλάζεις δεν χρειάζεται ενέργεια.

**Αναλυτικά:** [Generally Available: Οι πολιτικές του Defender for Office 365 περνούν σε λογική OR για τους παραλήπτες](/posts/generally-available/mdo-threat-policies-recipient-or-logic/)

**Πηγή:** [Safe Links in Microsoft Defender for Office 365: Recipient filters](https://learn.microsoft.com/en-us/defender-office-365/safe-links-about#recipient-filters-in-safe-links-policies) · Message Center [MC1546447](https://mc.merill.net/message/MC1546447) (αρχείο mc.merill.net, δημοσιεύθηκε στις 10 Νοεμβρίου 2026)

## Νέοι πόροι

- **[Catch Microsoft Defender and Sentinel at Ignite 2026](https://techcommunity.microsoft.com/blog/microsoftthreatprotectionblog/catch-microsoft-defender-and-sentinel-at-ignite-2026/4572639)** (Microsoft Defender XDR Blog, 11 Νοεμβρίου 2026). Η λίστα με τις συνεδρίες Defender και Sentinel στο Microsoft Ignite 2026, 17 έως 20 Νοεμβρίου, στο San Francisco και online. Χρήσιμο για να διαλέξεις τι θα δεις: σύμφωνα με την ανάρτηση, τα breakouts θα είναι διαθέσιμα on demand, ενώ τα theater sessions και τα lightning talks γίνονται μόνο δια ζώσης.
- **[Microsoft Ignite 2026: New Sentinel Connectors Announcement](https://techcommunity.microsoft.com/blog/microsoftsentinelblog/microsoft-ignite-2026-new-sentinel-connectors-announcement/4565258)** (Microsoft Sentinel Blog, 11 Νοεμβρίου 2026). Νέοι και βελτιωμένοι connectors για το Microsoft Sentinel, από περίπου 50 συνεργάτες και περίπου 25 από την ομάδα του Sentinel, ανάμεσά τους CrowdStrike Falcon, SentinelOne, Cisco Meraki και Zoom Reports. Χρήσιμο αν σχεδιάζεις ingestion από εργαλεία τρίτων. Η ανάρτηση δεν δίνει φάση ανά connector, οπότε έλεγξε τη σελίδα του κάθε connector πριν τον βάλεις σε παραγωγή.

## Προσοχή αυτή την εβδομάδα

**Μέσα Νοεμβρίου 2026, Defender XDR.** Υπενθύμιση από το [τεύχος 45](/posts/weekly-security-update/microsoft-365-security-ti-allaxe-2026-w45/): ολοκληρώνεται η διάθεση του πίνακα CallActivityEvents και του πίνακα MessageContents στο advanced hunting.

**17 έως 20 Νοεμβρίου 2026, Microsoft Ignite.** Συνήθως φέρνει ανακοινώσεις για Defender και Sentinel. Θα τις δούμε στο επόμενο τεύχος, αφού εμφανιστούν σε σελίδα του Microsoft Learn ή στο Message Center.

**Τέλη Νοεμβρίου 2026, Defender Vulnerability Management.** Σύμφωνα με την ανακοίνωση [MC1490909](https://mc.merill.net/message/MC1490909), η διευρυμένη κάλυψη ευπαθειών σε πακέτα developers περνά από public preview σε GA από τα τέλη Νοεμβρίου έως τα τέλη Δεκεμβρίου. Η ανακοίνωση ζητά να καταγράψεις baselines για exports, Advanced Hunting, API και ροές προς SIEM πριν ενεργοποιηθεί. Ούτε αυτή την εβδομάδα βρέθηκε σελίδα στο Microsoft Learn.

**Αρχές Δεκεμβρίου 2026, Defender for Office 365.** Ξεκινά η λογική OR στις threat protection policies (αλλαγή 1). Υπενθύμιση από το [τεύχος 44](/posts/weekly-security-update/microsoft-365-security-ti-allaxe-2026-w44/): ολοκληρώνεται η αλλαγή στα δικαιώματα του Security Operator στο Unified RBAC και η διάθεση του Move to quarantine.

**2 Δεκεμβρίου 2026, Defender XDR.** Προθεσμία για τον έλεγχο των ρόλων πριν από την αυτόματη ενεργοποίηση του Defender RBAC, όπως γράψαμε στο [τεύχος 45](/posts/weekly-security-update/microsoft-365-security-ti-allaxe-2026-w45/).

Οι ημερομηνίες των ανακοινώσεων μπορεί να διαφέρουν ανά tenant, οπότε δες τις στο δικό σου Message Center.

## Σύνδεση με την ΚΥΑ 1689/2025

- **[20.γ](/kya-1689-2025/#20-γ), φιλτράρισμα email:** μια πολιτική Defender for Office 365 που καλύπτει λιγότερους ή περισσότερους παραλήπτες από όσους σχεδίασες είναι κενό ελέγχου. Ο κατάλογος των πολιτικών με πολλούς τύπους συνθήκης είναι το τεκμήριο ότι ξέρεις ποιους προστατεύει η καθεμία.
- **[16.α](/kya-1689-2025/#16-α), διαχείριση αλλαγών:** η πρώτη επεξεργασία κάθε τέτοιας πολιτικής αλλάζει την κάλυψη, άρα περνά από αξιολόγηση αντικτύπου και έγκριση.

Όλες οι απαιτήσεις της ΚΥΑ 1689/2025 με την αντιστοίχισή τους βρίσκονται στον [οδηγό της ΚΥΑ 1689/2025](/kya-1689-2025/).

## Πηγές και επαλήθευση {#last-verified}

{{< verification >}}

Για αυτό το τεύχος ελέγχθηκαν το αρχείο mc.merill.net (αναρτήσεις Message Center για τα προϊόντα Defender και Sentinel που δημοσιεύθηκαν ή ενημερώθηκαν από τις 7 έως τις 13 Νοεμβρίου 2026, και ανακοινώσεις Defender παλαιότερων εβδομάδων με ημερομηνίες μέσα στις επόμενες δύο εβδομάδες), οι σελίδες «What's new» των Defender XDR, Defender for Endpoint, Defender for Office 365, Defender for Identity, Defender for Cloud Apps, Defender for Cloud, Microsoft Sentinel και Security Exposure Management, και τα blogs του Microsoft Defender XDR, του Microsoft Sentinel και του Defender for Cloud στο Tech Community. Η αρχική σελίδα και η ροή RSS του mc.merill.net δεν ήταν προσβάσιμες σε αυτόν τον έλεγχο, οπότε οι ανακοινώσεις εντοπίστηκαν μέσω αναζήτησης και κάθε μία ανοίχτηκε στη δική της σελίδα. Μπορεί να υπάρχουν ανακοινώσεις της εβδομάδας που δεν εντοπίστηκαν.

Τι βρέθηκε στις σελίδες «What's new»: του Defender XDR δεν έχει καταχωρίσεις μετά τον Σεπτέμβριο. Του Defender for Endpoint έχει για τον Νοέμβριο μόνο ένα build για macOS. Του Defender for Office 365, του Defender for Identity, του Defender for Cloud Apps και του Microsoft Sentinel δεν έχουν καταχωρίσεις Νοεμβρίου. Του Defender for Cloud έχει για τον Νοέμβριο μόνο την υποστήριξη Arc proxy στο Defender for SQL Servers on Machines, που κάλυψε το [τεύχος 45](/posts/weekly-security-update/microsoft-365-security-ti-allaxe-2026-w45/). Του Security Exposure Management δεν έχει κάτι νεότερο από τα posture policies και τα exemptions της 28ης Οκτωβρίου, που κάλυψε επίσης το τεύχος 45. Η ανάρτηση για τους connectors του Sentinel αναφέρει σε public preview το Unified Data Management και δυνατότητες για connectors (nested API, Azure Blob, multi-account, connector builder agent). Αυτές δεν μπήκαν ως αλλαγές της εβδομάδας, γιατί το Unified Data Management ήταν ήδη στους πόρους του [τεύχους 43](/posts/weekly-security-update/microsoft-365-security-ti-allaxe-2026-w43/) και ο connector builder agent είναι σε preview από τον Απρίλιο σύμφωνα με τη σελίδα «What's new» του Sentinel.

Η ανακοίνωση MC1546447 διαβάστηκε από το έγκυρο, δημόσιο και ανεξάρτητο αρχείο του Microsoft 365 Message Center, mc.merill.net, που το συντηρεί η κοινότητα και όχι η Microsoft. Δεν διαβάστηκε σε Message Center κάποιου tenant. Η αλλαγή στη λογική, η φάση και οι ημερομηνίες προέρχονται μόνο από την ανακοίνωση. Το Microsoft Learn περιγράφει ακόμα τη σημερινή λογική AND και δεν έχει ενημερωθεί για την αλλαγή. Πριν ενεργήσεις, δες την ανακοίνωση στο δικό σου Message Center.

Τελευταίος έλεγχος αδειών και στοιχείων: 12 Νοεμβρίου 2026.
