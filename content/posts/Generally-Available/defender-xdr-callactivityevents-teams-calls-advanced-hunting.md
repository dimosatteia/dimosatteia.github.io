---
title: "Generally Available: Ο πίνακας CallActivityEvents φέρνει τις κλήσεις Teams στο advanced hunting"
seoTitle: "GA: CallActivityEvents για κλήσεις Teams στο Defender XDR"
slug: "defender-xdr-callactivityevents-teams-calls-advanced-hunting"
date: 2026-11-06T08:15:00+02:00
lastmod: 2026-11-06T08:15:00+02:00
draft: true
keywords:
  - CallActivityEvents table
  - advanced hunting Microsoft Teams calls
  - MC1532241
  - Microsoft Defender XDR
  - Defender for Office 365 Plan 2
  - Teams meetings threat hunting
  - vishing Teams
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
description: "Ο πίνακας CallActivityEvents του advanced hunting καταγράφει δραστηριότητες σε κλήσεις και συσκέψεις Teams: ποιος έκανε τι, από ποιον tenant και με ποιον τύπο λογαριασμού. Τι περιέχει, πότε έρχεται και πώς τον βάζεις στη διερεύνηση."
seoDescription: "CallActivityEvents στο advanced hunting: κλήσεις και συσκέψεις Teams για το SOC, με διάθεση έως τα μέσα Νοεμβρίου 2026. Πεδία, άδεια και βήματα."
summary: "Το SOC έβλεπε ως τώρα στο advanced hunting τα μηνύματα Teams αλλά όχι τις κλήσεις. Ο πίνακας CallActivityEvents κλείνει αυτό το κενό και συνδέεται με τα μηνύματα της ίδιας συνομιλίας."
categories: ["Security Operations & XDR"]
releases:
  - "generally-available"
ShowToc: true
TocOpen: false
cover:
  image: "https://learn.microsoft.com/defender-xdr/media/advanced-hunting-microsoft-defender/advanced-hunting-unified-view-schema.png"
  alt: "Το παράθυρο πληροφοριών schema ενός πίνακα στο advanced hunting του Microsoft Defender portal, με τις στήλες και την περιγραφή τους"
  caption: "Πηγή εικόνας: Microsoft Learn"
  relative: false
# Πλαίσιο «Last verified»: κάθε χαρακτηριστικό με τη φάση, την άδεια, την πηγή και την ημερομηνία ελέγχου
verification:
  - feature: "MC1532241: πίνακας CallActivityEvents, διάθεση από τις αρχές έως τα μέσα Νοεμβρίου 2026"
    status: "Generally Available"
    license: "Defender for Office 365 Plan 2 (σύμφωνα με την ανακοίνωση)"
    source: "https://mc.merill.net/message/MC1532241"
    verified: 2026-11-05
  - feature: "CallActivityEvents table: πεδία και πηγή δεδομένων (Defender for Office 365)"
    status: "Generally Available"
    license: "Defender for Office 365"
    source: "https://learn.microsoft.com/en-us/defender-xdr/advanced-hunting-callactivityevents-table"
    verified: 2026-11-05
# MITRE ATT&CK®: ονόματα στο data/mitre.yaml
mitre: ["T1566.004", "T1684.001", "M1047"]
---

Στο advanced hunting του Defender XDR, το SOC βλέπει τα μηνύματα Teams μέσα από τους πίνακες `MessageEvents`, `MessagePostDeliveryEvents` και `MessageUrlInfo`. Οι κλήσεις και οι συσκέψεις όμως έμεναν εκτός. Αν ένας εξωτερικός χρήστης έστελνε μήνυμα σε υπάλληλο και μετά τον καλούσε, ο analyst έβλεπε μόνο το πρώτο μισό της ιστορίας.

Ο πίνακας **`CallActivityEvents`** καλύπτει το δεύτερο μισό: τι έγινε μέσα σε κλήσεις και συσκέψεις Teams, ποιος το έκανε και από πού.

## Τι αλλάζει

Σύμφωνα με την ανακοίνωση MC1532241, που δημοσιεύθηκε στις 30 Οκτωβρίου 2026:

