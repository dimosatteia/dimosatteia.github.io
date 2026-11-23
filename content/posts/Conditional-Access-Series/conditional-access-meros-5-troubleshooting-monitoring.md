---
title: "Microsoft Entra Conditional Access Μέρος 5: Troubleshooting και monitoring, πώς αποδεικνύεις τι συνέβη σε ένα sign-in"
seoTitle: "Conditional Access Μέρος 5: troubleshooting και monitoring"
# Προσωρινή ημερομηνία: αλλάζει στην πραγματική ημερομηνία δημοσίευσης
date: 2026-10-19T13:00:00+03:00
lastmod: 2026-10-19T13:00:00+03:00
draft: true
keywords:
  - Conditional Access report-only
  - Conditional Access What If tool
  - Conditional Access sign-in logs
  - Conditional Access troubleshooting
  - AADSTS53003 BlockedByConditionalAccess
  - Conditional Access audience reporting
  - Conditional Access insights and reporting workbook
  - Get-MgIdentityConditionalAccessPolicy
  - Microsoft Graph conditionalAccessPolicy
  - Conditional Access audit logs
tags:
  - Conditional Access
  - Microsoft Entra ID
  - Troubleshooting
  - Sign-in Logs
  - Microsoft Graph
  - PowerShell
  - KQL
  - Identity Security
  - Microsoft 365 Security
author: "Dimosthenis Atteia"
description: "Πώς δοκιμάζεις, ελέγχεις και διορθώνεις πολιτικές Conditional Access: report-only, What If, sign-in logs, error codes, workbook και Microsoft Graph PowerShell. Μέρος 5."
summary: "Στο πέμπτο μέρος της σειράς μαθαίνεις να αποδεικνύεις τι συνέβη σε ένα sign-in: τα αποτελέσματα του report-only, το What If tool, τα sign-in logs και τα error codes, μια διαγνωστική μεθοδολογία για blocked sign-ins, το Insights and Reporting workbook και την καταγραφή των πολιτικών με Microsoft Graph PowerShell."
categories: ["Identity & Access"]
series: ["Microsoft Entra Conditional Access"]
ShowToc: true
TocOpen: false
cover:
  image: "/images/Conditional-Access/ca-meros-5.webp"
  alt: "Microsoft Entra Conditional Access Μέρος 5: Troubleshooting και monitoring"
  caption: "Microsoft Entra Conditional Access: Ο Πλήρης Οδηγός"
  relative: false
ShowReadingTime: true
ShowWordCount: true
# Πλαίσιο «Last verified»: κάθε χαρακτηριστικό με τη φάση, την άδεια, την πηγή και την ημερομηνία ελέγχου
verification:
  - feature: "Report-only mode και αποτελέσματα αξιολόγησης"
    status: "Generally Available"
    license: "Microsoft Entra ID P1"
    source: "https://learn.microsoft.com/en-us/entra/identity/conditional-access/concept-conditional-access-report-only"
    verified: 2026-10-19
  - feature: "Policy impact"
    status: "Public Preview"
    license: "Microsoft Entra ID P1"
    source: "https://learn.microsoft.com/en-us/entra/identity/conditional-access/concept-conditional-access-report-only"
    verified: 2026-10-19
  - feature: "What If tool και What If evaluation API"
    status: "Generally Available"
    license: "Microsoft Entra ID P1"
    source: "https://learn.microsoft.com/en-us/entra/identity/conditional-access/what-if-tool"
    verified: 2026-10-19
  - feature: "What If για agent identities"
    status: "Public Preview"
    license: "Microsoft Entra ID P1"
    source: "https://learn.microsoft.com/en-us/entra/identity/conditional-access/what-if-tool"
    verified: 2026-10-19
  - feature: "Sign-in logs, policy details, audience reporting"
    status: "Generally Available"
    license: "Microsoft Entra ID P1"
    source: "https://learn.microsoft.com/en-us/entra/identity/conditional-access/troubleshoot-conditional-access"
    verified: 2026-10-19
  - feature: "Conditional Access Insights and Reporting workbook"
    status: "Generally Available"
    license: "Microsoft Entra ID P1 και Log Analytics workspace"
    source: "https://learn.microsoft.com/en-us/entra/identity/conditional-access/howto-conditional-access-insights-reporting"
    verified: 2026-10-19
  - feature: "Audit logs για αλλαγές πολιτικών (30 ημέρες, ή περισσότερο με diagnostic settings)"
    status: "Generally Available"
    license: "Microsoft Entra ID P1"
    source: "https://learn.microsoft.com/en-us/entra/identity/conditional-access/troubleshoot-policy-changes-audit-log"
    verified: 2026-10-19
  - feature: "Microsoft Graph PowerShell (Get-MgIdentityConditionalAccessPolicy)"
    status: "Generally Available"
    license: "Microsoft Entra ID P1"
    source: "https://learn.microsoft.com/en-us/powershell/module/microsoft.graph.identity.signins/get-mgidentityconditionalaccesspolicy"
    verified: 2026-10-19
