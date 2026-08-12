---
title: "Microsoft Entra Tenant Governance: Το «GA» που δεν είναι πλήρως GA, και γιατί αυτό έχει σημασία για το compliance σου"
date: 2026-08-11T11:50:00+03:00
lastmod: 2026-08-11T11:55:00+03:00
draft: false
keywords:
  - Microsoft Entra Tenant Governance
  - Tenant Configuration Management API
  - Related tenants Entra
  - Shadow IT tenants
  - Configuration drift Microsoft 365
  - Governance relationship GDAP
  - Secure tenant creation
  - NIS2 τεκμηρίωση multi-tenant
  - ISO 27001 asset management A.5.9
  - Multi-tenant governance
tags:
  - Microsoft Entra ID
  - Entra ID Governance
  - Tenant Governance
  - Identity Security
  - NIS2
  - ISO 27001
  - GRC
  - Cybersecurity
  - Multi-tenant
  - Zero Trust
author: "Dimosthenis Atteia"
description: "Ανάλυση του Microsoft Entra Tenant Governance μετά τη γενική διαθεσιμότητα, τι είναι πραγματικά GA και τι παραμένει preview, και τι σημαίνει αυτό για οργανισμούς που πρέπει να τεκμηριώσουν τη διακυβέρνηση πολλαπλών tenants σε NIS2 και ISO 27001 audit."
summary: "Η ανακοίνωση λέει «Generally Available», αλλά όποιος διαβάσει προσεκτικά θα δει ότι μόνο ένα κομμάτι είναι πραγματικά GA. Για έναν οργανισμό με δεκάδες tenants, shadow IT και config drift, αυτή η διάκριση δεν είναι ακαδημαϊκή, καθορίζει τι μπορείς να βασίσεις σε production και τι όχι ακόμα."
categories: ["Microsoft 365 Security", "Identity Security"]
series: ["Generally Available Features"]
releases:
  - "generally-available"       # ← αυτό στο /releases/generally-available/
ShowToc: true
TocOpen: false
weight: -5
cover:
  image: "images/entra-tenant-governance/tenant-governance-infographic-cover.png"
  alt: "Infographic Microsoft Entra Tenant Governance: από το χάος πολλαπλών tenants στον κεντρικό έλεγχο"
  caption: "Microsoft Entra Tenant Governance: οι 3 πυλώνες και τα βήματα υλοποίησης"
  relative: true
ShowReadingTime: true
ShowWordCount: true
---

Πριν λίγες μέρες η Microsoft ανακοίνωσε ότι το **Microsoft Entra Tenant Governance** έγινε γενικά διαθέσιμο (GA). Το διάβασα δύο φορές, γιατί κάτι δεν μου κόλλαγε στην πρώτη ανάγνωση. Ο τίτλος λέει «now generally available», αλλά μέσα στο ίδιο το κείμενο της Microsoft υπάρχει μια πρόταση που περνάει σχεδόν απαρατήρητη: μόνο τα **Tenant Configuration Management APIs είναι GA**. Οι υπόλοιπες εμπειρίες, δηλαδή αυτό που θα δεις και θα κλικάρεις στο admin center, παραμένουν σε public preview.

Δεν το γράφω για να κάνω νιτ-πικινγκ σε ένα marketing headline. Το γράφω γιατί έχω δει, πολλές φορές, οργανισμούς να παίρνουν ένα «GA» ανακοίνωση, να το περνάνε στο risk register ως «production-ready, πλήρως υποστηριζόμενο», και μετά να ανακαλύπτουν στην πράξη ότι το κομμάτι που τους ενδιέφερε περισσότερο ήταν ακόμα preview. Για κάποιον που πρέπει να τεκμηριώσει σε NIS2 ή ISO 27001 audit ποια εργαλεία χρησιμοποιεί και με τι επίπεδο υποστήριξης, αυτή η λεπτομέρεια δεν είναι λεπτομέρεια. Είναι η διαφορά ανάμεσα σε «το χρησιμοποιώ ως πρωτεύον έλεγχο» και «το χρησιμοποιώ συμπληρωματικά, με τη γνώση ότι μπορεί ακόμα να αλλάξει».

