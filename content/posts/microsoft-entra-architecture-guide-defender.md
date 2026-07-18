---
title: "Microsoft Entra Architecture: Πώς Στήνεται Πραγματικά η Ταυτότητά σου στο Cloud (και γιατί ο Defender σε νοιάζει)"
date: 2026-07-18T12:00:00+03:00
lastmod: 2026-07-18T14:20:00+03:00
draft: false
slug: "microsoft-entra-architecture-guide-defender"
keywords: 
  - Microsoft Entra architecture
  - Entra ID αρχιτεκτονική
  - Entra ID architecture
  - Microsoft Entra ID ελληνικά
  - Microsoft Defender for Identity
  - hybrid identity
  - Conditional Access
  - Zero Trust identity
  - primary replica secondary replica Entra
  - Microsoft 365 security αρχιτεκτονική
  - Microsoft 365 security architecture
  - identity security operations
tags: 
  - Microsoft Entra ID
  - Microsoft Entra Architecture
  - Microsoft Defender
  - Microsoft 365 Security
  - Zero Trust
  - Identity Security
  - Hybrid Identity
  - Conditional Access
  - Defender for Identity
  - Microsoft Sentinel
author: "Dimosthenis Atteia"
description: "Ένας πρακτικός οδηγός για νέους IT επαγγελματίες στο Microsoft 365: πώς λειτουργεί η αρχιτεκτονική του Microsoft Entra ID (primary/secondary replicas, scalability, availability) και πώς συνδέεται με το Microsoft Defender για ουσιαστική άμυνα ταυτότητας."
summary: "Κατανόησε την αρχιτεκτονική του Microsoft Entra ID -partitions, replicas, availability, consistency- και δες γιατί η σωστή γνώση της είναι το θεμέλιο για να χρησιμοποιήσεις σωστά το Microsoft Defender στην καθημερινή σου δουλειά."
categories: ["Microsoft 365 Security", "Identity & Access Management"]
series:
ShowToc: true
TocOpen: true
weight:
cover:
    image: "images/entra-architecture-defender-cover.png"
    alt: "Διάγραμμα αρχιτεκτονικής Microsoft Entra ID με σύνδεση προς Microsoft Defender, geo-distributed datacenters και ροή αυθεντικοποίησης"
    caption: "Η αρχιτεκτονική του Microsoft Entra ID ως θεμέλιο για τη στρατηγική Zero Trust και το Microsoft Defender"
    relative: true
ShowReadingTime: true
ShowWordCount: true
---

## Γιατί ασχολούμαι σήμερα με κάτι τόσο «θεωρητικό»

Όταν ξεκίνησα να δουλεύω σοβαρά με το Microsoft 365 Security, το Entra ID (τότε ακόμα Azure AD) μου φαινόταν σαν ένα «μαύρο κουτί». Έμπαινα στο Conditional Access, έφτιαχνα πολιτικές, έβλεπα sign-in logs, αλλά δεν είχα ιδέα *τι* συμβαίνει πραγματικά από πίσω όταν ένας χρήστης πατάει «Sign in». Και αυτό, στην πράξη, με είχε φέρει αρκετές φορές σε δύσκολη θέση: όταν κάτι πήγαινε στραβά -μια καθυστέρηση σε replication, ένα inconsistent state μετά από αλλαγή ρόλου- δεν καταλάβαινα *γιατί*.

Αν είσαι νέος/α στο Microsoft 365 και θέλεις να χτίσεις πραγματική τεχνογνωσία στο security (όχι μόνο να ξέρεις "πού είναι το κουμπί") η κατανόηση της αρχιτεκτονικής του Entra ID είναι κάτι που θα σε ξεχωρίσει. Και το καλύτερο μέρος; Δεν χρειάζεται να το μάθεις θεωρητικά και ξέχωρα από το security. Μπορείς να το συνδέσεις κατευθείαν με το πώς δουλεύει το Microsoft Defender, γιατί οι δύο κόσμοι είναι πλέον ένα.

Σε αυτό το άρθρο θα περάσουμε μαζί από τα βασικά δομικά στοιχεία της αρχιτεκτονικής του Microsoft Entra ID (όπως τα περιγράφει η επίσημη τεκμηρίωση της Microsoft) και θα δούμε πρακτικά πού «κουμπώνει» πάνω σε αυτά το Defender ecosystem.