# MITRE ATT&CK®: ονόματα στο data/mitre.yaml
mitre: ["T1078.004", "M1047"]
---

> 🚦 **Σειρά Microsoft Entra Conditional Access, Μέρος 5 από 6.** Στα **[Μέρη 3](/posts/conditional-access-series/conditional-access-meros-3-ylopoiisi-stin-praxi/)** και **[4](/posts/conditional-access-series/conditional-access-meros-4-advanced-identity-security/)** έστησες τις πολιτικές. Εδώ μαθαίνεις να αποδεικνύεις τι κάνουν, πριν και μετά την επιβολή, και να βρίσκεις γιατί μπλοκαρίστηκε ένας χρήστης.

## Γιατί το troubleshooting είναι κομμάτι της ασφάλειας

Μια πολιτική που δεν καταλαβαίνεις είναι μια πολιτική που κάποια στιγμή θα απενεργοποιήσεις υπό πίεση. Όταν ένας διευθυντής δεν μπορεί να μπει στο email του πριν από μια σύσκεψη, ο πειρασμός είναι η «προσωρινή» εξαίρεση που μένει για πάντα. Η απάντηση είναι η ικανότητα να βρίσκεις σε λίγα λεπτά ποια πολιτική μπλόκαρε, γιατί, και ποια είναι η σωστή διόρθωση.

Τα εργαλεία είναι πέντε: **report-only**, **What If**, **sign-in logs**, **Insights and Reporting workbook** και **Microsoft Graph**. Το καθένα απαντά σε άλλη ερώτηση.

| Εργαλείο | Ερώτηση που απαντά | Πότε |
| --- | --- | --- |
| Report-only | Τι θα έκανε η πολιτική σε πραγματικά sign-ins; | Πριν από την επιβολή |
| What If | Ποιες πολιτικές εφαρμόζονται σε ένα σενάριο; | Σχεδιασμός και troubleshooting |
| Sign-in logs | Τι ακριβώς συνέβη σε ένα συγκεκριμένο sign-in; | Troubleshooting |
| Workbook | Ποια είναι η συνολική εικόνα στον χρόνο; | Monitoring |
| Graph και audit logs | Ποιες πολιτικές υπάρχουν και ποιος τις άλλαξε; | Inventory και governance |

## Report-only mode: δοκιμή χωρίς ρίσκο

Μια πολιτική σε **report-only** αξιολογείται σε κάθε sign-in, αλλά δεν επιβάλλει grant ή session controls. Οι χρήστες δεν βλέπουν MFA ούτε μπλοκάρονται. Το αποτέλεσμα καταγράφεται στις καρτέλες **Conditional Access** και **Report-only** του sign-in.

Ένας περιορισμός: τα **User actions** (Register security information, Register or join devices) **δεν** αξιολογούνται σε report-only.

### Τα αποτελέσματα και τι σημαίνουν

| Αποτέλεσμα | Τι σημαίνει |
| --- | --- |
| **Report-only: Success** | Όλες οι conditions ταίριαξαν και τα controls ικανοποιήθηκαν χωρίς αλληλεπίδραση, π.χ. υπήρχε ήδη MFA claim στο token. |
| **Report-only: Failure** | Οι conditions ταίριαξαν αλλά κάποιο control δεν ικανοποιήθηκε, π.χ. η πολιτική έχει Block ή η συσκευή δεν είναι compliant. |
| **Report-only: User action required** | Οι conditions ταίριαξαν, αλλά θα χρειαζόταν ενέργεια του χρήστη, π.χ. MFA ή terms of use. Σε report-only δεν ζητείται. |
| **Report-only: Not applied** | Δεν ταίριαξαν όλες οι conditions, π.χ. ο χρήστης εξαιρείται. |
| **Success** | Ενεργή πολιτική που εφαρμόστηκε και ικανοποιήθηκε. Μια άλλη πολιτική μπορεί πάλι να μπλοκάρει. |
| **Failure** | Ενεργή πολιτική που εφαρμόστηκε και δεν ικανοποιήθηκε. Μπορεί να είναι σκόπιμο ή λάθος ρύθμιση. |
| **Not applied** | Η πολιτική δεν εφαρμόστηκε. |

Το **User action required** είναι το πιο παρεξηγημένο αποτέλεσμα. Δεν σημαίνει πρόβλημα, σημαίνει ότι ο χρήστης θα έβλεπε prompt. Αν σε μια πολιτική MFA για όλους βλέπεις πολλά τέτοια, είναι οι χρήστες που θα κάνουν MFA την πρώτη μέρα.

> ⚠️ **Report-only με compliant device σε Mac, iOS και Android.** Μπορεί να εμφανίσει στους χρήστες επιλογή πιστοποιητικού συσκευής, ακόμη κι αν δεν επιβάλλεται τίποτα, και να επαναλαμβάνεται μέχρι η συσκευή να γίνει compliant. Η Microsoft προτείνει να εξαιρείς αυτές τις πλατφόρμες από report-only πολιτικές με έλεγχο συσκευής.

