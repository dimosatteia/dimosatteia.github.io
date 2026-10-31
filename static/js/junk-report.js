/* Αναφορά .pdf του εργαλείου «Γιατί πήγε στα Junk;» · thecybersec.gr
   pdf: pdfmake (φορτώνει από το cdnjs μόνο όταν πατηθεί το κουμπί).
   Όλα γίνονται στον browser. Τα headers και η αναφορά δεν αποστέλλονται πουθενά.
   Καλείται από το shortcode junk-check: window.JunkReport.pdf(ctx) */
(function () {
    'use strict';
    var C = { navy: '#0f172a', blue: '#2563eb', text: '#1e293b', muted: '#64748b', line: '#e2e8f0',
        red: '#be123c', redBg: '#ffe4e6', amber: '#b45309', amberBg: '#fef3c7', green: '#047857', greenBg: '#d1fae5',
        sky: '#1d4ed8', skyBg: '#dbeafe', gray: '#475569', grayBg: '#f1f5f9' };
    var TONE = { red: [C.red, C.redBg], amber: [C.amber, C.amberBg], green: [C.green, C.greenBg], blue: [C.sky, C.skyBg], gray: [C.gray, C.grayBg] };

    function pad(n) { return (n < 10 ? '0' : '') + n; }
    function todayStr() { var d = new Date(); return pad(d.getDate()) + '/' + pad(d.getMonth() + 1) + '/' + d.getFullYear() + ' ' + pad(d.getHours()) + ':' + pad(d.getMinutes()); }
    function iso() { return new Date().toISOString().slice(0, 10); }
    function page(ctx) { return ctx.base + 'giati-pige-sta-junk/'; }

    // Αντιστοίχιση με τα πλαίσια: οι ίδιοι κωδικοί με τους οδηγούς του blog
    var MAP = [
        ['ΚΥΑ 1689/2025', 'kya-1689-2025/', [['20.γ', 'Φιλτράρισμα και έλεγχος των μηνυμάτων ηλεκτρονικού ταχυδρομείου για κακόβουλα ή ανεπιθύμητα μηνύματα'], ['20.α', 'Ανίχνευση και εξουδετέρωση κακόβουλου λογισμικού']]],
        ['Οδηγία NIS2', 'nis2/', [['21.2.β', 'Χειρισμός περιστατικών'], ['21.2.ζ', 'Βασικές πρακτικές κυβερνοϋγιεινής και κατάρτιση']]],
        ['ISO/IEC 27001:2022', 'iso-27001/', [['A.8.7', 'Protection against malware'], ['A.5.25', 'Assessment and decision on information security events'], ['A.6.8', 'Information security event reporting']]],
        ['GDPR', 'gdpr/', [['32.1.β', 'Διασφάλιση του απορρήτου, της ακεραιότητας και της διαθεσιμότητας των συστημάτων']]]
    ];
    function anchor(code) { return '#' + code.replace(/\./g, '-'); }

    function terms(ctx) {
        var y = new Date().getFullYear();
        return [
            ['Δικαιούχος', '© ' + y + ' Δημοσθένης Αττέια, thecybersec.gr. Με επιφύλαξη παντός δικαιώματος.'],
            ['Τι προστατεύεται', 'Οι ερμηνείες στα Ελληνικά, η λογική απόφασης, τα προτεινόμενα βήματα και η δομή της αναφοράς είναι πρωτότυπο έργο του συντάκτη και προστατεύονται από τον ν. 2121/1993. Οι τιμές των headers προέρχονται από το μήνυμα του χρήστη. Οι ονομασίες των πεδίων και των ρυθμίσεων ανήκουν στη Microsoft.'],
            ['Τι επιτρέπεται', 'Η χρήση της αναφοράς για τις εσωτερικές ανάγκες του οργανισμού σας, η επισύναψή της σε ticket ή φάκελο συμβάντος, και η επίδειξή της σε ελεγκτές και αρμόδιες αρχές.'],
            ['Τι απαγορεύεται χωρίς γραπτή άδεια του συντάκτη', 'Η αναδημοσίευση και η αναδιανομή της αναφοράς σε ιστότοπους ή μέσα κοινωνικής δικτύωσης, η εμπορική εκμετάλλευση και η αφαίρεση της αναφοράς στον συντάκτη και στην πηγή.'],
            ['Πώς το μοιράζεστε', 'Με παραπομπή στη σελίδα ' + page(ctx) + '.']
        ];
    }

    function pdf(ctx) {
        var dstr = todayStr(), y = new Date().getFullYear(), PAGE = page(ctx), tone = TONE[ctx.tone] || TONE.gray;
        var content = [];

        content.push({
            table: { widths: ['*'], body: [[{
                stack: [
                    { text: 'ΑΝΑΛΥΣΗ EMAIL HEADERS · MICROSOFT 365', fontSize: 8, color: '#93c5fd', characterSpacing: 1.5 },
                    { text: 'Γιατί πήγε στα Junk;', fontSize: 20, bold: true, color: '#ffffff', margin: [0, 4, 0, 4] },
                    { text: 'Exchange Online Protection · Microsoft Defender for Office 365', fontSize: 9, color: '#cbd5e1' },
                    { text: [{ text: 'Δημιουργήθηκε  ', color: '#94a3b8' }, { text: dstr, color: '#ffffff' }], fontSize: 9, margin: [0, 10, 0, 0] }
                ], fillColor: C.navy, margin: [16, 16, 16, 16]
            }]] }, layout: 'noBorders', margin: [0, 0, 0, 12]
        });

        var meta = [['Από', ctx.from], ['Προς', ctx.to], ['Θέμα', ctx.subject], ['Ημερομηνία', ctx.date], ['Message-ID', ctx.msgid]].filter(function (r) { return r[1]; });
        if (meta.length) content.push({ table: { widths: [80, '*'], body: meta.map(function (r) { return [{ text: r[0], color: C.muted, fontSize: 8.5 }, { text: r[1], fontSize: 8.5 }]; }) }, layout: 'jcTable', margin: [0, 0, 0, 10] });

        content.push({ table: { widths: ['*'], body: [[{ stack: [
            { text: 'ΤΙ ΑΠΟΦΑΣΙΣΕ ΤΟ MICROSOFT 365', fontSize: 7.5, color: tone[0], characterSpacing: 1 },
            { text: ctx.title, fontSize: 14, bold: true, color: tone[0], margin: [0, 3, 0, 4] },
            { text: ctx.why, fontSize: 9.5, color: C.text, lineHeight: 1.25 },
            { text: [{ text: 'Πού πηγαίνει συνήθως: ', color: C.muted }, { text: ctx.where }], fontSize: 9, margin: [0, 6, 0, 0] }
        ], fillColor: tone[1], margin: [12, 10, 12, 10] }]] }, layout: 'noBorders', margin: [0, 0, 0, 10] });

        content.push({ text: 'Τι κάνεις τώρα', style: 'h2' });
        content.push({ ol: ctx.steps.map(function (s) { return { stack: [{ text: s.t, bold: true, color: C.text }, { text: s.b, fontSize: 8.5, color: '#334155', margin: [0, 1, 0, 0] }], margin: [0, 0, 0, 5] }; }), fontSize: 9.5 });

        if (ctx.auth && ctx.auth.length) {
            content.push({ text: 'Ταυτοποίηση αποστολέα', style: 'h2', margin: [0, 10, 0, 6] });
            content.push({ table: { headerRows: 1, widths: [58, 130, '*'], body: [[{ text: 'Έλεγχος', style: 'th' }, { text: 'Αποτέλεσμα', style: 'th' }, { text: 'Τι σημαίνει', style: 'th' }]].concat(ctx.auth.map(function (r) {
                var t = TONE[r.tone] || TONE.gray;
                return [{ text: r.name, bold: true, fontSize: 8.5 }, { text: r.value, fontSize: 8, color: t[0], bold: true }, { text: r.text, fontSize: 8 }];
            })) }, layout: 'jcTable' });
        }

        if (ctx.fields && ctx.fields.length) {
            content.push({ text: 'Τα πεδία του φίλτρου', style: 'h2', margin: [0, 10, 0, 6] });
            content.push({ table: { headerRows: 1, widths: [62, 110, '*'], body: [[{ text: 'Πεδίο', style: 'th' }, { text: 'Τιμή', style: 'th' }, { text: 'Τι σημαίνει', style: 'th' }]].concat(ctx.fields.map(function (r) {
                return [{ text: r.k, bold: true, fontSize: 8 }, { text: r.v, fontSize: 8 }, { text: r.t, fontSize: 8 }];
            })) }, layout: 'jcTable' });
        }

        if (ctx.hops && ctx.hops.length) {
            content.push({ text: 'Η διαδρομή του μηνύματος', style: 'h2', margin: [0, 10, 0, 6] });
            content.push({ table: { headerRows: 1, widths: [14, '*', '*', 76, 62], body: [[{ text: '#', style: 'th' }, { text: 'Από', style: 'th' }, { text: 'Προς', style: 'th' }, { text: 'Ώρα', style: 'th' }, { text: 'Καθυστέρηση', style: 'th' }]].concat(ctx.hops.map(function (h, i) {
                return [{ text: String(i + 1), fontSize: 7.5, color: C.muted }, { text: (h.from || 'άγνωστο') + (h.ip ? ' [' + h.ip + ']' : '') + (h.tls === 'no' ? ' · χωρίς TLS' : h.tls === 'yes' ? ' · TLS' : ''), fontSize: 7.5, color: h.tls === 'no' ? C.red : C.text }, { text: h.by || 'άγνωστο', fontSize: 7.5 }, { text: h.date || '', fontSize: 7.5 }, { text: h.delay || '', fontSize: 7.5, color: h.slow ? C.amber : C.text, bold: !!h.slow }];
            })) }, layout: 'jcTable' });
            if (ctx.total) content.push({ text: 'Συνολικός χρόνος: ' + ctx.total, style: 'note', margin: [0, 4, 0, 0] });
            if (ctx.plain) content.push({ text: (ctx.plain === 1 ? '1 βήμα' : ctx.plain + ' βήματα') + ' της διαδρομής έγιναν χωρίς κρυπτογράφηση (TLS).', style: 'note', color: C.red });
            if (ctx.gateways && ctx.gateways.length) content.push({ text: 'Υπηρεσία τρίτου πριν το Microsoft 365: ' + ctx.gateways.join(', ') + '.', style: 'note', color: C.amber });
        }

        content.push({ text: 'Σε ποιες απαιτήσεις αντιστοιχεί', style: 'h2', margin: [0, 12, 0, 6] });
        content.push({ text: 'Η ανάλυση ενός μηνύματος που φιλτραρίστηκε, και η τεκμηρίωση της απόφασης, υποστηρίζουν τις παρακάτω απαιτήσεις. Κράτησε την αναφορά μαζί με το submission ID, αν στάλθηκε στη Microsoft.', style: 'body', margin: [0, 0, 0, 6] });
        content.push({ table: { headerRows: 1, widths: [100, 50, '*'], body: [[{ text: 'Πλαίσιο', style: 'th' }, { text: 'Κωδικός', style: 'th' }, { text: 'Απαίτηση', style: 'th' }]].concat(MAP.reduce(function (acc, f) {
            f[2].forEach(function (r, i) { acc.push([{ text: i ? '' : f[0], bold: true, fontSize: 8.5 }, { text: r[0], fontSize: 8.5, color: C.blue, link: ctx.base + f[1] + anchor(r[0]) }, { text: r[1], fontSize: 8.5 }]); });
            return acc;
        }, [])) }, layout: 'jcTable' });

        content.push({ text: 'Μεθοδολογία, όρια και όροι χρήσης', style: 'h1', pageBreak: 'before' });
        content.push({ text: 'Πώς βγαίνει το αποτέλεσμα', style: 'h3' });
        content.push({ text: 'Η απόφαση προκύπτει από τα πεδία CAT (κατηγορία απειλής) και SFV (απόφαση φίλτρου spam) του X-Forefront-Antispam-Report, το BCL του X-Microsoft-Antispam, το X-CustomSpam και το Authentication-Results, όπως τα τεκμηριώνει η Microsoft. Το SCL δεν χρησιμοποιείται για την κρίση, γιατί στο cloud δεν καθορίζει την απόφαση ούτε την ενέργεια. Τα headers με κατάληξη -Untrusted, που προσθέτει το Microsoft 365 του αποστολέα, δεν λαμβάνονται υπόψη.', style: 'body' });
        content.push({ text: 'Τι δεν μπορεί να πει', style: 'h3' });
        content.push({ text: 'Τα headers δείχνουν την απόφαση του φίλτρου, όχι πάντα τον τελικό φάκελο, που εξαρτάται από την πολιτική του παραλήπτη. Δεν φαίνονται inbox rules, ενέργειες του χρήστη μετά την παράδοση ή ενέργειες ZAP. Η αντιστοίχιση των domains για το alignment είναι προσεγγιστική για σπάνια domains δεύτερου επιπέδου. Για την πλήρη εικόνα, χρησιμοποίησε το Message trace και το Threat Explorer ή το Real-time detections.', style: 'body' });
        content.push({ text: 'Απόρρητο', style: 'h3' });
        content.push({ text: 'Τα headers αναλύθηκαν και η αναφορά δημιουργήθηκε μόνο μέσα στον browser του χρήστη. Τίποτα δεν αποστάλθηκε στο thecybersec.gr ή σε τρίτους.' + (ctx.mask ? ' Οι διευθύνσεις email εμφανίζονται με απόκρυψη.' : ''), style: 'body' });
        content.push({ text: 'Πνευματικά δικαιώματα και όροι χρήσης', style: 'h3' });
        content.push({ table: { widths: [120, '*'], body: terms(ctx).map(function (t) { return [{ text: t[0], bold: true, fontSize: 8.5, color: C.text }, { text: t[1], fontSize: 8.5 }]; }) }, layout: 'jcTable' });

        var doc = {
            pageSize: 'A4', pageMargins: [40, 54, 40, 48],
            info: { title: 'Γιατί πήγε στα Junk; Ανάλυση email headers', author: 'thecybersec.gr', subject: 'Microsoft 365 email headers', creator: 'thecybersec.gr' },
            header: function (cur) {
                if (cur === 1) return null;
                return { columns: [{ text: 'Γιατί πήγε στα Junk; · ' + dstr, fontSize: 7.5, color: C.muted }, { text: 'thecybersec.gr', fontSize: 7.5, color: C.blue, alignment: 'right', link: PAGE }], margin: [40, 24, 40, 0] };
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
        var layouts = { jcTable: {
            hLineWidth: function (i, node) { return i === 0 || i === node.table.body.length ? 0 : 0.5; }, vLineWidth: function () { return 0; },
            hLineColor: function () { return C.line; }, paddingTop: function () { return 4; }, paddingBottom: function () { return 4; },
            paddingLeft: function () { return 6; }, paddingRight: function () { return 6; }
        } };
        return new Promise(function (res) { window.pdfMake.createPdf(doc, layouts).download('giati-pige-sta-junk-' + iso() + '.pdf', res); });
    }

    window.JunkReport = { pdf: pdf };
})();
