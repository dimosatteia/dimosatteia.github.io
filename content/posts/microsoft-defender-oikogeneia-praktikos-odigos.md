---
title: "Η Οικογένεια Προϊόντων του Microsoft Defender με πρακτικό Οδηγό για νέους επαγγελματίες ασφάλειας & ΥΑΣΠΕ"
date: 2026-07-13T10:00:00+03:00
lastmod: 2026-07-13T10:00:00+03:00
draft: false
keywords:
  - Microsoft Defender οικογένεια προϊόντων
  - τι είναι το Microsoft Defender
  - MDE MDO MDI MDA MDC διαφορές
  - Microsoft Defender for Endpoint ελληνικά
  - Microsoft Defender for Office 365 ελληνικά
  - Microsoft Defender for Identity ελληνικά
  - Microsoft Defender for Cloud Apps ελληνικά
  - Microsoft Defender XDR πώς λειτουργεί
  - οδηγός για junior security analyst
  - Microsoft Defender portal security.microsoft.com
tags:
  - Microsoft Defender
  - Microsoft Defender for Endpoint
  - Microsoft Defender for Office 365
  - Microsoft Defender for Identity
  - Microsoft Defender for Cloud Apps
  - Microsoft Defender for Cloud
  - Microsoft Defender XDR
  - Microsoft 365 Security
  - Cyber GRC
  - Junior Μηχανικός Ασφάλειας
  - Security Operations
author: "Dimosthenis Atteia"
description: "Πρακτικός οδηγός στην οικογένεια Microsoft Defender: MDE, MDO, MDI, MDA, MDC και Defender XDR. Τι προστατεύει το καθένα, πού ζει και πώς συνδέονται όλα μεταξύ τους."
summary: "Ένας πρακτικός χάρτης της οικογένειας Microsoft Defender για νέους επαγγελματίες ασφάλειας: Endpoint, Office 365, Identity, Cloud Apps, Cloud και το ενοποιημένο Defender XDR που τα συνδέει όλα σε ένα incident."
categories: ["Microsoft Defender", "Microsoft 365"]
ShowToc: true
TocOpen: false
cover:
  image: "/images/microsoft-defender-oikogeneia-praktikos-odigos/01-title-overview.png"
  alt: "Η οικογένεια Microsoft Defender — MDE, MDO, MDI, MDA, MDC και Defender XDR"
  caption: "Η Οικογένεια Microsoft Defender — πρακτικός οδηγός για νέους επαγγελματίες Security"
---

## Δευτέρα πρωί, νέος στην ομάδα ασφάλειας

Ας υποθέσουμε ότι μόλις μπήκατε σε μια ομάδα Security ή IT και κάποιος συνάδελφος σάς λέει «κοίτα το στο Defender». Ποιο Defender όμως; Το antivirus των Windows που ξέρουμε όλοι από τον προσωπικό μας υπολογιστή, ή κάτι πολύ μεγαλύτερο;

Στην πραγματικότητα, το **Microsoft Defender** δεν είναι ένα προϊόν. Είναι μια ολόκληρη **οικογένεια προϊόντων ασφάλειας** που καλύπτει endpoints, email, ταυτότητες, cloud εφαρμογές και cloud υποδομές, όλα κάτω από μία ενοποιημένη ομπρέλα. Αυτό το άρθρο είναι η γραπτή εκδοχή μιας παρουσίασης που ετοίμασα για νέους συναδέλφους που μπαίνουν πρώτη φορά στον κόσμο του Microsoft Security, και στόχος του είναι απλός: να καταλάβετε **τι κάνει κάθε προϊόν, τι προστατεύει, πού «ζει»** και **πώς όλα δένουν μαζί** μέσα από το Microsoft Defender XDR.

> 📌 **TL;DR**
>
> - Η οικογένεια Microsoft Defender έχει **έξι βασικά κομμάτια**: **MDE** (Endpoint), **MDO** (Office 365), **MDI** (Identity), **MDA** (Cloud Apps), **MDC** (Cloud) και το **Defender XDR** που τα ενοποιεί όλα.
> - Κάθε προϊόν προστατεύει **διαφορετική επιφάνεια επίθεσης** — δεν υπάρχει ένα εργαλείο που τα λύνει όλα.
> - Τα περισσότερα ζουν στο ίδιο portal, το **security.microsoft.com**, με εξαίρεση το onboarding του Defender for Cloud που ξεκινά από το Azure portal.
> - Η πραγματική δύναμη δεν είναι το κάθε προϊόν μεμονωμένα, αλλά η **συσχέτιση (correlation)** των σημάτων τους μέσα από το **Defender XDR**, που μετατρέπει δεκάδες απομονωμένα alerts σε **ένα ενιαίο incident** με πλήρη εικόνα της επίθεσης.

