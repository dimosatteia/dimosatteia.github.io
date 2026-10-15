---
title: "Homograph attack: Δύο διευθύνσεις που φαίνονται ίδιες, αλλά η μία είναι παγίδα"
seoTitle: "Homograph attack: πώς σε ξεγελά ένα κυριλλικό «а»"
date: 2026-10-15T20:55:00+03:00
lastmod: 2026-10-15T20:55:00+03:00
draft: false
homeHighlight: true
keywords:
  - homograph attack
  - IDN homograph επίθεση
  - κυριλλικοί χαρακτήρες phishing
  - punycode xn-- τι είναι
  - ψεύτικο domain ίδιο με το αληθινό
  - πώς καταλαβαίνω ψεύτικο site
  - impersonation protection Defender for Office 365
  - unusual characters safety tip
  - Edge Website Typo Protection
  - security awareness απάτες
tags:
  - Homograph Attack
  - Phishing
  - Punycode
  - Impersonation
  - Microsoft Defender for Office 365
  - Safe Links
  - Microsoft Edge
  - Attack Simulation Training
  - NIS2
  - ISO 27001
author: "Dimosthenis Atteia"
description: "Τι είναι το homograph attack, πώς ένα κυριλλικό «а» ή ένα ελληνικό «ο» φτιάχνει μια διεύθυνση που δεν ξεχωρίζει από την αληθινή, γιατί το λουκέτο δεν σε προστατεύει, και ποιες ρυθμίσεις του Microsoft 365 σε καλύπτουν."
seoDescription: "Πώς ένα κυριλλικό «а» φτιάχνει ψεύτικο domain ίδιο με το αληθινό, γιατί το λουκέτο δεν βοηθά, και ποιες ρυθμίσεις του Microsoft 365 σε προστατεύουν."
summary: "Δύο διευθύνσεις που δείχνουν ολόιδιες, αλλά η μία έχει ένα γράμμα από άλλο αλφάβητο. Σου εξηγώ πώς δουλεύει το homograph attack, πώς το εντοπίζεις ως χρήστης, και ποιες ρυθμίσεις στο Microsoft Defender for Office 365 και στον Microsoft Edge το σταματούν πριν φτάσει στον χρήστη."
categories: ["Security Awareness", "Email & Collaboration"]
ShowToc: true
TocOpen: false
weight: -6
cover:
  image: "/images/homograph-attack/homograph-attack-cover.webp"
  alt: "Δύο γραμμές διευθύνσεων με το mycompany.gr: η πρώτη με λατινικά γράμματα, η δεύτερη με κυριλλικά с, о, р, а και η πραγματική μορφή xn--"
  caption: "Ίδια διεύθυνση στο μάτι, διαφορετικό domain για τον υπολογιστή"
  maxWidth: 800
ShowReadingTime: true
ShowWordCount: true
# Πλαίσιο «Last verified»: κάθε χαρακτηριστικό με τη φάση, την άδεια, την πηγή και την ημερομηνία ελέγχου
verification:
  - feature: "Impersonation protection (users και domains) στα anti-phishing policies"
    status: "Generally Available"
    license: "Microsoft Defender for Office 365 Plan 1 ή Plan 2"
    source: "https://learn.microsoft.com/en-us/defender-office-365/anti-phishing-policies-about"
    verified: 2026-10-15
  - feature: "Show user impersonation unusual characters safety tip (EnableUnusualCharactersSafetyTips)"
    status: "Generally Available"
    license: "Microsoft Defender for Office 365 Plan 1 ή Plan 2"
    source: "https://learn.microsoft.com/en-us/defender-office-365/anti-phishing-policies-mdo-configure"
    verified: 2026-10-15
  - feature: "Safe Links (έλεγχος τη στιγμή του κλικ)"
    status: "Generally Available"
    license: "Microsoft Defender for Office 365 Plan 1 ή Plan 2"
    source: "https://learn.microsoft.com/en-us/defender-office-365/safe-links-about"
    verified: 2026-10-15
  - feature: "Edge Website Typo Protection (TyposquattingCheckerEnabled, PreventTyposquattingPromptOverride)"
    status: "Generally Available"
    license: "Χωρίς επιπλέον άδεια (Microsoft Edge)"
    source: "https://learn.microsoft.com/en-us/deployedge/microsoft-edge-policies/typosquattingcheckerenabled"
    verified: 2026-10-15
  - feature: "Attack simulation training"
    status: "Generally Available"
    license: "Microsoft Defender for Office 365 Plan 2"
    source: "https://learn.microsoft.com/en-us/defender-office-365/attack-simulation-training-get-started"
    verified: 2026-10-15
  - feature: "Advanced hunting: πίνακας EmailUrlInfo (στήλη UrlDomain)"
    status: "Generally Available"
    license: "Microsoft Defender for Office 365 Plan 2"
    source: "https://learn.microsoft.com/en-us/defender-xdr/advanced-hunting-emailurlinfo-table"
    verified: 2026-10-15
