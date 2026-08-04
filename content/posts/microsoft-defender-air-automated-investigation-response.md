---
title: "Microsoft Defender AIR: Πώς το Automated Investigation & Response Αλλάζει το SOC (και τι γίνεται μετά την 1η Σεπτεμβρίου 2026)"
date: 2026-08-04T09:00:00+03:00
lastmod: 2026-08-04T09:00:00+03:00
draft: false
keywords:
  - τι είναι το automated investigation and response
  - microsoft defender air explained
  - automation levels microsoft defender for endpoint
  - full automation vs semi automation defender
  - air defender for endpoint automation levels
  - πώς λειτουργεί το air στο microsoft defender
  - defender air september 2026 change
  - device groups automation level defender
  - investigation states defender for endpoint
  - action center pending actions defender
  - alert fatigue soc automation
  - microsoft defender for business air
tags:
  - Microsoft Defender for Endpoint
  - Microsoft Defender XDR
  - Automated Investigation and Response
  - AIR
  - Automation Levels
  - Microsoft Defender for Business
  - SOC Automation
  - Action Center
  - Device Groups
  - Microsoft 365 Security
  - Incident Response
  - Cyber GRC
author: "Dimosthenis Atteia"
description: "Ένας πρακτικός, ανθρώπινος οδηγός για το Automated Investigation & Response (AIR) στο Microsoft Defender: πώς δουλεύει, τι σημαίνουν τα verdicts, ποια είναι τα πέντε automation levels με τη σωστή ορολογία, πώς διαβάζεις τα αποτελέσματα και κυρίως, τι αλλάζει την 1η Σεπτεμβρίου 2026 όταν το AIR παύει να τρέχει ως ξεχωριστή εμπειρία."
summary: "Το AIR είναι ο ψηφιακός αναλυτής που κάνει το βαρύ triage στη θέση σου. Σε αυτό το άρθρο εξηγώ πώς λειτουργεί το pipeline της αυτόματης έρευνας, τι σημαίνουν τα Malicious / Suspicious / No threats found, πώς δουλεύουν τα πέντε automation levels ανά device group, πώς διαβάζεις σωστά το Action Center και τι σημαίνει η αλλαγή της 1ης Σεπτεμβρίου 2026 για το πώς θα δουλεύεις με το AIR από εδώ και πέρα."
categories: ["Microsoft Defender", "Microsoft 365 Security", "SOC Operations"]
series: ["Microsoft Defender Deep Dives"]
ShowToc: true
TocOpen: false
weight: -5
cover:
  image: "/images/DefenderAIR/air-cover-evolution.png"
  alt: "Η εξέλιξη του Automated Investigation & Response στο Microsoft Defender, από το χειροκίνητο triage στην αυτόνομη απόκριση"
  caption: "Microsoft Defender AIR — Automated Investigation & Response"
---

## Ας ξεκινήσουμε από το πραγματικό πρόβλημα

Αν έχεις κάτσει έστω και μία βάρδια σε SOC, ξέρεις το συναίσθημα. Η ουρά με τα alerts δεν αδειάζει ποτέ. Ανοίγεις ένα, τσεκάρεις το file hash, πηδάς σε ένα δεύτερο console για να δεις το process tree, γυρνάς πίσω, και στο μεταξύ έχουν μπει άλλα δεκαπέντε. Το ξέρω γιατί το έχω ζήσει, και το ξέρεις κι εσύ. Δεν είναι θέμα ικανότητας αλλά είναι θέμα κλίμακας. Ένας άνθρωπος δεν προλαβαίνει.

Εδώ ακριβώς μπαίνει το **Automated Investigation and Response (AIR)** του Microsoft Defender. Δεν είναι ακόμα ένα buzzword. Είναι το κομμάτι της πλατφόρμας που αναλαμβάνει το επαναλαμβανόμενο, μηχανικό κομμάτι της έρευνας, αυτό δηλαδή που κάνει έναν αναλυτή να νιώθει σαν διεκπεραιωτής, και σου αφήνει χρόνο για τη δουλειά που πραγματικά χρειάζεται ανθρώπινη κρίση.

