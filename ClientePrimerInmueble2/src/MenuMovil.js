document.addEventListener('DOMContentLoaded', function() {
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const mobileMenu = document.querySelector('.mobile-menu');
  
    hamburgerMenu.addEventListener('click', function() {
      mobileMenu.classList.toggle('active');
    });
  
    // Cerrar el menú móvil si se hace clic fuera de él
    document.addEventListener('click', function(event) {
      const isClickInsideMenu = mobileMenu.contains(event.target);
      const isClickInsideHamburger = hamburgerMenu.contains(event.target);
  
      if (!isClickInsideMenu && !isClickInsideHamburger) {
        mobileMenu.classList.remove('active');
      }
    });
  });