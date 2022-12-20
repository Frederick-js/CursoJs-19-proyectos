document.addEventListener("DOMContentLoaded", function () {
    // DOMContentLoaded para cargar todo el  dom

    const email = {
        email: "",
        asunto: "",
        mensaje: "",
    };

    //Seleccionar los elementos de la interfaz
    const inputEmail = document.querySelector("#email"); // Seleccion por id (#)
    const inputAsunto = document.querySelector("#asunto");
    const inputMensaje = document.querySelector("#mensaje");
    const formulario = document.querySelector("#formulario");
    const btnSubmit = document.querySelector('#formulario button[type="submit"]'); // Selecciona el boton submit
    const btnReset = document.querySelector('#formulario button[type="reset"]');
    const spinner = document.querySelector("#spinner");

    // Asignar eventos
    inputEmail.addEventListener("blur", validar);
    inputAsunto.addEventListener("blur", validar);
    inputMensaje.addEventListener("blur", validar);
    formulario.addEventListener('submit', enviarEmail);

    btnReset.addEventListener('click', function (e) {
        e.preventDefault(); // previene el comportamiento de reset de inmediato

        // reiniciar el objeto
        resetFormulario();

    });

    // funcion enviarEmail
    function enviarEmail(e) {
        e.preventDefault();
        spinner.classList.remove('hidden');
        spinner.classList.add('flex');
        setTimeout((e) => {
            spinner.classList.remove('flex');
            spinner.classList.add('hidden');

            // reiniciar el objeto
            resetFormulario();

            // crear una alerta
            const alertaExito = document.createElement('P');
            alertaExito.classList.add('bg-green-500', 'text-white', 'p-2', 'text-center', 'rounded-lg', 'mt-10', 'font-bold', 'text-sm', 'uppercase');
            alertaExito.textContent = 'Mensaje enviado correctamente';
            formulario.appendChild(alertaExito);

            setTimeout(() => {
                alertaExito.remove();
            }, 3000);

        }, 3000)
    }

    function validar(e) {
        if (e.target.value.trim() === "") {
            // .trim es para borrar espacios en blanco muy bueno para los formularios
            mostrarAlerta(
                `El campo ${e.target.id} es obligatorio`,
                e.target.parentElement
            );
            email[e.target.id] = "";
            comprobarEmail();
            return;
        }

        if (e.target.id === "email" && !validarEmail(e.target.value)) {
            mostrarAlerta("El email no es valido", e.target.parentElement);
            email[e.target.name] = "";
            comprobarEmail();
            return;
        }

        limpiarAlerta(e.target.parentElement);

        // Asignar los valores
        email[e.target.id] = e.target.value.trim().toLowerCase(); // lo coloca en minusculas toLowerCase

        // Comprobar el objeto de email
        comprobarEmail();
    }

    function limpiarAlerta(referencia) {
        // comprueba si ya existe una alerta
        const alerta = referencia.querySelector(".bg-red-600");
        if (alerta) {
            alerta.remove();
        }
    }

    function mostrarAlerta(mensaje, referencia) {

        // Ejecuta la funcion para limpiar la alerta
        limpiarAlerta(referencia);

        // Generar alerta en html
        const error = document.createElement("P");
        error.textContent = mensaje; // Agrega el texto el parrafo error // innerHTML no escapa los datos

        // Agregamos clases de Tailwind al mensaje de error
        error.classList.add("bg-red-600", "text-white", "p-2", "text-center"); // esa clase bg-red-600' es de tailwindcss.

        // Inyectar el error al formulario
        referencia.appendChild(error);
    }



    function validarEmail(email) {
        const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        const resultado = regex.test(email);
        return resultado;
    }

    function comprobarEmail() {

        if (Object.values(email).includes('')) {
            //  Object.values saca lo del lado derecho.   // Object.keys los de la izquierda

            btnSubmit.classList.add('opacity-50');
            btnSubmit.disabled = true;
            return; // Desactiva el boton enviar y termina la validacion
        }
        // En caso de que el objeto email este lleno se activa el boton enviar
        btnSubmit.classList.remove("opacity-50", "cursor-not-allowed");
        btnSubmit.disabled = false;

    }


    function resetFormulario() {
        // reiniciar el objeto
        email.email = '';
        email.asunto = '';
        email.mensaje = '';

        formulario.reset();
        comprobarEmail();
    }

});
