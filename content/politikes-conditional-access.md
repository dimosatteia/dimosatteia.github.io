---
title: "Βασικό σύνολο πολιτικών Conditional Access: ποιες χρειάζεσαι, με ποια σειρά, έτοιμες σε JSON"
date: 2026-10-27T10:30:00+02:00
lastmod: 2026-10-27T10:30:00+02:00
draft: false
url: "/politikes-conditional-access/"
# Το link στο μενού ορίζεται εδώ, ώστε να εμφανίζεται μόνο όταν η σελίδα είναι δημοσιευμένη.
menu:
  main:
    identifier: tool-ca-baseline
    parent: tools
    name: "🔐 Πολιτικές Conditional Access"
    weight: 12
author: "Dimosthenis Atteia"
description: "Δωρεάν εργαλείο: δήλωσε άδειες και περιβάλλον και πάρε το βασικό σύνολο πολιτικών Conditional Access του Microsoft Entra ID, με σειρά ενεργοποίησης, JSON για upload, KQL για το Report-only και αντιστοίχιση σε ΚΥΑ 1689/2025, NIS2, ISO 27001 και GDPR."
toolBlurb: "πες ποιες άδειες έχεις και πώς δουλεύουν οι χρήστες σου, και πάρε 9 έως 24 πολιτικές Conditional Access σε JSON, με σειρά ενεργοποίησης, KQL και αντιστοίχιση στα τέσσερα πλαίσια."
keywords:
  - πολιτικές Conditional Access
  - Conditional Access baseline
  - Microsoft Entra Conditional Access templates
  - Conditional Access Business Premium
  - Conditional Access JSON upload policy file
  - ΚΥΑ 1689/2025 MFA
  - NIS2 Conditional Access
  - break-glass λογαριασμοί
showToc: true
ShowReadingTime: false
ShowBreadCrumbs: false
hideMeta: true
categories: ["Identity & Access"]
tags:
  - Microsoft Entra ID
  - Conditional Access
  - MFA
  - Zero Trust
  - ΚΥΑ 1689/2025
  - NIS2
  - ISO 27001
  - GDPR
