export const CREDITOS = {
  autores: ['Mariana', 'Isabela', 'Rhavy', 'Pietra', 'Antonella'],
  capitulo: 'Capítulo 1 — O Cartão de Memória'
};

export const PISTAS = {
  'c-fita': {
    nome: 'Cartão de memória',
    tipo: 'Objeto',
    texto: 'Um cartão SD sem etiqueta, dentro de um envelope pardo sem remetente. Quarenta e sete segundos de áudio. Uma voz de mulher idosa, quase um sussurro, que se apresenta como "o último relato" antes de ser interrompida por um choro.'
  },
  'c-depoimento': {
    nome: 'Papel dobrado em quatro',
    tipo: 'Documento',
    texto: 'Escrito à mão, com a letra tremendo de quem escreve rápido demais: "Ele não estava só naquele dia. Ninguém me believeu e agora ninguém pergunta." Sem assinatura. O papel cheira a fumo de fogão.'
  },
  'c-recorte': {
    nome: 'Recorte de jornal (1998)',
    tipo: 'Documento',
    texto: '"MENINO DE 9 ANOS SOME NO AÇUDE DE BREJINHO — Família deixa o caso após 72 horas." A manchete ocupa meia página. A outra metade é um anúncio de gado. Não há uma única foto do menino.'
  },
  'c-foto': {
    nome: 'Cópia de fotografia',
    tipo: 'Objeto',
    texto: 'Um grupo de seis pessoas diante de uma comporta. Uma delas tem o rosto retangularmente raspado — não desbotado, raspado, com a unha. Atrás delas, na parede, um mapa da represa onde se lê ALAGADO - 1997.'
  },
  'c-mapa': {
    nome: 'Carta náutica da represa',
    tipo: 'Documento',
    texto: 'Folha dobrada, amarelada, de uma edição do mapa de Brejinho. Uma área inteira riscada a lápis e marcada "ALAGADO 1997". Uma casa e um pomar aparecem debaixo d’água. Era a vila antiga. Havia uma escola.'
  },
  'c-pegadas': {
    nome: 'Marcas na margem',
    tipo: 'Pista de campo',
    texto: 'Duas linhas paralelas na lama, dezoito centímetros de distância, entrando na água. Não são pegadas. São marcas de arrasto — e não foi a água que as fez, porque a lama ali está acima da linha do mare.'
  },
  'c-boia': {
    nome: 'Boia de pesca',
    tipo: 'Objeto',
    texto: 'Presa num galho seco, posicionada com cuidado demais para ser acaso. Dentro dela, um frasco de vidro com um caderno infantil dentro: capa dura, nome "T. OLIVEIRA", dentro, só desenhos. E uma lista de vacinas impressa em papel de farmácia.'
  },
  'c-chave': {
    nome: 'Chave de latão',
    tipo: 'Objeto',
    texto: 'Pequena, pesada, sem etiqueta, com um número de série estampado no corpo. Não é chave de casa. É chave de porta de serviço — o tipo que se usa em casa de bombas e galpão de água.'
  },
  'c-lanca': {
    nome: 'Lancha a motor',
    tipo: 'Objeto',
    texto: 'Amarrada na sombra da margem, coberta com lona e folhas. O motor está limpo demais para quem não usa aquilo há semanas. A placa foi raspada e repintada por cima — dá para ver a camada antiga por baixo.'
  },
  'c-escala': {
    nome: 'Folha de escala',
    tipo: 'Documento',
    texto: 'A escala do portão de operações, mês de setembro de 1997. A linha do dia 12 está inteira riscada por cima, mas ainda se lê por baixo: "Portão fechado às 16h30. Não reabrir. Responsável: A. B." E, ao lado, com outra letra: "por ordem".'
  },
  'c-lapide': {
    nome: 'Lápide sem nome',
    tipo: 'Objeto',
    texto: 'Cimento novo em cima de um canteiro velho, com uma placa sem epitáfio: só "IN MEMORIAM" e uma data. Setembro de 1997. Ela foi colocada três meses antes de o menino entrar na água. O nome sumiu da mesma forma que o rosto da fotografia: raspado, sem pressa, por cima.'
  },
  'c-vhs': {
    nome: 'Fita VHS sem etiqueta',
    tipo: 'Objeto',
    texto: 'Uma fita de trinta minutos dentro de uma caixa de sapato. Sem etiqueta. A primeira imagem é a sala de estar de uma casa e um relógio de parede marcando 16h20. Alguém estava filmando aquela casa vinte minutos antes de o menino aparecer no portão — e não era o dono da casa filmando.'
  },
  'c-pneus': {
    nome: 'Impressão de pneu',
    tipo: 'Pista de campo',
    texto: 'No cascalho da entrada da casa de bombas, meia-impressão de pneu: um desenho de banda larga, com nervuras de fora para dentro. Você já viu esse desenho de pneu em outro lugar hoje. Precisa de alguém que diga o nome dele em voz alta antes de dar nome a isso.'
  },
  'c-processo': {
    nome: 'Cópia do processo 97/4412',
    tipo: 'Documento',
    texto: 'Uma folha datilografada, a segunda via, guardada num envelope pardo. Motion requesting o fechamento do portão "por razones de ordem técnica". A assinatura do delegado Bandeira no campo de ciência da ocorrência. E, no canto, escrito a lápis por outra mão: "a ordem veio impressa. Perguntar quem mandou é trabalho dele."'
  }
};

