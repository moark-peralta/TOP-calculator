const numberButtons = document.querySelectorAll("[data-number]");
const operatorButtons = document.querySelectorAll("[data-operator]");
const equalsButton = document.querySelector("[data-equals]");
const previousOperandTextElement = document.querySelector("[data-previous]");
const currentOperandTextElement = document.querySelector("[data-current]");
const deleteLastBtn = document.querySelector("[data-delete-last]");
const clearAllBtn = document.querySelector("[data-delete-all]");
const clearCurrentBtn = document.querySelector("[data-delete-current]");

let currentOperand = "";
let previousOperand = "";
let operation = undefined;

function clear() {
  currentOperand = "";
  previousOperand = "";
  operation = undefined;
  updateDisplay();
}

function deleteLast() {
  currentOperand = currentOperand.slice(0, -1);
  updateDisplay();
}

function deleteCurrent() {
  currentOperand = "";
  updateDisplay();
}

function appendNumber(number) {
  if (number === "." && currentOperand.includes(".")) return;
  currentOperand += number.toString();
  updateDisplay();
}

function chooseOperation(op) {
  if (
    op === "%" ||
    op === "1/x" ||
    op === "sqrt" ||
    op === "+/-" ||
    op === "x^2"
  ) {
    handleSpecialOperation(op);
    return;
  }
  if (currentOperand === "") return;
  if (previousOperand !== "") {
    compute();
  }
  operation = op;
  previousOperand = currentOperand;
  currentOperand = "";
  updateDisplay();
}

function compute() {
  let computation;
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);
  if (isNaN(prev) || isNaN(current)) return;
  switch (operation) {
    case "+":
      computation = prev + current;
      break;
    case "-":
      computation = prev - current;
      break;
    case "*":
      computation = prev * current;
      break;
    case "÷":
      computation = prev / current;
      break;
    default:
      return;
  }
  currentOperand = computation.toString();
  operation = undefined;
  previousOperand = "";
  updateDisplay();
}

function handleSpecialOperation(op) {
  let computation;
  const current = parseFloat(currentOperand);
  if (isNaN(current)) return;
  switch (op) {
    case "%":
      computation = current / 100;
      break;
    case "1/x":
      if (current === 0) {
        alert("Cannot divide by zero");
        return;
      }
      computation = 1 / current;
      break;
    case "sqrt":
      if (current < 0) {
        alert("Invalid input for square root");
        return;
      }
      computation = Math.sqrt(current);
      break;
    case "+/-":
      computation = -current;
      break;
    case "x^2":
      computation = current * current;
      break;
    default:
      return;
  }
  currentOperand = computation.toString();
  updateDisplay();
}

function getDisplayNumber(number) {
  const stringNumber = number.toString();
  const integerDigits = parseFloat(stringNumber.split(".")[0]);
  const decimalDigits = stringNumber.split(".")[1];
  let integerDisplay;
  if (isNaN(integerDigits)) {
    integerDisplay = "";
  } else {
    integerDisplay = integerDigits.toLocaleString("en", {
      maximumFractionDigits: 0,
    });
  }
  if (decimalDigits != null) {
    return `${integerDisplay}.${decimalDigits}`;
  } else {
    return integerDisplay;
  }
}

function updateDisplay() {
  currentOperandTextElement.innerText = getDisplayNumber(currentOperand);
  if (operation != null) {
    previousOperandTextElement.innerText = `${getDisplayNumber(
      previousOperand
    )} ${operation}`;
  } else {
    previousOperandTextElement.innerText = "";
  }
}

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    appendNumber(button.innerText);
  });
});

operatorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    chooseOperation(button.getAttribute("data-operator"));
  });
});

equalsButton.addEventListener("click", () => {
  compute();
});

clearAllBtn.addEventListener("click", () => {
  clear();
});

deleteLastBtn.addEventListener("click", () => {
  deleteLast();
});

clearCurrentBtn.addEventListener("click", () => {
  deleteCurrent();
});
