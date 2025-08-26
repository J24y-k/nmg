// auth-ui.js
import { auth, onAuthStateChanged, signOut } from "./firebase-auth.js";

const signinLink = document.getElementById("nav-signin");
const profileDropdown = document.getElementById("profile-dropdown");
const profileIcon = document.getElementById("profile-icon");
const dropdownMenu = document.getElementById("dropdown-menu");

// Listen for auth state changes
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is logged in
    signinLink.style.display = "none";
    profileDropdown.style.display = "block";
    profileIcon.src = user.photoURL || "https://via.placeholder.com/40";
  } else {
    // User is logged out
    signinLink.style.display = "block";
    profileDropdown.style.display = "none";
  }
});

// Logout handler
document.getElementById("logout")?.addEventListener("click", async (e) => {
  e.preventDefault();
  await signOut(auth);
  window.location.href = "index.html";
});

// Toggle dropdown
profileIcon?.addEventListener("click", () => {
  dropdownMenu.classList.toggle("active");
});
