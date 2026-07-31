const paquetes = [
  {
    id: 1,
    destino: "Cartagena",
    precio: 590000,
    duracion: "3 días / 2 noches",
    categoria: "Playa",
    descripcion: "Ideal para disfrutar del mar Caribe, el centro histórico y una experiencia relajante.",
    imagen: "./img/destinations/cartagena.jpg"
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
    descripcion: "Playas de arena blanca, hoteles todo incluido y una vibrante vida nocturna.",
    imagen: "./img/destinations/cancun.jpg"
  },
  {
    id: 7,
    destino: "París",
    precio: 5200000,
    duracion: "7 días / 6 noches",
    categoria: "Internacional",
    descripcion: "Descubre la ciudad del amor, su arquitectura icónica y su exquisita gastronomía.",
    imagen: "./img/destinations/paris.jpg"
  }
]// Contenedor donde se mostrarán los paquetes


const productsContainer = document.getElementById("products-container");

//  Función para mostrar los paquetes


function renderizarPaquetes() {

  paquetes.forEach((paquete) => {

    // se crea columna Bootstrap
    const card = document.createElement("div");

    card.className = "col-md-6 col-lg-4";

    //  el Contenido de la tarjeta
    card.innerHTML = `
      <div class="card h-100 shadow-sm">

        <img
          src="${paquete.imagen}"
          class="card-img-top"
          alt="${paquete.destino}"
        >

        <div class="card-body d-flex flex-column">

          <span class="badge bg-primary mb-2">
            ${paquete.categoria}
          </span>

          <h5 class="card-title">
            ${paquete.destino}
          </h5>

          <p class="card-text">
            ${paquete.descripcion}
          </p>

          <p class="fw-bold text-success">
            💰 $${paquete.precio.toLocaleString("es-CO")}
          </p>

          <p class="text-muted">
            🕒 ${paquete.duracion}
          </p>

          <button
            class="btn btn-primary mt-auto"
            data-id="${paquete.id}">
              Reservar
          </button>

        </div>

      </div>
    `;

    // Agregar la tarjeta al contenedor

    productsContainer.appendChild(card);

  });

}

 
// Ejecutar función

renderizarPaquetes();
