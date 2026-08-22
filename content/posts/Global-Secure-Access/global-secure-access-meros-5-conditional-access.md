---
title: "Global Secure Access Μέρος 5: Conditional Access σε βάθος, τρία παραδείγματα πολιτικών που δουλεύουν"
date: 2026-09-02T09:00:00+03:00
lastmod: 2026-09-02T09:30:00+03:00
draft: true
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
categories: ["Microsoft 365 Security", "Network Security"]
series: ["Global Secure Access"]
slug: "global-secure-access-meros-5-conditional-access"
ShowToc: true
TocOpen: false
weight: -6
cover:
  image: "images/global-secure-access-series/universal-conditional-access-cover.png"
  alt: "Conditional Access policy δημιουργία πολιτικής με Target resources All internet resources with Global Secure Access"
  caption: "Entra ID → Conditional Access → Create new policy, Target resources: All internet resources with Global Secure Access"
  relative: true
ShowReadingTime: true
ShowWordCount: true
---

Στα προηγούμενα τέσσερα μέρη αυτής της σειράς είδαμε τι κάνει το κάθε κομμάτι ξεχωριστά: [Μέρος 1](/posts/global-secure-access-meros-1-ti-einai-sse/) τη φιλοσοφία SSE, [Μέρος 2](/posts/global-secure-access-meros-2-microsoft-traffic-profile/) το Microsoft traffic profile, [Μέρος 3](/posts/global-secure-access-meros-3-internet-access-profile/) το Internet access profile ως Secure Web Gateway, και [Μέρος 4](/posts/global-secure-access-meros-4-private-access-profile/) το Private access profile ως αντικαταστάτη VPN. Σε κάθε ένα από αυτά αναφέρθηκα, λίγο πολύ, στο Conditional Access, γιατί είναι αυτό που κάνει το Global Secure Access κάτι παραπάνω από ένα ακόμα δίκτυο. Σε αυτό το πέμπτο, συμπληρωματικό μέρος, μένω αποκλειστικά εκεί, με τρία συγκεκριμένα παραδείγματα πολιτικών πάνω στο Internet access profile, όπως τα περιγράφει η ίδια η Microsoft.

## Γιατί το λέει «universal» Conditional Access

Πριν μπω στα παραδείγματα, αξίζει να εξηγήσω τον όρο που χρησιμοποιεί η Microsoft γι' αυτό, **universal Conditional Access**. Παραδοσιακά, το Conditional Access εφαρμοζόταν πάνω σε cloud εφαρμογές, σε ό,τι είχε ενσωμάτωση single sign-on με το Entra ID. Το Global Secure Access επεκτείνει αυτή τη λογική πάνω στα ίδια τα **traffic profiles**, όχι μόνο στις εφαρμογές. Αυτό σημαίνει ότι μπορείς να απαιτήσεις MFA, compliant device, ή συγκεκριμένο επίπεδο sign-in risk όχι μόνο όταν κάποιος συνδέεται σε μια συγκεκριμένη cloud εφαρμογή, αλλά και όταν η συσκευή του αποκτά πρόσβαση μέσω ενός ολόκληρου traffic profile, Microsoft, Private, ή Internet. Πρακτική συνέπεια, όπως ανέφερα και στο Μέρος 2: εφαρμογές που παραδοσιακά δεν υποστήριζαν σύγχρονη αυθεντικοποίηση μπορούν τώρα να προστατευτούν έμμεσα, μέσω του traffic profile πίσω από το οποίο κάθονται.

## Παράδειγμα 1: Block access without GSA client

Το πιο βασικό, και ίσως πιο χρήσιμο σενάριο: μια πολιτική που αποκλείει την πρόσβαση σε όλους τους πόρους αν ο χρήστης δεν είναι συνδεδεμένος μέσω Global Secure Access. Η Microsoft το ονομάζει **compliant network check**, και λειτουργεί έτσι:

1. Στο **Global Secure Access → Settings → Session management → Adaptive access**, ενεργοποιείς το **«Enable Conditional Access Signaling for Microsoft Entra ID»**, όπως είδαμε στο Μέρος 3.
2. Επιβεβαιώνεις στο **Entra ID → Conditional Access → Named locations** ότι υπάρχει η τοποθεσία **«All Compliant Network locations»**, με location type **Network Access**. Προαιρετικά μπορείς να τη σημειώσεις ως trusted.
3. Πηγαίνεις σε **Entra ID → Conditional Access → Create new policy**, δίνεις όνομα στην πολιτική.
4. Στο **Assignments → Users or workload identities**, στο Include επιλέγεις **All users**, και στο Exclude προσθέτεις τους **emergency access ή break-glass λογαριασμούς** του οργανισμού σου, ώστε να μη μείνεις κλειδωμένος έξω σε περίπτωση λάθους ρύθμισης.
5. Στο **Target resources → Include**, επιλέγεις **All resources (πρώην 'All cloud apps')**. Αν χρησιμοποιείς Intune, εξαιρείς τις εφαρμογές **Microsoft Intune Enrollment** και **Microsoft Intune**, ώστε να μη δημιουργηθεί κυκλική εξάρτηση.
6. Στο **Network**, θέτεις Configure σε **Yes**, στο Include επιλέγεις **Any location**, και στο Exclude επιλέγεις **«All Compliant Network locations»**.
7. Στο **Access controls → Grant**, επιλέγεις **Block access**.
8. Επιβεβαιώνεις και θέτεις **Enable policy** σε **On**.

[![Δημιουργία Conditional Access policy με network condition All Compliant Network locations στο exclude και grant control Block access](/images/global-secure-access-series/ca-policy-block-without-client.png)](/images/global-secure-access-series/ca-policy-block-without-client.png)
> 📷 **Εικόνα 1: Entra ID → Conditional Access → Create new policy. Network condition με «Any location» στο include και «All Compliant Network locations» στο exclude, grant control Block access.**

Ένα σημείο που αξίζει προσοχή εδώ: όταν ενεργοποιείς compliant network σε πολιτική που στοχεύει **All Resources**, οι πόροι του ίδιου του Global Secure Access εξαιρούνται αυτόματα, δεν χρειάζεται να τους εξαιρέσεις εσύ χειροκίνητα. Αυτό είναι απαραίτητο ώστε ο ίδιος ο client να μην μπλοκάρεται από την πολιτική του, κάτι που θα δημιουργούσε φαύλο κύκλο. Αυτές οι αυτόματες εξαιρέσεις εμφανίζονται στα sign-in logs ως ξεχωριστοί πόροι, π.χ. «Internet resources with Global Secure Access» ή «ZTNA Policy Service».

Δοκίμασέ το: σε συσκευή με ενεργό Global Secure Access client, πήγαινε σε μια εφαρμογή που χρησιμοποιεί Entra ID single sign-on, δούλεψε κανονικά. Απενεργοποίησε τον client από το system tray, δοκίμασε ξανά μια διαφορετική εφαρμογή, η πρόσβαση μπλοκάρεται. Αν είσαι ήδη συνδεδεμένος σε μια εφαρμογή, η πρόσβαση δεν διακόπτεται αμέσως, το Entra ID επαναξιολογεί τη συνθήκη την επόμενη φορά που θα χρειαστεί sign-in, όταν λήξει η υπάρχουσα session.

## Παράδειγμα 2: GSA require compliant device

Το δεύτερο παράδειγμα προχωράει ένα βήμα παραπέρα από το «απλά να είσαι συνδεδεμένος», απαιτεί επιπλέον η ίδια η συσκευή να είναι σε καλή κατάσταση:

1. **Entra ID → Conditional Access → Create new policy**, όνομα πολιτικής.
2. **Assignments**, Include **All users**, Exclude τους emergency access λογαριασμούς και, αν χρειάζεται, guest ή external users.
3. Στο **Target resources → Resources (πρώην 'cloud apps')**, επιλέγεις **«All internet resources with Global Secure Access»**. Αν θέλεις να στοχεύσεις αποκλειστικά το Internet access traffic forwarding profile, χωρίς το Microsoft traffic profile, επιλέγεις αντ' αυτού **Select resources**, διαλέγεις **Internet resources** από το app picker, και ρυθμίζεις ένα security profile, ακριβώς όπως είδαμε στο Μέρος 3.
4. Στο **Access controls → Grant**, επιλέγεις **Require multifactor authentication**, **Require device to be marked as compliant**, και **Require Microsoft Entra hybrid joined device**. Αν θέλεις οποιονδήποτε από τους τρεις να αρκεί, όχι όλους μαζί, επιλέγεις **«Require one of the selected controls»**.
5. Επιβεβαιώνεις τις ρυθμίσεις, θέτεις αρχικά **Enable policy** σε **Report-only**, για να δεις την επίδραση χωρίς να μπλοκάρεις κανέναν, και μόνο αφού επιβεβαιώσεις ότι όλα λειτουργούν όπως αναμένεται, το μεταφέρεις σε **On**.

