---
title: "Global Secure Access Μέρος 5: Conditional Access σε βάθος, τρία παραδείγματα πολιτικών που δουλεύουν"
seoTitle: "GSA Μέρος 5: Conditional Access, 3 πολιτικές που δουλεύουν"
date: 2026-09-28T09:00:00+03:00
lastmod: 2026-09-28T17:00:00+03:00
draft: false
keywords:
  - Universal Conditional Access Global Secure Access
  - Compliant network check Entra
  - All internet resources with Global Secure Access
  - Require device to be marked as compliant GSA
  - Global Secure Access security profile session control
  - Named locations All Compliant Network locations
  - Break glass accounts Conditional Access
  - NIS2 πολυεπίπεδος έλεγχος πρόσβασης
  - ISO 27001 A.8.20 A.5.15 access control
  - Zero Trust Conditional Access παραδείγματα
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
description: "Πέμπτο μέρος σειράς άρθρων για το Microsoft Global Secure Access. Τρία πρακτικά παραδείγματα πολιτικών Conditional Access πάνω στο Internet access profile: block χωρίς client, απαίτηση compliant device, και web content filtering μέσω security profile, με έμφαση σε NIS2 και ISO 27001."
summary: "Στα προηγούμενα τέσσερα μέρη είδαμε τι κάνει κάθε traffic profile ξεχωριστά. Σε αυτό το πέμπτο και συμπληρωματικό μέρος μένω αποκλειστικά στο κομμάτι που τα ενώνει όλα: το Conditional Access. Τρία παραδείγματα πολιτικών, βήμα-βήμα, όπως τα περιγράφει η ίδια η Microsoft, με το σκεπτικό πίσω από κάθε ρύθμιση."
categories: ["Network & SSE", "Identity & Access"]
series: ["Global Secure Access"]
slug: "global-secure-access-meros-5-conditional-access"
ShowToc: true
TocOpen: false
weight: -6
cover:
  image: "images/global-secure-access-series/universal-conditional-access-cover.webp"
  alt: "Conditional Access policy δημιουργία πολιτικής με Target resources All internet resources with Global Secure Access"
  caption: "Entra ID → Conditional Access → Create new policy, Target resources: All internet resources with Global Secure Access"
  relative: true
ShowReadingTime: true
ShowWordCount: true
---

Στα προηγούμενα τέσσερα μέρη αυτής της σειράς είδαμε τι κάνει το κάθε κομμάτι ξεχωριστά: [1ο μέρος](/posts/global-secure-access/global-secure-access-meros-1-ti-einai-sse/) τη φιλοσοφία SSE, [2ο μέρος](/posts/global-secure-access/global-secure-access-meros-2-microsoft-traffic-profile/) το Microsoft traffic profile, [3ο μέρος](/posts/global-secure-access/global-secure-access-meros-3-internet-access-profile/) το Internet access profile ως Secure Web Gateway, και [4ο μέρος](/posts/global-secure-access/global-secure-access-meros-4-private-access-profile/) το Private access profile ως αντικαταστάτη VPN. Σε κάθε ένα από αυτά αναφέρθηκα, λίγο πολύ, στο Conditional Access, γιατί είναι αυτό που κάνει το Global Secure Access κάτι παραπάνω από ένα ακόμα δίκτυο. Σε αυτό το πέμπτο, συμπληρωματικό μέρος, μένω αποκλειστικά εκεί, με τρία συγκεκριμένα παραδείγματα πολιτικών πάνω στο Internet access profile, όπως τα περιγράφει η ίδια η Microsoft.

## Γιατί το λέει «universal» Conditional Access

Πριν μπω στα παραδείγματα, αξίζει να εξηγήσω τον όρο που χρησιμοποιεί η Microsoft γι' αυτό, **universal Conditional Access**. Παραδοσιακά, το Conditional Access εφαρμοζόταν πάνω σε cloud εφαρμογές, σε ό,τι είχε ενσωμάτωση single sign-on με το Entra ID. Το Global Secure Access επεκτείνει αυτή τη λογική πάνω στα ίδια τα **traffic profiles**, όχι μόνο στις εφαρμογές. Αυτό σημαίνει ότι μπορείς να απαιτήσεις MFA, compliant device, ή συγκεκριμένο επίπεδο sign-in risk όχι μόνο όταν κάποιος συνδέεται σε μια συγκεκριμένη cloud εφαρμογή, αλλά και όταν η συσκευή του αποκτά πρόσβαση μέσω ενός ολόκληρου traffic profile, Microsoft ή Internet. Το Private access profile είναι η εξαίρεση: εκεί δεν στοχεύεις το traffic profile, αλλά κάθε Quick Access ή per-app εφαρμογή ξεχωριστά ως enterprise application, όπως είδαμε στο 4ο μέρος. Πρακτική συνέπεια, όπως ανέφερα και στο 2ο μέρος: εφαρμογές που παραδοσιακά δεν υποστήριζαν σύγχρονη αυθεντικοποίηση μπορούν τώρα να προστατευτούν έμμεσα, μέσω του traffic profile πίσω από το οποίο κάθονται.

