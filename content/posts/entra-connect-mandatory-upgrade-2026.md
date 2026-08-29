---
title: "Microsoft Entra Connect: Η προθεσμία της 30ής Σεπτεμβρίου 2026 που δεν είναι ένα ακόμα advisory"
date: 2026-08-29T09:00:00+03:00
lastmod: 2026-08-29T10:20:00+03:00
draft: false
keywords:
  - Microsoft Entra Connect mandatory upgrade
  - Entra Connect autoupgrade
  - Entra Connect 2.5.79.0
  - Entra Connect 2.6.84.0
  - Entra Connect Health minimum version
  - Hybrid identity synchronization
  - Password Hash Synchronization
  - Application-Based Authentication Entra Connect
  - Microsoft Download Center retirement
  - NIS2 τεκμηρίωση ενημερώσεων συστημάτων
  - ISO 27001 διαχείριση τεχνικών ευπαθειών
tags:
  - Microsoft Entra ID
  - Entra Connect
  - Hybrid Identity
  - Identity Security
  - Patch Management
  - NIS2
  - ISO 27001
  - GRC
  - Cybersecurity
  - Business Continuity
author: "Dimosthenis Atteia"
description: "Ανάλυση της mandatory προθεσμίας 30/9/2026 για το Microsoft Entra Connect: ποιες εκδόσεις χρειάζεσαι, τι αλλάζει στο 2.6.84.0, γιατί το Download Center δεν είναι πια ο δρόμος λήψης, και πώς το τεκμηριώνεις σε NIS2 και ISO 27001 audit."
summary: "Το Entra Connect δεν στέλνει απλώς ένα ακόμα security advisory. Στις 30 Σεπτεμβρίου 2026 κλείνει ένα παράθυρο, και αν το tenant σου δεν είναι πάνω από την έκδοση 2.5.79.0, δεν μιλάμε για έκθεση σε ρίσκο, μιλάμε για πλήρη διακοπή του synchronization. Ένα ζήτημα που ανήκει εξίσου στο patch management και στο risk register σου."
categories: ["Microsoft 365 Security", "Identity Security"]
series:
ShowToc: true
TocOpen: false
weight: -6
cover:
  image: "images/entra-connect-mandatory-upgrade-2026/entra-connect-sync-overview-cover.png"
  alt: "Microsoft Entra Connect Connect Sync overview στο Microsoft Entra admin center με sync status και version"
  caption: "Entra ID → Entra Connect → Connect Sync, όπου φαίνεται η κατάσταση sync και η διαθέσιμη έκδοση προς λήψη"
  relative: true
ShowReadingTime: true
ShowWordCount: true
---

Το ξανάδα τις προάλλες, καθαρά τυχαία, ενώ έλεγχα κάτι άλλο στο Entra admin center: ένα banner στη σελίδα του Connect Sync που παρέπεμπε σε μια προθεσμία. Το πρώτο μου instinct ήταν «άλλο ένα advisory που θα διαβάσω αργότερα». Μόλις όμως κάθισα και το διάβασα σωστά, κατάλαβα ότι δεν είναι τυπικό. Η Microsoft έχει βάλει ημερομηνία λήξης στη λειτουργία του Entra Connect Sync για όσους δεν έχουν ανεβάσει έκδοση, και αυτή η ημερομηνία είναι η **30 Σεπτεμβρίου 2026**. Δηλαδή, όσο διαβάζεις αυτό το άρθρο, μιλάμε πλέον για λίγες εβδομάδες.

Δεν είναι το συνηθισμένο «σας συνιστούμε να αναβαθμίσετε για λόγους ασφαλείας». Είναι κάτι πιο σκληρό: αν δεν είσαι πάνω από μια συγκεκριμένη έκδοση, **όλες οι υπηρεσίες συγχρονισμού σταματούν να λειτουργούν**. Όχι «μειωμένη προστασία», όχι «ένα subset από alerts δεν θα δουλεύει», αλλά πλήρης διακοπή. Για έναν οργανισμό που βασίζεται στο Entra Connect για να φτάνουν οι λογαριασμοί, τα group memberships και τα password hashes από το on-premises Active Directory στο Entra ID, αυτό είναι ισοδύναμο με διακοπή προσθήκης/απενεργοποίησης χρηστών στο cloud. Ως CISO, αυτό δεν μπαίνει στο advisory folder. Μπαίνει στο risk register με ημερομηνία.

## Το timeline πίσω από την προθεσμία

