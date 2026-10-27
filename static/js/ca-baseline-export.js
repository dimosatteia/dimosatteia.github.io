/* Εξαγωγές του εργαλείου «Βασικό σύνολο πολιτικών Conditional Access» · thecybersec.gr
   zip: JSZip (static/js/jszip). xlsx: ExcelJS (static/js/exceljs, MIT). pdf: pdfmake.
   Όλα γίνονται στον browser. Δεν αποστέλλεται κανένα στοιχείο.
   Καλείται από το shortcode ca-baseline: window.CaBaselineExport.zip(r) / .xlsx(r) / .pdf(r) */
(function () {
    'use strict';
    var C = { navy: '#0f172a', blue: '#2563eb', text: '#1e293b', muted: '#64748b', line: '#e2e8f0', band: '#f8fafc', amber: '#b45309', amberBg: '#fef3c7', red: '#be123c', redBg: '#ffe4e6', sky: '#0369a1', skyBg: '#e0f2fe', violet: '#6d28d9' };
    var PAGE = 'https://thecybersec.gr/politikes-conditional-access/';
    var STATUS = ['Report-only', 'On', 'Δεν εφαρμόζεται'];

    function pad(n) { return (n < 10 ? '0' : '') + n; }
    function todayStr() { var d = new Date(); return pad(d.getDate()) + '/' + pad(d.getMonth() + 1) + '/' + d.getFullYear(); }
    function slug(r) { return (r.org || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 30); }
    function fileName(r, ext) { var s = slug(r); return 'politikes-conditional-access' + (s ? '-' + s : '') + '-' + new Date().toISOString().slice(0, 10) + '.' + ext; }
    function save(blob, name) {
        var a = document.createElement('a');
        a.href = URL.createObjectURL(blob); a.download = name;
        document.body.appendChild(a); a.click();
        setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 1500);
    }
    function lv(r, k) { return r.D.levels.filter(function (l) { return l.key === k; })[0] || { label: k, text: '' }; }
    function wv(r, n) { return r.D.waves.filter(function (w) { return w.n === n; })[0]; }
    function copyright() {
        var y = new Date().getFullYear();
        return [
            ['Πνευματικά δικαιώματα και όροι χρήσης', ''],
            ['Δικαιούχος', '© ' + y + ' Δημοσθένης Αττέια, thecybersec.gr. Με επιφύλαξη παντός δικαιώματος.'],
            ['Τι προστατεύεται', 'Η επιλογή και η σειρά των πολιτικών, οι περιγραφές, η αντιστοίχιση με τις απαιτήσεις των πλαισίων και η δομή του πλάνου είναι πρωτότυπο έργο του συντάκτη και προστατεύονται από τον ν. 2121/1993. Τα templates του Conditional Access είναι της Microsoft. Τα κείμενα της ΚΥΑ 1689/2025, της Οδηγίας (ΕΕ) 2022/2555 και του Κανονισμού (ΕΕ) 2016/679 είναι δημόσια έγγραφα και δεν αποτελούν αντικείμενο αυτής της προστασίας.'],
            ['Τι επιτρέπεται', 'Η χρήση των πολιτικών και του πλάνου για τις εσωτερικές ανάγκες του οργανισμού σας, καθώς και η επίδειξή τους σε ελεγκτές και αρμόδιες αρχές στο πλαίσιο ελέγχου.'],
            ['Τι απαγορεύεται χωρίς γραπτή άδεια του συντάκτη', 'Η αναδημοσίευση, η αναδιανομή και η ανάρτηση του πλάνου ή τμήματός του σε ιστότοπους, πλατφόρμες ή μέσα κοινωνικής δικτύωσης. Η εμπορική εκμετάλλευση, μαζί με την ενσωμάτωσή του σε προϊόντα, υπηρεσίες, εκπαιδευτικό υλικό ή παραδοτέα προς τρίτους. Η αφαίρεση ή η αλλοίωση της αναφοράς στον συντάκτη και στην πηγή.'],
            ['Πώς το μοιράζεστε', 'Με παραπομπή στη σελίδα ' + PAGE + '.'],
            ['Επικοινωνία για άδεια χρήσης', 'Μέσω LinkedIn: https://www.linkedin.com/in/dimosthenisatteia/']
        ];
    }

    // ---------- ZIP με ένα JSON ανά πολιτική ----------
    function zip(r) {
        var z = new window.JSZip();
        r.policies.forEach(function (p) { z.file(p.json.displayName + '.json', JSON.stringify(p.json, null, 2)); });
        var lines = [
            'Βασικό σύνολο πολιτικών Conditional Access' + (r.org ? ' · ' + r.org : ''),
            'Δημιουργήθηκε στις ' + todayStr() + ' με το δωρεάν εργαλείο του thecybersec.gr: ' + PAGE,
            '',
            'ΠΩΣ ΤΑ ΑΝΕΒΑΖΕΙΣ',
            '1. Microsoft Entra admin center > Entra ID > Conditional Access > Policies.',
            '2. «Upload policy file», διάλεξε ένα αρχείο JSON, και «Create». Ένα αρχείο κάθε φορά.',
            '3. Όλες οι πολιτικές ανεβαίνουν σε Report-only. Δεν επιβάλλουν τίποτα μέχρι να τις γυρίσεις σε On.',
            '',
            'ΠΡΙΝ ΑΠΟ ΤΟ ON',
            (r.s.bg === 'yes' && /^[0-9a-f-]{36}$/i.test(r.s.bgId)) ? '- Η ομάδα έκτακτης ανάγκης (' + r.s.bgId + ') εξαιρείται ήδη σε όλες τις πολιτικές χρηστών.' : '- Πρόσθεσε στο Exclude κάθε πολιτικής την ομάδα με τους λογαριασμούς έκτακτης ανάγκης (break-glass).',
            '- Δες στα Sign-in logs > Report-only, ή με το KQL κάθε πολιτικής στο εργαλείο, ποιοι χρήστες θα επηρεαστούν.',
            '- Γύρνα σε On ένα κύμα τη φορά.',
            '',
            'ΟΙ ΠΟΛΙΤΙΚΕΣ, ΜΕ ΣΕΙΡΑ ΕΝΕΡΓΟΠΟΙΗΣΗΣ'
        ];
        [1, 2, 3, 4].forEach(function (n) {
            var ps = r.policies.filter(function (p) { return p.wave === n; }); if (!ps.length) return;
            lines.push('', wv(r, n).label);
            ps.forEach(function (p) { lines.push('  ' + p.json.displayName + '  (' + p.title + ', ' + lv(r, p.level).label + ')'); if (p.prereq) lines.push('    Πριν από το On: ' + p.prereq); });
        });
        lines.push('', 'Οι πολιτικές βασίζονται στα templates και στις οδηγίες της Microsoft. Δοκίμασέ τες σε Report-only και με το What If πριν από το On.', '© ' + new Date().getFullYear() + ' Δημοσθένης Αττέια, thecybersec.gr. Επιτρέπεται η χρήση για τις εσωτερικές ανάγκες του οργανισμού σας.');
        z.file('DIABASE-ME.txt', '﻿' + lines.join('\r\n'));
        return z.generateAsync({ type: 'blob' }).then(function (b) { save(b, fileName(r, 'zip')); });
    }

    // ---------- XLSX: πλάνο ενεργοποίησης ----------
    function xlsx(r) {
        var ExcelJS = window.ExcelJS, wb = new ExcelJS.Workbook();
        wb.creator = 'thecybersec.gr'; wb.created = new Date();
        var fill = function (argb) { return { type: 'pattern', pattern: 'solid', fgColor: { argb: argb } }; };
        var thin = { style: 'thin', color: { argb: 'FFCBD5E1' } }, border = { top: thin, left: thin, bottom: thin, right: thin };
        function header(row) { row.eachCell(function (c) { c.fill = fill('FF0F172A'); c.font = { bold: true, color: { argb: 'FFFFFFFF' } }; c.alignment = { vertical: 'middle', wrapText: true }; c.border = border; }); row.height = 32; }
        var N = r.policies.length;

        // 1. Οδηγίες
        var wi = wb.addWorksheet('Οδηγίες', { views: [{ showGridLines: false }] });
        wi.getColumn(1).width = 30; wi.getColumn(2).width = 100;
        wi.mergeCells('A1:B1');
        wi.getCell('A1').value = 'Βασικό σύνολο πολιτικών Conditional Access · Πλάνο ενεργοποίησης';
        wi.getCell('A1').font = { bold: true, size: 16, color: { argb: 'FF0F172A' } };
        wi.getRow(1).height = 28;
        var info = [
            ['Οργανισμός', r.org || ''],
            ['Άδειες', r.tier],
            ['Ημερομηνία', todayStr()],
            ['Πολιτικές', N],
            ['', ''],
            ['Τι είναι', 'Το πλάνο ενεργοποίησης των πολιτικών Conditional Access του Microsoft Entra ID που ταιριάζουν στις άδειες και στο περιβάλλον που δηλώθηκαν, με τη σειρά, τις ρυθμίσεις και την αντιστοίχιση κάθε πολιτικής με την ΚΥΑ 1689/2025, την Οδηγία NIS2, το ISO/IEC 27001:2022 και τον GDPR.'],
            ['Πώς το ενημερώνεις', 'Στο φύλλο «Πολιτικές» αλλάζεις την κατάσταση από τη λίστα (Report-only, On, Δεν εφαρμόζεται) και γράφεις τις ημερομηνίες ως ηη/μμ/εεεε. Το φύλλο «Σύνοψη» ξαναμετρά μόνο του πόσες πολιτικές είναι σε ισχύ.'],
            ['Τεκμήριο', 'Με τις ημερομηνίες Report-only και On, το πλάνο δείχνει στον ελεγκτή πότε επιβλήθηκε κάθε μέτρο. Κράτησε μαζί του εξαγωγή των πολιτικών από το Microsoft Entra admin center.'],
            ['Πηγή', 'Δημοσθένης Αττέια, Microsoft 365 Security Insights. Το εργαλείο: ' + PAGE],
            ['Αποποίηση', 'Οι πολιτικές βασίζονται στα templates και στις οδηγίες της Microsoft και σε όσα δηλώθηκαν. Το εργαλείο δεν συνδέεται στο tenant και δεν βλέπει τις υπάρχουσες πολιτικές. Δεν είναι ελεγκτική γνώμη ούτε νομική συμβουλή.'],
            ['', '']
        ].concat(copyright());
        info.forEach(function (x, i) {
            var row = wi.getRow(i + 3); row.values = x;
            row.getCell(1).font = { bold: true, color: { argb: 'FF334155' } };
            row.getCell(2).alignment = { wrapText: true, vertical: 'top' }; row.getCell(1).alignment = { vertical: 'top', wrapText: true };
            if (x[0] === 'Πνευματικά δικαιώματα και όροι χρήσης') row.getCell(1).font = { bold: true, size: 12, color: { argb: 'FF0F172A' } };
        });

        // 2. Πολιτικές
        var ws = wb.addWorksheet('Πολιτικές', { views: [{ state: 'frozen', xSplit: 2, ySplit: 1 }] });
        var cols = [
            ['Κωδικός', 9], ['Όνομα πολιτικής', 48], ['Τι κάνει', 34], ['Κύμα', 7], ['Άδεια', 18], ['Κατάσταση', 15], ['Report-only από', 13], ['On από', 13], ['Υπεύθυνος', 14],
            ['Ρυθμίσεις', 60], ['Πριν από το On', 60], ['Γιατί', 60], ['Template της Microsoft', 36], ['Πηγή', 40],
            ['ΚΥΑ 1689/2025', 16], ['Οδηγία NIS2', 14], ['ISO/IEC 27001', 16], ['GDPR', 9], ['MITRE ATT&CK®', 26], ['Παρατηρήσεις', 30]
        ];
        ws.columns = cols.map(function (c) { return { header: c[0], width: c[1] }; });
        header(ws.getRow(1));
        r.policies.forEach(function (p, i) {
            var row = ws.getRow(i + 2);
            row.values = [p.code, p.name, p.title, p.wave, lv(r, p.level).label, 'Report-only', null, null, null,
                p.settings.join('\n'), p.prereq || null, p.why, p.template, p.source,
                (p.map.kya || []).join(', '), (p.map.nis2 || []).join(', '), (p.map.iso || []).join(', '), (p.map.gdpr || []).join(', '), p.mitre.join(', '), null];
            row.getCell(6).dataValidation = { type: 'list', allowBlank: false, formulae: ['"' + STATUS.join(',') + '"'] };
            [7, 8].forEach(function (c) { row.getCell(c).numFmt = 'dd/mm/yyyy'; row.getCell(c).dataValidation = { type: 'date', operator: 'greaterThan', allowBlank: true, formulae: [new Date(2020, 0, 1)], showErrorMessage: true, errorTitle: 'Ημερομηνία', error: 'Γράψε έγκυρη ημερομηνία ηη/μμ/εεεε.' }; });
            row.getCell(14).value = { text: p.source, hyperlink: p.source };
            row.eachCell({ includeEmpty: true }, function (c, cn) {
                if (cn > cols.length) return;
                c.border = border; c.alignment = { vertical: 'top', wrapText: true };
                if (i % 2) c.fill = fill('FFF8FAFC');
            });
            row.getCell(1).font = { bold: true, color: { argb: 'FF2563EB' } };
            row.getCell(14).font = { color: { argb: 'FF2563EB' }, underline: true };
        });
        var last = N + 1;
        ws.addConditionalFormatting({ ref: 'F2:F' + last, rules: [
            { type: 'cellIs', operator: 'equal', formulae: ['"On"'], style: { fill: fill('FFD1FAE5'), font: { color: { argb: 'FF047857' }, bold: true } } },
            { type: 'cellIs', operator: 'equal', formulae: ['"Report-only"'], style: { fill: fill('FFFEF3C7'), font: { color: { argb: 'FFB45309' }, bold: true } } }
        ] });
        ws.autoFilter = { from: 'A1', to: { row: 1, column: cols.length } };

        // 3. Σύνοψη
        var sm = wb.addWorksheet('Σύνοψη', { views: [{ showGridLines: false }] });
        sm.getColumn(1).width = 46; sm.getColumn(2).width = 14; sm.getColumn(3).width = 14; sm.getColumn(4).width = 14;
        sm.getRow(1).values = ['Κύμα', 'Πολιτικές', 'On', 'Report-only']; header(sm.getRow(1));
        [1, 2, 3, 4].forEach(function (n, i) {
            var row = sm.getRow(i + 2), w = wv(r, n);
            row.values = [w.label, { formula: 'COUNTIF(Πολιτικές!D2:D' + last + ',' + n + ')' }, { formula: 'COUNTIFS(Πολιτικές!D2:D' + last + ',' + n + ',Πολιτικές!F2:F' + last + ',"On")' }, { formula: 'COUNTIFS(Πολιτικές!D2:D' + last + ',' + n + ',Πολιτικές!F2:F' + last + ',"Report-only")' }];
            row.eachCell(function (c) { c.border = border; });
        });
        var tr = sm.getRow(6);
        tr.values = ['Σύνολο', { formula: 'SUM(B2:B5)' }, { formula: 'SUM(C2:C5)' }, { formula: 'SUM(D2:D5)' }];
        tr.eachCell(function (c) { c.border = border; c.font = { bold: true }; });
        sm.getRow(8).values = ['Πολιτικές σε ισχύ (On)', { formula: 'IF(B6=0,0,C6/B6)' }];
        sm.getCell('B8').numFmt = '0%'; sm.getCell('A8').font = { bold: true }; sm.getCell('B8').font = { bold: true, size: 14, color: { argb: 'FF047857' } };

        // 4. Ανά πλαίσιο
        var fw = wb.addWorksheet('Ανά πλαίσιο', { views: [{ state: 'frozen', ySplit: 1 }] });
        fw.columns = [{ header: 'Πλαίσιο', width: 18 }, { header: 'Απαίτηση', width: 14 }, { header: 'Πολιτικές που την υλοποιούν', width: 60 }, { header: 'Σύνδεσμος', width: 50 }];
        header(fw.getRow(1));
        var rn = 2;
        r.FW.forEach(function (f) {
            var m = {};
            r.policies.forEach(function (p) { (p.map[f.key] || []).forEach(function (c) { (m[c] = m[c] || []).push(p.code); }); });
            Object.keys(m).sort(function (a, b) { return a.localeCompare(b, 'el', { numeric: true }); }).forEach(function (c) {
                var url = f.url + '#' + encodeURIComponent(c.replace(/\./g, '-'));
                var row = fw.getRow(rn++);
                row.values = [f.label, c, m[c].join(', '), { text: url, hyperlink: url }];
                row.eachCell(function (x) { x.border = border; x.alignment = { vertical: 'top', wrapText: true }; });
                row.getCell(4).font = { color: { argb: 'FF2563EB' }, underline: true };
            });
        });

        // 5. JSON
        var js = wb.addWorksheet('JSON');
        js.columns = [{ header: 'Κωδικός', width: 9 }, { header: 'JSON (Microsoft Graph conditionalAccessPolicy)', width: 120 }];
        header(js.getRow(1));
        r.policies.forEach(function (p, i) { var row = js.getRow(i + 2); row.values = [p.code, JSON.stringify(p.json)]; row.getCell(2).alignment = { wrapText: false, vertical: 'top' }; row.getCell(2).font = { name: 'Consolas', size: 9 }; });

        return wb.xlsx.writeBuffer().then(function (buf) {
            save(new Blob([buf], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }), fileName(r, 'xlsx'));
        });
    }

    // ---------- PDF ----------
    function pdf(r) {
        function h1(t, brk) { return { text: t, style: 'h1', pageBreak: brk ? 'before' : undefined }; }
        var LVC = { p1: '#047857', p2: '#1d4ed8', mdca: '#0e7490', irm: C.red, gsa: '#7e22ce', wid: C.amber, pim: '#4d7c0f', pa: '#be185d' };
        var byL = {}; r.policies.forEach(function (p) { byL[p.level] = (byL[p.level] || 0) + 1; });
        var waves = [1, 2, 3, 4].filter(function (n) { return r.policies.some(function (p) { return p.wave === n; }); });
        var content = [];
        content.push({
            table: { widths: ['*'], body: [[{
                stack: [
                    { text: 'ΒΑΣΙΚΟ ΣΥΝΟΛΟ ΠΟΛΙΤΙΚΩΝ CONDITIONAL ACCESS', color: '#93c5fd', fontSize: 9, bold: true, characterSpacing: 1.2 },
                    { text: r.org || 'Ο οργανισμός', color: '#ffffff', fontSize: 24, bold: true, margin: [0, 6, 0, 2] },
                    { text: 'Microsoft Entra ID · ' + r.tier, color: '#cbd5e1', fontSize: 11 },
                    { text: 'Πλάνο στις ' + todayStr(), color: '#94a3b8', fontSize: 9, margin: [0, 10, 0, 0] }
                ], fillColor: C.navy, margin: [16, 18, 16, 18]
            }]] }, layout: 'noBorders', margin: [0, 0, 0, 14]
        });
        content.push({
            columns: [
                { width: 110, table: { widths: ['*'], body: [[{ stack: [{ text: String(r.policies.length), fontSize: 30, bold: true, color: C.blue, alignment: 'center' }, { text: 'πολιτικές', fontSize: 8, color: C.muted, alignment: 'center' }], fillColor: C.band, margin: [6, 10, 6, 10] }]] }, layout: 'noBorders' },
                { width: '*', columns: [
                    { stack: [{ text: String(waves.length), style: 'big' }, { text: 'κύματα ενεργοποίησης', style: 'small' }] },
                    { stack: [{ text: String(byL.p1 || 0), style: 'big' }, { text: 'με Entra ID P1', style: 'small' }] },
                    { stack: [{ text: String(byL.p2 || 0), style: 'big', color: C.violet }, { text: 'με Entra ID P2', style: 'small' }] },
                    { stack: [{ text: String(['mdca', 'irm', 'gsa', 'wid', 'pim', 'pa'].reduce(function (n, k) { return n + (byL[k] || 0); }, 0)), style: 'big', color: C.sky }, { text: 'με πρόσθετες δυνατότητες', style: 'small' }] }
                ], margin: [8, 12, 0, 0] }
            ], columnGap: 12, margin: [0, 0, 0, 12]
        });
        content.push({ text: 'Το Conditional Access είναι ο μηχανισμός του Microsoft Entra ID που αποφασίζει σε κάθε σύνδεση αν επιτρέπεται η πρόσβαση, με ποιο επιπλέον βήμα, ή αν μπλοκάρεται. Το πλάνο περιέχει τις ' + r.policies.length + ' πολιτικές που ταιριάζουν στις άδειες και στο περιβάλλον του οργανισμού, βασισμένες στα templates της Microsoft. Όλες δημιουργούνται πρώτα σε Report-only, όπου καταγράφουν τι θα έκαναν χωρίς να το επιβάλλουν, και ενεργοποιούνται σε κύματα.', style: 'p' });

        if (r.warnings.length) {
            content.push({ text: 'Πριν ξεκινήσεις', style: 'h2' });
            r.warnings.forEach(function (w) {
                var c = w.k === 'red' ? [C.red, C.redBg] : w.k === 'amber' ? [C.amber, C.amberBg] : [C.sky, C.skyBg];
                content.push({ table: { widths: ['*'], body: [[{ stack: [{ text: w.t, bold: true, color: c[0], fontSize: 9.5 }, { text: w.b, fontSize: 8.5, margin: [0, 2, 0, 0] }], fillColor: c[1], margin: [6, 5, 6, 5] }]] }, layout: 'noBorders', margin: [0, 0, 0, 5] });
            });
        }

        content.push({ text: 'Σειρά ενεργοποίησης', style: 'h2' });
        var body = [[{ text: 'Κωδ.', style: 'th' }, { text: 'Πολιτική', style: 'th' }, { text: 'Άδεια', style: 'th' }, { text: 'Report-only από', style: 'th' }, { text: 'On από', style: 'th' }]];
        waves.forEach(function (n) {
            var w = wv(r, n);
            body.push([{ stack: [{ text: w.label, bold: true, fontSize: 8.5, color: C.blue }, { text: w.text, fontSize: 7.5, color: C.muted }], colSpan: 5, fillColor: '#eff6ff' }, '', '', '', '']);
            r.policies.filter(function (p) { return p.wave === n; }).forEach(function (p) {
                body.push([{ text: p.code, style: 'mono' }, { stack: [{ text: p.title, fontSize: 9, bold: true }, { text: p.name, fontSize: 7, color: C.muted }] }, { text: lv(r, p.level).label, fontSize: 8, color: LVC[p.level] }, { text: ' ', fontSize: 8 }, { text: ' ', fontSize: 8 }]);
            });
        });
        content.push({
            table: { headerRows: 1, dontBreakRows: true, widths: [36, '*', 80, 62, 52], body: body },
            layout: { hLineColor: function () { return C.line; }, vLineWidth: function () { return 0; }, fillColor: function (i) { return i === 0 ? C.navy : null; }, paddingTop: function () { return 3; }, paddingBottom: function () { return 3; } }
        });

        // Οι πολιτικές αναλυτικά
        content.push(h1('Οι πολιτικές', true));
        r.policies.forEach(function (p) {
            var map = r.FW.map(function (f) { var c = p.map[f.key] || []; return c.length ? f.label + ': ' + c.join(', ') : ''; }).filter(Boolean).join('   ·   ');
            content.push({ unbreakable: true, stack: [
                { text: [{ text: p.code + '  ', color: C.blue }, p.title], style: 'h2' },
                { text: p.name, fontSize: 7.5, color: C.muted, margin: [0, 0, 0, 3] },
                { text: p.why, fontSize: 9, margin: [0, 0, 0, 3] },
                { ul: p.settings.concat(['Κατάσταση: Report-only, μέχρι το κύμα ' + p.wave]), fontSize: 8.5, margin: [0, 0, 0, 3] },
                p.prereq ? { table: { widths: ['*'], body: [[{ text: [{ text: 'Πριν από το On: ', bold: true }, p.prereq], fontSize: 8, fillColor: C.amberBg, color: '#78350f', margin: [5, 3, 5, 3] }]] }, layout: 'noBorders', margin: [0, 0, 0, 3] } : { text: '' },
                { text: [{ text: 'Άδεια: ', bold: true }, lv(r, p.level).text, '.   ', { text: 'Template: ', bold: true }, { text: p.template, link: p.source, color: C.blue }], fontSize: 8, margin: [0, 0, 0, 2] },
                { text: map, fontSize: 7.5, color: C.muted },
                { text: 'MITRE ATT&CK®: ' + p.mitre.join(', '), fontSize: 7.5, color: C.muted, margin: [0, 1, 0, 8] }
            ] });
        });

        // Ανά πλαίσιο
        content.push(h1('Τι υλοποιούν οι πολιτικές', true));
        content.push({ text: 'Οι απαιτήσεις κάθε πλαισίου που υλοποιούν οι πολιτικές του πλάνου, και ποιες πολιτικές τις καλύπτουν. Τα πλήρη κείμενα βρίσκονται στους οδηγούς του thecybersec.gr.', style: 'p' });
        r.FW.forEach(function (f) {
            var m = {};
            r.policies.forEach(function (p) { (p.map[f.key] || []).forEach(function (c) { (m[c] = m[c] || []).push(p.code); }); });
            var codes = Object.keys(m).sort(function (a, b) { return a.localeCompare(b, 'el', { numeric: true }); });
            content.push({ text: [f.label + '  ', { text: f.url, link: f.url, color: C.blue, fontSize: 8, bold: false }], style: 'h2' });
            content.push({ table: { widths: [60, '*'], body: codes.map(function (c) { return [{ text: c, bold: true, fontSize: 8.5, link: f.url + '#' + c.replace(/\./g, '-'), color: C.blue }, { text: m[c].join(', '), fontSize: 8.5 }]; }) }, layout: { hLineColor: function () { return C.line; }, vLineWidth: function () { return 0; }, paddingTop: function () { return 2; }, paddingBottom: function () { return 2; } }, margin: [0, 0, 0, 6] });
        });

        // Έγκριση
        content.push(h1('Έγκριση του πλάνου', true));
        content.push({ text: 'Οι πολιτικές Conditional Access υλοποιούν την πολιτική ελέγχου πρόσβασης του οργανισμού (ΚΥΑ 1689/2025, άρθρο 13) και επιβάλλουν ασφαλή παραμετροποίηση (άρθρο 14). Το πλάνο υποβάλλεται στο ανώτατο όργανο διοίκησης μαζί με την πολιτική ελέγχου πρόσβασης. Οι εξαγωγές των πολιτικών από το Microsoft Entra admin center και τα αποτελέσματα του Report-only φυλάσσονται ως τεκμήριο.', style: 'p' });
        function sig(role) {
            return { table: { widths: [130, '*'], body: [
                [{ text: role, bold: true, fontSize: 9.5, colSpan: 2, margin: [0, 0, 0, 4] }, ''],
                [{ text: 'Ρόλος', style: 'k' }, { text: ' ', margin: [0, 8, 0, 0] }],
                [{ text: 'Ημερομηνία', style: 'k' }, { text: ' ', margin: [0, 8, 0, 0] }],
                [{ text: 'Υπογραφή', style: 'k' }, { text: ' ', margin: [0, 22, 0, 0] }]
            ] }, layout: { hLineColor: function () { return C.line; }, vLineWidth: function () { return 0; }, hLineWidth: function (i) { return i < 2 ? 0 : 0.8; } }, margin: [0, 0, 0, 14] };
        }
        content.push(sig('Συντάχθηκε από τον Υπεύθυνο Ασφάλειας Συστημάτων Πληροφορικής και Επικοινωνιών (ΥΑΣΠΕ)'));
        content.push(sig('Εγκρίθηκε από το ανώτατο όργανο διοίκησης'));
        content.push({ text: 'Οι πολιτικές βασίζονται στα templates και στις οδηγίες της Microsoft και σε όσα δηλώθηκαν. Το εργαλείο δεν συνδέεται στο tenant και δεν βλέπει τις υπάρχουσες πολιτικές. Δεν είναι ελεγκτική γνώμη ούτε νομική συμβουλή. Δημιουργήθηκε με το δωρεάν εργαλείο «Βασικό σύνολο πολιτικών Conditional Access» του thecybersec.gr. © ' + new Date().getFullYear() + ' Δημοσθένης Αττέια, thecybersec.gr. Επιτρέπεται η χρήση για τις εσωτερικές ανάγκες του οργανισμού σας και η επίδειξη σε ελεγκτές και αρμόδιες αρχές.', style: 'p', color: C.muted, fontSize: 8, margin: [0, 10, 0, 0] });
        content.push({ text: PAGE, link: PAGE, color: C.blue, fontSize: 8 });

        var dd = {
            pageSize: 'A4', pageMargins: [40, 44, 40, 48],
            info: { title: 'Πολιτικές Conditional Access' + (r.org ? ': ' + r.org : ''), author: r.org || '', creator: 'thecybersec.gr' },
            footer: function (cur, tot) { return { columns: [{ text: 'Πολιτικές Conditional Access' + (r.org ? ' · ' + r.org : '') + ' · ' + todayStr(), fontSize: 7.5, color: C.muted }, { text: cur + ' / ' + tot, alignment: 'right', fontSize: 7.5, color: C.muted }], margin: [40, 14, 40, 0] }; },
            content: content,
            defaultStyle: { font: 'Roboto', fontSize: 9.5, color: C.text, lineHeight: 1.2 },
            styles: {
                h1: { fontSize: 15, bold: true, color: C.navy, margin: [0, 14, 0, 6] },
                h2: { fontSize: 11, bold: true, color: C.navy, margin: [0, 8, 0, 3] },
                p: { fontSize: 9.5, margin: [0, 0, 0, 8] },
                th: { bold: true, color: '#ffffff', fontSize: 8.5 },
                k: { fontSize: 8.5, color: C.muted },
                big: { fontSize: 18, bold: true, color: C.navy },
                small: { fontSize: 8, color: C.muted },
                mono: { fontSize: 8, color: C.muted }
            }
        };
        return new Promise(function (resolve, reject) {
            try { window.pdfMake.createPdf(dd).getBlob(function (b) { save(b, fileName(r, 'pdf')); resolve(); }); } catch (e) { reject(e); }
        });
    }

    window.CaBaselineExport = { zip: zip, xlsx: xlsx, pdf: pdf };
})();
