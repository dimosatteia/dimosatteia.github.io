---
title: "Microsoft Entra Internet Access: Το SSE κομμάτι του Global Secure Access που αλλάζει το πώς σκέφτομαι το perimeter"
date: 2026-08-20T09:00:00+03:00
lastmod: 2026-08-20T09:30:00+03:00
draft: true
keywords:
  - Microsoft Entra Internet Access
  - Global Secure Access
  - Security Service Edge SSE
  - Conditional Access network conditions
  - Compliant Network location
  - Web content filtering Entra
  - Zero Trust remote access
  - NIS2 ασφάλεια δικτύου
  - ISO 27001 A.8.20 A.8.23
  - Identity aware network access
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
description: "Ανάλυση του Microsoft Entra Internet Access, του SSE (Security Service Edge) προϊόντος της Microsoft μέσα στο Global Secure Access, με έμφαση στην ενσωμάτωσή του με το Conditional Access και στις συνέπειες για NIS2 και ISO 27001, από την οπτική ενός CISO."
summary: "Το perimeter που προστατεύαμε επί 20 χρόνια δεν υπάρχει πια. Οι χρήστες δουλεύουν από παντού, τα δεδομένα ζουν στο cloud, και ένα κλασικό VPN απλώς σου δίνει δίκτυο, όχι ταυτότητα. Το Entra Internet Access είναι η απάντηση της Microsoft σε αυτό, και το ενδιαφέρον δεν είναι το ίδιο το tunnel, είναι το πώς μιλάει με το Conditional Access."
categories: ["Microsoft 365 Security", "Network Security"]
series:
ShowToc: true
TocOpen: false
weight: -6
cover:
  image: "images/entra-internet-access/global-secure-access-dashboard-cover.png"
  alt: "Global Secure Access dashboard στο Microsoft Entra admin center"
  caption: "Global Secure Access → Dashboard, το σημείο εκκίνησης για Entra Internet Access"
  relative: true
ShowReadingTime: true
ShowWordCount: true
---

Κάθε φορά που ξεκινάω να εξηγήσω σε ένα management team γιατί χρειαζόμαστε κάτι παραπάνω από ένα VPN, καταλήγω στην ίδια ιστορία: πριν από είκοσι χρόνια, το μοντέλο ήταν απλό. Όλοι δούλευαν από το γραφείο, όλα τα συστήματα ήταν μέσα σε ένα datacenter που ελέγχαμε εμείς, και η δουλειά μας ως security ήταν να βάλουμε ένα καλό firewall γύρω από αυτό το κουτί. Σήμερα αυτό το κουτί δεν υπάρχει. Το email, τα αρχεία, οι εφαρμογές είναι στο Microsoft 365, και οι άνθρωποι που τα χρησιμοποιούν είναι παντού: κάποιος στο λογιστήριο που δουλεύει από το σπίτι Πέμπτη και Παρασκευή, κάποιος πωλητής που ζει μέσα σε καφετέριες και ξενοδοχεία με ένα εταιρικό laptop. Το πρόβλημα δεν είναι πια «πώς προστατεύω το κτίριο», είναι «πώς προστατεύω κάθε χρήστη, σε κάθε συσκευή, από οπουδήποτε». Και αυτό είναι ένα εντελώς διαφορετικό πρόβλημα.

Η κατηγορία προϊόντων που έχει προκύψει για να το λύσει λέγεται **SSE, Security Service Edge**, και η Microsoft έχει το δικό της, που ονομάζεται **Global Secure Access**. Μέσα σε αυτό υπάρχουν δύο υπο-προϊόντα: το **Entra Private Access**, για όσους έχουν ακόμα servers on-premises που θέλουν να εκθέσουν με ασφάλεια, και το **Entra Internet Access**, για οργανισμούς που είναι πλήρως cloud-based και θέλουν να προστατεύσουν την πρόσβαση σε Microsoft 365 και στο υπόλοιπο internet. Σε αυτό το άρθρο μένω στο δεύτερο, γιατί είναι αυτό που έχει την πιο άμεση σχέση με το πώς οι περισσότεροι από εμάς έχουμε ήδη οργανώσει την ταυτότητα και το Conditional Access.

## Γιατί δεν είναι απλώς ένα ακόμα VPN

