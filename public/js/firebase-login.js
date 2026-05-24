// JavaScript code for handling Firebase authentication and Google login in the NailSpot application.
// This script is responsible for managing user authentication using Firebase and enabling users to log in with their Google accounts. It listens for click events on the Google login button, initiates the sign-in process with Firebase, and handles the authentication flow. If the login is successful, the user is redirected to the dashboard; if there is an error during login, an error message is displayed.

import { auth } from "./firebase.js";

import {
  GoogleAuthProvider,
  signInWithPopup
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

console.log("Firebase login script loaded");

const googleLoginButton = document.querySelector("#google-login");
console.log("Google button:", googleLoginButton);

googleLoginButton.addEventListener("click", async () => {
  const provider = new GoogleAuthProvider();

  try {
    const result = await signInWithPopup(auth, provider);
    console.log("Google login successful:", result.user);

    window.location.href = "/dashboard";
  } catch (error) {
    console.error("Google login error:", error);
    alert("Google login failed");
  }
});