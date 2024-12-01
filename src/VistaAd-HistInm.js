// Filtrar propiedades por estado
document.getElementById("filter-form").addEventListener("submit", function(event) {
    event.preventDefault();
    const status = document.getElementById("status").value;
  
    // Seleccionamos todas las tarjetas de propiedades
    const properties = document.querySelectorAll('.property-card');
  
    // Iteramos sobre las tarjetas de propiedades
    properties.forEach(card => {
      const propertyStatus = card.querySelector('.property-info p').textContent.toLowerCase();
      
      // Si el estado de la propiedad no coincide con el filtro, la ocultamos
      if (status === "all" || propertyStatus.includes(status)) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
  
  // Funcionalidad de navegación
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      alert("Página: " + e.target.textContent);
    });
  });
  
  // Cerrar sesión
  document.getElementById("LogOut").addEventListener("click", () => {
    alert("Cerrando sesión...");
    window.location.href = "login.html"; // Redirige a la página de login
  });
  