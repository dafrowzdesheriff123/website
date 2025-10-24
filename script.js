// ===== Firebase Authentication Logic =====

// Listen for login
document.getElementById("loginBtn").addEventListener("click", () => {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  // Firebase Sign In
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Redirect silently to dashboard
      window.location.href = "dashboard.html";
    })
    .catch((error) => {
      alert("Login failed: " + error.message);
    });
});

// ===== Sign Up Logic =====
document.getElementById("createAccountBtn").addEventListener("click", () => {
  const username = document.getElementById("signupUsername").value;
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;
  const confirm = document.getElementById("signupConfirm").value;

  if (password !== confirm) {
    alert("Passwords do not match!");
    return;
  }

  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      // Save user info to Firebase Database
      firebase.database().ref("users/" + user.uid).set({
        username: username,
        email: email
      });

      // After sign up, go back to login page
      alert("Account created successfully! Please log in.");
      document.getElementById("container").classList.remove("active");
    })
    .catch((error) => {
      alert("Sign up failed: " + error.message);
    });
});

// ===== Logout logic (on dashboard page) =====
// Optional: add this to your dashboard page if needed
function logoutUser() {
  firebase.auth().signOut().then(() => {
    window.location.href = "index.html";
  });
}
