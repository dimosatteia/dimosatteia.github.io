---
title: "Microsoft 365 Security: τι άλλαξε (εβδομάδα 45/2026)"
slug: "microsoft-365-security-ti-allaxe-2026-w45"
date: 2026-11-06T08:00:00+02:00
lastmod: 2026-11-06T08:00:00+02:00
draft: true
keywords:
  - Microsoft Defender νέα
  - Defender RBAC αυτόματη ενεργοποίηση
  - MC1537494
  - CallActivityEvents advanced hunting
  - Emails associated with alerts
  - Defender for Cloud posture policies exemptions
tags:
  - Microsoft Defender XDR
  - Microsoft Defender for Office 365
  - Microsoft Defender for Cloud
  - Unified RBAC
  - Advanced Hunting
  - Εβδομαδιαία σύνοψη
author: "Dimosthenis Atteia"
description: "Εβδομάδα 45/2026: αυτόματη ενεργοποίηση του Defender RBAC, πίνακας CallActivityEvents για κλήσεις Teams, posture policies και exemptions στο Defender for Cloud."
summary: "Από τον Δεκέμβριο η Microsoft περνά αυτόματα τα tenants με Defender for Office 365 Plan 2 στο Defender RBAC. Έχεις έως τις 2 Δεκεμβρίου να ελέγξεις τους ρόλους που εισάγονται."
categories: ["Security Operations & XDR"]
series: ["Microsoft 365 Security Weekly"]
ShowToc: true
TocOpen: false
weight: -6
# Πλαίσιο «Last verified»: η ημερομηνία είναι ο έλεγχος του τεύχους (στιγμιότυπο της εβδομάδας)
verification:
  - feature: "Defender XDR: αυτόματη ενεργοποίηση του Defender RBAC για Defender και Sentinel"
    status: "Not stated"
    license: "Defender for Office 365 Plan 2, ξεχωριστά ή μέσω Microsoft 365 E5 (σύμφωνα με την ανακοίνωση)"
    source: "https://learn.microsoft.com/en-us/defender-xdr/manage-rbac"
    verified: 2026-11-05
  - feature: "Defender XDR: το δικαίωμα Emails associated with alerts καλύπτει και alerts για κλικ σε URLs"
    status: "Generally Available"
    license: "Δεν αναφέρεται"
    source: "https://learn.microsoft.com/en-us/defender-xdr/custom-permissions-details"
    verified: 2026-11-05
  - feature: "Defender XDR: πίνακας CallActivityEvents για κλήσεις και συσκέψεις Teams στο advanced hunting"
    status: "Generally Available"
    license: "Defender for Office 365 Plan 2 (σύμφωνα με την ανακοίνωση)"
    source: "https://learn.microsoft.com/en-us/defender-xdr/advanced-hunting-callactivityevents-table"
    verified: 2026-11-05
  - feature: "Defender for Cloud: posture policies και exemptions στο Defender portal για Azure"
    status: "Public Preview"
    license: "Ενεργό επιλέξιμο Defender plan. Defender CSPM για posture recommendations σε περιβάλλοντα Managed in Defender"
    source: "https://learn.microsoft.com/en-us/security-exposure-management/manage-posture-policies-defender"
    verified: 2026-11-05
---

## Με μια ματιά

Η αλλαγή που θέλει ενέργεια αυτή την εβδομάδα είναι το **Defender RBAC**: σύμφωνα με την ανακοίνωση MC1537494, η Microsoft θα το ενεργοποιήσει αυτόματα από τις αρχές Δεκεμβρίου ως το μοναδικό μοντέλο πρόσβασης για το Microsoft Defender portal και το Microsoft Sentinel, και ζητά να ελέγξεις τους ρόλους που εισάγονται έως τις **2 Δεκεμβρίου 2026**. Στην ίδια εβδομάδα ξεκινά η διάθεση του πίνακα **CallActivityEvents** για κλήσεις και συσκέψεις Teams, ενώ στο Defender for Cloud έρχονται σε preview τα posture policies και τα exemptions στο Defender portal.

## Οι αλλαγές της εβδομάδας

### 1. Defender XDR: αυτόματη ενεργοποίηση του Defender RBAC για Defender και Sentinel

