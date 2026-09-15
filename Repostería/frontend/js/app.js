let carrito = [];
function agregarAlCarrito(nombre, precio) {
    const productoExistente = carrito.find(
        producto => producto.nombre === nombre
    );
    if (productoExistente) {
        productoExistente.cantidad++;
    }
    else {
        const producto = {
            nombre: nombre,
            precio: precio,
            cantidad: 1
        };
        carrito.push(producto);
    }
    mostrarCarrito();
}
function mostrarCarrito() {
    const listaCarrito =
        document.getElementById("listaCarrito");
    const totalElemento =
        document.getElementById("total");
    listaCarrito.innerHTML = "";
    if (carrito.length === 0) {
        listaCarrito.innerHTML =
            "<p>El carrito esta vacio.</p>";
        totalElemento.textContent = "0.00";
        return;
    }
    let total = 0;
    carrito.forEach((producto, indice) => {
        const subtotal =
            producto.precio * producto.cantidad;
        total += subtotal;
        const productoHTML = document.createElement("div");
        productoHTML.classList.add("producto-carrito");
        productoHTML.innerHTML = `
            <h3>${producto.nombre}</h3>
            <p>
                Precio:
                S/ ${producto.precio.toFixed(2)}
            </p>
            <div>
                <button onclick="disminuirCantidad(${indice})">
                    -
                </button>
                <span>
                    ${producto.cantidad}
                </span>
                <button onclick="aumentarCantidad(${indice})">
                    +
                </button>
            </div>
            <p>
                Subtotal:
                S/ ${subtotal.toFixed(2)}
            </p>
            <button onclick="eliminarProducto(${indice})">
                Eliminar
            </button>
        `;
        listaCarrito.appendChild(productoHTML);
    });
    totalElemento.textContent =
        total.toFixed(2);

}
function aumentarCantidad(indice) {
    carrito[indice].cantidad++;
    mostrarCarrito();
}
function disminuirCantidad(indice) {
    if (carrito[indice].cantidad > 1) {
        carrito[indice].cantidad--;
    }
    else {
        carrito.splice(indice, 1);
    }
    mostrarCarrito();
}
function eliminarProducto(indice) {
    carrito.splice(indice, 1);
    mostrarCarrito();
}
function vaciarCarrito() {
    carrito = [];
    mostrarCarrito();
}