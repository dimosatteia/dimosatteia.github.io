---
title: "Preview: Τα plans του Defender for Cloud περνούν στο Defender portal, με χρέωση σε Defender Workload Units"
seoTitle: "Preview: Defender for Cloud plans στο Defender portal (DWU)"
date: 2026-10-27T16:00:00+02:00
lastmod: 2026-10-27T16:00:00+02:00
draft: false
keywords:
  - Microsoft Defender for Cloud
  - Defender portal cloud security plans
  - Defender Workload Units
  - DWU billing
  - Defender for Servers billing November 2026
  - Defender for DNS discontinued
  - Cloud Security Cost Estimator
  - ΚΥΑ 1689/2025 cloud
tags:
  - Microsoft Defender for Cloud
  - Microsoft Defender XDR
  - Azure Security
  - Cloud Security
  - NIS2
  - ISO 27001
  - GRC
author: "Dimosthenis Atteia"
description: "Από τις 20 Οκτωβρίου 2026, σε Public Preview, συνδέεις Azure subscriptions και management groups στο Defender portal και διαχειρίζεσαι από εκεί τα plans του Defender for Cloud. Τι αλλάζει στη χρέωση με τα Defender Workload Units, ποια plans αλλάζουν, τι χάνεται στη μεταφορά και τι αλλάζει από 1 Νοεμβρίου στο Defender for Servers."
seoDescription: "Defender for Cloud plans στο Defender portal σε Preview: χρέωση σε DWU, plans που αλλάζουν, τι χάνεται στη μεταφορά και η αλλαγή του Defender for Servers."
summary: "Η διαχείριση των cloud security plans μπαίνει στο Defender portal, με νέο μοντέλο χρέωσης και ρυθμίσεις μόνο σε επίπεδο subscription ή management group. Δες τι κερδίζεις, τι χάνεις και πώς το δοκιμάζεις χωρίς ρίσκο για την παραγωγή."
categories: ["Cloud Security"]
releases:
  - "preview"
ShowToc: true
TocOpen: false
cover:
  image: "https://learn.microsoft.com/en-us/azure/defender-for-cloud/defender-portal/media/plan-management-changes-defender-portal/migrate-to-defender-plan-comparison.png"
  alt: "Το παράθυρο Migrate to Defender με τις αλλαγές στη χρέωση, στη διαχείριση και τη σύγκριση των παλιών με τα νέα plans του Defender for Cloud"
  caption: "Πηγή εικόνας: Microsoft Learn"
  relative: false
# Πλαίσιο «Last verified»: κάθε χαρακτηριστικό με τη φάση, την άδεια, την πηγή και την ημερομηνία ελέγχου
verification:
  - feature: "Cloud security plan management στο Defender portal για Azure commercial (από 20 Οκτωβρίου 2026)"
    status: "Public Preview"
    license: "Defender for Cloud plans, χρέωση στο Azure"
    source: "https://learn.microsoft.com/en-us/azure/defender-for-cloud/release-notes#october-2026"
    verified: 2026-10-27
  - feature: "Χρέωση σε Defender Workload Units, ρυθμίσεις μόνο ανά tenant, management group ή subscription, αλλαγές στα plans"
    status: "Public Preview"
    license: "Defender for Cloud plans, χρέωση στο Azure"
    source: "https://learn.microsoft.com/en-us/azure/defender-for-cloud/defender-portal/plan-management-changes-defender-portal"
    verified: 2026-10-27
  - feature: "Global plan enablement, κλείδωμα ρυθμίσεων και δοκιμή 30 ημερών μόνο με ρητό opt-in"
    status: "Public Preview"
    license: "Defender for Cloud plans, χρέωση στο Azure"
    source: "https://learn.microsoft.com/en-us/azure/defender-for-cloud/defender-portal/manage-plans-defender-portal"
    verified: 2026-10-27
  - feature: "Defender for Servers: τα desktops δεν χρεώνονται ως servers στο Plan 1, νέος τρόπος αναγνώρισης billable servers (από 1 Νοεμβρίου 2026)"
    status: "Generally Available"
    license: "Defender for Servers Plan 1 και Plan 2"
    source: "https://learn.microsoft.com/en-us/azure/defender-for-cloud/release-notes#september-2026"
    verified: 2026-10-27
# MITRE ATT&CK®: ονόματα στο data/mitre.yaml
mitre: ["T1190", "T1530", "M1047", "M1054"]
---

Όποιος διαχειρίζεται Defender for Cloud σε περισσότερα από δύο subscriptions ξέρει το πρόβλημα: plans ενεργά σε ένα subscription και όχι στο διπλανό, Defender for Storage ανοιχτό σε μερικά storage accounts μόνο, και ένα νέο subscription που κανείς δεν θυμήθηκε να καλύψει. Η εικόνα της κάλυψης ζούσε στο Azure portal, μακριά από το SOC που κοιτάζει το Defender portal.

