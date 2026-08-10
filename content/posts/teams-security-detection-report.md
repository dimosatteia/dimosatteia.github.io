---
title: "Security Detection Report στο Teams Admin Center (Roadmap ID 560702): Τι αλλάζει πραγματικά για την ασφάλεια messaging"
date: 2026-08-10T11:00:00+03:00
lastmod: 2026-08-10T11:30:00+03:00
draft: false
keywords:
  - Microsoft Teams Security Detection Report
  - Microsoft 365 Roadmap ID 560702
  - Teams admin center Protection Reports
  - Impersonation detection Teams
  - Malicious URL detection Teams
  - Messaging Safety settings Teams
  - MC1311977
  - NIS2 ανίχνευση περιστατικών
  - ISO 27001 A.8.16 monitoring activities
  - Zero Trust collaboration security
tags:
  - Microsoft Teams
  - Microsoft 365 Security
  - Conditional Access
  - Identity Security
  - NIS2
  - ISO 27001
  - GRC
  - Cybersecurity
  - Threat Detection
  - Zero Trust
author: "Dimosthenis Atteia"
description: "Ανάλυση του νέου Security Detection Report στο Teams admin center (Microsoft 365 Roadmap ID 560702), με την οπτική ενός CISO που το αξιολογεί ως compensating control για messaging-based απειλές και ως τεκμηρίωση για NIS2 και ISO 27001."
summary: "Το Teams έχει γίνει εδώ και καιρό κανάλι επίθεσης εξίσου σοβαρό με το email, αλλά μέχρι σήμερα δεν υπήρχε ένα native, κεντρικό σημείο για να το βλέπεις αυτό. Το Security Detection Report που έρχεται με το Roadmap ID 560702 δεν είναι απλώς ένα ακόμα dashboard, είναι το κομμάτι που έλειπε από το evidence trail σου όταν έρχεται ο auditor να ρωτήσει πώς παρακολουθείς messaging απειλές."
categories: ["Microsoft 365 Security", "Identity Security"]
series:
ShowToc: true
TocOpen: false
weight: -5
cover:
  image: "images/teams-security-detection-report/teams-security-detection-report-cover.png"
  alt: "Security Detection Report στο Microsoft Teams admin center, κάτω από Analytics & reports, Protection reports"
  caption: "Teams admin center → Analytics & reports → Protection reports → Security detections report"
  relative: true
ShowReadingTime: true
ShowWordCount: true
---

Όσο περνάει ο καιρός, όλο και λιγότερο μιλάμε για το Teams σαν «εργαλείο συνεργασίας» και όλο και περισσότερο σαν attack surface. Δεν είναι κάτι νέο για όποιον παρακολουθεί closely το threat landscape, phishing μέσω chat, malicious links σε κανάλια, εξωτερικοί χρήστες που παριστάνουν συνάδελφο ή προμηθευτή. Αυτό που έλειπε μέχρι σήμερα ήταν ένα native, κεντρικό σημείο μέσα στο ίδιο το Teams admin center για να το βλέπεις αυτό συγκεντρωμένα, χωρίς να πηγαίνεις να ψάχνεις σε τρία διαφορετικά reports του Defender portal.

Αυτό ακριβώς έρχεται να καλύψει το **Security Detection Report**, που παρακολουθείται στο Microsoft 365 Roadmap με **ID 560702** και στο Message Center ως **MC1311977**. Το είδα πρώτη φορά να αναφέρεται σε ένα roundup τον Ιούλιο, το έψαξα στην επίσημη τεκμηρίωση και σε δημοσιεύσεις που παρακολουθούν στενά το Message Center archive, και αξίζει ανάλυση, όχι μόνο για το τι κάνει, αλλά για το πού μπαίνει στο δικό μας, το GRC, puzzle.

## Τι είναι, σε επίπεδο λειτουργίας

Το νέο report ζει στο Teams admin center, στη διαδρομή **Analytics & reports → Protection reports → Security detections report**. Δεν είναι ένα ακόμα generic analytics widget, είναι φτιαγμένο συγκεκριμένα για να ενοποιήσει τρεις κατηγορίες messaging απειλών που μέχρι σήμερα έβλεπες σκόρπιες:

- **Impersonation attempts**, απόπειρες να παρουσιαστεί κάποιος ως άλλος χρήστης ή entity μέσα σε chat/κανάλι
- **Malicious URLs**, links που έχουν αναγνωριστεί ως κακόβουλα μέσα σε μηνύματα Teams
- **Weaponizable file types**, αρχεία τύπων που μπορούν να χρησιμοποιηθούν ως φορέας malware

