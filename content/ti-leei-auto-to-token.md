---
title: "Τι λέει αυτό το token; Αποκωδικοποίηση access token του Microsoft Entra ID στα Ελληνικά"
date: 2026-11-02T20:55:00+02:00
lastmod: 2026-11-02T20:55:00+02:00
draft: false
url: "/ti-leei-auto-to-token/"
slug: ti-leei-auto-to-token
# Το link στο μενού ορίζεται εδώ, ώστε να εμφανίζεται μόνο όταν η σελίδα είναι δημοσιευμένη.
menu:
  main:
    identifier: tool-token
    parent: tools
    name: "🎫 Τι λέει αυτό το token;"
    weight: 15
author: "Dimosthenis Atteia"
description: "Δωρεάν εργαλείο: επικόλλησε ένα access token ή ID token του Microsoft Entra ID και δες στα Ελληνικά ποιος είναι, ποια εφαρμογή το ζήτησε, για ποιον πόρο, αν πέρασε MFA, τι δικαιώματα έχει, πόσο ακόμα ισχύει, και KQL για τα logs. Όλα στον browser σου."
seoTitle: "Τι λέει αυτό το token; Access token του Entra ID στα Ελληνικά"
seoDescription: "Επικόλλησε ένα access token του Entra ID και δες στα Ελληνικά ποιος, ποια εφαρμογή, αν πέρασε MFA, τι δικαιώματα έχει και πότε λήγει. Όλα στον browser σου."
toolBlurb: "Επικόλλησε ένα access token ή ID token του Entra ID και δες στα Ελληνικά ποιος είναι, ποια εφαρμογή το ζήτησε, αν πέρασε MFA, τι ρόλους και δικαιώματα έχει, πόσο ακόμα ισχύει, και KQL για να βρεις τι έκανε. Το token δεν φεύγει από τον browser σου."
keywords:
  - αποκωδικοποίηση token
  - access token Entra ID
  - JWT decoder
  - jwt.ms
  - token claims
  - amr mfa claim
  - wids claim
  - token theft
showToc: true
ShowReadingTime: false
ShowBreadCrumbs: false
hideMeta: true
cover:
  image: "/images/tools/ti-leei-auto-to-token.webp"
  alt: "Ένα access token του Entra ID και, δίπλα, η ερμηνεία του στα Ελληνικά: ποιος, ποια εφαρμογή, αν πέρασε MFA και πόσο ακόμα ισχύει"
  maxWidth: 800
categories: ["Identity & Access"]
tags:
  - Microsoft Entra ID
  - Conditional Access
  - Token Theft
  - Sign-in Logs
  - Incident Response
  - ΚΥΑ 1689/2025
  - NIS2
  - ISO 27001
  - GDPR
# MITRE ATT&CK®: ονόματα στο data/mitre.yaml
mitre: ["T1528", "T1550.001", "T1539", "M1032", "M1018"]
# Πλαίσιο «Last verified»
verification:
  - feature: "Claims των access tokens (amr, acrs, wids, scp, roles, xms_cc, uti, sid)"
    status: "Generally Available"
    license: "Όλες οι εκδόσεις Microsoft Entra ID"
    source: "https://learn.microsoft.com/en-us/entra/identity-platform/access-token-claims-reference"
    verified: 2026-11-02
  - feature: "Διάρκεια access token: 60 έως 90 λεπτά, έως 28 ώρες με Continuous Access Evaluation"
    status: "Generally Available"
    license: "Όλες οι εκδόσεις Microsoft Entra ID"
    source: "https://learn.microsoft.com/en-us/entra/identity-platform/access-tokens#token-lifetime"
    verified: 2026-11-02
  - feature: "Linkable identifiers: uti και sid στα sign-in logs, στα Microsoft Graph activity logs και στα audit logs του Microsoft 365"
    status: "Generally Available"
    license: "Sign-in logs: όλες οι εκδόσεις Microsoft Entra ID. Microsoft Graph activity logs: Microsoft Entra ID P1 ή P2 και Log Analytics workspace"
    source: "https://learn.microsoft.com/en-us/entra/identity/authentication/how-to-authentication-track-linkable-identifiers"
    verified: 2026-11-02
  - feature: "Template ID των ρόλων του Microsoft Entra ID (claim wids)"
    status: "Generally Available"
    license: "Όλες οι εκδόσεις Microsoft Entra ID"
    source: "https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference"
    verified: 2026-11-02
---