## Η οικογένεια Microsoft Defender με μια ματιά

Έξι προϊόντα, ένα portal (σχεδόν πάντα), μία ενοποιημένη άμυνα:

| Συντομογραφία | Προϊόν | Τι προστατεύει | Πού ζει |
|---|---|---|---|
| **MDE** | Microsoft Defender for Endpoint | Συσκευές: Windows, macOS, Linux, mobile, servers | security.microsoft.com |
| **MDO** | Microsoft Defender for Office 365 | Email & συνεργασία: Exchange, Teams, SharePoint, OneDrive | security.microsoft.com |
| **MDI** | Microsoft Defender for Identity | Ταυτότητες: on-prem AD, Entra ID, hybrid | security.microsoft.com |
| **MDA** | Microsoft Defender for Cloud Apps | SaaS εφαρμογές, Shadow IT, CASB | security.microsoft.com |
| **MDC** | Microsoft Defender for Cloud | Cloud υποδομή: Azure, AWS, GCP (CNAPP) | Defender portal, onboarding: Azure portal |
| **XDR** | Microsoft Defender XDR | Συσχέτιση σημάτων απ' όλα τα παραπάνω σε ενιαία incidents | security.microsoft.com |

[![Η οικογένεια Microsoft Defender — MDE, MDO, MDI, MDA, MDC και Defender XDR](/images/microsoft-defender-oikogeneia-praktikos-odigos/01-title-overview.png)](/images/microsoft-defender-oikogeneia-praktikos-odigos/01-title-overview.png)
> 📷 **Εικόνα 1 — Η Οικογένεια Microsoft Defender.** *Πρακτικός οδηγός για νέους επαγγελματίες Security.*

## Microsoft Defender for Endpoint (MDE)

**Τι είναι:** Η **enterprise πλατφόρμα ασφάλειας endpoint** της Microsoft. Βοηθά τους οργανισμούς να προλαμβάνουν, ανιχνεύουν, διερευνούν και αποκρίνονται σε προηγμένες απειλές σε laptops, mobile συσκευές, tablets, PCs, αλλά και σε access points, routers και firewalls.

[![Microsoft Defender for Endpoint (MDE) — ο πυλώνας ασφάλειας endpoint: πρόληψη, ανίχνευση και απόκριση σε κάθε συσκευή](/images/microsoft-defender-oikogeneia-praktikos-odigos/02-mde-overview.png)](/images/microsoft-defender-oikogeneia-praktikos-odigos/02-mde-overview.png)
> 📷 **Εικόνα 2 — Microsoft Defender for Endpoint (MDE).** *Τι είναι και τι προστατεύει.*

**Τι προστατεύει:**

- **Workstations & laptops** — Windows, macOS, Linux, με next-gen προστασία και EDR
- **Mobile (iOS/Android)** — Mobile Threat Defense ενσωματωμένο στο ίδιο portal
- **Servers** — μέσω Defender for Endpoint for servers ή Defender for Business servers
- **Zero Trust** — επαλήθευση ταυτότητας και device health πριν την πρόσβαση

Ένα σημείο που εκπλήσσει τους νέους αναλυτές: το MDE **δεν έχει agent** σε συσκευές δικτύου όπως firewalls της Cisco/Fortinet, routers MikroTik ή access points Aruba/Ubiquiti. Παρ' όλα αυτά, μέσω **Device Discovery** (passive network monitoring, DHCP/ARP/traffic observation) μπορεί να τα ανακαλύψει στο δίκτυο και να δώσει ορατότητα σε **unmanaged assets** — κρίσιμο για κάθε οργανισμό που θέλει πλήρες inventory.

