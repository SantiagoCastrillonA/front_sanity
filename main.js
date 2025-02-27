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

document.addEventListener("DOMContentLoaded", function () {
  // Elementos del DOM
  const sidebar = document.getElementById("sidebar");
  const openSidebarBtn = document.getElementById("open-sidebar");
  const closeSidebarBtn = document.getElementById("close-sidebar");
  const chatInput = document.getElementById("chat-input");
  const sendButton = document.getElementById("send-button");
  const chatMessages = document.getElementById("chat-messages");
  const newChatBtn = document.getElementById("new-chat");
  const historyList = document.getElementById("history-list");

  // Abrir sidebar
  openSidebarBtn.addEventListener("click", () => {
    sidebar.classList.add("active");
  });

  // Cerrar sidebar
  closeSidebarBtn.addEventListener("click", () => {
    sidebar.classList.remove("active");
  });

  // Hacer crecer el textarea al escribir
  chatInput.addEventListener("input", function () {
    this.style.height = "auto";
    this.style.height = this.scrollHeight + "px";

    // Limitar altura máxima
    if (this.scrollHeight > 150) {
      this.style.height = "150px";
      this.style.overflowY = "auto";
    } else {
      this.style.overflowY = "hidden";
    }
  });

  // Enviar mensaje con Enter (pero nueva línea con Shift+Enter)
  chatInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });

  // Enviar mensaje con el botón
  sendButton.addEventListener("click", sendMessage);

  // Función para enviar mensaje
  function sendMessage() {
    const message = chatInput.value.trim();
    if (message) {
      // Agregar mensaje del usuario al chat
      addMessageToChat("user", message);

      // Limpiar y resetear el input
      chatInput.value = "";
      chatInput.style.height = "auto";

      // Simular respuesta del asistente (en una aplicación real, aquí se conectaría con la IA)
      setTimeout(() => {
        simulateAssistantResponse(message);
      }, 1000);

      // Guardar en el historial
      saveToHistory(message);
    }
  }

  // Función para agregar mensaje al chat
  function addMessageToChat(sender, content) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", sender);

    const messageContent = document.createElement("div");
    messageContent.classList.add("message-content");

    // Convertir saltos de línea a <br>
    content = content.replace(/\n/g, "<br>");

    messageContent.innerHTML = `<p>${content}</p>`;
    messageDiv.appendChild(messageContent);

    chatMessages.appendChild(messageDiv);

    // Scroll automático hacia abajo
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  // Función para simular respuesta del asistente (esto sería reemplazado por la IA real)
  function simulateAssistantResponse(userMessage) {
    // Simulación básica de respuestas
    let response;

    if (
      userMessage.toLowerCase().includes("hola") ||
      userMessage.toLowerCase().includes("buenos días")
    ) {
      response =
        "Hola, ¿cómo estás hoy? Estoy aquí para escucharte y ayudarte en lo que necesites.";
    } else if (
      userMessage.toLowerCase().includes("ansiedad") ||
      userMessage.toLowerCase().includes("ansioso")
    ) {
      response =
        "La ansiedad es una respuesta natural del cuerpo ante situaciones de estrés. Podemos hablar sobre técnicas de respiración y mindfulness que pueden ayudarte a manejarla. ¿Te gustaría explorar algunas técnicas?";
    } else if (
      userMessage.toLowerCase().includes("triste") ||
      userMessage.toLowerCase().includes("deprimido")
    ) {
      response =
        "Siento que estés pasando por un momento difícil. Es importante que sepas que no estás solo/a. ¿Podrías contarme un poco más sobre cómo te sientes?";
    } else {
      response =
        "Gracias por compartir eso conmigo. Estoy aquí para escucharte y apoyarte. ¿Hay algo específico en lo que te gustaría que nos enfoquemos hoy?";
    }

    addMessageToChat("assistant", response);
  }

  // Función para guardar en historial
  function saveToHistory(firstMessage) {
    const now = new Date();
    const time =
      now.getHours() +
      ":" +
      (now.getMinutes() < 10 ? "0" : "") +
      now.getMinutes();
    const date = now.toLocaleDateString("es-ES", {
      weekday: "long",
      day: "numeric",
    });

    const truncatedMessage =
      firstMessage.length > 30
        ? firstMessage.substring(0, 30) + "..."
        : firstMessage;

    const historyItem = document.createElement("div");
    historyItem.classList.add("history-item");
    historyItem.innerHTML = `
          <span>${truncatedMessage}</span>
          <span class="history-date">${date}, ${time}</span>
      `;

    // Hacer clic en un elemento del historial (simulación)
    historyItem.addEventListener("click", () => {
      // En una app real, aquí se cargaría la conversación correspondiente
      alert("Cargar conversación: " + truncatedMessage);
    });

    // Agregar al inicio de la lista
    historyList.insertBefore(historyItem, historyList.firstChild);
  }

  // Nueva conversación
  newChatBtn.addEventListener("click", () => {
    // Limpiar mensajes actuales
    chatMessages.innerHTML = `
          <div class="message assistant">
              <div class="message-content">
                  <p>Hola, soy tu asistente de salud mental. ¿En qué puedo ayudarte hoy?</p>
              </div>
          </div>
      `;

    // En móvil, cerrar el sidebar al iniciar una nueva conversación
    if (window.innerWidth <= 768) {
      sidebar.classList.remove("active");
    }
  });

  // Detectar cambios de tamaño de pantalla para manejar el sidebar
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      sidebar.classList.remove("active"); // Resetear clase en desktop
    }
  });

  // Funcionalidad para el historial del chat
  let chatHistory = JSON.parse(localStorage.getItem("chatHistory")) || [];

  // Función para guardar un nuevo mensaje en el historial
  function saveMessage(message, sender) {
    const newMessage = {
      text: message,
      sender: sender,
      timestamp: new Date().toISOString(),
    };

    chatHistory.push(newMessage);
    localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
    updateHistoryList();
  }

  // Función para actualizar la lista del historial
  function updateHistoryList() {
    if (!historyList) return;

    historyList.innerHTML = "";
    chatHistory.forEach((message, index) => {
      const historyItem = document.createElement("div");
      historyItem.classList.add("history-item");
      historyItem.innerHTML = `
                <p class="history-text">${message.text.substring(0, 30)}...</p>
                <p class="history-date">${new Date(message.timestamp).toLocaleDateString()}</p>
            `;
      historyItem.addEventListener("click", () => loadChat(index));
      historyList.appendChild(historyItem);
    });
  }

  // Función para cargar un chat específico
  function loadChat(index) {
    if (!chatMessages) return;

    const chat = chatHistory[index];
    chatMessages.innerHTML = ""; // Limpia el chat actual

    // Agrega el mensaje seleccionado
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", chat.sender);
    messageDiv.innerHTML = `<p>${chat.text}</p>`;
    chatMessages.appendChild(messageDiv);
  }

  // Cargar el historial al inicio
  updateHistoryList();

  // Agregar evento al enviar mensaje
  if (sendButton && chatInput) {
    sendButton.addEventListener("click", function () {
      const message = chatInput.value.trim();
      if (message) {
        saveMessage(message, "user");
        chatInput.value = "";
      }
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const sidebar = document.querySelector(".sidebar");
  const chatContainer = document.querySelector(".chat-container");

  // Función para cerrar el sidebar cuando el mouse sale
  sidebar.addEventListener("mouseleave", function () {
    sidebar.style.left = "-280px";
    chatContainer.classList.remove("sidebar-open");
  });

  // Función para abrir el sidebar cuando el mouse entra
  sidebar.addEventListener("mouseenter", function () {
    sidebar.style.left = "0";
    chatContainer.classList.add("sidebar-open");
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const sidebar = document.getElementById("sidebar");
  const mainContent = document.querySelector(".main-content");
  const closeSidebarBtn = document.getElementById("close-sidebar");
  const openSidebarBtn = document.getElementById("open-sidebar");

  // Función para abrir el sidebar
  function openSidebar() {
    sidebar.style.left = "0";
    mainContent.classList.add("shifted");
  }

  // Función para cerrar el sidebar
  function closeSidebar() {
    sidebar.style.left = "-280px";
    mainContent.classList.remove("shifted");
  }

  // Event listeners para los botones
  if (openSidebarBtn) {
    openSidebarBtn.addEventListener("click", openSidebar);
  }

  if (closeSidebarBtn) {
    closeSidebarBtn.addEventListener("click", closeSidebar);
  }

  // Eventos de hover
  if (sidebar) {
    sidebar.addEventListener("mouseenter", function() {
      openSidebar();
    });

    sidebar.addEventListener("mouseleave", function() {
      closeSidebar();
    });
  }

  // Prevenir cierre al interactuar con elementos del sidebar
  const historyItems = sidebar.querySelectorAll(".history-item");
  const newChatBtn = sidebar.querySelector(".new-chat-btn");

  const preventClose = (e) => {
    e.stopPropagation();
  };

  historyItems.forEach(item => {
    item.addEventListener("click", preventClose);
  });

  if (newChatBtn) {
    newChatBtn.addEventListener("click", preventClose);
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const chatHistory = document.getElementById("chat-history");
  const closeButton = document.getElementById("close-history");

  if (chatHistory && closeButton) {
    // Alternar la visibilidad del historial de chats al hacer clic en el botón
    closeButton.addEventListener("click", function () {
      chatHistory.classList.toggle("hidden");
    });

    // Mostrar el historial al pasar el cursor por encima
    chatHistory.addEventListener("mouseenter", function () {
      chatHistory.classList.remove("hidden");
    });

    // Ocultar el historial al sacar el cursor
    chatHistory.addEventListener("mouseleave", function () {
      chatHistory.classList.add("hidden");
    });
  }
});