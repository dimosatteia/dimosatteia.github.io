---
title: "Microsoft Defender for Cloud Apps: Μια πρακτική περιήγηση στο CASB"
seoTitle: "Microsoft Defender for Cloud Apps: πρακτικός οδηγός CASB"
date: 2026-10-24T13:00:00+03:00
lastmod: 2026-10-24T13:00:00+03:00
draft: false
# Εμφανίζεται ως «Νέο άρθρο» στην αρχική, μέχρι να βγει νεότερο τεύχος της εβδομαδιαίας σύνοψης
homeHighlight: true
keywords:
  - Microsoft Defender for Cloud Apps
  - Microsoft Defender for Cloud Apps οδηγός
  - CASB Microsoft
  - Shadow IT discovery
  - Cloud Discovery Defender for Endpoint integration
  - OAuth app governance
  - Conditional Access App Control session policy
  - Activity policies Defender for Cloud Apps
  - File policies migration Purview DLP
  - Block download unmanaged devices SharePoint
tags:
  - Microsoft Defender for Cloud Apps
  - Microsoft Defender XDR
  - CASB
  - SaaS Security
  - Shadow IT
  - OAuth
  - Microsoft 365 Security
author: "Dimosthenis Atteia"
description: "Πρακτικός οδηγός για το Microsoft Defender for Cloud Apps: Shadow IT discovery, OAuth app governance, Conditional Access App Control και activity policies."
summary: "Το Microsoft Defender for Cloud Apps όπως το χρειάζεται ένας επαγγελματίας στην πράξη. Shadow IT discovery μέσω του cloud app catalog, OAuth app governance, session policies του Conditional Access App Control, activity policies, και η μετάβαση των file policies στο Microsoft Purview."
categories: ["Cloud Security"]
series: ["Microsoft Defender Up Close"]
ShowToc: true
TocOpen: false
weight: -6
cover:
  image: "/images/MDE/MDCA.png"
  alt: "Microsoft Defender for Cloud Apps, αναλυτικός οδηγός"
  caption: "Microsoft Defender Up Close"
  relative: false
ShowReadingTime: true
ShowWordCount: true
# Πλαίσιο «Last verified»: κάθε χαρακτηριστικό με τη φάση, την άδεια, την πηγή και την ημερομηνία ελέγχου
verification:
  - feature: "Microsoft Defender for Cloud Apps"
    status: "Generally Available"
    license: "Defender for Cloud Apps (Microsoft 365 E5, EMS E5 ή standalone)"
    source: "https://learn.microsoft.com/en-us/defender-cloud-apps/what-is-defender-for-cloud-apps"
    verified: 2026-10-24
  - feature: "Cloud Discovery"
    status: "Generally Available"
    license: "Defender for Cloud Apps (Microsoft 365 E5, EMS E5 ή standalone)"
    source: "https://learn.microsoft.com/en-us/defender-cloud-apps/set-up-cloud-discovery"
    verified: 2026-10-24
  - feature: "App risk score (0 έως 10, πάνω από 90 παράγοντες)"
    status: "Generally Available"
    license: "Defender for Cloud Apps (Microsoft 365 E5, EMS E5 ή standalone)"
    source: "https://learn.microsoft.com/en-us/defender-cloud-apps/risk-score"
    verified: 2026-10-24
  - feature: "Ενσωμάτωση με Defender for Endpoint"
    status: "Generally Available"
    license: "Defender for Cloud Apps + MDE Plan 2 ή Defender for Business"
    source: "https://learn.microsoft.com/en-us/defender-cloud-apps/mde-integration"
    verified: 2026-10-24
  - feature: "Μπλοκάρισμα unsanctioned εφαρμογών μέσω Defender for Endpoint"
    status: "Generally Available"
    license: "Defender for Cloud Apps + MDE Plan 2 ή Defender for Business"
    source: "https://learn.microsoft.com/en-us/defender-cloud-apps/mde-govern"
    verified: 2026-10-24
  - feature: "App governance (Entra ID, Google, Salesforce)"
    status: "Generally Available"
    license: "Defender for Cloud Apps (Microsoft 365 E5, EMS E5 ή standalone)"
    source: "https://learn.microsoft.com/en-us/defender-cloud-apps/app-governance-manage-app-governance"
    verified: 2026-10-24
  - feature: "Conditional Access App Control"
    status: "Generally Available"
    license: "Defender for Cloud Apps (Microsoft 365 E5, EMS E5 ή standalone) + Entra ID P1"
    source: "https://learn.microsoft.com/en-us/defender-cloud-apps/proxy-intro-aad"
    verified: 2026-10-24
  - feature: "Session policies"
    status: "Generally Available"
    license: "Defender for Cloud Apps (Microsoft 365 E5, EMS E5 ή standalone) + Entra ID P1"
    source: "https://learn.microsoft.com/en-us/defender-cloud-apps/session-policy-aad"
    verified: 2026-10-24
  - feature: "Activity policies"
    status: "Generally Available"
    license: "Defender for Cloud Apps (Microsoft 365 E5, EMS E5 ή standalone)"
    source: "https://learn.microsoft.com/en-us/defender-cloud-apps/user-activity-policies"
    verified: 2026-10-24
  - feature: "Απόσυρση file policies (6 Ιανουαρίου 2027)"
    status: "Retirement"
    license: "Defender for Cloud Apps (Microsoft 365 E5, EMS E5 ή standalone)"
    source: "https://learn.microsoft.com/en-us/defender-cloud-apps/migrate-file-policies-to-purview"
    verified: 2026-10-24
