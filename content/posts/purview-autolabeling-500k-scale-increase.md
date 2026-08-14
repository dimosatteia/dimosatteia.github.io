---
title: "Purview Auto-labeling: Από 100.000 σε 500.000 αρχεία την ημέρα, τι αλλάζει πραγματικά για το labeling backlog σου"
date: 2026-08-13T10:00:00+03:00
lastmod: 2026-08-13T10:30:00+03:00
draft: false
keywords:
  - Microsoft Purview auto-labeling
  - Sensitivity labels SharePoint OneDrive
  - Auto-labeling policy scale
  - RM567890 Message Center
  - Data classification at scale
  - Copilot readiness data protection
  - NIS2 ταξινόμηση πληροφορίας
  - ISO 27001 A.8 asset management
  - Simulation mode Purview
  - Information Protection scale limits
tags:
  - Microsoft Purview
  - Information Protection
  - Sensitivity Labels
  - Data Classification
  - Microsoft 365 Security
  - NIS2
  - ISO 27001
  - GRC
  - Cybersecurity
  - Microsoft 365 Copilot
author: "Dimosthenis Atteia"
description: "Ανάλυση της αύξησης του ορίου auto-labeling στο Microsoft Purview από 100.000 σε 500.000 αρχεία την ημέρα για SharePoint και OneDrive, με την οπτική ενός CISO που πρέπει να ξαναδεί το labeling roadmap του πριν το GA του Οκτωβρίου."
summary: "Ένα νούμερο που έμενε σταθερό τόσο καιρό που το είχαμε ενσωματώσει σαν δεδομένο στον σχεδιασμό μας, αλλάζει. Το πενταπλάσιο όριο auto-labeling δεν είναι απλώς ένα technical bump, είναι ευκαιρία να ξανακοιτάξεις το labeling backlog σου και να το συνδέσεις με το πώς τεκμηριώνεις classification στο ISO 27001 και στο NIS2."
categories: ["Microsoft Purview", "Information Protection"]
series:
ShowToc: true
TocOpen: false
weight: -5
cover:
  image: "images/purview-autolabeling-500k/purview-autolabel-scale-increase-cover.png"
  alt: "Αύξηση ορίου auto-labeling στο Microsoft Purview από 100.000 σε 500.000 αρχεία ημερησίως"
  caption: "Microsoft Purview Auto-labeling scale increase, από 100K σε 500K files/day, GA Οκτώβριος 2026"
  relative: true
ShowReadingTime: true
ShowWordCount: true
---

Υπάρχουν αλλαγές στο Message Center που διαβάζεις, σημειώνεις νοερά «ωραίο», και προχωράς. Και υπάρχουν αλλαγές που σε κάνουν να ανοίξεις ξανά το spreadsheet με το labeling roadmap του πελάτη ή του οργανισμού σου και να ξαναδείς τους αριθμούς. Το RM567890 είναι από τη δεύτερη κατηγορία.

Το όριο των 100.000 αρχείων την ημέρα για auto-labeling σε SharePoint και OneDrive ήταν εκεί τόσο καιρό που το είχαμε όλοι ενσωματώσει σαν σταθερά στον σχεδιασμό μας. Όταν σχεδιάζεις πόσο θα πάρει να «καθαρίσεις» ένα tenant με εκατομμύρια unlabeled documents, αυτό το νούμερο καθόριζε άμεσα το χρονοδιάγραμμα. Τώρα η Microsoft ανακοινώνει πενταπλασιασμό, στα 500.000 αρχεία την ημέρα, με preview τον Σεπτέμβριο και GA τον Οκτώβριο του 2026. Ας δούμε τι σημαίνει αυτό στην πράξη, και γιατί δεν είναι απλώς ένα νούμερο που μεγαλώνει.

## Τι είναι σήμερα το auto-labeling στο Purview, μια γρήγορη υπενθύμιση

Πριν μπούμε στο νούμερο, αξίζει να ξεκαθαρίσουμε τι ακριβώς αλλάζει, γιατί το Purview έχει δύο εντελώς διαφορετικούς μηχανισμούς αυτόματης επισήμανσης, και μόνο ο ένας επηρεάζεται.