Βρήκες ένα token σε log, σε ένα script, στο Network tab του browser ή στα στοιχεία ενός περιστατικού. Επικόλλησέ το εδώ και δες στα Ελληνικά ποιος είναι ο χρήστης, ποια εφαρμογή το ζήτησε, για ποιον πόρο, αν πέρασε MFA, τι ρόλους και δικαιώματα έχει, και πόσο ακόμα ισχύει.

Δεν χρειάζεται εγγραφή, ούτε πρόσβαση στο tenant σου. Αν θέλεις πρώτα να δεις πώς δουλεύει, πάτησε «Δοκίμασε με παράδειγμα».

{{< token-check >}}

## Πώς δουλεύει

Ένα access token του Microsoft Entra ID είναι ένα JWT: τρία κομμάτια χωρισμένα με τελείες. Το πρώτο είναι το header, το δεύτερο τα claims, και το τρίτο η υπογραφή. Τα δύο πρώτα είναι απλώς κωδικοποιημένα σε Base64, όχι κρυπτογραφημένα. Τα διαβάζει όποιος έχει το token, και αυτό κάνει το εργαλείο.

Βρίσκει το token μέσα σε ό,τι επικολλήσεις: σκέτο token, ολόκληρη την κεφαλίδα `Authorization: Bearer …`, ένα αίτημα από το Network tab, ή την απάντηση JSON με το πεδίο `access_token`. Μετά σου δείχνει:

- **Με μια ματιά**: τι είδους token είναι, ποιος, ποια εφαρμογή, για ποιον πόρο, πώς ταυτοποιήθηκε, από ποια IP και συσκευή, και πότε λήγει.
- **Τι πρέπει να προσέξεις**: αν είναι ακόμα ενεργό, αν λείπει το MFA ή η συσκευή, αν ο χρήστης είχε ενεργό ρόλο Global Administrator, αν η εφαρμογή έχει δικαιώματα υψηλού κινδύνου, με το απλούστερο βήμα για καθένα.
- **KQL για τα logs**: με το `uti` και το `sid` του token, έτοιμα queries που βρίσκουν τη σύνδεση στα sign-in logs και τι έκανε το token στο Microsoft Graph.
- **Όλα τα claims**, ομαδοποιημένα, με την ερμηνεία τους. Τα `wids` μεταφράζονται σε ονόματα ρόλων και τα `appid` και `aud` σε ονόματα εφαρμογών, όπου είναι γνωστά.

Η «Αντιγραφή για το ticket» κρατά τα στοιχεία και τα ευρήματα, χωρίς το ίδιο το token.

## Τι δεν μπορεί να σου πει

- **Αν το token είναι γνήσιο.** Το εργαλείο δεν ελέγχει την υπογραφή. Ένα token μπορεί να το φτιάξει οποιοσδήποτε, όπως το παράδειγμα της σελίδας. Το γνήσιο token το ξεχωρίζει ο πόρος που το δέχεται.
- **Αν έχει ανακληθεί.** Το Revoke sessions ακυρώνει τα refresh tokens, όχι το access token. Αυτό ισχύει μέχρι να λήξει, εκτός αν ο πόρος υποστηρίζει Continuous Access Evaluation.
- **Τι έκανε με αυτό ο κάτοχός του.** Αυτό το βλέπεις μόνο στα logs. Γι' αυτό το εργαλείο σου δίνει τα queries.
- **Όλα τα δικαιώματα του χρήστη.** Τα `scp`, `roles` και `wids` λένε τι έφερε το token. Ο πόρος μπορεί να ελέγχει πρόσβαση και με άλλους τρόπους.

## Πότε το χρειάζεσαι στην πράξη

**Σε περιστατικό token theft.** Ένα infostealer ή ένα adversary-in-the-middle phishing παίρνει tokens και cookies, όχι κωδικούς. Αν βρεις ένα token στα στοιχεία, θες να ξέρεις γρήγορα αν είναι ακόμα ενεργό, τι ρόλους έχει, και ποια είναι η συνεδρία του, για να ψάξεις στα logs τι έκανε.

**Όταν μια εφαρμογή παίρνει «Access denied».** Το token δείχνει αν ζητήθηκε για τον σωστό πόρο (`aud`), αν έχει το δικαίωμα που χρειάζεται (`scp` ή `roles`), και αν ο χρήστης είχε ενεργό τον ρόλο του PIM (`wids`) όταν εκδόθηκε.

