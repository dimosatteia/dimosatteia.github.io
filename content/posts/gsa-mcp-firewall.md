---
title: "Global Secure Access MCP Firewall: Πώς βάζεις Zero Trust σε κάτι που δεν μπορούσες καν να δεις μέχρι χθες"
date: 2026-08-11T09:00:00+03:00
lastmod: 2026-08-11T09:30:00+03:00
draft: false
keywords:
  - Global Secure Access MCP firewall
  - Model Context Protocol security
  - MCP traffic inspection
  - Entra Internet Access
  - Conditional Access session controls
  - TLS inspection MCP
  - Generative AI Insights Entra
  - AI agents Zero Trust
  - NIS2 τεκμηρίωση AI agents
  - ISO 27001 shadow AI
tags:
  - Microsoft Entra ID
  - Global Secure Access
  - Conditional Access
  - AI Security
  - MCP
  - NIS2
  - ISO 27001
  - GRC
  - Cybersecurity
  - Zero Trust
author: "Dimosthenis Atteia"
description: "Ανάλυση του νέου Global Secure Access MCP firewall της Microsoft, του πρώτου network-based ελέγχου πάνω στο Model Context Protocol, και του γιατί κάθε CISO πρέπει να το βάλει στο radar του πριν οι AI agents στον οργανισμό αρχίσουν να μιλάνε με MCP servers χωρίς κανέναν να το ξέρει."
summary: "Οι AI agents στον οργανισμό σου ήδη μιλάνε με MCP servers, ό,τι κι αν λέει το Shadow IT policy σου. Το Global Secure Access MCP firewall είναι το πρώτο εργαλείο που σου δίνει πραγματική ορατότητα και έλεγχο πάνω σε αυτή την κίνηση, σε επίπεδο tool, resource και prompt template, όχι απλώς σε επίπεδο URL."
categories: ["Microsoft 365 Security", "AI Security"]
series: ["Preview Features"]
releases:
  - "preview"   # ← αυτό το στέλνει στο /releases/preview/
ShowToc: true
TocOpen: false
weight: -5
cover:
  image: "images/gsa-mcp-firewall/gsa-mcp-firewall-cover.png"
  alt: "Global Secure Access MCP policy configuration στο Microsoft Entra admin center"
  caption: "Global Secure Access → Secure → MCP policies (Preview)"
  relative: true
ShowReadingTime: true
ShowWordCount: true
---

Έχω γράψει αρκετές φορές εδώ μέσα για το πόσο γρήγορα η ταυτότητα συσκευής και χρήστη γίνεται το πραγματικό σημείο ελέγχου στο Zero Trust, ενώ όλα τα υπόλοιπα, compliance status, endpoint protection, ακόμα και MFA, μπορούν να δείχνουν άψογα και ταυτόχρονα να κρύβουν ένα κενό. Αυτή τη φορά το θέμα δεν είναι μια συσκευή που μεταναστεύει, είναι κάτι πιο ύπουλο: AI agents που μιλάνε με εξωτερικά εργαλεία χωρίς κανένα από τα κλασικά μας controls να τους «βλέπει» πραγματικά.

Η αφορμή είναι η πρόσφατη τεκμηρίωση της Microsoft για το **Global Secure Access MCP firewall**, μια δυνατότητα που βρίσκεται ακόμα σε preview αλλά, κατά τη γνώμη μου, λύνει ένα πρόβλημα που οι περισσότεροι οργανισμοί δεν έχουν καν συνειδητοποιήσει ότι έχουν. Το διάβασα, το δοκίμασα σε ένα tenant δοκιμών, και θέλω να το δούμε όχι μόνο ως τεχνικό feature, αλλά ως κάτι που πρέπει να μπει σε κάθε risk register που αναφέρεται σε χρήση AI εργαλείων στον οργανισμό.

## Το πρόβλημα: το MCP είναι ήδη παντού, και είναι αόρατο

