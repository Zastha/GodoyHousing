document.addEventListener("DOMContentLoaded", () => {
  const defaultSlot = document.querySelector(".default-photo");
  const additionalSlots = document.querySelectorAll(".photo-slot:not(.default-photo)");
  const titleElement = document.getElementById("editable-title");
  const subtitleElement = document.getElementById("editable-subtitle");
  const map = L.map('map').setView([51.505, -0.09], 13); // Inicializa el mapa con coordenadas predeterminadas

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


  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
  }).addTo(map);

  const markers = []; // Array para almacenar los marcadores

  // Referencias a los elementos HTML
  const locationInput = document.getElementById('location-input');
  const searchLocationButton = document.getElementById('search-location');

  // Función para agregar un marcador al mapa
  function addMarker(lat, lon, displayName) {
    const marker = L.marker([lat, lon]).addTo(map);
    marker.bindPopup(displayName).openPopup();
    markers.push(marker); // Almacena el marcador en el array
  }

  // Buscar la ubicación al hacer clic en el botón
  searchLocationButton.addEventListener('click', () => {
    const location = locationInput.value;

    if (location) {
      fetch(`https://nominatim.openstreetmap.org/search?q=${location}&format=json&limit=1`)
        .then(response => response.json())
        .then(data => {
          if (data.length > 0) {
            const { lat, lon, display_name } = data[0];
            const newLatLng = [parseFloat(lat), parseFloat(lon)];

            map.setView(newLatLng, 13); // Centra el mapa en la nueva ubicación
            addMarker(lat, lon, display_name); // Agrega un marcador
          } else {
            alert('No se encontraron resultados para esa ubicación.');
          }
        })
        .catch(error => {
          console.error('Error al buscar la ubicación:', error);
        });
    } else {
      alert('Por favor, ingresa una ubicación.');
    }
  });

  // Función opcional: Limpia todos los marcadores
  function clearMarkers() {
    markers.forEach(marker => map.removeLayer(marker)); // Elimina los marcadores del mapa
    markers.length = 0; // Limpia el array de marcadores
  }

  // Ejemplo: Agregar varios marcadores de forma estática
  const staticLocations = [
    { lat: 24.777408954042073, lon:  -107.40699130799332, name: 'New York, USA' },
    { lat: 48.8566, lon: 2.3522, name: 'Paris, France' },
    { lat: 35.6895, lon: 139.6917, name: 'Tokyo, Japan' }
  ];

  staticLocations.forEach(location => addMarker(location.lat, location.lon, location.name));
});
