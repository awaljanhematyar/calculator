// Select all buttons inside .buttons
const btn = document.querySelectorAll(".buttons button");

// Select the input/screen where numbers show
const input = document.getElementById("result");

// Select the DEL button specifically
const delbtn = document.querySelector(".del");

// Loop through every button
for (let i = 0; i < btn.length; i++) {
  // Listen for click on each button
  btn[i].addEventListener("click", (e) => {
    // Get the text of the clicked button (e.g "5", "+", "=")
    const buttonValue = btn[i].textContent;

    if (buttonValue === "c") {
      clearResult(); // Clear the screen
    } else if (buttonValue === "Del") {
      deletLast(); // Remove last character
    } else if (buttonValue === "=") {
      calculatResult(); // Calculate the result
    } else {
      appendValue(buttonValue); // Add button value to screen
    }
  });
}

// Clear the screen
function clearResult() {
  input.value = "";
}

// Calculate and show result
function calculatResult() {
  input.value = eval(input.value);
}

// Delete last character
function deletLast() {
  input.value = input.value.slice(0, -1);
}

// Add value to the screen
function appendValue(buttonValue) {
  input.value += buttonValue;
}
