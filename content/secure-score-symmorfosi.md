---
title: "Από το Secure Score στη συμμόρφωση: οι συστάσεις του tenant σου ανά απαίτηση της ΚΥΑ, της NIS2, του ISO 27001 και του GDPR"
date: 2026-10-27T14:00:00+02:00
lastmod: 2026-10-27T14:00:00+02:00
draft: false
url: "/secure-score-symmorfosi/"
# Το link στο μενού ορίζεται εδώ, ώστε να εμφανίζεται μόνο όταν η σελίδα είναι δημοσιευμένη.
menu:
  main:
    identifier: tool-secure-score
    parent: tools
    name: "📊 Από το Secure Score στη συμμόρφωση"
    weight: 6
author: "Dimosthenis Atteia"
description: "Δωρεάν εργαλείο: ανέβασε το CSV με τις συστάσεις του Microsoft Secure Score και δες την κάλυψη ανά απαίτηση της ΚΥΑ 1689/2025, της NIS2, του ISO/IEC 27001 και του GDPR, τα κενά με προτεραιότητα και το τεκμήριο που θα ζητήσει ο ελεγκτής. Το αρχείο δεν φεύγει από τον browser σου."
toolBlurb: "ανέβασε το CSV του Microsoft Secure Score και πάρε κάλυψη ανά απαίτηση σε ΚΥΑ 1689/2025, NIS2, ISO/IEC 27001 και GDPR, κενά με προτεραιότητα και τα τεκμήρια του ελεγκτή, σε .pdf και .xlsx. Το αρχείο δεν φεύγει από τον browser σου."
keywords:
  - Microsoft Secure Score συμμόρφωση
  - Secure Score ΚΥΑ 1689/2025
  - Secure Score NIS2 mapping
  - Secure Score ISO 27001 Annex A
  - Secure Score GDPR
  - Secure Score export CSV
  - Microsoft 365 audit evidence
  - τεκμήρια ελεγκτή Microsoft 365
showToc: true
ShowReadingTime: false
ShowBreadCrumbs: false
hideMeta: true
# Γράφημα στη δεξιά στήλη, κάτω από το Table of Contents, όταν αναλυθεί ένα αρχείο
ssGauge: true
categories: ["GRC & Compliance"]
tags:
  - Microsoft Secure Score
  - Microsoft 365 Security
  - ΚΥΑ 1689/2025
  - NIS2
  - ISO 27001
  - GDPR
  - GRC
# MITRE ATT&CK®: ονόματα στο data/mitre.yaml. Οι κατηγορίες μέτρων που καλύπτουν οι συστάσεις του Secure Score.
mitre: ["M1032", "M1026", "M1018", "M1040", "M1051", "M1041", "M1054", "M1049", "M1047", "M1017"]
# Πλαίσιο «Last verified»
verification:
  - feature: "Microsoft Secure Score: καρτέλα Recommended actions με κατάσταση To address, Planned, Risk accepted, Resolved through third party, Resolved through alternate mitigation και Completed"
    status: "Generally Available"
    license: "Όλα τα πακέτα Microsoft 365 με πρόσβαση στο Microsoft Defender portal"
    source: "https://learn.microsoft.com/defender-xdr/microsoft-secure-score-improvement-actions"
    verified: 2026-10-27
  - feature: "Οι καταστάσεις Resolved through third party και Resolved through alternate mitigation δίνουν πόντους χωρίς επαλήθευση από τη Microsoft· το Risk accepted δεν δίνει πόντους"
    status: "Generally Available"
    license: "Όλα τα πακέτα Microsoft 365 με πρόσβαση στο Microsoft Defender portal"
    source: "https://learn.microsoft.com/defender-xdr/microsoft-secure-score-improvement-actions#choose-a-recommended-action-status"
    verified: 2026-10-27
  - feature: "Οι συστάσεις της κατηγορίας Device ρυθμίζονται από το Microsoft Defender Vulnerability Management (Microsoft Secure Score for Devices)"
    status: "Generally Available"
    license: "Microsoft Defender for Endpoint Plan 2 ή Microsoft Defender for Business"
    source: "https://learn.microsoft.com/defender-vulnerability-management/tvm-microsoft-secure-score-devices"
    verified: 2026-10-27
