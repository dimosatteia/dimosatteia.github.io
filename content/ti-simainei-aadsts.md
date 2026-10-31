---
title: "Τι σημαίνει αυτό το AADSTS; Μεταφραστής σφαλμάτων σύνδεσης του Microsoft Entra ID"
date: 2026-10-31T17:30:00+02:00
lastmod: 2026-10-31T17:30:00+02:00
draft: false
url: "/ti-simainei-aadsts/"
slug: ti-simainei-aadsts
# Το link στο μενού ορίζεται εδώ, ώστε να εμφανίζεται μόνο όταν η σελίδα είναι δημοσιευμένη.
menu:
  main:
    identifier: tool-aadsts
    parent: tools
    name: "🔑 Τι σημαίνει αυτό το AADSTS;"
    weight: 14
author: "Dimosthenis Atteia"
description: "Δωρεάν εργαλείο: επικόλλησε έναν κωδικό AADSTS ή ολόκληρο το μήνυμα σφάλματος σύνδεσης και δες στα Ελληνικά τι σημαίνει, ποιος το λύνει, τι κάνεις, και τι λες στον χρήστη. Όλα στον browser σου."
seoTitle: "Τι σημαίνει αυτό το AADSTS; Σφάλματα σύνδεσης Entra ID στα Ελληνικά"
seoDescription: "Επικόλλησε τον κωδικό AADSTS ή το μήνυμα σφάλματος και δες στα Ελληνικά τι σημαίνει, ποιος το λύνει και τι κάνεις. Όλα στον browser σου."
toolBlurb: "Επικόλλησε έναν κωδικό AADSTS ή ολόκληρο το μήνυμα σφάλματος σύνδεσης και δες στα Ελληνικά τι σημαίνει, ποιος το λύνει, τι κάνεις, και τι λες στον χρήστη, με σύνοψη για το ticket. Τίποτα δεν φεύγει από τον browser σου."
keywords:
  - τι σημαίνει AADSTS
  - AADSTS error code
  - AADSTS53003
  - AADSTS50126
  - AADSTS50076
  - σφάλμα σύνδεσης Microsoft 365
  - Entra ID sign-in error
  - Conditional Access blocked
showToc: true
ShowReadingTime: false
ShowBreadCrumbs: false
hideMeta: true
cover:
  image: "/images/tools/ti-simainei-aadsts.webp"
  alt: "Ένα πλαίσιο με το σφάλμα AADSTS53003 και, από κάτω, η ερμηνεία στα Ελληνικά: τι σημαίνει, ποιος το λύνει και τι λες στον χρήστη"
  maxWidth: 800
categories: ["Identity & Access"]
tags:
  - Microsoft Entra ID
  - Conditional Access
  - Sign-in Logs
  - MFA
  - Identity Protection
  - ΚΥΑ 1689/2025
  - NIS2
  - ISO 27001
  - GDPR
# MITRE ATT&CK®: ονόματα στο data/mitre.yaml
mitre: ["T1078.004", "T1110", "T1110.003", "M1032", "M1018"]
# Πλαίσιο «Last verified»
verification:
  - feature: "Κατάλογος κωδικών AADSTS και Error code lookup (login.microsoftonline.com/error)"
    status: "Generally Available"
    license: "Όλες οι εκδόσεις Microsoft Entra ID"
    source: "https://learn.microsoft.com/en-us/entra/identity-platform/reference-error-codes"
    verified: 2026-10-31
  - feature: "Sign-in logs: Sign-in error code, Failure reason, Correlation ID και καρτέλα Conditional Access"
    status: "Generally Available"
    license: "Όλες οι εκδόσεις Microsoft Entra ID"
    source: "https://learn.microsoft.com/en-us/entra/identity/monitoring-health/howto-troubleshoot-sign-in-errors"
    verified: 2026-10-31
  - feature: "Διατήρηση των sign-in logs: 7 ημέρες στο Microsoft Entra ID Free, 30 ημέρες στο P1 και στο P2"
    status: "Generally Available"
    license: "Microsoft Entra ID Free, P1 ή P2"
    source: "https://learn.microsoft.com/en-us/entra/identity/monitoring-health/reference-reports-data-retention"
    verified: 2026-10-31
  - feature: "Κωδικοί Conditional Access (53000, 53001, 53002, 53003, 53004, 53009)"
    status: "Generally Available"
    license: "Microsoft Entra ID P1 ή Microsoft 365 Business Premium. Οι πολιτικές με βάση τον κίνδυνο θέλουν Microsoft Entra ID P2"
    source: "https://learn.microsoft.com/en-us/entra/identity/conditional-access/troubleshoot-conditional-access"
    verified: 2026-10-31