---

Κοίτα αυτές τις δύο διευθύνσεις:

`mycompany.gr`
`myсоmраny.gr`

Αν σου πω ότι η δεύτερη είναι ψεύτικη, θα ψάξεις για κάποιο ορθογραφικό λάθος. Δεν θα βρεις. Τα γράμματα είναι ίδια στο μάτι. Η διαφορά είναι ότι τέσσερα από αυτά, τα «с», «о», «р» και «а», δεν είναι λατινικά. Είναι κυριλλικά.

Για εσένα είναι η ίδια λέξη. Για τον υπολογιστή είναι δύο εντελώς διαφορετικά domains, που μπορεί να ανήκουν σε δύο εντελώς διαφορετικούς ανθρώπους. Αυτό λέγεται **homograph attack**, και είναι το πρώτο θέμα της νέας κατηγορίας [Security Awareness](/categories/security-awareness/), όπου θα γράφω για απάτες που στοχεύουν τον χρήστη και όχι το σύστημα.

## Τι είναι το homograph attack

Κάθε γράμμα που βλέπεις στην οθόνη έχει πίσω του έναν αριθμό στο πρότυπο Unicode. Το λατινικό «a» είναι το `U+0061`. Το κυριλλικό «а» είναι το `U+0430`. Στις περισσότερες γραμματοσειρές σχεδιάζονται ακριβώς το ίδιο.

Από το 2003 τα domains μπορούν να περιέχουν χαρακτήρες εκτός του λατινικού αλφαβήτου. Αυτό λέγεται IDN (Internationalized Domain Names) και είναι χρήσιμο: επιτρέπει σε έναν Έλληνα να έχει domain με ελληνικά γράμματα. Ανοίγει όμως και μια πόρτα. Αν μπορείς να γράψεις domain με κυριλλικά, μπορείς να γράψεις και ένα domain που μοιάζει γράμμα προς γράμμα με ένα γνωστό λατινικό.

Το πιο γνωστό παράδειγμα είναι από το 2017. Ένας ερευνητής κατοχύρωσε το `аррӏе.com`, γραμμένο ολόκληρο με κυριλλικά, και έδειξε ότι οι browsers της εποχής το εμφάνιζαν σαν το αληθινό `apple.com`. Οι browsers άλλαξαν συμπεριφορά μετά από αυτό, αλλά η τεχνική δεν εξαφανίστηκε. Απλώς μετακόμισε εκεί όπου δεν υπάρχει browser να σε προστατέψει.

Και κάτι που αφορά εμάς ειδικά: το ελληνικό αλφάβητο είναι κι αυτό πηγή τέτοιων χαρακτήρων. Το ελληνικό «ο» (`U+03BF`), το «α» και το κεφαλαίο «Α», «Ε», «Ο», «Τ» μοιάζουν με τα λατινικά. Ένας επιτιθέμενος δεν χρειάζεται αποκλειστικά τα κυριλλικά.

