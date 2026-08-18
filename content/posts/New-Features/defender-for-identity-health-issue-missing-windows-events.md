---
title: "Defender for Identity: Το νέο health issue που σου λέει πότε 'τυφλώνεσαι' σε έναν Domain Controller"
date: 2026-08-18T09:00:00+03:00
lastmod: 2026-08-18T09:30:00+03:00
draft: false
keywords:
  - Microsoft Defender for Identity
  - Sensor health issues
  - No Windows events received from domain controller
  - Domain Controller event collection
  - Advanced Audit Policy
  - MC1455016
  - NIS2 παρακολούθηση και εντοπισμός
  - ISO 27001 logging monitoring A.8.15
  - Defender XDR Health issues
  - Identity Threat Detection and Response
tags:
  - Microsoft Defender for Identity
  - Domain Controller
  - Event Collection
  - Health Issues
  - Identity Security
  - NIS2
  - ISO 27001
  - GRC
  - Cybersecurity
  - Security Monitoring
author: "Dimosthenis Atteia"
description: "Ανάλυση του νέου sensor health issue 'No Windows events received from domain controller' στο Microsoft Defender for Identity (MC1455016), με την οπτική ενός CISO που πρέπει να τεκμηριώσει το detection coverage σε NIS2 και ISO 27001 audit."
summary: "Ένα Defender for Identity sensor μπορεί να δείχνει healthy, connected, licensed, και ταυτόχρονα να μη βλέπει σχεδόν τίποτα από έναν συγκεκριμένο Domain Controller, γιατί τα Windows events απλά δεν φτάνουν ποτέ ως εκεί. Το νέο health issue που ανακοίνωσε η Microsoft με το MC1455016 βάζει επιτέλους όνομα σε αυτό το τυφλό σημείο, και αξίζει να καταλάβεις γιατί υπήρχε πριν καν εμφανιστεί το alert."
categories: ["Microsoft 365 Security", "Identity Security"]
series:
releases:
  - "new-features"
ShowToc: true
TocOpen: false
weight: -5
cover:
  image: "images/defender-identity-health-issue-missing-events/defender-identity-health-issue-cover.png"
  alt: "Microsoft Defender XDR On-premises Sensors tab με τη λίστα sensors και τη στήλη Health issues"
  caption: "Defender XDR → Settings → Identities → On-premises → Sensors"
  relative: true
ShowReadingTime: true
ShowWordCount: true
---

Ένα από τα πράγματα που μαθαίνεις γρήγορα όταν διαχειρίζεσαι Defender for Identity σε production είναι ότι το «ο sensor είναι healthy» και το «ο sensor βλέπει ό,τι πρέπει να βλέπει» δεν είναι το ίδιο πράγμα. Ο sensor μπορεί να είναι connected, updated, χωρίς κανένα κόκκινο εικονίδιο στο dashboard, και ταυτόχρονα να μην έχει λάβει ούτε ένα Windows event από έναν συγκεκριμένο Domain Controller εδώ και μέρες. Μέχρι πρόσφατα, αυτό το gap δεν είχε δικό του όνομα. Το έμαθες μόνο αν έψαχνες σκόπιμα, μέσα από query σε advanced hunting ή γιατί κάποια detection που περίμενες απλά δεν εμφανίστηκε ποτέ.

Με το **MC1455016**, η Microsoft ανακοίνωσε ένα νέο sensor health issue που ονομάζεται **«No Windows events received from domain controller»**, και προσωπικά το θεωρώ ένα από τα πιο χρήσιμα, αν και αθόρυβα, updates του Defender for Identity φέτος. Όχι γιατί προσθέτει κάποια εντυπωσιακή δυνατότητα ανίχνευσης, αλλά γιατί κάνει ορατό ένα ρίσκο που υπήρχε πάντα και που, αν είσαι υπεύθυνος για το detection coverage του οργανισμού σου, πρέπει να ξέρεις πώς να το διαβάσεις σωστά.

## Τι λέει η ανακοίνωση

Σύμφωνα με το Message Center, το Defender for Identity αποκτά ένα νέο sensor health issue που εμφανίζεται όταν ο sensor δεν λαμβάνει τα αναμενόμενα Windows events από έναν Domain Controller. Θα το βρεις στο tenant σου κάτω από **Settings → Identities → Deployment → On-premises → Sensors** (η στήλη **Health issues** στον πίνακα δείχνει τον αριθμό ανοιχτών issues ανά sensor), ή στη λεπτομερή προβολή **Settings → Identities → Deployment → Health issues**, όπου το health center χωρίζεται σε δύο tabs, **Global health issues** και **Sensor health issues** (το νέο issue είναι per-sensor, οπότε θα εμφανιστεί στο δεύτερο). Το rollout είναι ήδη ενεργό, δεν απαιτείται καμία ενέργεια πριν την ενεργοποίηση, και η σύσταση της Microsoft, αν το δεις να εμφανίζεται, είναι να ελέγξεις τον συγκεκριμένο Domain Controller και τη διαμόρφωση συλλογής events, ενώ αν χρειαστεί, να ανοίξεις ticket στο Microsoft Support.

