---
title: "Microsoft Defender for Endpoint: Τι είναι, τι κάνει και πώς να το αναπτύξετε στην πράξη"
date: 2026-09-28T09:11:00+03:00
lastmod: 2026-09-28T18:45:00+03:00
draft: true
keywords:
  - Microsoft Defender for Endpoint
  - Microsoft Defender for Endpoint οδηγός
  - Defender for Endpoint Plan 1 vs Plan 2
  - Διαφορές Defender for Endpoint Plan 1 και Plan 2
  - Onboarding συσκευών στο Microsoft Defender for Endpoint
  - Defender for Endpoint Intune integration
  - Attack Surface Reduction rules Audit mode
  - Tamper protection Microsoft Defender
  - Automated Investigation and Remediation Defender for Endpoint
  - EDR Microsoft 365 E5
tags:
  - Microsoft Defender for Endpoint
  - Microsoft Defender XDR
  - Endpoint Security
  - EDR
  - Attack Surface Reduction
  - Microsoft Intune
  - Microsoft 365 Security
author: "Dimosthenis Atteia"
description: "Πρακτικός οδηγός για το Microsoft Defender for Endpoint: Plan 1 vs Plan 2, onboarding συσκευών και οι ρυθμίσεις που μετράνε την πρώτη εβδομάδα."
summary: "Το Microsoft Defender for Endpoint όπως το χρειάζεται ένας επαγγελματίας στην πράξη. Plan 1 και Plan 2 δίπλα-δίπλα, τι κάνει το καθένα, πώς λειτουργεί το onboarding σε Windows, macOS, Linux, iOS και Android, και οι ρυθμίσεις του Defender portal που πρέπει να ελέγξετε την πρώτη εβδομάδα."
categories: ["Microsoft Defender", "Endpoint Security"]
series: ["Microsoft Defender Up Close"]
slug: 
ShowToc: true
TocOpen: false
weight: -6
cover:
  image: "/images/MDE/MDE.png"
  alt: "Microsoft Defender for Endpoint, αναλυτικός οδηγός"
  caption: "Microsoft Defender Up Close"
  relative: true
ShowReadingTime: true
ShowWordCount: true
---

## Σε ποιον απευθύνεται αυτό το άρθρο

Αν διαβάσατε το **[2ο μέρος της σειράς Defender Demystified](/posts/Defender-Demystified-Series/defender-demystified-part-2-four-workloads/)**, γνωρίζετε ήδη σε υψηλό επίπεδο τι είναι το Microsoft Defender for Endpoint. Είναι το workload της οικογένειας Microsoft Defender που παρακολουθεί τις συσκευές στις οποίες οι χρήστες σας κάνουν πραγματικά τη δουλειά τους.

Αυτό το άρθρο είναι η συνέχεια για τον επαγγελματία που τώρα πρέπει να κάνει κάτι με αυτό: να επιλέξει plan, να κάνει onboarding τις συσκευές και να ρυθμίσει το πρώτο σύνολο ρυθμίσεων που έχουν πραγματική σημασία. Απλό, πρακτικό, χωρίς την ψευδαίσθηση ότι θα τα αφομοιώσετε όλα από την πρώτη μέρα. Δεν θα γίνει. Σε κανέναν δεν γίνεται.

## Τι κάνει πραγματικά το Microsoft Defender for Endpoint

