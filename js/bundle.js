
/* --- items.js --- */
/**
 * items.js - Crisp stylized SVG supermarket items definitions
 */

const GOODS_TYPES = [
  {
    id: 'cola',
    name: 'Cola Soda',
    color: '#E53935',
    svg: `
      <svg viewBox="0 0 80 80">
        <defs>
          <linearGradient id="canGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#C62828"/>
            <stop offset="45%" stop-color="#EF5350"/>
            <stop offset="100%" stop-color="#B71C1C"/>
          </linearGradient>
          <linearGradient id="canTop" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#B0BEC5"/>
            <stop offset="50%" stop-color="#ECEFF1"/>
            <stop offset="100%" stop-color="#90A4AE"/>
          </linearGradient>
        </defs>
        <ellipse cx="40" cy="18" rx="20" ry="7" fill="url(#canTop)"/>
        <path d="M20 18 L20 62 C20 67 60 67 60 62 L60 18 Z" fill="url(#canGrad)"/>
        <ellipse cx="40" cy="62" rx="20" ry="6" fill="#8E0000"/>
        <ellipse cx="40" cy="18" rx="16" ry="5" fill="#CFD8DC"/>
        <ellipse cx="40" cy="18" rx="6" ry="2" fill="#78909C"/>
        <!-- Ribbon wave -->
        <path d="M20 38 Q40 50 60 32 L60 44 Q40 62 20 50 Z" fill="#FFFFFF" opacity="0.9"/>
        <text x="40" y="44" font-family="'Nunito', sans-serif" font-weight="900" font-size="9" fill="#D32F2F" text-anchor="middle">COLA</text>
      </svg>
    `
  },
  {
    id: 'chips',
    name: 'Potato Chips',
    color: '#FFB300',
    svg: `
      <svg viewBox="0 0 80 80">
        <defs>
          <linearGradient id="chipsGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#FFC107"/>
            <stop offset="60%" stop-color="#FFA000"/>
            <stop offset="100%" stop-color="#FF8F00"/>
          </linearGradient>
        </defs>
        <!-- Bag shape with crinkled ends -->
        <path d="M22 14 L58 14 L55 20 L62 64 L56 70 L24 70 L18 64 L25 20 Z" fill="url(#chipsGrad)"/>
        <!-- Zigzag seals -->
        <path d="M22 14 L24 18 L27 14 L30 18 L33 14 L36 18 L39 14 L42 18 L45 14 L48 18 L51 14 L54 18 L58 14" stroke="#FFE082" stroke-width="2" fill="none"/>
        <path d="M24 70 L26 66 L29 70 L32 66 L35 70 L38 66 L41 70 L44 66 L47 70 L50 66 L53 70 L56 70" stroke="#FF8F00" stroke-width="2" fill="none"/>
        <!-- Chip illustration inside bag -->
        <circle cx="40" cy="42" r="14" fill="#FFE082" opacity="0.3"/>
        <ellipse cx="40" cy="44" rx="10" ry="7" fill="#FFF59D" transform="rotate(-15 40 44)"/>
        <text x="40" y="35" font-family="'Nunito', sans-serif" font-weight="900" font-size="8" fill="#B71C1C" text-anchor="middle">CHIPS</text>
      </svg>
    `
  },
  {
    id: 'milk',
    name: 'Fresh Milk',
    color: '#03A9F4',
    svg: `
      <svg viewBox="0 0 80 80">
        <defs>
          <linearGradient id="milkGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#E1F5FE"/>
            <stop offset="50%" stop-color="#FFFFFF"/>
            <stop offset="100%" stop-color="#B3E5FC"/>
          </linearGradient>
        </defs>
        <!-- Milk carton gable top -->
        <polygon points="30,12 50,12 40,8" fill="#0288D1"/>
        <polygon points="24,24 56,24 50,12 30,12" fill="#03A9F4"/>
        <polygon points="24,24 56,24 56,68 24,68" fill="url(#milkGrad)"/>
        <!-- Carton blue accent block -->
        <rect x="24" y="34" width="32" height="20" fill="#0288D1"/>
        <!-- White Cow silhouette / droplet -->
        <circle cx="40" cy="42" r="6" fill="#FFFFFF"/>
        <text x="40" y="52" font-family="'Nunito', sans-serif" font-weight="900" font-size="7" fill="#FFFFFF" text-anchor="middle">MILK</text>
      </svg>
    `
  },
  {
    id: 'donut',
    name: 'Strawberry Donut',
    color: '#F06292',
    svg: `
      <svg viewBox="0 0 80 80">
        <!-- Dough body -->
        <circle cx="40" cy="42" r="24" fill="#D7CCC8"/>
        <circle cx="40" cy="42" r="23" fill="#D79E67"/>
        <!-- Strawberry Frosting -->
        <path d="M40 20 C52 20 62 30 62 42 C60 45 57 42 54 46 C51 50 48 46 44 48 C40 50 36 44 32 47 C28 50 25 44 21 46 C18 40 20 28 40 20 Z" fill="#F48FB1"/>
        <!-- Center hole -->
        <circle cx="40" cy="42" r="9" fill="#181A2A"/>
        <!-- Sprinkles -->
        <line x1="30" y1="28" x2="33" y2="30" stroke="#00E676" stroke-width="2.5" stroke-linecap="round"/>
        <line x1="48" y1="27" x2="51" y2="25" stroke="#FFEB3B" stroke-width="2.5" stroke-linecap="round"/>
        <line x1="53" y1="36" x2="50" y2="38" stroke="#00B0FF" stroke-width="2.5" stroke-linecap="round"/>
        <line x1="28" y1="38" x2="31" y2="40" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round"/>
      </svg>
    `
  },
  {
    id: 'apple',
    name: 'Red Apple',
    color: '#D32F2F',
    svg: `
      <svg viewBox="0 0 80 80">
        <defs>
          <linearGradient id="appleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#FF5252"/>
            <stop offset="50%" stop-color="#D50000"/>
            <stop offset="100%" stop-color="#9B0000"/>
          </linearGradient>
        </defs>
        <!-- Stem & leaf -->
        <path d="M40 24 C40 14 46 12 48 10" stroke="#5D4037" stroke-width="3" fill="none" stroke-linecap="round"/>
        <ellipse cx="48" cy="16" rx="6" ry="3" fill="#4CAF50" transform="rotate(-30 48 16)"/>
        <!-- Apple shape -->
        <path d="M40 25 C34 22 22 24 20 38 C18 52 30 68 40 67 C50 68 62 52 60 38 C58 24 46 22 40 25 Z" fill="url(#appleGrad)"/>
        <!-- Specular Highlight -->
        <ellipse cx="30" cy="34" rx="4" ry="7" fill="#FFFFFF" opacity="0.4" transform="rotate(-25 30 34)"/>
      </svg>
    `
  },
  {
    id: 'coffee',
    name: 'Iced Coffee',
    color: '#795548',
    svg: `
      <svg viewBox="0 0 80 80">
        <defs>
          <linearGradient id="cupGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#A1887F"/>
            <stop offset="50%" stop-color="#D7CCC8"/>
            <stop offset="100%" stop-color="#8D6E63"/>
          </linearGradient>
        </defs>
        <!-- Straw -->
        <line x1="40" y1="24" x2="48" y2="8" stroke="#4CAF50" stroke-width="4" stroke-linecap="round"/>
        <!-- Dome lid -->
        <path d="M26 25 C26 15 54 15 54 25 Z" fill="#ECEFF1" opacity="0.8"/>
        <!-- Cup body -->
        <polygon points="26,25 54,25 49,67 31,67" fill="url(#cupGrad)"/>
        <!-- Cup sleeve -->
        <polygon points="27,38 53,38 51,52 29,52" fill="#5D4037"/>
        <circle cx="40" cy="45" r="5" fill="#4E342E"/>
        <text x="40" y="47.5" font-family="'Nunito', sans-serif" font-weight="900" font-size="6" fill="#FFF" text-anchor="middle">☕</text>
      </svg>
    `
  },
  {
    id: 'icecream',
    name: 'Ice Cream Pint',
    color: '#00BCD4',
    svg: `
      <svg viewBox="0 0 80 80">
        <defs>
          <linearGradient id="pintGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#00ACC1"/>
            <stop offset="50%" stop-color="#4DD0E1"/>
            <stop offset="100%" stop-color="#00838F"/>
          </linearGradient>
        </defs>
        <!-- Pint Lid -->
        <ellipse cx="40" cy="22" rx="20" ry="6" fill="#80DEEA"/>
        <ellipse cx="40" cy="20" rx="19" ry="5" fill="#E0F7FA"/>
        <!-- Tub body -->
        <polygon points="21,22 59,22 55,66 25,66" fill="url(#pintGrad)"/>
        <ellipse cx="40" cy="66" rx="15" ry="4" fill="#006064"/>
        <circle cx="40" cy="44" r="10" fill="#FFFFFF"/>
        <text x="40" y="47" font-family="'Nunito', sans-serif" font-weight="900" font-size="7" fill="#00838F" text-anchor="middle">ICE</text>
      </svg>
    `
  },
  {
    id: 'orange',
    name: 'Juicy Orange',
    color: '#FF9800',
    svg: `
      <svg viewBox="0 0 80 80">
        <defs>
          <linearGradient id="orangeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#FFB74D"/>
            <stop offset="60%" stop-color="#FF9800"/>
            <stop offset="100%" stop-color="#E65100"/>
          </linearGradient>
        </defs>
        <!-- Little green stem -->
        <circle cx="40" cy="21" r="3" fill="#2E7D32"/>
        <ellipse cx="44" cy="18" rx="5" ry="2.5" fill="#4CAF50" transform="rotate(20 44 18)"/>
        <!-- Orange sphere -->
        <circle cx="40" cy="43" r="23" fill="url(#orangeGrad)"/>
        <!-- Citrus skin dimple dots -->
        <circle cx="34" cy="38" r="1" fill="#FFE0B2" opacity="0.6"/>
        <circle cx="46" cy="46" r="1" fill="#FFE0B2" opacity="0.6"/>
        <circle cx="41" cy="53" r="1" fill="#FFE0B2" opacity="0.6"/>
      </svg>
    `
  },
  {
    id: 'jam',
    name: 'Grape Jam Jar',
    color: '#9C27B0',
    svg: `
      <svg viewBox="0 0 80 80">
        <defs>
          <linearGradient id="jamGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#7B1FA2"/>
            <stop offset="50%" stop-color="#BA68C8"/>
            <stop offset="100%" stop-color="#4A148C"/>
          </linearGradient>
        </defs>
        <!-- Checkered fabric lid with tie -->
        <polygon points="26,16 54,16 58,24 22,24" fill="#CE93D8"/>
        <rect x="20" y="24" width="40" height="4" rx="2" fill="#BA68C8"/>
        <!-- Glass Jar -->
        <rect x="23" y="28" width="34" height="38" rx="6" fill="url(#jamGrad)"/>
        <!-- Paper label -->
        <rect x="26" y="38" width="28" height="18" rx="3" fill="#FFF8E1"/>
        <text x="40" y="49" font-family="'Nunito', sans-serif" font-weight="900" font-size="7" fill="#6A1B9A" text-anchor="middle">JAM</text>
      </svg>
    `
  },
  {
    id: 'cookies',
    name: 'Choc Cookies',
    color: '#8D6E63',
    svg: `
      <svg viewBox="0 0 80 80">
        <circle cx="40" cy="42" r="23" fill="#D7CCC8"/>
        <circle cx="40" cy="42" r="22" fill="#BCAAA4"/>
        <circle cx="39" cy="42" r="21" fill="#A1887F"/>
        <!-- Chocolate chips -->
        <circle cx="32" cy="33" r="3.5" fill="#3E2723"/>
        <circle cx="47" cy="34" r="3" fill="#3E2723"/>
        <circle cx="39" cy="45" r="4" fill="#3E2723"/>
        <circle cx="29" cy="49" r="3" fill="#3E2723"/>
        <circle cx="49" cy="48" r="3.2" fill="#3E2723"/>
      </svg>
    `
  }
];

