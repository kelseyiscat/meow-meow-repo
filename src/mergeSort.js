// mergeSort.js — a simple merge sort implementation (no UI).
// Run the demo with: node src/mergeSort.js

/**
 * Sorts an array of numbers using merge sort.
 * Returns a new sorted array; the input is not mutated.
 */
export function mergeSort(arr) {
  // Base case: arrays of length 0 or 1 are already sorted.
  if (arr.length <= 1) return arr.slice();

  // Split the array in half.
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));

  // Merge the two sorted halves.
  return merge(left, right);
}

/** Merges two sorted arrays into one sorted array. */
function merge(left, right) {
  const result = [];
  let i = 0;
  let j = 0;

  // Pick the smaller front element from either array, one at a time.
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

// --- Demo (runs when executed directly with Node) ---
const sample = [38, 27, 43, 3, 9, 82, 10];
console.log("Input: ", sample);
console.log("Sorted:", mergeSort(sample));
