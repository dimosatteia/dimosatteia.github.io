---
title: "Preview: AD Group Enforcement στο Entra Cloud Sync"
date: 2026-07-29T09:00:00+03:00
lastmod: 2026-07-29T09:00:00+03:00
draft: false
keywords:
  - AD group enforcement
  - Microsoft Entra Cloud Sync
  - msDS-ObjectSoa
  - SOA-Policies
  - source of authority
  - group provisioning to Active Directory
  - hybrid identity governance
  - Entra Cloud Sync preview
tags:
  - Microsoft Entra ID
  - Cloud Sync
  - Active Directory
  - Hybrid Identity
  - Identity Governance
  - GRC
author: "Dimosthenis Atteia"
description: "Το AD group enforcement κλειδώνει τα synced groups του Active Directory ώστε να αλλάζουν μόνο μέσω του Entra provisioning service. Αναλυτικός οδηγός για το Public Preview: προϋποθέσεις, SOA-Policies, Enforced vs Audit mode και περιορισμοί."
summary: "Το Microsoft Entra Cloud Sync αποκτά τη δυνατότητα να κλειδώνει synced AD groups, ώστε καμία αλλαγή να μην γίνεται τοπικά στο Active Directory παρά μόνο μέσω του provisioning service. Τι σημαίνει αυτό στην πράξη και τι χρειάζεται για να το δοκιμάσεις."
categories: ["Microsoft 365"]
series: ["Preview Features"]
releases:
  - "preview"   # ← αυτό το στέλνει στο /releases/preview/
ShowToc: true
TocOpen: false
slug: "ad-group-enforcement-cloud-sync"
cover:
  image: "/images/entra-connect.png"
  alt: "Το ADSI Edit εμφανίζει το container CN=SOA-Policies κάτω από το CN=System"
  caption: "Πηγή εικόνας: Microsoft Learn"
  relative: false
  hiddenInList: false
ShowBreadCrumbs: true
ShowReadingTime: true
ShowPostNavLinks: true
ShowWordCount: true
ShowRssButtonInSectionTermList: true
searchHidden: false
robotsNoIndex: false
canonicalURL: "https://thecybersec.gr/posts/previews/ad-group-enforcement-cloud-sync/"
---

Υπάρχει ένα σενάριο που το έχουμε ζήσει όλοι όσοι διαχειριζόμαστε hybrid identity: έχεις χτίσει προσεκτικά το access model σου στο Microsoft Entra ID, έχεις access packages, access reviews, dynamic membership, όλα όμορφα τεκμηριωμένα και μετά κάποιος με Account Operator δικαιώματα ανοίγει το «Active Directory Users and Computers» και προσθέτει χειροκίνητα έναν χρήστη σε ένα synced group. Το group ήταν cloud-governed. Δεν είναι πια. Και το χειρότερο: δεν θα το μάθεις μέχρι το επόμενο reconciliation, αν υπάρχει καν reconciliation.

Το **AD group enforcement** στο Microsoft Entra Cloud Sync, που κυκλοφόρησε πρόσφατα σε Public Preview, έρχεται ακριβώς για αυτό το κενό. Η ιδέα του είναι απλή στη διατύπωση και αρκετά ενδιαφέρουσα στην υλοποίηση: μαρκάρεις συγκεκριμένα synced groups ως «κλειδωμένα», και από εκείνο το σημείο και μετά μόνο το Entra provisioning service μπορεί να τα αλλάξει. Οποιαδήποτε τοπική τροποποίηση στο Active Directory μπλοκάρεται σε επίπεδο domain controller.

## Γιατί έχει σημασία

