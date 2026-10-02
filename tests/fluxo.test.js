/* Simulador headless do fluxo do jogo, sem DOM.
   Executa o mesmo grafo de dados e valida a cadeia de progressao. */

import { CENAS, PISTAS, DEDUCOES, SUSPEITOS, FINAIS, PRIMEIROS } from '../js/data.js';

const falhas = [];
const ok = [];

function checar(cond, msg) {
  if (cond) ok.push(msg); else falhas.push(msg);
}

/* 1. referencias */
const idsHotspot = new Set();
CENAS.forEach((c) => c.hotspots.forEach((h) => {
  checar(!idsHotspot.has(h.id), `hotspot duplicado: ${h.id}`);
  idsHotspot.add(h.id);
}));

Object.entries(DEDUCOES).forEach(([k, d]) => {
  checar(d.pistas.length === 2, `deducao ${k} deve usar 2 pistas`);
  d.pistas.forEach((p) => checar(!!PISTAS[p], `deducao ${k} aponta para pista inexistente: ${p}`));
  checar(!!SUSPEITOS[d.suspeito], `deducao ${k} aponta para suspeito inexistente: ${d.suspeito}`);
});

Object.values(SUSPEITOS).forEach((s) => {
  Object.keys(FINAIS).filter((f) => f.replace('acusa-', '') === Object.keys(SUSPEITOS).find((k) => SUSPEITOS[k] === s)).forEach(() => {});
});

CENAS.forEach((c) => c.hotspots.forEach((h) => {
  checar(!h['dá'] || !!PISTAS[h['dá']], `hotspot ${h.id} dá pista inexistente: ${h['dá']}`);
  (h.exigeExaminada || []).forEach((e) => checar(idsHotspot.has(e), `hotspot ${h.id} exige hotspot inexistente: ${e}`));
  checar(!h.primeiro || !!PRIMEIROS[h.primeiro], `hotspot ${h.id} referencia bloco primeiro inexistente: ${h.primeiro}`);
  const x = h.x; const y = h.y;
  checar(x >= 0 && x <= 95 && y >= 3 && y <= 95, `hotspot ${h.id} fora da area clicavel (${x}, ${y})`);
}));

/* 2. pistas orfas */
const obtidas = new Set(['c-fita']);
CENAS.forEach((c) => c.hotspots.forEach((h) => { if (h['dá']) obtidas.add(h['dá']); }));
Object.keys(PISTAS).forEach((p) => checar(obtidas.has(p), `pista inalcançavel: ${p}`));

const emDeducao = new Set();
Object.values(DEDUCOES).forEach((d) => d.pistas.forEach((p) => emDeducao.add(p)));
Object.keys(PISTAS).forEach((p) => checar(emDeducao.has(p), `pista sem deducao: ${p}`));

/* 3. finais */
const torre = CENAS.find((c) => c.id === 'torre');
checar(!!torre, 'cena final (torre) inexistente');
torre.escolhas.forEach((e) => {
  checar(!!FINAIS[e.id], `escolha ${e.id} nao tem final`);
  checar(!!SUSPEITOS[e.id.replace('acusa-', '')], `escolha ${e.id} nao tem suspeito`);
  e.exige.forEach((d) => checar(!!DEDUCOES[d], `escolha ${e.id} exige deducao inexistente: ${d}`));
});
Object.keys(FINAIS).forEach((f) => {
  checar(!!SUSPEITOS[f.replace('acusa-', '')], `final ${f} sem suspeito correspondente`);
  checar(FINAIS[f].texto.length >= 3, `final ${f} tem texto curto demais`);
});

/* 4. progressao real: so o que o jogador consegue desbloquear */
const ex = new Set();
const pi = new Set(['c-fita']);
let progou = true;
let voltas = 0;
while (progou && voltas < 60) {
  progou = false;
  voltas++;
  CENAS.forEach((c) => c.hotspots.forEach((h) => {
    if (ex.has(h.id)) return;
    if (h.exigeExaminada && !h.exigeExaminada.every((e) => ex.has(e))) return;
    if (h.exigePistas !== undefined && pi.size < h.exigePistas) return;
    ex.add(h.id);
    if (h['dá']) pi.add(h['dá']);
    progou = true;
  }));
}

const todosHotspots = CENAS.flatMap((c) => c.hotspots.map((h) => h.id));
const bloqueados = todosHotspots.filter((h) => !ex.has(h));
checar(bloqueados.length === 0, `hotspots inalcancaveis: ${bloqueados.join(', ')}`);
checar(pi.size === Object.keys(PISTAS).length, `pistas nao obtiveis: ${Object.keys(PISTAS).filter((p) => !pi.has(p)).join(', ')}`);

const dd = new Set();
let virou = true;
let r = 0;
while (virou && r < 30) {
  virou = false;
  r++;
  Object.entries(DEDUCOES).forEach(([k, d]) => {
    if (dd.has(k)) return;
    if (d.pistas.every((p) => pi.has(p))) { dd.add(k); virou = true; }
  });
}
Object.keys(DEDUCOES).forEach((k) => checar(dd.has(k), `deducao impossivel de montar: ${k}`));

const desbloqueados = torre.escolhas.filter((e) => e.exige.every((d) => dd.has(d)));
checar(desbloqueados.length === torre.escolhas.length,
  `finais nao desbloqueaveis: ${torre.escolhas.filter((e) => !desbloqueados.includes(e)).map((e) => e.id).join(', ')}`);

/* 5. o final "certo" (palacete) exige as 3 deducoes mais duras */
const escolhaCerta = torre.escolhas.find((e) => e.id === 'acusa-palacete');
checar(escolhaCerta && escolhaCerta.exige.length === 3, 'final principal deve exigir 3 deducoes');

/* relatorio */
console.log(`cenas: ${CENAS.length} | hotspots: ${todosHotspots.length} | pistas: ${Object.keys(PISTAS).length} | deducoes: ${Object.keys(DEDUCOES).length} | finais: ${Object.keys(FINAIS).length} | suspeitos: ${Object.keys(SUSPEITOS).length}`);
console.log(`progressao: ${ex.size}/${todosHotspots.length} hotspots, ${pi.size}/${Object.keys(PISTAS).length} pistas, ${dd.size}/${Object.keys(DEDUCOES).length} deducoes, ${desbloqueados.length}/${torre.escolhas.length} finais`);
console.log(`${ok.length} verificacoes passaram`);
if (falhas.length) {
  console.log(`\n${falhas.length} FALHAS:`);
  falhas.forEach((f) => console.log('  - ' + f));
  process.exit(1);
} else {
  console.log('OK: fluxo completo e consistente.');
}