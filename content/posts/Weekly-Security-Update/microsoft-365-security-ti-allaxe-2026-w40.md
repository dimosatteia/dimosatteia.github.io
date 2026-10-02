---
title: "Microsoft 365 Security: τι άλλαξε (εβδομάδα 40/2026)"
date: 2026-10-02T08:00:00+03:00
lastmod: 2026-10-02T08:00:00+03:00
draft: false
keywords:
  - Microsoft 365 Security νέα
  - τι άλλαξε Microsoft Defender
  - Defender for Identity sensor v3 automatic activation
  - Purview Network Data Security Global Secure Access
  - Intune AI agent runtime protection
  - ISOC Microsoft Defender
  - Teams report group call
tags:
  - Microsoft 365 Security
  - Microsoft Defender XDR
  - Microsoft Defender for Identity
  - Microsoft Intune
  - Microsoft Purview
  - Global Secure Access
  - NIS2
  - Εβδομαδιαία σύνοψη
author: "Dimosthenis Atteia"
description: "Εβδομάδα 40/2026: αυτόματη ενεργοποίηση sensor στο Defender for Identity, Purview DLP στο δίκτυο μέσω Global Secure Access, προστασία AI agents από το Intune."
summary: "Το Defender for Identity ενεργοποιεί πλέον μόνο του τον sensor v3.x και το Windows auditing, το Purview DLP φτάνει στο επίπεδο του δικτύου και το Intune αποκτά ρυθμίσεις προστασίας για AI agents."
categories: ["Security Operations & XDR"]
series: ["Microsoft 365 Security Weekly"]
ShowToc: true
TocOpen: false
weight: -6
---

## Με μια ματιά

Η αλλαγή που θέλει την προσοχή σου αυτή την εβδομάδα είναι στο **Microsoft Defender for Identity**: ο sensor v3.x και το Windows auditing ενεργοποιούνται πλέον αυτόματα, και οι υπάρχοντες πελάτες έχουν περιορισμένο χρόνο να επιλέξουν αν το θέλουν. Παράλληλα, το **Microsoft Purview DLP** έγινε γενικά διαθέσιμο στο επίπεδο του δικτύου μέσω του Global Secure Access.

## Οι αλλαγές της εβδομάδας

### 1. Defender for Identity: αυτόματη ενεργοποίηση sensor v3.x και Windows auditing

**Φάση:** σταδιακή διάθεση · **Άδεια:** Microsoft Defender for Identity (Microsoft 365 E5, E5 Security ή EMS E5)

**Τι αλλάζει.** Για τους νέους πελάτες, αν η πρώτη συσκευή μπήκε στο Defender for Endpoint από τις 13 Σεπτεμβρίου 2026 και μετά, το Defender for Identity δημιουργεί μόνο του workspace μόλις εντοπίσει κατάλληλο server με ρόλο ταυτότητας, και ενεργοποιεί αυτόματα τον sensor v3.x και το Windows auditing. Για τους υπάρχοντες πελάτες η αλλαγή έρχεται σταδιακά: το Defender portal δείχνει πρώτα μια ειδοποίηση και, όταν λήξει η περίοδος ειδοποίησης, ενεργοποιεί τις ρυθμίσεις. Η ενεργοποίηση αφορά μόνο servers που είναι ήδη στο Defender for Endpoint και δεν αγγίζει όσους έχουν ήδη sensor.

**Τι να κάνεις.** Άνοιξε το Defender portal → Settings → Identities → On-premises → καρτέλα **Sensor management** και δες αν εμφανίζεται η ειδοποίηση. Όσο εμφανίζεται, έχεις δύο επιλογές: **Go to Advanced features** για να το ενεργοποιήσεις εσύ, ή **Opt out** για να μη γίνει αυτόματα. Αν έχεις διαδικασία διαχείρισης αλλαγών για τους Domain Controllers, πέρασέ το από εκεί πριν λήξει η ειδοποίηση.

