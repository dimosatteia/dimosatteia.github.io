---
title: "Security Copilot μέσα στο Microsoft 365 E5: τι παίρνεις, πόσα SCU και πότε πληρώνεις"
seoTitle: "Security Copilot στο Microsoft 365 E5: SCU, όρια και κόστος"
date: 2026-10-02T16:30:00+03:00
lastmod: 2026-10-02T21:15:00+03:00
draft: false
keywords:
  - Security Copilot Microsoft 365 E5
  - Security Compute Units SCU
  - Security Copilot κόστος
  - Security Copilot inclusion E5 E7
  - Security Copilot agents
  - Security Copilot ρόλοι owner contributor
  - Security Copilot data sharing
tags:
  - Microsoft Security Copilot
  - Microsoft 365 E5
  - Licensing
  - Agentic AI
  - Microsoft Defender XDR
  - Security Operations
  - CISO
author: "Dimosthenis Atteia"
description: "Το Security Copilot περιλαμβάνεται στο Microsoft 365 E5 και E7: πόσα SCU σου αναλογούν, τι μένει εκτός, και τρεις αποφάσεις πριν το ανοίξεις στην ομάδα."
summary: "Το Security Copilot δεν αγοράζεται πια ξεχωριστά αν έχεις Microsoft 365 E5 ή E7. Έρχεται όμως με μηνιαίο όριο SCU που δεν μεταφέρεται, με χρεώσεις που μένουν εκτός, και με προεπιλογές πρόσβασης που αξίζει να δεις πριν το χρησιμοποιήσει η ομάδα σου."
categories: ["AI Security"]
ShowToc: true
TocOpen: false
weight: -6
cover:
  image: "/images/M365Strategy2026/m365-2026-e5-security-copilot-scu-model.webp"
  alt: "Το μοντέλο SCU του Security Copilot στο Microsoft 365 E5: 400 Security Compute Units τον μήνα ανά 1.000 άδειες, με ανώτατο όριο 10.000"
  caption: "400 SCU τον μήνα ανά 1.000 άδειες, με ανώτατο όριο 10.000"
  relative: false
  hidden: false
---

## Με λίγα λόγια

- Το **Microsoft Security Copilot** περιλαμβάνεται χωρίς επιπλέον κόστος στο **Microsoft 365 E5** και **E7**. Δεν χρειάζεται Azure subscription ούτε χειροκίνητη ρύθμιση χωρητικότητας.
- Παίρνεις **400 Security Compute Units (SCU) τον μήνα για κάθε 1.000 άδειες**, με ανώτατο όριο **10.000 SCU**. Ό,τι δεν καταναλώσεις **δεν μεταφέρεται** στον επόμενο μήνα.
- Η χωρητικότητα καλύπτει chat, promptbooks και agents στο Defender, το Entra, το Intune και το Purview.
- Κάποια κόστη μένουν **εκτός**, και οι προεπιλεγμένοι ρόλοι δίνουν πρόσβαση σε περισσότερους από όσους ίσως θέλεις.

## Τι άλλαξε

Μέχρι τα τέλη του 2025 το Security Copilot ήταν ξεχωριστή αγορά: έστηνες χωρητικότητα SCU στο Azure και πλήρωνες με την ώρα, είτε τη χρησιμοποιούσες είτε όχι. Για έναν μεσαίο οργανισμό αυτό σήμαινε πάγιο κόστος πριν δει οποιοδήποτε όφελος, και οι περισσότεροι δεν το δοκίμασαν ποτέ.

Από τις 18 Νοεμβρίου 2025 η Microsoft το ενσωματώνει στο Microsoft 365 E5, και στη συνέχεια στο E7. Η διάθεση γίνεται σταδιακά και η ενεργοποίηση είναι αυτόματη: η Microsoft την ονομάζει «zero click activation». Το ότι είσαι επιλέξιμος δεν σημαίνει ότι το έχεις ήδη. Πρέπει να έχει φτάσει η διάθεση στο tenant σου.

Αν δεν έχεις E5 ή E7, το παλιό μοντέλο ισχύει ακόμα: χειροκίνητη ρύθμιση και χρέωση χωρητικότητας στο Azure. Το ίδιο ισχύει αν έχεις μόνο Microsoft Sentinel χωρίς E5 ή E7.

## Πόσα SCU σου αναλογούν

Ο τύπος είναι απλός: **άδειες × 400 ÷ 1.000**. Η Microsoft διευκρινίζει ότι η αναλογία ισχύει και κάτω από τις 1.000 άδειες.

| Άδειες E5 ή E7 | SCU τον μήνα |
|---|---|
| 100 | 40 |
| 250 | 100 |
| 400 | 160 |
| 1.000 | 400 |
| 4.000 | 1.600 |
| 25.000 και πάνω | 10.000 (ανώτατο όριο) |

Οι γραμμές των 400 και των 4.000 αδειών είναι τα παραδείγματα της ίδιας της Microsoft. Οι υπόλοιπες προκύπτουν από τον τύπο.