## Το θεμέλιο: πώς είναι χτισμένο το Microsoft Entra ID

Το Entra ID δεν είναι ένας απλός server ή ένα απλό directory. Είναι μια κατανεμημένη υπηρεσία (distributed service) που τρέχει σε datacenters σε όλο τον κόσμο, σχεδιασμένη έτσι ώστε να είναι διαθέσιμη σχεδόν συνέχεια, ακόμα και όταν αποτυγχάνει ένα ολόκληρο datacenter.

### Partitions: το κατανεμημένο μοντέλο δεδομένων

Αντί να κρατάει όλα τα δεδομένα ενός tenant σε ένα σημείο, το Entra ID σπάει τα δεδομένα σε ανεξάρτητες μονάδες κλιμάκωσης, τις λεγόμενες **partitions**. Κάθε partition έχει τη δική του δομή για writes και reads, κάτι που επιτρέπει στη Microsoft να κλιμακώνει το σύστημα σε παγκόσμιο επίπεδο χωρίς ένα partition να «σέρνει» ολόκληρο το σύστημα μαζί του.

### Primary replica vs. secondary replicas: η καρδιά της αρχιτεκτονικής

Αυτό είναι, κατά τη γνώμη μου, το πιο σημαντικό σημείο για να καταλάβεις πώς «σκέφτεται» το Entra ID:

- Κάθε partition έχει ένα **primary replica**, το οποίο είναι το μοναδικό σημείο που δέχεται όλες τις εγγραφές (writes), π.χ. μια αλλαγή password, μια νέα ανάθεση ρόλου, μια νέα εγγραφή συσκευής.
- Όταν γίνεται ένα write, αυτό αντιγράφεται άμεσα (replicate) σε ένα δεύτερο datacenter πριν καν επιστραφεί επιτυχία στον χρήστη ή στην εφαρμογή. Αυτό εξασφαλίζει ότι δεν χάνεται δεδομένο ακόμα κι αν χαθεί ολόκληρο το datacenter που φιλοξενεί το primary.
- Οι αναγνώσεις (reads) π.χ. ένα αίτημα αυθεντικοποίησης- εξυπηρετούνται από **secondary replicas**, που βρίσκονται σε πολλά διαφορετικά datacenters κοντά στους χρήστες, ώστε να είναι γρήγορες.

Με απλά λόγια: όταν κάνεις sign-in, πιθανότατα εξυπηρετείσαι από ένα secondary replica κοντά σου. Όταν όμως αλλάζεις κάτι, π.χ. προσθέτεις MFA method ή σε προσθέτουν σε group αυτό το write πηγαίνει πάντα στο primary replica του partition σου, όπου κι αν βρίσκεται γεωγραφικά.

### Γιατί αυτό έχει σημασία στην πράξη

Έχεις αναρωτηθεί ποτέ γιατί μια αλλαγή σε group membership ή σε Conditional Access policy μπορεί να χρειαστεί λίγα λεπτά για να «πιάσει» παντού; Αυτό σχετίζεται ακριβώς με το μοντέλο replication που περιγράψαμε -το directory model του Entra ID είναι σχεδιασμένο με **eventual consistency**, όχι strict consistency σε κάθε σημείο του κόσμου ταυτόχρονα. Η Microsoft Graph API φροντίζει να διατηρεί μια λογική «συνέδρια ανάγνωσης-εγγραφής» (session affinity) ώστε μέσα στην ίδια αλληλεπίδραση να βλέπεις συνεπή δεδομένα, αλλά αν χτυπήσεις την υπηρεσία από διαφορετικά datacenters ταυτόχρονα, μπορεί προσωρινά να δεις διαφορετική εικόνα.

Αυτό δεν είναι bug. Είναι design trade-off ανάμεσα σε ταχύτητα, διαθεσιμότητα σε παγκόσμια κλίμακα και ισχυρή συνέπεια δεδομένων -ένα από τα κλασικά διλήμματα στα κατανεμημένα συστήματα.

### Διαθεσιμότητα και ανοχή σε βλάβες

Το Entra ID έχει σχεδιαστεί ώστε να μη χρειάζεται planned downtime για συντήρηση. Αν το primary replica ενός partition αποτύχει, το σύστημα ανιχνεύει τη βλάβη και προωθεί τα writes σε άλλο replica, το οποίο γίνεται το νέο primary -μια διαδικασία που μπορεί να επηρεάσει τη διαθεσιμότητα εγγραφών για 1-2 λεπτά, ενώ οι αναγνώσεις συνεχίζουν κανονικά, αφού εξυπηρετούνται από άλλα, ανεξάρτητα secondary replicas.

