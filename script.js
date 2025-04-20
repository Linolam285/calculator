let number1 = "";
let number2 = "";
let operator = "";
let currentNumber = "";

function add(a,b) {
    return a+b;
}

function substract(a,b) {
    return a-b;
}

function multiply(a,b) {
    return a*b;
}

function divide(a,b) {
    return a/b;
}

function operate(operator,a,b) {
    switch(operator){
        case "+":
            return add(a,b);
        case "-":
            return substract(a,b);
        case "*":
            return multiply(a,b);
        case "/":
            return divide(a,b);
    }
    
}

let display = document.querySelector(".display");
let buttons = document.querySelectorAll("button");

buttons.forEach((button) => {
    button.addEventListener('click', () => {
        let char = button.textContent;
        
        if (!isNaN(parseInt(char))) {
            currentNumber += char;
            display.textContent = currentNumber;
            console.log("parseint = " + parseInt(char));
        } else {
            console.log("test wlh");
            currentNumber = "";
            display.textContent = char;
        }
        console.log(currentNumber)
    });
});

