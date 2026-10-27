---
title: "Generally Available: Αλλάζουν τα δικαιώματα των ρόλων του Entra στο App Governance του Defender for Cloud Apps"
seoTitle: "GA: Νέα δικαιώματα ρόλων στο App Governance (MDCA)"
date: 2026-10-27T16:10:00+02:00
lastmod: 2026-10-27T16:10:00+02:00
draft: false
keywords:
  - Microsoft Defender for Cloud Apps
  - App Governance
  - Unified RBAC Defender XDR
  - MC1479503
  - Cloud App Security Administrator
  - Compliance Administrator App Governance
  - OAuth app governance
  - least privilege
tags:
  - Microsoft Defender for Cloud Apps
  - Microsoft Defender XDR
  - Microsoft Entra ID
  - OAuth
  - Least Privilege
  - NIS2
  - ISO 27001
  - GRC
author: "Dimosthenis Atteia"
description: "Το App Governance του Defender for Cloud Apps περνά στο Unified RBAC του Defender XDR. Από τα μέσα Νοεμβρίου 2026 ο Cloud App Security Administrator αποκτά δικαιώματα, ο Compliance Administrator και ο Compliance Data Administrator χάνουν. Ποιους αφορά, τι ελέγχεις και πώς το τεκμηριώνεις."
seoDescription: "App Governance στο Unified RBAC: τι κερδίζει ο Cloud App Security Administrator, τι χάνουν οι Compliance ρόλοι και τι ελέγχεις πριν από τα μέσα Νοεμβρίου 2026."
summary: "Μια αλλαγή ρόλων που μοιάζει μικρή, αλλά αγγίζει το ποιος ελέγχει τις εφαρμογές OAuth στο tenant σου. Δες ποιοι θα χάσουν πρόσβαση, ποιοι θα αποκτήσουν, και πώς το κάνεις ευκαιρία για αναθεώρηση δικαιωμάτων."
categories: ["Cloud Security"]
releases:
  - "generally-available"
ShowToc: true
TocOpen: false
cover:
  image: "https://learn.microsoft.com/en-us/defender-cloud-apps/media/app-governance-get-started/app-governance-service-status2.png"
  alt: "Η ρύθμιση Use app governance στο Settings, Cloud Apps, App governance του Microsoft Defender portal"
  caption: "Πηγή εικόνας: Microsoft Learn"
  relative: false
# Πλαίσιο «Last verified»: κάθε χαρακτηριστικό με τη φάση, την άδεια, την πηγή και την ημερομηνία ελέγχου
verification:
  - feature: "MC1479503: αλλαγές δικαιωμάτων για Cloud App Security Administrator, Compliance Administrator, Compliance Data Administrator και custom Unified RBAC roles στο App Governance, από μέσα έως τέλη Νοεμβρίου 2026"
    status: "Generally Available"
    license: "Microsoft Defender for Cloud Apps"
    source: "https://mc.merill.net/message/MC1479503"
    verified: 2026-10-27
  - feature: "App Governance: απαιτούμενοι ρόλοι και δυνατότητες ανά ρόλο (ο πίνακας δείχνει ακόμα τα σημερινά δικαιώματα)"
    status: "Generally Available"
    license: "Microsoft Defender for Cloud Apps"
    source: "https://learn.microsoft.com/en-us/defender-cloud-apps/app-governance-get-started#required-roles"
    verified: 2026-10-27
# MITRE ATT&CK®: ονόματα στο data/mitre.yaml
mitre: ["T1528", "T1098.003", "M1026", "M1018"]
---

Το App Governance είναι το κομμάτι του Defender for Cloud Apps που βλέπει τις εφαρμογές OAuth του tenant σου: ποιες έχουν δικαιώματα στο Graph, ποιες διαβάζουν mailboxes, ποιες έγιναν ξαφνικά πολύ «ομιλητικές». Μετά τις επιθέσεις με κακόβουλες εφαρμογές OAuth και consent phishing, είναι από τα πιο σημαντικά σημεία ελέγχου σε ένα tenant Microsoft 365. Και το ποιος το ελέγχει είναι ερώτηση που θα κάνει ο ελεγκτής.

