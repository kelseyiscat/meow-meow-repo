// mergeSort.js — a simple merge sort implementation (no UI).
// Run the demo with: node src/mergeSort.js

/**
 * Sorts an array of numbers using merge sort.
 * Returns a new sorted array; the input is not mutated.
 *
 * @param {number[]} arr Array of finite numbers (Infinity is allowed, NaN is not).
 * @returns {number[]} A new array sorted in ascending order.
 * @throws {TypeError} If `arr` is not an array, or holds a non-number / NaN value.
 */
export function mergeSort(arr) {
  // Validate once at the entry point rather than on every recursive call.
  if (!Array.isArray(arr)) {
    throw new TypeError(`mergeSort expects an array, received ${describe(arr)}`);
  }

  for (let i = 0; i < arr.length; i++) {
    const value = arr[i];
    // NaN breaks the comparisons below and would silently return a bad order,
    // so reject it up front with a message that points at the offender.
    if (typeof value !== 'number' || Number.isNaN(value)) {
      throw new TypeError(
        `mergeSort expects an array of numbers, received ${describe(value)} at index ${i}`,
      );
    }
  }

  return sort(arr);
}

/** Recursive core. Assumes `arr` is already validated. */
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
  const sample = [38, 27, 43, 3, 9, 82, 10];
  console.log('Input: ', sample);
  console.log('Sorted:', mergeSort(sample));
}
