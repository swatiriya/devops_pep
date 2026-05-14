const quotes = [
  "Success is not final, failure is not fatal.",
  "Dream big and dare to fail.",
  "Code is like humor. When you have to explain it, it’s bad.",
  "Stay hungry, stay foolish.",
  "First, solve the problem. Then, write the code."
];

function generateQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);

  document.getElementById("quote").innerText =
    quotes[randomIndex];
}