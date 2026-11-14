/* Αναφορά .pdf του εργαλείου «Ποιος διαβάζει το mailbox σου;» · thecybersec.gr
   pdf: pdfmake (φορτώνει από το cdnjs μόνο όταν πατηθεί το κουμπί).
   Όλα γίνονται στον browser. Το αρχείο του χρήστη και η αναφορά δεν αποστέλλονται πουθενά.
   Καλείται από το shortcode inbox-rules-check: window.InboxRulesReport.pdf(ctx) */
(function () {
    'use strict';
    var C = { navy: '#0f172a', blue: '#2563eb', text: '#1e293b', muted: '#64748b', line: '#e2e8f0',
        red: '#be123c', redBg: '#ffe4e6', amber: '#b45309', amberBg: '#fef3c7', green: '#047857', greenBg: '#d1fae5' };

    function pad(n) { return (n < 10 ? '0' : '') + n; }
    function todayStr() { var d = new Date(); return pad(d.getDate()) + '/' + pad(d.getMonth() + 1) + '/' + d.getFullYear() + ' ' + pad(d.getHours()) + ':' + pad(d.getMinutes()); }
    function iso() { return new Date().toISOString().slice(0, 10); }
    function page(ctx) { return ctx.base + 'poios-diavazei-to-mailbox-sou/'; }

    // Αντιστοίχιση με τα πλαίσια: οι ίδιοι κωδικοί με τους οδηγούς του blog
    var MAP = [
        ['ΚΥΑ 1689/2025', 'kya-1689-2025/', [['24.ε', 'Τακτικός έλεγχος των καταγραφών για ύποπτη δραστηριότητα'], ['24.α', 'Πολιτική και διαδικασίες διαχείρισης περιστατικών'], ['20.γ', 'Φιλτράρισμα και έλεγχος των μηνυμάτων ηλεκτρονικού ταχυδρομείου']]],
        ['Οδηγία NIS2', 'nis2/', [['21.2.β', 'Χειρισμός περιστατικών'], ['23.4.α', 'Έγκαιρη προειδοποίηση εντός 24 ωρών για σημαντικό περιστατικό']]],
        ['ISO/IEC 27001:2022', 'iso-27001/', [['A.5.25', 'Assessment and decision on information security events'], ['A.5.26', 'Response to information security incidents'], ['A.8.16', 'Monitoring activities']]],
        ['GDPR', 'gdpr/', [['32.1.β', 'Διασφάλιση του απορρήτου και της ακεραιότητας των συστημάτων'], ['33.1', 'Γνωστοποίηση παραβίασης στην εποπτική αρχή εντός 72 ωρών']]]
    ];
    function anchor(code) { return '#' + code.replace(/\./g, '-'); }

    function terms(ctx) {
        var y = new Date().getFullYear();
        return [
            ['Δικαιούχος', '© ' + y + ' Δημοσθένης Αττέια, thecybersec.gr. Με επιφύλαξη παντός δικαιώματος.'],
            ['Τι προστατεύεται', 'Οι ερμηνείες στα Ελληνικά, η λογική βαθμολόγησης, τα προτεινόμενα βήματα και η δομή της αναφοράς είναι πρωτότυπο έργο του συντάκτη και προστατεύονται από τον ν. 2121/1993. Τα δεδομένα προέρχονται από το tenant του χρήστη. Οι ονομασίες των εντολών και των ρυθμίσεων ανήκουν στη Microsoft.'],
            ['Τι επιτρέπεται', 'Η χρήση της αναφοράς για τις εσωτερικές ανάγκες του οργανισμού σας, η επισύναψή της σε ticket ή φάκελο περιστατικού, και η επίδειξή της σε ελεγκτές και αρμόδιες αρχές.'],
            ['Τι απαγορεύεται χωρίς γραπτή άδεια του συντάκτη', 'Η αναδημοσίευση και η αναδιανομή της αναφοράς σε ιστότοπους ή μέσα κοινωνικής δικτύωσης, η εμπορική εκμετάλλευση και η αφαίρεση της αναφοράς στον συντάκτη και στην πηγή.'],
            ['Πώς το μοιράζεστε', 'Με παραπομπή στη σελίδα ' + page(ctx) + '.']
        ];
    }

    function pdf(ctx) {
        var dstr = todayStr(), y = new Date().getFullYear(), PAGE = page(ctx);
        var tone = ctx.top >= 3 ? [C.red, C.redBg] : ctx.top === 2 ? [C.amber, C.amberBg] : [C.green, C.greenBg];
        var content = [];

        content.push({
            table: { widths: ['*'], body: [[{
                stack: [
                    { text: 'ΕΛΕΓΧΟΣ INBOX RULES ΚΑΙ ΠΡΟΩΘΗΣΗΣ · EXCHANGE ONLINE', fontSize: 8, color: '#93c5fd', characterSpacing: 1.5 },
                    { text: 'Ποιος διαβάζει το mailbox σου;', fontSize: 20, bold: true, color: '#ffffff', margin: [0, 4, 0, 4] },
                    { text: 'Microsoft 365 · Exchange Online · Microsoft Defender XDR', fontSize: 9, color: '#cbd5e1' },
                    { text: [{ text: 'Δημιουργήθηκε  ', color: '#94a3b8' }, { text: dstr, color: '#ffffff' }], fontSize: 9, margin: [0, 10, 0, 0] }
                ], fillColor: C.navy, margin: [16, 16, 16, 16]
            }]] }, layout: 'noBorders', margin: [0, 0, 0, 12]
        });

        content.push({ table: { widths: ['*'], body: [[{ stack: [
            { text: 'ΣΥΜΠΕΡΑΣΜΑ', fontSize: 7.5, color: tone[0], characterSpacing: 1 },
            { text: ctx.verdict, fontSize: 13, bold: true, color: tone[0], margin: [0, 3, 0, 4] },
            { text: ctx.verdictText, fontSize: 9.5, color: C.text, lineHeight: 1.25 }
        ], fillColor: tone[1], margin: [12, 10, 12, 10] }]] }, layout: 'noBorders', margin: [0, 0, 0, 10] });

        content.push({ table: { widths: ctx.stats.map(function () { return '*'; }), body: [
            ctx.stats.map(function (s) { return { text: s[0].toUpperCase(), fontSize: 7, color: C.muted, characterSpacing: 0.8 }; }),
            ctx.stats.map(function (s, i) { return { text: String(s[1]), fontSize: 16, bold: true, color: i >= 2 && s[1] ? (i >= 4 ? C.amber : C.red) : C.text }; })
        ] }, layout: 'irTable', margin: [0, 0, 0, 6] });
        if (ctx.domains) content.push({ text: 'Domains του οργανισμού που θεωρήθηκαν εσωτερικά: ' + ctx.domains, style: 'note', margin: [0, 0, 0, 10] });

        content.push({ text: 'Ευρήματα ανά mailbox', style: 'h2' });
        if (!ctx.boxes.length) content.push({ text: 'Δεν βρέθηκε κανόνας ή προώθηση με εύρημα.', style: 'body' });
        ctx.boxes.forEach(function (b) {
            content.push({ text: [{ text: b.sev + '  ', bold: true, color: b.color }, { text: b.mb, bold: true, color: C.text }], fontSize: 10, margin: [0, 8, 0, 4] });
            content.push({ table: { headerRows: 1, widths: [120, 50, '*'], body: [[{ text: 'Τι', style: 'th' }, { text: 'Σοβαρότητα', style: 'th' }, { text: 'Εύρημα', style: 'th' }]].concat(b.items.map(function (it) {
                return [{ text: it.what, fontSize: 8, bold: true }, { text: it.sev, fontSize: 8, bold: true, color: it.color }, { text: it.text, fontSize: 8 }];
            })) }, layout: 'irTable' });
            if (b.cmds.length) content.push({ stack: [{ text: 'Αποκατάσταση (Exchange Online PowerShell)', fontSize: 7.5, color: C.muted, margin: [0, 4, 0, 2] }].concat(b.cmds.map(function (c) { return { text: c, fontSize: 7.5, color: C.text, font: 'Roboto', background: '#f1f5f9' }; })) });
        });
        if (ctx.clean) content.push({ text: ctx.clean + (ctx.clean === 1 ? ' mailbox' : ' mailboxes') + ' χωρίς εύρημα δεν εμφανίζονται στη λίστα.', style: 'note', margin: [0, 8, 0, 0] });

        content.push({ text: 'Τι κάνεις τώρα', style: 'h2', margin: [0, 12, 0, 6] });
        content.push({ ol: [
            'Απενεργοποίησε τους ύποπτους κανόνες και την εξωτερική προώθηση. Το Disable-InboxRule κρατά τον κανόνα ως τεκμήριο.',
            'Ακύρωσε τις ενεργές συνεδρίες (Revoke sessions) και άλλαξε τον κωδικό κάθε χρήστη με εύρημα «Υψηλό» ή «Κρίσιμο».',
            'Έλεγξε τις μεθόδους MFA, τις εφαρμογές με συναίνεση χρήστη και τους ρόλους του λογαριασμού.',
            'Τρέξε το KQL της επόμενης σελίδας για να δεις πότε και από ποια IP φτιάχτηκε κάθε κανόνας.',
            'Αποφάσισε αν είναι περιστατικό προς αναφορά: έγκαιρη προειδοποίηση εντός 24 ωρών για σημαντικό περιστατικό, γνωστοποίηση παραβίασης προσωπικών δεδομένων εντός 72 ωρών.',
            'Όρισε Automatic forwarding rules: Off στο outbound spam policy, με ξεχωριστή πολιτική μόνο για όσους χρειάζονται προώθηση.'
        ], fontSize: 9, lineHeight: 1.25 });

        content.push({ text: 'Σε ποιες απαιτήσεις αντιστοιχεί', style: 'h2', margin: [0, 12, 0, 6] });
        content.push({ text: 'Ο περιοδικός έλεγχος των inbox rules και της προώθησης, και η τεκμηρίωση της απόκρισης, υποστηρίζουν τις παρακάτω απαιτήσεις.', style: 'body', margin: [0, 0, 0, 6] });
        content.push({ table: { headerRows: 1, widths: [100, 50, '*'], body: [[{ text: 'Πλαίσιο', style: 'th' }, { text: 'Κωδικός', style: 'th' }, { text: 'Απαίτηση', style: 'th' }]].concat(MAP.reduce(function (acc, f) {
            f[2].forEach(function (r, i) { acc.push([{ text: i ? '' : f[0], bold: true, fontSize: 8.5 }, { text: r[0], fontSize: 8.5, color: C.blue, link: ctx.base + f[1] + anchor(r[0]) }, { text: r[1], fontSize: 8.5 }]); });
            return acc;
        }, [])) }, layout: 'irTable' });

        content.push({ text: 'KQL για το Advanced hunting', style: 'h1', pageBreak: 'before' });
        content.push({ text: 'Στο Microsoft Defender portal › Investigation & response › Hunting › Advanced hunting. Χρειάζεται ο πίνακας CloudAppEvents (Microsoft Defender for Cloud Apps ή connector του Microsoft 365).' + (ctx.mask ? ' Με την απόκρυψη διευθύνσεων, το query δεν φιλτράρει συγκεκριμένα mailboxes.' : ''), style: 'body', margin: [0, 0, 0, 6] });
        content.push({ table: { widths: ['*'], body: [[{ text: ctx.kql, fontSize: 7.5, color: C.text, fillColor: '#f1f5f9', margin: [6, 6, 6, 6] }]] }, layout: 'noBorders' });

        content.push({ text: 'Μεθοδολογία, όρια και όροι χρήσης', style: 'h1', margin: [0, 16, 0, 10] });
        content.push({ text: 'Πώς βγαίνει το αποτέλεσμα', style: 'h3' });
        content.push({ text: 'Κάθε κανόνας ελέγχεται για τα σημάδια που περιγράφει η Microsoft στα «Alert grading for suspicious inbox manipulation rules» και «Responding to a compromised email account»: προώθηση σε εξωτερική διεύθυνση, διαγραφή χωρίς φίλτρο, μετακίνηση σε φακέλους που ο χρήστης δεν ανοίγει (RSS Feeds, Conversation History, Archive), σήμανση ως αναγνωσμένο, λέξεις-κλειδιά για πληρωμές ή προειδοποιήσεις ασφάλειας, και ονόματα χωρίς γράμματα. Δύο ή περισσότερα σημάδια μαζί ανεβάζουν τη σοβαρότητα σε «Κρίσιμο». Ένας απενεργοποιημένος κανόνας πέφτει ένα επίπεδο.', style: 'body' });
        content.push({ text: 'Τι δεν μπορεί να πει', style: 'h3' });
        content.push({ text: 'Ένα εύρημα δεν αποδεικνύει παραβίαση: πολλοί νόμιμοι κανόνες διαγράφουν ή μετακινούν μηνύματα. Δεν ελέγχονται κανόνες που υπάρχουν μόνο στο Outlook της συσκευής, mail flow rules, δικαιώματα delegate ή εφαρμογές με πρόσβαση στο mailbox. Για την πλήρη εικόνα, συνδύασε την αναφορά με τα logs του KQL και τις συνδέσεις του χρήστη στο Microsoft Entra ID.', style: 'body' });
        content.push({ text: 'Απόρρητο', style: 'h3' });
        content.push({ text: 'Το αρχείο αναλύθηκε και η αναφορά δημιουργήθηκε μόνο μέσα στον browser του χρήστη. Τίποτα δεν αποστάλθηκε στο thecybersec.gr ή σε τρίτους.' + (ctx.mask ? ' Οι διευθύνσεις email εμφανίζονται με απόκρυψη και οι εντολές αποκατάστασης παραλείπονται.' : ''), style: 'body' });
        content.push({ text: 'Πνευματικά δικαιώματα και όροι χρήσης', style: 'h3' });
        content.push({ table: { widths: [120, '*'], body: terms(ctx).map(function (t) { return [{ text: t[0], bold: true, fontSize: 8.5, color: C.text }, { text: t[1], fontSize: 8.5 }]; }) }, layout: 'irTable' });

        var doc = {
            pageSize: 'A4', pageMargins: [40, 54, 40, 48],
            info: { title: 'Ποιος διαβάζει το mailbox σου; Έλεγχος inbox rules', author: 'thecybersec.gr', subject: 'Exchange Online inbox rules', creator: 'thecybersec.gr' },
            header: function (cur) {
                if (cur === 1) return null;
                return { columns: [{ text: 'Ποιος διαβάζει το mailbox σου; · ' + dstr, fontSize: 7.5, color: C.muted }, { text: 'thecybersec.gr', fontSize: 7.5, color: C.blue, alignment: 'right', link: PAGE }], margin: [40, 24, 40, 0] };
            },
            footer: function (cur, total) {
                return { columns: [{ text: '© ' + y + ' Δημοσθένης Αττέια · thecybersec.gr · Ενδεικτικό αποτέλεσμα', fontSize: 7, color: C.muted }, { text: 'Σελίδα ' + cur + ' από ' + total, fontSize: 7.5, color: C.muted, alignment: 'right' }], margin: [40, 16, 40, 0] };
            },
            content: content,
            defaultStyle: { font: 'Roboto', fontSize: 9.5, color: '#334155', lineHeight: 1.15 },
            styles: {
                h1: { fontSize: 16, bold: true, color: C.navy, margin: [0, 0, 0, 10] },
                h2: { fontSize: 11.5, bold: true, color: C.navy, margin: [0, 6, 0, 6] },
                h3: { fontSize: 10.5, bold: true, color: C.navy, margin: [0, 10, 0, 5] },
                th: { bold: true, fontSize: 8.5, color: '#ffffff', fillColor: C.navy },
                note: { fontSize: 8.5, color: C.muted, lineHeight: 1.25 },
                body: { fontSize: 9.5, lineHeight: 1.3 }
            }
        };
        var layouts = { irTable: {
            hLineWidth: function (i, node) { return i === 0 || i === node.table.body.length ? 0 : 0.5; }, vLineWidth: function () { return 0; },
            hLineColor: function () { return C.line; }, paddingTop: function () { return 4; }, paddingBottom: function () { return 4; },
            paddingLeft: function () { return 6; }, paddingRight: function () { return 6; }
        } };
        return new Promise(function (res) { window.pdfMake.createPdf(doc, layouts).download('poios-diavazei-to-mailbox-sou-' + iso() + '.pdf', res); });
    }

    window.InboxRulesReport = { pdf: pdf };
})();
