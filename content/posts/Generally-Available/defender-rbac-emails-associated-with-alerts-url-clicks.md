---
title: "Generally Available: Το «Emails associated with alerts» καλύπτει και τα alerts για κλικ σε URLs"
seoTitle: "GA: Emails associated with alerts και για κλικ σε URLs"
slug: "defender-rbac-emails-associated-with-alerts-url-clicks"
date: 2026-11-06T08:10:00+02:00
lastmod: 2026-11-06T08:10:00+02:00
draft: true
keywords:
  - Emails associated with alerts
  - Microsoft Defender unified RBAC
  - MC1536045
  - Email & collaboration content permission
  - A potentially malicious URL click was detected
  - A user clicked through to a potentially malicious URL
  - least privilege SOC
tags:
  - Microsoft Defender XDR
  - Microsoft Defender for Office 365
  - Unified RBAC
  - Least Privilege
  - NIS2
  - ISO 27001
  - GDPR
author: "Dimosthenis Atteia"
description: "Το δικαίωμα Email & collaboration content: Emails associated with alerts του unified RBAC καλύπτει πλέον και τα alerts για κλικ σε κακόβουλα URLs. Τι αλλάζει για το SOC, ποιους αφορά και πώς το εντάσσεις στους ρόλους σου."
seoDescription: "Το Emails associated with alerts του Defender RBAC καλύπτει πλέον και alerts για κλικ σε κακόβουλα URLs. Τι αλλάζει για το SOC και τι κάνεις."
summary: "Οι analysts με το περιορισμένο δικαίωμα πρόσβασης σε email μπορούν πλέον να δουν και το email πίσω από ένα alert για κλικ σε κακόβουλο URL, χωρίς να πάρουν πρόσβαση σε όλο το mailbox του οργανισμού."
categories: ["Security Operations & XDR"]
releases:
  - "generally-available"
ShowToc: true
TocOpen: false
cover:
  image: "https://learn.microsoft.com/defender-office-365/media/configure-unified-rbac-defender-office-365-security-operations-details-flyout.png"
  alt: "Το flyout της ομάδας δικαιωμάτων Security operations στο Microsoft Defender portal, με τα δικαιώματα Raw data για email και collaboration"
  caption: "Πηγή εικόνας: Microsoft Learn"
  relative: false
# Πλαίσιο «Last verified»: κάθε χαρακτηριστικό με τη φάση, την άδεια, την πηγή και την ημερομηνία ελέγχου
verification:
  - feature: "MC1536045: το Emails associated with alerts καλύπτει και τα alerts για κλικ σε κακόβουλα URLs"
    status: "Generally Available"
    license: "Δεν αναφέρεται"
    source: "https://mc.merill.net/message/MC1536045"
    verified: 2026-11-06
  - feature: "Unified RBAC: τα τέσσερα alerts που υποστηρίζει το Emails associated with alerts"
    status: "Generally Available"
    license: "Δεν αναφέρεται"
    source: "https://learn.microsoft.com/en-us/defender-xdr/custom-permissions-details"
    verified: 2026-11-06
# MITRE ATT&CK®: ονόματα στο data/mitre.yaml
mitre: ["T1566.002", "T1204.001", "M1018"]
---

Όταν ένας χρήστης κάνει κλικ σε κακόβουλο link, το πρώτο που θέλει να δει ο analyst είναι το email που το περιείχε. Για να το δει όμως χρειάζεται δικαίωμα πρόσβασης σε περιεχόμενο email. Το ευρύ δικαίωμα **Email & collaboration content (read)** δίνει πρόσβαση στο περιεχόμενο όλων των email, κάτι που δύσκολα δικαιολογείται για έναν analyst πρώτου επιπέδου.

Γι' αυτό υπάρχει το στενότερο δικαίωμα **Email & collaboration content: Emails associated with alerts**, που δίνει πρόσβαση μόνο σε email που συνδέονται με security alerts. Μέχρι τώρα όμως κάλυπτε μόνο τις αναφορές χρηστών. Τα alerts για κλικ σε URLs έμεναν απέξω.

