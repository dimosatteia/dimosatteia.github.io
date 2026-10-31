---
title: "Γιατί πήγε στα Junk; Ανάλυση email headers του Microsoft 365 στα Ελληνικά"
date: 2026-10-30T17:30:00+02:00
lastmod: 2026-10-31T13:00:00+02:00
draft: false
url: "/giati-pige-sta-junk/"
slug: giati-pige-sta-junk
# Το link στο μενού ορίζεται εδώ, ώστε να εμφανίζεται μόνο όταν η σελίδα είναι δημοσιευμένη.
menu:
  main:
    identifier: tool-junk
    parent: tools
    name: "📬 Γιατί πήγε στα Junk;"
    weight: 13
author: "Dimosthenis Atteia"
description: "Δωρεάν εργαλείο: επικόλλησε τα headers ενός email και δες στα Ελληνικά τι αποφάσισε το Microsoft 365 και γιατί, αν ο αποστολέας ταυτοποιήθηκε, από πού πέρασε το μήνυμα και τι κάνεις τώρα. Τα headers δεν φεύγουν από τον browser σου."
seoTitle: "Γιατί πήγε στα Junk; Ανάλυση email headers Microsoft 365"
seoDescription: "Επικόλλησε τα headers ενός email και δες στα Ελληνικά γιατί το Microsoft 365 το έστειλε στα Junk ή στην καραντίνα και τι κάνεις τώρα. Όλα στον browser σου."
toolBlurb: "Επικόλλησε τους headers ενός email και δες στα Ελληνικά τι αποφάσισε το Microsoft 365 και γιατί, αν ο αποστολέας ταυτοποιήθηκε, από πού πέρασε το μήνυμα και τι κάνεις τώρα, με αναφορά .pdf για το ticket. Τα headers δεν φεύγουν από τον browser σου."
keywords:
  - γιατί πήγε στα Junk
  - ανάλυση email headers
  - X-Forefront-Antispam-Report
  - Authentication-Results compauth
  - SFV CAT BCL Microsoft 365
  - Exchange Online Protection headers
  - Microsoft Defender for Office 365 false positive
  - email header analyzer Ελληνικά
showToc: true
junkGauge: true
ShowReadingTime: false
ShowBreadCrumbs: false
hideMeta: true
cover:
  image: "/images/tools/giati-pige-sta-junk.webp"
  alt: "Τα headers ενός email αναλύονται: το Microsoft 365 το χαρακτήρισε spoof επειδή απέτυχε το DMARC, με τα επόμενα βήματα και την αντιστοίχιση στην ΚΥΑ 1689/2025 και στο ISO 27001"
  maxWidth: 800
categories: ["Email & Collaboration"]
tags:
  - Email Security
  - Exchange Online
  - Microsoft Defender for Office 365
  - Microsoft 365 Security
  - ΚΥΑ 1689/2025
  - NIS2
  - ISO 27001
  - GDPR
