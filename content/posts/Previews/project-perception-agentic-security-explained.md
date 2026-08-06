---
title: "Project Perception: Το Agentic Security System της Microsoft με Red, Blue & Green AI Agents. Τι είναι και τι σημαίνει για το SOC σου."
date: 2026-08-06T09:00:00+03:00
lastmod: 2026-08-06T10:00:00+03:00
draft: false
keywords:
  - project perception
  - microsoft agentic security
  - red blue green ai agents
  - mai-cyber-1-flash
  - agentic security τι είναι
  - project perception vs security copilot
  - security compute units scu
  - microsoft defender agentic defense
  - project perception public preview
  - cybergym benchmark mai-cyber-1-flash
  - autonomous security agents human in the loop
  - τι είναι το project perception
tags:
  - Project Perception
  - Microsoft Defender
  - Agentic AI
  - MAI-Cyber-1-Flash
  - Microsoft Security Copilot
  - AI Security
  - SOC
  - Vulnerability Management
  - Microsoft Defender XDR
  - Responsible AI
  - Microsoft 365 Security
  - Cyber GRC
author: "Dimosthenis Atteia"
description: "Η Microsoft ανακοίνωσε το Project Perception, ένα agentic security system με red, blue και green AI agents που βρίσκουν, αξιολογούν και διορθώνουν κινδύνους συνεχώς, με τον άνθρωπο στον έλεγχο. Εξηγώ με απλά λόγια τι είναι, πώς δουλεύει ο βρόχος των agents, το μοντέλο MAI-Cyber-1-Flash, τη διαφορά από το Security Copilot, το κόστος σε SCUs και τι πρέπει να κάνει το SOC σου για να προετοιμαστεί."
summary: "Το Project Perception μπαίνει σε public preview (3 Αυγούστου 2026) μέσα στο Microsoft Defender. Δες πώς συνεργάζονται red/blue/green agents σε συνεχή βρόχο, τι είναι το «Cyber Stack» και το μοντέλο MAI-Cyber-1-Flash, γιατί δεν είναι το ίδιο με το Security Copilot, πώς χρεώνεται σε Security Compute Units, και μια ειλικρινή, GRC-ματιά για το τι σημαίνει αυτόνομη άμυνα όταν πρέπει να λογοδοτείς."
categories: ["Microsoft Defender", "AI Security", "Microsoft 365 Security"]
series: ["AI-Powered Security"]
releases:
  - "preview"
ShowToc: true
TocOpen: false
weight: -5
cover:
  image: "/images/ProjectPerception/project-perception-cover.png"
  alt: "Project Perception: το agentic security system της Microsoft με red, blue και green AI agents"
  caption: "Microsoft Project Perception, an Agentic Security System (Preview)"
---

## Η φυσική της κυβερνοασφάλειας αλλάζει και το ξέρουμε

Ας το πούμε ωμά. Οι επιτιθέμενοι χρησιμοποιούν ήδη AI για να γράφουν exploits πιο γρήγορα, να τρέχουν καμπάνιες σε μεγαλύτερη κλίμακα και να δουλεύουν 24/7 χωρίς να κουράζονται. Στην άλλη πλευρά, το SOC δίνει μάχη με τα χθεσινά εργαλεία και με ανθρώπους που ήδη πνίγονται στα alerts. Αυτή η ανισορροπία (δηλαδή φθηνότερη επίθεση, ακριβότερη και πιο αργή άμυνα) είναι το πραγματικό πρόβλημα της εποχής.

Η απάντηση της Microsoft λέγεται **Project Perception**: ένα σύστημα που, αντί να σου πετάει κι άλλα alerts, υπόσχεται να **αντιλαμβάνεται, να σκέφτεται και να δρα** στην ίδια ταχύτητα με τις απειλές. Ανακοινώθηκε στις 27 Ιουλίου 2026 και μπαίνει σε **public preview στις 3 Αυγούστου 2026**, μέσα στο Microsoft Defender. Επειδή Ελληνικό υλικό που να το εξηγεί καθαρά δεν θα βρεις εύκολα, ας το δούμε μαζί.

[![Project Perception: το agentic security system της Microsoft με red, blue και green AI agents](/images/ProjectPerception/project-perception-cover.png)](/images/ProjectPerception/project-perception-cover.png)
> 📷 **Εικόνα 1: Τρεις ομάδες agents, ένας συνεχής βρόχος, ο άνθρωπος στον τελικό έλεγχο. Αυτή είναι η ιδέα σε μία εικόνα.**

## Τι είναι το Project Perception, σε μία ανάσα