## Τι αλλάζει

Σύμφωνα με την ανακοίνωση MC1536045, που δημοσιεύθηκε στις 3 Νοεμβρίου 2026:

- **Φάση:** Generally Available (Worldwide), διαθέσιμο ήδη. Η ανακοίνωση δεν δίνει άλλες ημερομηνίες.
- **Άδεια:** δεν αναφέρεται, ούτε στην ανακοίνωση ούτε στο Microsoft Learn.
- **Τι καλύπτει πλέον το δικαίωμα:**

| Alert | Κάλυψη |
|---|---|
| Email reported by user as malware or phish | Υπήρχε |
| Email reported by user as junk | Υπήρχε |
| A potentially malicious URL click was detected | Νέο |
| A user clicked through to a potentially malicious URL | Νέο |

Όποιος έχει το δικαίωμα μπορεί να κάνει preview και download τα email που συνδέονται με αυτά τα τέσσερα alerts. Η σελίδα του Microsoft Learn για τα δικαιώματα του unified RBAC έχει ήδη ενημερωθεί με τα ίδια τέσσερα alerts.

## Πώς δουλεύει και τι να προσέξεις

Το δικαίωμα ανήκει στην ομάδα **Security operations > Raw data (Email & collaboration)** και είναι επιπέδου Read. Στην ίδια ομάδα υπάρχουν τρία ακόμη δικαιώματα, και η διαφορά τους μετράει:

| Δικαίωμα | Τι δίνει |
|---|---|
| Email & collaboration metadata | Metadata σε advanced hunting, Threat Explorer, campaigns και email entity |
| Email & collaboration content | Preview και download περιεχομένου και συνημμένων για όλα τα email |
| Email & collaboration content: Emails associated with alerts | Preview και download μόνο για email που συνδέονται με τα τέσσερα alerts |
| Email & collaboration content: Quarantine Emails | Preview και download μηνυμάτων σε quarantine για όλους τους χρήστες |

Τρία σημεία που αξίζει να ξέρεις:

- **Η αλλαγή διευρύνει την πρόσβαση όσων έχουν ήδη το δικαίωμα.** Δεν χρειάζεται καμία ρύθμιση. Όποιος το έχει, βλέπει πλέον και τα email πίσω από τα alerts για κλικ.
- **Ισχύει μόνο για τα τέσσερα alerts.** Για άλλα alerts, για παράδειγμα από custom detections, ο analyst χρειάζεται το ευρύ δικαίωμα.
- **Ισχύει μόνο στο unified RBAC.** Αν δεν το έχεις ενεργοποιήσει για το Defender for Office 365, ελέγχουν ακόμη οι ρόλοι Email & collaboration. Σύμφωνα με την ανακοίνωση MC1537494, η Microsoft θα ενεργοποιήσει αυτόματα το Defender RBAC από τις αρχές Δεκεμβρίου 2026 για οργανισμούς με Defender for Office 365 Plan 2.

## Τι κάνεις τώρα

