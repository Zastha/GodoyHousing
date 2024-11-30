document.addEventListener("DOMContentLoaded", () => {
    const titleElement = document.getElementById("editable-title");
    const subtitleElement = document.getElementById("editable-subtitle");
  
    function makeEditable(element, defaultText) {
      element.addEventListener("dblclick", () => {
        // Guarda el texto actual
        const currentText = element.textContent;
  
        // Crea un campo de entrada
        const inputField = document.createElement("input");
        inputField.type = "text";
        inputField.value = currentText;
        inputField.className = "title-input"; // Misma clase para consistencia
  
        // Reemplaza el elemento con el campo de entrada
        element.replaceWith(inputField);
        inputField.focus();
  
        // Guardar el nuevo texto al perder el foco o presionar Enter
        function saveText() {
          const newText = inputField.value.trim() || defaultText; // Valor por defecto si está vacío
          element.textContent = newText;
          inputField.replaceWith(element); // Reemplaza el campo de entrada con el nuevo texto
        }
  
        inputField.addEventListener("blur", saveText); // Guardar al perder el foco
        inputField.addEventListener("keydown", (e) => {
          if (e.key === "Enter") {
            saveText();
          }
        });
      });
    }
  
    // Aplicar la funcionalidad a ambos elementos
    makeEditable(titleElement, "Agrega tu título aquí");
    makeEditable(subtitleElement, "Agrega en qué ciudad está localizado.");
  
  
    
  });
  