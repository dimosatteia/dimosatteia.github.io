---
title: "Microsoft 365 Security: τι άλλαξε (εβδομάδα 47/2026)"
slug: "microsoft-365-security-ti-allaxe-2026-w47"
date: 2026-11-20T08:00:00+02:00
lastmod: 2026-11-20T08:00:00+02:00
draft: true
keywords:
  - Microsoft Defender νέα
  - Defender for Identity classic alerts retirement
  - MC1552387
  - GitHub Copilot CLI device code phishing
  - Similar cases Defender portal
  - MC1556107
  - App Governance Unified RBAC
  - MC1558114
  - Defender for Endpoint preview features
  - Microsoft Ignite 2026 Defender
tags:
  - Microsoft Defender XDR
  - Microsoft Defender for Identity
  - Microsoft Defender for Endpoint
  - Microsoft Defender for Cloud Apps
  - Microsoft Sentinel
  - Εβδομαδιαία σύνοψη
author: "Dimosthenis Atteia"
description: "Εβδομάδα 47/2026: αποσύρονται δύο classic alerts του Defender for Identity στις 30/11, προστασία για το GitHub Copilot CLI και Similar cases στο Defender."
summary: "Στο τέλος Νοεμβρίου φεύγουν τα alerts Remote code execution attempt και pass-the-hash του Defender for Identity. Μαζί, οι αλλαγές του Ignite για Defender: προστασία από device code phishing στο GitHub Copilot CLI, Similar cases στα incidents και preview features ένα ένα στο Defender for Endpoint."
categories: ["Security Operations & XDR"]
series: ["Microsoft 365 Security Weekly"]
ShowToc: true
TocOpen: false
weight: -6
cover:
  image: "/images/WSUM365.webp"
  alt: "Weekly Security Update: εβδομαδιαία ενημέρωση για το Microsoft 365 Security"
  caption: "Microsoft 365 Security: εβδομαδιαία ενημέρωση"
  relative: false
  hidden: false
# Πλαίσιο «Last verified»: η ημερομηνία είναι ο έλεγχος του τεύχους (στιγμιότυπο της εβδομάδας)
verification:
  - feature: "Defender for Identity: αποσύρονται τα classic alerts Remote code execution attempt και pass-the-hash"
    status: "Retirement"
    license: "Δεν αναφέρεται"
    source: "https://learn.microsoft.com/en-us/defender-for-identity/alerts-mdi-classic"
    verified: 2026-11-19
  - feature: "Defender XDR και Defender for Cloud Apps: ανίχνευση και διακοπή του device code phishing στο GitHub Copilot CLI"
    status: "Public Preview"
    license: "Microsoft 365 E5, Defender for Office 365, GitHub Enterprise Cloud με EMU"
    source: "https://learn.microsoft.com/en-us/defender-xdr/security-for-ai/protect-ai-agents-from-trusted-identity-attacks"
    verified: 2026-11-19
  - feature: "Defender XDR: Similar cases στα incidents του unified SecOps platform"
    status: "Public Preview"
    license: "Δεν αναφέρεται"
    source: "https://learn.microsoft.com/en-us/defender-xdr/investigate-incident-cases#review-similar-cases"
    verified: 2026-11-19
  - feature: "Defender for Cloud Apps: custom roles του Unified RBAC για το App Governance"
    status: "Public Preview"
    license: "Δεν αναφέρεται"
    source: "https://mc.merill.net/message/MC1558114"
    verified: 2026-11-19
  - feature: "Defender for Endpoint: σελίδα Preview features για ενεργοποίηση ανά feature"
    status: "Public Preview"
    license: "Δεν αναφέρεται"
    source: "https://learn.microsoft.com/en-us/defender-endpoint/manage-preview-features"
    verified: 2026-11-19
---

## Με μια ματιά

