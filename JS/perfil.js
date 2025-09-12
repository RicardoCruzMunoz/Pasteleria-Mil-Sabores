document.addEventListener("DOMContentLoaded", () => {
    const perfilForm = document.getElementById("perfilForm");
    const alerta = document.getElementById("perfilAlert");

    const usuarioLogueado = JSON.parse(localStorage.getItem("usuarioLogueado"));
    if (!usuarioLogueado) {
        alert("No hay usuario logueado");
        window.location.href = "acceso.html";
        return;
    }

    document.getElementById("nombre").value = usuarioLogueado.nombre || "";
    document.getElementById("correo").value = usuarioLogueado.correo || "";
    document.getElementById("codigo").value = usuarioLogueado.codigo || "";
    document.getElementById("fechaNacimiento").value = usuarioLogueado.fechaNacimiento || "";
    document.getElementById("password").value = usuarioLogueado.password || "";

    function showAlert(message, type = "success") {
        alerta.textContent = message;
        alerta.className = `alert alert-${type}`;
        alerta.classList.remove("d-none");
        setTimeout(() => alerta.classList.add("d-none"), 2500);
    }

    perfilForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const nombre = document.getElementById("nombre").value.trim();
        const correo = document.getElementById("correo").value.trim();
        const codigo = document.getElementById("codigo").value.trim();
        const fechaNacimiento = document.getElementById("fechaNacimiento").value;
        const password = document.getElementById("password").value;

        if (!nombre || !correo || !fechaNacimiento || !password) {
            showAlert("Por favor, complete todos los campos requeridos.", "danger");
            return;
        }

        const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
        const index = usuarios.findIndex(u => u.correo === usuarioLogueado.correo);

        if (index !== -1) {
            usuarios[index] = {
                ...usuarios[index],
                nombre,
                correo,
                codigo,
                fechaNacimiento,
                password
            };
            localStorage.setItem("usuarios", JSON.stringify(usuarios));
            localStorage.setItem("usuarioLogueado", JSON.stringify(usuarios[index]));
            showAlert("Datos actualizados correctamente ✅");
        } else {
            showAlert("Error: usuario no encontrado.", "danger");
        }
    });
});
