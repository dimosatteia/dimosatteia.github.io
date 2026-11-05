---
title: "Preview: Posture policies και exemptions του Defender for Cloud στο Defender portal"
seoTitle: "Preview: Posture policies και exemptions στο Defender"
slug: "defender-for-cloud-posture-policies-exemptions-defender-portal"
date: 2026-11-06T08:20:00+02:00
lastmod: 2026-11-06T08:20:00+02:00
draft: true
keywords:
  - Microsoft Defender for Cloud
  - posture policies Defender portal
  - MDC Baseline Policy
  - recommendation exemptions
  - Exposure Management Policies
  - Defender CSPM
  - αποδοχή κινδύνου cloud
tags:
  - Microsoft Defender for Cloud
  - Microsoft Security Exposure Management
  - Azure Security
  - Cloud Security
  - NIS2
  - ISO 27001
  - GRC
author: "Dimosthenis Atteia"
description: "Από τις 28 Οκτωβρίου 2026, σε Public Preview, ορίζεις στο Defender portal ποιοι κανόνες posture αξιολογούνται στο Azure και καταγράφεις τα ρίσκα που αποδέχεσαι ως exemptions με αιτιολογία και λήξη. Τι κάνει το MDC Baseline Policy, ποια δικαιώματα χρειάζονται και τι δεν μεταφέρεται από το Azure."
seoDescription: "Posture policies και exemptions του Defender for Cloud στο Defender portal σε Preview: baseline policy, custom policies, δικαιώματα και αποδοχή κινδύνου."
summary: "Η διαχείριση των recommendations του Defender for Cloud μπαίνει στο Defender portal: policies για το τι αξιολογείται και exemptions με υποχρεωτική λήξη για το ρίσκο που αποδέχεσαι. Χρήσιμο για όποιον θέλει τεκμηριωμένες εξαιρέσεις."
categories: ["Cloud Security"]
releases:
  - "preview"
ShowToc: true
TocOpen: false
cover:
  image: "https://learn.microsoft.com/en-us/security-exposure-management/media/manage-posture-policies-defender/security-baseline-policy.png"
  alt: "Οι λεπτομέρειες του MDC Baseline Policy στο Microsoft Defender portal, με το scope και τους κανόνες του"
  caption: "Πηγή εικόνας: Microsoft Learn"
  relative: false
# Πλαίσιο «Last verified»: κάθε χαρακτηριστικό με τη φάση, την άδεια, την πηγή και την ημερομηνία ελέγχου
verification:
  - feature: "Posture policies και recommendation exemptions στο Defender portal για Azure (από 28 Οκτωβρίου 2026)"
    status: "Public Preview"
    license: "Ενεργό επιλέξιμο Defender plan"
    source: "https://learn.microsoft.com/en-us/azure/defender-for-cloud/release-notes"
    verified: 2026-11-05
  - feature: "Posture policies: MDC Baseline Policy, custom policies, δικαιώματα, Defender CSPM αντί για Foundational CSPM"
    status: "Public Preview"
    license: "Defender CSPM για posture recommendations σε περιβάλλοντα Managed in Defender"
    source: "https://learn.microsoft.com/en-us/security-exposure-management/manage-posture-policies-defender"
    verified: 2026-11-05
  - feature: "Exemptions στο Defender portal: scope, conditions, αιτιολογία, υποχρεωτική λήξη, Azure exemptions χωρίς μεταφορά"
    status: "Public Preview"
    license: "Δεν αναφέρεται"
    source: "https://learn.microsoft.com/en-us/azure/defender-for-cloud/exempt-resource?pivots=defender-portal"
    verified: 2026-11-05
# MITRE ATT&CK®: ονόματα στο data/mitre.yaml
mitre: ["T1530", "M1047"]
---

Κάθε οργανισμός που χρησιμοποιεί το Defender for Cloud έχει recommendations που δεν θα αποκαταστήσει. Κάποιες δεν ταιριάζουν στο περιβάλλον του, κάποιες καλύπτονται από άλλο εργαλείο, κάποιες αναβάλλονται για επιχειρηματικό λόγο. Το πρόβλημα είναι συνήθως ότι αυτές οι αποφάσεις μένουν άτυπες: κάποιος τις απενεργοποίησε κάποτε, χωρίς αιτιολογία και χωρίς ημερομηνία επανεξέτασης. Στον έλεγχο, κανείς δεν θυμάται γιατί.

Με τα **posture policies** και τα **exemptions** στο Microsoft Defender portal, οι δύο αποφάσεις χωρίζονται καθαρά: τι αξιολογείται, και ποιο ρίσκο αποδέχεσαι, για πόσο και γιατί.

## Τι αλλάζει

Σύμφωνα με τις σημειώσεις έκδοσης του Defender for Cloud:

