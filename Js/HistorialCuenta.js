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
    let historialBD = JSON.parse(localStorage.getItem("Historial"))
    let listaHistoriales = seleccionarHistorialPorId(historialBD, numeroCuenta)
    console.log(listaHistoriales)
    
    let html=""
    for(let i =0; i<listaHistoriales.length;i++){
        html += "<tr>"
        html += "<td>" + listaHistoriales[i].tipoMovimiento +"</td>"
        html += "<td>" + listaHistoriales[i].valorMovimiento +"</td>"
        html += "<td>" + listaHistoriales[i].fecha +"</td>"
        html += "</tr>"
    }
    document.querySelector("#tabla tbody").innerHTML = html
}

window.onload = function(numeroCuenta) {
    traerDatosHistorial(numeroCuenta)
};