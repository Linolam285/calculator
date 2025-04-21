let number1 = "";
let number2 = "";
let operator = "";
let currentNumber1 = "";
let currentNumber2 = "";
let not1 = false;
let not2 = true;
let op = false;
let displayingResult = false;


function add(a, b) {
    return a + b;
}

function substract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(operator, a, b) {
    switch (operator) {
        case "+":
            return add(a, b);
        case "-":
            return substract(a, b);
        case "*":
            return multiply(a, b);
        case "/":
            return divide(a, b);
    }

}

function clear() {
    display.textContent = "";
    currentNumber1 = "";
    currentNumber2 = "";
    operator = "";
    op = false;
    not1 = false;
    not2 = true;
}

let display = document.querySelector(".display");
let buttons = document.querySelectorAll("button");



buttons.forEach((button) => {
    button.addEventListener('click', () => {
        let char = button.textContent;
        if (button.id == 'equals') {
            if (!currentNumber2) {
                display.textContent = currentNumber1;
                displayingResult = true;
                return;
            }
        }
        if (button.id === 'clear') {
            clear();
            return;
        }
        if (!isNaN(parseInt(char))) {
            // if the input is a number and we used an operator (we want to fill number 2)
            if (!not2) {
                currentNumber2 += char;
                display.textContent = currentNumber2;
            } else {
                if (!not1) {
                    currentNumber1 += char;
                    display.textContent = currentNumber1;
                }
            }
        } else {
            // on utilise dans cette section un char qui n'est pas un chiffre
            if (displayingResult) {
                displayingResult = false;
            }
            if (button.id === 'dot') {
                if (!currentNumber1) {
                    return;
                }
                if ((currentNumber1 && currentNumber1.includes(".")) || (currentNumber2 && currentNumber2.includes("."))) {
                    return;
                }
                if (not1) {
                    currentNumber2 += ".";
                    display.textContent = currentNumber2;
                } else if (not2) {
                    currentNumber1 += ".";
                    display.textContent = currentNumber1;
                }
                return;
            }
            if (op) {
                // si un opérateur a déjà été utilise avant ne rien faire;

            } else if (not2) {
                not2 = false;
                not1 = true;
                
            } else {
                not1 = false;
                not2 = true;
             
            }
            if (currentNumber1 && currentNumber2) {
                if (operator === "/" && currentNumber2 == 0) {
                    clear();
                    display.textContent = "You cannot divide by 0";
                    return;
                }
                let result = operate(operator, parseFloat(currentNumber1), parseFloat(currentNumber2));
                display.textContent = result;
                currentNumber1 = result;
                currentNumber2 = "";
                op = !op;
                displayingResult = true;
                not1 = !not1;
                not2 = !not2;
                return; 
            }
            operator = char;
            op = true;
        }
        console.log("currentNumber1 = " + currentNumber1);
        console.log("operator = " + operator);
        console.log("currentNumber2 = " + currentNumber2 );
        console.log("displaying result = " + displayingResult);
        console.log("not 1 = "+ not1);
        console.log("not 2 = "+ not2 + '\n-------------------------------');
    });
});