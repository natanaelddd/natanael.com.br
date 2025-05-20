// Dados dos componentes para a página de recursos para desenvolvedores
const componentsData = [
    // NAVEGAÇÃO
    {
        id: 'nav-responsive',
        title: 'Menu de Navegação Responsivo',
        description: 'Menu de navegação responsivo com toggle para mobile e animação suave.',
        category: 'navigation',
        html: `<nav class="nav-demo">
    <div class="nav-brand">Logo</div>
    <button class="nav-toggle">
        <span></span>
        <span></span>
        <span></span>
    </button>
    <ul class="nav-menu">
        <li><a href="#" class="nav-link">Início</a></li>
        <li><a href="#" class="nav-link">Sobre</a></li>
        <li><a href="#" class="nav-link">Serviços</a></li>
        <li><a href="#" class="nav-link">Portfólio</a></li>
        <li><a href="#" class="nav-link">Contato</a></li>
    </ul>
</nav>`,
        css: `.nav-demo {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #2c3e50;
    padding: 1rem 2rem;
    color: white;
    width: 100%;
}

.nav-brand {
    font-size: 1.5rem;
    font-weight: bold;
}

.nav-menu {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
}

.nav-link {
    color: white;
    text-decoration: none;
    padding: 0.5rem 1rem;
    transition: all 0.3s ease;
}

.nav-link:hover {
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
}

.nav-toggle {
    display: none;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.5rem;
}

.nav-toggle span {
    display: block;
    width: 25px;
    height: 3px;
    background-color: white;
    margin: 5px 0;
    transition: all 0.3s ease;
}

@media (max-width: 768px) {
    .nav-menu {
        position: fixed;
        top: 60px;
        left: 0;
        flex-direction: column;
        width: 100%;
        background-color: #2c3e50;
        transform: translateY(-100%);
        transition: transform 0.3s ease;
        z-index: 1000;
    }
    
    .nav-menu.active {
        transform: translateY(0);
    }
    
    .nav-link {
        padding: 1rem 2rem;
        display: block;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    .nav-toggle {
        display: block;
    }
}`,
        js: `document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
});`
    },
    {
        id: 'breadcrumbs',
        title: 'Breadcrumbs',
        description: 'Trilha de navegação para mostrar a localização atual do usuário no site.',
        category: 'navigation',
        html: `<nav class="breadcrumbs">
    <ul>
        <li><a href="#">Início</a></li>
        <li><a href="#">Produtos</a></li>
        <li><a href="#">Eletrônicos</a></li>
        <li class="active">Smartphones</li>
    </ul>
</nav>`,
        css: `.breadcrumbs {
    padding: 10px 0;
    background-color: #f8f9fa;
    border-radius: 4px;
}

.breadcrumbs ul {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
    flex-wrap: wrap;
}

.breadcrumbs li {
    display: flex;
    align-items: center;
    font-size: 14px;
}

.breadcrumbs li:not(:last-child)::after {
    content: "›";
    margin: 0 10px;
    color: #aaa;
}

.breadcrumbs a {
    color: #3498db;
    text-decoration: none;
}

.breadcrumbs a:hover {
    text-decoration: underline;
}

.breadcrumbs .active {
    color: #666;
    font-weight: 500;
}`
    },
    
    // BOTÕES
    {
        id: 'button-set',
        title: 'Conjunto de Botões',
        description: 'Conjunto de botões estilizados para diferentes ações e estados.',
        category: 'buttons',
        html: `<div class="button-container">
    <button class="btn btn-primary">Primário</button>
    <button class="btn btn-secondary">Secundário</button>
    <button class="btn btn-success">Sucesso</button>
    <button class="btn btn-danger">Perigo</button>
    <button class="btn btn-warning">Alerta</button>
    <button class="btn btn-info">Info</button>
    <button class="btn btn-light">Claro</button>
    <button class="btn btn-dark">Escuro</button>
</div>`,
        css: `.button-container {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}

.btn {
    display: inline-block;
    font-weight: 500;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    user-select: none;
    border: 1px solid transparent;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    line-height: 1.5;
    border-radius: 0.25rem;
    transition: all 0.15s ease-in-out;
    cursor: pointer;
}

.btn:hover {
    opacity: 0.9;
    transform: translateY(-1px);
}

.btn:active {
    transform: translateY(1px);
}

.btn-primary {
    color: #fff;
    background-color: #3498db;
    border-color: #3498db;
}

.btn-secondary {
    color: #fff;
    background-color: #95a5a6;
    border-color: #95a5a6;
}

.btn-success {
    color: #fff;
    background-color: #2ecc71;
    border-color: #2ecc71;
}

.btn-danger {
    color: #fff;
    background-color: #e74c3c;
    border-color: #e74c3c;
}

.btn-warning {
    color: #212529;
    background-color: #f39c12;
    border-color: #f39c12;
}

.btn-info {
    color: #fff;
    background-color: #3498db;
    border-color: #3498db;
}

.btn-light {
    color: #212529;
    background-color: #f8f9fa;
    border-color: #f8f9fa;
}

.btn-dark {
    color: #fff;
    background-color: #2c3e50;
    border-color: #2c3e50;
}`
    },
    {
        id: 'button-icon',
        title: 'Botões com Ícones',
        description: 'Botões com ícones para melhor comunicação visual.',
        category: 'buttons',
        html: `<div class="button-container">
    <button class="btn-icon">
        <span class="icon">📥</span>
        <span class="text">Download</span>
    </button>
    <button class="btn-icon">
        <span class="icon">📤</span>
        <span class="text">Upload</span>
    </button>
    <button class="btn-icon">
        <span class="icon">💾</span>
        <span class="text">Salvar</span>
    </button>
    <button class="btn-icon btn-icon-primary">
        <span class="icon">✉️</span>
        <span class="text">Enviar</span>
    </button>
</div>`,
        css: `.button-container {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
}

.btn-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 10px 20px;
    background-color: #f8f9fa;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 500;
    color: #333;
    cursor: pointer;
    transition: all 0.2s ease;
}

.btn-icon:hover {
    background-color: #e9ecef;
    transform: translateY(-2px);
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.btn-icon:active {
    transform: translateY(0);
}

.btn-icon-primary {
    background-color: #3498db;
    border-color: #3498db;
    color: white;
}

.btn-icon-primary:hover {
    background-color: #2980b9;
}

.icon {
    font-size: 18px;
}`
    },
    
    // FORMULÁRIOS
    {
        id: 'form-inputs',
        title: 'Campos de Formulário Estilizados',
        description: 'Conjunto de campos de formulário com estilo moderno e feedback visual.',
        category: 'forms',
        html: `<form class="styled-form">
    <div class="form-group">
        <label for="name">Nome</label>
        <input type="text" id="name" class="form-control" placeholder="Seu nome">
    </div>
    <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" class="form-control" placeholder="seu@email.com">
    </div>
    <div class="form-group">
        <label for="password">Senha</label>
        <input type="password" id="password" class="form-control" placeholder="Sua senha">
        <small class="form-text">A senha deve ter pelo menos 8 caracteres</small>
    </div>
    <div class="form-group">
        <label for="message">Mensagem</label>
        <textarea id="message" class="form-control" rows="4" placeholder="Sua mensagem"></textarea>
    </div>
    <button type="submit" class="form-button">Enviar</button>
</form>`,
        css: `.styled-form {
    max-width: 500px;
    margin: 0 auto;
}

.form-group {
    margin-bottom: 20px;
}

.form-group label {
    display: block;
    margin-bottom: 8px;
    font-weight: 500;
    color: #333;
}

.form-control {
    display: block;
    width: 100%;
    padding: 12px 15px;
    font-size: 16px;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: 4px;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.form-control:focus {
    color: #495057;
    background-color: #fff;
    border-color: #80bdff;
    outline: 0;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
}

.form-control::placeholder {
    color: #adb5bd;
    opacity: 1;
}

.form-text {
    display: block;
    margin-top: 5px;
    font-size: 14px;
    color: #6c757d;
}

.form-button {
    display: inline-block;
    font-weight: 500;
    color: #fff;
    background-color: #3498db;
    text-align: center;
    vertical-align: middle;
    cursor: pointer;
    border: 1px solid transparent;
    padding: 12px 24px;
    font-size: 16px;
    line-height: 1.5;
    border-radius: 4px;
    transition: all 0.15s ease-in-out;
}

.form-button:hover {
    background-color: #2980b9;
}`
    },
    {
        id: 'custom-checkbox',
        title: 'Checkbox e Radio Personalizados',
        description: 'Checkbox e radio buttons com estilo personalizado e animação.',
        category: 'forms',
        html: `<div class="custom-controls">
    <div class="control-group">
        <h4>Checkbox</h4>
        <label class="custom-control">
            <input type="checkbox" class="custom-control-input">
            <span class="custom-control-indicator"></span>
            <span class="custom-control-label">Opção 1</span>
        </label>
        <label class="custom-control">
            <input type="checkbox" class="custom-control-input" checked>
            <span class="custom-control-indicator"></span>
            <span class="custom-control-label">Opção 2</span>
        </label>
        <label class="custom-control">
            <input type="checkbox" class="custom-control-input">
            <span class="custom-control-indicator"></span>
            <span class="custom-control-label">Opção 3</span>
        </label>
    </div>
    
    <div class="control-group">
        <h4>Radio</h4>
        <label class="custom-control">
            <input type="radio" name="radio" class="custom-control-input" checked>
            <span class="custom-control-indicator radio"></span>
            <span class="custom-control-label">Opção A</span>
        </label>
        <label class="custom-control">
            <input type="radio" name="radio" class="custom-control-input">
            <span class="custom-control-indicator radio"></span>
            <span class="custom-control-label">Opção B</span>
        </label>
        <label class="custom-control">
            <input type="radio" name="radio" class="custom-control-input">
            <span class="custom-control-indicator radio"></span>
            <span class="custom-control-label">Opção C</span>
        </label>
    </div>
</div>`,
        css: `.custom-controls {
    display: flex;
    gap: 40px;
}

.control-group {
    margin-bottom: 20px;
}

.control-group h4 {
    margin-bottom: 15px;
    font-weight: 600;
    color: #333;
}

.custom-control {
    position: relative;
    display: flex;
    align-items: center;
    padding-left: 35px;
    margin-bottom: 15px;
    cursor: pointer;
    font-size: 16px;
    user-select: none;
}

.custom-control-input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
}

.custom-control-indicator {
    position: absolute;
    top: 0;
    left: 0;
    height: 22px;
    width: 22px;
    background-color: #fff;
    border: 2px solid #ddd;
    border-radius: 4px;
    transition: all 0.2s ease;
}

.custom-control-indicator.radio {
    border-radius: 50%;
}

.custom-control-input:checked ~ .custom-control-indicator {
    background-color: #3498db;
    border-color: #3498db;
}

.custom-control-input:checked ~ .custom-control-indicator:after {
    content: "";
    position: absolute;
    display: block;
}

.custom-control-input:checked ~ .custom-control-indicator:after {
    left: 7px;
    top: 3px;
    width: 5px;
    height: 10px;
    border: solid white;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
}

.custom-control-input:checked ~ .custom-control-indicator.radio:after {
    left: 6px;
    top: 6px;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: white;
    border: none;
    transform: none;
}

.custom-control-label {
    margin-left: 10px;
    color: #333;
}

.custom-control:hover .custom-control-indicator {
    border-color: #3498db;
}`
    },
    
    // CARDS
    {
        id: 'product-card',
        title: 'Card de Produto',
        description: 'Card para exibição de produtos em e-commerce.',
        category: 'cards',
        html: `<div class="product-card">
    <div class="product-badge">Novo</div>
    <div class="product-image">
        <div class="placeholder-image"></div>
    </div>
    <div class="product-info">
        <h3 class="product-title">Nome do Produto</h3>
        <p class="product-description">Descrição curta do produto com detalhes importantes.</p>
        <div class="product-price">
            <span class="price-old">R$ 199,90</span>
            <span class="price-current">R$ 149,90</span>
        </div>
        <div class="product-actions">
            <button class="btn-add-cart">Adicionar ao Carrinho</button>
            <button class="btn-wishlist">❤</button>
        </div>
    </div>
</div>`,
        css: `.product-card {
    width: 300px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    position: relative;
    transition: transform 0.3s, box-shadow 0.3s;
}

.product-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
}

.product-badge {
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: #e74c3c;
    color: white;
    padding: 5px 10px;
    font-size: 12px;
    font-weight: 600;
    border-radius: 4px;
    z-index: 1;
}

.product-image {
    height: 200px;
    overflow: hidden;
}

.placeholder-image {
    width: 100%;
    height: 100%;
    background-color: #f0f0f0;
    background-image: linear-gradient(45deg, #e0e0e0 25%, transparent 25%, transparent 75%, #e0e0e0 75%, #e0e0e0), 
                      linear-gradient(45deg, #e0e0e0 25%, transparent 25%, transparent 75%, #e0e0e0 75%, #e0e0e0);
    background-size: 20px 20px;
    background-position: 0 0, 10px 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
}

.placeholder-image::after {
    content: "Imagem do Produto";
    color: #999;
    font-size: 14px;
    font-weight: 500;
}

.product-info {
    padding: 20px;
}

.product-title {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 10px;
    color: #333;
}

.product-description {
    font-size: 14px;
    color: #666;
    margin-bottom: 15px;
    line-height: 1.4;
}

.product-price {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
}

.price-old {
    font-size: 14px;
    color: #999;
    text-decoration: line-through;
    margin-right: 10px;
}

.price-current {
    font-size: 18px;
    font-weight: 700;
    color: #e74c3c;
}

.product-actions {
    display: flex;
    gap: 10px;
}

.btn-add-cart {
    flex: 1;
    background-color: #3498db;
    color: white;
    border: none;
    padding: 10px;
    border-radius: 4px;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.2s;
}

.btn-add-cart:hover {
    background-color: #2980b9;
}

.btn-wishlist {
    width: 40px;
    background-color: #f8f9fa;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
    transition: all 0.2s;
}

.btn-wishlist:hover {
    background-color: #fff0f0;
    color: #e74c3c;
    border-color: #e74c3c;
}`
    },
    
    // MODAIS
    {
        id: 'simple-modal',
        title: 'Modal Simples',
        description: 'Modal leve e responsivo para exibir conteúdo ou alertas.',
        category: 'modals',
        html: `<div class="modal-demo">
    <button class="modal-trigger">Abrir Modal</button>
    
    <div class="modal">
        <div class="modal-overlay"></div>
        <div class="modal-container">
            <div class="modal-header">
                <h3>Título do Modal</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <p>Este é um exemplo de modal simples e responsivo. Você pode adicionar qualquer conteúdo aqui, como texto, imagens, formulários, etc.</p>
            </div>
            <div class="modal-footer">
                <button class="modal-btn modal-btn-secondary modal-close-btn">Cancelar</button>
                <button class="modal-btn modal-btn-primary">Confirmar</button>
            </div>
        </div>
    </div>
</div>`,
        css: `.modal-demo {
    text-align: center;
}

.modal-trigger {
    background-color: #3498db;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.2s;
}

.modal-trigger:hover {
    background-color: #2980b9;
}

.modal {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1000;
}

.modal.active {
    display: block;
}

.modal-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    animation: fadeIn 0.3s forwards;
}

.modal-container {
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    width: 90%;
    max-width: 500px;
    border-radius: 8px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    animation: slideIn 0.3s forwards;
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 20px;
    border-bottom: 1px solid #eee;
}

.modal-header h3 {
    margin: 0;
    font-size: 18px;
    color: #333;
}

.modal-close {
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    color: #999;
    transition: color 0.2s;
}

.modal-close:hover {
    color: #333;
}

.modal-body {
    padding: 20px;
    max-height: 60vh;
    overflow-y: auto;
}

.modal-footer {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    padding: 15px 20px;
    border-top: 1px solid #eee;
}

.modal-btn {
    padding: 8px 16px;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
}

.modal-btn-primary {
    background-color: #3498db;
    color: white;
    border: none;
}

.modal-btn-primary:hover {
    background-color: #2980b9;
}

.modal-btn-secondary {
    background-color: #f8f9fa;
    color: #333;
    border: 1px solid #ddd;
}

.modal-btn-secondary:hover {
    background-color: #e9ecef;
}

@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

@keyframes slideIn {
    from { transform: translate(-50%, -60%); opacity: 0; }
    to { transform: translate(-50%, -50%); opacity: 1; }
}`,
        js: `document.addEventListener('DOMContentLoaded', function() {
    const modalTrigger = document.querySelector('.modal-trigger');
    const modal = document.querySelector('.modal');
    const modalOverlay = document.querySelector('.modal-overlay');
    const modalClose = document.querySelector('.modal-close');
    const modalCloseBtn = document.querySelector('.modal-close-btn');
    
    function openModal() {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    if (modalTrigger && modal) {
        modalTrigger.addEventListener('click', openModal);
    }
    
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }
    
    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', closeModal);
    }
    
    if (modalOverlay) {
        modalOverlay.addEventListener('click', function(e) {
            if (e.target === modalOverlay) {
                closeModal();
            }
        });
    }
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
});`
    },
    
    // TABELAS
    {
        id: 'responsive-table',
        title: 'Tabela Responsiva',
        description: 'Tabela com design responsivo que se adapta a diferentes tamanhos de tela.',
        category: 'tables',
        html: `<div class="table-container">
    <table class="responsive-table">
        <thead>
            <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Email</th>
                <th>Status</th>
                <th>Ações</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td data-label="ID">1</td>
                <td data-label="Nome">João Silva</td>
                <td data-label="Email">joao@exemplo.com</td>
                <td data-label="Status"><span class="status-badge status-active">Ativo</span></td>
                <td data-label="Ações">
                    <div class="action-buttons">
                        <button class="action-btn edit">Editar</button>
                        <button class="action-btn delete">Excluir</button>
                    </div>
                </td>
            </tr>
            <tr>
                <td data-label="ID">2</td>
                <td data-label="Nome">Maria Santos</td>
                <td data-label="Email">maria@exemplo.com</td>
                <td data-label="Status"><span class="status-badge status-inactive">Inativo</span></td>
                <td data-label="Ações">
                    <div class="action-buttons">
                        <button class="action-btn edit">Editar</button>
                        <button class="action-btn delete">Excluir</button>
                    </div>
                </td>
            </tr>
            <tr>
                <td data-label="ID">3</td>
                <td data-label="Nome">Pedro Oliveira</td>
                <td data-label="Email">pedro@exemplo.com</td>
                <td data-label="Status"><span class="status-badge status-pending">Pendente</span></td>
                <td data-label="Ações">
                    <div class="action-buttons">
                        <button class="action-btn edit">Editar</button>
                        <button class="action-btn delete">Excluir</button>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
</div>`,
        css: `.table-container {
    overflow-x: auto;
    margin: 20px 0;
}

.responsive-table {
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
    background-color: white;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.responsive-table thead {
    background-color: #f8f9fa;
}

.responsive-table th,
.responsive-table td {
    padding: 15px;
    text-align: left;
    border-bottom: 1px solid #eee;
}

.responsive-table th {
    font-weight: 600;
    color: #333;
    text-transform: uppercase;
    font-size: 14px;
}

.responsive-table tbody tr:last-child td {
    border-bottom: none;
}

.responsive-table tbody tr:hover {
    background-color: #f8f9fa;
}

.status-badge {
    display: inline-block;
    padding: 5px 10px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 600;
}

.status-active {
    background-color: #e3fcef;
    color: #2ecc71;
}

.status-inactive {
    background-color: #feeae9;
    color: #e74c3c;
}

.status-pending {
    background-color: #fff8e1;
    color: #f39c12;
}

.action-buttons {
    display: flex;
    gap: 5px;
}

.action-btn {
    padding: 5px 10px;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
}

.action-btn.edit {
    background-color: #3498db;
    color: white;
    border: none;
}

.action-btn.edit:hover {
    background-color: #2980b9;
}

.action-btn.delete {
    background-color: #f8f9fa;
    color: #e74c3c;
    border: 1px solid #e74c3c;
}

.action-btn.delete:hover {
    background-color: #fee5e3;
}

@media (max-width: 768px) {
    .responsive-table thead {
        display: none;
    }
    
    .responsive-table tbody tr {
        display: block;
        margin-bottom: 15px;
        border-bottom: 1px solid #ddd;
    }
    
    .responsive-table tbody tr:last-child {
        margin-bottom: 0;
    }
    
    .responsive-table tbody td {
        display: flex;
        justify-content: space-between;
        align-items: center;
        text-align: right;
        border-bottom: 1px solid #eee;
    }
    
    .responsive-table tbody td:last-child {
        border-bottom: none;
    }
    
    .responsive-table tbody td:before {
        content: attr(data-label);
        font-weight: 600;
        color: #333;
        text-align: left;
    }
}`
    },
    
    // LOADERS
    {
        id: 'loading-spinners',
        title: 'Spinners de Carregamento',
        description: 'Conjunto de indicadores de carregamento para feedback visual.',
        category: 'loaders',
        html: `<div class="spinners-container">
    <div class="spinner-item">
        <div class="spinner spinner-border"></div>
        <p>Border</p>
    </div>
    <div class="spinner-item">
        <div class="spinner spinner-grow"></div>
        <p>Grow</p>
    </div>
    <div class="spinner-item">
        <div class="spinner spinner-dots">
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
        </div>
        <p>Dots</p>
    </div>
    <div class="spinner-item">
        <div class="spinner spinner-ring"></div>
        <p>Ring</p>
    </div>
</div>`,
        css: `.spinners-container {
    display: flex;
    flex-wrap: wrap;
    gap: 40px;
    justify-content: center;
}

.spinner-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
}

.spinner-item p {
    font-size: 14px;
    color: #666;
    margin: 0;
}

.spinner {
    display: inline-block;
}

/* Border Spinner */
.spinner-border {
    width: 40px;
    height: 40px;
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-left-color: #3498db;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

/* Grow Spinner */
.spinner-grow {
    width: 40px;
    height: 40px;
    background-color: #3498db;
    border-radius: 50%;
    animation: pulse 1.2s ease-in-out infinite;
}

/* Dots Spinner */
.spinner-dots {
    display: flex;
    align-items: center;
    gap: 5px;
}

.dot {
    width: 10px;
    height: 10px;
    background-color: #3498db;
    border-radius: 50%;
    animation: bounce 1.4s infinite ease-in-out both;
}

.dot:nth-child(1) {
    animation-delay: -0.32s;
}

.dot:nth-child(2) {
    animation-delay: -0.16s;
}

/* Ring Spinner */
.spinner-ring {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    box-sizing: border-box;
    border: 4px solid transparent;
    border-top-color: #3498db;
    border-bottom-color: #3498db;
    animation: dual-spin 1.2s linear infinite;
}

/* Animations */
@keyframes spin {
    to { transform: rotate(360deg); }
}

@keyframes pulse {
    0% { transform: scale(0); opacity: 1; }
    100% { transform: scale(1); opacity: 0; }
}

@keyframes bounce {
    0%, 80%, 100% { transform: scale(0); }
    40% { transform: scale(1); }
}

@keyframes dual-spin {
    0% { transform: rotate(0deg); }
    50% { transform: rotate(180deg); }
    100% { transform: rotate(360deg); }
}`
    },
    
    // LAYOUTS
    {
        id: 'grid-layout',
        title: 'Layout de Grid Responsivo',
        description: 'Sistema de grid flexível para criar layouts responsivos.',
        category: 'layouts',
        html: `<div class="grid-demo">
    <div class="grid-container">
        <div class="grid-row">
            <div class="grid-col col-12">
                <div class="grid-item">col-12</div>
            </div>
        </div>
        <div class="grid-row">
            <div class="grid-col col-6">
                <div class="grid-item">col-6</div>
            </div>
            <div class="grid-col col-6">
                <div class="grid-item">col-6</div>
            </div>
        </div>
        <div class="grid-row">
            <div class="grid-col col-4">
                <div class="grid-item">col-4</div>
            </div>
            <div class="grid-col col-4">
                <div class="grid-item">col-4</div>
            </div>
            <div class="grid-col col-4">
                <div class="grid-item">col-4</div>
            </div>
        </div>
        <div class="grid-row">
            <div class="grid-col col-3">
                <div class="grid-item">col-3</div>
            </div>
            <div class="grid-col col-3">
                <div class="grid-item">col-3</div>
            </div>
            <div class="grid-col col-3">
                <div class="grid-item">col-3</div>
            </div>
            <div class="grid-col col-3">
                <div class="grid-item">col-3</div>
            </div>
        </div>
        <div class="grid-row">
            <div class="grid-col col-8">
                <div class="grid-item">col-8</div>
            </div>
            <div class="grid-col col-4">
                <div class="grid-item">col-4</div>
            </div>
        </div>
    </div>
</div>`,
        css: `.grid-demo {
    padding: 20px;
}

.grid-container {
    width: 100%;
    padding-right: 15px;
    padding-left: 15px;
    margin-right: auto;
    margin-left: auto;
}

.grid-row {
    display: flex;
    flex-wrap: wrap;
    margin-right: -15px;
    margin-left: -15px;
}

.grid-col {
    position: relative;
    width: 100%;
    padding-right: 15px;
    padding-left: 15px;
}

.grid-item {
    background-color: #f8f9fa;
    border: 1px solid #dee2e6;
    padding: 20px;
    text-align: center;
    margin-bottom: 30px;
    border-radius: 4px;
    color: #333;
    font-weight: 500;
}

/* Columns */
.col-1 { flex: 0 0 8.333333%; max-width: 8.333333%; }
.col-2 { flex: 0 0 16.666667%; max-width: 16.666667%; }
.col-3 { flex: 0 0 25%; max-width: 25%; }
.col-4 { flex: 0 0 33.333333%; max-width: 33.333333%; }
.col-5 { flex: 0 0 41.666667%; max-width: 41.666667%; }
.col-6 { flex: 0 0 50%; max-width: 50%; }
.col-7 { flex: 0 0 58.333333%; max-width: 58.333333%; }
.col-8 { flex: 0 0 66.666667%; max-width: 66.666667%; }
.col-9 { flex: 0 0 75%; max-width: 75%; }
.col-10 { flex: 0 0 83.333333%; max-width: 83.333333%; }
.col-11 { flex: 0 0 91.666667%; max-width: 91.666667%; }
.col-12 { flex: 0 0 100%; max-width: 100%; }

/* Responsive */
@media (max-width: 768px) {
    .grid-col {
        flex: 0 0 100%;
        max-width: 100%;
    }
}`
    }
];

