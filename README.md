## 📦 Instalação

### Com [npm](https://www.npmjs.com/)

```bash
npm install use-swagger

pnpm add use-swagger

yarn add use-swagger
```

## 🚀 Como Utilizar

Siga os passos abaixo para integrar **use-swagger** em seu projeto e gerar tipos automaticamente a partir de uma URL Swagger.

### Passo 1: Criar uma pasta e arquivo de geração de tipos

1. Crie uma pasta chamada `client` no diretório do seu projeto.
2. Dentro da pasta `client`, crie um arquivo chamado `generate.ts`.

### Passo 2: Configurar `generate.ts`

No arquivo `generate.ts`, adicione o seguinte código:

```javascript
const fs = require("fs");
const { generateSwaggerTypes } = require("use-swagger");

generateSwaggerTypes({
  fs,
  fsPath: "./src/presentation/client/swagger_client.ts",
  swaggerUrl: "https://api-raiox.amazity.com.br/swagger/v1/swagger.json"
});
```

### Passo 3: Configurar o Script de Execução

Para facilitar a geração dos tipos, adicione o seguinte script ao seu `package.json`:

```json
"scripts": {
  "generateSwagger": "node client/generate.ts"
}
```
```bash
npm run generateSwagger
```

### Passo 5: Criar o Cliente

Agora, crie um arquivo chamado `client.ts` na mesma pasta `client` que você criou anteriormente.

### Passo 6: Configurar `client.ts`

No arquivo `client.ts`, adicione o seguinte código:

```typescript
import { createClient } from "use-swagger";

import { Swagger } from "./swagger_client";

export const { client, useSwagger } = createClient<Swagger>({
  fetcher: async ({ url, method, body, headers }) => {
    return fetch(((process.env.api as string) + url), {
      method,
      body: body ? JSON.stringify(body) : undefined,
      headers
    }).then((res) => res.json());
  },
  defaultHeaders: { tenantId: process.env.tenantId || "" },
});
```

## 🛠️ Casos de Uso

Após configurar o cliente, você pode utilizá-lo para fazer requisições à sua API. Abaixo está um exemplo simples de como usar o `client`:

### Exemplo de Uso

```typescript
import { client } from "..."; // ajuste o caminho conforme necessário

const res = await client({
  url: "/HelloWorld", // O endpoint da sua API
  method: "get",      // O método HTTP a ser utilizado (GET, POST, etc.)
  body: {},          // Object Params/RequestBody de acordo com a url selecionada
  headers: { anyHeader: "--" } // Cabeçalhos individuais deste end-point
});
```

## 📡 Usando `useSwagger`

Para fazer requisições usando `useSwagger`, você deve configurá-lo da seguinte forma:

```typescript
const res = useSwagger({
  url: "/Blog/categorias", // O endpoint da sua API
  method: "get",           // O método HTTP a ser utilizado (GET, POST, etc.)
  enableCache: true,       // Ativa o cache para a requisição (Opcional)
  enabled: false,          // Habilita ou desabilita a execução do hook (Opcional)
  interval: 1000 * 60,     // Intervalo em milissegundos para re-fetch (Opcional)
  onError: () => {},       // Função de callback em caso de erro (Opcional)
  queryKey: ["MyCustomKey", param1, param2] // Chave para identificação da consulta (Opcional)
});
```

| Parâmetro     | Tipo       | Descrição                                                                                                   |
|---------------|------------|-------------------------------------------------------------------------------------------------------------|
| `url`         | `string`   | O caminho do endpoint que você deseja acessar. Exemplo: `"/Blog/categorias"`.                             |
| `method`      | `string`   | O método HTTP que será utilizado para a requisição (e.g., `get`, `post`).                                 |                                     |
| `enableCache` | `boolean`  | Ativa o cache para os resultados da requisição, melhorando a performance em chamadas repetidas.            |
| `enabled`     | `boolean`  | Habilita ou desabilita a execução do hook, útil para controlar quando a requisição deve ser feita.         |
| `interval`    | `number`   | Define o intervalo (em milissegundos) entre re-fetches automáticos. O padrão é `1000 * 60` (1 minuto).  |
| `onError`     | `function` | Função que será chamada em caso de erro na requisição. Você pode usar isso para lidar com erros de forma personalizada. |
| `queryKey`    | `array`    | Um array que contém chaves para identificação da consulta e para controle do cache.                         |