## Γιατί το λουκέτο δεν σε σώζει

Οι περισσότεροι έχουμε μάθει έναν κανόνα: «αν έχει λουκέτο, είναι ασφαλές». Αυτός ο κανόνας εδώ δεν ισχύει.

Το λουκέτο σημαίνει μόνο ότι η σύνδεση προς το site είναι κρυπτογραφημένη και ότι το πιστοποιητικό εκδόθηκε για αυτό το domain. Δεν λέει τίποτα για το ποιος είναι πίσω από το domain. Ο επιτιθέμενος κατοχυρώνει το `myсоmраny.gr` νόμιμα, παίρνει δωρεάν πιστοποιητικό μέσα σε λίγα λεπτά, και το site του δείχνει το ίδιο λουκέτο με το δικό σου.

Το ίδιο ισχύει και για το email. Επειδή το ψεύτικο domain είναι πραγματικό και κατοχυρωμένο, ο επιτιθέμενος μπορεί να στήσει SPF, DKIM και DMARC κανονικά. Τα μηνύματά του περνούν τον έλεγχο αυθεντικότητας. Η Microsoft το γράφει καθαρά στην τεκμηρίωσή της: το impersonation μπορεί να περάσει τους ελέγχους SPF, DKIM και DMARC, γιατί ο επιτιθέμενος έχει δημιουργήσει domain που μοιάζει με το αληθινό και έχει δημοσιεύσει έγκυρες εγγραφές DNS.

## Τι βλέπει πραγματικά ο υπολογιστής: Punycode

Το DNS δεν καταλαβαίνει κυριλλικά ή ελληνικά. Γι' αυτό κάθε IDN μετατρέπεται σε μια λατινική μορφή που ξεκινά με `xn--`. Αυτή η μορφή λέγεται **Punycode**.

| Τι βλέπεις | Τι είναι στην πραγματικότητα |
|---|---|
| `mycompany.gr` (λατινικά) | `mycompany.gr` |
| `myсоmраny.gr` (με κυριλλικά с, о, р, а) | `xn--mymny-6ve0hrag.gr` |
| `аmazon.com` (με κυριλλικό а) | `xn--mazon-3ve.com` |

Οι σύγχρονοι browsers, όπως ο Microsoft Edge και ο Chrome, συχνά δείχνουν τη μορφή `xn--` στη γραμμή διευθύνσεων όταν ένα domain ανακατεύει αλφάβητα με ύποπτο τρόπο. Αυτό είναι καλό, αλλά δεν είναι πλήρης άμυνα. Το link φτάνει σε σένα πολύ πριν τη γραμμή διευθύνσεων: μέσα σε ένα email, σε ένα SMS, σε ένα μήνυμα στο Teams ή στο Viber, σε ένα PDF ή σε ένα QR code. Σε όλα αυτά το κείμενο εμφανίζεται όπως το έγραψε ο επιτιθέμενος.

## Πώς το καταλαβαίνεις ως χρήστης

Ας είμαστε ειλικρινείς: με το μάτι, δεν το καταλαβαίνεις. Γι' αυτό οι συμβουλές που δουλεύουν είναι αυτές που δεν βασίζονται στο να «προσέξεις καλύτερα».

**Μην μπαίνεις σε σημαντικά sites από link.** Για την τράπεζα, το webmail, την πλατφόρμα πληρωμών ή το Microsoft 365, χρησιμοποίησε αγαπημένα (bookmarks) ή γράψε τη διεύθυνση μόνος σου. Έτσι το ψεύτικο domain δεν έχει πώς να μπει στη διαδρομή.