[![Defender XDR On-premises Sensors tab με τη λίστα sensors, health status και αριθμό health issues ανά sensor](/images/defender-identity-health-issue-missing-events/defender-identity-health-issue-cover.png)](/images/defender-identity-health-issue-missing-events/defender-identity-health-issue-cover.png)
> 📷 **Εικόνα 1: Settings → Identities → On-premises → Sensors. Ο πίνακας με όλους τους sensors, τον τύπο (Domain controller), το Health status και τη στήλη Health issues, εδώ θα εμφανιστεί ο μετρητής αν κάποιος DC έχει το νέο issue ανοιχτό.**

Στο επίπεδο του announcement δεν υπάρχει κάτι δραματικό. Αυτό που έχει ενδιαφέρον είναι το «γιατί» πίσω από αυτό, και γιατί μέχρι τώρα δεν το ήξερες.

## Γιατί τα Windows events είναι το μισό «μάτι» του Defender for Identity

Ο Defender for Identity sensor βλέπει την Active Directory με δύο τρόπους ταυτόχρονα: πιάνει και αναλύει το network traffic του Domain Controller τοπικά, και παράλληλα διαβάζει συγκεκριμένα Windows events απευθείας από το event log της μηχανής. Το δεύτερο κομμάτι δεν είναι δευτερεύον, πολλές detections βασίζονται αποκλειστικά ή κυρίως σε αυτό.

Η λίστα με τα events που χρειάζεται ο sensor δεν είναι μυστική, είναι δημοσιευμένη στην τεκμηρίωση της Microsoft, και περιλαμβάνει, μεταξύ άλλων, events όπως το 4662 (ενέργεια πάνω σε αντικείμενο), το 4776 (NTLM credential validation), το 4728/4732/4756 (προσθήκες σε security groups), το 5136 (τροποποίηση directory service object) και το 8004 (NTLM authentication). Αν αυτά τα events δεν φτάνουν στον sensor, ολόκληρες κατηγορίες ανίχνευσης, από lateral movement μέχρι privilege escalation μέσω group membership, χάνουν ορατότητα για τον συγκεκριμένο Domain Controller, χωρίς αυτό να φαίνεται πουθενά ως «σφάλμα» στο dashboard σου, μέχρι τώρα.

Το πρόβλημα δεν είναι θεωρητικό. Οι πιο συχνές αιτίες που βλέπω να προκαλούν αυτού του είδους το κενό είναι:

- **Advanced Audit Policy** που δεν είναι σωστά ρυθμισμένη στον συγκεκριμένο Domain Controller, είτε γιατί ξέφυγε από το baseline GPO είτε γιατί ο DC προστέθηκε πρόσφατα στο domain και δεν πέρασε ποτέ από το σωστό provisioning.
- **NTLM auditing** ή **domain object auditing** που έχει απενεργοποιηθεί τοπικά, συχνά σε παλιότερους DCs που δεν έχουν αγγιχτεί μετά το αρχικό onboarding στο Defender for Identity.
- Τοπικό **Windows Event Log** που γεμίζει και κάνει overwrite events πριν προλάβει ο sensor να τα διαβάσει, ειδικά σε DCs με πολύ υψηλό όγκο authentication traffic και μικρό μέγεθος log.
- Πρόβλημα στον ίδιο τον sensor, service που έχει σταματήσει τοπικά ή permission issue στο service account, χωρίς αυτό να εμφανίζεται απαραίτητα ως «sensor down» στο βασικό health status.

Το κοινό σημείο σε όλα αυτά είναι ότι κανένα δεν εμφανίζεται ως «κόκκινο» με τον προφανή τρόπο. Ο sensor είναι online. Το licensing είναι εντάξει. Η connectivity προς το cloud λειτουργεί. Απλώς, το ένα από τα δύο «μάτια» του sensor βλέπει σκοτάδι για συγκεκριμένο DC, και μέχρι τώρα δεν υπήρχε ξεχωριστό health issue που να το λέει ρητά.

## Πώς διαφέρει από τα ήδη υπάρχοντα audit configuration health issues

