---
title: "Microsoft Entra Conditional Access Μέρος 2: Η ανατομία μιας πολιτικής, από τα Assignments ως τα Session controls"
seoTitle: "Conditional Access Μέρος 2: η ανατομία μιας πολιτικής"
slug: conditional-access-meros-2-politikes-kai-mixanismoi
date: 2026-11-23T10:00:00+02:00
lastmod: 2026-11-23T10:00:00+02:00
draft: false
homeHighlight: true
keywords:
  - Conditional Access policy assignments
  - Conditional Access target resources
  - Conditional Access conditions
  - Conditional Access grant controls
  - Conditional Access session controls
  - Require all the selected controls
  - Require one of the selected controls
  - Authentication context
  - Protected actions Entra ID
  - Named locations Conditional Access
tags:
  - Conditional Access
  - Microsoft Entra ID
  - Zero Trust
  - Identity Security
  - MFA
  - Authentication Strength
  - Microsoft 365 Security
author: "Dimosthenis Atteia"
description: "Τα δομικά στοιχεία μιας πολιτικής Conditional Access ένα προς ένα: users, target resources, network, conditions, grant και session controls. Μέρος 2 της σειράς."
summary: "Στο δεύτερο μέρος της σειράς ανοίγεις μια πολιτική Conditional Access και βλέπεις κάθε ρύθμιση ξεχωριστά: ποιους αφορά, ποιους πόρους προστατεύει, με ποιες συνθήκες ενεργοποιείται, τι ζητά για να δώσει πρόσβαση και πώς περιορίζει τη συνεδρία. Με τις παγίδες που κρύβει κάθε επιλογή."
categories: ["Identity & Access"]
series: ["Microsoft Entra Conditional Access"]
ShowToc: true
TocOpen: false
cover:
  image: "/images/Conditional-Access/ca-meros-2.webp"
  alt: "Microsoft Entra Conditional Access Μέρος 2: Πολιτικές και μηχανισμοί"
  caption: "Microsoft Entra Conditional Access: Ο Πλήρης Οδηγός"
  relative: false
ShowReadingTime: true
ShowWordCount: true
# Πλαίσιο «Last verified»: κάθε χαρακτηριστικό με τη φάση, την άδεια, την πηγή και την ημερομηνία ελέγχου
verification:
  - feature: "Users, groups, directory roles και guest or external users"
    status: "Generally Available"
    license: "Microsoft Entra ID P1"
    source: "https://learn.microsoft.com/en-us/entra/identity/conditional-access/concept-conditional-access-users-groups"
    verified: 2026-11-23
  - feature: "Agents ως στόχος πολιτικής, agent risk, agent execution environments"
    status: "Public Preview"
    license: "Microsoft Entra ID P1 (agent risk: Microsoft Entra ID Protection)"
    source: "https://learn.microsoft.com/en-us/entra/identity/conditional-access/concept-conditional-access-conditions"
    verified: 2026-11-23
  - feature: "Target resources, user actions και authentication context"
    status: "Generally Available"
    license: "Microsoft Entra ID P1"
    source: "https://learn.microsoft.com/en-us/entra/identity/conditional-access/concept-conditional-access-cloud-apps"
    verified: 2026-11-23
  - feature: "Αλλαγή επιβολής σε All resources με resource exclusions (low privilege scopes)"
    status: "Σταδιακή εφαρμογή από τον Μάρτιο 2026"
    license: "Microsoft Entra ID P1"
    source: "https://learn.microsoft.com/en-us/entra/identity/conditional-access/concept-conditional-access-cloud-apps"
    verified: 2026-11-23
  - feature: "Network assignment, named locations, compliant network"
    status: "Generally Available"
    license: "Microsoft Entra ID P1 (compliant network: Global Secure Access)"
    source: "https://learn.microsoft.com/en-us/entra/identity/conditional-access/concept-assignment-network"
    verified: 2026-11-23
  - feature: "Insider risk condition"
    status: "Generally Available"
    license: "Microsoft Purview adaptive protection"
    source: "https://learn.microsoft.com/en-us/entra/identity/conditional-access/concept-conditional-access-conditions"
    verified: 2026-11-23
  - feature: "Authentication flows condition (device code flow, authentication transfer)"
    status: "Public Preview"
    license: "Microsoft Entra ID P1"
    source: "https://learn.microsoft.com/en-us/entra/identity/conditional-access/concept-conditional-access-conditions"
    verified: 2026-11-23
  - feature: "Grant controls (MFA, authentication strength, compliant device, app protection policy)"
    status: "Generally Available"
    license: "Microsoft Entra ID P1 (compliant device, app protection: Microsoft Intune)"
    source: "https://learn.microsoft.com/en-us/entra/identity/conditional-access/concept-conditional-access-grant"
    verified: 2026-11-23
  - feature: "Require approved client app (απόσυρση, μετάβαση σε app protection policy)"
    status: "Retirement"
    license: "Microsoft Entra ID P1, Microsoft Intune"
    source: "https://learn.microsoft.com/en-us/entra/identity/conditional-access/concept-conditional-access-grant"
    verified: 2026-11-23
  - feature: "Require identity verification (grant control)"
    status: "Public Preview"
    license: "Identity verification licensing (Microsoft Entra Verified ID)"
    source: "https://learn.microsoft.com/en-us/entra/identity/conditional-access/policy-require-identity-verification"
    verified: 2026-11-23
  - feature: "Session controls"
    status: "Generally Available"
    license: "Microsoft Entra ID P1 (App Control: Microsoft Defender for Cloud Apps)"
    source: "https://learn.microsoft.com/en-us/entra/identity/conditional-access/concept-conditional-access-session"
    verified: 2026-11-23
  - feature: "Protected actions"
    status: "Generally Available"
    license: "Microsoft Entra ID P1"
    source: "https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/protected-actions-overview"
    verified: 2026-11-23