**Άφησε τον password manager να αποφασίσει.** Ο password manager συμπληρώνει τον κωδικό μόνο στο ακριβές domain για το οποίο τον αποθήκευσες. Στο `myсоmраny.gr` δεν θα προτείνει τίποτα. Αν κάποια στιγμή ο password manager «δεν βρίσκει» τον κωδικό σε ένα site που μπαίνεις κάθε μέρα, σταμάτα. Μην τον αντιγράψεις χειροκίνητα.

**Χρησιμοποίησε passkeys όπου μπορείς.** Ένα passkey είναι δεμένο στο αληθινό domain. Δεν λειτουργεί σε ψεύτικο, όσο κι αν του μοιάζει. Αυτός είναι ο λόγος που το phishing-resistant MFA κλείνει αυτό το κενό εκεί όπου ο άνθρωπος δεν μπορεί.

**Κοίτα για `xn--`.** Αν δεις αυτό το πρόθεμα στη γραμμή διευθύνσεων ενός site που υποτίθεται ότι είναι γνωστό διεθνές brand, φύγε.

**Αν κάτι σου φαίνεται περίεργο, ανέφερέ το.** Στο Outlook υπάρχει το κουμπί Report. Μία αναφορά από έναν χρήστη μπορεί να προστατέψει όλο τον οργανισμό.

## Πώς σε προστατεύει το Microsoft 365

Εδώ είναι το κομμάτι για εσένα που διαχειρίζεσαι το tenant. Ο χρήστης είναι η τελευταία γραμμή άμυνας. Ο στόχος είναι το μήνυμα να μη φτάσει ποτέ σε αυτόν.

### Impersonation protection στο Microsoft Defender for Office 365

Τα anti-phishing policies που έχει κάθε mailbox στο Microsoft 365 κάνουν έλεγχο για spoofing, δηλαδή πλαστογραφημένο αποστολέα. Δεν κάνουν έλεγχο για impersonation, δηλαδή για domain που μοιάζει με το δικό σου. Αυτό υπάρχει μόνο στο Microsoft Defender for Office 365 (Plan 1 ή Plan 2).

Στο Defender portal πήγαινε **Email & collaboration > Policies & rules > Threat policies > Anti-phishing** και, στο policy σου, ενεργοποίησε:

- **Enable domains to protect**, με επιλεγμένο το **Include the domains I own**. Στο **Include custom domains** πρόσθεσε τα domains των βασικών συνεργατών σου (τράπεζα, λογιστής, κρίσιμοι προμηθευτές). Χωράνε έως 50 ανά policy.
- **Enable users to protect**, για τους ρόλους που είναι συνηθισμένος στόχος (CEO, CFO, οικονομική υπηρεσία).
- **Enable mailbox intelligence** και **Enable intelligence for impersonation protection**.

Στην ενότητα **Safety tips & indicators** υπάρχει μια ρύθμιση που ταιριάζει ακριβώς σε αυτό το άρθρο: **Show user impersonation unusual characters safety tip** (`EnableUnusualCharactersSafetyTips`). Όταν η διεύθυνση του αποστολέα περιέχει ασυνήθιστα σύνολα χαρακτήρων, ο χρήστης βλέπει προειδοποίηση ότι η διεύθυνση περιέχει απρόσμενα γράμματα ή αριθμούς και ότι δεν πρέπει να αλληλεπιδράσει με το μήνυμα. Στο default policy είναι κλειστή. Στα Standard και Strict preset security policies είναι ανοιχτή.

Αν δεν θέλεις να στήσεις τα policies χειροκίνητα, το πιο γρήγορο βήμα είναι να βάλεις τους χρήστες σου στο **Standard preset security policy**. Τα αναλύω με περισσότερες λεπτομέρειες στο άρθρο [Microsoft Defender for Office 365: Από τις preset policies στην προχωρημένη παραμετροποίηση](/posts/microsoft-defender-up-close-series/microsoft-defender-for-office-365-deep-dive/).

### Safe Links: έλεγχος τη στιγμή του κλικ

