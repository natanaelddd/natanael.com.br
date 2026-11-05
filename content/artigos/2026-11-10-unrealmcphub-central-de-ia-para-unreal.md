---
title: UnrealMCPHub: a IA compila, abre e recupera a Unreal sozinha
description: O UnrealMCPHub é uma central MCP que fica fora do editor da Unreal. Ele configura o projeto, compila, abre o editor, detecta crash e reinicia — para o agente de IA nunca perder a conexão com a engine.
date: 2026-11-10
slug: unrealmcphub-central-de-ia-para-unreal
tags: [Unreal Engine, IA, MCP, GitHub]
cover: img/artigos/unrealmcphub-central-de-ia-para-unreal.jpg
repo: https://github.com/blackplume233/UnrealMCPHub
---
Quem já tentou usar IA com a Unreal pelo protocolo MCP esbarra sempre no mesmo problema: o servidor roda **dentro** do editor. Se a Unreal não está aberta, ou se ela cai, o agente fica cego. O **UnrealMCPHub** resolve isso ficando do lado de fora.

## Como funciona

São duas peças:

- **RemoteMCP**: um plugin que roda dentro do editor e expõe ferramentas em seis áreas — level, Blueprint, UMG, grafos de edição, Behavior Tree e Slate — além de execução de Python dentro da Unreal.
- **UnrealMCPHub**: roda fora do editor e funciona como ponto único de contato do agente. Ele encaminha as chamadas para o RemoteMCP e cuida de tudo que acontece em volta.

O agente só precisa conhecer o Hub. Ele nunca fala direto com a Unreal.

## O que o Hub faz

- **Configura o projeto** uma vez, a partir do `.uproject`, e detecta a engine instalada.
- **Instala o plugin RemoteMCP** no projeto.
- **Compila** pelo Unreal Build Tool, mesmo com o editor fechado.
- **Abre o editor** e espera o MCP ficar pronto.
- **Detecta crash**, busca o relatório e reinicia o editor.
- **Trabalha com várias instâncias** da Unreal ao mesmo tempo.
- **Guarda notas de sessão**, para o agente retomar o contexto depois de um crash.

## Instalação

Precisa de Python 3.11+ e Unreal Engine 5.x. A forma mais rápida é usar o `uvx`, que baixa e executa sem instalação manual:

```json
{
  "mcpServers": {
    "unrealhub": {
      "command": "uvx",
      "args": ["unrealhub", "serve"]
    }
  }
}
```

Também dá para instalar com `pip install unrealhub` ou baixar o executável pronto nas releases do GitHub. Pela linha de comando:

```bash
unrealhub setup C:/Projetos/MeuJogo/MeuJogo.uproject
unrealhub compile
unrealhub launch
```

## Onde ele faz diferença

O ganho é em **autonomia**. Sem o Hub, cada crash da Unreal interrompe o trabalho e exige que você reabra o editor e reconecte o agente. Com ele, o agente segue o fluxo: compila, abre, testa, e se cair, lê o relatório de crash e tenta de novo.

Para projetos grandes de VR, em que compilar e abrir o editor leva minutos, isso transforma a IA de "assistente que precisa de babá" em algo que roda uma tarefa longa sozinho.

## Pontos de atenção

- **Projeto jovem**: teste em uma cópia do projeto e mantenha tudo no controle de versão.
- **Dá acesso real à engine**: o agente pode compilar e executar Python no editor. Revise o que ele faz antes de aprovar.
- **Licença MIT**, então dá para usar e adaptar livremente.

## Links

- UnrealMCPHub: [github.com/blackplume233/UnrealMCPHub](https://github.com/blackplume233/UnrealMCPHub)
- Plugin RemoteMCP: [github.com/blackplume233/UnrealRemoteMCP](https://github.com/blackplume233/UnrealRemoteMCP)

Usa IA com Unreal? Me chama no Instagram [@natanaelddd](https://www.instagram.com/natanaelddd/) e conta o seu setup.
