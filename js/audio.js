/* O Último Relato — ambiente sonoro (WebAudio, sem arquivos externos) */

const VOZES = {
  estrada: { base: 58, vento: 0.16, ruido: 0.05, tom: 0.05 },
  acude:   { base: 46, vento: 0.07, ruido: 0.10, tom: 0.08 },
  bombas:   { base: 51, vento: 0.05, ruido: 0.09, tom: 0.07 },
  zulmira: { base: 38, vento: 0.03, ruido: 0.03, tom: 0.04 },
  cemiterio: { base: 33, vento: 0.09, ruido: 0.02, tom: 0.10 },
  oficina: { base: 50, vento: 0.08, ruido: 0.05, tom: 0.07 },
  jornal:  { base: 42, vento: 0.05, ruido: 0.04, tom: 0.05 },
  delegacia: { base: 44, vento: 0.04, ruido: 0.03, tom: 0.06 },
  torre:   { base: 31, vento: 0.14, ruido: 0.04, tom: 0.11 }
};

export class Ambiente {
  constructor() {
    this.ctx = null;
    this.ligado = false;
    this.iniciado = false;
    this.nos = {};
    this.vozAtual = VOZES.estrada;
    this.alvo = VOZES.estrada;
  }

  iniciar() {
    if (this.iniciado) {
      if (this.ctx?.state === 'suspended') this.ctx.resume();
      this.alternar(true);
      return;
    }

    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;

    this.ctx = new AC();
    this.iniciado = true;
    this.ligado = true;

    const ctx = this.ctx;
    const saida = ctx.createGain();
    saida.gain.value = 0.85;
    saida.connect(ctx.destination);
    this.saida = saida;

    this.nos.saida = saida;

    // drone grave: duas ondas quase iguais batendo uma na outra
    const droneGain = ctx.createGain();
    droneGain.gain.value = 0;
    const droneFiltro = ctx.createBiquadFilter();
    droneFiltro.type = 'lowpass';
    droneFiltro.frequency.value = 320;
    droneFiltro.Q.value = 3;
    droneGain.connect(droneFiltro).connect(saida);
    this.nos.droneGain = droneGain;

    this.osc1 = ctx.createOscillator();
    this.osc1.type = 'sine';
    this.osc1.frequency.value = this.vozAtual.base;
    this.osc1.connect(droneGain);

    this.osc2 = ctx.createOscillator();
    this.osc2.type = 'sine';
    this.osc2.frequency.value = this.vozAtual.base * 1.008;
    const g2 = ctx.createGain();
    g2.gain.value = 0.55;
    this.osc2.connect(g2).connect(droneGain);

    this.osc1.start();
    this.osc2.start();
    this.osc1.frequency.value = this.vozAtual.base;
    this.osc2.frequency.value = this.vozAtual.base * 1.008;

    // vento: ruído rosa filtrado, com respiração lenta
    this.vento = this.criarRuido();
    const vGain = ctx.createGain();
    vGain.gain.value = this.vozAtual.vento;
    const vFiltro = ctx.createBiquadFilter();
    vFiltro.type = 'bandpass';
    vFiltro.frequency.value = 520;
    vFiltro.Q.value = 0.7;
    this.vento.connect(vFiltro).connect(vGain).connect(saida);
    this.nos.ventoGain = vGain;

    const respiro = ctx.createOscillator();
    respiro.type = 'sine';
    respiro.frequency.value = 0.07;
    const respGain = ctx.createGain();
    respGain.gain.value = 0.07;
    respiro.connect(respGain).connect(vGain.gain);
    respiro.start();
    this.nos.respiro = respiro;

    // chiado de estática, bem abaixo
    const statica = this.criarRuido();
    const sGain = ctx.createGain();
    sGain.gain.value = this.vozAtual.ruido;
    const sFiltro = ctx.createBiquadFilter();
    sFiltro.type = 'highpass';
    sFiltro.frequency.value = 1800;
    statica.connect(sFiltro).connect(sGain).connect(saida);
    this.nos.staticaGain = sGain;

    // tom agudo dissonante, quase no limiar de audição
    const agudo = ctx.createOscillator();
    agudo.type = 'triangle';
    agudo.frequency.value = 1180;
    const aGain = ctx.createGain();
    aGain.gain.value = 0;
    const oscLFO = ctx.createOscillator();
    oscLFO.type = 'sine';
    oscLFO.frequency.value = 0.045;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 0.006;
    oscLFO.connect(lfoGain).connect(aGain.gain);
    agudo.connect(aGain).connect(saida);
    agudo.start();
    oscLFO.start();
    this.nos.agudoGain = aGain;

    this.aplicarVoz(this.vozAtual, 2.5);
  }

  criarRuido() {
    const ctx = this.ctx;
    const buffer = ctx.createBuffer(1, ctx.sampleRate * 3, ctx.sampleRate);
    const d = buffer.getChannelData(0);
    let ultimo = 0;
    for (let i = 0; i < d.length; i++) {
      const branco = Math.random() * 2 - 1;
      ultimo = (ultimo + 0.022 * branco) / 1.022;
      d[i] = ultimo * 3.2;
    }
    const src = ctx.createBufferSource();
    src.buffer = buffer;
    src.loop = true;
    src.start();
    return src;
  }