[![MDE βασικές δυνατότητες: next-generation protection, EDR, Attack Surface Reduction, autonomous protection, vulnerability management, APIs](/images/microsoft-defender-oikogeneia-praktikos-odigos/03-mde-capabilities.png)](/images/microsoft-defender-oikogeneia-praktikos-odigos/03-mde-capabilities.png)
> 📷 **Εικόνα 3 — MDE, βασικές δυνατότητες.** *Και αδειοδότηση: Plan 1, Plan 2, Defender for Business.*

**Βασικές δυνατότητες:** next-generation protection με πρόληψη ransomware, **EDR** (Endpoint Detection & Response), **Attack Surface Reduction**, autonomous protection με automatic attack disruption, **Defender Vulnerability Management**, καθώς και APIs για integrations με τα δικά σας workflows.

**Αδειοδότηση:** Plan 1, Plan 2 και Defender for Business. Τα M365 E5 / E5 Security περιλαμβάνουν το Plan 2.

**Για τον νέο αναλυτή:** Στο ενοποιημένο Defender portal μπορείτε να ιχνηλατήσετε μια επίθεση από το phishing email μέχρι το compromised endpoint και το lateral movement — όλα σε ένα σημείο.

## Microsoft Defender for Office 365 (MDO)

**Τι είναι:** Η κύρια **cloud-based υπηρεσία φιλτραρίσματος email** της Microsoft και το πρώτο επίπεδο άμυνας απέναντι στις περισσότερες κυβερνοεπιθέσεις, αφού το email παραμένει η μεγαλύτερη πηγή επιθέσεων σήμερα.

[![Microsoft Defender for Office 365 (MDO) — προστασία email και collaboration από phishing, malware και κακόβουλα URLs](/images/microsoft-defender-oikogeneia-praktikos-odigos/04-mdo-overview.png)](/images/microsoft-defender-oikogeneia-praktikos-odigos/04-mdo-overview.png)
> 📷 **Εικόνα 4 — Microsoft Defender for Office 365 (MDO).** *Τι είναι και τι προστατεύει.*

**Τι προστατεύει:**

- **Email & μηνύματα** — Safe Attachments, anti-phishing, real-time reports
- **Links/URLs** — Safe Links σε email, Office και Microsoft Teams
- **SharePoint, OneDrive, Teams** — protection και Safe Attachments στο Teams
- **Εσωτερικό mail** — advanced protection ακόμη και για εσωτερική αλληλογραφία

[![MDO βασικές δυνατότητες: Safe Attachments, Safe Links, anti-phishing policies, threat investigation, Automated Investigation, Attack Simulation Training](/images/microsoft-defender-oikogeneia-praktikos-odigos/05-mdo-capabilities.png)](/images/microsoft-defender-oikogeneia-praktikos-odigos/05-mdo-capabilities.png)
> 📷 **Εικόνα 5 — MDO, βασικές δυνατότητες.** *Και αδειοδότηση: Plan 1, Plan 2.*

**Βασικές δυνατότητες:** **Safe Attachments** (ανοίγει συνημμένα σε ασφαλές sandbox περιβάλλον πριν φτάσουν στον χρήστη), **Safe Links** (επανελέγχει τον σύνδεσμο τη στιγμή του click, ακόμη κι αν ήταν ασφαλής όταν στάλθηκε), **anti-phishing policies** με προστασία από user/domain impersonation (διαθέσιμο και στο Plan 1), **Automated Investigation and Response (AIR)** και **Attack Simulation Training** για ρεαλιστικά σενάρια εκπαίδευσης χρηστών.

**Αδειοδότηση:** Plan 1 (π.χ. M365 Business Premium) με Safe Links, Safe Attachments και real-time detection, και Plan 2 (M365 E5, A5, GCC G5) που προσθέτει advanced threat hunting, automation και Explorer/Campaign Views.

**Για τον νέο αναλυτή:** Ένα από τα προϊόντα με το καλύτερο ROI στην ασφάλεια. Για γρήγορο και σωστό setup, ξεκινήστε από τα **Preset security policies** και τον **Configuration Analyzer**.

## Microsoft Defender for Identity (MDI)

**Τι είναι:** Βοηθά τους οργανισμούς να ανιχνεύουν, διερευνούν και αποκρίνονται σε **επιθέσεις βασισμένες στην ταυτότητα**, σε on-premises, cloud και hybrid περιβάλλοντα. Οι επιτιθέμενοι στοχεύουν όλο και περισσότερο users, service accounts και εφαρμογές αντί για συσκευές, για πρόσβαση, κλιμάκωση δικαιωμάτων και persistence.

