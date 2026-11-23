---
title: "Microsoft Entra Conditional Access Μέρος 4: Advanced Identity Security, από τα passkeys ως τα workload identities"
seoTitle: "Conditional Access Μέρος 4: Advanced Identity Security"
# Προσωρινή ημερομηνία: αλλάζει στην πραγματική ημερομηνία δημοσίευσης
date: 2026-10-19T12:00:00+03:00
lastmod: 2026-10-19T12:00:00+03:00
draft: true
keywords:
  - Authentication strengths
  - Phishing-resistant MFA passkeys FIDO2
  - Token Protection Conditional Access
  - AiTM token theft
  - Device code flow Conditional Access
  - Risk-based Conditional Access
  - Microsoft Entra ID Protection
  - Filter for devices PAW
  - BYOD app protection policy
  - Continuous Access Evaluation
  - Workload identities Conditional Access
tags:
  - Conditional Access
  - Microsoft Entra ID
  - Microsoft Entra ID Protection
  - Zero Trust
  - Authentication Strength
  - Token Protection
  - Microsoft Intune
  - Identity Security
  - Microsoft 365 Security
author: "Dimosthenis Atteia"
description: "Advanced σενάρια Conditional Access: authentication strengths, token protection, risk-based πολιτικές, device-based access, BYOD, CAE και workload identities. Μέρος 4."
summary: "Στο τέταρτο μέρος της σειράς περνάς στα σενάρια που ξεχωρίζουν έναν έμπειρο μηχανικό ταυτότητας: phishing-resistant MFA και token protection απέναντι στο AiTM, risk-based πολιτικές με το Microsoft Entra ID Protection, πρόσβαση με βάση τη συσκευή, BYOD, session controls με Continuous Access Evaluation, και τι προστατεύει το Conditional Access στα workload identities."
categories: ["Identity & Access"]
series: ["Microsoft Entra Conditional Access"]
ShowToc: true
TocOpen: false
cover:
  image: "/images/Conditional-Access/ca-meros-4.webp"
  alt: "Microsoft Entra Conditional Access Μέρος 4: Advanced Identity Security"
  caption: "Microsoft Entra Conditional Access: Ο Πλήρης Οδηγός"
  relative: false
ShowReadingTime: true
ShowWordCount: true
# Πλαίσιο «Last verified»: κάθε χαρακτηριστικό με τη φάση, την άδεια, την πηγή και την ημερομηνία ελέγχου
verification:
  - feature: "Authentication strengths (built-in και custom)"
    status: "Generally Available"
    license: "Microsoft Entra ID P1"
    source: "https://learn.microsoft.com/en-us/entra/identity/authentication/concept-authentication-strengths"
    verified: 2026-10-19
  - feature: "Token Protection, native εφαρμογές (Windows, iOS/iPadOS, macOS)"
    status: "Generally Available"
    license: "Microsoft Entra ID P1"
    source: "https://learn.microsoft.com/en-us/entra/identity/conditional-access/concept-token-protection"
    verified: 2026-10-19
  - feature: "Token Protection, εφαρμογές browser για Azure Resource Manager"
    status: "Public Preview"
    license: "Microsoft Entra ID P1"
    source: "https://learn.microsoft.com/en-us/entra/identity/conditional-access/concept-token-protection"
    verified: 2026-10-19
  - feature: "Authentication flows (device code flow, authentication transfer)"
    status: "Public Preview"
    license: "Microsoft Entra ID P1"
    source: "https://learn.microsoft.com/en-us/entra/identity/conditional-access/concept-authentication-flows"
    verified: 2026-10-19
  - feature: "Risk-based πολιτικές (user risk, sign-in risk, Require risk remediation)"
    status: "Generally Available"
    license: "Microsoft Entra ID P2 ή Microsoft Entra Suite"
    source: "https://learn.microsoft.com/en-us/entra/id-protection/howto-identity-protection-configure-risk-policies"
    verified: 2026-10-19
  - feature: "Απόσυρση των legacy risk policies του ID Protection"
    status: "Retired (1 Οκτωβρίου 2026)"
    license: "Microsoft Entra ID P2"
    source: "https://learn.microsoft.com/en-us/entra/id-protection/howto-identity-protection-configure-risk-policies"
    verified: 2026-10-19
  - feature: "Filter for devices"
    status: "Generally Available"
    license: "Microsoft Entra ID P1"
    source: "https://learn.microsoft.com/en-us/entra/identity/conditional-access/concept-condition-filters-for-devices"
    verified: 2026-10-19
  - feature: "App protection policy στο Conditional Access (iOS, Android)"
    status: "Generally Available"
    license: "Microsoft Entra ID P1, Microsoft Intune"
    source: "https://learn.microsoft.com/en-us/entra/identity/conditional-access/policy-all-users-approved-app-or-app-protection"
    verified: 2026-10-19
  - feature: "App protection policy για Microsoft Edge σε Windows"
    status: "Public Preview"
    license: "Microsoft Entra ID P1, Microsoft Intune"
    source: "https://learn.microsoft.com/en-us/entra/identity/conditional-access/policy-all-users-approved-app-or-app-protection"
    verified: 2026-10-19
  - feature: "Sign-in frequency και persistent browser session"
    status: "Generally Available"
    license: "Microsoft Entra ID P1"
    source: "https://learn.microsoft.com/en-us/entra/identity/conditional-access/concept-session-lifetime"
    verified: 2026-10-19
  - feature: "Continuous Access Evaluation"
    status: "Generally Available"
    license: "Microsoft Entra ID P1 (critical events: όλοι οι tenants)"
    source: "https://learn.microsoft.com/en-us/entra/identity/conditional-access/concept-continuous-access-evaluation"
    verified: 2026-10-19
  - feature: "Conditional Access για workload identities"
    status: "Generally Available"
    license: "Microsoft Entra Workload ID (Workload Identities Premium)"
    source: "https://learn.microsoft.com/en-us/entra/identity/conditional-access/workload-identity"
    verified: 2026-10-19
