---
title: "Microsoft Entra Conditional Access Μέρος 1: Τι είναι, πώς αποφασίζει και γιατί είναι ο πυρήνας του Zero Trust"
seoTitle: "Conditional Access Μέρος 1: τι είναι και πώς αποφασίζει"
slug: conditional-access-meros-1-themeliodeis-ennoies
date: 2026-11-16T07:00:00+02:00
lastmod: 2026-11-16T07:00:00+02:00
draft: false
# Εμφανίζεται ως «Νέο άρθρο» στην αρχική και πρώτο στα «Πρόσφατα Άρθρα» (weight -9: πάνω από το εβδομαδιαίο τεύχος, που έχει -8)
homeHighlight: true
weight: -9
keywords:
  - Microsoft Entra Conditional Access
  - Conditional Access τι είναι
  - Conditional Access οδηγός
  - Zero Trust policy engine
  - Conditional Access signals
  - Conditional Access policy evaluation
  - Security defaults ή Conditional Access
  - Microsoft-managed Conditional Access policies
  - Authentication και authorization Entra ID
  - ΚΥΑ 1689/2025 έλεγχος πρόσβασης
tags:
  - Conditional Access
  - Microsoft Entra ID
  - Zero Trust
  - Identity Security
  - MFA
  - Security Defaults
  - Microsoft 365 Security
author: "Dimosthenis Atteia"
description: "Τι είναι το Microsoft Entra Conditional Access, πώς αξιολογεί κάθε sign-in με βάση τα signals και πώς διαφέρει από τα Security Defaults. Μέρος 1 της σειράς."
summary: "Το Conditional Access είναι το «φανάρι» που αποφασίζει σε κάθε sign-in αν θα σε αφήσει να περάσεις, αν θα σου ζητήσει επιπλέον απόδειξη ή αν θα σε σταματήσει. Στο πρώτο μέρος της σειράς βλέπεις τι είναι, πώς εντάσσεται στο Zero Trust, ποια signals διαβάζει, πώς παίρνει την απόφαση και πότε αρκούν τα Security Defaults."
categories: ["Identity & Access"]
series: ["Microsoft Entra Conditional Access"]
ShowToc: true
TocOpen: false
cover:
  image: "/images/Conditional-Access/ca-meros-1-anim.webp"
  alt: "Microsoft Entra Conditional Access Μέρος 1: Θεμελιώδεις έννοιες και αρχιτεκτονική"
  caption: "Microsoft Entra Conditional Access: Ο Πλήρης Οδηγός"
  relative: false
ShowReadingTime: true
ShowWordCount: true
# Πλαίσιο «Last verified»: κάθε χαρακτηριστικό με τη φάση, την άδεια, την πηγή και την ημερομηνία ελέγχου
verification:
  - feature: "Microsoft Entra Conditional Access"
    status: "Generally Available"
    license: "Microsoft Entra ID P1 ή Microsoft 365 Business Premium"
    source: "https://learn.microsoft.com/en-us/entra/identity/conditional-access/overview"
    verified: 2026-11-16
  - feature: "Αξιολόγηση πολιτικών σε δύο φάσεις (session details, enforcement)"
    status: "Generally Available"
    license: "Microsoft Entra ID P1"
    source: "https://learn.microsoft.com/en-us/entra/identity/conditional-access/concept-conditional-access-policies"
    verified: 2026-11-16
  - feature: "Risk-based Conditional Access (sign-in risk, user risk)"
    status: "Generally Available"
    license: "Microsoft Entra ID P2 (Microsoft Entra ID Protection)"
    source: "https://learn.microsoft.com/en-us/entra/identity/conditional-access/overview"
    verified: 2026-11-16
  - feature: "Agent identities ως στόχος πολιτικής"
    status: "Public Preview"
    license: "Microsoft 365 E7, ή Microsoft Agent 365 με Microsoft Entra ID P1 ή Microsoft 365 E3 (για agent risk: Microsoft Entra ID P2 ή Microsoft 365 E5)"
    source: "https://learn.microsoft.com/en-us/entra/identity/conditional-access/policy-autonomous-agents"
    verified: 2026-11-16
  - feature: "Security defaults"
    status: "Generally Available"
    license: "Χωρίς επιπλέον άδεια (όλοι οι tenants)"
    source: "https://learn.microsoft.com/en-us/entra/fundamentals/security-defaults"
    verified: 2026-11-16
  - feature: "Microsoft-managed Conditional Access policies"
    status: "Generally Available"
    license: "Ανάλογα με την άδεια του tenant (P1, P2 ή Business Premium)"
    source: "https://learn.microsoft.com/en-us/entra/identity/conditional-access/managed-policies"
    verified: 2026-11-16
  - feature: "Όριο 240 πολιτικών ανά tenant"
    status: "Generally Available"
    license: "Microsoft Entra ID P1"
    source: "https://learn.microsoft.com/en-us/entra/identity/conditional-access/plan-conditional-access"
    verified: 2026-11-16
