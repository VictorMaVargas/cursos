//Variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners(){
    //Cuando agregas un curso presionando "Agregar al carrito"
    listaCursos.addEventListener('click', agregarCurso);
    //Elimina cursos del carrito
    carrito.addEventListener('click', eliminarCurso);
    //Vaciar el carrito
    vaciarCarritoBtn.addEventListener('click',() => {
        articulosCarrito = [];//reseteamos el array

        limpiarHTML();//Eliminamos todo el HTML
    });
};

//Funciones
function agregarCurso(e){
    e.preventDefault();

    if(e.target.classList.contains('agregar-carrito')){
        //console.log(e.target.parentElement.parentElement);
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
};
//Elimina un curso del carrito
function eliminarCurso(e){
    //console.log(e.target.classList);
    if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id');
        //Elimina del array articulosCarrito por el data-id
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);
        console.log(articulosCarrito);

    }
carritoHTML();//Iterar sobre el carrito y mostrar su HTML
};
//Lee el contenido del HTML al que le dimos click y extrae la información del curso
function leerDatosCurso (curso){
    //console.log(curso);
    //Crear un objeto con el contenido del curso actual
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1,
    }
    //console.log(infoCurso);

//Revisa si un elemento ya existe en el carrito
const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
    if(existe){
        //actualizamos la cantidad
        const cursos = articulosCarrito.map(curso =>{
            if(curso.id === infoCurso.id){
                curso.cantidad++;
                return curso;//retorna el objeto actualizado
            }else{
                return curso;//retorna los objetos que no son los duplicados
            }
        });
        articulosCarrito = [...cursos];
    }else{
        //agregamos el curso al carrito
        articulosCarrito = [...articulosCarrito, infoCurso];
    };

//Agrega elementos al array de carrito
//articulosCarrito = [...articulosCarrito, infoCurso];
carritoHTML();
console.log(articulosCarrito);
};

//Muestra el carrito de compras en el HTML
function carritoHTML(){
    //Limpiar el HTML al ir sumando cursos
    limpiarHTML();

    //Recorre el carrito y genera el HTML
    articulosCarrito.forEach((curso) =>{
        const {imagen, titulo, precio, cantidad, id} = curso;//Destructuring
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>
            <img src='${imagen}' width=100>
        </td>
        <td>${titulo}</td>
        <td>${precio}</td>
        <td>${cantidad}</td>
        <td>
            <a href='#' class='borrar-curso' data-id=${id}>X</a>
        </td>
        `;
        //Agrega el HTML del carrito en el tbody
        contenedorCarrito.appendChild(row);
    });
};
//Elimina los cursos del tbody
function limpiarHTML() {
    contenedorCarrito.innerHTML = '';
};
