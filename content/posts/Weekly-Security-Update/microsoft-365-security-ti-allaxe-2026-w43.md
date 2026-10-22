---
title: "Microsoft 365 Security: τι άλλαξε (εβδομάδα 43/2026)"
date: 2026-10-22T19:30:00+03:00
lastmod: 2026-10-22T19:30:00+03:00
draft: false
keywords:
  - Microsoft Defender νέα
  - Teams user reporting Defender for Office 365
  - Defender for Cloud Defender portal DWU
  - Defender for Servers billing
  - App Governance roles
  - Defender for Identity sensor v3.x
  - Simple Flows Microsoft Sentinel
tags:
  - Microsoft Defender XDR
  - Microsoft Defender for Office 365
  - Microsoft Defender for Cloud
  - Microsoft Defender for Cloud Apps
  - Microsoft Defender for Identity
  - Microsoft Sentinel
  - Εβδομαδιαία σύνοψη
author: "Dimosthenis Atteia"
description: "Εβδομάδα 43/2026: Teams user reporting ενεργό από 25/10, Defender for Cloud στο Defender portal με DWU, αλλαγές ρόλων στο App Governance, νέα alerts στο MDI."
summary: "Το Defender for Office 365 ενεργοποιεί στις 25 Οκτωβρίου το Teams user reporting σε όσους δεν το έχουν ρυθμίσει, και το Defender for Cloud φέρνει τη διαχείριση των plans στο Defender portal με χρέωση σε Defender Workload Units."
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
  - feature: "Defender for Office 365: Teams user reporting ενεργό από προεπιλογή (25 Οκτωβρίου 2026)"
    status: "Generally Available"
    license: "Defender for Office 365 Plan 1 ή Plan 2, Microsoft 365 E5, Office 365 E5"
    source: "https://learn.microsoft.com/en-us/defender-office-365/submissions-teams"
    verified: 2026-10-22
  - feature: "Defender for Cloud: διαχείριση plans στο Defender portal και χρέωση σε DWU"
    status: "Public Preview"
    license: "Defender for Cloud plans (χρέωση Azure)"
    source: "https://learn.microsoft.com/en-us/azure/defender-for-cloud/defender-portal/plan-management-changes-defender-portal"
    verified: 2026-10-22
  - feature: "Defender for Cloud Apps: αλλαγές δικαιωμάτων στο App Governance για ρόλους του Entra"
    status: "Generally Available"
    license: "Defender for Cloud Apps"
    source: "https://learn.microsoft.com/en-us/defender-cloud-apps/app-governance-get-started#required-roles"
    verified: 2026-10-22
  - feature: "Defender for Identity: sensor v3.x χωρίς Defender for Endpoint και νέα alerts"
    status: "Generally Available"
    license: "Defender for Identity"
    source: "https://learn.microsoft.com/en-us/defender-for-identity/deploy/activate-sensor"
    verified: 2026-10-22
  - feature: "Unified SecOps: Simple Flows στα automation rules και detection source στα alert tuning rules"
    status: "Public Preview"
    license: "Defender XDR ή Microsoft Sentinel στο Defender portal"
    source: "https://learn.microsoft.com/en-us/azure/sentinel/automation/create-basic-automation-rules-simple-flows"
    verified: 2026-10-22
---

## Με μια ματιά

Η πιο κοντινή προθεσμία της εβδομάδας είναι στο **Microsoft Defender for Office 365**: στις 25 Οκτωβρίου 2026 το Teams user reporting ενεργοποιείται από προεπιλογή σε όσους δεν έχουν ρυθμίσει τις σχετικές επιλογές, και τα reported items πηγαίνουν και στη Microsoft. Η μεγαλύτερη αλλαγή είναι στο **Microsoft Defender for Cloud**: η διαχείριση των plans έρχεται στο Defender portal σε preview, με νέο μοντέλο χρέωσης σε Defender Workload Units, ενώ από την 1η Νοεμβρίου αλλάζει ο τρόπος που χρεώνεται το Defender for Servers.

## Οι αλλαγές της εβδομάδας

