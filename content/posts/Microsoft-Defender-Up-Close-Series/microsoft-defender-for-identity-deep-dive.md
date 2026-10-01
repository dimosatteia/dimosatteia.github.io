---
title: "Microsoft Defender for Identity: Πώς οι sensors εντοπίζουν επιθέσεις μετά την παραβίαση"
date: 2026-09-28T10:00:00+03:00
lastmod: 2026-09-28T18:45:00+03:00
draft: true
keywords:
  - Microsoft Defender for Identity
  - Microsoft Defender for Identity οδηγός
  - Defender for Identity sensor v3
  - Defender for Identity sensor εγκατάσταση
  - Defender for Identity domain controllers AD FS AD CS
  - Defender for Identity Microsoft Entra ID
  - Defender for Identity alerts
  - Honeytoken Defender for Identity
  - Pass-the-hash Golden Ticket DCSync ανίχνευση
  - Identity threat detection and response
tags:
  - Microsoft Defender for Identity
  - Microsoft Defender XDR
  - Identity Security
  - ITDR
  - Active Directory
  - Microsoft Entra ID
  - Microsoft 365 Security
author: "Dimosthenis Atteia"
description: "Πρακτικός οδηγός για το Microsoft Defender for Identity: sensors v3.x και v2.x, ανάπτυξη σε domain controllers, alerts και βασικές ρυθμίσεις."
summary: "Το Microsoft Defender for Identity όπως το χρειάζεται ένας επαγγελματίας στην πράξη. Τι είναι οι sensors και πού μπαίνουν, πώς επιλέγετε ανάμεσα σε sensor v3.x και v2.x, η ενιαία προβολή AD και Microsoft Entra ID, και τα alerts που αξίζει να ρυθμίσετε πρώτα."
categories: ["Identity & Access"]
series: ["Microsoft Defender Up Close"]
slug: 
ShowToc: true
TocOpen: false
weight: -6
cover:
  image: "/images/MDE/MDI.png"
  alt: "Microsoft Defender for Identity, αναλυτικός οδηγός"
  caption: "Microsoft Defender Up Close"
  relative: true
ShowReadingTime: true
ShowWordCount: true
---

## Γιατί αυτό είναι το αγαπημένο μου

Στο **[2ο μέρος της σειράς Defender Demystified](/posts/Defender-Demystified-Series/defender-demystified-part-2-four-workloads/)** είπα ότι το Microsoft Defender for Identity είναι το workload που βρίσκω πιο ενδιαφέρον. Ο λόγος είναι ότι πιάνει αυτό που τα άλλα τρία δεν μπορούν: **τι κάνει ένας επιτιθέμενος αφού έχει ήδη έγκυρα διαπιστευτήρια**.

