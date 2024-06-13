class Usuario {
    constructor(nombre, apellido, id, correo, password, numeroCuenta){
        this.nombre = nombre
        this.apellido = apellido
        this.id = id
        this.correo = correo
        this.password = password
        this.numeroCuenta = numeroCuenta
    }
}

function captarDatosLogin(usuario, numeroAsignado){
    usuario.id = document.getElementById('idCliente').value
    usuario.nombre = document.getElementById('nombresCliente').value
    usuario.apellido = document.getElementById('apellidosCliente').value
    usuario.correo = document.getElementById('correoCLiente').value
    usuario.password = document.getElementById('passwordCLiente').value
    
    return usuario
}

function validacionCorreoExiste(usuariosBD, usuario){
    let usuarioExistente = false;
    for (let i = 0; i < usuariosBD.length; i++) {
        if (usuariosBD[i].correo == usuario.correo) {
            usuarioExistente = true
            return usuarioExistente
        }
    }
}

function validacionCedulaExiste(usuariosBD, usuario){
    let usuarioExistente = false;
    for (let i = 0; i < usuariosBD.length; i++) {
        if (usuariosBD[i].id == usuario.id) {
            usuarioExistente = true
            return usuarioExistente
        }
    }
}

function validarPasswords(usuario){
    let segundaPassword = document.getElementById('passwordCLiente2').value
    let passwordCorrecta = false;
    if(usuario.password == segundaPassword){
        passwordCorrecta = true
        return passwordCorrecta
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


function registro(){
    let usuario = new Usuario()
    let usuariosBD
    let cuentasBD
    let historialBD
    let ultimoNumeroCuenta

    if(localStorage.getItem("Usuario") == null){
        usuariosBD = [];
    } else {
        usuariosBD = JSON.parse(localStorage.getItem("Usuario"));
    }

    if(localStorage.getItem("Cuenta") == null){
        cuentasBD = [];
    } else {
        cuentasBD = JSON.parse(localStorage.getItem("Cuenta"));
    }

    if(localStorage.getItem("ultimoNumeroCuenta") == null){
        ultimoNumeroCuenta = 1000000000;
    } else {
        ultimoNumeroCuenta = JSON.parse(localStorage.getItem("ultimoNumeroCuenta"));
        ultimoNumeroCuenta++;
    }

    if(localStorage.getItem("Historial") == null){
        historialBD = [];
    } else {
        historialBD = JSON.parse(localStorage.getItem("Historial"));
    }

    localStorage.setItem('ultimoNumeroCuenta', ultimoNumeroCuenta.toString())
    captarDatosLogin(usuario)
    usuario.numeroCuenta = ultimoNumeroCuenta
    if(validacionCorreoExiste(usuariosBD, usuario)) {
        alert("Este correo electronico ya fue registrado.")
        }else if (validacionCedulaExiste(usuariosBD, usuario)) {
                    alert("Este numero de identificacion ya fue registrado.")
                }else if(!validarPasswords(usuario)){
                        alert("Las contraseñas son diferentes.")
                        }else{
                            let cuenta = {
                                numeroCuenta:"",
                                saldo:"",
                                estado:""
                            }

                            let historialMovimiento={
                                tipoMovimiento:"",
                                fecha:"",
                                valorMovimiento:"",
                                idCuenta:""
                            }
                            cuenta.numeroCuenta = usuario.numeroCuenta
                            cuenta.saldo = 200000
                            cuenta.estado = "Activa"
                            historialMovimiento.tipoMovimiento = "Saldo apertura cuenta"
                            historialMovimiento.valorMovimiento = "+ " +cuenta.saldo
                            historialMovimiento.fecha = formatoHoraYFechaColombia()
                            historialMovimiento.idCuenta = cuenta.numeroCuenta
                            historialBD.push(historialMovimiento)
                            cuentasBD.push(cuenta)
                            usuariosBD.push(usuario)
                            localStorage.setItem("Usuario", JSON.stringify(usuariosBD))
                            localStorage.setItem("Cuenta", JSON.stringify(cuentasBD))
                            localStorage.setItem("Historial", JSON.stringify(historialBD))
                            alert("Usuario registrado exitosamente.")
                            window.location.href = `/Html/LogIn.html`
                            }
}



