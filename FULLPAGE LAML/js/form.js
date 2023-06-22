'use strict';

const input_nombre_completo = document.querySelector('#txt-nombre_completo');
const fechaReserva = document.querySelector('#txt-fecha-reserva');

const input_email = document.querySelector('#txt-email');
const input_telefono = document.querySelector('#txt-telefono');
const boton_reservar = document.querySelector('#btn-reservar');



let validar_contra_blacos = () => {
    let error = false;
    let error_fechas = false;
    let error_correo = false;

    let elementos_requeridos = document.querySelectorAll('[required]');
    let validacion_arroba_correo = /^[a-z._\d]+@[a-z\d]+\.[a-z]+\.?[a-z]+?$/;
    //ciclo que determina la llamada de la alerta error rojo de los campos
    for (let i = 0; i < elementos_requeridos.length; i++) {
        if (elementos_requeridos[i].value == '') {
            elementos_requeridos[i].classList.add('input-error');
            error = true;
        } else {
            elementos_requeridos[i].classList.remove('input-error');
        }
    }


    //CARGA FUNCIONES DE CAMPOS FECHAS-CORREO-sexo-TERMINOS

    validar_fechas();
    validar_correo();

    return error;
};


//VALIDACION DE LOS CAMPOS FECHAS INICIO-FINAL

let validar_fechas = () => {
    let error = false;
    let error_fechas = false;
    if (new Date(fechaReserva.value) == "") {
        fechaReserva.classList.add('input-error');
        error = true;
        return error_fechas = true;
    }


}


//VALIDACION DEL CAMPO CORREO ELECTRONICO

let validar_correo = () => {
    let error = false;
    let error_correo = false;
    let validacion_arroba_correo = /^[a-z._\d]+@[a-z\d]+\.[a-z]+\.?[a-z]+?$/;
    if (validacion_arroba_correo.test(input_email.value) == false) {
        input_email.classList.add('input-error');
        error = true;
        error_correo = true;
    }
    return error_correo;
}




// LIMPIAR LOS CAMPOS DEL FORM

let limpiar = () => {
    input_nombre_completo.value = '';
    fechaReserva.value = '';
    input_email.value = '';
    input_telefono.value = '';
    document.getElementById("checkbox_y_terminos_y_condiciones").checked = false;
    document.getElementById("femenino").checked = false;
    document.getElementById("masculino").checked = false;
};

let obtener_datos = () => {
    let error_validacion_contra_blancos = validar_contra_blacos();

    if (error_validacion_contra_blancos) {
        Swal.fire({
            title: 'No se han podido enviar sus datos.',
            text: 'Por favor revisar los campos resaltados de color rojo del formulario.',
            icon: 'warning'
        })
    } else {
        if (validar_fechas()) {
            Swal.fire({
                title: 'Las fechas están incorrectas.',
                text: 'La fecha de entrada tiene que ser menor a la fecha de salida y ambas tienen que ser diferentes',
                icon: 'warning'
            })
        } else {
            if (validar_correo()) {
                Swal.fire({
                    title: 'La dirección de correo electrónico está incorrecta. Agregar el signo arrova @',
                    text: 'La dirección de correo tiene que tener el formato correcto, incluyendo el arroba ("@")',
                    icon: 'warning'
                })

            } else {
                let nombre_completo = input_nombre_completo.value;
                let fecha = fechaReserva.value;
                let email = input_email.value;
                let telefono = input_telefono.value;

                Swal.fire({
                    title: 'El formulario se lleno correctamente.',
                    text: 'Sus datos han sido registrados.',
                    icon: 'success'

                }).then(() => {
                    limpiar();
                });
            }

        }
    }
};


//CARGA DEL BOTON RESERVAR
boton_reservar.addEventListener('click', obtener_datos);