---
title: "Generally Available: Ο πίνακας MessageContents φέρνει μηνύματα Teams στο advanced hunting του Defender XDR"
seoTitle: "GA: Πίνακας MessageContents για Teams στο Defender XDR"
slug: "defender-xdr-messagecontents-teams-advanced-hunting"
date: 2026-10-29T21:15:00+02:00
lastmod: 2026-10-29T21:15:00+02:00
draft: false
keywords:
  - MessageContents table
  - advanced hunting Microsoft Teams
  - MC1474106
  - Microsoft Defender XDR
  - Defender for Office 365 Teams protection
  - Preview role Email & collaboration content
  - Teams phishing investigation
tags:
  - Microsoft Defender XDR
  - Microsoft Defender for Office 365
  - Advanced Hunting
  - KQL
  - Microsoft Teams
  - NIS2
  - ISO 27001
  - GDPR
author: "Dimosthenis Atteia"
description: "Ο νέος πίνακας MessageContents του advanced hunting δίνει σε εξουσιοδοτημένους analysts αποσπάσματα μηνυμάτων Teams μαζί με metadata. Τι περιέχει, ποιοι ρόλοι χρειάζονται, τι δεν υποστηρίζει, και γιατί η πρόσβαση θέλει απόφαση μαζί με τον DPO."
seoDescription: "MessageContents στο advanced hunting: αποσπάσματα μηνυμάτων Teams για το SOC έως τα μέσα Νοεμβρίου 2026. Πεδία, δικαιώματα, περιορισμοί και GDPR."
summary: "Στις επιθέσεις μέσω Teams το SOC έβλεπε μέχρι τώρα κυρίως metadata. Ο πίνακας MessageContents δίνει και το περιεχόμενο, και γι' αυτό το πιο σημαντικό βήμα είναι να αποφασίσεις ποιος θα τον βλέπει."
categories: ["Security Operations & XDR"]
releases:
  - "generally-available"
ShowToc: true
TocOpen: false
cover:
  image: "https://learn.microsoft.com/en-us/defender-office-365/media/teams-message-entity-panel-shown-in-quarantine.png"
  alt: "Το Teams message entity panel στο Microsoft Defender portal για ένα μήνυμα Teams σε quarantine, με τα στοιχεία του μηνύματος, τον αποστολέα και τα URLs"
  caption: "Πηγή εικόνας: Microsoft Learn"
  relative: false
# Πλαίσιο «Last verified»: κάθε χαρακτηριστικό με τη φάση, την άδεια, την πηγή και την ημερομηνία ελέγχου
verification:
  - feature: "MC1474106: πίνακας MessageContents στο advanced hunting, με ολοκλήρωση της διάθεσης έως τα μέσα Νοεμβρίου 2026"
    status: "Generally Available"
    license: "Δεν αναφέρεται"
    source: "https://mc.merill.net/message/MC1474106"
    verified: 2026-10-29
  - feature: "MessageContents table: πεδία, δικαιώματα (advanced hunting και Preview role), χωρίς custom detections και streaming"
    status: "Generally Available"
    license: "Δεν αναφέρεται"
    source: "https://learn.microsoft.com/en-us/defender-xdr/advanced-hunting-messagecontents-table"
    verified: 2026-10-29
# MITRE ATT&CK®: ονόματα στο data/mitre.yaml
mitre: ["T1566.003", "T1534", "T1684.001", "M1047"]
---

Οι επιθέσεις μέσω Microsoft Teams έχουν γίνει συνηθισμένες: ένας εξωτερικός «help desk» γράφει σε υπάλληλο, ένας παραβιασμένος λογαριασμός συνεργάτη στέλνει link σε group chat. Ως τώρα, στο advanced hunting, οι πίνακες `MessageEvents`, `MessagePostDeliveryEvents` και `MessageUrlInfo` έδιναν στο SOC κυρίως metadata: ποιος έστειλε, σε ποιον, με ποιο URL, ποιο verdict. Για το τι έγραφε το μήνυμα, ο analyst έπρεπε να ανοίξει κάθε μήνυμα χωριστά.

Ο νέος πίνακας **`MessageContents`** κλείνει αυτό το κενό. Και γι' αυτόν ακριβώς τον λόγο θέλει προσοχή: δίνει πρόσβαση σε περιεχόμενο συνομιλιών.

## Τι αλλάζει

Σύμφωνα με την ανακοίνωση MC1474106, που δημοσιεύθηκε στις 18 Σεπτεμβρίου 2026 και ενημερώθηκε στις 26 Οκτωβρίου 2026:

- **Φάση και ημερομηνίες:** Generally Available (Worldwide), με διάθεση από τα τέλη Σεπτεμβρίου 2026 που αναμένεται να ολοκληρωθεί **έως τα μέσα Νοεμβρίου 2026**. Η αρχική ημερομηνία ολοκλήρωσης ήταν τα μέσα Οκτωβρίου.
- **Τι δίνει:** αποσπάσματα μηνυμάτων Teams και τα σχετικά metadata, για διερεύνηση απειλών και συσχέτιση με άλλα security signals.
- **Ποιος το βλέπει:** μόνο χρήστες με τα απαιτούμενα δικαιώματα advanced hunting και message preview. Όσοι δεν τα έχουν δεν βλέπουν καν τον πίνακα.
- **Άδεια:** δεν αναφέρεται, ούτε στην ανακοίνωση ούτε στο Microsoft Learn.

Η ανακοίνωση σημειώνει ότι η αλλαγή επηρεάζει τον τρόπο πρόσβασης σε υπάρχοντα δεδομένα πελατών, αφού εξουσιοδοτημένοι χρήστες βλέπουν πλέον αποσπάσματα μηνυμάτων Teams.

## Τι περιέχει ο πίνακας

Σύμφωνα με το Microsoft Learn, ο πίνακας περιέχει τα υποστηριζόμενα μηνύματα Teams που είναι διαθέσιμα μέσω της πηγής metadata των μηνυμάτων, μαζί με μηνύματα με URLs και federated μηνύματα:

| Πεδίο | Τύπος | Περιεχόμενο |
|---|---|---|
| `Timestamp` | datetime | Ώρα παράδοσης του μηνύματος |
| `TeamsMessageId` | string | Μοναδικό αναγνωριστικό του μηνύματος |
| `ThreadId` | string | Αναγνωριστικό του channel ή του chat thread |
| `ThreadName` | string | Όνομα του channel ή του chat thread |
| `MessageSnippet` | string | Απόσπασμα του μηνύματος |
| `ThreadType` | string | Τύπος thread |
| `SenderEmailAddress` | string | Email του αποστολέα |
| `SenderObjectId` | string | Object ID του αποστολέα |

Δύο περιορισμοί που πρέπει να ξέρει το SOC:

- **Δεν υποστηρίζει custom detection rules ούτε streaming.** Ο πίνακας είναι για διερεύνηση, όχι για συνεχή ανίχνευση ή εξαγωγή σε SIEM μέσω streaming API.
- **Είναι απόσπασμα, όχι ολόκληρο το μήνυμα.** Το Learn μιλά για «snippet» χωρίς να ορίζει μήκος.

Μπορείς να τον συνδέσεις με τους άλλους πίνακες μέσω του `TeamsMessageId`. Για παράδειγμα, ξεκινάς από μηνύματα με threat verdict στο `MessageEvents` και φέρνεις το απόσπασμα:

```kusto
MessageEvents
| where Timestamp > ago(7d)
| where isnotempty(ThreatTypes)
| join kind=inner (MessageContents | project TeamsMessageId, ThreadName, MessageSnippet) on TeamsMessageId
| project Timestamp, SenderEmailAddress, ThreadName, ThreatTypes, MessageSnippet
| take 50
```

## Τι κάνεις τώρα

