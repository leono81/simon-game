const btnEmpezar = document.getElementById('btnEmpezar')
const celeste = document.getElementById('celeste')
const violeta = document.getElementById('violeta')
const naranja = document.getElementById('naranja')
const verde = document.getElementById('verde')

class Juego {
    constructor () {
        this.secuencia = []
        this.level = 1
        this.colores = {
            celeste,
            violeta,
            naranja,
            verde
        }
        this.inicializar()
        this.generarSecuencia()
    }
    
    inicializar() {
        btnEmpezar.classList.add('hide')
    }

    generarSecuencia() {
        this.secuencia =  new Array(10).fill(0).map(n => Math.floor(Math.random() * 4))
    }
}


function empezarJuego() {
    // alert("El juego está por empezar!")
    window.juego = new  Juego()
}