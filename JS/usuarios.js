document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("formRegistro");
    const alerta = document.getElementById("regAlert");

    function showAlert(message, type = "success"){
        alerta.textContent = message;
        alerta.className = `alert alert-${type}`;
        alerta.classList.remove("d-none");
    }

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const nombre = document.getElementById("nombre").value.trim();
        const correo = document.getElementById("correo").value.trim();
        const password = document.getElementById("password").value;
        const password2 = document.getElementById("password2").value;
        const codigo = document.getElementById("codigo").value.trim();
        const fechaNacimiento = document.getElementById("fechaNacimiento").value;

        const regexNombre = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{1,80}$/; 
        const regexCorreoGeneral = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/;
        const regexCorreoDuoc = /@duoc\.cl$/i;
        const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#])[A-Za-z\d@$!%*?&.#]{8,}$/;
        const regexCodigo = /^$|^[0-9]{4,8}$/;

        // Validaciones
        if (!regexNombre.test(nombre)) {
            showAlert("El nombre solo puede contener letras y espacios (máx. 80).", "danger");
            return;
        }

        // Correo opcional: solo validamos si NO está vacío
        if (correo && !regexCorreoGeneral.test(correo)) {
            showAlert("Debe ser un correo electrónico válido.", "danger");
            return;
        }

        if (!regexPassword.test(password)) {
            showAlert("La contraseña debe tener mínimo 8 caracteres, mayúscula, minúscula, número y símbolo.", "danger");
            return;
        }
        if (password !== password2) {
            showAlert("Las contraseñas no coinciden.", "danger");
            return;
        }
        if (!regexCodigo.test(codigo)) {
            showAlert("El código debe tener entre 4 y 8 dígitos o estar vacío.", "danger");
            return;
        }
        if (!fechaNacimiento) {
            showAlert("Debes ingresar tu fecha de nacimiento.", "danger");
            return;
        }

        // Revisar duplicado
        const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
        if (correo && usuarios.some(u => u.correo === correo)) {
            showAlert("Este correo ya está registrado.", "danger");
            return;
        }

        const esDuoc = correo ? regexCorreoDuoc.test(correo) : false;

        const nuevoUsuario = {
            nombre,
            correo,
            password,
            codigo,
            fechaNacimiento,
            beneficioDuoc: esDuoc
        };

        usuarios.push(nuevoUsuario);
        localStorage.setItem("usuarios", JSON.stringify(usuarios));

        if (esDuoc) {
            showAlert("Cuenta creada con éxito 🎉 ¡Obtendrás torta gratis en tu cumpleaños por ser de Duoc!", "success");
        } else {
            showAlert("Cuenta creada con éxito.", "success");
        }

        form.reset();
    });
});
