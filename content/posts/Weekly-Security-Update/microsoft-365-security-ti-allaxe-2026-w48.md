---
title: "Microsoft 365 Security: τι άλλαξε (εβδομάδα 48/2026)"
slug: "microsoft-365-security-ti-allaxe-2026-w48"
date: 2026-11-27T08:00:00+02:00
lastmod: 2026-11-27T08:00:00+02:00
draft: true
keywords:
  - Microsoft Defender νέα
  - custom detection rules alert grouping
  - expanded entity mapping Defender XDR
  - Defender Vulnerability Management export assessment API
  - server-side filtering $filter
  - device inventory domain filter
  - MC1552387
  - MC1537494
  - Defender RBAC
tags:
  - Microsoft Defender XDR
  - Microsoft Defender for Endpoint
  - Microsoft Defender Vulnerability Management
  - Microsoft Defender for Identity
  - Microsoft Sentinel
  - Εβδομαδιαία σύνοψη
author: "Dimosthenis Atteia"
description: "Εβδομάδα 48/2026: alert grouping στα custom detections, $filter στα export APIs του DVM, φίλτρο Domain στο device inventory και δύο προθεσμίες."
summary: "Ήσυχη εβδομάδα στο Message Center, με δύο προθεσμίες που πλησιάζουν: 30 Νοεμβρίου για τα alerts του Defender for Identity και 2 Δεκεμβρίου για το Defender RBAC. Στα νέα, alert grouping στα custom detections, server-side filtering στα export APIs του Defender Vulnerability Management και φίλτρο Domain στο device inventory."
categories: ["Security Operations & XDR"]
mitre: ["M1016", "M1047", "M1051"]
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
  - feature: "Defender XDR: alert grouping και expanded entity mapping στα custom detection rules"
    status: "Public Preview"
    license: "Δεν αναφέρεται"
    source: "https://learn.microsoft.com/en-us/defender-xdr/custom-detection-rules"
    verified: 2026-11-26
  - feature: "Defender Vulnerability Management: server-side filtering ($filter) στα export assessment APIs"
    status: "Public Preview"
    license: "Defender for Endpoint Plan 2 ή Defender Vulnerability Management standalone"
    source: "https://learn.microsoft.com/en-us/defender-endpoint/api/export-assessment-server-side-filtering"
    verified: 2026-11-26
  - feature: "Defender for Endpoint: φίλτρο Domain στο device inventory"
    status: "Generally Available"
    license: "Δεν αναφέρεται"
    source: "https://learn.microsoft.com/en-us/defender-endpoint/device-inventory-field-reference#filters-reference"
    verified: 2026-11-26
---

## Με μια ματιά

Ήσυχη εβδομάδα: στο αρχείο του Message Center δεν βρέθηκε νέα ανακοίνωση για τα προϊόντα Defender και Sentinel. Το σημαντικό είναι οι δύο προθεσμίες που έρχονται: στις **30 Νοεμβρίου** φεύγουν δύο classic alerts του Defender for Identity, και στις **2 Δεκεμβρίου** λήγει το περιθώριο για τον έλεγχο των ρόλων πριν από την αυτόματη ενεργοποίηση του Defender RBAC. Από τις σελίδες «What's new» κρατάμε τρεις αλλαγές: alert grouping στα custom detections, `$filter` στα export APIs του Defender Vulnerability Management και φίλτρο Domain στο device inventory.

## Οι αλλαγές της εβδομάδας

### 1. Defender XDR: alert grouping και expanded entity mapping στα custom detection rules

**Φάση:** Public Preview, από τις 17 Νοεμβρίου 2026 · **Άδεια:** δεν αναφέρεται στην πηγή. Τα custom detections βασίζονται στο advanced hunting, οπότε μην υποθέσεις ότι υπάρχουν με Microsoft 365 E3.

