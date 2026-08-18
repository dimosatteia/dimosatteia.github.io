---
title: "Data Security Triage Agent στο Defender XDR: Όταν το Purview «μπαίνει» στο SOC σου"
date: 2026-08-18T09:30:00+03:00
lastmod: 2026-08-18T09:40:00+03:00
draft: true
keywords:
  - Microsoft Purview Data Security Triage Agent
  - DLP alerts Microsoft Defender XDR
  - Security Copilot agents Purview
  - Data Loss Prevention triage
  - MC1255406
  - Security compute units SCU
  - Entra Agent ID
  - NIS2 τεκμηρίωση AI agent
  - ISO 27001 A.8 asset management
  - Agentic AI compliance
tags:
  - Microsoft Purview
  - Microsoft Defender XDR
  - Data Loss Prevention
  - Security Copilot
  - Agentic AI
  - NIS2
  - ISO 27001
  - GRC
  - Cybersecurity
  - Message Center
author: "Dimosthenis Atteia"
description: "Ανάλυση του MC1255406: πώς ο Microsoft Purview Data Security Triage Agent φέρνει AI-generated summaries και categorization για DLP alerts μέσα στο Microsoft Defender XDR, με την οπτική ενός CISO για licensing, permissions, agent identity και επιπτώσεις σε NIS2 και ISO 27001."
summary: "Το SOC σου βλέπει πλέον DLP alerts μέσα στο Defender XDR, αλλά ο agent που τα αναλύει ζει στο Purview. Αυτό το split ownership δεν είναι απλώς UX λεπτομέρεια, είναι ένα νέο μοτίβο governance που πρέπει να τεκμηριώσεις πριν το ενεργοποιήσεις."
categories: ["Microsoft 365 Security", "Data Security"]
series:
releases:
  - "new-features"
ShowToc: true
TocOpen: false
weight: -5
cover:
  image: "images/purview-triage-agent-dlp-defender-xdr/triage-agent-dlp-cover.png"
  alt: "Data Security Triage Agent summaries για DLP alerts στο Microsoft Defender XDR"
  caption: "Microsoft Defender XDR → Incidents & alerts → DLP alert με Triage Agent summary"
  relative: true
ShowReadingTime: true
ShowWordCount: true
---

