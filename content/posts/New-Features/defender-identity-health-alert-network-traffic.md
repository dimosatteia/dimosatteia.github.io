---
title: "Defender for Identity: Το νέο health alert για απούσα δικτυακή κίνηση domain controller, και γιατί δεν πρέπει να το προσπεράσεις"
date: 2026-08-21T10:00:00+03:00
lastmod: 2026-08-21T10:20:00+03:00
draft: false
keywords:
  - Microsoft Defender for Identity
  - MDI health alerts
  - Sensor health issues
  - No traffic received from domain controller
  - Port mirroring domain controller
  - Npcap Defender for Identity
  - Receive Segment Coalescing RSC
  - MC1455017
  - NIS2 παρακολούθηση ασφάλειας
  - ISO 27001 A.8.16 monitoring activities
tags:
  - Microsoft Defender for Identity
  - Defender XDR
  - Health Alerts
  - Identity Security
  - NIS2
  - ISO 27001
  - GRC
  - Cybersecurity
  - Domain Controllers
  - Sensor Monitoring
author: "Dimosthenis Atteia"
description: "Ανάλυση του νέου health alert του Microsoft Defender for Identity για απούσα δικτυακή κίνηση domain controller (MC1455017), με έμφαση στο πώς ένα κενό ορατότητας στο sensor monitoring μπορεί να μείνει αόρατο για μήνες, και τι σημαίνει αυτό για NIS2 και ISO 27001."
summary: "Ένα Defender for Identity sensor μπορεί να δείχνει healthy και ταυτόχρονα να μη βλέπει καθόλου την κίνηση του domain controller που υποτίθεται ότι παρακολουθεί. Το νέο health alert έρχεται να καλύψει ακριβώς αυτό το τυφλό σημείο, και αξίζει να καταλάβεις γιατί υπήρχε τόσο καιρό."
categories: ["Microsoft 365 Security", "Identity Security"]
series:
releases:
  - "new-features"
ShowToc: true
TocOpen: false
weight: -5
cover:
  image: "images/defender-identity-network-traffic-alert/mdi-sensor-health-cover.png"
  alt: "Microsoft Defender portal, ενότητα Identity Security Health issues"
  caption: "Defender portal → Settings → Identities → Health issues → Sensors health issues"
  relative: true
ShowReadingTime: true
ShowWordCount: true
---

Ένα από τα πράγματα που μαθαίνεις γρήγορα όταν διαχειρίζεσαι Defender for Identity σε production είναι ότι «ο sensor τρέχει» δεν σημαίνει «ο sensor βλέπει». Είναι δύο διαφορετικές καταστάσεις, και η απόσταση ανάμεσά τους είναι ακριβώς εκεί που κρύβονται τα πιο επικίνδυνα κενά παρακολούθησης. Το service εμφανίζεται ως healthy, ο υπολογιστής τρέχει κανονικά, και όμως το sensor μπορεί να μην παίρνει καμία απολύτως δικτυακή κίνηση από τον domain controller που υποτίθεται ότι καλύπτει.

Στις 14 Αυγούστου η Microsoft ανακοίνωσε μέσω του Message Center (**MC1455017, επιβεβαιωμένο και στο δικό μας tenant**) ένα ενημερωμένο health alert που στοχεύει ακριβώς σε αυτό το σενάριο: όταν δεν λαμβάνεται καθόλου δικτυακή κίνηση από domain controllers μέσω των Defender for Identity sensors. Δεν είναι εντυπωσιακή ανακοίνωση, δεν έχει το βάρος ενός νέου detection ή μιας αλλαγής αρχιτεκτονικής, αλλά είναι ακριβώς το είδος αλλαγής που ένας CISO πρέπει να προσέξει, γιατί αφορά κάτι πιο θεμελιώδες: το αν ξέρεις πραγματικά τι βλέπεις.

## Τι άλλαξε