**Τι αλλάζει.** Μέχρι τώρα κάθε alert ενός custom detection rule γινόταν δικό του incident, εκτός αν το ένωνε η correlation του Defender. Στο νέο βήμα **Incident settings** του wizard, το **Alert grouping** ενώνει τα alerts του ίδιου κανόνα σε ένα incident, όπως κάνουν ήδη τα analytics rules του Sentinel. Είναι κλειστό από προεπιλογή. Ορίζεις χρονικό παράθυρο (προεπιλογή 5 ώρες) και κριτήριο: όλα τα entities ίδια (η προτεινόμενη επιλογή), όλα τα alerts του κανόνα μαζί, ή συγκεκριμένα entities και details. Ένα incident κρατά έως 150 alerts. Τα κλειστά incidents δεν ξανανοίγουν: αν έρθει alert που ταιριάζει σε κλειστό incident, δημιουργείται νέο. Μαζί, στο entity mapping μπορείς πλέον να βάλεις έως τέσσερα identifiers σε κάθε entity, τον ίδιο τύπο entity περισσότερες από μία φορές (π.χ. `DeviceName` και `RemoteDeviceName`) και νέα identifiers για User, Device, Mailbox, Mail Message και άλλους τύπους.

**Τι να κάνεις.** Ξεκίνα από τους κανόνες που γεμίζουν την ουρά με πολλά μικρά incidents για το ίδιο πράγμα. Άνοιξε **Edit → Incident settings → Alert grouping** σε έναν, με το κριτήριο «όλα τα entities ίδια», και σύγκρινε την ουρά μετά από μια εβδομάδα. Ενημέρωσε τη βάρδια ότι ένα κλειστό incident δεν ξανανοίγει, οπότε η επανάληψη θα εμφανιστεί ως νέο incident. Πριν αλλάξεις το entity mapping, θυμήσου ότι τα entities καθορίζουν πώς τα alerts ενώνονται σε incidents.

**Αναλυτικά:** [Preview: Alert grouping και entity mapping στα custom detections](/posts/previews/defender-xdr-custom-detection-alert-grouping-entity-mapping/)

