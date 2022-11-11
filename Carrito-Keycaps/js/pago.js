let totalPago = document.getElementById('total-pago');
let carroAPagar = JSON.parse(localStorage.getItem('carrito'));
function pagar(){
    const metodoDePago = document.querySelector('input[name="metodo"]:checked').value;
    totalCompra = calcularTotalPago()
    switch (metodoDePago?.toLowerCase()){
        case "transferencia":
        case "efectivo":
            totalCompra *= 0.9.toFixed(2);
            totalPago.innerHTML = `El total de tu compra es de: $${totalCompra}`;
            break;
        case 'debito':
        case 'credito':
            totalPago.innerHTML = `El total de tu compra es de: $${totalCompra}`;
            break;
        default:
            alert('No se pudo procesar la operacion');
    }
}
pagar();

function calcularTotalPago(){
    let totalCompra = 0;
    carroAPagar.forEach(keycaps => totalCompra += keycaps.precio * keycaps.cantidad);
    return totalCompra;
}

const listaCarritoPago = document.querySelector('#lista-carrito-pago tbody');
calcularTotalPago();
carritoPagoHTML()
function carritoPagoHTML(){
    carroAPagar.forEach(keycaps => {
        const {imagen, nombre, precio, cantidad, id} = keycaps;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src='${imagen}' width='100'>
            </td>
            <td>${nombre}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>
            </td>
        `;
        listaCarritoPago.appendChild(row);
    });
};

const botonPagar = document.getElementById('pagar');
botonPagar.addEventListener('click', () => {
    botonPagar.disabled = true;
    if(carroAPagar.length === 0){
        Toastify({
            text: "Error, carrito vacio",
            duration: 3000,
            gravity: "top",
            position: "right",
            style:{
                background: "red",
                color: "whitesmoke"
            }
        }).showToast();
    } else {
        Toastify({
            text: "Felicidades, compra realizada!",
            duration: 3000,
            gravity: "top",
            position: "right",
            style:{
                background: "green",
                color: "whitesmoke"
            }
        }).showToast();
    }
})