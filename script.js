// ===== Firebase Authentication Logic =====

// LOGIN FUNCTION
document.getElementById("loginBtn").addEventListener("click", () => {
  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value.trim();

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(() => {
      // 🔇 No alerts, just redirect silently
      window.location.href = "dashboard.html";
    })
    .catch((error) => {
      // Optional: show error message in a friendly way (not as a popup)
      const errBox = document.createElement("div");
      errBox.textContent = "Login failed: " + error.message;
      errBox.style.position = "fixed";
      errBox.style.bottom = "20px";
      errBox.style.left = "50%";
      errBox.style.transform = "translateX(-50%)";
      errBox.style.background = "rgba(255,0,0,0.8)";
      errBox.style.color = "#fff";
      errBox.style.padding = "10px 20px";
      errBox.style.borderRadius = "10px";
      errBox.style.zIndex = "9999";
      document.body.appendChild(errBox);
      setTimeout(() => errBox.remove(), 3000);
    });
});

// SIGN-UP FUNCTION
document.getElementById("createAccountBtn").addEventListener("click", () => {
  const username = document.getElementById("signupUsername").value.trim();
  const email = document.getElementById("signupEmail").value.trim();
  const password = document.getElementById("signupPassword").value.trim();
  const confirm = document.getElementById("signupConfirm").value.trim();

  if (password !== confirm) return;

  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      firebase.database().ref("users/" + user.uid).set({
        username: username,
        email: email
      });
      // Silently switch to login view
      document.getElementById("container").classList.remove("active");
    })
    .catch(() => {});
});

// OPTIONAL: Auto redirect if already logged in
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    window.location.href = "dashboard.html";
  }
});
