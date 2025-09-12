document.addEventListener("DOMContentLoaded", () => {

    // --- Control del banner solo si existe ---
    const loginContainer = document.getElementById("loginContainer");
    const userContainer = document.getElementById("userContainer");
    const logoutBtn = document.getElementById("logoutBtn");

    if (loginContainer && userContainer && logoutBtn) {
        const usuarioLogueado = JSON.parse(localStorage.getItem("usuarioLogueado"));

        if (usuarioLogueado) {
            loginContainer.classList.add("d-none");
            userContainer.classList.remove("d-none");
            userContainer.querySelector("button").textContent = usuarioLogueado.nombre;
        } else {
            loginContainer.classList.remove("d-none");
            userContainer.classList.add("d-none");
        }

        logoutBtn.addEventListener("click", () => {
            localStorage.removeItem("usuarioLogueado");
            loginContainer.classList.remove("d-none");
            userContainer.classList.add("d-none");
        });
    }

    // --- Login solo si existe ---
    const formLogin = document.getElementById("formLogin");
    const alertaLogin = document.getElementById("loginAlert");

    if (formLogin && alertaLogin) {
        function showLoginAlert(message, type = "danger") {
            alertaLogin.textContent = message;
            alertaLogin.className = `alert alert-${type} mt-2`;
            alertaLogin.classList.remove("d-none");
        }

        formLogin.addEventListener("submit", (e) => {
            e.preventDefault();

            const correo = document.getElementById("correoLogin").value.trim();
            const password = document.getElementById("passwordLogin").value;

            const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
            const usuarioEncontrado = usuarios.find(u => u.correo === correo && u.password === password);

            if (usuarioEncontrado) {
                localStorage.setItem("usuarioLogueado", JSON.stringify(usuarioEncontrado));
                showLoginAlert("Inicio de sesión exitoso", "success");

                setTimeout(() => {
                    window.location.href = "index.html";
                }, 1500);
            } else {
                showLoginAlert("Correo o contraseña incorrectos");
            }
        });
    }
});
