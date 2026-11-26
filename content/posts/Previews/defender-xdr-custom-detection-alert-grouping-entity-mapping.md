---
title: "Preview: Alert grouping και entity mapping στα custom detections"
seoTitle: "Preview: Alert grouping στα custom detections του Defender"
slug: "defender-xdr-custom-detection-alert-grouping-entity-mapping"
date: 2026-11-27T08:05:00+02:00
lastmod: 2026-11-27T08:05:00+02:00
draft: true
keywords:
  - Microsoft Defender XDR
  - custom detection rules
  - alert grouping
  - Incident settings
  - expanded entity mapping
  - Impacted Assets
  - Related Evidence
  - advanced hunting
  - Microsoft Sentinel analytics rules
tags:
  - Microsoft Defender XDR
  - Microsoft Sentinel
  - Security Operations
  - SOC
  - Advanced Hunting
  - Incident Response
  - NIS2
  - ISO 27001
author: "Dimosthenis Atteia"
description: "Από τις 17 Νοεμβρίου 2026, σε Public Preview, τα custom detection rules του Defender ενώνουν τα alerts τους σε ένα incident και δέχονται έως τέσσερα identifiers ανά entity. Πώς ρυθμίζεται το alert grouping, τα όρια του και τι προσέχεις στο entity mapping."
seoDescription: "Alert grouping και expanded entity mapping στα custom detections του Defender XDR, σε Preview. Πώς ρυθμίζονται, τα όρια και τι προσέχει το SOC."
summary: "Ένας custom detection rule που βγάζει δέκα alerts για το ίδιο πράγμα δεν χρειάζεται πια να γεμίζει την ουρά με δέκα incidents. Δες πώς στήνεις το alert grouping, γιατί τα κλειστά incidents δεν ξανανοίγουν και πώς το νέο entity mapping αλλάζει την correlation."
categories: ["Security Operations & XDR"]
releases:
  - "preview"
ShowToc: true
TocOpen: false
cover:
  image: "https://learn.microsoft.com/en-us/defender-xdr/media/custom-detection-rules/custom-detection-alert-grouping.png"
  alt: "Το βήμα Incident settings του wizard για custom detection rules στο Microsoft Defender portal, με ενεργό το Alert grouping, χρονικό παράθυρο πέντε ωρών και ομαδοποίηση όταν ταιριάζουν όλα τα entities"
  caption: "Πηγή εικόνας: Microsoft Learn"
  relative: false
# Πλαίσιο «Last verified»: κάθε χαρακτηριστικό με τη φάση, την άδεια, την πηγή και την ημερομηνία ελέγχου
verification:
  - feature: "Alert grouping στο βήμα Incident settings των custom detection rules, από τις 17 Νοεμβρίου 2026"
    status: "Public Preview"
    license: "Δεν αναφέρεται"
    source: "https://learn.microsoft.com/en-us/defender-xdr/custom-detection-rules#alert-grouping-preview"
    verified: 2026-11-26
  - feature: "Expanded entity mapping: έως τέσσερα identifiers ανά entity, ίδιος τύπος entity πολλές φορές, νέα identifiers"
    status: "Public Preview"
    license: "Δεν αναφέρεται"
    source: "https://learn.microsoft.com/en-us/defender-xdr/custom-detection-rules#expanded-entity-mapping"
    verified: 2026-11-26
# MITRE ATT&CK®: ονόματα στο data/mitre.yaml
mitre: ["M1047"]
---

Ένας καλός custom detection rule έχει ένα πρόβλημα που ξέρει κάθε SOC: όταν πιάνει κάτι, το πιάνει πολλές φορές. Ένας λογαριασμός που δοκιμάζει κωδικούς σε δέκα servers, ένα script που τρέχει κάθε ώρα, και η ουρά γεμίζει με incidents που είναι στην ουσία ένα. Η correlation του Defender ενώνει κάποια από αυτά, αλλά όχι με κανόνες που ελέγχεις εσύ.

Τα analytics rules του Microsoft Sentinel είχαν από χρόνια **alert grouping**. Από τις **17 Νοεμβρίου 2026**, σε **Public Preview**, το αποκτούν και τα custom detection rules του Defender, μαζί με πιο πλούσιο **entity mapping**.

## Τι αλλάζει

