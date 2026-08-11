const calc = (a, op, b) => ({ '+': a + b, '-': a - b, '*': a * b, '/': a / b, '%': a % b })[op] ?? 'bad op';

module.exports = { calc };
