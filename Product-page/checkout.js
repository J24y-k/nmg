// checkout.js — Handle EFT form submission, save order to Firestore, upload proof, and send receipt email via EmailJS v4
import { auth, db } from "/Homepage/firebase-auth.js"; // Adjusted to match your HTML path
import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-storage.js";

const eftForm = document.getElementById("eft-form");
const statusMessage = document.getElementById("status-message");
const storage = getStorage();

console.log("checkout.js loaded. EFT form:", eftForm);
console.log("Auth:", auth, "DB:", db, "Storage:", storage); // Verify Firebase objects

// Initialize EmailJS
emailjs.init("o1XS1Se7m36mJal67");
console.log("EmailJS initialized with public key:", "o1XS1Se7m36mJal67");

if (eftForm) {
 eftForm.addEventListener("submit", async (e) => {
 e.preventDefault();
 console.log("Form submit triggered. Form data:", {
   name: eftForm.name.value,
   email: eftForm.email.value,
   notes: eftForm.notes.value,
   proofFile: document.getElementById("payment-proof").files[0]
 });

 const user = auth.currentUser;
 if (!user) {
 statusMessage.textContent = "You must be logged in to complete purchase.";
 console.error("No user logged in");
 return;
 }

 const cart = JSON.parse(localStorage.getItem("cart")) || [];
 if (cart.length === 0) {
 statusMessage.textContent = "Your cart is empty.";
 console.error("Cart empty");
 return;
 }

 const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
 console.log("Calculated total:", total);

 const proofFile = document.getElementById("payment-proof").files[0];
 if (!proofFile) {
 statusMessage.textContent = "Please upload payment proof.";
 console.error("No proof file");
 return;
 }

 statusMessage.textContent = "Processing your order...";
 console.log("Starting order process for user:", user.uid);

 try {
 console.log("Uploading proof...");
 const proofRef = ref(storage, `payment-proofs/${user.uid}/${Date.now()}_${proofFile.name}`);
 await uploadBytes(proofRef, proofFile);
 const proofURL = await getDownloadURL(proofRef);
 console.log("Proof uploaded:", proofURL);

 console.log("Saving order to Firestore...");
 const orderRef = await addDoc(collection(db, "orders"), {
 userId: user.uid,
 items: cart.map(item => ({ name: item.name, quantity: item.quantity, price: item.price })),
 total,
 timestamp: serverTimestamp(),
 proofURL,
 name: eftForm.name.value,
 email: eftForm.email.value,
 notes: eftForm.notes.value
 });
 console.log("Order saved, ID:", orderRef.id);

 const itemsTable = cart.map(item => `<tr><td>${item.name}</td><td>${item.quantity}</td><td>R${item.price}</td><td>R${item.price * item.quantity}</td></tr>`).join("");
 const receiptHTML = `
 <h2>Order Receipt</h2>
 <p>Order ID: ${orderRef.id}</p>
 <p>Date: ${new Date().toLocaleString()}</p>
 <p>Customer: ${eftForm.name.value} (${eftForm.email.value})</p>
 <table border="1" style="width:100%; border-collapse: collapse;">
 <thead><tr><th>Product</th><th>Qty</th><th>Price</th><th>Subtotal</th></tr></thead>
 <tbody>${itemsTable}</tbody>
 <tfoot><tr><td colspan="3">Total</td><td>R${total}</td></tr></tfoot>
 </table>
 <p>Payment Proof: <a href="${proofURL}">View Proof</a></p>
 <p>Notes: ${eftForm.notes.value}</p>
 `;

 console.log("Sending email to admin...");
 await emailjs.send("service_2d3airg", "template_xxtabw2", {
 to_email: "eways.publishing@gmail.com",
 receipt: receiptHTML,
 from_name: eftForm.name.value,
 reply_to: eftForm.email.value
 });
 console.log("Admin email sent", adminResponse);

 console.log("Sending email to customer...") ;
 const customerResponse = await emailjs.send("service_2d3airg", "template_xxtabw2", {
 to_email: eftForm.email.value,
 receipt: receiptHTML,
 from_name: "NMG Zembeta",
 reply_to: "eways.publishing@gmail.com"
 });
 console.log("Customer email sent", customerResponse) ;

 localStorage.removeItem("cart");
 document.getElementById("cart-items").innerHTML = "";
 document.getElementById("total-price").textContent = "0";

 statusMessage.textContent = "Order placed and receipt sent successfully! We'll confirm once payment is verified.";
 statusMessage.classList.add("success");
 } catch (err) {
 console.error("Error processing order:", err);
 statusMessage.textContent = `Error placing order: ${err.message}. Please try again.`;
 }
 });
}

// Your other functions (initCustomCursor, etc.) remain the same
function initCustomCursor() {
 const cursor = document.getElementById('custom-cursor');
 if (!cursor) return;
 document.addEventListener('mousemove', (e) => {
 gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.1, ease: "power2.out" });
 });
}

function setupHamburgerMenu() {
 const hamburger = document.getElementById('hamburger-menu');
 const navLinks = document.getElementById('nav-links');
 if (!hamburger || !navLinks) return;
 hamburger.addEventListener('click', () => {
 hamburger.classList.toggle('open');
 navLinks.classList.toggle('active');
 });
}

function updateCartCount() {
 const cart = JSON.parse(localStorage.getItem('cart')) || [];
 const badge = document.getElementById('cart-count');
 if (badge) badge.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
}



document.addEventListener('DOMContentLoaded', () => {
 setupHamburgerMenu();
 if (typeof gsap !== 'undefined') initCustomCursor();
 updateCartCount();
});