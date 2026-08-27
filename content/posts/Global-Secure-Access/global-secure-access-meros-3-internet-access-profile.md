---
title: "Global Secure Access Μέρος 3: Το Internet access profile ως Secure Web Gateway"
date: 2026-08-31T09:00:00+03:00
lastmod: 2026-08-31T09:30:00+03:00
draft: true
keywords:
  - Microsoft Entra Internet Access
  - Internet access profile Global Secure Access
  - Secure Web Gateway SWG
  - Web content filtering Entra
  - Security profiles priority
  - Baseline security profile
  - Compliant Network location
  - Conditional Access network conditions
  - NIS2 φιλτράρισμα πρόσβασης internet
  - ISO 27001 A.8.23 web filtering
tags:
  - Microsoft Entra ID
  - Global Secure Access
  - Conditional Access
  - Network Security
  - NIS2
  - ISO 27001
  - GRC
  - Cybersecurity
  - Zero Trust
  - SSE
author: "Dimosthenis Atteia"
description: "Τρίτο μέρος σειράς άρθρων για το Microsoft Global Secure Access. Ανάλυση του Internet access profile ως Secure Web Gateway, web content filtering, security profiles και priority logic, με έμφαση σε NIS2 και ISO 27001."
summary: "Αν το Microsoft traffic profile είναι το θεμέλιο, το Internet access profile είναι αυτό που κάνει το Global Secure Access να μοιάζει με πραγματικό Secure Web Gateway. Εδώ μπαίνει το web content filtering, τα security profiles, και η δυνατότητα να αποκλείσεις πρόσβαση σε cloud apps από οπουδήποτε εκτός του δικού σου δικτύου."
categories: ["Microsoft 365 Security", "Network Security", "Global Secure Access"]
series: ["Global Secure Access"]
slug: "global-secure-access-meros-3-internet-access-profile"
ShowToc: true
TocOpen: false
weight: -8
cover:
  image: "images/global-secure-access-series/global-secure-access-dashboard-cover.png"
  alt: "Global Secure Access dashboard στο Microsoft Entra admin center"
  caption: "Global Secure Access → Dashboard, το σημείο εκκίνησης για το Internet access profile"
  relative: true
ShowReadingTime: true
ShowWordCount: true
---

Στο [Μέρος 1](/posts/global-secure-access-meros-1-ti-einai-sse/) είδαμε τη φιλοσοφία πίσω από το SSE και το Global Secure Access γενικότερα, και στο [Μέρος 2](/posts/global-secure-access-meros-2-microsoft-traffic-profile/) μπήκαμε στο Microsoft traffic profile, το θεμέλιο που φροντίζει για τη βέλτιστη δρομολόγηση της κίνησης προς Microsoft 365. Σε αυτό το τρίτο μέρος περνάμε σε αυτό που, ας είμαστε ειλικρινείς, τραβάει τη μεγαλύτερη προσοχή όταν κάποιος βλέπει το Global Secure Access για πρώτη φορά: το **Internet access profile**, το κομμάτι που λειτουργεί ως πλήρες Secure Web Gateway για ό,τι δεν καλύπτεται ήδη από το Microsoft traffic profile.

## Τι ακριβώς προστατεύει, και τι δεν προστατεύει

Το Internet access profile καλύπτει την πρόσβαση στο δημόσιο internet και σε SaaS εφαρμογές, με μια σημαντική διευκρίνιση που ανέφερα και στο Μέρος 2: **δεν** περιλαμβάνει προορισμούς που ήδη καλύπτονται από το Microsoft traffic profile. Αν θέλεις πλήρη κάλυψη, και των δύο κατηγοριών κίνησης, η επίσημη σύσταση της Microsoft είναι να ενεργοποιείς το Microsoft traffic profile μαζί με το Internet access profile, όχι το ένα χωρίς το άλλο. Το Internet access profile λειτουργεί με μια προσυμπληρωμένη λίστα κανονικών εκφράσεων για FQDNs και IP διευθύνσεις που αντιπροσωπεύουν το δημόσιο internet γενικά, όχι μια χειροκίνητη λίστα που φτιάχνεις εσύ από το μηδέν.

## Πώς στήνεται η βασική σύνδεση

Πριν από οτιδήποτε άλλο, στο **Global Secure Access → Settings → Session management → Adaptive access**, χρειάζεται να ενεργοποιηθεί το **«Enable Conditional Access signaling for Entra ID»**. Αυτό το toggle είναι αυτό που συνδέει το δίκτυο με το Conditional Access, χωρίς αυτό το Internet access profile λειτουργεί ως απομονωμένο δίκτυο, χωρίς να μπορεί να γίνει signal ή condition μέσα σε πολιτικές. Μόλις ενεργοποιηθεί, εμφανίζεται αυτόματα ένα νέο named location στο Conditional Access, το **«All Compliant Network locations»**.