Από τις **20 Οκτωβρίου 2026**, σε **Public Preview**, η διαχείριση των cloud security plans μπαίνει στο Defender portal. Μαζί της έρχεται και νέο μοντέλο χρέωσης.

## Τι αλλάζει

Στο Defender portal, στο **Cloud security**, συνδέεις Azure commercial subscriptions ή management groups και ενεργοποιείς τα plans από εκεί. Μπορείς να τα ορίσεις:

- **Global**, για όλα τα συνδεδεμένα περιβάλλοντα, τωρινά και μελλοντικά. Με το εικονίδιο της κλειδαριάς εμποδίζεις τα επιμέρους περιβάλλοντα να αλλάξουν τη ρύθμιση.
- **Ανά management group ή subscription**, για επιλεγμένα περιβάλλοντα.

Μόλις ένα subscription περάσει στη διαχείριση από το Defender portal, τρία πράγματα ισχύουν:

| Τι | Μετά τη μεταφορά |
|---|---|
| Ρυθμίσεις plans | Μόνο στο Defender portal. Στο Azure portal γίνονται view-only. |
| Ρυθμίσεις ανά resource | **Δεν διατηρούνται.** Αντικαθίστανται από τη ρύθμιση του subscription ή του management group. |
| Χρέωση | Σε **Defender Workload Units (DWU)**. Κάθε προστατευόμενο workload αντιστοιχεί σε ορισμένα DWU, και το ίδιο μοντέλο χρησιμοποιείται για εκτίμηση, αναφορά χρήσης και χρέωση. |

Η σύνδεση ενός περιβάλλοντος από μόνη της δεν αλλάζει τα plans ούτε τη χρέωση του. Η αλλαγή γίνεται όταν μεταφέρεις συγκεκριμένο περιβάλλον ή ενεργοποιήσεις global plans. Προσοχή σε αυτό το δεύτερο: η έγκριση για global plan enablement είναι μία φορά για όλο το tenant και μεταφέρει αυτόματα όλα τα συνδεδεμένα περιβάλλοντα.

Το preview καλύπτει μόνο Azure commercial. Τα AWS, GCP, τα national clouds και τα DevOps connectors μένουν στο Azure portal.

## Ποια plans αλλάζουν

Με το νέο μοντέλο κάποια plans ενοποιούνται ή μετρούν διαφορετικά. Τα πιο σημαντικά:

| Παλιό plan | Στο Defender portal |
|---|---|
| Containers (ανά vCPU) και Kubernetes Service (ανά vCore) | **Containers**, ανά node |
| Storage Accounts, ανά transaction | **Storage**, ανά resource |
| Key Vaults, ανά transaction | **Key Vaults**, ανά resource |
| SQL Databases, SQL Servers on Machines, Open-Source Relational Databases | **Databases**, ένα ενιαίο plan ανά instance |
| ARM, ανά transaction | **Resource Manager**, ανά subscription |
| API P2 έως P5 | **API**, ένα plan (P1) |
| Defender CSPM | Το ίδιο, αλλά το Serverless Protection και τα Serverless Containers μπαίνουν από προεπιλογή, χωρίς opt-out |
| **DNS** | **Καταργείται.** Για αντίστοιχη προστασία ενεργοποιείς χειροκίνητα Defender for Servers Plan 2 |

Το Defender for DNS είναι η παγίδα. Δεν μεταφέρεται αυτόματα. Αν το είχες ενεργό και δεν ενεργοποιήσεις Defender for Servers Plan 2, μετά τη μεταφορά μένεις χωρίς προστασία DNS.

## Η δοκιμή των 30 ημερών

Στο Defender portal μπορείς να ξεκινήσεις δοκιμή 30 ημερών για όλα τα επιλέξιμα plans, αλλά **μόνο με ρητό opt-in τη στιγμή που τα ενεργοποιείς**. Αν τα ενεργοποιήσεις χωρίς να τη ζητήσεις, η δοκιμή χάνεται για αυτά τα περιβάλλοντα και η χρέωση ξεκινά αμέσως. Η μεταφορά από το Azure portal δεν δίνει νέα δοκιμή σε περιβάλλον που την έχει ήδη χρησιμοποιήσει.

## Ξεχωριστά: η αλλαγή στο Defender for Servers από 1 Νοεμβρίου

Αυτή η αλλαγή δεν είναι preview και ισχύει για όλους, όπου κι αν διαχειρίζεσαι τα plans. Από την **1η Νοεμβρίου 2026**:

- Στο **Defender for Servers Plan 1**, τα desktops, όπως Windows 10 και 11, δεν χρεώνονται πια ως servers. Το ίδιο ισχύει για τα Windows Enterprise multi-session και το Azure Virtual Desktop.
- Και στα **δύο plans** αλλάζει ο τρόπος που αναγνωρίζονται οι billable servers. Ο αριθμός servers στον λογαριασμό σου μπορεί να αλλάξει. Συσκευή που δεν αναγνωρίζεται καθαρά ως desktop χρεώνεται ως server.

