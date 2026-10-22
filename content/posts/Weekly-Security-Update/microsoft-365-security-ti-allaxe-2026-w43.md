---
title: "Microsoft 365 Security: τι άλλαξε (εβδομάδα 43/2026)"
date: 2026-10-23T08:00:00+03:00
lastmod: 2026-10-23T08:00:00+03:00
draft: true
keywords:
  - Microsoft 365 Security νέα
  - Choose Your Own Telephony Provider Entra
  - SMS voice MFA retirement
  - Intune Android Strong Integrity
  - Teams phishing detection
  - App Governance roles
  - Endpoint DLP FTP SFTP
tags:
  - Microsoft 365 Security
  - Microsoft Entra
  - Microsoft Intune
  - Microsoft Teams
  - Microsoft Defender for Cloud Apps
  - Microsoft Purview
  - Εβδομαδιαία σύνοψη
author: "Dimosthenis Atteia"
description: "Εβδομάδα 43/2026: δικός σου πάροχος SMS και voice στο Entra από 30/10, Android Strong Integrity στο Intune ως 31/10, phishing detection στο Teams."
summary: "Το Entra ανοίγει στις 30 Οκτωβρίου τη χρήση δικού σου παρόχου για SMS και voice MFA πριν από την απόσυρση της 1ης Φεβρουαρίου 2027, και το Intune εφαρμόζει τον νέο ορισμό του Strong Integrity για Android έως τις 31 Οκτωβρίου."
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
  - feature: "Entra: Choose Your Own Telephony Provider για SMS και voice (30 Οκτωβρίου 2026)"
    status: "Generally Available"
    license: "Δεν αναφέρεται"
    source: "https://learn.microsoft.com/en-us/entra/identity/authentication/concept-phone-providers"
    verified: 2026-10-22
  - feature: "Intune: νέος ορισμός Strong Integrity για Android 13 και νεότερα (31 Οκτωβρίου 2026)"
    status: "Not stated"
    license: "Δεν αναφέρεται"
    source: "https://learn.microsoft.com/en-us/intune/intune-service/fundamentals/whats-new#plan-for-change-google-play-strong-integrity-definition-update-for-android-13-or-above"
    verified: 2026-10-22
  - feature: "Teams: phishing detection στα μηνύματα και δική σου λίστα στο Weaponizable File Protection"
    status: "New Feature"
    license: "Δεν αναφέρεται"
    source: "https://learn.microsoft.com/en-us/microsoftteams/weaponizable-file-protection-teams"
    verified: 2026-10-22
  - feature: "Defender for Cloud Apps: αλλαγές δικαιωμάτων στο App Governance για ρόλους του Entra"
    status: "Generally Available"
    license: "Defender for Cloud Apps"
    source: "https://learn.microsoft.com/en-us/defender-cloud-apps/app-governance-get-started#required-roles"
    verified: 2026-10-22
  - feature: "Purview: Endpoint DLP για μεταφορές FTP και SFTP"
    status: "Generally Available"
    license: "Δεν αναφέρεται"
    source: "https://learn.microsoft.com/en-us/purview/endpoint-dlp-ftp-sftp-short"
    verified: 2026-10-22
---

## Με μια ματιά

Η πιο σημαντική αλλαγή της εβδομάδας είναι στο **Microsoft Entra**: από τις 30 Οκτωβρίου 2026 μπορείς να συνδέσεις δικό σου πάροχο τηλεφωνίας για SMS και voice MFA. Είναι ο μόνος τρόπος να κρατήσεις αυτές τις μεθόδους μετά την 1η Φεβρουαρίου 2027, όταν η Microsoft σταματά να τις παρέχει. Η πιο κοντινή προθεσμία είναι στο **Microsoft Intune**: έως τις 31 Οκτωβρίου εφαρμόζεται ο νέος ορισμός του Strong Integrity για Android 13 και νεότερα, και συσκευές χωρίς πρόσφατο security update μπορεί να χάσουν πρόσβαση.

## Οι αλλαγές της εβδομάδας

### 1. Microsoft Entra: δικός σου πάροχος για SMS και voice MFA από τις 30 Οκτωβρίου

**Φάση:** GA από τις 30 Οκτωβρίου 2026, σύμφωνα με την ανακοίνωση · **Άδεια:** δεν αναφέρεται στην πηγή

