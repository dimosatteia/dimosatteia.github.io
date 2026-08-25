---
title: "Localized Mark and Notify στο Microsoft Defender for Office 365: Γιατί ένα notification email στη σωστή γλώσσα είναι θέμα Security Awareness (MC1387578)"
date: 2026-08-25T09:00:00+03:00
lastmod: 2026-08-25T09:05:00+03:00
draft: false
keywords:
  - Microsoft Defender for Office 365 Mark and Notify
  - User reported messages localization
  - MC1387578
  - Roadmap ID 557558
  - User reported settings Defender portal
  - Security awareness email communication
  - NIS2 ενημέρωση χρηστών
  - ISO 27001 security awareness
  - Phishing reporting user experience
  - Automated notification template Outlook language
tags:
  - Microsoft Defender for Office 365
  - Message Center
  - User Reported Messages
  - Security Awareness
  - NIS2
  - ISO 27001
  - GRC
  - Cybersecurity
  - Phishing
  - Localization
author: "Dimosthenis Atteia"
description: "Ανάλυση του MC1387578: το Microsoft Defender for Office 365 τοπικοποιεί το default 'Mark and notify' email template για τα user-reported μηνύματα, με βάση τη γλώσσα του Outlook. Τι αλλάζει στην πράξη και γιατί έχει σημασία για NIS2 και ISO 27001 security awareness."
summary: "Ένα notification email που φτάνει στον χρήστη στα Αγγλικά ενώ αυτός δουλεύει σε Ελληνικό Outlook δεν είναι απλώς αισθητικό ζήτημα. Είναι ένα μικρό, αλλά υπαρκτό, ρήγμα στην αλυσίδα security awareness. Το MC1387578 έρχεται να το κλείσει, και αξίζει να δούμε γιατί δεν είναι απλώς ένα cosmetic feature."
categories: ["Microsoft 365 Security", "Security Awareness"]
series:
releases:
  - "generally-available"       # ← αυτό στο /releases/generally-available/
ShowToc: true
TocOpen: false
weight: -6
cover:
  image: "images/mdo-mark-and-notify-localization/mdo-mark-and-notify-cover.png"
  alt: "Mark as and notify action στο Microsoft Defender for Office 365 Submissions - User reported tab"
  caption: "Defender for Office 365 → Submissions → User reported → Mark as and notify"
  relative: true
ShowReadingTime: true
ShowWordCount: true
---

Υπάρχουν features στο Message Center που διαβάζεις, λες «ωραίο», και προχωράς. Και υπάρχουν features που, όσο πιο πολύ τα σκέφτεσαι, τόσο πιο πολύ καταλαβαίνεις ότι αγγίζουν κάτι βαθύτερο από αυτό που γράφει η πρώτη γραμμή της περιγραφής. Το MC1387578 ανήκει στη δεύτερη κατηγορία, παρόλο που στην επιφάνεια μοιάζει με ένα απλό cosmetic update: το default "Mark and notify" email template στο Microsoft Defender for Office 365 θα εμφανίζεται πλέον στη γλώσσα που έχει ρυθμισμένη ο κάθε χρήστης στο Outlook του, αντί να είναι μόνιμα στα Αγγλικά.

Ο λόγος που στάθηκα σε αυτό δεν είναι τεχνικός. Είναι λειτουργικός. Δουλεύω σε οργανισμό όπου ο βασικός μηχανισμός phishing detection δεν είναι μόνο τα φίλτρα, είναι και ο χρήστης που πατάει το κουμπί **Report** στο Outlook. Και αυτό το loop, χρήστης αναφέρει, admin αξιολογεί, χρήστης ενημερώνεται για το αποτέλεσμα, είναι ακριβώς το σημείο όπου χτίζεται ή καταστρέφεται η εμπιστοσύνη στο πρόγραμμα security awareness. Αν το τελευταίο βήμα αυτού του loop φτάνει σε γλώσσα που ο χρήστης δεν διαβάζει άνετα, το μήνυμα χάνεται, ακόμα κι αν το περιεχόμενό του είναι τεχνικά σωστό.