export const DEDUCOES = {
  'd-poder': {
    titulo: 'Alguém de dentro montou o relato',
    texto: 'O cartão de memória e o recorte não podem vir de um estranho: o recorte está arquivado num jornal da cidade e o cartão chegou pelo correio dela. Quem gravou esses quarenta e sete segundos estava dentro de Brejinho no dia em que o caso foi arquivado. Isso não é de alguém de fora. É de alguém que commute.',
    pistas: ['c-fita', 'c-recorte'],
    suspeito: 'bandeira',
    resolve: 'O caso foi encerrado em 72 horas por decisão, não por falta de pistas.'
  },
  'd-raspado': {
    titulo: 'O rosto raspado assinou o alagamento',
    texto: 'A foto e o mapa contam a mesma história: a represa não enchia por acaso em 1997, alguém autorizou o alagamento da vila antiga — com moradores dentro. Alguém da fotografia foi raspado depois, do lado de dentro do próprio jornal. Quem raspa o rosto do culpado está protegendo o culpado.',
    pistas: ['c-foto', 'c-mapa'],
    suspeito: 'salgado',
    resolve: 'O homem raspado não sumiu por vergonha. Sumiu por conveniência.'
  },
  'd-arrasto': {
    titulo: 'O menino foi arrastado',
    texto: 'As marcas na lama e a boia posicionada provam duas coisas: ninguém entrou sozinho naquela água, e alguém montou a cena depois. A boia com o caderno foi deixada para que a morte parecesse acidente. Não foi acidente. Foi encenação — feita por alguém que sabia que ninguém viria procurar.',
    pistas: ['c-pegadas', 'c-boia'],
    suspeito: 'tarcizio',
    resolve: 'O caderno não estava na boia por acaso: a boia era a mensagem.'
  },
  'd-portao': {
    titulo: 'A chave e a lancha são do caseiro',
    texto: 'A chave de latão tem o número de série da casa de bombas, e a lancha com placa raspada estava amarrada exatamente ali. Zelão mora na casa de bombas desde 1996. É o único que podia entrar, sair e deixar a água correr à noite sem ninguém ver. Ele fez o arrasto — mas a ordem para fechar o portão veio de cima.',
    pistas: ['c-chave', 'c-lanca'],
    suspeito: 'zelao',
    resolve: 'Zelão tem as mãos. Falta descobrir quem mandou.'
  },
  'd-or-dem': {
    titulo: 'O fechamento foi assinado às 16h30',
    texto: 'A escala e o processo dizem a mesma coisa: às 16h30, na hora em que o menino estava no portão, o portão foi fechado por ordem e não reaberto até segunda-feira. A ordem foi impressa antes de ser cumprida. Alguém com poder sobre a água autorizou o fechamento com antecedência — e ninguém cumpriu aquela ordem por vontade própria.',
    pistas: ['c-escala', 'c-processo'],
    suspeito: 'bandeira',
    resolve: 'O fechamento não foi improviso. Foi escrito antes da hora em que aconteceu.'
  },
  'd-marieta': {
    titulo: 'A Marieta estava no quarto dele',
    texto: 'O papel dobrado e a fita não falam do mesmo dia: falam de meses diferentes. O papel é de quando ela ainda tinha tempo de escrever para alguém. A fita é de quando alguém filmava a sala de estar do Tarcísio com um relógio marcando 16h20. Quem escreveu o papel estava dentro de Brejinho; quem filmou estava do outro lado da rua. O papel não acusa ninguém: é de quem estava com medo antes de tudo isso acontecer, e sabe alguma coisa que ainda não contou.',
    pistas: ['c-depoimento', 'c-vhs'],
    suspeito: 'marieta',
    resolve: 'A Marieta não é testemunha deste caso. Ela é a única pessoa que ainda estava tentando.'
  },
  'd-palacete': {
    titulo: 'A lápide veio antes do afogamento',
    texto: 'Uma lápide sem nome, de setembro de 1997, e a marca de pneu do jeep que passa na frente da casa de bombas depois do fechamento. Juntas elas dizem que o índice de quem morava na vila antiga foi retirado do lugar com a mesma antecedência com que o portão foi fechado. A operação foi Planejada. E planejamento deixa assinatura.',
    pistas: ['c-lapide', 'c-pneus'],
    suspeito: 'palacete',
    resolve: 'Alguém com poder sobre a água sabia do que ia acontecer antes de acontecer.'
  },
  'd-filmagem': {
    titulo: 'Alguém filmou a casa às 16h20',
    texto: 'A fita começa numa sala de estar e num relógio marcando 16h20. É a mesma sala de estar da fotografia da inauguração, e é vinte minutos antes de o menino aparecer no portão. Quem filmava não estava no portão: estava na casa do Tarcísio, olhando o relógio, esperando alguma coisa acontecer do lado de fora. E guardou a fita numa caixa de sapato de 1997 que ainda está numa prateleira em Brejinho.',
    pistas: ['c-vhs', 'c-foto'],
    suspeito: 'palacete',
    resolve: 'A operação tinha um comece, e alguém o assistiu do começo.'
  }
};

