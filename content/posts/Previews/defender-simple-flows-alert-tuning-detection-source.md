---
title: "Preview: Simple Flows στα automation rules και detection source στα alert tuning rules του Defender"
seoTitle: "Preview: Simple Flows και detection source στο Defender"
date: 2026-10-27T16:20:00+02:00
lastmod: 2026-10-27T16:20:00+02:00
draft: false
keywords:
  - Microsoft Defender XDR
  - Simple Flows
  - automation rules Defender portal
  - Case created trigger
  - alert tuning rules
  - detection source
  - MC1481318
  - Microsoft Sentinel unified SecOps
tags:
  - Microsoft Defender XDR
  - Microsoft Sentinel
  - Security Operations
  - SOC
  - Automation
  - Incident Response
  - NIS2
  - ISO 27001
author: "Dimosthenis Atteia"
description: "Δύο αλλαγές σε Public Preview για το SOC στο Defender portal: τα Simple Flows φέρνουν έτοιμες ενέργειες στα automation rules χωρίς playbook, και τα alert tuning rules περιορίζονται πλέον σε συγκεκριμένες detection sources. Τι κάνουν, τα όρια τους και τι προσέχεις στα custom detections."
seoDescription: "Simple Flows στα automation rules χωρίς playbook και detection source στα alert tuning rules του Defender, σε Preview. Τι κάνουν, όρια και τι προσέχεις."
summary: "Για μικρό SOC, τα Simple Flows είναι ο γρήγορος δρόμος για email στη βάρδια και σταθερά tasks σε κάθε case. Τα alert tuning rules με detection source μειώνουν τον θόρυβο χωρίς να κρύβουν τα custom detections σου. Δες πώς τα στήνεις και τι δεν κάνουν."
categories: ["Security Operations & XDR"]
releases:
  - "preview"
ShowToc: true
TocOpen: false
cover:
  image: "https://learn.microsoft.com/defender-xdr/media/investigate-alerts/alert-tuning-select-service.png"
  alt: "Η περιοχή Service και Detection sources στο παράθυρο Tune alert του Microsoft Defender portal, με τις detection sources ανοιχτές"
  caption: "Πηγή εικόνας: Microsoft Learn"
  relative: false
# Πλαίσιο «Last verified»: κάθε χαρακτηριστικό με τη φάση, την άδεια, την πηγή και την ημερομηνία ελέγχου
verification:
  - feature: "Simple Flows: triggers Case created και Case updated, ενέργειες email, Update Case, Add Task και Update Alert στα automation rules"
    status: "Public Preview"
    license: "Microsoft Defender XDR, ή Microsoft Sentinel με workspace στο unified SecOps platform"
    source: "https://learn.microsoft.com/en-us/azure/sentinel/automation/create-basic-automation-rules-simple-flows"
    verified: 2026-10-27
  - feature: "Detection source στα alert tuning rules: επιλογή από τα μέσα Οκτωβρίου, ισχύς από 8 Νοεμβρίου 2026"
    status: "Public Preview"
    license: "Microsoft Defender XDR"
    source: "https://learn.microsoft.com/en-us/defender-xdr/investigate-alerts#tune-an-alert"
    verified: 2026-10-27
  - feature: "MC1481318: GA του detection source από τα μέσα Νοεμβρίου 2026, με ισχύ από τις αρχές Δεκεμβρίου"
    status: "Generally Available"
    license: "Microsoft Defender XDR"
    source: "https://mc.merill.net/message/MC1481318"
    verified: 2026-10-27
# MITRE ATT&CK®: ονόματα στο data/mitre.yaml
mitre: ["M1047"]
---

Σε ένα SOC δύο ή τριών ανθρώπων, το πρόβλημα σπάνια είναι η ανίχνευση. Είναι ότι ένα case υψηλής σοβαρότητας μένει μία ώρα στην ουρά επειδή κανείς δεν το είδε, και ότι κάθε αναλυτής κάνει την έρευνα με τη δική του σειρά. Η λύση ως τώρα ήταν playbook με Logic App, που θέλει χρόνο, γνώσεις και κάποιον να το συντηρεί.

Η Microsoft φέρνει δύο αλλαγές σε **Public Preview** για το unified SecOps στο Defender portal, που απευθύνονται ακριβώς σε αυτό το SOC.

