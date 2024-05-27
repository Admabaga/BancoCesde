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
            return usuarioValido
        }
    }
}

function iniciarSesion(){
    let login = new Login()
    let usuariosBD
    if(localStorage.getItem("Usuario") == null){
        usuariosBD = []
    }else{
        usuariosBD=JSON.parse(localStorage.getItem("Usuario"))
    }
    captarDatosLogin(login)
    if (validarUsuarioLogin(login, usuariosBD)) {
        window.location.href = "/Html/RegistroCuenta.html"
    } else {
        alert("Usuario o contraseña incorrectos.")
    }
}