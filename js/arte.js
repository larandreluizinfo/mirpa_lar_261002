/* O Último Relato — arte das cenas.
   Cada ambiente e desenhado em SVG no espaco 0 0 100 100, que corresponde
   exatamente as coordenadas em porcentagem usadas pelos hotspots. Por isso
   preserveAspectRatio="none": um objeto em x=10 fica em 10% da largura, igual
   ao hotspot que o aponta. Todo objeto com id de hotspot leva data-arte. */

const EMBRULHO =
  '<svg class="palco__desenho" viewBox="0 0 100 100" preserveAspectRatio="none" ' +
  'xmlns="http://www.w3.org/2000/svg" aria-hidden="true">';

export function desenhar(id) {
  const cena = ARTE[id];
  if (!cena) return '';
  const { defs, corpo } = cena();
  return EMBRULHO + defs + corpo + '</svg>';
}



/* ---------- 1. Pórtico de Brejinho ---------- */

function estrada(d, c) {
  d(`
    <linearGradient id="ceus" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#080b12"/>
      <stop offset="55%" stop-color="#141a24"/>
      <stop offset="88%" stop-color="#3b2a22"/>
      <stop offset="100%" stop-color="#1a1512"/>
    </linearGradient>
    <radialGradient id="sol" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0%" stop-color="#c98b4a" stop-opacity="0.55"/>
      <stop offset="100%" stop-color="#c98b4a" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="chao" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#1c1713"/>
      <stop offset="100%" stop-color="#0b0908"/>
    </linearGradient>
    <filter id="soft"><feGaussianBlur stdDeviation="1.6"/></filter>`);

  c(`
    <rect width="100" height="100" fill="url(#ceus)"/>
    <ellipse cx="32" cy="66" rx="30" ry="16" fill="url(#sol)" filter="url(#soft)"/>
    <path d="M0 62 L0 58 Q14 54 26 57 Q38 60 52 55 Q68 50 80 55 Q92 59 100 54 L100 62 Z" fill="#0d1016"/>
    <path d="M0 66 Q20 62 38 65 Q58 68 74 63 Q88 60 100 64 L100 100 L0 100 Z" fill="url(#chao)"/>

    <!-- estrada de terra -->
    <path d="M46 100 L55 100 L51.5 64 L49.5 64 Z" fill="#241d17"/>
    <path d="M47 96 L53.5 96" stroke="#3a2f26" stroke-width="0.6" opacity="0.5"/>
    <path d="M48.4 84 L52.6 84" stroke="#3a2f26" stroke-width="0.6" opacity="0.45"/>

    <!-- placa de entrada -->
    <g data-arte="e-placa">
      <path d="M11 44 L11 66" stroke="#2a2219" stroke-width="1.4"/>
      <rect x="2.5" y="38" width="17" height="7.5" fill="#2f2820" stroke="#463b2d" stroke-width="0.4"/>
      <path d="M4.5 40.4 L17.5 40.4 M4.5 42 L17.5 42" stroke="#6b5c47" stroke-width="0.5" opacity="0.7"/>
      <path d="M4.5 43.6 L13 43.6" stroke="#6b5c47" stroke-width="0.5" opacity="0.5"/>
    </g>

    <!-- capela -->
    <g data-arte="e-capela">
      <path d="M65 16 L65 22 M62.4 18.4 L67.6 18.4" stroke="#3b332a" stroke-width="1"/>
      <path d="M57 34 L65 24 L73 34 Z" fill="#191510"/>
      <path d="M58 34 L72 34 L72 50 L58 50 Z" fill="#0f0c09"/>
      <rect x="62" y="38" width="6" height="7" fill="#05070a"/>
      <path d="M63 38 L63 45 M65 38 L65 45" stroke="#2c2419" stroke-width="0.3"/>
      <path d="M57 50 L73 50" stroke="#241d16" stroke-width="0.8"/>
    </g>

    <!-- caseiro com a luz acesa -->
    <g data-arte="e-caseiro">
      <path d="M23 51 L31 44 L39 51 Z" fill="#120f0c"/>
      <path d="M24.5 51 L37.5 51 L37.5 66 L24.5 66 Z" fill="#171310"/>
      <rect x="27.5" y="54" width="4" height="4" fill="#d9a75c" opacity="0.92"/>
      <path d="M31.5 54 L31.5 58 M27.5 56 L31.5 56" stroke="#2b2015" stroke-width="0.35"/>
      <ellipse cx="29.5" cy="56" rx="7" ry="6" fill="#d9a75c" opacity="0.10"/>
      <rect x="33" y="58.5" width="4" height="7.5" fill="#0a0807"/>
      <path d="M24.5 66 L37.5 66" stroke="#241d16" stroke-width="0.6"/>
    </g>

    <!-- portão da represa -->
    <g data-arte="e-portao">
      <path d="M76 44 L76 64 M94 44 L94 64" stroke="#2b241c" stroke-width="1.6"/>
      <path d="M76 46 L94 46 M76 52 L94 52 M76 58 L94 58" stroke="#251f18" stroke-width="0.8"/>
      <path d="M80 46 L80 58 M84 46 L84 58 M88 46 L88 58 M91 46 L91 58" stroke="#221c16" stroke-width="0.5"/>
      <path d="M78 44 Q85 41 92 44" stroke="#8d8a80" stroke-width="1.1" fill="none" stroke-dasharray="1.6 1.1"/>
      <rect x="84" y="40.4" width="2.2" height="2.2" fill="#6f6c64"/>
      <path d="M76 64 L94 64" stroke="#1c1813" stroke-width="1"/>
      <rect x="75" y="63" width="20" height="1.6" fill="#100e0b"/>
    </g>`);
}

/* ---------- 2. Açude de Brejinho ---------- */