Είδες στο Μέρος 3 το **Policy impact** (Preview) και την καρτέλα **Report-only** στα sign-in logs. Δύο πρακτικές από τη Microsoft αξίζει να γίνουν κανόνας:

- **Νέα πολιτική δίπλα στις ενεργές.** Η report-only πολιτική τρέχει παράλληλα, χωρίς να επηρεάζει τίποτα.
- **Αλλαγή σε ενεργή πολιτική μέσω αντιγράφου.** Φτιάχνεις αντίγραφο σε report-only με την αλλαγή, συγκρίνεις τα αποτελέσματα, και μόνο τότε αλλάζεις την ενεργή και σβήνεις το αντίγραφο.

Το Conditional Access δεν υποστηρίζει κλασικό A/B testing. Το πιο κοντινό είναι το **phased rollout** του Conditional Access Optimization Agent, όπου είναι διαθέσιμος. Και κάτι που ξεχνιέται: αν αλλάξεις μια ενεργή πολιτική από On σε Report-only, **σταματάς την επιβολή της**.

## Το What If tool: προσομοίωση πριν από το πραγματικό sign-in

Το **What If** βρίσκεται στο **Entra ID → Conditional Access → Policies → What If**. Προσομοιώνει ένα sign-in για χρήστη, agent identity (Preview) ή single tenant service principal, και σου λέει ποιες πολιτικές εφαρμόζονται.