Το Defender for Identity έχει ήδη μια οικογένεια health issues γύρω από το audit configuration, όχι ένα. Στο δικό μου tenant, για παράδειγμα, το **Global health issues** tab δείχνει αυτή τη στιγμή δύο ανοιχτά issues με τίτλο **«Auditing on the Configuration container is not enabled as required»**, severity Medium, ένα για κάθε Domain Controller sensor.

[![Defender XDR Global health issues tab με δύο ανοιχτά issues Auditing on the Configuration container is not enabled as required](/images/defender-identity-health-issue-missing-events/defender-xdr-sensors-health-issues-tab.png)](/images/defender-identity-health-issue-missing-events/defender-xdr-sensors-health-issues-tab.png)
> 📷 **Εικόνα 2: Settings → Identities → Health issues → Global health issues (2). Δύο ανοιχτά issues «Auditing on the Configuration container is not enabled as required», Medium severity, ένα ανά Domain Controller. Παράδειγμα ήδη υπαρκτού, σχετικού αλλά διαφορετικού audit-configuration issue.**

Αυτό είναι σκόπιμα διαφορετικό issue από το νέο **«No Windows events received from domain controller»**, και η διαφορά τους είναι ακριβώς το σημείο που θέλω να τονίσω. Το «Auditing on the Configuration container» (όπως και το ευρύτερα γνωστό «Directory Services Advanced Auditing is not enabled as required») είναι, ουσιαστικά, ένα configuration check, κοιτάει τη ρύθμιση, όχι το αποτέλεσμα. Το νέο health issue είναι πιο κοντά στην πράξη, κοιτάει το outcome: «ανεξάρτητα από το τι λέει η ρύθμιση, ο sensor δεν λαμβάνει events». Αυτό σημαίνει ότι μπορεί να δεις το νέο issue να ενεργοποιείται ακόμα και όταν όλα τα audit configuration issues φαίνονται καθαρά, γιατί η αιτία μπορεί να είναι κάπου αλλού, log rotation, service issue, τοπική παρέκκλιση από την πολιτική, ή κάτι στο pipeline συλλογής που δεν εντοπίζεται από έναν απλό έλεγχο ρύθμισης.

Με άλλα λόγια, τώρα έχεις δύο κατηγορίες συμπληρωματικών σημάτων αντί για μία: τα configuration checks (όπως αυτό της Εικόνας 2) σου λένε αν η ρύθμιση είναι σωστή, το νέο issue σου λέει αν τα events όντως έρχονται. Και τα δύο μαζί καλύπτουν πολύ πιο ρεαλιστικά το πραγματικό ρίσκο απ' ό,τι το καθένα ξεχωριστά.

## Πώς το εντοπίζεις και τι ελέγχεις πρώτα

Η πρακτική διαδικασία, όταν δεις το health issue να εμφανίζεται, είναι σχετικά απλή στη ροή της, αλλά θέλει προσοχή στη σειρά ελέγχων.

Στο δικό μου tenant, τη στιγμή που γράφω αυτό το άρθρο, το tab **Sensor health issues** δείχνει **(0)**, χωρίς κανένα ανοιχτό issue αυτού του τύπου, κάτι απόλυτα αναμενόμενο, αφού το health issue είναι conditional: εμφανίζεται μόνο όταν όντως υπάρχει κενό στη λήψη events. Αυτό είναι το υγιές baseline, όχι ένδειξη ότι κάτι δεν δούλεψε. Θα ενημερώσω το άρθρο με πραγματικό screenshot του issue μόλις καταγραφεί κάποιο instance, είτε στο δικό μου περιβάλλον είτε από επιβεβαιωμένη πηγή.

Στην πράξη, η σειρά που ακολουθώ όταν εμφανιστεί κάτι τέτοιο είναι:

1. **Επιβεβαίωσε ότι ο sensor στον συγκεκριμένο DC είναι πραγματικά up και running**, όχι μόνο «registered». Έλεγξε το Windows service του sensor τοπικά.
2. **Τρέξε αναφορά τρέχουσας διαμόρφωσης** με το επίσημο PowerShell module του Defender for Identity, και σύγκρινέ την με το baseline που περιμένεις να ισχύει σε όλους τους DCs σου.
3. **Έλεγξε το μέγεθος και τη διάρκεια διατήρησης του Security event log** τοπικά στον DC. Σε περιβάλλοντα με υψηλό authentication volume, ένα μικρό log μέγεθος μπορεί να κάνει overwrite events πριν προλάβει ο sensor να τα επεξεργαστεί.
4. **Επιβεβαίωσε ότι το Advanced Audit Policy δεν έχει παρακαμφθεί τοπικά** από κάποιο legacy Local Security Policy setting, κάτι που συμβαίνει πιο συχνά απ' όσο θα περίμενε κανείς σε DCs που δεν είναι πλήρως GPO-managed.
5. Αν όλα τα παραπάνω φαίνονται εντάξει και το issue παραμένει, **άνοιξε ticket στο Microsoft Support**, όπως προτείνει και η ίδια η ανακοίνωση, γιατί μπορεί να πρόκειται για πρόβλημα στο pipeline συλλογής και όχι στη διαμόρφωση.