Αυτό ακριβώς αλλάζει: το App Governance περνά στο **Unified RBAC** του Defender XDR, και μαζί αλλάζουν τα δικαιώματα συγκεκριμένων ρόλων του Entra.

## Τι αλλάζει

Σύμφωνα με την ανακοίνωση MC1479503, που δημοσιεύθηκε στις 25 Σεπτεμβρίου 2026:

| Ρόλος | Τι αλλάζει |
|---|---|
| **Cloud App Security Administrator** | **Αποκτά** δικαίωμα να βλέπει και να διαχειρίζεται τα App Governance policies. Σήμερα ενεργοποιεί το App Governance, αλλά δεν βλέπει τις δυνατότητές του. |
| **Compliance Administrator** | **Χάνει** τη διαχείριση των App Governance policies και την ενεργοποίηση ή απενεργοποίηση του App Governance από τα Settings. |
| **Compliance Data Administrator** | **Χάνει** την ενεργοποίηση ή απενεργοποίηση του App Governance από τα Settings. |
| **Custom Unified RBAC roles** για το Defender for Cloud Apps | **Αποκτούν** πρόσβαση στις δυνατότητες του App Governance. |

Η αλλαγή είναι Generally Available. Η αρχική ημερομηνία ήταν από τα μέσα έως τα τέλη Οκτωβρίου, αλλά στις 20 Οκτωβρίου η Microsoft τη μετέθεσε **από τα μέσα έως τα τέλη Νοεμβρίου 2026**. Έχεις δηλαδή περίπου τρεις εβδομάδες.

Ένα σημείο προσοχής: ο πίνακας ρόλων στο Microsoft Learn δείχνει ακόμα τα σημερινά δικαιώματα, όπου ο Compliance Administrator διαχειρίζεται policies. Μέχρι να ενημερωθεί, η ανακοίνωση στο Message Center σου είναι η πηγή για το τι θα ισχύει.

## Γιατί σε ενδιαφέρει

Σε πολλά tenants το App Governance το στήνει κάποιος από την ομάδα compliance, επειδή ο Compliance Administrator το επέτρεπε. Από τα μέσα Νοεμβρίου αυτός ο άνθρωπος δεν θα μπορεί να αλλάξει τα policies που έφτιαξε. Αν κανείς δεν το προσέξει, θα το ανακαλύψετε όταν χρειαστεί να αλλάξετε ένα policy μετά από ένα alert.

Από την άλλη πλευρά, ο **Cloud App Security Administrator αποκτά περισσότερα δικαιώματα** από όσα είχε. Όσοι έχουν σήμερα αυτόν τον ρόλο θα μπορούν πλέον να αλλάζουν ή να διαγράφουν τα policies που προστατεύουν από κακόβουλες εφαρμογές OAuth. Αυτό είναι αλλαγή στο privileged access, ακόμα κι αν δεν έκανες εσύ καμία ανάθεση.

## Τι κάνεις πριν από τα μέσα Νοεμβρίου

1. **Βρες ποιοι έχουν τους τρεις ρόλους.** Στο Microsoft Entra admin center, στο **Roles & admins**, άνοιξε τους Cloud App Security Administrator, Compliance Administrator και Compliance Data Administrator, και κατέγραψε τις αναθέσεις, eligible και active.
2. **Για όσους χάνουν πρόσβαση** και πρέπει να συνεχίσουν: δώσε τους custom role στο **Unified RBAC** του Defender XDR με τα δικαιώματα του Defender for Cloud Apps που χρειάζονται, αντί για ευρύτερο ρόλο του Entra όπως ο Security Administrator.
3. **Για όσους κερδίζουν πρόσβαση:** έλεγξε αν πρέπει πραγματικά να έχουν τον Cloud App Security Administrator. Αν τον έχουν μόνο για τα classic policies του Defender for Cloud Apps, ίσως αρκεί custom role. Αν έχεις Entra ID P2, κάνε τον eligible μέσω PIM αντί για μόνιμο.
4. **Έλεγξε τους custom Unified RBAC roles** που έχεις ήδη για το Defender for Cloud Apps, γιατί θα αποκτήσουν πρόσβαση στο App Governance.
5. **Ενημέρωσε την τεκμηρίωση ρόλων** και τον πίνακα εξουσιοδοτήσεων.

