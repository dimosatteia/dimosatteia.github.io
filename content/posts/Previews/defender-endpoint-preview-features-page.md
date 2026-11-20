---
title: "Preview: Τα preview features του Defender for Endpoint ένα ένα"
seoTitle: "Preview: Preview features ανά feature στο Defender for Endpoint"
slug: "defender-endpoint-preview-features-page"
date: 2026-11-20T08:20:00+02:00
lastmod: 2026-11-20T08:20:00+02:00
draft: false
keywords:
  - Microsoft Defender for Endpoint
  - preview features page
  - safe deployment channels
  - gradual rollout Defender updates
  - embedded offboarding Defender deployment tool
  - διαχείριση αλλαγών
tags:
  - Microsoft Defender for Endpoint
  - Microsoft Defender XDR
  - Endpoint Security
  - Change Management
  - NIS2
  - ISO 27001
author: "Dimosthenis Atteia"
description: "Η νέα σελίδα Preview features του Defender for Endpoint, σε Public Preview, σου επιτρέπει να ανοίγεις ένα public preview feature τη φορά και για ορισμένα μόνο σε συγκεκριμένα safe deployment channels. Πώς δουλεύει και πώς τη βάζεις στη διαχείριση αλλαγών."
seoDescription: "Preview features ένα ένα στο Defender for Endpoint, σε Preview: επιλογή ανά feature και ανά safe deployment channel, προεπιλογές και βήματα."
summary: "Μέχρι τώρα, για να δοκιμάσεις ένα preview του Defender for Endpoint, άνοιγες όλα τα previews σε όλο το tenant. Η νέα σελίδα σού δίνει επιλογή ανά feature και, για κάποια, ανά ομάδα συσκευών."
categories: ["Endpoint & Device"]
releases:
  - "preview"
ShowToc: true
TocOpen: false
cover:
  image: "https://learn.microsoft.com/defender-xdr/media/preview/preview-features-settings.png"
  alt: "Η ρύθμιση Preview features στο Microsoft Defender portal με τις επιλογές ανά υπηρεσία"
  caption: "Πηγή εικόνας: Microsoft Learn"
  relative: false
# Πλαίσιο «Last verified»: κάθε χαρακτηριστικό με τη φάση, την άδεια, την πηγή και την ημερομηνία ελέγχου
verification:
  - feature: "Defender for Endpoint: σελίδα Preview features για ενεργοποίηση ανά feature, tenant-wide ή ανά safe deployment channel"
    status: "Public Preview"
    license: "Δεν αναφέρεται"
    source: "https://learn.microsoft.com/en-us/defender-endpoint/manage-preview-features"
    verified: 2026-11-19
  - feature: "Defender for Endpoint: embedded offboarding με το Defender deployment tool για Windows"
    status: "Public Preview"
    license: "Δεν αναφέρεται"
    source: "https://learn.microsoft.com/en-us/defender-endpoint/whats-new-in-microsoft-defender-endpoint"
    verified: 2026-11-19
# MITRE ATT&CK®: ονόματα στο data/mitre.yaml
mitre: ["M1051"]
---

Ένας οργανισμός θέλει να δοκιμάσει ένα νέο feature του Defender for Endpoint που είναι σε public preview. Μέχρι τώρα είχε μία επιλογή: να ανοίξει τη ρύθμιση **Preview features**, που ενεργοποιούσε **όλα** τα public preview features σε **όλο** το tenant. Για όποιον έχει domain controllers, servers παραγωγής ή συστήματα που δεν σταματούν, αυτό σήμαινε ότι η δοκιμή ενός feature έφερνε μαζί και όλα τα άλλα.

Η Microsoft φέρνει σε **Public Preview** μια σελίδα που σπάει αυτό το «όλα ή τίποτα».

## Τι αλλάζει

Η νέα σελίδα βρίσκεται στο **Settings → Endpoints → Preview features** του Defender portal. Σύμφωνα με το Microsoft Learn:

- **Επιλέγεις feature ένα ένα.** Ανοίγεις μόνο όσα σε ενδιαφέρουν.
- **Δύο τρόποι εφαρμογής.** Κάθε feature είναι είτε **tenant-wide**, για όλες τις συσκευές, είτε **by safe deployment channel**, μόνο για τις συσκευές των channels που διαλέγεις. Η περιγραφή του feature λέει αν υποστηρίζει channels.
- **Κλειστά από προεπιλογή.** Τα features της σελίδας είναι κλειστά, εκτός αν το tenant σου ήταν στο private preview του feature. Τότε είναι ανοιχτό όταν περνά σε public preview.
- **Μόνο ένα μέρος των previews.** Η σελίδα έχει μόνο όσα public preview features μπορούν να ελεγχθούν από εδώ. Θα προστίθενται κι άλλα. Όταν ένα feature γίνει GA, σημειώνεται ως generally available και αργότερα αφαιρείται.

Η σελίδα εμφανίζεται στη σελίδα «What's new» του Defender for Endpoint για τον Νοέμβριο 2026 και αναφέρθηκε στο Microsoft Ignite στις 17 Νοεμβρίου 2026. Η άδεια δεν αναφέρεται στην πηγή.

## Τα όρια που πρέπει να ξέρεις