[![Conditional Access policy με Target resources All internet resources with Global Secure Access και grant controls MFA, compliant device, hybrid joined](/images/global-secure-access-series/ca-policy-require-compliant-device.png)](/images/global-secure-access-series/ca-policy-require-compliant-device.png)
> 📷 **Εικόνα 2: Entra ID → Conditional Access → Target resources «All internet resources with Global Secure Access», grant controls MFA / compliant device / hybrid joined device με «Require one of the selected controls».**

Το σημείο-κλειδί εδώ είναι η διαφορά ανάμεσα στα δύο πρώτα παραδείγματα: το πρώτο ρωτάει «είσαι μέσα στο δίκτυό μου;», αυτό εδώ ρωτάει «είσαι μέσα στο δίκτυό μου, ΚΑΙ η συσκευή σου περνάει τα κριτήρια που έχω θέσει;». Η λογική layered Conditional Access που ανέφερα στο Μέρος 3, εδώ την βλέπεις σε πλήρη εφαρμογή, δύο ξεχωριστές πολιτικές, η καθεμία με τον δικό της σκοπό, που συνδυάζονται στην πράξη.

## Παράδειγμα 3: GSA web content filtering μέσω security profile

Το τρίτο παράδειγμα δεν είναι νέο σενάριο, είναι η επίσημη σύνδεση ανάμεσα στα security profiles που είδαμε στο Μέρος 3 και στο ίδιο το Conditional Access, με ρητά, επίσημα βήματα:

1. Έχεις ήδη φτιάξει τις πολιτικές web content filtering και το security profile σου, όπως περιγράφηκε στο Μέρος 3.
2. **Entra ID → Conditional Access → Create new policy**, όνομα πολιτικής.
3. Στο **Target resources**, επιλέγεις **«All internet resources with Global Secure Access»**.
4. Στο **Session**, επιλέγεις **«Use Global Secure Access security profile»** και διαλέγεις το security profile που έχεις ήδη δημιουργήσει.
5. Επιβεβαιώνεις, θέτεις **Enable policy** σε **On**, και δημιουργείς την πολιτική.

[![Conditional Access policy με Session control Use Global Secure Access security profile και επιλεγμένο security profile](/images/global-secure-access-series/ca-policy-web-content-filtering-session.png)](/images/global-secure-access-series/ca-policy-web-content-filtering-session.png)
> 📷 **Εικόνα 3: Entra ID → Conditional Access → Session → «Use Global Secure Access security profile», με επιλεγμένο το αντίστοιχο security profile φιλτραρίσματος.**

Ένα σημείο προσοχής που αξίζει να ξέρεις πριν το ρυθμίσεις: αν οι χρήστες σου χρησιμοποιούν **Explicit Forward Proxy** (σε preview τη στιγμή που γράφω αυτό το άρθρο), αυτή η κίνηση δεν περιλαμβάνεται ακόμα στην ομάδα «All internet resources with Global Secure Access», και θα χρειαστεί ξεχωριστή πολιτική. Επίσης, αν χρησιμοποιείς remote network connectivity αντί για client σε επιμέρους συσκευές, μπορείς να εφαρμόσεις φιλτράρισμα σε όλη αυτή την κίνηση μέσω του baseline security profile, χωρίς να χρειάζεται ξεχωριστή σύνδεση Conditional Access ανά τοποθεσία.

## Ένα κοινό νήμα: πάντα break-glass, πάντα report-only πρώτα

Και στα τρία παραδείγματα, θα προσέξεις ένα επαναλαμβανόμενο μοτίβο, που δεν είναι τυχαίο: **εξαίρεση emergency access λογαριασμών**, και όπου είναι εφικτό, **πρώτα report-only, μετά on**. Δεν είναι απλώς καλή πρακτική γενικά, είναι ιδιαίτερα κρίσιμο εδώ, γιατί μια λάθος ρυθμισμένη πολιτική πάνω σε traffic profile μπορεί να κλειδώσει έξω ολόκληρο τον οργανισμό από cloud πόρους, όχι μόνο από μία εφαρμογή. Η ίδια η Microsoft προτείνει, σε επίπεδο deployment guide, τη χρήση ενός break-glass script που μπορεί να μεταφέρει μαζικά όλες τις σχετικές πολιτικές σε report-only σε περίπτωση προβλήματος, ακριβώς επειδή αναγνωρίζει το ρίσκο.