# MITRE ATT&CK®: ονόματα στο data/mitre.yaml
mitre: ["T1566", "T1684.002", "M1049", "M1054"]
# Πλαίσιο «Last verified»
verification:
  - feature: "Πεδία X-Forefront-Antispam-Report (CAT, SFV, IPV, SRV, SFTY, DIR, CIP, CTRY, PTR) και X-Microsoft-Antispam (BCL)"
    status: "Generally Available"
    license: "Όλοι οι οργανισμοί με cloud mailboxes (Exchange Online Protection)"
    source: "https://learn.microsoft.com/en-us/defender-office-365/message-headers-eop-mdo"
    verified: 2026-10-30
  - feature: "Authentication-Results: spf, dkim, dmarc, action, compauth και οι κωδικοί reason"
    status: "Generally Available"
    license: "Όλοι οι οργανισμοί με cloud mailboxes (Exchange Online Protection)"
    source: "https://learn.microsoft.com/en-us/defender-office-365/message-headers-eop-mdo#authentication-results-message-header"
    verified: 2026-10-30
  - feature: "Ποιο component φιλτράρισε το μήνυμα, από το SFV και το X-CustomSpam, και τι δεν παρακάμπτεται ποτέ (malware, high confidence phishing)"
    status: "Generally Available"
    license: "Όλοι οι οργανισμοί με cloud mailboxes (Exchange Online Protection)"
    source: "https://learn.microsoft.com/en-us/defender-office-365/anti-spam-policies-troubleshooting"
    verified: 2026-10-30
  - feature: "Στο cloud το SCL δεν καθορίζει την κρίση ούτε την ενέργεια· η κρίση διαβάζεται από τα CAT και DIR"
    status: "Generally Available"
    license: "Όλοι οι οργανισμοί με cloud mailboxes (Exchange Online Protection)"
    source: "https://learn.microsoft.com/en-us/defender-office-365/anti-spam-spam-confidence-level-scl-about"
    verified: 2026-10-30
  - feature: "BCL: όρια 7 (default policy), 6 (Standard preset), 5 (Strict preset) και Bulk moves enabled προς τον φάκελο Promotions"
    status: "Generally Available"
    license: "Όλοι οι οργανισμοί με cloud mailboxes (Exchange Online Protection)"
    source: "https://learn.microsoft.com/en-us/defender-office-365/anti-spam-bulk-complaint-level-bcl-about"
    verified: 2026-10-30
  - feature: "Ρυθμίσεις Advanced Spam Filter και οι τιμές X-CustomSpam"
    status: "Generally Available"
    license: "Όλοι οι οργανισμοί με cloud mailboxes (Exchange Online Protection)"
    source: "https://learn.microsoft.com/en-us/defender-office-365/anti-spam-policies-asf-settings-about"
    verified: 2026-10-30
  - feature: "Προεπιλεγμένες ενέργειες ανά κρίση (Spam, High confidence spam, Phishing, High confidence phishing, Bulk)"
    status: "Generally Available"
    license: "Όλοι οι οργανισμοί με cloud mailboxes (Exchange Online Protection)"
    source: "https://learn.microsoft.com/en-us/defender-office-365/anti-spam-protection-about#actions-in-anti-spam-policies"
    verified: 2026-10-30
  - feature: "Impersonation (UIMP, DIMP, GIMP, BIMP) και Safe Attachments (SAP)"
    status: "Generally Available"
    license: "Microsoft Defender for Office 365 Plan 1 ή Plan 2"
    source: "https://learn.microsoft.com/en-us/defender-office-365/anti-phishing-policies-about"
    verified: 2026-10-30
---

Ένας χρήστης σου λέει ότι ένα σημαντικό email πήγε στα Junk. Ή το αντίθετο: ένα προφανές spam έφτασε στα Inbox. Η απάντηση βρίσκεται στα headers του μηνύματος, αλλά είναι γραμμένη σε κωδικούς όπως `SFV:SPM`, `CAT:SPOOF` και `compauth=fail reason=000`. Αυτό το εργαλείο τους μεταφράζει στα Ελληνικά: τι αποφάσισε το Microsoft 365, ποιο κομμάτι του φίλτρου το αποφάσισε, και τι κάνεις τώρα, με το απλούστερο βήμα πρώτο.

Δεν χρειάζεται εγγραφή, και δεν χρειάζεται πρόσβαση στο tenant σου. Τα headers διαβάζονται μόνο μέσα στον browser σου.

{{< junk-check >}}

## Τι διαβάζει το εργαλείο

| Header | Τι δείχνει | Πώς χρησιμοποιείται |
|---|---|---|
| `X-Forefront-Antispam-Report` | Την κατηγορία απειλής (`CAT`), την απόφαση του φίλτρου spam (`SFV`), την IP και τη χώρα σύνδεσης, την κατεύθυνση | Η βάση της κρίσης |
| `X-Microsoft-Antispam` | Το bulk complaint level (`BCL`) | Για τα newsletters και τα προωθητικά |
| `X-CustomSpam` | Ποια ρύθμιση Advanced Spam Filter ενεργοποιήθηκε | Για τα false positives από ASF |
| `Authentication-Results` | SPF, DKIM, DMARC και τη συνολική κρίση `compauth` με τον κωδικό `reason` | Για το αν ο αποστολέας είναι αυτός που λέει |
| `Received` | Τους servers από τους οποίους πέρασε το μήνυμα και πότε | Για καθυστερήσεις και gateways τρίτων |