Η ιστορία δεν ξεκίνησε τώρα. Σύμφωνα με την επίσημη τεκμηρίωση της Microsoft, από τον Σεπτέμβριο του 2023 οι χρήστες του Entra Connect Sync και του Entra Connect Health αναβαθμίζονταν σταδιακά, μέσω autoupgrade, σε ένα build με μια προληπτική αλλαγή σχετική με ασφάλεια. Όσοι είχαν ενεργό autoupgrade και δεν το είχαν απενεργοποιήσει, δεν επηρεάστηκαν ποτέ. Το πρόβλημα αφορά αποκλειστικά όσους έχουν απενεργοποιημένο το autoupgrade, ή σε όσους η αυτόματη αναβάθμιση απέτυχε σιωπηλά για κάποιο λόγο, κάτι που σε μεγάλα, πολύπλοκα tenants με custom configuration δεν είναι καθόλου σπάνιο.

Αξίζει μια μικρή παρένθεση εδώ, γιατί τη βρήκα ενδιαφέρουσα ως ασυνέπεια στην ίδια την τεκμηρίωση της Microsoft: η σελίδα του advisory αναφέρει ότι η θωρακισμένη έκδοση κυκλοφόρησε «τον Μάιο του 2025», ενώ το επίσημο version history δείχνει την έκδοση 2.5.79.0 να κυκλοφορεί την 1η Σεπτεμβρίου 2025 (με autoupgrade να ξεκινά στις 4 Σεπτεμβρίου). Πρακτικά, μην κολλάς στις ημερομηνίες που αναφέρονται στο κείμενο του advisory, κοίτα τον αριθμό έκδοσης. Αυτός είναι ο μόνος αξιόπιστος δείκτης.

## Τι ακριβώς σταματάει αν χάσεις την προθεσμία

Η επίδραση δεν είναι ενιαία για όλα τα components, και αξίζει να τη δεις αναλυτικά πριν υποθέσεις ότι «θα το προλάβω»:

- **Microsoft Entra Connect (sync engine)**: όλες οι υπηρεσίες συγχρονισμού αποτυγχάνουν πλήρως. Καμία εξαίρεση.
- **Entra Connect Health, Connect Sync agent**: δεν χάνεις τα πάντα, αλλά χάνεις ένα συγκεκριμένο σύνολο κρίσιμων alerts, ανάμεσά τους η αποτυχία σύνδεσης λόγω authentication, η διακοπή του Password Hash Synchronization, το σταμάτημα του export λόγω accidental delete threshold, και το σενάριο όπου η υπηρεσία δεν ξεκινά λόγω μη έγκυρων encryption keys. Δηλαδή, χάνεις ακριβώς τα alerts που θα σε ειδοποιούσαν ότι κάτι άλλο έχει ήδη πάει στραβά.
- **Entra Connect Health, AD DS agent**: χάνεις όλα τα alerts.
- **Entra Connect Health, AD FS agent**: χάνεις όλα τα alerts.

Το σημείο που θέλω να τονίσω ως CISO είναι το εξής: δεν χάνεις μόνο τη λειτουργία, χάνεις και την ορατότητα πάνω στη λειτουργία. Αν το monitoring σου βασίζεται στο Connect Health για να μάθεις ότι κάτι χάλασε, και το ίδιο το Connect Health έχει σταματήσει να στέλνει τα σχετικά alerts, μπορεί να μείνεις με ένα broken sync engine για μέρες χωρίς να το καταλάβεις, μέχρι να το αναφέρει κάποιος χρήστης που δεν μπορεί να κάνει sign-in.

## Οι ελάχιστες εκδόσεις που χρειάζεσαι

Για να μείνεις εκτός κινδύνου μέχρι την προθεσμία, η Microsoft ορίζει συγκεκριμένα ελάχιστα builds:

- **Microsoft Entra Connect**: 2.5.79.0 ή νεότερη
- **Entra Connect Health, Connect Sync agent**: 4.5.2466.0 ή νεότερη
- **Entra Connect Health, AD DS agent**: 4.5.2466.0 ή νεότερη
- **Entra Connect Health, AD FS agent**: 4.5.2466.0 ή νεότερη

Την τρέχουσα έκδοση του server σου τη βλέπεις άμεσα στο Entra admin center, χωρίς PowerShell, χωρίς να ανοίξεις καν τη Synchronization Service Manager.

