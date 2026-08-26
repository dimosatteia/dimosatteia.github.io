---
title: "Defender XDR: Μία ενέργεια, όλοι οι λογαριασμοί, το unified response actions για ταυτότητες έρχεται τον Οκτώβριο, τι φέρνει το MC1461704"
date: 2026-08-26T09:00:00+03:00
lastmod: 2026-08-26T09:00:00+03:00
draft: true
keywords:
  - Microsoft Defender XDR
  - Unified response actions
  - Identity remediation actions
  - MC1461704
  - Disable account revoke session
  - Force password change
  - Okta CyberArk SailPoint Defender
  - Incident response ταυτοτήτων
  - NIS2 διαχείριση συμβάντων
  - ISO 27001 A.5.26
tags:
  - Microsoft Defender XDR
  - Defender for Identity
  - Defender for Cloud Apps
  - Identity Security
  - Incident Response
  - NIS2
  - ISO 27001
  - GRC
  - Cybersecurity
  - Message Center
author: "Dimosthenis Atteia"
description: "Ανάλυση του MC1461704: το Microsoft Defender XDR ενοποιεί τις ενέργειες απόκρισης (disable, revoke session, force password change) σε όλους τους συνδεδεμένους λογαριασμούς μιας ταυτότητας, σε Active Directory, Entra ID, Okta, CyberArk, SailPoint και SaaS εφαρμογές, με την οπτική ενός CISO που σχεδιάζει incident response runbooks."
summary: "Μέχρι σήμερα, το να απενεργοποιήσεις έναν compromised χρήστη σήμαινε να ανοίξεις τρία ή τέσσερα διαφορετικά console, ένα για το AD, ένα για το Entra, ένα για το SaaS app, και να ελπίζεις ότι δεν ξέχασες κανένα. Το MC1461704 φέρνει αυτές τις ενέργειες σε ένα ενιαίο workflow μέσα από το Identity page, και αυτό αλλάζει άμεσα το πώς πρέπει να γράφονται τα playbooks απόκρισης."
categories: ["Microsoft 365 Security", "Identity Security"]
series:
releases:
  - "new-features"
ShowToc: true
TocOpen: false
weight: -7
cover:
  image: "images/defender-xdr-unified-identity-response/defender-xdr-cover.png"
  alt: "Μενού Actions στη σελίδα Identity του Microsoft Defender με ενοποιημένες ενέργειες απόκρισης σε πολλαπλούς λογαριασμούς"
  caption: "Defender portal → Identity page → Actions: ενιαίο workflow για disable, revoke session, force password change σε όλους τους συνδεδεμένους λογαριασμούς"
  relative: true
ShowReadingTime: true
ShowWordCount: true
---

Ένα από τα πράγματα που μαθαίνεις γρήγορα όταν χειρίζεσαι πραγματικό incident με compromised λογαριασμό είναι πόσο χρόνο τρώει η ίδια η **μηχανική** της απόκρισης. Όχι η ανάλυση, όχι η απόφαση «ναι, αυτός ο χρήστης είναι compromised», αλλά το καθαρά επιχειρησιακό κομμάτι: να ανοίξεις το Active Directory Users and Computers για να κλειδώσεις τον λογαριασμό, μετά το Entra admin center για να κάνεις revoke τα sessions, μετά ίσως το Okta ή το SaaS console της εφαρμογής που έχει πρόσβαση ο συγκεκριμένος χρήστης. Κάθε extra κλικ, κάθε extra tab, είναι χρόνος που ο επιτιθέμενος έχει ακόμα ενεργό session κάπου.

Το **MC1461704** έρχεται να χτυπήσει ακριβώς αυτό το πρόβλημα. Το Microsoft Defender XDR επεκτείνει τις ενέργειες απόκρισης σε ταυτότητες ώστε να λειτουργούν ενοποιημένα σε όλους τους συνδεδεμένους λογαριασμούς μιας identity, όχι πλέον σε ένα σύστημα τη φορά.

## Τι αλλάζει στην πράξη

Το Defender XDR ήδη γνωρίζει να συσχετίζει πολλαπλούς λογαριασμούς κάτω από μία ενιαία **identity** — ο ίδιος άνθρωπος μπορεί να έχει λογαριασμό στο on-prem Active Directory, λογαριασμό στο Entra ID, και ίσως έναν τρίτο σε κάποιο IAM σύστημα ή SaaS εφαρμογή. Μέχρι τώρα, το «βλέπεις» αυτή τη συσχέτιση δεν σήμαινε ότι μπορούσες και να **δράσεις** πάνω σε όλους τους λογαριασμούς μαζί.

