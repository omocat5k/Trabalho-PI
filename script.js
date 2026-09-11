// --- MARCO M4: Destaque do menu de navegação ao rolar a página ---
const navLinks = document.querySelectorAll('body > div:nth-of-type(even) a');
const sections = document.querySelectorAll('section[id]');

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => {
            link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
        });
    });
}, { rootMargin: '-45% 0px -50% 0px' });

sections.forEach((section) => observer.observe(section));


// --- MARCO M5: Gestão de Dados com Arrays e Manipulação do DOM ---

// 1. Definição do Array de dados (Direitos Garantidos)
const listaDireitosData = [
    "Direito ao voto feminino.",
    "Direito das mulheres à educação.",
    "Direito de trabalhar e exercer uma profissão.",
    "Direito de receber salário pelo próprio trabalho.",
    "Direito à igualdade perante a lei.",
    "Direito de participar da política e ocupar cargos públicos.",
    "Direito à propriedade e à administração de seus próprios bens.",
    "Direito ao divórcio.",
    "Direito à proteção contra violência doméstica.",
    "Direito à licença-maternidade e à proteção no trabalho durante a gravidez.",
    "Direito de frequentar universidades e instituições de ensino.",
    "Direito de denunciar e combater o assédio sexual."
];

// 2. Seleção do elemento pai no DOM
const ulDireitos = document.getElementById('lista-direitos');

// 3. Renderização dinâmica da lista usando o método forEach()
if (ulDireitos) {
    listaDireitosData.forEach((direito) => {
        const li = document.createElement('li');
        li.textContent = direito;
        ulDireitos.appendChild(li);
    });
}


// --- INTERATIVIDADE: Ação de clique para destacar as imagens ---
const imagensInterativas = document.querySelectorAll('.img-interativa');

imagensInterativas.forEach((img) => {
    img.addEventListener('click', () => {
        // Alterna a classe visual de destaque no elemento clicado
        img.classList.toggle('destaque-imagem');
    });
});