## Παράδειγμα 1: Block access without GSA client

Το πιο βασικό, και ίσως πιο χρήσιμο σενάριο: μια πολιτική που αποκλείει την πρόσβαση σε όλους τους πόρους αν ο χρήστης δεν είναι συνδεδεμένος μέσω Global Secure Access. Η Microsoft το ονομάζει **compliant network check**, και λειτουργεί έτσι:

1. Στο **Global Secure Access → Settings → Session management → Adaptive access**, ενεργοποιείς το **«Enable Conditional Access Signaling for Microsoft Entra ID»**, όπως είδαμε στο Μέρος 3.
2. Επιβεβαιώνεις στο **Entra ID → Conditional Access → Named locations** ότι υπάρχει η τοποθεσία **«All Compliant Network locations»**, με location type **Network Access**. Προαιρετικά μπορείς να τη σημειώσεις ως trusted.
3. Πηγαίνεις σε **Entra ID → Conditional Access → Create new policy**, δίνεις όνομα στην πολιτική.
4. Στο **Assignments → Users or workload identities**, στο Include επιλέγεις **All users**, και στο Exclude προσθέτεις τους **emergency access ή break-glass λογαριασμούς** του οργανισμού σου, ώστε να μη μείνεις κλειδωμένος έξω σε περίπτωση λάθους ρύθμισης. Αν χρησιμοποιείς τον client και σε iOS ή Android, όπου αποτελεί μέρος του Microsoft Defender app, πρόσθεσε και τις [εξαιρέσεις για το Defender mobile app](https://learn.microsoft.com/en-us/defender-endpoint/mobile-resources-defender-endpoint#microsoft-defender-mobile-app-exclusion-from-conditional-access-ca-policies), ώστε ο ίδιος ο client να μη μπλοκάρεται από την πολιτική.
5. Στο **Target resources → Include**, επιλέγεις **All resources (πρώην 'All cloud apps')**. Αν χρησιμοποιείς Intune, εξαιρείς τις εφαρμογές **Microsoft Intune Enrollment** και **Microsoft Intune**, ώστε να μη δημιουργηθεί κυκλική εξάρτηση.
6. Στο **Network**, θέτεις Configure σε **Yes**, στο Include επιλέγεις **Any location**, και στο Exclude επιλέγεις **«All Compliant Network locations»**.
7. Στο **Access controls → Grant**, επιλέγεις **Block access**.
8. Επιβεβαιώνεις και θέτεις **Enable policy** σε **On**.

[![Δημιουργία Conditional Access policy με network condition All Compliant Network locations στο exclude και grant control Block access](/images/global-secure-access-series/ca-policy-block-without-client.webp)](/images/global-secure-access-series/ca-policy-block-without-client.webp)
> 📷 **Εικόνα 1: Entra ID → Conditional Access → Create new policy. Network condition με «Any location» στο include και «All Compliant Network locations» στο exclude, grant control Block access.**

Ένα σημείο που αξίζει προσοχή εδώ: όταν ενεργοποιείς compliant network σε πολιτική που στοχεύει **All Resources**, οι πόροι του ίδιου του Global Secure Access εξαιρούνται αυτόματα, δεν χρειάζεται να τους εξαιρέσεις εσύ χειροκίνητα. Αυτό είναι απαραίτητο ώστε ο ίδιος ο client να μην μπλοκάρεται από την πολιτική του, κάτι που θα δημιουργούσε φαύλο κύκλο. Αυτές οι αυτόματες εξαιρέσεις εμφανίζονται στα sign-in logs ως ξεχωριστοί πόροι, π.χ. «Internet resources with Global Secure Access» ή «ZTNA Policy Service».

Και μια προειδοποίηση που δεν πρέπει να παραλείψεις: αν στο μέλλον χρειαστεί να απενεργοποιήσεις το Conditional Access signaling ενώ υπάρχουν ενεργές πολιτικές compliant network, κινδυνεύεις να μπλοκάρεις τους χρήστες από τους πόρους που προστατεύουν αυτές οι πολιτικές. Η σωστή σειρά είναι πάντα πρώτα διαγραφή των αντίστοιχων πολιτικών, μετά απενεργοποίηση του toggle.

Δοκίμασέ το: σε συσκευή με ενεργό Global Secure Access client, πήγαινε σε μια εφαρμογή που χρησιμοποιεί Entra ID single sign-on, δούλεψε κανονικά. Απενεργοποίησε τον client από το system tray, δοκίμασε ξανά μια διαφορετική εφαρμογή, η πρόσβαση μπλοκάρεται. Αν είσαι ήδη συνδεδεμένος σε μια εφαρμογή, η πρόσβαση δεν διακόπτεται αμέσως, το Entra ID επαναξιολογεί τη συνθήκη την επόμενη φορά που θα χρειαστεί sign-in, όταν λήξει η υπάρχουσα session.

## Παράδειγμα 2: GSA require compliant device

Το δεύτερο παράδειγμα προχωράει ένα βήμα παραπέρα από το «απλά να είσαι συνδεδεμένος», απαιτεί επιπλέον η ίδια η συσκευή να είναι σε καλή κατάσταση:

1. **Entra ID → Conditional Access → Create new policy**, όνομα πολιτικής.
2. **Assignments**, Include **All users**, Exclude τους emergency access λογαριασμούς και, αν χρειάζεται, guest ή external users.
3. Στο **Target resources → Resources (πρώην 'cloud apps')**, επιλέγεις **«All internet resources with Global Secure Access»**. Αν θέλεις να στοχεύσεις αποκλειστικά το Internet access traffic forwarding profile, χωρίς το Microsoft traffic profile, επιλέγεις αντ' αυτού **Select resources**, διαλέγεις **Internet resources** από το app picker, και ρυθμίζεις ένα security profile, ακριβώς όπως είδαμε στο Μέρος 3.
4. Στο **Access controls → Grant**, επιλέγεις **Require multifactor authentication**, **Require device to be marked as compliant**, και **Require Microsoft Entra hybrid joined device**. Αν θέλεις οποιονδήποτε από τους τρεις να αρκεί, όχι όλους μαζί, επιλέγεις **«Require one of the selected controls»**.
5. Επιβεβαιώνεις τις ρυθμίσεις, θέτεις αρχικά **Enable policy** σε **Report-only**, για να δεις την επίδραση χωρίς να μπλοκάρεις κανέναν, και μόνο αφού επιβεβαιώσεις ότι όλα λειτουργούν όπως αναμένεται, το μεταφέρεις σε **On**.

[![Conditional Access policy με Target resources All internet resources with Global Secure Access και grant controls MFA, compliant device, hybrid joined](/images/global-secure-access-series/ca-policy-require-compliant-device.webp)](/images/global-secure-access-series/ca-policy-require-compliant-device.webp)
> 📷 **Εικόνα 2: Entra ID → Conditional Access → Target resources «All internet resources with Global Secure Access», grant controls MFA / compliant device / hybrid joined device με «Require one of the selected controls».**

**Προσοχή πριν το περάσεις σε On.** Η ίδια η Microsoft καταγράφει εδώ έναν γνωστό περιορισμό που μπορεί να σε κλειδώσει έξω: αν μια συσκευή βγει noncompliant, η πολιτική μπλοκάρει την πρόσβασή της στο Internet access profile, άρα και στα Intune endpoints που χρειάζεται για να ξαναγίνει compliant. Ο χρήστης μένει εγκλωβισμένος σε έναν φαύλο κύκλο. Η λύση είναι να προσθέσεις ως custom bypass στο Internet access traffic forwarding profile τα network endpoints του Microsoft Intune, καθώς και όποιους προορισμούς χρησιμοποιούν τα custom compliance discovery scripts σου, πριν ενεργοποιήσεις την πολιτική.

Το σημείο-κλειδί εδώ είναι η διαφορά ανάμεσα στα δύο πρώτα παραδείγματα: το πρώτο ρωτάει «είσαι μέσα στο δίκτυό μου;», αυτό εδώ ρωτάει «είσαι μέσα στο δίκτυό μου, ΚΑΙ η συσκευή σου περνάει τα κριτήρια που έχω θέσει;». Η λογική layered Conditional Access που ανέφερα στο Μέρος 3, εδώ την βλέπεις σε πλήρη εφαρμογή, δύο ξεχωριστές πολιτικές, η καθεμία με τον δικό της σκοπό, που συνδυάζονται στην πράξη.

## Παράδειγμα 3: GSA web content filtering μέσω security profile

Το τρίτο παράδειγμα δεν είναι νέο σενάριο, είναι η επίσημη σύνδεση ανάμεσα στα security profiles που είδαμε στο Μέρος 3 και στο ίδιο το Conditional Access, με ρητά, επίσημα βήματα:

1. Έχεις ήδη φτιάξει τις πολιτικές web content filtering και το security profile σου, όπως περιγράφηκε στο Μέρος 3.
2. **Entra ID → Conditional Access → Create new policy**, όνομα πολιτικής.
3. Στο **Target resources**, επιλέγεις **«All internet resources with Global Secure Access»**.
4. Στο **Session**, επιλέγεις **«Use Global Secure Access security profile»** και διαλέγεις το security profile που έχεις ήδη δημιουργήσει.
5. Επιβεβαιώνεις, θέτεις **Enable policy** σε **On**, και δημιουργείς την πολιτική.

[![Conditional Access policy με Session control Use Global Secure Access security profile και επιλεγμένο security profile](/images/global-secure-access-series/ca-policy-web-content-filtering-session.webp)](/images/global-secure-access-series/ca-policy-web-content-filtering-session.webp)
> 📷 **Εικόνα 3: Entra ID → Conditional Access → Session → «Use Global Secure Access security profile», με επιλεγμένο το αντίστοιχο security profile φιλτραρίσματος.**

Ένα σημείο προσοχής που αξίζει να ξέρεις πριν το ρυθμίσεις: αν οι χρήστες σου χρησιμοποιούν **Explicit Forward Proxy** (σε preview τη στιγμή που γράφω αυτό το άρθρο), αυτή η κίνηση δεν περιλαμβάνεται ακόμα στην ομάδα «All internet resources with Global Secure Access», και θα χρειαστεί ξεχωριστή πολιτική. Επίσης, αν χρησιμοποιείς remote network connectivity αντί για client σε επιμέρους συσκευές, μπορείς να εφαρμόσεις φιλτράρισμα σε όλη αυτή την κίνηση μέσω του baseline security profile, χωρίς να χρειάζεται ξεχωριστή σύνδεση Conditional Access ανά τοποθεσία.

Και κάτι που θα σε γλιτώσει από άσκοπο troubleshooting: η εφαρμογή ενός νέου security profile μπορεί να πάρει 60 έως 90 λεπτά, γιατί ο χρήστης πρέπει να λάβει νέο access token που περιέχει το security profile ως claim. Οι αλλαγές στο Conditional Access θέλουν περίπου μία ώρα, ενώ οι αλλαγές μέσα σε ήδη υπάρχον security profile εφαρμόζονται πολύ πιο γρήγορα. Για testing, μπορείς να επισπεύσεις τη διαδικασία με **Revoke sessions** στη σελίδα του χρήστη στο Entra admin center, ώστε να αναγκαστεί να πάρει νέα tokens.

## Ένα κοινό νήμα: πάντα break-glass, πάντα report-only πρώτα

Στα δύο πρώτα παραδείγματα, θα προσέξεις ένα επαναλαμβανόμενο μοτίβο, που δεν είναι τυχαίο: **εξαίρεση emergency access λογαριασμών**, και όπου είναι εφικτό, **πρώτα report-only, μετά on**. Δεν είναι απλώς καλή πρακτική γενικά, είναι ιδιαίτερα κρίσιμο εδώ, γιατί μια λάθος ρυθμισμένη πολιτική πάνω σε traffic profile μπορεί να κλειδώσει έξω ολόκληρο τον οργανισμό από cloud πόρους, όχι μόνο από μία εφαρμογή. Η ίδια η Microsoft προτείνει, σε επίπεδο deployment guide, τη χρήση ενός [break-glass script](https://learn.microsoft.com/en-us/entra/global-secure-access/scripts/powershell-break-glass) που, σε περίπτωση διακοπής της υπηρεσίας, απενεργοποιεί προσωρινά τα traffic forwarding profiles και μεταφέρει μαζικά σε report-only όλες τις πολιτικές που χρησιμοποιούν compliant network, μαζί με ένα αντίστοιχο [recovery script](https://learn.microsoft.com/en-us/entra/global-secure-access/scripts/powershell-break-glass-recovery) για την επαναφορά τους, ακριβώς επειδή αναγνωρίζει το ρίσκο.

## Η οπτική NIS2 και ISO 27001

**Πολυεπίπεδος έλεγχος πρόσβασης ως ώριμο τεχνικό μέτρο, NIS2 Άρθρο 21(2)(i) και (j).** Τα τρία παραδείγματα μαζί δείχνουν κάτι που ένας auditor εκτιμά ιδιαίτερα: όχι έναν μεμονωμένο έλεγχο, αλλά ένα **πολυεπίπεδο** σύστημα, δίκτυο, μετά συσκευή, μετά περιεχόμενο, όπου κάθε επίπεδο καλύπτει διαφορετικό ρίσκο. Αυτό είναι ακριβώς το είδος ωριμότητας που το NIS2 αναμένει από τεχνικά μέτρα ελέγχου πρόσβασης, όχι έναν μεμονωμένο διακόπτη «μέσα ή έξω».

**Μετριασμός token theft ως συγκεκριμένο, μετρήσιμο ρίσκο.** Το compliant network check δεν είναι μόνο έλεγχος θέσης, είναι και μέτρο κατά της κλοπής tokens. Αν ένας επιτιθέμενος κλέψει ένα refresh token και προσπαθήσει να το χρησιμοποιήσει από συσκευή εκτός του compliant network του tenant σου, το Entra ID απορρίπτει άμεσα το αίτημα. Σε εφαρμογές που υποστηρίζουν Continuous Access Evaluation, όπως το Microsoft Graph, ακόμα και ένα κλεμμένο access token απορρίπτεται σχεδόν σε πραγματικό χρόνο, αντί να παραμένει έγκυρο για ολόκληρη τη διάρκεια ζωής του, 60 έως 90 λεπτά από προεπιλογή. Για ένα risk register, αυτό σημαίνει ότι μπορείς να συνδέσεις την πολιτική με ένα συγκεκριμένο σενάριο απειλής, όχι με μια γενική δήλωση προστασίας.

**Περιορισμός πρόσβασης, ISO 27001 A.5.15 και A.8.20.** Το control γύρω από τον έλεγχο πρόσβασης (A.5.15) και τη διαχείριση ασφάλειας δικτύου (A.8.20) ζητούν τεκμηριωμένη, συνεπή εφαρμογή πολιτικής. Το γεγονός ότι οι τρεις πολιτικές αυτού του άρθρου ακολουθούν ρητά, επαναλήψιμα βήματα, με συγκεκριμένα target resources και grant controls, είναι ακριβώς το τεκμηριωμένο evidence που ζητά ένας auditor, σε αντίθεση με μια γενική περιγραφή προθέσεων.

**Το break-glass μοτίβο ως evidence επιχειρησιακής ετοιμότητας.** Η συστηματική εξαίρεση emergency access λογαριασμών, και η ύπαρξη επίσημου μηχανισμού rollback (το script που ανέφερα παραπάνω), δείχνουν σε έναν auditor ότι ο οργανισμός δεν έχει απλώς σχεδιάσει ελέγχους, έχει σχεδιάσει και το τι θα γίνει αν κάτι πάει στραβά, κάτι που σχετίζεται άμεσα με τις απαιτήσεις επιχειρησιακής συνέχειας που θέτει το NIS2 στο Άρθρο 21(2)(c).

## Τι θα πρόσεχα πριν τα βάλω όλα μαζί σε production

Αν σχεδιάζεις να εφαρμόσεις και τα τρία παραδείγματα ταυτόχρονα, θυμήσου ότι δεν είναι ανεξάρτητα, είναι στρώματα πάνω στο ίδιο traffic. Ξεκίνα πάντα με το πρώτο, compliant network, σε report-only, επιβεβαίωσε ότι δεν μπλοκάρει κανέναν απρόσμενα, μετά πρόσθεσε το δεύτερο, compliant device, πάλι σε report-only πρώτα. Το τρίτο, web content filtering, είναι σχετικά ασφαλέστερο να ενεργοποιηθεί απευθείας σε on, ειδικά αν βασίζεσαι στο baseline security profile ως δίχτυ ασφαλείας, όπως είδαμε στο Μέρος 3.

## Κλείνοντας τη σειρά

Με αυτό το πέμπτο μέρος κλείνει πραγματικά η εικόνα του Global Secure Access, όπως το βλέπω σήμερα: η φιλοσοφία SSE, τα τρία traffic profiles, και το Conditional Access που τα δένει όλα μαζί σε συγκεκριμένη, εφαρμόσιμη πολιτική. Αν κάτι άλλαξε στην τεκμηρίωση της Microsoft μέχρι να διαβάσεις αυτό το άρθρο, ιδιαίτερα σε ό,τι αφορά preview δυνατότητες όπως το Explicit Forward Proxy ή το TLS inspection, θα επανέλθω με ενημέρωση.

Αν έχεις ήδη εφαρμόσει κάποιο από αυτά τα τρία σενάρια στον οργανισμό σου, ή αν έχεις χτίσει κάτι διαφορετικό πάνω στο ίδιο μοτίβο, χαίρομαι πάντα να το συζητήσουμε στα σχόλια ή στο LinkedIn.