# MITRE ATT&CK®: ονόματα στο data/mitre.yaml. Όσα αντιμετωπίζουν οι πολιτικές του εργαλείου.
mitre: ["T1078.004", "T1110.003", "T1098", "T1098.003", "T1528", "T1566.002", "T1539", "T1550.001", "T1550.004", "T1557", "T1199", "T1530", "T1213.002", "T1052.001", "T1133", "T1021", "M1032", "M1026", "M1035", "M1057", "M1054", "M1018"]
# Πλαίσιο «Last verified»: κάθε πολιτική με το template της στο Microsoft Learn
verification:
  - feature: "Conditional Access policy templates: κατηγορίες Secure foundation, Zero Trust, Remote work, Protect administrator, Emerging threats και AI Agents· κάθε template δημιουργείται σε Report-only και εξάγεται ή εισάγεται ως JSON με «Upload policy file»"
    status: "Generally Available"
    license: "Microsoft Entra ID P1"
    source: "https://learn.microsoft.com/entra/identity/conditional-access/concept-conditional-access-policy-common"
    verified: 2026-10-27
  - feature: "MFA για διαχειριστές με τους 14 προτεινόμενους ρόλους· Conditional Access μόνο για built-in ρόλους"
    status: "Generally Available"
    license: "Microsoft Entra ID P1"
    source: "https://learn.microsoft.com/entra/identity/conditional-access/policy-old-require-mfa-admin"
    verified: 2026-10-27
  - feature: "Phishing-resistant MFA για διαχειριστές με authentication strength"
    status: "Generally Available"
    license: "Microsoft Entra ID P1"
    source: "https://learn.microsoft.com/entra/identity/conditional-access/policy-admin-phish-resistant-mfa"
    verified: 2026-10-27
  - feature: "Προστασία της καταχώρισης security info· από 6 Ιουλίου 2026 και για Windows Hello for Business και macOS Platform SSO"
    status: "Generally Available"
    license: "Microsoft Entra ID P1"
    source: "https://learn.microsoft.com/entra/identity/conditional-access/policy-all-users-security-info-registration"
    verified: 2026-10-27
  - feature: "Μπλοκάρισμα device code flow και authentication transfer με τη συνθήκη Authentication flows"
    status: "Generally Available"
    license: "Microsoft Entra ID P1"
    source: "https://learn.microsoft.com/entra/identity/conditional-access/policy-block-authentication-flows"
    verified: 2026-10-27
  - feature: "Require device compliance, compliant ή hybrid joined ή MFA, και compliant ή hybrid joined για διαχειριστές"
    status: "Generally Available"
    license: "Microsoft Entra ID P1 και Microsoft Intune Plan 1"
    source: "https://learn.microsoft.com/entra/identity/conditional-access/policy-all-users-device-compliance"
    verified: 2026-10-27
  - feature: "Approved client app ή app protection policy για iOS και Android"
    status: "Generally Available"
    license: "Microsoft Entra ID P1 και Microsoft Intune Plan 1"
    source: "https://learn.microsoft.com/entra/identity/conditional-access/policy-all-users-approved-app-or-app-protection"
    verified: 2026-10-27
  - feature: "Sign-in frequency 1 ώρας και Never persistent browser σε μη διαχειριζόμενες συσκευές, με filter for devices"
    status: "Generally Available"
    license: "Microsoft Entra ID P1"
    source: "https://learn.microsoft.com/entra/identity/conditional-access/policy-all-users-persistent-browser"
    verified: 2026-10-27
  - feature: "Sign-in risk (High, Medium) με MFA και user risk (High) με Require risk remediation και sign-in frequency Every time"
    status: "Generally Available"
    license: "Microsoft Entra ID P2"
    source: "https://learn.microsoft.com/entra/identity/conditional-access/policy-risk-based-user"
    verified: 2026-10-27
  - feature: "Block access for users with insider risk, με Adaptive Protection του Microsoft Purview"
    status: "Generally Available"
    license: "Microsoft Purview Insider Risk Management"
    source: "https://learn.microsoft.com/entra/identity/conditional-access/policy-risk-based-insider-block"
    verified: 2026-10-27
  - feature: "Compliant network check με Global Secure Access, εκτός από All Compliant Network locations"
    status: "Generally Available"
    license: "Microsoft Entra Internet Access ή Microsoft Entra Suite"
    source: "https://learn.microsoft.com/entra/global-secure-access/how-to-compliant-network"
    verified: 2026-10-27
  - feature: "Conditional Access για workload identities: μόνο single-tenant service principals, risk-based μόνο με Block access"
    status: "Generally Available"
    license: "Microsoft Entra Workload ID Premium"
    source: "https://learn.microsoft.com/entra/identity/conditional-access/workload-identity"
    verified: 2026-10-27
  - feature: "MFA για την καταχώριση ή το join συσκευής με το user action «Register or join devices»· η ρύθμιση συσκευών «Require MFA to register or join devices» πρέπει να είναι No"
    status: "Generally Available"
    license: "Microsoft Entra ID P1"
    source: "https://learn.microsoft.com/entra/identity/conditional-access/policy-all-users-device-registration"
    verified: 2026-10-27
  - feature: "Token Protection για sign-in sessions: GA σε Windows, iOS/iPadOS και macOS για Exchange Online, SharePoint Online και Teams· Preview για web εφαρμογές"
    status: "Generally Available"
    license: "Microsoft Entra ID P1"
    source: "https://learn.microsoft.com/entra/identity/conditional-access/concept-token-protection"
    verified: 2026-10-27
  - feature: "PIM: On activation, require Microsoft Entra Conditional Access authentication context, με sign-in frequency Every time"
    status: "Generally Available"
    license: "Microsoft Entra ID P2 ή Microsoft Entra ID Governance"
    source: "https://learn.microsoft.com/entra/id-governance/privileged-identity-management/pim-how-to-change-default-settings"
    verified: 2026-10-27
  - feature: "Conditional Access για εφαρμογές Quick Access και Private Access του Global Secure Access"
    status: "Generally Available"
    license: "Microsoft Entra Private Access ή Microsoft Entra Suite"
    source: "https://learn.microsoft.com/entra/global-secure-access/how-to-target-resource-private-access-apps"
    verified: 2026-10-27
  - feature: "conditionalAccessPolicy στο Microsoft Graph: grant controls (riskRemediation μαζί με authenticationStrength), session controls, authenticationFlows, insiderRiskLevels"
    status: "Generally Available"
    license: "Microsoft Graph v1.0"
    source: "https://learn.microsoft.com/graph/api/resources/conditionalaccessgrantcontrols"
    verified: 2026-10-27
  - feature: "EntraIdSignInEvents στο Advanced Hunting, με ConditionalAccessPolicies· αντικαθιστά το AADSignInEventsBeta από 19/10/2026· απαιτεί Entra ID P2"
    status: "Generally Available"
    license: "Microsoft Entra ID P2"
    source: "https://learn.microsoft.com/defender-xdr/advanced-hunting-entraidsigninevents-table"
    verified: 2026-10-27
  - feature: "KQL του εργαλείου δοκιμασμένο σε production tenant: στήλη ConditionalAccessPolicies του EntraIdSignInEvents, πεδία displayName και result, τιμές reportOnlyFailure και reportOnlyInterrupted"
    status: "Δοκιμασμένο σε production"
    license: "Microsoft Entra ID P2"
    source: "https://learn.microsoft.com/defender-xdr/advanced-hunting-entraidsigninevents-table"
    verified: 2026-10-27
