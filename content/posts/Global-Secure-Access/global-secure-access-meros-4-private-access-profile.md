---
title: "Global Secure Access Μέρος 4: Το Private access profile ως αντικαταστάτης του VPN"
date: 2026-08-30T09:00:00+03:00
lastmod: 2026-08-30T09:30:00+03:00
draft: true
keywords:
  - Microsoft Entra Private Access
  - Private access profile Global Secure Access
  - Zero Trust Network Access ZTNA
  - Quick Access Global Secure Access
  - Private network connector Entra
  - VPN αντικατάσταση Microsoft
  - Per-app access private resources
  - Conditional Access private access apps
  - NIS2 απομακρυσμένη πρόσβαση
  - ISO 27001 A.8.20 A.8.3 έλεγχος πρόσβασης δικτύου
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
description: "Τέταρτο και τελευταίο μέρος σειράς άρθρων για το Microsoft Global Secure Access. Ανάλυση του Private access profile, Quick Access, private network connectors και per-app access, με έμφαση σε NIS2 και ISO 27001."
summary: "Κλείνουμε τη σειρά με το κομμάτι που έχει τη μεγαλύτερη πρακτική αξία για όσους ακόμα τρέχουν VPN: το Private access profile. Δεν είναι απλώς μια νέα μέθοδος σύνδεσης, είναι μια διαφορετική φιλοσοφία πρόσβασης, από 'σε βάζω μέσα στο δίκτυο' σε 'σου δίνω πρόσβαση σε αυτό το συγκεκριμένο resource, και μόνο σε αυτό'."
categories: ["Microsoft 365 Security", "Network Security", "Global Secure Access"]
series: ["Global Secure Access"]
slug: "global-secure-access-meros-4-private-access-profile"
ShowToc: true
TocOpen: false
weight: -7
cover:
  image: "images/global-secure-access-series/private-access-profile-cover.png"
  alt: "Global Secure Access Connect Traffic forwarding Private access profile στο Microsoft Entra admin center"
  caption: "Global Secure Access → Connect → Traffic forwarding → Private access profile"
  relative: true
ShowReadingTime: true
ShowWordCount: true
---

Φτάσαμε στο τελευταίο μέρος αυτής της σειράς. Στο [Μέρος 1](/posts/global-secure-access-meros-1-ti-einai-sse/) είδαμε τη φιλοσοφία SSE, στο [Μέρος 2](/posts/global-secure-access-meros-2-microsoft-traffic-profile/) το Microsoft traffic profile, και στο [Μέρος 3](/posts/global-secure-access-meros-3-internet-access-profile/) το Internet access profile ως Secure Web Gateway. Κλείνω με το κομμάτι που, για πολλούς οργανισμούς που ακόμα σέρνουν ένα παλιό VPN appliance, έχει την πιο άμεση πρακτική αξία: το **Private access profile**.

## Το πρόβλημα που λύνει: πρόσβαση σε resource, όχι σε δίκτυο

Ένα κλασικό VPN, όσο καλά κι αν είναι ρυθμισμένο, έχει ένα δομικό χαρακτηριστικό που είναι δύσκολο να ξεπεραστεί: όταν συνδέεσαι, σου δίνει μια θέση **μέσα** στο δίκτυο. Από εκεί και πέρα, η πρόσβασή σου σε συγκεκριμένους πόρους καθορίζεται από κανόνες δικτύου, VLANs, subnets, firewall rules, όχι από το ποιος είσαι πραγματικά και τι πραγματικά χρειάζεσαι.

Το Entra Private Access αντιστρέφει αυτή τη λογική. Αντί να σε βάζει μέσα στο δίκτυο, σου δίνει πρόσβαση σε **συγκεκριμένους πόρους**, έναν file server, μια εσωτερική web εφαρμογή, ένα RDP endpoint, χωρίς ποτέ να αποκτήσεις πραγματική θέση μέσα στο υπόλοιπο δίκτυο. Είναι η ίδια λογική **Zero Trust Network Access, ZTNA**, που έχει γίνει standard προσέγγιση σε αυτή την κατηγορία λύσεων: least privilege όχι ως σύνθημα, αλλά ως αρχιτεκτονική απόφαση.

