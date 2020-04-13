const init = function () {
  document.addEventListener('DOMContentLoaded', () => {
  'use strict'

/* get all UI elements */
const numberBtn = document.querySelectorAll('[data-number]')
const operationBtn = document.querySelectorAll('[data-operation]')
const clearAll = document.querySelector('[data-all-clear]')
const deleteBtn = document.querySelector('[data-delete]')
const equalsBtn = document.querySelector('[data-equals]')
const previousOperandTextElement = document.querySelector('.previous-operand')
const currentOperandTextElement = document.querySelector('.current-operand')
const timeTextElement = document.querySelector('.time')
/*  Create the Calculator class  */
class Calculator{
  constructor(previousOperandTextElement, currentOperandTextElement){
    this.previousOperandTextElement = previousOperandTextElement
    this.currentOperandTextElement = currentOperandTextElement
    this.clear()
  }

  clear(){
    this.currentOperand = ''
    this.previousOperand = ''
    this.operation = undefined
  }
  backspace(){
    this.currentOperand = this.currentOperand.toString().slice(0, -1)
  }

  appendNumber( number ){
    if(number === '.' && this.currentOperand.includes('.')) return

    // get the current number and append the next 
    // use toString() to avoid computation
    this.currentOperand = this.currentOperand.toString() + number.toString()
    
  }
  chooseOperation( operation ){
    /* block the fn if the operation is null, if not compute */
    if(this.currentOperand === '') return
    if(this.currentOperand !== ''){
      this.compute()
    }
    // assign operation, curr becomes previous and curr back to empty
    this.operation = operation
    this.previousOperand = this.currentOperand
    this.currentOperand = ''
  }

  compute(){
    let computation
    const prev = parseFloat(this.previousOperand)
    const current = parseFloat(this.currentOperand)
    if(isNaN(prev) || isNaN(current)) return

    switch (this.operation) {
      case '+':
        computation = prev + current
        break;
        case '-':
          computation = prev - current
          break;
        case '*':
          computation = prev * current
          break; 
        case '/':
          computation = prev / current
          break;     
      default:
        return
    }
    this.currentOperand = computation
    this.operation = undefined
    this.previousOperand = ''

  }

  updateUI(){
    this.currentOperandTextElement.innerText = this.currentOperand;
    if(this.operation != null){
      this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
    }else{
      this.previousOperandTextElement.innerText = ''
    }
  }


  getDisplayNumber(number) {
    const stringNumber = number.toString()
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1]
    let integerDisplay
    if (isNaN(integerDigits)) {
      integerDisplay = ''
    } else {
      integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`
    } else {
      return integerDisplay
    }
  }
}


/* Create calculator instance */
const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)


/* EventListeners for the buttons */
numberBtn.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText);
    calculator.updateUI()

  })
})
operationBtn.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText)
    calculator.updateUI()
  })
})

deleteBtn.addEventListener('click', () => {
    calculator.backspace()
    calculator.updateUI()
  })

clearAll.addEventListener('click', () => {
    calculator.clear();
    calculator.updateUI();
  })

equalsBtn.addEventListener('click', () => {
  calculator.compute();
  calculator.updateUI();
})


const date = new Date()
const hours = date.getHours()
const minutes = date.getMinutes()
const time = `${hours}:${minutes}`

timeTextElement.innerText = time



})}
init();