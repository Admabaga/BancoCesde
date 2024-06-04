let urlParams = new URLSearchParams(window.location.search);
let saldo = urlParams.get('saldo');
let estado = urlParams.get('estado');
let numeroCuenta = urlParams.get('numeroCuenta');

let cuentasBD = JSON.parse(localStorage.getItem("Cuenta"))
for(let i = 0; i< cuentasBD.length; i++){
    if(cuentasBD[i].numeroCuenta == numeroCuenta){
        saldo = cuentasBD[i].saldo
        break
    }
}
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

