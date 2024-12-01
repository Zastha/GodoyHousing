document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded event fired');
    const openModalBtn = document.getElementById('openModalBtn');
    const modal = document.getElementById('modal');
    const closeModal = document.querySelector('.close');
    const modalBody = document.getElementById('modal-body');

    if (openModalBtn) {
        console.log('openModalBtn found');
        openModalBtn.addEventListener('click', () => {
            console.log('openModalBtn clicked');
            fetch('../nuevoContrato/nuevoContrato.html') // Asegúrate de que esta ruta sea correcta
                .then(response => {
                    console.log('Response received:', response);
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.text();
                })
                .then(data => {
                    console.log('Data loaded:', data);
                    modalBody.innerHTML = data;
                    modal.style.display = 'flex'; // Cambiar a 'flex' para centrar

                    // Agregar referencia al CSS si no está presente
                    const cssLink = document.createElement('link');
                    cssLink.rel = 'stylesheet';
                    cssLink.href = '../nuevoContrato/nuevoContrato.css'; // Asegúrate de que esta ruta sea correcta
                    document.head.appendChild(cssLink);

                    // Ejecutar scripts en el HTML cargado
                    const scripts = modalBody.getElementsByTagName('script');
                    for (let i = 0; i < scripts.length; i++) {
                        const script = document.createElement('script');
                        script.textContent = scripts[i].textContent;
                        document.body.appendChild(script);
                    }

                    // Load and execute nuevoContrato.js
                    const nuevoContratoScript = document.createElement('script');
                    nuevoContratoScript.src = '../nuevoContrato/nuevoContrato.js';
                    document.body.appendChild(nuevoContratoScript);
                })
                .catch(error => console.error('Error al cargar el HTML:', error));
        });
    } else {
        console.error('openModalBtn not found');
    }

    if (closeModal) {
        console.log('closeModal found');
        closeModal.addEventListener('click', () => {
            console.log('closeModal clicked');
            modal.style.display = 'none';
        });
    } else {
        console.error('closeModal not found');
    }

    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            console.log('Window clicked outside modal');
            modal.style.display = 'none';
        }
    });

    // Ensure modal is hidden on page load
    modal.style.display = 'none';
});