function acude(d, c) {
  d(`
    <linearGradient id="ceuac" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#070b10"/>
      <stop offset="48%" stop-color="#111b21"/>
      <stop offset="100%" stop-color="#1c2a30"/>
    </linearGradient>
    <linearGradient id="agua" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#1d2b31"/>
      <stop offset="45%" stop-color="#131d23"/>
      <stop offset="100%" stop-color="#070b0e"/>
    </linearGradient>
    <linearGradient id="lama" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#1a1712"/>
      <stop offset="100%" stop-color="#0a0908"/>
    </linearGradient>
    <filter id="softac"><feGaussianBlur stdDeviation="1.1"/></filter>`);

  c(`
    <rect width="100" height="100" fill="url(#ceuac)"/>
    <path d="M0 48 Q20 45 34 47 Q50 49 66 46 Q84 43 100 46 L100 52 L0 52 Z" fill="#0a0f13"/>
    <rect x="0" y="50" width="100" height="50" fill="url(#agua)"/>

    <!-- parede submersa e torre de sineiro -->
    <g data-arte="a-muro" opacity="0.92">
      <path d="M12 44 L12 30 L20 30 L20 44 Z" fill="#0c1216" stroke="#1b262b" stroke-width="0.4"/>
      <path d="M11 30 L16 25 L21 30 Z" fill="#0f161a"/>
      <rect x="13.6" y="34" width="4.6" height="5.4" fill="#050809"/>
      <path d="M11.5 44 L21 44" stroke="#243037" stroke-width="0.5"/>
      <path d="M21 44 L34 44 L34 52 L21 52 Z" fill="#0b1114" opacity="0.7"/>
      <rect x="24" y="46" width="5" height="4.6" fill="#050809"/>
      <path d="M26.5 46 L26.5 50.6" stroke="#1c262b" stroke-width="0.3"/>
    </g>

    <!-- água lisa -->
    <g data-arte="a-agua">
      <path d="M40 58 L58 58" stroke="#2f4750" stroke-width="0.5" opacity="0.4"/>
      <path d="M43 62 L60 62" stroke="#2f4750" stroke-width="0.4" opacity="0.28"/>
      <path d="M46 66 L57 66" stroke="#2f4750" stroke-width="0.4" opacity="0.2"/>
    </g>

    <!-- boia no galho -->
    <g data-arte="a-boia">
      <path d="M58 84 Q66 76 76 70" stroke="#1d1913" stroke-width="1.4" fill="none"/>
      <path d="M70 76 L66 72 M70 76 L74 71" stroke="#1d1913" stroke-width="0.7"/>
      <circle cx="71" cy="72.5" r="3.4" fill="#b9b2a2" opacity="0.85"/>
      <circle cx="71" cy="72.5" r="3.4" fill="none" stroke="#6d675b" stroke-width="0.5"/>
      <path d="M69 70.4 Q71 72.5 73 70.4" stroke="#6d675b" stroke-width="0.4" fill="none"/>
      <path d="M70 73.5 L70.6 78" stroke="#9aa6ab" stroke-width="0.4" opacity="0.5"/>
    </g>

    <!-- margem de lama com marcas de arrasto -->
    <g data-arte="a-margem">
      <path d="M0 82 Q18 80 34 84 Q48 88 62 84 L100 80 L100 100 L0 100 Z" fill="url(#lama)"/>
      <path d="M30 86 L44 80 M30.5 87.4 L44.5 81.4" stroke="#2a251d" stroke-width="0.7" opacity="0.85"/>
      <path d="M31 84.6 Q36 82.6 40 83.4" stroke="#332c22" stroke-width="0.5" fill="none" opacity="0.6"/>
      <path d="M8 92 Q20 90 30 92 M52 94 Q64 92 74 94" stroke="#1e1a14" stroke-width="0.5" opacity="0.5"/>
      <ellipse cx="40" cy="90" rx="16" ry="4" fill="#000" opacity="0.25" filter="url(#softac)"/>
    </g>`);
}

/* ---------- 3. Casa de bombas ---------- */

