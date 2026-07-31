//construcion del objeto paquetes
const paquetes = [
    {
        id: 1,
        destino: "Cartagena",
        precio: 590000,
        duracion: "3 días / 2 noches",
        categoria: "Playa",
        descripcion: "Ideal para disfrutar del mar Caribe, el centro histórico y una experiencia relajante.",
        imagen: "https://cdn.pixabay.com/photo/2016/11/18/18/39/beach-1836335_1280.jpg"
    },
    {
        id: 2,
        destino: "San Andrés",
        precio: 980000,
        duracion: "4 días / 3 noches",
        categoria: "Playa",
        descripcion: "Disfruta del mar de los siete colores y playas paradisíacas.",
        imagen: "./img/destinations/san-andres.jpg"
    },
    {
        id: 3,
        destino: "Nevado del Ruiz",
        precio: 720000,
        duracion: "3 días / 2 noches",
        categoria: "Montaña",
        descripcion: "Una aventura entre paisajes volcánicos, senderismo y naturaleza.",
        imagen: "./img/destinations/nevado-del-ruiz.jpg"
    },
    {
        id: 4,
        destino: "Medellín",
        precio: 480000,
        duracion: "3 días / 2 noches",
        categoria: "Nacional",
        descripcion: "Conoce la ciudad de la eterna primavera y su transformación cultural.",
        imagen: "./img/destinations/medellin.jpg"
    },
    {
        id: 5,
        destino: "Eje Cafetero",
        precio: 650000,
        duracion: "4 días / 3 noches",
        categoria: "Nacional",
        descripcion: "Recorre fincas cafeteras, pueblos coloridos y paisajes únicos.",
        imagen: "./img/destinations/eje-cafetero.jpg"
    },
    {
        id: 6,
        destino: "Cancún",
        precio: 2450000,
        duracion: "5 días / 4 noches",
        categoria: "Internacional",
        descripcion: "Playas de arena blanca, hoteles todo incluido y vida nocturna.",
        imagen: "./img/destinations/cancun.jpg"
    },
    {
        id: 7,
        destino: "París",
        precio: 5200000,
        duracion: "7 días / 6 noches",
        categoria: "Internacional",
        descripcion: "Descubre la ciudad del amor, su arquitectura y su gastronomía.",
        imagen: "./img/destinations/paris.jpg"
    }
];

let carrito = CartStorage.obtener();

// referencia de variable local con elemento del DOM HTML
const contenedorItems = document.getElementById("contenedor-items-carrito");
const badgeContador = document.getElementById("badge-contador-carrito");
const textoCantidad = document.getElementById("texto-cantidad-items");
const resumenSubtotal = document.getElementById("resumen-subtotal");
const resumenCargos = document.getElementById("resumen-cargos");
const resumenTotal = document.getElementById("resumen-total");
const botonPagar = document.getElementById("boton-pagar-reserva");


//boton agregar
document.addEventListener("click", (e)=>{

    const boton = e.target.closest(".btn-agregar-carrito");
    if(boton){
        const idPaquete = Number(boton.dataset.id);
        agregarAlCarrito(idPaquete);
    }
});

function agregarAlCarrito(id){
    const paqueteEncontrado = paquetes.find(p => p.id === id)

    if(!paqueteEncontrado)return;

    const itemEnCarrito = carrito.find(item => item.id === id);
    if (itemEnCarrito){
        itemEnCarrito.cantidad++;
    }else{
        carrito.push({
            ...paqueteEncontrado,
            nombre: paqueteEncontrado.destino,
            resumen: paqueteEncontrado.descripcion,
            fecha: paqueteEncontrado.duracion,
            imagen: paqueteEncontrado.imagen,
            cantidad: 1
        });
    }
    actualizarCarritoUI();
};

const formatearCOP = (valor) => {
    return new Intl.NumberFormat("es-CO", {
        style: "currency",
        currency: "COP",
        maximumFractionDigits: 0
    }).format(valor);
};
function actualizarCarritoUI() {
    renderizarItems();
    calcularTotales();
    CartStorage.guardar(carrito)
}


