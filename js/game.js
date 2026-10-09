/* O Último Relato — motor do jogo */

import {
  CREDITOS, PISTAS, DEDUCOES, SUSPEITOS, CENAS, PRIMEIROS, FINAIS, EPILOGO, ENTIDADES
} from './data.js';
import { Ambiente } from './audio.js';
import { desenhar } from './arte.js';

const CHAVE_SAVE = 'ultimo-relato/v1';

const OBJETIVOS = {
  estrada: 'Vá ao açude e fale com Dona Zulmira. Cinco lugares de Brejinho estão trancados, e ela sabe de quem é a chave.',
  acude: 'A margem só faz sentido depois de Dona Zulmira. Examine a parede submersa e a boia.',
  bombas: 'A chave, a escala e a lancha estão nesta sala. A chave de latão também abre a oficina do Nenê.',
  zulmira: 'Fale com todos os assuntos. O papel que ela guarda destranca a casa de bombas.',
  cemiterio: 'Dezoito lápides para duzentos e cinco moradores. O muro dos fundos dá na estrada de baixo.',
  oficina: 'A fita VHS na caixa de sapato é o cartão de visita da sede do jornal.',
  jornal: 'A fotografia e o acervo de 1998. A fotografia pede a cópia que Dona Zulmira guardou.',
  delegacia: 'O processo 97/4412 está no arquivo de aço — mas a gaveta de 1997 está trancada.',
  torre: 'Suba. Você já sabe quem tem as mãos. Falta descobrir quem mandou.'
};

const estado = {
  tela: 'titulo',
  cena: 'estrada',
  pistas: [],
  examinadas: [],
  abertos: [],
  deducoes: [],
  visitadas: ['estrada'],
  presenca: 0,
  encontro: false,
  selecao: { a: null, b: null },
  final: null
};

const ambiente = new Ambiente();

/* ids dos objetos que acabaram de ser examinados, para o desenho reagir */
const arteAnterior = new Set();

/* ---------- utilidades ---------- */

const $ = (id) => document.getElementById(id);

function el(tag, classe, texto) {
  const n = document.createElement(tag);
  if (classe) n.className = classe;
  if (texto !== undefined) n.textContent = texto;
  return n;
}

function temPista(id) { return estado.pistas.includes(id); }
function examinou(id) { return estado.examinadas.includes(id); }
function temDeducao(id) { return estado.deducoes.includes(id); }

/* o que falta para destrancar uma cena; lista vazia = porta aberta */
function faltasBloqueio(cena) {
  const b = cena.bloqueio;
  if (!b) return [];
  const faltas = [];
  (b.exige || []).forEach((p) => {
    if (!temPista(p)) faltas.push(`a pista “${PISTAS[p].nome}”`);
  });
  (b.deducoes || []).forEach((d) => {
    if (!temDeducao(d)) faltas.push(`a dedução “${DEDUCOES[d].titulo}”`);
  });
  return faltas;
}

function cenaLiberada(cena) {
  return faltasBloqueio(cena).length === 0;
}

function cenaAtual() {
  return CENAS.find((c) => c.id === estado.cena);
}

function abriu(id) { return estado.abertos.includes(id); }

function perigoAtual() {
  const c = cenaAtual();
  return c && c.perigo ? c.perigo : null;
}

function salvar() {
  try {
    localStorage.setItem(CHAVE_SAVE, JSON.stringify(estado));
  } catch {
    /* modo privado: o jogo continua sem save */
  }
}

function temSave() {
  try {
    return !!localStorage.getItem(CHAVE_SAVE);
  } catch {
    return false;
  }
}

function carregar() {
  try {
    const dados = JSON.parse(localStorage.getItem(CHAVE_SAVE));
    if (!dados || !Array.isArray(dados.pistas)) return false;
    Object.assign(estado, dados, { selecao: { a: null, b: null } });
    if (!Array.isArray(estado.abertos)) estado.abertos = [];
    estado.presenca = 0;
    estado.encontro = false;
    return !!cenaAtual();
  } catch {
    return false;
  }
}