// Função para carregar os componentes na página
document.addEventListener('DOMContentLoaded', function() {
    const componentsGrid = document.getElementById('componentsGrid');
    const categoryButtons = document.querySelectorAll('.category-button');
    const searchInput = document.getElementById('componentSearch');
    
    // Função para renderizar os componentes
    function renderComponents(components) {
        if (!componentsGrid) return;
        
        componentsGrid.innerHTML = '';
        
        if (components.length === 0) {
            componentsGrid.innerHTML = '<div class="no-results">Nenhum componente encontrado.</div>';
            return;
        }
        
        components.forEach(component => {
            const componentCard = document.createElement('div');
            componentCard.className = 'component-card';
            componentCard.setAttribute('data-category', component.category);
            
            componentCard.innerHTML = `
                <div class="component-preview">
                    ${component.html}
                </div>
                <div class="component-info">
                    <h3 class="component-title">${component.title}</h3>
                    <p class="component-description">${component.description}</p>
                    <div class="component-actions">
                        <button class="component-button view-button" data-id="${component.id}">Ver Detalhes</button>
                        <button class="component-button copy-button" data-id="${component.id}">Copiar Código</button>
                    </div>
                </div>
            `;
            
            componentsGrid.appendChild(componentCard);
            
            // Aplicar estilos específicos do componente
            if (component.css) {
                const style = document.createElement('style');
                style.textContent = component.css;
                componentCard.querySelector('.component-preview').appendChild(style);
            }
            
            // Aplicar scripts específicos do componente
            if (component.js) {
                const script = document.createElement('script');
                script.textContent = component.js;
                componentCard.appendChild(script);
            }
        });
        
        // Adicionar event listeners para os botões
        document.querySelectorAll('.view-button').forEach(button => {
            button.addEventListener('click', function() {
                const componentId = this.getAttribute('data-id');
                const component = componentsData.find(c => c.id === componentId);
                if (component) {
                    showComponentModal(component);
                }
            });
        });
        
        document.querySelectorAll('.copy-button').forEach(button => {
            button.addEventListener('click', function() {
                const componentId = this.getAttribute('data-id');
                const component = componentsData.find(c => c.id === componentId);
                if (component) {
                    copyComponentCode(component);
                }
            });
        });
    }
    
    // Função para filtrar componentes por categoria
    function filterComponentsByCategory(category) {
        if (category === 'all') {
            return componentsData;
        } else {
            return componentsData.filter(component => component.category === category);
        }
    }
    
    // Função para filtrar componentes por termo de busca
    function filterComponentsBySearch(searchTerm) {
        if (!searchTerm) {
            return componentsData;
        }
        
        searchTerm = searchTerm.toLowerCase();
        return componentsData.filter(component => 
            component.title.toLowerCase().includes(searchTerm) || 
            component.description.toLowerCase().includes(searchTerm)
        );
    }
    
    // Função para mostrar modal com detalhes do componente
    function showComponentModal(component) {
        // Verificar se já existe um modal
        let modal = document.querySelector('.component-modal');
        
        if (!modal) {
            modal = document.createElement('div');
            modal.className = 'component-modal';
            document.body.appendChild(modal);
        }
        
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2 class="modal-title">${component.title}</h2>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="modal-preview">
                        ${component.html}
                    </div>
                    <div class="modal-tabs">
                        <div class="modal-tab active" data-tab="html">HTML</div>
                        <div class="modal-tab" data-tab="css">CSS</div>
                        ${component.js ? '<div class="modal-tab" data-tab="js">JavaScript</div>' : ''}
                    </div>
                    <div class="modal-tab-content active" data-tab="html">
                        <div class="code-container">
                            <div class="code-header">
                                <span class="code-language">HTML</span>
                                <button class="code-copy" data-code="html">Copiar</button>
                            </div>
                            <div class="code-content">
                                <pre><code class="language-html">${escapeHtml(component.html)}</code></pre>
                            </div>
                        </div>
                    </div>
                    <div class="modal-tab-content" data-tab="css">
                        <div class="code-container">
                            <div class="code-header">
                                <span class="code-language">CSS</span>
                                <button class="code-copy" data-code="css">Copiar</button>
                            </div>
                            <div class="code-content">
                                <pre><code class="language-css">${escapeHtml(component.css)}</code></pre>
                            </div>
                        </div>
                    </div>
                    ${component.js ? `
                    <div class="modal-tab-content" data-tab="js">
                        <div class="code-container">
                            <div class="code-header">
                                <span class="code-language">JavaScript</span>
                                <button class="code-copy" data-code="js">Copiar</button>
                            </div>
                            <div class="code-content">
                                <pre><code class="language-javascript">${escapeHtml(component.js)}</code></pre>
                            </div>
                        </div>
                    </div>
                    ` : ''}
                </div>
            </div>
        `;
        
        // Aplicar estilos específicos do componente no preview
        if (component.css) {
            const style = document.createElement('style');
            style.textContent = component.css;
            modal.querySelector('.modal-preview').appendChild(style);
        }
        
        // Aplicar scripts específicos do componente
        if (component.js) {
            const script = document.createElement('script');
            script.textContent = component.js;
            modal.querySelector('.modal-preview').appendChild(script);
        }
        
        // Mostrar o modal
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Highlight do código
        if (window.Prism) {
            Prism.highlightAll();
        }
        
        // Event listeners para o modal
        modal.querySelector('.modal-close').addEventListener('click', function() {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        });
        
        // Event listeners para as tabs
        modal.querySelectorAll('.modal-tab').forEach(tab => {
            tab.addEventListener('click', function() {
                const tabName = this.getAttribute('data-tab');
                
                // Remover classe active de todas as tabs e conteúdos
                modal.querySelectorAll('.modal-tab').forEach(t => t.classList.remove('active'));
                modal.querySelectorAll('.modal-tab-content').forEach(c => c.classList.remove('active'));
                
                // Adicionar classe active à tab clicada e seu conteúdo
                this.classList.add('active');
                modal.querySelector(`.modal-tab-content[data-tab="${tabName}"]`).classList.add('active');
            });
        });
        
        // Event listeners para os botões de copiar
        modal.querySelectorAll('.code-copy').forEach(button => {
            button.addEventListener('click', function() {
                const codeType = this.getAttribute('data-code');
                let code;
                
                switch (codeType) {
                    case 'html':
                        code = component.html;
                        break;
                    case 'css':
                        code = component.css;
                        break;
                    case 'js':
                        code = component.js;
                        break;
                }
                
                if (code) {
                    copyToClipboard(code);
                    this.textContent = 'Copiado!';
                    setTimeout(() => {
                        this.textContent = 'Copiar';
                    }, 2000);
                }
            });
        });
        
        // Fechar o modal ao clicar fora
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
    
    // Função para copiar o código do componente
    function copyComponentCode(component) {
        const code = `<!-- HTML -->
${component.html}

/* CSS */
${component.css}

${component.js ? `// JavaScript
${component.js}` : ''}`;
        
        copyToClipboard(code);
        
        // Feedback visual
        const button = document.querySelector(`.copy-button[data-id="${component.id}"]`);
        if (button) {
            const originalText = button.textContent;
            button.textContent = 'Copiado!';
            setTimeout(() => {
                button.textContent = originalText;
            }, 2000);
        }
    }
    
    // Função auxiliar para copiar para a área de transferência
    function copyToClipboard(text) {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text)
                .catch(err => console.error('Erro ao copiar: ', err));
        } else {
            // Fallback para navegadores mais antigos
            const textarea = document.createElement('textarea');
            textarea.value = text;
            textarea.style.position = 'fixed';
            document.body.appendChild(textarea);
            textarea.select();
            
            try {
                document.execCommand('copy');
            } catch (err) {
                console.error('Erro ao copiar: ', err);
            }
            
            document.body.removeChild(textarea);
        }
    }
    
    // Função auxiliar para escapar HTML
    function escapeHtml(html) {
        return html
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }
    
    // Inicializar a página com todos os componentes
    renderComponents(componentsData);
    
    // Event listeners para os botões de categoria
    if (categoryButtons) {
        categoryButtons.forEach(button => {
            button.addEventListener('click', function() {
                const category = this.getAttribute('data-category');
                
                // Atualizar classes ativas
                categoryButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // Filtrar e renderizar componentes
                const filteredComponents = filterComponentsByCategory(category);
                renderComponents(filteredComponents);
            });
        });
    }
    
    // Event listener para a busca
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.trim();
            const filteredComponents = filterComponentsBySearch(searchTerm);
            
            // Resetar categoria ativa
            categoryButtons.forEach(btn => {
                if (btn.getAttribute('data-category') === 'all') {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            });
            
            renderComponents(filteredComponents);
        });
    }
});
