window.carrito = {
    productos: JSON.parse(localStorage.getItem('carritoProductos')) || [],
    agregarProducto: function(id) {
        this.productos.push(id);
        localStorage.setItem('carritoProductos', JSON.stringify(this.productos));
    },
    quitarProducto: function(idx) {
        this.productos.splice(idx, 1);
        localStorage.setItem('carritoProductos', JSON.stringify(this.productos));
        this.mostrarCarrito();
    },
    mostrarCarrito: function() {
        const carritoDiv = document.getElementById('carritoProductos');
        const carritoVacio = document.getElementById('carritoVacio');
        const totalDiv = document.getElementById('carritoTotal');
        if (!carritoDiv) return;

        carritoDiv.innerHTML = '';
        let total = 0;

        if (this.productos.length === 0) {
            if (carritoVacio) carritoVacio.style.display = 'block';
            carritoDiv.style.display = 'none';
            if (totalDiv) totalDiv.textContent = '';
            return;
        }
        if (carritoVacio) carritoVacio.style.display = 'none';
        carritoDiv.style.display = 'block';

        this.productos.forEach((id, idx) => {
            const producto = productos.find(p => String(p[0]) === String(id));
            if (producto) {
                // Limpia el precio: elimina $ y puntos, convierte a número
                let precioStr = String(producto[3]).replace(/[^0-9]/g, '');
                let precioNum = parseInt(precioStr, 10);
                total += isNaN(precioNum) ? 0 : precioNum;

                carritoDiv.innerHTML += `
                <div class="row justify-content-center py-3">
                    <div class="col-md-5">
                        <img src="../${producto[4]}" alt="${producto[2]}" style="max-width:300px;">
                    </div>
                    <div class="col-md-5">
                        <h2 class="tPrin">${producto[2]}</h2>
                        <h5 class="tPrin"><strong>Categoría:</strong> ${producto[1]}</h5>
                        <h5 class="tPrin"><strong>Precio:</strong> ${producto[3]}</h5>
                        <h5 class="tPrin"><strong>Descripción:</strong> ${producto[5]}</h5>
                        <button class="btn btn-danger mt-3" onclick="window.carrito.quitarProducto(${idx})">Quitar del carrito</button>
                    </div>
                </div>
                <hr>
                `;
            }
        });

        if (totalDiv) {
            totalDiv.textContent = `Total: $${total.toLocaleString('es-CL', {minimumFractionDigits: 0})}`;
        }
    }
};

document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('carritoProductos')) {
        window.carrito.mostrarCarrito();
        const btnComprar = document.getElementById('btnComprar');
        if (btnComprar) {
            btnComprar.addEventListener('click', function() {
                if (window.carrito.productos.length === 0) {
                    alert('El carrito está vacío.');
                } else {
                    alert('¡Gracias por tu compra! Pronto te contactaremos.');
                    window.carrito.productos = [];
                    localStorage.setItem('carritoProductos', JSON.stringify([]));
                    window.carrito.mostrarCarrito();
                }
            });
        }
    }
});