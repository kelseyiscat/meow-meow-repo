// example.test.js — a minimal example test.
// Run with: npm test  (or: node --test src/example.test.js)

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

function add(a, b) {
  return a + b;
}

describe('example', () => {
  it('adds two numbers', () => {
    assert.equal(add(2, 2), 4);
  });

  it('compares objects deeply', () => {
    assert.deepEqual({ cat: 'meow' }, { cat: 'meow' });
  });

  it('throws when expected', () => {
    assert.throws(() => {
      throw new TypeError('nope');
    }, TypeError);
  });
});
