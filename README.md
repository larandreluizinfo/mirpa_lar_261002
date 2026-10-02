# O Último Relato

🌐 **Jogue agora:** https://larandreluizinfo.github.io/mirpa_lar_261002/

Jogo de terror, suspense e investigação em navegador. Nove ambientes numa cidade
inventada do interior, uma investigação que cabe numa pasta de evidências e sete
finais — porque o jeito de fechar uma investigação muda o que aconteceu.

## A história

Em 1997 a água subiu sobre a vila antiga de Brejinho com moradores dentro, e o
acidente foi arquivado em 72 horas. Em 2026, uma mulher de 78 anos morrendo grava
**quarenta e sete segundos** de áudio e endereça a você, um jornalista de fora,
sem explicar por quê.

O jogo é o que você faz nas horas seguintes: nove lugares, trinta e cinco pontos
para examinar, catorze pistas e oito deduções. Não há combate, não há pontuação.
Só o que você examina, o que você anota e o que você decide acreditar.

## Ambientes

| Local | Horário | O que se encontra |
|---|---|---|
| Pórtico de Brejinho | 07h12 — manhã | A placa com a população corrigida e um cigarro ainda quente na capela |
| Açude de Brejinho | 11h40 — sol alto | A parede submersa da vila alagada, uma boia posicionada demais, marcas de arrasto |
| Casa de bombas | 12h30 — sol alto | A chave, a folha de escala, a placa de alagamento e a lancha com placa raspada |
| Casa de Dona Zulmira | 15h20 — tarde | Uma testemunha que sabe mais do que decidiu dizer |
| Cemitério de Brejinho | 17h05 — fim de tarde | Dezoito lápides para duzentos e cinco moradores, e uma de cimento novo |
| Oficina do Nenê | 19h40 — noite | Um jeep com meio balde de lama no eixo e uma fita VHS sem etiqueta |
| Sede do jornal O Brejinho | 21h20 — noite | O acervo de 1998 e uma fotografia com um rosto raspado |
| Delegacia de Brejinho | 22h05 — noite | O processo 97/4412 e o jeep no pátio dos fundos |
| Torre do caixa-d'água | 23h50 — madrugada | O gravador e a decisão final |

## Como se joga

**Examinar.** Cada ambiente tem pontos clicáveis. Alguns só revelam o que significam
depois que alguém em Brejinho te contou o que procurar — a margem só faz sentido
depois de Dona Zulmira.

**Anotar.** As pistas que importam vão para o caderno. As que não servem para nada
também vão, porque em 1998 foi assim que o caso morreu.

**Confrontar.** No caderno, duas pistas que se contradizem produzem uma dedução
com nome, texto e um suspeito. Oito deduções ao todo. Nem todas são sobre o mesmo
homem.

**Decidir.** Só na torre. Cada escolha final exige as deduções que a sustentam —
as demais ficam visíveis, com o motivo da bloqueio.

## Estrutura

```
.
├── index.html          # todas as telas do jogo
├── css/
│   └── style.css       # atmosfera, cenas, responsivo
├── js/
│   ├── data.js         # roteiro: cenas, pistas, deduções, finais
│   ├── game.js         # motor: navegação, caderno, confronto, progressão
│   └── audio.js        # ambiente sonoro via WebAudio, sem arquivos
└── tests/
    └── fluxo.test.js   # valida o grafo do roteiro (node tests/fluxo.test.js)
```

Sem dependências, sem build. O que está no repositório é o que roda no navegador.
O som é sintetizado em tempo real com WebAudio: um drone grave por ambiente,
vento filtrado e o chiado de rádio que não pega sinal nenhum.

## Verificação

```bash
node tests/fluxo.test.js
```

Confere se toda pista é obtenível, se nenhuma dedução é impossível de montar, se
todo hotspot é alcançável a partir do estado inicial e se os sete finais
desbloqueiam. Também valida referências quebradas e hotspots fora da área clicável.

## Como contribuir

Diretrizes completas em [`AGENTS.md`](./AGENTS.md). Resumindo: **toda alteração deve
ser commitada e enviada para o GitHub.**

```bash
node tests/fluxo.test.js          # rode antes de commitar
git status                        # revise o que mudou
git add <arquivos>
git commit -m "Mensagem curta no imperativo"
git push origin main              # o Pages publica a main
```

## Créditos

Projeto criado por:

- Mariana
- Isabela
- Rhavy
- Pietra
- Antonella