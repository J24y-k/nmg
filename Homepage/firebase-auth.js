// Firebase config for your project
const firebaseConfig = {
  apiKey: "AIzaSyBrKLRFzBQ331aolycbO_kMUMG_hYBnaYE",
  authDomain: "nmg-commerce.firebaseapp.com",
  projectId: "nmg-commerce",
  storageBucket: "nmg-commerce.firebasestorage.app",
  messagingSenderId: "834236097234",
  appId: "1:834236097234:web:cd73f5a640723a3eab830b"
};

// ✅ Make sure all imports use the SAME version (12.1.0 here)
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithPopup,
  GoogleAuthProvider,
  signOut
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import {
  getFirestore,
  doc,
  setDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

// --- Initialize Firebase ---
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// --- Export so other pages can reuse ---
export { auth, db, onAuthStateChanged, signOut };

// --- Helpers ---
function showError(id, msg) {
  const el = document.getElementById(id);
  if (el) {
    el.textContent = msg;
    el.style.display = 'block';
  } else {
    alert(msg);
  }
}
function clearError(id) {
  const el = document.getElementById(id);
  if (el) el.style.display = 'none';
}

// --- Sign In form ---
const signinForm = document.getElementById('signin-form');
if (signinForm) {
  signinForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearError('signin-error');
    const email = signinForm.email.value.trim();
    const password = signinForm.password.value;
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Redirect (respect ?return=checkout.html if present)
      const params = new URLSearchParams(window.location.search);
      window.location.href = params.get('return') || 'index.html';
    } catch (err) {
      showError('signin-error', err.message);
    }
  });

  // Forgot password
  const forgot = document.getElementById('forgot-password');
  if (forgot) {
    forgot.addEventListener('click', async (e) => {
      e.preventDefault();
      const email = document.getElementById('signin-email')?.value.trim();
      if (!email) return showError('signin-error', 'Please enter your email first.');
      try {
        await sendPasswordResetEmail(auth, email);
        alert('Password reset email sent.');
      } catch (err) {
        showError('signin-error', err.message);
      }
    });
  }

  // Google sign-in
  const googleBtn = document.getElementById('google-signin');
  if (googleBtn) {
    googleBtn.addEventListener('click', async () => {
      try {
        const provider = new GoogleAuthProvider();
        await signInWithPopup(auth, provider);
        const params = new URLSearchParams(window.location.search);
        window.location.href = params.get('return') || 'index.html';
      } catch (err) {
        showError('signin-error', err.message);
      }
    });
  }
}

// --- Sign Up form ---
const signupForm = document.getElementById('signup-form');
if (signupForm) {
  signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearError('signup-error');
    const name = signupForm.name.value.trim();
    const email = signupForm.email.value.trim();
    const password = signupForm.password.value;
    const confirm = signupForm.confirm.value;
    const agree = signupForm.agree.checked;

    if (password !== confirm) return showError('signup-error', 'Passwords do not match.');
    if (!agree) return showError('signup-error', 'You must accept the Terms & Privacy Policy.');

    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      // Save profile in Firestore
      await setDoc(doc(db, 'users', cred.user.uid), {
        name,
        email,
        createdAt: serverTimestamp()
      });
      const params = new URLSearchParams(window.location.search);
      window.location.href = params.get('return') || 'index.html';
    } catch (err) {
      showError('signup-error', err.message);
    }
  });

  // Google sign-up
  const googleBtn = document.getElementById('google-signup');
  if (googleBtn) {
    googleBtn.addEventListener('click', async () => {
      try {
        const provider = new GoogleAuthProvider();
        await signInWithPopup(auth, provider);
        const params = new URLSearchParams(window.location.search);
        window.location.href = params.get('return') || 'index.html';
      } catch (err) {
        showError('signup-error', err.message);
      }
    });
  }
}

// --- Optional logout ---
const logoutBtn = document.getElementById('logout');
if (logoutBtn) {
  logoutBtn.addEventListener('click', async () => {
    await signOut(auth);
    window.location.href = 'index.html';
  });
}