Η πρώτη ένσταση που ακούω όταν παρουσιάζω το Entra Internet Access είναι «αυτό δεν είναι απλά VPN με άλλο όνομα;». Τεχνικά, ναι, δημιουργεί ένα tunnel ανάμεσα στη συσκευή του χρήστη και ένα δίκτυο της Microsoft. Λειτουργικά όμως η διαφορά είναι ουσιαστική: το tunnel αυτό δεν είναι απλώς ένα anonymous pipe δικτύου. Είναι **identity aware**, που σημαίνει ότι μιλάει άμεσα με το Conditional Access. Ένα κλασικό VPN σου λέει «αυτή η κίνηση ήρθε από το VPN gateway». Το Entra Internet Access σου λέει «αυτή η κίνηση ήρθε από αυτόν τον συγκεκριμένο χρήστη, σε αυτή τη συγκεκριμένη συσκευή, μέσα από το δικό μου δίκτυο», και αυτό το γεγονός γίνεται μια συνθήκη πάνω στην οποία μπορείς να χτίσεις πολιτική.

Αυτό στην πράξη σημαίνει ότι μπορείς να φτιάξεις ένα σενάριο όπου η πρόσβαση σε Microsoft 365 απαιτεί ρητά τη σύνδεση μέσω Global Secure Access, όχι απλώς «οποιαδήποτε σύνδεση internet». Αν ο χρήστης αποσυνδέσει το client, χάνει πρόσβαση, ανεξάρτητα από το πόσο «καθαρό» δείχνει το δίκτυο στο οποίο βρίσκεται.

## Πώς στήνεται στην πράξη

Η ενεργοποίηση γίνεται μέσα από το Microsoft Entra admin center, στο **Identity → Global Secure Access**. Το πρώτο βήμα, πριν από οτιδήποτε άλλο, είναι στο **Global Secure Access → Settings → Session management → Adaptive access**, να ενεργοποιηθεί το **«Enable Conditional Access signaling for Entra ID»**. Αυτό το toggle είναι αυτό που κάνει τη σύνδεση μεταξύ των δύο κόσμων, χωρίς αυτό το Global Secure Access παραμένει ένα ξεχωριστό, «κουφό» δίκτυο. Μόλις ενεργοποιηθεί, εμφανίζεται αυτόματα ένα νέο named location στο Conditional Access, το **«All Compliant Network locations»**, το οποίο θα χρησιμοποιήσουμε παρακάτω σε πολιτικές.

[![Global Secure Access adaptive access toggle για Conditional Access signaling](/images/entra-internet-access/adaptive-access-conditional-access-signaling.png)](/images/entra-internet-access/adaptive-access-conditional-access-signaling.png)
> 📷 **Εικόνα 1: Global Secure Access → Session management → Adaptive access. Το κρίσιμο toggle που συνδέει το δίκτυο με το Conditional Access.**

Στη συνέχεια, στο **Connect → Traffic forwarding**, υπάρχουν τρία προφίλ: το **Microsoft traffic profile** (κάλυψη Exchange Online, SharePoint, OneDrive, Teams κ.ά., ενεργό by default για όλους), το **Private access profile** (για internal εφαρμογές σε servers), και το **Internet access profile** (για όλη την υπόλοιπη κίνηση internet εκτός Microsoft). Ενεργοποιείς όσα προφίλ χρειάζεσαι, κατεβάζεις το client, Windows, Android, iOS ή macOS, και σε Windows απαιτείται η συσκευή να είναι Microsoft Entra joined. Για μαζική εγκατάσταση σε πολλαπλές συσκευές, το φυσικό κανάλι είναι το Intune.

## Το κομμάτι που κάνει τη διαφορά: Conditional Access policies

Εδώ είναι το σημείο που, ως κάποιος που ασχολείται καθημερινά με Conditional Access, με ενδιαφέρει πραγματικά. Η ύπαρξη του named location «All Compliant Network locations» σου επιτρέπει να φτιάξεις μια πολιτική που **αποκλείει πρόσβαση σε cloud apps από οπουδήποτε εκτός** αυτού του δικτύου. Στην πράξη: χρήστης, όλα τα resources, network condition «any location» εκτός «All Compliant Network locations», grant control block. Το αποτέλεσμα είναι ότι, αν κάποιος απενεργοποιήσει το Global Secure Access client στη συσκευή του, χάνει αμέσως πρόσβαση σε Outlook, OneDrive, SharePoint, ό,τι έχει οριστεί ως target resource, μέχρι να το ενεργοποιήσει ξανά.

Πάνω σε αυτό μπορείς να χτίσεις κι άλλο επίπεδο: μια δεύτερη πολιτική που στοχεύει σε «All Internet Resources with Global Secure Access» και απαιτεί, πέρα από τη σύνδεση μέσω του client, και compliant device ή MFA. Δηλαδή δεν λες απλώς «να είσαι μέσα στο δίκτυό μου», λες «να είσαι μέσα στο δίκτυό μου, ΚΑΙ η συσκευή σου να είναι compliant». Είναι ακριβώς η λογική του layered Conditional Access που ήδη εφαρμόζουμε αλλού, μόνο που τώρα η ίδια η δικτυακή θέση γίνεται signal.

