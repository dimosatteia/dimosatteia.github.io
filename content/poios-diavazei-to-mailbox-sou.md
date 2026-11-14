---
title: "Ποιος διαβάζει το mailbox σου; Έλεγχος inbox rules και προώθησης στο Exchange Online"
date: 2026-11-14T16:00:00+02:00
lastmod: 2026-11-14T16:00:00+02:00
draft: false
url: "/poios-diavazei-to-mailbox-sou/"
slug: poios-diavazei-to-mailbox-sou
# Το link στο μενού ορίζεται εδώ, ώστε να εμφανίζεται μόνο όταν η σελίδα είναι δημοσιευμένη.
menu:
  main:
    identifier: tool-inbox-rules
    parent: tools
    name: "🕵️ Ποιος διαβάζει το mailbox σου;"
    weight: 17
author: "Dimosthenis Atteia"
description: "Δωρεάν εργαλείο: τρέξε ένα script στο Exchange Online, ανέβασε το αρχείο και δες ποιοι inbox rules και ποιες προωθήσεις στέλνουν, σβήνουν ή κρύβουν email, με σοβαρότητα, εξήγηση στα Ελληνικά, εντολές αποκατάστασης και KQL. Όλα στον browser σου."
seoTitle: "Ποιος διαβάζει το mailbox σου; Έλεγχος inbox rules (BEC)"
seoDescription: "Βρες κακόβουλους inbox rules και εξωτερική προώθηση σε όλα τα mailboxes του Microsoft 365: σοβαρότητα, εξήγηση στα Ελληνικά, εντολές και KQL. Όλα στον browser σου."
toolBlurb: "Τρέξε ένα script στο Exchange Online, ανέβασε το αρχείο και δες ποιοι inbox rules και ποιες προωθήσεις στέλνουν, σβήνουν ή κρύβουν email, με σοβαρότητα, εξήγηση στα Ελληνικά, εντολές αποκατάστασης, KQL και αναφορά .pdf. Το αρχείο δεν φεύγει από τον browser σου."
keywords:
  - κακόβουλοι inbox rules
  - suspicious inbox rules
  - Get-InboxRule
  - BEC inbox rule
  - email forwarding rule
  - RSS Feeds inbox rule
  - Exchange Online forwarding
  - παραβιασμένο mailbox
showToc: true
ShowReadingTime: false
ShowBreadCrumbs: false
hideMeta: true
# Στα «Πρόσφατα Άρθρα» της αρχικής, με βάση την ημερομηνία του
homeFeed: true
weight: -6
cover:
  image: "/images/tools/poios-diavazei-to-mailbox-sou.webp"
  alt: "Ένας inbox rule με όνομα «.» μετακινεί τα τιμολόγια στον φάκελο RSS Feeds, και δίπλα η σοβαρότητα «Κρίσιμο» με τα βήματα αποκατάστασης"
  maxWidth: 920
categories: ["Email & Collaboration"]
tags:
  - BEC
  - Inbox Rules
  - Exchange Online
  - Microsoft Defender for Office 365
  - Incident Response
  - PowerShell
  - Advanced Hunting
  - ΚΥΑ 1689/2025
  - NIS2
  - ISO 27001
  - GDPR
# MITRE ATT&CK®: ονόματα στο data/mitre.yaml
mitre: ["T1114.003", "T1564.008", "M1047"]
# Πλαίσιο «Last verified»
verification:
  - feature: "Get-InboxRule και η παράμετρος -IncludeHidden για τους κρυφούς κανόνες· δεν λειτουργεί με τους ρόλους View-Only Organization Management και Global Reader"
    status: "Generally Available"
    license: "Όλοι οι οργανισμοί με Exchange Online"
    source: "https://learn.microsoft.com/en-us/powershell/module/exchangepowershell/get-inboxrule"
    verified: 2026-11-13
  - feature: "Σημάδια ύποπτου inbox rule: λέξεις-κλειδιά, μετακίνηση σε RSS με MarkAsRead, διαγραφή χωρίς φίλτρο, εξωτερική προώθηση· KQL στο CloudAppEvents με New-InboxRule, Set-InboxRule, UpdateInboxRules"
    status: "Generally Available"
    license: "Microsoft Defender XDR· ο πίνακας CloudAppEvents χρειάζεται Microsoft Defender for Cloud Apps ή connector του Microsoft 365"
    source: "https://learn.microsoft.com/en-us/defender-xdr/alert-grading-playbook-inbox-manipulation-rules"
    verified: 2026-11-13
  - feature: "Βήματα αποκατάστασης παραβιασμένου mailbox: απενεργοποίηση ή αλλαγή κωδικού, ακύρωση συνεδριών, MFA, εφαρμογές, ρόλοι, προώθηση και inbox rules"
    status: "Generally Available"
    license: "Όλοι οι οργανισμοί με Exchange Online"
    source: "https://learn.microsoft.com/en-us/defender-office-365/responding-to-a-compromised-email-account"
    verified: 2026-11-13
  - feature: "Automatic forwarding rules στο outbound spam policy: Automatic - System-controlled, On, Off"
    status: "Generally Available"
    license: "Όλοι οι οργανισμοί με cloud mailboxes (Exchange Online Protection)"
    source: "https://learn.microsoft.com/en-us/defender-office-365/outbound-spam-policies-external-email-forwarding"
    verified: 2026-11-13