Ας το πούμε καθαρά: μέχρι σήμερα, η φράση «το Entra είναι το source of authority για τα groups μας» ήταν, στα περισσότερα hybrid περιβάλλοντα, μια δήλωση προθέσεων και όχι ένας τεχνικός έλεγχος. Το Cloud Sync έκανε provision τα groups προς το AD, αλλά το AD παρέμενε ένα ανοιχτό σύστημα όπου οποιοσδήποτε είχε τα σχετικά δικαιώματα μπορούσε να παρέμβει. Η μόνη άμυνα ήταν ένα συνδυασμός σφιχτού delegation model και μιας διαδικασίας συμφωνίας που κάποιος έπρεπε να τρέχει περιοδικά.

Το AD group enforcement μετατρέπει αυτή τη δήλωση σε **preventive control**. Και για όσους από εμάς γράφουμε policies και procedures που πρέπει να αντέξουν σε έναν έλεγχο, η διαφορά ανάμεσα σε «το παρακολουθούμε» και «το αποτρέπουμε» δεν είναι σημασιολογική. Είναι η διαφορά ανάμεσα σε detective και preventive control, με ό,τι αυτό συνεπάγεται για το residual risk που καταγράφεις στο risk register σου.

## Πώς δουλεύει από κάτω

Ο μηχανισμός δεν βασίζεται σε ACLs ούτε σε κάποιο agent που «φυλάει» τα groups. Είναι ενσωματωμένος στον ίδιο τον directory service.

Όταν εγκαταστήσεις το σχετικό Windows update στον domain controller που κρατάει τον **PDCe role**, δημιουργείται ένα νέο policy container με όνομα `SOA-Policies` κάτω από το `CN=System,DC=<domain>`. Το ακρωνύμιο SOA εδώ σημαίνει *Source of Authority*, και το container εξυπηρετεί δύο σκοπούς: αποθηκεύει τα SIDs που επιτρέπεται να τροποποιούν τα κλειδωμένα αντικείμενα, και κρατάει την τρέχουσα κατάσταση της πολιτικής.

Ένα σημείο που αξίζει προσοχή: **αν δεν υπάρχει κανένα SID μέσα στην πολιτική, η πολιτική ουσιαστικά δεν κάνει τίποτα**. Οποιοσδήποτε έχει δικαίωμα να ενημερώσει το group θα συνεχίσει να μπορεί, σαν να μην υπήρχε καν το enforcement. Δεν είναι δηλαδή κάτι που ενεργοποιείς κατά λάθος και κλειδώνεις έξω τον εαυτό σου.

Η ίδια η σήμανση των αντικειμένων γίνεται μέσω του attribute `msDS-ObjectSoa`. Μόνο τα objects που έχουν αυτό το attribute συμπεριλαμβάνονται στην πολιτική, όλα τα υπόλοιπα συνεχίζουν να λειτουργούν ακριβώς όπως πριν. Και κάτι που θεωρώ σημαντικό αρχιτεκτονικά: το enforcement είναι **προσθετικό** πάνω στο υπάρχον RBAC μοντέλο του AD. Βάζει έναν επιπλέον περιορισμό, δεν παραχωρεί κανένα επιπλέον δικαίωμα σε κανέναν. Δεν χρειάζεται δηλαδή να ξαναδείς το delegation model σου από την αρχή για να το δοκιμάσεις.

## Enforced ή Audit: ξεκίνα από το δεύτερο

Η πολιτική υποστηρίζει δύο καταστάσεις, και η ύπαρξη της δεύτερης είναι, κατά τη γνώμη μου, το πιο ώριμο σχεδιαστικό στοιχείο όλης της λειτουργίας.

Σε **Enforced** mode, μόνο τα SIDs που έχουν δηλωθεί στην πολιτική μπορούν να κάνουν αλλαγές. Οι LDAP modify operations μπλοκάρονται, όπως και οι επαναφορές αντικειμένων από τον AD Recycle Bin. Τα LDAP Add operations επιτρέπονται κανονικά, ακόμα κι αν περιλαμβάνουν το `msDS-ObjectSoa` attribute.