**Τι αλλάζει.** Με το **Choose Your Own Telephony Provider** επιλέγεις πάροχο από το Microsoft Security Store, και αυτός στέλνει τα SMS και κάνει τις κλήσεις για το MFA. Το Entra ID συνεχίζει να εφαρμόζει τα authentication method policies. Τη σύμβαση με τον πάροχο την κάνεις εσύ, και εσύ είσαι υπεύθυνος για την κάλυψη ανά χώρα, τους όρους και την παρακολούθηση της υπηρεσίας. Το Microsoft Learn αναφέρει ως αρχικούς παρόχους τις Soprano και Telesign και λέει ότι θα προστεθούν κι άλλοι. Η Microsoft επαναλαμβάνει ότι προτείνει passkeys και ότι ο πάροχος είναι μόνο για χρήστες με τεκμηριωμένη επιχειρησιακή, κανονιστική ή τεχνική ανάγκη για SMS ή voice.

Το πλαίσιο είναι το χρονοδιάγραμμα απόσυρσης. Από την 1η Φεβρουαρίου 2027 η Microsoft σταματά να παρέχει SMS και voice για όλους εκτός από τους Global Administrators και τους εξωτερικούς χρήστες, για τους οποίους η ημερομηνία είναι η 1η Ιουλίου 2027. Οι εσωτερικοί guest users ακολουθούν την 1η Φεβρουαρίου. Μετά από αυτές τις ημερομηνίες, όποιος έχει μόνη μέθοδο MFA το SMS ή το voice θα πρέπει να καταχωρίσει passkey για να συνδεθεί, χωρίς δυνατότητα παράκαμψης, εκτός αν έχεις ρυθμίσει πάροχο.

**Τι να κάνεις.**

- Βρες ποιοι χρήστες έχουν ακόμη SMS ή voice. Το Microsoft Learn δίνει ένα PowerShell script για αυτό, που χρειάζεται Global Reader, Authentication Policy Administrator ή Security Reader.
- Για κάθε ομάδα χρηστών αποφάσισε: passkey ή πάροχος. Αν επιλέξεις πάροχο, τεκμηρίωσε γιατί το passkey δεν αρκεί.
- Αν πας σε πάροχο, ξεκίνα τώρα την προμήθεια. Σύμφωνα με την ανακοίνωση, η αγορά μέσω Security Store θέλει Azure billing subscription, resource group και τον κατάλληλο ρόλο στο Azure. Βάλε στη συζήτηση τη νομική υπηρεσία και τον DPO, γιατί ο πάροχος θα επεξεργάζεται αριθμούς τηλεφώνου των χρηστών σου.
- Για όλους τους υπόλοιπους, προχώρησε το registration campaign για passkeys. Για το γενικό πλαίσιο, δες το άρθρο για τα [passkeys ως προεπιλογή και το τέλος των SMS και voice στο MFA](/posts/passkeys-by-default-telos-sms-voice-mfa/).

