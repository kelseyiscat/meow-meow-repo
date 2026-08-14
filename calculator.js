/* calculator.js — a super lightweight calculator app 🐾
 * Zero dependencies, ~1 file, works in the browser and Node.
 *
 * Browser: <div id="calculator"></div> + <script src="calculator.js"></script>
 *          (it auto-mounts — or call calculator.mount('#anywhere'))
 * Node:    const { calc } = require('./calculator'); calc(2, '+', 3); // 5
 */
(function (global) {
  'use strict';

  // ---------- core logic ----------
  var OPS = {
    '+': function (a, b) { return a + b; },
    '-': function (a, b) { return a - b; },
    '*': function (a, b) { return a * b; },
    '/': function (a, b) { return a / b; },
    '%': function (a, b) { return a % b; }
  };

  // Pure arithmetic: calc(2, '*', 4) -> 8  (NaN for a bad operator)
  function calc(a, op, b) {
    return OPS[op] ? OPS[op](Number(a), Number(b)) : NaN;
  }

  // Trim float noise: 0.1 + 0.2 -> "0.3", not "0.30000000000000004"
  function trim(n) {
    return String(Math.round(n * 1e12) / 1e12);
  }

  // ---------- state machine ----------
  // press() accepts: digits, '.', operators, '=', 'C', 'backspace'
  function createCalculator(onChange) {
    var display = '0', acc = null, op = null, fresh = true;

    function update() { if (onChange) onChange(display); }

    function apply() {
      var cur = parseFloat(display);
      if (acc === null) { acc = cur; return; }
      acc = calc(acc, op, cur);
      if (!isFinite(acc)) { display = '😿 Error'; acc = null; op = null; return; } // e.g. ÷0
      display = trim(acc);
    }

    function press(key) {
      if (display === '😿 Error') { display = '0'; acc = null; op = null; }

      if (/^[0-9]$/.test(key)) {
        display = fresh ? key : (display === '0' ? key : display + key);
        fresh = false;
      } else if (key === '.') {
        if (fresh) { display = '0.'; fresh = false; }
        else if (display.indexOf('.') === -1) display += '.';
      } else if (OPS[key]) {
        if (op && !fresh) apply();
        else if (acc === null) acc = parseFloat(display);
        op = key;
        fresh = true;
      } else if (key === '=' || key === 'Enter') {
        if (op) { apply(); op = null; fresh = true; }
      } else if (key === 'C' || key === 'Escape') {
        display = '0'; acc = null; op = null; fresh = true;
      } else if (key === 'Backspace' || key === 'backspace') {
        if (!fresh) display = display.length > 1 ? display.slice(0, -1) : '0';
      }

      update();
      return display;
    }

    return { press: press, getDisplay: function () { return display; } };
  }

  // ---------- tiny browser UI ----------
  var CSS =
    '.mcalc{font:16px/1.4 system-ui,sans-serif;width:220px;padding:12px;border:1px solid #ddd;' +
    'border-radius:12px;background:#fffdf7;box-shadow:0 2px 8px rgba(0,0,0,.08)}' +
    '.mcalc .d{padding:10px 8px;margin-bottom:8px;text-align:right;font-size:24px;' +
    'background:#f6f1e7;border-radius:8px;overflow:hidden;min-height:34px;box-sizing:border-box}' +
    '.mcalc .g{display:grid;grid-template-columns:repeat(4,1fr);gap:6px}' +
    '.mcalc button{padding:12px 0;font-size:16px;border:0;border-radius:8px;background:#eee;cursor:pointer}' +
    '.mcalc button:hover{background:#ddd}' +
    '.mcalc .op{background:#ffd9a0}.mcalc .op:hover{background:#ffc978}' +
    '.mcalc .eq{grid-column:span 2;background:#b5e6b0}.mcalc .eq:hover{background:#9fd899}';

  var KEYS = ['C', 'backspace', '%', '/', '7', '8', '9', '*', '4', '5', '6', '-', '1', '2', '3', '+', '0', '.', '='];
  var LABEL = { backspace: '⌫', '*': '×', '/': '÷', '-': '−' };

  function mount(target) {
    var el = typeof target === 'string' ? document.querySelector(target) : target;
    if (!el) return null;

    if (!document.getElementById('mcalc-style')) {
      var style = document.createElement('style');
      style.id = 'mcalc-style';
      style.textContent = CSS;
      document.head.appendChild(style);
    }

    el.classList.add('mcalc');
    el.innerHTML =
      '<div class="d">0</div><div class="g">' +
      KEYS.map(function (k) {
        var cls = OPS[k] ? ' class="op"' : (k === '=' ? ' class="eq"' : '');
        return '<button data-k="' + k + '"' + cls + '>' + (LABEL[k] || k) + '</button>';
      }).join('') +
      '</div>';

    var d = el.querySelector('.d');
    var app = createCalculator(function (v) { d.textContent = v; });

    el.addEventListener('click', function (e) {
      var k = e.target.getAttribute && e.target.getAttribute('data-k');
      if (k) app.press(k);
    });

    // Keyboard support (only once per document)
    if (!global.__mcalcKeys) {
      global.__mcalcKeys = true;
      document.addEventListener('keydown', function (e) {
        var k = e.key === 'Enter' ? '=' : e.key;
        if (/^[0-9.]$/.test(k) || OPS[k] || ['=', 'C', 'Escape', 'Backspace'].indexOf(k) > -1) {
          app.press(k);
          e.preventDefault();
        }
      });
    }

    return app;
  }

  var api = { calc: calc, createCalculator: createCalculator, mount: mount, KEYS: KEYS };

  // Auto-mount <div id="calculator"> in the browser
  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function () {
        var el = document.getElementById('calculator');
        if (el) mount(el);
      });
    } else {
      var el = document.getElementById('calculator');
      if (el) mount(el);
    }
  }

  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else global.calculator = api;
})(typeof window !== 'undefined' ? window : this);
