// mergeSort.js — simple merge sort, bubble sort, quick sort, insertion sort, and heap sort implementations (no UI).
// Run the demo with: node src/mergeSort.js

/**
 * Sorts an array of numbers using merge sort.
 * Returns a new sorted array; the input is not mutated.
 *
 * @param {number[]} arr Array of numbers (Infinity is allowed, NaN is not).
 * @returns {number[]} A new array sorted in ascending order.
 * @throws {TypeError} If `arr` is not an array, or holds a non-number / NaN value.
 */
export function mergeSort(arr) {
  // Validate once at the entry point rather than on every recursive call.
  validateNumberArray(arr, 'mergeSort');

  return sort(arr);
}

/**
 * Sorts an array of numbers using bubble sort.
 * Returns a new sorted array; the input is not mutated.
 *
 * @param {number[]} arr Array of numbers (Infinity is allowed, NaN is not).
 * @returns {number[]} A new array sorted in ascending order.
 * @throws {TypeError} If `arr` is not an array, or holds a non-number / NaN value.
 */
export function bubbleSort(arr) {
  validateNumberArray(arr, 'bubbleSort');

  const result = arr.slice();

  // Move the largest remaining value to the end of the unsorted portion.
  for (let pass = 0; pass < result.length - 1; pass++) {
    let swapped = false;

    for (let i = 0; i < result.length - 1 - pass; i++) {
      if (result[i] > result[i + 1]) {
        const current = result[i];
        result[i] = result[i + 1];
        result[i + 1] = current;
        swapped = true;
      }
    }

    // If a full pass made no swaps, the array is already sorted.
    if (!swapped) break;
  }

  return result;
}

/**
 * Sorts an array of numbers using quick sort.
 * Returns a new sorted array; the input is not mutated.
 *
 * @param {number[]} arr Array of numbers (Infinity is allowed, NaN is not).
 * @returns {number[]} A new array sorted in ascending order.
 * @throws {TypeError} If `arr` is not an array, or holds a non-number / NaN value.
 */
export function quickSort(arr) {
  validateNumberArray(arr, 'quickSort');

  return quickSortRecursive(arr);
}

/**
 * Sorts an array of numbers using insertion sort.
 * Returns a new sorted array; the input is not mutated.
 *
 * @param {number[]} arr Array of numbers (Infinity is allowed, NaN is not).
 * @returns {number[]} A new array sorted in ascending order.
 * @throws {TypeError} If `arr` is not an array, or holds a non-number / NaN value.
 */
export function insertionSort(arr) {
  validateNumberArray(arr, 'insertionSort');

  const result = arr.slice();

  // Grow a sorted region at the front, one element at a time.
  for (let i = 1; i < result.length; i++) {
    const current = result[i];
    let j = i - 1;

    // Shift every element larger than `current` one slot to the right.
    while (j >= 0 && result[j] > current) {
      result[j + 1] = result[j];
      j--;
    }

    // Drop the held value into the gap that opened up.
    result[j + 1] = current;
  }

  return result;
}

/**
 * Sorts an array of numbers using heap sort.
 * Returns a new sorted array; the input is not mutated.
 *
 * @param {number[]} arr Array of numbers (Infinity is allowed, NaN is not).
 * @returns {number[]} A new array sorted in ascending order.
 * @throws {TypeError} If `arr` is not an array, or holds a non-number / NaN value.
 */
export function heapSort(arr) {
  validateNumberArray(arr, 'heapSort');

  const result = arr.slice();

  // Phase 1: rearrange the array in place into a max heap (parent >= children),
  // starting from the last parent node and working toward the root.
  for (let i = Math.floor(result.length / 2) - 1; i >= 0; i--) {
    siftDown(result, i, result.length);
  }

  // Phase 2: repeatedly swap the max (root) with the last unsorted element,
  // shrink the heap, and restore the heap property.
  for (let end = result.length - 1; end > 0; end--) {
    const root = result[0];
    result[0] = result[end];
    result[end] = root;
    siftDown(result, 0, end);
  }

  return result;
}

