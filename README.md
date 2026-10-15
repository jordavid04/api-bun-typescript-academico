# API com Bun e TypeScript — Versão Detalhada 

Desenvolvido por: Jorge David Bolognesi
Matricula: 2024001052
Disciplina: Desenvolvimento Web II — 2026

Esta segunda versão do README descreve com mais detalhes a tarefa solicitada: manter o código atual, usar o server nativo do Bun em TypeScript, expor rotas de usuário (GET /usuarios e POST /usuarios), implementar um middleware de validação e explicar o fluxo completo (server → rotas → middleware → controller → resposta).

---

## Objetivo da Tarefa

- Pegar o código do projeto (estrutura atual) e implementar uma rota `/usuarios` com suporte a:
  - GET /usuarios — listar usuários
  - POST /usuarios — criar um usuário (validação via middleware)
- Usar o servidor nativo do Bun (Bun.serve) em TypeScript.
- Separar responsabilidades: routes, controllers, middleware e (opcional) conexão com banco.
- Documentar e explicar cada parte do código e o comportamento da API.

---

## Visão Geral do fluxo

1. index.ts importa e inicializa `src/server.ts`.
2. `src/server.ts` configura o servidor Bun e registra as rotas (importadas de `src/routes/usuario.ts`).
3. `src/routes/usuario.ts` define os endpoints e aplica o middleware de validação.
4. `src/middleware/inputTest.ts` valida o corpo da requisição (ex.: nome e email).
5. `src/controllers/usuario.ts` contém a lógica para listar e criar usuários (a persistência pode ser um SQLite, JSON ou memória conforme desejar).
6. `src/database-connect.ts` (opcional) centraliza a conexão com banco de dados.

---

## Explicando o servidor do Bun

Bun traz uma API nativa de HTTP muito simples e performática. O ponto central é Bun.serve, que recebe um objeto com a função `fetch` (handler) ou uma função `fetch` diretamente e configura o servidor:

- Bun.serve é leve, rápido e trabalha bem com handlers padrão (como o `.fetch` de frameworks como Hono).
- Em TypeScript basta exportar um `app.fetch` (ex.: Hono) ou fornecer sua própria função que recebe (request) e retorna Response.
- Porta padrão escolhida aqui: 3000 (pode ser alterada).

Exemplo conceitual:
- Bun.serve({ fetch: app.fetch, port: 3000 })

No projeto proposto usaremos Hono (já aparece no package.json) para facilitar roteamento e middleware, mas tudo roda sobre o Bun.

---

## Estrutura de arquivos (sugerida)

```
src/
├── server.ts
├── routes/
│   └── usuario.ts
├── controllers/
│   └── usuario.ts
├── middleware/
│   └── inputTest.ts
└── database-connect.ts
index.ts
```

---

## Como rodar (mínimo)

1. Instale dependências:
```bash
bun install
```

2. Execute:
```bash
bun run index.ts
```

A API estará disponível em http://localhost:3000/usuarios
