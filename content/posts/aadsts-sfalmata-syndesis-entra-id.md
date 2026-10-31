---
title: "AADSTS: Τι σημαίνουν τα σφάλματα σύνδεσης του Microsoft Entra ID και τι κάνεις ως admin"
seoTitle: "Σφάλματα AADSTS στο Entra ID: τι σημαίνουν, τι κάνεις"
date: 2026-10-31T16:30:00+02:00
lastmod: 2026-10-31T17:00:00+02:00
draft: false
homeHighlight: true
slug: aadsts-sfalmata-syndesis-entra-id
keywords:
  - AADSTS σφάλμα
  - AADSTS53003
  - AADSTS50126
  - AADSTS50076
  - AADSTS50105
  - AADSTS65001
  - σφάλματα σύνδεσης Microsoft Entra ID
  - Entra ID sign-in logs error code
  - Conditional Access blocked
  - τι σημαίνει AADSTS
tags:
  - Microsoft Entra ID
  - Conditional Access
  - Sign-in Logs
  - MFA
  - Identity Protection
  - Advanced Hunting
  - KQL
  - ΚΥΑ 1689/2025
  - NIS2
  - ISO 27001
  - GDPR
author: "Dimosthenis Atteia"
description: "Ο οδηγός για τα σφάλματα AADSTS του Microsoft Entra ID: πού βρίσκεις τον κωδικό, τι σημαίνουν οι πιο συχνοί, ποιοι είναι απλός θόρυβος, και τι κάνεις για τον καθένα, με το απλούστερο βήμα πρώτο."
seoDescription: "Τι σημαίνουν τα σφάλματα AADSTS του Entra ID, όπως 53003, 50126 και 50076, πού τα βρίσκεις στα sign-in logs και τι κάνεις για τον καθένα."
summary: "Ο χρήστης σου λέει «μου βγάζει AADSTS53003». Σου εξηγώ πού βρίσκεις τον κωδικό και τον λόγο στα sign-in logs, τι σημαίνουν οι κωδικοί που θα συναντήσεις στην πράξη, ποιοι είναι αναμενόμενοι, και τι κάνεις για τον καθένα."
categories: ["Identity & Access"]
# MITRE ATT&CK®: ονόματα στο data/mitre.yaml
mitre: ["T1078.004", "T1110", "T1110.003", "M1032", "M1018"]
ShowToc: true
TocOpen: false
ShowReadingTime: true
ShowWordCount: true
cover:
  image: "/images/aadsts/aadsts-cover.webp"
  alt: "Μια οθόνη σφάλματος σύνδεσης με τον κωδικό AADSTS53003 και, δίπλα, οι ομάδες κωδικών: κωδικός και λογαριασμός, MFA, Conditional Access, εφαρμογές και hybrid"
  maxWidth: 800
# Πλαίσιο «Last verified»: κάθε χαρακτηριστικό με τη φάση, την άδεια, την πηγή και την ημερομηνία ελέγχου
verification:
  - feature: "Κατάλογος κωδικών AADSTS και Error code lookup (login.microsoftonline.com/error)"
    status: "Generally Available"
    license: "Όλες οι εκδόσεις Microsoft Entra ID"
    source: "https://learn.microsoft.com/en-us/entra/identity-platform/reference-error-codes"
    verified: 2026-10-31
  - feature: "Sign-in logs: Sign-in error code, Failure reason, Correlation ID και καρτέλα Conditional Access"
    status: "Generally Available"
    license: "Όλες οι εκδόσεις Microsoft Entra ID"
    source: "https://learn.microsoft.com/en-us/entra/identity/monitoring-health/howto-troubleshoot-sign-in-errors"
    verified: 2026-10-31
  - feature: "Διατήρηση των sign-in logs: 7 ημέρες στο Microsoft Entra ID Free, 30 ημέρες στο P1 και στο P2"
    status: "Generally Available"
    license: "Microsoft Entra ID Free, P1 ή P2"
    source: "https://learn.microsoft.com/en-us/entra/identity/monitoring-health/reference-reports-data-retention"
    verified: 2026-10-31
  - feature: "Conditional Access (κωδικοί 53000, 53001, 53002, 53003), με την καρτέλα Conditional Access και το What If tool"
    status: "Generally Available"
    license: "Microsoft Entra ID P1 ή Microsoft 365 Business Premium. Οι πολιτικές με βάση τον κίνδυνο θέλουν Microsoft Entra ID P2"
    source: "https://learn.microsoft.com/en-us/entra/identity/conditional-access/troubleshoot-conditional-access"
    verified: 2026-10-31
  - feature: "Advanced hunting: πίνακας EntraIdSignInEvents (στήλη ErrorCode), που αντικατέστησε τον AADSignInEventsBeta στις 19/10/2026"
    status: "Generally Available"
    license: "Microsoft Entra ID P2"
    source: "https://learn.microsoft.com/en-us/defender-xdr/advanced-hunting-entraidsigninevents-table"
    verified: 2026-10-31