Υπάρχει και κάτι άλλο που μου κίνησε το ενδιαφέρον στην ανακοίνωση, και που σπάνια το γράφει τόσο ανοιχτά ένας μεγάλος vendor: η Microsoft αναφέρει ρητά ότι το προϊόν χτίστηκε πάνω σε διδάγματα από τη δική της απόκριση σε ένα υψηλού προφίλ, sophisticated nation-state incident. Δεν κατονομάζεται στο κείμενο, αλλά το link που συνοδεύει την αναφορά οδηγεί στο επίσημο guidance της Microsoft για το Midnight Blizzard, την επίθεση nation-state actor που έγινε γνωστή τον Ιανουάριο του 2024. Δεν είναι λεπτομέρεια για marketing flavor. Σημαίνει ότι το εργαλείο δεν σχεδιάστηκε αφηρημένα ως «καλή πρακτική», σχεδιάστηκε ως άμεση απάντηση σε πραγματικό, τεκμηριωμένο σενάριο όπου ένα μη πλήρως διεπόμενο tenant έγινε το σημείο εισόδου.

## Τι πρόβλημα λύνει πραγματικά το Tenant Governance

Αν δουλεύεις σε οργανισμό με πάνω από έναν Entra tenant, ξέρεις ήδη το σενάριο. Ένας production tenant, ένας ή δύο test/demo, ίσως κάποιος από εξαγορά που ποτέ δεν ενσωματώθηκε πλήρως, και σχεδόν σίγουρα κάποιος tenant που δημιούργησε ένα τμήμα μόνο του, χωρίς να ρωτήσει κανέναν, για να δοκιμάσει κάτι. Αυτός ο τελευταίος είναι το κλασικό shadow IT tenant, αόρατο στο κεντρικό IT, αλλά απόλυτα ικανό να εκθέσει δεδομένα ή να γίνει σημείο εισόδου.

Το Tenant Governance δεν είναι ένα ακόμα dashboard. Είναι μια προσπάθεια να απαντηθούν τρία ερωτήματα που, ειλικρινά, πολύ λίγοι οργανισμοί μπορούν να απαντήσουν σήμερα με σιγουριά:

- Ποιοι tenants σχετίζονται με τον δικό μου, έστω κι αν δεν τους διαχειρίζομαι εγώ;
- Πώς αποκτώ διαχειριστική πρόσβαση σε αυτούς που πρέπει να διέπω, χωρίς να δημιουργώ ξεχωριστούς local λογαριασμούς σε κάθε tenant;
- Πώς ξέρω αν η ρύθμιση ενός tenant έχει αποκλίνει (drift) από αυτό που θεωρώ «γνωστή καλή κατάσταση»;

Τέσσερις πυλώνες καλύπτουν αυτά τα ερωτήματα: **Related tenants**, **Governance relationships**, **Configuration management** και **Secure tenant creation**. Ας τους δούμε έναν έναν, γιατί η αξία και οι περιορισμοί διαφέρουν σημαντικά μεταξύ τους.

[![Microsoft Entra admin center, σελίδα Tenant governance Overview με τους τρεις πυλώνες Discover, Govern, Monitor](/images/entra-tenant-governance/entra-admin-center-tenant-governance-overview.png)](/images/entra-tenant-governance/entra-admin-center-tenant-governance-overview.png)
> 📷 **Εικόνα 1: Entra admin center → Identity governance → Tenant governance → Overview. Η αρχική σελίδα με τα τρία βασικά flows (Discover, Govern, Monitor) και τα αντίστοιχα κουμπιά setup.**

## Related tenants: βλέπεις αυτό που μέχρι τώρα δεν έβλεπες

Αυτός είναι, κατά τη γνώμη μου, ο πιο ενδιαφέρων πυλώνας από καθαρά αμυντική σκοπιά. Το Related tenants ανιχνεύει αυτόματα tenants που σχετίζονται με τον δικό σου μέσα από τρία discovery signals:

- **B2B signal**: μετράει inbound και outbound B2B πρόσβαση, εγγραφή και διαχειριστική πρόσβαση ανάμεσα στον tenant σου και άλλους.
- **Multitenant application signal**: εντοπίζει tenants όπου registered multitenant εφαρμογές σου έχουν δικαιώματα, ή που έχουν δικές τους εφαρμογές με πρόσβαση στον δικό σου tenant.
- **Billing signal**: εντοπίζει tenants που μοιράζονται billing account μαζί σου.

<!--
[![Λίστα related tenants με discovery signals στο Entra admin center](/images/entra-tenant-governance/related-tenants-discovery-signals.png)](/images/entra-tenant-governance/related-tenants-discovery-signals.png)
> 📷 **Εικόνα 2: Entra admin center → Tenant governance → Related tenants. Λίστα με τα discovery signals που εντόπισαν τη σχέση κάθε tenant με τον κεντρικό.**
-->

