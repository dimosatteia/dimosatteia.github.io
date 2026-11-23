---
title: "Microsoft Entra Conditional Access Μέρος 3: Από τον σχεδιασμό στις πρώτες πολιτικές, με ασφάλεια"
seoTitle: "Conditional Access Μέρος 3: σχεδιασμός και υλοποίηση"
# Προσωρινή ημερομηνία: αλλάζει στην πραγματική ημερομηνία δημοσίευσης
date: 2026-10-19T11:00:00+03:00
lastmod: 2026-10-19T11:00:00+03:00
draft: true
keywords:
  - Conditional Access deployment plan
  - Conditional Access naming convention
  - Conditional Access templates
  - Microsoft-managed policies
  - Report-only mode
  - MFA για όλους τους χρήστες
  - Phishing-resistant MFA administrators
  - Block legacy authentication
  - Named locations
  - Compliant network Global Secure Access
tags:
  - Conditional Access
  - Microsoft Entra ID
  - Zero Trust
  - MFA
  - Authentication Strength
  - Global Secure Access
  - Identity Security
  - Microsoft 365 Security
author: "Dimosthenis Atteia"
description: "Πώς σχεδιάζεις και υλοποιείς Conditional Access με ασφάλεια: στρατηγική, πρώτη πολιτική, MFA για όλους, admins, legacy authentication και named locations. Μέρος 3."
summary: "Στο τρίτο μέρος της σειράς περνάς από τη θεωρία στην πράξη. Σχεδιάζεις τη στρατηγική πριν από την πρώτη πολιτική, τη δοκιμάζεις σε report-only, επιβάλλεις MFA σε όλους, προστατεύεις τους admins με phishing-resistant MFA, καταργείς το legacy authentication και βλέπεις πού κρύβονται οι κίνδυνοι στα named locations."
categories: ["Identity & Access"]
series: ["Microsoft Entra Conditional Access"]
ShowToc: true
TocOpen: false
cover:
  image: "/images/Conditional-Access/ca-meros-3.webp"
  alt: "Microsoft Entra Conditional Access Μέρος 3: Σχεδιασμός και υλοποίηση στην πράξη"
  caption: "Microsoft Entra Conditional Access: Ο Πλήρης Οδηγός"
  relative: false
ShowReadingTime: true
ShowWordCount: true
# Πλαίσιο «Last verified»: κάθε χαρακτηριστικό με τη φάση, την άδεια, την πηγή και την ημερομηνία ελέγχου
verification:
  - feature: "Conditional Access deployment plan (τρεις φάσεις, όριο 240 πολιτικών)"
    status: "Generally Available"
    license: "Microsoft Entra ID P1 (risk-based: P2)"
    source: "https://learn.microsoft.com/en-us/entra/identity/conditional-access/plan-conditional-access"
    verified: 2026-10-19
  - feature: "Conditional Access policy templates"
    status: "Generally Available"
    license: "Microsoft Entra ID P1"
    source: "https://learn.microsoft.com/en-us/entra/identity/conditional-access/concept-conditional-access-policy-common"
    verified: 2026-10-19
  - feature: "Conditional Access Optimization Agent"
    status: "Generally Available"
    license: "Microsoft Entra ID P1 και Microsoft Security Copilot (SCU)"
    source: "https://learn.microsoft.com/en-us/entra/identity/conditional-access/plan-conditional-access"
    verified: 2026-10-19
  - feature: "Report-only mode και policy impact"
    status: "Generally Available"
    license: "Microsoft Entra ID P1"
    source: "https://learn.microsoft.com/en-us/entra/identity/conditional-access/concept-conditional-access-report-only"
    verified: 2026-10-19
  - feature: "Require multifactor authentication for all users (authentication strength)"
    status: "Generally Available"
    license: "Microsoft Entra ID P1"
    source: "https://learn.microsoft.com/en-us/entra/identity/conditional-access/policy-all-users-mfa-strength"
    verified: 2026-10-19
  - feature: "Register security information: εφαρμογή και στην εγγραφή Windows Hello for Business και macOS Platform SSO"
    status: "Σε ισχύ από 6 Ιουλίου 2026"
    license: "Microsoft Entra ID P1"
    source: "https://learn.microsoft.com/en-us/entra/identity/conditional-access/policy-all-users-security-info-registration"
    verified: 2026-10-19
  - feature: "Phishing-resistant MFA για administrators"
    status: "Generally Available"
    license: "Microsoft Entra ID P1"
    source: "https://learn.microsoft.com/en-us/entra/identity/conditional-access/policy-admin-phish-resistant-mfa"
    verified: 2026-10-19
  - feature: "Block legacy authentication"
    status: "Generally Available"
    license: "Microsoft Entra ID P1 (ή Security defaults)"
    source: "https://learn.microsoft.com/en-us/entra/identity/conditional-access/policy-block-legacy-authentication"
    verified: 2026-10-19
  - feature: "Named locations (IP ranges, χώρες)"
    status: "Generally Available"
    license: "Microsoft Entra ID P1"
    source: "https://learn.microsoft.com/en-us/entra/identity/conditional-access/concept-assignment-network"
    verified: 2026-10-19
  - feature: "Compliant network check"
    status: "Generally Available"
    license: "Άδεια Global Secure Access"
    source: "https://learn.microsoft.com/en-us/entra/global-secure-access/how-to-compliant-network"
    verified: 2026-10-19
