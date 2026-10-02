const fs = require('fs');
const path = require('path');

(async () => {
  const { ARTE, ARTE_IDS, desenhar } = await import('../js/arte.js');
  const data = await import('../js/data.js');

  const outDir = path.join(__dirname, '..', '.preview');
  fs.mkdirSync(outDir, { recursive: true });

  let erros = 0;
  const idsCena = new Set(data.CENAS.map((c) => c.id));

  for (const c of idsCena) if (!ARTE_IDS.includes(c)) { console.log(`CENA SEM ARTE: ${c}`); erros++; }
  for (const a of ARTE_IDS) if (!idsCena.has(a)) { console.log(`ARTE SEM CENA: ${a}`); erros++; }

  const arteIds = new Set();

  for (const id of ARTE_IDS) {
    const svg = desenhar(id);
    const abre = (svg.match(/<svg/g) || []).length;
    const fecha = (svg.match(/<\/svg>/g) || []).length;
    if (abre !== 1 || fecha !== 1) { console.log(`${id}: SVG nao fechada (${abre}/${fecha})`); erros++; }

    const tags = ['g', 'path', 'rect', 'circle', 'ellipse', 'line', 'linearGradient', 'radialGradient', 'filter', 'defs'];
    tags.forEach((t) => {
      const a = (svg.match(new RegExp(`<${t}[\\s>/]`, 'g')) || []).length;
      const f = (svg.match(new RegExp(`</${t}>`, 'g')) || []).length;
      const auto = new RegExp(`<${t}[^>]*/>`, 'g');
      const autoF = (svg.match(auto) || []).length;
      if (a !== f + autoF) { console.log(`${id}: <${t}> desbalanceado (abre ${a}, fecha ${f} + ${autoF} auto)`); erros++; }
    });

    const gids = [...svg.matchAll(/<(?:linear|radial)Gradient id="([^"]+)"/g)].map((m) => m[1]);
    const dup = gids.filter((g, i) => gids.indexOf(g) !== i);
    if (dup.length) { console.log(`${id}: gradientes duplicados ${dup.join(', ')}`); erros++; }

    const definidos = new Set([...gids, ...[...svg.matchAll(/<filter id="([^"]+)"/g)].map((m) => m[1])]);
    [...svg.matchAll(/url\(#([^)]+)\)/g)].forEach((m) => {
      if (!definidos.has(m[1])) { console.log(`${id}: url(#${m[1]}) sem definicao`); erros++; }
    });

    const cena = data.CENAS.find((c) => c.id === id);
    const hsIds = new Set(cena.hotspots.map((h) => h.id));
    const da = [...svg.matchAll(/data-arte="([^"]+)"/g)].map((m) => m[1]);
    da.forEach((a) => {
      arteIds.add(a);
      if (!hsIds.has(a)) { console.log(`${id}: data-arte="${a}" nao corresponde a hotspot`); erros++; }
    });

    fs.writeFileSync(path.join(outDir, `${id}.svg`), svg, 'utf8');
  }

  const faltando = [];
  data.CENAS.forEach((cena) => {
    cena.hotspots.forEach((h) => {
      if (cena.modo === 'conversa') return;
      if (!arteIds.has(h.id)) { console.log(`HOTSPOT SEM ARTE: ${h.id} (${cena.id})`); faltando.push(h.id); }
    });
  });

  console.log('cena'.padEnd(12), 'arte/total');
  data.CENAS.forEach((cena) => {
    const svg = desenhar(cena.id);
    const n = [...svg.matchAll(/data-arte="([^"]+)"/g)].map((m) => m[1]);
    if (cena.modo === 'conversa') {
      console.log(cena.id.padEnd(12), `(conversa: ${cena.hotspots.length} topicos de fala)`);
      return;
    }
    const faltam = cena.hotspots.filter((h) => !n.includes(h.id)).map((h) => h.id);
    console.log(cena.id.padEnd(12), `${n.length}/${cena.hotspots.length}`, faltam.length ? 'FALTA: ' + faltam.join(', ') : '');
  });

  console.log(`\ncenas renderizadas: ${ARTE_IDS.length} | objetos com data-arte: ${arteIds.size}`);
  console.log(`hotspots sem objeto desenhado: ${faltando.length ? faltando.join(', ') : 'nenhum'}`);

  if (erros || faltando.length) { console.log(`\n${erros + faltando.length} PROBLEMAS`); process.exit(1); }
  console.log('OK: arte consistente com os dados das cenas.');
})();