| Τι | Πριν | Τώρα (Preview) |
|---|---|---|
| Incidents ανά κανόνα | Ένα incident ανά alert, εκτός αν τα ενώσει η correlation | Τα alerts του ίδιου κανόνα ενώνονται σε ένα incident με κριτήρια που ορίζεις |
| Identifiers ανά entity | Ένα | Έως τέσσερα ζεύγη identifier και στήλης |
| Ίδιος τύπος entity | Μία φορά | Περισσότερες φορές, π.χ. δύο Device |
| Identifiers | Τα υπάρχοντα | Νέα για User, Device, Cloud Application, File, Process, Registry value, Mailbox, Mail Cluster και Mail Message |

Το Microsoft Learn δεν αναφέρει άδεια για τη δυνατότητα. Τα custom detections βασίζονται στο advanced hunting του Defender XDR, οπότε μην υποθέσεις ότι υπάρχουν με Microsoft 365 E3, που περιλαμβάνει μόνο Defender for Endpoint Plan 1.

## Alert grouping: πώς το ρυθμίζεις

Ο wizard του κανόνα έχει νέο βήμα, **Incident settings** (preview), ανάμεσα στο **Alert settings** και στο **Automated actions**. Εκεί, στο **Alert grouping**:

1. Ενεργοποιείς το **Group related alerts, triggered by this custom detection rule, into incidents**. Από προεπιλογή είναι **Disabled**, οπότε οι υπάρχοντες κανόνες σου δεν αλλάζουν συμπεριφορά.
2. Ορίζεις το χρονικό παράθυρο στο **Limit the group to alerts created within the selected time frame**. Είναι υποχρεωτικό, με προεπιλογή **5 Hours**.
3. Διαλέγεις κριτήριο:
   - **όλα τα entities ίδια** (προτεινόμενο και προεπιλεγμένο),
   - **όλα τα alerts του κανόνα** σε ένα incident,
   - **συγκεκριμένα entities και details**, που τα επιλέγεις από λίστα.

### Τα όρια που πρέπει να ξέρεις

- **Έως 150 alerts ανά incident.** Μετά ανοίγει νέο incident με τα ίδια στοιχεία. Το όριο είναι ξεχωριστό από τα 150 alerts που μπορεί να βγάλει ένας κανόνας σε κάθε εκτέλεση.
- **Τα κλειστά incidents δεν ξανανοίγουν.** Στο Sentinel υπάρχει η επιλογή **Re-open closed matching incidents**. Στα custom detections δεν υπάρχει. Αν έρθει alert που ταιριάζει σε κλειστό incident, δημιουργείται νέο.
- **Η correlation του Defender συνεχίζει.** Το alert grouping δεν εμποδίζει τον Defender να προσθέσει άλλα alerts ή να ενώσει incidents.

Το δεύτερο σημείο είναι αυτό που θα μπερδέψει τη βάρδια. Ένα incident που έκλεισε ως benign και «ξαναεμφανίζεται» την επόμενη ώρα δεν είναι bug: είναι νέο incident από τον ίδιο κανόνα. Αν ο κανόνας βγάζει συχνά τέτοια, το πρόβλημα είναι στο query, όχι στο grouping.

Για να αλλάξεις έναν υπάρχοντα κανόνα: **Investigation & response → Detection → Custom detection rules**, επιλέγεις τον κανόνα, **Edit → Incident settings → Alert grouping**.

## Expanded entity mapping

Στο βήμα **Alert settings**, η ενότητα **Entity mapping** έχει δύο μέρη: **Impacted Assets** (User, Device, Mailbox, Cloud Application και cloud resources σε Azure, AWS και GCP) και **Related Evidence** (Process, File, Registry value, IP, OAuth Application, DNS, Security group, URL, Mail cluster, Mail message). Ως impacted μπορείς να δηλώσεις μόνο assets.

Τι αλλάζει σε preview:

- Σε κάθε entity βάζεις έως **τέσσερα** ζεύγη identifier και στήλης, με **Add identifier**. Για παράδειγμα, ένα **Registry value** με **Key** στο `RegistryKey` και **ValueName** στο `RegistryValueName`.
- Προσθέτεις τον **ίδιο τύπο entity περισσότερες φορές**: ένα Device στο `DeviceName` και ένα στο `RemoteDeviceName`, ή τρία IP στο `IPAddress`, `LocalIP` και `RemoteIP`.
- Νέα identifiers, όπως `ObjectGuid` και `DisplayName` για User, `OSFamily` και `IsDomainJoined` για Device, `InternetMessageId` και `P1SenderDomain` για Mail Message.

