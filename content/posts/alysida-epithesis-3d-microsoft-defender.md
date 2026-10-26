---
title: "Η αλυσίδα μιας επίθεσης σε 3D: πού τη σταματά το Microsoft Defender"
seoTitle: "Αλυσίδα επίθεσης σε 3D με Microsoft Defender XDR"
date: 2026-11-09T07:00:00+02:00
lastmod: 2026-11-09T07:00:00+02:00
draft: false
# Εμφανίζεται ως «Νέο άρθρο» στην αρχική, μέχρι να βγει νεότερο τεύχος της εβδομαδιαίας σύνοψης
homeHighlight: true
# Χωρίς overflow στο <main>, ώστε η 3D σκηνή (και το Table of Contents) να μένουν sticky στο scroll
attackChain: true
keywords:
  - αλυσίδα επίθεσης
  - attack chain Microsoft Defender
  - AiTM phishing
  - BEC απάτη τιμολογίου
  - ransomware προστασία Microsoft
  - automatic attack disruption
  - Microsoft Defender XDR σενάρια
  - παραβιασμένος προμηθευτής email
  - ευπάθεια VPN CISA KEV
  - ΚΥΑ 1689/2025 Microsoft Defender
tags:
  - Microsoft Defender XDR
  - Microsoft Defender for Office 365
  - Microsoft Defender for Endpoint
  - Microsoft Defender for Identity
  - Microsoft Defender for Cloud Apps
  - Attack Disruption
  - Adversary-in-the-Middle
  - Business Email Compromise
  - Ransomware
  - Supply Chain
  - Vulnerability Management
  - Microsoft 365 Security
author: "Dimosthenis Atteia"
description: "Τρία ρεαλιστικά σενάρια επίθεσης σε 3D: AiTM που καταλήγει σε BEC και ransomware, παραβιασμένος προμηθευτής, ευπάθεια στο VPN. Σε κάθε βήμα βλέπεις ποιο προϊόν του Microsoft Defender τη σταματά."
seoDescription: "Τρία σενάρια επίθεσης σε 3D και σε ποιο βήμα τα σταματά το Microsoft Defender XDR, με MITRE ATT&CK και αντιστοίχιση σε ΚΥΑ 1689/2025, NIS2, ISO 27001 και GDPR."
summary: "Μια διαδραστική 3D εικονική εταιρεία με τρία σενάρια επίθεσης: AiTM που καταλήγει σε απάτη BEC και ransomware, παραβιασμένος προμηθευτής, ευπάθεια στο VPN. Γυρνάς τον διακόπτη «Με / Χωρίς Defender» και βλέπεις σε ποιο βήμα κόβεται η αλυσίδα, ποιο προϊόν την κόβει και τι ζητούν η ΚΥΑ 1689/2025, η NIS2, το ISO 27001 και ο GDPR."
categories: ["Security Operations & XDR"]
# Τελευταίο άρθρο της σειράς: η σειρά ταξινομείται κατά ημερομηνία, άρα βγαίνει μετά το EMS (2/11/2026)
series: ["Microsoft Defender Up Close"]
ShowToc: true
TocOpen: false
weight: -7
cover:
  image: "/images/AttackChain/attack-chain-cover.webp"
  alt: "Η αλυσίδα μιας επίθεσης σε 3D μέσα σε εικονική εταιρεία, με τα προϊόντα του Microsoft Defender σε κάθε βήμα"
  caption: "Τρία σενάρια, ένα ερώτημα: πού κόβεται η αλυσίδα;"
  relative: false
