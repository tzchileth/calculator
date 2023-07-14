/** functions for calculator project */

// prompt user for x and y values
function getUserInput() {
    let x = parseFloat(prompt("Enter first number: "));

    // check if x is a number
    while (typeof (x) !== 'number' || isNaN(x)) {
        x = parseFloat(prompt("Enter a valid number: "));
    }

    let y = parseFloat(prompt("Enter second number: "));
    // check if y is a number
    while (typeof (y) !== 'number' || isNaN(y)) {
        y = parseFloat(prompt("Enter a valid number: "));
    }

    return {
        x,
        y,
    };
}

// add function
function add(leftOperand, rightOperand) {
    return leftOperand + rightOperand;
}

// subtract function
function subtract(leftOperand, rightOperand) {
    return leftOperand - rightOperand;
}

// multiply function
function multiply(leftOperand, rightOperand) {
    return leftOperand * rightOperand;
}

// divide function
function divide(leftOperand, rightOperand) {
    // check that rightOperand != 0
    if (rightOperand === 0) {
        rightOperand =
            parseFloat(prompt("Enter a denominator not equal to 0: "));
        while (typeof (rightOperand) !== 'number' ||
            isNaN(rightOperand) ||
            rightOperand === 0) {
            rightOperand =
                parseFloat(prompt("Enter a denominator not equal to 0: "));
        }
    }
    return Number((leftOperand / rightOperand).toFixed(12));
}

// operate function
function operate(leftOperand, operator, rightOperand) {
    switch (operator) {
        case "+":
            return add(leftOperand, rightOperand);
        case "-":
            return subtract(leftOperand, rightOperand);
        case "*":
            return multiply(leftOperand, rightOperand);
        case "/":
            return divide(leftOperand, rightOperand);
        default:
            alert("Invalid operation!");
            return;
    }
}