# MITRE ATT&CK®: ονόματα στο data/mitre.yaml
mitre: ["T1528", "T1078.004"]
---

## Γιατί υπάρχουν τα CASBs

Ένα CASB (Cloud Access Security Broker) υπάρχει επειδή ο τρόπος που δουλεύουν οι άνθρωποι άλλαξε πιο γρήγορα απ' ό,τι μπορούσαν να προσαρμοστούν τα παραδοσιακά εργαλεία ασφάλειας. Πριν από δεκαπέντε χρόνια, η στοίβα ασφάλειάς σας βρισκόταν ανάμεσα στους χρήστες και σε έναν μικρό αριθμό εφαρμογών που είχατε εγκρίνει. Σήμερα οι χρήστες σας αυθεντικοποιούνται καθημερινά σε δεκάδες cloud υπηρεσίες, πολλές από τις οποίες η ομάδα IT δεν ενέκρινε ποτέ ρητά.

Το **[Microsoft Defender for Cloud Apps](https://learn.microsoft.com/en-us/defender-cloud-apps/what-is-defender-for-cloud-apps)** είναι η απάντηση της Microsoft σε αυτό το πρόβλημα. Σας δίνει **ορατότητα** στο ποιες cloud εφαρμογές χρησιμοποιούν πραγματικά οι χρήστες σας, **έλεγχο (governance)** στις OAuth συναινέσεις και στη χρήση αυτών των εφαρμογών, και **προστασία από απειλές** απέναντι στην ανώμαλη συμπεριφορά χρηστών που υποδηλώνει παραβιασμένο λογαριασμό.

Αυτό το άρθρο είναι η πρακτική συνέχεια του **[2ου μέρους της σειράς Defender Demystified](/posts/defender-demystified-series/defender-demystified-part-2-four-workloads/)**. Τέσσερις βασικές δυνατότητες, μία κάθε φορά.

## Δυνατότητα 1: Shadow IT discovery

Η δυνατότητα που ανοίγει περισσότερο τα μάτια όταν ενεργοποιείτε για πρώτη φορά το Microsoft Defender for Cloud Apps είναι το **Shadow IT discovery**. Το προϊόν λαμβάνει logs από το όριο του δικτύου σας (firewalls, web proxies) ή από το Microsoft Defender for Endpoint (που ήδη βλέπει τη web κίνηση των συσκευών σας), τα συσχετίζει με έναν κατάλογο **άνω των 31.000 cloud εφαρμογών** και παράγει ένα dashboard με το τι χρησιμοποιούν πραγματικά οι χρήστες σας.

[![Εντοπισμένες cloud εφαρμογές στο Cloud Discovery](/images/Microsoft-Defender/mdca-01-discovered-apps.webp)](/images/Microsoft-Defender/mdca-01-discovered-apps.webp)
> 📷 **Εικόνα 1:** Cloud app catalog / dashboard εντοπισμένων εφαρμογών. Defender portal → Cloud apps → Cloud Discovery → Discovered apps.

Από την εμπειρία μου, αυτό που θα βρείτε σχεδόν πάντα είναι:

- Αρκετές φορές περισσότερες εφαρμογές απ' όσες πίστευε η ομάδα IT
- Μια μακριά «ουρά» εφαρμογών χαμηλής χρήσης (εργαλεία marketing, μετατροπείς αρχείων, τυχαία SaaS στα οποία γράφτηκε ένας μόνο χρήστης)
- Μια χούφτα πραγματικά επικίνδυνων εφαρμογών που πρέπει να αντιμετωπίσετε (μη εγκεκριμένος διαμοιρασμός αρχείων, μη διαχειριζόμενος αποθηκευτικός χώρος, εργαλεία AI χωρίς συμμόρφωση)

Κάθε εφαρμογή στον κατάλογο έχει ένα **risk score** (0 έως 10) που υπολογίζεται από περισσότερους από 90 παράγοντες κινδύνου: κρυπτογράφηση δεδομένων σε ηρεμία (at rest), συμμόρφωση με τον GDPR, πιστοποίηση SOC 2, πολιτικές διατήρησης δεδομένων, υποστήριξη SSO, υποστήριξη SAML κ.ο.κ. Μπορείτε να προσαρμόσετε τα βάρη της βαθμολόγησης αν ο οργανισμός σας έχει συγκεκριμένες προτεραιότητες.

**Ο ευκολότερος τρόπος να ενεργοποιήσετε το discovery** είναι μέσω της ενσωμάτωσης με το Microsoft Defender for Endpoint. Δεν απαιτεί καμία αλλαγή στο δίκτυο, αλλά έχει προαπαιτούμενα: **Microsoft Defender for Endpoint Plan 2** (ή Microsoft Defender for Business) και συσκευές που έχουν γίνει onboarding. Την ενεργοποιείτε στο Defender portal, στο **Settings → Endpoints → General → Advanced features**, με τον διακόπτη **Microsoft Defender for Cloud Apps**. Τα δεδομένα εμφανίζονται μέσα σε περίπου δύο ώρες.

[![Ο διακόπτης Microsoft Defender for Cloud Apps στο Defender portal](/images/Microsoft-Defender/mdca-02-cloud-apps-optional-feature.webp)](/images/Microsoft-Defender/mdca-02-cloud-apps-optional-feature.webp)
> 📷 **Εικόνα 2:** Διακόπτης ενσωμάτωσης Microsoft Defender for Cloud Apps. Defender portal → Settings → Endpoints → General → Advanced features.

**Τι να κάνετε με τα αποτελέσματα του discovery:** δουλέψτε τις 20 πρώτες μη εγκεκριμένες εφαρμογές με βάση τη χρήση και αποφασίστε ποιες θα **εγκρίνετε (sanction)**, ποιες θα **απορρίψετε (unsanction)** και ποιες θα **διερευνήσετε περαιτέρω**. Για να μπλοκάρεται πραγματικά η πρόσβαση στις απορριφθείσες εφαρμογές μέσω του Defender for Endpoint χρειάζονται τρία πράγματα: το **Enforce app access** στο **Settings → Cloud Apps → Cloud Discovery → Microsoft Defender for Endpoint**, τα **Custom network indicators** ενεργά στο **Settings → Endpoints → General → Advanced features**, και το **network protection** σε **block mode** στις συσκευές. Είναι συνεχής διαδικασία, όχι εφάπαξ «καθάρισμα».

## Δυνατότητα 2: OAuth app governance

Αυτή η δυνατότητα υποτιμάται. Όταν ένας χρήστης δίνει σε μια OAuth εφαρμογή άδεια πρόσβασης στα δεδομένα του Microsoft 365 (για παράδειγμα, μια εφαρμογή προγραμματισμού ραντεβού που θέλει να διαβάζει και να γράφει στο ημερολόγιό του), αυτή η άδεια παραμένει, αόρατα, μέχρι να ανακληθεί ρητά. Αν ο χρήστης εξαπατήθηκε μέσω phishing ώστε να δώσει συναίνεση σε μια κακόβουλη εφαρμογή, ο επιτιθέμενος έχει πλέον συνεχή πρόσβαση στο email ή στα αρχεία **χωρίς να έχει κλέψει ποτέ κωδικό**.

Το **[App governance στο Microsoft Defender for Cloud Apps](https://learn.microsoft.com/en-us/defender-cloud-apps/app-governance-manage-app-governance)** σας δίνει ορατότητα και έλεγχο στις OAuth εφαρμογές που είναι καταχωρημένες στο Microsoft Entra ID, στο Google και στο Salesforce.

[![Επισκόπηση OAuth apps στο app governance](/images/Microsoft-Defender/mdca-03-oauth-apps.webp)](/images/Microsoft-Defender/mdca-03-oauth-apps.webp)
> 📷 **Εικόνα 3:** Επισκόπηση OAuth εφαρμογών στο App governance. Defender portal → Cloud apps → App governance → Entra ID.

Τι να αναζητήσετε:

- **Εφαρμογές που ζητούν δικαιώματα υψηλών προνομίων**: οτιδήποτε ζητά Mail.ReadWrite, Files.ReadWrite.All ή Directory.Read.All χωρίς προφανή επιχειρηματικό λόγο
- **Εφαρμογές από άγνωστους publishers**: οι νόμιμοι κατασκευαστές έχουν γενικά status verified publisher
- **Εφαρμογές με λίγους χρήστες στο tenant σας αλλά ευρέα δικαιώματα**: ένας μόνο χρήστης με μια εφαρμογή υψηλού κινδύνου είναι συνηθισμένο αποτέλεσμα phishing
- **Εφαρμογές που έχουν επισημανθεί από το threat intelligence της Microsoft**: το portal τις σημειώνει άμεσα

Τα alerts του app governance εμφανίζονται στη λίστα alerts του Microsoft Defender με **Detection source: App Governance**. Ελέγχετε τις επισημασμένες εφαρμογές εβδομαδιαία και ανακαλείτε ή περιορίζετε όσες δεν έχουν επιχειρηματική αιτιολόγηση.

{{< kql-link id="oauth-consent" lead="Θέλετε τεκμήριο από το δικό σας tenant;" label="Τρέξτε το KQL για τις συγκαταθέσεις σε εφαρμογές OAuth" tail="στο Advanced Hunting." >}}

## Δυνατότητα 3: Conditional Access App Control

Το **[Conditional Access App Control](https://learn.microsoft.com/en-us/defender-cloud-apps/proxy-intro-aad)** είναι η μηχανή πολιτικών σε επίπεδο session. Ενσωματώνεται με το Conditional Access του Microsoft Entra ID για να εφαρμόζει **ελέγχους σε πραγματικό χρόνο** σε sessions μέσω browser. Όχι απλώς «μπλοκάρω ή επιτρέπω» κατά τη σύνδεση, αλλά «επιτρέπω, με περιορισμούς στο τι μπορεί να κάνει ο χρήστης μόλις μπει». Οι χρήστες του Microsoft Edge προστατεύονται απευθείας μέσα στον browser, ενώ οι υπόλοιποι browsers δρομολογούνται μέσω reverse proxy.

Παραδείγματα policies που μπορείτε να φτιάξετε:

- *«Οι χρήστες σε μη διαχειριζόμενες συσκευές μπορούν να διαβάζουν έγγραφα του SharePoint στον browser αλλά όχι να τα κατεβάζουν»*
- *«Οι χρήστες εκτός εταιρικού δικτύου μπορούν να έχουν πρόσβαση στο Salesforce αλλά όχι να εκτυπώνουν ή να αντιγράφουν εγγραφές»*
- *«Οι χρήστες που έχουν επισημανθεί ως υψηλού κινδύνου μπορούν να αυθεντικοποιηθούν στο Microsoft 365, αλλά κάθε δραστηριότητα στο session καταγράφεται για ανασκόπηση»*

[![Δημιουργία session policy στο Conditional Access App Control](/images/Microsoft-Defender/mdca-04-session-policy.webp)](/images/Microsoft-Defender/mdca-04-session-policy.webp)
> 📷 **Εικόνα 4:** Ρύθμιση session policy στο Conditional Access App Control. Defender portal → Cloud apps → Policies → Policy management → Conditional Access → Create policy → Session policy.

Η ρύθμιση απαιτεί κάποιον σχεδιασμό. Χρειάζεστε τη σωστή Conditional Access policy στο Microsoft Entra ID που δρομολογεί την κίνηση μέσω του Microsoft Defender for Cloud Apps, και επιπλέον το session policy στο ίδιο το Defender for Cloud Apps. Ο [οδηγός της Microsoft για τα session policies](https://learn.microsoft.com/en-us/defender-cloud-apps/session-policy-aad) καλύπτει ολόκληρη τη ροή. Προσοχή: τα session controls ισχύουν μόνο για πρόσβαση μέσω browser. Για να μην παρακάμπτονται, μπλοκάρετε με access policy την πρόσβαση από native clients (για παράδειγμα, την εφαρμογή Teams για desktop) στους χρήστες που καλύπτονται.

**Μια περίπτωση χρήσης υψηλής αξίας** για να ξεκινήσετε: **μπλοκάρισμα λήψεων από μη διαχειριζόμενες συσκευές** για τα πιο ευαίσθητα sites του SharePoint. Είναι πραγματικά αποτελεσματικό στο να σταματά τη διαρροή δεδομένων (data exfiltration) και δεν επηρεάζει κανέναν που χρησιμοποιεί διαχειριζόμενη συσκευή.

## Δυνατότητα 4: Activity policies, και τι αλλάζει με τα file policies

Το τελευταίο επίπεδο είναι οι κανόνες ανίχνευσης που ενεργοποιούνται από τη συμπεριφορά χρηστών στις συνδεδεμένες cloud εφαρμογές σας.

Η Microsoft παρέχει ένα σύνολο προεπιλεγμένων **anomaly detection policies** που είναι **ήδη ενεργοποιημένα**: Impossible travel, Ransomware activity, Unusual file deletion activity, Suspicious inbox forwarding. Μην τα ξαναεφεύρετε. Απλώς ελέγξτε τα και βεβαιωθείτε ότι οι αποδέκτες των alerts είναι σωστοί.

Πάνω σε αυτά μπορείτε να φτιάξετε δικά σας **[activity policies](https://learn.microsoft.com/en-us/defender-cloud-apps/user-activity-policies)** για ό,τι έχει σημασία στο δικό σας περιβάλλον. Για παράδειγμα:

- Πολλαπλές αποτυχημένες συνδέσεις ενός χρήστη μέσα σε λίγα λεπτά
- Μαζική λήψη αρχείων από έναν χρήστη μέσα σε σύντομο χρονικό διάστημα
- Σύνδεση από χώρα όπου ο οργανισμός δεν δραστηριοποιείται
- Δραστηριότητα διαχειριστή από λογαριασμό που δεν αναμένεται να την κάνει

{{< kql-link id="mass-download" lead="Θέλετε να δείτε αν συμβαίνει ήδη;" label="Τρέξτε το KQL για τα μαζικά downloads" tail="από SharePoint και OneDrive στο Advanced Hunting." >}}

[![Διαχείριση policies στο Microsoft Defender for Cloud Apps](/images/Microsoft-Defender/mdca-05-policy-management.webp)](/images/Microsoft-Defender/mdca-05-policy-management.webp)
> 📷 **Εικόνα 5:** Σελίδα επισκόπησης policies. Defender portal → Cloud apps → Policies → Policy management.

**Σημαντική αλλαγή για τα file policies.** Τα **[file policies](https://learn.microsoft.com/en-us/defender-cloud-apps/data-protection-policies)** του Defender for Cloud Apps, δηλαδή οι κανόνες που εντοπίζουν ευαίσθητο περιεχόμενο ή επικίνδυνο διαμοιρασμό αρχείων, **αποσύρονται στις 6 Ιανουαρίου 2027**. Η Microsoft ζητά [μετάβαση σε Microsoft Purview DLP ή auto-labeling policies](https://learn.microsoft.com/en-us/defender-cloud-apps/migrate-file-policies-to-purview). Αν ξεκινάτε τώρα, μη φτιάξετε νέα file policies. Υλοποιήστε το ίδιο σενάριο απευθείας στο Microsoft Purview. Για παράδειγμα: *«κάθε αρχείο με ετικέτα Confidential που διαμοιράζεται εξωτερικά προκαλεί alert»*. Αν έχετε ήδη file policies, βάλτε τη μετάβασή τους στο πλάνο σας πριν από την προθεσμία.

## Ένα ρεαλιστικό πλάνο για τον πρώτο μήνα

- **Εβδομάδα 1**: Ενεργοποίηση της ενσωμάτωσης με το Microsoft Defender for Endpoint για το Cloud Discovery. Αφήστε το να συλλέξει δεδομένα. Μην κάνετε ακόμη τίποτα.
- **Εβδομάδα 2**: Ανασκόπηση του dashboard εντοπισμένων εφαρμογών. Έγκριση (sanction) των 20 κορυφαίων γνωστών καλών εφαρμογών και απόρριψη (unsanction) των σαφώς επικίνδυνων. Ανασκόπηση των OAuth εφαρμογών υψηλού κινδύνου και ανάκληση όσων δεν έχουν επιχειρηματική αιτιολόγηση.
- **Εβδομάδα 3**: Επαλήθευση των προεπιλεγμένων anomaly detection policies και των αποδεκτών τους. Ρύθμιση ενός custom activity policy. Για την προστασία ευαίσθητου περιεχομένου, μία Microsoft Purview DLP policy αντί για file policy.
- **Εβδομάδα 4**: Σχεδιασμός και πιλοτική εφαρμογή του Conditional Access App Control για μία περίπτωση χρήσης (π.χ. μπλοκάρισμα λήψεων από το SharePoint σε μη διαχειριζόμενες συσκευές για μια πιλοτική ομάδα).

Στο τέλος του πρώτου μήνα έχετε ένα λειτουργικό CASB, πραγματική ορατότητα στο SaaS περιβάλλον σας, και τους ελέγχους OAuth και session που πολλοί οργανισμοί δεν καταφέρνουν ποτέ να υλοποιήσουν.

## Πού να συνεχίσετε από εδώ

> 🔗 **Διαβάστε την υπόλοιπη σειρά Microsoft Defender Up Close:** **[Microsoft Defender for Endpoint](/posts/microsoft-defender-up-close-series/microsoft-defender-for-endpoint-deep-dive/)**, **[Microsoft Defender for Office 365](/posts/microsoft-defender-up-close-series/microsoft-defender-for-office-365-deep-dive/)** και **[Microsoft Defender for Identity](/posts/microsoft-defender-up-close-series/microsoft-defender-for-identity-deep-dive/)**.

> 🔗 **Θέλετε να δείτε πώς τα σήματα των cloud εφαρμογών τροφοδοτούν την τεκμηρίωση συμμόρφωσης;** Διαβάστε το **[Microsoft Secure Score ως εργαλείο GRC για ISO 27001 & NIS2](/posts/secure-score-grc-part-0-intro/)**.

> 🔗 **Χρειάζεστε τεκμηρίωση συμμόρφωσης;** Το Cloud Discovery, το App governance, τα session policies και οι activity policies του Microsoft Defender for Cloud Apps στηρίζουν τις απαιτήσεις [11.α](/kya-1689-2025/#11-α), [11.γ](/kya-1689-2025/#11-γ), [12.1.γ](/kya-1689-2025/#12-1-γ), [13.γ](/kya-1689-2025/#13-γ) και [24.ε](/kya-1689-2025/#24-ε), όπως τις αναλύει ο **[οδηγός της ΚΥΑ 1689/2025](/kya-1689-2025/)**. Στον οδηγό για την **[Οδηγία NIS2](/nis2/)** αντιστοιχούν στα [21.2.β](/nis2/#21-2-β), [21.2.δ](/nis2/#21-2-δ), [21.2.θ](/nis2/#21-2-θ) και [21.3](/nis2/#21-3), στο **[ISO/IEC 27001](/iso-27001/)** στα [A.5.9](/iso-27001/#A-5-9), [A.5.10](/iso-27001/#A-5-10), [A.5.18](/iso-27001/#A-5-18), [A.5.19](/iso-27001/#A-5-19), [A.5.23](/iso-27001/#A-5-23), [A.8.12](/iso-27001/#A-8-12) και [A.8.16](/iso-27001/#A-8-16), και στον **[GDPR](/gdpr/)** στα [28.1](/gdpr/#28-1) και [44](/gdpr/#44). Ο καθένας έχει checklist σε Excel.

Ακολουθήστε με στο [LinkedIn](https://www.linkedin.com/in/dimosthenisatteia/) για ειδοποιήσεις νέων άρθρων.

## Πηγές και επαλήθευση {#last-verified}

{{< verification >}}

---

<!--
IMAGE NOTES
Image 1: mdca-01-discovered-apps.webp  (Defender portal → Cloud apps → Cloud Discovery → Discovered apps.)
Image 2: mdca-02-cloud-apps-optional-feature.webp  (Defender portal → Settings → Endpoints → General → Advanced features.)
Image 3: mdca-03-oauth-apps.webp  (Defender portal → Cloud apps → App governance → Entra ID.)
Image 4: mdca-04-session-policy.webp  (Defender portal → Cloud apps → Policies → Policy management → Conditional Access → Create policy → Session policy.)
Image 5: mdca-05-policy-management.webp  (Defender portal → Cloud apps → Policies → Policy management.)
Save to content/images/Microsoft-Defender/
-->