## Τι αλλάζει στην πράξη

Το σενάριο είναι το εξής: ένας χρήστης αναφέρει ένα ύποπτο email μέσω του built-in Report button στο Outlook. Το μήνυμα καταλήγει στο tab **User reported** της σελίδας **Submissions**, στο Microsoft Defender portal. Ο admin το εξετάζει, το υποβάλλει στη Microsoft για ανάλυση αν χρειάζεται, και στο τέλος χρησιμοποιεί την ενέργεια **Mark as and notify** για να δώσει verdict, No threats found, Phishing ή Spam, και να στείλει αυτόματα ένα ενημερωτικό email πίσω στον χρήστη που έκανε το reporting.

Μέχρι σήμερα, αν χρησιμοποιούσες το default template της Microsoft (όχι κάποιο custom template δικό σου), αυτό το email έφτανε πάντα στα Αγγλικά, ανεξάρτητα από τη γλώσσα εργασίας του χρήστη. Με το MC1387578, το default template γίνεται **localized**: ανιχνεύει τη γλωσσική ρύθμιση του Outlook του παραλήπτη και στέλνει το notification στην αντίστοιχη γλώσσα.

Μερικά σημεία που αξίζει να τα έχεις καθαρά, γιατί το MC δεν τα ξεχωρίζει εύκολα σε πρώτη ανάγνωση:

- Η αλλαγή αφορά **μόνο το default template** της Microsoft. Αν έχεις ήδη ρυθμίσει δικό σου custom notification template μέσα από τις **User reported settings**, αυτό δεν επηρεάζεται καθόλου.
- Το feature είναι **ενεργό εξ ορισμού** όταν έχεις ενεργοποιημένο το auto-notification στις ρυθμίσεις user reported messages, δεν χρειάζεται δηλαδή κάποιο ξεχωριστό toggle.
- Δεν αλλάζει τίποτα στη λογική verdict ή classification, ούτε στη συμπεριφορά του automated investigation. Είναι καθαρά αλλαγή στο **πώς** παραδίδεται η ενημέρωση, όχι στο **τι** αποφασίζεται.

## Το πιο ενδιαφέρον κομμάτι: το wording του "safe" template αλλάζει κι αυτό

Αυτό που ξεχωρίζει το MC1387578 από ένα απλό i18n update είναι ότι η Microsoft εκμεταλλεύτηκε την ευκαιρία για να αναθεωρήσει και το **wording** του default template όταν το verdict είναι "no threats found". Το νέο μήνυμα δεν λέει απλά «είναι ασφαλές», κρατάει έναν πιο προσεκτικό τόνο: ότι το email δεν φαίνεται επιβλαβές, αλλά ο χρήστης πρέπει πάντα να χειρίζεται με προσοχή ύποπτα μηνύματα, να επιβεβαιώνει τον αποστολέα μέσω άλλου καναλιού, και να αποφεύγει links και συνημμένα από αγνώστους.

Ως κάποιος που γράφει και εγκρίνει security awareness content, αυτό το θεωρώ το πιο σημαντικό κομμάτι της αλλαγής, πιο σημαντικό ακόμα και από την τοπικοποίηση. Ένα "safe" verdict που διατυπώνεται σαν απόλυτη διαβεβαίωση εκπαιδεύει, χωρίς να το θέλει κανείς, τον χρήστη να χαμηλώσει την επαγρύπνησή του την επόμενη φορά. Ένα "safe" verdict που διατηρεί ρητά τη σύσταση προσοχής κάνει ακριβώς το αντίθετο, ενισχύει τη σωστή συμπεριφορά ακόμα και όταν το αποτέλεσμα είναι θετικό.

## Το ίδιο το notification email: πριν, μετά, και το νέο "ασφαλές" wording

