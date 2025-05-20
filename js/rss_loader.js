// Script para carregar e exibir feeds RSS na secção "Descomplicando o Digital" com layout inspirado no G1, usando rss2json.com

document.addEventListener("DOMContentLoaded", function() {
    console.log("Iniciando carregamento do feed RSS para Descomplicando o Digital (Estilo G1 via rss2json).");
    const feedContainer = document.getElementById("rss-feed-container-dayos");
    const originalRssUrl = "https://reporterbrasil.org.br/feed/"; // Feed de teste aberto
    // Usar rss2json.com para converter RSS para JSON e contornar CORS/parsing issues
    const rss2jsonApiKey = ""; // Se precisar de uma API Key, adicione aqui. Para muitos feeds públicos, não é necessário.
    const fetchUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(originalRssUrl)}${rss2jsonApiKey ? `&api_key=${rss2jsonApiKey}` : ""}`;

    if (!feedContainer) {
        console.error("Erro: Container do feed RSS (rss-feed-container-dayos) não encontrado.");
        return;
    }

    feedContainer.innerHTML = 
        '<div class="g1-loading-dayos">' +
        '  <div class="g1-spinner-dayos"></div>' +
        '  <p>A carregar notícias...</p>' +
        '</div>';
    console.log(`A tentar carregar feed de: ${fetchUrl} (via rss2json)`);

    fetch(fetchUrl)
        .then(response => {
            console.log(`Resposta do fetch (rss2json) recebida. Status: ${response.status}`);
            if (!response.ok) {
                throw new Error(`Erro HTTP! status: ${response.status} ao aceder ao feed via rss2json.`);
            }
            return response.json(); // Espera-se uma resposta JSON
        })
        .then(data => {
            console.log("Feed JSON (de rss2json) recebido e parseado com sucesso.", data);
            feedContainer.innerHTML = ""; // Limpa a mensagem de "a carregar"
            
            if (data.status !== "ok" || !data.items || data.items.length === 0) {
                console.log("Nenhum item encontrado no feed RSS via rss2json ou erro na resposta.", data);
                feedContainer.innerHTML = 
                    '<div class="g1-error-dayos">' +
                    '  <p>Nenhuma notícia encontrada no momento. (Fonte: rss2json)</p>' +
                    '</div>';
                return;
            }

            const items = data.items.slice(0, 5); // Limitar a 5 notícias
            let mainHighlightHTML = "";
            let secondaryCardsHTML = '<div class="g1-secondary-grid-dayos">
';

            items.forEach((item, index) => {
                const title = item.title || "Sem título";
                const link = item.link || "#";
                let description = item.description || "Sem descrição.";
                // rss2json já costuma fornecer a descrição limpa de HTML, mas vamos garantir
                const tempDiv = document.createElement("div");
                tempDiv.innerHTML = description;
                description = (tempDiv.textContent || tempDiv.innerText || "").trim();
                
                let pubDate = "";
                if (item.pubDate) {
                    try {
                        pubDate = new Date(item.pubDate).toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" });
                    } catch (e) {
                        console.warn(`Erro ao formatar data: ${item.pubDate}`);
                        pubDate = "Data não disponível";
                    }
                }

                let imageUrl = null;
                // rss2json pode fornecer a imagem em item.thumbnail ou item.enclosure.link
                if (item.thumbnail && typeof item.thumbnail === 'string' && item.thumbnail.startsWith('http')) {
                    imageUrl = item.thumbnail;
                } else if (item.enclosure && item.enclosure.link && item.enclosure.type && item.enclosure.type.startsWith("image")) {
                    imageUrl = item.enclosure.link;
                } else {
                    // Fallback: tentar extrair de description se ainda não tiver imagem
                    const imgMatch = description.match(/<img[^>]+src=[""]([^""]+)[""][^>]*>/i);
                    if (imgMatch && imgMatch[1]) {
                        imageUrl = imgMatch[1];
                    }
                }

                const imagePlaceholder = 
                    `<div class="g1-image-placeholder-dayos">` +
                    `  <svg viewBox="0 0 24 24"><path fill="currentColor" d="M21,3H3C1.89,3 1,3.89 1,5V19A2,2 0 0,0 3,21H21A2,2 0 0,0 23,19V5A2,2 0 0,0 21,3M5,17L8.5,12.5L11,15.5L14.5,11L19,17H5Z" /></svg>` +
                    `</div>`;
                const imageElement = imageUrl ? `<img src="${imageUrl}" alt="${title.substring(0,50)}" class="g1-item-image-dayos" onerror="this.style.display='none'; this.nextSibling.style.display='flex';">${imagePlaceholder}` : imagePlaceholder;
                // Adicionado onerror para mostrar placeholder se a imagem falhar e um placeholder oculto
                if(imageUrl) {
                     // Esconder o placeholder SVG se a imagem carregar
                     const placeholderForImage = imageElement.includes(imagePlaceholder) ? imagePlaceholder.replace('style.display=\'flex\'', 'style.display=\'none\'') : '';
                }


                if (index === 0) { // Notícia Principal
                    const shortDescription = description.substring(0, 120) + (description.length > 120 ? "..." : "");
                    mainHighlightHTML = 
                        `<article class="g1-main-highlight-dayos">` +
                        `  <a href="${link}" target="_blank" rel="noopener noreferrer" class="g1-main-highlight-link-dayos">` +
                        `    <div class="g1-main-highlight-image-container-dayos">${imageUrl ? `<img src="${imageUrl}" alt="${title.substring(0,50)}" class="g1-item-image-dayos">` : imagePlaceholder}</div>` +
                        `    <div class="g1-main-highlight-content-dayos">` +
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
                        `    <div class="g1-secondary-card-image-container-dayos">${imageUrl ? `<img src="${imageUrl}" alt="${title.substring(0,50)}" class="g1-item-image-dayos">` : imagePlaceholder}</div>` +
                        `    <div class="g1-secondary-card-content-dayos">` +
                        `      <h4 class="g1-secondary-card-title-dayos">${title}</h4>` +
                        `      <p class="g1-secondary-card-description-dayos">${cardDescription}</p>` +
                        `      <span class="g1-item-date-dayos">${pubDate}</span>` +
                        `    </div>` +
                        `  </a>` +
                        `</article>`;
                }
            });

            secondaryCardsHTML += "</div>"; // Fecha g1-secondary-grid-dayos
            feedContainer.innerHTML = mainHighlightHTML + secondaryCardsHTML;
            console.log(`Exibidas ${items.length} notícias do feed no estilo G1 (via rss2json).`);

        })
        .catch(error => {
            console.error("Erro ao carregar ou processar o feed RSS (Estilo G1 via rss2json):", error);
            feedContainer.innerHTML = 
                '<div class="g1-error-dayos">' +
                `  <p>Não foi possível carregar as notícias. (Detalhe: ${error.message} - Fonte: rss2json)</p>` +
                '</div>';
        });
});

