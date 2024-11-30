// Referencias a elementos
const contactButton = document.getElementById("contact-button");
const contactPopup = document.getElementById("contact-popup");
const contactInfoBox = document.getElementById("contact-info-box");
const contactDetails = document.getElementById("contact-details");
const saveContactButton = document.querySelector(".save-btn");
const cancelContactButton = document.querySelector(".cancel-btn");

// Función para abrir el popup de contacto
contactButton.addEventListener("click", () => {
  contactPopup.style.display = "flex";
});

// Función para cerrar el popup de contacto
cancelContactButton.addEventListener("click", () => {
  contactPopup.style.display = "none";
});

// Función para guardar la información de contacto
saveContactButton.addEventListener("click", () => {
  const name = document.getElementById("contact-name").value.trim();
  const email = document.getElementById("contact-email").value.trim();
  const phone = document.getElementById("contact-phone").value.trim();

  if (name && email && phone) {
    // Mostrar la información guardada
    contactDetails.innerHTML = `
      <p><strong>Nombre:</strong> ${name}</p>
      <p><strong>Correo Electrónico:</strong> ${email}</p>
      <p><strong>Teléfono:</strong> ${phone}</p>
    `;

    // Mostrar la caja de información de contacto
    contactInfoBox.style.display = "block";

    // Cambiar el texto del botón
    contactButton.textContent = "Edita tu Información de Contacto";

    // Cerrar el popup
    contactPopup.style.display = "none";
  } else {
    alert("Por favor completa todos los campos antes de guardar.");
  }
});
