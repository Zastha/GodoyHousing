console.log('nuevoContrato.js loaded');
const btn1 = document.getElementById('btn1');
const btn2 = document.getElementById('btn2');
const imagen = document.getElementById('imagen');

if (btn1 && btn2 && imagen) {
    btn1.addEventListener('click', function() {
        imagen.src = '../contrato/image 8.png'; // Cambia la ruta a la imagen que deseas mostrar
        btn1.classList.add('selected');
        btn2.classList.remove('selected');
    });

    btn2.addEventListener('click', function() {
        imagen.src = '../contrato/R.jpg'; // Cambia la ruta a la otra imagen que deseas mostrar
        btn2.classList.add('selected');
        btn1.classList.remove('selected');
    });
} else {
    console.error('Buttons or image not found');
}

const form = document.getElementById('nuevoContratoForm');

if (form) {
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        console.log('Form submitted');
        // Handle form submission logic here
    });
} else {
    console.error('Form not found');
}