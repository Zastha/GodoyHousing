document.addEventListener("DOMContentLoaded", () => {
  const carousel = document.getElementById('carousel'); // El carrusel de tarjetas
  let scrollAmount = 0; // Cantidad de desplazamiento actual
  const scrollSpeed = 50; // Velocidad del desplazamiento (puedes ajustarlo según lo desees)
  const maxScroll = carousel.scrollWidth - carousel.clientWidth; // Máximo desplazamiento

  // Función para mover el carrusel
  function moveCarousel(direction) {
    if (direction === 'left') {
      if (scrollAmount > 0) {
        scrollAmount -= scrollSpeed;
        carousel.scrollTo({
          left: scrollAmount,
          behavior: 'smooth'
        });
      }
    } else if (direction === 'right') {
      if (scrollAmount < maxScroll) {
        scrollAmount += scrollSpeed;
        carousel.scrollTo({
          left: scrollAmount,
          behavior: 'smooth'
        });
      }
    }
  }

  // Detectar cuando el mouse se acerca a los bordes del carrusel
  carousel.addEventListener('mousemove', (e) => {
    const carouselRect = carousel.getBoundingClientRect();
    const mouseX = e.clientX; // Posición X del mouse

    if (mouseX < carouselRect.left + 50) {
      moveCarousel('left'); // Mover el carrusel hacia la izquierda
    } else if (mouseX > carouselRect.right - 50) {
      moveCarousel('right'); // Mover el carrusel hacia la derecha
    }
  });

  // Si el carrusel alcanza el final, dejar de moverlo
  carousel.addEventListener('scroll', () => {
    scrollAmount = carousel.scrollLeft;
  });

  // Botones de navegación
  const nextButton = document.querySelector('.next-button');
  const prevButton = document.querySelector('.prev-button');

  nextButton.addEventListener('click', () => {
    moveCarousel('right');
  });

  prevButton.addEventListener('click', () => {
    moveCarousel('left');
  });
});
