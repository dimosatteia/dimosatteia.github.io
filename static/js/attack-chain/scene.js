/*
  3D αλυσίδα επίθεσης (shortcode {{< attack-chain >}}). Μια εικονική εταιρεία «MyCompany» σαν ολογραφικός χάρτης:
  κάθε κόμβος είναι ένα φωτεινό «πλακίδιο» με εικονίδιο ή λογότυπο, πάνω σε ένα pin στο δάπεδο.
  Internet αριστερά, Microsoft 365 σε γυάλινη πλατφόρμα από πάνω, το Microsoft Defender XDR στην κορυφή.
  Δεδομένα: data/attack_chains.yaml, μέσα από το JSON του shortcode.
  Το Three.js σερβίρεται από το ίδιο το site (js/hero3d/three.module.min.js), όχι από CDN.
*/
import * as THREE from '../hero3d/three.module.min.js';

const COL = {
  idle: new THREE.Color('#38bdf8'),
  red: new THREE.Color('#f43f5e'),
  amber: new THREE.Color('#f59e0b'),
  green: new THREE.Color('#22c55e'),
  blue: new THREE.Color('#3b82f6'),
  slate: new THREE.Color('#94a3b8'),
};
const LOGO = { mail: 'exchange', identity: 'entra', xdr: 'defender' };
const PIN = 0.95;      // ύψος του πλακιδίου πάνω από το δάπεδο
const TILE = 0.82;     // μέγεθος πλακιδίου

/* ---------- Υφές από canvas ---------- */
function canvasTex(size, draw) {
  const c = document.createElement('canvas');
  c.width = c.height = size;
  draw(c.getContext('2d'), size);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  return t;
}
function rr(g, x, y, w, h, r) {
  g.beginPath();
  g.moveTo(x + r, y); g.arcTo(x + w, y, x + w, y + h, r); g.arcTo(x + w, y + h, x, y + h, r);
  g.arcTo(x, y + h, x, y, r); g.arcTo(x, y, x + w, y, r); g.closePath();
}
const halo = () => canvasTex(128, (g, s) => {
  const r = g.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
  r.addColorStop(0, 'rgba(255,255,255,.9)'); r.addColorStop(0.25, 'rgba(255,255,255,.35)'); r.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = r; g.fillRect(0, 0, s, s);
});
// Περίγραμμα του πλακιδίου: λευκό, βάφεται από το χρώμα του υλικού ανάλογα με την κατάσταση.
const frameTex = () => canvasTex(256, (g, s) => {
  g.shadowColor = '#fff'; g.shadowBlur = 18;
  g.strokeStyle = '#fff'; g.lineWidth = 7;
  rr(g, 22, 22, s - 44, s - 44, 52); g.stroke();
  g.shadowBlur = 0; g.lineWidth = 3; g.stroke();
});

