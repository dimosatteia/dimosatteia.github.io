---
title: "Global Secure Access Μέρος 2: Το Microsoft traffic profile, η προεπιλεγμένη πύλη για Microsoft 365"
date: 2026-08-24T09:00:00+03:00
lastmod: 2026-08-24T09:30:00+03:00
draft: true
keywords:
  - Microsoft traffic profile
  - Global Secure Access traffic forwarding
  - Microsoft 365 IP και FQDN list
  - Microsoft Entra traffic profile
  - Exchange Online SharePoint Online Teams routing
  - Global Secure Access client Windows
  - Conditional Access Microsoft traffic
  - NIS2 διαχείριση δικτυακής κίνησης
  - ISO 27001 A.8.20 network security
  - Zero Trust Microsoft 365 πρόσβαση
tags:
  - Microsoft Entra ID
  - Global Secure Access
  - Microsoft 365
  - Conditional Access
  - Network Security
  - NIS2
  - ISO 27001
  - GRC
  - Cybersecurity
  - Zero Trust
author: "Dimosthenis Atteia"
description: "Δεύτερο μέρος σειράς άρθρων για το Microsoft Global Secure Access. Ανάλυση του Microsoft traffic profile, του προεπιλεγμένου traffic forwarding profile που δρομολογεί την πρόσβαση σε Exchange Online, SharePoint Online και Teams, με έμφαση σε NIS2 και ISO 27001."
summary: "Πριν μπούμε στο πιο εντυπωσιακό κομμάτι, το web filtering του Internet Access, αξίζει να σταθούμε σε αυτό που ενεργοποιείται πρώτο και συνήθως χωρίς να το προσέξει κανείς: το Microsoft traffic profile. Είναι το θεμέλιο πάνω στο οποίο χτίζονται τα άλλα δύο profiles, και έχει τους δικούς του κανόνες που αξίζει να καταλάβεις πριν αγγίξεις οτιδήποτε άλλο."
categories: ["Microsoft 365 Security", "Network Security", "Global Secure Access"]
series: ["Global Secure Access"]
ShowToc: true
TocOpen: false
weight: -9
cover:
  image: "images/global-secure-access-series/microsoft-traffic-profile-cover.png"
  alt: "Global Secure Access Connect Traffic forwarding Microsoft traffic profile στο Microsoft Entra admin center"
  caption: "Global Secure Access → Connect → Traffic forwarding → Microsoft traffic profile"
  relative: true
ShowReadingTime: true
ShowWordCount: true
---

Στο [πρώτο μέρος αυτής της σειράς](/posts/global-secure-access-meros-1-ti-einai-sse/) έμεινα στη θεωρία: τι είναι το SSE ως κατηγορία, γιατί η Microsoft το έχτισε πάνω στο Entra ID, και ποια είναι η σχέση Global Secure Access, Entra Internet Access και Entra Private Access. Από εδώ και πέρα μπαίνουμε στην πράξη, ένα traffic forwarding profile τη φορά. Ξεκινάω σκόπιμα από το **Microsoft traffic profile**, γιατί είναι αυτό που η ίδια η Microsoft θεωρεί θεμέλιο, το πρώτο profile που αξιολογείται όταν περνάει κίνηση μέσα από το Global Secure Access, πριν καν φτάσει στο Private ή στο Internet access profile.

## Πού ζει μέσα στη σειρά αξιολόγησης

Κάτι που δεν είναι προφανές με την πρώτη ματιά, αλλά έχει πρακτική σημασία όταν αρχίζεις να σχεδιάζεις πολιτικές: η κίνηση που περνάει μέσα από το Global Secure Access δεν αξιολογείται τυχαία ως προς τα τρία profiles. Αξιολογείται πρώτα ως προς το **Microsoft traffic profile**, μετά ως προς το **Private access profile**, και τελευταία ως προς το **Internet access profile**. Ό,τι δεν ταιριάζει σε κανένα από τα τρία, απλώς δεν προωθείται καθόλου μέσα από το Global Secure Access.

Αυτή η σειρά προτεραιότητας δεν είναι διακοσμητική λεπτομέρεια. Σημαίνει ότι η κίνηση προς Exchange Online ή SharePoint Online, αν καλύπτεται από το Microsoft traffic profile, δεν θα «ξαναδεί» ποτέ το Internet access profile, ακόμα κι αν αυτό είναι ενεργό. Θα το δούμε παρακάτω γιατί αυτό έχει άμεση σχέση με το πώς πρέπει να ρυθμίσεις τα δύο profiles μαζί.