function limparSave() {
  try {
    localStorage.removeItem(CHAVE_SAVE);
  } catch {
    /* nada a fazer */
  }
}

function mostrarTela(id) {
  document.querySelectorAll('.tela').forEach((t) => {
    t.hidden = t.id !== id;
    t.classList.toggle('ativa', t.id === id);
  });
  estado.tela = id;
  const alvo = $(id);
  if (alvo) alvo.scrollTop = 0;
}

/* ---------- efeitos ---------- */

let timeoutTorrada;

function torrada(texto) {
  const n = $('torrada');
  clearTimeout(timeoutTorrada);
  n.textContent = texto;
  n.hidden = false;
  n.style.animation = 'none';
  void n.offsetWidth;
  n.style.animation = '';
  timeoutTorrada = setTimeout(() => { n.hidden = true; }, 4600);
}

function susto() {
  const f = $('flash');
  f.classList.remove('disparo');
  void f.offsetWidth;
  f.classList.add('disparo');
  ambiente.susto();
}

/* ---------- presença: as coisas que caçam ---------- */

function atualizarPresenca() {
  const caixa = $('presenca');
  const p = perigoAtual();
  if (!caixa) return;
  if (!p || estado.encontro) { caixa.hidden = true; return; }
  const ent = ENTIDADES[p.entidade];
  const tot = p.limite || 4;
  caixa.hidden = false;
  $('presenca-nome').textContent = ent.nome;
  caixa.title = `Presença: ${ent.nome}`;
  const pct = Math.max(0, Math.min(100, Math.round((estado.presenca / tot) * 100)));
  $('presenca-barra').style.width = `${pct}%`;
  caixa.classList.toggle('perto', estado.presenca >= tot - 1);
}

function avancarPresenca(extra = 0) {
  const p = perigoAtual();
  if (!p || estado.encontro) return;
  const tot = p.limite || 4;
  estado.presenca += 1 + extra;
  atualizarPresenca();
  if (estado.presenca >= tot) {
    encontro(p);
  } else if (estado.presenca === tot - 1) {
    torrada('Alguma coisa se aproximou. Errar a leitura agora é voltar do começo.');
  }
}

function embaralhar(lista) {
  const c = [...lista];
  for (let i = c.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [c[i], c[j]] = [c[j], c[i]];
  }
  return c;
}

function encontro(p) {
  estado.encontro = true;
  const ent = ENTIDADES[p.entidade];
  atualizarPresenca();
  susto();

  $('painel').querySelectorAll('.painel__corpo').forEach((n) => n.remove());
  const painel = $('painel-texto');
  painel.className = 'painel__texto painel__texto--titulo';
  painel.textContent = ent.titulo;
  painel.insertAdjacentElement('afterend', el('p', 'painel__corpo', ent.aproximacao));
  painel.insertAdjacentElement('afterend', el('p', 'painel__dica', ent.dica));

  const alvo = $('painel-acoes');
  alvo.innerHTML = '';
  alvo.appendChild(el('p', 'painel__pergunta', 'Está perto. O que você faz?'));

  const opcoes = embaralhar([
    ...ent.certo.map((t) => ({ t, ok: true })),
    ...ent.errado.map((t) => ({ t, ok: false }))
  ]);

  opcoes.forEach((op) => {
    const b = el('button', 'opcao', op.t);
    b.type = 'button';
    b.addEventListener('click', () => resolverEncontro(op.ok, ent));
    alvo.appendChild(b);
  });

  renderCena(true);
}

function resolverEncontro(sobreviveu, ent) {
  if (!sobreviveu) { morrer(ent); return; }
  estado.encontro = false;
  estado.presenca = 0;
  atualizarPresenca();
  ambiente.ambiente('achado');
  painelTexto(ent.escape);
  $('painel-acoes').innerHTML = '';
  renderCena(true);
}