**Όταν ελέγχεις το Conditional Access.** Το `amr` δείχνει αν η σύνδεση πέρασε MFA. Το `deviceid` δείχνει αν το Entra ID ήξερε τη συσκευή. Το `acrs` δείχνει ποια Authentication Context ικανοποιήθηκαν.

**Όταν ελέγχεις μια εφαρμογή τρίτου.** Ένα token με `roles` και χωρίς `scp` σημαίνει application permissions για όλο τον οργανισμό. Αν βλέπεις `Mail.ReadWrite` ή `Directory.ReadWrite.All` εκεί, η εφαρμογή διαβάζει όλα τα mailboxes ή αλλάζει τον κατάλογο χωρίς χρήστη.

## Γιατί έχει σημασία για τη συμμόρφωση

Η ΚΥΑ 1689/2025 ζητά least privilege ([απαίτηση 13.γ](/kya-1689-2025/#13-γ)), περιορισμό των προνομιούχων λογαριασμών ([13.δ](/kya-1689-2025/#13-δ)), ισχυρές μεθόδους αυθεντικοποίησης ([13.στ](/kya-1689-2025/#13-στ)), MFA όπου το απαιτεί η κρισιμότητα ([13.ζ](/kya-1689-2025/#13-ζ)) και τακτικό έλεγχο των καταγραφών για ύποπτη δραστηριότητα ([24.ε](/kya-1689-2025/#24-ε)). Η Οδηγία NIS2 ζητά πολιτικές ελέγχου πρόσβασης ([21.2.θ](/nis2/#21-2-θ)) και πολυπαραγοντική επαλήθευση ταυτότητας ([21.2.ι](/nis2/#21-2-ι)). Στο ISO/IEC 27001 αφορά τον έλεγχο πρόσβασης ([A.5.15](/iso-27001/#A-5-15)), τα προνομιακά δικαιώματα πρόσβασης ([A.8.2](/iso-27001/#A-8-2)), την ασφαλή αυθεντικοποίηση ([A.8.5](/iso-27001/#A-8-5)) και την παρακολούθηση δραστηριοτήτων ([A.8.16](/iso-27001/#A-8-16)). Στον GDPR, το απόρρητο και την ακεραιότητα των συστημάτων ([32.1.β](/gdpr/#32-1-β)).

Σε ένα περιστατικό, η σύνοψη του ticket μαζί με τα αποτελέσματα των queries είναι το τεκμήριο ότι εξέτασες τι πρόσβαση έδινε το token, για πόσο, και τι έγινε με αυτό.

> 🛠️ **Η σύνδεση απέτυχε με κωδικό AADSTS;** [Δες τι σημαίνει](/ti-simainei-aadsts/), ποιος το λύνει και τι λες στον χρήστη.

> 🛠️ **Το token δεν είχε MFA ή συσκευή;** [Δες το βασικό σύνολο πολιτικών Conditional Access](/politikes-conditional-access/) και ποιες χρειάζεσαι με βάση τις άδειές σου.

> 🛠️ **Το token διέρρευσε;** [Δες αν είναι σημαντικό περιστατικό](/anafora-peristatikou/) και πότε λήγει κάθε προθεσμία προς την ΕΑΚ.

## Απόρρητο

Το thecybersec.gr δεν έχει server που να δέχεται ό,τι επικολλάς. Η αποκωδικοποίηση γίνεται εξ ολοκλήρου μέσα στον browser σου, και το token δεν αποθηκεύεται, ούτε στο localStorage. Αν έχεις αποδεχτεί τα cookies ανάλυσης, το πλαίσιο κειμένου και τα αποτελέσματα αποκρύπτονται από την καταγραφή του Microsoft Clarity. Περισσότερα στην [πολιτική απορρήτου](/privacy/).

Ακόμα κι έτσι, ένα ενεργό access token είναι διαπιστευτήριο. Για να το διαβάσεις, αρκούν τα δύο πρώτα κομμάτια: σβήσε την υπογραφή, ό,τι υπάρχει μετά τη δεύτερη τελεία, πριν το επικολλήσεις οπουδήποτε.

Η ερμηνεία είναι ενδεικτική και δεν αντικαθιστά τη διερεύνηση στα logs. Το thecybersec.gr είναι προσωπικό blog και δεν εκπροσωπεί τη Microsoft ή την Εθνική Αρχή Κυβερνοασφάλειας.

## Πηγές και επαλήθευση {#last-verified}

{{< verification >}}