## Τι ακριβώς καλύπτει

Το Microsoft traffic profile δεν είναι μια λίστα που φτιάχνεις εσύ από το μηδέν. Αντλεί τους κανόνες δρομολόγησης από την επίσημη λίστα **Microsoft 365 IP και FQDN**, την ίδια λίστα που χρησιμοποιεί η Microsoft για το network connectivity guidance της, και ομαδοποιεί τις σχετικές υπηρεσίες με βάση την κατηγορία κίνησης, Exchange Online, SharePoint Online, Teams και τα υπόλοιπα Microsoft 365 workloads. Κάθε κανόνας περιλαμβάνει τύπο προορισμού (IP ή FQDN), τον ίδιο τον προορισμό, πρωτόκολλο, θύρες, κατηγορία κίνησης, και μια ενέργεια, forward ή bypass.

[![Traffic forwarding profile ρυθμίσεις για το Microsoft traffic profile στο Global Secure Access](/images/global-secure-access-series/microsoft-traffic-profile-rules-view.png)](/images/global-secure-access-series/microsoft-traffic-profile-rules-view.png)
> 📷 **Εικόνα 1: Global Secure Access → Connect → Traffic forwarding → Microsoft traffic profile. Η λίστα κανόνων ομαδοποιημένη ανά κατηγορία υπηρεσίας, με ένδειξη Forward ή Bypass ανά ομάδα.**

Το ενδιαφέρον σημείο εδώ είναι ότι δεν χρειάζεται να ξέρεις εσύ ποιες IP και ποια FQDN χρησιμοποιεί το κάθε Microsoft 365 service, αυτό το κάνει η Microsoft και το ενημερώνει αυτόματα. Ο δικός σου ρόλος είναι να αποφασίσεις, ανά ομάδα υπηρεσιών, αν θέλεις forward, δηλαδή η κίνηση να περάσει μέσα από το Global Secure Access, ή bypass, δηλαδή να αγνοηθεί και να ακολουθήσει το κανονικό δικτυακό μονοπάτι της συσκευής προς τα έξω.

## Forward vs Bypass, και γιατί η επιλογή έχει συνέπειες αλλού

Εδώ είναι το σημείο που, την πρώτη φορά που το είδα, με μπέρδεψε λίγο, και αξίζει να το εξηγήσω καθαρά γιατί επηρεάζει άμεσα το πώς σχεδιάζεις το Internet access profile στο επόμενο μέρος της σειράς. Αν θέσεις έναν κανόνα σε **Bypass** μέσα στο Microsoft traffic profile, αυτό δεν σημαίνει ότι η κίνηση θα «πιαστεί» τότε από το Internet access profile ως εναλλακτική. Σημαίνει ότι η κίνηση παρακάμπτει εντελώς το Global Secure Access, ακόμα κι αν το Internet access profile είναι ενεργό, και βγαίνει προς τα έξω μέσα από το κανονικό δικτυακό μονοπάτι της συσκευής. Η κίνηση που είναι διαθέσιμη για απόκτηση μέσα στο Microsoft traffic profile μπορεί να αποκτηθεί **μόνο** μέσα από αυτό, όχι από κάποιο άλλο profile ως fallback.

Αυτό σημαίνει ότι μια απόφαση "bypass" σε ένα Microsoft workload δεν είναι απλώς «δεν το προστατεύω τόσο πολύ», είναι «αυτή η κίνηση δεν θα δει καθόλου Global Secure Access, οπότε ούτε τα web content filtering policies ούτε τα σχετικά session controls θα εφαρμοστούν πάνω της». Πριν θέσεις κάτι σε bypass, σκέψου αν αυτό είναι πραγματικά αυτό που θέλεις, ή αν απλώς προσπαθείς να λύσεις ένα πρόβλημα απόδοσης που μπορεί να έχει καλύτερη λύση αλλού.

## Ο ρόλος του για την απόδοση

