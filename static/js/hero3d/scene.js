/*
  3D hero της αρχικής: το λογότυπο του Microsoft Defender και οι οκτώ πυλώνες σε τροχιά,
  ο καθένας με το λογότυπο του αντίστοιχου προϊόντος.
  Φορτώνεται μόνο σε οθόνες >= 768px με WebGL, από το layouts/partials/hero-3d.html.
  Το Three.js σερβίρεται από το ίδιο το site (three.module.min.js), όχι από CDN.
*/
import * as THREE from './three.module.min.js';

const RINGS = [
  { radius: 2.5, tiltX: 0.0, tiltZ: 0.16, speed: 0.13 },
  { radius: 3.2, tiltX: 0.34, tiltZ: -0.3, speed: -0.095 },
  { radius: 3.9, tiltX: -0.3, tiltZ: 0.36, speed: 0.07 },
];
// Σε ποιον δακτύλιο μπαίνει κάθε πυλώνας (με τη σειρά που έρχονται από το template).
// Αρχικές γωνίες ανά δακτύλιο: διαλεγμένες ώστε στη στατική προβολή κανένα λογότυπο να μην πέφτει πάνω σε άλλο.
const START = [5.9, 2.9, 6.2];
const ICON = 0.66; // μέγεθος λογοτύπου πυλώνα
const RING_OF = [0, 1, 2, 0, 1, 2, 0, 1];

function haloTexture() {
  const c = document.createElement('canvas');
  c.width = c.height = 64;
  const g = c.getContext('2d');
  const grad = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  grad.addColorStop(0, 'rgba(255,255,255,0.55)');
  grad.addColorStop(0.35, 'rgba(255,255,255,0.14)');
  grad.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = grad;
  g.fillRect(0, 0, 64, 64);
  return new THREE.CanvasTexture(c);
}

