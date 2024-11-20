class Calculator {
    // create calculator constructor
    constructor(prevOperandText, currOperandText) {
        this.prevOperandText = prevOperandText;
        this.currOperandText = currOperandText;
        // initialise values of calculator when created
        this.clear();
    }

    clear() {
        this.prevOperand = '';
        this.currOperand = '';
        this.operation = undefined;
    }

    delete() {
        this.currOperand = this.currOperand.toString().slice(0,-1);
    }

    invert() {
        if (this.currOperand === '') return;
        let number = parseFloat(this.currOperand);
        this.currOperand = -number;
    }

    appendNumber(number) {
        // check if number already contains a decimal - prevent multiple dots in number
        if (number === '.' && this.currOperand.includes('.')) return;
        // concatenating numbers (treat like strings)
        this.currOperand = this.currOperand.toString() + number.toString();
    }

    chooseOperation(operation) {
        if (this.currOperand === '') return;
        if (this.currOperand) {
            this.compute();
        }
        this.operation = operation;
        this.prevOperand = this.currOperand;
        this.currOperand = '';
    }

    compute() {
        let result;
        const num1 = parseFloat(this.prevOperand);
        const num2 = parseFloat(this.currOperand);
        if (isNaN(num1) || isNaN(num2)) return // early return if an invalid / missing number
        console.log(this.operation)
        switch (this.operation){
            case '+':
                result = num1 + num2;
                break;
            case '-':
                result = num1 - num2;
                break;
            case '*':
                result = num1 * num2;
                break;
            case '/':
                result = num1 / num2;
                break;
            default: return;
        }
        this.currOperand = result;
        this.operation = undefined;
        this.prevOperand = '';
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay;
        // User only inputs a '.' initially
        if (isNaN(integerDigits)) {
            integerDisplay = '';
        }
        else {
            integerDisplay = integerDigits.toLocaleString('en', {maximumFractionDigits: 0});
        }
        console.log(stringNumber.split('.')[1]);
        if (decimalDigits != null) {
            if (integerDisplay === '') {
                return `0.${decimalDigits}`;
            }
            return `${integerDisplay}.${decimalDigits}`;
        }
        return `${integerDisplay}`;
    }

    updateDisplay() {
        this.currOperandText.innerText = this.getDisplayNumber(this.currOperand);
        if (this.operation != null) {
            this.prevOperandText.innerText = `${this.prevOperand} ${this.operation}`;
        }
        else {
            this.prevOperandText.innerText =  '';
        }
    }
}

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equal]');
const clearButton = document.querySelector('[data-clear]');
const deleteButton = document.querySelector('[data-delete]');
const invertButton = document.querySelector('[data-invert]');

const prevOperandText = document.querySelector('[data-prev-operand]');
const currOperandText = document.querySelector('[data-curr-operand]');

const calculator = new Calculator(prevOperandText, currOperandText);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    });
});

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    });
});

equalsButton.addEventListener('click', () => {
    calculator.compute();
    calculator.updateDisplay();
});

clearButton.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
});

deleteButton.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
});

invertButton.addEventListener('click', () => {
    calculator.invert();
    calculator.updateDisplay();
});