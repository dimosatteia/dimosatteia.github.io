/* Εξαγωγές του εργαλείου «Αξιολόγηση προμηθευτή» · thecybersec.gr
   xlsx: ExcelJS (static/js/exceljs, MIT). pdf: pdfmake.
   Όλα δημιουργούνται στον browser. Δεν αποστέλλεται κανένα στοιχείο.
   Καλείται από το shortcode supplier-assessment: window.SupplierExport.xlsx(ctx) / .pdf(ctx) */
(function () {
    'use strict';
    var C = {
        navy: '#0f172a', blue: '#2563eb', blueLight: '#dbeafe', text: '#1e293b', muted: '#64748b', line: '#e2e8f0', band: '#f8fafc',
        amber: '#b45309', amberBg: '#fef3c7', green: '#047857', greenBg: '#d1fae5', red: '#be123c', redBg: '#ffe4e6', grayBg: '#f1f5f9'
    };
    var ANSWERS = ['Ναι', 'Μερικώς', 'Όχι', 'Δεν εφαρμόζεται'];
    var VERDICTS = ['Αποδεκτό', 'Αποδεκτό με όρο', 'Απαιτεί διορθωτική ενέργεια', 'Μη αποδεκτό'];
    var TERM_ANS = ['Ναι', 'Με αλλαγές', 'Όχι'];

    function pad(n) { return (n < 10 ? '0' : '') + n; }
    function today() { var d = new Date(); return pad(d.getDate()) + '/' + pad(d.getMonth() + 1) + '/' + d.getFullYear(); }
    function fmtDate(d) { return d || ''; } // ήδη ηη/μμ/εεεε από τη φόρμα
    // Λατινικοί χαρακτήρες στο όνομα αρχείου: κάποιοι browsers απορρίπτουν τα Ελληνικά στο download
    var GR = { α: 'a', β: 'v', γ: 'g', δ: 'd', ε: 'e', ζ: 'z', η: 'i', θ: 'th', ι: 'i', κ: 'k', λ: 'l', μ: 'm', ν: 'n', ξ: 'x', ο: 'o', π: 'p', ρ: 'r', σ: 's', ς: 's', τ: 't', υ: 'y', φ: 'f', χ: 'ch', ψ: 'ps', ω: 'o' };
    function slug(s) {
        return (s || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
            .replace(/[α-ω]/g, function (c) { return GR[c] || ''; })
            .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 40);
    }
    function fileName(r, ext) {
        var s = slug(r.sup);
        return 'axiologisi-promitheyti' + (s ? '-' + s : '') + '-' + new Date().toISOString().slice(0, 10) + '.' + ext;
    }
    function save(blob, name) {
        var a = document.createElement('a');
        a.href = URL.createObjectURL(blob); a.download = name;
        document.body.appendChild(a); a.click();
        setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 1500);
    }
    function mapText(map, FW) {
        return FW.map(function (f) { var c = (map || {})[f.key]; return c && c.length ? f.label + ': ' + c.join(', ') : ''; }).filter(Boolean).join(' · ');
    }
    function orgName(r) { return r.org || 'η εταιρεία μας'; }
    function intro(r) {
        return 'Η ' + (r.org || 'εταιρεία μας') + ' αξιολογεί την ασφάλεια των προμηθευτών και των παρόχων υπηρεσιών της, όπως ορίζει το άρθρο 21 παρ. 2 στοιχ. δ΄ της Οδηγίας (ΕΕ) 2022/2555 (NIS2), ο ν. 5160/2024 και το άρθρο 12 της ΚΥΑ 1689/2025. ' +
            'Οι ερωτήσεις αφορούν την υπηρεσία που μας παρέχετε' + (r.svc ? ' (' + r.svc + ')' : '') + ' και είναι προσαρμοσμένες στον τύπο και στην κρισιμότητά της. ' +
            'Δεν χρειάζεται να υπάγεστε οι ίδιοι στη NIS2 για να απαντήσετε.';
    }

    // ---------- XLSX ----------
    function xlsx(ctx) {
        var r = ctx.r, FW = ctx.FW, ExcelJS = window.ExcelJS;
        var page = ctx.base + 'axiologisi-promitheyti/';
        var wb = new ExcelJS.Workbook();
        wb.creator = 'thecybersec.gr'; wb.created = new Date();
        var hdrFill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF0F172A' } };
        var grpFill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFDBEAFE' } };
        var entFill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF1F5F9' } };
        var supFill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFFBEB' } };
        var thin = { style: 'thin', color: { argb: 'FFCBD5E1' } };
        var border = { top: thin, left: thin, bottom: thin, right: thin };
        function header(ws, row) {
            row.eachCell(function (c) { c.fill = hdrFill; c.font = { bold: true, color: { argb: 'FFFFFFFF' } }; c.alignment = { vertical: 'middle', wrapText: true }; c.border = border; });
            row.height = 30;
        }

        // 1. Οδηγίες
        var wi = wb.addWorksheet('Οδηγίες', { views: [{ showGridLines: false }] });
        wi.getColumn(1).width = 28; wi.getColumn(2).width = 90;
        wi.mergeCells('A1:B1');
        wi.getCell('A1').value = 'Ερωτηματολόγιο αξιολόγησης ασφάλειας προμηθευτή';
        wi.getCell('A1').font = { bold: true, size: 16, color: { argb: 'FF0F172A' } };
        wi.getRow(1).height = 28;
        var rows = [
            ['Από', r.org || ''],
            ['Προς', r.sup || ''],
            ['Υπηρεσία ή προϊόν', r.svc || ''],
            ['Τύπος προμηθευτή', r.type.name],
            ['Κρισιμότητα για εμάς', r.level.name],
            ['Ημερομηνία', today()],
            ['Απάντηση έως', fmtDate(r.due)],
            ['Επιστροφή σε', [r.role, r.mail].filter(Boolean).join(', ')],
            ['', ''],
            ['Γιατί το ζητάμε', intro(r)],
            ['Πώς απαντάτε', 'Στο φύλλο «Ερωτηματολόγιο» διαλέξτε απάντηση από τη λίστα (Ναι, Μερικώς, Όχι, Δεν εφαρμόζεται) και περιγράψτε σύντομα τι ισχύει. Στο «Μερικώς» και στο «Όχι» εξηγήστε τι λείπει και αν υπάρχει πλάνο. Στη στήλη «Τεκμήριο» γράψτε το όνομα του αρχείου που επισυνάπτετε. Στο φύλλο «Συμβατικοί όροι» δηλώστε αν αποδέχεστε τους όρους που θα ζητήσουμε στη σύμβαση.'],
            ['Κρίσιμες ερωτήσεις ★', 'Οι ερωτήσεις με ★ είναι κρίσιμες για εμάς. Σε αυτές ' + (r.lv >= 2 ? 'χρειαζόμαστε και τεκμήριο.' : 'σας παρακαλούμε να απαντήσετε με ιδιαίτερη προσοχή.')],
            ['Τεκμήρια', r.lv >= 3 ? 'Επισυνάψτε τεκμήριο για κάθε απάντηση «Ναι» ή «Μερικώς». Εμπιστευτικά έγγραφα (π.χ. εκθέσεις ελέγχου) μπορούν να δοθούν και σε συνάντηση ή μέσω ασφαλούς κοινής χρήσης.' : r.lv === 2 ? 'Επισυνάψτε τεκμήριο τουλάχιστον για τις κρίσιμες ερωτήσεις ★.' : 'Τα τεκμήρια είναι προαιρετικά. Μπορεί να τα ζητήσουμε αργότερα.'],
            ['Οι στήλες με γκρι', 'Τις συμπληρώνει η ' + orgName(r) + ' κατά την αξιολόγηση. Αφήστε τες κενές.'],
            ['Εμπιστευτικότητα', 'Οι απαντήσεις σας χρησιμοποιούνται μόνο για την αξιολόγηση της συνεργασίας και τηρούνται εμπιστευτικά.'],
            ['', ''],
            ['Δημιουργήθηκε με', 'Το δωρεάν εργαλείο «Αξιολόγηση προμηθευτή» του thecybersec.gr: ' + page],
            ['Όροι χρήσης', '© ' + new Date().getFullYear() + ' Δημοσθένης Αττέια, thecybersec.gr. Επιτρέπεται η ελεύθερη χρήση και η αποστολή σε προμηθευτές. Το ερωτηματολόγιο είναι βοήθημα και δεν αποτελεί νομική συμβουλή. Η αξιολόγηση και η απόφαση ανήκουν στην οντότητα.']
        ];
        rows.forEach(function (x, i) {
            var row = wi.getRow(i + 3); row.values = x;
            row.getCell(1).font = { bold: true, color: { argb: 'FF475569' } };
            row.getCell(2).alignment = { wrapText: true, vertical: 'top' };
            row.getCell(1).alignment = { vertical: 'top' };
            var len = String(x[1]).length; row.height = Math.max(18, Math.ceil(len / 95) * 15);
        });
        var link = wi.getCell('B' + (rows.length + 1));
        link.value = { text: page, hyperlink: page }; link.font = { color: { argb: 'FF2563EB' }, underline: true };

        // 2. Ερωτηματολόγιο
        var wq = wb.addWorksheet('Ερωτηματολόγιο', { views: [{ state: 'frozen', ySplit: 1 }] });
        wq.columns = [
            { header: '#', key: 'n', width: 6 },
            { header: '★', key: 'k', width: 4 },
            { header: 'Ερώτηση', key: 'q', width: 62 },
            { header: 'Απάντηση', key: 'a', width: 16 },
            { header: 'Περιγραφή ή σχόλια', key: 'c', width: 44 },
            { header: 'Τεκμήριο που ζητάμε', key: 'e', width: 36 },
            { header: 'Τεκμήριο που επισυνάπτετε', key: 'f', width: 26 },
            { header: 'Αξιολόγηση (από ' + (r.org || 'εμάς') + ')', key: 'v', width: 22 },
            { header: 'Σημείωση αξιολόγησης', key: 'vn', width: 30 }
        ];
        header(wq, wq.getRow(1));
        var qRows = [];
        r.groups.forEach(function (g) {
            var gr = wq.addRow([g.d.name]);
            wq.mergeCells(gr.number, 1, gr.number, 9);
            gr.getCell(1).fill = grpFill; gr.getCell(1).font = { bold: true, color: { argb: 'FF1E3A8A' } }; gr.height = 20;
            g.list.forEach(function (it) {
                var row = wq.addRow({ n: 'Ε' + it.n, k: it.key ? '★' : '', q: it.q.text, a: '', c: '', e: it.q.evidence, f: '', v: '', vn: '' });
                row.alignment = { wrapText: true, vertical: 'top' };
                row.eachCell({ includeEmpty: true }, function (c, col) { c.border = border; if (col === 4 || col === 5 || col === 7) c.fill = supFill; if (col >= 8) c.fill = entFill; });
                row.getCell(2).font = { color: { argb: 'FFB45309' }, bold: true };
                row.getCell(4).dataValidation = { type: 'list', allowBlank: true, formulae: ['"' + ANSWERS.join(',') + '"'] };
                row.getCell(8).dataValidation = { type: 'list', allowBlank: true, formulae: ['"' + VERDICTS.join(',') + '"'] };
                row.height = Math.max(30, Math.ceil(it.q.text.length / 60) * 15 + 4);
                qRows.push(row.number);
            });
        });
        var firstQ = qRows[0], lastQ = qRows[qRows.length - 1];
        wq.addConditionalFormatting({
            ref: 'D' + firstQ + ':D' + lastQ,
            rules: [
                { type: 'containsText', operator: 'containsText', text: 'Όχι', style: { fill: { type: 'pattern', pattern: 'solid', bgColor: { argb: 'FFFFE4E6' } } } },
                { type: 'containsText', operator: 'containsText', text: 'Μερικώς', style: { fill: { type: 'pattern', pattern: 'solid', bgColor: { argb: 'FFFEF3C7' } } } },
                { type: 'containsText', operator: 'containsText', text: 'Ναι', style: { fill: { type: 'pattern', pattern: 'solid', bgColor: { argb: 'FFD1FAE5' } } } }
            ]
        });

        // 3. Συμβατικοί όροι
        var wt = wb.addWorksheet('Συμβατικοί όροι', { views: [{ state: 'frozen', ySplit: 1 }] });
        wt.columns = [
            { header: '#', key: 'n', width: 6 },
            { header: 'Όρος', key: 'name', width: 28 },
            { header: 'Τι προβλέπει', key: 't', width: 70 },
            { header: 'Για εμάς', key: 'need', width: 14 },
            { header: 'Αποδέχεστε τον όρο;', key: 'a', width: 18 },
            { header: 'Σχόλια', key: 'c', width: 40 },
            { header: 'Πηγή', key: 's', width: 30 }
        ];
        header(wt, wt.getRow(1));
        r.terms.forEach(function (x) {
            var row = wt.addRow({ n: x.t.id.replace('T', 'Ο'), name: x.t.name, t: x.t.text, need: x.need ? 'Απαραίτητο' : 'Συνιστάται', a: '', c: '', s: x.t.src });
            row.alignment = { wrapText: true, vertical: 'top' };
            row.eachCell({ includeEmpty: true }, function (c, col) { c.border = border; if (col === 5 || col === 6) c.fill = supFill; });
            row.getCell(4).font = { bold: x.need, color: { argb: x.need ? 'FFB45309' : 'FF64748B' } };
            row.getCell(5).dataValidation = { type: 'list', allowBlank: true, formulae: ['"' + TERM_ANS.join(',') + '"'] };
            row.height = Math.max(30, Math.ceil(x.t.text.length / 68) * 15 + 4);
        });

        // 4. Σύνοψη (υπολογίζεται μόνη της)
        var ws = wb.addWorksheet('Σύνοψη', { views: [{ showGridLines: false }] });
        ws.getColumn(1).width = 42; ws.getColumn(2).width = 14; ws.getColumn(3).width = 14;
        ws.getCell('A1').value = 'Σύνοψη απαντήσεων'; ws.getCell('A1').font = { bold: true, size: 14 };
        ws.getCell('A2').value = 'Ενημερώνεται αυτόματα από τα φύλλα «Ερωτηματολόγιο» και «Συμβατικοί όροι».'; ws.getCell('A2').font = { color: { argb: 'FF64748B' } };
        var hr = ws.getRow(4); hr.values = ['', 'Όλες', 'Κρίσιμες ★']; header(ws, hr);
        var QR = "'Ερωτηματολόγιο'!$D$" + firstQ + ':$D$' + lastQ, KR = "'Ερωτηματολόγιο'!$B$" + firstQ + ':$B$' + lastQ;
        var lines = [['Ερωτήσεις', '=COUNTA(\'Ερωτηματολόγιο\'!$C$' + firstQ + ':$C$' + lastQ + ')', '=COUNTIF(' + KR + ',"★")']]
            .concat(ANSWERS.map(function (a) { return [a, '=COUNTIF(' + QR + ',"' + a + '")', '=COUNTIFS(' + QR + ',"' + a + '",' + KR + ',"★")']; }))
            .concat([['Χωρίς απάντηση', '=B5-SUM(B6:B9)', '=C5-SUM(C6:C9)']]);
        lines.forEach(function (l, i) {
            var row = ws.getRow(5 + i);
            row.getCell(1).value = l[0];
            row.getCell(2).value = { formula: l[1].replace(/^=/, '') };
            row.getCell(3).value = { formula: l[2].replace(/^=/, '') };
            row.eachCell(function (c) { c.border = border; });
        });
        var t0 = 5 + lines.length + 2;
        ws.getCell('A' + t0).value = 'Συμβατικοί όροι'; ws.getCell('A' + t0).font = { bold: true };
        var TR = "'Συμβατικοί όροι'!$E$2:$E$" + (r.terms.length + 1), NR = "'Συμβατικοί όροι'!$D$2:$D$" + (r.terms.length + 1);
        var th = ws.getRow(t0 + 1); th.values = ['', 'Όλοι', 'Απαραίτητοι']; header(ws, th);
        [['Όροι', 'COUNTA(\'Συμβατικοί όροι\'!$B$2:$B$' + (r.terms.length + 1) + ')', 'COUNTIF(' + NR + ',"Απαραίτητο")']]
            .concat(TERM_ANS.map(function (a) { return ['Αποδοχή: ' + a, 'COUNTIF(' + TR + ',"' + a + '")', 'COUNTIFS(' + TR + ',"' + a + '",' + NR + ',"Απαραίτητο")']; }))
            .forEach(function (l, i) {
                var row = ws.getRow(t0 + 2 + i);
                row.getCell(1).value = l[0]; row.getCell(2).value = { formula: l[1] }; row.getCell(3).value = { formula: l[2] };
                row.eachCell(function (c) { c.border = border; });
            });

        // 5. Αντιστοίχιση σε πλαίσια
        var wm = wb.addWorksheet('Αντιστοίχιση');
        wm.columns = [{ header: '#', key: 'n', width: 6 }].concat(FW.map(function (f) { return { header: f.label, key: f.key, width: 24 }; })).concat([{ header: 'Ερώτηση', key: 'q', width: 70 }]);
        header(wm, wm.getRow(1));
        r.groups.forEach(function (g) {
            g.list.forEach(function (it) {
                var o = { n: 'Ε' + it.n, q: it.q.text };
                FW.forEach(function (f) { o[f.key] = ((it.q.map || {})[f.key] || []).join(', '); });
                var row = wm.addRow(o); row.alignment = { wrapText: true, vertical: 'top' };
                row.eachCell({ includeEmpty: true }, function (c) { c.border = border; });
            });
        });
        r.terms.forEach(function (x) {
            var o = { n: x.t.id.replace('T', 'Ο'), q: 'Συμβατικός όρος: ' + x.t.name };
            FW.forEach(function (f) { o[f.key] = ((x.t.map || {})[f.key] || []).join(', '); });
            var row = wm.addRow(o); row.alignment = { wrapText: true, vertical: 'top' };
            row.eachCell({ includeEmpty: true }, function (c) { c.border = border; });
        });

        wb.views = [{ activeTab: 0 }];
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

    // ---------- PDF ----------
    function pdf(ctx) {
        var r = ctx.r, FW = ctx.FW, page = ctx.base + 'axiologisi-promitheyti/';
        var lvColor = r.lv === 3 ? C.red : r.lv === 2 ? C.amber : C.green, lvBg = r.lv === 3 ? C.redBg : r.lv === 2 ? C.amberBg : C.greenBg;
        function h1(t, brk) { return { text: t, style: 'h1', pageBreak: brk ? 'before' : undefined }; }
        function star(size) {
            var R = size / 2, r = R * 0.45, pts = [];
            for (var i = 0; i < 10; i++) { var ang = Math.PI / 5 * i - Math.PI / 2, rr = i % 2 ? r : R; pts.push({ x: R + rr * Math.cos(ang), y: R + rr * Math.sin(ang) }); }
            return { canvas: [{ type: 'polyline', points: pts, closePath: true, color: C.amber, lineColor: C.amber }], width: size, margin: [0, 2, 0, 0] };
        }
        function kv(k, v) { return [{ text: k, style: 'k' }, { text: v || '—', style: 'v' }]; }
        var needN = r.terms.filter(function (t) { return t.need; }).length;

        var content = [];
        // Εξώφυλλο
        content.push({
            table: { widths: ['*'], body: [[{
                stack: [
                    { text: 'ΑΞΙΟΛΟΓΗΣΗ ΠΡΟΜΗΘΕΥΤΗ', color: '#93c5fd', fontSize: 9, bold: true, characterSpacing: 1.5 },
                    { text: r.sup || 'Προμηθευτής', color: '#ffffff', fontSize: 24, bold: true, margin: [0, 6, 0, 2] },
                    { text: r.svc || r.type.name, color: '#cbd5e1', fontSize: 11 },
                    { text: (r.org ? r.org + ' · ' : '') + today(), color: '#94a3b8', fontSize: 9, margin: [0, 10, 0, 0] }
                ], fillColor: C.navy, margin: [16, 18, 16, 18]
            }]] }, layout: 'noBorders', margin: [0, 0, 0, 14]
        });
        content.push({
            columns: [
                { width: '*', table: { widths: [110, '*'], body: [
                    kv('Τύπος', r.type.name),
                    kv('Χαρακτηριστικά', r.flags.length ? r.flags.map(function (f) { return f.name; }).join('\n') : 'Κανένα από τα επιπλέον'),
                    kv('Υπεύθυνος ρόλος', r.role),
                    kv('Απάντηση έως', fmtDate(r.due))
                ] }, layout: 'lightHorizontalLines' },
                { width: 150, table: { widths: ['*'], body: [[{
                    stack: [{ text: 'ΚΡΙΣΙΜΟΤΗΤΑ', fontSize: 8, bold: true, color: lvColor }, { text: r.level.name, fontSize: 14, bold: true, color: lvColor, margin: [0, 3, 0, 0] }],
                    fillColor: lvBg, margin: [10, 10, 10, 10]
                }]] }, layout: 'noBorders' }
            ], columnGap: 14, margin: [0, 0, 0, 12]
        });
        content.push({
            columns: [
                { stack: [{ text: String(r.count), style: 'big' }, { text: 'ερωτήσεις', style: 'small' }] },
                { stack: [{ text: String(r.keys), style: 'big', color: C.amber }, { text: 'κρίσιμες ερωτήσεις', style: 'small' }] },
                { stack: [{ text: String(r.groups.length), style: 'big' }, { text: 'ενότητες', style: 'small' }] },
                { stack: [{ text: needN + '/' + r.terms.length, style: 'big' }, { text: 'απαραίτητοι όροι', style: 'small' }] }
            ], margin: [0, 4, 0, 12]
        });
        content.push({ text: [{ text: 'Τεκμήρια: ', bold: true }, r.level.evidence + ' ', { text: 'Επανεξέταση: ', bold: true }, r.level.review], style: 'p' });
        content.push({ text: 'Τι διαβάζει ο προμηθευτής στις οδηγίες', style: 'k', margin: [0, 4, 0, 2] });
        content.push({ text: intro(r), style: 'p', color: C.muted });

        // Συμβατικοί όροι
        content.push(h1('Checklist συμβατικών όρων'));
        content.push({ text: 'Οι όροι που πρέπει να έχει η σύμβαση με αυτόν τον προμηθευτή, με βάση το σημείο 5.1.4 του Εκτελεστικού Κανονισμού (ΕΕ) 2024/2690 και το άρθρο 12.1.δ της ΚΥΑ 1689/2025. Τσέκαρε όσους υπάρχουν ήδη.', style: 'p' });
        content.push({
            table: {
                headerRows: 1, dontBreakRows: true, widths: [14, 22, '*', 62],
                body: [[{ text: '', style: 'th' }, { text: '#', style: 'th' }, { text: 'Όρος', style: 'th' }, { text: 'Για εσένα', style: 'th' }]].concat(r.terms.map(function (x) {
                    return [
                        { canvas: [{ type: 'rect', x: 0, y: 2, w: 9, h: 9, lineColor: C.muted, lineWidth: 0.8 }] },
                        { text: x.t.id.replace('T', 'Ο'), style: 'mono' },
                        { stack: [{ text: x.t.name, bold: true, fontSize: 9.5 }, { text: x.t.text, fontSize: 8.5, color: C.text, margin: [0, 2, 0, 0] }, { text: x.t.src, fontSize: 7.5, color: C.muted, margin: [0, 2, 0, 0] }] },
                        { text: x.need ? 'Απαραίτητο' : 'Συνιστάται', fontSize: 8, bold: x.need, color: x.need ? C.amber : C.muted }
                    ];
                }))
            },
            layout: { hLineColor: function () { return C.line; }, vLineWidth: function () { return 0; }, fillColor: function (i) { return i === 0 ? C.navy : null; }, paddingTop: function () { return 5; }, paddingBottom: function () { return 5; } }
        });

        // Ερωτηματολόγιο
        content.push(h1('Το ερωτηματολόγιο', true));
        content.push({ text: 'Οι ερωτήσεις που στέλνεις στον προμηθευτή, με το τεκμήριο που ζητάς και τις απαιτήσεις που υπηρετεί η καθεμία. Με αστέρι οι κρίσιμες: ένα «Όχι» εκεί είναι λόγος να μη συνεχίσεις, ή να το καλύψεις με όρο στη σύμβαση.', style: 'p' });
        r.groups.forEach(function (g) {
            content.push({ text: g.d.name, style: 'h2' });
            content.push({
                table: {
                    widths: [24, '*'], dontBreakRows: true,
                    body: g.list.map(function (it) {
                        var m = mapText(it.q.map, FW);
                        return [
                            { stack: [{ text: 'Ε' + it.n, style: 'mono' }].concat(it.key ? [star(8)] : []) },
                            { stack: [{ text: it.q.text, fontSize: 9.5 }, { text: 'Τεκμήριο: ' + it.q.evidence, fontSize: 8, color: C.muted, margin: [0, 2, 0, 0] }].concat(m ? [{ text: m, fontSize: 7, color: C.blue, margin: [0, 2, 0, 0] }] : []) }
                        ];
                    })
                },
                layout: { hLineColor: function () { return C.line; }, vLineWidth: function () { return 0; }, hLineWidth: function (i) { return i === 0 ? 0 : 0.6; }, paddingTop: function () { return 5; }, paddingBottom: function () { return 5; } },
                margin: [0, 0, 0, 6]
            });
        });

        // Κάλυψη ανά πλαίσιο
        content.push(h1('Τι τεκμηριώνει η αξιολόγηση', true));
        content.push({ text: 'Οι απαιτήσεις κάθε πλαισίου που υπηρετεί αυτή η αξιολόγηση, με τις ερωτήσεις (Ε) και τους όρους (Ο) που τις αφορούν. Τα πλήρη κείμενα βρίσκονται στους οδηγούς του thecybersec.gr.', style: 'p' });
        r.cover.forEach(function (c) {
            content.push({ text: [c.f.label + '  ', { text: c.f.url, link: c.f.url, color: C.blue, fontSize: 8, bold: false }], style: 'h2' });
            content.push({
                table: { widths: [70, '*'], body: c.codes.map(function (code) { var x = c.refs[code]; return [{ text: code, style: 'mono' }, { text: x.length ? x.join(', ') : 'Η ίδια η αξιολόγηση', fontSize: 8.5, color: x.length ? C.text : C.muted }]; }) },
                layout: 'lightHorizontalLines', margin: [0, 0, 0, 6]
            });
        });

        // Επόμενα βήματα
        content.push(h1('Τι κάνεις μετά'));
        content.push({
            ol: [
                'Στείλε το .xlsx στον προμηθευτή, με την προθεσμία που όρισες.',
                'Όταν επιστρέψει, συμπλήρωσε τη στήλη «Αξιολόγηση». Ξεκίνα από τις κρίσιμες ερωτήσεις, με το αστέρι.',
                'Για κάθε κενό αποφάσισε: αποδοχή του κινδύνου, διορθωτική ενέργεια με προθεσμία, ή όρος στη σύμβαση.',
                'Πέρασε τους όρους που λείπουν στη σύμβαση ή σε παράρτημά της.',
                'Κράτα αυτόν τον φάκελο, τις απαντήσεις και τα τεκμήρια στο μητρώο προμηθευτών (ΚΥΑ 1689/2025, 12.1.β).',
                r.level.review
            ], style: 'p'
        });
        content.push({ text: 'Το ερωτηματολόγιο είναι βοήθημα και δεν αποτελεί νομική συμβουλή. Η αξιολόγηση και η απόφαση ανήκουν στην οντότητα. Δημιουργήθηκε με το δωρεάν εργαλείο «Αξιολόγηση προμηθευτή» του thecybersec.gr.', style: 'p', color: C.muted, fontSize: 8, margin: [0, 14, 0, 0] });
        content.push({ text: page, link: page, color: C.blue, fontSize: 8 });

        var dd = {
            pageSize: 'A4', pageMargins: [40, 44, 40, 48],
            info: { title: 'Αξιολόγηση προμηθευτή' + (r.sup ? ': ' + r.sup : ''), author: r.org || '', creator: 'thecybersec.gr' },
            footer: function (cur, tot) {
                return { columns: [{ text: 'Αξιολόγηση προμηθευτή' + (r.sup ? ' · ' + r.sup : '') + ' · ' + today(), fontSize: 7.5, color: C.muted }, { text: cur + ' / ' + tot, alignment: 'right', fontSize: 7.5, color: C.muted }], margin: [40, 14, 40, 0] };
            },
            content: content,
            defaultStyle: { font: 'Roboto', fontSize: 9.5, color: C.text, lineHeight: 1.2 },
            styles: {
                h1: { fontSize: 15, bold: true, color: C.navy, margin: [0, 14, 0, 6] },
                h2: { fontSize: 11, bold: true, color: C.blue, margin: [0, 10, 0, 4] },
                p: { fontSize: 9.5, margin: [0, 0, 0, 8] },
                th: { bold: true, color: '#ffffff', fontSize: 8.5 },
                k: { fontSize: 8.5, color: C.muted },
                v: { fontSize: 9.5 },
                big: { fontSize: 20, bold: true, color: C.navy },
                small: { fontSize: 8, color: C.muted },
                mono: { fontSize: 8, color: C.muted }
            }
        };
        return new Promise(function (resolve, reject) {
            try { window.pdfMake.createPdf(dd).getBlob(function (b) { save(b, fileName(r, 'pdf')); resolve(); }); } catch (e) { reject(e); }
        });
    }

    window.SupplierExport = { xlsx: xlsx, pdf: pdf };
})();
