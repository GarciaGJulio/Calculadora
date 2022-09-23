const botonNumero = document.querySelectorAll('[data-numero]')
const botonOperador = document.querySelectorAll('[data-operador]')
const botonBorrar = document.querySelector('[data-borrar]')
const botonBorrarTodo = document.querySelector('[data-borrar-todo]')
const botonIgual = document.querySelector('[data-igual]')
const textoValorSuperior = document.querySelector('[data-valor-superior]')
const textoValorInferior = document.querySelector('[data-valor-inferior]')


class Calculadora {
    constructor (textoValorInferior,textoValorSuperior){
        this.textoValorInferior=textoValorInferior
        this.textoValorSuperior=textoValorSuperior
        this.valorInferior =''
        this.valorSuperior =''
        this.operador = undefined
    }
    agregarNumero(numero){
        if (numero==='.' && this.valorInferior.includes('.')) return
        this.valorInferior = this.valorInferior + numero
    }
    imprimirDisplay(){
        this.textoValorInferior.innerText = this.valorInferior
        this.textoValorSuperior.innerText = this.valorSuperior
    }
    borrar(){
        this.valorInferior=this.valorInferior.slice(0,-1)/*El atributo slice se usa para devolver un string a su posicion inicial */
    }
    elegirOperacion(operador){
        if(this.valorInferior =='') return
        if(this.valorSuperior !='') {
            this.realizarCalculo()
        }
        this.operador=operador
        this.valorSuperior= this.valorInferior
        this.valorInferior=''
            

    }

    realizarCalculo(){
        let resultado
        let conversionValorSuperio = parseFloat(this.valorSuperior)
        let conversionValorInferior = parseFloat(this.valorInferior)
        if (isNaN(conversionValorSuperio) || isNaN(conversionValorInferior)) return /*Solucionando herror not a number en caso de clic en igual teniendo un operador en foco */
        switch (this.operador){
            case '+':
                resultado = conversionValorSuperio + conversionValorInferior
                break
            case '-':
                resultado = conversionValorSuperio - conversionValorInferior
                break
            case '/':
                resultado = conversionValorSuperio / conversionValorInferior
                break
            case '*':
                resultado = conversionValorSuperio * conversionValorInferior
                break
            default: return
        }

        this.valorInferior = resultado
        this.operador = undefined
        this.valorSuperior = ''      
    }

    limpiarPantalla () {
        this.valorInferior = ''
        this.valorSuperior = ''
        this.operador = undefined
    }


}

const calculadora = new Calculadora(textoValorInferior,textoValorSuperior)


/* Tomando los valores numericos */

botonNumero.forEach( boton => {
    boton.addEventListener('click', () => {
        calculadora.agregarNumero(boton.innerText)
        calculadora.imprimirDisplay()

    })    
})

/*Boton borrar */

botonBorrar.addEventListener( 'click', () =>{
    calculadora.borrar()
    calculadora.imprimirDisplay()
} )

/*Operadores */

botonOperador.forEach( boton => {
    boton.addEventListener('click', () => {
        calculadora.elegirOperacion(boton.innerText)
        calculadora.imprimirDisplay()

    })    
})

/*Boton Igual */

botonIgual.addEventListener( 'click', () =>{
    calculadora.realizarCalculo()
    calculadora.imprimirDisplay()
} )

/*Boton AC */

botonBorrarTodo.addEventListener('click', () =>{
    calculadora.limpiarPantalla()
    calculadora.imprimirDisplay()
})



