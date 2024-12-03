// Cargar reservas desde el localStorage
let reservas = JSON.parse(localStorage.getItem('reservas')) || []; // Si no hay datos, inicializamos con un arreglo vacío

// Función para manejar el envío del formulario
document.getElementById('form-reserva').addEventListener('submit', function(event) {
    event.preventDefault();

    // Obtener los datos del formulario
    let nombre = document.getElementById('nombre').value;
    let apellido = document.getElementById('apellido').value;
    let dni = document.getElementById('dni').value;
    let contacto = document.getElementById('contacto').value;
    let fechaIngreso = document.getElementById('fecha-ingreso').value;
    let fechaSalida = document.getElementById('fecha-salida').value;
    let montoReserva = parseFloat(document.getElementById('monto-reserva').value);
    let montoRestante = parseFloat(document.getElementById('monto-restante').value);

    // Crear un objeto con los datos de la reserva
    let reserva = {
        nombre,
        apellido,
        dni,
        contacto,
        fechaIngreso,
        fechaSalida,
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

// Función para mostrar las reservas en la tabla
function mostrarReservas() {
    let tbody = document.getElementById('tabla-reservas').getElementsByTagName('tbody')[0];
    tbody.innerHTML = ''; // Limpiar la tabla antes de mostrarla

    reservas.forEach(reserva => {
        let tr = document.createElement('tr');
        tr.innerHTML = `
            <td data-label="Nombre">${reserva.nombre}</td>
            <td data-label="Apellido">${reserva.apellido}</td>
            <td data-label="DNI">${reserva.dni}</td>
            <td data-label="Contacto">${reserva.contacto}</td>
            <td data-label="Fecha Ingreso">${reserva.fechaIngreso}</td>
            <td data-label="Fecha Salida">${reserva.fechaSalida}</td>
            <td data-label="Monto Reserva">$${reserva.montoReserva}</td>
            <td data-label="Restante">$${reserva.montoRestante}</td>
        `;
        tbody.appendChild(tr);
    });
}

// Mostrar las reservas al cargar la página
mostrarReservas();

