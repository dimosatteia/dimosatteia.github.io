---
title: "Generally Available: Η νέα σελίδα Investigate Domain στο Microsoft Defender for Identity"
date: 2026-07-14T11:00:00+03:00
lastmod: 2026-07-14T11:19:00+03:00
draft: false
keywords:
  - Microsoft Defender for Identity
  - Investigate Domain
  - Active Directory security
  - domain health score
  - NIS2 compliance
  - identity threat detection
tags:
  - Microsoft Defender for Identity
  - Active Directory
  - GRC
  - NIS2
  - Identity Security
author: "Dimosthenis Atteia"
description: "Το Microsoft Defender for Identity ενοποιεί πλέον σε ένα σημείο την υγεία, τις πολιτικές ασφαλείας και τα trust relationships ενός Active Directory domain. Δες τι αλλάζει στην καθημερινή investigation."
summary: "Η σελίδα Active Directory Domain στο Microsoft Defender συγκεντρώνει σε ένα ενιαίο σημείο ό,τι χρειάζεται ένας αναλυτής για να αξιολογήσει την υγεία και την έκθεση ενός domain."
categories: ["Microsoft Defender"]
series: ["Generally Available Features"]
releases:
  - "generally-available"       # ← αυτό στο /releases/generally-available/
ShowToc: true
TocOpen: false
cover:
  image: "https://learn.microsoft.com/en-us/defender-for-identity/media/investigate-domain/domain-page-overview.png"
  alt: "Η καρτέλα Overview της σελίδας Active Directory Domain στο Microsoft Defender"
  caption: "Πηγή εικόνας: Microsoft Learn"
  relative: false
---

Αν έχεις δουλέψει ποτέ σε investigation γύρω από ένα Active Directory domain, ξέρεις καλά το πρόβλημα: η πληροφορία είναι παντού. Η υγεία των sensors είναι σε μία οθόνη, οι πολιτικές password σε άλλη, τα trust relationships κάπου αλλού, και τα recommendations σκορπισμένα σε posture assessments. Το να χτίσεις μια πλήρη εικόνα ενός domain σήμαινε να πηδάς από tab σε tab, κρατώντας σημειώσεις.

Το Microsoft Defender for Identity μόλις έκανε Generally Available κάτι που, ειλικρινά, το περίμενα εδώ και καιρό: μια ενιαία σελίδα **Active Directory Domain**, που φέρνει όλα τα παραπάνω κάτω από μία στέγη.

## Πού βρίσκεις τη σελίδα

Δεν χρειάζεται να ψάξεις πολύ. Φτάνεις εκεί είτε επιλέγοντας ένα domain από τη στήλη **Domain** στο identity inventory, είτε μέσα από ένα alert ή incident που σχετίζεται με domain, είτε απλά γράφοντας το όνομα του domain στο global search bar. Αν δουλεύεις σε multi-domain περιβάλλον (κάτι αρκετά συνηθισμένο σε βιομηχανικές εταιρείες με πολλά sites, όπως και στη δική μου καθημερινότητα) υπάρχει ένας selector πάνω δεξιά για γρήγορη εναλλαγή ανάμεσα σε domains.

Για πρόσβαση χρειάζεσαι Defender for Identity license (ή license που το περιλαμβάνει, όπως το E5) και τουλάχιστον ρόλο Security Reader.

## Η καρτέλα Overview: η πρώτη ματιά που μετράει

Η **Overview** είναι το σημείο εκκίνησης κάθε investigation. Σε ένα dashboard βλέπεις τα βασικά στοιχεία του domain όπως provider, functional level, ημερομηνία δημιουργίας, πλήθος identities, service accounts, group accounts, computer accounts, μαζί με canonical name, SID και ID.

