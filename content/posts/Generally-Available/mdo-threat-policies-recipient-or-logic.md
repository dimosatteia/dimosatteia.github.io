---
title: "Generally Available: Οι πολιτικές του Defender for Office 365 περνούν σε λογική OR για τους παραλήπτες"
seoTitle: "GA: Λογική OR στους παραλήπτες των πολιτικών MDO"
slug: "mdo-threat-policies-recipient-or-logic"
date: 2026-11-13T08:10:00+02:00
lastmod: 2026-11-13T08:10:00+02:00
draft: true
keywords:
  - Microsoft Defender for Office 365
  - threat protection policies
  - recipient conditions
  - Match any OR logic
  - MC1546447
  - Safe Links policy SentToMemberOf
  - ΚΥΑ 1689/2025 διαχείριση αλλαγών
tags:
  - Microsoft Defender for Office 365
  - Email Security
  - Safe Links
  - Safe Attachments
  - Change Management
  - NIS2
  - ISO 27001
  - GDPR
author: "Dimosthenis Atteia"
description: "Από τις αρχές Δεκεμβρίου 2026 οι threat protection policies του Defender for Office 365 εφαρμόζονται σε όποιον παραλήπτη ταιριάζει σε users, groups ή domains (OR), όχι σε όλα μαζί (AND). Οι υπάρχουσες πολιτικές αλλάζουν μόλις τις επεξεργαστείς."
seoDescription: "Οι threat policies του Defender for Office 365 περνούν από AND σε OR για users, groups και domains. Τι αλλάζει, πότε, και πώς ελέγχεις τις πολιτικές σου."
summary: "Μια πολιτική με χρήστες και ομάδα μαζί σήμερα καλύπτει μόνο όσους είναι και στα δύο. Μετά την αλλαγή θα καλύπτει όποιον είναι σε ένα από τα δύο. Οι υπάρχουσες πολιτικές περνούν στη νέα λογική την πρώτη φορά που τις αλλάζεις."
categories: ["Email & Collaboration"]
releases:
  - "generally-available"
ShowToc: true
TocOpen: false
cover:
  image: "https://learn.microsoft.com/en-us/defender-office-365/media/anti-phishing-policies-details-flyout.png"
  alt: "Το παράθυρο λεπτομερειών μιας custom πολιτικής στο Microsoft Defender portal, με τις ενότητες ρυθμίσεων και τις ενέργειες Edit, Turn off και Delete"
  caption: "Πηγή εικόνας: Microsoft Learn"
  relative: false
# Πλαίσιο «Last verified»: κάθε χαρακτηριστικό με τη φάση, την άδεια, την πηγή και την ημερομηνία ελέγχου
verification:
  - feature: "Defender for Office 365: λογική OR (Match any) για users, groups και domains στις threat protection policies"
    status: "Generally Available"
    license: "Δεν αναφέρεται"
    source: "https://mc.merill.net/message/MC1546447"
    verified: 2026-11-12
  - feature: "Σημερινή λογική: AND ανάμεσα σε διαφορετικούς τύπους συνθηκών, OR στις εξαιρέσεις"
    status: "Generally Available"
    license: "Δεν αναφέρεται"
    source: "https://learn.microsoft.com/en-us/defender-office-365/safe-links-about#recipient-filters-in-safe-links-policies"
    verified: 2026-11-12
# MITRE ATT&CK®: ονόματα στο data/mitre.yaml
mitre: ["T1566", "T1566.001", "T1566.002", "M1054", "M1049"]
---

Ένα συχνό σενάριο: φτιάχνεις μια αυστηρότερη πολιτική Safe Links για τη διοίκηση. Στους παραλήπτες βάζεις την ομάδα **Executives** και, για σιγουριά, και δύο ονόματα που δεν είναι ακόμα μέλη της. Η πολιτική σήμερα δεν εφαρμόζεται σε αυτούς τους δύο. Ούτε στα μέλη της ομάδας που δεν είναι ανάμεσα στα δύο ονόματα. Εφαρμόζεται μόνο σε όσους ταιριάζουν και στις δύο συνθήκες.

Αυτή η συμπεριφορά αλλάζει. Η Microsoft ανακοίνωσε ότι οι threat protection policies του Defender for Office 365 περνούν σε λογική **Match any (OR)** όταν μια πολιτική έχει περισσότερους από έναν τύπο συνθήκης για τους παραλήπτες.

## Τι αλλάζει

Σύμφωνα με την ανακοίνωση MC1546447 της 10ης Νοεμβρίου 2026, η αλλαγή είναι Generally Available και η διάθεση ξεκινά στις **αρχές Δεκεμβρίου 2026**, με ολοκλήρωση επίσης στις αρχές Δεκεμβρίου. Η ανακοίνωση δεν αναφέρει άδεια.

