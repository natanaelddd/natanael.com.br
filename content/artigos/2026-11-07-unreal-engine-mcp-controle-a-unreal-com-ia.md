---
title: Unreal Engine MCP: controle a Unreal conversando com a IA
description: O unreal-engine-mcp conecta Claude, Cursor e Windsurf à Unreal Engine 5.5+ pelo protocolo MCP. Dá para montar cenas, mexer em atores e até criar nós de Blueprint descrevendo o que você quer.
date: 2026-11-07
slug: unreal-engine-mcp-controle-a-unreal-com-ia
tags: [Unreal Engine, IA, MCP, GitHub]
cover: img/artigos/unreal-engine-mcp-controle-a-unreal-com-ia.jpg
repo: https://github.com/flopperam/unreal-engine-mcp
---
O **MCP (Model Context Protocol)** virou o padrão para conectar assistentes de IA a ferramentas externas. Na Unreal Engine, um dos projetos mais ativos nessa frente é o **unreal-engine-mcp**, do Flopperam: um servidor MCP mais um plugin em C++ que deixam o Claude, o Cursor ou o Windsurf controlarem a engine em linguagem natural.

## Como funciona

A arquitetura tem três peças:

1. **O cliente de IA** (Claude Desktop, Cursor ou Windsurf), onde você escreve o pedido.
2. **Um servidor MCP em Python**, que traduz o pedido em comandos.
3. **Um plugin nativo em C++ dentro da Unreal**, que recebe esses comandos por socket TCP e executa no editor.

Ou seja: você pede "cria uma vila medieval com dez casas ao redor de uma praça" e a IA chama as ferramentas que posicionam atores, ajustam transformações e montam a cena.

## O que dá para fazer

- **Construir mundos**: criar e posicionar atores, montar estruturas e cenários a partir de descrições.
- **Controlar atores**: mover, rotacionar, escalar, mudar propriedades.
- **Blueprints por IA**: criar nós de Blueprint, gerenciar grafos, variáveis e funções — o projeto suporta mais de 20 tipos de nó.

Para quem vem do Blueprint, esse último ponto é o mais interessante: dá para pedir a lógica em português e revisar o grafo gerado, em vez de arrastar nó por nó.

## Requisitos e instalação

- Unreal Engine **5.5 ou superior**
- **Python 3.12+**
- Um cliente MCP (Claude Desktop, Cursor ou Windsurf)

O caminho mais simples é clonar o repositório e abrir o `.uproject` que vem nele, com o plugin já instalado. Também dá para copiar o plugin para a pasta `Plugins` do seu próprio projeto.

```bash
git clone https://github.com/flopperam/unreal-engine-mcp.git
cd unreal-engine-mcp/Python
uv run unreal_mcp_server_advanced.py
```

Depois, é adicionar o servidor na configuração MCP do seu cliente, seguindo o guia do README.

## Onde isso ajuda no dia a dia

Em projetos de VR e archviz, boa parte do tempo vai em tarefas repetitivas de editor: espalhar props, organizar atores, montar variações de layout para o cliente aprovar. É exatamente o tipo de trabalho que um agente faz bem — e que libera tempo para o que exige olho humano, como iluminação, conforto em VR e performance no Quest.

## Pontos de atenção

- **Projeto em desenvolvimento ativo**: espere mudanças e alguns comandos instáveis. Use em cópia do projeto ou com controle de versão.
- **Revise antes de salvar**: a IA monta rápido, mas não conhece suas convenções de nome, pastas e níveis.
- **Performance continua sendo sua**: cena montada por IA não é cena otimizada para VR.

## Links

- Repositório: [github.com/flopperam/unreal-engine-mcp](https://github.com/flopperam/unreal-engine-mcp)
- O que é MCP: [modelcontextprotocol.io](https://modelcontextprotocol.io)

Trabalha com Unreal? Me conta no Instagram [@natanaelddd](https://www.instagram.com/natanaelddd/) qual tarefa você entregaria primeiro para a IA.