![Overview tab](https://learn.microsoft.com/en-us/defender-for-identity/media/investigate-domain/domain-page-overview.png)

Αυτό όμως που πραγματικά με ενδιαφέρει ως practitioner είναι το **Deployment Health** και το **Health Score**. Το πρώτο σου λέει αν όλα τα domain controllers έχουν πραγματικά sensor (100% coverage σημαίνει πλήρη ορατότητα), οτιδήποτε λιγότερο είναι τυφλό σημείο. Το δεύτερο συνοψίζει σε ένα Low/Medium/High score την κατάσταση του domain, βασισμένο σε coverage, υγεία sensors και ενεργά recommendations, με ένα κουμπί **How to fix** που σε πάει κατευθείαν στη δράση.

Δίπλα τους βρίσκεις τα Sensitive Entities, ένα donut chart για τα service accounts (sMSA, gMSA, User), τα Active Recommendations και τα Group Policy Objects που ισχύουν στο domain, χρήσιμο για να εντοπίσεις γρήγορα domains χωρίς κανένα GPO εφαρμοσμένο, κάτι που συχνά είναι κόκκινη σημαία.

## Incidents & Alerts: το ιστορικό σε ένα σημείο

Η καρτέλα **Incidents and alerts** συγκεντρώνει ό,τι incident ή alert σχετίζεται με το συγκεκριμένο domain, με προεπιλεγμένα φίλτρα σε status και severity. Αξίζει να σημειωθεί ότι εμφανίζει δεδομένα μόνο από την 1η Φεβρουαρίου 2026 και μετά, οπότε για παλαιότερο ιστορικό θα χρειαστείς άλλα εργαλεία.

![Incidents and alerts tab](https://learn.microsoft.com/en-us/defender-for-identity/media/investigate-domain/domain-page-incidents-alerts.png)

## Security Policies: αυτό που κάθε auditor θέλει να δει

Εδώ είναι, νομίζω, το πιο πρακτικό κομμάτι για όσους κάνουμε GRC δουλειά. Η καρτέλα **Security Policies** μεταφράζει σε ανθρώπινη γλώσσα τέσσερις βασικές πολιτικές του Active Directory: Password Policy (μέγιστη/ελάχιστη ηλικία, ιστορικό, complexity, lockout μετά από αποτυχημένες προσπάθειες κ.ά.), Account Lockout Policy, Kerberos Policy, και LDAP & Machine Account settings, με warning banner όταν εντοπίζονται ανασφαλείς ρυθμίσεις.

![Security Policies tab](https://learn.microsoft.com/en-us/defender-for-identity/media/investigate-domain/domain-page-security-policies.png)

Είναι ακριβώς το είδος στοιχείου που θέλεις να έχεις πρόχειρο όταν χτίζεις τεκμηρίωση για ISO 27001 ή όταν αποδεικνύεις συμμόρφωση με τις τεχνικές απαιτήσεις του NIS2, δεν χρειάζεται να εξηγείς σε PowerShell τι σημαίνει κάθε GPO setting, το βλέπεις ήδη ερμηνευμένο.

## Trusts, Groups, Computers: η υπόλοιπη εικόνα

Η καρτέλα **Trusts** δείχνει ποιο domain εμπιστεύεται ποιο, προς ποια κατεύθυνση (inbound, outbound, bidirectional) και με ποια χαρακτηριστικά, απαραίτητο για να χαρτογραφήσεις πιθανά μονοπάτια lateral movement ανάμεσα σε domains.

Οι καρτέλες **Groups** και **Computers** λειτουργούν σαν φιλτραρισμένες λίστες με δυνατότητα να επισημάνεις χειροκίνητα οντότητες ως sensitive, ώστε να τροφοδοτήσεις την ανάλυση έκθεσης (exposure) και τον εντοπισμό attack paths.

![Groups tab](https://learn.microsoft.com/en-us/defender-for-identity/media/investigate-domain/domain-page-groups.png)

![Computers tab](https://learn.microsoft.com/en-us/defender-for-identity/media/investigate-domain/domain-page-computers.png)

## Γιατί έχει σημασία στην πράξη

Σε ένα hybrid περιβάλλον με πολλαπλά sites (πόσο μάλλον όταν μιλάμε για βιομηχανικό IT/OT με legacy εξοπλισμό) η ταχύτητα με την οποία μπορείς να απαντήσεις «είναι αυτό το domain υγιές, καλυμμένο και σωστά ρυθμισμένο;» είναι κρίσιμη, όχι μόνο για incident response αλλά και για continuous compliance. Η ενοποίηση αυτών των δεδομένων σε ένα σημείο μειώνει πραγματικά τον χρόνο investigation, και δίνει στους auditors ένα σαφές, οπτικό τεκμήριο για την κατάσταση του Active Directory, κάτι που εκτιμώ ιδιαίτερα όταν προετοιμάζω evidence για ISO 27001 ή NIS2 assessments.

Αν δεν το έχεις δοκιμάσει ακόμα, αξίζει μια πρώτη ματιά στο δικό σου tenant.

---

**Πηγές:** Το άρθρο βασίζεται στην επίσημη τεκμηρίωση της Microsoft, [Investigate an Active Directory domain](https://learn.microsoft.com/en-us/defender-for-identity/investigate-domain), και στην καταχώρηση Ιουλίου 2026 του [What's new in Microsoft Defender XDR](https://learn.microsoft.com/en-us/defender-xdr/whats-new), όπου το Domain investigation page καταγράφεται πλέον ως Generally Available.
