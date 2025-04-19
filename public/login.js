  // Import the functions you need from the SDKs you need
  import { auth } from './firebaseconfig.js';
  import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";

  // Get the submit button
  const submit = document.getElementById("submitButton");
  
  // Add event listener to the submit button
  submit.addEventListener("click", function (event) {
      event.preventDefault(); // Prevent default form submission
  
      const emailValue = document.getElementById("email").value;
      const passwordValue = document.getElementById("password").value;
  
      // Use Firebase Authentication to sign in the user
      signInWithEmailAndPassword(auth, emailValue, passwordValue)
          .then((userCredential) => {
              // User successfully logged in
              const user = userCredential.user;
              console.log("Logging in:", user);
              alert("Logging in...!");
  
              // Redirect to home.html
              window.location.href = "./home.html";
          })
          .catch((error) => {
              // Handle errors
              console.error("Error during login:", error.message);
              alert("Error: " + error.message);
          });
  });