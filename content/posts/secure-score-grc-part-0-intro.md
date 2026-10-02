---
title: "Microsoft Secure Score ως εργαλείο GRC για ISO 27001 & NIS2"
date: 2026-04-22T10:00:00+03:00
lastmod: 2026-10-02T10:25:00+03:00
draft: false
keywords:
  - Microsoft Secure Score για συμμόρφωση ISO 27001 και NIS2
  - πρόγραμμα GRC στο Microsoft 365
  - Microsoft Secure Score Compliance Manager mapping
  - Microsoft 365 GRC χωρίς πλατφόρμα τρίτου
  - Microsoft Secure Score audit evidence
  - ISO 27001 Annex A Microsoft 365 controls
  - NIS2 Article 21 Microsoft 365
  - Microsoft Secure Score case study
  - live audit evidence Microsoft 365
tags:
  - Microsoft Secure Score
  - Microsoft 365 Security
  - Microsoft Purview
  - Microsoft Defender XDR
  - ISO 27001
  - NIS2
  - Cyber GRC
  - Compliance Manager
  - CISO
  - Security Posture Management
author: "Dimosthenis Atteia"
description: "Πώς χτίσαμε πρόγραμμα GRC για ISO 27001 και NIS2 πάνω στο Microsoft Secure Score: μηδενικό επιπλέον κόστος, χωρίς πλατφόρμα τρίτου, με Gold Award."
summary: "Εισαγωγή στη σειρά: το πρόβλημα GRC της μεσαίας επιχείρησης, πώς το Microsoft Secure Score καλύπτει αυτόματα το 60–70% των controls του ISO 27001:2022 Annex A και του NIS2 Article 21, τα τέσσερα δομικά στοιχεία του προγράμματος με το Gold Award και η προτεινόμενη σειρά ανάγνωσης."
categories: ["GRC & Compliance"]
series: ["Microsoft Secure Score as a Cyber GRC Instrument"]
ShowToc: true
TocOpen: false
weight: -4
cover:
  image: "/images/CyberGRCGoldAward.webp"
  alt: "Το Microsoft Secure Score ως μηχανή GRC για συμμόρφωση με ISO 27001:2022 και NIS2 Article 21, βραβευμένο με Gold Award"
  caption: "Εισαγωγή στη σειρά, χτισμένη πάνω στο Microsoft 365"
  relative: false
  hidden: false
---

## Το πρόβλημα GRC της μεσαίας επιχείρησης: NIS2 και ISO 27001 χωρίς μεγάλο budget

Αν έχεις την ευθύνη της ασφάλειας σε έναν μεσαίου μεγέθους οργανισμό που εμπίπτει στο **NIS2** ή επιδιώκει πιστοποίηση **ISO 27001**, ξέρεις την πίεση. Οι κανονιστικές απαιτήσεις αυξάνονται γρήγορα. Οι κύκλοι των audits είναι στενοί. Το Διοικητικό Συμβούλιο θέλει το cyber risk σε αριθμούς, όχι σε αφηγήσεις. Και το budget για GRC, ας είμαστε ειλικρινείς, δεν είναι ποτέ αυτό που θα έπρεπε.

Οι περισσότερες ομάδες απαντούν αγοράζοντας μια εξειδικευμένη πλατφόρμα GRC ή προσλαμβάνοντας περισσότερους analysts. Εμείς πήραμε άλλο δρόμο, και αυτός ο δρόμος λέγεται **Microsoft Secure Score**. Αυτή η σειρά είναι ο πρακτικός οδηγός για τη χρήση του Microsoft Secure Score ως μηχανής GRC για τη συμμόρφωση με ISO 27001 και NIS2, χτισμένος εξ ολοκλήρου πάνω σε εργαλεία που έχεις ήδη μέσα στο **Microsoft 365**. Η προσέγγιση μπορεί να αναπαραχθεί από σχεδόν κάθε οργανισμό με tenant E3 ή E5, και είναι ο τρόπος με τον οποίο παραδώσαμε ένα πρόγραμμα GRC βραβευμένο με Gold Award, χωρίς να αγοράσουμε πλατφόρμα τρίτου.