[![Η εικόνα του προβλήματος του alert fatigue: γιατί οι ομάδες ασφάλειας πνίγονται στον όγκο των alerts και γιατί χρειάζεται αυτοματοποίηση](/images/DefenderAIR/air-alert-fatigue-problem.png)](/images/DefenderAIR/air-alert-fatigue-problem.png)
> 📷 **Εικόνα 1: Το alert fatigue δεν είναι θέμα προσπάθειας αλλά είναι θέμα όγκου. Καμία ομάδα δεν κλιμακώνεται όσο τα alerts.**

Ένα νούμερο που αξίζει να κρατήσεις, γιατί έρχεται κατευθείαν από τη Microsoft και όχι από κάποιο marketing slide: οι οργανισμοί που τρέχουν **full automation** είχαν **40% περισσότερα high-confidence malware samples** απομακρυσμένα σε σχέση με όσους δούλευαν σε χαμηλότερα επίπεδα αυτοματισμού. Κράτα το στο μυαλό σου και θα επιστρέψουμε σε αυτό όταν φτάσουμε στα automation levels.

## Τι είναι, στην πράξη, το AIR

Ο πιο τίμιος τρόπος να το περιγράψω: το AIR **μιμείται τα ιδανικά βήματα που θα ακολουθούσε ένας έμπειρος αναλυτής** για να ερευνήσει και να αντιμετωπίσει μια απειλή. Όταν σκάει ένα alert, δεν περιμένει να το ανοίξεις εσύ. Ξεκινά μόνο του να εξετάζει τα σχετικά artifacts (files, processes, services, registry keys, network connections) φτάνει σε ένα συμπέρασμα, και ανάλογα με τις ρυθμίσεις σου είτε προχωρά σε remediation είτε το αφήνει να περιμένει έγκριση.

Το αποτέλεσμα είναι διπλό: **μειώνεται δραστικά ο όγκος των alerts** που φτάνουν σε ανθρώπινο μάτι, και η ομάδα ασφάλειας μπορεί να επικεντρωθεί σε πιο σύνθετες απειλές και πιο στρατηγικές πρωτοβουλίες.

[![Το AIR ως ψηφιακός αναλυτής SOC που εξετάζει αυτόματα τα alerts και δρα άμεσα για την αντιμετώπιση παραβιάσεων](/images/DefenderAIR/air-what-is-air-digital-analyst.png)](/images/DefenderAIR/air-what-is-air-digital-analyst.png)
> 📷 **Εικόνα 2: Σκέψου το AIR σαν έναν ακούραστο junior analyst που κάνει το πρώτο πέρασμα σε κάθε alert, 24/7, χωρίς να κουράζεται ποτέ.**

Δύο προϋποθέσεις πριν πούμε οτιδήποτε άλλο, γιατί τις βλέπω να ξεχνιούνται συνέχεια:

- Χρειάζεσαι **Microsoft Defender for Endpoint Plan 2** ή **Microsoft Defender for Business**.
- Το **Microsoft Defender Antivirus** πρέπει να τρέχει σε **active** ή **passive mode**. Αν είναι απενεργοποιημένο ή έχει αφαιρεθεί, το AIR απλά δεν δουλεύει σωστά.

Μια χρήσιμη διάκριση: στο **Defender for Business** το AIR είναι **προρυθμισμένο και δεν παραμετροποιείται**, τρέχει σε full automation για όλες τις συσκευές. Στο **Defender for Endpoint** έχεις τον έλεγχο, και εκεί μπαίνουν τα automation levels που θα δούμε παρακάτω.

## Πώς δουλεύει το pipeline της έρευνας

Ας το δούμε βήμα-βήμα, γιατί η ροή είναι πιο κομψή απ' όσο φαίνεται.

Μια αυτόματη έρευνα ξεκινά με δύο τρόπους: είτε **όταν σκάει ένα alert** (και δημιουργείται το αντίστοιχο incident), είτε **χειροκίνητα**, όταν ένας security operator επιλέξει μια συσκευή και πατήσει *Initiate Automated Investigation*. Το δεύτερο σενάριο το χρησιμοποιείς όταν, ας πούμε, βλέπεις μια συσκευή με ψηλό risk level και θέλεις να σκάψεις χωρίς να περιμένεις να σκάσει alert.

