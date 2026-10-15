/* Αναφορά PDF του εργαλείου «Είναι έτοιμο το Microsoft 365 σου για τον ελεγκτή;»
   Φτιάχνεται εξ ολοκλήρου στον browser με pdfmake. Δεν αποστέλλεται κανένα στοιχείο.
   Καλείται από το shortcode ready-check: window.rcBuildPdf(ctx) */
(function () {
    var C = {
        navy: '#0f172a', blue: '#2563eb', blueLight: '#dbeafe', text: '#1e293b', muted: '#64748b', line: '#e2e8f0', band: '#f8fafc',
        red: '#e11d48', redBg: '#ffe4e6', amber: '#d97706', amberBg: '#fef3c7', green: '#059669', greenBg: '#d1fae5', grayBg: '#f1f5f9'
    };
    function lvStyle(v) {
        if (v === 'u') return { c: C.muted, bg: C.grayBg };
        v = +v;
        return v === 3 ? { c: C.green, bg: C.greenBg } : v >= 1 ? { c: C.amber, bg: C.amberBg } : { c: C.red, bg: C.redBg };
    }
    function pctColor(p) { return p >= 85 ? C.green : p >= 50 ? C.amber : C.red; }
    function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

    // Δακτύλιος ποσοστού σε SVG
    function donut(p, size) {
        var r = 52, cx = 60, cy = 60, col = pctColor(p);
        var a = Math.min(p, 99.99) / 100 * 2 * Math.PI;
        var x = cx + r * Math.sin(a), y = cy - r * Math.cos(a);
        var arc = p <= 0 ? '' : '<path d="M ' + cx + ' ' + (cy - r) + ' A ' + r + ' ' + r + ' 0 ' + (a > Math.PI ? 1 : 0) + ' 1 ' + x.toFixed(2) + ' ' + y.toFixed(2) + '" fill="none" stroke="' + col + '" stroke-width="12" stroke-linecap="round"/>';
        return {
            svg: '<svg width="120" height="120" viewBox="0 0 120 120"><circle cx="60" cy="60" r="52" fill="none" stroke="' + C.line + '" stroke-width="12"/>' + arc +
                '<text x="60" y="66" text-anchor="middle" font-size="26" font-weight="bold" fill="' + C.text + '">' + p + '%</text></svg>',
            width: size, height: size
        };
    }
    // Οριζόντιες μπάρες ανά κατηγορία
    function bars(rows) {
        var h = rows.length * 21 + 4, w = 515, lw = 170, bw = 290;
        var out = '<svg width="' + w + '" height="' + h + '" viewBox="0 0 ' + w + ' ' + h + '">';
        rows.forEach(function (r, i) {
            var y = i * 21 + 4;
            out += '<text x="0" y="' + (y + 12) + '" font-size="10" fill="' + C.text + '">' + esc(r.name) + '</text>';
            out += '<rect x="' + lw + '" y="' + (y + 3) + '" width="' + bw + '" height="11" rx="3" fill="' + C.grayBg + '"/>';
            if (r.p > 0) out += '<rect x="' + lw + '" y="' + (y + 3) + '" width="' + (bw * r.p / 100).toFixed(1) + '" height="11" rx="3" fill="' + pctColor(r.p) + '"/>';
            out += '<text x="' + w + '" y="' + (y + 12) + '" font-size="10" font-weight="bold" text-anchor="end" fill="' + pctColor(r.p) + '">' + r.p + '%</text>';
        });
        return { svg: out + '</svg>', width: w };
    }
    function h1(t, pageBreak) { return { text: t, style: 'h1', pageBreak: pageBreak ? 'before' : undefined, tocItem: false }; }
    function label(t) { return { text: t, style: 'label' }; }

    window.rcBuildPdf = function (ctx) {
        var D = ctx.D, a = ctx.a, Q = D.questions, N = Q.length, LV = ctx.LV, FW = ctx.FW, PIL = ctx.PIL, BASE = ctx.base;
        var score = function (v) { return v === 'u' ? 0 : +v; };
        var today = new Date(), dstr = ('0' + today.getDate()).slice(-2) + '/' + ('0' + (today.getMonth() + 1)).slice(-2) + '/' + today.getFullYear();
        var planName = ctx.plan ? ctx.PLAN[ctx.plan].name : 'Δεν δηλώθηκε';
        var page = BASE + 'etoimotita-microsoft-365/';
        var cnt = ctx.cnt, pct = ctx.pct;

        var pillars = D.pillars.map(function (p) {
            var qs = Q.filter(function (q) { return q.pillar === p.key; });
            var s = 0; qs.forEach(function (q) { s += score(a[q.id]); });
            return { key: p.key, name: p.name, qs: qs, p: qs.length ? Math.round(s / (3 * qs.length) * 100) : 0 };
        }).filter(function (p) { return p.qs.length; });

        // Κάλυψη ανά πλαίσιο
        var fwData = FW.map(function (f) {
            var worst = {}, qs = {}, order = [];
            Q.forEach(function (q, i) {
                (q.map[f.key] || []).forEach(function (c) {
                    var s = score(a[q.id]);
                    if (!(c in worst)) { worst[c] = s; qs[c] = []; order.push(c); } else if (s < worst[c]) worst[c] = s;
                    qs[c].push(i + 1);
                });
            });
            var k = { g: 0, m: 0, e: 0 };
            order.forEach(function (c) { if (worst[c] < 2) k.g++; else if (worst[c] === 2) k.m++; else k.e++; });
            return { f: f, worst: worst, qs: qs, order: order, k: k };
        });

        var gaps = Q.filter(function (q) { return score(a[q.id]) < 2; }).sort(function (x, y) {
            return (x.priority === 'high' ? 0 : 1) - (y.priority === 'high' ? 0 : 1) || score(a[x.id]) - score(a[y.id]);
        });
        var noev = Q.filter(function (q) { return a[q.id] === '2'; });

        var verdict;
        if (pct >= 85 && !(cnt[0] + cnt[1] + cnt.u)) verdict = 'Καλή θέση. Όλα τα μέτρα επιβάλλονται. Φρόντισε να έχεις τεκμήριο για όσα δεν έχουν ακόμη και να το ανανεώνεις πριν από κάθε έλεγχο.';
        else if (pct >= 60) verdict = 'Η βάση υπάρχει, αλλά ένας ελεγκτής θα βρει ευρήματα. Ξεκίνα από τα κενά υψηλής προτεραιότητας και μετά συγκέντρωσε τα τεκμήρια.';
        else if (pct >= 35) verdict = 'Σημαντικά κενά. Πολλά βασικά μέτρα λείπουν ή εφαρμόζονται μερικώς. Φτιάξε πλάνο με ημερομηνίες για τα κενά υψηλής προτεραιότητας, γιατί και το πλάνο είναι τεκμήριο.';
        else verdict = 'Δεν είσαι έτοιμος για έλεγχο. Ξεκίνα από MFA, legacy authentication, προστασία email και antimalware, τα μέτρα με τη μεγαλύτερη επίπτωση.';

        function codesLine(q) {
            var parts = [];
            FW.forEach(function (f) {
                var c = q.map[f.key] || []; if (!c.length) return;
                if (parts.length) parts.push({ text: '   ·   ', color: C.muted });
                parts.push({ text: f.label + ' ', color: C.muted });
                c.forEach(function (x, i) {
                    if (i) parts.push({ text: ', ' });
                    parts.push({ text: x, link: BASE + f.url.replace(/^\//, '') + '#' + String(x).replace(/\./g, '-'), color: C.blue });
                });
            });
            return { text: parts, fontSize: 8.5, margin: [0, 3, 0, 0] };
        }
        function kqlLine(q) {
            var k = (q.kql || []).filter(function (id) { return D.kql[id]; });
            if (!k.length) return null;
            var parts = [{ text: 'Query από τη Βιβλιοθήκη KQL: ', color: C.muted }];
            k.forEach(function (id, i) { if (i) parts.push({ text: ' · ' }); parts.push({ text: D.kql[id], link: BASE + 'kql/#' + id, color: C.blue }); });
            return { text: parts, fontSize: 8.5, margin: [0, 3, 0, 0] };
        }
        function field(name, val) { return { text: [{ text: name + ': ', bold: true, color: C.text }, { text: val }], fontSize: 9, margin: [0, 2, 0, 0], color: '#334155' }; }

        // ---------- Σελίδα 1: σύνοψη ----------
        var content = [];
        content.push({
            table: { widths: ['*'], body: [[{
                stack: [
                    { text: 'ΑΝΑΦΟΡΑ ΕΤΟΙΜΟΤΗΤΑΣ', fontSize: 8, color: '#93c5fd', characterSpacing: 1.5 },
                    { text: 'Είναι έτοιμο το Microsoft 365 για τον ελεγκτή;', fontSize: 20, bold: true, color: '#ffffff', margin: [0, 4, 0, 6] },
                    { text: 'ΚΥΑ 1689/2025 · Οδηγία NIS2 · ISO/IEC 27001 · GDPR', fontSize: 9, color: '#cbd5e1' },
                    { columns: [
                        { text: [{ text: 'Ημερομηνία  ', color: '#94a3b8' }, { text: dstr, color: '#ffffff' }], fontSize: 9 },
                        { text: [{ text: 'Πακέτο  ', color: '#94a3b8' }, { text: planName, color: '#ffffff' }], fontSize: 9 },
                        { text: [{ text: 'Ερωτήσεις  ', color: '#94a3b8' }, { text: String(N), color: '#ffffff' }], fontSize: 9 }
                    ], margin: [0, 10, 0, 0] }
                ], fillColor: C.navy, margin: [16, 16, 16, 16]
            }]] },
            layout: 'noBorders', margin: [0, 0, 0, 12]
        });
        content.push({
            columns: [
                { width: 120, stack: [donut(pct, 105), { text: 'συνολική ετοιμότητα', alignment: 'center', fontSize: 8, color: C.muted, margin: [0, 2, 0, 0] }] },
                { width: '*', stack: [
                    { text: verdict, fontSize: 10, color: C.text, lineHeight: 1.25, margin: [0, 4, 0, 8] },
                    { table: { widths: ['*', '*', '*', '*', '*'], body: [[
                        { stack: [{ text: String(cnt[3]), style: 'kpi', color: C.green }, { text: 'με τεκμήριο', style: 'kpiL' }], fillColor: C.greenBg },
                        { stack: [{ text: String(cnt[2]), style: 'kpi', color: C.amber }, { text: 'χωρίς τεκμήριο', style: 'kpiL' }], fillColor: C.amberBg },
                        { stack: [{ text: String(cnt[1]), style: 'kpi', color: C.amber }, { text: 'μερικώς', style: 'kpiL' }], fillColor: C.amberBg },
                        { stack: [{ text: String(cnt[0]), style: 'kpi', color: C.red }, { text: 'δεν υπάρχει', style: 'kpiL' }], fillColor: C.redBg },
                        { stack: [{ text: String(cnt.u), style: 'kpi', color: C.muted }, { text: 'δεν ξέρω', style: 'kpiL' }], fillColor: C.grayBg }
                    ]] }, layout: { hLineWidth: function () { return 0; }, vLineWidth: function () { return 3; }, vLineColor: function () { return '#ffffff'; }, paddingTop: function () { return 6; }, paddingBottom: function () { return 6; } } }
                ] }
            ], columnGap: 16, margin: [0, 0, 0, 8]
        });
        content.push({ text: 'Ετοιμότητα ανά κατηγορία', style: 'h2' });
        content.push(bars(pillars));
        content.push({ text: 'Κάλυψη ανά πλαίσιο συμμόρφωσης', style: 'h2', margin: [0, 8, 0, 4] });
        content.push({
            table: { headerRows: 1, dontBreakRows: true, widths: ['*', 60, 60, 80, 60], body: [[
                { text: 'Πλαίσιο', style: 'th' }, { text: 'Απαιτήσεις', style: 'th', alignment: 'center' }, { text: 'Με κενό', style: 'th', alignment: 'center' }, { text: 'Χωρίς τεκμήριο', style: 'th', alignment: 'center' }, { text: 'Με τεκμήριο', style: 'th', alignment: 'center' }
            ]].concat(fwData.map(function (x) {
                return [{ text: x.f.label, link: BASE + x.f.url.replace(/^\//, ''), color: C.blue, fontSize: 9.5 },
                    { text: String(x.order.length), alignment: 'center', fontSize: 9.5 },
                    { text: String(x.k.g), alignment: 'center', bold: true, color: C.red, fontSize: 9.5 },
                    { text: String(x.k.m), alignment: 'center', color: C.amber, fontSize: 9.5 },
                    { text: String(x.k.e), alignment: 'center', color: C.green, fontSize: 9.5 }];
            })) },
            layout: 'rcTable'
        });
        if (gaps.length) {
            content.push({ text: 'Ξεκίνα από εδώ', style: 'h2', margin: [0, 8, 0, 4] });
            content.push({ ol: gaps.slice(0, 5).map(function (q) {
                return { text: [{ text: q.q, color: C.text }, { text: '  ' + PIL[q.pillar] + ' · ' + LV[a[q.id]], color: C.muted, fontSize: 8.5 }], margin: [0, 0, 0, 3] };
            }), fontSize: 9.5 });
        }

        // ---------- Αναλυτικά ανά κατηγορία ----------
        content.push(h1('Αναλυτικά ανά κατηγορία', true));
        pillars.forEach(function (p, pi) {
            content.push({
                table: { widths: ['*', 'auto'], body: [[
                    { text: p.name, bold: true, fontSize: 12, color: C.text, margin: [0, 2, 0, 2] },
                    { text: p.p + '%', bold: true, fontSize: 12, color: pctColor(p.p), alignment: 'right', margin: [0, 2, 0, 2] }
                ]] },
                layout: { hLineWidth: function (i) { return i === 1 ? 2 : 0; }, hLineColor: function () { return pctColor(p.p); }, vLineWidth: function () { return 0; }, paddingLeft: function () { return 0; }, paddingRight: function () { return 0; } },
                margin: [0, pi ? 16 : 4, 0, 6], unbreakable: true
            });
            content.push({
                table: { headerRows: 1, dontBreakRows: true, widths: [18, '*', 110], body: [[
                    { text: '#', style: 'th' }, { text: 'Ερώτηση', style: 'th' }, { text: 'Απάντηση', style: 'th' }
                ]].concat(p.qs.map(function (q) {
                    var st = lvStyle(a[q.id]);
                    return [{ text: String(Q.indexOf(q) + 1), fontSize: 8.5, color: C.muted }, { text: q.q, fontSize: 9 }, { text: LV[a[q.id]], fontSize: 8.5, bold: true, color: st.c, fillColor: st.bg }];
                })) },
                layout: 'rcTable', margin: [0, 0, 0, 6]
            });
            p.qs.filter(function (q) { return score(a[q.id]) < 2; }).sort(function (x, y) { return score(a[x.id]) - score(a[y.id]); }).forEach(function (q) {
                var st = lvStyle(a[q.id]);
                var stack = [
                    { text: [{ text: 'ΚΕΝΟ  ', color: st.c, bold: true, fontSize: 8 }, { text: q.q, bold: true, fontSize: 9.5, color: C.text }, q.priority === 'high' ? { text: '   υψηλή προτεραιότητα', color: C.red, fontSize: 8 } : ''] },
                    field('Στόχος', q.enforced),
                    field('Πού', q.fix),
                    field('Άδεια', ctx.licText(q, ctx.plan)),
                    field('Τεκμήριο που θα ζητηθεί', q.evidence)
                ];
                var k = kqlLine(q); if (k) stack.push(k);
                stack.push(codesLine(q));
                stack.push({ text: 'Microsoft Learn', link: q.source, color: C.blue, fontSize: 8.5, margin: [0, 2, 0, 0] });
                content.push({ table: { widths: [3, '*'], body: [[{ text: '', fillColor: st.c }, { stack: stack, margin: [8, 4, 4, 4] }]] }, layout: 'noBorders', margin: [0, 4, 0, 4], unbreakable: true });
            });
            p.qs.filter(function (q) { return a[q.id] === '2'; }).forEach(function (q) {
                var stack = [
                    { text: [{ text: 'ΧΩΡΙΣ ΤΕΚΜΗΡΙΟ  ', color: C.amber, bold: true, fontSize: 8 }, { text: q.q, bold: true, fontSize: 9.5, color: C.text }] },
                    field('Τι κρατάς', q.evidence)
                ];
                var k = kqlLine(q); if (k) stack.push(k);
                stack.push(codesLine(q));
                content.push({ table: { widths: [3, '*'], body: [[{ text: '', fillColor: '#fbbf24' }, { stack: stack, margin: [8, 4, 4, 4] }]] }, layout: 'noBorders', margin: [0, 4, 0, 4], unbreakable: true });
            });
        });

        // ---------- Κάλυψη ανά πλαίσιο ----------
        content.push(h1('Κάλυψη ανά απαίτηση', true));
        content.push({ text: 'Για κάθε απαίτηση που αγγίζουν οι ερωτήσεις, το χαμηλότερο επίπεδο που δηλώθηκε. Κάθε κωδικός είναι σύνδεσμος στην απαίτηση στον αντίστοιχο οδηγό του thecybersec.gr.', style: 'note', margin: [0, 0, 0, 8] });
        fwData.forEach(function (x) {
            content.push({ text: x.f.label + '  ·  ' + x.order.length + ' απαιτήσεις, ' + x.k.g + ' με κενό', style: 'h3' });
            var cells = x.order.map(function (c) {
                var st = lvStyle(x.worst[c]);
                return { stack: [
                    { text: c, bold: true, fontSize: 9, color: st.c, link: BASE + x.f.url.replace(/^\//, '') + '#' + String(c).replace(/\./g, '-') },
                    { text: LV[x.worst[c]], fontSize: 7, color: C.muted },
                    { text: 'Ερ. ' + x.qs[c].join(', '), fontSize: 7, color: C.muted }
                ], fillColor: st.bg, margin: [2, 2, 2, 2] };
            });
            var rows = [], per = 5;
            for (var i = 0; i < cells.length; i += per) {
                var r = cells.slice(i, i + per);
                while (r.length < per) r.push({ text: '' });
                rows.push(r);
            }
            content.push({ table: { widths: ['*', '*', '*', '*', '*'], body: rows }, layout: { hLineWidth: function () { return 3; }, vLineWidth: function () { return 3; }, hLineColor: function () { return '#ffffff'; }, vLineColor: function () { return '#ffffff'; } }, margin: [0, 0, 0, 10] });
        });

        // ---------- Πλάνο διορθωτικών ενεργειών ----------
        var plan = gaps.concat(noev);
        if (plan.length) {
            content.push(h1('Πλάνο διορθωτικών ενεργειών', true));
            content.push({ text: 'Τα κενά με σειρά προτεραιότητας και, στο τέλος, όσα επιβάλλονται αλλά χρειάζονται τεκμήριο. Συμπλήρωσε υπεύθυνο, ημερομηνία στόχο και κατάσταση. Το συμπληρωμένο πλάνο είναι από μόνο του τεκμήριο ότι τα κενά διαχειρίζονται.', style: 'note', margin: [0, 0, 0, 8] });
            content.push({
                table: { headerRows: 1, dontBreakRows: true, widths: [14, '*', 62, 58, 46, 50], body: [[
                    { text: '#', style: 'th' }, { text: 'Ενέργεια', style: 'th' }, { text: 'Κατηγορία', style: 'th' }, { text: 'Υπεύθυνος', style: 'th' }, { text: 'Στόχος', style: 'th' }, { text: 'Κατάσταση', style: 'th' }
                ]].concat(plan.map(function (q, i) {
                    var isGap = score(a[q.id]) < 2, st = lvStyle(a[q.id]);
                    return [
                        { text: String(i + 1), fontSize: 8.5, color: C.muted },
                        { stack: [{ text: isGap ? q.enforced : 'Τεκμήριο: ' + q.evidence, fontSize: 8.5 }, { text: (isGap ? LV[a[q.id]] : 'Χωρίς τεκμήριο') + (q.priority === 'high' && isGap ? ' · υψηλή προτεραιότητα' : ''), fontSize: 7.5, color: st.c, bold: true, margin: [0, 2, 0, 0] }] },
                        { text: PIL[q.pillar], fontSize: 8, color: C.muted },
                        { text: '' }, { text: '' }, { text: '' }
                    ];
                })) },
                layout: 'rcTable'
            });
        }

        // ---------- Μεθοδολογία και όροι ----------
        content.push(h1('Μεθοδολογία και όροι χρήσης', true));
        content.push({ text: 'Πώς βγαίνει το αποτέλεσμα', style: 'h3' });
        content.push({ text: 'Κάθε απάντηση παίρνει από 0 έως 3 βαθμούς: «Δεν υπάρχει» 0, «Μερικώς» 1, «Επιβάλλεται» 2, «Επιβάλλεται και έχω τεκμήριο» 3. Το «Δεν ξέρω» μετράει 0, γιατί ό,τι δεν ξέρεις δεν μπορείς να το αποδείξεις. Το ποσοστό είναι το άθροισμα προς το μέγιστο δυνατό. Στην κάλυψη ανά απαίτηση, κάθε απαίτηση παίρνει το χαμηλότερο επίπεδο από τις ερωτήσεις που την αφορούν.', style: 'body' });
        content.push({ text: 'Τι δεν καλύπτει', style: 'h3' });
        content.push({ text: 'Το εργαλείο δεν συνδέεται στο tenant και δεν ελέγχει τις ρυθμίσεις: το αποτέλεσμα βασίζεται μόνο στις απαντήσεις που δόθηκαν. Οι ερωτήσεις καλύπτουν τεχνικά μέτρα στο Microsoft 365. Πολιτικές, ρόλοι, εκτίμηση κινδύνων, συμβάσεις με προμηθευτές, φυσική ασφάλεια, συστήματα OT και δοκιμές επιχειρησιακής συνέχειας ελέγχονται ξεχωριστά. Δεν είναι ελεγκτική γνώμη ούτε νομική συμβουλή. Μια ρύθμιση υποστηρίζει μια απαίτηση, δεν αποδεικνύει από μόνη της συμμόρφωση.', style: 'body' });
        content.push({ text: 'Πνευματικά δικαιώματα και όροι χρήσης', style: 'h3' });
        var terms = [
            ['Δικαιούχος', '© ' + today.getFullYear() + ' Δημοσθένης Αττέια, thecybersec.gr. Με επιφύλαξη παντός δικαιώματος.'],
            ['Τι προστατεύεται', 'Οι ερωτήσεις, οι περιγραφές, η αντιστοίχιση με ρυθμίσεις της Microsoft και με τις απαιτήσεις των πλαισίων, και η δομή της αναφοράς είναι πρωτότυπο έργο του συντάκτη και προστατεύονται από τον ν. 2121/1993. Τα κείμενα της ΚΥΑ 1689/2025, της Οδηγίας (ΕΕ) 2022/2555 και του Κανονισμού (ΕΕ) 2016/679 είναι δημόσια έγγραφα και δεν αποτελούν αντικείμενο αυτής της προστασίας.'],
            ['Τι επιτρέπεται', 'Η χρήση της αναφοράς για τις εσωτερικές ανάγκες του οργανισμού σας, καθώς και η επίδειξή της σε ελεγκτές και αρμόδιες αρχές στο πλαίσιο ελέγχου.'],
            ['Τι απαγορεύεται χωρίς γραπτή άδεια', 'Η αναδημοσίευση, η αναδιανομή και η ανάρτηση της αναφοράς ή τμήματός της σε ιστότοπους, πλατφόρμες ή μέσα κοινωνικής δικτύωσης. Η εμπορική εκμετάλλευση, μαζί με την ενσωμάτωσή της σε προϊόντα, υπηρεσίες, εκπαιδευτικό υλικό ή παραδοτέα προς τρίτους. Η αφαίρεση ή η αλλοίωση της αναφοράς στον συντάκτη και στην πηγή.'],
            ['Πώς το μοιράζεστε', { text: page, link: page, color: C.blue }],
            ['Επικοινωνία', { text: 'LinkedIn: linkedin.com/in/dimosthenisatteia', link: 'https://www.linkedin.com/in/dimosthenisatteia/', color: C.blue }]
        ];
        content.push({ table: { widths: [120, '*'], body: terms.map(function (t) { return [{ text: t[0], bold: true, fontSize: 8.5, color: C.text }, typeof t[1] === 'string' ? { text: t[1], fontSize: 8.5 } : Object.assign({ fontSize: 8.5 }, t[1])]; }) }, layout: 'rcTable' });

        var doc = {
            pageSize: 'A4',
            pageMargins: [40, 54, 40, 48],
            info: { title: 'Ετοιμότητα Microsoft 365 για έλεγχο', author: 'thecybersec.gr', subject: 'ΚΥΑ 1689/2025, NIS2, ISO/IEC 27001, GDPR', creator: 'thecybersec.gr' },
            header: function (cur) {
                if (cur === 1) return null;
                return { columns: [
                    { text: 'Ετοιμότητα Microsoft 365 για έλεγχο · ' + dstr, fontSize: 7.5, color: C.muted },
                    { text: 'thecybersec.gr', fontSize: 7.5, color: C.blue, alignment: 'right', link: page }
                ], margin: [40, 24, 40, 0] };
            },
            footer: function (cur, total) {
                return { columns: [
                    { text: '© ' + today.getFullYear() + ' Δημοσθένης Αττέια · thecybersec.gr · Ενδεικτικό, όχι ελεγκτική γνώμη', fontSize: 7, color: C.muted },
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
                note: { fontSize: 9, color: C.muted, lineHeight: 1.25 },
                body: { fontSize: 9.5, lineHeight: 1.3 },
                label: { fontSize: 8, color: C.muted }
            }
        };
        var layouts = {
            rcTable: {
                hLineWidth: function (i, node) { return i === 0 || i === node.table.body.length ? 0 : 0.5; },
                vLineWidth: function () { return 0; },
                hLineColor: function () { return C.line; },
                paddingTop: function () { return 4; }, paddingBottom: function () { return 4; },
                paddingLeft: function () { return 6; }, paddingRight: function () { return 6; }
            }
        };
        window.pdfMake.createPdf(doc, layouts).download('etoimotita-microsoft-365-' + today.toISOString().slice(0, 10) + '.pdf');
    };
})();
