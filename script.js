const btnEmpezar = document.getElementById('btnEmpezar')
const celeste = document.getElementById('celeste')
const violeta = document.getElementById('violeta')
const naranja = document.getElementById('naranja')
const verde = document.getElementById('verde')

class Juego {
    constructor () {
        this.elegirColor = this.elegirColor.bind(this)//.bind(this) sirve para que al momento de llamar a la funcion, no pierda la referencia
        this.level = 1
        this.ULTIMO_NIVEL = 1
        this.colores = {
            celeste,
            violeta,
            naranja,
            verde
        }
        this.subnivel = 0
        this.siguienteNivel = this.siguienteNivel.bind(this)
        this.speed = 1000
        this.inicializar()
        this.generarSecuencia()
        this.siguienteNivel()
    }
    
    inicializar() {
        const chooseLevel = document.getElementById('levels')
        const chooseSpeed = document.getElementById('game__rules')
        this.speed = parseInt(chooseSpeed.velocity.value)
        this.ULTIMO_NIVEL = parseInt(chooseLevel.value)
        btnEmpezar.disabled = true;
    }

    generarSecuencia() {
        this.secuencia =  new Array(this.ULTIMO_NIVEL).fill(0).map(n => Math.floor(Math.random() * 4))
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
            setTimeout(() => this.iluminarColor(color), this.speed * i)
        }
    }

    elegirColor(ev) {
        const nombreColor = ev.target.dataset.color
        const numeroColor = this.trasnformarColorANumero(nombreColor)
        this.iluminarColor(nombreColor)
        // debugger
        if (numeroColor === this.secuencia[this.subnivel]){
            this.subnivel++
            if (this.subnivel === this.level){
                this.level++
                this.subnivel = 0
                this.eliminarEventosClick()
                if (this.level === (this.ULTIMO_NIVEL + 1)){
                    this.ganoElJuego()
                }
                else{
                    setTimeout(this.siguienteNivel, 1500)
                }
            }
        }
        else{
            this.perdioElJuego()
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

    ganoElJuego() {
        swal('Felicitaciones', 'Ganaste el juego!', 'success')
    }

    perdioElJuego() {
        swal('Lo siento', 'Te equivocaste!', 'error')
        .then(() => {
            this.eliminarEventosClick()
        })
    }
}


function empezarJuego() {
    // alert("El juego está por empezar!")
    window.juego = new Juego()
}