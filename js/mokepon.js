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
const sectionVerMapa = document.getElementById("ver-mapa")
const mapa = document.getElementById("mapa")
const anchoMaximoDelMapa = 350




let mapaBackground = new Image()
mapaBackground.src = "./assets/mokemap.png"



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
let lienzo = mapa.getContext("2d")
let intervalo 
let mascotaSeleccionada;
let objetoMascotaSel;
let objetoMascotaEnemiga;
let alturaBuscada;
let anchoDelMapa = window.innerWidth - 20;


if(anchoDelMapa >= anchoMaximoDelMapa)
{
    anchoDelMapa = anchoMaximoDelMapa - 20
}
mapa.width = anchoDelMapa;
alturaBuscada = anchoDelMapa * 600/800;
mapa.height = alturaBuscada;


class Mokepon{
    constructor(nombre, imagen, vidas,fotoMapa)
    {
        this.nombre = nombre
        this.imagen = imagen 
        this.vidas = vidas 
        this.ataques = []
        this.ancho = 50
        this.alto = 50
        this.x = aleatorio(0, mapa.width - this.ancho)
        this.y = aleatorio(0, mapa.height - this.alto)
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoMapa
        this.velocidadX = 0
        this.velocidadY = 0
        
        this.fotoMapa = fotoMapa    
    }

    pintarMokepon() {
        lienzo.drawImage(this.mapaFoto, this.x, this.y, this.ancho, this.alto)    
    }
}

let hipodoge =   new Mokepon("Hipodoge", "assets/hipodoge_attack.png", 5, "assets/hipodoge.png")
let capipepo =   new Mokepon("Capipepo", "assets/capipepo_attack.png", 5, "assets/capipepo.png")
let ratigueya =   new Mokepon("Ratigueya", "assets/ratigueya_attack.png", 5, "assets/ratigueya.png")

let hipodogeEnemigo =   new Mokepon("Hipodoge", "assets/hipodoge_attack.png", 5, "assets/hipodoge.png")
let capipepoEnemigo =   new Mokepon("Capipepo", "assets/capipepo_attack.png", 5, "assets/capipepo.png")
let ratigueyaEnemigo =   new Mokepon("Ratigueya", "assets/ratigueya_attack.png", 5, "assets/ratigueya.png")

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

hipodogeEnemigo.ataques.push(
    {nombre: "💧", id : "boton-agua", nombre2: "AGUA"},
    {nombre: "💧", id : "boton-agua", nombre2: "AGUA"},
    {nombre: "💧", id : "boton-agua", nombre2: "AGUA"},
    {nombre: "🌱", id : "boton-tierra", nombre2: "TIERRA"},
    {nombre: "🔥", id : "boton-fuego", nombre2: "FUEGO"}
)
capipepoEnemigo.ataques.push(
    {nombre: "🌱", id : "boton-tierra", nombre2: "TIERRA"},
    {nombre: "🌱", id : "boton-tierra", nombre2: "TIERRA"},
    {nombre: "🌱", id : "boton-tierra", nombre2: "TIERRA"},
    {nombre: "💧", id : "boton-agua", nombre2: "AGUA"},
    {nombre: "🔥", id : "boton-fuego", nombre2: "FUEGO"}
)
ratigueyaEnemigo.ataques.push(
    {nombre: "🔥", id : "boton-fuego", nombre2: "FUEGO"},
    {nombre: "🔥", id : "boton-fuego", nombre2: "FUEGO"},
    {nombre: "🔥", id : "boton-fuego", nombre2: "FUEGO"},
    {nombre: "🌱", id : "boton-tierra", nombre2: "TIERRA"},
    {nombre: "💧", id : "boton-agua", nombre2: "AGUA"}
)




mokepones.push(hipodoge,capipepo,ratigueya)





