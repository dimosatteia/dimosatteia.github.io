---
title: "Microsoft Defender for Cloud Apps: Μια πρακτική περιήγηση στο CASB"
date: 2026-09-28T10:00:00+03:00
lastmod: 2026-09-28T18:45:00+03:00
draft: true
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
categories: ["Microsoft Defender", "SaaS Security"]
series: ["Microsoft Defender Up Close"]
slug: 
ShowToc: true
TocOpen: false
weight: -6
cover:
  image: "/images/MDE/MDCA.png"
  alt: "Microsoft Defender for Cloud Apps, αναλυτικός οδηγός"
  caption: "Microsoft Defender Up Close"
  relative: true
ShowReadingTime: true
ShowWordCount: true
---

## Γιατί υπάρχουν τα CASBs

Ένα CASB (Cloud Access Security Broker) υπάρχει επειδή ο τρόπος που δουλεύουν οι άνθρωποι άλλαξε πιο γρήγορα απ' ό,τι μπορούσαν να προσαρμοστούν τα παραδοσιακά εργαλεία ασφάλειας. Πριν από δεκαπέντε χρόνια, η στοίβα ασφάλειάς σας βρισκόταν ανάμεσα στους χρήστες και σε έναν μικρό αριθμό εφαρμογών που είχατε εγκρίνει. Σήμερα οι χρήστες σας αυθεντικοποιούνται καθημερινά σε δεκάδες cloud υπηρεσίες, πολλές από τις οποίες η ομάδα IT δεν ενέκρινε ποτέ ρητά.