ShowReadingTime: true
ShowWordCount: true
# Πλαίσιο «Last verified»: κάθε χαρακτηριστικό με τη φάση, την άδεια, την πηγή και την ημερομηνία ελέγχου
verification:
  - feature: "Automatic attack disruption (contain device, contain user, disable user, revoke session)"
    status: "Generally Available (η αυτόματη απομόνωση συσκευής είναι Preview)"
    license: "Microsoft 365 E5, E3 με Defender Suite ή EMS E5, ή ένα από MDE P2, MDI, MDCA, MDO P2, Defender for Business"
    source: "https://learn.microsoft.com/en-us/defender-xdr/configure-attack-disruption"
    verified: 2026-10-26
  - feature: "Automatic attack disruption στο Microsoft Defender for Business (ενεργή χωρίς ρύθμιση)"
    status: "Generally Available"
    license: "Microsoft Defender for Business (περιλαμβάνεται στο Microsoft 365 Business Premium)"
    source: "https://learn.microsoft.com/en-us/defender-business/mdb-attack-disruption"
    verified: 2026-10-26
  - feature: "Safe Links (έλεγχος τη στιγμή του κλικ)"
    status: "Generally Available"
    license: "Defender for Office 365 Plan 1 ή Plan 2"
    source: "https://learn.microsoft.com/en-us/defender-office-365/safe-links-about"
    verified: 2026-10-26
  - feature: "Safe Attachments (detonation σε sandbox)"
    status: "Generally Available"
    license: "Defender for Office 365 Plan 1 ή Plan 2"
    source: "https://learn.microsoft.com/en-us/defender-office-365/safe-attachments-about"
    verified: 2026-10-26
  - feature: "Zero-hour auto purge (ZAP)"
    status: "Generally Available"
    license: "Όλα τα cloud mailboxes (Exchange Online Protection)"
    source: "https://learn.microsoft.com/en-us/defender-office-365/zero-hour-auto-purge"
    verified: 2026-10-26
  - feature: "Mailbox intelligence: δεν ενεργεί όταν αποστολέας και παραλήπτης έχουν ξαναμιλήσει"
    status: "Generally Available"
    license: "Defender for Office 365 Plan 1 ή Plan 2"
    source: "https://learn.microsoft.com/en-us/defender-office-365/anti-phishing-policies-about"
    verified: 2026-10-26
  - feature: "Τεχνολογίες ανίχνευσης email, μεταξύ τους LLM content analysis και Mailbox intelligence impersonation"
    status: "Generally Available"
    license: "Defender for Office 365 Plan 1 ή Plan 2"
    source: "https://learn.microsoft.com/en-us/defender-office-365/threat-explorer-real-time-detections-about"
    verified: 2026-10-26
  - feature: "Entra ID Protection: ανίχνευση «Attacker in the Middle»"
    status: "Generally Available"
    license: "Microsoft 365 E5 με Enterprise Mobility + Security E5"
    source: "https://learn.microsoft.com/en-us/entra/id-protection/concept-identity-protection-risks"
    verified: 2026-10-26
  - feature: "Alerts «Stolen session cookie was used» και «Possible AiTM phishing attempt»"
    status: "Generally Available"
    license: "Defender for Cloud Apps με connector Office 365, Defender for Endpoint"
    source: "https://learn.microsoft.com/en-us/entra/identity/devices/protecting-tokens-microsoft-entra-id"
    verified: 2026-10-26
  - feature: "Ανίχνευση ύποπτων κανόνων inbox (dynamic threat detection model)"
    status: "Generally Available"
    license: "Defender for Cloud Apps"
    source: "https://learn.microsoft.com/en-us/defender-cloud-apps/anomaly-detection-policy"
    verified: 2026-10-26
  - feature: "Defender for Identity: alerts για pass-the-hash και DCSync"
    status: "Generally Available"
    license: "Defender for Identity (Microsoft 365 E5, EMS E5 ή standalone)"
    source: "https://learn.microsoft.com/en-us/defender-for-identity/alerts-xdr"
    verified: 2026-10-26
  - feature: "ASR rules και tamper protection"
    status: "Generally Available"
    license: "Defender for Endpoint Plan 1 ή Plan 2, Defender for Business"
    source: "https://learn.microsoft.com/en-us/defender-endpoint/attack-surface-reduction-rules-overview"
    verified: 2026-10-26
  - feature: "Authenticated network scans για firewalls και VPN gateways"
    status: "Generally Available"
    license: "Defender for Endpoint (Defender Vulnerability Management)"
    source: "https://learn.microsoft.com/en-us/defender-endpoint/network-devices"
    verified: 2026-10-26
  - feature: "Microsoft Sentinel στο Microsoft Defender portal"
    status: "Generally Available"
    license: "Microsoft Sentinel (χρέωση ανά όγκο δεδομένων στο Azure)"
    source: "https://learn.microsoft.com/en-us/azure/sentinel/microsoft-sentinel-defender-portal"
    verified: 2026-10-26
