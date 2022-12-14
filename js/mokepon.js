const sectionSeleccionarAtaque = document.getElementById("seleccionar-ataque")
const sectionReiniciar = document.getElementById("reiniciar")
const botonMascotaJugador = document.getElementById("boton-mascotas")

const botonReiniciar = document.getElementById("boton-reiniciar")
const sectionMensajes = document.getElementById("resultados")
const ataquesDelJugador = document.getElementById("ataquesDelJugador")
const ataquesDelEnemigo = document.getElementById("ataquesDelEnemigo")
const mascotaJugador = document.getElementById("mascota-jugador")
const sectionSeleccionarMascota = document.getElementById("seleccionar-mascota")    
const mascotaEnemigo = document.getElementById("mascota-enemigo")
const contenedorTarjetas = document.getElementById("contenedor-tarjetas")
const contenedorAtaques = document.getElementById("contenedor-ataques")



let mokepones = []
let opcionDeMokepones
let opcionDeAtaques
let ataqueJugador
let tipoAtaqueEnemigo
let estado
let vidasJugador = 3
let vidasEnemigo = 3
let inputCapipepo 
let inputHipodoge 
let inputRatigueya 
let botonFuego 
let botonAgua 
let botonTierra



class Mokepon{
    constructor(nombre, imagen, vidas)
    {
        this.nombre = nombre
        this.imagen = imagen 
        this.vidas = vidas 
        this.ataques = []
    }
}

let hipodoge =   new Mokepon("Hipodoge", "assets/hipodoge_attack.png", 5)
let capipepo =   new Mokepon("Capipepo", "assets/capipepo_attack.png", 5)
let ratigueya =   new Mokepon("Ratigueya", "assets/ratigueya_attack.png", 5)


hipodoge.ataques.push(
    {nombre: "💧", id : "boton-agua"},
    {nombre: "💧", id : "boton-agua"},
    {nombre: "💧", id : "boton-agua"},
    {nombre: "🌱", id : "boton-tierra"},
    {nombre: "🔥", id : "boton-fuego"}
)

capipepo.ataques.push(
    {nombre: "🌱", id : "boton-tierra"},
    {nombre: "🌱", id : "boton-tierra"},
    {nombre: "🌱", id : "boton-tierra"},
    {nombre: "💧", id : "boton-agua"},
    {nombre: "🔥", id : "boton-fuego"}
)

ratigueya.ataques.push(
    {nombre: "🔥", id : "boton-fuego"},
    {nombre: "🔥", id : "boton-fuego"},
    {nombre: "🔥", id : "boton-fuego"},
    {nombre: "🌱", id : "boton-tierra"},
    {nombre: "💧", id : "boton-agua"}
)


mokepones.push(hipodoge,capipepo,ratigueya)


function iniciarJuego()
{
    sectionSeleccionarAtaque.style.display = "none"
    sectionReiniciar.style.display = "none"
    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)
     
    botonReiniciar.addEventListener("click", reiniciarJuego)
        
    mokepones.forEach((mokepon) => {
        opcionDeMokepones = `
        <input type="radio" name="mascota" id=${mokepon.nombre} />
        <label class="tarjeta-de-mokepon" for="${mokepon.nombre}"> 
            <p>${mokepon.nombre}</p>    
            <img src=${mokepon.imagen} alt="${mokepon.nombre}">
        </label>
        `
        contenedorTarjetas.innerHTML += opcionDeMokepones
        inputHipodoge = document.getElementById("Hipodoge")
        inputCapipepo = document.getElementById("Capipepo")
        inputRatigueya = document.getElementById("Ratigueya")
    })


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

let mascotaSeleccionada;

function seleccionarMascotaJugador()
{
    if(inputHipodoge.checked)
    {
        mascotaJugador.innerHTML = inputHipodoge.id
        seleccionarMascotaEnemiga()
        mascotaSeleccionada = hipodoge.nombre;
        extraerAtaques(mascotaSeleccionada)
        sectionSeleccionarAtaque.style.display = "flex"
        sectionSeleccionarMascota.style.display = 'none'
      
    }

    else if(inputCapipepo.checked)
    {
        mascotaJugador.innerHTML = inputCapipepo.id
        seleccionarMascotaEnemiga()
        mascotaSeleccionada = capipepo.nombre;
        extraerAtaques(mascotaSeleccionada)
        sectionSeleccionarAtaque.style.display = "flex"
        sectionSeleccionarMascota.style.display = 'none'
    }
    else if(inputRatigueya.checked)
    {
        mascotaJugador.innerHTML = inputRatigueya.id
        seleccionarMascotaEnemiga()
        mascotaSeleccionada = ratigueya.nombre;
        extraerAtaques(mascotaSeleccionada)   
        sectionSeleccionarAtaque.style.display = "flex"
        sectionSeleccionarMascota.style.display = 'none'
    }

    else{
        alert("Tienes que seleccionar una mascota para continuar")
    }
    
}

function extraerAtaques(mascotaSeleccionada)
{

    mokepones.forEach((mokepon)=>{
        
        if(mokepon.nombre == mascotaSeleccionada)
        {
            mokepon.ataques.forEach((ataque)=> {
                opcionDeAtaques = `<button id=${ataque.id} class="boton-ataque">${ataque.nombre}</button>`
                contenedorAtaques.innerHTML += opcionDeAtaques 
            }) 
        }
    })

    botonFuego = document.getElementById("boton-fuego")
    botonAgua = document.getElementById("boton-agua")
    botonTierra = document.getElementById("boton-tierra")
        botonFuego.addEventListener("click", ataqueFuego)
        botonAgua.addEventListener("click", ataqueAgua)
        botonTierra.addEventListener("click", ataqueTierra) 
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
    let mascotaAleatoria = aleatorio(0, mokepones.length -1)

    mascotaEnemigo.innerHTML = mokepones[mascotaAleatoria].nombre
   
}
 
window.addEventListener("load", iniciarJuego)