Ένα από τα πράγματα που παρακολουθώ συστηματικά είναι το Message Center, όχι τόσο για τα headline features, όσο για το τι αλλάζει στον τρόπο που ένας analyst θα δουλέψει σε καθημερινή βάση. Το [MC1255406](https://admin.microsoft.com/#/MessageCenter/:/messages/MC1255406) είναι ακριβώς αυτού του τύπου. Δεν φέρνει νέο DLP policy, δεν αλλάζει καμία υπάρχουσα πολιτική. Φέρνει κάτι πιο ύπουλο: μεταφέρει την «εξυπνάδα» ενός Purview agent μέσα στο περιβάλλον όπου ήδη ζει το SOC σου, το Microsoft Defender XDR.

Αν διαχειρίζεσαι DLP alerts σήμερα, ξέρεις το πρόβλημα από πρώτο χέρι: ο όγκος είναι μεγάλος, η ποιότητα του context είναι ασύμμετρη, και η μετάβαση ανάμεσα σε Purview και Defender XDR για να καταλάβεις τι πραγματικά συνέβη κοστίζει χρόνο που δεν έχεις. Το update αυτό προσπαθεί να λύσει ακριβώς αυτό, και το κάνει με έναν τρόπο που αξίζει να δεις πριν το ενεργοποιήσεις, όχι μετά.

## Τι αλλάζει στην πράξη

Ο **Microsoft Purview Data Security Triage Agent**, ένας από τους Security Copilot agents που ζουν μέσα στο Purview, αποκτά πλέον presence μέσα στο Defender XDR. Συγκεκριμένα, τα DLP alerts που εμφανίζονται στο **Investigation & response → Incidents & alerts → Alerts** του Defender XDR θα δείχνουν τα **AI-generated summaries και categorizations** που παράγει ο agent, χωρίς να χρειάζεται ο analyst να ανοίξει καθόλου το Purview για να τα δει.

> 📷 **Εικόνα 1: Microsoft Defender XDR → Incidents & alerts → Alerts. DLP alert με το Triage Agent summary panel ενεργοποιημένο. (Θα προστεθεί screenshot από το δικό μου tenant μετά την ενεργοποίηση του preview.)**

Το πιο ενδιαφέρον σημείο δεν είναι το summary από μόνο του, είναι το πού μπορείς να το ενεργοποιήσεις. Αν ο agent δεν είναι ήδη deployed, ο analyst μπορεί να τον ενεργοποιήσει απευθείας μέσα από τη σελίδα ενός DLP alert στο Defender XDR, χωρίς να χρειάζεται να πάει πρώτα στο Purview. Αυτό είναι σκόπιμο design: μειώνει το friction για ομάδες που ζουν κυρίως στο Defender XDR και δεν έχουν καθημερινή επαφή με το Purview portal.

> 📷 **Εικόνα 2: Banner εντός DLP alert στο Defender XDR που προτείνει deployment του Triage Agent με «Get started». (Placeholder, θα ενημερωθεί με screenshot όταν ανοίξει το preview στο tenant μου.)**

Αυτό όμως δεν σημαίνει ότι το ownership του agent μετακομίζει. Η διαχείριση, δηλαδή custom instructions, pause, deactivate, usage monitoring, παραμένει αποκλειστικά στο Microsoft Purview. Ακόμα κι αν ο agent «γεννηθεί» μέσα από το Defender XDR, το configuration surface του μένει εκεί που ήταν. Αυτό το split, deploy από παντού, manage μόνο από ένα σημείο, είναι το πρώτο πράγμα που θα μπερδέψει τις ομάδες σου αν δεν το εξηγήσεις εκ των προτέρων.

## Το timeline, και γιατί άλλαξε

Η αρχική ανακοίνωση του Μαρτίου 2026 προέβλεπε General Availability τον Αύγουστο 2026. Στο πιο πρόσφατο update, στις 17 Αυγούστου 2026, η Microsoft μετέθεσε το GA κατά έναν ολόκληρο χρόνο, στον **Αύγουστο 2027**, με μόνο σχόλιο ότι ενημέρωσαν το χρονοδιάγραμμα. Το **Public Preview** παραμένει προγραμματισμένο για αρχές έως μέσα Απριλίου 2026.

Δεν είναι η πρώτη φορά που βλέπω Microsoft feature να περνάει πάνω από έναν χρόνο σε preview πριν το GA, ειδικά όταν μιλάμε για agentic AI functionality πάνω σε sensitive data. Από την οπτική ενός οργανισμού που σχεδιάζει roadmap, αυτό σημαίνει ένα πράγμα πρακτικά: αν βασίζεις τη στρατηγική triage σου σε αυτό το feature, θα ζήσεις αρκετούς μήνες σε preview status, με ό,τι αυτό συνεπάγεται για SLA και production readiness commitments προς τη διοίκηση.

## Ποιον αφορά, και τι δεν αλλάζει

Το update αφορά security analysts και admins που κάνουν triage σε DLP alerts μέσα στο Defender XDR, καθώς και οργανισμούς που ήδη χρησιμοποιούν ή σκοπεύουν να χρησιμοποιήσουν τον Data Security Triage Agent. Είναι σημαντικό να το πω καθαρά, γιατί βλέπω συχνά παρανοήσεις γύρω από αυτού του τύπου τα announcements: οι υπάρχουσες DLP πολιτικές και το enforcement τους **δεν αλλάζουν καθόλου**. Ο agent δεν μπλοκάρει, δεν επιτρέπει, δεν τροποποιεί καμία ενέργεια. Απλώς διαβάζει τα ήδη υπάρχοντα alerts και προσθέτει context. Δεν υπάρχει καμία επίπτωση στον τελικό χρήστη.

## Τι χρειάζεται για να δουλέψει, το κομμάτι που συνήθως παραλείπεται

Εδώ είναι το σημείο που τα περισσότερα announcement posts σταματούν, αλλά εγώ θέλω να προχωρήσω λίγο παραπάνω, γιατί το licensing και τα permissions εδώ δεν είναι triviality.

**Licensing:** Ο Triage Agent στο DLP απαιτεί ταυτόχρονα το κλασικό per-seat licensing μοντέλο (χρειάζεσαι license για Microsoft Data Loss Prevention) και το pay-as-you-go μοντέλο του Security Copilot. Ο agent καταναλώνει **Security Compute Units (SCUs)**, και ο αριθμός που καταναλώνεται εξαρτάται από τον όγκο και τον τύπο των alerts που επεξεργάζεται. Αν δεν έχεις SCUs provisioned, ο agent απλά δεν δουλεύει. Αυτό σημαίνει ότι πριν πεις «θα το ενεργοποιήσω», χρειάζεσαι ένα ξεκάθαρο estimate κόστους, όχι υπόθεση.

**Υποδομή:** Το tenant σου πρέπει να είναι onboarded στο Microsoft Security Copilot, με ενεργοποιημένο Microsoft 365 data sharing και το Purview plug-in. Αν δεν έχεις ήδη Security Copilot στο tenant σου, αυτό το feature δεν είναι κάτι που ενεργοποιείς σε ένα απόγευμα.

**Agent Identity:** Αυτό είναι το σημείο που θέλω να σταθώ περισσότερο ως CISO. Ο agent πλέον αποκτά τη δική του **Entra Agent ID**, μια non-human identity μέσα στο Entra, αντί να «δανείζεται» την ταυτότητα του χρήστη που τον έστησε. Αν έχεις ήδη agents που έχουν στηθεί με user identity, η Microsoft συνιστά migration στο νέο agent identity μοντέλο. Για κάθε οργανισμό που προσπαθεί να χτίσει inventory μη ανθρώπινων ταυτοτήτων (κάτι που όλο και περισσότερο ζητούν audit frameworks), αυτό είναι ένα ακόμα identity που πρέπει να μπει στη λίστα.

**Permissions:** Υπάρχουν ξεχωριστοί ρόλοι για setup/configuration (π.χ. Information Protection Admin, Data security AI admin, Purview Copilot Workspace Contributor) και ξεχωριστοί για ανάλυση/παρακολούθηση αποτελεσμάτων (π.χ. Information Protection Analyst, Purview Agent Analysis). Δεν είναι το ίδιο permission set με αυτό που ίσως έχουν ήδη οι αναλυτές σου για τα κλασικά DLP alerts, οπότε ένα role review πριν το rollout δεν είναι προαιρετικό.

## Πώς αποφασίζει ο agent τι είναι επείγον

Κάτι που θεωρώ χρήσιμο να ξέρει κανείς πριν εμπιστευτεί το categorization: ο agent ιεραρχεί τα alerts με βάση συνδυασμό παραγόντων, content risk (sensitive information types, trainable classifiers, sensitivity labels), exfiltration risk (κοινή χρήση ευαίσθητου περιεχομένου εκτός οργανισμού), policy risk (mode και actions της πολιτικής), και αλλαγές στο labeling του περιεχομένου. Μπορείς επίσης να δώσεις custom instructions σε φυσική γλώσσα, π.χ. να δώσει προτεραιότητα σε alerts που αφορούν οικονομικά ή νομικά δεδομένα, και ο agent μεταφράζει αυτές τις οδηγίες σε structured classification logic.

Το σημαντικό εδώ, από audit οπτική: κάθε recategorization μέσω feedback δεν εφαρμόζεται αυτόματα σε ήδη υπάρχοντα alerts, χρειάζεται manual triage run. Αν κάποιος υποθέσει ότι το feedback διορθώνει αναδρομικά την ιστορία των alerts, θα βρεθεί προ εκπλήξεως σε ένα post-incident review.

## Η οπτική NIS2 και ISO 27001

Αυτό είναι το κομμάτι που, ειλικρινά, με ενδιαφέρει περισσότερο από το ίδιο το feature.

**AI/ML που επεξεργάζεται δεδομένα πελατών.** Η ίδια η Microsoft το κατατάσσει ρητά ως compliance consideration: πρόκειται για agent capability που αλληλεπιδρά με δεδομένα πελατών, επεξεργαζόμενος ήδη υπάρχοντα DLP alert data για να βοηθήσει στο triage. Σε ένα NIS2 πλαίσιο, όπου πρέπει να τεκμηριώνεις κάθε νέο επεξεργαστή ή μηχανισμό επεξεργασίας δεδομένων ασφαλείας, αυτό δεν είναι απλώς «νέο feature», είναι νέα κατηγορία automated decision-support που πρέπει να περάσει από risk assessment πριν το ενεργοποιήσεις σε production.

**Agent identity ως νέο asset προς διαχείριση.** Το ISO 27001, ιδίως η λογική πίσω από τα A.8 controls για διαχείριση assets, απαιτεί να ξέρεις τι «ταυτότητες» έχουν πρόσβαση στο περιβάλλον σου και με ποια δικαιώματα. Ένας agent με δικό του Entra Agent ID, ρόλους όπως Information Protection Analyst και Purview Copilot Workspace Contributor, και πρόσβαση σε ευαίσθητο περιεχόμενο, είναι ακριβώς το είδος του non-human identity που πρέπει να εμφανίζεται στο δικό σου asset register, με τον ίδιο τρόπο που θα κατέγραφες έναν service account.

**Διαχωρισμός deployment από management ως compensating control.** Το γεγονός ότι ο agent μπορεί να ενεργοποιηθεί από αναλυτές μέσα από το Defender XDR, αλλά να διαχειρίζεται (και να απενεργοποιείται) μόνο από το Purview, είναι στην πραγματικότητα ένα ενσωματωμένο segregation of duties. Αξίζει να το τεκμηριώσεις ρητά στις πολιτικές σου ως compensating control, γιατί σου δίνει έτοιμο επιχείρημα σε έναν auditor που ρωτάει «ποιος μπορεί να αλλάξει τη συμπεριφορά αυτού του AI agent».

**Αμετάβλητο DLP enforcement.** Το ότι οι υπάρχουσες πολιτικές και το audit logging δεν επηρεάζονται καθόλου είναι, από compliance σκοπιά, καλό νέο, δεν χρειάζεται re-certification του DLP policy set σου. Το μόνο που αλλάζει είναι το analyst-facing layer, όχι το enforcement layer. Αυτό αξίζει να το γράψεις ρητά στο change record σου, ώστε να μην χρειαστεί να αποδείξεις κάτι που δεν χρειάζεται απόδειξη.

## Τι κάνω πριν ενεργοποιήσω κάτι τέτοιο

Με βάση τα παραπάνω, αυτή είναι η λίστα που θα ακολουθήσω στο δικό μου tenant πριν προχωρήσω σε rollout:

- Επιβεβαίωση ότι το tenant είναι onboarded σε Security Copilot και ότι υπάρχει προϋπολογισμένο SCU pool για το αναμενόμενο volume DLP alerts.
- Review των ρόλων που θα δοθούν σε ποιον, ξεχωρίζοντας ρητά ποιοι μπορούν να κάνουν deploy/configure από ποιοι απλώς βλέπουν αποτελέσματα.
- Καταγραφή του νέου Entra Agent ID στο inventory μη ανθρώπινων ταυτοτήτων, με ίδιο επίπεδο λεπτομέρειας όπως κάθε service account.
- Ενημέρωση της τεκμηρίωσης security operations, ώστε οι αναλυτές να ξέρουν πού μπορούν να δουν, και πού μπορούν να αλλάξουν, τη συμπεριφορά του agent.
- Καταγραφή στο risk register ότι πρόκειται για preview capability με πολυετές timeline μέχρι GA, ώστε να μην βασιστεί κρίσιμη διαδικασία πάνω σε κάτι που ακόμα δεν είναι production-committed.

## Το συμπέρασμα

Το MC1255406 δεν είναι από τα announcements που αλλάζουν άμεσα το risk profile ενός οργανισμού, το DLP enforcement μένει ακριβώς όπως ήταν. Αλλά είναι ένα καλό παράδειγμα ενός μοτίβου που βλέπω να επαναλαμβάνεται σε όλο το Microsoft 365 security stack: agentic AI capabilities που «εμφανίζονται» σε ένα portal αλλά «ζουν» διοικητικά σε άλλο. Αν δεν το ξεκαθαρίσεις εκ των προτέρων στην ομάδα σου, θα καταλήξεις με analysts που ψάχνουν να απενεργοποιήσουν κάτι από λάθος σημείο, ή χειρότερα, με έναν agent identity που κανείς δεν ξέρει ποιος τον στήνει ή πώς παρακολουθείται.

Αν το preview ανοίξει στο tenant σου την άνοιξη, δοκίμασέ το πρώτα σε περιβάλλον χαμηλού ρίσκου, δες πώς κατηγοριοποιεί τα δικά σου alerts, και μόνο τότε αποφάσισε αν αξίζει να επενδύσεις SCUs σε αυτό σε παραγωγική κλίμακα.

Αν τρέχεις ήδη κάποιον από τους Purview Security Copilot agents, χαίρομαι πάντα να ανταλλάξουμε εμπειρία στα σχόλια ή στο LinkedIn.