[![Global Secure Access adaptive access toggle για Conditional Access signaling](/images/global-secure-access-series/adaptive-access-conditional-access-signaling.png)](/images/global-secure-access-series/adaptive-access-conditional-access-signaling.png)
> 📷 **Εικόνα 1: Global Secure Access → Session management → Adaptive access. Το κρίσιμο toggle που συνδέει το δίκτυο με το Conditional Access.**

Στη συνέχεια, στο **Connect → Traffic forwarding**, ενεργοποιείς το Internet access profile. Το ίδιο profile πρέπει να ανατεθεί σε χρήστες ή ομάδες πριν αρχίσει να έχει πρακτικό αποτέλεσμα, μπορείς να το κάνεις για όλους ή σταδιακά, για ένα pilot group. Ο client εγκαθίσταται σε Windows, Android, iOS ή macOS, και σε Windows απαιτείται η συσκευή να είναι Microsoft Entra joined.

## Το βασικό Conditional Access σενάριο: block χωρίς client

Η ύπαρξη του named location «All Compliant Network locations» επιτρέπει το πιο βασικό και ίσως πιο χρήσιμο σενάριο: μια πολιτική που **αποκλείει πρόσβαση σε cloud apps από οπουδήποτε εκτός** αυτού του δικτύου. Χρήστης ή ομάδα, όλα τα resources, network condition «any location» εκτός «All Compliant Network locations», grant control block. Αν κάποιος απενεργοποιήσει το Global Secure Access client στη συσκευή του, χάνει αμέσως πρόσβαση στα resources που έχεις ορίσει ως target, μέχρι να το ενεργοποιήσει ξανά.

Πάνω σε αυτό μπορείς να χτίσεις κι άλλο επίπεδο, μια δεύτερη πολιτική που στοχεύει σε «All Internet Resources with Global Secure Access» και απαιτεί, πέρα από τη σύνδεση μέσω του client, και compliant device ή MFA. Δεν λες απλώς «να είσαι μέσα στο δίκτυό μου», λες «να είσαι μέσα στο δίκτυό μου, ΚΑΙ η συσκευή σου να είναι compliant». Είναι η ίδια λογική layered Conditional Access που ήδη εφαρμόζουμε αλλού, μόνο που τώρα η ίδια η δικτυακή θέση γίνεται signal.

## Πώς επιθεωρείται η κίνηση: URL για HTTP, SNI για HTTPS

Ένα τεχνικό σημείο που αξίζει να ξέρεις πριν εξηγήσεις το πώς δουλεύει το filtering σε κάποιον τρίτο: όταν η κίνηση φτάνει στο Secure Service Edge της Microsoft, το Entra Internet Access εφαρμόζει τους ελέγχους ασφάλειας με δύο διαφορετικούς τρόπους ανάλογα με το πρωτόκολλο. Για μη κρυπτογραφημένη κίνηση HTTP, χρησιμοποιεί το ίδιο το URL. Για κίνηση HTTPS κρυπτογραφημένη με TLS, χρησιμοποιεί το **Server Name Indication (SNI)**, το πεδίο που δηλώνει σε ποιο domain απευθύνεται η σύνδεση, χωρίς να χρειάζεται πλήρης αποκρυπτογράφηση του περιεχομένου για τη βασική λειτουργία φιλτραρίσματος.

## Web content filtering: πολιτικές, όχι μεμονωμένοι κανόνες

Το βασικό χαρακτηριστικό του Internet access profile είναι το **web content filtering**, μέσα από το **Global Secure Access → Secure → Web content filtering policies**. Φτιάχνεις πολιτικές block ή allow, είτε πάνω σε **web categories**, έτοιμες κατηγορίες όπως social networking, gambling, alcohol and tobacco, είτε πάνω σε **fully qualified domain names**, συγκεκριμένα domains, με υποστήριξη wildcard.

[![Web content filtering policy με κατηγορία social networking στο Global Secure Access, βήμα δημιουργίας πολιτικής](/images/global-secure-access-series/web-content-filtering-policy-social-media-1.png)](/images/global-secure-access-series/web-content-filtering-policy-social-media-1.png)
> 📷 **Εικόνα 2: Global Secure Access → Secure → Web content filtering policies. Δημιουργία πολιτικής αποκλεισμού με βάση web category.**

