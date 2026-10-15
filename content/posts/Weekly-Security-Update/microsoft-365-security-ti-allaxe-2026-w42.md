---
title: "Microsoft 365 Security: τι άλλαξε (εβδομάδα 42/2026)"
date: 2026-10-16T08:00:00+03:00
lastmod: 2026-10-16T08:00:00+03:00
draft: true
keywords:
  - Microsoft 365 Security νέα
  - Search-UnifiedAuditLog retirement
  - AuditLogQuery API
  - Entra Agent ID agent blueprints
  - Windows Hello for Business MFA
  - NTLMv1 BlockNtlmv1SSO
  - Defender for Identity νέα alerts
tags:
  - Microsoft 365 Security
  - Microsoft Purview
  - Microsoft Entra
  - Microsoft Defender for Identity
  - Windows
  - Εβδομαδιαία σύνοψη
author: "Dimosthenis Atteia"
description: "Εβδομάδα 42/2026: τέλος του Search-UnifiedAuditLog, αλλαγές στο Entra Agent ID στις 4 Νοεμβρίου, Windows Hello for Business ως MFA, NTLMv1 σε Enforce."
summary: "Το Search-UnifiedAuditLog αποσύρεται στις 15 Οκτωβρίου 2027 υπέρ του AuditLogQuery API, το Entra αλλάζει από τις 4 Νοεμβρίου ποιος δημιουργεί agents, και το Windows Hello for Business γίνεται αυτόνομος παράγοντας MFA."
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
# Πλαίσιο «Last verified»: η ημερομηνία είναι ο έλεγχος του τεύχους (στιγμιότυπο της εβδομάδας)
verification:
  - feature: "Purview Audit: απόσυρση του Search-UnifiedAuditLog (15 Οκτωβρίου 2027)"
    status: "Retirement"
    license: "Δεν αναφέρεται"
    source: "https://learn.microsoft.com/en-us/graph/api/resources/security-auditlogquery?view=graph-rest-1.0"
    verified: 2026-10-15
  - feature: "Entra Agent ID: ποιος δημιουργεί agents και το AgentIdentity.CreateAsManager (4 Νοεμβρίου 2026)"
    status: "Not stated"
    license: "Δεν αναφέρεται"
    source: "https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/delegate-app-roles#restrict-who-can-create-agents"
    verified: 2026-10-15
  - feature: "Entra: Windows Hello for Business και macOS Platform SSO ως αυτόνομοι παράγοντες MFA"
    status: "Generally Available"
    license: "Δεν αναφέρεται"
    source: "https://learn.microsoft.com/en-us/windows/security/identity-protection/hello-for-business/deploy/prepare-users"
    verified: 2026-10-15
  - feature: "Windows: NTLMv1 σε Enforce και Administrator protection στα security baselines"
    status: "Generally Available"
    license: "Δεν αναφέρεται"
    source: "https://support.microsoft.com/help/5066470"
    verified: 2026-10-15
  - feature: "Defender for Identity: νέα alerts για Entra ID, Active Directory και Okta"
    status: "Not stated"
    license: "Defender for Identity"
    source: "https://learn.microsoft.com/en-us/defender-for-identity/alerts-xdr"
    verified: 2026-10-15
---

## Με μια ματιά

Η αλλαγή με τη μεγαλύτερη συνέπεια για τις διαδικασίες σου αυτή την εβδομάδα είναι στο **Microsoft Purview Audit**: το cmdlet `Search-UnifiedAuditLog` σταματά να δίνει πρόσβαση στο audit log στις 15 Οκτωβρίου 2027, και η αντικατάστασή του, το **AuditLogQuery API** του Microsoft Graph, γίνεται GA. Η πιο κοντινή προθεσμία είναι στο **Microsoft Entra**: από τις 4 Νοεμβρίου 2026 αλλάζουν δύο πράγματα στο πώς δημιουργούνται agents και agent identities. Παράλληλα, το October 2026 security update των Windows αλλάζει δύο προεπιλογές, και το Defender for Identity αποκτά νέα alerts.

