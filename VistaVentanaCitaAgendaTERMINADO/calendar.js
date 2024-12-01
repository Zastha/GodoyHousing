// Lista de citas (puedes agregar más citas según sea necesario)
const citas = [
    { id: 1, nombre: "Cita 1", hora: "10:00 AM", detalle: "Espindola Leyva, 909 Huizaches Cln. Sin.", imagen: "dillon-kydd-XGvwt544g8k-unsplash 1.png", fecha: "2024-11-30" },
    { id: 2, nombre: "Cita 2", hora: "12:00 PM", detalle: "Cristian Leyva, 909 Lomas Cln. Sin.", imagen: "pexels-binyamin-mellish-106399 1.png", fecha: "2024-11-30" },
    { id: 3, nombre: "Cita 3", hora: "03:00 PM", detalle: "Hector Machaca, 909 VillaBonita Cln. Sin.", imagen: "r-architecture-0tKCSyLXqQM-unsplash 1.png", fecha: "2024-11-30" }
];

// Obtener la fecha actual en formato 'YYYY-MM-DD'
function obtenerFechaActual() {
    const fecha = new Date();
    const year = fecha.getFullYear();
    const month = ('0' + (fecha.getMonth() + 1)).slice(-2); // Mes con 2 dígitos
    const day = ('0' + fecha.getDate()).slice(-2); // Día con 2 dígitos
    return `${year}-${month}-${day}`; // Retorna la fecha en formato 'YYYY-MM-DD'
}

// Función para mostrar las citas del día
function mostrarCitasDelDia(fechaSeleccionada) {
    const citasHoy = citas.filter(cita => cita.fecha === fechaSeleccionada); // Filtrar citas por la fecha seleccionada
    const citasContainer = document.getElementById('today-appointments');
    citasContainer.innerHTML = ''; // Limpiar las citas actuales

    citasHoy.forEach(cita => {
        const citaElement = document.createElement('div');
        citaElement.classList.add('cita-item');
        citaElement.dataset.id = cita.id;  // Usamos el ID de la cita para identificarla
        citaElement.innerHTML = `
            <img src="${cita.imagen}" alt="Cita">
            <div class="cita-item-details">
                <strong>${cita.nombre}</strong>
                <em>${cita.hora}</em>
                <small>${cita.detalle}</small>
            </div>
        `;
        // Añadir evento al hacer clic sobre una cita
        citaElement.addEventListener('click', function() {
            mostrarDetallesCita(cita);
        });
        citasContainer.appendChild(citaElement);
    });

    // Si no hay citas, mostrar mensaje de no citas
    if (citasHoy.length === 0) {
        citasContainer.innerHTML = '<p>No hay citas agendadas para hoy.</p>';
    }
}

// Mostrar los detalles de la cita seleccionada
function mostrarDetallesCita(cita) {
    const detallesContainer = document.getElementById('modal-details');
    detallesContainer.innerHTML = `
        <h4>${cita.nombre}</h4>
        <p><strong>Hora:</strong> ${cita.hora}</p>
        <p><strong>Detalle:</strong> ${cita.detalle}</p>
    `;
}

// Inicializar el calendario con FullCalendar
document.addEventListener('DOMContentLoaded', function() {
    const fechaHoy = obtenerFechaActual(); // Obtener la fecha actual

    // Muestra las citas del día actual al cargar la página
    mostrarCitasDelDia(fechaHoy); // Muestra las citas para el día de hoy

    const calendar = new FullCalendar.Calendar(document.getElementById('calendar'), {
        initialDate: fechaHoy, // Usa la fecha de hoy para el calendario inicial
        events: citas.map(cita => ({
            title: cita.nombre,
            start: cita.fecha,
            description: cita.detalle,
            image: cita.imagen
        })),
        dateClick: function(info) {
            // Mostrar las citas del día de hoy en el panel derecho
            mostrarCitasDelDia(fechaHoy); // Siempre mostrar citas de hoy en el panel derecho

            // Obtener citas de la fecha seleccionada y mostrar en el modal
            mostrarModal(info.dateStr); // Mostrar modal con las citas de ese día
        }
    });

    calendar.render();
});

// Mostrar modal con las citas del día seleccionado
function mostrarModal(fecha) {
    const modal = document.getElementById('myModal');
    const modalContent = modal.querySelector('.modal-content');
    const citasDelDia = citas.filter(cita => cita.fecha === fecha); // Filtrar citas por fecha

    modalContent.innerHTML = `
        <span class="close">&times;</span>
        <h3>Detalles de las Citas para ${fecha}</h3>
        <div id="modal-details"></div>
    `;

    const modalDetails = modal.querySelector('#modal-details');
    if (citasDelDia.length > 0) {
        citasDelDia.forEach(cita => {
            const citaElement = document.createElement('div');
            citaElement.classList.add('cita-item');
            citaElement.innerHTML = `
                <img src="${cita.imagen}" alt="Cita">
                <div class="cita-item-details">
                    <strong>${cita.nombre}</strong>
                    <em>${cita.hora}</em>
                    <small>${cita.detalle}</small>
                </div>
            `;
            modalDetails.appendChild(citaElement);
        });
    } else {
        modalDetails.innerHTML = '<p>No hay citas agendadas para este día.</p>';
    }

    modal.style.display = 'block';

    // Cerrar el modal
    document.querySelector('.close').onclick = function() {
        modal.style.display = 'none';
    }
}
