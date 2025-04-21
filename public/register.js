// Import the functions you need from the SDKs you need
import { auth, db } from './firebaseconfig.js';
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import { setDoc, doc } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";

// Inputs
const submit = document.getElementById("submitButton");

// Add event listener to the submit button
submit.addEventListener("click", function(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    const emailValue = document.getElementById("email").value;
    const passwordValue = document.getElementById("password").value;
    const usernameValue = document.getElementById("username").value;

    // Clear any previous error message
    const errorMessage = document.getElementById("errorMessage");
    errorMessage.style.display = "none";
    errorMessage.textContent = "";

    // Use Firebase Authentication to create a new user
    createUserWithEmailAndPassword(auth, emailValue, passwordValue)
        .then((userCredential) => {
            const user = userCredential.user;
            const userData = {
                email: emailValue,
                username: usernameValue,
            };
            const docRef = doc(db, "users", user.uid);
            
            setDoc(docRef, userData)
                .then(() => {
                    console.log("User data saved to Firestore:", userData);
                    alert("User registered successfully!");
                    window.location.href = "./login.html";
                })
                .catch((error) => {
                    console.error("Error saving user data to Firestore:", error.message);
                });
        })
        .catch((error) => {
            const errorCode = error.code;
            if (errorCode === "auth/email-already-in-use") {
                errorMessage.style.display = "block";
                errorMessage.textContent = "Error: Email already in use";
            } else if (errorCode === "auth/invalid-email") {
                errorMessage.style.display = "block";
                errorMessage.textContent = "Error: Invalid email address";
            } else if (errorCode === "auth/weak-password") {
                errorMessage.style.display = "block";
                errorMessage.textContent = "Error: Weak password";
            } else {
                errorMessage.style.display = "block";
                errorMessage.textContent = "Error: " + error.message;
            }
        });
});
