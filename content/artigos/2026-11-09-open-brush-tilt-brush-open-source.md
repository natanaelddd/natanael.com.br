---
title: Open Brush: o Tilt Brush continua vivo, gratuito e open source
description: Depois que o Google abriu o código do Tilt Brush, a comunidade criou o Open Brush. Hoje ele roda no Quest e no SteamVR, tem multiplayer, passthrough e exporta para FBX, glTF e USD.
date: 2026-11-09
slug: open-brush-tilt-brush-open-source
tags: [Realidade Virtual, Open Source, 3D, GitHub]
cover: img/artigos/open-brush-tilt-brush-open-source.jpg
repo: https://github.com/icosa-foundation/open-brush
---
O **Tilt Brush** foi um dos apps que mais venderam a ideia de Realidade Virtual: pintar no ar, em 3D, com o controle como pincel. Quando o Google parou de desenvolver o app, em 2021, ele abriu o código. A comunidade pegou esse código e criou o **Open Brush**, mantido hoje pela **Icosa Foundation**, uma organização sem fins lucrativos.

## O que o Open Brush tem hoje

O projeto não ficou parado no que o Tilt Brush era. Entre os recursos adicionados ao longo das versões:

- **Multiplayer**: pintar junto com outras pessoas, inclusive entre Quest e SteamVR.
- **Passthrough no Quest**: ver o ambiente real enquanto pinta, transformando o app em uma ferramenta de Realidade Mista.
- **Suporte ao MX Ink**, a caneta de Realidade Mista da Logitech para o Quest.
- **Importação de modelos** e arquivos .vox (MagicaVoxel).
- **Exportação para FBX, glTF e USD**, o que leva os desenhos para Blender, Unreal e outras ferramentas.
- **Publicação** no Icosa Gallery e no VIVERSE.

## Onde baixar

O app é gratuito para **Meta Quest** e para headsets compatíveis com **SteamVR**. Quem quer as novidades antes do lançamento oficial encontra builds automáticos na página de releases do GitHub.

## Por que um repositório de app de pintura importa para devs

O código é **Unity/C#** e está aberto. Isso faz do Open Brush uma referência rara: um app de VR real, maduro e publicado, cujo código você pode estudar inteiro. Alguns pontos que valem a leitura:

- como o app gera e renderiza traços em tempo real sem derrubar o frame rate;
- organização de interface espacial com painéis e ferramentas;
- a camada de multiplayer e a de exportação de formatos 3D.

E, para quem trabalha com conteúdo, ele é útil no dia a dia: esboçar volumes e composição de um ambiente em escala real, direto no headset, antes de modelar na engine.

## Ideias de uso em projetos

- **Concept em escala 1:1** para estandes, cenários e espaços que depois serão montados na Unreal.
- **Ativações de marca** com o público pintando em VR, com passthrough para manter a pessoa consciente do espaço.
- **Aulas e oficinas**: introdução à VR e ao pensamento espacial, sem barreira técnica.

## Links

- Repositório: [github.com/icosa-foundation/open-brush](https://github.com/icosa-foundation/open-brush)
- Documentação: [docs.openbrush.app](https://docs.openbrush.app)

Já pintou em VR? Me conta no Instagram [@natanaelddd](https://www.instagram.com/natanaelddd/).
