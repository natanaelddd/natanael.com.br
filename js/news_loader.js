document.addEventListener("DOMContentLoaded", function() {
    console.log("Iniciando carregamento de notícias estáticas");
    const newsContainer = document.getElementById("rss-feed-container-dayos");
    
    if (!newsContainer) {
        console.error("Erro: Container de notícias (rss-feed-container-dayos) não encontrado.");
        return;
    }

    // Dados de notícias estáticos para evitar problemas de CORS/fetch
    const newsData = [
        {
            "source": "TechTudo",
            "title": "Dicas de leituras? Esses 5 sites vão te ajudar a escolher próximo livro",
            "link": "https://www.techtudo.com.br/stories/2025/05/16/quer-dica-de-leitura-esses-5-sites-vao-ajudar-a-escolher-proximo-livro-edsoftwares.ghtml",
            "description": "Descubra plataformas que recomendam livros baseados em seus gostos e preferências de leitura.",
            "image_url": "https://s2-techtudo.glbimg.com/XxxMB4KgPKO6LUm_XC_4navaZAw=/i.s3.glbimg.com/v1/AUTH_08fbf48bc0524877943fe86e43087e7a/internal_photos/bs/2025/Z/3/l6A543Sgep9Bz4t2G8QA/pexels-fotios-photos-3806168.jpg",
            "date": "Fri, 16 May 2025 12:15:33 -0000"
        },
        {
            "source": "TechTudo",
            "title": "Cafeteira, air fryer, panela elétrica e mais: quanto cada um gasta de luz?",
            "link": "https://www.techtudo.com.br/guia/2025/05/cafeteira-air-fryer-panela-eletrica-e-mais-quanto-cada-um-gasta-de-luz-lb.ghtml",
            "description": "Para conseguir controlar os gastos com a conta de luz, é preciso saber calcular quanto de energia os eletrodomésticos usam; veja a fórmula e dicas para economizar.",
            "image_url": "https://s2-techtudo.glbimg.com/On0V2PTYJfSrMn1MksqPHtBcpZs=/i.s3.glbimg.com/v1/AUTH_08fbf48bc0524877943fe86e43087e7a/internal_photos/bs/2025/a/a/Mw2HNFTomW9ujVajomEg/novo-projeto-1-.jpg",
            "date": "Fri, 16 May 2025 11:06:19 -0000"
        },
        {
            "source": "TechTudo",
            "title": "Melhor lava e seca: 6 modelos para comprar em 2025",
            "link": "https://www.techtudo.com.br/listas/2025/05/melhor-lava-e-seca-lb.ghtml",
            "description": "Lista inclui modelos com capacidade entre 10,1 kg e 13 kg, produzidos por fabricantes como Samsung, Electrolux e LG; valores começam em R$ 3.149.",
            "image_url": "https://s2-techtudo.glbimg.com/w5GKXz2Qq8mk7hHBTfefF8fMXa8=/i.s3.glbimg.com/v1/AUTH_08fbf48bc0524877943fe86e43087e7a/internal_photos/bs/2024/D/T/GBtHqrRQ2FX2znv8VC2w/marca-d-agua-1-copiar.jpg",
            "date": "Fri, 16 May 2025 10:20:19 -0000"
        },
        {
            "source": "TechTudo",
            "title": "Você usava 'rs' para rir na Internet? Hoje ele virou outra coisa nas redes",
            "link": "https://www.techtudo.com.br/listas/2025/05/voce-usava-rs-para-rir-na-internet-hoje-ele-virou-outra-coisa-nas-redes-edsoftwares.ghtml",
            "description": "De risada sincera a expressão de ironia: veja linha do tempo e entenda como o 'rsrsrs' deixou de ser só um riso, adquirindo significados diversos na internet brasileira.",
            "image_url": "https://s2-techtudo.glbimg.com/w38ngkBvOdbqEzEsYbRjXu_uziY=/i.s3.glbimg.com/v1/AUTH_08fbf48bc0524877943fe86e43087e7a/internal_photos/bs/2024/j/n/YEYMpLQP67FG0pysZvqA/techtudo-75-m.jpg",
            "date": "Fri, 16 May 2025 08:02:08 -0000"
        },
        {
            "source": "TechTudo",
            "title": "Samsung: veja 5 formas de liberar espaço no seu celular sem perder NADA",
            "link": "https://www.techtudo.com.br/listas/2025/05/samsung-veja-5-formas-de-liberar-espaco-no-seu-celular-sem-perder-nada-edapps.ghtml",
            "description": "Armazenamento cheio? Veja truques para limpar seu celular Samsung sem perder arquivos importantes; dicas incluem desinstalar apps esquecidos e remover itens duplicados.",
            "image_url": "https://s2-techtudo.glbimg.com/VgVbMf5KbzjbjSzGP0Qat3t-6HM=/i.s3.glbimg.com/v1/AUTH_08fbf48bc0524877943fe86e43087e7a/internal_photos/bs/2025/7/P/lAy67gSWeyYk4T232qeA/galaxy-s25-ultra-2.jpg",
            "date": "Fri, 16 May 2025 08:02:05 -0000"
        }
    ];

    console.log("Processando dados de notícias estáticos");
    newsContainer.innerHTML = ""; // Limpa qualquer conteúdo anterior
    
    let mainHighlightHTML = "";
    let secondaryCardsHTML = '<div class="g1-secondary-grid-dayos">';

    newsData.forEach((item, index) => {
        const title = item.title || "Sem título";
        const link = item.link || "#";
        const description = item.description || "Sem descrição.";
        const source = item.source || "Fonte desconhecida";
        const imageUrl = item.image_url || null;
        
        let pubDate = "";
        if (item.date) {
            try {
                pubDate = new Date(item.date).toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" });
            } catch (e) {
                console.warn(`Erro ao formatar data: ${item.date}`);
                pubDate = "Data não disponível";
            }
        }

        const imagePlaceholder = 
            `<div class="g1-image-placeholder-dayos">` +
            `  <svg viewBox="0 0 24 24"><path fill="currentColor" d="M21,3H3C1.89,3 1,3.89 1,5V19A2,2 0 0,0 3,21H21A2,2 0 0,0 23,19V5A2,2 0 0,0 21,3M5,17L8.5,12.5L11,15.5L14.5,11L19,17H5Z" /></svg>` +
            `</div>`;
        
        const imageElement = imageUrl ? 
            `<img src="${imageUrl}" alt="${title.substring(0,50)}" class="g1-item-image-dayos" onerror="this.style.display='none'; this.parentNode.querySelector('.g1-image-placeholder-dayos').style.display='flex';">` : 
            '';

        if (index === 0) { // Notícia Principal
            const shortDescription = description.substring(0, 120) + (description.length > 120 ? "..." : "");
            mainHighlightHTML = 
                `<article class="g1-main-highlight-dayos">` +
                `  <a href="${link}" target="_blank" rel="noopener noreferrer" class="g1-main-highlight-link-dayos">` +
                `    <div class="g1-main-highlight-image-container-dayos">` +
                `      ${imageUrl ? imageElement : ''}` +
                `      ${imagePlaceholder}` +
                `    </div>` +
                `    <div class="g1-main-highlight-content-dayos">` +
                `      <span class="g1-item-source-dayos">${source}</span>` +
                `      <h3 class="g1-main-highlight-title-dayos">${title}</h3>` +
                `      <p class="g1-main-highlight-description-dayos">${shortDescription}</p>` +
                `      <span class="g1-item-date-dayos">${pubDate}</span>` +
                `    </div>` +
                `  </a>` +
                `</article>`;
        } else { // Notícias Secundárias
            const cardDescription = description.substring(0, 80) + (description.length > 80 ? "..." : "");
            secondaryCardsHTML += 
                `<article class="g1-secondary-card-dayos">` +
                `  <a href="${link}" target="_blank" rel="noopener noreferrer" class="g1-secondary-card-link-dayos">` +
                `    <div class="g1-secondary-card-image-container-dayos">` +
                `      ${imageUrl ? imageElement : ''}` +
                `      ${imagePlaceholder}` +
                `    </div>` +
                `    <div class="g1-secondary-card-content-dayos">` +
                `      <span class="g1-item-source-dayos">${source}</span>` +
                `      <h4 class="g1-secondary-card-title-dayos">${title}</h4>` +
                `      <p class="g1-secondary-card-description-dayos">${cardDescription}</p>` +
                `      <span class="g1-item-date-dayos">${pubDate}</span>` +
                `    </div>` +
                `  </a>` +
                `</article>`;
        }
    });

    secondaryCardsHTML += "</div>"; // Fecha g1-secondary-grid-dayos
    newsContainer.innerHTML = mainHighlightHTML + secondaryCardsHTML;
    console.log(`Exibidas ${newsData.length} notícias estáticas.`);

    // Ajustar exibição dos placeholders de imagem
    document.querySelectorAll('.g1-item-image-dayos').forEach(img => {
        const placeholder = img.parentNode.querySelector('.g1-image-placeholder-dayos');
        if (placeholder) {
            placeholder.style.display = 'none';
            
            img.addEventListener('error', function() {
                this.style.display = 'none';
                placeholder.style.display = 'flex';
            });
            
            img.addEventListener('load', function() {
                placeholder.style.display = 'none';
            });
        }
    });
});
