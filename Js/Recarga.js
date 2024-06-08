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


function recargarDinero(){
    let valorRecarga = document.getElementById('valorARecargar').value
    let nuevoSaldo
    if((valorRecarga!= null && valorRecarga == '')){
    alert("Ingresa un valor para poder recargar.")
    }else{
        let historialMovimientoEntrante={
            tipoMovimiento:"",
            fecha:"",
            valorMovimiento:"",
            idCuenta:""
        }
        nuevoSaldo = Number(saldo) + Number(valorRecarga)
        let cuentasBD = JSON.parse(localStorage.getItem("Cuenta"))
        let historialBD = JSON.parse(localStorage.getItem("Historial"))
        actualizarSaldoEnBd(cuentasBD, nuevoSaldo)
        historialMovimientoEntrante.tipoMovimiento = "Recarga"
        historialMovimientoEntrante.valorMovimiento = "+ " +valorRecarga
        historialMovimientoEntrante.fecha = formatoHoraYFechaColombia()
        historialMovimientoEntrante.idCuenta = numeroCuenta
        historialBD.push(historialMovimientoEntrante)
        localStorage.setItem('Historial', JSON.stringify(historialBD))
        alert("Recarga exitosa.")  
        }
}

function actualizarSaldoEnBd(cuentasBD, nuevoSaldo){
    for(let i = 0; i< cuentasBD.length; i++){
        if(cuentasBD[i].numeroCuenta == numeroCuenta){
            cuentasBD[i].saldo = nuevoSaldo
            saldo = nuevoSaldo
            localStorage.setItem('Cuenta', JSON.stringify(cuentasBD))
            break
        }
    }
}  

function formatoHoraYFechaColombia(){
    let fechaHoraCompletaColombia
    let horaActualColombia = new Date().toLocaleString("es-CO", {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      })
    let fechaActualColombia = new Date().toLocaleDateString("es-CO", {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
    })
    fechaHoraCompletaColombia = `${horaActualColombia} ${fechaActualColombia}`;
    return fechaHoraCompletaColombia
}  