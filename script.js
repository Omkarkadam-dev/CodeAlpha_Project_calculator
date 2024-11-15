// To selecting the elements
const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

// Variables to hold calculator state
let currentInput = '';
let previousInput = '';
let operator = '';

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        // To add glowing effect on button press
        button.classList.add('glow');
        setTimeout(() => button.classList.remove('glow'), 300);

        if (!isNaN(value)) {
            // To handle number input
            currentInput += value;
            updateDisplay(currentInput);
        } else if (value === 'C') {
            // For clear inputs
            clearCalculator();
        } else if (value === '=') {
            // TO perform calculation
            if (currentInput && previousInput && operator) {
                const result = calculate(previousInput, operator, currentInput);
                updateDisplay(result);
                currentInput = result;
                previousInput = '';
                operator = '';
            }
        } else {
            // Handle operator input
            if (currentInput) {
                previousInput = currentInput;
                currentInput = '';
                operator = value;
                updateDisplay(value);
            }
        }
    });
});

// For update the display
function updateDisplay(value) {
    display.textContent = value;
    // Add a futuristic animation
    display.style.transition = 'transform 0.2s ease-out';
    display.style.transform = 'scale(1.1)';
    setTimeout(() => {
        display.style.transform = 'scale(1)';
    }, 200);
}

// To perform the calculation
function calculate(num1, operator, num2) {
    const a = parseFloat(num1);
    const b = parseFloat(num2);

    switch (operator) {
        case '+':
            return a + b;
        case '-':
            return a - b;
        case '*':
            return a * b;
        case '/':
            return b !== 0 ? (a / b).toFixed(2) : 'Error';
        default:
            return 'Error';
    }
}

// To clear calculator state
function clearCalculator() {
    currentInput = '';
    previousInput = '';
    operator = '';
    updateDisplay('0');
}