export const SUSPEITOS = {
  tarcizio: {
    nome: 'Tarcísio Oliveira',
    papel: 'Pai do menino',
    motivo: 'É o nome mais óbvio do distrito e o mais fácil de odiar. Um pai que some com o filho e com o próprio depoimento junto.'
  },
  bandeira: {
    nome: 'Cel. Antônio Bandeira',
    papel: 'Delegado da região em 1998',
    motivo: 'Assinou o arquivamento em 72 horas, assinou o fechamento do portão e ainda hoje é a maior autoridade da cidade. Tem o motivo mais limpo do mundo: a ordem vinha de cima e ele apenas obedeceu.'
  },
  salgado: {
    nome: 'Nuno Salgado',
    papel: 'Diretor do jornal O Brejinho',
    motivo: 'Publicou a versão pronta em meia página e raspou o rosto de alguém na fotografia. Protegeu-se — mas raspou outro, não a si mesmo.'
  },
  zelao: {
    nome: 'Zelão, caseiro da casa de bombas',
    papel: 'Cuida do portão da represa',
    motivo: 'Mora ao lado da água, tem a chave, tem a lancha, e foi o único a ver o menino vivo naquela tarde. Fez o que mandaram. Ainda está vivo.'
  },
  palacete: {
    nome: 'O homem do palacete',
    papel: 'Dono da concessária, hoje na cidade',
    motivo: 'Não tem nome em nenhum documento que você encontrou. Tem a firma que assinou o alagamento, o carro que entra sem registro e a única pessoa de Brejinho que nunca precisou descer até a água.'
  },
  marieta: {
    nome: 'Marieta Weinberg',
    papel: 'Autora do cartão de memória',
    motivo: 'É a única pessoa de Brejinho que tentou alguma coisa em 1997 e em 2026. Não matou ninguém. Só é a única que ainda estava acordada quando tudo isso aconteceu.'
  },
  ninguem: {
    nome: 'Não acusar ninguém',
    papel: 'Guardar a pasta e voltar pra casa',
    motivo: 'É sempre a escolha mais segura. É também a escolha que garante que Brejinho continue exatamente igual por mais vinte e oito anos.'
  }
};