### 1. Defender for Office 365: το Teams user reporting ενεργοποιείται από προεπιλογή στις 25 Οκτωβρίου

**Φάση:** GA, με διάθεση στα τέλη Οκτωβρίου 2026, σύμφωνα με την ανακοίνωση · **Άδεια:** Defender for Office 365 Plan 1 ή Plan 2, Microsoft 365 E5 ή Office 365 E5

**Τι αλλάζει.** Σύμφωνα με την ανακοίνωση, από τις 25 Οκτωβρίου 2026 το Teams user reporting ενεργοποιείται από προεπιλογή στους οργανισμούς που δεν έχουν ρυθμίσει τα Teams user reported settings. Οι χρήστες θα μπορούν να αναφέρουν ύποπτα μηνύματα, κλήσεις και συσκέψεις του Teams, και οι αναφορές πηγαίνουν στον προορισμό που ορίζει η ρύθμιση. Όσοι έχουν ήδη ρυθμίσει τις επιλογές τις κρατούν. Οι ρυθμίσεις έχουν πλέον δική τους σελίδα στο Defender portal από τις 7 Οκτωβρίου.

Το Microsoft Learn εξηγεί τι σημαίνει αυτό στην πράξη. Η προεπιλογή για τον προορισμό είναι **Microsoft and my reporting mailbox**. Όταν ένα item πηγαίνει στη Microsoft, αντιγράφονται το περιεχόμενο, τα συνημμένα και τα metadata, και μπορεί να σταλούν έως 15 μηνύματα πριν και μετά το αναφερόμενο. Η Microsoft αναφέρει ότι το προσωπικό της μπορεί να διαβάσει το περιεχόμενο που υποβάλλεται, και ότι αυτό αποθηκεύεται σε datacenters στις ΗΠΑ. Κάθε αναφορά δημιουργεί και alert από τα default alert policies.

**Τι να κάνεις.** Πριν από τις 25 Οκτωβρίου άνοιξε το Defender portal → Settings → Email & collaboration → **Teams user reported settings** και αποφάσισε τον προορισμό: Microsoft only, My reporting mailbox only, ή και τα δύο. Αν ο DPO έχει αντίρρηση για αποστολή περιεχομένου chat εκτός ΕΕ, διάλεξε My reporting mailbox only και υπέβαλε στη Microsoft μόνο ό,τι κρίνεις εσύ. Ενημέρωσε το SOC και το help desk ότι θα έρθουν αναφορές από το Teams, και τους χρήστες για το πώς κάνουν report. Το Teams admin center ελέγχει αν οι χρήστες βλέπουν καν την επιλογή. Η αναφορά κλήσεων ήταν στο [τεύχος 40](/posts/weekly-security-update/microsoft-365-security-ti-allaxe-2026-w40/).

