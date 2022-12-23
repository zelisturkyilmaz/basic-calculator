const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const equal = document.querySelector('.equal');
const clearAllButton = document.querySelector('.ac');

const calculationScreen = document.querySelector('.calculation');
const currentScreen = document.querySelector('.currentOperation');

let firstOperand = '';
let secondOperand = '';
let operator = '';
let operatorPressed = false;


numbers.forEach( number => {
    number.addEventListener('click', addOperand);
})

operators.forEach( operator => {
    operator.addEventListener('click', addOperator);
});

equal.addEventListener('click', calculate )

clearAllButton.addEventListener('click', () => {
    calculationScreen.textContent = '';
    cleanCurrentScreen();
    firstOperand = '';
    secondOperand = '';
    operatorPressed = false;
})


function calculate() {
    if( firstOperand === '' || secondOperand === '' || operator === '') return;
    calculationScreen.textContent = `${firstOperand} ${operator} ${secondOperand} =`;
    let result = operate( operator, firstOperand, secondOperand);
    currentScreen.textContent = result;
    firstOperand = result;
    secondOperand = '';
    operator = '';
    operatorPressed = false;
}

function addOperator(event) {
    if (firstOperand === '') return;

    if (firstOperand !== '' || secondOperand !== '' || operator !== ''){
        calculate();
    }
    if (event.target.textContent === 'x^y') {
        operator = '^';
        operatorPressed = true;
    } else {
        operator = event.target.textContent;
        operatorPressed = true;
    }

    calculationScreen.textContent = `${firstOperand} ${operator}`;
    cleanCurrentScreen();

}

function addOperand(event) {
    if ( calculationScreen.textContent.includes('=')) return;
    if ( operatorPressed === false) {
        key = event.target.textContent;
        if (currentScreen.textContent === '') {
            if (key === '0') {
                return
            } else {
                firstOperand += key;
                currentScreen.textContent = firstOperand;
            }
        } else {
            firstOperand += key;
            currentScreen.textContent = firstOperand;
        }
    } else {
        key = event.target.textContent;
        if (currentScreen.textContent === '') {
            if (key === '0') {
                return
            } else {
                secondOperand = key;
                currentScreen.textContent = secondOperand;
            }
        } else {
            secondOperand += key;
            currentScreen.textContent = secondOperand;
        }
    }       
}

function cleanCurrentScreen() {
    currentScreen.textContent = '';
}

function operate(operator, firstOperand , secondOperand) {
    let a = Number(firstOperand);
    let b = Number(secondOperand);
    switch (operator) {
        case '+':
            return a + b;
            break;
        case '-':
            return a - b;
            break;
        case 'x':
            return a * b;
            break;
        case '÷':
            if (b === 0) {
                return null;
            } else {
                return a / b;
            }
            break;
        case '%':
            if (b === 0) {
                return null;
            } else {
                return a % b;
            }
            break;
        case '^':
            return a ** b;
            break;
        default:
            return null;
    }
}