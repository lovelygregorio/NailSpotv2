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