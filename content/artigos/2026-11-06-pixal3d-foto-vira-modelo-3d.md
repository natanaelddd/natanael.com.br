---
title: Pixal3D: uma única foto vira um modelo 3D com textura PBR
description: Apresentado no SIGGRAPH 2026, o Pixal3D gera modelos 3D de alta fidelidade a partir de uma imagem, com código no GitHub e demo no navegador. Veja como funciona e onde ele entra num pipeline de Unreal e VR.
date: 2026-11-06
slug: pixal3d-foto-vira-modelo-3d
tags: [IA, 3D, GitHub, Unreal Engine]
cover: img/artigos/pixal3d-foto-vira-modelo-3d.jpg
repo: https://github.com/TencentARC/Pixal3D
---
Gerar um modelo 3D a partir de uma foto já não é novidade. O que mudou em 2026 foi a **fidelidade**: o **Pixal3D**, da Universidade Tsinghua com o Tencent ARC Lab, foi aceito no SIGGRAPH 2026 e entrega resultados que chegam perto de uma reconstrução, mantendo a forma e os detalhes da imagem de entrada.

## O que o Pixal3D faz de diferente

A maioria dos modelos de imagem para 3D "injeta" as informações da foto de forma solta, via atenção. O resultado costuma ser um objeto que lembra a imagem, mas não respeita bem as proporções nem os detalhes.

O Pixal3D faz o contrário: ele **projeta os pixels da imagem de volta para o espaço 3D**, criando uma correspondência direta entre o que está na foto e o volume gerado. Daí o nome, geração *pixel-aligned*. Na prática, o modelo final fica muito mais fiel ao que você mostrou.

Ele é construído sobre o **TRELLIS.2**, o modelo open source de imagem para 3D da Microsoft, e a saída é um arquivo **GLB com materiais PBR** — pronto para levar para engine.

## Como testar

O jeito mais rápido é a demo no Hugging Face, que roda no navegador sem instalar nada (o link está no README do repositório).

Para rodar localmente, o caminho é:

1. Instalar o ambiente do TRELLIS.2, seguindo o guia oficial dele.
2. Clonar o Pixal3D e instalar as dependências extras.
3. Rodar a inferência:

```bash
pip install -r requirements.txt
python inference.py --image minha_foto.png --output ./modelo.glb
```

Há também uma interface web com `python app.py` e um modo de pouca VRAM para placas mais modestas. Se você usa ComfyUI, a comunidade já tem integração.

## Onde isso entra num pipeline de Unreal e VR

Para quem produz experiências imersivas, o gargalo raramente é a engine — é **conteúdo**. Alguns usos práticos:

- **Props de cenário**: objetos de fundo para tours virtuais e ambientes de VR, onde ninguém vai inspecionar a topologia de perto.
- **Prototipagem rápida**: mostrar ao cliente como um ambiente vai ficar antes de investir em modelagem final.
- **Produtos para ativações de marca**: a partir de fotos do produto, gerar uma primeira versão 3D para AR ou VR.

O fluxo é simples: gerar o GLB, importar na Unreal (ou converter para FBX), conferir escala e pivô, e otimizar a malha conforme o alvo. Para VR no Quest, quase sempre vai precisar de **redução de polígonos e reprojeção de texturas** antes de entrar em produção.

## Pontos de atenção

- **Licença**: confira o arquivo LICENSE do repositório e o cartão do modelo no Hugging Face antes de qualquer uso comercial. Há restrições regionais nos pesos.
- **Hardware**: o modelo é pesado. Sem uma GPU com bastante VRAM, a demo online ou serviços na nuvem são o caminho.
- **Não é modelagem final**: para personagem principal ou produto em close, ainda vale passar por um artista 3D.

## Links

- Repositório: [github.com/TencentARC/Pixal3D](https://github.com/TencentARC/Pixal3D)
- Base do projeto: [TRELLIS.2 (Microsoft)](https://microsoft.github.io/TRELLIS.2)

Quer ver esse tipo de ferramenta aplicada em projetos de VR? Acompanhe no Instagram [@natanaelddd](https://www.instagram.com/natanaelddd/).
