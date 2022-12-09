let ataqueJugador
let tipoAtaqueEnemigo
let estado
let vidasJugador = 3
let vidasEnemigo = 3

function iniciarJuego()
{
    let sectionSeleccionarAtaque = document.getElementById("seleccionar-ataque")
        sectionSeleccionarAtaque.style.display = "none"

    let sectionReiniciar = document.getElementById("reiniciar")
        sectionReiniciar.style.display = "none"

    let botonMascotaJugador = document.getElementById("boton-mascotas")
        botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)

    let botonFuego = document.getElementById("boton-fuego")
        botonFuego.addEventListener("click", ataqueFuego)

    let botonAgua = document.getElementById("boton-agua")
        botonAgua.addEventListener("click", ataqueAgua)

    let botonTierra = document.getElementById("boton-tierra")
        botonTierra.addEventListener("click", ataqueTierra)  

    let botonReiniciar = document.getElementById("boton-reiniciar")
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
    
    let sectionMensajes = document.getElementById("resultados")
    let ataquesDelJugador = document.getElementById("ataquesDelJugador")
    let ataquesDelEnemigo = document.getElementById("ataquesDelEnemigo")

    
    
    sectionMensajes.innerHTML = estado
    let mensajeJugador = document.createElement("p")
        mensajeJugador.innerHTML = "Tu mascota ataco con "+ ataqueJugador
    let mensajeEnemigo = document.createElement("p")    
        mensajeEnemigo.innerHTML = "La mascota enemiga ataco con " + tipoAtaqueEnemigo


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
    let sectionReiniciar = document.getElementById("reiniciar")
        sectionReiniciar.style.display = "flex"
    
    let sectionMensajes = document.getElementById("resultados")

    sectionMensajes.innerHTML = Mensaje

    
    




    let botonFuego = document.getElementById("boton-fuego")
        botonFuego.disabled = true
    let botonAgua = document.getElementById("boton-agua")
        botonAgua.disabled = true
    let botonTierra = document.getElementById("boton-tierra")
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
    let inputHipodoge = document.getElementById("Hipodoge")
    let inputCapipepo = document.getElementById("Capipepo")
    let inputRatigueya = document.getElementById("Ratigueya")
    let mascotaJugador = document.getElementById("mascota-jugador")
    
    let sectionSeleccionarAtaque = document.getElementById("seleccionar-ataque")
        
    let sectionSeleccionarMascota = document.getElementById("seleccionar-mascota")    
        
    
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
    let mascotaEnemigo = document.getElementById("mascota-enemigo")

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

