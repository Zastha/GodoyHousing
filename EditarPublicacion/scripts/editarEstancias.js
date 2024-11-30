document.addEventListener("DOMContentLoaded", () => {
    const addEstanciaButton = document.querySelector(".add-estancia");
    const estanciasPopup = document.getElementById("estancias-popup");
    const closePopupButton = document.getElementById("close-popup");
    const saveEstanciasButton = document.getElementById("save-estancias");
    const estanciasList = document.querySelector(".estancias-list");
    const estanciaInputs = document.querySelectorAll(".estancia-item input");
    const noEstanciasText = document.getElementById("no-estancias-text");
    const estanciasContainer = document.querySelector(".estancias-container");
  
    // Mostrar popup al hacer clic en el botón "+"
    addEstanciaButton.addEventListener("click", () => {
      estanciasPopup.style.display = "flex";
    });
  
    // Cerrar popup
    closePopupButton.addEventListener("click", () => {
      estanciasPopup.style.display = "none";
    });
  
    // Actualizar visibilidad del texto "Agrega las Estancias"
    function updateNoEstanciasText() {
      const hasEstancias = estanciasList.querySelectorAll(".estancia-item-display").length > 0;
      if (hasEstancias) {
        estanciasContainer.classList.remove("no-estancias");
      } else {
        estanciasContainer.classList.add("no-estancias");
      }
    }
  
    // Guardar estancias seleccionadas
    saveEstanciasButton.addEventListener("click", () => {
      // Limpiar las estancias existentes (excepto el botón "+")
      estanciasList.innerHTML = "";
  
      // Iterar sobre los inputs y agregar las estancias
      estanciaInputs.forEach((input) => {
        const count = parseInt(input.value, 10);
        const key = input.getAttribute("data-key");
        const iconSrc = input.previousElementSibling.src;
  
        if (count > 0) {
          // Crear un elemento para la estancia
          const estanciaDisplay = document.createElement("div");
          estanciaDisplay.classList.add("estancia-item-display");
  
          // Número
          const number = document.createElement("span");
          number.classList.add("number");
          number.textContent = count;
  
          // Icono
          const icon = document.createElement("img");
          icon.src = iconSrc;
  
          // Nombre (oculto por defecto)
          const name = document.createElement("span");
          name.classList.add("name");
          name.textContent = key;
  
          // Agregar elementos al contenedor
          estanciaDisplay.appendChild(number);
          estanciaDisplay.appendChild(icon);
          estanciaDisplay.appendChild(name);
  
          // Añadir la estancia al contenedor dinámico
          estanciasList.appendChild(estanciaDisplay);
        }
      });
  
      // Mover el botón "+" al final
      estanciasList.appendChild(addEstanciaButton);
  
      // Actualizar el estado del texto
      updateNoEstanciasText();
  
      // Cerrar popup
      estanciasPopup.style.display = "none";
    });
  
    // Inicializa el estado inicial del texto
    updateNoEstanciasText();
  
    // Cerrar el popup al hacer clic fuera del contenido
    window.addEventListener("click", (event) => {
      if (event.target === estanciasPopup) {
        estanciasPopup.style.display = "none";
      }
    });
  });
  