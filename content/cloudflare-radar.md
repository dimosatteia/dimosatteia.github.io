---
title: "Cloudflare Radar: επιθέσεις DDoS προς την Ελλάδα, τις τελευταίες 24 ώρες"
date: 2026-10-25T08:45:00+02:00
lastmod: 2026-10-25T08:45:00+02:00
draft: false
url: "/cloudflare-radar/"
# Το link στο μενού ορίζεται εδώ, ώστε να εμφανίζεται μόνο όταν η σελίδα είναι δημοσιευμένη.
menu:
  main:
    identifier: tool-cloudflare-radar
    parent: tools
    name: "📡 Cloudflare Radar: DDoS προς την Ελλάδα"
    weight: 9
author: "Dimosthenis Atteia"
description: "Επιθέσεις DDoS προς την Ελλάδα τις τελευταίες 24 ώρες, με δεδομένα από το Cloudflare Radar: είδη επιθέσεων, κλάδοι-στόχοι, χώρες προέλευσης και ένταση ανά ώρα, με αντιστοίχιση στην ΚΥΑ 1689/2025."
keywords:
  - Cloudflare Radar Ελλάδα
  - επιθέσεις DDoS Ελλάδα
  - DDoS σήμερα
  - Layer 3 DDoS
  - Azure DDoS Protection
  - ΚΥΑ 1689/2025 διαθεσιμότητα
  - threat intelligence Ελλάδα
showToc: false
ShowReadingTime: false
ShowBreadCrumbs: false
hideMeta: true
verification:
  - feature: "Cloudflare Radar API: δεδομένα για επιθέσεις Layer 3/4 ανά χώρα-στόχο"
    status: "Δωρεάν, σε όλα τα πλάνα"
    license: "CC BY-NC 4.0"
    source: "https://developers.cloudflare.com/radar/"
    verified: 2026-10-25
  - feature: "Cloudflare Radar: όροι χρήσης και αναφοράς πηγής των δεδομένων"
    status: "Ισχύει"
    license: "CC BY-NC 4.0 (API), CC BY 4.0 (γραφήματα)"
    source: "https://radar.cloudflare.com/about"
    verified: 2026-10-20
  - feature: "Azure DDoS Protection: προστασία Layer 3/4 για πόρους Azure με δημόσια IP (DDoS Network Protection, DDoS IP Protection)"
    status: "GA"
    license: "Azure DDoS Protection (ξεχωριστή χρέωση στο Azure)"
    source: "https://learn.microsoft.com/en-us/azure/ddos-protection/ddos-protection-overview"
    verified: 2026-10-25
  - feature: "ΚΥΑ 1689/2025 (ΦΕΚ Β΄ 2186/06.05.2025), άρθρο 19: Ασφάλεια δικτύων"
    status: "Ισχύει"
    license: "Άρθρο 19"
    source: "https://cyber.gov.gr/wp-content/uploads/2025/05/20250202186.pdf"
    verified: 2026-10-20
categories: ["Network & SSE"]
tags:
  - DDoS
  - Threat Intelligence
  - Cloudflare
  - Azure
  - ISO 27001
  - NIS2
# MITRE ATT&CK®: ονόματα στο data/mitre.yaml
mitre: ["T1498", "T1498.001", "T1498.002", "M1037"]
---

Μια επίθεση DDoS δεν κλέβει δεδομένα. Γεμίζει τη σύνδεσή σου με κίνηση μέχρι να μη μπορεί να περάσει τίποτα άλλο. Το e-shop δεν ανοίγει, το VPN πέφτει και η παραγωγή που εξαρτάται από το cloud σταματά. Εδώ βλέπεις τι είδους επιθέσεις δέχτηκαν στόχοι στην Ελλάδα τις τελευταίες 24 ώρες, όπως τις μέτρησε το δίκτυο της Cloudflare. Η σελίδα ενημερώνεται αυτόματα κάθε ώρα.

