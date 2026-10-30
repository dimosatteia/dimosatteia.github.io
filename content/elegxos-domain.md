---
title: "Έλεγχος domain: SPF, DKIM, DMARC με Microsoft 365"
date: 2026-10-11T19:25:00+03:00
lastmod: 2026-10-11T19:30:00+03:00
draft: false
url: "/elegxos-domain/"
# Το link στο μενού ορίζεται εδώ, ώστε να εμφανίζεται μόνο όταν η σελίδα είναι δημοσιευμένη.
menu:
  main:
    identifier: tool-domain
    parent: tools
    name: "📧 Έλεγχος domain: SPF, DKIM, DMARC"
    weight: 2
author: "Dimosthenis Atteia"
description: "Δωρεάν έλεγχος email authentication για το domain σου: SPF, DKIM, DMARC, MTA-STS και DNSSEC, με τη ρύθμιση του Microsoft 365 που διορθώνει κάθε εύρημα."
keywords:
  - έλεγχος SPF DKIM DMARC
  - έλεγχος domain email
  - DMARC Microsoft 365
  - DKIM Microsoft 365 selector1 selector2
  - SPF spf.protection.outlook.com
  - MTA-STS Exchange Online
showToc: false
ShowReadingTime: false
ShowBreadCrumbs: false
hideMeta: true
# Πλαίσιο «Last verified»: κάθε οδηγία του Microsoft 365 με την πηγή και την ημερομηνία ελέγχου
verification:
  - feature: "SPF για Microsoft 365: v=spf1 include:spf.protection.outlook.com -all"
    status: "Generally Available"
    license: "Exchange Online"
    source: "https://learn.microsoft.com/en-us/microsoft-365/enterprise/external-domain-name-system-records"
    verified: 2026-10-14
  - feature: "DKIM: CNAME selector1 και selector2, Rotate-DkimSigningConfig -KeySize 2048"
    status: "Generally Available"
    license: "Exchange Online"
    source: "https://learn.microsoft.com/en-us/defender-office-365/email-authentication-dkim-configure"
    verified: 2026-10-14
  - feature: "DMARC: p=none, p=quarantine, p=reject και Honor DMARC record policy"
    status: "Generally Available"
    license: "Exchange Online"
    source: "https://learn.microsoft.com/en-us/defender-office-365/email-authentication-dmarc-configure"
    verified: 2026-10-14
  - feature: "Inbound MTA-STS στο Exchange Online"
    status: "Generally Available"
    license: "Exchange Online"
    source: "https://learn.microsoft.com/en-us/exchange/security-and-compliance/enhance-mail-flow-using-strict-transport-security"
    verified: 2026-10-14
  - feature: "Inbound SMTP DANE with DNSSEC (MX στο mx.microsoft)"
    status: "Generally Available"
    license: "Exchange Online"
    source: "https://learn.microsoft.com/en-us/exchange/security-and-compliance/how-dane-secures-email"
    verified: 2026-10-14
  - feature: "Εγγραφές DNS: autodiscover, enterpriseregistration, enterpriseenrollment, msoid μόνο για 21Vianet"
    status: "Generally Available"
    license: "Microsoft 365"
    source: "https://learn.microsoft.com/en-us/microsoft-365/enterprise/external-domain-name-system-records"
    verified: 2026-10-14
cover:
  image: "/images/tools/elegxos-domain.webp"
  alt: "Έλεγχος των DNS records SPF, DKIM, DMARC, MTA-STS και DNSSEC ενός domain, με στόχο DMARC σε quarantine ή reject"
  maxWidth: 800
categories: ["Email & Collaboration"]
tags:
  - Email Security
  - Exchange Online
  - Microsoft Defender for Office 365
  - Microsoft 365 Security
  - NIS2
  - ISO 27001
# MITRE ATT&CK®: ονόματα στο data/mitre.yaml
mitre: ["T1684.002", "M1054"]
---

Γράψε το domain από το οποίο στέλνεις email και δες αν μπορεί κάποιος να στείλει μηνύματα στο όνομά σου. Ο έλεγχος διαβάζει τις δημόσιες εγγραφές DNS, και για κάθε εύρημα σου δείχνει τη ρύθμιση του Microsoft 365 που το διορθώνει. Δεν χρειάζεται εγγραφή.

{{< domain-check >}}

## Τι ελέγχεται

