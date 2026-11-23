---
title: "Microsoft Entra Conditional Access Μέρος 6: Governance και Zero Trust, από τις πολιτικές σε πρόγραμμα"
seoTitle: "Conditional Access Μέρος 6: governance και Zero Trust"
# Προσωρινή ημερομηνία: αλλάζει στην πραγματική ημερομηνία δημοσίευσης
date: 2026-10-19T14:00:00+03:00
lastmod: 2026-10-19T14:00:00+03:00
draft: true
keywords:
  - Conditional Access break-glass accounts
  - emergency access accounts Entra ID
  - Conditional Access contingency policies
  - Conditional Access resilience defaults
  - Conditional Access naming convention
  - Conditional Access policy-as-code
  - Conditional Access protected actions
  - cross-tenant access settings trust MFA
  - Tenant Configuration Management drift
  - Conditional Access maturity model
tags:
  - Conditional Access
  - Microsoft Entra ID
  - Zero Trust
  - Governance
  - Break-glass
  - Microsoft Graph
  - PowerShell
  - Identity Security
  - Microsoft 365 Security
author: "Dimosthenis Atteia"
description: "Πώς κάνεις το Conditional Access πρόγραμμα: break-glass και contingency πολιτικές, συγκρούσεις, naming και ownership, policy-as-code, cross-tenant trust και maturity model. Μέρος 6."
summary: "Στο τελευταίο μέρος της σειράς περνάς από τις μεμονωμένες πολιτικές σε ένα πρόγραμμα: break-glass λογαριασμοί και ανάκαμψη από lockout, πώς συνδυάζονται οι πολιτικές, governance με naming, ownership και protected actions, policy-as-code με Microsoft Graph, hybrid και multi-tenant περιβάλλοντα, και ένα maturity model με μετρικές."
categories: ["Identity & Access"]
series: ["Microsoft Entra Conditional Access"]
ShowToc: true
TocOpen: false
cover:
  image: "/images/Conditional-Access/ca-meros-6.webp"
  alt: "Microsoft Entra Conditional Access Μέρος 6: Governance και Zero Trust πρόγραμμα"
  caption: "Microsoft Entra Conditional Access: Ο Πλήρης Οδηγός"
  relative: false
ShowReadingTime: true
ShowWordCount: true
# Πλαίσιο «Last verified»: κάθε χαρακτηριστικό με τη φάση, την άδεια, την πηγή και την ημερομηνία ελέγχου
verification:
  - feature: "Emergency access (break-glass) λογαριασμοί"
    status: "Generally Available"
    license: "Microsoft Entra ID P1 για τις εξαιρέσεις στις πολιτικές"
    source: "https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/security-emergency-access"
    verified: 2026-10-19
  - feature: "Contingency πολιτικές (resilient access controls)"
    status: "Generally Available"
    license: "Microsoft Entra ID P1"
    source: "https://learn.microsoft.com/en-us/entra/identity/authentication/concept-resilient-controls"
    verified: 2026-10-19
  - feature: "Resilience defaults"
    status: "Generally Available"
    license: "Microsoft Entra ID P1"
    source: "https://learn.microsoft.com/en-us/entra/identity/conditional-access/resilience-defaults"
    verified: 2026-10-19
  - feature: "Protected actions για αλλαγές πολιτικών"
    status: "Generally Available"
    license: "Microsoft Entra ID P1"
    source: "https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/protected-actions-add"
    verified: 2026-10-19
  - feature: "Enforcement για All resources με resource exclusions (baseline scopes)"
    status: "Σε phased rollout από τον Μάρτιο του 2026"
    license: "Microsoft Entra ID P1"
    source: "https://learn.microsoft.com/en-us/entra/identity/conditional-access/concept-enforcement-resource-exclusions"
    verified: 2026-10-19
  - feature: "Microsoft Graph conditionalAccessPolicy API (policy-as-code)"
    status: "Generally Available"
    license: "Microsoft Entra ID P1"
    source: "https://learn.microsoft.com/en-us/graph/api/resources/conditionalaccesspolicy"
    verified: 2026-10-19
  - feature: "Tenant Configuration Management APIs (snapshots και drift)"
    status: "Generally Available (η εμπειρία στο admin center: Public Preview)"
    license: "Microsoft Entra ID P1"
    source: "https://learn.microsoft.com/en-us/entra/id-governance/tenant-governance/licensing"
    verified: 2026-10-19
  - feature: "Cross-tenant access settings: trust για MFA και device claims"
    status: "Generally Available"
    license: "Microsoft Entra ID P1 για τις πολιτικές που τα αξιοποιούν"
    source: "https://learn.microsoft.com/en-us/entra/external-id/cross-tenant-access-settings-b2b-collaboration"
    verified: 2026-10-19
  - feature: "Optimization Agent: policy consolidation και MFA gap analysis"
    status: "Generally Available"
    license: "Microsoft Entra ID P1 και Microsoft Security Copilot (SCU)"
    source: "https://learn.microsoft.com/en-us/entra/security-copilot/conditional-access-agent-optimization"
    verified: 2026-10-19
# MITRE ATT&CK®: ονόματα στο data/mitre.yaml
mitre: ["T1078.004", "T1098", "T1199", "M1026", "M1047"]
---

> 🚦 **Σειρά Microsoft Entra Conditional Access, Μέρος 6 από 6.** Στα πέντε πρώτα μέρη έμαθες τι είναι κάθε πολιτική, πώς τη στήνεις και πώς αποδεικνύεις τι κάνει. Εδώ τις βάζεις σε πρόγραμμα: ποιος τις έχει, πώς αλλάζουν, τι γίνεται όταν κάτι χαλάσει, και πώς μετράς την πρόοδο.

## Από τις πολιτικές στο πρόγραμμα

Ένας tenant με 40 πολιτικές Conditional Access δεν έχει πρόβλημα ρύθμισης. Έχει πρόβλημα διαχείρισης. Κανείς δεν θυμάται γιατί υπάρχει η CA17, ποιος πρόσθεσε την εξαίρεση στον λογαριασμό του προμηθευτή, και αν η πολιτική που απενεργοποιήθηκε «προσωρινά» πέρυσι χρειάζεται ακόμη.

Το Conditional Access γίνεται πρόγραμμα όταν απαντάς σε έξι ερωτήσεις:

| Ερώτηση | Ενότητα |
| --- | --- |
| Τι κάνω αν κλειδωθώ έξω ή αν πέσει το MFA; | Break-glass και contingency πολιτικές |
| Τι γίνεται όταν δύο πολιτικές αφορούν τον ίδιο χρήστη; | Συγκρούσεις πολιτικών |
| Ποιος είναι υπεύθυνος για κάθε πολιτική και πώς αλλάζει; | Governance |
| Πώς ελέγχω, αναιρώ και τεκμηριώνω τις αλλαγές; | Policy-as-code |
| Πώς δουλεύω με συνεργάτες και άλλους tenants; | Hybrid και multi-tenant |
| Πού βρίσκομαι και ποιο είναι το επόμενο βήμα; | Maturity model |

## Break-glass λογαριασμοί και ανάκαμψη από lockout

Στα προηγούμενα μέρη εξαιρούσες τους break-glass λογαριασμούς από κάθε πολιτική. Εδώ βλέπεις πώς τους στήνεις σωστά και τι άλλο χρειάζεσαι για να επιβιώσεις μια διακοπή.

### Πότε τους χρειάζεσαι

Η Microsoft περιγράφει συγκεκριμένα σενάρια:

- Οι λογαριασμοί είναι federated και ο identity provider δεν είναι διαθέσιμος.
- Οι admins δεν μπορούν να κάνουν MFA, π.χ. διακοπή κινητού δικτύου όταν η μόνη μέθοδος είναι SMS ή κλήση.
- Ο τελευταίος Global Administrator έφυγε από τον οργανισμό ή ο λογαριασμός του διαγράφηκε on-premises.
- Φυσική καταστροφή, όπου τα δίκτυα δεν λειτουργούν.
- Όλες οι αναθέσεις Global Administrator και Privileged Role Administrator στο PIM είναι eligible, η ενεργοποίηση θέλει έγκριση, και δεν υπάρχει κανείς να εγκρίνει.

Και φυσικά, μια λάθος πολιτική Conditional Access που κλειδώνει έξω όλους τους admins.

### Πώς τους στήνεις

1. **Δύο ή περισσότεροι λογαριασμοί, cloud-only**, στο domain `*.onmicrosoft.com`. Όχι federated, όχι synchronized από το on-premises.
2. **Μόνιμη ανάθεση Global Administrator.** Όχι eligible στο PIM, γιατί η ενεργοποίηση μπορεί να είναι ακριβώς αυτό που δεν λειτουργεί.
3. **Passwordless μέθοδος.** Η Microsoft προτείνει **passkey (FIDO2)**, ή **certificate-based authentication** αν έχεις ήδη PKI. Και οι δύο ικανοποιούν το mandatory MFA που επιβάλλει πλέον η Microsoft στα admin portals και στο Azure. Ένας break-glass λογαριασμός μόνο με password δεν θα μπει στο Azure portal.
4. **Όχι προσωπικές συσκευές.** Η μέθοδος δεν δένεται στο κινητό ή στο email κάποιου admin.
5. **Μια ομάδα, π.χ. `EmergencyAccess`,** εξαιρεμένη από κάθε πολιτική που μπλοκάρει ή περιορίζει το sign-in. Οι report-only πολιτικές δεν μπλοκάρουν, οπότε δεν χρειάζονται εξαίρεση.
6. **Φύλαξη σε χρηματοκιβώτια**, σε διαφορετικά σημεία. Τα security keys σε ξεχωριστούς χώρους, με διαδικασία που απαιτεί δύο πρόσωπα.

Ένα σημείο που ξεχνιέται: το phishing-resistant authentication method προστατεύει τον λογαριασμό. Η εξαίρεση από το Conditional Access δεν τον αφήνει απροστάτευτο. Τον αφήνει χρησιμοποιήσιμο.

### Ειδοποίηση σε κάθε χρήση

Ένας break-glass λογαριασμός δεν πρέπει να έχει καμία δραστηριότητα. Κάθε sign-in, αλλαγή password, αλλαγή ρόλου ή νέα μέθοδος είναι συμβάν που θέλει εξήγηση. Η Microsoft προτείνει alert rule στο Azure Monitor πάνω στα sign-in logs, με το **Object ID** των λογαριασμών:

```kusto
SigninLogs
| where UserId in ("<object-id-1>", "<object-id-2>")
| project TimeGenerated, UserPrincipalName, AppDisplayName, IPAddress, ResultType
```

Το alert ενεργοποιείται όταν τα αποτελέσματα είναι **περισσότερα από 0**, με έλεγχο κάθε **5 λεπτά**, και στέλνει email και SMS μέσω ενός action group.

[![Το Alert logic ενός alert rule στο Azure Monitor για break-glass λογαριασμούς](/images/Conditional-Access/ca-p6-break-glass-alert.webp)](/images/Conditional-Access/ca-p6-break-glass-alert.webp)
> 📷 **Εικόνα 1:** Το Alert logic του alert rule: Static threshold, Operator Greater than, Threshold value 0, Frequency of evaluation 5 minutes. Screenshot © Microsoft, από το [Manage emergency access accounts in Microsoft Entra ID](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/security-emergency-access).

Πρόσθεσε και ένα δεύτερο alert στα `AuditLogs`, για κάθε αλλαγή στους ίδιους λογαριασμούς. Αν έχεις Microsoft Sentinel, το ίδιο query γίνεται analytics rule.

### Δοκιμή κάθε τρεις μήνες

Ένας break-glass λογαριασμός που δεν δοκιμάστηκε είναι υπόθεση, όχι έλεγχος. Η Microsoft προτείνει δοκιμή **τουλάχιστον κάθε 90 ημέρες**, και επιπλέον όταν αλλάζει το προσωπικό του IT ή οι συνδρομές του Microsoft Entra:

1. Ενημέρωσε πρώτα την ομάδα monitoring ότι ακολουθεί δοκιμή.
2. Επιβεβαίωσε ποιοι έχουν πρόσβαση στα credentials.
3. Κάνε sign-in και μια διαχειριστική ενέργεια.
4. Έλεγξε ότι έφτασε το alert.
5. Έλεγξε ότι κανείς δεν έχει καταχωρίσει MFA ή SSPR σε προσωπική του συσκευή.
6. Ενημέρωσε το runbook και άλλαξε τους συνδυασμούς των χρηματοκιβωτίων αν έφυγε κάποιος.

### Όταν το πρόβλημα δεν είναι οι admins: contingency πολιτικές