function bombas(d, c) {
  d(`
    <linearGradient id="paredeb" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#0e1013"/>
      <stop offset="55%" stop-color="#191b1c"/>
      <stop offset="100%" stop-color="#0b0c0d"/>
    </linearGradient>
    <radialGradient id="luzb" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0%" stop-color="#e8b96e" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#e8b96e" stop-opacity="0"/>
    </radialGradient>
    <filter id="softb"><feGaussianBlur stdDeviation="1.4"/></filter>`);

  c(`
    <rect width="100" height="100" fill="url(#paredeb)"/>
    <path d="M0 74 L100 74 L100 100 L0 100 Z" fill="#0a0a09"/>
    <path d="M0 74 L100 74" stroke="#1d1e1c" stroke-width="0.5"/>

    <!-- janela quebrada -->
    <path d="M78 16 L92 16 L92 30 L78 30 Z" fill="#05070a" stroke="#24262a" stroke-width="0.5"/>
    <path d="M78 23 L92 23 M85 16 L85 30" stroke="#24262a" stroke-width="0.4"/>
    <path d="M81 16 L81 21 M88 24 L92 27" stroke="#3c4046" stroke-width="0.35" opacity="0.6"/>
    <ellipse cx="85" cy="26" rx="14" ry="12" fill="url(#luzb)"/>

    <!-- porta de ferro -->
    <g data-arte="b-porta">
      <rect x="12" y="42" width="15" height="32" fill="#0b0c0d" stroke="#33373c" stroke-width="0.7"/>
      <path d="M14.5 44 L24.5 44 L24.5 72 L14.5 72 Z" fill="none" stroke="#2a2d31" stroke-width="0.4"/>
      <rect x="12" y="42" width="15" height="1.8" fill="#3a3e44"/>
      <circle cx="24.6" cy="58" r="0.9" fill="#4a4f56"/>
      <path d="M12 56 L16 56 M12 60 L16 60" stroke="#24272b" stroke-width="0.35"/>
    </g>

    <!-- chaveiro de pregos -->
    <g data-arte="b-chave">
      <path d="M30 26 L30 30" stroke="#2b2e32" stroke-width="0.7"/>
      <rect x="29.4" y="29.4" width="1.6" height="1.6" fill="#3d4248" transform="rotate(18 30.2 30.2)"/>
      <path d="M33.5 33.5 L35.8 33.5" stroke="#8a8f96" stroke-width="0.45"/>
      <circle cx="33.2" cy="33.5" r="1" fill="none" stroke="#8a8f96" stroke-width="0.45"/>
      <path d="M35.8 33.5 L35.8 36.4 M36.6 34.4 L36.6 36" stroke="#8a8f96" stroke-width="0.35"/>
      <path d="M37.6 33.8 L38.6 33.8 L38.6 35.4" stroke="#6e737a" stroke-width="0.35" fill="none"/>
    </g>

    <!-- placa de alagamento -->
    <g data-arte="b-alvara">
      <rect x="57" y="19" width="16" height="9" fill="#4a4640" stroke="#6d675d" stroke-width="0.5"/>
      <rect x="58.4" y="20.6" width="13.2" height="2.2" fill="#7b746a" opacity="0.85"/>
      <path d="M58.4 24.6 L71.6 24.6 M58.4 26.2 L66 26.2" stroke="#8f887c" stroke-width="0.4" opacity="0.7"/>
      <circle cx="58.8" cy="20" r="0.45" fill="#22201d"/>
      <circle cx="71.2" cy="20" r="0.45" fill="#22201d"/>
      <circle cx="58.8" cy="27" r="0.45" fill="#22201d"/>
      <circle cx="71.2" cy="27" r="0.45" fill="#22201d"/>
      <path d="M63 23 L68 26.5 M68 23 L63 26.5" stroke="#2a2724" stroke-width="0.45" opacity="0.6"/>
    </g>

    <!-- mesa de comando -->
    <g data-arte="b-escala">
      <rect x="52" y="58" width="20" height="1.4" fill="#25282b"/>
      <rect x="54" y="59.4" width="1.2" height="7" fill="#1a1d1f"/>
      <rect x="69" y="59.4" width="1.2" height="7" fill="#1a1d1f"/>
      <path d="M56 57 L64 53 L68 56.4 L60 60 Z" fill="#8e8b83" opacity="0.9"/>
      <path d="M58 56.6 L64.4 54" stroke="#c9c6bd" stroke-width="0.35" opacity="0.7"/>
      <path d="M62 52 L62 49.4" stroke="#cbc8bf" stroke-width="0.5" opacity="0.8"/>
      <rect x="70" y="56.4" width="2.4" height="1.6" fill="#2a2c2e"/>
      <ellipse cx="60" cy="64" rx="11" ry="5" fill="#e8b96e" opacity="0.05" filter="url(#softb)"/>
    </g>

    <!-- lona com a lancha -->
    <g data-arte="b-lanca">
      <path d="M78 72 Q76 56 84 50 Q92 46 96 52 L96 72 Z" fill="#191a18"/>
      <path d="M78 72 Q76 58 82 53" stroke="#2e302c" stroke-width="0.5" fill="none"/>
      <path d="M84 50 Q88 47 92 49" stroke="#33352f" stroke-width="0.5" fill="none"/>
      <path d="M88 47 Q92 44 96 46" stroke="#2a2c28" stroke-width="0.45" fill="none"/>
      <path d="M74 72 L98 72" stroke="#131412" stroke-width="1.2"/>
    </g>

    <!-- rádio -->
    <g data-arte="b-radio">
      <rect x="34" y="70" width="11" height="7" rx="0.6" fill="#232629" stroke="#35393d" stroke-width="0.4"/>
      <circle cx="41" cy="73.6" r="2.1" fill="#0e1012" stroke="#454a4f" stroke-width="0.4"/>
      <circle cx="41" cy="73.6" r="0.5" fill="#7c8188"/>
      <path d="M35.5 72 L37.5 72 M35.5 74 L37.5 74" stroke="#4a4f55" stroke-width="0.3"/>
      <path d="M44 70 L47 63" stroke="#5a6066" stroke-width="0.35"/>
      <circle cx="47" cy="62.6" r="0.35" fill="#8b9199"/>
      <ellipse cx="40" cy="74" rx="13" ry="7" fill="#9fb8c4" opacity="0.05"/>
    </g>`);
}

/* ---------- 4. Casa de Dona Zulmira ---------- */

function zulmira(d, c) {
  d(`
    <linearGradient id="paredez" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#0d0a08"/>
      <stop offset="52%" stop-color="#1c1611"/>
      <stop offset="100%" stop-color="#0a0806"/>
    </linearGradient>
    <radialGradient id="luzjan" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0%" stop-color="#c99a52" stop-opacity="0.5"/>
      <stop offset="100%" stop-color="#c99a52" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="vidrojan" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#243642"/>
      <stop offset="100%" stop-color="#0d1519"/>
    </linearGradient>
    <filter id="softz"><feGaussianBlur stdDeviation="1.3"/></filter>`);

  c(`
    <rect width="100" height="100" fill="url(#paredez)"/>
    <path d="M0 78 L100 78 L100 100 L0 100 Z" fill="#0d0a07"/>
    <path d="M0 78 L100 78" stroke="#241a12" stroke-width="0.4"/>

    <!-- janela atrás dela -->
    <rect x="58" y="20" width="24" height="30" fill="url(#vidrojan)" stroke="#2e2117" stroke-width="0.8"/>
    <path d="M70 20 L70 50 M58 35 L82 35" stroke="#2e2117" stroke-width="0.7"/>
    <path d="M59 21 L69 21 L69 34 L59 34 Z" fill="#2c4450" opacity="0.35"/>
    <ellipse cx="70" cy="34" rx="22" ry="20" fill="url(#luzjan)" opacity="0.28"/>

    <!-- ela, de costas, entre a geladeira e a janela -->
    <g opacity="0.96">
      <ellipse cx="52" cy="26" rx="5" ry="6" fill="#0a0806"/>
      <path d="M46 33 Q52 30 58 33 L61 52 L60 78 L44 78 L43 52 Z" fill="#100c09"/>
      <path d="M46 33 Q52 30 58 33 L58.6 40 L45.4 40 Z" fill="#0d0a07"/>
      <path d="M61 40 Q65 50 64 62" stroke="#0a0806" stroke-width="2.2" fill="none"/>
      <path d="M43 40 Q39 50 40 62" stroke="#0a0806" stroke-width="2.2" fill="none"/>
    </g>

    <!-- geladeira -->
    <rect x="14" y="24" width="16" height="40" fill="#1a1511" stroke="#2c231a" stroke-width="0.6"/>
    <path d="M14 40 L30 40" stroke="#2c231a" stroke-width="0.5"/>
    <path d="M17 28 L17 37 M17 43 L17 54" stroke="#3d3024" stroke-width="0.5"/>
    <rect x="20" y="30" width="7" height="1.4" fill="#c9a15c" opacity="0.4"/>

    <!-- fogão aceso -->
    <rect x="72" y="62" width="18" height="16" fill="#191410" stroke="#2b221a" stroke-width="0.6"/>
    <circle cx="78" cy="67" r="2.4" fill="#c96a2e" opacity="0.6"/>
    <circle cx="84" cy="67" r="2.4" fill="#3a2c22"/>
    <ellipse cx="78" cy="66" rx="14" ry="10" fill="#c96a2e" opacity="0.10" filter="url(#softz)"/>
    <rect x="74.5" y="55" width="4.5" height="7" fill="#2b2119"/>
    <rect x="80.5" y="57" width="4.5" height="5" fill="#2b2119"/>

    <!-- mesa com o bolo -->
    <rect x="24" y="70" width="22" height="1.6" fill="#241b13"/>
    <rect x="26" y="71.6" width="1.4" height="12" fill="#180f09"/>
    <rect x="43" y="71.6" width="1.4" height="12" fill="#180f09"/>
    <path d="M30 70 Q34 65 38 70 Z" fill="#3a2a1a"/>
    <ellipse cx="34" cy="70" rx="4" ry="0.9" fill="#4a3520"/>
    <ellipse cx="34" cy="68" rx="9" ry="4" fill="#c99a52" opacity="0.06"/>

    <!-- porta estreita atrás -->
    <rect x="2" y="30" width="9" height="48" fill="#120d0a" stroke="#241a12" stroke-width="0.5"/>
    <circle cx="9" cy="54" r="0.7" fill="#3d3024"/>
    <ellipse cx="20" cy="44" rx="12" ry="9" fill="#000" opacity="0.28" filter="url(#softz)"/>`);
}

