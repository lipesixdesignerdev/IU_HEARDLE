# IU Heardle

Jogo de adivinhação de músicas da IU, com modos diário e treino.

```sh
npm ci
npm test
npm run build
npm run dev
```

O áudio é armazenado com Git LFS. Para reproduzir a aplicação localmente, instale Git LFS e execute `git lfs pull`.

O catálogo revisado está em `catalog/catalog.json` e as capas em `covers/`. Gere o banco com `node generate-db.js`; confira sua sincronização com `node generate-db.js --check`.

Veja [a auditoria das 153 entradas](docs/catalog-audit.md) para as correções, duplicatas, fontes e instruções de importação das novas faixas.