| Έλεγχος | Τι σημαίνει | Βαρύτητα |
|---|---|---|
| **SPF** | Ποιοι servers επιτρέπεται να στέλνουν email για το domain | Βασικός |
| **DKIM** | Ψηφιακή υπογραφή που αποδεικνύει ότι το μήνυμα δεν αλλοιώθηκε | Βασικός |
| **DMARC** | Τι κάνει ο παραλήπτης όταν αποτυγχάνουν SPF και DKIM, και πού στέλνει αναφορές | Βασικός |
| **MX** | Πού παραδίδεται το email και αν υπάρχει δρόμος που προσπερνά το φίλτρο | Βασικός |
| **MTA-STS** | Υποχρεωτική κρυπτογράφηση TLS για τα εισερχόμενα | Προαιρετικός |
| **TLS-RPT** | Αναφορές για αποτυχίες TLS | Προαιρετικός |
| **DNSSEC και DANE** | Κρυπτογραφική επαλήθευση του DNS και του πιστοποιητικού του mail server | Προαιρετικός |
| **Εγγραφές Microsoft 365** | Αν τα `autodiscover`, `enterpriseregistration` και `enterpriseenrollment` δείχνουν σωστά, και αν έχει μείνει το `msoid` | Μόνο για domains με Microsoft 365 |

Μέσα στους τρεις βασικούς ελέγχους εξετάζονται και οι λεπτομέρειες που χαλάνε συχνά: το όριο των 10 DNS lookups στο SPF, το μήκος του κλειδιού DKIM, και το αν ο παραλήπτης των αναφορών DMARC έχει δηλώσει ότι τις δέχεται.

Η σειρά διόρθωσης είναι SPF, μετά DKIM, μετά DMARC. Το DMARC στηρίζεται στα άλλα δύο: αν το βάλεις σε `p=reject` πριν περνούν όλοι οι νόμιμοι αποστολείς σου, θα χάσεις δικά σου μηνύματα.

## Τι δεν ελέγχεται

- **Το DKIM δεν επιβεβαιώνεται πάντα.** Ο selector του DKIM μπορεί να έχει οποιοδήποτε όνομα. Ο έλεγχος δοκιμάζει τους `selector1` και `selector2` του Microsoft 365 και μερικούς συνηθισμένους. Αν χρησιμοποιείς άλλη υπηρεσία με δικό της selector, το αποτέλεσμα θα είναι «Δεν επιβεβαιώθηκε».
- **Το website.** Το πιστοποιητικό TLS και τα security headers ενός site δεν ελέγχονται από εδώ, γιατί ο browser δεν επιτρέπει τέτοιον έλεγχο σε ξένο domain.
- **Το αρχείο πολιτικής του MTA-STS.** Ελέγχεται μόνο η εγγραφή DNS.
- **Τα subdomains.** Ο έλεγχος αφορά ακριβώς το domain που γράφεις. Αν στέλνεις από subdomain (π.χ. `news.example.gr`), έλεγξέ το ξεχωριστά.

## Γιατί έχει σημασία για τη συμμόρφωση

Η ΚΥΑ 1689/2025 ζητά φιλτράρισμα και έλεγχο των μηνυμάτων ηλεκτρονικού ταχυδρομείου ([απαίτηση 20.γ](/kya-1689-2025/#20-γ)). Τα SPF, DKIM και DMARC είναι η βάση αυτού του ελέγχου: χωρίς αυτά, ούτε το δικό σου φίλτρο ούτε των παραληπτών σου μπορεί να ξεχωρίσει ένα γνήσιο μήνυμα από ένα πλαστό. Οι εγγραφές DNS και οι αναφορές DMARC είναι τεκμήρια που μπορείς να δείξεις σε έναν έλεγχο.

{{< tool-link page="/elegxos-ypagogis" lead="Δεν ξέρεις αν σε αφορά η ΚΥΑ 1689/2025;" label="Κάνε τον έλεγχο υπαγωγής" tail="σε πέντε ερωτήσεις." >}}

{{< tool-link page="/giati-pige-sta-junk" lead="Ένα email πήγε στα Junk ή στην καραντίνα;" label="Ανάλυσε τα headers του" tail="και δες ποιο κομμάτι του φίλτρου το αποφάσισε." >}}

## Απόρρητο

Το thecybersec.gr δεν έχει server που να δέχεται το domain που πληκτρολογείς. Τα ερωτήματα DNS φεύγουν από τον browser σου απευθείας προς τον δημόσιο resolver της Cloudflare (`cloudflare-dns.com`) και, αν αυτός δεν απαντήσει, της Google (`dns.google`). Οι δύο πάροχοι βλέπουν τη διεύθυνση IP σου και το domain που ρωτάς, όπως κάθε DNS resolver. Έλεγξε μόνο domains που σου ανήκουν ή που έχεις άδεια να αξιολογήσεις. Περισσότερα στην [πολιτική απορρήτου](/privacy/).

## Πηγές και επαλήθευση {#last-verified}

{{< verification >}}
