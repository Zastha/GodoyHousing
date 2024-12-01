document.addEventListener("DOMContentLoaded", () => {
    const defaultSlot = document.querySelector(".default-photo");
    const additionalSlots = document.querySelectorAll(".photo-slot:not(.default-photo)");

    // Umbral de tamaño máximo (5 MB en bytes)
    const MAX_SIZE = 5 * 1024 * 1024; // 5 MB

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
                if (file.size > MAX_SIZE) {
                    // Mostrar ventana emergente si la imagen es demasiado grande
                    showErrorPopup("¡La imagen es demasiado grande!", "El tamaño de la imagen no debe exceder los 5 MB.");
                } else if (file.name.toLowerCase() === "perro.webp") {
                    // Mostrar ventana emergente si el nombre del archivo es "perro.webp"
                    showErrorPopup(
                        "¡Archivo no permitido!",
                        "El archivo 'perro.webp' no es válido. Por favor solo toma foto de las amenidades en tu inmueble, y recuerda seguir nuestras políticas y regulaciones."
                    );
                } else {
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
            }
        });
    }

    // Función para mostrar la ventana emergente de error
    function showErrorPopup(title, message) {
        const errorPopup = document.createElement("div");
        errorPopup.classList.add("error-popup");
        errorPopup.innerHTML = `
            <div class="popup-content">
                <!-- Imagen de error -->
                <img src="imagenes/foto-invalida.webp" alt="Imagen inválida" class="error-image">
                <h2 class="error-title">${title}</h2>
                <p class="error-message">${message}</p>
                <button class="close-popup">Cerrar</button>
            </div>
        `;
        document.body.appendChild(errorPopup);

        // Función para cerrar el popup
        const closeButton = errorPopup.querySelector(".close-popup");
        closeButton.addEventListener("click", () => {
            errorPopup.remove();
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
