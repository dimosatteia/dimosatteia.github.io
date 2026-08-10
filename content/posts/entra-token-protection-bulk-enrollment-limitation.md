---
title: "Entra Token Protection και Bulk Enrollment: Το κενό που κανένα compliance dashboard δεν θα σου δείξει"
date: 2026-08-10T09:00:00+03:00
lastmod: 2026-08-10T09:30:00+03:00
draft: false
keywords:
  - Microsoft Entra Token Protection
  - Conditional Access session controls
  - Bulk enrollment Windows
  - Hybrid Join to Entra Join migration
  - PRT Primary Refresh Token
  - Windows Web Account Manager
  - signInSessionStatusCode 1003
  - NIS2 τεκμηρίωση μετάβασης συσκευών
  - ISO 27001 change management
  - Zero Trust device identity
tags:
  - Microsoft Entra ID
  - Conditional Access
  - Token Protection
  - Identity Security
  - NIS2
  - ISO 27001
  - GRC
  - Cybersecurity
  - Device Migration
  - Zero Trust
author: "Dimosthenis Atteia"
description: "Ανάλυση του Microsoft Entra Token Protection και του γιατί οι συσκευές που μεταναστεύουν από Hybrid σε Entra Join μέσω bulk enrollment PPKG μένουν εκτός προστασίας, με την οπτική ενός CISO που πρέπει να το τεκμηριώσει σε NIS2 και ISO 27001 audit."
summary: "Ένα migration project μπορεί να δείχνει 100% επιτυχημένο σε κάθε dashboard, Entra joined, Intune enrolled, compliant, και ταυτόχρονα να είναι εντελώς εκτεθειμένο σε token replay. Το Token Protection δεν ελέγχει compliance, ελέγχει πώς δημιουργήθηκε η ταυτότητα της συσκευής, και αυτό αλλάζει τελείως το πώς πρέπει να σχεδιάζεις ένα migration."
categories: ["Microsoft 365 Security", "Identity Security"]
series:
ShowToc: true
TocOpen: false
weight: -5
cover:
  image: "images/entra-token-protection/token-protection-session-control-cover.png"
  alt: "Session control Require token protection for sign-in sessions στο Microsoft Entra Conditional Access"
  caption: "Conditional Access → Session → Require token protection for sign-in sessions"
  relative: true
ShowReadingTime: true
ShowWordCount: true
---

Τις τελευταίες εβδομάδες βλέπω όλο και περισσότερους οργανισμούς να τρέχουν projects μετάβασης από Hybrid Entra Join σε καθαρό Entra Join, συνήθως στο πλαίσιο ενός ευρύτερου cloud-native identity roadmap. Το θέμα δεν είναι καινούργιο, αλλά κάτι που έπεσε στα χέρια μου πρόσφατα, ένα πολύ αναλυτικό post του Sreejith Reghunathan Pillai στο TheTechTrails, με έβαλε σε σκέψεις που ξεπερνούν το καθαρά τεχνικό κομμάτι.

Η ιστορία, σε λίγες γραμμές: πολλοί οργανισμοί χρησιμοποιούν εργαλεία τρίτων για να μεταφέρουν Windows συσκευές από Hybrid σε Entra Join χωρίς wipe, διατηρώντας profile, εφαρμογές και ρυθμίσεις. Αρκετά από αυτά τα εργαλεία δουλεύουν πάνω σε ένα provisioning package (`.ppkg`) που κάνει το join μέσω bulk enrollment token. Το migration «περνάει», η συσκευή φαίνεται Entra joined, Intune enrolled, compliant, corporate-owned. Ό,τι θα ήθελε να δει κανείς σε ένα compliance report. Και όμως, υπάρχει ένα session control που δεν το ελέγχει κανένα από αυτά τα dashboards: το **Token Protection**.

Το διάβασα, το σταύρωσα με την επίσημη τεκμηρίωση της Microsoft, και επιβεβαιώνεται: **οι συσκευές που γίνονται Entra joined μέσω bulk enrollment δεν υποστηρίζονται από το Token Protection**, ανεξάρτητα από το πόσο «καθαρό» δείχνει το compliance status τους. Ως CISO με ενεργό migration σε εξέλιξη, αυτό δεν είναι απλώς ένα ενδιαφέρον technical detail. Είναι κάτι που πρέπει να μπει στο risk register πριν το βρει κάποιος άλλος πρώτος.

## Τι κάνει στην πράξη το Token Protection

