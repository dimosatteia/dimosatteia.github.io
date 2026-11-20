---
title: "Preview: Ο Defender κόβει το device code phishing στο Copilot CLI"
seoTitle: "Preview: Defender κατά device code phishing στο Copilot CLI"
slug: "defender-github-copilot-cli-device-code-phishing"
date: 2026-11-20T08:10:00+02:00
lastmod: 2026-11-20T08:10:00+02:00
draft: false
keywords:
  - Microsoft Defender XDR
  - GitHub Copilot CLI
  - device code phishing
  - GitHub Enterprise Managed Users
  - Defender for Cloud Apps GitHub connector
  - automatic attack disruption
  - trusted-identity attacks AI agents
  - Safe Links Track user clicks
tags:
  - Microsoft Defender XDR
  - Microsoft Defender for Cloud Apps
  - Microsoft Defender for Office 365
  - GitHub
  - AI Security
  - Phishing
  - NIS2
  - ISO 27001
author: "Dimosthenis Atteia"
description: "Ο Microsoft Defender ανιχνεύει σε Public Preview το device code phishing κατά του GitHub Copilot CLI μέσω email και Teams, και απενεργοποιεί αυτόματα τον λογαριασμό GitHub EMU. Τι χρειάζεται, ποια είναι τα όρια και πώς το στήνεις."
seoDescription: "Ανίχνευση και αυτόματη διακοπή του device code phishing στο GitHub Copilot CLI με τον Defender, σε Preview. Προϋποθέσεις, όρια και βήματα."
summary: "Ο developer εγκρίνει έναν κωδικό σε γνήσια σελίδα του GitHub και ο επιτιθέμενος παίρνει token με τα δικαιώματά του. Ο Defender τώρα το βλέπει και κλείνει τον λογαριασμό, αλλά μόνο αν έχεις GitHub EMU, Microsoft 365 E5 και τον σωστό connector."
categories: ["AI Security"]
releases:
  - "preview"
ShowToc: true
TocOpen: false
cover:
  image: "https://learn.microsoft.com/en-us/defender-xdr/security-for-ai/media/protect-ai-agents-from-trusted-identity-attacks/security-operations-center-investigation-github-copilot-cli-device-code-phishing.png"
  alt: "Η έρευνα ενός alert για device code phishing στο GitHub Copilot CLI στο Microsoft Defender portal, με το incident graph"
  caption: "Πηγή εικόνας: Microsoft Learn"
  relative: false
# Πλαίσιο «Last verified»: κάθε χαρακτηριστικό με τη φάση, την άδεια, την πηγή και την ημερομηνία ελέγχου
verification:
  - feature: "Defender XDR: alerts και αυτόματη απενεργοποίηση λογαριασμού GitHub EMU για device code phishing στο GitHub Copilot CLI"
    status: "Public Preview"
    license: "Microsoft 365 E5, Defender for Office 365, connector Microsoft 365 στο Defender for Cloud Apps"
    source: "https://learn.microsoft.com/en-us/defender-xdr/security-for-ai/protect-ai-agents-from-trusted-identity-attacks"
    verified: 2026-11-19
  - feature: "Defender for Cloud Apps: GitHub connector σε επίπεδο Enterprise"
    status: "Public Preview"
    license: "GitHub Enterprise Cloud"
    source: "https://learn.microsoft.com/en-us/defender-cloud-apps/protect-github"
    verified: 2026-11-19
# MITRE ATT&CK®: ονόματα στο data/mitre.yaml
mitre: ["T1566.002", "T1528", "M1017", "M1018"]
---

Το device code phishing δεν χρειάζεται ψεύτικη σελίδα. Ο επιτιθέμενος ξεκινά ένα νόμιμο sign-in, στέλνει στον χρήστη έναν σύντομο κωδικό και το link του GitHub, και του ζητά να τον εγκρίνει. Η σελίδα είναι γνήσια. Ο χρήστης βάζει τον κωδικό, και το token πηγαίνει στον επιτιθέμενο. Το MFA δεν βοηθά, γιατί ο χρήστης κάνει την αυθεντικοποίηση μόνος του.

Τώρα ο στόχος είναι το **GitHub Copilot CLI**. Ένα token εκεί δίνει πρόσβαση σε repositories και σε ό,τι μπορεί να κάνει ο agent με την ταυτότητα του developer. Η Microsoft φέρνει σε **Public Preview** ανίχνευση και αυτόματη διακοπή αυτού του σεναρίου στον Defender.

## Τι αλλάζει

Σύμφωνα με το Microsoft Learn, η επίθεση έχει πέντε βήματα:

1. Ο επιτιθέμενος ξεκινά ένα device-code sign-in του Copilot CLI.
2. Στέλνει τον κωδικό και το link επαλήθευσης του GitHub στον χρήστη, π.χ. ως αίτημα του IT ή έλεγχο άδειας Copilot.
3. Ο χρήστης ανοίγει τη σελίδα του GitHub και εγκρίνει.
4. Ο client του επιτιθέμενου ολοκληρώνει το sign-in αυτόματα.
5. Ο επιτιθέμενος δρα με τα δικαιώματα της εφαρμογής και του λογαριασμού.

Το Microsoft Learn αναφέρει ως πιθανό αντίκτυπο memory poisoning, κατάχρηση συνεδριών που συγχρονίζονται στο cloud, μη εξουσιοδοτημένη πρόσβαση σε repositories και κακόβουλες ενέργειες μέσα από τον agent.

Ο Defender βγάζει δύο alerts με σοβαρότητα **High**:

| Alert | MITRE ATT&CK |
|---|---|
| **Suspected GitHub Copilot CLI device code phishing via email** | T1566.002, T1528 |
| **Suspected GitHub Copilot CLI device code phishing via Microsoft Teams** | T1566.002, T1528 |

Όταν βγει το alert, ο Defender XDR **απενεργοποιεί αυτόματα τον λογαριασμό GitHub Enterprise Managed User (EMU)** που επηρεάστηκε, μέσα από τον identity provider του οργανισμού.

Η λειτουργία εμφανίζεται στη σελίδα «What's new» του Defender XDR για τον Νοέμβριο 2026 και ανακοινώθηκε στο Microsoft Ignite στις 17 Νοεμβρίου 2026. Το Microsoft Learn δεν δίνει ημερομηνία GA.

## Οι προϋποθέσεις, και γιατί πολλοί θα μείνουν εκτός

Αυτό είναι το σημείο που θέλει προσοχή. Σύμφωνα με το Microsoft Learn χρειάζονται **όλα** τα παρακάτω:

- **Άδεια Microsoft 365 E5**, onboarding στο **Defender for Office 365**, και τον connector **Microsoft 365** συνδεδεμένο στο Defender for Cloud Apps.
- **Safe Links** ενεργό για email και Microsoft Teams, με **Track user clicks** ενεργό.
- Τον **GitHub connector** του Defender for Cloud Apps συνδεδεμένο σε **επίπεδο Enterprise**. Αυτή η επιλογή είναι επίσης σε preview αυτόν τον μήνα, και η σελίδα του connector ζητά άδεια **GitHub Enterprise Cloud**.
- **GitHub Enterprise Managed Users (EMU).** Η ανίχνευση λειτουργεί μόνο για EMU, γιατί μόνο εκεί υπάρχει η τηλεμετρία που χρειάζεται.
- Για την **αυτόματη διακοπή**, το EMU πρέπει να είναι federated με το **Microsoft Entra ID**.

Αν οι developers σου έχουν προσωπικούς λογαριασμούς GitHub ή GitHub Enterprise Cloud χωρίς EMU, δεν παίρνεις αυτή την προστασία. Και η Microsoft 365 E3 δεν φτάνει.

### Τι προσέχεις στον connector

Αν συνδέσεις το GitHub σε επίπεδο **Enterprise**, οι connectors σε επίπεδο **Organization** για τα organizations της ίδιας enterprise **απενεργοποιούνται αυτόματα**, για να μην έρχονται διπλά events. Ο λογαριασμός που κάνει τη σύνδεση χρειάζεται **Enterprise owner**, και τα OAuth scopes για το επίπεδο Enterprise είναι μόνο ανάγνωσης: read:user, user:email, read:enterprise και read:audit_log. Μετά τη σύνδεση παίρνεις events για τις 7 ημέρες πριν από αυτήν.

## Τι κάνεις τώρα