- **Φάση και ημερομηνία:** Public Preview από τις **28 Οκτωβρίου 2026**, για περιβάλλοντα **Azure**.
- **Τι φέρνει:** αξιολόγηση των Azure resources με βάση το baseline policy του Defender for Cloud, δικά σου posture policies, και κεντρική διαχείριση των exemptions με παρακολούθηση του κύκλου ζωής τους.
- **Άδεια:** τα posture policies εφαρμόζονται μόνο σε περιβάλλοντα με ενεργό επιλέξιμο Defender plan. Το Microsoft Learn σημειώνει επίσης ότι το Defender portal δεν έχει δωρεάν Foundational CSPM: για posture recommendations σε περιβάλλοντα που διαχειρίζεσαι από το Defender χρειάζεται το **Defender CSPM**, που είναι επί πληρωμή.

Και οι δύο λειτουργίες ισχύουν μόνο για περιβάλλοντα με τιμή **Managed in: Defender**. Αυτό συνδέεται με τη μεταφορά των plans στο Defender portal, που περιγράφει το [άρθρο για τα plans του Defender for Cloud](/posts/previews/defender-for-cloud-plans-defender-portal-dwu/).

## Posture policies: τι αξιολογείται

Βρίσκεις τα policies στο **Exposure Management > Policies**. Υπάρχουν δύο τύποι:

| Τύπος | Τι κάνει | Τι μπορείς να αλλάξεις |
|---|---|---|
| MDC Baseline Policy | Σύνολο κανόνων της Microsoft για τη βελτίωση του posture, που ενημερώνεται από τη Microsoft | Scope, παράμετροι κανόνων, ενεργοποίηση ή απενεργοποίηση. Δεν διαγράφεται και οι κανόνες του δεν αλλάζουν |
| Custom policy | Δικοί σου κανόνες, κατηγορίες, scope και παράμετροι | Τα πάντα, μαζί με διαγραφή |

Τέσσερα σημεία που πρέπει να ξέρεις:

- **Το MDC Baseline Policy εφαρμόζεται από προεπιλογή σε όλα τα συνδεδεμένα περιβάλλοντα**, και σε όσα θα συνδέσεις στο μέλλον.
- **Δεν υπάρχουν έτοιμα policies για πρότυπα συμμόρφωσης.** Για ISO 27001 ή άλλο πρότυπο, φτιάχνεις custom policy και φιλτράρεις τους κανόνες με βάση το πρότυπο.
- **Όταν δύο policies διαφωνούν, κερδίζει το αυστηρότερο.** Recommendation βγαίνει αν το asset αποτυγχάνει σε τουλάχιστον ένα policy.
- **Μόνο Audit.** Effects όπως το Deny δεν υποστηρίζονται στο Defender και μένουν στο Azure Policy. Ούτε custom recommendations δημιουργούνται ακόμη στο Defender.

## Exemptions: ποιο ρίσκο αποδέχεσαι

Βρίσκεις τα exemptions στο **Exposure Management > Policies > Exemption**. Το Microsoft Learn ξεχωρίζει καθαρά πότε αφαιρείς έναν κανόνα από ένα policy (ο κανόνας δεν αφορά ποτέ αυτό το scope) και πότε φτιάχνεις exemption (το εύρημα είναι σωστό, αλλά η αποκατάσταση αναβάλλεται ή το ρίσκο γίνεται αποδεκτό).

Κάθε exemption έχει:

- **Scope:** περιβάλλοντα ή assets. Μόνο Global Administrator και Security Administrator μπορούν να το εφαρμόσουν σε όλα τα συνδεδεμένα περιβάλλοντα.
- **Conditions:** συγκεκριμένα recommendations, κατηγορίες ή κριτήρια κινδύνου. Οι δυναμικές συνθήκες, όπως «όλα τα recommendations με Low risk», εφαρμόζονται αυτόματα και σε μελλοντικά ευρήματα. Πρόσεξέ τες.
- **Αιτιολογία και διάρκεια:** αιτιολογία, τεκμήρια και ημερομηνία λήξης, που είναι υποχρεωτική στο Defender portal.

Το εύρημα δεν χάνεται. Εμφανίζεται ως **Exempted**, βγαίνει από τον υπολογισμό του score όσο ισχύει το exemption, και μένει στα attack paths με την ένδειξη Exempted. Όταν το exemption λήξει ή διαγραφεί, το εύρημα ξαναγίνεται Active.

Κάτι που θα σε αφορά στη μετάβαση: τα exemptions που έφτιαξες στο Azure συνεχίζουν να ισχύουν, αλλά **δεν μεταφέρονται** στο Defender portal και δεν φαίνονται εκεί ως διαχειρίσιμοι κανόνες. Αφού ένα περιβάλλον περάσει σε Managed in Defender, τα νέα exemptions για αυτό φτιάχνονται μόνο στο Defender.

## Τι κάνεις τώρα