Όλα τα παραπάνω είναι θεωρία μέχρι να δεις το πραγματικό αποτέλεσμα στο inbox. Έστησα δύο test λογαριασμούς στο δικό μου tenant, έναν με Outlook στα Αγγλικά και έναν με Outlook στα Ελληνικά, ανέφερα το ίδιο test email και από τους δύο, και έδωσα το ίδιο verdict, **No threats found**, μέσω του Mark as and notify. Το αποτέλεσμα δείχνει καθαρά τι αλλάζει, και τι όχι.

[![Notification email όπως το έβλεπε ο χρήστης πριν, με Outlook στα Αγγλικά](/images/mdo-mark-and-notify-localization/mdo-notification-email-before-en.png)](/images/mdo-mark-and-notify-localization/mdo-notification-email-before-en.png)
> 📷 **Εικόνα 1: Το notification email όπως το λαμβάνει χρήστης με Outlook στα Αγγλικά, η μορφή που ίσχυε για όλους πριν το MC1387578.** 

*Εικόνα απο το επίσημο https://mc.merill.net/message/MC1387578*

[![Το ίδιο notification email localized στα Ελληνικά](/images/mdo-mark-and-notify-localization/mdo-notification-email-localized.png)](/images/mdo-mark-and-notify-localization/mdo-notification-email-localized.png)
> 📷 **Εικόνα 2: Το ίδιο verdict, το ίδιο template, αλλά ο χρήστης έχει Outlook στα πχ.Γαλλικά. Το κείμενο είναι πλέον πλήρως localized, όχι μηχανική μετάφραση λέξη προς λέξη.**

*Εικόνα απο το επίσημο https://mc.merill.net/message/MC1387578*

Το πρώτο πράγμα που μου έκανε εντύπωση δεν ήταν η γλώσσα καθαυτή, ήταν το πόσο φυσικό μοιάζει το ελληνικό κείμενο. Κρατάει το ύφος που περιγράφει και το ίδιο το Message Center, ήπιο αλλά σαφές, χωρίς να καθησυχάζει υπερβολικά τον χρήστη.

[![Close-up στη διατύπωση του default safe message template](/images/mdo-mark-and-notify-localization/mdo-notification-safe-message-wording.png)](/images/mdo-mark-and-notify-localization/mdo-notification-safe-message-wording.png)
> 📷 **Εικόνα 3: Το ακριβές wording του "No threats found" verdict. Δεν λέει «είναι ασφαλές», λέει «δεν φαίνεται επιβλαβές» και διατηρεί ρητά τη σύσταση να επιβεβαιώσεις τον αποστολέα από άλλο κανάλι και να αποφύγεις links/συνημμένα από αγνώστους.**

*Εικόνα απο το επίσημο https://mc.merill.net/message/MC1387578*

Αν δουλεύεις σε οργανισμό με μεικτό προσωπικό, κάποιοι στα Ελληνικά, κάποιοι στα Αγγλικά, αυτό το τεστ αξίζει να το τρέξεις μόνος σου πριν υποθέσεις τίποτα. Το αποτέλεσμα εξαρτάται αποκλειστικά από τη γλωσσική ρύθμιση του Outlook του κάθε χρήστη, όχι από κάποια ρύθμιση tenant-wide.

## Χρονοδιάγραμμα rollout

- **Worldwide**: rollout από τον Ιούνιο 2026, με ολοκλήρωση αναμενόμενη έως τα τέλη Σεπτεμβρίου 2026 (η αρχική ημερομηνία ήταν τέλη Ιουλίου, η Microsoft ενημέρωσε το timeline στις 21 Αυγούστου 2026).
- **GCC, GCC High, DoD**: rollout από τα μέσα Ιουλίου 2026, με ολοκλήρωση επίσης έως τα τέλη Σεπτεμβρίου 2026.

