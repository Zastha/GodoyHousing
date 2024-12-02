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

  const contactButton = document.querySelector('.nav-link.contactanos');
  const modal = document.createElement('div');
  modal.classList.add('modal');
  document.body.appendChild(modal);

  contactButtons.forEach(contactButton => {
    contactButton.addEventListener('click', function(event) {
        event.preventDefault();
        modal.style.display = 'block';
        fetch('../contactanos/contactanos.html')
            .then(response => response.text())
            .then(data => {
                modal.innerHTML = `<div class="modal-content">${data}</div>`;
                const modalContent = modal.querySelector('.modal-content');
                // Load the CSS file content and append it to the modal
                fetch('../contactanos/contactanos.css')
                    .then(response => response.text())
                    .then(css => {
                        const style = document.createElement('style');
                        style.textContent = css;
                        document.head.appendChild(style);
                    });
                // Add close button functionality to the dynamically loaded content
                const newCloseModal = modalContent.querySelector('.close-modal');
                if (newCloseModal) {
                    newCloseModal.addEventListener('click', function() {
                        modal.style.display = 'none';
                    });
                }
                // Add event listener to the "Agendar" button to close the modal
                const agendarButton = modalContent.querySelector('.agendar');
                if (agendarButton) {
                    agendarButton.addEventListener('click', function() {
                        modal.style.display = 'none';
                    });
                }
            });
    });
  });

  window.addEventListener('click', function(event) {
      if (event.target === modal) {
          modal.style.display = 'none';
      }
  });
});