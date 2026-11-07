---
title: "Enterprise Mobility + Security: E3 και E5, και πότε αξίζει πραγματικά να το αγοράσεις"
seoTitle: "Enterprise Mobility + Security: EMS E3 vs E5, πότε αξίζει"
slug: enterprise-mobility-security-explained
date: 2026-11-07T12:10:00+02:00
lastmod: 2026-11-07T12:10:00+02:00
draft: false
keywords:
  - Enterprise Mobility + Security
  - EMS E3 vs EMS E5
  - Διαφορές EMS E3 και EMS E5
  - Microsoft EMS αδειοδότηση
  - EMS vs Microsoft 365 E3 E5 E7
  - Πότε να αγοράσω EMS
  - EMS με Google Workspace
  - Microsoft Entra ID P1 P2 Intune EMS
  - Microsoft licensing οδηγός
  - Microsoft 365 Business Premium vs EMS
tags:
  - Enterprise Mobility + Security
  - Microsoft 365 Licensing
  - Microsoft Entra ID
  - Microsoft Intune
  - Microsoft Purview
  - Microsoft 365 Security
  - NIS2
  - ISO 27001
author: "Dimosthenis Atteia"
description: "Enterprise Mobility + Security με απλά λόγια: τι περιέχουν τα EMS E3 και E5, πώς σχετίζονται με το Microsoft 365 και πότε αξίζει πραγματικά να τα αγοράσεις."
seoDescription: "EMS E3 και E5 με απλά λόγια: Entra ID P1/P2, Intune Plan 1 και Plan 2, Purview, Defender for Identity και Cloud Apps, και πότε αξίζουν σε σχέση με το Microsoft 365."
summary: "Το Enterprise Mobility + Security με απλά λόγια. EMS E3 και EMS E5 δίπλα-δίπλα: διαχείριση ταυτοτήτων και πρόσβασης, διαχείριση τερματικών, προστασία πληροφοριών, ασφάλεια με βάση την ταυτότητα. Πότε το πακέτο EMS είναι η σωστή επιλογή σε σύγκριση με το Microsoft 365 E3, E5 ή E7."
categories: ["GRC & Compliance"]
series: ["Microsoft Defender Up Close"]
ShowToc: true
TocOpen: false
weight: -6
homeHighlight: true
cover:
  image: "/images/MDE/EMS.png"
  alt: "Enterprise Mobility + Security, E3 και E5"
  caption: "Microsoft Defender Up Close"
  relative: false
ShowReadingTime: true
ShowWordCount: true
# Πλαίσιο «Last verified»: κάθε χαρακτηριστικό με τη φάση, την άδεια, την πηγή και την ημερομηνία ελέγχου
verification:
  - feature: "EMS E3 και EMS E5 (τιμές και περιεχόμενο)"
    status: "Generally Available"
    license: "EMS E3 $12 / EMS E5 $18 ανά χρήστη/μήνα"
    source: "https://www.microsoft.com/en-us/microsoft-365/enterprise-mobility-security/compare-plans-and-pricing"
    verified: 2026-11-07
  - feature: "Intune Plan 2, Remote Help, Advanced Analytics στα EMS E3/E5 (από 1/7/2026)"
    status: "Generally Available"
    license: "EMS E3 ή EMS E5"
    source: "https://www.microsoft.com/en-us/microsoft-365/enterprise-mobility-security/compare-plans-and-pricing"
    verified: 2026-11-07
  - feature: "Microsoft 365 E3, E5 και E7 (τιμές και περιεχόμενο)"
    status: "Generally Available"
    license: "E3 $39 / E5 $60 / E7 $99 ανά χρήστη/μήνα"
    source: "https://www.microsoft.com/en-us/microsoft-365/enterprise/microsoft-365-plans-and-pricing"
    verified: 2026-11-07
  - feature: "Microsoft Entra ID P1 και P2 (PIM, risk-based Conditional Access)"
    status: "Generally Available"
    license: "Entra ID P1 / P2"
    source: "https://learn.microsoft.com/en-us/entra/fundamentals/licensing"
    verified: 2026-11-07
  - feature: "Microsoft Intune Plan 1 και Plan 2"
    status: "Generally Available"
    license: "Intune Plan 1 / Plan 2"
    source: "https://learn.microsoft.com/en-us/intune/fundamentals/licensing"
    verified: 2026-11-07
  - feature: "Microsoft Purview Information Protection"
    status: "Generally Available"
    license: "EMS E3 (μερικώς) ή EMS E5"
    source: "https://learn.microsoft.com/en-us/purview/information-protection"
    verified: 2026-11-07
