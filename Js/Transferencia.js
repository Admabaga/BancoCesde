let urlParams = new URLSearchParams(window.location.search);
let saldo = urlParams.get('saldo');
let numeroCuenta = urlParams.get('numeroCuenta');
let estado = urlParams.get('estado');

document.getElementById('cuentaYSaldo').innerHTML = "Producto del que vas a transferir #: "+numeroCuenta+"<br>"+
"Tu saldo actual es: $"+saldo


class Transferencia{
    constructor(saldoActual, cuentaReceptora, cuentaEmisora, valorTransferencia, nuevoSaldo){
        this.saldoActual = saldoActual
        this.cuentaReceptora = cuentaReceptora
        this.cuentaEmisora = cuentaEmisora
        this.valorTransferencia = valorTransferencia
        this.nuevoSaldo = nuevoSaldo
    }
}

function realizarTransferencia(){
    let transferencia = new Transferencia()
    let cuentasBD = JSON.parse(localStorage.getItem("Cuenta"))
    captarDatosTransferencia(transferencia, saldo, numeroCuenta)
    if(!(validarNumeroCuentaExiste(cuentasBD, transferencia))){
        alert("El numero de cuenta al que deseas consignar no existe.")
        }else if(Number(transferencia.saldoActual) < Number(transferencia.valorTransferencia)){
                alert("No tienes saldo suficiente para realizar la transferencia.")
                }else{
                    actualizarSaldosEnBd(cuentasBD, transferencia)
                    guardarHistorial(transferencia)
                    document.getElementById('cuentaYSaldo').innerHTML = "Producto del que vas a transferir #: "+transferencia.cuentaEmisora+"<br>"+
                    "Tu saldo actual es: $"+transferencia.nuevoSaldo
                    document.getElementById('comprobanteTransferencia').innerHTML = "<h2>Comprobante de transaccion: </h2>"+"<br>"+
                    "Salio de: "+"<br>"+transferencia.cuentaEmisora+"<br>"+
                    "Destino:"+"<br>"+transferencia.cuentaReceptora+"<br>"+
                    "Valor enviado:"+"<br>"+transferencia.valorTransferencia+"<br>"
                    alert("Transferencia exitosa!")
                }
}
 function botonAtras(){
    let datosParaCuenta = {
        cuenta: numeroCuenta,
        saldo: saldo,
        estado:estado
    }
    window.location.href = `/Html/Cuenta.html?saldo=${datosParaCuenta.saldo}&numeroCuenta=${datosParaCuenta.cuenta}&estado=${datosParaCuenta.estado}`
}

function captarDatosTransferencia(transferencia,saldo, numeroCuenta){
    transferencia.cuentaEmisora = numeroCuenta
    transferencia.cuentaReceptora = document.querySelector("#cuentaReceptora").value
    transferencia.saldoActual = saldo
    transferencia.valorTransferencia = document.querySelector("#valorTransferencia").value
    return transferencia
}

function validarNumeroCuentaExiste(cuentasBD, transferencia){
    if(cuentasBD.find(cuenta => cuenta.numeroCuenta == transferencia.cuentaReceptora)){
        return true
        }else{
            return false
            }
}

function actualizarSaldosEnBd(cuentasBD, transferencia){
    for(let i = 0; i< cuentasBD.length; i++){
        if(cuentasBD[i].numeroCuenta == transferencia.cuentaEmisora){
            cuentasBD[i].saldo = Number(transferencia.saldoActual) - Number(transferencia.valorTransferencia)
            transferencia.nuevoSaldo = cuentasBD[i].saldo
            saldo = transferencia.nuevoSaldo
            localStorage.setItem('Cuenta', JSON.stringify(cuentasBD))
            break
        }
    }
    for(let j = 0; j< cuentasBD.length; j++){
        if(cuentasBD[j].numeroCuenta == transferencia.cuentaReceptora){
            cuentasBD[j].saldo = Number(cuentasBD[j].saldo) + Number(transferencia.valorTransferencia)
            localStorage.setItem('Cuenta', JSON.stringify(cuentasBD))
            break
        }
    }
}

function guardarHistorial(transferencia){
    let historialBD= JSON.parse(localStorage.getItem("Historial"))
    let historialMovimientoSaliente={
        tipoMovimiento:"",
        fecha:"",
        valorMovimiento:"",
        idCuenta:""
    }
    let historialMovimientoEntrante={
        tipoMovimiento:"",
        fecha:"",
        valorMovimiento:"",
        idCuenta:""
    }
    
            historialMovimientoSaliente.tipoMovimiento = "Transferencia"
            historialMovimientoSaliente.valorMovimiento = "- " + transferencia.valorTransferencia
            historialMovimientoSaliente.fecha = formatoHoraYFechaColombia()
            historialMovimientoSaliente.idCuenta = transferencia.cuentaEmisora
            historialBD.push(historialMovimientoSaliente)
            historialMovimientoEntrante.tipoMovimiento = "Transferencia"
            historialMovimientoEntrante.valorMovimiento = "+ " +transferencia.valorTransferencia
            historialMovimientoEntrante.fecha = formatoHoraYFechaColombia()
            historialMovimientoEntrante.idCuenta = transferencia.cuentaReceptora
            historialBD.push(historialMovimientoEntrante)
            localStorage.setItem('Historial', JSON.stringify(historialBD))
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