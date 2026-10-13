---
title: "Generally Available: Το Defender for Identity ενεργοποιεί μόνο του τον sensor v3.x και το Windows auditing"
seoTitle: "GA: Αυτόματη ενεργοποίηση sensor v3.x στο Defender for Identity"
date: 2026-10-12T12:00:00+03:00
lastmod: 2026-10-12T12:00:00+03:00
draft: false
keywords:
  - Microsoft Defender for Identity
  - sensor v3.x automatic activation
  - Automatic Windows auditing configuration
  - MC1484018
  - Domain Controller auditing
  - Defender for Identity opt out
  - NIS2 event logging
tags:
  - Microsoft Defender for Identity
  - Microsoft Defender XDR
  - Active Directory
  - Identity Security
  - NIS2
  - ISO 27001
  - GRC
author: "Dimosthenis Atteia"
description: "Το Microsoft Defender for Identity ενεργοποιεί πλέον αυτόματα τον sensor v3.x και το Windows auditing στους servers ταυτότητας που είναι ήδη στο Defender for Endpoint. Τι αλλάζει, πότε, πώς κάνεις opt out και τι κρατάς ως τεκμήριο."
seoDescription: "Το Defender for Identity ενεργοποιεί αυτόματα τον sensor v3.x και το Windows auditing. Τι αλλάζει, πότε ξεκινά, πώς κάνεις opt out και τι τεκμήριο κρατάς."
summary: "Από τα τέλη Οκτωβρίου 2026 το Defender for Identity ενεργοποιεί μόνο του τον sensor v3.x και τις ρυθμίσεις auditing στους Domain Controllers και στους άλλους servers ταυτότητας. Δες τι ακριβώς αγγίζει, πώς το ελέγχεις και πώς το περνάς από τη διαχείριση αλλαγών."
categories: ["Identity & Access"]
releases:
  - "generally-available"
ShowToc: true
TocOpen: false
cover:
  image: "https://learn.microsoft.com/en-us/defender-for-identity/deploy/media/activated-sensor.png"
  alt: "Η καρτέλα Sensor management στο Microsoft Defender portal μετά την ενεργοποίηση του sensor v3.x"
  caption: "Πηγή εικόνας: Microsoft Learn"
  relative: false
# Πλαίσιο «Last verified»: κάθε χαρακτηριστικό με τη φάση, την άδεια, την πηγή και την ημερομηνία ελέγχου
verification:
  - feature: "Automatic sensor v3.x activation και automatic Windows auditing"
    status: "Generally Available"
    license: "Defender for Identity (E5, E5 Security, EMS E5 ή standalone)"
    source: "https://learn.microsoft.com/en-us/defender-for-identity/whats-new"
    verified: 2026-10-13
  - feature: "MC1484018: αυτόματη ενεργοποίηση σε υπάρχοντες πελάτες από τα τέλη Οκτωβρίου 2026"
    status: "Generally Available"
    license: "Defender for Identity"
    source: "https://mc.merill.net/message/MC1484018"
    verified: 2026-10-13
  - feature: "Sensor v3.x activation χωρίς Defender for Endpoint"
    status: "Generally Available"
    license: "Defender for Identity"
    source: "https://learn.microsoft.com/en-us/defender-for-identity/deploy/activate-sensor"
    verified: 2026-10-13
  - feature: "Sensor v3.x σε AD FS, AD CS και Entra Connect servers εκτός Domain Controllers"
    status: "Public Preview"
    license: "Defender for Identity"
    source: "https://learn.microsoft.com/en-us/defender-for-identity/whats-new"
    verified: 2026-10-13
  - feature: "Automatic Windows event auditing"
    status: "Generally Available"
    license: "Defender for Identity"
    source: "https://learn.microsoft.com/en-us/defender-for-identity/deploy/configure-windows-event-collection"
    verified: 2026-10-13
---

Όποιος έχει στήσει Defender for Identity ξέρει ότι το δύσκολο κομμάτι δεν ήταν ποτέ η εγκατάσταση του sensor. Ήταν το auditing. Ο sensor βλέπει μόνο ό,τι του δίνουν τα Windows events, και αν το Advanced Audit Policy, τα SACL στο domain ή το NTLM auditing δεν είναι σωστά ρυθμισμένα, ο Domain Controller φαίνεται «υγιής» στο portal ενώ στην πράξη μένουν τυφλά σημεία. Για αυτό ακριβώς το Defender for Identity απέκτησε πριν από λίγους μήνες health issue για τα Windows events που λείπουν, που το είχα γράψει στο [Defender for Identity: Το νέο health issue που σου λέει πότε «τυφλώνεσαι» σε έναν Domain Controller](/posts/new-features/defender-for-identity-health-issue-missing-windows-events/).

Η Microsoft κάνει τώρα το επόμενο βήμα: ο sensor v3.x και το Windows auditing ενεργοποιούνται **αυτόματα**, ως προεπιλογή, και η αλλαγή είναι Generally Available.

## Τι αλλάζει

Υπάρχουν δύο ρυθμίσεις, και οι δύο στο Defender portal, στο **Settings → Identities → Advanced features**:

- **Automatic sensor v3.x activation.** Όταν είναι ενεργή, το Defender for Identity ενεργοποιεί τον sensor v3.x σε κάθε κατάλληλο server που είναι ήδη onboarded στο Defender for Endpoint και τρέχει Windows Server 2019 ή νεότερο. Δεν εγκαθιστά ξεχωριστό πακέτο: ο sensor v3.x είναι δυνατότητα του Defender for Endpoint που απλώς ενεργοποιείται. Servers που έχουν ήδη sensor του Defender for Identity δεν αγγίζονται.
- **Automatic Windows auditing configuration.** Όταν είναι ενεργή, ο sensor ελέγχει τις ρυθμίσεις auditing του server, βρίσκει τι λείπει και το διορθώνει στο local system policy. Η ρύθμιση ξαναεφαρμόζεται μία φορά κάθε 24 ώρες.

Οι κατάλληλοι servers είναι οι Domain Controllers και, σε Preview, οι servers AD FS, AD CS και Microsoft Entra Connect που δεν είναι Domain Controllers.

## Ποιους αφορά και πότε

Η αλλαγή έρχεται με δύο τρόπους, ανάλογα με το πού βρίσκεσαι:

| Περίπτωση | Τι γίνεται |
|---|---|
| **Νέος πελάτης**: η πρώτη συσκευή μπήκε στο Defender for Endpoint από τις 13 Σεπτεμβρίου 2026 και δεν υπάρχει workspace του Defender for Identity | Μόλις εντοπιστεί κατάλληλος server ταυτότητας, δημιουργείται αυτόματα workspace και οι δύο ρυθμίσεις είναι ενεργές από την αρχή. |
| **Υπάρχων πελάτης του Defender for Identity** | Σταδιακή διάθεση. Πρώτα εμφανίζεται ειδοποίηση στο portal με επιλογή opt out. Μετά τη λήξη της, οι ρυθμίσεις ενεργοποιούνται. |

Σύμφωνα με την ανακοίνωση MC1484018 της 30ής Σεπτεμβρίου 2026, η αυτόματη ενεργοποίηση στους υπάρχοντες πελάτες ξεκινά σταδιακά στα τέλη Οκτωβρίου 2026 και η διάθεση κρατά έως τα τέλη Νοεμβρίου. Οι ημερομηνίες διαφέρουν ανά tenant, οπότε κοίτα την ανακοίνωση στο δικό σου Message Center.

Και οι δύο λειτουργίες απαιτούν ενεργή άδεια που περιλαμβάνει Microsoft Defender for Identity: Microsoft 365 E5, Microsoft 365 E5 Security, Enterprise Mobility + Security E5 ή το standalone. Το Microsoft 365 E3 δεν το καλύπτει.

## Τι ακριβώς ρυθμίζει το αυτόματο auditing

Αυτό είναι το σημείο που θα ρωτήσει η ομάδα του Active Directory, και καλά θα κάνει. Ο sensor γράφει απευθείας σε ρυθμίσεις του server:

| Περιοχή | Τι αλλάζει |
|---|---|
| Directory services | Προσθέτει audit entries στο SACL του domain root object. |
| NTLM auditing | Ορίζει τις τιμές registry που χρειάζεται το NTLM auditing. |
| Domain objects | Αλλάζει το SACL του Configuration partition. |
| AD FS | SACL στο AD FS configuration container και advanced audit policy **Audit Application Generated** (Success και Failure). Το event auditing μέσα στο AD FS Management και το verbose logging μένουν χειροκίνητα. |
| AD CS | Γράφει την απαιτούμενη τιμή στο audit filter της CA. Δεν δημιουργεί filter αν δεν υπάρχει, και η αλλαγή ισχύει μετά από restart του `certsvc`. Μέχρι τότε εμφανίζεται health alert. |
| Microsoft Entra Connect | Advanced audit policy **Audit Logon** (Success και Failure). |
| Windows audit policy | Τα local audit policies που χρειάζεται ο sensor. |

Ένα πρακτικό σημείο: αν έχεις GPO που ορίζει διαφορετικά audit policies, το GPO μπορεί να ακυρώνει όσα γράφει ο sensor, και το επόμενο 24ωρο ο sensor θα τα ξαναγράψει. Αν δεις ρυθμίσεις που «δεν κρατάνε», ο πρώτος ύποπτος είναι ένα GPO σε σύγκρουση. Το auditing δουλεύει μόνο με τον sensor v3.x, όχι με τον v2.x.

## Ενεργοποίηση ή opt out

Αν είσαι υπάρχων πελάτης, άνοιξε το **Settings → Identities → On-premises → Sensor management**. Εκεί εμφανίζεται η ειδοποίηση με δύο επιλογές:

- **Go to Advanced features**, για να ενεργοποιήσεις τις ρυθμίσεις μόνος σου, με τον δικό σου χρόνο.
- **Opt out**, για να μη γίνει η ενεργοποίηση αυτόματα.

