---
title: "Microsoft Secure Score: Πρακτικός Οδηγός για Junior Μηχανικό"
date: 2026-04-27T10:00:00+03:00
draft: false
keywords:
  - Microsoft Secure Score NIS2
  - Microsoft Secure Score Νόμος 5160/2024
  - Microsoft Secure Score για Υ.Α.Σ.Π.Ε.
  - Microsoft Secure Score ελληνικά
  - Microsoft 365 ασφάλεια NIS2
  - Microsoft Defender XDR ελληνικά
  - οδηγός Microsoft Secure Score για junior μηχανικό
  - Υ.Α.Σ.Π.Ε. εργαλεία Microsoft 365
  - τεχνικά μέτρα NIS2 Microsoft 365
tags:
  - Microsoft Secure Score
  - Microsoft Defender XDR
  - Microsoft 365
  - Ασφάλεια
  - NIS2
  - Νόμος 5160/2024
  - Microsoft Entra ID
  - Microsoft Defender for Endpoint
  - Microsoft 365 Security
  - Cyber GRC
  - ISO 27001
  - Junior Security Engineer
  - Security Posture Management
author: "Dimosthenis Atteia"
description: "Microsoft Secure Score για Έλληνα Υ.Α.Σ.Π.Ε.: από το score στη μετρήσιμη συμμόρφωση με NIS2 και Νόμο 5160/2024."
summary: "Πρακτικός οδηγός Microsoft Secure Score για τον Έλληνα junior μηχανικό και Υ.Α.Σ.Π.Ε. — από το score στην πραγματική μείωση κινδύνου, στο πλαίσιο NIS2 και του Νόμου 5160/2024."
categories: ["GRC & Frameworks", "Microsoft 365"]
series: ["Microsoft Secure Score as a Cyber GRC Instrument"]
ShowToc: true
TocOpen: false
weight: 5
cover:
  image: "/images/MSS-NIS2.png"
  alt: "Microsoft Secure Score για τον Έλληνα Υ.Α.Σ.Π.Ε. στο πλαίσιο NIS2"
  caption: "Πρακτικός οδηγός — Microsoft Secure Score & Defender"
---

> 📌 **TL;DR**
> - Το **Microsoft Secure Score** είναι ποσοτικός δείκτης security posture.
> - Διαβάζει configuration data από όλο το **Microsoft Defender stack** (Entra ID, Defender for Endpoint, Office 365, Cloud Apps, Purview) και δίνει ένα ενιαίο νούμερο.
> - Για τον Έλληνα **Υ.Α.Σ.Π.Ε.** στο πλαίσιο του **Νόμου 5160/2024 (NIS2)**, αποτελεί την ταχύτερη γέφυρα από τη συμμόρφωση «στα χαρτιά» σε **μετρήσιμη μείωση τεχνικού κινδύνου**.
> - Δεν αντικαθιστά τη συστηματική ανάλυση κινδύνου — αλλά δίνει μια ιεραρχημένη βάση τεχνικών controls που μπορεί να ξεκινήσει σήμερα.

## Δευτέρα πρωί χαμένος στο Microsoft Defender portal...

Είναι Δευτέρα πρωί και ένας junior μηχανικός ασφάλειας ανοίγει για πρώτη φορά το **Microsoft Defender** portal. Αντικρίζει εκατοντάδες ρυθμίσεις διασκορπισμένες σε Entra ID, Exchange Online, SharePoint, Intune και Defender for Endpoint. Από πού να ξεκινήσει; Πώς θα ξέρει ότι αυτό που κάνει σήμερα έχει πραγματικό αντίκτυπο στο επίπεδο ασφάλειας του οργανισμού; Πια είναι τα **Secure Score best practices** και πια **Secure Score actions** απαιτούνται?

Η απάντηση συχνά κρύβεται σε ένα εργαλείο που υποτιμάται: το **Microsoft Secure Score** με άπειρα **Microsoft Secure Score recommendations**