# MITRE ATT&CK®: ονόματα στο data/mitre.yaml
mitre: ["T1078.004", "T1110.003", "T1110", "M1032"]
---

> 🚦 **Σειρά Microsoft Entra Conditional Access, Μέρος 1 από 6.** Ξεκινάμε από τα θεμέλια: τι είναι το Conditional Access, πού στέκεται στο Zero Trust και πώς παίρνει την απόφαση σε κάθε sign-in. Στα επόμενα μέρη περνάμε στις πολιτικές, στην υλοποίηση, στα advanced σενάρια, στο troubleshooting και στο governance.

## Το φανάρι σε κάθε sign-in

Σκέψου κάθε sign-in στον tenant σου ως ένα αυτοκίνητο που φτάνει σε διασταύρωση. Το φανάρι δεν ξέρει μόνο ότι ήρθε ένα αυτοκίνητο. Ξέρει ποιος οδηγεί, από πού έρχεται, με τι όχημα και πού θέλει να πάει. Με βάση αυτά ανάβει πράσινο, πορτοκαλί ή κόκκινο.

Αυτό είναι το **[Microsoft Entra Conditional Access](https://learn.microsoft.com/en-us/entra/identity/conditional-access/overview)**. Η Microsoft το περιγράφει ως τη **Zero Trust policy engine** της: παίρνει signals από διάφορες πηγές, τα συνδυάζει, αποφασίζει και επιβάλλει την πολιτική του οργανισμού σου.

Στο πιο απλό του επίπεδο, μια πολιτική Conditional Access είναι μια πρόταση **if-then**. **Αν** ένας χρήστης θέλει να ανοίξει έναν πόρο, **τότε** πρέπει να κάνει κάτι. Για παράδειγμα: αν θέλει να μπει στο Microsoft 365, τότε πρέπει να ολοκληρώσει multifactor authentication.

Ως admin έχεις δύο στόχους που συχνά τραβούν σε αντίθετες κατευθύνσεις. Θέλεις οι χρήστες να δουλεύουν παραγωγικά από παντού, και θέλεις να προστατεύσεις τα δεδομένα του οργανισμού. Το Conditional Access υπάρχει για να εφαρμόζει τον σωστό έλεγχο τη στιγμή που χρειάζεται και να μην ενοχλεί τον χρήστη όταν δεν χρειάζεται.

![Signal, Decision και Enforcement στο Microsoft Entra Conditional Access](/images/Conditional-Access/ca-signal-decision-enforcement-microsoft.webp)
> 📷 **Εικόνα 1:** Signal, Decision, Enforcement: τα signals φτάνουν στο Conditional Access, που αποφασίζει ανάμεσα σε Allow full access, Allow limited access, Increase assurance, Remediate risk και Block access, και η απόφαση επιβάλλεται στις εφαρμογές και στα δεδομένα. Διάγραμμα © Microsoft, από το [What is Conditional Access?](https://learn.microsoft.com/en-us/entra/identity/conditional-access/overview) στο Microsoft Learn.

## Γιατί το χρειάζεσαι: τι σταματά στην πράξη

Πριν δεις πώς δουλεύει, αξίζει να δεις από τι σε προστατεύει. Σήμερα ο πιο εύκολος δρόμος για έναν επιτιθέμενο δεν είναι να «σπάσει» έναν server. Είναι να μπει με τα στοιχεία ενός χρήστη σου. Ένας κωδικός μπορεί να κλαπεί με ένα phishing email, να μαντευτεί ή να αγοραστεί από μια διαρροή. Από τη στιγμή που ο κωδικός είναι το μόνο εμπόδιο, όποιος τον έχει μπαίνει.

Το Conditional Access κάνει τον κωδικό ένα μόνο από τα στοιχεία που ελέγχονται. Δες μερικά καθημερινά σενάρια:

| Τι συμβαίνει | Τι κάνει το Conditional Access |
| --- | --- |
| Κάποιος έκλεψε τον κωδικό ενός χρήστη με phishing. | Ζητά MFA. Ο κωδικός μόνος του δεν φτάνει για να μπει. |
| Ένας επιτιθέμενος δοκιμάζει κοινούς κωδικούς σε πολλούς λογαριασμούς (password spray) μέσω παλιών πρωτοκόλλων. | Μπλοκάρει το legacy authentication, που δεν υποστηρίζει MFA. |
| Γίνεται sign-in από χώρα όπου η εταιρεία σου δεν έχει καμία δραστηριότητα. | Μπλοκάρει την πρόσβαση ή ζητά επιπλέον απόδειξη. |
| Ένας χρήστης ανοίγει εταιρικά έγγραφα από το προσωπικό του laptop. | Επιτρέπει πρόσβαση μόνο από browser, χωρίς download, ή ζητά διαχειριζόμενη συσκευή. |
| Συνδέεται ένας admin με δικαιώματα σε όλο τον tenant. | Εφαρμόζει αυστηρότερους κανόνες από ό,τι στους υπόλοιπους χρήστες. |
| Το Microsoft Entra ID Protection κρίνει ότι ένα sign-in είναι ύποπτο. | Ζητά MFA ή αλλαγή κωδικού, ή σταματά την πρόσβαση. |

Η Microsoft αναφέρει ότι το MFA μπορεί να μπλοκάρει πάνω από το 99,2% των επιθέσεων που στοχεύουν ταυτότητες. Το Conditional Access είναι ο μηχανισμός που αποφασίζει πότε και σε ποιον ζητείται.

**Τι προστατεύει.** Κάθε εφαρμογή που κάνει sign-in μέσω του Microsoft Entra ID: Microsoft 365 (Exchange Online, SharePoint, Teams), το Azure portal και τα εργαλεία διαχείρισης, αλλά και SaaS εφαρμογές τρίτων που έχεις συνδέσει με single sign-on.

**Τι δεν κάνει.** Δεν αντικαθιστά το Microsoft Defender. Δεν ελέγχει τι κάνει ένα malware μέσα σε μια συσκευή. Δεν σταματά μια επίθεση πριν ο χρήστης περάσει τον πρώτο παράγοντα, όπως θα δεις παρακάτω. Είναι ο φύλακας στην πόρτα, όχι ολόκληρο το σύστημα ασφάλειας.

## Από το Perimeter Security στο Zero Trust

Για χρόνια η ασφάλεια χτιζόταν γύρω από την περίμετρο. Ό,τι ήταν μέσα στο εταιρικό δίκτυο θεωρούνταν αξιόπιστο, και ό,τι ήταν έξω όχι. Το μοντέλο αυτό έπαψε να ταιριάζει όταν οι εφαρμογές πήγαν στο cloud και οι χρήστες άρχισαν να δουλεύουν από το σπίτι, από το κινητό και από ξενοδοχεία.

Όπως το λέει η Microsoft, η σύγχρονη ασφάλεια ξεπερνά την περίμετρο του δικτύου και περιλαμβάνει την ταυτότητα του χρήστη και της συσκευής. Η απόφαση για την πρόσβαση βασίζεται πλέον σε signals ταυτότητας και όχι μόνο στη διεύθυνση IP.

Το Conditional Access υλοποιεί στην πράξη τις τρεις αρχές του **[Zero Trust](https://learn.microsoft.com/en-us/security/zero-trust/)**:

| Αρχή Zero Trust | Πώς την υλοποιεί το Conditional Access |
| --- | --- |
| **Verify explicitly** | Κάθε sign-in αξιολογείται με βάση χρήστη, συσκευή, τοποθεσία, εφαρμογή και κίνδυνο, όχι με βάση το αν βρίσκεσαι «μέσα» στο δίκτυο. |
| **Use least privilege** | Διαφορετικοί κανόνες για χρήστες, guests και admins. Περιορισμοί συνεδρίας, όπως πρόσβαση μόνο από browser, όταν η συσκευή δεν είναι διαχειριζόμενη. |
| **Assume breach** | Ακόμη και ένας σωστός κωδικός δεν αρκεί. Αν τα signals δείχνουν κίνδυνο, η πρόσβαση ζητά επιπλέον απόδειξη ή σταματά. |

Το δίκτυο δεν εξαφανίζεται από την εικόνα. Γίνεται ένα signal ανάμεσα στα άλλα. Στις ρυθμίσεις μιας πολιτικής μπορείς να χρησιμοποιήσεις IP ranges, χώρες και το **compliant network** του Global Secure Access. Το τελευταίο το είδαμε σε βάθος στο **[Global Secure Access Μέρος 5: Conditional Access σε βάθος](/posts/global-secure-access/global-secure-access-meros-5-conditional-access/)**.

## Authentication, Authorization και πού μπαίνει το Conditional Access

Δύο όροι μπερδεύονται συχνά, και η διαφορά τους εξηγεί πού ακριβώς δρα το Conditional Access.

- **Authentication** είναι η απόδειξη του ποιος είσαι. Ο χρήστης δίνει κωδικό, passkey ή κάποια άλλη μέθοδο, και το Microsoft Entra ID επιβεβαιώνει την ταυτότητα.
- **Authorization** είναι η απόφαση για το τι επιτρέπεται να κάνεις. Εδώ το Microsoft Entra ID αποφασίζει αν θα εκδώσει **token** για τον πόρο που ζήτησες.

Το κρίσιμο σημείο είναι ότι οι πολιτικές Conditional Access **επιβάλλονται αφού ολοκληρωθεί το first-factor authentication**. Πρώτα ο χρήστης αποδεικνύει ποιος είναι με τον πρώτο παράγοντα, και μετά το Conditional Access αποφασίζει αν θα πάρει token, με ποιες επιπλέον απαιτήσεις και με ποιους περιορισμούς.

Αυτό έχει δύο συνέπειες που πρέπει να ξέρεις:

1. Το Conditional Access **δεν είναι η πρώτη γραμμή άμυνας** για επιθέσεις όπως denial-of-service. Μπορεί όμως να χρησιμοποιήσει signals από τέτοια γεγονότα για να αποφασίσει.
2. Οι πολιτικές που στοχεύουν ρόλους ή ομάδες αξιολογούνται **μόνο όταν εκδίδεται token**. Αν προσθέσεις έναν χρήστη σε ομάδα, η πολιτική δεν τον αφορά μέχρι να πάρει νέο token. Αν είχε ήδη έγκυρο token, η πολιτική δεν εφαρμόζεται αναδρομικά.

Για το δεύτερο σημείο, η Microsoft προτείνει να ενεργοποιείται η αξιολόγηση του Conditional Access τη στιγμή που ενεργοποιείται ένας ρόλος, μέσω του **Privileged Identity Management**. Θα το δούμε αναλυτικά στο Μέρος 3, στην προστασία των admins.

> 📖 **Θέλεις πρώτα το θεμέλιο του Entra ID;** Διάβασε το **[Azure και Entra: Τι πραγματικά είναι, τι τα ενώνει και τι τα διαφοροποιεί](/posts/azure-kai-entra-to-themelio/)** και το **[Microsoft Entra Architecture: Πώς στήνεται πραγματικά η ταυτότητά σου στο cloud](/posts/microsoft-entra-architecture-guide-defender/)**.

## Πώς αξιολογείται ένα sign-in: από το event στην απόφαση

Σε έναν tenant μπορεί να ισχύουν πολλές πολιτικές ταυτόχρονα για τον ίδιο χρήστη. Ο κανόνας είναι απλός: **πρέπει να ικανοποιηθούν όλες οι πολιτικές που ταιριάζουν**. Αν μία πολιτική ζητά MFA και μια άλλη compliant device, ο χρήστης κάνει MFA **και** χρησιμοποιεί compliant device.

Μέσα σε μία πολιτική, όλα τα assignments συνδυάζονται με **AND**. Αν έχεις ορίσει χρήστες, εφαρμογή και τοποθεσία, η πολιτική ενεργοποιείται μόνο όταν ισχύουν και τα τρία μαζί.

Η αξιολόγηση γίνεται σε δύο φάσεις:

**Φάση 1: Συλλογή στοιχείων της συνεδρίας.** Το Microsoft Entra ID συγκεντρώνει όσα χρειάζεται για την αξιολόγηση, όπως την τοποθεσία δικτύου και την ταυτότητα της συσκευής. Η φάση αυτή τρέχει και για τις ενεργές πολιτικές και για όσες είναι σε **report-only mode**.

**Φάση 2: Επιβολή.** Με τα στοιχεία της φάσης 1, εντοπίζονται οι απαιτήσεις που δεν ικανοποιούνται:

- Αν μια πολιτική έχει **Block**, η αξιολόγηση σταματά εκεί και ο χρήστης μπλοκάρεται.
- Αλλιώς, ο χρήστης καλείται να ολοκληρώσει τα grant controls που λείπουν, με σταθερή σειρά: multifactor authentication, compliant device, Microsoft Entra hybrid joined device, approved client app, app protection policy, password change, terms of use και custom controls.
- Όταν ικανοποιηθούν όλα τα grant controls, εφαρμόζονται τα **session controls**, όπως οι app enforced restrictions, το Microsoft Defender for Cloud Apps και η διάρκεια του token.

Η φάση 2 τρέχει μόνο για τις ενεργές πολιτικές. Γι' αυτό το report-only mode σου δείχνει τι θα συνέβαινε, χωρίς να επιβάλλει τίποτα.

![Η ροή αξιολόγησης του Conditional Access σε δύο φάσεις](/images/Conditional-Access/ca-evaluation-flow.webp)
> 📷 **Εικόνα 2:** Η ροή αξιολόγησης: first-factor authentication, φάση 1 (συλλογή στοιχείων), φάση 2 (Block ή grant controls με σταθερή σειρά), session controls και έκδοση token.

### Η παγίδα που πρέπει να ξέρεις από την πρώτη μέρα

Το Conditional Access δεν λειτουργεί ως «deny by default». Σύμφωνα με τον **[οδηγό σχεδιασμού της Microsoft](https://learn.microsoft.com/en-us/entra/identity/conditional-access/plan-conditional-access)**, **το access token εκδίδεται κανονικά αν καμία πολιτική δεν ενεργοποιεί κάποιο access control**.

Το παράδειγμα της Microsoft το δείχνει καθαρά. Έχεις μια πολιτική που ζητά MFA από την ομάδα Finance για την εφαρμογή Payroll. Ένας χρήστης της Finance κάνει MFA. Ένας χρήστης **εκτός** Finance παίρνει token και μπαίνει στην Payroll **χωρίς MFA**, γιατί καμία πολιτική δεν τον αφορά. Για να τον σταματήσεις, χρειάζεσαι δεύτερη πολιτική: όλοι οι χρήστες εκτός Finance, εφαρμογή Payroll, Block.

Γι' αυτό η Microsoft προτείνει κάθε εφαρμογή να καλύπτεται από τουλάχιστον μία πολιτική, ιδανικά με στόχο **All resources**. Θα το δούμε στην πράξη στο Μέρος 3.

## Τα signals: τι διαβάζει το φανάρι

Η Microsoft ομαδοποιεί τα signals που χρησιμοποιεί το Conditional Access ως εξής:

| Signal | Τι ρωτά | Παράδειγμα χρήσης |
| --- | --- | --- |
| **User, group ή agent** | Ποιος συνδέεται; | Αυστηρότεροι κανόνες για admins. Σε Preview και για agent identities, ώστε το Zero Trust να καλύπτει και τα AI workloads. |
| **Location (IP και χώρες)** | Από πού; | Αποκλεισμός χωρών όπου δεν δουλεύεις. Αξιόπιστα IP ranges για τα γραφεία. |
| **Device** | Με τι συσκευή; | Πλατφόρμα, κατάσταση (π.χ. compliant στο Intune) και filters for devices για στοχευμένες συσκευές, όπως privileged access workstations. |
| **Application** | Ποια εφαρμογή ή πόρο; | Αυστηρότερη πολιτική για το admin portal από ό,τι για το Teams. |
| **Risk** | Υπάρχει κάτι ύποπτο; | Signals από το Microsoft Entra ID Protection για επικίνδυνους χρήστες και sign-ins. Απαιτεί P2. |
| **Microsoft Defender for Cloud Apps** | Τι γίνεται μέσα στη συνεδρία; | Παρακολούθηση και έλεγχος της συνεδρίας σε πραγματικό χρόνο, π.χ. αποκλεισμός download. |

Με βάση τα signals, οι αποφάσεις είναι δύο ειδών. Το **Block access** είναι η πιο αυστηρή απόφαση. Το **Grant access** μπορεί να συνοδεύεται από μία ή περισσότερες απαιτήσεις: multifactor authentication, authentication strength, compliant device, Microsoft Entra hybrid joined device, approved client app, app protection policy, password change ή terms of use.

Στο φανάρι του άρθρου, το πράσινο είναι το Grant χωρίς επιπλέον απαιτήσεις. Το πορτοκαλί είναι το Grant με απαιτήσεις ή με περιορισμούς συνεδρίας. Το κόκκινο είναι το Block.

![Signals, Verify every access attempt, Apps and data](/images/Conditional-Access/ca-signals-verify-apps-microsoft.webp)
> 📷 **Εικόνα 3:** Τα signals (user and location, device, application, real-time risk) αξιολογούνται σε κάθε προσπάθεια πρόσβασης, με τρία πιθανά αποτελέσματα πριν από τις εφαρμογές και τα δεδομένα: Allow access, Require MFA και Block access. Διάγραμμα © Microsoft, από το [Plan a Conditional Access deployment](https://learn.microsoft.com/en-us/entra/identity/conditional-access/plan-conditional-access) στο Microsoft Learn.

## Conditional Access, Security Defaults και MFA

Αν δεν έχεις Conditional Access, ο tenant σου πιθανότατα προστατεύεται από τα **[Security defaults](https://learn.microsoft.com/en-us/entra/fundamentals/security-defaults)**. Είναι προρυθμισμένες ρυθμίσεις ασφάλειας, χωρίς επιπλέον κόστος, και μπορεί να είναι ήδη ενεργά αν ο tenant σου δημιουργήθηκε από τις 22 Οκτωβρίου 2019 και μετά. Περιλαμβάνουν:

- Εγγραφή όλων των χρηστών σε MFA, με το Microsoft Authenticator.
- MFA για τους admins σε κάθε sign-in, για 16 ρόλους υψηλών δικαιωμάτων όπως Global Administrator και Security Administrator.
- MFA για τους χρήστες όταν η Microsoft κρίνει ότι χρειάζεται.
- Αποκλεισμό του legacy authentication.
- Αποκλεισμό του device code flow. Από την 1η Ιουλίου 2026 αυτό ισχύει για όλους τους νέους tenants με Security defaults.
- MFA για την πρόσβαση στο Azure Resource Manager, δηλαδή Azure portal, Microsoft Entra admin center, Azure PowerShell και Azure CLI.

Η διαφορά από το Conditional Access είναι η ευελιξία:

| | Security defaults | Conditional Access |
| --- | --- | --- |
| **Άδεια** | Καμία | Τουλάχιστον Microsoft Entra ID P1 |
| **Παραμετροποίηση** | Καμία (on ή off) | Πλήρης |
| **Εξαιρέσεις** | Δεν υπάρχουν | Ανά χρήστη, ομάδα, εφαρμογή ή συνθήκη |
| **Κατάλληλο για** | Μικρούς οργανισμούς με τη δωρεάν έκδοση του Entra ID | Οργανισμούς με P1 ή P2 και σύνθετες απαιτήσεις |

Δύο σημεία που πρέπει να ξέρεις πριν κάνεις τη μετάβαση:

- **Δεν συνδυάζονται.** Η Microsoft αναφέρει ότι η δημιουργία πολιτικών Conditional Access σε εμποδίζει να ενεργοποιήσεις τα Security defaults. Για να περάσεις σε Conditional Access, τα απενεργοποιείς.
- **Μην αφήσεις κενό.** Μόλις απενεργοποιήσεις τα Security defaults, ενεργοποίησε αμέσως πολιτικές Conditional Access. Η Microsoft δίνει έτοιμες **[Microsoft-managed policies](https://learn.microsoft.com/en-us/entra/identity/conditional-access/managed-policies)** που καλύπτουν τις ίδιες προστασίες: block legacy authentication, MFA για Azure management, MFA για admins και MFA για όλους.

### Οι Microsoft-managed policies

Οι Microsoft-managed policies δημιουργούνται από τη Microsoft στους tenants που τις δικαιούνται. Εμφανίζονται στη λίστα πολιτικών με **Microsoft** στη στήλη **Created by**. Ξεκινούν σε **Report-only** και, αν τις αφήσεις έτσι, η Microsoft τις ενεργοποιεί όχι νωρίτερα από 30 ημέρες, με ειδοποίηση μέσω email και Message center δύο εβδομάδες πριν.

Δεν μπορείς να τις μετονομάσεις ούτε να τις διαγράψεις. Μπορείς όμως να αλλάξεις την κατάστασή τους και να ορίσεις εξαιρέσεις. Αν χρειάζεσαι περισσότερες αλλαγές, τις κάνεις **Duplicate** και δουλεύεις στο αντίγραφο.

### Και το per-user MFA;

Το per-user MFA είναι ρύθμιση που **η Microsoft δεν προτείνει πλέον**. Το Conditional Access δίνει καλύτερη διαχείριση και πιο στοχευμένη επιβολή του MFA, με λιγότερη ενόχληση για τον χρήστη. Για τη μετάβαση, η Microsoft έχει ειδική managed policy για τους χρήστες με per-user MFA.

> 🔗 **Πού πάει το MFA από εδώ και πέρα;** Διάβασε το **[Τέλος στα SMS/Voice MFA: Η Microsoft κάνει τα Passkeys default στο Entra ID](/posts/passkeys-by-default-telos-sms-voice-mfa/)**. Τα authentication strengths και το phishing-resistant MFA θα τα δούμε στο Μέρος 4.

## Security considerations

Ακόμη και σε επίπεδο εννοιών, υπάρχουν παγίδες που πρέπει να έχεις στο μυαλό σου πριν γράψεις την πρώτη πολιτική:

- **Το token εκδίδεται αν καμία πολιτική δεν ταιριάζει.** Τα κενά κάλυψης είναι αόρατα αν δεν τα ψάξεις. Ο στόχος είναι κάθε εφαρμογή να καλύπτεται από τουλάχιστον μία πολιτική.
- **Το Block είναι ισχυρό εργαλείο.** Μια πολιτική Block σε All resources μπορεί να κλειδώσει έξω και τους admins. Η Microsoft σημειώνει ότι σε αυτόν τον συνδυασμό δεν μπορείς να εξαιρέσεις σημαντικά endpoints όπως το Microsoft Graph.
- **Εξαίρεσε τους break-glass λογαριασμούς από όλες τις πολιτικές.** Η Microsoft προτείνει δύο cloud-only emergency access λογαριασμούς με Global Administrator, που χρησιμοποιούνται μόνο όταν όλοι οι άλλοι admins έχουν κλειδωθεί έξω.
- **Τα service principals δεν μπλοκάρονται από πολιτικές για χρήστες.** Για αυτά υπάρχει το Conditional Access for workload identities, που θα δούμε στο Μέρος 4.
- **Το device platform δεν είναι αξιόπιστο signal από μόνο του.** Βγαίνει από πηγές που δεν επαληθεύονται, όπως το user agent string, που μπορεί να αλλάξει. Μην βασίζεις μια πολιτική Block μόνο σε αυτό.
- **Το legacy authentication παρακάμπτει το MFA.** Δεν υποστηρίζει MFA, άρα ένας επιτιθέμενος με τον σωστό κωδικό μπορεί να μπει μέσω παλιού πρωτοκόλλου. Η Microsoft αναφέρει ότι πάνω από το 99% των password spray επιθέσεων χρησιμοποιεί legacy authentication.

## Governance: τι σημαίνει για τον οργανισμό

Σε αυτό το στάδιο το governance αφορά τρεις αποφάσεις, που αξίζει να καταγραφούν πριν από οποιαδήποτε ρύθμιση:

- **Ποιος έχει την ευθύνη.** Οι πολιτικές Conditional Access δεν έχουν πεδίο owner. Η Microsoft προτείνει να κωδικοποιείται η ιδιοκτησία στο όνομα της πολιτικής και να τηρείται ξεχωριστό μητρώο.
- **Ποιοι ρόλοι αγγίζουν τις πολιτικές.** Για ανάγνωση αρκεί ο ρόλος Security Reader. Για δημιουργία και αλλαγή χρειάζεται Conditional Access Administrator, ιδανικά με ενεργοποίηση just-in-time μέσω PIM.
- **Πώς επικοινωνείται η αλλαγή.** Οι χρήστες πρέπει να ξέρουν τι αλλάζει, πότε, και πού ζητούν βοήθεια.

Υπάρχει και ένα τεχνικό όριο που επηρεάζει το governance: **240 πολιτικές ανά tenant**, συμπεριλαμβανομένων όσων είναι σε report-only ή off. Ο σωστός δρόμος είναι λίγες, καλά ομαδοποιημένες πολιτικές, όχι μία πολιτική ανά εφαρμογή. Naming conventions, change management και policy-as-code θα τα δούμε στο Μέρος 6.

## Licensing σε μια ματιά

| Δυνατότητα | Τι χρειάζεσαι |
| --- | --- |
| Conditional Access | Microsoft Entra ID P1 ή Microsoft 365 Business Premium |
| Risk-based πολιτικές (sign-in risk, user risk) | Microsoft Entra ID P2 (Microsoft Entra ID Protection) |
| Πολιτικές για workload identities | Microsoft Entra Workload ID |
| Compliant device, app protection | Microsoft Intune |
| Έλεγχος συνεδρίας (Conditional Access App Control) | Microsoft Defender for Cloud Apps |
| Security defaults | Καμία επιπλέον άδεια |

Αν λήξουν οι άδειες, οι πολιτικές **δεν απενεργοποιούνται ούτε διαγράφονται**. Μπορείς να τις δεις και να τις διαγράψεις, αλλά όχι να τις αλλάξεις. Η Microsoft το σχεδίασε έτσι ώστε η μετάβαση να μη φέρει απότομη αλλαγή στο επίπεδο ασφάλειας.

## Τι σημαίνει για τη συμμόρφωση

Το Conditional Access είναι ο τεχνικός μηχανισμός που μετατρέπει την πολιτική ελέγχου πρόσβασης από έγγραφο σε κάτι που εφαρμόζεται σε κάθε sign-in. Ο ελεγκτής θα σου ζητήσει δύο πράγματα: την εγκεκριμένη πολιτική και την απόδειξη ότι εφαρμόζεται. Το Conditional Access καλύπτει το δεύτερο, με τις πολιτικές στο Entra admin center και τα sign-in logs ως τεκμήριο.

> 🔗 **Χρειάζεσαι τεκμηρίωση συμμόρφωσης;** Το Conditional Access στηρίζει τις απαιτήσεις [13.α](/kya-1689-2025/#13-α) (πολιτική λογικού ελέγχου πρόσβασης) και [13.ζ](/kya-1689-2025/#13-ζ) (MFA), όπως τις αναλύει ο **[οδηγός της ΚΥΑ 1689/2025](/kya-1689-2025/)**. Στον οδηγό για την **[Οδηγία NIS2](/nis2/)** αντιστοιχεί στα [21.2.θ](/nis2/#21-2-θ) και [21.2.ι](/nis2/#21-2-ι), στο **[ISO/IEC 27001](/iso-27001/)** στα [A.5.15](/iso-27001/#A-5-15) και [A.8.5](/iso-27001/#A-8-5), και στον **[GDPR](/gdpr/)** στα [5.1.στ](/gdpr/#5-1-στ) και [32.1.β](/gdpr/#32-1-β). Ο καθένας έχει checklist σε Excel.

## Τι έρχεται στο Μέρος 2

Τώρα που ξέρεις πώς σκέφτεται το φανάρι, στο Μέρος 2 ανοίγουμε μια πολιτική και βλέπουμε τα δομικά της στοιχεία ένα προς ένα: Assignments, Target resources, Conditions, Grant και Session controls. Θα δούμε επίσης πότε μια πολιτική ενεργοποιείται και πώς λειτουργούν τα **Require all selected controls** και **Require one of the selected controls**.

{{< if-published page="/posts/Conditional-Access-Series/conditional-access-meros-2-politikes-kai-mixanismoi" >}}
> 📖 **Συνέχισε στο Μέρος 2:** [Η ανατομία μιας πολιτικής, από τα Assignments ως τα Session controls](/posts/conditional-access-series/conditional-access-meros-2-politikes-kai-mixanismoi/)
{{< /if-published >}}

> 🔗 **Όλη η σειρά σε ένα σημείο:** τα 6 μέρη και η σειρά ανάγνωσης στη **[σελίδα της σειράς](/series/microsoft-entra-conditional-access/)**.

> 🔗 **Ήδη χρησιμοποιείς Conditional Access;** Δες πώς το Token Protection κλείνει το κενό του token replay, και πού δεν φτάνει, στο **[Entra Token Protection και Bulk Enrollment](/posts/entra-token-protection-bulk-enrollment-limitation/)**.

Ακολούθησέ με στο [LinkedIn](https://www.linkedin.com/in/dimosthenisatteia/) για ειδοποιήσεις νέων άρθρων.

## Πηγές και επαλήθευση {#last-verified}

{{< verification >}}

---

<!--
IMAGE NOTES
Cover: ca-meros-1-anim.webp (animated WebP: τα 3 φώτα ανάβουν με τη σειρά, 1,5 s το καθένα. Στατική εκδοχή: ca-meros-1.webp) (1200x500, ίδια βάση με Conditional-Access.webp, ετικέτα «Μέρος 1»)
Image 1: ca-signal-decision-enforcement-microsoft.webp (επίσημο διάγραμμα της Microsoft, από το MicrosoftDocs/entra-docs, άδεια MIT)
Image 2: ca-evaluation-flow.webp (διάγραμμα, όχι screenshot)
Image 3: ca-signals-verify-apps-microsoft.webp (επίσημο διάγραμμα της Microsoft, από το MicrosoftDocs/entra-docs, άδεια MIT)
Save to content/images/Conditional-Access/
ΗΜΕΡΑ ΔΗΜΟΣΙΕΥΣΗΣ: draft: false εδώ ΚΑΙ στο content/series/microsoft-entra-conditional-access/_index.md, πραγματική date/lastmod,
popup «Νέα στο blog» (STORAGE_KEY +1), homeHighlight: true, banner «Έρχεται σύντομα», xlsx checklists, LinkedIn post.
-->