Ο κύριος λόγος που η Microsoft συστήνει να είναι ενεργό το Microsoft traffic profile, ακόμα κι αν το βασικό σου ενδιαφέρον είναι το Internet access profile, είναι η απόδοση. Το Microsoft traffic profile εξασφαλίζει τα καλύτερα δυνατά χαρακτηριστικά δρομολόγησης για τις υποστηριζόμενες υπηρεσίες, ακριβώς επειδή χρησιμοποιεί προκαθορισμένες, βελτιστοποιημένες διαδρομές για Microsoft 365, αντί να αφήνει αυτή την κίνηση να αντιμετωπίζεται σαν γενική κίνηση internet. Αν ενεργοποιήσεις το Internet access profile χωρίς το Microsoft traffic profile, η κίνηση προς Exchange Online ή Teams θα περνάει και αυτή μέσα από το γενικό tunnel του Internet access, χάνοντας αυτή τη βελτιστοποίηση.

## Πώς φτάνει η κίνηση εκεί: client και remote networks

Η κίνηση του Microsoft traffic profile μπορεί να αποκτηθεί με δύο τρόπους: μέσα από τον **Global Secure Access client** στη συσκευή, Windows ή Android προς το παρόν, ή μέσα από **remote network connectivity**, δηλαδή μια σύνδεση σε επίπεδο τοποθεσίας, όπως ένα υποκατάστημα, χωρίς να χρειάζεται client σε κάθε συσκευή ξεχωριστά. Ο client δεν λειτουργεί σαν κλασικό VPN adapter, χρησιμοποιεί έναν ελαφρύ οδηγό φίλτρου (lightweight filter driver) για να αποκτά την κίνηση, κάτι που του επιτρέπει να συνυπάρχει με άλλες λύσεις SSE ή VPN στην ίδια συσκευή, αντί να έρχεται σε σύγκρουση μαζί τους.

## Licensing, σε γενικές γραμμές

Το Microsoft traffic profile απαιτεί ως προαπαιτούμενο **Microsoft Entra ID P1 ή P2**. Δεν χρειάζεται ξεχωριστό license Entra Internet Access ή Entra Suite για να το ενεργοποιήσεις, σε αντίθεση με το Internet access και το Private access profile, τα οποία απαιτούν επιπλέον licensing που θα δούμε στα επόμενα μέρη. Πρακτικά αυτό σημαίνει ότι, αν ήδη έχεις P1 ή P2 licensing στον οργανισμό σου, μπορείς να δοκιμάσεις το Microsoft traffic profile χωρίς επιπλέον κόστος licensing, κάτι που το κάνει καλό σημείο εκκίνησης για ένα pilot.

## Το «αόρατο» τέταρτο profile

Αξίζει να θυμηθούμε εδώ κάτι που ανέφερα στο πρώτο μέρος: πέρα από τα τρία profiles που ρυθμίζεις εσύ, Microsoft, Private, Internet, υπάρχει και ένα τέταρτο, το **Microsoft Entra traffic profile**, που καλύπτει αποκλειστικά κίνηση αυθεντικοποίησης και ταυτότητας, sign-in, Graph API, επικύρωση πιστοποιητικών. Αυτό είναι system-managed, ενεργοποιείται αυτόματα μόλις ενεργοποιήσεις οποιοδήποτε άλλο profile, δεν φαίνεται καν στο portal, και έχει την υψηλότερη προτεραιότητα επεξεργασίας από όλα. Δεν χρειάζεται να το ρυθμίσεις, αλλά είναι χρήσιμο να ξέρεις ότι υπάρχει, ειδικά αν κάποια στιγμή βλέπεις στα logs κίνηση προς Entra endpoints που δεν αντιστοιχεί σε κανένα από τα profiles που έχεις ενεργοποιήσει εσύ.

## Πώς συνδέεται με το Conditional Access

Όπως και τα άλλα δύο profiles, το Microsoft traffic profile μπορεί να συνδεθεί με πολιτικές Conditional Access, όχι μόνο ως προϋπόθεση πρόσβασης σε μια εφαρμογή, αλλά ως προϋπόθεση πάνω στο ίδιο το traffic profile. Αυτό ανοίγει τον δρόμο για κάτι που η Microsoft ονομάζει **universal Conditional Access**: μπορείς να απαιτήσεις MFA, compliant device, ή συγκεκριμένο επίπεδο sign-in risk όχι μόνο όταν κάποιος συνδέεται σε μια cloud εφαρμογή, αλλά και όταν η συσκευή του αποκτά πρόσβαση μέσω ενός traffic profile γενικότερα. Πρακτική συνέπεια: εφαρμογές που παραδοσιακά δεν υποστήριζαν σύγχρονη αυθεντικοποίηση μπορούν τώρα να προστατευτούν έμμεσα, μέσω του traffic profile πίσω από το οποίο κάθονται, αντί να μείνουν εκτός Conditional Access εντελώς.

