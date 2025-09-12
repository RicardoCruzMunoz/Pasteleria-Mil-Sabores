// Función para obtener el ID del producto desde la URL
function getIdFromUrl() {
    const parametros = new URLSearchParams(window.location.search);
    return parametros.get('id');
}

// Función para formatear el precio
function formatearPrecio(precio) {
    // Asume que el precio viene como string "$XX.XXX" o similar
    return precio;
}

// Función para mostrar el detalle del producto
function mostrarDetalleProducto() {
    const id = getIdFromUrl();
    const detalleDiv = document.getElementById('detalleProducto');

    if (!detalleDiv) {
        console.error('No se encontró el elemento detalleProducto');
        return;
    }

    if (!id) {
        detalleDiv.innerHTML = `
            <div class="col-12 text-center">
                <div class="alert alert-warning">
                    <h4>No se especificó ningún producto</h4>
                    <p>Por favor, selecciona un producto desde el catálogo.</p>
                    <a href="catalogo.html" class="btn btn-primary">Ir al Catálogo</a>
                </div>
            </div>
        `;
        return;
    }

    // Buscar el producto en el array de productos
    const producto = productos.find(p => p[0] === id);
    
    if (!producto) {
        detalleDiv.innerHTML = `
            <div class="col-12 text-center">
                <div class="alert alert-danger">
                    <h4>Producto no encontrado</h4>
                    <p>El producto que buscas no existe o ha sido eliminado.</p>
                    <a href="catalogo.html" class="btn btn-primary">Ir al Catálogo</a>
                </div>
            </div>
        `;
        return;
    }

    // Mostrar el detalle del producto
    detalleDiv.innerHTML = `
        <div class="row justify-content-center py-3">
            <div class="col-md-6 col-lg-5">
                <div class="text-center">
                    <img id="imagenGrande" 
                         src="../${producto[4]}" 
                         alt="${producto[2]}" 
                         class="img-fluid rounded shadow"
                         style="max-width: 400px; max-height: 400px;">
                </div>
            </div>
            <div class="col-md-6 col-lg-5">
                <div class="producto-info">
                    <h2 class="tPrin mb-3">${producto[2]}</h2>
                    
                    <div class="mb-3">
                        <h5 class="tPrin">
                            <strong>Categoría:</strong> 
                            <span class="badge bg-secondary">${producto[1]}</span>
                        </h5>
                    </div>
                    
                    <div class="mb-3">
                        <h4 class="tPrin text-success">
                            <strong>Precio:</strong> ${formatearPrecio(producto[3])}
                        </h4>
                    </div>
                    
                    <div class="mb-4">
                        <h5 class="tPrin"><strong>Descripción:</strong></h5>
                        <p class="tSec">${producto[5]}</p>
                    </div>
                    
                    <div class="acciones-producto">
                        <button id="btnAgregarCarrito" 
                                class="btn btn-success btn-lg me-2"
                                data-producto-id="${producto[0]}">
                            <i class="bi bi-cart-plus"></i> Agregar al carrito
                        </button>
                        
                        <a href="catalogo.html" class="btn btn-outline-secondary">
                            <i class="bi bi-arrow-left"></i> Seguir comprando
                        </a>
                    </div>
                    
                    <!-- Mensaje de confirmación (oculto inicialmente) -->
                    <div id="mensajeExito" class="alert alert-success mt-3" style="display: none;">
                        <i class="bi bi-check-circle"></i> ¡Producto agregado al carrito exitosamente!
                    </div>
                </div>
            </div>
        </div>
    `;

    // Agregar evento al botón de agregar al carrito
    configurarBotonCarrito(producto);
}

// Función para configurar el botón del carrito
function configurarBotonCarrito(producto) {
    const btnAgregar = document.getElementById('btnAgregarCarrito');
    const mensajeExito = document.getElementById('mensajeExito');
    
    if (btnAgregar) {
        btnAgregar.addEventListener('click', function() {
            try {
                // Verificar si existe el objeto carrito global
                if (typeof window.carrito !== 'undefined' && window.carrito.agregarProducto) {
                    window.carrito.agregarProducto(producto[0]);
                } else {
                    console.warn('Sistema de carrito no disponible');
                    // Alternativa: agregar al localStorage directamente
                    agregarAlCarritoLocal(producto);
                }
                
                // Mostrar mensaje de éxito
                if (mensajeExito) {
                    mensajeExito.style.display = 'block';
                    
                    // Ocultar el mensaje después de 3 segundos
                    setTimeout(() => {
                        mensajeExito.style.display = 'none';
                    }, 3000);
                }
                
                // Deshabilitar temporalmente el botón
                btnAgregar.disabled = true;
                btnAgregar.innerHTML = '<i class="bi bi-check"></i> Agregado';
                
                setTimeout(() => {
                    btnAgregar.disabled = false;
                    btnAgregar.innerHTML = '<i class="bi bi-cart-plus"></i> Agregar al carrito';
                }, 2000);
                
            } catch (error) {
                console.error('Error al agregar producto al carrito:', error);
                alert('Error al agregar el producto al carrito. Inténtalo de nuevo.');
            }
        });
    }
}

// Función alternativa para agregar al carrito usando localStorage
function agregarAlCarritoLocal(producto) {
    try {
        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        
        // Buscar si el producto ya existe en el carrito
        const productoExistente = carrito.find(item => item.id === producto[0]);
        
        if (productoExistente) {
            productoExistente.cantidad += 1;
        } else {
            carrito.push({
                id: producto[0],
                nombre: producto[2],
                precio: producto[3],
                imagen: producto[4],
                cantidad: 1
            });
        }
        
        localStorage.setItem('carrito', JSON.stringify(carrito));
        console.log('Producto agregado al carrito local');
        
    } catch (error) {
        console.error('Error al guardar en localStorage:', error);
    }
}

// Función para manejar errores de carga de imágenes
function configurarImagenes() {
    const imagen = document.getElementById('imagenGrande');
    if (imagen) {
        imagen.onerror = function() {
            this.src = '../imagenes/placeholder-producto.jpg'; // Imagen por defecto
            this.alt = 'Imagen no disponible';
        };
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    // Verificar que el array de productos esté disponible
    if (typeof productos === 'undefined') {
        console.error('Array de productos no encontrado');
        const detalleDiv = document.getElementById('detalleProducto');
        if (detalleDiv) {
            detalleDiv.innerHTML = `
                <div class="col-12 text-center">
                    <div class="alert alert-danger">
                        <h4>Error de carga</h4>
                        <p>No se pudieron cargar los datos de productos.</p>
                        <a href="catalogo.html" class="btn btn-primary">Ir al Catálogo</a>
                    </div>
                </div>
            `;
        }
        return;
    }
    
    // Mostrar el detalle del producto
    mostrarDetalleProducto();
    
    // Configurar manejo de imágenes después de un breve delay
    setTimeout(configurarImagenes, 100);
});

// Función de utilidad para debug
function debugProducto() {
    const id = getIdFromUrl();
    console.log('ID del producto:', id);
    console.log('Productos disponibles:', productos);
    console.log('Producto encontrado:', productos.find(p => p[0] === id));
}