function renderizarItems() {
    // Acá valido que si no hay nada en el carrito me muestre un mensaje 
    if (carrito.length === 0) {
        contenedorItems.innerHTML = `
            <div class="text-center py-5">
                <i class="bi bi-cart-x fs-1 text-muted"></i>
                <p class="text-muted mt-2">No tienes reservas activas.</p>
            </div>
        `;
        return;
    }

// Mapeo del arreglo a plantillas de HTML
    contenedorItems.innerHTML = carrito.map(item => `
        <div class="card mb-3 border-0 shadow-sm item-carrito">
            <div class="row g-0 align-items-center">
                <div class="col-4">
                    <img src="${item.imagen}" class="img-fluid rounded-start h-100 object-fit-cover" alt="${item.nombre}">
                </div>
                <div class="col-8">
                    <div class="card-body p-2 position-relative">
                        <button type="button" class="btn-close position-absolute top-0 end-0 m-2 btn-eliminar-item" 
                            aria-label="Eliminar" data-id="${item.id}"></button>

                        <h6 class="card-title fw-bold mb-1 pe-4">${item.nombre}</h6>
                        <p class="card-text small text-muted mb-1">
                            ${item.resumen}
                        </p>
                        <p class="card-text small text-muted mb-1">
                            <i class="bi bi-calendar-event me-1"></i>${item.fecha}
                        </p>
                        
                        <div class="d-flex justify-content-between align-items-center mt-2">
                            <div class="input-group input-group-sm w-auto">
                                <button class="btn btn-outline-secondary btn-restar-cupo" type="button" data-id="${item.id}">-</button>
                                <span class="input-group-text bg-white px-2 fw-semibold">${item.cantidad}</span>
                                <button class="btn btn-outline-secondary btn-sumar-cupo" type="button" data-id="${item.id}">+</button>
                            </div>
                            <span class="fw-bold text-primary">${formatearCOP(item.precio * item.cantidad)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `).join("");
};

function calcularTotales() {
    const totalCupos = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    const subtotal = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
    const cargos = subtotal * 0.10; // 10% servicio
    const total = subtotal + cargos;

    // Actualización de nodos en el DOM
    badgeContador.textContent = totalCupos;
    textoCantidad.textContent = totalCupos;
    resumenSubtotal.textContent = formatearCOP(subtotal);
    resumenCargos.textContent = formatearCOP(cargos);
    resumenTotal.textContent = formatearCOP(total);

    // Deshabilitar botón de pago si no hay productos
    botonPagar.disabled = carrito.length === 0;
}
// Delegación de eventos: Escucha clicks en el padre para no adjuntar eventos a botones dinámicos
contenedorItems.addEventListener("click", (e) => {
    const id = Number(e.target.dataset.id);
    if (!id) return;

    if (e.target.classList.contains("btn-sumar-cupo")) {
        modificarCantidad(id, 1);
    } else if (e.target.classList.contains("btn-restar-cupo")) {
        modificarCantidad(id, -1);
    } else if (e.target.classList.contains("btn-eliminar-item")) {
        eliminarItem(id);
    }
});

function modificarCantidad(id, cambio) {
    const item = carrito.find(prod => prod.id === id);
    if (!item) return;

    item.cantidad += cambio;

    // Si la cantidad llega a 0, se remueve el producto del arreglo
    if (item.cantidad <= 0) {
        eliminarItem(id);
    } else {
        actualizarCarritoUI();
    }
}

function eliminarItem(id) {
    carrito = carrito.filter(prod => prod.id !== id);
    actualizarCarritoUI();
}

// Evento de Checkout
botonPagar.addEventListener("click", () => {
    if (carrito.length === 0) return;
    alert("Procesando pago por un total de: " + resumenTotal.textContent);

    carrito = [];
    CartStorage.limpiar();
    actualizarCarritoUI();
});

// Renderizado inicial cuando el DOM esté cargado
document.addEventListener("DOMContentLoaded", actualizarCarritoUI);