---

Το Conditional Access είναι το «φανάρι» του Microsoft Entra ID: σε κάθε σύνδεση αποφασίζει αν ο χρήστης μπαίνει, αν του ζητείται κάτι επιπλέον, ή αν μπλοκάρεται. Η Microsoft έχει έτοιμα templates για τις πολιτικές που χρειάζεται κάθε οργανισμός. Το ερώτημα είναι ποιες ταιριάζουν στις δικές σου άδειες και στον τρόπο που δουλεύουν οι χρήστες σου, και με ποια σειρά τις ενεργοποιείς χωρίς να κλειδώσεις κανέναν έξω.

Εδώ απαντάς σε λίγες ερωτήσεις και παίρνεις το σύνολο πολιτικών σου: από 9 με Business Premium έως 24 με E5 και πρόσθετες δυνατότητες. Για κάθε πολιτική βλέπεις γιατί υπάρχει, τις ρυθμίσεις της, το JSON για upload στο Microsoft Entra admin center και ένα KQL για να δεις τι θα έκανε πριν την ενεργοποιήσεις. Χρειάζεσαι πέντε λεπτά. Δεν χρειάζεται εγγραφή.

{{< ca-baseline >}}

## Πόσες πολιτικές θα πάρεις

Η βάση είναι πάντα εννέα πολιτικές, πάνω στην κατηγορία «Secure foundation» της Microsoft: MFA για τους διαχειριστές και στα admin portals, MFA για όλους, μπλοκάρισμα του legacy authentication, προστασία της καταχώρισης MFA, MFA για τη διαχείριση του Azure, μία πολιτική συσκευών, μπλοκάρισμα του device code flow και MFA για την καταχώριση ή το join συσκευής. Αυτές θέλουν μόνο Microsoft Entra ID P1, που υπάρχει στο Business Premium, στο E3 και στο EMS E3.

Οι απαντήσεις σου προσθέτουν τις υπόλοιπες. Αν έχεις περισσότερες από μία άδειες, για παράδειγμα Microsoft 365 E3 μαζί με EMS E5, τις τσεκάρεις όλες, και το εργαλείο συνδυάζει όσα δίνει η καθεμία:

| Αν έχεις | Προστίθενται | Σύνολο έως |
|---|---|---|
| Entra ID P1 (Business Premium, Microsoft 365 E3 ή EMS E3), με επισκέπτες, εταιρικές συσκευές με Windows και BYOD | Διαχειριστές μόνο από εταιρική συσκευή, άγνωστες πλατφόρμες, MFA για επισκέπτες, app protection στα κινητά, όρια στις μη διαχειριζόμενες συσκευές, Token Protection στα Windows | 16 |
| Και Microsoft Entra ID P2, από το Defender Suite for Business Premium, το EMS E5 ή ως add-on | MFA σε ύποπτη σύνδεση, αυτόματη αποκατάσταση παραβιασμένου λογαριασμού, ισχυρή αυθεντικοποίηση στην ενεργοποίηση ρόλου με το Privileged Identity Management | 19 |
| E5 ή E7, ή Business Premium με τα αντίστοιχα add-ons | Session control μέσω Defender for Cloud Apps, insider risk, compliant network μέσω Global Secure Access, εσωτερικές εφαρμογές μέσω Entra Private Access, service principals | 24 |

