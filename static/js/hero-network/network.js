/*
  Ζωντανό φόντο δικτύου πίσω από όλες τις σελίδες: κόμβοι, γραμμές και «σήματα» που ταξιδεύουν από κόμβο σε κόμβο.
  Απλό canvas 2D, χωρίς βιβλιοθήκες. Φορτώνεται από το layouts/partials/header.html.
  - Γαλάζιο σήμα: τηλεμετρία που συσχετίζεται.
  - Πορτοκαλί σήμα: ύποπτη διαδρομή που σταματά σε έναν κόμβο, ο οποίος «απομονώνεται» (πράσινος δακτύλιος).
*/
(function () {
  var canvas = document.querySelector('[data-hero-network]');
  if (!canvas || !canvas.getContext) return;
  var ctx = canvas.getContext('2d');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var C = {
    edge: 'rgba(96,165,250,0.2)',
    node: 'rgba(148,163,184,0.7)',
    hub: 'rgba(96,165,250,0.8)',
    signal: [96, 165, 250],   // τηλεμετρία
    alert: [245, 158, 11],    // ύποπτη διαδρομή
    contain: [16, 185, 129],  // απομόνωση
  };

  var W = 0, H = 0, dpr = 1, nodes = [], edges = [], signals = [], rings = [];
  var seed = 7;
  function rnd() { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; }

  function build() {
    var rect = canvas.getBoundingClientRect();
    W = rect.width; H = rect.height;
    if (!W || !H) return;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // Κόμβοι σε πλέγμα με τυχαία μετατόπιση: ομοιόμορφη κάλυψη χωρίς συστάδες.
    seed = 7; nodes = []; edges = []; signals = []; rings = [];
    var cell = W < 640 ? 92 : 118;
    var cols = Math.ceil(W / cell) + 1, rows = Math.ceil(H / cell) + 1;
    for (var r = 0; r < rows; r++) for (var c = 0; c < cols; c++) {
      if (rnd() < 0.14) continue;
      nodes.push({
        ax: (c + 0.15 + rnd() * 0.7) * cell - cell / 2, ay: (r + 0.15 + rnd() * 0.7) * cell - cell / 2,
        x: 0, y: 0, ph: rnd() * 6.28, sp: 0.15 + rnd() * 0.2, amp: 5 + rnd() * 7,
        hub: rnd() < 0.12, links: [], heat: 0,
      });
    }
    // Κάθε κόμβος ενώνεται με τους 2–3 κοντινότερους.
    nodes.forEach(function (n, i) {
      var near = nodes.map(function (m, j) { return { j: j, d: (m.ax - n.ax) * (m.ax - n.ax) + (m.ay - n.ay) * (m.ay - n.ay) }; })
        .filter(function (o) { return o.j !== i; }).sort(function (a, b) { return a.d - b.d; }).slice(0, n.hub ? 4 : 2 + (rnd() < 0.4 ? 1 : 0));
      near.forEach(function (o) {
        if (o.d > cell * cell * 3.2 || n.links.indexOf(o.j) >= 0) return;
        n.links.push(o.j); nodes[o.j].links.push(i);
        edges.push({ a: i, b: o.j, heat: 0, tone: C.signal });
      });
    });
    place(0);
  }

  function place(t) {
    for (var i = 0; i < nodes.length; i++) {
      var n = nodes[i];
      n.x = n.ax + Math.cos(n.ph + t * n.sp) * n.amp;
      n.y = n.ay + Math.sin(n.ph * 1.3 + t * n.sp * 0.8) * n.amp;
    }
  }

  function edgeBetween(a, b) {
    for (var i = 0; i < edges.length; i++) if ((edges[i].a === a && edges[i].b === b) || (edges[i].a === b && edges[i].b === a)) return edges[i];
    return null;
  }

  function spawn(forceAlert) {
    if (!nodes.length) return;
    var start = Math.floor(Math.random() * nodes.length), path = [start], hops = 4 + Math.floor(Math.random() * 4);
    for (var h = 0; h < hops; h++) {
      var cur = nodes[path[path.length - 1]];
      var opts = cur.links.filter(function (j) { return path.indexOf(j) < 0; });
      if (!opts.length) break;
      path.push(opts[Math.floor(Math.random() * opts.length)]);
    }
    if (path.length < 3) return;
    var alert = forceAlert || Math.random() < 0.28;
    signals.push({ path: path, seg: 0, t: 0, tone: alert ? C.alert : C.signal, alert: alert, speed: alert ? 1.5 : 2.1 });
  }

  function rgba(c, a) { return 'rgba(' + c[0] + ',' + c[1] + ',' + c[2] + ',' + a + ')'; }

  function draw(dt) {
    ctx.clearRect(0, 0, W, H);
    var i, e, n;

    ctx.lineWidth = 1;
    for (i = 0; i < edges.length; i++) {
      e = edges[i];
      var a = nodes[e.a], b = nodes[e.b];
      ctx.strokeStyle = C.edge;
      ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
      if (e.heat > 0.01) {
        ctx.strokeStyle = rgba(e.tone, (e.heat * 0.55).toFixed(3));
        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
        e.heat *= Math.pow(0.35, dt);
      }
    }

    for (i = 0; i < nodes.length; i++) {
      n = nodes[i];
      ctx.fillStyle = n.hub ? C.hub : C.node;
      ctx.beginPath(); ctx.arc(n.x, n.y, n.hub ? 2.6 : 1.6, 0, 6.2832); ctx.fill();
      if (n.hub) { ctx.strokeStyle = 'rgba(96,165,250,0.22)'; ctx.beginPath(); ctx.arc(n.x, n.y, 6.5, 0, 6.2832); ctx.stroke(); }
    }

    for (i = signals.length - 1; i >= 0; i--) {
      var s = signals[i];
      s.t += dt * s.speed;
      while (s.t >= 1 && s.seg < s.path.length - 1) {
        var ed = edgeBetween(s.path[s.seg], s.path[s.seg + 1]);
        if (ed) { ed.heat = 1; ed.tone = s.tone; }
        s.seg++; s.t -= 1;
        rings.push({ n: s.path[s.seg], age: 0, life: 0.9, tone: s.tone, max: 14 });
      }
      if (s.seg >= s.path.length - 1) {
        // Τέλος διαδρομής: η ύποπτη διαδρομή «κόβεται» στον τελευταίο κόμβο.
        if (s.alert) rings.push({ n: s.path[s.seg], age: 0, life: 2.4, tone: C.contain, max: 20, hold: true });
        signals.splice(i, 1);
        continue;
      }
      var p = nodes[s.path[s.seg]], q = nodes[s.path[s.seg + 1]];
      var x = p.x + (q.x - p.x) * s.t, y = p.y + (q.y - p.y) * s.t;
      var tx = p.x + (q.x - p.x) * Math.max(0, s.t - 0.35), ty = p.y + (q.y - p.y) * Math.max(0, s.t - 0.35);
      var g = ctx.createLinearGradient(tx, ty, x, y);
      g.addColorStop(0, rgba(s.tone, 0)); g.addColorStop(1, rgba(s.tone, 0.9));
      ctx.strokeStyle = g; ctx.lineWidth = 1.6;
      ctx.beginPath(); ctx.moveTo(tx, ty); ctx.lineTo(x, y); ctx.stroke();
      ctx.lineWidth = 1;
      ctx.fillStyle = rgba(s.tone, 1);
      ctx.beginPath(); ctx.arc(x, y, 2.2, 0, 6.2832); ctx.fill();
    }

    for (i = rings.length - 1; i >= 0; i--) {
      var r = rings[i];
      r.age += dt;
      var k = r.age / r.life;
      if (k >= 1) { rings.splice(i, 1); continue; }
      n = nodes[r.n];
      var rad = r.hold ? 7 + Math.min(1, k * 4) * (r.max - 7) * 0.5 : 3 + k * r.max;
      var alpha = r.hold ? (k < 0.7 ? 0.85 : 0.85 * (1 - (k - 0.7) / 0.3)) : 0.7 * (1 - k);
      ctx.strokeStyle = rgba(r.tone, alpha.toFixed(3));
      ctx.lineWidth = r.hold ? 1.5 : 1;
      ctx.beginPath(); ctx.arc(n.x, n.y, rad, 0, 6.2832); ctx.stroke();
      ctx.lineWidth = 1;
      if (r.hold) { ctx.fillStyle = rgba(r.tone, alpha.toFixed(3)); ctx.beginPath(); ctx.arc(n.x, n.y, 2.6, 0, 6.2832); ctx.fill(); }
    }
  }

  var last = 0, time = 0, nextSpawn = 0.6, visible = true, raf = 0;
  function frame(now) {
    raf = 0;
    var dt = Math.min((now - last) / 1000 || 0, 0.05);
    last = now; time += dt;
    place(time);
    nextSpawn -= dt;
    if (nextSpawn <= 0 && signals.length < (W < 640 ? 2 : 4)) { spawn(); nextSpawn = 0.9 + Math.random() * 1.3; }
    draw(dt);
    schedule();
  }
  function schedule() { if (!raf && visible && !document.hidden && !reduce) raf = requestAnimationFrame(frame); }

  function still() {
    // «Μειωμένη κίνηση»: ένα στατικό στιγμιότυπο με δύο φωτισμένες διαδρομές.
    build(); if (!nodes.length) return;
    for (var k = 0; k < 2; k++) {
      spawn(k === 1);
      var s = signals.pop(); if (!s) continue;
      for (var j = 0; j < s.path.length - 1; j++) { var ed = edgeBetween(s.path[j], s.path[j + 1]); if (ed) { ed.heat = 1; ed.tone = s.tone; } }
      if (s.alert) rings.push({ n: s.path[s.path.length - 1], age: 0.6, life: 2.4, tone: C.contain, max: 20, hold: true });
    }
    draw(0);
  }

  var resizeTimer = 0;
  new ResizeObserver(function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () { if (reduce) still(); else { build(); schedule(); } }, 120);
  }).observe(canvas);
  new IntersectionObserver(function (en) { visible = en[0].isIntersecting; last = performance.now(); schedule(); }).observe(canvas);
  document.addEventListener('visibilitychange', function () { last = performance.now(); schedule(); });

  if (reduce) still(); else { build(); last = performance.now(); schedule(); }
})();
