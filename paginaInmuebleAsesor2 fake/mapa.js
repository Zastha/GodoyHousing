document.addEventListener("DOMContentLoaded", () => {
  // Coordenadas predeterminadas para el inmueble
  const inmuebleCoordinates = [24.815804277584874, -107.42190991206002]; // Coordenadas del inmueble
  const defaultCoordinates = [51.505, -0.09]; // Coordenadas predeterminadas (Londres) por si acaso

  // Crear el mapa con las coordenadas del inmueble
  const map = L.map('map').setView(inmuebleCoordinates, 17); // Inicia el mapa con el inmueble como centro y un zoom de 17

  // Agregar capa de OpenStreetMap
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
  }).addTo(map);

  // Agregar marcador en las coordenadas del inmueble
  const inmuebleIcon = L.icon({
    iconUrl: 'imagenes/punterocasa.png', // Icono para el inmueble
    iconSize: [40, 50],
    iconAnchor: [15, 40],
    popupAnchor: [0, -40]
  });
  
  const inmuebleMarker = L.marker(inmuebleCoordinates, { icon: inmuebleIcon }).addTo(map);
  inmuebleMarker.bindPopup("Ubicación del inmueble").openPopup();

  // Crear un ícono personalizado para la ubicación del usuario
  const userLocationIcon = L.icon({
    iconUrl: 'imagenes/user-location-icon.png', // Ruta al archivo del ícono
    iconSize: [30, 40], // Tamaño del ícono
    iconAnchor: [15, 40], // Punto del ícono que se posiciona en el marcador
    popupAnchor: [0, -40] // Posición del popup respecto al ícono
  });

  // Intentar obtener la ubicación del usuario mediante la geolocalización del navegador
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      const userCoordinates = [latitude, longitude]; // Coordenadas del usuario

      // Colocamos un marcador con la ubicación del usuario
      L.marker(userCoordinates, { icon: userLocationIcon })
        .addTo(map)
        .bindPopup("<b>Tu ubicación</b>")
        .openPopup();
    }, () => {
      alert("No se pudo obtener la ubicación del usuario.");
    });
  } else {
    alert("La geolocalización no está soportada en este navegador.");
  }

  // Función para buscar ubicación mediante texto
  const searchLocationButton = document.getElementById("search-location");
  const locationInput = document.getElementById("location-input");

  searchLocationButton.addEventListener("click", () => {
    const locationQuery = locationInput.value;

    // Usamos el API de Nominatim para convertir la dirección en coordenadas
    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(locationQuery)}`)
      .then(response => response.json())
      .then(data => {
        if (data && data.length > 0) {
          const coordinates = [data[0].lat, data[0].lon];
          map.setView(coordinates, 17); // Ajusta el mapa a las nuevas coordenadas
          
          // Añadir marcador para la nueva ubicación
          L.marker(coordinates).addTo(map)
            .bindPopup(`<b>${data[0].display_name}</b>`)
            .openPopup();
        } else {
          alert("Ubicación no encontrada. Intenta con otra.");
        }
      })
      .catch(error => {
        console.error("Error al obtener la ubicación:", error);
        alert("Hubo un problema al buscar la ubicación.");
      });
  });
});