---

Το Microsoft Secure Score ξέρει ήδη τι λείπει από το tenant σου. Αυτό που δεν σου λέει είναι ποιες απαιτήσεις αφορά κάθε κενό και τι θα ζητήσει ο ελεγκτής. Αυτό το εργαλείο κάνει ακριβώς αυτή τη μετάφραση. Ανεβάζεις το CSV με τις συστάσεις από το Microsoft Defender portal και παίρνεις την κάλυψη ανά απαίτηση της [ΚΥΑ 1689/2025](/kya-1689-2025/), της [Οδηγίας NIS2](/nis2/), του [ISO/IEC 27001](/iso-27001/) και του [GDPR](/gdpr/), τα κενά με σειρά προτεραιότητας και το τεκμήριο που χρειάζεται για καθένα.

Δεν χρειάζεται εγγραφή, και δεν χρειάζεται να δώσεις πρόσβαση στο tenant σου. Το αρχείο διαβάζεται μόνο μέσα στον browser σου.

{{< secure-score-map >}}

## Τι παίρνεις στο τέλος

Ένα ποσοστό κάλυψης για κάθε πλαίσιο και για κάθε απαίτηση ξεχωριστά, με τις συστάσεις που μετράνε σε καθεμία. Τα κενά με σειρά προτεραιότητας, με τις απαιτήσεις που επηρεάζει το καθένα. Για κάθε θέμα ασφάλειας, όπως MFA, προνομιακοί ρόλοι, ενημερώσεις ή προστασία email, το τεκμήριο που θα ζητήσει ο ελεγκτής και, όπου υπάρχει, το query της [Βιβλιοθήκης KQL](/kql/) που το βγάζει από το tenant σου.

Και μια ξεχωριστή λίστα με όσες συστάσεις έχεις σημειώσει «Resolved through third party», «Resolved through alternate mitigation» ή «Risk accepted». Το Secure Score δίνει πόντους για τις δύο πρώτες χωρίς να μπορεί να το επαληθεύσει. Για την τρίτη δεν δίνει πόντους, αλλά ο ελεγκτής θα ζητήσει τη γραπτή απόφαση. Σε όλες, το τεκμήριο το φέρνεις εσύ.

Κατεβάζεις δύο αρχεία. Η αναφορά .pdf έχει σύνοψη, κάλυψη ανά πλαίσιο και ανά απαίτηση, τα κενά με προτεραιότητα, τις καταστάσεις που θέλουν δικό σου τεκμήριο, τι θα ζητήσει ο ελεγκτής ανά θέμα και πλάνο διορθωτικών ενεργειών με θέσεις υπογραφής, για τη διοίκηση ή τον ελεγκτή. Το .xlsx έχει το πλάνο με στήλες για υπεύθυνο, ημερομηνία στόχο και κατάσταση, όλες τις συστάσεις με στήλη για το πού φυλάσσεται το τεκμήριο, και ένα φύλλο για κάθε πλαίσιο.

## Πώς γίνεται η αντιστοίχιση

Κάθε σύσταση αντιστοιχίζεται σε ένα από 36 θέματα ασφάλειας από τον τίτλο της. Κάθε θέμα έχει τους κωδικούς του στα τέσσερα πλαίσια, τους ίδιους που χρησιμοποιούν οι οδηγοί του blog. Αν ο τίτλος δεν ταιριάζει σε συγκεκριμένο θέμα, για παράδειγμα σε μια νέα σύσταση της Microsoft, η αντιστοίχιση γίνεται από το προϊόν ή την κατηγορία της σύστασης και σημειώνεται, για να την ελέγξεις.

Η κάλυψη μιας απαίτησης είναι οι πόντοι που έχεις κερδίσει προς τους μέγιστους πόντους των συστάσεων που την υποστηρίζουν, όπως τους δίνει το Secure Score. Έτσι μια σύσταση που αξίζει 10 πόντους μετράει περισσότερο από μία που αξίζει 1. Η κάλυψη ενός πλαισίου είναι ο μέσος όρος των απαιτήσεών του, ώστε μια απαίτηση με πολλές συστάσεις να μην «σκεπάζει» τις υπόλοιπες.

