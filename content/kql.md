---
title: "Βιβλιοθήκη KQL για ΚΥΑ 1689/2025, NIS2 και ISO 27001"
date: 2026-10-12T12:00:00+03:00
lastmod: 2026-10-12T12:00:00+03:00
draft: false
layout: "kql"
url: "/kql/"
# Το link στο μενού ορίζεται εδώ, ώστε να εμφανίζεται μόνο όταν η σελίδα είναι δημοσιευμένη.
menu:
  main:
    identifier: tool-kql
    parent: tools
    name: "🎯 Βιβλιοθήκη KQL ανά απαίτηση"
    weight: 3
author: "Dimosthenis Atteia"
description: "Advanced Hunting queries για το Microsoft Defender XDR, αντιστοιχισμένα στις απαιτήσεις της ΚΥΑ 1689/2025, της Οδηγίας NIS2 και του ISO/IEC 27001. Κάθε query έχει δοκιμαστεί σε πραγματικό tenant."
keywords:
  - KQL ΚΥΑ 1689/2025
  - Advanced Hunting queries
  - KQL NIS2
  - KQL ISO 27001
  - Microsoft Defender XDR KQL
  - legacy authentication KQL
showToc: false
ShowReadingTime: false
ShowBreadCrumbs: false
hideMeta: true
categories: ["Security Operations & XDR"]
tags:
  - KQL
  - Advanced Hunting
  - Microsoft Defender XDR
  - Threat Hunting
  - NIS2
  - ISO 27001
  - Compliance Evidence
# MITRE ATT&CK®: ονόματα στο data/mitre.yaml
mitre: ["T1110.003", "T1078.004", "T1098.003", "T1566", "T1052.001", "T1091", "M1034", "T1530", "T1213.002", "T1098.007", "T1685", "T1190", "T1203", "T1068", "M1051"]
---

Κάθε query εδώ απαντά σε μία ερώτηση που θα σου κάνει ο ελεγκτής: «δείξε μου ότι το ελέγχεις». Το αντιγράφεις, το τρέχεις στο **Microsoft Defender portal > Hunting > Advanced hunting**, και το αποτέλεσμα είναι το τεκμήριό σου για την απαίτηση.

Κανένα query δεν μπαίνει στη βιβλιοθήκη αν δεν έχει τρέξει πρώτα σε πραγματικό tenant. Γι' αυτό κάθε query έχει ημερομηνία δοκιμής και εικόνα από την εκτέλεση. Η βιβλιοθήκη μεγαλώνει κάθε εβδομάδα.

Τα queries διαβάζουν μόνο δεδομένα, δεν αλλάζουν τίποτα στο tenant. Τρέξε τα με λογαριασμό που έχει το ελάχιστο απαραίτητο δικαίωμα, π.χ. Security Reader.
