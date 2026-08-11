// Random Generator Utility 🐱🎲
// Improved 2026-08-11 - easy test changes
'use strict';

/**
 * Generates a random integer between min (inclusive) and max (inclusive).
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number} Random integer
 */
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Generates a random float between min (inclusive) and max (exclusive).
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number} Random float
 */
function randomFloat(min, max) {
  return Math.random() * (max - min) + min;
}

/**
 * Picks a random element from an array.
 * @param {Array} arr - Source array
 * @returns {*} Random element
 */
function randomChoice(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Shuffles an array in place using Fisher-Yates algorithm.
 * @param {Array} arr - Array to shuffle
 * @returns {Array} Shuffled array
 */
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Generates a random alphanumeric string of given length.
 * @param {number} length - Desired string length
 * @returns {string} Random string
 */
function randomString(length) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
}

/**
 * Generates a random UUID v4.
 * @returns {string} UUID string
 */
function randomUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

// --- Demo / Play ---
function runDemo() {
  console.log('🎲 Random Generator Demo - meow-meow-repo test 2026-08-11');
  console.log('Random Int (1–100):', randomInt(1, 100));
  console.log('Random Float (0–1):', randomFloat(0, 1).toFixed(4));
  console.log('Random Choice:', randomChoice(['apple', 'banana', 'cherry', 'date', 'elderberry', 'meow 🐱']));
  console.log('Shuffled:', shuffle([1, 2, 3, 4, 5]).join(', '));
  console.log('Random String (8):', randomString(8));
  console.log('Random UUID:', randomUUID());
  console.log('✅ All random utils working!');
}

if (require.main === module) {
  runDemo();
}

module.exports = { randomInt, randomFloat, randomChoice, shuffle, randomString, randomUUID, runDemo };