[![Οι παράμετροι του What If tool](/images/Conditional-Access/ca-p5-what-if-conditions.webp)](/images/Conditional-Access/ca-p5-what-if-conditions.webp)
> 📷 **Εικόνα 1:** Η σελίδα What If με τις παραμέτρους: identity, target resource, και sign-in conditions όπως device platform, client app, authentication flow, insider risk, sign-in risk, IP address, country και filter for devices. Screenshot © Microsoft, από το [What If tool](https://learn.microsoft.com/en-us/entra/identity/conditional-access/what-if-tool).

Οι υποχρεωτικές παράμετροι είναι τέσσερις: **identity**, **target resource**, **device platform** και **client app**. Όλες οι υπόλοιπες θεωρούνται κενές αν δεν τις συμπληρώσεις. Το αποτέλεσμα έχει δύο λίστες:

- **Policies that will apply**, με τα grant και session controls που πρέπει να ικανοποιηθούν.
- **Policies that will not apply**, με τον λόγο. Ο λόγος είναι **η πρώτη condition που δεν ικανοποιήθηκε**.

Δείχνει επίσης αν υπάρχουν ακόμη **classic policies** στον tenant, που έχουν σταματήσει να επιβάλλονται από τον Ιούλιο του 2024.

[![Αποτέλεσμα What If με τις πολιτικές που εφαρμόζονται](/images/Conditional-Access/ca-p5-what-if-result.webp)](/images/Conditional-Access/ca-p5-what-if-result.webp)
> 📷 **Εικόνα 2:** Το αποτέλεσμα του What If: οι πολιτικές που εφαρμόζονται, με τα grant controls, τα session controls και την κατάσταση On ή Report-only. Screenshot © Microsoft, από το [What If tool](https://learn.microsoft.com/en-us/entra/identity/conditional-access/what-if-tool).

Τέσσερα όρια που εξηγούν τα περισσότερα «περίεργα» αποτελέσματα:

- **Συμπλήρωσε όλες τις παραμέτρους.** Το What If πατά πλέον στο What If evaluation API, που ακολουθεί τη λογική του πραγματικού sign-in. Αν μια πολιτική έχει condition για τοποθεσία ή κίνδυνο και δεν το δώσεις, θα σου πει ότι δεν εφαρμόζεται.
- **Δώσε App ID, όχι ομάδα εφαρμογών.** Τα **Office 365** ή **Microsoft Admin Portals** ως ομάδες δεν ταιριάζουν στην προσομοίωση.
- **Δεν ελέγχει service dependencies.** Αν δοκιμάσεις το Teams, δεν θα δεις την πολιτική του Exchange Online, από το οποίο εξαρτάται.
- **Μόνο ενεργές και report-only πολιτικές.** Οι πολιτικές σε Off δεν αξιολογούνται.

Το What If απαντά στο «τι θα γινόταν». Για το «τι έγινε» χρειάζεσαι τα sign-in logs.

## Sign-in logs: πώς βρίσκεις την αιτία ενός blocked sign-in

### Ξεκινάς από τον χρήστη

Όταν το Conditional Access διακόπτει ένα sign-in σε browser, η σελίδα σφάλματος συνήθως εξηγεί το πρόβλημα. Ζήτα από τον χρήστη να πατήσει **More details**: εμφανίζει **Request ID**, **Correlation ID**, ώρα, εφαρμογή, IP, πλατφόρμα και κατάσταση συσκευής. Με αυτά βρίσκεις το ακριβές event.

[![Τα More details σε ένα sign-in που διέκοψε το Conditional Access](/images/Conditional-Access/ca-p5-more-details.webp)](/images/Conditional-Access/ca-p5-more-details.webp)
> 📷 **Εικόνα 3:** Η σελίδα σφάλματος με το link More details και τις πληροφορίες που εμφανίζει: Request Id, Correlation Id, Timestamp, App name, IP address, Device platform και Device state. Screenshot © Microsoft, από το [Troubleshoot sign-in problems with Conditional Access](https://learn.microsoft.com/en-us/entra/identity/conditional-access/troubleshoot-conditional-access).

### Βρίσκεις το event

1. Μπες ως **Reports Reader** στο **Entra ID → Monitoring & health → Sign-in logs**.
2. Φίλτραρε με **Correlation ID**, ή με **Username**, **Date**, **Resource**, και **Conditional Access: Failure**.
3. Αν δεν βρίσκεις το sign-in, δες και την καρτέλα **User sign-ins (non-interactive)**.
4. Στο event, άνοιξε την καρτέλα **Conditional Access**: δείχνει ποιες πολιτικές εφαρμόστηκαν και με ποιο αποτέλεσμα.
5. Στις τρεις τελείες δίπλα σε μια πολιτική ανοίγουν τα **policy details**: αριστερά τι μαζεύτηκε στο sign-in, δεξιά αν ικανοποιεί κάθε condition.

Τα στοιχεία του χρήστη και της συσκευής βρίσκονται στις καρτέλες **Basic info**, **Location**, **Device info**, **Authentication Details** και **Additional Details**. Η καρτέλα **Troubleshooting and support** συχνά δίνει τον λόγο απευθείας, π.χ. ότι η συσκευή δεν πληρούσε τις απαιτήσεις συμμόρφωσης. Αν χρειαστείς περισσότερα, το **sign-in diagnostic** βρίσκεται στο **Basic info → Troubleshoot Event**.

### Τα error codes που θα δεις

| Error code | Τι σημαίνει |
| --- | --- |
| **AADSTS53000** | DeviceNotCompliant: η συσκευή δεν είναι compliant |
| **AADSTS53001** | DeviceNotDomainJoined: η συσκευή δεν είναι hybrid joined |
| **AADSTS53002** | ApplicationUsedIsNotAnApprovedApp: η εφαρμογή δεν είναι εγκεκριμένη |
| **AADSTS53003** | BlockedByConditionalAccess: μπλοκαρίστηκε από πολιτική |
| **AADSTS53004** | ProofUpBlockedDueToRisk: η εγγραφή μεθόδων μπλοκαρίστηκε λόγω κινδύνου |
| **AADSTS53009** | Η εφαρμογή πρέπει να επιβάλλει Intune protection policies |
| **AADSTS530036** | Protocol tracking από authentication flows policy (Μέρος 4) |

### Όταν η εφαρμογή δεν είναι καν στην πολιτική

Δύο φαινόμενα εξηγούν τα blocks που μοιάζουν ανεξήγητα:

**Service dependencies.** Μια εφαρμογή καλεί άλλον πόρο. Στο sign-in log φαίνεται ως διαφορετικό **Application** και **Resource**, π.χ. Application: Azure Portal, Resource: Windows Azure Service Management API. Η πολιτική του πόρου είναι αυτή που μπλοκάρει.

[![Service dependency σε sign-in log: Azure Portal που καλεί Windows Azure Service Management API](/images/Conditional-Access/ca-p5-service-dependency.webp)](/images/Conditional-Access/ca-p5-service-dependency.webp)
> 📷 **Εικόνα 4:** Ένα sign-in όπου η εφαρμογή είναι το Azure Portal και ο πόρος το Windows Azure Service Management API. Screenshot © Microsoft, από το [Troubleshoot sign-in problems with Conditional Access](https://learn.microsoft.com/en-us/entra/identity/conditional-access/troubleshoot-conditional-access).

**Audience reporting.** Όταν ο χρήστης ανοίγει το Teams, ζητά στην πραγματικότητα πρόσβαση σε πολλούς πόρους: Teams, Exchange, SharePoint. Στα policy details, το πεδίο **Audience** κάτω από το **Resource** δείχνει όλους τους πόρους του sign-in. Αν ένας από αυτούς είναι στο scope μιας πολιτικής, η πολιτική εφαρμόζεται.

[![Audience reporting στα policy details ενός sign-in](/images/Conditional-Access/ca-p5-audience-reporting.webp)](/images/Conditional-Access/ca-p5-audience-reporting.webp)
> 📷 **Εικόνα 5:** Τα Conditional Access Policy details με την ενότητα Audience (Preview): Microsoft Teams Services, Office 365 Exchange Online, Office 365 SharePoint Online και Skype for Business Online στο ίδιο sign-in. Screenshot © Microsoft, από το [Troubleshoot sign-in problems with Conditional Access](https://learn.microsoft.com/en-us/entra/identity/conditional-access/troubleshoot-conditional-access).

## Troubleshooting: μεθοδολογία, συχνά λάθη και lockout

### Μια μεθοδολογία σε έξι βήματα

![Διαγνωστική μεθοδολογία για blocked sign-in](/images/Conditional-Access/ca-p5-diagnostic-flow.webp)
> 📷 **Εικόνα 6:** Τα έξι βήματα από το Correlation ID στην πολιτική που μπλόκαρε, και τι ελέγχεις όταν το αποτέλεσμα δεν βγάζει νόημα.

Το βήμα 6 είναι το πιο σημαντικό. Η διόρθωση δεν γίνεται κατευθείαν στην ενεργή πολιτική. Γίνεται σε αντίγραφο report-only, ελέγχεται, και μετά περνά στην ενεργή.

### Οι συνδυασμοί που δεν κάνεις ποτέ

Η Microsoft αναφέρει ρητά συνδυασμούς για **All users και All resources** που κλειδώνουν έξω τον οργανισμό:

- **Block access:** μπλοκάρει όλους.
- **Require compliant device:** όσοι δεν έχουν κάνει enrollment μπλοκάρονται, ακόμη και από το portal του Intune. Ένας admin χωρίς enrolled συσκευή δεν μπορεί να γυρίσει να αλλάξει την πολιτική.
- **Require hybrid joined device:** μπλοκάρει όσους δεν έχουν τέτοια συσκευή.
- **Require app protection policy:** μπλοκάρει όλους αν δεν υπάρχει πολιτική Intune.

### Αν κλειδωθείς έξω

1. Βρες άλλον admin που δεν έχει μπλοκαριστεί, για να απενεργοποιήσει την πολιτική.
2. Χρησιμοποίησε τον **break-glass λογαριασμό**. Γι' αυτό υπάρχει.
3. Αν κανείς δεν μπορεί να αλλάξει την πολιτική, άνοιξε **support request** στη Microsoft. Η Microsoft ελέγχει και, αφού επιβεβαιώσει, αλλάζει τις πολιτικές.

Για κάθε support request, δώσε **Request ID, ώρα και ημερομηνία** από το sign-in event.

### Ποιος άλλαξε την πολιτική;

Το **audit log** καταγράφει κάθε αλλαγή. Στο **Entra ID → Monitoring & health → Audit logs**, φίλτραρε **Service: Conditional Access**. Η καρτέλα **Modified Properties** δείχνει την παλιά και τη νέα τιμή της πολιτικής σε JSON, οπότε βλέπεις ακριβώς τι άλλαξε.

[![Audit log με παλιές και νέες τιμές μιας πολιτικής](/images/Conditional-Access/ca-p5-audit-log.webp)](/images/Conditional-Access/ca-p5-audit-log.webp)
> 📷 **Εικόνα 7:** Τα Audit Log Details μιας αλλαγής πολιτικής, με την καρτέλα Modified Properties και τις στήλες Old Value και New Value σε JSON. Screenshot © Microsoft, από το [Use audit logs to troubleshoot Conditional Access policy changes](https://learn.microsoft.com/en-us/entra/identity/conditional-access/troubleshoot-policy-changes-audit-log).

Το audit log κρατιέται **30 ημέρες** από προεπιλογή. Για μεγαλύτερη διατήρηση, στείλε τα logs μέσω **Diagnostic settings** σε Log Analytics, storage account, Event Hubs ή SIEM. Στο Log Analytics, οι αλλαγές βρίσκονται με:

```kusto
AuditLogs
| where OperationName == "Update Conditional Access policy"
| project TimeGenerated, InitiatedBy, TargetResources
```

Οι παλιές και νέες τιμές είναι στο `TargetResources` → `modifiedProperties`.

## Conditional Access Insights and Reporting workbook

Τα sign-in logs απαντούν για ένα sign-in. Το **Insights and Reporting workbook** απαντά για όλα μαζί, στον χρόνο.

**Προϋποθέσεις:** Microsoft Entra ID P1, ένα **Log Analytics workspace** που λαμβάνει τα sign-in logs, και ρόλους **Security Reader** στο Entra ID και Contributor στο workspace. Το workbook βρίσκεται στο **Entra ID → Conditional Access → Insights and reporting**.

Οι παράμετροι:

- **Conditional Access policy:** μία ή περισσότερες, χωρισμένες σε **Enabled** και **Report-only**. Βλέπεις τον συνδυασμένο αντίκτυπο.
- **Time range:** από 4 ώρες έως 90 ημέρες, αλλά μόνο από τη στιγμή που ξεκίνησε η ροή των logs στο workspace.
- **User** και **App:** για εστίαση.
- **Data view:** αριθμός χρηστών ή αριθμός sign-ins.

Το **Impact summary** δείχνει Total, Success, Failure, User action required και Not applied.

[![Το Impact summary του workbook](/images/Conditional-Access/ca-p5-workbook-impact.webp)](/images/Conditional-Access/ca-p5-workbook-impact.webp)
> 📷 **Εικόνα 8:** Το Impact summary: Total, Success, Failure, User action required και Not applied. Screenshot © Microsoft, από το [Conditional Access insights and reporting](https://learn.microsoft.com/en-us/entra/identity/conditional-access/howto-conditional-access-insights-reporting).

Κάτω από αυτό, η ανάλυση ανά condition δείχνει πού συγκεντρώνονται τα αποτελέσματα: device state, platform, client app, location, application και sign-in risk.

[![Ανάλυση ανά condition στο workbook](/images/Conditional-Access/ca-p5-workbook-breakdown.webp)](/images/Conditional-Access/ca-p5-workbook-breakdown.webp)
> 📷 **Εικόνα 9:** Η ενότητα Breakdown per condition and sign-in status, με γραφήματα για device state, device platform, client app, sign-in risk, location και applications. Screenshot © Microsoft, από το [Conditional Access insights and reporting](https://learn.microsoft.com/en-us/entra/identity/conditional-access/howto-conditional-access-insights-reporting).

Τρεις πρακτικές συμβουλές:

- **Σε μεγάλους tenants** το workbook μπορεί να αργεί ή να μη φορτώνει. Ξεκίνα με 4 ώρες. Η Microsoft περιγράφει και ένα transformation στο Azure Monitor για καλύτερη απόδοση, με προσοχή στο κόστος.
- **Αν τα queries αποτυγχάνουν**, έλεγξε ότι το workbook έχει **ένα μόνο** workspace. Τρέξε `SigninLogs` στο **Monitoring & health → Log Analytics** για να επιβεβαιώσεις ότι έρχονται δεδομένα.
- **Για εξαγωγή** των sign-in logs με τα αποτελέσματα report-only, κατέβασέ τα σε **JSON**.

Δίπλα στο workbook, η καρτέλα **Coverage** στο Overview του Conditional Access δείχνει τις εφαρμογές **χωρίς** πολιτική τις τελευταίες 7 ημέρες. Είναι ο πιο γρήγορος έλεγχος για την αρχή «κάθε εφαρμογή με τουλάχιστον μία πολιτική» του Μέρους 3.

Για ένα δικό σου query στα report-only αποτελέσματα:

```kusto
SigninLogs
| where TimeGenerated > ago(7d)
| mv-expand CAP = ConditionalAccessPolicies
| where tostring(CAP.result) == "reportOnlyFailure"
| summarize Failures = count() by Policy = tostring(CAP.displayName), AppDisplayName
| order by Failures desc
```

Τα αποτελέσματα στο πεδίο `result` περιλαμβάνουν `success`, `failure`, `notApplied`, `reportOnlySuccess`, `reportOnlyFailure`, `reportOnlyNotApplied` και `notEnabled`.

## Microsoft Graph και PowerShell: inventory και reporting

Το admin center είναι για μία πολιτική τη φορά. Για inventory, reporting και τεκμηρίωση χρειάζεσαι το **[Microsoft Graph](https://learn.microsoft.com/en-us/graph/api/resources/conditionalaccesspolicy)** και το Microsoft Graph PowerShell.

### Ανάγνωση και εξαγωγή όλων των πολιτικών

Για ανάγνωση αρκεί το scope `Policy.Read.All`:

```powershell
Connect-MgGraph -Scopes "Policy.Read.All"

# Λίστα πολιτικών με την κατάστασή τους
Get-MgIdentityConditionalAccessPolicy -All |
    Select-Object DisplayName, State, CreatedDateTime, ModifiedDateTime |
    Sort-Object DisplayName

# Εξαγωγή κάθε πολιτικής σε ξεχωριστό JSON
$out = ".\CA-Export-$(Get-Date -Format yyyy-MM-dd)"
New-Item -ItemType Directory -Path $out -Force | Out-Null
Get-MgIdentityConditionalAccessPolicy -All | ForEach-Object {
    $name = ($_.DisplayName -replace '[\\/:*?"<>|]', '_')
    $_ | ConvertTo-Json -Depth 10 | Out-File "$out\$name.json" -Encoding utf8
}

# Named locations
Get-MgIdentityConditionalAccessNamedLocation -All |
    Select-Object DisplayName, Id, ModifiedDateTime
```

Η τιμή `State` είναι `enabled`, `disabled` ή `enabledForReportingButNotEnforced`, δηλαδή report-only. Ένα ημερομηνιοποιημένο export είναι η απλούστερη μορφή τεκμηρίωσης: έχεις στιγμιότυπο των πολιτικών για κάθε έλεγχο, και μπορείς να συγκρίνεις δύο ημερομηνίες για να δεις τι άλλαξε.

Για αλλαγές χρειάζεται το scope `Policy.ReadWrite.ConditionalAccess`, ιδανικά μόνο σε ελεγχόμενη διαδικασία. Αν έχεις ενεργοποιήσει τα protected actions του Μέρους 2, το Microsoft Graph PowerShell υποστηρίζει το step-up που ζητούν. Το Azure PowerShell δεν το υποστηρίζει.

### Τρία ακόμη εργαλεία στο Graph

- **What If evaluation API:** το ίδιο API που χρησιμοποιεί το What If tool, για αυτοματοποιημένους ελέγχους σεναρίων.
- **Templates σε JSON:** κάθε template του Μέρους 3 εξάγεται σε JSON και ανεβαίνει με **Upload policy file**.
- **Audit logs:** το `AuditLogs` στο Log Analytics, που είδαμε παραπάνω.

Το επόμενο βήμα, οι πολιτικές ως κώδικας με version control και ελεγχόμενες αλλαγές, είναι θέμα του Μέρους 6.

{{< tool-link page="/kql" lead="Θέλεις τεκμήριο από το δικό σου tenant;" label="Δες τη Βιβλιοθήκη KQL" tail="με έτοιμα Advanced Hunting queries για τις απαιτήσεις της ΚΥΑ 1689/2025." >}}

## Security considerations

- **Τα sign-in και audit logs είναι τεκμήρια.** Τα 30 ημέρες του audit log δεν αρκούν για έλεγχο ή για διερεύνηση περιστατικού. Στείλε τα σε Log Analytics ή SIEM.
- **Οι ρόλοι troubleshooting είναι ανάγνωσης.** Reports Reader και Security Reader αρκούν για logs, What If και workbook. Το Conditional Access Administrator χρειάζεται μόνο για αλλαγές.
- **Η «προσωρινή» εξαίρεση είναι ο μεγαλύτερος κίνδυνος του troubleshooting.** Αν χρειαστεί, βάλε ημερομηνία λήξης και καταγραφή.
- **Το What If δεν βλέπει service dependencies.** Ένα «δεν εφαρμόζεται» στο What If δεν αποκλείει block στην πράξη.
- **Το report-only δεν καλύπτει τα user actions.** Οι πολιτικές για register security information και device join δοκιμάζονται με test user.
- **Τα exports περιέχουν τη στρατηγική σου.** Οι εξαιρέσεις και τα named locations είναι πληροφορίες που θα ήθελε ένας επιτιθέμενος. Φύλαξέ τα όπως τις υπόλοιπες ρυθμίσεις ασφαλείας.

## Validation: test cases και αναμενόμενα αποτελέσματα

| # | Έλεγχος | Σενάριο | Αναμενόμενο αποτέλεσμα | Πού το βλέπεις |
| --- | --- | --- | --- | --- |
| 1 | Report-only | Νέα πολιτική MFA για pilot ομάδα | Report-only: Success ή User action required στους χρήστες της ομάδας | Sign-in logs → Report-only |
| 2 | What If | Test user, Office 365 Exchange Online (App ID), Windows, Browser | Εμφανίζονται οι πολιτικές MFA για όλους, με τα controls τους | What If → Policies that will apply |
| 3 | What If | Ίδιο σενάριο με εξαιρεμένο χρήστη | Η πολιτική στο Will not apply, με λόγο την εξαίρεση | What If → Policies that will not apply |
| 4 | Sign-in logs | Blocked sign-in με Correlation ID από τον χρήστη | Το event βρίσκεται και δείχνει την πολιτική με Failure | Sign-in logs → Conditional Access |
| 5 | Audience | Sign-in στο Teams | Στα policy details εμφανίζονται και Exchange και SharePoint | Policy details → Audience |
| 6 | Audit log | Αλλαγή εξαίρεσης σε test πολιτική | Εγγραφή με παλιά και νέα τιμή | Audit logs → Modified Properties |
| 7 | Workbook | Επιλογή μιας report-only πολιτικής, 7 ημέρες | Impact summary με Success, Failure, User action required | Insights and reporting |
| 8 | Graph | `Get-MgIdentityConditionalAccessPolicy -All` | Ίδιος αριθμός πολιτικών με τη λίστα του admin center | PowerShell |

## Governance: τι σημαίνει για χρήστες, IT και οργανισμό

**Για τους χρήστες:** το helpdesk πρέπει να ξέρει να ζητά το **More details**. Μια σύντομη οδηγία, «στείλε μας screenshot με τα More details», μειώνει τον χρόνο επίλυσης από ώρες σε λεπτά.

**Για το IT:** η διαγνωστική μεθοδολογία γίνεται runbook του helpdesk. Ο ρόλος Reports Reader δίνεται στο helpdesk, ώστε να διαβάζει τα logs χωρίς να μπορεί να αλλάξει πολιτικές.

**Για τον οργανισμό:** το μηνιαίο export των πολιτικών, το workbook και τα audit logs είναι η απόδειξη ότι ο έλεγχος πρόσβασης λειτουργεί όπως σχεδιάστηκε και ότι οι αλλαγές ελέγχονται. Αυτό ζητά ο ελεγκτής, όχι μόνο την ύπαρξη πολιτικών.

## Licensing σε μια ματιά

| Δυνατότητα | Τι χρειάζεσαι |
| --- | --- |
| Report-only, policy impact, What If, sign-in και audit logs | Microsoft Entra ID P1 |
| Insights and Reporting workbook | Microsoft Entra ID P1 και Log Analytics workspace (Azure subscription) |
| Διατήρηση logs πέρα από τις 30 ημέρες | Log Analytics, storage account, Event Hubs ή SIEM |
| Microsoft Graph PowerShell | Χωρίς επιπλέον άδεια, πάνω στο P1 |
| Phased rollout με Optimization Agent | Microsoft Entra ID P1 και Security Copilot SCU |

## Τι σημαίνει για τη συμμόρφωση

Η συμμόρφωση δεν αποδεικνύεται με το ότι υπάρχουν πολιτικές. Αποδεικνύεται με το ότι αξιολογείς την αποτελεσματικότητά τους, καταγράφεις τι συμβαίνει και ελέγχεις τις αλλαγές. Τα εργαλεία αυτού του άρθρου καλύπτουν και τα τρία.

> 🔗 **Χρειάζεσαι τεκμηρίωση συμμόρφωσης;** Τα εργαλεία αυτού του άρθρου στηρίζουν τις απαιτήσεις [13.η](/kya-1689-2025/#13-η) (περιοδική αξιολόγηση του ελέγχου πρόσβασης), [16.α](/kya-1689-2025/#16-α) (διαχείριση αλλαγών) και [24.γ](/kya-1689-2025/#24-γ) (καταγραφή), όπως τις αναλύει ο **[οδηγός της ΚΥΑ 1689/2025](/kya-1689-2025/)**. Στον οδηγό για την **[Οδηγία NIS2](/nis2/)** αντιστοιχούν στα [21.2.στ](/nis2/#21-2-στ) και [21.2.θ](/nis2/#21-2-θ), στο **[ISO/IEC 27001](/iso-27001/)** στα [A.5.28](/iso-27001/#A-5-28), [A.8.15](/iso-27001/#A-8-15), [A.8.16](/iso-27001/#A-8-16) και [A.8.32](/iso-27001/#A-8-32), και στον **[GDPR](/gdpr/)** στο [32.1.δ](/gdpr/#32-1-δ). Ο καθένας έχει checklist σε Excel.

## Τι έρχεται στο Μέρος 6

Στο τελευταίο μέρος περνάμε από τις μεμονωμένες πολιτικές σε ένα πρόγραμμα: break-glass λογαριασμοί και ανάκαμψη από lockout, συγκρούσεις πολιτικών, governance με naming, ownership και change management, policy-as-code, hybrid και multi-tenant περιβάλλοντα, και ένα maturity model από το βασικό MFA σε ένα μετρήσιμο Zero Trust πρόγραμμα.

{{< if-published page="/posts/Conditional-Access-Series/conditional-access-meros-6-governance-zero-trust" >}}
> 📖 **Συνέχισε στο Μέρος 6:** [Governance και Zero Trust, από τις πολιτικές σε πρόγραμμα](/posts/conditional-access-series/conditional-access-meros-6-governance-zero-trust/)
{{< /if-published >}}

> 🔗 **Όλη η σειρά σε ένα σημείο:** τα 6 μέρη και η σειρά ανάγνωσης στη **[σελίδα της σειράς](/series/microsoft-entra-conditional-access/)**.

Ακολούθησέ με στο [LinkedIn](https://www.linkedin.com/in/dimosthenisatteia/) για ειδοποιήσεις νέων άρθρων.

## Πηγές και επαλήθευση {#last-verified}

{{< verification >}}

---

<!--
IMAGE NOTES
Cover: ca-meros-5.webp (1200x500, ίδια βάση με τη σειρά, ετικέτα «Μέρος 5»)
Εικόνα 6: ca-p5-diagnostic-flow.webp (δικό μας διάγραμμα, η Microsoft δεν έχει διαγνωστική μεθοδολογία σε διάγραμμα)
Επίσημες εικόνες της Microsoft από το MicrosoftDocs/entra-docs (άδεια MIT), με «© Microsoft» και link στη λεζάντα:
  ca-p5-what-if-conditions.webp    <- media/what-if-tool/supply-conditions-to-evaluate-in-the-what-if-tool.png
  ca-p5-what-if-result.webp        <- media/what-if-tool/conditional-access-what-if-evaluation-result-example.png
  ca-p5-more-details.webp          <- media/troubleshoot-conditional-access/image2.png
  ca-p5-service-dependency.webp    <- media/troubleshoot-conditional-access/service-dependency-example-sign-in.png
  ca-p5-audience-reporting.webp    <- media/troubleshoot-conditional-access/audience-reporting.png
  ca-p5-audit-log.webp             <- media/troubleshoot-policy-changes-audit-log/old-and-new-policy-properties.png
  ca-p5-workbook-impact.webp       <- media/howto-conditional-access-insights-reporting/workbook-impact-summary.png
  ca-p5-workbook-breakdown.webp    <- media/howto-conditional-access-insights-reporting/workbook-breakdown-condition-and-status.png
Save to content/images/Conditional-Access/
ΗΜΕΡΑ ΔΗΜΟΣΙΕΥΣΗΣ: draft: false, πραγματική date/lastmod, popup «Νέα στο blog» (STORAGE_KEY +1), homeHighlight: true, xlsx checklists, LinkedIn post.
-->