Μόλις ξεκινήσει, η έρευνα **επεκτείνει το εύρος της** μόνη της. Αν κατά τη διάρκειά της εμφανιστούν νέα alerts από την ίδια συσκευή, προστίθενται στην τρέχουσα έρευνα. Κι αν η ίδια απειλή εντοπιστεί σε άλλη συσκευή, τότε και εκείνη η συσκευή μπαίνει στην έρευνα και ξεκινά ένα γενικό security playbook πάνω της. Υπάρχει όμως ένα δικλείδα ασφαλείας που μου αρέσει ιδιαίτερα: **αν η επέκταση αγγίξει 10 ή περισσότερες συσκευές** από την ίδια οντότητα, τότε αυτή η ενέργεια **απαιτεί έγκριση** και εμφανίζεται στην καρτέλα *Pending actions*. Δηλαδή το σύστημα ξέρει πότε το πράγμα μεγαλώνει αρκετά ώστε να θέλει ανθρώπινο μάτι.

[![Το pipeline της αυτόματης έρευνας AIR: από το alert στη συλλογή evidence, στο verdict και στο remediation](/images/DefenderAIR/air-investigation-pipeline.png)](/images/DefenderAIR/air-investigation-pipeline.png)
> 📷 **Εικόνα 3: Alert → έρευνα → συλλογή evidence → verdict → remediation. Η ίδια λογική που θα ακολουθούσες κι εσύ, απλά αυτοματοποιημένη.**

## Το σύστημα των verdicts

Καθώς τρέχει η έρευνα, **κάθε κομμάτι evidence παίρνει το δικό του verdict**. Δεν υπάρχουν εκατό κατηγορίες, υπάρχουν ακριβώς τρεις, και είναι καθαρές:

- **Malicious:** κακόβουλο, χωρίς αμφιβολία.
- **Suspicious:** ύποπτο, θέλει προσοχή αλλά δεν είναι σίγουρο.
- **No threats found:** καθαρό.

Αυτό ισχύει τόσο σε επίπεδο evidence όσο και σε επίπεδο entity: κάθε οντότητα που αναλύεται (file, process, service, driver κ.λπ.) παίρνει το δικό της verdict. Έτσι, όταν ανοίξεις μια έρευνα, δεν βλέπεις ένα αδιαφανές «κακό/καλό» αλλά βλέπεις ξεκάθαρα ποιο ακριβώς artifact κρίθηκε τι.

[![Τα τρία verdicts του AIR: Malicious, Suspicious και No threats found, ένα για κάθε οντότητα που αναλύεται](/images/DefenderAIR/air-verdicts-malicious-suspicious-clean.png)](/images/DefenderAIR/air-verdicts-malicious-suspicious-clean.png)
> 📷 **Εικόνα 4: Τρία verdicts, τίποτα παραπάνω. Η απλότητα εδώ είναι feature, όχι έλλειψη.**

## Τι κάνει το AIR όταν βρει κάτι, τα remediation actions

Μόλις βγει ένα verdict, η έρευνα μπορεί να καταλήξει σε ένα ή περισσότερα **remediation actions**. Δεν είναι αφηρημένα είναι συγκεκριμένες, πραγματικές ενέργειες πάνω στο endpoint. Μερικά παραδείγματα που θα δεις συχνά: αποστολή ενός file σε **quarantine**, **stop** ενός service, αφαίρεση ενός **scheduled task**, καθάρισμα persistence, αφαίρεση ενός registry key.

Το αν αυτές οι ενέργειες γίνονται **αυτόματα** ή **μόνο μετά από έγκριση** εξαρτάται από το automation level σου και από άλλες ρυθμίσεις ασφάλειας, π.χ. την προστασία από **potentially unwanted applications (PUA)**. Και το πιο σημαντικό για την ψυχική σου ηρεμία: **κάθε ενέργεια, pending ή ολοκληρωμένη, καταγράφεται στο Action Center**, και αν χρειαστεί μπορείς να την **αναιρέσεις (undo)**. Δεν υπάρχει «μαύρο κουτί», υπάρχει πλήρες ίχνος.

