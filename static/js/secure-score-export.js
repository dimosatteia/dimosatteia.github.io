/* Εξαγωγές του εργαλείου «Από το Secure Score στη συμμόρφωση» · thecybersec.gr
   xlsx: ExcelJS (static/js/exceljs, MIT). pdf: pdfmake.
   Όλα γίνονται στον browser. Το CSV και τα αποτελέσματα δεν αποστέλλονται πουθενά.
   Καλείται από το shortcode secure-score-map: window.SecureScoreExport.xlsx(ctx) / .pdf(ctx) */
(function () {
    'use strict';
    var C = { navy: '#0f172a', blue: '#2563eb', text: '#1e293b', muted: '#64748b', line: '#e2e8f0', band: '#f8fafc',
        red: '#be123c', redBg: '#ffe4e6', amber: '#b45309', amberBg: '#fef3c7', green: '#047857', greenBg: '#d1fae5',
        sky: '#0369a1', skyBg: '#e0f2fe', violet: '#6d28d9', violetBg: '#ede9fe', grayBg: '#f1f5f9' };
    var LV = {
        done: { c: C.green, bg: C.greenBg, x: 'FF047857', xb: 'FFD1FAE5' },
        claimed: { c: C.sky, bg: C.skyBg, x: 'FF0369A1', xb: 'FFE0F2FE' },
        partial: { c: C.amber, bg: C.amberBg, x: 'FFB45309', xb: 'FFFEF3C7' },
        open: { c: C.red, bg: C.redBg, x: 'FFBE123C', xb: 'FFFFE4E6' },
        risk: { c: C.violet, bg: C.violetBg, x: 'FF6D28D9', xb: 'FFEDE9FE' }
    };
    var ORDER = ['done', 'claimed', 'partial', 'open', 'risk'];
    var PLAN_STATUS = ['Ανοιχτό', 'Σε εξέλιξη', 'Ολοκληρώθηκε', 'Αποδοχή κινδύνου'];

    function pad(n) { return (n < 10 ? '0' : '') + n; }
    function todayStr() { var d = new Date(); return pad(d.getDate()) + '/' + pad(d.getMonth() + 1) + '/' + d.getFullYear(); }
    function iso() { return new Date().toISOString().slice(0, 10); }
    function slug(s) { return (s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 30); }
    function fileName(ctx, ext) { var s = slug(ctx.org); return 'secure-score-symmorfosi' + (s ? '-' + s : '') + '-' + iso() + '.' + ext; }
    function fmt(n) { return (Math.round(n * 100) / 100).toLocaleString('el-GR'); }
    function pctColor(p) { return p >= 85 ? C.green : p >= 50 ? C.amber : C.red; }
    function pctBg(p) { return p >= 85 ? C.greenBg : p >= 50 ? C.amberBg : C.redBg; }
    function guide(ctx, f, code) { return f.abs + '#' + String(code).replace(/\./g, '-'); }
    function codes(t, key) { return (t.map[key] || []).join(', '); }
    function page(ctx) { return ctx.base + 'secure-score-symmorfosi/'; }
    function verdict(R) {
        var hi = R.gaps.filter(function (r) { return r.theme.high; }).length;
        if (R.pct >= 80 && hi === 0) return 'Καλή τεχνική βάση. Τα βασικά μέτρα που ζητούν τα πλαίσια είναι στη θέση τους. Πριν από τον έλεγχο, συγκέντρωσε τα τεκμήρια για τις συστάσεις που καλύπτονται από τρίτο εργαλείο, εναλλακτικό μέτρο ή αποδοχή κινδύνου.';
        if (R.pct >= 60) return 'Η βάση υπάρχει, αλλά ' + hi + ' ανοιχτές συστάσεις αφορούν μέτρα που ζητούν ρητά τα πλαίσια. Αυτές είναι τα πρώτα ευρήματα που θα δει ένας ελεγκτής.';
        if (R.pct >= 40) return 'Σημαντικά κενά: ' + hi + ' ανοιχτές συστάσεις αφορούν μέτρα που ζητούν ρητά τα πλαίσια. Το πλάνο της αναφοράς, με υπεύθυνο και ημερομηνία, είναι από μόνο του τεκμήριο ότι τα κενά διαχειρίζονται.';
        return 'Ο ελεγκτής θα βρει πολλά ευρήματα. Προτεραιότητα έχουν MFA, προνομιακοί ρόλοι, legacy authentication, προστασία email και antimalware.';
    }
    function save(blob, name) {
        var a = document.createElement('a');
        a.href = URL.createObjectURL(blob); a.download = name;
        document.body.appendChild(a); a.click();
        setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 1500);
    }
    function terms(ctx) {
        var y = new Date().getFullYear();
        return [
            ['Δικαιούχος', '© ' + y + ' Δημοσθένης Αττέια, thecybersec.gr. Με επιφύλαξη παντός δικαιώματος.'],
            ['Τι προστατεύεται', 'Η αντιστοίχιση των συστάσεων του Microsoft Secure Score με θέματα ασφάλειας και με τις απαιτήσεις των πλαισίων, οι περιγραφές των τεκμηρίων, η μέθοδος προτεραιοποίησης και η δομή της αναφοράς είναι πρωτότυπο έργο του συντάκτη και προστατεύονται από τον ν. 2121/1993. Οι τίτλοι των συστάσεων προέρχονται από το αρχείο του χρήστη και ανήκουν στη Microsoft. Τα κείμενα της ΚΥΑ 1689/2025, της Οδηγίας (ΕΕ) 2022/2555 και του Κανονισμού (ΕΕ) 2016/679 είναι δημόσια έγγραφα και δεν αποτελούν αντικείμενο αυτής της προστασίας.'],
            ['Τι επιτρέπεται', 'Η χρήση της αναφοράς για τις εσωτερικές ανάγκες του οργανισμού σας, καθώς και η επίδειξή της σε ελεγκτές και αρμόδιες αρχές στο πλαίσιο ελέγχου.'],
            ['Τι απαγορεύεται χωρίς γραπτή άδεια του συντάκτη', 'Η αναδημοσίευση, η αναδιανομή και η ανάρτηση της αναφοράς ή τμήματός της σε ιστότοπους, πλατφόρμες ή μέσα κοινωνικής δικτύωσης. Η εμπορική εκμετάλλευση, μαζί με την ενσωμάτωσή της σε προϊόντα, υπηρεσίες, εκπαιδευτικό υλικό ή παραδοτέα προς τρίτους. Η αφαίρεση ή η αλλοίωση της αναφοράς στον συντάκτη και στην πηγή.'],
            ['Πώς το μοιράζεστε', 'Με παραπομπή στη σελίδα ' + page(ctx) + '.'],
            ['Επικοινωνία για άδεια χρήσης', 'Μέσω LinkedIn: https://www.linkedin.com/in/dimosthenisatteia/']
        ];
    }
    var METHOD = 'Κάθε σύσταση του αρχείου αντιστοιχίζεται σε ένα θέμα ασφάλειας από τον τίτλο της. Αν ο τίτλος δεν ταιριάζει σε συγκεκριμένο θέμα, η αντιστοίχιση γίνεται από τη στήλη Product και, αν ούτε αυτή ταιριάζει, από τη στήλη Category, και σημειώνεται για έλεγχο. Κάθε θέμα έχει κωδικούς απαιτήσεων στην ΚΥΑ 1689/2025, στην Οδηγία NIS2 (άρθρο 21), στο ISO/IEC 27001:2022 Annex A και στον GDPR. Η κάλυψη μιας απαίτησης είναι οι πόντοι που έχουν κερδηθεί προς τους μέγιστους πόντους των συστάσεων που την υποστηρίζουν, όπως τους δίνει το Secure Score. Η κάλυψη ενός πλαισίου είναι ο μέσος όρος των απαιτήσεών του, ώστε κάθε απαίτηση να μετράει το ίδιο. Οι καταστάσεις «Resolved through third party» και «Resolved through alternate mitigation» μετρούν όπως στο Secure Score, αλλά σημειώνονται χωριστά, γιατί η Microsoft δεν τις επαληθεύει. Τα κενά ταξινομούνται: πρώτα τα θέματα που ζητούν ρητά τα πλαίσια, μετά όσα καλύπτει η άδεια, μετά οι περισσότεροι πόντοι που απομένουν και η σειρά (Rank) του Secure Score.';
    var LIMITS = 'Η αναφορά βασίζεται μόνο στο αρχείο που εξήχθη από το Microsoft Secure Score. Το εργαλείο δεν συνδέεται στο tenant. Μια σύσταση υποστηρίζει μια απαίτηση, δεν αποδεικνύει από μόνη της συμμόρφωση: οι περισσότερες απαιτήσεις θέλουν και γραπτή πολιτική, διαδικασία ή απόφαση της διοίκησης. Συστήματα OT, servers εκτός Microsoft Defender και οργανωτικά μέτρα δεν φαίνονται στο Secure Score. Δεν είναι ελεγκτική γνώμη ούτε νομική συμβουλή.';

    // ==================== XLSX ====================
    function xlsx(ctx) {
        var R = ctx.R, FW = ctx.FW, LVL = ctx.LVL;
        var ExcelJS = window.ExcelJS, wb = new ExcelJS.Workbook();
        wb.creator = 'thecybersec.gr'; wb.created = new Date();
        var fill = function (argb) { return { type: 'pattern', pattern: 'solid', fgColor: { argb: argb } }; };
        var thin = { style: 'thin', color: { argb: 'FFCBD5E1' } }, border = { top: thin, left: thin, bottom: thin, right: thin };
        function header(row) { row.eachCell(function (c) { c.fill = fill('FF0F172A'); c.font = { bold: true, color: { argb: 'FFFFFFFF' } }; c.alignment = { vertical: 'middle', wrapText: true }; c.border = border; }); row.height = 32; }
        function body(row, n, i) { for (var c = 1; c <= n; c++) { var cell = row.getCell(c); cell.border = border; cell.alignment = { vertical: 'top', wrapText: true }; if (i % 2) cell.fill = fill('FFF8FAFC'); } }
        function dateCell(cell) { cell.numFmt = 'dd/mm/yyyy'; cell.dataValidation = { type: 'date', operator: 'between', allowBlank: true, formulae: [new Date(2020, 0, 1), new Date(2035, 11, 31)], showErrorMessage: true, errorTitle: 'Ημερομηνία', error: 'Γράψε έγκυρη ημερομηνία ηη/μμ/εεεε.' }; }
        var prio = {}; R.gaps.forEach(function (r, i) { prio[r.i] = i + 1; });

        // 1. Οδηγίες
        var wi = wb.addWorksheet('Οδηγίες', { views: [{ showGridLines: false }] });
        wi.getColumn(1).width = 34; wi.getColumn(2).width = 110;
        wi.mergeCells('A1:B1');
        wi.getCell('A1').value = 'Από το Secure Score στη συμμόρφωση · Πλάνο διορθωτικών ενεργειών';
        wi.getCell('A1').font = { bold: true, size: 16, color: { argb: 'FF0F172A' } };
        wi.getRow(1).height = 28;
        var info = [
            ['Οργανισμός', ctx.org || ''],
            ['Ημερομηνία', todayStr()],
            ['Microsoft Secure Score (από το αρχείο)', R.pct + '% · ' + fmt(R.tot.a) + ' / ' + fmt(R.tot.m) + ' πόντοι'],
            ['Συστάσεις', R.recs.length + ' · ανοιχτές ή μερικές ' + R.gaps.length + ' · τρίτο εργαλείο ή εναλλακτικό μέτρο ' + R.claimed.length + ' · αποδοχή κινδύνου ' + R.risk.length],
            ['Κάλυψη ανά πλαίσιο', R.fw.map(function (x) { return x.f.label + ' ' + x.p + '%'; }).join(' · ')],
            ['Εκτίμηση', verdict(R)],
            ['', ''],
            ['Τι είναι', 'Οι συστάσεις του Microsoft Secure Score του οργανισμού, αντιστοιχισμένες στις απαιτήσεις της ΚΥΑ 1689/2025, της Οδηγίας NIS2, του ISO/IEC 27001:2022 Annex A και του GDPR, με το τεκμήριο που θα ζητήσει ο ελεγκτής για καθεμία.'],
            ['Πώς το χρησιμοποιείς', 'Στο φύλλο «Πλάνο» είναι τα κενά με σειρά προτεραιότητας. Συμπλήρωσε υπεύθυνο (ρόλο), ημερομηνία στόχο (ηη/μμ/εεεε) και κατάσταση από τη λίστα. Στο φύλλο «Συστάσεις» είναι όλες οι συστάσεις, με στήλη για το πού φυλάσσεται το τεκμήριο. Ένα φύλλο ανά πλαίσιο δείχνει την κάλυψη ανά απαίτηση.'],
            ['Τρίτο εργαλείο, εναλλακτικό μέτρο, αποδοχή κινδύνου', 'Για αυτές τις καταστάσεις η Microsoft δεν έχει τεκμήριο. Κράτα για καθεμία στιγμιότυπο ή εξαγωγή της ρύθμισης του άλλου εργαλείου, ή την εγκεκριμένη καταχώριση στο μητρώο κινδύνων με ημερομηνία επανεξέτασης.'],
            ['Μεθοδολογία', METHOD],
            ['Περιορισμοί', LIMITS],
            ['Πηγή', 'Δημοσθένης Αττέια, Microsoft 365 Security Insights. Το εργαλείο: ' + page(ctx)],
            ['', ''],
            ['Πνευματικά δικαιώματα και όροι χρήσης', '']
        ].concat(terms(ctx));
        info.forEach(function (x, i) {
            var row = wi.getRow(i + 3); row.values = x;
            row.getCell(1).font = { bold: true, color: { argb: 'FF334155' } };
            row.getCell(1).alignment = { vertical: 'top', wrapText: true }; row.getCell(2).alignment = { vertical: 'top', wrapText: true };
            if (x[0] === 'Πνευματικά δικαιώματα και όροι χρήσης') row.getCell(1).font = { bold: true, size: 12, color: { argb: 'FF0F172A' } };
        });

        // 2. Πλάνο (κενά με σειρά προτεραιότητας)
        var wp = wb.addWorksheet('Πλάνο', { views: [{ state: 'frozen', xSplit: 2, ySplit: 1 }] });
        var pc = [['#', 6], ['Σύσταση', 52], ['Θέμα', 30], ['Προτεραιότητα', 13], ['Πόντοι που απομένουν', 12], ['Κατάσταση στο Secure Score', 18], ['Άδεια', 9], ['Τι θα ζητήσει ο ελεγκτής', 60],
            ['ΚΥΑ 1689/2025', 16], ['Οδηγία NIS2', 14], ['ISO/IEC 27001', 16], ['GDPR', 11], ['Υπεύθυνος', 16], ['Ημερομηνία στόχος', 13], ['Κατάσταση πλάνου', 16], ['Σχόλια', 30]];
        wp.columns = pc.map(function (c) { return { header: c[0], width: c[1] }; });
        header(wp.getRow(1));
        R.gaps.forEach(function (r, i) {
            var row = wp.getRow(i + 2);
            row.values = [i + 1, r.title, r.theme.name, r.theme.high ? 'Υψηλή' : 'Κανονική', Math.round((r.m - r.a) * 100) / 100, r.st || LVL[r.lvl].label, r.lic === 'n' ? 'Όχι' : r.lic === 'y' ? 'Ναι' : '', r.theme.evidence,
                codes(r.theme, 'kya'), codes(r.theme, 'nis2'), codes(r.theme, 'iso'), codes(r.theme, 'gdpr'), null, null, 'Ανοιχτό', null];
            body(row, pc.length, i);
            dateCell(row.getCell(14));
            row.getCell(15).dataValidation = { type: 'list', allowBlank: false, formulae: ['"' + PLAN_STATUS.join(',') + '"'] };
            if (r.theme.high) row.getCell(4).font = { bold: true, color: { argb: 'FFBE123C' } };
        });
        if (R.gaps.length) {
            wp.addConditionalFormatting({ ref: 'O2:O' + (R.gaps.length + 1), rules: [
                { type: 'cellIs', operator: 'equal', formulae: ['"Ολοκληρώθηκε"'], style: { fill: fill('FFD1FAE5'), font: { color: { argb: 'FF047857' }, bold: true } } },
                { type: 'cellIs', operator: 'equal', formulae: ['"Σε εξέλιξη"'], style: { fill: fill('FFFEF3C7'), font: { color: { argb: 'FFB45309' }, bold: true } } },
                { type: 'cellIs', operator: 'equal', formulae: ['"Αποδοχή κινδύνου"'], style: { fill: fill('FFEDE9FE'), font: { color: { argb: 'FF6D28D9' }, bold: true } } }
            ] });
        }
        wp.autoFilter = { from: 'A1', to: { row: 1, column: pc.length } };

        // 3. Συστάσεις (όλες)
        var ws = wb.addWorksheet('Συστάσεις', { views: [{ state: 'frozen', xSplit: 2, ySplit: 1 }] });
        var sc = [['#', 6], ['Σύσταση', 52], ['Θέμα', 30], ['Αντιστοίχιση από', 14], ['Κατηγορία', 11], ['Προϊόν', 22], ['Κατάσταση στο Secure Score', 20], ['Επίπεδο', 18], ['Πόντοι', 9], ['Μέγιστο', 9], ['Have license', 10],
            ['Σειρά στο πλάνο', 10], ['ΚΥΑ 1689/2025', 16], ['Οδηγία NIS2', 14], ['ISO/IEC 27001', 16], ['GDPR', 11], ['Τι θα ζητήσει ο ελεγκτής', 60], ['Πού φυλάσσεται το τεκμήριο', 30], ['Ημερομηνία τεκμηρίου', 13], ['Σχόλια', 30]];
        ws.columns = sc.map(function (c) { return { header: c[0], width: c[1] }; });
        header(ws.getRow(1));
        var via = { title: 'Τίτλο', product: 'Προϊόν', category: 'Κατηγορία', none: 'Γενική' };
        R.recs.forEach(function (r, i) {
            var row = ws.getRow(i + 2);
            row.values = [r.i, r.title, r.theme.name, via[r.via], r.category, r.product, r.st, LVL[r.lvl].label, r.a, r.m, r.lic === 'n' ? 'Όχι' : r.lic === 'y' ? 'Ναι' : '', prio[r.i] || null,
                codes(r.theme, 'kya'), codes(r.theme, 'nis2'), codes(r.theme, 'iso'), codes(r.theme, 'gdpr'), r.theme.evidence, null, null, null];
            body(row, sc.length, i);
            dateCell(row.getCell(19));
            var L = LV[r.lvl]; row.getCell(8).font = { bold: true, color: { argb: L.x } }; row.getCell(8).fill = fill(L.xb);
            if (r.via !== 'title') row.getCell(4).font = { color: { argb: 'FFB45309' }, italic: true };
        });
        ws.autoFilter = { from: 'A1', to: { row: 1, column: sc.length } };

        // 4. Ένα φύλλο ανά πλαίσιο
        R.fw.forEach(function (x) {
            var name = x.f.label.replace(/[\\\/\?\*\[\]:]/g, '-').slice(0, 31);
            var wf = wb.addWorksheet(name, { views: [{ state: 'frozen', ySplit: 1 }] });
            var fc = [['Κωδικός', 11], ['Απαίτηση', 70], ['Κάλυψη', 10], ['Πόντοι', 10], ['Μέγιστο', 10], ['Συστάσεις', 10], ['Ανοιχτές ή μερικές', 12], ['Τρίτο ή εναλλακτικό', 12], ['Αποδοχή κινδύνου', 11], ['Οδηγός', 44]];
            wf.columns = fc.map(function (c) { return { header: c[0], width: c[1] }; });
            header(wf.getRow(1));
            x.reqs.forEach(function (q, i) {
                var k = { g: 0, c: 0, r: 0 }; q.recs.forEach(function (r) { if (r.lvl === 'open' || r.lvl === 'partial') k.g++; else if (r.lvl === 'claimed') k.c++; else if (r.lvl === 'risk') k.r++; });
                var row = wf.getRow(i + 2), url = guide(ctx, x.f, q.code);
                row.values = [q.code, q.title, q.p / 100, Math.round(q.a * 100) / 100, q.m, q.recs.length, k.g, k.c, k.r, { text: url, hyperlink: url }];
                body(row, fc.length, i);
                row.getCell(3).numFmt = '0%';
                var p = q.p; row.getCell(3).font = { bold: true, color: { argb: p >= 85 ? 'FF047857' : p >= 50 ? 'FFB45309' : 'FFBE123C' } };
                row.getCell(3).fill = fill(p >= 85 ? 'FFD1FAE5' : p >= 50 ? 'FFFEF3C7' : 'FFFFE4E6');
                row.getCell(1).font = { bold: true, color: { argb: 'FF2563EB' } };
                row.getCell(10).font = { color: { argb: 'FF2563EB' }, underline: true };
            });
            var tr = wf.getRow(x.reqs.length + 3);
            tr.values = ['Σύνολο', x.f.label + ' (μέσος όρος των απαιτήσεων)', x.p / 100];
            tr.font = { bold: true }; tr.getCell(3).numFmt = '0%';
        });

        // 5. Ανά θέμα
        var wt = wb.addWorksheet('Ανά θέμα', { views: [{ state: 'frozen', ySplit: 1 }] });
        var tc = [['Θέμα', 40], ['Υψηλή προτεραιότητα', 12], ['Κάλυψη', 10], ['Συστάσεις', 10], ['Ανοιχτές ή μερικές', 12], ['ΚΥΑ 1689/2025', 16], ['Οδηγία NIS2', 14], ['ISO/IEC 27001', 16], ['GDPR', 11], ['Τι θα ζητήσει ο ελεγκτής', 70]];
        wt.columns = tc.map(function (c) { return { header: c[0], width: c[1] }; });
        header(wt.getRow(1));
        R.themes.forEach(function (g, i) {
            var row = wt.getRow(i + 2);
            row.values = [g.t.name, g.t.high ? 'Ναι' : '', g.p / 100, g.recs.length, g.gaps, codes(g.t, 'kya'), codes(g.t, 'nis2'), codes(g.t, 'iso'), codes(g.t, 'gdpr'), g.t.evidence];
            body(row, tc.length, i); row.getCell(3).numFmt = '0%';
        });

        return wb.xlsx.writeBuffer().then(function (buf) {
            save(new Blob([buf], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }), fileName(ctx, 'xlsx'));
        });
    }

    // ==================== PDF ====================
    function donut(p) {
        var r = 52, cx = 60, cy = 60, col = pctColor(p);
        var a = Math.min(p, 99.99) / 100 * 2 * Math.PI, x = cx + r * Math.sin(a), y = cy - r * Math.cos(a);
        var arc = p <= 0 ? '' : '<path d="M ' + cx + ' ' + (cy - r) + ' A ' + r + ' ' + r + ' 0 ' + (a > Math.PI ? 1 : 0) + ' 1 ' + x.toFixed(2) + ' ' + y.toFixed(2) + '" fill="none" stroke="' + col + '" stroke-width="12" stroke-linecap="round"/>';
        return '<svg width="120" height="120" viewBox="0 0 120 120"><circle cx="60" cy="60" r="52" fill="none" stroke="' + C.line + '" stroke-width="12"/>' + arc +
            '<text x="60" y="66" text-anchor="middle" font-size="26" font-weight="bold" fill="' + C.text + '">' + p + '%</text></svg>';
    }
    function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
    function bars(rows) {
        var h = rows.length * 22 + 4, w = 515, lw = 120, bw = 340;
        var out = '<svg width="' + w + '" height="' + h + '" viewBox="0 0 ' + w + ' ' + h + '">';
        rows.forEach(function (r, i) {
            var y = i * 22 + 4;
            out += '<text x="0" y="' + (y + 12) + '" font-size="10" fill="' + C.text + '">' + esc(r.name) + '</text>';
            out += '<rect x="' + lw + '" y="' + (y + 3) + '" width="' + bw + '" height="11" rx="3" fill="' + C.grayBg + '"/>';
            if (r.p > 0) out += '<rect x="' + lw + '" y="' + (y + 3) + '" width="' + (bw * r.p / 100).toFixed(1) + '" height="11" rx="3" fill="' + pctColor(r.p) + '"/>';
            out += '<text x="' + w + '" y="' + (y + 12) + '" font-size="10" font-weight="bold" text-anchor="end" fill="' + pctColor(r.p) + '">' + r.p + '%</text>';
        });
        return { svg: out + '</svg>', width: w };
    }

    function pdf(ctx) {
        var R = ctx.R, FW = ctx.FW, LVL = ctx.LVL, dstr = todayStr(), y = new Date().getFullYear(), PAGE = page(ctx);
        var content = [];
        function h1(t) { return { text: t, style: 'h1', pageBreak: 'before' }; }
        function codesLine(t) {
            var parts = [];
            FW.forEach(function (f) {
                var c = t.map[f.key] || []; if (!c.length) return;
                if (parts.length) parts.push({ text: '   ·   ', color: C.muted });
                parts.push({ text: f.label + ' ', color: C.muted });
                c.forEach(function (x, i) { if (i) parts.push({ text: ', ' }); parts.push({ text: x, link: guide(ctx, f, x), color: C.blue }); });
            });
            return { text: parts, fontSize: 8, margin: [0, 2, 0, 0] };
        }
        function kqlLine(t) {
            var k = (t.kql || []).filter(function (id) { return ctx.D.kql[id]; }); if (!k.length) return null;
            var parts = [{ text: 'Query από τη Βιβλιοθήκη KQL: ', color: C.muted }];
            k.forEach(function (id, i) { if (i) parts.push({ text: ' · ' }); parts.push({ text: ctx.D.kql[id], link: ctx.base + 'kql/#' + id, color: C.blue }); });
            return { text: parts, fontSize: 8, margin: [0, 2, 0, 0] };
        }

        // ---------- Σελίδα 1: σύνοψη ----------
        content.push({
            table: { widths: ['*'], body: [[{
                stack: [
                    { text: 'ΑΝΑΦΟΡΑ ΣΥΜΜΟΡΦΩΣΗΣ · MICROSOFT SECURE SCORE', fontSize: 8, color: '#93c5fd', characterSpacing: 1.5 },
                    { text: 'Από το Secure Score στη συμμόρφωση', fontSize: 20, bold: true, color: '#ffffff', margin: [0, 4, 0, 4] },
                    ctx.org ? { text: ctx.org, fontSize: 12, color: '#e2e8f0', margin: [0, 0, 0, 4] } : { text: '' },
                    { text: 'ΚΥΑ 1689/2025 · Οδηγία NIS2 · ISO/IEC 27001:2022 · GDPR', fontSize: 9, color: '#cbd5e1' },
                    { columns: [
                        { text: [{ text: 'Ημερομηνία  ', color: '#94a3b8' }, { text: dstr, color: '#ffffff' }], fontSize: 9 },
                        { text: [{ text: 'Συστάσεις  ', color: '#94a3b8' }, { text: String(R.recs.length), color: '#ffffff' }], fontSize: 9 },
                        { text: [{ text: 'Πόντοι  ', color: '#94a3b8' }, { text: fmt(R.tot.a) + ' / ' + fmt(R.tot.m), color: '#ffffff' }], fontSize: 9 }
                    ], margin: [0, 10, 0, 0] }
                ], fillColor: C.navy, margin: [16, 16, 16, 16]
            }]] }, layout: 'noBorders', margin: [0, 0, 0, 12]
        });
        var kpi = function (k, lab) { return { stack: [{ text: String(R.cnt[k]), style: 'kpi', color: LV[k].c }, { text: lab, style: 'kpiL' }], fillColor: LV[k].bg }; };
        content.push({ columns: [
            { width: 120, stack: [{ svg: donut(R.pct), width: 105, height: 105 }, { text: 'Microsoft Secure Score', alignment: 'center', fontSize: 8, color: C.muted, margin: [0, 2, 0, 0] }] },
            { width: '*', stack: [
                { text: verdict(R), fontSize: 10, color: C.text, lineHeight: 1.25, margin: [0, 4, 0, 8] },
                { table: { widths: ['*', '*', '*', '*', '*'], body: [[kpi('done', 'ολοκληρωμένες'), kpi('claimed', 'τρίτο ή εναλλακτικό'), kpi('partial', 'μερικώς'), kpi('open', 'ανοιχτές'), kpi('risk', 'αποδοχή κινδύνου')]] },
                    layout: { hLineWidth: function () { return 0; }, vLineWidth: function () { return 3; }, vLineColor: function () { return '#ffffff'; }, paddingTop: function () { return 6; }, paddingBottom: function () { return 6; } } }
            ] }
        ], columnGap: 16, margin: [0, 0, 0, 8] });
        content.push({ text: 'Κάλυψη ανά πλαίσιο', style: 'h2' });
        content.push({ svg: bars(R.fw.map(function (x) { return { name: x.f.label, p: x.p }; })).svg, width: 515 });
        content.push({ table: { headerRows: 1, widths: ['*', 62, 62, 70, 70], body: [[
            { text: 'Πλαίσιο', style: 'th' }, { text: 'Κάλυψη', style: 'th', alignment: 'center' }, { text: 'Απαιτήσεις', style: 'th', alignment: 'center' }, { text: 'Κάτω από 85%', style: 'th', alignment: 'center' }, { text: '85% και πάνω', style: 'th', alignment: 'center' }
        ]].concat(R.fw.map(function (x) {
            return [{ text: x.f.label, link: x.f.abs, color: C.blue }, { text: x.p + '%', alignment: 'center', bold: true, color: pctColor(x.p) }, { text: String(x.reqs.length), alignment: 'center' },
                { text: String(x.gaps), alignment: 'center', bold: true, color: x.gaps ? C.red : C.green }, { text: String(x.full), alignment: 'center', color: C.green }];
        })) }, layout: 'ssTable', margin: [0, 6, 0, 0] });
        if (R.gaps.length) {
            content.push({ text: 'Ξεκίνα από εδώ', style: 'h2', margin: [0, 10, 0, 4] });
            content.push({ ol: R.gaps.slice(0, 5).map(function (r) {
                return { text: [{ text: r.title, color: C.text }, { text: '  ' + r.theme.name + ' · +' + fmt(r.m - r.a) + ' πόντοι' + (r.lic === 'n' ? ' · χρειάζεται άδεια' : ''), color: C.muted, fontSize: 8 }], margin: [0, 0, 0, 3] };
            }), fontSize: 9.5 });
        }

        // ---------- Κενά με προτεραιότητα ----------
        if (R.gaps.length) {
            content.push(h1('Κενά με σειρά προτεραιότητας'));
            content.push({ text: 'Οι ανοιχτές και μερικές συστάσεις. Πρώτα τα θέματα που ζητούν ρητά τα πλαίσια, μετά όσα καλύπτει η άδεια, μετά οι περισσότεροι πόντοι που απομένουν. Για κάθε κενό, οι απαιτήσεις που επηρεάζει.', style: 'note', margin: [0, 0, 0, 8] });
            content.push({ table: { headerRows: 1, dontBreakRows: true, widths: [16, '*', 46, 150], body: [[
                { text: '#', style: 'th' }, { text: 'Σύσταση', style: 'th' }, { text: 'Πόντοι', style: 'th', alignment: 'center' }, { text: 'Απαιτήσεις', style: 'th' }
            ]].concat(R.gaps.map(function (r, i) {
                var st = LV[r.lvl];
                return [
                    { text: String(i + 1), fontSize: 8, color: C.muted },
                    { stack: [{ text: r.title, fontSize: 8.5, color: C.text }, { text: r.theme.name + (r.theme.high ? ' · υψηλή προτεραιότητα' : '') + (r.lic === 'n' ? ' · χρειάζεται άδεια' : '') + (r.via !== 'title' ? ' · αντιστοίχιση προς έλεγχο' : ''), fontSize: 7, color: r.theme.high ? C.red : C.muted, margin: [0, 1, 0, 0] }] },
                    { text: '+' + fmt(r.m - r.a), alignment: 'center', fontSize: 8.5, bold: true, color: st.c, fillColor: st.bg },
                    { text: FW.map(function (f) { var c = r.theme.map[f.key] || []; return c.length ? f.label.replace('Οδηγία ', '').replace('/IEC', '') + ' ' + c.join(', ') : ''; }).filter(Boolean).join('\n'), fontSize: 7, color: C.muted }
                ];
            })) }, layout: 'ssTable' });
        }

        // ---------- Καταστάσεις που θέλουν δικό σου τεκμήριο ----------
        if (R.claimed.length || R.risk.length) {
            content.push(h1('Καταστάσεις που θα ελέγξει ο ελεγκτής'));
            content.push({ text: 'Το Microsoft Secure Score δίνει πόντους για «Resolved through third party» και «Resolved through alternate mitigation» χωρίς να μπορεί να το επαληθεύσει. Το «Risk accepted» δεν δίνει πόντους, αλλά είναι απόφαση που πρέπει να είναι γραμμένη και εγκεκριμένη. Για όλες αυτές τις συστάσεις, το τεκμήριο το φέρνει ο οργανισμός.', style: 'note', margin: [0, 0, 0, 8] });
            var grp = function (list, lvl, title, text, req) {
                if (!list.length) return;
                content.push({ text: title + '  ·  ' + list.length, style: 'h3', color: LV[lvl].c });
                content.push({ text: text, style: 'body', margin: [0, 0, 0, 4] });
                content.push({ text: req, fontSize: 8, color: C.muted, margin: [0, 0, 0, 6] });
                content.push({ table: { headerRows: 1, dontBreakRows: true, widths: ['*', 90, 120, 60], body: [[
                    { text: 'Σύσταση', style: 'th' }, { text: 'Θέμα', style: 'th' }, { text: 'Τεκμήριο (αρχείο, θέση)', style: 'th' }, { text: 'Επανεξέταση', style: 'th' }
                ]].concat(list.map(function (r) { return [{ text: r.title, fontSize: 8.5 }, { text: r.theme.name, fontSize: 7.5, color: C.muted }, { text: '' }, { text: '' }]; })) }, layout: 'ssTable', margin: [0, 0, 0, 8] });
            };
            grp(R.claimed, 'claimed', 'Τρίτο εργαλείο ή εναλλακτικό μέτρο',
                'Για καθεμία: ποιο εργαλείο ή μέτρο την καλύπτει, στιγμιότυπο ή εξαγωγή της ρύθμισής του από την περίοδο του ελέγχου, και καταχώριση στο μητρώο αγαθών ή προμηθευτών. Αν είναι υπηρεσία τρίτου, και η σύμβαση με τους όρους ασφάλειας.',
                'ΚΥΑ 1689/2025 12.1.δ, 9.α · Οδηγία NIS2 21.2.δ, 21.2.στ · ISO/IEC 27001 A.5.19, A.5.22 · GDPR 28.1, 32.1.δ');
            grp(R.risk, 'risk', 'Αποδοχή κινδύνου',
                'Για καθεμία: καταχώριση στο μητρώο κινδύνων με εκτίμηση, αιτιολόγηση και αντισταθμιστικά μέτρα, έγκριση από τον ιδιοκτήτη του κινδύνου ή τη διοίκηση, και ημερομηνία επανεξέτασης. Στο ISO/IEC 27001 καταγράφεται και στο Statement of Applicability.',
                'ΚΥΑ 1689/2025 5.1.γ, 5.1.δ, 4.β · Οδηγία NIS2 21.2.α, 20.1 · ISO/IEC 27001 A.5.36 · GDPR 24.1, 32.2');
        }

        // ---------- Κάλυψη ανά απαίτηση ----------
        content.push(h1('Κάλυψη ανά απαίτηση'));
        content.push({ text: 'Για κάθε απαίτηση, οι πόντοι που έχουν κερδηθεί προς τους μέγιστους πόντους των συστάσεων που την υποστηρίζουν. Κάθε κωδικός είναι σύνδεσμος στην απαίτηση στον αντίστοιχο οδηγό του thecybersec.gr.', style: 'note', margin: [0, 0, 0, 6] });
        R.fw.forEach(function (x) {
            content.push({ text: x.f.label + '  ·  ' + x.p + '%  ·  ' + x.reqs.length + ' απαιτήσεις, ' + x.gaps + ' κάτω από 85%', style: 'h3' });
            content.push({ table: { headerRows: 1, dontBreakRows: true, widths: [44, '*', 40, 44, 46], body: [[
                { text: 'Κωδικός', style: 'th' }, { text: 'Απαίτηση', style: 'th' }, { text: 'Κάλυψη', style: 'th', alignment: 'center' }, { text: 'Συστάσεις', style: 'th', alignment: 'center' }, { text: 'Ανοιχτές', style: 'th', alignment: 'center' }
            ]].concat(x.reqs.map(function (q) {
                var g = q.recs.filter(function (r) { return r.lvl === 'open' || r.lvl === 'partial'; }).length;
                return [{ text: q.code, bold: true, fontSize: 8.5, color: C.blue, link: guide(ctx, x.f, q.code) }, { text: q.title, fontSize: 8 },
                    { text: q.p + '%', alignment: 'center', bold: true, fontSize: 8.5, color: pctColor(q.p), fillColor: pctBg(q.p) },
                    { text: String(q.recs.length), alignment: 'center', fontSize: 8.5 }, { text: String(g), alignment: 'center', fontSize: 8.5, color: g ? C.red : C.muted }];
            })) }, layout: 'ssTable', margin: [0, 0, 0, 6] });
        });

        // ---------- Ανά θέμα: τι θα ζητήσει ο ελεγκτής ----------
        content.push(h1('Τι θα ζητήσει ο ελεγκτής, ανά θέμα'));
        R.themes.forEach(function (g) {
            var stack = [
                { columns: [{ text: g.t.name, bold: true, fontSize: 10.5, color: C.text }, { text: g.p + '%', bold: true, fontSize: 10.5, color: pctColor(g.p), alignment: 'right', width: 40 }] },
                { text: [{ text: 'Τεκμήριο: ', bold: true, color: C.text }, { text: g.t.evidence }], fontSize: 8.5, margin: [0, 3, 0, 0] }
            ];
            var k = kqlLine(g.t); if (k) stack.push(k);
            stack.push(codesLine(g.t));
            stack.push({ ul: g.recs.map(function (r) {
                return { text: [{ text: r.title, fontSize: 8 }, { text: '  ' + LVL[r.lvl].label + ' · ' + fmt(r.a) + '/' + fmt(r.m), fontSize: 7, color: LV[r.lvl].c, bold: true }] };
            }), margin: [0, 4, 0, 0] });
            content.push({ table: { widths: [3, '*'], body: [[{ text: '', fillColor: pctColor(g.p) }, { stack: stack, margin: [8, 4, 4, 4] }]] }, layout: 'noBorders', margin: [0, 4, 0, 6], unbreakable: g.recs.length < 12 });
        });

        // ---------- Πλάνο με υπογραφές ----------
        if (R.gaps.length) {
            content.push(h1('Πλάνο διορθωτικών ενεργειών'));
            content.push({ text: 'Συμπλήρωσε υπεύθυνο (ρόλο), ημερομηνία στόχο (ηη/μμ/εεεε) και κατάσταση. Το εγκεκριμένο πλάνο είναι από μόνο του τεκμήριο ότι τα κενά διαχειρίζονται (ΚΥΑ 1689/2025 5.1.γ, 9.β · ISO/IEC 27001 A.5.36). Το ίδιο πλάνο, επεξεργάσιμο, υπάρχει στο αρχείο .xlsx.', style: 'note', margin: [0, 0, 0, 8] });
            content.push({ table: { headerRows: 1, dontBreakRows: true, widths: [14, '*', 60, 52, 52], body: [[
                { text: '#', style: 'th' }, { text: 'Ενέργεια', style: 'th' }, { text: 'Υπεύθυνος', style: 'th' }, { text: 'Στόχος', style: 'th' }, { text: 'Κατάσταση', style: 'th' }
            ]].concat(R.gaps.map(function (r, i) {
                return [{ text: String(i + 1), fontSize: 8, color: C.muted }, { stack: [{ text: r.title, fontSize: 8.5 }, { text: r.theme.name + (r.theme.high ? ' · υψηλή προτεραιότητα' : ''), fontSize: 7, color: r.theme.high ? C.red : C.muted }] }, { text: '' }, { text: '' }, { text: '' }];
            })) }, layout: 'ssTable' });
            var sig = function (role) { return { stack: [{ text: role, bold: true, fontSize: 9, color: C.text }, { text: 'Όνομα: ____________________________', fontSize: 8.5, margin: [0, 14, 0, 0] }, { text: 'Υπογραφή: _________________________', fontSize: 8.5, margin: [0, 14, 0, 0] }, { text: 'Ημερομηνία: ____/____/________', fontSize: 8.5, margin: [0, 14, 0, 0] }] }; };
            content.push({ columns: [sig('Συντάχθηκε από (ΥΑΣΠΕ / CISO)'), sig('Εγκρίθηκε από (Διοίκηση)')], columnGap: 30, margin: [0, 20, 0, 0], unbreakable: true });
        }

        // ---------- Μεθοδολογία και όροι ----------
        content.push(h1('Μεθοδολογία και όροι χρήσης'));
        content.push({ text: 'Πώς βγαίνει το αποτέλεσμα', style: 'h3' });
        content.push({ text: METHOD, style: 'body' });
        content.push({ text: 'Τι δεν καλύπτει', style: 'h3' });
        content.push({ text: LIMITS, style: 'body' });
        content.push({ text: 'Απόρρητο', style: 'h3' });
        content.push({ text: 'Το αρχείο CSV αναλύθηκε και η αναφορά δημιουργήθηκε μόνο μέσα στον browser του χρήστη. Κανένα δεδομένο του tenant δεν αποστάλθηκε στο thecybersec.gr ή σε τρίτους.', style: 'body' });
        content.push({ text: 'Πνευματικά δικαιώματα και όροι χρήσης', style: 'h3' });
        content.push({ table: { widths: [120, '*'], body: terms(ctx).map(function (t) { return [{ text: t[0], bold: true, fontSize: 8.5, color: C.text }, { text: t[1], fontSize: 8.5 }]; }) }, layout: 'ssTable' });

        var doc = {
            pageSize: 'A4', pageMargins: [40, 54, 40, 48],
            info: { title: 'Από το Secure Score στη συμμόρφωση' + (ctx.org ? ' · ' + ctx.org : ''), author: 'thecybersec.gr', subject: 'ΚΥΑ 1689/2025, NIS2, ISO/IEC 27001, GDPR', creator: 'thecybersec.gr' },
            header: function (cur) {
                if (cur === 1) return null;
                return { columns: [{ text: 'Από το Secure Score στη συμμόρφωση' + (ctx.org ? ' · ' + ctx.org : '') + ' · ' + dstr, fontSize: 7.5, color: C.muted }, { text: 'thecybersec.gr', fontSize: 7.5, color: C.blue, alignment: 'right', link: PAGE }], margin: [40, 24, 40, 0] };
            },
            footer: function (cur, total) {
                return { columns: [{ text: '© ' + y + ' Δημοσθένης Αττέια · thecybersec.gr · Ενδεικτικό, όχι ελεγκτική γνώμη', fontSize: 7, color: C.muted }, { text: 'Σελίδα ' + cur + ' από ' + total, fontSize: 7.5, color: C.muted, alignment: 'right' }], margin: [40, 16, 40, 0] };
            },
            content: content,
            defaultStyle: { font: 'Roboto', fontSize: 9.5, color: '#334155', lineHeight: 1.15 },
            styles: {
                h1: { fontSize: 16, bold: true, color: C.navy, margin: [0, 0, 0, 10] },
                h2: { fontSize: 11.5, bold: true, color: C.navy, margin: [0, 6, 0, 6] },
                h3: { fontSize: 10.5, bold: true, color: C.navy, margin: [0, 10, 0, 5] },
                th: { bold: true, fontSize: 8.5, color: '#ffffff', fillColor: C.navy },
                kpi: { fontSize: 18, bold: true, alignment: 'center' },
                kpiL: { fontSize: 7.5, color: C.muted, alignment: 'center' },
                note: { fontSize: 9, color: C.muted, lineHeight: 1.25 },
                body: { fontSize: 9.5, lineHeight: 1.3 }
            }
        };
        var layouts = { ssTable: {
            hLineWidth: function (i, node) { return i === 0 || i === node.table.body.length ? 0 : 0.5; }, vLineWidth: function () { return 0; },
            hLineColor: function () { return C.line; }, paddingTop: function () { return 4; }, paddingBottom: function () { return 4; },
            paddingLeft: function () { return 6; }, paddingRight: function () { return 6; }
        } };
        return new Promise(function (res) { window.pdfMake.createPdf(doc, layouts).download(fileName(ctx, 'pdf'), res); });
    }

    window.SecureScoreExport = { xlsx: xlsx, pdf: pdf };
})();
