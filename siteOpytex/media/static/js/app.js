var vendasModalOn = false;
$("#vendas-btn").on("click", function () {
  console.log("click");
  if (!vendasModalOn) {
    $(this).next().fadeIn();
    $("#cliente-btn").next().fadeOut();
    vendasModalOn = true;
  } else {
    console.log("else");
    $(this).next().fadeOut();
    vendasModalOn = false;
  }
});

var ClienteModalOn = false;
$("#cliente-btn").on("click", function () {
  console.log("click");
  if (!ClienteModalOn) {
    $(this).next().fadeIn();
    $("#vendas-btn").next().fadeOut();
    ClienteModalOn = true;
  } else {
    console.log("else");
    $(this).next().fadeOut();
    ClienteModalOn = false;
  }
});

const images = document.querySelectorAll("[data-src]");
// const imagesSources = document.querySelector("[data-srcset]");
const imagesSources = document.querySelectorAll("[data-srcset]");

function preloadImage(img) {
  const src = img.getAttribute("data-src");
  if (!src) {
    return;
  }

  img.src = src;
}

const imgOptions = {
  therehold: 1,
  rootMargin: "0px 0px 700px 0px",
};

function preloadImageSource(source) {
  // const srcset = source.getAttribute("data-srcset");
  const srcset = source.dataset.srcset;
  if (!srcset) {
    return;
  }

  source.srcset = srcset;
}

const imgObserver = new IntersectionObserver((entries, imgObserver) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      return;
    } else {
      preloadImage(entry.target);
      imgObserver.unobserve(entry.target);
    }
  });
}, imgOptions);

const sourceImgObserver = new IntersectionObserver((entries, imgObserver) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      return;
    } else {
      preloadImageSource(entry.target);
      imgObserver.unobserve(entry.target);
    }
  });
}, imgOptions);

images.forEach((image) => {
  imgObserver.observe(image);
});

imagesSources.forEach((source) => {
  //         let slideItemsNumber = document.querySelector('#customers-testimonials').children.length;
  sourceImgObserver.observe(source);
});

// function testeTranslate(){
//         let slideItemWidth = document.querySelector('#customers-testimonials').children[0].offsetWidth;
//         slideItemWidth += 10;
//         let slideWidth = slideItemWidth * slideItemsNumber;
//         console.log(slideWidth);
//         testeTranslateWidth -= slideItemWidth;
//         console.log('testeTranslateWidth'+ testeTranslateWidth)
//         console.log('slideWidth'+ slideWidth)
//         console.log('negative number ' + -Math.abs(slideWidth))

//         if (testeTranslateWidth <= (-Math.abs(slideWidth))){
//             $(".home-section-stories__testimonial-card").css('transform', 'translate3d(0, 0, 0)');
//             testeTranslateWidth = 0;
//         }else{
//             $(".home-section-stories__testimonial-card").css('transform', 'translate3d('+ testeTranslateWidth + 'px, 0, 0)');
//         }
// }

//Handle slide
const UICtrl = (function () {
  let translateWidth = 0;
  const tertimonialCard = $(".home-section-stories__testimonial-card");
  let cardsList = document.querySelectorAll(
    ".home-section-stories__testimonial-card"
  );
  let activeCard = cardsList[0];
  let activeClass = "home-section-stories__testimonial-card--active";

  const activateCards = function (activateDirection) {
    if (activateDirection == "left") {
      activeCard.nextElementSibling.classList.add(activeClass);
    } else if (activateDirection == "right") {
      activeCard.previousElementSibling.classList.add(activeClass);
    }
  };

  const animateSlide = function (direction) {
    let slideItemWidth = document.querySelector("#customers-testimonials")
      .children[0].offsetWidth;
    slideItemWidth += parseFloat(
      $(".home-section-stories__testimonial-card").css("margin-right")
    );
    let slideItemsNumber = document.querySelector("#customers-testimonials")
      .children.length;
    let slideWidth = slideItemWidth * (slideItemsNumber - 1);

    if (translateWidth <= -Math.abs(slideWidth)) {
      tertimonialCard.css("transform", "translate3d(0, 0, 0)");
      translateWidth = 0;
      cardsList.forEach((el) => {
        if (el.classList.contains(activeClass)) {
          el.classList.remove(activeClass);
        }
      });
      activeCard = cardsList[0];
      activeCard.classList.add(activeClass);
    } else {
      if (direction == "left") {
        translateWidth -= slideItemWidth;
        tertimonialCard.css(
          "transform",
          "translate3d(" + translateWidth + "px, 0, 0)"
        );
        activateCards("left");
        activeCard.classList.remove(activeClass);
        cardsList.forEach((el) => {
          if (el.classList.contains(activeClass)) {
            activeCard = el;
          }
        });
      } else if (direction == "right") {
        translateWidth =
          translateWidth < 0 ? translateWidth + slideItemWidth : 0;
        tertimonialCard.css(
          "transform",
          "translate3d(" + translateWidth + "px, 0, 0)"
        );
        activateCards("right");
        activeCard.classList.remove(activeClass);
        cardsList.forEach((el) => {
          if (el.classList.contains(activeClass)) {
            activeCard = el;
          }
        });
      }
    }
  };

  return {
    callAnimateSlide: function (direction) {
      animateSlide(direction);
    },
  };
})();

