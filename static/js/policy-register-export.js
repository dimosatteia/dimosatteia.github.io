/* Εξαγωγές και εισαγωγή του εργαλείου «Μητρώο υποχρεωτικών πολιτικών της ΚΥΑ 1689/2025» · thecybersec.gr
   xlsx: ExcelJS (static/js/exceljs, MIT). pdf: pdfmake.
   Όλα γίνονται στον browser. Δεν αποστέλλεται κανένα στοιχείο.
   Καλείται από το shortcode policy-register: window.PolicyRegisterExport.xlsx(ctx) / .pdf(ctx) / .read(arrayBuffer, D) */
(function () {
    'use strict';
    var C = {
        navy: '#0f172a', blue: '#2563eb', text: '#1e293b', muted: '#64748b', line: '#e2e8f0', band: '#f8fafc',
        amber: '#b45309', amberBg: '#fef3c7', green: '#047857', greenBg: '#d1fae5', red: '#be123c', redBg: '#ffe4e6', sky: '#0369a1', skyBg: '#e0f2fe', grayBg: '#f1f5f9'
    };
    var PCOL = { critical: [C.red, C.redBg], high: [C.amber, C.amberBg], medium: [C.sky, C.skyBg], low: [C.muted, C.grayBg] };
    var SHEET = 'Μητρώο πολιτικών';
    var ACTION_ST = ['Ανοιχτή', 'Σε εξέλιξη', 'Ολοκληρώθηκε'];

    function pad(n) { return (n < 10 ? '0' : '') + n; }
    function todayStr() { var d = new Date(); return pad(d.getDate()) + '/' + pad(d.getMonth() + 1) + '/' + d.getFullYear(); }
    // ηη/μμ/εεεε -> ημερομηνία Excel (UTC μεσάνυχτα, ώστε να μη μετακινείται με τη ζώνη ώρας)
    function xd(s) { var m = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(s || ''); return m ? new Date(Date.UTC(+m[3], +m[2] - 1, +m[1])) : null; }
    function entName(e) { return e === 'essential' ? 'Βασική οντότητα' : 'Σημαντική οντότητα'; }
    function fileName(r, ext) {
        var s = (r.org || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 30);
        return 'mitroo-politikon' + (s ? '-' + s : '') + '-' + new Date().toISOString().slice(0, 10) + '.' + ext;
    }
    function save(blob, name) {
        var a = document.createElement('a');
        a.href = URL.createObjectURL(blob); a.download = name;
        document.body.appendChild(a); a.click();
        setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 1500);
    }
    function colL(n) { var s = ''; while (n > 0) { var m = (n - 1) % 26; s = String.fromCharCode(65 + m) + s; n = Math.floor((n - 1) / 26); } return s; }
    function prioLabel(PRIO, k) { for (var i = 0; i < PRIO.length; i++) if (PRIO[i].key === k) return PRIO[i].label; return k; }

    function copyright(page) {
        var y = new Date().getFullYear();
        return [
            ['Πνευματικά δικαιώματα και όροι χρήσης', ''],
            ['Δικαιούχος', '© ' + y + ' Δημοσθένης Αττέια, thecybersec.gr. Με επιφύλαξη παντός δικαιώματος.'],
            ['Τι προστατεύεται', 'Ο κατάλογος των εγγράφων, οι περιγραφές, η αντιστοίχιση με τις απαιτήσεις των πλαισίων, οι κανόνες των ευρημάτων και η δομή του μητρώου είναι πρωτότυπο έργο του συντάκτη και προστατεύονται από τον ν. 2121/1993. Τα κείμενα της ΚΥΑ 1689/2025, της Οδηγίας (ΕΕ) 2022/2555 και του Κανονισμού (ΕΕ) 2016/679 είναι δημόσια έγγραφα και δεν αποτελούν αντικείμενο αυτής της προστασίας.'],
            ['Τι επιτρέπεται', 'Η χρήση του μητρώου για τις εσωτερικές ανάγκες του οργανισμού σας, καθώς και η επίδειξή του σε ελεγκτές και αρμόδιες αρχές στο πλαίσιο ελέγχου.'],
            ['Τι απαγορεύεται χωρίς γραπτή άδεια του συντάκτη', 'Η αναδημοσίευση, η αναδιανομή και η ανάρτηση του μητρώου ή τμήματός του σε ιστότοπους, πλατφόρμες ή μέσα κοινωνικής δικτύωσης. Η εμπορική εκμετάλλευση, μαζί με την ενσωμάτωσή του σε προϊόντα, υπηρεσίες, εκπαιδευτικό υλικό ή παραδοτέα προς τρίτους. Η αφαίρεση ή η αλλοίωση της αναφοράς στον συντάκτη και στην πηγή.'],
            ['Πώς το μοιράζεστε', 'Με παραπομπή στη σελίδα ' + page + '.'],
            ['Επικοινωνία για άδεια χρήσης', 'Μέσω LinkedIn: https://www.linkedin.com/in/dimosthenisatteia/']
        ];
    }

    // ---------- XLSX ----------
    function xlsx(ctx) {
        var r = ctx.r, D = ctx.D, FW = ctx.FW, ExcelJS = window.ExcelJS;
        var page = ctx.base + 'mitroo-politikon/';
        var ST = {}; D.statuses.forEach(function (s) { ST[s.key] = s.label; });
        var GR = {}; D.groups.forEach(function (g) { GR[g.key] = g.name; });
        var wb = new ExcelJS.Workbook();
        wb.creator = 'thecybersec.gr'; wb.created = new Date();
        var fill = function (argb) { return { type: 'pattern', pattern: 'solid', fgColor: { argb: argb } }; };
        var thin = { style: 'thin', color: { argb: 'FFCBD5E1' } }, border = { top: thin, left: thin, bottom: thin, right: thin };
        function header(row) {
            row.eachCell(function (c) { c.fill = fill('FF0F172A'); c.font = { bold: true, color: { argb: 'FFFFFFFF' } }; c.alignment = { vertical: 'middle', wrapText: true }; c.border = border; });
            row.height = 32;
        }
        var N = r.rows.length, last = N + 1, K = r.core, X = r.extra;
        var coreName = (D.groups.filter(function (g) { return g.core; })[0] || {}).name || '';

        // 1. Οδηγίες
        var wi = wb.addWorksheet('Οδηγίες', { views: [{ showGridLines: false }] });
        wi.getColumn(1).width = 30; wi.getColumn(2).width = 100;
        wi.mergeCells('A1:B1');
        wi.getCell('A1').value = 'Μητρώο υποχρεωτικών πολιτικών και διαδικασιών · ΚΥΑ 1689/2025';
        wi.getCell('A1').font = { bold: true, size: 16, color: { argb: 'FF0F172A' } };
        wi.getRow(1).height = 28;
        var info = [
            ['Οντότητα', r.org || ''],
            ['Είδος', entName(r.entity)],
            ['Ημερομηνία', todayStr()],
            ['Πολιτικές του άρθρου 6 (πυρήνας)', K.approved + ' από ' + K.N + ' εγκεκριμένες (' + K.pct + '%), ' + K.ready + ' σε τάξη για τον έλεγχο'],
            ['Λοιπή τεκμηρίωση (άρθρα 4 έως 25)', X.approved + ' από ' + X.N + ' εγκεκριμένα (' + X.pct + '%), ' + X.ready + ' σε τάξη για τον έλεγχο'],
            ['Σύνολο εγγράφων', N + ', από τα οποία ' + r.cnt.approved + ' εγκεκριμένα (' + r.pct + '%) και ' + r.ready + ' σε τάξη'],
            ['Κενά', r.gaps.length + (r.crit ? ', από τα οποία ' + r.crit + ' κρίσιμα' : '')],
            ['', ''],
            ['Τι είναι', 'Το μητρώο των πολιτικών, διαδικασιών, πλάνων και μητρώων που ζητά η ΚΥΑ 1689/2025 (ΦΕΚ Β΄ 2186/06.05.2025), με την κατάσταση, τον υπεύθυνο, την έγκριση από το ανώτατο όργανο διοίκησης και τις αναθεωρήσεις κάθε εγγράφου. Είναι το «έγγραφο» τεκμήριο του άρθρου 3 παρ. 3 περ. α της ΚΥΑ.'],
            ['Πυρήνας και λοιπή τεκμηρίωση', 'Η ΚΥΑ απαριθμεί ρητά μόνο 12 πολιτικές, στο άρθρο 6: τη γενική πολιτική ασφάλειας πληροφοριών και 11 ελάχιστες θεματικές. Αυτές είναι ο πυρήνας του μητρώου (ενότητα «' + coreName + '»). Τα υπόλοιπα έγγραφα είναι η λοιπή τεκμηρίωση που ζητούν τα άρθρα 4 έως 25 χωρίς να τη διατυπώνουν ως λίστα εγγράφων. Δεν είναι προαιρετικά. Η ΚΥΑ δεν ορίζει συνολικό αριθμό εγγράφων: η ομαδοποίηση της λοιπής τεκμηρίωσης είναι του εργαλείου.'],
            ['Πώς το ενημερώνεις', 'Στο φύλλο «Μητρώο πολιτικών» αλλάζεις την κατάσταση από τη λίστα και γράφεις τις ημερομηνίες ως ηη/μμ/εεεε. Η επόμενη αναθεώρηση υπολογίζεται μόνη της από την τελευταία αναθεώρηση ή την έγκριση του ΔΣ και τον κύκλο σε μήνες, και γίνεται κόκκινη όταν περάσει. Μην αλλάζεις τη στήλη «Κωδικός»: με αυτήν το εργαλείο διαβάζει πίσω το αρχείο.'],
            ['Τα κενά', 'Το φύλλο «Κενά και ενέργειες» έχει κάθε εύρημα με προτεραιότητα και προτεινόμενη ενέργεια. Συμπλήρωσε υπεύθυνο, προθεσμία και κατάσταση. Είναι το πλάνο διορθωτικών ενεργειών που ζητά το άρθρο 9 περ. β.'],
            ['Συνέχεια', 'Φόρτωσε αυτό το αρχείο στη σελίδα του εργαλείου (' + page + ') για να δεις ξανά ποσοστό, κενά και αναφορά .pdf με τα σημερινά δεδομένα.'],
            ['Κύκλος αναθεώρησης', 'Η ΚΥΑ ζητά αξιολόγηση «σε προγραμματισμένα χρονικά διαστήματα» και μετά από σοβαρά περιστατικά ή σημαντικές αλλαγές. Οι 12 μήνες της στήλης «Κύκλος» είναι η συνήθης πρακτική, όχι κείμενο της ΚΥΑ. Άλλαξέ τους αν η δική σου πολιτική ορίζει άλλο διάστημα.'],
            ['Πηγή', 'Δημοσθένης Αττέια, Microsoft 365 Security Insights. Το εργαλείο: ' + page],
            ['Αποποίηση', 'Το μητρώο βασίζεται μόνο σε όσα δηλώθηκαν. Το εργαλείο δεν διαβάζει τα έγγραφα και δεν κρίνει το περιεχόμενό τους. Δεν είναι ελεγκτική γνώμη ούτε νομική συμβουλή.'],
            ['', '']
        ].concat(copyright(page));
        info.forEach(function (x, i) {
            var row = wi.getRow(i + 3); row.values = x;
            row.getCell(1).font = { bold: true, color: { argb: 'FF334155' } };
            row.getCell(2).alignment = { wrapText: true, vertical: 'top' }; row.getCell(1).alignment = { vertical: 'top', wrapText: true };
            if (x[0] === 'Πνευματικά δικαιώματα και όροι χρήσης') row.getCell(1).font = { bold: true, size: 12, color: { argb: 'FF0F172A' } };
        });

        // 2. Μητρώο πολιτικών
        var ws = wb.addWorksheet(SHEET, { views: [{ state: 'frozen', xSplit: 2, ySplit: 1 }] });
        var cols = [
            ['Κωδικός', 10], ['Έγγραφο', 46], ['Είδος', 12], ['Ενότητα', 24], ['ΚΥΑ 1689/2025', 26], ['Έγκριση ΔΣ απαιτείται', 12],
            ['Κατάσταση', 15], ['Υπεύθυνος (owner)', 15], ['Έκδοση', 9], ['Έγκριση από το ΔΣ', 13], ['Τελευταία αναθεώρηση', 13], ['Κύκλος (μήνες)', 9],
            ['Επόμενη αναθεώρηση', 13], ['Ημερομηνία στόχος', 13], ['Παρατηρήσεις', 34], ['Ευρήματα', 50], ['Κωδικοί ΚΥΑ 1689/2025', 22],
            ['Οδηγία NIS2', 18], ['ISO/IEC 27001', 22], ['GDPR', 14], ['Τεκμήριο που θα ζητηθεί', 50], ['MITRE ATT&CK®', 18]
        ];
        ws.columns = cols.map(function (c) { return { header: c[0], width: c[1] }; });
        header(ws.getRow(1));
        r.rows.forEach(function (x, i) {
            var n = i + 2, it = x.it;
            var iso = (it.map.iso || []).slice(); if (it.clause) iso.push(it.clause);
            var row = ws.getRow(n);
            row.values = [
                it.id, it.title, D.kinds[it.kind], GR[it.group], it.kya, it.board ? 'Ναι' : 'Όχι',
                ST[x.st], x.owner || null, x.ver || null, xd(x.board), xd(x.last), it.cycle,
                null, xd(x.target), x.notes || null,
                x.f.map(function (f) { return '[' + prioLabel(ctx.PRIO, f.p) + '] ' + f.text; }).join('\n') || null,
                (it.map.kya || []).join(', '), (it.map.nis2 || []).join(', '), iso.join(', '), (it.map.gdpr || []).join(', '), it.evidence, (it.mitre || []).join(', ') || null
            ];
            // Επόμενη αναθεώρηση: τύπος, ώστε να ενημερώνεται μόνη της. Αν ο χρήστης έδωσε δική του ημερομηνία, κρατάμε την τιμή.
            var nextCell = row.getCell(13);
            if (x.st === 'approved' && !x.nextAuto && x.next) nextCell.value = xd(x.next);
            else nextCell.value = { formula: 'IF(G' + n + '="' + ST.approved + '",IF(MAX(J' + n + ',K' + n + ')=0,"",EDATE(MAX(J' + n + ',K' + n + '),L' + n + ')),"")', result: x.nextShown ? xd(x.nextShown) : '' };
            [10, 11, 13, 14].forEach(function (c) { row.getCell(c).numFmt = 'dd/mm/yyyy'; });
            row.eachCell({ includeEmpty: true }, function (c, cn) {
                c.border = border; c.alignment = { vertical: 'top', wrapText: cn === 2 || cn === 5 || cn >= 15 };
                if (cn >= 7 && cn <= 15 && cn !== 12) c.fill = fill('FFFFFBEB');
            });
            row.getCell(1).font = { name: 'Consolas', color: { argb: 'FF475569' } };
        });
        var dv = function (ref, o) { for (var n = 2; n <= last; n++) ws.getCell(ref + n).dataValidation = o; };
        dv('G', { type: 'list', allowBlank: false, formulae: ['"' + D.statuses.map(function (s) { return s.label; }).join(',') + '"'], showErrorMessage: true, errorTitle: 'Κατάσταση', error: 'Διάλεξε από τη λίστα.' });
        dv('H', { type: 'list', allowBlank: true, formulae: ['"' + D.roles.join(',') + '"'], showErrorMessage: true, errorStyle: 'information', errorTitle: 'Υπεύθυνος', error: 'Δεν είναι στη λίστα. Γράψε μόνο ρόλο, όχι όνομα.' });
        ['J', 'K', 'M', 'N'].forEach(function (c) {
            dv(c, { type: 'date', operator: 'between', allowBlank: true, formulae: [new Date(Date.UTC(1990, 0, 1)), new Date(Date.UTC(2100, 11, 31))], showErrorMessage: true, errorTitle: 'Ημερομηνία', error: 'Γράψε ημερομηνία ως ηη/μμ/εεεε.' });
        });
        dv('L', { type: 'whole', operator: 'between', allowBlank: false, formulae: [1, 60], showErrorMessage: true, errorTitle: 'Κύκλος', error: 'Μήνες, από 1 έως 60.' });
        ws.autoFilter = { from: 'A1', to: colL(cols.length) + '1' };
        var rng = 'G2:G' + last;
        ws.addConditionalFormatting({ ref: rng, rules: [
            { type: 'containsText', operator: 'containsText', text: ST.approved, priority: 1, style: { fill: fill('FFD1FAE5'), font: { color: { argb: 'FF047857' } } } },
            { type: 'containsText', operator: 'containsText', text: ST.draft, priority: 2, style: { fill: fill('FFFEF3C7'), font: { color: { argb: 'FFB45309' } } } },
            { type: 'containsText', operator: 'containsText', text: ST.none, priority: 3, style: { fill: fill('FFFFE4E6'), font: { color: { argb: 'FFBE123C' } } } },
            { type: 'containsText', operator: 'containsText', text: ST.unknown, priority: 4, style: { fill: fill('FFF1F5F9'), font: { color: { argb: 'FF475569' } } } }
        ] });
        ws.addConditionalFormatting({ ref: 'M2:M' + last, rules: [{ type: 'expression', priority: 5, formulae: ['AND(ISNUMBER(M2),M2<TODAY())'], style: { fill: fill('FFFFE4E6'), font: { bold: true, color: { argb: 'FFBE123C' } } } }] });
        ws.addConditionalFormatting({ ref: 'J2:J' + last, rules: [{ type: 'expression', priority: 6, formulae: ['AND($F2="Ναι",$G2="' + ST.approved + '",J2="")'], style: { fill: fill('FFFFE4E6') } }] });

        // 3. Σύνοψη, με τύπους που ακολουθούν τις αλλαγές στο μητρώο
        var wsum = wb.addWorksheet('Σύνοψη', { views: [{ showGridLines: false }] });
        wsum.getColumn(1).width = 44; wsum.getColumn(2).width = 14; wsum.getColumn(3).width = 14; wsum.getColumn(4).width = 16;
        wsum.getCell('A1').value = 'Σύνοψη · ενημερώνεται μόνη της από το φύλλο «' + SHEET + '»';
        wsum.getCell('A1').font = { bold: true, size: 13, color: { argb: 'FF0F172A' } };
        var S = "'" + SHEET + "'!", G = S + '$G$2:$G$' + last, Dg = S + '$D$2:$D$' + last, M = S + '$M$2:$M$' + last;
        var sum = [
            ['Όλα τα έγγραφα του μητρώου', { formula: 'COUNTA(' + S + '$A$2:$A$' + last + ')', result: N }],
            [ST.approved, { formula: 'COUNTIF(' + G + ',"' + ST.approved + '")', result: r.cnt.approved }],
            [ST.draft, { formula: 'COUNTIF(' + G + ',"' + ST.draft + '")', result: r.cnt.draft }],
            [ST.none, { formula: 'COUNTIF(' + G + ',"' + ST.none + '")', result: r.cnt.none }],
            [ST.unknown, { formula: 'COUNTIF(' + G + ',"' + ST.unknown + '")', result: r.cnt.unknown }],
            ['Κάλυψη όλων (εγκεκριμένα προς σύνολο)', { formula: 'IFERROR(B4/B3,0)', result: N ? r.cnt.approved / N : 0 }],
            ['Εκπρόθεσμες αναθεωρήσεις σήμερα', { formula: 'COUNTIFS(' + M + ',"<"&TODAY(),' + G + ',"' + ST.approved + '")' }],
            ['Χωρίς έγκριση ΔΣ, ενώ τη ζητά η ΚΥΑ', { formula: 'COUNTIFS(' + S + '$F$2:$F$' + last + ',"Ναι",' + G + ',"' + ST.approved + '",' + S + '$J$2:$J$' + last + ',"")' }],
            ['Πολιτικές του άρθρου 6 (πυρήνας)', { formula: 'COUNTIF(' + Dg + ',"' + coreName + '")', result: K.N }],
            ['Πολιτικές του άρθρου 6 εγκεκριμένες', { formula: 'COUNTIFS(' + Dg + ',"' + coreName + '",' + G + ',"' + ST.approved + '")', result: K.approved }],
            ['Κάλυψη των πολιτικών του άρθρου 6', { formula: 'IFERROR(B12/B11,0)', result: K.N ? K.approved / K.N : 0 }]
        ];
        sum.forEach(function (x, i) { var row = wsum.getRow(i + 3); row.values = x; row.getCell(1).font = { bold: true, color: { argb: 'FF334155' } }; });
        wsum.getCell('B8').numFmt = '0%'; wsum.getCell('B13').numFmt = '0%';
        var gh = wsum.getRow(15); gh.values = ['Ενότητα', 'Έγγραφα', ST.approved, 'Κάλυψη']; header(gh);
        r.groups.forEach(function (g, i) {
            var n = 16 + i, row = wsum.getRow(n);
            row.values = [g.g.name, { formula: 'COUNTIF(' + Dg + ',A' + n + ')', result: g.n }, { formula: 'COUNTIFS(' + Dg + ',A' + n + ',' + G + ',"' + ST.approved + '")', result: g.ok }, { formula: 'IFERROR(C' + n + '/B' + n + ',0)', result: g.n ? g.ok / g.n : 0 }];
            row.getCell(4).numFmt = '0%'; row.eachCell(function (c) { c.border = border; });
        });

        // 4. Κενά και ενέργειες
        var wg = wb.addWorksheet('Κενά και ενέργειες', { views: [{ state: 'frozen', ySplit: 1 }] });
        wg.columns = [['Α/Α', 6], ['Προτεραιότητα', 13], ['Κωδικός', 10], ['Έγγραφο', 40], ['Εύρημα', 55], ['Προτεινόμενη ενέργεια', 55], ['Υπεύθυνος', 14], ['Προθεσμία', 13], ['Κατάσταση ενέργειας', 16], ['Σχόλια', 34]]
            .map(function (c) { return { header: c[0], width: c[1] }; });
        header(wg.getRow(1));
        var PF = { critical: 'FFFFE4E6', high: 'FFFEF3C7', medium: 'FFE0F2FE', low: 'FFF1F5F9' };
        r.gaps.forEach(function (g, i) {
            var n = i + 2, row = wg.getRow(n);
            row.values = [i + 1, prioLabel(ctx.PRIO, g.f.p), g.r.it.id, g.r.it.title, g.f.text, g.f.action, g.r.owner || null, xd(g.r.target), ACTION_ST[0], null];
            row.getCell(8).numFmt = 'dd/mm/yyyy';
            row.eachCell({ includeEmpty: true }, function (c) { c.border = border; c.alignment = { vertical: 'top', wrapText: true }; });
            row.getCell(2).fill = fill(PF[g.f.p]);
            row.getCell(9).dataValidation = { type: 'list', allowBlank: false, formulae: ['"' + ACTION_ST.join(',') + '"'] };
            row.getCell(7).dataValidation = { type: 'list', allowBlank: true, formulae: ['"' + D.roles.join(',') + '"'], showErrorMessage: true, errorStyle: 'information', error: 'Γράψε μόνο ρόλο, όχι όνομα.' };
            row.getCell(8).dataValidation = { type: 'date', operator: 'greaterThan', allowBlank: true, formulae: [new Date(Date.UTC(2020, 0, 1))], showErrorMessage: true, error: 'Γράψε ημερομηνία ως ηη/μμ/εεεε.' };
        });
        if (r.gaps.length) wg.autoFilter = { from: 'A1', to: 'J1' };

        // 5. Ανά πλαίσιο
        var wf = wb.addWorksheet('Ανά πλαίσιο', { views: [{ state: 'frozen', ySplit: 1 }] });
        wf.columns = [['Πλαίσιο', 18], ['Κωδικός', 12], ['Κατάσταση', 22], ['Έγγραφα του μητρώου', 30], ['Σύνδεσμος', 50]].map(function (c) { return { header: c[0], width: c[1] }; });
        header(wf.getRow(1));
        var LV = ['Λείπει', 'Σε σχέδιο ή με εύρημα', 'Σε τάξη'];
        var fr = 2;
        r.cover.forEach(function (c) {
            c.codes.forEach(function (k) {
                var url = c.f.url + '#' + String(k).replace(/\./g, '-');
                var row = wf.getRow(fr++);
                row.values = [c.f.label, k, LV[c.lv[k]], c.refs[k].join(', '), { text: url, hyperlink: url }];
                row.getCell(5).font = { color: { argb: 'FF2563EB' }, underline: true };
                row.getCell(3).fill = fill(c.lv[k] === 2 ? 'FFD1FAE5' : c.lv[k] === 1 ? 'FFFEF3C7' : 'FFFFE4E6');
                row.eachCell(function (x) { x.border = border; });
            });
        });

        // 6. Κρυφό φύλλο για τη φόρτωση πίσω στο εργαλείο
        var wm = wb.addWorksheet('_meta', { state: 'veryHidden' });
        wm.getCell('A1').value = JSON.stringify({ tool: 'policy-register', v: 2, entity: r.entity, org: r.org || '' });

        wb.calcProperties = { fullCalcOnLoad: true };
        return wb.xlsx.writeBuffer().then(fixValidations).then(function (buf) {
            save(new Blob([buf], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }), fileName(r, 'xlsx'));
        });
    }

    // Το ExcelJS (4.4) ενώνει τα data validations ταξινομώντας τις διευθύνσεις ως κείμενο (G10 πριν από το G2),
    // και γράφει περιοχές που επικαλύπτονται, π.χ. G10:G31 και G2:G31. Το Excel τότε ζητά «επιδιόρθωση» του αρχείου.
    // Εδώ κρατάμε μόνο τη μεγαλύτερη από όσες είναι ίδιες και η μία περιέχει την άλλη. Χρειάζεται το JSZip.
    function rng(sq) {
        var m = /^([A-Z]+)(\d+)(?::([A-Z]+)(\d+))?$/.exec(sq); if (!m) return null;
        function cn(l) { var n = 0; for (var i = 0; i < l.length; i++) n = n * 26 + l.charCodeAt(i) - 64; return n; }
        return { c1: cn(m[1]), r1: +m[2], c2: cn(m[3] || m[1]), r2: +(m[4] || m[2]) };
    }
    function inside(a, b) { return a && b && a.c1 >= b.c1 && a.c2 <= b.c2 && a.r1 >= b.r1 && a.r2 <= b.r2; }
    function fixValidations(buf) {
        var JSZip = window.JSZip; if (!JSZip) return buf;
        return JSZip.loadAsync(buf).then(function (zip) {
            var names = Object.keys(zip.files).filter(function (n) { return /^xl\/worksheets\/sheet\d+\.xml$/.test(n); });
            return Promise.all(names.map(function (n) {
                return zip.file(n).async('string').then(function (xml) {
                    var out = xml.replace(/<dataValidations[^>]*>([\s\S]*?)<\/dataValidations>/, function (all, inner) {
                        var nodes = inner.match(/<dataValidation [\s\S]*?<\/dataValidation>/g) || [];
                        var list = nodes.map(function (x) { var sq = (/ sqref="([^"]+)"/.exec(x) || [])[1]; return { x: x, key: x.replace(/ sqref="[^"]*"/, ''), r: rng(sq), sq: sq }; });
                        var keep = list.filter(function (a, i) {
                            return !list.some(function (b, j) { return j !== i && b.key === a.key && inside(a.r, b.r) && (b.sq !== a.sq || j < i); });
                        });
                        return '<dataValidations count="' + keep.length + '">' + keep.map(function (k) { return k.x; }).join('') + '</dataValidations>';
                    });
                    zip.file(n, out);
                });
            })).then(function () { return zip.generateAsync({ type: 'arraybuffer', compression: 'DEFLATE' }); });
        });
    }

    // ---------- Ανάγνωση .xlsx που κατέβηκε από το εργαλείο ----------
    function read(buf, D) {
        var wb = new window.ExcelJS.Workbook();
        return wb.xlsx.load(buf).then(function () {
            var ws = wb.getWorksheet(SHEET);
            if (!ws) throw new Error('no sheet');
            var IT = {}; D.items.forEach(function (i) { IT[i.id] = i; });
            var LBL = {}; D.statuses.forEach(function (s) { LBL[s.label.toLowerCase()] = s.key; });
            var H = {};
            ws.getRow(1).eachCell(function (c, n) { H[String(c.value || '').trim()] = n; });
            function col(name) { return H[name]; }
            function raw(row, name) { var n = col(name); if (!n) return null; var v = row.getCell(n).value; return v && typeof v === 'object' && !(v instanceof Date) && 'result' in v ? v.result : v; }
            function isFormula(row, name) { var n = col(name); if (!n) return false; var v = row.getCell(n).value; return !!(v && typeof v === 'object' && v.formula); }
            function txt(row, name) { var v = raw(row, name); if (v == null) return ''; if (typeof v === 'object' && v.richText) return v.richText.map(function (t) { return t.text; }).join(''); return String(v).trim(); }
            function date(row, name) {
                var v = raw(row, name);
                if (v instanceof Date && !isNaN(v)) return pad(v.getUTCDate()) + '/' + pad(v.getUTCMonth() + 1) + '/' + v.getUTCFullYear();
                if (typeof v === 'number' && v > 20000 && v < 80000) { var d = new Date(Math.round((v - 25569) * 86400000)); return pad(d.getUTCDate()) + '/' + pad(d.getUTCMonth() + 1) + '/' + d.getUTCFullYear(); }
                var s = typeof v === 'string' ? v.trim() : '', m = /^(\d{1,2})[\/.\-](\d{1,2})[\/.\-](\d{4})$/.exec(s);
                return m ? pad(+m[1]) + '/' + pad(+m[2]) + '/' + m[3] : '';
            }
            if (!col('Κωδικός') || !col('Κατάσταση')) throw new Error('no columns');
            var items = {};
            ws.eachRow(function (row, n) {
                if (n === 1) return;
                var id = txt(row, 'Κωδικός').toUpperCase(); if (!IT[id]) return;
                var st = LBL[txt(row, 'Κατάσταση').toLowerCase()] || 'unknown';
                items[id] = {
                    st: st, owner: txt(row, 'Υπεύθυνος (owner)'), ver: txt(row, 'Έκδοση').slice(0, 10), notes: txt(row, 'Παρατηρήσεις').slice(0, 200),
                    board: date(row, 'Έγκριση από το ΔΣ'), last: date(row, 'Τελευταία αναθεώρηση'),
                    next: isFormula(row, 'Επόμενη αναθεώρηση') ? '' : date(row, 'Επόμενη αναθεώρηση'), target: date(row, 'Ημερομηνία στόχος')
                };
            });
            var meta = {}, wm = wb.getWorksheet('_meta');
            try { if (wm) meta = JSON.parse(String(wm.getCell('A1').value || '{}')); } catch (e) { meta = {}; }
            var entity = meta.entity === 'essential' || meta.entity === 'important' ? meta.entity
                : D.items.some(function (i) { return i.scope === 'essential' && items[i.id]; }) ? 'essential' : 'important';
            return { entity: entity, org: typeof meta.org === 'string' ? meta.org.slice(0, 80) : '', items: items };
        });
    }

    // ---------- PDF ----------
    function pdf(ctx) {
        var r = ctx.r, D = ctx.D, page = ctx.base + 'mitroo-politikon/';
        var ST = {}; D.statuses.forEach(function (s) { ST[s.key] = s.label; });
        var STC = { approved: C.green, draft: C.amber, none: C.red, unknown: C.muted };
        function h1(t, brk, orient) { return { text: t, style: 'h1', pageBreak: brk ? 'before' : undefined, pageOrientation: orient }; }
        function bar(w, pctDraft, pctA, pctB) {
            return { canvas: [
                { type: 'rect', x: 0, y: 0, w: w, h: 7, r: 2, color: '#e2e8f0' },
                { type: 'rect', x: 0, y: 0, w: Math.max(0.01, w * pctDraft), h: 7, r: 2, color: '#fbbf24' },
                { type: 'rect', x: 0, y: 0, w: Math.max(0.01, w * pctA), h: 7, r: 2, color: '#a7f3d0' },
                { type: 'rect', x: 0, y: 0, w: Math.max(0.01, w * pctB), h: 7, r: 2, color: '#10b981' }
            ] };
        }
        // Η Roboto του pdfmake δεν έχει τετράγωνα και βέλη: το υπόμνημα σχεδιάζεται με canvas
        function legend(list, mb) {
            var cols = [];
            list.forEach(function (x) {
                cols.push({ width: 8, canvas: [{ type: 'rect', x: 0, y: 2, w: 6, h: 6, color: x[0] }] });
                cols.push({ width: 'auto', text: x[1], fontSize: 7.5, color: C.muted, margin: [0, 0, 10, 0] });
            });
            return { columns: cols, columnGap: 2, margin: [0, 0, 0, mb] };
        }
        var content = [];
        content.push({
            table: { widths: ['*'], body: [[{
                stack: [
                    { text: 'ΜΗΤΡΩΟ ΥΠΟΧΡΕΩΤΙΚΩΝ ΠΟΛΙΤΙΚΩΝ ΚΑΙ ΔΙΑΔΙΚΑΣΙΩΝ', color: '#93c5fd', fontSize: 9, bold: true, characterSpacing: 1.2 },
                    { text: r.org || 'Η οντότητα', color: '#ffffff', fontSize: 24, bold: true, margin: [0, 6, 0, 2] },
                    { text: 'ΚΥΑ 1689/2025 · ' + entName(r.entity), color: '#cbd5e1', fontSize: 11 },
                    { text: 'Κατάσταση στις ' + todayStr(), color: '#94a3b8', fontSize: 9, margin: [0, 10, 0, 0] }
                ], fillColor: C.navy, margin: [16, 18, 16, 18]
            }]] }, layout: 'noBorders', margin: [0, 0, 0, 14]
        });
        var K = r.core, X = r.extra;
        var pc = K.pct >= 85 ? C.green : K.pct >= 50 ? C.amber : C.red;
        content.push({
            columns: [
                { width: 110, table: { widths: ['*'], body: [[{ stack: [{ text: K.pct + '%', fontSize: 28, bold: true, color: pc, alignment: 'center' }, { text: 'πολιτικές άρθρου 6', fontSize: 8, color: C.muted, alignment: 'center' }], fillColor: C.band, margin: [6, 10, 6, 10] }]] }, layout: 'noBorders' },
                { width: '*', columns: [
                    { stack: [{ text: K.approved + '/' + K.N, style: 'big', color: C.green }, { text: 'άρθρο 6', style: 'small' }] },
                    { stack: [{ text: X.approved + '/' + X.N, style: 'big', color: C.green }, { text: 'λοιπά έγγραφα', style: 'small' }] },
                    { stack: [{ text: String(r.cnt.draft), style: 'big', color: C.amber }, { text: 'σε σχέδιο', style: 'small' }] },
                    { stack: [{ text: String(r.cnt.none + r.cnt.unknown), style: 'big', color: C.red }, { text: 'λείπουν ή άγνωστα', style: 'small' }] },
                    { stack: [{ text: String(r.ready), style: 'big' }, { text: 'σε τάξη για τον έλεγχο', style: 'small' }] }
                ], margin: [8, 12, 0, 0] }
            ], columnGap: 12, margin: [0, 0, 0, 12]
        });
        content.push({ text: K.approved + ' από τις ' + K.N + ' πολιτικές του άρθρου 6 είναι εγκεκριμένες, και ' + K.ready + ' από αυτές είναι σε τάξη για τον έλεγχο: με έγκριση από το ανώτατο όργανο διοίκησης, με αναθεώρηση στην ώρα της και με υπεύθυνο. Από τη λοιπή τεκμηρίωση των άρθρων 4 έως 25 είναι εγκεκριμένα ' + X.approved + ' από τα ' + X.N + ' έγγραφα (' + X.pct + '%). ' +
            (r.gaps.length ? 'Βρέθηκαν ' + r.gaps.length + ' κενά' + (r.crit ? ', από τα οποία ' + r.crit + ' κρίσιμα' : '') + '.' : 'Δεν βρέθηκε κανένα κενό.'), style: 'p' });
        content.push({ text: 'Ανά ενότητα', style: 'h2' });
        content.push({
            table: { widths: [150, 170, '*'], body: r.groups.map(function (g) {
                return [{ text: g.g.name, fontSize: 9 }, { stack: [bar(165, (g.ok + g.draft) / g.n, g.ok / g.n, g.ready / g.n)], margin: [0, 3, 0, 0] }, { text: g.ok + '/' + g.n + ' εγκεκριμένα · ' + g.ready + ' σε τάξη' + (g.draft ? ' · ' + g.draft + ' σε σχέδιο' : ''), fontSize: 8, color: C.muted }];
            }) }, layout: 'noBorders', margin: [0, 0, 0, 4]
        });
        content.push(legend([['#10b981', 'σε τάξη'], ['#a7f3d0', 'εγκεκριμένο, με εύρημα'], ['#fbbf24', 'σε σχέδιο']], 8));

        // Κενά
        content.push(h1('Τα κενά, με σειρά προτεραιότητας'));
        if (!r.gaps.length) content.push({ text: 'Κανένα κενό.', style: 'p' });
        else content.push({
            table: {
                headerRows: 1, dontBreakRows: true, widths: [62, 42, '*', 56],
                body: [[{ text: 'Προτεραιότητα', style: 'th' }, { text: 'Κωδικός', style: 'th' }, { text: 'Εύρημα και ενέργεια', style: 'th' }, { text: 'Υπεύθυνος', style: 'th' }]].concat(r.gaps.map(function (g) {
                    var c = PCOL[g.f.p];
                    return [
                        { text: prioLabel(ctx.PRIO, g.f.p), fontSize: 8, bold: true, color: c[0], fillColor: c[1] },
                        { text: g.r.it.id, style: 'mono' },
                        { stack: [{ text: g.r.it.title, bold: true, fontSize: 9 }, { text: g.f.text, fontSize: 8.5, margin: [0, 2, 0, 0] }, { text: [{ text: 'Ενέργεια: ', bold: true }, g.f.action], fontSize: 8, color: C.muted, margin: [0, 2, 0, 0] }] },
                        { text: g.r.owner || '—', fontSize: 8.5 }
                    ];
                }))
            },
            layout: { hLineColor: function () { return C.line; }, vLineWidth: function () { return 0; }, fillColor: function (i) { return i === 0 ? C.navy : null; }, paddingTop: function () { return 4; }, paddingBottom: function () { return 4; } }
        });

        // Μητρώο σε οριζόντια σελίδα
        content.push(h1('Το μητρώο', true, 'landscape'));
        content.push({ text: 'Οι 12 πολιτικές του άρθρου 6 της ΚΥΑ 1689/2025 και η λοιπή τεκμηρίωση των άρθρων 4 έως 25 για ' + (r.entity === 'essential' ? 'βασική' : 'σημαντική') + ' οντότητα, με την κατάστασή τους στις ' + todayStr() + '. Η επόμενη αναθεώρηση υπολογίζεται από την τελευταία αναθεώρηση ή την έγκριση του ΔΣ και τον κύκλο του εγγράφου, εκτός αν δόθηκε άλλη ημερομηνία.', style: 'p' });
        var body = [[
            { text: 'Κωδ.', style: 'th' }, { text: 'Έγγραφο', style: 'th' }, { text: 'ΚΥΑ 1689/2025', style: 'th' }, { text: 'Κατάσταση', style: 'th' }, { text: 'Υπεύθυνος', style: 'th' },
            { text: 'Έκδ.', style: 'th' }, { text: 'Έγκριση ΔΣ', style: 'th' }, { text: 'Τελευταία αναθ.', style: 'th' }, { text: 'Επόμενη αναθ.', style: 'th' }
        ]];
        D.groups.forEach(function (g) {
            var rs = r.rows.filter(function (x) { return x.it.group === g.key; }); if (!rs.length) return;
            body.push([{ text: g.name, colSpan: 9, bold: true, fontSize: 8.5, color: C.blue, fillColor: '#eff6ff' }, '', '', '', '', '', '', '', '']);
            rs.forEach(function (x) {
                var nx = x.st === 'approved' ? (x.nextShown || '—') : (x.target ? 'στόχος ' + x.target : '—');
                var over = x.f.some(function (f) { return /έπρεπε να γίνει/.test(f.text); });
                body.push([
                    { text: x.it.id, style: 'mono' }, { text: x.it.title, fontSize: 8.5 }, { text: x.it.kya, fontSize: 7.5, color: C.muted },
                    { text: ST[x.st], fontSize: 8.5, bold: true, color: STC[x.st] }, { text: x.owner || '—', fontSize: 8.5 }, { text: x.ver || '—', fontSize: 8 },
                    { text: x.it.board ? (x.board || 'λείπει') : '—', fontSize: 8, color: x.it.board && x.st === 'approved' && !x.board ? C.red : C.text },
                    { text: x.last || '—', fontSize: 8 }, { text: nx, fontSize: 8, color: over ? C.red : C.text, bold: over }
                ]);
            });
        });
        content.push({
            table: { headerRows: 1, dontBreakRows: true, widths: [36, '*', 110, 56, 52, 30, 52, 52, 60], body: body },
            layout: { hLineColor: function () { return C.line; }, vLineWidth: function () { return 0; }, fillColor: function (i) { return i === 0 ? C.navy : null; }, paddingTop: function () { return 3; }, paddingBottom: function () { return 3; } }
        });

        // Ανά πλαίσιο
        content.push(h1('Τι τεκμηριώνει το μητρώο', true, 'portrait'));
        content.push({ text: 'Οι απαιτήσεις κάθε πλαισίου που υπηρετούν τα έγγραφα του μητρώου, χρωματισμένες με την κατάσταση του πιο αδύναμου εγγράφου για καθεμία. Ποια έγγραφα αφορούν κάθε απαίτηση το βλέπεις στο φύλλο «Ανά πλαίσιο» του .xlsx. Τα πλήρη κείμενα βρίσκονται στους οδηγούς του thecybersec.gr.', style: 'p' });
        content.push(legend([[C.red, 'λείπει'], [C.amber, 'σε σχέδιο ή με εύρημα'], [C.green, 'σε τάξη']], 6));
        var LVC = [C.red, C.amber, C.green];
        r.cover.forEach(function (c) {
            var gaps = c.codes.filter(function (k) { return c.lv[k] < 2; }).length;
            content.push({ text: [c.f.label + '  ', { text: c.codes.length + ' απαιτήσεις · ' + gaps + ' με κενό  ', fontSize: 8, color: C.muted, bold: false }, { text: c.f.url, link: c.f.url, color: C.blue, fontSize: 8, bold: false }], style: 'h2' });
            var t = [];
            c.codes.forEach(function (k, i) { t.push({ text: k, color: LVC[c.lv[k]], bold: c.lv[k] === 0, link: c.f.url + '#' + String(k).replace(/\./g, '-') }); if (i < c.codes.length - 1) t.push({ text: '  ·  ', color: '#cbd5e1' }); });
            content.push({ text: t, fontSize: 8.5, lineHeight: 1.5, margin: [0, 0, 0, 6] });
        });

        // Έγκριση του μητρώου
        content.push(h1('Έγκριση του μητρώου', true));
        content.push({ text: 'Το μητρώο υποβάλλεται στο ανώτατο όργανο διοίκησης, που κατά το άρθρο 6 της ΚΥΑ 1689/2025 εγκρίνει τη γενική πολιτική ασφάλειας και τις θεματικές πολιτικές, και κατά το άρθρο 4 εγκρίνει και επιβλέπει το πρόγραμμα διαχείρισης κινδύνων. Το πρακτικό της συνεδρίασης φυλάσσεται μαζί με το μητρώο ως τεκμήριο (άρθρο 3 παρ. 3 περ. α).', style: 'p' });
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
        content.push({ table: { widths: [130, '*'], body: [[{ text: 'Αριθμός πρακτικού', style: 'k' }, { text: ' ', margin: [0, 8, 0, 0] }]] }, layout: { hLineColor: function () { return C.line; }, vLineWidth: function () { return 0; }, hLineWidth: function (i) { return i === 1 ? 0.8 : 0; } }, margin: [0, 0, 0, 16] });

        content.push({ text: 'Πώς διαβάζεται', style: 'h2' });
        content.push({ ul: [
            'Κάλυψη: οι εγκεκριμένες προς τις 12 πολιτικές του άρθρου 6, τα μόνα έγγραφα που η ΚΥΑ απαριθμεί ρητά. Η λοιπή τεκμηρίωση των άρθρων 4 έως 25 μετρά χωριστά. Ένα σχέδιο δεν μετρά, γιατί ο ελεγκτής δέχεται μόνο έγγραφα σε ισχύ.',
            'Η ΚΥΑ δεν ορίζει συνολικό αριθμό εγγράφων. Η ομαδοποίηση της λοιπής τεκμηρίωσης σε έγγραφα είναι του εργαλείου.',
            'Σε τάξη: εγκεκριμένο, με έγκριση από το ανώτατο όργανο διοίκησης όπου τη ζητά ρητά η ΚΥΑ (άρθρα 4, 6 και 7), με ημερομηνία αναθεώρησης μετά τις 06/05/2025, χωρίς εκπρόθεσμη αναθεώρηση και με υπεύθυνο.',
            'Κύκλος αναθεώρησης: η ΚΥΑ ζητά αξιολόγηση σε προγραμματισμένα διαστήματα και μετά από σοβαρά περιστατικά ή σημαντικές αλλαγές. Οι 12 μήνες είναι η συνήθης πρακτική, όχι κείμενο της ΚΥΑ.',
            'Ένα έγγραφο μπορεί να καλύπτει περισσότερες από μία υποχρεώσεις, π.χ. ως ενότητα της γενικής πολιτικής. Αρκεί να φαίνεται στο μητρώο ποια ενότητα καλύπτει ποια υποχρέωση.'
        ], style: 'p' });
        content.push({ text: 'Το μητρώο βασίζεται μόνο σε όσα δηλώθηκαν. Το εργαλείο δεν διαβάζει τα έγγραφα και δεν κρίνει το περιεχόμενό τους. Δεν είναι ελεγκτική γνώμη ούτε νομική συμβουλή. Δημιουργήθηκε με το δωρεάν εργαλείο «Μητρώο υποχρεωτικών πολιτικών της ΚΥΑ 1689/2025» του thecybersec.gr. © ' + new Date().getFullYear() + ' Δημοσθένης Αττέια, thecybersec.gr. Επιτρέπεται η χρήση για τις εσωτερικές ανάγκες του οργανισμού σας και η επίδειξη σε ελεγκτές και αρμόδιες αρχές.', style: 'p', color: C.muted, fontSize: 8, margin: [0, 10, 0, 0] });
        content.push({ text: page, link: page, color: C.blue, fontSize: 8 });

        var dd = {
            pageSize: 'A4', pageMargins: [40, 44, 40, 48],
            info: { title: 'Μητρώο πολιτικών ΚΥΑ 1689/2025' + (r.org ? ': ' + r.org : ''), author: r.org || '', creator: 'thecybersec.gr' },
            footer: function (cur, tot, ps) {
                return { columns: [{ text: 'Μητρώο πολιτικών · ΚΥΑ 1689/2025' + (r.org ? ' · ' + r.org : '') + ' · ' + todayStr(), fontSize: 7.5, color: C.muted }, { text: cur + ' / ' + tot, alignment: 'right', fontSize: 7.5, color: C.muted }], margin: [40, 14, 40, 0] };
            },
            content: content,
            defaultStyle: { font: 'Roboto', fontSize: 9.5, color: C.text, lineHeight: 1.2 },
            styles: {
                h1: { fontSize: 15, bold: true, color: C.navy, margin: [0, 14, 0, 6] },
                h2: { fontSize: 11, bold: true, color: C.blue, margin: [0, 10, 0, 4] },
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

    window.PolicyRegisterExport = { xlsx: xlsx, pdf: pdf, read: read };
})();