| | Σήμερα | Μετά την αλλαγή |
|---|---|---|
| Πολλές τιμές στην ίδια συνθήκη (π.χ. δύο ομάδες) | OR | OR |
| Διαφορετικοί τύποι συνθήκης (users, groups, domains) | **AND**: ο παραλήπτης πρέπει να ταιριάζει σε όλους | **OR**: αρκεί να ταιριάζει σε έναν |
| Εξαιρέσεις | OR | Η ανακοίνωση δεν αναφέρει αλλαγή |

Η σημερινή λογική περιγράφεται στο Microsoft Learn. Το παράδειγμα της τεκμηρίωσης είναι ακριβώς αυτό: με **Users: romain@contoso.com** και **Groups: Executives**, η πολιτική εφαρμόζεται στον romain μόνο αν είναι και μέλος της ομάδας Executives.

Τρία σημεία από την ανακοίνωση που θέλουν προσοχή:

- **Οι νέες πολιτικές** χρησιμοποιούν τη λογική OR από προεπιλογή.
- **Οι υπάρχουσες πολιτικές δεν μετατρέπονται αυτόματα.** Περνούν στη νέα λογική την πρώτη φορά που ένας διαχειριστής τις τροποποιεί. Αυτό μπορεί να διευρύνει το σύνολο των παραληπτών που καλύπτουν.
- **Προειδοποιήσεις.** Το Defender portal δείχνει μηνύματα προειδοποίησης και επιβεβαίωσης, και το Exchange Online PowerShell δείχνει προειδοποίηση όταν φορτώνεις το module.

Η ανακοίνωση μιλά γενικά για threat protection policies και δεν τις απαριθμεί. Στο Microsoft Learn η ίδια λογική AND περιγράφεται σήμερα στις πολιτικές anti-phishing, anti-malware, Safe Links, Safe Attachments και στα preset security policies.

## Γιατί σε αφορά

Η αλλαγή δεν πειράζει τίποτα από μόνη της. Ο κίνδυνος είναι η πρώτη επεξεργασία μιας παλιάς πολιτικής, όταν κάποιος αλλάζει μια άσχετη ρύθμιση και η κάλυψη αλλάζει χωρίς να το καταλάβει.

Δύο περιπτώσεις:

- **Η πολιτική απλώνεται σε περισσότερους.** Μια πολιτική με **Domains: mycompany.gr** και **Groups: Pilot** σήμερα καλύπτει μόνο τα μέλη της ομάδας Pilot στο domain. Μετά την πρώτη αλλαγή θα καλύπτει όλο το domain. Αν η πολιτική ήταν πιλοτική, με πιο επιθετικές ρυθμίσεις, το πιλοτικό τελειώνει χωρίς απόφαση.
- **Η προτεραιότητα αλλάζει αποτέλεσμα.** Στις πολιτικές Safe Links, σύμφωνα με το Microsoft Learn, η προστασία σταματά στην πρώτη πολιτική που εφαρμόζεται σε έναν παραλήπτη, με τα preset policies πάντα πρώτα. Αν μια custom πολιτική υψηλής προτεραιότητας απλωθεί, μπορεί να «πιάσει» χρήστες που ως τώρα έπεφταν σε άλλη, αυστηρότερη πολιτική χαμηλότερης προτεραιότητας.

Υπάρχει και η αντίθετη, καλή πλευρά: πολλές πολιτικές στήθηκαν με την υπόθεση ότι οι συνθήκες προστίθενται, και σήμερα καλύπτουν λιγότερους από όσους νόμιζε ο διαχειριστής. Η νέα λογική κάνει τη συμπεριφορά πιο κοντά σε αυτό που περιμένει κανείς.

## Τι κάνεις τώρα

1. **Βρες τις πολιτικές με περισσότερους από έναν τύπο συνθήκης.** Αυτές είναι οι μόνες που επηρεάζονται. Στο Exchange Online PowerShell, για τις πολιτικές Safe Links:

    ```powershell
    # Πολιτικές Safe Links με δύο ή περισσότερους τύπους συνθήκης παραληπτών
    Get-SafeLinksRule | Where-Object {
        @($_.SentTo, $_.SentToMemberOf, $_.RecipientDomainIs |
          Where-Object { $_ }).Count -ge 2
    } | Format-Table Name, Priority, State, SentTo, SentToMemberOf, RecipientDomainIs
    ```

    Κάνε το ίδιο με τα αντίστοιχα cmdlets για τις υπόλοιπες πολιτικές (`Get-SafeAttachmentRule`, `Get-AntiPhishRule`, `Get-MalwareFilterRule`, `Get-HostedContentFilterRule`).
