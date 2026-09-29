// Generates and prints a random alphanumeric string with fewer than 10 characters.

function generateRandomString(length) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// Random length between 1 and 9 (strictly less than 10 characters)
const length = Math.floor(Math.random() * 9) + 1;
const randomString = generateRandomString(length);

console.log(randomString);
