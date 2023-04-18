        // Import the functions you need from the SDKs you need
        import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
        import { getDatabase, set, ref} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";
        import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";

        // TODO: Add SDKs for Firebase products that you want to use
        // https://firebase.google.com/docs/web/setup#available-libraries
      
        // Your web app's Firebase configuration
        const firebaseConfig = {
          apiKey: "AIzaSyD7kTOAoSTo9vPvHiDIDQKP0uonvn5FY5Y",
          authDomain: "connies-a60db.firebaseapp.com",
          databaseURL: "https://connies-a60db-default-rtdb.firebaseio.com",
          projectId: "connies-a60db",
          storageBucket: "connies-a60db.appspot.com",
          messagingSenderId: "489988473507",
          appId: "1:489988473507:web:ea21ceec5c661f23963516"
        };
      
        // Initialize Firebase
        const app = initializeApp(firebaseConfig);
        const database = getDatabase(app);
        const auth = getAuth();


const signUpForm = document.getElementById('registerNow');

signUpForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const firstName = signUpForm.firstName.value;
  const lastName = signUpForm.lastName.value;
  const email = signUpForm.email.value;
  const password = signUpForm.password.value;

  // Get the current date in mm-dd-yyyy format
  const registeredAt = new Date().toLocaleDateString('en-US');
  
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      //send to the database
      set(ref(database, `users/${user.uid}`), {
        email: email,
        registeredAt: registeredAt,
        firstName: firstName,
        lastName: lastName
      })
      .then(() => {
        // Clear the form inputs
        signUpForm.firstName.value = '';
        signUpForm.lastName.value = '';
        signUpForm.email.value = '';
        signUpForm.password.value = '';

        // Display success message
        const alert = document.createElement('div');
        alert.className = 'alert alert-success mt-3';
        alert.setAttribute('role', 'alert');
        alert.innerText = 'Registration successful!';

        // Redirect to login page
        setTimeout(() => {
          window.location.href = '/';
        }, 2000);
      })
      .catch((error) => {
        // Display error message
        const alert = document.createElement('div');
        alert.className = 'alert alert-danger mt-3';
        alert.setAttribute('role', 'alert');
        alert.innerText = error.message;

      });
    })
    .catch((error) => {
      // Display error message
      const alert = document.createElement('div');
      alert.className = 'alert alert-danger mt-3';
      alert.setAttribute('role', 'alert');
      alert.innerText = error.message;
    });
});
