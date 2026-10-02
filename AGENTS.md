# AGENTS.md

Diretrizes para agentes de IA e colaboradores deste repositório.

## Regra principal: todo alteração deve ser commitada e pushada

**Toda alteração feita neste repositório deve ser commitada e enviada para o GitHub. Não deixe trabalho não commitado no working tree.**

Antes de finalizar qualquer tarefa:

1. Verifique o estado do repositório:
   ```bash
   git status
   ```
2. Revise as mudanças:
   ```bash
   git diff
   git diff --staged
   ```
3. Adicione apenas os arquivos intencionais (nunca segure segredos, chaves ou credenciais):
   ```bash
   git add <arquivos>
   ```
4. Faça o commit com uma mensagem curta e descritiva, seguindo o estilo das mensagens existentes:
   ```bash
   git commit -m "Mensagem curta no imperativo"
   ```
5. Envie para o repositório remoto:
   ```bash
   git push origin main
   ```

### Regras adicionais

- Nunca faça `git commit` a menos que a alteração seja parte da tarefa em andamento.
- Nunca use `git commit --amend`, `--no-verify`, `--force` ou `push --force` sem pedido explícito.
- Não commite `.env`, chaves de API, senhas ou qualquer segredo.
- Se uma tarefa exigir deploy, o conteúdo só está no ar depois do `push` — o GitHub Pages publica a branch `main`.

## Publicação

- Branch principal: `main`
- GitHub Pages: https://larandreluizinfo.github.io/mirpa_lar_261002/