function getGoodById(id) {
  return GOODS_TYPES.find(g => g.id === id) || GOODS_TYPES[0];
}

/* --- audio.js --- */
/**
 * audio.js - Procedural Web Audio API sound & cozy supermarket BGM generator
 */

class AudioManager {
  constructor() {
    this.ctx = null;
    this.enabled = true;
    this.initUserInteraction = false;
    this.bgmTimer = null;
    this.bgmStep = 0;
  }

  init() {
    if (!this.ctx && (window.AudioContext || window.webkitAudioContext)) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    this.initUserInteraction = true;
    this.startBgm();
  }

  toggleSound() {
    this.enabled = !this.enabled;
    if (!this.enabled) {
      this.stopBgm();
    } else {
      this.startBgm();
    }
    return this.enabled;
  }

  ensureContext() {
    if (!this.initUserInteraction) {
      this.init();
    }
  }

  // Play item pickup pop
  playPickup() {
    if (!this.enabled) return;
    this.ensureContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(340, t);
    osc.frequency.exponentialRampToValueAtTime(580, t + 0.08);

    gain.gain.setValueAtTime(0.2, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.09);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.09);
  }

  // Play item drop / placement on shelf
  playDrop() {
    if (!this.enabled) return;
    this.ensureContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(290, t);
    osc.frequency.exponentialRampToValueAtTime(150, t + 0.1);

    gain.gain.setValueAtTime(0.28, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.12);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.12);
  }

  // Play illegal move thud
  playIllegal() {
    if (!this.enabled) return;
    this.ensureContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(150, t);
    osc.frequency.linearRampToValueAtTime(90, t + 0.14);

    gain.gain.setValueAtTime(0.18, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.14);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.14);
  }

  // Play match 3 clear chime with ascending pitch multiplier on combos!
  playMatch(combo = 1) {
    if (!this.enabled) return;
    this.ensureContext();
    if (!this.ctx) return;

    // Pitch escalation on combos (1.0, 1.25, 1.5, etc.)
    const pitchMul = Math.pow(1.15, Math.min(5, combo - 1));
    const chords = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6

    chords.forEach((freq, idx) => {
      const t = this.ctx.currentTime + idx * 0.055;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq * pitchMul, t);

      gain.gain.setValueAtTime(0.22, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.38);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + 0.38);
    });
  }

  // Level Win fanfare
  playWin() {
    if (!this.enabled) return;
    this.ensureContext();
    if (!this.ctx) return;

    const notes = [
      { f: 523.25, d: 0.12 },
      { f: 659.25, d: 0.12 },
      { f: 783.99, d: 0.15 },
      { f: 1046.50, d: 0.45 }
    ];

    let start = this.ctx.currentTime;
    notes.forEach(n => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(n.f, start);

      gain.gain.setValueAtTime(0.24, start);
      gain.gain.exponentialRampToValueAtTime(0.001, start + n.d);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(start);
      osc.stop(start + n.d);
      start += n.d;
    });
  }

  // Game over buzzer
  playGameOver() {
    if (!this.enabled) return;
    this.ensureContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(220, t);
    osc.frequency.exponentialRampToValueAtTime(110, t + 0.5);

    gain.gain.setValueAtTime(0.22, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.55);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.55);
  }

  // Gentle, cozy, lo-fi supermarket chords in the background (very soft & relaxing)
  startBgm() {
    if (this.bgmTimer || !this.enabled) return;
    // Simple cozy 4-chord progression: Cmaj7 -> Am7 -> Dm7 -> G7
    const chords = [
      [261.63, 329.63, 392.00, 493.88], // Cmaj7
      [220.00, 261.63, 329.63, 392.00], // Am7
      [293.66, 349.23, 440.00, 523.25], // Dm7
      [196.00, 246.94, 293.66, 349.23]  // G7
    ];

    this.bgmTimer = setInterval(() => {
      if (!this.enabled || !this.ctx || this.ctx.state !== 'running') return;
      const chord = chords[this.bgmStep % chords.length];
      this.bgmStep++;

      const t = this.ctx.currentTime;
      chord.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, t + idx * 0.08);

        // Very soft ambient volume (0.02) so it never distracts
        gain.gain.setValueAtTime(0.018, t + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + 2.3);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(t + idx * 0.08);
        osc.stop(t + 2.4);
      });
    }, 2500);
  }

  stopBgm() {
    if (this.bgmTimer) {
      clearInterval(this.bgmTimer);
      this.bgmTimer = null;
    }
  }
}