function morrer(ent) {
  limparSave();
  estado.encontro = false;
  const alvo = $('morte-conteudo');
  if (alvo) {
    alvo.innerHTML = '';
    alvo.appendChild(el('span', 'final__selo', ent.nome));
    alvo.appendChild(el('h2', 'final__titulo', ent.morteTitulo));
    ent.morteTexto.forEach((t) => alvo.appendChild(el('p', null, t)));
  }
  ambiente.susto();
  mostrarTela('tela-morte');
}

/* acende o objeto desenhado que o hotspot aponta */
function acenderArte(id, aceso) {
  const palco = document.getElementById('palco-ambiente');
  const n = palco?.querySelector(`[data-arte="${id}"]`);
  if (!n) return;
  n.classList.toggle('aceso', aceso);
  palco.classList.toggle('destaque', aceso);
}

function marcarNovos(ids) {
  ids.forEach((id) => {
    const n = document.querySelector(`.hotspot[data-id="${id}"]`);
    if (!n) return;
    n.classList.add('hotspot--novo');
    setTimeout(() => n.classList.remove('hotspot--novo'), 3400);
  });
}

/* ---------- render da cena ---------- */

function renderCena(manterPainel = false) {
  const cena = cenaAtual();
  if (!cena) return;

  $('hud-cena').textContent = cena.nome;
  $('hud-hora').textContent = cena.hora;
  $('palco-legenda').textContent = cena.legenda;
  $('palco-ambiente').className = `palco__ambiente ${cena.classe}`;
  $('objetivo').textContent = OBJETIVOS[cena.id] || '';

  $('palco-arte').innerHTML = desenhar(cena.id);
  arteAnterior.forEach((id) => {
    const n = $('palco-arte').querySelector(`[data-arte="${id}"]`);
    if (n) n.classList.add('aceso');
  });
  arteAnterior.clear();
  estado.abertos.forEach((id) => {
    const n = $('palco-arte').querySelector(`[data-arte="${id}"]`);
    if (n) n.classList.add('aberto');
  });

  const anteriores = [...document.querySelectorAll('.hotspot')].map((b) => b.dataset.id);
  const alvo = $('palco-hotspots');
  alvo.innerHTML = '';

const arena = document.getElementById('palco-ambiente');

  const novos = [];
  cena.hotspots.forEach((h) => {
    const b = el('button', 'hotspot');
    b.type = 'button';
    b.dataset.id = h.id;
    b.style.left = `${h.x}%`;
    b.style.top = `${h.y}%`;
    b.setAttribute('aria-label', h.rotulo);
    if (examinou(h.id)) b.classList.add('hotspot--visto');
    if (abriu(h.id)) b.classList.add('hotspot--aberto');
    if (h.abre && !abriu(h.id)) b.classList.add('hotspot--recipiente');
    b.appendChild(el('span', 'hotspot__dica', h.rotulo));
    b.addEventListener('click', () => examinar(h.id));

    if (arena) {
      b.addEventListener('pointerenter', () => acenderArte(h.id, true));
      b.addEventListener('focus', () => acenderArte(h.id, true));
      b.addEventListener('pointerleave', () => acenderArte(h.id, false));
      b.addEventListener('blur', () => acenderArte(h.id, false));
    }

    alvo.appendChild(b);
    if (!anteriores.includes(h.id)) novos.push(h.id);
  });

  marcarNovos(novos);

  if (!manterPainel) painelVazio('Clique em um ponto da cena para examinar.');
  renderMapa();
  atualizarContadores();
  atualizarPresenca();
  ambiente.definirCena(cena.id);
  salvar();
}

function painelVazio(texto) {
  $('painel').querySelectorAll('.painel__corpo').forEach((n) => n.remove());
  const painel = $('painel-texto');
  painel.className = 'painel__texto painel__texto--vazio';
  painel.textContent = texto;
  $('painel-acoes').innerHTML = '';
}

