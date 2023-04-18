        // Import the functions you need from the SDKs you need
        import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
        import { getDatabase, set, ref} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";
        import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";

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

var form = document.getElementById("registerNow");

form.addEventListener("submit", function(event) {
  event.preventDefault();
  
  var firstName = document.getElementById("firstName").value;
  var lastName = document.getElementById("lastName").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;

  // Create a new user with email and password
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Write the user's data to the database
      const user = userCredential.user;
      set(ref(database, 'users/' + user.uid), {
        firstName: firstName,
        lastName: lastName,
        email: email
      });
    })
    .catch((error) => {
      var errorMessage = error.message;
      console.log(errorMessage);
    });
  
  // Reset the form
  form.reset();
});
        