# MITRE ATT&CK®: ονόματα στο data/mitre.yaml
mitre: ["T1078.004", "M1032", "M1026", "M1041"]
---

> ⚠️ **Σημείωση για τις τιμές:** Οι τιμές που αναφέρονται παρακάτω είναι τιμές καταλόγου σε USD, με ετήσια δέσμευση, από τις επίσημες σελίδες τιμών της Microsoft για το [Enterprise Mobility + Security](https://www.microsoft.com/en-us/microsoft-365/enterprise-mobility-security/compare-plans-and-pricing) και το [Microsoft 365 Enterprise](https://www.microsoft.com/en-us/microsoft-365/enterprise/microsoft-365-plans-and-pricing), όπως επαληθεύτηκαν τον Νοέμβριο του 2026. Οι τοπικές τιμές διαφέρουν ανά περιοχή (στην Εικόνα 3 θα δεις τιμές σε ευρώ). Επιβεβαίωνε πάντα τις τρέχουσες τιμές με τον licensing partner σου πριν δεσμευτείς.

## Γιατί γράφτηκε αυτό το άρθρο

Αν ασχολείσαι με την αδειοδότηση της Microsoft έστω και για λίγο, έχεις δει τη φράση **Enterprise Mobility + Security (EMS)** σε προτάσεις, προσφορές ή παλιά συμβόλαια. Μπερδεύει τον κόσμο. Είναι το ίδιο με το Microsoft 365 E3; Είναι υποσύνολό του; Υπερσύνολο; Το μετονόμασε η Microsoft σε κάτι άλλο; Το χρειάζομαι αν έχω ήδη Microsoft 365 E5;

Οι σύντομες απαντήσεις: είναι διαφορετικό από το Microsoft 365, εξακολουθεί να πωλείται, κανείς δεν το μετονόμασε, και το αν το χρειάζεσαι εξαρτάται από το τι έχεις ήδη. Αυτό το άρθρο είναι ο ξεκάθαρος οδηγός που θα ήθελα να μου είχε δώσει κάποιος την πρώτη φορά που προσγειώθηκε στο γραφείο μου μια προσφορά με γραμμή «EMS E5».

## Τι είναι πραγματικά το EMS

Το **[Enterprise Mobility + Security](https://www.microsoft.com/en-us/licensing/product-licensing/enterprise-mobility-security)** είναι το πακέτο **ταυτότητας + διαχείρισης + προστασίας** της Microsoft. Προηγήθηκε της σουίτας Microsoft 365 και εξακολουθεί να πωλείται ενεργά, επειδή λύνει ένα συγκεκριμένο πρόβλημα: οργανισμούς που έχουν ήδη εργαλεία παραγωγικότητας τα οποία δεν θέλουν να αλλάξουν (Google Workspace ή την υπάρχουσα αδειοδότηση Office), αλλά θέλουν από πάνω την ταυτότητα, τη διαχείριση συσκευών και την προστασία πληροφοριών της Microsoft.

Με άλλα λόγια: το EMS απευθύνεται σε οργανισμούς που θέλουν **το επίπεδο ασφάλειας και διαχείρισης του Microsoft 365 χωρίς τις εφαρμογές παραγωγικότητας του Microsoft 365**.

Το πακέτο διατίθεται σε δύο επίπεδα, E3 και E5, κατ' αντιστοιχία με τη δομή του Microsoft 365. Οι τιμές τη στιγμή που γράφονται αυτές οι γραμμές είναι **EMS E3 στα $12.00/χρήστη/μήνα** και **EMS E5 στα $18.00/χρήστη/μήνα**. Και τα δύο είναι σημαντικά φθηνότερα από τα αντίστοιχα Microsoft 365 (E3 στα $39, E5 στα $60), επειδή δεν πληρώνεις για Word, Excel, Teams ή SharePoint.

## Τι περιλαμβάνει το EMS E3

Το EMS E3 καλύπτει τέσσερις τομείς δυνατοτήτων:

### Διαχείριση ταυτοτήτων και πρόσβασης (Identity and access management)

- **Microsoft Entra ID P1**: η βάση της ταυτότητας
- **Απλοποιημένη διαχείριση πρόσβασης και ασφάλεια**: self-service password reset, πρόσβαση βάσει ομάδων
- **Multifactor authentication**: επιβολή MFA σε όλες τις cloud εφαρμογές
- **Conditional Access**: πολιτικές πρόσβασης βάσει πλαισίου
- **Advanced security reporting**: sign-in και audit logs σχετικά με ταυτότητες
- **Windows Server CAL**: κάλυψη Client Access License για πρόσβαση σε on-premises Windows Server

### Διαχείριση τερματικών (Endpoint management)

- **Microsoft Intune Plan 1**: διαχείριση κινητών συσκευών (MDM) και εφαρμογών (MAM) σε Windows, iOS, Android, macOS
- **Microsoft Intune Plan 2**: Microsoft Tunnel για MAM, διαχείριση εξειδικευμένων συσκευών (specialty devices) και firmware-over-the-air updates
- **Remote Help**: ασφαλείς συνεδρίες helpdesk προς τους χρήστες
- **Advanced Analytics**: προληπτικός εντοπισμός προβλημάτων στις συσκευές
- **Mobile application management**: προστασία εταιρικών δεδομένων μέσα στις εφαρμογές χωρίς πλήρη εγγραφή της συσκευής
- **Integrated PC management** και **integrated on-premises management** (σενάρια co-management με το Configuration Manager)

Τα Intune Plan 2, Remote Help και Advanced Analytics περιλαμβάνονται στα EMS E3 και E5 χωρίς επιπλέον κόστος από την **1η Ιουλίου 2026**. Οι πιο προχωρημένες δυνατότητες του Microsoft Intune Suite (Endpoint Privilege Management, Cloud PKI, Enterprise App Management) **δεν** περιλαμβάνονται στο EMS. Τις παίρνεις με το Microsoft 365 E5 ή ως add-ons.

### Προστασία πληροφοριών (μερική)

- **Persistent data protection**: Microsoft Purview Information Protection σε επίπεδο ταξινόμησης και ετικετών
- **Document tracking and revocation**
- **Διαχείριση κλειδιών κρυπτογράφησης** ανάλογα με τις κανονιστικές απαιτήσεις

### Ασφάλεια με βάση την ταυτότητα (μερική)

- **Microsoft Advanced Threat Analytics (ATA)**: παλαιό on-premises προϊόν. Η εκτεταμένη υποστήριξή του έληξε τον Ιανουάριο του 2026, οπότε μην το βάλεις σε νέο σχεδιασμό. Ο σύγχρονος αντικαταστάτης του είναι το Microsoft Defender for Identity, που περιλαμβάνεται στο E5.

[![Πίνακας σύγκρισης EMS E3 και EMS E5](/images/Microsoft-Defender/ems-01-pricing-comparison.webp)](/images/Microsoft-Defender/ems-01-pricing-comparison.webp)
> 📷 **Εικόνα 1:** Ο πίνακας σύγκρισης EMS E3 και EMS E5, με τις τιμές και τους τέσσερις τομείς. Σελίδα τιμών Enterprise Mobility + Security της Microsoft.

## Τι προσθέτει το E5

Το EMS E5 περιλαμβάνει όλα όσα έχει το E3, και επιπλέον ουσιαστικές αναβαθμίσεις σε τρεις τομείς:

### Διαχείριση ταυτοτήτων και πρόσβασης: αναβαθμίσεις E5

- **Microsoft Entra ID P2**: το πλήρες σύνολο δυνατοτήτων ταυτότητας, όχι μόνο το P1
- **Risk-based Conditional Access**: η μηχανή πολιτικών μπορεί πλέον να λαμβάνει υπόψη το sign-in risk και το user risk
- **Privileged Identity Management (PIM)**: just-in-time αναβάθμιση δικαιωμάτων για ρόλους διαχειριστή, με ροές έγκρισης και audit trails

### Προστασία πληροφοριών: αναβαθμίσεις E5

- **Intelligent data classification and labelling**: αυτόματες προτάσεις sensitivity labels βάσει της σάρωσης περιεχομένου του Microsoft Purview

### Ασφάλεια με βάση την ταυτότητα: αναβαθμίσεις E5

- **Microsoft Defender for Cloud Apps**: το πλήρες CASB, όπως το καλύψαμε στον [αναλυτικό οδηγό για το Microsoft Defender for Cloud Apps](/posts/microsoft-defender-up-close-series/microsoft-defender-for-cloud-apps-deep-dive/)
- **Microsoft Defender for Identity**: το προϊόν ανίχνευσης απειλών ταυτότητας, όπως το καλύψαμε στον [αναλυτικό οδηγό για το Microsoft Defender for Identity](/posts/microsoft-defender-up-close-series/microsoft-defender-for-identity-deep-dive/)

Το πέρασμα από το EMS E3 στο EMS E5 είναι το πέρασμα από το *«διαχειριζόμαστε ταυτότητες και συσκευές»* στο *«διαχειριζόμαστε ταυτότητες και συσκευές **και** έχουμε ανίχνευση απειλών ταυτότητας, ασφάλεια SaaS και πολιτικές που λαμβάνουν υπόψη τον κίνδυνο»*.

Να σημειωθεί ότι το EMS E5 **δεν** περιλαμβάνει Microsoft Defender for Endpoint ούτε Microsoft Defender for Office 365. Αυτά έρχονται με τα Microsoft 365 E3/E5 ή ως ξεχωριστά προϊόντα.

## Πού τοποθετείται το EMS σε σχέση με το Microsoft 365

Αυτό είναι το σημείο που μπερδεύει τους περισσότερους. Η σχέση είναι η εξής:

- **Microsoft 365 E3** ($39) = εφαρμογές παραγωγικότητας της Microsoft + Windows 11 Enterprise + **το επίπεδο του EMS E3** + βασικό Defender (MDE Plan 1, MDO Plan 1)
- **Microsoft 365 E5** ($60) = εφαρμογές παραγωγικότητας της Microsoft + Windows 11 Enterprise + **το επίπεδο του EMS E5** + πλήρης στοίβα Defender (MDE Plan 2, MDO Plan 2, Defender for Identity, Defender for Cloud Apps) + Security Copilot + Power BI Pro + προχωρημένο Microsoft Purview
- **Microsoft 365 E7** ($99) = όλο το Microsoft 365 E5 + Microsoft 365 Copilot + Agent 365 + Microsoft Entra Suite

Με άλλα λόγια, το Microsoft 365 περιέχει ήδη μέσα του τις δυνατότητες του EMS. Αν αγοράσεις Microsoft 365 E5 ή E7, έχεις ήδη ό,τι δίνει το EMS E5 και δεν χρειάζεται να το αγοράσεις ξανά. Μην αφήσεις κανέναν να σου πουλήσει και τα δύο.

[![Οι ανατεθειμένες άδειες στο Microsoft 365 admin center](/images/Microsoft-Defender/ems-02-m365-licenses.webp)](/images/Microsoft-Defender/ems-02-m365-licenses.webp)
> 📷 **Εικόνα 2:** Η σελίδα αδειών με τις ανατεθειμένες άδειες, όπου το Enterprise Mobility + Security E5 εμφανίζεται ως ξεχωριστή συνδρομή δίπλα στα Microsoft 365 Business και E5. Microsoft 365 admin center → Billing → Licenses, από δικό μου tenant.

## Πότε το EMS είναι η σωστή αγορά

Τρία νόμιμα σενάρια:

### Σενάριο 1: Χρησιμοποιείς ήδη σουίτα παραγωγικότητας άλλου κατασκευαστή

Ο οργανισμός σου δουλεύει με Google Workspace για email, έγγραφα και συνεργασία. Ο CIO σου δεν πρόκειται να το αλλάξει. Χρειάζεσαι όμως ταυτότητα, διαχείριση κινητών συσκευών και προστασία πληροφοριών εταιρικού επιπέδου, και δεν θέλεις τρεις διαφορετικούς κατασκευαστές γι' αυτά.

**Αγόρασε EMS E3 ή E5.** Αποκτάς το επίπεδο ασφάλειας και διαχείρισης του Microsoft 365 χωρίς να πληρώνεις για εφαρμογές παραγωγικότητας που δεν θα χρησιμοποιήσεις. Αυτό είναι το πιο συνηθισμένο νόμιμο σενάριο για αυτόνομο EMS.

### Σενάριο 2: Έχεις υπάρχουσα αδειοδότηση Office που δεν είσαι έτοιμος να αντικαταστήσεις

Αγόρασες πριν από χρόνια Office Professional Plus με volume licensing για μόνιμη χρήση (perpetual), και δεν είσαι ακόμη έτοιμος να περάσεις στο συνδρομητικό Microsoft 365 Apps. Θέλεις όμως σύγχρονη ταυτότητα και ασφάλεια.

**Αγόρασε EMS E3 ή E5** ως επιπλέον επίπεδο (add-on). Αυτό είναι λιγότερο συνηθισμένο το 2026 απ' ό,τι πριν από πέντε χρόνια, αφού οι περισσότεροι οργανισμοί έχουν περάσει σε συνδρομή, αλλά το σενάριο υπάρχει ακόμη, ιδίως στον δημόσιο τομέα και σε ρυθμιζόμενους κλάδους.

### Σενάριο 3: Προσθέτεις ασφάλεια σε μερική ανάπτυξη Microsoft 365

Έχεις κάποιους χρήστες σε Microsoft 365 Business Standard (μόνο παραγωγικότητα, χωρίς ασφάλεια/διαχείριση) και θέλεις να προσθέσεις το επίπεδο ασφάλειας χωρίς να αναβαθμίσεις όλους σε Business Premium.

Τεχνικά, ο συνδυασμός Business Standard + EMS είναι έγκυρος, αλλά στην πράξη το Business Premium είναι συνήθως καλύτερη αξία. Συμβουλέψου έναν licensing partner πριν δεσμευτείς.

## Πότε το EMS *δεν* είναι η σωστή αγορά

**Έχεις ήδη Microsoft 365 E3, E5 ή E7.** Έχεις ήδη τις δυνατότητες του EMS. Μην πληρώνεις δύο φορές.

**Χρειάζεσαι μόνο ένα ή δύο στοιχεία του EMS.** Αν χρειάζεσαι συγκεκριμένα μόνο Microsoft Entra ID P1 ή μόνο Microsoft Intune, αυτά διατίθενται ως αυτόνομα προϊόντα. Το πακέτο EMS συνήθως αποσβένεται όταν θα αγόραζες έτσι κι αλλιώς τουλάχιστον τρία από τα στοιχεία του.

**Είσαι έως 300 χρήστες και χρησιμοποιείς κυρίως εργαλεία παραγωγικότητας της Microsoft.** Το Microsoft 365 Business Premium είναι σχεδόν σίγουρα καλύτερη επιλογή, αφού παίρνεις ταυτότητα, διαχείριση συσκευών και προστασία από απειλές μαζί με την πλήρη σουίτα παραγωγικότητας. Τα πακέτα Business καλύπτουν έως 300 χρήστες.

## Λίστα ελέγχου για την απόφαση

- ☐ **Έχεις ήδη Microsoft 365 E3, E5 ή E7;** → Έχεις ήδη τις δυνατότητες του EMS. Σταμάτα εδώ.
- ☐ **Είσαι έως 300 χρήστες σε εργαλεία παραγωγικότητας της Microsoft;** → Microsoft 365 Business Premium. Σταμάτα εδώ.
- ☐ **Χρησιμοποιείς σουίτα παραγωγικότητας άλλου κατασκευαστή (Google Workspace κ.λπ.);** → Το EMS είναι πιθανότατα η σωστή επιλογή. E3 για τα βασικά, E5 αν χρειάζεσαι Defender for Identity + Defender for Cloud Apps + PIM.
- ☐ **Έχεις Office με μόνιμη άδεια που δεν αντικαθιστάς;** → Το EMS ως add-on λειτουργεί. Διάλεξε ανάμεσα σε E3 και E5 με κριτήριο την ανίχνευση απειλών ταυτότητας και το CASB.
- ☐ **Χρειάζεσαι μόνο ένα ή δύο στοιχεία;** → Τα αυτόνομα SKUs (Microsoft Entra ID P1/P2, Microsoft Intune) μπορεί να είναι φθηνότερα.

[![Αυτόνομα SKUs Microsoft Entra ID και Microsoft Intune](/images/Microsoft-Defender/ems-03-standalone-skus.webp)](/images/Microsoft-Defender/ems-03-standalone-skus.webp)
> 📷 **Εικόνα 3:** Τα αυτόνομα SKUs των στοιχείων του EMS (Microsoft Entra ID P1/P2, Microsoft Intune Plan 1/Plan 2, Remote Help, Advanced Analytics) με τις τιμές εκκίνησης σε ευρώ. Microsoft 365 admin center → Billing → Purchase services.

## Πού να συνεχίσεις από εδώ

{{< if-published page="/posts/alysida-epithesis-3d-microsoft-defender" >}}
> 🔗 **Το τελευταίο άρθρο της σειράς:** δες **[την αλυσίδα μιας επίθεσης σε 3D](/posts/alysida-epithesis-3d-microsoft-defender/)**, όπου τα Defender for Endpoint, Office 365, Identity και Cloud Apps δουλεύουν μαζί μέσα σε τρία σενάρια επίθεσης.
{{< /if-published >}}

> 🔗 **Διάβασε τη σειρά Microsoft Defender Up Close**: τα **[Microsoft Defender for Identity](/posts/microsoft-defender-up-close-series/microsoft-defender-for-identity-deep-dive/)** και **[Microsoft Defender for Cloud Apps](/posts/microsoft-defender-up-close-series/microsoft-defender-for-cloud-apps-deep-dive/)** περιλαμβάνονται στο EMS E5, ενώ τα **[Microsoft Defender for Endpoint](/posts/microsoft-defender-up-close-series/microsoft-defender-for-endpoint-deep-dive/)** και **[Microsoft Defender for Office 365](/posts/microsoft-defender-up-close-series/microsoft-defender-for-office-365-deep-dive/)** συμπληρώνουν τη στοίβα μέσω του Microsoft 365. Το **[Microsoft Defender for Cloud](/posts/microsoft-defender-up-close-series/microsoft-defender-for-cloud-deep-dive/)** δεν ανήκει σε καμία από τις δύο σουίτες: χρεώνεται ανά resource μέσα από το Azure subscription. Όλα τα άρθρα θα τα βρεις στη **[σελίδα της σειράς](/series/microsoft-defender-up-close/)**.

> 🛠️ **Θέλεις να δεις ποιο πακέτο καλύπτει ποιο μέτρο;** Το εργαλείο **[Ποια άδεια Microsoft 365 χρειάζομαι για την ΚΥΑ 1689/2025](/poia-adeia-microsoft-365/)** σου δείχνει, μέτρο προς μέτρο, τι περιλαμβάνει κάθε πακέτο και τι θέλει πρόσθετη άδεια. Αν ήδη έχεις Entra ID P1 ή P2, το **[βασικό σύνολο πολιτικών Conditional Access](/politikes-conditional-access/)** σου δίνει τις πολιτικές έτοιμες σε JSON.

> 🔗 **Χρειάζεσαι τεκμηρίωση συμμόρφωσης;** Το Microsoft Entra ID (MFA, Conditional Access, PIM), το Microsoft Intune και τα sensitivity labels του Microsoft Purview που περιέχει το EMS στηρίζουν τις απαιτήσεις [11.α](/kya-1689-2025/#11-α), [11.β](/kya-1689-2025/#11-β), [13.δ](/kya-1689-2025/#13-δ), [13.ζ](/kya-1689-2025/#13-ζ) και [14.α](/kya-1689-2025/#14-α), όπως τις αναλύει ο **[οδηγός της ΚΥΑ 1689/2025](/kya-1689-2025/)**. Στον οδηγό για την **[Οδηγία NIS2](/nis2/)** αντιστοιχούν στα [21.2.θ](/nis2/#21-2-θ) και [21.2.ι](/nis2/#21-2-ι), στο **[ISO/IEC 27001](/iso-27001/)** στα [A.5.12](/iso-27001/#A-5-12), [A.8.1](/iso-27001/#A-8-1), [A.8.2](/iso-27001/#A-8-2) και [A.8.5](/iso-27001/#A-8-5), και στον **[GDPR](/gdpr/)** στο [32.1.β](/gdpr/#32-1-β). Ο καθένας έχει checklist σε Excel.

> 🔗 **Θέλεις να δεις πώς μετατρέπεις οποιοδήποτε από αυτά σε μετρήσιμη συμμόρφωση;** Διάβασε το **[Microsoft Secure Score ως εργαλείο GRC για ISO 27001 & NIS2](/posts/secure-score-grc-part-0-intro/)**.

Ακολούθησέ με στο [LinkedIn](https://www.linkedin.com/in/dimosthenisatteia/) για ειδοποιήσεις νέων άρθρων.

## Πηγές και επαλήθευση {#last-verified}

{{< verification >}}

Επιπλέον πηγές: [Enterprise Mobility + Security licensing](https://www.microsoft.com/en-us/licensing/product-licensing/enterprise-mobility-security) · [Assign or unassign licenses in the Microsoft 365 admin center](https://learn.microsoft.com/en-us/microsoft-365/admin/manage/assign-licenses-to-users). Η Εικόνα 1 προέρχεται από τη σελίδα τιμών της Microsoft. Οι Εικόνες 2 και 3 είναι από δικό μου tenant.

Τελευταίος έλεγχος στοιχείων: 7 Νοεμβρίου 2026.
