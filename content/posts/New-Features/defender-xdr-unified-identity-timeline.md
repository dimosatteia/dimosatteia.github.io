---
title: "Defender XDR: Το Timeline tab της ταυτότητας γίνεται πραγματικά ενιαίο, τι φέρνει το MC1461705"
date: 2026-08-27T08:00:00+03:00
lastmod: 2026-08-27T08:50:00+03:00
draft: true
keywords:
  - Microsoft Defender XDR
  - Identity Timeline tab
  - MC1461705
  - Investigate identities
  - Entra sign-in logs Timeline
  - Microsoft Graph audit events
  - Session ID token identifier
  - Conditional Access investigation
  - NIS2 τεκμηρίωση διερεύνησης
  - ISO 27001 A.8.16
tags:
  - Microsoft Defender XDR
  - Defender for Identity
  - Microsoft Entra ID
  - Identity Security
  - Threat Investigation
  - NIS2
  - ISO 27001
  - GRC
  - Cybersecurity
  - Message Center
author: "Dimosthenis Atteia"
description: "Ανάλυση του MC1461705: το Timeline tab στη σελίδα Identity του Microsoft Defender ενοποιεί sign-ins, Graph audit events, SaaS activity και device logons σε μία χρονολογική ροή, με νέα πεδία όπως Session ID και Unique token identifier, με την οπτική ενός CISO που χτίζει investigation runbooks."
summary: "Μέχρι σήμερα, η ανασύνθεση μιας χρονολογικής ακολουθίας γύρω από μια ύποπτη ταυτότητα σήμαινε pivoting ανάμεσα σε sign-in logs, audit logs και advanced hunting tables. Το MC1461705 φέρνει όλα αυτά σε ένα timeline, με πεδία σαν το Session ID και το Unique token identifier να μπαίνουν επιτέλους στο investigation view, όχι μόνο στο raw log."
categories: ["Microsoft 365 Security", "Identity Security"]
series:
releases:
  - "new-features"
ShowToc: true
TocOpen: false
weight: -6
cover:
  image: "images/defender-xdr-unified-identity-timeline/defender-xdr-cover.png"
  alt: "Timeline tab στη σελίδα Identity του Microsoft Defender με ενοποιημένη χρονολογική προβολή δραστηριότητας ταυτότητας"
  caption: "Defender portal → Identity page → Timeline: ενοποιημένη, χρονολογική προβολή activity και alerts από πολλαπλές πηγές ασφαλείας"
  relative: true
ShowReadingTime: true
ShowWordCount: true
---

Κάθε φορά που διερευνάς μια ύποπτη ταυτότητα σοβαρά, καταλήγεις να κάνεις το ίδιο πράγμα: ανοίγεις τα sign-in logs σε ένα tab, τα audit logs σε άλλο, ίσως ένα advanced hunting query για device logons σε τρίτο, και προσπαθείς νοερά να τα βάλεις σε σειρά χρόνου για να καταλάβεις τι ακριβώς έγινε και με ποια σειρά. Δουλεύει, αλλά τρώει χρόνο, και το χειρότερο, είναι εύκολο να χάσεις τη συσχέτιση ανάμεσα σε ένα sign-in event και ένα Graph audit event που συνέβη 40 δευτερόλεπτα μετά σε διαφορετικό tab.

Το **MC1461705** πάει να λύσει ακριβώς αυτό. Το Microsoft Defender XDR αναβαθμίζει το tab **Timeline** στη σελίδα Identity ώστε να προσφέρει μία, πραγματικά ενιαία, χρονολογική άποψη της δραστηριότητας και των alerts μιας ταυτότητας και των συνδεδεμένων λογαριασμών της.

## Τι αλλάζει στο Timeline

Το ενημερωμένο timeline κανονικοποιεί δραστηριότητα από πολλαπλά, ενσωματωμένα προϊόντα ασφαλείας της Microsoft, όχι πια μόνο από το Defender for Identity. Συγκεκριμένα συγκεντρώνει:

- Microsoft Entra sign-ins
- Microsoft Graph audit events
- SaaS cloud activity
- Device logon events