Επίσης, η Microsoft κρατά **daily backups** των directory δεδομένων και υποστηρίζει soft-delete για αρκετούς τύπους αντικειμένων, με δυνατότητα επαναφοράς έως και 30 ημέρες μετά από μια διαγραφή, κάτι πολύ χρήσιμο να ξέρεις όταν κάποιος διαγράψει κατά λάθος ένα critical group ή service principal.

## Από την αρχιτεκτονική στο security: εδώ μπαίνει το Defender

Μέχρι εδώ μιλήσαμε «καθαρά» αρχιτεκτονική. Αλλά αν δουλεύεις (ή θέλεις να δουλέψεις) σε ρόλο security, η αξία αυτής της γνώσης φαίνεται μόνο όταν τη συνδέσεις με το πώς παρακολουθείς και προστατεύεις αυτό το σύστημα. Κι εδώ μπαίνει το Microsoft Defender family.

### Το Entra ID ως το "control plane" της ταυτότητας

Η φιλοσοφία της Microsoft για Zero Trust βασίζεται στην αρχή του Defense in Depth, με την ταυτότητα (identity) να λειτουργεί ως το κεντρικό control plane. Αυτό σημαίνει ότι σχεδόν κάθε απόφαση πρόσβασης -σε email, σε SharePoint, σε εφαρμογή, σε cloud resource- περνάει, με τον έναν ή τον άλλο τρόπο, μέσα από το Entra ID. Αν καταλαβαίνεις πώς λειτουργεί αυτό το directory από μέσα, καταλαβαίνεις *γιατί* το Defender χτίζεται γύρω του και όχι δίπλα του.

### Hybrid identity: το σημείο όπου συναντιούνται on-prem και cloud

Στην πραγματικότητα, οι περισσότερες ελληνικές επιχειρήσεις (ειδικά βιομηχανικές ή με ιστορικό IT infrastructure) δεν είναι «καθαρά cloud». Έχουν hybrid identity, με on-premises Active Directory να συγχρονίζεται με το Entra ID μέσω ενός από τρεις μεθόδους αυθεντικοποίησης: password hash synchronization (PHS), pass-through authentication (PTA), ή federation μέσω AD FS. Η επιλογή της μεθόδου δεν είναι απλά τεχνική λεπτομέρεια καθορίζει και το attack surface σου.

Αν έχεις hybrid περιβάλλον, η επίσημη καθοδήγηση της Microsoft προτείνει να παρακολουθείς τους domain controllers σου με το **Microsoft Defender for Identity**, ακριβώς επειδή αυτό δίνει την καλύτερη ανίχνευση επιθέσεων που στοχεύουν το on-prem κομμάτι της ταυτότητάς σου -πράγματα όπως Kerberoasting, lateral movement, ή DCSync attacks, που ένα καθαρό cloud εργαλείο δύσκολα θα έβλεπε.

### Πού «κουμπώνει» κάθε κομμάτι του Defender

Αν σκεφτείς την αρχιτεκτονική του Entra ID σαν ένα σύστημα με σημεία εισόδου (sign-ins), αλλαγές κατάστασης (writes/directory changes) και ροές δεδομένων (logs), το κάθε Defender προϊόν καλύπτει διαφορετικό κομμάτι αυτής της εικόνας:

- **Microsoft Entra ID Protection** αξιοποιεί τα risk signals από τα sign-in logs και παράγει αναφορές risky users, risky sign-ins και risk detections -ουσιαστικά «διαβάζει» σε πραγματικό χρόνο τη ροή αναγνώσεων που περιγράψαμε παραπάνω.
- **Microsoft Defender for Identity** παρακολουθεί το on-premises κομμάτι (τους domain controllers) και συμπληρώνει την εικόνα εκεί όπου το cloud directory δεν έχει ορατότητα.
- **Microsoft Defender for Cloud Apps** δίνει ορατότητα στο πώς χρησιμοποιούνται οι εφαρμογές που είναι συνδεδεμένες στο Entra ID, κάτι κρίσιμο όταν σκέφτεσαι πόσες εφαρμογές τρίτων έχουν σήμερα πρόσβαση σε δεδομένα οργανισμού μέσω OAuth consent.
- **Microsoft Sentinel** λειτουργεί ως το σημείο συγκέντρωσης -παίρνει audit logs, sign-in logs, Microsoft 365 audit logs, ακόμα και Azure Key Vault logs, και σου δίνει τη δυνατότητα για συσχέτιση σε επίπεδο SIEM.

