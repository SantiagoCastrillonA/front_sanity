// Esperar a que el DOM esté completamente cargado antes de ejecutar el código
document.addEventListener("DOMContentLoaded", function () {
  let slideIndex = 1;
  showSlides(slideIndex);

  // Función para avanzar o retroceder slides
  window.plusSlides = function (n) {
    showSlides((slideIndex += n));
  };

  // Función para ir a un slide específico
  window.currentSlide = function (n) {
    showSlides((slideIndex = n));
  };

  // Función principal para mostrar los slides
  function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");

    if (n > slides.length) {
      slideIndex = 1;
    }
    if (n < 1) {
      slideIndex = slides.length;
    }

    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }

    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }

    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
  }

  // Configurar autoplay (opcional)
  setInterval(function () {
    plusSlides(1);
  }, 5000); // Cambiar cada 5 segundos
});

document.addEventListener("DOMContentLoaded", function () {
  // Funcionalidad del menú hamburguesa
  window.toggleMenu = function () {
    const menu = document.querySelector(".menu");
    const hamburger = document.querySelector(".hamburger");

    menu.classList.toggle("active");
    hamburger.classList.toggle("active");
  };

  // Cerrar el menú al hacer clic fuera de él
  document.addEventListener("click", function (event) {
    const menu = document.querySelector(".menu");
    const hamburger = document.querySelector(".hamburger");

    if (!menu.contains(event.target) && !hamburger.contains(event.target)) {
      menu.classList.remove("active");
      hamburger.classList.remove("active");
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  // Funcionalidad del lightbox
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxCaption = document.querySelector(".lightbox-caption");
  const photoCards = document.querySelectorAll(".photo-card");

  photoCards.forEach((card) => {
    const img = card.querySelector("img");
    const description = card.querySelector(".photo-description").textContent;

    img.addEventListener("click", function () {
      lightbox.style.display = "block";
      lightboxImg.src = this.src;
      lightboxCaption.textContent = description;
      document.body.style.overflow = "hidden";
    });
  });

  // Cerrar lightbox
  document
    .querySelector(".close-lightbox")
    .addEventListener("click", function () {
      lightbox.style.display = "none";
      document.body.style.overflow = "auto"; // Restaura el scroll
    });

  // Cerrar lightbox al hacer clic fuera de la imagen
  lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox) {
      lightbox.style.display = "none";
      document.body.style.overflow = "auto";
    }
  });

  // Cerrar lightbox con la tecla ESC
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && lightbox.style.display === "block") {
        closeLightbox();
    }
  });
});