function renderMapa() {
  const alvo = $('mapa-cenas');
  alvo.innerHTML = '';
  CENAS.forEach((c) => {
    const trancada = !cenaLiberada(c);
    const classes = [];
    if (c.id === estado.cena) classes.push('atual');
    if (trancada) classes.push('trancada');
    const b = el('button', classes.join(' '), c.nome);
    b.type = 'button';
    if (trancada) {
      b.title = c.bloqueio.texto;
      b.setAttribute('aria-disabled', 'true');
    }
    b.addEventListener('click', () => irPara(c.id));
    alvo.appendChild(b);
  });
}

function atualizarContadores() {
  $('contador-pistas').textContent = estado.pistas.length;
  $('contador-deducoes').textContent = estado.deducoes.length;
  $('btn-deducoes').classList.toggle('btn-icone--novo', estado.deducoes.length > 0);
}

function irPara(id) {
  const cena = CENAS.find((c) => c.id === id);
  if (!cena) return;

  if (estado.encontro) {
    ambiente.ambiente('erro');
    torrada('Não há para onde correr agora.');
    return;
  }

  if (!cenaLiberada(cena)) {
    const faltas = faltasBloqueio(cena);
    ambiente.ambiente('erro');
    torrada(`${cena.bloqueio.texto}${faltas.length ? ` Falta: ${faltas.join(' e ')}.` : ''}`);
    renderMapa();
    return;
  }

  estado.cena = id;
  estado.presenca = 0;
  estado.encontro = false;
  if (!estado.visitadas.includes(id)) estado.visitadas.push(id);
  ambiente.sussurro();
  mostrarTela('tela-jogo');
  renderCena();
}

/* ---------- examinar ---------- */

function examinar(id) {
  if (estado.encontro) return;
  const cena = cenaAtual();
  const h = cena?.hotspots.find((x) => x.id === id);
  if (!h) return;

  if (h.exigeExaminada && !h.exigeExaminada.every(examinou)) {
    painelBloqueado(h.exigeTexto || 'Você ainda não sabe o que procurar aqui.');
    return;
  }

  if (h.exigePistas !== undefined && estado.pistas.length < h.exigePistas) {
    painelBloqueado(h.exigeTexto || 'Sua pasta está quase vazia demais para esse silêncio.');
    return;
  }

  const novo = !examinou(id);
  if (novo) {
    estado.examinadas.push(id);
    arteAnterior.add(id);
    ambiente.ambiente('pagina');
  }

  if (novo) {
    avancarPresenca(h.atrai ? 2 : 0);
    if (estado.encontro) { renderCena(true); return; }
  }

  $('painel').querySelectorAll('.painel__corpo').forEach((n) => n.remove());

  const bloco = h.primeiro ? PRIMEIROS[h.primeiro] : null;

  if (h.abre && !abriu(id)) {
    painelTexto(h.texto);
    const alvo = $('painel-acoes');
    alvo.innerHTML = '';
    const b = el('button', 'opcao', h.abre.verbo);
    b.type = 'button';
    b.style.borderLeftColor = 'var(--sangue)';
    b.addEventListener('click', () => abrirRecipiente(id));
    alvo.appendChild(b);
    ambiente.ambiente('pagina');
    renderCena(true);
    atualizarContadores();
    return;
  }

  if (h.abre && abriu(id)) {
    if (bloco) {
      const painel = $('painel-texto');
      painel.className = 'painel__texto painel__texto--titulo';
      painel.textContent = bloco.titulo;
      painel.insertAdjacentElement('afterend', el('p', 'painel__corpo', bloco.texto));
      ambiente.ambiente('achado');
    } else {
      painelTexto(h.abre.texto);
    }
    if (cena.id !== 'torre') $('painel-acoes').innerHTML = '';
    renderCena(true);
    atualizarContadores();
    return;
  }

  if (bloco) {
    const painel = $('painel-texto');
    painel.className = 'painel__texto painel__texto--titulo';
    painel.textContent = bloco.titulo;
    painel.insertAdjacentElement('afterend', el('p', 'painel__corpo', bloco.texto));
    ambiente.ambiente('achado');
  } else {
    painelTexto(h.texto);
    ambiente.ambiente('pagina');
  }

  if (h['dá']) adicionarPista(h['dá']);

  const torre = cena.id === 'torre';
  if (torre && examinou('t-silhueta')) mostrarEscolhas(cena);
  else if (!torre) $('painel-acoes').innerHTML = '';

  renderCena(true);
  atualizarContadores();
}

