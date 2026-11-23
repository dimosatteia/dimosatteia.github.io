---
title: "Ο CISO σε μία σελίδα: η εικόνα του Microsoft 365 για τη Διοίκηση"
date: 2026-11-15T15:00:00+02:00
lastmod: 2026-11-15T15:00:00+02:00
draft: true
url: "/ciso-se-mia-selida/"
slug: ciso-se-mia-selida
# Το link στο μενού ορίζεται εδώ, ώστε να εμφανίζεται μόνο όταν η σελίδα είναι δημοσιευμένη.
menu:
  main:
    identifier: tool-ciso-one-page
    parent: tools
    name: "📊 Ο CISO σε μία σελίδα"
    weight: 19
author: "Dimosthenis Atteia"
description: "Microsoft 365 Security Management Reporting: ανέβασε τα exports από Secure Score, Entra ID, Intune και Defender XDR και πάρε μία σελίδα για τη Διοίκηση, με Security Posture Indicator, Evidence coverage, Priority actions και σχετικές αναφορές ελέγχων σε ΚΥΑ 1689/2025, NIS2, ISO 27001 και GDPR."
seoTitle: "Ο CISO σε μία σελίδα: αναφορά Microsoft 365 για τη Διοίκηση"
seoDescription: "Ανέβασε τα exports του Microsoft 365 (Secure Score, Entra ID, Intune, Defender XDR) και πάρε μία σελίδα για το Δ.Σ. με αντιστοίχιση σε ΚΥΑ 1689/2025, NIS2 και ISO 27001."
toolBlurb: "ανέβασε τα exports από Secure Score, Entra ID, Intune, Defender XDR και άλλες 10 πηγές και πάρε μία σελίδα για τη Διοίκηση: Microsoft 365 Security Posture Indicator, Evidence coverage, Priority actions με υπεύθυνο και προθεσμία, τάση στον χρόνο και σχετικές αναφορές ελέγχων σε ΚΥΑ 1689/2025, NIS2, ISO/IEC 27001 και GDPR, σε .pdf και .xlsx. Τα αρχεία δεν φεύγουν από τον browser."
keywords:
  - αναφορά κυβερνοασφάλειας για Διοίκηση
  - CISO board report Microsoft 365
  - αναφορά προς το Δ.Σ. ΚΥΑ 1689/2025
  - Microsoft Secure Score αναφορά
  - Defender XDR αναφορά
  - security posture Microsoft 365
  - ΥΑΣΠΕ αναφορά ανώτατο όργανο διοίκησης
showToc: false
ShowReadingTime: false
ShowBreadCrumbs: false
hideMeta: true
# Στα «Πρόσφατα Άρθρα» της αρχικής, με βάση την ημερομηνία του
homeFeed: true
weight: -6
cover:
  image: "/images/tools/ciso-se-mia-selida.webp"
  alt: "Πέντε exports από το Microsoft 365 καταλήγουν σε μία σελίδα για τη Διοίκηση, με συνολικό δείκτη, διάγραμμα αράχνης ανά ενότητα και στόχο"
  maxWidth: 920
categories: ["GRC & Compliance"]
tags:
  - Microsoft Secure Score
  - Microsoft Defender XDR
  - Microsoft Entra ID
  - Microsoft Intune
  - Defender Vulnerability Management
  - Board Reporting
  - ΚΥΑ 1689/2025
  - NIS2
  - ISO 27001
  - GDPR