- **Φάση και ημερομηνίες:** Generally Available (Worldwide), με διάθεση από τις αρχές Νοεμβρίου 2026 που αναμένεται να ολοκληρωθεί **έως τα μέσα Νοεμβρίου 2026**.
- **Άδεια:** η ανακοίνωση αφορά οργανισμούς με **Defender for Office 365 Plan 2**. Το Microsoft Learn γράφει ότι ο πίνακας γεμίζει από εγγραφές του Defender for Office 365 και ότι χωρίς την υπηρεσία τα queries δεν επιστρέφουν αποτελέσματα.
- **Πρόσβαση εκτός portal:** τα ίδια δεδομένα θα είναι διαθέσιμα μέσω του event streaming API και του Microsoft Sentinel API.

Η σελίδα «What's new» του Defender for Office 365 είχε ήδη καταχωρίσει τον πίνακα τον Οκτώβριο, χωρίς ημερομηνία. Η ανακοίνωση δίνει τώρα το χρονοδιάγραμμα.

## Τι περιέχει ο πίνακας

Σύμφωνα με το Microsoft Learn, τα βασικά πεδία είναι:

| Ομάδα | Πεδία | Τι σου λένε |
|---|---|---|
| Κλήση | `CallId`, `CallType`, `CallSchedulingType`, `CallName`, `CallJoinUrl`, `ThreadId` | Αν είναι κλήση P2P ή group (meeting, conference), αν ήταν ad hoc ή προγραμματισμένη, και σε ποια συνομιλία ανήκει |
| Δραστηριότητα | `ActivityTimestamp`, `ActivityType`, `ActivityDetail`, `ActivityStatus`, `IsPerformedOnSelf` | Τι έγινε, αν πέτυχε, και αν έγινε στον ίδιο ή σε άλλον συμμετέχοντα |
| Αυτός που κάνει την ενέργεια | `ActivityInitiatorUpn`, `ActivityInitiatorAccountType`, `ActivityInitiatorMembershipType`, `ActivityInitiatorTenantDisplayName`, `ActivityInitiatorTenantRegion`, `ActivityInitiatorPlatformCategory` | Ποιος είναι, αν ο λογαριασμός είναι Entra, consumer, Azure Communication Services, PSTN ή Unauthenticated, από ποιον οργανισμό και περιοχή, από Desktop, Mobile ή Web |
| Διοργανωτής | `OriginatorUpn`, `OriginatorObjectId`, `OriginatorTenantId` | Ποιος ξεκίνησε την κλήση ή έστειλε την πρόσκληση και από ποιον tenant |
| Παραλήπτης | `ActivityRecipientUpn`, `ActivityRecipientAccountType`, `ActivityRecipientTenantDisplayName` | Σε ποιον έγινε η ενέργεια |

Το πεδίο `ThreadId` σε συνδέει με τον πίνακα `MessageEvents`, ώστε να δεις τα μηνύματα της ίδιας συνομιλίας. Για παράδειγμα, μπορείς να ξεκινήσεις από δραστηριότητες λογαριασμών που δεν είναι Entra και να φέρεις τα σχετικά μηνύματα:

```kusto
CallActivityEvents
| where ActivityTimestamp > ago(7d)
| where ActivityInitiatorAccountType != "Entra"
| summarize Activities = count(), Types = make_set(ActivityType) by ActivityInitiatorUpn, ActivityInitiatorAccountType, ActivityInitiatorTenantDisplayName, ThreadId
| join kind=leftouter (MessageEvents | where Timestamp > ago(7d) | summarize Messages = count() by ThreadId) on ThreadId
| order by Activities desc
| take 50
```

Το query είναι παράδειγμα. Οι ακριβείς τιμές του `ActivityInitiatorAccountType` και του `ActivityType` πρέπει να ελεγχθούν στα δεδομένα του tenant σου, γιατί το Learn δεν δίνει πλήρη λίστα για το `ActivityType`.

## Τι κάνεις τώρα

1. **Ενημέρωσε το SOC και τους threat hunters.** Στο Microsoft Defender portal, **Hunting > Advanced hunting**, άνοιξε το schema του `CallActivityEvents` από την καρτέλα **Schema** και δες τα πεδία με **See preview data**.
2. **Έλεγξε τα δικαιώματα.** Οι analysts χρειάζονται δικαιώματα advanced hunting. Με unified RBAC, η σελίδα του advanced hunting στο Microsoft Learn συνδέει τους πίνακες email και collaboration με το **Email & collaboration metadata (read)**. Ο νέος πίνακας δεν αναφέρεται ακόμη εκεί, οπότε δοκίμασε με έναν λογαριασμό analyst ότι τον βλέπει.
3. **Αν στέλνεις δεδομένα σε SIEM,** έλεγξε τη ρύθμιση του streaming API ή του Sentinel για τον νέο πίνακα, και υπολόγισε το επιπλέον volume.
4. **Πρόσθεσε τον πίνακα στη διαδικασία διερεύνησης** για phishing και κοινωνική μηχανική μέσω Teams: από μια αναφορά χρήστη ή ένα alert, στο `MessageEvents`, και μετά στο `CallActivityEvents` με το `ThreadId`.
5. **Συζήτησε με τον DPO** τον σκοπό και τη διάρκεια χρήσης. Στα πεδία του πίνακα δεν υπάρχει περιεχόμενο κλήσεων, υπάρχει όμως ποιος μίλησε με ποιον, πότε και από πού.