Είναι ένα **agentic system**: ένα εργατικό δυναμικό από εξειδικευμένους AI agents που «σκέφτονται» πάνω στα δεδομένα ασφάλειας, τα εργαλεία και τα workflows σου, για να αποκαλύπτουν κενά, να ερευνούν απειλές και να τα διορθώνουν **συνεχώς**. Το κλειδί της φιλοσοφίας: **εσύ ορίζεις τη στρατηγική, οι agents σηκώνουν το βάρος** αλλά κάθε κρίσιμη ενέργεια περνά από **ανθρώπινη έγκριση**.

Η λέξη «agentic» είναι που κάνει τη διαφορά. Δεν μιλάμε για ένα chatbot που σου απαντά μιλάμε για agents που **παίρνουν ενέργειες** στο περιβάλλον σου. Και δεν δουλεύουν μεμονωμένα: μοιράζονται πληροφορία μεταξύ τους μέσα από orchestrated workflows, ώστε ένα εύρημα να γίνεται διόρθωση **χωρίς hand-off σε κάθε βήμα**.

## Οι τρεις agents: red, blue & green

Εδώ είναι η καρδιά του συστήματος. Η Microsoft οργάνωσε τη δουλειά σε τρεις τύπους agents που καλύπτουν όλο τον κύκλο ζωής μιας επίθεσης και **παραδίδουν σκυτάλη ο ένας στον άλλο αυτόματα**.

[![Οι τρεις agents του Project Perception: red που βρίσκει, blue που αξιολογεί, green που διορθώνει](/images/ProjectPerception/project-perception-red-blue-green-agents.png)](/images/ProjectPerception/project-perception-red-blue-green-agents.png)
> 📷 **Εικόνα 2: Red βρίσκει, blue αξιολογεί, green διορθώνει, και ο κύκλος δεν σταματά ποτέ.**

Ο **red agent** σκέφτεται σαν επιτιθέμενος. Ψάχνει τα μονοπάτια που θα ακολουθούσε ένας πραγματικός hacker (paths to compromise), κάνει reconnaissance και vulnerability scanning, δηλαδή ουσιαστικά τρέχει «επίθεση» στα δικά σου συστήματα πριν το κάνει αληθινά κάποιος άλλος.

Ο **blue agent** ερευνά σαν ο καλύτερος responder που θα ήθελες στην ομάδα σου. Παίρνει αυτά που ανέδειξε ο red, τα βάζει σε context και αποφασίζει **ποιο ρίσκο έχει πραγματικά σημασία**. Αντί να προσθέτει θόρυβο, τον κόβει, και έτσι μπορεί να χτίσει και νέα detections για να πιάνει την ίδια συμπεριφορά στο μέλλον.

Ο **green agent** είναι αυτός που **κλείνει τον βρόχο**. Εφαρμόζει τις διορθωτικές ενέργειες, γράφει και αναπτύσσει fixes, σκληραίνει τις άμυνες. Εδώ το «finding becomes a fix» παύει να είναι σύνθημα και γίνεται ροή.

Πίσω από αυτά, ένας **orchestrator agent** δρομολογεί τη δουλειά και ένα **message bus** περνά το context από τον έναν agent στον άλλο. Η ταυτότητα και η διακυβέρνηση των agents διαχειρίζονται μέσα από το **Agent 365**, κρατήστε αυτό το σημείο, θα επανέλθουμε στη GRC διάσταση.

## Το «Cyber Stack»: τα δομικά στοιχεία

Η Microsoft περιγράφει το Project Perception ως ένα νέο **«Cyber Stack»** με έξι δομικά στοιχεία που, μαζί, δίνουν αυτόνομη άμυνα χωρίς να χάνεις τον έλεγχο.

[![Τα έξι δομικά στοιχεία του Project Perception: signals, context, models, agents, harness, actuators](/images/ProjectPerception/project-perception-cyber-stack.png)](/images/ProjectPerception/project-perception-cyber-stack.png)
> 📷 **Εικόνα 3: Από τα signals στη δράση. Κάθε επίπεδο τροφοδοτεί το επόμενο.**

Στη βάση βρίσκονται τα **signals & sensors**, που δίνουν ορατότητα σε endpoints, identities, clouds και apps ώστε καμία απειλή να μην περνά απαρατήρητη. Πάνω τους κάθεται το **context**, threat intelligence, σήματα και γνώση του ίδιου του οργανισμού σε πραγματικό χρόνο, ώστε η δουλειά να ξεκινά από insight, όχι από συλλογή δεδομένων. Ακολουθούν τα **models** (θα τα δούμε αμέσως), οι **agents** (red/blue/green), το **harness** που τα ενορχηστρώνει αξιόπιστα, και στην κορυφή οι **actuators**, ο μηχανισμός που μετατρέπει μια απόφαση σε **πραγματική ενέργεια**, όχι απλή σύσταση.

## Το μοντέλο από πίσω: MAI-Cyber-1-Flash