Ένα ψεύτικο domain μπορεί να είναι «καθαρό» την ώρα που φτάνει το email και να γίνει κακόβουλο μία ώρα αργότερα. Το Safe Links ελέγχει το URL τη στιγμή που ο χρήστης κάνει κλικ, όχι μόνο την ώρα της παράδοσης, σε email, Teams και εφαρμογές Office. Κράτα ανοιχτό το **Apply real-time URL scanning for suspicious links** και το **Wait for URL scanning to complete before delivering the message**, και κλείσε το **Let users click through to the original URL**.

### Microsoft Edge: Website Typo Protection

Ο Edge έχει ενσωματωμένη προστασία που προειδοποιεί όταν ο χρήστης πάει σε διεύθυνση που μοιάζει με λανθασμένη πληκτρολόγηση γνωστού site. Δεν είναι ειδικό εργαλείο για homographs, αλλά καλύπτει τη συγγενική τεχνική του typosquatting. Με Intune ή Group Policy ρύθμισε:

- `TyposquattingCheckerEnabled` = Enabled, ώστε ο χρήστης να μην μπορεί να την κλείσει.
- `PreventTyposquattingPromptOverride` = Enabled, ώστε ο χρήστης να μην μπορεί να προσπεράσει την προειδοποίηση.

Μαζί με το Microsoft Defender SmartScreen ενεργό, ο Edge γίνεται ένα επιπλέον φίλτρο για ό,τι ξεφύγει από το email.

### Attack simulation training: εκπαίδευση με πραγματικό σενάριο

Το Attack simulation training στο Microsoft Defender for Office 365 Plan 2 σου επιτρέπει να στείλεις στους χρήστες σου ελεγχόμενες προσομοιώσεις phishing και να τους αναθέσεις εκπαιδευτικές ενότητες. Ένα σενάριο με αποστολέα από domain που μοιάζει με το δικό σας είναι από τα πιο διδακτικά που μπορείς να τρέξεις. Οι αναφορές του (ποιος έκανε κλικ, ποιος έδωσε κωδικό, ποιος το ανέφερε) είναι και τεκμήριο για τον έλεγχο συμμόρφωσης.

### Κυνήγι με KQL: ποια emails έφεραν domains σε Punycode

Αν έχεις Microsoft Defender for Office 365 Plan 2, στο Advanced hunting μπορείς να δεις ποια URLs σε εισερχόμενα emails έχουν domain σε μορφή `xn--`:

```kql
EmailUrlInfo
| where Timestamp > ago(30d)
| where UrlDomain has "xn--"
| join kind=inner (
    EmailEvents
    | where Timestamp > ago(30d)
    | where EmailDirection == "Inbound"
    | project NetworkMessageId, SenderFromAddress, RecipientEmailAddress, Subject, DeliveryAction
  ) on NetworkMessageId
| project Timestamp, UrlDomain, Url, SenderFromAddress, RecipientEmailAddress, Subject, DeliveryAction
| order by Timestamp desc
```

Δεν σημαίνει κάθε αποτέλεσμα επίθεση. Υπάρχουν νόμιμα domains με ελληνικούς ή άλλους χαρακτήρες. Αν όμως δεις `xn--` που μεταφράζεται σε κάτι που μοιάζει με το δικό σου domain ή με γνωστό brand, έχεις βρει ακριβώς αυτό που ψάχνεις. Για έτοιμα, ελεγμένα queries ανά απαίτηση της ΚΥΑ 1689/2025, δες τη [Βιβλιοθήκη KQL](/kql/).

Για να ελέγξεις αν το δικό σου domain έχει σωστά SPF, DKIM και DMARC, ώστε τουλάχιστον το spoofing του αληθινού domain να μην περνάει, δοκίμασε τον [Έλεγχο domain](/elegxos-domain/).

## Η οπτική της συμμόρφωσης