Το σημείο που θέλω να τονίσω: το Related tenants **δεν είναι διαθέσιμο με απλή P1 ή P2 άδεια**. Χρειάζεται Microsoft Entra ID Governance (άρα και μέσω Entra Suite ή Microsoft 365 E7). Αν στηρίζεσαι μόνο σε P1/P2, αυτός ο πυλώνας απλά δεν θα εμφανιστεί στο tenant σου, όσο κι αν φαίνεται λογικό να είναι «βασική» δυνατότητα ορατότητας.

Παράλληλα με αυτόν τον πυλώνα, η Microsoft δημοσίευσε και έναν νέο οδηγό αρχιτεκτονικής (tenant estate architecture guide) με συστάσεις για το πώς να οργανώσεις το δικό σου tenant estate. Αν σχεδιάζεις να ξεκινήσεις governance πρόγραμμα από το μηδέν, αξίζει να τον διαβάσεις πριν στήσεις governance relationships, γιατί η δομή που θα επιλέξεις τώρα είναι δύσκολο να αλλάξει αργότερα χωρίς σημαντικό effort.

## Governance relationships: διαχειριστική πρόσβαση χωρίς local accounts παντού

Αφού ξέρεις ποιους tenants πρέπει να διέπεις, το επόμενο πρόβλημα είναι πρακτικό: πώς αποκτάς εκεί δικαιώματα χωρίς να δημιουργείς ξεχωριστό λογαριασμό ή να διαχειρίζεσαι B2B guest permissions σε κάθε tenant ξεχωριστά. Εδώ μπαίνει το governance relationship, ένα workflow αίτησης-έγκρισης που ορίζει ποιος tenant διέπει ποιον, και τι βαθμό πρόσβασης έχει ο governing tenant πάνω στον governed.

Τεχνικά, στηρίζεται σε cross-tenant granular delegated admin privileges (GDAP), το ίδιο μοντέλο που ήδη ξέρουν όσοι δουλεύουν με CSP/partner tenants, αλλά εδώ εφαρμόζεται εσωτερικά, ανάμεσα σε tenants του ίδιου οργανισμού. Καλή είδηση για το licensing: αυτό το βασικό κομμάτι, governance relationship με GDAP, είναι διαθέσιμο ήδη από **Entra ID P1**. Το custom multitenant app injection, δηλαδή η δυνατότητα να «σπρώξεις» τη δική σου εφαρμογή με δικαιώματα σε governed tenant, χρειάζεται Entra ID Governance.

Κάτι που δεν περίμενα να δω, και που ανεβάζει σημαντικά την αξία αυτού του πυλώνα: το ίδιο governance relationship είναι αυτό που τροφοδοτεί και το **multi-tenant agent management**, μια δυνατότητα του Microsoft Agent 365 που βρίσκεται ακόμα σε preview, καθώς και το **multi-tenant management experience** του Microsoft Defender και του Sentinel, επίσης preview, που απευθύνεται κυρίως σε MSP/MSSP σενάρια. Με άλλα λόγια, μόλις στήσεις μία governance relationship ανάμεσα σε δύο tenants, το ίδιο θεμέλιο μπορεί να χρησιμοποιηθεί και για να διαχειριστείς AI agents σε πολλαπλά tenants, και για να διαχειριστείς Defender XDR incidents και alerts κεντρικά. Για το agent management, χρειάζεσαι Tenant Governance license στον governing tenant και Microsoft Agent 365 license στον governed tenant για να δεις activity και risky-agent insights. Είναι ένα καλό παράδειγμα του πώς η Microsoft χτίζει tenant governance ως κοινό, επαναχρησιμοποιήσιμο θεμέλιο για πολλαπλά προϊόντα ασφαλείας, όχι ως μεμονωμένο feature.

## Tenant configuration management: εδώ είναι το βαρύ κομμάτι

Αν με ρωτήσεις ποιος πυλώνας έχει το μεγαλύτερο compliance ενδιαφέρον, θα πω αυτόν. Το tenant configuration management σου επιτρέπει να ορίσεις ένα configuration baseline σε τυπική μορφή JSON, που περιγράφει την επιθυμητή κατάσταση πόρων του tenant, πάνω από **200 τύπους πόρων σε έξι υπηρεσίες**: Microsoft Defender, Microsoft Entra, Exchange Online, Microsoft Intune, Microsoft Purview και Microsoft Teams. Στη συνέχεια δημιουργείς ένα monitor που συγκρίνει αυτόματα την πραγματική κατάσταση με το baseline, και σου δείχνει ακριβώς ποια properties έχουν αποκλίνει.