## Η οπτική NIS2 και ISO 27001

**Πολυεπίπεδος έλεγχος πρόσβασης ως ώριμο τεχνικό μέτρο, NIS2.** Τα τρία παραδείγματα μαζί δείχνουν κάτι που ένας auditor εκτιμά ιδιαίτερα: όχι έναν μεμονωμένο έλεγχο, αλλά ένα **στρωματοποιημένο** σύστημα, δίκτυο, μετά συσκευή, μετά περιεχόμενο, όπου κάθε επίπεδο καλύπτει διαφορετικό ρίσκο. Αυτό είναι ακριβώς το είδος ωριμότητας που το NIS2 αναμένει από τεχνικά μέτρα ελέγχου πρόσβασης, όχι έναν μεμονωμένο διακόπτη «μέσα ή έξω».

**Περιορισμός πρόσβασης, ISO 27001 A.5.15 και A.8.20.** Το control γύρω από τον έλεγχο πρόσβασης (A.5.15) και τη διαχείριση ασφάλειας δικτύου (A.8.20) ζητούν τεκμηριωμένη, συνεπή εφαρμογή πολιτικής. Το γεγονός ότι οι τρεις πολιτικές αυτού του άρθρου ακολουθούν ρητά, επαναλήψιμα βήματα, με συγκεκριμένα target resources και grant controls, είναι ακριβώς το τεκμηριωμένο evidence που ζητά ένας auditor, σε αντίθεση με μια γενική περιγραφή προθέσεων.

**Το break-glass μοτίβο ως evidence επιχειρησιακής ετοιμότητας.** Η συστηματική εξαίρεση emergency access λογαριασμών, και η ύπαρξη επίσημου μηχανισμού rollback (το script που ανέφερα παραπάνω), δείχνουν σε έναν auditor ότι ο οργανισμός δεν έχει απλώς σχεδιάσει ελέγχους, έχει σχεδιάσει και το τι θα γίνει αν κάτι πάει στραβά, κάτι που σχετίζεται άμεσα με τις απαιτήσεις επιχειρησιακής συνέχειας που θέτει το NIS2.

## Τι θα πρόσεχα πριν τα βάλω όλα μαζί σε production

Αν σχεδιάζεις να εφαρμόσεις και τα τρία παραδείγματα ταυτόχρονα, θυμήσου ότι δεν είναι ανεξάρτητα, είναι στρώματα πάνω στο ίδιο traffic. Ξεκίνα πάντα με το πρώτο, compliant network, σε report-only, επιβεβαίωσε ότι δεν μπλοκάρει κανέναν απρόσμενα, μετά πρόσθεσε το δεύτερο, compliant device, πάλι σε report-only πρώτα. Το τρίτο, web content filtering, είναι σχετικά ασφαλέστερο να ενεργοποιηθεί απευθείας σε on, ειδικά αν βασίζεσαι στο baseline security profile ως δίχτυ ασφαλείας, όπως είδαμε στο Μέρος 3.

## Κλείνοντας τη σειρά

Με αυτό το πέμπτο μέρος κλείνει πραγματικά η εικόνα του Global Secure Access, όπως το βλέπω σήμερα: η φιλοσοφία SSE, τα τρία traffic profiles, και το Conditional Access που τα δένει όλα μαζί σε συγκεκριμένη, εφαρμόσιμη πολιτική. Αν κάτι άλλαξε στην τεκμηρίωση της Microsoft μέχρι να διαβάσεις αυτό το άρθρο, ιδιαίτερα σε ό,τι αφορά preview δυνατότητες όπως το Explicit Forward Proxy ή το TLS inspection, θα επανέλθω με ενημέρωση.

Αν έχεις ήδη εφαρμόσει κάποιο από αυτά τα τρία σενάρια στον οργανισμό σου, ή αν έχεις χτίσει κάτι διαφορετικό πάνω στο ίδιο μοτίβο, χαίρομαι πάντα να το συζητήσουμε στα σχόλια ή στο LinkedIn.