{{< cloudflare-radar >}}

## Πώς διαβάζεις τα δεδομένα

**Είδη επιθέσεων.** Ο τρόπος με τον οποίο γεμίζει η σύνδεση. Ένα *SYN Flood* ή *ACK Flood* στέλνει πακέτα TCP χωρίς να ολοκληρώνει ποτέ τη σύνδεση. Ένα *GRE Flood* στέλνει τεράστιο όγκο ενθυλακωμένων πακέτων. Το *Mirai* είναι botnet από παραβιασμένες συσκευές IoT, όπως κάμερες και routers. Στο *DNS Amplification* ο επιτιθέμενος στέλνει μικρά ερωτήματα σε DNS servers με πλαστή διεύθυνση αποστολέα, και αυτοί στέλνουν πολύ μεγαλύτερες απαντήσεις στον στόχο.

**Ποσοστά επί του όγκου.** Τα ποσοστά μετρούν bytes, όχι αριθμό επιθέσεων. Μία μεγάλη επίθεση μπορεί να καλύψει το 90% της ημέρας. Γι' αυτό η εικόνα αλλάζει πολύ από μέρα σε μέρα.

**Χώρα προέλευσης.** Η χώρα του data center της Cloudflare που δέχτηκε την κίνηση της επίθεσης. Δεν είναι η χώρα του επιτιθέμενου. Ένα botnet μπορεί να έχει συσκευές σε όλο τον κόσμο, και στις επιθέσεις με πλαστή IP η πραγματική πηγή δεν φαίνεται.

**Τι δεν δείχνει.** Μόνο την κίνηση που πέρασε από το δίκτυο της Cloudflare. Οι επιθέσεις που αντιμετώπισε ο πάροχος internet σου ή άλλος πάροχος προστασίας DDoS δεν εμφανίζονται εδώ.

## Τι κάνεις με Microsoft

**Για τις υπηρεσίες του Microsoft 365.** Exchange Online, SharePoint, Teams και Entra ID προστατεύονται από την υποδομή της Microsoft. Δεν χρειάζεται και δεν μπορείς να ρυθμίσεις κάτι. Η διαθεσιμότητά τους καλύπτεται από το SLA της Microsoft.

**Για ό,τι έχεις στο Azure.** Το **Azure DDoS Protection** προστατεύει σε Layer 3 και 4 τους πόρους με δημόσια IP μέσα σε virtual network. Έχει δύο επιλογές: DDoS Network Protection για όλο το virtual network ή DDoS IP Protection ανά δημόσια IP. Για εφαρμογές web, πρόσθεσε WAF (Azure Application Gateway ή Azure Front Door) για τις επιθέσεις Layer 7. Τα logs των επιθέσεων στέλνονται στο Microsoft Sentinel.

**Για τη δική σου σύνδεση στο internet.** Ούτε το Microsoft 365 ούτε το Azure προστατεύουν τη γραμμή του γραφείου ή του εργοστασίου σου. Εδώ χρειάζεσαι υπηρεσία anti-DDoS από τον πάροχο internet ή από εξειδικευμένο πάροχο, και δεύτερη γραμμή από άλλον πάροχο για τις κρίσιμες λειτουργίες.

## Πώς το χρησιμοποιείς στη συμμόρφωση

