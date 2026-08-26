---
title: "Live Webinar: Μάθε το Microsoft Defender XDR σε 60 λεπτά"
date: 2026-08-25T09:02:00+03:00
lastmod: 2026-08-25T09:03:00+03:00
draft: false
keywords:
  - Microsoft Defender XDR
  - Chris Spanougakis MVP webinar
  - YouTube live Microsoft 365 Security
  - Business Email Compromise Ελλάδα
  - live demo Microsoft Defender
  - NIS2 ISO 27001 threat detection
tags:
  - Microsoft Defender XDR
  - EDR
  - Email Security
  - Identity Security
  - CASB
  - Cloud Security
  - NIS2
  - ISO 27001
  - CISO
  - Cybersecurity
author: "Dimosthenis Atteia"
description: "Αναφορά συμμετοχής στο δεύτερο live webinar του Chris Spanougakis MVP: τα live demo και τα περιστατικά που δείξαμε πάνω στο Microsoft Defender XDR, χωρίς να επαναλαμβάνει το συστηματικό reference guide που έρχεται στη σειρά Microsoft Defender Demystified."
summary: "Για δεύτερη φορά καλεσμένος στο live του Χρήστου Σπανουγάκη, αυτή τη φορά για ζωντανά demo πάνω στη σουίτα Microsoft Defender. Αυτό το άρθρο κρατάει τα συγκεκριμένα περιστατικά που δείξαμε, όχι έναν συστηματικό οδηγό ανά προϊόν, ο οποίος έρχεται σε ξεχωριστή σειρά."
categories: ["Microsoft 365 Security", "Threat Detection & Response"]
series:
ShowToc: true
TocOpen: false
weight: -5
cover:
  image: "images/defender-xdr-tutorial/Defender-XDR-tutorial-YouTube-cover.png"
  alt: "Live webinar promo: Μάθε το Microsoft Defender XDR σε 60 λεπτά, με Dimosthenis Atteia και Chris Spanougakis MVP"
  caption: "Live Webinar με τον Chris Spanougakis MVP"
  relative: true
ShowReadingTime: true
ShowWordCount: true
slug: "microsoft-defender-xdr-full-tutorial-ciso"
---

