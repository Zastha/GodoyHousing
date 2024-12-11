const url = 'https://randomuser.me/api/?results=10';
// let boton = document.querySelector("button");
let lista = document.querySelector("#lista-personas");
// let foto = document.querySelector("#foto");
// let nombre = document.querySelector("#nombre");
// let direccion = document.querySelector("#direccion");
// let telefono = document.querySelector("#telefono");

const agregarPersonasLista = (persona) => {
    lista.classList.add("lista-personas");
    const tarjeta = document.createElement("article");
    tarjeta.classList.add("tarjeta");

    const foto = document.createElement("img");
    foto.setAttribute("src",persona.picture.large);
    foto.setAttribute("id", "foto");
    
    const nombre = document.createElement("article");
    nombre.textContent = persona.name.first + " " + persona.name.last;
    nombre.classList.add("nombre");

    const direccion = document.createElement("article");
    direccion.textContent = persona.email
    direccion.classList.add("email");

    const telefono = document.createElement("article");
    telefono.textContent = persona.phone;

    tarjeta.appendChild(foto);
    tarjeta.appendChild(nombre);
    tarjeta.appendChild(direccion);
    tarjeta.appendChild(telefono);
    lista.appendChild(tarjeta);

    // Agregar evento de clic a la tarjeta
    tarjeta.addEventListener('click', () => {
        mostrarModal(persona);
    });
}

const agregarTarjetaExtra = () => {
    const tarjetaExtra = document.createElement("article");
    tarjetaExtra.classList.add("tarjeta");

    const fotoExtra = document.createElement("img");
    fotoExtra.setAttribute("src", "add-icon.png"); // Cambia la ruta a la imagen que deseas mostrar
    fotoExtra.setAttribute("id", "foto, foto-extra");

    tarjetaExtra.appendChild(fotoExtra);
    lista.appendChild(tarjetaExtra);
}

const obtenerPersona = () => {
    lista.innerHTML = "";
    fetch(url).then(respuesta => respuesta.json()).then(respuesta => {
        respuesta.results.forEach(persona => {
            agregarPersonasLista(persona);
        });
        agregarTarjetaExtra(); // Agrega la tarjeta extra al final
    
    })
}

const mostrarModal = (persona) => {
    const modal = document.getElementById("modal");
    const modalFoto = document.getElementById("modal-foto");
    const modalNombre = document.getElementById("modal-nombre");
    const modalEmail = document.getElementById("modal-email");
    const modalTelefono = document.getElementById("modal-telefono");

    modalFoto.src = persona.picture.large;
    modalNombre.textContent = persona.name.first + " " + persona.name.last;
    modalEmail.textContent = persona.email;
    modalTelefono.textContent = persona.phone;

    modal.style.display = "block";
    document.body.classList.add("no-scroll"); // Desactiva el scroll vertical

    // Update the section with the selected advisor's details
    document.getElementById('asesor-nombre').textContent = persona.name.first + " " + persona.name.last;
    document.getElementById('asesor-email').textContent = persona.email;
    document.getElementById('asesor-telefono').textContent = persona.phone;

    const closeModal = document.querySelector(".close");
    closeModal.onclick = () => {
        modal.style.display = "none";
        document.body.classList.remove("no-scroll"); // Reactiva el scroll vertical
    }

    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = "none";
            document.body.classList.remove("no-scroll"); // Reactiva el scroll vertical
        }
    }

    // Store the selected advisor's details in localStorage
    localStorage.setItem('selectedAdvisor', JSON.stringify({
        name: persona.name.first + " " + persona.name.last,
        email: persona.email,
        phone: persona.phone,
        picture: persona.picture.large
    }));

    // Remove the redirection to VistaAdministradorCalendarioAsesor.html
    // window.location.href = '../VistaAdministradorCalendarioAsesor/VistaAdministradorCalendarioAsesor.html';
}

document.addEventListener('DOMContentLoaded', () => {
    const url = 'VistaAdministradorAsesorInmobiliario.json'; // Cambia esta URL a la ruta de tu JSON

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const imagenAsignados = document.getElementById('imagen-asignados');
            if (imagenAsignados) {
                imagenAsignados.src = data.inmueblesAsignados;
            } else {
                console.error('Elemento con ID "imagen-asignados" no encontrado.');
            }
        })
        .catch(error => console.error('Error al cargar el JSON:', error));
});

// boton.addEventListener("click", () => {
//     obtenerPersona();
// })

// calendario
document.addEventListener('DOMContentLoaded', () => {
    const url = 'VistaAdministradorAsesorInmobiliario.json'; // Cambia esta URL a la ruta de tu JSON

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const imagenAsignados = document.getElementById('imagen-asignados');
            if (imagenAsignados) {
                imagenAsignados.src = data.inmueblesAsignados;
            } else {
                console.error('Elemento con ID "imagen-asignados" no encontrado.');
            }
        })
        .catch(error => console.error('Error al cargar el JSON:', error));

    // Generar el calendario
    const calendario = document.getElementById('calendario');
    const diasEnMes = 30;
    const diasEnMesSiguiente = 5; // Días adicionales para completar la cuadrícula
    const diaBloqueado = 15; // Día bloqueado para simbolizar una cita agendada

    for (let i = 1; i <= diasEnMes; i++) {
        const dia = document.createElement('div');
        dia.classList.add('dia');
        dia.textContent = i;
        if (i === diaBloqueado) {
            dia.classList.add('bloqueado');
        } else {
            dia.addEventListener('click', () => {
                if (dia.classList.contains('seleccionado')) {
                    dia.classList.remove('seleccionado');
                } else {
                    document.querySelectorAll('.dia').forEach(d => d.classList.remove('seleccionado'));
                    dia.classList.add('seleccionado');
                }
            });
        }
        calendario.appendChild(dia);
    }

    for (let i = 1; i <= diasEnMesSiguiente; i++) {
        const dia = document.createElement('div');
        dia.classList.add('dia');
        dia.textContent = i;
        dia.addEventListener('click', () => {
            if (dia.classList.contains('seleccionado')) {
                dia.classList.remove('seleccionado');
            } else {
                document.querySelectorAll('.dia').forEach(d => d.classList.remove('seleccionado'));
                dia.classList.add('seleccionado');
            }
        });
        calendario.appendChild(dia);
    }
});

obtenerPersona();