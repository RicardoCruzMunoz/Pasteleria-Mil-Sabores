const productos = [
    ["TC001", "Tortas Cuadradas", "Torta Cuadrada de Chocolate", "$45.000", "imagenes/pasteles/cuadrada_chocolate.jpg"],
    ["TC002", "Tortas Cuadradas", "Torta Cuadrada de Frutas", "$50.000", "imagenes/pasteles/cuadrada_frutas.jpg"],
    ["TT001", "Tortas Circulares", "Torta Circular de Vainilla", "$40.000", "imagenes/pasteles/circular_vainilla.png"],
    ["TT002", "Tortas Circulares", "Torta Circular de Manjar", "$42.000", "imagenes/pasteles/circular_manjar.jpg"],
    ["PI001", "Postres Individuales", "Mousse de Chocolate", "$5.000", "imagenes/pasteles/mousse_chocolate.jpg"],
    ["PI002", "Postres Individuales", "Torta sin Azúcar de Naranja", "$5.500", "imagenes/pasteles/naranja_sin_azucar.jpg"],
];


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

    catalogo.appendChild(productoDiv);
});