## Δύο τρόποι διαμόρφωσης: Quick Access και per-app access

Το Entra Private Access δίνει δύο τρόπους να ορίσεις ποιοι private πόροι θα περνούν μέσα από την υπηρεσία, και η επιλογή ανάμεσά τους είναι ουσιαστικά μια απόφαση για το πόσο σφιχτό θέλεις τον έλεγχο.

Το **Quick Access** είναι η κύρια, ευρύτερη ομάδα από FQDNs και IP διευθύνσεις που θέλεις να ασφαλίσεις, ένα σχετικά γρήγορο σημείο εκκίνησης, πρακτικά ένα «αντικατέστησε το VPN μου με το ελάχιστο δυνατό effort» σενάριο. Η **per-app access** μέσα από ένα **Global Secure Access application**, αντίθετα, σου δίνει πιο λεπτομερή προσέγγιση: ορίζεις ένα υποσύνολο private πόρων, συγκεκριμένα application segments, ξεχωριστά για κάθε εφαρμογή ή ομάδα εφαρμογών, με τη δική τους ξεχωριστή πολιτική Conditional Access.

[![Δημιουργία Quick Access εφαρμογής με application segments στο Global Secure Access](/images/global-secure-access-series/private-access-quick-access-app-segments.png)](/images/global-secure-access-series/private-access-quick-access-app-segments.png)
> 📷 **Εικόνα 1: Global Secure Access → Applications → Enterprise applications → Quick Access. Δημιουργία εφαρμογής με application segments (FQDN/IP) που θα τουνελαριστούν μέσα από την υπηρεσία.**

Και στις δύο περιπτώσεις, ό,τι φτιάχνεις λειτουργεί σαν ένα νέο enterprise application μέσα στο Entra ID, ένα container για τους private πόρους που θέλεις να προστατεύσεις, όχι σαν ξεχωριστό, παράλληλο σύστημα διαχείρισης.

## Ο ρόλος του private network connector

Για να λειτουργήσει οτιδήποτε από τα παραπάνω, χρειάζεται τουλάχιστον ένας ενεργός **Microsoft Entra private network connector**, εγκατεστημένος σε μηχάνημα μέσα στο εσωτερικό σου δίκτυο. Ο connector είναι αυτός που κάνει το broker ανάμεσα στο cloud service της Microsoft και τους πραγματικούς εσωτερικούς πόρους σου, χωρίς να χρειάζεται να ανοίξεις inbound θύρες προς τα έσω, όπως θα έκανες παραδοσιακά για να εκθέσεις μια υπηρεσία προς τα έξω.

[![Global Secure Access private network connector κατάσταση σύνδεσης](/images/global-secure-access-series/private-access-connector-status.png)](/images/global-secure-access-series/private-access-connector-status.png)
> 📷 **Εικόνα 2: Global Secure Access → Connect → Connectors and sensors. Κατάσταση ενός εγκατεστημένου private network connector και της connector group στην οποία ανήκει.**

Το ελάχιστο υποστηριζόμενο version connector για Private Access είναι το 1.5.3417.0. Οι connectors οργανώνονται σε connector groups, και κάθε Quick Access ή per-app εφαρμογή που φτιάχνεις συνδέεται σε μια συγκεκριμένη connector group, όχι σε μεμονωμένο connector, κάτι που επιτρέπει redundancy αν έχεις περισσότερους από έναν connector στην ίδια ομάδα.

## Πώς φτάνει η κίνηση εκεί, και τι δεν υποστηρίζεται ακόμα

Σε αντίθεση με το Microsoft traffic profile και το Internet access profile, που μπορούν να αποκτήσουν κίνηση είτε μέσω client είτε μέσω remote network connectivity, το **Private access traffic μπορεί να αποκτηθεί προς το παρόν μόνο μέσω του Global Secure Access desktop client**. Δεν υποστηρίζεται ακόμα μέσω remote networks, κάτι που είναι σημαντικό να το ξέρεις αν σχεδιάζεις ένα σενάριο με branch office χωρίς client σε κάθε συσκευή.