export const CENAS = [
  {
    id: 'estrada',
    nome: 'Pórtico de Brejinho',
    hora: '07h12 — manhã',
    classe: 'bg-estrada',
    legenda: 'A estrada de terra termina numa placa enferrujada e numa capela fechada.',
    texto: 'O carro encosta antes do sol nascer. Brejinho é menor do que as fotos de satélite: vinte casas, uma capela, uma escola com uma sala só e o açude. O silêncio aqui não é de manhã. É de sempre.',
    hotspots: [
      {
        id: 'e-placa', rotulo: 'Placa de entrada', x: 10, y: 44,
        texto: 'BREJINHO — FUNDAÇÃO 1964 — POP. 214. Alguém riscou o número e escreveu 187 por cima. Enquanto o número novo esteve lá, ninguém corrigiu.'
      },
      {
        id: 'e-capela', rotulo: 'Capela', x: 64, y: 22,
        texto: 'Porta trancada com corrente. No vidro, um aviso de missa de domingo escrito há anos. No degrau, um cigarro ainda quente: alguém esteve aqui há menos de dez minutos. Ninguém deveria estar acordado.'
      },
      {
        id: 'e-portao', rotulo: 'Portão da represa', x: 80, y: 58,
        texto: 'Grade de ferro com camada grossa de ferrugem e uma corrente nova prendendo a folha direita. Corrente nova em um portão que ninguém abre desde 1997. Alguém anda cuidando de fechar.'
      },
      {
        id: 'e-caseiro', rotulo: 'Caseiro da casa de bombas', x: 30, y: 64,
        texto: 'Uma construção de madeira no meio do caminho, com uma luz acesa às sete da manhã. O caseiro não acena, não pergunta, não se oferece. Só acompanha o carro com os olhos até o ponto onde a estrada curva.',
        primeiro: 'z-primeiro'
      }
    ]
  },
  {
    id: 'acude',
    nome: 'Açude de Brejinho',
    hora: '11h40 — sol alto',
    classe: 'bg-acude',
    legenda: 'A represa é bonita de um jeito errado. A água não se move.',
    texto: 'Do outro lado da água, uma parede de tijolo e uma torre de sineiro saem da represa como se alguém tivesse levantado o açude em cima delas. Nada disso deveria estar visível. Ainda assim dá para ver a torre, e dá para ver que o sineiro está sem badalo.',
    hotspots: [
      {
        id: 'a-agua', rotulo: 'Água do açude', x: 48, y: 58,
        texto: 'Plana, espelhada, sem ondulação. Um peixe salta longe e o barulho chega meio segundo atrasado, como se a água tivesse que pensar antes de devolver o som.'
      },
      {
        id: 'a-muro', rotulo: 'Parede submersa', x: 22, y: 42,
        texto: 'Uma janela de vidro empoeirado, aberta para dentro. Atrás dela, o contorno de uma cama. Encostado na parede, debaixo d’água, um mapa náutico enrolado em plástico. Não tem como ler de onde você está, mas dá para ver que é um mapa.',
        primeiro: 'a-muro', dá: 'c-mapa'
      },
      {
        id: 'a-boia', rotulo: 'Galho com boia', x: 70, y: 74,
        texto: 'Uma boia de pesca branca, presa num galho seco, posicionada com um cuidado que ninguém tem por acaso. Dentro, um frasco de vidro. Dentro do frasco, um caderno de capa dura.',
        primeiro: 'a-boia', dá: 'c-boia'
      },
      {
        id: 'a-margem', rotulo: 'Margem de lama', x: 34, y: 84,
        texto: 'A lama fresca conta a margem inteira: marcas de joelho, um arco de capim pisoteado e duas linhas retas e paralelas que entram na água e não voltam.',
        dá: 'c-pegadas',
        exigeExaminada: ['z-3'],
        exigeTexto: 'Você ainda não sabe o que procurar na margem. Dona Zulmira sabe. Vá até a casa dela.'
      }
    ]
  },
  {
    id: 'bombas',
    nome: 'Casa de bombas',
    hora: '12h30 — sol alto',
    classe: 'bg-bombas',
    legenda: 'Concreto, ferrugem e um rádio ligado sem sinal nenhum.',
    texto: 'A construção fica no ponto mais alto da margem, de onde se vê o portão inteiro. Porta de ferro, janela quebrada, painel de engrenagens parado. Alguém deixou o rádio ligado. Sem portadora, sem estática que organize: só chiado, do jeito que um rádio fica quando está ligado há muito tempo para uma coisa que não é escutar.',
    hotspots: [
      {
        id: 'b-porta', rotulo: 'Porta de ferro', x: 20, y: 50,
        texto: 'Fechada. A fechadura tem um arranhão antigo em volta, de chave que já girou mil vezes. A soleira tem areia trazida do cascalho da entrada — e, junto da porta, meia-impressão de pneu que não pertence a nenhum carro que deveria vir aqui.',
        dá: 'c-pneus'
      },
      {
        id: 'b-chave', rotulo: 'Chaveiro de pregos', x: 34, y: 34,
        texto: 'Um prego torto na parede com um chaveiro de três chaves: uma de tractor, uma de casa e uma de latão sem etiqueta. A de latão tem o mesmo peso morto das chaves que ficam em tasca do chão de pedra, e o mesmo número de série estampado.',
        dá: 'c-chave'
      },
      {
        id: 'b-alvara', rotulo: 'Placa na parede', x: 66, y: 26,
        texto: 'Alumínio oxidado, aparafusado no reboco: "OPERAÇÃO DE ALAGAMENTO CONTROLADO — SET/97 — VILA ANTIGA". Tem nome de firma de engenharia, número de processo e a assinatura do responsável técnico. Alguém tentou raspar a assinatura. Tentou por cima e desistiu na metade.'
      },
      {
        id: 'b-escala', rotulo: 'Mesa de comando', x: 62, y: 62,
        texto: 'Uma mesa com um copo virado, uma caneta sem tampa e uma folha datilografada presa por um peso de pedra. É a folha de escala do portão. A linha do dia 12 está riscada por cima, mas a leitura de baixo ainda aparece.',
        dá: 'c-escala'
      },
      {
        id: 'b-lanca', rotulo: 'Lona encostada na parede', x: 86, y: 46,
        texto: 'Uma lona molhada, puxada para fora. Debaixo, um focinho de fliper. Ninguém guarda uma lancha coberta de lona dentro de casa de bombas se a lancha não mora ali.',
        dá: 'c-lanca'
      },
      {
        id: 'b-radio', rotulo: 'Rádio', x: 40, y: 74,
        texto: 'Um rádio de pilhas apoiado no parapeito. Ligado. Você muda de estação e ele chia igual em todas. Puxa o plugue e o chiado continua por dois segundos, como se alguma coisa tivesse que terminar de acontecer antes de poder parar.'
      }
    ]
  },
  {
    id: 'zulmira',
    nome: 'Casa de Dona Zulmira',
    hora: '15h20 — tarde',
    classe: 'bg-casa',
    legenda: 'A casa cheira a fumo e a bolo. Ela sabe que você veio.',
    texto: 'Dona Zulmira tem 78 anos e a idade exata de quem viu o que você veio ver. Ela não pergunta seu nome, não oferece café e não se senta. Fica de pé entre a geladeira e a janela, de costas para você, como quem guarda uma saída.',
    modo: 'conversa',
    hotspots: [
      {
        id: 'z-1', rotulo: 'O que você reconhece nesta voz?', x: 16, y: 28,
        texto: 'Ela olha para o cartão na sua mão por tempo demais. "É a Marieta." Depois, mais baixo: "A Marieta tá morrendo. Por isso que ela mandou isso pra você e não pro delegado." E pede que você não faça uma pergunta óbvia.',
        primeiro: 'z-1', dá: 'c-depoimento'
      },
      {
        id: 'z-2', rotulo: 'Quem tinha acesso à casa de bombas?', x: 16, y: 46,
        texto: '"Tinha o Zelão. Só o Zelão." Ela pega um saleiro e vira na mão sem necessidade. "E tinha o carro do delegado, que entrava pela parte de trás quando não queria registro de passagem. Os dois saíam por ali. Sempre juntos."',
        primeiro: 'z-2'
      },
      {
        id: 'z-3', rotulo: 'O que aconteceu com o menino?', x: 16, y: 64,
        texto: 'Ela conta rápido, sem pausas: o menino apareceu no portão às quatro da tarde querendo brincar na água; o Zelão mandou ele embora; vinte minutos depois o portão abriu outra vez e ninguém viu quem entrou. Ela não viu o menino sair. Ela também não fez questão de ver. "Eu tinha quatro filhos naquele portão", ela diz, "e nenhum deles precisa do meu heroísmo."',
        primeiro: 'z-3'
      },
      {
        id: 'z-4', rotulo: 'Conte sobre a fotografia.', x: 16, y: 82,
        texto: '"A fotografia. Existia uma fotografia na parede da prefeitura, com todo mundo em cima da comporta." Ela some trinta segundos. "O Tarcísio guardou uma cópia. Anos depois ele me deu, falando que não aguentava mais olhar aquilo toda vez que batesse na porta do açude." Ela aponta com o queixo para a geladeira.'
      },
      {
        id: 'z-5', rotulo: 'Por que ninguém pergunta mais?', x: 16, y: 93,
        texto: '"Porque perguntar dá trabalho e Brejinho é pequeno." Ela encara você pela primeira vez. "Você não é de daqui. Se sair daqui com essa história, a Marieta morre sem ter falado com ninguém. Ou pior: morre depois de ter falado, e aí vão saber que ela falou."'
      }
    ]
  },
  {
    id: 'cemiterio',
    nome: 'Cemitério de Brejinho',
    hora: '17h05 — fim de tarde',
    classe: 'bg-cemiterio',
    legenda: 'Dezoito lápides. Uma delas é nova demais.',
    texto: 'O cemitério fica atrás da capela, num terreiro que foi capim e virou terra batida. Dezoito lápides para duzentos e cinco moradores. Nenhuma é do menino. Todas as datas são antigas, excepto uma, e essa é de cimento novo.',
    hotspots: [
      {
        id: 'k-lapide', rotulo: 'Cimento novo', x: 30, y: 58,
        texto: 'Um canteiro velho com um tampo de cimento ainda claro, curvado na borda de quem assentou com pressa. A placa é de mármore sem epitáfio: só "IN MEMORIAM" e uma data de setembro de 1997. Três meses antes de o menino entrar na água. O nome foi raspado, e o raspado é mais antigo que a terra ao redor.',
        dá: 'c-lapide'
      },
      {
        id: 'k-nome', rotulo: 'Lápide dos Oliveira', x: 70, y: 42,
        texto: 'Uma lápide pequena com dois nomes: Tarcísio Oliveira, 1949. E embaixo, riscado de leve, quase apagado, outro nome raspado da mesma forma que a placa de IN MEMORIAN. Quem raspa nome de lápide está passando a vida olhando a mesma pedra.'
      },
      {
        id: 'k-muro', rotulo: 'Muro do fundo', x: 88, y: 74,
        texto: 'O muro dos fundos dá para a estrada de baixo. Na terra batida encostada nele, marcas de pneu fresco: banda larga, com as nervuras marcadas de fora para dentro. O mesmo desenho de pneu que você viu na porta da casa de bombas. O carro que passou aqui parou perto demais do muro para ser passeio.'
      }
    ]
  },
  {
    id: 'oficina',
    nome: 'Oficina do Nenê',
    hora: '19h40 — noite',
    classe: 'bg-oficina',
    legenda: 'A porta está aberta. O rádio toca. Ninguém atende.',
    texto: 'A oficina ocupa o térreo de uma casa de tijolo aparente com um elevador hidráulico no fundo e um jeep em cima dele, de frente para a rua, coberto com lona. O rádio toca uma estação que não pega direito. Alguém pôs um balde embaixo do carro.',
    hotspots: [
      {
        id: 'f-balde', rotulo: 'Balde embaixo do jeep', x: 46, y: 74,
        texto: 'Um balde preto sob o eixo dianteiro. Dentro, meio copo de líquido escuro e um pano com marcas de graxa. Você levanta o pano com a ponta do sapato: na borda, um resíduo claro e-hard que não é graxa. Parece lama. Depois de vinte e oito anos, lama do açude não escorre de dentro de um jeep guardado.',
        exigePistas: 3,
        exigeTexto: 'Você está olhando sem saber o que procura. Volte quando a pasta tiver algo.'
      },
      {
        id: 'f-radio', rotulo: 'Rádio da oficina', x: 22, y: 34,
        texto: 'Uma rádio de pilhas em cima do balcão, com o volume baixo demais para quem quer ouvir. A pilha está fraca e a música tem aquele intervalo de chiado que ninguém comuta mais. Alguém deixa isso ligado a noite inteira para não ouvir o silêncio.'
      },
      {
        id: 'f-foto', rotulo: 'Foto de parede', x: 76, y: 30,
        texto: 'Uma fotografia emoldurada: a equipe da concessionária de energia em cima da comporta, na inauguração, com bandeirinha. Um dos homens está no canto, meio fora da foto, com as mãos no bolso. O rosto dele não foi raspado nesta. Ainda dá para ver que é o mesmo da fotografia do jornal.',
        exigeExaminada: ['z-4'],
        exigeTexto: 'Você não tem com o que comparar ainda. Dona Zulmira tem uma cópia daquela outra fotografia.'
      },
      {
        id: 'f-caixa', rotulo: 'Caixa de sapato', x: 62, y: 60,
        texto: 'Uma caixa de sapato em cima do balcão, com o nome de uma marca de calçado de 1997. Dentro, não há sapato: há uma fita VHS de trinta minutos, sem etiqueta, e uma lupa de leitura. As duas coisas estão fora de ordem junto, como se tivessem sido guardadas à pressa por alguém que não sabia qual delas importava mais.',
        dá: 'c-vhs'
      }
    ]
  },
  {
    id: 'jornal',
    nome: 'Sede do jornal O Brejinho',
    hora: '21h20 — noite',
    classe: 'bg-jornal',
    legenda: 'O chão fede a tinta velha. Nuno não está.',
    texto: 'O jornal ocupa o térreo de uma casa de dois andares com a escada do primeiro andar lacrada por dentro. A máquina de escrever está na mesa com uma folha encaixada, sem começar a escrever nada. A luz está acesa. A cadeira está quente.',
    hotspots: [
      {
        id: 'n-foto', rotulo: 'Fotografia na parede', x: 62, y: 38,
        texto: 'Um grupo de seis pessoas diante de uma comporta, flash direto, sombras duras. Um dos rostos tem um retângulo raspado com a unha. Atrás do grupo, na parede do fundo, um mapa da represa com uma área inteira riscada.',
        dá: 'c-foto',
        exigeExaminada: ['z-4'],
        exigeTexto: 'Você ainda não sabe o que procurar. Dona Zulmira guardou uma cópia dessa fotografia. Peça antes de vir.'
      },
      {
        id: 'n-acervo', rotulo: 'Acervo de 1998', x: 80, y: 64,
        texto: 'Volume encadernado com elástico. 1998, número 41. A manchete ocupa meia página: "MENINO DE 9 ANOS SOME NO AÇUDE DE BREJINHO — Família deixa o caso após 72 horas". A outra meia página é propaganda de gado. Não há uma única foto do menino. Mas há uma assinatura no rodapé, com o nome do repórter.',
        dá: 'c-recorte'
      },
      {
        id: 'n-porta', rotulo: 'Porta dos fundos', x: 16, y: 70,
        texto: 'Escada para o quintal, com uma grade no alto. A grade está trancada por fora com corrente nova — a mesma corrente fina do portão do açude. Do outro lado, marcas de pneu na terra: alguém saiu de carro pelo quintal e não pelo portão principal. O carro não estava no pátio quando você chegou.'
      }
    ]
  },
  {
    id: 'delegacia',
    nome: 'Delegacia de Brejinho',
    hora: '22h05 — noite',
    classe: 'bg-delegacia',
    legenda: 'A luz da sala fica acesa o dia inteiro, por hábito.',
    texto: 'A delegacia é uma sala com três carteiras, um ventilador de teto que gira devagar demais e um arquivo de aço com quatro gavetas. Não há ninguém. O ventilador está ligado. Na parede, um mapa da região com um círculo vermelho em volta do açude.',
    hotspots: [
      {
        id: 'g-mapa', rotulo: 'Mapa da parede', x: 26, y: 30,
        texto: 'Mapa da região com o açude circulado em vermelho e, ao lado, um número de processo escrito a caneta: 97/4412. O círculo foi feito de uma vez só, com força, e depois reforçado. Quem reforça um círculo vermelho nessa parede queria que a pergunta ficasse na parede antes de virar dúvida de alguém.'
      },
      {
        id: 'g-arquivo', rotulo: 'Arquivo de aço', x: 58, y: 58,
        texto: 'A gaveta do ano 1997 está travada. Dentro, um maço de processos esmagados de um jeito que ninguém organiza:Leaf. Você folheia até o número 97/4412. Não é o processo do menino. É o processo do fechamento do portão.',
        dá: 'c-processo'
      },
      {
        id: 'g-patio', rotulo: 'Pátio dos fundos', x: 84, y: 40,
        texto: 'Pátio de terra batida com um jeep estacionado, capota limpa, chaves no porta-luvas. Você abre o porta-luvas. Dentro, o Manual de Identificação veicular de 1997 e uma folha de papel dobrada. A folha tem o formato exato dos papéis que se preenchem à mão quando um fato chega à noite.',
        exigeExaminada: ['z-2'],
        exigeTexto: 'Você não tem motivo para estar revirando um carro de polícia. Precisa ouvir primeiro por que esse carro era importante.'
      },
      {
        id: 'g-vitrine', rotulo: 'Moldura de avisos', x: 36, y: 80,
        texto: 'Uma moldura de vidro com os avisos deSchema e horários de plantão. Num deles, escrito à mão a caneta com letra de quem tem pressa: "qualquer coisa do açude, me ligar antes de mandar alguém". O aviso é de 2004. Dezanove anos depois do afogamento, e a mesma pessoa ainda estava com medo do que a água podia fazer sozinha.'
      }
    ]
  },
  {
    id: 'torre',
    nome: 'Torre do caixa-d’água',
    hora: '23h50 — madrugada',
    classe: 'bg-torre',
    legenda: 'Ninguém sobe em torre de caixa-d’água à meia-noite. Ninguém.',
    texto: 'A torre fica no ponto mais alto de Brejinho e é a única coisa que dá para ver o açude inteiro de cima. Você subiu porque Marieta disse, nos quarenta e sete segundos, "suba". Agora está com o gravador na mão e a cidade lá embaixo, escura e obediente.',
    hotspots: [
      {
        id: 't-gravador', rotulo: 'Gravador', x: 28, y: 56,
        texto: 'O gravador tem seis minutos e quarenta segundos que não vieram do cartão de Marieta. Voz de homem, respirando, gravando no escuro: "...o portão tá aberto, o moleque entrou sozinho, eu não encostei nele, ce fala pro delegado que o moleque entrou sozinho..." A gravação para no meio de uma inspiração. Depois, três minutos de silêncio absoluto. Depois, uma voz de mulher dizendo apenas "Tarcísio". E a gravação termina.'
      },
      {
        id: 't-silhueta', rotulo: 'Silhueta no corrimão', x: 74, y: 28,
        texto: 'Uma forma parada no corrimão da torre, de costas. Não se vira quando você chega. Ela sobe a última barra do corrimão e fala com a voz de quem não quer ser ouvido por muito tempo: "Eu não vim te dar as boas-vindas. Vim te avisar que você já pegou a pasta certa e o caminho errado."',
        exigePistas: 3,
        exigeTexto: 'Você sobe aqui com as mãos vazias. Não há o que dizer a essa pessoa, e não há o que ouvir. Volte quando tiver encontrado alguma coisa.'
      }
    ],
    escolhas: [
      { id: 'acusa-tarcizio', rotulo: 'Apresentar Tarcísio Oliveira à polícia', exige: ['d-arrasto'] },
      { id: 'acusa-bandeira', rotulo: 'Apresentar o Cel. Bandeira à polícia', exige: ['d-poder', 'd-or-dem'] },
      { id: 'acusa-salgado', rotulo: 'Apresentar Nuno Salgado à polícia', exige: ['d-raspado'] },
      { id: 'acusa-zelao', rotulo: 'Encostar no Zelão, na casa de bombas', exige: ['d-arrasto', 'd-portao'] },
      { id: 'acusa-palacete', rotulo: 'Levar a pasta para fora de Brejinho', exige: ['d-palacete', 'd-or-dem', 'd-filmagem'] },
      { id: 'acusa-marieta', rotulo: 'Devolver os quarenta e sete segundos à Marieta', exige: ['d-marieta'] },
      { id: 'acusa-ninguem', rotulo: 'Guardar a pasta e voltar pra casa', exige: [] }
    ]
  }
];

