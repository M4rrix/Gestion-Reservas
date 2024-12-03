// Cargar reservas desde el localStorage
let reservas = JSON.parse(localStorage.getItem('reservas')) || []; // Si no hay datos, inicializamos con un arreglo vacío

// Función para manejar el envío del formulario
document.getElementById('form-reserva').addEventListener('submit', function(event) {
    event.preventDefault();

    // Obtener los datos del formulario
    
    let fechaIngreso = document.getElementById('fecha-ingreso').value;
    let fechaSalida = document.getElementById('fecha-salida').value;
    let nombre = document.getElementById('nombre').value.trim();
    let apellido = document.getElementById('apellido').value.trim();
    let dni = document.getElementById('dni').value.trim();
    let contacto = document.getElementById('contacto').value.trim();
    let montoReserva = parseFloat(document.getElementById('monto-reserva').value);
    let montoRestante = parseFloat(document.getElementById('monto-restante').value);

    // Validación básica de campos
    if (!fechaIngreso || !fechaSalida || !nombre || !apellido || !dni || !contacto || isNaN(montoReserva) || isNaN(montoRestante)) {
        alert('Por favor, complete todos los campos correctamente.');
        return;
    }

    // Crear un objeto con los datos de la reserva
    let reserva = {
        fechaIngreso,
        fechaSalida,
        nombre,
        apellido,
        dni,
        contacto,
        montoReserva,
        montoRestante
    };

    // Agregar la reserva al arreglo
    reservas.push(reserva);

    // Guardar las reservas en el localStorage
    localStorage.setItem('reservas', JSON.stringify(reservas));

    // Limpiar el formulario
    document.getElementById('form-reserva').reset();

    // Mostrar las reservas en la tabla
    mostrarReservas();
});


// Función para dar formato a las fechas (dd/mm/yyyy)
function formatearFecha(fecha) {
    let [anio, mes, dia] = fecha.split('-');
    return `${dia}/${mes}/${anio}`;
}

// Función para dar formato a los montos (con coma como separador de miles)
function formatearMonto(monto) {
    return `$${monto.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
}

// Función para mostrar las reservas en la tabla
function mostrarReservas() {
    let tbody = document.getElementById('tabla-reservas').getElementsByTagName('tbody')[0];
    tbody.innerHTML = ''; // Limpiar la tabla antes de mostrarla

    reservas.forEach((reserva, index) => {
        let tr = document.createElement('tr');
        tr.innerHTML = `
            <td data-label="Fecha Ingreso">${formatearFecha(reserva.fechaIngreso)}</td>
            <td data-label="Fecha Salida">${formatearFecha(reserva.fechaSalida)}</td>
            <td data-label="Nombre">${reserva.nombre}</td>
            <td data-label="Apellido">${reserva.apellido}</td>
            <td data-label="DNI">${reserva.dni}</td>
            <td data-label="Contacto">${reserva.contacto}</td>
            <td data-label="Monto Reserva">${formatearMonto(reserva.montoReserva)}</td>
            <td data-label="Restante">${formatearMonto(reserva.montoRestante)}</td>
            <td><button class="btn-eliminar" data-id="${index}">Eliminar</button></td>
        `;
        tbody.appendChild(tr);
    });

    // Agregar manejador de eventos a los botones de eliminación
    let botonesEliminar = document.querySelectorAll('.btn-eliminar');
    botonesEliminar.forEach(boton => {
        boton.addEventListener('click', function() {
            let index = this.getAttribute('data-id');
            eliminarReserva(index);
        });
    });
}

// Función para eliminar una reserva
function eliminarReserva(index) {
    // Confirmar con el usuario antes de eliminar la reserva
    if (confirm('¿Estás seguro de que deseas eliminar esta reserva?')) {
        // Eliminar la reserva del arreglo
        reservas.splice(index, 1);

        // Actualizar el localStorage
        localStorage.setItem('reservas', JSON.stringify(reservas));

        // Mostrar las reservas actualizadas
        mostrarReservas();
    }
}

// Mostrar las reservas al cargar la página
mostrarReservas();
