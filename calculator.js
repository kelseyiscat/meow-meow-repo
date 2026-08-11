const calc = (a, op, b) => ({ '+': a + b, '-': a - b, '*': a * b, '/': a / b, '%': a % b })[op] ?? 'bad op';

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

module.exports = { calc, calculatorUI };