Για δεύτερη φορά ήμουν καλεσμένος στο live webinar του Χρήστου Σπανουγάκη, **[Chris Spanougakis MVP](https://www.youtube.com/@Chris_OnTechnology)**, εδώ και 26 χρόνια και MVP σε Microsoft 365 και Security. Αυτή τη φορά το θέμα ήταν πιο τεχνικό και πιο βαθύ: ολόκληρη η σουίτα **Microsoft Defender XDR**, μέσα από πραγματικά demo και στα δύο μας tenants. Το βίντεο το βρίσκετε ολόκληρο εδώ, [Live Webinar: Μάθε το Microsoft Defender XDR σε 60 λεπτά](https://www.youtube.com/watch?v=Dq1LRbkD36g&t=2454s), και όπως πάντα σας προτείνω να κάνετε εγγραφή στο [κανάλι Chris Spanougakis MVP](https://www.youtube.com/@Chris_OnTechnology), γιατί ανεβάζει σταθερά πολύ καλό, πρακτικό υλικό γύρω από το Microsoft 365 και το Security, καθώς και να επισκεφτείτε το [Personal Webiste & Blog του](https://spanougakis.com/).

Αυτό το άρθρο δεν είναι ένας συστηματικός οδηγός ανά προϊόν του Defender. Αυτό έρχεται σε ξεχωριστή, δομημένη σειρά, τη **Microsoft Defender Demystified**, που την ανέφερα ήδη στη σειρά για το Secure Score. Εδώ κρατάω μόνο τα συγκεκριμένα περιστατικά, τα demo και τις παρατηρήσεις που ξεχώρισαν από το ίδιο το webinar.

## Login χωρίς κωδικό

Πριν καν μπούμε σε οποιοδήποτε recommendation, ο Χρήστος μπήκε στο Defender Portal χωρίς κανένα password, χρησιμοποιώντας **passkeys**, phishing-resistant MFA, τον τρόπο σύνδεσης που σήμερα δεν μπορεί να χακαριστεί ούτε με social engineering, σε αντίθεση με το κλασικό MFA με εξαψήφιο κωδικό στο κινητό. Μικρή λεπτομέρεια, αλλά το καλύτερο δυνατό teaser για το πώς έχει αλλάξει η ταυτοποίηση τα τελευταία χρόνια.

## Ένα μηχάνημα, δύο μη αναμενόμενα ευρήματα

Μέσα από τα Assets ανοίξαμε ένα συγκεκριμένο μηχάνημα με Windows 11. Πέρα από το exposure score, το tab Security Recommendations δεν έδειξε μόνο ρυθμίσεις ασφάλειας, έδειξε και ξεπερασμένο λογισμικό, στο παράδειγμά μας μια παλιά έκδοση Foxit PDF Reader και Chrome.

[![Λίστα security recommendations για συγκεκριμένο endpoint στο Microsoft Defender](/images/defender-xdr-tutorial/defender-endpoint-security-recommendations.png)](/images/defender-xdr-tutorial/defender-endpoint-security-recommendations.png)
> 📷 **Εικόνα 1: Devices → συγκεκριμένο μηχάνημα → Security recommendations.**

Κάνοντας κλικ σε ένα recommendation, π.χ. «Require LDAP client signing», βλέπετε την εξήγηση, το potential risk, και ακριβώς πώς να το υλοποιήσετε: μέσω Active Directory Group Policy, μέσω registry, ή αν πρόκειται για κάτι σαν «Turn on Defender Credential Guard», ακόμα και μέσω hardware readiness tool. Δεν υπάρχει δικαιολογία «δεν ήξερα πώς να το κάνω», η καθοδήγηση είναι βήμα-βήμα.

## Δύο email που δεν έφτασαν ποτέ στον χρήστη

Ο Χρήστος έδειξε ζωντανά δύο περιστατικά από το δικό του tenant. Στο πρώτο, είχε φτάσει ένα email που μιμούνταν πληρωμή από Alpha Bank, με ένα συνημμένο. Το συνημμένο δεν έφτασε ποτέ στον χρήστη, αντικαταστάθηκε αυτόματα από ένα αρχείο κειμένου που εξηγούσε ότι εντοπίστηκε malware, μάλιστα δύο διαφορετικά malware μέσα στο ίδιο συνημμένο.

[![Microsoft Defender SmartScreen block notification σε malicious link μέσα από Word έγγραφο](/images/defender-xdr-tutorial/defender-office365-safe-links-block.png)](/images/defender-xdr-tutorial/defender-office365-safe-links-block.png)
> 📷 **Εικόνα 2: Microsoft Defender SmartScreen σε δράση, browser block notification όταν χρήστης πατά malicious link μέσα από Word έγγραφο.**

Στο δεύτερο, ένα αρχείο Word περιείχε ένα malicious link. Ανοίγοντας το αρχείο και πατώντας το link, εμφανίστηκε αμέσως ειδοποίηση από το Microsoft Defender SmartScreen στον browser, blocking το link πριν προλάβει να ανοίξει. Μια σημαντική διευκρίνιση εδώ: η προστασία αυτή δουλεύει αξιόπιστα όταν το link ανοίγει μέσα από εφαρμογή Microsoft 365. Αν το ίδιο malicious link βρίσκεται μέσα σε ένα PDF, το Defender δεν μπορεί πάντα να το προστατεύσει με τον ίδιο τρόπο, γιατί δεν αναγνωρίζει ότι ανοίχτηκε μέσα από εφαρμογή του 365.

## Ο δρόμος προς τους προνομιακούς λογαριασμούς

Στο κομμάτι identity, το πιο εντυπωσιακό ήταν οι **Lateral Movement Paths**: μια οπτική αναπαράσταση του πιθανού δρόμου που θα ακολουθούσε ένας επιτιθέμενος μέχρι να αποκτήσει πρόσβαση σε προνομιακούς λογαριασμούς, ιδιαίτερα χρήσιμο σε περιβάλλοντα με Active Directory όπου συχνά υπάρχουν κρυφοί δρόμοι κλιμάκωσης δικαιωμάτων. Δείξαμε επίσης το **Password Protection** dashboard: leaked credentials στο dark web, είτε από το τοπικό AD είτε από το Entra ID, με ειδοποίηση στον χρήστη να αλλάξει password μόλις εντοπιστεί διαρροή.

## Risk scoring 37.631 εφαρμογών

Αυτό που με εντυπωσίασε περισσότερο στο demo ήταν η λίστα της Microsoft με **37.631 εφαρμογές** βαθμολογημένες ανάλογα με την επικινδυνότητά τους. Ψάξαμε το WinZip, που πήρε βαθμολογία 7 στα 10 συνολικά, στο κόκκινο. Μπαίνοντας στη σελίδα της εφαρμογής, βλέπουμε ότι στο security score πήρε 9, γιατί δεν υποστηρίζει multifactor authentication ως εφαρμογή, στο compliance score πήρε 4, γιατί δεν υποστηρίζει γνωστά regulations όπως το ISO 27001, δηλαδή αν ο οργανισμός σας θέλει πιστοποίηση ISO 27001, αυτή η εφαρμογή δεν επιτρέπεται να είναι εγκατεστημένη πουθενά, και σε ό,τι αφορά το legal score, το κομμάτι που ξεχωρίζει είναι το GDPR.

[![Risk scoring εφαρμογής στο Microsoft Defender for Cloud Apps με sub-scores security, compliance, legal](/images/defender-xdr-tutorial/defender-cloud-apps-risk-score.png)](/images/defender-xdr-tutorial/defender-cloud-apps-risk-score.png)
> 📷 **Εικόνα 3: Defender for Cloud Apps → Catalog. Κάθε εφαρμογή έχει risk score με ανάλυση σε security, compliance και legal.**

Μέσα από το **Cloud Discovery** είδαμε μία πραγματική λίστα: 240 εφαρμογές, 18 διευθύνσεις IP, τέσσερις χρήστες, τρία devices, με πλήρη εικόνα traffic. Ανοίγοντας μια συγκεκριμένη εφαρμογή, π.χ. WordPress με score 7, βλέπετε ποιος τη χρησιμοποιεί, από ποιο μηχάνημα, και τι traffic δημιούργησε.

## Το δικό μου incident: DNS reconnaissance

Στο δικό μου κομμάτι του demo άνοιξα την ενότητα Incidents, όπου φαίνεται τι έχει συμβεί το τελευταίο εξάμηνο στον οργανισμό. Σταθήκαμε σε ένα συγκεκριμένο incident με τίτλο **Network mapping reconnaissance (DNS)**, μια προσπάθεια χαρτογράφησης του εσωτερικού δικτύου μέσω ερωτημάτων DNS, κλασική πρώτη κίνηση ενός επιτιθέμενου πριν προχωρήσει σε lateral movement. Το σύστημα το έπιασε αμέσως και μου έδειξε γραφικά ποιος χρήστης, ποιο μηχάνημα, και ποιες διεργασίες εμπλέκονταν.

[![XDR incident attack story graph με Network mapping reconnaissance DNS](/images/defender-xdr-tutorial/defender-xdr-incident-DNS-reconnaissance.png)](/images/defender-xdr-tutorial/defender-xdr-incident-DNS-reconnaissance.png)
> 📷 **Εικόνα 4: Incidents → Attack story. Το γράφημα, τα impacted assets και το evidence & response για ένα incident τύπου network reconnaissance μέσω DNS.**

Το incident είχε αντίστοιχο alert, με ακριβή ημερομηνία και ώρα, ποια assets επηρεάστηκαν, ποιος χρήστης και ποια συσκευή, και ένα evidence & response tab που εξηγούσε γιατί η συγκεκριμένη ακολουθία ερωτημάτων DNS θεωρήθηκε ύποπτη. Δείξαμε επίσης το device management σε πράξη: μπαίνοντας σε ένα συγκεκριμένο μηχάνημα, μπορείτε να τρέξετε remote antivirus scan, ή να ανοίξετε ένα **Live Response session**, ένα απομακρυσμένο command console, όχι πλήρες command prompt, με περιορισμένες αλλά χρήσιμες εντολές (run, scan, status, processes) για να δείτε τι τρέχει σε πραγματικό χρόνο ή να σταματήσετε μια διεργασία. Η δυνατότητα υπάρχει και για servers, όχι μόνο για client μηχανήματα.

## Τρία πράγματα να κρατήσετε

1. **Δεν υπάρχει ένα προϊόν που λύνει όλα τα προβλήματα.** Για κάθε πρόβλημα υπάρχει διαφορετική λύση μέσα στη σουίτα.
2. **Κάθε Defender προστατεύει διαφορετική επιφάνεια επίθεσης.** Endpoint, email, identity, apps, cloud, το καθένα καλύπτει το δικό του attack surface.
3. **Η πραγματική δύναμη είναι στην ενοποίηση.** Το Defender XDR συσχετίζει δεδομένα από όλα τα assets, όλο το email, όλα τα identities, όλες τις εφαρμογές, όλο το cloud, και αυτό επιτρέπει ταχύτερη ανίχνευση και απόκριση.

## Ένα πραγματικό περιστατικό: Business Email Compromise 4 εκατομμυρίων

Κατά τη διάρκεια του Q&A συζητήσαμε κάτι που είχε δημοσιευτεί λίγες μέρες πριν στο Capital.gr: ένα περιστατικό **Business Email Compromise** σε μεγάλη ελληνική ναυτιλιακή εταιρεία, με στόχο 4 εκατομμύρια ευρώ. Το θέμα ήρθε φυσικά μέσα από ερώτηση για IBAN change fraud, ένα από τα πιο κοινά σενάρια απάτης σήμερα.

Κανένας δεν μπορεί ποτέ να εγγυηθεί 100% ασφάλεια. Αυτό που κάνουν τα εργαλεία σε συνδυασμό με εκπαίδευση χρηστών είναι να μειώνουν το ρίσκο. Ο Χρήστος ανέφερε κάτι που το έχει δει να λειτουργεί στην πράξη σε πολλές εταιρείες: πέρα από τις τεχνολογικές λύσεις, μια επιπλέον δικλίδα ασφαλείας είναι μια προσυμφωνημένη λέξη-κωδικός μέσα στην επικοινωνία, ώστε ποτέ να μη γίνεται μεταφορά χρημάτων αν αυτή η λέξη δεν υπάρχει στην επικοινωνία. Δεν είναι πανάκεια, αλλά έχει σώσει εταιρείες από πολύ μεγάλα ποσά.

Και όπως σωστά σημείωσε ο Χρήστος, μέχρι πριν από μερικά χρόνια δεν υπήρχε λύση στην αγορά που να κάνει το correlation που κάνει σήμερα η Microsoft με το Defender, βασιζόμασταν σε πολλά εργαλεία με διαφορετικά dashboards, χωρίς δυνατότητα correlation μεταξύ τους, και κάτι μπορούσε πάντα να χάνεται ανάμεσα στις γραμμές.

## Θέλετε τον συστηματικό οδηγό;

Αν ψάχνετε δομημένη, βήμα-βήμα κάλυψη κάθε προϊόντος της σουίτας Defender, με licensing decoder και portal tour, αυτό έρχεται στη σειρά **Microsoft Defender Demystified**, που είναι ήδη στο πρόγραμμα του blog. Αυτό εδώ ήταν η αναφορά της δεύτερης συμμετοχής μου στο live του Χρήστου, με τα συγκεκριμένα demo και περιστατικά που ξεχώρισαν.

Ευχαριστώ ξανά τον Χρήστο Σπανουγάκη για την πρόσκληση και τη φιλοξενία στο **[Live Webinar: Μάθε το Microsoft Defender XDR σε 60 λεπτά](https://www.youtube.com/watch?v=Dq1LRbkD36g&t=2454s)**. Το πλήρες βίντεο, με όλα τα live demo και το Q&A, το βρίσκετε εκεί, και το [κανάλι Chris Spanougakis MVP](https://www.youtube.com/@Chris_OnTechnology) αξίζει σίγουρα την εγγραφή σας.

Αν έχετε δει κάτι αντίστοιχο στον δικό σας οργανισμό, ή αν κάτι από όσα περιέγραψα σας φαίνεται διαφορετικό στο δικό σας tenant, χαίρομαι πάντα να το συζητήσουμε στα σχόλια ή στο LinkedIn.