Το εργαλείο αγνοεί σκόπιμα τα headers με κατάληξη `-Untrusted`. Αυτά τα προσθέτει το Microsoft 365 του αποστολέα, όχι το δικό σου, και δεν δείχνουν τι αποφάσισε το δικό σου φίλτρο.

## Γιατί δεν κοιτάμε το SCL

Οι περισσότεροι οδηγοί στο internet ξεκινούν από το spam confidence level (`SCL`): 5 και πάνω σημαίνει spam. Στο Microsoft 365 αυτό δεν ισχύει πια. Η Microsoft γράφει ρητά ότι στο cloud το `SCL` δεν καθορίζει αν ένα μήνυμα είναι spam ούτε την ενέργεια που θα γίνει, και η ίδια τιμή εμφανίζεται σε μηνύματα με διαφορετική κρίση. Χρησιμεύει κυρίως στο on-premises Exchange. Γι' αυτό το εργαλείο κρίνει από τα `CAT` και `SFV`, όπως προτείνει η ίδια η Microsoft, και δείχνει το `SCL` μόνο για πληροφόρηση.

## Τα πιο συχνά σενάρια

**Ο αποστολέας είναι γνήσιος, αλλά το DMARC αποτυγχάνει.** Το πρόβλημα είναι στις εγγραφές DNS του αποστολέα, όχι στο δικό σου tenant. Μια μόνιμη εξαίρεση στο δικό σου tenant θα άφηνε να περνά και όποιος τον μιμείται. Η σωστή λύση είναι να διορθώσει εκείνος SPF, DKIM και DMARC. Μπορείς να του στείλεις το αποτέλεσμα του [ελέγχου domain](/elegxos-domain/).

**Το email περνά από υπηρεσία τρίτου πριν το Microsoft 365.** Αν το MX σου δείχνει σε Proofpoint, Mimecast ή άλλο gateway, το Microsoft 365 βλέπει την IP του gateway αντί για την πραγματική IP του αποστολέα. Τότε το SPF και το DMARC αποτυγχάνουν χωρίς λόγο. Η λύση είναι το Enhanced Filtering for Connectors, όχι ένα mail flow rule που παρακάμπτει το φίλτρο.

**Ένα newsletter πηγαίνει στα Junk.** Είναι bulk, με `BCL` πάνω από το όριο της πολιτικής σου. Για έναν χρήστη αρκεί το «Not junk». Για όλο τον οργανισμό, άλλαξε το όριο προσεκτικά, αφού δεις πρώτα το Bulk senders insight.

**Spam φτάνει στα Inbox.** Αν δεις `SFV:SKN`, `SFV:SKI` ή `SFV:SKA`, κάποια εξαίρεση παρέκαμψε το φίλτρο: mail flow rule, IP Allow List ή allowed senders. Αυτές οι εξαιρέσεις είναι συχνά πιο επικίνδυνες από το ίδιο το spam.

## Τι δεν μπορεί να σου πει

- **Τον τελικό φάκελο.** Τα headers δείχνουν την απόφαση του φίλτρου. Τι έγινε μετά εξαρτάται από την πολιτική που εφαρμόζεται στον παραλήπτη, και μπορεί να αλλάξει από inbox rules του χρήστη ή από το Zero-hour auto purge. Για αυτό χρησιμοποίησε το Message trace.
- **Ποια πολιτική εφαρμόστηκε.** Αν ο χρήστης είναι στο Standard ή στο Strict preset security policy, οι ρυθμίσεις των custom policies δεν εφαρμόζονται σε αυτόν. Το διαγνωστικό Email Threat Policies της Microsoft το δείχνει.
- **Τα πεδία που η Microsoft δεν τεκμηριώνει.** Το `X-Forefront-Antispam-Report` έχει και πεδία που χρησιμοποιεί μόνο η ομάδα anti-spam της Microsoft για διάγνωση. Το εργαλείο δεν προσπαθεί να τα ερμηνεύσει.
- **Το αν ένα domain είναι το ίδιο οργανισμός με ένα άλλο.** Ο έλεγχος alignment για το DMARC είναι προσεγγιστικός για σπάνια domains δεύτερου επιπέδου.