export const PRIMEIROS = {
  'z-primeiro': {
    titulo: 'O caseiro',
    texto: 'Ele não acena, não pergunta, não se oferece. Só acompanha o carro com os olhos até o ponto onde a estrada curva. Mais tarde você vai lembrar disto: foi a única pessoa que te viu entrar em Brejinho e não ficou na janela.'
  },
  'a-muro': {
    titulo: 'O que está debaixo d’água',
    texto: 'O mapa ficou preso na parede submersa. Não dá para ler tudo, mas dá para ler o suficiente: uma área inteira riscada a lápis, marcada ALAGADO 1997, com o desenho de uma casa, de uma escola e de um pomar que não existem mais em nenhuma planta de Brejinho. Havia gente morando aqui.'
  },
  'a-boia': {
    titulo: 'O que estava dentro da boia',
    texto: 'Um frasco com um caderno infantil dentro. Capa dura, nome "T. OLIVEIRA". Dentro, só desenhos — nenhum adulto desenhou por ele. E uma lista de vacinas impressa em papel de farmácia, com o carimbo de um posto de saúde que fechou em 2001. A boia foi posta ali para ser achada. Alguém quis que isso encontrasse alguém.'
  },
  'z-1': {
    titulo: 'A Marieta',
    texto: 'Você não tinha ainda o nome de quem gravou o cartão. Agora tem: Marieta Weinberg, 78 anos, irmã de um homem que trabalhava na concessionária e que foi o primeiro a morrer quando a água subiu em 1997. Ela gravou os quarenta e sete segundos sabendo que não ouviria a resposta. Mandou para você porque você é de fora e porque você é a única pessoa que ela não conhece.'
  },
  'z-2': {
    titulo: 'O carro que não era do Zelão',
    texto: '"O carro azul da polícia." Ela repete isso três vezes antes de você entender que é a parte importante. Não é que o Zelão podia entrar na casa de bombas: ele morava ali. É que, às vezes, quem entrava era o carro do delegado, e a fechadura ficava girando por dentro enquanto ela olhava da janela da cozinha. Ela viu esse carro entrar quatro vezes em três semanas. Nunca viu sair.'
  },
  'z-3': {
    titulo: 'As quatro da tarde',
    texto: 'Ela sabe o horário porque era a hora de buscar os meninos na escola. Quatro da tarde: o menino passou pelo portão, o Zelão mandou voltar, e vinte minutos depois o portão abriu. O que ela não conta é o que ouviu depois disso — e o que decidiu não ouvir. Você sai da casa dela com a certeza de que ela não está mentindo, e com a certeza pior de que ela escolheu não dizer.'
  }
};