[![Web content filtering policy με κατηγορία social networking στο Global Secure Access, σύνδεση με security profile](/images/global-secure-access-series/web-content-filtering-policy-social-media-2.png)](/images/global-secure-access-series/web-content-filtering-policy-social-media-2.png)
> 📷 **Εικόνα 3: Global Secure Access → Secure → Security profiles. Σύνδεση της πολιτικής φιλτραρίσματος με ένα security profile και ανάθεση προτεραιότητας.**

Οι πολιτικές δεν εφαρμόζονται μόνες τους. Ομαδοποιούνται σε ένα **security profile**, το οποίο συνδέεται στη συνέχεια σε μια πολιτική Conditional Access, στο session control **«Use Global Secure Access security profile»**, ώστε να εφαρμόζεται σε συγκεκριμένη ομάδα χρηστών.

## Priority logic: όπως σε κλασικό firewall

Μέσα σε ένα security profile, οι πολιτικές επιβάλλονται με βάση αριθμούς προτεραιότητας, όπου το **100 είναι η υψηλότερη προτεραιότητα** και το **65.000 η χαμηλότερη**, ακριβώς η ίδια λογική που θα ήξερε κανείς από παραδοσιακό firewall. Καλή πρακτική είναι να αφήνεις κενό περίπου 100 μονάδων ανάμεσα σε προτεραιότητες, ώστε να έχεις χώρο να παρεμβάλεις νέες πολιτικές αργότερα χωρίς να χρειάζεται να ξαναρυθμίσεις όλες τις υπόλοιπες. Αν πολλαπλές πολιτικές Conditional Access ταιριάζουν ταυτόχρονα σε έναν χρήστη, τα αντίστοιχα security profiles επεξεργάζονται και αυτά με τη σειρά της δικής τους προτεραιότητας.

Αυτό επιτρέπει το κλασικό «block by default, allow by exception» μοτίβο: αποκλείεις μια ολόκληρη κατηγορία, π.χ. social networking, με μία πολιτική χαμηλότερης προτεραιότητας (μεγαλύτερος αριθμός), και προσθέτεις μια δεύτερη πολιτική με υψηλότερη προτεραιότητα (μικρότερος αριθμός) που επιτρέπει ρητά ένα συγκεκριμένο domain, π.χ. μόνο τη σελίδα Facebook του τμήματος marketing, χωρίς να ανοίγεις όλη την κατηγορία.

## Το baseline security profile: το catch-all που δεν βλέπεις

Υπάρχει ένα σημείο που δεν είναι προφανές αν κοιτάξεις μόνο τα δικά σου security profiles: υπάρχει ένα **baseline security profile**, το οποίο εφαρμόζεται σε **όλη** την κίνηση του Internet access profile, ακόμα κι αν δεν το έχεις συνδέσει ρητά σε καμία πολιτική Conditional Access. Λειτουργεί στη χαμηλότερη προτεραιότητα όλης της στοίβας πολιτικών, σαν ένα γενικό catch-all, και εκτελείται ακόμα κι όταν μια πολιτική Conditional Access ταιριάζει ήδη σε κάποιο άλλο, πιο συγκεκριμένο security profile. Πρακτικά αυτό σημαίνει ότι δεν υπάρχει σενάριο όπου κάποιος χρήστης μένει εντελώς εκτός οποιουδήποτε ελέγχου φιλτραρίσματος, πάντα υπάρχει τουλάχιστον το baseline ως δίχτυ ασφαλείας.

## Πέρα από το web filtering: identity-aware πλεονεκτήματα

Αντίστοιχες δυνατότητες φιλτραρίσματος περιεχομένου υπάρχουν και σε άλλα προϊόντα, όπως το Microsoft Defender for Endpoint σε επίπεδο endpoint, ή σε firewalls όπως το Azure Firewall. Η επιπλέον αξία του Entra Internet Access δεν είναι το φιλτράρισμα καθαυτό, είναι ότι η πολιτική είναι **identity-aware** από το σχεδιασμό της: ενοποιημένη ενσωμάτωση πολιτικής με το Entra ID, επιβολή στο cloud edge αντί σε κάθε endpoint ξεχωριστά, ενιαία υποστήριξη σε όλες τις πλατφόρμες συσκευών, και βελτιωμένη κατηγοριοποίηση ιστοσελίδων μέσω TLS inspection. Πρακτικά, αυτό σημαίνει ότι η ίδια πολιτική ισχύει με τον ίδιο τρόπο ανεξάρτητα από το αν ο χρήστης είναι σε Windows, macOS, iOS ή Android, χωρίς να χρειάζεται ξεχωριστή διαχείριση ανά πλατφόρμα.