// Γραμμικά εικονίδια σε κάνναβο 24x24 (δικά μας, απλά σχήματα).
const ICONS = {
  laptop: (g) => { rr(g, 4, 5, 16, 11, 1.5); g.stroke(); g.beginPath(); g.moveTo(2, 19); g.lineTo(22, 19); g.stroke(); },
  server: (g) => {
    [3.5, 10, 16.5].forEach((y) => { rr(g, 4, y, 16, 4.5, 1.2); g.stroke(); g.beginPath(); g.arc(7.2, y + 2.25, 0.7, 0, 7); g.fill(); g.beginPath(); g.moveTo(11, y + 2.25); g.lineTo(17, y + 2.25); g.stroke(); });
  },
  edge: (g) => {
    rr(g, 3, 5, 18, 14, 1.5); g.stroke();
    [9.7, 14.3].forEach((y) => { g.beginPath(); g.moveTo(3, y); g.lineTo(21, y); g.stroke(); });
    [[9, 5, 9.7], [15, 5, 9.7], [6, 9.7, 14.3], [12, 9.7, 14.3], [18, 9.7, 14.3], [9, 14.3, 19], [15, 14.3, 19]].forEach(([x, a, b]) => { g.beginPath(); g.moveTo(x, a); g.lineTo(x, b); g.stroke(); });
  },
  mail: (g) => { rr(g, 3, 6, 18, 12, 1.8); g.stroke(); g.beginPath(); g.moveTo(3.5, 7); g.lineTo(12, 13); g.lineTo(20.5, 7); g.stroke(); },
  cloud: (g) => {
    g.beginPath(); g.moveTo(7, 18); g.lineTo(17.5, 18);
    g.bezierCurveTo(21, 18, 22.2, 13, 18.6, 11.4); g.bezierCurveTo(18.2, 7, 12.6, 5.4, 10.4, 8.8);
    g.bezierCurveTo(6.6, 7.6, 4.6, 11.2, 5.8, 13.2); g.bezierCurveTo(2.6, 14, 3.4, 18, 7, 18); g.stroke();
  },
  attacker: (g) => {
    g.beginPath(); g.moveTo(4, 21); g.bezierCurveTo(4, 15, 7.5, 13.5, 12, 13.5); g.bezierCurveTo(16.5, 13.5, 20, 15, 20, 21); g.stroke();
    g.beginPath(); g.moveTo(6.5, 14.5); g.bezierCurveTo(5.5, 6, 8, 3, 12, 3); g.bezierCurveTo(16, 3, 18.5, 6, 17.5, 14.5); g.stroke();
    g.beginPath(); g.ellipse(9.6, 10, 1.6, 1.1, 0, 0, 7); g.fill(); g.beginPath(); g.ellipse(14.4, 10, 1.6, 1.1, 0, 0, 7); g.fill();
  },
  identity: (g) => { g.beginPath(); g.arc(8, 12, 4, 0, 7); g.stroke(); g.beginPath(); g.moveTo(12, 12); g.lineTo(21, 12); g.lineTo(21, 15); g.moveTo(17.5, 12); g.lineTo(17.5, 14.5); g.stroke(); },
};
function tileTex(kind, img) {
  return canvasTex(256, (g, s) => {
    const grad = g.createLinearGradient(0, 0, 0, s);
    grad.addColorStop(0, kind === 'attacker' ? '#3b0a14' : '#14223f'); grad.addColorStop(1, kind === 'attacker' ? '#1a0509' : '#0a1226');
    rr(g, 26, 26, s - 52, s - 52, 48); g.fillStyle = grad; g.fill();
    // λεπτή γυαλάδα στο πάνω μέρος
    const gl = g.createLinearGradient(0, 26, 0, s / 2);
    gl.addColorStop(0, 'rgba(255,255,255,.10)'); gl.addColorStop(1, 'rgba(255,255,255,0)');
    rr(g, 26, 26, s - 52, s / 2 - 26, 48); g.fillStyle = gl; g.fill();
    if (img) {
      const m = 64; g.drawImage(img, m, m, s - 2 * m, s - 2 * m);
    } else {
      g.save(); g.translate(s * 0.27, s * 0.27); g.scale(s * 0.46 / 24, s * 0.46 / 24);
      g.lineWidth = 1.6; g.lineCap = 'round'; g.lineJoin = 'round';
      g.strokeStyle = kind === 'attacker' ? '#fda4af' : '#e2e8f0'; g.fillStyle = g.strokeStyle;
      (ICONS[kind] || ICONS.cloud)(g); g.restore();
    }
  });
}
function loadImg(src) {
  return new Promise((res) => { const i = new Image(); i.onload = () => res(i); i.onerror = () => res(null); i.src = src; });
}

/* ---------- Δάπεδο και ζώνες ---------- */
function floorMesh() {
  const geo = new THREE.PlaneGeometry(26, 16);
  const mat = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false,
    uniforms: { c: { value: new THREE.Color('#1e40af') } },
    vertexShader: 'varying vec2 vP; void main(){ vP = position.xy; gl_Position = projectionMatrix*modelViewMatrix*vec4(position,1.0); }',
    fragmentShader: [
      'uniform vec3 c; varying vec2 vP;',
      'float line(float v, float w){ float f = abs(fract(v - 0.5) - 0.5); return 1.0 - smoothstep(0.0, w, f); }',
      'void main(){',
      '  vec2 p = vP + vec2(-0.2, 0.0);',
      '  float g = max(line(p.x*1.0, 0.03), line(p.y*1.0, 0.03))*0.55 + max(line(p.x*4.0, 0.05), line(p.y*4.0, 0.05))*0.12;',
      '  float fade = 1.0 - smoothstep(3.0, 11.0, length(p*vec2(0.85,1.25)));',
      '  float a = g*0.5*fade + 0.06*fade;',
      '  gl_FragColor = vec4(c*1.1, a);',
      '}',
    ].join('\n'),
  });
  const m = new THREE.Mesh(geo, mat);
  m.rotation.x = -Math.PI / 2;
  return m;
}
function zoneOutline(x0, x1, z0, z1, y, color, opacity) {
  const r = 0.35, pts = [];
  const corner = (cx, cz, a0) => { for (let k = 0; k <= 8; k++) { const a = a0 + (k / 8) * Math.PI / 2; pts.push(new THREE.Vector3(cx + Math.cos(a) * r, y, cz + Math.sin(a) * r)); } };
  corner(x1 - r, z1 - r, 0); corner(x0 + r, z1 - r, Math.PI / 2); corner(x0 + r, z0 + r, Math.PI); corner(x1 - r, z0 + r, Math.PI * 1.5);
  pts.push(pts[0].clone());
  return new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), new THREE.LineBasicMaterial({ color, transparent: true, opacity }));
}
function glassPlane(x0, x1, z0, z1, y) {
  const geo = new THREE.PlaneGeometry(x1 - x0, z1 - z0);
  const mat = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, side: THREE.DoubleSide,
    vertexShader: 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix*modelViewMatrix*vec4(position,1.0); }',
    fragmentShader: [
      'varying vec2 vUv;',
      'void main(){',
      '  vec2 d = min(vUv, 1.0 - vUv);',
      '  float edge = 1.0 - smoothstep(0.0, 0.06, min(d.x, d.y*2.5));',
      '  float a = 0.07 + 0.10*(1.0 - vUv.y) + edge*0.35;',
      '  gl_FragColor = vec4(mix(vec3(0.15,0.35,0.85), vec3(0.45,0.7,1.0), edge), a);',
      '}',
    ].join('\n'),
  });
  const m = new THREE.Mesh(geo, mat);
  m.rotation.x = -Math.PI / 2;
  m.position.set((x0 + x1) / 2, y, (z0 + z1) / 2);
  return m;
}

