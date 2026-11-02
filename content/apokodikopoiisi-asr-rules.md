---
title: "Αποκωδικοποιητής ASR rules: ποιοι κανόνες του Microsoft Defender προστατεύουν τη συσκευή σου"
date: 2026-11-02T20:56:00+02:00
lastmod: 2026-11-02T20:55:00+02:00
draft: false
url: "/apokodikopoiisi-asr-rules/"
slug: apokodikopoiisi-asr-rules
# Το link στο μενού ορίζεται εδώ, ώστε να εμφανίζεται μόνο όταν η σελίδα είναι δημοσιευμένη.
menu:
  main:
    identifier: tool-asr
    parent: tools
    name: "🧱 Αποκωδικοποιητής ASR rules"
    weight: 16
author: "Dimosthenis Atteia"
description: "Δωρεάν εργαλείο: επικόλλησε την έξοδο του Get-MpPreference και δες κάθε κανόνα Attack Surface Reduction του Microsoft Defender με όνομα αντί για GUID, αν είναι σε Block, Audit, Warn ή Off, τι κάνει, με ποια σειρά τον ενεργοποιείς, και KQL για τα συμβάντα. Όλα στον browser σου."
seoTitle: "Αποκωδικοποιητής ASR rules του Microsoft Defender (Ελληνικά)"
seoDescription: "Επικόλλησε την έξοδο του Get-MpPreference και δες κάθε κανόνα ASR με όνομα, κατάσταση, τι κάνει και με ποια σειρά τον βάζεις σε Block. Όλα στον browser σου."
toolBlurb: "Επικόλλησε την έξοδο του Get-MpPreference και δες κάθε κανόνα ASR του Microsoft Defender με όνομα αντί για GUID, αν είναι σε Block, Audit, Warn ή Off, τι κάνει, με ποια σειρά τον ενεργοποιείς, και KQL για τα συμβάντα του Audit."
keywords:
  - ASR rules
  - attack surface reduction rules
  - Get-MpPreference ASR
  - ASR rules GUID
  - ASR audit mode
  - Microsoft Defender for Endpoint ASR
  - κανόνες ASR
showToc: true
ShowReadingTime: false
ShowBreadCrumbs: false
hideMeta: true
# Στα «Πρόσφατα Άρθρα» της αρχικής, με βάση την ημερομηνία του
homeFeed: true
weight: -6
cover:
  image: "/images/tools/apokodikopoiisi-asr-rules.webp"
  alt: "Η έξοδος του Get-MpPreference με GUID και τιμές, και δίπλα οι κανόνες ASR με όνομα και κατάσταση Block, Audit ή Off"
  maxWidth: 800
categories: ["Endpoint & Device"]
tags:
  - Microsoft Defender for Endpoint
  - Attack Surface Reduction
  - Microsoft Intune
  - Advanced Hunting
  - Endpoint Security
  - ΚΥΑ 1689/2025
  - NIS2
  - ISO 27001
  - GDPR
# MITRE ATT&CK®: ονόματα στο data/mitre.yaml
mitre: ["T1204.002", "M1040"]
# Πλαίσιο «Last verified»
verification:
  - feature: "Κανόνες Attack Surface Reduction: GUID, ονόματα στο Intune, action types του Advanced hunting"
    status: "Generally Available"
    license: "Οι κανόνες υπάρχουν σε κάθε έκδοση των Windows με Microsoft Defender Antivirus. Κεντρική διαχείριση, αναφορές και alerts: Microsoft Defender for Endpoint Plan 1 ή Plan 2, Microsoft Defender for Business ή Microsoft 365 Business Premium"
    source: "https://learn.microsoft.com/en-us/defender-endpoint/attack-surface-reduction-rules-reference"
    verified: 2026-11-02
  - feature: "Τιμές κατάστασης: 0 Off, 1 Block, 2 Audit, 5 Not configured, 6 Warn"
    status: "Generally Available"
    license: "Όλες οι εκδόσεις"
    source: "https://learn.microsoft.com/en-us/defender-endpoint/attack-surface-reduction-rules-configure"
    verified: 2026-11-02
  - feature: "Εντολή PowerShell που δείχνει τους κανόνες και την κατάστασή τους, και Event ID 1121, 1122, 1129"
    status: "Generally Available"
    license: "Όλες οι εκδόσεις"
    source: "https://learn.microsoft.com/en-us/defender-endpoint/troubleshoot-asr"
    verified: 2026-11-02