Αν χάσεις το παράθυρο του opt out, δεν κλειδώνεσαι. Οι δύο ρυθμίσεις αλλάζουν οποτεδήποτε από το **Advanced features**. Αν απενεργοποιήσεις το αυτόματο auditing, οφείλεις να ρυθμίσεις το auditing με GPO ή PowerShell, αλλιώς ο sensor θα σου βγάζει health issues για events που λείπουν.

Η δική μου σύσταση: μην το αφήσεις να γίνει «από μόνο του». Ένας Domain Controller είναι Tier 0. Οποιαδήποτε αλλαγή σε SACL και audit policy περνά από τη διαδικασία διαχείρισης αλλαγών, ακόμα κι όταν την κάνει η ίδια η Microsoft. Πρότεινε τη στο επόμενο CAB, ενεργοποίησέ τη συνειδητά με **Go to Advanced features** και κράτα την απόφαση στο αρχείο.

## Και κάτι ακόμα: GA χωρίς Defender for Endpoint

Στο ίδιο πακέτο αλλαγών, τον Οκτώβριο 2026 έγινε Generally Available και η ενεργοποίηση του sensor v3.x **χωρίς** onboarding στο Defender for Endpoint. Από το **Sensor management → Download onboarding package** κατεβάζεις πακέτο για Windows Server 2019 ή νεότερο, και ο sensor τρέχει σε περιορισμένη κατάσταση μόνο για ταυτότητες. Ισχύει μόνο για νέες εγκαταστάσεις σε Domain Controllers χωρίς υπάρχοντα sensor: η μετάβαση από τον v2.x δεν υποστηρίζεται με αυτόν τον τρόπο. Ο server χρειάζεται πάντως πρόσβαση στις cloud υπηρεσίες του Defender for Endpoint.

Το access key του πακέτου χρησιμοποιείται μόνο κατά την εγκατάσταση. Αν το ξαναδημιουργήσεις, το παλιό ακυρώνεται και όσες εγκαταστάσεις το χρησιμοποιούν αποτυγχάνουν.

## Πώς επιβεβαιώνεις ότι δούλεψε

Στην καρτέλα **Sensor management** ο server πρέπει να εμφανίζεται με κατάσταση **Running**. Η πρώτη ενεργοποίηση v3.x σε ένα περιβάλλον μπορεί να πάρει έως μία ώρα, οι επόμενες εμφανίζονται μέσα σε πέντε λεπτά, και δεν χρειάζεται restart. Μετά από ένα 24ωρο, έλεγξε ότι δεν υπάρχουν ανοιχτά health issues για Windows events που λείπουν.

## Σύνδεση με ΚΥΑ 1689/2025, NIS2, ISO 27001 και GDPR

- **ΚΥΑ 1689/2025 [24.γ](/kya-1689-2025/#24-γ) και [24.ε](/kya-1689-2025/#24-ε):** το αυτόματο auditing κλείνει κενά καταγραφής στους Domain Controllers και στους servers ταυτότητας, και ο sensor μετατρέπει τα events σε alerts. **[14.α](/kya-1689-2025/#14-α):** η ρύθμιση ξαναεφαρμόζεται κάθε 24 ώρες, άρα λειτουργεί ως μηχανισμός επιβολής παραμετροποίησης.
- **Οδηγία NIS2 [21.2.β](/nis2/#21-2-β):** ανίχνευση επιθέσεων ταυτότητας ως μέρος του χειρισμού περιστατικών.
- **ISO/IEC 27001 [A.8.15](/iso-27001/#A-8-15) και [A.8.16](/iso-27001/#A-8-16):** logging και monitoring activities στα συστήματα ταυτότητας.
- **GDPR [32.1.β](/gdpr/#32-1-β) και [33.1](/gdpr/#33-1):** ακεραιότητα και διαθεσιμότητα των συστημάτων ταυτότητας, και έγκαιρος εντοπισμός μιας παραβίασης ώστε να μπορεί να γνωστοποιηθεί μέσα στις 72 ώρες.

Τεκμήρια για τον ελεγκτή: το screenshot του **Advanced features** με τις δύο ρυθμίσεις, η απόφαση ενεργοποίησης ή opt out με το σκεπτικό της, και η καρτέλα **Sensor management** με όλους τους servers ταυτότητας σε κατάσταση Running.

---

## Πηγές και επαλήθευση {#last-verified}

{{< verification >}}

Επιπλέον πηγές: [What's new in Microsoft Defender for Identity](https://learn.microsoft.com/en-us/defender-for-identity/whats-new) · [Activate the Defender for Identity sensor v3.x](https://learn.microsoft.com/en-us/defender-for-identity/deploy/activate-sensor) · [Configure Windows event auditing](https://learn.microsoft.com/en-us/defender-for-identity/deploy/configure-windows-event-collection) · Message Center MC1484018 (30 Σεπτεμβρίου 2026). Το θέμα πρωτοεμφανίστηκε στο [Microsoft 365 Security: τι άλλαξε (εβδομάδα 40/2026)](/posts/weekly-security-update/microsoft-365-security-ti-allaxe-2026-w40/).

Τελευταίος έλεγχος στοιχείων: 12 Οκτωβρίου 2026.
