// Aguarda o carregamento completo do DOM
document.addEventListener("DOMContentLoaded", () => {
    // Lógica para menu mobile
    const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
    const navList = document.getElementById("navList");
    if (mobileMenuToggle && navList) {
        mobileMenuToggle.addEventListener("click", () => {
            const isExpanded = mobileMenuToggle.getAttribute("aria-expanded") === "true" || false;
            mobileMenuToggle.setAttribute("aria-expanded", !isExpanded);
            navList.classList.toggle("active");
        });
    }

    // Lógica para navegação suave (scroll)
    document.querySelectorAll("a[href^=\'#\']").forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const targetId = this.getAttribute("href");
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = document.querySelector(".site-header").offsetHeight + 20; // Aumentado o offset para 20px adicionais
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                // Ajuste especial para a seção de websites
                if (targetId === "#websites") {
                    window.scrollTo({
                        top: offsetPosition - 100, // Offset adicional para a seção de websites
                        behavior: "smooth"
                    });
                } else {
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth"
                    });
                }
                
                if (navList.classList.contains("active")) {
                    mobileMenuToggle.setAttribute("aria-expanded", "false");
                    navList.classList.remove("active");
                }
            }
        });
    });

    // Lógica para clique no placeholder de vídeo (carregar iframe)
    const videoPlaceholders = document.querySelectorAll(".video-placeholder");
    videoPlaceholders.forEach(placeholder => {
        // A lógica de clique para carregar o iframe será adicionada APÓS a lógica do hover,
        // ou integrada de forma a não conflitar.
        // Por agora, focamos no efeito de hover.
    });

    // --- Efeito de Distorção WebGL nas Miniaturas (Hover) ---
    if (typeof THREE !== "undefined") {
        const interactivePlaceholders = document.querySelectorAll(".video-placeholder");

        interactivePlaceholders.forEach(placeholder => {
            let scene, camera, renderer, plane, material;
            let mouse = new THREE.Vector2();
            let targetMouse = new THREE.Vector2();
            let animationFrameId;
            let texture;
            const imageElement = placeholder.querySelector("img");
            let canvasElement;

            const vertexShader = `
                varying vec2 vUv;
                void main() {
                    vUv = uv;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `;

            const fragmentShader = `
                varying vec2 vUv;
                uniform sampler2D uTexture;
                uniform vec2 uMouse;
                uniform float uTime;
                uniform float uIntensity;

                void main() {
                    vec2 uv = vUv;
                    float distanceToMouse = length(uv - uMouse);
                    float distortion = smoothstep(0.3, 0.0, distanceToMouse) * uIntensity;
                    
                    // Efeito de ondulação simples
                    uv.x += sin(uv.y * 10.0 + uTime * 2.0) * 0.02 * distortion;
                    uv.y += cos(uv.x * 10.0 + uTime * 2.0) * 0.02 * distortion;

                    // Efeito de "apertar" em direção ao rato
                    // vec2 directionToMouse = normalize(uMouse - uv);
                    // uv += directionToMouse * distortion * 0.1;

                    vec4 color = texture2D(uTexture, uv);
                    gl_FragColor = color;
                }
            `;

            function initWebGL(imgTexture) {
                const width = placeholder.offsetWidth;
                const height = placeholder.offsetHeight;

                scene = new THREE.Scene();
                camera = new THREE.OrthographicCamera(width / -2, width / 2, height / 2, height / -2, 1, 1000);
                camera.position.z = 1;

                renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
                renderer.setSize(width, height);
                renderer.setPixelRatio(window.devicePixelRatio);
                canvasElement = renderer.domElement;
                canvasElement.style.position = "absolute";
                canvasElement.style.top = "0";
                canvasElement.style.left = "0";
                canvasElement.style.width = "100%";
                canvasElement.style.height = "100%";
                canvasElement.style.zIndex = "1"; // Sobre a imagem, mas abaixo do botão play
                placeholder.appendChild(canvasElement);

                texture = imgTexture;
                texture.needsUpdate = true; // Garantir que a textura seja carregada

                material = new THREE.ShaderMaterial({
                    uniforms: {
                        uTexture: { value: texture },
                        uMouse: { value: new THREE.Vector2(0.5, 0.5) }, // Centro por defeito
                        uTime: { value: 0 },
                        uIntensity: { value: 0.0 } // Começa sem intensidade
                    },
                    vertexShader,
                    fragmentShader,
                    transparent: true
                });

                const geometry = new THREE.PlaneGeometry(width, height);
                plane = new THREE.Mesh(geometry, material);
                scene.add(plane);
            }

            function animate() {
                if (!material) return;
                material.uniforms.uTime.value += 0.05;
                // Suavizar o movimento do rato para o shader
                mouse.x += (targetMouse.x - mouse.x) * 0.05;
                mouse.y += (targetMouse.y - mouse.y) * 0.05;
                material.uniforms.uMouse.value.set(mouse.x, mouse.y);
                
                renderer.render(scene, camera);
                animationFrameId = requestAnimationFrame(animate);
            }
            
            function onImageLoad() {
                const imgTexture = new THREE.TextureLoader().load(imageElement.src, () => {
                    // A textura está carregada, podemos inicializar o WebGL
                    if (placeholder.matches(":hover")) { // Se ainda estiver em hover quando a imagem carregar
                         initWebGL(imgTexture);
                         animate();
                         // Aumentar a intensidade suavemente
                         gsap.to(material.uniforms.uIntensity, { value: 1.0, duration: 0.5 });
                    }
                });
                imgTexture.minFilter = THREE.LinearFilter;
                imgTexture.magFilter = THREE.LinearFilter;
                imgTexture.format = THREE.RGBFormat; // ou RGBAFormat se a imagem tiver alfa
                return imgTexture; // Retorna a textura para uso
            }

            placeholder.addEventListener("mouseenter", (e) => {
                if (!imageElement) return;
                targetMouse.set(0.5, 0.5); // Reset ao entrar
                mouse.set(0.5,0.5);

                if (imageElement.complete) { // Se a imagem já estiver carregada (cache)
                    const loadedTexture = new THREE.Texture(imageElement);
                    loadedTexture.minFilter = THREE.LinearFilter;
                    loadedTexture.magFilter = THREE.LinearFilter;
                    loadedTexture.format = THREE.RGBFormat;
                    loadedTexture.needsUpdate = true;
                    initWebGL(loadedTexture);
                    animate();
                    if (material) gsap.to(material.uniforms.uIntensity, { value: 1.0, duration: 0.5 });
                } else {
                    // Se a imagem não estiver carregada, espera pelo evento load
                    // A função onImageLoad tratará de iniciar o WebGL
                    // Esta parte pode ser mais complexa se a imagem demorar muito a carregar
                    // e o utilizador sair do hover antes.
                    // Por simplicidade, assumimos que o carregamento é rápido ou já ocorreu.
                    // Uma abordagem mais robusta seria usar o texture loader diretamente.
                    const tempTexture = onImageLoad(); // Inicia o carregamento
                     // Se o utilizador sair antes de carregar, não fazemos nada.
                }
            });

            placeholder.addEventListener("mousemove", (e) => {
                if (!renderer || !material) return;
                const rect = placeholder.getBoundingClientRect();
                targetMouse.x = (e.clientX - rect.left) / rect.width;
                targetMouse.y = 1.0 - (e.clientY - rect.top) / rect.height; // Inverter Y
            });

            placeholder.addEventListener("mouseleave", () => {
                if (!renderer || !material) return;
                gsap.to(material.uniforms.uIntensity, {
                    value: 0.0, 
                    duration: 0.5, 
                    onComplete: () => {
                        cancelAnimationFrame(animationFrameId);
                        if (renderer && renderer.domElement && renderer.domElement.parentNode) {
                            renderer.domElement.parentNode.removeChild(renderer.domElement);
                        }
                        if(renderer) renderer.dispose();
                        if(material) material.dispose();
                        if(plane && plane.geometry) plane.geometry.dispose();
                        scene = null; camera = null; renderer = null; plane = null; material = null; texture = null; canvasElement = null;
                    }
                });
            });

            // Lógica de clique para carregar o iframe (mantida)
            const playButton = placeholder.querySelector(".play-button");
            const clickableArea = playButton ? playButton : placeholder; // Clicar no botão ou em qualquer lugar se não houver botão

            clickableArea.addEventListener("click", (event) => {
                // Prevenir que o clique no canvas WebGL (se estiver por cima) acione isto por engano
                if (event.target === canvasElement) return;
                
                const youtubeId = placeholder.getAttribute("data-youtube-id");
                if (youtubeId) {
                    const iframe = document.createElement("iframe");
                    iframe.setAttribute("class", "youtube-embed");
                    iframe.setAttribute("src", `https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1`);
                    iframe.setAttribute("title", "YouTube video player");
                    iframe.setAttribute("frameborder", "0");
                    iframe.setAttribute("allow", "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share");
                    iframe.setAttribute("allowfullscreen", "");
                    
                    const videoWrapper = placeholder.parentElement;
                    videoWrapper.innerHTML = ""; 
                    videoWrapper.appendChild(iframe);
                }
            });
        });
    } else {
        console.warn("Three.js não está carregado. O efeito de distorção nas miniaturas não funcionará.");
    }
});