Εβδομάδα του Microsoft Ignite, με μία προθεσμία που θέλει ενέργεια. Σύμφωνα με την ανακοίνωση MC1552387, στο **τέλος Νοεμβρίου 2026** ο **Defender for Identity** αποσύρει τα classic alerts **Remote code execution attempt** και **Suspected identity theft (pass-the-hash)**. Αν τα χρησιμοποιείς σε playbooks, αναφορές ή αυτοματισμούς, έχεις περίπου δέκα μέρες για να βάλεις κάτι στη θέση τους. Από το Ignite κρατάμε τρεις αλλαγές για το SOC και μία για τα δικαιώματα.

## Οι αλλαγές της εβδομάδας

### 1. Defender for Identity: αποσύρονται τα alerts Remote code execution attempt και pass-the-hash

**Φάση:** απόσυρση, με διάθεση που ξεκινά και ολοκληρώνεται στα τέλη Νοεμβρίου 2026, σύμφωνα με την ανακοίνωση · **Άδεια:** δεν αναφέρεται στην πηγή

**Τι αλλάζει.** Δύο classic alerts του Defender for Identity σταματούν να υπάρχουν. Το **Remote code execution attempt** πιάνει PSexec, Remote WMI και PowerShell connections προς domain controllers και servers AD FS ή AD CS. Το **Suspected identity theft (pass-the-hash)** πιάνει τη χρήση κλεμμένου NTLM hash για πρόσβαση σε άλλο υπολογιστή. Σύμφωνα με το Microsoft Learn, για το πρώτο συνεχίζεις με custom detection στο advanced hunting, και για το δεύτερο η παρακολούθηση συνεχίζει μέσω του Defender for Endpoint στις συσκευές που είναι onboarded. Η ανακοίνωση έχει «Act by» τις 30 Νοεμβρίου 2026.

