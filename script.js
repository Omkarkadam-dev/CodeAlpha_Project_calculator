// Selecting elements
const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

// Variables to hold calculator state
let currentInput = '';
let previousInput = '';
let operator = '';

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        // Add glowing effect on button press
        button.classList.add('glow');
        setTimeout(() => button.classList.remove('glow'), 300);

        if (!isNaN(value)) {
            // Handle number input
            currentInput += value;
            updateDisplay(currentInput);
        } else if (value === 'C') {
            // Clear inputs
            clearCalculator();
        } else if (value === '=') {
            // Perform calculation
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

// Update the display
function updateDisplay(value) {
    display.textContent = value;
    // Add a futuristic animation
    display.style.transition = 'transform 0.2s ease-out';
    display.style.transform = 'scale(1.1)';
    setTimeout(() => {
        display.style.transform = 'scale(1)';
    }, 200);
}

// Perform the calculation
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

// Clear calculator state
function clearCalculator() {
    currentInput = '';
    previousInput = '';
    operator = '';
    updateDisplay('0');
}