## Simple Flows: automation χωρίς playbook

Τα **Simple Flows** είναι έτοιμες ενέργειες για τα automation rules στο Defender portal. Διαλέγεις trigger, βάζεις συνθήκες και προσθέτεις μία ενέργεια. Δεν χρειάζεται playbook, Logic App ή κώδικας.

Προστίθενται δύο νέοι triggers, **Case created** και **Case updated**, και πέντε ενέργειες:

| Ενέργεια | Trigger | Τι κάνει |
|---|---|---|
| **Send Case Created Email** | Case created | Email με ID, τίτλο, σοβαρότητα, κατάσταση, owner και link του case. |
| **Send Case Updated Email** | Case updated | Email με τις παλιές και νέες τιμές των πεδίων που άλλαξαν. |
| **Update Case** | Case created ή updated | Αλλάζει πεδία του case: owner, priority, status, due date, closing notes και custom fields. |
| **Add Task** | Case created ή updated | Προσθέτει έως 10 tasks ανά κανόνα, με τη σειρά που τα όρισες. |
| **Update Alert** | Alert created | Αλλάζει status, classification, determination και assigned to ενός alert. |

Ο trigger **Case updated** δίνει τις παλιές και τις νέες τιμές, οπότε μπορείς να γράψεις συνθήκες όπως «η σοβαρότητα άλλαξε από Medium σε High». Αν αποθηκευτούν πολλές αλλαγές μαζί, ο κανόνας τρέχει μία φορά.

### Τα όρια που πρέπει να ξέρεις

- Τα emails έχουν **σταθερό template** που δεν αλλάζει, αποστολέα **Microsoft Security** και δεν υποστηρίζουν CC και BCC.
- Τα emails **δεν γράφονται στο audit log του case.** Δεν μπορείς να δείξεις από το timeline ότι στάλθηκε ειδοποίηση, οπότε μην τα χρησιμοποιείς ως τεκμήριο ειδοποίησης.
- Το **Add Task** δεν ελέγχει για διπλότυπα. Αν ο κανόνας ξανατρέξει, προσθέτει ξανά τα ίδια tasks. Βάλε στενές συνθήκες στο **Case updated**.

### Δύο κανόνες για να ξεκινήσεις

1. **Ειδοποίηση βάρδιας:** trigger **Case created**, συνθήκη **Severity equals High**, ενέργεια **Send Case Created Email** στη διανομή της βάρδιας.
2. **Checklist έρευνας:** trigger **Case updated**, συνθήκη **Status changed to Investigating**, ενέργεια **Add Task** με τα βήματα της διαδικασίας σου, π.χ. «Απομόνωση συσκευής αν χρειάζεται», «Revoke sessions του χρήστη», «Ενημέρωση ΥΑΣΠΕ για αξιολόγηση σημαντικότητας».

Ο δεύτερος κάνει τη διαδικασία διαχείρισης περιστατικών μέρος του εργαλείου, και τα tasks μένουν στο case ως ίχνος του τι έγινε.

Χρειάζεσαι **Microsoft Sentinel Contributor** για τους κανόνες, και **Security Operator** ή **Security Administrator** για cases και alerts. Οι κανόνες φτιάχνονται στο **Microsoft Sentinel → Automation** του Defender portal.

## Detection source στα alert tuning rules

Τα **alert tuning rules** κρύβουν ή κλείνουν αυτόματα alerts που ξέρεις ότι είναι θόρυβος. Μέχρι τώρα ο κανόνας εφαρμοζόταν σε ολόκληρη την υπηρεσία, π.χ. σε όλο το Defender for Endpoint. Τώρα, στο παράθυρο **Tune alert**, κάτω από **Select service sources**, διαλέγεις και συγκεκριμένες **detection sources** μέσα σε κάθε υπηρεσία.

Σύμφωνα με το Microsoft Learn, οι επιλογές σου ισχύουν από τις **8 Νοεμβρίου 2026**. Μέχρι τότε είναι περίοδος προετοιμασίας και μπορείς να επεξεργαστείς τους υπάρχοντες κανόνες. Σύμφωνα με την ανακοίνωση MC1481318, η GA έρχεται από τα μέσα Νοεμβρίου, με ισχύ από τις αρχές Δεκεμβρίου.