**Φάση:** η ανακοίνωση δεν αναφέρει φάση. Είναι αλλαγή προεπιλογής, με προθεσμία ενέργειας τις 2 Δεκεμβρίου 2026 και διάθεση από τις αρχές Δεκεμβρίου 2026 έως τα τέλη Ιανουαρίου 2027, σύμφωνα με την ανακοίνωση · **Άδεια:** σύμφωνα με την ανακοίνωση, αφορά οργανισμούς με Defender for Office 365 Plan 2, είτε ξεχωριστά είτε μέσω συνδρομής όπως το Microsoft 365 E5

**Τι αλλάζει.** Σύμφωνα με την ανακοίνωση, το Defender RBAC (το unified μοντέλο δικαιωμάτων του Defender) γίνεται το μοναδικό μοντέλο πρόσβασης για το Microsoft Defender portal και τις εμπειρίες του Microsoft Sentinel. Βλέπεις πρώτα ειδοποίηση μέσα στο portal και η ενεργοποίηση γίνεται περίπου 30 ημέρες μετά. Στο διάστημα αυτό οι υπάρχοντες ρόλοι εισάγονται στο νέο μοντέλο χωρίς επίπτωση στη λειτουργία, μαζί με αναθέσεις σε B2B και GDAP χρήστες ή ομάδες. Οι ρόλοι Reader, Responder και Contributor των Sentinel workspaces ενεργοποιούνται αυτόματα στο Defender RBAC. Μετά την ενεργοποίηση, το portal ελέγχει την πρόσβαση με τους νέους ρόλους και οι παλιές αναθέσεις δεν χρειάζονται πια.

Δεν αλλάζουν τα Microsoft Purview, Exchange Online, οι directory roles του Entra, το PIM και τα δικαιώματα Azure εκτός Sentinel. Το PowerShell του Defender for Office 365 συνεχίζει να δουλεύει. Αν χρειαστεί, μετά την ενεργοποίηση μπορείς να γυρίσεις πίσω από τα **workload settings** του Defender RBAC.