//Handle slide thumbnail
$(function () {
  $(".imgLiquidFill").imgLiquid({
    fill: true,
    horizontalAlign: "center",
    verticalAlign: "top",
  });
  $(".imgLiquidNoFill").imgLiquid({
    fill: false,
    horizontalAlign: "center",
    verticalAlign: "50%",
  });
});

//Control left arrow
let leftArrow = document.querySelector("#slide-btn-scroll-to-left");
if (leftArrow) {
  leftArrow.addEventListener("click", function () {
    UICtrl.callAnimateSlide("left");
  });
}
//Control Right arrow
let rightArrow = document.querySelector("#slide-btn-scroll-to-right");
if (rightArrow) {
  rightArrow.addEventListener("click", function () {
    UICtrl.callAnimateSlide("right");
  });
}

//Handle navigation features
const navBar = document.querySelector("#nav-bar");

// const navBarOptions = {};
// const navBarObserver = new IntersectionObserver(function (entries, observer) {
//   entries.forEach((entry) => {
//     if (!entry.isIntersecting) {
//       navBar.classList.add("header__nav-bar--dymanic");
//     }
//   });
// }, navBarOptions);
// navBarObserver.observe(navBar);

window.addEventListener("scroll", function () {
  if (window.pageYOffset >= 150) {
    navBar.classList.add("header__nav-bar--dymanic");
    // navBar.classList.add('header--return')
  }
});

window.addEventListener("scroll", function () {
  if (window.pageYOffset <= 150) {
    navBar.classList.remove("header__nav-bar--dymanic");
    // navBar.classList.add('header--return')
  }
});

//Handle navigation
meuarray = window.location.href.split("/");
pathHome = window.location.host;

switch (meuarray[meuarray.length - 2]) {
  case pathHome:
    $("#inicial").addClass("main-nav-link--active");
    $("#inicial").parent().addClass("header-nav__item--active");
    $("#footer-inicial").addClass("footer__nav__link--active");
    $("#mobile-inicial").addClass("mobile-nav__item--active");
    break;
  case "sobre":
    $("#sobre").addClass("main-nav-link--active");
    $("#sobre").parent().addClass("header-nav__item--active");
    $("#footer-sobre").addClass("footer__nav__link--active");
    $("#mobile-sobre").addClass("mobile-nav__item--active");
    break;
  case "produtos":
    $("#produtos").addClass("main-nav-link--active");
    $("#produtos").parent().addClass("header-nav__item--active");
    $("#footer-produtos").addClass("footer__nav__link--active");
    $("#mobile-produtos").addClass("mobile-nav__item--active");
    break;
  case "blog":
    $("#blog").addClass("main-nav-link--active");
    $("#blog").parent().addClass("header-nav__item--active");
    $("#footer-blog").addClass("footer__nav__link--active");
    $("#mobile-blog").addClass("mobile-nav__item--active");
    break;
  case "material":
    $("#material").addClass("main-nav-link--active");
    $("#material").parent().addClass("header-nav__item--active");
    $("#footer-material").addClass("footer__nav__link--active");
    $("#mobile-material").addClass("mobile-nav__item--active");
    break;
  case "parcerias":
    $("#parcerias").addClass("main-nav-link--active");
    $("#parcerias").parent().addClass("header-nav__item--active");
    $("#footer-parcerias").addClass("footer__nav__link--active");
    $("#mobile-parcerias").addClass("mobile-nav__item--active");
    break;
  case "contato":
    $("#contato").addClass("main-nav-link--active");
    $("#contato").parent().addClass("header-nav__item--active");
    $("#footer-contato").addClass("footer__nav__link--active");
    $("#mobile-contato").addClass("mobile-nav__item--active");
    break;
}