1. **Μάθε τι GitHub έχεις.** Ρώτα την ομάδα ανάπτυξης αν χρησιμοποιεί GitHub Enterprise Cloud με EMU, και αν το EMU είναι federated με το Entra ID. Αν όχι, η λειτουργία δεν σε αφορά ακόμα, αλλά το βήμα 5 σε αφορά.
2. **Έλεγξε το Safe Links.** Άνοιξε τη σελίδα **Safe Links** στο Defender portal (https://security.microsoft.com/safelinksv2). Σε κάθε custom πολιτική που καλύπτει developers, έλεγξε ότι στην ενότητα **Teams** είναι επιλεγμένο το **On: Safe Links checks a list of known, malicious links when users click links in Microsoft Teams** και ότι στα **Click protection settings** είναι ενεργό το **Track user clicks**. Η αλλαγή για το Teams μπορεί να χρειαστεί έως 24 ώρες.
3. **Έλεγξε τον connector Microsoft 365.** **Settings → Cloud Apps → Connected apps → App Connectors**, με κατάσταση **Connected**.
4. **Σύνδεσε το GitHub σε επίπεδο Enterprise.** Στο GitHub, φτιάξε OAuth App και κράτα το enterprise slug. Στο Defender portal, **Settings → Cloud Apps → Connected apps → App Connectors → Connect an app → GitHub**, διάλεξε **Enterprise** και δώσε Client ID, Client Secret και Enterprise slug. Αν έχεις ήδη connectors σε επίπεδο Organization, φτιάξε νέο instance και κατέγραψε ότι οι παλιοί θα απενεργοποιηθούν.
5. **Ενημέρωσε τους developers.** Κανένα νόμιμο αίτημα του IT δεν τους ζητά να εγκρίνουν device code που δεν ξεκίνησαν οι ίδιοι. Βάλε το στην επόμενη εκπαίδευση phishing.
6. **Πρόσθεσε το σενάριο στη διαδικασία απόκρισης.** Όταν βγει το alert, έλεγξε ότι η αυτόματη απενεργοποίηση έγινε. Αν δεν έγινε, απενεργοποίησε χειροκίνητα τον λογαριασμό GitHub EMU. Μετά δες τη δραστηριότητα OAuth του λογαριασμού στο χρονικό παράθυρο του alert και αν το ίδιο δόλωμα στάλθηκε και σε άλλους χρήστες.

> 📖 **Θέλεις όλη την εικόνα;** Πώς δουλεύει το Defender for Cloud Apps και οι app connectors: **[Microsoft Defender for Cloud Apps: πρακτική περιήγηση](/posts/microsoft-defender-up-close-series/microsoft-defender-for-cloud-apps-deep-dive/)**.

## Σύνδεση με ΚΥΑ 1689/2025, NIS2, ISO 27001 και GDPR

- **ΚΥΑ 1689/2025 [13.στ](/kya-1689-2025/#13-στ):** ισχυρή αυθεντικοποίηση. Το device code phishing περνά από την αυθεντικοποίηση με τη συναίνεση του χρήστη, οπότε η ανίχνευση είναι ο αντισταθμιστικός έλεγχος. **[24.ε](/kya-1689-2025/#24-ε):** αυτοματοποιημένος έλεγχος με συνθήκες ειδοποίησης. **[15.γ](/kya-1689-2025/#15-γ):** προστασία των περιβαλλόντων ανάπτυξης, γιατί ο στόχος είναι τα repositories.
- **Οδηγία NIS2 [21.2.β](/nis2/#21-2-β):** χειρισμός περιστατικών. **[21.2.ζ](/nis2/#21-2-ζ):** βασικές πρακτικές κυβερνοϋγιεινής και εκπαίδευση.
- **ISO/IEC 27001 [A.8.16](/iso-27001/#A-8-16):** monitoring activities. **[A.8.4](/iso-27001/#A-8-4):** πρόσβαση στον πηγαίο κώδικα. **[A.6.3](/iso-27001/#A-6-3):** ευαισθητοποίηση και εκπαίδευση.
- **GDPR [32.1.β](/gdpr/#32-1-β):** εμπιστευτικότητα και ακεραιότητα των συστημάτων, όταν τα repositories περιέχουν προσωπικά δεδομένα ή κλειδιά πρόσβασης σε αυτά.

Τεκμήρια για τον ελεγκτή: η απόφαση για το αν το GitHub σου είναι EMU και federated, στιγμιότυπο του GitHub connector σε επίπεδο Enterprise με κατάσταση Connected, η πολιτική Safe Links με Track user clicks για τους developers, η εγγραφή της εκπαίδευσης, και η διαδικασία απόκρισης με το βήμα επαλήθευσης της αυτόματης απενεργοποίησης.

---

## Πηγές και επαλήθευση {#last-verified}

{{< verification >}}

Επιπλέον πηγές: [What's new in Microsoft Defender XDR: November 2026](https://learn.microsoft.com/en-us/defender-xdr/whats-new) · [What's new in Microsoft Defender for Cloud Apps: November 2026](https://learn.microsoft.com/en-us/defender-cloud-apps/release-notes) · [Set up Safe Links policies in Microsoft Defender for Office 365](https://learn.microsoft.com/en-us/defender-office-365/safe-links-policies-configure) · [Ignite 2026: What's new in Microsoft Defender & Sentinel](https://techcommunity.microsoft.com/blog/microsoftthreatprotectionblog/ignite-2026-whats-new-in-microsoft-defender--sentinel/4569975) (17 Νοεμβρίου 2026). Δεν βρέθηκε ανακοίνωση Message Center για αυτή τη λειτουργία. Το θέμα πρωτοεμφανίστηκε στο [Microsoft 365 Security: τι άλλαξε (εβδομάδα 47/2026)](/posts/weekly-security-update/microsoft-365-security-ti-allaxe-2026-w47/).

Τελευταίος έλεγχος στοιχείων: 19 Νοεμβρίου 2026.
