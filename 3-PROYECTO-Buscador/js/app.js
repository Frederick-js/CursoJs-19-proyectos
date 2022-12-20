const marca = document.querySelector("#marca");
const year = document.querySelector("#year");
const minimo = document.querySelector("#minimo");
const maximo = document.querySelector("#maximo");
const puertas = document.querySelector("#puertas");
const transmision = document.querySelector("#transmision");
const color = document.querySelector("#color");

// Contenedor para los resultados

const resultado = document.querySelector("#resultado");

const max = new Date().getFullYear();
const min = max - 10;

console.log(max);
console.log(min);

// Generar un objeto con la busqueda
const datosBusqueda = {
  marca: "",
  year: "",
  minimo: "",
  maximo: "",
  puertas: "",
  transmision: "",
  color: "",
};

// Eventos
document.addEventListener("DOMContentLoaded", () => {
  mostrarAutos(autos); // Muestra los automoviles al cargar

  // Llena las opciones de anos
  llenarSelect();
});

// event listener para los select de busqueda
marca.addEventListener("change", (e) => {
  // change cuando cambia el select
  datosBusqueda.marca = e.target.value;

  filtrarAuto();
});

// event listener para los select de busqueda
year.addEventListener("change", (e) => {
  // change cuando cambia el select
  datosBusqueda.year = e.target.value;

  filtrarAuto();
});

// event listener para los select de busqueda
minimo.addEventListener("change", (e) => {
  // change cuando cambia el select
  datosBusqueda.minimo = e.target.value;

  filtrarAuto();
});

// event listener para los select de busqueda
maximo.addEventListener("change", (e) => {
  // change cuando cambia el select
  datosBusqueda.maximo = e.target.value;

  filtrarAuto();
});

// event listener para los select de busqueda
puertas.addEventListener("change", (e) => {
  // change cuando cambia el select
  datosBusqueda.puertas = e.target.value;
  filtrarAuto();
});

// event listener para los select de busqueda
transmision.addEventListener("change", (e) => {
  // change cuando cambia el select
  datosBusqueda.transmision = e.target.value;
  filtrarAuto();
});

// event listener para los select de busqueda
color.addEventListener("change", (e) => {
  // change cuando cambia el select
  datosBusqueda.color = e.target.value;
  console.log(datosBusqueda);
  filtrarAuto();
});

// funciones
function mostrarAutos(autos) {
  limpiarHtml();
  autos.forEach((auto) => {
    const { marca, modelo, year, puertas, transmision, precio, color } = auto;
    const autoHTML = document.createElement("p");
    autoHTML.textContent = `
        ${marca} ${modelo} - ${year} - ${puertas} Puertas - Transmision: ${transmision} - Precio: ${precio} - Color ${color}
        `;
    //insertar en el html
    resultado.appendChild(autoHTML);
  });
}

// limpiar html
function limpiarHtml() {
  while (resultado.firstChild) {
    resultado.removeChild(resultado.firstChild);
  }
}

// Genera los anos del select
function llenarSelect() {
  for (let i = max; i > min; i--) {
    const opcion = document.createElement("option");
    opcion.value = i;
    opcion.textContent = i;
    year.appendChild(opcion);
  }
}

// Funcion que filtra en base a la busqueda
function filtrarAuto() {
  const resultado = autos
    .filter(filtrarMarca)
    .filter(filtrarYear)
    .filter(filtrarMinimo)
    .filter(filtrarMaximo)
    .filter(filtrarPuertas)
    .filter(filtrarColor)
    .filter(filtrarTransmision);

  // si no sale nada en las busquedas que mande mensaje
  if (resultado.length) {
    // si hay algo en resultado entonces...

    // console.log(resultado);
    mostrarAutos(resultado);
  } else {
    noResultado();
  }
}

function noResultado() {
  limpiarHtml();
    const noResultado = document.createElement('div');
    noResultado.classList.add('alerta', 'error');
    noResultado.textContent = 'No hay Resultados';
    resultado.appendChild(noResultado);
}


function filtrarMarca(auto) {
  const { marca } = datosBusqueda;
  if (marca) {
    return auto.marca === marca;
  }
  return auto;
}

function filtrarYear(auto) {
  const { year } = datosBusqueda;
  if (year) {
    return auto.year === parseInt(year); // parseInt lo que hace es analizar una cadena de texto y retornar el valor numérico.
  }
  return auto;
}

function filtrarMinimo(auto) {
  const { minimo } = datosBusqueda;
  if (minimo) {
    return auto.precio >= minimo;
  }
  return auto;
}

function filtrarMaximo(auto) {
  const { maximo } = datosBusqueda;
  if (maximo) {
    return auto.precio <= maximo;
  }
  return auto;
}

function filtrarPuertas(auto) {
  const { puertas } = datosBusqueda;
  if (puertas) {
    return auto.puertas === parseInt(puertas);
  }
  return auto;
}

function filtrarColor(auto) {
  const { color } = datosBusqueda;
  if (color) {
    return auto.color === color;
  }
  return auto;
}

function filtrarTransmision(auto) {
  const { transmision } = datosBusqueda;
  if (transmision) {
    return auto.transmision === transmision;
  }
  return auto;
}