function iniciarJuego()
{
    sectionVerMapa.style.display = "none"
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
    
        tipoAtaqueEnemigo.push(objetoMascotaEnemiga.ataques[numeros[i]].nombre2)
    
    }

    console.log("ataque")


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
function seleccionarMascotaJugador()
{
   
    if(inputHipodoge.checked)
    {
        mascotaJugador.innerHTML = inputHipodoge.id
        mascotaSeleccionada = hipodoge.nombre;
        extraerAtaques(mascotaSeleccionada)
        sectionSeleccionarMascota.style.display = 'none'
        sectionVerMapa.style.display = "flex"
        objetoMascotaSel = hipodoge;
        iniciarMapa()
    }

    else if(inputCapipepo.checked)
    {
        mascotaJugador.innerHTML = inputCapipepo.id
        
        mascotaSeleccionada = capipepo.nombre;
        extraerAtaques(mascotaSeleccionada)
        sectionSeleccionarMascota.style.display = 'none'
        sectionVerMapa.style.display = "flex"
        objetoMascotaSel = capipepo;
        iniciarMapa()
    }
    else if(inputRatigueya.checked)
    {
        mascotaJugador.innerHTML = inputRatigueya.id
        mascotaSeleccionada = ratigueya.nombre;
        extraerAtaques(mascotaSeleccionada)   
        sectionSeleccionarMascota.style.display = 'none'
        sectionVerMapa.style.display = "flex"
        objetoMascotaSel = ratigueya
        iniciarMapa()
    }

    else{
        alert("Tienes que seleccionar una mascota para continuar")
    }
    
}
function iniciarMapa(){
  






    pintarCanva()

    intervalo=setInterval(pintarCanva,50)
    window.addEventListener('keydown',sePresionoUnaTecla)
    window.addEventListener('keyup',detenerPersonaje)

}
function pintarCanva()
{
    lienzo.clearRect(0,0,mapa.width, mapa.height)
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height
    )

    objetoMascotaSel.pintarMokepon()
    hipodogeEnemigo.pintarMokepon()
    capipepoEnemigo.pintarMokepon()
    ratigueyaEnemigo.pintarMokepon()
    objetoMascotaSel.x = objetoMascotaSel.x + objetoMascotaSel.velocidadX;
    objetoMascotaSel.y = objetoMascotaSel.y + objetoMascotaSel.velocidadY;

    if(objetoMascotaSel.velocidadX !== 0 || objetoMascotaSel.velocidadY !== 0)
    {
        revisarCollision(hipodogeEnemigo)
        revisarCollision(capipepoEnemigo)
        revisarCollision(ratigueyaEnemigo)
    }    


}
function sePresionoUnaTecla(event)
{
    switch (event.key) {
        case "ArrowUp":
                moverPersonajeArriba()
            break;
        
        case "ArrowDown":
                moverPersonajeAbajo()
            break;
        
        case "ArrowLeft":
            moverPersonajeIzquierda()
            break;    

        case "ArrowRight":
            moverPersonajeDerecha()
            break; 
            
        default:
            break;
    }
}
function moverPersonajeDerecha()
{
    objetoMascotaSel.velocidadX = 5
}
function moverPersonajeIzquierda()
{
    objetoMascotaSel.velocidadX = - 5;
}
function moverPersonajeArriba()
{
    objetoMascotaSel.velocidadY = -5; 
}
function moverPersonajeAbajo()
{
    objetoMascotaSel.velocidadY = 5
}
function detenerPersonaje()
{
    objetoMascotaSel.velocidadX = 0
    objetoMascotaSel.velocidadY = 0
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

                    console.log(ataqueJugador)
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
                    console.log(ataqueJugador)
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
                    console.log(ataqueJugador)
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
function seleccionarMascotaEnemiga(enemigo)
{
    
    mascotaEnemigo.innerHTML = enemigo.nombre
    ataquesMokeponEnemigo = enemigo.ataques
   
}

function revisarCollision(enemigo)
{
    objetoMascotaEnemiga = enemigo
    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const derechaEnemigo = enemigo.x + enemigo.ancho
    const izquierdaEnemigo = enemigo.x
    
    const arribaMascota = objetoMascotaSel.y
    const abajoMascota = objetoMascotaSel.y + enemigo.alto
    const derechaMascota = objetoMascotaSel.x + enemigo.ancho
    const izquierdaMascota = objetoMascotaSel.x
    
    if(abajoMascota < arribaEnemigo|| arribaMascota >abajoEnemigo || derechaMascota < izquierdaEnemigo ||izquierdaMascota > derechaEnemigo)
    {
        return
    }
    alert("Has colisionado con un " + enemigo.nombre + " enemigo")

    detenerPersonaje()
    clearInterval(intervalo)
    sectionVerMapa.style.display = "none"
    sectionSeleccionarAtaque.style.display = "flex"
    seleccionarMascotaEnemiga(enemigo)
}

window.addEventListener("load", iniciarJuego)

