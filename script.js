const display = document.querySelector('.display');
const buttons = document.querySelectorAll('button');

// États de la calculatrice
let displayValue = '0';          // Valeur affichée
let firstOperand = null;         // Premier opérande
let operator = null;             // Opérateur courant
let waitingForSecondOperand = false; // Flag pour indiquer l'entrée du deuxième opérande

// Fonctions de calcul
function add(a, b) { return a + b; }
function subtract(a, b) { return a - b; }
function multiply(a, b) { return a * b; }
function divide(a, b) { return a / b; }

function operate(op, a, b) {
  switch (op) {
    case '+': return add(a, b);
    case '-': return subtract(a, b);
    case '*': return multiply(a, b);
    case '/': return divide(a, b);
  }
}

// Gère l'affichage
function updateDisplay() {
  display.textContent = displayValue;
}
updateDisplay();

// Saisie d'un chiffre
function inputDigit(digit) {
  if (waitingForSecondOperand) {
    displayValue = digit;
    waitingForSecondOperand = false;
  } else {
    displayValue = displayValue === '0' ? digit : displayValue + digit;
  }
}

// Saisie du point décimal
function inputDecimal(dot) {
  if (waitingForSecondOperand) {
    displayValue = '0' + dot;
    waitingForSecondOperand = false;
    return;
  }
  if (!displayValue.includes(dot)) {
    displayValue += dot;
  }
}

// Gestion des opérateurs et calcul en chaîne
function handleOperator(nextOperator) {
  const inputValue = parseFloat(displayValue);

  if (operator && waitingForSecondOperand) {
    // Changer simplement l'opérateur si on appuie plusieurs fois
    operator = nextOperator;
    return;
  }

  if (firstOperand === null) {
    firstOperand = inputValue;
  } else if (operator) {
    const result = operate(operator, firstOperand, inputValue);
    // Limiter les imprécisions flottantes
    displayValue = String(parseFloat(result.toFixed(10)));
    firstOperand = result;
  }

  waitingForSecondOperand = true;
  operator = nextOperator;
}

// Réinitialisation totale
function resetCalculator() {
  displayValue = '0';
  firstOperand = null;
  operator = null;
  waitingForSecondOperand = false;
}

// Écoute des clicks
buttons.forEach(button => {
  button.addEventListener('click', () => {
    const { id, textContent: btn } = button;

    if (!isNaN(parseInt(btn))) {
      inputDigit(btn);
      updateDisplay();
      return;
    }

    if (id === 'dot') {
      inputDecimal(btn);
      updateDisplay();
      return;
    }

    if (id === 'clear') {
      resetCalculator();
      updateDisplay();
      return;
    }

    if (id === 'equals') {
      if (operator === null) return;
      handleOperator(operator);
      operator = null;
      updateDisplay();
      return;
    }

    // Si on arrive ici, c'est un opérateur + - * /
    handleOperator(btn);
    updateDisplay();
  });
});