Ένας ακόμα περιορισμός που αξίζει να έχεις υπόψη πριν σχεδιάσεις γύρω από IP διευθύνσεις: το tunneling προς private προορισμούς με βάση IP υποστηρίζεται μόνο για εύρη IP εκτός του local subnet της συσκευής του τελικού χρήστη. Αν ο στόχος και η συσκευή βρίσκονται στο ίδιο local subnet, το σενάριο δεν λειτουργεί όπως θα περίμενες, και θα χρειαστεί να το λάβεις υπόψη στον σχεδιασμό, ειδικά σε σενάρια όπου κάποιοι χρήστες βρίσκονται ήδη φυσικά στο γραφείο.

## Ενεργοποίηση: τα βασικά βήματα

Η ενεργοποίηση ακολουθεί λογική παρόμοια με τα προηγούμενα profiles, στο **Global Secure Access → Connect → Traffic forwarding**, ενεργοποιείς το Private access profile. Το profile μπορεί να ενεργοποιηθεί και πριν καν έχεις φτιάξει Quick Access ή per-app εφαρμογές, απλώς χωρίς αυτές δεν υπάρχει ακόμα κίνηση να προωθηθεί. Η πλήρης αλληλουχία βημάτων είναι: διαμόρφωση connector και connector group, διαμόρφωση Quick Access ή per-app εφαρμογής με τα resources της, ενεργοποίηση του Private access profile, και εγκατάσταση του client στις συσκευές των χρηστών.

Για ρόλους, χρειάζεσαι **Global Secure Access Administrator** για να ενεργοποιήσεις το profile, και **Conditional Access Administrator** αν θα φτιάξεις ή θα τροποποιήσεις πολιτικές πάνω σε αυτές τις εφαρμογές.

## Conditional Access πάνω σε private εφαρμογές

Ό,τι φτιάχνεις μέσα από Quick Access ή per-app access λειτουργεί σαν κανονικό enterprise application στο Entra ID, που σημαίνει ότι μπορείς να συνδέσεις πάνω του τις ίδιες πολιτικές Conditional Access που θα έβαζες σε οποιαδήποτε άλλη cloud εφαρμογή, MFA, compliant device, sign-in risk, ακόμα και block από οπουδήποτε εκτός του Global Secure Access δικτύου, ακριβώς όπως είδαμε στο Μέρος 3 για το Internet access profile. Η διαφορά είναι ότι τώρα αυτός ο έλεγχος εφαρμόζεται σε πόρους που παραδοσιακά ζούσαν εντελώς εκτός Entra ID, servers, file shares, εσωτερικές web εφαρμογές που ίσως ούτε καν υποστηρίζουν σύγχρονη αυθεντικοποίηση από μόνες τους.

Για σενάρια με ιδιαίτερα ευαίσθητους πόρους, domain controllers, κρίσιμα line-of-business συστήματα, η Microsoft προτείνει να προστεθεί ένα ακόμα επίπεδο, **Privileged Identity Management (PIM)** πάνω από το ήδη ασφαλισμένο private access, ώστε η πρόσβαση σε αυτούς τους συγκεκριμένους πόρους να είναι just-in-time, όχι μόνιμα ενεργή, ακολουθώντας πιο αυστηρά την αρχή του least privilege.

## Licensing

Το Private access profile απαιτεί, πέρα από το προαπαιτούμενο **Microsoft Entra ID P1 ή P2**, ένα ξεχωριστό license **Microsoft Entra Private Access** ή, εναλλακτικά, το ευρύτερο πακέτο **Microsoft Entra Suite**. Όπως και στα προηγούμενα μέρη, η ακριβής τιμολόγηση αλλάζει συχνά, οπότε το σωστό είναι πάντα να επιβεβαιώνεται μέσα από το επίσημο Microsoft pricing page πριν μπει σε business case.

## Η οπτική NIS2 και ISO 27001