> ⚡**TL;DR για τους βιαστικούς:** Το Microsoft Secure Score, σε συνδυασμό με το **Microsoft Purview Compliance Manager**, μπορεί να τεκμηριώσει αυτόματα το **60-70% των τεχνικών controls του ISO 27001:2022 Annex A και του NIS2 Article 21**, μόνο με το licensing που ήδη πληρώνεις. Το υπόλοιπο **30-40%** καλύπτεται από εργαλεία του Purview και τεκμηριωμένες διαδικασίες. **Συνολική δαπάνη για GRC εργαλεία τρίτων: 0 €.**

## Η μηχανή GRC του Microsoft Secure Score που κρύβεται μέσα στο Microsoft 365

Είχαμε ήδη άδειες **Microsoft 365 E5**. Χρησιμοποιούσαμε ήδη καθημερινά το **[Microsoft Defender XDR](https://learn.microsoft.com/en-us/defender-xdr/microsoft-365-defender)**. Και ακριβώς εκεί, μέσα στο Microsoft Defender portal, υπήρχε κάτι που οι περισσότερες ομάδες αντιμετωπίζουν ως dashboard για εντυπωσιασμό: το **[Microsoft Secure Score](https://learn.microsoft.com/en-us/defender-xdr/microsoft-secure-score)**.

[![Το dashboard του Microsoft Secure Score που τροφοδοτεί ένα πρόγραμμα GRC για ISO 27001 και NIS2 στο Microsoft 365](/images/Overall.webp)](/images/Overall.webp)
> 📷 **Εικόνα 1: Το dashboard του Microsoft Secure Score.**

Κοιτώντας το με φρέσκια ματιά, καταλάβαμε ότι η Microsoft είχε ήδη κάνει το μεγαλύτερο μέρος της βαριάς δουλειάς του GRC:

- Μια **συνεχώς ανανεούμενη αξιολόγηση** της παραμετροποίησης του tenant μας απέναντι σε έναν κατάλογο controls που η Microsoft συντηρεί και ενημερώνει καθώς αλλάζει το τοπίο των απειλών.
- Ένα **machine-readable dataset**, διαθέσιμο μέσω του **[Microsoft Graph Security API](https://learn.microsoft.com/en-us/graph/api/resources/security-api-overview)**, που μπορεί να καταναλώσει κάθε σύγχρονο εργαλείο reporting.
- **Εγγενή ενσωμάτωση** με το **[Microsoft Purview Compliance Manager](https://learn.microsoft.com/en-us/purview/compliance-manager)**, το **Microsoft Sentinel** και το **Power BI**, πλατφόρμες που είχαμε ήδη.

Το κενό που έπρεπε να γεφυρώσουμε ήταν μικρό: να συνδέσουμε τα δεδομένα της Microsoft με τα compliance frameworks μας, να χτίσουμε τα σωστά reports και να βάλουμε διακυβέρνηση γύρω από τις αποφάσεις ρίσκου. Επιπλέον δαπάνη σε τρίτους: ουσιαστικά μηδενική.

## Το Gold Award στα Cyber Security Awards 2026 (χτισμένο πάνω στο Microsoft Secure Score)

[![Gold Award στα Cyber Security Awards 2026 για πρόγραμμα GRC χτισμένο πάνω στο Microsoft Secure Score](/images/CyberGRCGoldAward.webp)](/images/CyberGRCGoldAward.webp)
> 📷 **Εικόνα 2: Το λογότυπο του Gold Award.**

[![Η πλακέτα του Gold Award στα Cyber Security Awards 2026, κατηγορία Governance Risk and Compliance](/images/CyberGRCGoldAwardPlate.webp)](/images/CyberGRCGoldAwardPlate.webp)
> 📷 **Εικόνα 3: Η πλακέτα του Gold Award.**

[![Τελετή των Cyber Security Awards 2026, Gold Award για το πρόγραμμα GRC με Microsoft Secure Score](/images/CSAward2026_1.webp)](/images/CSAward2026_1.webp)
> 📷 **Εικόνα 4: Η τελετή απονομής του Gold Award με τους συναδέλφους.**

Το πρόγραμμα που χτίσαμε πάνω σε αυτή τη βάση απέσπασε το **Gold Award στην κατηγορία Governance, Risk & Compliance στα [Cyber Security Awards 2026 — Honoring Cyber Excellence](https://cybersecurityawards.boussiasevents.gr/winners_2026-45/)**, με τίτλο *«Από τη θεωρία στη μετρήσιμη συμμόρφωση: το Microsoft Secure Score ως εργαλείο Cyber GRC»*.

Η αρχή που αναγνώρισε η επιτροπή είναι η ίδια που διατρέχει ολόκληρη τη σειρά: **το Microsoft 365 περιέχει ήδη τη μηχανή GRC που οι περισσότεροι οργανισμοί πληρώνουν ξεχωριστά για να αποκτήσουν.** Αρκεί να την αναγνωρίσουν ως τέτοια και να τη συνδέσουν σωστά.

## Πώς το κάναμε; Τέσσερα δομικά στοιχεία πάνω στο Microsoft 365

Η πλήρης υλοποίηση αναλύεται, με screenshots και παραδείγματα, στα υπόλοιπα άρθρα της σειράς. Εδώ θα δεις το γενικό σχήμα, για να αποφασίσεις αν θέλεις να συνεχίσεις.

### Δομικό στοιχείο 1: Το Microsoft Secure Score ως single source of truth

[![Recommendation του Microsoft Secure Score για phishing-resistant MFA strength στους administrators, σε ανεπτυγμένη προβολή](/images/PrMFA0.webp)](/images/PrMFA0.webp)
> 📷 **Εικόνα 5: Ένα recommendation του Secure Score για το "Ensure 'Phishing-resistant MFA strength' is required for Administrators", σε ανεπτυγμένη προβολή.**

[![Γενική περιγραφή του action του Microsoft Secure Score για το MFA control, με οδηγίες υλοποίησης από τη Microsoft](/images/PrMFA1.png)](/images/PrMFA1.png)
> 📷 **Εικόνα 6: Η γενική περιγραφή για το συγκεκριμένο action του Secure Score.**

[![Βήματα υλοποίησης του Microsoft Secure Score για Conditional Access policy με phishing-resistant MFA](/images/PrMFA2.png)](/images/PrMFA2.png)
> 📷 **Εικόνα 7: Τα βήματα υλοποίησης του Secure Score για το συγκεκριμένο action.**

Σταματήσαμε να βλέπουμε το Secure Score ως έναν αριθμό που πρέπει να ανέβει. Αρχίσαμε να βλέπουμε κάθε recommendation ως ένα **control που ελέγχεται συνεχώς**. Η Microsoft μάς λέει, σε πραγματικό χρόνο, ποια controls είναι ρυθμισμένα και ποια όχι. Το κρίσιμο είναι ότι δίνει μέσα σε κάθε recommendation και τις οδηγίες υλοποίησης και την ανάλυση επίπτωσης στους χρήστες. Αυτές οι οδηγίες, γραμμένες από τους μηχανικούς της Microsoft, είναι χρυσός για κάθε ομάδα GRC που μέχρι τώρα έγραφε τα σχέδια αποκατάστασης από το μηδέν.

### Δομικό στοιχείο 2: Γεφυρώνοντας το Compliance Manager με το Secure Score για live evidence

Εδώ η πλατφόρμα της Microsoft κάνει ήδη τεράστιο μέρος της δουλειάς, και οι περισσότερες ομάδες δεν το έχουν αντιληφθεί.

Το **[Microsoft Purview Compliance Manager](https://learn.microsoft.com/en-us/purview/compliance-manager)** έρχεται με έτοιμα assessments για **ISO/IEC 27001:2022**, **NIS 2 Directive**, **GDPR**, **NIST CSF** και πάνω από 300 ακόμα κανονισμούς. Η Microsoft έχει κάνει για σένα τη βασική αντιστοίχιση: κάθε control ενός framework συνδέεται με ένα ή περισσότερα **Improvement Actions**, δηλαδή συγκεκριμένες αλλαγές παραμετροποίησης που μπορείς να κάνεις σε Microsoft 365, Entra ID, Microsoft Purview και Azure για να ικανοποιήσεις το control.

[![Microsoft Purview Compliance Manager, assessment ISO 27001:2022, Authentication Information, Control ID A.5.17](/images/A.5.17_AuthenticationInformation.png)](/images/A.5.17_AuthenticationInformation.png)
> 📷 **Εικόνα 8: Microsoft Purview Compliance Manager, assessment ISO 27001:2022, Authentication Information, Control ID A.5.17.**

Αυτό που το Compliance Manager *δεν* σου δίνει έτοιμο είναι μια ζωντανή σύνδεση ανάμεσα σε ένα Improvement Action και στο αντίστοιχο recommendation του **Microsoft Secure Score**, το οποίο αποδεικνύει ότι το control είναι αυτή τη στιγμή σωστά ρυθμισμένο σε όλο το tenant. Το Improvement Action σού λέει *τι να κάνεις*. Το Secure Score σού λέει, σε πραγματικό χρόνο, *αν έχει γίνει*.

Αυτό ακριβώς το κενό κλείσαμε. Χτίσαμε ένα λεπτό mapping layer που, για κάθε Improvement Action του Compliance Manager που καλύπτεται από το ISO 27001:2022 Annex A και το NIS2 Article 21, εντοπίζει το αντίστοιχο recommendation του Microsoft Secure Score και αντλεί την τρέχουσα κατάστασή του μέσω του Microsoft Graph API. Το αποτέλεσμα είναι **μια προβολή live evidence πάνω στις αντιστοιχίσεις της ίδιας της Microsoft**. Ένα control δεν θεωρείται «ικανοποιημένο» επειδή κάποιος τσέκαρε ένα κουτάκι. Θεωρείται ικανοποιημένο επειδή το Microsoft Secure Score επιβεβαιώνει σήμερα, με timestamp, ότι η ρύθμιση είναι στη θέση της.

Περίπου το **60–70%** των τεχνικών controls του ISO 27001:2022 Annex A και του NIS2 Article 21 μπορεί να τεκμηριωθεί έτσι, απευθείας από την τηλεμετρία του Microsoft Secure Score. Το υπόλοιπο 30–40% καλύπτεται είτε από άλλα εργαλεία του Microsoft Purview (Data Loss Prevention, Information Protection, Insider Risk Management) είτε από τεκμηριωμένες οργανωτικές διαδικασίες. Το mapping συντηρείται σχεδόν μόνο του: όταν η Microsoft προσθέτει ή αναθεωρεί ένα Improvement Action ή ένα recommendation του Secure Score, αξιολογούμε την αλλαγή μία φορά και το pipeline του live evidence την παραλαμβάνει αυτόματα.

### Δομικό στοιχείο 3: Microsoft Graph API + Power BI για live audit evidence

Με το **Microsoft Graph Security API** αντλούμε καθημερινά την τηλεμετρία του Secure Score σε ένα Power BI workspace. Το αποτέλεσμα είναι ένα dashboard με live evidence, στο οποίο οι auditors μπορούν να πάρουν πρόσβαση μόνο για ανάγνωση, με πλήρες ιστορικό και timestamps. Τέλος στο κυνήγι των screenshots πριν από το επόμενο surveillance audit.

[![Power BI dashboard με live audit evidence του Microsoft Secure Score μέσω του Microsoft Graph Security API](/images/PBI_Def.webp)](/images/PBI_Def.webp)
> 📷 **Εικόνα 9: Microsoft Power BI για live audit evidence.**

Όλο αυτό είναι καθαρό Microsoft stack: κανένα script που τρέχει εκτός tenant, κανένα δεδομένο που φεύγει από το Microsoft 365, κανένα επιπλέον licensing.

### Δομικό στοιχείο 4: Το Microsoft Purview Compliance Manager για την εικόνα του board

Για το reporting προς το Διοικητικό Συμβούλιο συνδυάζουμε τα δεδομένα του Secure Score με το **Microsoft Purview Compliance Manager**, το οποίο η Microsoft προ-συμπληρώνει με assessments ευθυγραμμισμένα με **ISO 27001, NIS2, GDPR** και δεκάδες ακόμα frameworks. Ο συνδυασμός δίνει στο board, σε ένα μόνο τριμηνιαίο slide, και την εικόνα της παραμετροποίησης ασφάλειας (Secure Score) και την εικόνα της κανονιστικής συμμόρφωσης (Compliance Manager).

## Τα επιχειρησιακά αποτελέσματα: από εβδομάδες προετοιμασίας audit σε live evidence

Μέσα στον πρώτο χρόνο λειτουργίας του προγράμματος:

- Ο **χρόνος προετοιμασίας** για το surveillance audit του ISO 27001 έπεσε από εβδομάδες σε ημέρες.
- Το **reporting του cyber risk προς το board** πέρασε από ποιοτικές αφηγήσεις σε ζωντανούς, υπερασπίσιμους αριθμούς που στηρίζονται στην τηλεμετρία της Microsoft.
- Το ίδιο το **Microsoft Secure Score** βελτιώθηκε κατά **30%**, και κάθε κενό που απομένει είναι μια τεκμηριωμένη απόφαση ρίσκου, εγκεκριμένη από το board.
- **Συνολικό κόστος για εξωτερικά εργαλεία GRC: 0 €.** Όλα παραδόθηκαν πάνω στην υπάρχουσα επένδυση σε Microsoft 365 E5.
- Και, φυσικά, το Gold Award.

## Τι θα πάρεις από αυτή τη σειρά

Ο στόχος της σειράς είναι απλός: να καταλάβεις το Microsoft Secure Score αρκετά καλά ώστε να το κάνεις πραγματικό εργαλείο διακυβέρνησης και συμμόρφωσης για τον οργανισμό σου, όπως κάναμε εμείς για τον δικό μας.

Για να φτάσεις εκεί χωρίς να παραλείψεις βήματα, η προτεινόμενη σειρά ανάγνωσης είναι η εξής.

**Πρώτα τα θεμέλια: η οικογένεια του Microsoft Defender**

Αν τα ονόματα Microsoft Defender for Endpoint, Microsoft Defender for Office 365, Microsoft Defender for Identity ή Microsoft Defender for Cloud Apps δεν σου λένε ακόμα πολλά, ξεκίνα από τη συνοδευτική σειρά [Microsoft Defender Demystified](/series/microsoft-defender-demystified/), που καλύπτει ολόκληρο το οικοσύστημα του Microsoft Defender από άκρη σε άκρη (τα άρθρα της είναι στα αγγλικά):

1. [**Microsoft Defender Part 1: All Products, Which One Do You Need**](/posts/defender-demystified-series/defender-demystified-part-1-what-is-microsoft-defender/): ο χάρτης όλης της οικογένειας σε ένα άρθρο.
2. [**Microsoft Defender Part 2: The Four Core XDR Workloads, Up Close**](/posts/defender-demystified-series/defender-demystified-part-2-four-workloads/): τι προστατεύει κάθε workload.
3. [**Microsoft Defender Part 3: Microsoft Defender for Cloud**](/posts/defender-demystified-series/defender-demystified-part-3-defender-for-cloud/): η ιστορία του Azure και του multicloud.
4. [**Microsoft Defender Part 4: The Licensing Decoder**](/posts/defender-demystified-series/defender-demystified-part-4-licensing-decoder/): το licensing σε Microsoft 365 και Enterprise Mobility + Security.
5. [**Microsoft Defender Part 5: A Walk Through the Microsoft Defender Portal**](/posts/defender-demystified-series/defender-demystified-part-5-portal-tour/): πού βρίσκεται το καθετί.

Θέλεις να μπεις πιο βαθιά σε ένα συγκεκριμένο workload; Η σειρά [**Microsoft Defender Up Close**](/series/microsoft-defender-up-close/) ξεκίνησε με το [Microsoft Defender AIR](/posts/microsoft-defender-air-automated-investigation-response/). Έρχονται σύντομα πρακτικά walkthroughs σε επίπεδο παραμετροποίησης για τα Microsoft Defender for Endpoint, Office 365, Identity και Cloud Apps, καθώς και ένα άρθρο για το Enterprise Mobility + Security, το πακέτο ασφάλειας που πολλοί οργανισμοί έχουν ήδη και δεν αξιοποιούν πλήρως.

**Μετά, η ίδια η σειρά του Secure Score**

Μόλις το τοπίο του Microsoft Defender σου γίνει οικείο, γύρνα εδώ. Θα έχεις πλέον το πλαίσιο για να παρακολουθήσεις τι ακριβώς μετράει το Microsoft Secure Score. Τα τρία μέρη είναι στα αγγλικά:

1. [**Microsoft Secure Score Part 1: How to Read a Recommendation**](/posts/secure-score-grc-part-1-anatomy/): κάθε πεδίο ενός recommendation του Microsoft Secure Score, εξηγημένο όπως θα το εξηγούσε ένας φιλικός συνάδελφος. Γραμμένο για όσους ανοίγουν το score για πρώτη φορά.
2. [**Microsoft Secure Score Part 2: Inside the Defender Ecosystem**](/posts/secure-score-grc-part-2-ecosystem/): πώς λειτουργεί πραγματικά η βαθμολογία, ποια προϊόντα της Microsoft την τροφοδοτούν και πώς ακολουθείς έναν βαθμό πίσω στην πηγή του.
3. [**Microsoft Secure Score Part 3: Daily Operations & ISO 27001**](/posts/secure-score-grc-part-3-operations/): πώς ιεραρχείς τα recommendations, πώς στήνεις ροή αποκατάστασης, πώς αντιστοιχίζεις controls σε ISO 27001 και NIS2, πώς συλλέγεις audit evidence και πώς αναφέρεις στο board.

Αν προτιμάς να ξεκινήσεις στα ελληνικά, ο [**Πρακτικός Οδηγός για τον ΥΑΣΠΕ NIS2**](/posts/secure-score-defender-praktikos-odigos/) καλύπτει το Secure Score από την οπτική του Έλληνα Υπευθύνου Ασφάλειας.

**Γιατί να διαβάσεις πρώτα τα Μέρη 1, 2 και 3**

Το **Secure Score** είναι ο προορισμός αυτής της σειράς: το καθημερινό dashboard που σου δείχνει πού βρίσκεται ο οργανισμός σου σε ωριμότητα ασφάλειας, ανεξάρτητα από το μέγεθος, τη γεωγραφική θέση και την παρουσία του, και σε βοηθά να αποφασίσεις τι θα αντιμετωπίσεις πρώτο και τι μπορεί να περιμένει, σε εφαρμογές, δεδομένα, συσκευές και ταυτότητες χρηστών.
Για να είναι όμως πραγματικά χρήσιμο, και όχι άλλος ένας αριθμός που κοιτάς χωρίς να ξέρεις τι σημαίνει, πρέπει πρώτα να καταλάβεις πώς είναι χτισμένο [**(Μέρος 1: Anatomy)**](/posts/secure-score-grc-part-1-anatomy/), σε ποιο οικοσύστημα ζει [**(Μέρος 2: Ecosystem)**](/posts/secure-score-grc-part-2-ecosystem/) και πώς το λειτουργείς καθημερινά ως πραγματικό εργαλείο λειτουργίας και συμμόρφωσης [**(Μέρος 3: Daily Operations)**](/posts/secure-score-grc-part-3-operations/). Όταν αυτά τα τρία μέρη γίνουν ξεκάθαρα, το Secure Score του Defender παύει να είναι ένας «μαγικός αριθμός» και γίνεται εργαλείο λήψης αποφάσεων.
Διάβασε λοιπόν τα Μέρη 1, 2 και 3 με τη σειρά. Μετά, όσα καλύπτουμε στα κεφάλαια για το GRC και το evidence θα έχουν συγκεκριμένο νόημα μέσα στο δικό σου περιβάλλον.

Δεν χρειάζεται να είσαι developer. Δεν χρειάζεσαι πλατφόρμα GRC τρίτου. Χρειάζεσαι ένα Microsoft 365 tenant, λίγες συγκεντρωμένες ώρες την εβδομάδα και τη διάθεση να δεις το Microsoft Secure Score με φρέσκια ματιά.

Αν γνωρίζεις ήδη καλά το τοπίο του Microsoft Defender, μπορείς να προσπεράσεις την ενότητα με τα θεμέλια και να πας κατευθείαν στα άρθρα του Secure Score.

## Ξεκινάμε;

Και τα τρία μέρη έχουν δημοσιευτεί και σε περιμένουν:

- [**Part 1: How to Read a Recommendation**](/posts/secure-score-grc-part-1-anatomy/)
- [**Part 2: Inside the Defender Ecosystem**](/posts/secure-score-grc-part-2-ecosystem/)
- [**Part 3: Daily Operations & ISO 27001**](/posts/secure-score-grc-part-3-operations/)

Όλα τα άρθρα της σειράς θα τα βρίσκεις πάντα στη [σελίδα της σειράς](/series/microsoft-secure-score-as-a-cyber-grc-instrument/).

Ακολούθησέ με στο [LinkedIn](https://www.linkedin.com/in/dimosthenisatteia/) για ειδοποιήσεις όταν βγαίνει νέο άρθρο.

---