# MITRE ATT&CK®: ονόματα στο data/mitre.yaml
mitre: ["T1566.002", "T1557", "T1539", "T1550.004", "T1528", "T1078.004", "M1032"]
---

> 🚦 **Σειρά Microsoft Entra Conditional Access, Μέρος 4 από 6.** Στο **[Μέρος 3](/posts/conditional-access-series/conditional-access-meros-3-ylopoiisi-stin-praxi/)** έστησες τις φάσεις 1 και 2: MFA για όλους, phishing-resistant MFA για τους admins, block legacy authentication. Εδώ περνάς στη φάση 3 και στα σενάρια που ξεχωρίζουν ένα ώριμο περιβάλλον.

## Γιατί το MFA δεν αρκεί πια

Το MFA σταματά την πλειονότητα των επιθέσεων με κωδικό. Οι επιτιθέμενοι όμως έχουν προσαρμοστεί. Τα phishing kits τύπου **adversary-in-the-middle (AiTM)** βάζουν έναν proxy ανάμεσα στον χρήστη και τη Microsoft. Ο χρήστης βλέπει την πραγματική σελίδα sign-in, κάνει κανονικά MFA, και ο proxy κρατά το session που ακολουθεί. Από εκεί και πέρα ο επιτιθέμενος δεν χρειάζεται ούτε κωδικό ούτε MFA.

Το Μέρος 4 απαντά σε αυτό σε δύο επίπεδα. Πρώτα, MFA που **δεν υποκλέπτεται**. Μετά, tokens που **δεν λειτουργούν** αν κλαπούν.

![Μια επίθεση AiTM και τα controls του Conditional Access που τη σταματούν](/images/Conditional-Access/ca-p4-aitm-defenses.webp)
> 📷 **Εικόνα 1:** Τα τέσσερα βήματα μιας επίθεσης AiTM και τα δύο σημεία όπου τη σπάει το Conditional Access: το phishing-resistant MFA στο βήμα 2, το token protection και το compliant network στο βήμα 3.

## Authentication strengths, phishing-resistant MFA και token protection

### Authentication strengths

Το **authentication strength** ορίζει ποιοι συνδυασμοί μεθόδων γίνονται δεκτοί για έναν πόρο. Υπάρχουν τρία built-in, που η Microsoft ενημερώνει όταν προστίθενται νέες μέθοδοι:

| Μέθοδος | MFA strength | Passwordless MFA | Phishing-resistant MFA |
| --- | --- | --- | --- |
| Passkey (FIDO2) | ✅ | ✅ | ✅ |
| Windows Hello for Business ή platform credential | ✅ | ✅ | ✅ |
| Certificate-based authentication (multifactor) | ✅ | ✅ | ✅ |
| Microsoft Authenticator (phone sign-in) | ✅ | ✅ | |
| Temporary Access Pass | ✅ | | |
| Κωδικός και κάτι που έχεις (SMS, φωνή, push, OATH) | ✅ | | |
| Federated multifactor | ✅ | | |

Το **phishing-resistant** σημαίνει, κατά τη Microsoft, ότι η μέθοδος απαιτεί αλληλεπίδραση με την ίδια τη σελίδα sign-in. Ένα passkey δεμένο στο πραγματικό domain δεν λειτουργεί σε ψεύτικο domain, άρα ο proxy του AiTM δεν μπορεί να ολοκληρώσει το sign-in.

