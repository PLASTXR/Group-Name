import { auth, db } from "./firebaseconfig.js"; // Import the auth and db instances
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", () => {
    onAuthStateChanged(auth, async (user) => {
        const navbar = document.querySelector("nav .container");
    
        if (user) {
            // User is logged in
            const loginLink = document.querySelector("a.navbar-brand");
            if (loginLink) {
                loginLink.style.display = "none";
            }

            // Fetch the username from Firestore
            let username = "User";
            try {
                const userDoc = await getDoc(doc(db, "users", user.uid));
                if (userDoc.exists()) {
                    username = userDoc.data().username || "User";
                }
            } catch (error) {
                console.error("Error fetching username:", error.message);
            }

            // Create a container for the welcome message and logout button
            const userContainer = document.createElement("div");
            userContainer.style.display = "flex";
            userContainer.style.alignItems = "center";
            userContainer.style.gap = "10px";

            const welcomeMessage = document.createElement("span");
            welcomeMessage.textContent = `Welcome, ${username}`;
            welcomeMessage.style.color = "#212529";
            welcomeMessage.style.fontSize = "1.2rem";

            // Add a logout button
            const logoutButton = document.createElement("button");
            logoutButton.textContent = "Logout ";
            logoutButton.classList.add("navbar-brand");
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

            // Append the welcome message and logout button to the container
            userContainer.appendChild(welcomeMessage);
            userContainer.appendChild(logoutButton);

            // Append the container to the navbar
            navbar.appendChild(userContainer);
        } else {
            // User is not logged in, reset the UI to default
            const loginLink = document.querySelector("a.navbar-brand");
            if (loginLink) {
                loginLink.style.display = "inline";
            }
        }
    });
});