Βάλε τους δικούς σου αριθμούς. Αν έχεις και τα δύο πλάνα, συμπλήρωσε και τα δύο πεδία:

{{< scu-calculator >}}

Τρία πράγματα που πρέπει να ξέρεις για το όριο:

1. **Μηδενίζει κάθε μήνα.** Τα αχρησιμοποίητα SCU χάνονται, δεν συσσωρεύονται.
2. **Τι γίνεται όταν τελειώσουν.** Η Microsoft έχει ανακοινώσει ότι η χρήση πέρα από το όριο θα περιορίζεται (throttling) «σε μελλοντική ημερομηνία», και ότι θα υπάρξει επιλογή pay-as-you-go προς **6 δολάρια ανά SCU**, με ειδοποίηση 30 ημερών πριν γίνει διαθέσιμη.
3. **Αν είχες ήδη χωρητικότητα στο Azure,** η Microsoft συνιστά να μην τη διαγράψεις.

Για έναν οργανισμό 250 χρηστών, τα 100 SCU τον μήνα δεν είναι πολλά. Μια σύνοψη incident κοστίζει λίγο. Ένα ερώτημα που συσχετίζει δεδομένα 30 ημερών από τρία προϊόντα κοστίζει πολύ περισσότερο, και ένας agent που τρέχει σε πρόγραμμα καταναλώνει χωρίς να τον βλέπει κανείς.

## Τι καλύπτει και τι μένει εκτός

**Καλύπτονται** το chat, τα promptbooks και τα agentic σενάρια μέσα στο Microsoft Defender, το Microsoft Entra, το Microsoft Intune και το Microsoft Purview, καθώς και στο αυτόνομο portal του Security Copilot. Οι agents που φτιάχνουν συνεργάτες της Microsoft καλύπτονται ως προς την κατανάλωση SCU, «μέχρι νεωτέρας».

**Δεν καλύπτονται:**

- το κόστος compute και αποθήκευσης του Microsoft Sentinel data lake,
- τα μη agentic Data Security Investigations στο Purview,
- οι χρεώσεις Azure Logic Apps που προκαλεί η χρήση του Security Copilot,
- η αγορά αδειών για agents συνεργατών από το Security Store,
- agents που απαιτούν προϊόντα εκτός Microsoft 365 E5 ή E7.

Το πρώτο είναι αυτό που ξεφεύγει πιο εύκολα. Αν οι agents σου διαβάζουν από το Sentinel data lake, το SCU είναι «δωρεάν» αλλά το ερώτημα στο data lake όχι.

## Πώς δουλεύει, σε μία εικόνα

```text
┌──────────────────────────────────────────────────────────┐
│        Security Copilot (γλωσσικό μοντέλο + λογική)       │
└───────────┬──────────────────────────────────┬───────────┘
            │                                  │
   ┌────────▼─────────┐              ┌─────────▼─────────┐
   │ Plugins Microsoft │              │ Plugins τρίτων     │
   │ Defender XDR      │              │ και δικά σου       │
   │ Sentinel          │              │ (KQL, API)         │
   │ Entra · Intune    │              │                    │
   │ Purview           │              │                    │
   └────────┬─────────┘              └─────────┬─────────┘
            │                                  │
   ┌────────▼──────────────────────────────────▼─────────┐
   │   Τα δεδομένα του tenant σου, μόνο όσα επιτρέπουν    │
   │   τα δικαιώματα του χρήστη που ρωτάει                │
   └──────────────────────────────────────────────────────┘
```

Δύο σημεία αξίζει να κρατήσεις.

**Το Copilot δεν βλέπει περισσότερα από εσένα.** Η πρόσβαση στα δεδομένα γίνεται με on-behalf-of authentication: το Copilot ρωτάει τα plugins με τα δικαιώματα του χρήστη που έγραψε το prompt. Αν ένας αναλυτής δεν βλέπει τα sign-in logs στο Entra, δεν θα τα δει ούτε μέσω Copilot.

**Οι ρόλοι του Copilot δεν δίνουν πρόσβαση σε δεδομένα.** Υπάρχουν δύο, ο Copilot owner και ο Copilot contributor. Ελέγχουν μόνο το ποιος χρησιμοποιεί την πλατφόρμα και ποιος τη διαχειρίζεται.

Οι agents είναι η εξαίρεση στο πρώτο σημείο. Ένας agent της Microsoft μπορεί να τρέχει με δική του ταυτότητα (Microsoft Entra Agent ID) και δικά του δικαιώματα, ή να συνδεθεί με υπάρχοντα λογαριασμό χρήστη και να κληρονομήσει τα δικά του. Ένα παράδειγμα agent στην πράξη υπάρχει στο άρθρο για τον [Vulnerability Remediation Agent στο Microsoft Intune](/posts/previews/vulnerability-remediation-agent-intune/).