/* ---------- 5. Cemitério de Brejinho ---------- */

function cemiterio(d, c) {
  d(`
    <linearGradient id="ceuce" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#0e0c0a"/>
      <stop offset="46%" stop-color="#3a2a1c"/>
      <stop offset="74%" stop-color="#241a12"/>
      <stop offset="100%" stop-color="#100c09"/>
    </linearGradient>
    <linearGradient id="terra" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#1a140f"/>
      <stop offset="100%" stop-color="#080706"/>
    </linearGradient>
    <radialGradient id="luzce" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0%" stop-color="#d6a55c" stop-opacity="0.4"/>
      <stop offset="100%" stop-color="#d6a55c" stop-opacity="0"/>
    </radialGradient>
    <filter id="softce"><feGaussianBlur stdDeviation="1.5"/></filter>`);

  c(`
    <rect width="100" height="100" fill="url(#ceuce)"/>
    <circle cx="76" cy="22" r="3.4" fill="#c8a068" opacity="0.5"/>
    <ellipse cx="76" cy="22" rx="14" ry="12" fill="#c8a068" opacity="0.07"/>
    <path d="M0 48 Q24 44 44 47 Q66 50 84 46 L100 48 L100 100 L0 100 Z" fill="url(#terra)"/>
    <path d="M0 62 L100 60" stroke="#241a13" stroke-width="0.4" opacity="0.6"/>

    <!-- muro do fundo -->
    <g data-arte="k-muro">
      <path d="M82 44 L100 44 L100 60 L82 60 Z" fill="#161109"/>
      <path d="M82 44 L100 44" stroke="#2e2216" stroke-width="0.5"/>
      <path d="M86 44 L86 60 M92 44 L92 60 M97 44 L97 60" stroke="#0e0b07" stroke-width="0.35"/>
      <ellipse cx="88" cy="66" rx="9" ry="3" fill="#1c1710"/>
      <path d="M85 66 L90 66 M88.5 65.2 L88.5 67" stroke="#2b2419" stroke-width="0.5"/>
    </g>

    <!-- lápide dos Oliveira -->
    <g data-arte="k-nome">
      <path d="M63 58 L63 44 Q63 40 67.5 40 Q72 40 72 44 L72 58 Z" fill="#1e1a14" stroke="#2b2419" stroke-width="0.5"/>
      <path d="M65.5 47 L69.5 47 M67.5 44.5 L67.5 50" stroke="#3a3227" stroke-width="0.4" opacity="0.8"/>
      <path d="M62 58 L73 58 L73 60 L62 60 Z" fill="#15110d"/>
      <ellipse cx="67.5" cy="62" rx="7" ry="2" fill="#000" opacity="0.3" filter="url(#softce)"/>
    </g>

    <!-- lápide nova, sem epitáfio -->
    <g data-arte="k-lapide">
      <path d="M0 100 L0 84 Q0 78 6 78 L10 78 Q16 78 16 84 L16 100 Z" fill="#332f28"/>
      <path d="M1.5 84 Q1.5 79.5 6 79.5 L10 79.5 Q14.5 79.5 14.5 84" fill="none" stroke="#514a3f" stroke-width="0.6"/>
      <rect x="3" y="84" width="10" height="6" fill="#3c382f"/>
      <path d="M4.5 86 L11.5 86 M4.5 88 L9 88" stroke="#6b6355" stroke-width="0.35" opacity="0.7"/>
      <path d="M6 90 L11 88.6" stroke="#25211b" stroke-width="0.5"/>
      <ellipse cx="8" cy="97" rx="12" ry="4" fill="#000" opacity="0.4" filter="url(#softce)"/>
      <path d="M0 74 Q12 71 24 75" stroke="#241a12" stroke-width="0.5" fill="none" opacity="0.7"/>
    </g>

    <!-- outras lápides ao fundo -->
    <g opacity="0.55">
      <path d="M44 58 L44 50 Q44 48 46.5 48 Q49 48 49 50 L49 58 Z" fill="#191510"/>
      <path d="M24 62 L24 55 Q24 53 26.5 53 Q29 53 29 55 L29 62 Z" fill="#161209"/>
      <path d="M80 62 L80 56 Q80 54 82.5 54 Q85 54 85 56 L85 62 Z" fill="#151109"/>
      <path d="M36 56 L36 51 Q36 49.5 38 49.5 Q40 49.5 40 51 L40 56 Z" fill="#120f09"/>
    </g>`);
}