**Πηγή:** [Choose a telephony provider for SMS and voice authentication](https://learn.microsoft.com/en-us/entra/identity/authentication/concept-phone-providers) · [Passkeys by default and retirement of Microsoft-provided SMS and voice authentication](https://learn.microsoft.com/en-us/entra/identity/authentication/concept-sms-voice-retirement) · Message Center [MC1519855](https://mc.merill.net/message/MC1519855) (αρχείο mc.merill.net, δημοσιεύθηκε στις 21 Οκτωβρίου 2026)

### 2. Microsoft Intune: νέος ορισμός του Strong Integrity για Android 13 και νεότερα

**Φάση:** δεν αναφέρεται στην πηγή, εφαρμογή έως τις 31 Οκτωβρίου 2026 · **Άδεια:** δεν αναφέρεται στην πηγή

**Τι αλλάζει.** Η Google άλλαξε τον ορισμό του «Strong Integrity» για συσκευές με Android 13 ή νεότερο: χρειάζονται πλέον hardware-backed security signals και πρόσφατα security updates. Το Intune θα εφαρμόσει την αλλαγή έως τις 31 Οκτωβρίου 2026. Συσκευές με Android 13 ή νεότερο χωρίς security update τους τελευταίους 12 μήνες δεν θα πληρούν πια το Strong Integrity. Το αποτέλεσμα: πιθανό block στο conditional launch των app protection policies, και συσκευές που γίνονται noncompliant και χάνουν πρόσβαση μέσω Conditional Access. Οι συσκευές με Android 12 ή παλαιότερο δεν επηρεάζονται.

**Τι να κάνεις.** Άνοιξε το app protection status report και δες την ημερομηνία του τελευταίου Android Security Patch ανά συσκευή. Ειδοποίησε τώρα τους χρήστες με παλιό patch, πριν τους κόψει η πρόσβαση. Για προειδοποίηση πριν από το block, χρησιμοποίησε τα **Min OS version** και **Min patch version** στο conditional launch των app protection policies, και το **Minimum security patch level** στα compliance policies για Android Enterprise. Ενημέρωσε και το help desk, ώστε να ξέρει τι να απαντήσει όταν μια εφαρμογή της εταιρείας σταματήσει να ανοίγει σε κινητό.

**Πηγή:** [What's new in Microsoft Intune: Plan for Change: Google Play strong integrity definition update for Android 13 or above](https://learn.microsoft.com/en-us/intune/intune-service/fundamentals/whats-new#plan-for-change-google-play-strong-integrity-definition-update-for-android-13-or-above)

### 3. Microsoft Teams: phishing detection στα μηνύματα και δική σου λίστα αρχείων προς αποκλεισμό

**Φάση:** phishing detection σε Targeted Release από τις αρχές Νοεμβρίου και GA από τις αρχές Δεκεμβρίου 2026· προσαρμογή του Weaponizable File Protection σε GA από τις αρχές Νοεμβρίου 2026, σύμφωνα με τις ανακοινώσεις · **Άδεια:** δεν αναφέρεται στην πηγή

**Τι αλλάζει.** Η πρώτη αλλαγή είναι ένας νέος μηχανισμός ανίχνευσης phishing στα chats του Teams, που βασίζεται σε AI και αναλύει το πλαίσιο της συζήτησης. Εντοπίζει phishing, social engineering και impersonation ακόμη και χωρίς κακόβουλο link ή αρχείο. Οι περισσότεροι χρήστες θα τον δουν σε chats με εξωτερικούς που επικοινωνούν πρώτη φορά. Ο χρήστης βλέπει κόκκινο banner με προειδοποίηση και μπορεί να κάνει block και report τον αποστολέα ή να σημειώσει ένα λάθος ως «Report as not a concern». Σύμφωνα με την ανακοίνωση, δεν χρειάζεται ρύθμιση, η ανίχνευση μπορεί να τρέχει αθόρυβα στην αρχή πριν εμφανιστούν προειδοποιήσεις, και το περιεχόμενο των μηνυμάτων δεν κρατιέται για εκπαίδευση μοντέλων.

Η δεύτερη αλλαγή αφορά το **Weaponizable File Protection**. Σήμερα η λίστα με τις καταλήξεις αρχείων που μπλοκάρει δεν αλλάζει. Μετά τη διάθεση θα μπορείς να κρατήσεις τη λίστα της Microsoft, που ενημερώνεται αυτόματα, ή να φτιάξεις δική σου. Αν την αλλάξεις, παύει να παίρνει τις ενημερώσεις της Microsoft μέχρι να την επαναφέρεις στην προεπιλογή.

**Τι να κάνεις.** Για το phishing detection, ενημέρωσε τους χρήστες τι σημαίνει το κόκκινο banner και πώς κάνουν report, και ενημέρωσε το SOC ότι θα έρθουν αναφορές από αυτό. Για το Weaponizable File Protection, έλεγξε στο Teams admin center (Messaging settings → Messaging safety) ότι το **Scan messages for file types that are not allowed** είναι ενεργό. Όταν έρθει η προσαρμογή, πρόσθεσε καταλήξεις αν το χρειάζεσαι, αλλά μην αφαιρείς από τη λίστα της Microsoft χωρίς λόγο: χάνεις τις αυτόματες ενημερώσεις. Για την ασφάλεια των μηνυμάτων στο Teams, δες και το άρθρο για το [Security Detection Report στο Teams Admin Center](/posts/teams-security-detection-report/).

**Πηγή:** [Weaponizable File Protection in Microsoft Teams](https://learn.microsoft.com/en-us/microsoftteams/weaponizable-file-protection-teams) · [Phishing content detection in Microsoft Teams](https://support.microsoft.com/teams/chat/phishing-content-detection-microsoft-teams) · Message Center [MC1519866](https://mc.merill.net/message/MC1519866) (δημοσιεύθηκε στις 21 Οκτωβρίου 2026) και [MC1509801](https://mc.merill.net/message/MC1509801) (δημοσιεύθηκε στις 15 Οκτωβρίου 2026), αρχείο mc.merill.net

### 4. Defender for Cloud Apps: αλλάζουν τα δικαιώματα ρόλων του Entra στο App Governance

**Φάση:** GA από τα μέσα έως τα τέλη Νοεμβρίου 2026, σύμφωνα με την ανακοίνωση όπως ενημερώθηκε στις 20 Οκτωβρίου 2026 · **Άδεια:** Microsoft Defender for Cloud Apps, που δεν περιλαμβάνεται στο Microsoft 365 E3

**Τι αλλάζει.** Το App Governance περνά στο Unified RBAC του Defender XDR, και αλλάζει τι μπορούν να κάνουν συγκεκριμένοι ρόλοι του Entra:

- Ο **Cloud App Security Administrator** αποκτά δικαίωμα να βλέπει και να διαχειρίζεται τα App Governance policies.
- Ο **Compliance Administrator** χάνει τη διαχείριση των App Governance policies και την ενεργοποίηση ή απενεργοποίηση του App Governance από τα Settings.
- Ο **Compliance Data Administrator** χάνει την ενεργοποίηση ή απενεργοποίηση του App Governance από τα Settings.
- Τα custom Unified RBAC roles για το Defender for Cloud Apps αποκτούν πρόσβαση στο App Governance.

Η ανακοίνωση δημοσιεύθηκε στις 25 Σεπτεμβρίου. Στις 20 Οκτωβρίου η GA μετατέθηκε από μέσα και τέλη Οκτωβρίου στα μέσα και τέλη Νοεμβρίου.

**Τι να κάνεις.** Δες ποιοι διαχειρίζονται σήμερα το App Governance μέσω Compliance Administrator ή Compliance Data Administrator. Αν πρέπει να συνεχίσουν, δώσε τους άλλον υποστηριζόμενο ρόλο ή custom Unified RBAC role, με least privilege. Έλεγξε επίσης ποιοι έχουν Cloud App Security Administrator, αφού ο ρόλος αποκτά περισσότερα δικαιώματα. Ενημέρωσε την τεκμηρίωση ρόλων σου. Για το προϊόν, δες την [πρακτική περιήγηση στο Defender for Cloud Apps](/posts/microsoft-defender-up-close-series/microsoft-defender-for-cloud-apps-deep-dive/).

**Πηγή:** [Turn on app governance: Required roles](https://learn.microsoft.com/en-us/defender-cloud-apps/app-governance-get-started#required-roles) · [App governance FAQ](https://learn.microsoft.com/en-us/defender-cloud-apps/app-governance-faq) · Message Center [MC1479503](https://mc.merill.net/message/MC1479503) (αρχείο mc.merill.net, δημοσιεύθηκε στις 25 Σεπτεμβρίου 2026, ενημερώθηκε στις 20 Οκτωβρίου 2026)

### 5. Microsoft Purview: το Endpoint DLP ελέγχει μεταφορές μέσω FTP και SFTP

**Φάση:** GA, Οκτώβριος 2026 · **Άδεια:** δεν αναφέρεται στην πηγή

**Τι αλλάζει.** Το Endpoint DLP μπορεί πλέον να ελέγχει ευαίσθητα δεδομένα που φεύγουν μέσω FTP και SFTP από managed συσκευές Windows, όπως ήδη κάνει για USB και network shares. Στον κανόνα της πολιτικής επιλέγεις **FTP and SFTP transfers** με ενέργεια Audit only, Block, Block with override ή Allow. Οι μεταφορές φαίνονται στο Activity explorer ως «File transfer by FTP/SFTP», και υποστηρίζεται full file evidence collection.

**Τι να κάνεις.** Ακολούθησε τη σύσταση της Microsoft: ξεκίνα με πιλοτική ομάδα σε Audit only και δες στο Activity explorer ποιος μεταφέρει τι μέσω FTP ή SFTP. Συνήθως θα βρεις και νόμιμες ροές, για παράδειγμα προς λογιστικό γραφείο ή τράπεζα. Τεκμηρίωσέ τες πριν περάσεις σε Block. Η διαδρομή είναι Purview portal → Data loss prevention → Policies → Create policy, με location Devices.

**Πηγή:** [Protect FTP and SFTP transfers with Microsoft Purview Endpoint DLP](https://learn.microsoft.com/en-us/purview/endpoint-dlp-ftp-sftp-short) · [What's new in Microsoft Purview](https://learn.microsoft.com/en-us/purview/whats-new)

## Προσοχή αυτή την εβδομάδα

**30 Οκτωβρίου 2026, Microsoft Entra.** Γίνεται διαθέσιμη η ρύθμιση δικού σου παρόχου για SMS και voice (αλλαγή 1).

**31 Οκτωβρίου 2026, Microsoft Intune.** Εφαρμόζεται ο νέος ορισμός του Strong Integrity για Android 13 και νεότερα (αλλαγή 2).

**Αρχές Νοεμβρίου 2026, Microsoft Teams.** Ξεκινούν το phishing detection σε Targeted Release και η προσαρμογή του Weaponizable File Protection (αλλαγή 3).

**4 Νοεμβρίου 2026, Microsoft Entra.** Υπενθύμιση από το [προηγούμενο τεύχος](/posts/weekly-security-update/microsoft-365-security-ti-allaxe-2026-w42/): αλλάζει η προεπιλογή για το ποιος δημιουργεί agent blueprints.

**Μέσα έως τέλη Νοεμβρίου 2026, Defender for Cloud Apps.** Αλλάζουν τα δικαιώματα ρόλων στο App Governance (αλλαγή 4).

**1 Φεβρουαρίου 2027, Microsoft Entra.** Αποσύρονται τα SMS και voice της Microsoft για όλους εκτός από Global Administrators και εξωτερικούς χρήστες (αλλαγή 1).

Οι ημερομηνίες των ανακοινώσεων μπορεί να διαφέρουν ανά tenant, οπότε δες τις στο δικό σου Message Center.

## Σύνδεση με την ΚΥΑ 1689/2025

- **[13.στ](/kya-1689-2025/#13-στ) και [13.ζ](/kya-1689-2025/#13-ζ), ισχυρή αυθεντικοποίηση και MFA:** η μετάβαση από SMS και voice σε passkeys ανεβάζει το επίπεδο αυθεντικοποίησης. Όπου κρατήσεις SMS μέσω παρόχου, τεκμηρίωσε την ανάγκη ανά ομάδα χρηστών.
- **[12.1.β](/kya-1689-2025/#12-1-β), κατάλογος προμηθευτών:** ο πάροχος τηλεφωνίας για το MFA είναι νέος προμηθευτής που συμμετέχει στην αυθεντικοποίηση. Πρόσθεσέ τον στον κατάλογο με την κρισιμότητά του.
- **[17.γ](/kya-1689-2025/#17-γ), ενημερώσεις ασφάλειας σε εύλογο χρόνο:** ο νέος ορισμός του Strong Integrity δένει την πρόσβαση στα δεδομένα με το security patch της συσκευής Android, και το Minimum security patch level στο compliance policy είναι το τεκμήριο.
- **[20.α](/kya-1689-2025/#20-α) και [21.α](/kya-1689-2025/#21-α), κακόβουλο λογισμικό και ευαισθητοποίηση:** το Weaponizable File Protection μπλοκάρει επικίνδυνα αρχεία στο Teams, και το νέο banner για phishing είναι καλή αφορμή για ένα σύντομο μήνυμα ευαισθητοποίησης.
- **[13.γ](/kya-1689-2025/#13-γ) και [13.δ](/kya-1689-2025/#13-δ), least privilege και περιορισμός δικαιωμάτων διαχείρισης:** η αλλαγή στους ρόλους του App Governance είναι ευκαιρία να ελέγξεις ποιος διαχειρίζεται πραγματικά τις πολιτικές για OAuth apps.
- **[11.γ](/kya-1689-2025/#11-γ), ορθή χρήση δεδομένων:** ο έλεγχος των μεταφορών μέσω FTP και SFTP με Endpoint DLP επιβάλλει τεχνικά την πολιτική ορθής χρήσης.

Όλες οι απαιτήσεις της ΚΥΑ 1689/2025 με την αντιστοίχισή τους βρίσκονται στον [οδηγό της ΚΥΑ 1689/2025](/kya-1689-2025/).

## Πηγές και επαλήθευση {#last-verified}

{{< verification >}}

Για αυτό το τεύχος ελέγχθηκαν το αρχείο mc.merill.net (αναρτήσεις Message Center από τις 16 έως τις 22 Οκτωβρίου 2026) και οι σελίδες «What's new» των Microsoft Defender XDR, Defender for Endpoint, Defender for Office 365, Defender for Identity, Defender for Cloud Apps, Microsoft Intune, Microsoft Purview και Microsoft Entra. Οι σελίδες των Defender XDR και Entra δεν είχαν καταχωρίσεις Οκτωβρίου. Η σελίδα του Intune δεν είχε νέα εβδομάδα μετά τις 12 Οκτωβρίου, και η αλλαγή 2 προέρχεται από την ενότητα «Notices» της ίδιας σελίδας. Οι καταχωρίσεις Οκτωβρίου των Defender for Endpoint, Defender for Office 365 και Defender for Cloud Apps καλύφθηκαν σε προηγούμενα τεύχη, εκτός από το νέο πεδίο ApproverUpn στον πίνακα EmailPostDeliveryEvents του advanced hunting, που δεν μπήκε στις πέντε αλλαγές. Η σελίδα του Defender for Identity προσθέτει, σε σχέση με το προηγούμενο τεύχος, έξι alerts για ύποπτη καταχώριση μεθόδων MFA και συσκευών στο Entra ID, ένα alert για το CVE-2026-54121 (Certighost) στο AD CS, και τη GA του sensor v3.x χωρίς Defender for Endpoint. Στο blog του Microsoft Entra, το «What's new in Microsoft Entra: October 2026» δημοσιεύθηκε στις 12 Οκτωβρίου και δεν προσθέτει κάτι στα παραπάνω. Δεν βρέθηκε άλλη ανακοίνωση της εβδομάδας στα blogs για Security και Intune.

Οι ανακοινώσεις MC1519855, MC1519866, MC1509801 και MC1479503 διαβάστηκαν από το έγκυρο, δημόσιο και ανεξάρτητο αρχείο του Microsoft 365 Message Center, mc.merill.net, που το συντηρεί η κοινότητα και όχι η Microsoft. Δεν διαβάστηκαν σε Message Center κάποιου tenant. Το πόσο επιβεβαιώνονται από τη Microsoft διαφέρει ανά θέμα:

- **Entra (MC1519855):** η 30ή Οκτωβρίου, οι πάροχοι και οι ημερομηνίες απόσυρσης επιβεβαιώνονται από το Microsoft Learn. Το Learn λέει ότι η ρύθμιση γίνεται διαθέσιμη από τις 30 Οκτωβρίου και αναφέρει τους παρόχους της private preview. Τη φάση GA τη δίνει η ανακοίνωση.
- **Intune:** προέρχεται μόνο από τη σελίδα «What's new» του Intune. Δεν βρέθηκε ανακοίνωση Message Center της εβδομάδας.
- **Teams (MC1519866, MC1509801):** η συμπεριφορά του phishing detection επιβεβαιώνεται από τη σελίδα υποστήριξης της Microsoft. Το Microsoft Learn για το Weaponizable File Protection γράφει ακόμη ότι η λίστα δεν αλλάζει από τους διαχειριστές, οπότε η προσαρμογή και οι ημερομηνίες προέρχονται μόνο από την ανακοίνωση.
- **Defender for Cloud Apps (MC1479503):** η αλλαγή στους ρόλους και οι ημερομηνίες προέρχονται μόνο από την ανακοίνωση. Ο πίνακας ρόλων στο Microsoft Learn δείχνει ακόμη τα σημερινά δικαιώματα. Η ανάγκη για Defender for Cloud Apps επιβεβαιώνεται από το FAQ του App Governance.
- **Purview:** προέρχεται μόνο από τις σελίδες του Microsoft Learn.

Οι ανακοινώσεις και οι ημερομηνίες τους διαφέρουν ανά tenant. Πριν ενεργήσεις, δες την αντίστοιχη ανακοίνωση στο δικό σου Message Center.

Τελευταίος έλεγχος αδειών και στοιχείων: 22 Οκτωβρίου 2026.
