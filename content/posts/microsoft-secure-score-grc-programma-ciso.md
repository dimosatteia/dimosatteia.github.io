---
title: "Τι κάνουν οι CISOs με το Microsoft Secure Score που δεν βλέπεις στα whitepapers"
date: 2026-08-25T09:00:00+03:00
lastmod: 2026-08-25T09:01:00+03:00
draft: false
keywords:
  - Microsoft Secure Score
  - GRC πρόγραμμα Microsoft 365
  - Governance Risk Compliance
  - NIS2 νόμος 5160/2024
  - ISO 27001 CISO
  - Cyber Security Awards GRC
  - Chris Spanougakis MVP webinar
  - YouTube live Microsoft 365 Security
author: "Dimosthenis Atteia"
description: "Αναφορά συμμετοχής στο live webinar του Chris Spanougakis MVP: τι δεν είχα ξαναγράψει για το Gold Award GRC πρόγραμμα πάνω στο Microsoft Secure Score, η παρουσίαση στο board σε τρία slides, λάθη που θα απέφευγα, και ένα live Power BI demo."
summary: "Ήμουν καλεσμένος στο live του Χρήστου Σπανουγάκη για να μιλήσω για το Gold Award GRC πρόγραμμα πάνω στο Microsoft Secure Score. Αυτό το άρθρο δεν επαναλαμβάνει τη σειρά, κρατάει μόνο ό,τι ειπώθηκε εκεί για πρώτη φορά: το board pitch σε τρία slides, τι θα έκανα διαφορετικά, και ένα bonus live demo στο Power BI."
categories: ["Microsoft 365 Security", "GRC & Compliance"]
series:
ShowToc: true
TocOpen: false
weight: -5
cover:
  image: "images/secure-score-grc-award/secure-score-youtube-thumbnail.png"
  alt: "Microsoft Secure Score dashboard με τους τέσσερις πυλώνες identity, device, apps, data"
  caption: "Microsoft Defender Portal → Secure Score → Overview"
  relative: true
ShowReadingTime: true
ShowWordCount: true
slug: "microsoft-secure-score-grc-programma-ciso"
---