---

Ο χρήστης στέλνει ένα screenshot: «Δεν μπορώ να μπω, μου βγάζει αυτό». Στην οθόνη γράφει AADSTS και έναν αριθμό. Επικόλλησε εδώ τον αριθμό ή ολόκληρο το μήνυμα, και δες στα Ελληνικά τι σημαίνει, ποιος πρέπει να το λύσει, τι κάνεις, και τι απαντάς στον χρήστη.

Δεν χρειάζεται εγγραφή, ούτε πρόσβαση στο tenant σου.

{{< aadsts-check >}}

## Πώς δουλεύει

Το εργαλείο βρίσκει τον κωδικό μέσα σε ό,τι επικολλήσεις: σκέτο αριθμό (`53003`), τον κωδικό με το πρόθεμα (`AADSTS53003`), ολόκληρο το κείμενο της σελίδας σφάλματος, ή την απάντηση JSON μιας εφαρμογής με το πεδίο `error_codes`. Αν το κείμενο έχει Correlation ID, Request ID ή ώρα, τα ξεχωρίζει, για να βρεις τη συγκεκριμένη σύνδεση στα sign-in logs.

Για κάθε κωδικό βλέπεις τέσσερα πράγματα:

- **Τι σημαίνει**, σε απλά Ελληνικά.
- **Ποιος το λύνει**: ο ίδιος ο χρήστης, το helpdesk, ο admin του tenant, ο ιδιοκτήτης της εφαρμογής, ή ο admin άλλου οργανισμού. Αυτό κρίνει αν θα χειριστείς το ticket εσύ ή θα το προωθήσεις.
- **Τι κάνεις**, με το απλούστερο βήμα πρώτο.
- **Τι λες στον χρήστη**, όπου ταιριάζει: ένα έτοιμο μήνυμα που αντιγράφεις και στέλνεις.

Αν δεν ξέρεις τον κωδικό, γράψε μια λέξη, π.χ. «MFA», «consent» ή «κλειδώθηκε», και θα δεις όλες τις ερμηνείες που ταιριάζουν.

Το εργαλείο έχει Ελληνική ερμηνεία για 60 κωδικούς: αυτούς που συναντά ο admin στο helpdesk και στα sign-in logs. Αναγνωρίζει και τους υπόλοιπους από τους 350 κωδικούς που τεκμηριώνει σήμερα η Microsoft, με το όνομά τους και link στην τρέχουσα περιγραφή. Οι περισσότεροι από αυτούς αφορούν developers που φτιάχνουν εφαρμογές.

## Τι δεν μπορεί να σου πει

- **Ποια πολιτική μπλόκαρε τον συγκεκριμένο χρήστη.** Ο κωδικός λέει τι είδους σφάλμα έγινε. Το ποια πολιτική και γιατί το βλέπεις μόνο στα sign-in logs, στο Failure reason και στην καρτέλα Conditional Access.
- **Αν η περιγραφή της Microsoft άλλαξε σήμερα.** Η Microsoft αλλάζει τις περιγραφές χωρίς προειδοποίηση. Κάθε κάρτα έχει link στην τρέχουσα περιγραφή στο `login.microsoftonline.com/error`.
- **Αν πρόκειται για επίθεση.** Ένα 50126 είναι συνήθως λάθος κωδικός. Πολλά 50126 από την ίδια IP για πολλούς χρήστες είναι password spray. Για να το δεις, χρειάζεσαι τα logs: το άρθρο έχει έτοιμο KQL query.

