// Import the functions you need from the SDKs you need
import { auth, db } from './firebaseconfig.js';
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import { getDocs, collection, query, where } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js"; // Firestore query functions

// Get the submit button
const submit = document.getElementById("submitButton");

// Add event listener to the submit button
submit.addEventListener("click", async function (event) {
    event.preventDefault(); // Prevent default form submission

    const usernameValue = document.getElementById("username").value;
    const emailInputValue = document.getElementById("email").value; // Get the email entered by the user
    const passwordValue = document.getElementById("password").value;

    // Clear any previous error message
    const errorMessage = document.getElementById("errorMessage");
    errorMessage.style.display = "none";
    errorMessage.textContent = "";

    try {
        // Query Firestore to find the email associated with the username
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("username", "==", usernameValue));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            throw new Error("Username not found");
        }

        // Get the email from the query result
        let emailValue = null;
        querySnapshot.forEach((doc) => {
            emailValue = doc.data().email;
        });

        if (!emailValue) {
            throw new Error("Email not found for the given username");
        }

        // Check if the entered email matches the email retrieved from Firestore
        if (emailInputValue !== emailValue) {
            throw new Error("Entered email does not match the username");
        }

        // Use Firebase Authentication to sign in the user
        const userCredential = await signInWithEmailAndPassword(auth, emailValue, passwordValue);
        const user = userCredential.user;

        console.log("Logging in:", user);
        alert("Logging in...!");

        // Redirect to home.html
        window.location.href = "./home.html";
    } catch (error) {
        // Handle errors
        console.error("Error during login:", error.message);

        // Display the error message in red
        errorMessage.style.display = "block";

        // Handle specific Firebase Authentication errors
        if (error.code === "auth/wrong-password") {
            errorMessage.textContent = "Error: Incorrect password";
        } else if (error.code === "auth/user-not-found") {
            errorMessage.textContent = "Error: User not found";
        } else if (error.message === "Username not found") {
            errorMessage.textContent = "Error: Username not found";
        } else if (error.message === "Email not found for the given username") {
            errorMessage.textContent = "Error: Email not found for the given username";
        } else if (error.message === "Entered email does not match the username") {
            errorMessage.textContent = "Error: Entered email does not match the username";
        } else {
            errorMessage.textContent = "Error: " + error.message;
        }
    }
});