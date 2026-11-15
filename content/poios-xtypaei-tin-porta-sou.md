---
title: "Ποιος χτυπάει την πόρτα σου; Έλεγχος των sign-in logs του Microsoft Entra ID"
date: 2026-11-14T18:15:00+02:00
lastmod: 2026-11-14T18:15:00+02:00
draft: false
url: "/poios-xtypaei-tin-porta-sou/"
slug: poios-xtypaei-tin-porta-sou
# Το link στο μενού ορίζεται εδώ, ώστε να εμφανίζεται μόνο όταν η σελίδα είναι δημοσιευμένη.
menu:
  main:
    identifier: tool-signin-logs
    parent: tools
    name: "🚪 Ποιος χτυπάει την πόρτα σου;"
    weight: 18
author: "Dimosthenis Atteia"
description: "Δωρεάν εργαλείο: κατέβασε τα sign-in logs του Microsoft Entra ID, χωρίς PowerShell, και δες σε χάρτη ποιος προσπαθεί να μπει στο Microsoft 365 σου: password spray, brute force, σωστός κωδικός που σταμάτησε στο MFA, συνδέσεις από άλλες χώρες. Όλα στον browser σου."
seoTitle: "Ποιος χτυπάει την πόρτα σου; Έλεγχος sign-in logs Entra ID"
seoDescription: "Ανέβασε τα sign-in logs του Microsoft Entra ID και δες σε χάρτη password spray, brute force, συνδέσεις από άλλες χώρες και χρήστες χωρίς MFA. Όλα στον browser σου."
toolBlurb: "Κατέβασε τα sign-in logs του Microsoft Entra ID, χωρίς PowerShell, και δες σε χάρτη ποιος προσπαθεί να μπει: password spray, brute force, σωστός κωδικός που σταμάτησε στο MFA, επιτυχημένες συνδέσεις από άλλες χώρες και legacy authentication, με αναφορά .pdf. Τα logs δεν φεύγουν από τον browser σου."
keywords:
  - sign-in logs Entra ID
  - password spray Microsoft 365
  - έλεγχος συνδέσεων Microsoft 365
  - brute force Entra ID
  - legacy authentication
  - MFA fatigue
  - AADSTS50126
  - τακτικός έλεγχος καταγραφών
showToc: true
ShowReadingTime: false
ShowBreadCrumbs: false
hideMeta: true
# Στα «Πρόσφατα Άρθρα» της αρχικής, με βάση την ημερομηνία του
homeFeed: true
weight: -6
cover:
  image: "/images/tools/poios-xtypaei-tin-porta-sou.webp"
  alt: "Sign-in logs με password spray από Ρωσία και Βιετνάμ και επιτυχημένη σύνδεση από Βραζιλία μέσω IMAP, και δίπλα η σοβαρότητα «Κρίσιμο» με τα βήματα αποκατάστασης"
  maxWidth: 920
categories: ["Identity & Access"]
tags:
  - Microsoft Entra ID
  - Sign-in Logs
  - Password Spray
  - Conditional Access
  - MFA
  - Legacy Authentication
  - Incident Response
  - ΚΥΑ 1689/2025
  - NIS2
  - ISO 27001
  - GDPR
