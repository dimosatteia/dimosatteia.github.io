---
title: "Allowed Agent Types στο Microsoft 365: Γιατί το «Only Certified External Publishers» είναι η μόνη λογική επιλογή"
date: 2026-08-07T09:00:00+03:00
lastmod: 2026-08-07T09:30:00+03:00
draft: false
keywords: 
  - Allowed Agent Types
  - Microsoft 365 Copilot agents
  - Only certified external publishers
  - Shadow AI
  - NIS2 governance
  - ISO 27001 A.5.19
  - Microsoft 365 admin center
  - Copilot Control System
  - Publisher Verified Publisher Attested Microsoft 365 Certified
  - agent governance
tags: 
  - Microsoft 365
  - Copilot
  - AI Agents
  - Shadow AI
  - NIS2
  - Governance
  - ISO 27001
  - Cybersecurity
  - GRC
  - Publisher Certification
author: "Dimosthenis Atteia"
description: "Ρύθμισα το Allowed Agent Types στο δικό μου Microsoft 365 tenant σε «Only certified external publishers». Αναλύω τι σημαίνει στην πράξη, γιατί μετράει για NIS2 και ISO 27001, και πώς να το κάνεις κι εσύ σήμερα."
summary: "Ένα radio button μέσα στο Copilot Control System είναι η διαφορά ανάμεσα σε ελεγμένο agent ecosystem και σε Shadow AI χωρίς φρένο. Δες γιατί το «Only certified external publishers» είναι η ρύθμιση που θα διάλεγα ξανά, με screenshots από το δικό μου tenant."
categories: ["Microsoft 365 Security", "AI Security"]
series:
ShowToc: true
TocOpen: false
weight: -5
cover:
  image: "images/agent/allowed-agent-types-context.png"
  alt: "Allowed Agent Types ρύθμιση στο Microsoft 365 admin center με επιλεγμένο Only certified external publishers"
  caption: "Allowed Agent Types — Copilot Control System, Microsoft 365 admin center"
  relative: true
ShowReadingTime: true
ShowWordCount: true
---

Πριν λίγες μέρες πέρασα ξανά από τα Agent settings του δικού μας tenant, κάτι που έχω κάνει δεκάδες φορές τους τελευταίους μήνες καθώς το Copilot Control System αλλάζει σχεδόν κάθε sprint. Αυτή τη φορά όμως στάθηκα λίγο παραπάνω σε ένα radio button που τις προηγούμενες φορές το προσπερνούσα: **Allowed agent types**, και συγκεκριμένα η επιλογή ανάμεσα σε *All external publishers* και *Only certified external publishers*.

Φαίνεται ασήμαντο? Και όμωε δεν είναι. Είναι μία από εκείνες τις ρυθμίσεις που, αν τη δεις μόνο ως IT toggle, τη διαβάζεις λάθος. Αν όμως τη δεις ως CISO, καταλαβαίνεις ότι είναι ουσιαστικά μια πολιτική third-party risk management μέσα σε ένα checkbox.

Το άλλαξα στο δικό μας production tenant. Εδώ είναι το γιατί, με στοιχεία και όχι μόνο με «καλή πρακτική».

## Πού βρίσκεται και τι κάνει στην πράξη

Η ρύθμιση ζει στο **Microsoft 365 admin center → Agents → Settings → Allowed agent types**. Εκεί ελέγχεις ποιες κατηγορίες agents βλέπουν καν οι χρήστες σου στο Agent Store:

- Agents δημιουργημένοι από τη Microsoft
- Agents δημιουργημένοι από τον δικό σου οργανισμό
- Agents δημιουργημένοι από εξωτερικούς publishers

Το τρίτο σκέλος είναι αυτό που έχει «ζουμί», γιατί ανοίγει αμέσως μια δεύτερη απόφαση: αν επιτρέψεις εξωτερικούς publishers, θέλεις *όλους* ή μόνο όσους έχουν περάσει από κάποιο φίλτρο της Microsoft;

[![Agent settings και το Allowed Agent Types panel στο Microsoft 365 admin center](/images/agent/allowed-agent-types-context.png)](/images/agent/allowed-agent-types-context.png)
> 📷 **Εικόνα 1: Microsoft 365 admin center → Agent → Settings → Allowed Agent Types**

Αν απενεργοποιήσεις μια κατηγορία, οι χρήστες απλά δεν τη βλέπουν πλέον στο store. Αυτό όμως δεν σημαίνει ότι διαγράφονται agents που ήδη τρέχουν, οπότε αυτό είναι ένα προληπτικό, όχι αναδρομικό, control.

## All external publishers vs Only certified external publishers

Η διαφορά στην επιφάνεια είναι απλή:

| | All external publishers | Only certified external publishers |
|---|---|---|
| Ποιος μπορεί να δημοσιεύσει agent που θα δουν οι χρήστες σου | Οποιοσδήποτε external publisher με agent στο marketplace | Μόνο publishers που έχουν περάσει από τη διαδικασία certification της Microsoft |
| Επίπεδο ελέγχου πριν φτάσει στους χρήστες σου | Ελάχιστο, βασικά marketplace listing rules | Επιπλέον στρώμα ελέγχου σε ασφάλεια/συμμόρφωση |
| Ποιος «αποφασίζει» για λογαριασμό σου | Ο publisher και η αγορά | Η Microsoft, μέσω audit process |

Αυτό όμως που αξίζει να σταθείς είναι το τι σημαίνει πραγματικά «certified», γιατί εκεί οι περισσότεροι (συμπεριλαμβανομένου και εμού μέχρι πρόσφατα) το απλοποιούν υπερβολικά.

[![Close-up του Allowed Agent Types panel με επιλεγμένο Only certified external publishers](/images/agent/allowed-agent-types-panel-closeup.png)](/images/agent/allowed-agent-types-panel-closeup.png)
> 📷 **Εικόνα 2: Only certified external publishers επιλεγμένο**

## Verified, Attested, Certified: δεν είναι το ίδιο πράγμα

Υπάρχει μια τάση να θεωρούμε ότι «certified publisher» σημαίνει απλώς «η Microsoft επιβεβαίωσε ποιος είναι αυτός ο publisher». Δεν είναι ακριβώς έτσι, και η διάκριση έχει governance βάρος.

Η Microsoft τρέχει σήμερα ένα σύστημα τριών επιπέδων για apps και agents στο AppSource, στο Teams Store και στο Microsoft 365 admin center:

1. **Publisher Verified:** Επιβεβαιώνεται η ταυτότητα του developer: εταιρική οντότητα στο Partner Center, ownership του domain. Δεν λέει τίποτα για το πόσο ασφαλές είναι το ίδιο το agent.
2. **Publisher Attested:** Ο publisher δηλώνει ο ίδιος (self-assessment) τη στάση του agent σε θέματα ασφάλειας και συμμόρφωσης.
3. **Microsoft 365 Certified:** Ο agent έχει περάσει πλήρες audit της Microsoft πάνω σε συγκεκριμένα security και compliance controls, πρώην γνωστό ως Microsoft 365 App Compliance Program.

Το όνομα του radio button **«Only certified»**, και όχι «only verified», δείχνει ξεκάθαρα προς το τρίτο, ανώτερο επίπεδο. Δηλαδή δεν περιορίζεις απλώς σε publishers με γνωστή ταυτότητα περιορίζεις σε agents που έχουν ελεγχθεί πραγματικά ως προς το πώς χειρίζονται δεδομένα. Η επίσημη τεκμηρίωση της Microsoft για το συγκεκριμένο radio button δεν το εξειδικεύει ρητά μέχρι στιγμής, οπότε το συμπέρασμα αυτό στηρίζεται στην ονοματολογία και στη λογική του certification framework. Αξίζει να το επιβεβαιώνεις κατά καιρούς μέσα από το Security & Compliance section των Integrated Apps, όπου η Microsoft δείχνει ρητά ποιο badge έχει κάθε agent.

Η διάκριση αυτή δεν είναι ακαδημαϊκή. Αν δουλεύεις σε GRC, ξέρεις καλά ότι «ξέρω ποιος το έφτιαξε» και «ξέρω τι κάνει με τα δεδομένα μου» είναι δύο εντελώς διαφορετικές διαβεβαιώσεις.

## Γιατί το επέλεξα: η οπτική NIS2 και ISO 27001

Η δουλειά μου δεν σταματάει στο «ενεργοποίησα το σωστό radio button». Χρειάζεται να μπορώ να εξηγήσω το γιατί σε auditor, σε top management, ή σε αρχή εποπτείας.

**Shadow AI είναι το νέο Shadow IT.** Κάθε agent από άγνωστο publisher που φτάνει στο Agent Store είναι, ουσιαστικά, ένα νέο τρίτο μέρος που μπορεί να αποκτήσει πρόσβαση σε δεδομένα του οργανισμού, χωρίς να έχει περάσει από τη δική σου διαδικασία αξιολόγησης προμηθευτή. Το «Only certified» δεν εξαλείφει τον κίνδυνο, αλλά τον μειώνει σημαντικά πριν καν φτάσει στο radar σου.