Το Defender for Identity διαθέτει ήδη, εδώ και καιρό, ένα health alert με τίτλο **«No traffic received from domain controller»**, που εμφανίζεται όταν δεν λαμβάνεται καθόλου κίνηση από κάποιον domain controller μέσω συγκεκριμένου sensor. Αυτό που φέρνει το MC1455017 είναι μια αναβαθμισμένη, πιο αξιόπιστη εκδοχή αυτού του alert, σχεδιασμένη να εντοπίζει πιο συνεπώς προβλήματα συλλογής κίνησης, από λανθασμένο ή απόν port mirroring, μέχρι προβλήματα στον packet capture driver ή κίνηση που απλά δεν φτάνει ποτέ στον sensor.

Μετά το rollout, το alert εμφανίζεται στο **Sensors health issues** tab, αλλά και στη γενική εμπειρία **Health issues**, μέσα στο Defender portal, όταν το Defender for Identity δεν λαμβάνει την αναμενόμενη δικτυακή δραστηριότητα από κάποιον domain controller.

[![Sensor health issues tab στο Microsoft Defender portal, χωρίς κανένα καταγεγραμμένο issue (healthy baseline)](/images/defender-identity-network-traffic-alert/mdi-sensor-health-alert-detail.png)](/images/defender-identity-network-traffic-alert/mdi-sensor-health-alert-detail.png)
> 📷 **Εικόνα 1: Settings → Identities → Deployment → Health issues → Sensor health issues tab. Το rollout του MC1455017 έχει ήδη φτάσει στο tenant μας (επιβεβαιωμένο μέσω Message center), και δεν καταγράφεται κανένα ανοιχτό ή ιστορικό instance, το υγιές baseline.**

Καμία ενέργεια δεν απαιτείται πριν το rollout, το feature είναι ήδη διαθέσιμο, και δεν υπάρχει καμία επίπτωση σε τελικούς χρήστες ή σε compliance ρυθμίσεις από μόνη της η ενεργοποίηση του alert. Αυτό όμως δεν σημαίνει ότι το θέμα είναι αδιάφορο, σημαίνει απλώς ότι η δουλειά ξεκινάει *αν* και *όταν* το alert ενεργοποιηθεί στο δικό σου περιβάλλον.

## Γιατί «no traffic» δεν είναι μικρό πρόβλημα

Το Defender for Identity δουλεύει πάνω σε δύο βασικές πηγές δεδομένων από κάθε domain controller: Windows events (μέσω event log auditing) και network traffic (μέσω port mirroring για standalone sensors, ή native Npcap-based capture απευθείας στο DC για τους ενσωματωμένους sensors). Όταν λείπει η δικτυακή κίνηση, δεν χάνεις απλώς κάποιο δευτερεύον signal. Χάνεις ορατότητα σε ολόκληρες κατηγορίες επιθέσεων που ανιχνεύονται αποκλειστικά μέσω network-level ανάλυσης, reconnaissance πάνω σε LDAP, DNS-based enumeration, ορισμένες μορφές Kerberos abuse, lateral movement patterns που δεν αφήνουν πάντα ίχνος στα Windows events.

Το πρακτικό πρόβλημα είναι ότι αυτό το κενό είναι σχεδόν αόρατο αν δεν το ψάξεις συγκειμένα. Ο sensor εμφανίζεται ως up and running. Το service δεν έχει crash. Δεν υπάρχει κανένα error που να «φωνάζει». Απλώς, σιωπηλά, ένα ολόκληρο κομμάτι της τηλεμετρίας λείπει. Αν το port mirroring σταμάτησε να δουλεύει μετά από μια αλλαγή σε switch, αν κάποιο firmware update σε virtual switch άλλαξε τη διαμόρφωση, αν ο Npcap driver έμεινε σε παλιά ή λάθος διαμορφωμένη έκδοση, το μόνο σου σημάδι μέχρι τώρα ήταν ένα alert που δεν ήταν πάντα συνεπές στο πότε και πώς εμφανιζόταν. Αυτό ακριβώς είναι το κενό που η αναβαθμισμένη έκδοση του alert έρχεται να κλείσει.