# MITRE ATT&CK®: ονόματα στο data/mitre.yaml
mitre: ["T1110.003", "T1110.001", "T1078.004", "T1621", "M1032"]
# Πλαίσιο «Last verified»
verification:
  - feature: "Λήψη των sign-in logs σε CSV ή JSON από το Microsoft Entra admin center, σε όλες τις εκδόσεις του Entra ID· έως 100.000 εγγραφές ανά αρχείο· ελάχιστος ρόλος Reports Reader"
    status: "Generally Available"
    license: "Όλες οι εκδόσεις του Microsoft Entra ID"
    source: "https://learn.microsoft.com/en-us/entra/identity/monitoring-health/howto-download-logs"
    verified: 2026-11-14
  - feature: "Διατήρηση των sign-in logs: 7 ημέρες με Entra ID Free, 30 ημέρες με P1 και P2"
    status: "Generally Available"
    license: "Microsoft Entra ID Free, P1, P2"
    source: "https://learn.microsoft.com/en-us/entra/identity/monitoring-health/reference-reports-data-retention"
    verified: 2026-11-14
  - feature: "Κωδικοί σφάλματος AADSTS: 50126 (λάθος κωδικός), 50053 (κλείδωμα ή κακόβουλη IP), 50074, 50076, 50079 (απαιτείται MFA), 500121, 53003"
    status: "Generally Available"
    license: "Όλες οι εκδόσεις του Microsoft Entra ID"
    source: "https://learn.microsoft.com/en-us/entra/identity-platform/reference-error-codes"
    verified: 2026-11-14
  - feature: "Μπλοκάρισμα του legacy authentication με Conditional Access· το Conditional Access εφαρμόζεται μετά τον πρώτο παράγοντα"
    status: "Generally Available"
    license: "Microsoft Entra ID P1 (ή Security defaults χωρίς P1)"
    source: "https://learn.microsoft.com/en-us/entra/identity/conditional-access/policy-block-legacy-authentication"
    verified: 2026-11-14
  - feature: "Διερεύνηση και απόκριση σε password spray"
    status: "Generally Available"
    license: "Όλες οι εκδόσεις του Microsoft Entra ID"
    source: "https://learn.microsoft.com/en-us/security/operations/incident-response-playbook-password-spray"
    verified: 2026-11-14
---

Κάθε μέρα, κάποιος κάπου στον κόσμο δοκιμάζει κωδικούς στο Microsoft 365 σου. Τις περισσότερες φορές αποτυγχάνει και δεν το μαθαίνεις ποτέ, γιατί κανείς δεν ανοίγει τα sign-in logs. Μερικές φορές όμως πετυχαίνει, ή φτάνει ένα βήμα πριν: ο κωδικός πέρασε και τον σταμάτησε μόνο το MFA.

Το εργαλείο αυτό σου δείχνει σε μισό λεπτό ποιος χτυπά την πόρτα σου, από πού, και πόσο κοντά έφτασε. Κατεβάζεις τα logs από το Microsoft Entra admin center, χωρίς PowerShell και χωρίς ειδική άδεια, και τα σύρεις εδώ. Αν θέλεις πρώτα να δεις πώς δουλεύει, πάτησε «Δοκίμασε με παράδειγμα».

{{< signin-check >}}

## Τι ψάχνει

Το εργαλείο ομαδοποιεί τις συνδέσεις ανά χρήστη, ανά διεύθυνση IP και ανά χώρα, και ψάχνει τα μοτίβα που περιγράφει η ίδια η Microsoft:

- **Επιτυχημένη σύνδεση από χώρα όπου δεν έχεις ανθρώπους.** Αν έγινε μόνο με κωδικό ή με legacy πρωτόκολλο, είναι «Κρίσιμο». Αν πέρασε το MFA, είναι «Υψηλό», γιατί μπορεί να είναι ταξίδι αλλά μπορεί και κλεμμένο token από επίθεση AiTM.
- **Σωστός κωδικός που σταμάτησε στο MFA ή στο Conditional Access.** Οι κωδικοί σφάλματος 50074, 50076 και 50079 εμφανίζονται αφού περάσει ο κωδικός. Το ίδιο και το 53003, γιατί το Conditional Access εφαρμόζεται μετά τον πρώτο παράγοντα. Από άλλη χώρα, σημαίνουν ότι κάποιος ξέρει τον κωδικό.
- **MFA fatigue.** Τρεις ή περισσότερες απορρίψεις MFA (500121) στον ίδιο χρήστη.
- **Password spray.** Μία IP που δοκιμάζει πέντε ή περισσότερους χρήστες με λάθος κωδικούς. Αν η ίδια IP πέτυχε έστω μία φορά, είναι «Κρίσιμο».
- **Brute force.** Δέκα ή περισσότερες αποτυχίες λόγω λάθος κωδικού στον ίδιο λογαριασμό.
- **Legacy authentication και χρήστες χωρίς MFA.** Επιτυχημένες συνδέσεις με IMAP, POP3, SMTP AUTH ή «Other clients», και συνδέσεις μόνο με κωδικό.