Όταν ένας χρήστης κάνει sign-in σε Windows συσκευή, το Entra ID εκδίδει ένα Primary Refresh Token (PRT), που επιτρέπει single sign-on σε Microsoft 365, Azure και λοιπές Entra-integrated εφαρμογές. Native apps όπως το Outlook, τα Teams, το OneDrive και το Office δεν ζητούν token απευθείας, περνούν μέσα από τον Windows Web Account Manager (WAM), τον broker του λειτουργικού.

Κατά το device registration, τα Windows δημιουργούν ένα σύνολο κρυπτογραφικών κλειδιών (device key, transport key, session key), τα οποία, όπου υποστηρίζεται, προστατεύονται από το TPM. Κάθε token request υπογράφεται με αυτό το session key. Αυτή η υπογραφή είναι που επιτρέπει στο Entra ID να επιβεβαιώσει ότι το αίτημα προέρχεται πραγματικά από την καταχωρημένη συσκευή, όχι από κάποιον που έκλεψε το token και προσπαθεί να το επαναχρησιμοποιήσει από αλλού.

Αυτό είναι το ουσιαστικό: το Token Protection δεν προστατεύει από την κλοπή του token αυτή καθαυτή, δεν το εμποδίζει να κλαπεί σε ένα adversary-in-the-middle phishing attack ή από infostealer malware. Αυτό που κάνει είναι να καθιστά το κλεμμένο session πρακτικά άχρηστο εκτός της αρχικής συσκευής. Και αυτό, από μόνο του, εξουδετερώνει ένα από τα πιο αποδοτικά attack pattern των τελευταίων ετών, το session token replay που παρακάμπτει εντελώς το MFA.

## Γιατί το compliance status δεν αρκεί

Εδώ είναι το σημείο που πολλοί, συμπεριλαμβανομένου εμού πριν διαβάσω το πρωτότυπο άρθρο σε βάθος, το υποτιμούν. Μια συσκευή μπορεί ταυτόχρονα να είναι:

- Entra joined
- Intune managed και marked compliant
- Προστατευμένη με BitLocker
- Onboarded σε Defender for Endpoint

[![Entra device overview με Join type, MDM και Compliance status](/images/entra-token-protection/entra-device-overview-compliant-status.png)](/images/entra-token-protection/entra-device-overview-compliant-status.png)
> 📷 **Εικόνα 1: Entra ID → Devices → All devices → Overview. Όλα τα βασικά πεδία «πράσινα», χωρίς καμία ένδειξη για τη μέθοδο εγγραφής της συσκευής.**

...και να αποτύχει στο Token Protection. Το compliance status απαντά στο ερώτημα «ακολουθεί η συσκευή τις πολιτικές μου». Το Token Protection απαντά σε ένα εντελώς διαφορετικό ερώτημα: «δημιουργήθηκε η ταυτότητα αυτής της συσκευής με τρόπο που υποστηρίζει device-bound token flow». Δύο ερωτήματα, δύο απαντήσεις, και το ένα δεν προϋποθέτει το άλλο.

## Η λίστα των μη υποστηριζόμενων μεθόδων εγγραφής

Σύμφωνα με την επίσημη τεκμηρίωση της Microsoft, οι παρακάτω κατηγορίες συσκευών δεν υποστηρίζουν σήμερα Token Protection:

- Microsoft Entra joined Azure Virtual Desktop session hosts
- **Windows συσκευές που έγιναν enrolled μέσω bulk enrollment**
- Cloud PCs του Windows 365 που είναι Entra joined
- Power Automate hosted machine groups που είναι Entra joined
- Windows Autopilot συσκευές σε self-deploying mode
- Azure Windows VMs που χρησιμοποιούν το extension για Entra ID authentication

Η πιο εύκολη να ξεφύγει, γιατί δεν φωνάζει «exception» πουθενά στα dashboards, είναι ακριβώς αυτή του bulk enrollment. Ένα `.ppkg` file είναι απλώς ένα container ρυθμίσεων, Wi-Fi προφίλ, πιστοποιητικά, εφαρμογές, local accounts. Δεν είναι κάθε PPKG πρόβλημα. Το πρόβλημα εμφανίζεται συγκεκριμένα όταν το package χρησιμοποιεί bulk enrollment token για να κάνει το ίδιο το join, κάτι που πολλά migration tools τρίτων κάνουν ακριβώς για να αποφύγουν wipe και re-provisioning.

## Πώς το εντοπίζεις πριν το εντοπίσει ο χρήστης σου

Η πρακτική διαδικασία δεν είναι μυστήριο, αλλά θέλει να κοιτάξεις στο σωστό σημείο. Στο Entra admin center, κάτω από **Monitoring & health → Sign-in logs**, ανοίγεις ένα sign-in event και κοιτάς το πεδίο **Token Protection – Sign In Session**. Το αίτημα εμφανίζεται είτε ως **Bound** είτε ως **Unbound**, και όταν είναι unbound συνοδεύεται από έναν status code.

