document.addEventListener('DOMContentLoaded', () => {
  const display = document.querySelector('.calc-display');
  let currentInput = '';
  let operator = null;
  let operand1 = null;
  let resetNext = false;

  function updateDisplay() {
    display.textContent = currentInput || '0';
  }

  function appendNumber(num) {
    if (resetNext) {
      currentInput = num;
      resetNext = false;
    } else {
      if (!(num === '.' && currentInput.includes('.'))) {
        currentInput += num;
      }
    }
    updateDisplay();
  }

  function chooseOperator(op) {
    if (currentInput === '') return;
    if (operand1 !== null && operator !== null && !resetNext) {
      calculate();
    } else {
      operand1 = parseFloat(currentInput);
    }
    operator = op;
    resetNext = true;
  }

  function calculate() {
    if (operator === null || resetNext) return;
    const operand2 = parseFloat(currentInput);
    let result;
    switch (operator) {
      case '+':
        result = operand1 + operand2;
        break;
      case '-':
        result = operand1 - operand2;
        break;
      case '*':
        result = operand1 * operand2;
        break;
      case '/':
        result = operand2 === 0 ? 'Error' : operand1 / operand2;
        break;
      default:
        return;
    }
    currentInput = result.toString();
    updateDisplay();
    operator = null;
    operand1 = result === 'Error' ? null : result;
    resetNext = true;
  }

  function clearAll() {
    currentInput = '';
    operator = null;
    operand1 = null;
    resetNext = false;
    updateDisplay();
  }

  // Event delegation for buttons
  document.querySelector('.calc-body').addEventListener('click', (e) => {
    if (e.target.tagName !== 'BUTTON') return;
    const btnValue = e.target.textContent;

    if (!isNaN(btnValue) || btnValue === '.') {
      appendNumber(btnValue);
    } else if (btnValue === 'C') {
      clearAll();
    } else if (btnValue === '=') {
      calculate();
    } else if (['+', '-', '*', '/'].includes(btnValue)) {
      chooseOperator(btnValue);
    }
  });

  updateDisplay();
});