function abrirRecipiente(id) {
  const h = cenaAtual()?.hotspots.find((x) => x.id === id);
  if (!h || !h.abre || abriu(id)) return;
  estado.abertos.push(id);
  if (!examinou(id)) estado.examinadas.push(id);
  if (h.abre['dá']) adicionarPista(h.abre['dá']);
  ambiente.ambiente('achado');
  salvar();
  examinar(id);
}

function painelTexto(texto) {
  $('painel').querySelectorAll('.painel__corpo').forEach((n) => n.remove());
  const painel = $('painel-texto');
  painel.className = 'painel__texto';
  painel.textContent = texto;
}

function painelBloqueado(texto) {
  $('painel').querySelectorAll('.painel__corpo').forEach((n) => n.remove());
  const painel = $('painel-texto');
  painel.className = 'painel__texto painel__texto--vazio';
  painel.textContent = texto;
  $('painel-acoes').innerHTML = '';
}

function adicionarPista(id) {
  if (temPista(id)) return;
  estado.pistas.push(id);
  torrada(`Pista guardada: ${PISTAS[id].nome}`);
  ambiente.ambiente('pista');
  salvar();
}

/* ---------- escolhas finais ---------- */

function mostrarEscolhas(cena) {
  const alvo = $('painel-acoes');
  alvo.innerHTML = '';
  const titulo = el('p', 'painel__pergunta', 'O que você faz agora?');
  alvo.appendChild(titulo);

  cena.escolhas.forEach((e) => {
    const liberada = e.exige.every(temDeducao);
    const b = el('button', 'opcao', e.rotulo);
    b.type = 'button';
    b.disabled = !liberada;
    if (!liberada) {
      const falta = e.exige.filter((d) => !temDeducao(d)).map((d) => DEDUCOES[d].titulo).join(' e ');
      b.appendChild(el('span', 'opcao__bloqueio', `Ainda não é possível. Falta deduzir: ${falta}.`));
    } else {
      b.style.borderLeftColor = 'var(--sangue)';
    }
    b.addEventListener('click', () => terminar(e.id));
    alvo.appendChild(b);
  });
}

function terminar(id) {
  const final = FINAIS[id];
  if (!final) return;
  const suspeito = SUSPEITOS[id.replace('acusa-', '')];
  susto();

  const alvo = $('final-conteudo');
  alvo.className = `final final--${final.classe.replace('final-', '')}`;
  alvo.innerHTML = '';

  alvo.appendChild(el('span', 'final__selo', suspeito ? suspeito.papel : 'Final'));
  alvo.appendChild(el('h2', 'final__titulo', final.titulo));
  final.texto.forEach((p) => alvo.appendChild(el('p', null, p)));

  const epi = el('div', 'final__epilogo');
  epi.appendChild(el('h2', null, 'Depois'));
  const ul = el('ul');
  EPILOGO.forEach((t) => ul.appendChild(el('li', null, t)));
  epi.appendChild(ul);
  alvo.appendChild(epi);

  estado.final = id;
  limparSave();
  mostrarTela('tela-final');
}

/* ---------- caderno ---------- */

function abrirCaderno() {
  renderCaderno();
  mostrarTela('tela-caderno');
}

function deducaoDePista(id) {
  return estado.deducoes
    .map((k) => DEDUCOES[k])
    .find((d) => d.pistas.includes(id));
}