[![Microsoft Defender for Identity (MDI) — ανίχνευση επιθέσεων ταυτότητας σε on-prem, cloud και hybrid περιβάλλοντα](/images/microsoft-defender-oikogeneia-praktikos-odigos/06-mdi-overview.png)](/images/microsoft-defender-oikogeneia-praktikos-odigos/06-mdi-overview.png)
> 📷 **Εικόνα 6 — Microsoft Defender for Identity (MDI).** *Τι είναι και τι προστατεύει.*

**Τι προστατεύει:**

- **On-prem Active Directory** — σήματα ταυτότητας μέσω lightweight sensors
- **Ταυτότητες & credentials** — users, service accounts, non-human identities
- **Hybrid identity** — συσχέτιση με Entra ID και άλλα IAM συστήματα (π.χ. Okta) μέσω API connectors

[![MDI βασικές δυνατότητες: posture assessments, behavioral analytics, ανίχνευση επιθέσεων, Lateral Movement Paths, investigation context, response actions](/images/microsoft-defender-oikogeneia-praktikos-odigos/07-mdi-capabilities.png)](/images/microsoft-defender-oikogeneia-praktikos-odigos/07-mdi-capabilities.png)
> 📷 **Εικόνα 7 — MDI, βασικές δυνατότητες.** *Και αρχιτεκτονική: sensors, API connectors.*

**Βασικές δυνατότητες:** **posture assessments** μέσω Microsoft Secure Score για μείωση του identity attack surface, **behavioral analytics** για ανίχνευση αποκλίσεων στη συμπεριφορά χρηστών, ανίχνευση επιθέσεων όπως reconnaissance, credential theft, lateral movement, DCShadow και Golden Ticket, καθώς και **Lateral Movement Paths** που αποκαλύπτουν οπτικά πώς ένας επιτιθέμενος μπορεί να φτάσει σε privileged accounts.

**Αρχιτεκτονική:** Lightweight sensors και API connectors τροφοδοτούν cloud-based analytics στο Defender portal.

**Για τον νέο αναλυτή:** Από ένα alert μπορείτε να δείτε τις επηρεαζόμενες ταυτότητες και το lateral movement path προς privileged accounts (π.χ. domain administrators) — και όλα αυτά συσχετίζονται σε ενιαίο incident με σήματα από endpoints και email.

## Microsoft Defender for Cloud Apps (MDA)

**Τι είναι:** Ο **CASB (Cloud Access Security Broker) της Microsoft**. Δίνει visibility σε **Shadow IT**, ελέγχει τη χρήση cloud εφαρμογών και προστατεύει τα δεδομένα τους, πηγαίνοντας πέρα από το παραδοσιακό εύρος ενός CASB.

[![Microsoft Defender for Cloud Apps (MDA) — ο CASB της Microsoft: visibility και control για τις SaaS εφαρμογές](/images/microsoft-defender-oikogeneia-praktikos-odigos/08-mda-overview.png)](/images/microsoft-defender-oikogeneia-praktikos-odigos/08-mda-overview.png)
> 📷 **Εικόνα 8 — Microsoft Defender for Cloud Apps (MDA).** *Τι είναι και τι προστατεύει.*

**Τι προστατεύει:**

- **CASB functionality** — Shadow IT discovery, visibility και προστασία από app-based threats
- **SSPM** — SaaS Security Posture Management
- **Advanced threat protection** — συσχέτιση σε όλο το kill chain, ως μέρος του Defender XDR
- **App-to-app protection** — για OAuth-enabled εφαρμογές με πρόσβαση σε κρίσιμα δεδομένα

[![MDA βασικές δυνατότητες: Cloud Discovery, anomaly detection, adaptive access control, information protection, app governance, XDR correlation](/images/microsoft-defender-oikogeneia-praktikos-odigos/09-mda-capabilities.png)](/images/microsoft-defender-oikogeneia-praktikos-odigos/09-mda-capabilities.png)
> 📷 **Εικόνα 9 — MDA, βασικές δυνατότητες.** *Και ενσωμάτωση με Purview και Defender XDR.*