Με αυτή την αλλαγή, ένας εξουσιοδοτημένος αναλυτής μπορεί να επιλέξει μία ενέργεια και να την εφαρμόσει είτε σε **όλους** τους λογαριασμούς που συνδέονται με μια ταυτότητα, είτε σε **επιλεγμένους** από αυτούς, μέσα από ένα ενιαίο workflow. Οι διαθέσιμες ενέργειες είναι:

- Disable account
- Enable account
- Revoke session
- Mark as compromised
- Force password change

Η διαθεσιμότητα κάθε ενέργειας εξαρτάται από το ποιο σύστημα ή connector διαχειρίζεται τον συγκεκριμένο λογαριασμό. Δεν μπορείς π.χ. να κάνεις revoke session σε λογαριασμό Active Directory, γιατί το AD δεν έχει την έννοια του cloud session, αλλά μπορείς να κάνεις force password change εκεί, ενώ σε Salesforce έχεις disable αλλά όχι revoke session ή mark as compromised. Είναι λεπτομέρειες που πρέπει να ξέρει καλά ο αναλυτής πριν βασιστεί τυφλά στο «unified» κομμάτι, γιατί ενοποιημένο workflow δεν σημαίνει ταυτόσημες δυνατότητες παντού.

Τα συστήματα και οι εφαρμογές που υποστηρίζονται είναι:

- Active Directory
- Microsoft Entra ID
- Okta
- CyberArk Identity
- SailPoint Identity Security Cloud
- Google Workspace
- Salesforce
- Box

Η ενέργεια μπορεί να ξεκινήσει από τέσσερα σημεία: τη σελίδα Identity, το side panel της ταυτότητας, το Advanced Hunting, ή το Action center. Η κατάσταση κάθε ενέργειας παρακολουθείται στο Action center, ενώ κάθε σύστημα-στόχος κρατάει το δικό του audit record.

Σημαντικό σημείο για όσους σχεδιάζουν automated response: καμία αλλαγή δεν συμβαίνει από μόνη της. Είτε την ενεργοποιεί χειροκίνητα ένας εξουσιοδοτημένος αναλυτής, είτε το κάνει το **Automatic Attack Disruption** του Defender ως μέρος υποστηριζόμενης αυτοματοποιημένης απόκρισης σε ενεργή επίθεση.

## Πότε και πού

Το rollout ξεκινάει **μέσα Οκτωβρίου 2026** και αναμένεται να ολοκληρωθεί μέχρι τα μέσα του ίδιου μήνα, για Worldwide, GCC, GCC High και DoD tenants. Δεν υπάρχει staged rollout σε επίπεδο εβδομάδων εδώ, το παράθυρο είναι σχετικά στενό, οπότε αν διαχειρίζεσαι incident response διαδικασίες, καλό είναι να το έχεις ήδη στο ραντάρ σου πριν φτάσει, όχι μετά.

## Ποιος επηρεάζεται

- SOC analysts
- Incident responders
- Διαχειριστές ταυτοτήτων
- Διαχειριστές που διαχειρίζονται συστήματα ταυτότητας συνδεδεμένα με το Defender

## Τι πρέπει να κάνεις πριν φτάσει το rollout

Το Microsoft σημείωμα λέει ξεκάθαρα ότι δεν απαιτείται ενέργεια για να ενεργοποιηθεί η δυνατότητα. Αυτό όμως δεν σημαίνει ότι δεν έχεις δουλειά να κάνεις, σημαίνει ότι η δουλειά είναι στο **να μην αποτύχει η ενέργεια τη στιγμή που τη χρειάζεσαι**. Τα σημεία που θα ήλεγχα εγώ πρώτα:

- **RBAC και ρόλοι.** Επιβεβαίωσε ποιοι ρόλοι Defender Unified RBAC και ποιοι ρόλοι Entra έχουν πρόσβαση σε ποιες ενέργειες. Δεν είναι όλες οι ενέργειες ίδιες, το revoke session σε Entra ζητάει διαφορετικά privileges από το force password change, και το mark as compromised είναι αποκλειστικά για Entra ID.
- **Action account για Active Directory.** Αν χρησιμοποιείς Defender for Identity sensor v3.x, βεβαιώσου ότι τρέχει με local system account, αλλιώς οι ενέργειες σε AD απλά δεν θα εκτελεστούν.
- **Credentials στους connectors.** Για Okta, CyberArk, SailPoint και τα SaaS apps, επιβεβαίωσε ότι τα credentials του κάθε connector επιτρέπουν πραγματικά τις ενέργειες που περιμένεις να είναι διαθέσιμες, όχι μόνο read-only πρόσβαση.
- **Identity Inventory integration.** Αν θέλεις τα SaaS cloud accounts να μπαίνουν στο response workflow, χρειάζεσαι ενεργοποιημένο Identity Inventory στο Defender for Cloud Apps.
- **Runbooks.** Ενημέρωσε τα incident response runbooks σου ώστε ο αναλυτής να ξέρει να επαληθεύει τους επιλεγμένους λογαριασμούς πριν επιβεβαιώσει μια bulk ενέργεια. Ένα λάθος κλικ σε «disable all linked accounts» πάνω σε λάθος identity δεν είναι κάτι που θέλεις να ανακαλύψεις μετά.

## Η οπτική NIS2 και ISO 27001

Το κομμάτι που με ενδιαφέρει περισσότερο εδώ δεν είναι η τεχνική ευκολία, είναι το πόσο άμεσα αγγίζει τη **μετρήσιμη ικανότητα απόκρισης** που ζητάει κάθε σοβαρό πλαίσιο διαχείρισης συμβάντων.

Το NIS2, στο πλαίσιο των μέτρων διαχείρισης περιστατικών, δεν ενδιαφέρεται μόνο για το αν έχεις πολιτική incident response, ενδιαφέρεται και για το **πόσο γρήγορα και πόσο πλήρως μπορείς να περιορίσεις ένα συμβάν**. Ένας compromised λογαριασμός που παραμένει ενεργός σε ένα από τα τρία-τέσσερα συστήματα όπου έχει πρόσβαση, επειδή ο αναλυτής πρόλαβε να κάνει disable μόνο στο Entra και ξέχασε το SaaS app, είναι ακριβώς το είδος του gap που ένας auditor θα εντοπίσει σε post-incident review. Η ενοποίηση της ενέργειας μειώνει αυτό το ρίσκο ανθρώπινου λάθους σε επίπεδο διαδικασίας, όχι μόνο σε επίπεδο εργαλείου.

Από την πλευρά του ISO 27001, αυτό πέφτει καθαρά πάνω στη λογική του A.5.24 (planning and preparation for incident management) και του A.5.26 (response to information security incidents). Το ότι μια ενέργεια απόκρισης μπορεί να τεκμηριωθεί με ενιαίο τρόπο, με ένα audit trail στο Action center που δείχνει τι ενέργεια έγινε, σε ποιους λογαριασμούς, από ποιον, και πότε, είναι ακριβώς το evidence artifact που θέλεις να έχεις έτοιμο όταν σου ζητηθεί να αποδείξεις πώς αντέδρασες σε ένα πραγματικό συμβάν.

## Το συμπέρασμα

Δεν είναι μια δυνατότητα που θα αλλάξει το threat model σου, είναι μια δυνατότητα που θα κόψει λεπτά, ίσως και ολόκληρα δευτερόλεπτα κρίσιμα, από τον χρόνο ανάμεσα στην ανίχνευση και τον περιορισμό ενός compromised λογαριασμού. Σε ένα incident, αυτά τα λεπτά είναι συχνά η διαφορά ανάμεσα σε ένα contained event και σε lateral movement που εξαπλώνεται σε τρία ακόμα συστήματα.

Αν διαχειρίζεσαι πολλαπλά identity providers ή SaaS connectors μέσα από το Defender, θα σου πρότεινα να περάσεις από τα RBAC roles σου **τώρα**, πριν φτάσει ο Οκτώβριος, ώστε η ομάδα σου να μην ανακαλύψει σε μέση κρίση ότι κάποιος δεν έχει το σωστό permission για να κάνει revoke session σε Okta.

Αν το έχεις ήδη δοκιμάσει ή αν βλέπεις κάποιο κενό στο RBAC μοντέλο που δεν αναφέρει το Message Center, χαίρομαι πάντα να το συζητήσουμε στα σχόλια ή στο LinkedIn.
