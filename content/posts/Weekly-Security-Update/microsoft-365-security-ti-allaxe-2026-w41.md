---
title: "Microsoft 365 Security: τι άλλαξε (εβδομάδα 41/2026)"
date: 2026-10-08T20:22:00+03:00
lastmod: 2026-10-08T20:22:00+03:00
draft: false
keywords:
  - Microsoft 365 Security νέα
  - τι άλλαξε Microsoft Defender
  - Entra MemberOf retirement
  - Teams QR code protection
  - Defender for Cloud Apps Identity inventory
  - OwaMailboxPolicy BlockedFileTypes msix
  - Intune security baseline Windows 11 26H2
tags:
  - Microsoft 365 Security
  - Microsoft Defender XDR
  - Microsoft Entra
  - Microsoft Intune
  - Microsoft Defender for Office 365
  - Microsoft Defender for Cloud Apps
  - Εβδομαδιαία σύνοψη
author: "Dimosthenis Atteia"
description: "Εβδομάδα 41/2026: τέλος του MemberOf στο Entra στις 3 Νοεμβρίου, προστασία από QR codes στο Teams, αυτόματο Identity inventory στο Defender for Cloud Apps."
summary: "Ο τελεστής MemberOf του Entra σταματά στις 3 Νοεμβρίου 2026, το Teams αποκτά δύο προστασίες για QR codes και το Defender for Cloud Apps ενεργοποιεί μόνο του τη σύνδεση με το Identity inventory."
categories: ["Security Operations & XDR"]
series: ["Microsoft 365 Security Weekly"]
ShowToc: true
TocOpen: false
weight: -6
cover:
  image: "/images/WSUM365.webp"
  alt: "Weekly Security Update: εβδομαδιαία ενημέρωση για το Microsoft 365 Security"
  caption: "Microsoft 365 Security: εβδομαδιαία ενημέρωση"
  relative: false
  hidden: false
---

## Με μια ματιά

Η αλλαγή με τη μεγαλύτερη συνέπεια αυτή την εβδομάδα είναι στο **Microsoft Entra**: ο τελεστής MemberOf στα dynamic groups σταματά να λειτουργεί στις 3 Νοεμβρίου 2026, και όσα groups τον χρησιμοποιούν θα «παγώσουν» στην τελευταία τους κατάσταση. Παράλληλα, το **Microsoft Teams** αποκτά δύο προστασίες για QR codes, και το **Defender for Cloud Apps** ενεργοποιεί αυτόματα από τις 15 Οκτωβρίου τη σύνδεση των SaaS accounts με το Identity inventory.

## Οι αλλαγές της εβδομάδας

### 1. Microsoft Entra: τελική υπενθύμιση για την απόσυρση του τελεστή MemberOf

**Φάση:** Απόσυρση δυνατότητας που ήταν σε Public Preview, στις 3 Νοεμβρίου 2026 **Άδεια:** Microsoft Entra ID P1 ή P2 (το P1 περιλαμβάνεται στο Microsoft 365 E3)

**Τι αλλάζει.** Μετά τις 3 Νοεμβρίου 2026, τα dynamic membership groups, τα dynamic administrative units και οι auto-assignment policies του entitlement management που χρησιμοποιούν τον τελεστή `memberOf` σταματούν να ενημερώνονται. Οι υπάρχουσες συνδρομές και αναθέσεις μένουν στην τελευταία γνωστή τους κατάσταση. Η Microsoft προειδοποιεί ότι αυτό μπορεί να αφήσει παρωχημένη πρόσβαση σε Teams και SharePoint, λάθος στόχευση σε πολιτικές Conditional Access, λάθος group-based licensing και παρωχημένες αναθέσεις access packages. Η ανακοίνωση συνεχίζει την MC1448379 της 5ης Αυγούστου 2026.

**Τι να κάνεις.** Πριν από τις 3 Νοεμβρίου:

- Κάνε εξαγωγή των dynamic groups από το Entra admin center και βρες όσα έχουν `memberOf` στον κανόνα τους. Ο κανόνας έχει τη μορφή `user.memberof -any (group.objectId -in [...])`.
- Για τα dynamic administrative units και τις auto-assignment policies, η Microsoft παραπέμπει στο Microsoft Graph PowerShell για τον εντοπισμό.
- Αντικατάστησε τον κανόνα με υποστηριζόμενους τελεστές ή μετάτρεψε το group σε assigned membership, και επιβεβαίωσε ότι τα μέλη βγαίνουν σωστά.
- Δώσε προτεραιότητα στα groups που χρησιμοποιούνται σε Conditional Access και σε group-based licensing. Εκεί ένα «παγωμένο» group δεν φαίνεται, μέχρι κάποιος να κρατήσει πρόσβαση που δεν έπρεπε.

**Πηγή:** [Configure dynamic membership groups with the memberOf attribute](https://learn.microsoft.com/entra/identity/users/groups-dynamic-rule-member-of) Message Center [MC1488834](https://mc.merill.net/message/MC1488834) (αρχείο mc.merill.net, δημοσιεύθηκε στις 5 Οκτωβρίου 2026)

### 2. Microsoft Teams: δύο προστασίες για QR codes

**Φάση:** GA, με σταδιακή διάθεση μέσα στον Οκτώβριο 2026, σύμφωνα με τις ανακοινώσεις **Άδεια:** για το θόλωμα των εικόνων δεν αναφέρεται στην πηγή. Το ZAP για το Teams απαιτεί Microsoft Defender for Office 365 Plan 1 ή Plan 2, και το advanced hunting σε μηνύματα Teams μόνο Plan 2.

**Τι αλλάζει.** Έρχονται δύο ξεχωριστές αλλαγές. Η πρώτη είναι στο ίδιο το Teams: οι εικόνες με QR code που στέλνουν εξωτερικοί χρήστες θα εμφανίζονται θολωμένες από προεπιλογή, και ο χρήστης θα μπορεί να τις αποκαλύψει αν εμπιστεύεται τον αποστολέα. Το θόλωμα δεν σημαίνει ότι το Teams έκρινε το QR code κακόβουλο, και δεν χρειάζεται ρύθμιση από διαχειριστή. Σύμφωνα με την ανακοίνωση, όπως ενημερώθηκε στις 6 Οκτωβρίου, η διάθεση μετατέθηκε: Targeted Release στα μέσα Οκτωβρίου και παγκόσμια διάθεση στα τέλη Οκτωβρίου 2026.

Η δεύτερη είναι στο Defender for Office 365: τα μηνύματα του Teams με QR codes αναλύονται μετά την παράδοση, και τα URLs που περιέχουν αξιολογούνται. Αν βρεθεί κακόβουλο URL, οι χρήστες βλέπουν προειδοποίηση στο μήνυμα, σε εσωτερικές και εξωτερικές συνομιλίες. Με ενεργό το ZAP για το Teams, τα κακόβουλα εσωτερικά μηνύματα που πληρούν τις προϋποθέσεις μπορεί να μπλοκαριστούν από την υπάρχουσα προστασία μετά την παράδοση. Οι εντοπισμοί φαίνονται στο advanced hunting, στον πίνακα `MessageUrlInfo`, με τιμή `QRCode` στη στήλη `UrlLocation`. Η διάθεση, σύμφωνα με την ανακοίνωση, ξεκίνησε στις αρχές Οκτωβρίου και ολοκληρώνεται στις αρχές Νοεμβρίου 2026.

**Τι να κάνεις.** Έλεγξε στο Defender portal ότι το ZAP είναι ενεργό: Settings → Email & collaboration → **Microsoft Teams protection**, ενότητα **Zero-hour auto purge (ZAP)**. Ενημέρωσε το SOC για τη νέα τιμή `QRCode` στο `MessageUrlInfo`, ώστε να μπει στα hunting queries. Πες στους χρήστες και στο help desk ότι οι εικόνες με QR code από εξωτερικούς θα φαίνονται θολές, και ότι πριν τις αποκαλύψουν ελέγχουν ποιος τις έστειλε.

**Πηγή:** [Microsoft Defender for Office 365 support for Microsoft Teams](https://learn.microsoft.com/defender-office-365/mdo-support-teams-about) Message Center [MC1490905](https://mc.merill.net/message/MC1490905) (δημοσιεύθηκε στις 7 Οκτωβρίου 2026) και [MC1470410](https://mc.merill.net/message/MC1470410) (ενημερώθηκε στις 6 Οκτωβρίου 2026), αρχείο mc.merill.net

### 3. Defender for Cloud Apps: αυτόματη ενεργοποίηση της σύνδεσης SaaS accounts με το Identity inventory

**Φάση:** δεν αναφέρεται στην πηγή, ισχύει από τις 15 Οκτωβρίου 2026 **Άδεια:** δεν αναφέρεται στην πηγή. Το Defender for Cloud Apps δεν περιλαμβάνεται στο Microsoft 365 E3.

**Τι αλλάζει.** Από τις 15 Οκτωβρίου 2026 η σύνδεση των SaaS accounts του Defender for Cloud Apps με το Identity inventory περνά από opt-in σε αυτόματη ενεργοποίηση. Ενεργοποιείται μόνη της στα tenants που δεν χρησιμοποιούν τους ρόλους **User group admin** ή **App/instance admin**, και αυτά τα tenants δεν χρειάζεται να κάνουν κάτι. Με τη σύνδεση ενεργή, οι λογαριασμοί των SaaS και cloud εφαρμογών εμφανίζονται στο Identity inventory, στην καρτέλα **Human identities**, δίπλα στις ταυτότητες on-premises και cloud. Προσοχή σε ένα σημείο: οι συσχετίσεις ταυτοτήτων που γίνονται στο Identity inventory δεν επηρεάζουν προς το παρόν τις built-in detections, το UEBA, τις policies, τα governance actions, το activity log και το RBAC scoping του Defender for Cloud Apps.

**Τι να κάνεις.** Δες αν το tenant σου χρησιμοποιεί τους δύο ρόλους, για να ξέρεις αν σε αφορά η αυτόματη ενεργοποίηση. Μετά τις 15 Οκτωβρίου άνοιξε στο Defender portal το Assets → **Identities** και κοίταξε τι νέο εμφανίστηκε. Αν η ομάδα σου δουλεύει με το Identity inventory, ενημέρωσέ την ότι ο αριθμός των ταυτοτήτων θα αλλάξει.

**Πηγή:** [What's new in Microsoft Defender for Cloud Apps](https://learn.microsoft.com/en-us/defender-cloud-apps/release-notes) [View the Identity inventory](https://learn.microsoft.com/en-us/defender-for-identity/identity-inventory)

### 4. Exchange Online: τα αρχεία .msix και .msixbundle μπαίνουν στα blocked file types

**Φάση:** GA, με διάθεση από τις αρχές έως τα μέσα Νοεμβρίου 2026, σύμφωνα με την ανακοίνωση **Άδεια:** δεν αναφέρεται στην πηγή

**Τι αλλάζει.** Οι τύποι αρχείων `.msix` και `.msixbundle` προστίθενται στη λίστα **BlockedFileTypes** όλων των OWA mailbox policies, της προεπιλεγμένης και των δικών σου. Οι χρήστες του Outlook on the web και του new Outlook for Windows δεν θα μπορούν πλέον να ανοίξουν ή να κατεβάσουν συνημμένα αυτών των τύπων. Είναι αλλαγή προεπιλογής που η ανακοίνωση χαρακτηρίζει major change.

**Τι να κάνεις.** Αν ο οργανισμός σου δεν διακινεί πακέτα MSIX με email, δεν κάνεις τίποτα. Αν διακινεί, για παράδειγμα μια ομάδα ανάπτυξης ή packaging, η ανακοίνωση λέει να προσθέσεις τους δύο τύπους στο **AllowedFileTypes** των σχετικών OwaMailboxPolicy πριν από τη διάθεση, με το `Set-OwaMailboxPolicy`. Πριν το κάνεις, σκέψου αν θέλεις πραγματικά εγκαταστάσιμα πακέτα να φτάνουν με email: ένα κοινόχρηστο σημείο διανομής είναι ασφαλέστερη λύση από μια εξαίρεση για όλους.

**Πηγή:** [Set-OwaMailboxPolicy](https://learn.microsoft.com/powershell/module/exchangepowershell/set-owamailboxpolicy) Message Center [MC1488841](https://mc.merill.net/message/MC1488841) (αρχείο mc.merill.net, δημοσιεύθηκε στις 5 Οκτωβρίου 2026)

### 5. Intune: security baseline για Windows 11, version 26H2

**Φάση:** διαθέσιμο (εβδομάδα της 5ης Οκτωβρίου 2026) **Άδεια:** Microsoft Intune Plan 1

**Τι αλλάζει.** Το security baseline για Windows 11, version 26H2 είναι διαθέσιμο στο Intune και είναι πλέον το πιο πρόσφατο Windows baseline. Περιλαμβάνει νέες ρυθμίσεις, αλλαγμένες προεπιλεγμένες τιμές και αναθεωρημένες οδηγίες ασφάλειας. Τα υπάρχοντα baseline profiles δεν αναβαθμίζονται αυτόματα. Όταν βγαίνει νέα έκδοση, οι ρυθμίσεις των παλιών profiles γίνονται read-only: συνεχίζουν να εφαρμόζονται, αλλά δεν μπορείς να αλλάξεις τις τιμές τους. Η ρύθμιση **Configure NetBIOS settings** δεν περιλαμβάνεται σε αυτή την έκδοση, επειδή υποστηρίζεται προς το παρόν μόνο σε Windows Insider builds.

**Τι να κάνεις.** Στο Intune admin center πήγαινε Endpoint security → Security baselines, διάλεξε το baseline, σημείωσε το profile και πάτα **Update Version**. Η ενημέρωση δημιουργεί νέο profile δίπλα στο παλιό, χωρίς να μεταφέρει scope tags και assignments, και σε ρωτά αν θα κρατήσεις τις δικές σου προσαρμογές ή θα πάρεις τις προεπιλογές. Κατέβασε πρώτα τη σύγκριση των εκδόσεων σε CSV, δοκίμασε το νέο profile σε πιλοτική ομάδα και, όταν το αναθέσεις, αφαίρεσε τα assignments του παλιού για να μην έχεις conflicts.

**Πηγή:** [What's new in Microsoft Intune](https://learn.microsoft.com/en-us/intune/intune-service/fundamentals/whats-new) [Configure security baseline policies in Microsoft Intune](https://learn.microsoft.com/en-us/intune/device-security/security-baselines/configure-baselines)

## Προσοχή αυτή την εβδομάδα

**15 Οκτωβρίου 2026, Defender for Cloud Apps.** Η σύνδεση των SaaS accounts με το Identity inventory ενεργοποιείται αυτόματα στα tenants που πληρούν τις προϋποθέσεις (αλλαγή 3).

**31 Οκτωβρίου 2026, Microsoft 365 Targeted Release.** Σύμφωνα με την ανακοίνωση MC1490899 της 7ης Οκτωβρίου 2026, το Targeted Release αποσύρεται τον Ιανουάριο του 2027 και αντικαθίσταται από τρεις επιλογές: **Frontier** (πρόσβαση σε preview), **Standard release** και **Deferred release**, που παίρνει τις μεγάλες αλλαγές περίπου 30 ημέρες μετά το Standard. Από τον Νοέμβριο του 2026 δεν θα μπορείς να προσθέσεις, να αφαιρέσεις ή να αλλάξεις χρήστες στο Targeted Release, και η ανακοίνωση ζητά ενέργεια έως τις 31 Οκτωβρίου. Δες ποιοι χρήστες είναι σήμερα στο Targeted Release (Microsoft 365 admin center: Settings → Org settings → Organization profile → Release preferences) και αποφάσισε πού πάει ο καθένας. Αν χρησιμοποιείς το Targeted Release ως πιλοτική ομάδα για αλλαγές ασφάλειας, η διαδικασία σου θέλει ενημέρωση.

**3 Νοεμβρίου 2026, Microsoft Entra.** Ο τελεστής MemberOf σταματά να λειτουργεί (αλλαγή 1). Είναι η προθεσμία με το μεγαλύτερο ρίσκο, γιατί η βλάβη δεν φαίνεται αμέσως.

**Συσκευές Teams και Exchange Web Services.** Σύμφωνα με την ανακοίνωση MC1486282 της 2ας Οκτωβρίου 2026, οι συσκευές Teams Rooms on Android, Teams phones και Teams panels με έκδοση εφαρμογής παλαιότερη από την ελάχιστη του Φεβρουαρίου 2026 επηρεάζονται από την απόσυρση του EWS, που το προηγούμενο τεύχος κάλυψε από την πλευρά του Exchange Online. Σε αυτές μπορεί να μη συγχρονίζεται το ημερολόγιο και να χαθεί το one-touch join. Οι κλήσεις στα Teams phones δεν επηρεάζονται. Έλεγξε τις εκδόσεις στο Teams admin center (Teams devices), ενημέρωσε όσες είναι κάτω από το ελάχιστο και βεβαιώσου ότι οι συσκευές είναι online για να πάρουν την ενημέρωση. Η διάθεση, σύμφωνα με την ανακοίνωση, ξεκινά στις αρχές Οκτωβρίου 2026 και ολοκληρώνεται έως τα τέλη Απριλίου 2027.

Οι ημερομηνίες των ανακοινώσεων μπορεί να διαφέρουν ανά tenant, οπότε δες τις στο δικό σου Message Center.

**Πηγή:** Message Center [MC1490899](https://mc.merill.net/message/MC1490899) και [MC1486282](https://mc.merill.net/message/MC1486282) (αρχείο mc.merill.net) [Update Microsoft Teams devices remotely](https://learn.microsoft.com/en-us/microsoftteams/devices/remote-update)

## Σύνδεση με την ΚΥΑ 1689/2025

- **[13.γ](/kya-1689-2025/#13-γ) και [13.ε](/kya-1689-2025/#13-ε), χορήγηση, ανάκληση και προσαρμογή δικαιωμάτων:** ένα dynamic group με MemberOf που «παγώνει» σημαίνει ότι η πρόσβαση δεν ανακαλείται όταν αλλάζει ο ρόλος κάποιου. Κράτησε στο αρχείο σου τη λίστα των groups που άλλαξες και τον έλεγχο των μελών τους.
- **[20.γ](/kya-1689-2025/#20-γ) και [20.ε](/kya-1689-2025/#20-ε), φιλτράρισμα μηνυμάτων και κακόβουλων ιστοτόπων:** ο έλεγχος των URLs μέσα σε QR codes στο Teams και ο αποκλεισμός των συνημμένων `.msix` στο Outlook ενισχύουν και οι δύο το φιλτράρισμα.
- **[11.α](/kya-1689-2025/#11-α), κατάλογος αγαθών:** οι λογαριασμοί των SaaS εφαρμογών στο Identity inventory δίνουν πληρέστερη εικόνα των ταυτοτήτων του οργανισμού.
- **[14.β](/kya-1689-2025/#14-β) και [14.δ](/kya-1689-2025/#14-δ), ασφαλής παραμετροποίηση και περιοδική αξιολόγησή της:** το νέο security baseline του Intune είναι πρότυπο του κατασκευαστή, και η μετάβαση σε αυτό είναι τεκμήριο ότι επανεξετάζεις τις ρυθμίσεις όταν βγαίνει νέα έκδοση.
- **[16.α](/kya-1689-2025/#16-α), διαχείριση αλλαγών:** η απόσυρση του Targeted Release αλλάζει τον τρόπο που δοκιμάζεις τις αλλαγές του Microsoft 365 πριν φτάσουν σε όλους.

Όλες οι απαιτήσεις της ΚΥΑ 1689/2025 με την αντιστοίχισή τους βρίσκονται στον [οδηγό της ΚΥΑ 1689/2025](/kya-1689-2025/).

## Πηγές

Για αυτό το τεύχος ελέγχθηκαν το αρχείο mc.merill.net (αναρτήσεις Message Center από την 1η έως τις 8 Οκτωβρίου 2026) και οι σελίδες «What's new» των Microsoft Defender XDR, Defender for Endpoint, Defender for Office 365, Defender for Identity, Defender for Cloud Apps, Microsoft Intune, Microsoft Purview και Microsoft Entra. Οι σελίδες των Defender XDR, Defender for Endpoint, Defender for Office 365, Purview και Entra δεν είχαν καταχωρίσεις Οκτωβρίου όταν διαβάστηκαν. Η σελίδα του Defender for Identity είχε μία καταχώριση Οκτωβρίου, τη γενική διαθεσιμότητα της ενεργοποίησης του sensor v3.x χωρίς Defender for Endpoint, που δεν μπήκε στις πέντε αλλαγές. Για την αλλαγή στο Defender for Cloud Apps και για το security baseline του Intune δεν βρέθηκε ανακοίνωση Message Center.

Οι ανακοινώσεις MC1488834, MC1490905, MC1470410, MC1488841, MC1490899 και MC1486282 διαβάστηκαν από το έγκυρο, δημόσιο και ανεξάρτητο αρχείο του Microsoft 365 Message Center, mc.merill.net, που το συντηρεί η κοινότητα και όχι η Microsoft. Δεν διαβάστηκαν σε Message Center κάποιου tenant. Το πόσο επιβεβαιώνονται από τη Microsoft διαφέρει ανά θέμα:

- **Entra MemberOf (MC1488834):** η ημερομηνία της 3ης Νοεμβρίου 2026 και οι συνέπειες επιβεβαιώνονται και από τη σελίδα του Microsoft Learn για το `memberOf`.
- **QR codes στο Teams (MC1490905, MC1470410):** η αλλαγή και οι ημερομηνίες διάθεσης προέρχονται μόνο από το αρχείο. Από το Microsoft Learn προέρχονται η διαδρομή της ρύθμισης ZAP και οι άδειες.
- **Αρχεία .msix στο Exchange Online (MC1488841), Targeted Release (MC1490899) και συσκευές Teams (MC1486282):** η αλλαγή και οι ημερομηνίες προέρχονται μόνο από το αρχείο. Οι σελίδες του Microsoft Learn που παρατίθενται καλύπτουν μόνο τις ρυθμίσεις, όχι την ίδια την αλλαγή.
- **Defender for Cloud Apps και security baseline του Intune:** προέρχονται μόνο από τις σελίδες «What's new» της Microsoft.

Οι ανακοινώσεις και οι ημερομηνίες τους διαφέρουν ανά tenant. Πριν ενεργήσεις, δες την αντίστοιχη ανακοίνωση στο δικό σου Message Center.

Τελευταίος έλεγχος αδειών και στοιχείων: 8 Οκτωβρίου 2026.
