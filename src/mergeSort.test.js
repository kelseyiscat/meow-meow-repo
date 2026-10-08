// Run with: npm test  (or: node --test src/)

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import { bubbleSort, heapSort, insertionSort, mergeSort, quickSort } from './mergeSort.js';

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

describe('insertionSort', () => {
  it('sorts an unsorted array of numbers in ascending order', () => {
    assert.deepEqual(insertionSort([38, 27, 43, 3, 9, 82, 10]), [3, 9, 10, 27, 38, 43, 82]);
  });

  it('returns a new array and does not mutate the input', () => {
    const input = [5, 3, 1];
    const sorted = insertionSort(input);
    assert.deepEqual(input, [5, 3, 1]);
    assert.notEqual(sorted, input);
  });

  it('handles empty and single-element arrays', () => {
    assert.deepEqual(insertionSort([]), []);
    assert.deepEqual(insertionSort([42]), [42]);
  });

  it('handles duplicates and already-sorted input', () => {
    assert.deepEqual(insertionSort([2, 1, 2, 1, 2]), [1, 1, 2, 2, 2]);
    assert.deepEqual(insertionSort([1, 2, 3, 4]), [1, 2, 3, 4]);
  });

  it('handles negative numbers and Infinity', () => {
    assert.deepEqual(insertionSort([0, -3, 7, -Infinity, Infinity]), [-Infinity, -3, 0, 7, Infinity]);
  });

  it('throws a TypeError for non-array input', () => {
    assert.throws(() => insertionSort('not an array'), TypeError);
    assert.throws(() => insertionSort(null), TypeError);
  });

  it('throws a TypeError for arrays containing non-numbers or NaN', () => {
    assert.throws(() => insertionSort([1, 'two', 3]), TypeError);
    assert.throws(() => insertionSort([1, NaN, 3]), TypeError);
  });
});

describe('heapSort', () => {
  it('sorts an unsorted array of numbers in ascending order', () => {
    assert.deepEqual(heapSort([38, 27, 43, 3, 9, 82, 10]), [3, 9, 10, 27, 38, 43, 82]);
  });

  it('returns a new array and does not mutate the input', () => {
    const input = [5, 3, 1];
    const sorted = heapSort(input);
    assert.deepEqual(input, [5, 3, 1]);
    assert.notEqual(sorted, input);
  });

  it('handles empty and single-element arrays', () => {
    assert.deepEqual(heapSort([]), []);
    assert.deepEqual(heapSort([42]), [42]);
  });

  it('handles duplicates and already-sorted input', () => {
    assert.deepEqual(heapSort([2, 1, 2, 1, 2]), [1, 1, 2, 2, 2]);
    assert.deepEqual(heapSort([1, 2, 3, 4]), [1, 2, 3, 4]);
  });

  it('handles negative numbers and Infinity', () => {
    assert.deepEqual(heapSort([0, -3, 7, -Infinity, Infinity]), [-Infinity, -3, 0, 7, Infinity]);
  });

  it('sorts a larger array identically to the built-in sort', () => {
    const input = Array.from({ length: 500 }, (_, i) => (i * 7919) % 1000);
    const expected = input.slice().sort((a, b) => a - b);
    assert.deepEqual(heapSort(input), expected);
  });

  it('throws a TypeError for non-array input', () => {
    assert.throws(() => heapSort('not an array'), TypeError);
    assert.throws(() => heapSort(null), TypeError);
  });

  it('throws a TypeError for arrays containing non-numbers or NaN', () => {
    assert.throws(() => heapSort([1, 'two', 3]), TypeError);
    assert.throws(() => heapSort([1, NaN, 3]), TypeError);
  });
});