/* ---------- 6. Oficina do Nenê ---------- */

function oficina(d, c) {
  d(`
    <linearGradient id="paredeo" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#0a0c0f"/>
      <stop offset="50%" stop-color="#14171b"/>
      <stop offset="100%" stop-color="#08090b"/>
    </linearGradient>
    <radialGradient id="luzo" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0%" stop-color="#7fa8c0" stop-opacity="0.28"/>
      <stop offset="100%" stop-color="#7fa8c0" stop-opacity="0"/>
    </radialGradient>
    <filter id="softo"><feGaussianBlur stdDeviation="1.4"/></filter>`);

  c(`
    <rect width="100" height="100" fill="url(#paredeo)"/>
    <path d="M0 76 L100 76 L100 100 L0 100 Z" fill="#0a0b0c"/>
    <path d="M0 76 L100 76" stroke="#1c2024" stroke-width="0.5"/>

    <!-- foto de parede -->
    <g data-arte="f-foto">
      <rect x="67" y="18" width="18" height="14" fill="#15181b" stroke="#2e3339" stroke-width="0.6"/>
      <rect x="68.6" y="19.6" width="14.8" height="10.8" fill="#252b31"/>
      <path d="M68.6 30.4 L83.4 30.4" stroke="#39414a" stroke-width="0.4"/>
      <circle cx="71.6" cy="24" r="1.1" fill="#4c555f"/>
      <circle cx="75" cy="23.4" r="1.1" fill="#4c555f"/>
      <circle cx="78.4" cy="23.8" r="1.1" fill="#4c555f"/>
      <circle cx="81" cy="25.6" r="0.9" fill="#3e464e"/>
      <path d="M70 30 Q71.6 27 73.2 30 M75.6 29.6 Q76.6 27.2 77.6 29.6" fill="#3b434b"/>
      <ellipse cx="76" cy="26" rx="16" ry="12" fill="url(#luzo)" opacity="0.5"/>
    </g>

    <!-- rádio da oficina -->
    <g data-arte="f-radio">
      <rect x="14" y="32" width="12" height="7.5" rx="0.6" fill="#1e2226" stroke="#33383e" stroke-width="0.4"/>
      <circle cx="22.4" cy="35.8" r="2.2" fill="#0c0e10" stroke="#474d54" stroke-width="0.4"/>
      <circle cx="22.4" cy="35.8" r="0.55" fill="#7d848c"/>
      <path d="M15.6 34 L18 34 M15.6 36 L18 36" stroke="#4b5158" stroke-width="0.3"/>
      <path d="M25.4 32 L28.6 25" stroke="#5c636a" stroke-width="0.35"/>
      <circle cx="28.6" cy="24.6" r="0.35" fill="#8c939b"/>
      <ellipse cx="21" cy="36" rx="14" ry="8" fill="#7fa8c0" opacity="0.05"/>
    </g>

    <!-- balcão -->
    <rect x="10" y="46" width="22" height="1.6" fill="#20252a"/>
    <rect x="12" y="47.6" width="1.4" height="12" fill="#14181b"/>
    <rect x="29" y="47.6" width="1.4" height="12" fill="#14181b"/>
    <path d="M26 44 L29 46 L26 46 Z" fill="#2b3138"/>

    <!-- caixa de sapato -->
    <g data-arte="f-caixa">
      <path d="M55 62 L55 54 L69 54 L69 62 Z" fill="#3a3227"/>
      <path d="M55 54 L62 51 L69 54 L62 56 Z" fill="#4a4032"/>
      <path d="M62 56 L62 62" stroke="#2b251d" stroke-width="0.4"/>
      <path d="M57 56.4 L59.6 56.4" stroke="#6b6050" stroke-width="0.4"/>
      <ellipse cx="62" cy="64" rx="10" ry="3" fill="#000" opacity="0.3" filter="url(#softo)"/>
    </g>

    <!-- elevador e jeep -->
    <path d="M36 30 L36 76 M70 30 L70 76" stroke="#1a1e22" stroke-width="1.6"/>
    <path d="M36 40 L70 40 M36 62 L70 62" stroke="#171b1f" stroke-width="0.9"/>
    <g>
      <path d="M38 58 Q38 48 46 47 L58 47 Q62 47 66 50 L70 50 L70 58 Z" fill="#15181c"/>
      <path d="M47 49 L56 49 Q59 49 60 51 L60 55 L46 55 Z" fill="#0b0e11"/>
      <circle cx="45" cy="58" r="4.4" fill="#0a0c0e" stroke="#252a2f" stroke-width="0.7"/>
      <circle cx="63" cy="58" r="4.4" fill="#0a0c0e" stroke="#252a2f" stroke-width="0.7"/>
      <path d="M36 63 L70 63" stroke="#1c2126" stroke-width="1.4"/>
      <path d="M70 47 L73 47 L73 52 L70 52 Z" fill="#2b3138"/>
      <ellipse cx="62" cy="66" rx="12" ry="4" fill="#000" opacity="0.35" filter="url(#softo)"/>
    </g>

    <!-- balde com o resíduo -->
    <g data-arte="f-balde">
      <path d="M56 74 L57.4 66 L64.6 66 L66 74 Z" fill="#12161a"/>
      <path d="M56.6 66 L64.6 66" stroke="#2a3036" stroke-width="0.5"/>
      <path d="M56.6 69 Q60.6 70 64.6 69" stroke="#05070a" stroke-width="1"/>
      <path d="M60.6 70.4 Q59 72 61.4 73.6" stroke="#4a4034" stroke-width="0.6" fill="none" opacity="0.8"/>
      <path d="M56 74 L66 74" stroke="#0a0c0e" stroke-width="1"/>
      <ellipse cx="61" cy="77" rx="9" ry="2.4" fill="#05070a" opacity="0.6"/>
    </g>

    <!-- porta de enrolar aberta -->
    <path d="M82 20 L96 20 L96 76 L82 76 Z" fill="#0b0e11"/>
    <path d="M82 24 L96 24 M82 28 L96 28 M82 32 L96 32 M82 36 L96 36 M82 40 L96 40" stroke="#1a1f24" stroke-width="0.5"/>
    <rect x="82" y="18" width="14" height="2.4" fill="#20262c"/>
    <ellipse cx="89" cy="48" rx="12" ry="16" fill="#5f8aa0" opacity="0.05"/>`);
}

