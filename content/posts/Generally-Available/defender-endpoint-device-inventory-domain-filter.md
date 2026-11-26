---
title: "Generally Available: Φίλτρο Domain στο device inventory του MDE"
seoTitle: "GA: Φίλτρο Domain στο device inventory του Defender"
slug: "defender-endpoint-device-inventory-domain-filter"
date: 2026-11-27T08:15:00+02:00
lastmod: 2026-11-27T08:15:00+02:00
draft: true
keywords:
  - Microsoft Defender for Endpoint
  - device inventory
  - Domain filter
  - Active Directory domain
  - Assets Devices
  - Onboarding status
  - Sensor health state
  - κατάλογος αγαθών ΚΥΑ 1689/2025
tags:
  - Microsoft Defender for Endpoint
  - Microsoft Defender XDR
  - Asset Management
  - Endpoint Security
  - NIS2
  - ISO 27001
author: "Dimosthenis Atteia"
description: "Το device inventory του Microsoft Defender for Endpoint φιλτράρει πλέον τις συσκευές με βάση το Active Directory domain τους, σε Generally Available. Πού είναι το φίλτρο, τι δεν δείχνει και πώς το χρησιμοποιείς για να ελέγξεις την κάλυψη κάθε domain."
seoDescription: "Φίλτρο Domain στο device inventory του Defender for Endpoint, σε GA. Πού το βρίσκεις, τα όριά του και πώς ελέγχεις την κάλυψη ανά Active Directory domain."
summary: "Μικρή αλλαγή με πρακτική αξία για όποιον έχει περισσότερα από ένα domains: φιλτράρεις το device inventory ανά Active Directory domain και βλέπεις τι δεν είναι onboarded ή τι δεν αναφέρει σωστά. Δες πώς το συνδυάζεις με άλλα φίλτρα."
categories: ["Endpoint & Device"]
releases:
  - "generally-available"
ShowToc: true
TocOpen: false
cover:
  image: "https://learn.microsoft.com/en-us/defender-xdr/media/mto-tenant-devices/devices-device-inventory.png"
  alt: "Η σελίδα Devices με το device inventory στο multitenant management του Microsoft Defender portal"
  caption: "Πηγή εικόνας: Microsoft Learn"
  relative: false
# Πλαίσιο «Last verified»: κάθε χαρακτηριστικό με τη φάση, την άδεια, την πηγή και την ημερομηνία ελέγχου
verification:
  - feature: "Φίλτρο Domain στις καρτέλες All devices και Computers & mobile του device inventory"
    status: "Generally Available"
    license: "Δεν αναφέρεται"
    source: "https://learn.microsoft.com/en-us/defender-endpoint/device-inventory-field-reference#filters-reference"
    verified: 2026-11-26
# MITRE ATT&CK®: ονόματα στο data/mitre.yaml
mitre: ["M1047"]
---

Σε πολλούς οργανισμούς το Active Directory δεν είναι ένα domain. Μια θυγατρική με δικό της domain, μια εξαγορά που δεν ενοποιήθηκε ποτέ, ένα παλιό domain για την παραγωγή. Όταν ο ελεγκτής ρωτά «είναι όλες οι συσκευές του domain Χ προστατευμένες;», η απάντηση στο Defender ήθελε μέχρι τώρα export σε Excel ή query στο advanced hunting.

Από τον **Νοέμβριο 2026**, σε **Generally Available**, το device inventory του Microsoft Defender for Endpoint έχει φίλτρο **Domain**.

## Τι αλλάζει

Στο **Assets → Devices** του Defender portal, το φίλτρο **Domain** περιορίζει τη λίστα στις συσκευές που είναι joined σε ένα συγκεκριμένο Active Directory domain. Γράφεις το όνομα ή το επιλέγεις από τις τιμές που έχει βρει ο Defender, π.χ. `contoso.com` ή `corp.fabrikam.com`.

| Στοιχείο | Τι λέει το Microsoft Learn |
|---|---|
| Καρτέλες | **All devices** και **Computers & mobile** |
| Τιμές | Ελεύθερο κείμενο ή επιλογή από τα domains που έχουν εντοπιστεί |
| Στήλη **Domain** | Εμφανίζεται από προεπιλογή. Κενή για συσκευές που δεν είναι domain joined ή είναι μόνο discovered |
| Άδεια | Δεν αναφέρεται ειδικά για το φίλτρο |

Για την άδεια, το Microsoft Learn σημειώνει ότι το device inventory υπάρχει στις υπηρεσίες Microsoft Defender, ότι οι πληροφορίες του διαφέρουν ανά άδεια, και ότι την πληρέστερη εικόνα τη δίνει το Defender for Endpoint Plan 2.

## Τι δεν δείχνει

