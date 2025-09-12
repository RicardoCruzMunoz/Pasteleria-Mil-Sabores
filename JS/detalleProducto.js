function getIdFromUrl() {
    const parametro = new URLSearchParams(window.location.search);
    return parametro.get('id');
}

const id = getIdFromUrl();
const detalleDiv = document.getElementById('detalleProducto');

if (detalleDiv) {  
    if (id) {
        const producto = productos.find(p => p[0] === id);
        if (producto) {
            detalleDiv.innerHTML = `
            <div class="row justify-content-center py-3">
                <div class="col-md-5">
                    <img id="imagenGrande" src="../${producto[4]}" alt="${producto[2]}" style="max-width:300px;">
                </div>
                <div class="col-md-5">
                    <h2 class="tPrin">${producto[2]}</h2>
                    <h5 class="tPrin"><strong>Categoría:</strong> ${producto[1]}</h5>
                    <h5 class="tPrin"><strong>Precio:</strong> ${producto[3]}</h5>
                    <h5 class="tPrin"><strong>Descripcion:</strong>${producto[5]}</h5>
                    <button id="btnAgregarCarrito" class="btn btn-success mt-3">Agregar al carrito</button>
                </div>
            </div>
            `;
            // Solo agrega al carrito cuando el usuario hace clic
            const btnAgregar = document.getElementById('btnAgregarCarrito');
            if (btnAgregar) {
                btnAgregar.addEventListener('click', function() {
                    window.carrito.agregarProducto(producto[0]);
                    alert('Producto agregado al carrito');
                });
            }
        } else {
            detalleDiv.innerHTML = '<p>Producto no encontrado</p>';
        }
    } else {
        detalleDiv.innerHTML = '<p>No se especificó ningún producto</p>';
    }
}
