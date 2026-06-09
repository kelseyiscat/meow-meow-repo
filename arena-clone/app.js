// --- Modal logic ---
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modalTitle');
const modalSub = document.getElementById('modalSub');
const tabs = document.querySelectorAll('.tab');
const submitBtn = document.getElementById('submitBtn');
const nameField = document.getElementById('nameField');
const passwordHint = document.getElementById('passwordHint');
let mode = 'signup';

function openModal(initialMode = 'signup') {
  setMode(initialMode);
  modal.classList.add('open');
  setTimeout(() => document.getElementById(mode === 'signup' ? 'name' : 'email').focus(), 50);
}
function closeModal() { modal.classList.remove('open'); }

function setMode(next) {
  mode = next;
  tabs.forEach(t => t.classList.toggle('active', t.dataset.tab === next));
  if (next === 'signup') {
    modalTitle.textContent = 'Create your account';
    modalSub.textContent = 'Join the demo to save your chats and votes.';
    submitBtn.textContent = 'Create account';
    nameField.style.display = '';
    passwordHint.style.display = '';
    document.getElementById('password').setAttribute('autocomplete', 'new-password');
    document.getElementById('password').placeholder = 'At least 8 characters';
  } else {
    modalTitle.textContent = 'Welcome back';
    modalSub.textContent = 'Sign in to your demo account.';
    submitBtn.textContent = 'Sign in';
    nameField.style.display = 'none';
    passwordHint.style.display = 'none';
    document.getElementById('password').setAttribute('autocomplete', 'current-password');
    document.getElementById('password').placeholder = 'Your password';
  }
}

document.getElementById('openSignUp').onclick = () => openModal('signup');
document.getElementById('openSignIn').onclick = () => openModal('signin');
tabs.forEach(t => t.onclick = () => setMode(t.dataset.tab));
modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

// --- Validation ---
function validateEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }

document.getElementById('authForm').addEventListener('submit', (e) => {
  e.preventDefault();
  let ok = true;
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;

  if (mode === 'signup' && !name) {
    nameField.classList.add('invalid'); ok = false;
  } else nameField.classList.remove('invalid');

  if (!validateEmail(email)) {
    document.getElementById('emailField').classList.add('invalid'); ok = false;
  } else document.getElementById('emailField').classList.remove('invalid');

  if (mode === 'signup' ? password.length < 8 : password.length < 1) {
    document.getElementById('passwordField').classList.add('invalid'); ok = false;
  } else document.getElementById('passwordField').classList.remove('invalid');

  if (!ok) return;

  submitBtn.disabled = true;
  submitBtn.textContent = mode === 'signup' ? 'Creating…' : 'Signing in…';
  setTimeout(() => {
    submitBtn.disabled = false;
    submitBtn.textContent = mode === 'signup' ? 'Create account' : 'Sign in';
    closeModal();
    showToast(mode === 'signup' ? `✨ Demo account created for ${email}` : `👋 Welcome back, ${email}`, true);
    document.getElementById('authForm').reset();
  }, 700);
});

// --- Helpers ---
function showToast(msg, success = false) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.toggle('success', success);
  t.classList.add('show');
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => t.classList.remove('show'), 2600);
}

function mockOAuth(provider) {
  showToast(`(Demo) ${provider} sign-in is not wired up.`);
}

function fillPrompt(btn) {
  const text = btn.innerText.split('\n').slice(1).join(' ').trim();
  const input = document.getElementById('composerInput');
  input.value = text;
  input.focus();
  autoGrow(input);
}

function sendMessage() {
  const input = document.getElementById('composerInput');
  if (!input.value.trim()) { input.focus(); return; }
  showToast('(Demo) Message captured — no AI is connected.');
  input.value = '';
  autoGrow(input);
}

function autoGrow(el) {
  el.style.height = 'auto';
  el.style.height = Math.min(el.scrollHeight, 200) + 'px';
}
const composerInput = document.getElementById('composerInput');
composerInput.addEventListener('input', () => autoGrow(composerInput));
composerInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
});

// Mode toggle
document.querySelectorAll('.mode-toggle button').forEach(b => {
  b.onclick = () => {
    document.querySelectorAll('.mode-toggle button').forEach(x => x.classList.remove('active'));
    b.classList.add('active');
  };
});