Πριν λίγο καιρό ήμουν καλεσμένος στο live webinar του Χρήστου Σπανουγάκη, **[Chris Spanougakis MVP](https://www.youtube.com/@Chris_OnTechnology)**, γνωστού σε πολλούς από εσάς και από το κανάλι του στο YouTube. Ο Χρήστος με κάλεσε να μιλήσω για κάτι που μέχρι τότε το είχα μοιραστεί μόνο σε κομμάτια, μέσα από άρθρα εδώ στο blog: το πώς ένα GRC πρόγραμμα που χτίσαμε πάνω στο Microsoft Secure Score κέρδισε τελικά χρυσό βραβείο στα Cyber Security Awards του 2026, στην κατηγορία Governance, Risk & Compliance. Το βίντεο της συζήτησης το βρίσκετε ολόκληρο εδώ, [Τι κάνουν οι CISOs με το Microsoft Secure Score που δεν βλέπεις στα whitepapers](https://www.youtube.com/watch?v=ouciH--n2KI&t=276s), και σας προτείνω ανεπιφύλακτα να κάνετε εγγραφή στο [κανάλι του Χρήστου](https://www.youtube.com/@Chris_OnTechnology), γιατί ανεβάζει σταθερά πολύ πρακτικό υλικό γύρω από το οικοσύστημα της Microsoft.

[![How I Built a Gold-Award GRC Programme on Microsoft 365 with Microsoft Secure Score, YouTube thumbnail με Dimosthenis Atteia και Chris Spanougakis](/images/secure-score-grc-award/secure-score-youtube-thumbnail.png)](https://www.youtube.com/watch?v=ouciH--n2KI&t=276s)
> 🎥 **Δείτε ολόκληρο το webinar στο YouTube: [How I Built a Gold-Award GRC Programme on Microsoft 365 with Microsoft Secure Score](https://www.youtube.com/watch?v=ouciH--n2KI&t=276s)**

Αυτό το άρθρο δεν είναι η γραπτή απομαγνητοφώνηση της κουβέντας. Το πλήρες breakdown βήμα-βήμα για το πώς χτίστηκε το πρόγραμμα, η χαρτογράφηση σε ISO 27001 και NIS2, τα τέσσερα building blocks, και το Power BI report, το έχω ήδη καταγράψει αναλυτικά στη σειρά **[Microsoft Secure Score as a Cyber GRC Instrument](/posts/secure-score-grc-part-0-intro/)**. Αν θέλετε τη μεθοδολογία, ξεκινήστε από εκεί. Εδώ κρατάω μόνο ό,τι δεν είχα ξαναγράψει πουθενά: πώς παρουσιάστηκε η ιδέα στο board, τι θα έκανα διαφορετικά αν ξεκινούσα σήμερα, και ένα live demo που δείξαμε αποκλειστικά στο webinar.

## Το σημείο εκκίνησης: η NIS2, όχι το Secure Score

Είμαι CIO και CISO στους Μύλους Κεπενού στην Πάτρα, τη δεύτερη μεγαλύτερη αλευροβιομηχανία στην Ελλάδα, και ως σημαντική (significant) οντότητα υπό τον ελληνικό νόμο 5160/2024 έπρεπε να δείξουμε κάτι συγκεκριμένο: ότι δεν αρκεί να λέμε πως είμαστε ασφαλείς, πρέπει να το αποδεικνύουμε συνεχώς, με τεκμηρίωση, όχι με διαβεβαιώσεις. Αυτό το ρυθμιστικό βάρος, περισσότερο από οποιαδήποτε τεχνική περιέργεια, ήταν η πραγματική αφετηρία του προγράμματος. Το πώς μετατράπηκε αυτή η ανάγκη σε GRC engine μέσα στο ίδιο μας το Microsoft 365 tenant είναι η ιστορία που αφηγούμαι αναλυτικά στη σειρά του blog, εδώ θέλω να μείνω στο κομμάτι που δεν έχει γραφτεί ακόμα πουθενά.

## Τρία slides, μηδέν προϋπολογισμός

Η ερώτηση σταμάτησε να είναι «ποιο εργαλείο GRC να αγοράσουμε» και έγινε «πώς μετατρέπουμε αυτό που ήδη έχουμε σε λειτουργικό GRC πρόγραμμα». Και εδώ ήταν το κομμάτι της στρατηγικής που δεν είχα ξαναμοιραστεί.

Ξέρετε καλά ότι όταν πεις σε ένα διοικητικό συμβούλιο τη φράση «GRC πρόγραμμα», το πρώτο πράγμα που σκέφτονται είναι το κόστος, και δικαιολογημένα, γιατί τα παραδοσιακά GRC εργαλεία έρχονται με δικά τους subscriptions. Η δική μας πρόταση ήταν διαφορετική. Η παρουσίαση στο board είχε μόνο τρία slides:

1. **Το πρόβλημα**: regulatory risk από τη NIS2, που απαιτεί continuous compliance και τεκμηριωμένα security controls.
2. **Η λύση**: χρήση του Microsoft 365 tenant που ήδη πληρώναμε ως μηχανισμό GRC, χωρίς νέο εργαλείο.
3. **Τα αναμενόμενα αποτελέσματα**: μετρήσιμα, τεκμηριωμένα outcomes, με το Secure Score ως βασικό δείκτη προόδου.

Το return on investment ήταν αυτονόητο, αφού ο οργανισμός δεν ξόδεψε ούτε ένα ευρώ παραπάνω. Και η αντίδραση του board ήταν ακριβώς αυτή που περιμένετε: «αν δεν κοστίζει τίποτα, γιατί να μην το κάνουμε». Πήραμε το πράσινο φως, και δώδεκα μήνες αργότερα είχαμε τα νούμερα να τους δείξουμε — από περίπου 30% σε 91,39% Secure Score, με το χρυσό βραβείο στα Cyber Security Awards 2026 να ακολουθεί.

## Τι θα έκανα διαφορετικά αν ξεκινούσα σήμερα

Αν ξεκινούσα από την αρχή, θα ακολουθούσα ένα πιο αυστηρό step-by-step roadmap, ένα βήμα κάθε εβδομάδα, ξεκινώντας πάντα από τα εύκολα recommendations και όχι από τα δύσκολα. Και θα απέφευγα συγκεκριμένα τέσσερα λάθη:

- **Να μην κυνηγήσετε το 100% από την αρχή.** Πολλά recommendations δεν ταιριάζουν σε κάθε περιβάλλον. Άλλο ένα λογιστικό γραφείο, άλλο μια βιομηχανία, άλλο το retail.
- **Να μην υλοποιήσετε τίποτα χωρίς σωστή επικοινωνία.** Οι χρήστες πρέπει να καταλαβαίνουν το γιατί πίσω από κάθε αλλαγή. Ο CISO είναι enabler, όχι αυτός που απλά λέει όχι.
- **Να μην αγνοήσετε το user impact.** Ένα control που οι χρήστες βρίσκουν τρόπο να παρακάμψουν είναι χειρότερο από το να μην υπάρχει καθόλου.
- **Να μη νομίζετε ότι είναι δουλειά μόνο του IT.** Είναι business πρόγραμμα. Χρειάζεται συνεννόηση με HR, legal, operations, ειδικά σε μεγαλύτερους οργανισμούς.

## Το bonus: ζωντανό Power BI dashboard

Κάτι που δεν είχα αναφέρει πριν σε άρθρο, και το έδειξα ζωντανά στο webinar, είναι το Power BI dashboard που χτίσαμε πάνω στα δεδομένα του Secure Score και του Intune. Κάθε μέρα, ανοίγοντας απλά ένα site, βλέπετε δυναμικά τι completed, ποιο score impact έχει το καθένα, ποια devices και users έχουν θέματα, ακόμα και έναν χάρτη με το από πού γίνονται sign-ins. Σε μία περίπτωση είδαμε ζωντανά μια αποτυχημένη προσπάθεια σύνδεσης από τις ΗΠΑ, κλασική περίπτωση που σταματάει το MFA πριν προλάβει να γίνει πρόβλημα.

[![Power BI dashboard με δεδομένα Secure Score και Intune ανά πυλώνα](/images/secure-score-grc-award/secure-score-powerbi-dashboard.png)](/images/secure-score-grc-award/secure-score-powerbi-dashboard.png)
> 📷 **Εικόνα 1: Power BI dashboard πάνω σε δεδομένα Secure Score και Intune, με ανάλυση ανά πυλώνα, completed recommendations και sign-in δεδομένα.**

## Τι άλλαξε μετά το βραβείο

Πέρα από το ίδιο το βραβείο, αυτό που ήρθε μετά ήταν εξίσου ενδιαφέρον: press coverage, ενδιαφέρον από industry publications, πρόσκληση να μιλήσω στο Global Azure, και ένα σχόλιο από γνωστό στη Microsoft ότι είχαμε γίνει «talk of the town» επειδή ένα score πάνω από 90 είναι σπάνιο να το βλέπεις. Είναι δύσκολο να ποσοτικοποιηθεί, αλλά έφερε το credibility που χρειαζόμασταν απέναντι στο board για να συνεχίσουμε να επενδύουμε στο οικοσύστημα Microsoft, συμπεριλαμβανομένου security awareness training για τους χρήστες, που παραμένει το νούμερο ένα firewall σε κάθε οργανισμό σήμερα.

## Θέλετε το πλήρες τεχνικό detail;

Αν σας ενδιαφέρει η μεθοδολογία με screenshots, τη χαρτογράφηση σε ISO 27001:2022 Annex A και NIS2 άρθρο 21, και τα τέσσερα building blocks του προγράμματος, ξεκινήστε από τη σειρά **[Microsoft Secure Score as a Cyber GRC Instrument](/posts/secure-score-grc-part-0-intro/)**. Αυτό εδώ ήταν απλώς η αναφορά της συμμετοχής μου στο live του Χρήστου — το «πίσω από τις κουλίσες» κομμάτι που δεν χωράει σε ένα τεχνικό how-to.

Ευχαριστώ ξανά τον Χρήστο Σπανουγάκη για την πρόσκληση και τη φιλοξενία σε αυτό το webinar. Αν θέλετε να δείτε ολόκληρη τη συζήτηση, με τα Q&A που έγιναν ζωντανά γύρω από αδειοδότηση και licensing στρατηγική, τη βρίσκετε [εδώ](https://www.youtube.com/watch?v=ouciH--n2KI&t=276s), και το [κανάλι Chris Spanougakis MVP](https://www.youtube.com/@Chris_OnTechnology) αξίζει την εγγραφή σας για ό,τι ανεβαίνει στη συνέχεια.

Αν τρέχετε κάτι αντίστοιχο ή σκέφτεστε να ξεκινήσετε, χαίρομαι πάντα να το συζητήσουμε στα σχόλια ή στο LinkedIn.