Ο πρώτος είναι το **client-side auto-labeling**, μέσα από Word, Excel, PowerPoint και Outlook. Εκεί η ετικέτα εφαρμόζεται ή προτείνεται στον χρήστη τη στιγμή που επεξεργάζεται ή στέλνει το αρχείο. Δεν υπάρχει κάποιο ημερήσιο όριο εδώ, γιατί η λογική τρέχει τοπικά, ανά έγγραφο, ανά χρήστη.

Ο δεύτερος είναι το **service-side auto-labeling**, δηλαδή οι auto-labeling policies που τρέχουν πάνω σε περιεχόμενο που είναι ήδη αποθηκευμένο σε SharePoint και OneDrive, ή που περνάει μέσα από το Exchange Online. Εδώ δεν χρειάζεται ο χρήστης να κάνει τίποτα, ο μηχανισμός σκανάρει και επισημαίνει αρχεία σε scale, ανεξάρτητα από το ποιος τα άνοιξε τελευταία. Και εδώ ακριβώς βρίσκεται το όριο που αλλάζει.

## Το νούμερο: από 100Κ σε 500Κ, και τι δεν αλλάζει μαζί του

Σύμφωνα με την επίσημη τεκμηρίωση της Microsoft, το σημερινό όριο για auto-labeling πάνω σε SharePoint και OneDrive είναι <cite index="2-15">μέγιστο 100.000 αυτόματα επισημασμένα αρχεία στο tenant σου ανά ημέρα</cite>. Το RM567890 στο Message Center Archive περιγράφει την επόμενη κίνηση: <cite index="3-6">αύξηση της μέγιστης χωρητικότητας auto-labeling για SharePoint και OneDrive από 100.000 σε έως 500.000 αρχεία ανά tenant την ημέρα</cite>. Preview τον Σεπτέμβριο, Γενική Διαθεσιμότητα τον Οκτώβριο του 2026.

[![Σύγκριση παλιού και νέου ορίου auto-labeling ανά ημέρα στο Purview](/images/purview-autolabeling-500k/autolabel-limit-before-after-comparison.png)](/images/purview-autolabeling-500k/autolabel-limit-before-after-comparison.png)
> 📷 **Εικόνα 1: Microsoft Purview portal → Information Protection → Policies → Auto-labeling policies → Overview μιας ενεργής πολιτικής. Το γράφημα «Labeling activity overview» δείχνει την τάση επισημασμένων αρχείων τις τελευταίες 30 ημέρες, τυπικά αρκετές τάξεις μεγέθους κάτω από το σημερινό όριο των 100.000 αρχείων/ημέρα.**

Το επίσημο σκεπτικό της Microsoft είναι απλό και το βρίσκω εύστοχο: <cite index="3-6">η αύξηση βοηθά τους οργανισμούς να επισημαίνουν και να προστατεύουν περισσότερα δεδομένα σε κατάσταση ηρεμίας, ταχύτερα, κλείνοντας τα κενά labeling σε υπάρχον περιεχόμενο</cite>. Και η γραμμή που πραγματικά με ενδιαφέρει ως CISO: <cite index="3-6">με sensitivity labels και ρυθμίσεις προστασίας να εφαρμόζονται σε περισσότερα αρχεία νωρίτερα, οι οργανισμοί μπορούν να προετοιμάσουν καλύτερα το data estate τους για το Microsoft 365 Copilot με μεγαλύτερη εμπιστοσύνη</cite>. Δηλαδή η Microsoft συνδέει ανοιχτά αυτή την αλλαγή με το Copilot readiness, όχι μόνο με compliance hygiene. Αν στον οργανισμό σου υπάρχει ήδη πίεση να ενεργοποιηθεί Copilot γρήγορα, αυτό το νούμερο είναι το πρώτο επιχείρημα που θα ακούσεις από την πλευρά του business.

