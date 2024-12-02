document.addEventListener("DOMContentLoaded", () => {
  // Coordenadas predeterminadas si no se obtiene la ubicación del usuario
  const defaultCoordinates = [51.505, -0.09]; 
  let userCoordinates = defaultCoordinates;  // Inicializamos con las coordenadas predeterminadas

  // Crear el mapa sin coordenadas específicas para que se inicialice después de obtener la ubicación
  const map = L.map('map').setView(userCoordinates, 17); // Inicializa el mapa con coordenadas predeterminadas y zoom 17

  // Agregar capa de OpenStreetMap
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

  // Función para agregar un marcador con ícono circular
  function addCircularMarker(lat, lon, displayName, iconUrl, propertyPageUrl) {
    const icon = L.divIcon({
      className: 'circle-icon', // Clases para el estilo
      html: `<img src="${iconUrl}" alt="${displayName}" class="circular-image">`, // Imagen circular
      iconSize: [40, 40], // Tamaño del ícono
      iconAnchor: [20, 20], // Para centrar el ícono
    });

    const marker = L.marker([lat, lon], { icon: icon }).addTo(map);
    marker.bindPopup(displayName).openPopup();
    
    // Evento de clic para redirigir a la página del inmueble
    marker.on('click', () => {
      window.location.href = propertyPageUrl; // Redirigir al archivo del inmueble
    });

    markers.push(marker); // Almacena el marcador en el array
  }

  // Intentar obtener la ubicación del usuario
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        userCoordinates = [position.coords.latitude, position.coords.longitude];

        // Inicializa el mapa con las coordenadas del usuario
        map.setView(userCoordinates, 13); // Centra el mapa en la ubicación del usuario con zoom 13

        // Agregar marcador personalizado para la ubicación del usuario
        addCircularMarker(userCoordinates[0], userCoordinates[1], "Estás aquí", 'imagenes/user-location-icon.png', '#');

        // Ahora calculamos la distancia a los inmuebles y ordenamos la lista
        calculateDistancesToProperties(userCoordinates);
      },
      (error) => {
        console.error("Error obteniendo la ubicación:", error.message);
        alert("No se pudo obtener tu ubicación. Mostrando ubicación predeterminada.");
      }
    );
  } else {
    alert("Geolocalización no está disponible en tu navegador. Mostrando ubicación predeterminada.");
  }

  // Lista de inmuebles con coordenadas
  const properties = [
    { lat: 24.78268780386428, lon: -107.39484548744825, name: 'Apartamento de Lujo', image: 'imagenes/casaPrivada.png', price: '$250,000', address: 'Calle Ficticia 123, Ciudad Ficticia', propertyPageUrl: '../paginaInmuebleAsesor/paginaInmuebleAdministrador.html' },
    { lat: 24.792194416518125, lon: -107.39428758784773, name: 'Casa en Venta en Privada', image: 'imagenes/casapriv.png', price: '$180,000', address: 'Avenida Privada 321, Ciudad Privada', propertyPageUrl: '../paginaInmuebleAsesor/paginaInmuebleAdministrador.html' },
    { lat: 24.78894608113617, lon: -107.39238321962752, name: 'Casa Amueblada para Renta', image: 'imagenes/cabana.png', price: '$1,200/mes', address: 'Plaza Principal 99, Ciudad Renta', propertyPageUrl: '../paginaInmuebleAsesor/paginaInmuebleAdministrador.html' }
  ];

  // Función para calcular la distancia entre el usuario y los inmuebles
  function calculateDistancesToProperties(userCoordinates) {
    const propertyList = document.getElementById('property-list');
    
    // Calculamos la distancia entre el usuario y cada propiedad
    const propertiesWithDistance = properties.map(property => {
      const userLocation = L.latLng(userCoordinates[0], userCoordinates[1]);
      const propertyLocation = L.latLng(property.lat, property.lon);
      const distance = userLocation.distanceTo(propertyLocation); // Distancia en metros
      const distanceInKm = (distance / 1000).toFixed(2); // Convertir a km y redondear a 2 decimales

      // Añadimos la distancia calculada a cada propiedad
      return { ...property, distance: distanceInKm };
    });

    // Ordenamos las propiedades por distancia (de más cercano a más lejano)
    const sortedProperties = propertiesWithDistance.sort((a, b) => a.distance - b.distance);

    // Ahora agregamos las propiedades ordenadas al DOM
    sortedProperties.forEach(property => {
      const listItem = document.createElement('li');
      listItem.innerHTML = `
        <img src="${property.image}" alt="${property.name}">
        <div class="property-info">
          <span class="title">${property.name}</span>
          <div class="price">${property.price}</div>
          <div class="distance">Distancia: ${property.distance} km</div>
          <div class="address">${property.address}</div>
        </div>
      `;
      
      // Añadir el marcador para el inmueble
      addCircularMarker(property.lat, property.lon, property.name, property.image, property.propertyPageUrl);

      // Añadir evento de clic para centrar el mapa y mostrar el marcador correspondiente
      listItem.addEventListener('click', () => {
        map.setView([property.lat, property.lon], 17); // Centra y hace zoom
        addCircularMarker(property.lat, property.lon, property.name, property.image, property.propertyPageUrl); // Agrega marcador
      });

      propertyList.appendChild(listItem);
    });
  }

  // Función opcional: Limpia todos los marcadores
  function clearMarkers() {
    markers.forEach(marker => map.removeLayer(marker)); // Elimina los marcadores del mapa
    markers.length = 0; // Limpia el array de marcadores
  }

  // Buscador de ubicación
  const locationInput = document.getElementById('location-input');
  const searchLocationButton = document.getElementById('search-location');

  searchLocationButton.addEventListener('click', () => {
    const location = locationInput.value;

    if (location) {
      fetch(`https://nominatim.openstreetmap.org/search?q=${location}&format=json&limit=1`)
        .then(response => response.json())
        .then(data => {
          if (data.length > 0) {
            const { lat, lon, display_name } = data[0];
            const newLatLng = [parseFloat(lat), parseFloat(lon)];

            map.setView(newLatLng, 13); // Centra el mapa en la nueva ubicación con zoom 13
            addCircularMarker(lat, lon, display_name, 'imagenes/newLoc.png', '#'); // Marcador con newLoc.png
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
});
