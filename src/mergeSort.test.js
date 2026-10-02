// mergeSort.test.js — tests for src/mergeSort.js
// Run with: npm test  (or: node --test src/)

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import { bubbleSort, mergeSort, quickSort } from './mergeSort.js';

describe('mergeSort', () => {
  it('sorts an unsorted array of numbers in ascending order', () => {
    assert.deepEqual(mergeSort([38, 27, 43, 3, 9, 82, 10]), [3, 9, 10, 27, 38, 43, 82]);
  });

  it('returns a new array and does not mutate the input', () => {
    const input = [5, 3, 1];
    const sorted = mergeSort(input);
    assert.deepEqual(input, [5, 3, 1]);
    assert.notEqual(sorted, input);
  });

  it('handles empty and single-element arrays', () => {
    assert.deepEqual(mergeSort([]), []);
    assert.deepEqual(mergeSort([42]), [42]);
  });

  it('handles duplicates and already-sorted input', () => {
    assert.deepEqual(mergeSort([2, 1, 2, 1, 2]), [1, 1, 2, 2, 2]);
    assert.deepEqual(mergeSort([1, 2, 3, 4]), [1, 2, 3, 4]);
  });

  it('handles negative numbers and Infinity', () => {
    assert.deepEqual(mergeSort([0, -3, 7, -Infinity, Infinity]), [-Infinity, -3, 0, 7, Infinity]);
  });

  it('throws a TypeError for non-array input', () => {
    assert.throws(() => mergeSort('not an array'), TypeError);
    assert.throws(() => mergeSort(null), TypeError);
  });

  it('throws a TypeError for arrays containing non-numbers or NaN', () => {
    assert.throws(() => mergeSort([1, 'two', 3]), TypeError);
    assert.throws(() => mergeSort([1, NaN, 3]), TypeError);
  });
});

describe('bubbleSort', () => {
  it('sorts an unsorted array of numbers in ascending order', () => {
    assert.deepEqual(bubbleSort([38, 27, 43, 3, 9, 82, 10]), [3, 9, 10, 27, 38, 43, 82]);
  });

  it('returns a new array and does not mutate the input', () => {
    const input = [5, 3, 1];
    const sorted = bubbleSort(input);
    assert.deepEqual(input, [5, 3, 1]);
    assert.notEqual(sorted, input);
  });

  it('handles empty and single-element arrays', () => {
    assert.deepEqual(bubbleSort([]), []);
    assert.deepEqual(bubbleSort([42]), [42]);
  });

  it('handles duplicates and already-sorted input', () => {
    assert.deepEqual(bubbleSort([2, 1, 2, 1, 2]), [1, 1, 2, 2, 2]);
    assert.deepEqual(bubbleSort([1, 2, 3, 4]), [1, 2, 3, 4]);
  });

  it('handles negative numbers and Infinity', () => {
    assert.deepEqual(bubbleSort([0, -3, 7, -Infinity, Infinity]), [-Infinity, -3, 0, 7, Infinity]);
  });

  it('throws a TypeError for non-array input', () => {
    assert.throws(() => bubbleSort('not an array'), TypeError);
    assert.throws(() => bubbleSort(null), TypeError);
  });

  it('throws a TypeError for arrays containing non-numbers or NaN', () => {
    assert.throws(() => bubbleSort([1, 'two', 3]), TypeError);
    assert.throws(() => bubbleSort([1, NaN, 3]), TypeError);
  });
});

describe('quickSort', () => {
  it('sorts an unsorted array of numbers in ascending order', () => {
    assert.deepEqual(quickSort([38, 27, 43, 3, 9, 82, 10]), [3, 9, 10, 27, 38, 43, 82]);
  });

  it('returns a new array and does not mutate the input', () => {
    const input = [5, 3, 1];
    const sorted = quickSort(input);
    assert.deepEqual(input, [5, 3, 1]);
    assert.notEqual(sorted, input);
  });

  it('handles empty and single-element arrays', () => {
    assert.deepEqual(quickSort([]), []);
    assert.deepEqual(quickSort([42]), [42]);
  });

  it('handles duplicates and already-sorted input', () => {
    assert.deepEqual(quickSort([2, 1, 2, 1, 2]), [1, 1, 2, 2, 2]);
    assert.deepEqual(quickSort([1, 2, 3, 4]), [1, 2, 3, 4]);
  });

  it('handles negative numbers and Infinity', () => {
    assert.deepEqual(quickSort([0, -3, 7, -Infinity, Infinity]), [-Infinity, -3, 0, 7, Infinity]);
  });

  it('throws a TypeError for non-array input', () => {
    assert.throws(() => quickSort('not an array'), TypeError);
    assert.throws(() => quickSort(null), TypeError);
  });

  it('throws a TypeError for arrays containing non-numbers or NaN', () => {
    assert.throws(() => quickSort([1, 'two', 3]), TypeError);
    assert.throws(() => quickSort([1, NaN, 3]), TypeError);
  });
});
