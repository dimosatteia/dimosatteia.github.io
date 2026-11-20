---
title: "Preview: Similar cases στα incidents του Defender portal"
seoTitle: "Preview: Similar cases στα incidents του Defender"
slug: "defender-similar-cases-unified-secops"
date: 2026-11-20T08:15:00+02:00
lastmod: 2026-11-20T08:15:00+02:00
draft: false
keywords:
  - Microsoft Defender XDR
  - Similar cases
  - Similarity reason
  - Recommended correlations
  - MC1556107
  - incident cases Defender portal
  - Microsoft Sentinel unified SecOps
  - έρευνα περιστατικών
tags:
  - Microsoft Defender XDR
  - Microsoft Sentinel
  - Security Operations
  - SOC
  - Incident Response
  - NIS2
  - ISO 27001
author: "Dimosthenis Atteia"
description: "Η σελίδα του incident στο Defender portal αποκτά σε Public Preview την καρτέλα Similar cases, με έως 20 incidents που μοιράζονται alerts ή entities. Η GA έρχεται στις αρχές Δεκεμβρίου 2026. Πώς τη χρησιμοποιείς στην έρευνα."
seoDescription: "Similar cases στα incidents του Defender και του Sentinel στο Defender portal, σε Preview και GA από αρχές Δεκεμβρίου 2026. Τι δείχνει και πώς το χρησιμοποιείς."
summary: "Πριν ψάξεις από την αρχή, δες αν το ίδιο έχει ξανασυμβεί και πώς το έκλεισε η βάρδια. Η καρτέλα Similar cases το δείχνει μέσα στο incident, και η κάρτα Associated incidents αλλάζει όνομα."
categories: ["Security Operations & XDR"]
releases:
  - "preview"
ShowToc: true
TocOpen: false
cover:
  image: "https://learn.microsoft.com/defender-xdr/media/investigate-incidents/incident-similartab-small.png"
  alt: "Η καρτέλα με τα παρόμοια incidents και τη στήλη Similarity reason σε ένα incident του Microsoft Defender portal"
  caption: "Πηγή εικόνας: Microsoft Learn"
  relative: false
# Πλαίσιο «Last verified»: κάθε χαρακτηριστικό με τη φάση, την άδεια, την πηγή και την ημερομηνία ελέγχου
verification:
  - feature: "Defender XDR: καρτέλα Similar cases με έως 20 incidents και στήλη Similarity reason, για Defender και Sentinel στο Defender portal"
    status: "Public Preview"
    license: "Δεν αναφέρεται"
    source: "https://learn.microsoft.com/en-us/defender-xdr/investigate-incident-cases#review-similar-cases"
    verified: 2026-11-19
  - feature: "MC1556107: GA από τις αρχές Δεκεμβρίου 2026 και μετονομασία της κάρτας Associated incidents σε Recommended correlations"
    status: "Generally Available"
    license: "Δεν αναφέρεται"
    source: "https://mc.merill.net/message/MC1556107"
    verified: 2026-11-19
# MITRE ATT&CK®: ονόματα στο data/mitre.yaml
mitre: ["M1047"]
---

Ένα incident ανοίγει στη βάρδια της Παρασκευής. Ο αναλυτής ξεκινά από την αρχή: ποιος χρήστης, ποια συσκευή, τι έγινε. Τρεις εβδομάδες πριν, ένας συνάδελφος είχε δει το ίδιο μοτίβο, το είχε ερευνήσει και το είχε κλείσει ως ψευδώς θετικό, με σχόλια. Αυτή η γνώση υπάρχει στο σύστημα, αλλά κανείς δεν τη βρίσκει τη στιγμή που χρειάζεται.

Η καρτέλα **Similar cases** φέρνει αυτή τη γνώση μέσα στο incident.

## Τι αλλάζει

Σύμφωνα με την ανακοίνωση MC1556107 (17 Νοεμβρίου 2026 ώρα Ελλάδας):

- Η σελίδα του incident αποκτά καρτέλα **Similar cases**, με έως **20 incidents** που μοιράζονται **τίτλους alerts ή entities** με το τρέχον.
- Η στήλη **Similarity reason** δείχνει γιατί εμφανίζεται κάθε incident.
- Η κάρτα **Associated incidents** στην καρτέλα **Summary** μετονομάζεται σε **Recommended correlations**. Το περιεχόμενό της δεν αλλάζει.
- Η κάρτα και η καρτέλα κάνουν διαφορετική δουλειά. Τα **Similar cases** είναι ξεχωριστά cases που μοιράζονται τίτλους alerts ή entities. Τα **Recommended correlations** είναι cases που πιθανότατα ανήκουν στην ίδια επίθεση.
- Η αλλαγή φέρνει στο unified SecOps platform την εμπειρία Similar incidents που είχε το Microsoft Sentinel στο Azure portal.
- Αφορά το Microsoft Defender portal και το Microsoft Sentinel μέσα στο Defender portal.

**Φάση και ημερομηνίες, σύμφωνα με την ανακοίνωση:** Public Preview διαθέσιμο τώρα. GA με διάθεση που ξεκινά και ολοκληρώνεται στις αρχές Δεκεμβρίου 2026. Η ανακοίνωση λέει ότι δεν χρειάζεται προετοιμασία. Η άδεια δεν αναφέρεται στην πηγή.

## Πώς δουλεύει

