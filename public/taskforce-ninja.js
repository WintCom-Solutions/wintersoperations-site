/**
 * Task Force Ninja — global busy / thinking indicator + hover help + play attacks.
 *
 * API:
 *   TaskForceNinja.show / .hide / .setMessage / .busy
 *   TaskForceNinja.helpMode / .disable / .enable
 *   TaskForceNinja.nextWeapon / .setWeapon
 *   TaskForceNinja.setGender('male'|'female') / .gender
 *
 * UX:
 *   - Drag body to set home (persisted)
 *   - Click body: cycle weapons
 *   - Double-click body: toggle help mode
 *   - Gender button: swap male ↔ female
 *   - × or right-click: fully disable
 *   PLAY (when bored):
 *     Shift+click anywhere  → attack with current weapon
 *       • shuriken → throw packet stars at the click point
 *       • katana   → drag to slash-cut the dashboard
 *       • sai      → close-range poke impact
 *       • staff    → shockwave strike
 */
(function () {
  const QUOTES = [
    "Task Force Ninja on the case!",
    "Tracing hops… don't drop packets on me",
    "Consulting the ancient CDP scrolls…",
    "One hop at a time, sensei",
    "Cable management is a martial art",
    "SSH-ing in silence…",
    "Meraki-san, grant me low latency",
    "Waiting for traceroute… patience",
    "Ninja-ing through your ACL",
    "Ping of life, not death",
    "LLDP whispers in the dark",
    "Sniffing packets, not drama",
    "BGP is just gossip with ASNs",
    "Your MTU is showing",
    "Silencing the broadcast storm",
    "Katana of pure fiber optics",
    "Stealth mode: 802.1X engaged",
    "No packet left behind",
    "The path is the way",
    "Workbench warming up…",
    "Counting VLANs instead of sheep",
    "QoS? More like Quality of Stealth",
    "NAT is just identity theft for packets",
    "Spanning Tree: still waiting for consensus",
    "Fiber > copper. Always.",
    "Checking if the cable is plugged in… both ends",
    "Have you tried turning the switch off and on?",
    "DNS is down? Blame the coffee",
    "ARP cache? Cleared. Ego? Intact.",
    "Running Full Sweep — stand clear",
  ];

  const ATTACK_QUOTES = {
    shuriken: [
      'Packet shuriken away!',
      'Multi-target spray — eat star, dashboard.',
      'Shuriken locked. Chunks incoming.',
      'Three stars, one bored ninja.',
    ],
    katana: [
      'Clean cut through the dashboard.',
      'Katana of pure fiber optics — slice.',
      'Path severed. Packets scattered.',
      'One stroke. Dashboard divided.',
    ],
    sai: [
      'Sai poke — precise and annoying.',
      'Close-range ACL surgery.',
      'Dual sai: pin and punish.',
    ],
    staff: [
      'Fiber staff shockwave!',
      'Hop measured. Dashboard rattled.',
      'Staff strike — feel the latency.',
    ],
  };

  const WEAPONS = [
    { id: 'katana', label: 'Katana', quote: 'Katana of pure fiber optics — one clean cut through the path.' },
    { id: 'sai', label: 'Dual Sai', quote: 'Dual sai locked. Close-range ACL surgery.' },
    { id: 'staff', label: 'Fiber Staff', quote: 'Fiber staff extended. Ready to measure every hop.' },
    { id: 'shuriken', label: 'Packet Shuriken', quote: 'Packet shuriken online. Multi-target spray engaged.' },
  ];

  const WEAPON_SVG = `
  <g class="tf-weapon" data-weapon="katana">
    <g transform="translate(68,30) rotate(-35)">
      <rect x="0" y="0" width="3" height="28" rx="1" fill="#00d4aa"/>
      <rect x="-2" y="26" width="7" height="5" rx="1" fill="#1a222c"/>
      <circle cx="1.5" cy="2" r="2" fill="#00ffd0"/>
    </g>
  </g>
  <g class="tf-weapon" data-weapon="sai" style="display:none">
    <g transform="translate(18,48) rotate(-25)">
      <rect x="0" y="0" width="2.2" height="18" rx="1" fill="#00d4aa"/>
      <path d="M-3 2 L0 6 L3 2" fill="none" stroke="#00d4aa" stroke-width="1.6" stroke-linecap="round"/>
      <circle cx="1.1" cy="1" r="1.6" fill="#00ffd0"/>
    </g>
    <g transform="translate(76,48) rotate(25)">
      <rect x="0" y="0" width="2.2" height="18" rx="1" fill="#00d4aa"/>
      <path d="M-3 2 L0 6 L3 2" fill="none" stroke="#00d4aa" stroke-width="1.6" stroke-linecap="round"/>
      <circle cx="1.1" cy="1" r="1.6" fill="#00ffd0"/>
    </g>
  </g>
  <g class="tf-weapon" data-weapon="staff" style="display:none">
    <g transform="translate(16,22) rotate(38)">
      <rect x="0" y="0" width="2.4" height="52" rx="1.2" fill="#00d4aa" opacity="0.95"/>
      <circle cx="1.2" cy="2" r="2.2" fill="#00ffd0"/>
      <circle cx="1.2" cy="50" r="2.2" fill="#00ffd0"/>
      <line x1="1.2" y1="8" x2="1.2" y2="44" stroke="#00ffd0" stroke-width="0.8" stroke-dasharray="3 3" opacity="0.7">
        <animate attributeName="stroke-dashoffset" from="0" to="12" dur="0.8s" repeatCount="indefinite"/>
      </line>
    </g>
  </g>
  <g class="tf-weapon" data-weapon="shuriken" style="display:none">
    <g transform="translate(20,36)">
      <path d="M0 -7 L2 -2 L7 0 L2 2 L0 7 L-2 2 L-7 0 L-2 -2 Z" fill="#00d4aa" opacity="0.9"/>
      <circle cx="0" cy="0" r="1.8" fill="#00ffd0"/>
    </g>
    <g transform="translate(76,40)">
      <path d="M0 -6 L1.8 -1.8 L6 0 L1.8 1.8 L0 6 L-1.8 1.8 L-6 0 L-1.8 -1.8 Z" fill="#00d4aa" opacity="0.85"/>
      <circle cx="0" cy="0" r="1.5" fill="#00ffd0"/>
    </g>
    <g transform="translate(48,18)">
      <path d="M0 -5 L1.5 -1.5 L5 0 L1.5 1.5 L0 5 L-1.5 1.5 L-5 0 L-1.5 -1.5 Z" fill="#00d4aa" opacity="0.8"/>
      <circle cx="0" cy="0" r="1.3" fill="#00ffd0"/>
      <animateTransform attributeName="transform" type="rotate" from="0 0 0" to="360 0 0" dur="3s" repeatCount="indefinite"/>
    </g>
  </g>`;

  const SVG_MALE = `
<svg class="tf-ninja-svg" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <ellipse cx="48" cy="88" rx="22" ry="4" fill="rgba(0,0,0,0.35)"/>
  <g class="tf-legs">
    <path d="M40 62 L36 82 L42 82 L46 64 Z" fill="#0d1117"/>
    <path d="M56 62 L60 82 L54 82 L50 64 Z" fill="#0d1117"/>
    <rect x="34" y="80" width="10" height="4" rx="1.5" fill="#00d4aa"/>
    <rect x="52" y="80" width="10" height="4" rx="1.5" fill="#00d4aa"/>
  </g>
  <path d="M32 38 Q48 30 64 38 L62 64 Q48 70 34 64 Z" fill="#12171e" stroke="#1a222c" stroke-width="1.5"/>
  <circle cx="48" cy="50" r="7" fill="#0b0e11" stroke="#00d4aa" stroke-width="1.4"/>
  <circle cx="48" cy="50" r="2.2" fill="#00ffd0"/>
  <line x1="48" y1="43" x2="48" y2="40" stroke="#00d4aa" stroke-width="1.2"/>
  <line x1="48" y1="57" x2="48" y2="60" stroke="#00d4aa" stroke-width="1.2"/>
  <line x1="41" y1="50" x2="38" y2="50" stroke="#00d4aa" stroke-width="1.2"/>
  <line x1="55" y1="50" x2="58" y2="50" stroke="#00d4aa" stroke-width="1.2"/>
  <path d="M32 42 L22 52 L26 54 L36 46 Z" fill="#12171e"/>
  <path d="M64 42 L74 52 L70 54 L60 46 Z" fill="#12171e"/>
  ${WEAPON_SVG}
  <ellipse cx="48" cy="26" rx="14" ry="13" fill="#0d1117"/>
  <path d="M34 24 Q48 18 62 24 L60 30 Q48 26 36 30 Z" fill="#12171e"/>
  <ellipse cx="42" cy="26" rx="3.2" ry="2.2" fill="#00ffd0">
    <animate attributeName="opacity" values="1;0.55;1" dur="1.6s" repeatCount="indefinite"/>
  </ellipse>
  <ellipse cx="54" cy="26" rx="3.2" ry="2.2" fill="#00ffd0">
    <animate attributeName="opacity" values="1;0.55;1" dur="1.6s" repeatCount="indefinite"/>
  </ellipse>
  <path d="M62 22 L70 16 M62 24 L72 22" stroke="#00d4aa" stroke-width="1.6" stroke-linecap="round"/>
  <path d="M34 40 Q20 48 18 60" fill="none" stroke="#00d4aa" stroke-width="1.5" stroke-linecap="round" opacity="0.55" stroke-dasharray="3 3">
    <animate attributeName="stroke-dashoffset" from="0" to="12" dur="0.6s" repeatCount="indefinite"/>
  </path>
</svg>`;

  const SVG_FEMALE = `
<svg class="tf-ninja-svg" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <ellipse cx="48" cy="88" rx="22" ry="4" fill="rgba(0,0,0,0.35)"/>
  <g class="tf-legs">
    <path d="M41 62 L37 82 L43 82 L47 64 Z" fill="#0d1117"/>
    <path d="M55 62 L59 82 L53 82 L49 64 Z" fill="#0d1117"/>
    <rect x="35" y="80" width="10" height="4" rx="1.5" fill="#00d4aa"/>
    <rect x="51" y="80" width="10" height="4" rx="1.5" fill="#00d4aa"/>
  </g>
  <path d="M34 38 Q48 29 62 38 L60 64 Q48 69 36 64 Z" fill="#12171e" stroke="#1a222c" stroke-width="1.5"/>
  <circle cx="48" cy="50" r="6.5" fill="#0b0e11" stroke="#00d4aa" stroke-width="1.4"/>
  <circle cx="48" cy="50" r="2" fill="#00ffd0"/>
  <line x1="48" y1="43.5" x2="48" y2="40.5" stroke="#00d4aa" stroke-width="1.2"/>
  <line x1="48" y1="56.5" x2="48" y2="59.5" stroke="#00d4aa" stroke-width="1.2"/>
  <line x1="41.5" y1="50" x2="38.5" y2="50" stroke="#00d4aa" stroke-width="1.2"/>
  <line x1="54.5" y1="50" x2="57.5" y2="50" stroke="#00d4aa" stroke-width="1.2"/>
  <path d="M34 42 L24 51 L28 53 L38 45 Z" fill="#12171e"/>
  <path d="M62 42 L72 51 L68 53 L58 45 Z" fill="#12171e"/>
  ${WEAPON_SVG}
  <ellipse cx="48" cy="25" rx="13.5" ry="12.5" fill="#0d1117"/>
  <path d="M32 22 L26 12 L30 20 Z" fill="#0d1117"/>
  <path d="M26 12 L24 8 L29 18" fill="none" stroke="#00d4aa" stroke-width="1.4" stroke-linecap="round"/>
  <path d="M64 22 L70 10 L66 20 Z" fill="#0d1117"/>
  <path d="M70 10 L73 6 L67 18" fill="none" stroke="#00d4aa" stroke-width="1.4" stroke-linecap="round"/>
  <path d="M40 14 L36 6 L42 13" fill="#0d1117"/>
  <path d="M36 6 L34 2 L40 12" fill="none" stroke="#00ffd0" stroke-width="1.2" stroke-linecap="round"/>
  <path d="M35 24 Q48 18 61 24 L59 29 Q48 25 37 29 Z" fill="#12171e"/>
  <ellipse cx="42" cy="26" rx="3.2" ry="2.2" fill="#00ffd0">
    <animate attributeName="opacity" values="1;0.55;1" dur="1.6s" repeatCount="indefinite"/>
  </ellipse>
  <ellipse cx="54" cy="26" rx="3.2" ry="2.2" fill="#00ffd0">
    <animate attributeName="opacity" values="1;0.55;1" dur="1.6s" repeatCount="indefinite"/>
  </ellipse>
  <path d="M34 40 Q20 48 18 60" fill="none" stroke="#00d4aa" stroke-width="1.5" stroke-linecap="round" opacity="0.55" stroke-dasharray="3 3">
    <animate attributeName="stroke-dashoffset" from="0" to="12" dur="0.6s" repeatCount="indefinite"/>
  </path>
</svg>`;

  const SHURIKEN_SVG = `<svg viewBox="0 0 24 24" width="22" height="22" xmlns="http://www.w3.org/2000/svg"><path d="M12 1 L14.5 8.5 L22 11 L14.5 13.5 L12 21 L9.5 13.5 L2 11 L9.5 8.5 Z" fill="#00d4aa"/><circle cx="12" cy="11" r="2.2" fill="#00ffd0"/></svg>`;

  let root = null;
  let msgEl = null;
  let stageEl = null;
  let summonBtn = null;
  let quoteTimer = null;
  let dashTimer = null;
  let refCount = 0;
  let lastQuote = -1;
  let autoJobShown = false;
  let weaponIndex = 0;
  let gender = 'male';

  let disabled = false;
  let helpMode = true;
  let homePos = null;

  try {
    disabled = localStorage.getItem('tf_ninja_disabled') === '1';
    const savedHome = localStorage.getItem('tf_ninja_home');
    if (savedHome) homePos = JSON.parse(savedHome);
    const savedHelp = localStorage.getItem('tf_ninja_help');
    if (savedHelp === '0') helpMode = false;
    const savedWeapon = localStorage.getItem('tf_ninja_weapon');
    if (savedWeapon) {
      const idx = WEAPONS.findIndex(function (w) { return w.id === savedWeapon; });
      if (idx >= 0) weaponIndex = idx;
    }
    const savedGender = localStorage.getItem('tf_ninja_gender');
    if (savedGender === 'female' || savedGender === 'male') gender = savedGender;
  } catch (e) {}

  let helpActive = false;
  let helpTarget = null;
  let helpHideTimer = null;
  let helpEnterTimer = null;
  let reducedMotion = false;

  let dragging = false;
  let dragOffsetX = 0;
  let dragOffsetY = 0;
  let dragMoved = false;

  // Play / attack state
  let slashActive = false;
  let slashStartX = 0;
  let slashStartY = 0;
  let slashLineEl = null;

  try {
    reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  } catch (e) {}

  function currentSvg() {
    return gender === 'female' ? SVG_FEMALE : SVG_MALE;
  }

  function currentWeaponId() {
    return WEAPONS[weaponIndex].id;
  }

  function pickAttackQuote(weaponId) {
    const list = ATTACK_QUOTES[weaponId] || ATTACK_QUOTES.shuriken;
    return list[Math.floor(Math.random() * list.length)];
  }

  function saveHome(left, top) {
    homePos = { left: Math.round(left), top: Math.round(top) };
    try { localStorage.setItem('tf_ninja_home', JSON.stringify(homePos)); } catch (e) {}
  }

  function applyHomePosition() {
    if (!root) return;
    if (homePos && typeof homePos.left === 'number' && typeof homePos.top === 'number') {
      root.style.right = 'auto';
      root.style.bottom = 'auto';
      root.style.left = homePos.left + 'px';
      root.style.top = homePos.top + 'px';
    } else {
      root.style.left = 'auto';
      root.style.top = 'auto';
      root.style.right = '28px';
      root.style.bottom = '28px';
    }
  }

  function goHome() {
    if (!root) return;
    root.classList.remove('jump', 'climb', 'roll', 'dash', 'glide');
    applyHomePosition();
  }

  function applyWeapon() {
    if (!root) return;
    const groups = root.querySelectorAll('.tf-weapon');
    const current = WEAPONS[weaponIndex];
    groups.forEach(function (g) {
      g.style.display = g.getAttribute('data-weapon') === current.id ? '' : 'none';
    });
    try { localStorage.setItem('tf_ninja_weapon', current.id); } catch (e) {}
  }

  function applyGender() {
    if (!stageEl) return;
    const ground = stageEl.querySelector('.tf-ground');
    const dust = stageEl.querySelector('.tf-dust');
    stageEl.innerHTML = currentSvg();
    if (ground) stageEl.appendChild(ground);
    else {
      const g = document.createElement('div');
      g.className = 'tf-ground';
      stageEl.appendChild(g);
    }
    if (dust) stageEl.appendChild(dust);
    else {
      const d = document.createElement('div');
      d.className = 'tf-dust';
      stageEl.appendChild(d);
    }
    applyWeapon();
    try { localStorage.setItem('tf_ninja_gender', gender); } catch (e) {}
    const btn = root && root.querySelector('.tf-gender');
    if (btn) {
      btn.textContent = gender === 'female' ? '♀' : '♂';
      btn.title = gender === 'female' ? 'Switch to male ninja' : 'Switch to female ninja';
    }
  }

  function setGender(g) {
    if (g !== 'male' && g !== 'female') return gender;
    gender = g;
    applyGender();
    setMessage(gender === 'female'
      ? 'Female operative online. Same rules. More attitude.'
      : 'Male operative online. Standing by.');
    show();
    setTimeout(function () { if (refCount === 1) hide(); }, 2400);
    return gender;
  }

  function toggleGender() {
    return setGender(gender === 'female' ? 'male' : 'female');
  }

  function nextWeapon() {
    weaponIndex = (weaponIndex + 1) % WEAPONS.length;
    applyWeapon();
    const w = WEAPONS[weaponIndex];
    setMessage(w.quote);
    show();
    setTimeout(function () { if (refCount === 1) hide(); }, 2600);
    return w;
  }

  function setWeapon(id) {
    const idx = WEAPONS.findIndex(function (w) { return w.id === id; });
    if (idx < 0) return null;
    weaponIndex = idx;
    applyWeapon();
    return WEAPONS[weaponIndex];
  }

  // ── Play attacks ──────────────────────────────────────────────

  function getNinjaCenter() {
    if (!root) {
      return { x: window.innerWidth - 70, y: window.innerHeight - 70 };
    }
    const r = root.getBoundingClientRect();
    return { x: r.left + r.width / 2, y: r.top + r.height * 0.4 };
  }

  function spawnImpact(x, y, big) {
    const el = document.createElement('div');
    el.className = 'tf-impact' + (big ? ' tf-impact-big' : '');
    el.style.left = x + 'px';
    el.style.top = y + 'px';
    document.body.appendChild(el);
    setTimeout(function () { if (el.parentNode) el.parentNode.removeChild(el); }, 500);
  }

  function throwShuriken(tx, ty) {
    ensureDom();
    const from = getNinjaCenter();
    const count = 1 + Math.floor(Math.random() * 3); // 1–3 stars
    for (let i = 0; i < count; i++) {
      (function (delay, jitterX, jitterY) {
        setTimeout(function () {
          const star = document.createElement('div');
          star.className = 'tf-shuriken-fly';
          star.innerHTML = SHURIKEN_SVG;
          star.style.left = from.x + 'px';
          star.style.top = from.y + 'px';
          document.body.appendChild(star);
          // force layout then fly
          void star.offsetWidth;
          const dx = (tx + jitterX) - from.x;
          const dy = (ty + jitterY) - from.y;
          star.style.transform = 'translate(' + dx + 'px,' + dy + 'px) rotate(720deg)';
          star.style.opacity = '0.15';
          setTimeout(function () {
            spawnImpact(tx + jitterX, ty + jitterY, false);
            markHitAt(tx + jitterX, ty + jitterY);
            if (star.parentNode) star.parentNode.removeChild(star);
          }, 380);
        }, delay);
      })(i * 70, (Math.random() - 0.5) * 28, (Math.random() - 0.5) * 28);
    }
    // ninja reacts
    if (root) {
      root.classList.add('on', 'dash');
      setTimeout(function () { if (root) root.classList.remove('dash'); }, 500);
    }
    setMessage(pickAttackQuote('shuriken'));
    show();
    setTimeout(function () { if (refCount === 1) hide(); }, 1600);
  }

  function doSlash(x1, y1, x2, y2) {
    ensureDom();
    const dx = x2 - x1;
    const dy = y2 - y1;
    const len = Math.hypot(dx, dy) || 1;
    const angle = Math.atan2(dy, dx) * (180 / Math.PI);

    const slash = document.createElement('div');
    slash.className = 'tf-slash';
    slash.style.left = x1 + 'px';
    slash.style.top = y1 + 'px';
    slash.style.width = len + 'px';
    slash.style.transform = 'rotate(' + angle + 'deg)';
    document.body.appendChild(slash);

    // sample points along the slash and scar the dashboard
    const steps = Math.max(4, Math.floor(len / 40));
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const px = x1 + dx * t;
      const py = y1 + dy * t;
      markHitAt(px, py, true);
      if (i % 2 === 0) spawnImpact(px, py, i === 0 || i === steps);
    }

    if (root) {
      root.classList.add('on', 'jump');
      setTimeout(function () { if (root) root.classList.remove('jump'); }, 550);
    }

    setTimeout(function () {
      if (slash.parentNode) slash.parentNode.removeChild(slash);
    }, 520);

    setMessage(pickAttackQuote('katana'));
    show();
    setTimeout(function () { if (refCount === 1) hide(); }, 1800);
  }

  function doPoke(x, y) {
    ensureDom();
    spawnImpact(x, y, true);
    markHitAt(x, y, true);
    if (root) {
      root.classList.add('on', 'dash');
      setTimeout(function () { if (root) root.classList.remove('dash'); }, 500);
    }
    setMessage(pickAttackQuote('sai'));
    show();
    setTimeout(function () { if (refCount === 1) hide(); }, 1400);
  }

  function doStaffStrike(x, y) {
    ensureDom();
    const wave = document.createElement('div');
    wave.className = 'tf-shockwave';
    wave.style.left = x + 'px';
    wave.style.top = y + 'px';
    document.body.appendChild(wave);
    spawnImpact(x, y, true);
    markHitAt(x, y, true);
    // secondary ring hits nearby
    setTimeout(function () {
      markHitAt(x + 40, y, false);
      markHitAt(x - 40, y, false);
      markHitAt(x, y + 40, false);
      markHitAt(x, y - 40, false);
    }, 120);
    setTimeout(function () {
      if (wave.parentNode) wave.parentNode.removeChild(wave);
    }, 600);
    if (root) {
      root.classList.add('on', 'jump');
      setTimeout(function () { if (root) root.classList.remove('jump'); }, 550);
    }
    setMessage(pickAttackQuote('staff'));
    show();
    setTimeout(function () { if (refCount === 1) hide(); }, 1600);
  }

  function markHitAt(x, y, isCut) {
    try {
      const els = document.elementsFromPoint(x, y);
      for (let i = 0; i < els.length; i++) {
        const el = els[i];
        if (!el || el === root || (root && root.contains(el))) continue;
        if (el === document.body || el === document.documentElement) continue;
        if (el.classList && (
          el.classList.contains('tf-shuriken-fly') ||
          el.classList.contains('tf-impact') ||
          el.classList.contains('tf-slash') ||
          el.classList.contains('tf-shockwave') ||
          el.classList.contains('tf-cut-scar')
        )) continue;
        // only scar reasonably sized UI chunks
        const r = el.getBoundingClientRect();
        if (r.width < 20 || r.height < 12) continue;
        if (r.width > window.innerWidth * 0.95 && r.height > window.innerHeight * 0.95) continue;

        el.classList.add(isCut ? 'tf-cut-scar' : 'tf-hit-flash');
        setTimeout(function () {
          el.classList.remove('tf-cut-scar');
          el.classList.remove('tf-hit-flash');
        }, isCut ? 2200 : 500);
        break; // one element per point is enough
      }
    } catch (e) {}
  }

  function onPlayPointerDown(e) {
    if (disabled || !e.shiftKey || e.button !== 0) return;
    if (root && root.contains(e.target)) return; // don't attack while on the ninja
    if (summonBtn && (e.target === summonBtn || summonBtn.contains(e.target))) return;

    const weapon = currentWeaponId();
    if (weapon === 'katana') {
      e.preventDefault();
      slashActive = true;
      slashStartX = e.clientX;
      slashStartY = e.clientY;
      // live preview line
      if (slashLineEl && slashLineEl.parentNode) slashLineEl.parentNode.removeChild(slashLineEl);
      slashLineEl = document.createElement('div');
      slashLineEl.className = 'tf-slash tf-slash-preview';
      slashLineEl.style.left = slashStartX + 'px';
      slashLineEl.style.top = slashStartY + 'px';
      slashLineEl.style.width = '0px';
      document.body.appendChild(slashLineEl);
    }
  }

  function onPlayPointerMove(e) {
    if (!slashActive || !slashLineEl) return;
    const dx = e.clientX - slashStartX;
    const dy = e.clientY - slashStartY;
    const len = Math.hypot(dx, dy);
    const angle = Math.atan2(dy, dx) * (180 / Math.PI);
    slashLineEl.style.width = len + 'px';
    slashLineEl.style.transform = 'rotate(' + angle + 'deg)';
  }

  function onPlayPointerUp(e) {
    if (!slashActive) return;
    slashActive = false;
    if (slashLineEl && slashLineEl.parentNode) {
      slashLineEl.parentNode.removeChild(slashLineEl);
      slashLineEl = null;
    }
    const dist = Math.hypot(e.clientX - slashStartX, e.clientY - slashStartY);
    if (dist < 24) {
      // short drag = still a cut from ninja toward click
      const from = getNinjaCenter();
      (window.TaskForceNinja ? window.TaskForceNinja.doSlash : doSlash)(from.x, from.y, e.clientX, e.clientY);
    } else {
      (window.TaskForceNinja ? window.TaskForceNinja.doSlash : doSlash)(slashStartX, slashStartY, e.clientX, e.clientY);
    }
  }

  function onPlayClick(e) {
    if (disabled || !e.shiftKey || e.button !== 0) return;
    if (root && root.contains(e.target)) return;
    if (summonBtn && (e.target === summonBtn || summonBtn.contains(e.target))) return;

    const weapon = currentWeaponId();
    // katana is handled by pointerdown/up drag
    if (weapon === 'katana') return;

    e.preventDefault();
    e.stopPropagation();

    if (weapon === 'shuriken') {
      (window.TaskForceNinja ? window.TaskForceNinja.throwShuriken : throwShuriken)(e.clientX, e.clientY);
    } else if (weapon === 'sai') {
      (window.TaskForceNinja ? window.TaskForceNinja.doPoke : doPoke)(e.clientX, e.clientY);
    } else if (weapon === 'staff') {
      (window.TaskForceNinja ? window.TaskForceNinja.doStaffStrike : doStaffStrike)(e.clientX, e.clientY);
    }
  }

  function installPlayAttacks() {
    document.addEventListener('pointerdown', onPlayPointerDown, true);
    document.addEventListener('pointermove', onPlayPointerMove, true);
    document.addEventListener('pointerup', onPlayPointerUp, true);
    document.addEventListener('click', onPlayClick, true);
  }

  // ── DOM ───────────────────────────────────────────────────────

  function ensureDom() {
    if (root) return;
    root = document.createElement('div');
    root.id = 'tf-ninja';
    root.setAttribute('aria-live', 'polite');
    root.setAttribute('aria-atomic', 'true');
    root.innerHTML =
      '<div class="tf-bubble">' +
      '<button type="button" class="tf-gender" title="Switch gender">' + (gender === 'female' ? '♀' : '♂') + '</button>' +
      '<button type="button" class="tf-close" title="Disable Ninja" aria-label="Disable Ninja">×</button>' +
      '<span class="tf-tag">Task Force Ninja</span>' +
      '<span class="tf-msg" id="tf-ninja-msg">Standing by…</span>' +
      '</div>' +
      '<div class="tf-stage" title="Click: weapon · Shift+click page: attack · Drag: move · Dbl-click: help · Right-click: disable">' +
      currentSvg() +
      '<div class="tf-ground"></div><div class="tf-dust"></div></div>';
    document.body.appendChild(root);
    msgEl = document.getElementById('tf-ninja-msg');
    stageEl = root.querySelector('.tf-stage');

    applyHomePosition();
    applyWeapon();

    const genderBtn = root.querySelector('.tf-gender');
    if (genderBtn) {
      genderBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        toggleGender();
      });
    }

    const closeBtn = root.querySelector('.tf-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        disable();
      });
    }

    stageEl.addEventListener('dblclick', function (e) {
      e.preventDefault();
      e.stopPropagation();
      if (dragging || dragMoved) return;
      helpMode = !helpMode;
      try { localStorage.setItem('tf_ninja_help', helpMode ? '1' : '0'); } catch (err) {}
      if (!helpMode) {
        leaveHelp();
        setMessage('Help mode off — double-click me to turn explanations back on');
      } else {
        setMessage('Help mode on. Hover anything and I will explain.');
      }
      show();
      setTimeout(function () { if (refCount === 1) hide(); }, 2400);
    });

    stageEl.addEventListener('click', function (e) {
      if (dragging || dragMoved) return;
      e.stopPropagation();
      nextWeapon();
    });

    root.addEventListener('contextmenu', function (e) {
      e.preventDefault();
      disable();
    });

    stageEl.addEventListener('pointerdown', function (e) {
      if (e.button !== 0) return;
      e.preventDefault();
      e.stopPropagation();
      dragging = true;
      dragMoved = false;
      const rect = root.getBoundingClientRect();
      dragOffsetX = e.clientX - rect.left;
      dragOffsetY = e.clientY - rect.top;
      root.classList.add('dragging');
      root.classList.add('on');
      root.style.transition = 'none';
      stageEl.setPointerCapture(e.pointerId);
    });

    stageEl.addEventListener('pointermove', function (e) {
      if (!dragging) return;
      dragMoved = true;
      leaveHelp();
      let nx = e.clientX - dragOffsetX;
      let ny = e.clientY - dragOffsetY;
      const maxX = window.innerWidth - root.offsetWidth - 4;
      const maxY = window.innerHeight - root.offsetHeight - 4;
      nx = Math.max(4, Math.min(nx, maxX));
      ny = Math.max(4, Math.min(ny, maxY));
      root.style.right = 'auto';
      root.style.bottom = 'auto';
      root.style.left = nx + 'px';
      root.style.top = ny + 'px';
    });

    function endDrag(e) {
      if (!dragging) return;
      dragging = false;
      root.classList.remove('dragging');
      root.style.transition = '';
      try { stageEl.releasePointerCapture(e.pointerId); } catch (err) {}
      if (dragMoved) {
        const rect = root.getBoundingClientRect();
        saveHome(rect.left, rect.top);
        setMessage('New hangout locked in.');
        show();
        setTimeout(function () { if (refCount === 1) hide(); }, 1800);
      }
      setTimeout(function () { dragMoved = false; }, 50);
    }

    stageEl.addEventListener('pointerup', endDrag);
    stageEl.addEventListener('pointercancel', endDrag);
  }

  function ensureSummonButton() {
    if (summonBtn) return;
    summonBtn = document.createElement('button');
    summonBtn.id = 'tf-ninja-summon';
    summonBtn.type = 'button';
    summonBtn.title = 'Summon Task Force Ninja';
    summonBtn.setAttribute('aria-label', 'Summon Task Force Ninja');
    summonBtn.innerHTML = '🥷';
    summonBtn.addEventListener('click', function () { enable(); });
    document.body.appendChild(summonBtn);
  }

  function removeSummonButton() {
    if (summonBtn && summonBtn.parentNode) summonBtn.parentNode.removeChild(summonBtn);
    summonBtn = null;
  }

  function disable() {
    disabled = true;
    try { localStorage.setItem('tf_ninja_disabled', '1'); } catch (e) {}
    leaveHelp();
    forceHide();
    if (root) {
      root.classList.remove('on');
      root.style.display = 'none';
    }
    ensureSummonButton();
  }

  function enable() {
    disabled = false;
    try { localStorage.setItem('tf_ninja_disabled', '0'); } catch (e) {}
    removeSummonButton();
    ensureDom();
    if (root) root.style.display = '';
    applyHomePosition();
    applyGender();
    setMessage('Task Force Ninja reporting for duty');
    show();
    setTimeout(function () { if (refCount === 1) hide(); }, 2200);
  }

  function pickQuote(preferred) {
    if (preferred) return preferred;
    let i;
    do { i = Math.floor(Math.random() * QUOTES.length); } while (i === lastQuote && QUOTES.length > 1);
    lastQuote = i;
    return QUOTES[i];
  }

  function setMessage(msg) {
    if (disabled) return;
    ensureDom();
    if (msgEl) msgEl.textContent = msg || pickQuote();
  }

  function startQuoteRotation() {
    stopQuoteRotation();
    quoteTimer = setInterval(function () {
      if (refCount > 0 && !helpActive && !disabled) setMessage(pickQuote());
    }, 4200);
  }

  function stopQuoteRotation() {
    if (quoteTimer) { clearInterval(quoteTimer); quoteTimer = null; }
  }

  function startDashLoop() {
    stopDashLoop();
    dashTimer = setInterval(function () {
      if (!root || refCount <= 0 || helpActive || disabled || dragging) return;
      root.classList.add('dash');
      setTimeout(function () { if (root) root.classList.remove('dash'); }, 560);
    }, 5200);
  }

  function stopDashLoop() {
    if (dashTimer) { clearInterval(dashTimer); dashTimer = null; }
  }

  function show(msg) {
    if (disabled) return;
    ensureDom();
    refCount += 1;
    root.classList.add('on', 'running');
    if (!helpActive) setMessage(msg || pickQuote());
    if (refCount === 1) {
      startQuoteRotation();
      startDashLoop();
    }
  }

  function hide() {
    if (refCount > 0) refCount -= 1;
    if (refCount <= 0) {
      refCount = 0;
      if (root && !helpActive && !dragging) root.classList.remove('on', 'running', 'dash');
      stopQuoteRotation();
      stopDashLoop();
    }
  }

  function forceHide() {
    refCount = 0;
    autoJobShown = false;
    if (root && !helpActive && !dragging) root.classList.remove('on', 'running', 'dash');
    stopQuoteRotation();
    stopDashLoop();
  }

  async function busy(work, msg) {
    if (disabled) {
      if (typeof work === 'function') return await work();
      return await work;
    }
    show(msg);
    try {
      if (typeof work === 'function') return await work();
      return await work;
    } finally {
      hide();
    }
  }

  // ── Hover-help ────────────────────────────────────────────────

  function isInteractive(el) {
    if (!el || el === root || (root && root.contains(el))) return false;
    if (el === summonBtn) return false;
    const tag = (el.tagName || '').toLowerCase();
    if (['button', 'a', 'input', 'select', 'textarea', 'summary'].includes(tag)) return true;
    if (el.getAttribute('role') === 'button' || el.getAttribute('role') === 'link') return true;
    if (el.classList && (
      el.classList.contains('btn') ||
      el.classList.contains('wb-result-action') ||
      el.classList.contains('seam-workstream') ||
      el.classList.contains('ops-nav-item') ||
      el.classList.contains('ctx-target')
    )) return true;
    if (el.hasAttribute('data-tf-help') || el.hasAttribute('title') || el.hasAttribute('aria-label')) {
      const style = window.getComputedStyle(el);
      if (style.cursor === 'pointer' || el.onclick || el.getAttribute('tabindex') !== null) return true;
    }
    return false;
  }

  function getHelpText(el) {
    if (!el) return null;
    const custom = el.getAttribute('data-tf-help');
    if (custom) return custom;
    const title = el.getAttribute('title');
    if (title && title.length > 3) return title;
    const aria = el.getAttribute('aria-label');
    if (aria && aria.length > 3) return aria;

    const id = (el.id || '').toLowerCase();
    const cls = (el.className || '').toString().toLowerCase();
    const text = (el.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 40);

    if (id === 'wb-search-btn' || (text === 'Search' && cls.includes('btn'))) {
      return 'Runs subject search. Classifies IP / MAC / serial / hostname and hits the workbench API.';
    }
    if (id === 'wb-free-query' || id === 'wb-query') {
      return 'Type the smallest thing you know: hostname, IP, MAC, or Meraki serial.';
    }
    if (id === 'wb-org-select') {
      return 'Optional org scope. Leave on "All organizations" to search everywhere.';
    }
    if (cls.includes('seam-workstream')) {
      return 'Jump into this workstream. Subject / pipeline context is carried via ctx_* params when available.';
    }
    if (cls.includes('wb-result-action')) {
      return 'Quick handoff: opens this tool with the selected subject pre-filled.';
    }
    if (id.includes('traceroute') || text.toLowerCase().includes('traceroute')) {
      return 'Runs traceroute (from network gateway when possible). Source interface must be an IP, not "wan1".';
    }
    if (text.toLowerCase().includes('full sweep') || id.includes('sweep')) {
      return 'Orchestrates status + traceroute + DNS (+ optional port scan) with concurrency caps.';
    }
    if (cls.includes('btn-primary') || cls.includes('btn-danger')) {
      return text ? `Primary action: ${text}` : 'Primary action button.';
    }
    if (tagIs(el, 'a') && el.href) return text ? `Opens ${text}` : 'Navigation link.';
    if (tagIs(el, 'button')) return text ? `Button: ${text}` : 'Clickable control.';
    if (tagIs(el, 'input') || tagIs(el, 'select')) return text || el.placeholder || 'Input field.';
    if (text) return `This is the “${text}” control.`;
    return 'Interactive control — click or inspect to learn more.';
  }

  function tagIs(el, name) {
    return (el.tagName || '').toLowerCase() === name;
  }

  function pickMoveStyle(fromX, fromY, toX, toY) {
    if (reducedMotion) return 'glide';
    const dx = toX - fromX;
    const dy = toY - fromY;
    const dist = Math.hypot(dx, dy);
    if (dy < -80 && Math.abs(dx) < 120) return 'climb';
    if (dist > 280) return 'dash';
    if (Math.abs(dx) > 100 && Math.abs(dy) < 60) return 'roll';
    return 'jump';
  }

  function moveNinjaTo(targetEl, msg) {
    if (disabled || dragging) return;
    ensureDom();
    if (!root) return;

    const rect = targetEl.getBoundingClientRect();
    let tx = rect.right + 18;
    let ty = rect.top + rect.height / 2 - 50;
    const maxX = window.innerWidth - 160;
    const maxY = window.innerHeight - 140;
    if (tx > maxX) tx = rect.left - 140;
    if (tx < 12) tx = 12;
    if (ty < 12) ty = 12;
    if (ty > maxY) ty = maxY;

    const cur = root.getBoundingClientRect();
    const style = pickMoveStyle(cur.left, cur.top, tx, ty);

    root.style.right = 'auto';
    root.style.bottom = 'auto';
    root.style.left = tx + 'px';
    root.style.top = ty + 'px';
    root.classList.remove('jump', 'climb', 'roll', 'dash', 'glide');
    root.classList.add('on', style);
    setMessage(msg);
    helpActive = true;
    helpTarget = targetEl;

    clearTimeout(helpHideTimer);
    helpHideTimer = setTimeout(function () {
      if (helpTarget === targetEl) leaveHelp();
    }, 5500);
  }

  function leaveHelp() {
    clearTimeout(helpHideTimer);
    clearTimeout(helpEnterTimer);
    helpActive = false;
    helpTarget = null;
    if (!root || dragging) return;
    goHome();
    if (refCount <= 0) root.classList.remove('on', 'running');
  }

  function onPointerOver(e) {
    if (disabled || !helpMode || refCount > 0 || dragging) return;
    let el = e.target;
    for (let i = 0; i < 4 && el; i++) {
      if (isInteractive(el)) break;
      el = el.parentElement;
    }
    if (!el || !isInteractive(el)) return;
    clearTimeout(helpEnterTimer);
    helpEnterTimer = setTimeout(function () {
      if (disabled || !helpMode || refCount > 0 || dragging) return;
      const text = getHelpText(el);
      if (text) moveNinjaTo(el, text);
    }, 320);
  }

  function onPointerOut(e) {
    clearTimeout(helpEnterTimer);
    if (helpTarget && e.relatedTarget && helpTarget.contains(e.relatedTarget)) return;
    clearTimeout(helpHideTimer);
    helpHideTimer = setTimeout(function () { leaveHelp(); }, 380);
  }

  function installHoverHelp() {
    document.addEventListener('mouseover', onPointerOver, true);
    document.addEventListener('mouseout', onPointerOut, true);
  }

  // ── Busy hooks ────────────────────────────────────────────────

  function urlLooksLong(url) {
    const u = String(url || '');
    return /\/workbench\/api\//.test(u) || /\/api\/net\//.test(u) || /\/api\/meraki\//.test(u) ||
      /\/solarwinds\/api\//.test(u) || /\/meraki\/api\//.test(u) || /\/ports\/api\//.test(u) ||
      /\/discovery\/api\//.test(u) || /\/cisco\/api\//.test(u) || /\/audit\/api\//.test(u) ||
      (/status/.test(u) && /job|poll/i.test(u));
  }

  function messageForUrl(url) {
    const u = String(url || '');
    if (/workbench\/api\/search/.test(u)) return 'Subject lookup in progress…';
    if (/traceroute/.test(u)) return "Tracing hops… don't drop packets on me";
    if (/ping/.test(u)) return 'Ping of life, not death';
    if (/workbench/.test(u)) return 'Workbench warming up…';
    if (/solarwinds/.test(u)) return 'Consulting SolarWinds scrolls…';
    if (/meraki/.test(u)) return 'Meraki-san, grant me low latency';
    if (/discovery/.test(u)) return 'Consulting the ancient CDP scrolls…';
    return null;
  }

  function syncWithActiveJobs() {
    if (disabled) return;
    try {
      const raw = localStorage.getItem('console_active_jobs');
      if (!raw) {
        if (autoJobShown) { autoJobShown = false; hide(); }
        return;
      }
      const jobs = JSON.parse(raw);
      const active = Object.values(jobs).some(function (j) {
        return j && !['complete', 'error', 'cancelled'].includes(j.status);
      });
      if (active && !autoJobShown) {
        autoJobShown = true;
        show('Background jobs running…');
      } else if (!active && autoJobShown) {
        autoJobShown = false;
        hide();
      }
    } catch (e) {}
  }

  function installHooks() {
    const origFetch = window.fetch;
    if (origFetch && !origFetch.__tfNinja) {
      window.fetch = function (url, opts) {
        opts = opts || {};
        if (disabled) return origFetch(url, opts);
        const ninjaMsg = opts.ninja;
        const auto = !ninjaMsg && urlLooksLong(url);
        const msg = typeof ninjaMsg === 'string' ? ninjaMsg : (auto ? messageForUrl(url) : null);
        if (ninjaMsg || auto) {
          leaveHelp();
          show(msg);
          return origFetch(url, opts).finally(function () { hide(); });
        }
        return origFetch(url, opts);
      };
      window.fetch.__tfNinja = true;
    }

    document.addEventListener('click', function (e) {
      if (disabled) return;
      const btn = e.target && e.target.closest && e.target.closest('#wb-search-btn');
      if (!btn) return;
      leaveHelp();
      show('Subject lookup in progress…');
      setTimeout(function () { if (refCount === 1) hide(); }, 8000);
    }, true);

    setInterval(syncWithActiveJobs, 2500);
    installHoverHelp();
    installPlayAttacks();
  }

  function boot() {
    if (disabled) {
      ensureSummonButton();
      return;
    }
    ensureDom();
    installHooks();
    try {
      if (!sessionStorage.getItem('tf_ninja_seen')) {
        sessionStorage.setItem('tf_ninja_seen', '1');
        setTimeout(function () {
          show('Task Force Ninja reporting for duty — Shift+click to play');
          setTimeout(forceHide, 3200);
        }, 900);
      }
    } catch (e) {}
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

  window.TaskForceNinja = {
    show: show,
    hide: hide,
    forceHide: forceHide,
    setMessage: setMessage,
    busy: busy,
    quotes: QUOTES,
    weapons: WEAPONS,
    nextWeapon: nextWeapon,
    setWeapon: setWeapon,
    setGender: setGender,
    toggleGender: toggleGender,
    throwShuriken: throwShuriken,
    doSlash: doSlash,
    doPoke: doPoke,
    doStaffStrike: doStaffStrike,
    disable: disable,
    enable: enable,
    get helpMode() { return helpMode; },
    set helpMode(v) {
      helpMode = !!v;
      try { localStorage.setItem('tf_ninja_help', helpMode ? '1' : '0'); } catch (e) {}
      if (!helpMode) leaveHelp();
    },
    get disabled() { return disabled; },
    get weapon() { return WEAPONS[weaponIndex].id; },
    get gender() { return gender; },
  };
})();