1. **Αποφάσισε ποιοι θα έχουν πρόσβαση, μαζί με τον DPO.** Ο πίνακας δίνει περιεχόμενο εσωτερικών και εξωτερικών συνομιλιών. Κατέγραψε τον σκοπό (διερεύνηση περιστατικών), ποιοι ρόλοι τον χρειάζονται και για πόσο. Σκέψου αν η χρήση πρέπει να μπει στην εκτίμηση αντικτύπου που ήδη έχεις για την παρακολούθηση του email.
2. **Δώσε το δικαίωμα μόνο σε αυτούς.** Αν το Unified RBAC είναι ενεργό για το Defender for Office 365: στο Microsoft Defender portal, **Permissions and roles** (https://security.microsoft.com/mtp_roles), σε custom role με **Security operations/Raw data (email & collaboration)/Email & collaboration content (read)**, ανατεθειμένο σε Entra security group. Αν όχι, δες τις επιλογές για τον ρόλο Preview στη σελίδα του email entity page στο Microsoft Learn.
3. **Έλεγξε ποιοι έχουν ήδη αυτό το δικαίωμα.** Το ίδιο δικαίωμα δίνει και preview περιεχομένου email. Όσοι το έχουν θα βλέπουν αυτόματα και τον νέο πίνακα.
4. **Πρόσθεσε τον πίνακα στη διαδικασία διερεύνησης** για phishing μέσω Teams: από ένα alert ή μια αναφορά χρήστη, στο `MessageEvents` και `MessageUrlInfo`, και μετά στο `MessageContents` για το απόσπασμα.
5. **Μην βασίσεις ανίχνευση σε αυτόν.** Για custom detections συνέχισε να χρησιμοποιείς τους πίνακες metadata.
6. **Αν δεν θέλεις να τον χρησιμοποιήσει κανείς**, δεν χρειάζεται ενέργεια. Βεβαιώσου μόνο ότι κανείς δεν έχει το δικαίωμα χωρίς λόγο.

Για τη γενική εικόνα του Teams στην ασφάλεια, δες και το άρθρο για το [Security Detection Report στο Teams Admin Center](/posts/teams-security-detection-report/).

> 📖 **Θέλεις όλη την εικόνα;** Προστασία email και Teams, quarantine και διερεύνηση στο Defender for Office 365: **[Microsoft Defender for Office 365: Από τις preset policies στην προχωρημένη παραμετροποίηση](/posts/microsoft-defender-up-close-series/microsoft-defender-for-office-365-deep-dive/)**.

## Σύνδεση με ΚΥΑ 1689/2025, NIS2, ISO 27001 και GDPR

- **ΚΥΑ 1689/2025 [24.γ](/kya-1689-2025/#24-γ) και [24.ε](/kya-1689-2025/#24-ε):** καταγραφή δραστηριοτήτων και τακτικός έλεγχος για ύποπτη δραστηριότητα, εδώ στο κανάλι του Teams. **[13.γ](/kya-1689-2025/#13-γ):** η πρόσβαση στο περιεχόμενο δίνεται με need to know. **[24.α](/kya-1689-2025/#24-α):** η χρήση του πίνακα περιγράφεται στη διαδικασία διαχείρισης περιστατικών.
- **Οδηγία NIS2 [21.2.β](/nis2/#21-2-β) και [21.2.θ](/nis2/#21-2-θ):** χειρισμός περιστατικών και πολιτικές ελέγχου πρόσβασης.
- **ISO/IEC 27001 [A.8.15](/iso-27001/#A-8-15), [A.8.16](/iso-27001/#A-8-16), [A.8.3](/iso-27001/#A-8-3) και [A.5.28](/iso-27001/#A-5-28):** logging, monitoring activities, information access restriction και collection of evidence.
- **GDPR [5.1.γ](/gdpr/#5-1-γ), [32.1.β](/gdpr/#32-1-β) και [35.1](/gdpr/#35-1):** ελαχιστοποίηση των δεδομένων, απόρρητο της επεξεργασίας, και εκτίμηση αντικτύπου όπου η παρακολούθηση επικοινωνιών το απαιτεί.

Τεκμήρια για τον ελεγκτή: η καταγεγραμμένη απόφαση για τον σκοπό και τους χρήστες με πρόσβαση, ο custom role και η ανάθεσή του σε group, η αναφορά στον πίνακα στη διαδικασία διερεύνησης, και η γνώμη του DPO.

---

## Πηγές και επαλήθευση {#last-verified}

{{< verification >}}

Επιπλέον πηγές: [MessageContents table in Microsoft Defender XDR](https://learn.microsoft.com/en-us/defender-xdr/advanced-hunting-messagecontents-table) · [Understand the advanced hunting schema](https://learn.microsoft.com/en-us/defender-xdr/advanced-hunting-schema-tables) · [Investigate Teams messages in Microsoft Defender for Office 365](https://learn.microsoft.com/en-us/defender-office-365/teams-message-entity-panel) · Message Center MC1474106 (18 Σεπτεμβρίου 2026, ενημερώθηκε στις 26 Οκτωβρίου 2026), όπως αρχειοθετείται στο mc.merill.net. Οι ημερομηνίες προέρχονται από την ανακοίνωση. Το query είναι παράδειγμα που δεν δοκιμάστηκε σε tenant. Οι ανακοινώσεις διαφέρουν ανά tenant, οπότε δες την στο δικό σου Message Center.

Το θέμα πρωτοεμφανίστηκε στο [Microsoft 365 Security: τι άλλαξε (εβδομάδα 44/2026)](/posts/weekly-security-update/microsoft-365-security-ti-allaxe-2026-w44/).

Τελευταίος έλεγχος στοιχείων: 29 Οκτωβρίου 2026.