## Γιατί τώρα — NIS2 και ο Νόμος 5160/2024

Στην Ελλάδα, ο **Νόμος 5160/2024** ενσωμάτωσε την οδηγία NIS2 και επέκτεινε δραματικά τον αριθμό των οργανισμών με υποχρεώσεις κυβερνοασφάλειας — συμπεριλαμβανομένων εκατοντάδων μικρομεσαίων επιχειρήσεων που βρίσκονται για πρώτη φορά αντιμέτωπες με απαιτήσεις risk management, incident reporting και τεκμηριωμένων μέτρων ασφαλείας.

Παράλληλα, ο νόμος επιβάλλει τον ορισμό **Υπευθύνου Ασφάλειας Πληροφοριακών και Επικοινωνιακών Συστημάτων (Υ.Α.Σ.Π.Ε.)**, ρόλος που σε πολλές μικρομεσαίες ανατίθεται σε στελέχη IT χωρίς αμιγώς εξειδίκευση στην ασφάλεια ή σε εξωτερικούς συνεργάτες με περιορισμένο χρόνο εμβάθυνσης. Το αποτέλεσμα είναι ένα γνώριμο μοτίβο: η συμμόρφωση αντιμετωπίζεται ως «paperwork exercise», ενώ τα τεχνικά μέτρα — αυτά που πραγματικά μειώνουν τον κίνδυνο — μένουν πίσω.

Εδώ ακριβώς το **Microsoft Secure Score** μπορεί να λειτουργήσει ως **γρήγορη πρώτη γραμμή άμυνας**: για έναν Υ.Α.Σ.Π.Ε. που διαχειρίζεται έναν Microsoft 365 tenant με Business Premium ή E3/E5 license, προσφέρει έτοιμη, ιεραρχημένη λίστα τεχνικών controls που ευθυγραμμίζονται φυσικά με τα core requirements της NIS2 — MFA, access control, endpoint protection, email security, data protection, audit logging.

Δεν αντικαθιστά τη συστηματική ανάλυση κινδύνου που απαιτεί ο νόμος, αλλά δίνει στον Υ.Α.Σ.Π.Ε. κάτι εξίσου πολύτιμο: μια **μετρήσιμη βάση** που μπορεί να βελτιωθεί σταδιακά, να τεκμηριωθεί στους ελέγχους και να παρουσιαστεί στη διοίκηση ως concrete πρόοδος — αντί για ασαφείς διαβεβαιώσεις. Σε ένα τοπίο όπου ο πήχης ανέβηκε απότομα και οι πόροι παραμένουν περιορισμένοι, αυτή η γρήγορη μετάβαση από αμηχανία σε δράση μπορεί να κάνει τη διαφορά ανάμεσα σε έναν οργανισμό που απλώς υπάρχει στα μητρώα και σε έναν που πραγματικά αμύνεται.

## Τι είναι, στ' αλήθεια, το Microsoft Secure Score