# Πλαίσιο «Last verified»
verification:
  - feature: "Λήψη του User registration details (MFA Capable, SSPR, Methods registered) από το Microsoft Entra admin center"
    status: "Generally Available"
    license: "Microsoft Entra ID P1 ή P2"
    source: "https://learn.microsoft.com/en-us/entra/identity/authentication/howto-authentication-methods-activity"
    verified: 2026-11-15
  - feature: "Export του device inventory του Microsoft Defender for Endpoint σε CSV, με Onboarding status και Sensor health state"
    status: "Generally Available"
    license: "Microsoft Defender for Endpoint ή Defender for Business"
    source: "https://learn.microsoft.com/en-us/defender-endpoint/machines-view-overview"
    verified: 2026-11-15
  - feature: "Export της ουράς περιστατικών του Microsoft Defender XDR σε CSV, έως 10.000 εγγραφές"
    status: "Generally Available"
    license: "Microsoft Defender XDR"
    source: "https://learn.microsoft.com/en-us/defender-xdr/incident-queue"
    verified: 2026-11-15
  - feature: "Download assignments: λήψη όλων των ενεργών αναθέσεων ρόλων του Microsoft Entra ID σε CSV"
    status: "Generally Available"
    license: "Όλες οι εκδόσεις του Microsoft Entra ID"
    source: "https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/view-assignments"
    verified: 2026-11-15
  - feature: "Λήψη των αναφορών του ID Protection (Risky users) σε CSV ή JSON"
    status: "Generally Available"
    license: "Microsoft Entra ID P2 για πλήρεις λεπτομέρειες"
    source: "https://learn.microsoft.com/en-us/entra/id-protection/concept-risk-reports"
    verified: 2026-11-15
  - feature: "Λήψη των sign-in logs σε CSV ή JSON, έως 100.000 εγγραφές ανά αρχείο"
    status: "Generally Available"
    license: "Όλες οι εκδόσεις του Microsoft Entra ID"
    source: "https://learn.microsoft.com/en-us/entra/identity/monitoring-health/howto-download-logs"
    verified: 2026-11-15
  - feature: "Export του Encryption report του Intune σε CSV"
    status: "Generally Available"
    license: "Microsoft Intune Plan 1"
    source: "https://learn.microsoft.com/en-us/intune/device-configuration/endpoint-security/monitor-encryption"
    verified: 2026-11-15
  - feature: "Download CSV report των recommendations του Microsoft Defender for Cloud, έως 25.000 γραμμές"
    status: "Generally Available"
    license: "Microsoft Defender for Cloud"
    source: "https://learn.microsoft.com/en-us/azure/defender-for-cloud/export-alerts-to-csv"
    verified: 2026-11-15
  - feature: "Download users από το Microsoft Entra admin center, με επιλογή στηλών όπως Last interactive sign-in date (Preview)"
    status: "Preview"
    license: "Όλες οι εκδόσεις του Microsoft Entra ID"
    source: "https://learn.microsoft.com/en-us/entra/identity/users/users-bulk-download"
    verified: 2026-11-15
---


<div class="not-prose my-6">
<p class="text-[11px] font-mono uppercase tracking-wider text-blue-400 mb-2">Microsoft 365 Security Management Reporting</p>
<p class="text-xl font-semibold text-slate-100 leading-snug mb-4">Μετέτρεψε την telemetry ασφάλειας του Microsoft 365 σε αποφάσεις της Διοίκησης και τεκμήρια για τον ελεγκτή.</p>
<div class="grid gap-2 sm:grid-cols-2 lg:grid-cols-4 items-stretch">
<div class="rounded-lg border border-slate-700 bg-slate-900/60 p-3"><p class="text-[10px] font-mono uppercase tracking-wider text-slate-500 m-0">1 · Microsoft telemetry</p><p class="text-sm text-slate-200 mt-1 mb-0">Τα exports που ήδη κατεβάζεις από Entra ID, Intune, Defender XDR και Secure Score.</p></div>
<div class="rounded-lg border border-slate-700 bg-slate-900/60 p-3"><p class="text-[10px] font-mono uppercase tracking-wider text-slate-500 m-0">2 → Security posture</p><p class="text-sm text-slate-200 mt-1 mb-0">Posture, Evidence coverage, Target και μεταβολή από την προηγούμενη φορά.</p></div>
<div class="rounded-lg border border-slate-700 bg-slate-900/60 p-3"><p class="text-[10px] font-mono uppercase tracking-wider text-slate-500 m-0">3 → Management decision</p><p class="text-sm text-slate-200 mt-1 mb-0">Priority actions με υπεύθυνο και προθεσμία.</p></div>
<div class="rounded-lg border border-slate-700 bg-slate-900/60 p-3"><p class="text-[10px] font-mono uppercase tracking-wider text-slate-500 m-0">4 → Compliance evidence</p><p class="text-sm text-slate-200 mt-1 mb-0">Σχετικές αναφορές ελέγχων, κατάσταση και τεκμήριο, σε .pdf και .xlsx.</p></div>
</div>
<p class="text-sm text-slate-400 mt-4 mb-0">Αν θέλεις πρώτα να δεις πώς δουλεύει, πάτησε «Δοκίμασε με παράδειγμα» στο εργαλείο.</p>
</div>