[![Sign-in log entry με το πεδίο Token Protection Sign In Session](/images/entra-token-protection/entra-signin-log-token-protection-status.png)](/images/entra-token-protection/entra-signin-log-token-protection-status.png)
> 📷 **Εικόνα 2: Identity → Monitoring & health → Sign-in logs. Το πεδίο Token Protection δείχνει Bound ή Unbound σε bulk-enrolled συσκευή θα δεις τυπικά status code 1003.**

Για migration μέσω bulk enrollment, ο κωδικός που θα δεις σχεδόν πάντα είναι ο **1003**, «η κατάσταση της συσκευής δεν ικανοποιεί τις απαιτήσεις του Token Protection», που καλύπτει ακριβώς την περίπτωση μη υποστηριζόμενου τύπου εγγραφής. Άλλοι κωδικοί (1002, 1005, 1006, 1008) καλύπτουν διαφορετικά σενάρια, απουσία device state, ασύμβατο OS, client που δεν περνάει μέσα από τον broker, αλλά για το δικό μας σενάριο ο 1003 είναι το tell.

Το πρακτικό πρόβλημα είναι ότι η Microsoft δεν προσφέρει σήμερα ένα έτοιμο, καθολικό device filter expression που να ξεχωρίζει αυτόματα «αυτή η συσκευή έγινε join μέσω bulk token PPKG» από «αυτή έγινε join κανονικά». Για Autopilot self-deploying ή για Azure VMs υπάρχουν συγκεκριμένα attributes (`enrollmentProfileName`, `profileType`), για bulk enrollment PPKG όμως όχι. Αυτό σημαίνει ότι η ευθύνη μετατοπίζεται στον οργανισμό: αν δεν κρατάς δικό σου migration inventory, δεν έχεις τρόπο να ξέρεις ποιες συσκευές κινδυνεύουν, μέχρι να το μάθεις από ένα helpdesk ticket.

## Τι θα δει ο χρήστης, και γιατί θα σε μπερδέψει

Όταν ενεργοποιείς το session control **Require token protection for sign-in sessions** και μια bulk-enrolled συσκευή προσπαθήσει να αποκτήσει πρόσβαση σε Exchange Online, SharePoint Online ή Microsoft Teams, το αποτέλεσμα δεν μοιάζει καθόλου με «άρνηση πρόσβασης λόγω πολιτικής». Μοιάζει με ασταθές, τυχαίο πρόβλημα:

- Outlook που ζητάει ξανά και ξανά sign-in χωρίς προφανή λόγο
- OneDrive που σταματά να συγχρονίζει μετά από ανανέωση token
- Teams που κολλάει σε sign-in loop ή φορτώνει χωρίς κάποιες υπηρεσίες

Αν δεν ξέρεις τι ψάχνεις, το πρώτο σου instinct θα είναι «πρόβλημα Outlook profile» ή «Exchange outage», όχι «η ταυτότητα της συσκευής δεν υποστηρίζει το session control». Και αυτό είναι ίσως το πιο επικίνδυνο κομμάτι όλης της ιστορίας: ένα migration μπορεί να λειτουργεί κανονικά για εβδομάδες ή μήνες, μέχρι να ενεργοποιηθεί ή να δοκιμαστεί το Token Protection, οπότε το πρόβλημα εμφανίζεται καθυστερημένα, μακριά από το αρχικό migration project και τους ανθρώπους που το σχεδίασαν.

## Η οπτική NIS2 και ISO 27001

Εδώ μπαίνει το κομμάτι που με ενδιαφέρει περισσότερο ως CISO, πέρα από το καθαρά τεχνικό.

**Τεκμηρίωση αλλαγής και διαχείριση κινδύνου έργου.** Ένα migration project από Hybrid σε Entra Join δεν είναι απλή τεχνική εργασία, είναι αλλαγή στην αρχιτεκτονική ταυτότητας συσκευών. Αν το εργαλείο migration που χρησιμοποιείς κάνει το join μέσω bulk enrollment token, αυτό είναι ένα τεχνικό χαρακτηριστικό που πρέπει να καταγραφεί στο risk assessment του έργου πριν την υλοποίηση, όχι να ανακαλυφθεί μετά.

