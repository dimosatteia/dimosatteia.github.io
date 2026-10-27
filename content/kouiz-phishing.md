---
title: "Κουίζ phishing: 10 επιθέσεις, βρες τα σημάδια και τι κάνεις"
date: 2026-10-16T13:00:00+03:00
lastmod: 2026-10-16T19:30:00+03:00
draft: false
url: "/kouiz-phishing/"
menu:
  main:
    identifier: tool-kouiz-phishing
    parent: tools
    name: "🎣 Κουίζ phishing"
    weight: 7
author: "Dimosthenis Atteia"
description: "Δωρεάν κουίζ phishing στα Ελληνικά: δέκα πραγματικά σενάρια επιθέσεων με email, SMS και ψεύτικες σελίδες. Βρες τα σημάδια, διάλεξε τι κάνεις και δες τι το σταματά στο Microsoft 365."
seoDescription: "Δέκα σενάρια phishing με email, SMS και ψεύτικες σελίδες: βρες τα σημάδια, διάλεξε τι κάνεις και δες τι το σταματά στο Microsoft 365."
keywords:
  - κουίζ phishing
  - αναγνώριση phishing
  - παραδείγματα phishing email
  - smishing
  - CEO fraud
  - εκπαίδευση προσωπικού ΚΥΑ 1689/2025
  - Attack simulation training
cover:
  image: "/images/phishing/kouiz-phishing.webp"
  alt: "Οθόνη με αποτελέσματα προσομοίωσης phishing και ανάλυση ύποπτου email"
  maxWidth: 800
categories: ["Security Awareness", "Email & Collaboration"]
tags:
  - Phishing
  - Phishing Awareness
  - Security Awareness
  - Attack Simulation Training
  - Impersonation
  - Microsoft Defender for Office 365
  - NIS2
  - ISO 27001
  - GDPR
homeFeed: true
# MITRE ATT&CK®: ονόματα στο data/mitre.yaml
mitre: ["T1566.001", "T1566.002", "T1598.003", "T1204.001", "T1204.002", "T1684.001", "T1660", "M1017"]
weight: -6
showToc: false
ShowReadingTime: false
ShowBreadCrumbs: false
hideMeta: true
verificationType: "legal"
verification:
  - feature: "ΚΥΑ 1689/2025 (ΦΕΚ Β΄ 2186/06.05.2025): ελάχιστη θεματολογία της εκπαίδευσης, με ασφαλή χρήση email, αναγνώριση phishing και κοινωνικής μηχανικής, κωδικούς, MFA, ασφαλή περιήγηση και αναφορά περιστατικών"
    status: "Ισχύει"
    license: "Άρθρο 21, περ. α"
    source: "https://cyber.gov.gr/wp-content/uploads/2025/05/20250202186.pdf"
    verified: 2026-10-16
  - feature: "Attack simulation training: προσομοιώσεις με τεχνικές Credential Harvest, Malware Attachment, Link in Attachment και Link to Malware"
    status: "GA"
    license: "Microsoft Defender for Office 365 Plan 2"
    source: "https://learn.microsoft.com/defender-office-365/attack-simulation-training-simulations"
    verified: 2026-10-16
  - feature: "Anti-phishing policies: first contact safety tip σε κάθε mailbox, προστασία από user και domain impersonation στο Defender for Office 365"
    status: "GA"
    license: "Exchange Online Protection και Microsoft Defender for Office 365"
    source: "https://learn.microsoft.com/defender-office-365/anti-phishing-policies-about"
    verified: 2026-10-16
---

Τα περισσότερα περιστατικά ξεκινούν από ένα μήνυμα και ένα κλικ. Το κουίζ σου δείχνει δέκα επιθέσεις όπως φτάνουν στην πραγματικότητα: ψεύτικη τράπεζα, δέμα που «δεν παραδόθηκε», λήξη κωδικού Microsoft 365, CEO fraud, ακόμη και μια ψεύτικη «υποχρεωτική εκπαίδευση NIS2». Σε κάθε μία βρίσκεις τα σημάδια, διαλέγεις τι κάνεις, και βλέπεις τι το σταματά στο Microsoft 365. Δεν χρειάζεται εγγραφή.

{{< phishing-quiz >}}

## Τα τέσσερα σημάδια που επαναλαμβάνονται

Αν θυμάσαι μόνο ένα πράγμα από το κουίζ, ας είναι αυτό: σχεδόν κάθε επίθεση συνδυάζει τα ίδια τέσσερα στοιχεία.

**Αποστολέας που σχεδόν ταιριάζει.** Ένα domain με μια λέξη παραπάνω (mycompany-group αντί για mycompany) ή με λέξεις όπως secure, login, verify. Κοίτα το κομμάτι ακριβώς πριν από την κατάληξη.

**Βιασύνη.** 2 ώρες, 12 ώρες, «σήμερα». Η προθεσμία υπάρχει για να μη ρωτήσεις κανέναν.

**Φόβος ή κέρδος.** Κλείσιμο λογαριασμού, πειθαρχικά, πρόστιμο, ή μια επιστροφή φόρου. Συχνά και τα δύο μαζί.

**Μια ενέργεια που παρακάμπτει τη διαδικασία.** Κωδικός σε σύνδεσμο, macros σε συνημμένο, .exe από email, πληρωμή χωρίς έγκριση.