{{< ciso-one-page >}}

<details class="my-4 rounded-lg border border-slate-700 bg-slate-900/40 px-4 py-3">
<summary class="cursor-pointer text-lg font-semibold text-slate-100">Πώς δουλεύει</summary>

Η μεθοδολογία του εργαλείου: τι μετρά, πώς συνδυάζει τις ενότητες, πώς βγάζει προτεραιότητες και πώς κρατά την τάση.

### Γιατί δεν είναι άλλο ένα dashboard

Το SIEM δείχνει στον αναλυτή τι συμβαίνει τώρα, για να αντιδράσει. Αυτό το εργαλείο είναι ένα translation layer, που μεταφράζει την ίδια πληροφορία σε τέσσερα βήματα:

**Microsoft telemetry → security posture → management decision → compliance evidence**

Ξεκινάς από τα δεδομένα που ήδη παράγουν οι κονσόλες της Microsoft. Τα συνοψίζεις σε μια εικόνα της στάσης ασφάλειας. Η εικόνα γίνεται απόφαση της Διοίκησης, με υπεύθυνο και προθεσμία, και η απόφαση γίνεται τεκμήριο για τον ελεγκτή.

Γι' αυτό δεν ανταγωνίζεται τα εργαλεία της Microsoft, αλλά κάθεται πάνω τους. Το Microsoft Secure Score μετρά ρυθμίσεις. Τα dashboards του Defender και τα workbooks του Sentinel δείχνουν ανιχνεύσεις και logs στην ομάδα ασφάλειας. Το Purview Compliance Manager παρακολουθεί controls και ενέργειες συμμόρφωσης. Κανένα από αυτά δεν απαντά στη Διοίκηση με μία σελίδα: πού είμαστε, πόσο απέχουμε από τον στόχο, τι αλλάξαμε από την προηγούμενη φορά και ποιος κάνει τι μέχρι πότε.

### Τι σου δίνει