Το φίλτρο βασίζεται στο domain που ξέρει ο Defender για κάθε συσκευή. Οι συσκευές που **δεν είναι domain joined**, π.χ. συσκευές μόνο Entra joined, ή για τις οποίες **δεν υπάρχει πληροφορία domain**, μπορεί να μην έχουν τιμή και να μην εμφανίζονται σε κανένα domain. Αν ελέγχεις την κάλυψη, μην υποθέσεις ότι το σύνολο των domains είναι το σύνολο των συσκευών σου.

Πρόσεξε και το export: σύμφωνα με το Microsoft Learn, το CSV του **Export** περιέχει όλες τις συσκευές του οργανισμού, χωρίς τα φίλτρα που έχεις εφαρμόσει στη σελίδα. Αν θέλεις λίστα για ένα domain, φιλτράρισε το CSV ή χρησιμοποίησε advanced hunting.

## Τι κάνεις τώρα

1. Άνοιξε το **Assets → Devices**, καρτέλα **Computers & mobile**, και πρόσθεσε το φίλτρο **Domain** για ένα από τα domains σου.
2. Πρόσθεσε το **Onboarding status** με τιμή **Can be onboarded**. Αυτές είναι συσκευές του domain που ο Defender βλέπει αλλά δεν προστατεύει.
3. Άλλαξε το δεύτερο φίλτρο σε **Sensor health state** με **Inactive** ή **Misconfigured**, για συσκευές που είναι onboarded αλλά δεν αναφέρουν σωστά.
4. Επανέλαβε για κάθε domain και σύγκρινε τον αριθμό συσκευών με τον αριθμό computer objects στο Active Directory.
5. Για τους domain controllers, συνδύασε με το φίλτρο **Device role** και τιμή Domain Controller.
6. Κράτα τα αποτελέσματα με ημερομηνία ως τεκμήριο για τον κατάλογο αγαθών.

> 📖 **Θέλεις όλη την εικόνα;** Πώς δουλεύει το Defender for Endpoint, από το onboarding ως την απόκριση: **[Microsoft Defender for Endpoint: Μια πρακτική περιήγηση](/posts/microsoft-defender-up-close-series/microsoft-defender-for-endpoint-deep-dive/)**.

## Σύνδεση με ΚΥΑ 1689/2025, NIS2, ISO 27001 και GDPR

- **ΚΥΑ 1689/2025 [11.α](/kya-1689-2025/#11-α):** ακριβής και ενημερωμένος κατάλογος αγαθών. Η σύγκριση ανά domain ανάμεσα στο Active Directory και στο device inventory δείχνει αν ο κατάλογος είναι πλήρης.
- **Οδηγία NIS2 [21.2.θ](/nis2/#21-2-θ):** διαχείριση πάγιων στοιχείων.
- **ISO/IEC 27001 [A.5.9](/iso-27001/#A-5-9):** inventory of information and other associated assets.
- **GDPR [32.1.β](/gdpr/#32-1-β):** δεν προστατεύεις την ακεραιότητα και τη διαθεσιμότητα των συστημάτων επεξεργασίας αν δεν ξέρεις ποιες συσκευές τα αποτελούν.

Τεκμήρια για τον ελεγκτή: για κάθε domain, ο αριθμός συσκευών στο Active Directory και στο device inventory με ημερομηνία, η λίστα όσων είναι **Can be onboarded** και το σχέδιο για την κάλυψή τους.

---

## Πηγές και επαλήθευση {#last-verified}

{{< verification >}}

Επιπλέον πηγές: [Device inventory field reference](https://learn.microsoft.com/en-us/defender-endpoint/device-inventory-field-reference) · [Explore devices in the device inventory](https://learn.microsoft.com/en-us/defender-endpoint/machines-view-overview) · [What's new in Microsoft Defender for Endpoint](https://learn.microsoft.com/en-us/defender-endpoint/whats-new-in-microsoft-defender-endpoint) · [What's new in Microsoft Defender XDR](https://learn.microsoft.com/en-us/defender-xdr/whats-new). Οι σελίδες για το device inventory του Defender for Endpoint δεν έχουν screenshot, οπότε η εικόνα είναι από τη σελίδα [Devices in multitenant management](https://learn.microsoft.com/en-us/defender-xdr/mto-tenant-devices). Δεν βρέθηκε ανακοίνωση στο Message Center για τη δυνατότητα. Το θέμα πρωτοεμφανίστηκε στο [Microsoft 365 Security: τι άλλαξε (εβδομάδα 48/2026)](/posts/weekly-security-update/microsoft-365-security-ti-allaxe-2026-w48/).

Τελευταίος έλεγχος στοιχείων: 26 Νοεμβρίου 2026.