**Η ΚΥΑ 1689/2025 και το Ελληνικό πλαίσιο NIS2** απαιτούν από σημαντικές και βασικές οντότητες τεκμηριωμένη διαχείριση κινδύνων εφοδιαστικής αλυσίδας, και ένα AI agent από άγνωστο publisher είναι, στην ουσία, νέος κρίκος σε αυτή την αλυσίδα. Το να περιορίζεις εξ ορισμού σε certified publishers είναι ένα μετρήσιμο, τεκμηριώσιμο control που μπορείς να δείξεις σε audit.

**Το ISO 27001, στα controls A.5.19 έως A.5.21 (σχέσεις με προμηθευτές)**, ζητά ακριβώς αυτό: ελεγχόμενη αξιολόγηση τρίτων πριν τους δώσεις πρόσβαση. Η ρύθμιση αυτή είναι ένα από τα ελάχιστα σημεία όπου ένα technical control του Microsoft 365 admin center χαρτογραφείται σχεδόν 1-προς-1 πάνω σε ένα requirement του προτύπου, χωρίς να χρειάζεται επιπλέον compensating control.

**Zero Trust δεν σταματά στους χρήστες και στις συσκευές.** Επεκτείνεται και στους «actors» που τρέχουν μέσα στο περιβάλλον σου, και ένας agent είναι actor, όχι εργαλείο. «Never trust, always verify» σημαίνει, μεταξύ άλλων, μην εμπιστεύεσαι agent απλώς επειδή εμφανίστηκε στο marketplace.

## Τι χάνεις με αυτή την επιλογή

Θα ήταν ανέντιμο να το παρουσιάσω σαν απόφαση χωρίς κόστος. Περιορίζοντας σε certified publishers, μειώνεις το διαθέσιμο agent catalog, κάποια χρήσιμα, νεότερα ή niche agents ενδέχεται να μην έχουν ακόμα προλάβει να περάσουν τη διαδικασία certification. Αν ο οργανισμός σου έχει πραγματική ανάγκη για συγκεκριμένο agent που δεν είναι certified, η λύση δεν είναι να ανοίξεις τη «βρύση» για όλους, αλλά να το αξιολογήσεις μεμονωμένα και να το προσθέσεις χειροκίνητα μέσω του Agent Registry, με τεκμηρίωση του γιατί έγινε exception.

Αυτό είναι, εξάλλου, η ουσία του risk-based approach: default σε ασφαλές, εξαιρέσεις με τεκμηρίωση και όχι το αντίστροφο.

## Πώς το ρυθμίζεις

1. Microsoft 365 admin center → **Agents** → **Settings**.
2. Επίλεξε **Allowed agent types**.
3. Κράτα ενεργοποιημένο το *Allow apps and agents built by external publishers* αν πραγματικά χρειάζεσαι external agents, αν όχι, το πιο αυστηρό control είναι απλά να το απενεργοποιήσεις εντελώς.
4. Αν το χρειάζεσαι, επίλεξε **Only certified external publishers** αντί για *All external publishers*.
5. **Save**, και τεκμηρίωσέ το στο δικό σου change log / ISMS ως policy decision, όχι απλώς ως τεχνική αλλαγή.

## Συχνές ερωτήσεις

**Αλλάζει κάτι στα agents που είναι ήδη εγκατεστημένα;**
Όχι αναδρομικά. Η ρύθμιση επηρεάζει τι εμφανίζεται και τι μπορεί να εγκατασταθεί από εδώ και πέρα, όχι agents που ήδη τρέχουν.

**Αποκλείει η επιλογή αυτή και τα Microsoft-built agents;**
Όχι. Τα Microsoft agents ελέγχονται από ξεχωριστό checkbox και δεν επηρεάζονται από το certified/all external publishers toggle.

**Αρκεί μόνο αυτό το control για governance πάνω σε AI agents;**
Όχι, είναι ένα κομμάτι. Το συνδυάζω με Agent Registry review, user access scoping, και agent management rules. 

## Το συμπέρασμα

Δεν είναι κάθε ρύθμιση στο admin center τόσο κρίσιμη όσο φαίνεται με την πρώτη ματιά...αλλά αυτή είναι. Είναι από τα σπάνια σημεία όπου ένα default checkbox στο Copilot Control System λειτουργεί σαν πραγματικό supply-chain control, με άμεση αντιστοίχιση σε NIS2 και ISO 27001. Αν δεν το έχεις ελέγξει ακόμα στο δικό σου tenant, είναι πέντε λεπτά δουλειάς με μετρήσιμο αντίκτυπο στο risk register σου.

Αν το δοκιμάσεις στο δικό σου περιβάλλον ή αν βλέπεις τη διάκριση Verified/Attested/Certified διαφορετικά, θα χαρώ να το συζητήσουμε στα σχόλια ή στο LinkedIn.
