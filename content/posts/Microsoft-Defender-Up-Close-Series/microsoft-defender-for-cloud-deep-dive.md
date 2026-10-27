---
title: "Microsoft Defender for Cloud: Μια πρακτική περιήγηση στο CNAPP της Microsoft"
seoTitle: "Microsoft Defender for Cloud: πρακτικός οδηγός CSPM και plans"
date: 2026-11-02T07:00:00+02:00
lastmod: 2026-11-02T07:00:00+02:00
draft: false
keywords:
  - Microsoft Defender for Cloud
  - Microsoft Defender for Cloud οδηγός
  - CNAPP Microsoft
  - Foundational CSPM
  - Defender CSPM attack path analysis
  - Regulatory compliance NIS2 ISO 27001 Defender for Cloud
  - Defender for Servers Plan 1 Plan 2
  - Defender for Servers billing desktops
  - Defender Workload Units DWU
  - Defender for Cloud Defender portal
tags:
  - Microsoft Defender for Cloud
  - Microsoft Defender XDR
  - CNAPP
  - CSPM
  - Azure Security
  - Cloud Security
  - NIS2
  - ISO 27001
author: "Dimosthenis Atteia"
description: "Πρακτικός οδηγός για το Microsoft Defender for Cloud: Foundational και Defender CSPM, regulatory compliance για NIS2 και ISO 27001, Defender for Servers και διαχείριση των plans από το Defender portal."
seoDescription: "Defender for Cloud στην πράξη: δωρεάν CSPM, Defender CSPM, compliance για NIS2 και ISO 27001, Defender for Servers P1 και P2, plans και DWU στο Defender portal."
summary: "Το Microsoft Defender for Cloud όπως το χρειάζεται ένας επαγγελματίας στην πράξη. Τι δίνει δωρεάν το Foundational CSPM, πότε αξίζει το Defender CSPM, πώς βγάζετε τεκμήρια για NIS2 και ISO 27001, ποιο plan του Defender for Servers χρειάζεστε, και τι αλλάζει με τη διαχείριση των plans από το Defender portal."
categories: ["Cloud Security"]
series: ["Microsoft Defender Up Close"]
ShowToc: true
TocOpen: false
weight: -6
cover:
  image: "/images/MDE/MDC.png"
  alt: "Microsoft Defender for Cloud, αναλυτικός οδηγός"
  caption: "Microsoft Defender Up Close"
  relative: false
ShowReadingTime: true
ShowWordCount: true
# Πλαίσιο «Last verified»: κάθε χαρακτηριστικό με τη φάση, την άδεια, την πηγή και την ημερομηνία ελέγχου
verification:
  - feature: "Microsoft Defender for Cloud (CNAPP: CSPM, DevSecOps, CWPP)"
    status: "Generally Available"
    license: "Azure subscription. Foundational CSPM χωρίς κόστος, τα υπόλοιπα plans με χρέωση ανά resource"
    source: "https://learn.microsoft.com/en-us/azure/defender-for-cloud/defender-for-cloud-introduction"
    verified: 2026-10-27
  - feature: "Foundational CSPM: Secure score, recommendations, asset inventory, Microsoft Cloud Security Benchmark"
    status: "Generally Available"
    license: "Χωρίς κόστος"
    source: "https://learn.microsoft.com/en-us/azure/defender-for-cloud/concept-cloud-security-posture-management"
    verified: 2026-10-27
  - feature: "Defender CSPM: attack path analysis, cloud security explorer, governance rules, regulatory compliance assessments"
    status: "Generally Available"
    license: "Defender CSPM (χρέωση ανά billable resource)"
    source: "https://learn.microsoft.com/en-us/azure/defender-for-cloud/concept-cloud-security-posture-management"
    verified: 2026-10-27
  - feature: "Regulatory compliance standards: EU 2022/2555 (NIS2), GDPR, ISO/IEC 27001:2022"
    status: "Generally Available"
    license: "Τουλάχιστον ένα paid plan του Defender for Cloud"
    source: "https://learn.microsoft.com/en-us/azure/defender-for-cloud/concept-regulatory-compliance-standards"
    verified: 2026-10-27
  - feature: "Defender for Servers Plan 1 και Plan 2"
    status: "Generally Available"
    license: "Defender for Servers P1 ή P2 (χρέωση ανά server-hour)"
    source: "https://learn.microsoft.com/en-us/azure/defender-for-cloud/defender-for-servers-overview"
    verified: 2026-10-27
  - feature: "Defender for Servers: τα desktops δεν χρεώνονται ως servers στο Plan 1, νέος τρόπος αναγνώρισης billable servers (από 1 Νοεμβρίου 2026)"
    status: "Generally Available"
    license: "Defender for Servers Plan 1 και Plan 2"
    source: "https://learn.microsoft.com/en-us/azure/defender-for-cloud/release-notes#september-2026"
    verified: 2026-10-27
  - feature: "Διαχείριση cloud security plans στο Defender portal, χρέωση σε Defender Workload Units (DWU)"
    status: "Public Preview"
    license: "Τουλάχιστον ένα paid plan, Azure commercial"
    source: "https://learn.microsoft.com/en-us/azure/defender-for-cloud/defender-portal/manage-plans-defender-portal"
    verified: 2026-10-27