## Οι αλλαγές της εβδομάδας

### 1. Microsoft Purview Audit: το Search-UnifiedAuditLog αποσύρεται, έρχεται το AuditLogQuery API

**Φάση:** Retirement του cmdlet στις 15 Οκτωβρίου 2027, GA του AuditLogQuery API από τις αρχές Οκτωβρίου 2026, σύμφωνα με την ανακοίνωση · **Άδεια:** δεν αναφέρεται στην πηγή

**Τι αλλάζει.** Το AuditLogQuery API του Microsoft Graph γίνεται η αντικατάσταση του cmdlet `Search-UnifiedAuditLog` για την ανάκτηση εγγραφών από το audit log του Purview. Το cmdlet συνεχίζει να δουλεύει όπως σήμερα μέχρι τις 15 Οκτωβρίου 2027 και μετά σταματά να δίνει πρόσβαση στο audit log. Δεν υπάρχει ρύθμιση στο tenant που να αποτρέπει την απόσυρση. Σύμφωνα με την ανακοίνωση, το API επιτρέπει εξαγωγή έως 1 εκατομμυρίου εγγραφών ανά query, έχει πιο λεπτομερή δικαιώματα ανά workload, και κάθε tenant έχει βασικό όριο 200 υποβολές αναζήτησης ανά 24 ώρες και έως 50 αναζητήσεις σε αναμονή ή εκτέλεση ταυτόχρονα. Όταν ξεπεραστεί το όριο, το API επιστρέφει HTTP 429.

**Τι να κάνεις.** Βρες όλα τα scripts, τα runbooks και τα εργαλεία που καλούν το `Search-UnifiedAuditLog`: εξαγωγές για έρευνες, αναφορές συμμόρφωσης, αυτοματισμούς του SOC. Για κάθε ένα, κάνε app registration στο Microsoft Graph με τα δικαιώματα που ζητά το API, ξαναγράψε την κλήση και δοκίμασέ την. Λάβε υπόψη τα όρια των 200 υποβολών ανά ημέρα αν έχεις πολλά προγραμματισμένα jobs. Έχεις έναν χρόνο, αλλά αυτά τα scripts συνήθως τα θυμάται κάποιος μόνο όταν σπάσουν, μέσα σε ένα περιστατικό.

