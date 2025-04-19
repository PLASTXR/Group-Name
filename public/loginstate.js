import { auth } from "./firebaseconfig.js"; // Import the auth instance
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";

document.addEventListener("DOMContentLoaded", () => {
    onAuthStateChanged(auth, (user) => {
        const navbar = document.querySelector("nav .container");
    
        if (user) {
            // User is logged in
            const loginLink = document.querySelector("a.navbar-brand");
            if (loginLink) {
                loginLink.style.display = "none";
            }

            const welcomeMessage = document.createElement("span");
            welcomeMessage.textContent = `Welcome, ${user.email}`;
            welcomeMessage.style.marginLeft = "20px";
            welcomeMessage.style.color = "#212529";
            navbar.appendChild(welcomeMessage);
    
            // Add a logout button
            const logoutButton = document.createElement("button");
            logoutButton.textContent = "Logout ";
            logoutButton.classList.add("navbar-brand");

            // Remove background and border
            logoutButton.style.background = "none";
            logoutButton.style.border = "none";

            // Add the icon to the logout button
            const logoutIcon = document.createElement("i");
            logoutIcon.classList.add("bi", "bi-person-circle");
            logoutButton.appendChild(logoutIcon);

            logoutButton.addEventListener("click", () => {
                signOut(auth).then(() => {
                    // Reload the page to reset the UI
                    window.location.reload();
                }).catch((error) => {
                    console.error("Error during logout:", error.message);
                });
            });
            navbar.appendChild(logoutButton);
        } else {
            // User is not logged in, reset the UI to default
            const loginLink = document.querySelector("a.navbar-brand");
            if (loginLink) {
                loginLink.style.display = "inline";
            }
        }
    });
});