| Πλαίσιο | Απαίτηση | Πώς βοηθά |
|---|---|---|
| [ΚΥΑ 1689/2025](/kya-1689-2025/#19-ι) | 19.ι: προστασία της διαθεσιμότητας των κρίσιμων υπηρεσιών | Τεκμηριώνει ότι ο κίνδυνος DDoS για την Ελλάδα είναι πραγματικός και παρακολουθείται. Δικαιολογεί τα μέτρα και τα SLA που ζητάς από τους παρόχους σου. |
| [ΚΥΑ 1689/2025](/kya-1689-2025/#5-2) | 5.2: εκτίμηση κινδύνων με cyber threat intelligence (μόνο βασικές οντότητες) | Δημόσια, επαναλήψιμη πηγή threat intelligence για το σενάριο «άρνηση υπηρεσίας» στο μητρώο κινδύνων. |
| [Οδηγία NIS2](/nis2/#21-2-α) | Άρθρο 21.2.α: πολιτικές ανάλυσης κινδύνων και ασφάλειας συστημάτων | Εισροή στην ανάλυση κινδύνων με δεδομένα για επιθέσεις προς τη χώρα και τον κλάδο σου. |
| [Οδηγία NIS2](/nis2/#21-2-γ) | Άρθρο 21.2.γ: συνέχεια λειτουργίας και διαχείριση κρίσεων | Βάση για ένα σενάριο DDoS στο σχέδιο συνέχειας λειτουργίας και στις ασκήσεις. |
| [ISO/IEC 27001:2022](/iso-27001/#A-5-7) | A.5.7: threat intelligence | Πηγή πληροφοριών για απειλές, με καταγεγραμμένη συχνότητα ελέγχου. Συνδέεται με το [A.8.20](/iso-27001/#A-8-20) (ασφάλεια δικτύων). |
| [GDPR](/gdpr/#32-1-β) | Άρθρο 32.1.β: διαθεσιμότητα των συστημάτων επεξεργασίας σε συνεχή βάση | Η διαθεσιμότητα είναι μέρος της ασφάλειας της επεξεργασίας. Μια υπηρεσία που πέφτει από DDoS δεν είναι διαθέσιμη στα υποκείμενα των δεδομένων. |

Για τον έλεγχο: κράτα ένα στιγμιότυπο της σελίδας ανά μήνα ή μετά από κάθε περιστατικό. Μαζί με τα SLA των παρόχων σου τεκμηριώνει ότι εξέτασες τον κίνδυνο. Τα αντίστοιχα controls θα τα βρεις και στα checklists [ΚΥΑ 1689/2025](/downloads/nis2-kya-1689-2025-microsoft-365-checklist.xlsx), [NIS2](/downloads/nis2-directive-2022-2555-microsoft-365-checklist.xlsx), [ISO 27001](/downloads/iso-27001-2022-annex-a-microsoft-365-checklist.xlsx) και [GDPR](/downloads/gdpr-2016-679-microsoft-365-checklist.xlsx).

## Οι επιθέσεις στο MITRE ATT&CK®

| Είδος επίθεσης | Τεχνική MITRE ATT&CK® |
|---|---|
| Όλες οι επιθέσεις DDoS σε επίπεδο δικτύου | {{< attack "T1498" >}} |
| SYN, ACK, UDP, GRE και Mirai floods, όπου η κίνηση στέλνεται απευθείας στον στόχο | {{< attack "T1498.001" >}} |
| DNS, SSDP και άλλες amplification επιθέσεις, μέσω τρίτων servers | {{< attack "T1498.002" >}} |
| Το μέτρο που τις περιορίζει | {{< attack "M1037" >}} |

## Επίσημες πηγές {#last-verified}

{{< verification >}}

Τα δεδομένα είναι της Cloudflare και διατίθενται με άδεια CC BY-NC 4.0, μόνο για μη εμπορική χρήση. Η σελίδα δεν αποτελεί συμβουλή ασφάλειας. Το thecybersec.gr είναι προσωπικό blog και δεν εκπροσωπεί την Cloudflare, την Εθνική Αρχή Κυβερνοασφάλειας ή τη Microsoft.

{{< tool-link page="/kev-microsoft" lead="Δες και:" label="ποιες ευπάθειες Microsoft αξιοποιούνται ενεργά τώρα" tail="στον κατάλογο CISA KEV." >}}

{{< tool-link page="/kostos-peristatikou" lead="Πόσο θα σου κόστιζε;" label="Υπολόγισε το κόστος μιας διακοπής λειτουργίας" tail="σε ευρώ." >}}