[![Παραδείγματα remediation actions του AIR: quarantine file, stop service, remove scheduled task, καθάρισμα persistence](/images/DefenderAIR/air-remediation-actions.png)](/images/DefenderAIR/air-remediation-actions.png)
> 📷 **Εικόνα 5: Οι ενέργειες είναι συγκεκριμένες και αναστρέψιμες. Αυτό είναι που κάνει το full automation λιγότερο τρομακτικό απ' όσο ακούγεται.**

## Τα πέντε automation levels και εδώ αποφασίζεις ποιος έχει τον έλεγχο

Αυτή είναι η καρδιά της παραμετροποίησης, και το σημείο όπου βλέπω τα περισσότερα λάθη, ακόμα και σε παρουσιάσεις. Ας βάλουμε τη **σωστή, επίσημη ορολογία** της Microsoft, γιατί όταν γράφεις policy ή μιλάς σε auditor, η ακρίβεια μετράει.

- **Full - remediate threats automatically** *(full automation)*: Οι ενέργειες remediation εκτελούνται αυτόματα σε ό,τι κριθεί malicious. **Είναι το προτεινόμενο επίπεδο** και εφαρμόζεται by default στα tenants του Defender for Endpoint που δημιουργήθηκαν από τις **16 Αυγούστου 2020** και μετά, εφόσον δεν έχουν οριστεί ακόμα device groups. Στο Defender for Business είναι το default για όλες τις συσκευές.
- **Semi - require approval for all folders** *(semi-automation)*: Απαιτείται έγκριση για remediation σε **όλα** τα files. Αυτό είναι το default για τα παλιά tenants που δημιουργήθηκαν **πριν** τις 16 Αυγούστου 2020, χωρίς device groups. *(Προσοχή: η επίσημη ονομασία είναι «all folders», όχι «any remediation», είναι μια λεπτομέρεια που κάνει τη διαφορά σε ένα σωστό κείμενο.)*
- **Semi - require approval for core folders remediation:** Έγκριση χρειάζεται μόνο για files σε **core folders**, δηλαδή σε καταλόγους του λειτουργικού όπως το `\windows\*`. Σε άλλους (non-core) φακέλους, το remediation γίνεται αυτόματα.
- **Semi - require approval for non-temp folders remediation:** Έγκριση χρειάζεται για ό,τι **δεν** βρίσκεται σε **temporary folders**. Στους προσωρινούς φακέλους το remediation προχωρά αυτόματα.
- **No automated response** *(no automation)*: Η αυτόματη έρευνα **δεν τρέχει** καθόλου. **Δεν συνιστάται**, γιατί υποβαθμίζει το security posture του οργανισμού σου.

[![Ανάλυση των πέντε automation levels του AIR στο Microsoft Defender for Endpoint με τη σωστή ορολογία](/images/DefenderAIR/air-automation-levels-explained.png)](/images/DefenderAIR/air-automation-levels-explained.png)
> 📷 **Εικόνα 6: Τα πέντε επίπεδα, από πλήρη αυτονομία μέχρι μηδενική. Το «σωστό» για εσένα εξαρτάται από την ωριμότητα του SOC, αλλά η Microsoft προτείνει ξεκάθαρα το Full.**

Εδώ κλείνει ο κύκλος με το 40% που ανέφερα στην αρχή. Ο λόγος που η Microsoft πιέζει προς το **full automation** δεν είναι εμπορικός, είναι στατιστικός. Το full automation έχει αποδειχθεί αξιόπιστο, αποδοτικό και ασφαλές, και ελευθερώνει τους πραγματικά κρίσιμους πόρους σου. Η αγωνία «και αν σβήσει κάτι που δεν έπρεπε;» απαντιέται από το γεγονός ότι **κάθε ενέργεια είναι αναστρέψιμη** μέσα από το Action Center.

[![Σύγκριση των automation levels: τι γίνεται αυτόματα και τι απαιτεί έγκριση σε κάθε επίπεδο](/images/DefenderAIR/air-automation-levels-compared.png)](/images/DefenderAIR/air-automation-levels-compared.png)
> 📷 **Εικόνα 7: Η ίδια πληροφορία σε μορφή σύγκρισης, χρήσιμο όταν πρέπει να δικαιολογήσεις την επιλογή σου σε ένα risk committee.**

