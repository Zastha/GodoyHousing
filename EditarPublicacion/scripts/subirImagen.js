document.addEventListener("DOMContentLoaded", () => {
    const defaultSlot = document.querySelector(".default-photo");
    const additionalSlots = document.querySelectorAll(".photo-slot:not(.default-photo)");
  
  
    // Inicializar todas las ranuras
    function initializeSlot(slot) {
      const fileInput = slot.querySelector(".file-input");
      const uploadButton = slot.querySelector(".upload-button");
  
      // Mostrar la ventana para seleccionar un archivo
      uploadButton.addEventListener("click", () => {
        fileInput.click();
      });
  
      // Cargar y mostrar la imagen seleccionada
      fileInput.addEventListener("change", () => {
        const file = fileInput.files[0];
        if (file) {
          const reader = new FileReader();
  
          reader.onload = (e) => {
            const imageUrl = e.target.result;
  
            // Reemplazar el contenido de la ranura
            slot.innerHTML = `
              <img src="${imageUrl}" alt="Foto subida" class="uploaded-image">
              <button class="remove-button">X</button>
            `;
  
            // Agregar funcionalidad para eliminar la imagen
            const removeButton = slot.querySelector(".remove-button");
            removeButton.addEventListener("click", () => {
              resetSlot(slot);
            });
          };
  
          reader.readAsDataURL(file);
        }
      });
    }
  
    // Restaurar una ranura a su estado inicial
    function resetSlot(slot) {
      const isDefault = slot.classList.contains("default-photo");
  
      if (isDefault) {
        // Restaurar ranura principal
        slot.innerHTML = `
          <img src="imagenes/pexels-pixabay-259588 1.png" alt="Imagen por defecto" class="default-image">
          <div class="overlay">
            <p>Sube la primera foto de tu inmueble</p>
            <input type="file" class="file-input" accept="image/*" hidden>
            <button class="upload-button">Presume Tu Inmueble!</button>
          </div>
        `;
      } else {
        // Restaurar ranura adicional
        slot.innerHTML = `
          <input type="file" class="file-input" accept="image/*" hidden>
          <button class="upload-button">+</button>
        `;
      }
  
      // Reinicializar eventos
      initializeSlot(slot);
    }
  
    // Inicializar la ranura principal
    initializeSlot(defaultSlot);
  
    // Inicializar las ranuras adicionales
    additionalSlots.forEach((slot) => initializeSlot(slot));
  
  
  
  
    
  });
  