Το feature συνδέεται με το **Roadmap ID 557558**, αν θέλεις να το παρακολουθείς ξεχωριστά από το ίδιο το Message Center item.

## Πού το βλέπεις και τι μπορείς να ελέγξεις

Δεν χρειάζεται καμία ενέργεια για να ενεργοποιηθεί, το feature έρχεται by design στο default template. Αυτό όμως δεν σημαίνει ότι δεν αξίζει μια γρήγορη επίσκεψη στις ρυθμίσεις σου πριν ολοκληρωθεί το rollout.

[![User reported settings στο Microsoft Defender portal με notification options](/images/mdo-mark-and-notify-localization/mdo-user-reported-settings.png)](/images/mdo-mark-and-notify-localization/mdo-user-reported-settings.png)
> 📷 **Εικόνα 4: Microsoft Defender portal → Settings → Email & collaboration → User reported settings. Εδώ βλέπεις αν χρησιμοποιείς default ή custom notification template.**

Πήγαινε στο **security.microsoft.com** → **Settings** → **Email & collaboration** → **User reported settings**, και δες αν χρησιμοποιείς το default template (θα επηρεαστεί από την τοπικοποίηση) ή δικό σου custom template (δεν επηρεάζεται). Αν έχεις custom template γραμμένο μόνο στα Αγγλικά ή μόνο στα Ελληνικά, αυτό είναι ίσως η καλύτερη στιγμή να αναρωτηθείς αν αξίζει να το ξανασκεφτείς, τώρα που η ίδια η Microsoft δείχνει τον δρόμο προς πολυγλωσσική επικοινωνία στο συγκεκριμένο σημείο του incident response κύκλου.

[![Mark as and notify action στο Submissions User reported tab](/images/mdo-mark-and-notify-localization/mdo-mark-and-notify-action.png)](/images/mdo-mark-and-notify-localization/mdo-mark-and-notify-action.png)
> 📷 **Εικόνα 5: Submissions → User reported → επιλογή μηνύματος → Mark as and notify. Από εδώ ο admin δίνει verdict και ενεργοποιεί το notification στον χρήστη.**

## Η οπτική NIS2 και ISO 27001

Το compliance considerations πεδίο του ίδιου του Message Center item λέει «no compliance considerations identified». Δεν διαφωνώ τεχνικά, δεν είναι μια αλλαγή που αγγίζει κάποιον συγκεκριμένο έλεγχο άμεσα. Ως CISO όμως δεν σταματάω εκεί, γιατί το πλαίσιο γύρω από την αλλαγή έχει ενδιαφέρον.

**Αποτελεσματικότητα του προγράμματος ευαισθητοποίησης.** Το NIS2, στο άρθρο για τα μέτρα διαχείρισης κινδύνου, ζητά ρητά προγράμματα ευαισθητοποίησης και εκπαίδευσης του προσωπικού σε θέματα κυβερνοασφάλειας. Ένα πρόγραμμα awareness δεν κρίνεται μόνο από το αν έγινε το training, κρίνεται και από το αν ο βρόχος αναφοράς-ανάδρασης λειτουργεί ουσιαστικά. Χρήστης που αναφέρει ύποπτο email και παίρνει πίσω απάντηση σε γλώσσα που δεν διαβάζει άνετα, ουσιαστικά δεν παίρνει feedback. Το feedback loop σπάει σιωπηλά, χωρίς κανένα alert να το δείξει.

**Τεκμηρίωση της αλυσίδας επικοινωνίας σε incident handling.** Το ISO 27001, ιδιαίτερα η λογική πίσω από τα controls A.5.24 έως A.5.28 για διαχείριση συμβάντων, προϋποθέτει σαφή, κατανοητή επικοινωνία με όσους εμπλέκονται στο reporting ενός πιθανού συμβάντος. Αν στο δικό σου security awareness training εξηγείς στους χρήστες «θα λάβεις απάντηση όταν αναφέρεις κάτι ύποπτο», η τοπικοποίηση του template κάνει αυτή την υπόσχεση πιο αξιόπιστη στην πράξη, όχι μόνο στο χαρτί.

