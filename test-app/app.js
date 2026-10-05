// Super simple test page logic — plain JavaScript, no frameworks.

let count = 0;
const countEl = document.getElementById("count");

function updateCount() {
  countEl.textContent = count;
}

document.getElementById("plus").addEventListener("click", () => {
  count++;
  updateCount();
});

document.getElementById("minus").addEventListener("click", () => {
  count--;
  updateCount();
});

const greetings = ["Hello! 👋", "Hi there! 😊", "Hey! 🎉", "Testing works! ✅"];
document.getElementById("hello").addEventListener("click", () => {
  const msg = greetings[Math.floor(Math.random() * greetings.length)];
  document.getElementById("message").textContent = msg;
});