## Πώς το εντοπίζεις και τι ελέγχεις

Αν δεις το alert να εμφανίζεται μετά το rollout, η Microsoft δίνει μια σαφή, βήμα-βήμα λίστα ελέγχων:

- Επιβεβαίωσε ότι το Defender for Identity sensor service τρέχει κανονικά.
- Επιβεβαίωσε ότι υπάρχει πραγματική δικτυακή κίνηση ανάμεσα στο εταιρικό δίκτυο και τους domain controllers.
- Για standalone sensor deployments, επιβεβαίωσε ότι το port mirroring είναι σωστά διαμορφωμένο.
- Έλεγξε τη διαμόρφωση του Npcap ή άλλου packet capture driver, όπου εφαρμόζεται.
- Απενεργοποίησε το Receive Segment Coalescing (RSC) στο capture NIC του sensor.

<!--
[![Λεπτομέρειες health issue με resolution steps στο Defender portal](/images/defender-identity-network-traffic-alert/mdi-health-issue-resolution-pane.png)](/images/defender-identity-network-traffic-alert/mdi-health-issue-resolution-pane.png)
> 📷 **Εικόνα 2: Παράδειγμα health issue detail pane με τα βήματα resolution, όπως εμφανίζονται στο Defender portal.**
-->

Το τελευταίο σημείο, το RSC, είναι από αυτά που ξεχνιούνται εύκολα γιατί δεν είναι Defender for Identity setting, είναι OS-level network adapter setting. Σε πολλά standalone sensor deployments πάνω σε VMware, το Receive Segment Coalescing μπορεί να παραμείνει ενεργό by default στο capture NIC και να «σπάει» αθόρυβα τη ροή της κίνησης που φτάνει στον sensor, χωρίς κανένα άλλο ορατό σύμπτωμα. Αν διαχειρίζεσαι sensors σε virtualized domain controllers, αξίζει να το βάλεις στη standard checklist deployment, όχι μόνο σε troubleshooting.

## Η οπτική NIS2 και ISO 27001

Εδώ είναι το σημείο που το θέμα ξεπερνάει το «operational hygiene» και μπαίνει καθαρά στο πεδίο του CISO.

**Αποτελεσματικότητα ελέγχων ανίχνευσης, όχι απλώς ύπαρξή τους.** Το NIS2, στο πλαίσιο των μέτρων διαχείρισης κινδύνου, δεν ζητάει απλώς να έχεις εργαλείο ανίχνευσης εγκατεστημένο, ζητάει να αποδεικνύεις ότι τα μέτρα σου λειτουργούν πραγματικά. Ένα Defender for Identity deployment που δείχνει «healthy» στο dashboard αλλά δεν λαμβάνει δικτυακή κίνηση από κάποιους domain controllers είναι, ουσιαστικά, ένας έλεγχος ανίχνευσης που υπάρχει στα χαρτιά αλλά όχι στην πράξη. Αν αυτό συνέβαινε για βδομάδες πριν το προσέξεις, είναι ακριβώς το είδος κενού που πρέπει να τεκμηριώνεται και να αντιμετωπίζεται μέσα από τη διαδικασία διαχείρισης κινδύνου, όχι να ανακαλύπτεται τυχαία.

**Παρακολούθηση και καταγραφή κατά ISO 27001.** Τα controls A.8.15 (Logging) και A.8.16 (Monitoring activities) βασίζονται στην παραδοχή ότι τα logging και monitoring συστήματά σου καλύπτουν πράγματι το εύρος υποδομής που νομίζεις ότι καλύπτουν. Ένα κενό στη συλλογή δικτυακής κίνησης από domain controllers, χωρίς μηχανισμό που να το επισημαίνει αξιόπιστα, είναι ακριβώς το είδος blind spot που ένας auditor θα ψάξει να βρει. Το ότι η Microsoft έκανε το alert πιο αξιόπιστο δεν σε απαλλάσσει από την ευθύνη, αντίθετα, σου δίνει ένα καλύτερο εργαλείο για να το αποδείξεις.

