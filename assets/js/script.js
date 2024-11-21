"use strict";

/**
 * PRELOAD
 * Carrega a tela de carregamento até que o documento esteja completamente carregado
 */
const preloader = document.querySelector("[data-preaload]");

window.addEventListener("load", function () {
  preloader.classList.add("loaded");
  document.body.classList.add("loaded");
});

/**
 * Função para adicionar eventos a múltiplos elementos
 */
const addEventOnElements = function (elements, eventType, callback) {
  elements.forEach((element) => element.addEventListener(eventType, callback));
};

/**
 * NAVBAR
 */
const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("nav-active");
};

addEventOnElements(navTogglers, "click", toggleNavbar);

/**
 * HEADER & BOTÃO "VOLTA AO TOPO"
 */
const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");
let lastScrollPos = 0;

const hideHeader = function () {
  const isScrollBottom = lastScrollPos < window.scrollY;
  header.classList.toggle("hide", isScrollBottom);
  lastScrollPos = window.scrollY;
};

window.addEventListener("scroll", function () {
  const isScrolled = window.scrollY >= 50;
  header.classList.toggle("active", isScrolled);
  backTopBtn.classList.toggle("active", isScrolled);
  if (isScrolled) hideHeader();
});

/**
 * SLIDER DO HERO
 */
const heroSlider = document.querySelector("[data-hero-slider]");
const heroSliderItems = document.querySelectorAll("[data-hero-slider-item]");
const heroSliderPrevBtn = document.querySelector("[data-prev-btn]");
const heroSliderNextBtn = document.querySelector("[data-next-btn]");
let currentSlidePos = 0;
let lastActiveSliderItem = heroSliderItems[0];

const updateSliderPos = function () {
  lastActiveSliderItem.classList.remove("active");
  heroSliderItems[currentSlidePos].classList.add("active");
  lastActiveSliderItem = heroSliderItems[currentSlidePos];
};

const slideNext = function () {
  currentSlidePos = (currentSlidePos + 1) % heroSliderItems.length;
  updateSliderPos();
};

const slidePrev = function () {
  currentSlidePos =
    (currentSlidePos - 1 + heroSliderItems.length) % heroSliderItems.length;
  updateSliderPos();
};

heroSliderNextBtn.addEventListener("click", slideNext);
heroSliderPrevBtn.addEventListener("click", slidePrev);

/**
 * SLIDE AUTOMÁTICO
 */
let autoSlideInterval;

const autoSlide = function () {
  autoSlideInterval = setInterval(slideNext, 7000);
};

addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseover", () =>
  clearInterval(autoSlideInterval)
);
addEventOnElements(
  [heroSliderNextBtn, heroSliderPrevBtn],
  "mouseout",
  autoSlide
);

window.addEventListener("load", autoSlide);

/**
 * EFEITO PARALLAX
 */
const parallaxItems = document.querySelectorAll("[data-parallax-item]");

window.addEventListener("mousemove", function (event) {
  let x = (event.clientX / window.innerWidth) * 10 - 5;
  let y = (event.clientY / window.innerHeight) * 10 - 5;

  x = x - x * 2;
  y = y - y * 2;

  parallaxItems.forEach((item) => {
    const speed = Number(item.dataset.parallaxSpeed);
    item.style.transform = `translate3d(${x * speed}px, ${y * speed}px, 0px)`;
  });
});

/**
 * LIGHTBOX PARA GALERIA DE IMAGENS
 */
document.addEventListener("DOMContentLoaded", () => {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const closeLightbox = document.getElementById("close-lightbox");
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");

  const images = Array.from(document.querySelectorAll(".imagem-card img"));
  let currentIndex = 0;

  images.forEach((img, index) => {
    img.addEventListener("click", () => {
      lightbox.style.display = "flex";
      lightboxImg.src = img.src;
      currentIndex = index;
      document.body.classList.add("lightbox-active");
    });
  });

  closeLightbox.addEventListener("click", () => {
    lightbox.style.display = "none";
    document.body.classList.remove("lightbox-active");
  });

  prevBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    lightboxImg.src = images[currentIndex].src;
  });

  nextBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    currentIndex = (currentIndex + 1) % images.length;
    lightboxImg.src = images[currentIndex].src;
  });

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox || e.target === lightboxImg) {
      lightbox.style.display = "none";
      document.body.classList.remove("lightbox-active");
    }
  });
});

/**
 * CARD DE DETALHES
 */
function showDetails(activity) {
  const detailsCard = document.getElementById("detailsCard");
  const detailsText = document.getElementById("detailsText");

  const activityDetails = {
    pintura:
      "Pintura: Uma atividade criativa onde os idosos exploram a arte da pintura em tela, desenvolvendo habilidades artísticas e relaxando a mente.",
    horta:
      "Horta: Atividade prática onde os idosos cuidam de uma horta, plantando e colhendo, promovendo contato com a natureza e estimulando o bem-estar.",
    artesanato:
      "Artesanato: Produção de peças artesanais, como crochê e tricô, onde os idosos exercitam a criatividade e habilidades motoras.",
  };

  detailsText.textContent = activityDetails[activity] || "";
  detailsCard.style.display = "block";
}

function hideDetails() {
  document.getElementById("detailsCard").style.display = "none";
}


  (function() {
    emailjs.init("YOUR_USER_ID"); // Substitua "YOUR_USER_ID" pelo seu User ID do EmailJS
  })();