---

Τρέχεις `Get-MpPreference` και βλέπεις μια σειρά από GUID και αριθμούς. Ποιος κανόνας είναι ο `d4f940ab-…`; Το `2` σημαίνει ότι προστατεύει ή όχι; Επικόλλησε εδώ την έξοδο και δες κάθε κανόνα με το όνομά του, την κατάστασή του, τι κάνει, και τι κάνεις εσύ τώρα.

Δεν χρειάζεται εγγραφή, ούτε πρόσβαση στο tenant σου. Αν θέλεις πρώτα να δεις πώς δουλεύει, πάτησε «Δοκίμασε με παράδειγμα».

{{< asr-check >}}

## Πώς δουλεύει

Οι κανόνες Attack Surface Reduction (ASR) του Microsoft Defender σταματούν συμπεριφορές που χρησιμοποιεί το malware: ένα macro του Word που ανοίγει PowerShell, ένα script που κατεβάζει πρόγραμμα, μια απόπειρα να διαβαστεί η μνήμη του LSASS. Κάθε κανόνας έχει ένα GUID και μία από πέντε καταστάσεις: `1` Block, `2` Audit, `6` Warn, `0` Off και `5` Not configured.

Το εργαλείο διαβάζει τρεις μορφές:

- την έξοδο της εντολής του βήματος 1, που δείχνει κάθε κανόνα σε μια γραμμή,
- την έξοδο του σκέτου `Get-MpPreference`, μαζί με τις εξαιρέσεις,
- την έξοδο του `reg query` για τους κανόνες του Group Policy, ή την τιμή OMA-URI του Intune, π.χ. `GUID=1|GUID=2`.

Για κάθε κανόνα βλέπεις το όνομα στα Ελληνικά και στο Intune, την κατάσταση, τι προστατεύει, και τι κάνεις. Οι κανόνες είναι χωρισμένοι σε τρεις φάσεις ενεργοποίησης, και το «Τι κάνεις τώρα» σου λέει το επόμενο βήμα, με το απλούστερο πρώτο.

## Η σειρά ενεργοποίησης

**Φάση 1: Block αμέσως.** Τρεις κανόνες η Microsoft τους ονομάζει standard protection rules: τους ευάλωτους υπογεγραμμένους drivers, την κλοπή διαπιστευτηρίων από το LSASS και τη μόνιμη παρουσία μέσω WMI. Σπάνια σπάνε κάτι, οπότε τους βάζεις σε Block σχεδόν παντού.

**Φάση 2: σύντομο Audit, μετά Block.** Οι κανόνες για email, scripts, macros, Adobe Reader, Outlook, USB και Safe Mode. Τους αφήνεις μία με δύο εβδομάδες σε Audit, βλέπεις τι θα μπλόκαραν, και τους περνάς σε Block.

**Φάση 3: μεγαλύτερο Audit και εξαιρέσεις.** Οι κανόνες που συχνά χτυπούν νόμιμα προγράμματα: όλες οι εφαρμογές του Office που ανοίγουν άλλες διεργασίες, τα άγνωστα εκτελέσιμα, το PsExec και το WMI, και η προηγμένη προστασία από ransomware. Εδώ θέλεις δύο με τέσσερις εβδομάδες Audit και εξαιρέσεις όπου χρειάζεται.

Ο χωρισμός σε φάσεις είναι πρόταση του thecybersec.gr, με βάση την τεκμηρίωση της Microsoft. Αν έχεις λίγες συσκευές ή πολύ τυποποιημένο περιβάλλον, μπορείς να προχωρήσεις πιο γρήγορα.

## Audit δεν σημαίνει προστασία

Το πιο συνηθισμένο εύρημα σε έλεγχο είναι κανόνες που μπήκαν σε Audit για δοκιμή και ξεχάστηκαν εκεί. Σε Audit ο κανόνας μόνο καταγράφει. Το εργαλείο μετρά ως προστασία μόνο το Block και το Warn, και για τους κανόνες σε Audit σου δίνει έτοιμο KQL που δείχνει τι θα μπλόκαραν, με το πρόγραμμα, τον φάκελο και τη διεργασία που το ξεκίνησε. Από εκεί βγαίνουν οι εξαιρέσεις.

