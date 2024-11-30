document.addEventListener("DOMContentLoaded", () => {
    const registerBtn = document.getElementById("registerBtn");
    const loginBtn = document.getElementById("loginBtn");
    const registerPopup = document.getElementById("registerPopup");
    const loginPopup = document.getElementById("loginPopup");
    const closeButtons = document.querySelectorAll(".close-popup");
  
    // Mostrar ventana de registro
    registerBtn.addEventListener("click", () => {
      registerPopup.style.display = "flex";
    });
  
    // Mostrar ventana de inicio de sesión
    loginBtn.addEventListener("click", () => {
      loginPopup.style.display = "flex";
    });
  
    // Cerrar ventanas emergentes
    closeButtons.forEach((btn) => {
      btn.addEventListener("click", (event) => {
        const popupId = event.target.getAttribute("data-close");
        document.getElementById(popupId).style.display = "none";
      });
    });
  
    // Cerrar ventana emergente al hacer clic fuera de ella
    window.addEventListener("click", (event) => {
      if (event.target.classList.contains("popup-overlay")) {
        event.target.style.display = "none";
      }
    });
  });
  