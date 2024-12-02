document.addEventListener("DOMContentLoaded", () => {
    const addPropertyBtn = document.getElementById("addPropertyBtn");
    const popup = document.getElementById("popup");
    const closePopupBtn = document.getElementById("closePopupBtn");
    const uploadButton = document.getElementById("uploadButton");
    const fileInput = document.getElementById("fileInput");

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
        fileInput.click();
    });

    // Manejar el archivo seleccionado
    fileInput?.addEventListener("change", () => {
        if (fileInput.files.length > 0) {
            const fileName = fileInput.files[0].name;
            alert(`Archivo seleccionado: ${fileName}`);
            // Lógica adicional, como mostrar una vista previa o enviar el archivo al servidor
        }
    });

    // Mejor manejo de eventos con prevención de errores
    if (!addPropertyBtn || !popup || !closePopupBtn || !uploadButton || !fileInput) {
        console.warn("Uno o más elementos no se encontraron. Verifica los IDs en tu HTML.");
    }
});