# MITRE ATT&CK®: ονόματα στο data/mitre.yaml
mitre: ["T1078.004", "T1110", "T1110.003", "T1528", "M1032", "M1026"]
---

> 🚦 **Σειρά Microsoft Entra Conditional Access, Μέρος 3 από 6.** Στο **[Μέρος 1](/posts/conditional-access-series/conditional-access-meros-1-themeliodeis-ennoies/)** είδες πώς σκέφτεται το Conditional Access και στο **[Μέρος 2](/posts/conditional-access-series/conditional-access-meros-2-politikes-kai-mixanismoi/)** από τι αποτελείται μια πολιτική. Εδώ περνάς στην πράξη, με τη σειρά που δεν σε κλειδώνει έξω.

## Σχεδιασμός πριν από την πρώτη πολιτική

Η ευελιξία του Conditional Access είναι και ο μεγαλύτερος κίνδυνός του. Μια βιαστική πολιτική μπορεί να κλειδώσει έξω όλους τους χρήστες, και μια ξεχασμένη εξαίρεση μπορεί να αφήσει ανοιχτή πόρτα για μήνες. Γι' αυτό ο **[οδηγός σχεδιασμού της Microsoft](https://learn.microsoft.com/en-us/entra/identity/conditional-access/plan-conditional-access)** ξεκινά με προετοιμασία και όχι με ρυθμίσεις.

### Τι χρειάζεσαι πριν ξεκινήσεις

- **Άδεια** Microsoft Entra ID P1 ή trial. Για risk-based πολιτικές, P2.
- **Ρόλους με ελάχιστα δικαιώματα:** Security Reader για ανάγνωση, Conditional Access Administrator για δημιουργία και αλλαγή. Ιδανικά με ενεργοποίηση just-in-time μέσω Privileged Identity Management.
- **Έναν test user που δεν είναι admin**, και μια ομάδα που τον περιέχει.
- **Τους break-glass λογαριασμούς** έτοιμους και εξαιρεμένους από κάθε πολιτική.
- **Επικοινωνία:** οι χρήστες πρέπει να ξέρουν τι αλλάζει, πότε και πού ζητούν βοήθεια.

### Οι ερωτήσεις που απαντάς για κάθε πολιτική

Πριν φτιάξεις μια πολιτική, γράψε τις απαντήσεις. Αυτό το έγγραφο είναι και η τεκμηρίωσή σου για τον ελεγκτή.

| Ενότητα | Ερώτηση |
| --- | --- |
| **Users** | Ποιοι χρήστες, ομάδες, ρόλοι ή workload identities μπαίνουν και ποιοι εξαιρούνται; |
| **Target resources** | Ποιες εφαρμογές, user actions ή authentication contexts; |
| **Conditions** | Ποιες πλατφόρμες, τοποθεσίες, client apps, συσκευές, επίπεδα κινδύνου; |
| **Grant** | MFA, compliant device, hybrid join, app protection, password change ή terms of use; |
| **Session** | App enforced restrictions, App Control, sign-in frequency, persistent browser, CAE; |

### Πέντε αρχές που σε γλιτώνουν από προβλήματα

1. **Κάθε εφαρμογή με τουλάχιστον μία πολιτική.** Η πιο ασφαλής βάση είναι μια πολιτική σε **All resources**, ώστε να μη χρειάζεται αλλαγή κάθε φορά που προσθέτεις εφαρμογή. Προσοχή μόνο στον συνδυασμό Block και All resources, που μπορεί να κλειδώσει έξω τους admins.
2. **Λίγες πολιτικές, όχι μία ανά εφαρμογή.** Το όριο είναι **240 πολιτικές ανά tenant**, και μετρούν και όσες είναι report-only ή off. Ομαδοποίησε εφαρμογές με ίδιες απαιτήσεις. Χρησιμοποίησε ομάδες αντί για μεμονωμένους χρήστες και filter for applications αντί για λίστες εφαρμογών.
3. **Naming standard από την πρώτη πολιτική.** Η Microsoft προτείνει όνομα με αύξοντα αριθμό, εφαρμογές, απόκριση, σε ποιους αφορά και πότε.
4. **Contingency πολιτικές για έκτακτη ανάγκη.** Ανενεργές πολιτικές με όνομα που ξεκινά με «ENABLE IN EMERGENCY», για την περίπτωση διακοπής του MFA.
5. **Protected actions στις αλλαγές πολιτικών.** Όποιος αλλάζει πολιτική Conditional Access κάνει πρώτα ισχυρό MFA. Τα είδαμε στο Μέρος 2.