## Web content filtering: το κομμάτι που συχνά ξεχνιέται

Πέρα από τον έλεγχο πρόσβασης, το Entra Internet Access φέρνει και μια λειτουργία που παραδοσιακά ήταν δουλειά ξεχωριστού proxy ή firewall: **web content filtering**. Μέσα από το **Global Secure Access → Secure → Web content filtering policies**, μπορείς να φτιάξεις πολιτικές block ή allow, είτε πάνω σε **web categories** έτοιμες κατηγορίες όπως social networking, gambling, alcohol and tobacco, είτε πάνω σε **fully qualified domain names** συγκεκριμένα domains, με υποστήριξη wildcard.

[![Web content filtering policy με κατηγορία social networking</br>στο Global Secure Access](/images/entra-internet-access/web-content-filtering-policy-social-media-1.png)](/images/entra-internet-access/web-content-filtering-policy-social-media-1.png)
> 📷 **Εικόνα 2: Global Secure Access → Secure → Web content filtering policies. Πολιτική αποκλεισμού social networking, με δυνατότητα εξαίρεσης συγκεκριμένων domains.**

[![Web content filtering policy με κατηγορία social networking</br>στο Global Secure Access](/images/entra-internet-access/web-content-filtering-policy-social-media-2.png)](/images/entra-internet-access/web-content-filtering-policy-social-media-2.png)
> 📷 **Εικόνα 3: Global Secure Access → Secure → Web content filtering policies. Πολιτική αποκλεισμού social networking, με δυνατότητα εξαίρεσης συγκεκριμένων domains.**

Αυτές οι πολιτικές δεν εφαρμόζονται μόνες τους, συνδέονται σε ένα **security profile**, το οποίο έχει τη δική του προτεραιότητα (χαμηλότερος αριθμός = υψηλότερη προτεραιότητα, από 100 έως 65.000), και μέσα στο profile μπορείς να συνδυάσεις πολλαπλές πολιτικές με τη δική τους εσωτερική προτεραιότητα. Αυτό επιτρέπει το κλασικό «block by default, allow by exception» μοτίβο: αποκλείεις μια ολόκληρη κατηγορία (π.χ. social networking) με μία πολιτική, και μετά προσθέτεις μια δεύτερη πολιτική με μεγαλύτερη προτεραιότητα που επιτρέπει ρητά ένα συγκεκριμένο domain (π.χ. μόνο τη σελίδα Facebook του τμήματος marketing), χωρίς να ανοίγεις όλη την κατηγορία. Το security profile στη συνέχεια συνδέεται σε συγκεκριμένη ομάδα χρηστών μέσα από μια δική του Conditional Access policy, στο session control **«Use Global Secure Access security profile»**, οπότε μπορείς να έχεις διαφορετική πολιτική filtering για το τμήμα οικονομικών και διαφορετική για τις πωλήσεις.

## Κόστος και licensing, με τι μιλάμε

Το Entra Internet Access διατίθεται ως ξεχωριστό license ανά χρήστη, και περιλαμβάνεται επίσης μέσα στο ευρύτερο πακέτο **Microsoft Entra Suite**, το οποίο φέρνει επιπλέον δυνατότητες (Private Access, Verified ID, ID Governance στοιχεία) με υψηλότερο συνολικό κόστος. Η ακριβής τιμολόγηση αλλάζει συχνά και διαφέρει ανά αγορά και τύπο συμφωνίας, οπότε το σωστό είναι πάντα να επιβεβαιώνεται μέσα από το επίσημο Microsoft pricing page ή τον Microsoft partner σου πριν μπει σε οποιοδήποτε business case, δεν το παραθέτω εδώ γιατί θα ήταν σχεδόν σίγουρο ότι θα είναι ξεπερασμένο σε λίγους μήνες.

## Η οπτική NIS2 και ISO 27001

Το κομμάτι που με ενδιαφέρει περισσότερο δεν είναι το πόσο εντυπωσιακό είναι το demo, είναι πώς αυτό μεταφράζεται σε τεκμηρίωση και σε πραγματική μείωση ρίσκου.