2. **Κατέγραψε τη σημερινή κάλυψη.** Για κάθε πολιτική που βρήκες, σημείωσε ποιους καλύπτει σήμερα (την τομή των συνθηκών) και ποιους θα καλύπτει μετά (την ένωση). Κράτα export των ρυθμίσεων ως baseline.
3. **Αποφάσισε τι θέλεις.** Αν η πρόθεση ήταν η τομή, ξανασχεδίασε την πολιτική με έναν τύπο συνθήκης, για παράδειγμα μια ομάδα που περιέχει ακριβώς τους σωστούς χρήστες. Αν η πρόθεση ήταν η ένωση, η νέα λογική σε εξυπηρετεί.
4. **Μην επεξεργαστείς καμία από αυτές τις πολιτικές πριν περάσεις τα βήματα 2 και 3.** Βάλε την αλλαγή στη διαδικασία διαχείρισης αλλαγών, και ενημέρωσε όποιον έχει δικαίωμα να αλλάζει πολιτικές, και τους συνεργάτες ή τον MSSP.
5. **Διάβασε τις προειδοποιήσεις.** Όταν τροποποιείς μια πολιτική στο **Email & collaboration → Policies & rules → Threat policies**, ή όταν φορτώνεις το Exchange Online PowerShell, διάβασε την προειδοποίηση πριν επιβεβαιώσεις.
6. **Επιβεβαίωσε μετά την αλλαγή.** Μετά από κάθε τροποποίηση, έλεγξε σε ποιους εφαρμόζεται η πολιτική, και άφησε έως 6 ώρες για να εφαρμοστεί, όπως γράφει το Microsoft Learn για τις πολιτικές Safe Links.

Αν οι πολιτικές σου είναι τα Standard και Strict preset security policies, που είναι και η σύσταση της Microsoft, έλεγξε και εκεί τις συνθήκες στο **Preset security policies**, γιατί η ίδια λογική AND ισχύει σήμερα και στην ανάθεση παραληπτών τους.

> 📖 **Θέλεις όλη την εικόνα;** Πώς δουλεύουν τα Safe Links, τα Safe Attachments, το anti-phishing και η σειρά προτεραιότητας των πολιτικών στο ίδιο προϊόν: **[Microsoft Defender for Office 365: Μια πρακτική περιήγηση](/posts/microsoft-defender-up-close-series/microsoft-defender-for-office-365-deep-dive/)**.

## Σύνδεση με ΚΥΑ 1689/2025, NIS2, ISO 27001 και GDPR

- **ΚΥΑ 1689/2025 [20.γ](/kya-1689-2025/#20-γ):** το φιλτράρισμα του email πρέπει να καλύπτει όσους σχεδίασες. Μια πολιτική που καλύπτει λιγότερους ή περισσότερους από όσους νομίζεις είναι κενό ελέγχου. **[16.α](/kya-1689-2025/#16-α):** η πρώτη επεξεργασία κάθε πολιτικής με πολλούς τύπους συνθήκης αλλάζει την κάλυψη, άρα είναι αλλαγή που θέλει αξιολόγηση αντικτύπου και έγκριση.
- **Οδηγία NIS2 [21.2.α](/nis2/#21-2-α) και [21.2.ε](/nis2/#21-2-ε):** πολιτικές ασφάλειας των πληροφοριακών συστημάτων και ασφάλεια στη συντήρησή τους.
- **ISO/IEC 27001 [A.8.7](/iso-27001/#A-8-7):** protection against malware. **[A.8.9](/iso-27001/#A-8-9):** configuration management, με baseline πριν και μετά. **[A.8.32](/iso-27001/#A-8-32):** change management.
- **GDPR [32.1.β](/gdpr/#32-1-β):** η συνεχής ακεραιότητα και αξιοπιστία των συστημάτων περιλαμβάνει και το να ξέρεις ποιους προστατεύει κάθε πολιτική.

Τεκμήρια για τον ελεγκτή: η λίστα των πολιτικών με περισσότερους από έναν τύπο συνθήκης, το export των ρυθμίσεων πριν από κάθε αλλαγή, το αίτημα αλλαγής με την απόφαση (τομή ή ένωση) και το αποτέλεσμα του ελέγχου μετά την αλλαγή.

---

## Πηγές και επαλήθευση {#last-verified}

{{< verification >}}

Επιπλέον πηγές: [Safe Links in Microsoft Defender for Office 365: Recipient filters](https://learn.microsoft.com/en-us/defender-office-365/safe-links-about#recipient-filters-in-safe-links-policies) · [Set up Safe Links policies in Microsoft Defender for Office 365](https://learn.microsoft.com/en-us/defender-office-365/safe-links-policies-configure) · [Preset security policies in cloud organizations](https://learn.microsoft.com/en-us/defender-office-365/preset-security-policies) · [Set-SafeLinksRule](https://learn.microsoft.com/en-us/powershell/module/exchangepowershell/set-safelinksrule) · Message Center MC1546447 (10 Νοεμβρίου 2026), όπως αρχειοθετείται στο mc.merill.net. Οι ημερομηνίες είναι σύμφωνα με την ανακοίνωση και μπορεί να διαφέρουν ανά tenant, οπότε δες την ανακοίνωση στο δικό σου Message Center. Το Microsoft Learn περιγράφει ακόμα τη σημερινή λογική AND.

Το θέμα πρωτοεμφανίστηκε στο [Microsoft 365 Security: τι άλλαξε (εβδομάδα 46/2026)](/posts/weekly-security-update/microsoft-365-security-ti-allaxe-2026-w46/).

Τελευταίος έλεγχος στοιχείων: 12 Νοεμβρίου 2026.