- **Το Microsoft 365 Security Posture Indicator**, έναν δείκτη από 0 έως 100, με μία πρόταση που λέει στη Διοίκηση πού βρίσκεται και ποια ενότητα χρειάζεται απόφαση.
- **Τρία ξεχωριστά μεγέθη, δίπλα δίπλα: Posture, Evidence coverage και Target**, μαζί με το Assessment coverage confidence (High, Medium ή Low).
- **Απόσταση από τον στόχο με μία ματιά**: «Below management target · 68 / 100 · Target 85 · Gap −17» και η ενότητα με την υψηλότερη προτεραιότητα, π.χ. «Ευπάθειες (45/100)».
- **Μεταβολή από την προηγούμενη αξιολόγηση**, συνολικά («🟢 +4 since previous assessment») και ανά ενότητα («Ταυτότητες ↑ +6», «Ευπάθειες ↓ −8»). Η Διοίκηση βλέπει πού βελτιωθήκατε και πού χειροτερέψατε.
- **Priority actions**: τα 3 πρώτα που διορθώνεις, με προτεραιότητα P1 έως P3, το γιατί τώρα, υπεύθυνο και προθεσμία. Έτσι η αναφορά περνά από την εικόνα στην απόφαση και στη λογοδοσία.
- **Τάση στον χρόνο**, όπως 58 → 61 → 62 → 64 → 68, γιατί η Διοίκηση θέλει να ξέρει αν πηγαίνεις προς τη σωστή κατεύθυνση.
- **Πέντε βασικές ενότητες με φανάρι και διάγραμμα αράχνης με στόχο.** Κάθε προαιρετική πηγή προσθέτει τη δική της ενότητα.
- **Σχετικές αναφορές ελέγχων** για κάθε εύρημα, στην ΚΥΑ 1689/2025, στην Οδηγία NIS2, στο ISO/IEC 27001 και στον GDPR, με δύο ξεχωριστές ενδείξεις: την κατάσταση του ελέγχου και το πόσο ισχυρό είναι το τεκμήριο.
- **Αναφορά .pdf** για τη Διοίκηση και **.xlsx** για την τεχνική ομάδα.
- **Ημερομηνία κάθε export.** Κάθε πηγή δείχνει πότε κατέβηκε το αρχείο της. Αν είναι παλαιότερο από 7 ημέρες, το εργαλείο σε προειδοποιεί, γιατί ο ελεγκτής θα ρωτήσει πρώτα πότε βγήκαν τα δεδομένα.
- **Αποθήκευση της αξιολόγησης σε .json.** Το αρχείο μπαίνει στον φάκελο του ISMS. Την επόμενη φορά το φορτώνεις και βλέπεις τι έγινε με κάθε ενέργεια της προηγούμενης φοράς: βελτιώθηκε, χειροτέρεψε ή έμεινε ίδια.
- **Σύνοψη για τα πρακτικά** σε ένα κλικ: λίγες προτάσεις έτοιμες για τα πρακτικά του Δ.Σ. ή για email, με δείκτη, στόχο, μεταβολή, ενέργειες, υπεύθυνους και προθεσμίες.

### Τι δεν είναι ο δείκτης

Κάτω από τον δείκτη, στη σελίδα και στην αναφορά .pdf, γράφει πάντα:

> *Προσαρμοσμένος δείκτης υποστήριξης αποφάσεων, βασισμένος στα δεδομένα ασφάλειας (telemetry) του Microsoft 365 που ανέβασες. Δεν είναι το Microsoft Secure Score, ούτε βαθμός συμμόρφωσης, αξιολόγηση ωριμότητας ή αποτέλεσμα πιστοποίησης.*

Οι κανόνες και τα βάρη με τα οποία βγαίνει ο δείκτης είναι ευρετικοί κανόνες (heuristics) του thecybersec.gr. Δεν προέρχονται από τη Microsoft, την ΕΑΚ ή κάποιον οργανισμό τυποποίησης. Τους βλέπεις όλους στο «Πώς βγαίνει κάθε βαθμός;» του εργαλείου, για να μπορείς να τους ελέγξεις και να τους εξηγήσεις.

Γι' αυτό ο πίνακας ευρημάτων δεν δείχνει αριθμό δίπλα στις απαιτήσεις. Η telemetry μπορεί να τεκμηριώσει ότι κάτι έχει υλοποιηθεί, όχι ότι ο οργανισμός συμμορφώνεται νομικά. Για κάθε εύρημα ο πίνακας απαντά σε δύο διαφορετικές ερωτήσεις.

**Κατάσταση ελέγχου: πόσο καλά είναι τα πράγματα;**

- 🟢 **At/above target**: η πηγή είναι στον στόχο ή πάνω από αυτόν.
- 🟡 **Below target**: η πηγή είναι από 60 έως κάτω από τον στόχο.
- 🔴 **Material gap**: η πηγή είναι κάτω από 60.
- ⚪ **Not assessed**: δεν ανέβηκε πηγή.

