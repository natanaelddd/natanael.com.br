---
title: A Meta ensinou a IA a criar VR no navegador: conheça o Immersive Web SDK
description: O IWSDK é o framework open source da Meta para criar Realidade Virtual em WebXR. Agora ele vem pronto para agentes de IA como Claude Code, Cursor e Copilot escreverem, testarem e corrigirem a experiência sozinhos.
date: 2026-11-05
slug: meta-iwsdk-ia-cria-vr-no-navegador
tags: [WebXR, Realidade Virtual, IA, Meta Quest]
cover: img/artigos/meta-iwsdk-ia-cria-vr-no-navegador.jpg
repo: https://iwsdk.dev
---
Criar uma experiência de Realidade Virtual sempre teve um custo alto de entrada: engine pesada, build demorado, deploy em loja, teste com o headset na cabeça. O **Immersive Web SDK (IWSDK)** da Meta ataca esse problema por dois lados ao mesmo tempo: roda direto no navegador, via WebXR, e agora foi pensado para ser operado por agentes de IA.

## O que é o IWSDK

O IWSDK é o framework open source (licença MIT) que a Meta lançou no Connect de 2025 para construir VR na web. Ele resolve as partes chatas de qualquer projeto imersivo — física, hand tracking, locomoção, interações de pegar objetos e interface espacial — para você focar na ideia.

Por baixo, ele usa **Three.js** com uma arquitetura **ECS** (Entity Component System) e ferramentas baseadas em **Vite**, com hot reload instantâneo. Como tudo roda no navegador, não existe aquela etapa longa de compilação: salvou, recarregou, viu.

## A novidade: o "agentic loop"

Em 2026 a Meta adicionou ao IWSDK um fluxo de trabalho feito para agentes de IA. A ideia não é só gerar código: o agente **escreve, recarrega a página, observa o resultado por screenshot e console, consulta o estado da cena e corrige** — em ciclo, sem você no meio de cada passo.

Para isso, um projeto novo já vem configurado com:

- um **servidor RAG** que indexa o código do IWSDK, para o agente consultar funções e padrões reais em vez de inventar API;
- um **servidor MCP** que expõe ferramentas para o agente enxergar e manipular a cena ao vivo;
- integração pronta com **Claude Code, Cursor, GitHub Copilot e Codex**.

O exemplo que a Meta usou para provar o conceito chama atenção: o **Project Flowerbed**, uma experiência de jardinagem em VR de 2022 que tinha dezenas de milhares de linhas de código, foi reconstruído do zero em cerca de **15 horas** usando o fluxo com IA e os assets de arte originais.

## Como começar

Você precisa de Node.js 20+, Chrome ou Edge e uma ferramenta de IA para código. O headset (Quest 3, 3S ou Pro) é recomendado para testar no dispositivo, mas não é obrigatório para começar — dá para desenvolver inteiro no desktop.

```bash
npm create @iwsdk
```

O comando cria o projeto e pergunta qual assistente de IA você usa, já deixando tudo configurado. Depois é abrir a pasta no seu agente e descrever o que quer construir.

Quando estiver pronto, o deploy é o de qualquer site estático: **Vercel, Netlify ou GitHub Pages**. Quem tiver o link abre a experiência no navegador do Quest, sem loja e sem instalação.

## Por que isso importa para quem trabalha com VR

Para quem faz projetos imersivos sob demanda — estandes de feira, tours virtuais, treinamentos, ativações de marca — o WebXR resolve um problema comercial real: **distribuição**. Mandar um link é muito mais simples do que publicar um app ou instalar APK em dezenas de headsets.

O IWSDK não substitui a Unreal Engine em projetos que pedem gráfico de ponta, mas é uma excelente opção para:

- protótipos rápidos para validar uma ideia com o cliente;
- experiências leves de marketing que precisam ser abertas por muita gente;
- demos interativas que vivem dentro de um site.

E o fluxo com IA muda a conta de horas: o tipo de ajuste que antes exigia um dev ("isso está rápido demais", "aproxima esses objetos") passa a ser descrito em linguagem natural.

## Pontos de atenção

- **Performance ainda é navegador.** Cenas pesadas, com muitos polígonos e efeitos, vão sofrer mais do que num app nativo.
- **Revise o que a IA faz.** O ciclo de teste automatizado ajuda muito, mas a decisão de produto e a qualidade da experiência continuam sendo suas.
- **Teste no headset antes de entregar.** Conforto, escala e legibilidade de texto só se avaliam com o Quest na cabeça.

## Links

- Documentação e início rápido: [iwsdk.dev](https://iwsdk.dev)
- Anúncio da Meta: [Accelerate VR Development with AI & Immersive Web SDK](https://developers.meta.com/horizon/blog/accelerate-vr-development-with-ai-and-immersive-web-sdk/)

Trabalha com VR e quer testar isso num projeto real? Me chama no Instagram [@natanaelddd](https://www.instagram.com/natanaelddd/).