1. **Δες ποια περιβάλλοντα είναι Managed in Defender.** Στο Microsoft Defender portal, άνοιξε τη σελίδα **Environment management** των cloud environments, ή δες το πεδίο **Managed in** σε ένα recommendation.
2. **Έλεγξε το MDC Baseline Policy.** Στο **Exposure Management > Policies**, άνοιξε το policy και δες το scope του. Αν κάποιο περιβάλλον δεν πρέπει να αξιολογείται με αυτό, περιόρισε το assignment αντί να απενεργοποιήσεις το policy.
3. **Φτιάξε custom policy για το πρότυπο που ακολουθείς**, αν χρειάζεσαι αντιστοίχιση με ISO 27001: **Create policy**, scope, και φίλτρο κανόνων με το πρότυπο.
4. **Μοίρασε τα δικαιώματα.** Στο **System > Permissions > Microsoft Defender XDR > Roles**, δώσε **Core security settings (Manage)** μόνο σε όσους διαχειρίζονται policies και **Exposure Management (Manage)** μόνο σε όσους εγκρίνουν exemptions. Οι υπόλοιποι αρκούνται στο Read.
5. **Ορίσε κανόνα για τα exemptions:** ποιος εγκρίνει, ποια αιτιολογία απαιτείται, και μέγιστη διάρκεια. Απόφυγε δυναμικές συνθήκες χωρίς ρητή έγκριση.
6. **Κατέγραψε τα υπάρχοντα exemptions του Azure** σε ένα σημείο, αφού δεν θα τα δεις στο Defender portal, και σχεδίασε την επανεξέτασή τους.
7. **Έλεγξε την άδεια.** Αν βασιζόσουν στο δωρεάν Foundational CSPM, χωρίς Defender CSPM δεν θα έχεις posture recommendations στα περιβάλλοντα που περνούν στο Defender.

> 📖 **Θέλεις όλη την εικόνα;** Plans, CSPM, recommendations και προστασία workloads στο Azure: **[Microsoft Defender for Cloud: Μια πρακτική περιήγηση στο CNAPP της Microsoft](/posts/microsoft-defender-up-close-series/microsoft-defender-for-cloud-deep-dive/)**.

## Σύνδεση με ΚΥΑ 1689/2025, NIS2, ISO 27001 και GDPR

- **ΚΥΑ 1689/2025 [5.1.γ](/kya-1689-2025/#5-1-γ):** πλάνο αντιμετώπισης κινδύνων. Τα exemptions καταγράφουν την αποδοχή κινδύνου με αιτιολογία και λήξη. **[17.στ](/kya-1689-2025/#17-στ):** τεκμηρίωση όσων δεν αποκαθίστανται. **[13.γ](/kya-1689-2025/#13-γ):** διαχωρισμός ρόλων ανάμεσα σε όσους ορίζουν policies και όσους εγκρίνουν exemptions.
- **Οδηγία NIS2 [21.2.α](/nis2/#21-2-α) και [21.2.στ](/nis2/#21-2-στ):** πολιτικές ανάλυσης κινδύνου και αξιολόγηση της αποτελεσματικότητας των μέτρων.
- **ISO/IEC 27001 [A.5.23](/iso-27001/#A-5-23), [A.8.9](/iso-27001/#A-8-9) και [A.5.36](/iso-27001/#A-5-36):** ασφάλεια στη χρήση cloud, configuration management, και συμμόρφωση με πολιτικές και πρότυπα.
- **GDPR [32.1.δ](/gdpr/#32-1-δ):** τακτική αξιολόγηση της αποτελεσματικότητας των τεχνικών μέτρων στα συστήματα που φιλοξενούν προσωπικά δεδομένα.

Τεκμήρια για τον ελεγκτή: η λίστα των posture policies με το scope τους, η λίστα των exemptions με αιτιολογία, εγκρίνοντα και ημερομηνία λήξης, οι ρόλοι με δικαίωμα Manage, και η καταγραφή των παλαιών exemptions του Azure.

---

## Πηγές και επαλήθευση {#last-verified}

{{< verification >}}

Επιπλέον πηγές: [What's new in Microsoft Defender for Cloud](https://learn.microsoft.com/en-us/azure/defender-for-cloud/release-notes) · [Manage posture policies](https://learn.microsoft.com/en-us/security-exposure-management/manage-posture-policies-defender) · [Exempt resources from recommendations (Defender portal)](https://learn.microsoft.com/en-us/azure/defender-for-cloud/exempt-resource?pivots=defender-portal) · [Microsoft Defender unified role-based access control (RBAC)](https://learn.microsoft.com/en-us/defender-xdr/manage-rbac). Για τη λειτουργία δεν βρέθηκε ανακοίνωση στο Message Center. Τα στοιχεία προέρχονται από το Microsoft Learn.

Το θέμα πρωτοεμφανίστηκε στο [Microsoft 365 Security: τι άλλαξε (εβδομάδα 45/2026)](/posts/weekly-security-update/microsoft-365-security-ti-allaxe-2026-w45/).

Τελευταίος έλεγχος στοιχείων: 5 Νοεμβρίου 2026.