Το σημαντικό εδώ δεν είναι να αποστηθίσεις ονόματα προϊόντων. Είναι να καταλάβεις ότι κάθε ένα από αυτά «βλέπει» ένα διαφορετικό κομμάτι της ίδιας κατανεμημένης αρχιτεκτονικής που περιγράψαμε στην αρχή του άρθρου.

### Conditional Access: η πρακτική εφαρμογή του primary/secondary μοντέλου

Ένα ωραίο παράδειγμα για να «κλείσει» ο κύκλος: όταν φτιάχνεις μια πολιτική Conditional Access, ουσιαστικά ορίζεις κανόνες που θα εφαρμοστούν σε reads που γίνονται από secondary replicas σε όλο τον κόσμο. Γι' αυτό η Microsoft προτείνει να χρησιμοποιείς το **Conditional Access insights and reporting workbook** για να δεις πραγματικά πώς εφαρμόζεται η πολιτική σου σε βάθος χρόνου και σε διαφορετικές τοποθεσίες -γιατί η «καθολική» εφαρμογή μιας πολιτικής δεν είναι στιγμιαία σε παγκόσμιο επίπεδο.

## Τι να κρατήσεις αν είσαι στην αρχή της πορείας σου

Αν είσαι νέος/α επαγγελματίας IT και θέλεις να χτίσεις σοβαρή τεχνογνωσία στο Microsoft 365 Security, θα σου πρότεινα:

1. Μην μάθεις το Conditional Access ή το Defender σαν «checkbox εργαλεία». Μάθε πρώτα πώς λειτουργεί το directory από κάτω -reads, writes, replication, consistency.
2. Δοκίμασε να διαβάσεις τα sign-in logs σου σκεπτόμενος «από ποιο datacenter εξυπηρετήθηκε αυτό» και «πόσο γρήγορα θα φανεί μια αλλαγή που έκανα».
3. Αν δουλεύεις σε hybrid περιβάλλον, μην αγνοείς το on-premises κομμάτι, το Defender for Identity υπάρχει ακριβώς επειδή το cloud directory δεν βλέπει τα πάντα.
4. Χρησιμοποίησε το official Microsoft Entra SecOps Guide σαν οδικό χάρτη, καλύπτει ξεχωριστά user accounts, privileged accounts, PIM, εφαρμογές, συσκευές και infrastructure, με συγκεκριμένα σενάρια monitoring για το καθένα.

## Κλείνοντας

Η αρχιτεκτονική του Microsoft Entra ID δεν είναι απλά ακαδημαϊκό υλικό για πιστοποιήσεις. Είναι η βάση πάνω στην οποία χτίζεται ολόκληρη η στρατηγική Zero Trust της Microsoft, και κατ' επέκταση όλο το Defender ecosystem. Όσο πιο βαθιά καταλαβαίνεις πώς κινούνται τα δεδομένα (ποιος γράφει, ποιος διαβάζει, πού αντιγράφεται, πόσο γρήγορα συγχρονίζεται) τόσο πιο εύκολα θα καταλαβαίνεις *γιατί* ένα alert εμφανίστηκε, *γιατί* μια πολιτική άργησε να εφαρμοστεί, ή *γιατί* ένα incident εξελίχθηκε όπως εξελίχθηκε.

Αν θες να πάμε βαθύτερα σε κάποιο από αυτά τα κομμάτια, π.χ. resilience σε hybrid authentication ή πώς στήνεται σωστά το Defender for Identity, πες μου στα σχόλια, γιατί σκοπεύω να συνεχίσω αυτή τη σειρά.

---

### Πηγές

Το άρθρο βασίζεται στην επίσημη τεκμηρίωση της Microsoft:
- [Microsoft Entra architecture documentation](https://learn.microsoft.com/en-us/entra/architecture/)
- [Architecture overview - Microsoft Entra](https://learn.microsoft.com/en-us/entra/architecture/architecture)
- [Microsoft Entra security operations guide](https://learn.microsoft.com/en-us/entra/architecture/security-operations-introduction)

---