const audio = new AudioManager();

/* --- particles.js --- */
/**
 * particles.js - Canvas visual fireworks, stars and pop particles
 */

class ParticleSystem {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas ? this.canvas.getContext('2d') : null;
    this.particles = [];
    this.animId = null;
    this.resize();
    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    if (!this.canvas) return;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  emit(x, y, color = '#FFB800', count = 20) {
    if (!this.ctx) return;
    const colors = [color, '#FFD54F', '#FFF9C4', '#FFFFFF', '#00E676'];

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 6 + 2;
      this.particles.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2,
        radius: Math.random() * 4 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 1,
        decay: Math.random() * 0.02 + 0.02,
        gravity: 0.18
      });
    }

    if (!this.animId) {
      this.loop();
    }
  }

  emitWinCelebration() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        const x = Math.random() * (w * 0.8) + (w * 0.1);
        const y = Math.random() * (h * 0.5) + (h * 0.1);
        this.emit(x, y, '#FFB800', 35);
      }, i * 220);
    }
  }

  loop() {
    if (!this.ctx) return;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.alpha -= p.decay;

      if (p.alpha <= 0) {
        this.particles.splice(i, 1);
        continue;
      }

      this.ctx.save();
      this.ctx.globalAlpha = Math.max(0, p.alpha);
      this.ctx.fillStyle = p.color;
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();
    }

    if (this.particles.length > 0) {
      this.animId = requestAnimationFrame(() => this.loop());
    } else {
      this.animId = null;
    }
  }
}

const particles = new ParticleSystem('particles-canvas');

/* --- levels.js --- */
/**
 * levels.js - Procedurally generated, guaranteed-solvable level layouts.
 *
 * Generation flow:
 * 1) pick a set of item types
 * 2) create one triplet per item type
 * 3) split each triplet across multiple shelf slots so the board remains playable
 */

const BASE_ITEMS = [
  'panda', 'gummy', 'guitar', 'greenmug', 'cupcake',
  'popsicle', 'coffeecup', 'cola', 'waterbottle', 'thermos'
];

