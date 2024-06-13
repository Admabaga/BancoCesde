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

function seleccionarHistorialPorId(historialBD, numeroCuenta){
    let listaHistorial = []
    let historial={
        tipoMovimiento:"",
        valorMovimiento:"",
        fecha:""
    }
    for(let i=0; i < historialBD.length; i++){
        if(historialBD[i].idCuenta == numeroCuenta){
            historial.fecha = historialBD[i].fecha
            historial.tipoMovimiento = historialBD[i].tipoMovimiento
            historial.valorMovimiento = historialBD[i].valorMovimiento
            listaHistorial.push(historial)
            }
    }
    return listaHistorial
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
};