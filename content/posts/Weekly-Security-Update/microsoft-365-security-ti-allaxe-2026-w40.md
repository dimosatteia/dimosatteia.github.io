---
title: "Microsoft 365 Security: τι άλλαξε (εβδομάδα 40/2026)"
date: 2026-10-02T08:00:00+03:00
lastmod: 2026-10-02T23:00:00+03:00
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

**Φάση:** GA, με σταδιακή διάθεση · **Άδεια:** Microsoft Defender for Identity (Microsoft 365 E5, Microsoft 365 E5 Security ή Enterprise Mobility + Security E5). Δεν περιλαμβάνεται στο Microsoft 365 E3.

**Τι αλλάζει.** Για τους νέους πελάτες, αν η πρώτη συσκευή μπήκε στο Defender for Endpoint από τις 13 Σεπτεμβρίου 2026 και μετά, το Defender for Identity δημιουργεί μόνο του workspace μόλις εντοπίσει κατάλληλο server με ρόλο ταυτότητας, και ενεργοποιεί αυτόματα τον sensor v3.x και το Windows auditing. Για τους υπάρχοντες πελάτες η αλλαγή έρχεται σταδιακά: το Defender portal δείχνει πρώτα μια ειδοποίηση και, όταν λήξει η περίοδος ειδοποίησης, ενεργοποιεί τις ρυθμίσεις. Η ενεργοποίηση αφορά μόνο servers που είναι ήδη στο Defender for Endpoint, τρέχουν Windows Server 2019 ή νεότερο και έχουν ρόλο domain controller, AD FS, AD CS ή Microsoft Entra Connect. Δεν εγκαθιστά ξεχωριστό πακέτο και δεν αγγίζει όσους έχουν ήδη sensor. Το Windows auditing, όταν είναι ενεργό, ρυθμίζει μόνο του τις πολιτικές καταγραφής που χρειάζεται ο sensor (directory services, NTLM, AD FS, AD CS, Entra Connect) και τις ξαναεφαρμόζει κάθε 24 ώρες.

**Τι να κάνεις.** Άνοιξε στο Defender portal το Settings → Identities → **Sensor management** (είναι καρτέλα της σελίδας On-premises). Εκεί εμφανίζεται η ειδοποίηση. Όσο εμφανίζεται, έχεις δύο επιλογές: **Go to Advanced features** για να το ενεργοποιήσεις εσύ, ή **Opt out** για να μη γίνει αυτόματα. Οι δύο ρυθμίσεις βρίσκονται στο Settings → Identities → Advanced features και λέγονται **Automatic sensor v3.x activation** και **Automatic Windows auditing configuration**. Αν έχεις διαδικασία διαχείρισης αλλαγών για τους Domain Controllers, πέρασέ το από εκεί πριν λήξει η ειδοποίηση.

