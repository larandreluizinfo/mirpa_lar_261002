/* O Último Relato — motor do jogo */

import {
  CREDITOS, PISTAS, DEDUCOES, SUSPEITOS, CENAS, PRIMEIROS, FINAIS, EPILOGO
} from './data.js';
import { Ambiente } from './audio.js';
import { desenhar } from './arte.js';

const CHAVE_SAVE = 'ultimo-relato/v1';

const OBJETIVOS = {
  estrada: 'Alguém aqui já sabia que você viria. Vá até o açude e ouça Dona Zulmira.',
  acude: 'Examine a margem e a parede submersa. Dona Zulmira sabe o que há aqui.',
  bombas: 'A chave, a escala e a lancha estão todas nesta sala. Não deixe nada de fora.',
  zulmira: 'Ela sabe mais do que contou. As respostas dela abrem o açude e a casa de bombas.',
  cemiterio: 'Dezoito lápides para duzentos e cinco moradores. Nenhuma é do menino.',
  oficina: 'O jeep do balde está guardado há tempo demais. Alguém filmou alguma coisa.',
  jornal: 'O jornal tem uma fotografia. Dona Zulmira tem a cópia.',
  delegacia: 'O processo 97/4412 está neste arquivo. A porta dos fundos fica trancada por fora.',
  torre: 'Suba. Você já sabe quem tem as mãos. Falta descobrir quem mandou.'
};

const estado = {
  tela: 'titulo',
  cena: 'estrada',
  pistas: [],
  examinadas: [],
  deducoes: [],
  visitadas: ['estrada'],
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

function cenaAtual() {
  return CENAS.find((c) => c.id === estado.cena);
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
    const b = el('button', c.id === estado.cena ? 'atual' : '', c.nome);
    b.type = 'button';
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
  estado.cena = id;
  if (!estado.visitadas.includes(id)) estado.visitadas.push(id);
  ambiente.sussurro();
  mostrarTela('tela-jogo');
  renderCena();
}

/* ---------- examinar ---------- */

function examinar(id) {
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

  if (!examinou(id)) {
    estado.examinadas.push(id);
    arteAnterior.add(id);
    ambiente.ambiente('pagina');
  }

  $('painel').querySelectorAll('.painel__corpo').forEach((n) => n.remove());

  const bloco = h.primeiro ? PRIMEIROS[h.primeiro] : null;

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
    estado.deducoes = [];
    estado.visitadas = ['estrada'];
    estado.cena = 'estrada';
    estado.final = null;
  } else if (!carregar()) {
    estado.pistas = ['c-fita'];
    estado.examinadas = [];
    estado.deducoes = [];
    estado.visitadas = ['estrada'];
    estado.cena = 'estrada';
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