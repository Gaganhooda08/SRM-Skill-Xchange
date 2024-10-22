import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
    apiKey: "AIzaSyAWn-oSP2McIPLQiH6HLR8jLpoA7fMbBCo",

    authDomain: "srm-skill-exchange.firebaseapp.com",
  
    projectId: "srm-skill-exchange",
  
    storageBucket: "srm-skill-exchange.appspot.com",
  
    messagingSenderId: "504100670852",
  
    appId: "1:504100670852:web:343abe184f6d33cca921d1",
  
    measurementId: "G-EFJG8FYSLG"
  
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export {app,auth}