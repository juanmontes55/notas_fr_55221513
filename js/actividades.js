let indexActividad = 0;

$(document).ready(function () {
    mostrarActividades();
});

function mostrarActividades() {
    $.ajax({
        method: 'get',
        url: 'http://localhost:8000/actividades'
    }).done((response) => {
        const dataJson = JSON.parse(response);
        const actividades = dataJson.data;
        const table = document.getElementById('actividadesTb');
        const tbody = table.getElementsByTagName('tbody')[0];
        let html = '';

        actividades.forEach(actividad => {
            html += '<tr>';
            html += '   <td>' + actividad.id + '</td>';
            html += '   <td>' + actividad.descripcion + '</td>';
            html += '   <td>' + actividad.nota + '</td>';
            html += '   <td>';
            html += '      <button onclick="modificar(' + actividad.id + ')">Modificar</button>';
            html += '   </td>';
            html += '   <td>';
            html += '      <button onclick="eliminar(' + actividad.id + ')">Eliminar</button>';
            html += '   </td>';
            html += '</tr>';
        });

        tbody.innerHTML = html;
    }).fail((error) => {
        console.error(error);
    });
}

document.getElementById('registrar').addEventListener('click', () => {
    indexActividad = -1;
    document.getElementById('tituloModal').innerText = 'Registrar';
});

document.getElementById('guardar').addEventListener('click', () => {
    let formulario = document.forms['formularioActividad'];
    let descripcion = formulario['descripcion'].value;
    let nota = formulario['nota'].value;

    if (descripcion === "" || nota === "") {
        alert("Por favor, complete todos los campos.");
        return;
    }

    if (indexActividad == -1) {
        // CREAR
        $.ajax({
            url: 'http://localhost:8000/actividades',
            method: 'post',
            data: {
                descripcion: descripcion,
                nota: nota
            }
        }).done(response => {
            const dataJson = JSON.parse(response);
            const msg = dataJson.data;
            alert(msg);
            mostrarActividades();
            location.reload();
        });
    } else if (indexActividad == 1) {
        // MODIFICAR
        let formularioModificar = document.forms['formularioActividad'];
        let descripcionModificar = formularioModificar['descripcion'].value;
        let notaModificar = formularioModificar['nota'].value;

        if (descripcionModificar === "" || notaModificar === "") {
            alert("Por favor, complete todos los campos.");
            return;
        }

        $.ajax({
            url: 'http://localhost:8000/actividades/' + id,
            method: 'put',
            data: {
                descripcion: descripcionModificar,
                nota: notaModificar,
            }
        }).done(response => {
            const dataJson = JSON.parse(response);
            const msg = dataJson.data;
            alert(msg);
            mostrarActividades();
            location.reload();
        });
    }
});

let modificar = function (actividadId) {
    document.getElementById('tituloModal').innerText = 'Modificar';
    indexActividad = 1;
    id = actividadId;
};

//ELIMINAR
let eliminar = function (id) {
    $.ajax({
        url: 'http://localhost:8000/actividades/' + id,
        method: 'delete',
    }).done(response => {
        const dataJson = JSON.parse(response);
        const msg = dataJson.data;
        alert(msg);
        mostrarActividades();
        location.reload();
    });
};