Το **[Microsoft Defender for Cloud Apps](https://learn.microsoft.com/en-us/defender-cloud-apps/what-is-defender-for-cloud-apps)** είναι η απάντηση της Microsoft σε αυτό το πρόβλημα. Σας δίνει **ορατότητα** στο ποιες cloud εφαρμογές χρησιμοποιούν πραγματικά οι χρήστες σας, **έλεγχο (governance)** στις OAuth συναινέσεις και στη χρήση αυτών των εφαρμογών, και **προστασία από απειλές** απέναντι στην ανώμαλη συμπεριφορά χρηστών που υποδηλώνει παραβιασμένο λογαριασμό.

Αυτό το άρθρο είναι η πρακτική συνέχεια του **[2ου μέρους της σειράς Defender Demystified](/posts/Defender-Demystified-Series/defender-demystified-part-2-four-workloads/)**. Τέσσερις βασικές δυνατότητες, μία κάθε φορά.

## Δυνατότητα 1: Shadow IT discovery

Η δυνατότητα που ανοίγει περισσότερο τα μάτια όταν ενεργοποιείτε για πρώτη φορά το Microsoft Defender for Cloud Apps είναι το **Shadow IT discovery**. Το προϊόν λαμβάνει logs από το όριο του δικτύου σας (firewalls, web proxies) ή από το Microsoft Defender for Endpoint (που ήδη βλέπει τη web κίνηση των συσκευών σας), τα συσχετίζει με έναν κατάλογο **άνω των 31.000 cloud εφαρμογών** και παράγει ένα dashboard με το τι χρησιμοποιούν πραγματικά οι χρήστες σας.

[![Εντοπισμένες cloud εφαρμογές στο Cloud Discovery](/images/Microsoft-Defender/mdca-01-discovered-apps.webp)](/images/Microsoft-Defender/mdca-01-discovered-apps.webp)
📷 **Εικόνα 1**: Cloud app catalog / dashboard εντοπισμένων εφαρμογών. Defender portal → Cloud apps → Cloud Discovery → Discovered apps.

Από την εμπειρία μου, αυτό που θα βρείτε σχεδόν πάντα είναι:

- Αρκετές φορές περισσότερες εφαρμογές απ' όσες πίστευε η ομάδα IT
- Μια μακριά «ουρά» εφαρμογών χαμηλής χρήσης (εργαλεία marketing, μετατροπείς αρχείων, τυχαία SaaS στα οποία γράφτηκε ένας μόνο χρήστης)
- Μια χούφτα πραγματικά επικίνδυνων εφαρμογών που πρέπει να αντιμετωπίσετε (μη εγκεκριμένος διαμοιρασμός αρχείων, μη διαχειριζόμενος αποθηκευτικός χώρος, εργαλεία AI χωρίς συμμόρφωση)

Κάθε εφαρμογή στον κατάλογο έχει ένα **risk score** (0 έως 10) που υπολογίζεται από περισσότερους από 90 παράγοντες κινδύνου: κρυπτογράφηση δεδομένων σε ηρεμία (at rest), συμμόρφωση με τον GDPR, πιστοποίηση SOC 2, πολιτικές διατήρησης δεδομένων, υποστήριξη SSO, υποστήριξη SAML κ.ο.κ. Μπορείτε να προσαρμόσετε τα βάρη της βαθμολόγησης αν ο οργανισμός σας έχει συγκεκριμένες προτεραιότητες.

**Ο ευκολότερος τρόπος να ενεργοποιήσετε το discovery** είναι μέσω της ενσωμάτωσης με το Microsoft Defender for Endpoint. Δεν απαιτεί καμία αλλαγή στο δίκτυο, αλλά έχει προαπαιτούμενα: **Microsoft Defender for Endpoint Plan 2** (ή Microsoft Defender for Business) και συσκευές που έχουν γίνει onboarding. Την ενεργοποιείτε στο Defender portal, στο **Settings → Endpoints → Optional features**, με τον διακόπτη **Microsoft Defender for Cloud Apps**. Τα δεδομένα εμφανίζονται μέσα σε περίπου δύο ώρες.

[![Ο διακόπτης Microsoft Defender for Cloud Apps στο Defender portal](/images/Microsoft-Defender/mdca-02-cloud-apps-optional-feature.webp)](/images/Microsoft-Defender/mdca-02-cloud-apps-optional-feature.webp)
📷 **Εικόνα 2**: Διακόπτης ενσωμάτωσης Microsoft Defender for Cloud Apps. Defender portal → Settings → Endpoints → Optional features.

**Τι να κάνετε με τα αποτελέσματα του discovery:** δουλέψτε τις 20 πρώτες μη εγκεκριμένες εφαρμογές με βάση τη χρήση και αποφασίστε ποιες θα **εγκρίνετε (sanction)**, ποιες θα **απορρίψετε (unsanction)** και ποιες θα **διερευνήσετε περαιτέρω**. Για να μπλοκάρεται πραγματικά η πρόσβαση στις απορριφθείσες εφαρμογές μέσω του Defender for Endpoint, πρέπει το **network protection** να είναι ενεργοποιημένο σε **block mode**. Είναι συνεχής διαδικασία, όχι εφάπαξ «καθάρισμα».

## Δυνατότητα 2: OAuth app governance

Αυτή η δυνατότητα υποτιμάται. Όταν ένας χρήστης δίνει σε μια OAuth εφαρμογή άδεια πρόσβασης στα δεδομένα του Microsoft 365 (για παράδειγμα, μια εφαρμογή προγραμματισμού ραντεβού που θέλει να διαβάζει και να γράφει στο ημερολόγιό του), αυτή η άδεια παραμένει, αόρατα, μέχρι να ανακληθεί ρητά. Αν ο χρήστης εξαπατήθηκε μέσω phishing ώστε να δώσει συναίνεση σε μια κακόβουλη εφαρμογή, ο επιτιθέμενος έχει πλέον συνεχή πρόσβαση στο email ή στα αρχεία **χωρίς να έχει κλέψει ποτέ κωδικό**.

Το **[App governance στο Microsoft Defender for Cloud Apps](https://learn.microsoft.com/en-us/defender-cloud-apps/app-governance-manage-app-governance)** σας δίνει ορατότητα και έλεγχο στις OAuth εφαρμογές που είναι καταχωρημένες στο Microsoft Entra ID, στο Google και στο Salesforce.

[![Επισκόπηση OAuth apps στο app governance](/images/Microsoft-Defender/mdca-03-oauth-apps.webp)](/images/Microsoft-Defender/mdca-03-oauth-apps.webp)
📷 **Εικόνα 3**: Επισκόπηση OAuth apps. Defender portal → Cloud apps → OAuth apps.

Τι να αναζητήσετε:

- **Εφαρμογές που ζητούν δικαιώματα υψηλών προνομίων**: οτιδήποτε ζητά Mail.ReadWrite, Files.ReadWrite.All ή Directory.Read.All χωρίς προφανή επιχειρηματικό λόγο
- **Εφαρμογές από άγνωστους publishers**: οι νόμιμοι κατασκευαστές έχουν γενικά status verified publisher
- **Εφαρμογές με λίγους χρήστες στο tenant σας αλλά ευρέα δικαιώματα**: ένας μόνο χρήστης με μια εφαρμογή υψηλού κινδύνου είναι συνηθισμένο αποτέλεσμα phishing
- **Εφαρμογές που έχουν επισημανθεί από το threat intelligence της Microsoft**: το portal τις σημειώνει άμεσα

Τα alerts του app governance εμφανίζονται στη λίστα alerts του Microsoft Defender με **Detection source: App Governance**. Ελέγχετε τις επισημασμένες εφαρμογές εβδομαδιαία και ανακαλείτε ή περιορίζετε όσες δεν έχουν επιχειρηματική αιτιολόγηση.

## Δυνατότητα 3: Conditional Access App Control

Το **[Conditional Access App Control](https://learn.microsoft.com/en-us/defender-cloud-apps/proxy-intro-aad)** είναι η μηχανή πολιτικών σε επίπεδο session. Ενσωματώνεται με το Conditional Access του Microsoft Entra ID για να εφαρμόζει **ελέγχους σε πραγματικό χρόνο** σε sessions μέσω browser. Όχι απλώς «μπλοκάρισμα ή επιτρέπω» κατά τη σύνδεση, αλλά «επιτρέπω, με περιορισμούς στο τι μπορεί να κάνει ο χρήστης μόλις μπει». Οι χρήστες του Microsoft Edge προστατεύονται απευθείας μέσα στον browser, ενώ οι υπόλοιποι browsers δρομολογούνται μέσω reverse proxy.

Παραδείγματα policies που μπορείτε να φτιάξετε:

- *«Οι χρήστες σε μη διαχειριζόμενες συσκευές μπορούν να διαβάζουν έγγραφα του SharePoint στον browser αλλά όχι να τα κατεβάζουν»*
- *«Οι χρήστες εκτός εταιρικού δικτύου μπορούν να έχουν πρόσβαση στο Salesforce αλλά όχι να εκτυπώνουν ή να αντιγράφουν εγγραφές»*
- *«Οι χρήστες που έχουν επισημανθεί ως υψηλού κινδύνου μπορούν να αυθεντικοποιηθούν στο Microsoft 365, αλλά κάθε δραστηριότητα στο session καταγράφεται για ανασκόπηση»*

[![Δημιουργία session policy στο Conditional Access App Control](/images/Microsoft-Defender/mdca-04-session-policy.webp)](/images/Microsoft-Defender/mdca-04-session-policy.webp)
📷 **Εικόνα 4**: Ρύθμιση session policy στο Conditional Access App Control. Defender portal → Cloud apps → Policies → Policy management → Conditional Access → Create policy → Session policy.

Η ρύθμιση απαιτεί κάποιον σχεδιασμό. Χρειάζεστε τη σωστή Conditional Access policy στο Microsoft Entra ID που δρομολογεί την κίνηση μέσω του Microsoft Defender for Cloud Apps, και επιπλέον το session policy στο ίδιο το Defender for Cloud Apps. Ο [οδηγός της Microsoft για τα session policies](https://learn.microsoft.com/en-us/defender-cloud-apps/session-policy-aad) καλύπτει ολόκληρη τη ροή. Προσοχή: τα session controls ισχύουν μόνο για πρόσβαση μέσω browser. Για να μην παρακάμπτονται, μπλοκάρετε με access policy την πρόσβαση από native clients (για παράδειγμα, την εφαρμογή Teams για desktop) στους χρήστες που καλύπτονται.

**Μια περίπτωση χρήσης υψηλής αξίας** για να ξεκινήσετε: **μπλοκάρισμα λήψεων από μη διαχειριζόμενες συσκευές** για τα πιο ευαίσθητα sites του SharePoint. Είναι πραγματικά αποτελεσματικό στο να σταματά τη διαρροή δεδομένων (data exfiltration) και δεν επηρεάζει κανέναν που χρησιμοποιεί διαχειριζόμενη συσκευή.

## Δυνατότητα 4: Activity policies, και τι αλλάζει με τα file policies

Το τελευταίο επίπεδο είναι οι κανόνες ανίχνευσης που ενεργοποιούνται από τη συμπεριφορά χρηστών στις συνδεδεμένες cloud εφαρμογές σας.

Η Microsoft παρέχει ένα σύνολο προεπιλεγμένων **anomaly detection policies** που είναι **ήδη ενεργοποιημένα**: impossible travel, ransomware activity, mass delete, suspicious inbox forwarding. Μην τα ξαναεφεύρετε. Απλώς ελέγξτε τα και βεβαιωθείτε ότι οι αποδέκτες των alerts είναι σωστοί.

Πάνω σε αυτά μπορείτε να φτιάξετε δικά σας **[activity policies](https://learn.microsoft.com/en-us/defender-cloud-apps/user-activity-policies)** για ό,τι έχει σημασία στο δικό σας περιβάλλον. Για παράδειγμα:

- Πολλαπλές αποτυχημένες συνδέσεις ενός χρήστη μέσα σε λίγα λεπτά
- Μαζική λήψη αρχείων από έναν χρήστη μέσα σε σύντομο χρονικό διάστημα
- Σύνδεση από χώρα όπου ο οργανισμός δεν δραστηριοποιείται
- Δραστηριότητα διαχειριστή από λογαριασμό που δεν αναμένεται να την κάνει

[![Διαχείριση policies στο Microsoft Defender for Cloud Apps](/images/Microsoft-Defender/mdca-05-policy-management.webp)](/images/Microsoft-Defender/mdca-05-policy-management.webp)
📷 **Εικόνα 5**: Σελίδα επισκόπησης policies. Defender portal → Cloud apps → Policies → Policy management.

**Σημαντική αλλαγή για τα file policies.** Τα **[file policies](https://learn.microsoft.com/en-us/defender-cloud-apps/data-protection-policies)** του Defender for Cloud Apps, δηλαδή οι κανόνες που εντοπίζουν ευαίσθητο περιεχόμενο ή επικίνδυνο διαμοιρασμό αρχείων, **αποσύρονται στις 6 Ιανουαρίου 2027**. Η Microsoft ζητά [μετάβαση σε Microsoft Purview DLP ή auto-labeling policies](https://learn.microsoft.com/en-us/defender-cloud-apps/migrate-file-policies-to-purview). Αν ξεκινάτε τώρα, μην φτιάξετε νέα file policies. Υλοποιήστε το ίδιο σενάριο απευθείας στο Microsoft Purview. Για παράδειγμα: *«κάθε αρχείο με ετικέτα Confidential που διαμοιράζεται εξωτερικά προκαλεί alert»*. Αν έχετε ήδη file policies, βάλτε τη μετάβασή τους στο πλάνο σας πριν από την προθεσμία.

## Ένα ρεαλιστικό πλάνο για τον πρώτο μήνα

- **Εβδομάδα 1**: Ενεργοποίηση της ενσωμάτωσης με το Microsoft Defender for Endpoint για το Cloud Discovery. Αφήστε το να συλλέξει δεδομένα. Μην κάνετε ακόμη τίποτα.
- **Εβδομάδα 2**: Ανασκόπηση του dashboard εντοπισμένων εφαρμογών. Έγκριση (sanction) των 20 κορυφαίων γνωστών καλών εφαρμογών και απόρριψη (unsanction) των σαφώς επικίνδυνων. Ανασκόπηση των OAuth εφαρμογών υψηλού κινδύνου και ανάκληση όσων δεν έχουν επιχειρηματική αιτιολόγηση.
- **Εβδομάδα 3**: Επαλήθευση των προεπιλεγμένων anomaly detection policies και των αποδεκτών τους. Ρύθμιση ενός custom activity policy. Για την προστασία ευαίσθητου περιεχομένου, μία Microsoft Purview DLP policy αντί για file policy.
- **Εβδομάδα 4**: Σχεδιασμός και πιλοτική εφαρμογή του Conditional Access App Control για μία περίπτωση χρήσης (π.χ. μπλοκάρισμα λήψεων από το SharePoint σε μη διαχειριζόμενες συσκευές για μια πιλοτική ομάδα).

Στο τέλος του πρώτου μήνα έχετε ένα λειτουργικό CASB, πραγματική ορατότητα στο SaaS περιβάλλον σας, και τους ελέγχους OAuth και session που πολλοί οργανισμοί δεν καταφέρνουν ποτέ να υλοποιήσουν.

## Πού να συνεχίσετε από εδώ

> 🔗 **Διαβάστε την υπόλοιπη σειρά Microsoft Defender Up Close:** **[Microsoft Defender for Endpoint](/posts/microsoft-defender-for-endpoint-deep-dive/)**, **[Microsoft Defender for Office 365](/posts/microsoft-defender-for-office-365-deep-dive/)**, **[Microsoft Defender for Identity](/posts/microsoft-defender-for-identity-deep-dive/)**.

> 🔗 **Θέλετε να δείτε πώς τα σήματα των cloud εφαρμογών τροφοδοτούν την τεκμηρίωση συμμόρφωσης;** Διαβάστε το **[How We Built a Gold-Winning GRC Programme on Microsoft Secure Score](/posts/secure-score-grc-part-0-intro/)**.

Ακολουθήστε με στο [LinkedIn](https://www.linkedin.com/in/dimosthenisatteia/) για ειδοποιήσεις νέων άρθρων.

## Πηγές Microsoft Learn

- [Microsoft Defender for Cloud Apps, επισκόπηση](https://learn.microsoft.com/en-us/defender-cloud-apps/what-is-defender-for-cloud-apps)
- [Cloud Discovery](https://learn.microsoft.com/en-us/defender-cloud-apps/set-up-cloud-discovery)
- [Ενσωμάτωση Microsoft Defender for Cloud Apps και Microsoft Defender for Endpoint](https://learn.microsoft.com/en-us/defender-cloud-apps/mde-integration)
- [App governance](https://learn.microsoft.com/en-us/defender-cloud-apps/app-governance-manage-app-governance)
- [Conditional Access App Control](https://learn.microsoft.com/en-us/defender-cloud-apps/proxy-intro-aad)
- [Session policies](https://learn.microsoft.com/en-us/defender-cloud-apps/session-policy-aad)
- [Activity policies](https://learn.microsoft.com/en-us/defender-cloud-apps/user-activity-policies)
- [File policies και απόσυρση](https://learn.microsoft.com/en-us/defender-cloud-apps/data-protection-policies)
- [Μετάβαση των file policies στο Microsoft Purview](https://learn.microsoft.com/en-us/defender-cloud-apps/migrate-file-policies-to-purview)

---

<!--
IMAGE NOTES
Image 1: mdca-01-discovered-apps.webp  (Defender portal → Cloud apps → Cloud Discovery → Discovered apps.)
Image 2: mdca-02-cloud-apps-optional-feature.webp  (Defender portal → Settings → Endpoints → Optional features.)
Image 3: mdca-03-oauth-apps.webp  (Defender portal → Cloud apps → OAuth apps.)
Image 4: mdca-04-session-policy.webp  (Defender portal → Cloud apps → Policies → Policy management → Conditional Access → Create policy → Session policy.)
Image 5: mdca-05-policy-management.webp  (Defender portal → Cloud apps → Policies → Policy management.)
Save to /static/images/Microsoft-Defender/
-->
