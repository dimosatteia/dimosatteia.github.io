---
title: "Generally Available: Security for Microsoft Agent 365 with Defender"
date: 2026-07-14T11:00:00+03:00
lastmod: 2026-07-14T11:38:00+03:00
draft: false
keywords:
  - Microsoft Agent 365
  - Microsoft Defender
  - AI agent security
  - Copilot Studio security
  - AI threat detection
  - NIS2 compliance
tags:
  - Microsoft Defender
  - Microsoft Agent 365
  - AI Security
  - GRC
  - Copilot Studio
author: "Dimosthenis Atteia"
description: "Το Microsoft Defender αποκτά ενσωματωμένη ασφάλεια για AI agents μέσω του Microsoft Agent 365: discovery, security posture, real-time protection και investigation, πλέον Generally Available."
summary: "Οι AI agents στον οργανισμό σου γίνονται ένα ακόμα asset που χρειάζεται προστασία. Δες πώς το Microsoft Defender, μέσω του Microsoft Agent 365, τους ανακαλύπτει, τους αξιολογεί και τους προστατεύει σε πραγματικό χρόνο."
categories: ["Microsoft Defender"]
series: ["Generally Available Features"]
releases:
  - "generally-available"       # ← αυτό στο /releases/generally-available/
ShowToc: true
TocOpen: false
cover:
  image: "https://learn.microsoft.com/en-us/defender-xdr/security-for-ai/media/defender-security-for-ai/defender-secure-ai-lifecycle.png"
  alt: "Διάγραμμα κύκλου ζωής κινδύνων AI στο Microsoft Defender: χρήση, κακή συμπεριφορά agent, διαρροές δεδομένων και απειλές μοντέλων"
  caption: "Πηγή εικόνας: Microsoft Learn"
  relative: false
---

Οι AI agents μπήκαν στη ζωή μας γρήγορα, ίσως πιο γρήγορα από όσο προλάβαμε να χτίσουμε γύρω τους τα σωστά security controls. Ένας agent που «σκέφτεται», καλεί εργαλεία, αγγίζει δεδομένα και παίρνει αποφάσεις μόνος του δεν είναι απλώς ένα ακόμα application· είναι μια νέα επιφάνεια επίθεσης, με τη δική της λογική κινδύνου. Και όσο περισσότερους agents αναπτύσσει ένας οργανισμός, τόσο πιο δύσκολο γίνεται να ξέρεις ποιοι υπάρχουν, τι δικαιώματα έχουν, και αν κάποιος από αυτούς μόλις έκανε κάτι που δεν έπρεπε.

Το Microsoft Defender μόλις έκανε Generally Available την ενσωμάτωσή του με το **Microsoft Agent 365**, φέρνοντας discovery, security posture management, real-time protection και investigation ειδικά σχεδιασμένα για AI agents.

## Γιατί οι AI agents είναι διαφορετική ιστορία

Η τεκμηρίωση της Microsoft είναι αρκετά ξεκάθαρη ως προς το πού διαφέρει ο κίνδυνος: δεν είναι μόνο ευπάθειες κώδικα, είναι το ίδιο το μοντέλο συμπεριφοράς του agent. Οι πιο συχνοί κίνδυνοι που περιγράφονται είναι εξαρτήσεις μοντέλων που έχουν παραβιαστεί (και μπορούν να μετατρέψουν κάθε agent που τις χρησιμοποιεί σε φορέα επίθεσης), agents με υπερβολικά δικαιώματα ή λάθος ρυθμισμένο tool authentication, ενέργειες κατά το runtime που ξεφεύγουν λόγω κακόβουλων εισόδων ή απροσδόκητων reasoning paths, και πιο ύπουλες τεχνικές όπως zero-click prompt injection κρυμμένο μέσα σε email ή περιεχόμενο που ανακτά ο ίδιος ο agent.

