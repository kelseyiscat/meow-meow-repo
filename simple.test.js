import test from 'node:test';
import assert from 'node:assert/strict';

function add(a, b) {
  return a + b;
}

// Verify that the add helper returns the expected sum.
test('adds two numbers 🧮', () => {
  assert.equal(add(2, 3), 5);
});