Το αν η πολιτική συσκευών είναι «compliant device» ή «compliant device ή MFA» εξαρτάται από το αν όλες οι συσκευές σου είναι στο Intune. Όταν είναι, οι πολιτικές για τις μη διαχειριζόμενες συσκευές δεν χρειάζονται και το σύνολο μικραίνει.

## Γιατί σε κύματα

Όλες οι πολιτικές ξεκινούν σε Report-only. Σε αυτή την κατάσταση το Conditional Access αξιολογεί την πολιτική σε κάθε σύνδεση και γράφει στα sign-in logs τι θα έκανε, χωρίς να το κάνει. Έτσι βλέπεις ποιος θα μπλοκαριζόταν πριν συμβεί.

Τα κύματα βάζουν πρώτα ό,τι δεν αγγίζει την καθημερινή δουλειά των χρηστών: τους διαχειριστές, το legacy authentication και το device code flow. Ακολουθεί το MFA για όλους και οι επισκέπτες, μετά οι συσκευές, που θέλουν έτοιμο Intune, και στο τέλος τα προχωρημένα. Κάθε κύμα γυρίζει σε On αφού δεις τα αποτελέσματα του προηγούμενου.

## Οι λογαριασμοί έκτακτης ανάγκης

Πριν από οποιαδήποτε πολιτική, φτιάξε δύο λογαριασμούς έκτακτης ανάγκης (break-glass): cloud-only, με Global Administrator, με πολύ μεγάλο κωδικό ή FIDO2 security key, και ειδοποίηση σε κάθε σύνδεσή τους. Βάλ' τους σε μία ομάδα και εξαίρεσε την ομάδα από κάθε πολιτική. Αν ένα λάθος στο Conditional Access κλειδώσει έξω όλους τους διαχειριστές, είναι ο μόνος τρόπος να μπεις. Αν δώσεις το Object ID της ομάδας στο βήμα 2, το εργαλείο το βάζει μόνο του στο JSON κάθε πολιτικής.

## Πώς ανεβάζεις τις πολιτικές

1. Κατέβασε το .zip από το εργαλείο. Έχει ένα αρχείο JSON ανά πολιτική και ένα αρχείο με οδηγίες.
2. Στο Microsoft Entra admin center πήγαινε **Entra ID > Conditional Access > Policies**.
3. Πάτα **Upload policy file**, διάλεξε ένα αρχείο JSON και πάτα **Create**. Επανάλαβε για κάθε αρχείο.
4. Όλες οι πολιτικές ανεβαίνουν σε Report-only. Άνοιξε κάθε μία και έλεγξε τις εξαιρέσεις.

Αν προτιμάς, φτιάχνεις κάθε πολιτική από το template της Microsoft (**Create new policy from templates**) και τη συγκρίνεις με τις ρυθμίσεις που δείχνει το εργαλείο. Το όνομα κάθε template είναι δίπλα στην πολιτική.

## Πώς ελέγχεις το Report-only

Το KQL κάθε πολιτικής τρέχει στο **Microsoft Defender portal > Investigation & response > Hunting > Advanced hunting** και διαβάζει τον πίνακα `EntraIdSignInEvents`. Δείχνει ποιοι χρήστες, από ποιες εφαρμογές και πλατφόρμες, θα μπλοκάρονταν (`reportOnlyFailure`) ή θα τους ζητούνταν κάτι επιπλέον (`reportOnlyInterrupted`) τις τελευταίες επτά ημέρες. Ο πίνακας γεμίζει μόνο με Microsoft Entra ID P2. Με P1 βλέπεις τα ίδια στα **Sign-in logs**, στην καρτέλα **Report-only** κάθε σύνδεσης, και στο **Policy impact** κάθε πολιτικής.

Για περισσότερα queries πάνω στις συνδέσεις, όπως password spraying και συνδέσεις από το εξωτερικό, δες τη [Βιβλιοθήκη KQL](/kql/).

## Τι τεκμηριώνει για τον έλεγχο