**Τεκμηρίωση coverage, όχι μόνο deployment.** Αν έχεις sensors σε πολλαπλά sites ή σε virtualized domain controllers, αξίζει να κρατάς ένα δικό σου coverage register, ποιος sensor καλύπτει ποιον domain controller, πότε επιβεβαιώθηκε τελευταία φορά ότι λαμβάνει network traffic, ποια RSC/Npcap configuration ισχύει. Δεν είναι υπερβολή, είναι ακριβώς το επίπεδο λεπτομέρειας που χρειάζεσαι για να απαντήσεις με σιγουριά στο ερώτημα «είσαι σίγουρος ότι βλέπεις όλη την κίνηση των domain controllers σου» όταν σου το θέσει ένας auditor ή, χειρότερα, ένα incident response team μετά από ένα συμβάν.

## Μια δεύτερη, συγγενική αλλαγή που αξίζει προσοχή

Παράλληλα με το MC1455017, η Microsoft ανακοίνωσε και το **MC1455016**, ένα νέο health issue με τίτλο «No Windows events received from domain controller», που καλύπτει το αντίστοιχο κενό στην πλευρά των Windows events αντί της δικτυακής κίνησης. Τα δύο alerts μαζί καλύπτουν, ουσιαστικά, τις δύο βασικές πηγές δεδομένων του Defender for Identity. Αν διαχειρίζεσαι sensors, αξίζει να τα αντιμετωπίσεις ως ζευγάρι στο δικό σου health monitoring process, όχι ως ξεχωριστά, άσχετα alerts.

## Τι κάνεις πρακτικά τώρα

Δεν χρειάζεται καμία ενέργεια πριν το rollout, το feature είναι ήδη ενεργό. Αυτό που αξίζει να κάνεις είναι να περάσεις μια φορά από το **Health issues** tab στο Defender portal, ανεξάρτητα από το αν έχεις δει κάποιο alert να αναδύεται μόνο του, και να επιβεβαιώσεις ότι κάθε sensor σου λαμβάνει πράγματι κίνηση από τον domain controller που υποτίθεται ότι παρακολουθεί. Αν έχεις standalone sensors σε virtualized domain controllers, έλεγξε τη ρύθμιση RSC στο capture NIC ακόμα κι αν δεν έχεις δει κανένα alert, γιατί δεν είναι σίγουρο ότι η παλιά έκδοση του alert θα το είχε πιάσει αξιόπιστα.

## Το συμπέρασμα

Δεν είναι κάθε ανακοίνωση στο Message Center μια νέα δυνατότητα ανίχνευσης, μερικές φορές είναι απλώς μια καλύτερη επιβεβαίωση ότι αυτό που ήδη έχεις εγκατεστημένο λειτουργεί όπως νομίζεις. Αυτό όμως δεν το κάνει λιγότερο σημαντικό. Στην κυβερνοασφάλεια, τα πιο επικίνδυνα κενά δεν είναι αυτά που φωνάζουν, είναι αυτά που δείχνουν healthy ενώ δεν είναι. Αν διαχειρίζεσαι Defender for Identity, βάλε αυτό το alert στη λίστα ελέγχου της επόμενης εβδομάδας, όχι επειδή κάτι έσπασε τώρα, αλλά επειδή τώρα έχεις έναν πιο αξιόπιστο τρόπο να το μάθεις αν σπάσει.

Αν έχεις δει παρόμοιο κενό ορατότητας στο δικό σου περιβάλλον, ή αν θέλεις να συζητήσουμε πώς εντάσσεται αυτό στο δικό σας risk register, χαίρομαι πάντα να το συζητήσουμε στα σχόλια ή στο LinkedIn.