Για αναλυτική εξήγηση, εικόνες από τα sign-in logs και δύο KQL queries, δες το άρθρο [AADSTS: Τι σημαίνουν τα σφάλματα σύνδεσης του Microsoft Entra ID και τι κάνεις ως admin](/posts/aadsts-sfalmata-syndesis-entra-id/).

## Γιατί έχει σημασία για τη συμμόρφωση

Η ΚΥΑ 1689/2025 ζητά ισχυρές μεθόδους αυθεντικοποίησης ([απαίτηση 13.στ](/kya-1689-2025/#13-στ)), MFA όπου το απαιτεί η κρισιμότητα ([13.ζ](/kya-1689-2025/#13-ζ)) και τακτικό έλεγχο των καταγραφών για ύποπτη δραστηριότητα ([24.ε](/kya-1689-2025/#24-ε)). Η Οδηγία NIS2 ζητά πολιτικές ελέγχου πρόσβασης ([21.2.θ](/nis2/#21-2-θ)) και πολυπαραγοντική επαλήθευση ταυτότητας ([21.2.ι](/nis2/#21-2-ι)). Στο ISO/IEC 27001 αφορά την ασφαλή αυθεντικοποίηση ([A.8.5](/iso-27001/#A-8-5)), τις πληροφορίες αυθεντικοποίησης ([A.5.17](/iso-27001/#A-5-17)) και την παρακολούθηση δραστηριοτήτων ([A.8.16](/iso-27001/#A-8-16)). Στον GDPR, το απόρρητο και την ακεραιότητα των συστημάτων ([32.1.β](/gdpr/#32-1-β)).

Η σύνοψη «Αντιγραφή για το ticket» κρατά τον κωδικό, το Correlation ID, την ερμηνεία και το τι έγινε. Μαζί με το ticket, είναι το τεκμήριο ότι κάθε μπλοκαρισμένη σύνδεση εξετάστηκε και δεν άνοιξε εξαίρεση χωρίς λόγο.

> 🛠️ **Το 53003 το προκάλεσε δική σου πολιτική;** [Δες το βασικό σύνολο πολιτικών Conditional Access](/politikes-conditional-access/) και ποιες χρειάζεσαι με βάση τις άδειές σου.

> 🛠️ **Ο λογαριασμός παραβιάστηκε;** [Δες αν είναι σημαντικό περιστατικό](/anafora-peristatikou/) και πότε λήγει κάθε προθεσμία προς την ΕΑΚ.

## Απόρρητο

Το thecybersec.gr δεν έχει server που να δέχεται ό,τι επικολλάς. Η ανάλυση γίνεται εξ ολοκλήρου μέσα στον browser σου, και το κείμενο δεν αποθηκεύεται, ούτε στο localStorage. Αν έχεις αποδεχτεί τα cookies ανάλυσης, το πλαίσιο κειμένου και τα αποτελέσματα αποκρύπτονται από την καταγραφή του Microsoft Clarity. Τα links «Τρέχουσα περιγραφή στη Microsoft» ανοίγουν τη σελίδα της Microsoft μόνο όταν τα πατήσεις, και στέλνουν μόνο τον αριθμό του κωδικού. Περισσότερα στην [πολιτική απορρήτου](/privacy/).

Η ερμηνεία είναι ενδεικτική και δεν αντικαθιστά τη διερεύνηση στα sign-in logs. Το thecybersec.gr είναι προσωπικό blog και δεν εκπροσωπεί τη Microsoft ή την Εθνική Αρχή Κυβερνοασφάλειας.

## Πηγές και επαλήθευση {#last-verified}

{{< verification >}}
