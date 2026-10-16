/* Φάκελος τεκμηρίωσης (.pdf) και μητρώο εκπαίδευσης (.xlsx) του εργαλείου
   «Εκπαίδευση προσωπικού: είναι τεκμηριωμένη για τον ελεγκτή;»
   Φτιάχνονται εξ ολοκλήρου στον browser (pdfmake, SheetJS). Δεν αποστέλλεται κανένα στοιχείο.
   Καλούνται από το shortcode awareness-check: window.awBuildPdf(ctx), window.awBuildXlsx(ctx) */
(function () {
    var C = {
        navy: '#0f172a', blue: '#2563eb', text: '#1e293b', muted: '#64748b', line: '#e2e8f0', band: '#f8fafc',
        red: '#e11d48', redBg: '#ffe4e6', amber: '#d97706', amberBg: '#fef3c7', green: '#059669', greenBg: '#d1fae5', grayBg: '#f1f5f9'
    };
    var PAGE = 'tekmiriosi-ekpaideysis/';
    function pct(x) { return Math.round(x * 100); }
    function pctColor(p) { return p >= 85 ? C.green : p >= 50 ? C.amber : C.red; }
    function stStyle(s) { return s === 2 ? { c: C.green, bg: C.greenBg } : s === 1 ? { c: C.amber, bg: C.amberBg } : s === 0 ? { c: C.red, bg: C.redBg } : { c: C.muted, bg: C.grayBg }; }
    function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
    function today() { var d = new Date(); return { d: d, s: ('0' + d.getDate()).slice(-2) + '/' + ('0' + (d.getMonth() + 1)).slice(-2) + '/' + d.getFullYear(), iso: d.toISOString().slice(0, 10) }; }
    function monthLabel(v) { if (!v) return ''; var p = v.split('-'); return p[1] + '/' + p[0]; }
    function link(ctx, f, x) { return ctx.base + f.url.replace(/^\//, '') + (x.anchor ? '#' + x.anchor : ''); }
    function slug(s) { return String(s || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); }

    function donut(p, label) {
        var r = 46, cx = 60, cy = 56, col = pctColor(p);
        var a = Math.min(p, 99.99) / 100 * 2 * Math.PI, x = cx + r * Math.sin(a), y = cy - r * Math.cos(a);
        var arc = p <= 0 ? '' : '<path d="M ' + cx + ' ' + (cy - r) + ' A ' + r + ' ' + r + ' 0 ' + (a > Math.PI ? 1 : 0) + ' 1 ' + x.toFixed(2) + ' ' + y.toFixed(2) + '" fill="none" stroke="' + col + '" stroke-width="11" stroke-linecap="round"/>';
        return { svg: '<svg width="120" height="128" viewBox="0 0 120 128"><circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="none" stroke="' + C.line + '" stroke-width="11"/>' + arc +
            '<text x="60" y="63" text-anchor="middle" font-size="22" font-weight="bold" fill="' + C.text + '">' + p + '%</text>' +
            '<text x="60" y="124" text-anchor="middle" font-size="10" fill="' + C.muted + '">' + esc(label) + '</text></svg>', width: 112 };
    }
    function covBars(ctx) {
        var r = ctx.r, rows = ctx.GROUPS.filter(function (g) { return r.cov[g.k] !== null; });
        var w = 515, lw = 130, bw = 300, h = rows.length * 22 + 4, s = '<svg width="' + w + '" height="' + h + '" viewBox="0 0 ' + w + ' ' + h + '">';
        rows.forEach(function (g, k) {
            var p = pct(r.cov[g.k]), y = k * 22 + 4, x = r.i.g[g.k];
            s += '<text x="0" y="' + (y + 12) + '" font-size="10" fill="' + C.text + '">' + esc(g.n) + '</text>';
            s += '<rect x="' + lw + '" y="' + (y + 3) + '" width="' + bw + '" height="11" rx="3" fill="' + C.grayBg + '"/>';
            if (p > 0) s += '<rect x="' + lw + '" y="' + (y + 3) + '" width="' + (bw * p / 100).toFixed(1) + '" height="11" rx="3" fill="' + pctColor(p) + '"/>';
            s += '<text x="' + w + '" y="' + (y + 12) + '" font-size="10" font-weight="bold" text-anchor="end" fill="' + pctColor(p) + '">' + (x.done || 0) + '/' + x.tot + ' · ' + p + '%</text>';
        });
        return { svg: s + '</svg>', width: w };
    }
    function simBars(sims) {
        var w = 515, h = 160, pl = 34, pb = 24, pt = 14, step = (w - pl) / sims.length, bw = Math.min(40, step / 2.8), H = h - pt - pb;
        var s = '<svg width="' + w + '" height="' + h + '" viewBox="0 0 ' + w + ' ' + h + '">';
        [0, 25, 50, 75, 100].forEach(function (v) { var y = pt + H * (1 - v / 100); s += '<line x1="' + pl + '" x2="' + w + '" y1="' + y + '" y2="' + y + '" stroke="' + C.line + '" stroke-width="0.6"/><text x="' + (pl - 5) + '" y="' + (y + 3) + '" text-anchor="end" font-size="8" fill="' + C.muted + '">' + v + '%</text>'; });
        sims.forEach(function (x, k) {
            var cx = pl + step * k + step / 2, hc = H * x.cr, hr = H * x.rr;
            s += '<rect x="' + (cx - bw - 2) + '" y="' + (pt + H - hc) + '" width="' + bw + '" height="' + Math.max(hc, 0.5) + '" rx="2" fill="' + C.red + '"/>';
            s += '<rect x="' + (cx + 2) + '" y="' + (pt + H - hr) + '" width="' + bw + '" height="' + Math.max(hr, 0.5) + '" rx="2" fill="' + C.green + '"/>';
            s += '<text x="' + (cx - bw / 2 - 2) + '" y="' + (pt + H - hc - 3) + '" text-anchor="middle" font-size="8" font-weight="bold" fill="' + C.red + '">' + pct(x.cr) + '%</text>';
            s += '<text x="' + (cx + bw / 2 + 2) + '" y="' + (pt + H - hr - 3) + '" text-anchor="middle" font-size="8" font-weight="bold" fill="' + C.green + '">' + pct(x.rr) + '%</text>';
            s += '<text x="' + cx + '" y="' + (h - 8) + '" text-anchor="middle" font-size="8.5" fill="' + C.muted + '">Κύκλος ' + x.idx + (x.m ? ' · ' + monthLabel(x.m) : '') + '</text>';
        });
        return { svg: s + '</svg>', width: w };
    }
    function chip(s, ST) { var st = stStyle(s); return { text: s === null ? 'Δεν εφαρμόζεται' : ST[s], color: st.c, fillColor: st.bg, bold: true, fontSize: 8, alignment: 'center' }; }

    window.awBuildPdf = function (ctx) {
        var r = ctx.r, i = r.i, FW = ctx.FW, ST = ctx.ST, T = today(), page = ctx.base + PAGE;
        var org = i.org || 'Ο οργανισμός', period = i.period || '–';
        var entity = { important: 'Σημαντική οντότητα', essential: 'Βασική οντότητα', none: 'Δεν υπάγεται ή δεν έχει κριθεί' }[i.entity];
        var lic = { all: 'Όλοι οι χρήστες', some: 'Μέρος των χρηστών', none: 'Όχι' }[i.lic];
        var content = [];

        // ---------- Σελίδα 1: σύνοψη ----------
        content.push({ table: { widths: ['*'], body: [[{ stack: [
            { text: 'ΦΑΚΕΛΟΣ ΤΕΚΜΗΡΙΩΣΗΣ', fontSize: 8, color: '#93c5fd', characterSpacing: 1.5 },
            { text: 'Εκπαίδευση και ευαισθητοποίηση προσωπικού στην κυβερνοασφάλεια', fontSize: 18, bold: true, color: '#ffffff', margin: [0, 4, 0, 6] },
            { text: 'ΚΥΑ 1689/2025 · Οδηγία NIS2 · ISO/IEC 27001 · GDPR', fontSize: 9, color: '#cbd5e1' },
            { columns: [
                { text: [{ text: 'Οργανισμός  ', color: '#94a3b8' }, { text: org, color: '#ffffff' }], fontSize: 9 },
                { text: [{ text: 'Περίοδος  ', color: '#94a3b8' }, { text: period, color: '#ffffff' }], fontSize: 9 },
                { text: [{ text: 'Ημερομηνία  ', color: '#94a3b8' }, { text: T.s, color: '#ffffff' }], fontSize: 9 }
            ], margin: [0, 10, 0, 0] }
        ], fillColor: C.navy, margin: [16, 16, 16, 16] }]] }, layout: 'noBorders', margin: [0, 0, 0, 14] });

        content.push({ columns: [
            { width: 130, stack: [{ svg: donut(r.score, 'Συνολική κάλυψη').svg, width: 120 }] },
            { width: '*', stack: [
                { columns: [
                    { stack: [{ text: String(r.k[2]), style: 'kpi', color: C.green }, { text: 'καλύπτονται', style: 'kpiL' }] },
                    { stack: [{ text: String(r.k[1]), style: 'kpi', color: C.amber }, { text: 'μερικώς', style: 'kpiL' }] },
                    { stack: [{ text: String(r.k[0]), style: 'kpi', color: C.red }, { text: 'κενά', style: 'kpiL' }] },
                    { stack: [{ text: pct(r.covAll) + '%', style: 'kpi', color: pctColor(pct(r.covAll)) }, { text: 'εκπαιδεύτηκαν', style: 'kpiL' }] }
                ], margin: [0, 8, 0, 10] },
                { text: r.verdict, style: 'body' }
            ] }
        ] });

        content.push({ text: 'Κάλυψη ανά πλαίσιο', style: 'h2', margin: [0, 12, 0, 4] });
        content.push({ columns: r.fwScore.map(function (x) { return { svg: donut(x.p, x.f.label).svg, width: 112 }; }), columnGap: 18 });

        content.push({ text: 'Στοιχεία οργανισμού', style: 'h2', margin: [0, 12, 0, 6] });
        content.push({ table: { widths: [180, '*'], body: [
            ['Υπαγωγή στον ν. 5160/2024', entity],
            ['Defender for Office 365 Plan 2 ή E5', lic],
            ['Συχνότητα εκπαίδευσης', i.freq ? 'Κάθε ' + i.freq + ' μήνες' : 'Χωρίς πρόγραμμα επανάληψης'],
            ['Τελευταίος κύκλος', (monthLabel(i.last) || '–') + (i.freq ? (r.onTime ? ' (εμπρόθεσμα)' : ' (εκπρόθεσμα)') : '')],
            ['Εκπαίδευση κατά την πρόσληψη', i.onboard ? 'Ναι' : 'Όχι'],
            ['Εγκεκριμένη Πολιτική Εκπαίδευσης', i.policy ? 'Ναι' : 'Όχι'],
            ['Τεκμήρια ανά κύκλο', i.evid ? 'Ναι' : 'Όχι']
        ].map(function (row) { return [{ text: row[0], bold: true, fontSize: 9, color: C.text }, { text: row[1], fontSize: 9 }]; }) }, layout: 'awTable' });

        // ---------- Σελίδα 2: κάλυψη και θέματα ----------
        content.push({ text: 'Κοινό και κάλυψη', style: 'h1', pageBreak: 'before' });
        content.push({ svg: covBars(ctx).svg, width: 515, margin: [0, 0, 0, 6] });
        content.push({ text: 'Η ΚΥΑ 1689/2025 ζητά περιοδικά προγράμματα για όλο το προσωπικό και τα μέλη της διοίκησης (21.α), εξειδικευμένη εκπαίδευση για το τεχνικό προσωπικό (21.β), και η διοίκηση να παρακολουθεί περιοδικά εκπαίδευση (4.β, περίπτωση βε). Η Εθνική Αρχή Κυβερνοασφάλειας έχει επισημάνει ότι η εκπαίδευση είναι περιοδική και καλύπτει υποχρεωτικά τη διοίκηση, το τεχνικό και όλο το προσωπικό.', style: 'note', margin: [0, 4, 0, 10] });

        content.push({ text: 'Θεματολογία για όλο το προσωπικό (ΚΥΑ 1689/2025, 21.α)', style: 'h2' });
        var trows = ctx.TOPICS.map(function (t) { return [{ text: t.c, bold: true, color: C.blue, fontSize: 9 }, { text: t.t, fontSize: 9 }, chip(i.topics[t.k] ? 2 : 0, { 2: 'Καλύφθηκε', 0: 'Λείπει' })]; });
        trows.push([{ text: 'GDPR', bold: true, color: C.green, fontSize: 9 }, { text: 'Χειρισμός δεδομένων προσωπικού χαρακτήρα (πέρα από την ελάχιστη θεματολογία)', fontSize: 9 }, chip(i.gdprTopic ? 2 : 0, { 2: 'Καλύφθηκε', 0: 'Λείπει' })]);
        content.push({ table: { widths: [32, '*', 70], body: [[{ text: 'Κωδ.', style: 'th' }, { text: 'Θέμα', style: 'th' }, { text: 'Κατάσταση', style: 'th' }]].concat(trows) }, layout: 'awTable' });

        content.push({ text: 'Θεματολογία για το τεχνικό προσωπικό (ΚΥΑ 1689/2025, 21.β)', style: 'h2', margin: [0, 12, 0, 6] });
        content.push({ table: { widths: [32, '*', 70], body: [[{ text: 'Κωδ.', style: 'th' }, { text: 'Θέμα', style: 'th' }, { text: 'Κατάσταση', style: 'th' }]].concat(ctx.TECH.map(function (t) {
            return [{ text: t.c, bold: true, color: C.blue, fontSize: 9 }, { text: t.t, fontSize: 9 }, chip(r.i.g.tech.tot ? (i.tech[t.k] ? 2 : 0) : null, { 2: 'Καλύφθηκε', 0: 'Λείπει' })];
        })) }, layout: 'awTable' });

        // ---------- Προσομοιώσεις ----------
        if (r.sims.length) {
            content.push({ text: 'Αξιολόγηση με προσομοιώσεις phishing', style: 'h1', pageBreak: 'before' });
            content.push({ svg: simBars(r.sims).svg, width: 515 });
            content.push({ columns: [
                { svg: '<svg width="8" height="8"><rect width="8" height="8" rx="1.5" fill="' + C.red + '"/></svg>', width: 8, margin: [0, 1.5, 0, 0] },
                { text: 'πάτησαν (άνοιξαν σύνδεσμο ή συνημμένο, ή έδωσαν κωδικό)', width: 'auto', margin: [4, 0, 14, 0] },
                { svg: '<svg width="8" height="8"><rect width="8" height="8" rx="1.5" fill="' + C.green + '"/></svg>', width: 8, margin: [0, 1.5, 0, 0] },
                { text: 'ανέφεραν (Report στο Outlook)', width: 'auto', margin: [4, 0, 0, 0] }
            ], columnGap: 0, fontSize: 8, color: C.muted, margin: [0, 2, 0, 10] });
            content.push({ table: { widths: [50, 60, '*', '*', '*', '*'], body: [[
                { text: 'Κύκλος', style: 'th' }, { text: 'Μήνας', style: 'th' }, { text: 'Χρήστες', style: 'th' }, { text: 'Πάτησαν', style: 'th' }, { text: 'Ανέφεραν', style: 'th' }, { text: 'Ποσοστά', style: 'th' }
            ]].concat(r.sims.map(function (x) { return [String(x.idx), monthLabel(x.m) || '–', String(x.n), String(x.c), String(x.r), { text: pct(x.cr) + '% / ' + pct(x.rr) + '%', bold: true }]; })) }, layout: 'awTable' });
            if (r.trend) content.push({ text: 'Από τον πρώτο στον τελευταίο κύκλο, το ποσοστό όσων πάτησαν ' + (r.trend.dc <= 0 ? 'μειώθηκε κατά ' + (-r.trend.dc) : 'αυξήθηκε κατά ' + r.trend.dc) + ' μονάδες και το ποσοστό όσων ανέφεραν ' + (r.trend.dr >= 0 ? 'αυξήθηκε κατά ' + r.trend.dr : 'μειώθηκε κατά ' + (-r.trend.dr)) + ' μονάδες. Η εξέλιξη αυτή τεκμηριώνει την αξιολόγηση της αποτελεσματικότητας (ΚΥΑ 1689/2025, 21.γ).', style: 'body', margin: [0, 10, 0, 0] });
            content.push({ text: 'Πηγή: Microsoft Defender portal › Email & collaboration › Attack simulation training › Simulations. Τα αποτελέσματα παρουσιάζονται συγκεντρωτικά, χωρίς ονόματα.', style: 'note', margin: [0, 8, 0, 0] });
        }

        // ---------- Ανά απαίτηση ----------
        content.push({ text: 'Αντιστοίχιση ανά απαίτηση', style: 'h1', pageBreak: 'before' });
        FW.forEach(function (f) {
            var rs = r.R.filter(function (x) { return x.fw === f.key; });
            content.push({ text: f.label, style: 'h2', link: ctx.base + f.url.replace(/^\//, '') });
            content.push({ table: { widths: [44, '*', 76], dontBreakRows: true, body: [[{ text: 'Κωδ.', style: 'th' }, { text: 'Απαίτηση και τι δηλώθηκε', style: 'th' }, { text: 'Κατάσταση', style: 'th' }]].concat(rs.map(function (x) {
                return [{ text: x.code, link: link(ctx, f, x), color: C.blue, bold: true, fontSize: 9 },
                    { stack: [{ text: x.title, bold: true, fontSize: 9, color: C.text }, { text: x.why, fontSize: 8.5, margin: [0, 2, 0, 0] }] },
                    chip(x.s, ST)];
            })) }, layout: 'awTable', margin: [0, 0, 0, 10] });
        });

        // ---------- Ενέργειες και τεκμήρια ----------
        var gaps = r.R.filter(function (x) { return x.s !== null && x.s < 2; }).sort(function (a, b) { return a.s - b.s; });
        var seen = {}; gaps = gaps.filter(function (x) { if (seen[x.act]) return false; seen[x.act] = 1; return true; });
        content.push({ text: 'Πλάνο ενεργειών', style: 'h1', pageBreak: 'before' });
        if (gaps.length) {
            content.push({ table: { widths: [18, 92, '*', 60, 50], body: [[{ text: '#', style: 'th' }, { text: 'Απαίτηση', style: 'th' }, { text: 'Ενέργεια', style: 'th' }, { text: 'Υπεύθυνος', style: 'th' }, { text: 'Έως', style: 'th' }]].concat(gaps.map(function (x, k) {
                var f = FW.filter(function (y) { return y.key === x.fw; })[0];
                return [String(k + 1), { text: f.label + ' ' + x.code, color: stStyle(x.s).c, bold: true, fontSize: 8.5 }, { text: x.act, fontSize: 8.5 }, '', ''];
            })) }, layout: 'awTable' });
            content.push({ text: 'Οι στήλες «Υπεύθυνος» και «Έως» συμπληρώνονται από τον οργανισμό. Ένα πλάνο με υπεύθυνους και ημερομηνίες είναι κι αυτό τεκμήριο για τον ελεγκτή.', style: 'note', margin: [0, 6, 0, 0] });
        } else content.push({ text: 'Δεν εντοπίστηκαν κενά με βάση τις απαντήσεις.', style: 'body' });

        content.push({ text: 'Τεκμήρια για τον ελεγκτή', style: 'h2', margin: [0, 14, 0, 6] });
        content.push({ table: { widths: [16, '*', 60], body: r.evid.filter(function (e) { return !e.opt; }).map(function (e) {
            var mark = e.have
                ? '<svg width="10" height="10" viewBox="0 0 10 10"><circle cx="5" cy="5" r="5" fill="' + C.green + '"/><path d="M2.6 5.2 L4.3 6.8 L7.4 3.4" fill="none" stroke="#ffffff" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>'
                : '<svg width="10" height="10" viewBox="0 0 10 10"><circle cx="5" cy="5" r="4.3" fill="none" stroke="' + C.muted + '" stroke-width="1.2"/></svg>';
            return [{ svg: mark, width: 10, margin: [0, 1.5, 0, 0] }, { text: e.t, fontSize: 9 }, { text: e.have ? 'Υπάρχει' : 'Να συγκεντρωθεί', fontSize: 8, color: e.have ? C.green : C.amber, bold: true }];
        }) }, layout: 'awTable' });
        if (i.lic !== 'all') content.push({ text: i.lic === 'none' ? 'Χωρίς Microsoft Defender for Office 365 Plan 2 ή Microsoft 365 E5 δεν υπάρχει Attack simulation training. Η εκπαίδευση γίνεται με άλλο υλικό και τα τεκμήρια τηρούνται από τον οργανισμό.' : 'Στο Attack simulation training συμμετέχουν μόνο χρήστες με Microsoft Defender for Office 365 Plan 2 ή Microsoft 365 E5. Για τους υπόλοιπους χρειάζεται άλλο υλικό και δικά σας τεκμήρια.', style: 'note', margin: [0, 6, 0, 0] });

        // ---------- Μεθοδολογία και όροι ----------
        content.push({ text: 'Μεθοδολογία και όροι χρήσης', style: 'h1', pageBreak: 'before' });
        content.push({ text: 'Πώς βγαίνει το αποτέλεσμα', style: 'h3' });
        content.push({ text: 'Κάθε απαίτηση αξιολογείται με κανόνες από τις απαντήσεις: «Καλύπτεται» 2 βαθμοί, «Μερικώς» 1, «Κενό» 0. Το ποσοστό ανά πλαίσιο και το συνολικό είναι το άθροισμα προς το μέγιστο. Για την πλήρη κάλυψη η εκπαίδευση πρέπει να είναι περιοδική και εμπρόθεσμη, να φτάνει τουλάχιστον το 90% κάθε ομάδας και το 100% της διοίκησης, και να συνοδεύεται από τεκμήρια. Οι ρήτρες 7.2 και 7.3 του ISO/IEC 27001 βρίσκονται στο κυρίως μέρος του προτύπου, όχι στο Annex A.', style: 'body' });
        content.push({ text: 'Τι δεν καλύπτει', style: 'h3' });
        content.push({ text: 'Το εργαλείο δεν συνδέεται στο tenant και δεν επαληθεύει τα στοιχεία: το αποτέλεσμα βασίζεται μόνο στις απαντήσεις που δόθηκαν. Δεν κρίνει την ποιότητα του εκπαιδευτικού υλικού. Δεν είναι ελεγκτική γνώμη ούτε νομική συμβουλή.', style: 'body' });
        content.push({ text: 'Πνευματικά δικαιώματα και όροι χρήσης', style: 'h3' });
        var terms = [
            ['Δικαιούχος', '© ' + T.d.getFullYear() + ' Δημοσθένης Αττέια, thecybersec.gr. Με επιφύλαξη παντός δικαιώματος.'],
            ['Τι προστατεύεται', 'Οι ερωτήσεις, οι κανόνες αξιολόγησης, η αντιστοίχιση με τις απαιτήσεις των πλαισίων και με λειτουργίες της Microsoft, και η δομή της αναφοράς είναι πρωτότυπο έργο του συντάκτη και προστατεύονται από τον ν. 2121/1993. Τα κείμενα της ΚΥΑ 1689/2025, της Οδηγίας (ΕΕ) 2022/2555 και του Κανονισμού (ΕΕ) 2016/679 είναι δημόσια έγγραφα και δεν αποτελούν αντικείμενο αυτής της προστασίας.'],
            ['Τι επιτρέπεται', 'Η χρήση της αναφοράς για τις εσωτερικές ανάγκες του οργανισμού σας, καθώς και η επίδειξή της σε ελεγκτές και αρμόδιες αρχές στο πλαίσιο ελέγχου.'],
            ['Τι απαγορεύεται χωρίς γραπτή άδεια', 'Η αναδημοσίευση, η αναδιανομή και η ανάρτηση της αναφοράς ή τμήματός της σε ιστότοπους, πλατφόρμες ή μέσα κοινωνικής δικτύωσης. Η εμπορική εκμετάλλευση, μαζί με την ενσωμάτωσή της σε προϊόντα, υπηρεσίες, εκπαιδευτικό υλικό ή παραδοτέα προς τρίτους. Η αφαίρεση ή η αλλοίωση της αναφοράς στον συντάκτη και στην πηγή.'],
            ['Πώς το μοιράζεστε', { text: page, link: page, color: C.blue }],
            ['Επικοινωνία', { text: 'LinkedIn: linkedin.com/in/dimosthenisatteia', link: 'https://www.linkedin.com/in/dimosthenisatteia/', color: C.blue }]
        ];
        content.push({ table: { widths: [120, '*'], body: terms.map(function (t) { return [{ text: t[0], bold: true, fontSize: 8.5, color: C.text }, typeof t[1] === 'string' ? { text: t[1], fontSize: 8.5 } : Object.assign({ fontSize: 8.5 }, t[1])]; }) }, layout: 'awTable' });

        var doc = {
            pageSize: 'A4', pageMargins: [40, 54, 40, 48],
            info: { title: 'Φάκελος τεκμηρίωσης εκπαίδευσης προσωπικού', author: 'thecybersec.gr', subject: 'ΚΥΑ 1689/2025, NIS2, ISO/IEC 27001, GDPR', creator: 'thecybersec.gr' },
            header: function (cur) {
                if (cur === 1) return null;
                return { columns: [
                    { text: 'Εκπαίδευση προσωπικού · ' + org + ' · ' + T.s, fontSize: 7.5, color: C.muted },
                    { text: 'thecybersec.gr', fontSize: 7.5, color: C.blue, alignment: 'right', link: page }
                ], margin: [40, 24, 40, 0] };
            },
            footer: function (cur, total) {
                return { columns: [
                    { text: '© ' + T.d.getFullYear() + ' Δημοσθένης Αττέια · thecybersec.gr · Ενδεικτικό, όχι ελεγκτική γνώμη', fontSize: 7, color: C.muted },
                    { text: 'Σελίδα ' + cur + ' από ' + total, fontSize: 7.5, color: C.muted, alignment: 'right' }
                ], margin: [40, 16, 40, 0] };
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
                note: { fontSize: 8.5, color: C.muted, lineHeight: 1.25 },
                body: { fontSize: 9.5, lineHeight: 1.3 }
            }
        };
        var layouts = { awTable: {
            hLineWidth: function (k, node) { return k === 0 || k === node.table.body.length ? 0 : 0.5; },
            vLineWidth: function () { return 0; }, hLineColor: function () { return C.line; },
            paddingTop: function () { return 4; }, paddingBottom: function () { return 4; },
            paddingLeft: function () { return 6; }, paddingRight: function () { return 6; }
        } };
        window.pdfMake.createPdf(doc, layouts).download('tekmiriosi-ekpaideysis' + (slug(i.org) ? '-' + slug(i.org) : '') + '-' + T.iso + '.pdf');
    };

    window.awBuildXlsx = function (ctx) {
        var X = window.XLSX, r = ctx.r, i = r.i, T = today(), page = ctx.base + PAGE, wb = X.utils.book_new();
        function sheet(name, rows, cols) { var ws = X.utils.aoa_to_sheet(rows); if (cols) ws['!cols'] = cols.map(function (w) { return { wch: w }; }); X.utils.book_append_sheet(wb, ws, name); }

        sheet('Όροι χρήσης', [
            ['Μητρώο εκπαίδευσης προσωπικού στην κυβερνοασφάλεια'],
            [],
            ['© ' + T.d.getFullYear() + ' Δημοσθένης Αττέια, thecybersec.gr. Με επιφύλαξη παντός δικαιώματος.'],
            ['Η δομή του μητρώου, οι κανόνες αξιολόγησης και η αντιστοίχιση με ΚΥΑ 1689/2025, Οδηγία NIS2, ISO/IEC 27001 και GDPR είναι πρωτότυπο έργο του συντάκτη (ν. 2121/1993).'],
            ['Επιτρέπεται: η χρήση για τις εσωτερικές ανάγκες του οργανισμού σας και η επίδειξη σε ελεγκτές και αρμόδιες αρχές.'],
            ['Απαγορεύεται χωρίς γραπτή άδεια: η αναδημοσίευση, η αναδιανομή, η εμπορική εκμετάλλευση και η αφαίρεση της αναφοράς στον συντάκτη και στην πηγή.'],
            ['Πηγή: ' + page],
            ['Ενδεικτικό εργαλείο, όχι ελεγκτική γνώμη ή νομική συμβουλή.']
        ], [140]);

        sheet('Σύνοψη', [
            ['Οργανισμός', i.org || ''], ['Περίοδος', i.period || ''], ['Ημερομηνία', T.s],
            ['Συνολική κάλυψη', r.score + '%'], ['Καλύπτονται', r.k[2]], ['Μερικώς', r.k[1]], ['Κενά', r.k[0]],
            [],
            ['Πλαίσιο', 'Κάλυψη']
        ].concat(r.fwScore.map(function (x) { return [x.f.label, x.p + '%']; })).concat([
            [],
            ['Ομάδα', 'Σύνολο', 'Εκπαιδεύτηκαν', 'Κάλυψη']
        ]).concat(ctx.GROUPS.map(function (g) { var x = i.g[g.k]; return [g.n, x.tot === null ? '' : x.tot, x.done === null ? '' : x.done, r.cov[g.k] === null ? '' : pct(r.cov[g.k]) + '%']; })), [28, 14, 16, 12]);

        sheet('Απαιτήσεις', [['Πλαίσιο', 'Κωδικός', 'Απαίτηση', 'Κατάσταση', 'Τι δηλώθηκε', 'Ενέργεια', 'Υπεύθυνος', 'Έως', 'Σύνδεσμος']].concat(r.R.map(function (x) {
            var f = ctx.FW.filter(function (y) { return y.key === x.fw; })[0];
            return [f.label, x.code, x.title, x.s === null ? 'Δεν εφαρμόζεται' : ctx.ST[x.s], x.why, x.s === 2 || x.s === null ? '' : x.act, '', '', link(ctx, f, x)];
        })), [16, 9, 48, 14, 60, 70, 14, 10, 50]);

        sheet('Θεματολογία', [['Κοινό', 'Κωδικός', 'Θέμα', 'Καλύφθηκε']].concat(ctx.TOPICS.map(function (t) { return ['Όλο το προσωπικό', t.c, t.t, i.topics[t.k] ? 'Ναι' : 'Όχι']; }))
            .concat([['Όλο το προσωπικό', 'GDPR', 'Χειρισμός δεδομένων προσωπικού χαρακτήρα', i.gdprTopic ? 'Ναι' : 'Όχι']])
            .concat(ctx.TECH.map(function (t) { return ['Τεχνικό προσωπικό', t.c, t.t, i.tech[t.k] ? 'Ναι' : 'Όχι']; })), [20, 9, 60, 11]);

        sheet('Προσομοιώσεις', [['Κύκλος', 'Μήνας', 'Χρήστες', 'Πάτησαν', 'Ανέφεραν', '% πάτησαν', '% ανέφεραν']].concat(r.sims.map(function (x) {
            return [x.idx, monthLabel(x.m), x.n, x.c, x.r, pct(x.cr) + '%', pct(x.rr) + '%'];
        })), [9, 10, 10, 10, 10, 11, 11]);

        // Πρότυπο μητρώου με παραδείγματα: μόνο ρόλοι, κατασκευασμένα στοιχεία για την εικονική εταιρεία MyCompany
        sheet('Μητρώο εκπαίδευσης', [
            ['Ημερομηνία', 'Ομάδα', 'Ρόλος ή τμήμα', 'Θέμα', 'Κωδικοί ΚΥΑ', 'Μορφή', 'Διάρκεια (λεπτά)', 'Συμμετέχοντες', 'Ολοκλήρωσαν', 'Τεκμήριο', 'Θέση τεκμηρίου', 'Σημείωση'],
            ['2026-02-10', 'Διοίκηση', 'CEO, CFO, COO', 'Ευθύνες της διοίκησης κατά τον ν. 5160/2024 και διαχείριση κινδύνων', '4.β', 'Δια ζώσης', 90, 3, 3, 'Παρουσιολόγιο, πρακτικό ΔΣ', 'ISMS\\Εκπαίδευση\\2026', 'Παράδειγμα για MyCompany'],
            ['2026-03-02', 'Λοιπό προσωπικό', 'Όλα τα τμήματα', 'Phishing, κωδικοί, MFA, ασφαλής περιήγηση', '21.α (αα, αβ, αγ, αδ)', 'Training campaign, Attack simulation training', 25, 180, 158, 'Εξαγωγή Training completion', 'Defender portal', 'Παράδειγμα για MyCompany'],
            ['2026-03-16', 'Λοιπό προσωπικό', 'HR, Legal', 'Τηλεργασία, οικιακό δίκτυο, αντίγραφα ασφαλείας', '21.α (αε, αστ)', 'Online', 45, 14, 14, 'Βεβαιώσεις', 'ISMS\\Εκπαίδευση\\2026', 'Παράδειγμα για MyCompany'],
            ['2026-04-08', 'Τεχνικό προσωπικό', 'IT, CISO', 'Απόκριση σε περιστατικά με Microsoft Defender XDR', '21.β (βγ)', 'Microsoft Learn path', 240, 6, 6, 'Πιστοποιητικά ολοκλήρωσης', 'ISMS\\Εκπαίδευση\\2026', 'Παράδειγμα για MyCompany'],
            ['2026-05-05', 'Όλοι', 'Όλα τα τμήματα', 'Προσομοίωση phishing (credential harvest)', '21.γ', 'Simulation, Attack simulation training', '', 196, '', 'Αναφορά προσομοίωσης', 'Defender portal', 'Παράδειγμα για MyCompany'],
            ['2026-06-01', 'Νέοι εργαζόμενοι', 'HR', 'Εκπαίδευση πρόσληψης: πολιτική ασφάλειας και αναφορά περιστατικού', '21.α (αζ)', 'Δια ζώσης', 30, 4, 4, 'Υπογεγραμμένη δήλωση', 'Φάκελος εργαζομένου', 'Παράδειγμα για MyCompany']
        ], [12, 18, 18, 58, 18, 32, 14, 14, 13, 30, 24, 24]);

        X.writeFile(wb, 'mitroo-ekpaideysis' + (slug(i.org) ? '-' + slug(i.org) : '') + '-' + T.iso + '.xlsx');
    };
})();
