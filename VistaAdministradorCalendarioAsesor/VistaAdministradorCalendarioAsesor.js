const citas = [
    { 
        id: 1, 
        nombreCliente: "Juan Pérez", 
        numeroCliente: "1234567890", 
        fecha: "2024-12-01", 
        hora: "10:00 AM", 
        direccion: "Les Polles hermanes, 909 Huizaches Cln. Sin.", 
        nombreAsesor: "Carlos Martínez",
    },
    { 
        id: 2, 
        nombreCliente: "Cristian Leyva", 
        numeroCliente: "9876543210", 
        fecha: "2024-12-02", 
        hora: "12:00 PM", 
        direccion: "Los Pollos hermanos, 909 Lomas Cln. Sin.", 
        nombreAsesor: "Laura Rodríguez",
    },
    { 
        id: 3, 
        nombreCliente: "Héctor Machaca", 
        numeroCliente: "6543210987", 
        fecha: "2024-12-03", 
        hora: "03:00 PM", 
        direccion: "Chinalou, 909 VillaBonita Cln. Sin.", 
        nombreAsesor: "Luis Gómez",
    }
];

let fechaSeleccionada = obtenerFechaActual(); // Inicialmente, la fecha actual

function obtenerFechaActual() {
    const fecha = new Date();
    const year = fecha.getFullYear();
    const month = ('0' + (fecha.getMonth() + 1)).slice(-2); // Mes con 2 dígitos
    const day = ('0' + fecha.getDate()).slice(-2); // Día con 2 dígitos
    return `${year}-${month}-${day}`; // Retorna la fecha en formato 'YYYY-MM-DD'
}

function mostrarCitasDelDia(fechaSeleccionada) {
    const citasHoy = citas.filter(cita => cita.fecha === fechaSeleccionada); // Filtrar citas por la fecha seleccionada
    const citasContainer = document.getElementById('today-appointments');
    citasContainer.innerHTML = ''; // Limpiar las citas actuales

    citasHoy.forEach(cita => {
        const citaElement = document.createElement('div');
        citaElement.classList.add('cita-item');
        citaElement.dataset.id = cita.id;  // Usamos el ID de la cita para identificarla
        citaElement.innerHTML = `
            <div class="cita-item-details">
                <strong>${cita.nombreCliente}</strong>
                <em>${cita.numeroCliente}</em>
                <em>${cita.fecha}</em>
                <em>${cita.hora}</em>
                <small>${cita.direccion}</small>
                <small>${cita.nombreAsesor}</small>
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
        citasContainer.innerHTML = '<p>No hay citas agendadas para este día.</p>';
    }
}

function mostrarDetallesCita(cita) {
    const detallesContainer = document.getElementById('modal-details');
    detallesContainer.innerHTML = `
        <h4>${cita.nombreCliente}</h4>
        <p><strong>Hora:</strong> ${cita.numeroCliente}</p>
        <p><strong>Dirección:</strong> ${cita.direccion}</p>
        <p><strong>Asesor:</strong> ${cita.fecha}</p>
        <p><strong>Número Cliente:</strong> ${cita.hora}</p>
        <p><strong>Dirección:</strong> ${cita.direccion}</p>
        <p><strong>Asesor:</strong> ${cita.nombreAsesor}</p>
    `;
}

function abrirModal() {
    document.getElementById('add-appointment-modal').style.display = 'block';
}

function cerrarModal() {
    document.getElementById('add-appointment-modal').style.display = 'none';
}

function agregarCita(event) {
    event.preventDefault(); // Evitar el envío del formulario
    const nombreCliente = document.getElementById('appointment-name').value;
    const hora = document.getElementById('appointment-time').value;
    const direccion = document.getElementById('appointment-details').value;
    const numeroCliente = document.getElementById('appointment-phone').value;
    const nombreAsesor = document.getElementById('appointment-advisor').value;

    const nuevaCita = {
        id: citas.length + 1,
        nombreCliente,
        numeroCliente,
        fecha: fechaSeleccionada, // Usar la fecha seleccionada
        hora,
        direccion,
        nombreAsesor
    };

    // Agregar la nueva cita al array de citas
    citas.push(nuevaCita);

    // Mostrar las citas del día actualizado
    mostrarCitasDelDia(fechaSeleccionada);

    // Cambiar el color del recuadro del día y agregar la etiqueta con el nombre del cliente
    cambiarColorDia(fechaSeleccionada, nuevaCita.nombreCliente);

    // Cerrar el modal
    cerrarModal();
}

function cambiarColorDia(fecha, nombreCliente) {
    const diaElement = document.querySelector(`.fc-day[data-date="${fecha}"]`);
    if (diaElement) {
        diaElement.classList.add('dia-con-cita');
        const etiquetaCliente = document.createElement('span');
        etiquetaCliente.classList.add('etiqueta-cliente');
        etiquetaCliente.textContent = nombreCliente;
        diaElement.appendChild(etiquetaCliente);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const fechaHoy = obtenerFechaActual(); // Obtener la fecha actual

    // Muestra las citas del día actual al cargar la página
    mostrarCitasDelDia(fechaHoy);

    const calendar = new FullCalendar.Calendar(document.getElementById('calendar'), {
        initialDate: fechaHoy,
        events: citas.map(cita => ({
            title: cita.nombreCliente,
            start: cita.fecha,
            description: `${cita.direccion} - ${cita.nombreAsesor}`,
        })),
        dateClick: function(info) {
            // Guardar la fecha seleccionada
            fechaSeleccionada = info.dateStr;
            // Mostrar las citas del día seleccionado
            mostrarCitasDelDia(fechaSeleccionada);
        }
    });

    calendar.render();

    // Agregar evento para abrir el modal
    document.getElementById('add-appointment-btn').addEventListener('click', abrirModal);

    // Agregar evento para cerrar el modal
    document.getElementById('close-modal-btn').addEventListener('click', cerrarModal);

    // Agregar evento para enviar el formulario
    document.getElementById('add-appointment-form').addEventListener('submit', agregarCita);
});

document.addEventListener('DOMContentLoaded', () => {
    const advisor = JSON.parse(localStorage.getItem('selectedAdvisor'));

    if (advisor) {
        document.getElementById('asesor-nombre').innerHTML = `Calendario de citas ${advisor.name}`;
        document.getElementById('asesor-email').innerHTML = `Correo: <span class="advisor-info-box">${"   "+advisor.email}</span>`;
        document.getElementById('asesor-telefono').innerHTML = `Teléfono: <span class="advisor-info-box">${advisor.phone}</span>`;
        document.getElementById('asesor-foto').src = advisor.picture;
        document.querySelector('#container p#asesor-nombre').innerHTML = `Nombre: <span class="advisor-info-box">${advisor.name}</span>`;
    } else {
        console.error('No advisor details found in localStorage.');
    }
});