Ένας επιτιθέμενος που κάνει phishing σε έναν κωδικό, τον αγοράζει από κάποιο infostealer marketplace ή τον εξάγει από ένα παραβιασμένο laptop, κατέχει πλέον μια έγκυρη ταυτότητα. Από εκείνο το σημείο, τα εργαλεία endpoint και email έχουν πολύ λίγα να πουν, αφού ο επιτιθέμενος συμπεριφέρεται ως νόμιμος χρήστης. Το **[Microsoft Defender for Identity](https://learn.microsoft.com/en-us/defender-for-identity/what-is)** είναι το workload που το αντιλαμβάνεται.

Αυτό το άρθρο είναι ο πρακτικός οδηγός: τι κάνουν οι sensors, ποια έκδοση sensor χρειάζεστε και πώς την αναπτύσσετε, πώς βλέπετε μαζί AD και Microsoft Entra ID, και ποια alerts αξίζουν την προσοχή σας την πρώτη εβδομάδα.

## Τι παρακολουθεί πραγματικά το Microsoft Defender for Identity

Τρεις βασικές πηγές telemetry ταυτότητας:

- **On-premises Active Directory**: κίνηση αυθεντικοποίησης, LDAP queries, αλλαγές σε ευαίσθητες ομάδες, δραστηριότητα Kerberos
- **Υποδομή ταυτότητας γύρω από το AD**: Active Directory Federation Services (AD FS), Active Directory Certificate Services (AD CS) και Microsoft Entra Connect, όπου υπάρχουν
- **Microsoft Entra ID**: σήματα cloud και υβριδικής ταυτότητας, καθώς και άλλοι παρόχοι ταυτότητας (π.χ. Okta) μέσω API connectors

Το Microsoft Defender for Identity συσχετίζει όλα αυτά σε μια ενιαία προβολή ανά χρήστη, με κέντρο την ταυτότητα: *«αυτά είναι όλα όσα συμβαίνουν με αυτόν τον λογαριασμό, σε on-prem και cloud»*. Αυτή η δυνατότητα της ενιαίας προβολής είναι ο λόγος ύπαρξης του προϊόντος.

## Τι κάνουν οι sensors, σε μία παράγραφο

Ο sensor του Microsoft Defender for Identity τρέχει πάνω στους servers της υποδομής ταυτότητας. Καταγράφει και αναλύει τοπικά την κίνηση δικτύου και τα Windows events του host, κρατά μόνο τα σήματα που χρειάζονται για την ανίχνευση και τα στέλνει στην cloud υπηρεσία του Microsoft Defender for Identity. Είναι σχεδιασμένος να λειτουργεί αθόρυβα, κάτι που μετράει, γιατί οι domain controllers δεν είναι servers που θέλετε να φορτώνετε.

## Ποιον sensor χρειάζεστε: v3.x ή v2.x

Σήμερα υπάρχουν δύο εκδόσεις sensor, και η επιλογή εξαρτάται από το λειτουργικό του server:

- **Sensor v3.x**: για servers με **Windows Server 2019 ή νεότερο** και το cumulative update του Ιουλίου 2026 ή μεταγενέστερο. Είναι η προτεινόμενη επιλογή. Τρέχει πάντα ως **LocalSystem** και δεν χρησιμοποιεί Directory Service account ή gMSA.
- **Sensor v2.x**: για servers με **Windows Server 2016 ή παλαιότερο**. Χρησιμοποιεί Directory Service account (με προτεινόμενο το gMSA) για να διαβάζει πληροφορίες από το AD.

Οι δύο εκδόσεις συνυπάρχουν στο ίδιο workspace, οπότε ένα μικτό περιβάλλον είναι απολύτως φυσιολογικό. Δύο σημεία προσοχής: ο v3.x δεν υποστηρίζει VPN integration ούτε syslog notifications, οπότε αν τα χρειάζεστε, κρατήστε v2.x στους σχετικούς DCs. Επίσης, αν έστω και ένας sensor σας είναι v3.x, η Microsoft ζητά να επιλέξετε **Automatically use the sensor's local system account** στη σελίδα **Manage action accounts**.

**Πού μπαίνουν sensors:** σε **όλους** τους domain controllers, συμπεριλαμβανομένων των read-only (RODC), καθώς και στους AD FS, AD CS και Microsoft Entra Connect servers που δεν είναι DCs. Ένας sensor βλέπει μόνο τον host στον οποίο τρέχει, οπότε αν παραλείψετε κάποιον, οι επιθέσεις που καταλήγουν εκεί είναι αόρατες. Η αδειοδότηση είναι ανά χρήστη και όχι ανά sensor, άρα δεν υπάρχει λόγος κόστους να παραλείψετε κάποιον.

## Η ροή ανάπτυξης, σε υψηλό επίπεδο

[![Η καρτέλα Sensor management στο Defender portal](/images/Microsoft-Defender/mdi-01-sensor-management.webp)](/images/Microsoft-Defender/mdi-01-sensor-management.webp)
📷 **Εικόνα 1**: Καρτέλα Sensor management στο Defender portal. Defender portal → Settings → Identities → Sensor management.

**Για sensor v3.x (Windows Server 2019+):**

1. **Onboarding στο Microsoft Defender for Endpoint.** Οι servers που είναι ήδη στο MDE εμφανίζονται στην καρτέλα **Sensor management** ως έτοιμοι για ενεργοποίηση. Οι AD FS, AD CS και Entra Connect servers πρέπει οπωσδήποτε να είναι στο MDE. Για domain controllers που δεν είναι στο MDE, υπάρχει ξεχωριστό onboarding package του v3.x.
2. **Ενεργοποίηση του sensor** από την καρτέλα Sensor management, είτε ανά server είτε με την επιλογή αυτόματης ενεργοποίησης για τους DCs.
3. **Ρύθμιση Windows event auditing και RPC auditing**, όπως περιγράφει ο οδηγός της Microsoft.
4. **Επαλήθευση** ότι οι sensors εμφανίζονται υγιείς.

**Για sensor v2.x (Windows Server 2016 ή παλαιότερο):**

1. Έλεγχος προαπαιτουμένων και σχεδιασμός χωρητικότητας.
2. Εγκατάσταση του πακέτου του sensor v2.x σε κάθε server.
3. Ρύθμιση Windows event auditing.
4. Δημιουργία **Directory Service account**, κατά προτίμηση gMSA, με δικαιώματα μόνο ανάγνωσης. Η Microsoft παρέχει [αναλυτικό οδηγό](https://learn.microsoft.com/en-us/defender-for-identity/deploy/directory-service-accounts).
5. Επαλήθευση της υγείας των sensors.

Ξεκινήστε με έναν πιλοτικό DC, επιβεβαιώστε ότι ρέει το telemetry και μετά επεκτείνετε.

[![Υγιείς sensors του Microsoft Defender for Identity](/images/Microsoft-Defender/mdi-02-sensor-health.webp)](/images/Microsoft-Defender/mdi-02-sensor-health.webp)
📷 **Εικόνα 2**: Υγιείς sensors μετά την ανάπτυξη. Defender portal → Settings → Identities → Sensor management.

## Η ενιαία προβολή AD και Microsoft Entra ID

Το Microsoft Defender for Identity τροφοδοτεί με σήματα ταυτότητας το Microsoft Defender portal, όπου συσχετίζονται με δεδομένα από endpoints, email, SaaS εφαρμογές και άλλες πηγές. Το **Identity inventory** συγκεντρώνει σε ένα σημείο τους λογαριασμούς από το Active Directory και το Microsoft Entra ID.

[![Ενιαία προβολή ταυτότητας AD και Microsoft Entra ID](/images/Microsoft-Defender/mdi-03-unified-identity-view.webp)](/images/Microsoft-Defender/mdi-03-unified-identity-view.webp)
📷 **Εικόνα 3**: Ενιαία προβολή ταυτότητας στο Defender portal. Defender portal → Assets → Identities.

Το αποτέλεσμα: αποκτάτε **μία προβολή ανά χρήστη** που καλύπτει τόσο την on-prem όσο και την cloud ταυτότητα. Αυτό είναι πραγματικά χρήσιμο. Παλαιότερα, οι αναλυτές έπρεπε να μετακινούνται μεταξύ του Defender for Identity (για τα on-prem σήματα) και του Microsoft Entra ID Protection (για τα cloud σήματα). Τώρα ένα μόνο incident συσχετίζει και τις δύο επιφάνειες.

## Ποια alerts να περιμένετε την πρώτη εβδομάδα

Το Microsoft Defender for Identity έρχεται με ενσωματωμένες ανιχνεύσεις για όλες τις φάσεις μιας επίθεσης ταυτότητας. Ενδεικτικά, με τα ονόματα των classic alerts:

**Reconnaissance**: ένας επιτιθέμενος χαρτογραφεί το περιβάλλον σας:
- Account enumeration
- LDAP reconnaissance
- Network mapping reconnaissance μέσω DNS
- Security principal reconnaissance

**Compromised credentials**: ένας επιτιθέμενος χρησιμοποιεί κλεμμένα διαπιστευτήρια:
- Suspected brute-force attack
- Suspected AS-REP roasting
- Δραστηριότητα από honeytoken account

**Lateral movement**: ένας επιτιθέμενος κινείται μέσα στο δίκτυό σας:
- Suspected pass-the-hash attack
- Suspected pass-the-ticket attack
- Suspected overpass-the-hash attack
- Remote code execution attempt

**Domain dominance**: ένας επιτιθέμενος εδραιώνει τον έλεγχο:
- Suspected Golden Ticket usage
- Suspected DCSync attack
- Suspected skeleton key attack
- Suspicious modification of sensitive groups

Να ξέρετε ότι η Microsoft βρίσκεται σε μετάβαση προς ενιαία μορφή alerts. Γι' αυτό τα alerts του MDI εμφανίζονται σε δύο μορφές, classic και Defender-format, και κάποιες ανιχνεύσεις μπορεί να εμφανίζονται με διαφορετικό όνομα. Το πεδίο **Detection source** σας λέει ποια μορφή βλέπετε.

[![Alerts ταυτότητας στο Microsoft Defender portal](/images/Microsoft-Defender/mdi-04-identity-alerts.webp)](/images/Microsoft-Defender/mdi-04-identity-alerts.webp)
📷 **Εικόνα 4**: Ενεργά alerts ταυτότητας. Defender portal → Incidents & alerts → Alerts.

Η ειλικρινής καθοδήγηση: περιμένετε μερικά alerts χαμηλής βεβαιότητας την πρώτη εβδομάδα, τα περισσότερα αθώα. Πράγματα όπως penetration testers σε προγραμματισμένη αξιολόγηση, νόμιμα εργαλεία διαχείρισης που μοιάζουν με reconnaissance, και service accounts που κάνουν LDAP queries που φαίνονται περίεργα εκτός πλαισίου. **Ρυθμίστε τις εξαιρέσεις**, μην απενεργοποιείτε τα alerts. Για τα classic alerts οι εξαιρέσεις ορίζονται στο **Settings → Identities → Excluded entities**, ενώ για τα Defender-format alerts χρησιμοποιείτε τα **alert tuning rules** του Microsoft Defender.

## Οι ρυθμίσεις που αξίζει να κάνετε

**Directory Service account (μόνο για v2.x)**: με σωστά δικαιώματα από την αρχή. Μη χρησιμοποιείτε Domain Admin, αλλά το τεκμηριωμένο gMSA ελάχιστων δικαιωμάτων (least privilege). Οι sensors v3.x δεν το χρειάζονται.

**Ευαίσθητοι λογαριασμοί (Entity tags)**: στο **Settings → Identities**, στην ετικέτα **Sensitive**, ορίστε ποιοι χρήστες, συσκευές και ομάδες πρέπει να αντιμετωπίζονται ως ιδιαίτερα πολύτιμοι. Ομάδες όπως οι Domain Admins, Enterprise Admins και Schema Admins θεωρούνται ευαίσθητες από προεπιλογή. Προσθέστε τους Tier 0 service accounts σας και όποιες custom ομάδες διαχειριστών διατηρείτε. Κάποιες ανιχνεύσεις, όπως οι αλλαγές σε ευαίσθητες ομάδες, βασίζονται σε αυτή την ετικέτα για να λειτουργήσουν σωστά.

[![Η ετικέτα Sensitive στα entity tags του Microsoft Defender for Identity](/images/Microsoft-Defender/mdi-05-entity-tags-sensitive.webp)](/images/Microsoft-Defender/mdi-05-entity-tags-sensitive.webp)
📷 **Εικόνα 5**: Entity tags, ετικέτα Sensitive. Defender portal → Settings → Identities → Sensitive.

**Honeytoken accounts**: από το ίδιο σημείο, με την ετικέτα **Honeytoken**, ορίζετε λογαριασμούς-δολώματα (decoy) που δεν πρέπει ποτέ να χρησιμοποιηθούν. Οποιαδήποτε σύνδεση από αυτούς προκαλεί alert. Μου αρέσουν, γιατί είναι πραγματικά χρήσιμα σήματα και το κόστος ρύθμισης είναι ελάχιστο.

**Ενέργειες απόκρισης (response actions)**: το Microsoft Defender for Identity μπορεί να απενεργοποιήσει έναν λογαριασμό ή να επιβάλει αλλαγή κωδικού στο AD όταν επιβεβαιωθεί κακόβουλη δραστηριότητα. Τις ενέργειες αυτές τις εκτελούν οι sensors στους domain controllers. Από προεπιλογή χρησιμοποιούν τον λογαριασμό LocalSystem του DC, και αυτή είναι και η σύσταση της Microsoft. Ένα ξεχωριστό gMSA ως **[action account](https://learn.microsoft.com/en-us/defender-for-identity/deploy/manage-action-accounts)** είναι προαιρετικό, αφορά μόνο τους sensors v2.x, και δεν πρέπει να είναι ο ίδιος λογαριασμός με τον Directory Service account. Χρησιμοποιήστε τις ενέργειες αυτές προσεκτικά και σταδιακά.

## Ένα ρεαλιστικό πλάνο για τον πρώτο μήνα

- **Εβδομάδα 1**: Καταγραφή των servers ανά λειτουργικό (v3.x ή v2.x). Onboarding στο MDE όπου χρειάζεται. Ενεργοποίηση ή εγκατάσταση sensor σε ένα πιλοτικό ζεύγος DCs και επαλήθευση του telemetry.
- **Εβδομάδα 2**: Επέκταση σε όλους τους υπόλοιπους DCs και στους AD FS, AD CS και Entra Connect servers. Για τους v2.x, σωστή ρύθμιση του gMSA.
- **Εβδομάδα 3**: Ρύθμιση των ετικετών Sensitive, ανάπτυξη honeytoken accounts, ανασκόπηση της πρώτης παρτίδας alerts.
- **Εβδομάδα 4**: Ρύθμιση εξαιρέσεων για τον αθώο θόρυβο, έλεγχος των ρυθμίσεων στο Manage action accounts και σταδιακή χρήση των response actions, προγραμματισμός μηνιαίας ανασκόπησης alerts.

## Πού να συνεχίσετε από εδώ

> 🔗 **Διαβάστε την υπόλοιπη σειρά Microsoft Defender Up Close:** **[Microsoft Defender for Endpoint](/posts/microsoft-defender-for-endpoint-deep-dive/)**, **[Microsoft Defender for Office 365](/posts/microsoft-defender-for-office-365-deep-dive/)**, **[Microsoft Defender for Cloud Apps](/posts/microsoft-defender-for-cloud-apps-deep-dive/)**.

> 🔗 **Θέλετε να δείτε πώς τα σήματα ταυτότητας τροφοδοτούν την τεκμηρίωση συμμόρφωσης;** Διαβάστε το **[How We Built a Gold-Winning GRC Programme on Microsoft Secure Score](/posts/secure-score-grc-part-0-intro/)**.

Ακολουθήστε με στο [LinkedIn](https://www.linkedin.com/in/dimosthenisatteia/) για ειδοποιήσεις νέων άρθρων.

## Πηγές Microsoft Learn

- [Microsoft Defender for Identity, επισκόπηση](https://learn.microsoft.com/en-us/defender-for-identity/what-is)
- [Ανάπτυξη των sensors του Microsoft Defender for Identity (v3.x και v2.x)](https://learn.microsoft.com/en-us/defender-for-identity/deploy/deploy-defender-identity)
- [Directory Service accounts (sensor v2.x)](https://learn.microsoft.com/en-us/defender-for-identity/deploy/directory-service-accounts)
- [Alerts του Microsoft Defender for Identity](https://learn.microsoft.com/en-us/defender-for-identity/alerts-overview)
- [Entity tags: Sensitive, Honeytoken, Exchange server](https://learn.microsoft.com/en-us/defender-for-identity/entity-tags)
- [Identity inventory: ενιαία προβολή AD και Microsoft Entra ID](https://learn.microsoft.com/en-us/defender-for-identity/identity-inventory)

---

<!--
IMAGE NOTES
Image 1: mdi-01-sensor-management.webp  (Defender portal → Settings → Identities → Sensor management.)
Image 2: mdi-02-sensor-health.webp  (Defender portal → Settings → Identities → Sensor management.)
Image 3: mdi-03-unified-identity-view.webp  (Defender portal → Assets → Identities.)
Image 4: mdi-04-identity-alerts.webp  (Defender portal → Incidents & alerts → Alerts.)
Image 5: mdi-05-entity-tags-sensitive.webp  (Defender portal → Settings → Identities → Sensitive.)
Save to /static/images/Microsoft-Defender/
-->