Το Microsoft Secure Score είναι ένα ποσοτικό μέτρο της θέσης ασφάλειας (security posture) του κάθε οργανισμού εντός του Microsoft 365 και ευρύτερα του οικοσυστήματος Defender. Το βρίσκουμε στη διεύθυνση **[security.microsoft.com/securescore](https://security.microsoft.com/securescore)**, ως ενσωματωμένο τμήμα του Microsoft Defender portal.

Σε απλή γλώσσα: αναλύει τις τρέχουσες ρυθμίσεις του tenant μας, τις συγκρίνει με τις βέλτιστες πρακτικές της Microsoft και μας δίνει έναν αριθμό. Όσο υψηλότερο το ποσοστό, τόσο περισσότερα από τα συνιστώμενα actions έχουμε εφαρμόσει.

Δεν είναι όμως εγγύηση ότι δεν θα παραβιαστούμε — και αυτό είναι κρίσιμο να εμπεδώσει κάθε junior μηχανικός. Το score αντικατοπτρίζει το **πόσο χρησιμοποιούμε τα διαθέσιμα controls**, όχι την πραγματική πιθανότητα παραβίασης.

[![Microsoft Secure Score overview page στο Microsoft Defender portal για τον Έλληνα Υ.Α.Σ.Π.Ε. και NIS2 συμμόρφωση](/images/secure-score-defender-praktikos-odigos/01-overview.png)](/images/secure-score-defender-praktikos-odigos/01-overview.png)
> 📷 **Image 1 — Το Microsoft Secure Score overview page.**
> *Microsoft Defender portal → Exposure management → Microsoft Secure Score.*

## Πώς δουλεύει μηχανικά το Microsoft Secure Score

Κάθε recommended action έχει αξία σε πόντους, βασισμένη στο πόσο μειώνει τον κίνδυνο. Η ενεργοποίηση MFA για όλους τους χρήστες, για παράδειγμα, αξίζει σημαντικά περισσότερους πόντους από μια μικρή ρύθμιση στο SharePoint — γιατί ακριβώς κλείνει μεγαλύτερη επιφάνεια επίθεσης.

Δύο πράγματα αξίζει να κρατήσουμε:

- Υπάρχει **partial credit**. Αν προστατεύουμε 50 από τους 100 χρήστες μας με MFA, παίρνουμε τους μισούς πόντους. Δεν είναι all-or-nothing — οπότε ξεκινάμε από κάπου, όσο μικρό κι αν φαίνεται.
- Κάθε recommendation έχει **status** που μπορούμε να ορίσουμε: *To address*, *Planned*, *Risk accepted*, *Resolved through third party*, *Resolved through alternate mitigation*, *Completed*. Είναι πολύτιμο όταν χρησιμοποιούμε ένα control που η Microsoft δεν «βλέπει» άμεσα — π.χ. ένα third-party MFA solution. Δηλώνουμε χειροκίνητα την ισοδύναμη αντιμετώπιση και κερδίζουμε τους πόντους χωρίς να αλλοιώνεται η εικόνα της θέσης μας.

[![Microsoft Secure Score Status dropdown με επιλογές Resolved through alternate mitigation για third-party controls](/images/secure-score-defender-praktikos-odigos/03-overview.png)](/images/secure-score-defender-praktikos-odigos/03-overview.png)
> 📷 **Image 2 — Status dropdown σε recommendation.**
> *Οι επιλογές status. Το «Resolved through alternate mitigation» είναι αυτό που χρησιμοποιούμε όταν ένα third-party tool καλύπτει το control.*

Οι ενημερώσεις των πόντων γίνονται περίπου κάθε 24 ώρες — δεν περιμένουμε, λοιπόν, να δούμε την αλλαγή που κάναμε άμεσα μετά από ένα toggle.

## Η σύνδεση με το Microsoft Defender — γιατί το Secure Score δεν δουλεύει σε vacuum

Εδώ το Secure Score αποκτά την πραγματική του αξία. Δεν είναι standalone tool, είναι ο **κοινός δείκτης** που ενοποιεί σήματα από όλο το Defender stack. Πρέπει να το σκεφτούμε ως το κεντρικό dashboard που μαζεύει ό,τι βλέπει το καθένα από τα παρακάτω εργαλεία:

- **Microsoft Defender for Endpoint** — δίνει τα δεδομένα για την κατηγορία **Devices** (γνωστή και ως Microsoft Secure Score for Devices). Αξιολογεί misconfigurations, vulnerabilities και security baselines στους endpoints.
- **Microsoft Defender for Office 365** — τροφοδοτεί συστάσεις για **email & συνεργασία**: Safe Links, Safe Attachments, anti-phishing policies, impersonation protection.
- **Microsoft Entra ID & Defender for Identity** — υπεύθυνα για τον πυλώνα **Identity**. Εδώ μπαίνουν MFA, conditional access, αποσύνδεση από legacy authentication, privileged identity management.
- **Microsoft Defender for Cloud Apps** — καλύπτει ορατότητα και έλεγχο σε cloud εφαρμογές, OAuth permissions, shadow IT.
- **Microsoft Purview / Information Protection** — φροντίζει για τον πυλώνα **Data**: DLP policies, sensitivity labels, audit log retention.

Όταν αλλάζουμε λοιπόν μια ρύθμιση π.χ. στο Intune ή στο Entra, δεν «δουλεύουμε στο Secure Score» — δουλεύουμε στην πηγή και το score απλώς αντικατοπτρίζει το αποτέλεσμα. Αυτή η σύνδεση είναι που μετατρέπει το score από έναν αριθμό σε **οδηγό προτεραιοτήτων**.

## Οι τέσσερις πυλώνες του Secure Score

Για να σχηματίσουμε πραγματική εικόνα, πρέπει να σκεφτούμε το score ως τέσσερα διακριτά και διαφορετικά μέτωπα:

**Ταυτότητα (Identity):** Ο πιο κρίσιμος πυλώνας. Οι περισσότερες σύγχρονες επιθέσεις ξεκινούν από credentials, και οι actions εδώ έχουν τη μεγαλύτερη αξία πόντων — όχι τυχαία. Προτεραιότητες: MFA για όλους, απενεργοποίηση legacy auth (POP3, IMAP, SMTP basic), conditional access policies, just-in-time admin πρόσβαση μέσω PIM.

**Συσκευές (Devices):** Onboarding όλων των endpoints στο Defender for Endpoint, εφαρμογή security baselines για Windows, encryption (BitLocker), συμμόρφωση μέσω Intune ως προϋπόθεση πρόσβασης σε εταιρικά δεδομένα.

**Εφαρμογές (Apps):** Safe Links και Safe Attachments στο Defender for Office 365, anti-phishing policies με impersonation protection, αυστηρός έλεγχος OAuth grants σε cloud εφαρμογές.

**Δεδομένα (Data):** Sensitivity labels για ταξινόμηση και κρυπτογράφηση, DLP policies σε Exchange και Teams, ενεργοποίηση audit log search σε επίπεδο tenant.

## Τι ΔΕΝ είναι το Secure Score — μια αναγκαία διευκρίνιση

Μας ρωτάει ο compliance manager αν ο οργανισμός μας είναι GDPR-compliant; Το Secure Score δεν θα μας απαντήσει. Για αυτό υπάρχει το **Microsoft Purview Compliance Manager**, εργαλείο διαφορετικό σε σκοπό και μοντέλο. Το Secure Score εστιάζει σε **configuration & posture**, όχι σε regulatory adherence.

Επίσης, μην το συγχέουμε με το **Cloud Secure Score** του Microsoft Defender for Cloud — αυτό αξιολογεί την υποδομή Azure (VMs, Storage, SQL) με διαφορετικό μοντέλο υπολογισμού. Είναι συμπληρωματικό, όχι ισοδύναμο.

## Από πού να ξεκινήσει ένας junior μηχανικός με το Microsoft Secure Score

Αν αύριο μπούμε για πρώτη φορά στο Defender portal, μια λογική σειρά ενεργειών είναι:

[![Microsoft Secure Score Recommended actions ταξινομημένα κατά Score impact για NIS2 προτεραιοποίηση κινδύνου](/images/secure-score-defender-praktikos-odigos/02-overview.png)](/images/secure-score-defender-praktikos-odigos/02-overview.png)
> 📷 **Image 3 — Recommended actions ταξινομημένα κατά Score impact.**
> *Microsoft Secure Score → Recommended actions tab.*

1. **Ταξινομούμε** τα recommended actions με βάση το **Score impact** σε φθίνουσα σειρά.
2. **Φιλτράρουμε** για κατηγορία **Identity** πρώτα — εδώ είναι το low-hanging fruit με τη μεγαλύτερη μείωση κινδύνου.
3. Πριν ενεργοποιήσουμε οτιδήποτε, **διαβάζουμε** το πεδίο **User impact**. Ορισμένα actions — όπως block legacy auth — μπορούν να σπάσουν παλαιές εφαρμογές. Πάντα pilot σε μικρή ομάδα πριν την ευρεία εφαρμογή.
4. **Χρησιμοποιούμε** το **History tab** για να παρακολουθήσουμε trends και να αποδείξουμε πρόοδο σε stakeholders και διοίκηση.
5. **Συγκρίνουμε** τη βαθμολογία μας με το **benchmark** παρόμοιων οργανισμών (μέγεθος, κλάδος) — δίνει ένα κρίσιμο context στο νούμερο που έχουμε επιτύχει.

## Το μεγάλο συμπέρασμα

Το **Microsoft Secure Score** δεν είναι παιχνίδι gamification για να ανέβουμε στο 80%. Είναι ένας **πρακτικός μηχανισμός μετάφρασης** ανάμεσα στις best practices της Microsoft και στο τι μπορούμε να κάνουμε σήμερα, αυτή τη στιγμή, στο tenant μας. Για τον junior μηχανικό που νιώθει χαμένος μπροστά στο εύρος του Defender ecosystem, είναι ο πιο γρήγορος τρόπος να μετατρέψει το χάος σε προτεραιότητες — και τις προτεραιότητες σε μετρήσιμη μείωση κινδύνου σε ταυτότητες χρηστών, συσκευές, εφαρμογές και δεδομένα.

Το **Microsoft Secure Score** από μόνο του δεν έχει αξία· η αξία γεννιέται όταν κάθε πόντος μεταφράζεται σε μια ρύθμιση που πραγματικά μειώνει την έκθεση του οργανισμού μας. Και αυτή ακριβώς η μετάφραση είναι το πραγματικό έργο της κυβερνοασφάλειας.

## Θες να εμβαθύνεις περισσότερο;

> 🔗 **Αν θες να δεις πώς το Microsoft Secure Score μπορεί να γίνει η ραχοκοκαλιά ενός ολοκληρωμένου GRC προγράμματος ευθυγραμμισμένου με ISO 27001:2022 και NIS2,** ρίξε μια ματιά στην σειρά **[Microsoft Secure Score as a Cyber GRC Instrument](/series/microsoft-secure-score-as-a-cyber-grc-instrument/)**:
>
> - **[Series Introduction — How We Built a Gold-Winning GRC Programme on Microsoft Secure Score](/posts/secure-score-grc-part-0-intro/)**
> - **[Part 1 — Opening Your First Recommendation](/posts/secure-score-grc-part-1-anatomy/)**
> - **[On Monday 04/05/2026 head to [Part 2 — Where It Sits in the Microsoft Defender World]** when you're ready. See you there.
<!-- (/posts/secure-score-grc-part-2-ecosystem/) -->

Follow me on [LinkedIn](https://www.linkedin.com/in/dimosthenisatteia/) for new-post notifications.

## Πηγές & επιπλέον υλικό

- [Microsoft Secure Score overview](https://learn.microsoft.com/en-us/defender-xdr/microsoft-secure-score)
- [How Microsoft Secure Score is calculated](https://learn.microsoft.com/en-us/defender-xdr/microsoft-secure-score-improvement-actions)
- [Microsoft Defender XDR overview](https://learn.microsoft.com/en-us/defender-xdr/microsoft-365-defender)
- [Microsoft Purview Compliance Manager](https://learn.microsoft.com/en-us/purview/compliance-manager)
- [Microsoft Defender for Cloud — Secure Score](https://learn.microsoft.com/en-us/azure/defender-for-cloud/secure-score-security-controls)
- [Νόμος 5160/2024](https://cyber.gov.gr/wp-content/uploads/2024/12/ENOTHTA_5_%CE%9D%CE%9F%CE%9C%CE%9F%CE%98%CE%95%CE%A3%CE%99%CE%91_fek_a_195_2024-5160-2024.pdf) 