Η λογική «snapshot από γνωστό καλό tenant → baseline → monitor drift» είναι ουσιαστικά configuration-as-code εφαρμοσμένο σε administrative settings, όχι μόνο σε infrastructure. Τα monitors τρέχουν κάθε έξι ώρες.

<!--
[![Configuration monitor με λίστα configuration drift ανά πόρο](/images/entra-tenant-governance/configuration-drift-monitor-results.png)](/images/entra-tenant-governance/configuration-drift-monitor-results.png)
> 📷 **Εικόνα 3: Tenant governance → Configuration management → Monitor results. Λίστα πόρων με drift, με το πεδίο που άλλαξε σε σχέση με το baseline.**
-->

Εδώ πρέπει να είμαι προσεκτικός, γιατί βρήκα μια ασυνέπεια ανάμεσα σε δύο επίσημες πηγές της Microsoft, και νομίζω αξίζει να το ξέρεις πριν σχεδιάσεις κάτι πάνω σε συγκεκριμένα νούμερα. Η αποκλειστική σελίδα licensing του Tenant Governance δείχνει τα **ίδια όρια** και στα τρία tiers (P1, P2, ID Governance): έως 30 monitors και 800 configuration resources ανά tenant ανά ημέρα για monitoring, έως 20.000 resources ανά tenant ανά μήνα με έως 12 ενεργά snapshot jobs. Καμία διαφοροποίηση ανά tier σε αυτή τη σελίδα. Ταυτόχρονα, η ίδια η ανακοίνωση GA λέει ρητά ότι πελάτες με ID Governance, Entra Suite ή Microsoft 365 E7 έχουν πλέον **υψηλότερα** ημερήσια και μηνιαία όρια, χωρίς όμως να δίνει τους νέους αριθμούς. Η πιο πιθανή εξήγηση είναι ότι η τεκμηρίωση απλά δεν έχει προλάβει να ενημερωθεί μετά το GA rollout, όχι ότι δεν υπάρχει πράγματι αύξηση. Πρακτική συμβουλή: μην σχεδιάσεις capacity planning πάνω σε αυτά τα νούμερα από τεκμηρίωση, επαλήθευσέ τα μέσα από το ίδιο το admin center στο δικό σου tenant πριν δεσμευτείς σε πρόγραμμα monitoring μεγάλης κλίμακας.

## Secure tenant creation: το λιγότερο «επείγον» αλλά χρήσιμο κομμάτι

Ο τέταρτος πυλώνας αφορά τον έλεγχο του ποιος μπορεί να δημιουργήσει νέο add-on tenant μέσα στον οργανισμό, με αυτόματη εγκαθίδρυση governance relationship από τη στιγμή της δημιουργίας, και δυνατότητα ανάκτησης διαχειριστικής πρόσβασης αν χαθεί, π.χ. όταν φύγει ο τελευταίος admin ενός add-on tenant ή όταν αυτός παραβιαστεί. Στη νέα ανακοίνωση, αυτό επεκτάθηκε ώστε να καλύπτει και governed add-on tenants κάτω από legacy billing models, όπως Enterprise Agreement και Pay-As-You-Go, κάτι που πρακτικά ενδιαφέρει μεγαλύτερους οργανισμούς με ιστορικές συμβάσεις.

Καλή είδηση εδώ: η βασική δημιουργία νέου tenant με governance relationship είναι διαθέσιμη ακόμα και με **Free** license.

## Τι άλλαξε πραγματικά με το GA

Για να είμαι δίκαιος στη Microsoft, δεν είναι μόνο marketing. Πραγματικά προστέθηκαν πράγματα:

- Υψηλότερα ημερήσια και μηνιαία όρια monitors και snapshots για πελάτες με ID Governance, Entra Suite ή Microsoft 365 E7.
- Πλουσιότερα insights στο tenant discovery, για βαθύτερη ορατότητα σε σχετιζόμενους tenants.
- Νέα εμπειρία στο admin portal για configuration monitoring, ώστε να δημιουργείς monitors απευθείας από snapshots ευκολότερα, αν και αυτό το κομμάτι το ίδιο η Microsoft το αναφέρει ρητά ως preview.
- Βελτιωμένες delegated admin δυνατότητες, για ευκολότερο tenant switching και διαχείριση πολλαπλών tenants.
- Επέκταση του secure tenant creation ώστε να καλύπτει governed add-on tenants κάτω από legacy billing μοντέλα.

