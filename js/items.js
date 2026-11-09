/**
 * items.js - Crisp stylized SVG items inspired directly by the reference game:
 * Panda, Gummy Bear, Guitar, Green Mug, Cupcake, Popsicle, Coffee Cup, Cola Can, Water Bottle, Thermos/Kettle
 */

export const GOODS_TYPES = [
  {
    id: 'panda',
    name: 'Panda Plush',
    color: '#333333',
    svg: `
      <svg viewBox="0 0 80 80">
        <!-- Ears -->
        <circle cx="25" cy="22" r="9" fill="#1E2022"/>
        <circle cx="55" cy="22" r="9" fill="#1E2022"/>
        <!-- Body -->
        <ellipse cx="40" cy="54" rx="20" ry="18" fill="#FFFFFF"/>
        <!-- Arms/Legs -->
        <ellipse cx="23" cy="50" rx="6" ry="10" fill="#1E2022" transform="rotate(20 23 50)"/>
        <ellipse cx="57" cy="50" rx="6" ry="10" fill="#1E2022" transform="rotate(-20 57 50)"/>
        <ellipse cx="28" cy="67" rx="7" ry="5" fill="#1E2022"/>
        <ellipse cx="52" cy="67" rx="7" ry="5" fill="#1E2022"/>
        <!-- Head -->
        <ellipse cx="40" cy="33" rx="19" ry="16" fill="#F8F9FA"/>
        <!-- Eye Patches -->
        <ellipse cx="32" cy="33" rx="6" ry="5" fill="#1E2022" transform="rotate(-15 32 33)"/>
        <ellipse cx="48" cy="33" rx="6" ry="5" fill="#1E2022" transform="rotate(15 48 33)"/>
        <!-- Eyes -->
        <circle cx="33" cy="33" r="2" fill="#FFFFFF"/>
        <circle cx="47" cy="33" r="2" fill="#FFFFFF"/>
        <!-- Nose & Mouth -->
        <ellipse cx="40" cy="39" rx="3" ry="2" fill="#1E2022"/>
        <path d="M38 42 Q40 44 42 42" stroke="#1E2022" stroke-width="1.5" fill="none"/>
      </svg>
    `
  },
  {
    id: 'gummy',
    name: 'Gummy Bear',
    color: '#FFA726',
    svg: `
      <svg viewBox="0 0 80 80">
        <defs>
          <linearGradient id="gummyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#FFB74D"/>
            <stop offset="60%" stop-color="#FFA726"/>
            <stop offset="100%" stop-color="#FB8C00"/>
          </linearGradient>
        </defs>
        <!-- Ears -->
        <circle cx="27" cy="22" r="7" fill="url(#gummyGrad)"/>
        <circle cx="53" cy="22" r="7" fill="url(#gummyGrad)"/>
        <circle cx="27" cy="22" r="3.5" fill="#FFE0B2"/>
        <circle cx="53" cy="22" r="3.5" fill="#FFE0B2"/>
        <!-- Head -->
        <ellipse cx="40" cy="32" rx="15" ry="13" fill="url(#gummyGrad)"/>
        <!-- Snout -->
        <ellipse cx="40" cy="36" rx="6" ry="4.5" fill="#FFE0B2"/>
        <circle cx="40" cy="35" r="2" fill="#E65100"/>
        <!-- Eyes -->
        <circle cx="34" cy="31" r="2" fill="#E65100"/>
        <circle cx="46" cy="31" r="2" fill="#E65100"/>
        <!-- Body -->
        <ellipse cx="40" cy="51" rx="16" ry="17" fill="url(#gummyGrad)"/>
        <!-- Arms -->
        <ellipse cx="23" cy="46" rx="5" ry="8" fill="url(#gummyGrad)" transform="rotate(25 23 46)"/>
        <ellipse cx="57" cy="46" rx="5" ry="8" fill="url(#gummyGrad)" transform="rotate(-25 57 46)"/>
        <!-- Feet -->
        <ellipse cx="30" cy="67" rx="7" ry="6" fill="url(#gummyGrad)"/>
        <ellipse cx="50" cy="67" rx="7" ry="6" fill="url(#gummyGrad)"/>
        <!-- Gel Gloss Highlight -->
        <ellipse cx="34" cy="47" rx="3" ry="8" fill="#FFF" opacity="0.45" transform="rotate(-15 34 47)"/>
      </svg>
    `
  },
  {
    id: 'guitar',
    name: 'Acoustic Guitar',
    color: '#D4A373',
    svg: `
      <svg viewBox="0 0 80 80">
        <defs>
          <linearGradient id="woodGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#E6BA82"/>
            <stop offset="50%" stop-color="#DE9E58"/>
            <stop offset="100%" stop-color="#C27A2F"/>
          </linearGradient>
        </defs>
        <!-- Headstock -->
        <rect x="37" y="6" width="6" height="12" rx="2" fill="#8D5B29"/>
        <circle cx="35" cy="9" r="1.5" fill="#FFF"/>
        <circle cx="35" cy="14" r="1.5" fill="#FFF"/>
        <circle cx="45" cy="9" r="1.5" fill="#FFF"/>
        <circle cx="45" cy="14" r="1.5" fill="#FFF"/>
        <!-- Neck -->
        <rect x="38" y="16" width="4" height="24" fill="#6A3805"/>
        <!-- Body (Figure 8) -->
        <ellipse cx="40" cy="43" rx="12" ry="10" fill="url(#woodGrad)"/>
        <ellipse cx="40" cy="58" rx="17" ry="14" fill="url(#woodGrad)"/>
        <!-- Sound hole -->
        <circle cx="40" cy="48" r="4.5" fill="#2E1C0C"/>
        <!-- Bridge -->
        <rect x="34" y="62" width="12" height="3" rx="1" fill="#4A2800"/>
        <!-- Strings -->
        <line x1="40" y1="16" x2="40" y2="62" stroke="#FFF" stroke-width="1.2" opacity="0.8"/>
      </svg>
    `
  },
  {
    id: 'greenmug',
    name: 'Green Mug',
    color: '#7CB342',
    svg: `
      <svg viewBox="0 0 80 80">
        <defs>
          <linearGradient id="mugGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#689F38"/>
            <stop offset="40%" stop-color="#8BC34A"/>
            <stop offset="100%" stop-color="#558B2F"/>
          </linearGradient>
        </defs>
        <!-- Handle -->
        <path d="M52 35 C64 35 64 53 52 53" stroke="#558B2F" stroke-width="5" fill="none" stroke-linecap="round"/>
        <!-- Cup Body -->
        <rect x="23" y="27" width="31" height="38" rx="7" fill="url(#mugGrad)"/>
        <!-- Cup Rim Oval -->
        <ellipse cx="38.5" cy="27" rx="15.5" ry="4" fill="#AED581"/>
        <ellipse cx="38.5" cy="27" rx="12" ry="2.5" fill="#33691E"/>
        <!-- Gloss highlight -->
        <path d="M27 34 L27 58" stroke="#DCEDC8" stroke-width="2.5" stroke-linecap="round" opacity="0.6"/>
      </svg>
    `
  },
  {
    id: 'cupcake',
    name: 'Choc Cupcake',
    color: '#D81B60',
    svg: `
      <svg viewBox="0 0 80 80">
        <defs>
          <linearGradient id="cupcakeBase" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#FDD835"/>
            <stop offset="100%" stop-color="#FBC02D"/>
          </linearGradient>
          <linearGradient id="frostingGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#5D4037"/>
            <stop offset="40%" stop-color="#795548"/>
            <stop offset="100%" stop-color="#4E342E"/>
          </linearGradient>
        </defs>
        <!-- Cupcake Wrapper -->
        <polygon points="26,45 54,45 49,69 31,69" fill="url(#cupcakeBase)"/>
        <!-- Wrapper Ridges -->
        <line x1="31" y1="45" x2="35" y2="69" stroke="#F57F17" stroke-width="1.2"/>
        <line x1="40" y1="45" x2="40" y2="69" stroke="#F57F17" stroke-width="1.2"/>
        <line x1="49" y1="45" x2="45" y2="69" stroke="#F57F17" stroke-width="1.2"/>
        <!-- Swirled Chocolate Frosting -->
        <path d="M22 45 C22 36 30 33 40 33 C50 33 58 36 58 45 C56 48 51 47 47 48 C43 49 37 49 33 48 C29 47 24 48 22 45 Z" fill="url(#frostingGrad)"/>
        <path d="M28 35 C28 26 34 23 40 23 C46 23 52 26 52 35 Z" fill="url(#frostingGrad)"/>
        <!-- Pink/White Sprinkles -->
        <circle cx="34" cy="33" r="1.5" fill="#FF4081"/>
        <circle cx="45" cy="30" r="1.5" fill="#FFF"/>
        <circle cx="38" cy="40" r="1.5" fill="#00E676"/>
        <circle cx="48" cy="42" r="1.5" fill="#FFEB3B"/>
        <circle cx="30" cy="43" r="1.5" fill="#FF4081"/>
      </svg>
    `
  },
  {
    id: 'popsicle',
    name: 'Lime Popsicle',
    color: '#81C784',
    svg: `
      <svg viewBox="0 0 80 80">
        <defs>
          <linearGradient id="popGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#66BB6A"/>
            <stop offset="35%" stop-color="#A5D6A7"/>
            <stop offset="100%" stop-color="#4CAF50"/>
          </linearGradient>
        </defs>
        <!-- Wooden stick -->
        <rect x="37" y="55" width="6" height="18" rx="3" fill="#D7CCC8"/>
        <!-- Ice pop body -->
        <rect x="26" y="16" width="28" height="42" rx="12" fill="url(#popGrad)"/>
        <!-- Ridges -->
        <rect x="33" y="24" width="4" height="26" rx="2" fill="#C8E6C9" opacity="0.7"/>
        <rect x="43" y="24" width="4" height="26" rx="2" fill="#388E3C" opacity="0.4"/>
      </svg>
    `
  },
  {
    id: 'coffeecup',
    name: 'Coffee Tumbler',
    color: '#4E342E',
    svg: `
      <svg viewBox="0 0 80 80">
        <defs>
          <linearGradient id="paperCup" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#BCAAA4"/>
            <stop offset="50%" stop-color="#D7CCC8"/>
            <stop offset="100%" stop-color="#A1887F"/>
          </linearGradient>
        </defs>
        <!-- Black Lid -->
        <rect x="25" y="15" width="30" height="7" rx="3" fill="#212121"/>
        <rect x="28" y="12" width="24" height="4" rx="2" fill="#424242"/>
        <!-- Cup Body -->
        <polygon points="26,22 54,22 49,67 31,67" fill="url(#paperCup)"/>
        <!-- Sleeve -->
        <polygon points="27,34 53,34 51,52 29,52" fill="#5D4037"/>
        <circle cx="40" cy="43" r="5" fill="#3E2723"/>
      </svg>
    `
  },
  {
    id: 'cola',
    name: 'Red Soda Can',
    color: '#E53935',
    svg: `
      <svg viewBox="0 0 80 80">
        <defs>
          <linearGradient id="canGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#C62828"/>
            <stop offset="45%" stop-color="#EF5350"/>
            <stop offset="100%" stop-color="#B71C1C"/>
          </linearGradient>
        </defs>
        <ellipse cx="40" cy="18" rx="19" ry="6" fill="#B0BEC5"/>
        <path d="M21 18 L21 62 C21 67 59 67 59 62 L59 18 Z" fill="url(#canGrad)"/>
        <ellipse cx="40" cy="62" rx="19" ry="5" fill="#8E0000"/>
        <ellipse cx="40" cy="18" rx="15" ry="4" fill="#ECEFF1"/>
        <!-- Iconic White Ribbon -->
        <path d="M21 38 Q40 52 59 34 L59 44 Q40 62 21 48 Z" fill="#FFFFFF" opacity="0.95"/>
      </svg>
    `
  },
  {
    id: 'waterbottle',
    name: 'Sports Bottle',
    color: '#00BCD4',
    svg: `
      <svg viewBox="0 0 80 80">
        <defs>
          <linearGradient id="bottleGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#4DD0E1"/>
            <stop offset="50%" stop-color="#E0F7FA"/>
            <stop offset="100%" stop-color="#00ACC1"/>
          </linearGradient>
        </defs>
        <!-- Blue Cap & Loop Handle -->
        <path d="M34 10 C34 6 46 6 46 10" stroke="#0288D1" stroke-width="3" fill="none"/>
        <rect x="35" y="10" width="10" height="7" rx="2" fill="#03A9F4"/>
        <!-- Bottle body -->
        <path d="M28 20 C28 17 52 17 52 20 L53 64 C53 68 27 68 27 64 Z" fill="url(#bottleGrad)"/>
        <!-- Handle strap -->
        <path d="M26 26 C21 28 21 48 26 50" stroke="#0288D1" stroke-width="3" fill="none"/>
      </svg>
    `
  },
  {
    id: 'thermos',
    name: 'Cream Kettle',
    color: '#FFF8E1',
    svg: `
      <svg viewBox="0 0 80 80">
        <defs>
          <linearGradient id="kettleGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#FFF9C4"/>
            <stop offset="50%" stop-color="#FFFFFF"/>
            <stop offset="100%" stop-color="#FFF59D"/>
          </linearGradient>
        </defs>
        <!-- Blue Top Cap & Spout -->
        <rect x="29" y="13" width="22" height="7" rx="3" fill="#0288D1"/>
        <!-- Kettle Body -->
        <path d="M28 20 L27 63 C27 67 53 67 53 63 L52 20 Z" fill="url(#kettleGrad)"/>
        <!-- Base Blue Rim -->
        <rect x="27" y="62" width="26" height="5" rx="2" fill="#E53935"/>
        <!-- Handle -->
        <path d="M53 26 C62 30 62 52 53 56" stroke="#0288D1" stroke-width="4" fill="none"/>
      </svg>
    `
  }
];

export function getGoodById(id) {
  return GOODS_TYPES.find(g => g.id === id) || GOODS_TYPES[0];
}