Για τα άλλα κανάλια του Teams, δες τα άρθρα για τον [πίνακα MessageContents](/posts/generally-available/defender-xdr-messagecontents-teams-advanced-hunting/) και για το [Report a call και Report a meeting](/posts/new-features/report-a-call-report-a-meeting-teams-security-reporting/).

> 📖 **Θέλεις όλη την εικόνα;** Προστασία email και Teams, quarantine και διερεύνηση στο Defender for Office 365: **[Microsoft Defender for Office 365: Από τις preset policies στην προχωρημένη παραμετροποίηση](/posts/microsoft-defender-up-close-series/microsoft-defender-for-office-365-deep-dive/)**.

## Σύνδεση με ΚΥΑ 1689/2025, NIS2, ISO 27001 και GDPR

- **ΚΥΑ 1689/2025 [24.γ](/kya-1689-2025/#24-γ) και [24.ε](/kya-1689-2025/#24-ε):** καταγραφή δραστηριοτήτων και τακτικός έλεγχος για ύποπτη δραστηριότητα, εδώ στις κλήσεις και συσκέψεις Teams. **[24.α](/kya-1689-2025/#24-α):** ο πίνακας μπαίνει στη διαδικασία διαχείρισης περιστατικών. **[13.γ](/kya-1689-2025/#13-γ):** η πρόσβαση δίνεται με need to know.
- **Οδηγία NIS2 [21.2.β](/nis2/#21-2-β):** χειρισμός περιστατικών.
- **ISO/IEC 27001 [A.8.15](/iso-27001/#A-8-15), [A.8.16](/iso-27001/#A-8-16) και [A.5.28](/iso-27001/#A-5-28):** logging, monitoring activities και collection of evidence.
- **GDPR [5.1.γ](/gdpr/#5-1-γ), [32.1.β](/gdpr/#32-1-β) και [35.1](/gdpr/#35-1):** ελαχιστοποίηση των δεδομένων, απόρρητο της επεξεργασίας, και εκτίμηση αντικτύπου όπου η παρακολούθηση επικοινωνιών το απαιτεί.

Τεκμήρια για τον ελεγκτή: η αναφορά στον πίνακα στη διαδικασία διερεύνησης, οι ρόλοι με πρόσβαση στο advanced hunting, η ρύθμιση διατήρησης αν τα δεδομένα πηγαίνουν σε SIEM, και η γνώμη του DPO.

---

## Πηγές και επαλήθευση {#last-verified}

{{< verification >}}

Επιπλέον πηγές: [CallActivityEvents table](https://learn.microsoft.com/en-us/defender-xdr/advanced-hunting-callactivityevents-table) · [Security Operations Guide for Teams protection in Microsoft Defender for Office 365](https://learn.microsoft.com/en-us/defender-office-365/mdo-support-teams-sec-ops-guide) · [Proactively hunt for threats with advanced hunting in Microsoft Defender](https://learn.microsoft.com/en-us/defender-xdr/advanced-hunting-overview) · [What's new in Microsoft Defender for Office 365](https://learn.microsoft.com/en-us/defender-office-365/defender-for-office-365-whats-new) · Message Center MC1532241 (30 Οκτωβρίου 2026), όπως αρχειοθετείται στο mc.merill.net. Οι ημερομηνίες και η άδεια προέρχονται από την ανακοίνωση. Το query είναι παράδειγμα που δεν δοκιμάστηκε σε tenant. Οι ανακοινώσεις διαφέρουν ανά tenant, οπότε δες την στο δικό σου Message Center.

Το θέμα πρωτοεμφανίστηκε στο [Microsoft 365 Security: τι άλλαξε (εβδομάδα 45/2026)](/posts/weekly-security-update/microsoft-365-security-ti-allaxe-2026-w45/).

Τελευταίος έλεγχος στοιχείων: 5 Νοεμβρίου 2026.