---

Σε σχεδόν κάθε περιστατικό BEC, το πρώτο που κάνει ο επιτιθέμενος μόλις μπει σε ένα mailbox είναι να φτιάξει έναν inbox rule. Τα τιμολόγια πάνε στον φάκελο RSS Feeds, οι απαντήσεις του προμηθευτή σβήνονται, κι ένα αντίγραφο κάθε μηνύματος φεύγει σε μια διεύθυνση Gmail. Ο χρήστης δεν βλέπει τίποτα, και ο κανόνας συνεχίζει να δουλεύει ακόμα κι αφού αλλάξει ο κωδικός.

Το εργαλείο αυτό ελέγχει όλα τα mailboxes του οργανισμού σου με μία κίνηση. Τρέχεις ένα script, ανεβάζεις το αρχείο, και βλέπεις ποιος κανόνας είναι ύποπτος, γιατί, και τι κάνεις τώρα. Δεν χρειάζεται εγγραφή, ούτε πρόσβαση στο tenant σου. Αν θέλεις πρώτα να δεις πώς δουλεύει, πάτησε «Δοκίμασε με παράδειγμα».

{{< inbox-rules-check >}}

## Πώς δουλεύει

Το script του βήματος 1 τρέχει στο Exchange Online PowerShell και μόνο διαβάζει. Για κάθε mailbox γράφει στο `inboxrules.json` δύο πράγματα: τους inbox rules του χρήστη, μαζί με τους κρυφούς που δεν φαίνονται στο Outlook, και την προώθηση που έχει οριστεί στο ίδιο το mailbox (SMTP forwarding). Η δεύτερη ορίζεται από admin, δεν φαίνεται στους κανόνες του χρήστη, και συχνά ξεχνιέται στους ελέγχους.

Στο εργαλείο, κάθε κανόνας ελέγχεται για τα σημάδια που περιγράφει η ίδια η Microsoft:

- **Προώθηση σε εξωτερική διεύθυνση** με ForwardTo, ForwardAsAttachmentTo ή RedirectTo. Αν προωθεί κάθε μήνυμα χωρίς φίλτρο, είναι «Κρίσιμο».
- **Διαγραφή κάθε εισερχόμενου** χωρίς φίλτρο, ή διαγραφή μηνυμάτων με λέξεις για πληρωμές και προειδοποιήσεις ασφάλειας.
- **Μετακίνηση σε φάκελο που κανείς δεν ανοίγει**, όπως RSS Feeds, Conversation History ή Archive, ιδίως μαζί με σήμανση ως αναγνωσμένο.
- **Λέξεις-κλειδιά** όπως invoice, πληρωμή, IBAN, phish, suspicious, ύποπτη σύνδεση, στα Αγγλικά και στα Ελληνικά.
- **Ονόματα χωρίς γράμματα**, όπως «.», «..» ή «,,,», για να μη φαίνεται ο κανόνας στη λίστα.

Δύο ή περισσότερα σημάδια μαζί ανεβάζουν τη σοβαρότητα σε «Κρίσιμο». Ένας απενεργοποιημένος κανόνας πέφτει ένα επίπεδο, γιατί δεν δουλεύει τώρα, αλλά μένει στη λίστα: ο επιτιθέμενος τον ενεργοποιεί ξανά με ένα κλικ.

Για να ξεχωρίσει τι είναι εξωτερικό, το εργαλείο παίρνει τα domains από τα ίδια τα mailboxes. Αν έχεις θυγατρικές ή άλλα domains, πρόσθεσέ τα στο βήμα 3, αλλιώς η προώθηση προς αυτά θα σημειωθεί ως εξωτερική.

## Τι κάνεις αν βρεις κάτι

Η σειρά έχει σημασία. Πρώτα **απενεργοποιείς** τον κανόνα και την προώθηση, με τις εντολές που σου δίνει το εργαλείο σε κάθε mailbox. Το `Disable-InboxRule` κρατά τον κανόνα ως τεκμήριο για τη διερεύνηση, ενώ το `Remove-InboxRule` τον σβήνει. Μετά ακυρώνεις τις ενεργές συνεδρίες του χρήστη και αλλάζεις τον κωδικό. Η αλλαγή κωδικού μόνη της δεν φτάνει, γιατί ο επιτιθέμενος συνεχίζει με τα tokens που ήδη έχει.

Ύστερα ελέγχεις τις μεθόδους MFA, τις εφαρμογές και τους ρόλους του λογαριασμού, και τρέχεις το KQL του εργαλείου στο Advanced hunting. Εκεί βλέπεις πότε φτιάχτηκε κάθε κανόνας, από ποια IP και από ποια χώρα. Από την ίδια IP βρίσκεις συχνά κι άλλους λογαριασμούς που παραβιάστηκαν την ίδια μέρα.