**Τι να κάνεις.** Μπες στο Microsoft Defender portal, **Permissions and roles** (https://security.microsoft.com/mtp_roles), και έλεγξε τους ρόλους που εισήχθησαν: ποιος έχει ποιον ρόλο και σε ποιο scope. Κοίτα ιδιαίτερα τις αναθέσεις σε B2B και GDAP, δηλαδή σε συνεργάτες και MSSP. Αν έχεις Sentinel, σημείωσε ότι, σύμφωνα με το Microsoft Learn, το unified RBAC δεν υποστηρίζει ανάθεση δικαιωμάτων σε service principal. Αν η αυτοματοποίησή σου βασίζεται σε αυτό, έλεγξέ το πριν από την ενεργοποίηση. Όσα scripts ρυθμίζουν ρόλους μέσω API πρέπει να περάσουν στο νέο API. Ενημέρωσε τα runbooks και πέρασε την αλλαγή από τη διαδικασία διαχείρισης αλλαγών. Για το πώς έχει ήδη αλλάξει ο Security Operator στο Defender for Office 365, δες το [άρθρο της εβδομάδας 44](/posts/generally-available/mdo-security-operator-unified-rbac-mapping/).

**Πηγή:** [Microsoft Defender unified role-based access control (RBAC)](https://learn.microsoft.com/en-us/defender-xdr/manage-rbac) · Message Center [MC1537494](https://mc.merill.net/message/MC1537494) (αρχείο mc.merill.net, δημοσιεύθηκε στις 3 Νοεμβρίου 2026)

### 2. Defender XDR: το δικαίωμα «Emails associated with alerts» καλύπτει και alerts για κλικ σε κακόβουλα URLs

**Φάση:** GA, διαθέσιμο ήδη σύμφωνα με την ανακοίνωση · **Άδεια:** δεν αναφέρεται στην πηγή

**Τι αλλάζει.** Το δικαίωμα **Email & collaboration content: Emails associated with alerts** του unified RBAC δίνει πρόσβαση στο περιεχόμενο μόνο των email που συνδέονται με alerts, όχι σε όλα τα email. Ως τώρα κάλυπτε δύο alerts: email που ο χρήστης ανέφερε ως malware ή phish και email που ανέφερε ως junk. Τώρα καλύπτει και τα **A potentially malicious URL click was detected** και **A user clicked through to a potentially malicious URL**. Όποιος έχει το δικαίωμα μπορεί να κάνει preview και download τα email αυτών των τεσσάρων alerts. Το Microsoft Learn έχει ήδη ενημερωθεί.

**Τι να κάνεις.** Αν το SOC σου χρησιμοποιεί αυτό το δικαίωμα αντί για το ευρύτερο **Email & collaboration content (read)**, οι analysts βλέπουν πλέον και τα email πίσω από alerts για κλικ. Αυτό είναι καλό για τη διερεύνηση. Έλεγξε ποιοι έχουν το δικαίωμα, ενημέρωσε το playbook για alerts κλικ και κατέγραψε την αλλαγή στο μητρώο πρόσβασης.

**Αναλυτικά:** [Generally Available: Το «Emails associated with alerts» καλύπτει και τα alerts για κλικ σε URLs](/posts/generally-available/defender-rbac-emails-associated-with-alerts-url-clicks/)

**Πηγή:** [Permissions in Microsoft Defender unified role-based access control (RBAC)](https://learn.microsoft.com/en-us/defender-xdr/custom-permissions-details) · Message Center [MC1536045](https://mc.merill.net/message/MC1536045) (αρχείο mc.merill.net, δημοσιεύθηκε στις 3 Νοεμβρίου 2026)

### 3. Defender XDR: ο πίνακας CallActivityEvents φέρνει τις κλήσεις και τις συσκέψεις Teams στο advanced hunting

**Φάση:** GA, με διάθεση από τις αρχές έως τα μέσα Νοεμβρίου 2026, σύμφωνα με την ανακοίνωση · **Άδεια:** σύμφωνα με την ανακοίνωση, αφορά οργανισμούς με Defender for Office 365 Plan 2. Το Microsoft Learn γράφει ότι ο πίνακας γεμίζει από το Defender for Office 365.

**Τι αλλάζει.** Ο πίνακας `CallActivityEvents` καταγράφει δραστηριότητες μέσα σε κλήσεις και συσκέψεις Teams: αν πέτυχαν ή απέτυχαν, ποιος τις έκανε και αν τις έκανε στον εαυτό του ή σε άλλο συμμετέχοντα. Για αυτόν που κάνει την ενέργεια δίνει ταυτότητα, τύπο λογαριασμού (για παράδειγμα Entra, consumer ή PSTN), οργανισμό, περιοχή του tenant και πλατφόρμα Teams. Δίνει επίσης τον διοργανωτή και τον tenant του. Συνδέεται με το `MessageEvents` μέσω του `ThreadId`. Σύμφωνα με την ανακοίνωση, τα ίδια δεδομένα θα είναι διαθέσιμα και μέσω του event streaming API και του Microsoft Sentinel API.

**Τι να κάνεις.** Δώσε τον πίνακα στο SOC και στους threat hunters, με την ίδια λογική που ισχύει για τα μηνύματα Teams: μια απόπειρα κοινωνικής μηχανικής μπορεί να γίνει και με κλήση, όχι μόνο με μήνυμα. Έλεγξε ότι οι analysts έχουν δικαιώματα advanced hunting. Αν στέλνεις δεδομένα στο Sentinel ή σε άλλο SIEM μέσω streaming API, έλεγξε τη ρύθμιση ingestion και το κόστος.

**Αναλυτικά:** [Generally Available: Ο πίνακας CallActivityEvents φέρνει τις κλήσεις Teams στο advanced hunting](/posts/generally-available/defender-xdr-callactivityevents-teams-calls-advanced-hunting/)

**Πηγή:** [CallActivityEvents table](https://learn.microsoft.com/en-us/defender-xdr/advanced-hunting-callactivityevents-table) · Message Center [MC1532241](https://mc.merill.net/message/MC1532241) (αρχείο mc.merill.net, δημοσιεύθηκε στις 30 Οκτωβρίου 2026)

### 4. Defender for Cloud: posture policies και exemptions στο Defender portal

**Φάση:** Public Preview από τις 28 Οκτωβρίου 2026, μόνο για Azure · **Άδεια:** χρειάζεται ενεργό επιλέξιμο Defender plan στο περιβάλλον. Για posture recommendations σε περιβάλλοντα που διαχειρίζεσαι από το Defender χρειάζεται το Defender CSPM, γιατί το Defender portal δεν έχει δωρεάν Foundational CSPM.

**Τι αλλάζει.** Στο Microsoft Defender portal, στο **Exposure Management > Policies**, ορίζεις ποιοι κανόνες posture αξιολογούνται και πού. Το **MDC Baseline Policy** της Microsoft εφαρμόζεται από προεπιλογή σε όλα τα συνδεδεμένα περιβάλλοντα. Μπορείς να φτιάξεις και δικά σου custom policies, για παράδειγμα με κανόνες που αντιστοιχούν σε ISO 27001. Τα **exemptions** καταγράφουν ένα ρίσκο που αποδέχεσαι με scope, αιτιολογία και υποχρεωτική ημερομηνία λήξης. Το εύρημα μένει ορατό ως **Exempted**, ακόμη και στα attack paths. Τα exemptions και τα policies που έφτιαξες στο Azure συνεχίζουν να ισχύουν, αλλά δεν μεταφέρονται στο Defender portal.

**Τι να κάνεις.** Αν έχεις ήδη περάσει subscriptions στο Defender portal, έλεγξε σε ποια περιβάλλοντα εφαρμόζεται το MDC Baseline Policy. Δώσε το δικαίωμα **Core security settings (Manage)** για τα policies και **Exposure Management (Manage)** για τα exemptions μόνο σε όσους τα χρειάζονται. Χρησιμοποίησε τα exemptions ως μητρώο αποδοχής κινδύνου, με αιτιολογία και λήξη, αντί για άτυπες εξαιρέσεις. Για τη μεταφορά των plans στο Defender portal και τη χρέωση σε DWU, δες το [άρθρο για τα plans του Defender for Cloud](/posts/previews/defender-for-cloud-plans-defender-portal-dwu/).

**Αναλυτικά:** [Preview: Posture policies και exemptions του Defender for Cloud στο Defender portal](/posts/previews/defender-for-cloud-posture-policies-exemptions-defender-portal/)

**Πηγή:** [Manage posture policies](https://learn.microsoft.com/en-us/security-exposure-management/manage-posture-policies-defender) · [Exempt resources from recommendations (Defender portal)](https://learn.microsoft.com/en-us/azure/defender-for-cloud/exempt-resource?pivots=defender-portal) · [What's new in Microsoft Defender for Cloud](https://learn.microsoft.com/en-us/azure/defender-for-cloud/release-notes)

## Προσοχή αυτή την εβδομάδα

**Μέσα Νοεμβρίου 2026, Defender XDR.** Ολοκληρώνεται η διάθεση του πίνακα CallActivityEvents (αλλαγή 3) και, σύμφωνα με το [τεύχος 44](/posts/weekly-security-update/microsoft-365-security-ti-allaxe-2026-w44/), του πίνακα MessageContents.

**Αρχές Νοεμβρίου έως αρχές Δεκεμβρίου 2026, Defender for Office 365.** Υπενθύμιση από το τεύχος 44: συνεχίζεται η αλλαγή στα δικαιώματα του Security Operator στο Unified RBAC και η διάθεση του Move to quarantine.

**2 Δεκεμβρίου 2026, Defender XDR.** Προθεσμία για τον έλεγχο των ρόλων πριν από την αυτόματη ενεργοποίηση του Defender RBAC (αλλαγή 1).

Οι ημερομηνίες των ανακοινώσεων μπορεί να διαφέρουν ανά tenant, οπότε δες τις στο δικό σου Message Center.

## Σύνδεση με την ΚΥΑ 1689/2025

- **[13.γ](/kya-1689-2025/#13-γ) και [13.δ](/kya-1689-2025/#13-δ), least privilege και περιορισμός δικαιωμάτων διαχείρισης:** ο έλεγχος των ρόλων που εισάγονται στο Defender RBAC είναι ευκαιρία να κόψεις δικαιώματα που κανείς δεν χρειάζεται, και το «Emails associated with alerts» δίνει πρόσβαση σε περιεχόμενο email μόνο όσο χρειάζεται.
- **[16.α](/kya-1689-2025/#16-α), διαχείριση αλλαγών:** η αυτόματη ενεργοποίηση του Defender RBAC είναι αλλαγή στον έλεγχο πρόσβασης και πρέπει να περάσει από αξιολόγηση αντικτύπου και έγκριση.
- **[24.γ](/kya-1689-2025/#24-γ) και [24.ε](/kya-1689-2025/#24-ε), καταγραφή και έλεγχος:** ο πίνακας CallActivityEvents καλύπτει το κενό καταγραφής στις κλήσεις και συσκέψεις Teams.
- **[5.1.γ](/kya-1689-2025/#5-1-γ) και [17.στ](/kya-1689-2025/#17-στ), αντιμετώπιση κινδύνων και τεκμηρίωση εξαιρέσεων:** τα exemptions του Defender for Cloud καταγράφουν με αιτιολογία και λήξη ό,τι δεν αποκαθίσταται.

Όλες οι απαιτήσεις της ΚΥΑ 1689/2025 με την αντιστοίχισή τους βρίσκονται στον [οδηγό της ΚΥΑ 1689/2025](/kya-1689-2025/).

## Πηγές και επαλήθευση {#last-verified}

{{< verification >}}

Για αυτό το τεύχος ελέγχθηκαν το αρχείο mc.merill.net (αναρτήσεις Message Center για τα προϊόντα Defender που δημοσιεύθηκαν ή ενημερώθηκαν από τις 31 Οκτωβρίου έως τις 6 Νοεμβρίου 2026, και ανακοινώσεις Defender παλαιότερων εβδομάδων με ημερομηνίες μέσα στις επόμενες δύο εβδομάδες), οι σελίδες «What's new» των Defender XDR, Defender for Endpoint, Defender for Office 365, Defender for Identity, Defender for Cloud Apps, Defender for Cloud και Microsoft Sentinel, και τα blogs του Microsoft Defender στο Tech Community. Η ροή RSS του mc.merill.net δεν ήταν προσβάσιμη σε αυτόν τον έλεγχο, οπότε οι ανακοινώσεις εντοπίστηκαν μέσω αναζήτησης και κάθε μία ανοίχτηκε στη δική της σελίδα. Μπορεί να υπάρχουν ανακοινώσεις της εβδομάδας που δεν εντοπίστηκαν.

Τι βρέθηκε στις σελίδες «What's new»: του Defender XDR δεν έχει καταχωρίσεις μετά τον Σεπτέμβριο. Του Defender for Endpoint έχει για τον Νοέμβριο μόνο ένα build για macOS. Του Defender for Office 365 έχει για τον Οκτώβριο τον πίνακα `CallActivityEvents` (αλλαγή 3), το πεδίο `ApproverUpn` στον πίνακα `EmailPostDeliveryEvents` και την αναφορά συσκέψεων στο Teams, που καλύπτει ήδη το [άρθρο για το Report a call και το Report a meeting](/posts/new-features/report-a-call-report-a-meeting-teams-security-reporting/). Του Defender for Identity και του Defender for Cloud Apps δεν έχουν κάτι νεότερο από όσα κάλυψαν τα [τεύχη 42](/posts/weekly-security-update/microsoft-365-security-ti-allaxe-2026-w42/) έως [44](/posts/weekly-security-update/microsoft-365-security-ti-allaxe-2026-w44/). Του Defender for Cloud προσθέτει τα posture policies και τα exemptions στις 28 Οκτωβρίου (αλλαγή 4), που δεν είχαν μπει στο τεύχος 44. Του Microsoft Sentinel δεν έχει καταχωρίσεις Νοεμβρίου. Στα blogs του Tech Community δεν βρέθηκαν νέες αναρτήσεις ή webinars για τα προϊόντα Defender και Sentinel μέσα στην εβδομάδα, γι' αυτό δεν υπάρχει ενότητα «Νέοι πόροι».

Οι ανακοινώσεις MC1537494, MC1536045 και MC1532241 διαβάστηκαν από το έγκυρο, δημόσιο και ανεξάρτητο αρχείο του Microsoft 365 Message Center, mc.merill.net, που το συντηρεί η κοινότητα και όχι η Microsoft. Δεν διαβάστηκαν σε Message Center κάποιου tenant. Το πόσο επιβεβαιώνονται από τη Microsoft διαφέρει ανά θέμα:

- **Defender RBAC (MC1537494):** η αυτόματη ενεργοποίηση, η άδεια και οι ημερομηνίες προέρχονται μόνο από την ανακοίνωση. Το Microsoft Learn γράφει ακόμη ότι τα workloads ενεργοποιούνται χειροκίνητα.
- **Emails associated with alerts (MC1536045):** το Microsoft Learn επιβεβαιώνει τα τέσσερα alerts που καλύπτει το δικαίωμα.
- **CallActivityEvents (MC1532241):** το Microsoft Learn επιβεβαιώνει τον πίνακα και τα πεδία. Η άδεια και οι ημερομηνίες προέρχονται από την ανακοίνωση.
- **Posture policies και exemptions:** δεν υπάρχει ανακοίνωση Message Center. Τα στοιχεία προέρχονται από το Microsoft Learn.

Οι ανακοινώσεις και οι ημερομηνίες τους διαφέρουν ανά tenant. Πριν ενεργήσεις, δες την αντίστοιχη ανακοίνωση στο δικό σου Message Center.

Τελευταίος έλεγχος αδειών και στοιχείων: 5 Νοεμβρίου 2026.
