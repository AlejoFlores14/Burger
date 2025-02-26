// Array para almacenar los productos en el carrito
let carrito = [];

// Seleccionar elementos del DOM
const botonesAgregar = document.querySelectorAll(".agregar-carrito");
const listaCarrito = document.getElementById("lista-carrito");
const totalElement = document.getElementById("total");
const btnComprar = document.getElementById("comprar");

// Función para agregar productos al carrito
function agregarAlCarrito(event) {
    const button = event.target;
    const id = button.dataset.id;
    const nombre = button.dataset.nombre;
    const precio = parseFloat(button.dataset.precio);

    // Buscar si el producto ya está en el carrito
    const productoExistente = carrito.find(producto => producto.id === id);
    
    if (productoExistente) {
        productoExistente.cantidad += 1;
    } else {
        carrito.push({ id, nombre, precio, cantidad: 1 });
    }

    actualizarCarrito();
}

// Función para actualizar el carrito en el HTML
function actualizarCarrito() {
    listaCarrito.innerHTML = "";
    let total = 0;

    carrito.forEach(producto => {
        const li = document.createElement("li");
        li.textContent = `${producto.nombre} x${producto.cantidad} - $${producto.precio * producto.cantidad}`;
        listaCarrito.appendChild(li);
        total += producto.precio * producto.cantidad;
    });

    totalElement.textContent = total;
}

// Evento para agregar productos al carrito
botonesAgregar.forEach(boton => boton.addEventListener("click", agregarAlCarrito));

// Evento de compra (Enviar datos al backend)
btnComprar.addEventListener("click", () => {
    fetch("/comprar", {
        method: "POST",
        body: JSON.stringify({ carrito }),
        headers: { "Content-Type": "application/json" }
    })
    .then(response => response.json())
    .then(data => {
        alert(data.mensaje);
        carrito = [];
        actualizarCarrito();
    })
    .catch(error => console.error("Error en la compra:", error));
});
