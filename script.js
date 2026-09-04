// link da seção visível
const navLinks = document.querySelectorAll('body > div:nth-of-type(even) a');
const sections = document.querySelectorAll('section[id]');

const observer = new IntersectionObserver((entries) => { //detecta quando um elemento entra ou sai de uma determinada região visível da tela
    entries.forEach((entry) => { //entries: contém as informações sobre os elementos que tiveram alguma mudança de visibilidade, entry: representa uma seção observada
        if (!entry.isIntersecting) return; //informa se o elemento está intersectando a área definida pelo observer.
        navLinks.forEach((link) => { //percorre todos os links encontrados anteriormente.
            link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`); //coloca a classe active no link que corresponde à seção que está aparecendo na tela
        });
    });
}, { rootMargin: '-45% 0px -50% 0px' }); //modifica a área que o IntersectionObserver considera visível

sections.forEach((section) => observer.observe(section)); //observer: observa todas as sections