[![Microsoft Entra Connect Connect Sync overview με Sync status, Password Hash Sync και Version](/images/entra-connect-mandatory-upgrade-2026/entra-connect-sync-overview-cover.png)](/images/entra-connect-mandatory-upgrade-2026/entra-connect-sync-overview-cover.png)
> 📷 **Εικόνα 1: Entra ID → Entra Connect → Connect Sync. Το πεδίο "Version" κάτω από "Provision from Active Directory" δείχνει την έκδοση του server σου, με σύνδεσμο απευθείας για λήψη της τελευταίας.**

## Το Download Center δεν είναι πια ο δρόμος

Εδώ είναι το σημείο που πολλούς θα τους μπερδέψει στην πράξη, γιατί αλλάζει μια συνήθεια χρόνων. Αν έχεις μάθει να κατεβάζεις το Entra Connect από τη γνωστή σελίδα του Microsoft Download Center, αυτό δεν ισχύει πλέον. Το ίδιο το Download Center το λέει ρητά: οι νέες εκδόσεις του Entra Connect Sync είναι διαθέσιμες **αποκλειστικά** μέσα από το Entra Connect blade στο Microsoft Entra admin center, και δεν θα κυκλοφορούν πια στο Download Center.

[![Σελίδα Download Center για Microsoft Entra Connect με ειδοποίηση ότι οι νέες εκδόσεις είναι διαθέσιμες μόνο μέσω Entra admin center](/images/entra-connect-mandatory-upgrade-2026/download-center-decommission-notice.png)](/images/entra-connect-mandatory-upgrade-2026/download-center-decommission-notice.png)
> 📷 **Εικόνα 2: Το Download Center δείχνει ακόμα την τελευταία γνωστή έκδοση (εδώ 2.6.84.0), αλλά το πραγματικό installer file έχει αντικατασταθεί από ένα PDF που εξηγεί ότι η λήψη γίνεται πλέον μόνο μέσω του Entra admin center.**

Πρακτικά αυτό σημαίνει ένα πράγμα για τη δική σου διαδικασία: αν έχεις documented procedure ή runbook που λέει «πήγαινε στο Download Center, βρες το Entra Connect, κατέβασέ το», αυτό το βήμα είναι πλέον λάθος και χρειάζεται update. Ο σωστός δρόμος είναι το tab **Manage** στη σελίδα **Entra Connect → Get started** μέσα στο Entra admin center, όχι εξωτερικός σύνδεσμος λήψης.

## Τι φέρνει η τελευταία έκδοση (2.6.84.0)

Η πιο πρόσφατη κυκλοφορία, 2.6.84.0, βγήκε στις 7 Ιουλίου 2026 και περιλαμβάνει security fixes, οπότε αν βρίσκεσαι σε παλαιότερο 2.6.x build, δεν είναι απλώς θέμα να «είσαι πάνω από το ελάχιστο», είναι θέμα να μην αφήνεις γνωστά διορθωμένα ζητήματα ανοιχτά. Ξεχωρίζω κάποια σημεία που έχουν πρακτική σημασία για security teams:

- **Application-Based Authentication γίνεται πιο αυστηρή, όχι πιο επιτρεπτική.** Ο wizard δεν επιστρέφει πια σιωπηλά στον παλιό legacy directory synchronization account αν αποτύχει το setup του application-based authentication, σταματάει με σαφές μήνυμα λάθους. Και το Entra Connect δεν αλλάζει πλέον αυτόματα υπάρχοντες servers από legacy account σε application-based authentication στο background, μια αλλαγή που παλιότερα μπορούσε να συμβεί χωρίς να το προσέξεις.
- **Το Password Hash Synchronization self-healing καταργήθηκε.** Παλιότερα, αν το PHS cloud feature flag απενεργοποιούνταν, το σύστημα το ενεργοποιούσε ξανά μόνο του στο background. Τώρα αυτό δεν γίνεται πια. Αν το PHS σβήσει, μένει σβηστό μέχρι να το ενεργοποιήσει χειροκίνητα κάποιος administrator. Αυτό είναι θετικό από πλευρά accountability, δεν υπάρχει πια «αόρατη» αλλαγή κατάστασης, αλλά σημαίνει ότι χρειάζεσαι πραγματικό monitoring πάνω στο PHS status, αλλιώς μπορεί να μείνει σβηστό χωρίς να το προσέξεις.
- **Application-based authentication cmdlets απαιτούν πλέον explicit admin authentication.** Τα `Set-ADSyncAADCompanyFeature` και `Set-ADSyncAADPasswordSyncState` χρειάζονται ρητό `-AADUsername` για interactive authentication, και ο wizard χρησιμοποιεί interactive MSAL αντί για αποθηκευμένα service credentials.
- **Νέα δυνατότητα σε preview**: admin sign-in στον setup wizard μέσω passkeys και FIDO2 security keys, μέσω του Windows Web Account Manager, δηλαδή phishing-resistant authentication και για το ίδιο το configuration tool, όχι μόνο για τους τελικούς χρήστες.
- **Υποστήριξη για το France sovereign cloud**, με Pass-through Authentication, Seamless SSO, password writeback και Health Agent monitoring.

