// Función para agregar la clase 'selected' al botón seleccionado y quitarla de los demás
function toggleSelection(sectionId) {
    const buttons = document.querySelectorAll(`#${sectionId} button`);
    
    buttons.forEach(button => {
      button.addEventListener('click', function() {
        // Elimina la clase 'selected' de todos los botones en la sección
        buttons.forEach(b => b.classList.remove('selected'));  
        // Agrega la clase 'selected' al botón clickeado
        button.classList.add('selected');  
      });
    });
  }
  
  // Llamamos a la función para cada sección
  toggleSelection('recamaras');
  toggleSelection('baños');
  toggleSelection('estacionamiento');