function renderCaderno() {
  const ul = $('lista-pistas');
  ul.innerHTML = '';

  if (!estado.pistas.length) {
    ul.appendChild(el('li', 'deducoes__vazio', 'Sua pasta ainda está vazia. Examine os lugares.'));
  }

  estado.pistas.forEach((id) => {
    const p = PISTAS[id];
    const jaUsada = deducaoDePista(id);

    const li = el('li', 'pista');
    li.dataset.id = id;
    li.tabIndex = 0;
    li.setAttribute('role', 'button');
    li.setAttribute('aria-label', `Selecionar pista: ${p.nome}`);

    if (jaUsada) li.classList.add('pista--usada');
    if (estado.selecao.a === id || estado.selecao.b === id) li.classList.add('pista--selecionada');

    const topo = el('div', 'pista__topo');
    topo.appendChild(el('span', 'pista__nome', p.nome));
    topo.appendChild(el('span', 'pista__tipo', p.tipo));
    li.appendChild(topo);
    li.appendChild(el('p', 'pista__texto', p.texto));
    if (jaUsada) li.appendChild(el('span', 'pista__feita', `Já confrontada em: ${jaUsada.titulo}`));

    const selecionar = () => selecionarPista(id);
    li.addEventListener('click', selecionar);
    li.addEventListener('keydown', (ev) => {
      if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); selecionar(); }
    });

    ul.appendChild(li);
  });

  renderSlots();
}

function selecionarPista(id) {
  const s = estado.selecao;

  if (s.a === id) s.a = null;
  else if (s.b === id) s.b = null;
  else if (!s.a) s.a = id;
  else if (!s.b) s.b = id;
  else { s.a = s.b; s.b = id; }

  $('ligar-msg').textContent = '';
  $('ligar-msg').className = 'ligar__msg';
  ambiente.ambiente('pagina');
  renderCaderno();
}

function renderSlots() {
  const s = estado.selecao;
  [['slot-a', s.a, 'Primeira pista'], ['slot-b', s.b, 'Segunda pista']].forEach(([id, pid, vazio]) => {
    const slot = $(id);
    slot.className = 'slot';
    if (pid) {
      slot.classList.add('slot--cheio');
      slot.textContent = PISTAS[pid].nome;
    } else {
      slot.textContent = vazio;
    }
  });
  $('btn-ligar').disabled = !(s.a && s.b);
}

function confrontar() {
  const { a, b } = estado.selecao;
  if (!a || !b) return;

  const par = [a, b].sort().join('|');
  let achou = null;

  Object.entries(DEDUCOES).forEach(([id, d]) => {
    if ([...d.pistas].sort().join('|') === par) achou = { id, ...d };
  });

  estado.selecao = { a: null, b: null };
  const msg = $('ligar-msg');

  if (achou) {
    estado.deducoes.push(achou.id);
    ambiente.ambiente('deducao');
    salvar();
    renderCaderno();
    atualizarContadores();
    mostrarDeducoes(achou);
    return;
  }

  ambiente.ambiente('erro');
  msg.textContent = 'Essas duas coisas não se contradizem. Nenhuma verdade sai de uma coincidência.';
  msg.className = 'ligar__msg ligar__msg--acerto';
  ['slot-a', 'slot-b'].forEach((id) => {
    const slot = $(id);
    slot.classList.add('slot--erro');
    setTimeout(() => slot.classList.remove('slot--erro'), 460);
  });
  renderCaderno();
}

/* ---------- deduções ---------- */

function cartaoDeducao(d) {
  const n = el('div', 'deducao');
  n.appendChild(el('h3', 'deducao__titulo', d.titulo));
  n.appendChild(el('p', 'deducao__texto', d.texto));
  const s = el('p', 'deducao__suspeito');
  s.appendChild(el('span', null, 'Aponta para '));
  s.appendChild(el('strong', null, SUSPEITOS[d.suspeito].nome));
  n.appendChild(s);
  return n;
}

function abrirDeducoes() {
  mostrarDeducoes();
}

