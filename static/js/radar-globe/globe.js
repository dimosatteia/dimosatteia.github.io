/*
  3D υδρόγειος για το widget του Cloudflare Radar (/cloudflare-radar/).
  Τόξα από τις χώρες προέλευσης προς την Ελλάδα, με πάχος και αριθμό «πακέτων» ανάλογα με το ποσοστό.
  Σημεία ξηράς: land.json (Natural Earth, public domain, μέσω world-atlas 2.0.2).
  Το Three.js σερβίρεται από το ίδιο το site (js/hero3d/three.module.min.js), όχι από CDN.
  Φορτώνεται από το layouts/partials/radar-map.html μόνο όταν υπάρχει WebGL και η υδρόγειος φτάσει στην οθόνη.
  Αν κάτι αποτύχει, μένει ο 2D χάρτης SVG.
*/
import * as THREE from '../hero3d/three.module.min.js';

const R = 1;
const DEG = Math.PI / 180;
const C = {
  land: new THREE.Color('#4f74b8'),
  greece: new THREE.Color('#60a5fa'),
  origin: new THREE.Color('#f87171'),
  ocean: new THREE.Color('#0d1730'),
};

function vec(lat, lon, r = R) {
  const la = lat * DEG, lo = lon * DEG;
  return new THREE.Vector3(Math.cos(la) * Math.sin(lo) * r, Math.sin(la) * r, Math.cos(la) * Math.cos(lo) * r);
}

function fmtPct(v) {
  try { return v.toLocaleString('el-GR', { minimumFractionDigits: 1, maximumFractionDigits: 1 }); } catch (e) { return String(v); }
}

// Καμπύλη μεγάλου κύκλου, ανυψωμένη ανάλογα με την απόσταση.
function arcPoints(a, b, n = 72) {
  const angle = a.angleTo(b);
  const lift = 0.06 + 0.32 * (angle / Math.PI);
  const pts = [];
  const qa = new THREE.Quaternion();
  const axis = new THREE.Vector3().crossVectors(a, b).normalize();
  for (let i = 0; i <= n; i++) {
    const t = i / n;
    qa.setFromAxisAngle(axis, angle * t);
    const p = a.clone().normalize().applyQuaternion(qa);
    p.multiplyScalar(R + 0.004 + lift * Math.sin(Math.PI * t));
    pts.push(p);
  }
  return new THREE.CatmullRomCurve3(pts);
}

function glowTexture(inner = 'rgba(255,255,255,1)') {
  const c = document.createElement('canvas');
  c.width = c.height = 64;
  const g = c.getContext('2d');
  const grad = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  grad.addColorStop(0, inner);
  grad.addColorStop(0.25, 'rgba(255,255,255,0.55)');
  grad.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = grad;
  g.fillRect(0, 0, 64, 64);
  return new THREE.CanvasTexture(c);
}