# MITRE ATT&CK®: ονόματα στο data/mitre.yaml
mitre: ["T1566.002", "T1566.001", "T1557", "T1539", "T1550.004", "T1078.004", "T1564.008", "T1114.003", "T1657", "T1534", "T1204.002", "T1550.002", "T1003.006", "T1003.001", "T1087.002", "T1685", "T1490", "T1486", "T1586.002", "T1199", "T1213.002", "T1530", "T1190", "T1133", "T1078", "T1021.001", "T1098"]
---

Ένα alert λέει τι συνέβη σε ένα σημείο. Μια επίθεση όμως είναι αλυσίδα: ένα email, ένα κλεμμένο session, ένας κανόνας στο inbox, ένας server, ένας Domain Controller. Αν δεν βλέπεις την αλυσίδα, δεν ξέρεις πού σε προστατεύει το κάθε προϊόν και πού μένεις ακάλυπτος.

Γι' αυτό έφτιαξα μια μικρή εικονική εταιρεία σε 3D, τη «MyCompany», και τρία σενάρια που αφορούν κάθε Ελληνική εταιρεία με Microsoft 365. Κάνε scroll στα βήματα ή πάτα τα βελάκια. Με τον διακόπτη **Χωρίς Defender / Με Defender** βλέπεις πού κόβεται η αλυσίδα και ποιο προϊόν την κόβει.

{{< attack-chain >}}

## Πώς το διαβάζεις

**Κόκκινο** είναι ο επιτιθέμενος και ό,τι έχει παραβιάσει. **Πορτοκαλί** είναι ό,τι εντοπίστηκε από το Microsoft Defender. Η **μπλε** γραμμή προς τα πάνω είναι το σήμα που φτάνει στο Microsoft Defender XDR, εκεί όπου όλα τα alerts γίνονται ένα incident.

Σε κάθε σενάριο ένα βήμα έχει την ένδειξη **«Εδώ κόβεται η αλυσίδα»**. Είναι το πρώτο σημείο όπου ένα σωστά ρυθμισμένο tenant σταματά την επίθεση. Τα επόμενα βήματα, με την ένδειξη **«Δεύτερη γραμμή άμυνας»**, δείχνουν τι πιάνει το Defender αν το πρώτο μέτρο αστοχήσει. Καμία ρύθμιση δεν είναι 100%, γι' αυτό μετράει η άμυνα σε βάθος.