[![Security Detection Report στο Teams admin center με chart ανίχνευσης και πίνακα λεπτομερειών](/images/teams-security-detection-report/teams-security-detection-report-cover.png)](/images/teams-security-detection-report/teams-security-detection-report-cover.png)
> 📷 **Εικόνα 1: Teams admin center → Analytics & reports → Protection reports → Security detections. Chart ανίχνευσης ανά ημερομηνία και αναλυτικός πίνακας ανά detection.**

Πρακτικά, το report συνδυάζει ένα chart με τον όγκο ανιχνεύσεων σε επιλεγμένο χρονικό διάστημα με έναν πίνακα που δείχνει κάθε μεμονωμένη ανίχνευση ξεχωριστά. Κάθε εγγραφή περιλαμβάνει sender, recipient context, τύπο ανίχνευσης και τις διαθέσιμες ενέργειες που μπορεί να κάνει ο admin. Αν χρειαστεί export για investigation ή για SIEM, τα δεδομένα κατεβαίνουν σε CSV, τόσο σε επίπεδο chart-summary όσο και σε επίπεδο πλήρους πίνακα, με επιπλέον μεταδεδομένα όπως sender identifier και thread ID.

Το κομμάτι που πραγματικά μου κέντρισε το ενδιαφέρον ως practitioner είναι το εξής: μέσα από το ίδιο report, ο admin μπορεί να μπλοκάρει έναν κακόβουλο εξωτερικό χρήστη απευθείας μέσω των **External access settings**, χωρίς να χρειάζεται να μεταπηδήσει σε άλλο portal. Αυτό κόβει σημαντικά τον χρόνο ανάμεσα σε detection και containment, κάτι που κάθε playbook incident response θέλει να δει.

## Τι είναι ήδη ενεργό «by default» και τι θέλει configuration

Ένα σημείο που αξίζει προσοχή, γιατί συχνά μπερδεύει: το report δεν είναι το ίδιο το detection mechanism, είναι το reporting layer πάνω από προστασίες που ήδη υπάρχουν στο Teams messaging.

- Η **ανίχνευση impersonation** δεν χρειάζεται καμία ρύθμιση, είναι ενεργή by default.
- Η **σάρωση malicious links** ελέγχεται μέσω των **Messaging safety settings** στο Teams admin center.
- Η **σάρωση weaponizable αρχείων** ελέγχεται επίσης μέσω των ίδιων Messaging safety settings.

Αυτό σημαίνει ότι αν οι ρυθμίσεις Messaging Safety στο tenant σου είναι σε default ή ημιτελή κατάσταση, το νέο report θα σου δείξει λιγότερα από όσα θα έπρεπε, όχι επειδή δεν υπάρχει απειλή, αλλά επειδή δεν είναι configured να την πιάσει. Πριν πανηγυρίσεις για ένα «καθαρό» dashboard, αξίζει να επιβεβαιώσεις ότι το scanning είναι πραγματικά ενεργό, όχι μόνο ότι το report είναι διαθέσιμο.

## Χρονοδιάγραμμα rollout, και γιατί μετακινήθηκε τρεις φορές

Το timeline αυτού του feature άξιζε παρακολούθηση από μόνο του. Αρχικά αναφερόταν για **μέσα Ιουλίου 2026**, μετατέθηκε σε **τέλη Ιουνίου 2026**, και η πιο πρόσφατη ενημέρωση το τοποθετεί σε **General Availability από τέλη Αυγούστου 2026**, με ολοκλήρωση rollout παγκοσμίως έως τις αρχές Σεπτεμβρίου 2026 για standard multi-tenant πελάτες. Τρεις αλλαγές timeline σε λίγους μήνες δεν είναι απαραίτητα κακό σημάδι, συνήθως δείχνει ότι η Microsoft συνεχίζει να δουλεύει πάνω στη λογική ανίχνευσης και στο reporting infrastructure πριν το ανοίξει ευρέως, κάτι λογικό όταν μιλάμε για ένα κανάλι τόσο κεντρικό στην καθημερινότητα ενός οργανισμού όσο το Teams.

Πρακτικά, αυτό σημαίνει ένα πράγμα για εμάς: μην κλειδώνεις runbooks και documentation πάνω σε ημερομηνία, κλείδωσε τα πάνω στο **capability**, και ενημέρωσέ τα όταν το report εμφανιστεί πραγματικά στο δικό σου tenant.

## Γιατί δεν είναι «απλά ένα ακόμα report» από τη σκοπιά GRC

Εδώ μπαίνει το κομμάτι που με ενδιαφέρει πραγματικά περισσότερο από το UI.

