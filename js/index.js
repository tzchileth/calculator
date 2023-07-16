/** functions for calculator project */

// add function
function add(leftOperand, rightOperand) {
    return Number((leftOperand + rightOperand).toFixed(15));
}

// subtract function
function subtract(leftOperand, rightOperand) {
    return Number((leftOperand - rightOperand).toFixed(15));

}

// multiply function
function multiply(leftOperand, rightOperand) {
    return Number((leftOperand * rightOperand).toFixed(15));
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
            if (calcObject["operator"] &&
                typeof (calcObject["leftOperand"]) === "number") {
                contents += btn.textContent;
                calcObject["rightOperand"] = Number(contents.split(" ").at(-1));
                let tempArray = contents.split(" ");
                tempArray[2] = contents.split(" ")[2];

                if (Number(tempArray[2]) === 0 && tempArray[2].length >= 0 && !tempArray[2].includes(".")) {
                    tempArray[2] = "0";
                    contents = tempArray.join(" ");
                    display.value = contents;
                } else if (Number(tempArray[2]) !== 0 || tempArray[2].includes(".")) {
                    contents = tempArray.join(" ");
                    display.value = contents;
                }

                // check for division by zero
                if (calcObject["operator"] === "/" &&
                    calcObject["rightOperand"] === 0) {
                    calcObject["rightOperand"] = true;
                } else {
                    calcObject["result"] = operate(calcObject["leftOperand"],
                        calcObject["operator"],
                        calcObject["rightOperand"]);
                    display.value = contents;
                }
            } else {
                contents += btn.textContent;
                if (Number(contents) === 0 && contents.length >= 0 &&
                    !contents.includes(".")) {
                    contents = "0";
                    display.value = "0";
                } else if (Number(contents) !== 0 || contents.includes(".")) {
                    display.value = contents;
                }
            }
        });
    }
    if (isNaN(btn.textContent)) {
        // operator buttons
        btn.addEventListener("click", () => {
            /** operations " * - + / "  */
            performArithmeticOperation(btn);
            clearOutput(btn);
            display.value = contents;
            displayResult(btn);
        });
    }
});

function performArithmeticOperation(btn) {
    if ((calcObject["leftOperand"] === false ||
        contents.split(" ").at(-1).includes(".")) &&
        !calcObject["operator"] && contents !== "") {
        if (!isNaN(Number(contents))) {
            calcObject["leftOperand"] = Number(contents);
        }
    }

    if (btn.textContent == "x" ||
        btn.textContent == "+" ||
        btn.textContent == "-" ||
        btn.textContent == "/"
    ) {
        if (typeof (calcObject["leftOperand"]) === "number") {
            if (!calcObject["rightOperand"] &&
                !calcObject["operator"]) {
                contents = Number(contents);
                contents += ` ${btn.textContent} `;
                calcObject["operator"] = btn.textContent;
                calcObject["rightOperand"] = true;
            }
            else if (typeof (calcObject["rightOperand"]) === "number") {
                calcObject["leftOperand"] = calcObject["result"];
                contents = calcObject["result"];
                contents += ` ${btn.textContent} `;
                calcObject["operator"] = btn.textContent;
                calcObject["rightOperand"] = true;
                calcObject["result"] = false;
            }
        }
    }
    else if (btn.textContent == "."
        && (calcObject["rightOperand"] ||
            typeof (calcObject["leftOperand"]) === "number")) {

        if (contents.split(" ").at(-1) !== "." &&
            typeof (Number(contents.split(" ").at(-1))) === "number" &&
            !contents.split(" ").at(-1).includes(".")) {
            contents += `${btn.textContent}`;
        }
    }
    else if (btn.textContent == "." && typeof (calcObject["leftOperand"]) === "boolean") {
        if (contents.split(" ").at(-1) !== "." &&
            typeof (Number(contents.split(" ").at(-1))) === "number" &&
            !contents.split(" ").at(-1).includes(".")) {
            contents += `${btn.textContent}`;
        }
    }
}

function clearOutput(btn) {
    if (btn.textContent === "Clear") {
        contents = "";
        calcObject["result"] = false;
        calcObject["leftOperand"] = false;
        calcObject["rightOperand"] = false;
        calcObject["operator"] = false;
    }
}

function displayResult(btn) {
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
}