## Device groups: γιατί δεν χρειάζεται να διαλέξεις ένα level για όλους

Ένα σημείο που ξεκλειδώνει πολλά: **το automation level ορίζεται ανά device group**, όχι καθολικά. Αυτό σημαίνει ότι μπορείς να έχεις full automation στα workstations των χρηστών (εκεί που ο όγκος είναι μεγάλος και το ρίσκο κάθε μεμονωμένης ενέργειας μικρό) και ταυτόχρονα semi-automation στους κρίσιμους servers, εκεί που θέλεις ένα ανθρώπινο ναι πριν αγγίξει κανείς οτιδήποτε.

Αυτή η ευελιξία είναι που κάνει το full automation ρεαλιστικό ακόμα και για συντηρητικούς οργανισμούς: δεν είναι απόφαση «όλα ή τίποτα». Είναι απόφαση ανά ζώνη ρίσκου. Και αν η ομάδα σου έχει ήδη ορίσει device groups με συγκεκριμένο automation level, οι default ρυθμίσεις που ρολάρει η Microsoft **δεν** τα αλλάζουν αλλά μένουν όπως τα έχεις.

[![Ρύθμιση automation level ανά device group στο Microsoft Defender, με διαφορετικά επίπεδα για workstations και servers](/images/DefenderAIR/air-device-groups-automation.png)](/images/DefenderAIR/air-device-groups-automation.png)
> 📷 **Εικόνα 8: Full automation στα endpoints των χρηστών, semi στους κρίσιμους servers. Το AIR σε αφήνει να χαράξεις τη γραμμή εκεί που βγάζει νόημα για σένα.**

## Πώς διαβάζεις τα αποτελέσματα μιας έρευνας

Όταν θέλεις να δεις τι έκανε το AIR, δύο είναι τα βασικά σου σημεία εισόδου: το **Action Center** (από εκεί εγκρίνεις ή απορρίπτεις pending actions και ανοίγεις την πλήρη σελίδα της έρευνας) και η **σελίδα του incident**, από την καρτέλα *Investigations*.

Μέσα στην έρευνα, η πληροφορία είναι οργανωμένη σε καρτέλες που αξίζει να ξέρεις:

- **Investigation graph:** η οπτική αναπαράσταση της έρευνας: οντότητες, απειλές που βρέθηκαν, alerts, και τι περιμένει έγκριση.
- **Alerts:** τα alerts που συνδέονται με την έρευνα.
- **Devices:** οι συσκευές που εμπλέκονται, μαζί με το remediation level τους (που αντιστοιχεί στο automation level του device group).
- **Evidence:** τα κομμάτια evidence με τα verdicts τους και το remediation status.
- **Entities:** λεπτομέρειες για κάθε αναλυμένη οντότητα, με verdict ανά τύπο.
- **Log:** χρονολογική, αναλυτική καταγραφή όλων των ενεργειών μετά το alert.
- **Pending actions:** ό,τι περιμένει την έγκρισή σου.

[![Ανάγνωση αποτελεσμάτων αυτόματης έρευνας AIR μέσα από το Action Center και το investigation graph](/images/DefenderAIR/air-reading-investigation-results.png)](/images/DefenderAIR/air-reading-investigation-results.png)
> 📷 **Εικόνα 9: Το Action Center είναι το control tower σου. Εδώ ζεις τη μέρα σου με το AIR.**

Καλό είναι επίσης να ξέρεις τι σημαίνουν τα **investigation states**, γιατί χωρίς αυτά η ουρά μοιάζει με κινέζικα. Τα βασικά που ορίζει το Defender for Endpoint είναι: **Benign** (ερευνήθηκε, δεν βρέθηκε απειλή), **PendingResource** (η έρευνα παγώνει γιατί περιμένει έγκριση ή η συσκευή είναι προσωρινά μη διαθέσιμη), **UnsupportedAlertType** (το AIR δεν καλύπτει αυτόν τον τύπο alert, προχωράς με advanced hunting), **Failed** (κάποιος analyzer δεν μπόρεσε να ολοκληρώσει) και **Successfully remediated** (ολοκληρώθηκε, όλες οι ενέργειες έγιναν ή εγκρίθηκαν). Στο ενοποιημένο περιβάλλον του Microsoft Defender XDR θα συναντήσεις και πιο αναλυτικά states (π.χ. *Partially investigated*, *Partially remediated*, *Terminated by system*), αλλά η παραπάνω πεντάδα είναι ο πυρήνας που πρέπει να αναγνωρίζεις με το μάτι.

