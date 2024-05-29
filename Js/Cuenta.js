const urlParams = new URLSearchParams(window.location.search);
const saldo = urlParams.get('saldo');
const estado = urlParams.get('estado');
const numeroCuenta = urlParams.get('numeroCuenta');

document.getElementById('resultado').innerHTML = "El saldo es: $"+saldo+"<br>"+
"El numero de cuenta es: "+numeroCuenta+"<br>"+
"El estado es: "+estado+"<br>"

function mandarDatosTransferencia(saldo, numeroCuenta){
    let datosTransferencia = {
        saldoUsuario:saldo,
        numeroCuentaUsuario:numeroCuenta
    }
    window.location.href = `/Html/Transferencia.html?saldo=${datosTransferencia.saldoUsuario}&numeroCuenta=${datosTransferencia.numeroCuentaUsuario}`
}

function irATranferencia(){
    mandarDatosTransferencia(saldo, numeroCuenta)
}