**Πηγή:** [auditLogQuery resource type](https://learn.microsoft.com/en-us/graph/api/resources/security-auditlogquery?view=graph-rest-1.0) · Message Center [MC1505599](https://mc.merill.net/message/MC1505599) (αρχείο mc.merill.net, δημοσιεύθηκε στις 12 Οκτωβρίου 2026)

### 2. Microsoft Entra Agent ID: δύο αλλαγές στη δημιουργία agents από τις 4 Νοεμβρίου

**Φάση:** δεν αναφέρεται στην πηγή, αλλαγή προεπιλογής με διάθεση από τις αρχές έως τα τέλη Νοεμβρίου 2026, σύμφωνα με τις ανακοινώσεις · **Άδεια:** δεν αναφέρεται στην πηγή

**Τι αλλάζει.** Η πρώτη αλλαγή αφορά τους χρήστες. Από τις 4 Νοεμβρίου 2026 οι απλοί χρήστες, χωρίς built-in ή custom ρόλο στο Entra, θα μπορούν να δημιουργούν agent blueprints και agent identities, εκτός αν απενεργοποιήσεις τη ρύθμιση **Users can create agent blueprints**. Αν τη βάλεις στο No, agents δημιουργούν μόνο οι διαχειριστές και όσοι έχουν τον ρόλο **Agent ID Developer**. Η ρύθμιση είναι ανεξάρτητη από το **Users can register applications**, οπότε θέλει δικό της έλεγχο. Σύμφωνα με την ανακοίνωση, αν αλλάξεις τη ρύθμιση τώρα, εφαρμόζεται όταν ξεκινήσει η διάθεση.

Η δεύτερη αλλαγή αφορά τους ίδιους τους agents. Από τις 4 Νοεμβρίου το Entra σταματά να δίνει αυτόματα το δικαίωμα `AgentIdentity.CreateAsManager` στα agent blueprints. Για να δημιουργεί ένας agent δικές του identities με app-only authentication, θα χρειάζεται admin consent. Όσοι agents βασίζονται μόνο στο αυτόματο δικαίωμα θα παίρνουν σφάλμα 403. Οι υπάρχουσες agent identities και τα blueprints δεν διαγράφονται, και το δικαίωμα, όταν δοθεί, φαίνεται, καταγράφεται και ανακαλείται.

**Τι να κάνεις.**

- Αποφάσισε αν θέλεις οι απλοί χρήστες να φτιάχνουν agents. Αν όχι, στο Entra admin center πήγαινε Entra ID → Users → User settings και βάλε το **Users can create agent blueprints** στο No. Χρειάζεσαι τουλάχιστον τον ρόλο Cloud Application Administrator.
- Δες στο Entra ID → Audit Logs, με Category «ApplicationManagement» και Activity «Add Service Principal», ποιες εφαρμογές δημιουργούν agent identities. Για κάθε blueprint έλεγξε στο Entra ID → Agent blueprints → Granted permissions αν βασίζεται μόνο στο `AgentIdentity.CreateAsManager`.
- Για όσους agents το χρειάζονται, δώσε admin consent. Σύμφωνα με την ανακοίνωση, αυτό γίνεται από τις 16 Οκτωβρίου, και αν το επιχειρήσεις νωρίτερα παίρνεις σφάλμα. Δοκίμασε τη δημιουργία identities πριν από τις 4 Νοεμβρίου.

**Πηγή:** [Restrict who can create agents](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/delegate-app-roles#restrict-who-can-create-agents) · [Microsoft Graph permissions reference: AgentIdentity.CreateAsManager](https://learn.microsoft.com/en-us/graph/permissions-reference#agentidentitycreateasmanager) · Message Center [MC1506733](https://mc.merill.net/message/MC1506733) και [MC1506728](https://mc.merill.net/message/MC1506728) (αρχείο mc.merill.net, δημοσιεύθηκαν στις 13 Οκτωβρίου 2026)

### 3. Microsoft Entra: Windows Hello for Business και macOS Platform SSO ως αυτόνομοι παράγοντες MFA

**Φάση:** GA, με διάθεση από τις αρχές Οκτωβρίου έως τα μέσα Δεκεμβρίου 2026, σύμφωνα με την ανακοίνωση · **Άδεια:** δεν αναφέρεται στην πηγή

**Τι αλλάζει.** Σήμερα το Windows Hello for Business και το macOS Platform SSO καλύπτουν το MFA στην αρχική σύνδεση, αλλά για step-up, Authentication Strength και sign-in frequency ο χρήστης μπορεί να χρειαστεί άλλο passkey ή μέθοδο. Μετά τη διάθεση θα καλύπτουν και αυτά τα σενάρια, και θα εμφανίζονται στο My Security Info ως passkeys που καταχωρίζονται αυτόματα. Χρήστες που έχουν ως μόνη μέθοδο MFA το Windows Hello for Business ή το Platform SSO θα θεωρούνται MFA-capable, και δεν θα τους ζητείται πλέον αυτόματα να καταχωρίσουν άλλη μέθοδο. Η ανακοίνωση ενημερώθηκε στις 13 Οκτωβρίου 2026 και η ολοκλήρωση της διάθεσης μετατέθηκε από τα τέλη Νοεμβρίου στα μέσα Δεκεμβρίου.

**Τι να κάνεις.** Δεν χρειάζεται ρύθμιση, αλλά υπάρχει μια παγίδα: τα δύο credentials είναι δεμένα στη συσκευή. Ένας χρήστης με μόνη μέθοδο το Windows Hello for Business δεν θα μπορεί να κάνει MFA από άλλη συσκευή ή όταν αλλάξει laptop, και το Entra δεν θα του ζητήσει πια να καταχωρίσει δεύτερη μέθοδο. Ενημέρωσε τη διαδικασία onboarding ώστε κάθε χρήστης να έχει τουλάχιστον μία φορητή μέθοδο, για παράδειγμα passkey στο Microsoft Authenticator. Έλεγξε επίσης τα custom Authentication Strength policies, για να δεις αν επιτρέπουν αυτά τα credentials εκεί που θέλεις. Για το γενικότερο πλαίσιο, δες το άρθρο για τα [passkeys ως προεπιλογή και το τέλος των SMS και voice στο MFA](/posts/passkeys-by-default-telos-sms-voice-mfa/).

**Πηγή:** [Prepare users to provision and use Windows Hello for Business](https://learn.microsoft.com/en-us/windows/security/identity-protection/hello-for-business/deploy/prepare-users) · Message Center [MC1450134](https://mc.merill.net/message/MC1450134) (αρχείο mc.merill.net, δημοσιεύθηκε στις 7 Αυγούστου 2026, ενημερώθηκε στις 13 Οκτωβρίου 2026)

### 4. Windows: το October 2026 security update αλλάζει δύο προεπιλογές ασφάλειας

**Φάση:** GA, με το security update της 13ης Οκτωβρίου 2026 · **Άδεια:** δεν αναφέρεται στην πηγή

**Τι αλλάζει.** Η πρώτη αλλαγή αφορά το NTLMv1. Στα Windows 11 24H2, 25H2 και 26H2 και στα Windows Server 2025, η δημιουργία credentials που προέρχονται από NTLMv1 για Single Sign-On μπλοκάρεται πλέον από προεπιλογή (Enforce mode), εκτός αν έχεις ήδη ορίσει την τιμή `BlockNtlmv1SSO` στο registry. Επηρεάζονται μόνο συσκευές χωρίς ενεργό Credential Guard. Το πρακτικό αποτέλεσμα: συνδέσεις Wi-Fi, Ethernet και VPN με MS-CHAPv2 (PEAP-MSCHAPv2, EAP-MSCHAPv2) δεν συνδέονται πια αυτόματα με αποθηκευμένα credentials. Ο χρήστης μπορεί ακόμη να τα πληκτρολογήσει. Η Microsoft τονίζει ότι πρόκειται για προγραμματισμένη αλλαγή και όχι για γνωστό πρόβλημα του update.

Η δεύτερη αλλαγή αφορά το **Administrator protection**. Αν χρησιμοποιείς τα Windows security baselines, ενεργοποιείται από προεπιλογή με το October 2026 security update. Τα baselines για Windows 11 24H2, 25H2 και 26H2 περιλαμβάνουν τις νέες ρυθμίσεις, που ελέγχονται με policy. Με το Administrator protection ο διαχειριστής δουλεύει με περιορισμένα δικαιώματα και εγκρίνει ρητά κάθε ενέργεια που χρειάζεται admin rights.

**Τι να κάνεις.** Για το NTLMv1, έλεγξε στο Microsoft-Windows-NTLM/Operational log για Event ID 4025 (μπλοκαρισμένα αιτήματα) και μάθε από το help desk αν υπάρχουν παράπονα για Wi-Fi ή VPN. Η μόνιμη λύση είναι να περάσεις τα Wi-Fi και VPN profiles σε πιστοποιητικά (PEAP-TLS ή EAP-TLS). Αν χρειαστείς χρόνο, η Microsoft επιτρέπει προσωρινή επιστροφή σε Audit mode με `BlockNtlmv1SSO = 0`, αλλά λέει ότι αυτό μειώνει την ασφάλεια της συσκευής και δεν είναι μακροχρόνια λύση. Αν το κάνεις, τεκμηρίωσε την εξαίρεση, βάλε της ημερομηνία λήξης και παρακολούθησε το Event ID 4024. Για το Administrator protection, δοκίμασε σε πιλοτική ομάδα πώς δουλεύουν τα εργαλεία των διαχειριστών σου πριν φτάσει παντού, και ρύθμισέ το με Intune ή Group Policy αν η προεπιλογή δεν σου ταιριάζει. Συνδέεται με το security baseline για Windows 11 26H2 που κάλυψε το [προηγούμενο τεύχος](/posts/weekly-security-update/microsoft-365-security-ti-allaxe-2026-w41/).

**Πηγή:** [KB5066470](https://support.microsoft.com/help/5066470) · [Credential Guard: Wi-Fi and VPN considerations](https://learn.microsoft.com/en-us/windows/security/identity-protection/credential-guard/considerations-known-issues#wi-fi-and-vpn-considerations) · [Administrator protection](https://learn.microsoft.com/en-us/windows/security/application-security/application-control/administrator-protection/) · Message Center [MC1508562](https://mc.merill.net/message/MC1508562) (δημοσιεύθηκε στις 15 Οκτωβρίου 2026) και [MC1506291](https://mc.merill.net/message/MC1506291) (δημοσιεύθηκε στις 13 Οκτωβρίου 2026), αρχείο mc.merill.net

### 5. Defender for Identity: νέα alerts για Entra ID, Active Directory και Okta

**Φάση:** δεν αναφέρεται στην πηγή · **Άδεια:** Microsoft Defender for Identity, που δεν περιλαμβάνεται στο Microsoft 365 E3

**Τι αλλάζει.** Η σελίδα «What's new» του Defender for Identity προσθέτει για τον Οκτώβριο 2026 νέα alerts σε τρεις ομάδες:

- **Entra ID:** «Suspicious sign-in via Temporary Access Pass». Εντοπίζει σύνδεση με Temporary Access Pass, όταν ο διαχειριστής που το δημιούργησε είχε ύποπτη δραστηριότητα σύνδεσης πριν από αυτό. Το μοτίβο μπορεί να σημαίνει ότι επιτιθέμενος παραβίασε λογαριασμό διαχειριστή και παρακάμπτει το MFA.
- **Active Directory:** έντεκα alerts, ανάμεσά τους diamond ticket στο Kerberos, απόπειρες εκμετάλλευσης του CVE-2025-33073, αίτημα για το DPAPI master key, exfiltration μέσω DNS, και κατάχρηση του Active Directory Certificate Services (ESC1, ESC8, ESC11), μαζί με κλοπή του πιστοποιητικού και του ιδιωτικού κλειδιού της CA.
- **Okta:** επτά alerts, όπως νέα μέθοδος MFA σε privileged λογαριασμό, consent grant από επικίνδυνο context και προσθήκη δεύτερου identity provider.

**Τι να κάνεις.** Ενημέρωσε το SOC για τα νέα ονόματα alerts και έλεγξε ότι τα playbooks σου καλύπτουν το AD CS, αφού τα alerts ESC8 και diamond ticket έχουν severity High. Αν έχεις Okta συνδεδεμένο στο Defender for Identity, δες ποιος παραλαμβάνει τα νέα alerts. Αν έχεις AD CS, αυτή είναι καλή αφορμή να ελέγξεις τα certificate templates σου. Για το πώς δουλεύει το προϊόν, δες το [deep dive στο Defender for Identity](/posts/microsoft-defender-up-close-series/microsoft-defender-for-identity-deep-dive/).

**Πηγή:** [What's new in Microsoft Defender for Identity](https://learn.microsoft.com/en-us/defender-for-identity/whats-new) · [Security alerts in Microsoft Defender XDR (Defender for Identity)](https://learn.microsoft.com/en-us/defender-for-identity/alerts-xdr)

## Προσοχή αυτή την εβδομάδα

**Ήδη σε ισχύ, Windows.** Το NTLMv1 σε Enforce mode και το Administrator protection στα baselines ήρθαν με το security update της 13ης Οκτωβρίου 2026 (αλλαγή 4). Αν έχεις συσκευές χωρίς Credential Guard σε Wi-Fi ή VPN με MS-CHAPv2, τα πρώτα παράπονα μπορεί να έρθουν μόλις εγκατασταθεί το update.

**Από 16 Οκτωβρίου 2026, Microsoft Entra.** Μπορείς να δώσεις admin consent για το `AgentIdentity.CreateAsManager` στους agents που το χρειάζονται (αλλαγή 2).

**Τέλη Οκτωβρίου 2026, Defender for Office 365.** Σύμφωνα με την ανακοίνωση MC1484009, όπως ενημερώθηκε στις 9 Οκτωβρίου 2026, τα νέα δεδομένα για email submissions στο advanced hunting περνούν σε GA από τα τέλη Οκτωβρίου έως τα μέσα Νοεμβρίου 2026, αντί για αρχές Οκτωβρίου. Δεν χρειάζεται ενέργεια.

**4 Νοεμβρίου 2026, Microsoft Entra.** Αλλάζει η προεπιλογή για το ποιος δημιουργεί agent blueprints και σταματά η αυτόματη παραχώρηση του `AgentIdentity.CreateAsManager` (αλλαγή 2).

**15 Οκτωβρίου 2027, Microsoft Purview Audit.** Το `Search-UnifiedAuditLog` σταματά να δίνει πρόσβαση στο audit log (αλλαγή 1).

Οι ημερομηνίες των ανακοινώσεων μπορεί να διαφέρουν ανά tenant, οπότε δες τις στο δικό σου Message Center.

**Πηγή:** Message Center [MC1484009](https://mc.merill.net/message/MC1484009) (αρχείο mc.merill.net)

## Σύνδεση με την ΚΥΑ 1689/2025

- **[24.δ](/kya-1689-2025/#24-δ) και [24.ε](/kya-1689-2025/#24-ε), τήρηση και έλεγχος των καταγραφών:** αν η εξαγωγή του audit log για αρχειοθέτηση ή για τακτικό έλεγχο βασίζεται στο `Search-UnifiedAuditLog`, η μετάβαση στο AuditLogQuery API κρατά τη διαδικασία ζωντανή μετά το 2027.
- **[13.γ](/kya-1689-2025/#13-γ) και [13.δ](/kya-1689-2025/#13-δ), least privilege και περιορισμός δικαιωμάτων διαχείρισης:** η απόφαση για το ποιος δημιουργεί agents και το ρητό admin consent στο `AgentIdentity.CreateAsManager` εφαρμόζουν least privilege και στις ταυτότητες των agents. Το Administrator protection περιορίζει τα admin rights στη στιγμή που χρειάζονται.
- **[13.στ](/kya-1689-2025/#13-στ) και [13.ζ](/kya-1689-2025/#13-ζ), ισχυρή αυθεντικοποίηση και MFA:** το Windows Hello for Business ως αυτόνομος παράγοντας MFA επεκτείνει τη phishing-resistant αυθεντικοποίηση, αρκεί κάθε χρήστης να έχει και φορητή μέθοδο.
- **[19.γ](/kya-1689-2025/#19-γ), ασφαλής αυθεντικοποίηση για πρόσβαση στο δίκτυο:** η μετάβαση των Wi-Fi και VPN profiles από MS-CHAPv2 σε EAP-TLS είναι τεκμήριο για αυτή την απαίτηση. Αν κρατήσεις προσωρινά Audit mode, τεκμηρίωσέ το ως εξαίρεση με αντισταθμιστικά μέτρα, όπως ζητά και η [17.γ](/kya-1689-2025/#17-γ).
- **[24.ε](/kya-1689-2025/#24-ε), τακτικός έλεγχος για ύποπτη δραστηριότητα:** τα νέα alerts του Defender for Identity για AD CS, Kerberos και Okta αυξάνουν την κάλυψη του αυτοματοποιημένου ελέγχου.

Όλες οι απαιτήσεις της ΚΥΑ 1689/2025 με την αντιστοίχισή τους βρίσκονται στον [οδηγό της ΚΥΑ 1689/2025](/kya-1689-2025/).

## Πηγές και επαλήθευση {#last-verified}

{{< verification >}}

Για αυτό το τεύχος ελέγχθηκαν το αρχείο mc.merill.net (αναρτήσεις Message Center από τις 9 έως τις 15 Οκτωβρίου 2026) και οι σελίδες «What's new» των Microsoft Defender XDR, Defender for Endpoint, Defender for Office 365, Defender for Identity, Defender for Cloud Apps, Microsoft Intune, Microsoft Purview και Microsoft Entra. Οι σελίδες των Defender XDR, Purview και Entra δεν είχαν καταχωρίσεις Οκτωβρίου όταν διαβάστηκαν. Οι καταχωρίσεις Οκτωβρίου των Defender for Cloud Apps και Intune καλύφθηκαν στο προηγούμενο τεύχος, εκτός από μια νέα έκδοση του Remote Help for Windows χωρίς αλλαγές ασφάλειας. Η σελίδα του Defender for Endpoint προσθέτει το vulnerability assessment για εφαρμογές του Microsoft Store (GA, μέρος του Defender Vulnerability Management), και η σελίδα του Defender for Office 365 την αναφορά συσκέψεων Teams από τους χρήστες, που είναι συνέχεια της αλλαγής του τεύχους 40. Κανένα από τα δύο δεν μπήκε στις πέντε αλλαγές. Στα blogs της Microsoft για Security, Entra και Intune δεν βρέθηκε ανακοίνωση της εβδομάδας που να προσθέτει κάτι στα παραπάνω.

Οι ανακοινώσεις MC1505599, MC1506733, MC1506728, MC1450134, MC1508562, MC1506291 και MC1484009 διαβάστηκαν από το έγκυρο, δημόσιο και ανεξάρτητο αρχείο του Microsoft 365 Message Center, mc.merill.net, που το συντηρεί η κοινότητα και όχι η Microsoft. Η MC1505599 ελέγχθηκε επιπλέον στο Message Center ενός tenant στις 15 Οκτωβρίου 2026 και το κείμενό της συμφωνεί με το αρχείο. Οι υπόλοιπες δεν διαβάστηκαν σε Message Center κάποιου tenant. Το πόσο επιβεβαιώνονται από τη Microsoft διαφέρει ανά θέμα:

- **Purview Audit (MC1505599):** η ημερομηνία απόσυρσης, τα όρια και η GA προέρχονται από την ανακοίνωση, που διαβάστηκε και στο αρχείο και σε Message Center tenant με το ίδιο κείμενο. Η σελίδα του Microsoft Learn για το `auditLogQuery` είναι στο v1.0 του Graph, αλλά δεν αναφέρει την απόσυρση. Η σελίδα του cmdlet `Search-UnifiedAuditLog` επίσης δεν την αναφέρει ακόμη.
- **Entra Agent ID (MC1506733, MC1506728):** η ρύθμιση, η διαδρομή της και ο ρόλος Agent ID Developer επιβεβαιώνονται από το Microsoft Learn. Η ημερομηνία της 4ης Νοεμβρίου και η αλλαγή στο `AgentIdentity.CreateAsManager` προέρχονται μόνο από το αρχείο.
- **Windows Hello for Business ως MFA (MC1450134):** η αλλαγή και οι ημερομηνίες προέρχονται μόνο από το αρχείο. Η ανακοίνωση σημειώνει ότι οι σελίδες του Microsoft Learn θα ενημερωθούν κοντά στη GA, και η σελίδα για το system-preferred authentication περιγράφει ακόμη την τρέχουσα συμπεριφορά.
- **Windows (MC1508562, MC1506291):** το NTLMv1 σε Enforce επιβεβαιώνεται από το KB5066470, και το Administrator protection στα baselines από τη σελίδα του Microsoft Learn.
- **Defender for Identity:** προέρχεται μόνο από τις σελίδες της Microsoft. Δεν βρέθηκε ανακοίνωση Message Center.

Οι ανακοινώσεις και οι ημερομηνίες τους διαφέρουν ανά tenant. Πριν ενεργήσεις, δες την αντίστοιχη ανακοίνωση στο δικό σου Message Center.

Τελευταίος έλεγχος αδειών και στοιχείων: 15 Οκτωβρίου 2026.
