---
title: "Microsoft Defender for Office 365: Από τις preset policies στην προχωρημένη παραμετροποίηση"
date: 2026-09-28T10:00:00+03:00
lastmod: 2026-09-28T18:45:00+03:00
draft: true
keywords:
  - Microsoft Defender for Office 365
  - Microsoft Defender for Office 365 οδηγός
  - Defender for Office 365 Plan 1 vs Plan 2
  - Διαφορές Defender for Office 365 Plan 1 και Plan 2
  - Preset security policies Standard Strict
  - Safe Links ρυθμίσεις
  - Safe Attachments Block Dynamic Delivery
  - Anti-phishing impersonation protection
  - Threat Explorer Defender for Office 365
  - Attack Simulation Training
tags:
  - Microsoft Defender for Office 365
  - Microsoft Defender XDR
  - Email Security
  - Phishing
  - Safe Links
  - Safe Attachments
  - Microsoft 365 Security
author: "Dimosthenis Atteia"
description: "Πρακτικός οδηγός για το Microsoft Defender for Office 365: Plan 1 vs Plan 2, preset policies, Safe Links, Safe Attachments και anti-phishing."
summary: "Το Microsoft Defender for Office 365 με πρακτικούς όρους. Plan 1 vs Plan 2, πώς οι preset security policies απλοποιούν την ανάπτυξη από την πρώτη μέρα, και οι συγκεκριμένες ρυθμίσεις για Safe Links, Safe Attachments και anti-phishing που μετράνε περισσότερο."
categories: ["Email & Collaboration"]
series: ["Microsoft Defender Up Close"]
slug: 
ShowToc: true
TocOpen: false
weight: -6
cover:
  image: "/images/MDE/MDO.png"
  alt: "Microsoft Defender for Office 365, αναλυτικός οδηγός"
  caption: "Microsoft Defender Up Close"
  relative: true
ShowReadingTime: true
ShowWordCount: true
---

## Γιατί αυτό μετράει περισσότερο από τα περισσότερα

