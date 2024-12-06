// Define page internal
let url = window.location.pathname;
if (url !== '/') {
    document.getElementsByTagName('body')[0].classList.add('interna');
}

/* Header */
document.addEventListener('scroll', (event) => {
    let header = document.getElementsByTagName('header');
    if (header && window.pageYOffset > header[0].offsetHeight) {
        header[0].classList.add('fixo');
    } else {
        header[0].classList.remove('fixo');
    }
})

/* Slider */
if (document.querySelector('.slider__principal')) {
    let slider = new Splide( '.slider__principal', {
        type: 'loop',
        autoplay: true,
        pagination: false
    });
    slider.mount();
}

/* Segmentos */
if (document.querySelector('.segmentos__splide')) {
    var segmentos = new Splide( '.segmentos__splide', {
        perPage: 3,
        rewind : true,
        type: 'loop',
        autoplay: true,
        interval: 2000,
        type: 'loop',
        gap: '15px',
        focus: 'center',
        isNavigation: true,
        breakpoints: {
            768: {
                destroy: true,
            },
        }
    });
    segmentos.mount();

    function loopInItems() {
        var loop = document.querySelectorAll('.segmentos__item');
        loop.forEach(function(segmento) {            

            segmento.classList.remove('ativo');

            if (segmento.classList.contains('is-active')) {
                let atual = segmento.getAttribute('data-id');
                let url = '/static/img/exemplo-segmentos-'+ atual +'.jpg';
                document.getElementById('imagemModelo').src = url;
                segmento.classList.add('ativo');
            }
        })
    }

    function navMobile() {
        // Clicks mobile
        var itemsMobile = document.querySelectorAll('.segmentos__item');
        itemsMobile.forEach(function(item) {   
            item.addEventListener('click', function() {

                itemsMobile.forEach(function(item) {
                    item.classList.remove('ativo');
                })

                item.classList.add('ativo');

                let atual = item.getAttribute('data-id');
                let url = '/static/img/exemplo-segmentos-'+ atual +'.jpg';
                document.getElementById('imagemModelo').src = url;
                item.classList.add('ativo');
            })
        })
    }
    
    segmentos.on( 'moved', function () {
        loopInItems();
    });
    
    window.addEventListener("resize", function() {
        if (window.innerWidth < 768) { navMobile(); }                          
    })

    window.addEventListener("load", function() {
        if (window.innerWidth < 768) { navMobile(); }                 
    })
}

/* Video Home */
let iframe = '<iframe preload="none" width="560" height="315" src="https://www.youtube-nocookie.com/embed/Y5SDgrY5wMo?rel=0&autoplay=1&controles=0&modestbranding=0&loop=0" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>';
let container__iframe = document.querySelector('.place__video');
if  (container__iframe) {
    container__iframe.addEventListener('click', function() {
        container__iframe.innerHTML = iframe;
    })
}

/* Mockup */
let containerVideo = document.querySelector('section.agilize video');
let videoMockup = '<source src="/static/video/cardapex-video-novo-abril-2023.mp4" type="video/mp4">';
let sectionVideo = document.querySelector('section.agilize');
if (sectionVideo) {
    document.addEventListener("scroll", (event) => {
        if (sectionVideo.getBoundingClientRect().top <= 200) {
            containerVideo.innerHTML = videoMockup;
        }
    })
}

/* Recursos */
if (document.querySelector('.recursos__splide')) {
    let recursos = new Splide( '.recursos__splide', {
        perPage: 5,
        perMove: 1,
        autoplay: true,
        type: 'loop',
        interval: 2000,
        gap: '15px',
        breakpoints: {
            1140: {
                perPage: 3
            },
            768: {
                perPage: 1
            },
        }
    });
    recursos.mount();
}

/* Clientes */
if (document.querySelector('.clientes__splide')) {
    let clientes = new Splide( '.clientes__splide', {
        perPage: 6,
        rewind : true,
        gap: '15px',
        breakpoints: {
            768: {
                perPage: 2
            },
        }
    });
    clientes.mount();
}

