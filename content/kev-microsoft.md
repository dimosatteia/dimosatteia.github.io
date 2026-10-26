---
title: "CISA KEV για Microsoft: ποιες ευπάθειες αξιοποιούνται ενεργά τώρα"
date: 2026-10-25T08:45:00+02:00
lastmod: 2026-10-26T10:45:00+02:00
draft: false
url: "/kev-microsoft/"
# Το link στο μενού ορίζεται εδώ, ώστε να εμφανίζεται μόνο όταν η σελίδα είναι δημοσιευμένη.
menu:
  main:
    identifier: tool-kev-microsoft
    parent: tools
    name: "🛡️ CISA KEV: ευπάθειες Microsoft"
    weight: 8
author: "Dimosthenis Atteia"
description: "Ο κατάλογος CISA KEV φιλτραρισμένος για Microsoft: ποιες ευπάθειες Windows, Exchange, SharePoint και Office αξιοποιούνται ενεργά, με αναζήτηση, ένδειξη ransomware και έτοιμο KQL για το Microsoft Defender."
keywords:
  - CISA KEV Microsoft
  - Known Exploited Vulnerabilities
  - KEV vs NVD
  - ευπάθειες Microsoft που αξιοποιούνται
  - διαχείριση ευπαθειών
  - Microsoft Defender Vulnerability Management
  - KQL DeviceTvmSoftwareVulnerabilities
  - ΚΥΑ 1689/2025 ευπάθειες
showToc: false
ShowReadingTime: false
ShowBreadCrumbs: false
hideMeta: true
verification:
  - feature: "CISA Known Exploited Vulnerabilities Catalog: κατάλογος ευπαθειών με αποδεδειγμένη ενεργή αξιοποίηση"
    status: "Ενημερώνεται συνεχώς"
    license: "CC0 1.0"
    source: "https://www.cisa.gov/known-exploited-vulnerabilities-catalog"
    verified: 2026-10-25
  - feature: "cisagov/kev-data: επίσημο mirror της CISA στο GitHub με τα αρχεία JSON και CSV του καταλόγου"
    status: "Ενημερώνεται λίγα λεπτά μετά το cisa.gov"
    license: "CC0 1.0"
    source: "https://github.com/cisagov/kev-data"
    verified: 2026-10-25
  - feature: "Κριτήρια ένταξης στο KEV: CVE ID, αξιόπιστα στοιχεία ενεργής αξιοποίησης, σαφής διορθωτική ενέργεια"
    status: "Ισχύει"
    license: "Δημόσια πληροφορία CISA"
    source: "https://www.cisa.gov/known-exploited-vulnerabilities"
    verified: 2026-10-26
  - feature: "National Vulnerability Database (NVD) του NIST: όλα τα CVE με CVSS, CWE και CPE, με εμπλουτισμό κατά προτεραιότητα για τα CVE του KEV"
    status: "Ενημερώνεται συνεχώς"
    license: "Δημόσια πληροφορία NIST"
    source: "https://nvd.nist.gov/"
    verified: 2026-10-26
  - feature: "CVE List (CVEProject/cvelistV5): οι εγγραφές CVE με τη βαθμολογία CVSS του CNA (Microsoft) και του CISA ADP (Vulnrichment)"
    status: "Ενημερώνεται συνεχώς"
    license: "CVE Terms of Use"
    source: "https://github.com/CVEProject/cvelistV5"
    verified: 2026-10-25
  - feature: "DeviceTvmSoftwareVulnerabilities: πίνακας του Advanced Hunting με τις ευπάθειες του εγκατεστημένου λογισμικού"
    status: "GA"
    license: "Microsoft Defender for Endpoint Plan 2 ή Microsoft Defender Vulnerability Management"
    source: "https://learn.microsoft.com/en-us/defender-xdr/advanced-hunting-devicetvmsoftwarevulnerabilities-table"
    verified: 2026-10-25
  - feature: "ΚΥΑ 1689/2025 (ΦΕΚ Β΄ 2186/06.05.2025), άρθρο 17: Διαχείριση και γνωστοποίηση ευπαθειών"
    status: "Ισχύει"
    license: "Άρθρο 17"
    source: "https://cyber.gov.gr/wp-content/uploads/2025/05/20250202186.pdf"
    verified: 2026-10-20
categories: ["Security Operations & XDR"]
tags:
  - Vulnerability Management
  - Microsoft Defender Vulnerability Management
  - Threat Intelligence
  - KQL
  - ISO 27001
  - NIS2
# MITRE ATT&CK®: ονόματα στο data/mitre.yaml
mitre: ["T1190", "T1203", "T1068", "M1051", "M1016"]
---