## Γιατί έχει σημασία για τη συμμόρφωση

Η ΚΥΑ 1689/2025 ζητά φιλτράρισμα και έλεγχο των μηνυμάτων ηλεκτρονικού ταχυδρομείου για κακόβουλα ή ανεπιθύμητα μηνύματα ([απαίτηση 20.γ](/kya-1689-2025/#20-γ)) και ανίχνευση κακόβουλου λογισμικού ([20.α](/kya-1689-2025/#20-α)). Η Οδηγία NIS2 ζητά χειρισμό περιστατικών ([21.2.β](/nis2/#21-2-β)) και βασικές πρακτικές κυβερνοϋγιεινής ([21.2.ζ](/nis2/#21-2-ζ)). Στο ISO/IEC 27001 αφορά την προστασία από malware ([A.8.7](/iso-27001/#A-8-7)), την αξιολόγηση των συμβάντων ([A.5.25](/iso-27001/#A-5-25)) και την αναφορά τους ([A.6.8](/iso-27001/#A-6-8)). Στον GDPR, την ακεραιότητα και το απόρρητο των συστημάτων ([32.1.β](/gdpr/#32-1-β)).

Το φίλτρο κάνει τη δουλειά του μόνο του. Αυτό που ζητά ο ελεγκτής είναι να δει ότι εξετάζεις τις αποφάσεις του όταν κάποιος τις αμφισβητεί, και ότι δεν ανοίγεις εξαιρέσεις χωρίς λόγο. Η αναφορά .pdf του εργαλείου, μαζί με το submission ID αν το έστειλες στη Microsoft, είναι ακριβώς αυτό το τεκμήριο.

{{< tool-link page="/elegxos-domain" lead="Αποτυγχάνει το DMARC ενός αποστολέα ή το δικό σου;" label="Έλεγξε το domain" tail="SPF, DKIM, DMARC με τη ρύθμιση του Microsoft 365 που το διορθώνει." >}}

{{< tool-link page="/kouiz-phishing" lead="Θέλεις οι χρήστες να αναγνωρίζουν μόνοι τους τα ύποπτα μηνύματα;" label="Δοκίμασε το κουίζ phishing" tail="δέκα σενάρια με email, SMS και ψεύτικες σελίδες." >}}

{{< tool-link page="/anafora-peristatikou" lead="Το μήνυμα ήταν επίθεση και κάποιος πάτησε;" label="Δες αν είναι σημαντικό περιστατικό" tail="και πότε λήγει κάθε προθεσμία προς την ΕΑΚ." >}}

Για το πώς στήνεις τις πολιτικές που πήραν αυτές τις αποφάσεις, δες το άρθρο [Microsoft Defender for Office 365: Από τις preset policies στην προχωρημένη παραμετροποίηση](/posts/microsoft-defender-up-close-series/microsoft-defender-for-office-365-deep-dive/).

## Απόρρητο

Το thecybersec.gr δεν έχει server που να δέχεται τα headers που επικολλάς. Η ανάλυση γίνεται εξ ολοκλήρου μέσα στον browser σου, και τα headers δεν αποθηκεύονται, ούτε στο localStorage. Αν έχεις αποδεχτεί τα cookies ανάλυσης, το πλαίσιο κειμένου και τα αποτελέσματα αποκρύπτονται από την καταγραφή του Microsoft Clarity. Για την αναφορά .pdf ο browser σου φορτώνει, μόνο όταν πατήσεις το κουμπί, τη βιβλιοθήκη pdfmake από το `cdnjs.cloudflare.com`. Περισσότερα στην [πολιτική απορρήτου](/privacy/).

Το αποτέλεσμα είναι ενδεικτικό και δεν αντικαθιστά τη διερεύνηση με το Message trace και το Threat Explorer. Το thecybersec.gr είναι προσωπικό blog και δεν εκπροσωπεί τη Microsoft ή την Εθνική Αρχή Κυβερνοασφάλειας.

## Πηγές και επαλήθευση {#last-verified}

{{< verification >}}