export async function init(stage, origins, opts = {}) {
  const land = await fetch(opts.landUrl, { credentials: 'same-origin' }).then(r => { if (!r.ok) throw new Error('land'); return r.json(); });
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  const canvas = renderer.domElement;
  canvas.className = 'rg-canvas';
  canvas.setAttribute('aria-hidden', 'true');
  stage.appendChild(canvas);

  const labelsEl = document.createElement('div');
  labelsEl.className = 'rg-labels';
  labelsEl.setAttribute('aria-hidden', 'true');
  stage.appendChild(labelsEl);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 50);
  camera.position.set(0, 0, 4.1);

  const globe = new THREE.Group();
  scene.add(globe);

  // Ωκεανός: αδιαφανής σφαίρα που κρύβει την πίσω πλευρά.
  globe.add(new THREE.Mesh(new THREE.SphereGeometry(R * 0.995, 64, 48), new THREE.MeshBasicMaterial({ color: C.ocean })));

  // Ατμόσφαιρα: λεπτή λάμψη γύρω από το περίγραμμα (sprite πίσω από τη σφαίρα).
  const halo = document.createElement('canvas');
  halo.width = halo.height = 256;
  const hg = halo.getContext('2d');
  const hgr = hg.createRadialGradient(128, 128, 0, 128, 128, 128);
  hgr.addColorStop(0, 'rgba(59,130,246,0)');
  hgr.addColorStop(0.7, 'rgba(59,130,246,0)');
  hgr.addColorStop(0.752, 'rgba(96,165,250,0.42)');
  hgr.addColorStop(0.81, 'rgba(59,130,246,0.12)');
  hgr.addColorStop(1, 'rgba(59,130,246,0)');
  hg.fillStyle = hgr;
  hg.fillRect(0, 0, 256, 256);
  const atmo = new THREE.Sprite(new THREE.SpriteMaterial({ map: new THREE.CanvasTexture(halo), transparent: true, depthWrite: false }));
  atmo.scale.setScalar(2.72);
  scene.add(atmo);

  // Σημεία ξηράς, με χρώμα ανά χώρα.
  const originCodes = new Set(origins.map(o => o.code));
  const grIdx = land.codes.indexOf('GR');
  const n = land.dots.length / 3;
  const pos = new Float32Array(n * 3), col = new Float32Array(n * 3), size = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const v = vec(land.dots[i * 3], land.dots[i * 3 + 1], R * 1.001);
    pos.set([v.x, v.y, v.z], i * 3);
    const code = land.codes[land.dots[i * 3 + 2]];
    const c = code === 'GR' ? C.greece : originCodes.has(code) ? C.origin : C.land;
    col.set([c.r, c.g, c.b], i * 3);
    size[i] = code === 'GR' || originCodes.has(code) ? 1.35 : 1.0;
  }
  const dotGeo = new THREE.BufferGeometry();
  dotGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  dotGeo.setAttribute('color', new THREE.BufferAttribute(col, 3));
  dotGeo.setAttribute('size', new THREE.BufferAttribute(size, 1));
  const dotMat = new THREE.ShaderMaterial({
    transparent: true,
    uniforms: { scale: { value: 1 } },
    vertexShader: 'attribute float size; attribute vec3 color; varying vec3 vC; uniform float scale; void main(){ vC = color; vec4 mv = modelViewMatrix*vec4(position,1.0); gl_PointSize = size*scale/(-mv.z); gl_Position = projectionMatrix*mv; }',
    fragmentShader: 'varying vec3 vC; void main(){ float d = length(gl_PointCoord-0.5); if(d>0.5) discard; gl_FragColor = vec4(vC, 1.0 - smoothstep(0.3, 0.5, d)); }',
  });
  globe.add(new THREE.Points(dotGeo, dotMat));

  // Περίγραμμα Ελλάδας.
  const lineMat = new THREE.LineBasicMaterial({ color: '#93c5fd', transparent: true, opacity: 0.9 });
  for (const ring of land.greece) {
    const pts = [];
    for (let i = 0; i < ring.length; i += 2) pts.push(vec(ring[i], ring[i + 1], R * 1.003));
    globe.add(new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(pts), lineMat));
  }

  // Στόχος: Ελλάδα, με παλμό.
  const grLL = land.centroids.GR || [39.07, 22];
  const target = vec(grLL[0], grLL[1]);
  const glowTex = glowTexture();
  function surfaceRing(at, color, r0, r1, opacity) {
    const m = new THREE.Mesh(
      new THREE.RingGeometry(r0, r1, 48),
      new THREE.MeshBasicMaterial({ color, transparent: true, opacity, side: THREE.DoubleSide, depthWrite: false })
    );
    m.position.copy(at.clone().multiplyScalar(1.004));
    m.lookAt(at.clone().multiplyScalar(2));
    globe.add(m);
    return m;
  }
  const pulses = [0, 0.5].map(ph => ({ ph, m: surfaceRing(target, '#60a5fa', 0.9, 1, 0.8) }));
  const tGlow = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTex, color: '#60a5fa', transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }));
  tGlow.position.copy(target.clone().multiplyScalar(1.01));
  tGlow.scale.setScalar(0.1);
  // Δείκτες που μικραίνουν με το zoom, για να μη σκεπάζουν την περιοχή.
  const markers = [{ o: tGlow, s: 0.1 }];
  globe.add(tGlow);

  // Τόξα και «πακέτα».
  const arcMat = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    uniforms: { t: { value: 0 } },
    vertexShader: 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix*modelViewMatrix*vec4(position,1.0); }',
    fragmentShader: [
      'uniform float t; varying vec2 vUv;',
      'void main(){',
      '  vec3 a = vec3(0.973,0.443,0.443); vec3 b = vec3(0.984,0.573,0.235);',
      '  vec3 c = mix(a, b, vUv.x);',
      '  float flow = pow(fract(vUv.x*3.0 - t*0.45), 6.0);',
      '  float alpha = 0.32 + 0.68*flow;',
      '  alpha *= smoothstep(0.0, 0.04, vUv.x);',
      '  gl_FragColor = vec4(c + flow*0.35, alpha);',
      '}',
    ].join('\n'),
  });
  const packetMat = new THREE.SpriteMaterial({ map: glowTex, color: '#fdba74', transparent: true, depthWrite: false, blending: THREE.AdditiveBlending });
  const routes = [];
  origins.forEach((o, i) => {
    const ll = land.centroids[o.code];
    if (!ll) return;
    const src = vec(ll[0], ll[1]);
    const curve = arcPoints(src, target);
    const w = 0.0045 + o.pct * 0.00011;
    globe.add(new THREE.Mesh(new THREE.TubeGeometry(curve, 96, w, 8, false), arcMat));
    const s = surfaceRing(src, '#f87171', 0.45, 1, 0.9);
    s.scale.setScalar(0.022 + o.pct * 0.00018);
    markers.push({ o: s, s: 0.022 + o.pct * 0.00018 });
    const sGlow = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTex, color: '#f87171', transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }));
    sGlow.position.copy(src.clone().multiplyScalar(1.01));
    sGlow.scale.setScalar(0.05 + o.pct * 0.0004);
    markers.push({ o: sGlow, s: 0.05 + o.pct * 0.0004 });
    globe.add(sGlow);
    const packets = [];
    const count = 2 + Math.round(o.pct / 15);
    for (let k = 0; k < count; k++) {
      const sp = new THREE.Sprite(packetMat.clone());
      sp.scale.setScalar(0.035 + o.pct * 0.00025);
      markers.push({ o: sp, s: 0.035 + o.pct * 0.00025 });
      globe.add(sp);
      packets.push({ sp, off: k / count + i * 0.13 });
    }
    const label = document.createElement('span');
    label.className = 'rg-label';
    label.textContent = o.name + ' · ' + fmtPct(o.pct) + '%';
    labelsEl.appendChild(label);
    routes.push({ curve, packets, src, label, speed: 0.16 + 0.1 * (1 - o.pct / 100) });
  });
  const grLabel = document.createElement('span');
  grLabel.className = 'rg-label rg-label-gr';
  grLabel.textContent = 'Ελλάδα';
  labelsEl.appendChild(grLabel);

  // Αρχικός προσανατολισμός: η Ελλάδα μπροστά, λίγο προς την πλευρά των πηγών.
  let mid = target.clone();
  if (routes.length) {
    const acc = new THREE.Vector3();
    // Ίσο βάρος σε κάθε πηγή, ώστε να φαίνονται και οι μικρότερες.
    origins.forEach(o => { const ll = land.centroids[o.code]; if (ll) acc.add(vec(ll[0], ll[1])); });
    if (acc.lengthSq() > 0) mid = target.clone().lerp(acc.normalize(), 0.5).normalize();
  }
  const baseLat = Math.asin(mid.y) / DEG - 6; // λίγο πιο ψηλά για να φαίνεται και ο Βορράς
  const baseLon = Math.atan2(mid.x, mid.z) / DEG;
  // Με το zoom το κέντρο της προβολής πηγαίνει σταδιακά πάνω στην Ελλάδα.
  const grLat = Math.asin(target.y) / DEG, grLon = Math.atan2(target.x, target.z) / DEG;
  globe.rotation.order = 'XYZ';

  // Zoom: 1 = όλη η υδρόγειος, ZMAX = κοντινή ματιά στην περιοχή. Η κάμερα κινείται ομαλά προς τον στόχο.
  const ZMIN = 1, ZMAX = 3.2;
  let zoom = 1, zCur = 1, baseZ = 3.8;
  function setZoom(z) { zoom = Math.max(ZMIN, Math.min(ZMAX, z)); lastMove = performance.now(); wake(); }

  // Αλληλεπίδραση: σύρσιμο για περιστροφή, τσίμπημα (pinch) για zoom.
  // Χωρίς zoom, η υδρόγειος επιστρέφει μόνη της στη βασική θέση μετά από λίγο.
  let offY = 0, offX = 0, velY = 0, velX = 0, dragging = false, lastX = 0, lastY = 0, lastMove = -1e9;
  const pts = new Map();
  let pinchD = 0, pinchZ = 1;
  const dist = () => { const [a, b] = [...pts.values()]; return Math.hypot(a.x - b.x, a.y - b.y); };
  canvas.addEventListener('pointerdown', e => {
    pts.set(e.pointerId, { x: e.clientX, y: e.clientY });
    canvas.setPointerCapture(e.pointerId);
    if (pts.size === 2) { dragging = false; pinchD = dist(); pinchZ = zoom; }
    else { dragging = true; lastX = e.clientX; lastY = e.clientY; stage.classList.add('is-drag'); }
    wake();
  });
  canvas.addEventListener('pointermove', e => {
    if (!pts.has(e.pointerId)) return;
    pts.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pts.size === 2 && pinchD > 0) { setZoom(pinchZ * dist() / pinchD); return; }
    if (!dragging) return;
    // Με zoom η περιστροφή γίνεται πιο αργή, για να μένει το σημείο κάτω από το δάχτυλο.
    const k = 0.006 / zCur;
    velY = (e.clientX - lastX) * k; velX = (e.clientY - lastY) * k;
    offY += velY; offX = Math.max(-1.2, Math.min(1.2, offX + velX));
    lastX = e.clientX; lastY = e.clientY; lastMove = performance.now(); wake();
  });
  const up = e => {
    pts.delete(e.pointerId);
    if (pts.size < 2) pinchD = 0;
    if (pts.size === 1) { const [p] = [...pts.values()]; lastX = p.x; lastY = p.y; dragging = true; return; }
    dragging = false; stage.classList.remove('is-drag'); lastMove = performance.now();
  };
  canvas.addEventListener('pointerup', up);
  canvas.addEventListener('pointercancel', up);
  // Τροχός ποντικιού: zoom μόνο με Ctrl (ή ⌘), ώστε ο απλός τροχός να συνεχίζει να κυλά τη σελίδα.
  canvas.addEventListener('wheel', e => {
    if (!e.ctrlKey && !e.metaKey) return;
    e.preventDefault();
    setZoom(zoom * Math.exp(-e.deltaY * 0.0025));
  }, { passive: false });
  // Διπλό κλικ: zoom στο διπλάσιο, και στο μέγιστο επιστροφή στην αρχική προβολή.
  canvas.addEventListener('dblclick', () => { if (zoom >= ZMAX - 0.01) reset(); else setZoom(zoom * 1.8); });
  function reset() { zoom = 1; velX = velY = 0; lastMove = -1e9; wake(); }

  // Μέγεθος.
  let W = 1, H = 1, dotScale = 1;
  function resize() {
    W = stage.clientWidth || 1; H = stage.clientHeight || 1;
    renderer.setSize(W, H, false);
    camera.aspect = W / H;
    baseZ = W / H < 1.1 ? 4.1 : 3.8;
    camera.position.z = R + (baseZ - R) / zCur;
    camera.updateProjectionMatrix();
    dotScale = H * renderer.getPixelRatio() * 0.029;
    dotMat.uniforms.scale.value = dotScale * Math.pow(camera.position.z / baseZ, 0.6);
    wake();
  }
  new ResizeObserver(resize).observe(stage);

  // Ετικέτες HTML πάνω στον καμβά.
  const tmp = new THREE.Vector3(), camDir = new THREE.Vector3();
  function place(el, p, lift) {
    tmp.copy(p).multiplyScalar(lift).applyMatrix4(globe.matrixWorld);
    camDir.copy(camera.position).sub(tmp).normalize();
    const facing = tmp.clone().normalize().dot(camDir);
    tmp.project(camera);
    const sx = (tmp.x * 0.5 + 0.5) * W;
    el.style.transform = 'translate(' + sx.toFixed(1) + 'px,' + ((-tmp.y * 0.5 + 0.5) * H).toFixed(1) + 'px)';
    // Κοντά στη δεξιά άκρη η ετικέτα γυρίζει αριστερά από το σημείο, για να μην κόβεται.
    if (!el.classList.contains('rg-label-gr')) el.classList.toggle('rg-left', sx > W - el.offsetWidth - 24);
    el.style.opacity = facing > 0.04 ? '1' : '0';
  }

  // Βρόχος: τρέχει μόνο όταν η υδρόγειος φαίνεται.
  let visible = true, raf = 0, t0 = performance.now();
  function frame(now) {
    raf = 0;
    const t = Math.max(0, (now - t0) / 1000);
    if (!dragging) {
      offY += velY; offX += velX; velY *= 0.92; velX *= 0.92;
      if (zoom < 1.02 && now - lastMove > 3500) { offY *= 0.97; offX *= 0.97; }
    }
    const zDiff = zoom - zCur;
    zCur = Math.abs(zDiff) < 1e-3 ? zoom : zCur + zDiff * (reduce ? 1 : 0.16);
    // Το zoom μετριέται ως απόσταση από την επιφάνεια, όχι από το κέντρο: έτσι κάθε βήμα «φαίνεται» ίδιο.
    camera.position.z = R + (baseZ - R) / zCur;
    // Τα σημεία μεγαλώνουν πιο αργά από την απόσταση μεταξύ τους, ώστε στο zoom να ξεχωρίζουν.
    dotMat.uniforms.scale.value = dotScale * Math.pow(camera.position.z / baseZ, 0.6);
    const focus = Math.min(1, Math.max(0, (zCur - 1) / 1.2));
    const mk = Math.pow(zCur, -0.75);
    for (const m of markers) m.o.scale.setScalar(m.s * mk);
    // Η αργή αιώρηση σβήνει όσο μεγαλώνει το zoom.
    const sway = reduce ? 0 : Math.sin(t * 0.18) * 0.12 * Math.max(0, 1 - (zCur - 1) * 2);
    globe.rotation.y = -(baseLon + (grLon - baseLon) * focus) * DEG + sway + offY;
    globe.rotation.x = (baseLat + (grLat - baseLat) * focus) * DEG + offX;
    globe.updateMatrixWorld();

    arcMat.uniforms.t.value = reduce ? 0.6 : t;
    for (const r of routes) {
      for (const p of r.packets) {
        const u = (((reduce ? p.off : p.off + t * r.speed) % 1) + 1) % 1;
        p.sp.position.copy(r.curve.getPointAt(u));
        p.sp.material.opacity = Math.sin(Math.PI * u);
      }
      place(r.label, r.src, 1.06);
    }
    place(grLabel, target, 1.06);
    for (const p of pulses) {
      const u = reduce ? 0.35 : ((t * 0.55 + p.ph) % 1);
      p.m.scale.setScalar((0.02 + u * 0.13) * mk);
      p.m.material.opacity = 0.85 * (1 - u);
    }
    renderer.render(scene, camera);
    const settling = Math.abs(velY) + Math.abs(velX) > 1e-4 || (zoom < 1.02 && Math.abs(offY) + Math.abs(offX) > 1e-3) || zoom !== zCur;
    if (visible && !document.hidden && (!reduce || dragging || settling)) raf = requestAnimationFrame(frame);
  }
  function wake() { if (!raf && visible) raf = requestAnimationFrame(frame); }
  new IntersectionObserver(es => { visible = es[0].isIntersecting; if (visible) wake(); }).observe(stage);
  document.addEventListener('visibilitychange', wake);

  resize();
  stage.classList.add('is-ready');
  return {
    wake,
    zoomIn: () => setZoom(zoom * 1.5),
    zoomOut: () => setZoom(zoom / 1.5),
    reset,
  };
}
