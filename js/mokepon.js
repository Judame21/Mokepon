let sectionSeleccionarAtaque = document.getElementById("seleccionar-ataque")
let sectionReiniciar = document.getElementById("reiniciar")
let botonMascotaJugador = document.getElementById("boton-mascotas")
let botonFuego = document.getElementById("boton-fuego")
let botonAgua = document.getElementById("boton-agua")
let botonTierra = document.getElementById("boton-tierra")
let botonReiniciar = document.getElementById("boton-reiniciar")
let sectionMensajes = document.getElementById("resultados")
let ataquesDelJugador = document.getElementById("ataquesDelJugador")
let ataquesDelEnemigo = document.getElementById("ataquesDelEnemigo")
let inputHipodoge = document.getElementById("Hipodoge")
let inputCapipepo = document.getElementById("Capipepo")
let inputRatigueya = document.getElementById("Ratigueya")
let mascotaJugador = document.getElementById("mascota-jugador")
let sectionSeleccionarMascota = document.getElementById("seleccionar-mascota")    
let mascotaEnemigo = document.getElementById("mascota-enemigo")


let ataqueJugador
let tipoAtaqueEnemigo
let estado
let vidasJugador = 3
let vidasEnemigo = 3

function iniciarJuego()
{
    sectionSeleccionarAtaque.style.display = "none"
    sectionReiniciar.style.display = "none"
    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)
    botonFuego.addEventListener("click", ataqueFuego)
    botonAgua.addEventListener("click", ataqueAgua)
    botonTierra.addEventListener("click", ataqueTierra)  
    botonReiniciar.addEventListener("click", reiniciarJuego)
        
}

function ataqueEnemigo()
{
    let numero = aleatorio(1, 3)

    if(numero == 1)
    {
        tipoAtaqueEnemigo = "FUEGO"
    }
    else if(numero == 2)
    {
        tipoAtaqueEnemigo = "AGUA"
    }
    else
    {
        tipoAtaqueEnemigo = "TIERRA"
    }

    condicionDeGanar()
    crearMensaje()
}

function crearMensaje()
{
    

    
    
    sectionMensajes.innerHTML = estado
    let mensajeJugador = document.createElement("p")
        mensajeJugador.innerHTML =  ataqueJugador
    let mensajeEnemigo = document.createElement("p")    
        mensajeEnemigo.innerHTML =  tipoAtaqueEnemigo


    ataquesDelJugador.appendChild(mensajeJugador)
    ataquesDelEnemigo.appendChild(mensajeEnemigo)
    revisarVidas()

    

}

function condicionDeGanar()
{
    elementoVidasJugador = document.getElementById("vidas-jugador")
    elementoVidasEnemigo = document.getElementById("vidas-enemigo")

    if(ataqueJugador == tipoAtaqueEnemigo)
    {
        estado = "EMPATE"
    }
    else if(ataqueJugador == "FUEGO" && tipoAtaqueEnemigo == "TIERRA" || ataqueJugador == "AGUA" && tipoAtaqueEnemigo == "FUEGO" || ataqueJugador == "TIERRA" && tipoAtaqueEnemigo == "AGUA")
    {
        estado = "GANASTE"
        vidasEnemigo--
        elementoVidasEnemigo.innerHTML = vidasEnemigo 
    }
    else{
        estado = "PERDISTE"
        vidasJugador--
        elementoVidasJugador.innerHTML = vidasJugador 
    }

    
}

function crearMensajeFinal(Mensaje)
{
    sectionReiniciar.style.display = "flex"
    sectionMensajes.innerHTML = Mensaje
    botonFuego.disabled = true
    botonAgua.disabled = true
    botonTierra.disabled = true  
}

function revisarVidas()
{
    if(vidasJugador == 0)
    {
       crearMensajeFinal("TU ENEMIGO TE HA DERROTADO")
    }
    else if(vidasEnemigo == 0)
    {
        crearMensajeFinal("HAS DERROTADO A TU ENEMIGO")
    }
}

function ataqueFuego()
{
    ataqueJugador = "FUEGO"
    ataqueEnemigo()
}

function ataqueAgua()
{
    ataqueJugador = "AGUA"
    ataqueEnemigo()
}

function ataqueTierra()
{
    ataqueJugador = "TIERRA"
    ataqueEnemigo()
}

function seleccionarMascotaJugador()
{
    if(inputHipodoge.checked)
    {
        mascotaJugador.innerHTML = "Hipodoge"
        seleccionarMascotaEnemiga()
        sectionSeleccionarAtaque.style.display = "flex"
        sectionSeleccionarMascota.style.display = 'none'
    }
    else if(inputCapipepo.checked)
    {
        mascotaJugador.innerHTML = "Capipepo"
        seleccionarMascotaEnemiga()
        sectionSeleccionarAtaque.style.display = "flex"
        sectionSeleccionarMascota.style.display = 'none'
    }
    else if(inputRatigueya.checked)
    {
        mascotaJugador.innerHTML = "Ratigueya"
        seleccionarMascotaEnemiga()
        sectionSeleccionarAtaque.style.display = "flex"
        sectionSeleccionarMascota.style.display = 'none'
    }
    else{
        alert("Tienes que seleccionar una mascota para continuar")
    }       
}

function reiniciarJuego()
{
    location.reload()
}

function aleatorio(min, max)
{
    return Math.floor(Math.random()*(max-min+1)+min)
}

function seleccionarMascotaEnemiga()
{
    let mascotaAleatoria = aleatorio(1,3)
    if(mascotaAleatoria == 1)
    {
        mascotaEnemigo.innerHTML = "Hipodoge"
    }
    else if(mascotaAleatoria == 2)
    {
        mascotaEnemigo.innerHTML = "Capipepo"
    }
    else if(mascotaAleatoria == 3)
    {
        mascotaEnemigo.innerHTML = "Ratigueya"
    }
}
 
window.addEventListener("load", iniciarJuego)

