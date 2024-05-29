class Login{
    constructor(usuario, password){
        this.usuario = usuario
        this.password = password
    }
}

function captarDatosLogin(login){
    login.usuario = document.getElementById('usuarioLogin').value
    login.password = document.getElementById('passLogin').value
    return login
}

function validarUsuarioLogin(login, usuariosBD){
    let usuarioValido = false;
    for (let i = 0; i < usuariosBD.length; i++) {
        if (usuariosBD[i].correo.toLowerCase() == login.usuario.toLowerCase() && usuariosBD[i].password.toLowerCase() == login.password.toLowerCase()) {
            usuarioValido = true
            let usuarioEncontrado = usuariosBD[i]
            validadorUsuario = usuarioEncontrado.numeroCuenta
            return usuarioValido
        }
    }
}

let validadorUsuario
function iniciarSesion(){
    let login = new Login()
    let usuariosBD=JSON.parse(localStorage.getItem("Usuario"))
    let cuentasBD = JSON.parse(localStorage.getItem("Cuenta"))
    captarDatosLogin(login)
    if (validarUsuarioLogin(login, usuariosBD, validadorUsuario)) {
        let cuentaUsuario = traerDatosCuenta(validadorUsuario, cuentasBD)
        window.location.href = `/Html/Cuenta.html?saldo=${cuentaUsuario.saldo}&estado=${cuentaUsuario.estado}&numeroCuenta=${cuentaUsuario.numeroCuenta}`
       // alert(cuentaUsuario.numeroCuenta+"\n"+cuentaUsuario.saldo+"\n"+cuentaUsuario.estado)
        } else {
                alert("Usuario o contraseña incorrectos.")
                }

}

function traerDatosCuenta(validadorUsuario, cuentasBD){
    let cuentaEncontrada 
    for (let i = 0; i < cuentasBD.length; i++) {
        if (cuentasBD[i].numeroCuenta == validadorUsuario) {
            cuentaEncontrada = cuentasBD.find(cuenta => cuenta.numeroCuenta == validadorUsuario)
            return cuentaEncontrada
        }
    }

}


