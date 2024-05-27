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

let numeroAsignado =1000000000
function captarDatosLogin(usuario){
    usuario.id = document.getElementById('idCliente').value
    usuario.nombre = document.getElementById('nombresCliente').value
    usuario.apellido = document.getElementById('apellidosCliente').value
    usuario.correo = document.getElementById('correoCLiente').value
    usuario.password = document.getElementById('passwordCLiente').value
    usuario.numeroCuenta = asignadorNumeroCuenta(numeroAsignado)
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

function asignadorNumeroCuenta() {
    numeroAsignado++
    return numeroAsignado
}

function registro(){
    let usuario = new Usuario()
    let usuariosBD
    if(localStorage.getItem("Usuario") == null){
        usuariosBD = []
    }else{
        usuariosBD=JSON.parse(localStorage.getItem("Usuario"))
    }
    captarDatosLogin(usuario)
    if (validacionCorreoExiste(usuariosBD, usuario)) {
        alert("Este correo electronico ya fue registrado.")
    }else if (validacionCedulaExiste(usuariosBD, usuario)) {
        alert("Este numero de identificacion ya fue registrado.")
    }else if(!validarPasswords(usuario)){
        alert("Las contraseñas son diferentes.")
    }else{
    usuariosBD.push(usuario)
    localStorage.setItem("Usuario", JSON.stringify(usuariosBD))
    alert("Usuario registrado exitosamente.")
    }
}