Το email είναι το σημείο όπου ξεκινά η συντριπτική πλειονότητα των πραγματικών επιθέσεων. Από την εμπειρία μου, αν ρωτήσετε μια ομάδα SOC από πού προέρχονται τα υψηλής αξιοπιστίας alerts της, το email θα βρίσκεται σχεδόν πάντα στις τρεις πρώτες θέσεις. Αυτή είναι η δουλειά του **[Microsoft Defender for Office 365](https://learn.microsoft.com/en-us/defender-office-365/mdo-about)**: να προστατεύει την επιφάνεια παραγωγικότητας στην οποία οι χρήστες σας περνούν το μεγαλύτερο μέρος της ημέρας τους.

Αυτό το άρθρο είναι η πρακτική συνέχεια του **[2ου μέρους της σειράς Defender Demystified](/posts/Defender-Demystified-Series/defender-demystified-part-2-four-workloads/)**. Θα καλύψουμε τη διαφορά Plan 1 και Plan 2, τις preset security policies που κάνουν την ανάπτυξη της πρώτης μέρας σχεδόν ανώδυνη, και τις συγκεκριμένες ρυθμίσεις που αξίζουν τον χρόνο σας.

## Τι προστατεύει το Microsoft Defender for Office 365

Το προϊόν ασφαλίζει τέσσερις επιφάνειες μέσα στη στοίβα παραγωγικότητας του Microsoft 365:

- **Email**: Exchange Online, εισερχόμενα, εξερχόμενα και εσωτερικά
- **Microsoft Teams**: μηνύματα chat, channels, αρχεία που διαμοιράζονται στο Teams
- **SharePoint Online**: αρχεία και διαμοιρασμός
- **OneDrive for Business**: αρχεία και διαμοιρασμός

Ένα link σε chat του Teams ή ένα συνημμένο σε κοινόχρηστο φάκελο του OneDrive ελέγχεται κι αυτό, όχι μόνο ό,τι φτάνει μέσω email. Αυτό μετράει πολύ, γιατί οι επιτιθέμενοι γνωρίζουν ότι το email είναι καλά προστατευμένο και στρέφονται σε phishing μέσω Teams και SharePoint ακριβώς για αυτόν τον λόγο.

## Plan 1 vs Plan 2

Όπως και το Microsoft Defender for Endpoint, έτσι και το Microsoft Defender for Office 365 πωλείται σε δύο επίπεδα.

Το **[Plan 1](https://learn.microsoft.com/en-us/defender-office-365/mdo-about#defender-for-office-365-plan-1-vs-plan-2-cheat-sheet)** είναι το **προληπτικό** επίπεδο:

- Safe Links
- Safe Attachments
- Anti-phishing policies με impersonation protection
- Anti-spam και anti-malware policies
- Αναφορές ανίχνευσης σε πραγματικό χρόνο (Real-time detections)

Το Plan 1 περιλαμβάνεται πλέον στο **Microsoft 365 E3** μετά την αναδιάρθρωση πακέτων του Ιουλίου 2026, καθώς και στο Microsoft 365 Business Premium.

Το **Plan 2** προσθέτει τις δυνατότητες **διερεύνησης και εκπαίδευσης**:

- **Threat Explorer**: αναζητήσιμο χρονολόγιο όλων των απειλών που έφτασαν μέσω email
- **Attack Simulation Training**: ρεαλιστικές καμπάνιες phishing προς τους δικούς σας χρήστες
- **Automated Investigation and Response (AIR)** για περιστατικά email
- Threat Trackers και Campaign Views
- Advanced hunting στα δεδομένα email

Το Plan 2 περιλαμβάνεται στο **Microsoft 365 E5** ή ως μέρος του add-on Microsoft Defender Suite.

Αν ο οργανισμός σας έχει οποιοδήποτε πρόγραμμα ευαισθητοποίησης σε θέματα ασφάλειας, το Attack Simulation Training του Plan 2 από μόνο του συνήθως δικαιολογεί την αναβάθμιση. Η εκτέλεση πειστικών προσομοιώσεων phishing προς τους χρήστες σας και η παρακολούθηση της βελτίωσης με τον χρόνο είναι ένα πραγματικά αποτελεσματικό μέτρο ελέγχου.

## Ο γρηγορότερος τρόπος να πάρετε αξία: preset security policies

Η Microsoft γνωρίζει ότι η ρύθμιση anti-phishing, anti-spam και anti-malware policies από το μηδέν είναι κουραστική. Γι' αυτό παρέχει **[preset security policies](https://learn.microsoft.com/en-us/defender-office-365/preset-security-policies)**, δηλαδή προρυθμισμένα πακέτα που απλώς ενεργοποιείτε για τους χρήστες ή τις ομάδες που θέλετε.

[![Οι preset security policies Standard και Strict στο Defender portal](/images/Microsoft-Defender/mdo-01-preset-security-policies.webp)](/images/Microsoft-Defender/mdo-01-preset-security-policies.webp)
📷 **Εικόνα 1**: Preset security policies στο Defender portal. Defender portal → Email & collaboration → Policies & rules → Threat policies → Preset security policies.

Υπάρχουν τρία preset policies:

- **Built-in protection**: εφαρμόζεται αυτόματα σε όλους τους χρήστες που δεν καλύπτονται από άλλη policy, και δίνει βασική προστασία Safe Links και Safe Attachments. Είναι το «δίχτυ ασφαλείας» και δεν χρειάζεται ενέργεια από εσάς.
- **Standard protection**: προτείνεται για τους περισσότερους χρήστες. Λογικές προεπιλογές, χαμηλό ποσοστό false positives.
- **Strict protection**: προτείνεται για χρήστες υψηλού κινδύνου (διοίκηση, οικονομικό τμήμα, νομικό τμήμα, IT admins). Αυστηρότεροι έλεγχοι, ελαφρώς υψηλότερο ποσοστό false positives.

Αναθέστε το **Standard protection** σε όλους τους χρήστες. Αναθέστε το **Strict protection** σε μια ομάδα που περιέχει τους στόχους υψηλής αξίας. Από την εμπειρία μου, αυτή η ρύθμιση των δέκα λεπτών αποδίδει το μεγαλύτερο μέρος της αξίας του Microsoft Defender for Office 365.

Οι preset policies εξελίσσονται μαζί με το τοπίο απειλών. Η Microsoft ενημερώνει τις υποκείμενες ρυθμίσεις καθώς αλλάζουν οι τεχνικές επίθεσης, οπότε επωφελείστε χωρίς να χρειάζεται να διαχειρίζεστε εσείς την απόκλιση των πολιτικών (policy drift).

## Η παραμετροποίηση που αξίζει να κάνετε μόνοι σας

Η υπόλοιπη αξία βρίσκεται σε ρυθμίσεις που η Microsoft αφήνει σε εσάς, επειδή εξαρτώνται από το περιβάλλον σας. Αυτές είναι όσες αξίζουν τον χρόνο.

### Safe Links policies

Το **[Safe Links](https://learn.microsoft.com/en-us/defender-office-365/safe-links-about)** σαρώνει τα URLs στα εισερχόμενα email πριν από την παράδοση και τα ξαναγράφει (wrap), ώστε κάθε κλικ να ελέγχεται και τη στιγμή του κλικ. Στο Teams και στις εφαρμογές Office τα URLs δεν ξαναγράφονται, αλλά ελέγχονται επίσης τη στιγμή του κλικ. Τα links προς SharePoint και OneDrive δεν γίνονται πλέον wrap, εξακολουθούν όμως να ελέγχονται από την υπηρεσία.

Οι προεπιλογές των presets καλύπτουν τις περισσότερες περιπτώσεις, αλλά στις custom policies ελέγξτε:

- **Apply real-time URL scanning for suspicious links and links that point to files**: ενεργοποιημένο, μην το απενεργοποιήσετε
- **Wait for URL scanning to complete before delivering the message**: η Microsoft το προτείνει ενεργό για όλους, τόσο στο Standard όσο και στο Strict
- **Apply Safe Links to email messages sent within the organization**: πιάνει το εσωτερικό lateral phishing (όταν ένας επιτιθέμενος έχει ήδη παραβιάσει έναν λογαριασμό)
- **Track user clicks**: αφήστε το ενεργοποιημένο, γιατί θέλετε το telemetry των κλικ. Απενεργοποιήστε το μόνο αν το ζητήσει ρητά το νομικό τμήμα
- **Let users click through to the original URL**: αφήστε το απενεργοποιημένο

[![Ρυθμίσεις Safe Links policy στο Defender portal](/images/Microsoft-Defender/mdo-02-safe-links-policy.webp)](/images/Microsoft-Defender/mdo-02-safe-links-policy.webp)
📷 **Εικόνα 2**: Παραμετροποίηση Safe Links policy. Defender portal → Email & collaboration → Policies & rules → Threat policies → Safe Links.

### Safe Attachments policies

Το **[Safe Attachments](https://learn.microsoft.com/en-us/defender-office-365/safe-attachments-about)** εκτελεί (detonation) τα συνημμένα σε εικονικό περιβάλλον πριν από την παράδοση. Η βασική απόφαση είναι η ρύθμιση **Safe Attachments unknown malware response**, με τέσσερις επιλογές:

- **Off**: τα συνημμένα δεν σαρώνονται από το Safe Attachments (μόνο από το anti-malware). Δεν προτείνεται, παρά μόνο για παραλήπτες που δέχονται μηνύματα αποκλειστικά από έμπιστους αποστολείς
- **Monitor**: τα μηνύματα παραδίδονται και καταγράφεται τι συμβαίνει με τις απειλές που ανιχνεύονται
- **Block**: τα μηνύματα με κακόβουλα συνημμένα δεν παραδίδονται αλλά μπαίνουν σε καραντίνα, και μπλοκάρονται αυτόματα μελλοντικές εμφανίσεις τους (προεπιλογή και προτεινόμενη τιμή)
- **Dynamic Delivery**: παραδίδεται αμέσως το σώμα του μηνύματος με placeholder στη θέση κάθε συνημμένου, το οποίο γίνεται διαθέσιμο μόλις ολοκληρωθεί η σάρωση (χρήσιμο όταν η καθυστέρηση παράδοσης έχει σημασία)

Για τους περισσότερους οργανισμούς, το **Block** είναι η σωστή επιλογή και είναι αυτό που εφαρμόζουν και οι Standard και Strict preset policies. Η σάρωση συνήθως ολοκληρώνεται μέσα σε 15 λεπτά, οπότε αν η καθυστέρηση παράδοσης είναι πραγματικό πρόβλημα για κάποιες ομάδες χρηστών, το **Dynamic Delivery** είναι η σωστή εναλλακτική.

### Anti-phishing impersonation protection

Εδώ βρίσκεται η πραγματική «μαγεία». Στην anti-phishing policy ρυθμίστε:

- **User impersonation protection**: προσθέστε τα στελέχη της διοίκησης, την οικονομική διεύθυνση και τους IT admins ως προστατευόμενους χρήστες
- **Domain impersonation protection**: τα domains που σας ανήκουν προστατεύονται ήδη αυτόματα στα presets, οπότε προσθέστε τα domains των βασικών συνεργατών και προμηθευτών σας
- **Mailbox intelligence**: αφήστε το ενεργοποιημένο, γιατί μαθαίνει τους συνήθεις συνομιλητές κάθε χρήστη

[![Ρυθμίσεις impersonation protection στην anti-phishing policy](/images/Microsoft-Defender/mdo-03-anti-phishing-impersonation.webp)](/images/Microsoft-Defender/mdo-03-anti-phishing-impersonation.webp)
📷 **Εικόνα 3**: Ρυθμίσεις impersonation στην anti-phishing policy. Defender portal → Email & collaboration → Policies & rules → Threat policies → Anti-phishing.

Στην εμπειρία μου, αυτή η ρύθμιση έχει μπλοκάρει απόπειρες business email compromise (BEC) που διαφορετικά θα είχαν σοβαρό οικονομικό κόστος. Μην την παραλείψετε.

## Ιδιαιτερότητες του Plan 2 που αξίζει να αναφερθούν

### Threat Explorer

[![Χρονολόγιο ανιχνεύσεων στο Threat Explorer](/images/Microsoft-Defender/mdo-04-threat-explorer.webp)](/images/Microsoft-Defender/mdo-04-threat-explorer.webp)
📷 **Εικόνα 4**: Χρονολόγιο στο Threat Explorer. Defender portal → Email & collaboration → Explorer.

Το **[Threat Explorer](https://learn.microsoft.com/en-us/defender-office-365/threat-explorer-real-time-detections-about)** είναι ένα ζωντανό, αναζητήσιμο χρονολόγιο των απειλών που φτάνουν μέσω email στο tenant σας. Χρησιμοποιήστε το για να διερευνάτε συγκεκριμένα περιστατικά, να βλέπετε την εξάπλωση μιας καμπάνιας και να επιβεβαιώνετε ότι η καραντίνα και η αποκατάσταση λειτούργησαν. Αφιερώστε 30 λεπτά στο Threat Explorer κάθε εβδομάδα, γιατί θα εντοπίσετε μοτίβα που κανένα dashboard δεν θα αναδείξει από μόνο του.

### Attack Simulation Training

[![Επισκόπηση του Attack Simulation Training](/images/Microsoft-Defender/mdo-05-attack-simulation-training.webp)](/images/Microsoft-Defender/mdo-05-attack-simulation-training.webp)
📷 **Εικόνα 5**: Επισκόπηση Attack Simulation Training. Defender portal → Email & collaboration → Attack simulation training.

Το **[Attack Simulation Training](https://learn.microsoft.com/en-us/defender-office-365/attack-simulation-training-simulations)** σας επιτρέπει να εκτελείτε προσομοιωμένες καμπάνιες phishing προς τους δικούς σας χρήστες, με ρεαλιστικά templates βασισμένα σε πραγματικό threat intelligence. Τα αποτελέσματα οδηγούν σε αυτόματες αναθέσεις εκπαίδευσης για τους χρήστες που «τσίμπησαν» στην προσομοίωση.

Η πρότασή μου: ξεκινήστε μικρά. Μία προσομοίωση ανά τρίμηνο σε μια πιλοτική ομάδα, μετρήστε το ποσοστό κλικ, επεκτείνετε. Κάντε το μαθησιακή εμπειρία και όχι τιμωρία. Η δημόσια κατονομασία όσων «απέτυχαν» είναι ο τρόπος να θυμώσουν οι χρήστες με την ασφάλεια, όχι να εκπαιδευτούν.

## Ένα ρεαλιστικό πλάνο για τον πρώτο μήνα

- **Εβδομάδα 1**: Ανάθεση των preset security policies (Standard σε όλους, Strict στις ομάδες υψηλού κινδύνου). Επιβεβαιώστε ότι η ροή email συνεχίζει κανονικά.
- **Εβδομάδα 2**: Ανασκόπηση της σελίδας **Threat Policies** και ενεργοποίηση ή προσαρμογή custom Safe Links, Safe Attachments και Anti-phishing policies όπου χρειάζεται.
- **Εβδομάδα 3**: Προσθήκη user και domain impersonation protection για διοίκηση, οικονομικό τμήμα και IT. Επαλήθευση από δοκιμαστικό mailbox.
- **Εβδομάδα 4**: (Plan 2) Εκτέλεση της πρώτης καμπάνιας Attack Simulation Training σε πιλοτική ομάδα. Ανασκόπηση των αποτελεσμάτων, χωρίς δημόσια κατονομασία κανενός.

## Πού να συνεχίσετε από εδώ

> 🔗 **Διαβάστε την υπόλοιπη σειρά Microsoft Defender Up Close:** **[Microsoft Defender for Endpoint](/posts/microsoft-defender-for-endpoint-deep-dive/)**, **[Microsoft Defender for Identity](/posts/microsoft-defender-for-identity-deep-dive/)**, **[Microsoft Defender for Cloud Apps](/posts/microsoft-defender-for-cloud-apps-deep-dive/)**.

> 🔗 **Θέλετε να δείτε πώς η παραμετροποίηση του Microsoft Defender for Office 365 αντιστοιχίζεται σε controls του ISO 27001 και του NIS2;** Διαβάστε το **[How We Built a Gold-Winning GRC Programme on Microsoft Secure Score](/posts/secure-score-grc-part-0-intro/)**.

Ακολουθήστε με στο [LinkedIn](https://www.linkedin.com/in/dimosthenisatteia/) για ειδοποιήσεις νέων άρθρων.

## Πηγές Microsoft Learn

- [Microsoft Defender for Office 365, επισκόπηση](https://learn.microsoft.com/en-us/defender-office-365/mdo-about)
- [Microsoft Defender for Office 365 Plan 1 vs Plan 2](https://learn.microsoft.com/en-us/defender-office-365/mdo-about#defender-for-office-365-plan-1-vs-plan-2-cheat-sheet)
- [Preset security policies](https://learn.microsoft.com/en-us/defender-office-365/preset-security-policies)
- [Safe Links](https://learn.microsoft.com/en-us/defender-office-365/safe-links-about)
- [Safe Attachments](https://learn.microsoft.com/en-us/defender-office-365/safe-attachments-about)
- [Attack Simulation Training](https://learn.microsoft.com/en-us/defender-office-365/attack-simulation-training-simulations)
- [Threat Explorer και Real-time detections](https://learn.microsoft.com/en-us/defender-office-365/threat-explorer-real-time-detections-about)

---

<!--
IMAGE NOTES
Image 1: mdo-01-preset-security-policies.webp  (Defender portal → Email & collaboration → Policies & rules → Threat policies → Preset security policies.)
Image 2: mdo-02-safe-links-policy.webp  (Defender portal → Email & collaboration → Policies & rules → Threat policies → Safe Links.)
Image 3: mdo-03-anti-phishing-impersonation.webp  (Defender portal → Email & collaboration → Policies & rules → Threat policies → Anti-phishing.)
Image 4: mdo-04-threat-explorer.webp  (Defender portal → Email & collaboration → Explorer.)
Image 5: mdo-05-attack-simulation-training.webp  (Defender portal → Email & collaboration → Attack simulation training.)
Save to /static/images/Microsoft-Defender/
-->
