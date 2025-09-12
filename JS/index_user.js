document.addEventListener("DOMContentLoaded", () => {
    const loginContainer = document.getElementById("loginContainer");
    const userContainer = document.getElementById("userContainer");
    const logoutBtn = document.getElementById("logoutBtn");

    const usuarioLogueado = JSON.parse(localStorage.getItem("usuarioLogueado"));

    if (usuarioLogueado) {
        loginContainer.classList.add("d-none");
        userContainer.classList.remove("d-none");

        userContainer.querySelector("button").innerHTML = `<i class="bi bi-list"></i>`;
    } else {
        loginContainer.classList.remove("d-none");
        userContainer.classList.add("d-none");
    }

    logoutBtn.addEventListener("click", (e) => {
        e.preventDefault();
        setTimeout(() => {
            localStorage.removeItem("usuarioLogueado");
            loginContainer.classList.remove("d-none");
            userContainer.classList.add("d-none");
        }, 1500);
    });
});