Και κάτι που δεν είναι πια σημάδι: τα λάθη στα Ελληνικά. Με τα εργαλεία AI, τα μηνύματα phishing γράφονται άψογα.

## Τι κάνεις πάντα

Δεν πατάς τον σύνδεσμο και δεν απαντάς στο μήνυμα. Το αναφέρεις με το κουμπί **Report** στο Outlook, ώστε το IT να το σβήσει και από τους υπόλοιπους. Αν χρειάζεται επιβεβαίωση, την κάνεις από κανάλι που ξέρεις: τηλέφωνο, Teams, ή τη διεύθυνση του site που γράφεις μόνος σου. Αν πάτησες ήδη, το λες αμέσως. Όσο πιο γρήγορα αναφερθεί, τόσο μικρότερη η ζημιά.

## Πώς συνδέεται με την τεκμηρίωση της εκπαίδευσης

Η [ΚΥΑ 1689/2025](/kya-1689-2025/#21-α) ζητά περιοδική εκπαίδευση για όλο το προσωπικό με ελάχιστη θεματολογία επτά θεμάτων. Το κουίζ καλύπτει τα πέντε: email και phishing (αα), κωδικούς (αβ), MFA (αγ), ασφαλή περιήγηση (αδ) και αναφορά περιστατικού (αζ). Τα θέματα για τηλεργασία και οικιακό δίκτυο (αε) και για αντίγραφα ασφαλείας (αστ) θέλουν άλλο υλικό.

Το κουίζ είναι εργαλείο μάθησης, όχι τεκμήριο. Δεν κρατά ονόματα ούτε αποτελέσματα, άρα δεν αποδεικνύει ποιος εκπαιδεύτηκε. Μπορείς όμως να το χρησιμοποιήσεις σε μια συνεδρία με το προσωπικό και να την καταγράψεις στο μητρώο εκπαίδευσης. Για μετρήσιμο τεκμήριο, τρέξε προσομοιώσεις με τις ίδιες τεχνικές στο Attack simulation training (Credential Harvest, Malware Attachment, Link in Attachment, Link to Malware) και πέρασε τα συγκεντρωτικά αποτελέσματα στο βήμα 4 του εργαλείου [Εκπαίδευση προσωπικού: είναι τεκμηριωμένη για τον ελεγκτή;](/tekmiriosi-ekpaideysis/). Εκεί η εξέλιξη από κύκλο σε κύκλο γίνεται το τεκμήριο αποτελεσματικότητας που ζητά η περίπτωση γ.

Η ίδια λογική καλύπτει και τα άλλα πλαίσια: το control A.6.3 του [ISO/IEC 27001](/iso-27001/#A-6-3) για την ευαισθητοποίηση, το άρθρο 21 παρ. 2 στοιχ. ζ της [Οδηγίας NIS2](/nis2/#21-2-ζ) για την κυβερνοϋγιεινή, και το άρθρο 32 παρ. 4 του [GDPR](/gdpr/#32-4), αφού ένα κλικ σε phishing είναι συχνά η αρχή μιας παραβίασης δεδομένων.

## Τα σενάρια στο MITRE ATT&CK®

Κάθε σενάριο του κουίζ είναι μια τεχνική που έχει καταγράψει το [MITRE ATT&CK®](/mitre/). Αν φτιάχνεις υλικό εκπαίδευσης ή προσομοιώσεις, ο πίνακας σου δείχνει ποια τεχνική καλύπτει κάθε άσκηση.

| Σενάρια του κουίζ | Τεχνική MITRE ATT&CK® |
|---|---|
| Τράπεζα, λήξη κωδικού Microsoft 365, ύποπτη σύνδεση, «εκπαίδευση NIS2», συνδρομή που λήγει | {{< attack "T1566.002" >}} για το link, {{< attack "T1598.003" >}} για τη σελίδα που μαζεύει τον κωδικό |
| Δέμα που «δεν παραδόθηκε» με SMS | {{< attack "T1660" >}} (Mobile) |
| Νέα μισθολογική δομή με συνημμένο | {{< attack "T1566.001" >}} και {{< attack "T1204.002" >}} όταν ανοίξεις το αρχείο |
| Πρόστιμο με link μέσα σε συνημμένο | {{< attack "T1566.001" >}} και {{< attack "T1204.001" >}} όταν πατήσεις το link |
| «Επείγουσα ενημέρωση» Windows | {{< attack "T1566.002" >}} και {{< attack "T1204.002" >}} όταν τρέξεις το αρχείο |
| CEO fraud | {{< attack "T1684.001" >}} |

Το mitigation που προτείνει το MITRE για τις τεχνικές με email και για το impersonation είναι το {{< attack "M1017" >}} User Training. Αυτό ακριβώς είναι το κουίζ.

## Επίσημες πηγές {#last-verified}

{{< verification >}}

Όλα τα ονόματα, οι διευθύνσεις και οι αριθμοί στο κουίζ είναι κατασκευασμένα. Τα domains τελειώνουν σε .example, που είναι δεσμευμένο για παραδείγματα και δεν ανήκει σε κανέναν. Το thecybersec.gr είναι προσωπικό blog και δεν εκπροσωπεί τη Microsoft.

{{< tool-link page="/tekmiriosi-ekpaideysis" lead="Επόμενο βήμα:" label="τεκμηρίωσε την εκπαίδευση του προσωπικού σου" tail="με φάκελο .pdf και μητρώο .xlsx." >}}