# MITRE ATT&CK®: ονόματα στο data/mitre.yaml
mitre: ["T1078.004", "T1110.003", "T1199", "M1032"]
---

> 🚦 **Σειρά Microsoft Entra Conditional Access, Μέρος 2 από 6.** Στο **[Μέρος 1](/posts/conditional-access-series/conditional-access-meros-1-themeliodeis-ennoies/)** είδες πώς σκέφτεται το Conditional Access. Εδώ ανοίγεις μια πολιτική και βλέπεις κάθε ρύθμιση ξεχωριστά, με τις παγίδες της.

## Η ανατομία μιας πολιτικής

Μια πολιτική Conditional Access είναι μια πρόταση if-then με δύο μέρη: τα **Assignments**, δηλαδή το «αν», και τα **Access controls**, δηλαδή το «τότε». Τη δημιουργείς στο **Microsoft Entra admin center**, στη διαδρομή **Entra ID → Conditional Access → Policies → New policy**.

Η σελίδα της πολιτικής έχει πάντα την ίδια δομή:

| Ενότητα | Τι ορίζει | Ερώτηση |
| --- | --- | --- |
| **Users, agents or workload identities** | Ποιες ταυτότητες αφορά | Ποιος; |
| **Target resources** | Εφαρμογές, user actions ή authentication context | Πού; |
| **Network** | IP, χώρες, compliant network | Από πού; |
| **Conditions** | Risk, πλατφόρμα, client app, filter for devices και άλλα | Υπό ποιες συνθήκες; |
| **Grant** | Block ή Grant με απαιτήσεις | Τι ζητάμε; |
| **Session** | Περιορισμοί μέσα στη συνεδρία | Πώς περιορίζουμε; |
| **Enable policy** | Report-only, On ή Off | Επιβάλλεται; |

Για να επιβληθεί, μια πολιτική χρειάζεται τουλάχιστον **όνομα**, **χρήστες ή ομάδες**, **target resources** και **Grant ή Block**. Όλα τα υπόλοιπα είναι προαιρετικά.