Το homograph attack δεν είναι μόνο τεχνικό θέμα. Αγγίζει δύο υποχρεώσεις που ελέγχονται σε κάθε audit: το φιλτράρισμα του email και την εκπαίδευση του προσωπικού.

**ΚΥΑ 1689/2025.** Η απαίτηση [20.γ](/kya-1689-2025/#20-γ) ζητά φιλτράρισμα και έλεγχο των μηνυμάτων ηλεκτρονικού ταχυδρομείου για κακόβουλα ή ανεπιθύμητα μηνύματα. Το impersonation protection και το Safe Links είναι το τεχνικό μέτρο. Η απαίτηση [21.α](/kya-1689-2025/#21-α) ζητά περιοδικά προγράμματα εκπαίδευσης και ευαισθητοποίησης για όλο το προσωπικό και τη διοίκηση. Ένα άρθρο σαν αυτό, μαζί με μια προσομοίωση στο Attack simulation training, είναι υλικό και τεκμήριο μαζί. Δες όλες τις απαιτήσεις στον [οδηγό της ΚΥΑ 1689/2025](/kya-1689-2025/).

**Οδηγία NIS2.** Το άρθρο [21.2.ζ](/nis2/#21-2-ζ) της Οδηγίας ζητά βασικές πρακτικές κυβερνοϋγιεινής και κατάρτιση στην κυβερνοασφάλεια. Δες τον [οδηγό της Οδηγίας NIS2](/nis2/).

**ISO/IEC 27001:2022.** Το control [A.6.3](/iso-27001/#A-6-3) (Information security awareness, education and training) καλύπτει την εκπαίδευση. Το [A.8.23](/iso-27001/#A-8-23) (Web filtering) καλύπτει το Safe Links και το Website Typo Protection του Edge. Δες τον [οδηγό του ISO/IEC 27001](/iso-27001/).

**GDPR.** Ένας κωδικός που χάνεται σε ψεύτικο site είναι συχνά η αρχή μιας παραβίασης δεδομένων. Το άρθρο [32.1.β](/gdpr/#32-1-β) ζητά τη δυνατότητα διασφάλισης του απορρήτου και της ακεραιότητας των συστημάτων. Δες τον [οδηγό του GDPR](/gdpr/).

Αν θέλεις να καταγράψεις την κατάσταση του οργανισμού σου, κατέβασε τα checklists: [ΚΥΑ 1689/2025](/downloads/nis2-kya-1689-2025-microsoft-365-checklist.xlsx), [Οδηγία NIS2](/downloads/nis2-directive-2022-2555-microsoft-365-checklist.xlsx), [ISO/IEC 27001](/downloads/iso-27001-2022-annex-a-microsoft-365-checklist.xlsx) και [GDPR](/downloads/gdpr-2016-679-microsoft-365-checklist.xlsx).

## Το συμπέρασμα

Το homograph attack δουλεύει επειδή στοχεύει κάτι που δεν διορθώνεται με εκπαίδευση: το ανθρώπινο μάτι δεν ξεχωρίζει το λατινικό «a» από το κυριλλικό «а». Γι' αυτό η άμυνα έχει δύο επίπεδα.

Ο χρήστης μαθαίνει συνήθειες που δεν εξαρτώνται από το μάτι: bookmarks, password manager, passkeys, αναφορά. Ο διαχειριστής ενεργοποιεί τις ρυθμίσεις που κάνουν τον έλεγχο αντί για τον χρήστη: impersonation protection, το safety tip για ασυνήθιστους χαρακτήρες, Safe Links και Website Typo Protection.

Αν έχεις Microsoft Defender for Office 365 και δεν έχεις ενεργοποιήσει ακόμα το impersonation protection, ξεκίνα από εκεί. Είναι λίγα κλικ και κλείνει ένα κενό που κανένα λουκέτο δεν κλείνει.

## Πηγές και επαλήθευση {#last-verified}

{{< verification >}}