Και ταυτόχρονα, το ίδιο το κείμενο της ανακοίνωσης καταλήγει σε μια πρόταση που θα έπρεπε να είναι πιο ψηλά: **οι Tenant Configuration Management APIs είναι γενικά διαθέσιμες, οι υπόλοιπες εμπειρίες Tenant Governance παραμένουν preview.** Αυτό επιβεβαιώνεται και στην επίσημη τεκμηρίωση του Microsoft Learn, που ακόμα φέρει τη σήμανση «(preview)» στον τίτλο της, με ρητή προειδοποίηση ότι πρόκειται για prerelease προϊόν που μπορεί να αλλάξει ουσιωδώς πριν την τελική έκδοση.

## Γιατί αυτή η διάκριση έχει σημασία για NIS2 και ISO 27001

**Level of assurance, όχι απλώς «υπάρχει το εργαλείο».** Στο πλαίσιο ενός NIS2 risk assessment, δεν αρκεί να καταγράψεις ότι χρησιμοποιείς ένα εργαλείο διακυβέρνησης tenants. Πρέπει να καταγράψεις και το επίπεδο ωριμότητας και υποστήριξης του εργαλείου εκείνη τη στιγμή. Ένα preview feature μπορεί να αλλάξει συμπεριφορά, να αποσυρθεί ή να τροποποιηθεί ουσιωδώς χωρίς την ίδια δέσμευση SLA που έχει ένα GA feature. Αν βασίσεις έναν κρίσιμο έλεγχο (π.χ. ανίχνευση shadow IT tenants) αποκλειστικά σε preview functionality, αυτό είναι κάτι που πρέπει να το τεκμηριώσεις ως γνωστό ρίσκο, όχι να το παρουσιάσεις σαν πλήρως ώριμο έλεγχο.

**Ακρίβεια απογραφής σε επίπεδο tenant, όχι μόνο σε επίπεδο συσκευής ή χρήστη.** Το ISO 27001 A.5.9 (inventory of information and other associated assets) συνήθως το σκεφτόμαστε σε επίπεδο endpoints, εφαρμογών, δεδομένων. Σπάνια το επεκτείνουμε στο ίδιο το tenant ως asset. Αν όμως ένας οργανισμός λειτουργεί δεκάδες tenants και δεν μπορεί να απαριθμήσει με σιγουριά ποιοι σχετίζονται μαζί του, τότε το inventory του είναι ελλιπές σε ένα επίπεδο πάνω από τις συσκευές, στο ίδιο το θεμέλιο της ταυτότητας. Το Related tenants δίνει έναν μηχανισμό να καλύψεις αυτό το κενό, με την προϋπόθεση να έχεις το κατάλληλο licensing (ID Governance) για να το ενεργοποιήσεις.

**Τεκμηρίωση αλλαγών σε επίπεδο tenant configuration.** Το configuration baseline και το drift monitoring είναι, ουσιαστικά, ένα change management control εφαρμοσμένο σε administrative settings. Για οργανισμούς που πρέπει να αποδείξουν σε auditor ότι οι κρίσιμες ρυθμίσεις τους (Conditional Access, role eligibility, authentication policies) δεν αλλάζουν χωρίς έλεγχο, ένα configuration monitor που τρέχει κάθε έξι ώρες και δείχνει ακριβώς τι απέκλινε είναι πολύ πιο ισχυρό τεκμήριο από ένα στατικό screenshot ρυθμίσεων που πήρες πριν έξι μήνες.

## Πώς μοιάζει στην πράξη: ένα σενάριο shadow tenant

Στην ανακοίνωσή της, η Microsoft περιγράφει ένα υποθετικό σενάριο που, ειλικρινά, θα μπορούσε να είναι αντιγραφή από οποιονδήποτε πραγματικό οργανισμό μεσαίου ή μεγάλου μεγέθους. Ένας υπάλληλος δημιουργεί ένα test tenant για να δοκιμάσει ένα νέο feature, χωρίς να ενημερώσει το κεντρικό IT. Το tenant αυτό μένει εκτός Conditional Access, εκτός baseline πολιτικών, ουσιαστικά αόρατο. Η ροή που προτείνεται είναι: πρώτα tenant discovery, όπου ένα shared billing signal αποκαλύπτει το test tenant και δείχνει ότι χρήστες του κύριου tenant συνδέονται εκεί σε admin εφαρμογές μετά governance relationship με least-privileged πρόσβαση, ώστε το κεντρικό IT να αποκτήσει έλεγχο χωρίς νέους λογαριασμούς μετά baseline από snapshot του κύριου, «γνωστού καλού» tenant και τέλος συνεχές monitoring με σταδιακή διόρθωση.

