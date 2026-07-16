---
title: "Τέλος στα SMS/Voice MFA: Η Microsoft κάνει τα Passkeys default στο Entra ID"
date: 2026-07-16T10:00:00+03:00
lastmod: 2026-07-16T10:48:00+03:00
draft: false
keywords:
  - Microsoft Entra ID
  - Passkeys
  - FIDO2
  - SMS MFA retirement
  - Voice MFA retirement
  - Entra passkeys default
  - phishing-resistant authentication
  - Microsoft Authenticator passkey
  - Windows Hello for Business
  - Authentication Methods Policy
  - Registration Campaign Entra
  - Microsoft Security Store telecom
  - passwordless authentication Microsoft 365
  - AiTM phishing protection
  - SIM swap attack MFA
  - Entra ID authentication methods 2026
  - ISO 27001 access control passkeys
  - NIS2 multi-factor authentication
  - Conditional Access passkeys
  - Microsoft 365 Security
tags: 
  - Microsoft Entra ID
  - MFA
  - Passkeys
  - FIDO2
  - Identity Security
  - Microsoft 365 Security
  - Multi-Factor Authentication
  - Passwordless Authentication
  - Zero Trust
  - Phishing-Resistant Authentication
  - Conditional Access
  - GRC
  - NIS2
  - ISO 27001
author: "Dimosthenis Atteia"
description: "Από 01/09/2026 τα passkeys γίνονται η προεπιλεγμένη μέθοδος ελέγχου ταυτότητας στο Microsoft Entra ID, και από 01/02/2027 αποσύρεται η SMS/Voice αυθεντικοποίηση που παρέχει η ίδια η Microsoft. Τι πρέπει να ξέρετε και τι να ετοιμάσετε από τώρα."
summary:
categories: ["Microsoft 365 Security Insights"]
ShowToc: true
TocOpen: false
cover:
  image: "images/mfasms-killing-sms.png"
  alt: "Microsoft is killing SMS authentication - Passkeys are taking over"
  caption: "Το χρονοδιάγραμμα απόσυρσης SMS/Voice MFA στο Microsoft Entra ID"
---

Θα το πω απλά, όπως θα το έλεγα σε έναν συνάδελφο μπροστά σε έναν καφέ: αν ακόμα έχετε χρήστες στο tenant σας που κάνουν MFA με SMS ή με τηλεφωνική κλήση, έχετε ακριβώς έναν χρόνο και κάτι να τους μετακομίσετε αλλού. Η Microsoft το ανακοίνωσε επίσημα και αυτή τη φορά δεν είναι απλά ένα «recommendation» σε κάποιο Ignite session. Είναι ημερομηνίες, με ρολόι που ήδη μετράει αντίστροφα.

## Τι αλλάζει, με λίγα λόγια

Δύο πράγματα συμβαίνουν παράλληλα, και καλό είναι να τα ξεχωρίσουμε γιατί μπερδεύονται εύκολα:

1. Τα **passkeys γίνονται η προεπιλεγμένη εμπειρία σύνδεσης** στο Microsoft Entra ID.
2. Η **SMS/Voice αυθεντικοποίηση που παρέχεται από την ίδια τη Microsoft** (native telecom delivery) αποσύρεται.

Δεν είναι το ίδιο πράγμα, αλλά είναι άρρηκτα συνδεδεμένα, γιατί το ένα σπρώχνει το άλλο.

## Το χρονοδιάγραμμα που πρέπει να έχετε στο ημερολόγιό σας

- **1 Σεπτεμβρίου 2026:** Όσοι χρήστες έχουν ενεργοποιημένο SMS ή Voice ως μέθοδο MFA, μπαίνουν αυτόματα σε passkey profile στο Authentication Methods Policy. Το Registration Campaign περνάει σε Microsoft Managed κατάσταση με στόχευση passkeys, οπότε στην επόμενη σύνδεσή τους θα αρχίσουν να βλέπουν το γνωστό nudge «θέλεις να καταχωρήσεις passkey;». Το nudge αυτό, από προεπιλογή, μπορεί να «κοιμηθεί» (snooze) απεριόριστες φορές, άρα μην περιμένετε ότι θα λύσει μόνο του το πρόβλημα.
- **1 Φεβρουαρίου 2027:** Η SMS/Voice παράδοση μέσω Microsoft αποσύρεται πλήρως. Αν κάποιος χρήστης έχει ως *μοναδική* διαθέσιμη μέθοδο MFA το SMS ή το Voice, θα δει blocking prompt: δεν θα μπορεί να προσπεράσει την εγγραφή passkey, θα πρέπει να την ολοκληρώσει για να συνεχίσει να μπαίνει στον λογαριασμό του. Και το σημειώνω γιατί η Microsoft το τονίζει ρητά στο άρθρο: **δεν υπάρχει opt-out** για αυτή την ημερομηνία, ισχύει για όλα τα tenants χωρίς εξαίρεση.