**Πηγή:** [Create custom detection rules in Microsoft Defender XDR](https://learn.microsoft.com/en-us/defender-xdr/custom-detection-rules) · [What's new in Microsoft Defender XDR](https://learn.microsoft.com/en-us/defender-xdr/whats-new)

### 2. Defender Vulnerability Management: server-side filtering στα export assessment APIs

**Φάση:** Public Preview · **Άδεια:** Defender for Endpoint Plan 2 για τις βασικές δυνατότητες vulnerability management. Το Plan 1 μόνο του δεν αρκεί. Για Plan 1 ή Microsoft 365 E3 η πηγή προτείνει το Defender Vulnerability Management standalone.

**Τι αλλάζει.** Τα export assessment APIs, που τροφοδοτούν αναφορές και dashboards με ευπάθειες, software inventory, secure configuration, baselines, browser extensions και certificates, δέχονται πλέον την παράμετρο `$filter`. Αντί να κατεβάζεις όλη την εξαγωγή και να φιλτράρεις εσύ, παίρνεις μόνο ό,τι ταιριάζει, π.χ. `cvssScore ge 7 and securityUpdateAvailable eq true`. Με `rbacGroups in ('Finance')` περιορίζεις την αναζήτηση σε device groups, και με `cvePublishedDate` φιλτράρεις με την ημερομηνία δημοσίευσης του CVE. Ισχύει μόνο για τις μεθόδους με JSON response, όχι για τα file exports. Το φίλτρο δεν δίνει πρόσβαση σε περισσότερα δεδομένα: τα δικαιώματα παραμένουν το όριο.

**Τι να κάνεις.** Αν έχεις script ή Power BI που τραβά όλη την εξαγωγή κάθε μέρα, δοκίμασε το φίλτρο σε περιβάλλον δοκιμών. Πρόσεξε δύο σημεία. Πρώτο, ακολούθησε πάντα το `@odata.nextLink`, ακόμα και όταν μια σελίδα έρχεται άδεια, γιατί η υπηρεσία ψάχνει με όριο 100 δευτερολέπτων ανά αίτημα. Δεύτερο, αν κρατάς τοπικό αντίγραφο με delta exports, μη φιλτράρεις το delta: μια ευπάθεια που έπεσε κάτω από το όριο σου δεν θα έρθει ως ενημέρωση και το αντίγραφο θα μείνει λάθος.

**Αναλυτικά:** [Preview: Server-side filtering στα export APIs του DVM](/posts/previews/defender-vulnerability-management-export-api-server-side-filtering/)

**Πηγή:** [Use server-side filtering with export assessment APIs (preview)](https://learn.microsoft.com/en-us/defender-endpoint/api/export-assessment-server-side-filtering) · [Vulnerability Management prerequisites and licensing](https://learn.microsoft.com/en-us/defender-vulnerability-management/tvm-prerequisites)

### 3. Defender for Endpoint: φίλτρο Domain στο device inventory

**Φάση:** Generally Available · **Άδεια:** δεν αναφέρεται ειδικά για το φίλτρο. Το Microsoft Learn σημειώνει ότι οι πληροφορίες του device inventory διαφέρουν ανά άδεια και ότι την πληρέστερη εικόνα τη δίνει το Defender for Endpoint Plan 2.

**Τι αλλάζει.** Στο **Assets → Devices** μπορείς πλέον να φιλτράρεις τις συσκευές με βάση το Active Directory domain τους, στις καρτέλες **All devices** και **Computers & mobile**. Οι συσκευές που δεν είναι domain joined, ή για τις οποίες δεν υπάρχει πληροφορία, μπορεί να μην έχουν τιμή.

**Τι να κάνεις.** Αν έχεις περισσότερα από ένα domains, π.χ. μετά από εξαγορά ή για θυγατρική, χρησιμοποίησε το φίλτρο για να δεις τι κάλυψη έχει το καθένα. Συνδύασε το με **Onboarding status** για να βρεις συσκευές ενός domain που δεν είναι onboarded, και με **Sensor health state** για όσες δεν αναφέρουν σωστά. Για το πώς δουλεύει συνολικά το προϊόν, δες την [πρακτική περιήγηση στο Defender for Endpoint](/posts/microsoft-defender-up-close-series/microsoft-defender-for-endpoint-deep-dive/).

**Αναλυτικά:** [Generally Available: Φίλτρο Domain στο device inventory του MDE](/posts/generally-available/defender-endpoint-device-inventory-domain-filter/)

**Πηγή:** [Device inventory field reference: Filters reference](https://learn.microsoft.com/en-us/defender-endpoint/device-inventory-field-reference#filters-reference) · [What's new in Microsoft Defender for Endpoint](https://learn.microsoft.com/en-us/defender-endpoint/whats-new-in-microsoft-defender-endpoint)

## Προσοχή αυτή την εβδομάδα

**30 Νοεμβρίου 2026, Defender for Identity.** Σύμφωνα με την ανακοίνωση MC1552387, αποσύρονται τα classic alerts **Remote code execution attempt** και **Suspected identity theft (pass-the-hash)**, με «Act by» τις 30 Νοεμβρίου. Αν δεν έχεις φτιάξει ακόμα το custom detection για το remote code execution, όπως γράψαμε στο [τεύχος 47](/posts/weekly-security-update/microsoft-365-security-ti-allaxe-2026-w47/), έχεις το Σαββατοκύριακο. Πηγή: Message Center [MC1552387](https://mc.merill.net/message/MC1552387) (αρχείο mc.merill.net) · [Microsoft Defender for Identity classic alerts](https://learn.microsoft.com/en-us/defender-for-identity/alerts-mdi-classic).

**2 Δεκεμβρίου 2026, Defender XDR.** Σύμφωνα με την ανακοίνωση MC1537494, τα tenants με Defender for Office 365 Plan 2, μαζί με το Microsoft 365 E5, περνούν αυτόματα στο Defender RBAC, με διάθεση από τις αρχές Δεκεμβρίου 2026 έως τα τέλη Ιανουαρίου 2027. Έλεγξε τους ρόλους που εισάχθηκαν στο **Permissions → Roles** και τα runbooks σου, όπως γράψαμε στο [τεύχος 45](/posts/weekly-security-update/microsoft-365-security-ti-allaxe-2026-w45/). Πηγή: Message Center [MC1537494](https://mc.merill.net/message/MC1537494) (αρχείο mc.merill.net) · [Compare Microsoft Defender RBAC roles](https://learn.microsoft.com/en-us/defender-xdr/compare-rbac-roles).

**Αρχές Δεκεμβρίου 2026, Defender for Office 365 και Defender XDR.** Σύμφωνα με την ανακοίνωση MC1546447, ξεκινά η λογική OR για τους παραλήπτες στις threat protection policies ([τεύχος 46](/posts/weekly-security-update/microsoft-365-security-ti-allaxe-2026-w46/)). Σύμφωνα με την ανακοίνωση MC1556107, το Similar cases περνά σε GA ([τεύχος 47](/posts/weekly-security-update/microsoft-365-security-ti-allaxe-2026-w47/)).

**Αρχές έως τέλη Δεκεμβρίου 2026, Defender for Cloud Apps.** Σύμφωνα με την ανακοίνωση MC1479503, όπως ενημερώθηκε στις 19 Νοεμβρίου, οι αλλαγές στα δικαιώματα των ρόλων του Entra στο App Governance έρχονται σε GA από τις αρχές Δεκεμβρίου, αντί για τα τέλη Νοεμβρίου. Για τι αλλάζει, δες το [άρθρο για τους ρόλους του App Governance](/posts/generally-available/defender-cloud-apps-app-governance-roles-unified-rbac/).

Οι ημερομηνίες των ανακοινώσεων μπορεί να διαφέρουν ανά tenant, οπότε δες τις στο δικό σου Message Center.

## Σύνδεση με την ΚΥΑ 1689/2025

- **[24.ε](/kya-1689-2025/#24-ε), έλεγχος καταγραφών και όρια ειδοποίησης:** το alert grouping αλλάζει πώς φτάνει μια ειδοποίηση στη βάρδια. Η ρύθμιση κάθε κανόνα, με την αιτιολόγησή της, είναι μέρος των «κατάλληλων ορίων και συνθηκών ειδοποίησης» (αλλαγή 1).
- **[24.α](/kya-1689-2025/#24-α), διαδικασία απόκρισης:** το ότι ένα κλειστό incident δεν ξανανοίγει πρέπει να το λέει η διαδικασία ανάλυσης (αλλαγή 1).
- **[17.α](/kya-1689-2025/#17-α) και [17.στ](/kya-1689-2025/#17-στ), διαχείριση ευπαθειών:** τα φιλτραρισμένα exports δίνουν στον υπεύθυνο κάθε ομάδας συσκευών τη δική του λίστα ευπαθειών προς αποκατάσταση (αλλαγή 2).
- **[11.α](/kya-1689-2025/#11-α), κατάλογος αγαθών:** το φίλτρο Domain βοηθά να ελέγξεις αν ο κατάλογος συσκευών είναι πλήρης ανά domain (αλλαγή 3).

Όλες οι απαιτήσεις της ΚΥΑ 1689/2025 με την αντιστοίχισή τους βρίσκονται στον [οδηγό της ΚΥΑ 1689/2025](/kya-1689-2025/).

Στον οδηγό για την **[Οδηγία NIS2](/nis2/)** οι αλλαγές της εβδομάδας αντιστοιχούν στα [21.2.β](/nis2/#21-2-β), [21.2.ε](/nis2/#21-2-ε) και [21.2.θ](/nis2/#21-2-θ). Στο **[ISO/IEC 27001](/iso-27001/)** αντιστοιχούν στα [A.5.9](/iso-27001/#A-5-9), [A.5.25](/iso-27001/#A-5-25), [A.8.8](/iso-27001/#A-8-8) και [A.8.16](/iso-27001/#A-8-16), και στον **[GDPR](/gdpr/)** στα [32.1.δ](/gdpr/#32-1-δ) και [33.1](/gdpr/#33-1). Ο καθένας έχει checklist σε Excel.

## Πηγές και επαλήθευση {#last-verified}

{{< verification >}}

Για αυτό το τεύχος ελέγχθηκαν το αρχείο mc.merill.net (αναρτήσεις Message Center για τα προϊόντα Defender και Sentinel που δημοσιεύθηκαν ή ενημερώθηκαν από τις 20 έως τις 26 Νοεμβρίου 2026, και ανακοινώσεις Defender παλαιότερων εβδομάδων με ημερομηνίες μέσα στις επόμενες δύο εβδομάδες), οι σελίδες «What's new» των Defender XDR, Defender for Endpoint, Defender for Office 365, Defender for Identity, Defender for Cloud Apps, Defender for Cloud και Microsoft Sentinel, και τα blogs του Microsoft Defender XDR, του Microsoft Sentinel και του Defender for Cloud στο Tech Community και το Microsoft Security Blog.

Στο αρχείο δεν βρέθηκε νέα ανακοίνωση για Defender ή Sentinel μέσα στην εβδομάδα. Η ροή RSS και η αρχική σελίδα διαβάστηκαν μόνο εν μέρει, οπότε μπορεί να υπάρχει ανακοίνωση που δεν εντοπίστηκε. Τελευταία ενημέρωση από τις ανακοινώσεις με ημερομηνίες στις επόμενες εβδομάδες είχε η MC1479503 (19 Νοεμβρίου). Η MC1484009 για τους πίνακες SubmissionEvents και SubmissionResults, που καλύψαμε στο [τεύχος 42](/posts/weekly-security-update/microsoft-365-security-ti-allaxe-2026-w42/), δίνει πλέον GA από τα τέλη Νοεμβρίου έως τα μέσα Δεκεμβρίου 2026.

Τι βρέθηκε στις σελίδες «What's new»: του Defender XDR έχει για τον Νοέμβριο το alert grouping και το expanded entity mapping (αλλαγή 1) και το φίλτρο Domain (αλλαγή 3). Τα υπόλοιπα, όπως η νέα πλοήγηση για ISOC και η προστασία για το GitHub Copilot CLI, καλύφθηκαν στο τεύχος 47. Του Defender for Endpoint έχει τις αλλαγές 2 και 3, και όσα καλύφθηκαν ήδη. Του Defender for Office 365, του Defender for Identity, του Defender for Cloud Apps, του Defender for Cloud και του Microsoft Sentinel δεν έχουν κάτι νέο από το προηγούμενο τεύχος. Τα blogs του Tech Community δεν είχαν νέα ανάρτηση για Defender ή Sentinel μέσα στην εβδομάδα. Το Microsoft Security Blog είχε την ανακοίνωση για τη θέση του Microsoft Sentinel στο Gartner Magic Quadrant για SIEM (20 Νοεμβρίου) και μια ανάρτηση threat intelligence για το ARTEX (25 Νοεμβρίου), που δεν μπήκαν στο τεύχος.

Οι ανακοινώσεις MC1552387, MC1537494, MC1546447, MC1556107, MC1479503 και MC1484009 διαβάστηκαν από το έγκυρο, δημόσιο και ανεξάρτητο αρχείο του Microsoft 365 Message Center, mc.merill.net, που το συντηρεί η κοινότητα και όχι η Microsoft. Δεν διαβάστηκαν σε Message Center κάποιου tenant. Πριν ενεργήσεις, δες τις ανακοινώσεις στο δικό σου Message Center.

Τελευταίος έλεγχος αδειών και στοιχείων: 26 Νοεμβρίου 2026.