Αυτό που θέλω να τονίσω είναι ότι το health issue σου δίνει το «πού», όχι πάντα το «γιατί». Η δουλειά του εντοπισμού της ρίζας παραμένει δική σου.

## Η οπτική NIS2 και ISO 27001

Εδώ είναι το σημείο που, ως CISO, με ενδιαφέρει περισσότερο από την καθαρά τεχνική λεπτομέρεια.

**Ακεραιότητα του detection coverage ως μετρήσιμο στοιχείο.** Το NIS2, στο άρθρο για τα μέτρα διαχείρισης κινδύνου, ζητάει τεκμηριωμένες ικανότητες εντοπισμού και απόκρισης σε περιστατικά. Αν λες σε ένα risk assessment ή σε ένα audit ότι «έχεις Identity Threat Detection and Response κάλυψη σε όλους τους Domain Controllers σου», αυτή η δήλωση ήταν, μέχρι τώρα, δύσκολο να επαληθευτεί σε επίπεδο event flow, όχι μόνο configuration. Το νέο health issue σου δίνει ένα συγκεκριμένο, μετρήσιμο σημείο αναφοράς για να στηρίξεις ή να αμφισβητήσεις αυτή τη δήλωση.

**Logging και monitoring ως control, όχι ως παραδοχή.** Στο ISO 27001, τα controls γύρω από logging και monitoring (η λογική πίσω από το A.8.15) δεν σταματούν στο «έχουμε ενεργοποιήσει το audit policy». Προϋποθέτουν ότι τα logs πράγματι παράγονται, συλλέγονται και είναι διαθέσιμα για ανάλυση όταν χρειαστεί. Ένα detection gap που δεν είναι ορατό είναι, ουσιαστικά, ένα control που νομίζεις ότι λειτουργεί αλλά δεν λειτουργεί. Το να έχεις ένα ρητό health issue που το επισημαίνει είναι ακριβώς το είδος του evidence που θέλει να δει ένας auditor, όχι «πιστεύουμε ότι λειτουργεί», αλλά «το σύστημα μας ειδοποιεί ρητά όταν δεν λειτουργεί, και έχουμε διαδικασία response».

**Τεκμηρίωση response διαδικασίας.** Το ίδιο το health issue δεν αρκεί από μόνο του. Αυτό που θέλει να δει ένας auditor, και αυτό που θα έπρεπε να έχεις έτοιμο ήδη, είναι μια σύντομη, γραπτή διαδικασία: ποιος παρακολουθεί το Health issues tab, σε τι χρονικό διάστημα, ποια είναι τα βήματα triage όταν εμφανιστεί αυτό το συγκεκριμένο issue, και ποιο είναι το SLA μέχρι να θεωρηθεί το detection coverage αποκατεστημένο. Χωρίς αυτό, το health issue είναι απλώς ένα ακόμα alert που κάποιος μπορεί να αγνοήσει.

## Τι αξίζει να κάνεις τώρα

Αν τρέχεις ήδη Defender for Identity, δεν χρειάζεται καμία ενέργεια πριν το rollout, είναι ήδη ενεργό. Αυτό που προτείνω, όμως, είναι να μην περιμένεις να δεις το health issue παθητικά. Πρόσθεσέ το ρητά στη λίστα ελέγχου του security operations team σου, βεβαιώσου ότι υπάρχουν email ή Syslog notifications ενεργοποιημένες για health issues στο Defender XDR, και, αν δεν το έχεις ήδη κάνει, τρέξε μια φορά τη σύγκριση του τρέχοντος audit policy configuration έναντι του baseline σε όλους τους Domain Controllers σου. Είναι μια σχετικά μικρή προσπάθεια που κλείνει ένα κενό ορατότητας το οποίο, μέχρι τώρα, δεν είχε καν όνομα.

Αν έχεις δει ήδη αυτό το health issue να εμφανίζεται στο περιβάλλον σου, ή αν έχεις άλλη εμπειρία με event collection gaps στο Defender for Identity, χαίρομαι πάντα να το συζητήσουμε στα σχόλια ή στο LinkedIn.
