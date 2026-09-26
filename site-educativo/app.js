// Lógica Interativa e Animações 3D do Guia Educativo POO
(function () {
    // Estado da Aplicação
    const state = {
        currentView: "home",
        currentStepIndex: 0,
        completedSteps: JSON.parse(localStorage.getItem("poo_completed_steps") || "[]"),
        theme: localStorage.getItem("poo_theme") || "light"
    };

    // Elementos DOM
    const elements = {
        body: document.body,
        themeToggleBtn: document.getElementById("theme-toggle-btn"),
        mobileMenuBtn: document.getElementById("mobile-menu-btn"),
        sidebar: document.getElementById("sidebar"),
        sidebarNav: document.getElementById("sidebar-nav"),
        progressFill: document.getElementById("progress-bar-fill"),
        progressPercent: document.getElementById("progress-percent"),
        globalProgressBar: document.getElementById("global-progress-bar"),
        homeView: document.getElementById("view-home"),
        stepView: document.getElementById("view-step"),
        glossaryView: document.getElementById("view-glossary"),
        navLinks: document.querySelectorAll(".nav-link"),
        stepContainer: document.getElementById("step-render-container"),
        glossaryGrid: document.getElementById("glossary-grid"),
        glossarySearch: document.getElementById("glossary-search"),
        glossaryCategory: document.getElementById("glossary-category"),
        canvas3DContainer: document.getElementById("canvas-3d-container")
    };

    // Variáveis Globais do Three.js
    let threeState = {
        scene: null,
        camera: null,
        renderer: null,
        coreMesh: null,
        ringMesh: null,
        particlesMesh: null,
        animFrameId: null,
        targetRotationX: 0,
        targetRotationY: 0,
        currentRotationX: 0,
        currentRotationY: 0,
        isPointerInteracting: false
    };

    // Inicialização
    function init() {
        applyTheme(state.theme);
        setupEventListeners();
        renderSidebarNav();
        updateProgress();
        renderGlossary();
        init3DScene();
        setupCardTiltEffects();
        handleHashChange();
    }

    // ==========================================================================
    // SISTEMA 3D INTERATIVO (THREE.JS)
    // ==========================================================================
    function init3DScene() {
        if (!window.THREE || !elements.canvas3DContainer) return;

        try {
            const container = elements.canvas3DContainer;
            const width = container.clientWidth || 380;
            const height = container.clientHeight || 360;

            // Cena e Câmera
            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
            camera.position.z = 5.2;

            // Renderizador
            const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
            renderer.setSize(width, height);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            container.innerHTML = "";
            container.appendChild(renderer.domElement);

            // Núcleo Geométrico (Icosaedro wireframe + sólido translúcido)
            const coreGeometry = new THREE.IcosahedronGeometry(1.4, 1);
            
            // Material translúcido brilhante
            const isDark = state.theme === "dark";
            const mainColor = isDark ? 0x3b82f6 : 0x2563eb;
            const wireColor = isDark ? 0x60a5fa : 0x1d4ed8;

            const coreMaterial = new THREE.MeshPhongMaterial({
                color: mainColor,
                emissive: 0x111827,
                wireframe: true,
                transparent: true,
                opacity: 0.85
            });
            const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
            scene.add(coreMesh);

            // Anel Orbital Externo
            const ringGeometry = new THREE.TorusGeometry(2.1, 0.02, 16, 100);
            const ringMaterial = new THREE.MeshBasicMaterial({
                color: wireColor,
                transparent: true,
                opacity: 0.6
            });
            const ringMesh = new THREE.Mesh(ringGeometry, ringMaterial);
            ringMesh.rotation.x = Math.PI / 3;
            scene.add(ringMesh);

            // Nuvem de Partículas ao Redor
            const particleCount = 70;
            const particlesGeometry = new THREE.BufferGeometry();
            const positions = new Float32Array(particleCount * 3);

            for (let i = 0; i < particleCount * 3; i += 3) {
                positions[i] = (Math.random() - 0.5) * 6;
                positions[i + 1] = (Math.random() - 0.5) * 6;
                positions[i + 2] = (Math.random() - 0.5) * 6;
            }

            particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            const particlesMaterial = new THREE.PointsMaterial({
                color: wireColor,
                size: 0.05,
                transparent: true,
                opacity: 0.7
            });
            const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
            scene.add(particlesMesh);

            // Iluminação
            const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
            scene.add(ambientLight);

            const pointLight = new THREE.PointLight(0xffffff, 1.2);
            pointLight.position.set(5, 5, 5);
            scene.add(pointLight);

            // Salvar no estado 3D
            threeState = {
                scene,
                camera,
                renderer,
                coreMesh,
                ringMesh,
                particlesMesh,
                coreMaterial,
                ringMaterial,
                particlesMaterial,
                targetRotationX: 0,
                targetRotationY: 0,
                currentRotationX: 0,
                currentRotationY: 0,
                isPointerInteracting: false
            };

            // Interação com Mouse / Touch no Canvas
            function onPointerMove(e) {
                const rect = container.getBoundingClientRect();
                const clientX = e.touches ? e.touches[0].clientX : e.clientX;
                const clientY = e.touches ? e.touches[0].clientY : e.clientY;

                const x = ((clientX - rect.left) / rect.width) * 2 - 1;
                const y = -(((clientY - rect.top) / rect.height) * 2 - 1);

                threeState.targetRotationY = x * 1.5;
                threeState.targetRotationX = y * 1.5;
                threeState.isPointerInteracting = true;
            }

            container.addEventListener("mousemove", onPointerMove);
            container.addEventListener("touchmove", onPointerMove, { passive: true });

            container.addEventListener("mouseleave", () => {
                threeState.isPointerInteracting = false;
            });

            // Loop de Animação
            function animate() {
                threeState.animFrameId = requestAnimationFrame(animate);

                if (!threeState.isPointerInteracting) {
                    threeState.targetRotationY += 0.005;
                    threeState.targetRotationX = Math.sin(Date.now() * 0.001) * 0.2;
                }

                // Interpolação suave (Lerp)
                threeState.currentRotationX += (threeState.targetRotationX - threeState.currentRotationX) * 0.05;
                threeState.currentRotationY += (threeState.targetRotationY - threeState.currentRotationY) * 0.05;

                coreMesh.rotation.x = threeState.currentRotationX;
                coreMesh.rotation.y = threeState.currentRotationY;

                ringMesh.rotation.z += 0.004;
                ringMesh.rotation.y = threeState.currentRotationY * 0.5;

                particlesMesh.rotation.y -= 0.001;

                renderer.render(scene, camera);
            }

            animate();

            // Responsividade da Tela
            window.addEventListener("resize", () => {
                if (!container || !renderer || !camera) return;
                const newWidth = container.clientWidth || 300;
                const newHeight = container.clientHeight || 300;
                camera.aspect = newWidth / newHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(newWidth, newHeight);
            });

        } catch (err) {
            console.warn("WebGL não suportado ou erro na inicialização 3D:", err);
        }
    }

    // Efeito de Tilt 3D nos Cards (Micro-interação moderna)
    function setupCardTiltEffects() {
        const cards = document.querySelectorAll(".feature-card");
        cards.forEach(card => {
            card.addEventListener("mousemove", (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = ((y - centerY) / centerY) * -6;
                const rotateY = ((x - centerX) / centerX) * 6;

                card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
            });

            card.addEventListener("mouseleave", () => {
                card.style.transform = `perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0px)`;
            });
        });
    }

    // Gerenciamento de Tema
    function applyTheme(theme) {
        state.theme = theme;
        if (theme === "dark") {
            document.documentElement.setAttribute("data-theme", "dark");
            elements.themeToggleBtn.innerHTML = `
                <svg class="svg-icon" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="5"></circle>
                    <line x1="12" y1="1" x2="12" y2="3"></line>
                    <line x1="12" y1="21" x2="12" y2="23"></line>
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                    <line x1="1" y1="12" x2="3" y2="12"></line>
                    <line x1="21" y1="12" x2="23" y2="12"></line>
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                </svg>
            `;
            elements.themeToggleBtn.setAttribute("title", "Mudar para modo claro");
        } else {
            document.documentElement.removeAttribute("data-theme");
            elements.themeToggleBtn.innerHTML = `
                <svg class="svg-icon" viewBox="0 0 24 24">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
            `;
            elements.themeToggleBtn.setAttribute("title", "Mudar para modo escuro");
        }
        localStorage.setItem("poo_theme", theme);

        // Atualizar cor do 3D se ativo
        if (threeState.coreMaterial) {
            const isDark = theme === "dark";
            threeState.coreMaterial.color.setHex(isDark ? 0x3b82f6 : 0x2563eb);
            threeState.ringMaterial.color.setHex(isDark ? 0x60a5fa : 0x1d4ed8);
            threeState.particlesMaterial.color.setHex(isDark ? 0x60a5fa : 0x1d4ed8);
        }
    }

    // Syntax Highlighter Java
    function highlightJava(code) {
        let escaped = code
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");

        // Comentários
        escaped = escaped.replace(/(\/\/.*$)/gm, '<span class="c-comment">$1</span>');

        // Strings
        escaped = escaped.replace(/(".*?")/g, '<span class="c-string">$1</span>');

        // Palavras-chave
        const keywords = [
            "package", "import", "public", "private", "protected", "class", 
            "void", "static", "final", "return", "if", "else", "switch", 
            "case", "break", "default", "do", "while", "for", "new", "try", "catch", "this"
        ];
        const keywordRegex = new RegExp(`\\b(${keywords.join("|")})\\b`, "g");
        escaped = escaped.replace(keywordRegex, '<span class="c-keyword">$1</span>');

        // Tipos e Classes
        const types = [
            "int", "boolean", "String", "LocalDate", "Period", "DateTimeFormatter", 
            "Scanner", "Random", "ArrayList", "Usuario", "Cadastro", "Login", 
            "SaldoMenu", "Saque", "Deposito", "ResgatePresente", "JogosMenu", 
            "CacaNiquel", "Blackjack", "Carta", "Util", "InterruptedException"
        ];
        const typeRegex = new RegExp(`\\b(${types.join("|")})\\b`, "g");
        escaped = escaped.replace(typeRegex, '<span class="c-type">$1</span>');

        // Números
        escaped = escaped.replace(/\b(\d+)\b/g, '<span class="c-number">$1</span>');

        return escaped;
    }

    // Renderizar Navegação Lateral
    function renderSidebarNav() {
        elements.sidebarNav.innerHTML = "";
        TUTORIAL_DATA.stages.forEach((stage, index) => {
            const isCompleted = state.completedSteps.includes(stage.id);
            const isActive = state.currentView === "step" && state.currentStepIndex === index;

            const li = document.createElement("li");
            li.className = `sidebar-item ${isActive ? "active" : ""} ${isCompleted ? "completed" : ""}`;
            li.innerHTML = `
                <div class="item-check">
                    ${isCompleted ? `
                        <svg class="svg-icon" style="width: 12px; height: 12px;" viewBox="0 0 24 24">
                            <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                    ` : (index + 1)}
                </div>
                <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
                    Etapa ${index + 1}: ${stage.file.split("/").pop()}
                </span>
            `;
            li.addEventListener("click", () => {
                goToStep(index);
                if (window.innerWidth <= 992) {
                    elements.sidebar.classList.remove("open");
                }
            });
            elements.sidebarNav.appendChild(li);
        });
    }

    // Atualizar Barra de Progresso
    function updateProgress() {
        const total = TUTORIAL_DATA.stages.length;
        const completed = state.completedSteps.length;
        const percent = Math.round((completed / total) * 100);

        elements.progressFill.style.width = `${percent}%`;
        elements.progressPercent.textContent = `${percent}%`;
        elements.globalProgressBar.style.width = `${percent}%`;
    }

    // Alternar Visualizações (Home, Step, Glossary)
    function switchView(viewName) {
        state.currentView = viewName;
        elements.homeView.classList.remove("active");
        elements.stepView.classList.remove("active");
        elements.glossaryView.classList.remove("active");

        elements.navLinks.forEach(link => {
            if (link.dataset.view === viewName) {
                link.classList.add("active");
            } else {
                link.classList.remove("active");
            }
        });

        if (viewName === "home") {
            elements.homeView.classList.add("active");
            window.location.hash = "#home";
        } else if (viewName === "step") {
            elements.stepView.classList.add("active");
            renderCurrentStep();
        } else if (viewName === "glossary") {
            elements.glossaryView.classList.add("active");
            window.location.hash = "#glossario";
        }

        renderSidebarNav();
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    // Navegar para uma etapa
    function goToStep(index) {
        if (index < 0 || index >= TUTORIAL_DATA.stages.length) return;
        state.currentStepIndex = index;
        switchView("step");
        const stage = TUTORIAL_DATA.stages[index];
        window.location.hash = `#etapa-${stage.id}`;
    }

    // Marcar como Concluído
    function toggleStepCompletion(stepId) {
        const idx = state.completedSteps.indexOf(stepId);
        if (idx === -1) {
            state.completedSteps.push(stepId);
        } else {
            state.completedSteps.splice(idx, 1);
        }
        localStorage.setItem("poo_completed_steps", JSON.stringify(state.completedSteps));
        updateProgress();
        renderSidebarNav();
        renderCurrentStep();
    }

    // Renderizar Conteúdo da Etapa
    function renderCurrentStep() {
        const stage = TUTORIAL_DATA.stages[state.currentStepIndex];
        const isCompleted = state.completedSteps.includes(stage.id);
        const hasPrev = state.currentStepIndex > 0;
        const hasNext = state.currentStepIndex < TUTORIAL_DATA.stages.length - 1;

        // Tags de POO (Sem Emojis, com SVG)
        const pooTagsHtml = stage.pooConcepts.map(c => `
            <div class="poo-tag" title="${c.desc}">
                <svg class="svg-icon" viewBox="0 0 24 24">
                    <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                    <polyline points="2 17 12 22 22 17"></polyline>
                    <polyline points="2 12 12 17 22 12"></polyline>
                </svg>
                <span><strong>${c.name}</strong></span>
            </div>
        `).join("");

        // Explicações Linha a Linha
        const lineExplanationsHtml = stage.lineExplanations.map(item => `
            <div class="line-breakdown-card">
                <span class="line-tag">
                    <svg class="svg-icon" style="width: 12px; height: 12px;" viewBox="0 0 24 24">
                        <polyline points="16 18 22 12 16 6"></polyline>
                        <polyline points="8 6 2 12 8 18"></polyline>
                    </svg>
                    <span>${item.lines}</span>
                </span>
                <code class="line-code-preview">${item.codeSnippet}</code>
                <p class="line-desc">${item.text}</p>
            </div>
        `).join("");

        elements.stepContainer.innerHTML = `
            <div class="step-container">
                <!-- Meta Informações -->
                <div class="step-meta-bar">
                    <span class="order-badge">
                        <svg class="svg-icon" viewBox="0 0 24 24">
                            <circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12 6 12 12 14 14"></polyline>
                        </svg>
                        <span>${stage.orderBadge}</span>
                    </span>
                    <span class="file-pill">
                        <svg class="svg-icon" viewBox="0 0 24 24">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                            <polyline points="14 2 14 8 20 8"></polyline>
                        </svg>
                        <span>${stage.file}</span>
                    </span>
                </div>

                <!-- Título -->
                <h1 class="step-title">${stage.title}</h1>

                <!-- Tags de POO -->
                <div class="poo-tags-container">
                    ${pooTagsHtml}
                </div>

                <!-- Card de Analogia do Mundo Real -->
                <div class="analogy-card">
                    <div class="analogy-icon">
                        <svg class="svg-icon" style="width: 22px; height: 22px;" viewBox="0 0 24 24">
                            <line x1="9" y1="18" x2="15" y2="18"></line>
                            <line x1="10" y1="22" x2="14" y2="22"></line>
                            <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"></path>
                        </svg>
                    </div>
                    <div>
                        <h4 class="analogy-title">Como entender no dia a dia:</h4>
                        <p class="analogy-text">${stage.analogy}</p>
                    </div>
                </div>

                <!-- O Porquê / Problema que Resolve -->
                <div class="explanation-card">
                    <h3 class="explanation-card-title">
                        <svg class="svg-icon" style="color: var(--accent);" viewBox="0 0 24 24">
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="12" y1="16" x2="12" y2="12"></line>
                            <line x1="12" y1="8" x2="12.01" y2="8"></line>
                        </svg>
                        <span>Por que essa estrutura existe? (O problema que ela resolve)</span>
                    </h3>
                    <p class="explanation-card-text">${stage.whyItExists}</p>
                    <p class="explanation-card-text" style="margin-top: 0.6rem; font-size: 0.85rem; color: var(--text-muted);">
                        <strong>Momento da Criação:</strong> ${stage.orderReason}
                    </p>
                </div>

                <!-- Bloco de Código com Syntax Highlighting -->
                <div class="code-wrapper">
                    <div class="code-header">
                        <span class="code-file-name">
                            <svg class="svg-icon" viewBox="0 0 24 24">
                                <polyline points="16 18 22 12 16 6"></polyline>
                                <polyline points="8 6 2 12 8 18"></polyline>
                            </svg>
                            <span>${stage.file}</span>
                        </span>
                        <button class="code-copy-btn" id="btn-copy-code" title="Copiar código para área de transferência">
                            <svg class="svg-icon" viewBox="0 0 24 24">
                                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                            </svg>
                            <span id="copy-btn-text">Copiar código</span>
                        </button>
                    </div>
                    <pre class="code-content"><code>${highlightJava(stage.code)}</code></pre>
                </div>

                <!-- Explicação Linha a Linha -->
                <div class="line-by-line-section">
                    <h3 class="sub-heading">
                        <svg class="svg-icon" viewBox="0 0 24 24">
                            <line x1="8" y1="6" x2="21" y2="6"></line>
                            <line x1="8" y1="12" x2="21" y2="12"></line>
                            <line x1="8" y1="18" x2="21" y2="18"></line>
                            <line x1="3" y1="6" x2="3.01" y2="6"></line>
                            <line x1="3" y1="12" x2="3.01" y2="12"></line>
                            <line x1="3" y1="18" x2="3.01" y2="18"></line>
                        </svg>
                        <span>Explicação Linha a Linha</span>
                    </h3>
                    <div class="line-breakdown-list">
                        ${lineExplanationsHtml}
                    </div>
                </div>

                <!-- Resumo e Conclusão -->
                <div class="summary-box">
                    <h4 class="summary-title">
                        <svg class="svg-icon" viewBox="0 0 24 24">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                        <span>O que aprendemos nesta etapa:</span>
                    </h4>
                    <p class="summary-text">${stage.summary}</p>
                </div>

                <!-- Barra de Navegação -->
                <div class="step-navigation-bar">
                    <div>
                        ${hasPrev ? `
                            <button class="btn btn-secondary" id="btn-prev-step">
                                <svg class="svg-icon" viewBox="0 0 24 24">
                                    <line x1="19" y1="12" x2="5" y2="12"></line>
                                    <polyline points="12 19 5 12 12 5"></polyline>
                                </svg>
                                <span>Etapa Anterior</span>
                            </button>
                        ` : `
                            <button class="btn btn-secondary" id="btn-back-home">
                                <svg class="svg-icon" viewBox="0 0 24 24">
                                    <line x1="19" y1="12" x2="5" y2="12"></line>
                                    <polyline points="12 19 5 12 12 5"></polyline>
                                </svg>
                                <span>Início</span>
                            </button>
                        `}
                    </div>

                    <button class="step-complete-btn ${isCompleted ? 'active' : ''}" id="btn-toggle-complete">
                        <svg class="svg-icon" viewBox="0 0 24 24">
                            <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        <span>${isCompleted ? 'Etapa Concluída' : 'Marcar como Concluída'}</span>
                    </button>

                    <div>
                        ${hasNext ? `
                            <button class="btn btn-primary" id="btn-next-step">
                                <span>Próxima Etapa</span>
                                <svg class="svg-icon" viewBox="0 0 24 24">
                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                    <polyline points="12 5 19 12 12 19"></polyline>
                                </svg>
                            </button>
                        ` : `
                            <button class="btn btn-primary" id="btn-finish-glossary">
                                <span>Ver Glossário Completo</span>
                                <svg class="svg-icon" viewBox="0 0 24 24">
                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                    <polyline points="12 5 19 12 12 19"></polyline>
                                </svg>
                            </button>
                        `}
                    </div>
                </div>
            </div>
        `;

        // Eventos dos botões renderizados
        const copyBtn = document.getElementById("btn-copy-code");
        const copyText = document.getElementById("copy-btn-text");
        copyBtn.addEventListener("click", () => {
            navigator.clipboard.writeText(stage.code).then(() => {
                copyBtn.classList.add("copied");
                copyText.textContent = "Copiado com sucesso!";
                setTimeout(() => {
                    copyBtn.classList.remove("copied");
                    copyText.textContent = "Copiar código";
                }, 2000);
            });
        });

        const toggleCompleteBtn = document.getElementById("btn-toggle-complete");
        toggleCompleteBtn.addEventListener("click", () => {
            toggleStepCompletion(stage.id);
        });

        const prevBtn = document.getElementById("btn-prev-step");
        if (prevBtn) {
            prevBtn.addEventListener("click", () => goToStep(state.currentStepIndex - 1));
        }

        const backHomeBtn = document.getElementById("btn-back-home");
        if (backHomeBtn) {
            backHomeBtn.addEventListener("click", () => switchView("home"));
        }

        const nextBtn = document.getElementById("btn-next-step");
        if (nextBtn) {
            nextBtn.addEventListener("click", () => goToStep(state.currentStepIndex + 1));
        }

        const finishGlossaryBtn = document.getElementById("btn-finish-glossary");
        if (finishGlossaryBtn) {
            finishGlossaryBtn.addEventListener("click", () => switchView("glossary"));
        }
    }

    // Renderizar o Glossário
    function renderGlossary() {
        const query = elements.glossarySearch ? elements.glossarySearch.value.toLowerCase().trim() : "";
        const category = elements.glossaryCategory ? elements.glossaryCategory.value : "all";

        const filtered = TUTORIAL_DATA.glossary.filter(item => {
            const matchesQuery = item.term.toLowerCase().includes(query) ||
                item.definition.toLowerCase().includes(query) ||
                item.example.toLowerCase().includes(query);
            const matchesCategory = (category === "all") || (item.category === category);
            return matchesQuery && matchesCategory;
        });

        if (filtered.length === 0) {
            elements.glossaryGrid.innerHTML = `
                <div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: var(--text-muted);">
                    Nenhum termo encontrado. Tente buscar por palavras como 'Classe', 'Construtor' ou 'Encapsulamento'.
                </div>
            `;
            return;
        }

        elements.glossaryGrid.innerHTML = filtered.map(item => `
            <div class="glossary-card">
                <div class="glossary-category">${item.category}</div>
                <h3 class="glossary-term">${item.term}</h3>
                <p class="glossary-def">${item.definition}</p>
                <div class="glossary-example">
                    <strong>Exemplo Prático:</strong> ${item.example}
                </div>
            </div>
        `).join("");
    }

    // Monitorar Mudanças na URL (Hash Change)
    function handleHashChange() {
        const hash = window.location.hash;
        if (hash.startsWith("#etapa-")) {
            const id = parseInt(hash.replace("#etapa-", ""), 10);
            const index = TUTORIAL_DATA.stages.findIndex(s => s.id === id);
            if (index !== -1) {
                state.currentStepIndex = index;
                switchView("step");
                return;
            }
        } else if (hash === "#glossario") {
            switchView("glossary");
            return;
        }
        switchView("home");
    }

    // Configuração dos Eventos Globais
    function setupEventListeners() {
        // Alternar Tema
        elements.themeToggleBtn.addEventListener("click", () => {
            const nextTheme = state.theme === "dark" ? "light" : "dark";
            applyTheme(nextTheme);
        });

        // Menu Mobile
        elements.mobileMenuBtn.addEventListener("click", () => {
            elements.sidebar.classList.toggle("open");
        });

        // Links de Navegação do Cabeçalho
        elements.navLinks.forEach(link => {
            link.addEventListener("click", (e) => {
                e.preventDefault();
                const view = link.dataset.view;
                if (view === "step") {
                    goToStep(state.currentStepIndex);
                } else {
                    switchView(view);
                }
            });
        });

        // Filtro do Glossário
        if (elements.glossarySearch) {
            elements.glossarySearch.addEventListener("input", renderGlossary);
        }
        if (elements.glossaryCategory) {
            elements.glossaryCategory.addEventListener("change", renderGlossary);
        }

        // Navegação por Teclado (Setas)
        window.addEventListener("keydown", (e) => {
            if (state.currentView === "step") {
                if (e.key === "ArrowRight" && state.currentStepIndex < TUTORIAL_DATA.stages.length - 1) {
                    goToStep(state.currentStepIndex + 1);
                } else if (e.key === "ArrowLeft" && state.currentStepIndex > 0) {
                    goToStep(state.currentStepIndex - 1);
                }
            }
        });

        // Botões da Home
        const startBtn = document.getElementById("btn-start-tutorial");
        if (startBtn) {
            startBtn.addEventListener("click", () => goToStep(0));
        }

        const openGlossaryBtn = document.getElementById("btn-home-glossary");
        if (openGlossaryBtn) {
            openGlossaryBtn.addEventListener("click", () => switchView("glossary"));
        }

        window.addEventListener("hashchange", handleHashChange);
    }

    // Executar
    init();
})();