# MITRE ATT&CK®: ονόματα στο data/mitre.yaml
mitre: ["T1190", "T1530", "T1078.004", "M1047", "M1054"]
---

## Γιατί ένα CNAPP

Τα προηγούμενα άρθρα της σειράς κάλυψαν τα σημεία όπου δουλεύουν οι χρήστες σας: συσκευές, email, ταυτότητες, SaaS εφαρμογές. Υπάρχει όμως και μια δεύτερη περίμετρος, που συνήθως τη στήνει άλλη ομάδα: τα subscriptions του Azure, ίσως ένας λογαριασμός AWS, τα VMs που τρέχουν ακόμα το ERP, τα storage accounts με τα backups, τα pipelines των developers. Εκεί τα περιστατικά σπάνια ξεκινούν από phishing. Ξεκινούν από ένα storage account με δημόσια πρόσβαση, ένα VM με ανοιχτό RDP στο internet, ένα secret ξεχασμένο μέσα σε κώδικα.

Το **[Microsoft Defender for Cloud](https://learn.microsoft.com/en-us/azure/defender-for-cloud/defender-for-cloud-introduction)** είναι η απάντηση της Microsoft σε αυτό. Είναι **CNAPP** (Cloud Native Application Protection Platform), δηλαδή τρία εργαλεία σε ένα:

- **CSPM** (Cloud Security Posture Management): ελέγχει συνεχώς τις ρυθμίσεις των cloud resources και σας λέει τι είναι λάθος.
- **DevSecOps**: φέρνει τα ευρήματα του κώδικα και των pipelines (GitHub, Azure DevOps, GitLab) στην ίδια εικόνα.
- **CWPP** (Cloud Workload Protection Platform): προστατεύει τα ίδια τα workloads, δηλαδή servers, containers, storage και databases, με ανίχνευση απειλών σε πραγματικό χρόνο.

[![Το Defender for Cloud ως CNAPP: τα plans και τα περιβάλλοντα που καλύπτουν](https://learn.microsoft.com/en-us/azure/defender-for-cloud/media/defender-for-cloud-introduction/defender-plans.png)](https://learn.microsoft.com/en-us/azure/defender-for-cloud/media/defender-for-cloud-introduction/defender-plans.png)
> 📷 **Εικόνα 1:** Τα plans του Defender for Cloud και τα περιβάλλοντα που καλύπτουν, από τον κώδικα μέχρι το runtime. Πηγή εικόνας: Microsoft Learn.

Το Defender for Cloud δεν αγοράζεται ως άδεια ανά χρήστη, όπως τα υπόλοιπα προϊόντα της σειράς. Χρεώνεται ανά resource και ανά ώρα, μέσα από το Azure subscription. Γι' αυτό ο σχεδιασμός του είναι και απόφαση κόστους, όχι μόνο ασφάλειας.

Αυτό το άρθρο είναι η πρακτική συνέχεια της σειράς **[Microsoft Defender Demystified](/series/microsoft-defender-demystified/)**. Τέσσερις βασικές δυνατότητες, μία κάθε φορά.

## Δυνατότητα 1: Foundational CSPM, το δωρεάν σημείο εκκίνησης

Μόλις ανοίξετε το Defender for Cloud σε ένα Azure subscription, ενεργοποιείται το **Foundational CSPM**, χωρίς κόστος. Δεν χρειάζεται agent ούτε απόφαση αγοράς. Παίρνετε:

- **Security recommendations** για κάθε resource, βασισμένες στο **Microsoft Cloud Security Benchmark (MCSB)**.
- **Secure score** για το cloud, που ανεβαίνει καθώς διορθώνετε τις recommendations.
- **Asset inventory** των resources σε Azure, AWS και GCP, και των servers που συνδέετε μέσω Azure Arc.
- Σύνδεση των **AWS** και **GCP** χωρίς agent, για την ίδια εικόνα σε όλα τα clouds.
- **Workflow automation** και **εξαγωγή δεδομένων** προς SIEM.

Από την εμπειρία μου, η πρώτη ματιά στις recommendations είναι πάντα πιο χρήσιμη από όσο περιμένει η ομάδα: storage accounts που επιτρέπουν πρόσβαση από παντού, VMs με management ports ανοιχτά στο internet, Key Vaults χωρίς προστασία από διαγραφή, subscriptions με πολλούς owners. Τίποτα από αυτά δεν είναι επίθεση. Είναι όμως ακριβώς τα σημεία από όπου ξεκινούν οι επιθέσεις.

Στο Defender portal, στο **Cloud security → Overview**, η ίδια εικόνα συνδυάζεται με τα alerts και τα incidents του SOC:

[![Το Cloud overview dashboard του Defender for Cloud στο Microsoft Defender portal](https://learn.microsoft.com/en-us/azure/defender-for-cloud/media/defender-portal-dashboard/overview-dashboard.png)](https://learn.microsoft.com/en-us/azure/defender-for-cloud/media/defender-portal-dashboard/overview-dashboard.png)
> 📷 **Εικόνα 2:** Το Cloud overview dashboard, με posture και threat protection μαζί. Defender portal → Cloud security → Overview. Πηγή εικόνας: Microsoft Learn.

Μία πρακτική λεπτομέρεια: το Defender portal δείχνει τα δεδομένα του cloud όταν έχετε **τουλάχιστον ένα paid plan**. Την πρώτη φορά επιλέγετε **Prepare my tenant**, και τα δεδομένα μπορεί να χρειαστούν έως 24 ώρες για να εμφανιστούν.

## Δυνατότητα 2: Defender CSPM και regulatory compliance

Το Foundational CSPM σας λέει τι είναι λάθος. Το **Defender CSPM**, το paid plan, σας λέει **ποιο λάθος έχει σημασία**. Η διαφορά φαίνεται όταν έχετε 400 recommendations και μία εβδομάδα.

Οι δυνατότητες που κάνουν τη διαφορά:

| Δυνατότητα | Τι λύνει |
|---|---|
| **Attack path analysis** | Δείχνει τη διαδρομή που θα ακολουθούσε ένας επιτιθέμενος: VM εκτεθειμένο στο internet, με ευπάθεια, με managed identity που διαβάζει storage account με ευαίσθητα δεδομένα. Διορθώνετε πρώτα αυτό. |
| **Cloud security explorer** | Ερωτήματα πάνω στον χάρτη του cloud σας, π.χ. «ποια VMs είναι εκτεθειμένα στο internet και έχουν critical ευπάθειες». |
| **Agentless scanning** | Ευπάθειες και secrets στα VMs χωρίς εγκατάσταση agent. |
| **Data security posture management** | Βρίσκει ποια datastores περιέχουν ευαίσθητα δεδομένα, άρα ποια resources θέλουν προτεραιότητα. |
| **Governance rules** | Αναθέτει κάθε recommendation σε owner με προθεσμία και παρακολουθεί την πρόοδο. |
| **Regulatory compliance** | Αξιολογεί τα resources απέναντι σε πρότυπα και κανονισμούς. |

Για όποιον κάνει GRC, το τελευταίο είναι το πιο ενδιαφέρον. Στη λίστα των standards που μπορείτε να ενεργοποιήσετε υπάρχουν το **EU 2022/2555 (NIS2)**, ο **GDPR** και το **ISO/IEC 27001:2022**, για Azure, AWS και GCP. Το MCSB είναι ενεργό από προεπιλογή. Για να προσθέσετε τα υπόλοιπα, χρειάζεστε τουλάχιστον ένα paid plan.

[![Το Regulatory compliance dashboard του Defender for Cloud, με τα controls ενός standard και τις αξιολογήσεις τους](https://learn.microsoft.com/en-us/azure/defender-for-cloud/media/regulatory-compliance-dashboard/compliance-drilldown.png)](https://learn.microsoft.com/en-us/azure/defender-for-cloud/media/regulatory-compliance-dashboard/compliance-drilldown.png)
> 📷 **Εικόνα 3:** Τα controls ενός standard, με αυτόματες και χειροκίνητες αξιολογήσεις. Azure portal → Microsoft Defender for Cloud → Regulatory compliance. Πηγή εικόνας: Microsoft Learn.

Τρία πράγματα που πρέπει να ξέρετε πριν δείξετε αυτό το dashboard σε ελεγκτή:

1. **Καλύπτει μόνο το τεχνικό κομμάτι των cloud resources.** Ένα 100% στο standard «NIS2» δεν σημαίνει συμμόρφωση με την Οδηγία. Σημαίνει ότι οι ρυθμίσεις των resources που ελέγχει περνούν τους αυτόματους ελέγχους. Οι πολιτικές, οι διαδικασίες και η διοίκηση μένουν δική σας δουλειά.
2. **Οι χειροκίνητες αξιολογήσεις δέχονται τεκμήρια.** Με **Attest** δηλώνετε την κατάσταση ενός control και επισυνάπτετε τεκμήριο. Έτσι το dashboard γίνεται σημείο συγκέντρωσης, όχι μόνο αυτόματη αναφορά.
3. **Το Download report βγάζει PDF ανά standard**, οργανωμένο ανά control. Είναι το πιο απλό τεκμήριο για το cloud κομμάτι ενός ελέγχου. Τα δεδομένα συγχρονίζονται και με το Microsoft Purview Compliance Manager.

Στο Defender portal το regulatory compliance εμφανίζεται για παρακολούθηση. Η ανάθεση των standards γίνεται ακόμα από το Azure portal.

Για το Microsoft 365 κομμάτι της ίδιας εικόνας, το αντίστοιχο εργαλείο είναι το Secure Score. Δείτε το **[Από το Secure Score στη συμμόρφωση](/secure-score-symmorfosi/)** για αντιστοίχιση με ΚΥΑ 1689/2025, NIS2, ISO 27001 και GDPR.

## Δυνατότητα 3: Defender for Servers, Plan 1 ή Plan 2

Οι servers είναι συνήθως το μεγαλύτερο κομμάτι του λογαριασμού και το πιο κρίσιμο κομμάτι της προστασίας. Το **Defender for Servers** καλύπτει Windows και Linux σε Azure, AWS, GCP και on-premises (μέσω Azure Arc), και φέρνει μαζί του το **Microsoft Defender for Endpoint**. Η άδεια του Defender for Endpoint for Servers περιλαμβάνεται.

| Δυνατότητα | Plan 1 | Plan 2 |
|---|:---:|:---:|
| Defender for Endpoint EDR, με αυτόματο onboarding | ✅ | ✅ |
| Alerts και incidents στο Defender portal | ✅ | ✅ |
| Software inventory και vulnerability scanning με agent | ✅ | ✅ |
| Agentless vulnerability, malware και secrets scanning | | ✅ |
| Defender Vulnerability Management premium | | ✅ |
| File integrity monitoring | | ✅ |
| Just-in-time VM access | | ✅ |
| OS baseline misconfigurations (MCSB) | | ✅ |
| Alerts για DNS | | ✅ |
| 500 MB δωρεάν data ingestion σε Log Analytics | | ✅ |

Ο κανόνας που χρησιμοποιώ: **Plan 1** όταν θέλετε κυρίως EDR στους servers και έχετε ήδη άλλο εργαλείο για ευπάθειες. **Plan 2** για servers που είναι εκτεθειμένοι στο internet, servers με δεδομένα, και όπου ο ελεγκτής θα ζητήσει file integrity monitoring ή τεκμήρια για τη διαχείριση ευπαθειών. Το Plan 2 ενεργοποιείται μόνο σε επίπεδο subscription. Μπορείτε όμως να το απενεργοποιήσετε σε συγκεκριμένο resource.

### Η αλλαγή στη χρέωση από 1 Νοεμβρίου 2026

Από την **1η Νοεμβρίου 2026** αλλάζουν δύο πράγματα:

- **Στο Plan 1, τα desktops δεν χρεώνονται πια ως servers.** Windows 10 και 11, Windows Enterprise multi-session, macOS και Linux desktop διανομές αδειοδοτούνται μέσω του Defender for Endpoint. Συσκευή που δεν αναγνωρίζεται καθαρά ως desktop χρεώνεται ως server.
- **Και στα δύο plans αλλάζει ο τρόπος που μετρώνται οι billable servers.** Ο αριθμός στον λογαριασμό σας μπορεί να αλλάξει.

Στο Plan 1 οι Windows servers χρεώνονται επειδή παίρνουν προστασία χωρίς να εγκαταστήσετε εσείς τον agent. Οι Linux servers χρεώνονται μόνο όταν έχει εγκατασταθεί ο agent του Defender for Endpoint. Αν έχετε ήδη standalone άδειες Defender for Endpoint for Servers, ανοίξτε support request για να μην πληρώνετε δύο φορές.

Πρακτικά: κρατήστε τον λογαριασμό του Οκτωβρίου και συγκρίνετέ τον με του Νοεμβρίου. Αν έχετε Azure Virtual Desktop, δείτε πώς ταξινομούνται τα session hosts.

## Δυνατότητα 4: Διαχείριση των plans από το Defender portal

Ως τώρα τα plans ρυθμίζονταν στο Azure portal, subscription προς subscription, στο **Environment settings**:

[![Η ενεργοποίηση όλων των plans του Defender for Cloud σε ένα subscription από το Azure portal](https://learn.microsoft.com/en-us/azure/defender-for-cloud/media/get-started/enable-all-plans.png)](https://learn.microsoft.com/en-us/azure/defender-for-cloud/media/get-started/enable-all-plans.png)
> 📷 **Εικόνα 4:** Τα plans ενός subscription και το κουμπί Enable all. Azure portal → Microsoft Defender for Cloud → Environment settings → subscription. Πηγή εικόνας: Microsoft Learn.

Από τις **20 Οκτωβρίου 2026**, σε **Public Preview**, μπορείτε να τα διαχειρίζεστε από το Defender portal. Ορίζετε plans **global**, για όλα τα συνδεδεμένα περιβάλλοντα, τωρινά και μελλοντικά, ή **ανά management group και subscription**. Με το εικονίδιο της κλειδαριάς (**Enforce and lock**) εμποδίζετε τα επιμέρους subscriptions να αλλάξουν τη ρύθμιση.

[![Η σελίδα Global plans enablement στο Defender portal, με την επιλογή των plans και το Save and apply](https://learn.microsoft.com/en-us/azure/defender-for-cloud/defender-portal/media/manage-plans-defender-portal/global-plan-enablement.png)](https://learn.microsoft.com/en-us/azure/defender-for-cloud/defender-portal/media/manage-plans-defender-portal/global-plan-enablement.png)
> 📷 **Εικόνα 5:** Global plans enablement. Defender portal → Cloud security → Define Cloud Security plans → Global plans enablement page. Πηγή εικόνας: Microsoft Learn.

Για όποιον έχει ζήσει το «ξεχάσαμε να ενεργοποιήσουμε το Defender στο νέο subscription», αυτό είναι η μεγαλύτερη βελτίωση: κάθε νέο subscription κληρονομεί αυτόματα την κάλυψη. Υπάρχει όμως αντάλλαγμα. Μόλις ένα subscription περάσει στο Defender portal:

- Η χρέωση γίνεται σε **Defender Workload Units (DWU)**, και κάποια plans ενοποιούνται ή μετρούν διαφορετικά.
- Οι **ρυθμίσεις ανά resource δεν διατηρούνται.** Αντικαθίστανται από τη ρύθμιση του subscription ή του management group.
- Το **Defender for DNS καταργείται.** Για αντίστοιχη προστασία χρειάζεστε Defender for Servers Plan 2.
- Η **δοκιμή των 30 ημερών** θέλει ρητό opt-in τη στιγμή της ενεργοποίησης. Αλλιώς η χρέωση ξεκινά αμέσως.

[![Το παράθυρο Migrate to Defender με τις αλλαγές στη χρέωση και τη σύγκριση των παλιών και νέων plans](https://learn.microsoft.com/en-us/azure/defender-for-cloud/defender-portal/media/plan-management-changes-defender-portal/migrate-to-defender-plan-comparison.png)](https://learn.microsoft.com/en-us/azure/defender-for-cloud/defender-portal/media/plan-management-changes-defender-portal/migrate-to-defender-plan-comparison.png)
> 📷 **Εικόνα 6:** Η σύγκριση παλιών και νέων plans πριν από τη μεταφορά. Defender portal → Cloud security → Define Cloud Security plans → Per-environment plan configurations. Πηγή εικόνας: Microsoft Learn.

Το preview καλύπτει μόνο Azure commercial. Τα AWS, GCP και τα DevOps connectors μένουν στο Azure portal. Για τον πλήρη πίνακα αλλαγών και το τι κάνετε πριν από τη μεταφορά, δείτε το **[Preview: τα plans του Defender for Cloud στο Defender portal, με χρέωση σε DWU](/posts/previews/defender-for-cloud-plans-defender-portal-dwu/)**.

Η σύστασή μου: μην ενεργοποιήσετε **global plan enablement** σε παραγωγή όσο είναι preview. Η έγκριση γίνεται μία φορά για όλο το tenant και μεταφέρει αυτόματα όλα τα συνδεδεμένα subscriptions. Ξεκινήστε από ένα subscription δοκιμών.

## Ένα ρεαλιστικό πλάνο για τον πρώτο μήνα

- **Εβδομάδα 1**: Ανοίξτε το Defender for Cloud σε όλα τα subscriptions (Foundational CSPM, χωρίς κόστος). Συνδέστε AWS ή GCP αν υπάρχουν. Μην ενεργοποιήσετε ακόμη paid plans. Καταγράψτε τις 20 recommendations με τον μεγαλύτερο αντίκτυπο στο Secure score.
- **Εβδομάδα 2**: Αποφασίστε για το Defender for Servers ανά subscription, Plan 1 ή Plan 2, με τον πίνακα παραπάνω. Ενεργοποιήστε με opt-in στη δοκιμή των 30 ημερών και ελέγξτε ότι οι servers εμφανίζονται στο Defender portal με τον agent του Defender for Endpoint.
- **Εβδομάδα 3**: Ενεργοποιήστε το Defender CSPM σε ένα subscription με κρίσιμα δεδομένα. Ανοίξτε το **Attack path analysis** και διορθώστε τις διαδρομές που καταλήγουν σε ευαίσθητα δεδομένα. Ορίστε **governance rules** με owner και προθεσμία για τις critical recommendations.
- **Εβδομάδα 4**: Προσθέστε τα standards **NIS2** και **ISO/IEC 27001:2022** στο Regulatory compliance, κατεβάστε την πρώτη αναφορά ανά standard και κρατήστε την ως baseline. Πριν λήξει η δοκιμή, συγκρίνετε το κόστος με τον Cost Estimator και κρατήστε μόνο τα plans που αιτιολογούνται.

Στο τέλος του πρώτου μήνα έχετε πλήρη εικόνα του cloud σας, EDR σε όλους τους servers, μια λίστα προτεραιοτήτων που βασίζεται σε πραγματικές διαδρομές επίθεσης, και μια πρώτη αναφορά συμμόρφωσης που δείχνει πού είστε.

## Πού να συνεχίσετε από εδώ

{{< if-published page="/posts/alysida-epithesis-3d-microsoft-defender" >}}
> 🔗 **Θέλετε να δείτε το προϊόν μέσα σε μια πραγματική επίθεση;** Δείτε **[την αλυσίδα μιας επίθεσης σε 3D](/posts/alysida-epithesis-3d-microsoft-defender/)**, με τρία σενάρια και το βήμα όπου τη σταματά το Microsoft Defender.
{{< /if-published >}}

> 🔗 **Διαβάστε την υπόλοιπη σειρά Microsoft Defender Up Close:** **[Microsoft Defender for Endpoint](/posts/microsoft-defender-up-close-series/microsoft-defender-for-endpoint-deep-dive/)**, **[Microsoft Defender for Office 365](/posts/microsoft-defender-up-close-series/microsoft-defender-for-office-365-deep-dive/)**, **[Microsoft Defender for Identity](/posts/microsoft-defender-up-close-series/microsoft-defender-for-identity-deep-dive/)** και **[Microsoft Defender for Cloud Apps](/posts/microsoft-defender-up-close-series/microsoft-defender-for-cloud-apps-deep-dive/)**. Ακολουθεί το **Enterprise Mobility + Security**, στη **[σελίδα της σειράς](/series/microsoft-defender-up-close/)**.

> 🔗 **Θέλετε να δείτε πώς το Secure Score τροφοδοτεί την τεκμηρίωση συμμόρφωσης;** Διαβάστε το **[Microsoft Secure Score ως εργαλείο GRC για ISO 27001 & NIS2](/posts/secure-score-grc-part-0-intro/)**.

> 🔗 **Χρειάζεστε τεκμηρίωση συμμόρφωσης;** Το Foundational και το Defender CSPM, το Regulatory compliance, το Defender for Servers και η διαχείριση των plans ανά management group στηρίζουν τις απαιτήσεις [11.α](/kya-1689-2025/#11-α), [14.α](/kya-1689-2025/#14-α), [14.β](/kya-1689-2025/#14-β), [17.α](/kya-1689-2025/#17-α), [17.ε](/kya-1689-2025/#17-ε), [20.α](/kya-1689-2025/#20-α) και [24.ε](/kya-1689-2025/#24-ε), όπως τις αναλύει ο **[οδηγός της ΚΥΑ 1689/2025](/kya-1689-2025/)**. Στον οδηγό για την **[Οδηγία NIS2](/nis2/)** αντιστοιχούν στα [21.2.β](/nis2/#21-2-β), [21.2.ε](/nis2/#21-2-ε) και [21.2.στ](/nis2/#21-2-στ), στο **[ISO/IEC 27001](/iso-27001/)** στα [A.5.23](/iso-27001/#A-5-23), [A.5.36](/iso-27001/#A-5-36), [A.8.7](/iso-27001/#A-8-7), [A.8.8](/iso-27001/#A-8-8), [A.8.9](/iso-27001/#A-8-9) και [A.8.16](/iso-27001/#A-8-16), και στον **[GDPR](/gdpr/)** στα [32.1.β](/gdpr/#32-1-β) και [32.1.δ](/gdpr/#32-1-δ). Ο καθένας έχει checklist σε Excel.

Ακολουθήστε με στο [LinkedIn](https://www.linkedin.com/in/dimosthenisatteia/) για ειδοποιήσεις νέων άρθρων.

## Πηγές και επαλήθευση {#last-verified}

{{< verification >}}

Επιπλέον πηγές: [Defender for Cloud in the Defender portal](https://learn.microsoft.com/en-us/azure/defender-for-cloud/defender-portal/defender-for-cloud-defender-portal) · [Improve regulatory compliance](https://learn.microsoft.com/en-us/azure/defender-for-cloud/regulatory-compliance-dashboard) · [What changes when managing cloud security plans in the Defender portal](https://learn.microsoft.com/en-us/azure/defender-for-cloud/defender-portal/plan-management-changes-defender-portal) · [Common questions about Defender for Servers](https://learn.microsoft.com/en-us/azure/defender-for-cloud/faq-defender-for-servers) · [Connect your Azure subscriptions](https://learn.microsoft.com/en-us/azure/defender-for-cloud/connect-azure-subscription). Οι εικόνες προέρχονται από το Microsoft Learn.

Τελευταίος έλεγχος στοιχείων: 27 Οκτωβρίου 2026.