Πρόσεξε και τις εξαιρέσεις για όλους τους κανόνες. Μια εξαίρεση σαν `C:\Users\*\Downloads` ανοίγει ακριβώς τον φάκελο όπου γράφει το malware. Το εργαλείο σημειώνει τέτοιες ευρείες εξαιρέσεις.

## Τι δεν μπορεί να σου πει

- **Από πού ήρθε κάθε ρύθμιση.** Η έξοδος δείχνει τι ισχύει, όχι αν το έβαλε το Intune, το Group Policy ή ένα script. Αυτό το βλέπεις στο Microsoft Defender portal, στη συσκευή, στην καρτέλα Effective settings.
- **Τι ισχύει στις άλλες συσκευές.** Η εντολή τρέχει σε μία συσκευή. Για όλο τον οργανισμό, δες την αναφορά των κανόνων ASR στο Defender portal ή το πρώτο KQL του εργαλείου.
- **Αν ένα συμβάν είναι επίθεση ή νόμιμο πρόγραμμα.** Αυτό το κρίνεις εσύ από τα συμβάντα του Audit.

## Γιατί έχει σημασία για τη συμμόρφωση

Η ΚΥΑ 1689/2025 ζητά τεχνολογίες ανίχνευσης και εξουδετέρωσης κακόβουλου λογισμικού σε σταθμούς εργασίας και διακομιστές ([απαίτηση 20.α](/kya-1689-2025/#20-α)), επιβολή ρυθμίσεων σε υλικό και λογισμικό ([14.α](/kya-1689-2025/#14-α)) και ασφαλή διαχείριση των αφαιρούμενων μέσων ([11.δ](/kya-1689-2025/#11-δ)). Η Οδηγία NIS2 ζητά ασφάλεια στη συντήρηση των συστημάτων ([21.2.ε](/nis2/#21-2-ε)) και βασικές πρακτικές κυβερνοϋγιεινής ([21.2.ζ](/nis2/#21-2-ζ)). Στο ISO/IEC 27001 αφορά την προστασία από κακόβουλο λογισμικό ([A.8.7](/iso-27001/#A-8-7)), τη διαχείριση των ρυθμίσεων ([A.8.9](/iso-27001/#A-8-9)) και τα μέσα αποθήκευσης ([A.7.10](/iso-27001/#A-7-10)). Στον GDPR, το απόρρητο και την ακεραιότητα των συστημάτων ([32.1.β](/gdpr/#32-1-β)).

Η «Αντιγραφή σύνοψης για το ticket» δίνει τη λίστα των κανόνων με την κατάστασή τους. Μαζί με την αναφορά του Defender portal, είναι το τεκμήριο που ζητά ο ελεγκτής για την προστασία των σταθμών εργασίας.

> 🛠️ **Μια ευπάθεια αξιοποιείται ήδη;** [Δες τον κατάλογο CISA KEV για Microsoft](/kev-microsoft/) με έτοιμο KQL για το Microsoft Defender.

> 🛠️ **Θες τα queries ανά απαίτηση;** [Δες τη βιβλιοθήκη KQL](/kql/) για το Defender XDR, αντιστοιχισμένη σε ΚΥΑ 1689/2025, NIS2 και ISO 27001.

## Απόρρητο

Το thecybersec.gr δεν έχει server που να δέχεται ό,τι επικολλάς. Η ανάλυση γίνεται εξ ολοκλήρου μέσα στον browser σου, και το κείμενο δεν αποθηκεύεται, ούτε στο localStorage. Αν έχεις αποδεχτεί τα cookies ανάλυσης, το πλαίσιο κειμένου και τα αποτελέσματα αποκρύπτονται από την καταγραφή του Microsoft Clarity. Περισσότερα στην [πολιτική απορρήτου](/privacy/).

Η ερμηνεία είναι ενδεικτική και δεν αντικαθιστά τη δοκιμή στο δικό σου περιβάλλον. Το thecybersec.gr είναι προσωπικό blog και δεν εκπροσωπεί τη Microsoft ή την Εθνική Αρχή Κυβερνοασφάλειας.

## Πηγές και επαλήθευση {#last-verified}

{{< verification >}}