export function init(stage, data) {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  const canvas = renderer.domElement;
  canvas.setAttribute('aria-hidden', 'true');
  stage.insertBefore(canvas, stage.firstChild);

  const labelsEl = document.createElement('div');
  labelsEl.className = 'ac-labels';
  labelsEl.setAttribute('aria-hidden', 'true');
  stage.appendChild(labelsEl);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
  const HALO = halo(), FRAME = frameTex();
  const base = import.meta.url.replace(/attack-chain\/scene\.js.*$/, 'hero3d/logos/');

  scene.add(floorMesh());
  scene.add(zoneOutline(-6.7, -4.55, -1.8, 3.9, 0.01, 0xf43f5e, 0.45));
  scene.add(zoneOutline(-4.3, 5.4, -0.5, 3.6, 0.01, 0x3b82f6, 0.45));
  scene.add(glassPlane(-2.9, 4.7, -3.0, -1.0, 2.3));

  /* ---------- Κόμβοι ---------- */
  const nodes = {};
  const tileMats = [];
  for (const [id, n] of Object.entries(data.nodes)) {
    const floorY = n.zone === 'cloud' && n.kind !== 'xdr' ? 2.3 : n.kind === 'xdr' ? 3.4 : 0;
    const p = new THREE.Vector3(n.pos[0], floorY, n.pos[2]);
    const g = new THREE.Group();
    g.position.copy(p);
    scene.add(g);

    const big = n.kind === 'xdr' ? 1.35 : 1;
    const h = n.kind === 'xdr' ? 0.25 : PIN;
    // pin: δακτύλιος στο δάπεδο και λεπτή κάθετη γραμμή φωτός
    const ringMat = new THREE.MeshBasicMaterial({ color: COL.idle, transparent: true, opacity: 0.55, depthWrite: false, side: THREE.DoubleSide });
    const ring = new THREE.Mesh(new THREE.RingGeometry(0.26 * big, 0.31 * big, 48), ringMat);
    ring.rotation.x = -Math.PI / 2; ring.position.y = 0.012; g.add(ring);
    const disc = new THREE.Mesh(new THREE.CircleGeometry(0.26 * big, 48), new THREE.MeshBasicMaterial({ color: COL.idle, transparent: true, opacity: 0.08, depthWrite: false }));
    disc.rotation.x = -Math.PI / 2; disc.position.y = 0.01; g.add(disc);
    const stemMat = new THREE.LineBasicMaterial({ color: COL.idle, transparent: true, opacity: 0.45 });
    const stem = new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0.02, 0), new THREE.Vector3(0, h - TILE * big * 0.42, 0)]), stemMat);
    g.add(stem);

    // πλακίδιο: φόντο με εικονίδιο, περίγραμμα και λάμψη στο χρώμα της κατάστασης
    const tileMat = new THREE.SpriteMaterial({ map: tileTex(n.kind, null), transparent: true, depthWrite: false });
    const tile = new THREE.Sprite(tileMat); tile.scale.setScalar(TILE * big); tile.position.y = h; tile.renderOrder = 3; g.add(tile);
    tileMats.push({ mat: tileMat, kind: n.kind, logo: LOGO[n.kind === 'mail' && id === 'supplier' ? 'x' : n.kind] });
    const frameMat = new THREE.SpriteMaterial({ map: FRAME, color: COL.idle, transparent: true, depthWrite: false, opacity: 0.8 });
    const frame = new THREE.Sprite(frameMat); frame.scale.setScalar(TILE * big * 1.02); frame.position.y = h; frame.renderOrder = 4; g.add(frame);
    const glowMat = new THREE.SpriteMaterial({ map: HALO, color: COL.idle, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, opacity: 0.35 });
    const glow = new THREE.Sprite(glowMat); glow.scale.setScalar(TILE * big * 2.1); glow.position.y = h; glow.renderOrder = 2; g.add(glow);

    const label = document.createElement('span');
    label.className = 'ac-label';
    label.textContent = n.label;
    labelsEl.appendChild(label);
    const badge = document.createElement('span');
    badge.className = 'ac-badge';
    labelsEl.appendChild(badge);

    const anchor = p.clone().setY(floorY + h);
    nodes[id] = { id, kind: n.kind, g, ringMat, stemMat, frameMat, glowMat, tile, frame, glow, label, badge, anchor, floor: p, big, state: '', pulse: 0 };
  }
  // Λογότυπα για Exchange Online, Entra ID και Defender XDR (από τα logos του hero).
  tileMats.forEach((t) => {
    if (!t.logo) return;
    loadImg(base + t.logo + '.webp').then((img) => { if (img) { t.mat.map.dispose(); t.mat.map = tileTex(t.kind, img); t.mat.needsUpdate = true; wake(); } });
  });
  // Περιστρεφόμενοι δακτύλιοι γύρω από το Defender XDR
  const xdrRings = [];
  if (nodes.xdr) {
    [0.75, 0.95].forEach((r, k) => {
      const pts = [];
      for (let a = 0; a <= 64; a++) { const t = (a / 64) * Math.PI * 2; pts.push(new THREE.Vector3(Math.cos(t) * r, 0, Math.sin(t) * r)); }
      const l = new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(pts), new THREE.LineDashedMaterial({ color: COL.blue, dashSize: 0.12 + k * 0.1, gapSize: 0.08, transparent: true, opacity: 0.7 }));
      l.computeLineDistances(); l.position.copy(nodes.xdr.anchor); l.rotation.x = k ? 0.35 : -0.25;
      scene.add(l); xdrRings.push(l);
    });
  }

  // Τοπολογία: αχνές «καλωδιώσεις» στο δάπεδο.
  const topo = [['edge', 'server'], ['edge', 'laptop_cfo'], ['server', 'dc'], ['dc', 'files'], ['laptop_cfo', 'dc'], ['laptop_it', 'dc'], ['laptop_it', 'server'],
    ['mail', 'identity'], ['identity', 'sharepoint']];
  const topoMat = new THREE.LineDashedMaterial({ color: 0x3b82f6, dashSize: 0.06, gapSize: 0.1, transparent: true, opacity: 0.35 });
  for (const [a, b] of topo) {
    if (!nodes[a] || !nodes[b]) continue;
    const pa = nodes[a].floor.clone().setY(nodes[a].floor.y + 0.015), pb = nodes[b].floor.clone().setY(nodes[b].floor.y + 0.015);
    const line = new THREE.Line(new THREE.BufferGeometry().setFromPoints([pa, pb]), topoMat);
    line.computeLineDistances(); scene.add(line);
  }
  // Σύνδεση Entra ID με τον Domain Controller (συγχρονισμός ταυτοτήτων): κάθετη αχνή γραμμή
  if (nodes.identity && nodes.dc) {
    const l = new THREE.Line(new THREE.BufferGeometry().setFromPoints([nodes.identity.floor.clone(), nodes.dc.floor.clone().setY(0.02)]), topoMat);
    l.computeLineDistances(); scene.add(l);
  }

  /* ---------- Τόξα επίθεσης ---------- */
  function curveFor(path) {
    const pts = [];
    for (let k = 0; k < path.length - 1; k++) {
      const a = nodes[path[k]].anchor, b = nodes[path[k + 1]].anchor;
      const lift = 0.45 + a.distanceTo(b) * 0.16;
      const mid = a.clone().add(b).multiplyScalar(0.5); mid.y = Math.max(a.y, b.y) + lift;
      const seg = new THREE.QuadraticBezierCurve3(a, mid, b).getPoints(30);
      if (k > 0) seg.shift();
      pts.push(...seg);
    }
    return new THREE.CatmullRomCurve3(pts, false, 'centripetal');
  }
  const arcMat = (c1, c2) => new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    uniforms: { t: { value: 0 }, a: { value: c1.clone() }, b: { value: c2.clone() }, o: { value: 1 }, p: { value: 1 } },
    vertexShader: 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix*modelViewMatrix*vec4(position,1.0); }',
    fragmentShader: [
      'uniform float t; uniform vec3 a; uniform vec3 b; uniform float o; uniform float p; varying vec2 vUv;',
      'void main(){',
      '  if (vUv.x > p) discard;',
      '  float head = smoothstep(p - 0.25, p, vUv.x);',
      '  float flow = pow(fract(vUv.x*5.0 - t*0.7), 6.0);',
      '  float core = 1.0 - abs(vUv.y - 0.5)*2.0;',
      '  vec3 c = mix(a, b, vUv.x) + flow*0.35;',
      '  gl_FragColor = vec4(c, (0.25 + 0.45*flow + 0.4*head) * o * (0.35 + 0.65*core));',
      '}',
    ].join('\n'),
  });

  // Ο επιτιθέμενος: φωτεινή κεφαλή με ουρά από σπίθες
  // Ένας κομήτης ανά τόξο: στο ransomware ξεκινούν πολλοί μαζί από την ίδια πηγή.
  const comets = [];
  for (let j = 0; j < 6; j++) {
    const comet = [];
    for (let k = 0; k < 9; k++) {
      const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: HALO, color: k ? COL.red : new THREE.Color('#ffe4e6'), transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }));
      s.scale.setScalar(k ? 0.42 - k * 0.035 : 0.5); s.renderOrder = 6; s.visible = false; scene.add(s); comet.push(s);
    }
    comets.push(comet);
  }
  // Κόκκινο «κύμα» στο δάπεδο κάθε κόμβου που μόλις παραβιάστηκε
  const infect = [];
  for (let j = 0; j < 6; j++) {
    const m = new THREE.Mesh(new THREE.RingGeometry(0.3, 0.38, 48), new THREE.MeshBasicMaterial({ color: COL.red, transparent: true, opacity: 0, depthWrite: false, side: THREE.DoubleSide, blending: THREE.AdditiveBlending }));
    m.rotation.x = -Math.PI / 2; scene.add(m); infect.push(m);
  }
  // «Πεδίο» προστασίας στον κόμβο όπου δρα το Defender
  const shieldMat = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide,
    uniforms: { c: { value: COL.amber.clone() }, o: { value: 0 }, t: { value: 0 } },
    vertexShader: 'varying vec3 vN; varying vec3 vV; varying float vY; void main(){ vec4 mv = modelViewMatrix*vec4(position,1.0); vN = normalize(normalMatrix*normal); vV = normalize(-mv.xyz); vY = position.y; gl_Position = projectionMatrix*mv; }',
    fragmentShader: 'uniform vec3 c; uniform float o; uniform float t; varying vec3 vN; varying vec3 vV; varying float vY; void main(){ float f = pow(1.0 - abs(dot(vN, vV)), 2.2); float bands = 0.5 + 0.5*sin(vY*28.0 - t*3.0); gl_FragColor = vec4(c, (f*0.9 + bands*f*0.25) * o); }',
  });
  const shield = new THREE.Mesh(new THREE.SphereGeometry(0.62, 40, 24, 0, Math.PI * 2, 0, Math.PI * 0.55), shieldMat);
  shield.renderOrder = 5; scene.add(shield);
  const shieldRing = new THREE.Mesh(new THREE.RingGeometry(0.6, 0.66, 64), new THREE.MeshBasicMaterial({ color: COL.amber, transparent: true, opacity: 0, depthWrite: false, side: THREE.DoubleSide, blending: THREE.AdditiveBlending }));
  shieldRing.rotation.x = -Math.PI / 2; scene.add(shieldRing);
  // Σήμα προς το Defender XDR
  const beamMat = new THREE.LineDashedMaterial({ color: COL.blue, dashSize: 0.08, gapSize: 0.06, transparent: true, opacity: 0 });
  const beam = new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(), new THREE.Vector3(0, 1, 0)]), beamMat);
  scene.add(beam);
  const signal = new THREE.Sprite(new THREE.SpriteMaterial({ map: HALO, color: new THREE.Color('#93c5fd'), transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }));
  signal.scale.setScalar(0.35); scene.add(signal);

  /* ---------- Κατάσταση ---------- */
  let arcs = [], curPath = new Set();
  let cur = { s: -1, i: -1, mode: 'with' };
  let anim = { t0: 0 };
  const HOME = new THREE.Vector3(-0.5, 1.5, 0.4);
  const target = HOME.clone(), targetGoal = HOME.clone();
  let dist = 16, distGoal = 16;
  const stopIndex = (sc) => sc.steps.findIndex((x) => x.stops);

  function setNodeColor(n, c, strength) {
    n.frameMat.color.copy(c); n.glowMat.color.copy(c); n.ringMat.color.copy(c); n.stemMat.color.copy(c);
    n.glowMat.opacity = strength; n.stemMat.opacity = 0.3 + strength * 0.6; n.ringMat.opacity = 0.35 + strength * 0.6;
  }

  function show(s, i, mode) {
    if (s === cur.s && i === cur.i && mode === cur.mode) return;
    cur = { s, i, mode };
    const sc = data.scenarios[s], st = stopIndex(sc);
    for (const a of arcs) { scene.remove(a.mesh); a.mesh.geometry.dispose(); a.mesh.material.dispose(); }
    arcs = [];
    const used = new Set(sc.steps.flatMap((x) => x.path));
    if (nodes.supplier) {
      nodes.supplier.g.visible = used.has('supplier');
      nodes.supplier.label.style.display = used.has('supplier') ? '' : 'none';
    }
    // Κατάσταση κόμβων: χωρίς Defender ό,τι αγγίζει ο επιτιθέμενος παραβιάζεται. Με Defender, ο στόχος κάθε βήματος
    // παίρνει το αποτέλεσμα του βήματος: ok (μπλοκαρίστηκε ή περιορίστηκε), det (εντοπίστηκε), hit (κανένα προϊόν).
    const stateOf = {};
    const blockedAt = (o) => mode === 'with' && (o === 'block' || o === 'contain');
    for (let k = 0; k <= i; k++) {
      const step = sc.steps[k], last = step.path[step.path.length - 1];
      const fan = step.fan;
      step.path.forEach((n) => {
        if (n === 'attacker' || n === 'xdr') return;
        if (mode === 'without' || step.outcome === 'none') stateOf[n] = 'hit';
        else if (n === last || fan) stateOf[n] = step.outcome === 'detect' ? 'det' : 'ok';
      });
      if (step.path.length < 2) continue;
      const curves = fan ? step.path.slice(1).map((n) => curveFor([step.path[0], n])) : [curveFor(step.path)];
      for (const curve of curves) {
        const mat = arcMat(new THREE.Color('#fb7185'), new THREE.Color('#fb923c'));
        const stopAt = blockedAt(step.outcome) ? (fan ? 0.3 : 0.86) : 1;
        // Χωρίς Defender η αλυσίδα μένει έντονη, ώστε να φαίνεται πόσο απλώθηκε η επίθεση.
        mat.uniforms.o.value = k === i ? 1 : mode === 'without' ? 0.6 : 0.3;
        mat.uniforms.p.value = k === i && !reduce ? 0 : stopAt;
        const mesh = new THREE.Mesh(new THREE.TubeGeometry(curve, 160, k === i ? 0.05 : 0.03, 10, false), mat);
        mesh.renderOrder = 1; scene.add(mesh);
        arcs.push({ mesh, current: k === i, curve, stopAt });
      }
    }
    const step = sc.steps[i];
    curPath = new Set(step.path);
    for (const [id, n] of Object.entries(nodes)) {
      let state = stateOf[id] || '';
      if (id === 'attacker') state = 'att';
      if (id === 'xdr') state = 'xdr';
      n.state = state;
      const c = state === 'hit' || state === 'att' ? COL.red : state === 'det' ? COL.amber : state === 'ok' ? COL.green : state === 'xdr' ? COL.blue : COL.idle;
      const strength = state === 'att' || state === 'xdr' ? 0.6 : state ? 0.75 : 0.22;
      setNodeColor(n, c, strength);
      const dim = !used.has(id) && id !== 'xdr';
      n.tile.material.opacity = dim ? 0.35 : 1; n.frameMat.opacity = dim ? 0.25 : 0.85;
      n.label.classList.toggle('is-hit', state === 'hit');
      n.label.classList.toggle('is-det', state === 'det');
      n.label.classList.toggle('is-ok', state === 'ok');
      n.label.classList.toggle('is-dim', dim);
      n.badge.classList.remove('is-on'); n.badge.style.opacity = '';
    }
    if (mode === 'with') {
      for (let k = 0; k <= i; k++) {
        const stp = sc.steps[k], prod = data.products[stp.product], where = nodes[stp.path[stp.path.length - 1]];
        if (!where || !prod) continue;
        where.badge.textContent = prod.short;
        where.badge.style.setProperty('--c', prod.color);
        where.badge.classList.add('is-on');
        if (k < i) where.badge.style.opacity = '.5';
      }
    }
    const prod = data.products[step.product];
    const targets = step.fan ? step.path.slice(1) : [step.path[step.path.length - 1]];
    anim = {
      t0: performance.now(), arcs: arcs.filter((a) => a.current),
      blocked: blockedAt(step.outcome), outcome: step.outcome, mode,
      product: prod, last: nodes[step.fan ? step.path[0] : step.path[step.path.length - 1]],
      infected: mode === 'without' ? targets.filter((n) => n !== 'attacker' && n !== 'xdr').map((n) => nodes[n]) : [],
      impact: mode === 'without' && step.impact,
    };
    const pc = step.outcome === 'detect' ? COL.amber.clone() : new THREE.Color(prod ? prod.color : '#f59e0b');
    shieldMat.uniforms.c.value.copy(pc); shieldRing.material.color.copy(pc);
    const c = new THREE.Vector3();
    step.path.forEach((n) => c.add(nodes[n].anchor));
    c.multiplyScalar(1 / step.path.length);
    targetGoal.copy(HOME).lerp(c, 0.15);
    distGoal = step.path.length <= 1 ? 14.5 : 16;
    wake();
  }

  /* ---------- Κάμερα και αλληλεπίδραση ---------- */
  let az = -0.42, el = 0.58, offAz = 0, offEl = 0, drag = false, lx = 0, ly = 0, lastMove = -1e9;
  canvas.addEventListener('pointerdown', (e) => { drag = true; lx = e.clientX; ly = e.clientY; canvas.setPointerCapture(e.pointerId); wake(); });
  canvas.addEventListener('pointermove', (e) => {
    if (!drag) return;
    offAz = Math.max(-1.0, Math.min(1.0, offAz - (e.clientX - lx) * 0.005));
    offEl = Math.max(-0.3, Math.min(0.4, offEl + (e.clientY - ly) * 0.004));
    lx = e.clientX; ly = e.clientY; lastMove = performance.now(); wake();
  });
  const up = () => { drag = false; lastMove = performance.now(); };
  canvas.addEventListener('pointerup', up);
  canvas.addEventListener('pointercancel', up);

  let W = 1, H = 1;
  function resize() {
    W = stage.clientWidth || 1; H = stage.clientHeight || 1;
    renderer.setSize(W, H, false);
    camera.aspect = W / H; camera.updateProjectionMatrix();
    wake();
  }
  new ResizeObserver(resize).observe(stage);

  const tmp = new THREE.Vector3();
  function project(p, dy) {
    tmp.copy(p); tmp.y += dy; tmp.project(camera);
    return [(tmp.x * 0.5 + 0.5) * W, (-tmp.y * 0.5 + 0.5) * H, tmp.z < 1];
  }

  /* ---------- Βρόχος ---------- */
  let visible = true, raf = 0;
  const boxes = [];
  function frame(now) {
    raf = 0;
    const t = now / 1000, since = Math.max(0, (now - anim.t0) / 1000);
    if (!drag && now - lastMove > 4000) { offAz *= 0.96; offEl *= 0.96; }
    target.lerp(targetGoal, reduce ? 1 : 0.06);
    dist += (distGoal - dist) * (reduce ? 1 : 0.06);
    const a = az + offAz + (reduce ? 0 : Math.sin(t * 0.13) * 0.05), e = el + offEl;
    const boost = Math.max(1, 1.62 / (W / H));
    camera.position.set(target.x + Math.sin(a) * Math.cos(e) * dist * boost, target.y + Math.sin(e) * dist * boost, target.z + Math.cos(a) * Math.cos(e) * dist * boost);
    camera.lookAt(target);

    // ελαφριά «αναπνοή» των πλακιδίων
    for (const n of Object.values(nodes)) {
      const bob = reduce ? 0 : Math.sin(t * 1.4 + n.floor.x * 1.7) * 0.03;
      const h = (n.kind === 'xdr' ? 0.25 : PIN) + bob;
      n.tile.position.y = h; n.frame.position.y = h; n.glow.position.y = h;
      const hot = curPath.has(n.id) && n.state !== 'xdr';
      const pulse = hot && !reduce ? 1 + 0.06 * Math.sin(t * 5) : 1;
      n.glow.scale.setScalar(TILE * n.big * (hot ? 2.6 : 2.1) * pulse);
    }
    xdrRings.forEach((r, k) => { if (!reduce) r.rotation.y = t * (k ? -0.4 : 0.6); });

    // τόξο και κομήτης
    const travel = reduce ? 1 : Math.min(1, since / 1.9);
    const ease = 1 - Math.pow(1 - travel, 3);
    for (const arc of arcs) {
      arc.mesh.material.uniforms.t.value = reduce ? 0.5 : t;
      if (arc.current) arc.mesh.material.uniforms.p.value = Math.min(ease * arc.stopAt, 0.999);
    }
    const burst = anim.blocked && travel >= 1;
    const bk = burst ? Math.min(1, (since - 1.9) / 0.5) : 0;
    comets.forEach((comet, j) => {
      const arc = anim.arcs && anim.arcs[j];
      if (!arc) { comet.forEach((s) => { s.visible = false; }); return; }
      comet.forEach((s, k) => {
        const u = Math.max(0, Math.min(0.999, ease * arc.stopAt - k * 0.018));
        s.visible = u > 0 && (!burst || k === 0);
        s.position.copy(arc.curve.getPointAt(u));
        s.material.color.copy(k ? COL.red : new THREE.Color('#ffe4e6'));
        s.material.opacity = k ? 0.9 * (1 - k / comet.length) : 1;
      });
      if (burst) { comet[0].scale.setScalar(0.5 + bk * 2.2); comet[0].material.opacity = 1 - bk; comet[0].material.color.copy(COL.green).lerp(new THREE.Color('#ffffff'), 0.4); }
      else comet[0].scale.setScalar(0.5);
    });
    // κύμα μόλυνσης όταν ο επιτιθέμενος φτάσει στον στόχο
    infect.forEach((m, j) => {
      const n = anim.infected && anim.infected[j];
      if (!n || travel < 1) { m.material.opacity = 0; return; }
      const w = reduce ? 0.5 : ((since - 1.9) * 0.7) % 1;
      m.position.copy(n.floor).setY(n.floor.y + 0.02);
      m.scale.setScalar(1 + w * 2.2); m.material.opacity = 0.85 * (1 - w);
    });

    // ασπίδα και σήμα προς XDR
    const withDef = cur.mode === 'with' && anim.last && anim.last.kind !== 'xdr' && anim.outcome !== 'none';
    if (withDef) {
      const k = reduce ? 1 : Math.min(1, Math.max(0, (since - 1.3) / 0.5));
      const L = anim.last;
      shield.position.copy(L.floor).setY(L.floor.y + 0.01);
      shield.scale.set(1.15, 1.75, 1.15).multiplyScalar(0.7 + 0.3 * k);
      shieldMat.uniforms.o.value = (anim.blocked ? 0.95 : 0.25) * k; shieldMat.uniforms.t.value = t;
      shieldRing.position.copy(L.floor).setY(L.floor.y + 0.015);
      const rp = reduce ? 0.5 : (since * 0.8) % 1;
      shieldRing.scale.setScalar(0.8 + rp * 0.9); shieldRing.material.opacity = 0.8 * k * (1 - rp);
      const tech = anim.product && anim.product.short !== 'ΔΙΑΔ' && nodes.xdr;
      if (tech) {
        beam.geometry.setFromPoints([L.anchor, nodes.xdr.anchor]); beam.computeLineDistances();
        beamMat.opacity = 0.75 * k;
        signal.visible = k > 0;
        signal.position.copy(L.anchor).lerp(nodes.xdr.anchor, reduce ? 0.6 : (since * 0.7) % 1);
      } else { beamMat.opacity = 0; signal.visible = false; }
    } else { shieldMat.uniforms.o.value = 0; shieldRing.material.opacity = 0; beamMat.opacity = 0; signal.visible = false; }

    // χωρίς Defender, στο τελικό βήμα: οι παραβιασμένοι κόμβοι αναβοσβήνουν
    if (anim.impact) {
      const f = reduce ? 1 : 0.6 + 0.4 * Math.sin(t * 7);
      for (const n of Object.values(nodes)) if (n.state === 'hit') n.glowMat.opacity = 0.55 + 0.45 * f;
    }

    // ετικέτες: πρώτα του τρέχοντος βήματος, οι υπόλοιπες κρύβονται αν πέφτουν πάνω σε άλλη
    boxes.length = 0;
    const list = Object.values(nodes).filter((n) => n.g.visible).sort((x, y) => (curPath.has(y.id) - curPath.has(x.id)));
    for (const n of list) {
      const [x, y, vis] = project(n.anchor, -TILE * n.big * 0.5 - 0.05);
      n.label.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`;
      if (!n.lw) n.lw = n.label.offsetWidth || 80;
      const box = [x - n.lw / 2 - 3, y + 6, x + n.lw / 2 + 3, y + 26];
      const hideSmall = W < 520 && !curPath.has(n.id);
      const clash = boxes.some((b) => box[0] < b[2] && box[2] > b[0] && box[1] < b[3] && box[3] > b[1]);
      const hide = !vis || hideSmall || (clash && !curPath.has(n.id));
      n.label.style.visibility = hide ? 'hidden' : '';
      if (!hide) boxes.push(box);
      const [bx, by] = project(n.anchor, TILE * n.big * 0.5);
      n.badge.style.transform = `translate(${bx.toFixed(1)}px, ${by.toFixed(1)}px)`;
      n.badge.style.display = n.g.visible ? '' : 'none';
    }
    renderer.render(scene, camera);
    const moving = !reduce || drag || Math.abs(offAz) + Math.abs(offEl) > 1e-3 || target.distanceTo(targetGoal) > 1e-3;
    if (visible && !document.hidden && moving) raf = requestAnimationFrame(frame);
  }
  function wake() { if (!raf && visible) raf = requestAnimationFrame(frame); }
  new IntersectionObserver((es) => { visible = es[0].isIntersecting; if (visible) wake(); }).observe(stage);
  document.addEventListener('visibilitychange', wake);
  resize();
  return { show, wake };
}