Σε **Audit** mode, οι αλλαγές περνάνε κανονικά σύμφωνα με το υπάρχον RBAC, αλλά κάθε τροποποίηση από μη εξουσιοδοτημένο χρήστη γράφει event στο Directory Services log του Event Viewer. Για να δεις αυτά τα events θα χρειαστεί να ανεβάσεις το Security Diagnostics logging level σε τιμή `1`.

Πρακτικά αυτό σου δίνει ένα καθαρό «what-if»: τρέχεις σε Audit για ένα-δύο sprints, μαζεύεις τα events, και βλέπεις με πραγματικά δεδομένα ποιος πραγματικά αγγίζει αυτά τα groups on-premises και γιατί. Πολύ συχνά η απάντηση αποκαλύπτει διαδικασίες που κανείς δεν είχε καταγράψει ποτέ όπως ένα script που τρέχει από κάποιον service account, μια χειροκίνητη ρουτίνα onboarding, ένα legacy εργαλείο HR. Το να τα ανακαλύψεις αυτά σε Enforced mode, μια Παρασκευή απόγευμα, είναι σαφώς λιγότερο ευχάριστο.

## Τι χρειάζεσαι πραγματικά για να το στήσεις

Εδώ είναι που η λίστα προϋποθέσεων γίνεται συγκεκριμένη, και θα ήμουν ανειλικρινής αν έλεγα ότι είναι ελαφριά.

Χρειάζεσαι domain controllers σε **Windows Server 2022 ή 2025** γιατί η πολιτική εγκαθίσταται στον PDCe role DC. Πάνω σε αυτούς πρέπει να έχει εγκατασταθεί cumulative update που περιέχει τον κώδικα του enforcement, με ελάχιστη έκδοση του `ntdsai.dll` στο **10.0.20348.5257** για το Server 2022 και **10.0.26100.32995** για το Server 2025. Μπορείς να το επαληθεύσεις εύκολα:

```powershell
(Get-Item C:\Windows\System32\ntdsai.dll).VersionInfo.FileVersion
```

