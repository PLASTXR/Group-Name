// Import the functions you need from the SDKs you need
import { auth } from './firebaseconfig.js';
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";

// Inputs
const submit = document.getElementById("submitButton");

// Add event listener to the submit button
submit.addEventListener("click", function(event) {
  event.preventDefault(); // Prevent the default form submission behavior

  const emailValue = document.getElementById("email").value;
  const passwordValue = document.getElementById("password").value;

  // Use Firebase Authentication to create a new user
  createUserWithEmailAndPassword(auth, emailValue, passwordValue)
    .then((userCredential) => {
      // User successfully created
      const user = userCredential.user;
      console.log("User created:", user);
      alert("User registered successfully!");

      window.location.href = "./login.html"; // Redirect to home.html
    })
    .catch((error) => {
      // Handle errors
      console.error("Error:", error.message);
      alert("Error: " + error.message);
    });
});
