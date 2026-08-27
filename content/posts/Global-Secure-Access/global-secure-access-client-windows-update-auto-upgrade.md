---
title: "Global Secure Access client: από τον Νοέμβριο το Windows Update αναλαμβάνει τα upgrades"
date: 2026-08-27T14:00:00+03:00
lastmod: 2026-08-27T14:30:00+03:00
draft: false
keywords:
  - Global Secure Access client Windows Update
  - GSA client auto upgrade
  - EnableWindowsUpdates
  - Global Secure Access patch management
  - Microsoft Entra Global Secure Access
  - GSA client version 2.31.125
  - Windows x64 minimum client version
  - NIS2 patch management τεκμηρίωση
tags:
  - Microsoft Entra ID
  - Global Secure Access
  - Windows Update
  - Patch Management
  - NIS2
  - GRC
  - Cybersecurity
author: "Dimosthenis Atteia"
description: "Από τον Νοέμβριο του 2026 ο Global Secure Access client για Windows x64 θα ενημερώνεται αυτόματα μέσω Windows Update. Τι αλλάζει στο patch management μοντέλο, ποια είναι η ελάχιστη έκδοση, και πώς κάνεις opt-out αν το χρειάζεσαι."
summary: "Μια μικρή αλλά ουσιαστική αλλαγή περνάει σχεδόν απαρατήρητη: το GSA client σταματά να είναι αποκλειστικά ευθύνη του Intune σου. Από τον Νοέμβριο το Windows Update μπαίνει στο παιχνίδι, και αυτό έχει άμεση σχέση με το πώς τεκμηριώνεις το patch management σου."
categories: ["Microsoft 365 Security", "Network Security", "Global Secure Access"]
series: ["Global Secure Access"]
ShowToc: true
TocOpen: false
weight: -5.5
slug: "global-secure-access-client-windows-update-auto-upgrade"
cover:
  image: "images/global-secure-access-series/gsa-client-windows-update-minimum-version.png"
  alt: "Πίνακας ελάχιστης έκδοσης Global Secure Access client για αυτόματα upgrades μέσω Windows Update"
  caption: "Global Secure Access client for Windows release notes → Automatic upgrades from Windows Update"
  relative: true
ShowReadingTime: true
ShowWordCount: true
---

Στο [πρώτο μέρος της σειράς για το Global Secure Access]({{< ref "global-secure-access-meros-1-ti-einai-sse.md" >}}) μιλήσαμε για τη φιλοσοφία του SSE και το πού μπαίνει το GSA στο Zero Trust roadmap σου. Πριν προχωρήσουμε στο επόμενο μέρος, αξίζει μια μικρή στάση σε κάτι που μόλις προστέθηκε στα release notes του Windows client και που εύκολα θα περάσει απαρατήρητο σε ένα changelog: το **πώς** θα ενημερώνεται στο εξής ο client, όχι το **τι** κάνει.

## Τι αλλάζει

Μέχρι σήμερα, η ενημέρωση του Global Secure Access client σε Windows συσκευές ήταν αποκλειστικά δική σου δουλειά: manual download από το Entra admin center, deployment μέσω Intune, ή όποιο άλλο MDM χρησιμοποιείς. Ο client δεν ενημερωνόταν μόνος του.

Αυτό αλλάζει. Σύμφωνα με τα επίσημα release notes, **από τον Νοέμβριο του 2026 ο Global Secure Access client λαμβάνει αυτόματα upgrades μέσω Windows Update**. Δεν είναι optional feature που ενεργοποιείς, είναι το νέο default behavior για τις συσκευές που πληρούν την ελάχιστη προϋπόθεση έκδοσης.

Για **Windows x64**, η ελάχιστη έκδοση client που είναι επιλέξιμη για αυτά τα αυτόματα upgrades μέσω Windows Update είναι η **2.31.125**.

Με απλά λόγια: αν οι συσκευές σου τρέχουν ήδη 2.31.125 ή νεότερη, το Windows Update αναλαμβάνει να τις κρατάει ενημερωμένες, παράλληλα με ό,τι κανάλι διανομής χρησιμοποιείς ήδη.

## Γιατί δεν είναι απλώς ένα ακόμα changelog entry

Ως CISO, αυτό που με σταματάει δεν είναι η ίδια η δυνατότητα, είναι η μετατόπιση ευθύνης patching που κρύβει. Ένα endpoint agent που μέχρι σήμερα ενημερωνόταν αποκλειστικά μέσω του δικού σου change-controlled κύκλου (Intune ring deployment, staged rollout, testing πριν production) αποκτά τώρα ένα δεύτερο, παράλληλο κανάλι ενημέρωσης που δεν περνάει απαραίτητα από τη δική σου διαδικασία έγκρισης.

Αυτό δεν είναι κακό από μόνο του, το αντίθετο, μειώνει τον κίνδυνο να μείνουν συσκευές πίσω σε παλιές, ευάλωτες εκδόσεις. Αλλά αν το change management σου βασίζεται στην παραδοχή «ο client ενημερώνεται μόνο όταν εγώ το αποφασίσω μέσω Intune», αυτή η παραδοχή έπαψε να ισχύει καθολικά από τον Νοέμβριο.

## Αν θέλεις να κρατήσεις τον έλεγχο

Υπάρχει opt-out. Κατά την εγκατάσταση ή το upgrade του client, μέσω command line ή μέσω του MDM σου, μπορείς να περάσεις την παράμετρο που απενεργοποιεί το αυτόματο upgrade μέσω Windows Update, ώστε ο client να συνεχίσει να ενημερώνεται αποκλειστικά μέσω του δικού σου pipeline.

Το σημείο-κλειδί εδώ, και το σημειώνω γιατί ξέρω πόσο εύκολα ξεχνιέται: αν κάνεις opt-out, η ευθύνη να κρατάς τον client ενημερωμένο επιστρέφει εξ ολοκλήρου σε εσένα. Συσκευές που μένουν σε παλιές εκδόσεις δεν λαμβάνουν ούτε τα νέα features ούτε, το σημαντικότερο, τα security fixes.

## Η οπτική NIS2 / ISO 27001, σε μία παράγραφο

Αν τεκμηριώνεις το patch management σου (NIS2, ISO 27001 A.8.8), αυτή η αλλαγή θέλει μια γραμμή στο σχετικό procedure σου: ποιο κανάλι ενημερώνει το GSA client στις managed συσκευές σου, Intune, Windows Update, ή και τα δύο, και ποια είναι η επίσημη στάση του οργανισμού απέναντι στο αυτόματο upgrade. Ένα auditor που θα ρωτήσει «πώς διασφαλίζεις ότι το endpoint agent σου παραμένει ενημερωμένο» θα περιμένει να ξέρεις την απάντηση, όχι να το ανακαλύψεις μαζί του στην κουβέντα.

Αν τρέχεις ήδη GSA σε production, έλεγξε σήμερα τι έκδοση client έχεις στο fleet σου. Αν είσαι κάτω από 2.31.125, δεν θα πάρεις καν την επιλογή, ούτε αυτόματο ούτε manual convenience, μέχρι να κάνεις το upgrade.