/* Depoimentos */
if (document.querySelector('.depoimentos_splide')) {
    let depoimentos = new Splide( '.depoimentos_splide', {
        perPage: 1,
    });
    depoimentos.mount();
}


/* Exemplos */
if (document.querySelector('.exemplos__splide')) {
    let exemplos = new Splide( '.exemplos__splide', {
        perPage: 5,
        perMove: 1,
        // rewind : true,
        type: 'loop',
        interval: 2000,
        autoplay: true,
        gap: '15px',
        breakpoints: {
            768: {
                perPage: 2
            },
        }
    });
    exemplos.mount();
}

/* Formulário */
let inputs = document.querySelectorAll('#contato input');
if (inputs) {
    inputs.forEach(function(input) {
        input.addEventListener('focusout', (element) => {
            if (input.value.length >= 1) {
                input.classList.add('valid');
            } else {
                input.classList.remove('valid');
            }
        })
    })
}

/* Máscara para campo de telefone */
if (document.querySelector('#form__telefone')) {
    const element = document.querySelector('#form__telefone')
    const maskOptions = {
        mask: [
            {
                mask: '(00) 0000-0000'
            },
            {
                mask: '(00) 00000-0000',
            }
        ]
    }
    var mask = IMask(element, maskOptions);
}  

/* Blog */
if (document.querySelector('.blog')) {
    document.querySelector('.blog__list').innerHTML = '<img src="static/img/loading.gif" style="display:block; width:50px; margin:auto; position:absolute; left:50%; margin-left:-25px">';
    function fetchPosts() {
        fetch('https://blog.cardapex.com.br/wp-json/wp/v2/posts?orderby=rand')
        .then((response) => response.json())
        .then((data) => {
            var contador = 0;
            var items = '';
            for (const post of data) {
                if (contador <= 2) {
                    items += `
                        <li class="blog__item">
                            <a href="${post.link}" target="_blank" rel="noopener noreferrer"></a>
                            <img src="${post.fimg_url}" alt="">
                            <div class="content__item">
                                <h4>${post.title.rendered}</h4>
                                <button><span>+</span> ver mais</button>
                            </div>                    
                        </li>
                    `;   
                }
                contador++;
                document.querySelector('.blog__list').innerHTML = items;
            }
        }).catch(function(error) {
            console.log(error);
        });
    }

    setTimeout(() => {
        fetchPosts();
    }, 1000);    
}

/* Motivos */
motivos = document.querySelectorAll('.nav__motivos li');
motivos.forEach(motivo => {
    motivo.addEventListener('click', function() {

        motivos.forEach(motivo => {
            motivo.classList.remove('ativo');
        })

        var title = motivo.getAttribute('data-title');
        var subtitle = motivo.getAttribute('data-subtitle');
        var link = motivo.getAttribute('data-link');
        var img = motivo.getAttribute('data-img');
        
        motivo.classList.toggle('ativo');

        if (img) { document.querySelector('.content__motivos img').src = img; }
        if (title) { document.querySelector('.right__motivos h4').innerHTML = title; }
        if (subtitle) { document.querySelector('.right__motivos p').innerHTML = subtitle; }
        if (link) { document.querySelector('.right__motivos a').href = link; }
    })
});

/* Duvidas */
duvidas = document.querySelectorAll('.duvivas__box li');
duvidas.forEach(duvida => {    
    duvida.addEventListener('click', function() {
        duvidas.forEach(item => {
            if (duvida !== item) item.classList.remove('ativo');
        })
        duvida.classList.toggle('ativo');
    })
});