**Πηγή:** [What's new in Microsoft Defender for Identity](https://learn.microsoft.com/en-us/defender-for-identity/whats-new) · [Activate the Defender for Identity sensor v3.x](https://learn.microsoft.com/en-us/defender-for-identity/deploy/activate-sensor#control-automatic-activation)

### 2. Purview: Network Data Security με Global Secure Access

**Φάση:** GA · **Άδεια:** Microsoft 365 E7, ή Purview E5 μαζί με Microsoft Entra Internet Access

**Τι αλλάζει.** Το Microsoft Entra Global Secure Access συνδέεται με το Purview και εφαρμόζει πολιτικές DLP στο επίπεδο του δικτύου: σε κείμενο, αρχεία και αλληλεπιδράσεις με AI. Η προστασία καλύπτει browsers, εφαρμογές, APIs και add-ins, άρα και την αποστολή ευαίσθητων δεδομένων σε πλατφόρμες generative AI, social media και εργαλεία συνεργασίας που δεν εμπιστεύεσαι. Η ίδια σύνδεση τροφοδοτεί το Insider Risk Management με ενδείξεις επικίνδυνης δραστηριότητας.

**Τι να κάνεις.** Αν έχεις ήδη το Internet Access profile του Global Secure Access, αυτό είναι το επόμενο λογικό βήμα: ξεκίνα με μία πολιτική σε λειτουργία audit για τις πλατφόρμες generative AI και δες τι πραγματικά φεύγει από τον οργανισμό πριν μπλοκάρεις οτιδήποτε. Το πώς στήνεται το profile το έχω περιγράψει στο [Global Secure Access, Μέρος 3: Internet Access profile](/posts/global-secure-access/global-secure-access-meros-3-internet-access-profile/).

**Πηγή:** [What's new in Microsoft Purview](https://learn.microsoft.com/en-us/purview/whats-new) · [Learn about Microsoft Purview Network Data Security](https://learn.microsoft.com/en-us/purview/dlp-network-data-security-learn)

### 3. Intune: ρυθμίσεις AI agent runtime protection του Defender for Endpoint

**Φάση:** διαθέσιμο με το service release 2609 · **Άδεια:** Microsoft Intune και Microsoft Defender for Endpoint

**Τι αλλάζει.** Το νέο endpoint security template για Windows στο Intune περιλαμβάνει τις ρυθμίσεις AI agent runtime protection του Defender for Endpoint. Υπάρχουν δύο λειτουργίες: **Audit**, που εντοπίζει και ειδοποιεί για μη ασφαλή δραστηριότητα AI agent χωρίς να την εμποδίζει, και **Block**, που τη σταματά πριν εκτελεστεί. Οι ρυθμίσεις ισχύουν για συσκευές Windows που διαχειρίζονται από το Intune ή μέσω MDE security settings management.

**Τι να κάνεις.** Ξεκίνα με Audit σε μια ομάδα πιλοτικών συσκευών, ιδανικά σε όσους ήδη χρησιμοποιούν AI agents τοπικά, και κοίταξε τα alerts για δύο εβδομάδες πριν περάσεις σε Block.

**Πηγή:** [What's new in Microsoft Intune](https://learn.microsoft.com/en-us/intune/intune-service/fundamentals/whats-new) · [AI agent runtime protection with Microsoft Defender for Endpoint](https://learn.microsoft.com/en-us/defender-endpoint/ai-agent-runtime-protection-overview)

### 4. Defender portal: Integrated Security Operations Center (ISOC)

**Φάση:** Preview · **Άδεια:** Microsoft 365 E5 και E7, για πελάτες χωρίς ενεργό Microsoft Sentinel workspace

**Τι αλλάζει.** Το ISOC συγκεντρώνει XDR, SIEM, threat intelligence, αυτοματισμό και δυνατότητες AI μέσα στο Microsoft Defender portal. Από τις 23 Σεπτεμβρίου 2026 είναι διαθέσιμο σε πελάτες Microsoft 365 E5 και E7 που πληρούν τις προϋποθέσεις και δεν έχουν ενεργό Microsoft Sentinel workspace.

**Τι να κάνεις.** Αν δεν έχεις Sentinel, διάβασε τις προϋποθέσεις και τους όρους πριν το ενεργοποιήσεις. Είναι Preview, οπότε μην το βάλεις ακόμα ως τεκμήριο σε έλεγχο.

**Πηγή:** [What's new in Microsoft Defender XDR](https://learn.microsoft.com/en-us/defender-xdr/whats-new) · [ISOC in Microsoft Defender](https://learn.microsoft.com/en-us/defender-xdr/isoc-overview)

### 5. Defender for Office 365: αναφορά ομαδικών κλήσεων στο Teams

**Φάση:** διαθέσιμο · **Άδεια:** Microsoft Defender for Office 365

**Τι αλλάζει.** Οι χρήστες μπορούν πλέον να αναφέρουν από το ιστορικό κλήσεων και τις ομαδικές κλήσεις του Teams, ολοκληρωμένες ή αναπάντητες, ως κακόβουλες (scam) ή μη. Οι αναφορές πηγαίνουν στο reporting mailbox, στη Microsoft ή και στα δύο, ανάλογα με τις ρυθμίσεις user reported settings.

**Τι να κάνεις.** Έλεγξε ότι οι user reported settings στέλνουν τις αναφορές εκεί που τις παρακολουθεί η ομάδα σου, και πρόσθεσε μία γραμμή στην επόμενη ενημέρωση προς τους χρήστες. Το υπόβαθρο της δυνατότητας υπάρχει στο [Report a Call & Report a Meeting στο Microsoft Teams](/posts/new-features/report-a-call-report-a-meeting-teams-security-reporting/).

**Πηγή:** [What's new in Microsoft Defender for Office 365](https://learn.microsoft.com/en-us/defender-office-365/defender-for-office-365-whats-new) · [User reported settings in Teams](https://learn.microsoft.com/en-us/defender-office-365/submissions-teams)

## Προσοχή αυτή την εβδομάδα

Η μόνη αλλαγή με «ρολόι» είναι η πρώτη. Αν είσαι υπάρχων πελάτης του Defender for Identity και δεν κάνεις τίποτα, μετά τη λήξη της ειδοποίησης το portal θα ενεργοποιήσει μόνο του τον sensor v3.x και το Windows auditing στους κατάλληλους servers. Η Microsoft δεν δίνει μία κοινή ημερομηνία για όλους, οπότε ο μόνος τρόπος να ξέρεις είναι να ανοίξεις την καρτέλα Sensor management.

## Σύνδεση με την ΚΥΑ 1689/2025

- **[24.γ](/kya-1689-2025/#24-γ) και [24.ε](/kya-1689-2025/#24-ε), καταγραφή και έλεγχος καταγραφών:** το αυτόματο Windows auditing του Defender for Identity κλείνει κενά καταγραφής στους Domain Controllers. Κράτησε στο αρχείο σου την απόφαση (ενεργοποίηση ή opt out) και το σκεπτικό της.
- **[11.γ](/kya-1689-2025/#11-γ), ορθή χρήση αγαθών και δεδομένων:** το Purview Network Data Security δίνει τεχνική επιβολή της πολιτικής ορθής χρήσης και για τα εργαλεία generative AI.
- **[20.α](/kya-1689-2025/#20-α), προστασία από κακόβουλο λογισμικό:** οι ρυθμίσεις AI agent runtime protection επεκτείνουν την προστασία των endpoints σε μια κατηγορία λογισμικού που μέχρι τώρα έμενε εκτός.

Όλες οι απαιτήσεις της ΚΥΑ 1689/2025 με την αντιστοίχισή τους βρίσκονται στον [οδηγό της ΚΥΑ 1689/2025](/kya-1689-2025/).

## Πηγές

Για αυτό το τεύχος ελέγχθηκαν οι σελίδες «What's new» των Microsoft Defender XDR, Defender for Endpoint, Defender for Office 365, Defender for Identity, Defender for Cloud Apps, Microsoft Intune, Microsoft Purview και Microsoft Entra. Οι σελίδες του Defender for Cloud Apps και του Entra δεν είχαν νέες καταχωρίσεις για την περίοδο.