Για να ξεχωρίσει τι είναι «ξένο», το εργαλείο χρειάζεται τις χώρες όπου έχεις ανθρώπους. Τις συμπληρώνει μόνο του από τις χώρες με τις περισσότερες επιτυχημένες συνδέσεις. Αν κάποιοι συνεργάτες σου δουλεύουν από άλλη χώρα, πρόσθεσέ την στο βήμα 3.

Χρειάζεται επίσης τις δημόσιες διευθύνσεις IP του οργανισμού σου. Αν το γραφείο βγαίνει στο internet από μία IP, όλοι οι χρήστες φαίνονται με την ίδια διεύθυνση, και πέντε συνάδελφοι που έγραψαν λάθος τον κωδικό τους μέσα στην εβδομάδα θα έμοιαζαν με password spray. Γι' αυτό οι δικές σου IP εξαιρούνται από αυτόν τον έλεγχο. Το εργαλείο τις βρίσκει μόνο του: είναι όσες IP της χώρας σου χρησιμοποιούν με επιτυχία τρεις ή περισσότεροι χρήστες. Έλεγξε τη λίστα στο βήμα 4 και πρόσθεσε ό,τι λείπει, π.χ. το VPN ή ένα δεύτερο γραφείο.

## Τι κάνεις αν βρεις κάτι

Για κάθε χρήστη με «Κρίσιμο» ή «Υψηλό», η σειρά έχει σημασία. Πρώτα ακυρώνεις τις ενεργές συνεδρίες του (Revoke sessions) και μετά αλλάζεις τον κωδικό. Η αλλαγή κωδικού μόνη της δεν φτάνει, γιατί ο επιτιθέμενος συνεχίζει με τα tokens που ήδη έχει. Ύστερα ελέγχεις τι έκανε όσο ήταν μέσα: inbox rules, προώθηση του mailbox, νέες μεθόδους MFA, εφαρμογές.

{{< tool-link page="/poios-diavazei-to-mailbox-sou" lead="Μπήκε κάποιος;" label="Έλεγξε τους inbox rules και την προώθηση του mailbox" tail="με το «Ποιος διαβάζει το mailbox σου;»." >}}

Μετά κλείνεις την πόρτα. Τα περισσότερα password spray περνούν από legacy πρωτόκολλα, που δεν υποστηρίζουν MFA. Με Conditional Access μπλοκάρεις το legacy authentication, ζητάς MFA από όλους και, αν θέλεις, μπλοκάρεις τις χώρες όπου δεν έχεις δουλειά. Χωρίς Entra ID P1, τα Security defaults κάνουν τα δύο πρώτα δωρεάν.

{{< tool-link page="/politikes-conditional-access" lead="Δεν ξέρεις από πού να ξεκινήσεις;" label="Δες ποιες πολιτικές Conditional Access σου ταιριάζουν" tail="ανάλογα με τις άδειές σου." >}}

## Τι δεν μπορεί να σου πει

