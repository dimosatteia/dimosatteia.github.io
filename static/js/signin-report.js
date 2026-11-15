/* Αναφορά .pdf του εργαλείου «Ποιος χτυπάει την πόρτα σου;» · thecybersec.gr
   pdf: pdfmake (φορτώνει από το cdnjs μόνο όταν πατηθεί το κουμπί).
   Όλα γίνονται στον browser. Τα logs του χρήστη και η αναφορά δεν αποστέλλονται πουθενά.
   Καλείται από το shortcode signin-check: window.SigninReport.pdf(ctx) */
(function () {
    'use strict';
    var C = { navy: '#0f172a', blue: '#2563eb', text: '#1e293b', muted: '#64748b', line: '#e2e8f0',
        red: '#be123c', redBg: '#ffe4e6', amber: '#b45309', amberBg: '#fef3c7', green: '#047857', greenBg: '#d1fae5' };

    function pad(n) { return (n < 10 ? '0' : '') + n; }
    function todayStr() { var d = new Date(); return pad(d.getDate()) + '/' + pad(d.getMonth() + 1) + '/' + d.getFullYear() + ' ' + pad(d.getHours()) + ':' + pad(d.getMinutes()); }
    function iso() { return new Date().toISOString().slice(0, 10); }
    function nf(n) { try { return Number(n).toLocaleString('el-GR'); } catch (e) { return String(n); } }
    function page(ctx) { return ctx.base + 'poios-xtypaei-tin-porta-sou/'; }

    // Αντιστοίχιση με τα πλαίσια: οι ίδιοι κωδικοί με τους οδηγούς του blog
    var MAP = [
        ['ΚΥΑ 1689/2025', 'kya-1689-2025/', [['24.ε', 'Τακτικός έλεγχος των καταγραφών για ύποπτη δραστηριότητα'], ['13.ζ', 'Πολυπαραγοντική αυθεντικοποίηση (MFA) όπου απαιτείται με βάση την κρισιμότητα'], ['13.α', 'Πολιτική και διαδικασίες λογικού ελέγχου πρόσβασης']]],
        ['Οδηγία NIS2', 'nis2/', [['21.2.ι', 'Χρήση λύσεων πολυπαραγοντικής ή συνεχούς επαλήθευσης ταυτότητας'], ['21.2.β', 'Χειρισμός περιστατικών']]],
        ['ISO/IEC 27001:2022', 'iso-27001/', [['A.8.15', 'Logging'], ['A.8.16', 'Monitoring activities'], ['A.8.5', 'Secure authentication']]],
        ['GDPR', 'gdpr/', [['32.1.β', 'Διασφάλιση του απορρήτου και της ακεραιότητας των συστημάτων'], ['33.1', 'Γνωστοποίηση παραβίασης στην εποπτική αρχή εντός 72 ωρών']]]
    ];
    function anchor(code) { return '#' + code.replace(/\./g, '-'); }

    function terms(ctx) {
        var y = new Date().getFullYear();
        return [
            ['Δικαιούχος', '© ' + y + ' Δημοσθένης Αττέια, thecybersec.gr. Με επιφύλαξη παντός δικαιώματος.'],
            ['Τι προστατεύεται', 'Οι ερμηνείες στα Ελληνικά, η λογική βαθμολόγησης, τα προτεινόμενα βήματα και η δομή της αναφοράς είναι πρωτότυπο έργο του συντάκτη και προστατεύονται από τον ν. 2121/1993. Τα δεδομένα προέρχονται από το tenant του χρήστη. Οι ονομασίες των υπηρεσιών και των ρυθμίσεων ανήκουν στη Microsoft.'],
            ['Τι επιτρέπεται', 'Η χρήση της αναφοράς για τις εσωτερικές ανάγκες του οργανισμού σας, η επισύναψή της σε ticket ή φάκελο περιστατικού, και η επίδειξή της σε ελεγκτές και αρμόδιες αρχές.'],
            ['Τι απαγορεύεται χωρίς γραπτή άδεια του συντάκτη', 'Η αναδημοσίευση και η αναδιανομή της αναφοράς σε ιστότοπους ή μέσα κοινωνικής δικτύωσης, η εμπορική εκμετάλλευση και η αφαίρεση της αναφοράς στον συντάκτη και στην πηγή.'],
            ['Πώς το μοιράζεστε', 'Με παραπομπή στη σελίδα ' + page(ctx) + '.']
        ];
    }

    function pdf(ctx) {
        var dstr = todayStr(), y = new Date().getFullYear(), PAGE = page(ctx);
        var tone = ctx.top >= 3 ? [C.red, C.redBg] : ctx.top === 2 ? [C.amber, C.amberBg] : [C.green, C.greenBg];
        var content = [];

        content.push({ table: { widths: ['*'], body: [[{ stack: [
            { text: 'ΕΛΕΓΧΟΣ SIGN-IN LOGS · MICROSOFT ENTRA ID', fontSize: 8, color: '#93c5fd', characterSpacing: 1.5 },
            { text: 'Ποιος χτυπάει την πόρτα σου;', fontSize: 20, bold: true, color: '#ffffff', margin: [0, 4, 0, 4] },
            { text: 'Password spray · Brute force · MFA · Legacy authentication · Χώρες', fontSize: 9, color: '#cbd5e1' },
            { text: [{ text: 'Περίοδος  ', color: '#94a3b8' }, { text: ctx.period, color: '#ffffff' }, { text: '    Δημιουργήθηκε  ', color: '#94a3b8' }, { text: dstr, color: '#ffffff' }], fontSize: 9, margin: [0, 10, 0, 0] }
        ], fillColor: C.navy, margin: [16, 16, 16, 16] }]] }, layout: 'noBorders', margin: [0, 0, 0, 12] });

        content.push({ table: { widths: ['*'], body: [[{ stack: [
            { text: 'ΣΥΜΠΕΡΑΣΜΑ', fontSize: 7.5, color: tone[0], characterSpacing: 1 },
            { text: ctx.verdict, fontSize: 13, bold: true, color: tone[0], margin: [0, 3, 0, 4] },
            { text: ctx.verdictText, fontSize: 9.5, color: C.text, lineHeight: 1.25 }
        ], fillColor: tone[1], margin: [12, 10, 12, 10] }]] }, layout: 'noBorders', margin: [0, 0, 0, 10] });

        content.push({ table: { widths: ctx.stats.map(function () { return '*'; }), body: [
            ctx.stats.map(function (s) { return { text: s[0].toUpperCase(), fontSize: 7, color: C.muted, characterSpacing: 0.6 }; }),
            ctx.stats.map(function (s, i) { return { text: nf(s[1]), fontSize: 15, bold: true, color: i >= 4 && s[1] ? C.red : C.text }; })
        ] }, layout: 'siTable', margin: [0, 0, 0, 6] });
        content.push({ text: 'Χώρες του οργανισμού: ' + (ctx.home || '—') + ' · Δικές σου IP, που εξαιρούνται από το password spray: ' + (ctx.own || 'καμία'), style: 'note', margin: [0, 0, 0, 10] });

        content.push({ text: 'Ευρήματα', style: 'h2' });
        if (!ctx.findings.length) content.push({ text: 'Δεν βρέθηκε ύποπτη σύνδεση στα logs που αναλύθηκαν.', style: 'body' });
        ctx.findings.forEach(function (f) {
            content.push({ unbreakable: true, margin: [0, 4, 0, 4], table: { widths: [56, '*'], body: [[
                { text: f.sev, bold: true, fontSize: 8.5, color: f.color },
                { stack: [
                    { text: f.title, bold: true, fontSize: 9, color: C.text },
                    { text: f.why, fontSize: 8.5, color: C.muted, margin: [0, 2, 0, 0] },
                    f.fix ? { text: [{ text: 'Τι κάνεις: ', bold: true, color: C.text }, f.fix], fontSize: 8.5, margin: [0, 2, 0, 0] } : { text: '' },
                    f.who ? { text: [{ text: 'Χρήστες: ', bold: true, color: C.text }, f.who], fontSize: 8.5, margin: [0, 2, 0, 0] } : { text: '' },
                    f.ca ? { text: [{ text: 'Conditional Access: ', bold: true, color: C.text }, f.ca], fontSize: 8.5, margin: [0, 2, 0, 0] } : { text: '' },
                    f.mitre ? { text: 'MITRE ATT&CK ' + f.mitre, fontSize: 7.5, color: C.muted, margin: [0, 2, 0, 0] } : { text: '' }
                ] }
            ]] }, layout: 'siTable' });
        });

        content.push({ text: 'Χώρες', style: 'h2', margin: [0, 12, 0, 6] });
        content.push({ table: { headerRows: 1, widths: ['*', 60, 60, 50], body: [[{ text: 'Χώρα', style: 'th' }, { text: 'Επιτυχίες', style: 'th' }, { text: 'Αποτυχίες', style: 'th' }, { text: 'Χρήστες', style: 'th' }]].concat(ctx.countries.map(function (c) {
            var col = c.hot ? C.red : c.home ? C.green : C.text;
            return [{ text: c.name + (c.home ? ' · δική σου' : ''), fontSize: 8.5, color: col, bold: c.hot }, { text: nf(c.ok), fontSize: 8.5, color: col, bold: c.hot }, { text: nf(c.bad), fontSize: 8.5 }, { text: nf(c.users), fontSize: 8.5 }];
        })) }, layout: 'siTable' });

        if (ctx.ips.length) {
            content.push({ text: 'Οι διευθύνσεις IP με τις περισσότερες αποτυχίες', style: 'h2', margin: [0, 12, 0, 6] });
            content.push({ table: { headerRows: 1, widths: ['*', 90, 55, 45, 50], body: [[{ text: 'IP', style: 'th' }, { text: 'Χώρα', style: 'th' }, { text: 'Αποτυχίες', style: 'th' }, { text: 'Χρήστες', style: 'th' }, { text: 'Επιτυχίες', style: 'th' }]].concat(ctx.ips.map(function (i) {
                return [{ text: i.ip, fontSize: 8 }, { text: i.cc, fontSize: 8 }, { text: nf(i.bad), fontSize: 8 }, { text: nf(i.users), fontSize: 8 }, { text: nf(i.ok), fontSize: 8, color: i.hot ? C.red : C.text, bold: !!i.hot }];
            })) }, layout: 'siTable' });
        }

        content.push({ text: 'Σε ποιες απαιτήσεις αντιστοιχεί', style: 'h2', margin: [0, 12, 0, 6] });
        content.push({ text: 'Ο τακτικός έλεγχος των sign-in logs, και η τεκμηρίωσή του με αυτή την αναφορά, υποστηρίζουν τις παρακάτω απαιτήσεις.', style: 'body', margin: [0, 0, 0, 6] });
        content.push({ table: { headerRows: 1, widths: [100, 50, '*'], body: [[{ text: 'Πλαίσιο', style: 'th' }, { text: 'Κωδικός', style: 'th' }, { text: 'Απαίτηση', style: 'th' }]].concat(MAP.reduce(function (acc, f) {
            f[2].forEach(function (r, i) { acc.push([{ text: i ? '' : f[0], bold: true, fontSize: 8.5 }, { text: r[0], fontSize: 8.5, color: C.blue, link: ctx.base + f[1] + anchor(r[0]) }, { text: r[1], fontSize: 8.5 }]); });
            return acc;
        }, [])) }, layout: 'siTable' });

        if (ctx.caTemplates && ctx.caTemplates.length) {
            content.push({ text: 'Πολιτικές Conditional Access που προτείνονται', style: 'h1', pageBreak: 'before' });
            content.push({ text: 'Microsoft Entra admin center › Entra ID › Conditional Access › Policies › + New policy. Όλες ξεκινούν σε Report-only και εξαιρούν τους λογαριασμούς έκτακτης ανάγκης (break-glass).', style: 'body', margin: [0, 0, 0, 8] });
            ctx.caTemplates.forEach(function (c) {
                content.push({ unbreakable: true, margin: [0, 4, 0, 8], stack: [
                    { text: c.name, bold: true, fontSize: 10, color: C.navy },
                    { text: 'Άδεια: ' + c.lic, fontSize: 8, color: C.muted, margin: [0, 1, 0, 4] },
                    { table: { widths: [110, '*'], body: c.rows.map(function (r) { return [{ text: r[0], fontSize: 8.5, bold: true, color: C.text }, { text: r[1], fontSize: 8.5 }]; }) }, layout: 'siTable' },
                    c.note ? { text: c.note, fontSize: 8, color: C.muted, margin: [0, 4, 0, 0] } : { text: '' }
                ] });
            });
        }

        content.push({ text: 'KQL για συνεχή παρακολούθηση', style: 'h1', pageBreak: 'before' });
        content.push({ text: 'Τρέχει στο Log Analytics ή στο Microsoft Sentinel, αν στέλνεις εκεί τα sign-in logs του Microsoft Entra ID μέσω Diagnostic settings.', style: 'body', margin: [0, 0, 0, 6] });
        content.push({ table: { widths: ['*'], body: [[{ text: ctx.kql, fontSize: 7.5, color: C.text, fillColor: '#f1f5f9', margin: [6, 6, 6, 6] }]] }, layout: 'noBorders' });

        content.push({ text: 'Μεθοδολογία, όρια και όροι χρήσης', style: 'h1', margin: [0, 16, 0, 10] });
        content.push({ text: 'Πώς βγαίνει το αποτέλεσμα', style: 'h3' });
        content.push({ text: 'Οι συνδέσεις ομαδοποιούνται ανά χρήστη, διεύθυνση IP και χώρα. «Κρίσιμο»: επιτυχημένη σύνδεση από χώρα εκτός των δικών σου χωρίς MFA ή με legacy πρωτόκολλο, ή IP με password spray που πέτυχε. «Υψηλό»: επιτυχημένη σύνδεση από άλλη χώρα με MFA, σωστός κωδικός από άλλη χώρα που σταμάτησε στο MFA (AADSTS50074, 50076, 50079) ή στο Conditional Access (53003, που εφαρμόζεται μετά τον κωδικό), τρεις ή περισσότερες απορρίψεις MFA (500121), legacy authentication. «Μέτριο»: password spray χωρίς επιτυχία (μία IP, πέντε ή περισσότεροι χρήστες), χρήστες χωρίς MFA, brute force με κλείδωμα. Οι «δικές σου» χώρες ορίζονται από τον χρήστη ή, αλλιώς, από τις επιτυχημένες συνδέσεις. Οι δικές σου διευθύνσεις IP (γραφεία, NAT, VPN) ορίζονται από τον χρήστη ή, αλλιώς, ως οι IP των δικών σου χωρών με επιτυχημένες συνδέσεις από τρεις ή περισσότερους χρήστες, και εξαιρούνται από τον έλεγχο για password spray.', style: 'body' });
        content.push({ text: 'Τι δεν μπορεί να πει', style: 'h3' });
        content.push({ text: 'Ένα εύρημα δεν αποδεικνύει παραβίαση: μια σύνδεση από άλλη χώρα μπορεί να είναι ταξίδι, VPN ή roaming. Η χώρα προκύπτει από τη διεύθυνση IP όπως την καταγράφει η Microsoft. Η ανάλυση καλύπτει μόνο τα αρχεία που ανέβηκαν, και τα logs κρατούνται 7 ημέρες με Microsoft Entra ID Free ή 30 με P1 και P2.', style: 'body' });
        content.push({ text: 'Απόρρητο', style: 'h3' });
        content.push({ text: 'Τα logs αναλύθηκαν και η αναφορά δημιουργήθηκε μόνο μέσα στον browser του χρήστη. Τίποτα δεν αποστάλθηκε στο thecybersec.gr ή σε τρίτους.' + (ctx.mask ? ' Τα ονόματα χρηστών και οι διευθύνσεις IP εμφανίζονται με απόκρυψη.' : ''), style: 'body' });
        content.push({ text: 'Πνευματικά δικαιώματα και όροι χρήσης', style: 'h3' });
        content.push({ table: { widths: [120, '*'], body: terms(ctx).map(function (t) { return [{ text: t[0], bold: true, fontSize: 8.5, color: C.text }, { text: t[1], fontSize: 8.5 }]; }) }, layout: 'siTable' });

        var doc = {
            pageSize: 'A4', pageMargins: [40, 54, 40, 48],
            info: { title: 'Ποιος χτυπάει την πόρτα σου; Έλεγχος sign-in logs', author: 'thecybersec.gr', subject: 'Microsoft Entra ID sign-in logs', creator: 'thecybersec.gr' },
            header: function (cur) {
                if (cur === 1) return null;
                return { columns: [{ text: 'Ποιος χτυπάει την πόρτα σου; · ' + dstr, fontSize: 7.5, color: C.muted }, { text: 'thecybersec.gr', fontSize: 7.5, color: C.blue, alignment: 'right', link: PAGE }], margin: [40, 24, 40, 0] };
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
        var layouts = { siTable: {
            hLineWidth: function (i, node) { return i === 0 || i === node.table.body.length ? 0 : 0.5; }, vLineWidth: function () { return 0; },
            hLineColor: function () { return C.line; }, paddingTop: function () { return 4; }, paddingBottom: function () { return 4; },
            paddingLeft: function () { return 6; }, paddingRight: function () { return 6; }
        } };
        return new Promise(function (res) { window.pdfMake.createPdf(doc, layouts).download('poios-xtypaei-tin-porta-sou-' + iso() + '.pdf', res); });
    }

    window.SigninReport = { pdf: pdf };
})();