const uploadInput = document.querySelector("#fileToUpload");
const uploadInputName = document.querySelector("#fileToUploadName");

$("#fileToUpload").on("change", function () {
  fileToUploadName.textContent = uploadInput.files[0].name;
});

// const toggleMenu = document.querySelector('#toggle-menu')
// const menuModal = document.querySelector('.mobile-nav__modal')
// let menuModalState = false;
// const openClass = 'mobile-nav__modal--open'
// const closeClass = 'mobile-nav__modal--close'
// toggleMenu.addEventListener('click touchstart', function(){
//     if(menuModalState == false){
//         menuModal.classList.add(openClass)
//         menuModal.classList.remove(closeClass)
//         menuModalState = true
//     }else{
//         menuModal.classList.add(closeClass)
//         menuModal.classList.remove(openClass)
//         menuModalState = false
//     }
// })

let menuModalState = false;
$("#toggle-menu").on("click", function () {
  console.log("click");
  if (!menuModalState) {
    $(".mobile-nav__modal").fadeIn();
    $(".mobile-nav__menu-btn").addClass("mobile-nav__menu-btn--active");
    menuModalState = true;
    $("body").css("overflow", "hidden");
  } else {
    console.log("else");
    $(".mobile-nav__menu-btn").removeClass("mobile-nav__menu-btn--active");
    $(".mobile-nav__modal").fadeOut();
    menuModalState = false;
    $("body").css("overflow", "scroll");
  }
});

// Handle Footer click back to top
$("#footer-logo").on("click", function () {
  $("html, body").animate(
    {
      scrollTop: $(`html`).offset().top - 50,
    },
    1000
  );
});

// Handle Products Click
$(".solutions__btn").on("click", function (e) {
  if (meuarray[meuarray.length - 2] != window.location.host) {
    e.preventDefault();
    $("html, body").animate(
      {
        scrollTop: $(`#productsForm`).offset().top - 80,
      },
      1000
    );
  }
});