Αυτό που ξεχωρίζει δεν είναι μόνο η συγκέντρωση, είναι το πρόσθετο context. Τα Entra sign-ins και τα Graph audit events θα εμφανίζουν, όπου είναι διαθέσιμη, πληροφορία **risk** και **Conditional Access** απευθείας μέσα στο timeline. Αυτό σημαίνει ότι δεν χρειάζεται να πηδήξεις σε ξεχωριστό sign-in log για να δεις αν ένα event ενεργοποίησε κάποια πολιτική CA ή αν συνδέεται με risk level, το βλέπεις πάνω στην ίδια χρονολογική γραμμή που βλέπεις τα πάντα άλλα.

Έρχονται επίσης νέα, πολύ συγκεκριμένα πεδία φιλτραρίσματος και έρευνας:

- Source table
- Session ID
- Unique token identifier
- Conditional Access
- Target
- Additional information

Το **Session ID** και το **Unique token identifier** είναι, κατά τη γνώμη μου, τα δύο πιο χρήσιμα από τη λίστα για όποιον κάνει πραγματικό incident response. Σε ένα σενάριο token replay ή session hijacking, το να μπορείς να φιλτράρεις το timeline πάνω σε συγκεκριμένο session ή token identifier, αντί να ψάχνεις χειροκίνητα σε ξεχωριστά logs για να συσχετίσεις events, είναι ακριβώς το είδος λεπτομέρειας που κάνει τη διαφορά ανάμεσα σε μια διερεύνηση 20 λεπτών και μια διερεύνηση δύο ωρών.

Ένα ακόμα πρακτικό σημείο: το timeline θα ανανεώνεται αυτόματα όταν αλλάζουν οι συνδεδεμένοι λογαριασμοί μιας ταυτότητας. Αν δηλαδή προστεθεί νέος συσχετισμένος λογαριασμός κατά τη διάρκεια μιας έρευνας, δεν χρειάζεται να ανανεώσεις χειροκίνητα ή να ανοίξεις ξανά τη σελίδα για να τον δεις να εμφανίζεται.

Σημαντικό να το ξεκαθαρίσω, γιατί σε παρόμοιες ανακοινώσεις υπάρχει πάντα η ερώτηση: αυτή η αλλαγή **δεν** τροποποιεί υπάρχουσες πολιτικές ασφαλείας, λογαριασμούς χρηστών, δικαιώματα ή ρυθμίσεις. Είναι καθαρά αλλαγή στο investigation experience, όχι στο enforcement layer.

## Πότε και πού

Το rollout ξεκινάει **μέσα Σεπτεμβρίου 2026** και αναμένεται να ολοκληρωθεί μέχρι τα **μέσα Οκτωβρίου 2026**, για Worldwide, GCC, GCC High και DoD. Σε αντίθεση με το MC1461704 που έχει στενό παράθυρο rollout, εδώ έχεις περίπου έναν μήνα διαφοράς ανάμεσα στην έναρξη και την ολοκλήρωση, οπότε μην εκπλαγείς αν το δεις να εμφανίζεται σταδιακά, ίσως και σε κάποιο tenant σου νωρίτερα από κάποιο άλλο.

## Ποιος επηρεάζεται

- SOC analysts
- Incident responders
- Διαχειριστές ασφαλείας που διερευνούν ταυτότητες στο Defender portal

## Τι αξίζει να προετοιμάσεις

Δεν απαιτείται καμία ενέργεια για να ενεργοποιηθεί η βασική εμπειρία timeline, αλλά υπάρχουν λίγα πράγματα που, αν τα κάνεις τώρα, θα βγάλεις μεγαλύτερη αξία από την αλλαγή μόλις φτάσει:

- **Ενημέρωσε την ομάδα SOC.** Μια αλλαγή στο investigation UI που κανείς δεν ξέρει ότι υπάρχει είναι μια αλλαγή που κανείς δεν χρησιμοποιεί. Αξίζει ένα σύντομο briefing στην ομάδα, ειδικά για τα νέα πεδία Session ID και Unique token identifier.
- **Ξαναδές τα investigation runbooks.** Αν τα runbooks σου λένε στον αναλυτή «άνοιξε το advanced hunting και τρέξε αυτό το query για να δεις τα device logons», μέρος αυτής της δουλειάς μπορεί τώρα να γίνεται μέσα στο ίδιο το timeline. Αξίζει να επανεξετάσεις πού μπορείς να απλοποιήσεις βήματα.
- **Ενεργοποίησε Identity Inventory integration** στο Defender for Cloud Apps, μέσω **Settings > Cloud Apps**, αν θέλεις τα SaaS cloud accounts να εμφανίζονται πλήρως στο timeline.
- **Επιβεβαίωσε δικαιώματα.** Σιγουρέψου ότι οι αναλυτές σου έχουν τα κατάλληλα permissions για πρόσβαση σε identity investigation data στο Defender portal, ώστε να μη βρεθούν μπροστά σε άδειο tab τη στιγμή που το χρειάζονται περισσότερο.

## Η οπτική NIS2 και ISO 27001

Το κομμάτι που με ενδιαφέρει εδώ ως CISO είναι πόσο άμεσα αγγίζει την ικανότητα **τεκμηρίωσης μιας διερεύνησης**, όχι μόνο την ταχύτητά της.

Το NIS2 ζητάει να μπορείς να αποδείξεις πώς ανίχνευσες, ανέλυσες και αντέδρασες σε ένα συμβάν, με χρονολογική συνέπεια. Ένα ενιαίο timeline που συνδυάζει sign-ins, audit events, SaaS activity και device logons σε μία ροή, με πεδία όπως session και token identifiers, δεν είναι απλώς πιο βολικό, είναι και πιο **ελεγχόμενο**. Μειώνει τον χώρο για ασυνέπειες ανάμεσα σε αυτό που κατέγραψε ο αναλυτής στο incident report και αυτό που πραγματικά έδειχναν τα raw logs σε πολλαπλά συστήματα.

Στο πλαίσιο του ISO 27001, αυτό πέφτει καθαρά στη λογική του A.8.16 (monitoring activities) και στη γενικότερη απαίτηση για επαρκή evidence trail κατά τη διερεύνηση συμβάντων. Ένας auditor που ρωτάει «πώς επιβεβαιώσατε τη χρονική ακολουθία των ενεργειών γύρω από αυτόν τον compromised λογαριασμό» παίρνει τώρα μια πολύ πιο άμεση απάντηση: ένα ενιαίο timeline view, με φιλτράρισμα πάνω σε συγκεκριμένο session, αντί για ένα patchwork από ξεχωριστά exports.

## Το συμπέρασμα

Δεν είναι εντυπωσιακή αλλαγή με νέο εικονίδιο ή νέο module, είναι από αυτές τις αναβαθμίσεις που δεν προσέχεις μέχρι τη στιγμή που τη χρειάζεσαι μέσα σε μια πραγματική διερεύνηση, και τότε καταλαβαίνεις πόσο χρόνο σου γλίτωσε. Η προσθήκη Session ID και Unique token identifier ως φίλτρα είναι, κατά τη γνώμη μου, το πιο ουσιαστικό κομμάτι της ανακοίνωσης, γιατί μιλάει ακριβώς στο είδος διερεύνησης που έχει γίνει πιο συχνό τα τελευταία χρόνια: token-based attacks που δεν αφήνουν ίχνος στα «κλασικά» credential-based σενάρια.

Αν κάνεις ήδη investigations πάνω σε ταυτότητες μέσω του Defender portal, θα σου πρότεινα να δοκιμάσεις το νέο timeline στην πρώτη πραγματική περίπτωση που θα εμφανιστεί μετά το rollout, και να δεις πόσα από τα βήματα του runbook σου μπορούν πλέον να απλοποιηθούν.

Αν έχεις ήδη εμπειρία με το παλιό timeline και βλέπεις σημεία που θα ήθελες να καλυφθούν ακόμα, χαίρομαι πάντα να το συζητήσουμε στα σχόλια ή στο LinkedIn.