Ένα σημείο-προσοχή: η ενδιάμεση έκδοση **2.6.79.0 αποσύρθηκε**. Βρέθηκε πρόβλημα μετά την κυκλοφορία και το installer ανακλήθηκε. Αν πρόλαβες να την εγκαταστήσεις, η επίσημη οδηγία είναι να κάνεις uninstall και να περάσεις κατευθείαν στην 2.6.84.0. Αν διαχειρίζεσαι πολλά περιβάλλοντα, αξίζει να το ελέγξεις ρητά, γιατί δεν είναι το είδος του λάθους που φαίνεται αμέσως.

## Ένα known issue που αφορά ιδιαίτερα FIPS-enabled περιβάλλοντα

Υπάρχει ένα καταγεγραμμένο known issue στις εκδόσεις 2.5.190.0 και 2.6.1.0 που αξίζει να ξέρεις πριν αναβαθμίσεις: αν το αρχείο `miiserver.exe.config` έχει τροποποιηθεί στο παρελθόν, τυπικά σε σενάρια όπου είχε εφαρμοστεί παλιότερη οδηγία για Password Hash Synchronization σε FIPS-enabled περιβάλλοντα, ο συγχρονισμός μπορεί να αποτύχει μετά την αναβάθμιση, με σφάλμα φόρτωσης του `System.Diagnostics.DiagnosticSource`. Το workaround είναι χειροκίνητο: backup του αρχείου, προσθήκη ενός συγκεκριμένου `dependentAssembly` binding redirect μέσα στο assemblyBinding section, και επανεκκίνηση της υπηρεσίας ADSync. Η έκδοση 2.6.3.0 βελτίωσε τη διαδικασία ώστε το auto-upgrade να ανιχνεύει τροποποιημένα configuration files και να παραλείπει αυτόματα την αναβάθμιση σε αυτούς τους servers, ώστε να μη μείνεις με σπασμένο sync engine χωρίς προειδοποίηση, αλλά αν κάνεις χειροκίνητη αναβάθμιση, το ζήτημα παραμένει.

Αν διαχειρίζεσαι περιβάλλον όπου έχει εφαρμοστεί FIPS mode, ή δεν είσαι 100% σίγουρος αν κάποιος τροποποίησε αυτό το config file στο παρελθόν, αυτό είναι ένα σημείο που θέλει έλεγχο πριν πατήσεις «Upgrade», όχι μετά.

## Πώς το ελέγχεις στο δικό σου tenant

Δεν χρειάζεται κάτι πολύπλοκο, αλλά θέλει να το κάνεις σε κάθε Entra Connect server που διαχειρίζεσαι, όχι μόνο στον πρώτο που θυμάσαι:

1. **Έλεγξε την τρέχουσα έκδοση.** Στο Entra admin center, πήγαινε σε **Entra ID → Entra Connect → Connect Sync**. Στην ενότητα **Provision from Active Directory** θα δεις το πεδίο **Version**, με σύνδεσμο απευθείας για λήψη της τελευταίας διαθέσιμης έκδοσης, ακριβώς όπως στην Εικόνα 1. Αν έχεις πρόσβαση στον ίδιο τον server, η ίδια πληροφορία υπάρχει και στο **About** dialog της Synchronization Service Manager.
2. **Σύγκρινε με το ελάχιστο.** Αν η έκδοσή σου είναι κάτω από 2.5.79.0, βρίσκεσαι ήδη εκτός του ελάχιστου ορίου και χρειάζεσαι αναβάθμιση άμεσα, όχι μέχρι την προθεσμία.
3. **Έλεγξε το status του autoupgrade.** Αν το autoupgrade είναι ενεργό και δουλεύει κανονικά, πιθανότατα είσαι ήδη καλυμμένος. Αν όμως το έχεις απενεργοποιήσει για οποιονδήποτε λόγο, π.χ. λόγω custom synchronization rules ή compliance policy που απαιτεί manual change control, τότε η ευθύνη ελέγχου είναι εξ ολοκλήρου δική σου.
4. **Κατέβασε τη νέα έκδοση μόνο μέσα από το Entra admin center.** Όχι από παλιά bookmarked links στο Download Center, όχι από αρχειοθετημένα installers σε κάποιο file share που μπορεί να είναι μηνών παλιά. Ο σωστός δρόμος είναι **Entra ID → Entra Connect → Get started → tab Manage**. Εκεί, αν το tenant σου εξακολουθεί να έχει servers κάτω από το ελάχιστο, θα δεις κι εσύ το ίδιο **"Action Required"** banner που είδα κι εγώ στο δικό μου tenant, με ρητή αναφορά στην ημερομηνία 30 Σεπτεμβρίου 2026 και στο ελάχιστο 2.5.79.0. Δεν είναι κάτι που διάβασα μόνο στην τεκμηρίωση, το tenant σου στην κυριολεξία σου το λέει κατάμουτρα αν χρειάζεται δράση.

   [![Microsoft Entra Connect Get started tab Manage με banner Action Required για retirement εκδόσεων πριν την 2.5.79.0 και κουμπί Download Connect Sync Agent](/images/entra-connect-mandatory-upgrade-2026/entra-connect-manage-tab-download.png)](/images/entra-connect-mandatory-upgrade-2026/entra-connect-manage-tab-download.png)
   > 📷 **Εικόνα 3: Entra ID → Entra Connect → Get started → Manage. Το πορτοκαλί banner "Action Required" εμφανίζεται αυτόματα όταν υπάρχει server κάτω από το ελάχιστο, με το κουμπί "Download Connect Sync Agent" να είναι το μόνο σωστό σημείο λήψης πλέον, όχι το Download Center.**

   Στο ίδιο tab θα δεις και τη δεύτερη κάρτα, **"Manage from the cloud: Cloud Sync"**, με δικό της κουμπί λήψης του Provisioning agent. Είναι το σημείο-αφετηρία για το βήμα 5 παρακάτω, αν αποφασίσεις να αξιολογήσεις τη μετάβαση.
5. **Σκέψου αν χρειάζεσαι πραγματικά το Entra Connect Sync.** Αν είσαι eligible, η Microsoft προτείνει ρητά μετάβαση σε Entra Cloud Sync, το οποίο διαχειρίζεται τη σύγχρονη έκδοση εξ ολοκλήρου από το cloud και δεν έχει το ίδιο μοτίβο on-premises server lifecycle. Δεν είναι λύση για όλους, αλλά αν το configuration σου είναι σχετικά απλό, αξίζει να ελέγξεις τη συμβατότητα πριν επενδύσεις χρόνο σε ένα ακόμα κύκλο upgrade στο παλιό μοντέλο.

## Η οπτική NIS2 και ISO 27001

Το σημείο που με ενδιαφέρει περισσότερο εδώ, πέρα από το καθαρά τεχνικό κομμάτι, είναι πώς αυτή η ιστορία διαφέρει από ένα τυπικό security advisory.

**Δεν είναι vulnerability management, είναι business continuity.** Στα περισσότερα advisories, η καθυστέρηση στο patching σημαίνει αυξημένη έκθεση σε ρίσκο, ένα gap που μπορεί να τεκμηριωθεί ως compensating control μέχρι να κλείσει. Εδώ δεν υπάρχει τέτοιο ενδιάμεσο στάδιο: μετά τις 30 Σεπτεμβρίου 2026, χωρίς αναβάθμιση, η υπηρεσία απλά σταματά. Αυτό ανήκει καθαρά στη λογική του ICT readiness for business continuity, όχι μόνο στη διαχείριση τεχνικών ευπαθειών. Αν το Entra Connect δεν λειτουργεί, δεν προστίθενται νέοι χρήστες, δεν απενεργοποιούνται λογαριασμοί που έφυγαν, και τα password hashes σταματούν να ενημερώνονται, τρία πράγματα που άπτονται άμεσα ελέγχων πρόσβασης που μπορεί να χρειαστεί να αποδείξεις σε audit.