**Τεκμήριο: πόσο κατάλληλο είναι το export για να το αποδείξει;**

- 🟢 **Direct technical evidence**: το export καταγράφει κάθε χρήστη, συσκευή ή εύρημα ξεχωριστά, όπως το Encryption report του Intune ή το User registration details του Entra ID.
- 🟡 **Supporting evidence**: το export είναι σύνοψη, σύσταση ή δείγμα δραστηριότητας, όπως το Secure Score, το Cloud Discovery ή το Activity explorer.
- ⚪ **No evidence**: δεν ανέβηκε πηγή.

Τα δύο είναι ανεξάρτητα. Αν μόνο το 30% των συσκευών είναι κρυπτογραφημένο, η κατάσταση είναι κακή. Το Encryption report όμως είναι ισχυρό τεκμήριο, γιατί δείχνει ακριβώς ποιες συσκευές είναι κρυπτογραφημένες και ποιες όχι. Μια χαμηλή κατάσταση δεν σημαίνει αδύναμο τεκμήριο.

### Posture, Evidence coverage, Target και Assessment coverage confidence

Μια ενότητα χωρίς πηγή δεν μετράει ως 0, και αυτό είναι σωστό. Δημιουργεί όμως ένα μαθηματικό παράδοξο. Ο οργανισμός Α ανεβάζει μόνο δύο πηγές, με Ταυτότητες 90 και Συσκευές 90, και ο δείκτης του βγαίνει 90. Ο οργανισμός Β ανεβάζει πέντε, με Ταυτότητες 90, Συσκευές 90, Ευπάθειες 40, Περιστατικά 50 και Email 60, και ο δείκτης του βγαίνει 66 με Simple ή 68 με Risk-weighted. Ο Α φαίνεται πολύ καλύτερος, ενώ απλώς έδειξε λιγότερα.

Γι' αυτό το εργαλείο δείχνει τρία διαφορετικά μεγέθη, που δεν ανακατεύονται μεταξύ τους:

- **Posture**: πόσο καλή είναι η εικόνα που φαίνεται, από 0 έως 100.
- **Evidence coverage**: πόσο πλήρης είναι η εικόνα, δηλαδή πόσες από τις 14 πηγές ανέβηκαν. Για παράδειγμα, 79% σημαίνει 11 από 14.
- **Target**: πού θέλει να βρίσκεται η Διοίκηση.

Από το Evidence coverage βγαίνει το **Assessment coverage confidence**, που η σελίδα το γράφει έτσι: «High · 5/5 core areas · 79% evidence coverage». Είναι **High** όταν και οι πέντε βασικές ενότητες έχουν πηγή και το coverage είναι 70% ή περισσότερο. Είναι **Medium** όταν τουλάχιστον τρεις βασικές ενότητες έχουν πηγή και το coverage είναι 40% ή περισσότερο. Σε κάθε άλλη περίπτωση είναι **Low**. Ο οργανισμός Α του παραδείγματος παίρνει Posture 90 αλλά coverage confidence Low, και η αναφορά .pdf το γράφει δίπλα στο νούμερο. Δεν λέει πόσο σίγουροι είμαστε ότι το 68 είναι ακριβές. Λέει μόνο πόσες περιοχές καλύπτουν τα στοιχεία που ανέβηκαν.

### Simple ή Risk-weighted: πώς συνδυάζονται οι ενότητες

Ο απλός μέσος όρος θεωρεί ισοδύναμες ενότητες με πολύ διαφορετικό κίνδυνο. Αν οι Ταυτότητες είναι στο 40 και η Κρυπτογράφηση στο 98, ο μέσος όρος βγαίνει 69 και η εικόνα μοιάζει μέτρια. Στην πράξη όμως, ένας παραβιασμένος λογαριασμός διαχειριστή είναι πολύ σοβαρότερος από ένα 2% συσκευών χωρίς κρυπτογράφηση δίσκου.