[![Τα built-in authentication strengths και ο ορισμός του Phishing-resistant MFA](/images/Conditional-Access/ca-p4-auth-strengths.webp)](/images/Conditional-Access/ca-p4-auth-strengths.webp)
> 📷 **Εικόνα 2:** Τα built-in authentication strengths και ο ορισμός του Phishing-resistant MFA: Windows Hello for Business ή platform credential, passkeys (FIDO2) και certificate-based authentication (multifactor). Entra ID → Authentication methods → Authentication strengths. Screenshot © Microsoft, από το [Conditional Access authentication strengths](https://learn.microsoft.com/en-us/entra/identity/authentication/concept-authentication-strengths).

Αν τα built-in δεν σου ταιριάζουν, φτιάχνεις **custom authentication strength** με τους συνδυασμούς που θέλεις. Τέσσερα σημεία που πρέπει να ξέρεις:

- **Το authentication strength δεν περιορίζει τον πρώτο παράγοντα.** Ο χρήστης μπορεί να δώσει κωδικό, αλλά πρέπει μετά να ολοκληρώσει με μέθοδο του strength.
- **Δεν συνδυάζεται με Require multifactor authentication** στην ίδια πολιτική. Το built-in MFA strength είναι ισοδύναμο.
- **Το email one-time passcode για guests** δεν υποστηρίζεται σε κανέναν συνδυασμό.
- **Windows Hello for Business:** αν ο χρήστης μπήκε με κωδικό, δεν θα του ζητηθεί Windows Hello. Πρέπει να ξεκινήσει νέο sign-in και να επιλέξει τη σωστή μέθοδο από τα Sign-in options.

> 📖 **Για τη μετάβαση από SMS σε passkeys:** **[Τέλος στα SMS/Voice MFA: Η Microsoft κάνει τα Passkeys default στο Entra ID](/posts/passkeys-by-default-telos-sms-voice-mfa/)**.

### Token protection

Το **[token protection](https://learn.microsoft.com/en-us/entra/identity/conditional-access/concept-token-protection)** είναι session control που δέχεται μόνο sign-in session tokens δεμένα στη συσκευή, όπως το Primary Refresh Token (PRT). Το PRT δένεται κρυπτογραφικά με τη συσκευή όταν αυτή γίνεται register. Αν κλαπεί, δεν λειτουργεί από άλλη συσκευή.

| Πλατφόρμα | Native εφαρμογές | Εφαρμογές browser |
| --- | --- | --- |
| Windows | Generally Available | Preview, μόνο για εφαρμογές που καλούν Azure Resource Manager |
| iOS / iPadOS | Generally Available | Δεν υποστηρίζεται |
| macOS | Generally Available | Preview, μόνο για εφαρμογές που καλούν Azure Resource Manager |

Για native εφαρμογές επιβάλλεται σε **Exchange Online, SharePoint Online και Microsoft Teams**, και στα Windows επίσης σε **Azure Virtual Desktop** και **Windows 365**. Οι συσκευές Apple χρειάζονται MDM και το Microsoft Enterprise SSO plug-in.

[![Πολιτική με Require token protection for sign-in sessions](/images/Conditional-Access/ca-p4-token-protection.webp)](/images/Conditional-Access/ca-p4-token-protection.webp)
> 📷 **Εικόνα 3:** Το session control Require token protection for sign-in sessions σε μια πολιτική, με την προειδοποίηση ότι λειτουργεί μόνο με υποστηριζόμενες συσκευές και εφαρμογές και ότι οι υπόλοιπες θα μπλοκαριστούν. Screenshot © Microsoft, από το [Token Protection in Microsoft Entra Conditional Access](https://learn.microsoft.com/en-us/entra/identity/conditional-access/concept-token-protection).

Η Microsoft προτείνει προσεκτική ανάπτυξη: pilot ομάδα, πολιτική πρώτα σε report-only, και ανάλυση **interactive και non-interactive** sign-in logs για αρκετό διάστημα ώστε να καλυφθεί η κανονική χρήση των εφαρμογών. Υπάρχει και ένα κενό που λίγοι γνωρίζουν: οι συσκευές που γίνονται join μέσω bulk enrollment δεν υποστηρίζονται.

> 📖 **Το κενό του bulk enrollment αναλυτικά:** **[Entra Token Protection και Bulk Enrollment: Το κενό που κανένα compliance dashboard δεν θα σου δείξει](/posts/entra-token-protection-bulk-enrollment-limitation/)**.

### Device code flow και authentication transfer

Δύο ροές sign-in χρησιμοποιούνται συχνά σε phishing:

- **Device code flow:** φτιάχτηκε για συσκευές χωρίς πληκτρολόγιο, όπως οθόνες αιθουσών. Ο επιτιθέμενος στέλνει στο θύμα έναν κωδικό και το πείθει να τον εισάγει σε μια πραγματική σελίδα της Microsoft. Το token καταλήγει στον επιτιθέμενο.
- **Authentication transfer:** μεταφέρει την αυθεντικοποίηση από μια συσκευή σε άλλη, π.χ. με QR code από το Outlook desktop στο κινητό.

Η Microsoft προτείνει **να μπλοκάρεις το device code flow όπου είναι δυνατόν** και να το επιτρέπεις μόνο όπου χρειάζεται. Αυτό γίνεται με τη condition **Authentication flows** (Preview). Δύο σημεία προσοχής:

- **Protocol tracking.** Μια συνεδρία που ξεκίνησε με device code flow παραμένει σημαδεμένη και στις επόμενες ανανεώσεις token. Μπορεί λοιπόν να μπλοκαριστεί αργότερα σε άλλη εφαρμογή. Το σφάλμα είναι το **AADSTS530036** και στα logs φαίνεται στο πεδίο **Original transfer method**.
- **Device Registration Service.** Αν μια πολιτική authentication flows στοχεύει All resources και χρησιμοποιείς device code flow για register συσκευών, εξαίρεσε το **Device Registration Service**.

## Risk-based Conditional Access με το Microsoft Entra ID Protection

Το **Microsoft Entra ID Protection** υπολογίζει δύο είδη κινδύνου:

- **User risk:** η πιθανότητα να έχει παραβιαστεί ο λογαριασμός, π.χ. από διαρροή κωδικού.
- **Sign-in risk:** η πιθανότητα ένα συγκεκριμένο sign-in να μην είναι του κατόχου, π.χ. από ανώνυμη IP ή ασυνήθιστη τοποθεσία.

> ⚠️ **Οι legacy risk policies αποσύρθηκαν την 1η Οκτωβρίου 2026.** Αν είχες ενεργές τις πολιτικές user risk και sign-in risk μέσα στο ID Protection, η Microsoft ορίζει ότι πρέπει να μεταφερθούν σε Conditional Access. Η διαδικασία: δημιουργείς ισοδύναμες πολιτικές Conditional Access σε report-only, τις ενεργοποιείς, και απενεργοποιείς τις παλιές από το **ID Protection → Dashboard**. Αν δεν το έχεις κάνει, είναι η πρώτη δουλειά αυτού του άρθρου.

[![Πολιτική Conditional Access με sign-in risk High και Medium](/images/Conditional-Access/ca-p4-sign-in-risk.webp)](/images/Conditional-Access/ca-p4-sign-in-risk.webp)
> 📷 **Εικόνα 4:** Η πολιτική «CA007: Require multi-factor authentication for risky sign-in» με τη condition Sign-in risk σε High και Medium και session control Sign-in frequency Every time. Screenshot © Microsoft, από το [Configure and enable risk policies](https://learn.microsoft.com/en-us/entra/id-protection/howto-identity-protection-configure-risk-policies).

Οι προτάσεις της Microsoft:

| Πολιτική | Condition | Grant | Session |
| --- | --- | --- | --- |
| **User risk** | User risk: **High** | **Require risk remediation** (προσθέτει αυτόματα authentication strength) | Sign-in frequency: **Every time** (αυτόματα, υποχρεωτικό) |
| **Sign-in risk** | Sign-in risk: **Medium** και **High** | Require authentication strength: **Multifactor authentication** | Sign-in frequency: **Every time** |

Με το **Require risk remediation**, ο χρήστης αποκαθιστά μόνος του τον κίνδυνο. Αν δεν έχει κωδικό, η Microsoft ανακαλεί τις συνεδρίες του και κάνει ξανά sign-in. Αν έχει, κάνει ασφαλή αλλαγή κωδικού μετά από MFA. Για χρήστες με passwordless, η πολιτική sign-in risk μπορεί να ζητά Passwordless MFA ή Phishing-resistant MFA.

Πέντε σημεία που κάνουν τη διαφορά:

- **Μην συνδυάζεις user risk και sign-in risk στην ίδια πολιτική.** Η Microsoft είναι ρητή: μία πολιτική για κάθε τύπο.
- **Η αποκατάσταση προϋποθέτει εγγραφή σε MFA.** Χρήστης χωρίς MFA μπλοκάρεται και χρειάζεται admin. Γι' αυτό η φάση 2 του Μέρους 3 προηγείται.
- **Στα hybrid περιβάλλοντα χρειάζεται password writeback**, για να φτάσει η αλλαγή κωδικού στο Active Directory.
- **Καθάρισε πρώτα τον υπάρχοντα κίνδυνο.** Πριν ενεργοποιήσεις τις πολιτικές, διερεύνησε και αποκατάστησε τους χρήστες που είναι ήδη σημαδεμένοι.
- **Τα trusted locations μειώνουν τα false positives** σε ορισμένες ανιχνεύσεις. Η τεκμηρίωση της Microsoft τα χρησιμοποιεί ως signal, όχι ως εξαίρεση.

Το επίπεδο κινδύνου είναι επιλογή ισορροπίας. Το High προκαλεί λιγότερες διακοπές αλλά αφήνει απ' έξω τα Low και Medium. Το Medium και το Low πιάνουν περισσότερα, με περισσότερες διακοπές για τους χρήστες.

## Device-based access: Intune compliance, hybrid join και managed devices

Η συσκευή είναι το δεύτερο μισό της ταυτότητας. Δύο grant controls τη φέρνουν στην απόφαση:

- **Require device to be marked as compliant:** η συσκευή είναι registered στο Microsoft Entra ID και το Intune, ή ένας υποστηριζόμενος MDM partner για Windows, την έχει κρίνει compliant. Υποστηρίζει Windows 10+, iOS, Android, macOS και Linux Ubuntu.
- **Require Microsoft Entra hybrid joined device:** μόνο για Windows συσκευές σε domain.

Το template της Microsoft «compliant **ή** hybrid joined **ή** MFA» είναι η πιο ήπια μορφή. Ο χρήστης σε εταιρική συσκευή μπαίνει χωρίς επιπλέον βήμα. Για τους admins, το «MFA **και** compliant device» είναι η αυστηρότερη και σωστότερη επιλογή.

### Filter for devices και Privileged Access Workstations

Το **filter for devices** στοχεύει συσκευές με βάση τις ιδιότητές τους: `trustType`, `isCompliant`, `deviceOwnership`, `operatingSystem`, `enrollmentProfileName`, τα `extensionAttribute1` έως `15` και άλλες.

[![Filter for devices με τον κανόνα device.extensionAttribute1 -eq SAW](/images/Conditional-Access/ca-p4-filter-for-devices.webp)](/images/Conditional-Access/ca-p4-filter-for-devices.webp)
> 📷 **Εικόνα 5:** Το panel Filter for devices με επιλογή Exclude filtered devices from policy και τον κανόνα `device.extensionAttribute1 -eq "SAW"`. Screenshot © Microsoft, από το [Conditional Access: Filter for devices](https://learn.microsoft.com/en-us/entra/identity/conditional-access/concept-condition-filters-for-devices).

Το κλασικό σενάριο της Microsoft είναι οι **Privileged Access Workstations (PAW)**, με δύο πολιτικές για τους admin ρόλους στο Windows Azure Service Management API:

1. **Πολιτική 1:** Grant με Require MFA **και** Require compliant device.
2. **Πολιτική 2:** Block, με εξαίρεση τις συσκευές όπου `device.extensionAttribute1` είναι `SAW`.

Το αποτέλεσμα: οι admins διαχειρίζονται το Azure μόνο από εγκεκριμένους, compliant σταθμούς εργασίας.

Τρία σημεία προσοχής στο filter for devices:

- **Οι unregistered συσκευές έχουν κενές ιδιότητες.** Ένα filter με θετικό τελεστή (Equals, Contains) δεν τις πιάνει ποτέ. Για να στοχεύσεις unregistered συσκευές, χρησιμοποίησε αρνητικό τελεστή (NotEquals, NotContains).
- **Τα extensionAttributes χρειάζονται managed συσκευή.** Είναι διαθέσιμα στην αξιολόγηση μόνο αν η συσκευή είναι managed από το Intune, compliant ή hybrid joined.
- **Ο κανόνας έχει όριο 3072 χαρακτήρων.** Μην απαριθμείς δεκάδες deviceIds. Χρησιμοποίησε attributes.

Με filter for devices μπορείς επίσης να μπλοκάρεις παλιά λειτουργικά, π.χ. όλα τα Windows εκτός από εκδόσεις 10.0. Η παλιά condition **Device state** έχει καταργηθεί και δεν συνδυάζεται με το filter for devices.

## Conditional Access για BYOD

Σε προσωπικές συσκευές δεν θέλεις να ελέγχεις όλη τη συσκευή. Θέλεις να προστατεύεις τα εταιρικά δεδομένα μέσα σε συγκεκριμένες εφαρμογές. Αυτό κάνουν οι **Intune app protection policies (MAM)** σε συνδυασμό με το Conditional Access.

### Κινητά: app protection policy

Η πολιτική της Microsoft για iOS και Android:

1. **Users:** All users, με εξαίρεση τους break-glass λογαριασμούς.
2. **Target resources:** All resources.
3. **Conditions → Device platforms:** Android και iOS.
4. **Grant:** Require approved client app **και** Require app protection policy, με **Require one of the selected controls**.
5. **Enable policy:** Report-only.

Όπως είδαμε στο Μέρος 2, το **Require approved client app αποσύρεται**, και οι νέες πολιτικές πρέπει να χρησιμοποιούν μόνο το **Require app protection policy**. Η συσκευή πρέπει να γίνει register μέσω broker app: Microsoft Authenticator στο iOS, Company Portal στο Android.

Δύο σημεία που μπερδεύουν:

- **Σε report-only, το app protection policy εμφανίζεται ως «Report-only: Failure»** ακόμη κι όταν όλα είναι σωστά. Συμβαίνει επειδή το control δεν ικανοποιείται σε report-only. Μόλις η πολιτική γίνει On, το control εφαρμόζεται και το sign-in δεν μπλοκάρεται.
- **Μπλόκαρε τις άγνωστες πλατφόρμες.** Η Microsoft προτείνει μαζί με αυτή την πολιτική μια δεύτερη, που μπλοκάρει τις unknown ή unsupported πλατφόρμες. Αλλιώς ένας client που δηλώνει ψεύτικη πλατφόρμα παρακάμπτει την πολιτική των κινητών.

Στα Windows, το app protection policy υποστηρίζεται σε **Preview μόνο για τον Microsoft Edge**.

### Browser σε unmanaged συσκευή: app enforced restrictions

Για πρόσβαση από browser σε προσωπικό υπολογιστή, το session control **Use app enforced restrictions** περνά στο Exchange Online και στο SharePoint Online την πληροφορία ότι η συσκευή δεν είναι managed. Οι εφαρμογές δίνουν τότε περιορισμένη εμπειρία, π.χ. πρόσβαση μόνο από browser, χωρίς download. Με filter for devices και `deviceOwnership -eq "Personal"` μπορείς να στοχεύσεις ρητά τις προσωπικές συσκευές.

## Session controls, browser sessions και Continuous Access Evaluation

### Sign-in frequency και persistent browser session

Η προεπιλογή του Microsoft Entra ID είναι **rolling window 90 ημερών** για το sign-in frequency. Μπορεί να φαίνεται πολύ, αλλά η λογική της Microsoft είναι σαφής: χρήστες που βάζουν συνέχεια κωδικό τον δίνουν πιο εύκολα και σε ψεύτικη σελίδα. Η συνεδρία ανακαλείται ούτως ή άλλως αν αλλάξει κάτι σημαντικό, όπως ο κωδικός, η συμμόρφωση της συσκευής ή η κατάσταση του λογαριασμού.

Χρησιμοποίησε αυστηρότερο sign-in frequency στοχευμένα:

- **Every time** για ευαίσθητες ενέργειες, risky users και risky sign-ins, ενεργοποίηση ρόλων στο PIM, Intune enrollment. Η Microsoft υπολογίζει πέντε λεπτά ανοχή, ώστε να μη ζητείται συχνότερα από μία φορά ανά πέντε λεπτά.
- **Χρονικό διάστημα** για unmanaged ή κοινόχρηστες συσκευές και για το Microsoft 365 στο σύνολό του.

Τρία σημεία προσοχής:

- **Every time χωρίς MFA μπορεί να φέρει loop** στο sign-in.
- **Πολλά prompts φέρνουν MFA fatigue.** Περιόρισε τις εφαρμογές με Every time.
- **Απενεργοποίησε το «Remember MFA on trusted devices»** πριν χρησιμοποιήσεις sign-in frequency. Οι δύο ρυθμίσεις μαζί προκαλούν απρόσμενα prompts.

Το **persistent browser session** κρατά τα cookies στη συσκευή αφού κλείσει ο browser. Σε unmanaged συσκευές αυτό σημαίνει ότι τα cookies μένουν εκεί. Το template της Microsoft «No persistent browser session» το απενεργοποιεί για αυτές.

### Conditional Access App Control

Για έλεγχο μέσα στη συνεδρία, όπως αποκλεισμό download ή copy σε ευαίσθητα αρχεία, το **Use Conditional Access App Control** δρομολογεί τη συνεδρία μέσω του **Microsoft Defender for Cloud Apps**.

{{< if-published page="/posts/Microsoft-Defender-Up-Close-Series/microsoft-defender-for-cloud-apps-deep-dive" >}}
> 📖 **Αναλυτικά:** **[Microsoft Defender for Cloud Apps](/posts/microsoft-defender-up-close-series/microsoft-defender-for-cloud-apps-deep-dive/)** στη σειρά Microsoft Defender Up Close.
{{< /if-published >}}

### Continuous Access Evaluation: τι γίνεται μετά το sign-in

Ένα access token ισχύει συνήθως μία ώρα. Χωρίς κάτι επιπλέον, ένας χρήστης που απενεργοποιήθηκε ή άλλαξε δίκτυο κρατά την πρόσβαση μέχρι να λήξει το token. Το **[Continuous Access Evaluation (CAE)](https://learn.microsoft.com/en-us/entra/identity/conditional-access/concept-continuous-access-evaluation)** κλείνει αυτό το κενό με μια «συζήτηση» ανάμεσα στο Microsoft Entra ID και την εφαρμογή.

Λειτουργεί σε δύο σενάρια:

**Critical event evaluation.** Το Exchange Online, το SharePoint Online και το Teams παρακολουθούν κρίσιμα γεγονότα και κόβουν την πρόσβαση σχεδόν σε πραγματικό χρόνο:

- απενεργοποίηση ή διαγραφή λογαριασμού,
- αλλαγή ή reset κωδικού,
- ενεργοποίηση MFA για τον χρήστη,
- ρητή ανάκληση των refresh tokens από admin,
- high user risk από το Microsoft Entra ID Protection.

Δεν εξαρτάται από πολιτικές Conditional Access, άρα ισχύει σε κάθε tenant. Η Microsoft δίνει στόχο σχεδόν πραγματικό χρόνο, με πιθανή καθυστέρηση έως 15 λεπτά.

[![Ροή ανάκλησης με CAE](/images/Conditional-Access/ca-p4-cae-revocation.webp)](/images/Conditional-Access/ca-p4-cae-revocation.webp)
> 📷 **Εικόνα 6:** Η ροή ανάκλησης με CAE: ο client παίρνει token, το Microsoft Entra ID στέλνει γεγονός στον resource provider, και το επόμενο token απορρίπτεται. Διάγραμμα © Microsoft, από το [Continuous access evaluation](https://learn.microsoft.com/en-us/entra/identity/conditional-access/concept-continuous-access-evaluation).

**Conditional Access policy evaluation.** Το Exchange Online, το SharePoint Online, το Teams και το Microsoft Graph συγχρονίζουν τις πολιτικές τοποθεσίας. Αν ο χρήστης βγει από επιτρεπόμενο IP range, η πρόσβαση κόβεται αμέσως.

[![Ροή αλλαγής τοποθεσίας με CAE](/images/Conditional-Access/ca-p4-cae-location.webp)](/images/Conditional-Access/ca-p4-cae-location.webp)
> 📷 **Εικόνα 7:** Η ροή αλλαγής τοποθεσίας: ο χρήστης βγαίνει από το allowed range, ο resource provider απορρίπτει το token με claim challenge, και το Microsoft Entra ID αρνείται νέο token. Διάγραμμα © Microsoft, από το [Continuous access evaluation](https://learn.microsoft.com/en-us/entra/identity/conditional-access/concept-continuous-access-evaluation).

Επειδή η αξιολόγηση γίνεται συνεχώς, τα tokens σε συνεδρίες CAE ζουν **έως 28 ώρες**. Τα όρια που πρέπει να ξέρεις:

- **Μόνο IP-based named locations.** Το CAE δεν βλέπει χώρες ούτε MFA trusted IPs. Για αυτά εκδίδεται token μίας ώρας χωρίς άμεσο έλεγχο IP. Αν θέλεις επιβολή σε πραγματικό χρόνο, όρισε όλες τις IP εξόδου, IPv4 και IPv6.
- **Πάνω από 5.000 IP ranges** στις πολιτικές τοποθεσίας, και το CAE δεν επιβάλλει την αλλαγή τοποθεσίας σε πραγματικό χρόνο.
- **Οι guests δεν υποστηρίζονται.**
- **Οι αλλαγές πολιτικών και μελών ομάδων** μπορεί να χρειαστούν έως μία ημέρα για να φτάσουν στις εφαρμογές. Για άμεση εφαρμογή σε συγκεκριμένο χρήστη, κάνε **Revoke sessions**.
- **Split tunneling, SD-WAN και cloud proxies** δημιουργούν διαφορετικές IP για το Microsoft Entra ID και την εφαρμογή. Μην προσθέτεις κοινόχρηστες ή μεταβλητές IP σε trusted locations. Για σταθερά δίκτυα υπάρχει και το **strict location enforcement** (Preview).

Το CAE είναι ενεργό αυτόματα. Απενεργοποιείται μόνο με το session control **Customize continuous access evaluation**, σε πολιτική με All resources και χωρίς conditions.

## Workload identities: τι προστατεύει και τι δεν προστατεύει

Τα **workload identities** είναι εφαρμογές και service principals που αποκτούν πρόσβαση σε πόρους. Η Microsoft τα θεωρεί πιο εκτεθειμένα από τους χρήστες, γιατί:

- δεν μπορούν να κάνουν MFA,
- συχνά δεν έχουν διαδικασία κύκλου ζωής,
- πρέπει να αποθηκεύουν κάπου τα credentials ή τα secrets τους.

Το **[Conditional Access για workload identities](https://learn.microsoft.com/en-us/entra/identity/conditional-access/workload-identity)** σου επιτρέπει να μπλοκάρεις service principals:

- όταν συνδέονται εκτός γνωστών δημόσιων IP ranges,
- όταν το Microsoft Entra ID Protection εντοπίζει κίνδυνο (**service principal risk**),
- σε συνδυασμό με authentication context.

[![Πολιτική για workload identity με service principal risk](/images/Conditional-Access/ca-p4-workload-identity.webp)](/images/Conditional-Access/ca-p4-workload-identity.webp)
> 📷 **Εικόνα 8:** Μια πολιτική «Workload identity risk policy» με στόχο συγκεκριμένους service principals, condition κινδύνου και Grant: Block access. Screenshot © Microsoft, από το [Conditional Access for workload identities](https://learn.microsoft.com/en-us/entra/identity/conditional-access/workload-identity).

Η λίστα με το τι **δεν** καλύπτεται είναι εξίσου σημαντική:

| Καλύπτεται | Δεν καλύπτεται |
| --- | --- |
| Single tenant service principals, registered στον tenant σου | Multitenant εφαρμογές, Microsoft και third-party SaaS |
| Service principals που μπαίνουν **απευθείας** στην πολιτική | Service principals μέσα σε ομάδα: η πολιτική **δεν** εφαρμόζεται |
| Location και service principal risk | MFA, compliant device και τα άλλα grant controls: μόνο **Block** |
| | Managed identities: για αυτά η Microsoft προτείνει access reviews |

Δύο πρακτικές λεπτομέρειες. Το Object ID που χρειάζεσαι είναι αυτό του service principal, από το **Enterprise apps**, όχι από τα App registrations. Τα αποτελέσματα φαίνονται στο **Sign-in logs → Service principal sign-ins**. Η άδεια **Workload Identities Premium** χρειάζεται για δημιουργία και αλλαγή πολιτικών. Αν λήξει, οι υπάρχουσες συνεχίζουν να λειτουργούν αλλά δεν αλλάζουν.

Για τα **agent identities** (Preview) ισχύει κάτι αντίστοιχο: υποστηρίζουν μόνο Block.

## Security considerations

- **Το phishing-resistant MFA είναι η μόνη απάντηση στο AiTM στο σημείο του sign-in.** Ένα «ισχυρό» push με number matching δεν αρκεί απέναντι σε proxy.
- **Το token protection δεν καλύπτει ακόμη τον browser γενικά.** Στον browser είναι Preview και μόνο για Azure Resource Manager. Η κλοπή cookies από browser χρειάζεται phishing-resistant MFA, compliant network και CAE.
- **Οι risk-based πολιτικές χωρίς εγγεγραμμένο MFA κλειδώνουν χρήστες.** Η σειρά των φάσεων έχει σημασία.
- **Τα filters με θετικό τελεστή αγνοούν τις unregistered συσκευές.** Μια πολιτική Block με Equals μπορεί να μην εφαρμόζεται εκεί που τη χρειάζεσαι περισσότερο.
- **Το BYOD χωρίς block των άγνωστων πλατφορμών είναι ανοιχτό.** Το device platform προκύπτει από το user agent.
- **Τα service principals σε ομάδες δεν προστατεύονται.** Στόχευσέ τα ρητά.
- **Οι trusted locations με κοινόχρηστες IP αποδυναμώνουν και το CAE.**

## Validation: test cases και αναμενόμενα αποτελέσματα

| # | Πολιτική | Σενάριο | Αναμενόμενο αποτέλεσμα | Πού το βλέπεις |
| --- | --- | --- | --- | --- |
| 1 | Phishing-resistant MFA | Test admin κάνει sign-in με κωδικό και Authenticator push | Ζητείται passkey ή Windows Hello. Η push δεν αρκεί | Sign-in logs → Authentication details |
| 2 | Token protection (report-only) | Sign-in από υποστηριζόμενη και από μη υποστηριζόμενη συσκευή | Success στην πρώτη, Report-only: Failure στη δεύτερη | Sign-in logs, interactive και non-interactive |
| 3 | Block device code flow | Sign-in με device code flow | Block. Στα logs φαίνεται το Original transfer method | Sign-in logs → Conditional Access |
| 4 | User risk High | Test user με επιβεβαιωμένο κίνδυνο (Confirm compromised) | Require risk remediation και αλλαγή κωδικού ή νέο sign-in | ID Protection → Risky users |
| 5 | PAW filter | Admin ανοίγει το Azure portal από συσκευή χωρίς SAW | Block | Sign-in logs → Device info |
| 6 | App protection στο κινητό | Outlook mobile χωρίς Intune app protection | Ζητείται εγκατάσταση broker app και app protection | Sign-in logs → Conditional Access |
| 7 | CAE | Revoke sessions σε χρήστη με ανοιχτό Outlook | Η πρόσβαση κόβεται χωρίς να περιμένει τη λήξη του token | Sign-in logs, εμπειρία χρήστη |
| 8 | Workload identity location | Service principal από IP εκτός επιτρεπόμενου range | «Access has been blocked due to Conditional Access policies» | Sign-in logs → Service principal sign-ins |

## Governance: τι σημαίνει για χρήστες, IT και οργανισμό

**Για τους χρήστες:** η μετάβαση σε passkeys και Windows Hello είναι η μεγαλύτερη αλλαγή της σειράς. Χρειάζεται καμπάνια εγγραφής, Temporary Access Pass για τους νέους χρήστες και σαφή οδηγία για το τι κάνουν αν χάσουν τη συσκευή τους.

**Για το IT:** κάθε πολιτική της φάσης 3 ξεκινά σε report-only, με ανάλυση και των non-interactive sign-ins. Οι πολιτικές κινδύνου χρειάζονται και διαδικασία: ποιος ελέγχει τους risky users, πόσο συχνά, και πότε γίνεται confirm compromised ή dismiss.

**Για τον οργανισμό:** η πολιτική BYOD είναι απόφαση διοίκησης, όχι μόνο ρύθμιση. Ορίζει τι επιτρέπεται σε προσωπική συσκευή, με ποιους όρους, και τι συμβαίνει στα εταιρικά δεδομένα όταν φεύγει ένας εργαζόμενος. Τα workload identities χρειάζονται ιδιοκτήτη και κύκλο ζωής, όπως οι χρήστες.

## Licensing σε μια ματιά

| Δυνατότητα | Τι χρειάζεσαι |
| --- | --- |
| Authentication strengths, token protection, authentication flows, filter for devices, session controls | Microsoft Entra ID P1 |
| User risk, sign-in risk, Require risk remediation | Microsoft Entra ID P2 ή Microsoft Entra Suite |
| Compliant device, app protection policy | Microsoft Intune |
| Conditional Access App Control | Microsoft Defender for Cloud Apps |
| Compliant network | Global Secure Access |
| Workload identities | Microsoft Entra Workload ID (Workload Identities Premium) |
| CAE critical events | Χωρίς επιπλέον άδεια |

## Τι σημαίνει για τη συμμόρφωση

Ο ελεγκτής που ζητά «ισχυρή αυθεντικοποίηση» δεν ικανοποιείται πλέον με ένα απλό MFA για τους λογαριασμούς υψηλού κινδύνου. Τα authentication strengths, οι risk-based πολιτικές και ο έλεγχος της συσκευής είναι το τεκμήριο ότι η αυθεντικοποίηση είναι ανάλογη του κινδύνου, και ότι η πρόσβαση από απομακρυσμένες και προσωπικές συσκευές ελέγχεται.

> 🔗 **Χρειάζεσαι τεκμηρίωση συμμόρφωσης;** Τα σενάρια αυτού του άρθρου στηρίζουν τις απαιτήσεις [13.ζ](/kya-1689-2025/#13-ζ) (MFA ανάλογα με την κρισιμότητα) και [19.ζ](/kya-1689-2025/#19-ζ) (ισχυρός έλεγχος στις απομακρυσμένες συνδέσεις), όπως τις αναλύει ο **[οδηγός της ΚΥΑ 1689/2025](/kya-1689-2025/)**. Στον οδηγό για την **[Οδηγία NIS2](/nis2/)** αντιστοιχούν στα [21.2.θ](/nis2/#21-2-θ) και [21.2.ι](/nis2/#21-2-ι), στο **[ISO/IEC 27001](/iso-27001/)** στα [A.6.7](/iso-27001/#A-6-7), [A.8.1](/iso-27001/#A-8-1) και [A.8.5](/iso-27001/#A-8-5), και στον **[GDPR](/gdpr/)** στο [32.1.β](/gdpr/#32-1-β). Ο καθένας έχει checklist σε Excel.

## Τι έρχεται στο Μέρος 5

Με τόσες πολιτικές, το επόμενο ερώτημα είναι πώς αποδεικνύεις τι συνέβη σε ένα sign-in. Στο Μέρος 5 βλέπουμε report-only σε βάθος, το What If tool, τα sign-in logs και τον εντοπισμό της αιτίας ενός blocked sign-in, μεθοδολογία troubleshooting, το Insights and Reporting workbook και τη διαχείριση πολιτικών με Microsoft Graph και PowerShell.

{{< if-published page="/posts/Conditional-Access-Series/conditional-access-meros-5-troubleshooting-monitoring" >}}
> 📖 **Συνέχισε στο Μέρος 5:** [Troubleshooting και monitoring, πώς αποδεικνύεις τι συνέβη σε ένα sign-in](/posts/conditional-access-series/conditional-access-meros-5-troubleshooting-monitoring/)
{{< /if-published >}}

> 🔗 **Όλη η σειρά σε ένα σημείο:** τα 6 μέρη και η σειρά ανάγνωσης στη **[σελίδα της σειράς](/series/microsoft-entra-conditional-access/)**.

Ακολούθησέ με στο [LinkedIn](https://www.linkedin.com/in/dimosthenisatteia/) για ειδοποιήσεις νέων άρθρων.

## Πηγές και επαλήθευση {#last-verified}

{{< verification >}}

---

<!--
IMAGE NOTES
Cover: ca-meros-4.webp (1200x500, ίδια βάση με τη σειρά, ετικέτα «Μέρος 4»)
Εικόνα 1: ca-p4-aitm-defenses.webp (δικό μας διάγραμμα, η Microsoft δεν έχει διάγραμμα AiTM με τα controls)
Επίσημες εικόνες της Microsoft από το MicrosoftDocs/entra-docs (άδεια MIT), με «© Microsoft» και link στη λεζάντα:
  ca-p4-auth-strengths.webp        <- identity/authentication/media/concept-authentication-strengths/authentication-strength-definitions.png
  ca-p4-token-protection.webp      <- identity/conditional-access/media/concept-token-protection/complete-policy-components-session.png
  ca-p4-sign-in-risk.webp          <- id-protection/media/howto-identity-protection-configure-risk-policies/sign-in-risk-conditions.png
  ca-p4-filter-for-devices.webp    <- identity/conditional-access/media/concept-condition-filters-for-devices/create-filter-for-devices-condition.png
  ca-p4-cae-revocation.webp        <- identity/conditional-access/media/concept-continuous-access-evaluation/user-revocation-event-flow.png
  ca-p4-cae-location.webp          <- identity/conditional-access/media/concept-continuous-access-evaluation/user-condition-change-flow.png
  ca-p4-workload-identity.webp     <- identity/conditional-access/media/workload-identity/conditional-access-workload-identity-risk-policy.png
Save to content/images/Conditional-Access/
ΗΜΕΡΑ ΔΗΜΟΣΙΕΥΣΗΣ: draft: false, πραγματική date/lastmod, popup «Νέα στο blog» (STORAGE_KEY +1), homeHighlight: true, xlsx checklists, LinkedIn post.
-->
