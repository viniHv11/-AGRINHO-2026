
// Aguarda o DOM (HTML) carregar completamente antes de executar a lógica
document.addEventListener("DOMContentLoaded", () => {
    
    /* ==========================================================================
       1. VALIDAÇÃO INTELIGENTE DO FORMULÁRIO DE CONTATO
       ========================================================================== */
    const form = document.getElementById("form-contato");
    const feedbackForm = document.getElementById("feedback-form");

    if (form) {
        form.addEventListener("submit", (event) => {
            const nome = document.getElementById("nome").value.trim();
            const email = document.getElementById("email").value.trim();
            const mensagem = document.getElementById("mensagem").value.trim();

            // Reseta estilos do feedback
            feedbackForm.style.display = "block";
            feedbackForm.style.color = "red";

            // Validação simples de segurança caso o HTML falhe
            if (nome === "" || email === "" || mensagem === "") {
                event.preventDefault(); // Impede o envio do formulário
                feedbackForm.textContent = "⚠️ Por favor, preencha todos os campos obrigatórios.";
                return;
            }

            // Validação de formato de e-mail via Expressão Regular (Regex)
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                event.preventDefault();
                feedbackForm.textContent = "⚠️ Por favor, insira um e-mail válido.";
                return;
            }

            // Se tudo estiver correto, exibe mensagem de sucesso antes de abrir o cliente de e-mail
            feedbackForm.style.color = "#2e7d32"; // Verde agro
            feedbackForm.textContent = "🌱 Mensagem validada com sucesso! Abrindo seu gerenciador de e-mail...";
            
            // Opcional: Limpar o formulário após alguns segundos
            setTimeout(() => {
                form.reset();
                feedbackForm.style.display = "none";
            }, 5000);
        });
    }

    /* ==========================================================================
       2. ANIMAÇÃO AO ROLAR A PÁGINA (SCROLL REVEAL EFFECT)
       ========================================================================== */
    const sections = document.querySelectorAll(".scroll-animation");

    // Configuração inicial de estilo via JS para criar o efeito de fade-in/slide
    sections.forEach(section => {
        section.style.opacity = "0";
        section.style.transform = "translateY(30px)";
        section.style.transition = "opacity 0.8s ease-out, transform 0.8s ease-out";
    });

    // Utilizando a API IntersectionObserver para detectar quando as seções aparecem na tela
    const appearanceObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                target.style.opacity = "1";
                target.style.transform = "translateY(0)";
                observer.unobserve(target); // Para de observar a seção após ela já ter aparecido
            }
        });
    }, {
        threshold: 0.15 // Dispara a animação quando 15% da seção estiver visível
    });

    sections.forEach(section => {
        appearanceObserver.observe(section);
    });

    /* ==========================================================================
       3. DESTAQUE DINÂMICO NO MENU DE NAVEGAÇÃO (ACTIVE LINK)
       ========================================================================== */
    const navLinks = document.querySelectorAll(".nav-link");
    const allSections = document.querySelectorAll("section");

    window.addEventListener("scroll", () => {
        let currentSectionId = "";

        allSections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            // Verifica se a rolagem atual da página está sobre a seção
            if (window.scrollY >= (sectionTop - sectionHeight / 3)) {
                currentSectionId = section.getAttribute("id");
            }
        });

        // Aplica uma classe visual ou estilo diretamente no link ativo do menu
        navLinks.forEach(link => {
            link.style.backgroundColor = "transparent";
            link.style.color = "#ffffff"; // Cor padrão do cabeçalho

            if (link.getAttribute("href") === `#${currentSectionId}`) {
                link.style.backgroundColor = "#a5d6a7"; // Cor de destaque (Verde claro)
                link.style.color = "#1b5e20";         // Texto escuro para contraste
            }
        });
    });
});