Οι break-glass λογαριασμοί σώζουν τους admins. Οι χρήστες χρειάζονται κάτι άλλο. Αν πέσει ο πάροχος MFA ή ο έλεγχος συμμόρφωσης συσκευών, μια πολιτική «MFA για όλους» μπλοκάρει όλο τον οργανισμό.

Η Microsoft προτείνει δύο επίπεδα:

**Μείωση του κινδύνου εκ των προτέρων.** Πολλαπλές μέθοδοι ανά χρήστη, και πολιτικές με εναλλακτικά controls. Μια πολιτική με **Require MFA** ή **Require compliant device**, με **Require one of the selected controls**, δεν κολλάει αν πέσει μόνο το ένα.

**Contingency πολιτικές.** Έτοιμες πολιτικές για συγκεκριμένη διαταραχή, που στενεύουν την πρόσβαση αντί να την ανοίγουν όλη. Για παράδειγμα, σε διακοπή MFA: πρόσβαση μόνο για μια ομάδα κρίσιμων χρηστών, μόνο στο Exchange και στο SharePoint, μόνο από hybrid joined συσκευές και από το εταιρικό δίκτυο. Οι υπόλοιποι παραμένουν μπλοκαρισμένοι.

Πριν γράψεις contingency πολιτικές, χωρίζεις τις εφαρμογές σε τρεις κατηγορίες: όσες δεν αντέχουν διακοπή πάνω από λίγα λεπτά, όσες χρειάζονται σε λίγες ώρες, και όσες περιμένουν μέρες. Οι πολιτικές γράφονται μόνο για τις δύο πρώτες.

Οι contingency πολιτικές μένουν σε **report-only** όσο δεν χρειάζονται, ώστε να βλέπεις τι θα έκαναν. Το όνομα ακολουθεί σταθερό μοτίβο:

```text
EMnnn - ENABLE IN EMERGENCY: [Disruption][i/n] - [Apps] - [Controls] [Conditions]
```

Π.χ. `EM001 - ENABLE IN EMERGENCY: MFA Disruption[1/4] - Exchange SharePoint - Require Microsoft Entra hybrid join`. Το `[1/4]` λέει τη σειρά ενεργοποίησης. Στη διάρκεια μιας κρίσης δεν σκέφτεσαι, ακολουθείς τη σειρά.

> ⚠️ **Η ενεργοποίηση contingency πολιτικής μειώνει την ασφάλεια.** Είναι συνειδητή απόφαση, όχι διόρθωση. Μετά τη διαταραχή: ενεργοποιείς ξανά τις κανονικές πολιτικές, γυρνάς τις contingency σε report-only, κάνεις revoke τα refresh tokens όσων χρησιμοποίησαν τις εξαιρέσεις, αλλάζεις τα credentials του break-glass αν χρησιμοποιήθηκε, και ελέγχεις τα risk detections της περιόδου.

### Resilience defaults: τι γίνεται όταν πέσει το ίδιο το Entra ID

Αν το κύριο authentication service δεν είναι διαθέσιμο, το **Backup Authentication Service** εκδίδει tokens για **υπάρχουσες συνεδρίες**. Δεν υποστηρίζει νέες συνεδρίες ούτε guests. Επειδή δεν μπορεί να αξιολογήσει όλες τις conditions σε πραγματικό χρόνο, κάθε πολιτική έχει τη ρύθμιση **resilience defaults**:

- **Enabled (προεπιλογή):** η πολιτική αξιολογείται με τα δεδομένα από την αρχή της συνεδρίας.
- **Disabled:** αν μια condition δεν αξιολογείται σε πραγματικό χρόνο, η πρόσβαση μπλοκάρεται.

Η Microsoft προτείνει να μένουν ενεργά. Αν τα απενεργοποιήσεις σε πολιτική που στοχεύει ομάδα ή ρόλο, μπλοκάρεις στη διακοπή **όλους** τους χρήστες της εφαρμογής, όχι μόνο τα μέλη της ομάδας, γιατί η συμμετοχή σε ομάδα δεν αξιολογείται εκείνη τη στιγμή.

### Αν διαγραφεί μια πολιτική

Μια διαγραμμένη πολιτική ή named location επαναφέρεται μέσα σε **30 ημέρες** (soft delete), από το admin center ή από το Microsoft Graph. Μετά χάνεται. Γι' αυτό το export που είδες στο Μέρος 5, και το policy-as-code παρακάτω, είναι κομμάτι του σχεδίου ανάκαμψης.

## Συγκρούσεις πολιτικών: πώς συνδυάζονται

Το Conditional Access δεν έχει προτεραιότητες ούτε σειρά. Ο κανόνας είναι ένας: **όλες οι πολιτικές που εφαρμόζονται πρέπει να ικανοποιηθούν**.

### Οι τρεις κανόνες του συνδυασμού

1. **Μέσα σε μια πολιτική, οι assignments συνδυάζονται με AND.** Χρήστης, εφαρμογή και conditions πρέπει να ταιριάξουν όλα για να εφαρμοστεί.
2. **Ανάμεσα σε πολιτικές, τα controls αθροίζονται.** Αν μία ζητά MFA και άλλη compliant device, ο χρήστης κάνει και τα δύο.
3. **Το Block κερδίζει πάντα.** Στη φάση επιβολής, αν μια πολιτική που εφαρμόζεται έχει Block, η αξιολόγηση σταματά εκεί. Καμία άλλη πολιτική δεν το ακυρώνει.

Από αυτό προκύπτει κάτι που ξαφνιάζει: **μια εξαίρεση ισχύει μόνο για την πολιτική όπου μπήκε.** Αν εξαιρέσεις έναν χρήστη από την πολιτική MFA των admins, θα κάνει MFA αν τον πιάνει η πολιτική MFA για όλους. Γι' αυτό η Microsoft ζητά να δοκιμάζεις ρητά τις εξαιρέσεις, όχι μόνο τις πολιτικές.

### Εξαιρέσεις που δεν είναι πια εξαιρέσεις

Ως τώρα, μια πολιτική σε **All resources** με εξαίρεση εφαρμογής άφηνε εκτός επιβολής κάποια βασικά scopes, όπως `openid`, `profile` και `User.Read`, για να μη σπάνε οι εφαρμογές που διαβάζουν το προφίλ του χρήστη. Από τον **Μάρτιο του 2026**, σε phased rollout, αυτά αξιολογούνται πλέον ως πρόσβαση στο Windows Azure Active Directory. Αποτέλεσμα: εφαρμογές που ζητούν μόνο αυτά, π.χ. το Azure CLI ή το VS Code, μπορεί να ζητήσουν ξαφνικά MFA.