---

Ο χρήστης παίρνει τηλέφωνο: «Δεν μπορώ να μπω στο Outlook, μου βγάζει AADSTS53003». Ο κωδικός μοιάζει κρυπτικός, αλλά λέει ακριβώς τι έγινε. Χρειάζεται μόνο να ξέρεις πού να κοιτάξεις και πώς να τον διαβάσεις.

Η Microsoft τεκμηριώνει σήμερα 350 κωδικούς AADSTS. Δεν χρειάζεσαι όλους. Πολλοί αφορούν developers που φτιάχνουν εφαρμογές. Σε αυτό το άρθρο κράτησα αυτούς που θα συναντήσεις ως admin στο helpdesk και στα sign-in logs, ομαδοποιημένους με βάση το τι θα κάνεις.

## Πού βρίσκεις τον κωδικό και τον λόγο

**Στην οθόνη του χρήστη.** Η σελίδα σφάλματος δείχνει τον κωδικό, και το **More details** δίνει το Correlation ID, το Request ID και την ώρα. Ζήτα από τον χρήστη ένα screenshot αυτής της οθόνης. Με αυτά βρίσκεις αμέσως τη συγκεκριμένη σύνδεση.

[![Η σελίδα σφάλματος σύνδεσης με το More details, που δείχνει Request ID, Correlation ID, ώρα, εφαρμογή, IP και κατάσταση συσκευής](https://learn.microsoft.com/en-us/entra/identity/conditional-access/media/troubleshoot-conditional-access/image2.png)](https://learn.microsoft.com/en-us/entra/identity/conditional-access/media/troubleshoot-conditional-access/image2.png)
> 📷 **Εικόνα 1: Το More details στην οθόνη του χρήστη, με Request ID, Correlation ID, ώρα, εφαρμογή, IP και κατάσταση συσκευής.** Πηγή εικόνας: Microsoft Learn.

**Στα sign-in logs.** Στο [Microsoft Entra admin center](https://entra.microsoft.com), πήγαινε **Entra ID** › **Monitoring & health** › **Sign-in logs**. Αρκεί ο ρόλος Reports Reader. Φίλτραρε με το όνομα του χρήστη και **Status: Failure**, ή κατευθείαν με το Correlation ID. Στη λεπτομέρεια της σύνδεσης θα δεις:

- το **Sign-in error code**, δηλαδή τον αριθμό χωρίς το πρόθεμα AADSTS
- το **Failure reason**, που περιγράφει το σφάλμα, και τα **Additional Details**, που συχνά λένε και τη λύση
- την καρτέλα **Conditional Access**, που δείχνει ποια πολιτική εφαρμόστηκε και με τι αποτέλεσμα
- την καρτέλα **Authentication Details**, που δείχνει ποια μέθοδος χρησιμοποιήθηκε ή ζητήθηκε

[![Μια αποτυχημένη σύνδεση στα sign-in logs με Sign-in error code 50053, Failure reason για κλειδωμένο λογαριασμό και Additional details με τους δύο πιθανούς λόγους](/images/aadsts/aadsts-sign-in-details.webp)](/images/aadsts/aadsts-sign-in-details.webp)
> 📷 **Εικόνα 2: Μια αποτυχημένη σύνδεση με κωδικό 50053. Το Failure reason λέει ότι ο λογαριασμός κλειδώθηκε, και τα Additional details εξηγούν ότι ο ίδιος κωδικός βγαίνει και για κακόβουλη IP. Entra ID › Monitoring & health › Sign-in logs.** Πηγή εικόνας: το δικό μου production tenant, με απόκρυψη των στοιχείων του χρήστη.

Τα logs μένουν 7 ημέρες στο Microsoft Entra ID Free και 30 ημέρες στο P1 και στο P2. Αν ο χρήστης σε πάρει μετά από μια εβδομάδα σε tenant χωρίς premium άδεια, η σύνδεση δεν θα υπάρχει πια.

**Στη Microsoft.** Για κωδικό που δεν είναι σε αυτό το άρθρο, γράψε τον αριθμό στο [login.microsoftonline.com/error](https://login.microsoftonline.com/error). Η Microsoft αλλάζει τις περιγραφές χωρίς προειδοποίηση, και αυτή η σελίδα έχει πάντα την τρέχουσα. Ο πλήρης κατάλογος είναι στο [Microsoft Learn](https://learn.microsoft.com/en-us/entra/identity-platform/reference-error-codes).

## Κωδικός και λογαριασμός

| Κωδικός | Τι σημαίνει | Τι κάνεις |
|---|---|---|
| `50126` | Λάθος όνομα χρήστη ή κωδικός. | Ο χρήστης ξαναπροσπαθεί. Λίγα τέτοια σφάλματα είναι φυσιολογικά. Πολλά από την ίδια IP για πολλούς διαφορετικούς χρήστες είναι password spray: δες το query παρακάτω. |
| `50053` | Δύο πιθανοί λόγοι: ο λογαριασμός κλειδώθηκε από το Smart Lockout μετά από πολλές λάθος προσπάθειες, ή η σύνδεση ήρθε από IP με κακόβουλη δραστηριότητα. | Δες το **Failure reason** της σύνδεσης. Αν είναι κλείδωμα από τον ίδιο τον χρήστη, περιμένει λίγο και ξαναδοκιμάζει. Αν ο χρήστης δεν έκανε αυτές τις προσπάθειες, κάποιος δοκιμάζει τον κωδικό του. |
| `50055` | Ο κωδικός έληξε. | Ο χρήστης αλλάζει κωδικό στην επόμενη σύνδεση, μέσω self-service password reset, ή του κάνεις reset εσύ. |
| `50144` | Έληξε ο κωδικός του on-premises Active Directory. | Όπως το 50055, αλλά η αλλαγή γίνεται στο Active Directory ή μέσω self-service password reset με password writeback. |
| `50057` | Ο λογαριασμός είναι απενεργοποιημένος. | Αν ο χρήστης είναι synced, ενεργοποίησέ τον στο on-premises Active Directory. Αν είναι cloud-only, ενεργοποίησέ τον στο Entra. Πριν το κάνεις, βεβαιώσου ότι δεν απενεργοποιήθηκε σκόπιμα, π.χ. σε αποχώρηση. |
| `50034` | Ο λογαριασμός δεν υπάρχει στον tenant. | Συνήθως λάθος στο όνομα χρήστη. Αν είναι σωστό, η εφαρμογή στέλνει τον χρήστη σε λάθος tenant. Αν πρέπει να έχει πρόσβαση ως εξωτερικός, πρόσθεσέ τον ως guest. |
| `50173`, `50133`, `50132` | Το session ή το token ακυρώθηκε, συνήθως επειδή ο χρήστης άλλαξε ή έκανε reset τον κωδικό, ή επειδή έγινε revoke sessions. | Ο χρήστης κάνει sign out και ξανά sign in στην εφαρμογή. Είναι η αναμενόμενη συμπεριφορά μετά από αλλαγή κωδικού. |
| `135011` | Η συσκευή που χρησιμοποιήθηκε είναι απενεργοποιημένη στο Entra. | Δες τη συσκευή στο **Entra ID** › **Devices**. Αν απενεργοποιήθηκε σκόπιμα, π.χ. επειδή χάθηκε, μην την ενεργοποιήσεις. |

## MFA

| Κωδικός | Τι σημαίνει | Τι κάνεις |
|---|---|---|
| `50076` | Απαιτείται MFA, λόγω Conditional Access, per-user MFA ή νέας τοποθεσίας. | Συνήθως τίποτα. Είναι μέρος της κανονικής ροής: ο χρήστης βλέπει το αίτημα MFA και συνεχίζει. Πρόβλημα υπάρχει μόνο αν δεν μπορεί να το ολοκληρώσει. |
| `50074` | Απαιτείται MFA και ο χρήστης δεν πέρασε τον έλεγχο. | Δες στο **Authentication Details** ποια μέθοδος ζητήθηκε. Αν ο χρήστης λέει ότι δεν προσπάθησε να συνδεθεί, κάποιος έχει τον κωδικό του: κάνε reset κωδικού και revoke sessions. |
| `50079`, `50072` | Ο χρήστης πρέπει να καταχωρίσει μέθοδο MFA πριν συνεχίσει. | Ο χρήστης ολοκληρώνει την καταχώριση στο [Security info](https://mysignins.microsoft.com/security-info). Αν δεν έχει καμία μέθοδο ή έχασε το κινητό του, δώσε του Temporary Access Pass για να καταχωρίσει νέα. |
| `50158` | Ο χρήστης στάλθηκε σε επιπλέον έλεγχο, π.χ. Terms of use ή πάροχο MFA τρίτου. | Μόνος του ο κωδικός δεν σημαίνει αποτυχία. Δες στα logs αν ο επιπλέον έλεγχος ολοκληρώθηκε. |

[![Η καρτέλα Authentication details μιας σύνδεσης, με πολιτικές Conditional Access και Authentication Strength και απαίτηση phishing-resistant MFA που είχε ήδη ικανοποιηθεί](/images/aadsts/aadsts-authentication-details.webp)](/images/aadsts/aadsts-authentication-details.webp)
> 📷 **Εικόνα 3: Η καρτέλα Authentication details. Η πολιτική ζήτησε phishing-resistant MFA μέσω Authentication Strength, και η απαίτηση είχε ήδη ικανοποιηθεί (Previously satisfied), οπότε ο χρήστης δεν ρωτήθηκε ξανά.** Πηγή εικόνας: το δικό μου production tenant, με απόκρυψη των στοιχείων του χρήστη.

## Conditional Access και συσκευές

| Κωδικός | Τι σημαίνει | Τι κάνεις |
|---|---|---|
| `53003` | Μια πολιτική Conditional Access μπλόκαρε τη σύνδεση. | Άνοιξε την καρτέλα **Conditional Access** της σύνδεσης: εκεί φαίνεται η πολιτική με αποτέλεσμα **Failure**. Πάτα τις τρεις τελείες δίπλα της για να δεις ποια συνθήκη ταίριαξε. Αν ο χρήστης είναι guest σε άλλον οργανισμό, η πολιτική μπορεί να είναι του άλλου tenant, και τη λύνει ο δικός του admin. |
| `53000` | Η πολιτική ζητά συμμορφούμενη συσκευή και η συσκευή δεν είναι. | Δες τη συσκευή στο Intune admin center και ποια ρύθμιση συμμόρφωσης αποτυγχάνει. Αν η συσκευή δεν είναι καν εγγεγραμμένη στο Intune, ο χρήστης πρέπει να την εγγράψει. |
| `53001` | Η πολιτική ζητά συσκευή joined στο domain, και η συσκευή δεν είναι. | Ο χρήστης συνδέεται από εταιρική συσκευή Microsoft Entra hybrid joined. Σε συσκευή Windows, το `dsregcmd /status` δείχνει την κατάστασή της. |
| `53002` | Η εφαρμογή δεν είναι εγκεκριμένη για την πολιτική. | Στο κινητό, ο χρήστης χρησιμοποιεί την εγκεκριμένη εφαρμογή, π.χ. Outlook αντί για την ενσωματωμένη εφαρμογή email. |
| `50097` | Απαιτείται ταυτοποίηση της συσκευής. | Η συσκευή πρέπει να είναι registered ή joined στο Entra. Σε Windows, ξεκίνα από το `dsregcmd /status`. |
| `530032` | Μια πολιτική ασφάλειας σε επίπεδο tenant μπλόκαρε το αίτημα. | Δες τις πολιτικές ασφάλειας του tenant και την καρτέλα **Conditional Access** της σύνδεσης. |

[![Η καρτέλα Conditional access μιας σύνδεσης, με τέσσερις πολιτικές, τα grant controls τους και αποτέλεσμα Success](/images/aadsts/aadsts-conditional-access.webp)](/images/aadsts/aadsts-conditional-access.webp)
> 📷 **Εικόνα 4: Η καρτέλα Conditional access μιας σύνδεσης που πέρασε. Φαίνονται όλες οι πολιτικές που εφαρμόστηκαν, με τα grant controls και το αποτέλεσμα. Σε ένα 53003, η πολιτική που μπλόκαρε εμφανίζεται εδώ με Failure.** Πηγή εικόνας: το δικό μου production tenant, με απόκρυψη των στοιχείων του χρήστη.

Αν η καρτέλα Conditional Access δεν σου φτάνει, χρησιμοποίησε το **What If tool** για να προσομοιώσεις τη σύνδεση του χρήστη, ή το **Sign-in diagnostic** από την καρτέλα **Basic info** της σύνδεσης. Για ένα βασικό σύνολο πολιτικών που αποφεύγει τα πιο συχνά λάθη, δες το εργαλείο [Βασικό σύνολο πολιτικών Conditional Access](/politikes-conditional-access/).

## Κίνδυνος (Identity Protection)

| Κωδικός | Τι σημαίνει | Τι κάνεις |
|---|---|---|
| `53004` | Ο χρήστης πρέπει να καταχωρίσει MFA, αλλά η καταχώριση μπλοκαρίστηκε λόγω κινδύνου. | Δες τον χρήστη στο **Risky users** και τη σύνδεση στο **Risky sign-ins** του ID Protection. Αν η σύνδεση δεν ήταν δική του, χειρίσου τον λογαριασμό ως παραβιασμένο. |
| `53011` | Ο χρήστης μπλοκαρίστηκε λόγω κινδύνου στον δικό του (home) tenant. | Αφορά συνήθως guests. Τη λύση τη δίνει ο admin του οργανισμού του χρήστη. |

## Guests και ανάθεση σε εφαρμογές

| Κωδικός | Τι σημαίνει | Τι κάνεις |
|---|---|---|
| `50020` | Ο λογαριασμός δεν υπάρχει στον tenant της εφαρμογής. | Ο χρήστης προσπαθεί να μπει με λογαριασμό άλλου οργανισμού. Προσκάλεσέ τον ως guest μέσω B2B, ή ο χρήστης συνδέεται με τον σωστό λογαριασμό. |
| `90072` | Ο εξωτερικός λογαριασμός δεν υπάρχει στον tenant, οπότε ο χρήστης δεν μπορεί να κάνει το MFA που ζητά. | Πρόσθεσε τον χρήστη ως guest. Αν ο χρήστης είναι synced, το ίδιο σφάλμα εμφανίζεται όταν δεν ταιριάζει το ImmutableID (sourceAnchor) ανάμεσα σε Active Directory και Entra. |
| `50105` | Ο χρήστης δεν έχει ανατεθεί στην εφαρμογή. | Η εφαρμογή έχει **Assignment required**. Πρόσθεσε τον χρήστη ή μια ομάδα του στο **Enterprise applications** › εφαρμογή › **Users and groups**. |

## Εφαρμογές και consent

Αυτά τα σφάλματα τα βλέπεις συνήθως όταν βάζεις μια νέα εφαρμογή στον tenant ή όταν λήγει κάτι σε μια παλιά.

| Κωδικός | Τι σημαίνει | Τι κάνεις |
|---|---|---|
| `65001` | Δεν έχει δοθεί consent για την εφαρμογή. | Ο χρήστης ή ο admin δίνει consent. Αν οι χρήστες δεν επιτρέπεται να δίνουν consent, το δίνει ο admin. |
| `65004` | Ο χρήστης αρνήθηκε το consent. | Ο χρήστης ξαναπροσπαθεί και αποδέχεται, αν η εφαρμογή είναι εγκεκριμένη. |
| `90094`, `90095` | Απαιτείται admin consent. Με το 90095 ο χρήστης βλέπει ότι μπορεί να το ζητήσει από τον admin. | Αξιολόγησε τα δικαιώματα που ζητά η εφαρμογή και δώσε consent μόνο αν τα χρειάζεται. Το **admin consent workflow** στέλνει τα αιτήματα των χρηστών σε εσένα, αντί να τους μπλοκάρει χωρίς εξήγηση. |
| `700016` | Η εφαρμογή δεν βρέθηκε στον tenant. | Η εφαρμογή δεν έχει εγκατασταθεί, ή το αίτημα πήγε σε λάθος tenant, ή το Application ID είναι λάθος. |
| `500011` | Δεν βρέθηκε η εφαρμογή-πόρος (resource) στον tenant. | Όπως το 700016, αλλά για την εφαρμογή που προσπαθεί να προσπελάσει. Συνήθως χρειάζεται admin consent. |
| `7000215`, `7000222` | Λάθος ή ληγμένο client secret. | Φτιάξε νέο secret στο **App registrations** και ενημέρωσε την εφαρμογή. Ακόμα καλύτερα, χρησιμοποίησε πιστοποιητικό, όπως προτείνει η Microsoft. Βάλε υπενθύμιση πριν λήξει το επόμενο. |
| `50011` | Η διεύθυνση επιστροφής (reply URL) δεν ταιριάζει με αυτές της εφαρμογής. | Πρόσθεσε τη σωστή διεύθυνση στο **Authentication** της εφαρμογής στο **App registrations**. |

## Hybrid: Pass-through Authentication, Seamless SSO, Windows Hello for Business

| Κωδικός | Τι σημαίνει | Τι κάνεις |
|---|---|---|
| `80001` | Ο agent του Pass-through Authentication δεν συνδέεται στο Active Directory. | Έλεγξε ότι οι servers του agent είναι στο ίδιο forest με τους χρήστες και βλέπουν τους domain controllers. |
| `80002` | Έληξε ο χρόνος για τον έλεγχο του κωδικού στο Active Directory. | Έλεγξε τη διαθεσιμότητα των domain controllers και των agents. Αν πέσουν όλοι οι agents, κανένας χρήστης με PTA δεν συνδέεται. |
| `81010` | Το Seamless SSO απέτυχε επειδή το Kerberos ticket του χρήστη έληξε ή δεν είναι έγκυρο. | Ο χρήστης κάνει sign out και sign in στα Windows. Αν επαναλαμβάνεται σε πολλούς, έλεγξε το Seamless SSO στο Microsoft Entra Connect. |
| `130004` | Ο χρήστης δεν έχει ρυθμισμένο κλειδί Windows Hello for Business. | Ο χρήστης ξαναστήνει το Windows Hello for Business, ή συνδέεται με άλλη μέθοδο μέχρι να γίνει. |

## Κωδικοί που φαίνονται στα logs αλλά δεν είναι πρόβλημα

Αν φιλτράρεις τα sign-in logs με **Failure**, θα δεις πολλούς από αυτούς. Δεν χρειάζονται ενέργεια.

| Κωδικός | Γιατί είναι αναμενόμενος |
|---|---|
| `50058` | Ο χρήστης δεν έχει συνδεθεί ακόμα. Εμφανίζεται συχνά πριν από μια κανονική σύνδεση, και τότε το πεδίο χρήστη μπορεί να δείχνει GUID αντί για όνομα. |
| `50140` | Η ερώτηση «Keep me signed in». Είναι μέρος της ροής σύνδεσης. |
| `50199` | Επιβεβαίωση του χρήστη για λόγους ασφάλειας, συνήθως σε κινητό. Δεν χρειάζεται ενέργεια. |
| `700082` | Το refresh token έληξε επειδή ο χρήστης δεν χρησιμοποίησε την εφαρμογή για πολύ καιρό. Η εφαρμογή ζητά νέα σύνδεση. |
| `90025` | Μια εσωτερική υπηρεσία του Entra ξαναπροσπάθησε. Συνήθως λύνεται μόνο του, χωρίς να το καταλάβει ο χρήστης. |

## Να τα βρίσκεις πριν σε πάρουν τηλέφωνο

Με Microsoft Entra ID P2, τα sign-in logs είναι διαθέσιμα στο Advanced hunting του Microsoft Defender portal, στον πίνακα `EntraIdSignInEvents`. Ο πίνακας αντικατέστησε τον `AADSignInEventsBeta` στις 19 Οκτωβρίου 2026, και τα παλιά queries μεταφέρθηκαν αυτόματα.

Τα συχνότερα σφάλματα της εβδομάδας, με τον αριθμό χρηστών που επηρεάστηκαν:

```kql
// Τα 20 σφάλματα σύνδεσης των τελευταίων 7 ημερών που επηρέασαν τους περισσότερους χρήστες
// Για κάθε κωδικό AADSTS: πόσες αποτυχημένες προσπάθειες και πόσοι διαφορετικοί χρήστες
EntraIdSignInEvents
| where Timestamp > ago(7d)
| where ErrorCode != 0   // μόνο οι αποτυχημένες συνδέσεις
| summarize Attempts = count(), Users = dcount(AccountUpn) by ErrorCode
| top 20 by Users
```

Ένδειξη password spray: πολλοί διαφορετικοί χρήστες με λάθος κωδικό από την ίδια IP, μέσα σε μία ημέρα.

```kql
// Ένδειξη password spray: λάθος κωδικός (50126) για πολλούς χρήστες από την ίδια IP
// Ελέγχει το τελευταίο 24ωρο και δείχνει τις IPs με 10 ή περισσότερους διαφορετικούς χρήστες
EntraIdSignInEvents
| where Timestamp > ago(1d)
| where ErrorCode == 50126   // λάθος όνομα χρήστη ή κωδικός
| summarize Users = dcount(AccountUpn), Attempts = count() by IPAddress, Country
| where Users >= 10   // όριο που προσαρμόζεις στο μέγεθος του οργανισμού σου
| order by Users desc
```

Το όριο των 10 χρηστών είναι σημείο εκκίνησης. Προσάρμοσέ το στο μέγεθος του οργανισμού σου. Περισσότερα έτοιμα queries θα βρεις στη [Βιβλιοθήκη KQL](/kql/).

## Γιατί έχει σημασία για τη συμμόρφωση

Η ΚΥΑ 1689/2025 ζητά ισχυρές μεθόδους αυθεντικοποίησης ([απαίτηση 13.στ](/kya-1689-2025/#13-στ)), MFA όπου το απαιτεί η κρισιμότητα ([13.ζ](/kya-1689-2025/#13-ζ)) και τακτικό έλεγχο των καταγραφών για ύποπτη δραστηριότητα ([24.ε](/kya-1689-2025/#24-ε)). Η Οδηγία NIS2 ζητά πολιτικές ελέγχου πρόσβασης ([21.2.θ](/nis2/#21-2-θ)) και πολυπαραγοντική επαλήθευση ταυτότητας ([21.2.ι](/nis2/#21-2-ι)). Στο ISO/IEC 27001 αφορά την ασφαλή αυθεντικοποίηση ([A.8.5](/iso-27001/#A-8-5)), τις πληροφορίες αυθεντικοποίησης ([A.5.17](/iso-27001/#A-5-17)) και την παρακολούθηση δραστηριοτήτων ([A.8.16](/iso-27001/#A-8-16)). Στον GDPR, το απόρρητο και την ακεραιότητα των συστημάτων ([32.1.β](/gdpr/#32-1-β)).

Ο ελεγκτής δεν θα σε ρωτήσει τι σημαίνει το 53003. Θα σε ρωτήσει αν κοιτάς τα logs και τι κάνεις όταν δεις κάτι ύποπτο. Τα σφάλματα AADSTS είναι το πρώτο σήμα: ένα κύμα 50126 από μία IP, ένα 50074 που ο χρήστης δεν αναγνωρίζει, ένα 53004 σε λογαριασμό που δεν περίμενες. Αν δεις τέτοιο σήμα και επιβεβαιωθεί παραβίαση, δες αν είναι [σημαντικό περιστατικό](/anafora-peristatikou/) που πρέπει να αναφέρεις στην ΕΑΚ.

> 🛠️ **Θέλεις πολιτικές Conditional Access που δεν σε κλειδώνουν έξω;** [Δες το βασικό σύνολο πολιτικών](/politikes-conditional-access/) με βάση τις άδειες που έχεις.

> 🛠️ **Δεν ξέρεις αν η άδειά σου καλύπτει Conditional Access ή ID Protection;** [Δες ποια άδεια Microsoft 365 χρειάζεσαι](/poia-adeia-microsoft-365/) για κάθε απαίτηση της ΚΥΑ 1689/2025.

Για τη μετάβαση από SMS και φωνητική κλήση σε passkeys, που θα φέρει πολλά 50079 τους επόμενους μήνες, δες το άρθρο [Τέλος στα SMS/Voice MFA: Η Microsoft κάνει τα Passkeys default στο Entra ID](/posts/passkeys-by-default-telos-sms-voice-mfa/).

---

## Πηγές και επαλήθευση {#last-verified}

{{< verification >}}
