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
let tipoAtaqueEnemigo = []
let estado
let victoriasJugador = 0
let victoriasEnemigo = 0
let inputCapipepo 
let inputHipodoge 
let inputRatigueya 
let botonFuego 
let botonAgua 
let botonTierra
let botones = []
let ataqueJugador = []
let ataquesMokeponEnemigo  = []
let mascotaAleatoria 

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
    {nombre: "💧", id : "boton-agua", nombre2: "AGUA"},
    {nombre: "💧", id : "boton-agua", nombre2: "AGUA"},
    {nombre: "💧", id : "boton-agua", nombre2: "AGUA"},
    {nombre: "🌱", id : "boton-tierra", nombre2: "TIERRA"},
    {nombre: "🔥", id : "boton-fuego", nombre2: "FUEGO"}
)

capipepo.ataques.push(
    {nombre: "🌱", id : "boton-tierra", nombre2: "TIERRA"},
    {nombre: "🌱", id : "boton-tierra", nombre2: "TIERRA"},
    {nombre: "🌱", id : "boton-tierra", nombre2: "TIERRA"},
    {nombre: "💧", id : "boton-agua", nombre2: "AGUA"},
    {nombre: "🔥", id : "boton-fuego", nombre2: "FUEGO"}
)

ratigueya.ataques.push(
    {nombre: "🔥", id : "boton-fuego", nombre2: "FUEGO"},
    {nombre: "🔥", id : "boton-fuego", nombre2: "FUEGO"},
    {nombre: "🔥", id : "boton-fuego", nombre2: "FUEGO"},
    {nombre: "🌱", id : "boton-tierra", nombre2: "TIERRA"},
    {nombre: "💧", id : "boton-agua", nombre2: "AGUA"}
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
    let numero
    let numeros = []
    var j = 0;
    while(j < 5)
    {
        numero = aleatorio(0, ataquesMokeponEnemigo.length - 1)
        var existe = false 
        for(var i = 0; i < numeros.length; i++)
        {            
            if(numeros[i] == numero)
            {
                existe = true;
                break;
            }
        }       
        if(existe == false)
        {
            numeros.push(numero)
            j++
        }        
    }
    for(var i = 0; i<numeros.length; i++){
    
        tipoAtaqueEnemigo.push(mokepones[mascotaAleatoria].ataques[numeros[i]].nombre2)
    
    }
    console.log(numeros)
    console.log(tipoAtaqueEnemigo)

    condicionDeGanar()
    crearMensaje()
}

function crearMensaje()
{
    for(var i = 0; i < tipoAtaqueEnemigo.length; i++){

        let mensajeJugador = document.createElement("p")
            mensajeJugador.innerHTML =  ataqueJugador[i]
        let mensajeEnemigo = document.createElement("p")    
            mensajeEnemigo.innerHTML =  tipoAtaqueEnemigo[i]
        ataquesDelJugador.appendChild(mensajeJugador)
        ataquesDelEnemigo.appendChild(mensajeEnemigo)
    }    
}

function condicionDeGanar()
{
    elementoVidasJugador = document.getElementById("vidas-jugador")
    elementoVidasEnemigo = document.getElementById("vidas-enemigo")


    for(var i = 0; i < tipoAtaqueEnemigo.length; i++){
        if(ataqueJugador[i] == tipoAtaqueEnemigo[i])
        {
            
        }
        else if(ataqueJugador[i] == "FUEGO" && tipoAtaqueEnemigo[i] == "TIERRA" || ataqueJugador[i] == "AGUA" && tipoAtaqueEnemigo[i] == "FUEGO" || ataqueJugador[i] == "TIERRA" && tipoAtaqueEnemigo[i] == "AGUA")
        {
            
            victoriasEnemigo++
            elementoVidasEnemigo.innerHTML = victoriasEnemigo 
        }
        else{
         
            victoriasJugador++
            elementoVidasJugador.innerHTML = victoriasJugador 
        }
    }
    revisarVidas();
    
}

function crearMensajeFinal(Mensaje)
{
    sectionReiniciar.style.display = "flex"
    sectionMensajes.innerHTML = Mensaje
}

function revisarVidas()
{
    if(victoriasJugador < victoriasEnemigo)
    {
       crearMensajeFinal("TU ENEMIGO TE HA DERROTADO")
    }
    else if(victoriasEnemigo < victoriasJugador)
    {
        crearMensajeFinal("HAS DERROTADO A TU ENEMIGO")
    }
    else{
        crearMensajeFinal("HAN EMPATADO")
    }
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

function secuenciaAtaque()
{
    botones.forEach((boton) => {
            boton.addEventListener('click', (e) => {
                if(e.target.textContent === "💧")
                {
                    ataqueJugador.push("AGUA")
                    boton.style.background = "white"
                    boton.disabled = true
                    if(ataqueJugador.length == 5)
                    {
                        ataqueEnemigo()
                    }
                }
                else if(e.target.textContent === "🌱")
                {
                    ataqueJugador.push("TIERRA")
                    boton.style.background = "white"
                    boton.disabled = true
                    if(ataqueJugador.length == 5)
                    {
                        ataqueEnemigo()
                    }
                }
                else if(e.target.textContent === "🔥")
                {
                    ataqueJugador.push("FUEGO")
                    boton.style.background = "white"
                    boton.disabled = true
                    if(ataqueJugador.length == 5)
                    {
                        ataqueEnemigo()
                    }
                }

            })
            
    })



}


function extraerAtaques(mascotaSeleccionada)
{

    mokepones.forEach((mokepon)=>{
        
        if(mokepon.nombre == mascotaSeleccionada)
        {
            mokepon.ataques.forEach((ataque)=> {
                opcionDeAtaques = `<button id=${ataque.id} class="boton-ataque Bataque">${ataque.nombre}</button>`
                contenedorAtaques.innerHTML += opcionDeAtaques 
            }) 
        }
    })

    botonFuego = document.getElementById("boton-fuego")
    botonAgua = document.getElementById("boton-agua")
    botonTierra = document.getElementById("boton-tierra")
    botones = document.querySelectorAll(".Bataque")

    secuenciaAtaque()
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
    mascotaAleatoria= aleatorio(0, mokepones.length -1)
    mascotaEnemigo.innerHTML = mokepones[mascotaAleatoria].nombre
    ataquesMokeponEnemigo = mokepones[mascotaAleatoria].ataques
   
}
 
window.addEventListener("load", iniciarJuego)