![Το naming standard της Microsoft για πολιτικές Conditional Access](/images/Conditional-Access/ca-p3-naming-standard.webp)
![Παράδειγμα ονόματος πολιτικής: CA01 - Dynamics CRP: Require MFA For marketing When on external networks](/images/Conditional-Access/ca-p3-naming-example.webp)
> 📷 **Εικόνα 1:** Το naming standard της Microsoft (αύξων αριθμός, εφαρμογή, απόκριση, σε ποιους, πότε) και ένα παράδειγμα: «CA01 - Dynamics CRP: Require MFA For marketing When on external networks». Διαγράμματα © Microsoft, από το [Plan a Conditional Access deployment](https://learn.microsoft.com/en-us/entra/identity/conditional-access/plan-conditional-access).

Ο αύξων αριθμός έχει πρακτική αξία. Όταν μιλάς με έναν admin στο τηλέφωνο, του λες «άνοιξε την CA01» και δεν χρειάζεται να διαβάσετε ολόκληρο το όνομα.

### Μην ξεκινάς από το μηδέν: managed policies, templates και Optimization Agent

Τρία εργαλεία της Microsoft σου δίνουν έτοιμη αφετηρία.

**Microsoft-managed policies.** Τις είδες στο Μέρος 1. Εμφανίζονται στη λίστα με **Microsoft** στη στήλη **Created by**, ξεκινούν σε report-only και ενεργοποιούνται από τη Microsoft αν τις αφήσεις έτσι. Έλεγξέ τες πρώτες, γιατί μπορεί να καλύπτουν ήδη μέρος της στρατηγικής σου.

[![Η λίστα πολιτικών με Microsoft-managed policies και Conditional Access Optimization Agent](/images/Conditional-Access/ca-p3-managed-policies.webp)](/images/Conditional-Access/ca-p3-managed-policies.webp)
> 📷 **Εικόνα 2:** Η σελίδα Policies με τις κάρτες Conditional Access Optimization Agent, Microsoft-managed policies και User created policies. Οι managed policies φαίνονται με την ένδειξη Microsoft στη στήλη Created by. Screenshot © Microsoft, από το [Microsoft-managed Conditional Access policies](https://learn.microsoft.com/en-us/entra/identity/conditional-access/managed-policies).

**Policy templates.** Στο **Entra ID → Conditional Access → Create new policy from templates** υπάρχουν έτοιμες πολιτικές σε κατηγορίες: **Secure foundation**, **Zero Trust**, **Remote work**, **Protect administrator**, **Emerging threats** και **AI Agents**. Η Microsoft προτείνει το Secure foundation ως βάση για κάθε οργανισμό. Κάθε πολιτική από template δημιουργείται σε **report-only** και εξαιρεί **μόνο τον χρήστη που τη δημιούργησε**. Τους break-glass λογαριασμούς τους προσθέτεις εσύ μετά. Μπορείς επίσης να κατεβάσεις το JSON κάθε template και να το ανεβάσεις με **Upload policy file**.

[![Δημιουργία πολιτικής από template με τις κατηγορίες Secure foundation, Zero Trust, Remote work, Protect administrator και Emerging threats](/images/Conditional-Access/ca-p3-templates.webp)](/images/Conditional-Access/ca-p3-templates.webp)
> 📷 **Εικόνα 3:** Η σελίδα Create new policy from templates με τις κατηγορίες και τα πρώτα templates, όπως Require multifactor authentication for admins και Block legacy authentication. Screenshot © Microsoft, από το [Conditional Access policy templates](https://learn.microsoft.com/en-us/entra/identity/conditional-access/concept-conditional-access-policy-common).

**Conditional Access Optimization Agent.** Με το Microsoft Security Copilot αναλύει τις υπάρχουσες πολιτικές σου, εντοπίζει κενά κάλυψης και προτείνει νέες πολιτικές ή συγχωνεύσεις. Χρειάζεται Microsoft Entra ID P1 και security compute units (SCU) του Security Copilot.

> 📖 **Για το κόστος των SCU:** το **[Security Copilot στο Microsoft 365 E5](/posts/security-copilot-sto-microsoft-365-e5-scu/)**.

### Το πλάνο σε τρεις φάσεις

Η Microsoft προτείνει rollout σε τρεις φάσεις, με χρονοδιάγραμμα που προσαρμόζεις στο μέγεθος του οργανισμού σου:

| Φάση | Πολιτικές | Άδεια |
| --- | --- | --- |
| **1. Foundation** (εβδομάδες 1-2) | Block legacy authentication · Προστασία της σελίδας My Security Info · Phishing-resistant MFA για privileged ρόλους | P1 |
| **2. Core authentication** (εβδομάδες 2-3) | Ισχυρό MFA για όλους · Ισχυρό MFA για guests · Approved client apps ή app protection σε κινητά · MFA για device join και registration | P1 |
| **3. Advanced protection** (εβδομάδες 3-4) | High risk sign-ins · High risk users · Token protection · Restrict device code flow · Block authentication transfer · Πολιτικές για PAW | P2 για τα risk-based, P1 για τα υπόλοιπα |

![Το rollout του Conditional Access σε τρεις φάσεις](/images/Conditional-Access/ca-p3-rollout-phases.webp)
> 📷 **Εικόνα 4:** Οι τρεις φάσεις του rollout, με τις πολιτικές κάθε φάσης και τους κανόνες που ισχύουν πριν από κάθε φάση: break-glass εκτός πολιτικών, pilot group, report-only για τουλάχιστον μία εβδομάδα και έλεγχος στα sign-in logs.

Στο υπόλοιπο άρθρο υλοποιούμε τις πολιτικές των φάσεων 1 και 2. Τη φάση 3 τη βλέπουμε στο Μέρος 4.

## Η πρώτη σου πολιτική: δημιουργία, report-only και έλεγχος

Κάθε πολιτική, όποια κι αν είναι, ακολουθεί τον ίδιο κύκλο: **δημιουργία σε report-only, έλεγχος, επιβολή, παρακολούθηση**.

### Δημιουργία

1. Μπες στο **Microsoft Entra admin center** ως **Conditional Access Administrator**.
2. Πήγαινε στο **Entra ID → Conditional Access → Policies → New policy**.
3. Δώσε όνομα σύμφωνα με το naming standard σου.
4. Όρισε users, target resources, conditions, grant και session, όπως είδαμε στο Μέρος 2.
5. Στο **Enable policy** επίλεξε **Report-only**.
6. Πάτησε **Create**.

### Έλεγχος σε report-only

Η Microsoft προτείνει κάθε πολιτική να μένει σε report-only **τουλάχιστον μία εβδομάδα**. Σε αυτό το διάστημα αξιολογείται σε κάθε πραγματικό sign-in, χωρίς να επιβάλλει τίποτα. Το αποτέλεσμα το βλέπεις σε δύο σημεία:

- **Policy impact:** στη σελίδα της πολιτικής, με **View policy impact**. Δείχνει σε γράφημα πόσα sign-ins θα πετύχαιναν, θα αποτύγχαναν ή δεν θα επηρεάζονταν, και παραδείγματα sign-ins που δεν θα πληρούσαν την πολιτική.
- **Sign-in logs:** σε κάθε sign-in, η καρτέλα **Report-only** δείχνει το αποτέλεσμα κάθε report-only πολιτικής, π.χ. Report-only: Success, Failure ή Not applied.

[![Το policy impact μιας report-only πολιτικής MFA για όλους](/images/Conditional-Access/ca-p3-policy-impact.webp)](/images/Conditional-Access/ca-p3-policy-impact.webp)
> 📷 **Εικόνα 5:** Το Policy impact μιας πολιτικής «Multifactor authentication for all»: γράφημα sign-ins στον χρόνο, ποσοστά Success, Failure και Not applied, και παραδείγματα sign-ins που δεν θα ικανοποιούσαν την πολιτική. Screenshot © Microsoft, από το [Report-only mode](https://learn.microsoft.com/en-us/entra/identity/conditional-access/concept-conditional-access-report-only).

[![Η καρτέλα Report-only σε ένα sign-in](/images/Conditional-Access/ca-p3-report-only-sign-in.webp)](/images/Conditional-Access/ca-p3-report-only-sign-in.webp)
> 📷 **Εικόνα 6:** Η καρτέλα Report-only στα Activity Details ενός sign-in, με το αποτέλεσμα κάθε report-only πολιτικής. Entra ID → Conditional Access → Sign-in logs. Screenshot © Microsoft, από το [Report-only mode](https://learn.microsoft.com/en-us/entra/identity/conditional-access/concept-conditional-access-report-only).

Ένα σημείο προσοχής από τη Microsoft: **έλεγξε ρητά τις εξαιρέσεις**. Ένας χρήστης που εξαιρείται από μια πολιτική MFA μπορεί να δεχτεί MFA από άλλη πολιτική. Το What If tool, που θα δούμε αναλυτικά στο Μέρος 5, σου δείχνει ποιες πολιτικές εφαρμόζονται σε ένα σενάριο. Δεν αντικαθιστά όμως μια πραγματική δοκιμή με test user.

### Επιβολή και rollback

Όταν τα αποτελέσματα είναι αυτά που περιμένεις, αλλάζεις το **Enable policy** από **Report-only** σε **On**. Αν κάτι πάει στραβά, έχεις τρεις επιλογές:

- **Disable** την πολιτική. Είναι η γρηγορότερη και πιο καθαρή επιλογή.
- **Εξαίρεση** του χρήστη ή της ομάδας που επηρεάζεται, μόνο προσωρινά και μόνο για αξιόπιστους χρήστες.
- **Διαγραφή** μιας πολιτικής που δεν χρειάζεται πια. Οι διαγραμμένες πολιτικές και τα named locations επαναφέρονται μέσα σε **30 ημέρες** (soft delete).

## MFA για όλους τους χρήστες: σταδιακά και με ασφάλεια

Η βασική πολιτική που προτείνει η Microsoft για κάθε οργανισμό είναι: **All users, All resources χωρίς εξαιρέσεις εφαρμογών, Require MFA**. Πριν την επιβάλεις, όμως, κλείνεις την πόρτα από την οποία θα έμπαινε ένας επιτιθέμενος για να καταχωρήσει τη δική του μέθοδο MFA.

### Βήμα 1: προστάτευσε την εγγραφή μεθόδων

Με κλεμμένο κωδικό, ένας επιτιθέμενος μπορεί να μπει στη σελίδα My Security Info και να καταχωρήσει δικό του Authenticator. Η πολιτική για το user action **Register security information** το εμποδίζει:

1. **Users:** Include **All users**. Exclude **All guest and external users** και τους break-glass λογαριασμούς.
2. **Target resources → User actions:** **Register security information**.
3. **Network:** Include **Any location**, Exclude **All trusted locations**.
4. **Grant:** **Require authentication strength**.
5. **Enable policy:** Report-only.

Οι νέοι χρήστες, που δεν έχουν ακόμη μέθοδο MFA, παίρνουν από τον admin ένα **Temporary Access Pass**. Ικανοποιεί την απαίτηση MFA και τους επιτρέπει να εγγραφούν από οποιαδήποτε συσκευή ή τοποθεσία.

> ⚠️ **Αλλαγή σε ισχύ από τις 6 Ιουλίου 2026:** οι πολιτικές για το **Register security information** εφαρμόζονται πλέον και στην εγγραφή credentials του **Windows Hello for Business** και του **macOS Platform SSO**. Αν η πολιτική σου ζητά συγκεκριμένο authentication strength ή trusted location, θα το ζητήσει και εκεί. Έλεγξέ τη σε report-only, ειδικά πριν από μαζικό onboarding συσκευών.

### Βήμα 2: η βασική πολιτική MFA

1. **Users:** Include **All users**. Exclude τους break-glass λογαριασμούς και τον ρόλο **Directory Synchronization Accounts**, αν χρησιμοποιείς Microsoft Entra Connect ή Cloud Sync. Αν έχεις ξεχωριστή πολιτική για guests, εξαίρεσε και αυτούς.
2. **Target resources:** **All resources**, χωρίς εξαιρέσεις.
3. **Grant:** **Require authentication strength** → **Multifactor authentication**.
4. **Enable policy:** Report-only, και μετά On.

Η Microsoft προσφέρει τρία built-in authentication strengths: **Multifactor authentication** (το λιγότερο αυστηρό), **Passwordless MFA** και **Phishing-resistant MFA** (το πιο αυστηρό). Για τη βασική πολιτική προτείνει το πρώτο. Αν χρησιμοποιείς **external authentication methods**, αυτά δεν είναι ακόμη συμβατά με τα authentication strengths, οπότε χρησιμοποίησε το **Require multifactor authentication**.

Ο οδηγός της Microsoft αναφέρει ότι μπορείς να εξαιρέσεις τα trusted locations, ώστε να μη ζητείται MFA από το εταιρικό δίκτυο. Θα σε συμβούλευα να το αποφύγεις. Ένα εταιρικό δίκτυο δεν είναι απόδειξη ταυτότητας, και ένας παραβιασμένος υπολογιστής μέσα στο γραφείο κάνει sign-in από trusted IP. Για λιγότερη τριβή στο γραφείο, η καλύτερη λύση είναι το «compliant device ή MFA», που είδαμε στο Μέρος 2.

### Βήμα 3: MFA για device join και registration

Στη φάση 2 η Microsoft προτείνει και πολιτική για το user action **Register or join devices**, με **Require MFA** ή **Require authentication strength**. Θυμήσου από το Μέρος 2 ότι, αν τη χρησιμοποιήσεις, το **Require Multifactor Authentication to register or join devices with Microsoft Entra** στις Device settings πρέπει να είναι **No**.

## Προστασία των admins με phishing-resistant MFA

Οι λογαριασμοί με προνομιακούς ρόλους είναι ο πρώτος στόχος κάθε επιτιθέμενου. Ένα MFA που μπορεί να υποκλαπεί μέσω AiTM phishing δεν αρκεί για αυτούς. Η Microsoft προτείνει **phishing-resistant MFA** τουλάχιστον για 14 ρόλους, όπως Global Administrator, Privileged Role Administrator, Security Administrator, Conditional Access Administrator, Exchange Administrator και User Administrator.

> ⚠️ **Πρώτα οι μέθοδοι, μετά η πολιτική.** Πριν ενεργοποιήσεις την πολιτική, οι admins πρέπει να έχουν καταχωρήσει passkey (FIDO2) ή άλλη phishing-resistant μέθοδο, π.χ. με Temporary Access Pass. Αλλιώς κινδυνεύεις να κλειδωθείς έξω από τον tenant.

Η πολιτική:

1. **Users:** Include **Directory roles**, με τουλάχιστον τους ρόλους που προτείνει η Microsoft. Exclude τους break-glass λογαριασμούς.
2. **Target resources:** **All resources**.
3. **Grant:** **Require authentication strength** → **Phishing-resistant MFA**.
4. **Enable policy:** Report-only, και μετά On.

Τρία σημεία που κάνουν τη διαφορά:

- **Μόνο built-in ρόλοι.** Οι πολιτικές δεν εφαρμόζονται σε custom roles ούτε σε ρόλους με scope σε administrative unit. Αν χρησιμοποιείς τέτοιους, χρειάζεσαι πολιτική σε ομάδα.
- **Συνδύασε με PIM.** Το Privileged Identity Management μπορεί να ζητά MFA ή authentication context τη στιγμή της ενεργοποίησης του ρόλου. Έτσι ο admin έχει τα δικαιώματα μόνο όταν τα χρειάζεται, και μόνο αφού αποδείξει ξανά ποιος είναι.
- **Ξεχωριστοί λογαριασμοί admin.** Η Microsoft προτείνει ξεχωριστούς λογαριασμούς για διαχείριση και για την καθημερινή δουλειά.

Το επόμενο βήμα, οι Privileged Access Workstations με filter for devices, είναι στη φάση 3 και το βλέπουμε στο Μέρος 4.

## Κατάργηση του legacy authentication

Σύμφωνα με τη Microsoft, **πάνω από το 97% των credential stuffing επιθέσεων** και **πάνω από το 99% των password spray επιθέσεων** χρησιμοποιούν legacy authentication. Τα πρωτόκολλα αυτά δεν υποστηρίζουν MFA, άρα παρακάμπτουν κάθε πολιτική MFA που έχεις.

### Βήμα 1: βρες ποιος το χρησιμοποιεί ακόμη

Πριν μπλοκάρεις, βρες τις εξαρτήσεις:

1. Μπες ως **Reports Reader** στο **Entra ID → Monitoring & health → Sign-in logs**.
2. Πρόσθεσε τη στήλη **Client App** από το **Columns**.
3. **Add filters → Client App** και επίλεξε όλα τα legacy authentication πρωτόκολλα.
4. Κάνε το ίδιο στην καρτέλα **User sign-ins (non-interactive)**.

Το workbook **Sign-ins using legacy authentication** σε βοηθά να δεις την εικόνα συνολικά. Οι συνηθισμένοι ένοχοι είναι scanners και πολυμηχανήματα που στέλνουν email με SMTP, παλιές εφαρμογές με IMAP ή POP3 και scripts.

### Βήμα 2: η πολιτική

1. **Users:** Include **All users**. Exclude μόνο τους λογαριασμούς που πρέπει ακόμη να χρησιμοποιούν legacy authentication, και τουλάχιστον έναν λογαριασμό για να μην κλειδωθείς έξω.
2. **Target resources:** **All resources**.
3. **Conditions → Client apps:** **Configure: Yes**, και επίλεξε μόνο **Exchange ActiveSync clients** και **Other clients**.
4. **Grant:** **Block access**.
5. **Enable policy:** Report-only, και μετά On.

Κάθε εξαίρεση εδώ είναι λογαριασμός που μπορεί να δεχτεί password spray χωρίς MFA. Κράτα τη λίστα μικρή, με ημερομηνία λήξης για κάθε εξαίρεση. Για τα πολυμηχανήματα, η Microsoft έχει οδηγό για αποστολή email χωρίς basic authentication.

## Named locations και location-based access

Τα named locations είναι χρήσιμα, αλλά είναι και το σημείο όπου τα περισσότερα tenants έχουν κρυφά κενά.

[![Η σελίδα Named locations με IP ranges, χώρες και All Compliant Network locations](/images/Conditional-Access/ca-p3-named-locations.webp)](/images/Conditional-Access/ca-p3-named-locations.webp)
> 📷 **Εικόνα 7:** Η σελίδα Named locations με τέσσερις τύπους: All Compliant Network locations (Network Access), Countries (IP), Countries (GPS) και IP ranges. Entra ID → Conditional Access → Named locations. Screenshot © Microsoft, από το [Conditional Access: Network assignment](https://learn.microsoft.com/en-us/entra/identity/conditional-access/concept-assignment-network).

### Αποκλεισμός χωρών

Η Microsoft προτείνει μια πολιτική που μπλοκάρει τις χώρες από τις οποίες δεν περιμένεις ποτέ sign-in. Ο πιο απλός τρόπος είναι ανάποδος: φτιάχνεις ένα named location με τις **επιτρεπόμενες** χώρες και το βάζεις ως εξαίρεση σε μια πολιτική Block για Any location. **Εξαίρεσε οπωσδήποτε τους break-glass λογαριασμούς.**

### Πού κρύβονται οι κίνδυνοι

- **Το trusted location δεν είναι απόδειξη.** Ένα sign-in από το εταιρικό δίκτυο μπορεί να προέρχεται από παραβιασμένο υπολογιστή. Χρησιμοποίησε τα trusted locations για να μειώσεις την τριβή, όχι για να αφαιρέσεις έλεγχο.
- **Οι λίστες IP παλιώνουν.** Κάθε αλλαγή παρόχου, νέο γραφείο ή failover γραμμής αφήνει το named location λάθος.
- **Cloud proxy και VPN κρύβουν την πραγματική IP.** Το Microsoft Entra ID βλέπει την IP του proxy και δεν εμπιστεύεται το X-Forwarded-For.
- **Τα MFA trusted IPs είναι παλιός μηχανισμός.** Η Microsoft δεν τα προτείνει πια: δέχονται μόνο IPv4 και δεν χρησιμοποιούν τα protected actions των named locations. Μετάφερέ τα σε named locations.
- **Η τοποθεσία μέσω GPS ενοχλεί τους χρήστες.** Ζητά επιβεβαίωση στο Microsoft Authenticator κάθε ώρα. Κράτησέ τη για πολύ ευαίσθητες εφαρμογές.

### Η εναλλακτική: compliant network με Global Secure Access

Το **[compliant network check](https://learn.microsoft.com/en-us/entra/global-secure-access/how-to-compliant-network)** λύνει τα περισσότερα από τα παραπάνω. Αντί για λίστα IP, η πολιτική ελέγχει αν ο χρήστης συνδέεται μέσω του Global Secure Access **του δικού σου tenant**, είτε με τον client στη συσκευή είτε μέσω remote network.

Πλεονεκτήματα σε σχέση με τα IP-based named locations:

- **Καμία λίστα IP** για συντήρηση, και κανένα hairpin της κίνησης μέσω VPN για να κρατήσεις σταθερή IP εξόδου.
- **Προστασία από token replay.** Αν ένας επιτιθέμενος κλέψει token και το χρησιμοποιήσει εκτός του compliant network, το Microsoft Entra ID αρνείται το αίτημα. Σε εφαρμογές με Continuous Access Evaluation, όπως το Microsoft Graph, η απόρριψη γίνεται σχεδόν σε πραγματικό χρόνο.
- **Ανά tenant.** Ένας χρήστης άλλου οργανισμού με δικό του Global Secure Access δεν περνά τον έλεγχο του δικού σου.

Η ενεργοποίηση γίνεται σε δύο βήματα:

1. **Global Secure Access → Settings → Session management → Adaptive access** → **Enable Conditional Access Signaling for Microsoft Entra ID**. Μετά εμφανίζεται στα named locations το **All Compliant Network locations**.
2. Πολιτική: **All users** (exclude break-glass), **All resources**, **Network**: Include **Any location**, Exclude **All Compliant Network locations**, **Grant: Block access**. Αν κάνεις enrollment συσκευών στο Intune, εξαίρεσε τις εφαρμογές **Microsoft Intune Enrollment** και **Microsoft Intune**, για να μη δημιουργηθεί κυκλική εξάρτηση.

Οι πόροι του ίδιου του Global Secure Access εξαιρούνται αυτόματα, ώστε ο client να μη μπλοκάρεται. Ο οδηγός της Microsoft ενεργοποιεί την πολιτική κατευθείαν σε On. Θα σου πρότεινα κι εδώ report-only πρώτα, γιατί μια πολιτική Block σε All resources είναι ακριβώς ο συνδυασμός που μπορεί να κλειδώσει τους χρήστες έξω.

> ⚠️ **Αν απενεργοποιήσεις αργότερα το signaling** ενώ υπάρχουν ενεργές πολιτικές με compliant network, μπορεί να μπλοκάρεις τους χρήστες. Διάγραψε πρώτα τις πολιτικές.

> 📖 **Αναλυτικά, με τρία παραδείγματα πολιτικών:** **[Global Secure Access Μέρος 5: Conditional Access σε βάθος](/posts/global-secure-access/global-secure-access-meros-5-conditional-access/)**.

## Security considerations

- **Πρώτα οι break-glass λογαριασμοί, μετά οτιδήποτε άλλο.** Κάθε πολιτική αυτού του άρθρου τους εξαιρεί. Τα templates δεν το κάνουν αυτόματα.
- **Πρώτα οι μέθοδοι, μετά το phishing-resistant MFA.** Η σειρά αντίστροφα κλειδώνει έξω τους admins.
- **Οι εξαιρέσεις του legacy authentication είναι ανοιχτές πόρτες.** Κάθε μία με ιδιοκτήτη και ημερομηνία λήξης.
- **Τα trusted locations μειώνουν την ασφάλεια.** Μην εξαιρείς το εταιρικό δίκτυο από το MFA.
- **Τα templates εξαιρούν μόνο εσένα.** Αν τα χρησιμοποιήσεις, συμπλήρωσε τις εξαιρέσεις πριν τα κάνεις On.
- **Οι πολιτικές Block σε All resources θέλουν διπλό έλεγχο.** Policy impact, sign-in logs και δοκιμή με test user.

## Validation: test cases και αναμενόμενα αποτελέσματα

Πριν αλλάξεις μια πολιτική σε On, τρέξε τα αντίστοιχα test cases με τον test user και έλεγξε την καρτέλα **Conditional Access** ή **Report-only** στο sign-in.

| # | Πολιτική | Σενάριο | Αναμενόμενο αποτέλεσμα | Πού το βλέπεις |
| --- | --- | --- | --- | --- |
| 1 | MFA για όλους | Test user κάνει sign-in στο Outlook on the web | Ζητείται MFA. Report-only: Success μετά το MFA | Sign-in logs → Conditional Access |
| 2 | MFA για όλους | Break-glass λογαριασμός κάνει sign-in | Η πολιτική δεν εφαρμόζεται (Not applied) | Sign-in logs → Conditional Access |
| 3 | Security info registration | Νέος χρήστης εγγράφεται εκτός trusted location με Temporary Access Pass | Η εγγραφή ολοκληρώνεται | Sign-in logs, Audit logs |
| 4 | Phishing-resistant MFA για admins | Admin κάνει sign-in με Authenticator push | Απαιτείται phishing-resistant μέθοδος, η push δεν αρκεί | Sign-in logs → Authentication details |
| 5 | Block legacy authentication | Δοκιμή IMAP ή SMTP AUTH με τον test user | Αποτυχία, Block από την πολιτική | Sign-in logs, φίλτρο Client App |
| 6 | Block χωρών | Sign-in μέσω IP χώρας εκτός λίστας | Block. Ο break-glass λογαριασμός περνά | Sign-in logs → Location |
| 7 | Compliant network | Παύση του Global Secure Access client και sign-in σε νέα εφαρμογή | «You can't access this right now» | Sign-in logs → Network |

Για το test 7, η Microsoft σημειώνει ότι μια ήδη ανοιχτή συνεδρία δεν διακόπτεται. Ο έλεγχος γίνεται ξανά όταν χρειαστεί νέο sign-in.

## Governance: τι σημαίνει για χρήστες, IT και οργανισμό

**Για τους χρήστες:** οι πολιτικές αυτού του άρθρου είναι αυτές που θα δουν. Ένα σύντομο email πριν από κάθε φάση, με το τι αλλάζει και πού ζητούν βοήθεια, μειώνει δραστικά τα tickets.

**Για το IT:** το πλάνο των τριών φάσεων, το naming standard και ο πίνακας ερωτήσεων ανά πολιτική είναι το ελάχιστο σετ τεκμηρίωσης. Κάθε μετάβαση από report-only σε On είναι αλλαγή, με αξιολόγηση αντικτύπου και σχέδιο επαναφοράς.

**Για τον οργανισμό:** οι εξαιρέσεις, για legacy authentication, για trusted locations ή για συγκεκριμένους χρήστες, είναι αποδοχή κινδύνου. Πρέπει να εγκρίνονται από κάποιον με την αρμοδιότητα να τον αποδεχτεί, και να καταγράφονται στο μητρώο κινδύνων.

## Licensing σε μια ματιά

| Δυνατότητα | Τι χρειάζεσαι |
| --- | --- |
| Πολιτικές των φάσεων 1 και 2, templates, report-only, named locations | Microsoft Entra ID P1 |
| Risk-based πολιτικές της φάσης 3 | Microsoft Entra ID P2 |
| PIM για τους admins | Microsoft Entra ID P2 ή Microsoft Entra ID Governance |
| App protection σε κινητά, compliant device | Microsoft Intune |
| Compliant network | Global Secure Access |
| Conditional Access Optimization Agent | Microsoft Entra ID P1 και Security Copilot SCU |
| Insights and reporting workbook | Microsoft Entra ID P1 και Log Analytics workspace |

## Τι σημαίνει για τη συμμόρφωση

Το μοτίβο report-only, έλεγχος και επιβολή δεν είναι μόνο καλή τεχνική πρακτική. Είναι και η διαδικασία διαχείρισης αλλαγών που ζητούν οι ελεγκτές: αξιολόγηση αντικτύπου πριν από την αλλαγή, δοκιμή, σχέδιο επαναφοράς και τεκμήριο ότι η αλλαγή εφαρμόστηκε όπως σχεδιάστηκε.

> 🔗 **Χρειάζεσαι τεκμηρίωση συμμόρφωσης;** Οι πολιτικές αυτού του άρθρου στηρίζουν τις απαιτήσεις [13.δ](/kya-1689-2025/#13-δ) (προνομιούχοι λογαριασμοί), [13.ζ](/kya-1689-2025/#13-ζ) (MFA), [16.α](/kya-1689-2025/#16-α) (διαχείριση αλλαγών) και [19.γ](/kya-1689-2025/#19-γ) (ασφαλής απομακρυσμένη πρόσβαση), όπως τις αναλύει ο **[οδηγός της ΚΥΑ 1689/2025](/kya-1689-2025/)**. Στον οδηγό για την **[Οδηγία NIS2](/nis2/)** αντιστοιχούν στα [21.2.θ](/nis2/#21-2-θ) και [21.2.ι](/nis2/#21-2-ι), στο **[ISO/IEC 27001](/iso-27001/)** στα [A.5.17](/iso-27001/#A-5-17), [A.8.2](/iso-27001/#A-8-2), [A.8.5](/iso-27001/#A-8-5) και [A.8.32](/iso-27001/#A-8-32), και στον **[GDPR](/gdpr/)** στο [32.1.β](/gdpr/#32-1-β). Ο καθένας έχει checklist σε Excel.

## Τι έρχεται στο Μέρος 4

Με τις φάσεις 1 και 2 στη θέση τους, στο Μέρος 4 περνάμε στο advanced: authentication strengths και passkeys, token protection και προστασία από AiTM, risk-based πολιτικές με το Microsoft Entra ID Protection, device-based access και BYOD, session controls και Continuous Access Evaluation, και τι προστατεύει, ή δεν προστατεύει, το Conditional Access στα workload identities.

{{< if-published page="/posts/Conditional-Access-Series/conditional-access-meros-4-advanced-identity-security" >}}
> 📖 **Συνέχισε στο Μέρος 4:** [Advanced Identity Security, από τα passkeys ως τα workload identities](/posts/conditional-access-series/conditional-access-meros-4-advanced-identity-security/)
{{< /if-published >}}

> 🔗 **Όλη η σειρά σε ένα σημείο:** τα 6 μέρη και η σειρά ανάγνωσης στη **[σελίδα της σειράς](/series/microsoft-entra-conditional-access/)**.

Ακολούθησέ με στο [LinkedIn](https://www.linkedin.com/in/dimosthenisatteia/) για ειδοποιήσεις νέων άρθρων.

## Πηγές και επαλήθευση {#last-verified}

{{< verification >}}

---

<!--
IMAGE NOTES
Cover: ca-meros-3.webp (1200x500, ίδια βάση με τη σειρά, ετικέτα «Μέρος 3»)
Εικόνα 4: ca-p3-rollout-phases.webp (δικό μας διάγραμμα, με βάση τον deployment plan, γιατί η Microsoft δεν έχει διάγραμμα για τις τρεις φάσεις)
Επίσημες εικόνες της Microsoft από το MicrosoftDocs/entra-docs (άδεια MIT), με «© Microsoft» και link στη λεζάντα:
  ca-p3-naming-standard.webp        <- media/plan-conditional-access/11.png
  ca-p3-naming-example.webp         <- media/plan-conditional-access/naming-example.png
  ca-p3-managed-policies.webp       <- media/managed-policies/microsoft-managed-policy-list.png
  ca-p3-templates.webp              <- media/concept-conditional-access-policy-common/create-policy-from-template-identity.png
  ca-p3-policy-impact.webp          <- media/concept-conditional-access-report-only/policy-impact-example-report-only.png
  ca-p3-report-only-sign-in.webp    <- media/concept-conditional-access-report-only/report-only-detail-in-sign-in-log.png
  ca-p3-named-locations.webp        <- media/concept-assignment-network/named-locations.png
Save to content/images/Conditional-Access/
ΗΜΕΡΑ ΔΗΜΟΣΙΕΥΣΗΣ: draft: false, πραγματική date/lastmod, popup «Νέα στο blog» (STORAGE_KEY +1), homeHighlight: true, xlsx checklists, LinkedIn post.
-->
