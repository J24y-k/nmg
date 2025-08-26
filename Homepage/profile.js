import { auth, db, onAuthStateChanged, signOut } from "/Homepage/firebase-auth.js";
import { deleteUser } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import { collection, query, where, getDocs, deleteDoc, doc, getDoc } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const signinLink = document.getElementById("nav-signin");
const profileDropdown = document.getElementById("profile-dropdown");
const profileIcon = document.getElementById("profile-icon");
const dropdownMenu = document.getElementById("dropdown-menu");
const profileName = document.getElementById("profile-name");
const profileEmail = document.getElementById("profile-email");
const historyList = document.getElementById("history-list");
const profileLogoutBtn = document.getElementById("profile-logout");
const deleteProfileBtn = document.getElementById("delete-profile");

console.log("profile.js loaded");

onAuthStateChanged(auth, async (user) => {
 console.log("Auth state changed", user ? "Logged in" : "Logged out");
 if (user) {
 signinLink.style.display = "none";
 profileDropdown.style.display = "block";

 // Set initial loading states
 profileName.textContent = "Loading...";
 historyList.innerHTML = "<p>Loading purchase history...</p>";

 try {
 console.log("Fetching user data and orders...");
 // Fetch in parallel
 const [userDocSnap, ordersSnap] = await Promise.all([
 getDoc(doc(db, 'users', user.uid)),
 getDocs(query(collection(db, "orders"), where("userId", "==", user.uid)))
 ]);

 console.log("User doc exists?", userDocSnap.exists());
 // User name
 let name = user.displayName || "User";
 if (userDocSnap.exists()) {
 const data = userDocSnap.data();
 name = data.name || name;
 }
 profileName.textContent = name;
 profileEmail.textContent = user.email;
 if (user.photoURL) {
 document.getElementById("profile-pic").src = user.photoURL;
 profileIcon.src = user.photoURL;
 }

 console.log("Orders found:", ordersSnap.size);
 // Purchase history
 if (ordersSnap.empty) {
 historyList.innerHTML = "<p>No purchase history yet.</p>";
 } else {
 historyList.innerHTML = "";
 ordersSnap.forEach((doc) => {
 const order = doc.data();
 const orderDate = order.timestamp.toDate().toLocaleDateString();
 const itemsHtml = order.items.map(item => `<li>${item.name} (x${item.quantity}) - R${item.price}</li>`).join("");
 historyList.innerHTML += `
 <div class="order-item">
 <h4>Order on ${orderDate} - Total: R${order.total}</h4>
 <ul>${itemsHtml}</ul>
 </div>
 `;
 });
 }
 } catch (err) {
 console.error("Error loading profile:", err);
 profileName.textContent = "Error loading name";
 historyList.innerHTML = "<p>Error loading history. Please refresh.</p>";
 } finally {
 // Always remove loading class
 document.body.classList.remove('loading');
 }
 } else {
 window.location.href = "signin.html";
 }
});

// Toggle dropdown
profileIcon?.addEventListener("click", () => {
 dropdownMenu.classList.toggle("active");
});

// Logout button in profile
profileLogoutBtn?.addEventListener("click", async () => {
 await signOut(auth);
 window.location.href = "index.html";
});

// Delete profile button
deleteProfileBtn?.addEventListener("click", async () => {
 if (!confirm("Are you sure you want to delete your profile? This cannot be undone.")) return;
 const user = auth.currentUser;
 if (user) {
 try {
 const ordersQuery = query(collection(db, "orders"), where("userId", "==", user.uid));
 const ordersSnapshot = await getDocs(ordersQuery);
 ordersSnapshot.forEach(async (orderDoc) => {
 await deleteDoc(doc(db, "orders", orderDoc.id));
 });
 await deleteDoc(doc(db, "users", user.uid));
 await deleteUser(user);
 window.location.href = "index.html";
 } catch (err) {
 console.error("Error deleting profile:", err);
 alert("Failed to delete profile. Please try again.");
 }
 }
});