Η σημαντική παρατήρηση του Microsoft Learn: **τα entities καθορίζουν πώς τα alerts ενώνονται σε incidents.** Περισσότερα entities σημαίνουν καλύτερη correlation, αλλά ένα λάθος mapping, π.χ. ένα κοινό IP του proxy ως entity, μπορεί να ενώσει άσχετα alerts. Το ίδιο ισχύει για το alert grouping με κριτήριο «όλα τα entities ίδια».

## Τι κάνεις τώρα

1. Βγάλε από την ουρά τους 3 με 5 custom detection rules με τα περισσότερα incidents τον τελευταίο μήνα.
2. Σε έναν από αυτούς, άνοιξε **Edit → Incident settings → Alert grouping**, ενεργοποίησέ το με κριτήριο **όλα τα entities ίδια** και άφησε το παράθυρο στις 5 ώρες.
3. Μετά από μία εβδομάδα σύγκρινε τον αριθμό των incidents και ρώτα τη βάρδια αν χάθηκε κάτι.
4. Πρόσθεσε στη διαδικασία έρευνας ότι ένα κλειστό incident δεν ξανανοίγει από custom detection, και ότι η επανάληψη έρχεται ως νέο incident.
5. Για τους κανόνες με δεδομένα από Sentinel, όπου τα entities τα επιλέγεις χειροκίνητα, πέρασε το mapping και πρόσθεσε τα identifiers που λείπουν, π.χ. και το `DeviceName` και το `RemoteDeviceName`.
6. Για τα δικαιώματα: χρειάζεσαι **Security settings (manage)** ή **Detection tuning (manage)** στο Unified RBAC, ή τον ρόλο **Security Administrator**. Για κανόνες σε δεδομένα του Sentinel χρειάζεσαι και **Microsoft Sentinel Contributor**.

> 📖 **Θέλεις όλη την εικόνα;** Πώς δουλεύει το Defender XDR από την ουρά των incidents ως το advanced hunting: **[Live Webinar: Μάθε το Microsoft Defender XDR σε 60 λεπτά](/posts/microsoft-defender-xdr-full-tutorial-ciso/)**.

## Σύνδεση με ΚΥΑ 1689/2025, NIS2, ISO 27001 και GDPR

- **ΚΥΑ 1689/2025 [24.ε](/kya-1689-2025/#24-ε):** «κατάλληλα όρια και συνθήκες ειδοποίησης». Η ρύθμιση του alert grouping σε κάθε κανόνα είναι ακριβώς αυτό, και θέλει αιτιολόγηση. **[24.α](/kya-1689-2025/#24-α):** η διαδικασία ανάλυσης πρέπει να λέει τι γίνεται όταν ένα κλειστό incident επανέρχεται.
- **Οδηγία NIS2 [21.2.β](/nis2/#21-2-β):** χειρισμός περιστατικών.
- **ISO/IEC 27001 [A.8.16](/iso-27001/#A-8-16) και [A.5.25](/iso-27001/#A-5-25):** monitoring activities, και αξιολόγηση των events για το αν είναι περιστατικά. Λιγότερα και πληρέστερα incidents βοηθούν στη δεύτερη.
- **GDPR [33.1](/gdpr/#33-1):** ένα incident που δείχνει όλη την έκταση της δραστηριότητας επιταχύνει την αξιολόγηση μιας πιθανής παραβίασης μέσα στις 72 ώρες.

Τεκμήρια για τον ελεγκτή: η λίστα των custom detection rules με τη ρύθμιση alert grouping και την αιτιολόγησή της, το entity mapping κάθε κανόνα, και η ενότητα της διαδικασίας απόκρισης για τα incidents που επανέρχονται.

---

## Πηγές και επαλήθευση {#last-verified}

{{< verification >}}

Επιπλέον πηγές: [Create custom detection rules in Microsoft Defender XDR](https://learn.microsoft.com/en-us/defender-xdr/custom-detection-rules) · [Manage existing custom detection rules](https://learn.microsoft.com/en-us/defender-xdr/custom-detection-manage) · [What's new in Microsoft Defender XDR](https://learn.microsoft.com/en-us/defender-xdr/whats-new) · [What's new in Microsoft Defender unified RBAC](https://learn.microsoft.com/en-us/defender-xdr/whats-new-in-microsoft-defender-urbac). Δεν βρέθηκε ανακοίνωση στο Message Center για τη δυνατότητα. Το θέμα πρωτοεμφανίστηκε στο [Microsoft 365 Security: τι άλλαξε (εβδομάδα 48/2026)](/posts/weekly-security-update/microsoft-365-security-ti-allaxe-2026-w48/).

Τελευταίος έλεγχος στοιχείων: 26 Νοεμβρίου 2026.