Τέλος, κλείνεις την πόρτα για το μέλλον. Στο outbound spam policy του Microsoft Defender, όρισε τα Automatic forwarding rules σε **Off**. Η προεπιλογή «Automatic - System-controlled» δεν σημαίνει Off σε κάθε tenant: σε όσα χρησιμοποιούσαν ήδη την προώθηση πριν το 2021, μπορεί να ισοδυναμεί με On. Όσοι χρήστες χρειάζονται πραγματικά εξωτερική προώθηση μπαίνουν σε ξεχωριστή πολιτική.

{{< tool-link page="/giati-pige-sta-junk" lead="Ο επιτιθέμενος έστειλε email από το mailbox;" label="Ανάλυσε τα headers ενός ύποπτου μηνύματος" tail="και δες τι αποφάσισε το Microsoft 365 γι' αυτό." >}}

## Τι δεν μπορεί να σου πει

- **Αν ο κανόνας είναι επίθεση ή νόμιμος.** Πολλοί χρήστες έχουν κανόνες που διαγράφουν ή μετακινούν μηνύματα. Το εργαλείο σημειώνει τα σημάδια, την απόφαση την παίρνεις εσύ, με τον χρήστη και με τα logs.
- **Κανόνες που υπάρχουν μόνο στο Outlook της συσκευής.** Οι client-only rules δεν αποθηκεύονται στον server και δεν φαίνονται στο `Get-InboxRule`.
- **Άλλους τρόπους πρόσβασης στο mailbox.** Mail flow rules του admin, δικαιώματα delegate (Full Access, Send As) και εφαρμογές με δικαίωμα Mail.Read δεν ελέγχονται εδώ.

## Γιατί έχει σημασία για τη συμμόρφωση

Η ΚΥΑ 1689/2025 ζητά τακτικό έλεγχο των καταγραφών για ύποπτη δραστηριότητα ([απαίτηση 24.ε](/kya-1689-2025/#24-ε)), διαδικασίες διαχείρισης περιστατικών ([24.α](/kya-1689-2025/#24-α)) και έλεγχο των μηνυμάτων ηλεκτρονικού ταχυδρομείου ([20.γ](/kya-1689-2025/#20-γ)). Η Οδηγία NIS2 ζητά χειρισμό περιστατικών ([21.2.β](/nis2/#21-2-β)) και, για σημαντικό περιστατικό, έγκαιρη προειδοποίηση εντός 24 ωρών ([23.4.α](/nis2/#23-4-α)). Στο ISO/IEC 27001 αφορά την αξιολόγηση των συμβάντων ([A.5.25](/iso-27001/#A-5-25)), την απόκριση στα περιστατικά ([A.5.26](/iso-27001/#A-5-26)) και την παρακολούθηση ([A.8.16](/iso-27001/#A-8-16)).

Στον GDPR, ένα mailbox που προωθούσε email σε τρίτο είναι σχεδόν πάντα παραβίαση προσωπικών δεδομένων. Αφορά την ασφάλεια των συστημάτων ([32.1.β](/gdpr/#32-1-β)) και τη γνωστοποίηση στην Αρχή Προστασίας Δεδομένων εντός 72 ωρών ([33.1](/gdpr/#33-1)). Η αναφορά .pdf του εργαλείου, μαζί με τα αποτελέσματα του KQL, είναι το πρώτο τεκμήριο για τον φάκελο του περιστατικού.

> 🛠️ **Επιβεβαιώθηκε παραβίαση;** [Ετοίμασε την αναφορά περιστατικού προς την Εθνική Αρχή Κυβερνοασφάλειας](/anafora-peristatikou/), με επιλογή για την έγκαιρη προειδοποίηση των 24 ωρών ή την αναφορά των 72 ωρών.

> 🛠️ **Θες τα queries ανά απαίτηση;** [Δες τη βιβλιοθήκη KQL](/kql/) για το Defender XDR, αντιστοιχισμένη σε ΚΥΑ 1689/2025, NIS2 και ISO 27001.

## Απόρρητο

Το thecybersec.gr δεν έχει server που να δέχεται το αρχείο σου. Η ανάλυση γίνεται εξ ολοκλήρου μέσα στον browser σου, και το περιεχόμενο δεν αποθηκεύεται, ούτε στο localStorage. Αν έχεις αποδεχτεί τα cookies ανάλυσης, το πλαίσιο κειμένου και τα αποτελέσματα αποκρύπτονται από την καταγραφή του Microsoft Clarity. Περισσότερα στην [πολιτική απορρήτου](/privacy/).

Η ερμηνεία είναι ενδεικτική και δεν αντικαθιστά τη διερεύνηση στο δικό σου περιβάλλον. Το thecybersec.gr είναι προσωπικό blog και δεν εκπροσωπεί τη Microsoft ή την Εθνική Αρχή Κυβερνοασφάλειας.

## Πηγές και επαλήθευση {#last-verified}

{{< verification >}}
