document.addEventListener("DOMContentLoaded", function () {
  // Definir toggleMenu globalmente
  window.toggleMenu = function () {
    const menu = document.querySelector(".menu");
    const hamburger = document.querySelector(".hamburger");
    menu.classList.toggle("active");
    hamburger.classList.toggle("active");
  };

  Promise.all([
    // Cargar head
    fetch("components/head.html")
      .then((response) => response.text())
      .then((data) => {
        document.head.innerHTML += data;
      }),

    // Cargar navbar
    fetch("components/navbar.html")
      .then((response) => response.text())
      .then((data) => {
        document.body.insertAdjacentHTML("afterbegin", data);
      }),

    // Cargar menu
    fetch("components/menu.html")
      .then((response) => response.text())
      .then((data) => {
        document.querySelector(".navbar").insertAdjacentHTML("afterend", data);
      }),
    // Cargar psicologos 
    fetch("components/psicologos.html")
      .then((response) => response.text())
      .then((data) => {
        document.querySelector(".navbar").insertAdjacentHTML("afterend", data);
      }),

    // Cargar footer
    fetch("components/footer.html")
      .then((response) => response.text())
      .then((data) => {
        document.body.insertAdjacentHTML("beforeend", data);
      }),
  ]).then(() => {
    // Cargar main.js después de que todos los componentes estén listos
    const script = document.createElement("script");
    script.src = "main.js";
    document.body.appendChild(script);

    // Agregar el event listener para cerrar el menú al hacer clic fuera
    document.addEventListener("click", function (event) {
      const menu = document.querySelector(".menu");
      const hamburger = document.querySelector(".hamburger");

      if (!menu.contains(event.target) && !hamburger.contains(event.target)) {
        menu.classList.remove("active");
        hamburger.classList.remove("active");
      }
    });
  });
});