Για να βρεις ποιες πολιτικές επηρεάζονται:

```http
GET https://graph.microsoft.com/v1.0/identity/conditionalAccess/policies?$filter=conditions/applications/includeApplications/any(a:a eq 'All') and conditions/applications/excludeApplications/any()&$select=id,displayName
```

Η πιο καθαρή λύση είναι αυτή που προτείνει ήδη η Microsoft: μια βασική πολιτική MFA σε **All users και All resources χωρίς εξαιρέσεις εφαρμογών**.

### Πώς βρίσκεις συγκρούσεις πριν τις βρουν οι χρήστες

- **What If** με τον συγκεκριμένο χρήστη και εφαρμογή. Δείχνει όλες τις πολιτικές που θα εφαρμοστούν μαζί (Μέρος 5).
- **Πίνακας ανά persona.** Για admins, χρήστες, guests και service accounts, γράψε ποιες πολιτικές τους αφορούν. Αν δύο γραμμές ζητούν αντίθετα πράγματα, το βλέπεις στο χαρτί.
- **Optimization Agent**, όπου είναι διαθέσιμος, που εντοπίζει επικαλυπτόμενες πολιτικές. Τον βλέπουμε στο maturity model.

## Governance: naming, ownership και change management

### Naming standard και registry

Στο Μέρος 3 είδες το naming standard της Microsoft. Σε ένα πρόγραμμα έχει και δεύτερο ρόλο. Οι πολιτικές Conditional Access **δεν έχουν πεδίο owner**. Η Microsoft προτείνει να κωδικοποιείς την ιδιοκτησία στο όνομα, π.χ. με πρόθεμα ομάδας, και να κρατάς ένα **registry εκτός Entra ID** που αντιστοιχίζει κάθε πολιτική σε υπεύθυνο.

![Το naming standard για ενεργές και contingency πολιτικές, και τα πεδία του registry](/images/Conditional-Access/ca-p6-naming-standard.webp)
> 📷 **Εικόνα 2:** Το naming standard της Microsoft για ενεργή πολιτική (CA01) και για contingency πολιτική (EM01), και τα τέσσερα πεδία του registry: ταυτότητα, ευθύνη, εξαιρέσεις, ίχνος.

Το registry δεν χρειάζεται εργαλείο. Ένα SharePoint list ή ένα αρχείο στο repository του policy-as-code αρκεί, αρκεί να έχει:

| Πεδίο | Γιατί |
| --- | --- |
| Όνομα και Policy ID | Το όνομα αλλάζει, το ID όχι |
| Σκοπός | Ποιον κίνδυνο καλύπτει |
| Owner και εγκρίνων | Ποιος απαντά για την πολιτική |
| Εξαιρέσεις με αιτιολογία και λήξη | Η πιο συχνή αιτία κενών |
| Τελευταίο review | Απόδειξη περιοδικής αξιολόγησης |
| Αντιστοίχιση σε απαιτήσεις | ΚΥΑ, ISO, πολιτική ασφάλειας |

### Ποιος αλλάζει πολιτικές

Οι ρόλοι που μπορούν να γράψουν είναι λίγοι: **Conditional Access Administrator**, **Security Administrator** και **Global Administrator**. Τρεις κανόνες:

- **Λίγα άτομα, eligible όχι μόνιμα.** Με PIM, ο ρόλος ενεργοποιείται για την αλλαγή και λήγει. Το PIM θέλει Microsoft Entra ID P2.
- **Ανάγνωση για όλους τους άλλους.** Security Reader και Global Reader βλέπουν τις πολιτικές και τα logs χωρίς να αλλάζουν τίποτα.
- **Ξεχωριστοί admin λογαριασμοί** από τους καθημερινούς.

### Protected actions: ισχυρό MFA πριν από κάθε αλλαγή

Τα **protected actions** τα είδες στο Μέρος 2. Στο governance είναι ο τρόπος να ζητάς φρέσκο, ισχυρό authentication τη στιγμή της αλλαγής, όχι στο sign-in. Συνδέεις ένα authentication context με τα permissions του Conditional Access:

- `microsoft.directory/conditionalAccessPolicies/create`, `basic/update` και `delete`
- `microsoft.directory/namedLocations/create`, `basic/update` και `delete`

[![Η σελίδα Add protected actions με επιλεγμένα τα permissions των πολιτικών Conditional Access](/images/Conditional-Access/ca-p6-protected-actions.webp)](/images/Conditional-Access/ca-p6-protected-actions.webp)
> 📷 **Εικόνα 3:** Η σελίδα Add protected actions με authentication context «Phishing resistant» και επιλεγμένα τα permissions create, basic/update και delete για τις πολιτικές Conditional Access. Screenshot © Microsoft, από το [Add, test, or remove protected actions in Microsoft Entra ID](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/protected-actions-add).

Η σειρά έχει σημασία: πρώτα η πολιτική με το authentication context σε **On**, μετά τα protected actions. Αν η πολιτική είναι Off ή Report-only, ο admin θα βλέπει ατέρμονα αιτήματα επανελέγχου. Και ένα όριο: το Microsoft Graph PowerShell και το Graph Explorer υποστηρίζουν το step-up, το Azure PowerShell όχι.

### Change management για πολιτικές

Μια αλλαγή σε πολιτική Conditional Access έχει τον ίδιο κίνδυνο με μια αλλαγή firewall. Μια ελάχιστη διαδικασία:

1. **Αίτημα αλλαγής** με σκοπό, εμβέλεια και owner.
2. **Αντίγραφο σε report-only** με την αλλαγή, όπως στο Μέρος 5.
3. **Έλεγχος** με What If και report-only αποτελέσματα για τουλάχιστον μία εβδομάδα.
4. **Έγκριση** από τον owner, και από δεύτερο πρόσωπο για πολιτικές με Block.
5. **Υλοποίηση** με protected action, σε προκαθορισμένο παράθυρο.
6. **Επιβεβαίωση** στα sign-in logs και καταγραφή στο registry.
7. **Rollback** έτοιμο: disable της πολιτικής ή επαναφορά από το αποθηκευμένο JSON.

Οι **επείγουσες αλλαγές** στη διάρκεια περιστατικού παρακάμπτουν τα βήματα 2 έως 4, αλλά όχι την καταγραφή. Τεκμηριώνονται εκ των υστέρων.