Αξίζει ξεχωριστή στάση εδώ, γιατί είναι το πρώτο **in-house μοντέλο κυβερνοασφάλειας** της Microsoft. Το **MAI-Cyber-1-Flash** είναι ένα σχετικά συμπαγές μοντέλο (περίπου 137 δισ. παραμέτρων) φτιαγμένο ειδικά για **software vulnerability analysis**, που είναι και το πρώτο use case του Project Perception.

Ο τρόπος που δουλεύει δείχνει και τη λογική κόστους: μέσα στο **MDASH** (το multi-agent σύστημα της Microsoft για εύρεση ευπαθειών), το MAI-Cyber-1-Flash σηκώνει το μεγαλύτερο μέρος του φόρτου (που είναι περίπου το 90%) και **δρομολογεί μόνο το πιο δύσκολο ~10% στο GPT-5.4** της OpenAI. Δηλαδή δεν ρίχνει ένα ακριβό frontier model σε κάθε task χρησιμοποιεί το σωστό μοντέλο για την κάθε δουλειά, με κριτήρια ποιότητας, αξιοπιστίας, latency και κόστους.

Σύμφωνα με τη Microsoft, αυτός ο συνδυασμός σκόραρε **~96% στο CyberGym benchmark** (12 μονάδες πάνω από το μοντέλο Mythos) με **περίπου 50% χαμηλότερο κόστος** σε σχέση με το προηγούμενο setup του MDASH. Κράτα το ως ισχυρισμό της Microsoft, γιατί είναι δικό της benchmark, αλλά είναι ένα συγκεκριμένο, μετρήσιμο νούμερο, όχι απλό marketing.

## Perception ή Security Copilot; (Η σύγχυση που θα σου κάνουν)

Είναι η πρώτη ερώτηση που θα σου κάνουν οι συνάδελφοι, οπότε ας την ξεκαθαρίσουμε.

[![Διαφορά ανάμεσα στο Project Perception που δρα και στο Security Copilot που βοηθά](/images/ProjectPerception/project-perception-vs-copilot.png)](/images/ProjectPerception/project-perception-vs-copilot.png)
> 📷 **Εικόνα 4: Το ένα δρα, το άλλο βοηθά. Και τα δύο μαζί.**

Με τα πιο απλά λόγια: το **Project Perception είναι AI που ΔΡΑ**, είναι ένα agentic system που εκτελεί ενέργειες. Το **Security Copilot είναι AI που ΒΟΗΘΑ** όπως ένα generative AI chat interface όπου ρωτάς και παίρνεις απαντήσεις, συνόψεις, εξηγήσεις. Δεν είναι ανταγωνιστικά, ούτε πρέπει να διαλέξεις. **Δουλεύουν μαζί**: το Copilot ενισχύει τον αναλυτή, το Perception αναλαμβάνει την εκτέλεση.

## Πόσο κοστίζει: το μοντέλο των SCUs

Η χρέωση είναι **consumption-based, pay-as-you-go**, και μετριέται σε **Security Compute Units (SCUs)**. Καθώς οι agents τρέχουν σενάρια, καταναλώνουν SCUs, και επειδή διαφορετικοί agents και πιο «βαριά» tasks καταναλώνουν με διαφορετικό ρυθμό, το κόστος σου αντικατοπτρίζει την **πραγματική δουλειά** που έγινε.

Πρακτικά, αυτό σημαίνει ότι το budgeting εδώ δεν είναι ένα σταθερό μηνιαίο νούμερο είναι κάτι που πρέπει να **παρακολουθείς και να βάζεις όρια** από την αρχή, ειδικά σε ένα σύστημα που από τη φύση του τρέχει συνεχώς.

## Η ειλικρινής ματιά ενός practitioner

Εδώ βάζω το καπέλο του CISO, γιατί η δουλειά μας δεν είναι να χειροκροτούμε ανακοινώσεις αλλά να τις ζυγίζουμε.

Πρώτον, είναι **preview**, και το πρώτο use case είναι **στενό**: software vulnerability management. Είναι εντυπωσιακό, αλλά δεν είναι ακόμα «αυτόνομο SOC για τα πάντα». Μη χτίσεις προσδοκίες που η ίδια η Microsoft δεν έχει ακόμα υποσχεθεί.

Δεύτερον, το **human-in-the-loop παραμένει**, και σωστά. Οι κρίσιμες ενέργειες περνούν από ανθρώπινη έγκριση κάτι που σημαίνει ότι το «αυτόνομο» έχει, ευτυχώς, φρένο. Αυτό είναι feature, όχι περιορισμός.