function mostrarDeducoes(recemAberta) {
  const alvo = $('lista-deducoes');
  alvo.innerHTML = '';

  if (!estado.deducoes.length) {
    alvo.appendChild(el('p', 'deducoes__vazio',
      'Nada ainda. Uma verdade precisa de duas pistas que se contradizem. Vá até o caderno.'));
    mostrarTela('tela-deducoes');
    return;
  }

  if (recemAberta) alvo.appendChild(cartaoDeducao(recemAberta));
  estado.deducoes.forEach((id) => {
    if (!recemAberta || DEDUCOES[id].titulo !== recemAberta.titulo) {
      alvo.appendChild(cartaoDeducao(DEDUCOES[id]));
    }
  });

  const faltando = Object.keys(DEDUCOES).length - estado.deducoes.length;
  if (faltando > 0) {
    const v = el('div', 'deducao deducao--vazia');
    v.appendChild(el('p', null,
      `${faltando} ${faltando === 1 ? 'verdade ainda não saiu' : 'verdades ainda não saíram'}. ` +
      'Cada uma sai de duas pistas que não combinam entre si.'));
    alvo.appendChild(v);
  }

  mostrarTela('tela-deducoes');
}

/* ---------- início ---------- */

function comecar(continuando) {
  if (!continuando) {
    estado.pistas = ['c-fita'];
    estado.examinadas = [];
    estado.abertos = [];
    estado.deducoes = [];
    estado.visitadas = ['estrada'];
    estado.cena = 'estrada';
    estado.presenca = 0;
    estado.encontro = false;
    estado.final = null;
  } else if (!carregar()) {
    estado.pistas = ['c-fita'];
    estado.examinadas = [];
    estado.abertos = [];
    estado.deducoes = [];
    estado.visitadas = ['estrada'];
    estado.cena = 'estrada';
    estado.presenca = 0;
    estado.encontro = false;
  }

  if (!temPista('c-fita')) estado.pistas.unshift('c-fita');
  estado.selecao = { a: null, b: null };

  ambiente.iniciar();
  mostrarTela('tela-jogo');
  renderCena();

  if (!continuando) {
    setTimeout(() => torrada(
      'Quarenta e sete segundos. Uma mulher idosa. Um cartão sem remetente. Você está em Brejinho.'
    ), 1000);
  }
}

/* ---------- ligação dos controles ---------- */

function montar() {
  const autores = CREDITOS.autores.join(', ');
  $('titulo-autores').textContent = autores;
  $('final-autores').textContent = autores;

  $('btn-comecar').addEventListener('click', () => comecar(false));
  $('btn-continuar').hidden = !temSave();
  $('btn-continuar').addEventListener('click', () => comecar(true));

  $('btn-caderno').addEventListener('click', abrirCaderno);
  $('btn-deducoes').addEventListener('click', abrirDeducoes);
  $('btn-ligar').addEventListener('click', confrontar);

  $('btn-som').addEventListener('click', () => {
    const ligado = ambiente.alternar();
    $('btn-som').textContent = `Som: ${ligado ? 'ligado' : 'desligado'}`;
  });

  const voltarAoJogo = () => {
    mostrarTela('tela-jogo');
    renderCena();
  };

  document.querySelectorAll('[data-fechar]').forEach((b) => {
    b.addEventListener('click', voltarAoJogo);
  });

  document.querySelectorAll('[data-fechar-final]').forEach((b) => {
    b.addEventListener('click', () => {
      limparSave();
      location.reload();
    });
  });

  $('btn-reiniciar').addEventListener('click', () => {
    limparSave();
    location.reload();
  });

  const reviver = $('btn-reviver');
  if (reviver) {
    reviver.addEventListener('click', () => {
      limparSave();
      location.reload();
    });
  }

  document.addEventListener('keydown', (ev) => {
    const emFolha = estado.tela === 'tela-caderno' || estado.tela === 'tela-deducoes';
    if (ev.key === 'Escape' && (estado.tela === 'tela-jogo' || emFolha)) {
      if (emFolha) voltarAoJogo();
      else renderCena();
    }
  });

  mostrarTela('tela-titulo');
}

montar();