/** Validates that a value is an array containing only numbers that can be sorted. */
function validateNumberArray(arr, functionName) {
  if (!Array.isArray(arr)) {
    throw new TypeError(`${functionName} expects an array, received ${describe(arr)}`);
  }

  for (let i = 0; i < arr.length; i++) {
    const value = arr[i];
    // NaN breaks comparisons and would silently return a bad order,
    // so reject it up front with a message that points at the offender.
    if (typeof value !== 'number' || Number.isNaN(value)) {
      throw new TypeError(
        `${functionName} expects an array of numbers, received ${describe(value)} at index ${i}`,
      );
    }
  }
}

/** Recursive merge sort core. Assumes `arr` is already validated. */
function sort(arr) {
  // Base case: arrays of length 0 or 1 are already sorted.
  if (arr.length <= 1) return arr.slice();

  // Split the array in half.
  const mid = Math.floor(arr.length / 2);
  const left = sort(arr.slice(0, mid));
  const right = sort(arr.slice(mid));

  // Merge the two sorted halves.
  return merge(left, right);
}

/** Merges two sorted arrays into one sorted array. */
function merge(left, right) {
  const result = [];
  let i = 0;
  let j = 0;

  // Pick the smaller front element from either array, one at a time.
  // `<=` keeps equal elements in their original order (a stable sort).
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      result.push(left[i++]);
    } else {
      result.push(right[j++]);
    }
  }

  // Append whatever is left (only one of these will have items).
  return result.concat(left.slice(i), right.slice(j));
}

/** Recursive quick sort core. Assumes `arr` is already validated. */
function quickSortRecursive(arr) {
  if (arr.length <= 1) return arr.slice();

  const pivot = arr[Math.floor(arr.length / 2)];
  const less = [];
  const equal = [];
  const greater = [];

  for (const value of arr) {
    if (value < pivot) {
      less.push(value);
    } else if (value > pivot) {
      greater.push(value);
    } else {
      equal.push(value);
    }
  }

  return quickSortRecursive(less).concat(equal, quickSortRecursive(greater));
}

/**
 * Restores the max-heap property for the subtree rooted at index `i`,
 * treating `heap[0..size)` as the active heap. Assumes values are valid numbers.
 */
function siftDown(heap, i, size) {
  while (true) {
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    let largest = i;

    if (left < size && heap[left] > heap[largest]) largest = left;
    if (right < size && heap[right] > heap[largest]) largest = right;

    // If the root already dominates both children, the subtree is a valid heap.
    if (largest === i) return;

    const current = heap[i];
    heap[i] = heap[largest];
    heap[largest] = current;

    // Continue sifting through the child we swapped into.
    i = largest;
  }
}

/** Builds a short, readable description of a value for error messages. */
function describe(value) {
  if (value === null) return 'null';
  if (value === undefined) return 'undefined';
  if (typeof value === 'number' && Number.isNaN(value)) return 'NaN';
  if (typeof value === 'string') return `a string (${JSON.stringify(value)})`;
  if (Array.isArray(value)) return 'an array';
  return `${typeof value} (${String(value)})`;
}

// --- Demo (runs only when executed directly with Node, not when imported) ---
const isDirectRun =
  typeof process !== 'undefined' &&
  typeof process.argv?.[1] === 'string' &&
  import.meta.url === new URL(process.argv[1], 'file://').href;

if (isDirectRun) {
  console.log('hello');
  const sample = [38, 27, 43, 3, 9, 82, 10];
  console.log('Input:         ', sample);
  console.log('Merge sort:    ', mergeSort(sample));
  console.log('Bubble sort:   ', bubbleSort(sample));
  console.log('Quick sort:    ', quickSort(sample));
  console.log('Insertion sort:', insertionSort(sample));
  console.log('Heap sort:     ', heapSort(sample));
}
