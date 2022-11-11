//-----------------------------------------------------VARIABLES-----------------------------------------------------
let carrito = localStorage.getItem('carrito') ? JSON.parse(localStorage.getItem('carrito')) : [];

let cantidad = document.getElementById("cantidad-carrito");
let itemsCarrito = localStorage.getItem('cantidadCarrito');
document.getElementById("cantidad-carrito").innerHTML = itemsCarrito;

//container es la lista de productos
const container = document.getElementById("container");
//contanier 2 refiere al elemento aleatorio
const container2 = document.getElementById("container-2");
//submenu es el carrito
const submenu = document.getElementById('submenu');
//en listaCarrito se colocan los elementos
const listaCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarrito = document.getElementById('vaciar-carro');

const abrirSubmenu = document.querySelector('#btn-cart');
const cerrarSubmenu = document.querySelector('#cerrar-modal');
carritoHTML();

let total = document.getElementById('total');
calcularTotal();

//-----------------------------------------------------FUNCIONES-----------------------------------------------------

function calcularTotal() {
    let totalCompra = 0;
    carrito.forEach(keycaps => totalCompra += keycaps.precio * keycaps.cantidad);
    total.innerHTML = `Total: $${totalCompra}`;
}
function agregarKeycaps(e) {
    e.preventDefault();
    if (e.target.classList.contains('btn-add')) {
        const keycapsSeleccionadas = e.target.parentElement;
        leerDatosKeycaps(keycapsSeleccionadas);
        itemsCarrito++;
        document.getElementById("cantidad-carrito").innerHTML = `${itemsCarrito}`;
        localStorage.setItem('cantidadCarrito', itemsCarrito);
        Toastify({
            text: "Agregado al carrito",
            duration: 3000,
            gravity: "bottom",
            position: "right",
            style: {
                background: "#B27092",
                color: "whitesmoke"
            }
        }).showToast();
    }
    calcularTotal();
}

function leerDatosKeycaps(keycaps) {
    const infoKeycaps = {
        imagen: keycaps.querySelector('img').src,
        nombre: keycaps.querySelector('h3').textContent,
        precio: keycaps.querySelector('h4').textContent,
        layout: keycaps.querySelector('p').textContent,
        id: keycaps.querySelector('button').getAttribute('id'),
        cantidad: 1
    }
    const estaEnCarrito = carrito.some((keycaps) => keycaps.id === infoKeycaps.id);
    if (estaEnCarrito) {
        const keycaps = carrito.map(keycap => {
            if (keycap.id === infoKeycaps.id) {
                keycap.cantidad++;
                return keycap;
            } else {
                return keycap;
            }
        })
    } else {
        carrito.push(infoKeycaps);
    }
    carritoHTML();
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

function carritoHTML() {
    limpiarHTML();
    carrito.forEach(keycaps => {
        const { imagen, nombre, precio, cantidad, id } = keycaps;
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>
        <img src='${imagen}' width='100'>
        </td>
        <td>${nombre}</td>
        <td>${precio}</td>
        <td>${cantidad}</td>
        <td>
        <i class="bi bi-trash borrar-keycaps" id=${id}></i>
        </td>
        `;
        listaCarrito.appendChild(row);
    });
};

function limpiarHTML() {
    while (listaCarrito.firstChild) {
        listaCarrito.removeChild(listaCarrito.firstChild);
    }
}

//eliminar elemento de carrito
function eliminarKeycaps(e) {
    if (e.target.classList.contains('borrar-keycaps')) {
        const keycapsId = e.target.getAttribute('id');
        itemsCarrito -= carrito.find(keycap => keycap.id === keycapsId).cantidad;
        carrito = carrito.filter(keycaps => keycaps.id !== keycapsId);
        carritoHTML();
        document.getElementById("cantidad-carrito").innerHTML = `${itemsCarrito}`;
        localStorage.setItem('cantidadCarrito', itemsCarrito);
    }
    calcularTotal();
    localStorage.setItem('carrito', JSON.stringify(carrito));
}
fetch("js/keycaps.json")
    .then(respuesta => respuesta.json())
    .then(keycaps => {
        keycaps.forEach(keycap => {
            container.innerHTML += ` <div class="card">
                            <img src=${keycap.imagen} class="card-img">
                            <h3 class="h3-card">${keycap.nombre}</h3>
                            <p class="p-card">${keycap.layout}</p>
                            <h4 class="h4-card">${keycap.precio}</h4>
                            <button class="btn-add" id="boton${keycap.id}">Añadir</button>
                        </div> `
        })
    })
    .catch(error => console.log(error))

let aleatorio = null;
const getRandomKeycaps = () => {
    aleatorio = fetch("js/keycaps.json")
                    .then(respuesta => respuesta.json())
                    .then(keycaps => keycaps[Math.floor(Math.random() * Object.keys(keycaps).length)])
                    .then(random => container2.innerHTML = ` <div class="card">
                                                            <img src=${random.imagen} class="card-img">
                                                            <h3 class="h3-card">${random.nombre}</h3>
                                                            <p class="p-card">${random.layout}</p>
                                                            <h4 class="h4-card">${random.precio}</h4>
                                                            <button class="btn-add" id="boton${random.id}">Añadir</button>
                                                            </div> `)
                    .catch(error => console.log(error))
}
getRandomKeycaps()

setInterval(() => {
    getRandomKeycaps()
}, 3000);

//-----------------------------------------------------EVENTOS-----------------------------------------------------

container.addEventListener('click', agregarKeycaps);
container2.addEventListener('click', agregarKeycaps);

abrirSubmenu.addEventListener('click', () => {
    submenu.showModal();
});
cerrarSubmenu.addEventListener('click', () => {
    submenu.close();
});

submenu.addEventListener('click', eliminarKeycaps);

vaciarCarrito.addEventListener('click', () => {
    carrito = [];
    document.getElementById("cantidad-carrito").innerHTML = 0;
    itemsCarrito = 0;
    limpiarHTML();
    calcularTotal();
    localStorage.clear();
})