1. **Βρες ποιοι έχουν το δικαίωμα.** Στο Microsoft Defender portal, **Permissions > Microsoft Defender XDR > Roles** (https://security.microsoft.com/mtp_roles), άνοιξε κάθε custom role και δες αν περιλαμβάνει το **Email & collaboration content: Emails associated with alerts**.
2. **Αποφάσισε αν η διεύρυνση σε καλύπτει.** Για ένα SOC πρώτου επιπέδου που χειρίζεται alerts για κλικ, η αλλαγή είναι συνήθως αυτό που θέλεις. Αν όχι, αφαίρεσε το δικαίωμα από τον ρόλο.
3. **Αν κάποιοι analysts έχουν το ευρύ δικαίωμα μόνο για αυτά τα alerts,** αντικατέστησέ το με το στενότερο. Ανοίγεις τον ρόλο, πηγαίνεις στο **Security operations**, επιλέγεις **Select custom permissions** και στο **Raw data (Email & collaboration)** κρατάς μόνο το **Emails associated with alerts**.
4. **Ανάθεσε τον ρόλο σε Entra security group,** όχι σε μεμονωμένους χρήστες, ώστε η πρόσβαση να ελέγχεται από τη διαχείριση των groups.
5. **Ενημέρωσε το playbook** για alerts κλικ: ο analyst ανοίγει το alert, βλέπει το email και αποφασίζει για αποκατάσταση.
6. **Κατέγραψε την αλλαγή στο μητρώο δικαιωμάτων** με ημερομηνία και αιτιολογία.

Για τους ρόλους του Defender for Office 365 στο unified RBAC, δες και το άρθρο για τον [Security Operator](/posts/generally-available/mdo-security-operator-unified-rbac-mapping/).

> 📖 **Θέλεις όλη την εικόνα;** Πολιτικές, Safe Links, quarantine και διερεύνηση στο Defender for Office 365: **[Microsoft Defender for Office 365: Από τις preset policies στην προχωρημένη παραμετροποίηση](/posts/microsoft-defender-up-close-series/microsoft-defender-for-office-365-deep-dive/)**.

## Σύνδεση με ΚΥΑ 1689/2025, NIS2, ISO 27001 και GDPR

- **ΚΥΑ 1689/2025 [13.γ](/kya-1689-2025/#13-γ):** χορήγηση δικαιωμάτων με least privilege και need to know. Ο analyst βλέπει μόνο τα email που χρειάζεται για τη διερεύνηση. **[24.α](/kya-1689-2025/#24-α):** η πρόσβαση στο περιεχόμενο περιγράφεται στη διαδικασία διαχείρισης περιστατικών.
- **Οδηγία NIS2 [21.2.β](/nis2/#21-2-β) και [21.2.θ](/nis2/#21-2-θ):** χειρισμός περιστατικών και πολιτικές ελέγχου πρόσβασης.
- **ISO/IEC 27001 [A.5.15](/iso-27001/#A-5-15), [A.8.3](/iso-27001/#A-8-3) και [A.5.26](/iso-27001/#A-5-26):** access control, information access restriction και response to information security incidents.
- **GDPR [5.1.γ](/gdpr/#5-1-γ) και [32.1.β](/gdpr/#32-1-β):** ελαχιστοποίηση των δεδομένων και απόρρητο της επεξεργασίας. Το στενό δικαίωμα περιορίζει την πρόσβαση σε προσωπικά δεδομένα σε email σχετικά με περιστατικά.

Τεκμήρια για τον ελεγκτή: η λίστα των custom roles με τα δικαιώματα Raw data, οι αναθέσεις σε groups, η καταγεγραμμένη αιτιολογία για όσους έχουν το ευρύ δικαίωμα, και το playbook για alerts κλικ.

---

## Πηγές και επαλήθευση {#last-verified}

{{< verification >}}

Επιπλέον πηγές: [Permissions in Microsoft Defender unified role-based access control (RBAC)](https://learn.microsoft.com/en-us/defender-xdr/custom-permissions-details) · [Microsoft Defender unified role-based access control (RBAC)](https://learn.microsoft.com/en-us/defender-xdr/manage-rbac) · Message Center MC1536045 (3 Νοεμβρίου 2026) και MC1537494 (3 Νοεμβρίου 2026), όπως αρχειοθετούνται στο mc.merill.net. Οι ανακοινώσεις διαφέρουν ανά tenant, οπότε δες τις στο δικό σου Message Center.

Το θέμα πρωτοεμφανίστηκε στο [Microsoft 365 Security: τι άλλαξε (εβδομάδα 45/2026)](/posts/weekly-security-update/microsoft-365-security-ti-allaxe-2026-w45/).

Τελευταίος έλεγχος στοιχείων: 6 Νοεμβρίου 2026.