**Βασικές δυνατότητες:** **Cloud Discovery** (εντοπισμός cloud services με risk ranking και 90+ δείκτες κινδύνου), **anomaly detection**, **adaptive access control** και UEBA, **information protection** με DLP και sensitivity labels που μπορούν να μπλοκάρουν download σε unmanaged device, **app governance** για παρακολούθηση OAuth apps και credentials, και φυσικά **XDR correlation** για incident-level ανίχνευση.

**Για τον νέο αναλυτή:** Μέσω Cloud Discovery εντοπίζετε άγνωστα cloud services, τα αξιολογείτε με δείκτες κινδύνου και προστατεύετε ευαίσθητα δεδομένα — π.χ. μπλοκάροντας download σε unmanaged device ή αφαιρώντας external collaborators. Τα δεδομένα SSPM τροφοδοτούν αυτόματα το Microsoft Secure Score.

## Microsoft Defender for Cloud (MDC)

**Τι είναι:** Η ολοκληρωμένη πλατφόρμα **CNAPP** (Cloud-Native Application Protection Platform) της Microsoft, πλέον βαθιά ενσωματωμένη στο Defender portal. Η threat protection ήταν ήδη εκεί· η ενσωμάτωση προσθέτει **posture management** σε μία ενιαία εμπειρία χωρίς σιλό, υποστηρίζοντας Azure, AWS, GCP και άλλες πλατφόρμες.

[![Microsoft Defender for Cloud (MDC) — CNAPP: ενοποιημένο posture management και threat protection σε multicloud/hybrid](/images/microsoft-defender-oikogeneia-praktikos-odigos/10-mdc-overview.png)](/images/microsoft-defender-oikogeneia-praktikos-odigos/10-mdc-overview.png)
> 📷 **Εικόνα 10 — Microsoft Defender for Cloud (MDC).** *Τι είναι και τι προστατεύει.*

**Τι προστατεύει:**

- **Posture management** — Cloud Secure Score, recommendations, attack paths και cloud vulnerabilities
- **Threat detection & response** — incidents, alerts, response actions, advanced hunting
- **Multicloud & hybrid** — Azure, AWS, GCP και άλλες πλατφόρμες, σε cloud, hybrid και code

[![MDC βασικές δυνατότητες: Cloud Secure Score, recommendations, attack paths, cloud asset inventory, incidents & alerts, Cloud Scopes & RBAC](/images/microsoft-defender-oikogeneia-praktikos-odigos/11-mdc-capabilities.png)](/images/microsoft-defender-oikogeneia-praktikos-odigos/11-mdc-capabilities.png)
> 📷 **Εικόνα 11 — MDC, βασικές δυνατότητες.** *Και πώς ξεκινάς: Cloud Overview dashboard.*

**Βασικές δυνατότητες:** **Cloud Secure Score** με μετρήσιμο posture και prioritized ενέργειες βελτίωσης, **recommendations** για μείωση ρίσκου, **attack paths** και cloud vulnerabilities στο posture, πλήρες **cloud asset inventory** ανά workload και criticality, ενοποιημένα **incidents & alerts** μέσα στο Defender portal, και **Cloud Scopes & RBAC** για granular access ανά business unit ή region.

**Πού ζει:** Defender portal → Cloud security, αν και το onboarding νέων πελατών ξεκινά ακόμη από το Azure portal.

**Για τον νέο αναλυτή:** Ανοίξτε το **Cloud Overview dashboard**, δείτε τα top improvement actions για μείωση ρίσκου και παρακολουθήστε την πρόοδο του Cloud Secure Score διαχρονικά — διαθέσιμο με οποιοδήποτε paid plan.

## Microsoft Defender XDR — η ενοποίηση

Φτάνουμε στην καρδιά της οικογένειας. Το **Microsoft Defender XDR** δεν αντικαθιστά τα προηγούμενα πέντε προϊόντα — τα **ενοποιεί**. Είναι μια ενοποιημένη **pre-breach και post-breach σουίτα άμυνας** που συντονίζει εγγενώς detection, prevention, investigation και response σε endpoints, ταυτότητες, email και εφαρμογές.

[![Microsoft Defender XDR — το ενοποιημένο XDR που συσχετίζει σήματα και δένει όλα τα προϊόντα μαζί](/images/microsoft-defender-oikogeneia-praktikos-odigos/12-xdr-overview.png)](/images/microsoft-defender-oikogeneia-praktikos-odigos/12-xdr-overview.png)
> 📷 **Εικόνα 12 — Microsoft Defender XDR.** *Τι είναι και τι προστατεύει.*

