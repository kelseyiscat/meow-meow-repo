// ============================================================
// playTest.js — Random Generator Utilities + Demo 🎲🐱
// ============================================================
// A tiny, dependency-free toolbox of random helpers.
// Use it for tests, demos, or just for fun. Run the demo with:
//
//   node playTest.js
//
// Each function below is standalone, so you can copy/paste
// whichever one you need into your own project.
// Improved 2026-08-11 - easy test changes
'use strict';

// ------------------------------------------------------------
// Integer & float helpers
// ------------------------------------------------------------

/**
 * Generates a random integer between min (inclusive) and max (inclusive).
 * Example: randomInt(1, 6) rolls a die, returning 1, 2, 3, 4, 5, or 6.
 * @param {number} min - Minimum value (included)
 * @param {number} max - Maximum value (included)
 * @returns {number} Random integer
 */
function randomInt(min, max) {
  // Math.random() gives 0..<1, so we multiply by the number of
  // possible values (max - min + 1) and shift by min.
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Generates a random float between min (inclusive) and max (exclusive).
 * Example: randomFloat(0, 1) gives a number like 0.4829.
 * @param {number} min - Minimum value (included)
 * @param {number} max - Maximum value (excluded)
 * @returns {number} Random float
 */
function randomFloat(min, max) {
  // No +1 here because floats are continuous, not discrete.
  return Math.random() * (max - min) + min;
}

// ------------------------------------------------------------
// Array helpers
// ------------------------------------------------------------

/**
 * Picks a random element from an array.
 * Example: randomChoice(['meow', 'purr', 'hiss']) -> 'purr'
 * @param {Array} arr - Source array
 * @returns {*} Random element
 */
function randomChoice(arr) {
  // Floor the random index so it lands within the array bounds.
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Shuffles an array in place using the Fisher-Yates algorithm.
 * Each permutation is equally likely — a fair shuffle! 🎲
 * @param {Array} arr - Array to shuffle
 * @returns {Array} Shuffled array (same reference, modified in place)
 */
function shuffle(arr) {
  // Walk backwards from the end; for each position i, swap it with
  // a random position j chosen from 0..i (inclusive).
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]]; // swap via destructuring
  }
  return arr;
}

// ------------------------------------------------------------
// String helpers
// ------------------------------------------------------------

/**
 * Generates a random alphanumeric string of given length.
 * Example: randomString(8) -> 'aK3xQp9z'
 * @param {number} length - Desired string length
 * @returns {string} Random string
 */
function randomString(length) {
  // The pool of characters we draw from (letters + digits).
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  // Append one random character at a time until we reach `length`.
  for (let i = 0; i < length; i++) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
}

/**
 * Generates a random UUID v4 (standard 36-character format).
 * Example: 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx' -> '3f2c9a1e-...'
 * @returns {string} UUID string
 */
function randomUUID() {
  // Replace every 'x' with a random hex digit and every 'y' with a
  // random hex digit that follows the v4 variant rules (8, 9, a, or b).
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

// ------------------------------------------------------------
// Demo / Play
// ------------------------------------------------------------

/**
 * Runs a small demo of every helper so you can see it in action.
 * Call it directly (node playTest.js) or import it.
 */
function runDemo() {
  console.log('🎲 Random Generator Demo - meow-meow-repo test 2026-08-11');
  console.log('Random Int (1–100):', randomInt(1, 100));
  console.log('Random Float (0–1):', randomFloat(0, 1).toFixed(4));
  console.log('Random Choice:', randomChoice(['apple', 'banana', 'cherry', 'date', 'elderberry', 'meow 🐱']));
  console.log('Shuffled:', shuffle([1, 2, 3, 4, 5]).join(', '));
  console.log('Random String (8):', randomString(8));
  console.log('Random UUID:', randomUUID());
  console.log('✅ All random utils working! 🐾✨');
}

// Only auto-run the demo when this file is executed directly
// (not when it is required/imported by another module).
if (require.main === module) {
  runDemo();
}

// Expose all helpers so other files can `require('./playTest')`.
module.exports = { randomInt, randomFloat, randomChoice, shuffle, randomString, randomUUID, runDemo };
