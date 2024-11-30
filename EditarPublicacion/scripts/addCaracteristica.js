document.addEventListener("DOMContentLoaded", () => {
    const descriptionList = document.getElementById("description-list");
  
    // Función para agregar un nuevo input
    const addNewInput = () => {
      const newInput = document.createElement("input");
      newInput.type = "text";
      newInput.className = "description-input";
      newInput.placeholder = "Danos una característica";
  
      // Añadir eventos para manejar blur y Enter
      newInput.addEventListener("blur", handleBlur);
      newInput.addEventListener("keydown", handleKeydown);
  
      // Agregar el nuevo input al contenedor
      descriptionList.appendChild(newInput);
      newInput.focus();
    };
  
    // Manejar el evento blur
    const handleBlur = (event) => {
      const input = event.target;
  
      // Si el campo no está vacío, agrega un nuevo input
      if (input.value.trim() !== "") {
        const lastInput = descriptionList.querySelector(".description-input:last-child");
        if (input === lastInput) {
          addNewInput();
        }
      }
      // Si el campo está vacío y no es el último, se elimina
      else if (input !== descriptionList.querySelector(".description-input:last-child")) {
        input.remove();
      }
    };
  
    // Manejar el evento Enter
    const handleKeydown = (event) => {
      if (event.key === "Enter") {
        event.preventDefault(); // Evitar el comportamiento por defecto
        const input = event.target;
  
        // Si el campo no está vacío, agrega un nuevo input
        if (input.value.trim() !== "") {
          const lastInput = descriptionList.querySelector(".description-input:last-child");
          if (input === lastInput) {
            addNewInput();
          }
        }
      }
    };
  
    // Agregar eventos al input inicial
    const initialInput = descriptionList.querySelector(".description-input");
    initialInput.addEventListener("blur", handleBlur);
    initialInput.addEventListener("keydown", handleKeydown);
  });
  