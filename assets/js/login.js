        // Import the functions you need from the SDKs you need
        import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
        import { getDatabase} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";
        import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";

        // TODO: Add SDKs for Firebase products that you want to use
        // https://firebase.google.com/docs/web/setup#available-libraries
      
        // Your web app's Firebase configuration
        const firebaseConfig = {
            apiKey: "AIzaSyAAVlB5up_ViioxZnv1Nef-ZTxQLDGvz4w",
            authDomain: "connies-lutong-ulam.firebaseapp.com",
            databaseURL: "https://connies-lutong-ulam-default-rtdb.firebaseio.com",
            projectId: "connies-lutong-ulam",
            storageBucket: "connies-lutong-ulam.appspot.com",
            messagingSenderId: "605315693637",
            appId: "1:605315693637:web:6df00422df8b9eb6ed772c"
          };
      
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();

// Add an event listener to the login form
const loginForm = document.getElementById('loginNow');

loginForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const email = loginForm['email'].value;
  const password = loginForm['password'].value;

  // Sign in with email and password
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Redirect to the dashboard or home page
      window.location.href = "/index.html";
    })
    .catch((error) => {
      // Display an error message
      const errorMessage = error.message;
      alert(errorMessage);
    });

  // Reset the form
  loginForm.reset();
});