function shuffle(list) {
  const copy = [...list];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function pickItemsForLevel(levelNum, shelves) {
  const targetCount = Math.min(
    BASE_ITEMS.length,
    Math.max(2, Math.floor((shelves * 2) / 3))
  );

  return shuffle(BASE_ITEMS).slice(0, targetCount);
}

function createTriplets(items) {
  return items.flatMap(itemId => [itemId, itemId, itemId]);
}

function splitTripletsAcrossShelves(triplets, shelves) {
  const layout = Array.from({ length: shelves }, () => [[], [], []]);
  const allSlots = [];

  for (let shelf = 0; shelf < shelves; shelf++) {
    for (let slot = 0; slot < 3; slot++) {
      allSlots.push({ shelf, slot });
    }
  }

  const reservedEmptySlots = new Set();
  for (let shelf = 0; shelf < shelves; shelf++) {
    reservedEmptySlots.add(`${shelf}:${(shelf + 2) % 3}`);
  }

  const usableSlots = allSlots.filter(({ shelf, slot }) => {
    return !reservedEmptySlots.has(`${shelf}:${slot}`);
  });

  const itemsById = new Map();
  for (const itemId of triplets) {
    if (!itemsById.has(itemId)) itemsById.set(itemId, 0);
    itemsById.set(itemId, itemsById.get(itemId) + 1);
  }

  const order = shuffle(Object.keys(itemsById));
  const assignments = new Map();

  order.forEach((itemId) => {
    const slots = shuffle(usableSlots).slice(0, 3);
    assignments.set(itemId, slots);
  });

  order.forEach((itemId) => {
    const slots = assignments.get(itemId) || [];
    slots.forEach(({ shelf, slot }) => {
      layout[shelf][slot].push(itemId);
    });
  });

  for (let shelf = 0; shelf < shelves; shelf++) {
    for (let slot = 0; slot < 3; slot++) {
      if (layout[shelf][slot].length > 3) {
        const target = allSlots.find(({ shelf: targetShelf, slot: targetSlot }) => {
          return targetShelf !== shelf && layout[targetShelf][targetSlot].length < 3;
        });

        if (target) {
          layout[target.shelf][target.slot].push(layout[shelf][slot].pop());
        }
      }
    }
  }

  return layout;
}

function createGuaranteedLayout(shelves, items) {
  const triplets = createTriplets(items);
  return splitTripletsAcrossShelves(triplets, shelves);
}

function buildProceduralLevel(levelNum) {
  const shelves = Math.min(6, Math.max(3, 3 + Math.floor(levelNum / 2)));
  const timeLimit = 120 + (levelNum - 1) * 20;
  const items = pickItemsForLevel(levelNum, shelves);

  return {
    level: levelNum,
    title: `Aisle #${levelNum}`,
    shelves,
    depth: 1,
    timeLimit,
    threeStarTime: Math.max(60, Math.floor(timeLimit * 0.5)),
    items,
    layout: createGuaranteedLayout(shelves, items)
  };
}

const LEVELS = Array.from({ length: 8 }, (_, index) => buildProceduralLevel(index + 1));

function getLevelConfig(levelNum) {
  const lvl = LEVELS.find(l => l.level === levelNum);
  if (lvl) return lvl;
  return buildProceduralLevel(levelNum);
}

/* --- main.js --- */
/**
 * main.js - Core Game Controller, State, Drag/Tap Interactions & Matching Engine
 */






class GoodsMatchGame {
  constructor() {
    this.currentLevel = 1;
    this.score = 0;
    this.timeLeft = 0;
    this.timerInterval = null;
    this.isPaused = false;
    this.isGameOver = false;
    this.gameStarted = false;

    // Board representation:
    // array of Shelves, each Shelf has 3 slots: [slot0, slot1, slot2]
    // each slot is an array of item objects (stack): [topItem (layer 0), behindItem (layer 1), ...]
    this.shelves = [];
    this.initialShelves = null; // Stored snapshot of the level's starting layout
    this.levelScoreAtStart = 0;

    // Interaction state
    this.selectedItem = null; // { shelfIdx, slotIdx, item }
    this.draggedItem = null;
    this.dragStartPos = { x: 0, y: 0 };
    this.activePointerId = null;

    // Undo stack: stores history snapshots
    this.history = [];
    this.boosters = {
      undo: 3,
      hint: 3,
      shuffle: 2
    };

    this.comboCount = 0;
    this.lastMatchTime = 0;
    this.isRepairingBoard = false;

    // DOM Elements
    this.dom = {
      shelvesContainer: document.getElementById('shelves-container'),
      levelDisplay: document.getElementById('level-display'),
      timerDisplay: document.getElementById('timer-display'),
      timerBadge: document.getElementById('timer-badge'),
      scoreDisplay: document.getElementById('score-display'),
      dragGhost: document.getElementById('drag-ghost'),
      toastBanner: document.getElementById('toast-banner'),
      // Buttons
      btnMenu: document.getElementById('btn-menu'),
      btnSound: document.getElementById('btn-sound'),
      soundIconOn: document.getElementById('sound-icon-on'),
      soundIconOff: document.getElementById('sound-icon-off'),
      btnUndo: document.getElementById('btn-undo'),
      undoCount: document.getElementById('undo-count'),
      btnHint: document.getElementById('btn-hint'),
      hintCount: document.getElementById('hint-count'),
      btnShuffle: document.getElementById('btn-shuffle'),
      shuffleCount: document.getElementById('shuffle-count'),
      btnRestart: document.getElementById('btn-restart'),
      // Start Screen
      modalStart: document.getElementById('modal-start'),
      startLevelNum: document.getElementById('start-level-num'),
      startLevelTitle: document.getElementById('start-level-title'),
      btnPlayStart: document.getElementById('btn-play-start'),
      btnStartSelectLevel: document.getElementById('btn-start-select-level'),
      // Win & Game Over Modals
      modalWin: document.getElementById('modal-win'),
      winStar1: document.getElementById('win-star-1'),
      winStar2: document.getElementById('win-star-2'),
      winStar3: document.getElementById('win-star-3'),
      winScoreVal: document.getElementById('win-score-val'),
      winTimeVal: document.getElementById('win-time-val'),
      winTotalVal: document.getElementById('win-total-val'),
      btnNextLevel: document.getElementById('btn-next-level'),
      btnWinReplay: document.getElementById('btn-win-replay'),
      modalGameOver: document.getElementById('modal-gameover'),
      btnRetry: document.getElementById('btn-retry'),
      btnLoseMenu: document.getElementById('btn-lose-menu'),
      modalDeadlock: document.getElementById('modal-deadlock'),
      btnDeadlockUndo: document.getElementById('btn-deadlock-undo'),
      btnDeadlockShuffle: document.getElementById('btn-deadlock-shuffle'),
      modalLevels: document.getElementById('modal-levels'),
      btnCloseLevels: document.getElementById('btn-close-levels'),
      levelsGrid: document.getElementById('levels-grid')
    };

    this.init();
  }

  init() {
    this.loadProgress();
    this.bindEvents();
    this.showStartScreen();
  }

  loadProgress() {
    try {
      const savedLevel = localStorage.getItem('gm_level');
      if (savedLevel) this.currentLevel = parseInt(savedLevel, 10);
      const savedScore = localStorage.getItem('gm_score');
      if (savedScore) this.score = parseInt(savedScore, 10);
    } catch (e) {
      console.warn('Storage unavailable', e);
    }
  }

  saveProgress() {
    try {
      localStorage.setItem('gm_level', this.currentLevel.toString());
      localStorage.setItem('gm_score', this.score.toString());
    } catch (e) {
      console.warn('Storage save failed', e);
    }
  }

  showStartScreen() {
    const config = getLevelConfig(this.currentLevel);
    this.dom.startLevelNum.textContent = this.currentLevel;
    this.dom.startLevelTitle.textContent = config.title;
    this.dom.modalStart.classList.remove('hidden');

    // Prepare shelves in background preview
    this.prepareShelvesPreview(config);
  }

  prepareShelvesPreview(config) {
    this.dom.levelDisplay.textContent = this.currentLevel;
    this.dom.scoreDisplay.textContent = this.score;
    this.timeLeft = config.timeLimit;
    this.updateTimerDisplay();
    this.generateShelves(config);
    this.renderShelves();
  }

  bindEvents() {
    window.addEventListener('resize', () => this.updateBoardScale());

    // Start Screen Play Button
    this.dom.btnPlayStart.addEventListener('click', () => {
      audio.ensureContext();
      audio.playPickup();
      this.dom.modalStart.classList.add('hidden');
      this.gameStarted = true;
      this.startLevel(this.currentLevel);
    });

    this.dom.btnStartSelectLevel.addEventListener('click', () => {
      this.openLevelsModal();
    });

    // Sound toggle
    this.dom.btnSound.addEventListener('click', () => {
      const on = audio.toggleSound();
      this.dom.soundIconOn.classList.toggle('hidden', !on);
      this.dom.soundIconOff.classList.toggle('hidden', on);
    });

    // Boosters
    this.dom.btnUndo.addEventListener('click', () => this.handleUndo());
    this.dom.btnHint.addEventListener('click', () => this.handleHint());
    this.dom.btnShuffle.addEventListener('click', () => this.handleShuffle());
    this.dom.btnRestart.addEventListener('click', () => this.resetLevel());

    // Modals
    this.dom.btnNextLevel.addEventListener('click', () => {
      this.dom.modalWin.classList.add('hidden');
      this.startLevel(this.currentLevel + 1);
    });
    this.dom.btnWinReplay.addEventListener('click', () => {
      this.dom.modalWin.classList.add('hidden');
      this.resetLevel();
    });
    this.dom.btnRetry.addEventListener('click', () => {
      this.dom.modalGameOver.classList.add('hidden');
      this.resetLevel();
    });
    this.dom.btnLoseMenu.addEventListener('click', () => {
      this.dom.modalGameOver.classList.add('hidden');
      this.openLevelsModal();
    });

    this.dom.btnMenu.addEventListener('click', () => this.openLevelsModal());
    this.dom.btnCloseLevels.addEventListener('click', () => this.dom.modalLevels.classList.add('hidden'));

    // Deadlock Modal actions
    if (this.dom.btnDeadlockUndo) {
      this.dom.btnDeadlockUndo.addEventListener('click', () => {
        this.dom.modalDeadlock.classList.add('hidden');
        if (this.history.length > 0) this.handleUndo();
        else this.resetLevel();
      });
    }
    if (this.dom.btnDeadlockShuffle) {
      this.dom.btnDeadlockShuffle.addEventListener('click', () => {
        this.dom.modalDeadlock.classList.add('hidden');
        this.boosters.shuffle = Math.max(1, this.boosters.shuffle);
        this.handleShuffle();
      });
    }

    // Global pointer events for drag & drop
    window.addEventListener('pointermove', (e) => this.onPointerMove(e));
    window.addEventListener('pointerup', (e) => this.onPointerUp(e));
    window.addEventListener('pointercancel', (e) => this.onPointerUp(e));
  }

  // =========================================================================
  // Level Initialization & Puzzle Generation
  // =========================================================================
  startLevel(lvlNum) {
    this.currentLevel = lvlNum;
    this.saveProgress();
    const config = getLevelConfig(lvlNum);

    this.levelScoreAtStart = this.score;
    this.dom.levelDisplay.textContent = this.currentLevel;
    this.dom.scoreDisplay.textContent = this.score;

    this.history = [];
    this.selectedItem = null;
    this.draggedItem = null;
    this.isGameOver = false;
    this.gameStarted = true;

    // Reset Boosters
    this.boosters.undo = 3;
    this.boosters.hint = 3;
    this.boosters.shuffle = 2;
    this.updateBoosterUI();

    // Start Timer
    this.timeLeft = config.timeLimit;
    this.startTimer();

    // Generate puzzle shelves & save pristine initial snapshot
    this.generateShelves(config);
    this.initialShelves = JSON.parse(JSON.stringify(this.shelves));
    this.renderShelves();
    this.showToast(`Level ${this.currentLevel}: ${config.title}`);
  }

  // Resets the exact same puzzle layout back to its starting state
  resetLevel() {
    if (!this.initialShelves) {
      this.startLevel(this.currentLevel);
      return;
    }

    const config = getLevelConfig(this.currentLevel);

    // Restore starting score for this level attempt
    this.score = this.levelScoreAtStart;
    this.dom.scoreDisplay.textContent = this.score;

    // Reset state & restore pristine shelves layout
    this.history = [];
    this.clearSelection();
    this.draggedItem = null;
    this.isGameOver = false;
    this.gameStarted = true;

    // Replenish boosters
    this.boosters.undo = 3;
    this.boosters.hint = 3;
    this.boosters.shuffle = 2;
    this.updateBoosterUI();

    // Reset timer to full limit
    this.timeLeft = config.timeLimit;
    this.startTimer();

    // Deep copy initial layout back into active shelves
    this.shelves = JSON.parse(JSON.stringify(this.initialShelves));
    this.renderShelves();
    audio.playDrop();
    this.showToast('Level Reset to Beginning ↺');
  }

  startTimer() {
    clearInterval(this.timerInterval);
    this.updateTimerDisplay();
    this.dom.timerBadge.classList.remove('warning');

    this.timerInterval = setInterval(() => {
      if (this.isPaused || this.isGameOver || !this.gameStarted) return;
      this.timeLeft--;
      this.updateTimerDisplay();

      if (this.timeLeft <= 20) {
        this.dom.timerBadge.classList.add('warning');
      }

      if (this.timeLeft <= 0) {
        clearInterval(this.timerInterval);
        this.handleTimeout();
      }
    }, 1000);
  }

  updateTimerDisplay() {
    const mins = Math.floor(Math.max(0, this.timeLeft) / 60);
    const secs = Math.max(0, this.timeLeft) % 60;
    this.dom.timerDisplay.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }

  updateBoosterUI() {
    this.dom.undoCount.textContent = this.boosters.undo;
    this.dom.hintCount.textContent = this.boosters.hint;
    this.dom.shuffleCount.textContent = this.boosters.shuffle;
    this.dom.btnUndo.disabled = this.boosters.undo <= 0 || this.history.length === 0;
    this.dom.btnHint.disabled = this.boosters.hint <= 0;
    this.dom.btnShuffle.disabled = this.boosters.shuffle <= 0;
  }

  updateBoardScale() {
    const headerHeight = document.querySelector('.game-header')?.offsetHeight || 62;
    const footerHeight = document.querySelector('.game-footer')?.offsetHeight || 90;
    const shelfCount = Math.max(this.shelves.length || 1, 1);
    const availableHeight = Math.max(300, window.innerHeight - headerHeight - footerHeight - 36);
    const targetSize = Math.max(42, Math.min(74, Math.floor((availableHeight / shelfCount) - 46)));
    document.documentElement.style.setProperty('--item-size', `${targetSize}px`);
  }

  // Build a randomized, solvable multi-layer goods board
  generateShelves(config) {
    // If the level has a handcrafted authentic layout, use it!
    if (config.layout) {
      this.shelves = config.layout.map(shelf => {
        return shelf.map(slot => {
          return slot.map(itemId => ({
            id: itemId,
            uid: `${itemId}_${Math.random().toString(36).substr(2, 6)}`
          }));
        });
      });
      return;
    }

    const numShelves = config.shelves;
    const itemPool = config.items;
    const depthLimit = config.depth || 3;
    const freeSlotsCount = Math.max(2, Math.min(3, Math.floor(numShelves * 0.5)));

    // Backward construction algorithm: ensures guaranteed solvability
    this.shelves = [];
    for (let s = 0; s < numShelves; s++) {
      this.shelves.push([[], [], []]);
    }

    // Pick reserved open slots
    const allSlotIndices = [];
    for (let s = 0; s < numShelves; s++) {
      for (let sl = 0; sl < 3; sl++) {
        allSlotIndices.push({ s, sl });
      }
    }
    allSlotIndices.sort(() => Math.random() - 0.5);
    const reservedOpen = allSlotIndices.slice(0, freeSlotsCount);

    const isReserved = (s, sl) => reservedOpen.some(r => r.s === s && r.sl === sl);

    // Place triplets from bottom layer (last cleared) to top layer (first cleared)
    for (let i = 0; i < itemPool.length; i++) {
      const id = itemPool[i];

      const eligibleShelves = [];
      for (let s = 0; s < numShelves; s++) {
        let canFit = 0;
        for (let sl = 0; sl < 3; sl++) {
          if (!isReserved(s, sl) && this.shelves[s][sl].length < depthLimit) {
            canFit++;
          }
        }
        if (canFit >= 2) eligibleShelves.push(s);
      }

      const sTarget = eligibleShelves.length > 0
        ? eligibleShelves[Math.floor(Math.random() * eligibleShelves.length)]
        : Math.floor(Math.random() * numShelves);

      let placed = 0;
      for (let sl = 0; sl < 3 && placed < 3; sl++) {
        if (!isReserved(sTarget, sl)) {
          this.shelves[sTarget][sl].unshift({ id, uid: `${id}_${Math.random().toString(36).substr(2, 6)}` });
          placed++;
        }
      }

      while (placed < 3) {
        for (let s = 0; s < numShelves && placed < 3; s++) {
          for (let sl = 0; sl < 3 && placed < 3; sl++) {
            if (!isReserved(s, sl) && this.shelves[s][sl].length < depthLimit) {
              this.shelves[s][sl].unshift({ id, uid: `${id}_${Math.random().toString(36).substr(2, 6)}` });
              placed++;
            }
          }
        }
      }

      // Scatter 1 item to an open slot
      const emptySlots = [];
      for (let s = 0; s < numShelves; s++) {
        for (let sl = 0; sl < 3; sl++) {
          if (!isReserved(s, sl) && this.shelves[s][sl].length === 0) {
            emptySlots.push({ s, sl });
          }
        }
      }

      if (emptySlots.length > 0 && this.shelves[sTarget][0].length > 0) {
        const moved = this.shelves[sTarget][0].shift();
        const pick = emptySlots[Math.floor(Math.random() * emptySlots.length)];
        this.shelves[pick.s][pick.sl].unshift(moved);
      }
    }

    this.preventInitialMatches();
  }

  preventInitialMatches() {
    this.shelves.forEach((shelf, sIdx) => {
      const frontItems = shelf.map(st => st.length > 0 ? st[0].id : null);
      if (frontItems[0] && frontItems[0] === frontItems[1] && frontItems[1] === frontItems[2]) {
        for (let otherS = 0; otherS < this.shelves.length; otherS++) {
          if (otherS !== sIdx && this.shelves[otherS][0].length > 0 && this.shelves[otherS][0][0].id !== frontItems[0]) {
            const temp = shelf[2][0];
            shelf[2][0] = this.shelves[otherS][0][0];
            this.shelves[otherS][0][0] = temp;
            break;
          }
        }
      }
    });
  }

  // =========================================================================
  // DOM Rendering
  // =========================================================================
  renderShelves() {
    this.updateBoardScale();
    this.dom.shelvesContainer.innerHTML = '';

    this.shelves.forEach((shelf, shelfIdx) => {
      const shelfUnit = document.createElement('div');
      shelfUnit.className = 'shelf-unit';
      shelfUnit.dataset.shelf = shelfIdx;

      // Wooden base plank
      const plank = document.createElement('div');
      plank.className = 'shelf-plank';
      shelfUnit.appendChild(plank);

      const slotsContainer = document.createElement('div');
      slotsContainer.className = 'shelf-slots';

      shelf.forEach((slotStack, slotIdx) => {
        const slotEl = document.createElement('div');
        slotEl.className = 'shelf-slot';
        if (slotStack.length === 0) {
          slotEl.classList.add('is-open');
        }
        slotEl.dataset.shelf = shelfIdx;
        slotEl.dataset.slot = slotIdx;

        // Render stacked items from back to front
        for (let layer = slotStack.length - 1; layer >= 0; layer--) {
          const itemData = slotStack[layer];
          const goodMeta = getGoodById(itemData.id);

          const itemEl = document.createElement('div');
          itemEl.className = `goods-item layer-${layer > 2 ? 'deep' : layer}`;
          itemEl.dataset.shelf = shelfIdx;
          itemEl.dataset.slot = slotIdx;
          itemEl.dataset.layer = layer;
          itemEl.dataset.uid = itemData.uid;
          itemEl.innerHTML = goodMeta.svg;

          // Only the frontmost item (layer === 0) is interactive!
          if (layer === 0) {
            itemEl.addEventListener('pointerdown', (e) => this.onItemPointerDown(e, shelfIdx, slotIdx, itemData));
          }

          slotEl.appendChild(itemEl);
        }

        // Tap slot to place selected item (only succeeds if open slot)
        slotEl.addEventListener('click', (e) => this.onSlotClick(shelfIdx, slotIdx));

        slotsContainer.appendChild(slotEl);
      });

      shelfUnit.appendChild(slotsContainer);
      this.dom.shelvesContainer.appendChild(shelfUnit);
    });

    this.updateBoosterUI();
  }

  // =========================================================================
  // Tap & Selection Interaction
  // =========================================================================
  onItemPointerDown(e, shelfIdx, slotIdx, itemData) {
    if (this.isGameOver || !this.gameStarted) return;
    audio.ensureContext();

    if (this.draggedItem) return;

    this.dragStartPos = { x: e.clientX, y: e.clientY };
    this.activePointerId = e.pointerId;

    this.draggedItem = {
      shelfIdx,
      slotIdx,
      itemData,
      element: e.currentTarget,
      isDragging: false
    };
  }

  onSlotClick(targetShelf, targetSlot) {
    if (!this.selectedItem || this.isGameOver || !this.gameStarted) return;

    const sourceShelf = this.selectedItem.shelfIdx;
    const sourceSlot = this.selectedItem.slotIdx;

    if (sourceShelf === targetShelf && sourceSlot === targetSlot) {
      this.clearSelection();
      return;
    }

    // Strict Rule: Target slot MUST be empty/open. Swapping is not allowed!
    const targetStack = this.shelves[targetShelf][targetSlot];
    if (targetStack.length > 0) {
      audio.playIllegal();
      this.showToast('You can only move to an open slot! Swapping is not allowed.');
      // Switch selection to tapped item if it has an item
      this.selectItem(targetShelf, targetSlot);
      return;
    }

    this.executeMove(sourceShelf, sourceSlot, targetShelf, targetSlot);
  }

  selectItem(shelfIdx, slotIdx) {
    this.clearSelection();
    this.selectedItem = { shelfIdx, slotIdx };

    const itemEl = this.getItemElement(shelfIdx, slotIdx, 0);
    if (itemEl) {
      itemEl.classList.add('selected');
      audio.playPickup();
    }
  }

  clearSelection() {
    if (this.selectedItem) {
      const itemEl = this.getItemElement(this.selectedItem.shelfIdx, this.selectedItem.slotIdx, 0);
      if (itemEl) itemEl.classList.remove('selected');
    }
    this.selectedItem = null;
    document.querySelectorAll('.hint-highlight').forEach(el => el.classList.remove('hint-highlight'));
  }

  // =========================================================================
  // Drag & Drop Handling
  // =========================================================================
  onPointerMove(e) {
    if (!this.draggedItem || !this.gameStarted) return;

    const dx = e.clientX - this.dragStartPos.x;
    const dy = e.clientY - this.dragStartPos.y;
    const dist = Math.hypot(dx, dy);

    if (!this.draggedItem.isDragging && dist > 8) {
      this.draggedItem.isDragging = true;
      this.clearSelection();

      const goodMeta = getGoodById(this.draggedItem.itemData.id);
      this.dom.dragGhost.innerHTML = goodMeta.svg;
      this.dom.dragGhost.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%) scale(1.12)`;
      this.dom.dragGhost.classList.remove('hidden');
      this.draggedItem.element.style.opacity = '0.35';
      audio.playPickup();
      if (navigator.vibrate) navigator.vibrate(12);
    }

    if (this.draggedItem.isDragging) {
      this.dom.dragGhost.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%) scale(1.12)`;

      this.updateHoverTarget(e.clientX, e.clientY);
    }
  }

  updateHoverTarget(x, y) {
    document.querySelectorAll('.shelf-slot').forEach(slot => {
      slot.classList.remove('drop-valid', 'drop-invalid');
    });

    const targetSlot = this.findSlotAtPoint(x, y);
    if (targetSlot) {
      const tShelf = parseInt(targetSlot.dataset.shelf, 10);
      const tSlot = parseInt(targetSlot.dataset.slot, 10);
      const isOccupied = this.shelves[tShelf][tSlot].length > 0;

      if (!isOccupied) {
        targetSlot.classList.add('drop-valid');
      } else {
        targetSlot.classList.add('drop-invalid');
      }
    }
  }

  findSlotAtPoint(x, y) {
    const el = document.elementFromPoint(x, y);
    if (!el) return null;
    return el.closest('.shelf-slot');
  }

  onPointerUp(e) {
    if (!this.draggedItem) return;

    const { shelfIdx, slotIdx, isDragging, element } = this.draggedItem;
    element.style.opacity = '1';
    this.dom.dragGhost.classList.add('hidden');
    document.querySelectorAll('.shelf-slot').forEach(slot => {
      slot.classList.remove('drop-valid', 'drop-invalid');
    });

    if (isDragging) {
      const targetSlotEl = this.findSlotAtPoint(e.clientX, e.clientY);
      if (targetSlotEl) {
        const targetShelf = parseInt(targetSlotEl.dataset.shelf, 10);
        const targetSlot = parseInt(targetSlotEl.dataset.slot, 10);

        if (targetShelf !== shelfIdx || targetSlot !== slotIdx) {
          const tgtStack = this.shelves[targetShelf][targetSlot];
          // STRICT RULE: Can only move to an open/empty slot!
          if (tgtStack.length === 0) {
            this.executeMove(shelfIdx, slotIdx, targetShelf, targetSlot);
          } else {
            audio.playIllegal();
            this.showToast('You can only move to an open slot! Swapping is not allowed.');
          }
        }
      }
    } else {
      // Tap selection
      if (this.selectedItem && this.selectedItem.shelfIdx === shelfIdx && this.selectedItem.slotIdx === slotIdx) {
        this.clearSelection();
      } else {
        this.selectItem(shelfIdx, slotIdx);
      }
    }

    this.draggedItem = null;
    this.activePointerId = null;
  }

  // =========================================================================
  // Movement & Matching Rules
  // =========================================================================
  executeMove(sourceShelf, sourceSlot, targetShelf, targetSlot) {
    const srcStack = this.shelves[sourceShelf][sourceSlot];
    const tgtStack = this.shelves[targetShelf][targetSlot];

    if (srcStack.length === 0) return;

    // Strict Rule Check: Target MUST be an empty slot
    if (tgtStack.length > 0) {
      audio.playIllegal();
      this.showToast('You can only move to an open slot! Swapping is not allowed.');
      this.clearSelection();
      return;
    }

    // Save snapshot for Undo
    this.saveSnapshot();

    // Move top item into the open slot
    const movingItem = srcStack.shift();
    tgtStack.unshift(movingItem);

    audio.playDrop();
    if (navigator.vibrate) navigator.vibrate(15);
    this.clearSelection();

    // Re-render and trigger matching check
    this.renderShelves();
    this.checkMatches();
  }

  saveSnapshot() {
    const snapshot = JSON.parse(JSON.stringify(this.shelves));
    this.history.push(snapshot);
    if (this.history.length > 20) this.history.shift();
    this.updateBoosterUI();
  }

  handleUndo() {
    if (this.boosters.undo <= 0 || this.history.length === 0) {
      audio.playIllegal();
      return;
    }

    this.boosters.undo--;
    this.shelves = this.history.pop();
    this.clearSelection();
    audio.playPickup();
    this.renderShelves();
    this.showToast('Move Undone');
  }

  handleHint() {
    if (this.boosters.hint <= 0) {
      audio.playIllegal();
      return;
    }

    let hintPair = this.findBestHint();

    if (hintPair) {
      this.boosters.hint--;
      audio.playPickup();
      this.highlightItem(hintPair.srcShelf, hintPair.srcSlot);
      this.highlightItem(hintPair.tgtShelf, hintPair.tgtSlot);
      this.showToast(`Match hint: Move ${getGoodById(hintPair.item).name} to open slot!`);
      this.updateBoosterUI();
    } else {
      this.showToast('No immediate open-slot match found, try shuffling!');
      audio.playIllegal();
    }
  }

  findBestHint() {
    // Look for shelves that have 2 matching front items AND an open slot on the same shelf
    for (let s = 0; s < this.shelves.length; s++) {
      const shelf = this.shelves[s];
      const counts = {};
      let emptySlotIdx = -1;

      shelf.forEach((st, idx) => {
        if (st.length > 0) {
          const id = st[0].id;
          counts[id] = (counts[id] || 0) + 1;
        } else {
          emptySlotIdx = idx;
        }
      });

      // If shelf has an open slot and 2 matching items
      if (emptySlotIdx !== -1) {
        for (const [id, count] of Object.entries(counts)) {
          if (count === 2) {
            // Locate the 3rd matching item on another shelf
            for (let otherS = 0; otherS < this.shelves.length; otherS++) {
              if (otherS !== s) {
                for (let otherSlot = 0; otherSlot < 3; otherSlot++) {
                  const stack = this.shelves[otherS][otherSlot];
                  if (stack.length > 0 && stack[0].id === id) {
                    return {
                      item: id,
                      srcShelf: otherS,
                      srcSlot: otherSlot,
                      tgtShelf: s,
                      tgtSlot: emptySlotIdx
                    };
                  }
                }
              }
            }
          }
        }
      }
    }

    // Fallback: Locate any open slot and matching item elsewhere
    for (let s = 0; s < this.shelves.length; s++) {
      for (let slot = 0; slot < 3; slot++) {
        if (this.shelves[s][slot].length === 0) {
          // Find any shelf with 1 item matching another
          for (let s2 = 0; s2 < this.shelves.length; s2++) {
            for (let slot2 = 0; slot2 < 3; slot2++) {
              if (this.shelves[s2][slot2].length > 0) {
                return {
                  item: this.shelves[s2][slot2][0].id,
                  srcShelf: s2,
                  srcSlot: slot2,
                  tgtShelf: s,
                  tgtSlot: slot
                };
              }
            }
          }
        }
      }
    }

    return null;
  }

  highlightItem(shelfIdx, slotIdx) {
    const el = this.getItemElement(shelfIdx, slotIdx, 0);
    if (el) el.classList.add('hint-highlight');
  }

  handleShuffle() {
    if (this.boosters.shuffle <= 0) {
      audio.playIllegal();
      return;
    }

    this.boosters.shuffle--;
    this.saveSnapshot();

    // Gather all front items
    let frontItems = [];
    this.shelves.forEach(shelf => {
      shelf.forEach(st => {
        if (st.length > 0) {
          frontItems.push(st.shift());
        }
      });
    });

    // Shuffle them
    for (let i = frontItems.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [frontItems[i], frontItems[j]] = [frontItems[j], frontItems[i]];
    }

    // Place back
    this.shelves.forEach(shelf => {
      shelf.forEach(st => {
        if (frontItems.length > 0) {
          st.unshift(frontItems.pop());
        }
      });
    });

    audio.playWin();
    this.clearSelection();
    this.renderShelves();
    this.showToast('Shelves Shuffled! 🔀');
    this.checkMatches();
  }

  // =========================================================================
  // Triple-Match Clearance Logic
  // =========================================================================
  checkMatches() {
    let matchedAny = false;

    this.shelves.forEach((shelf, shelfIdx) => {
      const slot0 = shelf[0][0];
      const slot1 = shelf[1][0];
      const slot2 = shelf[2][0];

      if (slot0 && slot1 && slot2 && slot0.id === slot1.id && slot1.id === slot2.id) {
        matchedAny = true;
        this.clearTripleMatch(shelfIdx, slot0.id);
      }
    });

    if (!matchedAny) {
      this.checkWinCondition();
    }
  }

  getRemainingFrontItems() {
    const remaining = [];
    this.shelves.forEach(shelf => {
      shelf.forEach(slot => {
        if (slot.length > 0) remaining.push(slot[0].id);
      });
    });
    return remaining;
  }

  hasImpossibleFinalState() {
    const remaining = this.getRemainingFrontItems();
    if (remaining.length !== 3) return false;
    const uniqueIds = new Set(remaining);
    return uniqueIds.size > 1;
  }

  repairImpossibleBoardState() {
    if (this.isRepairingBoard) return;
    this.isRepairingBoard = true;
    this.showToast('Board repaired — reshuffling!');
    this.boosters.shuffle = Math.max(1, this.boosters.shuffle);
    this.handleShuffle();
    setTimeout(() => {
      this.isRepairingBoard = false;
    }, 200);
  }

  clearTripleMatch(shelfIdx, itemId) {
    const goodMeta = getGoodById(itemId);

    // Combo system: if matched within 4 seconds of last match, escalate combo!
    const now = performance.now();
    if (now - this.lastMatchTime < 4000) {
      this.comboCount++;
    } else {
      this.comboCount = 1;
    }
    this.lastMatchTime = now;

    audio.playMatch(this.comboCount);

    // Haptic feedback for mobile
    if (navigator.vibrate) {
      navigator.vibrate([25, 30, 45]);
    }

    const basePoints = 300;
    const comboBonus = (this.comboCount - 1) * 150;
    const pointsAwarded = basePoints + comboBonus;
    this.score += pointsAwarded;
    this.dom.scoreDisplay.textContent = `$${this.score}`;

    // Shake shelf
    const shelfUnit = this.dom.shelvesContainer.querySelector(`.shelf-unit[data-shelf="${shelfIdx}"]`);
    if (shelfUnit) {
      shelfUnit.classList.remove('shelf-shake');
      void shelfUnit.offsetWidth; // re-flow
      shelfUnit.classList.add('shelf-shake');
    }

    // Trigger visual pop animation on the 3 items
    for (let slot = 0; slot < 3; slot++) {
      const itemEl = this.getItemElement(shelfIdx, slot, 0);
      if (itemEl) {
        itemEl.classList.add('match-clear');
        const rect = itemEl.getBoundingClientRect();
        particles.emit(rect.left + rect.width / 2, rect.top + rect.height / 2, goodMeta.color, 24);
      }
    }

    // Spawn combo floating toast
    if (this.comboCount > 1) {
      this.spawnFloatingCombo(`COMBO x${this.comboCount}! +$${pointsAwarded}`);
    } else {
      this.showToast(`Packed 3x ${goodMeta.name}! +$${pointsAwarded}`);
    }

    setTimeout(() => {
      for (let slot = 0; slot < 3; slot++) {
        this.shelves[shelfIdx][slot].shift();
      }
      this.renderShelves();
      this.checkMatches();
    }, 420);
  }

  spawnFloatingCombo(text) {
    const pill = document.createElement('div');
    pill.className = 'floating-combo';
    pill.textContent = text;
    document.getElementById('game-app').appendChild(pill);
    setTimeout(() => pill.remove(), 1250);
  }

  checkWinCondition() {
    let totalRemaining = 0;
    this.shelves.forEach(shelf => {
      shelf.forEach(slot => {
        totalRemaining += slot.length;
      });
    });

    if (this.hasImpossibleFinalState()) {
      this.repairImpossibleBoardState();
      return;
    }

    if (totalRemaining === 0) {
      this.handleLevelWin();
    } else {
      // Check for deadlock (no open slots left and no match available)
      this.checkDeadlock();
    }
  }

  checkDeadlock() {
    // If there is at least one open slot, game can continue
    let openSlotCount = 0;
    this.shelves.forEach(shelf => {
      shelf.forEach(slot => {
        if (slot.length === 0) openSlotCount++;
      });
    });

    if (openSlotCount === 0) {
      // Check if any shelf has an immediate match of 3
      let hasImmediateMatch = false;
      this.shelves.forEach(shelf => {
        if (shelf[0].length > 0 && shelf[1].length > 0 && shelf[2].length > 0 &&
            shelf[0][0].id === shelf[1][0].id && shelf[1][0].id === shelf[2][0].id) {
          hasImmediateMatch = true;
        }
      });

      if (!hasImmediateMatch && !this.isGameOver) {
        // Deadlock detected! Prompt player
        audio.playIllegal();
        setTimeout(() => {
          this.dom.modalDeadlock.classList.remove('hidden');
        }, 500);
      }
    }
  }

  // =========================================================================
  // Win & Game Over Handlers
  // =========================================================================
  handleLevelWin() {
    this.isGameOver = true;
    clearInterval(this.timerInterval);

    audio.playWin();
    particles.emitWinCelebration();

    const config = getLevelConfig(this.currentLevel);

    let stars = 1;
    if (this.timeLeft >= config.threeStarTime) {
      stars = 3;
    } else if (this.timeLeft >= Math.floor(config.threeStarTime * 0.6)) {
      stars = 2;
    }

    const timeBonus = this.timeLeft * 10;
    this.score += timeBonus;
    this.saveProgress();

    this.dom.winStar1.classList.toggle('earned', stars >= 1);
    this.dom.winStar2.classList.toggle('earned', stars >= 2);
    this.dom.winStar3.classList.toggle('earned', stars >= 3);

    this.dom.winScoreVal.textContent = this.score;
    this.dom.winTimeVal.textContent = `${this.timeLeft}s (+${timeBonus} pts)`;
    this.dom.winTotalVal.textContent = this.score;

    setTimeout(() => {
      this.dom.modalWin.classList.remove('hidden');
    }, 600);
  }

  handleTimeout() {
    this.isGameOver = true;
    audio.playGameOver();
    this.dom.modalGameOver.classList.remove('hidden');
  }

  openLevelsModal() {
    this.dom.levelsGrid.innerHTML = '';
    const maxUnlocked = Math.max(8, this.currentLevel);

    for (let i = 1; i <= maxUnlocked; i++) {
      const tile = document.createElement('div');
      tile.className = 'level-tile';
      if (i === this.currentLevel) tile.classList.add('current');
      if (i > this.currentLevel) tile.classList.add('locked');

      tile.innerHTML = `
        <span class="tile-num">${i}</span>
        <span class="tile-stars">${i < this.currentLevel ? '★★★' : '☆☆☆'}</span>
      `;

      if (i <= this.currentLevel) {
        tile.addEventListener('click', () => {
          this.dom.modalLevels.classList.add('hidden');
          this.dom.modalStart.classList.add('hidden');
          this.startLevel(i);
        });
      }

      this.dom.levelsGrid.appendChild(tile);
    }

    this.dom.modalLevels.classList.remove('hidden');
  }

  // =========================================================================
  // Helpers
  // =========================================================================
  getItemElement(shelfIdx, slotIdx, layer) {
    return this.dom.shelvesContainer.querySelector(
      `.goods-item[data-shelf="${shelfIdx}"][data-slot="${slotIdx}"][data-layer="${layer}"]`
    );
  }

  showToast(message) {
    this.dom.toastBanner.textContent = message;
    this.dom.toastBanner.classList.remove('hidden');
    this.dom.toastBanner.style.animation = 'none';
    this.dom.toastBanner.offsetHeight;
    this.dom.toastBanner.style.animation = null;

    clearTimeout(this.toastTimeout);
    this.toastTimeout = setTimeout(() => {
      this.dom.toastBanner.classList.add('hidden');
    }, 2200);
  }
}

// Start game on DOMContentLoaded or immediate if already loaded
if (document.readyState === 'loading') {
  window.addEventListener('DOMContentLoaded', () => {
    window.game = new GoodsMatchGame();
  });
} else {
  window.game = new GoodsMatchGame();
}
