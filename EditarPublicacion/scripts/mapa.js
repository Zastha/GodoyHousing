document.addEventListener("DOMContentLoaded", () => {

    let defaultCoordinates = [51.505, -0.09]; // Coordenadas predeterminadas
    const map = L.map('map').setView(defaultCoordinates, 13); // Inicializa el mapa con coordenadas predeterminadas
  
  
  
  
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap'
    }).addTo(map);
  
    const markers = []; // Array para almacenar los marcadores
  
    // Crear un ícono personalizado para la ubicación del usuario
    const userLocationIcon = L.icon({
      iconUrl: 'imagenes/user-location-icon.png', // Ruta al archivo del ícono
      iconSize: [30, 40], // Tamaño del ícono
      iconAnchor: [15, 40], // Punto del ícono que se posiciona en el marcador
      popupAnchor: [0, -40] // Posición del popup respecto al ícono
    });
  
    // Intentar obtener la ubicación del usuario
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userCoordinates = [position.coords.latitude, position.coords.longitude];
          map.setView(userCoordinates, 13); // Centra el mapa en la ubicación del usuario
  
          // Agregar marcador personalizado para la ubicación del usuario
          L.marker(userCoordinates, { icon: userLocationIcon })
            .addTo(map)
            .bindPopup("Estás aquí")
            .openPopup();
        },
        (error) => {
          console.error("Error obteniendo la ubicación:", error.message);
          alert("No se pudo obtener tu ubicación. Mostrando ubicación predeterminada.");
        }
      );
    } else {
      alert("Geolocalización no está disponible en tu navegador. Mostrando ubicación predeterminada.");
    }
  
  
  
  
  
    // Función para agregar un marcador al mapa
    function addMarker(lat, lon, displayName) {
      const marker = L.marker([lat, lon]).addTo(map);
      marker.bindPopup(displayName).openPopup();
      markers.push(marker); // Almacena el marcador en el array
    }
  
    // Referencias a los elementos HTML
    const locationInput = document.getElementById('location-input');
    const searchLocationButton = document.getElementById('search-location');
  
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
      { lat: 40.7128, lon: -74.0060, name: 'New York, USA' },
      { lat: 48.8566, lon: 2.3522, name: 'Paris, France' },
      { lat: 35.6895, lon: 139.6917, name: 'Tokyo, Japan' }
    ];
  
    staticLocations.forEach(location => addMarker(location.lat, location.lon, location.name));
  });
  