**Πηγή:** [User reported settings in Microsoft Teams](https://learn.microsoft.com/en-us/defender-office-365/submissions-teams) · Message Center [MC1478463](https://mc.merill.net/message/MC1478463) (αρχείο mc.merill.net, δημοσιεύθηκε στις 24 Σεπτεμβρίου 2026, ενημερώθηκε στις 25 Σεπτεμβρίου 2026)

### 2. Defender for Cloud: διαχείριση plans στο Defender portal, χρέωση σε DWU και αλλαγή στο Defender for Servers

**Φάση:** Public Preview από τις 20 Οκτωβρίου 2026 για Azure commercial · **Άδεια:** Defender for Cloud plans, με χρέωση στο Azure

**Τι αλλάζει.** Από τις 20 Οκτωβρίου μπορείς να συνδέσεις Azure subscriptions και management groups στο Defender portal και να ενεργοποιείς τα cloud security plans από εκεί, σε όλο το tenant ή ανά scope. Όταν ένα subscription μεταφερθεί, τα plans ρυθμίζονται μόνο στο Defender portal και γίνονται view-only στο Azure portal, οι ρυθμίσεις ανά resource δεν διατηρούνται, και η χρέωση γίνεται σε **Defender Workload Units (DWU)**. Η μεταφορά γίνεται ανά subscription και δεν είναι υποχρεωτική στην αρχή της μετάβασης. Με το νέο μοντέλο αλλάζουν και κάποια plans: για παράδειγμα, το Defender for Containers μετρά ανά node αντί για vCPU, και το Defender for DNS δεν προσφέρεται πια αυτόνομα αλλά περιλαμβάνεται στο Defender for Servers Plan 2. Υπάρχει δοκιμή 30 ημερών για τα επιλέξιμα plans, μόνο αν τη ζητήσεις όταν τα ενεργοποιείς.

Ξεχωριστά, από την **1η Νοεμβρίου 2026** τα desktops, όπως Windows 10 και 11, δεν χρεώνονται πια ως servers στο Defender for Servers Plan 1. Ταυτόχρονα αλλάζει, και για τα δύο plans, ο τρόπος που αναγνωρίζονται οι billable servers, κάτι που μπορεί να αλλάξει τον αριθμό servers στον λογαριασμό σου. Συσκευές που δεν αναγνωρίζονται καθαρά ως desktop θα χρεώνονται ως servers.

**Τι να κάνεις.** Μην μεταφέρεις παραγωγικά subscriptions σε preview χωρίς σχέδιο. Πρώτα κατέγραψε ποια resources έχουν ρυθμίσεις plan ανά resource, γιατί θα χαθούν. Βάλε τα σημερινά σου resources στο Cloud Security Cost Estimator και σύγκρινε το κόστος σε DWU με το σημερινό. Για το Defender for Servers, κράτησε τον λογαριασμό του Οκτωβρίου και σύγκρινέ τον με του Νοεμβρίου. Αν έχεις virtual desktops ή VDI με Windows multi-session, έλεγξε πώς ταξινομούνται.

**Πηγή:** [What changes when managing cloud security plans in the Defender portal](https://learn.microsoft.com/en-us/azure/defender-for-cloud/defender-portal/plan-management-changes-defender-portal) · [Estimate and track Cloud security cost](https://learn.microsoft.com/en-us/azure/defender-for-cloud/defender-portal/estimate-track-costs) · [What's new in Defender for Cloud](https://learn.microsoft.com/en-us/azure/defender-for-cloud/release-notes)

### 3. Defender for Cloud Apps: αλλάζουν τα δικαιώματα ρόλων του Entra στο App Governance

**Φάση:** GA από τα μέσα έως τα τέλη Νοεμβρίου 2026, σύμφωνα με την ανακοίνωση όπως ενημερώθηκε στις 20 Οκτωβρίου 2026 · **Άδεια:** Microsoft Defender for Cloud Apps, που δεν περιλαμβάνεται στο Microsoft 365 E3

**Τι αλλάζει.** Το App Governance περνά στο Unified RBAC του Defender XDR, και αλλάζει τι μπορούν να κάνουν συγκεκριμένοι ρόλοι του Entra:

- Ο **Cloud App Security Administrator** αποκτά δικαίωμα να βλέπει και να διαχειρίζεται τα App Governance policies.
- Ο **Compliance Administrator** χάνει τη διαχείριση των App Governance policies και την ενεργοποίηση ή απενεργοποίηση του App Governance από τα Settings.
- Ο **Compliance Data Administrator** χάνει την ενεργοποίηση ή απενεργοποίηση του App Governance από τα Settings.
- Τα custom Unified RBAC roles για το Defender for Cloud Apps αποκτούν πρόσβαση στο App Governance.

Η ανακοίνωση δημοσιεύθηκε στις 25 Σεπτεμβρίου. Στις 20 Οκτωβρίου η GA μετατέθηκε από μέσα και τέλη Οκτωβρίου στα μέσα και τέλη Νοεμβρίου.

**Τι να κάνεις.** Δες ποιοι διαχειρίζονται σήμερα το App Governance μέσω Compliance Administrator ή Compliance Data Administrator. Αν πρέπει να συνεχίσουν, δώσε τους άλλον υποστηριζόμενο ρόλο ή custom Unified RBAC role, με least privilege. Έλεγξε επίσης ποιοι έχουν Cloud App Security Administrator, αφού ο ρόλος αποκτά περισσότερα δικαιώματα. Για το προϊόν, δες την [πρακτική περιήγηση στο Defender for Cloud Apps](/posts/microsoft-defender-up-close-series/microsoft-defender-for-cloud-apps-deep-dive/).

**Πηγή:** [Turn on app governance: Required roles](https://learn.microsoft.com/en-us/defender-cloud-apps/app-governance-get-started#required-roles) · [App governance FAQ](https://learn.microsoft.com/en-us/defender-cloud-apps/app-governance-faq) · Message Center [MC1479503](https://mc.merill.net/message/MC1479503) (αρχείο mc.merill.net, δημοσιεύθηκε στις 25 Σεπτεμβρίου 2026, ενημερώθηκε στις 20 Οκτωβρίου 2026)

### 4. Defender for Identity: sensor v3.x χωρίς Defender for Endpoint σε GA, και νέα alerts για καταχώριση MFA

**Φάση:** GA για την ενεργοποίηση του sensor v3.x χωρίς Defender for Endpoint, Οκτώβριος 2026 · **Άδεια:** Microsoft Defender for Identity (EMS E5, Microsoft 365 E5, Microsoft 365 E5 Security ή F5), που δεν περιλαμβάνεται στο Microsoft 365 E3

**Τι αλλάζει.** Μπορείς πλέον, σε GA, να ενεργοποιήσεις τον sensor v3.x σε domain controllers, AD FS, AD CS και Entra Connect servers με Windows Server 2019 ή νεότερο χωρίς να τους κάνεις onboarding στο Defender for Endpoint. Κατεβάζεις ένα onboarding package από την καρτέλα **Sensor management** της σελίδας On-premises στο Defender portal, που ενεργοποιεί τον sensor σε «restricted identity-only mode». Ο server χρειάζεται ακόμη σύνδεση με τις cloud υπηρεσίες του Defender for Endpoint, και το Windows Server cumulative update του Σεπτεμβρίου 2026 ή νεότερο. Η μέθοδος ισχύει μόνο για νέες εγκαταστάσεις: servers με sensor v2.x δεν μεταφέρονται έτσι.

Η σελίδα «What's new» προσθέτει, σε σχέση με το [προηγούμενο τεύχος](/posts/weekly-security-update/microsoft-365-security-ti-allaxe-2026-w42/), έξι alerts για το Entra ID που εντοπίζουν ύποπτη καταχώριση μεθόδων MFA: Authenticator, email, τηλέφωνο, «device with strong MFA» και συσκευή MFA που ελέγχει ο επιτιθέμενος, καθώς και αλλαγή του organization branding από νέο χρήστη. Για το Active Directory προστίθεται το alert «Potential Certighost (CVE-2026-54121) AD CS abuse».

**Τι να κάνεις.** Αν δεν έχεις βάλει τον Defender for Identity σε κάποιους domain controllers επειδή δεν ήθελες πλήρες Defender for Endpoint εκεί, τώρα δεν υπάρχει αυτό το εμπόδιο. Δες στο Secure Score τη σύσταση για unmonitored domain controllers και κάλυψέ τους. Ενημέρωσε το SOC για τα νέα alerts καταχώρισης MFA, γιατί αυτό είναι το βήμα που ακολουθεί συχνά μια παραβίαση λογαριασμού. Για το προϊόν, δες το [deep dive στο Defender for Identity](/posts/microsoft-defender-up-close-series/microsoft-defender-for-identity-deep-dive/).

**Πηγή:** [Activate the Microsoft Defender for Identity sensor v3.x](https://learn.microsoft.com/en-us/defender-for-identity/deploy/activate-sensor) · [Deploy the sensor v3.x: licensing requirements](https://learn.microsoft.com/en-us/defender-for-identity/deploy/deploy-sensor-v3) · [What's new in Microsoft Defender for Identity](https://learn.microsoft.com/en-us/defender-for-identity/whats-new)

### 5. Unified SecOps: Simple Flows στα automation rules και detection source στα alert tuning rules

**Φάση:** Public Preview και για τα δύο, με GA του detection source από τα μέσα Νοεμβρίου 2026, σύμφωνα με την ανακοίνωση · **Άδεια:** Defender XDR, ή Microsoft Sentinel με workspace στο unified SecOps platform

**Τι αλλάζει.** Τα **Simple Flows** είναι έτοιμες ενέργειες για automation rules στο Defender portal, χωρίς playbook και χωρίς Logic App. Προσθέτουν τους triggers **Case created** και **Case updated**, και ενέργειες για email ειδοποίησης, ενημέρωση πεδίων του case, προσθήκη έως 10 tasks ανά κανόνα, και ενημέρωση alerts (status, classification, determination, assigned to). Τα emails έχουν σταθερό template, αποστολέα «Microsoft Security», χωρίς CC και BCC, και δεν γράφονται στο audit log του case.

Η δεύτερη αλλαγή αφορά τα **alert tuning rules** του Defender XDR. Σύμφωνα με την ανακοίνωση, μπορείς πλέον να περιορίσεις έναν κανόνα σε συγκεκριμένες detection sources. Η επιλογή εμφανίζεται από τα μέσα Οκτωβρίου και εφαρμόζεται από τις αρχές Νοεμβρίου. Κανόνες που δεν αλλάζεις συνεχίζουν να ισχύουν για όλες τις detection sources, και για τα custom detections.

**Τι να κάνεις.** Για μικρό SOC, τα Simple Flows είναι ο γρήγορος τρόπος για δύο πράγματα: email στον υπεύθυνο βάρδιας όταν δημιουργείται case υψηλής σοβαρότητας, και ένα σταθερό checklist tasks όταν το case περνά σε Investigating. Επειδή τα emails δεν καταγράφονται στο case, μην τα χρησιμοποιείς ως τεκμήριο ειδοποίησης. Για τα alert tuning rules, ξαναδές όσους κανόνες έχεις και αποφάσισε αν πρέπει να καλύπτουν και τα custom detections σου. Ένας πολύ πλατύς κανόνας μπορεί να κρύβει alerts που θέλεις να δεις.

**Πηγή:** [Create basic automation rules with Simple Flows in the Microsoft Defender portal](https://learn.microsoft.com/en-us/azure/sentinel/automation/create-basic-automation-rules-simple-flows) · Message Center [MC1481318](https://mc.merill.net/message/MC1481318) (αρχείο mc.merill.net, δημοσιεύθηκε στις 28 Σεπτεμβρίου 2026)

## Νέοι πόροι

- **[Insights from the 2026 Microsoft Digital Defense Report](https://www.microsoft.com/en-us/security/blog/2026/10/01/insights-from-the-2026-microsoft-digital-defense-report/)** (Microsoft Security Blog, 1 Οκτωβρίου 2026). Σύνοψη της ετήσιας έκθεσης: χρήση AI από επιτιθέμενους, ασφάλεια των agents, AI στην ανακάλυψη ευπαθειών. Η πλήρης έκθεση είναι στο [aka.ms/Microsoft-Digital-Defense-Report-2026](https://aka.ms/Microsoft-Digital-Defense-Report-2026). Καλό υλικό για την ετήσια ενημέρωση της διοίκησης.
- **[Defender for Cloud in the Defender portal: FAQ](https://learn.microsoft.com/en-us/azure/defender-for-cloud/defender-portal/integration-faq)** (Microsoft Learn). Απαντά στα πρακτικά ερωτήματα για τη μεταφορά στο Defender portal και τα DWU (αλλαγή 2).
- **[Manage all your Microsoft Sentinel data in one place with Unified Data Management](https://techcommunity.microsoft.com/blog/MicrosoftSentinelBlog/manage-all-your-microsoft-sentinel-data-in-one-place-with-unified-data-managemen/4565940)** (Microsoft Sentinel Blog, Public Preview). Ανακοίνωση για ενιαία διαχείριση connectors, όγκου ingestion και κόστους στο Sentinel. Δεν μπόρεσα να διαβάσω ολόκληρο το κείμενο, οπότε δεν γράφω λεπτομέρειες.
- **[Defender Monthly News, October 2026](https://jeffreyappel.nl/defender-monthly-news-october-2026/)** (Jeffrey Appel, community edition, 22 Οκτωβρίου 2026). Μηνιαία σύνοψη για όλη την οικογένεια Defender, μετά τη διακοπή της μηνιαίας έκδοσης της Microsoft.

## Προσοχή αυτή την εβδομάδα

**25 Οκτωβρίου 2026, Defender for Office 365.** Το Teams user reporting ενεργοποιείται από προεπιλογή όπου δεν έχει ρυθμιστεί (αλλαγή 1).

**1 Νοεμβρίου 2026, Defender for Cloud.** Αλλάζει η χρέωση του Defender for Servers: τα desktops δεν χρεώνονται πια ως servers στο Plan 1, και αλλάζει η αναγνώριση των billable servers (αλλαγή 2).

**Αρχές Νοεμβρίου 2026, Defender XDR.** Εφαρμόζονται οι επιλογές detection source στα alert tuning rules της preview (αλλαγή 5).

**Μέσα έως τέλη Νοεμβρίου 2026, Defender for Cloud Apps.** Αλλάζουν τα δικαιώματα ρόλων στο App Governance (αλλαγή 3).

**6 Ιανουαρίου 2027, Defender for Cloud Apps.** Υπενθύμιση: τα file policies αποσύρονται και πρέπει να ξαναφτιαχτούν ως Purview DLP ή auto-labeling policies ([Migrate file policies to Microsoft Purview](https://learn.microsoft.com/en-us/defender-cloud-apps/migrate-file-policies-to-purview)).

**31 Μαρτίου 2027, Microsoft Sentinel.** Υπενθύμιση: μετά από αυτή την ημερομηνία το Sentinel δεν υποστηρίζεται στο Azure portal, μόνο στο Defender portal.

Οι ημερομηνίες των ανακοινώσεων μπορεί να διαφέρουν ανά tenant, οπότε δες τις στο δικό σου Message Center.

## Σύνδεση με την ΚΥΑ 1689/2025

- **[24.α](/kya-1689-2025/#24-α) και [21.α](/kya-1689-2025/#21-α), διαχείριση περιστατικών και ευαισθητοποίηση:** το Teams user reporting δίνει στους χρήστες ένα κανάλι αναφοράς ύποπτης δραστηριότητας που καταλήγει στο SOC. Η απόφαση για τον προορισμό των αναφορών ανήκει στην πολιτική διαχείρισης περιστατικών.
- **[20.α](/kya-1689-2025/#20-α) και [14.α](/kya-1689-2025/#14-α), προστασία από κακόβουλο λογισμικό και επιβολή ρυθμίσεων:** η ενεργοποίηση των Defender for Cloud plans ανά management group ή tenant εξασφαλίζει ότι κάθε νέο resource προστατεύεται αυτόματα.
- **[13.γ](/kya-1689-2025/#13-γ) και [13.δ](/kya-1689-2025/#13-δ), least privilege και περιορισμός δικαιωμάτων διαχείρισης:** η αλλαγή στους ρόλους του App Governance είναι ευκαιρία να ελέγξεις ποιος διαχειρίζεται πραγματικά τις πολιτικές για OAuth apps.
- **[24.γ](/kya-1689-2025/#24-γ) και [24.ε](/kya-1689-2025/#24-ε), καταγραφή και τακτικός έλεγχος:** η κάλυψη όλων των domain controllers με Defender for Identity και τα νέα alerts για καταχώριση MFA ενισχύουν τον αυτοματοποιημένο έλεγχο για ύποπτη δραστηριότητα.
- **[24.ε](/kya-1689-2025/#24-ε), όρια και συνθήκες ειδοποίησης:** τα alert tuning rules με detection source και οι ειδοποιήσεις των Simple Flows είναι ακριβώς οι «κατάλληλες συνθήκες ειδοποίησης» που ζητά η απαίτηση. Τεκμηρίωσε κάθε κανόνα που κρύβει alerts.

Όλες οι απαιτήσεις της ΚΥΑ 1689/2025 με την αντιστοίχισή τους βρίσκονται στον [οδηγό της ΚΥΑ 1689/2025](/kya-1689-2025/).

## Πηγές και επαλήθευση {#last-verified}

{{< verification >}}

Από αυτό το τεύχος η σειρά καλύπτει μόνο την οικογένεια Microsoft Defender και το Microsoft Sentinel: Defender XDR, Defender for Endpoint, Defender for Identity, Defender for Office 365, Defender for Cloud Apps, Defender for Cloud, Sentinel και unified SecOps, μαζί με νέους πόρους.

Για αυτό το τεύχος ελέγχθηκαν το αρχείο mc.merill.net (αναρτήσεις Message Center που δημοσιεύθηκαν ή ενημερώθηκαν από τις 16 έως τις 22 Οκτωβρίου 2026, και ανακοινώσεις Defender του Σεπτεμβρίου με ημερομηνίες μέσα στον Οκτώβριο), οι σελίδες «What's new» των Defender XDR, Defender for Endpoint, Defender for Office 365, Defender for Identity, Defender for Cloud Apps, Defender for Cloud και Microsoft Sentinel, και το [Defender Monthly News του Οκτωβρίου](https://jeffreyappel.nl/defender-monthly-news-october-2026/) ως λίστα ελέγχου. Η μόνη ανακοίνωση Defender στο αρχείο μέσα στην εβδομάδα ήταν η ενημέρωση της MC1479503. Η σελίδα του Defender XDR δεν είχε καταχωρίσεις Οκτωβρίου. Η σελίδα του Defender for Endpoint έχει για τον Οκτώβριο το vulnerability assessment για εφαρμογές του Microsoft Store (GA, μέρος του Defender Vulnerability Management), και η σελίδα του Defender for Office 365 το νέο πεδίο ApproverUpn στον πίνακα EmailPostDeliveryEvents και την αναφορά συσκέψεων στο Teams. Κανένα από αυτά δεν μπήκε στις πέντε αλλαγές. Η σελίδα του Sentinel έχει για τον Οκτώβριο μόνο ένα analytics rule για εφαρμογές SAP BTP σε preview.

Οι ανακοινώσεις MC1478463, MC1479503 και MC1481318 διαβάστηκαν από το έγκυρο, δημόσιο και ανεξάρτητο αρχείο του Microsoft 365 Message Center, mc.merill.net, που το συντηρεί η κοινότητα και όχι η Microsoft. Δεν διαβάστηκαν σε Message Center κάποιου tenant. Το πόσο επιβεβαιώνονται από τη Microsoft διαφέρει ανά θέμα:

- **Defender for Office 365 (MC1478463):** η ημερομηνία της 25ης Οκτωβρίου και οι άδειες προέρχονται από την ανακοίνωση. Το Microsoft Learn περιγράφει τις ρυθμίσεις, τους προορισμούς και τι αποστέλλεται στη Microsoft, αλλά γράφει ακόμη ότι η ρύθμιση στο Defender portal είναι ενεργή μόνο για νέα tenants.
- **Defender for Cloud:** προέρχεται μόνο από τις σελίδες του Microsoft Learn. Δεν βρέθηκε ανακοίνωση Message Center.
- **Defender for Cloud Apps (MC1479503):** η αλλαγή στους ρόλους και οι ημερομηνίες προέρχονται μόνο από την ανακοίνωση. Ο πίνακας ρόλων στο Microsoft Learn δείχνει ακόμη τα σημερινά δικαιώματα.
- **Defender for Identity:** προέρχεται μόνο από τις σελίδες του Microsoft Learn.
- **Unified SecOps:** τα Simple Flows προέρχονται από το Microsoft Learn, που δεν δίνει ημερομηνία κυκλοφορίας. Το detection source στα alert tuning rules προέρχεται μόνο από την ανακοίνωση MC1481318.

Οι ανακοινώσεις και οι ημερομηνίες τους διαφέρουν ανά tenant. Πριν ενεργήσεις, δες την αντίστοιχη ανακοίνωση στο δικό σου Message Center.

Τελευταίος έλεγχος αδειών και στοιχείων: 22 Οκτωβρίου 2026.