Το [Model Context Protocol (MCP)](https://modelcontextprotocol.io/) έχει γίνει, μέσα σε πολύ λίγους μήνες, το de facto πρωτόκολλο επικοινωνίας ανάμεσα σε large language models και εξωτερικά εργαλεία, βάσεις δεδομένων, APIs, file systems. Κάθε φορά που ένας agent «καλεί» ένα tool, διαβάζει ένα resource ή τραβάει ένα prompt template από έναν MCP server, αυτό γίνεται μέσα από μια σύνδεση που, μέχρι σήμερα, κανένα δικό μας network ή identity control δεν καταλάβαινε πραγματικά τι περιέχει.

Το πρόβλημα δεν είναι θεωρητικό. Ένας MCP server μπορεί να εκθέτει tools με πρόσβαση σε αρχεία, ερωτήματα βάσεων δεδομένων, εκτέλεση κώδικα. Αν ένας χρήστης ή ένας agent συνδεθεί σε λάθος ή κακόβουλο MCP server, ή αν ένα νόμιμο εργαλείο χρησιμοποιηθεί με τρόπο που δεν είχε προβλεφθεί, το αποτέλεσμα μπορεί να είναι διαρροή δεδομένων, ανεπιθύμητες ενέργειες ή προσποίηση αξιόπιστης υπηρεσίας. Και το χειρότερο: το firewall, το proxy, ακόμα και το SSE μας, μέχρι τώρα έβλεπαν απλώς «κρυπτογραφημένη κίνηση HTTPS προς κάποιο domain», όχι ότι μέσα σε αυτή την κίνηση ένας agent μόλις κάλεσε ένα tool με όνομα `delete_records` ή `export_customer_data`.

## Τι κάνει στην πράξη το MCP firewall

Το Global Secure Access MCP firewall είναι, με απλά λόγια, μια επέκταση των δυνατοτήτων Security Service Edge (SSE) της Global Secure Access, πάνω στο ίδιο το επίπεδο του πρωτοκόλλου MCP. Δεν μιλάμε για ένα ακόμα generic web filtering rule πάνω σε ένα domain, μιλάμε για inspection πάνω σε JSON-RPC 2.0 μηνύματα που ταξιδεύουν μέσω streamable HTTP και Server-Sent Events, δηλαδή την πραγματική «γλώσσα» που μιλάει το MCP.

Αυτό σημαίνει ότι το Entra μπορεί πλέον να δει, να ελέγξει και να επιβάλει πολιτική πάνω σε:

- Ποιοι MCP servers επιτρέπεται να προσεγγιστούν, με βάση URL patterns
- Ποια MCP primitives επιτρέπονται ανά server, δηλαδή Tools, Resources ή Prompt templates ξεχωριστά
- Ποιες εκδόσεις πρωτοκόλλου και ποιες μέθοδοι επιτρέπονται, ώστε να μπλοκάρεις π.χ. συνδέσεις πάνω σε μη κρυπτογραφημένο HTTP ή σε παλιές, ευάλωτες εκδόσεις MCP

Το βασικό σημείο που μου άρεσε περισσότερο είναι ότι όλο αυτό γίνεται χωρίς καμία αλλαγή στο ίδιο το MCP client, host ή server. Δεν χρειάζεται να πείσεις κανέναν vendor να ενσωματώσει κάτι, το control κάθεται στο network layer, με την ταυτότητα του χρήστη και της συσκευής να καθορίζουν τι επιτρέπεται.

[![MCP protocol version rule στο Global Secure Access MCP policy](/images/gsa-mcp-firewall/gsa-mcp-protocol-version-rule.png)](/images/gsa-mcp-firewall/gsa-mcp-protocol-version-rule.png)
> 📷 **Εικόνα 1: Global Secure Access → Secure → MCP policies. Κανόνας που ελέγχει την έκδοση του MCP πρωτοκόλλου ανά rule.**

## Γιατί το «βλέπω URLs» δεν αρκεί πια

Αν έχεις δουλέψει με web content filtering ξέρεις ήδη τη λογική του allow-list / deny-list σε επίπεδο domain. Το MCP firewall πάει ένα επίπεδο πιο βαθιά, γιατί ο ίδιος MCP server μπορεί να εκθέτει δεκάδες tools, άλλα αθώα, άλλα ευαίσθητα. Ένα generic «επιτρέπω αυτό το domain» δεν σου λέει τίποτα για το αν επιτρέπεις και το tool που διαγράφει records ή αυτό που απλώς διαβάζει ένα read-only resource.

Εδώ μπαίνει η έννοια του **discovery**. Μέσα από το **Generative AI Insights** της Global Secure Access, ο οργανισμός μπορεί να δει ποιοι MCP servers χρησιμοποιούνται ήδη στο περιβάλλον, ποια tools εκθέτουν, και να χτίσει πολιτική πάνω σε πραγματική, καταγεγραμμένη δραστηριότητα αντί να μαντεύει. Στην πράξη, αυτό σημαίνει ότι μπορείς να ξεκινήσεις ένα MCP policy όχι με ένα κενό φύλλο, αλλά επιλέγοντας μέσα από «suggested MCP servers from recent activity», κάτι που θα εκτιμήσει ιδιαίτερα όποιος έχει προσπαθήσει ποτέ να χτίσει allow-list πολιτική χωρίς να ξέρει τι πραγματικά τρέχει στο περιβάλλον του.

[![Discovered tools σε MCP server μέσα από Global Secure Access](/images/gsa-mcp-firewall/gsa-mcp-discovered-tools.png)](/images/gsa-mcp-firewall/gsa-mcp-discovered-tools.png)
> 📷 **Εικόνα 2: Discovery ενός MCP server, όπου τα tools που εκθέτει εμφανίζονται αυτόματα και μπορούν να επιλεγούν ένα προς ένα για scoping του κανόνα.**

## Τα πρακτικά προαπαιτούμενα, και το ένα που θα σε σταματήσει αν δεν το έχεις

Πριν καν σκεφτείς να φτιάξεις το πρώτο σου MCP policy, χρειάζεσαι τα βασικά που ισχύουν ήδη για κάθε Internet Access σενάριο: έγκυρο Entra tenant, κατάλληλες άδειες Microsoft Entra Internet Access, ρόλο Global Secure Access Administrator για το ίδιο το policy και Conditional Access Administrator για το κομμάτι της επιβολής, καθώς και τον client της Global Secure Access εγκατεστημένο σε συσκευή που είναι Entra joined ή hybrid joined.

Το σημείο που, κατά τη γνώμη μου, θα κολλήσει τους περισσότερους δεν είναι κανένα από αυτά, είναι το **TLS inspection**. Επειδή τα μηνύματα MCP ταξιδεύουν μέσα στο κρυπτογραφημένο payload της κίνησης, χωρίς ενεργό TLS inspection η Global Secure Access απλώς δεν μπορεί να διαβάσει τι περιέχεται μέσα, άρα δεν υπάρχει τρόπος να εφαρμοστεί οποιοδήποτε MCP policy. Αν στον οργανισμό σου το TLS inspection είναι ακόμα σε φάση σχεδιασμού, λόγω complexity, privacy concerns ή απλά έλλειψης ωριμότητας, τότε το MCP firewall παραμένει, στην πράξη, εκτός εμβέλειας μέχρι να λυθεί αυτό πρώτα. Είναι ένα καλό παράδειγμα του πώς μια απόφαση αρχιτεκτονικής σε ένα εντελώς διαφορετικό project μπορεί να μπλοκάρει, μήνες μετά, κάτι εντελώς άσχετο εκ πρώτης όψεως.

## Πώς στήνεται στην πράξη

Η λογική ακολουθεί το ίδιο μοτίβο με τα υπόλοιπα security profiles της Global Secure Access, κάτι που βοηθάει αν έχεις ήδη εμπειρία από web content filtering: φτιάχνεις ένα MCP policy, το συνδέεις σε ένα security profile, και μετά επιβάλλεις το profile μέσα από Conditional Access.

Σε επίπεδο policy, ορίζεις ένα default action, Allow ή Block, και μετά προσθέτεις κανόνες με προτεραιότητα, κάθε ένας με τις δικές του συνθήκες αντιστοίχισης. Η αντιστοίχιση μπορεί να γίνει πάνω σε γνωστό server URL, πάνω σε servers που έχουν ήδη ανακαλυφθεί μέσα από τα Insights, ή, αν ένας server απαιτεί authentication και δεν μπορεί να ανιχνευθεί αυτόματα, μπορείς να προσθέσεις tools, resources ή prompts χειροκίνητα, δίνοντάς τους όνομα και περιγραφή. Κάθε κανόνας καταλήγει σε Allow ή Block, ακριβώς όπως θα περίμενες.

[![Χειροκίνητη προσθήκη MCP primitive όταν ο server δεν είναι προσβάσιμος για discovery](/images/gsa-mcp-firewall/gsa-mcp-manual-primitive.png)](/images/gsa-mcp-firewall/gsa-mcp-manual-primitive.png)
> 📷 **Εικόνα 3: Χειροκίνητη καταχώρηση tool, resource ή prompt όταν ο MCP server δεν είναι διαθέσιμος για αυτόματο discovery.**

Το κομμάτι που θέλει προσοχή είναι το τελευταίο βήμα: το ίδιο το MCP policy δεν κάνει τίποτα αν δεν «κουμπώσει» πάνω σε Conditional Access. Χρειάζεται μια πολιτική με target resources «All internet resources with Global Secure Access» και, στο session control, επιλογή του security profile που μόλις έφτιαξες. Αν έχεις ξαναδουλέψει με web content filtering στη Global Secure Access, το μοτίβο θα σου φανεί οικείο, το MCP firewall απλά προσθέτει ένα ακόμα, πολύ πιο εξειδικευμένο επίπεδο ελέγχου πάνω στο ίδιο θεμέλιο.

## Τι δεν καλύπτει ακόμα, και γιατί έχει σημασία να το ξέρεις

Καμία preview δυνατότητα δεν είναι πλήρης, και εδώ η τεκμηρίωση της Microsoft είναι αρκετά ξεκάθαρη πάνω στους περιορισμούς, κάτι που εκτιμώ γιατί μου γλιτώνει ώρες δοκιμών. Το MCP firewall επιθεωρεί κίνηση μόνο πάνω σε streamable HTTP και Server-Sent Events, όχι πάνω σε stdio ή άλλες non-HTTP μεταφορές, κάτι που σημαίνει ότι MCP servers που τρέχουν τοπικά σε μια συσκευή, δηλαδή local, όχι remote, παραμένουν εκτός ορατότητας εντελώς. JSON-RPC batches δεν επιθεωρούνται. Και, κάτι πολύ πρακτικό, όταν έχεις καταχωρήσει συγκεκριμένα tools, resources ή prompts μέσα σε ένα rule, αυτή η λεπτομέρεια δεν εμφανίζεται ξανά στο UI όταν ανοίγεις τον κανόνα αργότερα, πρέπει να καταφύγεις στο Microsoft Graph API για να την επαληθεύσεις.

Για μένα, το πρακτικό συμπέρασμα είναι απλό: αν στον οργανισμό σου υπάρχουν local MCP servers, ας πούμε agents που τρέχουν πάνω σε developer workstations και μιλάνε με tools εγκατεστημένα τοπικά, το MCP firewall δεν σε καλύπτει εκεί. Αυτό το gap πρέπει να καταγραφεί ξεχωριστά, όχι να υποτεθεί ότι «καλύπτεται» επειδή ενεργοποίησες μια preview δυνατότητα με πολλά υποσχόμενο όνομα.

## Η οπτική NIS2 και ISO 27001

Εδώ είναι το κομμάτι που, ως CISO, με ενδιαφέρει περισσότερο από το ίδιο το feature.

**Χαρτογράφηση κινδύνου AI χρήσης, όχι μόνο AI πολιτικής.** Πολλοί οργανισμοί έχουν ήδη μια policy χρήσης generative AI, «απαγορεύεται η χρήση μη εγκεκριμένων εργαλείων», αλλά μέχρι σήμερα δεν είχαν τρόπο να επιβάλουν κάτι τέτοιο τεχνικά σε επίπεδο MCP, ούτε καν να το παρακολουθήσουν. Το Generative AI Insights αλλάζει αυτό, δίνοντας για πρώτη φορά ορατότητα σε ποιους MCP servers μιλάνε πραγματικά οι agents στο περιβάλλον σου. Σε ένα πλαίσιο NIS2 όπου πρέπει να τεκμηριώνεις μέτρα διαχείρισης κινδύνου τρίτων και ασφάλειας αλυσίδας εφοδιασμού, ένας άγνωστος MCP server που ένας agent καλεί καθημερινά είναι, ουσιαστικά, ένας τρίτος πάροχος που δεν έχεις ποτέ αξιολογήσει.

**Least privilege σε επίπεδο tool, όχι μόνο σε επίπεδο εφαρμογής.** Η δυνατότητα να επιτρέπεις έναν MCP server αλλά να μπλοκάρεις συγκεκριμένα tools πάνω του είναι ακριβώς η λογική του A.8 στο ISO 27001 για access control πάνω σε assets, μεταφερμένη σε ένα εντελώς νέο layer. Το να λες «επιτρέπω αυτόν τον server» χωρίς να ξέρεις ποια tools εκθέτει είναι το ισοδύναμο του να δίνεις σε έναν χρήστη πρόσβαση σε μια εφαρμογή χωρίς να κοιτάξεις ποια δικαιώματα κουβαλάει μέσα της.

**Τεκμηρίωση κενού για preview features.** Το ίδιο το γεγονός ότι το feature είναι preview, με σαφείς περιορισμούς όπως η μη κάλυψη local MCP servers, πρέπει να καταγραφεί ρητά ως known gap στο risk register, με πλάνο επανεξέτασης όταν η δυνατότητα φτάσει σε γενική διαθεσιμότητα. Είναι ακριβώς το είδος λεπτομέρειας που ένας auditor θα εκτιμήσει πολύ περισσότερο από ένα γενικόλογο «έχουμε ελέγχους πάνω στη χρήση AI».

## Πώς θα το προσέγγιζα σε πρώτη φάση

Αν ξεκινάς από το μηδέν, δεν θα πήγαινα κατευθείαν σε ένα default Block policy, θα κάψει agents και workflows που ήδη λειτουργούν και δεν θα σου φανεί κανένα δεδομένο για να στηρίξεις τις εξαιρέσεις. Η πιο ρεαλιστική σειρά είναι πρώτα να ενεργοποιήσεις το TLS inspection και το Internet Access profile, μετά να αφήσεις τα Generative AI Insights να τρέξουν για μερικές εβδομάδες σε καθαρά monitoring mode, ώστε να χτίσεις πραγματική εικόνα του ποιοι MCP servers και ποια tools χρησιμοποιούνται, και μόνο μετά να περάσεις σε default Block με ρητό allow-list πάνω στους servers που έχεις ήδη επιβεβαιώσει. Το να ξεκινήσεις με discovery αντί με enforcement είναι, στην εμπειρία μου, η διαφορά ανάμεσα σε ένα policy που κρατάει και σε ένα που καταργείται μέσα σε μια εβδομάδα επειδή έσπασε κάτι κρίσιμο.

## Το συμπέρασμα

Το MCP firewall δεν είναι απλώς ένα ακόμα preview feature στη μακριά λίστα της Microsoft. Είναι η πρώτη φορά που ένα mainstream identity-centric control μπαίνει πραγματικά μέσα στο πρωτόκολλο που χρησιμοποιούν οι AI agents για να μιλήσουν με τον έξω κόσμο, αντί να το αντιμετωπίζει σαν ακόμα μια γραμμή HTTPS κίνησης. Για όσους από εμάς προσπαθούμε να βάλουμε κάποια τάξη στο πώς οι οργανισμοί υιοθετούν generative AI, χωρίς να σταματήσουμε την υιοθέτηση, είναι το πρώτο εργαλείο που δίνει πραγματική επιλογή ανάμεσα σε «απαγορεύω τα πάντα» και «δεν ξέρω τι τρέχει».

Αν τρέχεις ήδη Global Secure Access στον οργανισμό σου, η πιο χρήσιμη πρώτη κίνηση δεν είναι να φτιάξεις policy, είναι να ανοίξεις τα Generative AI Insights και να δεις τι MCP κίνηση υπάρχει ήδη εκεί, πιθανότατα περισσότερη από όση περιμένεις.

Αν έχεις ήδη δοκιμάσει το MCP firewall ή αντιμετωπίζεις παρόμοιο ζήτημα ορατότητας πάνω σε AI agents στον οργανισμό σου, χαίρομαι πάντα να το συζητήσουμε στα σχόλια ή στο LinkedIn.
