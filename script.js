const btnEmpezar = document.getElementById('btnEmpezar')
const celeste = document.getElementById('celeste')
const violeta = document.getElementById('violeta')
const naranja = document.getElementById('naranja')
const verde = document.getElementById('verde')
const ULTIMO_NIVEL = 10

class Juego {
    constructor () {
        this.elegirColor = this.elegirColor.bind(this)//.bind(this) sirve para que al momento de llamar a la funcion, no pierda la referencia
        this.secuencia = []
        this.level = 1
        this.colores = {
            celeste,
            violeta,
            naranja,
            verde
        }
        this.subnivel = 0
        this.siguienteNivel = this.siguienteNivel.bind(this)
        this.inicializar()
        this.generarSecuencia()
        this.siguienteNivel()
    }
    
    inicializar() {
        btnEmpezar.classList.add('hide')
    }

    generarSecuencia() {
        this.secuencia =  new Array(ULTIMO_NIVEL).fill(0).map(n => Math.floor(Math.random() * 4))
    }


    transformarNumeroAColor(numero) {
        switch (numero) {
            case 0:
                return 'celeste'
            case 1:
                return 'violeta'
            case 2:
                return 'naranja'
            case 3:
                return 'verde'
        }
    }

    trasnformarColorANumero(color) {
        switch (color){
            case 'celeste':
                return 0
            case 'violeta':
                return 1
            case 'naranja':
                return 2
            case 'verde':
                return 3
        }
    }

    apagarColor(color) {
        this.colores[color].classList.remove('light')
    }
    
    iluminarColor(color) {
        this.colores[color].classList.add('light')
        setTimeout(() => this.apagarColor(color), 350)
    }

    iluminarSecuencia(){
        for (let i = 0; i < this.level ; i++){
            let color = this.transformarNumeroAColor(this.secuencia[i])
            setTimeout(() => this.iluminarColor(color), 1000 * i)
        }
    }

    elegirColor(ev) {
        const nombreColor = ev.target.dataset.color
        const numeroColor = this.trasnformarColorANumero(nombreColor)
        this.iluminarColor(nombreColor)
        if (numeroColor === this.secuencia[this.subnivel]){
            this.subnivel++
            if (this.subnivel === this.level){
                this.level++
                this.eliminarEventosClick()
                if (this.level === (ULTIMO_NIVEL + 1)){
                    // alert("Ganaste!")
                }
                else{
                    setTimeout(this.siguienteNivel, 1500)
                }
            }
        }
        else{
            // alert("Perdiste!")
        }

    }

    agregarEventosClick() {
        this.colores.celeste.addEventListener('click',this.elegirColor)
        this.colores.violeta.addEventListener('click',this.elegirColor)
        this.colores.naranja.addEventListener('click',this.elegirColor)
        this.colores.verde.addEventListener('click',this.elegirColor)
    }

    eliminarEventosClick() {
        this.colores.celeste.removeEventListener('click',this.elegirColor)
        this.colores.violeta.removeEventListener('click',this.elegirColor)
        this.colores.naranja.removeEventListener('click',this.elegirColor)
        this.colores.verde.removeEventListener('click',this.elegirColor)
    }

    siguienteNivel() {
        this.iluminarSecuencia()
        this.agregarEventosClick()
    }
}


function empezarJuego() {
    // alert("El juego está por empezar!")
    window.juego = new Juego()
}