**Κάλυψη ενός γνωστού blind spot σε τεκμηρίωση monitoring.** Στα περισσότερα ISMS που έχω δει, η τεκμηρίωση monitoring δραστηριοτήτων γύρω από το ISO 27001 **A.8.16** (monitoring activities) και **A.5.7** (threat intelligence) καλύπτει καλά το email, το endpoint, ίσως το identity layer, αλλά αφήνει το collaboration/messaging layer σαν μια γκρίζα ζώνη, «το παρακολουθεί ο Defender γενικά». Αυτό το report σου δίνει ένα συγκεκριμένο, ονομαστικό evidence artifact που μπορείς να δείξεις σε auditor: εδώ είναι πού βλέπω messaging απειλές στο Teams, εδώ είναι πώς τις εξάγω, εδώ είναι το SLA response.

**NIS2 και η υποχρέωση ανίχνευσης και διαχείρισης περιστατικών.** Το NIS2 δεν ζητά απλώς να έχεις controls, ζητά να μπορείς να αποδείξεις ικανότητα ανίχνευσης (detection capability) και χρονικά πλαίσιο response για περιστατικά. Ένα report που ενοποιεί impersonation, malicious links και weaponizable αρχεία σε ένα σημείο, με export για SIEM integration, είναι ακριβώς το είδος του τεκμηριωμένου detection & response mechanism που ένα risk-based πρόγραμμα NIS2 θέλει να βλέπει, ειδικά όταν το Teams είναι de facto το κύριο κανάλι εσωτερικής και συχνά εξωτερικής επικοινωνίας του οργανισμού.

**Αλλαγή στο incident response runbook, όχι απλή προσθήκη ενός link.** Αν το SOC ή το helpdesk σου δεν ξέρει ότι αυτό το report υπάρχει, ή δεν το έχει ενσωματώσει στη διαδικασία triage, τότε στην πράξη δεν άλλαξε τίποτα παρά το ότι υπάρχει ένα καλύτερο εργαλείο που κανείς δεν χρησιμοποιεί. Η αξία δεν είναι στο feature, είναι στο πόσο γρήγορα το ενσωματώνεις στο δικό σου investigation workflow.

## Τι αξίζει να κάνεις πριν φτάσει στο δικό σου tenant

Δεν χρειάζεται να περιμένεις το GA για να ετοιμαστείς, οι περισσότερες ενέργειες προετοιμασίας δεν εξαρτώνται από το αν το report είναι ήδη ορατό.

- **Επιβεβαίωσε τις Messaging safety settings.** Έλεγξε ότι το malicious link και το file scanning είναι πραγματικά ενεργά στο tenant σου, όχι μόνο σε default κατάσταση.
- **Ενημέρωσε το SOC/helpdesk για τη νέα διαδρομή.** Analytics & reports → Protection reports → Security detections θα πρέπει να μπει στο daily triage checklist.
- **Σχεδίασε το export flow προς SIEM.** Αν έχεις ήδη ingestion από Defender ή Sentinel, αποφάσισε τώρα πώς θα ενσωματωθεί το CSV export ή αν θα περιμένεις API/connector integration.
- **Ενημέρωσε το incident response runbook.** Πρόσθεσε ρητή αναφορά στο Teams ως πηγή σήματος, με ξεχωριστό βήμα για block μέσω External access settings.
- **Καταγράψτε το ως αλλαγή στο ISMS documentation.** Νέο monitoring capability σημαίνει update στο Statement of Applicability ή στο αντίστοιχο risk treatment plan, όχι σιωπηλή αποδοχή.

## Το συμπέρασμα

Το Security Detection Report δεν είναι ένα revolutionary feature με τη τεχνική έννοια, είναι κυρίως ενοποίηση κάτι που ήδη υπήρχε σκόρπιο. Ακριβώς όμως αυτή η ενοποίηση είναι που το κάνει χρήσιμο για εμάς που πρέπει να αποδείξουμε, όχι απλώς να ισχυριστούμε, ότι παρακολουθούμε το messaging attack surface. Ένα tenant που «δείχνει πράσινο» επειδή κανείς δεν κοιτάζει το σωστό dashboard δεν είναι ασφαλές tenant, είναι απλώς tenant χωρίς visibility. Το 560702 είναι ακριβώς το είδος του incremental capability που, αν το εντάξεις σωστά στο δικό σου monitoring και evidence trail, αξίζει πολύ περισσότερο από όσο δείχνει στην πρώτη ματιά ενός roadmap item.

Αν διαχειρίζεσαι Teams tenant, δύο πράγματα αξίζει να ελέγξεις τώρα: επιβεβαίωσε ότι τα Messaging safety settings σου είναι πραγματικά ενεργά, και βάλε ήδη στο documentation σου πού θα καταγράφεται αυτό το νέο monitoring capability μόλις φτάσει στο tenant σου. Αν έχεις ήδη δει το report live ή θέλεις να συζητήσουμε πώς το εντάσσεις σε NIS2/ISO 27001 τεκμηρίωση, χαίρομαι να το συζητήσουμε στα σχόλια ή στο LinkedIn.