## Policy-as-code: πολιτικές με version control

Η Microsoft προτείνει ρητά να διαχειρίζεσαι τις πολιτικές με το **Microsoft Graph** και το **Microsoft Graph PowerShell**, με μια ροή **policy-as-code** με source control και continuous integration, ώστε οι αλλαγές να ελέγχονται, να δοκιμάζονται και να αναιρούνται.

### Η ροή

| Βήμα | Τι γίνεται | Τι κερδίζεις |
| --- | --- | --- |
| Export | Κάθε πολιτική σε JSON, όπως στο Μέρος 5 | Αφετηρία και baseline |
| Repository | Τα JSON σε Git, ένα αρχείο ανά πολιτική | Ιστορικό και diff |
| Pull request | Κάθε αλλαγή με review από δεύτερο πρόσωπο | Η έγκριση γίνεται τεκμήριο |
| Pipeline | Validation και deploy μέσω Graph | Καμία χειροκίνητη αλλαγή |
| Drift check | Σύγκριση tenant με repository | Βλέπεις τις αλλαγές εκτός διαδικασίας |

### Ένα απλό deploy script

Για το repository, κράτα τα JSON στη μορφή του Graph API και όχι στη μορφή των objects του PowerShell SDK, που προσθέτει δικά της πεδία. Το export γίνεται με `Invoke-MgGraphRequest`:

```powershell
Connect-MgGraph -Scopes "Policy.Read.All"
$r = Invoke-MgGraphRequest -Method GET -Uri "https://graph.microsoft.com/v1.0/identity/conditionalAccess/policies"
$r.value | ForEach-Object {
    $_ | ConvertTo-Json -Depth 10 | Out-File ".\policies\$($_.id).json" -Encoding utf8
}
```

Το deploy script διαβάζει τα JSON και ενημερώνει ή δημιουργεί πολιτικές. Ένας κανόνας ασφάλειας: **κάθε νέα πολιτική δημιουργείται σε report-only**, ό,τι κι αν γράφει το αρχείο.

```powershell
# PowerShell 7. Το pipeline τρέχει με workload identity και certificate, όχι με admin λογαριασμό
Connect-MgGraph -ClientId $env:CA_APP_ID -TenantId $env:TENANT_ID `
    -CertificateThumbprint $env:CA_CERT_THUMBPRINT

$readOnly = 'id','createdDateTime','modifiedDateTime','templateId'
$existing = Get-MgIdentityConditionalAccessPolicy -All

