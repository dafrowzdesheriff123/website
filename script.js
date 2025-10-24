// =======================
// Toggle between login and signup
// =======================
const loginContainer = document.querySelector('.login-container');
const signupContainer = document.querySelector('.signup-container');
const loginLink = document.querySelector('.login-link');
const signupLink = document.querySelector('.signup-link');

signupLink.addEventListener('click', () => {
  loginContainer.style.display = 'none';
  signupContainer.style.display = 'block';
});

loginLink.addEventListener('click', () => {
  signupContainer.style.display = 'none';
  loginContainer.style.display = 'block';
});

// =======================
// Firebase Authentication Logic
// =======================

// Signup
const signupBtn = document.getElementById('signup-btn');
signupBtn.addEventListener('click', (e) => {
  e.preventDefault();

  const username = document.getElementById('signup-username').value;
  const email = document.getElementById('signup-email').value;
  const password = document.getElementById('signup-password').value;
  const confirmPassword = document.getElementById('signup-confirm-password').value;

  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      // Save extra info in Realtime Database
      firebase.database().ref("users/" + user.uid).set({
        username: username,
        email: email
      });

      alert("✅ Account created successfully!");
      signupContainer.style.display = 'none';
      loginContainer.style.display = 'block';
    })
    .catch((error) => {
      alert("Error: " + error.message);
    });
});

// Login
const loginBtn = document.getElementById('login-btn');
loginBtn.addEventListener('click', (e) => {
  e.preventDefault();

  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      alert("✅ Login successful! Welcome " + user.email);
      // Redirect to your dashboard page
      window.location.href = "dashboard.html";
    })
    .catch((error) => {
      alert("Error: " + error.message);
    });
});