Συσχετίζει τα σήματα από **MDE, MDO, MDI και MDA** σε ένα ενιαίο incident, δείχνοντας πώς μπήκε η επίθεση, τι επηρέασε και πώς εξελίσσεται. Και δεν σταματά εκεί: λαμβάνει **αυτόματες ενέργειες** και κάνει **self-heal** σε mailboxes, endpoints και ταυτότητες.

| Πυλώνας | Πηγή | Τι καλύπτει |
|---|---|---|
| Devices | MDE | Endpoints & vulnerability management |
| Email | MDO | Email & collaboration security |
| Identities | MDI / Entra | On-prem AD & Entra ID Protection |
| Apps & Cloud | MDA / MDC | SaaS apps, DLP, Exposure Management |

**Πώς δένουν όλα μαζί:**

- **Combined incidents queue** — όλα τα alerts ομαδοποιημένα ανά incident, με πλήρες scope και impacted assets
- **Automatic response** — σε πραγματικό χρόνο, π.χ. malware σε endpoint → οδηγία στο MDO να το αφαιρέσει από όλα τα emails
- **Self-healing** — AI-driven playbooks επαναφέρουν devices, ταυτότητες και mailboxes σε ασφαλή κατάσταση
- **Cross-product hunting** — custom queries πάνω σε 30 ημέρες raw signals από endpoint και Office data
- **Full attack story** — alerts, suspicious events και impacted assets ενωμένα σε incidents που αφηγούνται την επίθεση
- **Single pane of glass** — μία κεντρική εικόνα detections, ενεργειών και evidence στο Defender portal

### Ένα ρεαλιστικό σενάριο επίθεσης

Ας δούμε πώς όλα αυτά συνδέονται στην πράξη:

1. Ένας χρήστης λαμβάνει **phishing email**. Το **MDO** εντοπίζει το ύποπτο μήνυμα.
2. Ο χρήστης ανοίγει το κακόβουλο αρχείο. Το **MDE** καταγράφει τη συμπεριφορά του malware στο endpoint.
3. Ο επιτιθέμενος προσπαθεί να αποκτήσει credentials. Το **MDI** εντοπίζει ασυνήθιστη δραστηριότητα ταυτότητας.
4. Το **Defender XDR** ενώνει όλα τα δεδομένα σε **ένα incident** — όχι τρία ξεχωριστά alerts σε τρία διαφορετικά εργαλεία.
5. Ακολουθούν αυτόματες ενέργειες: απομόνωση συσκευής, απενεργοποίηση λογαριασμού, αφαίρεση του email από όλα τα mailboxes, blocking indicators σε όλη τη σουίτα.

Αυτό είναι το πραγματικό πλεονέκτημα της ενοποίησης: αντί για δεκάδες απομονωμένα alerts, έχουμε **μία ολοκληρωμένη ιστορία επίθεσης**.

[![Παράδειγμα ενοποίησης σημάτων στο Microsoft Defender XDR από endpoint, email και identity σε ένα incident](/images/microsoft-defender-oikogeneia-praktikos-odigos/13-xdr-integration.png)](/images/microsoft-defender-oikogeneia-praktikos-odigos/13-xdr-integration.png)
> 📷 **Εικόνα 13 — Πώς δένουν όλα μαζί στο Defender XDR.** *Combined incidents queue, automatic response, self-healing, cross-product hunting.*

**Πώς ξεκινάτε:** Το Defender XDR συσχετίζει μόνο licensed και provisioned προϊόντα. Η ενεργοποίηση γίνεται στο **security.microsoft.com**.

[![Η οικογένεια Microsoft Defender με μια ματιά — έξι προϊόντα, ένα portal, μία ενοποιημένη άμυνα](/images/microsoft-defender-oikogeneia-praktikos-odigos/14-summary.png)](/images/microsoft-defender-oikogeneia-praktikos-odigos/14-summary.png)
> 📷 **Εικόνα 14 — Η οικογένεια Microsoft Defender με μια ματιά.** *Έξι προϊόντα, ένα portal, μία ενοποιημένη άμυνα.*

## Τρία πράγματα που αξίζει να θυμάστε