[![Μια νέα πολιτική Conditional Access με το panel Target resources](/images/Conditional-Access/ca-p2-policy-target-resources.webp)](/images/Conditional-Access/ca-p2-policy-target-resources.webp)
> 📷 **Εικόνα 1:** Μια νέα πολιτική στο Microsoft Entra admin center. Αριστερά οι ενότητες Assignments και Access controls, δεξιά το panel Target resources με τις επιλογές Include και Exclude. Screenshot © Microsoft, από το [Conditional Access: Target resources](https://learn.microsoft.com/en-us/entra/identity/conditional-access/concept-conditional-access-cloud-apps).

### Πότε μια πολιτική εφαρμόζεται

Τρεις κανόνες αρκούν για να καταλάβεις κάθε πολιτική:

1. **Όλα τα assignments συνδυάζονται με AND.** Αν ορίσεις ομάδα, εφαρμογή και τοποθεσία, η πολιτική ενεργοποιείται μόνο όταν ισχύουν και τα τρία.
2. **Το Exclude νικά το Include.** Αν ένας χρήστης είναι και στις δύο λίστες, εξαιρείται.
3. **Όλες οι πολιτικές που ταιριάζουν πρέπει να ικανοποιηθούν.** Δεν υπάρχει προτεραιότητα ανάμεσα σε πολιτικές. Αν μία ζητά MFA και άλλη compliant device, ο χρήστης χρειάζεται και τα δύο. Αν μία έχει Block, το Block υπερισχύει.

### Require all ή Require one

Όταν επιλέγεις περισσότερα από ένα grant controls στην ίδια πολιτική, αποφασίζεις πώς συνδυάζονται:

- **Require all the selected controls** (AND): ο χρήστης πρέπει να ικανοποιήσει όλα. Είναι η προεπιλογή.
- **Require one of the selected controls** (OR): αρκεί ένα. Οι απαιτήσεις εμφανίζονται στη σειρά που ορίζει το Microsoft Entra ID και η πρόσβαση δίνεται μόλις ικανοποιηθεί μία.

Ένα τυπικό παράδειγμα του OR είναι το «compliant device **ή** Microsoft Entra hybrid joined device **ή** MFA». Ο χρήστης σε εταιρική συσκευή μπαίνει χωρίς επιπλέον βήμα, ενώ σε άλλη συσκευή κάνει MFA. Το AND ταιριάζει σε ευαίσθητα σενάρια, όπως «MFA **και** compliant device» για τους admins.

## Users, Groups, Directory Roles και Exclusions

Η πρώτη ερώτηση κάθε πολιτικής είναι ποιους αφορά. Οι επιλογές στο **Include** είναι:

- **None**: κανένας χρήστης. Χρήσιμο μόνο όσο σχεδιάζεις.
- **All users**: όλοι οι χρήστες του directory, **μαζί με τους B2B guests**.
- **Select users and groups**, με τρεις υποκατηγορίες:
    - **Guest or external users**: B2B collaboration guests και members, B2B direct connect, local guests, service provider users (π.χ. CSP) και other external users. Μπορείς να περιορίσεις ανά tenant προέλευσης.
    - **Directory roles**: μόνο built-in ρόλοι. Δεν υποστηρίζονται ρόλοι με scope σε administrative unit ούτε custom roles.
    - **Users and groups**: οποιοσδήποτε τύπος ομάδας, assigned ή dynamic, security ή distribution. Η πολιτική εφαρμόζεται και στα nested μέλη.

Στο **Exclude** έχεις τις ίδιες κατηγορίες. Εκεί μπαίνουν κυρίως οι **break-glass λογαριασμοί**.

### Τρεις παγίδες στην επιλογή χρηστών

- **Ομάδες, όχι μεμονωμένοι χρήστες.** Υπάρχει όριο στον αριθμό χρηστών που μπαίνουν απευθείας σε μια πολιτική, και κάθε πολιτική αποθηκεύεται ως JSON με όριο μεγέθους. Βάλε τους χρήστες σε ομάδα και στόχευσε την ομάδα.
- **Το όριο των 2048 ομάδων.** Αν ένας χρήστης ανήκει σε περισσότερες από 2048 ομάδες, άμεσα ή μέσω nesting, η πρόσβασή του μπορεί να μπλοκαριστεί.
- **Οι πολιτικές για guests επηρεάζουν και τους partners.** Μια πολιτική για external users μπορεί να εμποδίσει την πρόσβαση παρόχων με GDAP. Για τους παρόχους χρησιμοποίησε τον τύπο **Service provider user**.

### Το μήνυμα «Don't lock yourself out!»

Όταν φτιάχνεις πολιτική για **All users** και **All resources**, το admin center σου εμφανίζει προειδοποίηση. Σου προτείνει να δοκιμάσεις πρώτα σε μικρή ομάδα και να εξαιρέσεις τουλάχιστον έναν admin. Από προεπιλογή σου δίνει την επιλογή να εξαιρέσεις τον εαυτό σου.

[![Η προειδοποίηση Don't lock yourself out στο Conditional Access](/images/Conditional-Access/ca-p2-lockout-warning.webp)](/images/Conditional-Access/ca-p2-lockout-warning.webp)
> 📷 **Εικόνα 2:** Η προειδοποίηση που εμφανίζεται σε πολιτική για All users και All resources, με την επιλογή να εξαιρέσεις τον τρέχοντα χρήστη. Screenshot © Microsoft, από το [Conditional Access: Users, groups, agents, and workload identities](https://learn.microsoft.com/en-us/entra/identity/conditional-access/concept-conditional-access-users-groups).

Η προειδοποίηση βοηθά, αλλά δεν αντικαθιστά τη σωστή πρακτική. Η εξαίρεση του δικού σου λογαριασμού δεν είναι στρατηγική. Οι break-glass λογαριασμοί είναι, και θα τους δούμε αναλυτικά στο Μέρος 6.

### Agents και workload identities

Δύο ακόμη τύποι ταυτοτήτων μπαίνουν στην ίδια ενότητα:

- **Agents (Preview)**: οι AI agents είναι πλέον λογαριασμοί πρώτης κατηγορίας στο Microsoft Entra ID. Μπορείς να στοχεύσεις όλους, συγκεκριμένους, ή με βάση custom security attributes.
- **Workload identities**: service principals μίας εφαρμογής (single tenant) που είναι registered στον tenant σου. Οι multitenant εφαρμογές και τα **managed identities δεν καλύπτονται**. Απαιτείται άδεια Microsoft Entra Workload ID. Θα τα δούμε στο Μέρος 4.

## Target Resources: τι προστατεύεις

Η ενότητα που παλαιότερα λεγόταν «cloud apps» ονομάζεται πλέον **Target resources** και έχει τέσσερις επιλογές.

### Εφαρμογές και υπηρεσίες

Μπορείς να στοχεύσεις όλες τις εφαρμογές ή συγκεκριμένες: Microsoft εφαρμογές, gallery και custom εφαρμογές, εφαρμογές μέσω Application Proxy. Τέσσερις επιλογές θέλουν προσοχή:

- **All resources.** Η Microsoft προτείνει μια βασική πολιτική MFA για όλους τους χρήστες σε **All resources χωρίς εξαιρέσεις**. Καλύπτει και εφαρμογές που δεν μπορείς να επιλέξεις μεμονωμένα.
- **Office 365.** Ομαδοποιεί Exchange, SharePoint, Teams και τις υπόλοιπες υπηρεσίες του Microsoft 365. Η Microsoft προτείνει να στοχεύεις την ομάδα και όχι μεμονωμένες εφαρμογές, γιατί υπάρχουν εξαρτήσεις. Το Teams, για παράδειγμα, χρησιμοποιεί SharePoint και Exchange.
- **Windows Azure Service Management API.** Καλύπτει Azure Resource Manager, Azure portal, Microsoft Entra admin center και άλλες υπηρεσίες. Επηρεάζει έμμεσα το Azure PowerShell, το Azure CLI και το Microsoft 365 admin center. Δεν επηρεάζει το Microsoft Graph PowerShell. Δεν καλύπτει πια το **Azure DevOps**, που χρειάζεται δική του πολιτική.
- **Microsoft Admin Portals.** Ομαδοποιεί τέσσερα admin portals: Exchange admin center, Azure portal, Microsoft Office 365 Portal και Microsoft 365 Security and Compliance Center. Είναι για Include, όχι για εξαιρέσεις. Ένα Block εδώ μπλοκάρει και τη σελίδα αυτοεγκατάστασης του Microsoft 365 για τους χρήστες.

Το **Microsoft Graph** δεν μπορεί να στοχευτεί μεμονωμένα. Επίσης, το Conditional Access εφαρμόζεται στους **πόρους** και όχι στους clients. Μια πολιτική στο SharePoint ισχύει για κάθε client που καλεί το SharePoint.

> ⚠️ **Αλλαγή που ήδη εφαρμόζεται:** Αν έχεις πολιτική σε All resources με έστω και μία εξαίρεση εφαρμογής, κάποια low privilege scopes (όπως `User.Read`) εξαιρούνταν μέχρι τώρα από την επιβολή. Από τον Μάρτιο του 2026 η Microsoft αλλάζει σταδιακά αυτή τη συμπεριφορά και τα scopes αυτά **δεν εξαιρούνται πλέον**. Χρήστες που έμπαιναν χωρίς πρόκληση μπορεί να δουν MFA. Δες το [Improved enforcement for policies with resource exclusions](https://learn.microsoft.com/en-us/entra/identity/conditional-access/concept-enforcement-resource-exclusions).

Όταν οι εφαρμογές πληθαίνουν, το **filter for applications** σε βοηθά να στοχεύεις εφαρμογές μέσω custom security attributes, αντί να τις προσθέτεις μία μία.

Για τους AI agents υπάρχει και η επιλογή **All agent resources (Preview)**. Η πολιτική εφαρμόζεται σε κάθε αίτημα token προς agent identity blueprints και agent identities, δηλαδή στους agents ως πόρους και όχι ως ταυτότητες που κάνουν sign-in.

### User actions

Τρεις ενέργειες του χρήστη μπορούν να προστατευτούν με πολιτική:

- **Register security information**: όταν ο χρήστης καταχωρεί μεθόδους MFA ή SSPR. Είναι η πόρτα που θέλει ένας επιτιθέμενος με κλεμμένο κωδικό, για να βάλει τη δική του μέθοδο.
- **Register or join devices**: όταν ο χρήστης κάνει register ή join συσκευή στο Microsoft Entra ID. Εδώ επιτρέπονται μόνο τα **Require MFA** και **Require authentication strength**. Αν τη χρησιμοποιήσεις, ρύθμισε το **Require Multifactor Authentication to register or join devices with Microsoft Entra** στις Device settings σε **No**. Αλλιώς η πολιτική δεν επιβάλλεται σωστά.
- **Account onboarding and recovery (Preview)**: όταν ένας νέος χρήστης ενεργοποιεί τον λογαριασμό του ή όταν κάποιος ανακτά λογαριασμό που έχει χάσει. Συνδυάζεται με το **Require identity verification**. Εδώ δεν υποστηρίζονται τα Terms of use, το Require authentication strength και τα περισσότερα άλλα controls. Οι πολιτικές σε All resources ισχύουν και σε αυτή τη ροή, εκτός αν ενεργοποιήσεις τη global εξαίρεση στο **Entra ID → Conditional Access → Settings (Preview) → Global exclusions**.

### Global Secure Access

Μπορείς να στοχεύσεις τα traffic forwarding profiles του Global Secure Access, όπως το **All internet resources with Global Secure Access**. Το είδαμε στην πράξη στο **[Global Secure Access Μέρος 5](/posts/global-secure-access/global-secure-access-meros-5-conditional-access/)**.

### Authentication context

Το **authentication context** σου επιτρέπει να προστατεύεις δεδομένα και ενέργειες **μέσα** σε μια εφαρμογή, όχι μόνο την είσοδο σε αυτήν. Το παράδειγμα της Microsoft: όλοι μπαίνουν στο site του SharePoint με το μενού του εστιατορίου, αλλά για το site με τη μυστική συνταγή χρειάζεσαι managed συσκευή και αποδοχή terms of use.

Τα authentication contexts ορίζονται στο **Entra ID → Conditional Access → Authentication context**, έως 99 (από c1 έως c99). Ένα context πρέπει να είναι **Publish to apps** για να το χρησιμοποιήσουν οι εφαρμογές. Τα συνδέεις με sensitivity labels στο SharePoint, με το Microsoft Defender for Cloud Apps, με custom εφαρμογές και με την ενεργοποίηση ρόλων στο PIM.

### Protected actions: authentication context για τις ρυθμίσεις του tenant

Μια ειδική χρήση του authentication context είναι τα **[protected actions](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/protected-actions-overview)**. Συνδέεις μια πολιτική με συγκεκριμένα δικαιώματα του Microsoft Entra ID. Όποιος προσπαθήσει να κάνει την ενέργεια πρέπει πρώτα να ικανοποιήσει την πολιτική, ανεξάρτητα από τον ρόλο του.

Μπορείς να προστατεύσεις:

- τη δημιουργία, αλλαγή και διαγραφή πολιτικών Conditional Access,
- τις ρυθμίσεις cross-tenant access,
- τα named locations,
- την οριστική διαγραφή (hard delete) αντικειμένων από τον κάδο,
- τη διαχείριση των ίδιων των protected actions.

Η πολιτική επιβάλλεται τη στιγμή της ενέργειας, όχι στο sign-in. Ένας admin που αλλάζει πολιτική Conditional Access μπορεί να κληθεί να κάνει phishing-resistant MFA εκείνη τη στιγμή. Τρία πράγματα να ξέρεις: εξαίρεσε έναν break-glass λογαριασμό, το Azure PowerShell αποτυγχάνει σε protected actions, και η δημιουργία νέου terms of use εμποδίζεται όσο προστατεύεται η δημιουργία πολιτικών. Τα protected actions δεν αντικαθιστούν τους ρόλους. Το ποιος έχει δικαίωμα το ορίζει η ανάθεση ρόλων.

## Network και Conditions

### Network

Η παλιά συνθήκη **Locations** μετονομάστηκε σε **Network**. Οι επιλογές είναι:

- **Any network or location**: όλες οι διευθύνσεις. Συνήθως με εξαίρεση τις αξιόπιστες τοποθεσίες.
- **All trusted networks and locations**: όσες έχεις σημειώσει ως trusted.
- **All Compliant Network locations**: για όσους έχουν Global Secure Access.
- **Selected networks and locations**: συγκεκριμένα named locations.

Τα **named locations** ορίζονται στο **Entra ID → Conditional Access → Named locations**, είτε με IPv4 και IPv6 ranges είτε με χώρες. Έχουν όρια: έως 195 named locations με IP ranges, έως 2000 ranges ανά location, και μάσκα μεγαλύτερη από /8.

Τέσσερα σημεία προσοχής:

- **Η IP είναι η δημόσια.** Για συσκευές σε εσωτερικό δίκτυο, το Microsoft Entra ID βλέπει τη δημόσια IP εξόδου, όχι την 10.x.x.x του laptop.
- **Cloud proxy και VPN κρύβουν την IP.** Η πολιτική βλέπει την IP του proxy. Το header X-Forwarded-For δεν χρησιμοποιείται, γιατί δεν επαληθεύεται. Η Microsoft προτείνει source IP restoration μέσω Global Secure Access.
- **Η χώρα με GPS ενοχλεί.** Ο εντοπισμός μέσω Microsoft Authenticator ζητά επιβεβαίωση κάθε ώρα και δεν λειτουργεί με passwordless μεθόδους μόνο. Κράτησέ τον για πολύ ευαίσθητες εφαρμογές.
- **Η τοποθεσία αξιολογείται ανά token.** Οι εφαρμογές με modern authentication ανανεώνουν token περίπου κάθε ώρα. Αν ο χρήστης φύγει από το εταιρικό δίκτυο, η πολιτική εφαρμόζεται μέσα στην επόμενη ώρα.

Τα trusted locations βελτιώνουν επίσης τον υπολογισμό κινδύνου του Microsoft Entra ID Protection.

### Conditions

Οι conditions προσθέτουν signals στην απόφαση:

| Condition | Τι ελέγχει | Άδεια ή φάση |
| --- | --- | --- |
| **User risk** | Πιθανότητα να έχει παραβιαστεί ο λογαριασμός | P2 |
| **Sign-in risk** | Πιθανότητα το sign-in να μην είναι του κατόχου | P2 |
| **Insider risk** | Signals από το Microsoft Purview adaptive protection | Microsoft Purview |
| **Agent risk** | Πιθανότητα να έχει παραβιαστεί ένας agent | Preview |
| **Agent execution environments** | Αν ο agent τρέχει σε endpoint ή στο cloud | Preview |
| **Device platforms** | Android, iOS, Windows, macOS, Linux | P1 |
| **Client apps** | Browser, mobile και desktop, Exchange ActiveSync, other clients | P1 |
| **Filter for devices** | Ιδιότητες συσκευής με rule expression | P1 |
| **Authentication flows** | Device code flow και authentication transfer | Preview |

[![Οι διαθέσιμες conditions σε μια πολιτική Conditional Access](/images/Conditional-Access/ca-p2-conditions.webp)](/images/Conditional-Access/ca-p2-conditions.webp)
> 📷 **Εικόνα 3:** Οι conditions μιας νέας πολιτικής: User risk, Sign-in risk, Insider risk, Device platforms, Locations, Client apps, Filter for devices και Authentication flows. Screenshot © Microsoft, από το [Conditional Access: Conditions](https://learn.microsoft.com/en-us/entra/identity/conditional-access/concept-conditional-access-conditions).

Τέσσερις conditions θέλουν ιδιαίτερη προσοχή:

- **Device platforms.** Η πλατφόρμα προκύπτει από το user agent string, που **δεν επαληθεύεται** και μπορεί να αλλάξει. Χρησιμοποίησέ την μαζί με compliance ή app protection, ή σε Block. Η Microsoft προτείνει ξεχωριστή πολιτική που μπλοκάρει τις πλατφόρμες που δεν υποστηρίζεις, όπως το Chrome OS: include any device, exclude τις υποστηριζόμενες, Block.
- **Client apps.** Από προεπιλογή, μια νέα πολιτική ισχύει για όλους τους τύπους client. Τα **legacy authentication clients** (Exchange ActiveSync, IMAP, POP3, SMTP και άλλα) δεν υποστηρίζουν MFA ούτε στέλνουν πληροφορίες συσκευής. Γι' αυτό μπλοκάρονται από κάθε πολιτική που ζητά MFA ή compliant device.
- **Device state.** Έχει καταργηθεί (deprecated). Χρησιμοποίησε **filter for devices**, με ιδιότητες όπως `trustType` και `isCompliant`. Τα δύο δεν συνδυάζονται στην ίδια πολιτική.
- **Authentication flows (Preview).** Ελέγχει το device code flow και το authentication transfer, δύο ροές που χρησιμοποιούν οι επιτιθέμενοι σε phishing. Θα το δούμε στο Μέρος 4.

## Grant Controls: τι ζητάς για να δώσεις πρόσβαση

Στην ενότητα **Grant** επιλέγεις **Block access** ή **Grant access** με μία ή περισσότερες απαιτήσεις.

[![Το panel Grant με Require authentication strength σε Phishing-resistant MFA](/images/Conditional-Access/ca-p2-grant.webp)](/images/Conditional-Access/ca-p2-grant.webp)
> 📷 **Εικόνα 4:** Το panel Grant μιας πολιτικής για όλους τους χρήστες σε All resources, με Require authentication strength σε Phishing-resistant MFA και, στο κάτω μέρος, τις επιλογές Require all the selected controls και Require one of the selected controls. Screenshot © Microsoft, από το [Conditional Access: Grant](https://learn.microsoft.com/en-us/entra/identity/conditional-access/concept-conditional-access-grant).

| Grant control | Τι ζητά | Τι πρέπει να ξέρεις |
| --- | --- | --- |
| **Block access** | Καμία πρόσβαση | Το πιο ισχυρό control. Δοκίμασε πρώτα με report-only και What If. |
| **Require multifactor authentication** | MFA | Το Windows Hello for Business ικανοποιεί την απαίτηση. |
| **Require authentication strength** | Συγκεκριμένες μεθόδους | Ορίζεται στο Authentication methods → Authentication strengths. Built-in ή custom. |
| **Require device to be marked as compliant** | Compliant συσκευή στο Intune | Windows 10+, iOS, Android, macOS, Linux Ubuntu. Το Edge InPrivate θεωρείται non-compliant. |
| **Require Microsoft Entra hybrid joined device** | Hybrid joined συσκευή | Μόνο Windows. Δεν υποστηρίζεται με device code flow. |
| **Require approved client app** | Εγκεκριμένη εφαρμογή | **Αποσύρεται.** Πέρασε σε app protection policy. |
| **Require app protection policy** | Intune app protection policy | iOS και Android. Edge σε Windows σε Preview. Χρειάζεται broker app. |
| **Require password change** | Ασφαλή αλλαγή κωδικού | Μόνο με user risk, μόνο σε All resources, χωρίς άλλο control. |
| **Require risk remediation** | Αυτο-αποκατάσταση κινδύνου | Προσθέτει αυτόματα authentication strength και sign-in frequency Every time. |
| **Terms of use** | Αποδοχή όρων χρήσης | Εμφανίζεται όταν έχεις δημιουργήσει terms of use. |
| **Require identity verification** | Επιβεβαίωση ταυτότητας με Verified ID | **Preview.** Χρειάζεται identity verification profile και δική του άδεια. Δεν είναι το ίδιο με το Require risk remediation. |

Δύο σημεία από τον πίνακα θέλουν εξήγηση.

**Η απόσυρση του approved client app.** Η Microsoft είχε ορίσει προθεσμία τις αρχές Μαρτίου 2026 για την απόσυρση του **Require approved client app**. Μέχρι τότε, οι πολιτικές που χρησιμοποιούσαν **μόνο** αυτό το control έπρεπε να γίνουν «approved client app **ή** app protection policy». Κάθε νέα πολιτική χρησιμοποιεί μόνο το app protection policy. Αν έχεις ακόμη τέτοια πολιτική, μετάφερέ την τώρα με τον οδηγό [Migrate approved client app to application protection policy](https://learn.microsoft.com/en-us/entra/identity/conditional-access/migrate-approved-client-app).

**Η σειρά ελέγχου στα logs.** Όταν ισχύουν πολλά controls, ελέγχονται με σταθερή σειρά: MFA, κατάσταση συσκευής, terms of use. Αν το token δεν έχει MFA claim, θα δεις στα sign-in logs μια διακοπή για MFA και αποτυχία στο terms of use, ακόμη κι αν ο χρήστης τους είχε αποδεχτεί. Μετά το MFA εμφανίζεται δεύτερη εγγραφή με επιτυχία και στα δύο. Δεν είναι σφάλμα. Είναι ο τρόπος που λειτουργεί.

Για τους agents (Preview) οι επιλογές είναι περιορισμένες. Για agents που λειτουργούν ως χρήστες υπάρχει Block ή Grant με compliant device, ενώ για τα agent identities μόνο Block.

## Session Controls: τι συμβαίνει μέσα στη συνεδρία

Τα grant controls αποφασίζουν αν θα μπεις. Τα **session controls** αποφασίζουν τι μπορείς να κάνεις όταν μπεις, και για πόσο.

[![Το panel Session με τα διαθέσιμα session controls](/images/Conditional-Access/ca-p2-session.webp)](/images/Conditional-Access/ca-p2-session.webp)
> 📷 **Εικόνα 5:** Το panel Session με τα διαθέσιμα controls: app enforced restrictions, Conditional Access App Control, sign-in frequency, persistent browser session, continuous access evaluation, resilience defaults και token protection. Screenshot © Microsoft, από το [Conditional Access: Session](https://learn.microsoft.com/en-us/entra/identity/conditional-access/concept-conditional-access-session).

| Session control | Τι κάνει |
| --- | --- |
| **Use app enforced restrictions** | Το Microsoft Entra ID περνά στην εφαρμογή αν η συσκευή είναι managed. Λειτουργεί με Exchange Online και SharePoint Online, π.χ. πρόσβαση μόνο από browser χωρίς download σε unmanaged συσκευή. |
| **Use Conditional Access App Control** | Δρομολογεί τη συνεδρία μέσω reverse proxy στο Microsoft Defender for Cloud Apps, για έλεγχο σε πραγματικό χρόνο. Στο Edge for Business επιβάλλεται μέσω Microsoft Purview DLP. |
| **Sign-in frequency** | Πόσο συχνά ο χρήστης κάνει ξανά sign-in: ώρες, ημέρες ή κάθε φορά. |
| **Persistent browser session** | Αν ο χρήστης μένει συνδεδεμένος αφού κλείσει τον browser. |
| **Customize continuous access evaluation** | Το CAE είναι ενεργό αυτόματα. Το Disable λειτουργεί μόνο με All resources και χωρίς conditions. |
| **Disable resilience defaults** | Σε διακοπή του Microsoft Entra ID, οι υπάρχουσες συνεδρίες συνεχίζουν. Αν το απενεργοποιήσεις, η πρόσβαση κόβεται όταν λήξουν. |
| **Require token protection for sign-in sessions** | Το token λειτουργεί μόνο από τη συσκευή για την οποία εκδόθηκε. |
| **Use Global Secure Access security profile** | Συνδέει την ταυτότητα με τα security profiles του Microsoft Entra Internet Access. |

Το sign-in frequency και το persistent browser session θα τα δούμε στην πράξη στο Μέρος 4, μαζί με το Continuous Access Evaluation. Για το token protection, και για το κενό που αφήνει σε συσκευές από bulk enrollment, διάβασε το **[Entra Token Protection και Bulk Enrollment](/posts/entra-token-protection-bulk-enrollment-limitation/)**.

## Security considerations

- **Το Exclude είναι το πιο επικίνδυνο κουμπί.** Κάθε εξαίρεση είναι ένα κενό. Κράτα τις εξαιρέσεις σε ομάδες με ιδιοκτήτη και περιοδικό έλεγχο, όχι σε μεμονωμένους χρήστες.
- **Το «All users» περιλαμβάνει guests.** Μια πολιτική που ζητά compliant device για All users θα μπλοκάρει τους guests, που δεν έχουν συσκευή στο Intune σου.
- **Η εξαίρεση εφαρμογής από All resources έχει πλέον μεγαλύτερο αποτύπωμα.** Με την αλλαγή του 2026, οι low privilege scopes επιβάλλονται. Έλεγξε τα report-only αποτελέσματα πριν και μετά.
- **Το device platform δεν είναι έλεγχος ασφαλείας από μόνο του.** Χρησιμοποίησέ το για στόχευση, όχι ως απόδειξη.
- **Το legacy authentication παρακάμπτει τα πάντα.** Αν δεν το μπλοκάρεις ρητά, οι πολιτικές MFA δεν προστατεύουν τα παλιά πρωτόκολλα.
- **Οι αλλαγές στις πολιτικές είναι προνομιακή ενέργεια.** Προστάτευσέ τες με protected actions, ώστε ένας κλεμμένος λογαριασμός admin να μην μπορεί να τις απενεργοποιήσει χωρίς ισχυρό MFA.

## Governance: τι σημαίνει για χρήστες, IT και οργανισμό

**Για τους χρήστες:** κάθε grant control είναι ένα βήμα που βλέπουν. Το «Require one of» με compliant device ή MFA μειώνει την τριβή για όσους δουλεύουν σε εταιρική συσκευή. Το sign-in frequency «Every time» είναι σωστό για admins, όχι για όλους.

**Για το IT:** τεκμηρίωσε για κάθε πολιτική τις απαντήσεις στα «ποιος, πού, από πού, υπό ποιες συνθήκες, τι ζητάμε, πώς περιορίζουμε». Ο πίνακας της ανατομίας στην αρχή του άρθρου μπορεί να γίνει το πρότυπο αυτής της τεκμηρίωσης.

**Για τον οργανισμό:** οι guests και οι πάροχοι χρειάζονται δική τους πολιτική. Η απόφαση για το τι ζητάς από έναν προμηθευτή, π.χ. MFA ή terms of use, είναι επιχειρηματική απόφαση με τεχνική επιβολή, και αφορά τη διαχείριση της εφοδιαστικής αλυσίδας.

## Licensing σε μια ματιά

| Δυνατότητα | Τι χρειάζεσαι |
| --- | --- |
| Assignments, target resources, network, βασικές conditions, grant και session controls | Microsoft Entra ID P1 |
| User risk, sign-in risk, password change, risk remediation | Microsoft Entra ID P2 (Microsoft Entra ID Protection) |
| Insider risk | Microsoft Purview adaptive protection |
| Workload identities | Microsoft Entra Workload ID |
| Compliant device, app protection policy | Microsoft Intune |
| Conditional Access App Control | Microsoft Defender for Cloud Apps |
| Compliant network, security profiles | Global Secure Access |
| Protected actions | Microsoft Entra ID P1 |

## Τι σημαίνει για τη συμμόρφωση

Ο ελεγκτής δεν θα σου ζητήσει μόνο αν έχεις Conditional Access. Θα ζητήσει να δει πώς η πολιτική ελέγχου πρόσβασης γίνεται ρύθμιση: ποιους αφορά, τι εξαιρείται και γιατί, τι ζητάς από τους εξωτερικούς. Κάθε στοιχείο της πολιτικής που είδαμε εδώ είναι και ένα πεδίο τεκμηρίωσης.

> 🔗 **Χρειάζεσαι τεκμηρίωση συμμόρφωσης;** Τα δομικά στοιχεία των πολιτικών στηρίζουν τις απαιτήσεις [13.α](/kya-1689-2025/#13-α) (πολιτική λογικού ελέγχου πρόσβασης), [13.ζ](/kya-1689-2025/#13-ζ) (MFA) και [12.2.α](/kya-1689-2025/#12-2-α) (κρίσιμοι προμηθευτές), όπως τις αναλύει ο **[οδηγός της ΚΥΑ 1689/2025](/kya-1689-2025/)**. Στον οδηγό για την **[Οδηγία NIS2](/nis2/)** αντιστοιχούν στα [21.2.δ](/nis2/#21-2-δ), [21.2.θ](/nis2/#21-2-θ) και [21.2.ι](/nis2/#21-2-ι), στο **[ISO/IEC 27001](/iso-27001/)** στα [A.5.10](/iso-27001/#A-5-10), [A.5.15](/iso-27001/#A-5-15) και [A.8.5](/iso-27001/#A-8-5), και στον **[GDPR](/gdpr/)** στο [32.1.β](/gdpr/#32-1-β). Ο καθένας έχει checklist σε Excel.

## Τι έρχεται στο Μέρος 3

Τώρα ξέρεις κάθε κομμάτι μιας πολιτικής. Στο Μέρος 3 περνάμε στην υλοποίηση: πώς σχεδιάζεις τη στρατηγική πριν από την πρώτη πολιτική, πώς επιβάλλεις MFA σε όλους με ασφάλεια, πώς προστατεύεις τους admins, πώς καταργείς το legacy authentication και πού κρύβονται οι κίνδυνοι στα named locations.

{{< if-published page="/posts/Conditional-Access-Series/conditional-access-meros-3-ylopoiisi-stin-praxi" >}}
> 📖 **Συνέχισε στο Μέρος 3:** [Από τον σχεδιασμό στις πρώτες πολιτικές, με ασφάλεια](/posts/conditional-access-series/conditional-access-meros-3-ylopoiisi-stin-praxi/)
{{< /if-published >}}

> 🔗 **Όλη η σειρά σε ένα σημείο:** τα 6 μέρη και η σειρά ανάγνωσης στη **[σελίδα της σειράς](/series/microsoft-entra-conditional-access/)**.

Ακολούθησέ με στο [LinkedIn](https://www.linkedin.com/in/dimosthenisatteia/) για ειδοποιήσεις νέων άρθρων.

## Πηγές και επαλήθευση {#last-verified}

{{< verification >}}

---

<!--
IMAGE NOTES
Cover: ca-meros-2.webp (1200x500, ίδια βάση με τη σειρά, ετικέτα «Μέρος 2»)
Εικόνες 1-5: επίσημα screenshots της Microsoft από το MicrosoftDocs/entra-docs (άδεια MIT), με «© Microsoft» και link στη λεζάντα:
  ca-p2-policy-target-resources.webp  <- media/concept-conditional-access-cloud-apps/conditional-access-cloud-apps-or-actions.png
  ca-p2-lockout-warning.webp          <- media/concept-conditional-access-users-groups/conditional-access-users-and-groups-lockout-warning.png
  ca-p2-conditions.webp               <- media/concept-conditional-access-conditions/conditional-access-conditions.png
  ca-p2-grant.webp                    <- media/concept-conditional-access-grant/conditional-access-grant.png
  ca-p2-session.webp                  <- media/concept-conditional-access-session/conditional-access-session.png
Save to content/images/Conditional-Access/
ΗΜΕΡΑ ΔΗΜΟΣΙΕΥΣΗΣ: draft: false, πραγματική date/lastmod, popup «Νέα στο blog» (STORAGE_KEY +1), homeHighlight: true, xlsx checklists, LinkedIn post.
-->
