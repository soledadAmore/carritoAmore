const resultado = document.getElementById("container");

const formulario = document.getElementById("buscador");
const filtrar = () =>{
    resultado.innerHTML = '';
    const texto = formulario.value.toLowerCase();
    let keycaps = fetch("js/keycaps.json")
                        .then(respuesta => respuesta.json())
                        .then(keycaps => {for (let producto of keycaps){
                            let nombre = producto.nombre.toLowerCase();
                            if (nombre.indexOf(texto) !== -1){
                                container.innerHTML += ` <div class="card">
                                            <img src=${producto.imagen} class="card-img">
                                            <h3 class="h3-card">${producto.nombre}</h3>
                                            <p class="p-card">${producto.layout}</p>
                                            <h4 class="h4-card">${producto.precio}</h4>
                                            <button class="btn-add" id="boton${producto.id}">Añadir</button>
                                        </div> `
                            }
                        }
    if (resultado.innerHTML === '' ){
        resultado.innerHTML = `<p class="p-card">No lo encontramos, pero podes ver:</p>`
    }
    // resultado.innerHTML = resultado.innerHTML === '' ? `<p class="p-card">No lo encontramos, pero podes ver:</p>` : resultado.innerHTML    
})
}
buscador.addEventListener('keyup', filtrar)