**Πηγή:** [What's new in Microsoft Defender for Identity](https://learn.microsoft.com/en-us/defender-for-identity/whats-new) · [Activate the Defender for Identity sensor v3.x](https://learn.microsoft.com/en-us/defender-for-identity/deploy/activate-sensor#control-automatic-activation) · [Configure Windows event auditing](https://learn.microsoft.com/en-us/defender-for-identity/deploy/configure-windows-event-collection#control-automatic-windows-auditing) · Message Center MC1484018 (δημοσιεύθηκε στις 30 Σεπτεμβρίου 2026)

### 2. Purview: Network Data Security με Global Secure Access

**Φάση:** GA, με διάθεση από τα τέλη Σεπτεμβρίου έως τα τέλη Οκτωβρίου 2026 · **Άδεια:** Microsoft 365 E7, ή Purview E5 μαζί με Microsoft Entra Internet Access. Το Microsoft Entra Internet Access δεν περιλαμβάνεται στο Microsoft 365 E5.

**Τι αλλάζει.** Το Microsoft Entra Global Secure Access συνδέεται με το Purview και εφαρμόζει πολιτικές DLP στο επίπεδο του δικτύου: σε κείμενο, αρχεία και αλληλεπιδράσεις με AI. Η προστασία καλύπτει browsers, εφαρμογές, APIs και add-ins, άρα και την αποστολή ευαίσθητων δεδομένων σε πλατφόρμες generative AI, social media και εργαλεία συνεργασίας που δεν εμπιστεύεσαι. Η ίδια σύνδεση τροφοδοτεί το Insider Risk Management με ενδείξεις επικίνδυνης δραστηριότητας. Με το Global Secure Access οι πολιτικές δημιουργούνται πλέον χωρίς ρύθμιση pay-as-you-go, που εξακολουθεί να απαιτείται μόνο για λύσεις SASE τρίτων. Επειδή η διάθεση ολοκληρώνεται στα τέλη Οκτωβρίου, μπορεί να μην το βλέπεις ακόμα στο tenant σου.

**Τι να κάνεις.** Αν έχεις ήδη το Internet Access profile του Global Secure Access, αυτό είναι το επόμενο λογικό βήμα: ξεκίνα με μία πολιτική με ενέργεια **Audit only** για τις πλατφόρμες generative AI και δες τι πραγματικά φεύγει από τον οργανισμό πριν περάσεις σε **Block**. Το πώς στήνεται το profile το έχω περιγράψει στο [Global Secure Access, Μέρος 3: Internet Access profile](/posts/global-secure-access/global-secure-access-meros-3-internet-access-profile/).

**Πηγή:** [What's new in Microsoft Purview](https://learn.microsoft.com/en-us/purview/whats-new) · [Learn about Microsoft Purview Network Data Security](https://learn.microsoft.com/en-us/purview/dlp-network-data-security-learn) · Message Center [MC1419797](https://mc.merill.net/message/MC1419797) και [MC1478970](https://mc.merill.net/message/MC1478970) (αρχείο mc.merill.net)

### 3. Intune: ρυθμίσεις AI agent runtime protection του Defender for Endpoint

**Φάση:** Preview · **Άδεια:** Microsoft Defender for Endpoint Plan 2, Microsoft 365 E5, Microsoft 365 E7 ή Microsoft Agent 365. Δεν καλύπτεται από το Microsoft 365 E3.

**Τι αλλάζει.** Το AI agent runtime protection του Defender for Endpoint εντοπίζει και σταματά επιθέσεις prompt injection σε AI agents που τρέχουν τοπικά στη συσκευή. Ελέγχει τα prompts του χρήστη, τα αιτήματα προς εργαλεία πριν εκτελεστούν και τις απαντήσεις των εργαλείων. Με το service release 2609 του Intune οι ρυθμίσεις του μπήκαν σε νέο profile, το **Microsoft Defender AI agent runtime protection**, κάτω από Endpoint security → Antivirus. Η ρύθμιση **Ai Agent Protection** έχει τρεις τιμές: **Audit**, που επιτρέπει την ενέργεια και καταγράφει τον εντοπισμό, **Block**, που τη σταματά και ειδοποιεί τον χρήστη, και την προεπιλογή, που είναι απενεργοποιημένη. Οι εντοπισμοί εμφανίζονται στο Defender portal ως alert «Suspicious AI prompt injection».

**Τι να κάνεις.** Είναι Preview, οπότε δοκίμασέ το μόνο σε πιλοτικές συσκευές. Η Microsoft ζητά οι συσκευές δοκιμής να παίρνουν ενημερώσεις του Defender Antivirus από το Beta Channel, με το Defender Antivirus σε active mode και real-time protection ενεργό. Ξεκίνα με Audit σε όσους ήδη χρησιμοποιούν AI agents τοπικά και κοίταξε τα alerts πριν περάσεις σε Block.

**Πηγή:** [What's new in Microsoft Intune](https://learn.microsoft.com/en-us/intune/intune-service/fundamentals/whats-new) · [AI agent runtime protection with Microsoft Defender for Endpoint](https://learn.microsoft.com/en-us/defender-endpoint/ai-agent-runtime-protection-overview) · [Set up AI agent runtime protection](https://learn.microsoft.com/en-us/defender-endpoint/configure-ai-agent-runtime-protection)

### 4. Defender portal: Integrated Security Operations Center (ISOC)

**Φάση:** Preview · **Άδεια:** Microsoft Defender Suite, Microsoft 365 E5 ή Microsoft 365 E7, για οργανισμούς χωρίς ενεργό Microsoft Sentinel workspace

**Τι αλλάζει.** Το ISOC συγκεντρώνει XDR, SIEM, threat intelligence, αυτοματισμό και δυνατότητες AI μέσα στο Microsoft Defender portal. Από τις 23 Σεπτεμβρίου 2026 είναι διαθέσιμο σε πελάτες Microsoft Defender Suite, Microsoft 365 E5 και E7 που δεν έχουν ενεργό Microsoft Sentinel workspace. Σε αυτή τη φάση του Preview περιλαμβάνονται 30 ημέρες διατήρησης για τα δεδομένα του Defender. Οι δυνατότητες που εξαρτώνται από workspace (UEBA, Content Hub, δεδομένα τρίτων) θέλουν ISOC workspace με συνδρομή Azure, και η εισαγωγή επιπλέον δεδομένων μπορεί να χρεώνεται.

**Τι να κάνεις.** Αν έχεις ήδη ενεργό Sentinel workspace, η Microsoft λέει να συνεχίσεις με αυτό. Αν δεν έχεις, διάβασε τι περιλαμβάνεται και τι χρεώνεται πριν συνδέσεις πηγές δεδομένων. Είναι Preview και η Microsoft σημειώνει ότι δυνατότητες και διαθεσιμότητα μπορεί να αλλάξουν, οπότε μην το βάλεις ακόμα ως τεκμήριο σε έλεγχο.

**Πηγή:** [What's new in Microsoft Defender XDR](https://learn.microsoft.com/en-us/defender-xdr/whats-new) · [ISOC in Microsoft Defender](https://learn.microsoft.com/en-us/defender-xdr/isoc-overview)

### 5. Defender for Office 365: αναφορά ομαδικών κλήσεων στο Teams

**Φάση:** GA παγκοσμίως από τις αρχές Οκτωβρίου 2026, σύμφωνα με την ανακοίνωση · **Άδεια:** για την έρευνα των αναφορών στο Defender portal, Microsoft Defender for Office 365 Plan 1 ή Plan 2. Το Plan 1 περιλαμβάνεται πλέον στο Microsoft 365 E3.

**Τι αλλάζει.** Οι χρήστες μπορούν πλέον να αναφέρουν από το ιστορικό κλήσεων και τις ομαδικές κλήσεις του Teams, ολοκληρωμένες ή αναπάντητες, ως **Scam** ή **Not scam**. Η αναφορά κλήσεων υποστηρίζεται στο Teams desktop και στο Teams web, και η δυνατότητα είναι ενεργή από προεπιλογή στους clients. Οι αναφορές πηγαίνουν στο reporting mailbox, στη Microsoft ή και στα δύο, ανάλογα με τις ρυθμίσεις user reported settings.

**Τι να κάνεις.** Έλεγξε ότι είναι ενεργή η ρύθμιση **Report a call** στο Teams admin center (Calling settings) και ότι οι user reported settings στο Defender portal (Settings → Email & collaboration → User reported settings) στέλνουν τις αναφορές εκεί που τις παρακολουθεί η ομάδα σου, και πρόσθεσε μία γραμμή στην επόμενη ενημέρωση προς τους χρήστες. Το υπόβαθρο της δυνατότητας υπάρχει στο [Report a Call & Report a Meeting στο Microsoft Teams](/posts/new-features/report-a-call-report-a-meeting-teams-security-reporting/).

**Πηγή:** [What's new in Microsoft Defender for Office 365](https://learn.microsoft.com/en-us/defender-office-365/defender-for-office-365-whats-new) · [User reported settings in Teams](https://learn.microsoft.com/en-us/defender-office-365/submissions-teams) · Message Center [MC1447673](https://mc.merill.net/message/MC1447673) (αρχείο mc.merill.net)

## Προσοχή αυτή την εβδομάδα

Από τις πέντε αλλαγές, «ρολόι» έχει μόνο η πρώτη. Αν είσαι υπάρχων πελάτης του Defender for Identity και δεν κάνεις τίποτα, μετά τη λήξη της ειδοποίησης το portal θα ενεργοποιήσει μόνο του τον sensor v3.x και το Windows auditing στους κατάλληλους servers. Σύμφωνα με την ανακοίνωση MC1484018 της 30ής Σεπτεμβρίου 2026, η αυτόματη ενεργοποίηση ξεκινά σταδιακά στα τέλη Οκτωβρίου 2026 και η διάθεση κρατά έως τα τέλη Νοεμβρίου. Το banner με την επιλογή opt out εμφανίζεται πριν ξεκινήσει η ενεργοποίηση, για περιορισμένο διάστημα. Αν χάσεις την περίοδο του opt out, δεν κλειδώνεσαι: μετά την έναρξη μπορείς να αλλάξεις τις δύο ρυθμίσεις με το χέρι, όποτε θέλεις, στο Settings → Identities → Advanced features. Η Microsoft συνιστά επίσης να ενημερώσεις τις εσωτερικές σου οδηγίες, αν περιγράφουν χειροκίνητη ενεργοποίηση του sensor ή χειροκίνητη ρύθμιση του auditing. Οι ημερομηνίες μπορεί να διαφέρουν ανά tenant, οπότε δες την ανακοίνωση στο δικό σου Message Center.

Υπάρχει και μία απόσυρση που πέφτει μέσα στον Οκτώβριο. Σύμφωνα με την ανακοίνωση MC1243549, το SharePoint One-Time Passcode αποσύρεται και η πρόσβαση εξωτερικών χρηστών σε SharePoint και OneDrive περνά στο Microsoft Entra B2B. Η απόσυρση ξεκινά τον Οκτώβριο 2026 και αναμένεται να ολοκληρωθεί στις 31 Οκτωβρίου 2026. Εξωτερικοί χρήστες χωρίς guest account θα βλέπουν «access denied» σε παλιά links τύπου specific people. Δες τις πολιτικές external sharing και το Conditional Access για guests, βεβαιώσου ότι το Entra επιτρέπει προσκλήσεις guests και ότι το email one-time passcode δεν είναι απενεργοποιημένο στο Entra External ID, και ενημέρωσε τους χρήστες ότι μια νέα κοινή χρήση του αρχείου επαναφέρει την πρόσβαση. Οι ημερομηνίες διαφέρουν ανά tenant, οπότε επιβεβαίωσέ τες στο δικό σου Message Center.

**Πηγή:** [Message Center MC1243549 (αρχείο mc.merill.net)](https://mc.merill.net/message/MC1243549)

## Σύνδεση με την ΚΥΑ 1689/2025

- **[24.γ](/kya-1689-2025/#24-γ) και [24.ε](/kya-1689-2025/#24-ε), καταγραφή και έλεγχος καταγραφών:** το αυτόματο Windows auditing του Defender for Identity κλείνει κενά καταγραφής στους Domain Controllers. Κράτησε στο αρχείο σου την απόφαση (ενεργοποίηση ή opt out) και το σκεπτικό της.
- **[11.γ](/kya-1689-2025/#11-γ), ορθή χρήση αγαθών και δεδομένων:** το Purview Network Data Security δίνει τεχνική επιβολή της πολιτικής ορθής χρήσης και για τα εργαλεία generative AI.
- **[12.2.α](/kya-1689-2025/#12-2-α), πρόσβαση τρίτων:** η μετάβαση των εξωτερικών χρηστών του SharePoint στο Microsoft Entra B2B φέρνει την πρόσβασή τους κάτω από το Conditional Access για external users.

Όλες οι απαιτήσεις της ΚΥΑ 1689/2025 με την αντιστοίχισή τους βρίσκονται στον [οδηγό της ΚΥΑ 1689/2025](/kya-1689-2025/).

## Πηγές

Για αυτό το τεύχος ελέγχθηκαν οι σελίδες «What's new» των Microsoft Defender XDR, Defender for Endpoint, Defender for Office 365, Defender for Identity, Defender for Cloud Apps, Microsoft Intune, Microsoft Purview και Microsoft Entra, και για κάθε αλλαγή η σελίδα λεπτομερειών της στο Microsoft Learn. Οι σελίδες του Defender for Cloud Apps και του Entra δεν είχαν νέες καταχωρίσεις για την περίοδο όταν διαβάστηκαν. Οι ανακοινώσεις Message Center (MC1243549, MC1419797, MC1478970, MC1447673) διαβάστηκαν στο αρχείο mc.merill.net, που το συντηρεί η κοινότητα και όχι η Microsoft. Η MC1484018 προέρχεται από το Message Center του Microsoft 365 admin center. Για το AI agent runtime protection και το ISOC δεν βρέθηκε ανακοίνωση Message Center. Οι ανακοινώσεις και οι ημερομηνίες τους διαφέρουν ανά tenant.

Τελευταίος έλεγχος αδειών και στοιχείων: 2 Οκτωβρίου 2026.