export const FINAIS = {
  'acusa-tarcizio': {
    titulo: 'O nome mais fácil',
    classe: 'final-ruim',
    texto: [
      'Tarcísio Oliveira confessa em quarenta minutos e chorando de alívio. Ele não era o autor do afogamento, mas era o pai que ninguém deixou procurar, o pai que entrou na água uma vez e nunca mais voltou ao portão. Confessou o próprio desaparecimento porque o seu tinha coincidido com o filho dele.',
      'A cobertura em dois dias: o pai do menino afogou o filho e confessou. É uma história que cabe em meia página e vende jornal. O delegado Bandeira aperta a sua mão na saída e agradece publicamente. Dona Zulmira não atende mais o telefone.',
      'Zelão continua na casa de bombas. A chave de latão continua na gaveta dele. E, em vinte e oito anos, mais um menino vai aparecer num portão de Brejinho às quatro da tarde, querendo brincar na água.'
    ]
  },
  'acusa-bandeira': {
    titulo: 'A ordem que ele executou',
    classe: 'final-medio',
    texto: [
      'O Cel. Bandeira não nega. Ele faz uma coisa que você não esperava: pede para ouvir o cartão de memória até o fim, sozinho, na sua máquina, com a porta fechada. Quando termina, diz que sim, foi ele, e que o arquivamento foi pedido de cima e de baixo.',
      'Ele conta o que você não perguntou: em 1997 mandaram fechar o portão com moradores do lado de dentro porque a concessionária estava perdendo o prazo. Ele era só um cabo. Não tinha a ordem guardada — guardou, sim, mas está no cofre de quem deu a ordem, e esse nome você não vai conseguir arrancar de ninguém em Brejinho.',
      'Você sai com o nome de um homem que confessou e não pode ser preso, e com a certeza de que ele foi um dente de uma engrenagem maior. Marieta continua viva por mais duas semanas. A pasta continua aberta.'
    ]
  },
  'acusa-salgado': {
    titulo: 'Ele raspou outro, não a si mesmo',
    classe: 'final-medio',
    texto: [
      'Nuno Salgado não nega nada e entrega a fotografia original em quarenta e oito horas. O rosto raspado era o agrimensor que assinou o alagamento de 1997 — e o homem que autorizou o alagamento da vila antiga recebeu, doze anos depois, o cargo mais alto da cidade.',
      'Mas Nuno raspou aquele rosto porque o sujeito da fotografia tinha sido o primeiro a morrer, e o segundo a morrer foi quem mandou ele raspar. Nuno protegeu um morto para não conseguir proteger um vivo. Ele chora quando explica isso e você acredita nele, e isso é o pior: se Nuno é apenas cúmplice, o mandão continua na cadeira dele.',
      'Você sai com metade da verdade e a certeza de que ela é a metade perigosa. Marieta ainda está viva. O cartão ainda tem mais quarenta e sete segundos de audição por escutar.'
    ]
  },
  'acusa-zelao': {
    titulo: 'O caseiro e a porta que ninguém trancou',
    classe: 'final-verdade',
    texto: [
      'Você não apresenta ninguém. Desce da torre, atravessa a praça e bate na porta da casa de bombas às duas da manhã. Zelão abre. Tem cinquenta e três anos e o olhar de quem passou vinte e oito anos esperando exatamente essa visita.',
      'Ele conta em voz baixa, olhando para o portão: o menino entrou sozinho às quatro da tarde; Bandeira estava na sala de comando de casa, dentro do carro oficial, sem registro de passagem; a ordem foi fechar o portão e não abrir até segunda-feira; Zelão obedeceu porque tinha dois filhos na vila e a ordem trazia o nome do agrimensor, que era primo dele. Foi ele quem fechou. Foi ele quem lavou a lancha. Foi ele quem raspou o rosto na fotografia, a pedido, para o homem continuar vivo e o caso continuar morto.',
      'Quando você pergunta quem mandou, ele ri sem humor e aponta para a água. "O açude não tem dono, moço. Mas o dono do açude tá lá em cima, no palacete, e ele nunca precisou descer."',
      'Você grava tudo. Na manhã seguinte a Marieta morre antes de ouvir a fita. No dia seguinte o Cel. Bandeira é transferido para um lugar longe daqui. No dia seguinte o palacete recebe uma visita que não é você e que não vai sair de lá dentro de seis meses.',
      'Você sai de Brejinho pela estrada de terra. A placa tem dezoito e sete casas e um açude plano. No retrovisor, a torre do caixa-d’água some atrás do morro e, por um segundo — só um segundo, você jura — o sineiro debaixo d’água toca uma vez.'
    ]
  },
  'acusa-palacete': {
    titulo: 'O homem que nunca precisou descer',
    classe: 'final-verdade',
    texto: [
      'Você não vai à polícia de Brejinho: a polícia de Brejinho é parte do que aconteceu. Você leva a pasta para fora da cidade, com a folha de escala, o processo 97/4412, a placa de alagamento e a lápide sem nome — quatro peças que nenhuma pessoa de Brejinho consegue ler ao mesmo tempo, e que juntas dizem uma frase simples: alguém sabia da data antes da data.',
      'A denúncia não demora seis meses. Demora nove dias, e abre num inquérito que não é de Brejinho e não é de ninguém que você conheça. A concessionária é dissolvida, a obra é reaberta, a ordem de fechamento vai para o arquivo geral da Justiça, e um nome que estava raspado em três lugares diferentes aparece inteiro em três lugares diferentes no mesmo dia.',
      'Você não conhece o rosto. Não precisa. Seis meses depois, um grupo de Brejinho é recebido numa sala em São Paulo, e o primeiro a falar é Zelão, de camisa limpa, porque é o único que ainda está vivo para ser ouvido. O segundo é a Marieta, numa maca, porque foi ela que começou tudo e não teve tempo de ver terminar.',
      'Na parede da sala há o mapa da represa com a área riscada. Ninguém a apaga. Quando Brejinho encher de novo, vão plantar árvore em cima da vila antiga, e o boy que subiu vai ter o nome de um menino que entrou na água por curiosidade às quatro da tarde e não por culpa de ninguém, e a cidade inteira vai chamar aquilo de memória.'
    ]
  },
  'acusa-marieta': {
    titulo: 'O que a Marieta ainda não contou',
    classe: 'final-medio',
    texto: [
      'Você desce da torre, volta à casa da Dona Zulmira e põe o cartão de memória na mesa, ao lado do copo. Dona Zulmira olha e diz que você devolveu a única coisa que aquela mulher queria que devolvesse. Depois pergunta o que você quer de verdade. Você quer saber por que a Marieta filmou a casa do Tarcísio em setembro de 1997, e Dona Zulmira responde que a Marieta não filmou: alguém filmou ela.',
      'A Marieta era da partida de thanksgiving da concessionária. Foi a única do grupo que não subiu para a sala de comando quando a ordem de fechar o portão foi lida, e a única que ficou na vila antiga até a água cobrir o piso da cozinha. Ela viu quem entrou na água. Ela nunca disse isso em voz alta — nem quando o delegado arquivou em 72 horas, nem quando o jornal publicou a meia página, nem quando ganhou a loteria e foi embora.',
      'Ela estava morrendo e não queria ser a heroína de ninguém. Queria que um estranho de fora entregasse um relato que ninguém em Brejinho tivesse coragem de receber. Você acaba de fazer exatamente o que ela pediu — devolveu a fita e não fez pergunta óbvia.',
      'Dezoito meses depois, um inquérito que não é de Brejinho pede depoimento de uma testemunha protegida cujo nome não aparece. O depoimento é de vinte e uma páginas e não diz quase nada. Mas no anexo, colado à última folha, há um desenho feito a lápis num guardanapo de lanchonete: uma casa com uma janela, uma boia e um menino entrando na água por vontade própria. É o mesmo desenho que estava dentro do frasco. Marieta guardou o caderno do menino a vida inteira e você levou isso embora sem perceber.'
    ]
  },
  'acusa-ninguem': {
    titulo: 'A pasta fechada',
    classe: 'final-ruim',
    texto: [
      'Você guarda a pasta na mala, aperta para a Marieta um abraço que dura mais do que o necessário e entra no carro. No retrovisor, Brejinho continua exatamente igual: dezoito e sete casas, um açude plano, uma torre sem badalo.',
      'Você não é o primeiro a fazer isso. O delegado Bandeira também já foi embora uma vez, em 1998, e voltou. Nuno também. Todo mundo em Brejinho já guardou alguma coisa uma vez, e conhece bem o peso de um envelope fechado na bagagem.',
      'Quarenta e sete segundos de uma mulher morrendo. É o tempo exato que uma pessoa leva para concluir que a coragem não vale o que custa, e para voltar para casa.'
    ]
  }
};

export const EPILOGO = [
  'Marieta Weinberg, 78 anos, morreu em 14 de março, três semanas depois da sua visita a Brejinho.',
  'A polícia de Brejinho reabriu o caso do menino do açude em abril do ano seguinte. O inquérito foi arquivado em junho, por falta de provas novas, sem uma única linha sobre a casa de bombas.',
  'O açude continua ali, e ninguém de Brejinho entra na água. As crianças nadam na parte de cima da represa, onde o vento não bate.',
  'Você nunca terminou de ouvir o segundo cartão de memória que a Marieta deixou com a irmã dela. Ela tinha dito que tinha mais um. Talvez tivesse.'
];