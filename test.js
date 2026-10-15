// Welcome to the meow-meow-repo test file! 🐱
// A tiny scratch script for quick smoke checks, PR tests, and webhook pokes.
//
// Run it with:
//   node test.js

// Test 1: basic console output works at all.
console.log("🌅 Good morning! 🌞✨🌻☕");

// A tiny helper that prints a cat-themed greeting.
function catTest() {
  console.log("🐱 Meow! 🐾 😺 😸 😹 😻 😽 🐈 ✨");
  return true;
}

// Party-mode output, for when the build is green.
function partyTest() {
  console.log("🎉 Party time! 🥳 🎊 🎈");
  return true;
}

// The contented-background-noise test.
function purrTest() {
  console.log("😽 purr... purr... purr... 💤");
  return true;
}

// Mandatory 3pm sunbeam check.
function napTest() {
  console.log("😴 Nap detected in the sunbeam. 🌞🛏️");
  return true;
}

// 2am hallway sprint check.
function zoomiesTest() {
  console.log("💨 ZOOMIES! 🐈‍⬛💨 (do not question it)");
  return true;
}

// Run every helper in sequence and make sure each one reports success.
const checks = [
  ["catTest", catTest],
  ["partyTest", partyTest],
  ["purrTest", purrTest],
  ["napTest", napTest],
  ["zoomiesTest", zoomiesTest],
];

let passed = 0;
for (const [name, fn] of checks) {
  if (fn() === true) {
    passed += 1;
  } else {
    console.error(`❌ ${name} did not return true`);
  }
}

// Final check-in message.
console.log(`\n✅ ${passed}/${checks.length} checks passed. how are you 🐱`);

// Non-zero exit if anything went sideways, so CI could actually catch it.
if (passed !== checks.length) {
  process.exitCode = 1;
}
