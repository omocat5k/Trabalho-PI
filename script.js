// --- MARCO M4: Destaque do menu de navegação ao rolar a página ---
const navLinks = document.querySelectorAll('body > div:nth-of-type(2) a');
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

const ulDireitos = document.getElementById('lista-direitos');

if (ulDireitos) {
    listaDireitosData.forEach((direito) => {
        const li = document.createElement('li');
        li.textContent = direito;
        ulDireitos.appendChild(li);
    });
}


// --- INTERATIVIDADE: Clique para destacar as imagens ---
const imagensInterativas = document.querySelectorAll('.img-interativa');

imagensInterativas.forEach((img) => {
    img.addEventListener('click', () => {
        img.classList.toggle('destaque-imagem');
    });
});


// --- NOVO: SIMULADOR COM OBJETO MATH ---
const btnCalcular = document.getElementById('btnCalcular');
const resultadoSimulador = document.getElementById('resultadoSimulador');

if (btnCalcular) {
    btnCalcular.addEventListener('click', () => {
        const salarioHomem = parseFloat(document.getElementById('salarioHomem').value) || 0;
        const salarioMulher = parseFloat(document.getElementById('salarioMulher').value) || 0;
        const taxaEvolucao = parseFloat(document.getElementById('taxaEvolucao').value) || 0.1;

        // 1. Math.abs: Diferença salarial mensal absoluta
        const diferencaMensal = Math.abs(salarioHomem - salarioMulher);
        const diferencaAnual = diferencaMensal * 13.3; // Inclui 13º e férias

        // 2. Math.pow: Projeção de impacto acumulado com rendimento em 30 anos (Juros de 5% a.a.)
        const anos = 30;
        const taxaJuros = 0.05;
        const perdaAcumulada30Anos = diferencaAnual * ((Math.pow(1 + taxaJuros, anos) - 1) / taxaJuros);

        // 3. Math.log & Math.ceil: Projeção logarítmica de anos para fechar a lacuna
        let anosParaIgualdade = 0;
        if (salarioHomem > salarioMulher && taxaEvolucao > 0) {
            const raz = salarioHomem / salarioMulher;
            const tx = 1 + (taxaEvolucao / 100);
            anosParaIgualdade = Math.ceil(Math.log(raz) / Math.log(tx));
        }

        // 4. Math.round: Formatação dos números finais
        const diferencaMensalArred = Math.round(diferencaMensal);
        const perdaAcumuladaArred = Math.round(perdaAcumulada30Anos);

        resultadoSimulador.innerHTML = `
            <p><strong>Diferença Salarial Mensal Absoluta :</strong> R$ ${diferencaMensalArred.toLocaleString('pt-BR')}</p>
            <p><strong>Perda de Carreira Acumulada em 30 Anos com Juros Compostos :</strong> ~ R$ ${perdaAcumuladaArred.toLocaleString('pt-BR')}</p>
            <p><strong>Estimativa para Alcançar a Paridade Salarial :</strong> ${anosParaIgualdade > 0 ? `<strong>${anosParaIgualdade} anos</strong> (mantendo a taxa de +${taxaEvolucao}% a.a.)` : 'Paridade alcançada ou parâmetros inválidos.'}</p>
        `;
    });
}


// --- NOVO: FILTROS DINÂMICOS PARA HISTÓRIAS ---
const historiasData = [
    {
        nome: "Frida Kahlo",
        categoria: "arte",
        categoriaNome: "Arte & Cultura",
        descricao: "Lutou pela liberdade de expressão das mulheres através da arte e rompeu padrões visuais de sua época.",
        imagem: "IMG/imgfrida.jpeg"
    },
    {
        nome: "Marie Curie",
        categoria: "ciencia",
        categoriaNome: "Ciência & Tecnologia",
        descricao: "Cientista pioneira no estudo da radioatividade, primeira pessoa a ganhar dois Prémios Nobel em áreas diferentes.",
        imagem: "IMG/imgmarie.jpeg"
    },
    {
        nome: "Dandara dos Palmares",
        categoria: "direitos",
        categoriaNome: "Direitos Humanos",
        descricao: "Lutou contra a escravidão no Brasil e defendeu a liberdade total no Quilombo dos Palmares.",
        imagem: "IMG/imgpalmares.jpeg"
    },
    {
        nome: "Ada Lovelace",
        categoria: "ciencia",
        categoriaNome: "Ciência & Tecnologia",
        descricao: "Matemática e primeira programadora da história, escreveu o primeiro algoritmo para ser processado por uma máquina.",
        imagem: "IMG/imgada.jpeg"
    },
    {
        nome: "Rosa Parks",
        categoria: "direitos",
        categoriaNome: "Direitos Humanos",
        descricao: "Símbolo do movimento dos direitos civis nos EUA ao se recusar a ceder seu assento no ônibus em um ato contra a segregação.",
        imagem: "IMG/img1.jpeg"
    }
];

const gridHistorias = document.getElementById('gridHistorias');
const filtroTexto = document.getElementById('filtroTexto');
const filtroCategoria = document.getElementById('filtroCategoria');

function renderizarHistorias() {
    if (!gridHistorias) return;

    const texto = filtroTexto ? filtroTexto.value.toLowerCase() : '';
    const categoria = filtroCategoria ? filtroCategoria.value : 'todos';

    // Aplicação do método .filter()
    const historiasFiltradas = historiasData.filter(h => {
        const bateComTexto = h.nome.toLowerCase().includes(texto) || h.descricao.toLowerCase().includes(texto);
        const bateComCategoria = categoria === 'todos' || h.categoria === categoria;
        return bateComTexto && bateComCategoria;
    });

    gridHistorias.innerHTML = '';

    if (historiasFiltradas.length === 0) {
        gridHistorias.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--ink-soft);">Nenhuma história encontrada com esses parâmetros de filtro.</p>';
        return;
    }

    historiasFiltradas.forEach(h => {
        const card = document.createElement('div');
        card.className = 'card-historia';
        card.innerHTML = `
            <img src="${h.imagem}" alt="${h.nome}" class="img-interativa">
            <span class="categoria-badge">${h.categoriaNome}</span>
            <h2>${h.nome}</h2>
            <p>${h.descricao}</p>
        `;
        
        // Reatribuição do evento de clique na imagem
        const img = card.querySelector('.img-interativa');
        img.addEventListener('click', () => {
            img.classList.toggle('destaque-imagem');
        });

        gridHistorias.appendChild(card);
    });
}

// Event Listeners dos Filtros
if (filtroTexto) filtroTexto.addEventListener('input', renderizarHistorias);
if (filtroCategoria) filtroCategoria.addEventListener('change', renderizarHistorias);

// Renderização inicial ao carregar a página
renderizarHistorias();