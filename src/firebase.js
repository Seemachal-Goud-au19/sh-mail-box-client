import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCgpRSD2__nfU24_K5fl5xQxvyLRzWCN5k",
    authDomain: "sh-mail-box-client.firebaseapp.com",
    databaseURL: "https://sh-mail-box-client-default-rtdb.firebaseio.com",
    projectId: "sh-mail-box-client",
    storageBucket: "sh-mail-box-client.appspot.com",
    messagingSenderId: "642315168367",
    appId: "1:642315168367:web:9ede1334fdfaaad454bb9a"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };
