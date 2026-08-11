// Super lightweight calculator module with embedded UI

// calc: performs basic arithmetic given two numbers and an operator
const calc = (a, op, b) => ({ '+': a + b, '-': a - b, '*': a * b, '/': a / b, '%': a % b })[op] ?? 'bad op';

// Embedded HTML/CSS UI template
const calculatorUI = `
<style>
  .calc { font-family: sans-serif; padding: 10px; border: 1px solid #ccc; width: 200px; }
  .calc button { width: 40px; padding: 5px; margin: 2px; }
  .calc .display { background: #f0f0f0; padding: 5px; text-align: right; }
</style>
<div class="calc">
  <div class="display">0</div>
  <div>
    <button onclick="calc(7,'+',1)">+</button>
    <button onclick="calc(2,'-',1)">-</button>
    <button onclick="calc(3,'*',4)">×</button>
    <button onclick="calc(8,'/',2)">÷</button>
  </div>
</div>
`;

// Export for reuse
module.exports = { calc, calculatorUI };