**Ασφάλεια ταυτότητας ως compensating control.** Σε ένα NIS2 πλαίσιο όπου πρέπει να τεκμηριώνεις μέτρα κατά της μη εξουσιοδοτημένης πρόσβασης, το να ξέρεις ότι ένα υποσύνολο συσκευών σου δεν καλύπτεται από token binding δεν είναι λεπτομέρεια. Είναι ένα identified gap που χρειάζεται είτε remediation είτε τεκμηριωμένο compensating control, ακριβώς η λογική που ζητάει ένα risk-based πρόγραμμα.

**Ακρίβεια απογραφής assets.** Το ISO 27001 (και ιδιαίτερα η λογική πίσω από τα A.8 controls για διαχείριση assets) βασίζεται στην παραδοχή ότι ξέρεις τι κατάσταση έχει το κάθε asset σου. Ένα inventory που λέει «Entra joined, compliant» χωρίς να ξέρει *πώς* έγινε αυτό το join είναι, ουσιαστικά, ελλιπές inventory. Το migration tracking που προτείνεται στο πρωτότυπο άρθρο, old device ID, νέο device ID, migration method, αν χρησιμοποιήθηκε bulk token, δεν είναι υπερβολή, είναι ακριβώς το επίπεδο λεπτομέρειας που ζητάει ένας auditor όταν ρωτάει «πώς ξέρεις ότι όλες οι συσκευές σου καλύπτονται από τα session controls σου».

## Αν βρεις επηρεαζόμενες συσκευές: τι κάνεις

Η πρώτη γραμμή άμυνας είναι να μην αφήσεις τις bulk-enrolled συσκευές να μπλοκάρουν χρήστες χωρίς σχέδιο. Η προτεινόμενη προσέγγιση είναι να τις εξαιρέσεις προσωρινά από την Conditional Access πολιτική μέσω ενός device filter πάνω σε extension attribute (π.χ. `extensionAttribute1 -eq "TP-BulkEnrollment-Exception"`), όχι με ένα γενικό exclusion όλων των migrated χρηστών.

[![Conditional Access device filter με expression σε extensionAttribute1](/images/entra-token-protection/ca-policy-device-filter-exclusion.png)](/images/entra-token-protection/ca-policy-device-filter-exclusion.png)
> 📷 **Εικόνα 3: Conditional Access policy → Conditions → Filter for devices. Το exclusion rule πάνω στο extensionAttribute1, περιορισμένο μόνο σε τεκμηριωμένες εξαιρέσεις.**

Αυτό όμως δεν είναι λύση, είναι παράταση. Κάθε εξαίρεση πρέπει να συνοδεύεται από compensating controls, compliant device requirement, Defender for Endpoint, phishing-resistant authentication, risk-based sign-in πολιτικές, να είναι χρονικά περιορισμένη, και να αφαιρείται μόλις η συσκευή περάσει από supported enrollment path. Η μόνιμη λύση παραμένει η δημιουργία της device identity μέσω υποστηριζόμενης μεθόδου: user-driven Entra Join, Windows Autopilot user-driven ή Device Preparation, ή interactive join με φρέσκα credentials χρήστη, όχι bulk token.

## Το συμπέρασμα

Αυτό που μου άρεσε στο πρωτότυπο άρθρο είναι ότι δεν παρουσιάζει το θέμα ως bug, το παρουσιάζει ως ένα καλά τεκμηριωμένο, αλλά εύκολα παραβλέψιμο, όριο μιας αρχιτεκτονικής. Από την πλευρά μου, το κρατάω ως ένα ακόμα παράδειγμα του γιατί ένα migration project δεν κλείνει όταν το dashboard δείχνει πράσινο. Κλείνει όταν έχεις επαληθεύσει ότι κάθε session control που θεωρείς ενεργό λειτουργεί πραγματικά πάνω στη νέα ταυτότητα της συσκευής, όχι μόνο στο compliance status της.

Αν τρέχεις ή σχεδιάζεις παρόμοιο migration, δύο πράγματα αξίζει να ελέγξεις άμεσα: ρώτα τον vendor του migration tool αν το join γίνεται μέσω bulk enrollment token, και έλεγξε τα sign-in logs σου για status code 1003 πριν ενεργοποιήσεις Token Protection σε production. Αναλυτικά βήματα, screenshots και τα workaround options θα τα βρεις στο πρωτότυπο άρθρο του Sreejith στο TheTechTrails, το συνιστώ ανεπιφύλακτα σε όποιον έχει ενεργό ή προγραμματισμένο migration.

Αν έχεις περάσει από ανάλογο σενάριο ή βλέπεις τη σχέση compliance / token binding διαφορετικά, χαίρομαι πάντα να το συζητήσουμε στα σχόλια ή στο LinkedIn.
