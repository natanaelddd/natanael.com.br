document.addEventListener('DOMContentLoaded', function() {
    // Lista de IDs de vídeos do canal N Vídeo Produtora
    // Todos os vídeos abaixo são exclusivamente do canal @nvideoprodutora2190
    const videoIds = [
        'GDopEM4T_gI', // IA + Premiere + After Effects
        'AV73Jg6TPAY', // Villa Empreendimento
        'dycbKDgnAeg', // Trailer Vizuu
        'XWXRepBPFm8', // Schindler
        'ez_0bsQIYYw', // Zanotti Martineli - claquete
        'Hq5dJw7DZfQ', // Granja Autogerencíavel
        'C0DPdy98e4c', // Vídeo Animação personalizável
        'fKopy74weus', // Boas Vindas Coordenação Pedagogia legendado
        'kJQP7kiw5Fk', // VIDEO COMPLETO AGADA
        '9bZkp7q19f0', // Institucional
        'CevxZvSJLk8', // oculos Quest 3 3D
        'OPf0YbXqDm0', // Blix - Bluestorm Studios
        'YQHsXMglC9A', // ACELERA INTERNET ULTRA RAPIDA
        'nfWlot6h_JM', // Urna eletrônica 3D
        '2Vv-BfVoq4g', // Vila Luna Residence - Ribeirão Preto
        'hT_nvWreIhg', // REDE inglesa
        'Ks-_Mh1QhMc'  // Vídeo para empresa ACELERANET INTERNET ULTRA RÁPIDA
    ];
    
    // Número de vídeos a serem exibidos simultaneamente
    const displayCount = 6;
    
    // Elemento que contém os cards de vídeo
    const videoGrid = document.querySelector('.video-grid');
    
    // Função para criar um card de vídeo
    function createVideoCard(videoId, index) {
        return `
            <div class="portfolio-card video-card" style="opacity: 0; transition: opacity 0.5s ease;">
                <a href="https://www.youtube.com/watch?v=${videoId}" target="_blank" class="portfolio-card-link" data-video-id="${videoId}">
                    <img src="https://img.youtube.com/vi/${videoId}/hqdefault.jpg" alt="Thumbnail Vídeo ${index + 1}" class="portfolio-thumbnail">
                    <div class="portfolio-card-overlay">
                        <span class="portfolio-card-title">Vídeo ${index + 1}</span>
                        <span class="play-icon">▶</span>
                    </div>
                </a>
            </div>
        `;
    }
    
    // Função para exibir os vídeos na ordem da lista (sem aleatoriedade)
    function displayVideos() {
        // Selecionar os primeiros 'displayCount' vídeos da lista
        const selectedVideos = videoIds.slice(0, displayCount);
        
        // Criar HTML para os cards
        let cardsHTML = '';
        selectedVideos.forEach((videoId, index) => {
            cardsHTML += createVideoCard(videoId, index);
        });
        
        // Fade out dos cards atuais
        const currentCards = videoGrid.querySelectorAll('.portfolio-card');
        currentCards.forEach(card => {
            card.style.opacity = '0';
        });
        
        // Após a animação de fade out, substituir os cards
        setTimeout(() => {
            videoGrid.innerHTML = cardsHTML;
            
            // Fade in dos novos cards
            setTimeout(() => {
                const newCards = videoGrid.querySelectorAll('.portfolio-card');
                newCards.forEach(card => {
                    card.style.opacity = '1';
                });
            }, 50);
        }, 500);
    }
    
    // Inicializar com o primeiro conjunto de vídeos
    displayVideos();
});
