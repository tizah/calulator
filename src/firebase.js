import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAl1XX8EBvG4kDHU8Qpcknmo1wFnG8TZ2M",
  authDomain: "calculator-f2b7e.firebaseapp.com",
  databaseURL: "https://calculator-f2b7e.firebaseio.com",
  projectId: "calculator-f2b7e",
  storageBucket: "calculator-f2b7e.appspot.com",
  messagingSenderId: "255885816251",
  appId: "1:255885816251:web:1f93d18e4d5ab0f2d4149e",
  measurementId: "G-CMWCPYHXJQ",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