## Licensing

Το Internet access profile απαιτεί, πέρα από το προαπαιτούμενο **Microsoft Entra ID P1 ή P2**, ένα ξεχωριστό license **Microsoft Entra Internet Access** ή, εναλλακτικά, το ευρύτερο πακέτο **Microsoft Entra Suite**. Η ακριβής τιμολόγηση αλλάζει συχνά και διαφέρει ανά αγορά, οπότε το σωστό είναι πάντα να επιβεβαιώνεται μέσα από το επίσημο Microsoft pricing page ή τον Microsoft partner σου πριν μπει σε οποιοδήποτε business case.

## Η οπτική NIS2 και ISO 27001

**Φιλτράρισμα πρόσβασης σε εξωτερικούς πόρους, ISO 27001 A.8.23.** Το control γύρω από web filtering στο Annex A ζητά ακριβώς αυτό: τεκμηριωμένη διαχείριση της πρόσβασης σε εξωτερικές ιστοσελίδες. Ένα security profile με ρητή πολιτική block/allow, με συγκεκριμένη προτεραιότητα και συνδεδεμένο σε συγκεκριμένη ομάδα χρηστών μέσω Conditional Access, είναι ακριβώς το είδος evidence που ζητά ένας auditor, όχι μια γενική δήλωση πολιτικής χωρίς τεχνικό μηχανισμό επιβολής.

**Το baseline profile ως τεκμηριωμένο ελάχιστο επίπεδο ελέγχου.** Το γεγονός ότι υπάρχει πάντα ένα catch-all baseline security profile, ακόμα κι όταν δεν έχεις ρητά ρυθμίσει κάτι, είναι χρήσιμο επιχείρημα σε ένα audit: μπορείς να δείξεις ότι δεν υπάρχει σενάριο «χωρίς κανένα φίλτρο», ακόμα κι αν κάποιος χρήστης δεν καλύπτεται από πιο συγκεκριμένη πολιτική.

**Έλεγχος πρόσβασης δικτύου ως τεκμηριωμένο compensating control, NIS2.** Η δυνατότητα να αποκλείσεις πρόσβαση σε cloud apps από οποιοδήποτε δίκτυο εκτός του Global Secure Access δεν είναι απλώς ένα ωραίο feature, είναι ένας τεκμηριωμένος μηχανισμός επιβολής network access control που μπορείς να δείξεις σε auditor ως συγκεκριμένο, μετρήσιμο έλεγχο, όχι ως πρόθεση.

## Τι θα πρόσεχα πριν το βάλω σε production

Πριν ενεργοποιήσεις block πολιτικές, θα σου πρότεινα να τρέξεις πρώτα σε λειτουργία παρακολούθησης, να δεις τι κίνηση περνάει πραγματικά, και να επιβεβαιώσεις ότι όλες οι critical εφαρμογές που χρησιμοποιεί ο οργανισμός σου καλύπτονται σωστά πριν αρχίσεις να αποκλείεις πρόσβαση χωρίς αυτές. Πρόσεξε επίσης τη σχέση με το Μέρος 2: αν κάποιο Microsoft workload έχει τεθεί σε bypass εκεί, δεν θα «πιαστεί» αυτόματα από το Internet access profile, θα βγει εντελώς εκτός Global Secure Access. Ένα migration χωρίς σωστό pilot μπορεί εύκολα να καταλήξει σε κύμα helpdesk tickets την πρώτη Δευτέρα.

## Τι έπεται

Στο τελευταίο μέρος της σειράς περνάμε στο **Private access profile**, τη λύση της Microsoft για αντικατάσταση του κλασικού VPN σε εσωτερικές, on-premises εφαρμογές, μέσα από Quick Access και private network connectors. Και επειδή το Conditional Access είναι το νήμα που συνδέει όλα τα profiles μεταξύ τους, ένα ξεχωριστό, πέμπτο μέρος θα μείνει αποκλειστικά σε αυτό, με συγκεκριμένα παραδείγματα πολιτικών πάνω στο Internet access profile που είδαμε εδώ.

Αν τρέχεις ή σχεδιάζεις κάτι ανάλογο στον δικό σου οργανισμό και βλέπεις τη σχέση δικτύου και ταυτότητας διαφορετικά, χαίρομαι πάντα να το συζητήσουμε στα σχόλια ή στο LinkedIn.