## Τι κάνεις τώρα

1. **Μην μεταφέρεις παραγωγικά subscriptions χωρίς σχέδιο.** Είναι preview, και οι ρυθμίσεις ανά resource χάνονται. Ξεκίνα από ένα subscription δοκιμών.
2. **Κατέγραψε τις ρυθμίσεις ανά resource** πριν από οποιαδήποτε μεταφορά: Defender for Storage σε συγκεκριμένα accounts, εξαιρέσεις από το Defender for Servers. Μετά τη μεταφορά δεν θα υπάρχουν.
3. **Σύγκρινε το κόστος.** Βάλε τα σημερινά resources στο Cloud Security Cost Estimator και σύγκρινε DWU με τη σημερινή χρέωση.
4. **Έλεγξε αν έχεις Defender for DNS** και αποφάσισε τι κάνεις μετά τη μεταφορά.
5. **Κράτησε τον λογαριασμό του Οκτωβρίου** για το Defender for Servers και σύγκρινέ τον με του Νοεμβρίου. Αν έχεις VDI, δες πώς ταξινομούνται τα session hosts.

Για να συνδέσεις περιβάλλον χρειάζεσαι **Global Administrator** ή **Security Administrator** στο Entra ID, ή το **Core security settings (Manage)** στο Unified RBAC του Defender, και **Owner** ή **User Access Administrator** στο subscription ή στο management group.

## Σύνδεση με ΚΥΑ 1689/2025, NIS2, ISO 27001 και GDPR

- **ΚΥΑ 1689/2025 [14.α](/kya-1689-2025/#14-α):** η ενεργοποίηση plans ανά management group ή global, με κλείδωμα, είναι μηχανισμός επιβολής ρυθμίσεων: κάθε νέο subscription και κάθε νέο resource καλύπτεται αυτόματα. **[20.α](/kya-1689-2025/#20-α):** προστασία από κακόβουλο λογισμικό σε servers και cloud workloads. **[11.α](/kya-1689-2025/#11-α):** η κάλυψη ανά περιβάλλον στο Defender portal είναι μέρος του καταλόγου αγαθών για το cloud.
- **Οδηγία NIS2 [21.2.ε](/nis2/#21-2-ε):** ασφάλεια στην απόκτηση και συντήρηση συστημάτων.
- **ISO/IEC 27001 [A.5.23](/iso-27001/#A-5-23), [A.8.7](/iso-27001/#A-8-7) και [A.8.9](/iso-27001/#A-8-9):** ασφάλεια στη χρήση cloud, προστασία από malware, configuration management.
- **GDPR [32.1.β](/gdpr/#32-1-β):** εμπιστευτικότητα, ακεραιότητα και διαθεσιμότητα των συστημάτων που φιλοξενούν προσωπικά δεδομένα στο Azure.

Τεκμήρια για τον ελεγκτή: screenshot της σελίδας **Define Cloud Security plans** με τη ρύθμιση ανά scope και το κλείδωμα, η αναφορά κάλυψης ανά subscription, και η απόφαση για τη μεταφορά με την ανάλυση κόστους. Για το Defender for DNS, η καταγεγραμμένη επιλογή: Defender for Servers Plan 2 ή αποδοχή κινδύνου.

> 📖 **Θέλεις όλη την εικόνα;** Το Defender for Cloud ως μέρος της οικογένειας Defender: **[Microsoft Defender Demystified](/series/microsoft-defender-demystified/)**.

---

## Πηγές και επαλήθευση {#last-verified}

{{< verification >}}

Επιπλέον πηγές: [What changes when managing cloud security plans in the Defender portal](https://learn.microsoft.com/en-us/azure/defender-for-cloud/defender-portal/plan-management-changes-defender-portal) · [Manage cloud security plans in the Defender portal](https://learn.microsoft.com/en-us/azure/defender-for-cloud/defender-portal/manage-plans-defender-portal) · [Connect Azure environments in the Defender portal](https://learn.microsoft.com/en-us/azure/defender-for-cloud/defender-portal/connect-azure-environments-defender-portal) · [Estimate and track Cloud security cost](https://learn.microsoft.com/en-us/azure/defender-for-cloud/defender-portal/estimate-track-costs) · [What's new in Defender for Cloud](https://learn.microsoft.com/en-us/azure/defender-for-cloud/release-notes). Δεν βρέθηκε ανακοίνωση Message Center για αυτή την αλλαγή. Το θέμα πρωτοεμφανίστηκε στο [Microsoft 365 Security: τι άλλαξε (εβδομάδα 43/2026)](/posts/weekly-security-update/microsoft-365-security-ti-allaxe-2026-w43/).

Τελευταίος έλεγχος στοιχείων: 27 Οκτωβρίου 2026.