Σύμφωνα με το Microsoft Learn, στα incident cases η σελίδα βρίσκεται στο **Artifacts → Similar cases**. Η στήλη **Similarity reason** δείχνει αν κάθε case έχει κοινά alerts, κοινά entities ή και τα δύο, και πόσα. Αν περάσεις τον δείκτη πάνω από τον λόγο, βλέπεις ποια ακριβώς alerts και entities είναι κοινά.

Για να δεις και να ερευνήσεις incident cases χρειάζεσαι το δικαίωμα **Security Data Read** του Unified RBAC. Για να τα διαχειριστείς, **Security Data Manage**.

### Τι προσέχεις

- **Παρόμοιο δεν σημαίνει ίδιο.** Ένα κοινό entity, π.χ. ένας server που εμφανίζεται σε πολλά incidents, μπορεί να φέρει στη λίστα άσχετα περιστατικά. Διάβασε τον λόγο πριν βγάλεις συμπέρασμα.
- **Η λίστα είναι όσο καλή είναι τα παλιά σου incidents.** Αν η βάρδια κλείνει incidents χωρίς classification και σχόλια, το Similar cases θα σου δείξει ότι κάτι έγινε, όχι τι αποφασίστηκε και γιατί.
- **Η μετονομασία μπερδεύει.** Αν οι οδηγίες έρευνας, το runbook ή ο MSSP σου αναφέρουν «Associated incidents», θα ψάχνουν κάρτα που δεν υπάρχει πια με αυτό το όνομα.

## Τι κάνεις τώρα

1. **Άνοιξε ένα πρόσφατο incident** στο Defender portal (**Cases → Incident**, επίλεξε το case) και πήγαινε στο **Artifacts → Similar cases**. Δες τι σου δείχνει για ένα περιστατικό που ξέρεις.
2. **Ενημέρωσε το runbook.** Πρόσθεσε στα πρώτα βήματα της έρευνας: «Έλεγξε τα Similar cases. Αν υπάρχει κλεισμένο παρόμοιο, διάβασε classification και σχόλια». Άλλαξε το «Associated incidents» σε «Recommended correlations».
3. **Ενημέρωσε τον MSSP** αν έχεις, για τη μετονομασία και για το νέο βήμα.
4. **Βελτίωσε το κλείσιμο.** Ζήτα από τη βάρδια να συμπληρώνει classification, determination και ένα σχόλιο με την αιτιολόγηση. Αυτό κάνει το Similar cases χρήσιμο.
5. **Μετά την GA** στις αρχές Δεκεμβρίου, έλεγξε ότι η καρτέλα εμφανίζεται σε όλους τους αναλυτές.

> 📖 **Θέλεις όλη την εικόνα;** Το SIEM μέσα στο Defender portal και τι σημαίνει για το SOC: **[Preview: ISOC, το SIEM μπαίνει στο Microsoft Defender χωρίς Sentinel workspace](/posts/previews/isoc-integrated-security-operations-defender/)**.

## Σύνδεση με ΚΥΑ 1689/2025, NIS2, ISO 27001 και GDPR

- **ΚΥΑ 1689/2025 [24.α](/kya-1689-2025/#24-α):** πλάνο ανίχνευσης, ανάλυσης και απόκρισης. Το Similar cases γίνεται βήμα της ανάλυσης. **[24.ε](/kya-1689-2025/#24-ε):** τακτικός έλεγχος για ύποπτη δραστηριότητα, με λιγότερο χρόνο ανά incident. **[24.στ](/kya-1689-2025/#24-στ):** επικαιροποίηση των διαδικασιών απόκρισης, εδώ με την αλλαγή του runbook.
- **Οδηγία NIS2 [21.2.β](/nis2/#21-2-β):** χειρισμός περιστατικών.
- **ISO/IEC 27001 [A.5.25](/iso-27001/#A-5-25):** αξιολόγηση και απόφαση για τα events. **[A.5.27](/iso-27001/#A-5-27):** μάθηση από τα περιστατικά, που εδώ γίνεται μέρος της ροής εργασίας.
- **GDPR [33.1](/gdpr/#33-1):** όταν ένα incident μοιάζει με προηγούμενη παραβίαση προσωπικών δεδομένων, το βλέπεις νωρίς και κερδίζεις χρόνο για την αξιολόγηση μέσα στις 72 ώρες.

Τεκμήρια για τον ελεγκτή: το runbook με το βήμα Similar cases και την ημερομηνία αλλαγής του, και δείγμα κλεισμένων incidents με classification και σχόλιο αιτιολόγησης.

---

## Πηγές και επαλήθευση {#last-verified}

{{< verification >}}

Επιπλέον πηγές: [Investigate incident cases in the Microsoft Defender portal](https://learn.microsoft.com/en-us/defender-xdr/investigate-incident-cases) · [Investigate incidents in the Microsoft Defender portal: Similar incidents](https://learn.microsoft.com/en-us/defender-xdr/investigate-incidents#similar-incidents) · [Alert correlation and incident merging in the Microsoft Defender portal](https://learn.microsoft.com/en-us/defender-xdr/alerts-incidents-correlation) · Message Center MC1556107 (17 Νοεμβρίου 2026 ώρα Ελλάδας), όπως αρχειοθετείται στο mc.merill.net. Το θέμα πρωτοεμφανίστηκε στο [Microsoft 365 Security: τι άλλαξε (εβδομάδα 47/2026)](/posts/weekly-security-update/microsoft-365-security-ti-allaxe-2026-w47/).

Τελευταίος έλεγχος στοιχείων: 19 Νοεμβρίου 2026.