/* ---------- 7. Sede do jornal O Brejinho ---------- */

function jornal(d, c) {
  d(`
    <linearGradient id="paredej" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#0a0a0c"/>
      <stop offset="52%" stop-color="#15151b"/>
      <stop offset="100%" stop-color="#08080a"/>
    </linearGradient>
    <radialGradient id="luzj" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0%" stop-color="#d8cf9a" stop-opacity="0.30"/>
      <stop offset="100%" stop-color="#d8cf9a" stop-opacity="0"/>
    </radialGradient>
    <filter id="softj"><feGaussianBlur stdDeviation="1.3"/></filter>`);

  c(`
    <rect width="100" height="100" fill="url(#paredej)"/>
    <path d="M0 72 L100 72 L100 100 L0 100 Z" fill="#0a0a0c"/>
    <path d="M0 72 L100 72" stroke="#1c1c22" stroke-width="0.4"/>

    <!-- porta dos fundos -->
    <g data-arte="n-porta">
      <rect x="4" y="30" width="20" height="42" fill="#08080a" stroke="#26262e" stroke-width="0.7"/>
      <path d="M6 33 L22 33 L22 69 L6 69 Z" fill="none" stroke="#1c1c22" stroke-width="0.4"/>
      <rect x="4" y="30" width="20" height="1.6" fill="#2c2c34"/>
      <path d="M4 24 L24 24 L24 30 L4 30 Z" fill="#0f0f13" stroke="#26262e" stroke-width="0.4"/>
      <path d="M9 24 L9 30 M16 24 L16 30" stroke="#26262e" stroke-width="0.5"/>
      <path d="M6 72 L22 72" stroke="#131318" stroke-width="0.6"/>
    </g>

    <!-- máquina de escrever -->
    <g>
      <path d="M28 60 L40 56 L46 60 L34 64 Z" fill="#1c1c22"/>
      <rect x="34" y="46" width="12" height="8" fill="#26262e" stroke="#33333c" stroke-width="0.4"/>
      <rect x="37" y="38" width="7" height="8.4" fill="#6f6a5c"/>
      <path d="M37 40 L44 40 M37 42 L44 42 M37 44 L44 44" stroke="#4a463c" stroke-width="0.3"/>
      <path d="M38 30 L44 30 L44 38 L38 38 Z" fill="#7a7466"/>
      <circle cx="47" cy="42" r="1.6" fill="#3a3a44"/>
      <ellipse cx="39" cy="52" rx="12" ry="8" fill="url(#luzj)" opacity="0.55"/>
    </g>

    <!-- fotografia na parede, com o rosto raspado -->
    <g data-arte="n-foto">
      <rect x="50" y="20" width="26" height="20" fill="#141418" stroke="#2c2c34" stroke-width="0.7"/>
      <rect x="51.6" y="21.6" width="22.8" height="16.8" fill="#26262c"/>
      <path d="M51.6 38.4 L74.4 38.4" stroke="#3a3a42" stroke-width="0.5"/>
      <path d="M51.6 27 L74.4 27 M51.6 24.4 L74.4 24.4" stroke="#33333b" stroke-width="0.3" opacity="0.7"/>
      <path d="M60 24.4 L60 38.4 M67 24.4 L67 38.4" stroke="#1e1e24" stroke-width="0.4" opacity="0.6"/>
      <circle cx="55.4" cy="32" r="1.5" fill="#45454e"/>
      <circle cx="60" cy="32" r="1.5" fill="#3e3e46"/>
      <rect x="64.6" y="29.6" width="4.2" height="4.6" fill="#2b2b31"/>
      <path d="M64.6 34.2 L68.8 34.2" stroke="#6a6a74" stroke-width="0.3" opacity="0.5"/>
      <circle cx="71.4" cy="31.4" r="1.5" fill="#45454e"/>
      <path d="M53.4 38.4 Q55.4 34.8 57.4 38.4 M58 38.4 Q60 34.8 62 38.4 M69.4 38.4 Q71.4 34.8 73.4 38.4" fill="#3b3b44"/>
      <ellipse cx="63" cy="30" rx="14" ry="12" fill="url(#luzj)" opacity="0.35"/>
    </g>

    <!-- acervo de 1998 -->
    <g data-arte="n-acervo">
      <rect x="76" y="26" width="20" height="46" fill="#101015" stroke="#24242c" stroke-width="0.6"/>
      <path d="M76 38 L96 38 M76 50 L96 50 M76 62 L96 62" stroke="#24242c" stroke-width="0.5"/>
      <rect x="78" y="29" width="3.4" height="9" fill="#2e2a24"/>
      <rect x="82" y="30" width="3" height="8" fill="#26221d"/>
      <rect x="86" y="28.6" width="3.6" height="9.4" fill="#332d25"/>
      <rect x="78" y="52" width="4.4" height="10" fill="#3a3227"/>
      <path d="M78 56 L82.4 56 M78 58 L82.4 58" stroke="#6b6050" stroke-width="0.35"/>
      <rect x="84" y="53" width="3.4" height="9" fill="#2a251e"/>
      <rect x="89" y="41" width="5" height="9" fill="#241f1a"/>
      <ellipse cx="86" cy="72" rx="13" ry="4" fill="#000" opacity="0.3" filter="url(#softj)"/>
    </g>

    <!-- escada lacrada -->
    <rect x="34" y="0" width="14" height="14" fill="#0c0c10"/>
    <path d="M34 14 L48 14" stroke="#2c2c34" stroke-width="1.2"/>
    <path d="M35 12 L47 12" stroke="#24242c" stroke-width="0.4"/>
    <path d="M28 8 L44 8 M28 4 L40 4" stroke="#1a1a20" stroke-width="0.5"/>
    <ellipse cx="41" cy="12" rx="12" ry="5" fill="#000" opacity="0.4" filter="url(#softj)"/>`);
}

