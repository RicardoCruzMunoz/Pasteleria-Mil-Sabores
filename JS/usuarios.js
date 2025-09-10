// Espera a que la pagina termine de cargar para buscar elementos del DOM, evita errores por elementos no existentes
document.addEventListener("DOMContentLoaded", () => {
    // seleccion del formulario y div de alerta
    const formulario = document.getElementById("formRegistro");
    const alerta = document.getElementById("regAlert");

    // Tomar el submit del formulario (html)
    formulario.addEventListener("submit", function (e) {
        e.preventDefault(); // evita que la pagina se recargue al enviar

        // tomamos valores de los input
        const nombre = document.getElementById("nombre").value.trim();
        const correo = document.getElementById("correo").value.trim();
        const password = document.getElementById("password").value;
        const password2 = document.getElementById("password2").value;
        const codigo = document.getElementById("codigo").value.trim();
        const fechaNacimiento = document.getElementById("fechaNacimiento").value;

        // validaciones

        //validar nombre : solo letras y espacios, 2 a 30 caracteres
        const validNombre = (nombre) => /^[A-Za-z\s]{2,30}$/.test(nombre);
        //validar correo : opcional duoc
        const isDuocMail = (correo) => /^[A-Za-z0-9._-]+@duoc\.cl$/.test(correo);
        //validar contraseña fuerte: 1 minus, 1 mayus, 1 numero, 1 caracter esp
        const strongPass = (password) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,100}$/.test(password);
        //validar codigo (opcional) : FELICES50
        const validCodigo = (codigo) => codigo === '' || codigo === 'FELICES50';
        //validar fechaNac
        const validFecha = (fecha) => /^\d{4}-\d{2}-\d{2}$/.test(fecha);

        const calcularEdad = (fecha) => {
            const hoy = new Date();
            const nacimiento = new Date(fecha);
            let edad = hoy.getFullYear() - nacimiento.getFullYear();
            const mesDif = hoy.getMonth() - nacimiento.getMonth();
            const diaDIf = hoy.getDate() - nacimiento.getDate();
            if (mesDif < 0 || (mesDif === 0 && diaDIf < 0)) edad--;
                return edad;
        }

        const cumpleaños = (fecha) => {
            const hoy = new Date();
            const nacimiento = new Data(fecha);
            return hoy.getDate() === nacimiento.getDate() && hoy.getMonth() === nacimiento.getMonth();
        }


        // mostrar errores
        if (errores.length > 0) {
            alerta.innerHTML = errores.join("<br>");
            alerta.style.display = "block";
            alerta.className = "alert alert-danger";
        } else {
            alerta.style.display = "block";
            alerta.className = "alert alert-success";

            let mensaje = "Formulario válido!";

            const edad = calcularEdad(fechaNacimiento);
            if (edad >= 50) mensaje += "<br>¡Felicidades! Tienes 50% de descuento en todos los productos.";

            if ((isDuocMail(correo) || isEstudianteMail(correo)) && esCumpleaños(fechaNacimiento)) {
                mensaje += "<br>¡Torta gratis por tu cumpleaños!";
            }

            alerta.innerHTML = mensaje;
        }

    });
});