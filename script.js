let operand1 = null;
let operand2 = null;
let operator = "";
let operandDone = true;

const displayEl = document.querySelector("#display");
const acBtnEl = document.querySelector(".ac");
const delBtnEl = document.querySelector(".del");
const equalsBtnEl = document.querySelector(".equals");
const operatorBtnEls = document.querySelectorAll(".operator");
const displayedBtnEls = document.querySelectorAll(
  ".btn:not(.ac):not(.equals):not(.del):not(.operator)"
);

const operations = {
  "+": (n1, n2) => n1 + n2,
  "−": (n1, n2) => n1 - n2,
  "×": (n1, n2) => n1 * n2,
  "÷": (n1, n2) => n1 / n2,
};

function operate(operator, n1, n2) {
  if (n2 === 0 && operator === "÷") return "Math ERROR";
  return operations[operator](n1, n2);
}

function updateDisplay(msg) {
  displayEl.textContent = msg || "0";
}

function clear() {
  operand1 = null;
  operand2 = null;
  operator = "";
  operandDone = true;
  updateDisplay("0");
}

function displayDigit(e) {
  const char = e.target.innerText;
  const displayText = displayEl.textContent;
  const hasError = displayText.includes("ERROR");
  if (char === "." && displayText.includes(".")) return;

  if (hasError || operandDone) {
    updateDisplay(char);
  } else {
    displayEl.textContent += char;
  }

  operandDone = false;
}

function handleOperator(e) {
  const op = e.target.textContent;
  const displayNum = +displayEl.textContent;

  operandDone = true;
  /**
   * If operator is defined treat it as chained operation
   * operand1 will be the result of the prev value of operand1, prev operator and current operand in display
   * Otherwise operand1 will just be the value on display
   */
  if (operator) {
    operand1 = operate(operator, operand1, displayNum);
    updateDisplay(operand1);
  } else {
    operand1 = displayNum;
  }
  operator = op;
}

function handleDel() {
  const displayText = displayEl.textContent;
  if (isNaN(+displayText)) return;
  updateDisplay(displayText.slice(0, -1));
}

function calculate() {
  operand2 = +displayEl.textContent;
  if (!operator || isNaN(+operand1)) return updateDisplay("Syntax ERROR");

  const result = operate(operator, operand1, operand2);
  clear();

  // If result is valid number, format number otherwise show the error message.
  if (!isNaN(+result)) {
    updateDisplay(
      parseFloat(result)
        .toFixed(5)
        .replace(/\.?0+$/, "")
    );
  } else {
    updateDisplay(result);
  }
}

acBtnEl.addEventListener("click", clear);
delBtnEl.addEventListener("click", handleDel);
equalsBtnEl.addEventListener("click", calculate);

operatorBtnEls.forEach((btn) => {
  btn.addEventListener("click", handleOperator);
});
displayedBtnEls.forEach((btn) => {
  btn.addEventListener("click", displayDigit);
});
