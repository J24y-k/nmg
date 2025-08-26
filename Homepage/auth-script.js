// Minimal JS for the auth pages: hamburger menu, custom cursor, password toggle

// Hamburger Menu Toggle (same ids/classes as your main site)
const hamburger = document.getElementById('hamburger-menu');
const navLinks = document.getElementById('nav-links');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('open');
  });
}

// Custom Cursor (re-uses #custom-cursor)
const cursor = document.getElementById('custom-cursor');
document.addEventListener('mousemove', e => {
  if (!cursor) return;
  cursor.style.left = e.clientX + 'px';
  cursor.style.top  = e.clientY + 'px';
});

// Password show/hide
function wirePasswordToggles() {
  document.querySelectorAll('.toggle-visibility').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-toggle');
      const input = document.getElementById(targetId);
      if (!input) return;
      const isPassword = input.getAttribute('type') === 'password';
      input.setAttribute('type', isPassword ? 'text' : 'password');
      btn.textContent = isPassword ? '🙈' : '👁️';
    });
  });
}

// Simple inline validation for signup: ensure passwords match
function wireSignupValidation() {
  const form = document.getElementById('signup-form');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    const pwd = document.getElementById('signup-password');
    const confirm = document.getElementById('signup-confirm');
    const agree = document.getElementById('signup-agree');
    const errorEl = document.getElementById('signup-error');

    if (pwd && confirm && pwd.value !== confirm.value) {
      e.preventDefault();
      if (errorEl) {
        errorEl.style.display = 'block';
        errorEl.textContent = 'Passwords do not match.';
      }
      return;
    }
    if (agree && !agree.checked) {
      e.preventDefault();
      if (errorEl) {
        errorEl.style.display = 'block';
        errorEl.textContent = 'You must accept the Terms & Privacy Policy.';
      }
    }
  });
}

// Forgot password click will be handled in firebase-auth.js, but
// we can prevent navigating to '#' here.
const forgot = document.getElementById('forgot-password');
if (forgot) {
  forgot.addEventListener('click', (e) => e.preventDefault());
}

document.addEventListener('DOMContentLoaded', () => {
  wirePasswordToggles();
  wireSignupValidation();
});