Τρίτον, ας το πούμε: η Microsoft είναι **σχετικά αργοπορημένη** σε αυτόν τον χώρο. Anthropic, OpenAI, Google, Cisco και άλλοι είχαν ήδη κυκλοφορήσει security AI. Το διαφοροποιό στοιχείο του Perception δεν είναι ότι «βρίσκει» (αυτό λίγο-πολύ το κάνουν όλοι) αλλά ότι **κλείνει τον κύκλο** από την ανακάλυψη στη διόρθωση με συντονισμένους agents. Εκεί είναι το πραγματικό στοίχημα.

## Τι να κάνεις τώρα? και η GRC διάσταση

Καμία βιαστική κίνηση δεν χρειάζεται, αλλά αν θέλεις να είσαι μπροστά, να τι θα έκανα:

Ξεκίνα **παρακολουθώντας το preview μέσα στο Microsoft Defender** και δες το πρώτο use case (vulnerability management) σε ελεγχόμενο scope, όχι στην παραγωγή σου από την πρώτη μέρα. Παράλληλα, **όρισε από νωρίς την πολιτική ανθρώπινης έγκρισης**: ποιες ενέργειες θεωρούνται «κρίσιμες», ποιος τις εγκρίνει, με ποιο SLA. Και **βάλε cost controls** για τα SCUs πριν αφήσεις agents να τρέχουν συνεχώς.

Εδώ έρχεται το κομμάτι που, ως GRC άνθρωπος, με ενδιαφέρει περισσότερο. Η αυτόνομη δράση είναι υπέροχη μέχρι τη στιγμή που πρέπει να **λογοδοτήσεις** για μια ενέργεια που πήρε ένας agent. Σε ένα πλαίσιο όπως το **NIS2** ή ένα **ISMS κατά ISO 27001**, το ερώτημα του auditor θα είναι απλό και ανελέητο: «ποιος ή τι πήρε αυτή την απόφαση, με ποια εξουσιοδότηση, και μπορείς να μου το δείξεις;». Η καλή είδηση είναι ότι η Microsoft φαίνεται να το έχει σκεφτεί και μιλά για διακυβέρνηση μέσα από το **Agent 365** και για αποφάσεις που είναι **scoped, traceable και replayable**. Η δική σου δουλειά είναι να το μετατρέψεις σε **γραπτή πολιτική**: ποια είναι τα guardrails, πώς τεκμηριώνεται κάθε αυτόνομη ενέργεια, πώς γίνεται το review. Το «ο agent το έκανε μόνος του» δεν είναι απάντηση που περνά σε έναν έλεγχο.

[![Τα βασικά στοιχεία του Project Perception με μια ματιά: preview, μοντέλο, benchmark, κόστος και ανθρώπινος έλεγχος](/images/ProjectPerception/project-perception-key-facts.png)](/images/ProjectPerception/project-perception-key-facts.png)
> 📷 **Εικόνα 5: Κράτησε αυτή την εικόνα γιατί τα έχει όλα όσα θα σε ρωτήσουν σε ένα meeting.**

## Το takeaway

Το Project Perception δεν είναι «ακόμα ένα AI feature». Είναι μια δήλωση κατεύθυνσης: η μετάβαση από AI που **βοηθά** σε AI που **δρα**. Αν δουλέψει όπως υπόσχεται, αλλάζει το τι σημαίνει «SOC», από μια ομάδα που κυνηγά alerts, σε μια ομάδα που ορίζει στρατηγική και επιβλέπει agents.

Μέχρι τότε, η στάση που προτείνω είναι η υγιής περιέργεια: δοκίμασέ το στο preview, μάθε τη λογική του, χτίσε από τώρα τη διακυβέρνηση γύρω του. Γιατί όταν φτάσει η ώρα να το εμπιστευτείς με πραγματικές ενέργειες, θα θέλεις να έχεις ήδη απαντήσει στο δύσκολο ερώτημα: **πόσο αυτόνομη άμυνα αντέχεις, και πώς την αποδεικνύεις;**

## Πηγές

- [Project Perception — Microsoft Security (επίσημη σελίδα)](https://www.microsoft.com/en-us/security/business/ai-powered-cybersecurity/project-perception-agentic-system)
- [Announcing Project Perception — Microsoft Security Blog](https://www.microsoft.com/en-us/security/blog/)
- [Microsoft unveils new cyber model and agentic security tools — Axios](https://www.axios.com/2026/07/27/microsoft-unveils-new-cyber-model-agentic-security-tools-to-fight-hackers)
- [Microsoft escalates the AI cybersecurity race with Project Perception — GeekWire](https://www.geekwire.com/2026/microsoft-escalates-the-ai-cybersecurity-race-with-project-perception-and-a-new-in-house-model/)
- [Microsoft Project Perception Enters Public Preview — TechRepublic](https://www.techrepublic.com/article/news-microsoft-project-perception-preview/)
- [Microsoft Unveils Project Perception — Redmond Magazine](https://redmondmag.com/articles/2026/07/27/microsoft-unveils-project-perception.aspx)