Get-ChildItem .\policies\*.json | ForEach-Object {
    $body = Get-Content $_.FullName -Raw | ConvertFrom-Json -AsHashtable
    $id   = $body.id
    $readOnly | ForEach-Object { $body.Remove($_) }

    if ($id -and ($existing.Id -contains $id)) {
        Update-MgIdentityConditionalAccessPolicy -ConditionalAccessPolicyId $id -BodyParameter $body
        Write-Output "Updated: $($body.displayName)"
    }
    else {
        $body.state = 'enabledForReportingButNotEnforced'   # νέα πολιτική = report-only
        New-MgIdentityConditionalAccessPolicy -BodyParameter $body | Out-Null
        Write-Output "Created (report-only): $($body.displayName)"
    }
}
```

Η μετάβαση από report-only σε On γίνεται με δεύτερο pull request, αφού ελεγχθούν τα αποτελέσματα. Έτσι η επιβολή είναι πάντα ξεχωριστή, εγκεκριμένη απόφαση.

### Η ταυτότητα του pipeline είναι το πιο ευαίσθητο σημείο

Το app registration του pipeline χρειάζεται τα application permissions **`Policy.Read.All`** και **`Policy.ReadWrite.ConditionalAccess`**. Με αυτά μπορεί να αλλάξει κάθε πολιτική, και να εξαιρέσει οποιονδήποτε. Είναι ουσιαστικά Tier 0.

- **Χωρίς secrets.** Certificate, ή καλύτερα **workload identity federation** για GitHub Actions και Azure DevOps, ώστε να μην υπάρχει credential να διαρρεύσει.
- **Προστασία του branch.** Κανένα merge χωρίς review, κανένα deploy εκτός main.
- **Conditional Access για workload identities**, με Block εκτός των IP του pipeline. Θέλει άδεια **Workload Identities Premium** και αφορά μόνο single-tenant service principals.
- **Παρακολούθηση** των sign-ins του service principal στο **Service principal sign-ins**.

### Drift detection με το Tenant Configuration Management

Για να δεις αν κάποιος άλλαξε πολιτική εκτός pipeline, η Microsoft έχει πλέον τα **Tenant Configuration Management (TCM) APIs** στο Microsoft Graph, σε Generally Available. Ορίζεις ένα **baseline** σε JSON, π.χ. τις πολιτικές Conditional Access, και ένα **monitor** που το ελέγχει κάθε **έξι ώρες** και καταγράφει κάθε **drift**. Τα **snapshots** εξάγουν την τρέχουσα κατάσταση, χρήσιμα και ως τεκμήριο ελέγχου.

Με Microsoft Entra ID P1 έχεις έως **30 monitors** και **800 configuration resources ανά ημέρα**. Η εμπειρία στο admin center (**Tenant governance → Configuration management**) είναι σε Public Preview. Τα TCM APIs ανιχνεύουν, δεν διορθώνουν. Η διόρθωση γίνεται από το pipeline σου.

## Hybrid και multi-tenant περιβάλλοντα

### Hybrid: όταν ο identity provider είναι on-premises

Αν οι χρήστες σου είναι federated, π.χ. με AD FS, η διαθεσιμότητα του Conditional Access εξαρτάται από το on-premises. Τρία σημεία:

- **Οι break-glass λογαριασμοί είναι cloud-only.** Ακριβώς για να μην εξαρτώνται από το federation.
- **Password hash sync ως εφεδρεία.** Η Microsoft προτείνει, αν πέσει το AD FS, να γυρίσεις προσωρινά το domain από federated σε managed authentication. Αυτό λειτουργεί μόνο αν το password hash sync είναι ήδη ενεργό.
- **Hybrid joined συσκευές ως control.** Το **Require Microsoft Entra hybrid joined device** είναι χρήσιμο, και σε contingency πολιτικές, αλλά προϋποθέτει ότι η συσκευή έχει ολοκληρώσει την εγγραφή της.

Για οργανισμούς με πολλά sites, τα named locations ανά site δεν κλιμακώνονται καλά. Η εναλλακτική είναι το **compliant network** του Global Secure Access, που είδες στο Μέρος 3.

### Multi-tenant: πότε εμπιστεύεσαι το MFA ενός άλλου tenant

Όταν ένας guest από άλλο Microsoft Entra tenant μπαίνει στους πόρους σου, οι πολιτικές σου τον αφορούν. Χωρίς ρύθμιση, κάνει MFA **και** στο δικό σου tenant, και καμία πολιτική με compliant device δεν ικανοποιείται, γιατί η συσκευή του δεν είναι δική σου.

Τα **cross-tenant access settings** λύνουν αυτό με **inbound trust settings**:

[![Τα cross-tenant access settings με outbound και inbound ρυθμίσεις](/images/Conditional-Access/ca-p6-cross-tenant-overview.webp)](/images/Conditional-Access/ca-p6-cross-tenant-overview.webp)
> 📷 **Εικόνα 4:** Τα cross-tenant access settings: outbound στο home tenant του χρήστη, inbound στο resource tenant, με trust settings για MFA claims, compliant device claims και Microsoft Entra hybrid joined device claims. Διάγραμμα © Microsoft, από το [Overview: Cross-tenant access with Microsoft Entra External ID](https://learn.microsoft.com/en-us/entra/external-id/cross-tenant-access-overview).

Στο **Entra ID → External Identities → Cross-tenant access settings**, στο **Default settings** για όλους ή στο **Organizational settings** για έναν συγκεκριμένο οργανισμό, η καρτέλα **Trust settings** έχει τρεις επιλογές:

[![Οι inbound trust settings για MFA, compliant devices και hybrid joined devices](/images/Conditional-Access/ca-p6-inbound-trust.webp)](/images/Conditional-Access/ca-p6-inbound-trust.webp)
> 📷 **Εικόνα 5:** Inbound access settings, καρτέλα Trust settings: Trust multifactor authentication from Microsoft Entra tenants, Trust compliant devices, Trust Microsoft Entra hybrid joined devices. Screenshot © Microsoft, από το [Manage cross-tenant access settings for B2B collaboration](https://learn.microsoft.com/en-us/entra/external-id/cross-tenant-access-settings-b2b-collaboration).

Τέσσερα πράγματα που πρέπει να ξέρεις:

- **Το trust δεν καταργεί την πολιτική.** Η πολιτική MFA εξακολουθεί να εφαρμόζεται. Απλώς ικανοποιείται με το MFA που έγινε στο home tenant.
- **Εμπιστεύεσαι τη διαδικασία του άλλου.** Με το Trust compliant devices δέχεσαι την αξιολόγηση συμμόρφωσης του άλλου οργανισμού. Ενεργοποίησέ το μόνο για οργανισμούς που γνωρίζεις, στο Organizational settings, όχι στο Default.
- **Το B2B direct connect το απαιτεί.** Για Teams shared channels με πολιτικές MFA, το trust για MFA είναι προϋπόθεση.
- **Το GDAP είναι ειδική περίπτωση.** Οι τεχνικοί ενός Cloud Service Provider με granular delegated admin privileges κάνουν πάντα MFA στο δικό τους tenant, και αυτό γίνεται πάντα αποδεκτό στο δικό σου.

Μια προσοχή ακόμη: αν εμπιστεύεσαι το MFA των guests, εξαίρεσέ τους από την πολιτική **MFA registration** του ID Protection. Αλλιώς δεν μπορούν να ικανοποιήσουν και τις δύο.

## Maturity model: από το βασικό MFA σε μετρήσιμο Zero Trust

Το ερώτημα της διοίκησης δεν είναι «πόσες πολιτικές έχουμε». Είναι «πόσο προστατευμένοι είμαστε, και τι κάνουμε μετά». Ένα maturity model δίνει απάντηση σε γλώσσα που καταλαβαίνει.

![Maturity model για Conditional Access σε πέντε επίπεδα](/images/Conditional-Access/ca-p6-maturity-model.webp)
> 📷 **Εικόνα 6:** Το maturity model σε πέντε επίπεδα, από τα security defaults στο πρόγραμμα, με τη μετρική που αντιστοιχεί σε κάθε επίπεδο.

| Επίπεδο | Τι έχεις | Μέρος της σειράς | Άδεια |
| --- | --- | --- | --- |
| **1. Βασικό** | Security defaults ή Microsoft-managed policies | 1 | Free ή P1 |
| **2. Θεμέλια** | Break-glass, block legacy auth, MFA για όλους, phishing-resistant για admins, report-only πριν από κάθε επιβολή | 2, 3 | P1 |
| **3. Συσκευή και κίνδυνος** | Compliant device, app protection, risk-based πολιτικές, authentication strengths, cross-tenant trust | 3, 4, 6 | P1, P2 για τα risk-based |
| **4. Session και token** | CAE, token protection, authentication flows, compliant network, workload identities, protected actions, contingency πολιτικές | 4, 6 | P1, Workload ID Premium, Global Secure Access |
| **5. Πρόγραμμα** | Registry με owners, policy-as-code, drift detection, τριμηνιαίο review, δοκιμή break-glass, μετρικές προς τη διοίκηση | 5, 6 | P1 |

Το μοντέλο είναι δικό μας, πάνω στο πλάνο ανάπτυξης και στο Zero Trust guidance της Microsoft. Η σειρά μετρά: ένα επίπεδο 4 χωρίς break-glass λογαριασμούς είναι ρίσκο, όχι ωριμότητα.

### Οι μετρικές που αξίζουν

| Μετρική | Πηγή | Στόχος |
| --- | --- | --- |
| Χρήστες χωρίς πολιτική MFA | Optimization Agent ή What If ανά persona | 0, πλην break-glass |
| Sign-ins με legacy authentication | Sign-in logs, Client app | 0 |
| Εφαρμογές χωρίς πολιτική | Καρτέλα Coverage του Conditional Access | 0 |
| Admins με phishing-resistant MFA | Authentication methods activity | 100% |
| Εξαιρέσεις χωρίς ημερομηνία λήξης | Registry | 0 |
| Αλλαγές πολιτικών χωρίς ticket | Audit logs έναντι registry, TCM drifts | 0 |
| Τελευταία δοκιμή break-glass | Runbook | Κάτω από 90 ημέρες |

Κάθε μετρική έχει πηγή που μπορείς να δείξεις σε έναν ελεγκτή. Αυτό είναι το «μετρήσιμο» στο Zero Trust.

### Consolidation με τον Optimization Agent

Όπου είναι διαθέσιμος, ο **Conditional Access Optimization Agent** κάνει μέρος του review αυτόματα:

- **Policy consolidation:** εντοπίζει πολιτικές με ίδια grant controls. Δύο πολιτικές συγχωνεύονται αν διαφέρουν σε έως δύο conditions ή controls.
- **Deep analysis:** βρίσκει πολιτικές με υπερβολικά πολλές εξαιρέσεις, που αφήνουν κενά, ή **καθόλου** εξαιρέσεις, που σημαίνει κίνδυνο lockout, και προτείνει ρητή εξαίρεση των break-glass.
- **MFA gap analysis:** εντοπίζει χρήστες που δεν καλύπτονται από καμία πολιτική MFA. Οι report-only πολιτικές δεν μετρούν ως κάλυψη.

[![Πρόταση του Optimization Agent με MFA gap analysis](/images/Conditional-Access/ca-p6-agent-deep-analysis.webp)](/images/Conditional-Access/ca-p6-agent-deep-analysis.webp)
> 📷 **Εικόνα 7:** Μια πρόταση του Optimization Agent: 20 χρήστες χωρίς MFA, νέα πολιτική σε report-only, User impact και MFA gap analysis, με τα κουμπιά Review policy changes και Turn on policy. Screenshot © Microsoft, από το [Review and apply suggestions from the Conditional Access Optimization Agent](https://learn.microsoft.com/en-us/entra/security-copilot/conditional-access-agent-optimization-review-suggestions).

Ο agent δεν αλλάζει τίποτα χωρίς έγκριση admin, και κάθε νέα πολιτική που προτείνει δημιουργείται σε report-only. Αν δουλεύεις με policy-as-code, η πρόταση του agent είναι **input για pull request**, όχι αλλαγή κατευθείαν στον tenant. Αλλιώς το repository και ο tenant αποκλίνουν.

## Security considerations

- **Ο break-glass λογαριασμός είναι ο πιο ισχυρός λογαριασμός σου.** Phishing-resistant μέθοδος, φύλαξη με δύο πρόσωπα, alert σε κάθε χρήση. Η εξαίρεση από το Conditional Access δεν είναι εξαίρεση από τον έλεγχο.
- **Μια εξαίρεση μπορεί να είναι backdoor.** Ένας επιτιθέμενος με δικαιώματα admin δεν απενεργοποιεί πολιτικές, εξαιρεί τον εαυτό του. Παρακολούθησε τις αλλαγές στα exclusions, όχι μόνο στο state.
- **Το pipeline είναι Tier 0.** Όποιος ελέγχει το repository ή το service principal ελέγχει το Conditional Access.
- **Οι contingency πολιτικές είναι υποβάθμιση.** Μόνο σε report-only μέχρι να χρειαστούν, και με καθορισμένη διαδικασία επιστροφής.
- **Το cross-tenant trust μεταφέρει ευθύνη.** Εμπιστεύεσαι το MFA και τη συμμόρφωση συσκευών ενός άλλου οργανισμού. Μόνο για γνωστούς συνεργάτες, στο Organizational settings.
- **Μην απενεργοποιείς τα resilience defaults σε πολιτικές με ομάδες.** Στη διακοπή μπλοκάρεις όλους, όχι μόνο την ομάδα.

## Validation: test cases και αναμενόμενα αποτελέσματα

| # | Έλεγχος | Σενάριο | Αναμενόμενο αποτέλεσμα | Πού το βλέπεις |
| --- | --- | --- | --- | --- |
| 1 | Break-glass | Sign-in με passkey του break-glass | Επιτυχία, καμία πολιτική με Block ή MFA δεν εφαρμόζεται | Sign-in logs → Conditional Access |
| 2 | Alert | Το ίδιο sign-in | Email και SMS μέσα σε λίγα λεπτά | Azure Monitor → Alerts |
| 3 | Contingency | EM πολιτικές σε report-only | Report-only αποτελέσματα στα sign-ins της ομάδας contingency | Sign-in logs → Report-only |
| 4 | Συνδυασμός | Χρήστης εξαιρεμένος από μία πολιτική MFA | What If δείχνει άλλη πολιτική MFA που τον καλύπτει | What If → Policies that will apply |
| 5 | Protected actions | Αλλαγή πολιτικής από admin με απλό MFA | Ζητείται phishing-resistant authentication πριν από την αποθήκευση | Admin center |
| 6 | Policy-as-code | Νέα πολιτική μέσω pipeline με state On στο JSON | Δημιουργείται σε report-only | Policies → State |
| 7 | Drift | Χειροκίνητη αλλαγή σε πολιτική του baseline | Drift στο επόμενο monitor run (έως 6 ώρες) | Tenant governance → Monitors |
| 8 | Cross-tenant | Guest από trusted tenant με MFA στο home tenant | Δεν ζητείται δεύτερο MFA, η πολιτική ικανοποιείται | Sign-in logs → Authentication Details |

## Governance: τι σημαίνει για χρήστες, IT και οργανισμό

**Για τους χρήστες:** σε μια διακοπή, ξέρουν από πριν τι θα συμβεί. Μια σύντομη οδηγία στο intranet, «αν δεν λειτουργεί το MFA, δουλεύεις από εταιρική συσκευή στο γραφείο», μειώνει τον πανικό και τα αιτήματα στο helpdesk.

**Για το IT:** οι πολιτικές έχουν owner, οι αλλαγές περνούν από pull request και report-only, και το runbook του break-glass δοκιμάζεται κάθε τρίμηνο. Κανείς δεν αλλάζει πολιτική από το admin center «για λίγο».

**Για τον οργανισμό:** η διοίκηση βλέπει ένα επίπεδο ωριμότητας και επτά μετρικές, όχι μια λίστα πολιτικών. Αυτό είναι που ζητά ένας ελεγκτής: απόδειξη ότι ο έλεγχος πρόσβασης σχεδιάστηκε, λειτουργεί, αλλάζει ελεγχόμενα και αντέχει μια διακοπή.

## Licensing σε μια ματιά

| Δυνατότητα | Τι χρειάζεσαι |
| --- | --- |
| Break-glass εξαιρέσεις, contingency πολιτικές, resilience defaults, protected actions | Microsoft Entra ID P1 |
| Alert σε χρήση break-glass | Log Analytics workspace (Azure subscription) |
| PIM για τους ρόλους που αλλάζουν πολιτικές | Microsoft Entra ID P2 |
| Policy-as-code με Microsoft Graph | Χωρίς επιπλέον άδεια, πάνω στο P1 |
| Conditional Access για το service principal του pipeline | Workload Identities Premium |
| Tenant Configuration Management (30 monitors, 800 resources ανά ημέρα) | Microsoft Entra ID P1 |
| Cross-tenant trust settings σε πολιτικές | Microsoft Entra ID P1 |
| Optimization Agent | Microsoft Entra ID P1 και Security Copilot SCU |

## Τι σημαίνει για τη συμμόρφωση

Οι απαιτήσεις για έλεγχο πρόσβασης δεν σταματούν στο «έχουμε MFA». Ζητούν περιορισμό των προνομίων, περιοδική αξιολόγηση, ελεγχόμενες αλλαγές και συνέχεια σε περίπτωση διακοπής. Αυτό το άρθρο καλύπτει ακριβώς αυτό το κομμάτι: τον break-glass ως έλεγχο συνέχειας, το change management και το policy-as-code ως ίχνος αλλαγών, και το maturity model ως περιοδική αξιολόγηση.

> 🔗 **Χρειάζεσαι τεκμηρίωση συμμόρφωσης;** Τα μέτρα αυτού του άρθρου στηρίζουν τις απαιτήσεις [13.δ](/kya-1689-2025/#13-δ) (προνομιούχοι λογαριασμοί), [13.η](/kya-1689-2025/#13-η) (περιοδική αξιολόγηση του ελέγχου πρόσβασης), [16.α](/kya-1689-2025/#16-α) (διαχείριση αλλαγών) και [25.1.α](/kya-1689-2025/#25-1-α) (πλάνο επιχειρησιακής συνέχειας), όπως τις αναλύει ο **[οδηγός της ΚΥΑ 1689/2025](/kya-1689-2025/)**. Στον οδηγό για την **[Οδηγία NIS2](/nis2/)** αντιστοιχούν στα [21.2.γ](/nis2/#21-2-γ), [21.2.δ](/nis2/#21-2-δ) και [21.2.θ](/nis2/#21-2-θ), στο **[ISO/IEC 27001](/iso-27001/)** στα [A.5.15](/iso-27001/#A-5-15), [A.5.29](/iso-27001/#A-5-29), [A.5.30](/iso-27001/#A-5-30), [A.5.37](/iso-27001/#A-5-37) και [A.8.32](/iso-27001/#A-8-32), και στον **[GDPR](/gdpr/)** στα [32.1.β](/gdpr/#32-1-β) και [32.1.γ](/gdpr/#32-1-γ). Ο καθένας έχει checklist σε Excel.

## Η σειρά σε μία ματιά

Με αυτό το μέρος ολοκληρώνεται η σειρά. Αν ξεκινάς τώρα, διάβασέ τη με τη σειρά:

| Μέρος | Θέμα |
| --- | --- |
| **[1](/posts/conditional-access-series/conditional-access-meros-1-themeliodeis-ennoies/)** | Τι είναι, πώς αποφασίζει και γιατί είναι ο πυρήνας του Zero Trust |
| **[2](/posts/conditional-access-series/conditional-access-meros-2-politikes-kai-mixanismoi/)** | Η ανατομία μιας πολιτικής, από τα Assignments ως τα Session controls |
| **[3](/posts/conditional-access-series/conditional-access-meros-3-ylopoiisi-stin-praxi/)** | Από τον σχεδιασμό στις πρώτες πολιτικές, με ασφάλεια |
| **[4](/posts/conditional-access-series/conditional-access-meros-4-advanced-identity-security/)** | Advanced Identity Security, από τα passkeys ως τα workload identities |
| **[5](/posts/conditional-access-series/conditional-access-meros-5-troubleshooting-monitoring/)** | Troubleshooting και monitoring, πώς αποδεικνύεις τι συνέβη σε ένα sign-in |
| **6** | Governance και Zero Trust, από τις πολιτικές σε πρόγραμμα |

Το επόμενο βήμα δεν είναι νέα πολιτική. Είναι να βρεις σε ποιο επίπεδο του maturity model βρίσκεσαι, και να κλείσεις πρώτα ό,τι λείπει από το προηγούμενο.

> 🔗 **Όλη η σειρά σε ένα σημείο:** τα 6 μέρη και η σειρά ανάγνωσης στη **[σελίδα της σειράς](/series/microsoft-entra-conditional-access/)**.

Ακολούθησέ με στο [LinkedIn](https://www.linkedin.com/in/dimosthenisatteia/) για ειδοποιήσεις νέων άρθρων.

## Πηγές και επαλήθευση {#last-verified}

{{< verification >}}

---

<!--
IMAGE NOTES
Cover: ca-meros-6.webp (1200x500, ίδια βάση με τη σειρά, ετικέτα «Μέρος 6»)
Εικόνα 2: ca-p6-naming-standard.webp (δικό μας διάγραμμα: το naming της Microsoft για CA και EM πολιτικές, και τα πεδία του registry, που η Microsoft περιγράφει μόνο σε κείμενο)
Εικόνα 6: ca-p6-maturity-model.webp (δικό μας διάγραμμα, η Microsoft δεν έχει maturity model για Conditional Access)
Επίσημες εικόνες της Microsoft από το MicrosoftDocs/entra-docs (άδεια MIT), με «© Microsoft» και link στη λεζάντα:
  ca-p6-break-glass-alert.webp       <- identity/role-based-access-control/media/security-emergency-access/alert-logic.png
  ca-p6-protected-actions.webp       <- identity/role-based-access-control/media/protected-actions-add/permissions-select.png
  ca-p6-cross-tenant-overview.webp   <- external-id/media/cross-tenant-access-overview/cross-tenant-access-settings-overview.png
  ca-p6-inbound-trust.webp           <- external-id/media/cross-tenant-access-settings-b2b-collaboration/inbound-trust-settings.png
  ca-p6-agent-deep-analysis.webp     <- security-copilot/media/conditional-access-agent-optimization-review-suggestions/agent-deep-analysis.png
Save to content/images/Conditional-Access/
ΗΜΕΡΑ ΔΗΜΟΣΙΕΥΣΗΣ: draft: false, πραγματική date/lastmod, popup «Νέα στο blog» (STORAGE_KEY +1), homeHighlight: true, xlsx checklists, LinkedIn post.
-->