  alternar(forcar) {
    if (!this.iniciado) { this.iniciar(); return true; }
    this.ligado = forcar !== undefined ? forcar : !this.ligado;
    if (this.ctx.state === 'suspended' && this.ligado) this.ctx.resume();
    const agora = this.ctx.currentTime;
    this.saida.gain.cancelScheduledValues(agora);
    this.saida.gain.setValueAtTime(this.saida.gain.value, agora);
    this.saida.gain.linearRampToValueAtTime(this.ligado ? 0.85 : 0, agora + 0.5);
    return this.ligado;
  }

  definirCena(id) {
    this.vozAtual = VOZES[id] || VOZES.estrada;
    if (this.iniciado && this.ligado) this.aplicarVoz(this.vozAtual, 3);
  }

  aplicarVoz(v, tempo) {
    if (!this.iniciado) return;
    const t = this.ctx.currentTime;
    const suave = (param, valor) => {
      param.cancelScheduledValues(t);
      param.setValueAtTime(param.value, t);
      param.linearRampToValueAtTime(valor, t + tempo);
    };

    this.osc1.frequency.linearRampToValueAtTime(v.base, t + tempo);
    this.osc2.frequency.linearRampToValueAtTime(v.base * 1.008, t + tempo);
    suave(this.nos.droneGain.gain, 0.16);
    suave(this.nos.ventoGain.gain, v.vento);
    suave(this.nos.staticaGain.gain, v.ruido);
    suave(this.nos.agudoGain.gain, v.tom);
  }

  tom(freq, duracao, volume = 0.06, tipo = 'sine') {
    if (!this.iniciado || !this.ligado) return;
    const ctx = this.ctx;
    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    osc.type = tipo;
    osc.frequency.value = freq;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(volume, t + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, t + duracao);
    osc.connect(g).connect(this.saida);
    osc.start(t);
    osc.stop(t + duracao + 0.05);
  }

  ambiente(evento) {
    switch (evento) {
      case 'pagina':
        this.ruidoCurto(0.08, 2400, 0.035);
        break;
      case 'achado':
        this.tom(196, 1.6, 0.05);
        this.tom(293, 2.2, 0.03);
        break;
      case 'pista':
        this.tom(523, 0.9, 0.045);
        setTimeout(() => this.tom(784, 1.3, 0.035), 90);
        break;
      case 'deducao':
        this.tom(147, 2.4, 0.06);
        setTimeout(() => this.tom(220, 2.6, 0.05), 140);
        setTimeout(() => this.tom(294, 3, 0.04), 300);
        break;
      case 'erro':
        this.ruidoCurto(0.22, 300, 0.06);
        this.tom(87, 1.1, 0.05, 'sawtooth');
        break;
      default:
        break;
    }
  }

  ruidoCurto(duracao, freq, volume) {
    if (!this.iniciado || !this.ligado) return;
    const ctx = this.ctx;
    const t = ctx.currentTime;
    const buffer = ctx.createBuffer(1, Math.ceil(ctx.sampleRate * duracao), ctx.sampleRate);
    const d = buffer.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / d.length);
    const src = ctx.createBufferSource();
    src.buffer = buffer;
    const filtro = ctx.createBiquadFilter();
    filtro.type = 'bandpass';
    filtro.frequency.value = freq;
    filtro.Q.value = 1.1;
    const g = ctx.createGain();
    g.gain.value = volume;
    src.connect(filtro).connect(g).connect(this.saida);
    src.start(t);
  }

  sussurro() {
    if (!this.iniciado || !this.ligado) return;
    const ctx = this.ctx;
    const t = ctx.currentTime;
    const buffer = ctx.createBuffer(1, ctx.sampleRate * 2.2, ctx.sampleRate);
    const d = buffer.getChannelData(0);
    for (let i = 0; i < d.length; i++) {
      const env = Math.sin((i / d.length) * Math.PI);
      d[i] = (Math.random() * 2 - 1) * env;
    }
    const src = ctx.createBufferSource();
    src.buffer = buffer;
    src.playbackRate.value = 0.7;
    const filtro = ctx.createBiquadFilter();
    filtro.type = 'bandpass';
    filtro.frequency.value = 900;
    filtro.Q.value = 3.5;
    const g = ctx.createGain();
    g.gain.value = 0.05;
    src.connect(filtro).connect(g).connect(this.saida);
    src.start(t);
  }

  susto() {
    if (!this.iniciado || !this.ligado) return;
    const ctx = this.ctx;
    const t = ctx.currentTime;

    const buffer = ctx.createBuffer(1, ctx.sampleRate * 1.4, ctx.sampleRate);
    const d = buffer.getChannelData(0);
    for (let i = 0; i < d.length; i++) {
      const p = i / d.length;
      d[i] = (Math.random() * 2 - 1) * Math.pow(1 - p, 2.4);
    }
    const src = ctx.createBufferSource();
    src.buffer = buffer;
    const g = ctx.createGain();
    g.gain.value = 0.3;
    src.connect(g).connect(this.saida);
    src.start(t);

    this.tom(41, 2.8, 0.22, 'sine');
    this.tom(61, 2.4, 0.12, 'triangle');
    this.aplicarVoz({ ...this.vozAtual, base: this.vozAtual.base + 12, tom: 0.03 }, 1.4);
    setTimeout(() => this.aplicarVoz(this.vozAtual, 4), 1500);
  }
}