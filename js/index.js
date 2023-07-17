/** functions for calculator project */

// add function
function add(leftOperand, rightOperand) {
    let result = Number(leftOperand) + Number(rightOperand);
    return Number(result.toFixed(15));
}

// subtract function
function subtract(leftOperand, rightOperand) {
    let result = Number(leftOperand) - Number(rightOperand);
    return Number(result.toFixed(15));
}

// multiply function
function multiply(leftOperand, rightOperand) {
    let result = Number(leftOperand) * Number(rightOperand);
    return Number(result.toFixed(15));
}

// divide function
function divide(leftOperand, rightOperand) {
    if (Number(rightOperand) !== 0) {
        return Number((leftOperand / rightOperand).toFixed(15))
    }
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
    if (!isNaN(btn.textContent) || btn.textContent === "-" || btn.textContent === ".") {
        btn.addEventListener("click", () => {
            // get leftOperand
            if (calcObject["leftOperand"] === false || calcObject["operator"] === false) {
                // check that contents does not have a decimal point already
                if (!contents.includes("-") && btn.textContent === "-" && contents === "") {
                    contents += btn.textContent;
                    display.value = contents;
                    console.log(contents);
                }
                else if (!isNaN(contents) && btn.textContent !== "-" && !contents.includes(".")) {
                    contents += btn.textContent;
                    display.value = contents;
                    console.log(contents);

                }
                else if (btn.textContent !== "-" && btn.textContent !== ".") {
                    contents += btn.textContent;
                    display.value = contents;
                    console.log(contents);
                }
                calcObject["leftOperand"] = contents;
                console.log("Yayy");
            }

            // get rightOperand
            if (calcObject["rightOperand"] === true || typeof (calcObject["operator"]) !== "boolean") {
                console.log("Yippee");
                // check that contents does not have a decimal point already
                if (!contents.split(" ").at(-1).includes("-") && btn.textContent === "-" && contents.split(" ").at(-1) === "") {
                    contents += btn.textContent;
                    display.value = contents;
                    console.log(contents);
                }
                else if (!isNaN(contents.split(" ").at(-1)) && btn.textContent !== "-" && !contents.split(" ").at(-1).includes(".")) {
                    contents += btn.textContent;
                    display.value = contents;
                    console.log(contents);

                }
                else if (btn.textContent !== "-" && btn.textContent !== ".") {
                    contents += btn.textContent;
                    display.value = contents;
                    console.log(contents);
                }
                calcObject["rightOperand"] = contents.split(" ").at(-1);
                if (!isNaN(calcObject["rightOperand"])) {
                    if (calcObject["operator"] === "/" && calcObject["rightOperand"] === "0") {
                        //pass: force result to be leftOperand value
                        calcObject["result"] = Number(calcObject["leftOperand"]);
                    } else {
                        let result = operate(calcObject["leftOperand"], calcObject["operator"], calcObject["rightOperand"]);
                        calcObject["result"] = result;
                    }
                }
            }
        });
    }

    if (isNaN(btn.textContent)) {
        // operator buttons
        btn.addEventListener("click", () => {
            /** operations " * - + / "  */
            performArithmeticOperation(btn);
            display.value = contents;
            displayResult(btn);
        });
    }

    // clear screen
    if (btn.textContent === "Clear") {
        btn.addEventListener("click", () => {
            clearOutput(btn);
            display.value = contents;
        })
    }
});

function performArithmeticOperation(btn) {
    if (btn.textContent == "x" ||
        btn.textContent == "+" ||
        btn.textContent == "/" ||
        btn.textContent == "-"
    ) {
        if (calcObject["leftOperand"].length > 0 && typeof (calcObject["operator"]) !== "string" && contents !== "." && contents !== "-") {
            console.log(calcObject["leftOperand"]);
            if (!calcObject["rightOperand"] &&
                !calcObject["operator"]) {
                contents = `${calcObject["leftOperand"]}`;
                contents += ` ${btn.textContent} `;
                calcObject["operator"] = btn.textContent;
                calcObject["rightOperand"] = true
            }
            else if (typeof (calcObject["rightOperand"]) !== "boolean") {
                calcObject["leftOperand"] = calcObject["result"];
                contents = calcObject["result"];
                contents += ` ${btn.textContent} `;
                calcObject["operator"] = btn.textContent;
                calcObject["result"] = false;
            }
        } else if (typeof (calcObject["operator"]) === "string" && typeof (calcObject["result"]) === "number") {
            calcObject["leftOperand"] = calcObject["result"];
            contents = calcObject["result"];
            contents += ` ${btn.textContent} `;
            calcObject["operator"] = btn.textContent;
            calcObject["result"] = false
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
    if (btn.textContent === "=" && typeof (calcObject["result"] === "number")) {
        calcObject["leftOperand"] = false;
        calcObject["rightOperand"] = false;
        calcObject["operator"] = false;
        if (typeof (calcObject["result"]) === "undefined") {
            display.value = "Invalid operation: division by zero";
            contents = "";
        } else {
            display.value = calcObject["result"];
            calcObject["result"] = false;
            contents = "";
        }
    }
}