## Η οπτική NIS2 και ISO 27001

**Τεκμηριωμένη διαχείριση δικτυακής κίνησης, όχι σιωπηρή εμπιστοσύνη.** Ένα σημείο που συχνά περνάει απαρατήρητο σε παλαιότερα μοντέλα δικτύου είναι ότι η κίνηση προς Microsoft 365 απλώς «έβγαινε» προς τα έξω, χωρίς συγκεκριμένη, τεκμηριωμένη πολιτική πίσω της. Με το Microsoft traffic profile, κάθε κατηγορία κίνησης έχει ρητή απόφαση forward ή bypass, κάτι που μεταφράζεται άμεσα σε τεκμηρίωση διαχείρισης δικτύου, ακριβώς αυτό που ζητά το NIS2 όταν μιλάει για τεχνικά μέτρα ελέγχου και παρακολούθησης δικτυακής κίνησης.

**Συνέπεια στην εφαρμογή πολιτικής, ISO 27001 A.8.20.** Το control γύρω από τη διαχείριση ασφάλειας δικτύου ζητά να υπάρχει σαφής, τεκμηριωμένη λογική για το πώς διαχειρίζεσαι διαφορετικές κατηγορίες δικτυακής κίνησης. Το γεγονός ότι το Microsoft traffic profile ομαδοποιεί την κίνηση ανά κατηγορία υπηρεσίας, με ρητή ενέργεια ανά ομάδα, είναι ακριβώς το επίπεδο λεπτομέρειας που ζητά ένας auditor, σε αντίθεση με μια γενική δήλωση «η κίνηση Microsoft 365 θεωρείται έμπιστη».

**Το bypass ως ρίσκο που χρειάζεται αιτιολόγηση, όχι προεπιλογή.** Επειδή μια απόφαση bypass αφαιρεί εντελώς μια κατηγορία κίνησης από την εμβέλεια του Global Secure Access, κάθε τέτοια απόφαση θα έπρεπε να συνοδεύεται από ρητή αιτιολόγηση στο risk register, γιατί επιλέχθηκε, ποιο πρόβλημα λύνει, τι εναλλακτικός έλεγχος υπάρχει. Δεν είναι κάτι που πρέπει να μείνει σε επίπεδο τεχνικής ρύθμισης χωρίς ίχνος τεκμηρίωσης.

## Τι θα πρόσεχα πριν το ενεργοποιήσω σε production

Το Microsoft traffic profile είναι σχετικά ασφαλές σημείο εκκίνησης σε σύγκριση με τα άλλα δύο profiles, ακριβώς γιατί οι κανόνες του προέρχονται από επίσημη, συντηρημένη λίστα της Microsoft και όχι από δικές σου χειροκίνητες ρυθμίσεις. Παρόλα αυτά, θα σου πρότεινα να ελέγξεις ποιες ομάδες υπηρεσιών είναι ενεργές πριν ενεργοποιήσεις παράλληλα το Internet access profile, ακριβώς γιατί, όπως είδαμε, ό,τι μπει σε bypass εδώ δεν καλύπτεται αλλού. Ένα καλό σημείο ελέγχου είναι να συγκρίνεις τη λίστα ενεργών ομάδων με τα πραγματικά Microsoft 365 workloads που χρησιμοποιεί ο οργανισμός σου, ώστε να μη μείνει κάποια υπηρεσία εκτός κάλυψης χωρίς να το έχεις αποφασίσει ρητά.

## Τι έπεται

Στο επόμενο μέρος περνάμε στο profile που συνήθως τραβάει τη μεγαλύτερη προσοχή, το **Internet access profile**: πώς λειτουργεί ως secure web gateway, πώς δουλεύει το web content filtering με βάση κατηγορίες και FQDNs, και πώς όλα αυτά συνδέονται σε security profiles που εφαρμόζονται μέσω Conditional Access σε συγκεκριμένες ομάδες χρηστών.

Αν έχεις ήδη ενεργοποιήσει το Microsoft traffic profile στον οργανισμό σου και έχεις παρατηρήσει κάτι ενδιαφέρον, ιδιαίτερα γύρω από bypass κανόνες ή απόδοση, χαίρομαι πάντα να το συζητήσουμε στα σχόλια ή στο LinkedIn.