$(document).ready(function () {
  const slider = {
    _slideOptions: {
      timer: 4000,
      perc: 0,
    }}

  var startSlider = $("#lightSlider").lightSlider({
    auto: true,
    item: 1,
    loop: true,
    mode: "fade",
    pause: 8000,
    pager: false,
    controls: false,
    enableDrag: false,
    onSliderLoad: function () {
      setInterval(() => {
          
        $("#timeprogress").css(
          "stroke-dashoffset",
          `${144 - (144 * slider._slideOptions.perc/2 / 100)}`
        );
        if (slider._slideOptions.perc/2 === 100) {
          clearInterval(slider._loading);
          slider._slideOptions.perc = 0;
        } else {
          slider._slideOptions.perc = slider._slideOptions.perc + 1;
        }
      }, 40);
      $(".slider-controls-prev").click(function () {
        startSlider.goToPrevSlide();
      });
      $(".slider-controls-next").click(function () {
        startSlider.goToNextSlide();
      });
    },
    onBeforeSlide: function (el) {
      slider._slideOptions.perc = 0;
    },
    onBeforeStart: function () {
      var slideContent = [
        
        {
          heading:
            // 'Delivery, comanda e mesa <span class="main-title__blue-background">controlados</span> por você, na palma da sua mão.',
            'Sistemas para <span class="main-title__blue-background">Mercados</span>.',
          subHeading:
            "Realize suas vendas de forma prática e controle seu caixa com Conferência Cega e Extrato do dia com relatórios administrativos.",
          btn:
            '<a href="/produtos/#Shop" class="main-title-link u-mobile-display-block"> <span class="main-title-link__strip">&nbsp;</span> Conheça o Opytex Shop</a>',
        },
        {
          heading:
            // 'Delivery, comanda e mesa <span class="main-title__blue-background">controlados</span> por você, na palma da sua mão.',
            'Sistemas para <span class="main-title__blue-background">Food</span>.',
          subHeading:
            "Controle os consumos por Mesa/Comanda/Delivery com função para Fast Food e envie para produção.",
          btn:
            '<a href="/produtos/#Gourmet" class="main-title-link u-mobile-display-block"> <span class="main-title-link__strip">&nbsp;</span> Conheça o Opytex Gourmet</a>',
        },
         {
          heading:
            // 'Delivery, comanda e mesa <span class="main-title__blue-background">controlados</span> por você, na palma da sua mão.',
            'Sistemas para <span class="main-title__blue-background">Fast Food</span>.',
          subHeading:
            "Controle toda etapa dos pedidos recebidos pelo aplicativo iFood no sistema Opytex, de forma prática, em uma única tela.",
          btn:
            '<a href="/produtos/#iFood" class="main-title-link u-mobile-display-block"> <span class="main-title-link__strip">&nbsp;</span> Conheça o Opytex iFood</a>',
        },
        {
          // heading: 'Um sistema de <span class="main-title__blue-background">retaguarda</span> do seu negócio',
          heading:
            'Sistemas para <span class="main-title__blue-background">Serviços</span>.',
          subHeading:
            "Gerencie sua empresa ou rede de loja de qualquer lugar, online e/ou offline. Administre seus documentos fiscais na nuvem.",
          btn:
            '<a href="/produtos/#Gestor" class="main-title-link u-mobile-display-block"> <span class="main-title-link__strip">&nbsp;</span> Conheça o Opytex Gestor</a>',
        },
         {
          // heading: 'Um sistema de <span class="main-title__blue-background">retaguarda</span> do seu negócio',
          heading:
            'Sistemas para <span class="main-title__blue-background">Varejo</span>.',
          subHeading:
            "Gerencie sua empresa ou rede de loja de qualquer lugar, online e/ou offline. Administre seus documentos fiscais na nuvem.",
          btn:
            '<a href="/produtos/#Gestor" class="main-title-link u-mobile-display-block"> <span class="main-title-link__strip">&nbsp;</span> Conheça o Opytex Gestor</a>',
        },
      ];

      slideContent.forEach(function (item, index) {
        $("#lightSlider").append(`<li>
              <h1 class="main-title main-title--white home-section-header__title">
              ${item.heading}
              </h1>
              <p class="main-subtitle main-subtitle--blue home-section-header__subtitle">
              ${item.subHeading}
              </p>
              ${item.btn}
              </li>
              `);
      });
    },
  });
});

{
  /* <div class="material__content__card">
                <a target="_blank" href="/media/uploads/materiais/Observação_Site_Opytex.docx_1.pdf" download="">
                <div class="material__content__card-thumbnail">
                    <img src="/media/uploads/materiais/thumbnail/HK101-1026_2019_055727.jpg" alt="" class="material__content__card-img">
                    
                </div>
                </a>
                    <h4 class="material__content__card-title">
                        <a target="_blank" href="/media/uploads/materiais/Observação_Site_Opytex.docx_1.pdf">Material Chato</a>
                    </h4>

                    <p class="material__content__card-description">
                        ma empresa inovadora, com soluções objetivas,     porém poderosas, que visam ajudar a s...
                    </p>
                    <div class="social-share-btns">
                        <a class="social-share-btns__link" href="http://www.facebook.com/sharer.php?u=https://opytex.com.br/media/uploads/materiais/Observação_Site_Opytex.docx_1.pdf" target="_blank">
                            <img class="social-share-btns__icon" src="https://simplesharebuttons.com/images/somacro/facebook.png" alt="Facebook">
                        </a>
                        <a class="social-share-btns__link" href="https://twitter.com/share?url=https://opytex.com.br/media/uploads/materiais/Observação_Site_Opytex.docx_1.pdf" target="_blank">
                            <img class="social-share-btns__icon" src="https://simplesharebuttons.com/images/somacro/twitter.png" alt="Twitter">
                        </a>
                        <a class="social-share-btns__link" href="http://www.linkedin.com/shareArticle?mini=true&amp;url=https://opytex.com.br/media/uploads/materiais/Observação_Site_Opytex.docx_1.pdf" target="_blank">
                            <img class="social-share-btns__icon" src="https://simplesharebuttons.com/images/somacro/linkedin.png" alt="LinkedIn">
                        </a>
                        <a class="social-share-btns__link" href="https://api.whatsapp.com/send?text=https://opytex.com.br/media/uploads/materiais/Observação_Site_Opytex.docx_1.pdf" target="_blank">
                            <img class="social-share-btns__icon" src="/media/static/img/whatsapp-icon.svg" alt="whatsapp-icon">
                        </a>
                    </div>
                </div> */
}