Κάθε βήμα έχει τις τεχνικές του MITRE ATT&CK®, τις απαιτήσεις της ΚΥΑ 1689/2025, της NIS2, του ISO/IEC 27001 και του GDPR που καλύπτει, και, όπου υπάρχει, ένα ερώτημα KQL για να ελέγξεις το δικό σου tenant. Μπορείς να στείλεις σε κάποιον ένα συγκεκριμένο σενάριο με link, για παράδειγμα [#edge](#edge).

## Τι μαθαίνεις από τα τρία σενάρια

**AiTM → BEC → ransomware.** Το MFA μόνο του δεν αρκεί. Ένας reverse proxy κλέβει το session cookie μετά το MFA, και ο επιτιθέμενος μπαίνει στο mailbox χωρίς να ξαναρωτηθεί. Αυτό που κάνει το κλεμμένο cookie άχρηστο είναι το phishing-resistant MFA, δηλαδή τα passkeys, μαζί με Conditional Access που ζητά compliant device. Αν το cookie κλαπεί, η automatic attack disruption του Defender XDR ανακαλεί τα sessions και αναστέλλει τον χρήστη, χωρίς να περιμένει άνθρωπο.

**Παραβιασμένος προμηθευτής.** Εδώ φαίνονται τα όρια της τεχνολογίας. Ο αποστολέας είναι πραγματικός και έχεις ξαναμιλήσει μαζί του, οπότε το impersonation protection και το mailbox intelligence δεν βοηθούν. Το πρώτο email, με το μολυσμένο συνημμένο, το σταματά το Safe Attachments. Το δεύτερο όμως ζητά μόνο αλλαγή IBAN, χωρίς link ή συνημμένο, οπότε δεν υπάρχει κάτι κακόβουλο να μπλοκάρει. Η ανάλυση περιεχομένου του Defender for Office 365 μπορεί να το επισημάνει, αλλά δεν μπορείς να βασιστείς σε αυτό. Σε σώζει μια απλή διαδικασία: κάθε αλλαγή τραπεζικού λογαριασμού επιβεβαιώνεται τηλεφωνικά σε γνωστό αριθμό. Γι' αυτό το βήμα 1 και το βήμα 4 έχουν την ετικέτα «Διαδικασία, όχι προϊόν».

**Ευπάθεια σε VPN / firewall.** Δεν υπάρχει email και δεν υπάρχει χρήστης που «πάτησε κάτι». Η αλυσίδα κόβεται πριν ξεκινήσει, αν ξέρεις ότι η συσκευή σου είναι ευάλωτη. Τα authenticated network scans του Defender for Endpoint φέρνουν το firewall και το VPN gateway στο device inventory με τις ευπάθειές τους. Αν δεν το κάνεις, η πρώτη φορά που θα δεις τον επιτιθέμενο είναι όταν φτάσει στον Domain Controller.

## Τι χρειάζεσαι για να δουλέψει η automatic attack disruption

Η automatic attack disruption είναι το κοινό στοιχείο στα τρία σενάρια, αλλά δεν δουλεύει μόνο με την άδεια. Η Microsoft ζητά συγκεκριμένες ρυθμίσεις. Έλεγξε αυτά τα πέντε:

1. **Defender for Office 365:** στα mailboxes καταγράφονται τουλάχιστον τα events `MailItemsAccessed`, `UpdateInboxRules`, `MoveToDeletedItems`, `SoftDelete` και `HardDelete`.
2. **Defender for Cloud Apps:** ο connector του Microsoft 365 είναι συνδεδεμένος με όλα τα checkboxes επιλεγμένα, μαζί με τις εφαρμογές του Microsoft Entra ID.
3. **Defender for Identity:** υπάρχει sensor σε κάθε Domain Controller, το auditing των Windows events είναι ρυθμισμένο, και το action account έχει τα σωστά δικαιώματα.
4. **Defender for Endpoint:** το device discovery είναι σε **Standard discovery** και τα device groups έχουν remediation level **Full** ή τουλάχιστον **Semi**.
5. **Εξαιρέσεις:** αν έχεις συσκευές που δεν πρέπει να απομονωθούν ποτέ, όπως ένα SCADA HMI, όρισέ τες ως exclusions. Μην αφήσεις όλη την παραγωγή εκτός προστασίας για μία συσκευή.

Αν έχεις Microsoft 365 Business Premium, το Defender for Business έχει κι αυτό automatic attack disruption, χωρίς να χρειάζεται να το ενεργοποιήσεις.

## Η συμμόρφωση σε μία πρόταση

Ο ελεγκτής δεν θα σε ρωτήσει αν «έχεις Defender». Θα σε ρωτήσει πώς εντοπίζεις και περιορίζεις ένα περιστατικό και πώς το αναφέρεις στην ώρα του. Τα σενάρια αυτά είναι ένα έτοιμο υλικό για ασκήσεις tabletop: διάλεξε ένα, σταμάτα σε κάθε βήμα και ρώτα την ομάδα σου ποιος κάνει τι.

> 🔗 **Χρειάζεσαι τεκμηρίωση συμμόρφωσης;** Τα βήματα των σεναρίων στηρίζουν τις απαιτήσεις [13.ζ](/kya-1689-2025/#13-ζ), [17.γ](/kya-1689-2025/#17-γ), [20.α](/kya-1689-2025/#20-α), [20.γ](/kya-1689-2025/#20-γ), [24.α](/kya-1689-2025/#24-α) και [24.ε](/kya-1689-2025/#24-ε), όπως τις αναλύει ο **[οδηγός της ΚΥΑ 1689/2025](/kya-1689-2025/)**. Στον οδηγό για την **[Οδηγία NIS2](/nis2/)** αντιστοιχούν στα [21.2.β](/nis2/#21-2-β), [21.2.γ](/nis2/#21-2-γ), [21.2.δ](/nis2/#21-2-δ), [21.2.ε](/nis2/#21-2-ε), [21.2.ι](/nis2/#21-2-ι) και [23.4.α](/nis2/#23-4-α), στο **[ISO/IEC 27001](/iso-27001/)** στα [A.5.19](/iso-27001/#A-5-19), [A.5.24](/iso-27001/#A-5-24), [A.5.26](/iso-27001/#A-5-26), [A.8.7](/iso-27001/#A-8-7), [A.8.8](/iso-27001/#A-8-8) και [A.8.16](/iso-27001/#A-8-16), και στον **[GDPR](/gdpr/)** στα [32.1.β](/gdpr/#32-1-β), [32.1.γ](/gdpr/#32-1-γ) και [33.1](/gdpr/#33-1). Ο καθένας έχει checklist σε Excel: [ΚΥΑ 1689/2025](/downloads/nis2-kya-1689-2025-microsoft-365-checklist.xlsx), [NIS2](/downloads/nis2-directive-2022-2555-microsoft-365-checklist.xlsx), [ISO 27001](/downloads/iso-27001-2022-annex-a-microsoft-365-checklist.xlsx), [GDPR](/downloads/gdpr-2016-679-microsoft-365-checklist.xlsx).

{{< tool-link page="/axiologisi-promitheyti" lead="Για το σενάριο του προμηθευτή:" label="φτιάξε ερωτηματολόγιο ασφάλειας για τον προμηθευτή σου" tail="με βάση το άρθρο 21.2.δ της NIS2." >}}

{{< tool-link page="/kev-microsoft" lead="Για το σενάριο του VPN:" label="δες ποιες ευπάθειες αξιοποιούνται ενεργά τώρα" tail="στον κατάλογο CISA KEV." >}}

{{< tool-link page="/anafora-peristatikou" lead="Όταν η αλυσίδα δεν κοπεί:" label="ετοίμασε την αναφορά περιστατικού των 24 και 72 ωρών" tail="στα έντυπα της ΕΑΚ." >}}

## Πού να συνεχίσεις από εδώ

> 🔗 **Αυτό είναι το τελευταίο άρθρο της σειράς Microsoft Defender Up Close.** Αν θέλεις να δεις κάθε προϊόν αναλυτικά, διάβασε τα προηγούμενα: **[Microsoft Defender for Endpoint](/posts/microsoft-defender-up-close-series/microsoft-defender-for-endpoint-deep-dive/)**, **[Microsoft Defender for Office 365](/posts/microsoft-defender-up-close-series/microsoft-defender-for-office-365-deep-dive/)**, **[Microsoft Defender for Identity](/posts/microsoft-defender-up-close-series/microsoft-defender-for-identity-deep-dive/)** **[Microsoft Defender for Cloud Apps](/posts/microsoft-defender-up-close-series/microsoft-defender-for-cloud-apps-deep-dive/)** και **[Enterprise Mobility + Security](/posts/microsoft-defender-up-close-series/enterprise-mobility-security-explained/)**, όλα στη **[σελίδα της σειράς](/series/microsoft-defender-up-close/)**.

> 🔗 **Θέλεις να ελέγξεις τους χρήστες σου;** Δοκίμασε το **[κουίζ phishing](/kouiz-phishing/)** και τρέξε τα ερωτήματα της **[βιβλιοθήκης KQL](/kql/)** στο δικό σου tenant.

Ακολούθησέ με στο [LinkedIn](https://www.linkedin.com/in/dimosthenisatteia/) για ειδοποιήσεις νέων άρθρων.

## Πηγές και επαλήθευση {#last-verified}

{{< verification >}}

Τα σενάρια είναι κατασκευασμένα για εκπαιδευτικό σκοπό. Η εταιρεία «MyCompany» και οι ρόλοι της δεν αντιστοιχούν σε πραγματικό οργανισμό. Οι τεχνικές του MITRE ATT&CK® προέρχονται από την έκδοση v20. Η λειτουργία κάθε προϊόντος εξαρτάται από την άδεια και τις ρυθμίσεις του tenant σου.