Τα κενά ταξινομούνται με αυτή τη σειρά: πρώτα τα θέματα που ζητούν ρητά τα πλαίσια, όπως MFA, προνομιακή πρόσβαση, ενημερώσεις, προστασία email, antimalware και κρυπτογράφηση. Μετά όσα καλύπτει ήδη η άδειά σου, μετά οι περισσότεροι πόντοι που απομένουν, και τέλος η σειρά (Rank) του ίδιου του Secure Score.

## Γιατί το Secure Score δεν είναι από μόνο του τεκμήριο συμμόρφωσης

Ένα υψηλό Secure Score δείχνει ότι εφαρμόζεις τις τεχνικές ρυθμίσεις που προτείνει η Microsoft. Δεν δείχνει ότι έχεις την πολιτική που τις απαιτεί, ότι η διοίκηση την ενέκρινε ή ότι ελέγχεις τακτικά ότι εφαρμόζεται. Η ΚΥΑ 1689/2025 και το ISO/IEC 27001 ζητούν και τα τρία. Γι' αυτό το εργαλείο δείχνει ποιες απαιτήσεις υποστηρίζει κάθε σύσταση, αλλά δεν τις δηλώνει «καλυμμένες». Πώς χρησιμοποιείς το Secure Score ως μετρήσιμη βάση ενός προγράμματος GRC το περιγράφω αναλυτικά στη σειρά [Microsoft Secure Score ως εργαλείο GRC](/posts/secure-score-grc-part-0-intro/).

## Τι δεν καλύπτει το εργαλείο

- **Δεν συνδέεται στο tenant σου.** Βλέπει μόνο ό,τι έχει το αρχείο. Αν το export είναι παλιό ή φιλτραρισμένο, το ίδιο θα είναι και το αποτέλεσμα. Οι αλλαγές στο Secure Score φαίνονται μετά από 24 έως 48 ώρες.
- **Οργανωτικά μέτρα.** Πολιτικές, ρόλοι, εκτίμηση κινδύνων, συμβάσεις με προμηθευτές, φυσική ασφάλεια και επιχειρησιακή συνέχεια δεν υπάρχουν στο Secure Score. Για τα έγγραφα που ζητά η ΚΥΑ, χρησιμοποίησε το [Μητρώο υποχρεωτικών πολιτικών](/mitroo-politikon/).
- **Συστήματα OT και servers εκτός Microsoft Defender.** Τα συστήματα OT δεν καλύπτονται από το Microsoft 365. Η Microsoft έχει ξεχωριστό προϊόν, το Microsoft Defender for IoT.
- **Ρυθμίσεις που το Secure Score δεν μετρά.** Για αντίγραφα ασφαλείας, αναθεωρήσεις πρόσβασης ή παρακολούθηση των alerts, κάνε και τον [έλεγχο ετοιμότητας Microsoft 365](/etoimotita-microsoft-365/). Εκείνο ρωτά, αυτό διαβάζει την πραγματική εικόνα του tenant σου. Μαζί δίνουν την πλήρη εικόνα.

{{< tool-link page="/etoimotita-microsoft-365" lead="Συμπλήρωσε την εικόνα:" label="Είναι έτοιμο το Microsoft 365 σου για τον ελεγκτή;" tail="22 ερωτήσεις για όσα δεν μετρά το Secure Score." >}}

{{< tool-link page="/politikes-conditional-access" lead="Τα κενά σου είναι στο MFA και στο Conditional Access;" label="Πάρε το βασικό σύνολο πολιτικών Conditional Access" tail="σε JSON, με σειρά ενεργοποίησης." >}}

{{< tool-link page="/poia-adeia-microsoft-365" lead="Κάποιες συστάσεις θέλουν άδεια που δεν έχεις;" label="Δες ποιο πακέτο Microsoft 365 τις καλύπτει" tail="ανά απαίτηση της ΚΥΑ 1689/2025." >}}

Το αποτέλεσμα είναι ενδεικτικό. Δεν είναι ελεγκτική γνώμη ούτε νομική συμβουλή. Το thecybersec.gr είναι προσωπικό blog και δεν εκπροσωπεί τη Microsoft ή την Εθνική Αρχή Κυβερνοασφάλειας.
