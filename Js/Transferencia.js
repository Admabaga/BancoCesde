let urlParams = new URLSearchParams(window.location.search);
let saldo = urlParams.get('saldo');
let numeroCuenta = urlParams.get('numeroCuenta');

document.getElementById('resultadoTransferencia').innerHTML = "El saldo es: $"+saldo+"<br>"+
"El numero de cuenta es: "+numeroCuenta+"<br>"

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
                    alert("Transferencia exitosa!")
                }
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