Το **[Microsoft Defender for Endpoint](https://learn.microsoft.com/en-us/defender-endpoint/microsoft-defender-endpoint)** είναι μια enterprise πλατφόρμα προστασίας τερματικών που συνδυάζει δυνατότητες τις οποίες οι περισσότεροι οργανισμοί αγόραζαν παλαιότερα από διαφορετικούς κατασκευαστές:

- **Next-generation antivirus**: προστασία σε πραγματικό χρόνο που πιάνει ό,τι ξεφεύγει από το antivirus βασισμένο σε signatures
- **Endpoint Detection and Response (EDR)**: συμπεριφορική παρακολούθηση που εντοπίζει επιθέσεις ενώ βρίσκονται σε εξέλιξη, όχι μόνο γνωστά κακόβουλα αρχεία
- **Attack Surface Reduction (ASR)**: κανόνες που μπλοκάρουν συνηθισμένα μοτίβα επίθεσης (κακόβουλα macros, κλοπή διαπιστευτηρίων, ύποπτα scripts)
- **Automated Investigation and Remediation (AIR)**: η πλατφόρμα αναλαμβάνει για λογαριασμό σας το πρώτο κομμάτι του SOC triage
- **Microsoft Defender Vulnerability Management (MDVM)**: παρακολούθηση CVE, απογραφή λογισμικού και ιεράρχηση αποκατάστασης σε όλο τον στόλο συσκευών

Όλα αυτά τρέχουν πάνω στον ίδιο agent που είναι ήδη ενσωματωμένος σε κάθε σύγχρονη συσκευή Windows, το **Microsoft Defender Antivirus**. Το Defender for Endpoint είναι ο εγκέφαλος, το antivirus είναι το σώμα.

## Plan 1 vs Plan 2, η απόφαση που μετράει περισσότερο

Η Microsoft πουλάει το Defender for Endpoint σε δύο επίπεδα, και η διαφορά μεταξύ τους είναι εκεί που κρίνεται το μεγαλύτερο μέρος της συζήτησης κόστους-οφέλους.

Το **[Microsoft Defender for Endpoint Plan 1](https://learn.microsoft.com/en-us/defender-endpoint/defender-endpoint-plan-1)** είναι το **προληπτικό** επίπεδο. Περιλαμβάνει:

- Next-generation antivirus
- Attack surface reduction rules
- Σήματα συσκευής για Conditional Access
- Χειροκίνητες ενέργειες απόκρισης (απομόνωση συσκευής, εκτέλεση σάρωσης antivirus)
- Βασικές αναφορές

Το Plan 1 περιλαμβάνεται στο **Microsoft 365 E3** και διατίθεται και αυτόνομα.

Το **[Microsoft Defender for Endpoint Plan 2](https://learn.microsoft.com/en-us/defender-endpoint/microsoft-defender-endpoint)** είναι το επίπεδο **ανίχνευσης και απόκρισης**. Περιλαμβάνει όλα όσα έχει το Plan 1, και επιπλέον:

- Πλήρες Endpoint Detection and Response (EDR) με behavioural analytics
- Automated Investigation and Remediation
- Advanced hunting με KQL
- Ενσωματωμένο **Microsoft Defender Vulnerability Management**
- Αναφορές Threat analytics αντιστοιχισμένες στο tenant σας
- **Endpoint Attack Notifications** (ειδοποιήσεις για στοχευμένες επιθέσεις, το παλαιότερο Microsoft Threat Experts)

Το Plan 2 είναι αυτό που χρειάζεστε για οποιαδήποτε πραγματική λειτουργία ασφάλειας, και περιλαμβάνεται στο **Microsoft 365 E5** ή ως μέρος του add-on **Microsoft Defender Suite**.

Η ειλικρινής εκδοχή: αν ο ρόλος σας περιλαμβάνει το «ανιχνεύω και αποκρίνομαι σε επιθέσεις», χρειάζεστε Plan 2. Το Plan 1 αρκεί για μικρότερους οργανισμούς με προσέγγιση «προλαμβάνω και ελπίζω για το καλύτερο», αλλά όποιος έχει ένα ουσιαστικό μητρώο κινδύνων (risk register) το ξεπερνά γρήγορα.

## Ποιες συσκευές προστατεύει

Το Microsoft Defender for Endpoint λειτουργεί σε:

- **Windows**: 10, 11, Server 2012 R2 έως Server 2025
- **macOS**: τρέχουσα και προηγούμενη major έκδοση
- **Linux**: Red Hat, Ubuntu, CentOS, SUSE, Debian, Oracle, Amazon Linux
- **iOS**: μέσω της εφαρμογής Microsoft Defender για κινητά
- **Android**: μέσω της εφαρμογής Microsoft Defender για κινητά

Η υποστήριξη για Windows και Windows Server είναι η πιο ώριμη. Η υποστήριξη για Linux και macOS είναι σταθερή και έχει βελτιωθεί θεαματικά τα τελευταία δύο χρόνια. Στα κινητά η εμπειρία είναι εντελώς διαφορετική, αφορά περισσότερο την προστασία σε επίπεδο δικτύου και τον εντοπισμό jailbreak/root παρά πλήρες EDR.

## Πώς να κάνετε onboarding τις συσκευές σας στην πράξη

Το onboarding είναι το σημείο όπου κολλάνε οι περισσότερες νέες υλοποιήσεις, οπότε ας το κάνουμε συγκεκριμένο.

**Για συσκευές Windows που διαχειρίζεται το Microsoft Intune:**

[![Ο διακόπτης Microsoft Intune connection στο Defender portal](/images/Microsoft-Defender/01-intune-connection-advanced-features.webp)](/images/Microsoft-Defender/01-intune-connection-advanced-features.webp)
📷 **Εικόνα 1**: Ρύθμιση του Intune connector στο Defender portal. Defender portal → Settings → Endpoints → Optional features.

1. Στο **Microsoft Defender portal** (`security.microsoft.com`), μεταβείτε στο **Settings → Endpoints → Optional features** και ενεργοποιήστε το **Microsoft Intune connection**.
2. Στο **Microsoft Intune admin center**, μεταβείτε στο **Endpoint security → Microsoft Defender for Endpoint** και ενεργοποιήστε τη σύνδεση.
3. Δημιουργήστε μια **Endpoint Detection and Response policy** στο Intune και αναθέστε τη στις ομάδες συσκευών σας.

Οι συσκευές κάνουν αυτόματα onboarding μέσα σε λίγες ώρες. Χωρίς scripts, χωρίς offline πακέτα, χωρίς χειροκίνητες εκτελέσεις.

**Για συσκευές Windows που διαχειρίζεται το Configuration Manager (SCCM):**

Διαφορετική ροή, μέσω του co-management setup. Ο [οδηγός onboarding για Configuration Manager](https://learn.microsoft.com/en-us/defender-endpoint/configure-endpoints-sccm) της Microsoft είναι η επίσημη αναφορά.

**Για μη διαχειριζόμενες συσκευές Windows:**

Κατεβάστε το onboarding script από το **Settings → Endpoints → Onboarding** και εκτελέστε το ως διαχειριστής σε κάθε συσκευή. Εντάξει για λίγες συσκευές, επώδυνο σε κλίμακα.

**Για macOS και Linux:**

Εγκαταστήστε τον agent του Microsoft Defender for Endpoint μέσω του εργαλείου διαχείρισης που ήδη χρησιμοποιείτε (Jamf για macOS, ενώ για Linux υποστηρίζονται τα Ansible, Puppet και Chef). Η Microsoft δημοσιεύει τα πακέτα και το configuration JSON.

**Για iOS και Android:**

Οι χρήστες εγκαθιστούν την εφαρμογή **Microsoft Defender** από το αντίστοιχο app store και συνδέονται με τον εταιρικό τους λογαριασμό. Οι Intune app protection policies μπορούν να επιβάλουν την εγκατάσταση.

[![Απογραφή συσκευών στο Microsoft Defender portal μετά το onboarding](/images/Microsoft-Defender/02-device-inventory.webp)](/images/Microsoft-Defender/02-device-inventory.webp)
📷 **Εικόνα 2**: Απογραφή συσκευών μετά το onboarding. Defender portal → Assets → Devices.


## Τι να ρυθμίσετε την πρώτη εβδομάδα

Μην προσπαθήσετε να ρυθμίσετε τα πάντα. Εστιάστε σε αυτά:

**1. Βασικές πολιτικές ασφάλειας (security baselines)**

[![Το Microsoft Defender for Endpoint security baseline στο Intune](/images/Microsoft-Defender/03-intune-security-baselines.webp)](/images/Microsoft-Defender/03-intune-security-baselines.webp)
📷 **Εικόνα 3**: Security baselines στο Intune. Intune admin center → Endpoint security → Security baselines → Microsoft Defender for Endpoint baseline.


Η Microsoft παρέχει ένα security baseline με σαφείς επιλογές για το Defender for Endpoint. Αναπτύξτε το πρώτα σε μια πιλοτική ομάδα. Ελέγξτε τι αλλάζει. Επεκτείνετε.

**2. Attack Surface Reduction rules**

Οι κανόνες ASR μπλοκάρουν συνηθισμένα μοτίβα επίθεσης, πράγματα όπως «μην επιτρέπεις στις εφαρμογές Office να εκκινούν child processes» και «μην επιτρέπεις σε scripts να φορτώνουν περιεχόμενο που έχει ληφθεί από το διαδίκτυο». Σήμερα υπάρχουν 19 κανόνες, από τους οποίους τρεις ανήκουν στην ομάδα **Standard protection** που η Microsoft προτείνει να ενεργοποιηθεί πρώτη. Μην τους ενεργοποιήσετε όλους μαζί σε Block mode. Ξεκινήστε σε **Audit mode** για δύο εβδομάδες, εξετάστε τι θα είχε μπλοκαριστεί και μετά περάστε σε Block όσους δεν σπάνε νόμιμες εργασίες.

[![Αναφορά Attack Surface Reduction rules σε Audit mode](/images/Microsoft-Defender/04-asr-rules-report.webp)](/images/Microsoft-Defender/04-asr-rules-report.webp)
📷 **Εικόνα 4**: Αναφορά Attack Surface Reduction rules στο Defender portal. Defender portal → ASR rules report.


**3. Web content filtering**

Μπλοκάρετε τις κατηγορίες που η πολιτική αποδεκτής χρήσης (acceptable-use policy) δεν επιτρέπει (τυχερά παιχνίδια, περιεχόμενο ενηλίκων, malware domains, πρόσφατα καταχωρημένα domains). Πέντε λεπτά ρύθμισης, άμεση μείωση κινδύνου.

**4. Tamper protection**

[![Ο διακόπτης Tamper protection στο Defender portal](/images/Microsoft-Defender/05-tamper-protection.webp)](/images/Microsoft-Defender/05-tamper-protection.webp)
📷 **Εικόνα 5**: Ρύθμιση Tamper protection. Defender portal → Settings → Endpoints → Optional features → διακόπτης Tamper protection.


Ενεργοποιήστε το. Εμποδίζει τους επιτιθέμενους (και τους «εξυπηρετικούς» χρήστες) από το να απενεργοποιήσουν το Microsoft Defender Antivirus μέσω registry, PowerShell ή Group Policy. Δεν υπάρχει κανένας λόγος να μην το ενεργοποιήσετε.

**5. Automated investigation**

Στο Plan 2, το **Automated Investigation and Remediation (AIR)** μπορεί να ρυθμιστεί ώστε να κάνει αυτόματη αποκατάσταση από το **Settings → Endpoints → Automation levels** του Defender portal. Ξεκινήστε με «Semi - require approval for any remediation» για δύο εβδομάδες και μετά περάστε σε «Full - remediate threats automatically» μόλις εμπιστευτείτε την κρίση της πλατφόρμας.

## Ένα ρεαλιστικό πλάνο για τον πρώτο μήνα

- **Εβδομάδα 1**: Onboarding μιας πιλοτικής ομάδας (10–20 συσκευές), ανάπτυξη του security baseline, ενεργοποίηση tamper protection και web content filtering.
- **Εβδομάδα 2**: Ενεργοποίηση των κανόνων ASR σε Audit mode. Αρχίστε να διαβάζετε τα events που προκύπτουν.
- **Εβδομάδα 3**: Onboarding του υπόλοιπου στόλου σε κύματα. Μεταφορά των πρώτων κανόνων ASR σε Block.
- **Εβδομάδα 4**: Ανασκόπηση Threat Analytics, ρύθμιση του Automated Investigation σε Semi mode, προγραμματισμός μηνιαίας ανασκόπησης.

Στο τέλος του πρώτου μήνα έχετε μια λειτουργική υλοποίηση του Microsoft Defender for Endpoint, με telemetry να ρέει στο Microsoft Defender portal, τη βάση δηλαδή πάνω στην οποία μπορεί πλέον να χτιστεί όλη η υπόλοιπη στοίβα ασφάλειάς σας.

## Πού να συνεχίσετε από εδώ

> 🔗 **Διαβάστε την υπόλοιπη σειρά Microsoft Defender Up Close** για τα «αδελφά» workloads: **[Microsoft Defender for Office 365](/posts/microsoft-defender-for-office-365-deep-dive/)**, **[Microsoft Defender for Identity](/posts/microsoft-defender-for-identity-deep-dive/)**, **[Microsoft Defender for Cloud Apps](/posts/microsoft-defender-for-cloud-apps-deep-dive/)**.

> 🔗 **Θέλετε να δείτε πώς όλα αυτά τροφοδοτούν την τεκμηρίωση συμμόρφωσης;** Διαβάστε το **[How We Built a Gold-Winning GRC Programme on Microsoft Secure Score](/posts/secure-score-grc-part-0-intro/)**.

Ακολουθήστε με στο [LinkedIn](https://www.linkedin.com/in/dimosthenisatteia/) για ειδοποιήσεις νέων άρθρων.

## Πηγές Microsoft Learn

- [Microsoft Defender for Endpoint, επισκόπηση](https://learn.microsoft.com/en-us/defender-endpoint/microsoft-defender-endpoint)
- [Onboarding συσκευών στο Microsoft Defender for Endpoint](https://learn.microsoft.com/en-us/defender-endpoint/onboard-configure)
- [Attack surface reduction rules (αναφορά)](https://learn.microsoft.com/en-us/defender-endpoint/attack-surface-reduction-rules-reference)
- [Microsoft Defender Vulnerability Management](https://learn.microsoft.com/en-us/defender-vulnerability-management/defender-vulnerability-management)
- [Security baselines για το Microsoft Defender for Endpoint](https://learn.microsoft.com/en-us/defender-endpoint/configure-machines-security-baseline)

---

<!--
IMAGE NOTES
Image 1: Defender portal → Settings → Endpoints → Advanced features → Microsoft Intune connection toggle
Image 2: Defender portal → Assets → Devices (populated inventory, redact names)
Image 3: Intune admin center → Endpoint security → Security baselines → MDE baseline
Image 4: Defender portal → ASR rules report
Image 5: Defender portal → Settings → Endpoints → Advanced features → Tamper protection
Save to /static/images/posts/microsoft-defender-for-endpoint-deep-dive/
-->