**Τεκμηρίωση προγραμματισμένης αλλαγής, με ημερομηνία που δεν ελέγχεις εσύ.** Σε αντίθεση με τα περισσότερα change management αντικείμενα όπου εσύ ορίζεις το χρονοδιάγραμμα, εδώ η ημερομηνία την ορίζει ο vendor. Αυτό είναι ακριβώς το είδος του ζητήματος που θέλει ένα σαφές item στο risk register, με owner, deadline και ένδειξη προόδου, όχι απλώς ένα σημείωμα «θα το δούμε». Σε ένα πλαίσιο NIS2, όπου τεκμηριώνεις μέτρα διαχείρισης κινδύνου της αλυσίδας εφοδιασμού και διατήρησης ενημερωμένων συστημάτων, ένα mandatory vendor deadline με σαφή ημερομηνία λήξης λειτουργικότητας είναι από τα πιο εύκολα στοιχεία να τεκμηριώσεις σωστά, αρκεί να το προσέξεις εγκαίρως.

**Η κατάργηση του PHS self-healing είναι ένα μικρό αλλά χρήσιμο παράδειγμα accountability.** Το ότι το σύστημα δεν διορθώνει πλέον μόνο του μια αλλαγή κατάστασης σε κρίσιμο security feature, όπως το Password Hash Sync, ευθυγραμμίζεται με τη λογική ελέγχου πρόσβασης και audit trail που ζητάει το ISO 27001: κάθε αλλαγή σε κρίσιμη ρύθμιση πρέπει να είναι ορατή και να αποδίδεται σε συγκεκριμένο administrator, όχι να συμβαίνει σιωπηλά στο background. Το τίμημα είναι ότι το δικό σου monitoring πρέπει τώρα να καλύψει αυτό το κενό.

## Τι κάνεις αν βρεις έκθεση

Αν ελέγξεις και βρεις servers κάτω από το ελάχιστο, η προσέγγιση δεν χρειάζεται να είναι πανικός, αλλά χρειάζεται σαφή σειρά:

- Καταγράφεις όλους τους Entra Connect και Connect Health servers που διαχειρίζεσαι, με την τρέχουσα έκδοση του καθενός.
- Ελέγχεις αν κάποιος από αυτούς έχει τροποποιημένο `miiserver.exe.config`, ιδιαίτερα αν υπάρχει ιστορικό FIPS-related αλλαγών, πριν ξεκινήσεις αναβάθμιση.
- Προγραμματίζεις την αναβάθμιση σε μη κρίσιμο παράθυρο, με πλάνο rollback αν είναι εφικτό, π.χ. μέσω snapshot του server πριν την αναβάθμιση.
- Τεκμηριώνεις την αναβάθμιση ως change record, με ημερομηνία, έκδοση πριν και μετά, και ποιος την εκτέλεσε, ώστε να έχεις άμεσα διαθέσιμο evidence αν σου το ζητήσει auditor.
- Αν είσαι eligible για Cloud Sync, αξιολογείς αν αυτή είναι η ευκαιρία να αφήσεις πίσω το lifecycle management ενός on-premises sync server εντελώς.

## Το συμπέρασμα

Το Entra Connect δεν είναι το πιο «συναρπαστικό» κομμάτι της υποδομής ταυτότητας κάποιου, είναι όμως από τα πιο κρίσιμα, γιατί είναι ο σωλήνας μέσα από τον οποίο περνάει η ταυτότητα κάθε χρήστη σου προς το cloud. Μια προθεσμία σαν αυτή δεν βγαίνει συχνά από τη Microsoft με τόσο ξεκάθαρους όρους, «αναβάθμισε μέχρι εδώ, αλλιώς σταματάει η υπηρεσία», και ακριβώς επειδή είναι σπάνια, είναι εύκολο να περάσει απαρατήρητη ανάμεσα σε δεκάδες άλλα advisories που φτάνουν κάθε εβδομάδα.

Αν διαχειρίζεσαι Entra Connect servers, το πρώτο πράγμα που αξίζει να κάνεις σήμερα, όχι την επόμενη εβδομάδα, είναι να ανοίξεις το Entra admin center και να δεις τι έκδοση τρέχεις. Πέντε λεπτά δουλειά, και μια προθεσμία λιγότερη στο ρολόι που δεν σου ανήκει.

Αν έχεις ήδη περάσει από αυτή τη διαδικασία αναβάθμισης, ή αν βλέπεις κάποιο ζήτημα που δεν κάλυψα εδώ, χαίρομαι πάντα να το συζητήσουμε στα σχόλια ή στο LinkedIn.