/* Menu Responsivo */
let menu = document.querySelector('.responsivo__menu');
let close__menu = document.querySelector('.responsivo__menu .close__menu');
let open__menu = document.querySelector('header .open__menu');
let itens_menu = document.querySelectorAll('.reponsivo__nav a');
let itens_institucional = document.querySelectorAll('.responsivo__inst a');
if (menu && close__menu && open__menu) {
    close__menu.addEventListener('click', function() {
        menu.style.left = '-100%';
        document.getElementsByTagName('body')[0].style.overflow = 'initial';
    })
    open__menu.addEventListener('click', function() {
        menu.style.left = '0';
        document.getElementsByTagName('body')[0].style.overflow = 'hidden';
    })
}

if (menu) {
    itens_menu.forEach(item => {
        item.addEventListener('click', function() {
            menu.style.left = '-100%';
            document.getElementsByTagName('body')[0].style.overflow = 'initial';
        })
    })

    itens_institucional.forEach(inst => {
        inst.addEventListener('click', function() {
            menu.style.left = '-100%';
            document.getElementsByTagName('body')[0].style.overflow = 'initial';
        })
    })
}



/* Planos */
let opcoes = document.querySelectorAll('.selecao__planos .opcoes a');
if (opcoes) {
    opcoes.forEach(opcao => {
        opcao.addEventListener('click', function(e) {
            e.preventDefault();
            opcoes.forEach(opcao => {
                opcao.classList.remove('ativo');
            })
            this.classList.add('ativo');
            updatePlans(opcao.getAttribute('data-update'));
            updateFormat(opcao.getAttribute('data-update'));
        })
    });
}

function updateFormat(option) {
    let formats = document.querySelectorAll('.plano__box .plano__box-por span');
    formats.forEach(format => {
        switch (option) {
            case 'mensal':
                format.textContent = '/mês';
            break;
            case 'semestral':
                format.textContent = '/semestre';
            break;
            case 'anual':
                format.textContent = '/ano';
            break;
        }
    });
    
}

function updatePlans(option) {
    // De
    let de_1 = document.querySelector('#plano-1 .plano__box-de');
    let de_2 = document.querySelector('#plano-2 .plano__box-de');
    let de_3 = document.querySelector('#plano-3 .plano__box-de');

    // Por 
    let por_1 = document.querySelector('#plano-1 .plano__box-por strong');
    let por_2 = document.querySelector('#plano-2 .plano__box-por strong');
    let por_3 = document.querySelector('#plano-3 .plano__box-por strong');

    // Economia 
    let economia_1 = document.querySelector('#plano-1 .plano__box-economia span');
    let economia_2 = document.querySelector('#plano-2 .plano__box-economia span');
    let economia_3 = document.querySelector('#plano-3 .plano__box-economia span');

    switch (option) {
        case 'mensal':
            // De
            de_1.textContent = 'De R$ 69,00';
            de_2.textContent = 'De R$ 119,00';
            de_3.textContent = 'De R$ 209,00';

            // Por
            por_1.textContent = '59';
            por_2.textContent = '99';
            por_3.textContent = '189';

            // Economia
            economia_1.textContent = 'R$ 10,00';
            economia_2.textContent = 'R$ 20,00';
            economia_3.textContent = 'R$ 20,00';
        break;
        case 'semestral':
            // De
            de_1.textContent = 'De R$ 414,00';
            de_2.textContent = 'De R$ 714,00';
            de_3.textContent = 'De R$ 1.254,00';

            // Por
            por_1.textContent = '319';
            por_2.textContent = '534';
            por_3.textContent = '1.019';

            // Economia
            economia_1.textContent = 'R$ 95,00';
            economia_2.textContent = 'R$ 180,00';
            economia_3.textContent = 'R$ 235,00';
        break;
        case 'anual':
            // De
            de_1.textContent = 'De R$ 828,00';
            de_2.textContent = 'De R$ 1.428,00';
            de_3.textContent = 'De R$ 2.508,00';

            // Por
            por_1.textContent = '566';
            por_2.textContent = '949';
            por_3.textContent = '1.814';

            // Economia
            economia_1.textContent = 'R$ 262,00';
            economia_2.textContent = 'R$ 479,00';
            economia_3.textContent = 'R$ 694,00';
        break;
    }
}