Το σημαντικό σημείο: **κανόνες που δεν αλλάζεις συνεχίζουν να εφαρμόζονται σε όλες τις detection sources, και στα custom detections σου.** Αν έχεις έναν πλατύ κανόνα που κρύβει κάποιο alert του Defender for Endpoint, μπορεί να κρύβει και το alert ενός custom detection που έγραψες εσύ για το ίδιο μοτίβο.

Τι κάνεις μέχρι τις 8 Νοεμβρίου: άνοιξε το **Settings → Microsoft Defender XDR → Alert tuning**, πέρασε έναν έναν τους κανόνες σου, και όπου ο σκοπός ήταν να κρύψεις θόρυβο από συγκεκριμένη πηγή, περιόρισέ τον σε αυτή. Τα built-in alert tuning rules δεν εφαρμόζονται στα custom detections. Οι δικοί σου κανόνες εφαρμόζονται.

> 📖 **Θέλεις όλη την εικόνα;** Το SIEM μέσα στο Defender portal και τι σημαίνει για το SOC: **[Preview: ISOC, το SIEM μπαίνει στο Microsoft Defender χωρίς Sentinel workspace](/posts/previews/isoc-integrated-security-operations-defender/)**.

## Σύνδεση με ΚΥΑ 1689/2025, NIS2, ISO 27001 και GDPR

- **ΚΥΑ 1689/2025 [24.ε](/kya-1689-2025/#24-ε):** «κατάλληλα όρια και συνθήκες ειδοποίησης». Τα alert tuning rules με detection source και οι ειδοποιήσεις των Simple Flows είναι ακριβώς αυτό. Κάθε κανόνας που κρύβει alerts θέλει τεκμηρίωση. **[24.α](/kya-1689-2025/#24-α) και [24.β](/kya-1689-2025/#24-β):** τα tasks του **Add Task** κάνουν τη διαδικασία απόκρισης βήματα μέσα στο case.
- **Οδηγία NIS2 [21.2.β](/nis2/#21-2-β):** χειρισμός περιστατικών.
- **ISO/IEC 27001 [A.8.16](/iso-27001/#A-8-16), [A.5.25](/iso-27001/#A-5-25) και [A.5.26](/iso-27001/#A-5-26):** monitoring activities, αξιολόγηση των events και απόκριση στα περιστατικά.
- **GDPR [33.1](/gdpr/#33-1):** η γρήγορη ειδοποίηση της βάρδιας κερδίζει χρόνο για την αξιολόγηση μιας παραβίασης μέσα στις 72 ώρες.

Τεκμήρια για τον ελεγκτή: η λίστα των alert tuning rules με την αιτιολόγηση και την detection source του καθενός, η εξαγωγή των automation rules, και ένα case με τα tasks της διαδικασίας ολοκληρωμένα. Η ειδοποίηση με email δεν καταγράφεται στο case, οπότε κράτα το τεκμήριο αλλού.

---

## Πηγές και επαλήθευση {#last-verified}

{{< verification >}}

Επιπλέον πηγές: [Create basic automation rules with Simple Flows in the Microsoft Defender portal](https://learn.microsoft.com/en-us/azure/sentinel/automation/create-basic-automation-rules-simple-flows) · [Investigate alerts in Microsoft Defender XDR: Tune an alert](https://learn.microsoft.com/en-us/defender-xdr/investigate-alerts#tune-an-alert) · [Automate threat response with automation rules](https://learn.microsoft.com/en-us/azure/sentinel/automate-incident-handling-with-automation-rules) · Message Center MC1481318 (28 Σεπτεμβρίου 2026), όπως αρχειοθετείται στο mc.merill.net. Το Microsoft Learn δεν δίνει ημερομηνία κυκλοφορίας για τα Simple Flows. Το θέμα πρωτοεμφανίστηκε στο [Microsoft 365 Security: τι άλλαξε (εβδομάδα 43/2026)](/posts/weekly-security-update/microsoft-365-security-ti-allaxe-2026-w43/).

Τελευταίος έλεγχος στοιχείων: 27 Οκτωβρίου 2026.
