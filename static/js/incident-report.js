/* Οδηγός αναφοράς περιστατικού στην ΕΑΚ · thecybersec.gr
 * Συμπληρώνει τα επίσημα πρότυπα της Εθνικής Αρχής Κυβερνοασφάλειας (έκδοση 260706)
 * μέσα στον browser: «Φόρμα Αναφοράς 24ωρών» (EakForm24) και «Φόρμα Αναφοράς 72ωρών
 * & Τελικής Έκθεσης» (EakForm72). Κανένα στοιχείο δεν αποστέλλεται πουθενά.
 *
 * Γράφει κείμενο στα κελιά της στήλης B και αλλάζει την κατάσταση των
 * checkboxes και radio buttons της φόρμας (xl/ctrlProps και vmlDrawing1.vml).
 * Κάθε ομάδα επιλογών ορίζεται ρητά, ώστε να σβήνουν οι προεπιλογές του
 * προτύπου (π.χ. «Ολοκληρωμένο», «ΟΧΙ» στην υποστήριξη CSIRT).
 *
 * Χρειάζεται JSZip (window.JSZip ή require('jszip') σε Node για δοκιμές).
 */
(function (root) {
    'use strict';

    // Ομάδες επιλογών του προτύπου 24 ωρών: [κλειδί, ctrlProp, VML shape id]
    var CONTROLS = {
        rootCause: { row: 20, multi: true, opts: [['malicious', 48, 1230], ['malfunction', 49, 1231], ['human', 50, 1232], ['natural', 51, 1233], ['unknown', 52, 1234]] },
        status: { row: 23, multi: false, opts: [['ongoing', 33, 1175], ['completed', 34, 1176]] },
        recurring: { row: 23, multi: true, opts: [['yes', 4, 1128]] },
        cia: { row: 27, multi: true, opts: [['c', 5, 1133], ['i', 6, 1134], ['a', 7, 1135]] },
        dataTypes: { row: 28, multi: true, opts: [['public', 8, 1137], ['personal', 9, 1138], ['sensitive', 10, 1139], ['classified', 11, 1140], ['unknown', 12, 1141]] },
        sectors: { row: 29, multi: true, opts: [['energy', 13, 1147], ['transport', 14, 1148], ['banking', 15, 1150], ['fmi', 16, 1151], ['health', 17, 1152], ['water', 18, 1153], ['wastewater', 19, 1154], ['digital', 20, 1155], ['ictb2b', 21, 1156], ['publicadmin', 22, 1157], ['space', 23, 1158], ['postal', 24, 1159], ['waste', 25, 1160], ['chemicals', 26, 1161], ['food', 27, 1163], ['manufacturing', 28, 1164], ['digitalproviders', 29, 1165], ['research', 30, 1166], ['unknown', 31, 1167]] },
        crossBorder: { row: 32, multi: false, opts: [['yes', 36, 1193], ['no', 37, 1194], ['unknown', 38, 1195]] },
        bcp: { row: 36, multi: false, opts: [['yes', 40, 1201], ['no', 41, 1202]] },
        drp: { row: 37, multi: false, opts: [['yes', 43, 1205], ['no', 44, 1206]] },
        authorities: { row: 39, multi: true, opts: [['nationalcert', 62, 1254], ['elcsirt', 57, 1249], ['cybercrime', 54, 1246], ['dpa', 55, 1247], ['adae', 53, 1245], ['bog', 58, 1250], ['hcmc', 61, 1253], ['cyberdefence', 59, 1251], ['caa', 60, 1252], ['other', 56, 1248]] },
        stakeholders: { row: 40, multi: true, opts: [['users', 1, 1113], ['public', 2, 1114], ['crossborder', 3, 1115]] },
        csirt: { row: 41, multi: false, opts: [['yes', 46, 1213], ['no', 47, 1214]] }
    };

    // Κελιά κειμένου (στήλη B). Οι τιμές των λιστών πρέπει να είναι ακριβώς
    // όπως στο κρυφό φύλλο REFS του προτύπου, μαζί με κενά και ορθογραφία.
    var CELLS = ['B3', 'B4', 'B6', 'B7', 'B8', 'B9', 'B10', 'B11', 'B12', 'B13', 'B14', 'B15', 'B16',
        'B18', 'B19', 'B21', 'B22', 'B24', 'B25', 'B30', 'B31', 'B33', 'B34', 'B38'];

    var LISTS = {
        B4: ['Αρχική 24ωρη Υποχρεωτική', "Εθελοντική Παρ'ολίγον Περιστατικό/ Near Miss", 'Εθελοντική Κυβερνοαπειλή/ Cyber Threat'],
        B6: ['Εντός NIS2 ', 'Εκτός NIS2', 'Δεν γνωρίζω'],
        B7: ['Βασική (Essential)', 'Σημαντική (Important)', 'Δεν γνωρίζω (Unknown)'],
        B8: ['Ενέργεια', 'Μεταφορές', 'Τράπεζες', 'Υποδομές χρηματοπιστωτικών αγορών', 'Υγεία', 'Πόσιμο νερό', 'Λύματα', 'Ψηφιακές Υποδομές', 'Διαχείριση Υπηρεσιών ΤΠΕ (μεταξύ επιχειρήσεων)', 'Δημόσια Διοίκηση ', 'Διάστημα', 'Ταχυδρομικές υπηρεσίες και υπηρεσίες ταχυμεταφορών', 'Διαχείριση αποβλήτων', 'Παρασκευή, παραγωγή και διανομή χημικών προϊόντων', 'Παραγωγή, μεταποίηση και διανομή τροφίμων', 'Κατασκευαστικός τομέας', 'Ψηφιακοί πάροχοι', 'Έρευνα', 'Άλλο'],
        B21: ['Dos/DDoS', 'Ransomware', 'Phishing/Social Engineering', 'Vulnerability Exploitation', 'System/Account Compromise', 'Web Application Attacks', 'Data breach/leak', 'Loss/Disruption of Infrastructure', 'Intrusion Attempt', 'Malicious Code', 'Supply Chain/ Third Party Failure', 'Άλλο'],
        B30: ['Επηρεάστηκε σε μεγάλο βαθμό', 'Επηρεάστηκε μερικώς', 'Δεν επηρεάστηκε', 'Άγωστο'],
        B31: ['Επηρεάστηκε σε μεγάλο βαθμό', 'Επηρεάστηκε μερικώς', 'Δεν επηρεάστηκε', 'Άγωστο']
    };

    // ── Φόρμα 72 ωρών και τελικής έκθεσης: ίδια λογική, άλλα κελιά (μετατοπισμένα κατά μία γραμμή) και περισσότερα στοιχεία ελέγχου.
    // Τα ctrlProp και τα VML shape ids βγήκαν από το xl/worksheets/sheet1.xml (<controls>) και το vmlDrawing1.vml του προτύπου.
    var CONTROLS72 = {
        rootCause: { row: 21, multi: true, opts: [['malicious', 73, 12521], ['malfunction', 74, 12522], ['human', 75, 12523], ['natural', 76, 12524], ['unknown', 77, 12525]] },
        status: { row: 24, multi: false, opts: [['ongoing', 71, 12508], ['completed', 72, 12509]] },
        recurring: { row: 24, multi: true, opts: [['yes', 69, 12506]] },
        cia: { row: 28, multi: true, opts: [['c', 1, 12382], ['i', 2, 12383], ['a', 3, 12384]] },
        dataTypes: { row: 29, multi: true, opts: [['public', 4, 12385], ['personal', 5, 12386], ['sensitive', 6, 12387], ['classified', 7, 12388], ['unknown', 8, 12389]] },
        sectors: { row: 30, multi: true, opts: [['energy', 9, 12390], ['transport', 10, 12391], ['banking', 11, 12392], ['fmi', 12, 12393], ['health', 13, 12394], ['water', 14, 12395], ['wastewater', 15, 12396], ['digital', 16, 12397], ['ictb2b', 17, 12398], ['publicadmin', 18, 12399], ['space', 19, 12400], ['postal', 20, 12401], ['waste', 21, 12402], ['chemicals', 22, 12403], ['food', 23, 12404], ['manufacturing', 24, 12405], ['digitalproviders', 25, 12406], ['research', 26, 12407], ['unknown', 27, 12408]] },
        crossBorder: { row: 34, multi: false, opts: [['yes', 66, 12503], ['no', 67, 12504], ['unknown', 68, 12505]] },
        impactType: { row: 37, multi: true, opts: [['resources', 28, 12410], ['users', 29, 12418], ['reputation', 30, 12419], ['health', 31, 12420], ['financial', 32, 12421], ['material', 33, 12422], ['geo', 34, 12423]] },
        resources: { row: 38, multi: true, opts: [['atm', 42, 12466], ['backuppower', 43, 12468], ['physsec', 44, 12469], ['mailbox', 45, 12471], ['mobilebase', 46, 12472], ['servers', 47, 12473], ['submarine', 48, 12474], ['switches', 49, 12475], ['underground', 50, 12476], ['website', 51, 12477], ['industrial', 52, 12485], ['application', 53, 12486], ['workstations', 54, 12490], ['other', 55, 12491]] },
        bcp: { row: 51, multi: false, opts: [['yes', 60, 12497], ['no', 61, 12498]] },
        drp: { row: 52, multi: false, opts: [['yes', 63, 12500], ['no', 64, 12501]] },
        authorities: { row: 57, multi: true, opts: [['nationalcert', 83, 12533], ['elcsirt', 78, 12527], ['cybercrime', 39, 12455], ['dpa', 40, 12456], ['adae', 38, 12454], ['bog', 79, 12528], ['hcmc', 82, 12532], ['cyberdefence', 80, 12530], ['caa', 81, 12531], ['other', 41, 12457]] },
        stakeholders: { row: 58, multi: true, opts: [['users', 35, 12450], ['public', 36, 12451], ['crossborder', 37, 12452]] },
        csirt: { row: 59, multi: false, opts: [['yes', 57, 12494], ['no', 58, 12495]] }
    };
    // Το πρότυπο έχει ενδεικτικό κείμενο («16/9/2025 και ώρα 2:30 μμ») στα B19, B20 και B53. Γράφονται πάντα, ώστε να σβήνει.
    var CELLS72 = ['B4', 'B5', 'B7', 'B8', 'B9', 'B10', 'B11', 'B12', 'B13', 'B14', 'B15', 'B16', 'B17',
        'B19', 'B20', 'B22', 'B23', 'B24', 'B25', 'B26', 'B31', 'B32', 'B33', 'B35', 'B36',
        'B39', 'B40', 'B41', 'B42', 'B43', 'B44', 'B45', 'B46', 'B47', 'B48', 'B49', 'B53', 'B54', 'B55', 'B56'];
    var LISTS72 = {
        B5: ['Αναφορά 72 ωρών', 'Ενδιάμεση Αναφορά κατόπιν αιτήματος της ΕΑΚ', 'Τελική Μηνιαία Αναφορά', 'Εθελοντική Αναφορά Περιστατικού'],
        B7: LISTS.B6, B8: LISTS.B7, B9: LISTS.B8, B22: LISTS.B21, B32: LISTS.B30, B33: LISTS.B31,
        B46: ['Χωρίς αντίκτυπο', 'Μικρό αντίκτυπο', 'Μεγάλο αντίκτυπο', 'Πολύ μεγάλο αντίκτυπο'],
        B47: ['Χωρίς αντίκτυπο', 'Μικρό αντίκτυπο', 'Μεγάλο αντίκτυπο', 'Πολύ μεγάλο αντίκτυπο']
    };

    function xmlEsc(s) {
        return String(s == null ? '' : s)
            .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '')
            .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    function setCell(xml, ref, value) {
        var re = new RegExp('<c r="' + ref + '"((?:\\s+[a-zA-Z:]+="[^"]*")*)\\s*(?:/>|>[\\s\\S]*?</c>)');
        var m = xml.match(re);
        if (!m) throw new Error('Το κελί ' + ref + ' δεν βρέθηκε στο πρότυπο.');
        var s = (m[1].match(/\ss="\d+"/) || [''])[0];
        var cell = value === '' || value == null
            ? '<c r="' + ref + '"' + s + '/>'
            : '<c r="' + ref + '"' + s + ' t="inlineStr"><is><t xml:space="preserve">' + xmlEsc(value) + '</t></is></c>';
        return xml.replace(re, cell);
    }

    function setCtrlProp(xml, on) {
        xml = xml.replace(/\s+checked="[^"]*"/, '');
        return on ? xml.replace(/(objectType="[^"]*")/, '$1 checked="Checked"') : xml;
    }

    function setVmlShape(vml, shapeId, on) {
        var start = vml.indexOf('id="_x0000_s' + shapeId + '"');
        if (start < 0) throw new Error('Το στοιχείο ελέγχου ' + shapeId + ' δεν βρέθηκε στο πρότυπο.');
        var end = vml.indexOf('</x:ClientData>', start);
        var head = vml.slice(0, start), body = vml.slice(start, end), tail = vml.slice(end);
        body = body.replace(/\s*<x:Checked>[^<]*<\/x:Checked>/g, '');
        if (on) body = body.replace(/\s*$/, '\n   <x:Checked>1</x:Checked>\n  ');
        return head + body + tail;
    }

    /**
     * data.cells: { B3: '24/10/2026', ... }
     * data.controls: { rootCause: ['malicious'], status: ['ongoing'], ... }
     * Επιστρέφει Promise με Blob (browser) ή Uint8Array (Node).
     */
    function fillWith(spec, JSZip, template, data) {
        var CELLS = spec.CELLS, LISTS = spec.LISTS, CONTROLS = spec.CONTROLS;
        return JSZip.loadAsync(template).then(function (zip) {
            var sheetPath = 'xl/worksheets/sheet1.xml', vmlPath = 'xl/drawings/vmlDrawing1.vml';
            return Promise.all([zip.file(sheetPath).async('string'), zip.file(vmlPath).async('string')]).then(function (r) {
                var sheet = r[0], vml = r[1];
                CELLS.forEach(function (ref) {
                    var v = data.cells && Object.prototype.hasOwnProperty.call(data.cells, ref) ? data.cells[ref] : '';
                    if (LISTS[ref] && v && LISTS[ref].indexOf(v) < 0) throw new Error('Μη έγκυρη τιμή για το ' + ref + ': ' + v);
                    sheet = setCell(sheet, ref, v);
                });
                var jobs = [];
                Object.keys(CONTROLS).forEach(function (g) {
                    var picked = (data.controls && data.controls[g]) || [];
                    CONTROLS[g].opts.forEach(function (o) {
                        var on = picked.indexOf(o[0]) >= 0;
                        vml = setVmlShape(vml, o[2], on);
                        var p = 'xl/ctrlProps/ctrlProp' + o[1] + '.xml';
                        jobs.push(zip.file(p).async('string').then(function (x) { zip.file(p, setCtrlProp(x, on)); }));
                    });
                });
                zip.file(sheetPath, sheet);
                zip.file(vmlPath, vml);
                return Promise.all(jobs).then(function () {
                    var type = typeof Blob !== 'undefined' && typeof window !== 'undefined' ? 'blob' : 'uint8array';
                    return zip.generateAsync({ type: type, compression: 'DEFLATE', mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
                });
            });
        });
    }

    var api = { CONTROLS: CONTROLS, CELLS: CELLS, LISTS: LISTS };
    api.fill = function (JSZip, template, data) { return fillWith(api, JSZip, template, data); };
    var api72 = { CONTROLS: CONTROLS72, CELLS: CELLS72, LISTS: LISTS72 };
    api72.fill = function (JSZip, template, data) { return fillWith(api72, JSZip, template, data); };
    if (typeof module !== 'undefined' && module.exports) module.exports = { EakForm24: api, EakForm72: api72 };
    else { root.EakForm24 = api; root.EakForm72 = api72; }
})(typeof window !== 'undefined' ? window : this);
