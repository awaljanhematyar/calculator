// Four-operation calculator. Parse arithmetic only; never execute input as JavaScript.
const input = document.getElementById("result");
const buttons = document.querySelectorAll(".buttons button");

function evaluateExpression(expression) {
  const text = expression.replace(/\s+/g, "");
  let position = 0;
  function number() {
    let sign = 1;
    while (text[position] === "+" || text[position] === "-") {
      if (text[position++] === "-") sign *= -1;
    }
    const match = text.slice(position).match(/^(?:\d+(?:\.\d*)?|\.\d+)/);
    if (!match) throw new Error("Invalid expression");
    position += match[0].length;
    return sign * Number(match[0]);
  }
  function product() {
    let value = number();
    while (text[position] === "*" || text[position] === "/") {
      const operator = text[position++];
      const right = number();
      if (operator === "/" && right === 0) throw new Error("Cannot divide by zero");
      value = operator === "*" ? value * right : value / right;
    }
    return value;
  }
  function sum() {
    let value = product();
    while (text[position] === "+" || text[position] === "-") {
      const operator = text[position++];
      const right = product();
      value = operator === "+" ? value + right : value - right;
    }
    return value;
  }
  const value = sum();
  if (position !== text.length || !Number.isFinite(value)) throw new Error("Invalid result");
  return Number(value.toPrecision(12));
}

function clearResult() { input.value = ""; }
function deletLast() { input.value = input.value === "Error" ? "" : input.value.slice(0, -1); }
function appendValue(value) {
  if (input.value === "Error") input.value = "";
  input.value += value;
}
function calculatResult() {
  if (!input.value.trim()) return;
  try { input.value = String(evaluateExpression(input.value)); }
  catch { input.value = "Error"; }
}
buttons.forEach((button) => button.addEventListener("click", () => {
  const value = button.textContent.trim();
  if (value === "c") clearResult();
  else if (value === "Del") deletLast();
  else if (value === "=") calculatResult();
  else appendValue(value);
}));