[![Τα investigation states του AIR: Benign, PendingResource, UnsupportedAlertType, Failed, Successfully remediated](/images/DefenderAIR/air-investigation-states.png)](/images/DefenderAIR/air-investigation-states.png)
> 📷 **Εικόνα 10: Μάθε αυτά τα states και η ουρά των ερευνών σταματά να είναι θόρυβος και γίνεται πληροφορία.**

## Η μεγάλη αλλαγή: τι γίνεται από την 1η Σεπτεμβρίου 2026

Εδώ είναι το σημείο που πρέπει να δώσεις σημασία, γιατί αλλάζει τον τρόπο που θα σκέφτεσαι το AIR και είναι κάτι που ακόμα δεν έχει προλάβει να φτάσει σε πολλά άρθρα εκεί έξω.

**Από την 1η Σεπτεμβρίου 2026, το Automated Investigation and Response (AIR) παύει να τρέχει ως ξεχωριστή εμπειρία έρευνας** και **παύει να είναι διαθέσιμο για χειροκίνητη ενεργοποίηση** μέσα στο Microsoft Defender. Δηλαδή το κουμπί *Initiate Automated Investigation* και το ξεχωριστό investigation experience όπως τα ξέραμε, αποσύρονται.

Αυτό **δεν σημαίνει ότι χάνεις τις δυνατότητες**. Σημαίνει ότι αλλάζει η συσκευασία τους. Οι δυνατότητες detection και response του AIR **είναι ήδη ενσωματωμένες μέσα στο default antivirus protection stack** του Microsoft Defender και **τρέχουν αυτόματα**. Για on-demand έρευνα, ο νέος «σωστός» τρόπος είναι απλός: **τρέχεις ένα πλήρες antivirus scan** όταν το χρειαστείς.

Με απλά λόγια: το AIR δεν πεθαίνει, δεν **διαλύεται μέσα στην πλατφόρμα**. Από ένα feature που «ανάβεις» και «σκανάρεις χειροκίνητα», γίνεται μια αόρατη, πάντα-ενεργή ικανότητα του engine. Αν χτίζεις runbooks ή εκπαιδεύεις ομάδα, ενημέρωσε τη ροή σου: μην περιμένεις να βρεις το χειροκίνητο κουμπί μετά τον Σεπτέμβριο.

## Configuration: τι ισχύει σήμερα (και μία παγίδα που πρέπει να ξεχάσεις)

Η ρύθμιση γίνεται μέσα από **device groups**, όχι από κάποιον γενικό διακόπτη. Η διαδρομή:

1. Στο **Microsoft Defender portal**, πήγαινε **Settings → Permissions → Device groups**.
2. Πάτησε **+ Add device group**.
3. Δώσε όνομα και περιγραφή, και στο **Automation level** διάλεξε επίπεδο — π.χ. **Full - remediate threats automatically**.
4. Στο **Members**, όρισε τα κριτήρια που καθορίζουν ποιες συσκευές μπαίνουν στο group.
5. **Done**.

Και η παγίδα που θέλω να ξεκαθαρίσω, γιατί κυκλοφορούν παλιοί οδηγοί: **ο διακόπτης «Automated Investigation» στα Advanced features ΔΕΝ υπάρχει πλέον**. Έχει αφαιρεθεί. Η αυτόματη έρευνα είναι πλέον **enabled by default**. Αν βρεις οδηγό που σου λέει «πήγαινε στα Advanced features και άναψέ το», ο οδηγός είναι ξεπερασμένος, μη χάνεις χρόνο να ψάχνεις ένα toggle που δεν είναι εκεί.