/* ---------- 8. Delegacia de Brejinho ---------- */

function delegacia(d, c) {
  d(`
    <linearGradient id="paredeg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#0c0e13"/>
      <stop offset="50%" stop-color="#181a20"/>
      <stop offset="100%" stop-color="#0a0b0e"/>
    </linearGradient>
    <radialGradient id="luzg" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0%" stop-color="#c8c4a8" stop-opacity="0.26"/>
      <stop offset="100%" stop-color="#c8c4a8" stop-opacity="0"/>
    </radialGradient>
    <filter id="softg"><feGaussianBlur stdDeviation="1.4"/></filter>`);

  c(`
    <rect width="100" height="100" fill="url(#paredeg)"/>
    <path d="M0 70 L100 70 L100 100 L0 100 Z" fill="#0c0d0f"/>
    <path d="M0 70 L100 70" stroke="#1e2126" stroke-width="0.4"/>

    <!-- ventilador de teto -->
    <g opacity="0.9">
      <path d="M50 0 L50 12" stroke="#25282e" stroke-width="0.6"/>
      <circle cx="50" cy="13" r="1.2" fill="#2e3238"/>
      <ellipse cx="44" cy="13.6" rx="4.4" ry="1.5" fill="#22262b"/>
      <ellipse cx="56" cy="13.6" rx="4.4" ry="1.5" fill="#22262b"/>
      <ellipse cx="50" cy="17" rx="1.6" ry="4.2" fill="#22262b"/>
    </g>

    <!-- mapa com o círculo vermelho -->
    <g data-arte="g-mapa">
      <rect x="16" y="16" width="20" height="22" fill="#15171b" stroke="#2a2d33" stroke-width="0.6"/>
      <rect x="17.4" y="17.4" width="17.2" height="19.2" fill="#1e2226"/>
      <path d="M18.6 32 Q24 28 30 31 Q34 33 34 26" stroke="#3c4247" stroke-width="0.5" fill="none"/>
      <path d="M19 26 L22 26 L22 29 L19 29 Z" fill="#333940"/>
      <circle cx="26.6" cy="27.4" r="4.6" fill="none" stroke="#a83a32" stroke-width="0.85"/>
      <path d="M26.6 27.4 L26.6 31" stroke="#a83a32" stroke-width="0.4"/>
      <path d="M18 34.4 L34 34.4" stroke="#333940" stroke-width="0.3"/>
    </g>

    <!-- moldura de avisos -->
    <g data-arte="g-vitrine">
      <rect x="26" y="76" width="22" height="14" fill="#111317" stroke="#282c32" stroke-width="0.6"/>
      <rect x="27.4" y="77.4" width="19.2" height="11.2" fill="#1a1d21"/>
      <rect x="28.6" y="78.6" width="8" height="4.4" fill="#8a8672"/>
      <path d="M28.6 79.6 L36.6 79.6 M28.6 81.2 L34 81.2" stroke="#5c594c" stroke-width="0.3"/>
      <rect x="37.8" y="78.6" width="7.6" height="9.4" fill="#8f8a74"/>
      <path d="M37.8 79.6 L45.4 79.6 M37.8 81.2 L43 81.2 M37.8 82.8 L45.4 82.8 M37.8 84.4 L42 84.4" stroke="#5c594c" stroke-width="0.28"/>
      <rect x="27.4" y="84.4" width="4.6" height="4.2" fill="#7e7a66"/>
    </g>

    <!-- arquivo de aço -->
    <g data-arte="g-arquivo">
      <rect x="46" y="34" width="26" height="36" fill="#191c20" stroke="#2f333a" stroke-width="0.7"/>
      <path d="M46 44 L72 44 M46 54 L72 54 M46 64 L72 64" stroke="#2f333a" stroke-width="0.6"/>
      <rect x="52" y="38" width="14" height="1" fill="#41464d"/>
      <rect x="52" y="48" width="14" height="1" fill="#41464d"/>
      <rect x="52" y="58" width="14" height="1" fill="#41464d"/>
      <rect x="56" y="66" width="6" height="2" fill="#0e1013"/>
      <path d="M72 34 L72 70" stroke="#0d0f12" stroke-width="0.5"/>
      <ellipse cx="59" cy="72" rx="14" ry="4" fill="#000" opacity="0.35" filter="url(#softg)"/>
    </g>

    <!-- mesa com o mapa e a luminária -->
    <rect x="14" y="54" width="30" height="1.8" fill="#1c1f24"/>
    <rect x="16" y="55.8" width="1.6" height="14" fill="#121417"/>
    <rect x="40" y="55.8" width="1.6" height="14" fill="#121417"/>
    <rect x="18" y="48" width="14" height="6" fill="#22262b" stroke="#2f343a" stroke-width="0.4"/>
    <path d="M20 50 L30 50 M20 52 L27 52" stroke="#4b515a" stroke-width="0.3"/>
    <path d="M28 54 L28 48" stroke="#3a3f46" stroke-width="0.5"/>
    <ellipse cx="28" cy="47" rx="8" ry="3" fill="#c8c4a8" opacity="0.10"/>
    <ellipse cx="28" cy="48" rx="16" ry="12" fill="url(#luzg)"/>

    <!-- pátio dos fundos com o jeep -->
    <g data-arte="g-patio">
      <path d="M76 40 L100 40 L100 70 L76 70 Z" fill="#08090b"/>
      <path d="M76 44 L100 44" stroke="#1a1d21" stroke-width="0.4"/>
      <path d="M78 54 Q78 46 85 45.4 L94 45.4 Q97 45.4 99 48 L99 54 Z" fill="#101317"/>
      <path d="M85 47 L93 47 Q95 47 96 49 L96 52 L84 52 Z" fill="#080a0c"/>
      <circle cx="84" cy="54" r="3.4" fill="#070809" stroke="#21252a" stroke-width="0.6"/>
      <circle cx="95" cy="54" r="3.4" fill="#070809" stroke="#21252a" stroke-width="0.6"/>
      <path d="M76 56 L100 56" stroke="#181c20" stroke-width="1.2"/>
      <path d="M99 46 L100 46 L100 50 L99 50 Z" fill="#262b31"/>
      <ellipse cx="88" cy="58" rx="11" ry="3" fill="#5c7f92" opacity="0.05"/>
      <path d="M79 62 L94 62" stroke="#161a1e" stroke-width="0.5" opacity="0.6"/>
    </g>`);
}

