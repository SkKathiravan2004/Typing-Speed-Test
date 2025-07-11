const quotes = [
  "Practice makes perfect. Keep typing.",
  "JavaScript is the language of the web.",
  "Coding improves logical thinking.",
  "You are doing great, keep going!",
  "Consistency beats motivation."
];

let currentQuote = "";
let timer = 0;
let timerInterval;
let errors = 0;

const quoteDisplay = document.getElementById("quote");
const inputField = document.getElementById("input");
const timerDisplay = document.getElementById("timer");
const wpmDisplay = document.getElementById("wpm");
const errorDisplay = document.getElementById("errors");

function startTest() {
  clearInterval(timerInterval);
  inputField.disabled = false;
  inputField.value = "";
  inputField.focus();

  timer = 0;
  errors = 0;
  timerDisplay.textContent = 0;
  wpmDisplay.textContent = 0;
  errorDisplay.textContent = 0;

  currentQuote = quotes[Math.floor(Math.random() * quotes.length)];
  quoteDisplay.textContent = currentQuote;

  // Start timer when first key is pressed
  inputField.addEventListener("keydown", startTimerOnce, { once: true });
}

function startTimerOnce() {
  timerInterval = setInterval(() => {
    timer++;
    timerDisplay.textContent = timer;
    calculateWPM();
  }, 1000);
}

inputField.addEventListener("input", () => {
  const enteredText = inputField.value;
  let correctChars = 0;
  errors = 0;

  for (let i = 0; i < enteredText.length; i++) {
    if (enteredText[i] === currentQuote[i]) {
      correctChars++;
    } else {
      errors++;
    }
  }

  errorDisplay.textContent = errors;
  calculateWPM();

  if (enteredText === currentQuote) {
    clearInterval(timerInterval);
    inputField.disabled = true;
  }
});

function calculateWPM() {
  const words = inputField.value.trim().split(/\s+/).length;
  const minutes = timer / 60;
  const wpm = Math.round(words / minutes) || 0;
  wpmDisplay.textContent = wpm;
}

// Disable input initially
inputField.disabled = true;
