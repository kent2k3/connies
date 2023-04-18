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
        