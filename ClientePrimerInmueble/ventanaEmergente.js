document.addEventListener("DOMContentLoaded", () => {
    const addPropertyBtn = document.getElementById("addPropertyBtn");
    const popup = document.getElementById("popup");
    const closePopupBtn = document.getElementById("closePopupBtn");
    const uploadButton = document.getElementById("uploadButton");
    const fileInput = document.getElementById("fileInput");

    // Flag para verificar si ya se ha seleccionado un archivo
    let fileSelected = false;

    // Mostrar la ventana emergente al hacer clic en el botón "Añadir Inmueble"
    addPropertyBtn?.addEventListener("click", () => {
        popup.style.display = "flex";
        document.body.style.overflow = "hidden"; // Evitar scroll mientras se muestra la ventana emergente
    });

    // Cerrar la ventana emergente al hacer clic en el botón "Cerrar"
    closePopupBtn?.addEventListener("click", () => {
        popup.style.display = "none";
        document.body.style.overflow = "auto"; // Restaurar el scroll
    });

    // Cerrar la ventana emergente al hacer clic fuera del contenido
    window.addEventListener("click", (event) => {
        if (event.target === popup) {
            popup.style.display = "none";
            document.body.style.overflow = "auto";
        }
    });

    // Activar el input de archivo al hacer clic en el botón "Subir Imagen"
    uploadButton?.addEventListener("click", () => {
        if (!fileSelected) { // Solo abrir si no se ha seleccionado un archivo
            fileInput.click();
        }
    });

    // Manejar el archivo seleccionado
    fileInput?.addEventListener("change", () => {
        if (fileInput.files.length > 0 && !fileSelected) {
            const fileName = fileInput.files[0].name;

            // Validar si el nombre del archivo es "perro.webp"
            if (fileName.toLowerCase() === "perro.webp") {
                alert("Foto inválida, sube una foto de tu INE");
                fileInput.value = ""; // Limpiar el archivo seleccionado
            } else {
                alert(`Archivo seleccionado: ${fileName}`);
                fileSelected = true; // Marcamos que un archivo ya ha sido seleccionado

                // Redirigir a la página de edición después de seleccionar la imagen
                window.location.href = '../EditarPublicacion/paginaEdicionEncapsulada.html';
            }
        }
    });

    // Mejor manejo de eventos con prevención de errores
    if (!addPropertyBtn || !popup || !closePopupBtn || !uploadButton || !fileInput) {
        console.warn("Uno o más elementos no se encontraron. Verifica los IDs en tu HTML.");
    }
});