Το δεύτερο σενάριο που περιγράφεται είναι εξίσου χρήσιμο, γιατί δείχνει ότι το εργαλείο δεν αφορά μόνο shadow tenants: ένας οργανισμός ανακαλύπτει σε audit ότι ο **κύριος** tenant του δεν πληροί πλέον απαιτήσεις device compliance. Με ένα ήδη υπάρχον snapshot από στιγμή που ο tenant ήταν σε εγκεκριμένη κατάσταση, το monitor εντοπίζει αυτόματα ότι μια πολιτική συμμόρφωσης του Intune άλλαξε κατά λάθος, και η ομάδα την επαναφέρει με βάση τεκμηριωμένο baseline, αντί να ψάχνει χειροκίνητα σε audit logs μαντεύοντας αν η αλλαγή ήταν κακόβουλη ή τυχαία. Αυτό ακριβώς είναι το practical value ενός configuration monitor για κάποιον που πρέπει να απαντήσει σε auditor «πώς ξέρεις πότε και γιατί άλλαξε αυτή η πολιτική».

## Τι θα πρόσεχα πριν το βάλω σε production

Δεν το παρουσιάζω σαν κάτι που πρέπει να αποφύγεις, το αντίθετο. Αλλά αν σχεδιάζεις να το εντάξεις σε πρόγραμμα compliance, θα ήθελα να δεις τρία πράγματα καθαρά:

- Ποιο ακριβώς κομμάτι σκοπεύεις να χρησιμοποιήσεις είναι GA (οι APIs) και ποιο είναι ακόμα preview (η ίδια η εμπειρία στο admin center). Τεκμηρίωσέ το ρητά στο risk register του project.
- Ποιο license tier χρειάζεσαι για τον πυλώνα που σε ενδιαφέρει περισσότερο. Το Related tenants, που είναι κατά τη γνώμη μου το πιο value-add κομμάτι για ανίχνευση shadow IT, χρειάζεται Entra ID Governance, όχι απλή P1/P2. Αν βασίζεσαι σε P1/P2, δεν θα το δεις καν.
- Τα όρια monitors/snapshots ανά ημέρα και ανά μήνα, αν σκοπεύεις να καλύψεις πολλούς tenants ή μεγάλο αριθμό πόρων. Ένα configuration monitoring πρόγραμμα που σχεδιάστηκε χωρίς να ληφθούν υπόψη αυτά τα όρια θα «κολλήσει» στην πράξη, όχι στο σχεδιασμό.

## Το συμπέρασμα

Το Tenant Governance λύνει ένα πρόβλημα που το ένιωθα προσωπικά, δεν έχω δει ποτέ οργανισμό με πάνω από δύο tenants να μπορεί να απαντήσει με σιγουριά «ξέρω όλους τους tenants που σχετίζονται μαζί μου και ξέρω αν κάποιος έχει configuration drift». Αυτό το εργαλείο κινείται προς τη σωστή κατεύθυνση. Αλλά η ίδια η ανακοίνωση GA είναι ένα καλό παράδειγμα του γιατί, ως CISO ή GRC professional, δεν αρκεί να διαβάσεις τον τίτλο ενός announcement. Πρέπει να κατέβεις μια παράγραφο πιο κάτω και να δεις τι ακριβώς λέει το fine print, γιατί εκεί κρύβεται η διαφορά ανάμεσα σε αυτό που μπορείς να παρουσιάσεις σε έναν auditor ως πλήρως υποστηριζόμενο έλεγχο και σε αυτό που πρέπει ακόμα να παρακολουθείς με επιφύλαξη.

Αν τρέχεις ήδη πολλαπλούς tenants, δύο πράγματα αξίζει να ελέγξεις άμεσα: ενεργοποίησε το tenant discovery, έστω σε read-only λειτουργία, για να δεις τι σου βγάζει σε related tenants, και δες τι licensing έχεις σήμερα σε σχέση με το τι πυλώνες χρειάζεσαι πραγματικά. Αν έχεις ήδη εμπειρία από ενεργοποίηση Tenant Governance στο δικό σου περιβάλλον, χαίρομαι πάντα να το συζητήσουμε στα σχόλια ή στο LinkedIn.