- **Η σελίδα εμφανίζεται μόνο αν είναι ανοιχτή η ρύθμιση Preview features** στο **Settings → Endpoints → Optional features**. Αυτή η ρύθμιση συνεχίζει να ελέγχει τα public preview features που δεν είναι ακόμα στη νέα σελίδα. Άρα, όσο η νέα σελίδα είναι σε preview, το «όλα μαζί» δεν φεύγει εντελώς.
- **Για επιλογή ανά channel χρειάζεσαι safe deployment channels.** Πρέπει πρώτα να έχεις αναθέσει συσκευές σε channels μέσω της διαχείρισης του gradual rollout.
- **Ένα feature με channels φτάνει όταν το διαθέσει η Microsoft.** Αν η Microsoft δεν το έχει ακόμα διαθέσει στο channel που διάλεξες, δεν θα το δεις εκεί.
- **Όταν η σελίδα γίνει GA**, θα είναι διαθέσιμη σε κάθε tenant, ανεξάρτητα από τη ρύθμιση Preview features.

Ένα πρώτο παράδειγμα από το Microsoft Learn: όταν ανοίξεις το **embedded offboarding**, πηγαίνεις στο **Settings → Endpoints → Offboarding**, επιλέγεις **Offboard** και παράγεις deployment tool με offboarding key. Σύμφωνα με τη σελίδα «What's new», το embedded offboarding είναι επίσης σε preview, θέλει key για να τρέξει, δέχεται ημερομηνία λήξης για το package, και τα packages φαίνονται στη σελίδα **Deployment packages**.

## Τι κάνεις τώρα

1. **Δες τι έχεις ανοιχτό σήμερα.** Στο **Settings → Endpoints → Optional features**, έλεγξε αν η ρύθμιση **Preview features** είναι ανοιχτή και ποιος την άνοιξε και γιατί.
2. **Άνοιξε τη νέα σελίδα.** Στο **Settings → Endpoints → Preview features**, κατέγραψε ποια features εμφανίζονται και σε ποια κατάσταση είναι. Πρόσεξε όσα είναι ανοιχτά επειδή ήσουν σε private preview.
3. **Στήσε safe deployment channels**, αν δεν έχεις. Βάλε σε ένα πρώιμο channel λίγες συσκευές του IT που μπορούν να ανεχτούν προβλήματα, και κράτα έξω τους domain controllers και τα κρίσιμα συστήματα.
4. **Πέρασε κάθε preview από διαχείριση αλλαγών.** Για κάθε feature που ανοίγεις: ποιος το ζήτησε, σε ποιο channel, για πόσο, και ποιο είναι το κριτήριο για να επεκταθεί ή να κλείσει.
5. **Επανέλαβε τον έλεγχο κάθε μήνα**, γιατί η σελίδα θα αποκτά νέα features.

> 📖 **Θέλεις όλη την εικόνα;** Πώς δουλεύει ο Defender for Endpoint από την αρχή: **[Microsoft Defender for Endpoint: πρακτική περιήγηση](/posts/microsoft-defender-up-close-series/microsoft-defender-for-endpoint-deep-dive/)**.

## Σύνδεση με ΚΥΑ 1689/2025, NIS2, ISO 27001 και GDPR

- **ΚΥΑ 1689/2025 [16.α](/kya-1689-2025/#16-α):** διαχείριση αλλαγών με αξιολόγηση αντικτύπου, δοκιμές και αποδοχή. Η ενεργοποίηση ενός preview σε λίγες συσκευές πρώτα είναι ακριβώς αυτό. **[17.δ](/kya-1689-2025/#17-δ):** δοκιμή των ενημερώσεων σε ελεγχόμενο περιβάλλον πριν από την παραγωγή.
- **Οδηγία NIS2 [21.2.ε](/nis2/#21-2-ε):** ασφάλεια στη συντήρηση των συστημάτων.
- **ISO/IEC 27001 [A.8.32](/iso-27001/#A-8-32):** change management. **[A.8.9](/iso-27001/#A-8-9):** configuration management, γιατί η κατάσταση των previews είναι μέρος της διαμόρφωσης του endpoint.
- **GDPR [32.1.β](/gdpr/#32-1-β):** διαθεσιμότητα και ανθεκτικότητα των συστημάτων. Ένα preview που ενεργοποιείται σε όλο το tenant χωρίς δοκιμή είναι κίνδυνος για αυτήν.

Τεκμήρια για τον ελεγκτή: λίστα των preview features που είναι ανοιχτά, με channel, ημερομηνία και αίτημα αλλαγής για το καθένα, και η αντιστοίχιση συσκευών σε safe deployment channels.

---

## Πηγές και επαλήθευση {#last-verified}

{{< verification >}}

Επιπλέον πηγές: [New features in Microsoft Defender for Endpoint: November 2026](https://learn.microsoft.com/en-us/defender-endpoint/whats-new-in-microsoft-defender-endpoint) · [Microsoft Defender XDR preview features](https://learn.microsoft.com/en-us/defender-xdr/preview) · [Ignite 2026: What's new in endpoint security](https://techcommunity.microsoft.com/blog/microsoftthreatprotectionblog/ignite-2026-what%E2%80%99s-new-in-endpoint-security/4573835) (17 Νοεμβρίου 2026). Η εικόνα δείχνει τη γενική ρύθμιση Preview features του Defender portal, γιατί η σελίδα του Microsoft Learn για τη νέα σελίδα δεν έχει εικόνα. Δεν βρέθηκε ανακοίνωση Message Center για αυτή τη λειτουργία. Το θέμα πρωτοεμφανίστηκε στο [Microsoft 365 Security: τι άλλαξε (εβδομάδα 47/2026)](/posts/weekly-security-update/microsoft-365-security-ti-allaxe-2026-w47/).

Τελευταίος έλεγχος στοιχείων: 19 Νοεμβρίου 2026.