Κάτι που αξίζει να προσέξεις: το roadmap item μιλάει ρητά για SharePoint και OneDrive. Δεν αναφέρεται πουθενά σε αλλαγή του ξεχωριστού ορίου των **4.000.000 matched files** για το simulation mode, ούτε στο όριο των **100 auto-labeling policies ανά tenant**. Αν βρεις πηγές που υπονοούν ότι αλλάζουν και αυτά τα δύο, μεταχειρίσου τις με επιφύλαξη, το επίσημο roadmap item δεν το επιβεβαιώνει, και προτιμώ να το πω καθαρά παρά να υποθέσω κάτι που δεν τεκμηριώνεται ακόμα.

## Γιατί το 100Κ ήταν στην πράξη σφιχτό όριο

Αν δεν έχεις σχεδιάσει ποτέ auto-labeling rollout σε μεγάλο tenant, το «100.000 αρχεία την ημέρα» μπορεί να ακούγεται γενναιόδωρο. Δεν είναι, όταν μιλάμε για real-world data estates.

Σκέψου έναν οργανισμό με μερικά εκατομμύρια documents σε SharePoint sites και OneDrive accounts, συσσωρευμένα χρόνια, μεγάλο μέρος τους χωρίς καμία ετικέτα. Με όριο 100.000 την ημέρα, το να «καθαρίσεις» ένα backlog 3-4 εκατομμυρίων αρχείων σήμαινε μήνες συνεχούς λειτουργίας της πολιτικής, χωρίς να υπολογίσεις καθυστερήσεις από simulation runs, refinement κύκλους και αρχεία που παραμένουν κλειδωμένα σε active sessions. Στην πράξη, πολλοί οργανισμοί έτρεχαν auto-labeling policies σε φάσεις, site ανά site, ακριβώς επειδή το daily throughput δεν επαρκούσε για ολόκληρο το tenant ταυτόχρονα.

Με το νέο όριο των 500.000, ο ίδιος όγκος δεδομένων επισημαίνεται σε ένα κλάσμα του χρόνου. Αυτό δεν είναι απλώς πιο γρήγορο, αλλάζει τη λογική του project planning. Ένα labeling backlog project που παλιά σχεδιαζόταν σε τρίμηνα μπορεί τώρα να σχεδιαστεί σε εβδομάδες.

## Το practical checklist πριν το GA του Οκτωβρίου

Δεν χρειάζεται να περιμένεις το GA για να ετοιμαστείς. Αυτά είναι τα σημεία που θα ήλεγχα εγώ πρώτα:

**Δες πού στέκεσαι σήμερα.** Στο Purview portal, κάτω από **Information Protection → Auto-labeling**, το labeling progress dashboard δείχνει πόσα αρχεία επισημάνθηκαν τις τελευταίες επτά ημέρες. Αν οι ενεργές πολιτικές σου φτάνουν ήδη κοντά στο σημερινό όριο των 100.000, αυτό είναι το πρώτο σου σημάδι ότι η αύξηση θα σου φανεί χρήσιμη αμέσως μόλις ενεργοποιηθεί.

[![Purview auto-labeling policy configuration με τοποθεσίες SharePoint και OneDrive](/images/purview-autolabeling-500k/autolabel-policy-locations-config.png)](/images/purview-autolabeling-500k/autolabel-policy-locations-config.png)
> 📷 **Εικόνα 2: Information Protection → Policies → Auto-labeling policies → επεξεργασία υπάρχουσας πολιτικής, βήμα «Choose locations where you want to apply the label», με τις τοποθεσίες SharePoint και OneDrive που καλύπτει σήμερα.**

**Ξαναδές το scope των πολιτικών σου.** Αν στο παρελθόν περιόρισες μια πολιτική σε συγκεκριμένα sites επειδή δεν άντεχε το throughput να καλύψει όλο το tenant, αυτός είναι καλός χρόνος να καταγράψεις ποιες πολιτικές είναι υποψήφιες για επέκταση scope μόλις έρθει το νέο όριο.

**Μην ξεχνάς το simulation mode.** Το όριο των 4.000.000 matched files για simulation παραμένει, τουλάχιστον σύμφωνα με ό,τι είναι επίσημα τεκμηριωμένο σήμερα. Αν σχεδιάζεις να επεκτείνεις μια πολιτική σε πολύ μεγαλύτερο εύρος τοποθεσιών, τρέξε πρώτα simulation και βεβαιώσου ότι δεν ξεπερνάς αυτό το ανώτατο όριο πριν ενεργοποιήσεις την πολιτική σε production.

