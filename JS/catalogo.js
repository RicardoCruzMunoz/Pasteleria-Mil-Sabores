
const catalogo = document.getElementById('tortas');

productos.forEach(p => {
    const identificador = p[0];
    const categoria = p[1];
    const nombre = p[2];
    const precio = p[3];
    const imagen = p[4];


    const productoDiv = document.createElement('div');
    productoDiv.classList.add('producto', 'col-lg-3', 'col-md-5', 'col-sm-12', 'py-3');

    productoDiv.innerHTML = `
        <img src="../${imagen}" alt="${nombre}_imagen">
        <h3 class="tPrin">${nombre}</h3>
        <p class="tPrin my-2">${precio}</p>
        <button type="submit" class="btnAcc btn btn-dark">Ver Detalle</button>
    `;

    const botonDetalle = productoDiv.querySelector('button');
    botonDetalle.addEventListener('click', () => {
        window.location.href = `detalleProducto.html?id=${identificador}`;
    });

    catalogo.appendChild(productoDiv);
});

