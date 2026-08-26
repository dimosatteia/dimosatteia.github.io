---
title: "Cross-Tenant Message Recall: Όταν ένας «έμπιστος» tenant μπορεί να διαγράψει email από τα inbox των χρηστών σου (MC1423106)"
date: 2026-08-26T09:00:00+03:00
lastmod: 2026-08-26T09:05:00+03:00
draft: false
keywords:
  - Cross-tenant message recall Exchange Online
  - Set-CrossTenantRecallConfiguration
  - AllowedSenderTenantIds
  - MC1423106
  - Roadmap ID 561330
  - Exchange Online message recall
  - Trusted tenant allow list Microsoft 365
  - NIS2 email data governance
  - ISO 27001 supplier relationships A.5.19
  - eDiscovery litigation hold recall
tags:
  - Exchange Online
  - Microsoft 365
  - Message Recall
  - Cross-Tenant
  - Email Security
  - NIS2
  - ISO 27001
  - GRC
  - Data Governance
  - Cybersecurity
author: "Dimosthenis Atteia"
description: "Ανάλυση του MC1423106 και του νέου Cross-Tenant Message Recall στο Exchange Online: πώς λειτουργεί, γιατί αλλάζει το trust boundary ανάμεσα σε tenants, και τι πρέπει να προσέξει ένας CISO πριν ενεργοποιήσει το allow list, με τη ματιά της τεκμηρίωσης NIS2 και ISO 27001."
summary: "Το Message Recall σταματούσε πάντα στα σύνορα του tenant. Τώρα η Microsoft ανοίγει αυτό το σύνορο, επιτρέποντας σε επιλεγμένους εξωτερικούς tenants να διαγράφουν μηνύματα από τα mailbox των δικών σου χρηστών. Είναι μια δυνατότητα που λύνει πραγματικό πρόβλημα, αλλά μετατοπίζει την ευθύνη ελέγχου σε ένα σημείο που πολλά GRC προγράμματα δεν έχουν ακόμα καλύψει."
categories: ["Microsoft 365 Security", "Email Security"]
series:
releases:
  - "generally-available"       # ← αυτό στο /releases/generally-available/
ShowToc: true
TocOpen: false
weight: -6
cover:
  image: "images/cross-tenant-message-recall-exchange-online/cross-tenant-recall-cover.png"
  alt: "Exchange Online PowerShell εντολή Set-CrossTenantRecallConfiguration για ενεργοποίηση cross-tenant message recall"
  caption: "Exchange Online PowerShell"
  relative: true
ShowReadingTime: true
ShowWordCount: true
---

