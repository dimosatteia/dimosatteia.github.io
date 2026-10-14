// Ζωντανή αναζήτηση στο πεδίο του header: αποτελέσματα σε μικρό πλαίσιο καθώς πληκτρολογείς.
// Διαβάζει το ίδιο /index.json με τη σελίδα /search/. Το index φορτώνεται μόνο την πρώτη φορά που
// θα πατήσεις μέσα στο πεδίο, ώστε να μη βαραίνει τη φόρτωση κάθε σελίδας.
// Το Enter (χωρίς επιλεγμένο αποτέλεσμα) συνεχίζει να ανοίγει τη σελίδα /search/ με όλα τα αποτελέσματα.
(function () {
    var MAX = 6, MIN_CHARS = 2;
    var dataPromise = null;

    function loadIndex() {
        if (!dataPromise) {
            dataPromise = fetch('/index.json').then(function (r) { return r.json(); }).catch(function () { dataPromise = null; return []; });
        }
        return dataPromise;
    }

    function esc(s) {
        return String(s || '').replace(/[&<>"']/g, function (c) {
            return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
        });
    }

    function mark(text, term) {
        var safe = esc(text), t = esc(term);
        var i = safe.toLowerCase().indexOf(t.toLowerCase());
        if (i < 0) return safe;
        return safe.slice(0, i) + '<mark class="bg-blue-500/30 text-white rounded px-0.5">' + safe.slice(i, i + t.length) + '</mark>' + safe.slice(i + t.length);
    }

    // Μικρό απόσπασμα γύρω από το σημείο όπου βρέθηκε ο όρος
    function snippet(item, term) {
        var src = item.summary || '';
        var i = src.toLowerCase().indexOf(term);
        if (i < 0) {
            src = (item.contents || '').split(' | Tags:')[0];
            i = src.toLowerCase().indexOf(term);
        }
        if (i < 0) return esc(src.slice(0, 110)) + (src.length > 110 ? '…' : '');
        var start = Math.max(0, i - 45), end = Math.min(src.length, i + term.length + 65);
        return (start > 0 ? '…' : '') + mark(src.slice(start, end), term) + (end < src.length ? '…' : '');
    }

    function search(data, query) {
        var term = query.toLowerCase();
        var hits = [];
        data.forEach(function (item) {
            var inTitle = item.title && item.title.toLowerCase().indexOf(term) >= 0;
            var inOther = !inTitle && ((item.summary && item.summary.toLowerCase().indexOf(term) >= 0) ||
                                       (item.contents && item.contents.toLowerCase().indexOf(term) >= 0));
            if (inTitle || inOther) hits.push({ item: item, score: inTitle ? 0 : 1 });
        });
        // Πρώτα όσα έχουν τον όρο στον τίτλο, μετά τα πιο πρόσφατα
        hits.sort(function (a, b) {
            return a.score - b.score || String(b.item.date).localeCompare(String(a.item.date));
        });
        return hits.map(function (h) { return h.item; });
    }

    function attach(input) {
        var form = input.form;
        var box = document.createElement('div');
        box.className = 'live-search-box hidden absolute ' + (form.classList.contains('sm:hidden') ? 'left-4' : 'right-0') + ' top-full mt-2 w-[min(28rem,calc(100vw-2rem))] max-h-[70vh] overflow-y-auto rounded-lg border border-slate-700 bg-slate-950/95 backdrop-blur-md shadow-2xl z-[60] text-left';
        box.setAttribute('role', 'listbox');
        form.classList.add('relative');
        form.appendChild(box);
        input.setAttribute('aria-autocomplete', 'list');
        input.setAttribute('aria-expanded', 'false');

        var active = -1, timer = null;

        function links() { return box.querySelectorAll('a[data-hit]'); }
        function close() { box.classList.add('hidden'); input.setAttribute('aria-expanded', 'false'); active = -1; }
        function open() { box.classList.remove('hidden'); input.setAttribute('aria-expanded', 'true'); }
        function highlight(n) {
            var l = links();
            l.forEach(function (a, i) { a.classList.toggle('bg-slate-800', i === n); });
            active = n;
            if (l[n]) l[n].scrollIntoView({ block: 'nearest' });
        }

        function render(query) {
            var q = query.trim();
            if (q.length < MIN_CHARS) { close(); return; }
            loadIndex().then(function (data) {
                if (input.value.trim() !== q) return;
                var hits = search(data, q.toLowerCase());
                var all = '/search/?q=' + encodeURIComponent(q);
                if (!hits.length) {
                    box.innerHTML = '<p class="px-4 py-3 text-sm text-slate-400">Δεν βρέθηκαν αποτελέσματα για «' + esc(q) + '».</p>';
                } else {
                    box.innerHTML = hits.slice(0, MAX).map(function (it) {
                        return '<a data-hit role="option" href="' + esc(it.permalink) + '" class="block px-4 py-3 border-b border-slate-800 hover:bg-slate-800 no-underline">' +
                            '<span class="block text-[11px] font-mono text-slate-500 mb-0.5">' + esc(it.date) + '</span>' +
                            '<span class="block text-sm font-semibold text-slate-100 leading-snug">' + mark(it.title, q) + '</span>' +
                            '<span class="block text-xs text-slate-400 leading-relaxed mt-1">' + snippet(it, q.toLowerCase()) + '</span>' +
                            '</a>';
                    }).join('') +
                    '<a href="' + all + '" class="block px-4 py-2.5 text-xs font-medium text-blue-400 hover:text-blue-300 hover:bg-slate-900 no-underline">' +
                    (hits.length > MAX ? 'Όλα τα αποτελέσματα (' + hits.length + ') →' : 'Άνοιγμα στη σελίδα αναζήτησης →') + '</a>';
                }
                active = -1;
                open();
            });
        }

        input.addEventListener('focus', function () { loadIndex(); if (input.value.trim().length >= MIN_CHARS) render(input.value); });
        input.addEventListener('input', function () {
            clearTimeout(timer);
            timer = setTimeout(function () { render(input.value); }, 120);
        });
        input.addEventListener('keydown', function (e) {
            var l = links();
            if (e.key === 'ArrowDown' && l.length) { e.preventDefault(); open(); highlight((active + 1) % l.length); }
            else if (e.key === 'ArrowUp' && l.length) { e.preventDefault(); highlight(active <= 0 ? l.length - 1 : active - 1); }
            else if (e.key === 'Enter' && active >= 0 && l[active]) { e.preventDefault(); window.location.href = l[active].href; }
            else if (e.key === 'Escape') { close(); }
        });
        document.addEventListener('click', function (e) { if (!form.contains(e.target)) close(); });
    }

    function init() {
        document.querySelectorAll('form[action$="/search/"] input[name="q"]').forEach(attach);
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