Γι' αυτό η προεπιλογή είναι το **Risk-weighted**. Κάθε ενότητα έχει βάρος, και ο δείκτης είναι ο σταθμισμένος μέσος όρος. Οι προεπιλεγμένες τιμές είναι:

| Ενότητα | Βάρος |
|---|---|
| Ταυτότητες | 25 |
| Ευπάθειες | 20 |
| Συσκευές | 15 |
| Περιστατικά | 15 |
| Email | 10 |
| Κρυπτογράφηση | 5 |
| Εξωτερικοί χρήστες | 5 |
| Shadow IT | 5 |
| Διαρροή δεδομένων | 5 |
| Cloud υποδομή | 5 |

Τα βάρη είναι σχετικά. Το εργαλείο τα μοιράζει μόνο στις ενότητες που έχουν πηγή, ώστε το σύνολο να βγαίνει πάντα 100%. Αν ανεβάσεις μόνο τις πέντε βασικές πηγές, οι Ταυτότητες μετράνε 29%, οι Ευπάθειες 24%, και ούτω καθεξής.

Οι προεπιλογές είναι πρόταση του thecybersec.gr, όχι πρότυπο. Το σωστό βάρος για κάθε ενότητα βγαίνει από το risk assessment του δικού σου οργανισμού, που ζητά και η ΚΥΑ 1689/2025 ([απαίτηση 5.1.β](/kya-1689-2025/#5-1-β)). Η αναφορά .pdf και το .xlsx γράφουν πάντα τον τρόπο υπολογισμού και τα βάρη που ίσχυσαν. Αν θέλεις να δείξεις την εικόνα χωρίς καμία στάθμιση, διάλεξε **Simple**.

### Priority actions: από την εικόνα στην απόφαση

Τριάντα ευρήματα δεν βοηθούν τη Διοίκηση να αποφασίσει. Γι' αυτό το εργαλείο κρατά τα 3 πρώτα και δίνει σε καθένα προτεραιότητα, το γιατί τώρα, υπεύθυνο και προθεσμία.

- **P1**: η πηγή είναι κάτω από 60 ή έχει επείγον εύρημα: διαχειριστές που δεν είναι MFA-capable, χρήστες High risk, ευπάθειες με γνωστό exploit ή ανοιχτά περιστατικά High.
- **P2**: η πηγή είναι κάτω από τον στόχο.
- **P3**: η πηγή είναι στον στόχο, αλλά δεν είναι στο 100.

Ο υπεύθυνος και η προθεσμία είναι προτάσεις, για παράδειγμα «IAM» και «7 ημέρες». Γράψε τα δικά σου ονόματα και ημερομηνίες πριν βγάλεις την αναφορά, ώστε κάθε ενέργεια να έχει πραγματικό υπεύθυνο.

### Πόσο συχνά να το τρέχεις και πώς κρατάς την τάση

Μία φορά τον μήνα είναι αρκετή για τη Διοίκηση. Πριν από κάθε συνεδρίαση του Δ.Σ., τρέξε το ξανά με φρέσκα αρχεία, γιατί τα exports είναι στιγμιότυπα της ημέρας που τα κατέβασες.

Η Διοίκηση δεν ενδιαφέρεται τόσο για το αν σήμερα είσαι στο 71. Ενδιαφέρεται για το αν πηγαίνεις προς τη σωστή κατεύθυνση. Άνοιξε τις «Ρυθμίσεις της αναφοράς» και πάτησε «Πρόσθεσε τη σημερινή τιμή» και μετά «Αντιγραφή link με τα βάρη και το ιστορικό». Αποθήκευσε το link. Τον επόμενο μήνα άνοιξε το link και ανέβασε τα νέα αρχεία. Η σελίδα και το .pdf δείχνουν την τάση, π.χ. 58 → 61 → 62 → 64 → 68, τη συνολική μεταβολή, π.χ. «🟢 +4 since previous assessment (10/15/2026)», και τη μεταβολή κάθε ενότητας, π.χ. Ταυτότητες ↑ +6, Ευπάθειες ↓ −8. Τα δεδομένα μένουν στο link, μετά το «#», και δεν φτάνουν ποτέ σε server.

Ακόμα καλύτερα, πάτησε «Αποθήκευση αξιολόγησης (.json)» στο Export και κράτα το αρχείο στον φάκελο του ISMS. Τον επόμενο μήνα φόρτωσέ το από τις «Ρυθμίσεις της αναφοράς». Επιστρέφουν ο στόχος, τα βάρη, το ιστορικό και οι τιμές ανά ενότητα, και στο Decision εμφανίζεται ο πίνακας Follow-up με τις ενέργειες της προηγούμενης φοράς. Η ένδειξη «Βελτιώθηκε» ή «Χειροτέρεψε» συγκρίνει τον βαθμό της πηγής τότε και τώρα. Το αν η ενέργεια έκλεισε το επιβεβαιώνει ο υπεύθυνος.

Το link και το .json περιέχουν την εικόνα ασφάλειας του οργανισμού. Κράτα τα μόνο εσωτερικά. Σύγκρινε μόνο τιμές με τον ίδιο τρόπο υπολογισμού και παρόμοιο Evidence coverage.

{{< tool-link page="/secure-score-symmorfosi" lead="Θέλεις λεπτομέρεια ανά απαίτηση;" label="Δες την κάλυψη του Secure Score σε κάθε απαίτηση" tail="με το «Από το Secure Score στη συμμόρφωση»." >}}

{{< tool-link page="/poios-xtypaei-tin-porta-sou" lead="Η ενότητα «Ταυτότητες» είναι χαμηλά;" label="Ανάλυσε τα sign-in logs σε βάθος, με χάρτη" tail="με το «Ποιος χτυπάει την πόρτα σου;»." >}}

</details>

<details class="my-4 rounded-lg border border-slate-700 bg-slate-900/40 px-4 py-3" id="cpAssurance">
<summary class="cursor-pointer text-lg font-semibold text-slate-100">Απόρρητο, όρια, συμμόρφωση και πηγές</summary>

Πώς προστατεύονται τα αρχεία σου, τι δεν μπορεί να σου πει το εργαλείο, πώς διαβάζεις τις σχετικές αναφορές ελέγχων και από πού προέρχεται κάθε πληροφορία.

### Privacy · Απόρρητο

Το thecybersec.gr δεν έχει server που να δέχεται τα αρχεία σου. Η ανάλυση γίνεται εξ ολοκλήρου μέσα στον browser σου, και το περιεχόμενο δεν αποθηκεύεται, ούτε στο localStorage. Αν έχεις αποδεχτεί τα cookies ανάλυσης, τα αποτελέσματα αποκρύπτονται από την καταγραφή του Microsoft Clarity. Περισσότερα στην [πολιτική απορρήτου](/privacy/).

Η ερμηνεία είναι ενδεικτική και δεν αντικαθιστά την αξιολόγηση στο δικό σου περιβάλλον. Το thecybersec.gr είναι προσωπικό blog και δεν εκπροσωπεί τη Microsoft ή την Εθνική Αρχή Κυβερνοασφάλειας.

### Limitations · Τι δεν μπορεί να σου πει

- **Ό,τι δεν υπάρχει στα αρχεία.** Ο δείκτης είναι τόσο καλός όσο οι πηγές του. Αν ανεβάσεις μόνο το Secure Score, η σελίδα δείχνει μόνο το email.
- **Αν μια ρύθμιση είναι σωστή για τον δικό σου οργανισμό.** Ένα ποσοστό 93% στη συμμόρφωση των συσκευών λέει ότι οι συσκευές ακολουθούν την πολιτική σου, όχι ότι η πολιτική είναι καλή. Το configuration compliance δεν είναι το ίδιο με το control effectiveness.
- **Αν το MFA επιβάλλεται παντού.** Το «MFA Capable» της Microsoft σημαίνει ότι ο χρήστης έχει καταχωρίσει ισχυρή μέθοδο που επιτρέπει η πολιτική. Δεν δείχνει αν του ζητείται MFA σε κάθε σύνδεση.
- **Τα μέτρα που δεν είναι στο Microsoft 365.** Firewall, φυσική ασφάλεια, αντίγραφα ασφαλείας εκτός Microsoft, εκπαίδευση και πολιτικές δεν φαίνονται εδώ.
- **Την τελική κρίση του ελεγκτή.** Οι σχετικές αναφορές ελέγχων δείχνουν σε ποια απαίτηση αφορά κάθε εύρημα, δεν βεβαιώνουν συμμόρφωση.

### Compliance interpretation · Γιατί έχει σημασία για τη συμμόρφωση

Ο ν. 5160/2024 κάνει το ανώτατο όργανο διοίκησης υπεύθυνο για τα μέτρα κυβερνοασφάλειας. Η ΚΥΑ 1689/2025 ζητά από τη Διοίκηση να εγκρίνει και να επιβλέπει το πρόγραμμα ([απαίτηση 4.β](/kya-1689-2025/#4-β)) και διαδικασίες παρακολούθησης της συμμόρφωσης με περιοδική αναφορά στο ανώτατο όργανο ([9.α](/kya-1689-2025/#9-α)). Ζητά επίσης διορθωτικές ενέργειες όταν υπάρχει απόκλιση ([9.β](/kya-1689-2025/#9-β)) και αξιολόγηση της αποτελεσματικότητας των μέτρων ([18.1.α](/kya-1689-2025/#18-1-α)). Στο ISO/IEC 27001, η σελίδα αυτή μπορεί να είναι είσοδος για την ανασκόπηση από τη Διοίκηση (ρήτρα 9.3) και για την παρακολούθηση και μέτρηση (ρήτρα 9.1).

Η αναφορά .pdf αποδεικνύει μόνο ότι δημιουργήθηκε η αναφορά. Δεν αποδεικνύει από μόνη της ότι παρουσιάστηκε στο Δ.Σ., ότι το Δ.Σ. την εξέτασε, ότι αποφάσισε ή ότι εγκρίθηκαν και παρακολουθήθηκαν οι διορθωτικές ενέργειες. Η αναφορά μπορεί να χρησιμοποιηθεί ως τεκμήριο ενημέρωσης της Διοίκησης όταν επισυνάπτεται σε πρακτικά, απόφαση ή άλλη καταγραφή της σχετικής ανασκόπησης. Γι' αυτό το εργαλείο δίνει και την «Αντιγραφή σύνοψης για τα πρακτικά»: το κείμενο μπαίνει στα πρακτικά και η αναφορά .pdf επισυνάπτεται.

{{< tool-link page="/mitroo-politikon" lead="Η τεχνική εικόνα είναι η μισή ιστορία." label="Κατάγραψε και τις υποχρεωτικές πολιτικές" tail="με το «Μητρώο υποχρεωτικών πολιτικών της ΚΥΑ 1689/2025»." >}}

### Sources & verification · Πηγές και επαλήθευση {#last-verified}

{{< verification >}}

</details>

<script>
(function () {
  function openA() { var d = document.getElementById('cpAssurance'); if (d && location.hash === '#last-verified') d.open = true; }
  window.addEventListener('hashchange', openA); openA();
  document.querySelectorAll('a[href="#last-verified"]').forEach(function (a) { a.addEventListener('click', function () { var d = document.getElementById('cpAssurance'); if (d) d.open = true; }); });
})();
</script>