- **Αν μια σύνδεση από άλλη χώρα είναι επίθεση ή ταξίδι.** Το VPN, το roaming και τα ταξίδια δίνουν το ίδιο αποτέλεσμα. Ρώτα τον χρήστη πριν αποφασίσεις.
- **Πόσο ακριβής είναι η χώρα.** Προκύπτει από τη διεύθυνση IP όπως την καταγράφει η Microsoft, και κάποιες φορές κάνει λάθος.
- **Ό,τι δεν υπάρχει στα αρχεία.** Τα logs κρατούνται 7 ημέρες με Entra ID Free και 30 με P1 ή P2. Ό,τι έγινε πιο πριν δεν φαίνεται, και ούτε φαίνονται οι συνδέσεις που δεν κατέβασες. Γι' αυτό κατέβασε και τα Interactive και τα Non-interactive sign-ins.

## Γιατί έχει σημασία για τη συμμόρφωση

Η ΚΥΑ 1689/2025 ζητά τακτικό έλεγχο των καταγραφών για ύποπτη δραστηριότητα ([απαίτηση 24.ε](/kya-1689-2025/#24-ε)), πολυπαραγοντική αυθεντικοποίηση ανάλογα με την κρισιμότητα ([13.ζ](/kya-1689-2025/#13-ζ)) και πολιτική λογικού ελέγχου πρόσβασης ([13.α](/kya-1689-2025/#13-α)). Η Οδηγία NIS2 ζητά λύσεις πολυπαραγοντικής επαλήθευσης ταυτότητας ([21.2.ι](/nis2/#21-2-ι)) και χειρισμό περιστατικών ([21.2.β](/nis2/#21-2-β)). Στο ISO/IEC 27001 αφορά την καταγραφή ([A.8.15](/iso-27001/#A-8-15)), την παρακολούθηση ([A.8.16](/iso-27001/#A-8-16)) και την ασφαλή αυθεντικοποίηση ([A.8.5](/iso-27001/#A-8-5)).

Στον GDPR, ένας λογαριασμός με email που τον χρησιμοποίησε επιτιθέμενος είναι συχνά παραβίαση προσωπικών δεδομένων. Αφορά την ασφάλεια των συστημάτων ([32.1.β](/gdpr/#32-1-β)) και τη γνωστοποίηση στην Αρχή Προστασίας Δεδομένων εντός 72 ωρών ([33.1](/gdpr/#33-1)).

Η αναφορά .pdf του εργαλείου είναι έτοιμο τεκμήριο ότι ο έλεγχος έγινε: περίοδος, ευρήματα, ενέργειες. Αν την κρατάς κάθε εβδομάδα, έχεις το ιστορικό που θα σου ζητήσει ο ελεγκτής για την απαίτηση 24.ε.

> 🛠️ **Επιβεβαιώθηκε παραβίαση;** [Ετοίμασε την αναφορά περιστατικού προς την Εθνική Αρχή Κυβερνοασφάλειας](/anafora-peristatikou/), με επιλογή για την έγκαιρη προειδοποίηση των 24 ωρών ή την αναφορά των 72 ωρών.

> 🛠️ **Είδες έναν κωδικό σφάλματος και δεν ξέρεις τι σημαίνει;** [Ψάξ' τον στο «Τι σημαίνει αυτό το AADSTS;»](/ti-simainei-aadsts/).

## Απόρρητο

Το thecybersec.gr δεν έχει server που να δέχεται τα logs σου. Η ανάλυση γίνεται εξ ολοκλήρου μέσα στον browser σου, και το περιεχόμενο δεν αποθηκεύεται, ούτε στο localStorage. Αν έχεις αποδεχτεί τα cookies ανάλυσης, τα αποτελέσματα αποκρύπτονται από την καταγραφή του Microsoft Clarity. Περισσότερα στην [πολιτική απορρήτου](/privacy/).

Η ερμηνεία είναι ενδεικτική και δεν αντικαθιστά τη διερεύνηση στο δικό σου περιβάλλον. Το thecybersec.gr είναι προσωπικό blog και δεν εκπροσωπεί τη Microsoft ή την Εθνική Αρχή Κυβερνοασφάλειας.

## Πηγές και επαλήθευση {#last-verified}

{{< verification >}}