/* ---------- 9. Torre do caixa-d'água ---------- */

function torre(d, c) {
  d(`
    <linearGradient id="ceut" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#04050a"/>
      <stop offset="52%" stop-color="#0b0d16"/>
      <stop offset="82%" stop-color="#14111c"/>
      <stop offset="100%" stop-color="#06060a"/>
    </linearGradient>
    <radialGradient id="luzt" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0%" stop-color="#c2504a" stop-opacity="0.32"/>
      <stop offset="100%" stop-color="#c2504a" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="moinho" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0%" stop-color="#cfd4e0" stop-opacity="0.5"/>
      <stop offset="100%" stop-color="#cfd4e0" stop-opacity="0"/>
    </radialGradient>
    <filter id="softt"><feGaussianBlur stdDeviation="1.6"/></filter>`);

  c(`
    <rect width="100" height="100" fill="url(#ceut)"/>
    <circle cx="16" cy="18" r="2.8" fill="#cfd4e0" opacity="0.55"/>
    <ellipse cx="16" cy="18" rx="12" ry="11" fill="url(#moinho)"/>

    <!-- cidade lá embaixo -->
    <path d="M0 74 L0 68 L8 68 L8 63 L16 63 L16 69 L26 69 L26 65 L34 65 L34 70 L44 70 L44 62 L52 62 L52 67 L62 67 L62 71 L72 71 L72 64 L82 64 L82 69 L92 69 L92 65 L100 65 L100 78 L0 78 Z" fill="#07080c"/>
    <path d="M0 82 L0 78 L14 78 L14 74 L26 74 L26 79 L40 79 L40 75 L54 75 L54 80 L68 80 L68 76 L84 76 L84 80 L100 80 L100 100 L0 100 Z" fill="#040508"/>
    <rect x="10" y="69" width="1.4" height="3" fill="#c2504a" opacity="0.5"/>
    <rect x="30" y="71" width="1.2" height="2.6" fill="#d8b978" opacity="0.35"/>
    <rect x="46" y="68" width="1.4" height="3" fill="#d8b978" opacity="0.4"/>
    <rect x="74" y="70" width="1.2" height="2.6" fill="#c2504a" opacity="0.35"/>
    <rect x="86" y="70" width="1.4" height="3" fill="#d8b978" opacity="0.3"/>

    <!-- a torre -->
    <g>
      <path d="M42 30 L34 100 M58 30 L66 100" stroke="#0a0b10" stroke-width="2"/>
      <path d="M42 30 L40.4 100 M58 30 L59.6 100" stroke="#101219" stroke-width="1"/>
      <path d="M41 46 L59 46 M39.6 62 L60.4 62 M38.2 80 L61.8 80 M36.8 96 L63.2 96" stroke="#0c0d13" stroke-width="0.8"/>
      <path d="M42 62 L58 46 M58 62 L42 46 M40 80 L60 62 M60 80 L40 62 M38 96 L62 80 M62 96 L38 80" stroke="#0a0b11" stroke-width="0.5" opacity="0.8"/>
      <path d="M36 54 L64 54 L62 60 L38 60 Z" fill="#0b0c12"/>
      <path d="M38 60 L62 60 L62 76 L38 76 Z" fill="#080910"/>
      <path d="M36 54 L50 48 L64 54 Z" fill="#0c0d14"/>
      <path d="M41 76 L59 76 L58 82 L42 82 Z" fill="#0a0b12"/>
    </g>

    <!-- silhueta no corrimão -->
    <g data-arte="t-silhueta">
      <path d="M62 24 Q62 20 66 20 Q70 20 70 24 L70 28 L72 30 L72 44 L60 44 L60 30 L62 28 Z" fill="#04050a"/>
      <circle cx="66" cy="17.4" r="3.2" fill="#04050a"/>
      <path d="M60 44 L74 44 L74 45.4 L60 45.4 Z" fill="#0e0f16"/>
      <path d="M62 30 L70 30" stroke="#1a1c26" stroke-width="0.35" opacity="0.5"/>
      <ellipse cx="66" cy="36" rx="12" ry="10" fill="url(#luzt)" opacity="0.5"/>
    </g>

    <!-- gravador -->
    <g data-arte="t-gravador">
      <rect x="22" y="54" width="11" height="6" rx="0.5" fill="#15171c" stroke="#2a2d33" stroke-width="0.5"/>
      <circle cx="26" cy="57" r="2" fill="#0a0c0e" stroke="#3a3f45" stroke-width="0.4"/>
      <circle cx="26" cy="57" r="0.5" fill="#7d838b"/>
      <circle cx="30" cy="56" r="0.5" fill="#7d838b"/>
      <circle cx="30" cy="58.4" r="0.5" fill="#7d838b"/>
      <path d="M23.4 58.6 L25 58.6" stroke="#c2504a" stroke-width="0.5" opacity="0.8"/>
      <path d="M36 50 L26 53" stroke="#3a3f45" stroke-width="0.4"/>
      <ellipse cx="27" cy="58" rx="12" ry="6" fill="#8fa0b0" opacity="0.04"/>
    </g>

    <!-- corrimão -->
    <path d="M18 56 L80 56" stroke="#14161e" stroke-width="1.2"/>
    <path d="M18 62 L80 62" stroke="#0e1017" stroke-width="0.8"/>
    <path d="M22 56 L22 62 M34 56 L34 62 M46 56 L46 62 M58 56 L58 62 M70 56 L70 62" stroke="#0e1017" stroke-width="0.6"/>`);
}

const CENAS_ART = {
  estrada, acude, bombas, zulmira, cemiterio, oficina, jornal, delegacia, torre
};

const ARTE = Object.fromEntries(
  Object.entries(CENAS_ART).map(([id, fn]) => [id, () => {
    let defs = '';
    let corpo = '';
    fn((d) => { defs = d; }, (c) => { corpo = c; });
    return { defs: `<defs>${defs}</defs>`, corpo };
  }])
);

export const ARTE_IDS = Object.keys(ARTE);