Το ενδιαφέρον (και εύκολα παραβλέψιμο) σημείο είναι ότι **ο κώδικας έρχεται με το update αλλά είναι απενεργοποιημένος by default**. Για να τον ενεργοποιήσεις χρειάζεται να εγκαταστήσεις ένα Group Policy MSI σε κάθε domain controller, με μοντέλο ενεργοποίησης τύπου Known Issue Rollback. Υπάρχει ξεχωριστό MSI για κάθε έκδοση Server ([2022](https://aka.ms/ADEnforcementGPMSI2022), [2025](https://aka.ms/ADEnforcementGPMSI2025)). Εναλλακτικά, αν στήνεις καθαρά lab περιβάλλον, ένα Windows Server Insider Preview build έχει τη λειτουργία ήδη ενεργή και σου γλιτώνει το βήμα.

Πέρα από αυτά χρειάζεσαι provisioning agent σε Windows Server 2019 ή 2022 domain-joined μηχάνημα, tenant με **Microsoft Entra ID P1** licensing για group provisioning προς AD, δικαιώματα Domain Admin για να τρέξεις το configuration script, και το ίδιο το script `Set-CloudSyncSOAPolicy.ps1` από το [repo AzureAD/EntraIDGovernance στο GitHub](https://github.com/AzureAD/EntraIDGovernance/blob/main/Set-CloudSyncSOAPolicy.ps1).

Μετά την εγκατάσταση και το restart, το `SOA-Policies` container μπορεί να χρειαστεί 5 έως 10 λεπτά για να εμφανιστεί. Αν δεν το δεις αμέσως στο ADSI Edit, μην αρχίσεις να ψάχνεις τι πήγε στραβά.

![Το ADSI Edit εμφανίζει το container CN=SOA-Policies κάτω από το CN=System](https://learn.microsoft.com/en-us/entra/identity/hybrid/cloud-sync/media/how-to-ad-group-enforcement/soa-policies-container.png)

*Το `CN=SOA-Policies` όπως εμφανίζεται στο ADSI Edit κάτω από το `CN=System`. Πηγή εικόνας: Microsoft Learn*

## Η διαδικασία σε πέντε κινήσεις

Αφού το container είναι στη θέση του, η ροή είναι σχετικά σύντομη. Εγκαθιστάς τον Cloud Sync provisioning agent. Τρέχεις το script με το mode που θέλεις:

```powershell
.\Set-CloudSyncSOAPolicy.ps1 -EnforcementMode Audit -Credential (Get-Credential -Message "Enter Domain Admin credentials (format: DOMAIN\Username)")
```

Στη συνέχεια μαρκάρεις τα groups που θέλεις, θέτοντας το `msDS-ObjectSoa` σε τιμή `Cloud` μέσα από τα attribute mappings του Cloud Sync. Εδώ έχεις δύο επιλογές, και η δεύτερη είναι σαφώς προτιμότερη για σταδιακό rollout: είτε constant mapping που εφαρμόζεται σε όλα τα in-scope groups, είτε expression που περιορίζει το enforcement σε συγκεκριμένα groups. Αν ξεκινάς πιλοτικά, το expression είναι ο φίλος σου.

Αναθέτεις τα groups στο provisioning scope, τρέχεις sync ή on-demand provisioning, και μετά επαληθεύεις με ADSI Edit ότι το `msDS-ObjectSoa` έχει όντως γραφτεί πάνω στο on-premises group. Μην ξεχάσεις να ενεργοποιήσεις το **View > Advanced Features** πριν ανοίξεις τα Properties του group, αλλιώς το Attribute Editor tab δεν θα εμφανιστεί καν.

![Η καρτέλα Attribute Editor ενός group στο ADSI Edit με το attribute msDS-ObjectSoa συμπληρωμένο](https://learn.microsoft.com/en-us/entra/identity/hybrid/cloud-sync/media/how-to-ad-group-enforcement/verify-msds-objectsoa-attribute.png)

*Επαλήθευση ότι το `msDS-ObjectSoa` έχει τεθεί στο on-premises group. Πηγή εικόνας: Microsoft Learn*

Τέλος, και σοβαρά, **μην παραλείψεις το break-glass account**. Στο `CN=SOA-Policies` > `CN=CloudSyncSOAPolicy`, μέσα από το Attribute Editor, προσθέτεις στο attribute `msDS-Settings` το SID ενός λογαριασμού που θα μπορεί να παρεμβαίνει τοπικά όταν χρειαστεί. Το να έχεις έναν preventive control χωρίς τεκμηριωμένη διαδικασία παράκαμψης έκτακτης ανάγκης είναι, στην καλύτερη περίπτωση, ημιτελές και στη χειρότερη, ένα ωραίο εύρημα για τον επόμενο auditor σου.

![Το ADSI Edit με το attribute msDS-Settings ανοιχτό στον Multi-valued String Editor και ένα SID καταχωρημένο](https://learn.microsoft.com/en-us/entra/identity/hybrid/cloud-sync/media/how-to-ad-group-enforcement/add-break-glass-sid.png)

*Η καταχώρηση του SID του break-glass λογαριασμού στο `msDS-Settings` του `CN=SOA-Policies`. Πηγή εικόνας: Microsoft Learn*

Για troubleshooting υπάρχει και το `Check-CloudSyncSOAPolicy.ps1` στο ίδιο repo, που σου λέει αν το enforcement είναι πράγματι ενεργό στον συγκεκριμένο domain controller. Αν δεις αλλαγές να περνάνε ενώ δεν θα έπρεπε, από εκεί ξεκινάς.

## Οι περιορισμοί που πρέπει να διαβάσεις δύο φορές

Είναι preview, και οι περιορισμοί δεν είναι διακοσμητικοί.

Υποστηρίζονται **μόνο group objects**. Ο μηχανισμός τεχνικά δουλεύει και για users, αλλά το user provisioning προς AD μέσω provisioning agent δεν υποστηρίζεται ακόμα.

Η **μετατροπή του source of authority** ενός group στο Entra δεν κλειδώνει αυτόματα το group στο AD. Είναι δύο ξεχωριστές ενέργειες, και πρέπει να κάνεις ρητά τη διαμόρφωση που περιγράφεται παραπάνω.

Το enforcement **δεν αποτρέπει διαγραφές**. Μπλοκάρει modifications και restores από το Recycle Bin, αλλά ένα κλειδωμένο group μπορεί ακόμα να διαγραφεί τοπικά. Αν σχεδιάζεις control για ακεραιότητα των groups, αυτό είναι σημαντικό κενό που πρέπει να καλύψεις με άλλα μέσα όπως auditing, delegation, ή AD Recycle Bin με σαφή διαδικασία.

Και το πιο κρίσιμο επιχειρησιακά: **μια αλλαγή σε κλειδωμένο object περνάει κανονικά αν γίνει σε domain controller όπου το enforcement δεν είναι ενεργοποιημένο**. Δεν υπάρχει partial protection εδώ. Είτε ενεργοποιείς τη λειτουργία σε κάθε DC του domain, είτε ουσιαστικά έχεις έναν έλεγχο που παρακάμπτεται απλώς με το να στοχεύσει κάποιος διαφορετικό DC. Σε multi-site περιβάλλοντα με τοπικούς domain controllers ανά εργοστάσιο ή υποκατάστημα (σενάριο που το ζω καθημερινά) αυτό μεταφράζεται σε ένα καθόλου αμελητέο patching και deployment project.

## Η δική μου ανάγνωση

Θα είμαι ειλικρινής: όταν διάβασα για πρώτη φορά αυτή τη λειτουργία, η αντίδρασή μου ήταν «επιτέλους». Το να μπορείς να πεις σε έναν auditor ότι τα cloud-governed groups σου προστατεύονται από τεχνικό, preventive control και όχι από μια διαδικασία και καλή θέληση, είναι ουσιαστική διαφορά. Και σε πλαίσια όπως το ISO/IEC 27001 ή οι απαιτήσεις access control της NIS2, αυτή η διαφορά μετράει πολύ συγκεκριμένα.

Ταυτόχρονα, δεν θα το έβαζα σήμερα σε production. Το operational βάρος είναι πραγματικό (cumulative updates και MSI σε κάθε domain controller, με restart) και η αδυναμία αποτροπής διαγραφών σημαίνει ότι το control είναι ακόμα μερικό. Το ότι μια αλλαγή περνάει από οποιονδήποτε μη ενημερωμένο DC είναι ακριβώς το είδος της λεπτομέρειας που μετατρέπει ένα «έχουμε control» σε εύρημα κατά τον έλεγχο.

Η προσέγγιση που θα ακολουθούσα, και που σκοπεύω να δοκιμάσω: lab tenant, Audit mode, ένα δείγμα από τα groups με τη μεγαλύτερη ευαισθησία, και τουλάχιστον ένα μήνα συλλογής events πριν καν σκεφτώ το Enforced. Παράλληλα, καταγραφή του ως planned control στο ISMS με σαφή ένδειξη ότι βρίσκεται σε preview, γιατί τα preview features δεν καλύπτονται από τα SLAs που καλύπτουν τα GA, και αυτό πρέπει να φαίνεται στην τεκμηρίωση από την πρώτη στιγμή.

Είναι η σωστή κατεύθυνση. Απλώς δεν έχει φτάσει ακόμα.

---

**Πηγή:** Το άρθρο βασίζεται στην επίσημη τεκμηρίωση της Microsoft, [Configure AD group enforcement in Microsoft Entra Cloud Sync (preview)](https://learn.microsoft.com/en-us/entra/identity/hybrid/cloud-sync/how-to-ad-group-enforcement).