**Τι να κάνεις.** Ψάξε αν κάποιο automation rule, playbook, alert tuning rule ή αναφορά βασίζεται στους τίτλους αυτών των δύο alerts. Φτιάξε custom detection rule για το remote code execution με το [query που δίνει η ανακοίνωση](https://github.com/microsoft/Microsoft-Defender-for-Identity/blob/main/AdvancedHunting/RemoteCodeExecution.md) στο GitHub της Microsoft και δοκίμασέ το πριν από τις 30 Νοεμβρίου. Για το pass-the-hash, έλεγξε ότι οι domain controllers και οι servers που σε ενδιαφέρουν είναι onboarded στο Defender for Endpoint, γιατί χωρίς αυτό χάνεις την κάλυψη. Για το πώς δουλεύει ο Defender for Identity συνολικά, δες την [πρακτική περιήγηση στο Defender for Identity](/posts/microsoft-defender-up-close-series/microsoft-defender-for-identity-deep-dive/).

**Πηγή:** [Microsoft Defender for Identity classic alerts](https://learn.microsoft.com/en-us/defender-for-identity/alerts-mdi-classic) · Message Center [MC1552387](https://mc.merill.net/message/MC1552387) (αρχείο mc.merill.net, δημοσιεύθηκε στις 14 Νοεμβρίου 2026 ώρα Ελλάδας)

### 2. Defender XDR: ανίχνευση και διακοπή του device code phishing στο GitHub Copilot CLI

**Φάση:** Public Preview · **Άδεια:** Microsoft 365 E5 με Defender for Office 365, connector Microsoft 365 στο Defender for Cloud Apps, και GitHub Enterprise Cloud με Enterprise Managed Users (EMU)

**Τι αλλάζει.** Ο επιτιθέμενος ξεκινά ένα sign-in του GitHub Copilot CLI με device code και στέλνει τον κωδικό στον χρήστη με email ή Teams, π.χ. ως «έλεγχο άδειας Copilot». Η σελίδα επαλήθευσης είναι γνήσια του GitHub, ο χρήστης εγκρίνει, και ο επιτιθέμενος παίρνει token με τα δικαιώματα του χρήστη. Ο Defender βγάζει δύο alerts υψηλής σοβαρότητας, για phishing μέσω email και μέσω Teams, και απενεργοποιεί αυτόματα τον λογαριασμό GitHub EMU που επηρεάστηκε. Η ανίχνευση δουλεύει μόνο για GitHub EMU, και η διακοπή μόνο όταν το EMU είναι federated με το Microsoft Entra ID. Χρειάζεται Safe Links με **Track user clicks** για email και Teams, και τον GitHub connector του Defender for Cloud Apps σε επίπεδο **Enterprise**, που είναι επίσης νέο σε preview αυτόν τον μήνα.

**Τι να κάνεις.** Αν οι developers σου χρησιμοποιούν GitHub Enterprise Cloud με EMU, έλεγξε τις προϋποθέσεις μία μία. Αν έχεις ήδη GitHub connector σε επίπεδο Organization, πρόσεξε: όταν συνδέσεις σε επίπεδο Enterprise, οι connectors των organizations απενεργοποιούνται αυτόματα. Ενημέρωσε τους developers ότι κανένας νόμιμος έλεγχος δεν τους ζητά να εγκρίνουν device code που δεν ξεκίνησαν οι ίδιοι.

**Αναλυτικά:** [Preview: Ο Defender κόβει το device code phishing στο Copilot CLI](/posts/previews/defender-github-copilot-cli-device-code-phishing/)

**Πηγή:** [Protect AI agents from trusted-identity attacks (preview)](https://learn.microsoft.com/en-us/defender-xdr/security-for-ai/protect-ai-agents-from-trusted-identity-attacks) · [How Defender for Cloud Apps helps protect your GitHub Enterprise environment](https://learn.microsoft.com/en-us/defender-cloud-apps/protect-github)

### 3. Defender XDR: Similar cases στα incidents του unified SecOps platform

**Φάση:** Public Preview τώρα, GA με διάθεση που ξεκινά και ολοκληρώνεται στις αρχές Δεκεμβρίου 2026, σύμφωνα με την ανακοίνωση · **Άδεια:** δεν αναφέρεται στην πηγή

**Τι αλλάζει.** Σύμφωνα με την ανακοίνωση MC1556107, η σελίδα του incident στο Defender portal, και για το Microsoft Sentinel μέσα στο Defender portal, αποκτά καρτέλα **Similar cases** με έως 20 incidents που μοιράζονται τίτλους alerts ή entities με το τρέχον. Η στήλη **Similarity reason** δείχνει γιατί εμφανίζεται το καθένα. Η κάρτα **Associated incidents** στο Summary μετονομάζεται σε **Recommended correlations**, χωρίς αλλαγή στο περιεχόμενο.

**Τι να κάνεις.** Η ανακοίνωση λέει ότι δεν χρειάζεται προετοιμασία. Ενημέρωσε όμως τη βάρδια και τον MSSP σου για τη μετονομασία, γιατί μπορεί να την αναφέρουν οι οδηγίες έρευνας. Πρόσθεσε στη διαδικασία έρευνας ένα βήμα: «έλεγξε τα Similar cases και πώς έκλεισαν».

**Αναλυτικά:** [Preview: Similar cases στα incidents του Defender portal](/posts/previews/defender-similar-cases-unified-secops/)

**Πηγή:** [Investigate incident cases in the Microsoft Defender portal: Review similar cases](https://learn.microsoft.com/en-us/defender-xdr/investigate-incident-cases#review-similar-cases) · Message Center [MC1556107](https://mc.merill.net/message/MC1556107) (αρχείο mc.merill.net, δημοσιεύθηκε στις 16 Νοεμβρίου 2026)

### 4. Defender for Cloud Apps: custom roles του Unified RBAC για το App Governance

**Φάση:** Public Preview από τα τέλη Νοεμβρίου έως τα μέσα Δεκεμβρίου 2026, και GA από τα μέσα Δεκεμβρίου 2026 έως τα μέσα Ιανουαρίου 2027, σύμφωνα με την ανακοίνωση · **Άδεια:** δεν αναφέρεται στην πηγή

**Τι αλλάζει.** Σύμφωνα με την ανακοίνωση MC1558114, το App Governance δέχεται custom roles του Unified RBAC του Defender XDR για τρεις δυνατότητες: ανάγνωση (inventory, insights, risk signals, policies), διαχείριση policies, και διαχείριση της υπηρεσίας (ενεργοποίηση ή απενεργοποίηση του App Governance). Χρήστες με υπάρχοντες ρόλους Unified RBAC για το Defender for Cloud Apps μπορεί να αποκτήσουν πρόσβαση στο App Governance, ανάλογα με τα δικαιώματα και τις data sources τους. Η ενεργοποίηση και απενεργοποίηση εφαρμογών του Entra θέλει ακόμα τον ρόλο Application Administrator.

**Τι να κάνεις.** Πέρασε τις αναθέσεις Unified RBAC, ιδίως τους ρόλους για το Defender for Cloud Apps, και δες ποιος θα αποκτήσει πρόσβαση στο App Governance χωρίς να το έχεις αποφασίσει. Για να δώσεις πρόσβαση, φτιάξε custom role στο **Setup & Configuration → Permissions → Microsoft Defender XDR → Roles**. Η ανακοίνωση δεν δίνει σελίδα στο Microsoft Learn.

**Αναλυτικά:** [Generally Available: Αλλάζουν τα δικαιώματα των ρόλων του Entra στο App Governance του Defender for Cloud Apps](/posts/generally-available/defender-cloud-apps-app-governance-roles-unified-rbac/)

**Πηγή:** Message Center [MC1558114](https://mc.merill.net/message/MC1558114) (αρχείο mc.merill.net, δημοσιεύθηκε στις 18 Νοεμβρίου 2026)

### 5. Defender for Endpoint: preview features ένα ένα, όχι όλα μαζί

**Φάση:** Public Preview · **Άδεια:** δεν αναφέρεται στην πηγή

**Τι αλλάζει.** Μέχρι τώρα η ρύθμιση **Preview features** άνοιγε όλα τα public preview features του Defender for Endpoint για όλο το tenant. Η νέα σελίδα **Settings → Endpoints → Preview features** σου επιτρέπει να ανοίγεις ένα feature τη φορά, και για ορισμένα να το περιορίζεις σε συσκευές συγκεκριμένων safe deployment channels. Τα features της σελίδας είναι κλειστά από προεπιλογή, εκτός αν το tenant σου ήταν στο private preview του feature. Η σελίδα εμφανίζεται μόνο αν είναι ανοιχτή η ρύθμιση **Preview features** στο **Settings → Endpoints → Optional features**. Πρώτο παράδειγμα είναι το embedded offboarding με το Defender deployment tool, επίσης σε preview.

**Τι να κάνεις.** Αν έχεις ανοιχτά όλα τα previews για να δοκιμάσεις ένα, άνοιξε τη νέα σελίδα και δες τι είναι ενεργό. Αν δεν έχεις safe deployment channels, ξεκίνα με μια μικρή ομάδα δοκιμαστικών συσκευών.

**Αναλυτικά:** [Preview: Τα preview features του Defender for Endpoint ένα ένα](/posts/previews/defender-endpoint-preview-features-page/)

**Πηγή:** [Manage individual preview features in Microsoft Defender for Endpoint (preview)](https://learn.microsoft.com/en-us/defender-endpoint/manage-preview-features)

## Νέοι πόροι

- **[Ignite 2026: What's new in Microsoft Defender & Sentinel](https://techcommunity.microsoft.com/blog/microsoftthreatprotectionblog/ignite-2026-whats-new-in-microsoft-defender--sentinel/4569975)** (Microsoft Defender XDR Blog, 17 Νοεμβρίου 2026). Η σύνοψη των ανακοινώσεων του Ignite για Defender και Sentinel. Χρήσιμο για το ISOC: η ανάρτηση αναφέρει σε GA το case management, τα playbooks, τα workbooks και το UEBA, σε preview 90 ημέρες retention για τα δεδομένα του Defender, το Content Hub και τα detections as code, και μια διαδρομή opt-in για τους υπάρχοντες πελάτες του Sentinel. Αναφέρει επίσης το vulnerability shielding σε preview, ενεργό από προεπιλογή. Δεν βρέθηκε ακόμα σελίδα του Microsoft Learn γι' αυτό, οπότε θα το δούμε όταν τεκμηριωθεί.
- **[Ignite 2026: What's new in endpoint security](https://techcommunity.microsoft.com/blog/microsoftthreatprotectionblog/ignite-2026-what%E2%80%99s-new-in-endpoint-security/4573835)** (Microsoft Defender XDR Blog, 17 Νοεμβρίου 2026). Χρήσιμο για όποιον τρέχει Defender for Endpoint: η ανάρτηση λέει ότι η προστασία από ClickFix lures στον browser διατίθεται σε όλες τις συσκευές με Defender Antivirus έως το τέλος του έτους, ότι ένα dashboard για την υγεία των endpoints έρχεται σε public preview τις επόμενες εβδομάδες, και ότι η επέκταση του custom data collection σε Linux file events και Windows registry events μπαίνει σε public preview στις 9 Δεκεμβρίου 2026.

## Προσοχή αυτή την εβδομάδα

**Τέλη Νοεμβρίου 2026, Defender for Identity.** Αποσύρονται τα alerts Remote code execution attempt και pass-the-hash (αλλαγή 1). Η ανακοίνωση MC1552387 έχει «Act by» τις 30 Νοεμβρίου.

**Τέλη Νοεμβρίου 2026, Defender Vulnerability Management.** Υπενθύμιση από το [τεύχος 46](/posts/weekly-security-update/microsoft-365-security-ti-allaxe-2026-w46/): σύμφωνα με την ανακοίνωση MC1490909, η διευρυμένη κάλυψη ευπαθειών σε πακέτα developers ξεκινά να περνά σε GA.

**2 Δεκεμβρίου 2026, Defender XDR.** Προθεσμία για τον έλεγχο των ρόλων πριν από την αυτόματη ενεργοποίηση του Defender RBAC, όπως γράψαμε στο [τεύχος 45](/posts/weekly-security-update/microsoft-365-security-ti-allaxe-2026-w45/).

**Αρχές Δεκεμβρίου 2026, Defender for Office 365 και Defender XDR.** Ξεκινά η λογική OR στις threat protection policies, όπως γράψαμε στο [τεύχος 46](/posts/weekly-security-update/microsoft-365-security-ti-allaxe-2026-w46/), και το Similar cases περνά σε GA (αλλαγή 3).

Οι ημερομηνίες των ανακοινώσεων μπορεί να διαφέρουν ανά tenant, οπότε δες τις στο δικό σου Message Center.

## Σύνδεση με την ΚΥΑ 1689/2025

- **[24.ε](/kya-1689-2025/#24-ε), έλεγχος καταγραφών και όρια ειδοποίησης:** όταν φεύγει ένα alert, φεύγει και μια συνθήκη ειδοποίησης. Το custom detection που το αντικαθιστά, με ημερομηνία δοκιμής, είναι το τεκμήριο ότι δεν έμεινε κενό (αλλαγή 1).
- **[13.στ](/kya-1689-2025/#13-στ), ισχυρή αυθεντικοποίηση:** το device code phishing παρακάμπτει την αυθεντικοποίηση με τη συναίνεση του ίδιου του χρήστη. Η ανίχνευση και η αυτόματη απενεργοποίηση του λογαριασμού GitHub κλείνουν το παράθυρο (αλλαγή 2).
- **[24.α](/kya-1689-2025/#24-α), διαδικασία απόκρισης:** το Similar cases είναι ένα βήμα που μπαίνει στη διαδικασία έρευνας (αλλαγή 3).
- **[13.γ](/kya-1689-2025/#13-γ), least privilege:** τα custom roles του App Governance επιτρέπουν να δώσεις μόνο ανάγνωση σε όποιον χρειάζεται μόνο αυτό (αλλαγή 4).
- **[16.α](/kya-1689-2025/#16-α), διαχείριση αλλαγών:** η ενεργοποίηση ενός preview feature σε λίγες συσκευές πρώτα είναι δοκιμή πριν από την παραγωγή (αλλαγή 5).

Όλες οι απαιτήσεις της ΚΥΑ 1689/2025 με την αντιστοίχισή τους βρίσκονται στον [οδηγό της ΚΥΑ 1689/2025](/kya-1689-2025/).

## Πηγές και επαλήθευση {#last-verified}

{{< verification >}}

Για αυτό το τεύχος ελέγχθηκαν το αρχείο mc.merill.net (αναρτήσεις Message Center για τα προϊόντα Defender και Sentinel που δημοσιεύθηκαν ή ενημερώθηκαν από τις 13 έως τις 19 Νοεμβρίου 2026, και ανακοινώσεις Defender παλαιότερων εβδομάδων με ημερομηνίες μέσα στις επόμενες δύο εβδομάδες), οι σελίδες «What's new» των Defender XDR, Defender for Endpoint, Defender for Office 365, Defender for Identity, Defender for Cloud Apps, Defender for Cloud και Microsoft Sentinel, και τα blogs του Microsoft Defender XDR και του Microsoft Sentinel στο Tech Community. Η αρχική σελίδα και η ροή RSS του mc.merill.net δεν ήταν προσβάσιμες σε αυτόν τον έλεγχο, οπότε οι ανακοινώσεις εντοπίστηκαν μέσω αναζήτησης και κάθε μία ανοίχτηκε στη δική της σελίδα. Μπορεί να υπάρχουν ανακοινώσεις της εβδομάδας που δεν εντοπίστηκαν.

Τι βρέθηκε στις σελίδες «What's new»: του Defender XDR έχει για τον Νοέμβριο τη νέα πλοήγηση του Defender portal για όσους χρησιμοποιούν ISOC (preview), την προστασία για το GitHub Copilot CLI (αλλαγή 2) και νέα δραστηριότητα Active Directory στους πίνακες IdentityDirectoryEvents, IdentityQueryEvents και IdentityLogonEvents του advanced hunting, χωρίς φάση. Του Defender for Endpoint έχει τη σελίδα Preview features (αλλαγή 5), το embedded offboarding (preview) και ένα build για macOS. Του Defender for Office 365 έχει τον πίνακα SyntheticMediaDetectionEvents για deepfakes στο Teams, χωρίς φάση. Του Defender for Identity έχει μόνο την υποστήριξη του sensor v3.x χωρίς Defender for Endpoint στα government clouds. Του Defender for Cloud Apps έχει τον GitHub connector σε επίπεδο Enterprise (preview, μέρος της αλλαγής 2). Του Defender for Cloud έχει μόνο την υποστήριξη Arc proxy, που κάλυψε το [τεύχος 45](/posts/weekly-security-update/microsoft-365-security-ti-allaxe-2026-w45/). Του Microsoft Sentinel έχει την τιμολόγηση της λύσης SAP για πελάτες ISOC.

Οι ανακοινώσεις MC1552387, MC1556107 και MC1558114 διαβάστηκαν από το έγκυρο, δημόσιο και ανεξάρτητο αρχείο του Microsoft 365 Message Center, mc.merill.net, που το συντηρεί η κοινότητα και όχι η Microsoft. Δεν διαβάστηκαν σε Message Center κάποιου tenant. Οι ημερομηνίες των αλλαγών 3 και 4 προέρχονται μόνο από τις ανακοινώσεις, και η αλλαγή 4 δεν έχει ακόμα σελίδα στο Microsoft Learn. Πριν ενεργήσεις, δες τις ανακοινώσεις στο δικό σου Message Center.

Τελευταίος έλεγχος αδειών και στοιχείων: 19 Νοεμβρίου 2026.