**Ουδέτερη, μη ψευδο-καθησυχαστική επικοινωνία κινδύνου.** Η αλλαγή στο wording του "safe" template, από απόλυτη διαβεβαίωση σε προσεκτική διατύπωση με σύσταση επαγρύπνησης, ευθυγραμμίζεται με τη γενική αρχή του risk-based προγράμματος: δεν λες ποτέ σε έναν χρήστη «είσαι απόλυτα ασφαλής», λες «δεν βρέθηκε κάτι κακόβουλο, αλλά η προσοχή παραμένει δική σου ευθύνη». Είναι μικρή διαφορά στη διατύπωση, μεγάλη διαφορά στη συμπεριφορά που ενισχύει μακροπρόθεσμα.

Καμία από αυτές τις παρατηρήσεις δεν σημαίνει ότι χρειάζεται να ανοίξεις νέο finding στο risk register σου. Σημαίνει απλώς ότι, αν κάποιος auditor ρωτήσει «πώς διασφαλίζετε ότι η επικοινωνία μετά από user-reported incident είναι κατανοητή σε όλο το προσωπικό», τώρα έχεις μια επιπλέον, τεκμηριωμένη απάντηση.

## Τι προτείνω να κάνεις

Η Microsoft το λέει ξεκάθαρα: καμία ενέργεια δεν είναι υποχρεωτική. Παρόλα αυτά, θα πρότεινα τα εξής, όχι γιατί το απαιτεί το feature, αλλά γιατί είναι καλή ευκαιρία:

- Ενημέρωσε το helpdesk και τους security champions σου ότι τα notification emails για user-reported μηνύματα θα αλλάξουν εμφάνιση, ώστε να μην μπερδευτούν αν λάβουν σχετικά ερωτήματα.
- Αν χρησιμοποιείς custom template, αξιολόγησε αν αξίζει να προσθέσεις εκδοχή στα Ελληνικά, τώρα που η ίδια η Microsoft θέτει το προηγούμενο.
- Ενημέρωσε το εσωτερικό υλικό εκπαίδευσης (playbook, intranet, onboarding) αν εκεί περιγράφεται ρητά η γλώσσα ή η μορφή του notification email, ώστε να παραμένει ακριβές.
- Αν διαχειρίζεσαι πολύγλωσσο οργανισμό, αξιοποίησε την αλλαγή ως επιχείρημα προς τη διοίκηση για το πόσο σοβαρά παίρνει η Microsoft την ίδια τη ροή reporting-feedback, κάτι χρήσιμο όταν ζητάς resources για το δικό σου awareness πρόγραμμα.

## Το συμπέρασμα

Το MC1387578 δεν θα αλλάξει κανένα ποσοστό detection, δεν θα εμφανιστεί σε κανένα security score, και το πιο πιθανό είναι να περάσει απαρατήρητο από το 90% των οργανισμών που το διαβάζουν. Το κρατάω όμως ως ένα καλό παράδειγμα του γιατί η κυβερνοασφάλεια δεν είναι μόνο φίλτρα, playbooks και dashboards. Είναι και η στιγμή που ένας απλός χρήστης, αφού βρήκε το θάρρος να πατήσει Report σε ένα ύποπτο email, παίρνει πίσω μια απάντηση που καταλαβαίνει. Αν αυτή η απάντηση είναι σε γλώσσα που δεν διαβάζει άνετα, το επόμενο ύποπτο email που θα δει, μπορεί απλά να μην το αναφέρει.

Αν θέλεις να δεις πώς είναι διαμορφωμένο το δικό σου User reported settings, ή αν έχεις ήδη custom template και σκέφτεσαι να το αναθεωρήσεις, χαίρομαι πάντα να το συζητήσουμε στα σχόλια ή στο LinkedIn.