**Έλεγχος πρόσβασης δικτύου ως τεκμηριωμένο compensating control.** Το NIS2 απαιτεί τεχνικά και οργανωτικά μέτρα για τον έλεγχο πρόσβασης σε συστήματα και δίκτυα. Η δυνατότητα να αποκλείσεις πρόσβαση σε cloud apps από οποιοδήποτε δίκτυο εκτός του Global Secure Access δεν είναι απλώς ένα ωραίο feature, είναι ένας τεκμηριωμένος μηχανισμός επιβολής network access control που μπορείς να δείξεις σε auditor ως συγκεκριμένο, μετρήσιμο έλεγχο, όχι ως πρόθεση.

**Ασφαλής απομακρυσμένη πρόσβαση, ISO 27001 A.8.20 και A.8.23.** Τα controls γύρω από network security management και web filtering στο Annex A ζητούν ακριβώς αυτό: τεκμηριωμένη διαχείριση της κίνησης δικτύου και φιλτράρισμα πρόσβασης σε εξωτερικούς πόρους. Ένα security profile με ρητή πολιτική block/allow, συνδεδεμένο σε συγκεκριμένη ομάδα χρηστών μέσω Conditional Access, είναι ακριβώς το είδος evidence που ζητά ένας auditor, όχι μια γενική δήλωση πολιτικής «απαγορεύονται μη εξουσιοδοτημένες ιστοσελίδες» χωρίς τεχνικό μηχανισμό επιβολής.

**Ενιαία διαχείριση ρίσκου, ανεξάρτητα από τοποθεσία εργασίας.** Το ίδιο το πρόβλημα που περιγράφω στην αρχή, ότι το κλασικό perimeter δεν υπάρχει πια, είναι από μόνο του ένα risk που πρέπει να είναι καταγεγραμμένο στο risk register σου. Το να μπορείς να δείξεις ότι η πολιτική πρόσβασης εφαρμόζεται με τον ίδιο τρόπο σε γραφείο, σπίτι ή καφετέρια, γιατί η επιβολή γίνεται στο επίπεδο ταυτότητας και όχι στο επίπεδο φυσικού δικτύου, είναι ακριβώς η λογική του Zero Trust που ζητούν και τα δύο πλαίσια.

## Τι θα πρόσεχα πριν το βάλω σε production

Πριν ενεργοποιήσεις block πολιτικές πάνω σε αυτό, θα σου πρότεινα να τρέξεις πρώτα το traffic forwarding σε λειτουργία παρακολούθησης, να δεις τι κίνηση περνάει πραγματικά, και να επιβεβαιώσεις ότι όλες οι critical εφαρμογές που χρησιμοποιεί ο οργανισμός σου καλύπτονται σωστά από τα προφίλ πριν αρχίσεις να αποκλείεις πρόσβαση χωρίς αυτά. Ένα migration σε αυτό το μοντέλο χωρίς σωστό pilot μπορεί εύκολα να καταλήξει σε ένα κύμα helpdesk tickets την πρώτη Δευτέρα.

## Το συμπέρασμα

Αυτό που με κάνει να βλέπω το Entra Internet Access σοβαρά δεν είναι το tunnel καθαυτό, VPN λύσεις υπάρχουν εδώ και χρόνια. Είναι το γεγονός ότι μιλάει τη γλώσσα του Conditional Access, που σημαίνει ότι δεν προσθέτει ένα ακόμα, ξεχωριστό σύστημα πολιτικών που πρέπει να συντηρώ παράλληλα με την ταυτότητα. Το εντάσσει μέσα στο ίδιο μοντέλο απόφασης που ήδη χρησιμοποιώ για MFA, compliant device και risk-based sign-in. Για έναν οργανισμό που είναι ήδη βαθιά μέσα στο Microsoft 365 και το Entra ID, αυτό είναι ακριβώς το σημείο όπου αξίζει να το εξετάσεις σοβαρά, όχι ως ακόμα ένα εργαλείο, αλλά ως συνέχεια της ίδιας αρχιτεκτονικής Zero Trust που ήδη χτίζεις.

Η αρχική ιδέα και το demo που με έβαλαν σε αυτή τη σκέψη προήλθαν από ένα πολύ καθαρό, πρακτικό walkthrough της κοινότητας πάνω στο Entra Internet Access, το είδος του υλικού που με βοηθάει πάντα να δω πώς ένα feature συμπεριφέρεται πραγματικά, πέρα από το marketing. Αν τρέχεις ή σχεδιάζεις κάτι ανάλογο στον δικό σου οργανισμό και βλέπεις τη σχέση δικτύου και ταυτότητας διαφορετικά, χαίρομαι πάντα να το συζητήσουμε στα σχόλια ή στο LinkedIn.