**Έλεγξε τα prerequisites που συχνά ξεχνιούνται.** Το auto-labeling σε SharePoint και OneDrive προϋποθέτει ότι έχεις ενεργοποιήσει sensitivity labels για Office files στις συγκεκριμένες τοποθεσίες, και ότι τα αρχεία δεν βρίσκονται σε ανοιχτό session ή checked-out κατάσταση τη στιγμή που τρέχει η πολιτική. Ένα μεγαλύτερο daily throughput δεν βοηθάει αν ένα σημαντικό ποσοστό του backlog σου είναι τεχνικά μη διαθέσιμο για labeling.

## Η οπτική NIS2 και ISO 27001

Το ενδιαφέρον εδώ δεν είναι το ίδιο το νούμερο, είναι τι σου επιτρέπει να τεκμηριώσεις.

**Ταξινόμηση πληροφορίας ως μετρήσιμος έλεγχος, όχι πρόθεση.** Στο NIS2, όταν καλείσαι να αποδείξεις ότι εφαρμόζεις μέτρα ταξινόμησης και προστασίας πληροφορίας, η διαφορά ανάμεσα σε «έχουμε πολιτική auto-labeling» και «το 95% του data estate μας είναι επισημασμένο» είναι τεράστια για έναν auditor. Ένα υψηλότερο daily throughput σημαίνει ότι μπορείς να φτάσεις σε μετρήσιμη κάλυψη labeling πολύ πιο γρήγορα, και άρα να δείξεις πρόοδο σε συγκεκριμένο χρονικό ορίζοντα αντί για αόριστο «σε εξέλιξη».

**Ακρίβεια απογραφής assets κατά ISO 27001 A.8.** Ένα labeling backlog που μένει unlabeled για μήνες λόγω τεχνικού ορίου throughput δεν είναι απλώς αισθητικό πρόβλημα, είναι κενό στο information asset inventory σου. Δεν μπορείς να ισχυριστείς ότι ξέρεις την ευαισθησία των δεδομένων σου αν ένα μεγάλο μέρος τους παραμένει άγνωστο λόγω ουράς. Το πενταπλάσιο όριο μειώνει άμεσα αυτό το χρονικό παράθυρο έκθεσης.

**Copilot readiness ως compliance προαπαιτούμενο, όχι μόνο productivity θέμα.** Η ίδια η Microsoft συνδέει ρητά αυτή την αλλαγή με το Copilot. Από τη σκοπιά ενός CISO, αυτό είναι σωστή σειρά προτεραιοτήτων: πριν ενεργοποιήσεις AI εργαλεία που θα «διαβάσουν» όλο το data estate σου, χρειάζεσαι να ξέρεις ποιο περιεχόμενο είναι ευαίσθητο και να έχει ήδη τα κατάλληλα permission boundaries μέσω label-based encryption. Αν το labeling coverage σου είναι χαμηλό, το Copilot rollout δεν είναι απλώς πρόωρο, είναι risk-increasing κίνηση που αξίζει να καταγραφεί ως τέτοια στο risk register πριν δοθεί το πράσινο φως.

## Τι θα έκανα εγώ τώρα

Δεν χρειάζεται δραματική αλλαγή στρατηγικής, χρειάζεται ενημέρωση του πλάνου. Θα κατέγραφα το τρέχον labeling coverage percentage του tenant ως baseline, θα σημείωνα ποιες πολιτικές περιορίστηκαν στο παρελθόν λόγω throughput, και θα προετοίμαζα ένα timeline για το πότε αναμένω να δω τη νέα χωρητικότητα στο δικό μου tenant μετά το preview του Σεπτεμβρίου. Αν έχεις labeling backlog project σε εξέλιξη, τώρα είναι η στιγμή να ξαναδείς το χρονοδιάγραμμά του, όχι μετά το GA.

Αν παρακολουθείς κι εσύ Purview roadmap items ή έχεις ήδη labeling policies να τρέχουν σε μεγάλο tenant, χαίρομαι να ακούσω πώς σου φαίνεται το νέο όριο στα σχόλια ή στο LinkedIn.