## Τρεις αποφάσεις πριν το ανοίξεις στην ομάδα

### 1. Ποιος έχει πρόσβαση

Στις νέες εγκαταστάσεις, η προεπιλογή δίνει πρόσβαση στους «recommended Microsoft security roles». Επιπλέον, ορισμένοι ρόλοι κληρονομούν αυτόματα δικαιώματα **Copilot owner**: Global Administrator, Security Administrator, Intune Administrator, Billing Administrator, Compliance Administrator, και οι ρόλοι Compliance Administrator, Data Governance Administrator και Organization Management του Purview.

Άνοιξε το portal του Security Copilot, πήγαινε στο **Role assignment** και δες ποιοι είναι μέσα. Αν θέλεις στενότερη ομάδα, η Microsoft συνιστά security groups αντί για μεμονωμένους χρήστες, και δέχεται μόνο role-assignable groups. Αν σε παλαιότερη εγκατάσταση υπάρχει η ομάδα Everyone και την αφαιρέσεις, δεν μπορείς να την ξαναβάλεις.

### 2. Πού πηγαίνουν τα δεδομένα

Η αυτόματη ενεργοποίηση για E5 και E7 ορίζει για εσένα τέσσερα πράγματα: τη γεωγραφία αποθήκευσης των Customer Data, την τοποθεσία επεξεργασίας των prompts (GPU), την κοινή χρήση δεδομένων με τη Microsoft και την πρόσβαση του Copilot σε δεδομένα υπηρεσιών Microsoft 365. Σύμφωνα με τη Microsoft, η κοινή χρήση δεδομένων είναι **απενεργοποιημένη** από προεπιλογή για τους πελάτες E5 και E7, ενώ η πρόσβαση στα δεδομένα Microsoft 365 είναι **ενεργοποιημένη**.

Μην το πάρεις ως δεδομένο. Άνοιξε τις ρυθμίσεις και κατέγραψε τι ισχύει στο δικό σου tenant: τη γεωγραφία αποθήκευσης, και αν τα prompts αξιολογούνται μόνο στην Ευρώπη ή «οπουδήποτε υπάρχει διαθέσιμη χωρητικότητα». Η δεύτερη επιλογή είναι αυτή που συνιστά η Microsoft για λόγους απόδοσης, αλλά για οργανισμό με υποχρεώσεις GDPR και NIS2 είναι απόφαση που πρέπει να πάρεις συνειδητά και να τεκμηριώσεις. Η Microsoft δηλώνει ότι τα δεδομένα δεν μοιράζονται με την OpenAI και δεν χρησιμοποιούνται για την εκπαίδευση του foundation model του Azure OpenAI.

### 3. Πώς θα παρακολουθείς την κατανάλωση

Το portal του Security Copilot έχει usage dashboard για τα SCU. Βάλε έναν άνθρωπο να το κοιτάζει κάθε εβδομάδα τον πρώτο μήνα. Θέλεις να μάθεις δύο πράγματα: πόσο καίει η κανονική χρήση της ομάδας, και πόσο καίει κάθε agent που ενεργοποιείς. Ενεργοποίησε τους agents έναν έναν, ώστε να ξέρεις σε ποιον οφείλεται κάθε αύξηση.

## Τι να κάνεις αυτή την εβδομάδα

1. Έλεγξε αν το Security Copilot έχει ενεργοποιηθεί στο tenant σου: άνοιξε το [securitycopilot.microsoft.com](https://securitycopilot.microsoft.com/).
2. Υπολόγισε το μηνιαίο σου όριο από τον πίνακα.
3. Δες ποιοι έχουν πρόσβαση στο Role assignment.
4. Κατέγραψε τις ρυθμίσεις γεωγραφίας και κοινής χρήσης δεδομένων.
5. Ξεκίνα με τις συνόψεις incident στο Defender portal, που κοστίζουν λίγο και δείχνουν γρήγορα αν αξίζει.

Το πώς ταιριάζει το Security Copilot στη συνολική εικόνα των αλλαγών τιμολόγησης του 2026 το έχω αναλύσει στο [Αύξηση Τιμών Microsoft 365 2026: Οδηγός Στρατηγικής για Security Leaders](/posts/microsoft-365-price-increase-2026-security-leader-playbook/).

## Πηγές

- [Security Copilot inclusion in Microsoft 365 E5 and E7](https://learn.microsoft.com/en-us/copilot/security/security-copilot-inclusion)
- [Get started with Microsoft Security Copilot](https://learn.microsoft.com/en-us/copilot/security/get-started-security-copilot)
- [Understand authentication in Microsoft Security Copilot](https://learn.microsoft.com/en-us/copilot/security/authentication)
- [Microsoft Security Copilot agents overview](https://learn.microsoft.com/en-us/copilot/security/agents-overview)
- [Privacy and data security in Microsoft Security Copilot](https://learn.microsoft.com/en-us/copilot/security/privacy-data-security)
