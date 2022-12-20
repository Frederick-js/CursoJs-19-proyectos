const carrito = document.querySelector("#carrito");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");
const listaCursos = document.querySelector("#lista-cursos");
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners() {
    // Cuando agregas un curso presioanndo "Agregar al Carrito"
    listaCursos.addEventListener("click", agregarCurso);
   

    //Elimina cursos del carrito
    carrito.addEventListener('click', eliminarCurso);

    // Vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', ()=> {
        articulosCarrito = [];
        limpiarHTML();
    })
}

//Funciones
function agregarCurso(e) {
    e.preventDefault();

    if (e.target.classList.contains("agregar-carrito")) {
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
}

//Elimina el curso del carrito
function eliminarCurso(e) {
 if (e.target.classList.contains('borrar-curso')) {
    const cursoId = e.target.getAttribute('data-id');

    // Eliminar del arreglo de articulosCarrito por el data-id
    articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId);
    
        carritoHTML(); // iterar sobre el carrito y mostrar su html
 }

}



// Lee el contenido del html al que le dimos click y extrae la informacion del curso
function leerDatosCurso(curso) {
    // console.log(curso);

    // Crear un objeto con el contenido del curso actual
    const infoCurso = {
        imagen: curso.querySelector("img").src,
        titulo: curso.querySelector("h4").textContent,
        precio: curso.querySelector(".precio span").textContent,
        id: curso.querySelector("a").getAttribute("data-id"),
        cantidad: 1,
    };

    // Revisa si un elemento ya existe en el carrito
    const existe = articulosCarrito.some((curso) => curso.id === infoCurso.id); // .some te permite iterar sobre un arreglo de objetos y verificar si un elemento existe en el
    if (existe) {
        // Actualizamos la cantidad
        const cursos = articulosCarrito.map(curso => { // .map te va a crear un nuevo arreglo e iterar sobre todos los elementos del carrito
            if (curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso; // retorna el objeto actualizado
            }else {
                return curso; // retorna los objetos que no son duplicados\
            }
        }); 
        articulosCarrito = [...cursos]
    } else {
        // Agregar elementos al arreglo del carrito
        articulosCarrito = [...articulosCarrito, infoCurso];
    }
    carritoHTML();
}

//Muestra el carrito de compras en el html
function carritoHTML() {
    // Limpiar el html
    limpiarHTML();

    // Recorre el carrito y genera el html
    articulosCarrito.forEach((curso) => {
        const row = document.createElement("tr");
        row.innerHTML = `

        <td><img src="${curso.imagen}" width="100"></td>
        <td>${curso.titulo}</td>
        <td> ${curso.precio}</td>
        <td>${curso.cantidad}</td>
        <td><a href="#" class="borrar-curso" data-id=${curso.id}> x </a></td>
        `;

        // agregar el html del carrito en el tbody
        contenedorCarrito.appendChild(row);
    });
}

//Elimina los cursos del tbody
function limpiarHTML() {
    //forma lenta de eliminar
    contenedorCarrito.innerHTML = "";

    //forma rapida
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.firstChild(contenedorCarrito.firstChild);
    }
}
