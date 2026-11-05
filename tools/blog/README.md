# Blog + Instagram — fluxo diário

Tema fixo: **repositórios do GitHub e novidades de Realidade Virtual/Mista, Unreal Engine e IA**, em português, para devs e criadores no Brasil.

## Estrutura

| Caminho | O que é |
|---|---|
| `content/artigos/AAAA-MM-DD-slug.md` | Artigo em Markdown com frontmatter |
| `content/social/slug.json` | Roteiro do carrossel + legenda do Instagram |
| `img/arte3d/slug.jpg` | Arte 3D do mascote (Magnific, 4:5) |
| `img/artigos/slug.jpg` | Capa do blog / og:image (gerada) |
| `social/slug/01.jpg…` | Slides do carrossel 1080×1350 (gerados) |
| `artigos/slug/index.html` | Página publicada (gerada) |
| `blog.html`, `sitemap.xml`, `feed.xml`, `artigos/index.json` | Gerados pelo build |

## Publicar um artigo novo

1. Escreva `content/artigos/AAAA-MM-DD-slug.md`:

```markdown
---
title: Título do artigo
description: Uma ou duas frases para SEO e para o card do blog.
date: 2026-11-12
slug: slug-do-artigo
tags: [Unreal Engine, IA, GitHub]
cover: img/artigos/slug-do-artigo.jpg
repo: https://github.com/dono/repo
---
Texto em Markdown (## títulos, listas, `código`, blocos ```, links, **negrito**).
```

2. Gere a arte 3D em `img/arte3d/slug.jpg` (4:5). Sempre o **mesmo mascote** (robô branco de massinha com detalhes amarelos #FFD900 e headset VR preto, `img/arte3d/mascote.jpg`), em cena ligada ao tema, fundo cinza claro liso, personagem na metade de baixo, sem texto e sem logos.
3. Escreva `content/social/slug.json` (veja os existentes: `kicker`, `title`, `highlight`, `repo`, 4 `slides`, `caption`, `post_date`, `hero`).
4. Gere as imagens e o site:

```bash
python3 tools/blog/compose.py content/social/slug.json
node tools/blog/build.mjs
```

5. Commit e push na `main` (a Vercel publica sozinha).

## Regras

- Artigos com `date` no futuro ficam guardados e só aparecem quando o build roda nessa data. `draft: true` esconde.
- Só afirme o que estiver confirmado em fonte (README do repo, anúncio oficial, imprensa técnica). Sem número de estrelas inventado; se a licença for ambígua, mande conferir.
- Sem logos de marcas nas artes geradas.
- Legenda: gancho na 1ª linha, 3–6 linhas de valor, "📌 Salva", "🔗 link na bio", pergunta para comentário, 10–12 hashtags, sempre `#upvr`.