1. **Δεν υπάρχει ένα προϊόν που λύνει όλα τα προβλήματα.** Κάθε Defender προστατεύει διαφορετική επιφάνεια επίθεσης, και η στρατηγική ασφάλειας χτίζεται πάνω σε αυτή τη διαφοροποίηση, όχι ενάντια σε αυτήν.
2. **Η πραγματική δύναμη βρίσκεται στο Defender XDR.** Η συσχέτιση των δεδομένων απ' όλα τα προϊόντα επιτρέπει ταχύτερη ανίχνευση και απόκριση απ' ό,τι θα επέτρεπε το κάθε προϊόν μεμονωμένα.
3. **Όσο περισσότερα workloads ενεργοποιείτε** (identity, email, cloud apps, endpoints), **τόσο πιο πλούσια γίνεται η εικόνα ασφαλείας** του οργανισμού, και τόσο πιο αποτελεσματική η συνολική άμυνα.

## Θες να εμβαθύνεις περισσότερο;

> 🔗 **Αν θέλεις μια πιο αναλυτική, βήμα-βήμα ματιά στα ίδια προϊόντα στα αγγλικά,** με πραγματικά screenshots από το Defender portal, δες τη σειρά **Microsoft Defender Demystified**:
>
> - **[Part 1 — All Products, Which One Do You Need](/posts/defender-demystified-series/defender-demystified-part-1-what-is-microsoft-defender/)**
> - **[Part 2 — The Four Core XDR Workloads, Up Close](/posts/defender-demystified-series/defender-demystified-part-2-four-workloads/)**
> - **[Part 3 — Microsoft Defender for Cloud](/posts/defender-demystified-series/defender-demystified-part-3-defender-for-cloud/)**

Αν σε ενδιαφέρει πώς όλα αυτά τα σήματα τροφοδοτούν το **Microsoft Secure Score** και πώς μπορεί να γίνει η ραχοκοκαλιά ενός προγράμματος **GRC** ευθυγραμμισμένου με **ISO 27001** και **NIS2**, διάβασε επίσης **[Microsoft Secure Score: Πρακτικός Οδηγός για τον ΥΑΣΠΕ NIS2](/posts/secure-score-defender-praktikos-odigos/)**.

Follow me στο [LinkedIn](https://www.linkedin.com/in/dimosthenisatteia/) για ειδοποιήσεις για νέα άρθρα, ή κάνε subscribe μέσω RSS στην κορυφή της σελίδας.

## Πηγές & επιπλέον υλικό

- [Microsoft Defender for Endpoint overview](https://learn.microsoft.com/en-us/defender-endpoint/microsoft-defender-endpoint)
- [Why do I need Microsoft Defender for Office 365?](https://learn.microsoft.com/en-us/defender-office-365/mdo-about)
- [Microsoft Defender for Identity overview](https://learn.microsoft.com/en-us/defender-for-identity/what-is)
- [What is Microsoft Defender for Cloud Apps?](https://learn.microsoft.com/en-us/defender-cloud-apps/what-is-defender-for-cloud-apps)
- [Microsoft Defender for Cloud overview](https://learn.microsoft.com/en-us/azure/defender-for-cloud/defender-for-cloud-introduction)
- [What is Microsoft Defender XDR?](https://learn.microsoft.com/en-us/defender-xdr/microsoft-365-defender)

- [Microsoft Defender](/tags/microsoft-defender/)
- [Microsoft Defender for Endpoint](/tags/microsoft-defender-for-endpoint/)
- [Microsoft Defender for Office 365](/tags/microsoft-defender-for-office-365/)
- [Microsoft Defender for Identity](/tags/microsoft-defender-for-identity/)
- [Microsoft Defender for Cloud Apps](/tags/microsoft-defender-for-cloud-apps/)
- [Microsoft Defender XDR](/tags/microsoft-defender-xdr/)
- [Microsoft 365 Security](/tags/microsoft-365-security/)
- [Cyber GRC](/tags/cyber-grc/)
- [Junior Μηχανικός Ασφάλειας](/tags/junior-%CE%BC%CE%B7%CF%87%CE%B1%CE%BD%CE%B9%CE%BA%CF%8C%CF%82-%CE%B1%CF%83%CF%86%CE%AC%CE%BB%CE%B5%CE%B9%CE%B1%CF%82/)