Η [ΚΥΑ 1689/2025](/kya-1689-2025/) ζητά στο άρθρο 13 ισχυρές μεθόδους αυθεντικοποίησης και MFA ανάλογα με την κρισιμότητα (13.στ, 13.ζ), και περιορισμό των προνομιούχων λογαριασμών (13.δ). Στο άρθρο 14 ζητά επιβολή ασφαλούς παραμετροποίησης, και στο άρθρο 19 αποτροπή σύνδεσης μη εξουσιοδοτημένων συσκευών (19.δ). Το Conditional Access είναι ο μηχανισμός που τα επιβάλλει στο Microsoft 365. Το ίδιο ισχύει για το άρθρο 21.2.ι της [Οδηγίας NIS2](/nis2/), τους ελέγχους A.8.5 και A.8.2 του [ISO/IEC 27001](/iso-27001/) και το άρθρο 32.1.β του [GDPR](/gdpr/). Το εργαλείο δείχνει για κάθε πολιτική ποια απαίτηση υλοποιεί, και ανά πλαίσιο ποιες πολιτικές καλύπτουν κάθε απαίτηση.

Ο ελεγκτής θα ζητήσει τρία πράγματα: την πολιτική ελέγχου πρόσβασης ως έγγραφο, εγκεκριμένη από τη διοίκηση, τις πολιτικές Conditional Access όπως είναι στο tenant, και απόδειξη ότι εφαρμόζονται, δηλαδή τα sign-in logs. Το .xlsx κρατά τις ημερομηνίες Report-only και On κάθε πολιτικής, ώστε να φαίνεται πότε επιβλήθηκε κάθε μέτρο. Για το έγγραφο της πολιτικής ελέγχου πρόσβασης, δες το [Μητρώο υποχρεωτικών πολιτικών](/mitroo-politikon/).

## Οι πολιτικές και το MITRE ATT&CK

Κάθε πολιτική κλείνει μια συγκεκριμένη τεχνική επίθεσης. Το MFA για όλους και το μπλοκάρισμα του legacy authentication απαντούν στο {{< attack id="T1110.003" name=true >}} και στο {{< attack id="T1078.004" name=true >}}. Το μπλοκάρισμα του device code flow απαντά στο {{< attack id="T1528" name=true >}} μέσω {{< attack id="T1566.002" name=true >}}. Οι πολιτικές για τις μη διαχειριζόμενες συσκευές και το compliant network περιορίζουν το {{< attack id="T1539" name=true >}} και το {{< attack id="T1550.004" name=true >}}, που είναι ο στόχος ενός AiTM phishing. Το MFA για επισκέπτες απαντά στο {{< attack id="T1199" name=true >}}. Όλες μαζί υλοποιούν το mitigation {{< attack id="M1032" name=true >}}, και οι πολιτικές των διαχειριστών το {{< attack id="M1026" name=true >}}.

## Τι δεν καλύπτει το εργαλείο

- **Τις υπάρχουσες πολιτικές σου.** Το εργαλείο δεν συνδέεται στο tenant σου. Αν έχεις ήδη πολιτικές, σύγκρινε πριν ανεβάσεις, ώστε να μη διπλασιάσεις ή να μη συγκρούσεις κάποια. Όταν ισχύουν δύο πολιτικές σε μια σύνδεση, πρέπει να ικανοποιηθούν και οι δύο, και ένα Block υπερισχύει πάντα.
- **Τα security defaults.** Αν είναι ενεργά, πρέπει να τα απενεργοποιήσεις για να ενεργοποιήσεις πολιτικές Conditional Access. Κάν' το αφού οι πολιτικές του πρώτου κύματος είναι έτοιμες σε Report-only.
- **Το Intune.** Οι πολιτικές συσκευών θέλουν compliance και app protection policies στο Intune. Το εργαλείο δεν τις φτιάχνει.
- **Τοποθεσίες και χώρες.** Ένα μπλοκάρισμα ανά χώρα εξαρτάται από το πού ταξιδεύουν και δουλεύουν οι χρήστες σου. Η Microsoft δεν το έχει στο Secure foundation και δεν το προσθέτει ούτε το εργαλείο.
- **Τη νομική κρίση.** Το εργαλείο είναι βοήθημα και δεν αποτελεί ελεγκτική γνώμη ούτε νομική συμβουλή.

## Πηγές και επαλήθευση {#last-verified}

{{< verification >}}

Οι πολιτικές βασίζονται στα templates και στις οδηγίες της Microsoft. Το thecybersec.gr είναι προσωπικό blog και δεν εκπροσωπεί τη Microsoft ή την Εθνική Αρχή Κυβερνοασφάλειας.

{{< tool-link page="/poia-adeia-microsoft-365" lead="Δεν ξέρεις αν έχεις P2;" label="Δες Ποια άδεια Microsoft 365 χρειάζομαι" tail="για όσα περιλαμβάνει κάθε πακέτο." >}}
