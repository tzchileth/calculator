/** functions for calculator project */

// // prompt user for x and y values
// function getUserInput() {
//     let x = parseFloat(prompt("Enter first number: "));

//     // check if x is a number
//     while (typeof (x) !== 'number' || isNaN(x)) {
//         x = parseFloat(prompt("Enter a valid number: "));
//     }

//     let y = parseFloat(prompt("Enter second number: "));
//     // check if y is a number
//     while (typeof (y) !== 'number' || isNaN(y)) {
//         y = parseFloat(prompt("Enter a valid number: "));
//     }

//     return {
//         x,
//         y,
//     };
// }

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
    return Number((leftOperand / rightOperand).toFixed(15));
}

// operate function
function operate(leftOperand, operator, rightOperand) {
    let result = "";
    switch (operator) {
        case "+":
            result = add(leftOperand, rightOperand);
            break;
        case "-":
            result = subtract(leftOperand, rightOperand);
            break;
        case "x":
            result = multiply(leftOperand, rightOperand);
            break;
        case "/":
            result = divide(leftOperand, rightOperand);
            break;
        default:
            return "Invalid operation!";
    }
    return result;
}

// get all the buttons
const buttons = Array.from(document.querySelectorAll("button"));
const display = document.querySelector(".displayValue");
let contents = "";
let calcObject = {
    leftOperand: false,
    rightOperand: false,
    result: false,
    operator: false,
}

buttons.forEach((btn) => {
    // get numeric buttons
    if (!isNaN(btn.textContent)) {
        btn.addEventListener("click", () => {
            if (calcObject["operator"] && typeof (calcObject["leftOperand"]) === "number") {
                contents += Number(btn.textContent);
                calcObject["rightOperand"] = Number(contents.split(" ").at(-1));
                let tempArray = contents.split(" ");
                tempArray[2] = Number(contents.split(" ")[2]);
                contents = tempArray.join(" ");
                // check for division by zero
                if (calcObject["operator"] === "/" && calcObject["rightOperand"] === 0) {
                    calcObject["rightOperand"] = true;
                } else {
                    calcObject["result"] = operate(calcObject["leftOperand"],
                        calcObject["operator"],
                        calcObject["rightOperand"]);
                    display.value = contents;
                }
            } else {

                contents += Number(btn.textContent);//`${btn.textContent}`;
                display.value = Number(contents);
            }
        });
    }
    if (isNaN(btn.textContent)) {
        // operator buttons
        btn.addEventListener("click", () => {
            if (calcObject["leftOperand"] === false) {
                calcObject["leftOperand"] = Number(contents);
            }

            processMe(btn);

            if (btn.textContent === "Clear") {
                contents = "";
                calcObject["result"] = false;
                calcObject["leftOperand"] = false;
                calcObject["rightOperand"] = false;
                calcObject["operator"] = false;
            }

            display.value = contents;

            if (btn.textContent === "=") {
                let lastNumber = Number(contents.split(" ").at(-1))
                if (lastNumber !== btn.textContent &&
                    typeof (calcObject["rightOperand"]) == "number" &&
                    calcObject["result"] !== "" &&
                    calcObject["result"] !== false) {
                    display.value = calcObject["result"];
                    contents = display.value;
                }
            }
        });
    }
});

function processMe(btn) {
    if (btn.textContent == "x" ||
        btn.textContent == "+" ||
        btn.textContent == "-" ||
        btn.textContent == "/") {
        if (typeof (calcObject["leftOperand"]) === "number") {
            if (!calcObject["rightOperand"] && !calcObject["operator"]) {
                contents = Number(contents);
                contents += ` ${btn.textContent} `;
                calcObject["operator"] = btn.textContent;
                calcObject["rightOperand"] = true;
            } else if (typeof (calcObject["rightOperand"]) === "number") {
                calcObject["leftOperand"] = calcObject["result"];
                contents += ` ${btn.textContent} `;
                calcObject["operator"] = btn.textContent;
                calcObject["rightOperand"] = true;
                calcObject["result"] = "";
            }
        }
    }
}