Ένα από τα πιο παλιά «θα ήταν ωραίο αν...» αιτήματα στο Exchange Online ήταν αυτό: να μπορείς να ανακαλέσεις ένα email που έστειλες κατά λάθος σε κάποιον εκτός του οργανισμού σου. Μέχρι σήμερα, το Message Recall σταματούσε ακριβώς στα σύνορα του tenant, μπορούσες να διαγράψεις ένα μήνυμα από το mailbox συναδέλφου σου, ποτέ όμως από το mailbox ενός πελάτη, συνεργάτη ή θυγατρικής σε άλλο Microsoft 365 tenant. Με το [MC1423106](https://mc.merill.net/message/MC1423106), αυτό το σύνορο ανοίγει. Και όπως συμβαίνει σχεδόν πάντα όταν ανοίγει ένα trust boundary ανάμεσα σε δύο tenants, το ενδιαφέρον από τη σκοπιά ασφάλειας δεν είναι στο «πώς λειτουργεί», είναι στο «ποιος αποφασίζει, και με βάση τι».

## Τι ανακοινώνει η Microsoft

Η ανακοίνωση περιγράφει το **Cross-Tenant Message Recall**, μια επέκταση του υπάρχοντος cloud-based Message Recall στο Exchange Online, ώστε οργανισμοί να μπορούν να επιτρέπουν σε έμπιστους εξωτερικούς Microsoft 365 tenants να ανακαλούν μηνύματα που έχουν σταλεί στους χρήστες τους. Το feature είναι **απενεργοποιημένο by default**, ενεργοποιείται και διαχειρίζεται αποκλειστικά μέσω Exchange Online PowerShell, με ένα allow list από tenant IDs που ελέγχει ποιοι εξωτερικοί οργανισμοί επιτρέπεται να κάνουν recall.

**Βασικά στοιχεία:**
- **Roadmap ID:** 561330
- **Rollout:** αρχίζει μέσα Αυγούστου 2026, με ολοκλήρωση αρχές Σεπτεμβρίου 2026, σε Worldwide, GCC, GCC High και DoD
- **Ποιον αφορά:** Exchange Online administrators, οργανισμούς που συνεργάζονται με εξωτερικά Microsoft 365 tenants
- **Πλατφόρμες:** Outlook σε web, desktop και mobile

Καλό είναι να θυμηθούμε πρώτα τι είναι το υπάρχον Message Recall, γιατί χωρίς αυτό το background το νέο feature φαίνεται πιο απλό απ' όσο πραγματικά είναι. Το cloud-based Message Recall αντικατέστησε το 2023 την παλιά, αναξιόπιστη λογική του classic Outlook recall. Όταν ο χρήστης πατάει «Recall», δημιουργείται ένα ειδικό μήνυμα τύπου IPM.Outlook.Recall, το οποίο το Message Recall agent αναγνωρίζει και προχωράει σε **hard delete** του αρχικού μηνύματος από το mailbox του παραλήπτη, με προαιρετική αποστολή αντικαταστάτη. Αυτό δεν είναι soft delete σε Deleted Items, είναι server-side διαγραφή. Το ίδιο μηχανισμό, ουσιαστικά, «ανοίγει» τώρα η Microsoft και προς εξωτερικά tenants.

## Πώς ενεργοποιείται στην πράξη

Δεν υπάρχει (προς το παρόν τουλάχιστον) toggle στο Exchange admin center. Όλη η διαχείριση γίνεται με δύο cmdlets:

```powershell
# Ενεργοποίηση / απενεργοποίηση cross-tenant recall για τον tenant
Set-CrossTenantRecallConfiguration -CrossTenantRecallEnabled $true
Set-CrossTenantRecallConfiguration -CrossTenantRecallEnabled $false

# Διαχείριση allow list εξωτερικών tenants
Set-CrossTenantRecallConfiguration -AllowedSenderTenantIds @{Add="tenantId1","tenantId2"}
Set-CrossTenantRecallConfiguration -AllowedSenderTenantIds @{Remove="tenantId1","tenantId2"}
```

[![Exchange Online PowerShell με το cmdlet Set-CrossTenantRecallConfiguration](/images/cross-tenant-message-recall-exchange-online/set-crosstenantrecallconfiguration-powershell.png)](/images/cross-tenant-message-recall-exchange-online/set-crosstenantrecallconfiguration-powershell.png)
> 📷 **Εικόνα 1: Exchange Online PowerShell. Ενεργοποίηση cross-tenant recall και προσθήκη tenant ID στο allow list.**

Λίγα σημεία αξίζει να τα κρατήσεις:

- Η ρύθμιση είναι **ανά κατεύθυνση και ανά tenant**: κάθε οργανισμός ελέγχει ανεξάρτητα ποιους εξωτερικούς tenants εμπιστεύεται να κάνουν recall σε δικά του mailboxes. Το ότι εσύ επιτρέπεις σε κάποιον tenant δεν σημαίνει ότι κι εκείνος σε επιτρέπει αυτόματα, η σχέση δεν είναι εγγενώς αμφίδρομη, εκτός αν και οι δύο πλευρές τη ρυθμίσουν.
- Όταν ένα recall φτάσει από allow-listed tenant, ο παραλήπτης το βιώνει **ακριβώς όπως ένα ενδοεταιρικό recall**. Αν έχεις ενεργοποιημένες recipient recall notifications, ενεργοποιούνται και εδώ.
- Recall από tenant που δεν βρίσκεται στο allow list αποτυγχάνει σιωπηλά, χωρίς να ανοίγει κάποιο παράθυρο αβεβαιότητας για τον admin σου.
- Δεν χρειάζεται κάποια ενέργεια για να διατηρήσεις τη default συμπεριφορά, το feature μένει κλειστό μέχρι να το ενεργοποιήσεις ρητά.

## Το σημείο που με προβληματίζει ως CISO

Μέχρι εδώ, όλα ακούγονται λογικά και μάλιστα χρήσιμα, ειδικά για οργανισμούς που ανταλλάσσουν τακτικά ευαίσθητο υλικό με θυγατρικές, νομικούς συμβούλους ή στρατηγικούς προμηθευτές. Το κομμάτι που με σταματάει δεν είναι το «τι κάνει» το feature, είναι **ποιος αποφασίζει ότι ένα συγκεκριμένο μήνυμα πρέπει να διαγραφεί** από ένα mailbox του δικού μου οργανισμού.

Στο ενδοεταιρικό recall, ο έλεγχος είναι διπλός εξ ορισμού: ο αποστολέας ζητά την ανάκληση, αλλά η ενέργεια συμβαίνει μέσα στα δικά μου δεδομένα, με τη δική μου Unified Audit Log καταγραφή, μέσα στη δική μου security boundary. Στο cross-tenant μοντέλο, η απόφαση «αυτό το μήνυμα πρέπει να φύγει» παίρνεται από **χρήστη άλλου οργανισμού**, ο οποίος ενεργεί μέσα στη δική του υποδομή, με τα δικά του access controls, τη δική του πολιτική για ποιος μπορεί να κάνει recall, και το αποτέλεσμα εκτελείται πάνω σε mailbox που ανήκει σε μένα. Ο έλεγχος πρόσβασης που πραγματικά μετράει, ποιος χρήστης στον εξωτερικό tenant επιτρέπεται να πατήσει «Recall», δεν είναι κάτι που βλέπω, ούτε κάτι που μπορώ να ελέγξω. Εμπιστεύομαι έναν ολόκληρο tenant ID, όχι ένα άτομο ή μια πολιτική.

[![Two-tenant trust diagram για cross-tenant message recall](/images/cross-tenant-message-recall-exchange-online/cross-tenant-trust-boundary-diagram.png)](/images/cross-tenant-message-recall-exchange-online/cross-tenant-trust-boundary-diagram.png)
> 📷 **Εικόνα 2: Εννοιολογικό διάγραμμα. Ο εξωτερικός tenant αποφασίζει το recall, η ενέργεια εκτελείται πάνω σε mailbox του δικού μου tenant.**

Υπάρχει και ένα δεύτερο, πιο λεπτό ζήτημα: το allow list λειτουργεί σε επίπεδο **tenant**, όχι σε επίπεδο χρήστη ή domain. Αν κάποιος λογαριασμός μέσα στον allow-listed εξωτερικό tenant παραβιαστεί, ο επιτιθέμενος αποκτά αυτόματα τη δυνατότητα recall πάνω στους δικούς μου χρήστες, χωρίς να χρειαστεί να παραβιάσει τίποτα δικό μου. Αυτό δεν είναι λόγος να μην ενεργοποιήσεις ποτέ το feature, είναι λόγος να το αντιμετωπίσεις ως ό,τι πραγματικά είναι: μια επέκταση της δικής σου attack surface μέσω τρίτου, όχι απλώς μια βολική λειτουργικότητα του Outlook.

## Το ερώτημα που δεν απαντάει ακόμα η τεκμηρίωση

Κάτι που θα ήθελα να δω ξεκάθαρα στην επίσημη τεκμηρίωση, και που προς το παρόν δεν το βρίσκω επιβεβαιωμένο, είναι πώς αλληλεπιδρά το cross-tenant recall με **litigation hold, retention policies και eDiscovery**. Το intra-tenant recall είναι ήδη γνωστό ότι κάνει hard delete στο πρωτότυπο μήνυμα, αλλά σε mailbox με ενεργό hold το περιεχόμενο συνήθως διατηρείται στα Recoverable Items ανεξάρtητα από την ενέργεια του χρήστη. Αν η ίδια λογική ισχύει και εδώ, μια χαρά. Αν όμως υπάρχει έστω και ένα σενάριο όπου ένα recall από εξωτερικό tenant μπορεί να αφαιρέσει αποδεικτικό υλικό από mailbox υπό νομική δέσμευση, αυτό είναι κάτι που κάθε compliance και legal team πρέπει να το ξέρει πριν ενεργοποιηθεί το feature, όχι μετά από ένα incident. Μέχρι να το επιβεβαιώσω πάνω σε δικό μου tenant, το κρατάω ως ανοιχτό ερώτημα και όχι ως δεδομένο.

## Η οπτική NIS2 και ISO 27001

**Διαχείριση σχέσεων με τρίτους (ISO 27001 A.5.19-5.22).** Ένα allow list tenant IDs που επιτρέπει σε εξωτερικό οργανισμό να εκτελεί ενέργειες πάνω σε δικά σου δεδομένα είναι, στην ουσία, μια νέα κατηγορία τεχνικής σχέσης εμπιστοσύνης. Αν το πρόγραμμα supplier/partner relationships του οργανισμού σου δεν προβλέπει ρητά τεχνικές δυνατότητες σαν κι αυτή, χρειάζεται ενημέρωση, αλλιώς η προσθήκη ενός tenant ID στο allow list γίνεται μια ενέργεια IT χωρίς GRC ορατότητα.

**Τεκμηρίωση αποφάσεων πρόσβασης.** Σε ένα πλαίσιο NIS2 όπου πρέπει να αποδεικνύεις μέτρα ελέγχου πρόσβασης, κάθε tenant ID στο allow list πρέπει να συνοδεύεται από αιτιολόγηση, ημερομηνία έγκρισης, υπεύθυνο και περιοδική επανεξέταση, ακριβώς όπως θα έκανες με ένα B2B guest access ή ένα cross-tenant access policy στο Entra ID. Ένα άδειο ή ξεχασμένο allow list entry είναι ένα identified gap αν δεν έχει επανεξεταστεί.

**Ακεραιότητα δεδομένων και αποδεικτικό υλικό.** Το γεγονός ότι η ενέργεια εκτελείται ως hard delete πάνω σε δεδομένα ηλεκτρονικού ταχυδρομείου του δικού σου οργανισμού, με πρωτοβουλία τρίτου, αγγίζει άμεσα requirements ακεραιότητας και διαθεσιμότητας δεδομένων. Αξίζει να τεκμηριωθεί ρητά πώς παρακολουθείς cross-tenant recall events, μέσω Unified Audit Log ή message trace, ώστε να υπάρχει ίχνος ακόμα κι όταν το ίδιο το μήνυμα έχει φύγει.

## Τι θα έκανα πριν ενεργοποιήσω το feature

Δεν βλέπω λόγο να το αποφύγει κανείς μόνιμα, η λειτουργικότητα λύνει πραγματικό πρόβλημα σε σενάρια θυγατρικών, joint ventures ή στενής συνεργασίας με συγκεκριμένους οργανισμούς. Θα το αντιμετώπιζα όμως σαν αλλαγή governance, όχι σαν διακόπτη ευκολίας:

- **Καμία ενεργοποίηση χωρίς επίσημη έγκριση** από security και legal/compliance, όχι μόνο από το messaging team.
- **Allow list μόνο για συγκεκριμένους, τεκμηριωμένους tenants**, ποτέ γενική ενεργοποίηση «μπας και χρειαστεί».
- **Περιοδική επανεξέταση** του allow list, με ρητή ημερομηνία λήξης ανά καταχώρηση αν είναι εφικτό.
- **Επιβεβαίωση στο δικό σου tenant** πώς συμπεριφέρεται το recall πάνω σε mailboxes με retention policy ή litigation hold, πριν εμπιστευτείς οποιονδήποτε εξωτερικό tenant.
- **Ενημέρωση helpdesk και χρηστών**, ώστε ένα cross-tenant recall να μην ερμηνευτεί ως ύποπτη δραστηριότητα ή bug όταν εμφανιστεί για πρώτη φορά.

[![Πίνακας allow list τεκμηρίωσης εξωτερικών tenants για cross-tenant recall](/images/cross-tenant-message-recall-exchange-online/allowed-tenant-governance-register.png)](/images/cross-tenant-message-recall-exchange-online/allowed-tenant-governance-register.png)
> 📷 **Εικόνα 3: Παράδειγμα εσωτερικού governance register για καταχωρήσεις στο AllowedSenderTenantIds, με πεδία αιτιολόγησης, εγκριτή και ημερομηνίας επανεξέτασης.**

## Το συμπέρασμα

Το Cross-Tenant Message Recall είναι από εκείνα τα features που, όταν τα διαβάζεις πρώτη φορά, σκέφτεσαι «επιτέλους». Και πραγματικά λύνει ένα πρόβλημα που όλοι έχουμε ζήσει, ένα ευαίσθητο συνημμένο που φεύγει προς λάθος παραλήπτη εκτός οργανισμού. Η δουλειά του CISO όμως δεν σταματάει στο «λύνει πρόβλημα». Σταματάει όταν έχεις καταλάβει ποιο νέο trust boundary δημιουργεί η λύση, και αν το boundary αυτό είναι κάτι που μπορείς να τεκμηριώσεις, να παρακολουθήσεις και να υπερασπιστείς σε έναν auditor. Στην περίπτωση αυτή, το allow list tenant IDs δεν είναι απλώς μια PowerShell ρύθμιση, είναι ένα registry εμπιστοσύνης που αξίζει τη δική του διαδικασία έγκρισης.

Αν διαχειρίζεσαι tenant με ενεργές συνεργασίες B2B και σκέφτεσαι να ενεργοποιήσεις το feature μόλις ολοκληρωθεί το rollout, δύο πράγματα θα έλεγα να κάνεις πρώτα: να ελέγξεις με τη νομική ομάδα σου την αλληλεπίδραση με retention/hold, και να φτιάξεις το governance register πριν προσθέσεις το πρώτο tenant ID, όχι μετά.

Αν έχεις ήδη δοκιμάσει το feature ή βλέπεις διαφορετικά ρίσκα σε αυτό το μοντέλο εμπιστοσύνης, χαίρομαι πάντα να το συζητήσουμε στα σχόλια ή στο LinkedIn.