[![Configuration best practices για το AIR: προϋποθέσεις, device groups, automation levels και τακτικός έλεγχος του Action Center](/images/DefenderAIR/air-configuration-best-practices.png)](/images/DefenderAIR/air-configuration-best-practices.png)
> 📷 **Εικόνα 11: Οι πρακτικές παραμένουν, device groups, σωστό automation level, τακτικός έλεγχος του Action Center. Αλλάζει μόνο το πού «κατοικεί» το feature.**

## Ο άνθρωπος και το AI, όχι ο άνθρωπος εναντίον του AI

Θα κλείσω με αυτό που πιστεύω πραγματικά, όχι με ένα slide. Το AIR δεν ήρθε να αντικαταστήσει τον αναλυτή. Ήρθε να αναλάβει τον **όγκο** (τα χιλιάδες μηχανικά βήματα που κανένας άνθρωπος δεν μπορεί να κάνει με συνέπεια στις τρεις τα ξημερώματα) και να αφήσει στον άνθρωπο αυτό που κάνει καλά ο άνθρωπος: την **κρίση**. Το context. Την απόφαση που θέλει να ξέρεις ότι «αυτός ο server είναι το ERP της παραγωγής, μην τον αγγίξεις πριν με πάρεις τηλέφωνο».

[![Η συνεργασία ανθρώπου και AI στο σύγχρονο SOC: το AIR αναλαμβάνει τον όγκο, ο άνθρωπος την κρίση](/images/DefenderAIR/air-human-ai-partnership.png)](/images/DefenderAIR/air-human-ai-partnership.png)
> 📷 **Εικόνα 12: Το AIR κάνει τη δουλειά της κλίμακας. Εσύ κάνεις τη δουλειά της κρίσης. Αυτός είναι ο σωστός καταμερισμός.**

Αν είσαι στην αρχή, το πιο σημαντικό βήμα σου αυτή τη βδομάδα είναι απλό: **έλεγξε σε ποιο automation level τρέχουν τα device groups σου** και ρώτησε τον εαυτό σου αν υπάρχει καλός λόγος να μην είναι στο Full εκεί που έχει νόημα. Αν είσαι πιο έμπειρος, το επόμενο βήμα είναι να **ξαναδείς τα runbooks σου υπό το πρίσμα της αλλαγής του Σεπτεμβρίου**, γιατί από εκεί και πέρα, το AIR δεν είναι κάτι που «τρέχεις», είναι κάτι που «είναι πάντα εκεί».

## Πού να πας από εδώ

> 🔗 **Συνέχισε με τη σειρά Microsoft Defender Demystified.** Αν θέλεις πρώτα να δεις πού ζει το AIR μέσα στην πλατφόρμα, το **[Part 5: A Walk Through the Microsoft Defender Portal](/posts/defender-demystified-part-5-portal-tour/)** σε ξεναγεί στο `security.microsoft.com` και στο Investigation & response, εκεί ακριβώς όπου συναντάς τις έρευνες του AIR στην καθημερινότητά σου.

Ακολούθησέ με στο [LinkedIn](https://www.linkedin.com/in/dimosthenisatteia/) για ειδοποιήσεις νέων άρθρων, ή γράψου στο RSS στην κορυφή της σελίδας.

## Πηγές από το Microsoft Learn

- [Overview of automated investigations (Defender for Endpoint)](https://learn.microsoft.com/en-us/defender-endpoint/automated-investigations)
- [Automation levels in automated investigation and remediation](https://learn.microsoft.com/en-us/defender-endpoint/automation-levels)
- [Configure automated investigation and remediation capabilities](https://learn.microsoft.com/en-us/defender-endpoint/configure-automated-investigations-remediation)
- [View the details and results of an automated investigation](https://learn.microsoft.com/en-us/defender-endpoint/autoir-investigation-results)
- [Automated investigation and response in Microsoft Defender XDR](https://learn.microsoft.com/en-us/defender-xdr/m365d-autoir)
- [Details and results of an automated investigation (unified investigation page)](https://learn.microsoft.com/en-us/defender-xdr/m365d-autoir-results)
- [The unified Action center](https://learn.microsoft.com/en-us/defender-endpoint/auto-investigation-action-center)
- [Review and approve remediation actions following an automated investigation](https://learn.microsoft.com/en-us/defender-endpoint/manage-auto-investigation)