Κάθε μήνα η Microsoft διορθώνει δεκάδες ευπάθειες. Δεν έχουν όλες τον ίδιο κίνδυνο. Ο κατάλογος **Known Exploited Vulnerabilities (KEV)** της CISA, της Αμερικανικής υπηρεσίας κυβερνοασφάλειας, κρατά μόνο όσες έχουν αποδεδειγμένα αξιοποιηθεί από επιτιθέμενους. Εδώ βλέπεις μόνο τις ευπάθειες Microsoft, με τις πιο πρόσφατες πρώτες. Η σελίδα ενημερώνεται αυτόματα όταν η CISA ενημερώνει τον κατάλογο.

{{< kev-microsoft >}}

## Πώς διαβάζεις τον κατάλογο

**Προστέθηκε.** Η ημέρα που η CISA πρόσθεσε την ευπάθεια στον κατάλογο. Δεν είναι η ημέρα που βγήκε το patch. Συχνά η ευπάθεια μπαίνει στο KEV την ίδια ημέρα με το Patch Tuesday, γιατί ήταν ήδη zero-day.

**Προθεσμία CISA.** Η ημερομηνία μέχρι την οποία οι ομοσπονδιακές υπηρεσίες των ΗΠΑ πρέπει να έχουν εφαρμόσει τη διόρθωση. Για μια ελληνική επιχείρηση δεν είναι υποχρέωση. Είναι όμως καλό μέτρο σύγκρισης για το δικό σου SLA ενημερώσεων.

**CVSS.** Η βαθμολογία σοβαρότητας της ευπάθειας, από 0 έως 10, δίπλα στο CVE. Το χρώμα ακολουθεί την κλίμακα του NVD: κόκκινο για Κρίσιμη (9.0 έως 10), πορτοκαλί για Υψηλή (7.0 έως 8.9), κίτρινο για Μεσαία (4.0 έως 6.9) και πράσινο για Χαμηλή (κάτω από 4.0). Η βαθμολογία είναι αυτή που δημοσιεύει η Microsoft για το CVE. Για τις παλιότερες ευπάθειες, που η Microsoft δεν είχε βαθμολογήσει, είναι του CISA. Αν περάσεις το ποντίκι πάνω από τη βαθμολογία, βλέπεις ολόκληρο το vector. Με τα φίλτρα «Βαθμολογία CVSS» και «Σοβαρότητα» κρατάς μόνο όσες σε ενδιαφέρουν, και τα συνδυάζεις με το προϊόν, την αναζήτηση και το ransomware. Το KQL που αντιγράφεις περιέχει μόνο αυτές. Μια ευπάθεια με Μεσαία βαθμολογία μέσα στο KEV είναι πιο επείγουσα από μια Κρίσιμη που δεν αξιοποιείται: η βαθμολογία μετρά πόσο σοβαρή είναι, το KEV ότι συμβαίνει ήδη.

**Ransomware.** Η CISA σημειώνει «γνωστή χρήση» όταν έχει στοιχεία ότι η ευπάθεια χρησιμοποιήθηκε σε επίθεση ransomware. Αυτές μπαίνουν πρώτες στη σειρά.

**Το link στο CVE** ανοίγει τη σελίδα της ευπάθειας στο Microsoft Security Response Center, με το patch και τις εκδόσεις που επηρεάζονται. Το μικρό link **NVD** δίπλα του ανοίγει την εγγραφή στο National Vulnerability Database του NIST, με την κατηγορία αδυναμίας (CWE), τα προϊόντα που επηρεάζονται (CPE) και το ιστορικό αλλαγών.

## KEV και NVD: ποια η διαφορά και γιατί το KEV

Το **National Vulnerability Database (NVD)** του NIST είναι η βάση με όλα τα CVE που δημοσιεύονται, είτε τα αξιοποιεί κάποιος είτε όχι. Για κάθε CVE δίνει περιγραφή, βαθμολογία CVSS, κατηγορία αδυναμίας (CWE) και τα προϊόντα που επηρεάζονται (CPE). Σου λέει πόσο σοβαρή είναι μια ευπάθεια στη θεωρία. Μόνο η Microsoft δημοσιεύει εκατοντάδες CVE κάθε μήνα.

Το **KEV** της CISA είναι ένας μικρός, επιλεγμένος κατάλογος. Μια ευπάθεια μπαίνει μόνο όταν ισχύουν τρία κριτήρια: έχει CVE ID, υπάρχουν αξιόπιστα στοιχεία ότι αξιοποιείται ενεργά, και υπάρχει σαφής διορθωτική ενέργεια, όπως μια ενημέρωση του κατασκευαστή. Σου λέει ότι η επίθεση συμβαίνει ήδη.