Ανάμεσα στις δύο ημερομηνίες θα υπάρχει ένα προσωρινό opt-out (API support από 1η Αυγούστου 2026) για όσους χρειάζονται λίγο παραπάνω χρόνο να οργανωθούν, αλλά αυτό ισχύει μόνο μέχρι τον Φεβρουάριο του 2027, όχι μετά.

## Και όσοι έχουν πραγματική ανάγκη για SMS/Voice;

Εδώ υπάρχει διαφυγή, και είναι σημαντικό να το εξηγήσουμε σωστά στα στελέχη που θα ρωτήσουν «τι γίνεται με τους χρήστες που δεν έχουν smartphone ή δεν μπορούν να χρησιμοποιήσουν passkey». Η Microsoft δεν σβήνει εντελώς τη δυνατότητα SMS/Voice, τη μεταφέρει σε **customer-managed telecom providers μέσω του Microsoft Security Store**. Πρακτικά, θα συμβάλλεστε απευθείας με έναν πάροχο τηλεπικοινωνιών που θα διαλέξετε εσείς, με δικό σας κόστος ανά μήνυμα/κλήση, ώστε να έχετε περιφερειακό έλεγχο και συμμόρφωση με τοπικές απαιτήσεις. Οι λεπτομέρειες αναμένονται από τις 18 Σεπτεμβρίου 2026, με δυνατότητα επιλογής παρόχου από 30 Οκτωβρίου 2026.

Αν δουλεύετε σε ρυθμιζόμενο κλάδο (τράπεζες, ενέργεια, βιομηχανία με ΝΙS2 απαιτήσεις κ.ο.κ.) και έχετε συγκεκριμένο κανονιστικό ή επιχειρησιακό λόγο να κρατήσετε out-of-band SMS για κάποιο user segment, αυτό είναι το μονοπάτι σας. Για όλους τους υπόλοιπους, η σύσταση της Microsoft είναι ξεκάθαρη: passkeys by default.

## Γιατί το κάνει η Microsoft, και γιατί έχει δίκιο

Το SMS και το Voice MFA είναι από τις πιο ευάλωτες μεθόδους που κυκλοφορούν σήμερα: SIM-swap, social engineering στο call center του τηλεπικοινωνιακού πάροχου, real-time phishing proxies (AiTM) που περνάνε OTP σαν να μην υπάρχει τίποτα ανάμεσα. Τα passkeys, αντίθετα, βασίζονται σε κρυπτογραφικά κλειδιά δεμένα με τη συσκευή ή με synced credential store (π.χ. iCloud Keychain, Google Password Manager), και είναι εγγενώς ανθεκτικά σε phishing, replay και SIM-swap επιθέσεις. Αν έχετε παρακολουθήσει έστω και ένα incident με AiTM phishing kit τα τελευταία δύο χρόνια, δεν χρειάζεται να σας πείσω παραπάνω.

## Τι να κάνετε από σήμερα, μια ρεαλιστική λίστα

Δεν χρειάζεται πανικός, χρειάζεται πλάνο. Κι επειδή το ξέρω ότι πολλοί από εσάς έχετε ήδη γεμάτο backlog, εδώ είναι η σειρά που θα ακολουθούσα εγώ:

**Πρώτα, μετρήστε.** Τρέξτε το [PowerShell script](https://github.com/microsoft/entra-sms-voice-usage-analyzer) που δίνει η ίδια η Microsoft για να εντοπίσετε ποιοι χρήστες έχουν ενεργό SMS ή Voice MFA. Χρειάζεστε ρόλο Global Reader, Authentication Policy Administrator ή Security Reader. Αν το αποτέλεσμα είναι μη μηδενικό, είστε εντός πεδίου εφαρμογής, και το πιθανότερο είναι ότι είστε.

**Μετά, οργανώστε ομάδα-στόχο.** Φτιάξτε ένα security group με τους χρήστες SMS/Voice, ώστε το registration campaign και οι επικοινωνίες σας να στοχεύουν συγκεκριμένα σε αυτούς και όχι σε όλο τον οργανισμό αδιακρίτως.

**Ενεργοποιήστε passkeys νωρίς, με δικούς σας όρους.** Μην αφήσετε τη Microsoft να το κάνει αυτόματα την 1η Σεπτεμβρίου χωρίς να έχετε προηγηθεί. Ενεργοποιήστε το registration campaign σε Protection > Authentication methods > Registration campaign, με στόχευση στο group που φτιάξατε, ώστε να ελέγχετε εσείς τον ρυθμό και το μήνυμα.

**Επικοινωνήστε νωρίς και σε φάσεις.** Η Microsoft προτείνει τρία βήματα (awareness, action, reminder) και συμφωνώ απόλυτα. Οι χρήστες δεν αγαπούν τις αλλαγές στο login τους χωρίς προειδοποίηση, ειδικά όταν πρόκειται για κάτι που αγγίζει καθημερινά. Υπάρχουν έτοιμα [templates επικοινωνίας](https://aka.ms/mfatemplates) από τη Microsoft για email, Teams κ.λπ.

**Αν έχετε πραγματική ανάγκη SMS/Voice, ξεκινήστε την τεκμηρίωση τώρα.** Καταγράψτε ποιο κανονιστικό πλαίσιο ή ποιο operational gap σας υποχρεώνει να κρατήσετε out-of-band τηλεφωνική επαλήθευση, ώστε να είστε έτοιμοι να αξιολογήσετε παρόχους μόλις ανοίξει το Security Store τον Σεπτέμβριο.

**Μην ξεχάσετε το SSPR.** Η απόσυρση αφορά και το self-service password reset, όχι μόνο το sign-in MFA, κάτι που συχνά ξεφεύγει στον πρώτο γύρο σχεδιασμού.

## Μια σκέψη για το GRC κομμάτι

Αν κάνετε ό,τι κάνω κι εγώ (δηλαδή χαρτογραφείτε ελέγχους σε ISO 27001, NIST CSF ή ΝΙS2 πλαίσια) αυτή η αλλαγή είναι μια καλή ευκαιρία να ενημερώσετε τις πολιτικές σας για Authentication/Access Control (π.χ. Α.5.17, Α.8.5 στο ISO 27001:2022) ώστε να αναφέρουν ρητά passkeys/FIDO2 ως προτεινόμενη ή υποχρεωτική μέθοδο MFA, και να αποτυπώσετε το SMS/Voice ως legacy/υπό απόσυρση μέθοδο με ημερομηνία λήξης. Ένα μικρό update στο risk register σήμερα γλιτώνει πολλή δουλειά τον Ιανουάριο του 2027, όταν όλοι θα τρέχουν ταυτόχρονα.

## Το συμπέρασμα

Η μετάβαση σε passkeys δεν είναι πια «κάτι που θα δούμε του χρόνου». Έχει ημερομηνίες, έχει blocking behavior χωρίς opt-out, και έχει άμεση σχέση με τη θωράκιση απέναντι σε phishing-resistant απαιτήσεις που όλο και περισσότερα regulatory frameworks επιβάλλουν. Αν είστε στη θέση του administrator ή του security lead, ξεκινήστε τη μέτρηση των χρηστών σας τώρα, δεν κοστίζει τίποτα, και σας δίνει τον χρόνο να σχεδιάσετε αντί να αντιδράσετε.

Αν θέλετε να μοιραστείτε πώς το χειρίζεστε στο δικό σας tenant, ή αν έχετε ήδη ξεκινήσει registration campaign, θα χαρώ πολύ να το συζητήσουμε.

---

*Πηγή: [Passkeys by default and retirement of Microsoft-provided SMS and voice authentication - Microsoft Learn](https://learn.microsoft.com/en-us/entra/identity/authentication/concept-sms-voice-retirement)*
