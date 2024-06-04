let urlParams = new URLSearchParams(window.location.search);
let saldo = urlParams.get('saldo');
let numeroCuenta = urlParams.get('numeroCuenta');
let estado = urlParams.get('estado');

function botonAtras(){
    let datosParaCuenta = {
        cuenta: numeroCuenta,
        saldo: saldo,
        estado:estado
    }
    window.location.href = `/Html/Cuenta.html?saldo=${datosParaCuenta.saldo}&numeroCuenta=${datosParaCuenta.cuenta}&estado=${datosParaCuenta.estado}`
}


function traerDatosHistorial(numeroCuenta){ 
let historialBD = JSON.parse(localStorage.getItem('Historial'))
let historialFiltrado = historialBD.filter(movimiento => movimiento.idCuenta == numeroCuenta)

let tablaMovimientos = document.getElementById('tablaMovimientos')
let contenidoTabla = '<thead><tr><th>Tipo movimiento</th><th>Valor</th><th>Fecha</th></tr></thead><tbody>'
historialFiltrado.forEach(movimiento => {
    contenidoTabla += `<tr><td>${movimiento.tipoMovimiento}</td><td>${movimiento.valorMovimiento}</td><td>${movimiento.fecha}</td></tr>`
});
contenidoTabla += '</tbody>'
tablaMovimientos.innerHTML = contenidoTabla
}

window.onload = function() {
    traerDatosHistorial(numeroCuenta)
}