**Έλεγχος πρόσβασης σε επίπεδο πόρου, όχι δικτύου, ISO 27001 A.8.3.** Το control γύρω από τον περιορισμό πρόσβασης σε πληροφορίες ζητά ακριβώς αυτή τη λογική, πρόσβαση μόνο σε ό,τι χρειάζεται ο χρήστης, όχι σε ολόκληρο το περιβάλλον. Η per-app προσέγγιση του Private Access, όπου κάθε εφαρμογή έχει τα δικά της, ξεχωριστά application segments και τη δική της πολιτική, είναι πιο εύκολο να τεκμηριωθεί ως συμμόρφωση με αυτό το control σε σχέση με ένα παραδοσιακό VPN που δίνει πρόσβαση σε ολόκληρο υποδίκτυο.

**Ασφαλής απομακρυσμένη πρόσβαση χωρίς inbound έκθεση, NIS2.** Το ότι ο private network connector λειτουργεί με outbound σύνδεση προς την υπηρεσία της Microsoft, χωρίς να χρειάζεται να ανοίξεις inbound θύρες προς το εσωτερικό δίκτυο, είναι ένα τεχνικό χαρακτηριστικό που μειώνει άμεσα την επιφάνεια επίθεσης, ακριβώς το είδος τεχνικού μέτρου που το NIS2 ζητά να είναι τεκμηριωμένο ρητά, όχι απλώς να υπάρχει σιωπηρά.

**PIM πάνω από private access ως evidence ωριμότητας ελέγχων.** Για συστήματα υψηλού ρίσκου, η δυνατότητα να δείξεις ότι η πρόσβαση δεν είναι απλώς περιορισμένη σε επίπεδο resource, αλλά και χρονικά περιορισμένη μέσω just-in-time activation, είναι ακριβώς το είδος στρωματοποιημένου ελέγχου που ενισχύει σημαντικά ένα ISO 27001 audit πάνω σε κρίσιμα assets.

## Τι θα πρόσεχα πριν αντικαταστήσω το VPN

Δεν θα πρότεινα ποτέ να κλείσεις το υπάρχον VPN σου την ίδια μέρα που ενεργοποιείς το Private access profile. Η ρεαλιστική προσέγγιση είναι σταδιακή μετάβαση, wave-based, όπως τη περιγράφει και η ίδια η Microsoft στους deployment guides της: ξεκινάς με μια ομάδα pilot χρηστών και έναν περιορισμένο αριθμό private resources, δοκιμάζεις, επιβεβαιώνεις ότι όλα λειτουργούν όπως αναμένεται, και μόνο μετά επεκτείνεις σε επόμενα κύματα χρηστών και εφαρμογών. Λάβε επίσης σοβαρά υπόψη τον περιορισμό για local subnet IP tunneling, αν έχεις χρήστες που δουλεύουν φυσικά μέσα στο γραφείο και προσπαθούν να προσπελάσουν πόρους στο ίδιο τοπικό δίκτυο.

## Κλείνοντας τη βασική εικόνα, πριν το Conditional Access σε βάθος

Με αυτό το τέταρτο μέρος κλείνει η βασική εικόνα των τριών traffic profiles του Global Secure Access: η φιλοσοφία SSE στο Μέρος 1, το θεμέλιο του Microsoft traffic profile στο Μέρος 2, το Secure Web Gateway του Internet access profile στο Μέρος 3, και τώρα η αντικατάσταση του VPN μέσω του Private access profile. Τα τέσσερα profiles δεν λειτουργούν απομονωμένα το ένα από το άλλο, όπως είδαμε, μοιράζονται το ίδιο σημείο διαχείρισης, την ίδια ενσωμάτωση με το Conditional Access, και την ίδια θεμελιώδη φιλοσοφία: η απόφαση πρόσβασης βασίζεται σε ταυτότητα, όχι σε φυσική θέση δικτύου.

Μένει ένα ακόμα, πέμπτο μέρος, αφιερωμένο αμιγώς στο πώς το Conditional Access δένει όλα αυτά μαζί σε πράξη, με συγκεκριμένα παραδείγματα πολιτικών που μπορείς να αντιγράψεις κατευθείαν στο δικό σου tenant.

Αν έχεις ήδη ξεκινήσει κάποιο κομμάτι αυτής της μετάβασης στον οργανισμό σου, ή αν σκέφτεσαι από πού να ξεκινήσεις, χαίρομαι πάντα να το συζητήσουμε στα σχόλια ή στο LinkedIn.