Για την αναθεώρηση μπορείς να ξεκινήσεις από το query **[Αναθέσεις ρόλων στο Entra ID](/kql/#privileged-roles)** της Βιβλιοθήκης KQL.

> 📖 **Θέλεις όλη την εικόνα;** Shadow IT, App Governance για OAuth apps και session policies: **[Microsoft Defender for Cloud Apps: Μια πρακτική περιήγηση στο CASB](/posts/microsoft-defender-up-close-series/microsoft-defender-for-cloud-apps-deep-dive/)**.

## Σύνδεση με ΚΥΑ 1689/2025, NIS2, ISO 27001 και GDPR

- **ΚΥΑ 1689/2025 [13.γ](/kya-1689-2025/#13-γ) και [13.δ](/kya-1689-2025/#13-δ):** least privilege και περιορισμός των δικαιωμάτων διαχείρισης. Η αλλαγή είναι αφορμή να ελέγξεις ποιος διαχειρίζεται πραγματικά τις πολιτικές για εφαρμογές OAuth. **[13.η](/kya-1689-2025/#13-η):** περιοδική αναθεώρηση των δικαιωμάτων. **[12.2.α](/kya-1689-2025/#12-2-α):** οι εφαρμογές OAuth τρίτων είναι κομμάτι της εφοδιαστικής αλυσίδας.
- **Οδηγία NIS2 [21.2.θ](/nis2/#21-2-θ) και [21.2.δ](/nis2/#21-2-δ):** πολιτικές ελέγχου πρόσβασης και ασφάλεια της αλυσίδας εφοδιασμού.
- **ISO/IEC 27001 [A.8.2](/iso-27001/#A-8-2), [A.5.18](/iso-27001/#A-5-18) και [A.5.3](/iso-27001/#A-5-3):** privileged access rights, access rights και διαχωρισμός καθηκόντων ανάμεσα σε compliance και security.
- **GDPR [32.1.β](/gdpr/#32-1-β) και [28.1](/gdpr/#28-1):** οι εφαρμογές OAuth με πρόσβαση σε mailboxes και αρχεία επεξεργάζονται προσωπικά δεδομένα.

Τεκμήρια για τον ελεγκτή: η λίστα αναθέσεων των τριών ρόλων πριν και μετά την αλλαγή, οι custom Unified RBAC roles με τα δικαιώματά τους, και η καταγεγραμμένη απόφαση για κάθε χρήστη που κράτησε ή έχασε πρόσβαση.

---

## Πηγές και επαλήθευση {#last-verified}

{{< verification >}}

Επιπλέον πηγές: [Turn on app governance: Required roles](https://learn.microsoft.com/en-us/defender-cloud-apps/app-governance-get-started#required-roles) · [App governance FAQ](https://learn.microsoft.com/en-us/defender-cloud-apps/app-governance-faq) · [Manage admin access in Defender for Cloud Apps](https://learn.microsoft.com/en-us/defender-cloud-apps/manage-admins) · Message Center MC1479503 (25 Σεπτεμβρίου 2026, ενημερώθηκε στις 20 Οκτωβρίου 2026), όπως αρχειοθετείται στο mc.merill.net. Η αλλαγή στους ρόλους και οι ημερομηνίες προέρχονται μόνο από την ανακοίνωση. Το θέμα πρωτοεμφανίστηκε στο [Microsoft 365 Security: τι άλλαξε (εβδομάδα 43/2026)](/posts/weekly-security-update/microsoft-365-security-ti-allaxe-2026-w43/).

Τελευταίος έλεγχος στοιχείων: 27 Οκτωβρίου 2026.
