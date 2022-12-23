const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const equal = document.querySelector('.equal');
const clearAllButton = document.querySelector('.ac');
const signChangeButton = document.querySelector('.signChange');
const backSpaceButton = document.querySelector('.backspace');
const decimalButton = document.querySelector('.decimal');

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

clearAllButton.addEventListener('click', clearAllCalculation)

signChangeButton.addEventListener('click', () => {
    let currentOperand = currentScreen.textContent;
    if (currentOperand === '') return;
    currentScreen.textContent = (Number(currentOperand) < 0) ? Math.abs(Number(currentOperand)) : 0 - Number(currentOperand);
    if (operator === '') {
        firstOperand = currentScreen.textContent;
    } else {
        secondOperand = currentScreen.textContent;
    }
});

backSpaceButton.addEventListener('click', () => {
    let currentOperand = currentScreen.textContent.split('');
    currentOperand.pop();
    currentScreen.textContent = currentOperand.join('');
    if (operator === '') {
        firstOperand = currentScreen.textContent;
    } else {
        secondOperand = currentScreen.textContent;
    }
    if (calculationScreen.textContent.includes('=') && firstOperand === '') {
        clearAllCalculation();
    }

});

decimalButton.addEventListener('click', () => {
    let newOperand = currentScreen.textContent.split('');
    if (currentScreen.textContent === ''){
        newOperand.push('0.');
    } else {
        newOperand.push('.');
    }
    if(currentScreen.textContent.includes('.')) return;
    
    currentScreen.textContent = newOperand.join('');
    if (operator === '') {
        firstOperand = currentScreen.textContent;
    } else {
        secondOperand = currentScreen.textContent;
    }
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
        if (currentScreen.textContent === '0') {
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
        if (currentScreen.textContent === '0') {
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

function clearAllCalculation() {
    calculationScreen.textContent = '';
    currentScreen.textContent = '0';
    firstOperand = '';
    secondOperand = '';
    operatorPressed = false;
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