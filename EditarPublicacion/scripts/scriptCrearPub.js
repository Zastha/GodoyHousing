// Abre el popup al hacer clic en el botón "Crear Publicación"
document.querySelector('.create-publication-button').addEventListener('click', () => {
    document.getElementById('create-publication-popup').style.display = 'flex';
  });
  
  // Cerrar el popup
  document.getElementById('close-publication-popup').addEventListener('click', () => {
    document.getElementById('create-publication-popup').style.display = 'none';
  });
  
  // Validar los campos antes de proceder a la creación de la publicación
  document.getElementById('submit-publication').addEventListener('click', (event) => {
    event.preventDefault(); // Prevenir el comportamiento por defecto (enviar formulario)
  
    const publicationType = document.getElementById('publication-type').value;
    const publicationPrice = document.getElementById('publication-price').value;
    const errorMessage = document.getElementById('error-message');
    
    // Validación de los campos
    if (!publicationType || !publicationPrice) {
      errorMessage.style.display = 'block'; // Mostrar el error si los campos están vacíos
    } else {
      errorMessage.style.display = 'none'; // Ocultar el error si los campos están completos
      
      // Lógica para proceder a crear la publicación
      alert("Publicación creada exitosamente!"); // Muestra una alerta (esto puede ser reemplazado por tu lógica de creación)
  
      // Redirigir al usuario a la página de "Cerca de Mi" si la validación es exitosa
      window.location.href = '../ClientePrimerInmueble2/PaginaInmuebleAsesor.html';
    }
  });
  