let urlParams = new URLSearchParams(window.location.search);
let saldo = urlParams.get('saldo');
let estado = urlParams.get('estado');
let numeroCuenta = urlParams.get('numeroCuenta');

document.getElementById('resultado').innerHTML = "El saldo es: $"+saldo+"<br>"+
"El numero de cuenta es: "+numeroCuenta+"<br>"+
"El estado es: "+estado+"<br>"

function irATranferencia(){
    let datosTransferencia = {
        saldoUsuario:saldo,
        numeroCuentaUsuario:numeroCuenta,
        estado: estado
    }
    window.location.href = `/Html/Transferencia.html?saldo=${datosTransferencia.saldoUsuario}&numeroCuenta=${datosTransferencia.numeroCuentaUsuario}&estado=${datosTransferencia.estado}`
}

function verHistorial(){
    let datosParaHistorial = {
        cuenta: numeroCuenta,
        saldo: saldo,
        estado:estado
    }
    window.location.href = `/Html/HistorialCuenta.html?saldo=${datosParaHistorial.saldo}&numeroCuenta=${datosParaHistorial.cuenta}&estado=${datosParaHistorial.estado}`
}

function retirarDinero(){
    let datosParaRetiro = {
        cuenta: numeroCuenta,
        saldo: saldo,
        estado:estado
    }
    window.location.href = `/Html/Retiro.html?saldo=${datosParaRetiro.saldo}&numeroCuenta=${datosParaRetiro.cuenta}&estado=${datosParaRetiro.estado}`
}

function recargarDinero(){
    let datosParaRecarga = {
        cuenta: numeroCuenta,
        saldo: saldo,
        estado:estado
    }
    window.location.href = `/Html/Recarga.html?saldo=${datosParaRecarga.saldo}&numeroCuenta=${datosParaRecarga.cuenta}&estado=${datosParaRecarga.estado}`
}