export function init(stage, pillars, hooks) {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.domElement.className = 'h3d-canvas';
  renderer.domElement.setAttribute('aria-hidden', 'true');
  const canvas = renderer.domElement;
  stage.appendChild(canvas);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);

  // Τα λογότυπα είναι έγχρωμες εικόνες: υλικά χωρίς φωτισμό, για να μένουν τα χρώματα πιστά.
  const loader = new THREE.TextureLoader();
  function logo(url) {
    const t = loader.load(url, () => { dirty = true; schedule(); });
    t.colorSpace = THREE.SRGBColorSpace;
    t.anisotropy = 4;
    return t;
  }

  const BASE_TILT = 0.46;
  const root = new THREE.Group();
  root.rotation.x = BASE_TILT;
  scene.add(root);

  /* --- Κέντρο: το λογότυπο του Microsoft Defender, με πάχος από στρώσεις της ίδιας εικόνας --- */
  const shield = new THREE.Group();
  const coreTex = logo(hooks.core);
  const coreGeo = new THREE.PlaneGeometry(2.7, 2.7);
  const LAYERS = 14, DEPTH = 0.34;
  for (let k = 0; k < LAYERS; k++) {
    const face = k === 0 || k === LAYERS - 1;
    const layer = new THREE.Mesh(coreGeo, new THREE.MeshBasicMaterial({
      map: coreTex, side: THREE.DoubleSide, alphaTest: face ? 0.35 : 0.5, color: face ? 0xffffff : 0x4a6fc4,
    }));
    layer.position.z = DEPTH / 2 - (k / (LAYERS - 1)) * DEPTH;
    shield.add(layer);
  }
  // Η ασπίδα στέκεται όρθια προς τον θεατή, ανεξάρτητα από την κλίση των τροχιών.
  shield.rotation.x = -BASE_TILT;
  root.add(shield);

  /* --- Δακτύλιοι και πυλώνες --- */
  const halo = haloTexture();
  const pivots = RINGS.map((ring) => {
    const pivot = new THREE.Group();
    pivot.rotation.set(ring.tiltX, 0, ring.tiltZ);
    const pts = [];
    for (let i = 0; i <= 128; i++) {
      const a = (i / 128) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(a) * ring.radius, 0, Math.sin(a) * ring.radius));
    }
    pivot.add(new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(pts),
      new THREE.LineBasicMaterial({ color: 0x475569, transparent: true, opacity: 0.55 }),
    ));
    root.add(pivot);
    return pivot;
  });

  const perRing = RINGS.map((_, r) => RING_OF.slice(0, pillars.length).filter((x) => x === r).length);
  const seen = RINGS.map(() => 0);
  const hitTargets = [];

  const sats = pillars.map((p, i) => {
    const r = RING_OF[i % RING_OF.length];
    const ring = RINGS[r];
    const phase = (seen[r]++ / Math.max(perRing[r], 1)) * Math.PI * 2 + START[r];
    const color = new THREE.Color(p.color);

    const holder = new THREE.Group();
    const mesh = new THREE.Sprite(new THREE.SpriteMaterial({ map: logo(p.logo), transparent: true, depthWrite: false }));
    mesh.renderOrder = 2;
    const glow = new THREE.Sprite(new THREE.SpriteMaterial({
      map: halo, color, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false,
    }));
    glow.scale.setScalar(1.7);
    glow.renderOrder = 1;
    const hit = new THREE.Mesh(new THREE.SphereGeometry(0.5, 8, 8), new THREE.MeshBasicMaterial({ visible: false }));
    hit.userData.index = i;
    hitTargets.push(hit);
    holder.add(mesh, glow, hit);

    const beamGeo = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(), new THREE.Vector3()]);
    const beam = new THREE.Line(beamGeo, new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.8 }));
    beam.visible = false;
    pivots[r].add(holder, beam);

    const label = document.createElement('a');
    label.className = 'h3d-label';
    label.href = p.url;
    label.textContent = p.name;
    label.tabIndex = -1;
    label.setAttribute('aria-hidden', 'true');
    label.style.setProperty('--c', p.color);
    label.addEventListener('pointerenter', () => setActive(i));
    label.addEventListener('pointerleave', () => setActive(-1));
    stage.appendChild(label);

    return { ring, phase, angle: 0, holder, mesh, glow, beam, label, scale: 1 };
  });

  /* --- Κατάσταση --- */
  let active = -1;
  let dirty = true;
  function setActive(i, fromList) {
    if (i === active) return;
    active = i;
    sats.forEach((s, k) => {
      s.beam.visible = k === i;
      s.label.classList.toggle('is-active', k === i);
    });
    stage.classList.toggle('has-active', i >= 0);
    renderer.domElement.style.cursor = i >= 0 ? 'pointer' : '';
    if (!fromList && hooks && hooks.onActive) hooks.onActive(i);
    dirty = true;
  }

  const pointer = new THREE.Vector2(0, 0);
  const tilt = new THREE.Vector2(0, 0);
  const raycaster = new THREE.Raycaster();
  let pointerInside = false;
  let activeBeforeDown = -1;

  function pick(e) {
    const rect = renderer.domElement.getBoundingClientRect();
    pointer.set(((e.clientX - rect.left) / rect.width) * 2 - 1, -((e.clientY - rect.top) / rect.height) * 2 + 1);
    raycaster.setFromCamera(pointer, camera);
    const found = raycaster.intersectObjects(hitTargets, false)[0];
    return found ? found.object.userData.index : -1;
  }
  renderer.domElement.addEventListener('pointermove', (e) => {
    pointerInside = true;
    setActive(pick(e));
    dirty = true;
  });
  renderer.domElement.addEventListener('pointerleave', (e) => {
    pointerInside = false;
    if (!(e.relatedTarget && e.relatedTarget.classList && e.relatedTarget.classList.contains('h3d-label'))) setActive(-1);
  });
  renderer.domElement.addEventListener('pointerdown', (e) => {
    activeBeforeDown = active;
    setActive(pick(e));
  });
  renderer.domElement.addEventListener('click', (e) => {
    const i = pick(e);
    if (i < 0) return;
    // Σε αφή: το πρώτο άγγιγμα επιλέγει τον πυλώνα, το δεύτερο ανοίγει τη σελίδα του.
    if (e.pointerType === 'touch' && activeBeforeDown !== i) return;
    window.location.href = pillars[i].url;
  });

  /* --- Μέγεθος --- */
  function resize() {
    const w = canvas.clientWidth, h = canvas.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    const t = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
    camera.position.set(0, 0, Math.max(4.7 / (t * camera.aspect), 3.15 / t));
    camera.updateProjectionMatrix();
    dirty = true;
  }
  new ResizeObserver(resize).observe(canvas);
  resize();

  /* --- Κίνηση --- */
  const v = new THREE.Vector3();
  const placed = [];
  const order = sats.map((_, i) => i);
  const clock = new THREE.Clock();
  let elapsed = 0, speed = 1, grow = reduce ? 1 : 0, visible = true, raf = 0;

  function frame() {
    raf = 0;
    const dt = Math.min(clock.getDelta(), 0.05);
    if (!reduce) {
      elapsed += dt;
      grow = Math.min(1, grow + dt / 1.6);
      speed += ((active >= 0 ? 0 : 1) - speed) * Math.min(1, dt * 5);
      tilt.x += ((pointerInside ? pointer.x : 0) * 0.32 - tilt.x) * Math.min(1, dt * 3);
      tilt.y += ((pointerInside ? pointer.y : 0) * 0.14 - tilt.y) * Math.min(1, dt * 3);
      root.rotation.y = tilt.x;
      root.rotation.x = BASE_TILT - tilt.y;
      shield.rotation.x = -root.rotation.x;
      shield.rotation.y = Math.sin(elapsed * 0.45) * 0.55 - tilt.x * 0.5;
    }
    const eased = 1 - Math.pow(1 - grow, 3);
    const w = canvas.clientWidth, h = canvas.clientHeight;

    pivots.forEach((p) => p.scale.setScalar(Math.max(eased, 0.001)));
    sats.forEach((s, i) => {
      if (!reduce) s.angle += s.ring.speed * dt * speed;
      const a = s.phase + s.angle;
      s.holder.position.set(Math.cos(a) * s.ring.radius, 0, Math.sin(a) * s.ring.radius);
      const target = i === active ? 1.45 : 1;
      s.scale += (target - s.scale) * (reduce ? 1 : Math.min(1, dt * 10));
      const pos = s.beam.geometry.attributes.position;
      pos.setXYZ(1, s.holder.position.x, 0, s.holder.position.z);
      pos.needsUpdate = true;

      s.holder.getWorldPosition(v);
      s.depth = v.z;
      // Μετριάζουμε την προοπτική, ώστε τα πίσω λογότυπα να μη μικραίνουν υπερβολικά.
      const k = s.scale * (1 + 0.6 * ((camera.position.z - v.z) / camera.position.z - 1));
      s.mesh.scale.setScalar(ICON * k);
      s.glow.scale.setScalar(1.7 * k);
      v.project(camera);
      s.x = (v.x * 0.5 + 0.5) * w;
      s.y = (-v.y * 0.5 + 0.5) * h;
    });

    // Ετικέτες: μπροστινές πρώτα· όποια πέφτει πάνω σε άλλη ή είναι πίσω από την ασπίδα κρύβεται.
    placed.length = 0;
    // Εμπόδια: η ασπίδα και οι ίδιοι οι πυλώνες.
    const unit = h / 2 / (camera.position.z * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)));
    placed.push([w / 2 - 1.1 * unit, h / 2 - 1.4 * unit, w / 2 + 1.1 * unit, h / 2 + 1.4 * unit, -1]);
    sats.forEach((s, i) => placed.push([s.x - 22, s.y - 22, s.x + 22, s.y + 22, i]));
    order.sort((a, b) => (b === active) - (a === active) || sats[b].depth - sats[a].depth);
    order.forEach((i) => {
      const s = sats[i];
      if (!s.lw) s.lw = s.label.offsetWidth;
      // Η ετικέτα ανοίγει προς τα έξω (μακριά από την ασπίδα), εκτός αν δεν χωράει.
      let left = s.x < w / 2;
      if (left && s.x - 24 - s.lw < 0) left = false;
      if (!left && s.x + 24 + s.lw > w) left = true;
      const x0 = left ? s.x - 24 - s.lw : s.x + 24;
      const box = [x0 - 4, s.y - 14, x0 + s.lw + 4, s.y + 14];
      const hidden = i !== active && (s.depth < -1.3 || placed.some((b) => b[4] !== i && box[0] < b[2] && box[2] > b[0] && box[1] < b[3] && box[3] > b[1]));
      if (!hidden) placed.push(box);
      s.label.style.transform = `translate(${x0.toFixed(1)}px, ${s.y.toFixed(1)}px) translateY(-50%)`;
      s.label.style.opacity = hidden ? 0 : i === active ? 1 : (eased * THREE.MathUtils.clamp(0.7 + s.depth * 0.12, 0.4, 1)).toFixed(2);
      s.label.style.pointerEvents = hidden ? 'none' : '';
    });

    renderer.render(scene, camera);
    dirty = false;
    schedule();
  }
  function schedule() {
    if (raf || !visible || document.hidden) return;
    if (reduce && !dirty) return;
    raf = requestAnimationFrame(frame);
  }
  // Με «μειωμένη κίνηση» δεν τρέχει loop: ζωγραφίζουμε μόνο όταν αλλάζει κάτι.
  if (reduce) setInterval(schedule, 120);

  new IntersectionObserver((entries) => {
    visible = entries[0].isIntersecting;
    clock.getDelta();
    schedule();
  }).observe(stage);
  document.addEventListener('visibilitychange', () => { clock.getDelta(); schedule(); });

  frame();
  stage.classList.add('is-live');

  return { setActive: (i) => setActive(i, true) };
}
