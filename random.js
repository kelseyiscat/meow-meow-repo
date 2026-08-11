// random.js - Super simple random generator 🎲🐱
// Added 2026-08-11 - easy test change
'use strict';

/** Random integer between min and max (both inclusive). */
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/** Pick a random element from an array. */
function randomChoice(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

/** Random cat fact, because cats 🐱 */
function randomCatFact() {
  const facts = [
    'A group of cats is called a clowder. 🐱',
    'Cats sleep for about 70% of their lives. 😴',
    'Cats have 32 muscles in each ear. 👂',
    'Cats can rotate their ears 180 degrees! ✨',
  ];
  return randomChoice(facts);
}

// Demo when run directly
if (require.main === module) {
  console.log('🎲 random.js demo');
  console.log('Random int (1-10):', randomInt(1, 10));
  console.log('Random pick:', randomChoice(['meow', 'purr', 'hiss']));
  console.log('Cat fact:', randomCatFact());
  console.log('✅ Random generator works!');
}

module.exports = { randomInt, randomChoice, randomCatFact };