Αντιμετωπίζοντας αυτά τα σενάρια, το Defender δεν προσπαθεί απλώς να «σκανάρει» τον agent μία φορά· καλύπτει ολόκληρο τον κύκλο ζωής του, από το build-time μέχρι το runtime.

![Κύκλος ζωής κινδύνων AI στο Microsoft Defender](https://learn.microsoft.com/en-us/defender-xdr/security-for-ai/media/defender-security-for-ai/defender-secure-ai-lifecycle.png)

## Τι προσφέρει συγκεκριμένα η ενσωμάτωση με το Agent 365

Το Microsoft Agent 365 λειτουργεί σαν ένα enterprise control plane για τη διαχείριση και τη διακυβέρνηση όλων των AI agents ενός οργανισμού. Μόλις ενεργοποιήσεις το license του, το Defender «κουμπώνει» πάνω του και προσφέρει ασφάλεια σε δύο επίπεδα.

Για **όλους τους agents** που είναι onboarded στο Agent 365 (συμπεριλαμβανομένων και τοπικών AI agents σε υποστηριζόμενα endpoints), το Defender παρέχει έναν βασικό πυρήνα δυνατοτήτων:

- **Discovery**: βλέπεις όλους τους agents μέσω Advanced Hunting (KQL) ή από τη σελίδα AI Assets στο Defender portal, χωρίς να χρειάζεται να ψάχνεις χειροκίνητα ποιος έχτισε τι.
- **Security posture management**: έτοιμα prebuilt queries στο Advanced Hunting εντοπίζουν λανθασμένες ρυθμίσεις, επικίνδυνες παραμέτρους και υπερβολικά δικαιώματα.
- **Threat detection & blocking**: near-real-time detections βασισμένα σε δεδομένα παρατηρησιμότητας του Agent 365, και real-time protection που επιθεωρεί ολόκληρο τον «agentic loop»: τα prompts του χρήστη, τις κλήσεις εργαλείων, και τις απαντήσεις τους, μπλοκάροντας ύποπτη δραστηριότητα πριν καν εκτελεστεί.
- **Investigation & hunting**: το Defender συσχετίζει σήματα από όλα τα προϊόντα του σε incidents, δείχνοντας τις σχέσεις ανάμεσα σε entities και το «blast radius» μιας πιθανής επίθεσης μέσω incident graph.

Για agents χτισμένους με **Microsoft Copilot Studio** ή **Microsoft Foundry**, οι δυνατότητες αυτές επεκτείνονται περαιτέρω, ειδικά στο real-time protection και στα near-real-time alerts, ανάλογα με την πλατφόρμα.

## Πώς ενεργοποιείται στην πράξη

Το πρώτο πράγμα που αξίζει να ξέρεις είναι ότι, μόλις κάνεις onboard στο Agent 365, η βασική ασφάλεια (discovery, posture assessment, threat detection) ενεργοποιείται αυτόματα, δεν χρειάζεται κάποια επιπλέον ενέργεια. Η ρύθμιση γίνεται από **Settings > Security for AI > Get started** στο Defender portal, όπου ένα checklist σου δείχνει την κατάσταση κάθε data source.

![Setup checklist για Security for AI στο Microsoft Defender portal](https://learn.microsoft.com/en-us/defender-xdr/security-for-ai/media/get-started-defender-security-for-ai/security-for-ai-setup-checklist.png)

Για πλήρη ορατότητα, χρειάζεται να συνδέσεις και τον **Microsoft 365 connector**, επιλέγοντας τουλάχιστον τα Microsoft Entra ID Management events και τα Microsoft 365 activities, αυτά τροφοδοτούν το investigation και το advanced hunting με πραγματικό context γύρω από τη δραστηριότητα των agents.

![Επιλογή components του Microsoft 365 connector](https://learn.microsoft.com/en-us/defender-xdr/security-for-ai/media/get-started-defender-security-for-ai/microsoft-365-connector-components.png)

Αν δουλεύεις με Copilot Studio agents, υπάρχει ξεχωριστό βήμα για να ενεργοποιήσεις real-time protection: ενεργοποιείς τον σχετικό toggle, μοιράζεσαι ένα URL με τον Power Platform administrator σου, και μετά τη σύνδεση το Defender αρχίζει να επιθεωρεί σε πραγματικό χρόνο τις κλήσεις εργαλείων των agents, εντοπίζοντας ύποπτη συμπεριφορά ή cross-prompt injection attacks και μπλοκάροντας κακόβουλες ενέργειες πριν ολοκληρωθούν.

![Real-time protection για Copilot Studio agents](https://learn.microsoft.com/en-us/defender-xdr/security-for-ai/media/get-started-defender-security-for-ai/copilot-studio-real-time-protection.png)

Μια λεπτομέρεια που αξίζει να προσέξεις: αν δεν έχεις συνδέσει τον Microsoft 365 connector, το real-time protection για Copilot Studio agents συνεχίζει κανονικά να μπλοκάρει ύποπτη δραστηριότητα, απλώς τα σχετικά alerts και incidents δεν θα εμφανιστούν στο Defender portal. Δηλαδή η προστασία «τρέχει», αλλά χάνεις την ορατότητα αν δεν έχεις κάνει το πλήρες setup.

## Και η υποδομή γύρω από τους agents

Πέρα από τους ίδιους τους agents, το Defender καλύπτει και την υποδομή που τους στηρίζει: μοντέλα, υπηρεσίες, dependencies. Εδώ μιλάμε για discovery όλης της AI υποδομής, εντοπισμό ευπαθειών και λανθασμένων ρυθμίσεων σε artifacts (μοντέλα, dependencies, repositories, container images), συνεχή αξιολόγηση μοντέλων για malware, unsafe operators, serialization vulnerabilities και εκτεθειμένα secrets, καθώς και ανίχνευση απειλών σε generative AI εφαρμογές χτισμένες με Microsoft Foundry.

## Γιατί αξίζει προσοχή, ειδικά αν κάνεις GRC

Από τη σκοπιά ενός CISO, αυτό που με ενδιαφέρει περισσότερο εδώ δεν είναι μόνο η τεχνολογία, είναι η **ορατότητα**. Δεν μπορείς να αξιολογήσεις κίνδυνο σε κάτι που δεν ξέρεις ότι υπάρχει, και οι AI agents έχουν την τάση να πολλαπλασιάζονται γρήγορα, συχνά έξω από τις παραδοσιακές διαδικασίες change management. Το να έχεις ένα ενιαίο inventory agents, με security posture και threat detection ενσωματωμένα στο ίδιο XDR περιβάλλον όπου ήδη παρακολουθείς endpoints, identities και cloud apps, σημαίνει ένα λιγότερο τυφλό σημείο στο risk register σου, και ένα ακόμα κομμάτι τεκμηρίωσης έτοιμο όταν χρειαστεί να αποδείξεις σε auditors ότι η υιοθέτηση AI στον οργανισμό σου γίνεται με ελεγχόμενο τρόπο.

Αν έχεις ήδη Microsoft Agent 365 license, αξίζει να ρίξεις μια ματιά στο **Settings > Security for AI**, πιθανότατα η βασική προστασία τρέχει ήδη, χωρίς να το έχεις προσέξει.

---

**Πηγές:** Το άρθρο βασίζεται στην επίσημη τεκμηρίωση της Microsoft, [Protect AI assets from emerging threats and vulnerabilities using Microsoft Defender](https://learn.microsoft.com/en-us/defender-xdr/security-for-ai/defender-security-for-ai#protect-ai-agents-using-microsoft-defender) και [Enable security for AI agents using Microsoft Defender](https://learn.microsoft.com/en-us/defender-xdr/security-for-ai/get-started-defender-security-for-ai), καθώς και στην καταχώρηση Ιουλίου 2026 του [What's new in Microsoft Defender XDR](https://learn.microsoft.com/en-us/defender-xdr/whats-new), όπου το feature καταγράφεται ως Generally Available.
