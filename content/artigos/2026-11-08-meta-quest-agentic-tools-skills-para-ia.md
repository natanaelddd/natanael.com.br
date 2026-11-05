---
title: Meta Quest Agentic Tools: skills oficiais para a IA desenvolver para o Quest
description: A Meta publicou no GitHub um pacote de skills e um servidor MCP que ensinam agentes de IA a criar, depurar e publicar apps para Meta Quest e Horizon OS — com suporte a Unity, Unreal, WebXR e Android.
date: 2026-11-08
slug: meta-quest-agentic-tools-skills-para-ia
tags: [Meta Quest, IA, Realidade Virtual, GitHub]
cover: img/artigos/meta-quest-agentic-tools-skills-para-ia.jpg
repo: https://github.com/meta-quest/agentic-tools
---
Quem desenvolve para o Quest conhece o ritual: documentação espalhada, comandos ADB de cabeça, trace de performance difícil de ler e uma lista de requisitos para a loja. O repositório **meta-quest/agentic-tools** é a resposta oficial da Meta para colocar a IA no meio desse processo.

## O que vem no pacote

O repositório junta duas coisas:

**1. Skills** — instruções estruturadas que ensinam o seu agente a executar fluxos específicos do Quest, com conhecimento destilado da documentação da Meta e de engenheiros que já resolveram os problemas mais comuns. Alguns exemplos:

- **hz-new-project-creation**: cria um projeto novo para Unity, Unreal, WebXR ou Android/Spatial SDK.
- **hz-vr-debug**: diagnóstico de apps VR e MR com logs, screenshots e inspeção do app.
- **hz-perfetto-debug**: análise de performance com traces do Perfetto — tempo de frame, gargalo de CPU/GPU, temperatura.
- **hz-unity-code-review**: revisão de código Unity focada em armadilhas de VR.
- **hz-store-submit**: guia de envio para a Meta Horizon Store, incluindo validação de build e requisitos VRC.

**2. Meta VR CLI** (antes chamada Horizon Debug Bridge, `hzdb`) — uma CLI com servidor MCP que dá ao agente acesso direto ao headset conectado: logs em tempo real, screenshots, gerenciamento de apps, busca na documentação e até busca de modelos 3D na biblioteca de assets da Meta por descrição em texto.

## Com quais ferramentas funciona

As skills seguem o formato aberto de Agent Skills e funcionam em mais de uma dúzia de ferramentas, incluindo **Claude Code, Cursor, GitHub Copilot e Gemini CLI**. A instalação é feita pelo suporte nativo a skills de cada ferramenta ou por gerenciadores como o `npx skills`. O README do repositório tem o passo a passo de cada uma.

## Por que vale a pena para quem usa Unreal

A skill de criação de projeto já cobre Unreal, e a parte de depuração e performance é independente de engine: logcat, screenshots e traces funcionam igual para um build feito na Unreal.

Na prática, o ganho maior está no fim do projeto, que é onde mais se perde tempo:

- descobrir por que o app trava ou cai de frame só no headset;
- conferir requisitos da loja antes de submeter;
- repetir testes de build sem ficar decorando comando.

Para quem publica na Horizon Store, a skill de submissão sozinha já evita idas e vindas com a revisão.

## Pontos de atenção

- **O headset precisa estar em modo desenvolvedor** e conectado para as ferramentas de dispositivo funcionarem.
- **Skills não substituem teste real**: conforto, escala e interação continuam exigindo alguém com o Quest na cabeça.
- **Confira a documentação atual**: a própria Meta incluiu uma skill que obriga o agente a verificar a documentação antes de responder, porque as APIs mudam rápido.

## Links

- Repositório: [github.com/meta-quest/agentic-tools](https://github.com/meta-quest/agentic-tools)
- Visão geral das ferramentas de IA da Meta: [developers.meta.com](https://developers.meta.com/horizon/essentials/ai-tooling-overview/)

Desenvolve para Quest? Me segue no Instagram [@natanaelddd](https://www.instagram.com/natanaelddd/) para mais ferramentas assim.