Γι' αυτό η σελίδα χτίστηκε πάνω στο KEV. Αν έδειχνε όλα τα CVE της Microsoft από το NVD, θα είχες χιλιάδες εγγραφές τον χρόνο και θα έκανες μόνος σου την ιεράρχηση. Με το KEV βλέπεις κατευθείαν τις λίγες που κλείνεις πρώτες. Η βαθμολογία CVSS δεν χάνεται. Η σελίδα τη δείχνει από το CVE List, και για τα CVE της Microsoft είναι η ίδια που δημοσιεύει η Microsoft ως CNA και εμφανίζει και το NVD. Από το 2026 το NIST εμπλουτίζει κατά προτεραιότητα τα CVE που είναι στο KEV και δεν βάζει δική του βαθμολογία όταν υπάρχει ήδη αυτή του CNA. Άρα το NVD δεν θα πρόσθετε ακρίβεια σε αυτή τη σελίδα.

Τα δύο δεν ανταγωνίζονται. Όταν ένα CVE μπαίνει στο KEV, η σελίδα του στο NVD το σημειώνει. Στη διαδικασία διαχείρισης ευπαθειών χρησιμοποίησε το NVD ως πλήρη αναφορά για το τι υπάρχει και το KEV ως φίλτρο για το τι διορθώνεις πρώτο. Αυτός ο συνδυασμός είναι και το τεκμήριο που ζητά ο ελεγκτής για την [ΚΥΑ 1689/2025 άρθρο 17](/kya-1689-2025/#17-β) και το [ISO/IEC 27001 A.8.8](/iso-27001/#A-8-8): ότι η σειρά των ενημερώσεων στηρίζεται σε πραγματικό κίνδυνο και όχι μόνο στη βαθμολογία.

## Πώς το συνδέεις με το Microsoft Defender

Ο κατάλογος σου λέει τι αξιοποιείται στον κόσμο. Δεν σου λέει αν το έχεις εσύ. Αυτό το απαντά το Microsoft Defender Vulnerability Management, που ήδη ξέρει ποιο λογισμικό τρέχει σε κάθε συσκευή.

1. Διάλεξε φίλτρα στον κατάλογο, για παράδειγμα «Μόνο με γνωστή χρήση σε ransomware».
2. Πάτα **Αντιγραφή KQL για Advanced Hunting**. Το query περιέχει μόνο τα CVE που ταιριάζουν στα φίλτρα σου.
3. Επικόλλησέ το στο **Microsoft Defender portal → Investigation & response → Hunting → Advanced hunting** και τρέξε το.

Το αποτέλεσμα δείχνει ανά CVE πόσες συσκευές σου είναι ευάλωτες, σε ποιο λογισμικό και ποια ενημέρωση το διορθώνει. Το query διαβάζει τον πίνακα `DeviceTvmSoftwareVulnerabilities`, που απαιτεί Microsoft Defender for Endpoint Plan 2 ή Microsoft Defender Vulnerability Management. Ο πίνακας αυτός δεν φτάνει στο Microsoft Sentinel, οπότε το query τρέχει μόνο στο Advanced Hunting του Defender.

{{< if-published page="/posts/Microsoft-Defender-Vulnerability-Management-Series/03-mdvm-the-prioritization-engine" >}}
> 📖 **Αναλυτικά:** [Microsoft Defender Vulnerability Management: η μηχανή ιεράρχησης](/posts/microsoft-defender-vulnerability-management-series/03-mdvm-the-prioritization-engine/)
{{< /if-published >}}

## Πώς το χρησιμοποιείς στη συμμόρφωση

Ο κατάλογος KEV είναι μια επίσημη, δημόσια πηγή πληροφοριών για ευπάθειες. Τον χρησιμοποιείς ως τεκμήριο ότι παρακολουθείς ενεργά τις απειλές και ότι ιεραρχείς τις ενημερώσεις με βάση τον πραγματικό κίνδυνο.

| Πλαίσιο | Απαίτηση | Πώς βοηθά ο κατάλογος |
|---|---|---|
| [ΚΥΑ 1689/2025](/kya-1689-2025/#17-β) | 17.β: τακτική λήψη και επεξεργασία πληροφοριών για ευπάθειες από κατάλληλες πηγές | Η CISA είναι αρχή και το KEV επίσημη πηγή. Κατέγραψέ το στη διαδικασία διαχείρισης ευπαθειών ως πηγή που ελέγχεις σε τακτική βάση. |
| [ΚΥΑ 1689/2025](/kya-1689-2025/#17-γ) | 17.γ: εγκατάσταση ενημερώσεων ασφάλειας σε εύλογο χρόνο | Οι ευπάθειες του KEV δικαιολογούν συντομότερο χρόνο ενημέρωσης από τον συνηθισμένο κύκλο. |
| [Οδηγία NIS2](/nis2/#21-2-ε) | Άρθρο 21.2.ε: χειρισμός και γνωστοποίηση ευπαθειών | Τεκμηριώνει ότι η ιεράρχηση των ευπαθειών στηρίζεται σε πραγματική αξιοποίηση και όχι μόνο στη βαθμολογία CVSS. |
| [ISO/IEC 27001:2022](/iso-27001/#A-8-8) | A.8.8: διαχείριση τεχνικών ευπαθειών | Πηγή για τον εντοπισμό και την αξιολόγηση των ευπαθειών. Χρησιμοποιείται και ως είσοδος για το A.5.7 (threat intelligence). |
| [GDPR](/gdpr/#32-1-β) | Άρθρο 32.1.β: διασφάλιση της εμπιστευτικότητας, ακεραιότητας και διαθεσιμότητας των συστημάτων σε συνεχή βάση | Τα συστήματα που επεξεργάζονται δεδομένα προσωπικού χαρακτήρα και έχουν ευπάθεια του KEV είναι οι πρώτες ενημερώσεις που πρέπει να γίνουν. |

Για τον έλεγχο: κράτα μια εξαγωγή του query ανά μήνα. Δείχνει πόσες συσκευές είχαν ευπάθειες του KEV και πόσο γρήγορα τις έκλεισες. Τα αντίστοιχα controls θα τα βρεις και στα checklists [ΚΥΑ 1689/2025](/downloads/nis2-kya-1689-2025-microsoft-365-checklist.xlsx), [NIS2](/downloads/nis2-directive-2022-2555-microsoft-365-checklist.xlsx), [ISO 27001](/downloads/iso-27001-2022-annex-a-microsoft-365-checklist.xlsx) και [GDPR](/downloads/gdpr-2016-679-microsoft-365-checklist.xlsx).

## Οι ευπάθειες στο MITRE ATT&CK®

| Τι κάνει η ευπάθεια | Τεχνική MITRE ATT&CK® |
|---|---|
| Ευπάθεια σε server που βλέπει το διαδίκτυο, όπως Exchange, SharePoint ή IIS | {{< attack "T1190" >}} |
| Ευπάθεια που ενεργοποιείται όταν ο χρήστης ανοίγει ένα αρχείο ή μια σελίδα, όπως Office, Internet Explorer ή MSHTML | {{< attack "T1203" >}} |
| Ευπάθεια που δίνει δικαιώματα SYSTEM ή διαχειριστή, όπως Win32k ή CLFS | {{< attack "T1068" >}} |
| Το μέτρο που τις κλείνει | {{< attack "M1051" >}}, με τον εντοπισμό τους μέσω {{< attack "M1016" >}} |

## Τι δεν καλύπτει ο κατάλογος

- **Ευπάθειες χωρίς δημόσια στοιχεία αξιοποίησης.** Αν μια ευπάθεια δεν είναι στο KEV, δεν σημαίνει ότι είναι ακίνδυνη. Σημαίνει ότι η CISA δεν έχει ακόμη τα στοιχεία.
- **Λογισμικό άλλων κατασκευαστών.** Η σελίδα δείχνει μόνο Microsoft. Ο πλήρης κατάλογος έχει και Fortinet, Cisco, Ivanti και άλλους, που μπορεί να υπάρχουν στο δίκτυό σου.
- **Συστήματα OT.** Οι ευπάθειες σε PLC και SCADA καλύπτονται από τις ανακοινώσεις ICS της CISA και των κατασκευαστών, όχι από αυτή τη σελίδα.

## Επίσημες πηγές {#last-verified}

{{< verification >}}

Τα δεδομένα είναι της CISA και διατίθενται με άδεια CC0 1.0. Η σελίδα δεν αποτελεί συμβουλή ασφάλειας. Το thecybersec.gr είναι προσωπικό blog και δεν εκπροσωπεί την CISA, την Εθνική Αρχή Κυβερνοασφάλειας ή τη Microsoft.

{{< tool-link page="/kql" lead="Επόμενο βήμα:" label="δες τη Βιβλιοθήκη KQL ανά απαίτηση της ΚΥΑ 1689/2025" tail="για περισσότερα queries στο Advanced Hunting." >}}

{{< tool-link page="/etoimotita-microsoft-365" lead="Θες να δεις πού στέκεσαι;" label="Κάνε τον έλεγχο ετοιμότητας Microsoft 365" tail="πριν από τον έλεγχο." >}}