function materiais() {
  return {
    materiais: null,
    sliceFrom: 8,
    init() {
      $.ajax({
        type: "POST",
        enctype: "multipart/form-data",
        processData: false,
        contentType: false,
        cache: false,
        url: "/material/",
        success: function (data) {
          materiais = data.materiais;
        },
      });
    },
    loadmore() {
      let toAppend = materiais.slice(this.sliceFrom, this.sliceFrom + 4);
      this.sliceFrom = this.sliceFrom + 4;
      toAppend.forEach(function (item, index) {
        $(".material__content__box").append(`
      <div class="material__content__card">
                <a target="_blank" href="${item.file}" download="">
                <div class="material__content__card-thumbnail">
                    <img src="${
                      item.miniatura
                    }" alt="" class="material__content__card-img">
                    
                </div>
                </a>
                    <h4 class="material__content__card-title">
                        <a target="_blank" href="/media/uploads/materiais/Observação_Site_Opytex.docx_1.pdf">${
                          item.titulo
                        }</a>
                    </h4>

                    <p class="material__content__card-description">
                        ${item.descricao.slice(0, 90)}
                    </p>
                    <div class="social-share-btns">
                        <a class="social-share-btns__link" href="http://www.facebook.com/sharer.php?u=https://opytex.com.br/${
                          item.file
                        }" target="_blank">
                            <img class="social-share-btns__icon" src="https://simplesharebuttons.com/images/somacro/facebook.png" alt="Facebook">
                        </a>
                        <a class="social-share-btns__link" href="https://twitter.com/share?url=https://opytex.com.br/${
                          item.file
                        }" target="_blank">
                            <img class="social-share-btns__icon" src="https://simplesharebuttons.com/images/somacro/twitter.png" alt="Twitter">
                        </a>
                        <a class="social-share-btns__link" href="http://www.linkedin.com/shareArticle?mini=true&amp;url=https://opytex.com.br/${
                          item.file
                        }" target="_blank">
                            <img class="social-share-btns__icon" src="https://simplesharebuttons.com/images/somacro/linkedin.png" alt="LinkedIn">
                        </a>
                        <a class="social-share-btns__link" href="https://api.whatsapp.com/send?text=https://opytex.com.br/${
                          item.file
                        }" target="_blank">
                            <img class="social-share-btns__icon" src="/media/static/img/whatsapp-icon.svg" alt="whatsapp-icon">
                        </a>
                    </div>
                </div>
                
      `);
      });
    },
  };
}

function blog() {
  return {
    posts: null,
    sliceFrom: 2,
    init() {
      $.ajax({
        type: "POST",
        enctype: "multipart/form-data",
        processData: false,
        contentType: false,
        cache: false,
        url: "/blog/",
        success: function (data) {
          posts = data.posts;
        },
      });
    },
    loadmore() {
      let toAppend = posts.slice(this.sliceFrom, this.sliceFrom + 2);
      this.sliceFrom = this.sliceFrom + this.sliceFrom;
      console.log(this.sliceFrom);
      if(this.sliceFrom > posts.length ){
        $("#morebtn").fadeOut()
      }
      toAppend.forEach(function (item, index) {
        let tags = []
        item.tags.forEach(function(item, idx){tags.push(item.nome)})
        tags.join()
        // tags.concat('.')
        
        $("#morebtn").before(`
        <div class="blog__post-prev">
                    <a href="/blog/${item.slug}/" title="${item.titulo}">
                        <div class="blog__post-thumbnail">
                            <img src="${item.miniatura}" alt="${item.titulo}" class="blog__post-thumbnail__img">
                        </div>
                    </a>
                    <p> <span> Data de publicação: ${item.data_publicacao}</span>
                        <span>Tags:</span>
                             <span> ${tags.join(', ').concat('.')}</span> 
                    </p>
                    <a href="/blog/${item.slug}/" title="${item.titulo}">
                        <h2 class="blog__post-title">
                            ${ item.titulo }
                        </h2>
                        <p class="main-paragraph blog__post-paragraph">
                            ${ item.descricao.replace(/<\/?[^>]+(>|$)/g, "").slice(0,425) }
                        </p>
                    </a>
                </a>
                </div>
      `);
      });
    },
  };
}

